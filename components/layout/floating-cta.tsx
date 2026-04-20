"use client";

import { Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";
import { trackPhoneClick, trackWhatsappClick } from "@/lib/analytics";

export function FloatingCTA() {
  const whatsappUrl = `https://wa.me/${SITE.whatsapp.replace(/\+/g, "")}?text=Hi%2C%20I'm%20interested%20in%20ProNEET%20coaching.`;

  return (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsappClick("floating")}
        className="hidden lg:flex fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-3 flex gap-3">
        <a
          href={`tel:${SITE.phone}`}
          onClick={() => trackPhoneClick("floating")}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-sm bg-accent-orange text-white font-semibold text-sm"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsappClick("floating")}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-sm bg-[#25D366] text-white font-semibold text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>
    </>
  );
}
