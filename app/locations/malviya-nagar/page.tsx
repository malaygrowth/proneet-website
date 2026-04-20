import type { Metadata } from "next";
import { CatchmentPage } from "@/components/sections/catchment-page";
import { LOCATIONS } from "@/lib/locations";

const loc = LOCATIONS.find((l) => l.slug === "malviya-nagar")!;

export const metadata: Metadata = {
  title: `NEET & JEE Coaching from ${loc.name}, Jaipur`,
  description: loc.description,
  alternates: { canonical: `/locations/${loc.slug}` },
};

export default function MalviyaNagarPage() {
  return (
    <CatchmentPage
      config={{
        slug: loc.slug,
        name: loc.name,
        direction: "east",
        distanceKm: "6-8 km",
        fastestTime: "12 min",
        typicalTime: "15-20 min in peak traffic",
        routes: [
          {
            via: "Via Gopalpura Bypass",
            time: "12-15 min",
            modes: ["two-wheeler", "auto", "car"],
          },
          {
            via: "Via JLN Marg + Tonk Road",
            time: "18-22 min",
            modes: ["auto", "car"],
          },
          {
            via: "Mansarovar Metro (Pink Line, 1 stop)",
            time: "15-18 min total incl. walk",
            modes: ["metro"],
          },
        ],
        landmarks: [
          "Malviya Nagar Institutional Area (MNIT, RTU adjacent)",
          "World Trade Park, Malviya Industrial Area",
          "Jawaharlal Nehru Marg commercial stretch",
          "Residential sectors with easy two-wheeler access",
          "D-Block, E-Block, H-Block predominantly student housing",
        ],
        whyHere:
          "Malviya Nagar has a dense MNIT-adjacent student population and a lot of Class 10-12 students in the CBSE schools around JLN Marg. Students we see commuting from Malviya Nagar usually come for one specific reason: they tried a nearby coaching that turned out to be junior faculty running the live class, and they wanted senior teachers back. The 12-15 minute ride for that is, in their words, worth it. If you are weighing a Malviya Nagar-based option vs. ProNEET, the differentiator is who teaches your child on a normal Tuesday.",
        whenNotToCommute:
          "If your morning slot forces you onto Gopalpura Bypass during 8:00-9:30 AM peak, the commute can stretch to 25+ minutes. For strictly morning batches in exam season, some families find the 1-on-1 online track less stressful on the student, who has more time for self-study instead of sitting in traffic.",
        faqs: [
          {
            question: "I live in Malviya Nagar D-Block. What's the fastest way to Mansarovar Sector 8?",
            answer:
              "Two-wheeler via Gopalpura Bypass is the fastest off-peak route at about 12 minutes. During peak morning traffic, the Metro via Mansarovar station is actually more reliable even though it's slightly longer end-to-end, because it is not subject to Bypass snarls.",
          },
          {
            question: "Are there NEET coaching options in Malviya Nagar itself?",
            answer:
              "Yes. Several local Jaipur mid-tier institutes have Malviya Nagar branches, and one national brand runs a satellite campus there. The question is the same as anywhere else: is the live teacher on a normal day the senior faculty advertised, or a junior running the class? We do not charge a premium against those options; we just make sure the teacher question has a clear answer.",
          },
          {
            question: "My child is Class 11 CBSE in Malviya Nagar. Is the commute sustainable for two years?",
            answer:
              "For students under ~8 km away, yes. Beyond that, the commute starts competing with self-study time in Class 12 when it matters most. Most Malviya Nagar students who started with us in Class 11 were still with us in Class 12. The students who struggled were typically further out (Tonk Road, Jagatpura) and switched to 1-on-1 online in Class 12 after the first year.",
          },
          {
            question: "Is there safe evening transport back from Mansarovar to Malviya Nagar?",
            answer:
              "Autos are reliable from Madhyam Marg in the evening. Many students get picked up by parents at the building entrance; we hold classroom timings to 8 PM maximum so pickup is not in late hours. Sisters and female students commute freely on this route.",
          },
          {
            question: "Can you also teach me Maths or Biology at the classroom?",
            answer:
              "No. We teach Physics and Chemistry only. Students pair ProNEET with their own Biology coaching (for NEET) or Maths coaching (for JEE). Most Malviya Nagar students we have taught do their Biology/Maths with an institute near home, which actually makes the ProNEET commute more manageable — it replaces one subject's travel, not all of it.",
          },
        ],
      }}
    />
  );
}
