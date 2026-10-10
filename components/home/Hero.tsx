"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { ChevronDown } from "lucide-react";
import { withBasePath } from "@/lib/media";
import settingsData from "@/data/settings.json";
import projectsData from "@/data/projects.json";

export function Hero() {
  const abilities = [
    "انواع درب و پنجره‌های دوجداره آلومینیوم ترمال‌بریک و نرمال",
    "نماهای مدرن شیشه‌ای کرتین‌وال (لامل و فریم‌لس)",
    "سیستم مدرن جام‌بالکنی (شیشه بالکن ریلی و تاشو آکاردئونی)",
    "نمای پانل کامپوزیت آلومینیوم و لوورهای دوکی شیدری",
    "سازه‌های مهندسی شیشه‌ای اسپایدر و اسکای‌لایت نورگیر",
    "نرده و هندریل‌های اختصاصی تمام‌شیشه‌ای و حفاظ استیل ضدزنگ",
  ];

  const [currentAbilityIndex, setCurrentAbilityIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAbilityIndex((prev) => (prev + 1) % abilities.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [abilities.length]);

  const currentPersianYear = parseInt(new Intl.DateTimeFormat('en-US-u-ca-persian', {year: 'numeric'}).format(new Date()));
  const yearsExp = currentPersianYear - settingsData.establishedYear;
  const projectCount = projectsData.length;
  const factoryArea = settingsData.factoryArea.replace(/\D/g, '');

  const toFa = (num: number | string) => Number(num).toLocaleString('fa-IR');

  return (
    <section className="relative h-[100svh] min-h-[500px] md:min-h-[700px] w-full flex items-center justify-center overflow-hidden" dir="rtl">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={withBasePath("/images/noavaran_poster_layout.svg")}
          alt="طراحی و تولید انواع درب، پنجره و نماهای مدرن ساختمانی — نوآوران پنجره سپاهان"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
        {/* Lighter, translucent overlay allowing the architectural building to be clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0002]/40 via-[#1e0004]/50 to-[#0a0002]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#ab0017]/15 via-transparent to-[#0a0002]/70" />
        <div className="absolute inset-0 opacity-15 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC40Ii8+PC9zdmc+')] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 text-center mt-8 md:mt-16">
        <Reveal>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-white mb-6 font-lalezar drop-shadow-2xl tracking-normal">
            نوآوران پنجره سپاهان
            <span className="block text-xl sm:text-2xl md:text-3xl text-signal-500 font-bold font-vazir mt-4">
              طراحی و تولید کننده صنعتی
            </span>
          </h1>

          {/* Smooth kinetic abilities carousel */}
          <div className="mb-10 max-w-4xl mx-auto min-h-[5.5rem] flex flex-col items-center justify-center gap-3">
            <div className="relative inline-flex items-center gap-3 px-5 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-ink-950/95 via-blood-900/60 to-ink-950/95 border border-signal-500/40 backdrop-blur-xl shadow-[0_0_35px_rgba(171,0,23,0.3)]">
              {/* Pulsing signal ruby dot */}
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-signal-500"></span>
              </span>

              <h2
                key={currentAbilityIndex}
                className="animate-banner-carousel text-base sm:text-xl md:text-2xl font-black font-vazir text-white tracking-wide"
              >
                {abilities[currentAbilityIndex]}
              </h2>
            </div>

            {/* Micro progress indicators */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {abilities.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentAbilityIndex(idx)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    idx === currentAbilityIndex
                      ? 'w-6 bg-signal-500 shadow-[0_0_8px_rgba(171,0,23,0.8)]'
                      : 'w-1.5 bg-steel-500/40 hover:bg-steel-400'
                  }`}
                  aria-label={`آیتم ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" href="/contact" className="w-full sm:w-auto text-lg px-10 py-4 shadow-xl">
              درخواست مشاوره
            </Button>
            <Button variant="steel" href="/projects" className="w-full sm:w-auto text-lg px-10 py-4 shadow-xl">
              مشاهده پروژه‌ها
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Accessible Scroll Indicator */}
      <a 
        href="#services" 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-black/40 border border-white/10 opacity-80 hover:opacity-100 transition-all hover:bg-black/60 focus-visible"
        aria-label="رفتن به بخش خدمات"
      >
        <ChevronDown className="w-6 h-6 text-signal-500 animate-bounce" />
      </a>
    </section>
  );
}
