'use client';

import React, { useState } from 'react';
import { ProjectItem } from '@/lib/db';
import { Building2, MapPin, Layers, X, ZoomIn, Sparkles, ArrowLeft } from 'lucide-react';

interface Props {
  projects: ProjectItem[];
}

export default function ProjectsGallery({ projects }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = ['همه', 'بانکی و دولتی', 'تجاری و اداری', 'مسکونی و ویلایی', 'تعاونی و برج‌ها'];

  const filtered = selectedCategory === 'همه'
    ? projects
    : projects.filter((p) => p.category.includes(selectedCategory) || selectedCategory.includes(p.category));

  return (
    <div className="space-y-6 overflow-x-hidden">
      {/* Category Tabs */}
      <div className="aluminum-card sharp frame-shadow p-3 border border-[#b0b3b0] flex flex-wrap items-center justify-center gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`sharp px-3.5 py-1.5 text-xs font-black transition-all border ${
              selectedCategory === cat
                ? 'bg-[#18191a] text-white border-black shadow-sm'
                : 'bg-[#cbcccb] text-black border-[#888] hover:bg-[#b8bab8]'
            }`}
          >
            {cat} {cat === 'همه' ? `(${projects.length})` : ''}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            onClick={() => setActiveModalProject(p)}
            className="aluminum-card sharp frame-shadow p-3 border border-[#b0b3b0] overflow-hidden cursor-pointer flex flex-col justify-between min-w-0 text-right group hover:border-black transition-colors"
          >
            <div className="relative h-60 w-full bg-black sharp overflow-hidden border border-black/20 frame-shadow">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 block"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              
              {/* HD Quality Badge */}
              <span className="absolute top-2 left-2 px-2 py-0.5 sharp bg-[#18191a] text-white text-[10px] font-black tracking-wider shadow-sm flex items-center gap-1 border border-black">
                <Sparkles className="w-2.5 h-2.5 text-cyan-300" />
                HD
              </span>

              <span className="absolute top-2 right-2 px-2 py-0.5 sharp bg-white text-black text-[10px] font-bold border border-black">
                {p.category}
              </span>
            </div>

            <div className="pt-3 space-y-1.5 min-w-0">
              <h3 className="text-xs font-black text-black group-hover:text-black transition-colors line-clamp-1">
                {p.title}
              </h3>
              <p className="text-[11px] text-[#333] line-clamp-2 leading-relaxed font-medium">
                {p.description}
              </p>
              <div className="pt-2 flex items-center justify-between text-[10px] text-[#444] border-t border-[#a8aba8] font-bold">
                <span className="font-mono">{p.year}</span>
                <span className="text-black font-black flex items-center gap-1">
                  <span>مشاهده جزئیات</span>
                  <ArrowLeft className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal Preview */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="aluminum-card sharp frame-shadow max-w-2xl w-full border border-black overflow-hidden flex flex-col text-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Showcase */}
            <div className="relative h-80 sm:h-96 w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.title}
                className="block mx-auto max-h-full max-w-full object-contain relative z-10"
              />

              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-3 left-3 z-20 p-1.5 sharp bg-white text-black hover:bg-gray-200 transition-colors border border-black shadow-md"
                aria-label="بستن"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Category Badge */}
              <span className="absolute bottom-3 right-3 z-20 px-3 py-1 sharp bg-[#18191a] text-xs font-black text-white border border-black shadow-md">
                {activeModalProject.category}
              </span>

              {/* Direct Full-Screen Link */}
              <a
                href={activeModalProject.image}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 left-3 z-20 inline-flex items-center gap-1.5 px-3 py-1 sharp bg-white text-[11px] font-bold text-black border border-black shadow-md hover:bg-gray-100 transition-colors"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>مشاهده عکس اصلی</span>
              </a>
            </div>

            <div className="p-5 sm:p-6 space-y-3 bg-[#cbcccb]">
              <h3 className="text-base font-black text-black">
                {activeModalProject.title}
              </h3>
              <p className="text-xs text-[#333] leading-relaxed font-medium">
                {activeModalProject.description}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="p-2.5 sharp bg-[#b8bab8] border border-[#9ea19e] min-w-0">
                  <span className="text-[#444] text-[10px] block font-bold">کارفرما / سفارش‌دهنده:</span>
                  <span className="text-black font-black mt-0.5 block truncate">{activeModalProject.client}</span>
                </div>
                <div className="p-2.5 sharp bg-[#b8bab8] border border-[#9ea19e] min-w-0">
                  <span className="text-[#444] text-[10px] block font-bold">سیستم‌های نصب‌شده:</span>
                  <span className="text-black font-black mt-0.5 block truncate">{activeModalProject.systemsUsed.join('، ')}</span>
                </div>
              </div>

              <div className="pt-3 flex justify-between items-center border-t border-[#a8aba8]">
                <span className="text-xs text-[#444] font-mono font-bold">
                  سال اجرا: {activeModalProject.year}
                </span>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-5 py-2 sharp bg-[#18191a] hover:bg-[#333] text-white text-xs font-bold border border-black transition-colors"
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
