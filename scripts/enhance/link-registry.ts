// Internal link graph. Maps keywords to the canonical URL they should
// point to. Used by the suggest-links pass to insert contextual links
// without forcing the writer to remember every target.

export interface LinkTarget {
  url: string;
  anchor: string;
  priority: number; // higher = prefer when multiple keywords match
  // Optional: which posts should NOT link to this target (usually self).
  excludeSlugs?: string[];
}

// Each key is a lowercase phrase the scanner looks for in body text.
// Phrases are matched as whole-word, case-insensitive. More specific
// phrases should have a higher priority.
export const LINK_REGISTRY: Record<string, LinkTarget> = {
  // Pillar pages
  "neet coaching in jaipur": {
    url: "/blog/neet-coaching-in-jaipur",
    anchor: "NEET coaching in Jaipur",
    priority: 10,
    excludeSlugs: ["neet-coaching-in-jaipur"],
  },
  "best neet coaching in jaipur": {
    url: "/blog/best-neet-coaching-in-jaipur",
    anchor: "best NEET coaching in Jaipur",
    priority: 9,
    excludeSlugs: ["best-neet-coaching-in-jaipur"],
  },
  "jee coaching in jaipur": {
    url: "/blog/jee-coaching-in-jaipur",
    anchor: "JEE coaching in Jaipur",
    priority: 10,
    excludeSlugs: ["jee-coaching-in-jaipur"],
  },
  "iit jee coaching": {
    url: "/blog/jee-coaching-in-jaipur",
    anchor: "IIT JEE coaching in Jaipur",
    priority: 6,
    excludeSlugs: ["jee-coaching-in-jaipur"],
  },
  // Location pages
  "mansarovar sector 8": {
    url: "/locations/mansarovar",
    anchor: "our Mansarovar classroom",
    priority: 7,
    excludeSlugs: ["mansarovar"],
  },
  "mansarovar classroom": {
    url: "/locations/mansarovar",
    anchor: "Mansarovar classroom",
    priority: 7,
    excludeSlugs: ["mansarovar"],
  },
  // Static pages
  "neeraj gupta": {
    url: "/faculty",
    anchor: "Neeraj Gupta",
    priority: 5,
    excludeSlugs: ["faculty"],
  },
  "vivek patidar": {
    url: "/faculty",
    anchor: "Vivek Patidar",
    priority: 5,
    excludeSlugs: ["faculty"],
  },
  "dropper batch": {
    url: "/programs",
    anchor: "dropper batch",
    priority: 5,
    excludeSlugs: ["programs"],
  },
  "1-on-1 online": {
    url: "/programs",
    anchor: "1-on-1 online programme",
    priority: 5,
    excludeSlugs: ["programs"],
  },
  "demo class": {
    url: "/contact",
    anchor: "book a demo class",
    priority: 4,
    excludeSlugs: ["contact"],
  },
  "admissions line": {
    url: "/contact",
    anchor: "admissions line",
    priority: 3,
    excludeSlugs: ["contact"],
  },
};

// Preferred outbound (trusted sources) to cite when a post discusses these
// topics but doesn't yet link out. Used for external-link suggestions.
export const OUTBOUND_REGISTRY: Record<string, { url: string; anchor: string }> = {
  "neet-ug": {
    url: "https://neet.nta.nic.in/",
    anchor: "NEET-UG official portal",
  },
  "jee main": {
    url: "https://jeemain.nta.nic.in/",
    anchor: "JEE Main official portal",
  },
  "jee advanced": {
    url: "https://jeeadv.ac.in/",
    anchor: "JEE Advanced official site",
  },
  "nmc": {
    url: "https://www.nmc.org.in/",
    anchor: "National Medical Commission",
  },
  cbse: {
    url: "https://www.cbse.gov.in/",
    anchor: "CBSE",
  },
};
