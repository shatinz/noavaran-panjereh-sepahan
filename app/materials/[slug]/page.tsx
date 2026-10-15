import React from 'react';
import { notFound } from 'next/navigation';
import { getMaterials, getSettings } from '@/lib/db';
import { getLocalMediaFallback, withBasePath } from '@/lib/media';
import { MaterialDetailClient } from './MaterialDetailClient';

interface Props {
  params: { slug: string; };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.com';

export async function generateMetadata({ params }: Props) {
  const materials = await getMaterials();
  const material = materials.find(m => m.id === params.slug);
  if (!material) return { title: 'Not Found' };
  const imgSrc = withBasePath(material.image) || getLocalMediaFallback(material.id, 'material');
  const fullImgUrl = imgSrc.startsWith('http') ? imgSrc : `${siteUrl}${imgSrc}`;

  return {
    title: `${material.title} (کد ${material.code})`,
    description: `${material.summary} - مشخصات فنی، ممان اینرسی و آلیاژ آلومینیوم ۶۰۶۳`,
    alternates: {
      canonical: `/materials/${material.id}`,
    },
    openGraph: {
      title: `${material.title} (${material.code}) | مشخصات فنی مقطع آلومینیوم`,
      description: material.summary,
      url: `${siteUrl}/materials/${material.id}`,
      images: [{ url: fullImgUrl, alt: material.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${material.title} - ${material.code}`,
      description: material.summary,
      images: [fullImgUrl],
    },
  };
}

export async function generateStaticParams() {
  const materials = await getMaterials();
  return materials.map((m) => ({ slug: m.id }));
}

export default async function MaterialDetailPage({ params }: Props) {
  const settings = await getSettings();
  const materials = await getMaterials();
  const material = materials.find(m => m.id === params.slug);
  if (!material) notFound();

  const imgSrc = withBasePath(material.image) || getLocalMediaFallback(material.id, 'material');
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
        name: 'محصولات و سیستم‌ها',
        item: `${siteUrl}/materials`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: material.title,
        item: `${siteUrl}/materials/${material.id}`,
      },
    ],
  };

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${material.title} (${material.code})`,
    image: fullImgUrl,
    description: material.summary,
    category: material.category,
    sku: material.code,
    brand: {
      '@type': 'Brand',
      name: 'نوآوران پنجره سپاهان',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'نوآوران پنجره سپاهان',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'IRR',
      availability: 'https://schema.org/InStock',
      price: '0',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <MaterialDetailClient material={material} settings={settings} imgSrc={imgSrc} />
    </>
  );
}
