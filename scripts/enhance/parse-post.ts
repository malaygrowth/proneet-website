// Light-weight TSX parser. We hand-write blog post TSX with a consistent
// structure (sections, h2, paragraphs), so regex extraction is enough.

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export interface PostSection {
  heading: string;
  headingIsQuestion: boolean;
  sectionText: string;
  slug: string;
  wordCount: number;
  charStart: number;
  charEnd: number;
}

export interface PostMetadata {
  slug: string;
  filePath: string;
  title: string | null;
  metaDescription: string | null;
  canonical: string | null;
  primaryKeyword: string | null;
  category: string | null;
  h1: string | null;
  h2s: string[];
  sections: PostSection[];
  rawText: string;
  body: string;
  hasKeyTakeaways: boolean;
  keyTakeawaysCount: number;
  hasFaq: boolean;
  faqCount: number;
  hasBreadcrumbSchema: boolean;
  hasArticleSchema: boolean;
  hasPersonSchema: boolean;
  hasCourseSchema: boolean;
  hasLocalBusinessSchema: boolean;
  internalLinks: string[];
  externalLinks: string[];
  imageSrcs: string[];
  featuredImage: string | null;
  featuredImageAlt: string | null;
  wordCount: number;
}

const kebab = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function stripJsx(text: string): string {
  return text
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, " ")
    .replace(/\{[^{}]*?\}/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&apos;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export function findPostFile(repoRoot: string, slug: string): string | null {
  const candidates = [
    join(repoRoot, "app", "blog", slug, "page.tsx"),
    join(repoRoot, "app", "locations", slug, "page.tsx"),
    join(repoRoot, "app", slug, "page.tsx"),
  ];
  return candidates.find((p) => existsSync(p)) ?? null;
}

interface BlogRegistryEntry {
  slug: string;
  title: string;
  description: string;
  featuredImage: string;
  featuredImageAlt: string;
  category: string;
  targetKeyword: string;
  author: string;
  authorRole: string;
}

function readBlogRegistry(repoRoot: string): Record<string, BlogRegistryEntry> {
  const registryPath = join(repoRoot, "lib", "blog-posts.ts");
  if (!existsSync(registryPath)) return {};
  const raw = readFileSync(registryPath, "utf8");
  const entries: Record<string, BlogRegistryEntry> = {};
  // Each object starts at "{" after the array "BLOG_POSTS = ["; split on slug markers.
  const slugMatches = Array.from(raw.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g));
  for (let i = 0; i < slugMatches.length; i++) {
    const slug = slugMatches[i][1];
    const start = slugMatches[i].index ?? 0;
    const end =
      i + 1 < slugMatches.length
        ? (slugMatches[i + 1].index ?? raw.length)
        : raw.length;
    const block = raw.slice(start, end);
    const pick = (key: string) => {
      const m = block.match(
        new RegExp(`${key}:\\s*\\n?\\s*["\`']([^"\`']+)["\`']`),
      );
      return m ? m[1] : "";
    };
    entries[slug] = {
      slug,
      title: pick("title"),
      description: pick("description"),
      featuredImage: pick("featuredImage"),
      featuredImageAlt: pick("featuredImageAlt"),
      category: pick("category"),
      targetKeyword: pick("targetKeyword"),
      author: pick("author"),
      authorRole: pick("authorRole"),
    };
  }
  return entries;
}

export function parsePost(filePath: string, slug: string): PostMetadata {
  const raw = readFileSync(filePath, "utf8");

  // Pages may reference a shared BLOG_POSTS entry (title, description,
  // etc.) instead of inlining every string literal. Load the registry so
  // we can resolve those references.
  const repoRoot = process.cwd();
  const registry = readBlogRegistry(repoRoot);
  const registryEntry = registry[slug];

  const usesPostObject = /\bPOST\./.test(raw);

  // Isolate the metadata export block so we don't accidentally match
  // `title:` fields from other data constants (CHECKS, FAQS, etc.) on
  // the same page.
  const metadataBlockMatch = raw.match(
    /export\s+const\s+metadata\s*:\s*Metadata\s*=\s*\{([\s\S]*?)\n\};?/,
  );
  const metadataBlock = metadataBlockMatch ? metadataBlockMatch[1] : "";

  // Match values that may contain apostrophes (use a greedy group that
  // terminates on closing quote of the same flavour).
  const pickFromMetadata = (key: string): string | null => {
    const patterns = [
      new RegExp(`${key}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "m"),
      new RegExp(`${key}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, "m"),
      new RegExp(`${key}:\\s*\\\`((?:[^\\\\\\\`]|\\\\.)*)\\\``, "m"),
    ];
    const block = metadataBlock || raw;
    for (const re of patterns) {
      const m = block.match(re);
      if (m)
        return m[1]
          .replace(/\\"/g, '"')
          .replace(/\\'/g, "'")
          .replace(/\\\\/g, "\\");
    }
    return null;
  };

  const titleLiteralMatch = pickFromMetadata("title");
  const descLiteralMatch = pickFromMetadata("description");
  const canonicalMatch = raw.match(/canonical:\s*["'`]([^"'`]+)["'`]/);
  const targetKeywordLiteral = null; // only in registry, not metadata
  const categoryLiteral = null; // only in registry, not metadata

  const resolvedTitle =
    titleLiteralMatch ||
    (usesPostObject && registryEntry ? registryEntry.title : null);
  const resolvedDescription =
    descLiteralMatch ||
    (usesPostObject && registryEntry ? registryEntry.description : null);
  const resolvedCategory =
    usesPostObject && registryEntry ? registryEntry.category : null;
  const resolvedKeyword =
    usesPostObject && registryEntry ? registryEntry.targetKeyword : null;
  const resolvedFeaturedImage = (usesPostObject && registryEntry
    ? registryEntry.featuredImage
    : null) ||
    raw.match(/featuredImage:\s*["'`]([^"'`]+)["'`]/)?.[1] ||
    null;
  const resolvedFeaturedAlt = (usesPostObject && registryEntry
    ? registryEntry.featuredImageAlt
    : null) ||
    raw.match(/featuredImageAlt:\s*["'`]([^"'`]+)["'`]/)?.[1] ||
    null;

  const h1Match = raw.match(/<h1[^>]*>\s*([\s\S]*?)\s*<\/h1>/);
  let h1 = h1Match ? stripJsx(h1Match[1]) : null;
  // If the h1 body was a JSX expression like {POST.title}, strip left
  // nothing — fall back to registry title.
  if ((!h1 || h1.length < 4) && registryEntry && usesPostObject) {
    h1 = registryEntry.title;
  }

  const h2Regex = /<h2[^>]*>\s*([\s\S]*?)\s*<\/h2>/g;
  const h2s: string[] = [];
  let h2m: RegExpExecArray | null;
  while ((h2m = h2Regex.exec(raw))) h2s.push(stripJsx(h2m[1]));

  const sections: PostSection[] = [];
  const sectionSplits: { heading: string; start: number }[] = [];
  h2Regex.lastIndex = 0;
  while ((h2m = h2Regex.exec(raw))) {
    sectionSplits.push({ heading: stripJsx(h2m[1]), start: h2m.index });
  }
  for (let i = 0; i < sectionSplits.length; i++) {
    const end =
      i + 1 < sectionSplits.length ? sectionSplits[i + 1].start : raw.length;
    const block = raw.slice(sectionSplits[i].start, end);
    const text = stripJsx(block.replace(/<h2[^>]*>[\s\S]*?<\/h2>/, ""));
    sections.push({
      heading: sectionSplits[i].heading,
      headingIsQuestion: /\?\s*$/.test(sectionSplits[i].heading),
      sectionText: text,
      slug: kebab(sectionSplits[i].heading).slice(0, 60),
      wordCount: wordCount(text),
      charStart: sectionSplits[i].start,
      charEnd: end,
    });
  }

  const hasArticleSchema = /<ArticleJsonLd\b/.test(raw);
  const hasBreadcrumbSchema = /<BreadcrumbJsonLd\b/.test(raw);
  const hasPersonSchema = /<PersonJsonLd\b/.test(raw);
  const hasCourseSchema = /<CourseJsonLd\b/.test(raw);
  const hasLocalBusinessSchema = /<LocalBusinessJsonLd\b/.test(raw);

  const ktMatch = raw.match(
    /<KeyTakeaways[\s\S]*?bullets=\{\s*\[([\s\S]*?)\]\s*\}/,
  );
  let keyTakeawaysCount = 0;
  if (ktMatch) {
    const bullets = ktMatch[1].match(/["'`]([^"'`]+)["'`]/g);
    keyTakeawaysCount = bullets ? bullets.length : 0;
  }
  const hasKeyTakeaways = keyTakeawaysCount > 0;

  const faqArrayMatch = raw.match(
    /const\s+FAQS\s*=\s*\[([\s\S]*?)\];?\s*\n(?:\s*\n|\s*(?:export|const|function|interface|import))/,
  );
  const faqCount = faqArrayMatch
    ? (faqArrayMatch[1].match(/\{\s*question:/g) || []).length
    : 0;
  const hasFaq = faqCount > 0;

  const hrefs = Array.from(raw.matchAll(/href=["'`]([^"'`]+)["'`]/g)).map(
    (m) => m[1],
  );
  const internalLinks = hrefs.filter(
    (h) => h.startsWith("/") && !h.startsWith("//") && !h.startsWith("/api/"),
  );
  const externalLinks = hrefs.filter((h) => /^https?:\/\//.test(h));

  const imageSrcs = Array.from(
    raw.matchAll(/<Image[^>]*\bsrc=\{?\s*["'`]([^"'`]+)["'`]\s*\}?/g),
  ).map((m) => m[1]);
  // For the body, strip imports + metadata export, then keep everything
  // else. This includes top-level data constants (CHECKS, FAQS) whose
  // string values do get rendered into the page.
  let bodyRaw = raw;
  bodyRaw = bodyRaw.replace(/^import[^\n]*\n/gm, "");
  bodyRaw = bodyRaw.replace(
    /export\s+const\s+metadata\s*:\s*Metadata\s*=\s*\{[\s\S]*?\n\};?\n?/,
    "",
  );
  const bodyText = stripJsx(bodyRaw);

  return {
    slug,
    filePath,
    title: resolvedTitle,
    metaDescription: resolvedDescription,
    canonical: canonicalMatch ? canonicalMatch[1] : null,
    primaryKeyword: resolvedKeyword,
    category: resolvedCategory,
    h1,
    h2s,
    sections,
    rawText: raw,
    body: bodyText,
    hasKeyTakeaways,
    keyTakeawaysCount,
    hasFaq,
    faqCount,
    hasArticleSchema,
    hasBreadcrumbSchema,
    hasPersonSchema,
    hasCourseSchema,
    hasLocalBusinessSchema,
    internalLinks,
    externalLinks,
    imageSrcs,
    featuredImage: resolvedFeaturedImage,
    featuredImageAlt: resolvedFeaturedAlt,
    wordCount: wordCount(bodyText),
  };
}
