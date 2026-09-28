import React from 'react';
import { getVideos } from '@/lib/db';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { VideosClient } from './VideosClient';

export const metadata = {
  title: 'ویدیوهای آموزشی و انیمیشن مقاطع | نوآوران پنجره سپاهان',
  description: 'ویدیوهای آموزشی مراحل نصب، انیمیشن‌های سه‌بعدی مونتاژ مقاطع و تکنولوژی‌های آب‌بندی پنجره‌های ترمال‌بریک.',
};

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <>
      <Breadcrumbs items={[{ label: 'پرتال ویدیوها' }]} />
      <PageHero 
        title="کتابخانه ویدیوهای تخصصی و انیمیشن مقاطع" 
        subtitle="آموزش‌های فنی و رندرهای سه‌بعدی سیستم‌ها"
      />
      <VideosClient videos={videos} />
    </>
  );
}
