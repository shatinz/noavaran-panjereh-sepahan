import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices } from '@/lib/db';
import { ArrowLeft, CheckCircle2, ShieldCheck, FileText, Phone, Calculator, ChevronRight } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-titanium-400">
        <Link href="/" className="hover:text-white">صفحه اصلی</Link>
        <ChevronRight className="w-3.5 h-3.5 rotate-180" />
        <Link href="/services" className="hover:text-white">خدمات و سیستم‌ها</Link>
        <ChevronRight className="w-3.5 h-3.5 rotate-180" />
        <span className="text-bronze-400 font-medium">{service.title}</span>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-charcoal-900 border border-charcoal-800 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-bronze-400">
              {service.titleEn}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {service.title}
            </h1>
            <p className="text-sm text-titanium-300 leading-relaxed text-justify">
              {service.summary}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/calculator"
                className="px-5 py-3 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-bronze-500/20 transition-all"
              >
                <Calculator className="w-4 h-4 text-charcoal-950" />
                <span>برآورد آنلاین متراژ و قیمت</span>
              </Link>
              <a
                href="tel:0314144"
                className="px-5 py-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-titanium-200 border border-charcoal-700 text-xs font-mono flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-bronze-400" />
                <span>استعلام تلفنی: ۰۳۱-۴۱۴۴</span>
              </a>
            </div>
          </div>

          <div className="relative min-h-[300px] lg:min-h-[420px] bg-charcoal-850">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-charcoal-900 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* System Features & Subcategories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Description & Subcategories */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Advantages */}
          <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-8 space-y-6">
            <h2 className="text-lg font-bold text-white border-r-2 border-bronze-500 pr-3">
              مزایای فنی و ویژگی‌های مهندسی
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-charcoal-850/60 border border-charcoal-800">
                  <CheckCircle2 className="w-4 h-4 text-bronze-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-titanium-200 leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subcategories */}
          {service.subcategories && service.subcategories.length > 0 && (
            <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-8 space-y-6">
              <h2 className="text-lg font-bold text-white border-r-2 border-bronze-500 pr-3">
                انواع تیپ‌ها و زیرسیستم‌های اجرایی
              </h2>
              <div className="space-y-4">
                {service.subcategories.map((sub, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-charcoal-850 border border-charcoal-800 space-y-1.5">
                    <h3 className="text-sm font-bold text-bronze-300">{sub.name}</h3>
                    <p className="text-xs text-titanium-400 leading-relaxed">{sub.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Tech Specs Table & Fast Contact */}
        <div className="space-y-8">
          {/* Specs Table */}
          <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white border-r-2 border-bronze-500 pr-2">
              جدول مشخصات فنی پروفیل
            </h3>
            <div className="space-y-3 pt-2">
              {Object.entries(service.technicalSpecs || {}).map(([key, val]) => (
                <div key={key} className="flex flex-col pb-2 border-b border-charcoal-800 text-xs">
                  <span className="text-titanium-400 text-[11px]">{key}</span>
                  <span className="text-white font-medium mt-0.5">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fast Consultation Box */}
          <div className="rounded-2xl bg-gradient-to-b from-charcoal-850 to-charcoal-900 border border-bronze-500/30 p-6 space-y-4 text-center">
            <ShieldCheck className="w-8 h-8 text-bronze-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">مشاوره تخصصی و متره برآورد</h4>
            <p className="text-xs text-titanium-400 leading-relaxed">
              جهت بررسی نقشه‌های معماری فاز ۲ و ارسال پیش‌فاکتور رسمی با تیم مهندسی تماس بگیرید.
            </p>
            <a
              href="tel:0314144"
              className="block w-full py-3 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 font-bold text-xs transition-colors font-mono"
            >
              تماس: ۰۳۱-۴۱۴۴
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
