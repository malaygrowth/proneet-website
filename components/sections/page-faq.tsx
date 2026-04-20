"use client";

// Single-section FAQ for sub-pages. The homepage has its own tabbed FAQ
// (students vs parents). Sub-pages need a simpler, content-specific block.
// Handbook §4.11: 5+ questions, 2-3 sentence answers, first sentence is
// the direct answer (clean extraction for AEO snippets).

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { cn } from "@/lib/utils";
import { trackFaqExpand } from "@/lib/analytics";

export interface FaqItem {
  question: string;
  answer: string;
}

interface PageFaqProps {
  eyebrow?: string;
  heading: string;
  items: FaqItem[];
}

export function PageFaq({ eyebrow = "FAQ", heading, items }: PageFaqProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : -1);
    if (isOpening && items[index]) {
      trackFaqExpand(items[index].question);
    }
  };

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden bg-surface-secondary mt-16 -mx-6 lg:-mx-10 px-6 lg:px-10 rounded-2xl">
      <div className="relative z-10 max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-10">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
            {heading}
          </h2>
        </ScrollReveal>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.question}
                className={cn(
                  "rounded-lg border transition-all duration-300",
                  isOpen
                    ? "border-l-brand border-l-2 border-slate-200 bg-white shadow-tier-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                )}
              >
                <button
                  onClick={() => handleToggle(i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn(
                      "text-sm font-semibold pr-4",
                      isOpen ? "text-slate-900" : "text-slate-700"
                    )}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 flex-shrink-0 text-slate-400 transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
