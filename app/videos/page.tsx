import React from 'react';
import { getVideos } from '@/lib/db';
import VideoHub from '@/components/VideoHub';
import { Video, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'کتابخانه ویدیوهای آموزشی و انیمیشن مقاطع | نوآوران پنجره سپاهان',
  description: 'ویدیوهای آموزشی مراحل نصب پنجره، تفاوت‌های سیستم‌های کرتین‌وال، تست‌های آکوستیک و آب‌بندی و انیمیشن‌های سه‌بعدی مونتاژ مقاطع مهندسی.',
};

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 py-4 space-y-5">
      {/* Header (Brushed Aluminum Sharp) */}
      <section className="aluminum-card sharp frame-shadow p-6 sm:p-10 border border-[#b0b3b0] text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18191a] text-white text-[11px] font-bold sharp border border-black shadow-sm">
          <Video className="w-4 h-4 text-[#cbcccb]" />
          <span>پرتال چندرسانه‌ای و انیمیشن‌های مونتاژ مهندسی</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight leading-tight">
          کتابخانه ویدیوها و انیمیشن‌های سیستم‌های اختصاصی
        </h1>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#333] leading-relaxed font-medium">
          مجموعه انیمیشن‌های استخراج‌شده مقاطع کاتالوگ آکپای، نحوه حرکت لنگه‌های سنگین لیفت‌اند‌اسلاید، هوابندی کرتین‌وال و کالبدشکافی پروفیل‌های مهندسی با قابلیت پخش مستقیم آنلاین.
        </p>
      </section>

      <VideoHub videos={videos} />
    </div>
  );
}
