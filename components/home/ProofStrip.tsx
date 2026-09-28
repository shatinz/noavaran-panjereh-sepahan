import React from "react";
import { Reveal } from "../ui/Reveal";

import settingsData from "@/data/settings.json";
import projectsData from "@/data/projects.json";
import materialsData from "@/data/materials.json";

export function ProofStrip() {
  const currentPersianYear = parseInt(new Intl.DateTimeFormat('en-US-u-ca-persian', {year: 'numeric'}).format(new Date()));
  const yearsExp = currentPersianYear - settingsData.establishedYear;
  const projectCount = projectsData.length;
  const systemCount = materialsData.length;
  const factoryAreaMatch = settingsData.factoryArea.match(/[\d۰-۹]+/);
  const factoryArea = factoryAreaMatch ? factoryAreaMatch[0] : '';

  const toFa = (num: number | string) => Number(num).toLocaleString('fa-IR');

  const stats = [
    { value: <bdi dir="ltr">{`+${toFa(yearsExp)}`}</bdi>, label: "سال تجربه" },
    { value: <bdi dir="ltr">{`+${toFa(projectCount)}`}</bdi>, label: "پروژه اجرایی" },
    { value: toFa(factoryArea), label: "متر مربع مساحت کارخانه" },
    { value: toFa(systemCount), label: "سیستم آلومینیوم" },
  ];

  return (
    <section className="relative z-20 -mt-16 w-full max-w-[1440px] mx-auto px-4 sm:px-6" dir="rtl">
      <Reveal delay={200}>
        <div className="bg-metal-brushed metal-shadow rounded-2xl p-6 sm:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-x-reverse divide-steel-300">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-4xl md:text-5xl font-black text-signal-500 font-vazir mb-2 drop-shadow-md">
                {stat.value}
              </span>
              <span className="text-sm md:text-base font-bold text-ink-900 font-vazir">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
