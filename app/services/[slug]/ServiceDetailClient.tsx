"use client";

import React from 'react';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SpecTable } from '@/components/ui/SpecTable';
import { CheckCircle2, ShieldCheck, Phone } from 'lucide-react';
import { telHref } from '@/lib/phone';
import { useLanguage } from '@/lib/i18n/context';
import { getLocalizedService } from '@/lib/i18n/entities';
import { ServiceItem, CompanySettings } from '@/lib/db';

interface ServiceDetailClientProps {
  service: ServiceItem;
  settings: CompanySettings;
  imgSrc: string;
}

export function ServiceDetailClient({ service, settings, imgSrc }: ServiceDetailClientProps) {
  const { dict, locale, dir, isRTL } = useLanguage();
  const loc = getLocalizedService(service, locale);

  return (
    <div dir={dir}>
      <Breadcrumbs items={[
        { label: dict.nav.services, href: '/services' },
        { label: loc.title }
      ]} />
      
      <PageHero 
        title={loc.title}
        subtitle={loc.titleEn}
        bgImage={imgSrc}
      />

      <div className={`w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-12 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-6">
              <h2 className={`text-2xl font-black text-white font-vazir ${isRTL ? 'border-r-4 pr-4' : 'border-l-4 pl-4'} border-signal-500`}>
                {locale === 'en' ? 'System Overview' : (locale === 'ar' ? 'نظرة عامة على النظام' : 'معرفی سیستم')}
              </h2>
              <p className="text-steel-300 leading-relaxed font-vazir text-lg">
                {loc.summary}
              </p>
              
              <div className="bg-ink-900 border border-ink-800 rounded-xl p-6 md:p-8 space-y-6">
                <h3 className="text-lg font-bold text-white font-vazir">
                  {locale === 'en' ? 'Key Features & Engineering Benefits' : (locale === 'ar' ? 'المزايا والخصائص الهندسية' : 'ویژگی‌ها و مزایای برجسته')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {loc.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-steel-300 font-vazir">
                      <CheckCircle2 className="w-5 h-5 text-signal-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {loc.subcategories && loc.subcategories.length > 0 && (
              <section className="space-y-6">
                <h2 className={`text-2xl font-black text-white font-vazir ${isRTL ? 'border-r-4 pr-4' : 'border-l-4 pl-4'} border-signal-500`}>
                  {locale === 'en' ? 'System Configurations & Variations' : (locale === 'ar' ? 'أنواع الأنظمة والتكوينات المعمارية' : 'انواع سیستم‌ها و زیرمجموعه‌ها')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {loc.subcategories.map((sub, idx) => (
                    <div key={idx} className="bg-ink-950 border border-ink-800 rounded-xl p-6 space-y-3 metal-shadow hover:border-signal-500/30 transition-colors">
                      <h3 className="text-lg font-bold text-white font-vazir">{sub.name}</h3>
                      <p className="text-sm text-steel-400 leading-relaxed font-vazir">{sub.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8 relative">
            {loc.technicalSpecs && (
              <SpecTable specs={loc.technicalSpecs} />
            )}

            <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blood-900/20 via-ink-900 to-ink-950 border border-signal-500/20 rounded-xl p-6 md:p-8 space-y-6 text-center metal-shadow sticky top-24">
              <ShieldCheck className="w-12 h-12 text-signal-500 mx-auto" />
              <div className="space-y-2">
                <h4 className="text-xl font-black text-white font-vazir">
                  {dict.footer.freeConsultation}
                </h4>
                <p className="text-sm text-steel-300 leading-relaxed font-vazir">
                  {dict.footer.consultationDesc}
                </p>
              </div>
              
              <div className="space-y-3 pt-2">
                <a href={`tel:${telHref(settings.phone)}`} className="flex items-center justify-center gap-2 w-full py-3 bg-signal-500 hover:bg-signal-400 text-white font-bold rounded-lg transition-colors font-sans" dir="ltr">
                  <Phone className="w-5 h-5" />
                  <bdi dir="ltr" style={{ unicodeBidi: 'isolate' }}>{settings.phone}</bdi>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
