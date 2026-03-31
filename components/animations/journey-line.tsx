"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface JourneyLineProps {
  className?: string;
}

export function JourneyLine({ className }: JourneyLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={cn("relative h-1 w-full", className)}>
      {/* Track */}
      <div className="absolute inset-0 rounded-full bg-slate-200" />
      {/* Fill */}
      <motion.div
        className="absolute inset-0 origin-left rounded-full"
        style={{
          scaleX,
          background:
            "linear-gradient(90deg, var(--color-brand), #A855F7, var(--color-accent-orange))",
        }}
      />
    </div>
  );
}
