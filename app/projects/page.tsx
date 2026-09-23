import React from 'react';
import { getProjects } from '@/lib/db';
import ProjectsGallery from '@/components/ProjectsGallery';
import { Award } from 'lucide-react';

export const metadata = {
  title: 'پروژه‌های شاخص و کارنامه اجرایی | نوآوران پنجره سپاهان',
  description: 'آرشیو تصویری پروژه‌های شاخص ساختمانی، شعب بانک، تعاونی‌های مسکن، مجتمع‌های تجاری و ویلاهای لوکس اجرا شده.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 py-4 space-y-5">
      {/* Header (Brushed Aluminum Sharp) */}
      <section className="aluminum-card sharp frame-shadow p-6 sm:p-10 border border-[#b0b3b0] text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18191a] text-white text-[11px] font-bold sharp border border-black shadow-sm">
          <Award className="w-4 h-4 text-[#cbcccb]" />
          <span>کارنامه مهندسی و رزومه پروژه‌های شاخص</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight leading-tight">
          آرشیو ۵۰+ پروژه شاخص نوآوران پنجره سپاهان
        </h1>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#333] leading-relaxed font-medium">
          بیش از ۵۰ پروژه برجسته دولتی، بانکی، تجاری و ویلایی در اصفهان و سایر استان‌ها که با بالاترین کیفیت مهندسی و استانداردهای عایق‌بندی تولید و نصب شده‌اند.
        </p>
      </section>

      <ProjectsGallery projects={projects} />
    </div>
  );
}
