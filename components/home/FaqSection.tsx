"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Reveal } from "../ui/Reveal";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items: FaqItem[];
}

export function FaqSection({ items }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-24 relative z-10" dir="rtl" aria-label="سوالات متداول نوآوران پنجره">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-signal-500/10 border border-signal-500/20 text-signal-400 text-xs sm:text-sm font-bold font-vazir mb-4">
              <HelpCircle className="w-4 h-4" />
              <span>راهنمای مشتریان و مهندسان</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white font-vazir tracking-tight mb-4">
              سوالات متداول درباره <span className="text-signal-500">نوآوران پنجره</span>
            </h2>
            <p className="text-steel-300 text-sm md:text-base max-w-2xl mx-auto font-vazir leading-relaxed">
              پاسخ به پرتکرارترین پرسش‌های کارفرمایان پیرامون هویت برند، سیستم‌های در و پنجره دوجداره، استانداردهای عایق‌بندی و مراحل سفارش.
            </p>
          </div>
        </Reveal>

        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Reveal key={idx} delay={idx * 50}>
                <div
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-ink-900/90 border-signal-500/50 shadow-[0_4px_24px_rgba(171,0,23,0.15)]"
                      : "bg-ink-950/70 border-white/10 hover:border-white/20 hover:bg-ink-900/50"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-500"
                    aria-expanded={isOpen}
                  >
                    <span className="font-vazir font-bold text-base sm:text-lg text-white leading-snug">
                      {item.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                        isOpen
                          ? "bg-signal-500 text-white border-signal-500 rotate-180"
                          : "bg-ink-800 text-steel-300 border-white/10"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-steel-300 font-vazir text-sm sm:text-base leading-relaxed border-t border-white/5">
                      {item.answer}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
