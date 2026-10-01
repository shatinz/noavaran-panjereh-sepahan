import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getMaterials } from '@/lib/db';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArrowLeft, Play } from 'lucide-react';
import { getLocalMediaFallback, withBasePath } from '@/lib/media';

import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.vercel.app';

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
      <Breadcrumbs items={[{ label: 'محصولات و سیستم‌ها' }]} />
      <PageHero 
        title="کاتالوگ محصولات و سیستم‌های اختصاصی" 
        subtitle="پروفیل‌های ترمال‌بریک و نرمال"
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-12" dir="rtl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((m) => {
            const imgSrc = withBasePath(m.image) || getLocalMediaFallback(m.id, 'material');
            return (
              <div
                key={m.id}
                className="bg-ink-950 rounded-xl flex flex-col group text-right hover:border-signal-500/50 transition-colors border border-ink-800 metal-shadow"
              >
                <div className="relative aspect-square w-full bg-white overflow-hidden rounded-t-xl p-4 flex items-center justify-center">
                  <Image
                    src={imgSrc}
                    alt={m.title}
                    width={300}
                    height={300}
                    className="max-h-full max-w-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  />
                  {m.videoUrl && (
                    <div className="absolute top-4 right-4 bg-ink-950/80 backdrop-blur-md p-2 rounded-full border border-ink-800 shadow-lg">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-ink-900 text-white text-xs font-mono px-2 py-1 rounded shadow-lg">
                    {m.code}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-black text-white font-vazir">{m.title}</h2>
                    <span className="text-[10px] bg-ink-900 text-steel-400 px-2 py-1 rounded-full font-bold">
                      {m.category}
                    </span>
                  </div>
                  <p className="text-xs text-steel-400 line-clamp-2 font-vazir leading-relaxed flex-grow">
                    {m.summary}
                  </p>
                  
                  <Link
                    href={`/materials/${m.id}`}
                    className="mt-6 w-full py-3 rounded-lg bg-ink-900 hover:bg-signal-500 text-white text-xs font-bold flex items-center justify-center gap-2 border border-ink-800 transition-all font-vazir group-hover:border-signal-500/50"
                  >
                    <span>مشاهده مشخصات فنی</span>
                    <ArrowLeft className="w-4 h-4 -scale-x-100" />
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
