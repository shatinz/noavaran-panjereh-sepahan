import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import settingsData from "../data/settings.json";
import { withBasePath } from "@/lib/media";

export function Footer() {
  const { officeAddress, factoryPhones, email, socialLinks, registrationNumber } = settingsData;

  return (
    <footer className="bg-ink-950 pt-16 border-t border-ink-800 relative overflow-hidden" dir="rtl">
      {/* Background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blood-900/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image src={withBasePath("/images/logo-white.svg")} alt="نوآوران پنجره سپاهان" width={60} height={60} />
              <div className="flex flex-col text-white">
                <span className="text-lg font-black font-vazir tracking-tight">نوآوران پنجره سپاهان</span>
                <span className="text-xs text-steel-400 font-sans tracking-widest uppercase">Noavaran Panjereh</span>
              </div>
            </Link>
            <p className="text-steel-300 text-sm leading-relaxed font-vazir text-justify">
              طراحی محاسباتی، تولید صنعتی و اجرای نماهای مدرن شیشه‌ای، درب و پنجره‌های اختصاصی دوجداره و ترمال‌بریک با بهره‌گیری از تکنولوژی روز.
            </p>
            <div className="flex items-center gap-4">
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-ink-900 flex items-center justify-center text-white hover:bg-signal-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              {/* WhatsApp icon */}
              <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-ink-900 flex items-center justify-center text-white hover:bg-signal-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white font-black text-lg font-vazir relative inline-block">
              دسترسی سریع
              <div className="absolute -bottom-2 right-0 h-0.5 bg-signal-500 w-8" />
            </h3>
            <ul className="space-y-3 text-steel-300 text-sm font-vazir">
              <li><Link href="/services" className="hover:text-white transition-colors">خدمات و راهکارها</Link></li>
              <li><Link href="/materials" className="hover:text-white transition-colors">محصولات و سیستم‌ها</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">پروژه‌های اجرایی</Link></li>
              <li><Link href="/calculator" className="hover:text-white transition-colors">ماشین‌حساب متراژ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-white font-black text-lg font-vazir relative inline-block">
              اطلاعات تماس
              <div className="absolute -bottom-2 right-0 h-0.5 bg-signal-500 w-8" />
            </h3>
            <ul className="space-y-4 text-steel-300 text-sm font-vazir">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-signal-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{settingsData.factoryAddress}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-signal-500 shrink-0" />
                <a href={`tel:${factoryPhones[0].replace(/\D/g,'')}`} className="hover:text-white transition-colors font-sans">
                  <bdi dir="ltr" style={{ unicodeBidi: 'isolate' }}>{factoryPhones[0]}</bdi>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-signal-500 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors font-sans" dir="ltr">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3 pt-2 border-t border-ink-800">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-white">ساعات کاری:</span>
                  <span className="text-xs leading-relaxed opacity-80">{settingsData.workingHours}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-6">
            <h3 className="text-white font-black text-lg font-vazir relative inline-block">
              مشاوره رایگان
              <div className="absolute -bottom-2 right-0 h-0.5 bg-signal-500 w-8" />
            </h3>
            <p className="text-steel-300 text-sm leading-relaxed font-vazir">
              برای دریافت مشاوره تخصصی و استعلام قیمت با کارشناسان ما در ارتباط باشید.
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center font-bold px-6 py-3 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500 font-vazir bg-signal-500 hover:bg-signal-400 text-white w-full">
              ثبت درخواست
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Strip - Steel */}
      <div className="bg-metal-brushed border-t border-steel-300 py-4">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-ink-950 font-vazir text-xs font-bold">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span>شماره ثبت: <span className="font-sans ml-1">{registrationNumber}</span></span>
            <span className="w-1 h-1 bg-ink-950 rounded-full" />
            <span>سهامی خاص</span>
            <span className="w-1 h-1 bg-ink-950 rounded-full" />
            <span className="font-sans" dir="ltr">www.NoavaranPanjereh.com</span>
          </div>
          <div>
            © {new Date().getFullYear()} کلیه حقوق محفوظ است.
          </div>
        </div>
      </div>
    </footer>
  );
}
