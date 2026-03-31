"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  duration?: number;
}

function getOffset(direction: Direction): { x: number; y: number } {
  switch (direction) {
    case "up":
      return { x: 0, y: 24 };
    case "down":
      return { x: 0, y: -24 };
    case "left":
      return { x: 24, y: 0 };
    case "right":
      return { x: -24, y: 0 };
    case "none":
      return { x: 0, y: 0 };
  }
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const offset = getOffset(direction);

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
