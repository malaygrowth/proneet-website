import type { Metadata } from "next";
import { inter, playfair, jetbrainsMono } from "@/lib/fonts";
import { SITE } from "@/lib/constants";
import { LenisProvider } from "@/components/layout/lenis-provider";
import { Navbar } from "@/components/layout/navbar";
import { FloatingCTA } from "@/components/layout/floating-cta";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
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
        <LenisProvider>
          <Navbar />
          {children}
          <FloatingCTA />
        </LenisProvider>
      </body>
    </html>
  );
}
