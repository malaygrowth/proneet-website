#!/usr/bin/env node
/**
 * Breath Coach — ElevenLabs voice generator.
 *
 * Reads voice-manifest.json, generates every line, checks each result against its
 * time budget, and writes out/report.json.
 *
 *   export ELEVENLABS_API_KEY="sk_..."
 *   node scripts/generate-voice.mjs [--only <group>] [--line <ID>] [--dry-run] [--force]
 *
 * Files land in out/<group>/<LINE-ID>.mp3. Existing files are skipped unless --force,
 * so a re-run after editing one line only costs that one line.
 */

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const MANIFEST = join(ROOT, 'voice-manifest.json');
const OUT = join(ROOT, 'out');
const API = 'https://api.elevenlabs.io/v1/text-to-speech';

// ---------- args ----------
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const value = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
};
const onlyGroup = value('--only');
const onlyLine = value('--line');
const dryRun = flag('--dry-run');
const force = flag('--force');

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey && !dryRun) {
  console.error('ELEVENLABS_API_KEY is not set. Export it, or use --dry-run.');
  process.exit(1);
}

// ---------- helpers ----------
const exists = (p) => access(p).then(() => true, () => false);

/** Characters ElevenLabs will bill for — break tags are markup, not speech. */
const billableChars = (text) => text.replace(/<break[^>]*\/>/g, '').length;

/** Duration in seconds via ffprobe; null when ffprobe isn't installed. */
async function durationOf(file) {
  try {
    const { stdout } = await execFileAsync('ffprobe', [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1',
      file,
    ]);
    const secs = parseFloat(stdout.trim());
    return Number.isFinite(secs) ? secs : null;
  } catch {
    return null;
  }
}

async function synthesize({ manifest, text, settings, previousText }) {
  const body = {
    text,
    model_id: manifest.model_id,
    voice_settings: settings,
    seed: manifest.seed,
  };
  // Conditioning on the preceding line is what keeps tone consistent across an
  // experience. Not supported by eleven_v3 — skip it there rather than 422.
  if (previousText && manifest.model_id !== 'eleven_v3') {
    body.previous_text = previousText;
  }

  const url = `${API}/${manifest.voice_id}?output_format=${encodeURIComponent(manifest.output_format)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} — ${detail.slice(0, 400)}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

// ---------- run ----------
const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));

if (!dryRun && /REPLACE_WITH/.test(manifest.voice_id)) {
  console.error('Set "voice_id" in voice-manifest.json to your chosen ElevenLabs voice first.');
  process.exit(1);
}

const groups = manifest.groups.filter((g) => !onlyGroup || g.id === onlyGroup || (onlyGroup === 'cues' && true));
if (onlyGroup && !groups.length) {
  console.error(`No group "${onlyGroup}". Available: ${manifest.groups.map((g) => g.id).join(', ')}, cues`);
  process.exit(1);
}

const report = [];
let generated = 0, skipped = 0, failed = 0, chars = 0;

for (const group of groups) {
  const dir = join(OUT, group.id);
  if (!dryRun) await mkdir(dir, { recursive: true });

  let previousText = null; // reset per group — tone should carry within an experience, not across

  for (const line of group.lines) {
    const isCue = (line.profile || group.profile) === 'cue';
    if (onlyGroup === 'cues' && !isCue) continue;
    if (onlyLine && line.id !== onlyLine) continue;

    const profileName = line.profile || group.profile;
    const profile = manifest.profiles[profileName];
    if (!profile) {
      console.error(`  ${line.id}: unknown profile "${profileName}"`);
      failed++;
      continue;
    }

    const settings = { ...profile };
    if (line.speedOverride) settings.speed = line.speedOverride;

    const budget = line.budget ?? group.lineBudget;
    const file = join(dir, `${line.id}.mp3`);
    const n = billableChars(line.text);

    if (dryRun) {
      console.log(`${line.id.padEnd(16)} ${String(n).padStart(4)} chars  budget ${budget}s  [${profileName}]`);
      chars += n;
      previousText = line.text;
      continue;
    }

    if (!force && (await exists(file))) {
      const secs = await durationOf(file);
      report.push({ id: line.id, group: group.id, seconds: secs, budget, status: 'skipped' });
      skipped++;
      previousText = line.text;
      continue;
    }

    try {
      // Cues are standalone utterances played on their own — conditioning them on a
      // coach line would bleed that line's cadence into every breath.
      const audio = await synthesize({
        manifest,
        text: line.text,
        settings,
        previousText: isCue ? null : previousText,
      });
      await writeFile(file, audio);
      chars += n;
      generated++;

      const secs = await durationOf(file);
      const over = secs != null && secs > budget;
      report.push({
        id: line.id,
        group: group.id,
        seconds: secs,
        budget,
        status: over ? 'OVER_BUDGET' : 'ok',
      });

      const dur = secs == null ? 'ffprobe n/a' : `${secs.toFixed(2)}s`;
      console.log(
        `${over ? '!!' : 'ok'} ${line.id.padEnd(16)} ${dur.padStart(11)} / ${budget}s` +
        (over ? `  OVER BUDGET — shorten the text or raise speed` : '')
      );
    } catch (err) {
      failed++;
      report.push({ id: line.id, group: group.id, status: 'failed', error: String(err.message || err) });
      console.error(`FAIL ${line.id}: ${err.message || err}`);
    }

    previousText = line.text;
  }
}

if (dryRun) {
  console.log(`\nDry run — ${chars} billable characters across the selected lines. Nothing generated.`);
  process.exit(0);
}

await mkdir(OUT, { recursive: true });
await writeFile(join(OUT, 'report.json'), JSON.stringify({ generatedAt: new Date().toISOString(), report }, null, 2));

const over = report.filter((r) => r.status === 'OVER_BUDGET');
console.log(`\n${generated} generated, ${skipped} skipped, ${failed} failed, ~${chars} characters used.`);
if (over.length) {
  console.log(`\n${over.length} line(s) over budget — these will be cut off mid-breath in the app:`);
  for (const r of over) console.log(`  ${r.id}  ${r.seconds.toFixed(2)}s > ${r.budget}s`);
}
if (report.some((r) => r.seconds == null && r.status !== 'failed')) {
  console.log('\nInstall ffmpeg (for ffprobe) to get duration checks — without it, budgets are unverified.');
}
console.log(`\nReport: ${join(OUT, 'report.json')}`);
process.exit(failed || over.length ? 1 : 0);
