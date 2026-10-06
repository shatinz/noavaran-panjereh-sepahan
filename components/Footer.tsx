import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import settingsData from "../data/settings.json";
import { withBasePath } from "@/lib/media";

import { MetallicForgeLogo } from "./MetallicForgeLogo";

export function Footer() {
  const { officeAddress, factoryPhones, email, socialLinks, registrationNumber } = settingsData;

  return (
    <footer className="bg-ink-950 pt-16 border-t border-ink-800 relative overflow-hidden" dir="rtl">
      {/* Background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blood-900/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-16">
          {/* Brand - Metallic Forge Logo & Socials */}
          <div className="lg:col-span-3 flex flex-col items-center sm:items-start justify-center space-y-6">
            {/* The Logo (Organic fade to existing background, no rectangle box) */}
            <div className="relative flex items-center justify-center">
              <MetallicForgeLogo size={185} href="/logo-motion" />
            </div>

            {/* Social Media Channels directly under the logo */}
            <div className="flex items-center gap-3.5 pt-1">
              {/* WhatsApp */}
              <a 
                href={socialLinks.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 rounded-full bg-ink-900 border border-ink-800 flex items-center justify-center text-white hover:bg-[#25D366] hover:border-[#25D366] hover:scale-110 transition-all metal-shadow" 
                title="واتساپ نوآوران پنجره سپاهان"
                aria-label="واتساپ"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>

              {/* Eitaa */}
              <a 
                href={(socialLinks as any).eitaa || "https://eitaa.com/noavaranpanjereh"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 rounded-full bg-ink-900 border border-ink-800 flex items-center justify-center text-white hover:bg-[#E8501E] hover:border-[#E8501E] hover:scale-110 transition-all metal-shadow" 
                title="پیام‌رسان ایتا (Eitaa)"
                aria-label="ایتا"
              >
                <svg className="w-5 h-5 fill-current" viewBox="5.312 -.192 501.099 512.323" aria-hidden="true">
                  <path d="m127.317 510.763a141.312 141.312 0 0 1 -49.749-17.707c-34.56-19.819-60.352-55.317-68.629-94.421-3.221-15.296-3.627-34.624-3.2-153.749.405-128.193.106-121.579 6.208-142.699 3.029-10.517 11.456-28.587 17.557-37.696 22.507-33.494 55.616-54.998 96.64-62.784 8.192-1.557 20.053-1.707 129.195-1.707 133.355 0 128.96-.192 150.741 6.699a145.216 145.216 0 0 1 92.032 89.259c7.04 19.989 7.381 23.189 7.872 75.84l.427 47.573-8.341 5.717c-11.904 8.128-27.52 22.613-49.408 45.867-25.216 26.795-50.688 51.627-63.616 62.016-27.925 22.421-53.504 35.221-79.488 39.765-13.525 2.347-35.883 1.429-49.109-2.027-11.797-3.072-11.029-3.584-15.488 9.899a135.573 135.573 0 0 0 -6.784 32.981l-.661 8.683-3.115-.64c-25.92-5.141-51.605-27.413-61.525-53.333a76.437 76.437 0 0 1 -5.547-26.005l-.341-7.253-6.592-6.059c-13.739-12.587-22.677-27.989-25.493-43.968-4.523-25.451 7.253-54.229 32.811-80.128 26.965-27.371 66.709-48.853 105.664-57.173 14.037-2.987 38.784-3.776 51.264-1.6 24.277 4.224 44.096 16.491 56.427 34.965 3.883 5.781 4.16 6.613 3.776 11.84a17.323 17.323 0 0 1 -3.904 10.517c-9.92 13.888-39.424 28.757-71.168 35.84-56 12.48-91.605-3.029-86.037-37.525.555-3.477.853-6.485.661-6.677-.683-.683-6.251 2.219-12.267 6.4-10.219 7.125-19.264 20.992-22.4 34.283-.768 3.328-1.067 8.661-.725 13.867.427 7.061 1.131 9.685 4.096 15.701 1.963 3.968 5.867 9.6 8.704 12.565l5.12 5.355-2.048 2.603a103.36 103.36 0 0 0 -14.443 25.963 77.547 77.547 0 0 0 -2.24 38.72c2.197 9.835 8.981 23.36 15.765 31.317 5.163 6.08 17.003 16.299 18.901 16.299.512 0 .939-1.024.939-2.261.021-4.907 3.925-20.757 6.955-28.309 9.024-22.571 28.821-41.813 60.16-58.453 5.227-2.773 20.309-10.027 33.536-16.149 29.013-13.44 44.864-21.653 53.568-27.84 25.088-17.771 40.597-44.053 45.653-77.333 1.835-12.16 1.835-34.859 0-47.083-7.851-52.011-46.827-87.381-102.784-93.227-62.4-6.549-141.824 41.664-190.763 115.776-23.808 36.053-39.893 76.053-46.656 116.117-2.624 15.531-3.605 44.373-1.984 58.667 4.117 36.352 17.536 65.664 40.597 88.661a139.328 139.328 0 0 0 39.893 28.011c50.517 24.107 106.453 24.64 155.627 1.515 21.248-10.005 42.112-25.515 64.491-48 21.76-21.867 36.48-40.107 76.629-95.104 22.187-30.357 39.765-50.517 48.469-55.573l3.2-1.835-.405 65.941c-.384 63.851-.469 66.283-2.624 75.968-12.8 57.131-54.187 98.901-110.827 111.829l-9.984 2.283-123.2.213c-100.992.171-124.8-.043-132.053-1.195z" />
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 rounded-full bg-ink-900 border border-ink-800 flex items-center justify-center text-white hover:bg-[#E1306C] hover:border-[#E1306C] hover:scale-110 transition-all metal-shadow" 
                title="اینستاگرام نوآوران پنجره سپاهان"
                aria-label="اینستاگرام"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links (Fast Access) */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-white font-black text-lg font-vazir relative inline-block">
              دسترسی سریع
              <div className="absolute -bottom-2 right-0 h-0.5 bg-signal-500 w-8" />
            </h3>
            <ul className="space-y-3.5 text-steel-300 text-sm font-vazir">
              <li><Link href="/services" className="hover:text-white transition-colors">خدمات و راهکارها</Link></li>
              <li><Link href="/materials" className="hover:text-white transition-colors">محصولات و سیستم‌ها</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">پروژه‌های اجرایی</Link></li>
              <li><Link href="/articles" className="hover:text-white transition-colors">مقالات و دانشنامه</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-6">
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
                <a href="mailto:info@noavaranpanjereh.com" className="hover:text-white transition-colors font-sans" dir="ltr">
                  info@noavaranpanjereh.com
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
          <div className="lg:col-span-3 space-y-6">
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
          <div className="flex items-center gap-3 flex-wrap justify-center font-sans">
            <span>© {new Date().getFullYear()} کلیه حقوق محفوظ است.</span>
            <span className="w-1 h-1 bg-ink-950 rounded-full" />
            <span>
              Powered by{' '}
              <a 
                href="https://github.com/shatinz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-bold underline hover:text-signal-600 transition-colors"
              >
                OO
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
