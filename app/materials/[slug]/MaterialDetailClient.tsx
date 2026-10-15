"use client";

import React from 'react';
import Image from 'next/image';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SpecTable } from '@/components/ui/SpecTable';
import { CheckCircle2, ShieldCheck, Phone, ExternalLink } from 'lucide-react';
import { telHref } from '@/lib/phone';
import { extractVideoInfo } from '@/lib/video';
import { useLanguage } from '@/lib/i18n/context';
import { getLocalizedMaterial } from '@/lib/i18n/entities';
import { MaterialItem, CompanySettings } from '@/lib/db';

interface MaterialDetailClientProps {
  material: MaterialItem;
  settings: CompanySettings;
  imgSrc: string;
}

export function MaterialDetailClient({ material, settings, imgSrc }: MaterialDetailClientProps) {
  const { dict, locale, dir, isRTL } = useLanguage();
  const loc = getLocalizedMaterial(material, locale);

  return (
    <div dir={dir}>
      <Breadcrumbs items={[
        { label: dict.nav.materials, href: '/materials' },
        { label: loc.title }
      ]} />
      
      <PageHero 
        title={loc.title}
        subtitle={`${loc.category} - ${material.code}`}
      />

      <div className={`w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-12 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Product Overview */}
            <section className="bg-ink-950 border border-ink-800 rounded-xl overflow-hidden metal-shadow flex flex-col sm:flex-row">
              <div className={`w-full sm:w-1/3 bg-white p-6 flex items-center justify-center border-b sm:border-b-0 ${isRTL ? 'sm:border-l' : 'sm:border-r'} border-ink-800`}>
                <Image 
                  src={imgSrc} 
                  alt={loc.title} 
                  width={400} 
                  height={400} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="p-6 md:p-8 sm:w-2/3 space-y-4 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2">
                  <span className="px-3 py-1 bg-ink-900 text-white text-xs font-mono font-bold rounded-lg border border-ink-800">
                    {material.code}
                  </span>
                  <span className="text-xs text-signal-500 font-bold px-3 py-1 bg-signal-500/10 rounded-lg">
                    {loc.category}
                  </span>
                </div>
                <h1 className="text-2xl font-black text-white font-vazir">{loc.title}</h1>
                <p className="text-steel-300 leading-relaxed font-vazir">
                  {loc.summary}
                </p>
              </div>
            </section>

            {/* Video & 3D Model Section */}
            {material.videoUrl && (
              <section className="space-y-6">
                <h2 className={`text-2xl font-black text-white font-vazir ${isRTL ? 'border-r-4 pr-4' : 'border-l-4 pl-4'} border-signal-500`}>
                  {locale === 'en' ? '3D CAD Model & Profile Presentation' : (locale === 'ar' ? 'العرض ثلاثي الأبعاد والتعريف بالمقاطع' : 'رندر سه‌بعدی و معرفی مقاطع')}
                </h2>
                <div className="aspect-video bg-ink-900 rounded-xl overflow-hidden border border-ink-800 metal-shadow">
                  {extractVideoInfo(material.videoUrl, 'aparat').embedUrl ? (
                    <iframe
                      src={extractVideoInfo(material.videoUrl, 'aparat').embedUrl}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-none"
                      title={loc.title}
                    />
                  ) : (
                    <video
                      src={material.videoUrl}
                      controls
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                {material.qrUrl && (
                  <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
                    <a
                      href={material.qrUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-ink-900 hover:bg-ink-800 text-white text-sm font-bold rounded-lg border border-ink-800 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{locale === 'en' ? 'Direct Manufacturer Catalog Link & QR' : (locale === 'ar' ? 'الرابط المباشر ورمز QR لكتالوج المصنع' : 'لینک مستقیم و QR Code کاتالوگ سازنده')}</span>
                    </a>
                  </div>
                )}
              </section>
            )}

            {/* Features */}
            {material.features && material.features.length > 0 && (
              <section className="space-y-6">
                <h2 className={`text-2xl font-black text-white font-vazir ${isRTL ? 'border-r-4 pr-4' : 'border-l-4 pl-4'} border-signal-500`}>
                  {locale === 'en' ? 'Key Features & Advantages' : (locale === 'ar' ? 'المزايا والخصائص الفنية' : 'مزایا و ویژگی‌های کاربردی')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {material.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-ink-900 border border-ink-800 rounded-xl text-steel-300 font-vazir">
                      <CheckCircle2 className="w-5 h-5 text-signal-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8 relative">
            {material.specs && (
              <SpecTable specs={material.specs} />
            )}

            <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blood-900/20 via-ink-900 to-ink-950 border border-signal-500/20 rounded-xl p-6 md:p-8 space-y-6 text-center metal-shadow sticky top-24">
              <ShieldCheck className="w-12 h-12 text-signal-500 mx-auto" />
              <div className="space-y-2">
                <h4 className="text-xl font-black text-white font-vazir">
                  {locale === 'en' ? 'Technical Profile Consultation' : (locale === 'ar' ? 'استشارة فنية للمقاطع' : 'مشاوره فنی پروفیل')}
                </h4>
                <p className="text-sm text-steel-300 leading-relaxed font-vazir">
                  {locale === 'en'
                    ? 'Contact our technical sales team for daily billet pricing, warehouse stock, and tonnage estimation.'
                    : (locale === 'ar'
                      ? 'تواصل مع فريق المبيعات الهندسية للاستعلام عن أسعار المقاطع ومخزون المستودع.'
                      : 'جهت دریافت قیمت روز بیلت، موجودی انبار و استعلام تناژ با مهندسی فروش تماس بگیرید.')}
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
