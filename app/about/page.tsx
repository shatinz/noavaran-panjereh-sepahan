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
      description: 'شروع به کار مجموعه در قالب کارگاه صنعتی ساخت درب و پنجره‌های آلومینیومی در اصفهان.'
    },
    {
      year: '۱۳۹۳',
      title: 'توسعه به کارخانه ۱۵۰۰ متری مدرن',
      description: 'تجهیز کامل کارخانه به ماشین‌آلات پیشرفته برش، لقمه‌کوب و فرز CNC اروپایی.'
    },
    {
      year: '۱۴۰۰',
      title: 'ورود به پروژه‌های کلان بانکی و سازمانی',
      description: 'توسعه مهندسی محاسبات و اجرای نماهای مرتفع کرتین وال لامل در شعب بانک‌ها و مجتمع‌های بزرگ.'
    },
    {
      year: 'امروز',
      title: 'نوآوران پنجره سپاهان؛ مرجع مهندسی نما',
      description: 'ارائه سبد جامع مهندسی نماهای شیشه‌ای، لیفت‌اند‌اسلاید، ترموود و کامپوزیت با گارانتی ۱۰ ساله.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-12 space-y-12 bg-[#F5F5F5] text-[#18191a]">
      {/* Page Title Header */}
      <div className="text-right space-y-2 border-b border-[#b5b8b5] pb-6">
        <span className="aluminum-header px-3 py-1 text-xs font-black text-[#18191a] inline-block shadow-sm">
          هویت و اعتبارات شرکت
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#18191a]">
          درباره شرکت نوآوران پنجره سپاهان (تأسیس ۱۳۸۵)
        </h1>
        <p className="text-xs sm:text-sm text-[#55595e] font-medium leading-relaxed max-w-3xl">
          بیش از ۱۵ سال سابقه درخشان در طراحی محاسباتی ممان اینرسی، ساخت صنعتی در کارخانه ۱۵۰۰ متری و اجرای پروژه‌های ساختمانی در سراسر ایران.
        </p>
      </div>

      {/* Main Overview Section */}
      <div className="aluminum-card border border-[#b5b8b5] subtle-soft-shadow p-6 sm:p-10 rounded-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-right">
            <h2 className="text-lg sm:text-xl font-black text-[#18191a] leading-snug">
              تعهد به دقت میلی‌متری، هوابندی مطلق و کیفیت ماندگار آلومینیوم
            </h2>
            <p className="text-xs text-[#35383c] leading-relaxed text-justify font-medium">
              شرکت نوآوران پنجره سپاهان با هدف ارتقای استانداردهای ساخت‌وساز و بهینه‌سازی انرژی در صنعت ساختمان پایه‌گذاری شده است. نما و پنجره ساختمان صرفاً یک حائل فیزیکی نیست؛ بلکه سپر حرارتی سازه و تضمین‌کننده آرامش ساکنین است.
            </p>
            <p className="text-xs text-[#55595e] leading-relaxed text-justify font-normal">
              کارخانه اختصاصی مجموعه به مساحت ۱۵۰۰ مترمربع در قطب صنعتی اصفهان، مجهز به پیشرفته‌ترین اره‌های دوکله برش زاویه‌ای، دستگاه‌های لقمه‌کوب هیدرولیک و ایستگاه‌های تست آب‌بندی تحت فشار است که امکان تحویل روزانه ده‌ها مترمربع پنجره ترمال‌بریک و یونیت‌های کرتین‌وال را فراهم می‌سازد.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#b5b8b5]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#18191a]">
                <CheckCircle2 className="w-4 h-4 text-[#18191a] shrink-0" />
                <span>آلیاژ ۶۰۶۳ سختی استاندارد</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#18191a]">
                <CheckCircle2 className="w-4 h-4 text-[#18191a] shrink-0" />
                <span>پلی‌آمید اصل ضدحریق آلمانی</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#18191a]">
                <CheckCircle2 className="w-4 h-4 text-[#18191a] shrink-0" />
                <span>تزریق گاز آرگون با خلوص ۹۰٪</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#18191a]">
                <CheckCircle2 className="w-4 h-4 text-[#18191a] shrink-0" />
                <span>۱۰ سال گارانتی کتبی شرکتی</span>
              </div>
            </div>
          </div>

          <div className="border border-[#b5b8b5] h-80 sm:h-96 overflow-hidden bg-[#18191a]">
            <img
              src="https://arvinpanjereh.com/upload/service/742b5647-017c-4a6e-b416-a184adf97dcc.webp"
              alt="کارخانه نوآوران پنجره سپاهان"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* History & Achievements Timeline */}
      <div className="space-y-6">
        <h2 className="text-xl font-black text-[#18191a] text-right">
          مسیر تکامل و موفقیت‌های مجموعه
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {timeline.map((item, idx) => (
            <div
              key={idx}
              className="aluminum-card border border-[#b5b8b5] p-5 space-y-2 rounded-none text-right subtle-soft-shadow"
            >
              <span className="text-xl font-black text-[#18191a] font-mono block border-b border-[#b5b8b5] pb-2">
                {item.year}
              </span>
              <h3 className="text-xs font-bold text-[#18191a]">{item.title}</h3>
              <p className="text-[11px] text-[#55595e] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
