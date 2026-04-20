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
    slug: "neet-coaching-in-jaipur",
    title: "NEET Coaching in Jaipur: The Parent's Honest Guide",
    description:
      "A working guide to NEET coaching in Jaipur. How the market splits, what fees look like, 30-seat vs 300-seat, Jaipur vs Kota, and what parents regret choosing.",
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
