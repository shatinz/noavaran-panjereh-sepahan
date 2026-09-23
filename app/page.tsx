import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-2 sm:py-3 space-y-4">
      
      {/* ═════════════════════════════════════════════════════════════
          TOP SECTION: SECTION 1 (HERO) + SECTION 2 (2x2 GRID)
          ═════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        
        {/* ─────────────────────────────────────────────────────────
            LEFT COLUMN: Section 1 (Hero) + Bottom 2 Cards
            ───────────────────────────────────────────────────────── */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Section 1 Marker & Large Hero Card */}
          <div className="relative">
            {/* Numeral 1 marker placed on left */}
            <div className="absolute -left-5 sm:-left-6 top-1 select-none pointer-events-none">
              <span className="section-numeral">1</span>
            </div>

            {/* Hero Card Container */}
            <div className="relative h-[480px] sm:h-[540px] lg:h-[590px] rounded-2xl overflow-hidden border border-[#b0b2b0] shadow-mockup-card group">
              <img
                src="https://arvinpanjereh.com/upload/service/742b5647-017c-4a6e-b416-a184adf97dcc.webp"
                alt="Modern Facade Solutions - Noavaran Panjereh Sepahan"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              
              {/* Dark Gradient Overlay for optimal contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />

              {/* Hero Content positioned at bottom-left */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-9 lg:p-11 space-y-4 text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-black text-white uppercase leading-[1.12] tracking-tight text-shadow-heading">
                  MODERN FACADE SOLUTIONS:<br />
                  SHAPING THE HORIZON.
                </h1>

                <p className="text-xs sm:text-[13px] text-gray-200 max-w-md font-normal leading-relaxed text-shadow-card">
                  Luxury real architectural glass facade as an Iranian contemporary high-rise &amp; facade specialist.
                </p>

                <div className="pt-2">
                  <Link
                    href="/projects"
                    className="inline-block px-6 py-2.5 bg-white text-black text-[11px] font-extrabold uppercase tracking-wider rounded-full shadow-md hover:bg-gray-100 hover:shadow-lg transition-all active:scale-95"
                  >
                    DISCOVER OUR CAPABILITIES
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row Below Section 1: Two Preview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Bottom Card 1: Available Profile Samples */}
            <Link
              href="/services"
              className="aluminum-card rounded-2xl p-3.5 sm:p-4 border border-[#b2b4b2] shadow-mockup-card hover:shadow-mockup-hover transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center gap-3 px-1 pt-1 pb-3 text-left">
                <span className="large-faint-numeral">1</span>
                <h3 className="text-xs sm:text-sm font-bold text-[#1a1a1a] tracking-tight">
                  Available Profile Samples
                </h3>
              </div>
              <div className="relative h-[160px] sm:h-[175px] rounded-xl overflow-hidden border border-black/15 bg-[#1a1a1a]">
                <img
                  src="https://arvinpanjereh.com/upload/service/0faef799-a472-46be-83bf-7cf42bbfaaa3.webp"
                  alt="Available Profile Samples"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Link>

            {/* Bottom Card 2: Completed Projects */}
            <Link
              href="/projects"
              className="aluminum-card rounded-2xl p-3.5 sm:p-4 border border-[#b2b4b2] shadow-mockup-card hover:shadow-mockup-hover transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center gap-3 px-1 pt-1 pb-3 text-left">
                <span className="large-faint-numeral">2</span>
                <h3 className="text-xs sm:text-sm font-bold text-[#1a1a1a] tracking-tight">
                  Completed Projects
                </h3>
              </div>
              <div className="relative h-[160px] sm:h-[175px] rounded-xl overflow-hidden border border-black/15 bg-[#1a1a1a]">
                <img
                  src="https://arvinpanjereh.com/upload/service/742b5647-017c-4a6e-b416-a184adf97dcc.webp"
                  alt="Completed Projects"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Link>

          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────
            RIGHT COLUMN: Section 2 (2x2 Grid of Brushed Aluminum Cards)
            ───────────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 relative">
          
          {/* Numeral 2 marker placed between columns */}
          <div className="absolute -left-4 sm:-left-5 top-1 select-none pointer-events-none">
            <span className="section-numeral">2</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4">
            
            {/* CARD 1: Available Profile Samples */}
            <Link
              href="/services"
              className="aluminum-card rounded-2xl p-2.5 sm:p-3 border border-[#b2b4b2] shadow-mockup-card hover:shadow-mockup-hover transition-all flex flex-col justify-between group text-left"
            >
              <div className="px-1.5 pt-0.5 pb-2">
                <h3 className="text-[11px] sm:text-[12px] font-black text-[#1a1a1a] tracking-tight">
                  Available Profile Samples
                </h3>
              </div>
              
              <div className="relative h-[210px] sm:h-[240px] rounded-xl overflow-hidden border border-black/15 bg-[#1a1a1a]">
                <img
                  src="https://arvinpanjereh.com/upload/service/0faef799-a472-46be-83bf-7cf42bbfaaa3.webp"
                  alt="Precision-Engineered Aluminum Systems"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-3 text-left">
                  <span className="text-[10px] sm:text-[11.5px] font-black text-white uppercase leading-snug block tracking-wide text-shadow-card">
                    PRECISION-ENGINEERED<br />ALUMINUM SYSTEMS
                  </span>
                </div>
              </div>
            </Link>

            {/* CARD 2: Completed Projects */}
            <Link
              href="/projects"
              className="aluminum-card rounded-2xl p-2.5 sm:p-3 border border-[#b2b4b2] shadow-mockup-card hover:shadow-mockup-hover transition-all flex flex-col justify-between group text-left"
            >
              <div className="px-1.5 pt-0.5 pb-2">
                <h3 className="text-[11px] sm:text-[12px] font-black text-[#1a1a1a] tracking-tight">
                  Completed Projects
                </h3>
              </div>

              <div className="relative h-[210px] sm:h-[240px] rounded-xl overflow-hidden border border-black/15 bg-[#1a1a1a]">
                <img
                  src="https://arvinpanjereh.com/upload/service/742b5647-017c-4a6e-b416-a184adf97dcc.webp"
                  alt="Showcasing Iconic Installations"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-3 text-left">
                  <span className="text-[10px] sm:text-[11.5px] font-black text-white uppercase leading-snug block tracking-wide text-shadow-card">
                    SHOWCASING ICONIC<br />INSTALLATIONS
                  </span>
                </div>
              </div>
            </Link>

            {/* CARD 3: Ongoing Projects under construction */}
            <Link
              href="/projects?status=ongoing"
              className="aluminum-card rounded-2xl p-2.5 sm:p-3 border border-[#b2b4b2] shadow-mockup-card hover:shadow-mockup-hover transition-all flex flex-col justify-between group text-left"
            >
              <div className="px-1.5 pt-0.5 pb-2">
                <h3 className="text-[11px] sm:text-[12px] font-black text-[#1a1a1a] tracking-tight">
                  Ongoing Projects under construction
                </h3>
              </div>

              <div className="relative h-[210px] sm:h-[240px] rounded-xl overflow-hidden border border-black/15 bg-[#1a1a1a]">
                <img
                  src="https://arvinpanjereh.com/upload/service/2f5bb5ed-60bb-49e5-9003-8be94921ad5e.webp"
                  alt="Building the Future, One Panel at a Time"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-3 text-left">
                  <span className="text-[10px] sm:text-[11.5px] font-black text-white uppercase leading-snug block tracking-wide text-shadow-card">
                    BUILDING THE FUTURE,<br />ONE PANEL AT A TIME
                  </span>
                </div>
              </div>
            </Link>

            {/* CARD 4: Technical Articles with Blueprint Schematic */}
            <Link
              href="/articles"
              className="aluminum-card rounded-2xl p-2.5 sm:p-3 border border-[#b2b4b2] shadow-mockup-card hover:shadow-mockup-hover transition-all flex flex-col justify-between group text-left"
            >
              <div className="px-1.5 pt-0.5 pb-2">
                <h3 className="text-[11px] sm:text-[12px] font-black text-[#1a1a1a] tracking-tight">
                  Technical Articles
                </h3>
              </div>

              <div className="relative h-[210px] sm:h-[240px] rounded-xl overflow-hidden border border-black/15 bg-[#f4f5f4] flex">
                {/* Left Side: Technical CAD Blueprint Cross-section */}
                <div className="w-1/2 h-full p-2 flex items-center justify-center bg-white border-r border-gray-200">
                  <svg
                    viewBox="0 0 160 160"
                    fill="none"
                    stroke="#444"
                    strokeWidth="1.2"
                    className="w-full h-full opacity-85"
                  >
                    {/* Dimension lines */}
                    <line x1="10" y1="20" x2="10" y2="140" stroke="#888" strokeWidth="0.8" strokeDasharray="2,2" />
                    <line x1="20" y1="10" x2="140" y2="10" stroke="#888" strokeWidth="0.8" strokeDasharray="2,2" />
                    
                    {/* Outer frame profile cross-section */}
                    <rect x="25" y="25" width="110" height="110" rx="1" stroke="#222" strokeWidth="1.6" />
                    
                    {/* Internal chambers & thermal break polyamides */}
                    <rect x="35" y="35" width="40" height="40" stroke="#222" strokeWidth="1.2" />
                    <rect x="85" y="35" width="40" height="40" stroke="#222" strokeWidth="1.2" />
                    <rect x="35" y="85" width="40" height="40" stroke="#222" strokeWidth="1.2" />
                    <rect x="85" y="85" width="40" height="40" stroke="#222" strokeWidth="1.2" />

                    {/* Central glazing pocket */}
                    <rect x="70" y="55" width="20" height="50" fill="#e8edf2" stroke="#1d4ed8" strokeWidth="1" />
                    <line x1="75" y1="55" x2="75" y2="105" stroke="#1d4ed8" strokeWidth="1" />
                    <line x1="85" y1="55" x2="85" y2="105" stroke="#1d4ed8" strokeWidth="1" />

                    {/* Technical dimension ticks */}
                    <line x1="5" y1="25" x2="15" y2="25" stroke="#666" strokeWidth="0.8" />
                    <line x1="5" y1="135" x2="15" y2="135" stroke="#666" strokeWidth="0.8" />
                    <line x1="25" y1="5" x2="25" y2="15" stroke="#666" strokeWidth="0.8" />
                    <line x1="135" y1="5" x2="135" y2="15" stroke="#666" strokeWidth="0.8" />
                  </svg>
                </div>

                {/* Right Side: Actual Extruded Aluminum Profile Photo */}
                <div className="w-1/2 h-full relative overflow-hidden bg-white">
                  <img
                    src="https://arvinpanjereh.com/upload/service/0faef799-a472-46be-83bf-7cf42bbfaaa3.webp"
                    alt="Innovations in Fenestration & Sustainability"
                    className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-0 inset-x-0 p-3 text-left z-10">
                  <span className="text-[10px] sm:text-[11.5px] font-black text-white uppercase leading-snug block tracking-wide text-shadow-card">
                    INNOVATIONS IN<br />FENESTRATION &amp;<br />SUSTAINABILITY
                  </span>
                </div>
              </div>
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}
