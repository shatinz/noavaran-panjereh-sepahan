import React from 'react';
import { getSettings } from '@/lib/db';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Building2, ShieldCheck, Factory, Award, CheckCircle2, FileCheck } from 'lucide-react';
import Link from 'next/link';

import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.vercel.app';

export const metadata: Metadata = {
  title: 'درباره ما | کارخانه نوآوران پنجره سپاهان و پیشینه ۳۰ ساله',
  description: 'آشنایی با تاریخچه شرکت، مشخصات ثبتی، کارخانه ۱۵۰۰ متری مجهز به ماشین‌آلات CNC و خطوط مکانیزه تولید نماهای مدرن کرتین‌وال و پنجره‌های ترمال‌بریک در اصفهان.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'درباره نوآوران پنجره سپاهان | کارخانه تولید نما و پنجره',
    description: '۳۰ سال تجربه در زمینه طراحی محاسباتی و تولید صنعتی نماهای ساختمانی و پنجره‌های آلومینیومی دوجداره.',
    url: `${siteUrl}/about`,
  },
};

export default async function AboutPage() {
  const settings = await getSettings();

  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'صفحه اصلی',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'درباره ما',
        item: `${siteUrl}/about`,
      },
    ],
  };

  const aboutLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'درباره کارخانه و شرکت نوآوران پنجره سپاهان',
    description: 'تاریخچه تاسیس، خطوط تولید کارخانه‌ای و دستاوردهای شرکت نوآوران پنجره سپاهان',
    url: `${siteUrl}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: settings.companyName,
      foundingDate: '2006',
      taxID: settings.nationalId,
      address: {
        '@type': 'PostalAddress',
        streetAddress: settings.officeAddress,
        addressLocality: 'Isfahan',
        addressCountry: 'IR',
      },
    },
  };

  const timeline = [
    {
      year: '۱۳۹۰',
      title: 'تاسیس کارگاه طراحی نصب و پیمانکاری',
      description: 'شروع به عنوان یک گروه کوچک در زمینه مشاوره، طراحی و نصب پروژه‌های نما و پنجره.'
    },
    {
      year: '۱۳۹۳',
      title: 'خرید دستگاه‌های نیمه‌اتوماتیک',
      description: 'ورود به عرصه تولید کارگاهی و مجهز شدن به دستگاه‌های برش دقیق و پرس‌های کارگاهی.'
    },
    {
      year: '۱۴۰۰',
      title: 'احداث کارخانه در منطقه صنعتی',
      description: 'توسعه فاز تولید و انتقال به فضای صنعتی بزرگتر با تجهیز به خط مونتاژ پیشرفته.'
    },
    {
      year: 'اکنون',
      title: 'نوآوران پنجره سپاهان؛ مجری پروژه‌های ملی',
      description: 'ثبت رسمی شرکت، استقرار سیستم تضمین کیفیت و انجام موفقیت‌آمیز بیش از ۵۵ پروژه شاخص کشوری.'
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }}
      />
      <Breadcrumbs items={[{ label: 'درباره ما' }]} />
      <PageHero 
        title="نوآوران پنجره سپاهان" 
        subtitle="رزومه، تاریخچه و مشخصات ثبتی کارخانه"
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-12" dir="rtl">
        
        {/* Intro */}
        <section className="max-w-3xl text-center mx-auto space-y-6">
          <ShieldCheck className="w-12 h-12 text-signal-500 mx-auto" />
          <p className="text-lg text-steel-300 leading-relaxed font-vazir">
            بیش از یک دهه تجربه در طراحی محاسباتی، نقشه‌کشی فاز ۲، ساخت دقیق کارخانه‌ای و اجرای در محل پروژه‌های مدرن نما و درب و پنجره‌های اختصاصی.
          </p>
        </section>

        {/* Official Legal Registration */}
        <section className="bg-ink-950 border border-ink-800 rounded-xl overflow-hidden metal-shadow">
          <div className="bg-ink-900 border-b border-ink-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileCheck className="w-8 h-8 text-signal-500" />
              <div>
                <h2 className="text-lg font-black text-white font-vazir">مشخصات ثبتی و حقوقی شرکت</h2>
                <span className="text-sm text-steel-400 font-vazir">عضو رسمی اتحادیه صنایع آلومینیوم ایران</span>
              </div>
            </div>
            <span className="px-4 py-2 bg-ink-950 text-white text-sm font-mono font-bold rounded-lg border border-ink-800">
              شناسه ملی: ۱۴۰۱۵۰۲۶۲۳۰
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-ink-800 text-right">
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">نام رسمی شرکت:</span>
              <span className="text-white font-black font-vazir block">نوآوران پنجره سپاهان</span>
            </div>
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">شماره ثبت رسمی:</span>
              <span className="text-white font-black font-mono block text-xl tracking-widest">3892</span>
            </div>
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">کد پستی ثبتی:</span>
              <span className="text-white font-black font-mono block text-xl tracking-widest">8431811565</span>
            </div>
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">تلفن کارخانه و دفتر:</span>
              <span className="text-white font-black font-mono inline-block text-xl tracking-widest text-right" dir="ltr">
                <bdi dir="ltr" style={{ unicodeBidi: 'isolate' }}>031-33687755</bdi>
              </span>
            </div>
          </div>
        </section>

        {/* Industrial Capabilities */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
          <div className="bg-ink-950 border border-ink-800 rounded-xl p-6 md:p-8 space-y-4 metal-shadow hover:border-signal-500/30 transition-colors">
            <Factory className="w-10 h-10 text-signal-500" />
            <h3 className="text-lg font-black text-white font-vazir">کارخانه تولیدی ۱۵۰۰ متری</h3>
            <p className="text-sm text-steel-400 leading-relaxed font-vazir text-justify">
              خط تولید کاملاً ایزوله با بهره‌گیری از اره‌های دوکله دیجیتال، دستگاه‌های پرس زاویه بادی، کپی‌فرز و سیستم‌های پولیش جهت حفظ کیفیت آنودایز و رنگ.
            </p>
          </div>

          <div className="bg-ink-950 border border-ink-800 rounded-xl p-6 md:p-8 space-y-4 metal-shadow hover:border-signal-500/30 transition-colors">
            <Building2 className="w-10 h-10 text-signal-500" />
            <h3 className="text-lg font-black text-white font-vazir">تیم مهندسی و دپارتمان فنی</h3>
            <p className="text-sm text-steel-400 leading-relaxed font-vazir text-justify">
              تیم مجرب متشکل از مهندسین معماری و عمران جهت تهیه نقشه‌های شاپ‌دراوینگ (فاز ۲)، متره دقیق و محاسبات ممان اینرسی پروفیل‌ها.
            </p>
          </div>

          <div className="bg-ink-950 border border-ink-800 rounded-xl p-6 md:p-8 space-y-4 metal-shadow hover:border-signal-500/30 transition-colors">
            <Award className="w-10 h-10 text-signal-500" />
            <h3 className="text-lg font-black text-white font-vazir">کنترل کیفیت (QC) سه‌مرحله‌ای</h3>
            <p className="text-sm text-steel-400 leading-relaxed font-vazir text-justify">
              تست دقیق برش، بازبینی کیفیت اسمبل و کنترل نهایی آب‌بندی پیش از ارسال. بسته‌بندی با فوم و سلفون جهت جلوگیری از آسیب در حمل و نصب.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-ink-900 border border-ink-800 rounded-xl p-8 md:p-12 metal-shadow text-right">
          <h2 className="text-2xl font-black text-white font-vazir border-r-4 border-signal-500 pr-4 mb-10">
            مسیر توسعه و پیشرفت ما
          </h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-ink-800 before:to-transparent">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-ink-900 bg-signal-500 text-white font-bold font-mono text-xs shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(171,0,23,0.5)] relative z-10">
                  {item.year}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-ink-950 p-5 rounded-xl border border-ink-800 shadow-sm text-right">
                  <h4 className="text-lg font-bold text-white font-vazir mb-2">{item.title}</h4>
                  <p className="text-sm text-steel-400 font-vazir leading-relaxed text-justify">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
