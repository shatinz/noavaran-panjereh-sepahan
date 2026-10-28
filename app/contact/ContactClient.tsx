"use client";

import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactFormClient } from '@/components/contact/ContactFormClient';
import { ContactMap } from '@/components/contact/ContactMap';
import { MapPin, Phone, Clock, ShieldCheck, FileCheck } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { CompanySettings } from '@/lib/db';

interface ContactClientProps {
  settingsData: CompanySettings;
}

export function ContactClient({ settingsData }: ContactClientProps) {
  const { dict, dir, isRTL } = useLanguage();

  return (
    <div dir={dir}>
      <Breadcrumbs items={[{ label: dict.nav.contact }]} />
      <PageHero 
        title={dict.contact.pageTitle} 
        subtitle={dict.contact.pageSubtitle} 
      />

      <div className={`w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-12 ${isRTL ? 'text-right' : 'text-left'}`}>
        
        {/* Official Legal Registration Banner */}
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
              {dict.about.nationalIdLabel}: {settingsData.nationalId || '14015026230'}
            </span>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-ink-800 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">{dict.about.companyNameLabel}:</span>
              <span className="text-white font-black font-vazir block">{dict.nav.brandName}</span>
            </div>
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">{dict.about.regNumberLabel}:</span>
              <span className="text-white font-black font-mono block text-xl tracking-widest">{settingsData.registrationNumber || '3892'}</span>
            </div>
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">{dict.about.postalCodeLabel}:</span>
              <span className="text-white font-black font-mono block text-xl tracking-widest">{settingsData.postalCode || '8431811565'}</span>
            </div>
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">{dict.about.phoneLabel}:</span>
              <span className="text-white font-black font-mono inline-block text-xl tracking-widest" dir="ltr">
                <bdi dir="ltr" style={{ unicodeBidi: 'isolate' }}>{settingsData.phone}</bdi>
              </span>
            </div>
          </div>
        </section>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Interactive Form Component */}
          <ContactFormClient />

          {/* Contact Details Section */}
          <div className="space-y-6">
            <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blood-900/20 via-ink-900 to-ink-950 border border-signal-500/20 rounded-xl p-6 md:p-8 space-y-6 metal-shadow">
              <ShieldCheck className="w-12 h-12 text-signal-500 mx-auto mb-4" />
              <h2 className="text-xl font-black text-white font-vazir text-center border-b border-ink-800 pb-4">
                {dict.contact.directContacts}
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ink-900 border border-ink-800 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-signal-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-vazir mb-1">
                      {dict.contact.phoneBranchLabel}
                    </h3>
                    <a href={`tel:${settingsData.phone.replace(/[^0-9]/g, '')}`} className="text-lg font-black text-signal-500 font-mono tracking-widest inline-block" dir="ltr">
                      <bdi dir="ltr" style={{ unicodeBidi: 'isolate' }}>{settingsData.phone}</bdi>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ink-900 border border-ink-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-signal-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-vazir mb-1">
                      {dict.contact.centralOfficeAddressLabel}
                    </h3>
                    <p className="text-sm text-steel-400 font-vazir leading-relaxed">
                      {dict.contact.mapAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ink-900 border border-ink-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-signal-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-vazir mb-1">
                      {dict.contact.workingHoursLabel}
                    </h3>
                    <p className="text-sm text-steel-400 font-vazir leading-relaxed">
                      {dict.footer.workingHoursVal}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Factory Location & Navigation Map */}
            <ContactMap
              address={settingsData.officialCompanyAddress || settingsData.factoryAddress}
              lat={settingsData.location?.lat ?? settingsData.lat ?? 32.713257}
              lng={settingsData.location?.lng ?? settingsData.lng ?? 51.574965}
              neshanUrl={settingsData.location?.neshanUrl ?? settingsData.neshanUrl}
              baladUrl={settingsData.location?.baladUrl ?? settingsData.baladUrl}
              googleMapsUrl={settingsData.location?.googleMapsUrl ?? settingsData.googleMapsUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
