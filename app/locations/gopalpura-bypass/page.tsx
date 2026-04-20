import type { Metadata } from "next";
import { CatchmentPage } from "@/components/sections/catchment-page";
import { LOCATIONS } from "@/lib/locations";

const loc = LOCATIONS.find((l) => l.slug === "gopalpura-bypass")!;

export const metadata: Metadata = {
  title: `NEET & JEE Coaching from ${loc.name}, Jaipur`,
  description: loc.description,
  alternates: { canonical: `/locations/${loc.slug}` },
};

export default function GopalpuraBypassPage() {
  return (
    <CatchmentPage
      config={{
        slug: loc.slug,
        name: loc.name,
        direction: "east",
        distanceKm: "2-6 km",
        fastestTime: "5 min",
        typicalTime: "8-15 min in peak traffic",
        routes: [
          {
            via: "Directly along Gopalpura Bypass",
            time: "5-12 min",
            modes: ["two-wheeler", "auto", "car"],
          },
          {
            via: "Via Triveni Flyover cut-through",
            time: "8-12 min",
            modes: ["two-wheeler", "car"],
          },
          {
            via: "Via internal Mansarovar sector roads",
            time: "10-14 min",
            modes: ["two-wheeler", "auto"],
          },
        ],
        landmarks: [
          "Gopalpura Bypass commercial stretch (the spine itself)",
          "Triveni Flyover and Triveni Circle",
          "Shyam Nagar residential sectors immediately adjacent",
          "Durgapura, Riddhi Siddhi Circle adjacency",
          "Easy onward connection to Ajmer Road, JLN Marg, Tonk Road",
        ],
        whyHere:
          "Gopalpura Bypass is our closest non-Mansarovar catchment by some distance. For residents living along the Bypass between Triveni Circle and Durgapura, we are effectively a neighbourhood coaching — 5-12 minutes door to door most of the day. Students from this belt are usually already considering several coachings on the Bypass itself; the decision is less about commute and more about what kind of batch size and teacher they want. The Bypass has everything from 300-seat mega-branches to single-teacher tuitions. We sit between those two extremes.",
        whenNotToCommute:
          "If you live north of Triveni Circle towards C-Scheme or Bani Park, the commute is no longer trivial — it is 20+ minutes and crosses multiple traffic signals. In that case, either pick a coaching actually near your home, or use the 1-on-1 online track from ProNEET to avoid the cross-town route entirely.",
        faqs: [
          {
            question: "I live on Gopalpura Bypass near Triveni Flyover. How far is your classroom?",
            answer:
              "Depending on which side of the flyover you are on, it is 5-10 minutes to Madhyam Marg. Our classroom is a short turn off the Bypass, not inside a dense maze. Most students from this stretch walk or take a two-wheeler and park at our building.",
          },
          {
            question: "There are several big coachings on Gopalpura Bypass already. Why come to ProNEET?",
            answer:
              "The Bypass does have strong national-brand satellite branches. Whether to pick one of those vs ProNEET comes down to whether you want a 150-400 seat classroom with Sikar/Kota-imported material or a 30-seat classroom with the founder teaching Physics himself. Both approaches work; they suit different students. We just commit explicitly to one of them.",
          },
          {
            question: "I'm a dropper living on Gopalpura Bypass. What's the ProNEET dropper batch like?",
            answer:
              "Our dropper batch is one-year intensive, capped at a smaller number than the Class 11-12 batches, with a mandatory Week 1 diagnostic before syllabus planning. Most Bypass-resident droppers we have taught valued the proximity — short commute plus home base means more time for self-study, which is where dropper attempts actually succeed or fail.",
          },
          {
            question: "Is parking easy at the classroom?",
            answer:
              "Yes. Two-wheeler parking is inside the building compound, free. Car parking is available on Madhyam Marg immediately outside. Given how close Gopalpura Bypass residents are, many families walk or drop off from the main road.",
          },
          {
            question: "Can I come for just Physics, and not Chemistry?",
            answer:
              "Yes. We run Physics-only options, especially for students who already have a Chemistry coaching they are happy with on the Bypass. The 1-on-1 online track is the cleanest way to take just Physics or just Chemistry; the classroom is more typically both subjects together for the 2-year programme.",
          },
        ],
      }}
    />
  );
}
