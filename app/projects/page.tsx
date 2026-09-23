import React from 'react';
import { getProjects } from '@/lib/db';
import ProjectsGallery from '@/components/ProjectsGallery';

export const metadata = {
  title: 'پروژه‌های شاخص و کارنامه اجرایی | نوآوران پنجره سپاهان',
  description: 'آرشیو تصویری پروژه‌های شاخص ساختمانی، شعب بانک، تعاونی‌های مسکن، مجتمع‌های تجاری و ویلاهای لوکس اجرا شده.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="aluminum-header px-3.5 py-1 text-xs font-bold text-[#1a1a1a] uppercase tracking-wider inline-block border border-[#b5b8b5] rounded-[3px] shadow-sm">
          کارنامه معتبر مهندسی
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a1a] mt-3">
          آرشیو پروژه‌های شاخص نوآوران پنجره سپاهان
        </h1>
        <p className="mt-4 text-sm text-[#444] leading-relaxed">
          بیش از ۵۰ پروژه برجسته دولتی، بانکی، تجاری و ویلایی در اصفهان و سایر استان‌ها که با بالاترین کیفیت مهندسی و استانداردهای عایق‌بندی به بهره‌برداری رسیده‌اند.
        </p>
      </div>

      <ProjectsGallery projects={projects} />
    </div>
  );
}
