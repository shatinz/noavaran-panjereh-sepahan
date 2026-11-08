"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { NumberCard } from "../ui/NumberCard";
import { Reveal } from "../ui/Reveal";
import { getLocalMediaFallback } from "@/lib/media";
import { ServiceItem } from "@/lib/db";
import { useLanguage } from "@/lib/i18n/context";

export function ServicesClient({ servicesData }: { servicesData: ServiceItem[] }) {
  const { t, dict, dir, locale } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const hasMoreThanSix = servicesData.length > 6;
  const visibleServices = isExpanded ? servicesData : servicesData.slice(0, 6);

  return (
    <section id="services" className="py-16 md:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10" dir={dir}>
      <Reveal>
        <SectionHeading
          title={t('services.headingTitle')}
          subtitle={t('services.headingSubtitle')}
          centered={true}
        />
      </Reveal>

      <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 transition-all duration-500">
        {visibleServices.map((service, idx) => {
          // Find translated service item if available
          const translatedItem = dict.services.items?.find(it => it.id === service.id || it.id === service.slug);
          let title = service.title;
          if (translatedItem?.title) {
            title = translatedItem.title;
          } else if (locale === 'en' && service.titleEn?.trim()) {
            title = service.titleEn.trim();
          } else {
            title = service.title;
          }

          const description = translatedItem?.summary || service.summary || "";
          const cardImage = service.image?.trim()
            ? service.image.trim()
            : getLocalMediaFallback(service.slug, 'service');

          return (
            <Reveal key={service.id || service.slug || idx} delay={Math.min(idx, 5) * 80}>
              <NumberCard
                number={String(idx + 1).padStart(2, '0')}
                title={title}
                description={description}
                image={cardImage}
                href={`/services/${service.slug}`}
                className="h-full"
              />
            </Reveal>
          );
        })}
      </div>

      {hasMoreThanSix && (
        <div className="mt-12 flex justify-center">
          <button
            id="services-toggle-btn"
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls="services-grid"
            className="group px-6 py-3 rounded-xl bg-ink-900/90 hover:bg-signal-500 text-steel-300 hover:text-white border border-ink-800 hover:border-signal-500/50 transition-all duration-300 text-xs md:text-sm font-bold font-vazir flex items-center gap-2 metal-shadow focus:outline-none focus:ring-2 focus:ring-signal-500"
          >
            <span>
              {isExpanded
                ? (locale === 'en' ? 'Show Less' : (locale === 'ar' ? 'عرض أقل' : 'بستن و نمایش کمتر'))
                : (locale === 'en' ? `View All Services (${servicesData.length})` : (locale === 'ar' ? `عرض كافة الخدمات (${servicesData.length})` : `مشاهده همه خدمات و راهکارها (${servicesData.length})`))}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-signal-500 group-hover:text-white transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-4 h-4 text-signal-500 group-hover:text-white transition-transform duration-300 group-hover:translate-y-0.5" />
            )}
          </button>
        </div>
      )}
    </section>
  );
}
