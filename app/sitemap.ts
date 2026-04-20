import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { LOCATIONS } from "@/lib/locations";

// Sitemap is auto-assembled from three sources:
// 1. Static content routes
// 2. Blog posts registered in lib/blog-posts.ts
// 3. Location pages registered in lib/locations.ts

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/programs", priority: 0.9, changeFrequency: "monthly" },
    { path: "/faculty", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/results", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
    { path: "/locations", priority: 0.8, changeFrequency: "monthly" },
  ];

  const staticEntries = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const blogEntries = BLOG_POSTS.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: post.category === "Pillar" ? 0.9 : 0.7,
  }));

  const locationEntries = LOCATIONS.map((loc) => ({
    url: `${SITE.url}/locations/${loc.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: loc.role === "classroom" ? 0.9 : 0.7,
  }));

  return [...staticEntries, ...blogEntries, ...locationEntries];
}
