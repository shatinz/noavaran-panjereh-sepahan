import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ArrowLeft, 
  CheckCircle2, 
  Calculator, 
  Layers, 
  Grid, 
  Maximize, 
  Box, 
  ShieldCheck, 
  Phone
} from 'lucide-react';
import { getServices, getProjects, getArticles } from '@/lib/db';

export default async function HomePage() {
  const services = await getServices();
  const projects = await getProjects();
  const articles = await getArticles();

  return (
    <div className="space-y-8 pb-16 bg-[#F5F5F5] text-[#18191a]">
      {/* 
        ====================================================
        MAIN LAYOUT: MATCHING MOCKUP 1 (EXACT STRUCTURE IN PERSIAN)
        Grid with Large Featured Glass Facade on Left, 
        and 4 Core Precision Cards on Right
        ====================================================
      */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* LEFT LARGE HERO BOX (Col 1 to 7): High-rise Glass Facade Spotlight */}
          <div className="lg:col-span-7 relative border border-[#b5b8b5] subtle-soft-shadow bg-[#18191a] h-[520px] sm:h-[600px] overflow-hidden flex flex-col justify-end p-6 sm:p-10 group">
            <img
              src="https://arvinpanjereh.com/upload/service/742b5647-017c-4a6e-b416-a184adf97dcc.webp"
              alt="راهکارهای مدرن نما و پنجره - نوآوران پنجره سپاهان"
              className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-1000"
            />
            {/* Dark Gradient Overlay for Crisp Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/95 via-[#000000]/40 to-transparent" />

            <div className="relative z-10 space-y-4 text-right">
              <span className="aluminum-header px-3 py-1 text-xs font-black text-[#18191a] inline-block shadow-sm">
                مهندسی تخصصی نما و پنجره‌های صنعتی
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white text-shadow-strong leading-tight">
                راهکارهای مدرن نما: ساخت آینده معماری
              </h1>
              <p className="text-xs sm:text-sm text-[#f0f2f0] text-shadow-subtle max-w-xl font-medium leading-relaxed">
                طراحی، مهندسی محاسبات و اجرای اختصاصی نماهای شیشه‌ای کرتین‌وال، لامل، فریم‌لس و پنجره‌های ترمال‌بریک در اصفهان و سراسر کشور.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/calculator"
                  className="px-5 py-3 bg-[#cbcccb] hover:bg-[#b8bab8] text-[#18191a] font-black text-xs rounded-none shadow-md transition-all flex items-center gap-2 border border-[#b5b8b5]"
                >
                  <Calculator className="w-4 h-4 text-[#18191a]" />
                  <span>محاسبه‌گر آنلاین قیمت</span>
                </Link>

                <Link
                  href="/projects"
                  className="px-5 py-3 bg-[#18191a]/90 hover:bg-[#18191a] text-white font-bold text-xs rounded-none border border-white/20 transition-all backdrop-blur-md flex items-center gap-2"
                >
                  <span>کشف توانمندی‌های ما (۵۰+ پروژه)</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT GRID CARDS (Col 8 to 12): 4 Core Precision Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* CARD 1: نمونه‌های پروفیل موجود */}
            <Link
              href="/services"
              className="group relative h-[250px] sm:h-[290px] border border-[#b5b8b5] subtle-soft-shadow bg-[#18191a] overflow-hidden flex flex-col justify-between"
            >
              <img
                src="https://arvinpanjereh.com/upload/service/0faef799-a472-46be-83bf-7cf42bbfaaa3.webp"
                alt="پروفیل‌های آلومینیومی با مهندسی دقیق"
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/30 to-transparent" />

              <div className="relative z-10 p-2.5">
                <span className="aluminum-header px-2.5 py-1 text-[10px] font-black text-[#18191a] inline-block shadow-sm">
                  نمونه‌های پروفیل موجود
                </span>
              </div>

              <div className="relative z-10 p-4 text-right space-y-1">
                <h2 className="text-sm font-black text-white text-shadow-strong group-hover:underline leading-tight">
                  پروفیل‌های آلومینیومی با مهندسی دقیق
                </h2>
                <p className="text-[10px] text-[#f0f2f0] text-shadow-subtle line-clamp-2">
                  سیستم‌های ترمال‌بریک، لیفت‌اند‌اسلاید و مقاطع کرتین‌وال.
                </p>
              </div>
            </Link>

            {/* CARD 2: نمونه کارهای انجام شده */}
            <Link
              href="/projects"
              className="group relative h-[250px] sm:h-[290px] border border-[#b5b8b5] subtle-soft-shadow bg-[#18191a] overflow-hidden flex flex-col justify-between"
            >
              <img
                src="https://arvinpanjereh.com/upload/service/742b5647-017c-4a6e-b416-a184adf97dcc.webp"
                alt="نمایش پروژه‌های شاخص اجرا شده"
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/30 to-transparent" />

              <div className="relative z-10 p-2.5">
                <span className="aluminum-header px-2.5 py-1 text-[10px] font-black text-[#18191a] inline-block shadow-sm">
                  نمونه کارهای انجام شده
                </span>
              </div>

              <div className="relative z-10 p-4 text-right space-y-1">
                <h2 className="text-sm font-black text-white text-shadow-strong group-hover:underline leading-tight">
                  نمایش پروژه‌های شاخص اجرا شده
                </h2>
                <p className="text-[10px] text-[#f0f2f0] text-shadow-subtle line-clamp-2">
                  آرشیو بیش از ۵۰ پروژه برجسته اداری و تجاری.
                </p>
              </div>
            </Link>

            {/* CARD 3: پروژه‌های درحال ساخت */}
            <Link
              href="/projects?status=ongoing"
              className="group relative h-[250px] sm:h-[290px] border border-[#b5b8b5] subtle-soft-shadow bg-[#18191a] overflow-hidden flex flex-col justify-between"
            >
              <img
                src="https://arvinpanjereh.com/upload/service/2f5bb5ed-60bb-49e5-9003-8be94921ad5e.webp"
                alt="ساخت آینده، پنل به پنل"
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/30 to-transparent" />

              <div className="relative z-10 p-2.5">
                <span className="aluminum-header px-2.5 py-1 text-[10px] font-black text-[#18191a] inline-block shadow-sm">
                  پروژه‌های درحال ساخت
                </span>
              </div>

              <div className="relative z-10 p-4 text-right space-y-1">
                <h2 className="text-sm font-black text-white text-shadow-strong group-hover:underline leading-tight">
                  ساخت آینده، پنل به پنل
                </h2>
                <p className="text-[10px] text-[#f0f2f0] text-shadow-subtle line-clamp-2">
                  کارگاه‌های فعال نصب لامل و شیشه‌های مرتفع.
                </p>
              </div>
            </Link>

            {/* CARD 4: مقاله‌ها */}
            <Link
              href="/articles"
              className="group relative h-[250px] sm:h-[290px] border border-[#b5b8b5] subtle-soft-shadow bg-[#18191a] overflow-hidden flex flex-col justify-between"
            >
              <img
                src="https://arvinpanjereh.com/upload/service/4eb9bebe-fbcf-49b0-bc35-12e0b62e49c7.webp"
                alt="نوآوری در صنعت پنجره و پایداری"
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/30 to-transparent" />

              <div className="relative z-10 p-2.5">
                <span className="aluminum-header px-2.5 py-1 text-[10px] font-black text-[#18191a] inline-block shadow-sm">
                  مقاله‌ها و دانشنامه فنی
                </span>
              </div>

              <div className="relative z-10 p-4 text-right space-y-1">
                <h2 className="text-sm font-black text-white text-shadow-strong group-hover:underline leading-tight">
                  نوآوری در صنعت پنجره و پایداری
                </h2>
                <p className="text-[10px] text-[#f0f2f0] text-shadow-subtle line-clamp-2">
                  راهنماهای استاندارد عایق‌بندی و ممان اینرسی.
                </p>
              </div>
            </Link>

          </div>
        </div>

        {/* 
          ====================================================
          BOTTOM STATISTICS ROW (آمار درخشان)
          ====================================================
        */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="aluminum-card p-4 border border-[#b5b8b5] subtle-soft-shadow">
            <div className="text-2xl sm:text-3xl font-black text-[#18191a] font-mono">۱۵+ سال</div>
            <div className="text-xs font-bold text-[#484c50] mt-1">سال سابقه درخشان در صنعت نما</div>
          </div>

          <div className="aluminum-card p-4 border border-[#b5b8b5] subtle-soft-shadow">
            <div className="text-2xl sm:text-3xl font-black text-[#18191a] font-mono">۱۵۰۰+ مترمربع</div>
            <div className="text-xs font-bold text-[#484c50] mt-1">مساحت کارخانه مجهز صنعتی</div>
          </div>

          <div className="aluminum-card p-4 border border-[#b5b8b5] subtle-soft-shadow">
            <div className="text-2xl sm:text-3xl font-black text-[#18191a] font-mono">۵۰+ پروژه</div>
            <div className="text-xs font-bold text-[#484c50] mt-1">پروژه تکمیل‌شده و تحویل داده شده</div>
          </div>
        </div>
      </div>
    </div>
  );
}
