import React from 'react';
import Link from 'next/link';
import { BarChart3, Eye, Users, TrendingUp, TrendingDown, MessageSquare, Smartphone, Monitor, Tablet, Globe, MousePointerClick } from 'lucide-react';
import type { AnalyticsSummary } from '@/lib/analytics-store';

const CLICK_LABELS: Record<string, string> = {
  phone_call: 'تماس تلفنی',
  whatsapp: 'واتساپ',
  telegram: 'تلگرام',
  eitaa: 'ایتا',
  instagram: 'اینستاگرام',
  aparat: 'آپارات',
  linkedin: 'لینکدین',
  email: 'ایمیل',
  file_download: 'دانلود فایل / کاتالوگ',
  contact_form: 'ثبت فرم تماس',
  calculator: 'محاسبه‌گر قیمت',
};

const safeDecode = (v: string) => {
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
};
const fa = (n: number) => n.toLocaleString('fa-IR');
const jalaliDay = (key: string) =>
  new Intl.DateTimeFormat('fa-IR', { month: 'numeric', day: 'numeric', timeZone: 'Asia/Tehran' }).format(
    new Date(`${key}T12:00:00Z`)
  );
const jalaliFull = (iso: string) =>
  new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium', timeZone: 'Asia/Tehran' }).format(new Date(iso));

function Trend({ current, previous }: { current: number; previous: number }) {
  if (previous <= 0) {
    return <span className="text-titanium-500">داده‌ی هفته‌ی قبل برای مقایسه کافی نیست</span>;
  }
  const pct = Math.round(((current - previous) / previous) * 100);
  const up = pct >= 0;
  const Icon = up ? TrendingUp : TrendingDown;
  return (
    <span className={`flex items-center gap-1 ${up ? 'text-emerald-400' : 'text-rose-400'}`}>
      <Icon className="w-3.5 h-3.5" />
      <span dir="ltr">{up ? '+' : ''}{fa(pct)}٪</span>
      <span className="text-titanium-500">نسبت به ۷ روز قبل‌تر</span>
    </span>
  );
}

export default function AnalyticsPanel({
  summary,
  consultationsCount,
  newConsultationsCount,
}: {
  summary: AnalyticsSummary;
  consultationsCount: number;
  newConsultationsCount: number;
}) {
  const maxDaily = Math.max(1, ...summary.daily.map((d) => d.pageViews));
  const maxPage = summary.topPages[0]?.views || 1;
  const maxClick = summary.clicks[0]?.count || 1;
  const sourcesTotal = summary.sources.reduce((a, s) => a + s.sessions, 0) || 1;
  const dev = summary.devices;
  const devPct = (n: number) => (dev.total ? Math.round((n / dev.total) * 100) : 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-signal-500" />
          <span>آمار بازدید و کلیک سایت (داده‌ی واقعی)</span>
        </h2>
        <span className="text-[11px] text-titanium-400 font-mono bg-charcoal-900 px-2 py-0.5 rounded border border-charcoal-800">
          ثبت آمار از {jalaliFull(summary.startedAt)}
        </span>
      </div>

      {!summary.hasData && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200 leading-6">
          هنوز بازدیدی ثبت نشده است. اعداد قبلی این بخش نمونه و ساختگی بودند و حذف شدند؛ از این لحظه فقط بازدیدهای واقعی
          کاربران (بدون ربات‌ها و بدون بازدیدهای خود پنل مدیریت) شمارش می‌شود.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
          <div className="flex items-center justify-between text-titanium-400">
            <span className="text-xs font-medium">مجموع بازدید صفحات</span>
            <Eye className="w-5 h-5 text-signal-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{fa(summary.totals.pageViews)}</div>
          <div className="text-[11px] pt-1">
            <Trend current={summary.last7.pageViews} previous={summary.prev7.pageViews} />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
          <div className="flex items-center justify-between text-titanium-400">
            <span className="text-xs font-medium">بازدیدکنندگان یکتا</span>
            <Users className="w-5 h-5 text-sky-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{fa(summary.totals.visitors)}</div>
          <div className="text-[11px] text-titanium-500 pt-1">
            {fa(summary.totals.sessions)} نشست (Session) ثبت شده
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
          <div className="flex items-center justify-between text-titanium-400">
            <span className="text-xs font-medium">بازدید امروز</span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{fa(summary.today.pageViews)}</div>
          <div className="text-[11px] text-titanium-500 pt-1">
            {fa(summary.today.visitors)} بازدیدکننده‌ی یکتا · {fa(summary.today.clicks)} کلیک
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
          <div className="flex items-center justify-between text-titanium-400">
            <span className="text-xs font-medium">درخواست‌های مشاوره</span>
            <MessageSquare className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{fa(consultationsCount)}</div>
          <Link href="/admin/consultations" className="text-[11px] text-amber-400 hover:underline inline-block pt-1">
            {newConsultationsCount > 0 ? `${fa(newConsultationsCount)} درخواست جدید ←` : 'مشاهده درخواست‌ها ←'}
          </Link>
        </div>
      </div>

      {/* 14-day chart */}
      <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
          <h3 className="text-xs font-bold text-white">بازدید روزانه در ۱۴ روز گذشته</h3>
          <span className="text-[11px] text-titanium-500">بر اساس وقت تهران</span>
        </div>
        <div className="flex items-end gap-1.5 sm:gap-2 h-36" dir="ltr">
          {summary.daily.map((d) => (
            <div key={d.date} className="flex-1 flex flex-col items-center justify-end h-full gap-1 group min-w-0">
              <span className="text-[10px] font-mono text-titanium-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {fa(d.pageViews)}
              </span>
              <div
                className="w-full rounded-t bg-signal-500/80 group-hover:bg-signal-400 transition-colors"
                style={{ height: `${Math.max(d.pageViews ? 4 : 1, Math.round((d.pageViews / maxDaily) * 100))}%` }}
                title={`${jalaliDay(d.date)}: ${fa(d.pageViews)} بازدید، ${fa(d.visitors)} یکتا، ${fa(d.clicks)} کلیک`}
              />
              <span className="text-[9px] text-titanium-500 truncate w-full text-center">{jalaliDay(d.date)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top pages */}
        <div className="lg:col-span-2 rounded-2xl bg-charcoal-900 border border-charcoal-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-signal-400" />
              <span>پربازدیدترین صفحات</span>
            </h3>
            <span className="text-[11px] text-titanium-500">مرتب‌سازی بر اساس دفعات مشاهده</span>
          </div>
          {summary.topPages.length === 0 ? (
            <p className="text-xs text-titanium-500 py-4 text-center">هنوز داده‌ای ثبت نشده است.</p>
          ) : (
            <div className="space-y-3">
              {summary.topPages.map((page, idx) => (
                <div key={page.path} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-5 h-5 rounded bg-charcoal-800 text-[10px] font-mono font-bold text-titanium-300 flex items-center justify-center shrink-0">
                        {fa(idx + 1)}
                      </span>
                      <span className="text-white font-medium truncate">{page.title}</span>
                      <span className="text-[11px] text-titanium-500 font-mono shrink-0" dir="ltr">
                        {safeDecode(page.path)}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-signal-400 shrink-0 mr-2">
                      {fa(page.views)} بازدید
                    </span>
                  </div>
                  <div className="w-full bg-charcoal-950 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-signal-500 h-full rounded-full" style={{ width: `${Math.round((page.views / maxPage) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Devices + sources */}
        <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-2 border-b border-charcoal-800 pb-2">
              <Smartphone className="w-4 h-4 text-sky-400" />
              <span>دستگاه کاربران</span>
            </h3>
            {dev.total === 0 ? (
              <p className="text-xs text-titanium-500">هنوز داده‌ای ثبت نشده است.</p>
            ) : (
              <div className="space-y-2 text-xs">
                {([
                  ['mobile', 'موبایل', Smartphone, 'bg-sky-500'],
                  ['desktop', 'رایانه', Monitor, 'bg-emerald-500'],
                  ['tablet', 'تبلت', Tablet, 'bg-amber-500'],
                ] as const).map(([key, label, Icon, color]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-titanium-300 flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-titanium-400" />
                        {label}
                      </span>
                      <span className="font-mono font-bold text-white">{fa(devPct(dev[key]))}٪</span>
                    </div>
                    <div className="w-full bg-charcoal-950 rounded-full h-2 overflow-hidden">
                      <div className={`${color} h-full rounded-full`} style={{ width: `${devPct(dev[key])}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-charcoal-800">
            <h4 className="text-[11px] font-bold text-titanium-400 uppercase tracking-wider">کانال‌های ورود (بر اساس نشست)</h4>
            {summary.sources.length === 0 ? (
              <p className="text-xs text-titanium-500">هنوز داده‌ای ثبت نشده است.</p>
            ) : (
              <div className="space-y-2 text-xs">
                {summary.sources.map((src) => (
                  <div key={src.key} className="flex items-center justify-between py-1 border-b border-charcoal-850 last:border-0">
                    <span className="text-titanium-300 text-[11px] truncate" dir="auto">{src.label}</span>
                    <span className="font-mono text-signal-400 font-bold shrink-0">
                      {fa(Math.round((src.sessions / sourcesTotal) * 100))}٪
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clicks */}
      <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
          <h3 className="text-xs font-bold text-white flex items-center gap-2">
            <MousePointerClick className="w-4 h-4 text-signal-400" />
            <span>آمار کلیک‌ها (تماس، پیام‌رسان‌ها، فرم‌ها، دانلودها)</span>
          </h3>
          <span className="text-[11px] text-titanium-500 font-mono">{fa(summary.totals.clicks)} کلیک</span>
        </div>
        {summary.clicks.length === 0 ? (
          <p className="text-xs text-titanium-500 py-4 text-center">هنوز کلیکی ثبت نشده است.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {summary.clicks.map((c) => (
              <div key={c.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-titanium-200">{CLICK_LABELS[c.label] || c.label}</span>
                  <span className="font-mono font-bold text-signal-400">{fa(c.count)}</span>
                </div>
                <div className="w-full bg-charcoal-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.round((c.count / maxClick) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
