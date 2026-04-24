// Cover-image generator. One hero image per blog post, saved as
// public/blog/<slug>/cover.webp. Designed for visual series consistency:
// every cover shares the same editorial style and palette, with the
// subject varied by post category.

import OpenAI from "openai";
import sharp from "sharp";
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  BRAND,
  IMAGE_SIZE,
  OPENAI_IMAGE_MODEL,
  OPENAI_IMAGE_FALLBACK,
  AUDIT_THRESHOLDS,
  PATHS,
} from "./config.js";

export interface BlogRegistryEntry {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  category: string;
  targetKeyword: string;
  featuredImage: string;
  featuredImageAlt: string;
}

export interface GeneratedCover {
  slug: string;
  filePath: string;
  publicPath: string;
  alt: string;
  promptUsed: string;
  bytes: number;
  model: string;
  cached: boolean;
}

// Category → subject framing. Keeps the series cohesive while varying the
// scene so every cover has its own identity.
const CATEGORY_SUBJECT: Record<string, string> = {
  Pillar:
    "a wide establishing shot of a small Indian coaching-institute classroom interior, eight to twelve senior students in mid-lesson, one teacher at the board, natural window light from camera left, rows of wooden desks, chalk dust hanging in the air. Frame the room so the back wall is visible — cinematic wide.",
  Guide:
    "a tight mid-shot of an Indian Physics teacher at a green chalkboard, writing a single equation by hand, students visible out of focus in the foreground, warm tungsten light mixed with cool window light, textbook and chalk on the desk. Documentary portrait energy.",
  Comparison:
    "a split-composition scene contrasting two Indian coaching environments — on the left, a dense overcrowded hall with many heads in silhouette; on the right, a calmer small-batch classroom with fewer, clearer student figures. The tonal contrast between the two sides carries the visual argument.",
  Location:
    "an architectural exterior of a low-rise Indian coaching-institute building in a busy Jaipur neighbourhood at golden hour, signboards softly out of focus (unreadable), auto-rickshaws and students on foot in the foreground, warm evening light raking across the facade.",
};

// Shared cover-specific constraints layered on top of BRAND.visualStyle.
const COVER_RULES = [
  "Single hero moment. No collage, no multiple panels unless explicitly requested.",
  "Strong central-to-right subject placement; leave the left third breathable for visual balance.",
  "No visible text, signage letters, numbers, logos, watermarks, or book titles — all text-like surfaces must be illegible.",
  "No AI artefacts: no extra fingers, no warped faces, no melting objects, no surreal scale.",
  "Indian faces and Indian classroom context only; uniforms may be plain shirts, not branded.",
  "Cinematic 16:9 framing, 35mm focal length feel, f/2.0 shallow depth of field.",
  "Colour grade: warm highlights with muted shadows; palette accents should appear naturally as environmental light, not as painted props.",
].join(" ");

function buildPrompt(entry: BlogRegistryEntry): { prompt: string; alt: string } {
  const subject =
    CATEGORY_SUBJECT[entry.category] || CATEGORY_SUBJECT.Guide;

  const prompt = [
    `Scene: ${subject}`,
    `Narrative context: This is the cover image for a long-form editorial guide titled "${entry.title}". ` +
      `The piece is about: ${entry.excerpt}`,
    `Style: ${BRAND.visualStyle}.`,
    `Palette accents (as ambient light, not painted objects): ${Object.values(BRAND.palette).join(", ")}.`,
    `Cover rules: ${COVER_RULES}`,
  ].join(" ");

  const alt = `Editorial cover photograph for "${entry.title}" — ${entry.category.toLowerCase()} guide on ${entry.targetKeyword}.`;
  return { prompt, alt };
}

async function compressWebp(
  inputBuffer: Buffer,
  targetKb: number = AUDIT_THRESHOLDS.maxImageSizeKb,
): Promise<Buffer> {
  const targetBytes = targetKb * 1024;
  let quality = 82;
  let result = await sharp(inputBuffer)
    .resize(IMAGE_SIZE.width, IMAGE_SIZE.height, {
      fit: "cover",
      position: "center",
    })
    .webp({ quality, effort: 6 })
    .toBuffer();
  while (result.byteLength > targetBytes && quality > 30) {
    quality -= 8;
    result = await sharp(inputBuffer)
      .resize(IMAGE_SIZE.width, IMAGE_SIZE.height, {
        fit: "cover",
        position: "center",
      })
      .webp({ quality, effort: 6 })
      .toBuffer();
  }
  return result;
}

async function generateOne(
  client: OpenAI,
  prompt: string,
): Promise<{ bytes: Buffer; model: string }> {
  const tryModels = [OPENAI_IMAGE_MODEL, OPENAI_IMAGE_FALLBACK] as const;
  let lastErr: unknown = null;
  for (const model of tryModels) {
    try {
      const res = await client.images.generate({
        model,
        prompt,
        n: 1,
        size: "1536x1024",
      });
      const first = res.data?.[0];
      if (!first) throw new Error("Empty image response");
      if (first.b64_json) {
        return { bytes: Buffer.from(first.b64_json, "base64"), model };
      }
      if (first.url) {
        const r = await fetch(first.url);
        const arr = await r.arrayBuffer();
        return { bytes: Buffer.from(arr), model };
      }
      throw new Error("No image data returned");
    } catch (err) {
      lastErr = err;
      continue;
    }
  }
  throw lastErr ?? new Error("All image models failed");
}

// Parse lib/blog-posts.ts into structured entries. We only need the
// fields relevant to cover generation.
export function readBlogRegistry(repoRoot: string): BlogRegistryEntry[] {
  const registryPath = join(repoRoot, "lib", "blog-posts.ts");
  const raw = readFileSync(registryPath, "utf8");

  const entries: BlogRegistryEntry[] = [];
  const slugMatches = Array.from(raw.matchAll(/slug:\s*"([^"]+)"/g));
  for (let i = 0; i < slugMatches.length; i++) {
    const slug = slugMatches[i][1];
    const start = slugMatches[i].index ?? 0;
    const end =
      i + 1 < slugMatches.length
        ? (slugMatches[i + 1].index ?? raw.length)
        : raw.length;
    const block = raw.slice(start, end);
    const pick = (key: string): string => {
      const m = block.match(
        new RegExp(`${key}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`),
      );
      return m ? m[1].replace(/\\"/g, '"').replace(/\\'/g, "'") : "";
    };
    entries.push({
      slug,
      title: pick("title"),
      excerpt: pick("excerpt"),
      description: pick("description"),
      category: pick("category"),
      targetKeyword: pick("targetKeyword"),
      featuredImage: pick("featuredImage"),
      featuredImageAlt: pick("featuredImageAlt"),
    });
  }
  return entries;
}

export async function generateCoverFor(opts: {
  repoRoot: string;
  entry: BlogRegistryEntry;
  force?: boolean;
}): Promise<GeneratedCover> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY not found. Set it in .env.local before running.",
    );
  }
  const client = new OpenAI({ apiKey });

  const outDir = join(opts.repoRoot, PATHS.publicBlogImages, opts.entry.slug);
  mkdirSync(outDir, { recursive: true });

  const filePath = join(outDir, "cover.webp");
  const publicPath = `/blog/${opts.entry.slug}/cover.webp`;
  const { prompt, alt } = buildPrompt(opts.entry);

  if (!opts.force && existsSync(filePath)) {
    return {
      slug: opts.entry.slug,
      filePath,
      publicPath,
      alt,
      promptUsed: "(cached — pass --force to regenerate)",
      bytes: 0,
      model: "cached",
      cached: true,
    };
  }

  process.stdout.write(`  → generating cover for ${opts.entry.slug} ... `);
  const { bytes, model } = await generateOne(client, prompt);
  const compressed = await compressWebp(bytes);
  writeFileSync(filePath, compressed);
  process.stdout.write(
    `ok (${Math.round(compressed.byteLength / 1024)}KB, ${model})\n`,
  );

  return {
    slug: opts.entry.slug,
    filePath,
    publicPath,
    alt,
    promptUsed: prompt,
    bytes: compressed.byteLength,
    model,
    cached: false,
  };
}

// Rewrite lib/blog-posts.ts to point featuredImage at the new cover for
// each entry that has one on disk. Also refreshes featuredImageAlt to the
// cover-appropriate alt when the existing one points at the old stock photo.
export function updateRegistryFeaturedImages(opts: {
  repoRoot: string;
  covers: GeneratedCover[];
}): { updated: string[]; skipped: string[] } {
  const registryPath = join(opts.repoRoot, "lib", "blog-posts.ts");
  let raw = readFileSync(registryPath, "utf8");
  const updated: string[] = [];
  const skipped: string[] = [];

  for (const cover of opts.covers) {
    const slugRe = new RegExp(
      `(slug:\\s*"${cover.slug}"[\\s\\S]*?featuredImage:\\s*)"([^"]+)"`,
    );
    const m = raw.match(slugRe);
    if (!m) {
      skipped.push(cover.slug);
      continue;
    }
    if (m[2] === cover.publicPath) {
      skipped.push(cover.slug);
      continue;
    }
    raw = raw.replace(slugRe, `$1"${cover.publicPath}"`);

    // Update featuredImageAlt for this entry too (scoped by slug block).
    const altRe = new RegExp(
      `(slug:\\s*"${cover.slug}"[\\s\\S]*?featuredImageAlt:\\s*\\n?\\s*)"([^"]+)"`,
    );
    if (altRe.test(raw)) {
      raw = raw.replace(altRe, `$1"${cover.alt.replace(/"/g, '\\"')}"`);
    }
    updated.push(cover.slug);
  }

  writeFileSync(registryPath, raw);
  return { updated, skipped };
}
