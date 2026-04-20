// Key Takeaways box. Sits below the H1+byline on long pages so scanners
// (and AI engines extracting first-block content) get the full argument
// in 30 seconds. Handbook §4.5: 5-6 bullets, 3+ with specific numbers.

import { CheckCircle2 } from "lucide-react";

interface KeyTakeawaysProps {
  bullets: string[];
}

export function KeyTakeaways({ bullets }: KeyTakeawaysProps) {
  return (
    <aside
      aria-label="Key takeaways"
      className="rounded-2xl border border-brand/15 bg-brand/[0.04] p-6 sm:p-8"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-accent-orange mb-4">
        Key takeaways
      </p>
      <ul className="space-y-3">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
            <span className="text-sm text-slate-700 leading-relaxed">
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
