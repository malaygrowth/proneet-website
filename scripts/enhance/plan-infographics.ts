// Infographic planner. Given a parsed post, asks GPT-4 to recommend
// which of the 6 locked infographic shapes to insert into which
// section, populated with content drawn from the section itself.
//
// Output is a JSON plan with exact component invocations the author (or
// the apply pass) can drop into the TSX. No AI images, no new shapes.

import OpenAI from "openai";
import type { PostMetadata, PostSection } from "./parse-post.js";

export type InfographicType =
  | "InfographicStats"
  | "InfographicCompare"
  | "InfographicSteps"
  | "InfographicTable"
  | "InfographicBars"
  | "InfographicQuote"
  | "none";

export interface InfographicPlanEntry {
  sectionHeading: string;
  sectionSlug: string;
  chosenType: InfographicType;
  rationale: string;
  priority: "high" | "medium" | "low";
  // Component props as a plain JSON object that can be serialised into
  // JSX by the apply pass.
  props?: Record<string, unknown>;
}

export interface InfographicPlan {
  slug: string;
  generatedAt: string;
  entries: InfographicPlanEntry[];
  overallNote: string;
}

const SYSTEM_PROMPT = `You are a senior content designer for ProNEET, a small-batch NEET and JEE coaching in Jaipur. You plan infographic insertions into long-form blog posts.

You have access to a LOCKED inventory of exactly 6 infographic component shapes. You MUST choose from this list. Do NOT invent new shapes.

Inventory:

1. InfographicStats — 2 to 4 headline numbers, each with a label. Use for: summarising a section that lists countable facts (years of experience, selection counts, batch sizes). Do not use if the section has no countable numbers.

2. InfographicCompare — two side-by-side contrasting panels (X vs Y). Use for: explicit contrast framings in the section (30-seat vs 300-seat, Kota vs Jaipur, national-brand vs small-batch). Do not use unless the section has two clearly-named alternatives being compared.

3. InfographicSteps — a numbered list of 3 to 8 steps, each a glass card. Use for: process flows, parent checklists, decision sequences. Do not use if the list is just bullet points without ordering.

4. InfographicTable — a glass-styled data table. Use for: multi-column tabular data, typically fees/features across 3-5 rows and 3-5 columns. Do not use for comparisons with only 2 rows (use InfographicCompare instead).

5. InfographicBars — a horizontal bar chart, 2-5 values. Use for: quantitative comparisons where values share a unit (rupees, students, months). Do not use for non-numeric contrasts.

6. InfographicQuote — a pull-quote in a glass frame. Use for: at most ONE quote per post, typically from the founder or an alumnus. Must be real content already in the section (a sentence worth pulling out).

Your job: for each section of the article, decide which ONE shape (or "none") best serves that section, populate it with real content from the section (NEVER fabricate data), and return a JSON plan.

Hard rules:
- Never fabricate numbers. If the section does not state the numbers, chose type "none" for that section (the author will fill later).
- Never propose more than ONE InfographicQuote for the whole article.
- Never choose more than 3 infographics total for articles under 1500 words, or 5 for articles under 3000 words.
- Brand palette is ONLY blue + orange, this is enforced by the components; you do not need to specify colours.
- Infographics are content-first, not decorative. If a section is a short narrative connective passage, chose "none".

Output format: JSON only, matching the schema you'll be given. No commentary.`;

const USER_PROMPT_TEMPLATE = (post: PostMetadata) => `Article slug: ${post.slug}
Article title: ${post.title}
Primary keyword: ${post.primaryKeyword}
Category: ${post.category}
Total word count: ${post.wordCount}

Sections (heading → first 600 chars of body):

${post.sections
  .map(
    (s, i) =>
      `${i + 1}. H2: "${s.heading}"
   Words in section: ${s.wordCount}
   Content: ${s.sectionText.slice(0, 600)}${s.sectionText.length > 600 ? "…" : ""}`,
  )
  .join("\n\n")}

Emit a JSON object with shape:
{
  "overallNote": "<one sentence summary of the plan>",
  "entries": [
    {
      "sectionHeading": "<exact H2 text>",
      "chosenType": "<one of: InfographicStats | InfographicCompare | InfographicSteps | InfographicTable | InfographicBars | InfographicQuote | none>",
      "rationale": "<one sentence why this shape and not others>",
      "priority": "<high | medium | low>",
      "props": { ... props matching the component's interface, populated ONLY with data already stated in the section ... }
    }
  ]
}

For props, match these schemas exactly:

InfographicStats props: { eyebrow?: string, heading?: string, values: [{ value: string, label: string, sublabel?: string }], footnote?: string } — 2 to 4 values.

InfographicCompare props: { eyebrow?: string, heading: string, left: { title: string, subtitle?: string, stat: string, statLabel?: string, bullets: string[], verdict?: string }, right: { title: string, subtitle?: string, stat: string, statLabel?: string, bullets: string[], verdict?: string }, footnote?: string }

InfographicSteps props: { eyebrow?: string, heading: string, steps: [{ title: string, body: string }], layout?: "grid" | "vertical", footnote?: string }

InfographicTable props: { eyebrow?: string, heading: string, columns: [{ key: string, label: string, align?: "left" | "right", numeric?: boolean }], rows: [ { [key]: string } ], highlightRowIndex?: number, footnote?: string }

InfographicBars props: { eyebrow?: string, heading: string, values: [{ label: string, sublabel?: string, value: number, displayValue?: string }], max?: number, axisLabel?: string, footnote?: string } — if values express currency or ranges, put the display string in displayValue and a representative mid-point number in value.

InfographicQuote props: { quote: string, attribution: string, role?: string, image?: string, imageAlt?: string } — quote must be verbatim or near-verbatim from the section.

Return ONLY the JSON object. No prose, no markdown, no code fences.`;

export async function planInfographics(
  post: PostMetadata,
): Promise<InfographicPlan> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY not found. Set it in .env.local before running.",
    );
  }
  const client = new OpenAI({ apiKey });

  const res = await client.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.2,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: USER_PROMPT_TEMPLATE(post) },
    ],
    response_format: { type: "json_object" },
  });

  const content = res.choices[0]?.message?.content;
  if (!content) throw new Error("Empty plan response");

  const parsed = JSON.parse(content) as {
    overallNote?: string;
    entries?: Array<{
      sectionHeading: string;
      chosenType: InfographicType;
      rationale: string;
      priority: "high" | "medium" | "low";
      props?: Record<string, unknown>;
    }>;
  };

  // Attach sectionSlug to each entry for deterministic apply-by-slug.
  const entries: InfographicPlanEntry[] = (parsed.entries || []).map((e) => {
    const section = post.sections.find((s) => s.heading === e.sectionHeading);
    return {
      sectionHeading: e.sectionHeading,
      sectionSlug: section?.slug ?? "",
      chosenType: e.chosenType,
      rationale: e.rationale,
      priority: e.priority,
      props: e.props,
    };
  });

  return {
    slug: post.slug,
    generatedAt: new Date().toISOString(),
    entries,
    overallNote: parsed.overallNote ?? "",
  };
}

export function formatPlan(plan: InfographicPlan): string {
  const out: string[] = [`\n# Infographic plan — ${plan.slug}\n`];
  out.push(`_${plan.overallNote}_\n`);
  out.push(`Generated: ${plan.generatedAt}\n`);
  for (const e of plan.entries) {
    const badge =
      e.chosenType === "none"
        ? "SKIP"
        : `${e.priority.toUpperCase()} · ${e.chosenType}`;
    out.push(`### [${badge}] ${e.sectionHeading}`);
    out.push(`_${e.rationale}_`);
    if (e.props) {
      out.push("```json");
      out.push(JSON.stringify(e.props, null, 2));
      out.push("```");
    }
    out.push("");
  }
  return out.join("\n");
}
