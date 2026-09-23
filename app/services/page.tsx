import React from 'react';
import Link from 'next/link';
import { getServices } from '@/lib/db';
import { ArrowLeft, CheckCircle2, Building2, ShieldCheck, Layers, Grid, Maximize, Box, TreePine, Palette } from 'lucide-react';

export const metadata = {
  title: 'نمونه مدل‌های جدید پروفیل و پوشش رنگ | نوآوران پنجره سپاهان',
  description: 'مشاهده کاتالوگ جدیدترین مدل‌های پروفیل ترمال‌بریک، لیفت اند اسلاید، کرتین‌وال و رنگ‌های آنادایز شامپاینی و مشکی.',
};

export default async function ServicesPage() {
  const services = await getServices();

  const colorSamples = [
    { name: 'آنادایز شامپاینی اروپایی (Champagne Anodized)', code: 'AN-01', hex: '#b39c7d' },
    { name: 'آنادایز مشکی مات و سمباده‌ای (Matte Black)', code: 'AN-02', hex: '#22252a' },
    { name: 'آنادایز طلایی براق (Gold Luxury)', code: 'AN-03', hex: '#d4af37' },
    { name: 'رنگ پودری الکترواستاتیک سفید (RAL 9016)', code: 'RAL-9016', hex: '#f0f0f0' },
    { name: 'پوشش طرح چوب ترموود پلیمری (Wood Grain)', code: 'WG-04', hex: '#633c1d' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-12 space-y-12 bg-[#F5F5F5] text-[#18191a]">
      {/* Header */}
      <div className="text-right space-y-2 border-b border-[#b5b8b5] pb-6">
        <span className="aluminum-header px-3 py-1 text-xs font-black text-[#18191a] inline-block shadow-sm">
          کاتالوگ پروفیل‌ها و رنگ‌های جدید
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#18191a]">
          نمونه مدل‌های جدید پروفیل و پوشش‌های آلومینیومی
        </h1>
        <p className="text-xs sm:text-sm text-[#55595e] font-medium leading-relaxed max-w-3xl">
          معرفی مقاطع جدید پنجره‌های ترمال‌بریک، کشویی سنگین لیفت‌اسلاید، لامل‌های کرتین‌وال و نمونه رنگ‌های آنادایز جدید سال.
        </p>
      </div>

      {/* NEW COLOR FINISHES SHOWCASE */}
      <div className="aluminum-card border border-[#b5b8b5] subtle-soft-shadow p-6 rounded-none space-y-4">
        <div className="flex items-center gap-2 border-b border-[#b5b8b5] pb-3">
          <Palette className="w-5 h-5 text-[#18191a]" />
          <h2 className="text-base font-black text-[#18191a]">
            نمونه رنگ‌ها و پوشش‌های جدید پروفیل آلومینیوم
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {colorSamples.map((c, i) => (
            <div key={i} className="bg-white p-3 border border-[#b5b8b5] subtle-soft-shadow rounded-none space-y-2 text-right">
              <div
                className="h-16 w-full border border-[#d0d3d0]"
                style={{ backgroundColor: c.hex }}
              />
              <div className="font-bold text-xs text-[#18191a]">{c.name}</div>
              <div className="text-[10px] font-mono text-[#55595e]">کد فنی: {c.code}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services & Profile Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s.id}
            className="aluminum-card border border-[#b5b8b5] overflow-hidden flex flex-col group subtle-soft-shadow rounded-none"
          >
            <div className="relative h-60 w-full bg-[#18191a] overflow-hidden border-b border-[#b5b8b5]">
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent" />
              <span className="absolute top-3 right-3 aluminum-header px-3 py-1 text-[11px] font-black text-[#18191a] shadow-sm">
                جدید
              </span>
            </div>

            <div className="p-6 flex-grow flex flex-col justify-between space-y-4 text-right">
              <div>
                <h2 className="text-base font-black text-[#18191a] group-hover:underline">
                  {s.title}
                </h2>
                <p className="text-xs text-[#55595e] font-normal mt-2 line-clamp-3 leading-relaxed">
                  {s.summary}
                </p>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-[#b5b8b5]">
                <div className="text-[11px] font-bold text-[#18191a]">مشخصات فنی مقطع:</div>
                {s.features.slice(0, 3).map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-[#35383c]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#18191a] shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{f}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/services/${s.slug}`}
                className="pt-2 inline-flex items-center justify-between text-xs font-black text-[#18191a] group/link"
              >
                <span>مشاهده مشخصات کامل مقطع</span>
                <ArrowLeft className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
