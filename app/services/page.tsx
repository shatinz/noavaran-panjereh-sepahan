import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getServices } from '@/lib/db';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getLocalMediaFallback } from '@/lib/media';
import Image from 'next/image';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.vercel.app';

export const metadata: Metadata = {
  title: 'سبد محصولات و خدمات مهندسی نما و پنجره | نوآوران پنجره سپاهان',
  description: 'سیستم‌های ۶ گانه تخصصی: درب و پنجره دوجداره آلومینیوم ترمال‌بریک، کرتین وال (لامل)، نمای فریم‌لس، شیشه بالکن تاشو و ریلی (جام‌بالکنی)، نمای کامپوزیت آلومینیوم و هندریل شیشه‌ای.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'خدمات مهندسی نما و پنجره ترمال‌بریک | نوآوران پنجره سپاهان',
    description: 'کاتالوگ و مشخصات سیستم‌های ۶ گانه طراحی، تولید کارخانه‌ای و اجرای نماهای مدرن و پنجره‌های ساختمانی.',
    url: `${siteUrl}/services`,
  },
};

export default async function ServicesPage() {
  const services = await getServices();

  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'صفحه اصلی',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'خدمات و راهکارها',
        item: `${siteUrl}/services`,
      },
    ],
  };

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'سیستم‌های مهندسی نما و پنجره نوآوران پنجره سپاهان',
    itemListElement: services.map((s, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: s.title,
      url: `${siteUrl}/services/${s.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <Breadcrumbs items={[{ label: 'خدمات و راهکارها' }]} />
      <PageHero 
        title="سبد کامل خدمات و محصولات" 
        subtitle="سیستم‌های ۶ گانه مهندسی نما و پنجره"
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-12" dir="rtl">
        <p className="max-w-3xl mx-auto text-center text-lg text-steel-300 leading-relaxed font-vazir">
          طراحی محاسباتی، نقشه‌کشی فاز ۲، ساخت دقیق کارخانه‌ای و اجرای در محل با استفاده از مرغوب‌ترین بیلت‌های آلومینیوم ۶۰۶۳ و یراق‌آلات اصیل اروپایی.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const imgSrc = getLocalMediaFallback(s.slug, 'service');
            return (
              <div
                key={s.id}
                className="bg-ink-950 rounded-xl overflow-hidden flex flex-col justify-between group text-right hover:border-signal-500/50 transition-colors border border-ink-800 metal-shadow"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={s.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="p-6 pb-2 space-y-3">
                    <h2 className="text-xl font-black text-white group-hover:text-signal-500 transition-colors font-vazir">
                      {s.title}
                    </h2>
                    <p className="text-sm text-steel-300 line-clamp-3 leading-relaxed font-vazir">
                      {s.summary}
                    </p>
                  </div>

                  <div className="px-6 py-4 space-y-2">
                    <div className="text-xs font-bold text-white mb-3">ویژگی‌های فنی برجسته:</div>
                    {s.features.slice(0, 3).map((f, i) => (
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
                    <span>مشاهده مشخصات کامل و مقاطع</span>
                    <ArrowLeft className="w-5 h-5 -scale-x-100" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
