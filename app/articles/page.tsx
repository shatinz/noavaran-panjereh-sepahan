import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/db';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Calendar, ArrowLeft } from 'lucide-react';
import { getLocalMediaFallback, withBasePath } from '@/lib/media';

import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.vercel.app';

export const metadata: Metadata = {
  title: 'دانشنامه و مقالات تخصصی مهندسی نما و پنجره | نوآوران پنجره سپاهان',
  description: 'مقالات علمی، استانداردهای ملی ساختمان، عایق‌بندی صوتی و حرارتی، مقایسه ترمال‌بریک با UPVC و راهنمای انتخاب شیشه و نمای کرتین‌وال.',
  alternates: {
    canonical: '/articles',
  },
  openGraph: {
    title: 'دانشنامه و مقالات تخصصی نما و پنجره | نوآوران پنجره سپاهان',
    description: 'مرجع دانش فنی و استانداردهای مهندسی نما و پنجره‌های آلومینیومی دوجداره.',
    url: `${siteUrl}/articles`,
  },
};

export default async function ArticlesPage() {
  const articles = await getArticles();

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
        name: 'دانشنامه و مقالات',
        item: `${siteUrl}/articles`,
      },
    ],
  };

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'دانشنامه تخصصی نوآوران پنجره سپاهان',
    itemListElement: articles.map((a, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: a.title,
      url: `${siteUrl}/articles/${a.slug}`,
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
      <Breadcrumbs items={[{ label: 'دانشنامه و مقالات' }]} />
      <PageHero 
        title="دانشنامه و مقالات تخصصی" 
        subtitle="دانش فنی مهندسی نما و پنجره"
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-12" dir="rtl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a) => {
            const imgSrc = withBasePath(a.image) || getLocalMediaFallback(a.slug, 'article');
            return (
              <Link
                href={`/articles/${a.slug}`}
                key={a.id}
                className="group bg-ink-950 border border-ink-800 rounded-xl overflow-hidden metal-shadow hover:border-signal-500/50 transition-colors flex flex-col h-full text-right"
              >
                <div className="relative aspect-video w-full bg-ink-900 overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={a.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-signal-500 text-white text-[10px] font-bold rounded-lg border border-signal-500">
                    {a.category}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-[10px] text-steel-400 font-mono font-bold mb-3">
                    <Calendar className="w-3.5 h-3.5 text-signal-500" />
                    <span>{a.date}</span>
                  </div>
                  <h2 className="text-lg font-black text-white font-vazir group-hover:text-signal-500 transition-colors mb-3 line-clamp-2">
                    {a.title}
                  </h2>
                  <p className="text-xs text-steel-400 line-clamp-3 leading-relaxed font-vazir mb-6 flex-grow">
                    {a.excerpt}
                  </p>
                  
                  <div className="pt-4 border-t border-ink-800 flex items-center justify-between text-xs font-bold text-steel-300 font-vazir group-hover:text-signal-500 transition-colors mt-auto">
                    <span>مطالعه کامل مقاله</span>
                    <ArrowLeft className="w-4 h-4 -scale-x-100" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
