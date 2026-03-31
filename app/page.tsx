import { Hero } from "@/components/sections/hero";
import { ProofBar } from "@/components/sections/proof-bar";
import { GradientBridge } from "@/components/sections/gradient-bridge";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProofBar />
      <GradientBridge />
      <div className="h-screen flex items-center justify-center text-slate-400">
        More sections coming...
      </div>
    </main>
  );
}
