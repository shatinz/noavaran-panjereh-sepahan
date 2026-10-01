'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { trackContactFormSubmit } from '@/lib/analytics';

export function ContactFormClient() {
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

    const projectType = formData.get('projectType')?.toString() || 'عمومی';
    trackContactFormSubmit(projectType);

    setErrors({});
    setSubmitted(true);
  };

  return (
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
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`w-full bg-ink-900 border ${
                errors.name ? 'border-signal-500 focus:border-signal-500' : 'border-ink-800 focus:border-steel-400'
              } rounded-lg px-4 py-3 text-white focus:outline-none transition-colors font-vazir`}
              placeholder="مثال: شرکت عمران سازان"
            />
            {errors.name && (
              <p id="name-error" className="text-signal-500 text-xs font-vazir mt-1">
                {errors.name}
              </p>
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
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={`w-full bg-ink-900 border ${
                errors.phone ? 'border-signal-500 focus:border-signal-500' : 'border-ink-800 focus:border-steel-400'
              } rounded-lg px-4 py-3 text-white focus:outline-none transition-colors font-mono text-left`}
              placeholder="0912..."
            />
            {errors.phone && (
              <p id="phone-error" className="text-signal-500 text-xs font-vazir mt-1">
                {errors.phone}
              </p>
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
              <option value="جام‌بالکنی (شیشه بالکن)">شیشه بالکن تاشو و ریلی (جام‌بالکنی)</option>
              <option value="کامپوزیت پنل">نمای ورق کامپوزیت آلومینیوم</option>
              <option value="سایر">سایر موارد (هندریل، حفاظ و ...)</option>
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
  );
}
