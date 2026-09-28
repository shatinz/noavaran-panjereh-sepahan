"use client";

import React, { useState } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, Factory, FileCheck, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const honeypot = formData.get('bot-field');
    if (honeypot) return; // Silent reject for bots

    const newErrors: Record<string, string> = {};
    if (!formData.get('name')) newErrors.name = 'لطفا نام خود را وارد کنید.';
    if (!formData.get('phone')) newErrors.phone = 'لطفا شماره تماس خود را وارد کنید.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  return (
    <>
      <Breadcrumbs items={[{ label: 'تماس با ما' }]} />
      <PageHero 
        title="ارتباط با مهندسی فروش" 
        subtitle="مشاوره رایگان، برآورد قیمت و بازدید از پروژه"
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-12" dir="rtl">
        
        {/* Official Legal Registration Banner */}
        <section className="bg-ink-950 border border-ink-800 rounded-xl overflow-hidden metal-shadow">
          <div className="bg-ink-900 border-b border-ink-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileCheck className="w-8 h-8 text-signal-500" />
              <div>
                <h2 className="text-lg font-black text-white font-vazir">دفتر فروش و کارخانه نوآوران پنجره سپاهان</h2>
                <span className="text-sm text-steel-400 font-vazir">عضو رسمی اتحادیه صنایع آلومینیوم ایران</span>
              </div>
            </div>
            <span className="px-4 py-2 bg-ink-950 text-white text-sm font-mono font-bold rounded-lg border border-ink-800">
              شناسه ملی: ۱۴۰۱۵۰۲۶۲۳۰
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-ink-800 text-right">
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">نام رسمی شرکت:</span>
              <span className="text-white font-black font-vazir block">نوآوران پنجره سپاهان</span>
            </div>
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">شماره ثبت رسمی:</span>
              <span className="text-white font-black font-mono block text-xl tracking-widest">3892</span>
            </div>
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">کد پستی ثبتی:</span>
              <span className="text-white font-black font-mono block text-xl tracking-widest">8431811565</span>
            </div>
            <div className="bg-ink-950 p-6 space-y-2">
              <span className="text-steel-400 font-vazir text-xs block">تلفن کارخانه و دفتر:</span>
              <span className="text-white font-black font-mono block text-xl tracking-widest" dir="ltr">031-33687755</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 text-right">
          
          {/* Form Section */}
          <div className="bg-ink-950 border border-ink-800 rounded-xl p-6 md:p-8 space-y-6 metal-shadow">
            <h2 className="text-xl font-black text-white font-vazir border-r-4 border-signal-500 pr-4">
              ارسال درخواست مشاوره و پیش‌فاکتور
            </h2>

            {submitted ? (
              <div className="bg-ink-900 border border-emerald-500/50 rounded-xl p-8 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                <h3 className="text-lg font-bold text-white font-vazir">درخواست شما با موفقیت ثبت شد</h3>
                <p className="text-sm text-steel-400 font-vazir">
                  کارشناسان مهندسی فروش ما در اسرع وقت با شما تماس خواهند گرفت.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-signal-500 hover:text-signal-400 text-sm font-bold font-vazir transition-colors"
                >
                  ارسال درخواست جدید
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot */}
                <input type="text" name="bot-field" className="hidden" aria-hidden="true" tabIndex={-1} />

                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-white font-vazir mb-2">
                    نام و نام خانوادگی / نام شرکت <span className="text-signal-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`w-full bg-ink-900 border ${errors.name ? 'border-signal-500 focus:border-signal-500' : 'border-ink-800 focus:border-steel-400'} rounded-lg px-4 py-3 text-white focus:outline-none transition-colors font-vazir`}
                    placeholder="مثال: شرکت عمران سازان"
                  />
                  {errors.name && (
                    <p id="name-error" className="text-signal-500 text-xs font-vazir mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-white font-vazir mb-2">
                    شماره تماس (موبایل یا تلفن ثابت) <span className="text-signal-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    dir="ltr"
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={`w-full bg-ink-900 border ${errors.phone ? 'border-signal-500 focus:border-signal-500' : 'border-ink-800 focus:border-steel-400'} rounded-lg px-4 py-3 text-white focus:outline-none transition-colors font-mono text-left`}
                    placeholder="0912..."
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-signal-500 text-xs font-vazir mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-bold text-white font-vazir mb-2">
                    نوع سیستم درخواستی
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    className="w-full bg-ink-900 border border-ink-800 focus:border-steel-400 rounded-lg px-4 py-3 text-white focus:outline-none transition-colors font-vazir appearance-none"
                  >
                    <option value="کرتین‌وال لامل">نمای شیشه‌ای کرتین‌وال (لامل)</option>
                    <option value="کرتین‌وال فریم‌لس">نمای شیشه‌ای فریم‌لس</option>
                    <option value="آلومینیوم ترمال‌بریک">پنجره آلومینیوم ترمال‌بریک</option>
                    <option value="کامپوزیت پنل">نمای ورق کامپوزیت آلومینیوم</option>
                    <option value="سایر">سایر موارد (هندریل، چوب ترموود و ...)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-white font-vazir mb-2">
                    توضیحات تکمیلی پروژه (اختیاری)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full bg-ink-900 border border-ink-800 focus:border-steel-400 rounded-lg px-4 py-3 text-white focus:outline-none transition-colors font-vazir resize-none"
                    placeholder="حدود متراژ، شهر محل اجرا، یا سایر جزئیات..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-signal-500 hover:bg-signal-400 text-white font-bold py-3.5 rounded-lg transition-colors font-vazir flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 ml-2" />
                  ارسال درخواست مشاوره
                </button>
              </form>
            )}
          </div>

          {/* Contact Details Section */}
          <div className="space-y-6">
            <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blood-900/20 via-ink-900 to-ink-950 border border-signal-500/20 rounded-xl p-6 md:p-8 space-y-6 metal-shadow">
              <ShieldCheck className="w-12 h-12 text-signal-500 mx-auto mb-4" />
              <h2 className="text-xl font-black text-white font-vazir text-center border-b border-ink-800 pb-4">
                راه‌های ارتباطی مستقیم
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ink-900 border border-ink-800 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-signal-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-vazir mb-1">تلفن کارخانه و دفتر فروش</h3>
                    <a href="tel:03133687755" className="text-lg font-black text-signal-500 font-mono tracking-widest block" dir="ltr">031 - 33687755</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ink-900 border border-ink-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-signal-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-vazir mb-1">آدرس کارخانه و دفتر مرکزی</h3>
                    <p className="text-sm text-steel-400 font-vazir leading-relaxed">
                      اصفهان، شهرک صنعتی محمودآباد، خیابان ۲۴، نبش چهارراه اول، پلاک ۲، کارخانه نوآوران پنجره سپاهان
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ink-900 border border-ink-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-signal-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-vazir mb-1">ساعات کاری مهندسی فروش</h3>
                    <p className="text-sm text-steel-400 font-vazir leading-relaxed">
                      شنبه تا چهارشنبه: ۸:۰۰ صبح الی ۱۷:۰۰<br />
                      پنج‌شنبه‌ها: ۸:۰۰ صبح الی ۱۳:۰۰<br />
                      تعطیلات رسمی: تعطیل
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-[4/3] w-full bg-ink-900 rounded-xl border border-ink-800 overflow-hidden metal-shadow flex flex-col items-center justify-center text-steel-500">
              <MapPin className="w-10 h-10 mb-2 opacity-50" />
              <span className="font-vazir text-sm font-bold">نقشه مسیریابی کارخانه</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
