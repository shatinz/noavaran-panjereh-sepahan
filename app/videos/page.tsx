import React from 'react';
import type { Metadata } from 'next';
import { getVideos } from '@/lib/db';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { VideosClient } from './VideosClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.vercel.app';

export const metadata: Metadata = {
  title: 'ویدیوهای آموزشی، مراحل نصب و انیمیشن مقاطع | نوآوران پنجره سپاهان',
  description: 'ویدیوهای آموزشی مراحل نصب نمای کرتین‌وال، انیمیشن‌های سه‌بعدی مونتاژ مقاطع آلومینیوم ترمال‌بریک، سیستم آب‌بندی EPDM و تست‌های آزمایشگاهی باد و زلزله.',
  alternates: {
    canonical: '/videos',
  },
  openGraph: {
    title: 'کتابخانه ویدیوهای آموزشی و مقاطع سه‌بعدی | نوآوران پنجره',
    description: 'مشاهده ویدیوهای آموزشی نصب و رندرهای فنی سیستم‌های درب، پنجره و نما.',
    url: `${siteUrl}/videos`,
  },
};

export default async function VideosPage() {
  const videos = await getVideos();

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
        name: 'پرتال ویدیوها',
        item: `${siteUrl}/videos`,
      },
    ],
  };

  const videoListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ویدیوهای آموزشی و فنی نوآوران پنجره سپاهان',
    itemListElement: videos.slice(0, 20).map((v, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'VideoObject',
        name: v.title,
        description: v.description || v.title,
        thumbnailUrl: v.thumbnail ? (v.thumbnail.startsWith('http') ? v.thumbnail : `${siteUrl}${v.thumbnail}`) : `${siteUrl}/images/og-image.png`,
        uploadDate: '2026-01-01T08:00:00Z',
        embedUrl: v.videoUrl,
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoListLd) }}
      />
      <Breadcrumbs items={[{ label: 'پرتال ویدیوها' }]} />
      <PageHero 
        title="کتابخانه ویدیوهای تخصصی و انیمیشن مقاطع" 
        subtitle="آموزش‌های فنی و رندرهای سه‌بعدی سیستم‌ها"
      />
      <VideosClient videos={videos} />
    </>
  );
}
