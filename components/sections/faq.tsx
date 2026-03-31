"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const STUDENT_FAQS = [
  {
    question: "I'm a dropper. Is it too late?",
    answer:
      "Absolutely not. Many of our top rankers were droppers. Our Dropper Batch is specifically designed for students who want to make their gap year count — with intensive revision, daily practice, and mentorship to keep you motivated.",
  },
  {
    question: "I'm weak in Physics basics. Will I keep up?",
    answer:
      "Yes. We start every batch with a Day 1 diagnostic test to understand exactly where you stand. From there, we rebuild your concepts brick by brick — no assumptions, no skipping. You'll be surprised how quickly gaps close with the right approach.",
  },
  {
    question: "How is this different from YouTube?",
    answer:
      "YouTube gives you content. ProNEET gives you structure, accountability, weekly tests, and same-day doubt clearing. You'll have a teacher who knows your name, tracks your progress, and pushes you when you slack — something no algorithm can do.",
  },
  {
    question: "What if I miss a live class?",
    answer:
      "Every class is recorded and available within hours. You can watch at your own pace, and your doubts will still be cleared in the next session. We don't penalize — we adapt.",
  },
] as const;

const PARENT_FAQS = [
  {
    question: "How do I track my child's progress?",
    answer:
      "You'll receive a detailed weekly progress report covering test scores, attendance, and areas of improvement. You also get direct access to a student counselor for any questions.",
  },
  {
    question: "What are the teacher's qualifications?",
    answer:
      "Er. Neeraj Gupta holds a B.Tech degree with a Physics specialization and has 25+ years of teaching experience. He has mentored 10,000+ students, with 500+ NEET selections including top 1000 AIR ranks.",
  },
  {
    question: "What is the fee structure?",
    answer:
      "We maintain transparent pricing with no hidden charges. EMI options are available to make quality education accessible. Please call us for specific program fees — we'll be happy to walk you through everything.",
  },
  {
    question: "How many students per batch?",
    answer:
      "Every batch is strictly capped at 30 students. This ensures each student gets personal attention, their doubts are addressed the same day, and no one falls through the cracks.",
  },
] as const;

type TabKey = "students" | "parents";

export function FAQ() {
  const [activeTab, setActiveTab] = useState<TabKey>("students");
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqs = activeTab === "students" ? STUDENT_FAQS : PARENT_FAQS;

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setOpenIndex(0);
  };

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="relative py-30 overflow-hidden bg-surface-secondary">
      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-10">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Got questions? We&apos;ve got answers.
          </h2>
        </ScrollReveal>

        {/* Tab pills */}
        <ScrollReveal delay={0.1} className="flex justify-center mb-10">
          <div className="inline-flex rounded-full bg-slate-100 p-1">
            <button
              onClick={() => handleTabChange("students")}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeTab === "students"
                  ? "bg-brand text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              For Students
            </button>
            <button
              onClick={() => handleTabChange("parents")}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeTab === "parents"
                  ? "bg-brand text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              For Parents
            </button>
          </div>
        </ScrollReveal>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={`${activeTab}-${i}`}
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
                >
                  <span
                    className={cn(
                      "text-sm font-semibold pr-4",
                      isOpen ? "text-slate-900" : "text-slate-700"
                    )}
                  >
                    {faq.question}
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
                    isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="px-5 pb-4 text-sm text-slate-500 leading-relaxed">
                    {faq.answer}
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
