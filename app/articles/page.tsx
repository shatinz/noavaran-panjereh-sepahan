import React from 'react';
import Link from 'next/link';
import { getArticles } from '@/lib/db';
import { BookOpen, Calendar, ArrowLeft, Tag } from 'lucide-react';

export const metadata = {
  title: 'دانشنامه و مقالات تخصصی مهندسی نما و پنجره | نوآوران پنجره سپاهان',
  description: 'مقالات علمی و کاربردی درباره مزایای پنجره دوجداره، استانداردهای عایق صوتی و حرارتی، مهار پل‌های حرارتی و تکنولوژی‌های نماهای شیشه‌ای.',
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="aluminum-header px-3 py-1 text-xs font-bold text-[#1a1a1a] uppercase tracking-widest inline-block border border-[#b5b8b5] rounded-[3px] shadow-sm">
          دانشنامه فنی و تخصصی
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a1a] mt-2">
          مقالات و راهنماهای جامع نوآوران پنجره سپاهان
        </h1>
        <p className="mt-4 text-sm text-[#555] leading-relaxed">
          جدیدترین پژوهش‌ها، بررسی مقررات ملی ساختمان، استانداردهای بهینه‌سازی مصرف انرژی (مبحث ۱۹) و مقایسه‌های فنی سیستم‌های مدرن نما.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((a) => (
          <article
            key={a.id}
            className="rounded-[3px] aluminum-surface border border-[#b5b8b5] hover:border-[#888] overflow-hidden flex flex-col group shadow-card hover:shadow-card-hover transition-all duration-300"
          >
            <div className="relative h-52 w-full bg-[#cbcccb] overflow-hidden border-b border-[#b5b8b5]">
              <img
                src={a.image}
                alt={a.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-[3px] aluminum-header text-[11px] font-bold text-[#1a1a1a] border border-[#b5b8b5] shadow-sm">
                {a.category}
              </span>
            </div>

            <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-[#555] font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{a.date}</span>
                  <span>•</span>
                  <span>{a.author}</span>
                </div>
                <h2 className="text-base font-bold text-[#1a1a1a] mt-2 group-hover:underline transition-colors line-clamp-2 leading-relaxed">
                  {a.title}
                </h2>
                <p className="text-xs text-[#555] mt-2 line-clamp-3 leading-relaxed">
                  {a.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#b5b8b5] flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {a.tags?.slice(0, 2).map((t, idx) => (
                    <span key={idx} className="text-[10px] text-[#555] bg-white/60 border border-[#b5b8b5] px-2 py-0.5 rounded-[3px]">
                      #{t}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/articles/${a.slug}`}
                  className="text-xs font-bold text-[#1a1a1a] hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>مطالعه</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
