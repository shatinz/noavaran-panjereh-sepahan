import React from 'react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactFormClient } from '@/components/contact/ContactFormClient';
import { MapPin, Phone, Clock, ShieldCheck, FileCheck } from 'lucide-react';
import settingsData from '@/data/settings.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.vercel.app';

export const metadata: Metadata = {
  title: 'تماس با ما | مشاوره تخصصی و استعلام قیمت نما و پنجره ترمال‌بریک',
  description: 'راه‌های ارتباط با دفتر مهندسی فروش و کارخانه نوآوران پنجره سپاهان در اصفهان. تماس با ۳۳۶۸۷۷۵۵-۰۳۱ و موبایل ۰۹۳۰۱۵۴۵۸۵۸ جهت استعلام قیمت، برآورد متراژ و بازدید پروژه.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'تماس با نوآوران پنجره سپاهان | استعلام قیمت و مشاوره مهندسی',
    description: 'مشاوره رایگان، برآورد دقیق قیمت و صدور پیش‌فاکتور نماهای مدرن کرتین‌وال و پنجره‌های اختصاصی ترمال‌بریک.',
    url: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  const contactLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'تماس با نوآوران پنجره سپاهان',
    description: 'درخواست مشاوره، برآورد قیمت و اطلاعات تماس دفتر مهندسی و کارخانه نوآوران پنجره سپاهان',
    url: `${siteUrl}/contact`,
    mainEntity: {
      '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
      name: settingsData.companyName,
      telephone: settingsData.phone,
      email: settingsData.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: settingsData.officeAddress,
        addressLocality: 'Isfahan',
        addressRegion: 'Isfahan',
        addressCountry: 'IR',
        postalCode: settingsData.postalCode,
      },
    },
  };

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
        name: 'تماس با ما',
        item: `${siteUrl}/contact`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <Breadcrumbs items={[{ label: 'تماس با ما' }]} />
      <PageHero 
        title="ارتباط با مهندسی فروش" 
        subtitle="مشاوره رایگان، برآورد قیمت و بازدید از پروژه"
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-12" dir="rtl">
        
        {/* Official Legal Registration Banner */}
        <section className="bg-ink-950 border border-ink-800 rounded-xl overflow-hidden metal-shadow">
          <div className="bg-ink-900 border-b border-ink-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileCheck className="w-8 h-8 text-signal-500" />
              <div>
                <h2 className="text-lg font-black text-white font-vazir">دفتر فروش و کارخانه نوآوران پنجره سپاهان</h2>
                <span className="text-sm text-steel-400 font-vazir">عضو رسمی اتحادیه صنایع آلومینیوم ایران</span>
              </div>
            </div>
            <span className="px-4 py-2 bg-ink-950 text-white text-sm font-mono font-bold rounded-lg border border-ink-800">
              شناسه ملی: {settingsData.nationalId}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-ink-800 text-right">
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">نام رسمی شرکت:</span>
              <span className="text-white font-black font-vazir block">{settingsData.companyName}</span>
            </div>
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">شماره ثبت رسمی:</span>
              <span className="text-white font-black font-mono block text-xl tracking-widest">{settingsData.registrationNumber}</span>
            </div>
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">کد پستی ثبتی:</span>
              <span className="text-white font-black font-mono block text-xl tracking-widest">{settingsData.postalCode}</span>
            </div>
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">تلفن کارخانه و دفتر:</span>
              <span className="text-white font-black font-mono inline-block text-xl tracking-widest text-right" dir="ltr">
                <bdi dir="ltr" style={{ unicodeBidi: 'isolate' }}>{settingsData.phone}</bdi>
              </span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 text-right">
          {/* Interactive Form Component */}
          <ContactFormClient />

          {/* Contact Details Section */}
          <div className="space-y-6">
            <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blood-900/20 via-ink-900 to-ink-950 border border-signal-500/20 rounded-xl p-6 md:p-8 space-y-6 metal-shadow">
              <ShieldCheck className="w-12 h-12 text-signal-500 mx-auto mb-4" />
              <h2 className="text-xl font-black text-white font-vazir text-center border-b border-ink-800 pb-4">
                راه‌های ارتباطی مستقیم
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ink-900 border border-ink-800 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-signal-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-vazir mb-1">تلفن کارخانه و دفتر فروش</h3>
                    <a href={`tel:${settingsData.phone.replace(/[^0-9]/g, '')}`} className="text-lg font-black text-signal-500 font-mono tracking-widest inline-block text-right" dir="ltr">
                      <bdi dir="ltr" style={{ unicodeBidi: 'isolate' }}>{settingsData.phone}</bdi>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ink-900 border border-ink-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-signal-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-vazir mb-1">آدرس کارخانه و دفتر مرکزی</h3>
                    <p className="text-sm text-steel-400 font-vazir leading-relaxed">
                      {settingsData.officialCompanyAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ink-900 border border-ink-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-signal-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-vazir mb-1">ساعات کاری مهندسی فروش</h3>
                    <p className="text-sm text-steel-400 font-vazir leading-relaxed">
                      {settingsData.workingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-[4/3] w-full bg-ink-900 rounded-xl border border-ink-800 overflow-hidden metal-shadow flex flex-col items-center justify-center text-steel-500">
              <MapPin className="w-10 h-10 mb-2 opacity-50" />
              <span className="font-vazir text-sm font-bold">نقشه مسیریابی کارخانه اصفهان</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
