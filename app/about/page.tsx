import React from 'react';
import { getSettings } from '@/lib/db';
import { AboutClient } from './AboutClient';
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.com';

export const metadata: Metadata = {
  title: 'درباره ما | کارخانه نوآوران پنجره سپاهان و پیشینه ۳۰ ساله',
  description: 'آشنایی با تاریخچه شرکت، مشخصات ثبتی، کارخانه ۱۵۰۰ متری مجهز به ماشین‌آلات CNC و خطوط مکانیزه تولید نماهای مدرن کرتین‌وال و پنجره‌های ترمال‌بریک در اصفهان.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'درباره نوآوران پنجره سپاهان | کارخانه تولید نما و پنجره',
    description: '۳۰ سال تجربه در زمینه طراحی محاسباتی و تولید صنعتی نماهای ساختمانی و پنجره‌های آلومینیومی دوجداره.',
    url: `${siteUrl}/about`,
  },
};

export default async function AboutPage() {
  const settings = await getSettings();

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
        name: 'درباره ما',
        item: `${siteUrl}/about`,
      },
    ],
  };

  const aboutLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'درباره کارخانه و شرکت نوآوران پنجره سپاهان',
    description: 'تاریخچه تاسیس، خطوط تولید کارخانه‌ای و دستاوردهای شرکت نوآوران پنجره سپاهان',
    url: `${siteUrl}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: 'نوآوران پنجره',
      legalName: settings.companyName,
      alternateName: [
        'نوآوران پنجره سپاهان',
        'نواروان پنجره',
        'نواروان پنجره سپاهان',
        'Noavaran Panjereh',
        'Noavaran Panjereh Sepahan',
      ],
      foundingDate: '2006',
      taxID: settings.nationalId,
      address: {
        '@type': 'PostalAddress',
        streetAddress: settings.officeAddress,
        addressLocality: 'Isfahan',
        addressCountry: 'IR',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }}
      />
      <AboutClient settings={settings} />
    </>
  );
}
