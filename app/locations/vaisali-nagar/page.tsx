import type { Metadata } from "next";
import { CatchmentPage } from "@/components/sections/catchment-page";
import { LOCATIONS } from "@/lib/locations";

const loc = LOCATIONS.find((l) => l.slug === "vaisali-nagar")!;

export const metadata: Metadata = {
  title: `NEET & JEE Coaching from ${loc.name}, Jaipur`,
  description: loc.description,
  alternates: { canonical: `/locations/${loc.slug}` },
};

export default function VaisaliNagarPage() {
  return (
    <CatchmentPage
      config={{
        slug: loc.slug,
        name: loc.name,
        direction: "south",
        distanceKm: "5-7 km",
        fastestTime: "10 min",
        typicalTime: "12-18 min in peak traffic",
        routes: [
          {
            via: "Via Ajmer Road (most direct)",
            time: "10-14 min",
            modes: ["two-wheeler", "auto", "car"],
          },
          {
            via: "Via Sector 9 and 10 internal roads",
            time: "14-18 min",
            modes: ["two-wheeler", "auto"],
          },
          {
            via: "Shared auto stand near Vaisali Metro (planned) / ISBT",
            time: "18-22 min",
            modes: ["auto", "bus"],
          },
        ],
        landmarks: [
          "Vaisali Nagar circle and 80 Feet Road commercial stretch",
          "Pink City Mall and residential sectors V-1 through V-8",
          "Schools: Warren Academy, Cambridge Court, SDPS",
          "Dense Class 10-12 CBSE/RBSE student population",
          "Adjacent to Patrakar Colony and Nirman Nagar",
        ],
        whyHere:
          "Vaisali Nagar is Jaipur's quiet suburban middle-class heart, and a significant share of our students come from here. The neighbourhood already has a handful of NEET coachings, but what pulls Vaisali Nagar parents towards us specifically is the small-batch structure — the local Vaisali setups are either large-brand mid-tier institutes with rotating panels or tiny single-teacher tuitions. ProNEET sits in a specific niche of senior-faculty, small-batch that the Vaisali market does not cover well.",
        whenNotToCommute:
          "If you live beyond the Vaisali Nagar outer ring towards Sanganer or Sodala, the commute stretches beyond 20 minutes and you are trading away self-study time in Class 12. For students in that belt, the 1-on-1 online programme with the same senior faculty is the better balance.",
        faqs: [
          {
            question: "I'm in Vaisali Nagar V-3. How do I reach the Mansarovar classroom?",
            answer:
              "Ajmer Road is the simplest route — it's under 10 minutes off-peak and 14 minutes in peak traffic. You will turn into Madhyam Marg just before Mansarovar Metro. Two-wheeler or auto; parking is available for both at the classroom.",
          },
          {
            question: "Is the commute safe for a school-going girl from Vaisali Nagar?",
            answer:
              "Ajmer Road is well-lit and busy until late evening. Most female students we teach from Vaisali Nagar come with a parent for drop-off and pickup, or share an auto with a batchmate. Evening classes end at 8 PM maximum, which is before peak risk hours. If your family prefers the student does not commute at all, the 1-on-1 online track is available for exactly this case.",
          },
          {
            question: "How does ProNEET compare to the coaching options already in Vaisali Nagar?",
            answer:
              "Vaisali Nagar has strong mid-tier brand options (several of the local Jaipur institutes run Vaisali Nagar branches). The primary difference is structural: ProNEET is capped at 30 seats with the founder teaching Physics himself. The Vaisali Nagar mid-tier options typically run 60-120 per classroom with a mix of senior and junior faculty. We are not cheaper than them by much, and we do not claim to have more students. What we offer is a different density of teacher attention, which is why the commute may or may not be worth it for your specific child.",
          },
          {
            question: "Can my child combine school in Vaisali Nagar with your evening batch?",
            answer:
              "Yes, most Class 11-12 students are in school until 2-3 PM and then come to us for the afternoon or evening batch. Ajmer Road traffic in that window is lighter than morning peak, so the commute is actually easier than a morning slot would be. We build the schedule with school timings as the constraint.",
          },
          {
            question: "What if I want to start in Class 10 itself from Vaisali Nagar?",
            answer:
              "We run a foundation-level Physics programme for serious Class 10 students who are already targeting NEET or JEE from Class 11. It is a smaller commitment (2-3 classes a week) and helps with board exam Physics alongside. Call admissions to discuss — we will tell you honestly if your child is ready for a foundation track or would benefit more from starting in Class 11.",
          },
        ],
      }}
    />
  );
}
