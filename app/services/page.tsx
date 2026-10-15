import React from 'react';
import type { Metadata } from 'next';
import { getServices } from '@/lib/db';
import { ServicesListClient } from './ServicesListClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.com';

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
      <ServicesListClient services={services} />
    </>
  );
}
