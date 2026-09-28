"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectItem } from '@/lib/db';
import { FilterChips } from '@/components/ui/FilterChips';
import { ArrowLeft, MapPin } from 'lucide-react';
import { withBasePath } from '@/lib/media';

export function ProjectsListClient({ projects }: { projects: ProjectItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: `همه پروژه‌ها (${projects.length})` },
    { id: 'بانکی و دولتی', label: 'بانکی و دولتی' },
    { id: 'تجاری و اداری', label: 'تجاری و اداری' },
    { id: 'مسکونی و ویلایی', label: 'مسکونی و ویلایی' },
    { id: 'تعاونی و مجتمع‌ها', label: 'تعاونی و مجتمع‌ها' }
  ];

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category.includes(activeCategory) || activeCategory.includes(p.category));

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-12 space-y-8" dir="rtl">
      <div className="flex justify-center">
        <FilterChips 
          categories={categories} 
          activeCategory={activeCategory} 
          onChange={setActiveCategory} 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map(p => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className="group bg-ink-950 border border-ink-800 rounded-xl overflow-hidden metal-shadow hover:border-signal-500/50 transition-colors flex flex-col h-full"
          >
            <div className="relative aspect-[4/3] w-full bg-ink-900 overflow-hidden">
              <Image 
                src={withBasePath(p.image)} 
                alt={p.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent opacity-80" />
              <div className="absolute top-3 right-3 px-2.5 py-1 bg-ink-900/80 backdrop-blur text-white text-[10px] font-bold rounded-lg border border-white/10">
                {p.category}
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-grow text-right">
              <h2 className="text-base font-black text-white group-hover:text-signal-500 transition-colors line-clamp-1 font-vazir mb-3">
                {p.title}
              </h2>
              
              <div className="space-y-2 mt-auto">
                <div className="flex items-center gap-2 text-steel-400 text-xs font-vazir">
                  <MapPin className="w-4 h-4 shrink-0 text-signal-500" />
                  <span className="line-clamp-1">{p.location || 'اصفهان'}</span>
                </div>
                <div className="flex items-center gap-2 text-steel-400 text-xs font-vazir">
                  <span className="w-4 h-4 flex items-center justify-center shrink-0 font-bold bg-signal-500/20 text-signal-500 rounded text-[9px] font-mono">VS</span>
                  <span className="line-clamp-1">{p.systemsUsed?.join('، ')}</span>
                </div>
              </div>
              
              <div className="mt-5 pt-4 border-t border-ink-800 flex items-center justify-between text-steel-300 group-hover:text-signal-500 transition-colors text-xs font-bold font-vazir">
                <span>مشاهده تصاویر پروژه</span>
                <ArrowLeft className="w-4 h-4 -scale-x-100" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
