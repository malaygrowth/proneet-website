import type { Metadata } from "next";
import { InfographicCompare } from "@/components/infographics/infographic-compare";
import { InfographicSteps } from "@/components/infographics/infographic-steps";
import { InfographicBars } from "@/components/infographics/infographic-bars";

export const metadata: Metadata = {
  title: "Infographic samples (internal)",
  description: "Design system samples for ProNEET blog infographics.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/blog/samples/infographics" },
};

export default function InfographicSamplesPage() {
  return (
    <main className="pt-24 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="mb-10">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            INTERNAL · DESIGN SYSTEM
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Infographic samples
          </h1>
          <p className="mt-4 text-base text-slate-500 max-w-2xl">
            Three locked component shapes for every ProNEET blog
            infographic. Glassmorphic surface, brand blue + accent
            orange only, mono numbers, zero AI-photo dependence.
          </p>
        </div>

        {/* SAMPLE 1 — Compare */}
        <section className="mb-20">
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400 mb-2">
            Sample 1 — <span className="text-slate-700">InfographicCompare</span>
          </p>
          <p className="text-sm text-slate-500 mb-6">
            Side-by-side contrast. Example: the "30-seat vs 300-seat"
            contrarian take from Pillar 1.
          </p>
          <InfographicCompare
            eyebrow="Batch size matters more than brand"
            heading="30-seat batch vs 300-seat batch"
            left={{
              title: "Small-batch classroom",
              subtitle: "30 seats",
              stat: "30",
              statLabel: "students per batch",
              bullets: [
                "Teacher knows every name by week two",
                "Notices disengagement on a specific face",
                "Doubt sessions with 3-5 students, not 40",
                "Same senior teacher across Class 11 + 12",
              ],
              verdict: "Engineered for attention",
            }}
            right={{
              title: "Mega-coaching classroom",
              subtitle: "300 seats",
              stat: "300",
              statLabel: "students per batch",
              bullets: [
                "Teacher anchors lecture to top-10 students",
                "Bottom half disengages silently",
                "Weekend doubt queue stretches beyond 40 students",
                "Teacher rotation between Class 11 and Class 12",
              ],
              verdict: "Engineered for throughput",
            }}
            footnote="Source: 20+ years of classroom observation at Bansal Classes, Narayana, Excel Physics, and ProNEET."
          />
        </section>

        {/* SAMPLE 2 — Steps */}
        <section className="mb-20">
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400 mb-2">
            Sample 2 — <span className="text-slate-700">InfographicSteps</span>
          </p>
          <p className="text-sm text-slate-500 mb-6">
            Numbered steps. Example: the 7-point parent checklist from
            the Best NEET satellite.
          </p>
          <InfographicSteps
            eyebrow="Parent checklist"
            heading="Seven checks before you enrol in any Jaipur NEET coaching"
            steps={[
              {
                title: "Who, by name, teaches the live class?",
                body: "Ignore the website headshots. Get the actual teacher's name in writing.",
              },
              {
                title: "What is the real batch size cap?",
                body: "Ask the advertised cap AND last year's actual enrolled count.",
              },
              {
                title: "Full fee in writing, every add-on included?",
                body: "One sheet, every line. If the counsellor resists, that is your answer.",
              },
              {
                title: "Is the demo class a real class or a pitch?",
                body: "Attend an actual live teaching day, not a scripted demo.",
              },
              {
                title: "Genuine Hindi-medium delivery?",
                body: "Ask the teacher to switch to Hindi mid-sentence unprompted.",
              },
              {
                title: "How often do you hear from a human?",
                body: "Fortnightly call or note beats any in-app notification.",
              },
              {
                title: "What's the exit policy?",
                body: "Month-2 withdrawal terms and refund percentage, stated upfront.",
              },
            ]}
            footnote="Source: ProNEET transfer admissions conversations, 2023-2026."
          />
        </section>

        {/* SAMPLE 3 — Bars */}
        <section className="mb-20">
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400 mb-2">
            Sample 3 — <span className="text-slate-700">InfographicBars</span>
          </p>
          <p className="text-sm text-slate-500 mb-6">
            Horizontal bar chart with glass framing. Example: NEET
            coaching fees per year by Jaipur tier.
          </p>
          <InfographicBars
            eyebrow="Jaipur NEET coaching fees"
            heading="Two-year classroom fees per year, by tier"
            values={[
              {
                label: "National brand branch",
                sublabel: "Allen, Aakash, Resonance Jaipur",
                value: 220000,
                displayValue: "₹1.6 – 2.8 L",
              },
              {
                label: "Local mid-tier institute",
                sublabel: "Parmar, Convex, Foundation, Tomer",
                value: 115000,
                displayValue: "₹80 K – 1.4 L",
              },
              {
                label: "Small-batch / specialist",
                sublabel: "ProNEET and similar",
                value: 80000,
                displayValue: "₹60 K – 1 L",
              },
              {
                label: "Dropper batch (1 year)",
                sublabel: "Across all tiers",
                value: 170000,
                displayValue: "₹1 – 2.2 L",
              },
            ]}
            max={280000}
            axisLabel="Annual fee range (₹)"
            footnote="Source: ProNEET 2026 Q1 Jaipur market sweep. Ranges include all standard add-ons."
          />
        </section>

        <div className="rounded-xl border border-slate-100 bg-surface-secondary p-6 sm:p-8 text-sm text-slate-600 leading-relaxed">
          <p className="font-semibold text-slate-900 mb-2">
            What's not here (yet, on purpose)
          </p>
          <p>
            The inventory lists 6 shapes. We shipped 3 first so you can
            react before we build the rest. Still to come:
            <span className="font-mono text-[12px] text-slate-500">
              {" "}InfographicStats, InfographicTable, InfographicQuote
            </span>
            . None of them add new surfaces or colours; they reuse the
            same glass recipe.
          </p>
        </div>
      </div>
    </main>
  );
}
