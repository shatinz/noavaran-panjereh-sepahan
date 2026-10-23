"use client";

import React from 'react';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Gallery } from '@/components/ui/Gallery';
import { MapPin, Layers, ShieldCheck, Phone, MessageSquare, Calendar, Building2, HardHat } from 'lucide-react';
import { telHref } from '@/lib/phone';
import { useLanguage } from '@/lib/i18n/context';
import { getLocalizedProject } from '@/lib/i18n/entities';
import { ProjectItem, CompanySettings } from '@/lib/db';

interface ProjectDetailClientProps {
  project: ProjectItem;
  settings: CompanySettings;
  galleryImages: string[];
}

export function ProjectDetailClient({ project, settings, galleryImages }: ProjectDetailClientProps) {
  const { dict, locale, dir, isRTL } = useLanguage();
  const loc = getLocalizedProject(project, locale);

  return (
    <div dir={dir}>
      <Breadcrumbs items={[
        { label: dict.nav.projects, href: '/projects' },
        { label: loc.title }
      ]} />
      
      <PageHero 
        title={loc.title}
        subtitle={loc.category}
        bgImage={project.image}
      />

      <div className={`w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-12 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-8">
              <h2 className={`text-2xl font-black text-white font-vazir ${isRTL ? 'border-r-4 pr-4' : 'border-l-4 pl-4'} border-signal-500`}>
                {locale === 'en' ? 'Project Photo Gallery' : (locale === 'ar' ? 'معرض صور المشروع' : 'گالری تصاویر پروژه')}
              </h2>
              <Gallery images={galleryImages} title={loc.title} />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className={`bg-ink-950 border border-ink-800 rounded-xl p-6 md:p-8 space-y-6 metal-shadow ${isRTL ? 'text-right' : 'text-left'}`}>
              <h3 className="text-xl font-black text-white font-vazir border-b border-ink-800 pb-4">
                {locale === 'en' ? 'Project Specifications' : (locale === 'ar' ? 'مواصفات المشروع' : 'مشخصات پروژه')}
              </h3>
              
              <div className="space-y-4 text-sm text-steel-300 font-vazir">
                {loc.year && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-signal-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white mb-1">
                        {locale === 'en' ? 'Year of Execution' : (locale === 'ar' ? 'سنة التنفيذ' : 'سال اجرا')}
                      </strong>
                      <span className="font-mono">
                        <bdi dir="ltr">{loc.year}</bdi>
                      </span>
                    </div>
                  </div>
                )}

                {loc.employer && (
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-signal-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white mb-1">
                        {locale === 'en' ? 'Client / Employer' : (locale === 'ar' ? 'صاحب العمل / العميل' : 'کارفرما')}
                      </strong>
                      <span>{loc.employer}</span>
                    </div>
                  </div>
                )}

                {loc.executor && (
                  <div className="flex items-start gap-3">
                    <HardHat className="w-5 h-5 text-signal-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white mb-1">
                        {locale === 'en' ? 'Contractor / Executor' : (locale === 'ar' ? 'الجهة المنفذة' : 'مجری پروژه')}
                      </strong>
                      <span>{loc.executor}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-signal-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white mb-1">
                      {locale === 'en' ? 'Location' : (locale === 'ar' ? 'الموقع' : 'موقعیت')}
                    </strong>
                    <span>{loc.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Layers className="w-5 h-5 text-signal-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white mb-1">
                      {locale === 'en' ? 'Executed Systems' : (locale === 'ar' ? 'الأنظمة المنفذة' : 'سیستم‌های اجرا شده')}
                    </strong>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {loc.systemsUsed?.map((sys, idx) => (
                        <span key={idx} className="px-2 py-1 bg-ink-900 border border-ink-800 rounded text-xs">
                          {sys}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blood-900/20 via-ink-900 to-ink-950 border border-signal-500/20 rounded-xl p-6 md:p-8 space-y-6 text-center metal-shadow">
              <ShieldCheck className="w-12 h-12 text-signal-500 mx-auto" />
              <div className="space-y-2">
                <h4 className="text-xl font-black text-white font-vazir">
                  {locale === 'en' ? 'Inquire for Similar Projects' : (locale === 'ar' ? 'تنفيذ مشاريع مماثلة' : 'اجرای پروژه‌های مشابه')}
                </h4>
                <p className="text-sm text-steel-300 leading-relaxed font-vazir">
                  {dict.footer.consultationDesc}
                </p>
              </div>
              
              <div className="space-y-3 pt-2">
                <a href={`tel:${telHref(settings.phone)}`} className="flex items-center justify-center gap-2 w-full py-3 bg-signal-500 hover:bg-signal-400 text-white font-bold rounded-lg transition-colors font-sans" dir="ltr">
                  <Phone className="w-5 h-5" />
                  <bdi dir="ltr" style={{ unicodeBidi: 'isolate' }}>{settings.phone}</bdi>
                </a>
                <Link href="/contact" className="flex items-center justify-center gap-2 w-full py-3 bg-ink-950 hover:bg-ink-800 text-white font-bold rounded-lg border border-ink-800 transition-colors font-vazir">
                  <MessageSquare className={`w-5 h-5 text-signal-500 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                  <span>{dict.ctaBand.btnConsultation}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
