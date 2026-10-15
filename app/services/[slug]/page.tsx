import React from 'react';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices, getSettings } from '@/lib/db';
import { getLocalMediaFallback } from '@/lib/media';
import { ServiceDetailClient } from './ServiceDetailClient';

interface Props {
  params: { slug: string; };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.com';

export async function generateMetadata({ params }: Props) {
  const service = await getServiceBySlug(params.slug);
  if (!service) return { title: 'Not Found' };
  const imgSrc = getLocalMediaFallback(service.slug, 'service');
  const fullImgUrl = imgSrc.startsWith('http') ? imgSrc : `${siteUrl}${imgSrc}`;

  return {
    title: `${service.title} | نوآوران پنجره سپاهان`,
    description: service.summary,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | نوآوران پنجره سپاهان`,
      description: service.summary,
      url: `${siteUrl}/services/${service.slug}`,
      images: [{ url: fullImgUrl, alt: service.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | نوآوران پنجره سپاهان`,
      description: service.summary,
      images: [fullImgUrl],
    },
  };
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const settings = await getSettings();
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  const imgSrc = getLocalMediaFallback(service.slug, 'service');
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
        name: 'خدمات و راهکارها',
        item: `${siteUrl}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `${siteUrl}/services/${service.slug}`,
      },
    ],
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    alternateName: service.titleEn,
    description: service.summary,
    image: fullImgUrl,
    provider: {
      '@type': 'Organization',
      name: 'نوآوران پنجره سپاهان',
      url: siteUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Iran',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <ServiceDetailClient service={service} settings={settings} imgSrc={imgSrc} />
    </>
  );
}
