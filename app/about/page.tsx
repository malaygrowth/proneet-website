import type { Metadata } from "next";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Target, Heart, BookOpen, Users, Award, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about ProNEET's story, mission, and values. Founded by Er. Neeraj Gupta with 25+ years of Physics teaching experience.",
};

const TIMELINE = [
  {
    year: "2000",
    title: "The Beginning",
    description:
      "Er. Neeraj Gupta starts teaching Physics to small groups of NEET aspirants in Jaipur. The first batch has just 8 students.",
  },
  {
    year: "2005",
    title: "Growing Reputation",
    description:
      "Word spreads as students consistently score 150+ in Physics. Batch size grows but remains capped at 30 to maintain quality.",
  },
  {
    year: "2010",
    title: "100+ Selections",
    description:
      "ProNEET crosses the milestone of 100 NEET selections. The unique teaching method - concept-first, formula-later - becomes the hallmark.",
  },
  {
    year: "2015",
    title: "Expanding Programs",
    description:
      "JEE Mains program launched alongside NEET. Dropper Batch introduced for gap-year students after seeing demand from post-12th aspirants.",
  },
  {
    year: "2020",
    title: "Digital Adaptation",
    description:
      "Seamless transition to hybrid learning during challenging times. Recorded lectures and online doubt sessions ensure no student is left behind.",
  },
  {
    year: "2024",
    title: "500+ Selections",
    description:
      "ProNEET reaches the landmark of 500+ NEET selections with AIR 45 as the best rank. The mission continues with the same small-batch, high-impact philosophy.",
  },
];

const VALUES = [
  {
    icon: Target,
    title: "Concept-First Teaching",
    description:
      "We never start with formulas. Every topic begins with the 'why' — building intuition before introducing equations.",
  },
  {
    icon: Users,
    title: "Small Batches",
    description:
      "Every batch is strictly capped at 30 students. This is non-negotiable. Personal attention is not a luxury — it is the method.",
  },
  {
    icon: Heart,
    title: "Genuine Mentorship",
    description:
      "Teachers here know every student by name. We track progress, identify struggles early, and intervene before it is too late.",
  },
  {
    icon: BookOpen,
    title: "Structured Curriculum",
    description:
      "No random topics. Every week, every test, every revision cycle is planned months in advance with a clear progression path.",
  },
  {
    icon: Award,
    title: "Results with Integrity",
    description:
      "We do not inflate numbers. Every selection we claim is verified. Our reputation is built on honesty, not marketing.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Improvement",
    description:
      "We review our methods every year. What worked is refined. What did not is replaced. Teaching is a craft — we keep sharpening it.",
  },
];

export default function AboutPage() {
  return (
    <main className="pt-24 pb-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            ABOUT US
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            The ProNEET Story
          </h1>
          <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto">
            Born from a belief that great teaching changes lives. 25 years later,
            500+ NEET selections prove it right.
          </p>
        </ScrollReveal>

        {/* Founder story */}
        <ScrollReveal>
          <div className="rounded-xl border border-brand/20 bg-brand/5 p-6 sm:p-10 mb-16">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div
                  className="flex items-center justify-center rounded-xl text-2xl font-bold text-white"
                  style={{
                    width: 100,
                    height: 100,
                    background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                  }}
                >
                  NG
                </div>
                <p className="mt-3 text-sm font-bold text-slate-900">
                  Er. Neeraj Gupta
                </p>
                <p className="text-xs text-slate-500">Founder, ProNEET</p>
              </div>

              {/* Story */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  From a Small Room to 500+ Selections
                </h2>
                <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                  <p>
                    In 2000, Er. Neeraj Gupta left a comfortable engineering
                    career to pursue what he cared about most — teaching
                    Physics. The idea was simple: if you truly understand a
                    concept, you can solve any problem built on it.
                  </p>
                  <p>
                    He started with 8 students in a rented room in Jaipur. No
                    fancy infrastructure, no marketing budget — just a
                    blackboard, chalk, and an absolute commitment to making
                    Physics make sense.
                  </p>
                  <p>
                    That first batch produced 6 selections. Students started
                    telling their friends. Parents started trusting. And a
                    philosophy became a movement.
                  </p>
                  <p>
                    25 years later, the classroom has grown but the principle
                    remains unchanged: keep batches small, teach concepts
                    before formulas, know every student by name, and never
                    compromise on depth for speed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Mission */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              To make world-class Physics education accessible to every serious
              NEET and JEE aspirant in Jaipur — through small batches, genuine
              mentorship, and a teaching approach that prioritizes understanding
              over memorization.
            </p>
          </div>
        </ScrollReveal>

        {/* Values */}
        <ScrollReveal className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
            What We Believe In
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.06}>
                <div className="rounded-xl border border-slate-100 bg-surface-secondary p-6 h-full">
                  <value.icon className="w-6 h-6 text-brand mb-4" />
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
            The ProNEET Journey
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 md:-translate-x-px" />

          <div className="space-y-8">
            {TIMELINE.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <ScrollReveal
                  key={event.year}
                  delay={i * 0.08}
                  direction={isLeft ? "left" : "right"}
                >
                  <div className="relative flex items-start gap-6 md:gap-0">
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-brand border-2 border-white shadow-sm -translate-x-1.5 mt-1.5 z-10" />

                    {/* Content */}
                    <div
                      className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                        isLeft
                          ? "md:mr-auto md:pr-8 md:text-right"
                          : "md:ml-auto md:pl-8"
                      }`}
                    >
                      <span className="inline-block font-mono text-xs font-bold text-brand">
                        {event.year}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-1">
                        {event.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
