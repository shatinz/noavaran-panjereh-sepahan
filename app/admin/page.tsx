import React from 'react';
import Link from 'next/link';
import { getArticles, getProjects, getVideos, getSettings, getConsultations, getAnalyticsStats } from '@/lib/db';
import AdminNav from '@/components/AdminNav';
import {
  FileText,
  Image,
  Video,
  Settings,
  ArrowLeft,
  MessageSquare,
  BarChart3,
  Users,
  Eye,
  TrendingUp,
  Smartphone,
  Monitor,
  Globe,
  Layers,
} from 'lucide-react';

export const metadata = {
  title: 'پنل مدیریت و آمار | نوآوران پنجره سپاهان',
};

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [articles, projects, videos, settings, consultations, analytics] = await Promise.all([
    getArticles(),
    getProjects(),
    getVideos(),
    getSettings(),
    getConsultations(),
    getAnalyticsStats(),
  ]);

  const newConsultationsCount = consultations.filter((c) => c.status === 'new').length;

  return (
    <div className="min-h-[80vh] pb-16">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Banner */}
        <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs text-signal-400 font-bold uppercase tracking-wider">
              مرکز کنترل، مدیریت محتوا و تحلیل هوشمند آمار
            </span>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              خوش آمدید، مدیر سیستم نوآوران پنجره سپاهان
            </h1>
            <p className="text-xs text-titanium-400 mt-2">
              از این بخش می‌توانید آمار زنده بازدید، درخواست‌های مشاوره، متریال، مقالات، پروژه‌ها و اطلاعات شرکت را به صورت متمرکز بررسی نمایید.
            </p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-xs font-semibold text-titanium-200 border border-charcoal-700 flex items-center gap-1.5 shrink-0 transition-colors"
          >
            <span>مشاهده زنده سایت</span>
            <ArrowLeft className="w-4 h-4 text-signal-400" />
          </Link>
        </div>

        {/* Section: Website Real Visits & Analytics */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-signal-500" />
              <span>آمار و تحلیل بازدید واقعی سایت (Web Analytics)</span>
            </h2>
            <span className="text-[11px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              ● ثبت بلادرنگ فعال
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Visits */}
            <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
              <div className="flex items-center justify-between text-titanium-400">
                <span className="text-xs font-medium">مجموع کل بازدیدها</span>
                <Eye className="w-5 h-5 text-signal-400" />
              </div>
              <div className="text-3xl font-black text-white font-mono">
                {analytics.totalVisits.toLocaleString('fa-IR')}
              </div>
              <div className="text-[11px] text-titanium-500 flex items-center gap-1 pt-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>+۱۲٪ رشد در ماه جاری</span>
              </div>
            </div>

            {/* Unique Visitors */}
            <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
              <div className="flex items-center justify-between text-titanium-400">
                <span className="text-xs font-medium">کاربران یکتا (Unique)</span>
                <Users className="w-5 h-5 text-sky-400" />
              </div>
              <div className="text-3xl font-black text-white font-mono">
                {analytics.uniqueVisitors.toLocaleString('fa-IR')}
              </div>
              <div className="text-[11px] text-titanium-500 pt-1">
                نسبت بازگشت مجدد: ۴۱٪
              </div>
            </div>

            {/* Page Views Today */}
            <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
              <div className="flex items-center justify-between text-titanium-400">
                <span className="text-xs font-medium">بازدید صفحات امروز</span>
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-white font-mono">
                {analytics.pageViewsToday.toLocaleString('fa-IR')}
              </div>
              <div className="text-[11px] text-titanium-500 pt-1">
                ترافیک زنده امروز
              </div>
            </div>

            {/* Consultation Leads */}
            <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
              <div className="flex items-center justify-between text-titanium-400">
                <span className="text-xs font-medium">درخواست‌های مشاوره</span>
                <MessageSquare className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-3xl font-black text-white font-mono">
                {consultations.length}
              </div>
              <Link
                href="/admin/consultations"
                className="text-[11px] text-amber-400 hover:underline inline-block pt-1"
              >
                {newConsultationsCount > 0 ? `${newConsultationsCount} درخواست جدید ←` : 'مشاهده درخواست‌ها ←'}
              </Link>
            </div>
          </div>

          {/* Analytics Details: Top Pages & Device/Traffic Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Visited Pages */}
            <div className="lg:col-span-2 rounded-2xl bg-charcoal-900 border border-charcoal-800 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-signal-400" />
                  <span>محبوب‌ترین و پربازدیدترین صفحات وب‌سایت</span>
                </h3>
                <span className="text-[11px] text-titanium-500">مرتب‌سازی بر اساس دفعات مشاهده</span>
              </div>

              <div className="space-y-3">
                {analytics.topPages.slice(0, 6).map((page, idx) => {
                  const maxViews = analytics.topPages[0]?.views || 1;
                  const pct = Math.round((page.views / maxViews) * 100);

                  return (
                    <div key={page.path} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-5 h-5 rounded bg-charcoal-800 text-[10px] font-mono font-bold text-titanium-300 flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-white font-medium truncate">{page.title}</span>
                          <span className="text-[11px] text-titanium-500 font-mono shrink-0" dir="ltr">
                            {page.path}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-signal-400 shrink-0 mr-2">
                          {page.views.toLocaleString('fa-IR')} بازدید
                        </span>
                      </div>
                      <div className="w-full bg-charcoal-950 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-signal-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Devices & Traffic Sources */}
            <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-6 space-y-6">
              {/* Devices */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-white flex items-center gap-2 border-b border-charcoal-800 pb-2">
                  <Smartphone className="w-4 h-4 text-sky-400" />
                  <span>توزیع دستگاه‌های کاربران</span>
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-titanium-300 flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-titanium-400" />
                      گوشی‌های موبایل (Mobile)
                    </span>
                    <span className="font-mono font-bold text-white">{analytics.devices.mobile}٪</span>
                  </div>
                  <div className="w-full bg-charcoal-950 rounded-full h-2 overflow-hidden">
                    <div className="bg-sky-500 h-full rounded-full" style={{ width: `${analytics.devices.mobile}%` }} />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-titanium-300 flex items-center gap-1.5">
                      <Monitor className="w-3.5 h-3.5 text-titanium-400" />
                      رایانه و لپ‌تاپ (Desktop)
                    </span>
                    <span className="font-mono font-bold text-white">{analytics.devices.desktop}٪</span>
                  </div>
                  <div className="w-full bg-charcoal-950 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${analytics.devices.desktop}%` }} />
                  </div>
                </div>
              </div>

              {/* Traffic Sources */}
              <div className="space-y-2 pt-2 border-t border-charcoal-800">
                <h4 className="text-[11px] font-bold text-titanium-400 uppercase tracking-wider">
                  کانال‌های ورود به سایت
                </h4>
                <div className="space-y-2 text-xs">
                  {analytics.trafficSources.map((src) => (
                    <div key={src.source} className="flex items-center justify-between py-1 border-b border-charcoal-850 last:border-0">
                      <span className="text-titanium-300 text-[11px] truncate">{src.source}</span>
                      <span className="font-mono text-signal-400 font-bold shrink-0">{src.percentage}٪</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Management Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
            <div className="flex items-center justify-between text-titanium-400">
              <span className="text-xs font-medium">سیستم‌ها و متریال</span>
              <Layers className="w-5 h-5 text-signal-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">12</div>
            <Link href="/admin/materials" className="text-[11px] text-signal-400 hover:underline inline-block pt-1">
              مدیریت ۱۲ سیستم کاتالوگ ←
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
          {/* Recent Consultations */}
          <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-signal-400" />
                <span>آخرین درخواست‌های مشاوره ثبت شده</span>
              </h2>
              <Link
                href="/admin/consultations"
                className="text-xs text-signal-400 hover:underline"
              >
                مشاهده همه ({consultations.length})
              </Link>
            </div>
            <div className="space-y-2.5">
              {consultations.length === 0 ? (
                <p className="text-xs text-titanium-500 py-4 text-center">هنوز درخواستی ثبت نشده است.</p>
              ) : (
                consultations.slice(0, 4).map((c) => (
                  <div key={c.id} className="p-3 rounded-xl bg-charcoal-850 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">{c.name}</span>
                        {c.status === 'new' && (
                          <span className="px-1.5 py-0.5 rounded bg-signal-500/20 text-[10px] text-signal-400">جدید</span>
                        )}
                      </div>
                      <span className="text-[11px] text-titanium-400">{c.projectType}</span>
                    </div>
                    <span className="text-[10px] text-titanium-500 font-mono shrink-0 mr-2">{c.createdAt}</span>
                  </div>
                ))
              )}
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
                مدیریت ویدیوها
              </Link>
            </div>
            <div className="space-y-2.5">
              {videos.slice(0, 4).map((v) => (
                <div key={v.id} className="p-3 rounded-xl bg-charcoal-850 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-charcoal-800 text-[10px] text-signal-300 font-mono">
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
