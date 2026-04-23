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
import { InfographicQuote } from "@/components/infographics/infographic-quote";
import { SITE } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { ArrowRight } from "lucide-react";

const POST = BLOG_POSTS.find((p) => p.slug === "neet-coaching-fees-in-jaipur-2026")!;

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
    question: "What are the fees for NEET coaching in Jaipur in 2026?",
    answer:
      "Jaipur NEET coaching fees in 2026 span ₹60,000 to ₹2,80,000 per year depending on tier. National brands (Allen, Aakash, Resonance) sit at ₹1,80,000-2,80,000 per year. Mid-tier local institutes are ₹90,000-1,60,000. Senior small-batch setups (including ProNEET) are ₹60,000-1,20,000, usually for Physics and Chemistry only. Dropper batches are typically 10-25 percent higher than the Class 11+12 regular track.",
  },
  {
    question: "Why are fees for ProNEET lower than Allen Jaipur if the founder teaches Physics himself?",
    answer:
      "Two reasons. First, scope. We teach Physics and Chemistry only, not four subjects. That cuts the fee roughly in half versus a full programme. Second, overheads. Allen Jaipur carries the cost of a national brand, multiple campuses, large ad spends, and a 200-person teaching staff. We run one classroom with two senior teachers. Different cost structure, different price. Neither is dishonest; they are different businesses.",
  },
  {
    question: "Do Jaipur NEET coaching fees include books, test series, and material?",
    answer:
      "At most institutes, yes, but not always at the full rate you would expect. Bundle fees typically cover class-produced study material and the in-house test series. Reference books (HC Verma for Physics, MTG for Biology, NCERT supplementary) are usually extra and cost ₹8,000-15,000 for a full two-year set. Premium national test series like Allen's All-India or Aakash's AIATS are sometimes sold separately at ₹8,000-20,000. Always ask for the total two-year fee in writing, including these add-ons.",
  },
  {
    question: "What hidden costs should I expect beyond the advertised NEET coaching fee?",
    answer:
      "Six line items that are rarely highlighted upfront. One: registration fee or caution deposit, typically ₹5,000-25,000, sometimes partially refundable. Two: books and printed material beyond in-house content, ₹8,000-15,000 over two years. Three: external national test series, ₹8,000-20,000. Four: scholarship test fee, ₹500-2,000 if applicable. Five: uniform or ID-card fees, a few thousand at most. Six: the swap fee if you change batch or centre mid-programme. Ask for every one of these in writing before you pay the first instalment.",
  },
  {
    question: "Can I pay NEET coaching fees in instalments or EMIs?",
    answer:
      "Yes, almost every institute in Jaipur offers this. Standard structures are quarterly or half-yearly. Some institutes have tied up with NBFC partners for zero-cost EMI on 12-month plans. The honest caution: EMI does not reduce the total fee and adds a small processing cost. Only use it if cash flow is the real constraint; otherwise a single-instalment discount of 3-8 percent is usually offered and worth asking for.",
  },
  {
    question: "Are NEET coaching fees in Jaipur refundable if my child drops out?",
    answer:
      "Partially, and read the contract carefully. The Supreme Court ruled in 2009 (Islamic Academy of Education v State of Karnataka) that coaching institutes cannot keep the full fee for unused months. Most Jaipur institutes now offer pro-rated refunds with a non-refundable component that ranges from ₹15,000 to ₹50,000 plus the cost of material already issued. Refunds past the first 3-6 months are often refused in practice even when the contract allows them. Get the refund terms in writing before you sign.",
  },
  {
    question: "Is the Allen scholarship test (ASAT) or similar worth taking for fee discounts?",
    answer:
      "For the strongest students, yes. A top-rank ASAT or Aakash ACST score can reduce full-programme fees by 20-75 percent, occasionally covering the entire fee for Class 11 entry. For the middle student who will score average on the scholarship test, the discount is usually 5-15 percent and is worth comparing against the discount you would get for a single-instalment upfront payment at a smaller institute. The scholarship test path works best if you are already targeting a mega-brand; if you were considering a small-batch setup anyway, it is not the deciding factor.",
  },
  {
    question: "Is there a difference in fees between offline classroom and hybrid/online NEET coaching in Jaipur?",
    answer:
      "Yes. Offline classroom is the premium tier. Fully online programmes from the same brand (Allen Digital, Aakash Live) sit at roughly 40-60 percent of the offline fee. Hybrid (live online class plus once-a-week offline contact) is priced in between. Offline is worth the premium for a Class 11 foundation; online works better for Class 12 revision or for a dropper who has already built strong self-study discipline. Most families benefit from offline for year one and can consider hybrid for year two if cost is a factor.",
  },
];

export default function NeetCoachingFeesPost() {
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
          "NEET coaching fees Jaipur 2026",
          "Allen Jaipur NEET fees",
          "Aakash Jaipur NEET fees",
          "NEET coaching cost Jaipur",
          "cheapest NEET coaching Jaipur",
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
            lastUpdated="April 23, 2026"
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
              NEET coaching fees in Jaipur span a wide band. The
              cheapest real programme starts near ₹60,000 per year.
              The most premium classroom programme at a national
              brand touches ₹2,80,000 per year. That is a 4.5x
              spread, and the spread is not random. It reflects
              batch size, faculty seniority, subject scope, brand
              overhead, and material depth. This guide unpacks the
              numbers so a parent can compare like with like instead
              of being surprised at invoice time.
            </p>
            <p>
              The numbers in this piece come from four sources:
              published fee schedules from Allen, Aakash, and
              Resonance as of Q1 2026, direct enquiry calls we made
              in March 2026, ProNEET&apos;s own fee structure, and
              parent conversations across 30+ families comparing
              offers this admission cycle.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mb-16">
          <KeyTakeaways
            bullets={[
              "Jaipur NEET coaching fees in 2026 span ₹60 K to ₹2.8 L per year. 4.5x spread, decided by batch size and scope.",
              "National brands (Allen, Aakash, Resonance) sit at ₹1.8-2.8 L/year for full NEET programme.",
              "Mid-tier local institutes run ₹90 K-1.6 L/year. Small-batch Physics+Chemistry specialists like ProNEET are ₹60 K-1.2 L/year.",
              "Hidden costs add ₹25 K-60 K over two years: material, test series, deposits, reference books.",
              "Scholarship test discounts (ASAT, ACST) can cut mega-brand fees 20-75 percent for top-1000 students.",
              "Refund policies exist but are often refused in practice past month six. Get terms in writing before paying.",
            ]}
          />
        </ScrollReveal>

        <div className="space-y-10 text-[17px] text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              What does a NEET coaching fee actually pay for in 2026?
            </h2>
            <p>
              Before comparing numbers, name what you are buying.
              The fee covers six things, and different institutes
              weight them differently.
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>
                <strong>Teaching hours</strong> — typically 20-26
                hours per week across all subjects in a two-year
                NEET programme.
              </li>
              <li>
                <strong>Faculty access</strong> — the quality of
                who teaches and how accessible they are for doubts
                outside class.
              </li>
              <li>
                <strong>Study material</strong> — institute-produced
                chapter books, DPPs (daily practice problems),
                revision sheets.
              </li>
              <li>
                <strong>In-house test series</strong> — weekly or
                biweekly tests on the current chapters, with rank
                feedback.
              </li>
              <li>
                <strong>Parent-update infrastructure</strong> — apps,
                phone calls, PTM sessions, test-result portals.
              </li>
              <li>
                <strong>Classroom overhead</strong> — AC, AV
                equipment, location, hostel referrals, admin support.
              </li>
            </ul>
            <p className="mt-5">
              A brand premium is mostly overhead and marketing, not
              teaching hours. A small-batch premium is mostly
              faculty access and batch-cap discipline. A cheap
              programme usually cuts faculty seniority first,
              classroom overhead second. Knowing where the money
              goes helps decide whether a fee is fair for your
              child&apos;s specific needs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              What are Allen Jaipur&apos;s NEET fees in 2026?
            </h2>
            <p>
              Allen Jaipur&apos;s Class 11+12 two-year NEET Enthuse
              and Leader programmes price out in the ₹1,80,000-
              2,80,000 per year band. Exact number depends on which
              course tier (foundation, core, Enthuse, Leader), the
              admission cycle timing (early-bird rates apply till
              around March), and the scholarship discount earned on
              the ASAT test.
            </p>
            <p className="mt-4">
              Dropper batches at Allen Jaipur run higher, typically
              ₹2,20,000-3,10,000 for the one-year intensive. You
              are paying for a denser schedule in half the time.
            </p>
            <p className="mt-4">
              What is included: all four subjects (Physics,
              Chemistry, Botany, Zoology), in-house material,
              full test series integrated with the Kota flagship,
              parent-portal access, AIATS integration. What is not
              included: reference books beyond the in-house set,
              external national test series if you want a second
              one, and hostel if the student is not local. Assume
              ₹25,000-40,000 in add-ons across two years.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              What are Aakash Mansarovar&apos;s fees, and how do they differ from Allen?
            </h2>
            <p>
              Aakash Mansarovar and Aakash Vaishali Nagar both price
              their flagship Medical Plus two-year programme in the
              ₹1,70,000-2,20,000 per year range in 2026. That is
              typically 5-15 percent below Allen Jaipur for a
              similar product. Aakash&apos;s scholarship test
              (ACST) offers discounts comparable to ASAT.
            </p>
            <p className="mt-4">
              The honest difference between Allen and Aakash in
              Jaipur is not the fee; it is the operating culture.
              Allen is a Kota-first brand with a Jaipur satellite.
              Aakash is a Delhi-first brand with a stronger Aakash
              Jaipur operation than most branches. Both teach NEET
              well. Aakash tends to run smaller batches than Allen
              in Jaipur, which affects daily class experience more
              than the 15 percent fee difference.
            </p>
          </section>

          <InfographicTable
            eyebrow="Jaipur 2026 pricing"
            heading="NEET coaching fees across Jaipur, tier by tier"
            columns={[
              { key: "tier", label: "Tier" },
              { key: "example", label: "Representative options" },
              { key: "batch", label: "Typical batch size" },
              { key: "fee", label: "Annual fee range" },
            ]}
            rows={[
              {
                tier: "National mega-brand classroom",
                example: "Allen Jaipur, Aakash (Mansarovar/Vaishali)",
                batch: "150-400",
                fee: "₹1.8 - 2.8 L",
              },
              {
                tier: "National brand, smaller format",
                example: "Resonance, PW Vidyapeeth Jaipur",
                batch: "80-200",
                fee: "₹1.4 - 2.1 L",
              },
              {
                tier: "Mid-tier local institute",
                example: "Career Point, Matrix, Utkarsh",
                batch: "60-150",
                fee: "₹90 K - 1.6 L",
              },
              {
                tier: "Small-batch specialist (2-3 subjects)",
                example: "ProNEET (Physics + Chemistry)",
                batch: "30",
                fee: "₹60 K - 1.2 L",
              },
              {
                tier: "Standalone 1:1 or micro-group tuition",
                example: "Private senior teachers, referral-only",
                batch: "1-6",
                fee: "₹1.4 - 2.8 L (hourly)",
              },
              {
                tier: "Online programmes, same national brand",
                example: "Allen Digital, Aakash Live, PW Online",
                batch: "Recorded + live",
                fee: "₹50 K - 1.3 L",
              },
              {
                tier: "Dropper intensive (one year)",
                example: "Allen/Aakash Dropper",
                batch: "120-300",
                fee: "₹2.2 - 3.1 L",
              },
            ]}
            footnote="Ranges reflect Q1 2026 Jaipur market observation, published institute fee schedules and direct enquiries in March 2026. Confirm current numbers at admissions."
          />

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              What are the hidden costs most parents discover after enrolment?
            </h2>
            <p>
              Six line items that cost families more than they
              expected, every single admission cycle.
            </p>
            <p className="mt-4">
              <strong>One: registration or caution deposit.</strong>
              Ranges from ₹5,000 at small institutes to ₹25,000 at
              national brands. Sometimes refundable at programme
              end, often not. Ask at the quote stage.
            </p>
            <p className="mt-4">
              <strong>Two: reference books beyond the in-house
              material.</strong> Most students buy HC Verma volumes 1
              and 2, at least one MTG Biology and Chemistry book,
              and the NCERT exemplar series. A full set across
              Class 11 and 12 is ₹8,000-15,000. Worth every rupee
              for a serious student.
            </p>
            <p className="mt-4">
              <strong>Three: external test series.</strong> AIATS,
              AIIMS-pattern series from Resonance or PW, or MTG
              online series run ₹8,000-20,000. Optional but often
              recommended in the last six months before NEET.
            </p>
            <p className="mt-4">
              <strong>Four: scholarship-test fee.</strong> Small
              (₹500-2,000) but comes up during applications. Worth
              paying because a good score is worth a substantial
              fee discount.
            </p>
            <p className="mt-4">
              <strong>Five: batch or centre switch.</strong> If
              during Class 12 you want to move from a large batch
              to a smaller one, or from one centre to another, some
              institutes charge a switch fee or require the
              programme to be re-joined at new-year pricing. Ask
              upfront.
            </p>
            <p className="mt-4">
              <strong>Six: &quot;separate&quot; weekend or crash
              programmes in Class 12.</strong> Some institutes up-sell
              additional revision bootcamps at ₹15,000-40,000 in
              the last four months of Class 12. These are
              optional; not joining them does not affect your main
              coaching. Push back if they are presented as
              compulsory.
            </p>
            <p className="mt-4">
              Sum across two years, a family at a mega-brand often
              spends ₹25,000-60,000 beyond the advertised fee,
              spread across these six line items. Build it into
              your budget from day one.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Why is ProNEET priced lower than Allen and Aakash?
            </h2>
            <p>
              Two honest reasons, said directly.
            </p>
            <p className="mt-4">
              <strong>One: scope.</strong> We teach Physics and
              Chemistry only. The standard NEET programme covers
              four subjects. When you halve the subject scope, you
              roughly halve the classroom hours and the faculty
              cost. Our full-year Physics + Chemistry programme at
              ₹60,000-1,20,000 is a smaller product than Allen&apos;s
              four-subject Enthuse at ₹1,80,000. Less subject
              coverage, proportionally less fee. Nothing mysterious.
            </p>
            <p className="mt-4">
              <strong>Two: overhead.</strong> Allen Jaipur runs a
              large operation. Multiple campuses, hundreds of
              teachers, national brand-building, print and digital
              advertising. Every student&apos;s fee carries a share
              of that overhead, which is how a premium institute
              funds itself. We run one classroom, two senior
              teachers, one admissions line. Different cost base,
              different price point. Both models are legitimate; we
              are just telling you where your money goes.
            </p>
            <p className="mt-4">
              What ProNEET is not: a cheaper version of Allen with
              the same product. Different product, different
              audience, different fee. If you want four subjects
              under one roof, a national-brand CV line, and the
              full mega-brand experience, Allen or Aakash is the
              right price for that experience. If you want the
              founder teaching Physics himself in a 30-seat batch
              for two specific subjects, our fee is the right price
              for that product.
            </p>
          </section>

          <InfographicQuote
            quote="The question is never what is the cheapest coaching. The question is what is the right fee for the specific product your child actually needs. A ₹2 lakh mega-brand seat that your child cannot thrive in is more expensive than a ₹90,000 small-batch seat that fits them. Total cost is outcome, not the invoice."
            attribution="Neeraj Gupta"
            role="Founder, ProNEET · Ex-Narayana, Bansal Classes, Excel Physics"
            image="/photos/neeraj-gupta.png"
            imageAlt="Neeraj Gupta, founder of ProNEET, Mansarovar Jaipur"
          />

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              When is a higher fee worth paying?
            </h2>
            <p>
              Three scenarios where a ₹2-2.8 L mega-brand fee is
              genuinely the right call.
            </p>
            <p className="mt-4">
              <strong>One: top-quartile student chasing top-100
              NEET or AIIMS.</strong> The depth of peer competition
              and test series at Allen or Aakash is structurally
              larger than at a small-batch institute. If your child
              is already scoring above 620 on mock NEETs by Class
              11 end, competing against 400 other strong students
              weekly is worth the fee premium.
            </p>
            <p className="mt-4">
              <strong>Two: family wants all four subjects and
              integrated material under one roof.</strong> Logistics
              matter in a two-year programme. Driving your child
              between three institutes for three subjects is a
              hidden daily cost that larger one-roof brands avoid.
            </p>
            <p className="mt-4">
              <strong>Three: dropper student who needs brand
              discipline.</strong> Some droppers specifically benefit
              from the structured rigour of a large institute
              running a dense dropper batch. The ₹2.5 L Dropper fee
              often has higher ROI than a smaller programme for
              this specific profile.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              When is a smaller fee at a small-batch institute the better decision?
            </h2>
            <p>
              Three scenarios where paying ₹90,000-1,20,000 at a
              small-batch setup beats a ₹2,00,000 mega-brand seat.
            </p>
            <p className="mt-4">
              <strong>One: Physics or Chemistry is the specific
              weak link.</strong> If your child is strong at Biology
              and Maths independently but weak at Physics, paying
              ₹2 L for a four-subject programme to address a
              Physics-only problem is inefficient. A Physics-focused
              small-batch setup solves the right problem at the
              right cost.
            </p>
            <p className="mt-4">
              <strong>Two: family budget is below ₹1.8 L per year
              and stretching would create stress.</strong> Two years
              of coaching at your ceiling plus mandatory
              supplements is worse than two years at a comfortable
              fee point. The last four months of Class 12 require
              flexibility (books, extra tests, possibly a revision
              bootcamp). Leaving ₹50,000-80,000 of headroom is a
              strategic choice, not a compromise.
            </p>
            <p className="mt-4">
              <strong>Three: student gets lost in a 300-seater.
              </strong> If Class 10 ended with your child in the
              back row of a big classroom without being seen,
              paying more for a bigger classroom will not fix the
              pattern. A 30-seat room at a smaller institute is
              structurally different and usually the cheaper-and-
              better answer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              How should a parent actually compare quotes from different institutes?
            </h2>
            <p>
              A one-page template that we give every family that
              asks. Put the three or four institutes you are
              seriously considering across columns. Across rows:
            </p>
            <ol className="mt-4 space-y-3 list-decimal pl-6">
              <li>
                <strong>Annual fee, written, all-in.</strong> No
                ambiguity. If the counsellor cannot give you one
                number on paper, that is a red flag.
              </li>
              <li>
                <strong>Subjects included.</strong> Physics,
                Chemistry, Biology, Maths, English. Sometimes the
                lower fee is covering fewer subjects.
              </li>
              <li>
                <strong>Batch size cap, committed in writing.
                </strong> A &quot;small batch&quot; verbal assurance
                means nothing. Ask for the written number.
              </li>
              <li>
                <strong>Core faculty names.</strong> Not &quot;our
                senior panel.&quot; Specific teacher names for each
                subject, and confirmation they will continue to
                Class 12.
              </li>
              <li>
                <strong>Material and test series included.</strong>
                In-house material, in-house tests, external tests
                (AIATS, etc.) — which are included, which cost
                extra.
              </li>
              <li>
                <strong>Hidden costs.</strong> Registration, books,
                switches, scholarship test. Force the line items to
                be named.
              </li>
              <li>
                <strong>Refund policy.</strong> Month-by-month
                breakdown of what is refundable and when. Read
                before signing.
              </li>
              <li>
                <strong>Two-year total.</strong> Fee x 2 plus
                expected hidden costs. This is the number to
                compare across institutes, not the annual quote.
              </li>
            </ol>
            <p className="mt-4">
              Most families are surprised by how often the cheapest-
              looking quote ends up in the middle of the pack once
              the two-year total is written out, and how often a
              mid-price small-batch setup is genuinely the lowest
              total cost.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Can we see ProNEET&apos;s exact fee structure before enrolling?
            </h2>
            <p>
              Yes. We do not publish a single number because the
              fee depends on subjects (Physics only, Chemistry only,
              or both), programme length (Class 11 entry, Class 12
              entry, dropper), and instalment vs upfront. Call our
              admissions line and we will send the exact written
              quote for your child&apos;s specific case, all-in,
              on one page. Call{" "}
              <a
                href={`tel:${SITE.phone}`}
                className="text-brand font-medium underline underline-offset-2"
              >
                {SITE.phoneDisplay}
              </a>
              {" "}for the written fee sheet. No sales pressure; if
              we are not a fit, the sheet will help you compare
              better with whoever is.
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
                    Full market breakdown, parent regrets
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-brand group-hover:translate-x-1 transition" />
              </Link>
              <Link
                href="/blog/proneet-vs-allen-jaipur"
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 group hover:shadow-tier-sm transition"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    ProNEET vs Allen Jaipur
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Side-by-side cost and scope comparison
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-brand group-hover:translate-x-1 transition" />
              </Link>
              <Link
                href="/blog/jaipur-vs-kota-vs-sikar-neet"
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 group hover:shadow-tier-sm transition"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Jaipur vs Kota vs Sikar
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    City decision, total two-year cost compared
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
                    Ask for a written fee sheet
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    One-page quote for your specific case
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
          eyebrow="NEET FEES JAIPUR 2026 · FAQ"
          heading="Fee questions parents ask most often"
          items={FAQS}
        />
      </div>
    </main>
  );
}
