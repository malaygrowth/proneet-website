import { Hero } from "@/components/sections/hero";
import { ProofBar } from "@/components/sections/proof-bar";
import { GradientBridge } from "@/components/sections/gradient-bridge";
import { Manifesto } from "@/components/sections/manifesto";
import { Method } from "@/components/sections/method";
import { TeacherShowcase } from "@/components/sections/teacher-showcase";
import { Programs } from "@/components/sections/programs";

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
      <div className="h-96 flex items-center justify-center text-slate-400">
        More sections coming...
      </div>
    </main>
  );
}
