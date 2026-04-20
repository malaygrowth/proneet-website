import { Hero } from "@/components/sections/hero";
import { ProofBar } from "@/components/sections/proof-bar";
import { GradientBridge } from "@/components/sections/gradient-bridge";
import { Manifesto } from "@/components/sections/manifesto";
import { Method } from "@/components/sections/method";
import { TeacherShowcase } from "@/components/sections/teacher-showcase";
import { Programs } from "@/components/sections/programs";
import { StudentJourneys } from "@/components/sections/student-journeys";
import { Scenes } from "@/components/sections/scenes";
import { Differentiator } from "@/components/sections/differentiator";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { FAQJsonLd } from "@/components/seo/json-ld";

// Mirror of the FAQ content displayed in the FAQ section. Kept in sync so
// that the rich-result JSON-LD doesn't drift from what's on the page.
const FAQ_DATA = [
  {
    q: "I'm a dropper. Is it too late for me?",
    a: "Droppers are a regular part of every batch. The Dropper Batch starts with a diagnostic so we know exactly which chapters to rebuild. You're not starting over, you're starting smarter.",
  },
  {
    q: "My Physics is weak. Will I keep up in class?",
    a: "That's the norm, not the exception. Neeraj sir rebuilds fundamentals from Class 9 level if needed. Nobody's been kicked out of a batch for asking a basic question.",
  },
  {
    q: "How is this different from Unacademy or YouTube?",
    a: "YouTube is free and you'll learn plenty from it, but it won't know you didn't finish your DPP, it won't call your parents, and it won't notice your face is off on Wednesday. A small live batch does all of that.",
  },
  {
    q: "Is it Hindi medium or English medium?",
    a: "Both. The teacher switches to Hindi when a concept needs it and back to English when problems need precision. You don't have to pick in advance.",
  },
  {
    q: "How many students in each batch?",
    a: "Capped at 30. That cap is the whole point of ProNEET, it is not a marketing claim we soften later.",
  },
  {
    q: "Who actually teaches my child?",
    a: "Neeraj Gupta takes Physics himself. Vivek Patidar takes Maths. Same two teachers through the two-year programme, no panel rotation.",
  },
  {
    q: "What are the fees?",
    a: "Fees depend on the batch and the number of subjects. Call the Admissions line and we will send the breakdown for the specific programme. EMI options are available.",
  },
  {
    q: "Where is the classroom?",
    a: "Vishveshwar Nagar, off Gopalpura Bypass near the Triveni flyover in Jaipur. Easy reach from Mansarovar, Malviya Nagar, C-Scheme and Tonk Road.",
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
      <Scenes />
      <Differentiator />
      <FAQ />
      <FinalCTA />
      <FAQJsonLd faqs={FAQ_DATA} />
    </main>
  );
}
