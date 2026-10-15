import React from 'react';
import type { Metadata } from 'next';
import { ContactClient } from './ContactClient';
import { getSettings } from '@/lib/db';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.com';

export const metadata: Metadata = {
  title: 'تماس با ما | مشاوره تخصصی و استعلام قیمت نما و پنجره ترمال‌بریک',
  description: 'راه‌های ارتباط با دفتر مهندسی فروش و کارخانه نوآوران پنجره سپاهان در اصفهان. تماس با ۳۳۶۸۷۷۵۵-۰۳۱ و موبایل ۰۹۳۰۱۵۴۵۸۵۸ جهت استعلام قیمت، برآورد متراژ و بازدید پروژه.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'تماس با نوآوران پنجره سپاهان | استعلام قیمت و مشاوره مهندسی',
    description: 'مشاوره رایگان، برآورد دقیق قیمت و صدور پیش‌فاکتور نماهای مدرن کرتین‌وال و پنجره‌های اختصاصی ترمال‌بریک.',
    url: `${siteUrl}/contact`,
  },
};

export default async function ContactPage() {
  const settingsData = await getSettings();
  const contactLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'تماس با نوآوران پنجره سپاهان',
    description: 'درخواست مشاوره، برآورد قیمت و اطلاعات تماس دفتر مهندسی و کارخانه نوآوران پنجره سپاهان',
    url: `${siteUrl}/contact`,
    mainEntity: {
      '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
      name: settingsData.companyName,
      telephone: settingsData.phone,
      email: settingsData.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: settingsData.officeAddress,
        addressLocality: 'Isfahan',
        addressRegion: 'Isfahan',
        addressCountry: 'IR',
        postalCode: settingsData.postalCode,
      },
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
        name: 'تماس با ما',
        item: `${siteUrl}/contact`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <ContactClient settingsData={settingsData} />
    </>
  );
}
