import React from 'react';
import { getSettings } from '@/lib/db';
import { Building2, ShieldCheck, Factory, Award, CheckCircle2, Phone, MapPin } from 'lucide-react';

export const metadata = {
  title: 'درباره شرکت و تاریخچه کارخانه | نوآوران پنجره سپاهان',
  description: 'آشنایی با تاریخچه شرکت نوآوران پنجره سپاهان از سال ۱۳۸۵، ظرفیت‌های کارخانه ۱۵۰۰ متری، استانداردهای تولید و مهندسی نما.',
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
      description: 'ارائه سبد جامع مهندسی شامل نماهای مدرن شیشه‌ای، لیفت‌اند‌اسلاید، ترموود، کامپوزیت و خدمات پس از فروش هوشمند با گارانتی کتبی.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-bronze-400 uppercase tracking-widest">
          هویت و اصالت مهندسی
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
          درباره شرکت نوآوران پنجره سپاهان
        </h1>
        <p className="mt-4 text-sm text-titanium-300 leading-relaxed">
          بیش از یک دهه و نیم پیشگامی در طراحی محاسباتی، ساخت دقیق صنعتی و اجرای ماندگار در سراسر کشور.
        </p>
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
