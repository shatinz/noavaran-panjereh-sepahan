"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArticleItem, CategoryItem } from '@/lib/db';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { getLocalMediaFallback, withBasePath } from '@/lib/media';
import { useLanguage } from '@/lib/i18n/context';
import { getLocalizedArticle } from '@/lib/i18n/entities';

interface ArticlesListClientProps {
  articles: ArticleItem[];
  categories?: CategoryItem[];
}

export function ArticlesListClient({ articles, categories = [] }: ArticlesListClientProps) {
  const { dict, locale, dir, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const filters = [
    {
      key: 'all',
      label:
        dict.projectsPage?.filterAll ||
        (locale === 'en' ? 'All Articles' : locale === 'ar' ? 'جميع المقالات' : 'همه مقالات'),
    },
    ...(categories && categories.length > 0
      ? categories.map((c) => ({
          key: c.nameFa,
          label:
            locale === 'en'
              ? c.nameEn || c.nameFa
              : locale === 'ar'
              ? c.nameAr || c.nameEn || c.nameFa
              : c.nameFa,
        }))
      : [
          {
            key: 'دانشنامه و راهنمای خرید',
            label:
              locale === 'en'
                ? 'Knowledge & Buying Guide'
                : locale === 'ar'
                ? 'معرفة ودليل الشراء'
                : 'دانشنامه و راهنمای خرید',
          },
          {
            key: 'فنی و استانداردهای ایمنی',
            label:
              locale === 'en'
                ? 'Technical & Safety Standards'
                : locale === 'ar'
                ? 'معايير السلامة والمواصفات الفنية'
                : 'فنی و استانداردهای ایمنی',
          },
          {
            key: 'معماری و نوآوری',
            label:
              locale === 'en'
                ? 'Architecture & Innovation'
                : locale === 'ar'
                ? 'العمارة والابتكار'
                : 'معماری و نوآوری',
          },
          {
            key: 'مقایسه فنی سیستم‌ها',
            label:
              locale === 'en'
                ? 'Technical Comparison'
                : locale === 'ar'
                ? 'المقارنة الفنية للأنظمة'
                : 'مقایسه فنی سیستم‌ها',
          },
        ]),
  ];

  const filteredArticles =
    activeCategory === 'all'
      ? articles
      : articles.filter(
          (a) =>
            a.category === activeCategory ||
            categories.find((c) => c.nameFa === activeCategory && c.id === a.category)
        );

  return (
    <div dir={dir}>
      <Breadcrumbs items={[{ label: dict.nav.articles }]} />
      <PageHero
        title={dict.articlesPage.pageTitle}
        subtitle={dict.articlesPage.pageSubtitle}
      />

      <div className={`w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-12 ${isRTL ? 'text-right' : 'text-left'}`}>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((a) => {
            const locArt = getLocalizedArticle(a, locale);
            const imgSrc = withBasePath(a.image) || getLocalMediaFallback(a.slug, 'article');
            return (
              <Link
                href={`/articles/${a.slug}`}
                key={a.id}
                className={`group bg-ink-950 border border-ink-800 rounded-xl overflow-hidden metal-shadow hover:border-signal-500/50 transition-colors flex flex-col h-full ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <div className="relative aspect-video w-full bg-ink-900 overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={locArt.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent opacity-80" />
                  <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} px-2.5 py-1 bg-signal-500 text-white text-[10px] font-bold rounded-lg border border-signal-500`}>
                    {locArt.category}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-[10px] text-steel-400 font-mono font-bold mb-3">
                    <Calendar className="w-3.5 h-3.5 text-signal-500" />
                    <span>{a.date}</span>
                  </div>
                  <h2 className="text-lg font-black text-white font-vazir group-hover:text-signal-500 transition-colors mb-3 line-clamp-2">
                    {locArt.title}
                  </h2>
                  <p className="text-xs text-steel-400 line-clamp-3 leading-relaxed font-vazir mb-6 flex-grow">
                    {locArt.excerpt}
                  </p>

                  <div className="pt-4 border-t border-ink-800 flex items-center justify-between text-xs font-bold text-steel-300 font-vazir group-hover:text-signal-500 transition-colors mt-auto">
                    <span>{dict.articlesPage.readArticle}</span>
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
