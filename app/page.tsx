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
    </main>
  );
}
