// Typed wrapper around gtag. Safe on the server (no-op). Safe when
// NEXT_PUBLIC_GA_ID is not set (no-op). Every custom event emitted
// from the site should flow through one of these helpers, never
// through a raw gtag call — this keeps event shape consistent.

type GtagEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: GtagEventParams) => void;
    dataLayer?: unknown[];
  }
}

export type PageCategory =
  | "homepage"
  | "pillar"
  | "comparison"
  | "guide"
  | "location_hub"
  | "location_catchment"
  | "programme"
  | "faculty"
  | "results"
  | "about"
  | "contact"
  | "blog_index"
  | "location_index"
  | "samples";

export type CtaLocation =
  | "hero"
  | "nav"
  | "footer"
  | "floating"
  | "inline"
  | "faq"
  | "quick_contact"
  | "final_cta"
  | "program_card"
  | "catchment_block"
  | "comparison_row";

function track(eventName: string, params: GtagEventParams = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

// --- Conversion events (marked as "Key events" in GA4) ---

export function trackPhoneClick(ctaLocation: CtaLocation, pageCategory?: PageCategory): void {
  track("phone_call_click", { cta_location: ctaLocation, page_category: pageCategory });
}

export function trackWhatsappClick(ctaLocation: CtaLocation, pageCategory?: PageCategory): void {
  track("whatsapp_click", { cta_location: ctaLocation, page_category: pageCategory });
}

export function trackFormSubmit(formId: string, success: boolean, pageCategory?: PageCategory): void {
  track("form_submit", { form_id: formId, success, page_category: pageCategory });
}

export function trackBookDemoClick(ctaLocation: CtaLocation, pageCategory?: PageCategory): void {
  track("book_demo_click", { cta_location: ctaLocation, page_category: pageCategory });
}

// --- Engagement events (not conversions, but valuable) ---

export function trackFaqExpand(question: string, pageCategory?: PageCategory): void {
  track("faq_expand", {
    question: question.slice(0, 80),
    page_category: pageCategory,
  });
}

export function trackScrollDepth(pct: 25 | 50 | 75 | 100, pageSlug: string, pageCategory?: PageCategory): void {
  track("content_scroll_depth", {
    scroll_pct: pct,
    page_slug: pageSlug.slice(0, 80),
    page_category: pageCategory,
  });
}

export function trackPillarEngagement(slug: string): void {
  track("blog_pillar_engagement", { page_slug: slug });
}

// --- Navigation / intent events ---

export function trackFormFieldAbandon(formId: string, fieldName: string): void {
  track("form_field_abandon", { form_id: formId, field_name: fieldName });
}

export function trackEmailClick(ctaLocation: CtaLocation): void {
  track("email_click", { cta_location: ctaLocation });
}

export function trackOutboundLink(url: string, pageCategory?: PageCategory): void {
  track("outbound_link_click", {
    destination: url.slice(0, 200),
    page_category: pageCategory,
  });
}
