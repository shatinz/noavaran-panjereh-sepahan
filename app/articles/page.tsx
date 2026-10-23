import React from 'react';
import type { Metadata } from 'next';
import { getArticles, getCategories } from '@/lib/db';
import { ArticlesListClient } from './ArticlesListClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.com';

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
  const [articles, categoriesData] = await Promise.all([getArticles(), getCategories()]);

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
      <ArticlesListClient articles={articles} categories={categoriesData.articles} />
    </>
  );
}
