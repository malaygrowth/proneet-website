import type { Metadata } from "next";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { ProgramCard } from "@/components/ui/program-card";
import { PageByline } from "@/components/ui/page-byline";
import { PageFaq } from "@/components/sections/page-faq";
import { BreadcrumbJsonLd, CourseJsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/constants";

const PROGRAM_FAQS = [
  {
    question: "How big is each batch?",
    answer:
      "Capped at 30 seats. That cap is the central design choice of ProNEET, not a marketing line we soften later. If a batch fills, the next student goes on a waitlist for the following session.",
  },
  {
    question: "Can I join mid-year if I'm switching from another coaching?",
    answer:
      "Usually yes, but only after a short diagnostic and a conversation with the teacher. We look at where your old batch is in the syllabus and where ours is. If the gap is too wide, we will tell you honestly and suggest the dropper batch or the next 11th cycle instead.",
  },
  {
    question: "Do you teach JEE Advanced as well?",
    answer:
      "JEE Main is the primary scope of our JEE batch, with JEE Advanced as a stretch goal for top-quartile students. If your goal is an IIT, we will be straight about whether your current trajectory supports it and what extra work would be required.",
  },
  {
    question: "What study material is included?",
    answer:
      "Printed chapter-wise notes, daily practice problems (DPPs), weekly topic tests, and previous-year question banks for the last 10 years of NEET / JEE. All of it included in the fee, no separate test-series add-on.",
  },
  {
    question: "What are the fees for each batch?",
    answer:
      "Fees vary by batch (NEET, JEE, Dropper, 1-on-1) and the number of subjects taken. Call admissions on +91 92143 14348 and we will share the breakdown for the specific programme you're considering. EMI options are available for two-year batches.",
  },
  {
    question: "Can I take only Physics, or only Chemistry?",
    answer:
      "Yes. Many students join just for Physics with Neeraj sir while continuing other subjects at their existing coaching. The 1-on-1 online track is the most common single-subject route. Classroom batches usually take both subjects together.",
  },
  {
    question: "How does the 1-on-1 online track actually work?",
    answer:
      "Live one-teacher-one-student classes scheduled around your timezone, taught by the same senior faculty as the Jaipur classroom batches. Schedule, fees, and study plan are agreed in the first call. Most students on this track are in India; a few run from Dubai and the Gulf.",
  },
];

export const metadata: Metadata = {
  title: "Programs",
  description:
    "ProNEET programs: NEET, JEE, Dropper Batch and 1-on-1 online. Physics and Chemistry by a handpicked small faculty in Jaipur.",
  alternates: { canonical: "/programs" },
};

// ProNEET covers Physics (Neeraj Gupta) and Chemistry (Vivek Patidar).
// Maths and Biology are not offered at this time.
const PROGRAMS = [
  {
    title: "NEET Classroom",
    target: "Class 11 and 12, Pre-Medical",
    duration: "2-year classroom batch, Jaipur",
    featured: true,
    features: [
      "Physics with Neeraj Gupta, the founder, every class.",
      "One batch, one senior teacher across Class 11 and 12.",
      "Weekly topic tests, reviewed in class the next day.",
      "Chapter-wise DPPs and printed study material.",
      "Recorded lectures if you miss a class.",
      "Hindi or English medium, decided after the demo.",
      "Designed to sit alongside your own Biology coaching.",
      "Parent update every fortnight, not only at term end.",
    ],
    description:
      "The two-year classroom batch for Class 11 and 12 students preparing for NEET-UG. NEET has 180 questions across Physics, Chemistry and Biology. ProNEET covers Physics and Chemistry tightly inside the batch, while students pair it with their preferred Biology setup. The argument for joining is not that we're the biggest. It's that for two years, the same senior teacher will know your work.",
  },
  {
    title: "JEE Classroom",
    target: "Class 11 and 12, Engineering track",
    duration: "2-year classroom batch, Jaipur",
    featured: false,
    features: [
      "Physics and Chemistry, taught end-to-end by senior faculty.",
      "Chemistry taught by Vivek Patidar, a Mansarovar name.",
      "JEE Main plus BITSAT and VITEEE in scope.",
      "Board exam prep built into the schedule, not after it.",
      "Monthly full-length mocks graded against real JEE cut-offs.",
      "Chapter-wise question banks, difficulty-ranked.",
      "Short-method drills only after the long method is solid.",
      "Hindi or English medium.",
    ],
    description:
      "The two-year classroom batch for JEE Main aspirants (with JEE Advanced as a stretch). Physics with Neeraj Gupta. Chemistry with Vivek Patidar. Both subjects taught by one dedicated senior teacher each, Class 11 through Class 12. No rotating panels, no pre-recorded stand-ins. Students pair this with their own Maths prep.",
  },
  {
    title: "Dropper Batch",
    target: "Post-12 students taking a gap year",
    duration: "1-year intensive",
    featured: false,
    features: [
      "Built for students who know why last year didn't land.",
      "Week-one diagnostic, then a syllabus rebuilt around gaps.",
      "Morning or evening slot so self-study survives.",
      "Daily problem sets. Weekly full-length mocks.",
      "Last 10 years of NEET and JEE Physics and Chemistry, walked through.",
      "Mentor check-in every week on stress and pacing.",
      "Test strategy sessions, not just content.",
      "Progress review every month with a written note.",
    ],
    description:
      "The one-year batch for students who are repeating NEET or JEE. This batch assumes you've already met the syllabus, that what broke the first time was pacing, test-taking, or one or two chapters that never clicked. We start with diagnostics, then rebuild around your actual gaps instead of teaching everything from scratch. The aim is fewer surprises on exam day.",
  },
  {
    title: "1-on-1 Online",
    target: "Students across India, and Indian families abroad",
    duration: "Live online, scheduled around you",
    featured: false,
    features: [
      "One student, one teacher, live online.",
      "Available to students anywhere in India first.",
      "Also run for Indian families in Dubai and the Gulf.",
      "Pick Physics, Chemistry, or both.",
      "Taught by the same senior faculty, not junior stand-ins.",
      "Personalised study plan and DPPs.",
      "Same test series as the Jaipur batches.",
      "Schedule and fees agreed in the first call.",
    ],
    description:
      "The 1-on-1 track is for students who need a schedule a batch can't give them, a student in another Indian city whose parents don't want them leaving home, a dropper who needs afternoon classes around a self-study routine, or an Indian family based in Dubai or elsewhere in the Gulf where NEET / JEE coaching isn't easy to find locally. Same senior faculty as the classroom batches. Same study material. The first call works out what the schedule should look like.",
  },
];

export default function ProgramsPage() {
  return (
    <main className="pt-24 pb-20 bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.url },
          { name: "Programs", url: `${SITE.url}/programs` },
        ]}
      />
      <CourseJsonLd
        courses={[
          {
            name: "NEET Classroom (Class 11 + 12)",
            description:
              "Two-year classroom batch for NEET-UG. Physics by Neeraj Gupta, Chemistry by Vivek Patidar. Students pair ProNEET with their own Biology coaching. 30-seat cap, Hindi or English medium, weekly topic tests, daily practice problems, fortnightly parent updates.",
            url: `${SITE.url}/programs#neet-classroom`,
            duration: "P2Y",
            educationalLevel: "Class 11 and 12",
          },
          {
            name: "JEE Classroom (Class 11 + 12)",
            description:
              "Two-year classroom batch for JEE Main (with Advanced as a stretch). Physics by Neeraj Gupta, Chemistry by Vivek Patidar. Students pair with their own Maths prep. Board exam prep built in, monthly full-length mocks graded against real cut-offs.",
            url: `${SITE.url}/programs#jee-classroom`,
            duration: "P2Y",
            educationalLevel: "Class 11 and 12",
          },
          {
            name: "Dropper Batch (1-year intensive)",
            description:
              "One-year intensive for students repeating NEET or JEE. Week-one diagnostic, then syllabus rebuilt around gaps. Morning or evening slot, daily problem sets, weekly full-length mocks, mentor check-in each week.",
            url: `${SITE.url}/programs#dropper-batch`,
            duration: "P1Y",
            educationalLevel: "Post-Class 12",
          },
          {
            name: "1-on-1 Online (Physics or Chemistry)",
            description:
              "Live one-teacher-one-student online classes taught by the same senior faculty as the Jaipur classroom batches. Personalised study plan, DPPs, same test series. For students across India and Indian families in the Gulf.",
            url: `${SITE.url}/programs#online-1-on-1`,
            duration: "P1Y",
            educationalLevel: "Class 11, 12, Dropper",
          },
        ]}
      />
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            PROGRAMS
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Pick the batch that matches where you are.
          </h1>
          <PageByline
            author="ProNEET Admissions"
            authorRole="Verified by Neeraj Gupta, Founder"
            lastUpdated="April 20, 2026"
          />
          <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto">
            Classroom on Madhyam Marg, Mansarovar Sector 8 for students from across Jaipur.
            A dropper batch for students rebuilding after a first attempt.
            Live online 1-on-1 for students anywhere else. Same senior
            faculty in all four.
          </p>
        </ScrollReveal>

        {/* Program cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 lg:gap-8 mb-16">
          {PROGRAMS.map((program, i) => (
            <ScrollReveal key={program.title} delay={i * 0.1}>
              <ProgramCard
                title={program.title}
                target={program.target}
                duration={program.duration}
                featured={program.featured}
                features={program.features}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Detailed descriptions */}
        <div className="space-y-12">
          {PROGRAMS.map((program, i) => (
            <ScrollReveal key={program.title} delay={i * 0.05}>
              <div className="rounded-xl border border-slate-100 bg-surface-secondary p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg font-bold text-slate-900">
                    {program.title}
                  </h2>
                  <span className="text-xs font-mono text-brand font-semibold">
                    {program.duration}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {program.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* FAQ */}
        <PageFaq
          eyebrow="PROGRAMS · FAQ"
          heading="Common questions before joining a batch"
          items={PROGRAM_FAQS}
        />
      </div>
    </main>
  );
}
