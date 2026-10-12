import React from 'react';
import { Search, TrendingUp, TrendingDown, MousePointerClick, Eye, Percent, Hash, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { getSearchConsole, type GscRow, type GscTotals } from '@/lib/gsc';

const fa = (n: number, digits = 0) =>
  n.toLocaleString('fa-IR', { maximumFractionDigits: digits, minimumFractionDigits: digits });
const pct = (n: number) => `${fa(n * 100, 1)}٪`;
const dayLabel = (key: string) =>
  new Intl.DateTimeFormat('fa-IR', { month: 'numeric', day: 'numeric', timeZone: 'Asia/Tehran' }).format(
    new Date(`${key}T12:00:00Z`)
  );
const safeDecode = (v: string) => {
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
};
const shortUrl = (url: string) => safeDecode(url.replace(/^https?:\/\/[^/]+/, '') || '/');

const DEVICE_LABELS: Record<string, string> = { MOBILE: 'موبایل', DESKTOP: 'رایانه', TABLET: 'تبلت' };

function Delta({ current, previous, invert = false, suffix = '' }: { current: number; previous: number; invert?: boolean; suffix?: string }) {
  if (previous <= 0) return <span className="text-titanium-500">دوره‌ی قبل داده ندارد</span>;
  const change = ((current - previous) / previous) * 100;
  const good = invert ? change <= 0 : change >= 0;
  const Icon = change >= 0 ? TrendingUp : TrendingDown;
  return (
    <span className={`flex items-center gap-1 ${good ? 'text-emerald-400' : 'text-rose-400'}`}>
      <Icon className="w-3.5 h-3.5" />
      <span dir="ltr">{change >= 0 ? '+' : ''}{fa(change, 0)}٪{suffix}</span>
      <span className="text-titanium-500">نسبت به ۲۸ روز قبل</span>
    </span>
  );
}

function Stat({ label, value, icon: Icon, color, children }: { label: string; value: string; icon: React.ComponentType<{ className?: string }>; color: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
      <div className="flex items-center justify-between text-titanium-400">
        <span className="text-xs font-medium">{label}</span>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div className="text-3xl font-black text-white font-mono">{value}</div>
      <div className="text-[11px] pt-1">{children}</div>
    </div>
  );
}

function RowTable({ title, rows, kind }: { title: string; rows: GscRow[]; kind: 'query' | 'page' }) {
  return (
    <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-6 space-y-3">
      <h3 className="text-xs font-bold text-white border-b border-charcoal-800 pb-3">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-xs text-titanium-500 py-4 text-center">هنوز داده‌ای برای این بازه ثبت نشده است.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-titanium-500 text-[11px]">
                <th className="text-right font-medium pb-2">{kind === 'query' ? 'عبارت جستجو' : 'صفحه'}</th>
                <th className="text-center font-medium pb-2">کلیک</th>
                <th className="text-center font-medium pb-2">نمایش</th>
                <th className="text-center font-medium pb-2">CTR</th>
                <th className="text-center font-medium pb-2">جایگاه</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 15).map((r) => (
                <tr key={r.key} className="border-t border-charcoal-850">
                  <td className="py-2 text-titanium-200 max-w-[260px] truncate" dir="auto" title={r.key}>
                    {kind === 'page' ? shortUrl(r.key) : r.key}
                  </td>
                  <td className="py-2 text-center font-mono font-bold text-signal-400">{fa(r.clicks)}</td>
                  <td className="py-2 text-center font-mono text-titanium-300">{fa(r.impressions)}</td>
                  <td className="py-2 text-center font-mono text-titanium-300">{pct(r.ctr)}</td>
                  <td className="py-2 text-center font-mono text-titanium-300">{fa(r.position, 1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function SeoPanelFallback() {
  return (
    <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-6 text-xs text-titanium-400">
      در حال دریافت آمار واقعی از Google Search Console...
    </div>
  );
}

export default async function SeoPanel() {
  const result = await getSearchConsole();

  const header = (
    <h2 className="text-sm font-bold text-white flex items-center gap-2">
      <Search className="w-5 h-5 text-signal-500" />
      <span>آمار واقعی سئو از گوگل (Search Console)</span>
    </h2>
  );

  if (result.status !== 'ok') {
    const needsAccess = result.status === 'no_access' || result.status === 'no_property';
    return (
      <div className="space-y-4">
        {header}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 space-y-3 text-xs text-amber-100 leading-7">
          <div className="flex items-center gap-2 font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>{result.message}</span>
          </div>
          {needsAccess && result.serviceAccount && (
            <ol className="list-decimal pr-5 space-y-1 text-amber-200">
              <li>وارد search.google.com/search-console شوید و پراپرتی سایت را باز کنید (ترجیحاً از نوع Domain).</li>
              <li>Settings ← Users and permissions ← Add user</li>
              <li>
                این ایمیل را با سطح دسترسی <b>Restricted</b> یا <b>Full</b> اضافه کنید:
                <div className="font-mono text-[11px] bg-charcoal-950 rounded px-2 py-1 mt-1 inline-block select-all" dir="ltr">
                  {result.serviceAccount}
                </div>
              </li>
              <li>حداکثر پس از ۲ دقیقه این صفحه را رفرش کنید. داده‌ی Search Console حدود ۲ روز تأخیر دارد.</li>
            </ol>
          )}
          {result.status === 'not_configured' && (
            <p className="text-amber-200">
              فایل <span className="font-mono" dir="ltr">gsc-credentials.json</span> را در ریشه‌ی پروژه روی سرور قرار دهید (یا
              متغیر <span className="font-mono" dir="ltr">GSC_CREDENTIALS_JSON</span> را تنظیم کنید).
            </p>
          )}
          {result.candidates && result.candidates.length > 0 && (
            <p className="text-amber-300/80 text-[11px]" dir="ltr">
              Properties: {result.candidates.join(' · ')}
            </p>
          )}
        </div>
      </div>
    );
  }

  const d = result.data;
  const t: GscTotals = d.totals;
  const p: GscTotals = d.previous;
  const maxClicks = Math.max(1, ...d.daily.map((r) => r.impressions));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {header}
        <span className="text-[11px] text-titanium-400 font-mono bg-charcoal-900 px-2 py-0.5 rounded border border-charcoal-800 flex items-center gap-1.5" dir="ltr">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          {d.property} · {d.startDate} → {d.endDate}
        </span>
      </div>

      {result.stale && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
          به‌روزرسانی از گوگل ناموفق بود ({result.staleReason}). آخرین داده‌ی ذخیره‌شده نمایش داده می‌شود.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat label="کلیک از گوگل" value={fa(t.clicks)} icon={MousePointerClick} color="text-signal-400">
          <Delta current={t.clicks} previous={p.clicks} />
        </Stat>
        <Stat label="نمایش در نتایج (Impressions)" value={fa(t.impressions)} icon={Eye} color="text-sky-400">
          <Delta current={t.impressions} previous={p.impressions} />
        </Stat>
        <Stat label="نرخ کلیک (CTR)" value={pct(t.ctr)} icon={Percent} color="text-emerald-400">
          <Delta current={t.ctr} previous={p.ctr} />
        </Stat>
        <Stat label="میانگین جایگاه" value={fa(t.position, 1)} icon={Hash} color="text-amber-400">
          <Delta current={t.position} previous={p.position} invert />
        </Stat>
      </div>

      <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
          <h3 className="text-xs font-bold text-white">نمایش و کلیک روزانه در گوگل (۲۸ روز)</h3>
          <span className="text-[11px] text-titanium-500">ستون = نمایش · عدد = کلیک</span>
        </div>
        {d.daily.length === 0 ? (
          <p className="text-xs text-titanium-500 py-6 text-center">در این بازه هنوز نمایشی ثبت نشده است.</p>
        ) : (
          <div className="flex items-end gap-1 h-32" dir="ltr">
            {d.daily.map((r) => (
              <div key={r.key} className="flex-1 flex flex-col items-center justify-end h-full gap-1 group min-w-0">
                <span className="text-[9px] font-mono text-signal-400 opacity-0 group-hover:opacity-100">{fa(r.clicks)}</span>
                <div
                  className="w-full rounded-t bg-sky-500/70 group-hover:bg-sky-400"
                  style={{ height: `${Math.max(3, Math.round((r.impressions / maxClicks) * 100))}%` }}
                  title={`${dayLabel(r.key)}: ${fa(r.impressions)} نمایش، ${fa(r.clicks)} کلیک`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RowTable title="پرجستجوترین عبارت‌ها" rows={d.queries} kind="query" />
        <RowTable title="صفحاتی که بیشترین ترافیک گوگل را می‌گیرند" rows={d.pages} kind="page" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-6 space-y-2 text-xs">
          <h3 className="font-bold text-white border-b border-charcoal-800 pb-2">دستگاه (کلیک گوگل)</h3>
          {d.devices.map((r) => (
            <div key={r.key} className="flex justify-between">
              <span className="text-titanium-300">{DEVICE_LABELS[r.key] || r.key}</span>
              <span className="font-mono text-white">{fa(r.clicks)} · {fa(r.impressions)} نمایش</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-6 space-y-2 text-xs">
          <h3 className="font-bold text-white border-b border-charcoal-800 pb-2">کشور</h3>
          {d.countries.map((r) => (
            <div key={r.key} className="flex justify-between">
              <span className="text-titanium-300 uppercase" dir="ltr">{r.key}</span>
              <span className="font-mono text-white">{fa(r.clicks)} · {fa(r.impressions)} نمایش</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-6 space-y-2 text-xs">
          <h3 className="font-bold text-white border-b border-charcoal-800 pb-2">نقشه‌ی سایت (Sitemap)</h3>
          {d.sitemaps.length === 0 ? (
            <p className="text-amber-300">هیچ sitemap ثبت نشده است؛ در Search Console آدرس /sitemap.xml را ثبت کنید.</p>
          ) : (
            d.sitemaps.map((s) => (
              <div key={s.path} className="space-y-0.5">
                <div className="font-mono text-titanium-300 truncate" dir="ltr">{shortUrl(s.path)}</div>
                <div className={s.errors || s.warnings ? 'text-rose-400' : 'text-emerald-400'}>
                  {s.isPending ? 'در انتظار بررسی' : `${fa(s.errors)} خطا · ${fa(s.warnings)} هشدار`}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
