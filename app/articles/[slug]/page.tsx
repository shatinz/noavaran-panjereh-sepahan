import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles } from '@/lib/db';
import { Calendar, User, ChevronRight, Tag, ArrowRight, Share2, BookOpen } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export default async function ArticleDetailPage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 py-4 space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-[#555] font-bold">
        <Link href="/" className="hover:text-black">صفحه اصلی</Link>
        <ChevronRight className="w-3.5 h-3.5 rotate-180" />
        <Link href="/articles" className="hover:text-black">دانشنامه و مقالات</Link>
        <ChevronRight className="w-3.5 h-3.5 rotate-180" />
        <span className="text-black font-black line-clamp-1">{article.title}</span>
      </div>

      {/* Main Article Container */}
      <div className="aluminum-card sharp frame-shadow p-6 sm:p-10 border border-[#b0b3b0] space-y-6 text-right">
        {/* Header */}
        <header className="space-y-3 pb-4 border-b border-[#a8aba8]">
          <span className="inline-block px-2.5 py-0.5 sharp bg-[#18191a] text-white text-xs font-bold border border-black">
            {article.category}
          </span>
          <h1 className="text-xl sm:text-3xl font-black text-black leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#444] font-mono font-bold pt-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-black" />
              <span>تاریخ انتشار: {article.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-black" />
              <span>{article.author}</span>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="sharp overflow-hidden bg-black border border-black/20 h-72 sm:h-96 w-full frame-shadow">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-neutral max-w-none text-[#222] text-xs sm:text-sm leading-relaxed space-y-4 font-medium">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Back Link */}
        <div className="pt-6 border-t border-[#a8aba8] flex justify-between items-center">
          <Link
            href="/articles"
            className="sharp px-4 py-2 bg-[#18191a] hover:bg-[#333] text-white text-xs font-bold border border-black flex items-center gap-2 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>بازگشت به مقالات</span>
          </Link>
          <span className="text-[11px] font-mono text-[#555] font-bold">نوآوران پنجره سپاهان</span>
        </div>
      </div>
    </div>
  );
}
