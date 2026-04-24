// Preview cover generator (GrowLeads-style, split pipeline).
//
// The blog cover is assembled from two layers:
//   1. gpt-image-1 renders ONLY the 3D-illustration background — left
//      half is explicitly empty navy so we have guaranteed space for
//      text overlay.
//   2. Node composites a typography overlay with pixel-perfect Inter
//      headline + ProNEET wordmark using satori + resvg — no relying on
//      the image model for text.
//
// Run: npx tsx scripts/enhance/preview-cover.ts

import dotenv from "dotenv";
import OpenAI from "openai";
import sharp from "sharp";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import React from "react";

for (const f of [".env.local", ".env.development.local", ".env"]) {
  const p = join(process.cwd(), f);
  if (existsSync(p)) dotenv.config({ path: p, override: false });
}

// --- Target -------------------------------------------------------------

const POST = {
  slug: "proneet-vs-allen-jaipur",
  headline: "ProNEET vs Allen Jaipur",
  subhead: "An Honest Comparison",
  // Describes the 3D clay illustration that will occupy the right side.
  iconography:
    "Two matte clay 3D models side by side, both resting on a soft dark navy surface. On the left, a small intimate cluster of about six low-poly figurine shapes arranged around one taller figurine — warm orange rim-light grazing this cluster. On the right, a much larger square plinth holding a neat 5x5 grid of identical small figurines, cool blue studio light only. A subtle thin white double-headed arrow floats in the air midway between the two groups.",
};

// --- Prompt (image-only, no text) --------------------------------------

const imagePrompt = `A 16:9 landscape graphic cover for a blog. NOT a photograph. A modern B2B-SaaS style editorial cover, pure 3D clay illustration on a solid navy background.

BACKGROUND: a rich solid navy-blue gradient filling the ENTIRE canvas. Top-left corner is #0F172A deep navy, bottom-right is #1E3A8A brand blue, with a subtle diagonal sheen across the mid-frame. No white anywhere. No stars, no grid pattern, no particles, no abstract shapes. Just the clean confident navy gradient.

LAYOUT RULE — ABSOLUTELY CRITICAL:
The LEFT 45% of the frame MUST be empty navy background. No illustration, no objects, no figurines, no decorative shapes, nothing. Only the plain navy gradient. This space is reserved for text that will be added separately.
The RIGHT 55% of the frame is where all the 3D illustration lives.

ILLUSTRATION (right 55% only):
${POST.iconography}

RENDERING:
Matte clay plastic 3D, in the Spline / Icons8 Isometric style. Gentle bevels on every edge. Soft contact shadows on the navy floor. One warm orange #F97316 rim light grazing the small cluster only. Cool blue studio key light from upper-left on the grid. No harsh glossy reflections, no chrome, no glass. Figurines are matte white-to-pale-blue plastic, except for ONE figurine in the small cluster which is warm orange #F97316 as the hero accent.

COMPOSITION: 16:9 landscape, 3D group vertically centred on the right. Generous breathing room on ALL sides. Subject off-centre.

HARD CONSTRAINTS:
- ABSOLUTELY NO TEXT anywhere in the frame. No letters, no numbers, no words, no captions, no subtitles, no watermarks, no logos. Zero typography.
- The left 45% of the canvas is strictly empty navy gradient.
- No real brand logos, no UI mockups, no browser chrome, no stat callouts.
- No photorealistic humans, no photographic textures — 3D clay illustration only.
- No extra fingers or warped shapes on the figurines.
- Background must be solid navy gradient, never white, never light.`;

// --- Text overlay (satori → PNG) ---------------------------------------

// JSX-in-satori without TSX support in this file — build the tree with
// React.createElement. Satori consumes a subset of CSS.
const BRAND = {
  navy: "#0F172A",
  brandBlue: "#2563EB",
  brandLight: "#3B82F6",
  orange: "#F97316",
  white: "#FFFFFF",
  softWhite: "#E2E8F0",
};

function TextOverlay(opts: {
  wordmark: string;
  headline: string;
  subhead: string;
  width: number;
  height: number;
}): unknown {
  const padX = Math.round(opts.width * 0.06);
  const padY = Math.round(opts.height * 0.09);
  return React.createElement(
    "div",
    {
      style: {
        width: opts.width,
        height: opts.height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: `${padY}px ${padX}px`,
        // Transparent — this gets composited over the image.
      },
    },
    // Top: wordmark lockup
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 14,
        },
      },
      // Rounded-square icon mark
      React.createElement("div", {
        style: {
          width: 40,
          height: 40,
          borderRadius: 10,
          background: BRAND.brandBlue,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 24px ${BRAND.brandLight}44`,
        },
        children: React.createElement("div", {
          style: {
            width: 16,
            height: 16,
            borderRadius: 4,
            background: BRAND.orange,
          },
        }),
      }),
      React.createElement(
        "span",
        {
          style: {
            fontFamily: "Inter",
            fontWeight: 700,
            fontSize: 28,
            color: BRAND.white,
            letterSpacing: "-0.01em",
          },
        },
        opts.wordmark,
      ),
    ),
    // Bottom: headline block
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          maxWidth: Math.round(opts.width * 0.44),
        },
      },
      React.createElement(
        "div",
        {
          style: {
            fontFamily: "Inter",
            fontWeight: 700,
            fontSize: 58,
            lineHeight: 1.08,
            color: BRAND.white,
            letterSpacing: "-0.02em",
          },
        },
        opts.headline,
      ),
      React.createElement(
        "div",
        {
          style: {
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: 28,
            lineHeight: 1.25,
            color: BRAND.softWhite,
            marginTop: 18,
            letterSpacing: "-0.005em",
          },
        },
        opts.subhead,
      ),
    ),
  );
}

async function renderTextOverlayPng(opts: {
  wordmark: string;
  headline: string;
  subhead: string;
  width: number;
  height: number;
}): Promise<Buffer> {
  const fontRoot = join(
    process.cwd(),
    "node_modules",
    "@fontsource",
    "inter",
    "files",
  );
  const interBold = readFileSync(
    join(fontRoot, "inter-latin-700-normal.woff"),
  );
  const interMedium = readFileSync(
    join(fontRoot, "inter-latin-500-normal.woff"),
  );
  const svg = await satori(
    TextOverlay(opts) as Parameters<typeof satori>[0],
    {
      width: opts.width,
      height: opts.height,
      fonts: [
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
        { name: "Inter", data: interMedium, weight: 500, style: "normal" },
      ],
    },
  );
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: opts.width } });
  return resvg.render().asPng();
}

// --- Runner -------------------------------------------------------------

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY missing");
  const client = new OpenAI({ apiKey });

  const outDir = join(process.cwd(), "public", "blog", "_previews");
  mkdirSync(outDir, { recursive: true });
  const bgPath = join(outDir, `${POST.slug}-bg.webp`);
  const finalPath = join(outDir, `${POST.slug}-preview.webp`);

  // 1. Generate the background image.
  console.log(`→ rendering 3D illustration background ...`);
  const res = await client.images.generate({
    model: "gpt-image-1",
    prompt: imagePrompt,
    n: 1,
    size: "1536x1024",
  });
  const first = res.data?.[0];
  if (!first?.b64_json && !first?.url) throw new Error("no image");
  let bgBytes: Buffer;
  if (first.b64_json) bgBytes = Buffer.from(first.b64_json, "base64");
  else {
    const r = await fetch(first.url!);
    bgBytes = Buffer.from(await r.arrayBuffer());
  }
  const bgResized = await sharp(bgBytes)
    .resize(1200, 675, { fit: "cover", position: "center" })
    .toBuffer();
  writeFileSync(bgPath, await sharp(bgResized).webp({ quality: 90 }).toBuffer());
  console.log(`  background saved → ${bgPath}`);

  // 2. Render text overlay.
  console.log(`→ rendering typography overlay ...`);
  const overlayPng = await renderTextOverlayPng({
    wordmark: "ProNEET",
    headline: POST.headline,
    subhead: POST.subhead,
    width: 1200,
    height: 675,
  });

  // 3. Composite.
  console.log(`→ compositing ...`);
  let quality = 86;
  let composed = await sharp(bgResized)
    .composite([{ input: overlayPng, top: 0, left: 0 }])
    .webp({ quality, effort: 6 })
    .toBuffer();
  while (composed.byteLength > 140 * 1024 && quality > 40) {
    quality -= 8;
    composed = await sharp(bgResized)
      .composite([{ input: overlayPng, top: 0, left: 0 }])
      .webp({ quality, effort: 6 })
      .toBuffer();
  }
  writeFileSync(finalPath, composed);
  console.log(
    `✓ final preview → ${finalPath} (${Math.round(composed.byteLength / 1024)}KB, q${quality})`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
