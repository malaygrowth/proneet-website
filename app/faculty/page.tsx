import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PageByline } from "@/components/ui/page-byline";
import { KeyTakeaways } from "@/components/ui/key-takeaways";
import { PageFaq } from "@/components/sections/page-faq";

const FACULTY_FAQS = [
  {
    question: "Who actually teaches Physics in the classroom?",
    answer:
      "Neeraj Gupta takes every Physics batch himself. There is no junior stand-in or pre-recorded panel video. He has been teaching Physics for 20+ years, including at Bansal Classes, Narayana, and Excel Physics.",
  },
  {
    question: "Who teaches Chemistry?",
    answer:
      "Vivek Patidar teaches Chemistry. He is a long-trusted name in the Mansarovar coaching circuit in Jaipur, with a year-on-year record of NEET and JEE qualifiers and high board scores. He covers Class 11, Class 12, droppers, and board exam students, across Organic, Inorganic, and Physical Chemistry.",
  },
  {
    question: "Why doesn't ProNEET offer Maths or Biology?",
    answer:
      "We only teach what we can teach at senior-faculty depth. Right now that is Physics and Chemistry. NEET students pair ProNEET with their own Biology coaching. JEE students pair it with their own Maths coaching. We would rather do two subjects properly than four loosely.",
  },
  {
    question: "Will the same teacher teach me across Class 11 and Class 12?",
    answer:
      "Yes. The same senior teacher takes you through the full 24 months of the programme. There is no mid-year handoff to a different faculty, which is the most common complaint we hear from students switching to us from larger coachings.",
  },
  {
    question: "Can I learn in Hindi or English?",
    answer:
      "Either. Both teachers switch language during a class as the concept needs it. You do not have to lock in a medium at admission. Most students end up bilingual by Class 12 because tougher concepts often land better in one language than the other.",
  },
  {
    question: "Can I attend a free demo class with the actual teacher?",
    answer:
      "Yes. Call admissions on +91 92143 14348 and we will schedule a demo class with Neeraj Gupta for Physics or Vivek Patidar for Chemistry. The teacher you meet at the demo is the teacher who will run your batch.",
  },
];
import { Award, BookOpen, Users, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Faculty",
  description:
    "Meet the ProNEET faculty: Neeraj Gupta (Physics, Founder) and Vivek Patidar (Chemistry). Experienced NEET and JEE teachers, small classroom batches.",
  alternates: { canonical: "/faculty" },
};

// ProNEET currently covers Physics (Neeraj Gupta) and Chemistry
// (Vivek Patidar) for NEET and JEE aspirants.
const FACULTY: {
  name: string;
  role: string;
  experience: string;
  credentials: string[];
  philosophy: string;
  featured: boolean;
  image?: string;
}[] = [
  {
    name: "Neeraj Gupta",
    role: "Founder. Teaches Physics.",
    experience: "20+ years · ex-Bansal Classes, Narayana, Excel Physics",
    image: "/photos/neeraj-gupta.png",
    credentials: [
      "20+ years of classroom Physics across Bansal Classes, Narayana, and Excel Physics. Three of the country's most respected NEET / JEE setups.",
      "Takes every Physics class himself. No junior stand-in.",
      "Teaches in Hindi or English, switches per student as needed",
      "Known for sitting with anxious students long after class ends",
    ],
    philosophy:
      "Physics isn't memorised. It's understood once, then used forever. If a student can explain why a pulley problem works, they'll solve twenty of them without looking at a formula sheet.",
    featured: true,
  },
  {
    name: "Vivek Patidar",
    role: "Teaches Chemistry. A trusted name around Mansarovar.",
    experience: "Trusted in Mansarovar, Jaipur",
    image: "/photos/vivek-patidar.jpeg",
    credentials: [
      "A Chemistry name parents ask each other about in Mansarovar, Jaipur",
      "Year-on-year record of NEET and JEE qualifiers and top board scores",
      "Covers Class 11, Class 12, droppers, and board exam students",
      "Teaches all three branches end-to-end: Organic, Inorganic, Physical",
    ],
    philosophy:
      "Chemistry looks like three different subjects. It isn't. Organic is reasoning. Inorganic is pattern. Physical is Physics wearing a lab coat. Once a student sees that, the panic about mugging up chemistry stops.",
    featured: false,
  },
];

function getInitials(name: string): string {
  return name
    .replace(/^(Er\.|Dr\.|Prof\.|Mr\.|Ms\.)\s*/i, "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function FacultyPage() {
  return (
    <main className="pt-24 pb-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            FACULTY
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Two teachers. Two subjects. No panel rotation.
          </h1>
          <PageByline
            author="ProNEET Editorial"
            authorRole="Verified by Neeraj Gupta, Founder"
            lastUpdated="April 20, 2026"
          />
          <p className="mt-4 text-base text-slate-500 max-w-xl mx-auto">
            Most coaching runs on panels. Senior names record the videos,
            junior faces run your class. ProNEET is the opposite. The
            teacher on the brochure is the teacher at the board.
          </p>
        </ScrollReveal>

        {/* Key Takeaways */}
        <ScrollReveal className="max-w-3xl mx-auto mb-16">
          <KeyTakeaways
            bullets={[
              "Two faculty cover both subjects on offer: Neeraj Gupta (Physics, Founder) and Vivek Patidar (Chemistry).",
              "Neeraj Gupta has 20+ years of Physics teaching, including Bansal Classes, Narayana, and Excel Physics.",
              "The founder personally leads every Physics batch. No junior stand-in, no pre-recorded panel.",
              "Both teachers handle Hindi or English medium and switch language per student as needed.",
              "One teacher per subject across all 24 months of the Class 11 + 12 programme. No mid-year handoff.",
              "1000+ NEET / AIIMS / IIT selections since the institute began (ProNEET admissions records, 2003–2026).",
            ]}
          />
        </ScrollReveal>

        {/* Stats bar */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: Award, label: "Years Teaching (Founder)", value: "20+" },
              { icon: Users, label: "Students Selected", value: "1000+" },
              { icon: GraduationCap, label: "NEET / AIIMS / IIT", value: "All three" },
              { icon: BookOpen, label: "Subjects Taught", value: "Physics · Chemistry" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-100 bg-surface-secondary p-5 text-center"
              >
                <stat.icon className="w-5 h-5 text-brand mx-auto mb-2" />
                <p className="text-xl font-extrabold text-slate-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="-mt-12 mb-16 text-center text-[11px] font-mono text-slate-400">
            Source: ProNEET admissions and alumni records, 2003–2026.
          </p>
        </ScrollReveal>

        {/* Faculty profiles */}
        <div className="space-y-8">
          {FACULTY.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.08}>
              <div
                className={`rounded-xl border p-6 sm:p-8 transition-all duration-300 ${
                  member.featured
                    ? "border-brand/30 bg-brand/5 shadow-tier-md"
                    : "border-slate-200 bg-white hover:shadow-tier-sm"
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Avatar / portrait */}
                  <div className="flex-shrink-0">
                    {member.image ? (
                      <div className="relative w-[100px] h-[125px] rounded-xl overflow-hidden ring-1 ring-brand/20 shadow-tier-sm">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="100px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="flex items-center justify-center rounded-xl text-xl font-bold text-white"
                        style={{
                          width: 80,
                          height: 80,
                          background: member.featured
                            ? "linear-gradient(135deg, #2563EB, #1D4ED8)"
                            : "linear-gradient(135deg, #64748B, #475569)",
                        }}
                      >
                        {getInitials(member.name)}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h2 className="text-lg font-bold text-slate-900">
                        {member.name}
                      </h2>
                      {member.featured && (
                        <span className="inline-flex items-center rounded-full bg-accent-orange px-2.5 py-0.5 text-xs font-bold text-white">
                          Founder
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-brand font-medium">
                      {member.role}
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {member.experience}
                    </p>

                    {/* Credentials */}
                    <ul className="mt-4 grid sm:grid-cols-2 gap-2">
                      {member.credentials.map((cred) => (
                        <li
                          key={cred}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                          {cred}
                        </li>
                      ))}
                    </ul>

                    {/* Philosophy */}
                    <div className="mt-5 rounded-lg bg-white/80 border border-slate-100 p-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                        Teaching Philosophy
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed italic">
                        &ldquo;{member.philosophy}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* FAQ */}
        <PageFaq
          eyebrow="FACULTY · FAQ"
          heading="What parents and students ask about our teachers"
          items={FACULTY_FAQS}
        />
      </div>
    </main>
  );
}
