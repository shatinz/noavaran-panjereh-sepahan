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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-bronze-400 uppercase tracking-widest">
          پاسخگویی سریع و مشاوره فنی
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
          ارتباط با شرکت نوآوران پنجره سپاهان
        </h1>
        <p className="mt-4 text-sm text-titanium-300 leading-relaxed">
          کارشناسان فنی و مهندسین محاسب نما در تمامی ساعات اداری آماده پاسخگویی به سوالات، بررسی نقشه‌ها و صدور پیش‌فاکتور هستند.
        </p>
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
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
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
                  <option value="پنجره ترمال بریک">پنجره دوجداره آلومینیوم ترمال بریک</option>
                  <option value="پنجره لیفت اند اسلاید">پنجره لوکس لیفت اند اسلاید</option>
                  <option value="کرتین وال لامل">نمای کرتین وال (لامل)</option>
                  <option value="نمای فریم لس">نمای شیشه‌ای فریم‌لس</option>
                  <option value="نمای کامپوزیت">نمای کامپوزیت آلومینیوم</option>
                  <option value="چوب ترموود">نمای چوب طبیعی ترموود</option>
                  <option value="حفاظ و نرده استیل">حفاظ استیل و هندریل شیشه‌ای</option>
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
            <span className="text-[11px] text-titanium-400">یا جهت ارتباط سریع نقشه پروژه را در واتساپ ارسال فرمایید:</span>
            <a
              href="https://wa.me/989139090673"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 text-xs font-bold border border-emerald-500/30 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>ارسال مستقیم پیام در واتساپ (۰۹۱۳۹۰۹۰۶۷۳)</span>
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
                  <span className="text-titanium-400 text-[11px] block">خط تلفن ۴ رقمی دفتر مرکزی:</span>
                  <a href="tel:0314144" className="text-base font-bold text-white hover:text-bronze-400 font-mono mt-0.5 block">
                    ۰۳۱-۴۱۴۴
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-charcoal-850 border border-charcoal-800">
                <Phone className="w-5 h-5 text-bronze-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-titanium-400 text-[11px] block">خطوط مستقیم دفتر:</span>
                  <div className="text-sm font-semibold text-white font-mono mt-0.5">
                    ۰۳۱-۳۱۳۱۳۱۶۰ &nbsp;|&nbsp; ۰۳۱-۳۱۳۱۳۱۵۰
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-charcoal-850 border border-charcoal-800">
                <Building2 className="w-5 h-5 text-bronze-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-titanium-400 text-[11px] block">خطوط مستقیم کارخانه:</span>
                  <div className="text-sm font-semibold text-white font-mono mt-0.5">
                    ۰۳۱-۳۳۶۸۷۵۶۱ &nbsp;|&nbsp; ۰۳۱-۳۳۶۸۷۵۶۶
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
                <MapPin className="w-5 h-5 text-bronze-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">دفتر مرکزی و امور مشتریان:</strong>
                  <span className="text-titanium-300 leading-relaxed block mt-1">
                    اصفهان، خیابان محتشم کاشانی، روبروی پست بانک مرکزی، ساختمان نوید، طبقه ۶
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-charcoal-800">
                <Factory className="w-5 h-5 text-bronze-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">کارخانه تولیدی و انبار مرکزی:</strong>
                  <span className="text-titanium-300 leading-relaxed block mt-1">
                    اصفهان، خیابان امام خمینی، خیابان بسیج، کوچه ورزشگاه، بن‌بست قربانی، پلاک ۵۰ (کارخانه ۱۵۰۰ متری)
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
