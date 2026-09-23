'use client';

import React, { useState } from 'react';
import { Phone, MapPin, Building2, Clock, Mail, MessageSquare, Send, CheckCircle2, Factory } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectType: 'پنجره ترمال بریک',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-12 space-y-12 bg-[#F5F5F5] text-[#18191a]">
      {/* Header */}
      <div className="text-right space-y-2 border-b border-[#b5b8b5] pb-6">
        <span className="aluminum-header px-3 py-1 text-xs font-black text-[#18191a] inline-block shadow-sm">
          راه‌های ارتباطی و آدرس
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#18191a]">
          تماس با شرکت نوآوران پنجره سپاهان
        </h1>
        <p className="text-xs sm:text-sm text-[#55595e] font-medium leading-relaxed max-w-3xl">
          کارشناسان فنی و مهندسین محاسب نما در تمامی ساعات اداری آماده پاسخگویی، بررسی نقشه‌ها و صدور پیش‌فاکتور هستند.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-right">
        {/* Left Col: Contact Form */}
        <div className="aluminum-card border border-[#b5b8b5] p-6 sm:p-8 space-y-6 rounded-none subtle-soft-shadow">
          <h2 className="text-base font-black text-[#18191a] border-r-2 border-[#18191a] pr-3">
            ارسال مشخصات پروژه یا درخواست استعلام
          </h2>

          {submitted ? (
            <div className="p-6 bg-[#18191a] text-white border border-[#18191a] text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#cbcccb] mx-auto" />
              <h3 className="text-sm font-black text-white">پیام شما با موفقیت ثبت شد</h3>
              <p className="text-xs text-[#cbcccb]">
                کارشناسان فنی نوآوران پنجره سپاهان به زودی با شما تماس خواهند گرفت.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs text-white underline font-bold"
              >
                ارسال پیام دیگر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#18191a] block mb-1">
                  نام و نام خانوادگی / نام شرکت:
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: مهندس موسوی"
                  className="w-full p-3 bg-white border border-[#b5b8b5] text-[#18191a] text-xs font-bold focus:border-[#18191a] focus:outline-none rounded-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#18191a] block mb-1">
                  شماره تماس همراه:
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  className="w-full p-3 bg-white border border-[#b5b8b5] text-[#18191a] text-xs font-mono font-bold focus:border-[#18191a] focus:outline-none rounded-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#18191a] block mb-1">
                  موضوع یا سیستم درخواستی:
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full p-3 bg-white border border-[#b5b8b5] text-[#18191a] text-xs font-bold focus:border-[#18191a] focus:outline-none rounded-none"
                >
                  <option value="پنجره ترمال بریک">پنجره دوجداره آلومینیوم ترمال بریک</option>
                  <option value="پنجره لیفت اند اسلاید">پنجره لوکس لیفت اند اسلاید</option>
                  <option value="کرتین وال لامل">نمای کرتین وال (لامل)</option>
                  <option value="نمای فریم لس">نمای شیشه‌ای فریم‌لس</option>
                  <option value="نمای کامپوزیت">نمای کامپوزیت آلومینیوم</option>
                  <option value="چوب ترموود">نمای چوب طبیعی ترموود</option>
                  <option value="سایر موارد">سایر خدمات و استعلام قیمت</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#18191a] block mb-1">
                  توضیحات یا متراژ تقریبی:
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="متراژ تقریبی دهانه‌ها، محل پروژه و توضیحات تکمیلی..."
                  className="w-full p-3 bg-white border border-[#b5b8b5] text-[#18191a] text-xs font-bold focus:border-[#18191a] focus:outline-none rounded-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#18191a] text-white font-black text-xs flex items-center justify-center gap-2 hover:bg-[#2c2e30] transition-colors rounded-none shadow-md"
              >
                <Send className="w-4 h-4 text-white" />
                <span>ثبت درخواست مشاوره و استعلام قیمت</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Col: Details & Addresses */}
        <div className="space-y-5">
          {/* Main Phones Card */}
          <div className="aluminum-card border border-[#b5b8b5] p-6 sm:p-8 space-y-4 rounded-none subtle-soft-shadow">
            <h2 className="text-base font-black text-[#18191a] border-r-2 border-[#18191a] pr-3">
              خطوط تماس و پشتیبانی
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3.5 bg-white border border-[#b5b8b5]">
                <Phone className="w-5 h-5 text-[#18191a] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#55595e] text-[11px] block font-bold">خط تلفن ۴ رقمی دفتر مرکزی:</span>
                  <a href="tel:0314144" className="text-base font-black text-[#18191a] font-mono mt-0.5 block">
                    ۰۳۱-۴۱۴۴
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white border border-[#b5b8b5]">
                <Phone className="w-5 h-5 text-[#18191a] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#55595e] text-[11px] block font-bold">خطوط مستقیم دفتر:</span>
                  <div className="text-xs font-black text-[#18191a] font-mono mt-0.5">
                    ۰۳۱-۳۱۳۱۳۱۶۰ &nbsp;|&nbsp; ۰۳۱-۳۱۳۱۳۱۵۰
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white border border-[#b5b8b5]">
                <Building2 className="w-5 h-5 text-[#18191a] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#55595e] text-[11px] block font-bold">خطوط مستقیم کارخانه:</span>
                  <div className="text-xs font-black text-[#18191a] font-mono mt-0.5">
                    ۰۳۱-۳۳۶۸۷۵۶۱ &nbsp;|&nbsp; ۰۳۱-۳۳۶۸۷۵۶۶
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="aluminum-card border border-[#b5b8b5] p-6 sm:p-8 space-y-4 rounded-none subtle-soft-shadow">
            <h2 className="text-base font-black text-[#18191a] border-r-2 border-[#18191a] pr-3">
              نشانی دفاتر و کارخانه
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#18191a] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#18191a] block font-black">دفتر مرکزی و امور مشتریان:</strong>
                  <span className="text-[#35383c] leading-relaxed block mt-1 font-medium">
                    اصفهان، خیابان محتشم کاشانی، روبروی پست بانک مرکزی، ساختمان نوید، طبقه ۶
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#b5b8b5]">
                <Factory className="w-5 h-5 text-[#18191a] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#18191a] block font-black">کارخانه تولیدی و انبار مرکزی:</strong>
                  <span className="text-[#35383c] leading-relaxed block mt-1 font-medium">
                    اصفهان، خیابان امام خمینی، خیابان بسیج، کوچه ورزشگاه، بن‌بست قربانی، پلاک ۵۰ (کارخانه ۱۵۰۰ متری)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#b5b8b5]">
                <Clock className="w-5 h-5 text-[#18191a] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#18191a] block font-black">ساعات کاری:</strong>
                  <span className="text-[#35383c] leading-relaxed block mt-1 font-medium">
                    شنبه تا چهارشنبه: ۸:۰۰ الی ۱۷:۰۰ | پنج‌شنبه‌ها: ۸:۰۰ الی ۱۳:۰۰
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
