"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

const SCENES = [
  {
    src: "/photos/classroom-batch.webp",
    alt: "ProNEET classroom in session, students with Neeraj sir at the back of the room",
    caption: "A live batch in Mansarovar Sector 8",
    tall: true,
  },
  {
    src: "/photos/students-batch.webp",
    alt: "Group photo of a ProNEET batch outside the institute",
    caption: "One of last year's batches",
    tall: false,
  },
  {
    src: "/photos/students-with-neeraj.webp",
    alt: "Neeraj Gupta with senior students in the institute courtyard",
    caption: "Senior students with Neeraj sir",
    tall: false,
  },
  {
    src: "/photos/classroom-empty.webp",
    alt: "The ProNEET classroom seating, capped at 30 seats",
    caption: "30 seats. That's the cap.",
    tall: false,
  },
];

export function Scenes() {
  return (
    <section className="relative py-24 sm:py-30 overflow-hidden bg-white">
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <ScrollReveal className="text-center mb-12 sm:mb-16">
          <span className="inline-block font-mono text-xs text-accent-orange tracking-widest uppercase">
            INSIDE THE INSTITUTE
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            The room. The batch. The faces.
          </h2>
          <p className="mt-3 text-base text-slate-500 max-w-lg mx-auto">
            Not stock photos. Not renders. The actual classroom in
            Mansarovar Sector 8 and the students who&apos;ve sat in it.
          </p>
        </ScrollReveal>

        {/* Photo grid: 1 tall portrait + 3 stacked landscapes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {/* Tall hero photo on the left, spans 2 rows on md+ */}
          <ScrollReveal direction="left" delay={0.1} className="md:row-span-2">
            <figure className="group relative h-[420px] md:h-full min-h-[420px] rounded-xl overflow-hidden shadow-tier-md">
              <Image
                src={SCENES[0].src}
                alt={SCENES[0].alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div
                className="absolute inset-x-0 bottom-0 p-5"
                style={{
                  background:
                    "linear-gradient(to top, rgba(15, 23, 42, 0.85), transparent)",
                }}
              >
                <figcaption className="text-sm font-medium text-white">
                  {SCENES[0].caption}
                </figcaption>
              </div>
            </figure>
          </ScrollReveal>

          {/* Three smaller scenes on the right */}
          {SCENES.slice(1).map((scene, i) => (
            <ScrollReveal
              key={scene.src}
              direction="right"
              delay={0.15 + i * 0.08}
              className="md:col-span-1"
            >
              <figure className="group relative h-[200px] md:h-[210px] rounded-xl overflow-hidden shadow-tier-sm">
                <Image
                  src={scene.src}
                  alt={scene.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-x-0 bottom-0 p-3"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(15, 23, 42, 0.85), transparent)",
                  }}
                >
                  <figcaption className="text-xs font-medium text-white">
                    {scene.caption}
                  </figcaption>
                </div>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
