import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Phone, 
  ArrowLeft, 
  ArrowUpLeft, 
  Play, 
  CheckCircle2, 
  Calculator, 
  Sparkles,
  Layers,
  Grid,
  Maximize,
  Box,
  TreePine,
  ExternalLink,
  QrCode
} from 'lucide-react';
import { getServices, getProjects, getArticles, getVideos, getSettings, getMaterials } from '@/lib/db';

export default async function HomePage() {
  const services = await getServices();
  const allProjects = await getProjects();
  const featuredProjects = allProjects.slice(0, 6);
  const articles = await getArticles();
  const recentArticles = articles.slice(0, 3);
  const videos = await getVideos();
  const featuredVideos = videos.slice(0, 2);
  const settings = await getSettings();
  const materials = await getMaterials();
  const featuredMaterials = materials.slice(0, 6);

  const iconMap: Record<string, any> = {
    Grid: Grid,
    Layers: Layers,
    Maximize: Maximize,
    Box: Box,
    TreePine: TreePine,
    ShieldCheck: ShieldCheck
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-charcoal-800 bg-gradient-to-b from-charcoal-950 via-charcoal-900 to-charcoal-950">
        {/* Subtle Architectural Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#222832_1px,transparent_1px),linear-gradient(to_bottom,#222832_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bronze-500/10 border border-bronze-500/30 text-bronze-400 text-xs font-medium mb-8">
            <ShieldCheck className="w-4 h-4 text-bronze-400" />
            <span>پیشگام در مهندسی نما و پنجره‌های دوجداره صنعتی از سال ۱۳۸۵</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.25] max-w-4xl mx-auto">
            مهندسی دقیق نماهای شیشه‌ای و{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bronze-400 via-bronze-300 to-amber-200">
              پنجره‌های ترمال‌بریک
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-titanium-300 max-w-2xl mx-auto leading-relaxed">
            طراحی محاسباتی، ساخت کارخانه‌ای و اجرای تخصصی کرتین‌وال لامل، فریم‌لس، پنجره‌های کشویی لیفت‌اند‌اسلاید، کامپوزیت و هندریل با بالاترین استانداردهای هوابندی و آب‌بندی.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/materials"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-400 hover:to-bronze-500 text-charcoal-950 font-bold shadow-lg shadow-bronze-500/25 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Layers className="w-5 h-5 text-charcoal-950" />
              <span>کاتالوگ متریال‌ها و سیستم‌ها</span>
            </Link>

            <Link
              href="/calculator"
              className="px-6 py-3.5 rounded-xl bg-charcoal-850 hover:bg-charcoal-800 text-titanium-100 border border-charcoal-700 hover:border-bronze-500/40 flex items-center gap-2 transition-all"
            >
              <Calculator className="w-5 h-5 text-bronze-400" />
              <span>محاسبه‌گر پیش‌فاکتور آنلاین</span>
            </Link>

            <a
              href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
              className="px-5 py-3.5 rounded-xl bg-charcoal-900/80 hover:bg-charcoal-850 text-bronze-400 border border-charcoal-700 font-mono text-sm flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{settings.phone}</span>
            </a>
          </div>

          {/* Social Proof Stats Bar */}
          <div className="mt-16 pt-10 border-t border-charcoal-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-charcoal-900/50 border border-charcoal-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">۱۵+ سال</div>
              <div className="text-xs text-titanium-400 mt-1 font-medium">پیشینه تخصصی از ۱۳۸۵</div>
            </div>
            <div className="p-4 rounded-xl bg-charcoal-900/50 border border-charcoal-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">۱۵۰۰ متر</div>
              <div className="text-xs text-titanium-400 mt-1 font-medium">فضای تولید و ماشین‌آلات اروپایی</div>
            </div>
            <div className="p-4 rounded-xl bg-charcoal-900/50 border border-charcoal-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">۳۰۰۰+</div>
              <div className="text-xs text-titanium-400 mt-1 font-medium">پروژه موفق اداری، بانکی و ویلایی</div>
            </div>
            <div className="p-4 rounded-xl bg-charcoal-900/50 border border-charcoal-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">۱۰ سال</div>
              <div className="text-xs text-titanium-400 mt-1 font-medium">گارانتی کتبی هوابندی و آب‌بندی</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold text-bronze-400 tracking-wider uppercase mb-2">
            سبد محصولات و خدمات تخصصی
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">
            سیستم‌های مدرن ساختمانی نوآوران پنجره سپاهان
          </p>
          <p className="mt-3 text-sm text-titanium-400">
            بررسی مشخصات فنی، جزئیات پروفیل‌های آلومینیومی و استانداردهای عایق‌بندی هر سیستم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => {
            const IconComponent = iconMap[s.icon] || Building2;
            return (
              <div
                key={s.id}
                className="group rounded-2xl bg-charcoal-900 border border-charcoal-800 hover:border-bronze-500/50 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-bronze-500/5"
              >
                {/* Image */}
                <div className="relative h-52 w-full bg-charcoal-850 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/30 to-transparent" />
                  <div className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-charcoal-950/80 backdrop-blur-md text-bronze-400 border border-charcoal-700">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-bronze-400 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs text-titanium-400 mt-2 line-clamp-3 leading-relaxed">
                      {s.summary}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 pt-2 border-t border-charcoal-800/80">
                    {s.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-titanium-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-bronze-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/services/${s.slug}`}
                    className="pt-3 inline-flex items-center justify-between text-xs font-bold text-bronze-400 hover:text-bronze-300 transition-colors group/link"
                  >
                    <span>جزئیات فنی و مقاطع پروفیل</span>
                    <ArrowLeft className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. MATERIAL & PROFILE CATALOGUE SPOTLIGHT (NEW) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-charcoal-900 via-charcoal-900/90 to-charcoal-950 border border-charcoal-800 p-8 sm:p-12 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-charcoal-800 pb-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bronze-500/10 border border-bronze-500/30 text-bronze-400 text-xs font-medium font-mono">
                ENGINEERING PROFILE CATALOGUE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                کاتالوگ مقاطع و متریال‌های تخصصی مصرفی شرکت
              </h2>
              <p className="text-xs sm:text-sm text-titanium-300 max-w-2xl leading-relaxed">
                سیستم‌های لولایی ترمال‌بریک (TH68, TH60)، کشویی لیفت‌اند‌اسلاید (TS143, TS115, TS77)، نرمال و جان‌پناه‌های شیشه‌ای با تصاویر سه‌بعدی CAD، مشخصات مهندسی و انیمیشن‌های آموزشی مونتاژ.
              </p>
            </div>

            <Link
              href="/materials"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 font-bold text-xs shadow-lg shadow-bronze-500/20 transition-all shrink-0"
            >
              <span>مشاهده کامل ۱۲ سیستم و مقایسه فنی</span>
              <ArrowLeft className="w-4 h-4 text-charcoal-950" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMaterials.map((m) => (
              <div
                key={m.id}
                className="group rounded-2xl bg-charcoal-950/70 border border-charcoal-800/90 hover:border-bronze-500/50 p-5 flex flex-col justify-between transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-charcoal-900 border border-charcoal-700 text-bronze-400 font-mono font-bold text-xs">
                      {m.code}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400 font-mono">
                      {m.specs.thermalUf}
                    </span>
                  </div>

                  <div className="relative h-44 w-full rounded-xl bg-charcoal-900/60 overflow-hidden flex items-center justify-center p-2">
                    <img
                      src={m.image}
                      alt={m.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-bronze-400 block">{m.category}</span>
                    <h3 className="text-sm font-bold text-white mt-0.5 group-hover:text-bronze-300 transition-colors line-clamp-1">
                      {m.title}
                    </h3>
                    <p className="text-xs text-titanium-400 mt-1 line-clamp-2 leading-relaxed">
                      {m.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-charcoal-900/60 p-2.5 rounded-lg text-[10px] font-mono text-titanium-300 border border-charcoal-800">
                    <div>فریم: {m.specs.frameWidth}</div>
                    <div>شیشه: {m.specs.glassThickness}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-charcoal-800/80 mt-3 flex items-center justify-between">
                  <Link
                    href="/materials"
                    className="text-xs font-bold text-bronze-400 hover:text-bronze-300 flex items-center gap-1"
                  >
                    <span>بررسی مشخصات و ویدیو</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>

                  {m.qrUrl && (
                    <a
                      href={m.qrUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="مشاهده صفحه کاتالوگ"
                      className="text-titanium-400 hover:text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-charcoal-800 gap-4">
          <div>
            <h2 className="text-xs font-bold text-bronze-400 tracking-wider uppercase mb-1">
              کارنامه و پروژه‌های شاخص
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">
              پروژه‌های اجرایی در سطح استان و کشور
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-bronze-400 hover:text-bronze-300 transition-colors shrink-0"
          >
            <span>مشاهده همه ۵۵+ پروژه</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((p) => (
            <Link
              key={p.id}
              href="/projects"
              className="group rounded-xl bg-charcoal-900 border border-charcoal-800 overflow-hidden hover:border-bronze-500/40 transition-all shadow-md min-w-0 block"
            >
              <div className="relative h-64 w-full bg-charcoal-850 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 block"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                {/* HD Quality Badge */}
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-bronze-500/90 text-charcoal-950 font-black text-[9px] tracking-wider shadow-sm flex items-center gap-1 backdrop-blur-sm">
                  <Sparkles className="w-2.5 h-2.5" />
                  HD
                </span>

                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-charcoal-950/80 backdrop-blur-md text-[11px] font-medium text-bronze-300 border border-charcoal-700">
                  {p.category}
                </span>
              </div>
              <div className="p-4 min-w-0">
                <h3 className="text-sm font-bold text-white group-hover:text-bronze-400 transition-colors line-clamp-1">
                  {p.title}
                </h3>
                <p className="text-xs text-titanium-400 mt-1 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>
                <div className="mt-3 pt-2 flex items-center justify-between text-[11px] text-bronze-400 font-medium border-t border-charcoal-800/80">
                  <span>مشاهده پروژه در گالری</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. EDUCATIONAL VIDEO SECTION SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-charcoal-900 to-charcoal-950 border border-charcoal-800 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bronze-500/20 text-bronze-300 text-xs font-medium mb-3 border border-bronze-500/30">
              <Play className="w-3.5 h-3.5 fill-current" />
              کتابخانه ویدیوهای آموزشی و مهندسی
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              آموزش‌های تصویری، انیمیشن مقاطع و تست‌های آزمایشگاهی
            </h2>
            <p className="mt-3 text-sm text-titanium-300 leading-relaxed">
              مشاهده انیمیشن‌های سه‌بعدی نحوه مونتاژ قطعات، عملکرد بوژی‌های لیفت‌اند‌اسلاید، گسکت‌های درزبند، تست دسی‌بل و آزمایش‌های نفوذ آب.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredVideos.map((v) => (
              <div
                key={v.id}
                className="rounded-2xl bg-charcoal-950/80 border border-charcoal-800 overflow-hidden flex flex-col group hover:border-bronze-500/40 transition-all shadow-xl"
              >
                <div className="relative h-56 w-full bg-charcoal-850 overflow-hidden">
                  <img
                    src={v.thumbnail || 'https://arvinpanjereh.com/upload/service/742b5647-017c-4a6e-b416-a184adf97dcc.webp'}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-charcoal-950/40 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-bronze-500 text-charcoal-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current mr-0.5" />
                    </div>
                  </div>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-charcoal-950/80 text-[11px] text-bronze-300 font-mono">
                    {v.platform === 'direct' ? 'انیمیشن مقاطع مهندسی' : v.platform === 'aparat' ? 'آپارات' : 'یوتیوب'}
                  </span>
                  {v.duration && (
                    <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-charcoal-950/90 text-[10px] font-mono text-titanium-300">
                      {v.duration}
                    </span>
                  )}
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] text-bronze-400 font-semibold">{v.category}</span>
                    <h3 className="text-sm font-bold text-white mt-1 line-clamp-2 leading-relaxed">
                      {v.title}
                    </h3>
                    <p className="text-xs text-titanium-400 mt-2 line-clamp-2 leading-relaxed">
                      {v.description}
                    </p>
                  </div>

                  <Link
                    href="/videos"
                    className="text-xs font-bold text-bronze-400 hover:text-bronze-300 flex items-center gap-1.5 pt-2"
                  >
                    <span>مشاهده کامل ویدیو و توضیحات</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-titanium-100 border border-charcoal-700 text-sm font-bold transition-colors"
            >
              <span>ورود به کتابخانه جامع ویدیوهای آموزشی</span>
              <ArrowLeft className="w-4 h-4 text-bronze-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CALCULATOR CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-bronze-600 via-bronze-500 to-amber-500 text-charcoal-950 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl text-center md:text-right">
            <span className="inline-block px-3 py-1 rounded-full bg-charcoal-950/20 text-charcoal-950 text-xs font-extrabold uppercase">
              محاسبه‌گر پیش‌فاکتور مهندسی
            </span>
            <h2 className="text-2xl sm:text-3xl font-black leading-snug">
              ابعاد پروژه‌تان را وارد کنید و برآورد تخمینی قیمت را دریافت نمایید
            </h2>
            <p className="text-xs sm:text-sm font-medium opacity-90 leading-relaxed">
              انتخاب نوع سیستم (کرتین‌وال، لیفت‌اند‌اسلاید، لامل، ترمال‌بریک)، نوع شیشه (دوجداره، لمینت، سکوریت)، و متراژ تقریبی نما و پنجره.
            </p>
          </div>

          <Link
            href="/calculator"
            className="px-8 py-4 rounded-xl bg-charcoal-950 hover:bg-charcoal-900 text-bronze-400 font-extrabold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all shrink-0 flex items-center gap-2"
          >
            <Calculator className="w-5 h-5 text-bronze-400" />
            <span>ورود به محاسبه‌گر قیمت</span>
          </Link>
        </div>
      </section>

      {/* 7. ARTICLES & TECHNICAL GUIDES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-charcoal-800 gap-4">
          <div>
            <h2 className="text-xs font-bold text-bronze-400 tracking-wider uppercase mb-1">
              دانشنامه مهندسی
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">
              آخرین مقالات و استانداردهای ساختمانی
            </p>
          </div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-bold text-bronze-400 hover:text-bronze-300 transition-colors shrink-0"
          >
            <span>مشاهده همه مقالات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentArticles.map((a) => (
            <div
              key={a.id}
              className="rounded-2xl bg-charcoal-900 border border-charcoal-800 overflow-hidden flex flex-col group hover:border-bronze-500/40 transition-all shadow-md"
            >
              <div className="relative h-48 w-full bg-charcoal-850 overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-charcoal-950/80 text-[11px] text-bronze-300 border border-charcoal-700">
                  {a.category}
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-mono text-titanium-500">{a.date}</span>
                  <h3 className="text-sm font-bold text-white mt-1 group-hover:text-bronze-400 transition-colors line-clamp-2 leading-relaxed">
                    {a.title}
                  </h3>
                  <p className="text-xs text-titanium-400 mt-2 line-clamp-3 leading-relaxed">
                    {a.excerpt}
                  </p>
                </div>
                <Link
                  href={`/articles/${a.slug}`}
                  className="text-xs font-bold text-bronze-400 hover:text-bronze-300 flex items-center gap-1 pt-2"
                >
                  <span>ادامه مطلب و مطالعه راهنما</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
