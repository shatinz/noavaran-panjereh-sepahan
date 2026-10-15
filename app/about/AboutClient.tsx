"use client";

import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Building2, ShieldCheck, Factory, Award, FileCheck } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { CompanySettings } from '@/lib/db';

interface AboutClientProps {
  settings: CompanySettings;
}

export function AboutClient({ settings }: AboutClientProps) {
  const { dict, dir, isRTL } = useLanguage();

  return (
    <div dir={dir}>
      <Breadcrumbs items={[{ label: dict.nav.about }]} />
      <PageHero 
        title={dict.about.pageTitle} 
        subtitle={dict.about.pageSubtitle} 
      />

      <div className={`w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-12 ${isRTL ? 'text-right' : 'text-left'}`}>
        
        {/* Intro */}
        <section className="max-w-4xl text-center mx-auto space-y-6">
          <ShieldCheck className="w-12 h-12 text-signal-500 mx-auto" />
          <p className="text-base sm:text-lg text-steel-300 leading-relaxed sm:leading-8 font-vazir">
            {dict.about.intro}
          </p>
        </section>

        {/* Official Legal Registration */}
        <section className="bg-ink-950 border border-ink-800 rounded-xl overflow-hidden metal-shadow">
          <div className="bg-ink-900 border-b border-ink-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileCheck className="w-8 h-8 text-signal-500 shrink-0" />
              <div>
                <h2 className="text-lg font-black text-white font-vazir">{dict.about.legalBannerTitle}</h2>
                <span className="text-sm text-steel-400 font-vazir">{dict.about.legalMember}</span>
              </div>
            </div>
            <span className="px-4 py-2 bg-ink-950 text-white text-sm font-mono font-bold rounded-lg border border-ink-800">
              {dict.about.nationalIdLabel}: {settings.nationalId || '14015026230'}
            </span>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-ink-800 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">{dict.about.companyNameLabel}:</span>
              <span className="text-white font-black font-vazir block text-sm sm:text-base">{dict.nav.brandName}</span>
            </div>
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">{dict.about.regNumberLabel}:</span>
              <span className="text-white font-black font-mono block text-xl tracking-widest">{settings.registrationNumber || '3892'}</span>
            </div>
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">{dict.about.postalCodeLabel}:</span>
              <span className="text-white font-black font-mono block text-xl tracking-widest">{settings.postalCode || '8431811565'}</span>
            </div>
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">{dict.about.phoneLabel}:</span>
              <span className="text-white font-black font-mono inline-block text-xl tracking-widest" dir="ltr">
                <bdi dir="ltr" style={{ unicodeBidi: 'isolate' }}>{settings.phone}</bdi>
              </span>
            </div>
          </div>
        </section>

        {/* Industrial Capabilities */}
        <section className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="bg-ink-950 border border-ink-800 rounded-xl p-6 md:p-8 space-y-4 metal-shadow hover:border-signal-500/30 transition-colors">
            <Factory className="w-10 h-10 text-signal-500" />
            <h3 className="text-lg font-black text-white font-vazir">{dict.about.factoryTitle}</h3>
            <p className="text-sm text-steel-400 leading-relaxed font-vazir">
              {dict.about.factoryDesc}
            </p>
          </div>

          <div className="bg-ink-950 border border-ink-800 rounded-xl p-6 md:p-8 space-y-4 metal-shadow hover:border-signal-500/30 transition-colors">
            <Building2 className="w-10 h-10 text-signal-500" />
            <h3 className="text-lg font-black text-white font-vazir">{dict.about.engDeptTitle}</h3>
            <p className="text-sm text-steel-400 leading-relaxed font-vazir">
              {dict.about.engDeptDesc}
            </p>
          </div>

          <div className="bg-ink-950 border border-ink-800 rounded-xl p-6 md:p-8 space-y-4 metal-shadow hover:border-signal-500/30 transition-colors">
            <Award className="w-10 h-10 text-signal-500" />
            <h3 className="text-lg font-black text-white font-vazir">{dict.about.qcTitle}</h3>
            <p className="text-sm text-steel-400 leading-relaxed font-vazir">
              {dict.about.qcDesc}
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className={`bg-ink-900 border border-ink-800 rounded-xl p-8 md:p-12 metal-shadow ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className={`text-2xl font-black text-white font-vazir ${isRTL ? 'border-r-4 pr-4' : 'border-l-4 pl-4'} border-signal-500 mb-10`}>
            {dict.about.timelineTitle}
          </h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-ink-800 before:to-transparent">
            {dict.about.timeline.map((item, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-ink-900 bg-signal-500 text-white font-bold font-mono text-xs shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(171,0,23,0.5)] relative z-10">
                  {item.year}
                </div>
                <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-ink-950 p-5 rounded-xl border border-ink-800 shadow-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h4 className="text-lg font-bold text-white font-vazir mb-2">{item.title}</h4>
                  <p className="text-sm text-steel-400 font-vazir leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
