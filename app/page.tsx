import React from "react";
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ProofStrip } from "@/components/home/ProofStrip";
import { Services } from "@/components/home/Services";
import { SystemsGrid } from "@/components/home/SystemsGrid";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Process } from "@/components/home/Process";
import { DistributionMap } from "@/components/home/DistributionMap";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "نوآوران پنجره سپاهان | طراحی و تولید نمای مدرن و پنجره ترمال‌بریک",
  description: "طراحی محاسباتی، تولید صنعتی در کارخانه ۱۵۰۰ متری و اجرای نماهای مدرن شیشه‌ای کرتین‌وال (لامل و فریم‌لس)، درب و پنجره دوجداره آلومینیوم ترمال‌بریک، سیستم جام‌بالکنی و پنل کامپوزیت در اصفهان و سراسر ایران.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "پنجره آلومینیوم ترمال‌بریک چیست و چه مزیتی نسبت به پنجره‌های معمولی دارد؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "پنجره آلومینیوم ترمال‌بریک (Thermal Break) مجهز به یک تیغه پلی‌آمید تقویت‌شده میان لایه‌های داخلی و خارجی پروفیل آلومینیوم است. این ساختار انتقال حرارت و صوت را به حداقل رسانده و از هدررفت انرژی تا ۴۵٪ جلوگیری می‌کند؛ در نتیجه کاملاً ضد تعریق، عایق صوتی و عایق سرما و گرما می‌باشد."
        }
      },
      {
        "@type": "Question",
        "name": "تفاوت نمای کرتین‌وال (Curtain Wall) لامل با نمای فریم‌لس چیست؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "نمای کرتین‌وال لامل یک سیستم سازه‌ای خودایستا با ستون‌ها (Mullion) و تیرهای افقی (Transom) آلومینیومی مستحکم است که بارهای باد و زلزله را دفع می‌کند. در مدل فریم‌لس، شیشه‌ها بدون درپوش‌های خارجی آلومینیومی در کنار هم قرار گرفته و نمای خارجی یکدست تمام‌شیشه‌ای را پدید می‌آورند."
        }
      },
      {
        "@type": "Question",
        "name": "سیستم شیشه بالکن تاشو (جام‌بالکنی) چگونه عمل می‌کند؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "سیستم جام‌بالکنی متشکل از پنل‌های شیشه سکوریت ۸ تا ۱۰ میلی‌متری است که روی ریل‌های آلومینیومی حرکت کرده و در گوشه بالکن به صورت آکاردئونی جمع می‌شوند. این سیستم عایق گرد و غبار، برف، باران و آلودگی صوتی بوده و هیچ مانع دیداری در حالت باز یا بسته ایجاد نمی‌کند."
        }
      },
      {
        "@type": "Question",
        "name": "نحوه استعلام قیمت و صدور پیش‌فاکتور به چه صورت است؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "کارفرمایان و مهندسان محترم می‌توانند از طریق محاسبه‌گر آنلاین سایت متراژ تقریبی را وارد نموده و پیش‌فاکتور تخمینی دریافت کنند، یا نقشه‌های اجرایی فاز ۲ و ابعاد دهانه‌ها را به واتساپ مهندسی شرکت (۰۹۳۰۱۵۴۵۸۵۸) یا شماره ۳۳۶۸۷۷۵۵-۰۳۱ ارسال کنند تا دفتر فنی ظرف ۲۴ ساعت پیشنهاد قیمت دقیق و نقشه‌های اولیه شاپ دراوینگ را آماده کند."
        }
      },
      {
        "@type": "Question",
        "name": "آیا نوآوران پنجره سپاهان امکان اجرای پروژه‌ها در سایر شهرهای ایران را دارد؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "بله؛ کارخانه نوآوران پنجره سپاهان با ناوگان لجستیک اختصاصی و تیم‌های مجرب نصب، پروژه‌های نما و پنجره را در تمامی کلان‌شهرها از جمله تهران، مشهد، شیراز، تبریز، کرج، اهواز، بوشهر و بنادر جنوبی به صورت کلیدتحویل اجرا و پشتیبانی می‌نماید."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-transparent overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Hero />
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
      <CtaBand />
    </main>
  );
}
