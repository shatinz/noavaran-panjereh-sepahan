import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { NumberCard } from "../ui/NumberCard";
import { Reveal } from "../ui/Reveal";
import { getLocalMediaFallback } from "@/lib/media";
import servicesData from "../../data/services.json";

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10" dir="rtl">
      <Reveal>
        <SectionHeading 
          title="خدمات و راهکارهای مهندسی" 
          subtitle="تخصص ما در صنعت آلومینیوم" 
          centered={true}
        />
      </Reveal>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {servicesData.slice(0, 6).map((service, idx) => (
          <Reveal key={service.id} delay={idx * 100}>
            <NumberCard
              number={`0${idx + 1}`}
              title={service.title}
              description={service.summary || ""}
              image={getLocalMediaFallback(service.slug, 'service')}
              href={`/services/${service.slug}`}
              className="h-full"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
