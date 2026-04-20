import type { Metadata } from "next";
import { CatchmentPage } from "@/components/sections/catchment-page";
import { LOCATIONS } from "@/lib/locations";

const loc = LOCATIONS.find((l) => l.slug === "tonk-road")!;

export const metadata: Metadata = {
  title: `NEET & JEE Coaching from ${loc.name}, Jaipur`,
  description: loc.description,
  alternates: { canonical: `/locations/${loc.slug}` },
};

export default function TonkRoadPage() {
  return (
    <CatchmentPage
      config={{
        slug: loc.slug,
        name: loc.name,
        direction: "north-east",
        distanceKm: "10-16 km",
        fastestTime: "20 min",
        typicalTime: "28-38 min in peak traffic",
        routes: [
          {
            via: "Via JLN Marg + Malviya Nagar connector",
            time: "20-28 min",
            modes: ["two-wheeler", "car"],
          },
          {
            via: "Via Riddhi Siddhi Circle and Gopalpura Bypass",
            time: "25-35 min",
            modes: ["two-wheeler", "auto", "car"],
          },
          {
            via: "Bus or shared auto to Gopalpura, then local to Mansarovar",
            time: "35-45 min total",
            modes: ["bus", "auto"],
          },
        ],
        landmarks: [
          "Tonk Road CBSE school belt (from B2 Bypass to Sanganer)",
          "Sanganer, Durgapura, Malviya Nagar adjacency depending on stretch",
          "Jaipur Airport proximity for families commuting across the road",
          "Dense Class 10-12 NEET/JEE aspirant concentration",
          "Multiple mid-tier Jaipur coaching branches along the Tonk Road corridor",
        ],
        whyHere:
          "Tonk Road is long, and where on Tonk Road you live changes the honest answer. Residents near Riddhi Siddhi or Malviya Nagar-facing stretches are within a reasonable 20-25 minute reach. Residents further south towards Sanganer or the airport are realistically 35+ minutes away and should treat ProNEET classroom enrolment as a high-commitment decision. The Tonk Road stretch also has multiple local coaching branches; the differentiator for us vs those is the 30-seat cap and the founder teaching Physics personally. If that is not your primary criterion, a Tonk Road-based coaching is probably closer to home and fine.",
        whenNotToCommute:
          "If you live south of Sanganer Circle or towards the airport, the round trip on any given day cuts into 2 hours of student time. For a two-year programme that is 500+ hours traded for seat attendance. Our honest advice for that belt is to try the 1-on-1 online track for a month and compare it against any local Tonk Road coaching you were considering. Same senior faculty at ProNEET, no 2 hours a day of Tonk Road traffic.",
        faqs: [
          {
            question: "I live on Tonk Road near Riddhi Siddhi. Is ProNEET a reasonable commute?",
            answer:
              "Yes. From the Riddhi Siddhi stretch, the Gopalpura Bypass route is 20-25 minutes. Students from this area have joined and completed the full 2-year programme with us. The commute is manageable because it mostly avoids the Tonk Road peak-hour bottleneck.",
          },
          {
            question: "What about from Sanganer or the Jaipur Airport side?",
            answer:
              "Farther than we typically recommend for a daily commute. 35-45 minutes each way in peak season is a lot to sustain through Class 12. We would honestly suggest starting with the 1-on-1 online programme and evaluating after a month. If you want to physically visit, come to the Mansarovar classroom weekly for a doubt session while the bulk of teaching happens online.",
          },
          {
            question: "Are there enough NEET coachings on Tonk Road itself?",
            answer:
              "Yes, several. If location proximity is your primary criterion and you have done the work to verify the senior-faculty question at a Tonk Road coaching, that is a reasonable choice. Our value is specifically the small-batch founder-led model; if that is not why you are shopping, a Tonk Road local coaching is probably the better call for you.",
          },
          {
            question: "Can I take a test series from ProNEET even if I study at a Tonk Road coaching?",
            answer:
              "Generally no; our test series is integrated with our classroom teaching and not offered standalone. But if you are doing self-study and want a specific subject as 1-on-1 online while using a Tonk Road institute for other subjects, that hybrid is workable. Call the admissions line and we will help you think through the logistics.",
          },
          {
            question: "Is the cross-city Tonk Road to Mansarovar commute safe for girls?",
            answer:
              "The Gopalpura Bypass route is well-lit and busy until 9 PM. We hold classroom timings to 8 PM maximum, and we see a lot of students picked up by parents from the building. From Tonk Road, the 20-25 minute route from the Malviya Nagar or Riddhi Siddhi stretch is straightforward. The longer Sanganer-and-southward commute is where we would flag the safety conversation as more serious, and where online becomes the clear alternative.",
          },
        ],
      }}
    />
  );
}
