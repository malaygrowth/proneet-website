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
