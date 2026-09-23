'use client';

import React, { useState } from 'react';
import { ProjectItem } from '@/lib/db';
import { Building2, MapPin, Layers, X } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-[3px] text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-[#1a1a1a] text-white shadow-card'
                : 'aluminum-surface text-[#555] hover:text-[#1a1a1a] border border-[#b5b8b5]'
            }`}
          >
            {cat} {cat === 'همه' ? `(${projects.length})` : ''}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((p) => (
          <div
            key={p.id}
            onClick={() => setActiveModalProject(p)}
            className="group rounded-[3px] aluminum-surface border border-[#b5b8b5] hover:border-[#888] overflow-hidden cursor-pointer transition-all duration-300 shadow-card hover:shadow-card-hover flex flex-col justify-between"
          >
            <div className="relative h-52 w-full bg-[#e0e0e0] overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-[2px] bg-[#1a1a1a]/80 backdrop-blur-md text-[10px] text-white border border-white/10">
                {p.category}
              </span>
            </div>

            <div className="p-4 space-y-1.5">
              <h3 className="text-xs font-bold text-[#1a1a1a] group-hover:underline transition-colors line-clamp-1">
                {p.title}
              </h3>
              <p className="text-[11px] text-[#555] line-clamp-2 leading-relaxed">
                {p.description}
              </p>
              <div className="pt-2 flex items-center justify-between text-[10px] text-[#888] border-t border-[#b5b8b5]">
                <span>{p.year}</span>
                <span className="text-[#1a1a1a] font-bold">مشاهده جزئیات</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal Preview */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="aluminum-surface border border-[#b5b8b5] rounded-[3px] max-w-2xl w-full overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-80 w-full bg-[#e0e0e0]">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 left-4 p-2 rounded-full bg-[#1a1a1a]/80 text-white hover:bg-[#333] transition-colors"
                aria-label="بستن"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="absolute bottom-4 right-4 px-3 py-1 rounded-[2px] bg-[#1a1a1a]/90 text-xs font-bold text-white border border-white/10">
                {activeModalProject.category}
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#1a1a1a]">{activeModalProject.title}</h2>
              <p className="text-xs text-[#555] leading-relaxed">
                {activeModalProject.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-[3px] bg-white/30 border border-[#b5b8b5]">
                  <span className="text-[#888] text-[10px] block">کارفرما / سفارش‌دهنده:</span>
                  <span className="text-[#1a1a1a] font-semibold mt-0.5 block">{activeModalProject.client}</span>
                </div>
                <div className="p-3 rounded-[3px] bg-white/30 border border-[#b5b8b5]">
                  <span className="text-[#888] text-[10px] block">سیستم‌های نصب‌شده:</span>
                  <span className="text-[#1a1a1a] font-semibold mt-0.5 block">{activeModalProject.systemsUsed.join('، ')}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-5 py-2.5 rounded-[3px] bg-[#1a1a1a] hover:bg-[#333] text-white text-xs font-semibold transition-colors"
                >
                  بستن پنجره
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
