"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/media";
import { Play, RotateCcw, ExternalLink, Sparkles, Layers, ShieldCheck, Eye, Palette } from "lucide-react";

interface AnimationItem {
  id: number;
  title: string;
  enTitle: string;
  desc: string;
  file: string;
  themeColor: string;
  tag: string;
}

const animations: AnimationItem[] = [
  {
    id: 1,
    title: "اسکن مهندسی و بلوپرینت معماری",
    enTitle: "Architectural CAD Laser Scan",
    desc: "شبیه‌سازی نقشه فنی و محاسباتی نماهای شیشه‌ای و کرتین‌وال با گرید مختصات میلی‌متری، دایره‌های اندازه‌گیری تراز و جاروب پرتو اسکن لیزری که لوگوی رسمی نوآوران را از حالت دیاگرام نقشه به واقعیت فیزیکی تبدیل می‌کند.",
    file: "/logo-animations/animation-1-blueprint.html",
    themeColor: "from-sky-500/20 to-sky-950/40 text-sky-400 border-sky-500/40",
    tag: "مهندسی و تکنیکال",
  },
  {
    id: 2,
    title: "کوره متالیک و اکستروژن آلومینیوم",
    enTitle: "Thermal Forge & Metal Extrusion",
    desc: "فضای صنعتی کوره حرارتی و ذوب شمش ۶۰۶۳ با ذرات معلق گداخته، حلقه پلاسمای کوره، ظهور حرارتی لوگوی اصیل و انجماد تدریجی به آلومینیوم صیقلی آنودایز شده همراه با عبور پرتو درخشش متالیک کروم.",
    file: "/logo-animations/animation-2-metallic.html",
    themeColor: "from-signal-500/20 to-red-950/40 text-signal-400 border-signal-500/40",
    tag: "صنعتی و متالورژی",
  },
  {
    id: 3,
    title: "هولوگرافی سه‌بعدی و شیشه دوجداره",
    enTitle: "3D Holographic Curtain-Wall",
    desc: "لوح بلورین سه‌بعدی معلق با خاصیت انکسار و شکست نور شیشه دوجداره؛ تعاملی با ژیروسکوپ زاویه دید ماوس، حلقه‌های اوربیتال نئونی دوار، سایه‌اندازی طبیعی و رقص پرتوهای منشوری روی آرم شرکت.",
    file: "/logo-animations/animation-3-glass.html",
    themeColor: "from-cyan-500/20 to-indigo-950/40 text-cyan-400 border-cyan-500/40",
    tag: "سه‌بعدی و مدرن",
  },
];

export function LogoMotionClient() {
  const [activeId, setActiveId] = useState<number>(1);
  const [iframeKey, setIframeKey] = useState<number>(0);

  const activeAnim = animations.find((a) => a.id === activeId) || animations[0];

  const handleRestart = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="w-full text-slate-100 font-vazir" dir="rtl">
      {/* Header Banner */}
      <div className="relative py-12 md:py-16 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950 border-b border-steel-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00AFEF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-[1300px] mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-signal-500/10 border border-signal-500/30 text-signal-400 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            استودیوی موشن‌گرافیک و هویت بصری
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            ۳ انیمیشن و لوگوگرافی رسمی نوآوران پنجره
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            طراحی‌شده بر پایه <span className="text-white font-bold">لوگوی اصلی و بدون تغییر</span> شرکت نوآوران پنجره سپاهان؛ با بهره‌گیری از شیدرهای نوری، فیزیک سه‌بعدی و اصول مهندسی نماهای مدرن شیشه‌ای.
          </p>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 py-8 md:py-12">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap mb-8">
          {animations.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2.5 border ${
                  isActive
                    ? "bg-signal-600 text-white border-signal-400 shadow-lg shadow-signal-600/30 scale-[1.02]"
                    : "bg-ink-900/80 text-slate-400 border-steel-800 hover:text-white hover:border-steel-700"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Live Interactive Player Stage */}
        <div className="bg-ink-950 border border-steel-800 rounded-2xl overflow-hidden shadow-2xl mb-12">
          {/* Player Bar */}
          <div className="bg-ink-900 border-b border-steel-800 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="text-sm font-bold text-white">{activeAnim.title}</span>
                <span className="text-xs text-slate-400 font-mono" dir="ltr">({activeAnim.enTitle})</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-steel-800/80 hover:bg-steel-700 text-slate-200 text-xs font-bold transition-colors border border-steel-700"
                title="اجرای مجدد انیمیشن"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                اجرای مجدد
              </button>
              <a
                href={withBasePath(activeAnim.file)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-signal-600/20 hover:bg-signal-600/40 text-signal-400 text-xs font-bold transition-colors border border-signal-500/30"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                تب مستقل
              </a>
            </div>
          </div>

          {/* Responsive iFrame Viewport */}
          <div className="w-full h-[480px] sm:h-[580px] lg:h-[660px] bg-black relative">
            <iframe
              key={iframeKey}
              src={withBasePath(activeAnim.file)}
              className="w-full h-full border-0 block"
              title={activeAnim.title}
            />
          </div>
        </div>

        {/* 3 Detail Cards Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-steel-800">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-signal-500" />
              بررسی ساختار هنری ۳ نسخه انیمیشن
            </h2>
            <span className="text-xs text-slate-400 hidden sm:inline">منطبق بر استانداردهای تولید محتوای تبلیغاتی و تیزر سازمانی</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {animations.map((item) => {
              const isCurrent = item.id === activeId;
              return (
                <div
                  key={item.id}
                  className={`bg-ink-900 border rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                    isCurrent ? "border-signal-500 shadow-xl shadow-signal-500/10" : "border-steel-800 hover:border-steel-700"
                  }`}
                >
                  {/* Thumbnail Banner with Authentic Logo */}
                  <div className="h-44 relative bg-gradient-to-b from-ink-800 to-ink-950 flex items-center justify-center border-b border-steel-800/80 p-4">
                    <div className="relative w-24 h-24 transition-transform duration-300 hover:scale-110">
                      <Image
                        src={withBasePath("/images/logo.png")}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-ink-950/80 border border-steel-700 text-slate-300">
                      {item.tag}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                    <span className="text-[11px] font-mono text-signal-400 font-semibold mb-3" dir="ltr">
                      {item.enTitle}
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6 flex-grow">
                      {item.desc}
                    </p>

                    <div className="flex items-center gap-2 pt-2 border-t border-steel-800/60">
                      <button
                        onClick={() => {
                          setActiveId(item.id);
                          window.scrollTo({ top: 220, behavior: "smooth" });
                        }}
                        className="flex-1 py-2 px-3 rounded-lg bg-signal-600 hover:bg-signal-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        اجرا در پلیر
                      </button>
                      <a
                        href={withBasePath(item.file)}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-3 rounded-lg bg-steel-800 hover:bg-steel-700 text-slate-200 text-xs font-bold transition-colors border border-steel-700"
                        title="مشاهده تمام‌صفحه"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Logography & Brand Identity Specifications */}
        <div className="bg-ink-900 border border-steel-800 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-2">
            <Palette className="w-6 h-6 text-signal-500" />
            <h2 className="text-lg sm:text-xl font-black text-white">شناسنامه لوگوگرافی و استاندارد هویت بصری</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">
            کدهای رسمی رنگ، تایپوگرافی و مشخصات حقوقی برند نوآوران پنجره سپاهان
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Color Swatches */}
            <div className="bg-ink-950 p-4 rounded-xl border border-steel-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-3">پالت رنگ‌های سازمانی:</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 bg-ink-900 p-2 rounded-lg border border-steel-800">
                  <span className="w-5 h-5 rounded bg-[#9B2130] border border-white/20 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-white">#9B2130</span>
                    <span className="text-[9px] text-slate-400">قرمز نوآوران</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-ink-900 p-2 rounded-lg border border-steel-800">
                  <span className="w-5 h-5 rounded bg-[#00AFEF] border border-white/20 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-white">#00AFEF</span>
                    <span className="text-[9px] text-slate-400">آبی شیشه</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-ink-900 p-2 rounded-lg border border-steel-800">
                  <span className="w-5 h-5 rounded bg-[#373435] border border-white/20 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-white">#373435</span>
                    <span className="text-[9px] text-slate-400">زغالی متالیک</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-ink-900 p-2 rounded-lg border border-steel-800">
                  <span className="w-5 h-5 rounded bg-[#FEFEFE] border border-black/20 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-white">#FEFEFE</span>
                    <span className="text-[9px] text-slate-400">سفید خالص</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="bg-ink-950 p-4 rounded-xl border border-steel-800 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 block mb-2">تایپوگرافی رسمی:</span>
                <span className="text-sm font-bold text-white block">P Yekan + Vazirmatn</span>
                <span className="text-xs text-slate-400 block mt-1">انگلیسی: Montserrat Bold</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-3 pt-2 border-t border-steel-800/80">
                ترسیم برداری کتیبه قوسی بالای آرم
              </span>
            </div>

            {/* Legal */}
            <div className="bg-ink-950 p-4 rounded-xl border border-steel-800 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 block mb-2">مشخصات ثبتی و حقوقی:</span>
                <span className="text-sm font-bold text-white block">شماره ثبت: ۳۸۹۲</span>
                <span className="text-xs text-slate-400 block mt-1">شناسه ملی: ۱۴۰۱۵۰۲۶۲۳۰</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-3 pt-2 border-t border-steel-800/80">
                سهامی خاص — اداره ثبت اسناد و املاک
              </span>
            </div>

            {/* Geometry */}
            <div className="bg-ink-950 p-4 rounded-xl border border-steel-800 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 block mb-2">هندسه نشانه (Logo Crest):</span>
                <span className="text-xs font-bold text-white block">حروف اختصاری NPS + فرم پنجره</span>
                <span className="text-[11px] text-slate-400 block mt-1">نمای ایزومتریک ۳ بعدی با زاویه لامل</span>
              </div>
              <span className="text-[10px] text-emerald-400 block mt-3 pt-2 border-t border-steel-800/80 font-bold">
                ✔ تطابق ۱۰۰٪ با آرم ثبت‌شده رسمی
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
