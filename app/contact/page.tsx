'use client';

import React, { useState } from 'react';
import { Phone, MapPin, Building2, Clock, Mail, MessageSquare, Send, CheckCircle2, Factory, FileCheck, Shield } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-bronze-500/10 border border-bronze-500/30 text-bronze-400 text-xs font-medium">
          <Shield className="w-3.5 h-3.5 text-bronze-400" />
          <span>هویت رسمی ثبتی و خطوط ارتباط مستقیم</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          ارتباط با شرکت نوآوران پنجره سپاهان
        </h1>
        <p className="text-sm text-titanium-300 leading-relaxed">
          کارشناسان فنی و مهندسین محاسب نما در تمامی ساعات اداری آماده پاسخگویی به سوالات، بررسی نقشه‌ها و صدور پیش‌فاکتور هستند.
        </p>
      </div>

      {/* Official Legal Registration Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-charcoal-900 via-charcoal-900/90 to-charcoal-950 border border-charcoal-800 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-charcoal-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-bronze-500/20 border border-bronze-500/30 flex items-center justify-center text-bronze-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">مشخصات ثبتی و حقوقی شرکت نوآوران پنجره سپاهان</h2>
              <span className="text-xs text-titanium-400">دارای پروانه بهره‌برداری صنعتی و عضو رسمی سندیکای آلومینیوم ایران</span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
            ثبت شده رسمی و معتبر
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="bg-charcoal-950 p-3 rounded-xl border border-charcoal-800">
            <span className="text-titanium-500 font-sans block text-[11px]">شناسه ملی:</span>
            <span className="text-base font-bold text-bronze-400 mt-1 block">۱۴۰۱۵۰۲۶۲۳۰</span>
          </div>
          <div className="bg-charcoal-950 p-3 rounded-xl border border-charcoal-800">
            <span className="text-titanium-500 font-sans block text-[11px]">شماره ثبت رسمی:</span>
            <span className="text-base font-bold text-white mt-1 block">۳۸۹۲</span>
          </div>
          <div className="bg-charcoal-950 p-3 rounded-xl border border-charcoal-800">
            <span className="text-titanium-500 font-sans block text-[11px]">کد پستی ثبتی:</span>
            <span className="text-base font-bold text-titanium-200 mt-1 block">۸۴۳۶۱۸۵۵۰۳</span>
          </div>
          <div className="bg-charcoal-950 p-3 rounded-xl border border-charcoal-800">
            <span className="text-titanium-500 font-sans block text-[11px]">تلفن کارخانه و ثبت:</span>
            <span className="text-base font-bold text-bronze-400 mt-1 block">۰۳۱-۳۳۶۸۷۷۵۵</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Col: Contact Form */}
        <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-8 sm:p-10 space-y-6">
          <h2 className="text-lg font-bold text-white border-r-2 border-bronze-500 pr-3">
            ارسال مشخصات پروژه یا درخواست استعلام
          </h2>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">پیام شما با موفقیت ثبت شد</h3>
              <p className="text-xs text-titanium-300">
                کارشناسان فنی نوآوران پنجره سپاهان به زودی با شما تماس خواهند گرفت.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs text-bronze-400 hover:underline"
              >
                ارسال پیام دیگر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-titanium-300 block mb-1.5">
                  نام و نام خانوادگی / نام شرکت:
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: مهندس موسوی"
                  className="w-full p-3 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white text-xs focus:border-bronze-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-titanium-300 block mb-1.5">
                  شماره تماس همراه:
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="۰۹۳۰۱۵۴۵۸۵۸"
                  className="w-full p-3 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white text-xs font-mono focus:border-bronze-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-titanium-300 block mb-1.5">
                  موضوع یا سیستم درخواستی:
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full p-3 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white text-xs focus:border-bronze-500 focus:outline-none transition-colors"
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
                <label className="text-xs font-medium text-titanium-300 block mb-1.5">
                  توضیحات یا متراژ تقریبی:
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="متراژ تقریبی دهانه‌ها، محل پروژه و توضیحات تکمیلی..."
                  className="w-full p-3 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white text-xs focus:border-bronze-500 focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-bronze-500/20 transition-all hover:scale-[1.01]"
              >
                <Send className="w-4 h-4 text-charcoal-950" />
                <span>ثبت درخواست مشاوره و استعلام قیمت</span>
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-charcoal-800 text-center">
            <span className="text-[11px] text-titanium-400">یا جهت ارسال مستقیم فایل نقشه‌های پروژه در واتساپ مهندسی:</span>
            <a
              href="https://wa.me/989301545858?text=سلام،%20فایل%20نقشه%20پروژه%20را%20جهت%20استعلام%20ارسال%20می‌کنم."
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 text-xs font-bold border border-emerald-500/30 transition-colors font-mono"
            >
              <MessageSquare className="w-4 h-4" />
              <span>ارسال پیام و نقشه به واتساپ: ۰۹۳۰۱۵۴۵۸۵۸</span>
            </a>
          </div>
        </div>

        {/* Right Col: Details & Addresses */}
        <div className="space-y-6">
          {/* Main Phones Card */}
          <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-8 space-y-6">
            <h2 className="text-lg font-bold text-white border-r-2 border-bronze-500 pr-3">
              خطوط تماس و پشتیبانی
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-charcoal-850 border border-charcoal-800">
                <Phone className="w-5 h-5 text-bronze-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-titanium-400 text-[11px] block">تلفن دفتر مرکزی و کارخانه:</span>
                  <a href="tel:03133687755" className="text-base font-bold text-white hover:text-bronze-400 font-mono mt-0.5 block">
                    ۰۳۱-۳۳۶۸۷۷۵۵
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-charcoal-850 border border-charcoal-800">
                <Phone className="w-5 h-5 text-bronze-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-titanium-400 text-[11px] block">شماره همراه و واتساپ مهندسی:</span>
                  <a href="tel:09301545858" className="text-sm font-semibold text-white hover:text-bronze-400 font-mono mt-0.5 block">
                    ۰۹۳۰۱۵۴۵۸۵۸ &nbsp;|&nbsp; ۰۹۱۳۹۰۹۰۶۷۳
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-charcoal-850 border border-charcoal-800">
                <Building2 className="w-5 h-5 text-bronze-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-titanium-400 text-[11px] block">خطوط مستقیم دفتر:</span>
                  <div className="text-sm font-semibold text-white font-mono mt-0.5">
                    ۰۳۱-۳۱۳۱۳۱۶۰ &nbsp;|&nbsp; ۰۳۱-۳۱۳۱۳۱۵۰
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-8 space-y-4">
            <h2 className="text-lg font-bold text-white border-r-2 border-bronze-500 pr-3">
              نشانی دفاتر و کارخانه
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Factory className="w-5 h-5 text-bronze-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">کارخانه تولیدی و آدرس رسمی ثبتی:</strong>
                  <span className="text-titanium-300 leading-relaxed block mt-1">
                    اصفهان، خیابان امام خمینی، خیابان بسیج، کوچه ۱۳۵، کوچه فردوسی (بهار)، پلاک ۱۰۰ (کد پستی: ۸۴۳۶۱۸۵۵۰۳)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-charcoal-800">
                <MapPin className="w-5 h-5 text-bronze-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">دفتر مرکزی و امور مشتریان:</strong>
                  <span className="text-titanium-300 leading-relaxed block mt-1">
                    اصفهان، خیابان محتشم کاشانی، روبروی پست بانک مرکزی، ساختمان نوید، طبقه ۶
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-charcoal-800">
                <Clock className="w-5 h-5 text-bronze-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">ساعات کاری:</strong>
                  <span className="text-titanium-300 leading-relaxed block mt-1">
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
