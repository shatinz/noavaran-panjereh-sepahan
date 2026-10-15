import React from 'react';
import type { Metadata } from 'next';
import { getMaterials } from '@/lib/db';
import { MaterialsListClient } from './MaterialsListClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.com';

export const metadata: Metadata = {
  title: 'کاتالوگ پروفیل‌های آلومینیوم اختصاصی و مقاطع مهندسی | نوآوران پنجره سپاهان',
  description: 'کاتالوگ فنی و مقاطع انواع پروفیل‌های اختصاصی آلومینیوم ترمال‌بریک، نرمال، لامل کرتین‌وال و فریم‌لس با ممان اینرسی و رندرهای سه‌بعدی CAD.',
  alternates: {
    canonical: '/materials',
  },
  openGraph: {
    title: 'کاتالوگ مقاطع آلومینیوم اختصاصی | نوآوران پنجره سپاهان',
    description: 'بررسی مشخصات فنی، ممان اینرسی و رندرهای سه‌بعدی پروفیل‌های آلومینیوم ساختمانی.',
    url: `${siteUrl}/materials`,
  },
};

export default async function MaterialsPage() {
  const materials = await getMaterials();

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
        name: 'محصولات و سیستم‌ها',
        item: `${siteUrl}/materials`,
      },
    ],
  };

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'کاتالوگ پروفیل‌ها و مقاطع آلومینیوم اختصاصی',
    itemListElement: materials.map((m, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: `${m.title} - ${m.code}`,
      url: `${siteUrl}/materials/${m.id}`,
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
      <MaterialsListClient materials={materials} />
    </>
  );
}
