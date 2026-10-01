import React from 'react';
import type { Metadata } from 'next';
import { getProjects } from '@/lib/db';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProjectsListClient } from './ProjectsListClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.vercel.app';

export const metadata: Metadata = {
  title: 'پروژه‌های شاخص و نمونه‌کارهای اجرایی نما و پنجره | نوآوران پنجره سپاهان',
  description: 'گالری ۵۵+ پروژه شاخص اجرا شده شامل نمای کرتین‌وال لامل، فریم‌لس، پنجره‌های آلومینیوم ترمال‌بریک، ساختمان‌های بانکی، اداری و ویلاهای لوکس.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'پروژه‌های شاخص و نمونه‌کارها | نوآوران پنجره سپاهان',
    description: 'مشاهده گالری تصاویر پروژه‌های ساختمانی اجرا شده در اصفهان و سراسر کشور.',
    url: `${siteUrl}/projects`,
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

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
    ],
  };

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'نمونه‌کارهای اجرایی نوآوران پنجره سپاهان',
    itemListElement: projects.slice(0, 30).map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: p.title,
      url: `${siteUrl}/projects/${p.id}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <Breadcrumbs items={[{ label: 'پروژه‌های اجرا شده' }]} />
      <PageHero 
        title="پروژه‌های شاخص و نمونه‌کارهای اجرایی" 
      />
      <ProjectsListClient projects={projects} />
    </>
  );
}
