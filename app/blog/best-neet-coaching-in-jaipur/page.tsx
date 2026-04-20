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
import { InfographicStats } from "@/components/infographics/infographic-stats";
import { InfographicQuote } from "@/components/infographics/infographic-quote";
import { SITE } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const POST = BLOG_POSTS.find((p) => p.slug === "best-neet-coaching-in-jaipur")!;

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

const CHECKS = [
  {
    n: 1,
    title: "Who, by name, will teach the live class?",
    body: "Ignore the website headshots. Ask which named teacher will run your child's actual Class 11 batch on a normal Tuesday, and whether the same person continues through Class 12. Get it in writing. The most common regret we hear from transfers is enrolling based on a senior name that never taught the live batch.",
  },
  {
    n: 2,
    title: "What is the real batch size cap?",
    body: "Two numbers matter: the advertised cap, and what the actual enrolled count in last year's batch was. Ask both. A 30-seat advertised cap that quietly ran 70 students last year is effectively a 70-seat batch. Request photos or an attendance snapshot from the current batch before you decide.",
  },
  {
    n: 3,
    title: "Can I have the full fee in writing, including every add-on?",
    body: "Classroom fee is rarely the total. Ask for a single-page breakdown that includes: tuition, printed material, test-series, registration, any 'miscellaneous', any 'scholarship' adjustment. If the counsellor resists putting it all in one sheet, that is your answer.",
  },
  {
    n: 4,
    title: "Is the demo class a real class, or a pitch?",
    body: "Good coaching centres let you attend a real teaching day. Counsellor-office 'demos' with a polished 20-minute lecture are sales pitches. You want to see how the teacher handles a student who asks a basic question, how chaotic the room gets, and whether the teacher tracks disengagement.",
  },
  {
    n: 5,
    title: "If my child is Hindi-medium, what does a class actually sound like?",
    body: "Many Jaipur coachings advertise bilingual delivery and run English-only lectures with a Hindi handout. Ask the teacher, in the demo, to explain a concept in Hindi unprompted. If they cannot switch naturally, the brochure was misleading. A genuine Hindi-medium teacher will switch mid-sentence when a concept demands it.",
  },
  {
    n: 6,
    title: "How, and how often, will you update me as a parent?",
    body: "App notifications no one reads are not parent updates. Ask specifically: how often do I hear from a human? What exactly will they tell me? A centre that commits to a fortnightly phone call or written note is a centre that expects accountability. A centre that says 'you can check the app anytime' is asking you to do their work.",
  },
  {
    n: 7,
    title: "What happens if this does not work out?",
    body: "Ask about the exit policy upfront. Can you withdraw after Month 2 if the batch is wrong for your child? What portion of fees is refundable, and in what window? A centre that answers this honestly respects your family's decision. A centre that pretends the question is rude is one you cannot exit cleanly from, and you will not know until you need to.",
  },
];

const FAQS = [
  {
    question: "What is objectively the best NEET coaching in Jaipur?",
    answer:
      "There is no single objectively best answer, and any centre that claims the title is making an unverifiable claim. Best for a Class 11 student who already finds Physics intuitive looks different from best for a dropper rebuilding from a first failed attempt. What this checklist tries to do is give you the parent-facing variables that consistently separate better-fit choices from worse-fit ones.",
  },
  {
    question: "How important are selection numbers (NEET ranks) when choosing a coaching?",
    answer:
      "Less than the marketing makes them look. Selection count only tells you the coaching attracts top performers. It does not tell you what happens to an average student in the middle of the batch. The better question is: what percentage of enrolled students clear the exam? Coachings rarely publish that number because it is not flattering. Ask it anyway.",
  },
  {
    question: "What's the cheapest way to get quality NEET coaching in Jaipur?",
    answer:
      "Small-batch setups (30-60 seats) run by a senior teacher, with fees in the ₹60,000-1 lakh per year range. The trade-off is a thinner peer pool and sometimes narrower subject coverage. If a student is self-motivated and the teacher is strong, this tier often delivers better outcomes than mid-tier branded options at twice the cost.",
  },
  {
    question: "Does Allen or Aakash Jaipur count as 'best' by default?",
    answer:
      "The brand reliability is real, but the Jaipur branches are satellite campuses of the Sikar and Kota flagships. The senior teachers on the advertising rarely teach the live Jaipur class. Whether that is a problem depends entirely on the junior faculty delivering the actual lessons. Visit the class. Do not let the brand do the work for you.",
  },
  {
    question: "Should I pick NEET coaching based on selection rate or batch size?",
    answer:
      "If you have to choose: batch size. A senior teacher with a 30-seat batch can engineer a better result for your specific child than a brand with a 2% selection rate can. Selection rate is a function of who the brand attracts. Batch size is a function of whether your child can be seen once they are enrolled.",
  },
];

export default function BestNeetCoachingJaipurPost() {
  return (
    <main className="pt-24 pb-20 bg-white">
      <ScrollTracker slug={POST.slug} pageCategory="guide" />
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
          "best NEET coaching in Jaipur",
          "NEET coaching Jaipur",
          "how to choose NEET coaching",
          "NEET coaching checklist",
          "Mansarovar NEET coaching",
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
              {POST.category} · 7-point checklist
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
              &quot;Best NEET coaching in Jaipur&quot; is what every
              Jaipur institute calls itself on the billboard. It is also
              one of the highest-volume searches that parents of Class 10
              students actually type (roughly 320 searches a month in
              India; SEMRush Keyword Magic Tool, 2026). The problem is the
              word &quot;best&quot; does almost no work. Best for whom, on
              what axis, against what alternatives?
            </p>
            <p>
              This is a 7-point checklist a parent can take to any Jaipur
              NEET coaching visit. It is built from 20+ years of teaching
              Physics across Bansal Classes, Narayana, and Excel Physics,
              and from the conversations we have had with the hundred-plus
              parents who transferred their kids into our batch after a
              first coaching did not work. If you want the full landscape
              read first, go to the{" "}
              <Link
                href="/blog/neet-coaching-in-jaipur"
                className="text-brand font-medium underline underline-offset-2"
              >
                parent&apos;s guide to NEET coaching in Jaipur
              </Link>
              . Otherwise, the seven checks are below.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mb-16">
          <KeyTakeaways
            bullets={[
              "The word 'best' does no work on its own. Seven concrete checks separate a fit from a mis-fit in any Jaipur NEET centre.",
              "The single highest-leverage question is who, by name, will teach the live batch. Get it in writing.",
              "Advertised batch size and actual last-year enrolled count are often very different. Ask both.",
              "A real demo class, not a sales-office pitch, is the only way to see how a teacher handles a real student.",
              "A centre that resists putting the full fee (including every add-on) on one page is a centre you will not exit cleanly from.",
              "Selection rate (percentage of enrolled students who clear) beats selection count (absolute number) as a quality signal.",
            ]}
          />
        </ScrollReveal>

        <InfographicStats
          eyebrow="The decision in four numbers"
          heading="What a 'best-fit' shortlist looks like"
          values={[
            {
              value: "3",
              label: "Centres to visit",
              sublabel: "Across at least two tiers",
            },
            {
              value: "7",
              label: "Questions to ask",
              sublabel: "The checklist below",
            },
            {
              value: "20",
              label: "Minutes per demo",
              sublabel: "Real class, not counsellor pitch",
            },
            {
              value: "2",
              label: "Weekends",
              sublabel: "Full process, end to end",
            },
          ]}
        />

        <div className="space-y-12">
          {CHECKS.map((check) => (
            <section key={check.n} className="relative">
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
                  <span className="font-mono font-bold text-brand text-sm">
                    0{check.n}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {check.title}
                  </h2>
                  <p className="mt-3 text-[17px] text-slate-700 leading-relaxed">
                    {check.body}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>

        <ScrollReveal className="mt-16">
          <div className="rounded-2xl border border-brand/15 bg-brand/[0.04] p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-accent-orange mb-4">
              The 20-minute version
            </p>
            <ul className="space-y-3">
              {CHECKS.map((check) => (
                <li key={`summary-${check.n}`} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
                  <span className="text-sm text-slate-700 leading-relaxed">
                    {check.title}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-slate-600">
              Print this, take it to three Jaipur centres, and pick the
              one that answered all seven cleanly. That is the working
              definition of &quot;best&quot; for your specific family.
            </p>
          </div>
        </ScrollReveal>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            What does this look like applied to ProNEET?
          </h2>
          <p className="text-[17px] text-slate-700 leading-relaxed">
            Because a checklist is useless if the writer cannot answer it
            about their own setup:
          </p>
          <ol className="mt-5 space-y-3 list-decimal pl-6 text-[17px] text-slate-700 leading-relaxed">
            <li>
              <strong>Who teaches:</strong> Neeraj Gupta for Physics, Vivek
              Patidar for Chemistry. Same teachers across Class 11 and
              Class 12, in writing.
            </li>
            <li>
              <strong>Batch size:</strong> 30-seat cap, real. Last
              year&apos;s batch enrolled 28.
            </li>
            <li>
              <strong>Fees in writing:</strong> Yes, in a single sheet
              on the first admissions call. No hidden material or test-
              series add-ons.
            </li>
            <li>
              <strong>Real demo class:</strong> Yes. You attend a live
              teaching day, not a pitch.
            </li>
            <li>
              <strong>Hindi medium:</strong> Yes. Both teachers switch
              mid-class as the concept requires. Ask them in the demo.
            </li>
            <li>
              <strong>Parent updates:</strong> Fortnightly phone call or
              written note. No app-only updates.
            </li>
            <li>
              <strong>Exit policy:</strong> Month-2 withdrawal returns
              most of the pro-rated fee. Stated at admission, written.
            </li>
          </ol>
          <p className="mt-5 text-[17px] text-slate-700 leading-relaxed">
            We are not the right fit for everyone. We do not teach
            Biology (students pair us with their own Biology coaching).
            Our peer pool is smaller than Allen&apos;s Jaipur branch. If
            those are deal-breakers for your family, one of the mid-tier
            locals is a better call.{" "}
            <Link
              href="/programs"
              className="text-brand font-medium underline underline-offset-2"
            >
              See the programmes
            </Link>
            , or call the admissions line on{" "}
            <a
              href={`tel:${SITE.phone}`}
              className="text-brand font-medium underline underline-offset-2"
            >
              {SITE.phoneDisplay}
            </a>
            {" "}and we will tell you directly whether we are.
          </p>
        </section>

        <InfographicQuote
          quote="The brand is what sold you the brochure. The teacher is what teaches your child for 24 months. Insist on knowing, by name, who teaches the live batch before you pay."
          attribution="Neeraj Gupta"
          role="Founder, ProNEET · 20+ years teaching Physics"
          image="/photos/neeraj-gupta.png"
          imageAlt="Neeraj Gupta, founder of ProNEET, Mansarovar Jaipur"
        />

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
                    NEET coaching in Jaipur: the full guide
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Market breakdown, fees, Kota vs Jaipur, parent regrets
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-brand group-hover:translate-x-1 transition" />
              </Link>
              <Link
                href="/locations/mansarovar"
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 group hover:shadow-tier-sm transition"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Visit our Mansarovar classroom
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Location, parking, how to book a demo
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
          eyebrow="BEST NEET COACHING JAIPUR · FAQ"
          heading="What parents ask after reading the checklist"
          items={FAQS}
        />
      </div>
    </main>
  );
}
