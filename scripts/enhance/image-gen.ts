// Image generator. For each content section, build a scene prompt,
// call OpenAI's image API, and save a <100KB WebP to public/blog/<slug>/.

import OpenAI from "openai";
import sharp from "sharp";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { PostSection } from "./parse-post.js";
import {
  BRAND,
  IMAGE_SIZE,
  OPENAI_IMAGE_MODEL,
  OPENAI_IMAGE_FALLBACK,
  AUDIT_THRESHOLDS,
  PATHS,
} from "./config.js";

export interface GeneratedImage {
  sectionHeading: string;
  sectionSlug: string;
  filePath: string;
  publicPath: string;
  alt: string;
  promptUsed: string;
  bytes: number;
  model: string;
}

function buildPrompt(
  postTitle: string,
  section: PostSection,
): { prompt: string; alt: string } {
  const firstSentence =
    section.sectionText
      .split(/(?<=[.!?])\s+/)
      .find((s) => s.length > 30 && s.length < 250) || section.sectionText.slice(0, 200);

  const prompt = [
    BRAND.visualStyle,
    "Subject:",
    `A photographic scene that visually represents the idea: "${section.heading}".`,
    "Context:",
    `This is an illustration for a long-form guide titled "${postTitle}", specifically the section "${section.heading}".`,
    `The mood of the section is: "${firstSentence}"`,
    "Requirements:",
    "No visible text, no signboards, no watermarks, no numbers, no branding.",
    "Depict real Indian students or faculty only where the narrative needs it; otherwise prefer an empty-room or architectural shot.",
    "Absolutely no AI-typical artifacts: no extra fingers, no melting objects, no surreal elements.",
    "Documentary realism, not stock photography; warm color grade.",
    `Palette accents to use naturally: ${Object.values(BRAND.palette).join(", ")}.`,
  ].join(" ");

  const alt = `${section.heading}. Editorial photograph illustrating this section of "${postTitle}".`;
  return { prompt, alt };
}

async function compressWebp(
  inputBuffer: Buffer,
  targetKb: number = AUDIT_THRESHOLDS.maxImageSizeKb,
): Promise<Buffer> {
  const targetBytes = targetKb * 1024;
  let quality = 80;
  let result = await sharp(inputBuffer)
    .resize(IMAGE_SIZE.width, IMAGE_SIZE.height, {
      fit: "cover",
      position: "center",
    })
    .webp({ quality, effort: 6 })
    .toBuffer();
  while (result.byteLength > targetBytes && quality > 30) {
    quality -= 10;
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
  // Try the latest model first; fall back if the account doesn't have access.
  const tryModels = [OPENAI_IMAGE_MODEL, OPENAI_IMAGE_FALLBACK] as const;
  let lastErr: unknown = null;
  for (const model of tryModels) {
    try {
      const res = await client.images.generate({
        model,
        prompt,
        n: 1,
        size: "1536x1024",
        // gpt-image-1 returns b64_json by default; dall-e-3 returns a URL.
        // Handle both.
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
  throw lastErr ?? new Error("All models failed");
}

export async function generateForPost(opts: {
  repoRoot: string;
  slug: string;
  postTitle: string;
  sections: PostSection[];
  force?: boolean;
  minSectionWords?: number;
  maxImages?: number;
}): Promise<GeneratedImage[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY not found. Set it in .env.local before running.",
    );
  }
  const client = new OpenAI({ apiKey });

  const outDir = join(opts.repoRoot, PATHS.publicBlogImages, opts.slug);
  mkdirSync(outDir, { recursive: true });

  const minWords = opts.minSectionWords ?? 120;
  const limit = opts.maxImages ?? 6;
  const candidates = opts.sections
    .filter((s) => s.wordCount >= minWords)
    .slice(0, limit);

  const results: GeneratedImage[] = [];
  for (const section of candidates) {
    const filePath = join(outDir, `${section.slug}.webp`);
    const publicPath = `/blog/${opts.slug}/${section.slug}.webp`;
    if (!opts.force && existsSync(filePath)) {
      results.push({
        sectionHeading: section.heading,
        sectionSlug: section.slug,
        filePath,
        publicPath,
        alt: `${section.heading}. Editorial photograph illustrating "${opts.postTitle}".`,
        promptUsed: "(cached — use --force to regenerate)",
        bytes: 0,
        model: "cached",
      });
      continue;
    }
    const { prompt, alt } = buildPrompt(opts.postTitle, section);
    process.stdout.write(`  → generating: ${section.slug} ... `);
    const { bytes, model } = await generateOne(client, prompt);
    const compressed = await compressWebp(bytes);
    writeFileSync(filePath, compressed);
    process.stdout.write(`ok (${Math.round(compressed.byteLength / 1024)}KB, ${model})\n`);
    results.push({
      sectionHeading: section.heading,
      sectionSlug: section.slug,
      filePath,
      publicPath,
      alt,
      promptUsed: prompt,
      bytes: compressed.byteLength,
      model,
    });
  }
  return results;
}
