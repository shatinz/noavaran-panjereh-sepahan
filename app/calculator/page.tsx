import React from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CalculatorClient } from '@/components/calculator/CalculatorClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.vercel.app';

export const metadata: Metadata = {
  title: 'محاسبه آنلاین قیمت پنجره ترمال‌بریک و کرتین‌وال | نوآوران پنجره سپاهان',
  description: 'محاسبه‌گر هوشمند متراژ و پیش‌فاکتور آنلاین برای انواع پنجره‌های دوجداره آلومینیوم ترمال‌بریک، لیفت‌انداسلاید، نمای کرتین‌وال، فریم‌لس و جام‌بالکنی با ارسال مستقیم به واتساپ مهندسی شرکت.',
  alternates: {
    canonical: '/calculator',
  },
  openGraph: {
    title: 'محاسبه آنلاین قیمت پنجره دوجداره و نمای شیشه‌ای | نوآوران پنجره',
    description: 'برآورد آنی متراژ و صدور پیش‌فاکتور پنجره ترمال‌بریک و نماهای ساختمانی.',
    url: `${siteUrl}/calculator`,
  },
};

export default function CalculatorPage() {
  const toolLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'محاسبه‌گر آنلاین متراژ و قیمت پنجره ترمال‌بریک و نما',
    url: `${siteUrl}/calculator`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: 'ابزار آنلاین برآورد قیمت هر مترمربع پنجره‌های دوجداره آلومینیوم ترمال‌بریک، کرتین‌وال و نماهای مدرن.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'IRR',
    },
  };

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
        name: 'ماشین‌حساب متراژ و قیمت',
        item: `${siteUrl}/calculator`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <Breadcrumbs items={[{ label: 'ماشین‌حساب متراژ و قیمت' }]} />
      <PageHero 
        title="برآورد آنلاین متراژ و قیمت" 
        subtitle="محاسبه‌گر هوشمند پروژه‌های نما و پنجره"
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-12" dir="rtl">
        <CalculatorClient />
      </div>
    </>
  );
}
