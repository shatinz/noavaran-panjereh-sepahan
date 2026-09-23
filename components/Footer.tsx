import React from 'react';
import Link from 'next/link';
import { Building2, Phone, MapPin, Mail, Clock, Shield, ArrowUpLeft, Instagram, Send } from 'lucide-react';
import { getSettings } from '@/lib/db';

export default async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="bg-charcoal-950 border-t border-charcoal-800 text-titanium-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-bronze-500 flex items-center justify-center text-charcoal-950 font-bold shadow-md shadow-bronze-500/20">
                <Building2 className="w-5 h-5 text-charcoal-950" />
              </div>
              <span className="text-xl font-bold text-white">
                نوآوران پنجره <span className="text-bronze-400">سپاهان</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-titanium-400 text-justify">
              تولیدکننده صنعتی و مجری تخصصی نماهای مدرن شیشه‌ای (کرتین‌وال و فریم‌لس)، درب و پنجره‌های اختصاصی دوجداره ترمال‌بریک، پنل‌های کامپوزیت آلومینیوم و ترموود با تکیه بر کارخانه مجهز ۱۵۰۰ متری و ماشین‌آلات مدرن اروپایی.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-charcoal-850 hover:bg-bronze-500/20 hover:text-bronze-400 border border-charcoal-700 flex items-center justify-center transition-colors"
                title="اینستاگرام نوآوران پنجره"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks.telegram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-charcoal-850 hover:bg-bronze-500/20 hover:text-bronze-400 border border-charcoal-700 flex items-center justify-center transition-colors"
                title="تلگرام مهندسی نوآوران پنجره"
              >
                <Send className="w-4 h-4" />
              </a>
              <Link
                href="/admin"
                className="w-9 h-9 rounded-lg bg-charcoal-850 hover:bg-bronze-500/20 hover:text-bronze-400 border border-charcoal-700 flex items-center justify-center transition-colors"
                title="پنل مدیریت"
              >
                <Shield className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Col 2: Services Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-r-2 border-bronze-500 pr-2">
              سیستم‌های اجرایی و محصولات
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services/curtain-wall-lamella" className="hover:text-bronze-400 flex items-center justify-between transition-colors">
                  <span>نمای کرتین وال (لامل)</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/services/frameless-facade" className="hover:text-bronze-400 flex items-center justify-between transition-colors">
                  <span>نمای شیشه‌ای فریم‌لس</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/services/aluminum-windows-doors" className="hover:text-bronze-400 flex items-center justify-between transition-colors">
                  <span>پنجره ترمال‌بریک و لیفت اند اسلاید</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/services/composite-facade" className="hover:text-bronze-400 flex items-center justify-between transition-colors">
                  <span>نمای کامپوزیت آلومینیوم (ACP)</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/services/thermowood-facade" className="hover:text-bronze-400 flex items-center justify-between transition-colors">
                  <span>نمای چوب طبیعی ترموود</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/services/steel-glass-railings" className="hover:text-bronze-400 flex items-center justify-between transition-colors">
                  <span>حفاظ استیل و هندریل شیشه‌ای</span>
                  <ArrowUpLeft className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-r-2 border-bronze-500 pr-2">
              بخش‌های پرتال و منابع
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/projects" className="hover:text-bronze-400 transition-colors block">
                  آرشیو ۵۰+ پروژه اجرایی شاخص
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-bronze-400 transition-colors block text-bronze-300 font-semibold">
                  کتابخانه ویدیوهای آموزشی (آپارات و یوتیوب)
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-bronze-400 transition-colors block">
                  محاسبه‌گر آنلاین متراژ و پیش‌فاکتور
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-bronze-400 transition-colors block">
                  دانشنامه فنی و استانداردهای ساختمانی
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-bronze-400 transition-colors block">
                  تاریخچه و ظرفیت کارخانه ۱۵۰۰ متری
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-bronze-400 transition-colors block">
                  دفترچه تماس و ارتباط با مهندسین محاسب
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Factory Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-r-2 border-bronze-500 pr-2">
              دفتر مرکزی و خطوط ارتباط
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-bronze-400 shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${settings.phone}`} className="font-mono text-sm font-bold text-white hover:text-bronze-400 block">
                    {settings.phoneLabel}
                  </a>
                  <span className="text-[11px] text-titanium-400 block font-mono mt-0.5">
                    مستقیم: {settings.directPhones.join(' | ')}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-bronze-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed text-titanium-300">
                  {settings.officeAddress}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-bronze-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed text-titanium-400">
                  <strong className="text-titanium-200">کارخانه:</strong> {settings.factoryAddress}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-bronze-400 shrink-0" />
                <span className="text-[11px] text-titanium-400">
                  {settings.workingHours}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-charcoal-850 flex flex-col sm:flex-row items-center justify-between text-xs text-titanium-500 gap-4">
          <p>© {new Date().getFullYear()} کلیه حقوق برای شرکت نوآوران پنجره سپاهان محفوظ است.</p>
          <p className="font-mono text-[11px] text-titanium-600">
            Noavaran Panjereh Sepahan · Precision Architectural Engineering
          </p>
        </div>
      </div>
    </footer>
  );
}
