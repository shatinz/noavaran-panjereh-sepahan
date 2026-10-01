import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getMaterials } from '@/lib/db';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SpecTable } from '@/components/ui/SpecTable';
import { CheckCircle2, ShieldCheck, Phone, Calculator, ExternalLink } from 'lucide-react';
import { getLocalMediaFallback, withBasePath } from '@/lib/media';

interface Props {
  params: { slug: string; };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.vercel.app';

export async function generateMetadata({ params }: Props) {
  const materials = await getMaterials();
  const material = materials.find(m => m.id === params.slug);
  if (!material) return { title: 'Not Found' };
  const imgSrc = withBasePath(material.image) || getLocalMediaFallback(material.id, 'material');
  const fullImgUrl = imgSrc.startsWith('http') ? imgSrc : `${siteUrl}${imgSrc}`;

  return {
    title: `${material.title} (کد ${material.code}) | نوآوران پنجره سپاهان`,
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
      <Breadcrumbs items={[
        { label: 'محصولات و سیستم‌ها', href: '/materials' },
        { label: material.title }
      ]} />
      
      <PageHero 
        title={material.title}
        subtitle={`${material.category} - ${material.code}`}
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-12" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Product Overview */}
            <section className="bg-ink-950 border border-ink-800 rounded-xl overflow-hidden metal-shadow flex flex-col sm:flex-row">
              <div className="w-full sm:w-1/3 bg-white p-6 flex items-center justify-center border-b sm:border-b-0 sm:border-l border-ink-800">
                <Image 
                  src={imgSrc} 
                  alt={material.title} 
                  width={400} 
                  height={400} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="p-6 md:p-8 sm:w-2/3 space-y-4 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2">
                  <span className="px-3 py-1 bg-ink-900 text-white text-xs font-mono font-bold rounded-lg border border-ink-800">
                    {material.code}
                  </span>
                  <span className="text-xs text-signal-500 font-bold px-3 py-1 bg-signal-500/10 rounded-lg">
                    {material.category}
                  </span>
                </div>
                <h1 className="text-2xl font-black text-white font-vazir">{material.title}</h1>
                <p className="text-steel-300 leading-relaxed font-vazir text-justify">
                  {material.summary}
                </p>
              </div>
            </section>

            {/* Video & 3D Model Section */}
            {material.videoUrl && (
              <section className="space-y-6">
                <h2 className="text-2xl font-black text-white font-vazir border-r-4 border-signal-500 pr-4">
                  رندر سه‌بعدی و معرفی مقاطع
                </h2>
                <div className="aspect-video bg-ink-900 rounded-xl overflow-hidden border border-ink-800 metal-shadow">
                  {material.videoUrl.includes('aparat.com') ? (
                    <iframe
                      src={material.videoUrl}
                      allowFullScreen
                      className="w-full h-full border-none"
                      title={`ویدیو معرفی سیستم ${material.title}`}
                    />
                  ) : (
                    <video
                      src={material.videoUrl}
                      controls
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                {material.qrUrl && (
                  <div className="flex justify-end">
                    <a
                      href={material.qrUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-ink-900 hover:bg-ink-800 text-white text-sm font-bold rounded-lg border border-ink-800 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>لینک مستقیم و QR Code کاتالوگ سازنده</span>
                    </a>
                  </div>
                )}
              </section>
            )}

            {/* Features */}
            {material.features && material.features.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl font-black text-white font-vazir border-r-4 border-signal-500 pr-4">
                  مزایا و ویژگی‌های کاربردی
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {material.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-ink-900 border border-ink-800 rounded-xl text-steel-300 font-vazir">
                      <CheckCircle2 className="w-5 h-5 text-signal-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8 relative">
            {material.specs && (
              <SpecTable specs={material.specs} />
            )}

            <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blood-900/20 via-ink-900 to-ink-950 border border-signal-500/20 rounded-xl p-6 md:p-8 space-y-6 text-center metal-shadow sticky top-24">
              <ShieldCheck className="w-12 h-12 text-signal-500 mx-auto" />
              <div className="space-y-2">
                <h4 className="text-xl font-black text-white font-vazir">مشاوره فنی پروفیل</h4>
                <p className="text-sm text-steel-300 leading-relaxed font-vazir">
                  جهت دریافت قیمت روز بیلت، موجودی انبار و استعلام تناژ با مهندسی فروش تماس بگیرید.
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
 
