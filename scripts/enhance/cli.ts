#!/usr/bin/env tsx
// Content enhance CLI.
//
// Usage (from repo root):
//   npm run enhance -- audit <slug>          # SEO audit only
//   npm run enhance -- images <slug>         # generate missing images
//   npm run enhance -- links <slug>          # suggest internal + outbound links
//   npm run enhance -- all <slug>            # audit → images → links → audit (after)
//   npm run enhance -- all --all             # run on every registered post
//
// Flags:
//   --force            regenerate images even if they already exist
//   --max-images <n>   cap number of images per post (default 6)

import dotenv from "dotenv";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// Load env in priority order: .env.local → .env.development.local → .env
for (const f of [".env.local", ".env.development.local", ".env"]) {
  const p = join(process.cwd(), f);
  if (existsSync(p)) dotenv.config({ path: p, override: false });
}

import { findPostFile, parsePost } from "./parse-post.js";
import { auditPost, formatReport } from "./audit.js";
import { generateForPost } from "./image-gen.js";
import {
  readBlogRegistry,
  generateCoverFor,
  updateRegistryFeaturedImages,
  type GeneratedCover,
} from "./cover-gen.js";
import { suggestLinks, formatSuggestions } from "./link-suggest.js";
import { planInfographics, formatPlan } from "./plan-infographics.js";
import { PATHS } from "./config.js";

const REPO_ROOT = process.cwd();

const KNOWN_SLUGS = [
  // blog
  "neet-coaching-in-jaipur",
  "best-neet-coaching-in-jaipur",
  "jee-coaching-in-jaipur",
  // locations
  "mansarovar",
];

type Command = "audit" | "images" | "links" | "plan" | "covers" | "all";

function parseArgs(argv: string[]): {
  command: Command;
  slug: string | null;
  allPosts: boolean;
  force: boolean;
  maxImages: number;
} {
  const args = argv.slice(2);
  const command = (args[0] as Command) || "audit";
  let slug: string | null = null;
  let allPosts = false;
  let force = false;
  let maxImages = 6;
  for (let i = 1; i < args.length; i++) {
    const a = args[i];
    if (a === "--all") allPosts = true;
    else if (a === "--force") force = true;
    else if (a === "--max-images") maxImages = Number(args[++i]) || 6;
    else if (!slug) slug = a;
  }
  return { command, slug, allPosts, force, maxImages };
}

async function runOne(
  slug: string,
  command: Command,
  flags: { force: boolean; maxImages: number },
): Promise<void> {
  const filePath = findPostFile(REPO_ROOT, slug);
  if (!filePath) {
    console.error(`  ! No page.tsx found for slug "${slug}"`);
    return;
  }
  const post = parsePost(filePath, slug);

  const reportDir = join(REPO_ROOT, PATHS.enhanceReports);
  mkdirSync(reportDir, { recursive: true });

  if (command === "audit" || command === "all") {
    const report = auditPost(post);
    const text = formatReport(report);
    console.log(text);
    writeFileSync(join(reportDir, `${slug}-audit.md`), text);
    writeFileSync(
      join(reportDir, `${slug}-audit.json`),
      JSON.stringify(report, null, 2),
    );
  }

  if (command === "images" || command === "all") {
    console.log(`\n[images] generating for "${slug}" ...`);
    try {
      const results = await generateForPost({
        repoRoot: REPO_ROOT,
        slug,
        postTitle: post.title || slug,
        sections: post.sections,
        force: flags.force,
        maxImages: flags.maxImages,
      });
      console.log(`  generated: ${results.length} image(s)`);
      writeFileSync(
        join(reportDir, `${slug}-images.json`),
        JSON.stringify(results, null, 2),
      );
      const md = results
        .map(
          (r) =>
            `### ${r.sectionHeading}\n- Path: \`${r.publicPath}\`\n- Alt: ${r.alt}\n- Size: ${Math.round(r.bytes / 1024)}KB\n- Model: ${r.model}\n`,
        )
        .join("\n");
      writeFileSync(
        join(reportDir, `${slug}-images.md`),
        `# Generated images — ${slug}\n\n${md}`,
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ! image generation failed: ${msg}`);
    }
  }

  if (command === "links" || command === "all") {
    const suggestions = suggestLinks(post);
    const text = formatSuggestions(slug, suggestions);
    console.log(text);
    writeFileSync(join(reportDir, `${slug}-links.md`), text);
    writeFileSync(
      join(reportDir, `${slug}-links.json`),
      JSON.stringify(suggestions, null, 2),
    );
  }

  if (command === "plan") {
    console.log(`\n[plan] asking GPT-4 for infographic plan ...`);
    try {
      const plan = await planInfographics(post);
      const text = formatPlan(plan);
      console.log(text);
      writeFileSync(join(reportDir, `${slug}-plan.md`), text);
      writeFileSync(
        join(reportDir, `${slug}-plan.json`),
        JSON.stringify(plan, null, 2),
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ! plan failed: ${msg}`);
    }
  }

  if (command === "all") {
    // Re-audit so the diff against the starting report is visible.
    const after = auditPost(parsePost(filePath, slug));
    console.log(
      `\n[re-audit] ${slug} score: ${after.score.toFixed(1)}/${after.maxScore} (${after.pct}%)`,
    );
  }
}

async function runCovers(flags: {
  force: boolean;
  only: string | null;
}): Promise<void> {
  const entries = readBlogRegistry(REPO_ROOT).filter(
    (e) => !flags.only || e.slug === flags.only,
  );
  if (entries.length === 0) {
    console.error(
      flags.only
        ? `No blog-posts.ts entry with slug "${flags.only}"`
        : "No blog-posts.ts entries found",
    );
    process.exit(1);
  }

  const reportDir = join(REPO_ROOT, PATHS.enhanceReports);
  mkdirSync(reportDir, { recursive: true });

  const results: GeneratedCover[] = [];
  for (const entry of entries) {
    console.log(`\n=== cover: ${entry.slug} (${entry.category}) ===`);
    try {
      const cover = await generateCoverFor({
        repoRoot: REPO_ROOT,
        entry,
        force: flags.force,
      });
      results.push(cover);
      if (cover.cached) {
        console.log("  (cached — no API call made)");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ! cover failed for ${entry.slug}: ${msg}`);
    }
  }

  const { updated, skipped } = updateRegistryFeaturedImages({
    repoRoot: REPO_ROOT,
    covers: results,
  });
  console.log(
    `\n[registry] updated featuredImage for ${updated.length} post(s): ${updated.join(", ") || "none"}`,
  );
  if (skipped.length) {
    console.log(`[registry] unchanged: ${skipped.join(", ")}`);
  }

  writeFileSync(
    join(reportDir, "covers.json"),
    JSON.stringify(results, null, 2),
  );
  const md = results
    .map(
      (r) =>
        `### ${r.slug}\n- Path: \`${r.publicPath}\`\n- Alt: ${r.alt}\n- Size: ${r.cached ? "cached" : `${Math.round(r.bytes / 1024)}KB`}\n- Model: ${r.model}\n`,
    )
    .join("\n");
  writeFileSync(
    join(reportDir, "covers.md"),
    `# Generated blog covers\n\n${md}`,
  );
}

async function main() {
  const { command, slug, allPosts, force, maxImages } = parseArgs(
    process.argv,
  );

  if (command === "covers") {
    await runCovers({ force, only: slug });
    return;
  }

  const slugs = allPosts ? KNOWN_SLUGS : slug ? [slug] : [];
  if (slugs.length === 0) {
    console.error(
      "Usage: npm run enhance -- <audit|images|links|covers|all> [slug] [--force] [--max-images N]\n" +
        "   covers with no slug regenerates all blog cover images.\n" +
        "   or: npm run enhance -- <cmd> --all",
    );
    process.exit(1);
  }
  for (const s of slugs) {
    console.log(`\n=== ${s} ===`);
    await runOne(s, command, { force, maxImages });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
