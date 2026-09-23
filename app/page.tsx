import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="pb-10">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-8 pt-3">

        {/* ═══════════════════════════════════════════════════════════
            MAIN GRID — Section 1 (Hero) + Section 2 (2×2 Cards)
            ═══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* ─── SECTION 1: Large Hero Card ─── */}
          <div className="lg:col-span-7">
            {/* Section marker */}
            <div className="mb-2">
              <span className="section-number">1</span>
            </div>

            <div className="relative h-[380px] sm:h-[480px] lg:h-[570px] overflow-hidden rounded-[3px] shadow-card border border-[#b5b8b5]">
              <img
                src="https://arvinpanjereh.com/upload/service/742b5647-017c-4a6e-b416-a184adf97dcc.webp"
                alt="راهکارهای مدرن نمای ساختمان - نوآوران پنجره سپاهان"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

              {/* Hero text content */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 lg:p-10 space-y-4">
                <h1 className="text-xl sm:text-2xl lg:text-[2.1rem] font-black text-white uppercase leading-[1.18] tracking-tight">
                  MODERN FACADE SOLUTIONS:<br />
                  SHAPING THE HORIZON.
                </h1>
                <p className="text-[11px] sm:text-xs text-gray-300 max-w-md font-medium leading-relaxed">
                  Luxury real architectural glass facade as an Iranian contemporary high-rise &amp; facade specialist.
                </p>
                <Link
                  href="/projects"
                  className="inline-flex items-center px-5 py-2.5 bg-[#1a1a1a] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] border border-white/10 hover:bg-[#333] transition-colors"
                >
                  DISCOVER OUR CAPABILITIES
                </Link>
              </div>
            </div>
          </div>

          {/* ─── SECTION 2: Right 2×2 Grid ─── */}
          <div className="lg:col-span-5">
            {/* Section marker */}
            <div className="mb-2">
              <span className="section-number">2</span>
            </div>

            <div className="grid grid-cols-2 gap-4 h-[460px] sm:h-[480px] lg:h-[570px]">

              {/* Card A — Available Profile Samples */}
              <Link
                href="/services"
                className="group flex flex-col overflow-hidden rounded-[3px] border border-[#b5b8b5] shadow-card hover:shadow-card-hover transition-shadow"
              >
                {/* Aluminum header strip */}
                <div className="aluminum-surface px-3 py-2 border-b border-[#b5b8b5]">
                  <h3 className="text-[10px] sm:text-[11px] font-extrabold text-[#1a1a1a] leading-snug">
                    Available Profile Samples
                  </h3>
                </div>
                {/* Image area with overlay */}
                <div className="relative flex-1 bg-[#1a1a1a] overflow-hidden">
                  <img
                    src="https://arvinpanjereh.com/upload/service/0faef799-a472-46be-83bf-7cf42bbfaaa3.webp"
                    alt="پروفیل‌های آلومینیومی مهندسی‌شده"
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-3">
                    <span className="text-[9px] sm:text-[11px] font-extrabold text-white uppercase leading-tight block tracking-wide">
                      PRECISION-ENGINEERED<br />ALUMINUM SYSTEMS
                    </span>
                  </div>
                </div>
              </Link>

              {/* Card B — Completed Projects */}
              <Link
                href="/projects"
                className="group flex flex-col overflow-hidden rounded-[3px] border border-[#b5b8b5] shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="aluminum-surface px-3 py-2 border-b border-[#b5b8b5]">
                  <h3 className="text-[10px] sm:text-[11px] font-extrabold text-[#1a1a1a] leading-snug">
                    Completed Projects
                  </h3>
                </div>
                <div className="relative flex-1 bg-[#1a1a1a] overflow-hidden">
                  <img
                    src="https://arvinpanjereh.com/upload/service/742b5647-017c-4a6e-b416-a184adf97dcc.webp"
                    alt="پروژه‌های شاخص نوآوران"
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-3">
                    <span className="text-[9px] sm:text-[11px] font-extrabold text-white uppercase leading-tight block tracking-wide">
                      SHOWCASING ICONIC<br />INSTALLATIONS
                    </span>
                  </div>
                </div>
              </Link>

              {/* Card C — Ongoing Projects */}
              <Link
                href="/projects?status=ongoing"
                className="group flex flex-col overflow-hidden rounded-[3px] border border-[#b5b8b5] shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="aluminum-surface px-3 py-2 border-b border-[#b5b8b5]">
                  <h3 className="text-[10px] sm:text-[11px] font-extrabold text-[#1a1a1a] leading-snug">
                    Ongoing Projects under construction
                  </h3>
                </div>
                <div className="relative flex-1 bg-[#1a1a1a] overflow-hidden">
                  <img
                    src="https://arvinpanjereh.com/upload/service/2f5bb5ed-60bb-49e5-9003-8be94921ad5e.webp"
                    alt="پروژه‌های درحال ساخت"
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-3">
                    <span className="text-[9px] sm:text-[11px] font-extrabold text-white uppercase leading-tight block tracking-wide">
                      BUILDING THE FUTURE,<br />ONE PANEL AT A TIME
                    </span>
                  </div>
                </div>
              </Link>

              {/* Card D — Technical Articles */}
              <Link
                href="/articles"
                className="group flex flex-col overflow-hidden rounded-[3px] border border-[#b5b8b5] shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="aluminum-surface px-3 py-2 border-b border-[#b5b8b5]">
                  <h3 className="text-[10px] sm:text-[11px] font-extrabold text-[#1a1a1a] leading-snug">
                    Technical Articles
                  </h3>
                </div>
                <div className="relative flex-1 bg-[#1a1a1a] overflow-hidden">
                  <img
                    src="https://arvinpanjereh.com/upload/service/4eb9bebe-fbcf-49b0-bc35-12e0b62e49c7.webp"
                    alt="مقالات فنی"
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-3">
                    <span className="text-[9px] sm:text-[11px] font-extrabold text-white uppercase leading-tight block tracking-wide">
                      INNOVATIONS IN<br />FENESTRATION &amp;<br />SUSTAINABILITY
                    </span>
                  </div>
                </div>
              </Link>

            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            BOTTOM ROW — Profile & Project Preview Cards
            ═══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">

          {/* Bottom Card 1 — Available Profile Samples */}
          <Link
            href="/services"
            className="group aluminum-surface rounded-[3px] overflow-hidden border border-[#b5b8b5] shadow-card hover:shadow-card-hover transition-shadow block"
          >
            <div className="p-5 pb-0">
              <div className="flex items-start gap-4">
                <span
                  className="text-5xl sm:text-6xl font-extralight text-[#aaa] leading-none select-none"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  1
                </span>
                <div className="pt-2 sm:pt-3">
                  <h3 className="text-sm font-bold text-[#1a1a1a]">Available Profile Samples</h3>
                </div>
              </div>
            </div>
            <div className="mt-3 mx-5 mb-5 relative h-[150px] sm:h-[170px] overflow-hidden rounded-[2px]">
              <img
                src="https://arvinpanjereh.com/upload/service/0faef799-a472-46be-83bf-7cf42bbfaaa3.webp"
                alt="پروفیل‌های آلومینیومی"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Link>

          {/* Bottom Card 2 — Completed Projects */}
          <Link
            href="/projects"
            className="group aluminum-surface rounded-[3px] overflow-hidden border border-[#b5b8b5] shadow-card hover:shadow-card-hover transition-shadow block"
          >
            <div className="p-5 pb-0">
              <div className="flex items-start gap-4">
                <span
                  className="text-5xl sm:text-6xl font-extralight text-[#aaa] leading-none select-none"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  2
                </span>
                <div className="pt-2 sm:pt-3">
                  <h3 className="text-sm font-bold text-[#1a1a1a]">Completed Projects</h3>
                </div>
              </div>
            </div>
            <div className="mt-3 mx-5 mb-5 relative h-[150px] sm:h-[170px] overflow-hidden rounded-[2px]">
              <img
                src="https://arvinpanjereh.com/upload/service/742b5647-017c-4a6e-b416-a184adf97dcc.webp"
                alt="پروژه‌های شاخص"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
