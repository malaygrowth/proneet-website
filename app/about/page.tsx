import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PageByline } from "@/components/ui/page-byline";
import { KeyTakeaways } from "@/components/ui/key-takeaways";

export const metadata: Metadata = {
  title: "About",
  description:
    "ProNEET, founded by Neeraj Gupta (ex-Bansal Classes, Narayana, Excel Physics). 20+ years teaching, 1000+ NEET / AIIMS / IIT selections, with Physics by Neeraj Gupta and Mathematics by Vivek Patidar for NEET and JEE aspirants.",
};

// Chapters of the institute's journey — stated in arcs rather than
// precise years because we don't have verified dated milestones.
const TIMELINE = [
  {
    year: "The 1990s",
    title: "Teaching at India's top institutes",
    description:
      "Neeraj Gupta begins teaching Physics at India's top coaching institutes: Bansal Classes, Narayana, and Excel Physics. He builds a reputation for explaining tough concepts in everyday language.",
  },
  {
    year: "Mid-2000s",
    title: "A small-faculty conviction",
    description:
      "Watching students struggle in overstretched multi-thousand-student institutes, he decides to do the opposite. Keep the batches small, keep the faculty small, and know every student by name.",
  },
  {
    year: "ProNEET begins",
    title: "Small-batch coaching in Jaipur",
    description:
      "ProNEET starts in Jaipur with small classroom batches, Hindi & English medium, and a flat commitment: every student gets personal attention, every doubt gets same-day clearing. Neeraj Gupta is joined by Vivek Patidar (Mathematics) to anchor the Physics and Maths teaching for NEET and JEE aspirants.",
  },
  {
    year: "Online era",
    title: "Recorded lectures, live online, distance learning",
    description:
      "As students spread across cities (and abroad), the institute adds live online classes, HD-quality recorded lectures and printed study material so students can keep up from anywhere.",
  },
  {
    year: "Today",
    title: "1000+ selections and counting",
    description:
      "Over the years, 1000+ students taught here have cleared NEET, AIIMS, IITs and NITs, and many have gone on to become doctors, engineers and researchers. The method hasn't changed: small batches, concept-first teaching, personal mentorship.",
  },
];

// Two short argument blocks replace the earlier six-icon "values" grid.
// They answer the two questions an Indian NEET/JEE parent actually has after
// reading the founder story: (1) why is this different and (2) what does it
// actually look like in practice.
const WHY_SMALL_BATCH = [
  {
    heading: "Why 30 seats, not 300",
    body: "In a 300-seater, the top ten students pull the median up and everyone else runs harder than they need to. The bottom half gets lost. At 30 seats the teacher sees which student stopped taking notes on Tuesday, and catches it on Wednesday. That's the single biggest difference between a good rank and a mediocre one.",
  },
  {
    heading: "Why senior faculty, every class",
    body: "Big coaching runs on panels: senior faculty record the videos, junior teachers handle the live classes. Here, Neeraj Gupta teaches Physics himself. Vivek Patidar handles Maths. No handoff, no substitution. The person who wrote your test is the person who explains where you went wrong.",
  },
];

const WHAT_A_WEEK_LOOKS_LIKE = [
  "Six days a week of classroom teaching, split between Physics and Maths.",
  "One topic test every week. Reviewed in class, not just graded.",
  "Daily practice problems (DPPs) for every chapter.",
  "Saturday: a dedicated doubt session. Stay as long as you want.",
  "A short call or note to parents every fortnight, so nothing is a surprise at the end of the year.",
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
            Small coaching. Senior faculty. No panel tricks.
          </h1>
          <PageByline
            author="Neeraj Gupta"
            authorRole="Founder, ProNEET · 20+ years teaching Physics"
            lastUpdated="April 20, 2026"
          />
          <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto">
            Two decades inside India&apos;s top coaching institutes (Bansal
            Classes, Narayana, and Excel Physics) taught Neeraj Gupta what
            works and what goes missing. ProNEET is the
            version of a Jaipur coaching that keeps what works and drops
            everything else.
          </p>
        </ScrollReveal>

        {/* Key Takeaways */}
        <ScrollReveal className="max-w-3xl mx-auto mb-16">
          <KeyTakeaways
            bullets={[
              "ProNEET caps batches at 30 seats. Most large coachings run 200 to 400 per classroom.",
              "Founder Neeraj Gupta has 20+ years teaching Physics, including stints at Bansal Classes, Narayana, and Excel Physics.",
              "Two senior teachers cover both subjects on offer: Neeraj Gupta for Physics, Vivek Patidar for Maths. No junior stand-ins, no rotating panels.",
              "Same teacher across Class 11 and Class 12. No mid-programme handoff to a different faculty.",
              "Six classroom days a week, weekly topic test, Saturday doubt session, fortnightly parent update.",
              "1000+ NEET / AIIMS / IIT selections since the institute began (ProNEET admissions records, 2003–2026).",
            ]}
          />
        </ScrollReveal>

        {/* Founder story */}
        <ScrollReveal>
          <div className="rounded-xl border border-brand/20 bg-brand/5 p-6 sm:p-10 mb-16">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Portrait */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="relative w-[120px] h-[150px] rounded-xl overflow-hidden shadow-tier-md ring-1 ring-brand/20">
                  <Image
                    src="/photos/neeraj-gupta.png"
                    alt="Neeraj Gupta, Founder of ProNEET"
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 text-sm font-bold text-slate-900">
                  Neeraj Gupta
                </p>
                <p className="text-xs text-slate-500">Founder, ProNEET</p>
              </div>

              {/* Story */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Small batches. Real mentorship. Done properly.
                </h2>
                <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                  <p>
                    Neeraj Gupta has been teaching Physics for over 20
                    years, most of them at three of India&apos;s most
                    respected coaching institutes: Bansal Classes, Narayana,
                    and Excel Physics. The idea behind ProNEET was simple:
                    if you truly understand a concept, you can solve any
                    problem built on it.
                  </p>
                  <p>
                    So he stopped chasing the thousand-student, rotating-panel
                    format and started his own institute in Jaipur. Small
                    classroom batches. Hindi and English medium. Every doubt
                    cleared the same day. One teacher per subject. He
                    personally teaches Physics, alongside Vivek Patidar,
                    a trusted Maths name in the Mansarovar coaching
                    circuit, for Mathematics.
                  </p>
                  <p>
                    Students started telling their friends. Parents started
                    trusting. Over the years, 1000+ students taught here have
                    cleared NEET, AIIMS and the IITs, and many have gone on
                    to be doctors, engineers and researchers.
                  </p>
                  <p>
                    The classroom has grown and we now also run live online
                    and individual international 1-on-1 batches. The
                    principle hasn&apos;t changed. Keep batches small. Teach
                    concepts before formulas. Know every student by name.
                    Never compromise on depth for speed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Why small batches — two-block argument */}
        <ScrollReveal className="mb-20">
          <div className="grid md:grid-cols-2 gap-6">
            {WHY_SMALL_BATCH.map((block) => (
              <div
                key={block.heading}
                className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
              >
                <h2 className="text-lg font-bold text-slate-900 mb-3">
                  {block.heading}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* What a week at ProNEET looks like */}
        <ScrollReveal className="mb-20">
          <div className="rounded-xl bg-surface-secondary border border-slate-100 p-6 sm:p-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              What a week at ProNEET actually looks like
            </h2>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed max-w-2xl">
              No jargon, no flagship anything. Just a predictable rhythm so
              you always know what Tuesday looks like.
            </p>
            <ul className="space-y-3">
              {WHAT_A_WEEK_LOOKS_LIKE.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed"
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
            How we got here
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
