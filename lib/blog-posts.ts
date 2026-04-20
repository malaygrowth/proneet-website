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
    featuredImage: "/photos/students-batch.webp",
    featuredImageAlt:
      "A ProNEET NEET classroom batch in session at Mansarovar, Jaipur",
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
    featuredImage: "/photos/students-grove.webp",
    featuredImageAlt:
      "A senior NEET aspirant working through Physics problems independently",
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
    featuredImage: "/photos/students-with-neeraj.webp",
    featuredImageAlt:
      "Senior JEE students working through a Physics problem with Neeraj Gupta at ProNEET, Mansarovar Jaipur",
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
    featuredImage: "/photos/students-batch.webp",
    featuredImageAlt:
      "A NEET coaching batch of ProNEET students, Mansarovar Jaipur",
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
    featuredImage: "/photos/classroom-batch.webp",
    featuredImageAlt:
      "A live NEET coaching batch in session at the ProNEET classroom in Mansarovar, Jaipur",
  },
];
