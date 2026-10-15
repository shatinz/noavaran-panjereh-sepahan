"use client";

import React from 'react';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getLocalMediaFallback } from '@/lib/media';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/context';
import { getLocalizedService } from '@/lib/i18n/entities';
import { ServiceItem } from '@/lib/db';

interface ServicesListClientProps {
  services: ServiceItem[];
}

export function ServicesListClient({ services }: ServicesListClientProps) {
  const { dict, locale, dir, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div dir={dir}>
      <Breadcrumbs items={[{ label: dict.nav.services }]} />
      <PageHero 
        title={dict.services.headingTitle} 
        subtitle={dict.services.headingSubtitle} 
      />

      <div className={`w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-12 ${isRTL ? 'text-right' : 'text-left'}`}>
        <p className="max-w-3xl mx-auto text-center text-lg text-steel-300 leading-relaxed font-vazir">
          {locale === 'en'
            ? "Computational design, shop drawings, automated plant production and certified turnkey installation using top-tier 6063-T6 architectural aluminium and European hardware."
            : (locale === 'ar'
              ? "تصميم هندسي، رسومات شوب دراوينغ، إنتاج صناعي دقيق وتنفيذ شامل بأجود سبائك الألمنيوم المعماري والإكسسوارات الأوروبية الأصلية."
              : "طراحی محاسباتی، نقشه‌کشی فاز ۲، ساخت دقیق کارخانه‌ای و اجرای در محل با استفاده از مرغوب‌ترین بیلت‌های آلومینیوم ۶۰۶۳ و یراق‌آلات اصیل اروپایی.")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const loc = getLocalizedService(s, locale);
            const imgSrc = getLocalMediaFallback(s.slug, 'service');
            return (
              <div
                key={s.id}
                className={`bg-ink-950 rounded-xl overflow-hidden flex flex-col justify-between group ${isRTL ? 'text-right' : 'text-left'} hover:border-signal-500/50 transition-colors border border-ink-800 metal-shadow`}
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={loc.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="p-6 pb-2 space-y-3">
                    <h2 className="text-xl font-black text-white group-hover:text-signal-500 transition-colors font-vazir">
                      {loc.title}
                    </h2>
                    <p className="text-sm text-steel-300 line-clamp-3 leading-relaxed font-vazir">
                      {loc.summary}
                    </p>
                  </div>

                  <div className="px-6 py-4 space-y-2">
                    <div className="text-xs font-bold text-white mb-3">
                      {locale === 'en' ? 'Key Technical Highlights:' : (locale === 'ar' ? 'أبرز الخصائص الفنية:' : 'ویژگی‌های فنی برجسته:')}
                    </div>
                    {loc.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-steel-300 font-vazir">
                        <CheckCircle2 className="w-4 h-4 text-signal-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <Link
                    href={`/services/${s.slug}`}
                    className="w-full py-3 px-4 rounded-lg bg-ink-900 hover:bg-signal-500 text-white text-sm font-bold flex items-center justify-between border border-ink-800 transition-all font-vazir group-hover:border-signal-500/50"
                  >
                    <span>
                      {locale === 'en' ? 'View Full Specifications' : (locale === 'ar' ? 'عرض المواصفات والمقاطع الكاملة' : 'مشاهده مشخصات کامل و مقاطع')}
                    </span>
                    <Arrow className={`w-5 h-5 ${isRTL ? '-scale-x-100' : ''}`} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
