"use client";

import { useEffect, useRef } from "react";
import {
  trackScrollDepth,
  trackPillarEngagement,
  type PageCategory,
} from "@/lib/analytics";

// Drop once per content page. Fires content_scroll_depth at 25/50/75/100%
// thresholds (each once). If the page is a pillar and the user crosses the
// 60% mark, also fires blog_pillar_engagement — the top-of-funnel quality
// signal.

interface ScrollTrackerProps {
  slug: string;
  pageCategory: PageCategory;
  pillarThresholdPct?: number; // default 60 for pillars
}

export function ScrollTracker({
  slug,
  pageCategory,
  pillarThresholdPct = 60,
}: ScrollTrackerProps) {
  const firedRef = useRef<Set<number>>(new Set());
  const pillarFiredRef = useRef(false);

  useEffect(() => {
    const thresholds: Array<25 | 50 | 75 | 100> = [25, 50, 75, 100];

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = Math.min(
        100,
        Math.round((window.scrollY / scrollable) * 100),
      );

      for (const t of thresholds) {
        if (pct >= t && !firedRef.current.has(t)) {
          firedRef.current.add(t);
          trackScrollDepth(t, slug, pageCategory);
        }
      }
      if (
        pageCategory === "pillar" &&
        !pillarFiredRef.current &&
        pct >= pillarThresholdPct
      ) {
        pillarFiredRef.current = true;
        trackPillarEngagement(slug);
      }
    };

    // throttle via rAF
    let ticking = false;
    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [slug, pageCategory, pillarThresholdPct]);

  return null;
}
