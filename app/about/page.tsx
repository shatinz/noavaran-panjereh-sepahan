import React from 'react';
import { getSettings } from '@/lib/db';
import { Building2, ShieldCheck, Factory, Award, CheckCircle2, Phone, MapPin, FileCheck, Shield } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'درباره شرکت و تاریخچه کارخانه | نوآوران پنجره سپاهان',
  description: 'آشنایی با تاریخچه شرکت نوآوران پنجره سپاهان از سال ۱۳۸۵، مشخصات رسمی ثبتی و ظرفیت‌های کارخانه ۱۵۰۰ متری، استانداردهای تولید و مهندسی نما.',
};

export default async function AboutPage() {
  const settings = await getSettings();

  const timeline = [
    {
      year: '۱۳۸۵',
      title: 'تأسیس کارگاه تخصصی درب و پنجره',
      description: 'شروع به کار مجموعه در قالب کارگاه صنعتی و تخصصی ساخت درب و پنجره‌های آلومینیومی در اصفهان.'
    },
    {
      year: '۱۳۹۳',
      title: 'توسعه به کارخانه ۱۵۰۰ متری مدرن',
      description: 'انتقال خطوط تولید به شهرک صنعتی و تجهیز کامل کارخانه به ماشین‌آلات پیشرفته اکستروژن، مونتاژ و فرز CNC اروپایی.'
    },
    {
      year: '۱۴۰۰',
      title: 'ورود به پروژه‌های کلان بانکی و سازمانی',
      description: 'توسعه دپارتمان مهندسی محاسبات و اجرای نماهای مرتفع کرتین وال لامل در شعب بانک‌ها، شهرداری‌ها و مجتمع‌های تجاری بزرگ.'
    },
    {
      year: 'امروز',
      title: 'نوآوران پنجره سپاهان؛ مرجع مهندسی نما',
      description: 'ارائه سبد جامع مهندسی شامل نماهای مدرن شیشه‌ای، لیفت‌اند‌اسلاید، ترموود، کامپوزیت، سیستم توری پلیسه و جان‌پناه‌های شیشه‌ای با گارانتی کتبی.'
    }
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 py-4 space-y-5">
      {/* Header */}
      <section className="aluminum-card sharp frame-shadow p-6 sm:p-10 border border-[#b0b3b0] text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18191a] text-white text-[11px] font-bold sharp border border-black shadow-sm">
          <ShieldCheck className="w-4 h-4 text-[#cbcccb]" />
          <span>هویت رسمی، اصالت مهندسی و تعهد اجرایی</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight leading-tight">
          درباره شرکت نوآوران پنجره سپاهان
        </h1>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#333] leading-relaxed font-medium">
          بیش از یک دهه و نیم پیشگامی در طراحی محاسباتی، ساخت دقیق صنعتی و اجرای ماندگار در سراسر کشور.
        </p>
      </section>

      {/* Official Legal Registration Credentials Card */}
      <div className="aluminum-card sharp frame-shadow p-5 sm:p-6 border border-[#b0b3b0] space-y-4 text-right">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#a8aba8] pb-3">
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
            شناسه ملی ۱۴۰۱۵۰۲۶۲۳۰
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
          <div className="bg-[#b8bab8] p-3 sharp border border-[#9ea19e]">
            <span className="text-[#444] font-sans block text-[10px] font-bold">نام رسمی شرکت:</span>
            <span className="text-xs font-black text-black mt-0.5 block font-sans">نوآوران پنجره سپاهان</span>
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

      {/* Industrial Capabilities Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-right">
        <div className="aluminum-card sharp frame-shadow p-5 border border-[#b0b3b0] space-y-2">
          <div className="w-10 h-10 sharp bg-[#18191a] text-white flex items-center justify-center font-bold">
            <Factory className="w-5 h-5 text-[#cbcccb]" />
          </div>
          <h3 className="text-sm font-black text-black">کارخانه تولیدی ۱۵۰۰ متری</h3>
          <p className="text-xs text-[#333] leading-relaxed font-medium">
            تجهیز شده با خطوط برش دوکله دیجیتال، فرز CNC کپی‌روتر، پرس پانچ‌های پنوماتیک و خط اختصاصی بسته‌بندی حباب‌دار صنعتی.
          </p>
        </div>

        <div className="aluminum-card sharp frame-shadow p-5 border border-[#b0b3b0] space-y-2">
          <div className="w-10 h-10 sharp bg-[#18191a] text-white flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5 text-[#cbcccb]" />
          </div>
          <h3 className="text-sm font-black text-black">محاسبات مهندسی سازه و نما</h3>
          <p className="text-xs text-[#333] leading-relaxed font-medium">
            تحلیل بارهای استاتیکی باد، زلزله و ممان اینرسی دهانه‌های شیشه‌ای با نرم‌افزارهای تخصصی Orgadata آلمان و Sap2000.
          </p>
        </div>

        <div className="aluminum-card sharp frame-shadow p-5 border border-[#b0b3b0] space-y-2">
          <div className="w-10 h-10 sharp bg-[#18191a] text-white flex items-center justify-center font-bold">
            <Award className="w-5 h-5 text-[#cbcccb]" />
          </div>
          <h3 className="text-sm font-black text-black">۱۰ سال ضمانت کتبی کیفیت</h3>
          <p className="text-xs text-[#333] leading-relaxed font-medium">
            تمامی پروژه‌های تحویل‌شده همراه با شناسنامه مشخصات فنی، گواهی اصالت بیلت ۶۰۶۳ و گارانتی هوابندی و آب‌بندی ۱۰ ساله ارائه می‌شوند.
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="aluminum-card sharp frame-shadow p-6 sm:p-8 border border-[#b0b3b0] space-y-6 text-right">
        <div className="border-b border-[#a8aba8] pb-3">
          <h2 className="text-base font-black text-black">مسیر رشد و توسعه نوآوران پنجره سپاهان</h2>
          <p className="text-xs text-[#444] mt-0.5">گاه‌شمار کلیدی توسعه فناوری و ظرفیت‌های تولیدی شرکت</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {timeline.map((item, idx) => (
            <div key={idx} className="bg-[#b8bab8] p-4 sharp border border-[#9ea19e] space-y-2">
              <span className="text-sm font-black text-black font-mono block pb-1 border-b border-[#9ea19e]">
                {item.year}
              </span>
              <h3 className="text-xs font-black text-black mt-1">{item.title}</h3>
              <p className="text-[11px] text-[#333] leading-relaxed font-medium">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="aluminum-card sharp frame-shadow p-6 border border-[#b0b3b0] flex flex-col sm:flex-row items-center justify-between gap-4 text-right">
        <div>
          <h3 className="text-sm font-black text-black">مشاهده ۱۲ سیستم اختصاصی کاتالوگ متریال‌ها</h3>
          <p className="text-xs text-[#444] mt-0.5">بررسی رندرهای سه‌بعدی CAD، مشخصات فنی و ویدیوهای انیمیشن</p>
        </div>
        <Link
          href="/materials"
          className="sharp px-5 py-2.5 bg-[#18191a] text-white hover:bg-[#333] text-xs font-bold border border-black shadow-sm transition-colors"
        >
          ورود به کاتالوگ مهندسی
        </Link>
      </div>
    </div>
  );
}
