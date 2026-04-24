// Typography overlay for blog covers.
// Renders a pixel-perfect headline + subhead + brand lockup on a
// transparent canvas via satori (JSX → SVG) + resvg (SVG → PNG), using
// real Inter .woff files from @fontsource/inter. The caller composites
// this over the AI-generated background image.
//
// Kept separate from cover-gen so the preview script and the main
// pipeline share identical typography rules — change the brand lockup
// or font sizing here and every cover updates.

import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import React from "react";

export const BRAND_TOKENS = {
  navy: "#0F172A",
  brandBlue: "#2563EB",
  brandLight: "#3B82F6",
  orange: "#F97316",
  white: "#FFFFFF",
  softWhite: "#E2E8F0",
} as const;

export interface TextOverlayOptions {
  wordmark: string;
  headline: string;
  subhead: string;
  width: number;
  height: number;
}

function buildTree(opts: TextOverlayOptions): unknown {
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
      },
    },
    // Top-left brand lockup
    React.createElement(
      "div",
      { style: { display: "flex", alignItems: "center", gap: 14 } },
      React.createElement("div", {
        style: {
          width: 40,
          height: 40,
          borderRadius: 10,
          background: BRAND_TOKENS.brandBlue,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 24px ${BRAND_TOKENS.brandLight}44`,
        },
        children: React.createElement("div", {
          style: {
            width: 16,
            height: 16,
            borderRadius: 4,
            background: BRAND_TOKENS.orange,
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
            color: BRAND_TOKENS.white,
            letterSpacing: "-0.01em",
          },
        },
        opts.wordmark,
      ),
    ),
    // Bottom-left headline + subhead
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          maxWidth: Math.round(opts.width * 0.46),
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
            color: BRAND_TOKENS.white,
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
            color: BRAND_TOKENS.softWhite,
            marginTop: 18,
            letterSpacing: "-0.005em",
          },
        },
        opts.subhead,
      ),
    ),
  );
}

let cachedFonts: { bold: Buffer; medium: Buffer } | null = null;
function loadFonts(repoRoot: string): { bold: Buffer; medium: Buffer } {
  if (cachedFonts) return cachedFonts;
  const base = join(
    repoRoot,
    "node_modules",
    "@fontsource",
    "inter",
    "files",
  );
  cachedFonts = {
    bold: readFileSync(join(base, "inter-latin-700-normal.woff")),
    medium: readFileSync(join(base, "inter-latin-500-normal.woff")),
  };
  return cachedFonts;
}

export async function renderTextOverlayPng(
  opts: TextOverlayOptions,
  repoRoot: string = process.cwd(),
): Promise<Buffer> {
  const fonts = loadFonts(repoRoot);
  const svg = await satori(
    buildTree(opts) as Parameters<typeof satori>[0],
    {
      width: opts.width,
      height: opts.height,
      fonts: [
        { name: "Inter", data: fonts.bold, weight: 700, style: "normal" },
        { name: "Inter", data: fonts.medium, weight: 500, style: "normal" },
      ],
    },
  );
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: opts.width },
  });
  return resvg.render().asPng();
}
