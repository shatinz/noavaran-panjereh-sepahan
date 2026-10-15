"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectItem } from '@/lib/db';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { withBasePath } from '@/lib/media';
import { useLanguage } from '@/lib/i18n/context';
import { getLocalizedProject } from '@/lib/i18n/entities';

interface ProjectsListClientProps {
  projects: ProjectItem[];
}

export function ProjectsListClient({ projects }: ProjectsListClientProps) {
  const { dict, locale, dir, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const filters = [
    { key: 'all', label: dict.projectsPage.filterAll },
    { key: 'بانکی و دولتی', label: dict.projectsPage.filterBanking },
    { key: 'تجاری و اداری', label: dict.projectsPage.filterCommercial },
    { key: 'مسکونی و ویلایی', label: dict.projectsPage.filterResidential },
    { key: 'تعاونی و برج‌ها', label: dict.projectsPage.filterCoop },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div dir={dir}>
      <Breadcrumbs items={[{ label: dict.nav.projects }]} />
      <PageHero 
        title={dict.projectsPage.pageTitle}
        subtitle={dict.projectsPage.pageSubtitle}
      />

      <div className={`w-full max-w-[1440px] mx-auto px-4 md:px-8 py-12 space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveCategory(f.key)}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold font-vazir whitespace-nowrap transition-all ${
                activeCategory === f.key
                  ? 'bg-signal-500 text-white shadow-lg'
                  : 'bg-ink-900 text-steel-400 hover:text-white border border-ink-800 hover:border-steel-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProjects.map((p) => {
            const loc = getLocalizedProject(p, locale);
            return (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className={`group bg-ink-950 border border-ink-800 rounded-xl overflow-hidden metal-shadow hover:border-signal-500/50 transition-colors flex flex-col h-full ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <div className="relative aspect-[4/3] w-full bg-ink-900 overflow-hidden">
                  <Image
                    src={withBasePath(p.image)}
                    alt={loc.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent opacity-80" />
                  <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} px-2.5 py-1 bg-ink-900/80 backdrop-blur text-white text-[10px] font-bold rounded-lg border border-white/10`}>
                    {loc.category}
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-base font-black text-white group-hover:text-signal-500 transition-colors line-clamp-1 font-vazir mb-3">
                    {loc.title}
                  </h2>
                  
                  <div className="space-y-2 mt-auto">
                    <div className="flex items-center gap-2 text-steel-400 text-xs font-vazir">
                      <MapPin className="w-4 h-4 shrink-0 text-signal-500" />
                      <span className="line-clamp-1">{loc.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-steel-400 text-xs font-vazir">
                      <span className="w-4 h-4 flex items-center justify-center shrink-0 font-bold bg-signal-500/20 text-signal-500 rounded text-[9px] font-mono">VS</span>
                      <span className="line-clamp-1">{loc.systemsUsed?.join(isRTL ? '، ' : ', ')}</span>
                    </div>
                  </div>
                  
                  <div className="mt-5 pt-4 border-t border-ink-800 flex items-center justify-between text-steel-300 group-hover:text-signal-500 transition-colors text-xs font-bold font-vazir">
                    <span>{dict.projectsPage.viewImages}</span>
                    <Arrow className={`w-4 h-4 ${isRTL ? '-scale-x-100' : ''}`} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
