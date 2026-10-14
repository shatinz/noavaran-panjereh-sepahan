import React from "react";
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ProofStrip } from "@/components/home/ProofStrip";
import { Services } from "@/components/home/Services";
import { SystemsGrid } from "@/components/home/SystemsGrid";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Process } from "@/components/home/Process";
import { DistributionMap } from "@/components/home/DistributionMap";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaBand } from "@/components/home/CtaBand";
import { getProjects, getSettings } from "@/lib/db";

export const metadata: Metadata = {
  title: "نوآوران پنجره | کارخانه تولید پنجره دوجداره ترمال‌بریک و کرتین‌وال",
  description: "کارخانه نوآوران پنجره (شرکت نوآوران پنجره سپاهان)؛ طراحی محاسباتی و تولید تخصصی انواع درب و پنجره دوجداره آلومینیوم ترمال‌بریک، نمای شیشه‌ای کرتین‌وال لامل و جام‌بالکنی در سراسر ایران.",
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const [settings, projects] = await Promise.all([getSettings(), getProjects()]);

  const faqItems = [
    {
      question: "نام رسمی و برند کارخانه نوآوران پنجره چیست؟",
      answer: "نام رسمی و ثبت‌شده این مجموعه صنعتی، «شرکت نوآوران پنجره سپاهان» (شماره ثبت ۳۸۹۲ و شناسه ملی ۱۴۰۱۵۰۲۶۲۳۰) است که در بازار تخصصی ساختمان و نزد معماران با نام «نوآوران پنجره» (و گاهی به صورت املایی نواروان پنجره) شناخته می‌شود. این شرکت در زمینه طراحی مهندسی، تولید کارخانه‌ای و اجرای انواع پنجره‌های آلومینیوم ترمال‌بریک و نماهای مدرن کرتین‌وال فعالیت دارد.",
    },
    {
      question: "پنجره آلومینیوم ترمال‌بریک چیست و چه مزیتی نسبت به پنجره‌های معمولی دارد؟",
      answer: "پنجره آلومینیوم ترمال‌بریک (Thermal Break) مجهز به یک تیغه پلی‌آمید تقویت‌شده میان لایه‌های داخلی و خارجی پروفیل آلومینیوم است. این ساختار انتقال حرارت و صوت را به حداقل رسانده و از هدررفت انرژی تا ۴۵٪ جلوگیری می‌کند؛ در نتیجه کاملاً ضد تعریق، عایق صوتی و عایق سرما و گرما می‌باشد.",
    },
    {
      question: "تفاوت نمای کرتین‌وال (Curtain Wall) لامل با نمای فریم‌لس چیست؟",
      answer: "نمای کرتین‌وال لامل یک سیستم سازه‌ای خودایستا با ستون‌ها (Mullion) و تیرهای افقی (Transom) آلومینیومی مستحکم است که بارهای باد و زلزله را دفع می‌کند. در مدل فریم‌لس، شیشه‌ها بدون درپوش‌های خارجی آلومینیومی در کنار هم قرار گرفته و نمای خارجی یکدست تمام‌شیشه‌ای را پدید می‌آورند.",
    },
    {
      question: "سیستم شیشه بالکن تاشو (جام‌بالکنی) چگونه عمل می‌کند؟",
      answer: "سیستم جام‌بالکنی متشکل از پنل‌های شیشه سکوریت ۸ تا ۱۰ میلی‌متری است که روی ریل‌های آلومینیومی حرکت کرده و در گوشه بالکن به صورت آکاردئونی جمع می‌شوند. این سیستم عایق گرد و غبار، برف، باران و آلودگی صوتی بوده و هیچ مانع دیداری در حالت باز یا بسته ایجاد نمی‌کند.",
    },
    {
      question: "نحوه استعلام قیمت و صدور پیش‌فاکتور به چه صورت است؟",
      answer: "کارفرمایان و مهندسان محترم می‌توانند با ارسال نقشه‌های اجرایی فاز ۲ و ابعاد دهانه‌ها به واتساپ مهندسی شرکت (۰۹۳۰۱۵۴۵۸۵۸) یا تماس با دفتر فروش (۳۳۶۸۷۷۵۵-۰۳۱)، پیشنهاد قیمت دقیق و نقشه‌های اولیه شاپ دراوینگ را ظرف ۲۴ ساعت دریافت کنند.",
    },
    {
      question: "آیا نوآوران پنجره سپاهان امکان اجرای پروژه‌ها در سایر شهرهای ایران را دارد؟",
      answer: "بله؛ کارخانه نوآوران پنجره سپاهان با ناوگان لجستیک اختصاصی و تیم‌های مجرب نصب، پروژه‌های نما و پنجره را در تمامی کلان‌شهرها از جمله تهران، مشهد، شیراز، تبریز، کرج، اهواز، بوشهر و بنادر جنوبی به صورت کلیدتحویل اجرا و پشتیبانی می‌نماید.",
    },
  ];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-transparent overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Hero establishedYear={settings.establishedYear} factoryArea={String(settings.factoryArea)} projectCount={projects.length} />
      <ProofStrip />
      
      <div className="relative mt-12 md:mt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(171,0,23,0.25)_0%,_transparent_70%)] pointer-events-none" />
        <Services />
      </div>

      <div className="relative bg-gradient-to-b from-[#6b000e]/30 via-[#1e0004]/80 to-[#0a0002] border-y border-[#cbcccb]/20">
        <SystemsGrid />
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(171,0,23,0.15)_0%,_transparent_60%)] pointer-events-none" />
        <FeaturedProjects />
      </div>

      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blood-900/10 via-[#0a0002] to-[#0a0002]">
        <Process />
      </div>

      <DistributionMap />
      <FaqSection items={faqItems} />
      <CtaBand />
    </div>
  );
}
