// Per-slug overrides for cover generation. When GPT-4o's visual brief
// drifts to a sub-thesis (e.g. a JEE post keeps picking up its Kota/
// Sikar comparison section instead of its JEE-in-Jaipur main topic),
// pin the desired values here and the generator will honour them.
//
// Any field left undefined falls through to the analyze-post output.

import type { VisualBrief } from "./analyze-post.js";

export type CoverOverride = Partial<
  Pick<VisualBrief, "headline" | "subhead" | "iconography" | "mood">
>;

export const COVER_OVERRIDES: Record<string, CoverOverride> = {
  // The JEE pillar keeps pulling its "Jaipur vs Kota vs Sikar" sub-
  // thesis into the headline, which collides with the dedicated NEET
  // comparison post. Pin the JEE framing explicitly.
  "jee-coaching-in-jaipur": {
    headline: "JEE Coaching in Jaipur",
    subhead: "Fees, faculty, and the honest shortlist",
    iconography:
      "A 3D clay scene on a soft navy plinth featuring a tall stepped podium with three levels. On the top level, a single matte white cube marked subtly with an atom-like ring detail — a warm orange #F97316 sphere orbits one edge of this cube as the hero accent. The lower two levels hold a handful of neutral matte-blue geometric objects — a prism, a small bar chart, a gear — representing the shortlist criteria. The composition reads vertically from base to apex.",
    mood: "focused",
  },

  // The pillar about the Jaipur NEET coaching market keeps pulling in
  // the three-city comparison imagery, which belongs to a different
  // post. Force a market-map visual instead.
  "neet-coaching-in-jaipur": {
    headline: "NEET Coaching in Jaipur",
    subhead: "A parent's market guide, tier by tier",
    iconography:
      "A 3D clay scene on a soft navy plinth depicting a compact Jaipur neighbourhood map — a grid of small low-poly buildings in varying matte blue and pale-blue tones. Three of the buildings stand taller than the rest, each topped with a tiny pin. One pin is rendered in warm orange #F97316 as the hero accent — a single clearly-identified choice among the many options. Soft contact shadows under every building.",
    mood: "navigational",
  },
};
