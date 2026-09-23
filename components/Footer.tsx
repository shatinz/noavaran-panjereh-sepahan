'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, Building2, ArrowUpLeft, ShieldCheck, Layers, Video } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 pt-4 pb-8 mt-6">
      <div className="aluminum-card sharp frame-shadow p-6 sm:p-8 border border-[#b0b3b0]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-right">

          {/* Col 1: Brand & Official Credentials */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-black text-white flex items-center justify-center sharp shadow-sm">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className="text-sm font-black text-black block">نوآوران پنجره سپاهان</span>
                <span className="text-[10px] text-[#444] block font-mono uppercase tracking-wider">Noavaran Panjereh</span>
              </div>
            </div>
            <p className="text-[11.5px] text-[#333] leading-relaxed font-medium">
              مرجع مهندسی، طراحی سازه‌ای و تولید صنعتی نماهای مدرن شیشه‌ای کرتین‌وال لامل، فریم‌لس، پنجره‌های لوکس لیفت‌اند‌اسلاید و ترمال‌بریک در کارخانه ۱۵۰۰ متری.
            </p>

            {/* Official Registration Badges */}
            <div className="bg-[#b8bab8] p-2.5 sharp border border-[#9ea19e] space-y-1 text-[10px] font-mono font-bold text-black">
              <div className="flex justify-between items-center">
                <span>شناسه ملی شرکت:</span>
                <span>۱۴۰۱۵۰۲۶۲۳۰</span>
              </div>
              <div className="flex justify-between items-center">
                <span>شماره ثبت رسمی:</span>
                <span>۳۸۹۲</span>
              </div>
              <div className="flex justify-between items-center">
                <span>کد پستی رسمی:</span>
                <span>۸۴۳۶۱۸۵۵۰۳</span>
              </div>
            </div>
          </div>

          {/* Col 2: Facade Systems */}
          <div>
            <h3 className="text-xs font-black text-black uppercase tracking-wider mb-3 border-r-2 border-black pr-2">
              سیستم‌های نما و بازشو
            </h3>
            <ul className="space-y-2 text-[11.5px] font-bold text-[#333]">
              <li>
                <Link href="/materials" className="hover:text-black hover:underline flex items-center justify-between transition-colors">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-black" />
                    کاتالوگ ۱۲ سیستم اختصاصی شرکت
                  </span>
                  <ArrowUpLeft className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/services/curtain-wall-lamella" className="hover:text-black hover:underline flex items-center justify-between transition-colors">
                  <span>نمای کرتین‌وال (لامل استیک و یونیتایز)</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/services/aluminum-windows-doors" className="hover:text-black hover:underline flex items-center justify-between transition-colors">
                  <span>پنجره ترمال‌بریک و لیفت‌اسلاید</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/services/frameless-facade" className="hover:text-black hover:underline flex items-center justify-between transition-colors">
                  <span>نمای شیشه‌ای فریم‌لس استراکچرال</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/services/composite-facade" className="hover:text-black hover:underline flex items-center justify-between transition-colors">
                  <span>نمای کامپوزیت آلومینیوم (ACP نسوز)</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Navigation */}
          <div>
            <h3 className="text-xs font-black text-black uppercase tracking-wider mb-3 border-r-2 border-black pr-2">
              بخش‌های تخصصی پرتال
            </h3>
            <ul className="space-y-2 text-[11.5px] font-bold text-[#333]">
              <li><Link href="/#tab-motion" className="hover:text-black hover:underline block">تب ۱: موشن نما و پنجره</Link></li>
              <li><Link href="/#tab-products" className="hover:text-black hover:underline block">تب ۲: کاتالوگ جامع محصولات</Link></li>
              <li><Link href="/#tab-bestsellers" className="hover:text-black hover:underline block">تب ۳: سیستم‌های جدید و پرفروش</Link></li>
              <li><Link href="/#tab-resume" className="hover:text-black hover:underline block">تب ۴: کارنامه ۵۰+ پروژه شاخص</Link></li>
              <li><Link href="/videos" className="hover:text-black hover:underline flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-black" />
                ویدیوهای آموزشی و انیمیشن مقاطع
              </Link></li>
              <li><Link href="/calculator" className="hover:text-black hover:underline block">محاسبه‌گر آنلاین پیش‌فاکتور</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Factory */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-black text-black uppercase tracking-wider mb-3 border-r-2 border-black pr-2">
              دفتر مرکزی و خط تولید کارخانه
            </h3>
            <div className="space-y-2 text-[11.5px]">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <div>
                  <a href="tel:03133687755" className="font-mono text-xs font-black text-black hover:underline block">
                    تلفن رسمی: ۰۳۱-۳۳۶۸۷۷۵۵
                  </a>
                  <a href="tel:0314144" className="font-mono text-xs font-black text-black hover:underline block">
                    خط ۴ رقمی: ۰۳۱-۴۱۴۴
                  </a>
                  <a href="tel:09301545858" className="font-mono text-xs font-bold text-[#333] hover:underline block mt-0.5">
                    همراه مهندسی: ۰۹۳۰۱۵۴۵۸۵۸
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed text-[#333] space-y-1">
                  <div>
                    <strong className="text-black">دفتر رسمی:</strong> اصفهان، خیابان امام خمینی، خیابان بسیج، کوچه ۱۳۵، کوچه فردوسی، پلاک ۱۰۰
                  </div>
                  <div>
                    <strong className="text-black">کارخانه:</strong> اصفهان، شهرک صنعتی جی، خیابان ۲۸، فرعی ۴، پلاک ۶۲
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-[#a8aba8] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#555] font-bold gap-2">
          <p>© {new Date().getFullYear()} کلیه حقوق برای شرکت نوآوران پنجره سپاهان محفوظ است.</p>
          <p className="font-mono text-[10px]">
            Noavaran Panjereh Sepahan · Precision Architectural Engineering
          </p>
        </div>
      </div>
    </footer>
  );
}
