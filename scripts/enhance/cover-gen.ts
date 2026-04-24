// Cover-image generator. One hero image per blog post, saved as
// public/blog/<slug>/cover.webp. The generator runs a two-stage pipeline:
//
//   1. analyze-post.ts extracts a structured visual brief (thesis, scene,
//      subject, gesture, light, per-post exclusions) from the actual post
//      body via GPT-4o-mini. This replaces the old category-template
//      approach that produced formulaic chalkboard scenes.
//
//   2. buildPrompt() assembles a two-layer prompt:
//        - Series bible (fixed across every cover: lens, grain, palette,
//          lighting philosophy, color grade). Keeps the series cohesive.
//        - Per-post scene (from the brief). Keeps each cover specific.
//      Rendered as narrative prose with a hard constraint tail, per
//      OpenAI's current prompting guidance.
//
// Key rule learned the hard way: do NOT name writing surfaces in the
// scene (chalkboards, whiteboards, notebooks with visible writing, book
// spines with titles, signboards, phone screens, posters). Negative
// prompts cannot override a named-object prior in gpt-image-1. The fix
// is scene-level — pick a scene that doesn't invite text in the first
// place.

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
// Series bible — fixed across every cover in the series.
// Edit these values to shift the entire visual language of the blog.
// ---------------------------------------------------------------------------

const SERIES_BIBLE = {
  medium: "35mm documentary editorial photograph, single exposure",
  lens: "50mm prime, f/2.8, shallow depth of field",
  lighting_philosophy:
    "one directional light source, soft and warm, raking across the subject; the shadow side is allowed to fall into quiet muted tones",
  color_temperature: "warm highlights around 4200K, cool muted shadows",
  grain: "fine Kodak Portra 400 grain — organic, not stylised",
  palette:
    "warm paper whites, walnut browns, muted navy shadows, a single ember-orange accent in the lighting — never as painted objects",
  color_grade:
    "soft warm highlights, gently lifted shadows, natural skin tones, no HDR, no teal-and-orange, no painterly look",
  composition:
    "16:9 landscape, rule-of-thirds, subject off-centre, generous breathing room on one side",
  craft_rules: [
    "one subject, one gesture, one light source",
    "real documentary restraint — never stylised, never staged-looking",
    "materials and surfaces look worn and lived-in",
    "human presence is implied more often than fully shown; hands, silhouettes, backs of heads preferred over faces",
  ],
};

// Text surfaces we ALWAYS exclude, on top of per-post exclusions from the
// visual brief. Named nouns here are the ones gpt-image-1 reliably tries
// to fill with fake text unless we forbid them at scene level.
const GLOBAL_TEXT_SURFACE_EXCLUSIONS = [
  "no chalkboards",
  "no whiteboards",
  "no blackboards",
  "no visible book titles or spine lettering",
  "no open notebooks with writing",
  "no signboards or storefront lettering",
  "no posters on walls",
  "no phone screens, computer screens, or tablets",
  "no printed receipts, bills, price tags, or currency notes",
  "no calendars, clocks with readable numerals, or wall hangings with words",
  "no logos, watermarks, trademarks, captions, or typography of any kind anywhere in the frame",
];

function buildPrompt(
  entry: BlogRegistryEntry,
  brief: VisualBrief,
): { prompt: string; alt: string } {
  const exclusions = [
    ...GLOBAL_TEXT_SURFACE_EXCLUSIONS,
    ...(brief.scene_exclusions || []).map((e) => `no ${e}`),
  ];

  const prompt = [
    // Narrative opening — describe the photograph as a photograph.
    `A ${SERIES_BIBLE.medium}. ${brief.scene}`,
    "",
    // The subject/gesture/light triple — one sentence each.
    `Subject of the frame: ${brief.subject}, ${brief.gesture}.`,
    `Lighting: ${brief.light}. Broader lighting philosophy for this series — ${SERIES_BIBLE.lighting_philosophy}. ${SERIES_BIBLE.color_temperature}.`,
    "",
    // Technical / craft layer (shared across the series).
    `Shot on ${SERIES_BIBLE.lens}. ${SERIES_BIBLE.grain}. ${SERIES_BIBLE.composition}.`,
    `Palette: ${SERIES_BIBLE.palette}.`,
    `Colour grade: ${SERIES_BIBLE.color_grade}.`,
    `Craft rules: ${SERIES_BIBLE.craft_rules.join("; ")}.`,
    "",
    // Mood anchor.
    `Mood: ${brief.mood}. The image should feel honest, unposed, and quietly specific.`,
    "",
    // Hard constraint tail — scene-level exclusions AFTER the positive
    // description. This ordering works better than a prefix.
    `Hard constraints (strictly enforced): ${exclusions.join("; ")}. No extra fingers, no warped faces, no melting or surreal objects, no painterly brush texture, no illustration look — photographic realism only.`,
  ].join(" ");

  const alt = `Editorial cover photograph for "${entry.title}". ${brief.scene}`;
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
      // gpt-image-1 supports 1536x1024 (3:2); dall-e-3 only supports
      // 1024x1024, 1024x1792, and 1792x1024. Close-to-16:9 from both.
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

  // Step 1: read the actual post body.
  const postFile = findPostFile(opts.repoRoot, opts.entry.slug);
  if (!postFile) {
    throw new Error(
      `No page.tsx found for slug "${opts.entry.slug}" — cannot build visual brief.`,
    );
  }
  const post = parsePost(postFile, opts.entry.slug);

  // Step 2: extract visual brief via GPT-4o-mini.
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
  process.stdout.write(`     thesis: ${brief.thesis}\n`);
  process.stdout.write(`     scene:  ${brief.scene}\n`);

  // Step 3: build prompt and generate.
  const { prompt, alt } = buildPrompt(opts.entry, brief);

  process.stdout.write(`  → rendering cover ... `);
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
    brief,
    promptUsed: prompt,
    bytes: compressed.byteLength,
    model,
    cached: false,
  };
}

// Rewrite lib/blog-posts.ts to point featuredImage at the new cover for
// each entry that has one on disk. Also refreshes featuredImageAlt.
export function updateRegistryFeaturedImages(opts: {
  repoRoot: string;
  covers: GeneratedCover[];
}): { updated: string[]; skipped: string[] } {
  const registryPath = join(opts.repoRoot, "lib", "blog-posts.ts");
  let raw = readFileSync(registryPath, "utf8");
  const updated: string[] = [];
  const skipped: string[] = [];

  // Match a double-quoted TS string literal that correctly honours `\"`
  // and `\\` escapes. The capture group is the quoted literal including
  // its outer quotes, so the replacement can safely drop a new literal in.
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

    // Alt may span multiple lines with a leading newline + indentation.
    // Use a non-greedy, escape-aware match for its literal value.
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
