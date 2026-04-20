import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PageByline } from "@/components/ui/page-byline";
import { KeyTakeaways } from "@/components/ui/key-takeaways";
import { PageFaq } from "@/components/sections/page-faq";
import {
  BreadcrumbJsonLd,
  LocalBusinessJsonLd,
} from "@/components/seo/json-ld";
import { SITE } from "@/lib/constants";
import { ArrowRight, MapPin, Phone, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "NEET & JEE Coaching in Mansarovar, Jaipur",
  description:
    "ProNEET runs small-batch NEET and JEE coaching from Mansarovar Sector 8, Jaipur. Physics by Neeraj Gupta (20+ yrs), Chemistry by Vivek Patidar. 30-seat cap.",
  alternates: { canonical: "/locations/mansarovar" },
};

const FAQS = [
  {
    question: "Where exactly is the Mansarovar classroom?",
    answer:
      "84/255, Madhyam Marg, Ward 27, Mansarovar Sector 8, Jaipur 302020. It is a 5-6 minute walk from Mansarovar Metro station (Pink Line) and well connected by auto to Malviya Nagar, Vaisali Nagar, and Gopalpura Bypass. The landmark is Madhyam Marg itself, which is the main commercial artery of Mansarovar Sector 8.",
  },
  {
    question: "Is there parking at the coaching centre?",
    answer:
      "Yes. Two-wheeler parking is inside the building compound. Car parking is available on Madhyam Marg immediately outside. Most students either walk from nearby sectors, take the Metro, or are dropped by parents at the entrance.",
  },
  {
    question: "Which areas of Jaipur are the students mostly from?",
    answer:
      "Our classroom catchment is predominantly Mansarovar (all sectors), Vaisali Nagar, Malviya Nagar, Gopalpura Bypass residential pockets, Shyam Nagar, and parts of C-Scheme. Students from further out (Jagatpura, Raja Park, Tonk Road, Sanganer) usually join the 1-on-1 online track instead of commuting.",
  },
  {
    question: "How do the coaching options in Mansarovar compare?",
    answer:
      "Mansarovar has roughly 10-12 NEET or JEE coaching setups running at any given time, ranging from a national-brand satellite branch down to single-teacher tuition setups. ProNEET is in the small-batch senior-faculty end of that range: 30-seat cap, founder teaches Physics, named senior teaches Chemistry. Fees accordingly sit at the lower end of the local-Jaipur tier, below the national brands.",
  },
  {
    question: "Can students from outside Mansarovar realistically join?",
    answer:
      "Yes, if you are within the 6-8 km radius that auto-rickshaws and school buses cover comfortably. Beyond that the commute starts cutting into study time. For students further out, the live 1-on-1 online track is usually the better path. Same senior faculty, scheduled around you.",
  },
  {
    question: "What's the timing for the Mansarovar classroom?",
    answer:
      "Six days a week, Monday through Saturday. Morning and evening slots are available depending on the batch. The classroom is open 8 AM to 8 PM for doubt sessions and self-study. Saturday afternoons have a dedicated doubt-clearing session where students can stay as long as they need to.",
  },
];

export default function MansarovarLocationPage() {
  return (
    <main className="pt-24 pb-20 bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.url },
          { name: "Locations", url: `${SITE.url}/locations` },
          { name: "Mansarovar", url: `${SITE.url}/locations/mansarovar` },
        ]}
      />
      <LocalBusinessJsonLd />

      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <ScrollReveal className="text-center mb-10">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            LOCATION · MANSAROVAR
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            NEET &amp; JEE Coaching in Mansarovar, Jaipur
          </h1>
          <PageByline
            author="ProNEET Admissions"
            authorRole="Verified by Neeraj Gupta, Founder"
            lastUpdated="April 20, 2026"
          />
          <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto">
            Our classroom is on Madhyam Marg, in the heart of Mansarovar
            Sector 8. Here is everything a parent from Mansarovar, Vaisali
            Nagar, or Malviya Nagar should know before the first visit.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mb-12">
          <figure className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-tier-md">
            <Image
              src="/photos/classroom-empty.webp"
              alt="ProNEET classroom interior on Madhyam Marg, Mansarovar Sector 8, Jaipur"
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
              priority
            />
          </figure>
        </ScrollReveal>

        <ScrollReveal className="mb-14">
          <KeyTakeaways
            bullets={[
              "Address: 84/255, Madhyam Marg, Ward 27, Mansarovar Sector 8, Jaipur 302020.",
              "5-6 minute walk from Mansarovar Metro station (Pink Line).",
              "30-seat classroom, founder-led Physics (Neeraj Gupta, 20+ yrs), Chemistry by Vivek Patidar.",
              "Catchment: Mansarovar, Vaisali Nagar, Malviya Nagar, Gopalpura Bypass, Shyam Nagar, C-Scheme.",
              "Timings: Mon-Sat, classroom open 8 AM to 8 PM; Saturday doubt session runs longer.",
              "Parking inside the building compound for two-wheelers; street parking on Madhyam Marg for cars.",
            ]}
          />
        </ScrollReveal>

        <div className="space-y-10 text-[17px] text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Why a classroom in Mansarovar Sector 8?
            </h2>
            <p>
              Mansarovar is where a large share of Jaipur&apos;s serious
              NEET and JEE students actually live. It is middle-class,
              well-connected by metro, and parents here have historically
              been willing to drive or send their children across town for
              the right teacher. It made sense to stop asking them to.
            </p>
            <p className="mt-4">
              Sector 8 is the commercial spine of Mansarovar. Madhyam
              Marg runs through it and anchors most of the neighbourhood&apos;s
              retail, tuition, and service businesses. The building we
              teach from is three floors, with our classroom on a floor
              designed so a 30-seat batch can hear every word without
              anyone having to sit at the back.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              How do students reach the classroom?
            </h2>
            <p>
              Three typical routes, based on where most of our Class 11
              and Class 12 students actually live:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>
                <strong>From within Mansarovar (sectors 1-11):</strong>{" "}
                5-10 minutes by two-wheeler, 10-20 minutes walking
                depending on sector. Most Mansarovar students walk.
              </li>
              <li>
                <strong>From Vaisali Nagar, Malviya Nagar, Shyam Nagar:</strong>{" "}
                10-15 minutes by two-wheeler or auto via Gopalpura Bypass
                and Ajmer Road.
              </li>
              <li>
                <strong>From C-Scheme, Tonk Road, Bapu Nagar:</strong> 20-25
                minutes by auto or metro. Mansarovar Metro (Pink Line) is
                the reliable option during exam-season traffic.
              </li>
            </ul>
            <p className="mt-5">
              Students from further out (Jagatpura, Raja Park, Jhotwara,
              Sanganer) usually switch to our live 1-on-1 online track
              rather than commute. The commute cost on a two-year
              programme is real, and we are honest about it upfront.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              What else is around Madhyam Marg?
            </h2>
            <p>
              Parents often ask whether there is somewhere nearby to wait
              during pickup, or for a student to grab tea between a long
              session and a test series. Short answer: yes.
            </p>
            <p className="mt-4">
              Madhyam Marg has several small restaurants, cafes, and tea
              stalls within a 200-metre walk of the classroom. There is a
              supermarket at the next signal, and a SBI and HDFC ATM at
              the main roundabout. Mansarovar Metro is five minutes away
              on foot, and the Mansarovar bus depot is fifteen minutes.
              Parents picking up after an evening class can wait in the
              building compound.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              How many coaching options does Mansarovar have?
            </h2>
            <p>
              Mansarovar runs roughly 10-12 NEET or JEE coaching setups at
              any given time. They cover the whole range: one national-
              brand satellite branch, a couple of local mid-tier
              institutes that have been in the area for 8-15 years, a
              handful of single-teacher tuition setups, and a few newer
              small-batch entrants.
            </p>
            <p className="mt-4">
              ProNEET sits in the small-batch end: 30-seat cap, the founder
              personally teaches every Physics class, Chemistry is taught
              by a named senior (Vivek Patidar), no rotating panels or
              junior stand-ins. The trade-off is that we do not teach
              Biology or Maths. Students pair our Physics and Chemistry
              with their own Biology coaching (for NEET) or Maths coaching
              (for JEE).
            </p>
            <p className="mt-4">
              If you are comparing ProNEET against other Mansarovar
              options, what we would flag as actually different:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>The same senior teacher across Class 11 and Class 12.</li>
              <li>
                A hard cap at 30 seats, not a marketing number we quietly
                relax.
              </li>
              <li>
                Hindi or English medium, switched mid-class based on the
                concept.
              </li>
              <li>
                A fortnightly parent update. Not an app notification.
                Either a short call or a written note.
              </li>
            </ul>
            <p className="mt-5">
              For a deeper read on how the Jaipur coaching market splits,
              read our{" "}
              <Link
                href="/blog/neet-coaching-in-jaipur"
                className="text-brand font-medium underline underline-offset-2"
              >
                full guide to NEET coaching in Jaipur
              </Link>
              . It covers fees, batch sizes, and the Kota vs Sikar vs
              Jaipur question in detail.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Booking a visit to the Mansarovar classroom
            </h2>
            <p>
              We run a free demo class for families considering
              enrolment. The demo is a real classroom session with the
              actual teacher who would run your child&apos;s batch, not a
              sales pitch in the counsellor&apos;s office. You will see
              how Neeraj sir teaches a chapter, watch how other students
              engage, and get time afterwards to ask specific questions.
            </p>
            <p className="mt-4">
              To book, call{" "}
              <a
                href={`tel:${SITE.phone}`}
                className="text-brand font-medium underline underline-offset-2"
              >
                {SITE.phoneDisplay}
              </a>
              {" "}or{" "}
              <Link
                href="/contact"
                className="text-brand font-medium underline underline-offset-2"
              >
                send the inquiry form
              </Link>
              . We will confirm a slot within the same working day and
              send the exact location pin on WhatsApp so you can find the
              building on the first try.
            </p>
          </section>
        </div>

        {/* Quick-contact block */}
        <ScrollReveal className="mt-14">
          <div className="rounded-xl border border-brand/15 bg-brand/[0.04] p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-accent-orange mb-4">
              Quick contact
            </p>
            <div className="grid sm:grid-cols-3 gap-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase font-medium text-slate-400">
                    Address
                  </p>
                  <p className="text-sm text-slate-700 mt-0.5">
                    84/255, Madhyam Marg, Mansarovar Sector 8, Jaipur 302020
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase font-medium text-slate-400">
                    Admissions
                  </p>
                  <a
                    href={`tel:${SITE.phone}`}
                    className="text-sm text-slate-700 mt-0.5 hover:text-brand block"
                  >
                    {SITE.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase font-medium text-slate-400">
                    Timings
                  </p>
                  <p className="text-sm text-slate-700 mt-0.5">
                    Mon-Sat, 8 AM-8 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Next steps */}
        <ScrollReveal className="mt-12">
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/programs"
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 group hover:shadow-tier-sm transition"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  See the batches and fees
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  NEET, JEE, Dropper, 1-on-1 Online
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-brand group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/faculty"
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 group hover:shadow-tier-sm transition"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Meet the teachers
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Neeraj Gupta (Physics), Vivek Patidar (Chemistry)
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-brand group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 mt-8">
        <PageFaq
          eyebrow="MANSAROVAR · FAQ"
          heading="Common questions about the classroom"
          items={FAQS}
        />
      </div>
    </main>
  );
}
