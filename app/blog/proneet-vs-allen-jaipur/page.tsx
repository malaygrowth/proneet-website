import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PageByline } from "@/components/ui/page-byline";
import { KeyTakeaways } from "@/components/ui/key-takeaways";
import { PageFaq } from "@/components/sections/page-faq";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/json-ld";
import { ScrollTracker } from "@/components/analytics/scroll-tracker";
import { InfographicTable } from "@/components/infographics/infographic-table";
import { InfographicCompare } from "@/components/infographics/infographic-compare";
import { InfographicQuote } from "@/components/infographics/infographic-quote";
import { SITE } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { ArrowRight } from "lucide-react";

const POST = BLOG_POSTS.find((p) => p.slug === "proneet-vs-allen-jaipur")!;

export const metadata: Metadata = {
  title: POST.title,
  description: POST.description,
  alternates: { canonical: `/blog/${POST.slug}` },
  openGraph: {
    title: POST.title,
    description: POST.description,
    type: "article",
    url: `${SITE.url}/blog/${POST.slug}`,
    publishedTime: POST.publishDate,
    modifiedTime: POST.lastUpdated,
    authors: [POST.author],
  },
};

const FAQS = [
  {
    question: "What are Allen Jaipur's NEET coaching fees in 2026?",
    answer:
      "Allen Jaipur's classroom NEET fees sit in the ₹1.8-2.8 lakh per year range for a two-year Class 11 + 12 programme, depending on the specific batch (foundation, core, or NEET-focused). Dropper batches are higher. These are 2026 Q1 published ranges; call Allen Jaipur admissions for exact current fees. ProNEET's two-year Physics + Chemistry programme sits at ₹60,000-1 lakh per year, reflecting a different scope and batch size.",
  },
  {
    question: "Is Allen Jaipur actually Allen, or a franchise/satellite?",
    answer:
      "Allen Jaipur is a satellite branch of Allen's flagship Kota and Sikar campuses. The senior faculty whose names appear on Allen's national marketing (the Nitin Vijay tier) record videos at the flagship and do occasional masterclasses. Day-to-day live teaching in the Jaipur branch is handled by Allen's Jaipur faculty, which is a different set of teachers, some excellent, some junior. The brand quality is real; the specific live-teacher question is worth asking at admissions.",
  },
  {
    question: "How many students are in an Allen Jaipur NEET batch?",
    answer:
      "Allen Jaipur batches typically run 150-400 students per classroom depending on the tier and intake season. Their economics require that scale. ProNEET caps every batch at 30 and enrolled 28 in the last intake. This is the single biggest structural difference between the two options.",
  },
  {
    question: "Does Allen provide better study material than ProNEET?",
    answer:
      "Allen has superb centralised study material, produced at the Kota flagship and distributed to all branches. ProNEET produces its own chapter-wise material for Physics and Chemistry, plus uses standard reference books for revision. For a self-directed student who can handle a higher material volume, Allen's material depth is genuinely an advantage. For students who need to actually finish what is given to them, ProNEET's focused material set is better fit. Both approaches work; they suit different students.",
  },
  {
    question: "Which is better for JEE specifically, Allen Jaipur or ProNEET?",
    answer:
      "For JEE, Allen's overall brand and flagship depth is stronger than ProNEET's, especially for JEE Advanced. Allen Jaipur runs a dedicated JEE programme; ProNEET's JEE scope is Physics + Chemistry only (students pair Maths separately). If your child is a clear top-quartile JEE Advanced candidate and the family is fine with a 150-400 seat batch, Allen Jaipur is the more conventional call. If you want the founder personally teaching Physics in a 30-seat room, ProNEET is the alternative.",
  },
  {
    question: "Can I visit both Allen Jaipur and ProNEET before deciding?",
    answer:
      "Yes, and we recommend it strongly. Both institutes offer demo classes. Attend both with the same specific questions: who teaches the live batch my child would be in, what's the real batch size cap, what's the full fee written on one page. Compare the answers side by side. Either answer can be the right fit for your family; the wrong move is to enrol without seeing both.",
  },
  {
    question: "What happens if I enrol in Allen Jaipur and want to switch mid-year?",
    answer:
      "Allen's refund policies are documented but typically prorated with a non-refundable component. Students switching mid-year to ProNEET are accepted after a diagnostic call and an honest conversation about where the previous coaching fell short. We have run this transfer process for roughly 15-20 students in the last three years; about half switched for batch-size reasons, the rest for faculty-attention reasons.",
  },
  {
    question: "Is Allen Jaipur's NEET selection rate higher than ProNEET's?",
    answer:
      "Allen reports high aggregate selection numbers across all branches. The specific Jaipur branch's contribution is not separately published; it is included in the all-India total. ProNEET has taught 1000+ students who cleared NEET, AIIMS, IIT or NIT since 2003, with a specific focus on Physics. Both claims are true at the scales they operate at. The comparison parents should care about is: what percentage of students enrolled in YOUR specific batch cleared last year? Both of us owe you that answer at admission.",
  },
];

export default function ProNeetVsAllenPost() {
  return (
    <main className="pt-24 pb-20 bg-white">
      <ScrollTracker slug={POST.slug} pageCategory="comparison" />
      <ArticleJsonLd
        headline={POST.title}
        description={POST.description}
        url={`${SITE.url}/blog/${POST.slug}`}
        image={`${SITE.url}${POST.featuredImage}`}
        datePublished={POST.publishDate}
        dateModified={POST.lastUpdated}
        author={POST.author}
        authorRole={POST.authorRole}
        keywords={[
          "Allen coaching Jaipur NEET fees",
          "ProNEET vs Allen",
          "Allen Jaipur review",
          "Allen vs small-batch NEET coaching",
          "Aakash NEET coaching Jaipur",
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.url },
          { name: "Blog", url: `${SITE.url}/blog` },
          { name: POST.title, url: `${SITE.url}/blog/${POST.slug}` },
        ]}
      />

      <article className="max-w-3xl mx-auto px-6 lg:px-10">
        <ScrollReveal className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 text-xs font-mono">
            <span className="text-accent-orange uppercase tracking-widest">
              {POST.category}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-400">{POST.readingTime}</span>
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            {POST.title}
          </h1>
          <PageByline
            author={POST.author}
            authorRole={POST.authorRole}
            lastUpdated="April 20, 2026"
          />
        </ScrollReveal>

        <ScrollReveal className="mb-12">
          <figure className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-tier-md">
            <Image
              src={POST.featuredImage}
              alt={POST.featuredImageAlt}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
              priority
            />
          </figure>
        </ScrollReveal>

        <ScrollReveal className="mb-12">
          <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
            <p>
              This is a founder-written comparison. It is not neutral
              and it does not pretend to be. I (Neeraj Gupta) taught
              at Narayana for a decade, overlapped with several Allen
              teachers over the years, and have enormous respect for
              what Allen has built in Kota, Sikar, and now Jaipur.
              This piece is for a Jaipur parent trying to decide
              between them and us, and wanting a specific, honest
              read instead of marketing.
            </p>
            <p>
              Short answer: Allen Jaipur and ProNEET are different
              products built for different students. The right choice
              depends on your child and your family&apos;s
              constraints, not on brand ranking. If you finish this
              guide and still think Allen is the better fit, that is
              a fine outcome. The honest read is that for some
              students, it genuinely is.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mb-16">
          <KeyTakeaways
            bullets={[
              "Allen Jaipur is a satellite of the Kota/Sikar flagships. ProNEET is a founder-led small-batch setup in Mansarovar Sector 8. Different products, not competing tiers.",
              "Allen Jaipur batches: 150-400 students per classroom. ProNEET batches: capped at 30. Single biggest structural difference.",
              "Allen Jaipur fees: ₹1.8-2.8 L/year for NEET. ProNEET fees: ₹60 K-1 L/year for Physics + Chemistry. Reflects different scope.",
              "Allen's material library is deeper than ours. ProNEET's teacher attention per student is deeper than Allen's. Pick the trade-off you need.",
              "For top-quartile JEE Advanced aspirants with a high peer-competition preference, Allen Jaipur is often the more conventional call.",
              "For families who specifically want the founder teaching Physics with same-teacher continuity across 24 months, ProNEET is the alternative.",
            ]}
          />
        </ScrollReveal>

        <div className="space-y-10 text-[17px] text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Who is Allen Jaipur actually for?
            </h2>
            <p>
              Allen Career Institute is India&apos;s largest NEET and
              JEE coaching brand, with its flagship in Kota and a
              second strong base in Sikar. Allen Jaipur opened as a
              satellite branch to capture Rajasthan students who wanted
              the Allen name without leaving home.
            </p>
            <p className="mt-4">
              Allen Jaipur works well for a specific kind of student:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>
                A self-directed student who can handle a 150-400
                seater without getting lost in the crowd
              </li>
              <li>
                A student who thrives on heavy peer competition and
                wants the biggest possible reference pool
              </li>
              <li>
                A student who will use Allen&apos;s vast material library
                rather than being overwhelmed by its volume
              </li>
              <li>
                A family that prefers national-brand reliability and
                brand-name collateral on the CV
              </li>
              <li>
                A JEE Advanced aspirant who wants Kota-level material
                flowing through a Jaipur-based live class
              </li>
            </ul>
            <p className="mt-5">
              If three or more of those describe your child, Allen
              Jaipur is a strong option. We are not going to pretend
              otherwise.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Who is ProNEET actually for?
            </h2>
            <p>
              ProNEET works well for a different kind of student:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>
                A student who does their best work when a specific
                teacher knows their name, knows their weak chapter,
                and asks about it
              </li>
              <li>
                A student whose Class 9-10 Physics foundation is weak
                and needs careful rebuilding, not high-volume drill
              </li>
              <li>
                A family that wants one teacher per subject across
                Class 11 and 12, with no panel rotation
              </li>
              <li>
                A student who is Hindi or English medium and needs
                the teacher to switch languages mid-class
              </li>
              <li>
                A family already happy with their Biology or Maths
                coaching elsewhere, who just wants strong senior
                faculty for Physics and Chemistry
              </li>
            </ul>
            <p className="mt-5">
              Same test: three or more match, we are worth visiting.
              Fewer, we are probably not the right call for your child.
            </p>
          </section>

          <InfographicTable
            eyebrow="Side by side"
            heading="Allen Jaipur vs ProNEET on the axes parents actually compare"
            columns={[
              { key: "dim", label: "Dimension" },
              { key: "allen", label: "Allen Jaipur" },
              { key: "proneet", label: "ProNEET" },
            ]}
            rows={[
              {
                dim: "Batch size",
                allen: "150-400 per class",
                proneet: "30-seat cap",
              },
              {
                dim: "Core faculty",
                allen: "Local Jaipur team + occasional flagship visits",
                proneet: "Neeraj Gupta (Physics, 20+ yrs), Vivek Patidar (Chemistry)",
              },
              {
                dim: "Same teacher Class 11 + 12",
                allen: "Often rotates by year/batch",
                proneet: "Same senior, same face, same room",
              },
              {
                dim: "Subjects taught",
                allen: "Physics, Chemistry, Biology (NEET) / Maths (JEE)",
                proneet: "Physics + Chemistry only",
              },
              {
                dim: "Fees (2-year, per year)",
                allen: "₹1.8 – 2.8 L",
                proneet: "₹60 K – 1 L",
              },
              {
                dim: "Material library",
                allen: "Very deep, Kota-produced",
                proneet: "Focused, in-house, supplemented by reference books",
              },
              {
                dim: "Test series",
                allen: "Integrated, national benchmarking",
                proneet: "In-house + recommend a paid national series",
              },
              {
                dim: "Peer pool depth",
                allen: "Very high",
                proneet: "Smaller, tighter, known to each other",
              },
              {
                dim: "Parent update cadence",
                allen: "App-based, per-test",
                proneet: "Fortnightly call or written note",
              },
            ]}
            footnote="Ranges reflect 2026 Q1 Jaipur market observation. Call either institute directly for current numbers."
          />

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              When is Allen Jaipur genuinely the right call?
            </h2>
            <p>
              Four specific cases where we would send a student to
              Allen Jaipur instead of trying to convince them to join
              us:
            </p>
            <p className="mt-4">
              <strong>One: clear JEE Advanced + AIIMS top-500 AIR
              trajectory.</strong> If your child is already in the
              top-quartile of NEET aspirants by Class 11 end and
              aiming specifically for a top-50 medical college or a
              top-10 IIT, the peer pool depth Allen offers is a real
              advantage over our smaller batch. Compete with the best
              to beat the best.
            </p>
            <p className="mt-4">
              <strong>Two: needs four subjects under one roof.</strong>
              We teach Physics and Chemistry. A family that wants
              Biology and either Maths or an integrated subject
              experience under one institute should pick Allen. The
              logistics matter and we are honest about our scope.
            </p>
            <p className="mt-4">
              <strong>Three: thrives on competitive pressure.</strong>
              Some students actually do better in a 200-seater than a
              30-seater. They rank themselves weekly, enjoy being
              surrounded by high performers, and use the competition
              as fuel. For that student, Allen&apos;s environment is
              structurally better than ours.
            </p>
            <p className="mt-4">
              <strong>Four: family needs national-brand CV
              signalling.</strong> Some families, for their own reasons,
              value having an Allen or Aakash name on the coaching
              transcript. That is a legitimate preference. We are not
              a brand-signalling choice and never will be.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              When is ProNEET genuinely the right call?
            </h2>
            <p>
              Three cases where we would push back on a family who was
              about to pick Allen Jaipur:
            </p>
            <p className="mt-4">
              <strong>One: your child was in the bottom third of a
              large batch in a previous year.</strong> If Class 10 or
              a previous coaching attempt ended with your child quiet
              in the back row of a big classroom, adding them to a
              150-400 seater will reproduce the pattern. Our 30-seat
              room is specifically designed to prevent the silent-
              disengagement failure mode.
            </p>
            <p className="mt-4">
              <strong>Two: Physics is the specific weakness.</strong>
              If the gap between your child and a strong NEET score
              is primarily a Physics gap, and your child needs a
              patient, experienced teacher to rebuild rather than a
              high-volume drill, Neeraj Gupta personally teaching
              every Physics class is a different product from a
              Jaipur-branch live class with a local faculty member.
            </p>
            <p className="mt-4">
              <strong>Three: Hindi-medium as a priority.</strong>
              Allen&apos;s Jaipur branch runs primarily English-medium
              delivery with Hindi explanation in the larger classes.
              A student whose mental language is Hindi, who needs the
              teacher to switch mid-concept, will find our room more
              natural. We teach in whichever language the concept
              needs.
            </p>
          </section>

          <InfographicCompare
            eyebrow="The trade-off, bluntly"
            heading="Pick what matters more for your child"
            left={{
              title: "Allen Jaipur",
              subtitle: "Mega-brand",
              stat: "150-400",
              statLabel: "students per class",
              bullets: [
                "Widest peer competition pool in Jaipur",
                "Deepest study material library",
                "National-brand reliability",
                "Multi-subject coverage under one roof",
              ],
              verdict: "Engineered for top-quartile, self-directed students",
            }}
            right={{
              title: "ProNEET",
              subtitle: "Small-batch",
              stat: "30",
              statLabel: "students per class",
              bullets: [
                "Founder teaches Physics himself, every class",
                "Same teacher across Class 11 and Class 12",
                "Hindi or English medium switched mid-class",
                "Fortnightly parent call, not app notifications",
              ],
              verdict: "Engineered for students who need to be seen by name",
            }}
            footnote="If you are unsure which applies, attend a real live class at both. The answer becomes obvious in one day."
          />

          <InfographicQuote
            quote="Allen built something genuinely great in Kota. We are not competing with that scale and do not want to. We built something different: a room small enough that every student is seen. Both are valid answers. The right one depends on your child, not on our brochure."
            attribution="Neeraj Gupta"
            role="Founder, ProNEET · Ex-Narayana, Bansal Classes, Excel Physics"
            image="/photos/neeraj-gupta.png"
            imageAlt="Neeraj Gupta, founder of ProNEET, Mansarovar Jaipur"
          />

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              How should a Jaipur parent actually decide?
            </h2>
            <p>
              A three-step process that takes one weekend:
            </p>
            <ol className="mt-4 space-y-3 list-decimal pl-6">
              <li>
                <strong>Visit Allen Jaipur for a real demo.</strong>
                Not a counsellor meeting. A live class with the actual
                faculty who would teach your child&apos;s batch. Ask
                for the teacher&apos;s name in writing and note the
                batch size.
              </li>
              <li>
                <strong>Visit ProNEET&apos;s Mansarovar classroom.</strong>
                Same rules. Neeraj sir teaches the Physics demo
                himself; Vivek sir teaches Chemistry. Ask any question.
                You will walk out knowing exactly what daily teaching
                looks like.
              </li>
              <li>
                <strong>Put the two comparisons on one sheet.</strong>
                Teacher name, batch size, fee, weekly rhythm, language
                medium, parent-update cadence. Pick based on which
                profile fits your child&apos;s next 24 months.
              </li>
            </ol>
            <p className="mt-4">
              If after both visits you pick Allen Jaipur, we wish you
              (and we mean this) a successful two years. If you pick
              ProNEET, we will tell you exactly what the first month
              looks like and what we expect from you as a family. Call{" "}
              <a
                href={`tel:${SITE.phone}`}
                className="text-brand font-medium underline underline-offset-2"
              >
                {SITE.phoneDisplay}
              </a>
              {" "}to schedule the demo.
            </p>
          </section>
        </div>

        <ScrollReveal className="mt-16">
          <div className="rounded-xl border border-slate-100 bg-surface-secondary p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-accent-orange mb-4">
              Keep reading
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/blog/neet-coaching-in-jaipur"
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 group hover:shadow-tier-sm transition"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    NEET coaching in Jaipur: full guide
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Full market breakdown, fees, parent regrets
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-brand group-hover:translate-x-1 transition" />
              </Link>
              <Link
                href="/blog/best-neet-coaching-in-jaipur"
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 group hover:shadow-tier-sm transition"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Best NEET coaching checklist
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    7-point parent checklist, applies to any coaching
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
                    Meet the ProNEET faculty
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Neeraj Gupta (Physics), Vivek Patidar (Chemistry)
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-brand group-hover:translate-x-1 transition" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 group hover:shadow-tier-sm transition"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Book a demo at Mansarovar
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Then compare against your Allen Jaipur demo
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-brand group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </article>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 mt-8">
        <PageFaq
          eyebrow="PRONEET VS ALLEN JAIPUR · FAQ"
          heading="Specific comparison questions parents ask"
          items={FAQS}
        />
      </div>
    </main>
  );
}
