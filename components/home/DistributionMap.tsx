"use client";

import React, { useState, useEffect, useRef } from "react";
import iranProvinces from "@/data/iran_provinces.json";
import { MapPin, Building, ShieldCheck, Truck, Navigation } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface CityNode {
  id: string;
  name: string;
  province: string;
  x: number;
  y: number;
  path: string; // Bezier curve from Isfahan (486, 610)
  labelPos: "top" | "bottom" | "left" | "right" | "top-right" | "top-left" | "bottom-right" | "bottom-left";
  projects: string;
  systemTypes: string;
  delay: number; // Staggered entrance in seconds
}

export function DistributionMap() {
  const { dict, dir, isRTL } = useLanguage();
  const [inView, setInView] = useState(false);
  const [isZoomed, setIsZoomed] = useState(true);
  const [animationPhase, setAnimationPhase] = useState<"idle" | "zooming" | "flowing">("idle");
  const [hoveredCity, setHoveredCity] = useState<CityNode | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityNode | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Center coordinate of Isfahan Hub (exact center of Isfahan province)
  const ISFAHAN = {
    x: 505,
    y: 520,
    name: dict.distribution.hubName,
    label: dict.distribution.hubLabel,
  };

  // Raw geometric and trajectory nodes
  const RAW_CITIES = [
    {
      id: "tehran",
      x: 495,
      y: 345,
      path: "M 505 520 Q 498 430, 495 345",
      labelPos: "top" as const,
      delay: 0.2,
    },
    {
      id: "mashhad",
      x: 955,
      y: 310,
      path: "M 505 520 Q 730 390, 955 310",
      labelPos: "top-right" as const,
      delay: 0.4,
    },
    {
      id: "tabriz",
      x: 195,
      y: 155,
      path: "M 505 520 Q 340 330, 195 155",
      labelPos: "top-left" as const,
      delay: 0.3,
    },
    {
      id: "shiraz",
      x: 585,
      y: 775,
      path: "M 505 520 Q 535 650, 585 775",
      labelPos: "bottom" as const,
      delay: 0.5,
    },
    {
      id: "ahvaz",
      x: 310,
      y: 670,
      path: "M 505 520 Q 380 580, 310 670",
      labelPos: "bottom-left" as const,
      delay: 0.6,
    },
    {
      id: "bandar_abbas",
      x: 820,
      y: 950,
      path: "M 505 520 Q 660 740, 820 950",
      labelPos: "bottom-right" as const,
      delay: 0.7,
    },
    {
      id: "north",
      x: 420,
      y: 220,
      path: "M 505 520 Q 450 370, 420 220",
      labelPos: "top-left" as const,
      delay: 0.5,
    },
    {
      id: "kerman",
      x: 770,
      y: 710,
      path: "M 505 520 Q 640 600, 770 710",
      labelPos: "right" as const,
      delay: 0.8,
    },
    {
      id: "yazd",
      x: 620,
      y: 575,
      path: "M 505 520 Q 560 545, 620 575",
      labelPos: "right" as const,
      delay: 0.9,
    },
    {
      id: "kermanshah",
      x: 210,
      y: 440,
      path: "M 505 520 Q 340 470, 210 440",
      labelPos: "left" as const,
      delay: 0.6,
    },
  ];

  const CITIES: CityNode[] = RAW_CITIES.map((c) => {
    const data = dict.distribution.cities[c.id];
    return {
      ...c,
      name: data?.name || c.id,
      province: data?.province || "",
      projects: data?.projects || "",
      systemTypes: data?.systemTypes || "",
    };
  });

  // Trigger camera zoom-out when user scrolls to section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            triggerCameraZoomSequence();
            observer.disconnect(); // Only trigger on first scroll into view
          }
        });
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const triggerCameraZoomSequence = () => {
    // Phase 1: Camera focused on Isfahan
    setIsZoomed(true);
    setAnimationPhase("zooming");

    // Phase 2: Smooth camera zoom-out to entire Iran & lines reach cities
    const timer1 = setTimeout(() => {
      setIsZoomed(false);
    }, 400);

    // Phase 3: Transition to smooth continuous flowing lines loop
    const timer2 = setTimeout(() => {
      setAnimationPhase("flowing");
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  return (
    <section
      ref={sectionRef}
      id="distribution"
      className="relative w-full py-20 md:py-28 overflow-hidden bg-gradient-to-b from-[#0a0002] via-[#160005] to-[#0a0002] text-white border-t border-[#ab0017]/20"
      dir={dir}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,_rgba(171,0,23,0.18)_0%,_transparent_65%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-5xl font-black font-vazir text-white tracking-tight">
            {dict.distribution.heading}
          </h2>
          <p className="text-base sm:text-lg text-steel-200 font-vazir leading-relaxed">
            {dict.distribution.subtitle}
          </p>
        </div>

        {/* Interactive Map Visual Area - Directly on page background without enclosing rectangle */}
        <div className="relative w-full max-w-[1000px] mx-auto p-2 sm:p-4">
          {/* SVG Map Container with Camera Zoom Effect */}
          <div
            className="relative w-full aspect-[1200/1070] transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] select-none"
            style={{
              transform: isZoomed ? "scale(2.1)" : "scale(1)",
              transformOrigin: "42.1% 48.6%", // Exact center of Isfahan (505, 520) in viewBox 0 0 1200 1070
            }}
          >
            <svg
              viewBox="0 0 1200 1070.6"
              className="w-full h-full overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Glow Filter for Shiny Lines */}
                <filter id="dist-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Intense Core Neon Filter */}
                <filter id="dist-neon" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur1" />
                  <feGaussianBlur stdDeviation="2" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur1" />
                    <feMergeNode in="blur2" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Gradient for Lines */}
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="40%" stopColor="#ff4d6d" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ab0017" stopOpacity="0.7" />
                </linearGradient>

                {/* Flowing Pulse Gradient */}
                <linearGradient id="flow-packet" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ff2a4b" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* 1. IRAN PROVINCES SILHOUETTE - Metal Aluminum Tone with Distinct Visible Borders and Darker Pink Isfahan */}
              <g id="iran-provinces-group">
                {iranProvinces.map((prov) => {
                  const isIsfahanProv = prov.id === "isfahan";
                  return (
                    <path
                      key={prov.id}
                      id={prov.id}
                      d={prov.d}
                      fill={isIsfahanProv ? "#be185d" : "#cbcccb"}
                      stroke={isIsfahanProv ? "#831843" : "#334155"}
                      strokeWidth={isIsfahanProv ? "2.5" : "1.5"}
                      className="transition-colors duration-500 hover:brightness-105"
                    />
                  );
                })}
              </g>

              {/* 2. ISFAHAN RADAR WAVES / SONAR PULSES (DARKER DEEP PINK) */}
              <g id="isfahan-sonar" transform={`translate(${ISFAHAN.x}, ${ISFAHAN.y})`}>
                <circle
                  r="18"
                  fill="none"
                  stroke="#be185d"
                  strokeWidth="2.5"
                  className="animate-ping origin-center opacity-80"
                  style={{ animationDuration: "3s" }}
                />
                <circle
                  r="34"
                  fill="none"
                  stroke="#831843"
                  strokeWidth="2"
                  className="animate-ping origin-center opacity-60"
                  style={{ animationDuration: "3s", animationDelay: "1.2s" }}
                />
              </g>

              {/* 3. SHINY CONNECTING TRAJECTORY LINES */}
              <g id="shiny-trajectories">
                {CITIES.map((city, idx) => {
                  const isHovered = hoveredCity?.id === city.id || selectedCity?.id === city.id;

                  return (
                    <g key={`traj-${city.id}`}>
                      {/* Background Faint Path */}
                      <path
                        d={city.path}
                        fill="none"
                        stroke={isHovered ? "#ff4d6d" : "rgba(171, 0, 23, 0.35)"}
                        strokeWidth={isHovered ? "2.5" : "1.2"}
                        strokeLinecap="round"
                        className="transition-colors duration-300"
                      />

                      {/* Initial Entrance Drawing Line (with stroke-dashoffset transition) */}
                      <path
                        d={city.path}
                        fill="none"
                        stroke="url(#line-gradient)"
                        strokeWidth={isHovered ? "3.5" : "2"}
                        strokeLinecap="round"
                        filter="url(#dist-glow)"
                        style={{
                          strokeDasharray: "1000",
                          strokeDashoffset: isZoomed ? "1000" : "0",
                          transition: `stroke-dashoffset 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) ${city.delay}s`,
                        }}
                      />

                      {/* Continuous Smooth Flowing Energy Beam (Active when in flowing phase) */}
                      {animationPhase === "flowing" && (
                        <>
                          {/* Flowing animated dash beam */}
                          <path
                            d={city.path}
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth={isHovered ? "3" : "2"}
                            strokeDasharray="40 220"
                            strokeLinecap="round"
                            filter="url(#dist-neon)"
                            className="flowing-dash-beam"
                            style={{
                              animation: `flowingDash ${2.6 + (idx % 3) * 0.4}s linear infinite`,
                              animationDelay: `${idx * 0.3}s`,
                            }}
                          />

                          {/* Glowing photon particle traveling smoothly from Isfahan to City */}
                          <circle r={isHovered ? "4" : "3"} fill="#ffffff" filter="url(#dist-neon)">
                            <animateMotion
                              path={city.path}
                              dur={`${2.4 + (idx % 3) * 0.4}s`}
                              repeatCount="indefinite"
                              begin={`${idx * 0.3}s`}
                            />
                          </circle>
                        </>
                      )}
                    </g>
                  );
                })}
              </g>

              {/* 4. DESTINATION CITY NODES & LABELS */}
              <g id="destination-nodes">
                {CITIES.map((city) => {
                  const isHovered = hoveredCity?.id === city.id || selectedCity?.id === city.id;

                  // Label coordinates offset based on labelPos
                  let textAnchor: "start" | "middle" | "end" = "middle";
                  let dx = 0;
                  let dy = 0;

                  switch (city.labelPos) {
                    case "top":
                      dy = -16;
                      break;
                    case "bottom":
                      dy = 24;
                      break;
                    case "left":
                      textAnchor = "end";
                      dx = -16;
                      dy = 5;
                      break;
                    case "right":
                      textAnchor = "start";
                      dx = 16;
                      dy = 5;
                      break;
                    case "top-left":
                      textAnchor = "end";
                      dx = -12;
                      dy = -12;
                      break;
                    case "top-right":
                      textAnchor = "start";
                      dx = 12;
                      dy = -12;
                      break;
                    case "bottom-left":
                      textAnchor = "end";
                      dx = -12;
                      dy = 20;
                      break;
                    case "bottom-right":
                      textAnchor = "start";
                      dx = 12;
                      dy = 20;
                      break;
                  }

                  return (
                    <g
                      key={`node-${city.id}`}
                      transform={`translate(${city.x}, ${city.y})`}
                      className="cursor-pointer group"
                      onMouseEnter={() => setHoveredCity(city)}
                      onMouseLeave={() => setHoveredCity(null)}
                      onClick={() => setSelectedCity(selectedCity?.id === city.id ? null : city)}
                      style={{
                        opacity: isZoomed ? 0 : 1,
                        transition: `opacity 0.6s ease ${city.delay + 0.8}s, transform 0.3s ease`,
                      }}
                    >
                      {/* Aura Ripple */}
                      <circle
                        r="14"
                        fill="rgba(255, 42, 75, 0.2)"
                        className="animate-pulse"
                      />

                      {/* City Glow Circle */}
                      <circle
                        r={isHovered ? "7" : "5"}
                        fill={isHovered ? "#ff2a4b" : "#ffffff"}
                        stroke="#ab0017"
                        strokeWidth="2"
                        filter="url(#dist-glow)"
                        className="transition-all duration-300"
                      />

                      {/* White Core Dot */}
                      <circle r="2.5" fill="#ffffff" />

                      {/* City Name Label - Highly Visible with Contrast Halo */}
                      <text
                        x={dx}
                        y={dy}
                        textAnchor={textAnchor}
                        direction={isRTL ? "rtl" : "ltr"}
                        fill="#000000"
                        stroke="#000000"
                        strokeWidth="3.5"
                        strokeLinejoin="round"
                        fontSize="15"
                        fontWeight="900"
                        fontFamily="Vazirmatn, Tahoma, sans-serif"
                        className="select-none"
                      >
                        {city.name}
                      </text>
                      <text
                        x={dx}
                        y={dy}
                        textAnchor={textAnchor}
                        direction={isRTL ? "rtl" : "ltr"}
                        fill={isHovered ? "#ff2a4b" : "#ffffff"}
                        fontSize="15"
                        fontWeight="900"
                        fontFamily="Vazirmatn, Tahoma, sans-serif"
                        className="transition-colors duration-200 select-none"
                      >
                        {city.name}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* 5. ISFAHAN CENTRAL HUB (THE SOURCE - DEEP DARK PINK) */}
              <g
                id="central-hub-isfahan"
                transform={`translate(${ISFAHAN.x}, ${ISFAHAN.y})`}
                className="cursor-pointer"
                onClick={() => setSelectedCity(null)}
              >
                {/* Outer Ring */}
                <circle
                  r="20"
                  fill="rgba(190, 24, 93, 0.35)"
                  stroke="#831843"
                  strokeWidth="2"
                />

                {/* Main Hub Core */}
                <circle
                  r="11"
                  fill="#be185d"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  filter="url(#dist-neon)"
                />

                {/* Center White Dot */}
                <circle r="4" fill="#ffffff" />

                {/* Isfahan Central Label Pill */}
                <g transform="translate(0, -32)">
                  <rect
                    x="-55"
                    y="-16"
                    width="110"
                    height="30"
                    rx="15"
                    fill="rgba(10, 0, 2, 0.9)"
                    stroke="#be185d"
                    strokeWidth="2"
                    className="backdrop-blur-md"
                  />
                  <text
                    x="0"
                    y="5"
                    textAnchor="middle"
                    direction={isRTL ? "rtl" : "ltr"}
                    fill="#ffffff"
                    fontSize="16"
                    fontWeight="900"
                    fontFamily="Vazirmatn, Tahoma, sans-serif"
                    className="drop-shadow-md select-none"
                  >
                    {ISFAHAN.name}
                  </text>
                </g>
              </g>
            </svg>
          </div>

          {/* Floating Info Box for Active / Hovered City */}
          {(hoveredCity || selectedCity) && (
            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-ink-950/95 border border-[#ab0017]/50 metal-shadow backdrop-blur-md animate-in fade-in duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ab0017]/20 border border-[#ab0017]/40 flex items-center justify-center text-signal-400 shrink-0">
                  <Navigation className="w-5 h-5 -rotate-45" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-black text-white font-vazir">
                      {(hoveredCity || selectedCity)?.name}
                    </h4>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-ink-900 text-steel-400 font-vazir">
                      {(hoveredCity || selectedCity)?.province}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-steel-300 font-vazir mt-1">
                    {(hoveredCity || selectedCity)?.projects}
                  </p>
                </div>
              </div>
              <div className={`${isRTL ? 'text-right sm:text-left' : 'text-left sm:text-right'} shrink-0 self-start sm:self-center`}>
                <span className="text-[11px] text-signal-400 font-vazir font-bold block">
                  {dict.distribution.directShipment}
                </span>
                <span className="text-[10px] text-steel-400 font-vazir block">
                  {dict.distribution.safePackaging}
                </span>
              </div>
            </div>
          )}

          {/* Bottom Highlights Strip */}
          <div className={`mt-8 pt-6 border-t border-[#ab0017]/20 grid grid-cols-1 sm:grid-cols-3 gap-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-ink-950/50 border border-white/5">
              <Building className="w-5 h-5 text-signal-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white font-vazir">{dict.distribution.pillar1Title}</div>
                <div className="text-[11px] text-steel-400 font-vazir leading-relaxed mt-0.5">
                  {dict.distribution.pillar1Desc}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-ink-950/50 border border-white/5">
              <Truck className="w-5 h-5 text-signal-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white font-vazir">{dict.distribution.pillar2Title}</div>
                <div className="text-[11px] text-steel-400 font-vazir leading-relaxed mt-0.5">
                  {dict.distribution.pillar2Desc}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-ink-950/50 border border-white/5">
              <ShieldCheck className="w-5 h-5 text-signal-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white font-vazir">{dict.distribution.pillar3Title}</div>
                <div className="text-[11px] text-steel-400 font-vazir leading-relaxed mt-0.5">
                  {dict.distribution.pillar3Desc}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Style for Flowing Dash Beam Animation */}
      <style jsx>{`
        @keyframes flowingDash {
          0% {
            stroke-dashoffset: 260;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .flowing-dash-beam {
          will-change: stroke-dashoffset;
        }
      `}</style>
    </section>
  );
}
