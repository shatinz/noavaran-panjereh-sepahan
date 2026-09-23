'use client';

import React, { useState } from 'react';
import { ProjectItem } from '@/lib/db';
import { Building2, MapPin, Layers, X, ZoomIn, Sparkles } from 'lucide-react';

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
    <div className="space-y-8 overflow-x-hidden">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-bronze-500 text-charcoal-950 shadow-md shadow-bronze-500/20 scale-105'
                : 'bg-charcoal-900 text-titanium-300 hover:text-white border border-charcoal-800'
            }`}
          >
            {cat} {cat === 'همه' ? `(${projects.length})` : ''}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <div
            key={p.id}
            onClick={() => setActiveModalProject(p)}
            className="group rounded-2xl bg-charcoal-900 border border-charcoal-800 hover:border-bronze-500/50 overflow-hidden cursor-pointer transition-all duration-300 shadow-md flex flex-col justify-between min-w-0"
          >
            <div className="relative h-64 w-full bg-charcoal-850 overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 block"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              
              {/* HD Quality Badge */}
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-bronze-500/90 text-charcoal-950 text-[10px] font-black tracking-wider shadow-sm flex items-center gap-1 backdrop-blur-sm">
                <Sparkles className="w-2.5 h-2.5" />
                HD
              </span>

              <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded bg-charcoal-950/80 backdrop-blur-md text-[10px] text-bronze-300 border border-charcoal-700">
                {p.category}
              </span>
            </div>

            <div className="p-4 space-y-1.5 min-w-0">
              <h3 className="text-xs font-bold text-white group-hover:text-bronze-400 transition-colors line-clamp-1">
                {p.title}
              </h3>
              <p className="text-[11px] text-titanium-400 line-clamp-2 leading-relaxed">
                {p.description}
              </p>
              <div className="pt-2 flex items-center justify-between text-[10px] text-titanium-500 border-t border-charcoal-800/80">
                <span>{p.year}</span>
                <span className="text-bronze-400 font-medium group-hover:underline">مشاهده مشخصات و عکس</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal Preview */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 bg-charcoal-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="bg-charcoal-900 border border-charcoal-700 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Showcase with Ambient Backdrop */}
            <div className="relative h-80 sm:h-96 w-full bg-charcoal-950 flex items-center justify-center overflow-hidden">
              {/* Ambient blurred backdrop for immersion */}
              <div
                className="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-25 scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${activeModalProject.image})` }}
              />

              {/* Clean block image container adhering to RTL WebKit standards */}
              <img
                src={activeModalProject.image}
                alt={activeModalProject.title}
                className="block mx-auto max-h-full max-w-full object-contain relative z-10 drop-shadow-2xl"
              />

              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 left-4 z-20 p-2 rounded-full bg-charcoal-950/80 text-white hover:bg-charcoal-900 transition-colors border border-charcoal-700 shadow-md"
                aria-label="بستن"
              >
                <X className="w-5 h-5" />
              </button>

              {/* HD Tag */}
              <span className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-lg bg-bronze-500 text-charcoal-950 text-xs font-black tracking-wider flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3" />
                کیفیت برتر HD
              </span>

              {/* Category Badge */}
              <span className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded-lg bg-charcoal-950/90 text-xs font-bold text-bronze-400 border border-charcoal-700 backdrop-blur-md shadow-md">
                {activeModalProject.category}
              </span>

              {/* Direct Full-Screen Link */}
              <a
                href={activeModalProject.image}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-charcoal-950/90 text-[11px] font-semibold text-titanium-200 hover:text-white border border-charcoal-700 backdrop-blur-md shadow-md hover:border-bronze-500 transition-colors"
              >
                <ZoomIn className="w-3.5 h-3.5 text-bronze-400" />
                <span>مشاهده ابعاد اصلی</span>
              </a>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-white">{activeModalProject.title}</h2>
              <p className="text-xs text-titanium-300 leading-relaxed">
                {activeModalProject.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-charcoal-850 border border-charcoal-800 min-w-0">
                  <span className="text-titanium-400 text-[10px] block">کارفرما / سفارش‌دهنده:</span>
                  <span className="text-white font-semibold mt-0.5 block truncate">{activeModalProject.client}</span>
                </div>
                <div className="p-3 rounded-xl bg-charcoal-850 border border-charcoal-800 min-w-0">
                  <span className="text-titanium-400 text-[10px] block">سیستم‌های نصب‌شده:</span>
                  <span className="text-white font-semibold mt-0.5 block truncate">{activeModalProject.systemsUsed.join('، ')}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <span className="text-xs text-titanium-400 font-mono">
                  سال اجرا: {activeModalProject.year}
                </span>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-titanium-200 text-xs font-semibold transition-colors"
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
