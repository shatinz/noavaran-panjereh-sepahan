import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { MetalCard } from "../ui/MetalCard";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import materialsData from "../../data/materials.json";

export function SystemsGrid() {
  return (
    <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 relative" dir="rtl">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blood-900/10 blur-[120px] rounded-full pointer-events-none" />

      <Reveal>
        <div className="mb-12 md:mb-16">
          <SectionHeading 
            title="سیستم‌ها و پروفیل‌های اختصاصی" 
            subtitle="محصولات ترمال‌بریک و نرمال" 
            centered={true}
            className="mb-0 mx-auto"
          />
        </div>
      </Reveal>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 relative z-10">
        {materialsData.slice(0, 8).map((system, idx) => {
          const specs = (system as any).specs ? Object.values((system as any).specs).filter(v => typeof v === 'string') as string[] : [];
          return (
            <Reveal key={system.id} delay={idx * 50}>
              <MetalCard
                imageSrc={system.image || "/projects/proj-1.webp"}
                imageAlt={system.title}
                title={system.title}
                badge={system.category}
                specs={specs}
                className="h-full"
              />
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={200}>
        <div className="mt-12 flex justify-center">
          <Button variant="steel" href="/materials" className="px-8 py-3 font-bold">
            مشاهده همه {materialsData.length.toLocaleString('fa-IR')} سیستم
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
