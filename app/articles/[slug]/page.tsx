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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-[#1a1a1a]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#555]">
        <Link href="/" className="hover:text-[#1a1a1a] hover:underline">صفحه اصلی</Link>
        <ChevronRight className="w-3.5 h-3.5 rotate-180" />
        <Link href="/articles" className="hover:text-[#1a1a1a] hover:underline">دانشنامه و مقالات</Link>
        <ChevronRight className="w-3.5 h-3.5 rotate-180" />
        <span className="text-[#1a1a1a] font-bold line-clamp-1">{article.title}</span>
      </div>

      {/* Header */}
      <header className="space-y-4">
        <span className="aluminum-header inline-block px-3 py-1 rounded-[3px] text-[#1a1a1a] text-xs font-bold border border-[#b5b8b5] shadow-sm">
          {article.category}
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1a1a1a] leading-tight">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#555] font-mono pt-2 border-b border-[#b5b8b5] pb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#1a1a1a]" />
            <span>تاریخ انتشار: {article.date}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-[#1a1a1a]" />
            <span>{article.author}</span>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="rounded-[3px] overflow-hidden aluminum-surface border border-[#b5b8b5] shadow-card h-80 sm:h-96 w-full">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body */}
      <div className="rounded-[3px] aluminum-surface border border-[#b5b8b5] shadow-card p-6 sm:p-10 space-y-6 text-[#333] text-sm sm:text-base leading-relaxed">
        {article.content.split('\n\n').map((para, idx) => (
          <p key={idx} className="text-justify whitespace-pre-line leading-loose">
            {para}
          </p>
        ))}
      </div>

      {/* Tags & Footer */}
      <div className="pt-6 border-t border-[#b5b8b5] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Tag className="w-4 h-4 text-[#1a1a1a]" />
          {article.tags.map((t, idx) => (
            <span key={idx} className="text-xs px-2.5 py-1 rounded-[3px] aluminum-header text-[#444] border border-[#b5b8b5] shadow-sm">
              #{t}
            </span>
          ))}
        </div>

        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a1a1a] hover:underline"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به فهرست مقالات</span>
        </Link>
      </div>
    </div>
  );
}
