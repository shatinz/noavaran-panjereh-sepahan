"use client";

import React, { useEffect, useRef, useState } from "react";
import { Reveal } from "../ui/Reveal";
import { useLanguage } from "@/lib/i18n/context";

// Parse a stat value string into { prefix, numeric, suffix, raw }
// Examples: "+۳۰" -> { prefix: "+", numeric: 30, suffix: "" }
//           "+۲۰۰۰" -> { prefix: "+", numeric: 2000, suffix: "" }
//           "۱۲۰۰" -> { prefix: "", numeric: 1200, suffix: "" }
//           "+2,000" -> { prefix: "+", numeric: 2000, suffix: "" }
//           "١٬٢٠٠" -> { prefix: "", numeric: 1200, suffix: "" }
function parseStatValue(raw: string) {
  // Normalize Persian/Arabic digits to ASCII
  const norm = raw
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

  const match = norm.match(/^([^0-9]*)([0-9][0-9,.]*)([^0-9]*)$/);
  if (!match) return { prefix: "", numeric: 0, suffix: "", raw };
  const numeric = parseInt(match[2].replace(/[,.]/g, ""), 10) || 0;
  return { prefix: match[1], numeric, suffix: match[3], raw };
}

// Format a number back with the locale's digit set
function formatCount(n: number, parsed: ReturnType<typeof parseStatValue>, locale: string): string {
  const { prefix, suffix } = parsed;
  let numStr = String(n);

  // Add thousands separator like the original (if original had comma or morabba-separator)
  if (parsed.raw.includes(",") || parsed.raw.includes("٬") || parsed.raw.includes("،")) {
    numStr = n.toLocaleString("en-US");
  }

  if (locale === "fa") {
    numStr = numStr.replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
  } else if (locale === "ar") {
    numStr = numStr.replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);
    // Use Arabic thousands separator
    numStr = numStr.replace(/,/g, "٬");
  }
  return prefix + numStr + suffix;
}

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // ease out cubic

    const animate = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(ease(progress) * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [active, target, duration]);

  return count;
}

function StatItem({
  raw,
  label,
  locale,
  active,
  reducedMotion,
  delay,
}: {
  raw: string;
  label: string;
  locale: string;
  active: boolean;
  reducedMotion: boolean;
  delay: number;
}) {
  const parsed = parseStatValue(raw);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setStarted(true);
      return;
    }
    if (!active) {
      setStarted(false);
      return;
    }
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [active, reducedMotion, delay]);

  const count = useCountUp(parsed.numeric, reducedMotion ? 0 : 1200, started);

  const displayValue = reducedMotion || (!active && !started)
    ? raw
    : formatCount(count, parsed, locale);

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <span
        className="text-4xl md:text-5xl font-black text-signal-500 font-vazir mb-2 drop-shadow-md tabular-nums"
        style={{ minWidth: "4ch" }}
        aria-live="off"
      >
        <bdi dir="ltr">{displayValue}</bdi>
      </span>
      <span className="text-sm md:text-base font-bold text-ink-900 font-vazir">
        {label}
      </span>
    </div>
  );
}

interface ProofStripProps {
  customStats?: Array<{ raw: string; label: string }>;
}

export function ProofStrip({ customStats }: ProofStripProps = {}) {
  const [isInView, setIsInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { dict, dir, isRTL, locale } = useLanguage();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
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

    if (containerRef.current) observer.observe(containerRef.current);

    const timer = setTimeout(() => setIsInView(true), 300);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [reducedMotion]);

  // In English or Arabic mode, always prioritize the localized dictionary labels.
  // In Persian mode, allow customStats if valid, ensuring stale ongoing projects never override 1200 customers.
  const rawList =
    locale === "fa" && customStats && customStats.length >= 3
      ? customStats
      : [
          { raw: dict.proofStrip.stat1Value, label: dict.proofStrip.stat1Label },
          { raw: dict.proofStrip.stat2Value, label: dict.proofStrip.stat2Label },
          { raw: dict.proofStrip.stat3Value, label: dict.proofStrip.stat3Label },
        ];

  const stats = rawList.map((stat, idx) => {
    if (idx === 2) {
      if (
        stat.raw === "+۲۵" ||
        stat.raw === "+25" ||
        (stat.label && stat.label.includes("دست اجرا"))
      ) {
        return { raw: dict.proofStrip.stat3Value, label: dict.proofStrip.stat3Label };
      }
    }
    return stat;
  });

  return (
    <section className="relative z-20 -mt-16 w-full max-w-[1440px] mx-auto px-4 sm:px-6" dir={dir}>
      <Reveal delay={200}>
        <div
          ref={containerRef}
          className={`bg-metal-brushed metal-shadow rounded-2xl p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 divide-y sm:divide-y-0 ${
            isRTL ? "sm:divide-x sm:divide-x-reverse" : "sm:divide-x"
          } divide-steel-300 overflow-hidden`}
        >
          {stats.map((stat, idx) => (
            <StatItem
              key={idx}
              raw={stat.raw}
              label={stat.label}
              locale={locale}
              active={isInView}
              reducedMotion={reducedMotion}
              delay={idx * 100}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
