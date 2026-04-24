// Registry of published blog posts. New posts get a page.tsx at
// app/blog/<slug>/page.tsx and an entry here (newest first).

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  publishDate: string;
  lastUpdated: string;
  author: string;
  authorRole: string;
  category: "Pillar" | "Guide" | "Comparison" | "Location";
  readingTime: string;
  targetKeyword: string;
  featuredImage: string;
  featuredImageAlt: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "jaipur-vs-kota-vs-sikar-neet",
    title: "NEET Coaching in Jaipur vs Kota vs Sikar: The Honest Parent's Guide",
    description:
      "Founder-written comparison of NEET coaching in Jaipur, Kota and Sikar. Fees, batch sizes, peer pool, mental-health picture, and who each city actually fits.",
    excerpt:
      "Three cities, three different bets. Kota gives you the deepest ecosystem in India, Sikar the Kota model at lower cost, Jaipur the option to keep your child at home. Here is how to tell which is right for your specific student.",
    publishDate: "2026-04-23",
    lastUpdated: "2026-04-23",
    author: "Neeraj Gupta",
    authorRole: "Founder, ProNEET · Ex-Narayana Kota, Bansal Classes, Excel Physics",
    category: "Comparison",
    readingTime: "14 min read",
    targetKeyword: "neet coaching jaipur vs kota vs sikar",
    featuredImage: "/blog/jaipur-vs-kota-vs-sikar-neet/cover.webp",
    featuredImageAlt:
      "\"Jaipur vs Kota vs Sikar — Choosing the right NEET city for your child\". 3D illustrated cover for \"NEET Coaching in Jaipur vs Kota vs Sikar: The Honest Parent's Guide\" on neet coaching jaipur vs kota vs sikar.",
  },
  {
    slug: "how-to-choose-a-physics-teacher",
    title: "How to Choose a Physics Teacher for NEET and JEE",
    description:
      "A Physics teacher's guide to hiring a Physics teacher. Experience signals, demo-class tells, red flags, and why the IIT tag matters less than you think.",
    excerpt:
      "Physics decides the tail of the NEET score distribution. A weak teacher leaks marks through the whole paper; a strong one rebuilds the base. Written by a 20+ year Physics teacher on exactly what to check.",
    publishDate: "2026-04-23",
    lastUpdated: "2026-04-23",
    author: "Neeraj Gupta",
    authorRole: "Founder, ProNEET · 20+ years teaching Physics",
    category: "Guide",
    readingTime: "10 min read",
    targetKeyword: "how to choose physics teacher neet",
    featuredImage: "/blog/how-to-choose-a-physics-teacher/cover.webp",
    featuredImageAlt:
      "\"Choose Your Physics Teacher — The biggest decision for NEET success\". 3D illustrated cover for \"How to Choose a Physics Teacher for NEET and JEE\" on how to choose physics teacher neet.",
  },
  {
    slug: "neet-coaching-fees-in-jaipur-2026",
    title: "NEET Coaching Fees in Jaipur 2026: What You Actually Pay",
    description:
      "Honest breakdown of NEET coaching fees in Jaipur for 2026. Allen, Aakash, Resonance, mid-tier and small-batch rates. Hidden costs and how to compare quotes.",
    excerpt:
      "Jaipur NEET coaching fees span ₹60,000 to ₹2,80,000 per year. The 4.5x spread is not random. A working guide to what each tier buys you, what is hidden in the invoice, and how to compare quotes like-with-like.",
    publishDate: "2026-04-23",
    lastUpdated: "2026-04-23",
    author: "Neeraj Gupta",
    authorRole: "Founder, ProNEET · 20+ years teaching Physics",
    category: "Guide",
    readingTime: "10 min read",
    targetKeyword: "neet coaching fees in jaipur",
    featuredImage: "/blog/neet-coaching-fees-in-jaipur-2026/cover.webp",
    featuredImageAlt:
      "\"Jaipur NEET Fees 2026 — Understand the cost breakdown and comparisons\". 3D illustrated cover for \"NEET Coaching Fees in Jaipur 2026: What You Actually Pay\" on neet coaching fees in jaipur.",
  },
  {
    slug: "proneet-vs-allen-jaipur",
    title: "ProNEET vs Allen Jaipur: An Honest Comparison",
    description:
      "Allen Jaipur or ProNEET? Honest side-by-side: fees, batch size, faculty, scope. Who each is built for, and when the bigger brand is actually right.",
    excerpt:
      "A founder-written comparison that does not pretend to be neutral and does not trash the competitor. Allen is strong. ProNEET is a different product for different students. Here is how to tell which fits yours.",
    publishDate: "2026-04-20",
    lastUpdated: "2026-04-20",
    author: "Neeraj Gupta",
    authorRole: "Founder, ProNEET · ex-Bansal, Narayana, Excel Physics",
    category: "Comparison",
    readingTime: "11 min read",
    targetKeyword: "allen coaching jaipur neet fees",
    featuredImage: "/blog/proneet-vs-allen-jaipur/cover.webp",
    featuredImageAlt:
      "\"ProNEET vs Allen Jaipur — Honest fees and fit comparison\". 3D illustrated cover for \"ProNEET vs Allen Jaipur: An Honest Comparison\" on allen coaching jaipur neet fees.",
  },
  {
    slug: "prepare-for-neet-without-coaching",
    title: "How to Prepare for NEET from Class 11 Without Coaching",
    description:
      "Honest guide to self-study NEET prep from Class 11. What works, what breaks, the three things coaching actually adds, and when joining one is the right call.",
    excerpt:
      "Can you crack NEET without coaching? Yes. Should everyone? No. A 26-month self-study plan plus the two specific moments when coaching stops being optional and starts being worth the fee.",
    publishDate: "2026-04-20",
    lastUpdated: "2026-04-20",
    author: "Neeraj Gupta",
    authorRole: "Founder, ProNEET · 20+ years teaching Physics",
    category: "Pillar",
    readingTime: "14 min read",
    targetKeyword: "how to prepare for neet from class 11 without coaching",
    featuredImage: "/blog/prepare-for-neet-without-coaching/cover.webp",
    featuredImageAlt:
      "\"Prepare for NEET Alone — Self-study guide from Class 11\". 3D illustrated cover for \"How to Prepare for NEET from Class 11 Without Coaching\" on how to prepare for neet from class 11 without coaching.",
  },
  {
    slug: "jee-coaching-in-jaipur",
    title: "JEE Coaching in Jaipur: The Honest Guide for Class 11 and 12",
    description:
      "A working guide to JEE coaching in Jaipur. Who teaches, fees by tier, Kota vs Sikar vs Jaipur, JEE Main vs Advanced realism, parent regrets.",
    excerpt:
      "Jaipur has fewer dedicated JEE setups than NEET ones. Allen, Aakash, Resonance at the top, a handful of local mid-tier institutes, and a small-batch tail. Here is what to actually pick between, and the parts of the JEE conversation that brochures do not cover.",
    publishDate: "2026-04-20",
    lastUpdated: "2026-04-20",
    author: "Neeraj Gupta",
    authorRole: "Founder, ProNEET · 20+ years teaching Physics",
    category: "Pillar",
    readingTime: "13 min read",
    targetKeyword: "iit jee coaching classes in jaipur",
    featuredImage: "/blog/jee-coaching-in-jaipur/cover.webp",
    featuredImageAlt:
      "\"JEE Coaching in Jaipur — Fees, faculty, and the honest shortlist\". 3D illustrated cover for \"JEE Coaching in Jaipur: The Honest Guide for Class 11 and 12\" on iit jee coaching classes in jaipur.",
  },
  {
    slug: "best-neet-coaching-in-jaipur",
    title: "Best NEET Coaching in Jaipur: 7 Things to Check Before You Enrol",
    description:
      "A 7-point checklist for choosing the best NEET coaching in Jaipur. Batch size, teacher names, fees in writing, demo class, exit terms.",
    excerpt:
      "Every Jaipur NEET coaching says they are the best. Here is the parent checklist that separates the ones who actually are from the ones with good billboards. Seven things to verify before you sign.",
    publishDate: "2026-04-20",
    lastUpdated: "2026-04-20",
    author: "Neeraj Gupta",
    authorRole: "Founder, ProNEET · 20+ years teaching Physics",
    category: "Guide",
    readingTime: "9 min read",
    targetKeyword: "best neet coaching in jaipur",
    featuredImage: "/blog/best-neet-coaching-in-jaipur/cover.webp",
    featuredImageAlt:
      "\"7 Things to Verify — Choosing the best Jaipur NEET coaching\". 3D illustrated cover for \"Best NEET Coaching in Jaipur: 7 Things to Check Before You Enrol\" on best neet coaching in jaipur.",
  },
  {
    slug: "neet-coaching-in-jaipur",
    title: "NEET Coaching in Jaipur: The Parent's Honest Guide",
    description:
      "A working guide to NEET coaching in Jaipur. Market breakdown, fees by tier, 30-seat vs 300-seat, Jaipur vs Kota, parent regrets.",
    excerpt:
      "Jaipur has roughly 40 NEET coaching centres advertising at any given time. Three national brands, eight mid-tier locals, and a long tail of small-batch setups. This guide is what a founder at one of those small setups would tell you if you sat down for chai.",
    publishDate: "2026-04-20",
    lastUpdated: "2026-04-20",
    author: "Neeraj Gupta",
    authorRole: "Founder, ProNEET · 20+ years teaching Physics",
    category: "Pillar",
    readingTime: "14 min read",
    targetKeyword: "neet coaching in jaipur",
    featuredImage: "/blog/neet-coaching-in-jaipur/cover.webp",
    featuredImageAlt:
      "\"NEET Coaching in Jaipur — A parent's market guide, tier by tier\". 3D illustrated cover for \"NEET Coaching in Jaipur: The Parent's Honest Guide\" on neet coaching in jaipur.",
  },
];
