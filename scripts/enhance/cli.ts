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

type Command =
  | "audit"
  | "images"
  | "links"
  | "plan"
  | "covers"
  | "all"
  | "ship";

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

  // Cover goes first — it's what surfaces the post on /blog and in OG
  // previews, so we want it generated before anything else on a new
  // post. Uses the BLOG_POSTS registry as the source of truth.
  if (command === "all" || command === "ship") {
    const entries = readBlogRegistry(REPO_ROOT);
    const entry = entries.find((e) => e.slug === slug);
    if (!entry) {
      console.warn(
        `  ! no lib/blog-posts.ts entry for "${slug}" — skipping cover generation.`,
      );
    } else {
      console.log(`\n[cover] generating for "${slug}" ...`);
      try {
        const cover = await generateCoverFor({
          repoRoot: REPO_ROOT,
          entry,
          force: flags.force,
        });
        updateRegistryFeaturedImages({
          repoRoot: REPO_ROOT,
          covers: [cover],
        });
        writeFileSync(
          join(reportDir, `${slug}-cover.json`),
          JSON.stringify(cover, null, 2),
        );
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`  ! cover generation failed: ${msg}`);
      }
    }
  }

  if (command === "audit" || command === "all" || command === "ship") {
    const report = auditPost(post);
    const text = formatReport(report);
    console.log(text);
    writeFileSync(join(reportDir, `${slug}-audit.md`), text);
    writeFileSync(
      join(reportDir, `${slug}-audit.json`),
      JSON.stringify(report, null, 2),
    );
  }

  if (command === "images" || command === "all" || command === "ship") {
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

  if (command === "links" || command === "all" || command === "ship") {
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

  if (command === "all" || command === "ship") {
    // Re-audit so the diff against the starting report is visible.
    const after = auditPost(parsePost(filePath, slug));
    console.log(
      `\n[re-audit] ${slug} score: ${after.score.toFixed(1)}/${after.maxScore} (${after.pct}%)`,
    );
  }

  if (command === "ship") {
    console.log(
      `\n[ship] ${slug} is ready. Commit lib/blog-posts.ts, public/blog/${slug}/, app/blog/${slug}/page.tsx, and push to master to deploy.`,
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
      "Usage:\n" +
        "  npm run enhance -- ship <slug>                  # full flow for a new blog post\n" +
        "                                                  # (cover → audit → section images → links)\n" +
        "  npm run enhance -- covers [slug]                # (re)generate cover; no slug = all posts\n" +
        "  npm run enhance -- audit <slug>                 # SEO audit only\n" +
        "  npm run enhance -- images <slug>                # generate section body images\n" +
        "  npm run enhance -- links <slug>                 # suggest internal + outbound links\n" +
        "  npm run enhance -- all <slug>                   # alias for ship\n" +
        "  npm run enhance -- <cmd> --all                  # run on every registered post\n" +
        "\n" +
        "Flags: --force  regenerate even if cached\n" +
        "       --max-images N  cap section images per post (default 6)\n",
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
