// SEO expert: on-page audit. Runs against a parsed PostMetadata and
// reports pass / warn / fail with a scored report. Mirrors Content
// Writer Handbook §13 Quality Gates.

import type { PostMetadata } from "./parse-post.js";
import { AUDIT_THRESHOLDS, BANNED_WORDS } from "./config.js";

export type Severity = "pass" | "warn" | "fail";

export interface Check {
  id: string;
  label: string;
  severity: Severity;
  detail: string;
  recommendation?: string;
  category:
    | "technical"
    | "content"
    | "keyword"
    | "schema"
    | "linking"
    | "image"
    | "voice";
}

export interface AuditReport {
  slug: string;
  filePath: string;
  score: number; // 0-100
  maxScore: number;
  pct: number;
  checks: Check[];
  summary: {
    passed: number;
    warned: number;
    failed: number;
  };
}

const pct = (p: number, t: number) => (t === 0 ? 0 : Math.round((p / t) * 100));

function countOccurrences(text: string, needle: string): number {
  if (!needle) return 0;
  const re = new RegExp(
    `\\b${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
    "gi",
  );
  const m = text.match(re);
  return m ? m.length : 0;
}

function severityScore(s: Severity): number {
  return s === "pass" ? 1 : s === "warn" ? 0.5 : 0;
}

export function auditPost(post: PostMetadata): AuditReport {
  const checks: Check[] = [];

  const push = (c: Check) => checks.push(c);

  // --- Technical: title ---
  if (!post.title) {
    push({
      id: "title-present",
      label: "Title tag present",
      severity: "fail",
      detail: "No `title` found in exported metadata.",
      recommendation: "Add `title` to the page `metadata` export.",
      category: "technical",
    });
  } else {
    const len = post.title.length;
    push({
      id: "title-length",
      label: "Title tag length",
      severity:
        len <= AUDIT_THRESHOLDS.titleMaxChars
          ? "pass"
          : len <= AUDIT_THRESHOLDS.titleMaxChars + 8
            ? "warn"
            : "fail",
      detail: `${len} chars (max ${AUDIT_THRESHOLDS.titleMaxChars}).`,
      recommendation:
        len > AUDIT_THRESHOLDS.titleMaxChars
          ? "Trim to <=60 chars — Google truncates beyond that."
          : undefined,
      category: "technical",
    });
  }

  // --- Technical: meta description ---
  if (!post.metaDescription) {
    push({
      id: "meta-description-present",
      label: "Meta description present",
      severity: "fail",
      detail: "No `description` found in metadata.",
      recommendation: "Add a `description` to the page `metadata` export.",
      category: "technical",
    });
  } else {
    const len = post.metaDescription.length;
    const severity: Severity =
      len >= AUDIT_THRESHOLDS.metaMinChars &&
      len <= AUDIT_THRESHOLDS.metaMaxChars
        ? "pass"
        : len <= AUDIT_THRESHOLDS.metaMaxChars + 15
          ? "warn"
          : "fail";
    push({
      id: "meta-description-length",
      label: "Meta description length",
      severity,
      detail: `${len} chars (target ${AUDIT_THRESHOLDS.metaMinChars}-${AUDIT_THRESHOLDS.metaMaxChars}).`,
      recommendation:
        len > AUDIT_THRESHOLDS.metaMaxChars
          ? "Trim to <=155 chars."
          : len < AUDIT_THRESHOLDS.metaMinChars
            ? "Expand to at least 120 chars with a specific number or differentiator."
            : undefined,
      category: "technical",
    });
  }

  // --- Technical: canonical ---
  push({
    id: "canonical",
    label: "Canonical URL",
    severity: post.canonical ? "pass" : "warn",
    detail: post.canonical
      ? `canonical: ${post.canonical}`
      : "No `alternates.canonical` on this page.",
    recommendation: post.canonical
      ? undefined
      : "Add `alternates: { canonical: '/path' }` to metadata.",
    category: "technical",
  });

  // --- Technical: H1 ---
  push({
    id: "h1-single",
    label: "Single H1",
    severity: post.h1 ? "pass" : "fail",
    detail: post.h1 ? `H1: "${post.h1.slice(0, 80)}"` : "No <h1> detected.",
    recommendation: post.h1 ? undefined : "Every page needs exactly one H1.",
    category: "technical",
  });

  // --- Technical: question H2s (AEO) ---
  const questionH2s = post.h2s.filter((h) => /\?\s*$/.test(h)).length;
  const qPct = pct(questionH2s, post.h2s.length);
  push({
    id: "h2-questions",
    label: "Question-format H2s (AEO)",
    severity:
      post.h2s.length === 0
        ? "fail"
        : qPct >= 50
          ? "pass"
          : qPct >= 30
            ? "warn"
            : "fail",
    detail: `${questionH2s} of ${post.h2s.length} H2s end in "?" (${qPct}%).`,
    recommendation:
      qPct < 50
        ? "Target 50%+ question-format H2s. AI engines match user queries to H2s."
        : undefined,
    category: "technical",
  });

  // --- Schema ---
  const schemas: { key: keyof PostMetadata; label: string }[] = [
    { key: "hasArticleSchema", label: "Article JSON-LD" },
    { key: "hasBreadcrumbSchema", label: "BreadcrumbList JSON-LD" },
  ];
  for (const s of schemas) {
    const present = Boolean(post[s.key]);
    push({
      id: `schema-${s.key}`,
      label: s.label,
      severity: present ? "pass" : "fail",
      detail: present ? "present" : "missing",
      recommendation: present
        ? undefined
        : `Add <${s.label.split(" ")[0]}JsonLd /> to the page.`,
      category: "schema",
    });
  }

  // --- Content: Key Takeaways ---
  push({
    id: "key-takeaways",
    label: "Key Takeaways box",
    severity:
      post.keyTakeawaysCount >= AUDIT_THRESHOLDS.keyTakeawaysMinBullets
        ? "pass"
        : post.hasKeyTakeaways
          ? "warn"
          : "fail",
    detail: `${post.keyTakeawaysCount} bullets (min ${AUDIT_THRESHOLDS.keyTakeawaysMinBullets}).`,
    recommendation: post.hasKeyTakeaways
      ? post.keyTakeawaysCount < AUDIT_THRESHOLDS.keyTakeawaysMinBullets
        ? "Expand to at least 5 bullets; 3+ should include a specific number."
        : undefined
      : "Add <KeyTakeaways> block below the byline.",
    category: "content",
  });

  // --- Content: FAQ ---
  push({
    id: "faq-section",
    label: "FAQ section",
    severity:
      post.faqCount >= AUDIT_THRESHOLDS.faqMinQuestions
        ? "pass"
        : post.hasFaq
          ? "warn"
          : "fail",
    detail: `${post.faqCount} questions (min ${AUDIT_THRESHOLDS.faqMinQuestions}).`,
    recommendation: post.hasFaq
      ? post.faqCount < AUDIT_THRESHOLDS.faqMinQuestions
        ? "Expand to at least 5 Q&As."
        : undefined
      : "Add an FAQ section with at least 5 question/answer pairs.",
    category: "content",
  });

  // --- Content: word count ---
  const threshold = post.category
    ? (AUDIT_THRESHOLDS.wordCountByCategory as Record<string, number>)[
        post.category
      ]
    : undefined;
  if (threshold !== undefined) {
    push({
      id: "word-count",
      label: `Word count for ${post.category} category`,
      severity:
        post.wordCount >= threshold
          ? "pass"
          : post.wordCount >= threshold * 0.8
            ? "warn"
            : "fail",
      detail: `${post.wordCount} words (target ${threshold}+).`,
      recommendation:
        post.wordCount < threshold
          ? `Expand to at least ${threshold} words.`
          : undefined,
      category: "content",
    });
  }

  // --- Voice: em dashes ---
  const emDashCount = (post.rawText.match(/\u2014/g) || []).length;
  push({
    id: "no-em-dashes",
    label: "Zero em dashes (handbook rule)",
    severity:
      emDashCount === 0 ? "pass" : emDashCount <= 2 ? "warn" : "fail",
    detail: `${emDashCount} em-dash characters found.`,
    recommendation:
      emDashCount > 0
        ? "Replace every em dash with a period, comma, colon, or parentheses."
        : undefined,
    category: "voice",
  });

  // --- Voice: banned words ---
  const bannedHits: string[] = [];
  for (const w of BANNED_WORDS) {
    const re = new RegExp(`\\b${w}\\b`, "i");
    if (re.test(post.body)) bannedHits.push(w);
  }
  push({
    id: "no-banned-words",
    label: "No banned words (handbook §12.1)",
    severity: bannedHits.length === 0 ? "pass" : "fail",
    detail:
      bannedHits.length === 0 ? "clean" : `found: ${bannedHits.join(", ")}`,
    recommendation:
      bannedHits.length > 0
        ? "Replace each banned word with concrete, specific language."
        : undefined,
    category: "voice",
  });

  // --- Keyword placement ---
  if (post.primaryKeyword) {
    const kw = post.primaryKeyword.toLowerCase();
    const titleHas = post.title?.toLowerCase().includes(kw) ?? false;
    const h1Has = post.h1?.toLowerCase().includes(kw) ?? false;
    const first100 = post.body.slice(0, 600).toLowerCase();
    const first100Has = first100.includes(kw);
    const h2Count = post.h2s.filter((h) =>
      h.toLowerCase().includes(kw),
    ).length;
    const bodyOccurrences = countOccurrences(post.body, kw);

    push({
      id: "kw-in-title",
      label: "Primary keyword in title",
      severity: titleHas ? "pass" : "fail",
      detail: `"${kw}" ${titleHas ? "found" : "missing"} in title.`,
      category: "keyword",
    });
    push({
      id: "kw-in-h1",
      label: "Primary keyword in H1",
      severity: h1Has ? "pass" : "warn",
      detail: `"${kw}" ${h1Has ? "found" : "missing"} in H1.`,
      category: "keyword",
    });
    push({
      id: "kw-in-first-100",
      label: "Primary keyword in first 100 words",
      severity: first100Has ? "pass" : "warn",
      detail: first100Has
        ? "present in opening"
        : "keyword appears after the first 100 words",
      category: "keyword",
    });
    push({
      id: "kw-in-h2",
      label: "Primary keyword in 2+ H2s",
      severity: h2Count >= 2 ? "pass" : h2Count === 1 ? "warn" : "fail",
      detail: `${h2Count} H2(s) contain the primary keyword.`,
      category: "keyword",
    });
    if (post.wordCount > 0) {
      const density = (bodyOccurrences / post.wordCount) * 100;
      const severity: Severity =
        density >= 0.4 && density <= 2.5
          ? "pass"
          : density < 0.2 || density > 3
            ? "fail"
            : "warn";
      push({
        id: "kw-density",
        label: "Keyword density",
        severity,
        detail: `${density.toFixed(2)}% (${bodyOccurrences} mentions in ${post.wordCount} words)`,
        recommendation:
          density > 2.5
            ? "Over-optimised. Trim keyword repetition."
            : density < 0.4
              ? "Under-represented. Work the exact phrase into a couple more paragraphs naturally."
              : undefined,
        category: "keyword",
      });
    }
  } else {
    push({
      id: "primary-keyword",
      label: "Primary keyword declared",
      severity: "warn",
      detail: "No `targetKeyword` set in BLOG_POSTS registry.",
      recommendation: "Set `targetKeyword` so the audit can check placement.",
      category: "keyword",
    });
  }

  // --- Linking ---
  push({
    id: "internal-links",
    label: "Internal links (3+)",
    severity:
      post.internalLinks.length >= AUDIT_THRESHOLDS.minInternalLinks
        ? "pass"
        : post.internalLinks.length >= 1
          ? "warn"
          : "fail",
    detail: `${post.internalLinks.length} internal links found.`,
    recommendation:
      post.internalLinks.length < AUDIT_THRESHOLDS.minInternalLinks
        ? `Add at least ${AUDIT_THRESHOLDS.minInternalLinks} contextual internal links.`
        : undefined,
    category: "linking",
  });
  push({
    id: "external-links",
    label: "Outbound links to authoritative sources (3+)",
    severity:
      post.externalLinks.length >= AUDIT_THRESHOLDS.minExternalLinks
        ? "pass"
        : post.externalLinks.length >= 1
          ? "warn"
          : "fail",
    detail: `${post.externalLinks.length} external links found.`,
    recommendation:
      post.externalLinks.length < AUDIT_THRESHOLDS.minExternalLinks
        ? "Cite at least one authoritative source per 500 words (NTA, NMC, CBSE, peer-reviewed)."
        : undefined,
    category: "linking",
  });

  // --- Images ---
  const imgCount = post.imageSrcs.length;
  const expectedImages = Math.max(1, Math.ceil(post.wordCount / 800));
  push({
    id: "image-count",
    label: `Images (target 1 per 800 words → ~${expectedImages})`,
    severity:
      imgCount >= expectedImages
        ? "pass"
        : imgCount >= Math.max(1, expectedImages - 2)
          ? "warn"
          : "fail",
    detail: `${imgCount} <Image> tags on page.`,
    recommendation:
      imgCount < expectedImages
        ? `Add ${expectedImages - imgCount} more images. Run: npm run enhance images -- ${post.slug}`
        : undefined,
    category: "image",
  });
  push({
    id: "featured-image",
    label: "Featured image + alt text",
    severity:
      post.featuredImage && post.featuredImageAlt ? "pass" : "fail",
    detail:
      post.featuredImage && post.featuredImageAlt
        ? `${post.featuredImage} with alt text`
        : "featured image or alt text missing",
    category: "image",
  });

  // Tally
  const maxScore = checks.length;
  const score = checks.reduce((a, c) => a + severityScore(c.severity), 0);
  const passed = checks.filter((c) => c.severity === "pass").length;
  const warned = checks.filter((c) => c.severity === "warn").length;
  const failed = checks.filter((c) => c.severity === "fail").length;

  return {
    slug: post.slug,
    filePath: post.filePath,
    score,
    maxScore,
    pct: Math.round((score / maxScore) * 100),
    checks,
    summary: { passed, warned, failed },
  };
}

export function formatReport(report: AuditReport): string {
  const out: string[] = [];
  out.push(`\n# SEO Audit — ${report.slug}\n`);
  out.push(`**Score:** ${report.score.toFixed(1)}/${report.maxScore} (${report.pct}%)`);
  out.push(
    `**Summary:** ${report.summary.passed} passed · ${report.summary.warned} warn · ${report.summary.failed} failed\n`,
  );
  const byCat: Record<string, Check[]> = {};
  for (const c of report.checks) {
    byCat[c.category] = byCat[c.category] || [];
    byCat[c.category].push(c);
  }
  for (const cat of Object.keys(byCat).sort()) {
    out.push(`## ${cat}`);
    for (const c of byCat[cat]) {
      const badge = c.severity === "pass" ? "OK" : c.severity === "warn" ? "WARN" : "FAIL";
      out.push(`- [${badge}] ${c.label} — ${c.detail}`);
      if (c.recommendation) out.push(`  → ${c.recommendation}`);
    }
    out.push("");
  }
  return out.join("\n");
}
