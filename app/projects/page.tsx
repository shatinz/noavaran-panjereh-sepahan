import React from 'react';
import { getProjects } from '@/lib/db';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProjectsListClient } from './ProjectsListClient';

export const metadata = {
  title: 'پروژه‌های اجرا شده | نوآوران پنجره سپاهان',
  description: 'گالری پروژه‌های شاخص اجرا شده شامل نمای کرتین‌وال، فریم‌لس، ترمال‌بریک و چوب ترموود.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Breadcrumbs items={[{ label: 'پروژه‌های اجرا شده' }]} />
      <PageHero 
        title="پروژه‌های شاخص و نمونه‌کارهای اجرایی" 
        subtitle="بیش از ۵۵ پروژه موفق در سراسر کشور"
      />
      <ProjectsListClient projects={projects} />
    </>
  );
}
