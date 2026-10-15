"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { getLocalMediaFallback, withBasePath } from '@/lib/media';
import { useLanguage } from '@/lib/i18n/context';
import { getLocalizedMaterial } from '@/lib/i18n/entities';
import { MaterialItem } from '@/lib/db';

interface MaterialsListClientProps {
  materials: MaterialItem[];
}

export function MaterialsListClient({ materials }: MaterialsListClientProps) {
  const { dict, locale, dir, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div dir={dir}>
      <Breadcrumbs items={[{ label: dict.nav.materials }]} />
      <PageHero 
        title={dict.materialsPage.pageTitle} 
        subtitle={dict.materialsPage.pageSubtitle} 
      />

      <div className={`w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-12 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((m) => {
            const loc = getLocalizedMaterial(m, locale);
            const imgSrc = withBasePath(m.image) || getLocalMediaFallback(m.id, 'material');
            return (
              <div
                key={m.id}
                className={`bg-ink-950 rounded-xl flex flex-col group ${isRTL ? 'text-right' : 'text-left'} hover:border-signal-500/50 transition-colors border border-ink-800 metal-shadow`}
              >
                <div className="relative aspect-square w-full bg-white overflow-hidden rounded-t-xl p-4 flex items-center justify-center">
                  <Image
                    src={imgSrc}
                    alt={loc.title}
                    width={300}
                    height={300}
                    className="max-h-full max-w-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  />
                  {m.videoUrl && (
                    <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-ink-950/80 backdrop-blur-md p-2 rounded-full border border-ink-800 shadow-lg`}>
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} bg-ink-900 text-white text-xs font-mono px-2 py-1 rounded shadow-lg`}>
                    {m.code}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <h2 className="text-base font-black text-white font-vazir line-clamp-1">{loc.title}</h2>
                    <span className="text-[10px] bg-ink-900 text-steel-400 px-2 py-1 rounded-full font-bold shrink-0">
                      {loc.category}
                    </span>
                  </div>
                  <p className="text-xs text-steel-400 line-clamp-2 font-vazir leading-relaxed flex-grow">
                    {loc.summary}
                  </p>
                  
                  <Link
                    href={`/materials/${m.id}`}
                    className="mt-6 w-full py-3 rounded-lg bg-ink-900 hover:bg-signal-500 text-white text-xs font-bold flex items-center justify-center gap-2 border border-ink-800 transition-all font-vazir group-hover:border-signal-500/50"
                  >
                    <span>{dict.materialsPage.viewSpecs}</span>
                    <Arrow className={`w-4 h-4 ${isRTL ? '-scale-x-100' : ''}`} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
