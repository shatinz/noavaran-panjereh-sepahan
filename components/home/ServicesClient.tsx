"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { NumberCard } from "../ui/NumberCard";
import { Reveal } from "../ui/Reveal";
import { getLocalMediaFallback } from "@/lib/media";
import { ServiceItem } from "@/lib/db";
import { useLanguage } from "@/lib/i18n/context";

export function ServicesClient({ servicesData }: { servicesData: ServiceItem[] }) {
  const { t, dict, dir } = useLanguage();

  return (
    <section id="services" className="py-16 md:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10" dir={dir}>
      <Reveal>
        <SectionHeading 
          title={t('services.headingTitle')} 
          subtitle={t('services.headingSubtitle')} 
          centered={true}
        />
      </Reveal>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {servicesData.slice(0, 6).map((service, idx) => {
          // Find translated service item if available
          const translatedItem = dict.services.items?.find(it => it.id === service.id || it.id === service.slug);
          const title = translatedItem?.title || service.title;
          const description = translatedItem?.summary || service.summary || "";

          return (
            <Reveal key={service.id} delay={idx * 100}>
              <NumberCard
                number={`0${idx + 1}`}
                title={title}
                description={description}
                image={getLocalMediaFallback(service.slug, 'service')}
                href={`/services/${service.slug}`}
                className="h-full"
              />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
