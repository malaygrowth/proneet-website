// Shared configuration for the content-enhance pipeline.
// Tune thresholds and brand style here rather than inside individual scripts.

export const BRAND = {
  palette: {
    navy: "#0F172A",
    blue: "#2563EB",
    orange: "#F97316",
    bone: "#F7F5F0",
  },
  visualStyle: [
    "editorial documentary photograph",
    "realistic, not stock",
    "warm natural light",
    "35mm film grain, shallow depth of field",
    "brand palette as accent lighting: warm orange rim + cool blue key",
    "no text, no logos, no watermarks",
    "Indian coaching institute context, Jaipur, small-batch classroom feel",
  ].join(", "),
};

export const AUDIT_THRESHOLDS = {
  titleMaxChars: 60,
  metaMaxChars: 155,
  metaMinChars: 120,
  keyTakeawaysMinBullets: 5,
  faqMinQuestions: 5,
  questionH2MinPct: 0.5,
  minInternalLinks: 3,
  minExternalLinks: 3,
  maxEmDashes: 0,
  wordCountByCategory: {
    Pillar: 2500,
    Guide: 1500,
    Comparison: 2000,
    Location: 1000,
  } as const,
  imagePer800Words: true,
  maxImageSizeKb: 100,
};

// The banned-word list from CONTENT_WRITER_HANDBOOK.md §12.1 — lowercase.
export const BANNED_WORDS = [
  "leverage",
  "synergy",
  "cutting-edge",
  "best-in-class",
  "world-class",
  "passionate",
  "innovative",
  "ai-powered",
  "seamless",
  "seamlessly",
  "robust",
  "game-changer",
  "unlock",
  "empower",
  "empowering",
  "delve",
  "in today's fast-paced",
  "it's no secret that",
  "in conclusion",
  "navigate through",
  "take your",
  "to the next level",
];

// Image dimensions. 1200×675 = 16:9, SERP / OG friendly.
export const IMAGE_SIZE = { width: 1200, height: 675 };

// Output models. gpt-image-1 is the latest OpenAI image model; falls back
// to dall-e-3 if gpt-image-1 is unavailable for the account.
export const OPENAI_IMAGE_MODEL = "gpt-image-1" as const;
export const OPENAI_IMAGE_FALLBACK = "dall-e-3" as const;

// Path helpers (relative to repo root when scripts run via tsx).
export const PATHS = {
  blogDir: "app/blog",
  locationsDir: "app/locations",
  publicBlogImages: "public/blog",
  enhanceReports: "seo/enhance-reports",
};
