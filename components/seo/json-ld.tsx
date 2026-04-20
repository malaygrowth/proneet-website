import { SITE } from "@/lib/constants";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.addressStreet,
      addressLocality: SITE.addressLocality,
      addressRegion: SITE.addressRegion,
      postalCode: SITE.addressPostal,
      addressCountry: SITE.addressCountry,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "admissions",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: SITE.phoneSecondary,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(SITE.googleRating),
      bestRating: "5",
      reviewCount: String(SITE.googleReviews),
    },
    foundingDate: "2003",
    founder: {
      "@type": "Person",
      name: "Neeraj Gupta",
    },
    sameAs: [
      SITE.social.facebook,
      SITE.social.instagram,
      SITE.social.youtube,
      SITE.social.twitter,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.addressStreet,
      addressLocality: SITE.addressLocality,
      addressRegion: SITE.addressRegion,
      postalCode: SITE.addressPostal,
      addressCountry: SITE.addressCountry,
    },
    areaServed: [
      { "@type": "City", name: "Jaipur" },
      { "@type": "AdministrativeArea", name: "Rajasthan" },
      { "@type": "Country", name: "India" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(SITE.googleRating),
      bestRating: "5",
      reviewCount: String(SITE.googleReviews),
    },
    foundingDate: "2003",
    founder: {
      "@type": "Person",
      name: "Neeraj Gupta",
    },
    openingHours: "Mo-Sa 08:00-20:00",
    priceRange: "₹₹",
    sameAs: [
      SITE.social.facebook,
      SITE.social.instagram,
      SITE.social.youtube,
      SITE.social.twitter,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface PersonJsonLdProps {
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
  sameAs?: string[];
  alumniOf?: string;
  knowsAbout?: string[];
}

export function PersonJsonLd({
  name,
  jobTitle,
  description,
  image,
  sameAs,
  alumniOf,
  knowsAbout,
}: PersonJsonLdProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    worksFor: {
      "@type": "EducationalOrganization",
      name: SITE.name,
      url: SITE.url,
    },
  };
  if (image) data.image = `${SITE.url}${image}`;
  if (sameAs?.length) data.sameAs = sameAs;
  if (alumniOf)
    data.alumniOf = { "@type": "EducationalOrganization", name: alumniOf };
  if (knowsAbout?.length) data.knowsAbout = knowsAbout;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface CourseEntry {
  name: string;
  description: string;
  url: string;
  duration?: string;
  educationalLevel?: string;
}

interface CourseJsonLdProps {
  courses: CourseEntry[];
}

export function CourseJsonLd({ courses }: CourseJsonLdProps) {
  const data = courses.map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    url: course.url,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE.name,
      url: SITE.url,
      sameAs: SITE.url,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      courseWorkload: course.duration || "P2Y",
      location: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.addressStreet,
          addressLocality: SITE.addressLocality,
          addressRegion: SITE.addressRegion,
          postalCode: SITE.addressPostal,
          addressCountry: SITE.addressCountry,
        },
      },
      inLanguage: ["en-IN", "hi-IN"],
    },
    educationalLevel: course.educationalLevel || "Class 11 and 12",
    offers: {
      "@type": "Offer",
      category: "Coaching",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
    },
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface FAQJsonLdProps {
  faqs: { q: string; a: string }[];
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
