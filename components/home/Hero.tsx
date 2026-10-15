"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { ChevronDown } from "lucide-react";
import { withBasePath } from "@/lib/media";
import { useLanguage } from "@/lib/i18n/context";

export function Hero({ establishedYear, factoryArea: factoryAreaRaw, projectCount }: { establishedYear: number; factoryArea: string; projectCount: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);
  const layer5Ref = useRef<HTMLDivElement>(null);
  const layer6Ref = useRef<HTMLDivElement>(null);

  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const isHeroInViewRef = useRef(true);

  const { t, dict, locale, dir, isRTL } = useLanguage();
  const abilities = dict.hero.abilities;

  const [currentAbilityIndex, setCurrentAbilityIndex] = useState(0);

  useEffect(() => {
    setCurrentAbilityIndex(0);
  }, [locale]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAbilityIndex((prev) => (prev + 1) % abilities.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [abilities.length]);

  // Smooth lerp parallax driven via requestAnimationFrame directly on layer element refs (zero React re-renders)
  useEffect(() => {
    const heroEl = sectionRef.current;
    if (!heroEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const LERP_FACTOR = 0.11;

    const applyTransforms = (scrollPos: number) => {
      const isMobile = window.innerWidth < 768;
      const m = isMobile ? 0.6 : 1.0;

      // Background building parallax: translateY 0 -> -6%, scale 1 -> 1.054
      if (bgRef.current) {
        const y = (scrollPos * -0.06 * m).toFixed(2);
        const s = (1.0 + Math.min(scrollPos * 0.00009 * m, 0.06)).toFixed(4);
        bgRef.current.style.transform = `translate3d(0, ${y}px, 0) scale(${s})`;
      }

      // Layer 1: Top-Left Outer Translucent Glass Panel
      if (layer1Ref.current) {
        const y = (scrollPos * -0.36 * m).toFixed(2);
        const x = (scrollPos * -0.05 * m).toFixed(2);
        const r = (scrollPos * -0.004 * m).toFixed(3);
        const s = (1.0 + Math.min(scrollPos * 0.00013 * m, 0.08)).toFixed(4);
        layer1Ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r}deg) scale(${s})`;
      }

      // Layer 2: Top-Left Core Brushed Aluminium / Titanium Geometric Plate
      if (layer2Ref.current) {
        const y = (scrollPos * -0.42 * m).toFixed(2);
        const x = (scrollPos * 0.06 * m).toFixed(2);
        const r = (scrollPos * 0.005 * m).toFixed(3);
        const s = (1.0 + Math.min(scrollPos * 0.00018 * m, 0.11)).toFixed(4);
        layer2Ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r}deg) scale(${s})`;
      }

      // Layer 3: Top-Right Architectural Horizon Accent Bar
      if (layer3Ref.current) {
        const y = (scrollPos * -0.22 * m).toFixed(2);
        const x = (scrollPos * -0.04 * m).toFixed(2);
        const s = (1.0 + Math.min(scrollPos * 0.00008 * m, 0.05)).toFixed(4);
        layer3Ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
      }

      // Layer 4: Right Wing Architectural Curtain-Wall Translucent Facet
      if (layer4Ref.current) {
        const y = (scrollPos * -0.12 * m).toFixed(2);
        const x = (scrollPos * 0.03 * m).toFixed(2);
        const op = Math.max(0.45, 1.0 - scrollPos * 0.0006 * m).toFixed(3);
        layer4Ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        layer4Ref.current.style.opacity = op;
      }

      // Layer 5: Right Vertical Precision Aluminium Mullion Ribbon
      if (layer5Ref.current) {
        const y = (scrollPos * -0.28 * m).toFixed(2);
        const x = (scrollPos * -0.025 * m).toFixed(2);
        const s = (1.0 + Math.min(scrollPos * 0.0001 * m, 0.06)).toFixed(4);
        layer5Ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
      }

      // Layer 6: Mid-Left Floating Translucent Shard
      if (layer6Ref.current) {
        const y = (scrollPos * -0.32 * m).toFixed(2);
        const x = (scrollPos * 0.045 * m).toFixed(2);
        const r = (scrollPos * -0.004 * m).toFixed(3);
        const s = (1.0 + Math.min(scrollPos * 0.00012 * m, 0.07)).toFixed(4);
        layer6Ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r}deg) scale(${s})`;
      }
    };

    const tick = () => {
      if (!isHeroInViewRef.current) {
        rafIdRef.current = null;
        return;
      }

      const target = targetScrollRef.current;
      const current = currentScrollRef.current;
      const diff = target - current;

      if (Math.abs(diff) < 0.1) {
        currentScrollRef.current = target;
        applyTransforms(target);
        rafIdRef.current = null;
        return;
      }

      const next = current + diff * LERP_FACTOR;
      currentScrollRef.current = next;
      applyTransforms(next);

      rafIdRef.current = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (rafIdRef.current === null && isHeroInViewRef.current) {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      targetScrollRef.current = window.scrollY;
      startLoop();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          targetScrollRef.current = window.scrollY;
          startLoop();
        } else if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      },
      { threshold: 0 }
    );
    observer.observe(heroEl);

    // Initial alignment
    targetScrollRef.current = window.scrollY;
    currentScrollRef.current = window.scrollY;
    applyTransforms(window.scrollY);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  const currentPersianYear = parseInt(new Intl.DateTimeFormat('en-US-u-ca-persian', {year: 'numeric'}).format(new Date()));
  const yearsExp = currentPersianYear - establishedYear;
  const factoryArea = factoryAreaRaw.replace(/\D/g, '');

  const toFa = (num: number | string) => Number(num).toLocaleString('fa-IR');

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[580px] md:min-h-[720px] w-full flex items-center justify-center overflow-hidden"
      dir={dir}
    >
      {/* Background Image: High-resolution architectural building with slow depth parallax */}
      <div ref={bgRef} className="hero-parallax-layer hero-bg-parallax absolute inset-0 z-0" data-layer="bg">
        <Image
          src={withBasePath("/images/hero/hero-building-1920.webp")}
          alt="طراحی محاسباتی و تولید صنعتی نماهای مدرن ساختمانی، کرتین‌وال و پنجره‌های ترمال‌بریک — نوآوران پنجره سپاهان"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover object-center opacity-90"
        />
        {/* Architectural contrast overlays ensuring strong text contrast while keeping building clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0002]/45 via-[#1e0004]/45 to-[#0a0002]/85 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#ab0017]/15 via-transparent to-[#0a0002]/70 pointer-events-none" />
        <div className="absolute inset-0 opacity-15 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC40Ii8+PC9zdmc+')] mix-blend-overlay pointer-events-none" />
      </div>

      {/* Kinetic Geometric Effect Layers (Translucent Glass & Brushed Aluminium Architectural Reflections) */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Layer 1: Top-Left Floating Architectural Glass Panel (Foreground) */}
        <div
          ref={layer1Ref}
          data-layer="1"
          className="hero-parallax-layer absolute top-0 left-[4%] w-[22vw] max-w-[320px] aspect-[15/25]"
        >
          <div className="hero-ambient-1 w-full h-full relative rounded-sm backdrop-blur-[6px] bg-gradient-to-br from-titanium-200/14 via-steel-500/8 to-ink-950/45 border border-titanium-200/20 shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
            {/* Hairline precision signal accent along top edge (<15% area, opacity <= 0.35) */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-signal-500/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Layer 2: Top-Left Brushed Aluminium / Titanium Geometric Plate (Core Midground) */}
        <div
          ref={layer2Ref}
          data-layer="2"
          className="hero-parallax-layer absolute top-[6%] left-[11%] w-[15vw] max-w-[210px] aspect-square"
        >
          <div className="hero-ambient-2 w-full h-full relative rounded-sm bg-gradient-to-br from-titanium-300/18 via-steel-500/10 to-charcoal-800/35 border border-steel-300/25 backdrop-blur-[4px] shadow-[0_4px_24px_rgba(0,0,0,0.32)]">
            {/* Corner precision hairline accent */}
            <div className="absolute top-0 right-0 w-8 h-[1.5px] bg-signal-400/30" />
            <div className="absolute top-0 right-0 w-[1.5px] h-8 bg-signal-400/30" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-black/20 pointer-events-none" />
          </div>
        </div>

        {/* Layer 3: Top-Right Architectural Translucent Horizon Bar */}
        <div
          ref={layer3Ref}
          data-layer="3"
          className="hero-parallax-layer absolute top-0 right-[5%] w-[30vw] max-w-[420px] h-[55px]"
        >
          <div className="hero-ambient-3 w-full h-full relative bg-gradient-to-l from-titanium-200/14 via-steel-400/8 to-transparent border-b border-titanium-200/20 backdrop-blur-[3px] shadow-[0_2px_16px_rgba(0,0,0,0.22)]">
            {/* Hairline subtle ruby glow line (<15% area) */}
            <div className="absolute bottom-0 right-0 w-32 h-[1px] bg-gradient-to-l from-signal-500/30 to-transparent" />
          </div>
        </div>

        {/* Layer 4: Right Wing Architectural Curtain-Wall Translucent Glass Panel */}
        <div
          ref={layer4Ref}
          data-layer="4"
          className="hero-parallax-layer absolute top-[8%] right-0 w-[32vw] max-w-[450px] h-[72vh]"
        >
          <div className="hero-ambient-4 w-full h-full relative bg-gradient-to-b from-titanium-100/10 via-steel-500/5 to-ink-950/35 border-l border-titanium-200/15 backdrop-blur-[3px] mix-blend-overlay shadow-[0_4px_30px_rgba(0,0,0,0.18)]">
            {/* Subtle mullion reflection division lines */}
            <div className="absolute inset-y-0 right-1/3 w-[1px] bg-white/[0.05]" />
            <div className="absolute inset-y-0 right-2/3 w-[1px] bg-white/[0.03]" />
          </div>
        </div>

        {/* Layer 5: Right Vertical Precision Aluminium Mullion Ribbon */}
        <div
          ref={layer5Ref}
          data-layer="5"
          className="hero-parallax-layer absolute top-[10%] right-[2%] w-[2vw] max-w-[24px] h-[72vh]"
        >
          <div className="hero-ambient-5 w-full h-full relative bg-gradient-to-b from-steel-200/20 via-titanium-400/12 to-ink-900/40 border-r border-titanium-300/25 shadow-[0_0_16px_rgba(0,0,0,0.25)]">
            {/* Delicate hairline accent (<15% area) */}
            <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-signal-500/25 via-signal-400/20 to-transparent" />
          </div>
        </div>

        {/* Layer 6: Mid-Left Floating Translucent Shard */}
        <div
          ref={layer6Ref}
          data-layer="6"
          className="hero-parallax-layer absolute bottom-[26%] left-[4%] w-[16vw] max-w-[220px] h-[36px]"
        >
          <div className="hero-ambient-6 w-full h-full relative rounded-sm bg-gradient-to-r from-titanium-200/16 via-steel-300/10 to-charcoal-800/30 border border-titanium-200/20 backdrop-blur-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
            {/* Fine hairline red bottom edge */}
            <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-signal-500/30 via-signal-400/20 to-transparent" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 text-center mt-4 md:mt-8 pb-16 sm:pb-20">
        <Reveal>
          <h1 className={`text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-normal text-white mb-6 drop-shadow-2xl tracking-normal ${
            locale === 'fa' ? 'font-lalezar' : (locale === 'ar' ? 'font-vazir font-black' : 'font-sans font-black tracking-tight')
          }`}>
            {t('hero.headline')}
            <span className="block text-xl sm:text-2xl md:text-3xl text-signal-500 font-bold font-vazir mt-4">
              {t('hero.subtitle')}
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
                key={`${locale}-${currentAbilityIndex}`}
                className="animate-banner-carousel text-base sm:text-xl md:text-2xl font-black font-vazir text-white tracking-wide"
              >
                {abilities[currentAbilityIndex]}
              </h2>
            </div>

            {/* Micro progress indicators */}
            <div className="flex items-center justify-center gap-1 pt-1">
              {abilities.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentAbilityIndex(idx)}
                  className="min-w-[28px] min-h-[28px] flex items-center justify-center p-1 focus:outline-none"
                  aria-label={`Item ${idx + 1}`}
                >
                  <span
                    className={`h-1 rounded-full transition-all duration-500 ${
                      idx === currentAbilityIndex
                        ? 'w-6 bg-signal-500 shadow-[0_0_8px_rgba(171,0,23,0.8)]'
                        : 'w-1.5 bg-steel-500/40 hover:bg-steel-400'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" href="/contact" className="w-full sm:w-auto text-lg px-10 py-4 shadow-xl rounded-lg">
              {t('hero.ctaConsultation')}
            </Button>
            <Button variant="steel" href="/projects" className="w-full sm:w-auto text-lg px-10 py-4 shadow-xl rounded-lg">
              {t('hero.ctaProjects')}
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Accessible Scroll Indicator */}
      <a
        href="#services"
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-black/40 border border-white/10 opacity-80 hover:opacity-100 transition-all hover:bg-black/60 focus-visible z-20"
        aria-label={t('hero.scrollAria')}
      >
        <ChevronDown className="w-6 h-6 text-signal-500 animate-bounce" />
      </a>
    </section>
  );
}
