import React from 'react';
import { notFound } from 'next/navigation';
import { getProjects, getSettings } from '@/lib/db';
import { ProjectDetailClient } from './ProjectDetailClient';

interface Props {
  params: { id: string; };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.com';

export async function generateMetadata({ params }: Props) {
  const projects = await getProjects();
  const project = projects.find(p => p.id === params.id);
  if (!project) return { title: 'Not Found' };
  const imgPath = project.image || '/images/og-image.png';
  const fullImgUrl = imgPath.startsWith('http') ? imgPath : `${siteUrl}${imgPath}`;

  return {
    title: `${project.title || ''} (${project.location || 'اصفهان'})`,
    description: `پروژه ${project.title || ''} واقع در ${project.location || 'اصفهان'} با اجرای ${project.systemsUsed?.join(' و ') || ''}`,
    alternates: {
      canonical: `/projects/${project.id}`,
    },
    openGraph: {
      title: `${project.title || ''} | نوآوران پنجره سپاهان`,
      description: `پروژه اجرایی ${project.title || ''} در ${project.location || 'اصفهان'} با سیستم‌های ${project.systemsUsed?.join('، ') || ''}`,
      url: `${siteUrl}/projects/${project.id}`,
      images: [{ url: fullImgUrl, alt: project.title || '' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title || '',
      description: `پروژه اجرایی ${project.title || ''}`,
      images: [fullImgUrl],
    },
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ id: p.id }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const settings = await getSettings();
  const projects = await getProjects();
  const project = projects.find(p => p.id === params.id);
  if (!project) notFound();

  // Deduplicate cover image and all gallery images so photos never repeat
  const rawImages = [project.image, ...(project.images || [])].filter(Boolean);
  const seen = new Set<string>();
  const galleryImages: string[] = [];
  for (const img of rawImages) {
    const clean = img.trim().split('?')[0].split('#')[0].replace(/\/+$/, '').toLowerCase();
    if (!seen.has(clean)) {
      seen.add(clean);
      galleryImages.push(img.trim());
    }
  }
  const imgPath = project.image || '/images/og-image.png';
  const fullImgUrl = imgPath.startsWith('http') ? imgPath : `${siteUrl}${imgPath}`;

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
        name: 'پروژه‌های اجرا شده',
        item: `${siteUrl}/projects`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `${siteUrl}/projects/${project.id}`,
      },
    ],
  };

  const projectLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: `پروژه ساختمانی ${project.title} با اجرای سیستم‌های ${project.systemsUsed?.join(' و ')} در ${project.location || 'اصفهان'}`,
    image: fullImgUrl,
    locationCreated: {
      '@type': 'Place',
      name: project.location || 'اصفهان',
    },
    creator: {
      '@type': 'Organization',
      name: 'نوآوران پنجره سپاهان',
      url: siteUrl,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectLd) }}
      />
      <ProjectDetailClient project={project} settings={settings} galleryImages={galleryImages} />
    </>
  );
}
