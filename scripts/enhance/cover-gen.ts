// Cover-image generator — split pipeline.
//
// The cover is assembled from two layers:
//   1. gpt-image-1 renders ONLY the 3D-illustration background. The
//      prompt pins the illustration to the right 50% of the frame and
//      explicitly leaves the left 50% as empty navy gradient — no text,
//      no objects. This makes the background a reliable substrate.
//   2. satori + resvg render a transparent text overlay in pixel-
//      perfect Inter (ProNEET wordmark top-left; headline + subhead
//      bottom-left). sharp composites the two into the final cover.
//
// The per-post iconography and copy come from analyze-post.ts (GPT-4o).
// Everything visual that is shared across the series — colours, layout,
// typography, brand lockup — lives here or in text-overlay.ts and is
// the same for every post.

import OpenAI from "openai";
import sharp from "sharp";
import {
  mkdirSync,
  writeFileSync,
  existsSync,
  readFileSync,
} from "node:fs";
import { join } from "node:path";
import {
  IMAGE_SIZE,
  OPENAI_IMAGE_MODEL,
  OPENAI_IMAGE_FALLBACK,
  AUDIT_THRESHOLDS,
  PATHS,
} from "./config.js";
import { findPostFile, parsePost } from "./parse-post.js";
import { analyzePost, type VisualBrief } from "./analyze-post.js";
import { renderTextOverlayPng } from "./text-overlay.js";

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
  brief: VisualBrief | null;
  promptUsed: string;
  bytes: number;
  model: string;
  cached: boolean;
}

// ---------------------------------------------------------------------------
// Series bible for the illustration background. Edits here shift every
// cover in the series.
// ---------------------------------------------------------------------------

const BG_STYLE = {
  background:
    "a rich solid navy-blue gradient filling the ENTIRE canvas; top-left corner is #0F172A deep navy, bottom-right is #1E3A8A brand blue, with a subtle diagonal sheen across the mid-frame; no white anywhere; no stars, no grid, no particles",
  illustrationStyle:
    "matte clay plastic 3D rendering in the Spline / Icons8 Isometric style; gentle bevels on every edge; soft contact shadows on the navy floor; cool blue studio key light from upper-left with one warm orange #F97316 rim light touching the hero element only; no harsh glossy reflections, no chrome, no glass",
  palette:
    "objects in matte navy, mid-blue, and pale blue/white tones; exactly one hero element rendered in warm orange #F97316 as the brand accent",
};

function buildBgPrompt(brief: VisualBrief): { prompt: string } {
  const prompt = `A 16:9 landscape graphic for a blog cover. NOT a photograph — a modern B2B-SaaS editorial cover composed entirely of 3D clay illustration on a navy gradient background.

BACKGROUND: ${BG_STYLE.background}.

LAYOUT RULE — ABSOLUTELY CRITICAL:
The LEFT 50% of the frame MUST be empty navy gradient. No illustration, no objects, no figurines, no shapes, no decorative elements, nothing. This space is reserved for text which will be added separately. The RIGHT 50% of the frame is where all the 3D illustration lives. The illustration must be fully contained within the right half and must not cross the vertical midline.

ILLUSTRATION (right 50% only):
${brief.iconography}

RENDERING:
${BG_STYLE.illustrationStyle}.

PALETTE (strict):
${BG_STYLE.palette}.

COMPOSITION: 16:9 landscape. The illustration group is vertically centred on the right 50% of the canvas, with generous breathing room on all sides. The left 50% of the canvas remains completely empty navy gradient. Subject off-centre, documentary negative space.

HARD CONSTRAINTS:
- ABSOLUTELY NO TEXT anywhere in the frame. No letters, no numbers, no words, no captions, no subtitles, no watermarks, no logos, no brand names. Zero typography.
- The left 50% of the canvas is strictly empty navy gradient.
- No real brand logos, no UI mockups, no browser chrome, no stat callouts.
- No photorealistic humans, no photographic textures — 3D clay illustration only.
- No extra fingers or warped shapes.
- Background is solid navy gradient — never white, never light grey.`;
  return { prompt };
}

async function generateBackground(
  client: OpenAI,
  prompt: string,
): Promise<{ bytes: Buffer; model: string }> {
  const tryModels = [OPENAI_IMAGE_MODEL, OPENAI_IMAGE_FALLBACK] as const;
  let lastErr: unknown = null;
  for (const model of tryModels) {
    try {
      const size = model === "dall-e-3" ? "1792x1024" : "1536x1024";
      const res = await client.images.generate({
        model,
        prompt,
        n: 1,
        size: size as "1536x1024" | "1792x1024",
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

async function composeCover(
  bgBytes: Buffer,
  brief: VisualBrief,
  repoRoot: string,
): Promise<{ buffer: Buffer; quality: number }> {
  const bgResized = await sharp(bgBytes)
    .resize(IMAGE_SIZE.width, IMAGE_SIZE.height, {
      fit: "cover",
      position: "center",
    })
    .toBuffer();

  const overlayPng = await renderTextOverlayPng(
    {
      wordmark: "ProNEET",
      headline: brief.headline,
      subhead: brief.subhead,
      width: IMAGE_SIZE.width,
      height: IMAGE_SIZE.height,
    },
    repoRoot,
  );

  const targetBytes = AUDIT_THRESHOLDS.maxImageSizeKb * 1024;
  let quality = 86;
  let composed = await sharp(bgResized)
    .composite([{ input: overlayPng, top: 0, left: 0 }])
    .webp({ quality, effort: 6 })
    .toBuffer();
  while (composed.byteLength > targetBytes && quality > 40) {
    quality -= 8;
    composed = await sharp(bgResized)
      .composite([{ input: overlayPng, top: 0, left: 0 }])
      .webp({ quality, effort: 6 })
      .toBuffer();
  }
  return { buffer: composed, quality };
}

// Parse lib/blog-posts.ts into structured entries.
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

  if (!opts.force && existsSync(filePath)) {
    return {
      slug: opts.entry.slug,
      filePath,
      publicPath,
      alt: opts.entry.featuredImageAlt || `Cover for "${opts.entry.title}"`,
      brief: null,
      promptUsed: "(cached — pass --force to regenerate)",
      bytes: 0,
      model: "cached",
      cached: true,
    };
  }

  const postFile = findPostFile(opts.repoRoot, opts.entry.slug);
  if (!postFile) {
    throw new Error(
      `No page.tsx found for slug "${opts.entry.slug}" — cannot build visual brief.`,
    );
  }
  const post = parsePost(postFile, opts.entry.slug);

  process.stdout.write(`  → briefing ${opts.entry.slug} ... `);
  const brief = await analyzePost(client, {
    title: post.title,
    metaDescription: post.metaDescription,
    category: post.category,
    primaryKeyword: post.primaryKeyword,
    body: post.body,
    excerpt: opts.entry.excerpt,
  });
  process.stdout.write(`ok\n`);
  process.stdout.write(`     headline: ${brief.headline}\n`);
  process.stdout.write(`     subhead:  ${brief.subhead}\n`);
  process.stdout.write(`     iconography: ${brief.iconography.slice(0, 120)}...\n`);

  const { prompt } = buildBgPrompt(brief);
  process.stdout.write(`  → rendering 3D background ... `);
  const { bytes: bgBytes, model } = await generateBackground(client, prompt);
  process.stdout.write(`ok (${model})\n`);

  process.stdout.write(`  → compositing text overlay ... `);
  const { buffer, quality } = await composeCover(bgBytes, brief, opts.repoRoot);
  writeFileSync(filePath, buffer);
  process.stdout.write(
    `ok (${Math.round(buffer.byteLength / 1024)}KB, q${quality})\n`,
  );

  const alt = `"${brief.headline} — ${brief.subhead}". 3D illustrated cover for "${opts.entry.title}" on ${opts.entry.targetKeyword}.`;

  return {
    slug: opts.entry.slug,
    filePath,
    publicPath,
    alt,
    brief,
    promptUsed: prompt,
    bytes: buffer.byteLength,
    model,
    cached: false,
  };
}

// Rewrite lib/blog-posts.ts featuredImage + featuredImageAlt for each
// slug with a cover on disk. Regex is escape-aware so it handles
// existing \" in string literals.
export function updateRegistryFeaturedImages(opts: {
  repoRoot: string;
  covers: GeneratedCover[];
}): { updated: string[]; skipped: string[] } {
  const registryPath = join(opts.repoRoot, "lib", "blog-posts.ts");
  let raw = readFileSync(registryPath, "utf8");
  const updated: string[] = [];
  const skipped: string[] = [];

  const quotedString = `"(?:[^"\\\\]|\\\\.)*"`;

  for (const cover of opts.covers) {
    const slugRe = new RegExp(
      `(slug:\\s*"${cover.slug}"[\\s\\S]*?featuredImage:\\s*)${quotedString}`,
    );
    if (!slugRe.test(raw)) {
      skipped.push(cover.slug);
      continue;
    }
    raw = raw.replace(slugRe, `$1"${cover.publicPath}"`);

    const altRe = new RegExp(
      `(slug:\\s*"${cover.slug}"[\\s\\S]*?featuredImageAlt:\\s*\\n?\\s*)${quotedString}`,
    );
    if (altRe.test(raw)) {
      const escaped = cover.alt.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      raw = raw.replace(altRe, `$1"${escaped}"`);
    }
    updated.push(cover.slug);
  }

  writeFileSync(registryPath, raw);
  return { updated, skipped };
}
