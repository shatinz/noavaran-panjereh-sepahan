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
    <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 py-4 space-y-5">
      {/* Header */}
      <section className="aluminum-card sharp frame-shadow p-6 sm:p-10 border border-[#b0b3b0] text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18191a] text-white text-[11px] font-bold sharp border border-black shadow-sm">
          <BookOpen className="w-4 h-4 text-[#cbcccb]" />
          <span>دانشنامه فنی و مقالات مهندسی</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight leading-tight">
          مقالات و راهنماهای جامع نوآوران پنجره سپاهان
        </h1>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#333] leading-relaxed font-medium">
          جدیدترین پژوهش‌ها، بررسی مقررات ملی ساختمان، استانداردهای بهینه‌سازی مصرف انرژی (مبحث ۱۹) و مقایسه‌های فنی سیستم‌های مدرن نما.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((a) => (
          <article
            key={a.id}
            className="aluminum-card sharp frame-shadow p-3.5 border border-[#b0b3b0] flex flex-col justify-between group text-right"
          >
            <div>
              <div className="relative h-48 w-full bg-black sharp overflow-hidden border border-black/20 frame-shadow">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 px-2.5 py-0.5 sharp bg-white text-black text-[10px] font-bold border border-black">
                  {a.category}
                </span>
              </div>

              <div className="pt-3 space-y-2">
                <div className="flex items-center gap-2 text-[10px] text-[#555] font-mono font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{a.date}</span>
                  <span>•</span>
                  <span>{a.author}</span>
                </div>
                <h2 className="text-xs sm:text-sm font-black text-black group-hover:text-black transition-colors line-clamp-2 leading-snug">
                  {a.title}
                </h2>
                <p className="text-[11px] text-[#333] line-clamp-3 leading-relaxed font-medium">
                  {a.excerpt}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#a8aba8] mt-3">
              <Link
                href={`/articles/${a.slug}`}
                className="text-xs font-black text-black hover:underline flex items-center justify-between"
              >
                <span>مطالعه کامل مقاله تخصصی</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
