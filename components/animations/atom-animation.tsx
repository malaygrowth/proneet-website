import { cn } from "@/lib/utils";

interface AtomAnimationProps {
  className?: string;
  size?: number;
}

export function AtomAnimation({ className, size = 380 }: AtomAnimationProps) {
  const center = size / 2;
  const nucleusSize = size * 0.08;
  const electronSize = size * 0.026;

  // Orbit radii relative to size
  const orbit1 = size * 0.32;
  const orbit2 = size * 0.42;
  const orbit3 = size * 0.26;

  return (
    <div
      aria-hidden="true"
      className={cn("relative", className)}
      style={{ width: size, height: size }}
    >
      {/* Orbit ring 1 — fast (8s) */}
      <div
        className="absolute rounded-full border border-white/10 animate-orbit-fast"
        style={{
          width: orbit1 * 2,
          height: orbit1 * 2,
          top: center,
          left: center,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Electron 1 */}
        <div
          className="absolute rounded-full"
          style={{
            width: electronSize,
            height: electronSize,
            background: "#3B82F6",
            boxShadow: "0 0 8px rgba(59, 130, 246, 0.6)",
            top: -electronSize / 2,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      {/* Orbit ring 2 — medium (12s, reverse) */}
      <div
        className="absolute rounded-full border border-white/10 animate-orbit-medium"
        style={{
          width: orbit2 * 2,
          height: orbit2 * 2,
          top: center,
          left: center,
          transform: "translate(-50%, -50%)",
          borderWidth: "1px",
          borderStyle: "dashed",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        {/* Electron 2 */}
        <div
          className="absolute rounded-full"
          style={{
            width: electronSize,
            height: electronSize,
            background: "#A855F7",
            boxShadow: "0 0 8px rgba(168, 85, 247, 0.6)",
            bottom: -electronSize / 2,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      {/* Orbit ring 3 — slow (18s) */}
      <div
        className="absolute rounded-full border border-white/[0.05] animate-orbit-slow"
        style={{
          width: orbit3 * 2,
          height: orbit3 * 2,
          top: center,
          left: center,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Nucleus */}
      <div
        className="absolute rounded-full"
        style={{
          width: nucleusSize,
          height: nucleusSize,
          top: center - nucleusSize / 2,
          left: center - nucleusSize / 2,
          background: "linear-gradient(135deg, #2563EB, #A855F7)",
          boxShadow:
            "0 0 24px rgba(37, 99, 235, 0.4), 0 0 48px rgba(168, 85, 247, 0.2)",
        }}
      />
    </div>
  );
}
