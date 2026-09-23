import React from 'react';
import Link from 'next/link';
import { Building2, Phone, MapPin, Clock, Shield, ArrowUpLeft, Instagram, Send } from 'lucide-react';
import { getSettings } from '@/lib/db';

export default async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="aluminum-card border-t border-[#b5b8b5] text-[#18191a] pt-12 pb-10 mt-16 subtle-soft-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-right">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#18191a] text-white flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-black text-[#18191a]">
                نوآوران پنجره سپاهان
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#484c50] font-medium text-justify">
              تولیدکننده صنعتی و مجری تخصصی نماهای مدرن شیشه‌ای (کرتین‌وال و فریم‌لس)، درب و پنجره‌های اختصاصی دوجداره ترمال‌بریک و کامپوزیت با کارخانه مجهز ۱۵۰۰ متری در اصفهان.
            </p>
          </div>

          {/* Col 2: Services Links */}
          <div>
            <h3 className="text-xs font-black text-[#18191a] uppercase tracking-wider mb-3 border-r-2 border-[#18191a] pr-2">
              سیستم‌های اجرایی
            </h3>
            <ul className="space-y-2 text-xs font-bold">
              <li>
                <Link href="/services/curtain-wall-lamella" className="hover:underline flex items-center justify-between">
                  <span>نمای کرتین وال (لامل)</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/services/frameless-facade" className="hover:underline flex items-center justify-between">
                  <span>نمای شیشه‌ای فریم‌لس</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/services/aluminum-windows-doors" className="hover:underline flex items-center justify-between">
                  <span>پنجره ترمال‌بریک و لیفت اسلاید</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/services/composite-facade" className="hover:underline flex items-center justify-between">
                  <span>نمای کامپوزیت آلومینیوم (ACP)</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Sections */}
          <div>
            <h3 className="text-xs font-black text-[#18191a] uppercase tracking-wider mb-3 border-r-2 border-[#18191a] pr-2">
              بخش‌های اصلی پرتال
            </h3>
            <ul className="space-y-2 text-xs font-bold">
              <li>
                <Link href="/projects" className="hover:underline block">
                  آرشیو ۵۰+ پروژه اجرایی
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:underline block">
                  محاسبه‌گر متراژ و پیش‌فاکتور
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:underline block">
                  دانشنامه و مقالات فنی
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline block">
                  درباره شرکت (تأسیس ۱۳۸۵)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Line */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-black text-[#18191a] uppercase tracking-wider mb-3 border-r-2 border-[#18191a] pr-2">
              دفتر مرکزی و تماس
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#18191a] shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${settings.phone}`} className="font-mono text-sm font-black text-[#18191a] hover:underline block">
                    {settings.phoneLabel}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#18191a] shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed text-[#35383c] font-medium">
                  {settings.officeAddress}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-[#b5b8b5] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#55595e] font-bold gap-2">
          <p>© {new Date().getFullYear()} کلیه حقوق برای شرکت نوآوران پنجره سپاهان محفوظ است.</p>
          <p className="font-mono text-[10px]">
            Noavaran Panjereh Sepahan · iPhone 17 Pro Gray Titanium Series
          </p>
        </div>
      </div>
    </footer>
  );
}
