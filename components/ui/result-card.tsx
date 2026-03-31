import { cn } from "@/lib/utils";

interface ResultCardProps {
  name: string;
  college: string;
  rank: number;
  year: number;
  score?: number;
  maxScore?: number;
  featured?: boolean;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function ResultCard({
  name,
  college,
  rank,
  year,
  score,
  maxScore = 720,
  featured = false,
  className,
}: ResultCardProps) {
  const initials = getInitials(name);
  const scorePercent = score ? (score / maxScore) * 100 : 0;

  return (
    <div
      className={cn(
        "glass rounded-xl p-4 flex items-center gap-4",
        featured && "bg-white/10",
        className
      )}
    >
      {/* Avatar */}
      <div
        className="shrink-0 flex items-center justify-center rounded-full text-sm font-bold text-white"
        style={{
          width: 44,
          height: 44,
          background: "linear-gradient(135deg, #2563EB, #A855F7)",
        }}
      >
        {initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{name}</p>
        <p className="text-xs text-white/50 truncate">{college}</p>

        {/* Score bar */}
        {score != null && (
          <div className="mt-2 h-1 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${scorePercent}%`,
                background:
                  "linear-gradient(90deg, #2563EB, #A855F7, #F97316)",
              }}
            />
          </div>
        )}
      </div>

      {/* Rank + Year */}
      <div className="shrink-0 text-right">
        <p
          className={cn(
            "text-lg font-bold font-mono tabular-nums",
            featured
              ? "bg-gradient-to-r from-brand-light to-accent-orange bg-clip-text text-transparent"
              : "text-white"
          )}
        >
          AIR {rank}
        </p>
        <p className="text-xs text-white/40">NEET {year}</p>
      </div>
    </div>
  );
}
