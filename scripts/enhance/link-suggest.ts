// Internal link suggester. Scans a parsed post's body for mentions of
// known registry keywords and returns a list of suggested insertions.
// Does NOT auto-edit — emits a report the author can review.

import type { PostMetadata } from "./parse-post.js";
import { LINK_REGISTRY, OUTBOUND_REGISTRY } from "./link-registry.js";

export interface LinkSuggestion {
  kind: "internal" | "outbound";
  keyword: string;
  anchor: string;
  url: string;
  excerpt: string;
  priority: number;
}

function excerptAround(text: string, match: string, radius = 80): string {
  const idx = text.toLowerCase().indexOf(match.toLowerCase());
  if (idx < 0) return "";
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + match.length + radius);
  return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
}

export function suggestLinks(
  post: PostMetadata,
  maxSuggestions: number = 6,
): LinkSuggestion[] {
  const existingHrefs = new Set([...post.internalLinks, ...post.externalLinks]);
  const body = post.body;

  const suggestions: LinkSuggestion[] = [];

  // Internal
  for (const [keyword, target] of Object.entries(LINK_REGISTRY)) {
    if (target.excludeSlugs?.includes(post.slug)) continue;
    if (existingHrefs.has(target.url)) continue; // already linked somewhere on page
    const re = new RegExp(`\\b${keyword.replace(/\s+/g, "\\s+")}\\b`, "i");
    if (!re.test(body)) continue;
    suggestions.push({
      kind: "internal",
      keyword,
      anchor: target.anchor,
      url: target.url,
      excerpt: excerptAround(body, keyword),
      priority: target.priority,
    });
  }

  // Outbound
  for (const [keyword, target] of Object.entries(OUTBOUND_REGISTRY)) {
    if (existingHrefs.has(target.url)) continue;
    const re = new RegExp(`\\b${keyword.replace(/\s+/g, "\\s+")}\\b`, "i");
    if (!re.test(body)) continue;
    suggestions.push({
      kind: "outbound",
      keyword,
      anchor: target.anchor,
      url: target.url,
      excerpt: excerptAround(body, keyword),
      priority: 2,
    });
  }

  // Sort: internal > outbound, higher priority first
  suggestions.sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === "internal" ? -1 : 1;
    return b.priority - a.priority;
  });

  return suggestions.slice(0, maxSuggestions);
}

export function formatSuggestions(
  slug: string,
  suggestions: LinkSuggestion[],
): string {
  if (suggestions.length === 0)
    return `\n# Link suggestions — ${slug}\n\n(no new link opportunities found)\n`;
  const out: string[] = [`\n# Link suggestions — ${slug}\n`];
  for (const s of suggestions) {
    out.push(
      `- **[${s.kind}]** anchor "${s.anchor}" → ${s.url} (matched: "${s.keyword}")`,
    );
    if (s.excerpt) out.push(`  > ${s.excerpt}`);
  }
  out.push("");
  out.push(
    "_Apply by wrapping the matched phrase in a Next.js `<Link>` (internal) or `<a target=\"_blank\" rel=\"noopener\">` (outbound) with the suggested anchor._",
  );
  return out.join("\n");
}
