"use client";

import React, { useEffect, useRef, useState } from "react";
import { Reveal } from "../ui/Reveal";

export function ProofStrip() {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If user prefers reduced motion or already scrolled past
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Safety fallback
    const timer = setTimeout(() => {
      setIsInView(true);
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const stats = [
    { value: <bdi dir="ltr">+۳۰</bdi>, label: "سال تجربه درخشان" },
    { value: <bdi dir="ltr">+۲۰۰۰</bdi>, label: "پروژه اجرایی موفق" },
    { value: <bdi dir="ltr">+۱۲</bdi>, label: "سیستم اختصاصی آلومینیوم" },
  ];

  return (
    <section className="relative z-20 -mt-16 w-full max-w-[1440px] mx-auto px-4 sm:px-6" dir="rtl">
      <Reveal delay={200}>
        <div 
          ref={containerRef}
          className="bg-metal-brushed metal-shadow rounded-2xl p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-steel-300 overflow-hidden"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center px-4 overflow-hidden">
              <span 
                className="text-4xl md:text-5xl font-black text-signal-500 font-vazir mb-2 drop-shadow-md inline-block will-change-transform"
                style={{
                  animation: isInView
                    ? `numberDropDown 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 160}ms both`
                    : "none",
                  opacity: isInView ? 1 : 0,
                }}
              >
                {stat.value}
              </span>
              <span className="text-sm md:text-base font-bold text-ink-900 font-vazir">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <style jsx>{`
        @keyframes numberDropDown {
          0% {
            opacity: 0;
            transform: translateY(-55px) scale(0.85);
          }
          65% {
            opacity: 1;
            transform: translateY(8px) scale(1.05);
          }
          85% {
            transform: translateY(-3px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
