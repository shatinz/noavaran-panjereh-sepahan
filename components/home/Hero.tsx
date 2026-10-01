import React from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { ChevronDown } from "lucide-react";
import { withBasePath } from "@/lib/media";
import settingsData from "@/data/settings.json";
import projectsData from "@/data/projects.json";

export function Hero() {
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
          src={withBasePath("/projects/proj-47.webp")}
          alt="نمای ساختمان مدرن اجرا شده توسط نوآوران پنجره سپاهان"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-top mix-blend-luminosity opacity-70"
        />
        {/* Duotone + Noise + Red-to-Black Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blood-900/50 via-ink-950/80 to-[#0a0002] mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#ab0017]/30 via-[#1e0004]/60 to-[#0a0002]" />
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC40Ii8+PC9zdmc+')] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 text-center mt-8 md:mt-16">
        <Reveal>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-6 font-vazir drop-shadow-2xl">
            نوآوران پنجره سپاهان
            <span className="block text-xl sm:text-2xl md:text-3xl text-signal-500 font-bold mt-3">
              طراحی و تولید نمای کرتین‌وال و پنجره ترمال‌بریک
            </span>
          </h1>
          <h2 className="text-base sm:text-lg md:text-2xl text-steel-200 font-medium mb-10 max-w-3xl mx-auto font-vazir leading-relaxed text-shadow-sm">
            تولید صنعتی انواع درب و پنجره دوجداره آلومینیوم ترمال‌بریک، نمای شیشه‌ای کرتین‌وال (لامل و فریم‌لس) و سیستم جام‌بالکنی در کارخانه ۱۵۰۰ متری اصفهان
          </h2>

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
