// LLM pre-pass: read a blog post and return the semantic brief that
// drives cover image generation. Output schema is tuned for the
// GrowLeads-style split pipeline — the model decides the 3D-illustration
// iconography and the headline/subhead copy; cover-gen handles the
// image rendering and text overlay.

import OpenAI from "openai";
import type { PostMetadata } from "./parse-post.js";

export interface VisualBrief {
  // One-sentence central tension of the post. Used in reports.
  thesis: string;
  // 2–5 words, the bold headline for the cover. Usually a tightened
  // version of the title (drops filler words, keeps the hook).
  headline: string;
  // 4–9 words, the subhead that sits under the headline in Inter Medium.
  // Should sharpen or complete the headline, not repeat it.
  subhead: string;
  // A concrete description of the 3D clay illustration that will occupy
  // the right half of the cover. Matte plastic 3D style.
  iconography: string;
  // The obvious cliché we chose NOT to use, for audit.
  avoided_cliche: string;
  // One word mood tag.
  mood: string;
}

const SYSTEM_PROMPT = `You are an art director for a blog called ProNEET (Jaipur, India — NEET/JEE coaching). Readers are parents and serious students making a real decision.

Your job: read the post and produce a JSON brief that drives a blog cover graphic in the style of modern B2B-SaaS blog covers (think Attio, Gumroad, Webflow, Vercel). The cover has:
- A deep navy/brand-blue gradient background
- A small "ProNEET" wordmark top-left
- A bold white headline and softer subhead on the LEFT HALF
- A 3D matte-clay illustration on the RIGHT HALF, like a Spline or Icons8 Isometric scene

You control the COPY (headline + subhead) and the ICONOGRAPHY (what the 3D clay scene depicts). You do NOT control colours, fonts, or background.

RULES FOR HEADLINE:
- 2 to 5 words max. It must fit on one or two lines of very bold Inter.
- Drop filler. Keep the hook. If the title is "NEET Coaching in Jaipur vs Kota vs Sikar: The Honest Parent's Guide", the headline is "Jaipur vs Kota vs Sikar".
- Preserve specificity — "7 Things to Check" beats "NEET Coaching Tips".
- Use title case.
- TOPICALITY TEST: if a reader saw only the headline + illustration, would they correctly guess the post's primary subject? The headline must honour the post's primary keyword and title — NOT a secondary sub-thesis from the body. If the title says "JEE Coaching in Jaipur" and the primary keyword is "iit jee coaching classes in jaipur", the headline MUST contain "JEE" (e.g. "JEE Coaching in Jaipur" or "Jaipur JEE Shortlist"). Never let a compelling sub-argument hijack the headline away from the main topic.

RULES FOR SUBHEAD:
- 4 to 9 words. Completes or frames the headline.
- Never repeats the headline verbatim. Should sharpen the promise ("A 7-point parent checklist") or state the qualifier ("Before You Sign the Cheque").
- Sentence case, no trailing period.

RULES FOR ICONOGRAPHY:
1. Describe one single 3D scene to be rendered in matte clay plastic style on a soft shadow plinth. 40 to 80 words.
2. The scene contains abstract geometric objects, not realistic humans. Low-poly figurines, cubes, cylinders, cones, arrows, magnifying glasses, stacked discs/coins (but NEVER labelled with currency symbols), pins, targets, stairways, chart bars, pie wedges, books (closed, unlabelled), molecules, atoms, pendulums, prisms, keys, gears, trophies, clipboards (unlabelled), filters/funnels.
3. The scene must visually encode the post's thesis. Two classroom batches of different sizes for a comparison; stacked discs in tiers for fees; a funnel filtering figurines for a selection/checklist post; a single figurine on a stairway for a self-study post; a cluster of three city-pins for a three-city comparison.
4. MANDATORY: include a warm orange #F97316 accent on exactly one hero element. Everything else is in matte navy, mid-blue, and pale blue/white tones.
5. DO NOT describe any text, labels, numbers, wordmarks, screens, brand logos, or signage. The illustration is text-free.
6. DO NOT describe realistic humans, faces, or photographic textures — 3D clay only.
7. Avoid the obvious cliché. Don't pick the first scene that comes to mind — push for one that carries the specific thesis.

WORKED EXAMPLES:

Example A (a "7 things to check before enrolling" guide):
{
  "headline": "7 Things to Check",
  "subhead": "Before you sign the enrolment form",
  "iconography": "A 3D clay funnel standing upright on a soft navy plinth. Above the funnel, seven small matte-blue cubes float in a staggered queue, each cube catching cool blue rim light. At the funnel's mouth, a single warm orange cube is about to enter, glowing softly. Below the funnel, a clean matte surface catches a soft contact shadow. The composition reads left-to-right as a selection filter.",
  "avoided_cliche": "a generic checklist clipboard",
  "mood": "discerning"
}

Example B (a fees breakdown post):
{
  "headline": "What You Actually Pay",
  "subhead": "Jaipur NEET fees, tier by tier",
  "iconography": "Three 3D clay discs stacked in a stepped column on a navy plinth, each disc wider than the one below, forming a tiered pyramid. The top disc is matte white, the middle is soft blue, the bottom is the largest and is rendered in warm orange #F97316. A thin white arrow rises from the orange disc, curving upward to suggest the climb between tiers. The scene is calm and architectural.",
  "avoided_cliche": "stacks of rupee coins with a calculator",
  "mood": "weighted"
}

Example C (a "prepare without coaching" pillar):
{
  "headline": "Without Coaching",
  "subhead": "The 26-month self-study playbook",
  "iconography": "A single low-poly matte white figurine stands at the base of a tall, narrow 3D clay staircase that rises upward out of the frame. The stairs are soft navy clay, lit from upper-left. At the first step, the figurine is rendered in warm orange #F97316. The rest of the scene is empty navy — no crowd, no books, no observer. The composition emphasises solitude and incremental climb.",
  "avoided_cliche": "a student at a desk with a laptop",
  "mood": "resolute"
}

Return STRICT JSON, no prose, no markdown:
{
  "thesis": "one sentence",
  "headline": "2-5 words title-case",
  "subhead": "4-9 words sentence-case",
  "iconography": "40-80 word description of one 3D clay scene",
  "avoided_cliche": "the obvious scene you rejected",
  "mood": "one word"
}`;

export async function analyzePost(
  client: OpenAI,
  post: Pick<
    PostMetadata,
    "title" | "metaDescription" | "category" | "primaryKeyword" | "body"
  > & { excerpt?: string },
  opts: { model?: string } = {},
): Promise<VisualBrief> {
  const bodyExcerpt = (post.body || "").slice(0, 5000);
  const userPrompt = [
    `Title: ${post.title ?? "(untitled)"}`,
    `Category: ${post.category ?? "(uncategorised)"}`,
    `Primary keyword: ${post.primaryKeyword ?? "(unset)"}`,
    `Meta description: ${post.metaDescription ?? ""}`,
    post.excerpt
      ? `\nExcerpt (often the sharpest framing of the thesis):\n${post.excerpt}`
      : "",
    "",
    "First ~800 words of the post body:",
    bodyExcerpt,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await client.chat.completions.create({
    model: opts.model ?? "gpt-4o",
    temperature: 0.8,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
  });

  const text = res.choices[0]?.message?.content;
  if (!text) throw new Error("Empty response from visual-brief model");
  const parsed = JSON.parse(text) as VisualBrief;

  const required = ["thesis", "headline", "subhead", "iconography"] as const;
  for (const key of required) {
    if (!parsed[key] || typeof parsed[key] !== "string") {
      throw new Error(
        `Visual brief missing required field "${key}": ${JSON.stringify(parsed)}`,
      );
    }
  }
  return parsed;
}
