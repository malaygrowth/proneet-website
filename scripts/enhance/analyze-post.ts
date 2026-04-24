// LLM pre-pass: read a blog post and extract a concrete visual-metaphor
// brief we can render into a cover-image prompt. The aim is to move the
// "what do we shoot?" decision out of category templates and into the
// specific thesis of the specific post.
//
// Output contract is a strict JSON object. We do NOT let the model
// write the final image prompt — only the semantic building blocks.
// The prompt assembly lives in cover-gen.ts so the series bible stays
// central and version-controlled.

import OpenAI from "openai";
import type { PostMetadata } from "./parse-post.js";

export interface VisualBrief {
  // One-sentence articulation of what the post is really arguing about.
  thesis: string;
  // One specific physical scene that encodes the thesis. Must follow the
  // "one subject, one gesture, one light source" rule. Must NOT include
  // any writing surface (chalkboard, whiteboard, notebook with writing,
  // signboard, book title, phone screen, bill, receipt, poster).
  scene: string;
  // The single foreground subject the eye should land on. 1-2 nouns max.
  subject: string;
  // The meaningful gesture or implied action. One short phrase.
  gesture: string;
  // The lighting motif, described in photographic terms.
  light: string;
  // Anti-cliché note: the obvious scene we are NOT shooting. Helps
  // audit the brief before sending.
  avoided_cliche: string;
  // Scene-specific exclusions. Things the model would naturally draw
  // for this topic that we must keep out. Written as concrete nouns.
  scene_exclusions: string[];
  // One-word mood tag for the grade pass.
  mood: string;
}

const SYSTEM_PROMPT = `You are an editorial photo director briefing a documentary photographer for a long-form blog cover image. The blog is ProNEET (Jaipur, India — NEET/JEE coaching). Readers are parents and serious students making a real decision.

Your job: read the post and return a JSON brief that becomes a photograph. Do not write the image prompt yourself — only the semantic brief.

THESIS RULE (this is the most important rule):
A thesis is a DISAGREEMENT, not a description. It states a tension, a choice, a non-obvious claim, or a warning the author is making. "The post explains X" is NOT a thesis. "X looks like Y but is actually Z" IS a thesis. "Most people assume A, but the honest answer is B" IS a thesis. Find the one sentence from the post the author would be willing to argue about.

SCENE RULES:
1. One subject. One gesture. One light source. No crowds. No multi-action scenes.
2. The scene MUST NOT contain any writing surface. That rules out: chalkboards, whiteboards, blackboards, open notebooks, open textbooks with visible titles, signboards, phone screens, laptop screens, posters, calendars with numbers, receipts, price tags, bills, letters, newspapers.
3. Prefer hands, physical objects, architectural elements, domestic surfaces, windows, doorways, empty spaces. Faces are allowed only when the thesis is literally about reading a face.
4. The scene must be something a documentary photographer could actually shoot in or near a Jaipur home, institute corridor, street, or kitchen — not metaphoric surrealism, not studio product shots.
5. Avoid the obvious cliché. The obvious cliché for the topic is banned. If the post is about fees, do NOT use money, coins, wallets, calculators, envelopes of cash, ATMs. If the post is about choosing a teacher, do NOT use a teacher at a board. If the post is about self-study, do NOT use a lone student at a desk with books. Your value as a photo director is finding the non-obvious visual that encodes the thesis.
6. The scene must visually carry the thesis, not just set a mood. If the thesis is "the 4.5x fee spread is not random", an empty classroom doesn't carry that — it's just mood. A better scene carries the spread itself: two very different rooms behind one doorway, or two hands of different age holding the same worn object.

WORKED EXAMPLES (study the structure, don't copy them):

Example A:
Post thesis: "A weak Physics teacher leaks marks across the whole paper; the IIT tag matters less than you think."
Bad scene: "a teacher writing an equation on a blackboard" (cliche + writing surface)
Good scene: "a student's hand tracing a crack running down a plaster wall in a sunlit corridor, late-afternoon light raking across the surface, the crack disappearing into shadow" (carries "a small weakness that travels through the whole structure")

Example B:
Post thesis: "You can crack NEET without coaching, but only if you keep the same seat at the same desk at the same time for 26 months."
Bad scene: "a student alone at a desk studying" (cliche)
Good scene: "an empty wooden chair pulled up to a bedroom window at first light, a faint imprint of daily use on the seat cushion, the rest of the room in shadow" (carries habit, discipline, solitude — without a book)

Example C:
Post thesis: "Jaipur fees span 4.5x from ₹60K to ₹2.8L — the gap is not about teaching quality, it's about what's in the invoice."
Bad scene: "money piles with a calculator" (cliche)
Good scene: "a mother's hand resting on a stone kitchen counter next to a single brass key, morning light low and warm from a high window, the counter scratched from years of use" (carries the quiet weight of a household decision, without any money or paperwork)

Return STRICT JSON matching this schema, no prose, no markdown:
{
  "thesis": "one sentence, argumentative, must contain a tension or non-obvious claim",
  "scene": "35-70 words describing ONE photograph in concrete physical detail",
  "subject": "1-2 nouns, the hero of the frame",
  "gesture": "one short phrase, e.g. 'hand pausing over the worn handle'",
  "light": "one short phrase, e.g. 'first-light slanting through a window at low angle'",
  "avoided_cliche": "the obvious scene you refused to shoot",
  "scene_exclusions": ["concrete", "nouns", "the", "scene", "must", "not", "include"],
  "mood": "one word — contemplative, resolute, watchful, tender, sober, patient, weighted, early, still, etc."
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

  // Light validation. We prefer a soft failure that still renders over a
  // hard throw that kills the whole batch.
  if (!parsed.scene || parsed.scene.length < 20) {
    throw new Error(
      `Visual brief is missing or too short: ${JSON.stringify(parsed)}`,
    );
  }
  parsed.scene_exclusions = Array.isArray(parsed.scene_exclusions)
    ? parsed.scene_exclusions
    : [];
  return parsed;
}
