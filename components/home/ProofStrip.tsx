"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function StatItem({
  raw,
  label,
  locale,
  progress,
}: {
  raw: string;
  label: string;
  locale: string;
  progress: number;
}) {
  const parsed = parseStatValue(raw);
  const displayValue =
    progress >= 1 ? raw : formatCount(Math.round(easeOut(progress) * parsed.numeric), parsed, locale);

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
  // Scroll-driven progress (0 -> 1). Starts at 1 so server-rendered HTML shows final values;
  // the layout effect below replaces it with the real scroll position before first paint.
  const [progress, setProgress] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const { dict, dir, isRTL, locale } = useLanguage();

  useIsoLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the strip's top edge is just entering the viewport bottom,
      // 1 when it has travelled up to ~55% of the viewport height.
      const start = vh - 40;
      const end = vh * 0.55;
      setProgress(clamp01((start - rect.top) / (start - end)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

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

  const boxProgress = easeOut(clamp01(progress * 1.6));

  return (
    <section ref={sectionRef} className="relative z-20 -mt-16 w-full max-w-[1440px] mx-auto px-4 sm:px-6" dir={dir}>
      <div>
        <div
          style={{
            opacity: boxProgress,
            transform: `translateY(${(1 - boxProgress) * 48}px)`,
            willChange: progress < 1 ? "opacity, transform" : undefined,
          }}
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
              progress={clamp01(progress * 1.4 - idx * 0.15)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
