import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { inter, playfair, jetbrainsMono } from "@/lib/fonts";
import { SITE } from "@/lib/constants";
import { LenisProvider } from "@/components/layout/lenis-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingCTA } from "@/components/layout/floating-cta";
import {
  OrganizationJsonLd,
  LocalBusinessJsonLd,
} from "@/components/seo/json-ld";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-D42ZXKH9RZ";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-white text-slate-900 overflow-x-hidden">
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <LenisProvider>
          <Navbar />
          {children}
          <Footer />
          <FloatingCTA />
        </LenisProvider>
        <Analytics />
        <SpeedInsights />
        {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
      </body>
    </html>
  );
}
