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

const POST = BLOG_POSTS.find((p) => p.slug === "jaipur-vs-kota-vs-sikar-neet")!;

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
    question: "Is Kota still the best place for NEET coaching in 2026?",
    answer:
      "Kota is still the deepest coaching ecosystem in India by faculty count, batch diversity, and test-series depth. It is not automatically the best place for your specific child. The honest question is not which city is best, it is which city fits the student you actually have. A self-directed, emotionally resilient student who wants peer depth will still thrive in Kota. A student who needs family dinners and a small-batch teacher is better off in Jaipur.",
  },
  {
    question: "How much does NEET coaching in Kota cost, including hostel and living?",
    answer:
      "A realistic 2026 Kota budget runs ₹3.2-4.5 lakh per year: ₹1.8-2.5 L coaching, ₹90 K-1.4 L hostel and mess, plus ₹30-60 K for books, tests, travel and personal expenses. Sikar comes in roughly 20 percent lower. Jaipur, when the child lives at home, drops to ₹60 K-1.8 L per year because hostel costs disappear entirely. Fees are one line item, not the whole cost.",
  },
  {
    question: "Why is Sikar growing as a NEET hub?",
    answer:
      "Sikar built its reputation on affordability and a small Allen flagship that punched above its weight in NEET results between 2018 and 2024. Coaching fees in Sikar run 15-25 percent below Kota, hostel costs are cheaper, and the city is less crowded. The trade-off is smaller teacher depth. Sikar suits families who want the Kota model at a lower cost and can accept thinner choice.",
  },
  {
    question: "Is the mental-health risk of Kota real or exaggerated?",
    answer:
      "It is real and documented. Rajasthan government data reported 23 student suicides in Kota in 2024 (Kota Police, via Indian Express). The number is smaller than the social-media narrative suggests, but any serious parent has to plan for it. Kota has responded with mandatory counsellor visits, anti-suicide fans, and mandatory rest days. The risk is not a reason to avoid Kota reflexively; it is a reason to pick the hostel, batch size and support system carefully.",
  },
  {
    question: "Can a student crack NEET from Jaipur without going to Kota?",
    answer:
      "Yes. Jaipur produced its share of AIIMS and top-100 NEET ranks in the last five years, from Allen Jaipur, Aakash Mansarovar, ProNEET and a handful of other setups. The ecosystem is smaller than Kota but it is not shallow. What Jaipur cannot match is Kota's sheer depth of concurrent test series and peer density. What Jaipur offers that Kota cannot is a home-cooked meal, an unbroken family routine, and an accountable small-batch option.",
  },
  {
    question: "Should a Jaipur-resident family send their child to Kota?",
    answer:
      "Default answer: no, not unless there is a specific reason Jaipur cannot provide. A Jaipur-resident family sending a child to Kota is paying an extra ₹1.2-2 lakh per year for hostel and losing the emotional safety net of home, so the coaching itself must deliver something Jaipur cannot. For a top-quartile, self-directed student who specifically wants Kota's peer pool, it is worth it. For a student rebuilding Physics from Class 9 basics, it is not.",
  },
  {
    question: "What is the best hostel strategy if we do pick Kota or Sikar?",
    answer:
      "Three rules we give families who ask. One, visit the hostel in person before paying, never pick off a website. Two, pick the hostel that limits same-room occupancy to two students and serves verified home-style meals. Three, stay within a 10-minute walk of the coaching centre, which drops travel fatigue and reduces the single biggest stress point. A ₹15,000 per month hostel with two-sharing and good mess is cheaper over two years than a ₹9,000 per month hostel the child stops eating at.",
  },
  {
    question: "How do I decide between Jaipur, Kota and Sikar if I am genuinely torn?",
    answer:
      "Do a one-weekend visit to all three. Walk one coaching campus per city with the same questions: batch size, live teacher name, fee in writing, and one current parent contact. Walk one hostel per city the same way. Put the observations on one sheet. The decision is usually obvious by Sunday evening, and the family is aligned on why, which matters as much as the choice itself.",
  },
];

export default function JaipurVsKotaVsSikarPost() {
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
          "NEET coaching Jaipur vs Kota",
          "Kota vs Sikar NEET",
          "best city for NEET coaching",
          "Kota hostel cost NEET",
          "NEET coaching Rajasthan comparison",
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
              Jaipur, Kota and Sikar are the three Rajasthan cities a
              NEET parent actually compares. Kota enrolled roughly
              1.75 lakh coaching students across all exams in 2024
              (Kota District Administration, cited by Hindustan Times,
              Jan 2025). Sikar and Jaipur together host an estimated
              60,000 more. The choice between them decides your
              child&apos;s next 24 months and roughly ₹6-9 lakh of
              household spending.
            </p>
            <p>
              This is a founder-written guide. I have taught at
              Narayana in Kota, visited Sikar&apos;s Allen campus
              several times, and built ProNEET in Jaipur. None of the
              three cities is &quot;best.&quot; Each is the right
              answer for a specific kind of student and family. The
              honest job of this piece is to show you which profile
              your child fits, so you stop choosing on brand and
              start choosing on fit.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mb-16">
          <KeyTakeaways
            bullets={[
              "Kota enrols roughly 1.75 lakh coaching students per year. Sikar is a fraction of that. Jaipur sits between them on ecosystem depth.",
              "Realistic 2026 annual cost: Kota ₹3.2-4.5 L, Sikar ₹2.5-3.5 L, Jaipur (living at home) ₹60 K-1.8 L.",
              "Kota's mental-health risk is real and documented. Rajasthan government recorded 23 student suicides in Kota in 2024.",
              "Sikar offers roughly 20 percent lower fees than Kota with a smaller but competent ecosystem. Good middle option.",
              "Jaipur is the only one of the three where a child can live at home. That is a large advantage, not a compromise.",
              "Pick by student profile, not by city brand. The self-directed, resilient student picks differently from the rebuilding-Physics student.",
            ]}
          />
        </ScrollReveal>

        <div className="space-y-10 text-[17px] text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Why is Kota still the default answer for serious NEET aspirants?
            </h2>
            <p>
              Kota has the deepest teaching ecosystem in India. Allen,
              Aakash, Resonance, Motion, Vibrant, PW Vidyapeeth,
              Unacademy Centre, and a long tail of specialist
              institutes all run flagship operations in the city.
              Between them they employ roughly 8,000-9,000 teachers
              and run several hundred parallel batches in any given
              academic year.
            </p>
            <p className="mt-4">
              What this depth buys you is three things parents often
              do not name but always feel. First, choice inside a
              choice. If the Allen batch you joined in August is not
              working by November, there is a different batch three
              streets away your child can switch into. Second, peer
              pool density. A strong student in a Kota batch is
              competing with 200 other strong students inside the
              room and 50,000 more across the city. Third, battle-
              tested test series. Kota test papers are written
              assuming the top 1 percent of India sits for them;
              everybody else is judged against that bar.
            </p>
            <p className="mt-4">
              The trade-off is the one every Kota alumnus admits
              privately. Kota is a grinder. Two years away from home,
              shared hostel rooms, mess food, and a peer culture
              where ranks are the conversation at dinner. The
              students who do best there are not the ones with the
              highest Class 10 marks. They are the ones with the
              steadiest temperament.
            </p>
            <p className="mt-4">
              As one former Narayana Kota colleague put it to me
              last month: &quot;Kota builds rankers, but it also
              builds dropouts. Every year, roughly 10 percent of
              first-year students quietly stop showing up by January.
              The system is not designed to catch them.&quot;
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Who should pick Kota in 2026?
            </h2>
            <p>
              Five signals that a student is a Kota fit, not a Kota
              gamble:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>
                Scored above 90 percent in CBSE or state board Class
                10, Physics and Maths above 92 specifically.
              </li>
              <li>
                Has already done some serious self-study (Cengage, HC
                Verma, MTG Biology) before Class 11 and liked it.
              </li>
              <li>
                Is emotionally independent. Can sleep, eat, and
                recover without daily parent presence.
              </li>
              <li>
                Specifically wants AIIMS top-100 or a top-50 NEET
                college, not just a medical seat somewhere.
              </li>
              <li>
                Parents can afford ₹3.2-4.5 L per year for two years
                without financial strain.
              </li>
            </ul>
            <p className="mt-5">
              Three of five is a green light. Fewer than three, and
              Kota is a gamble dressed up as a decision. The brand
              will not save a student who is not ready for the
              environment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              What is the actual mental-health picture in Kota?
            </h2>
            <p>
              The uncomfortable part most coaching brochures do not
              address. Kota recorded 23 student suicides in 2024
              (Indian Express, citing Kota Police, Jan 2025). That is
              down from 26 in 2023 but still meaningfully higher than
              other coaching cities.
            </p>
            <p className="mt-4">
              What those numbers do not show is the larger group of
              students who quietly break down without that outcome.
              Depression, anxiety, panic attacks during tests,
              disordered eating, two-week disappearances from class.
              Teachers who worked in Kota for a decade see this
              pattern in roughly 1 in 6 students by the end of the
              second year.
            </p>
            <p className="mt-4">
              Kota has responded seriously in the last 18 months.
              Mandatory counsellor slots, biweekly parent calls,
              anti-suicide fans in hostels, a half-day off on
              Sundays. The response is real but the underlying
              environment has not changed much. A student who was
              already wobbly before going in does not become stable
              because the hostel has a counsellor.
            </p>
            <p className="mt-4">
              This is not a case for not going to Kota. Roughly
              1.74 lakh students in Kota in 2024 did not take their
              lives. Most of them will finish the two years and move
              on. The case is for picking Kota only when the student
              is genuinely suited to it, picking the hostel carefully,
              and setting up a weekly parent call that is not about
              test scores.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              What does Sikar offer that Kota does not?
            </h2>
            <p>
              Sikar was a relative unknown in the NEET coaching
              conversation until roughly 2018. Then Allen opened a
              flagship branch there, discovered the city was willing
              to work for 15-25 percent cheaper fees than Kota,
              started producing a meaningful number of top-1000 NEET
              ranks, and the parents noticed. By 2022 Sikar was a
              serious option for families who liked the Kota model
              but wanted a lower-cost, lower-intensity version.
            </p>
            <p className="mt-4">
              Three honest advantages over Kota:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>
                <strong>Cheaper on every line item.</strong> Coaching
                fees 15-25 percent lower. Hostel and mess another
                20-30 percent lower. A Sikar two-year budget comes in
                at ₹2.5-3.5 L per year total versus ₹3.2-4.5 L in
                Kota.
              </li>
              <li>
                <strong>Less crowded.</strong> Roughly 25-30,000
                coaching students versus Kota&apos;s 1.75 lakh. The
                teacher sees your child more often in a 120-seater
                Sikar classroom than in a 400-seater Kota one.
              </li>
              <li>
                <strong>Lower peer pressure.</strong> Same syllabus,
                same test difficulty, less of the ranking-as-identity
                culture. Some students do better with less of that
                noise.
              </li>
            </ul>
            <p className="mt-5">
              The honest disadvantages: teacher bench is thinner, so
              mid-year switching options are limited. Test series is
              less varied. The city itself is smaller and
              entertainment options are fewer, which some Class 11
              students handle well and others find claustrophobic
              after eight months.
            </p>
            <p className="mt-4">
              Sikar is the right answer when the student needs a
              disciplined away-from-home setup but the family
              cannot or should not spend Kota money, and when the
              student will be fine in a slightly thinner ecosystem.
            </p>
          </section>

          <InfographicTable
            eyebrow="City by city"
            heading="Jaipur vs Kota vs Sikar: the numbers parents compare"
            columns={[
              { key: "dim", label: "Dimension" },
              { key: "jaipur", label: "Jaipur" },
              { key: "kota", label: "Kota" },
              { key: "sikar", label: "Sikar" },
            ]}
            rows={[
              {
                dim: "Coaching student population",
                jaipur: "~40-50 K",
                kota: "~1.75 L",
                sikar: "~25-30 K",
              },
              {
                dim: "Major NEET brands present",
                jaipur: "Allen, Aakash, Resonance, ProNEET + local",
                kota: "Allen flagship, Aakash, Motion, PW, Resonance, Vibrant",
                sikar: "Allen flagship, Career Point, Matrix + local",
              },
              {
                dim: "Typical classroom batch size",
                jaipur: "60-300 (or 30 at small-batch)",
                kota: "150-450",
                sikar: "100-300",
              },
              {
                dim: "Annual coaching fee range",
                jaipur: "₹60 K - 2.8 L",
                kota: "₹1.8 L - 2.8 L",
                sikar: "₹1.4 L - 2.1 L",
              },
              {
                dim: "Hostel + mess (per year)",
                jaipur: "₹0 if at home, else ₹80 K - 1.4 L",
                kota: "₹90 K - 1.4 L",
                sikar: "₹70 K - 1.1 L",
              },
              {
                dim: "Realistic total annual cost",
                jaipur: "₹60 K - 1.8 L (home)",
                kota: "₹3.2 - 4.5 L",
                sikar: "₹2.5 - 3.5 L",
              },
              {
                dim: "Student lives at home",
                jaipur: "Yes (if local)",
                kota: "No",
                sikar: "No",
              },
              {
                dim: "Peer pool depth",
                jaipur: "Medium",
                kota: "Very high",
                sikar: "Medium-low",
              },
              {
                dim: "Mental health services integrated",
                jaipur: "Varies by institute",
                kota: "Mandated by Rajasthan govt since 2024",
                sikar: "Emerging, institute-led",
              },
            ]}
            footnote="Ranges reflect Q1 2026 market observation, own inquiries and published institute fee schedules. Confirm current numbers at admissions."
          />

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              When is Jaipur the better answer than either Kota or Sikar?
            </h2>
            <p>
              Jaipur&apos;s NEET ecosystem is smaller than Kota&apos;s
              but it is not shallow. Allen Jaipur and Aakash Mansarovar
              together send roughly 700-900 students to NEET qualifying
              ranks every year. A handful of small-batch setups,
              ProNEET among them, produce single-digit to low-double-
              digit rankers at AIR levels that matter.
            </p>
            <p className="mt-4">
              What Jaipur offers that neither Kota nor Sikar can
              replicate is something most coaching brochures do not
              advertise because they cannot. It is called living at
              home. The student eats dinner with their family most
              nights. The sleep cycle is enforced by a parent, not by
              a hostel warden. The emotional crashes that are normal
              in Class 11 get caught before they become Class 12
              disasters.
            </p>
            <p className="mt-4">
              Think of it like the difference between a boarding
              school and a day school in the 1990s. Both produce
              doctors and engineers. One produces more of them at
              higher intensity. The other produces graduates who are
              less likely to need three years of therapy after.
            </p>
            <p className="mt-4">
              Jaipur is the right answer when:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>
                The student is resident in Jaipur or nearby NCR-
                Rajasthan towns (Ajmer, Bhilwara, Alwar) and commuting
                is feasible.
              </li>
              <li>
                The student is on the &quot;rebuilding Physics from
                Class 9 level&quot; end of the prep spectrum, not the
                &quot;already doing Cengage problems&quot; end.
              </li>
              <li>
                The family values daily parent visibility over peer
                pool density.
              </li>
              <li>
                The budget is constrained to under ₹1.8 L per year
                total and Kota or Sikar would stretch the family.
              </li>
              <li>
                The student has shown any signal of homesickness or
                anxiety that is worth taking seriously rather than
                dismissing.
              </li>
            </ul>
          </section>

          <InfographicCompare
            eyebrow="Three cities, three profiles"
            heading="Pick on student fit, not on city brand"
            left={{
              title: "Kota",
              subtitle: "Rankers' factory",
              stat: "₹3.2-4.5 L",
              statLabel: "annual total cost",
              bullets: [
                "Deepest teacher bench in India",
                "Densest peer pool, hardest tests",
                "Two years away from home, hostel life",
                "Mandated mental health support post-2024",
              ],
              verdict: "Built for self-directed top-quartile aspirants",
            }}
            right={{
              title: "Jaipur",
              subtitle: "At-home prep",
              stat: "₹60 K-1.8 L",
              statLabel: "annual total cost",
              bullets: [
                "Allen, Aakash, and small-batch options present",
                "Student lives at home, family dinners continue",
                "Smaller peer pool, lower daily intensity",
                "Meaningful small-batch alternatives exist",
              ],
              verdict: "Built for students who need daily family support",
            }}
            footnote="Sikar sits between them: Kota's model at Jaipur's price, with a narrower teacher bench."
          />

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              What do parents who moved their child back from Kota usually say?
            </h2>
            <p>
              We have taken in roughly a dozen transfer students from
              Kota over the last three years at ProNEET. The pattern
              in why they left is remarkably consistent.
            </p>
            <p className="mt-4">
              About half came back because of the classroom. A 300-
              seat batch with a teacher who never learned their name.
              Doubts not answered. Weak chapters compounding week
              after week because nobody was tracking them
              individually. These students were not weak. They were
              invisible, which is a different problem and a curable
              one.
            </p>
            <p className="mt-4">
              The other half came back for reasons that had nothing
              to do with academics. Roommate problems that the hostel
              did not solve. A parent losing a job and the family
              needing to cut the ₹3.5 L per year cost. A grandmother
              falling ill and the student wanting to be home.
              Homesickness that the student did not name for four
              months, and then named at 2 am in a phone call.
            </p>
            <p className="mt-4">
              Not one family we asked regretted the move back. Most
              said the same sentence in slightly different words:
              we wish we had started in Jaipur. That is not a
              general claim about Kota. It is a specific claim about
              these specific families. For some students, the original
              Kota bet was the right one.
            </p>
          </section>

          <InfographicQuote
            quote="I do not tell every parent to pick Jaipur. I tell them to pick the setup where their child can still be themselves in 18 months. Kota produces great doctors. It also produces some who arrive at medical college already exhausted. Pick the version of this that leaves your child with energy left."
            attribution="Neeraj Gupta"
            role="Founder, ProNEET · Ex-Narayana Kota, Bansal Classes, Excel Physics"
            image="/photos/neeraj-gupta.png"
            imageAlt="Neeraj Gupta, founder of ProNEET, Mansarovar Jaipur"
          />

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              How does a family actually make this decision in one weekend?
            </h2>
            <p>
              A process we have walked a few dozen parents through,
              across about five years. It costs two days of travel
              and about ₹12,000 in tickets and stays.
            </p>
            <ol className="mt-4 space-y-3 list-decimal pl-6">
              <li>
                <strong>Saturday morning: one coaching visit in
                Jaipur.</strong> Pick whichever institute you were
                going to default to. Sit through a real demo, ask for
                batch size, teacher name, full fee on one sheet.
              </li>
              <li>
                <strong>Saturday evening: train to Kota.</strong>
                Ajmer or Jaipur to Kota is about four hours. Stay near
                Talwandi or Indra Vihar where most hostels cluster.
              </li>
              <li>
                <strong>Sunday morning: Kota coaching visit.</strong>
                Walk one Allen or Aakash campus. Walk one hostel
                nearby. The hostel visit is non-negotiable. It
                decides more than the coaching does.
              </li>
              <li>
                <strong>Sunday afternoon: Kota to Sikar or
                return.</strong> Sikar is 2.5 hours from Kota, 3 hours
                from Jaipur. Add one day if you want to see Sikar; skip
                it if the Kota day made the answer obvious.
              </li>
              <li>
                <strong>Sunday evening: one sheet.</strong> Three
                rows for three cities. Four columns: fee total, batch
                size, distance from home, and gut feeling of the
                student. The answer is usually clear.
              </li>
            </ol>
            <p className="mt-4">
              If your weekend ends with Jaipur winning on gut but the
              student wanting to try Kota anyway, that is a
              conversation, not a decision. Either answer is
              defensible. Start the conversation before you have paid
              the fees, not after.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              What if we want the Kota level of teaching without leaving Jaipur?
            </h2>
            <p>
              This is the question that built small-batch coaching in
              Jaipur. Allen Jaipur, Aakash Mansarovar, and ProNEET
              all exist for this audience in different ways.
            </p>
            <p className="mt-4">
              Allen Jaipur gives you the Allen brand and Kota-produced
              study material with a Jaipur-based local teaching team.
              The material depth is the same as Kota; the teacher
              depth is thinner. Aakash Mansarovar works similarly at
              a slightly different fee point. Both are legitimate
              choices for a student who wants national-brand
              reliability.
            </p>
            <p className="mt-4">
              ProNEET takes a different bet. We cap batches at 30,
              teach Physics and Chemistry only, and the founder
              teaches Physics himself in every class. The pitch is
              not &quot;Kota in Jaipur.&quot; It is &quot;the thing
              Kota cannot do at scale, which is see your child by
              name.&quot; For a specific kind of student, it is the
              right product. For many others, Allen Jaipur or Aakash
              Mansarovar or Kota itself will be the better answer.
            </p>
            <p className="mt-4">
              A full comparison of ProNEET vs Allen Jaipur is in a
              separate guide. A complete parent checklist for
              evaluating any Jaipur coaching is also published. Read
              both before you decide.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Can we visit ProNEET as part of this decision?
            </h2>
            <p>
              Yes, and we recommend doing it the weekend before your
              Kota trip, not after. See the small-batch option first;
              then when you walk into a 300-seater in Kota, the
              comparison becomes concrete instead of theoretical.
            </p>
            <p className="mt-4">
              Our classroom is at 84/255, Madhyam Marg, Ward 27,
              Mansarovar Sector 8, Jaipur. Neeraj sir takes the
              Physics demo personally; Vivek sir takes Chemistry.
              There is no sales pitch and no counsellor. Bring the
              student, ask every question, watch a 90-minute live
              class, and leave. If Kota is still the right call
              after that, we will tell you it is. Call{" "}
              <a
                href={`tel:${SITE.phone}`}
                className="text-brand font-medium underline underline-offset-2"
              >
                {SITE.phoneDisplay}
              </a>
              {" "}to book the demo.
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
                href="/blog/proneet-vs-allen-jaipur"
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 group hover:shadow-tier-sm transition"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    ProNEET vs Allen Jaipur
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Founder-written side-by-side, no hedging
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-brand group-hover:translate-x-1 transition" />
              </Link>
              <Link
                href="/blog/neet-coaching-fees-in-jaipur-2026"
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 group hover:shadow-tier-sm transition"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    NEET coaching fees in Jaipur 2026
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Tier by tier, what is really in the invoice
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
                    Before you pay hostel money in Kota
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
          eyebrow="JAIPUR VS KOTA VS SIKAR · FAQ"
          heading="The questions parents ask after this comparison"
          items={FAQS}
        />
      </div>
    </main>
  );
}
