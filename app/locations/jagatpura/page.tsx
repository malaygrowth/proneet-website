import type { Metadata } from "next";
import { CatchmentPage } from "@/components/sections/catchment-page";
import { LOCATIONS } from "@/lib/locations";

const loc = LOCATIONS.find((l) => l.slug === "jagatpura")!;

export const metadata: Metadata = {
  title: `NEET & JEE Coaching from ${loc.name}, Jaipur`,
  description: loc.description,
  alternates: { canonical: `/locations/${loc.slug}` },
};

export default function JagatpuraPage() {
  return (
    <CatchmentPage
      config={{
        slug: loc.slug,
        name: loc.name,
        direction: "east",
        distanceKm: "14-18 km",
        fastestTime: "25 min",
        typicalTime: "35-45 min in peak traffic",
        routes: [
          {
            via: "Via JLN Marg + Tonk Road connector",
            time: "25-32 min",
            modes: ["two-wheeler", "car"],
          },
          {
            via: "Via Ring Road and Malviya Nagar cut-through",
            time: "30-40 min",
            modes: ["two-wheeler", "car"],
          },
          {
            via: "Jagatpura Metro (Pink Line) to Mansarovar",
            time: "40-50 min total incl. walks",
            modes: ["metro"],
          },
        ],
        landmarks: [
          "Mahatma Gandhi Hospital and Medical College adjacency",
          "Dense Class 10-12 CBSE and RBSE school belt",
          "Rajasthan University South Campus (PUC area)",
          "Residential sectors in Mahapura and Jagatpura proper",
          "New, growing residential townships along Jaipur-Agra bypass",
        ],
        whyHere:
          "Jagatpura is at the edge of what we honestly call a viable daily commute. Students who still pick our classroom from Jagatpura typically do it for one specific reason: they tested a local Jagatpura or Mahatma Gandhi area coaching, found it was either a junior faculty running the live class or a very small tuition setup without test infrastructure, and wanted senior faculty + structured rhythm. The 25-minute ride (off-peak) is the trade-off they make for that. We want to be upfront that this is a longer commute than most of our catchments.",
        whenNotToCommute:
          "For Jagatpura residents, the 1-on-1 online track is very often the better fit, not a consolation prize. You save 4-6 hours per week of transit time which turns into real self-study and sleep. The senior faculty is the same. If the family is choosing between a 35-minute classroom commute and a 0-minute online session with Neeraj or Vivek sir, the honest answer is: for most Jagatpura students, online wins.",
        faqs: [
          {
            question: "Is the commute from Jagatpura to Mansarovar realistic for two years?",
            answer:
              "For off-peak afternoon or evening slots, yes. 25 minutes each way is doable. For 8 AM morning slots, especially during Class 12 exam season, the commute starts taking 40-50 minutes and competes with self-study time when it matters most. Most Jagatpura students who completed our full 2-year programme ended up switching to the online track by Class 12.",
          },
          {
            question: "Are there senior-faculty NEET coachings in Jagatpura itself?",
            answer:
              "Limited. Jagatpura has a handful of tuition setups and a couple of mid-tier coaching branches, but the concentration of senior NEET faculty is lower than in the Mansarovar-Vaisali-Malviya triangle. Most families we have taught from Jagatpura told us this was the primary reason they looked outward.",
          },
          {
            question: "Can my child do 1-on-1 online with the same Neeraj sir who teaches the classroom?",
            answer:
              "Yes, this is the main reason the 1-on-1 online track exists. Neeraj Gupta personally teaches online sessions just as he teaches the classroom. Vivek Patidar takes Chemistry online. The experience is as close to the classroom as we can make it, without the commute.",
          },
          {
            question: "What about a hybrid of classroom and online?",
            answer:
              "We do not actively recommend this. Inconsistent delivery makes it harder for the teacher to track your child's specific weak chapters and harder for the student to build routine. Pick one track and stay on it for a full term at least. We will tell you after a month-1 diagnostic which track is working better for your child.",
          },
          {
            question: "Is there a coaching hostel near Mansarovar if my child wants to relocate from Jagatpura?",
            answer:
              "Most Jaipur NEET and JEE students live with parents; hostel concentration is in Kota and Sikar, not Jaipur. If a Jagatpura family is considering hostel-based prep, we would probably advise looking at Kota or Sikar for that specific scenario, not a Jaipur cross-city relocation. We are honest that we do not run a residential programme.",
          },
        ],
      }}
    />
  );
}
