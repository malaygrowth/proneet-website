export const SITE = {
  name: "ProNEET",
  tagline: "Jaipur's Trusted NEET & JEE Coaching",
  description: "Complete PCB & PCM coaching with 25+ years of proven results. Small batches. Real mentorship.",
  url: "https://proneet.in",
  phone: "+91XXXXXXXXXX",
  whatsapp: "+91XXXXXXXXXX",
  email: "info@proneet.in",
  address: "Jaipur, Rajasthan",
  googleRating: 4.9,
  googleReviews: 200,
} as const;

export const STATS = {
  yearsExperience: 25,
  neetSelections: 500,
  selectionRate: 95,
  bestRank: 45,
  totalStudents: 10000,
} as const;

export const NAV_LINKS = [
  { label: "Programs", href: "/programs" },
  { label: "Results", href: "/results" },
  { label: "Method", href: "/#method" },
  { label: "Faculty", href: "/faculty" },
  { label: "About", href: "/about" },
] as const;
