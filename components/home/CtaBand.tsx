"use client";

import React from "react";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { PhoneCall, Building2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export function CtaBand() {
  const { dict, dir, isRTL } = useLanguage();

  return (
    <section className="my-24 max-w-[1440px] mx-auto px-4 sm:px-6" dir={dir}>
      <Reveal>
        <div className="bg-metal-brushed metal-shadow rounded-2xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative border border-steel-200">
          
          {/* Subtle sheen sweep */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-[-25deg] animate-metal-sweep" />
          </div>

          {/* Abstract graphic */}
          <div className="absolute left-0 top-0 w-1/3 h-full bg-signal-500/10 skew-x-[30deg] -translate-x-1/2 pointer-events-none" />
          
          <div className={`relative z-10 flex flex-col gap-4 ${isRTL ? 'text-right' : 'text-left'} md:w-2/3`}>
            <span className="text-signal-500 font-bold font-sans tracking-widest uppercase text-sm">
              {dict.ctaBand.tag}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-ink-950 font-vazir drop-shadow-sm">
              {dict.ctaBand.title}
            </h2>
            <p className="text-ink-900 font-medium text-base md:text-lg max-w-2xl font-vazir leading-relaxed">
              {dict.ctaBand.desc}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            <Button variant="primary" href="/contact" className="w-full sm:w-auto text-lg px-8 py-4 gap-2 shadow-lg">
              <PhoneCall className="w-5 h-5" />
              {dict.ctaBand.btnConsultation}
            </Button>
            <Button variant="outline" href="/projects" className="w-full sm:w-auto text-lg px-8 py-4 gap-2 !border-ink-950 !text-ink-950 hover:!bg-ink-950/10 transition-colors">
              <Building2 className="w-5 h-5" />
              {dict.ctaBand.btnProjects}
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
