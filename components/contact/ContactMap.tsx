"use client";

import React from "react";
import { MapPin, Navigation, ExternalLink, Compass } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface ContactMapProps {
  address?: string;
  lat?: number;
  lng?: number;
}

export function ContactMap({
  address = "اصفهان، خیابان امام خمینی، خیابان بسیج، کوچه ۱۳۵، کوچه فردوسی (بهار)، پلاک ۱۰۰",
  lat = 32.7161,
  lng = 51.5942,
}: ContactMapProps) {
  const { dict, dir, isRTL } = useLanguage();

  // Navigation application URLs
  const neshanUrl = `https://neshan.org/maps/@${lat},${lng},16z,0p`;
  const baladUrl = `https://balad.ir/location?latitude=${lat}&longitude=${lng}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  // OpenStreetMap embed URL with bounded box centered on factory
  const delta = 0.008;
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="w-full bg-ink-950 rounded-xl border border-ink-800 overflow-hidden metal-shadow flex flex-col" dir={dir}>
      {/* Map Header */}
      <div className="px-5 py-4 bg-ink-900 border-b border-ink-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-signal-500/20 border border-signal-500/40 flex items-center justify-center text-signal-400 shrink-0">
            <MapPin className="w-5 h-5 text-signal-500" />
          </div>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h3 className="text-sm font-bold text-white font-vazir">
              {dict.contact.mapTitle}
            </h3>
            <span className="text-xs text-steel-400 font-vazir block line-clamp-1">
              {dict.contact.mapAddress}
            </span>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-ink-950 text-steel-400 border border-ink-800 text-[11px] font-mono">
          <Compass className="w-3.5 h-3.5 text-signal-500" />
          {lat.toFixed(4)}, {lng.toFixed(4)}
        </span>
      </div>

      {/* Embedded Map Frame */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-ink-900 overflow-hidden">
        <iframe
          title={dict.contact.mapTitle}
          src={osmEmbedUrl}
          className="w-full h-full border-0 select-none"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Floating Factory Badge inside map */}
        <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} bg-ink-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-signal-500/30 text-white text-xs font-vazir font-bold shadow-lg flex items-center gap-2 pointer-events-none`}>
          <span className="w-2.5 h-2.5 rounded-full bg-signal-500 animate-ping inline-block" />
          <span>{dict.nav.brandName}</span>
        </div>
      </div>

      {/* Quick Navigation Action Buttons (Neshan, Balad, Google Maps) */}
      <div className={`p-4 bg-ink-900/90 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-3 ${isRTL ? 'text-right' : 'text-left'}`}>
        <span className="text-xs text-steel-400 font-vazir flex items-center gap-1.5 self-start sm:self-center">
          <Navigation className="w-3.5 h-3.5 text-signal-500" />
          {dict.contact.directRoutes}
        </span>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Neshan */}
          <a
            href={neshanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-ink-950 hover:bg-[#1E70B8]/20 border border-ink-800 hover:border-[#1E70B8] text-steel-200 hover:text-white text-xs font-vazir font-bold transition-all"
            title="Neshan Map"
          >
            <span>{isRTL ? 'نشان' : 'Neshan'}</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          {/* Balad */}
          <a
            href={baladUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-ink-950 hover:bg-[#2EB85C]/20 border border-ink-800 hover:border-[#2EB85C] text-steel-200 hover:text-white text-xs font-vazir font-bold transition-all"
            title="Balad Map"
          >
            <span>{isRTL ? 'بلد' : 'Balad'}</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          {/* Google Maps */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-ink-950 hover:bg-signal-500/20 border border-ink-800 hover:border-signal-500 text-steel-200 hover:text-white text-xs font-vazir font-bold transition-all"
            title="Google Maps"
          >
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  );
}
