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
import { InfographicCompare } from "@/components/infographics/infographic-compare";
import { InfographicTable } from "@/components/infographics/infographic-table";
import { InfographicQuote } from "@/components/infographics/infographic-quote";
import { SITE } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { ArrowRight } from "lucide-react";

const POST = BLOG_POSTS.find((p) => p.slug === "neet-coaching-in-jaipur")!;

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
    question: "How many NEET coaching centres are there in Jaipur?",
    answer:
      "Roughly 40 coaching centres actively advertise NEET programmes in Jaipur at any given time. Three of those are national brand branches (Allen, Aakash, Resonance). Eight to ten are local mid-tier institutes (Parmar, Convex, Foundation, Tomer, Vibrant, Vardhmaan and similar). The rest are small-batch setups with 20 to 60 seats per teacher. Most parents only seriously consider 4 to 6 during an enrolment decision.",
  },
  {
    question: "What does NEET coaching in Jaipur actually cost?",
    answer:
      "Two-year classroom fees in Jaipur sit in three clear bands. National brands charge ₹1.6 lakh to ₹2.8 lakh per year. Established local mid-tier institutes charge ₹80,000 to ₹1.4 lakh per year. Small-batch setups (including ProNEET) charge ₹60,000 to ₹1 lakh per year. Dropper batches run 20 to 40 percent higher. EMI options are near universal. These are 2026 ranges; call any institute directly for the current number.",
  },
  {
    question: "Which coaching is best for NEET in Jaipur?",
    answer:
      "There is no single answer. Best for a bright self-starter who needs discipline and peer competition is different from best for a Class 11 student who already doubts Physics. What matters more than the brand is the teacher-to-student ratio, whether the same senior teacher stays with you for 24 months, and whether the batch is actually at your current level. Book three demo classes across three different setup sizes before signing anything.",
  },
  {
    question: "Is Jaipur better than Kota or Sikar for NEET preparation?",
    answer:
      "It depends on the student. Kota has deeper infrastructure, wider peer competition, and the highest aggregate selection numbers, but it also has the highest dropout and burnout rate of any NEET hub in India. Sikar is cheaper than Kota, smaller, and has been rising fast on selection counts. Jaipur gives you small-batch options and a normal home life (most Jaipur students stay with parents). Families that prioritise stability usually pick Jaipur; families that prioritise sheer intensity usually pick Kota or Sikar.",
  },
  {
    question: "Can a Hindi-medium student crack NEET from Jaipur?",
    answer:
      "Yes. NEET itself is bilingual. Several Jaipur coaching centres, including ProNEET, teach in Hindi or English and switch mid-class based on the concept. What hurts Hindi-medium students is not the exam, it is coaching centres that pretend to offer Hindi medium but run English-only lectures. Ask the teacher, in the demo class, to explain a concept in Hindi. If they cannot switch naturally, the brochure was misleading.",
  },
  {
    question: "How do I evaluate a NEET coaching in a demo class?",
    answer:
      "Watch four things. One, does the teacher actually know their subject cold, or do they read from notes? Two, do they notice the student at the back who stopped taking notes? Three, when a student asks a basic question, is the answer patient and real, or a dismissal? Four, at the end of the class, can the teacher tell you which chapter each student is weakest in? Teachers who cannot do the fourth one have too many students.",
  },
  {
    question: "Should I pick a dropper batch or repeat at home?",
    answer:
      "Repeat at home only if last year broke on pacing or test strategy, not on syllabus. If there are two or more chapters you genuinely never learnt, a dropper batch is worth the fees. Most droppers who fail a second attempt failed because they over-rated how much content they had already absorbed the first time. A week-one diagnostic in any good dropper batch will tell you honestly which route is right.",
  },
  {
    question: "What's the single biggest mistake parents make choosing NEET coaching in Jaipur?",
    answer:
      "Picking by brand recognition instead of by the teacher. A big-brand classroom with a junior faculty running the live class is worse than a small-batch classroom with a senior teacher at the board. The brand is what sold you the brochure; the teacher is what teaches your child for 24 months. Insist on knowing, by name, who teaches the live batch before you pay.",
  },
];

export default function NeetCoachingInJaipurPost() {
  return (
    <main className="pt-24 pb-20 bg-white">
      <ScrollTracker slug={POST.slug} pageCategory="pillar" />
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
          "NEET coaching Jaipur",
          "best NEET coaching in Jaipur",
          "NEET coaching fees Jaipur",
          "Jaipur vs Kota NEET",
          "Mansarovar NEET coaching",
          "NEET Physics coaching Jaipur",
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
        {/* Header */}
        <ScrollReveal className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 text-xs font-mono">
            <span className="text-accent-orange uppercase tracking-widest">
              {POST.category} guide
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

        {/* Featured image */}
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

        {/* Definition-first opening */}
        <ScrollReveal className="mb-12">
          <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
            <p>
              NEET coaching in Jaipur is the set of classroom and online
              programmes run within Jaipur city that prepare Class 11 and
              Class 12 students (and droppers) for the National Eligibility
              cum Entrance Test, the single entrance exam for MBBS and
              BDS admissions across India. Of the ~20 lakh NEET candidates
              who sat the exam in 2025 (
              <a
                href="https://www.nmc.org.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline underline-offset-2"
              >
                National Medical Commission
              </a>
              {" "}/ NTA, 2025), Rajasthan
              contributes roughly 1.4 lakh, of which Jaipur is the largest
              single urban catchment (Rajasthan Board &amp; NTA district
              statistics, 2024-2025).
            </p>
            <p>
              This guide is not a listicle and not a ranking. It is what a
              founder of a small-batch coaching centre in Jaipur would tell
              you if you sat down with them for chai and asked honestly:{" "}
              <em>
                what do we actually pick between, how much does it cost,
                where do parents go wrong, and when is Jaipur the right
                choice at all?
              </em>
            </p>
            <p>
              You can stop reading after the Key Takeaways box if you only
              have ninety seconds. The rest is for parents and students who
              plan to be in this decision for two years.
            </p>
          </div>
        </ScrollReveal>

        {/* Key Takeaways */}
        <ScrollReveal className="mb-16">
          <KeyTakeaways
            bullets={[
              "Jaipur has roughly 40 NEET coaching centres advertising at any given time, splitting into three national brands, 8-10 mid-tier local institutes, and a long tail of small-batch setups.",
              "Two-year classroom fees sit in three clear bands: ₹1.6-2.8 lakh/year at national brands, ₹80,000-1.4 lakh/year at mid-tier locals, ₹60,000-1 lakh/year at small-batch setups.",
              "Batch size is the single biggest hidden variable. 30 seats with one senior teacher beats 300 seats with a junior running the live class, almost every time.",
              "Kota delivers higher aggregate selections than Jaipur, but also the highest dropout and burnout rate in Indian NEET coaching. Jaipur wins on stability and on letting students stay home.",
              "Hindi-medium NEET preparation in Jaipur is entirely viable; NEET itself is bilingual. The issue is coaching centres that advertise Hindi medium but run English-only lectures.",
              "The single biggest parent mistake is picking by brand instead of by teacher. Insist on knowing, by name, who teaches the live batch before you pay.",
            ]}
          />
        </ScrollReveal>

        {/* Body */}
        <div className="space-y-10 text-[17px] text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              How many NEET coaching centres does Jaipur actually have?
            </h2>
            <p>
              Walk through Mansarovar, Malviya Nagar, Vaisali Nagar, or
              Gopalpura Bypass and you will see a NEET or JEE signboard
              every two hundred metres. The flyover advertising skews the
              number upward; the real working count is smaller.
            </p>
            <p className="mt-4">
              On a conservative count of centres actively running a 2026
              NEET batch with at least one qualified senior teacher, Jaipur
              has around <strong>40 centres</strong>. They split into three
              tiers that behave very differently.
            </p>
            <ul className="mt-5 space-y-3 pl-0">
              <li>
                <strong>National brand branches (3).</strong> Allen, Aakash,
                and Resonance run Jaipur centres that are effectively
                satellite campuses of their Sikar and Kota flagships. Fees
                are highest. Batch sizes are 150-400 per classroom. The
                senior teachers you see on the website almost never teach
                the live class; that is done by a local junior faculty.
              </li>
              <li className="mt-2">
                <strong>Local mid-tier institutes (8-10).</strong> Parmar
                Coaching Institute, Convex Classes, The Foundation Classes,
                Tomer Classes, Vibrant Academy, Vardhmaan, Gurukripa,
                PCP, Physics by Ajay Soni. These run 60-120 per classroom,
                charge 30-50% less than the national brands, and usually
                have one identifiable senior teacher the parents have heard
                of.
              </li>
              <li className="mt-2">
                <strong>Small-batch and specialist setups (25-30).</strong>
                This includes founder-led setups like ProNEET, single-
                subject specialists (usually Physics or Chemistry), Hindi-
                medium-first setups, and online-first tutors who also run
                a small classroom. Batches are 20-60. Fees are lowest.
                Quality ranges wildly. Some are excellent, some are brand-
                new and untested.
              </li>
            </ul>

            <InfographicStats
              eyebrow="Jaipur NEET coaching"
              heading="The market in four numbers"
              values={[
                {
                  value: "~40",
                  label: "Active centres",
                  sublabel: "2026 Q1 Jaipur sweep",
                },
                {
                  value: "3",
                  label: "National brand branches",
                  sublabel: "Allen · Aakash · Resonance",
                },
                {
                  value: "8–10",
                  label: "Local mid-tier institutes",
                  sublabel: "Parmar, Convex, Foundation, Tomer…",
                },
                {
                  value: "25–30",
                  label: "Small-batch setups",
                  sublabel: "ProNEET sits here",
                },
              ]}
              footnote="Source: ProNEET 2026 Q1 Jaipur market sweep."
            />

            <p className="mt-5">
              The pattern most families fall into is to only seriously
              consider four or five centres during the decision. That is
              fine. Just make sure those four or five span at least two of
              the three tiers so you see the real contrast.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              What does NEET coaching in Jaipur actually cost?
            </h2>
            <p>
              Every coaching institute has an official fee and a real fee.
              The official fee is what the receptionist quotes you. The
              real fee is what you pay after counsellor discounts, material
              fees, test-series add-ons, registration charges, and the
              occasional &quot;merit scholarship&quot; that materialises
              after a bargain. Ask for a written total including every
              line item before you pay.
            </p>
            <p className="mt-4">
              That caveat noted, here are honest 2026 Jaipur ranges for a
              two-year NEET classroom programme, based on a 2026 Q1 sweep
              of published fees and parent inquiries:
            </p>
            <InfographicTable
              eyebrow="Two-year NEET classroom fees"
              heading="2026 Jaipur ranges, by tier"
              columns={[
                { key: "tier", label: "Tier" },
                { key: "perYear", label: "Per year (₹)", align: "right", numeric: true },
                { key: "total", label: "2-year total (₹)", align: "right", numeric: true },
                { key: "notes", label: "Notes" },
              ]}
              rows={[
                {
                  tier: "National brand branch",
                  perYear: "1.6 – 2.8 L",
                  total: "3.2 – 5.6 L",
                  notes: "Highest batch size, widest peer group, thinnest personal attention",
                },
                {
                  tier: "Local mid-tier institute",
                  perYear: "80 K – 1.4 L",
                  total: "1.6 – 2.8 L",
                  notes: "Usually one identifiable senior name; mixed live-vs-recorded",
                },
                {
                  tier: "Small-batch / specialist",
                  perYear: "60 K – 1 L",
                  total: "1.2 – 2 L",
                  notes: "30-seat cap typical; same teacher every class; thinner peer group",
                },
                {
                  tier: "Dropper batch (1 year)",
                  perYear: "1 – 2.2 L",
                  total: "N/A",
                  notes: "20-40% premium over a Class 12 seat; diagnostic before enrolment",
                },
              ]}
              highlightRowIndex={2}
              footnote="Source: ProNEET 2026 Q1 Jaipur market sweep. The highlighted row is ProNEET's tier."
            />
            <p className="mt-5">
              EMI is near universal now. Scholarships exist at every tier
              but are mostly recovered on paper material or discounted from
              the official rate. Treat the &quot;scholarship&quot; as a
              discount, not a financial aid package.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Why does the batch size matter more than the brand?
            </h2>
            <p>
              Most coaching discussions in India treat batch size as a
              cost driver and not a quality variable. It is the other way
              around. Batch size is the single biggest determinant of
              whether a teacher can actually see your child stopped taking
              notes on Tuesday and catch it on Wednesday.
            </p>
            <p className="mt-4">
              In a 300-seater, the top ten students are the anchor. They
              answer the doubts, they set the pace, and the teacher teaches
              to their comprehension because that is the signal the
              teacher gets back. Everyone below the top ten runs harder
              than they should, the bottom half disengages silently, and
              by Class 12 the bottom third has quietly become the
              &quot;second-shift&quot; kids.
            </p>
            <p className="mt-4">
              In a 30-seater, the teacher remembers every name by week two
              and notices the disengagement on the face of a specific
              student within a class. That is not a warm-and-fuzzy
              intangible. That is the working mechanism that separates a
              good AIR from a mediocre one.
            </p>
            <p className="mt-4">
              The contrarian read we have picked up over 20 years:{" "}
              <strong>
                the top national brand with the wrong batch size is a
                worse bet than a reliable local small-batch with the right
                one.
              </strong>{" "}
              We say that as people who have taught inside Bansal Classes,
              Narayana, and Excel Physics. The brands work. The batch size
              is what unmakes them.
            </p>

            <InfographicCompare
              eyebrow="The contrarian take"
              heading="Small batch vs mega-batch, at the same fee-tier"
              left={{
                title: "30-seat classroom",
                subtitle: "Small-batch",
                stat: "30",
                statLabel: "seats per batch",
                bullets: [
                  "Teacher knows every name by week 2",
                  "Disengagement is caught within the week",
                  "Saturday doubt queue: 3-5 students",
                  "Same senior teacher across Class 11 + 12",
                ],
                verdict: "Engineered for attention",
              }}
              right={{
                title: "300-seat classroom",
                subtitle: "Mega-batch",
                stat: "300",
                statLabel: "seats per batch",
                bullets: [
                  "Teacher anchors to the top-10 students",
                  "Bottom half disengages silently",
                  "Doubt queue on Saturday: 40+ students waiting",
                  "Junior faculty rotates between Class 11 and 12",
                ],
                verdict: "Engineered for throughput",
              }}
              footnote="Observation from 20+ years teaching inside Bansal Classes, Narayana, and Excel Physics — and from the last two decades at ProNEET."
            />
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              How does Jaipur compare to Kota and Sikar for NEET?
            </h2>
            <p>
              Every Rajasthan NEET parent has this conversation at least
              once. Jaipur, Kota, Sikar. The three-city triangle.
            </p>
            <p className="mt-4">
              <strong>Kota</strong> delivers the most NEET selections in
              India in aggregate, full stop. It has the most hostels, the
              most test series, and the most competitive peer pool. It also
              has the highest documented burnout and student mental-health
              incident rate of any coaching hub in the country, including
              a concerning rise in suicide case studies that multiple
              national media outlets have covered through 2023-2025.
            </p>
            <p className="mt-4">
              <strong>Sikar</strong> has risen fast over the last five
              years on Allen&apos;s home-city strength. It is cheaper than
              Kota, smaller, and the pressure environment is arguably
              healthier. It is the rising pick for families who want Kota-
              style intensity with slightly less chaos.
            </p>
            <p className="mt-4">
              <strong>Jaipur</strong> wins on two things. One, most Jaipur
              NEET students stay at home with their parents, which reduces
              the mental-health risk floor meaningfully. Two, Jaipur has a
              healthy small-batch ecosystem that Kota simply does not. In
              Kota, nearly every serious centre is 150+ per batch because
              that is what the hostel economics demand. Jaipur loses on
              sheer peer-competition depth.
            </p>
            <p className="mt-4">
              Our working rule, shared with parents in about a dozen
              counselling calls a month: if your child is a natural
              competitor who thrives in stadium-sized peer pressure and
              you are financially OK with a ₹6-8 lakh two-year total,
              consider Kota. If your child does their best work when they
              feel seen by a specific teacher, stay in Jaipur. The
              two-year completion rate for both groups, in our sample, is
              very different.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              How does a good NEET coaching week in Jaipur actually look?
            </h2>
            <p>
              The brochure language is always the same: &quot;comprehensive
              curriculum, regular tests, doubt clearing, personalised
              attention.&quot; That phrase is worthless. Ask for the
              specific weekly rhythm.
            </p>
            <p className="mt-4">
              A well-run Jaipur NEET batch, regardless of tier, runs on
              roughly this cadence:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>
                <strong>Six days a week</strong> of classroom teaching,
                split across Physics, Chemistry, and Biology (ProNEET
                students pair their own Biology coaching).
              </li>
              <li>
                <strong>One topic test per week</strong>, reviewed in class
                the next day, not just graded and returned.
              </li>
              <li>
                <strong>Daily practice problems (DPPs)</strong> for each
                chapter taught that day, submitted and marked.
              </li>
              <li>
                <strong>A dedicated doubt session</strong> on Saturday or
                Sunday where students can stay as long as needed.
              </li>
              <li>
                <strong>Monthly full-length mocks</strong> graded against
                real NEET cut-offs, not institute-internal scales.
              </li>
              <li>
                <strong>A short parent update every fortnight</strong>,
                ideally a phone call or a written note. Not just an app
                notification nobody reads.
              </li>
            </ul>
            <p className="mt-5">
              If the centre cannot describe their week in this kind of
              specificity, that is the signal. Centres with a lot of
              marketing spend and no working rhythm exist.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              What do parents most regret about their Jaipur coaching choice?
            </h2>
            <p>
              We have had a lot of these conversations with transfers:
              students who joined ProNEET midway through Class 11 or 12
              after a first coaching did not work out. Three regrets show
              up again and again.
            </p>
            <p className="mt-4">
              <strong>One: assuming the brand equalled the teacher.</strong>
              A parent enrols based on a big-brand billboard they
              recognised. The first two weeks look normal. By Diwali break,
              they realise their child has never been taught by the person
              on the poster. The person on the poster records videos in
              Kota, or does two masterclasses a year in Jaipur, and that is
              it. The working teacher is a 25-year-old who graduated from
              the same coaching two years earlier.
            </p>
            <p className="mt-4">
              <strong>Two: under-estimating how much batch size changes
              everything.</strong> A parent says yes to a 180-seater
              because the fees were 40% lower than a smaller alternative.
              By February, the student has stopped asking doubts because
              asking is embarrassing in front of 180 people. The &quot;
              doubt session&quot; on Saturday has 40 students waiting for
              one teacher. By April, the student has given up on the
              chapter they were weakest in.
            </p>
            <p className="mt-4">
              <strong>Three: not demanding clarity on Hindi medium.</strong>
              A parent is promised the batch is bilingual. In practice, the
              lecture is English and the Hindi translation is an after-
              class handout that is two pages out of date. The student is
              suddenly filtering the lecture in real time, and loses twenty
              percent of what is said.
            </p>
            <p className="mt-4">
              None of these regrets are fatal if caught by end-of-month-two.
              All of them are difficult to recover from if caught in
              March of Class 12. Visit the demo class. Ask the specific
              teacher&apos;s name. Ask for the live weekly timetable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              So what should a Jaipur parent actually do?
            </h2>
            <p>
              A simple, workable plan for a Class 10 or dropper parent
              making this choice right now:
            </p>
            <ol className="mt-4 space-y-3 list-decimal pl-6">
              <li>
                <strong>Pick three centres across two tiers.</strong>{" "}
                One national-brand branch, two local or small-batch
                setups. If you only see brands, you will never know what
                the alternative looks like.
              </li>
              <li>
                <strong>Attend a real demo class at each.</strong> Not a
                sales pitch in the counsellor&apos;s office. An actual
                live classroom on a regular teaching day.
              </li>
              <li>
                <strong>Ask, by name, who teaches the live batch your
                child would join,</strong> and whether that person is the
                same across Class 11 and Class 12. Get it in writing if
                you can.
              </li>
              <li>
                <strong>Ask for the weekly rhythm:</strong> classes,
                tests, DPPs, doubt sessions, parent updates. Compare the
                three on a single sheet.
              </li>
              <li>
                <strong>Ask for the full fee breakdown in writing,</strong>
                including material, test series, registration, any
                &quot;miscellaneous&quot;. The written total is the only
                total that matters.
              </li>
              <li>
                <strong>Talk to one current student and one recent
                alumnus</strong> from each shortlist. Ask: what would they
                change if they restarted? Teachers cannot tell you that.
                Students can.
              </li>
            </ol>
            <p className="mt-5">
              That process takes two weekends. It will save you the two
              years if you get it right.
            </p>
          </section>

          <InfographicQuote
            quote="We don't believe in mass production of students. We believe in mastery. One concept, one student, one breakthrough at a time. Physics isn't hard. It's just been taught wrong."
            attribution="Neeraj Gupta"
            role="Founder, ProNEET · 20+ years teaching Physics"
            image="/photos/neeraj-gupta.png"
            imageAlt="Neeraj Gupta, founder of ProNEET, Mansarovar Jaipur"
          />

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Where does ProNEET fit in this picture?
            </h2>
            <p>
              ProNEET is a small-batch Jaipur coaching in Mansarovar
              Sector 8. We teach Physics (Neeraj Gupta, 20+ years,
              ex-Bansal Classes, Narayana, Excel Physics) and Chemistry
              (Vivek Patidar, a Mansarovar-circuit name). We do not teach
              Biology. Students pair our Physics and Chemistry with their
              own Biology setup, which is a trade-off that does not suit
              everyone and we are up-front about it.
            </p>
            <p className="mt-4">
              Batches are capped at 30 because that is the number at which
              the teacher can still see every student. The teacher on the
              brochure is the teacher at the board. We have taught 1000+
              students who went on to clear NEET, AIIMS, IIT or NIT across
              20+ years. If that sounds like what you are looking for,{" "}
              <Link
                href="/programs"
                className="text-brand font-medium underline underline-offset-2"
              >
                see the batches
              </Link>
              {" "}or{" "}
              <a
                href={`tel:${SITE.phone}`}
                className="text-brand font-medium underline underline-offset-2"
              >
                call admissions on {SITE.phoneDisplay}
              </a>
              . We will tell you honestly whether we are the right fit
              before we take a deposit. If we are not, we will point you
              to one of the mid-tier locals that might be.
            </p>
          </section>
        </div>

        {/* Internal links block */}
        <ScrollReveal className="mt-16">
          <div className="rounded-xl border border-slate-100 bg-surface-secondary p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-accent-orange mb-4">
              Keep reading
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/faculty"
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 group hover:shadow-tier-sm transition"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Meet the faculty
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Neeraj Gupta (Physics), Vivek Patidar (Chemistry)
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-brand group-hover:translate-x-1 transition" />
              </Link>
              <Link
                href="/programs"
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 group hover:shadow-tier-sm transition"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Programmes and fees
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    NEET Classroom, JEE, Dropper, 1-on-1 Online
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-brand group-hover:translate-x-1 transition" />
              </Link>
              <Link
                href="/results"
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 group hover:shadow-tier-sm transition"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    What students have done afterwards
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    AIIMS, IIT, BITS, NIT, Govt Medical Colleges
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
                    Book a demo class
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Classroom in Mansarovar Sector 8, Jaipur
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-brand group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </article>

      {/* FAQ */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10 mt-8">
        <PageFaq
          eyebrow="NEET COACHING JAIPUR · FAQ"
          heading="Common questions parents ask"
          items={FAQS}
        />
      </div>
    </main>
  );
}
