"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { PenTool, Factory, Hammer, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export function Process() {
  const { dict, dir, isRTL } = useLanguage();

  const icons = [PenTool, Factory, Hammer, ShieldCheck];

  const steps = dict.process.steps.map((step, idx) => ({
    ...step,
    icon: icons[idx] || PenTool,
  }));

  return (
    <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10" dir={dir}>
      <Reveal>
        <SectionHeading 
          title={dict.process.headingTitle} 
          subtitle={dict.process.headingSubtitle} 
          centered={true}
        />
      </Reveal>

      <div className="mt-16 relative">
        {/* Connecting line for desktop */}
        <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-steel-400/20 -translate-y-1/2 z-0" />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Reveal key={idx} delay={idx * 150}>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full bg-metal-brushed metal-shadow flex items-center justify-center mb-6 relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-signal-500/0 group-hover:bg-signal-500/10 transition-colors" />
                    <Icon className="w-10 h-10 text-signal-500" />
                    {/* Number badge */}
                    <div className={`absolute top-2 ${isRTL ? 'right-2' : 'left-2'} w-6 h-6 rounded-full bg-ink-950 text-white flex items-center justify-center text-xs font-black`}>
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-vazir">{step.title}</h3>
                  <p className="text-steel-300 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
