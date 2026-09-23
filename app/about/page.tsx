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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-bronze-500/10 border border-bronze-500/30 text-bronze-400 text-xs font-medium">
          <Shield className="w-3.5 h-3.5 text-bronze-400" />
          <span>هویت رسمی، اصالت مهندسی و تعهد اجرایی</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          درباره شرکت نوآوران پنجره سپاهان
        </h1>
        <p className="text-sm text-titanium-300 leading-relaxed">
          بیش از یک دهه و نیم پیشگامی در طراحی محاسباتی، ساخت دقیق صنعتی و اجرای ماندگار در سراسر کشور.
        </p>
      </div>

      {/* Official Legal Registration Credentials Card */}
      <div className="rounded-3xl bg-gradient-to-r from-charcoal-900 via-charcoal-900/90 to-charcoal-950 border border-charcoal-800 p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-charcoal-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-bronze-500/20 border border-bronze-500/30 flex items-center justify-center text-bronze-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">اطلاعات شناسنامه‌ای و ثبتی شرکت</h2>
              <span className="text-xs text-titanium-400">ثبت رسمی شخصیت حقوقی در اداره ثبت شرکت‌ها و موسسات غیرتجاری</span>
            </div>
          </div>
          <span className="text-xs font-mono text-bronze-400 bg-bronze-500/10 px-3 py-1 rounded-lg border border-bronze-500/20">
            کارخانه ۱۵۰۰ متری صنعتی
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-charcoal-950 p-4 rounded-2xl border border-charcoal-800">
            <span className="text-titanium-500 block mb-1">نام رسمی شرکت:</span>
            <span className="text-sm font-bold text-white block">شرکت نوآوران پنجره سپاهان</span>
          </div>
          <div className="bg-charcoal-950 p-4 rounded-2xl border border-charcoal-800">
            <span className="text-titanium-500 block mb-1">شناسه ملی:</span>
            <span className="text-sm font-mono font-bold text-bronze-400 block">{settings.nationalId || '۱۴۰۱۵۰۲۶۲۳۰'}</span>
          </div>
          <div className="bg-charcoal-950 p-4 rounded-2xl border border-charcoal-800">
            <span className="text-titanium-500 block mb-1">شماره ثبت:</span>
            <span className="text-sm font-mono font-bold text-white block">{settings.registrationNumber || '۳۸۹۲'}</span>
          </div>
          <div className="bg-charcoal-950 p-4 rounded-2xl border border-charcoal-800">
            <span className="text-titanium-500 block mb-1">کد پستی رسمی:</span>
            <span className="text-sm font-mono font-bold text-titanium-200 block">{settings.postalCode || '۸۴۳۶۱۸۵۵۰۳'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-3.5 bg-charcoal-950/60 rounded-xl border border-charcoal-800/80 flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-bronze-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">آدرس ثبتی کارخانه:</strong>
              <span className="text-titanium-300 leading-relaxed">{settings.officialCompanyAddress || settings.factoryAddress}</span>
            </div>
          </div>
          <div className="p-3.5 bg-charcoal-950/60 rounded-xl border border-charcoal-800/80 flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-bronze-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">تلفن‌های رسمی و کارخانه:</strong>
              <span className="text-titanium-300 font-mono">{settings.phone} &nbsp;|&nbsp; {settings.mobile}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Card */}
      <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-8 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              تعهد به دقت میلی‌متری، هوابندی مطلق و شکوه بصری معماری
            </h2>
            <p className="text-xs sm:text-sm text-titanium-300 leading-relaxed text-justify">
              شرکت نوآوران پنجره سپاهان با هدف ارتقای استانداردهای ساخت‌وساز و بهینه‌سازی انرژی در صنعت ساختمان پایه‌گذاری شده است. ما بر این باوریم که نما و پنجره ساختمان صرفاً یک حائل فیزیکی نیست؛ بلکه امضای معمار، سپر حرارتی سازه و تضمین‌کننده آرامش ساکنین است.
            </p>
            <p className="text-xs sm:text-sm text-titanium-400 leading-relaxed text-justify">
              کارخانه اختصاصی مجموعه به مساحت ۱۵۰۰ مترمربع در قطب صنعتی اصفهان، مجهز به پیشرفته‌ترین اره‌های دوکله برش زاویه‌ای، دستگاه‌های لقمه‌کوب هیدرولیک، پانچ‌های چندمنظوره و ایستگاه‌های تست آب‌بندی تحت فشار است که امکان تحویل روزانه ده‌ها مترمربع پنجره ترمال‌بریک و یونیت‌های کرتین‌وال را با تلورانس خطای نزدیک به صفر فراهم می‌سازد.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-charcoal-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-bronze-400 shrink-0" />
                <span className="text-xs text-titanium-200">آلیاژ ۶۰۶۳ سختی استاندارد</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-bronze-400 shrink-0" />
                <span className="text-xs text-titanium-200">پلی‌آمید اصل ضدحریق آلمانی</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-bronze-400 shrink-0" />
                <span className="text-xs text-titanium-200">تزریق گاز آرگون با خلوص ۹۰٪</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-bronze-400 shrink-0" />
                <span className="text-xs text-titanium-200">۱۰ سال گارانتی کتبی شرکتی</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 font-bold text-xs shadow-md shadow-bronze-500/20 transition-all"
              >
                <span>مشاهده کاتالوگ متریال‌ها و سیستم‌های مصرفی</span>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden bg-charcoal-850 border border-charcoal-700 h-80 sm:h-96">
            <img
              src="https://arvinpanjereh.com/upload/service/742b5647-017c-4a6e-b416-a184adf97dcc.webp"
              alt="کارخانه نوآوران پنجره سپاهان"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* History Timeline */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white text-center">
          مسیر تکامل و پیشرفت مجموعه
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {timeline.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-6 space-y-3 relative hover:border-bronze-500/40 transition-all"
            >
              <span className="text-2xl font-black text-bronze-400 font-mono block">
                {item.year}
              </span>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="text-xs text-titanium-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
