import React from 'react';
import Link from 'next/link';
import { getServices } from '@/lib/db';
import { ArrowLeft, CheckCircle2, Building2, ShieldCheck, Layers, Grid, Maximize, Box, TreePine } from 'lucide-react';

export const metadata = {
  title: 'سبد محصولات و خدمات مهندسی | نوآوران پنجره سپاهان',
  description: 'سیستم‌های نمای کرتین وال (لامل)، فریم‌لس، پنجره‌های دوجداره آلومینیوم ترمال‌بریک، کامپوزیت و چوب ترموود.',
};

export default async function ServicesPage() {
  const services = await getServices();

  const iconMap: Record<string, any> = {
    Grid: Grid,
    Layers: Layers,
    Maximize: Maximize,
    Box: Box,
    TreePine: TreePine,
    ShieldCheck: ShieldCheck
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 py-4 space-y-5">
      {/* Header */}
      <section className="aluminum-card sharp frame-shadow p-6 sm:p-10 border border-[#b0b3b0] text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18191a] text-white text-[11px] font-bold sharp border border-black shadow-sm">
          <Layers className="w-4 h-4 text-[#cbcccb]" />
          <span>سیستم‌های ۶ گانه مهندسی نما و پنجره</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight leading-tight">
          سبد کامل خدمات و محصولات نوآوران پنجره سپاهان
        </h1>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#333] leading-relaxed font-medium">
          طراحی محاسباتی، نقشه‌کشی فاز ۲، ساخت دقیق کارخانه‌ای و اجرای در محل با استفاده از مرغوب‌ترین بیلت‌های آلومینیوم ۶۰۶۳ و یراق‌آلات اصیل اروپایی.
        </p>
      </section>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => {
          const IconComponent = iconMap[s.icon] || Building2;
          return (
            <div
              key={s.id}
              className="aluminum-card sharp frame-shadow p-3.5 border border-[#b0b3b0] overflow-hidden flex flex-col justify-between group text-right hover:border-black transition-colors"
            >
              <div>
                <div className="relative h-52 w-full bg-black sharp overflow-hidden border border-black/20 frame-shadow">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 right-2.5 p-2 sharp bg-white text-black border border-black shadow-sm">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                <div className="pt-3 space-y-2">
                  <h2 className="text-sm font-black text-black group-hover:text-black transition-colors">
                    {s.title}
                  </h2>
                  <p className="text-[11.5px] text-[#333] line-clamp-3 leading-relaxed font-medium">
                    {s.summary}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 mt-3 border-t border-[#a8aba8]">
                  <div className="text-[10px] font-bold text-black">ویژگی‌های فنی برجسته:</div>
                  {s.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#333] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#a8aba8]">
                <Link
                  href={`/services/${s.slug}`}
                  className="w-full py-2 px-3 sharp bg-[#18191a] hover:bg-[#333] text-white text-xs font-bold flex items-center justify-between border border-black transition-colors"
                >
                  <span>مشاهده مشخصات کامل و مقاطع</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
