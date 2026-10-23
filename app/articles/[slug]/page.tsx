import React from 'react';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles, getSettings } from '@/lib/db';
import { getLocalMediaFallback, withBasePath } from '@/lib/media';
import { ArticleDetailClient } from './ArticleDetailClient';

interface Props {
  params: { slug: string; };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.com';

const toIsoDate = (persianDateStr: string) => {
  const map: Record<string, string> = {
    '۱۴۰۳/۰۴/۱۵': '2024-07-05',
    '۱۴۰۳/۰۳/۲۰': '2024-06-09',
    '۱۴۰۳/۰۲/۱۰': '2024-04-29',
    '۱۴۰۳/۰۱/۲۵': '2024-04-14',
  };
  return map[persianDateStr] || '2024-07-01';
};

export async function generateMetadata({ params }: Props) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: 'Not Found' };
  const imgSrc = withBasePath(article.image) || getLocalMediaFallback(article.slug, 'article');
  const fullImgUrl = imgSrc.startsWith('http') ? imgSrc : `${siteUrl}${imgSrc}`;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${siteUrl}/articles/${article.slug}`,
      type: 'article',
      publishedTime: toIsoDate(article.date),
      authors: [article.author || 'نوآوران پنجره سپاهان'],
      images: [{ url: fullImgUrl, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [fullImgUrl],
    },
  };
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticleDetailPage({ params }: Props) {
  const settings = await getSettings();
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const imgSrc = withBasePath(article.image) || getLocalMediaFallback(article.slug, 'article');
  const fullImgUrl = imgSrc.startsWith('http') ? imgSrc : `${siteUrl}${imgSrc}`;

  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'صفحه اصلی',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'دانشنامه و مقالات',
        item: `${siteUrl}/articles`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `${siteUrl}/articles/${article.slug}`,
      },
    ],
  };

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: fullImgUrl,
    datePublished: toIsoDate(article.date),
    author: {
      '@type': 'Person',
      name: article.author || 'مهندسی نوآوران پنجره سپاهان',
    },
    publisher: {
      '@type': 'Organization',
      name: 'نوآوران پنجره سپاهان',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/articles/${article.slug}`,
    },
  };

  const rawImages = [article.image, ...(article.images || [])].filter(Boolean);
  const seen = new Set<string>();
  const galleryImages: string[] = [];
  for (const img of rawImages) {
    const clean = img.trim().split('?')[0].split('#')[0].replace(/\/+$/, '').toLowerCase();
    if (!seen.has(clean)) {
      seen.add(clean);
      galleryImages.push(img.trim());
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <ArticleDetailClient article={article} settings={settings} imgSrc={imgSrc} galleryImages={galleryImages} />
    </>
  );
}
