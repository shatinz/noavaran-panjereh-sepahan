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
    <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 py-4 space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-[#555] font-bold">
        <Link href="/" className="hover:text-black">صفحه اصلی</Link>
        <ChevronRight className="w-3.5 h-3.5 rotate-180" />
        <Link href="/services" className="hover:text-black">خدمات و سیستم‌ها</Link>
        <ChevronRight className="w-3.5 h-3.5 rotate-180" />
        <span className="text-black font-black">{service.title}</span>
      </div>

      {/* Hero Banner */}
      <div className="aluminum-card sharp frame-shadow border border-[#b0b3b0] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-6 sm:p-10 flex flex-col justify-center space-y-4 text-right">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#444] font-bold">
              {service.titleEn}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-black leading-tight">
              {service.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#333] leading-relaxed font-medium text-justify">
              {service.summary}
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <Link
                href="/calculator"
                className="px-5 py-2.5 sharp bg-[#18191a] hover:bg-[#333] text-white font-bold text-xs flex items-center gap-2 border border-black shadow-sm transition-all"
              >
                <Calculator className="w-4 h-4 text-[#cbcccb]" />
                <span>برآورد آنلاین متراژ و قیمت</span>
              </Link>
              <a
                href="tel:03133687755"
                className="px-5 py-2.5 sharp bg-white hover:bg-gray-100 text-black border border-black text-xs font-mono font-bold flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-black" />
                <span>استعلام تلفنی: ۰۳۱-۳۳۶۸۷۷۵۵</span>
              </a>
            </div>
          </div>

          <div className="relative min-h-[280px] lg:min-h-[380px] bg-black sharp overflow-hidden border-t lg:border-t-0 lg:border-r border-[#b0b3b0]">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/50 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* System Features & Subcategories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Description & Subcategories */}
        <div className="lg:col-span-2 space-y-5 text-right">
          {/* Key Advantages */}
          <div className="aluminum-card sharp frame-shadow p-6 space-y-4 border border-[#b0b3b0]">
            <h2 className="text-sm font-black text-black border-r-2 border-black pr-2">
              مزایای فنی و ویژگی‌های مهندسی
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 sharp bg-[#b8bab8] border border-[#9ea19e]">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <span className="text-xs text-black font-medium leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subcategories */}
          {service.subcategories && service.subcategories.length > 0 && (
            <div className="aluminum-card sharp frame-shadow p-6 space-y-4 border border-[#b0b3b0]">
              <h2 className="text-sm font-black text-black border-r-2 border-black pr-2">
                انواع تیپ‌ها و زیرسیستم‌های اجرایی
              </h2>
              <div className="space-y-3">
                {service.subcategories.map((sub, idx) => (
                  <div key={idx} className="p-3.5 sharp bg-[#b8bab8] border border-[#9ea19e] space-y-1">
                    <h3 className="text-xs font-black text-black">{sub.name}</h3>
                    <p className="text-[11px] text-[#333] leading-relaxed font-medium">{sub.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Tech Specs Table & Fast Contact */}
        <div className="space-y-5 text-right">
          {/* Specs Table */}
          <div className="aluminum-card sharp frame-shadow p-5 space-y-3 border border-[#b0b3b0]">
            <h3 className="text-xs font-black text-black border-r-2 border-black pr-2">
              جدول مشخصات فنی پروفیل
            </h3>
            <div className="space-y-2 pt-1">
              {Object.entries(service.technicalSpecs || {}).map(([key, val]) => (
                <div key={key} className="flex flex-col pb-2 border-b border-[#a8aba8] text-xs">
                  <span className="text-[#444] text-[10px] font-bold">{key}</span>
                  <span className="text-black font-mono font-bold mt-0.5">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fast Consultation Box */}
          <div className="aluminum-card sharp frame-shadow p-5 space-y-3 text-center border border-[#b0b3b0]">
            <ShieldCheck className="w-7 h-7 text-black mx-auto" />
            <h4 className="text-xs font-black text-black">مشاوره تخصصی و متره برآورد</h4>
            <p className="text-[11px] text-[#333] leading-relaxed font-medium">
              جهت بررسی نقشه‌های معماری فاز ۲ و ارسال پیش‌فاکتور رسمی با تیم مهندسی تماس بگیرید.
            </p>
            <a
              href="tel:03133687755"
              className="block w-full py-2.5 sharp bg-[#18191a] hover:bg-[#333] text-white font-bold text-xs transition-colors font-mono border border-black shadow-sm"
            >
              تماس: ۰۳۱-۳۳۶۸۷۷۵۵
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
