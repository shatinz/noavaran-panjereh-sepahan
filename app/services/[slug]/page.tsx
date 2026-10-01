import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices } from '@/lib/db';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SpecTable } from '@/components/ui/SpecTable';
import { CheckCircle2, ShieldCheck, Phone, Calculator } from 'lucide-react';
import Image from 'next/image';
import { getLocalMediaFallback } from '@/lib/media';

interface Props {
  params: { slug: string; };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.vercel.app';

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
      <Breadcrumbs items={[
        { label: 'خدمات و راهکارها', href: '/services' },
        { label: service.title }
      ]} />
      
      <PageHero 
        title={service.title}
        subtitle={service.titleEn}
        bgImage={imgSrc}
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-12" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-6">
              <h2 className="text-2xl font-black text-white font-vazir border-r-4 border-signal-500 pr-4">
                معرفی سیستم
              </h2>
              <p className="text-steel-300 leading-relaxed font-vazir text-justify text-lg">
                {service.summary}
              </p>
              
              <div className="bg-ink-900 border border-ink-800 rounded-xl p-6 md:p-8 space-y-6">
                <h3 className="text-lg font-bold text-white font-vazir">ویژگی‌ها و مزایای برجسته</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-steel-300 font-vazir">
                      <CheckCircle2 className="w-5 h-5 text-signal-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {service.subcategories && service.subcategories.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl font-black text-white font-vazir border-r-4 border-signal-500 pr-4">
                  انواع سیستم‌ها و زیرمجموعه‌ها
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.subcategories.map((sub, idx) => (
                    <div key={idx} className="bg-ink-950 border border-ink-800 rounded-xl p-6 space-y-3 metal-shadow hover:border-signal-500/30 transition-colors">
                      <h3 className="text-lg font-bold text-white font-vazir">{sub.name}</h3>
                      <p className="text-sm text-steel-400 leading-relaxed font-vazir">{sub.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8 relative">
            {service.technicalSpecs && (
              <SpecTable specs={service.technicalSpecs} />
            )}

            <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blood-900/20 via-ink-900 to-ink-950 border border-signal-500/20 rounded-xl p-6 md:p-8 space-y-6 text-center metal-shadow sticky top-24">
              <ShieldCheck className="w-12 h-12 text-signal-500 mx-auto" />
              <div className="space-y-2">
                <h4 className="text-xl font-black text-white font-vazir">مشاوره تخصصی رایگان</h4>
                <p className="text-sm text-steel-300 leading-relaxed font-vazir">
                  تیم مهندسی ما آماده ارائه مشاوره، برآورد متراژ و پیش‌فاکتور دقیق برای پروژه شماست.
                </p>
              </div>
              
              <div className="space-y-3 pt-2">
                <a href="tel:03133687755" className="flex items-center justify-center gap-2 w-full py-3 bg-signal-500 hover:bg-signal-400 text-white font-bold rounded-lg transition-colors font-sans">
                  <Phone className="w-5 h-5" />
                  <bdi dir="ltr" style={{ unicodeBidi: 'isolate' }}>031-33687755</bdi>
                </a>
                <Link href="/calculator" className="flex items-center justify-center gap-2 w-full py-3 bg-ink-950 hover:bg-ink-800 text-white font-bold rounded-lg border border-ink-800 transition-colors font-vazir">
                  <Calculator className="w-5 h-5" />
                  <span>ماشین‌حساب متراژ</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
 
