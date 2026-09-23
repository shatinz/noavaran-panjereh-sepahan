import React from 'react';
import { getVideos } from '@/lib/db';
import VideoHub from '@/components/VideoHub';

export const metadata = {
  title: 'کتابخانه ویدیوهای آموزشی و مهندسی نما | نوآوران پنجره سپاهان',
  description: 'ویدیوهای آموزشی مراحل نصب پنجره، تفاوت‌های سیستم‌های کرتین‌وال، تست‌های آکوستیک و آب‌بندی در آپارات و یوتیوب.',
};

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 text-[#1a1a1a]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="aluminum-header inline-block px-3 py-1 rounded-[3px] text-[#1a1a1a] text-xs font-bold border border-[#b5b8b5] shadow-sm uppercase tracking-widest">
          پرتال آموزش‌های چندرسانه‌ای
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a1a] mt-3">
          کتابخانه ویدیوهای آموزشی نوآوران پنجره سپاهان
        </h1>
        <p className="mt-4 text-sm text-[#555] leading-relaxed">
          مجموعه فیلم‌های مستند از نحوه نصب، مکانیزم بوژی‌های لیفت‌اند‌اسلاید، کالبدشکافی پروفیل‌های آلومینیوم استاندارد و تست‌های میدانی آکوستیک، با قابلیت پخش مستقیم از بسترهای آپارات و یوتیوب.
        </p>
      </div>

      <VideoHub videos={videos} />
    </div>
  );
}
