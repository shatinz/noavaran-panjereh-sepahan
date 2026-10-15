"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { formatSpecValue } from '@/lib/i18n/entities';

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
            else if (key === 'عرض لنگه' || key === 'sashWidth') displayKey = 'Sash Width';
            else if (key === 'ضخامت دیواره' || key === 'wallThickness') displayKey = 'Wall Thickness';
            else if (key === 'پلی‌آمید' || key === 'polyamideSize' || key === 'polyamide') displayKey = 'Polyamide Strip';
            else if (key === 'ضخامت شیشه' || key === 'glassThickness') displayKey = 'Glass Thickness';
            else if (key === 'عایق حرارتی Uf' || key === 'thermalUf' || key === 'عایق حرارتی') displayKey = 'Thermal Insulation (Uf)';
            else if (key === 'نمای ظاهری' || key === 'appearance') displayKey = 'Profile Appearance';
            else if (key === 'اتصال گوشه' || key === 'cornerFixture') displayKey = 'Corner Fixture';
            else if (key === 'هوابندی و آب‌بندی' || key === 'gaskets') displayKey = 'Weatherseals & Gaskets';
            else if (key === 'یراق‌آلات' || key === 'hardware') displayKey = 'Hardware Compatibility';
            else if (key === 'انواع بازشو' || key === 'openings') displayKey = 'Opening Variants';
            else if (key === 'آلیاژ آلومینیوم') displayKey = 'Aluminium Alloy';
            else if (key === 'ضخامت عایق حرارتی') displayKey = 'Thermal Insulation Thickness';
            else if (key === 'ضریب نفوذ باد') displayKey = 'Air Permeability';
            else if (key === 'ضریب هوابندی و آب‌بندی') displayKey = 'Water Tightness';
            else if (key === 'آلیاژ استیل') displayKey = 'Stainless Steel Alloy';
            else if (key === 'شیشه ایمنی') displayKey = 'Safety Glass';
            else if (key === 'ارتفاع استاندارد') displayKey = 'Standard Height';
            else if (key === 'نوع شیشه') displayKey = 'Glass Type';
            else if (key === 'پروفیل هدایت‌کننده') displayKey = 'Guide Profile';
            else if (key === 'بلبرینگ و اتصالات') displayKey = 'Bearings & Fittings';
            else if (key === 'ایزولاسیون') displayKey = 'Sealing & Insulation';
            else if (key === 'چسب ساختاری') displayKey = 'Structural Adhesive';
            else if (key === 'گارانتی آب‌بندی') displayKey = 'Sealing Warranty';
            else if (key === 'ضخامت لایه آلومینیوم') displayKey = 'Aluminium Skin Thickness';
            else if (key === 'ضخامت کل ورق') displayKey = 'Total Panel Thickness';
            else if (key === 'کلاس ضدحریق') displayKey = 'Fire Retardant Class';
          } else if (locale === 'ar') {
            if (key === 'عرض مقطع فریم' || key === 'frameWidth') displayKey = 'عرض مقطع الإطار';
            else if (key === 'عرض لنگه' || key === 'sashWidth') displayKey = 'عرض مقطع الضلفة';
            else if (key === 'ضخامت دیواره' || key === 'wallThickness') displayKey = 'سماكة الجدار';
            else if (key === 'پلی‌آمید' || key === 'polyamideSize' || key === 'polyamide') displayKey = 'شريط البولياميد';
            else if (key === 'ضخامت شیشه' || key === 'glassThickness') displayKey = 'سماكة الزجاج';
            else if (key === 'عایق حرارتی Uf' || key === 'thermalUf' || key === 'عایق حرارتی') displayKey = 'العزل الحراري (Uf)';
            else if (key === 'نمای ظاهری' || key === 'appearance') displayKey = 'المظهر الخارجي';
            else if (key === 'اتصال گوشه' || key === 'cornerFixture') displayKey = 'تثبيت الزوايا';
            else if (key === 'هوابندی و آب‌بندی' || key === 'gaskets') displayKey = 'عوازل التسريب';
            else if (key === 'یراق‌آلات' || key === 'hardware') displayKey = 'توافق الإكسسوارات';
            else if (key === 'انواع بازشو' || key === 'openings') displayKey = 'أنواع الفتحات';
          }

          const formattedValue = formatSpecValue(value, locale);

          return (
            <div key={idx} className="flex items-center justify-between p-4 hover:bg-ink-900/50 transition-colors">
              <span className="text-steel-400 text-sm font-vazir">{displayKey}</span>
              <span className="text-white font-medium text-sm font-sans" dir="auto">{formattedValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
