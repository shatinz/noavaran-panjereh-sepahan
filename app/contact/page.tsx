'use client';

import React, { useState } from 'react';
import { Phone, MapPin, Building2, Clock, Mail, MessageSquare, Send, CheckCircle2, Factory, FileCheck, Shield, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectType: 'پنجره ترمال بریک TH 68 / TH 60',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 py-4 space-y-5">
      {/* Header */}
      <section className="aluminum-card sharp frame-shadow p-6 sm:p-10 border border-[#b0b3b0] text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18191a] text-white text-[11px] font-bold sharp border border-black shadow-sm">
          <ShieldCheck className="w-4 h-4 text-[#cbcccb]" />
          <span>هویت رسمی ثبتی و خطوط ارتباط مستقیم</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight leading-tight">
          ارتباط با شرکت نوآوران پنجره سپاهان
        </h1>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#333] leading-relaxed font-medium">
          کارشناسان فنی و مهندسین محاسب نما در تمامی ساعات اداری آماده پاسخگویی به سوالات، بررسی نقشه‌ها و صدور پیش‌فاکتور هستند.
        </p>
      </section>

      {/* Official Legal Registration Banner */}
      <div className="aluminum-card sharp frame-shadow p-5 sm:p-6 border border-[#b0b3b0] space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-[#a8aba8] pb-3 text-right">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sharp bg-[#18191a] text-white flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5 text-[#cbcccb]" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-black text-black">مشخصات ثبتی و حقوقی شرکت نوآوران پنجره سپاهان</h2>
              <span className="text-[11px] text-[#444] font-medium">دارای پروانه بهره‌برداری صنعتی و عضو رسمی سندیکای آلومینیوم ایران</span>
            </div>
          </div>
          <span className="px-3 py-1 sharp bg-black text-white text-xs font-mono font-bold">
            ثبت شده رسمی و معتبر
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono text-right">
          <div className="bg-[#b8bab8] p-3 sharp border border-[#9ea19e]">
            <span className="text-[#444] font-sans block text-[10px] font-bold">شناسه ملی:</span>
            <span className="text-base font-black text-black mt-0.5 block">۱۴۰۱۵۰۲۶۲۳۰</span>
          </div>
          <div className="bg-[#b8bab8] p-3 sharp border border-[#9ea19e]">
            <span className="text-[#444] font-sans block text-[10px] font-bold">شماره ثبت رسمی:</span>
            <span className="text-base font-black text-black mt-0.5 block">۳۸۹۲</span>
          </div>
          <div className="bg-[#b8bab8] p-3 sharp border border-[#9ea19e]">
            <span className="text-[#444] font-sans block text-[10px] font-bold">کد پستی ثبتی:</span>
            <span className="text-base font-black text-black mt-0.5 block">۸۴۳۶۱۸۵۵۰۳</span>
          </div>
          <div className="bg-[#b8bab8] p-3 sharp border border-[#9ea19e]">
            <span className="text-[#444] font-sans block text-[10px] font-bold">تلفن کارخانه و ثبت:</span>
            <span className="text-base font-black text-black mt-0.5 block">۰۳۱-۳۳۶۸۷۷۵۵</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Col: Contact Form */}
        <div className="aluminum-card sharp frame-shadow p-6 sm:p-8 border border-[#b0b3b0] space-y-4 text-right">
          <h2 className="text-sm font-black text-black border-r-2 border-black pr-2">
            ارسال مشخصات پروژه یا درخواست استعلام
          </h2>

          {submitted ? (
            <div className="p-6 sharp bg-white border border-emerald-600 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="text-sm font-black text-black">پیام شما با موفقیت ثبت شد</h3>
              <p className="text-xs text-[#333]">
                کارشناسان فنی نوآوران پنجره سپاهان به زودی با شما تماس خواهند گرفت.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-bold text-black underline"
              >
                ارسال پیام دیگر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-black block mb-1">
                  نام و نام خانوادگی / نام شرکت:
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: مهندس موسوی"
                  className="w-full p-2.5 sharp bg-white border border-[#888] text-black text-xs focus:border-black outline-none frame-shadow text-right font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">
                  شماره تماس همراه:
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="۰۹۳۰۱۵۴۵۸۵۸"
                  className="w-full p-2.5 sharp bg-white border border-[#888] text-black text-xs font-mono focus:border-black outline-none frame-shadow text-left"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">
                  موضوع یا سیستم درخواستی:
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full p-2.5 sharp bg-white border border-[#888] text-black text-xs focus:border-black outline-none frame-shadow text-right font-medium"
                >
                  <option value="پنجره ترمال بریک TH 68 / TH 60">پنجره دوجداره آلومینیوم ترمال بریک (TH 68 / TH 60)</option>
                  <option value="سیستم لیفت اند اسلاید TS 143 / TS 115">پنجره لیفت اند اسلاید سنگین (TS 143 / TS 115)</option>
                  <option value="پنجره کشویی TS 77 / AS 90">پنجره کشویی مهندسی (TS 77 / AS 90)</option>
                  <option value="سیستم‌های نرمال AH 59 / AH 47">سیستم‌های لولایی اختصاصی نرمال (AH 59 / AH 47)</option>
                  <option value="کرتین وال لامل">نمای کرتین وال (لامل و فیس‌کپ)</option>
                  <option value="نمای فریم لس">نمای شیشه‌ای فریم‌لس</option>
                  <option value="حفاظ شیشه‌ای و نرده بالکن">سیستم نرده شیشه‌ای و حفاظ بالکن (Verandah Fence)</option>
                  <option value="توری پلیسه مگنتی">سیستم توری پلیسه مگنتی و آکاردئونی</option>
                  <option value="سایر موارد">سایر خدمات و استعلام قیمت</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-black block mb-1">
                  توضیحات یا متراژ تقریبی:
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="متراژ تقریبی دهانه‌ها، محل پروژه و توضیحات تکمیلی..."
                  className="w-full p-2.5 sharp bg-white border border-[#888] text-black text-xs focus:border-black outline-none frame-shadow text-right font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 sharp bg-[#18191a] hover:bg-[#333] text-white font-bold text-xs flex items-center justify-center gap-2 border border-black shadow-md transition-all"
              >
                <Send className="w-4 h-4 text-[#cbcccb]" />
                <span>ثبت درخواست مشاوره و استعلام قیمت</span>
              </button>
            </form>
          )}

          <div className="pt-3 border-t border-[#a8aba8] text-center space-y-1.5">
            <span className="text-[11px] text-[#444] font-medium block">یا جهت ارسال مستقیم فایل نقشه‌های پروژه در واتساپ مهندسی:</span>
            <a
              href="https://wa.me/989301545858?text=سلام،%20فایل%20نقشه%20پروژه%20را%20جهت%20استعلام%20ارسال%20می‌کنم."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 sharp bg-emerald-700 text-white hover:bg-emerald-600 text-xs font-bold border border-emerald-800 transition-colors font-mono"
            >
              <MessageSquare className="w-4 h-4" />
              <span>ارسال پیام و نقشه به واتساپ: ۰۹۳۰۱۵۴۵۸۵۸</span>
            </a>
          </div>
        </div>

        {/* Right Col: Details & Addresses */}
        <div className="space-y-4">
          {/* Main Phones Card */}
          <div className="aluminum-card sharp frame-shadow p-6 space-y-4 text-right border border-[#b0b3b0]">
            <h2 className="text-sm font-black text-black border-r-2 border-black pr-2">
              خطوط تماس و پشتیبانی
            </h2>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-3 p-3 sharp bg-[#b8bab8] border border-[#9ea19e]">
                <Phone className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#444] text-[10px] block font-bold">تلفن دفتر مرکزی و کارخانه:</span>
                  <a href="tel:03133687755" className="text-sm font-black text-black hover:underline font-mono mt-0.5 block">
                    ۰۳۱-۳۳۶۸۷۷۵۵
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 sharp bg-[#b8bab8] border border-[#9ea19e]">
                <Phone className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#444] text-[10px] block font-bold">شماره همراه و واتساپ مهندسی:</span>
                  <a href="tel:09301545858" className="text-xs font-bold text-black hover:underline font-mono mt-0.5 block">
                    ۰۹۳۰۱۵۴۵۸۵۸ &nbsp;|&nbsp; ۰۹۱۳۹۰۹۰۶۷۳
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 sharp bg-[#b8bab8] border border-[#9ea19e]">
                <Building2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#444] text-[10px] block font-bold">خط مستقیم ۴ رقمی:</span>
                  <div className="text-sm font-black text-black font-mono mt-0.5">
                    ۰۳۱-۴۱۴۴
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="aluminum-card sharp frame-shadow p-6 space-y-3 text-right border border-[#b0b3b0]">
            <h2 className="text-sm font-black text-black border-r-2 border-black pr-2">
              نشانی دفاتر و کارخانه
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Factory className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <div>
                  <strong className="text-black block text-xs">کارخانه تولیدی و آدرس رسمی ثبتی:</strong>
                  <span className="text-[#333] leading-relaxed block mt-0.5 text-[11.5px] font-medium">
                    اصفهان، خیابان امام خمینی، خیابان بسیج، کوچه ۱۳۵، کوچه فردوسی (بهار)، پلاک ۱۰۰ (کد پستی: ۸۴۳۶۱۸۵۵۰۳)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2.5 border-t border-[#a8aba8]">
                <MapPin className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <div>
                  <strong className="text-black block text-xs">کارخانه صنعتی و انبار مقاطع:</strong>
                  <span className="text-[#333] leading-relaxed block mt-0.5 text-[11.5px] font-medium">
                    اصفهان، شهرک صنعتی جی، خیابان ۲۸، فرعی ۴، پلاک ۶۲
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2.5 border-t border-[#a8aba8]">
                <Clock className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <div>
                  <strong className="text-black block text-xs">ساعات کاری:</strong>
                  <span className="text-[#333] leading-relaxed block mt-0.5 text-[11.5px] font-medium">
                    شنبه تا چهارشنبه: ۸:۰۰ الی ۱۷:۰۰ | پنج‌شنبه‌ها: ۸:۰۰ الی ۱۳:۳۰
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
