export const SITE = {
  name: "ProNEET",
  tagline: "Small-batch NEET & JEE coaching, Jaipur",
  description: "Senior faculty. 30-seat batches. 20+ years of Physics by Neeraj Gupta (ex-Bansal Classes, Narayana, Excel Physics) and Chemistry by Vivek Patidar. Classroom in Mansarovar Sector 8, Jaipur. 1-on-1 online for students anywhere.",
  url: "https://proneetphysics.com",
  // Primary admissions line — lifted from the old proneetphysics.com contact page.
  phone: "+919214314348",
  phoneDisplay: "+91 92143 14348",
  phoneSecondary: "+918112297734",
  phoneSecondaryDisplay: "+91 81122 97734",
  whatsapp: "+919214314348",
  email: "admissions@proneetphysics.com",
  emailSecondary: "1721neerajgupta@gmail.com",
  address: "84/255, Madhyam Marg, Ward 27, Mansarovar Sector 8, Mansarovar, Jaipur, Rajasthan 302020",
  addressShort: "Mansarovar Sector 8, Jaipur",
  addressStreet: "84/255, Madhyam Marg, Ward 27, Mansarovar Sector 8",
  addressLocality: "Mansarovar",
  addressCity: "Jaipur",
  addressRegion: "Rajasthan",
  addressPostal: "302020",
  addressCountry: "IN",
  googleRating: 5.0,
  googleReviews: 20,
  social: {
    facebook: "https://facebook.com/proneetphysics",
    instagram: "https://instagram.com/physicsneetclasses",
    youtube: "https://youtube.com/channel/UChEWnrZjtwOYYKxI6HJQepw",
    twitter: "https://twitter.com/PhysicsProneet",
  },
} as const;

// Only verified numbers from the old proneetphysics.com site.
// AIR/score data is intentionally omitted until the user provides real rankers.
export const STATS = {
  yearsExperience: 20,
  neetSelections: 1000,
} as const;

export const NAV_LINKS = [
  { label: "Programs", href: "/programs" },
  { label: "Results", href: "/results" },
  { label: "Method", href: "/#method" },
  { label: "Faculty", href: "/faculty" },
  { label: "About", href: "/about" },
] as const;
