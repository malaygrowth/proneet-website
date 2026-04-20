// Registry of catchment-area pages for the Mansarovar classroom.
// Mansarovar is the classroom itself; the others are neighbourhoods
// students commute from. Each page is written for a parent in that
// specific neighbourhood looking at coaching options.

export interface LocationEntry {
  slug: string;
  name: string; // display name (Mansarovar, Malviya Nagar, ...)
  description: string; // meta description
  blurb: string; // one-sentence summary for cards
  travelTime: string; // e.g. "8-15 min to Mansarovar"
  role: "classroom" | "catchment";
  heroImage?: string;
  heroImageAlt?: string;
}

export const LOCATIONS: LocationEntry[] = [
  {
    slug: "mansarovar",
    name: "Mansarovar",
    description:
      "ProNEET small-batch NEET & JEE coaching in Mansarovar Sector 8. Physics by Neeraj Gupta, Chemistry by Vivek Patidar. 30-seat cap.",
    blurb:
      "Our classroom. 30-seat batches, senior faculty, Mon-Sat.",
    travelTime: "On-site · Madhyam Marg",
    role: "classroom",
    heroImage: "/photos/classroom-empty.webp",
    heroImageAlt: "ProNEET classroom interior on Madhyam Marg, Mansarovar Sector 8, Jaipur",
  },
  {
    slug: "malviya-nagar",
    name: "Malviya Nagar",
    description:
      "NEET & JEE coaching from Malviya Nagar, Jaipur. 12-15 min to the ProNEET Mansarovar classroom via Gopalpura Bypass or Ajmer Road.",
    blurb:
      "A 12-15 min commute brings you to senior-faculty Physics and Chemistry.",
    travelTime: "12-15 min to Mansarovar",
    role: "catchment",
  },
  {
    slug: "vaisali-nagar",
    name: "Vaisali Nagar",
    description:
      "NEET & JEE coaching for students in Vaisali Nagar, Jaipur. 10-15 min to the ProNEET Mansarovar classroom via Ajmer Road.",
    blurb:
      "10-15 min south-west along Ajmer Road. Small batches, senior teachers.",
    travelTime: "10-15 min to Mansarovar",
    role: "catchment",
  },
  {
    slug: "gopalpura-bypass",
    name: "Gopalpura Bypass",
    description:
      "NEET & JEE coaching from Gopalpura Bypass, Jaipur. 5-12 min to the ProNEET Mansarovar classroom depending on which stretch you live on.",
    blurb:
      "5-12 min, directly along the Bypass. Our closest non-Mansarovar catchment.",
    travelTime: "5-12 min to Mansarovar",
    role: "catchment",
  },
];
