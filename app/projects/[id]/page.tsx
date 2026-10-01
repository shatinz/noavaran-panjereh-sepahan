import React from 'react';
import { notFound } from 'next/navigation';
import { getProjects } from '@/lib/db';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Gallery } from '@/components/ui/Gallery';
import { MapPin, Layers, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Phone, MessageSquare } from 'lucide-react';

interface Props {
  params: { id: string; };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.vercel.app';

export async function generateMetadata({ params }: Props) {
  const projects = await getProjects();
  const project = projects.find(p => p.id === params.id);
  if (!project) return { title: 'Not Found' };
  const fullImgUrl = project.image.startsWith('http') ? project.image : `${siteUrl}${project.image}`;

  return {
    title: `${project.title} (${project.location || 'اصفهان'}) | پروژه‌های نوآوران پنجره`,
    description: `پروژه ${project.title} واقع در ${project.location || 'اصفهان'} با اجرای ${project.systemsUsed?.join(' و ')}`,
    alternates: {
      canonical: `/projects/${project.id}`,
    },
    openGraph: {
      title: `${project.title} | نوآوران پنجره سپاهان`,
      description: `پروژه اجرایی ${project.title} در ${project.location || 'اصفهان'} با سیستم‌های ${project.systemsUsed?.join('، ')}`,
      url: `${siteUrl}/projects/${project.id}`,
      images: [{ url: fullImgUrl, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: `پروژه اجرایی ${project.title}`,
      images: [fullImgUrl],
    },
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ id: p.id }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const projects = await getProjects();
  const project = projects.find(p => p.id === params.id);
  if (!project) notFound();

  // Mock secondary images for the gallery if not provided, just repeat the main image
  const galleryImages = [project.image, project.image, project.image];
  const fullImgUrl = project.image.startsWith('http') ? project.image : `${siteUrl}${project.image}`;

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
      <Breadcrumbs items={[
        { label: 'پروژه‌های اجرا شده', href: '/projects' },
        { label: project.title }
      ]} />
      
      <PageHero 
        title={project.title}
        subtitle={project.category}
        bgImage={project.image}
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-12" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-8">
              <h2 className="text-2xl font-black text-white font-vazir border-r-4 border-signal-500 pr-4">
                گالری تصاویر پروژه
              </h2>
              <Gallery images={galleryImages} title={project.title} />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-ink-950 border border-ink-800 rounded-xl p-6 md:p-8 space-y-6 metal-shadow">
              <h3 className="text-xl font-black text-white font-vazir border-b border-ink-800 pb-4">مشخصات پروژه</h3>
              
              <div className="space-y-4 text-sm text-steel-300 font-vazir">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-signal-500 shrink-0" />
                  <div>
                    <strong className="block text-white mb-1">موقعیت</strong>
                    <span>{project.location || 'اصفهان'}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Layers className="w-5 h-5 text-signal-500 shrink-0" />
                  <div>
                    <strong className="block text-white mb-1">سیستم‌های اجرا شده</strong>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.systemsUsed?.map((sys, idx) => (
                        <span key={idx} className="px-2 py-1 bg-ink-900 border border-ink-800 rounded text-xs">
                          {sys}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blood-900/20 via-ink-900 to-ink-950 border border-signal-500/20 rounded-xl p-6 md:p-8 space-y-6 text-center metal-shadow">
              <ShieldCheck className="w-12 h-12 text-signal-500 mx-auto" />
              <div className="space-y-2">
                <h4 className="text-xl font-black text-white font-vazir">اجرای پروژه‌های مشابه</h4>
                <p className="text-sm text-steel-300 leading-relaxed font-vazir">
                  تیم مهندسی ما آماده ارائه مشاوره، برآورد متراژ و پیش‌فاکتور دقیق برای پروژه شماست.
                </p>
              </div>
              
              <div className="space-y-3 pt-2">
                <a href="tel:03133687755" className="flex items-center justify-center gap-2 w-full py-3 bg-signal-500 hover:bg-signal-400 text-white font-bold rounded-lg transition-colors font-sans">
                  <Phone className="w-5 h-5" />
                  <bdi dir="ltr" style={{ unicodeBidi: 'isolate' }}>031-33687755</bdi>
                </a>
                <Link href="/contact" className="flex items-center justify-center gap-2 w-full py-3 bg-ink-950 hover:bg-ink-800 text-white font-bold rounded-lg border border-ink-800 transition-colors font-vazir">
                  <MessageSquare className="w-5 h-5 text-signal-500" />
                  <span>استعلام و مشاوره فنی</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
 
