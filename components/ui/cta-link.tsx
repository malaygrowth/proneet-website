"use client";

// Tiny client-side wrappers that add GA4 tracking to tel:/whatsapp/email
// links without forcing the entire parent page to become a client
// component. Drop these anywhere instead of a raw <a>.

import type { ReactNode, MouseEventHandler } from "react";
import {
  trackPhoneClick,
  trackWhatsappClick,
  trackEmailClick,
  trackBookDemoClick,
  type CtaLocation,
  type PageCategory,
} from "@/lib/analytics";
import { SITE } from "@/lib/constants";

interface BaseProps {
  children: ReactNode;
  className?: string;
  ctaLocation: CtaLocation;
  pageCategory?: PageCategory;
  "aria-label"?: string;
}

interface PhoneLinkProps extends BaseProps {
  phone?: string; // override SITE.phone
  isDemo?: boolean; // track as book_demo_click instead of phone_call_click
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function PhoneLink({
  children,
  className,
  ctaLocation,
  pageCategory,
  phone = SITE.phone,
  isDemo = false,
  onClick,
  ...rest
}: PhoneLinkProps) {
  return (
    <a
      href={`tel:${phone}`}
      onClick={(e) => {
        if (isDemo) trackBookDemoClick(ctaLocation, pageCategory);
        else trackPhoneClick(ctaLocation, pageCategory);
        onClick?.(e);
      }}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}

interface WhatsappLinkProps extends BaseProps {
  message?: string;
}

export function WhatsappLink({
  children,
  className,
  ctaLocation,
  pageCategory,
  message = "Hi, I'm interested in ProNEET coaching.",
  ...rest
}: WhatsappLinkProps) {
  const url = `https://wa.me/${SITE.whatsapp.replace(/\+/g, "")}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsappClick(ctaLocation, pageCategory)}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}

interface EmailLinkProps extends BaseProps {
  email?: string;
}

export function EmailLink({
  children,
  className,
  ctaLocation,
  email = SITE.email,
  ...rest
}: EmailLinkProps) {
  return (
    <a
      href={`mailto:${email}`}
      onClick={() => trackEmailClick(ctaLocation)}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
