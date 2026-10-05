import React from 'react';
import Link from 'next/link';
import { getArticles, getProjects, getVideos, getSettings } from '@/lib/db';
import AdminNav from '@/components/AdminNav';
import { FileText, Image, Video, Settings, Plus, ArrowLeft, Building2 } from 'lucide-react';

export const metadata = {
  title: 'پنل مدیریت | نوآوران پنجره سپاهان',
};

export default async function AdminDashboardPage() {
  const articles = await getArticles();
  const projects = await getProjects();
  const videos = await getVideos();
  const settings = await getSettings();

  return (
    <div className="min-h-[80vh] pb-16">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Banner */}
        <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs text-bronze-400 font-bold uppercase tracking-wider">
              مرکز کنترل و مدیریت محتوا
            </span>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              خوش آمدید، مدیر سیستم نوآوران پنجره سپاهان
            </h1>
            <p className="text-xs text-titanium-400 mt-2">
              از این بخش می‌توانید مقالات، پروژه‌ها، ویدیوهای آموزشی آپارات/یوتیوب و اطلاعات تماس سایت را به صورت آنی مدیریت و ویرایش نمایید.
            </p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-xs font-semibold text-titanium-200 border border-charcoal-700 flex items-center gap-1.5 shrink-0"
          >
            <span>مشاهده زنده سایت</span>
            <ArrowLeft className="w-4 h-4 text-bronze-400" />
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
            <div className="flex items-center justify-between text-titanium-400">
              <span className="text-xs font-medium">کل مقالات</span>
              <FileText className="w-5 h-5 text-bronze-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{articles.length}</div>
            <Link href="/admin/articles" className="text-[11px] text-bronze-400 hover:underline inline-block pt-1">
              مدیریت و افزودن مقاله ←
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
            <div className="flex items-center justify-between text-titanium-400">
              <span className="text-xs font-medium">پروژه‌های شاخص</span>
              <Image className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{projects.length}</div>
            <Link href="/admin/projects" className="text-[11px] text-emerald-400 hover:underline inline-block pt-1">
              مدیریت و افزودن پروژه ←
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
            <div className="flex items-center justify-between text-titanium-400">
              <span className="text-xs font-medium">ویدیوهای آموزشی</span>
              <Video className="w-5 h-5 text-sky-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{videos.length}</div>
            <Link href="/admin/videos" className="text-[11px] text-sky-400 hover:underline inline-block pt-1">
              مدیریت ویدیوهای آپارات/یوتیوب ←
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
            <div className="flex items-center justify-between text-titanium-400">
              <span className="text-xs font-medium">اطلاعات شرکت و امنیت</span>
              <Settings className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-sm font-bold text-white font-mono truncate">{settings.phoneLabel}</div>
            <Link href="/admin/settings" className="text-[11px] text-amber-400 hover:underline inline-block pt-1">
              تنظیمات تماس و تغییر رمز عبور ←
            </Link>
          </div>
        </div>

        {/* Action Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quick Articles */}
          <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-bronze-400" />
                <span>آخرین مقالات منتشر شده</span>
              </h2>
              <Link
                href="/admin/articles"
                className="text-xs text-bronze-400 hover:underline"
              >
                مشاهده همه
              </Link>
            </div>
            <div className="space-y-2.5">
              {articles.slice(0, 4).map((a) => (
                <div key={a.id} className="p-3 rounded-xl bg-charcoal-850 flex items-center justify-between text-xs">
                  <span className="text-titanium-200 line-clamp-1 font-medium">{a.title}</span>
                  <span className="text-[10px] text-titanium-500 font-mono shrink-0 mr-2">{a.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Videos */}
          <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-sky-400" />
                <span>ویدیوهای آموزشی فعال</span>
              </h2>
              <Link
                href="/admin/videos"
                className="text-xs text-sky-400 hover:underline"
              >
                افزودن ویدیوی جدید
              </Link>
            </div>
            <div className="space-y-2.5">
              {videos.slice(0, 4).map((v) => (
                <div key={v.id} className="p-3 rounded-xl bg-charcoal-850 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-charcoal-800 text-[10px] text-bronze-300 font-mono">
                      {v.platform}
                    </span>
                    <span className="text-titanium-200 line-clamp-1">{v.title}</span>
                  </div>
                  <span className="text-[10px] text-titanium-400 shrink-0 mr-2">{v.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
