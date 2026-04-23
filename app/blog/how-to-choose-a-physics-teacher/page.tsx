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

const POST = BLOG_POSTS.find((p) => p.slug === "how-to-choose-a-physics-teacher")!;

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
    question: "Why does the Physics teacher matter more than the Biology or Chemistry one for NEET?",
    answer:
      "Physics is the subject that decides the tail of the NEET score distribution. Biology is memorisation-heavy and flattens out at 340-360 for most serious students. Chemistry is mixed but mostly tractable. Physics is where a 30-mark gap at the top of the paper is created, and that 30 marks is the difference between a government seat and no seat. A weak Physics teacher costs the NEET rank. A strong one rebuilds it.",
  },
  {
    question: "How much experience should a NEET Physics teacher have?",
    answer:
      "Ten years minimum in classroom teaching specifically for NEET or JEE. Not ten years as a physicist, not ten years tutoring casually. Ten years with the same syllabus under exam pressure. The subtle teaching patterns that move a student from 120 to 160 in Physics are learned classroom by classroom, and they do not appear in the first five years.",
  },
  {
    question: "Is a teacher from IIT automatically better than one from a regional engineering college?",
    answer:
      "No. The IIT alumni tag is a weak signal in coaching. Many of the best NEET Physics teachers in India studied at regional engineering colleges and went into teaching early, while many IIT graduates teach as a side job between jobs. What matters is years of teaching the exam, not the degree. We have met IIT graduates who cannot explain rotational dynamics to a Class 11 student, and regional-college graduates who can do it in three minutes.",
  },
  {
    question: "How do I tell if a Physics teacher is actually good in a 30-minute demo class?",
    answer:
      "Watch three things. One: does the teacher start from the simplest version of a problem or drop into the hard version to impress. The good ones start simple. Two: when a student says they do not understand, does the teacher rephrase or repeat louder. The good ones rephrase, often twice. Three: does the teacher write numbers on the board as they speak or rely on the textbook display. Good Physics teaching is high-density board work, not high-density slides.",
  },
  {
    question: "Should I pick a Physics teacher who teaches live batches or one who does recorded content?",
    answer:
      "Live for Class 11 foundation. Recorded for Class 12 revision. A Class 11 student needs real-time doubt-clearing because concepts compound and one misread equation breaks the next chapter. A Class 12 student who has already seen the syllabus once can use recorded content efficiently for revision and speed practice. Most families will want both at different stages; the question is which comes first.",
  },
  {
    question: "How much does a good NEET Physics teacher cost in Jaipur in 2026?",
    answer:
      "Roughly ₹40,000-70,000 per year for Physics only, as part of a full programme. Standalone Physics-only tutoring from a senior teacher (10+ years, NEET specific) runs ₹600-1,200 per hour for 1:1 and ₹350-500 per hour in a small group. Anything significantly cheaper is usually a junior teacher; anything more expensive is usually a brand premium without matching teaching time.",
  },
  {
    question: "What is a red flag I should walk away from in a Physics teacher?",
    answer:
      "A teacher who will not let you sit in on a full live class before you enrol. Demo classes curated for parents are a different thing from the real class, and any teacher confident in their daily teaching will let you see the real thing. If the institute refuses, politely leave. You are paying ₹40,000 to ₹2 lakh for two years; a 90-minute live class is not an unreasonable ask.",
  },
  {
    question: "Is same-teacher continuity across Class 11 and 12 important?",
    answer:
      "Very. Physics is a two-year build where the Class 11 teacher learns your child's misconceptions and the Class 12 teacher would have to re-learn them. Institutes that rotate Physics teachers between Class 11 and 12 lose that context every transition. Ask the admissions team: will the same teacher who starts my child's Class 11 Physics still be teaching them in Class 12? If the answer hedges, it is a no.",
  },
];

export default function HowToChoosePhysicsTeacherPost() {
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
          "how to choose physics teacher NEET",
          "best NEET physics teacher",
          "physics tutor for NEET JEE",
          "NEET physics coaching Jaipur",
          "signs of a good physics teacher",
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
              A NEET or JEE Physics teacher is the single faculty
              choice that most directly changes your child&apos;s
              final rank. NEET 2024 data showed roughly 23.3 lakh
              aspirants competing for 1.08 lakh MBBS seats
              (National Testing Agency, 2024 NEET-UG stats). Inside
              that funnel, the top-scoring and bottom-scoring groups
              separate on Physics performance more than on either
              Biology or Chemistry. Picking the wrong Physics teacher
              is the most expensive coaching mistake a family can
              make, and the least visible while it is happening.
            </p>
            <p>
              This guide is written by a Physics teacher. I have
              taught NEET and JEE Physics for 20+ years at Narayana,
              Bansal Classes, and Excel Physics, before starting
              ProNEET. I know the signals to check because I have
              watched them play out in hundreds of students, and I
              know the signals parents use that do not matter as
              much as they think.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mb-16">
          <KeyTakeaways
            bullets={[
              "Physics decides the tail of the NEET score distribution. A good teacher closes a 30-mark gap at the top.",
              "Minimum experience bar: 10 years teaching the same syllabus under exam pressure, not 10 years as a physicist.",
              "IIT tag is a weak signal. Regional-college graduates who went into teaching young are often better than lateral IIT hires.",
              "Watch the real live class, not the curated demo. Any teacher confident in their daily teaching will let you sit in.",
              "Same teacher across Class 11 and 12 matters. Institutes that rotate lose two years of misconception tracking.",
              "Cost benchmark: ₹40-70 K per year for Physics as part of a full programme, ₹600-1,200/hour for 1:1 senior-level.",
            ]}
          />
        </ScrollReveal>

        <div className="space-y-10 text-[17px] text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Why does the Physics teacher matter more than the others?
            </h2>
            <p>
              Walk through the NEET paper structure for a minute.
              Physics, Chemistry, and Biology each carry 180 marks.
              If every subject mattered the same way, you would pick
              three equally good teachers and move on. They do not.
            </p>
            <p className="mt-4">
              Biology is memorisation-heavy. A serious student with a
              decent teacher and standard material (NCERT, MTG,
              Campbell for top scorers) reliably lands at 340-360 out
              of 360 by test time. The Biology teacher has to be
              competent; they do not have to be exceptional for a
              student to score well.
            </p>
            <p className="mt-4">
              Chemistry is a mixed bag, roughly a third Physical (which
              behaves like Physics), a third Organic (which rewards
              pattern recognition), and a third Inorganic (which is
              closer to memorisation). An average teacher plus steady
              effort lands most serious students at 140-160. A strong
              teacher pushes the ceiling to 170+.
            </p>
            <p className="mt-4">
              Physics is structurally different. The syllabus compounds
              chapter on chapter. A student who learned kinematics
              badly in July cannot really learn rotational dynamics in
              November. Every topic from mechanics through
              electromagnetics through modern Physics assumes the
              previous topics were taught correctly. A weak Physics
              teacher does not just fail one chapter; they leak marks
              through the whole paper. A strong one builds a base the
              student uses on every problem for two years.
            </p>
            <p className="mt-4">
              This is why a top-10 percent NEET score is often
              decided by 30-40 marks in Physics. The gap between a
              120 and a 160 in Physics is nearly always the gap
              between a private medical seat and a government one.
              The Physics teacher is the most leveraged decision in
              the coaching hire.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              What specific experience should a Physics teacher have?
            </h2>
            <p>
              Three separate experience criteria, all of which have
              to be met. Not one of three. All three.
            </p>
            <p className="mt-4">
              <strong>One: ten years of classroom teaching, NEET or
              JEE specifically.</strong> Physics pedagogy under exam
              pressure is a separate skill from Physics knowledge.
              The first five years a teacher develops their core
              explanations. Years five to ten they learn what
              misconceptions students arrive with and how to
              anticipate them. A teacher with three years of
              experience, however bright, is still building that
              map. Choose the one who has finished building it.
            </p>
            <p className="mt-4">
              <strong>Two: experience across the full NEET ability
              spectrum.</strong> A teacher who has only taught
              top-1000 rankers at a flagship institute may not
              know how to teach the middle 60 percent of students
              who need to rebuild fundamentals. A teacher who has
              worked with weaker batches, dropper groups, and
              village-first-generation students usually has a
              deeper toolkit. The best teachers can move between
              ability levels mid-class.
            </p>
            <p className="mt-4">
              <strong>Three: continuity through at least two
              consecutive NEET reforms or syllabus updates.</strong>
              NEET has shifted twice in major ways in the last six
              years (online test delivery, paper-pattern changes,
              grace-marks litigation). A teacher who has survived
              those shifts and adapted their teaching is a
              different animal from one who taught through only a
              stable pattern.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Is an IIT degree a good signal for a Physics teacher?
            </h2>
            <p>
              This one is contrarian. No, the IIT tag is a weak
              signal in NEET and JEE coaching. It is a marketing
              signal, not a pedagogy signal.
            </p>
            <p className="mt-4">
              The IIT system trains strong problem solvers. It does
              not specifically train teachers. A 22-year-old IIT
              graduate who joined a coaching institute last year
              usually knows Physics deeply and teaches it badly,
              because the two are different skills. A 40-year-old
              teacher from a regional engineering college who has
              taught NEET Physics since they were 24 usually teaches
              it well, because they had sixteen years of feedback
              from students to sharpen their explanation.
            </p>
            <p className="mt-4">
              I have worked alongside both groups across three
              decades. The pattern is consistent. The IIT tag helps
              on a brochure. It does not help in a 5 pm class when
              a Class 11 student cannot see why the coefficient of
              restitution matters. The teacher who made teaching
              their career from year one typically handles that
              moment better than the one who drifted in from
              industry.
            </p>
            <p className="mt-4">
              This is not a knock on IIT graduates who teach well.
              Many do. The point is that the IIT tag alone should
              not shift your decision. Weigh the teaching years
              more heavily than the degree plaque.
            </p>
          </section>

          <InfographicTable
            eyebrow="What to check"
            heading="What actually matters in a Physics teacher, ranked"
            columns={[
              { key: "signal", label: "Signal" },
              { key: "weight", label: "How much it matters" },
              { key: "note", label: "Why" },
            ]}
            rows={[
              {
                signal: "Years teaching NEET/JEE Physics specifically",
                weight: "Very high",
                note: "Pedagogy under exam pressure is its own craft",
              },
              {
                signal: "Ability to teach weak students, not just top rankers",
                weight: "Very high",
                note: "Top rankers teach themselves; the middle 60% is where teachers earn their fee",
              },
              {
                signal: "Same teacher continues Class 11 to Class 12",
                weight: "High",
                note: "Physics compounds; misconception tracking is a two-year investment",
              },
              {
                signal: "Live class you can actually sit in on",
                weight: "High",
                note: "Demo classes are curated; real classes reveal daily behaviour",
              },
              {
                signal: "Batch size cap",
                weight: "High",
                note: "Above 60 students, the teacher stops learning names",
              },
              {
                signal: "Degree from IIT or IISc",
                weight: "Low",
                note: "Predicts Physics knowledge, not teaching skill",
              },
              {
                signal: "Institute brand name",
                weight: "Low to medium",
                note: "Brand helps on CVs; rarely the same as teaching quality",
              },
              {
                signal: "YouTube following, views",
                weight: "Low",
                note: "Optimised for view-time, not for the quiet student in the back row",
              },
              {
                signal: "Past AIR-1 students (brochure claims)",
                weight: "Very low",
                note: "Unverifiable, and top ranker outcomes often cluster on self-motivated outliers",
              },
            ]}
            footnote="Prioritise the first five rows; weigh the last four lightly."
          />

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              How do you actually evaluate a teacher in a demo class?
            </h2>
            <p>
              This is the part most parents skip because it feels
              awkward. It is the most important 90 minutes you will
              spend before enrolment. Watch for these five things.
            </p>
            <p className="mt-4">
              <strong>One: does the teacher start simple or start
              hard.</strong> Good Physics teachers begin with the
              simplest case of a problem, build intuition, and scale
              up. Weak ones start with the hardest version from a
              previous year&apos;s paper to look impressive, then
              lose half the class by minute twenty. Watch the
              opening of the class specifically.
            </p>
            <p className="mt-4">
              <strong>Two: what happens when a student says &quot;I
              do not understand.&quot;</strong> The good teachers
              rephrase, draw an alternate diagram, or bring in a
              real-world analogy. They rarely just repeat the
              original explanation louder. If you see a teacher
              responding to confusion by repeating themselves, assume
              this is what they will do with your child in October
              when kinematics gets hard.
            </p>
            <p className="mt-4">
              <strong>Three: how much gets written on the board.
              </strong> Physics is a board subject. A teacher who
              relies on a slide deck is optimising for recorded
              content, not live teaching. Good live Physics teaching
              is dense board work: equations, diagrams, arrows, units
              written in real time, not projected. Slides for
              summary, board for teaching.
            </p>
            <p className="mt-4">
              <strong>Four: how the teacher handles a wrong
              answer.</strong> A Class 11 student will get something
              wrong in the first thirty minutes. Watch what happens.
              The good teachers use it to correct a specific
              misconception visible to the whole class and thank the
              student for raising it. The weak ones ignore it or
              make the student feel stupid. Both signals are visible
              instantly and both matter.
            </p>
            <p className="mt-4">
              <strong>Five: does the teacher ask questions back.
              </strong> A real Physics class is a dialogue, not a
              monologue. The teacher should be asking the class
              three to five times in thirty minutes. If a teacher
              lectures for 45 minutes straight without checking
              comprehension, the 400 students behind your child are
              in a lot of trouble.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Why is same-teacher continuity across Class 11 and 12 such a big deal?
            </h2>
            <p>
              Think of learning Physics the way you would think of
              learning to cook with one head chef versus rotating
              head chefs every year. Year one, chef A learns that
              the student confuses salt for sugar, never sharpens
              knives, and rushes the onions. Year two, chef B starts
              from scratch, re-discovering those habits chapter by
              chapter, three months into a two-year programme. The
              student loses the second half of year two before
              anyone notices.
            </p>
            <p className="mt-4">
              NEET Physics works the same way. Teacher continuity
              gives you two specific things. One, misconception
              tracking. The teacher remembers which student confused
              friction with normal reaction in August and checks on
              it in January. Two, pace calibration. The teacher
              knows this student needs one extra practice session on
              rotational motion because last year&apos;s angular
              kinematics gave them trouble.
            </p>
            <p className="mt-4">
              Most large institutes rotate Physics teachers between
              Class 11 and Class 12 for operational reasons. Some
              students do fine regardless. Many do not. The honest
              question to ask at admissions is: who specifically will
              teach my child&apos;s Physics in Class 12 if I enrol
              today? If the answer is &quot;we will assign based on
              Class 12 intake,&quot; it is a rotation, and you should
              know that going in.
            </p>
          </section>

          <InfographicQuote
            quote="The best signal of a Physics teacher is not their board or their brochure. It is whether they remember the weak chapter of the third-row student from two weeks ago. You can feel that in the first hour of a real class."
            attribution="Neeraj Gupta"
            role="Founder, ProNEET · 20+ years teaching Physics, ex-Narayana, Bansal Classes, Excel Physics"
            image="/photos/neeraj-gupta.png"
            imageAlt="Neeraj Gupta, founder of ProNEET, Mansarovar Jaipur"
          />

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              How much should a good NEET Physics teacher cost in Jaipur?
            </h2>
            <p>
              Three price bands in the Jaipur market as of April
              2026. All of them buy a reasonable teacher; the
              difference is teaching time per student.
            </p>
            <p className="mt-4">
              <strong>Bundle with a full NEET programme: ₹40,000-
              70,000 per year for Physics.</strong> This is the cheapest
              route if your child also needs Chemistry and Biology
              coaching under the same roof. Allen Jaipur, Aakash,
              Resonance all price Physics inside the bundle;
              breaking it out is not always possible but this is the
              effective rate.
            </p>
            <p className="mt-4">
              <strong>Small-batch Physics-plus-Chemistry programme:
              ₹60,000-1,20,000 per year.</strong> The price point
              ProNEET and a few other specialist setups occupy.
              Justifiable when the family already has strong Biology
              or Maths coverage elsewhere and needs real senior-
              teacher time in the two hardest subjects.
            </p>
            <p className="mt-4">
              <strong>Standalone 1:1 or micro-group Physics tuition:
              ₹600-1,200 per hour, depending on the teacher&apos;s
              seniority.</strong> Economical only if the student needs
              10-30 hours of targeted intervention for specific
              weak chapters, not as a long-term coaching substitute.
              Genuinely senior teachers at this price are rare and
              booked out; most &quot;premium&quot; 1:1 Physics tuition in
              Jaipur is offered by mid-career teachers moonlighting
              from a daytime job, which is fine for problem-solving
              support and weaker for foundation-building.
            </p>
            <p className="mt-4">
              Anything significantly cheaper than these bands is a
              junior teacher taking a first or second job. That is
              not automatically wrong; some of those teachers become
              great in five years. It is something you want to know
              before you commit your child&apos;s Class 11 foundation
              to them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              What is the red flag that should make you walk away?
            </h2>
            <p>
              One specific red flag, more reliable than any other.
              The institute will not let you sit in on a normal live
              class before enrolment.
            </p>
            <p className="mt-4">
              They will offer a demo class. That is not the same
              thing. Demo classes are short, curated, taught by the
              best available teacher, and attended by parents. The
              daily live class is longer, less polished, taught by
              whoever happens to be teaching your child&apos;s batch,
              and it is the thing your child will sit through every
              day for 24 months. If the institute will not let you
              see the real one, the real one is worse than the demo
              one, and they know it.
            </p>
            <p className="mt-4">
              When we say no to a student we should not take, we
              are usually also saying no to a family that walked in
              already knowing we would not be a fit. The honest
              institutes embrace the live-class visit because it
              filters for families who will actually thrive with
              them. If admissions hedges on this request, politely
              leave. It is the cheapest filter in this entire
              decision.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Can we sit in on a live ProNEET Physics class?
            </h2>
            <p>
              Yes. We do this every week. Neeraj sir teaches Physics
              personally, Vivek sir teaches Chemistry, and the
              batches are capped at 30. Walk into a real session at
              the Mansarovar Sector 8 classroom with your child, no
              counsellor presentation, no sales pitch. Watch the
              class for 60-90 minutes, ask any question at the end,
              then leave. If we are the right fit, you will know.
              If we are not, you will also know, which is equally
              useful. Call{" "}
              <a
                href={`tel:${SITE.phone}`}
                className="text-brand font-medium underline underline-offset-2"
              >
                {SITE.phoneDisplay}
              </a>
              {" "}to book the visit.
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
                href="/blog/best-neet-coaching-in-jaipur"
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 group hover:shadow-tier-sm transition"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    7-point parent checklist
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Before you sign any NEET coaching contract
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
                    Meet Neeraj Gupta
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    20+ years teaching Physics, ex-Narayana & Bansal
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
                    Side-by-side for the mega-brand comparison
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
                    Sit in on a live class
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    No sales pitch. Real class. 60-90 minutes.
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
          eyebrow="PHYSICS TEACHER · FAQ"
          heading="What parents ask after reading this"
          items={FAQS}
        />
      </div>
    </main>
  );
}
