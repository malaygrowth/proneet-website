import { Hero } from "@/components/sections/hero";
import { ProofBar } from "@/components/sections/proof-bar";
import { GradientBridge } from "@/components/sections/gradient-bridge";
import { Manifesto } from "@/components/sections/manifesto";
import { Method } from "@/components/sections/method";
import { TeacherShowcase } from "@/components/sections/teacher-showcase";
import { Programs } from "@/components/sections/programs";
import { StudentJourneys } from "@/components/sections/student-journeys";
import { Differentiator } from "@/components/sections/differentiator";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { FAQJsonLd } from "@/components/seo/json-ld";

const FAQ_DATA = [
  {
    q: "I'm a dropper. Is it too late?",
    a: "Absolutely not. Many of our top rankers were droppers. Our Dropper Batch is specifically designed for students who want to make their gap year count — with intensive revision, daily practice, and mentorship to keep you motivated.",
  },
  {
    q: "I'm weak in Physics basics. Will I keep up?",
    a: "Yes. We start every batch with a Day 1 diagnostic test to understand exactly where you stand. From there, we rebuild your concepts brick by brick — no assumptions, no skipping.",
  },
  {
    q: "How is this different from YouTube?",
    a: "YouTube gives you content. ProNEET gives you structure, accountability, weekly tests, and same-day doubt clearing. You'll have a teacher who knows your name and tracks your progress.",
  },
  {
    q: "What if I miss a live class?",
    a: "Every class is recorded and available within hours. You can watch at your own pace, and your doubts will still be cleared in the next session.",
  },
  {
    q: "How do I track my child's progress?",
    a: "You'll receive a detailed weekly progress report covering test scores, attendance, and areas of improvement. You also get direct access to a student counselor.",
  },
  {
    q: "What are the teacher's qualifications?",
    a: "Er. Neeraj Gupta holds a B.Tech degree with a Physics specialization and has 25+ years of teaching experience. He has mentored 10,000+ students, with 500+ NEET selections.",
  },
  {
    q: "What is the fee structure?",
    a: "We maintain transparent pricing with no hidden charges. EMI options are available. Please call us for specific program fees.",
  },
  {
    q: "How many students per batch?",
    a: "Every batch is strictly capped at 30 students. This ensures each student gets personal attention and their doubts are addressed the same day.",
  },
];

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProofBar />
      <GradientBridge />
      <Manifesto />
      <Method />
      <TeacherShowcase />
      <Programs />
      <StudentJourneys />
      <Differentiator />
      <FAQ />
      <FinalCTA />
      <FAQJsonLd faqs={FAQ_DATA} />
    </main>
  );
}
