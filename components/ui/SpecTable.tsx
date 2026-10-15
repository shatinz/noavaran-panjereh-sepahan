"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n/context';

export function SpecTable({ specs }: { specs: Record<string, string | number> }) {
  const { locale, dir, isRTL } = useLanguage();

  if (!specs || Object.keys(specs).length === 0) return null;

  return (
    <div className={`w-full border border-ink-800 rounded-xl overflow-hidden metal-shadow ${isRTL ? 'text-right' : 'text-left'}`} dir={dir}>
      <div className="bg-ink-900 border-b border-ink-800 px-4 py-3 font-bold text-white font-vazir">
        {locale === 'en' ? 'Technical Specifications' : (locale === 'ar' ? 'المواصفات الفنية للنظام' : 'مشخصات فنی سیستم')}
      </div>
      <div className="divide-y divide-ink-800">
        {Object.entries(specs).map(([key, value], idx) => {
          if (!value && value !== 0) return null;
          
          let displayKey = key;
          if (locale === 'en') {
            if (key === 'عرض مقطع فریم' || key === 'frameWidth') displayKey = 'Frame Width';
            if (key === 'عرض لنگه' || key === 'sashWidth') displayKey = 'Sash Width';
            if (key === 'ضخامت شیشه' || key === 'glassThickness') displayKey = 'Glass Thickness';
            if (key === 'پلی‌آمید' || key === 'polyamide') displayKey = 'Polyamide Strip';
            if (key === 'عایق حرارتی' || key === 'thermalInsulation') displayKey = 'Thermal Insulation';
            if (key === 'عایق صوتی' || key === 'soundInsulation') displayKey = 'Acoustic Rating';
            if (key === 'طول عمر پروفیل') displayKey = 'Profile Lifespan';
          } else if (locale === 'ar') {
            if (key === 'عرض مقطع فریم' || key === 'frameWidth') displayKey = 'عرض مقطع الإطار';
            if (key === 'عرض لنگه' || key === 'sashWidth') displayKey = 'عرض مقطع الضلفة';
            if (key === 'ضخامت شیشه' || key === 'glassThickness') displayKey = 'سماكة الزجاج';
            if (key === 'پلی‌آمید' || key === 'polyamide') displayKey = 'شريط البولياميد';
            if (key === 'عایق حرارتی' || key === 'thermalInsulation') displayKey = 'العزل الحراري';
            if (key === 'عایق صوتی' || key === 'soundInsulation') displayKey = 'العزل الصوتي';
            if (key === 'طول عمر پروفیل') displayKey = 'العمر الافتراضي';
          }
          
          return (
            <div key={idx} className="flex items-center justify-between p-4 hover:bg-ink-900/50 transition-colors">
              <span className="text-steel-400 text-sm font-vazir">{displayKey}</span>
              <span className="text-white font-medium text-sm font-sans" dir="auto">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
