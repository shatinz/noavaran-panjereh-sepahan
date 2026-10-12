"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { ChevronDown } from "lucide-react";
import { withBasePath } from "@/lib/media";

export function Hero({ establishedYear, factoryArea: factoryAreaRaw, projectCount }: { establishedYear: number; factoryArea: string; projectCount: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

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

  // Scroll-reactive parallax throttled by requestAnimationFrame
  useEffect(() => {
    const heroEl = sectionRef.current;
    if (!heroEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let ticking = false;
    let isHeroInView = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroInView = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(heroEl);

    const onScroll = () => {
      if (!isHeroInView || ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const currentPersianYear = parseInt(new Intl.DateTimeFormat('en-US-u-ca-persian', {year: 'numeric'}).format(new Date()));
  const yearsExp = currentPersianYear - establishedYear;
  const factoryArea = factoryAreaRaw.replace(/\D/g, '');

  const toFa = (num: number | string) => Number(num).toLocaleString('fa-IR');

  // Parallax offsets for geometric layers
  const p1 = Math.round(scrollY * -0.2); // Top-left outer floating ruby square
  const p2 = Math.round(scrollY * -0.32); // Top-left nested ruby core square
  const p3 = Math.round(scrollY * -0.14); // Top-right crimson accent block
  const p4 = Math.round(scrollY * -0.08); // Right wing architectural tint panel
  const p5 = Math.round(scrollY * -0.16); // Right vertical ruby ribbon
  const p6 = Math.round(scrollY * -0.24); // Mid-left architectural accent
  const s2 = (1 + Math.min(scrollY * 0.0003, 0.1)).toFixed(4);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[580px] md:min-h-[720px] w-full flex items-center justify-center overflow-hidden"
      dir="rtl"
    >
      {/* Background Image: High-resolution optimized architectural building without poster text */}
      <div className="absolute inset-0 z-0">
        <Image
          src={withBasePath("/images/hero/hero-building-1920.webp")}
          alt="طراحی محاسباتی و تولید صنعتی نماهای مدرن ساختمانی، کرتین‌وال و پنجره‌های ترمال‌بریک — نوآوران پنجره سپاهان"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center opacity-90"
        />
        {/* Architectural contrast overlays ensuring strong text contrast while keeping building clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0002]/45 via-[#1e0004]/45 to-[#0a0002]/85 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#ab0017]/15 via-transparent to-[#0a0002]/70 pointer-events-none" />
        <div className="absolute inset-0 opacity-15 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC40Ii8+PC9zdmc+')] mix-blend-overlay pointer-events-none" />
      </div>

      {/* Kinetic Geometric Effect Layers (Floating Ruby Architectural Elements) */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Layer 1: Top-Left Floating Ruby Square */}
        <div
          className="hero-parallax-layer absolute top-0 left-[4%] w-[22vw] max-w-[320px] aspect-[15/25] bg-gradient-to-br from-[#ad1c21]/75 via-[#8a0012]/70 to-[#50000a]/75 border border-signal-500/25 backdrop-blur-[2px] shadow-[0_0_35px_rgba(171,0,23,0.25)] transition-transform duration-75 ease-out"
          style={{ transform: `translate3d(0, ${p1}px, 0)` }}
        />

        {/* Layer 2: Top-Left Nested Ruby Core Square */}
        <div
          className="hero-parallax-layer absolute top-[6%] left-[11%] w-[15vw] max-w-[210px] aspect-square bg-gradient-to-br from-[#c8001e]/80 to-[#70000e]/85 border border-signal-400/35 shadow-[0_0_25px_rgba(200,0,30,0.3)] transition-transform duration-75 ease-out"
          style={{ transform: `translate3d(0, ${p2}px, 0) scale(${s2})` }}
        />

        {/* Layer 3: Top-Right Crimson Architectural Accent Block */}
        <div
          className="hero-parallax-layer absolute top-0 right-[5%] w-[30vw] max-w-[420px] h-[60px] bg-gradient-to-l from-[#a81c22]/85 via-[#8a0012]/75 to-transparent border-b border-signal-500/30 transition-transform duration-75 ease-out"
          style={{ transform: `translate3d(0, ${p3}px, 0)` }}
        />

        {/* Layer 4: Right Wing Architectural Translucent Glass Panel */}
        <div
          className="hero-parallax-layer absolute top-[10%] right-0 w-[32vw] max-w-[450px] h-[72vh] bg-gradient-to-b from-[#8a0012]/30 via-[#ab0017]/25 to-[#4a0008]/45 mix-blend-multiply border-l border-signal-500/20 transition-transform duration-75 ease-out"
          style={{ transform: `translate3d(0, ${p4}px, 0)` }}
        />

        {/* Layer 5: Right Vertical Ruby Accent Ribbon */}
        <div
          className="hero-parallax-layer absolute top-[10%] right-[2%] w-[2vw] max-w-[30px] h-[72vh] bg-signal-500/40 shadow-[0_0_20px_rgba(171,0,23,0.35)] transition-transform duration-75 ease-out"
          style={{ transform: `translate3d(0, ${p5}px, 0)` }}
        />

        {/* Layer 6: Mid-Left Architectural Ruby Strip */}
        <div
          className="hero-parallax-layer absolute bottom-[26%] left-[4%] w-[16vw] max-w-[220px] h-[34px] bg-gradient-to-r from-signal-600/75 to-blood-900/85 border border-signal-400/25 shadow-[0_0_20px_rgba(171,0,23,0.25)] transition-transform duration-75 ease-out"
          style={{ transform: `translate3d(0, ${p6}px, 0)` }}
        />
      </div>

      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 text-center mt-4 md:mt-8 pb-16 sm:pb-20">
        <Reveal>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-white mb-6 font-lalezar drop-shadow-2xl tracking-normal">
            نوآوران پنجره سپاهان
            <span className="block text-xl sm:text-2xl md:text-3xl text-signal-500 font-bold font-vazir mt-4">
              طراحی و تولید کننده صنعتی
            </span>
          </h1>

          {/* Smooth kinetic abilities carousel */}
          <div className="mb-8 md:mb-10 max-w-4xl mx-auto min-h-[5.5rem] flex flex-col items-center justify-center gap-3">
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
            <Button variant="primary" href="/contact" className="w-full sm:w-auto text-lg px-10 py-4 shadow-xl rounded-lg">
              درخواست مشاوره
            </Button>
            <Button variant="steel" href="/projects" className="w-full sm:w-auto text-lg px-10 py-4 shadow-xl rounded-lg">
              مشاهده پروژه‌ها
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Accessible Scroll Indicator */}
      <a
        href="#services"
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-black/40 border border-white/10 opacity-80 hover:opacity-100 transition-all hover:bg-black/60 focus-visible z-20"
        aria-label="رفتن به بخش خدمات"
      >
        <ChevronDown className="w-6 h-6 text-signal-500 animate-bounce" />
      </a>
    </section>
  );
}

