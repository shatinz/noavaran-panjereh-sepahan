'use client';

import React from 'react';
import Link from 'next/link';
import { getSettings } from '@/lib/db';
import { Phone, MapPin, Building2, ArrowUpLeft } from 'lucide-react';

const settings = {
  companyName: 'نوآوران پنجره سپاهان',
  phone: '0314144',
  phoneLabel: '۰۳۱-۴۱۴۴',
  directPhones: ['۰۳۱-۳۷۸۸', '۰۹۱۳-۹۰۹۰۶۷۳'],
  officeAddress: 'اصفهان، شهرک صنعتی جی، خیابان ۲۸، فرعی ۴',
  factoryAddress: 'اصفهان، شهرک صنعتی جی',
  workingHours: 'شنبه تا پنج‌شنبه ۸:۰۰ - ۱۷:۰۰',
};

export default function Footer() {
  return (
    <footer className="aluminum-surface border-t border-[#b5b8b5] mt-8">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-right">

          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#1a1a1a] text-white flex items-center justify-center rounded-[3px]">
                <Building2 className="w-[18px] h-[18px]" />
              </div>
              <div>
                <span className="text-sm font-black text-[#1a1a1a] block leading-tight">نوآوران پنجره سپاهان</span>
                <span className="text-[9px] text-[#666] block font-mono uppercase tracking-wider">Noavaran Panjereh Sepahan</span>
              </div>
            </div>
            <p className="text-[11px] text-[#555] leading-relaxed font-medium">
              مرجع مهندسی و اجرای تخصصی نماهای شیشه‌ای، کرتین‌وال لامل، درب و پنجره ترمال‌بریک و نماهای کامپوزیت آلومینیوم در اصفهان و سراسر ایران.
            </p>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-xs font-black text-[#1a1a1a] uppercase tracking-wider mb-3 border-r-2 border-[#1a1a1a] pr-2">
              خدمات تخصصی
            </h3>
            <ul className="space-y-2 text-[11px] font-bold text-[#444]">
              <li>
                <Link href="/services/curtain-wall-lamella" className="hover:text-[#1a1a1a] hover:underline flex items-center justify-between transition-colors">
                  <span>نمای کرتین وال (لامل)</span>
                  <ArrowUpLeft className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/services/frameless-facade" className="hover:text-[#1a1a1a] hover:underline flex items-center justify-between transition-colors">
                  <span>نمای شیشه‌ای فریم‌لس</span>
                  <ArrowUpLeft className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/services/aluminum-windows-doors" className="hover:text-[#1a1a1a] hover:underline flex items-center justify-between transition-colors">
                  <span>پنجره ترمال‌بریک و لیفت اسلاید</span>
                  <ArrowUpLeft className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/services/composite-facade" className="hover:text-[#1a1a1a] hover:underline flex items-center justify-between transition-colors">
                  <span>نمای کامپوزیت آلومینیوم (ACP)</span>
                  <ArrowUpLeft className="w-3 h-3 opacity-50" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal */}
          <div>
            <h3 className="text-xs font-black text-[#1a1a1a] uppercase tracking-wider mb-3 border-r-2 border-[#1a1a1a] pr-2">
              بخش‌های پرتال
            </h3>
            <ul className="space-y-2 text-[11px] font-bold text-[#444]">
              <li><Link href="/projects" className="hover:text-[#1a1a1a] hover:underline block">آرشیو ۵۰+ پروژه اجرایی</Link></li>
              <li><Link href="/calculator" className="hover:text-[#1a1a1a] hover:underline block">محاسبه‌گر متراژ و پیش‌فاکتور</Link></li>
              <li><Link href="/articles" className="hover:text-[#1a1a1a] hover:underline block">دانشنامه و مقالات فنی</Link></li>
              <li><Link href="/about" className="hover:text-[#1a1a1a] hover:underline block">درباره شرکت (تأسیس ۱۳۸۵)</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-black text-[#1a1a1a] uppercase tracking-wider mb-3 border-r-2 border-[#1a1a1a] pr-2">
              دفتر مرکزی
            </h3>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#1a1a1a] shrink-0 mt-0.5" />
                <a href={`tel:${settings.phone}`} className="font-mono text-sm font-black text-[#1a1a1a] hover:underline block">
                  {settings.phoneLabel}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#1a1a1a] shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed text-[#444] font-medium">
                  {settings.officeAddress}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-[#b5b8b5] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#777] font-bold gap-2">
          <p>© {new Date().getFullYear()} کلیه حقوق برای شرکت نوآوران پنجره سپاهان محفوظ است.</p>
          <p className="font-mono text-[10px]">
            Noavaran Panjereh Sepahan · Precision Architectural Engineering
          </p>
        </div>
      </div>
    </footer>
  );
}
