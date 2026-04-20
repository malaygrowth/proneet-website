"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const STUDENT_FAQS = [
  {
    question: "I'm a dropper. Is it too late for me?",
    answer:
      "Droppers make up a fair chunk of every batch we run. The Dropper Batch starts with a diagnostic so we know exactly which chapters to rebuild. You're not starting over. You're starting smarter.",
  },
  {
    question: "My Physics is weak. Will I keep up in class?",
    answer:
      "That's the norm, not the exception. Neeraj sir rebuilds fundamentals from Class 9 level if that's what it takes. Nobody's been kicked out of a batch for asking a basic question. Plenty have graduated out of one asking one.",
  },
  {
    question: "How is this different from Unacademy or YouTube?",
    answer:
      "YouTube is free and you'll learn plenty. It won't know you didn't finish your DPP this week. It won't call your parents. It won't see your face and realise something's off. A small live batch does all of that.",
  },
  {
    question: "Is it Hindi medium or English medium?",
    answer:
      "Both. Neeraj sir switches to Hindi the moment a concept needs it, back to English when problems need the precision. You don't have to pick in advance.",
  },
  {
    question: "What if I miss a class?",
    answer:
      "Classes are recorded. You can catch up the same evening. Your doubts still go to the same teacher in the next session.",
  },
] as const;

const PARENT_FAQS = [
  {
    question: "How many students in each batch?",
    answer:
      "Capped at 30. That cap is the whole point of ProNEET. It's not a marketing claim we soften later.",
  },
  {
    question: "Who actually teaches my child?",
    answer:
      "Neeraj Gupta takes Physics himself. Vivek Patidar, known across Mansarovar's coaching circuit, takes Chemistry. Same two teachers through the two-year programme. No panel rotation.",
  },
  {
    question: "How will I know if my child is actually preparing?",
    answer:
      "A short call or note every fortnight. Test scores, attendance, where the gap is, and what we're doing about it. If things are off, you'll hear it from us before you hear it from the result sheet.",
  },
  {
    question: "What are the fees?",
    answer:
      "Fees depend on the batch and the number of subjects. Call the Admissions line (+91 92143 14348) and we'll send the breakdown for the specific programme you're looking at. EMI options are available.",
  },
  {
    question: "Where is the classroom, and is there parking?",
    answer:
      "84/255, Madhyam Marg, Ward 27, Mansarovar Sector 8, Jaipur 302020. Parking is available for two-wheelers and cars. Easy reach from Mansarovar Metro, Malviya Nagar, Gopalpura Bypass, and Ajmer Road.",
  },
  {
    question: "We live outside Jaipur / outside India. Can we still join?",
    answer:
      "Yes. The 1-on-1 online track runs live classes scheduled around your timezone. Most students on this track are in India; a few run from Dubai and the Gulf.",
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
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
