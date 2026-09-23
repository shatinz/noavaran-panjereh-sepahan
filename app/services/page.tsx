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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-bronze-400 uppercase tracking-widest">
          سیستم‌های مهندسی نما و پنجره
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
          سبد کامل خدمات و محصولات نوآوران پنجره سپاهان
        </h1>
        <p className="mt-4 text-sm text-titanium-300 leading-relaxed">
          طراحی محاسباتی، نقشه‌کشی فاز ۲، ساخت دقیق کارخانه‌ای و اجرای در محل با استفاده از مرغوب‌ترین بیلت‌های آلومینیوم ۶۰۶۳ و یراق‌آلات اصیل اروپایی.
        </p>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s) => {
          const IconComponent = iconMap[s.icon] || Building2;
          return (
            <div
              key={s.id}
              className="rounded-2xl bg-charcoal-900 border border-charcoal-800 hover:border-bronze-500/50 transition-all duration-300 overflow-hidden flex flex-col group shadow-lg"
            >
              <div className="relative h-56 w-full bg-charcoal-850 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/30 to-transparent" />
                <div className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-charcoal-950/80 backdrop-blur-md text-bronze-400 border border-charcoal-700">
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-white group-hover:text-bronze-400 transition-colors">
                    {s.title}
                  </h2>
                  <p className="text-xs text-titanium-400 mt-2 line-clamp-3 leading-relaxed">
                    {s.summary}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-charcoal-800">
                  <div className="text-[11px] font-bold text-titanium-300">ویژگی‌های فنی برجسته:</div>
                  {s.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-titanium-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-bronze-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{f}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/services/${s.slug}`}
                  className="pt-3 inline-flex items-center justify-between text-xs font-bold text-bronze-400 hover:text-bronze-300 group/link"
                >
                  <span>مشاهده مشخصات کامل و مقاطع</span>
                  <ArrowLeft className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
