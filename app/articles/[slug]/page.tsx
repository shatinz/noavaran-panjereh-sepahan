import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles } from '@/lib/db';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Calendar, User, Tag, Share2, ShieldCheck, Phone } from 'lucide-react';
import { getLocalMediaFallback, withBasePath } from '@/lib/media';

interface Props {
  params: { slug: string; };
}

export async function generateMetadata({ params }: Props) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: 'Not Found' };
  return {
    title: `${article.title} | دانشنامه نوآوران پنجره سپاهان`,
    description: article.excerpt,
  };
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticleDetailPage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const imgSrc = withBasePath(article.image) || getLocalMediaFallback(article.slug, 'article');

  return (
    <>
      <Breadcrumbs items={[
        { label: 'دانشنامه و مقالات', href: '/articles' },
        { label: article.title }
      ]} />
      
      {/* We won't use PageHero for article detail to keep it clean for reading, instead we use a custom header */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-12 md:py-16" dir="rtl">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <header className="space-y-4 text-center">
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <span className="px-3 py-1 bg-signal-500/10 text-signal-500 text-xs font-bold rounded-lg border border-signal-500/20">
                {article.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white font-vazir leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-steel-400 font-vazir pt-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-signal-500" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-signal-500" />
                <span>تیم مهندسی نوآوران</span>
              </div>
            </div>
          </header>

          <div className="relative aspect-video w-full bg-ink-900 rounded-xl overflow-hidden metal-shadow border border-ink-800">
            <Image 
              src={imgSrc} 
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="bg-ink-950 border border-ink-800 rounded-xl p-6 md:p-12 metal-shadow">
            <div className="prose prose-invert prose-lg max-w-none font-vazir leading-loose text-steel-300 text-justify prose-headings:font-black prose-headings:text-white prose-headings:font-vazir prose-h2:border-r-4 prose-h2:border-signal-500 prose-h2:pr-4 prose-h2:mb-6 prose-p:mb-6 prose-strong:text-white prose-li:text-steel-300 prose-a:text-signal-500">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-ink-800 flex flex-wrap items-center gap-2">
                <Tag className="w-5 h-5 text-signal-500 ml-2" />
                {article.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-ink-900 border border-ink-800 text-steel-400 text-xs font-bold rounded-lg hover:text-white transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Call to Action inline */}
          <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blood-900/20 via-ink-900 to-ink-950 border border-signal-500/20 rounded-xl p-8 text-center metal-shadow flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-right">
              <ShieldCheck className="w-12 h-12 text-signal-500 shrink-0" />
              <div>
                <h4 className="text-xl font-black text-white font-vazir">مشاوره فنی رایگان</h4>
                <p className="text-sm text-steel-300 font-vazir mt-1">جهت استعلام قیمت یا اطلاعات بیشتر با مهندسی فروش تماس بگیرید.</p>
              </div>
            </div>
            <a href="tel:03133687755" className="px-8 py-3 bg-signal-500 hover:bg-signal-400 text-white font-bold rounded-lg transition-colors font-sans flex items-center gap-2 shrink-0 w-full md:w-auto justify-center">
              <Phone className="w-5 h-5" />
              <bdi dir="ltr" style={{ unicodeBidi: 'isolate' }}>031-33687755</bdi>
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
 
