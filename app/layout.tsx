import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingContact } from '@/components/FloatingContact';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import settingsData from '@/data/settings.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'نوآوران پنجره سپاهان | طراحی و تولید نمای مدرن و پنجره ترمال‌بریک',
    template: '%s | نوآوران پنجره سپاهان',
  },
  description: 'طراحی محاسباتی، تولید صنعتی در کارخانه ۱۵۰۰ متری و اجرای نماهای مدرن شیشه‌ای کرتین‌وال (لامل و فریم‌لس)، درب و پنجره‌های اختصاصی دوجداره آلومینیوم ترمال‌بریک، سیستم جام‌بالکنی و پنل کامپوزیت در اصفهان و سراسر کشور.',
  keywords: [
    'پنجره ترمال بریک',
    'پنجره دوجداره آلومینیوم',
    'نمای کرتین وال',
    'نمای لامل',
    'نمای فریم لس',
    'جام بالکنی',
    'شیشه بالکن ریلی',
    'پنجره کشویی لیفت اند اسلاید',
    'تولید کننده پنجره اصفهان',
    'قیمت پنجره ترمال بریک',
    'کارخانه پنجره آلومینیوم',
    'نوآوران پنجره سپاهان',
    'آروین پنجره پارتاک',
    'نمای کامپوزیت آلومینیوم',
    'هندریل شیشه ای',
    'Thermal Break Windows',
    'Curtain Wall Facade',
    'Aluminum Windows Iran',
  ],
  authors: [{ name: settingsData.companyName, url: siteUrl }],
  creator: settingsData.companyName,
  publisher: settingsData.companyName,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: siteUrl,
    siteName: `${settingsData.companyName} | ${settingsData.companyNameEn}`,
    title: 'نوآوران پنجره سپاهان | طراحی و تولید نمای مدرن و پنجره ترمال‌بریک',
    description: 'تولیدکننده صنعتی و تخصصی نماهای مدرن کرتین‌وال، پنجره‌های دوجداره ترمال‌بریک و جام‌بالکنی در کارخانه ۱۵۰۰ متری اصفهان با بیش از ۳۰ سال سابقه.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: `${settingsData.companyName} - طراحی و اجرای نما و پنجره ترمال‌بریک`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'نوآوران پنجره سپاهان | تولید تخصصی نما و پنجره ترمال‌بریک',
    description: 'طراحی، محاسبات مهندسی و اجرای نمای کرتین‌وال، فریم‌لس، جام‌بالکنی و درب و پنجره آلومینیوم دوجداره ترمال‌بریک.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google6b6e2b2e45f40ad7',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${siteUrl}/#organization`,
    name: settingsData.companyName,
    legalName: settingsData.companyName,
    alternateName: [settingsData.companyNameEn, 'آروین پنجره پارتاک'],
    url: siteUrl,
    logo: `${siteUrl}/images/logo-white.png`,
    image: `${siteUrl}/images/og-image.png`,
    description: settingsData.brandSubtitle,
    telephone: settingsData.phone,
    email: settingsData.email,
    taxID: settingsData.nationalId,
    vatID: settingsData.nationalId,
    identifier: {
      '@type': 'PropertyValue',
      name: 'شماره ثبت رسمی',
      value: settingsData.registrationNumber,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: settingsData.officeAddress,
      addressLocality: 'Isfahan',
      addressRegion: 'Isfahan',
      addressCountry: 'IR',
      postalCode: settingsData.postalCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '32.6546',
      longitude: '51.6680',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Thursday'],
        opens: '08:00',
        closes: '13:00',
      },
    ],
    sameAs: [
      settingsData.socialLinks.instagram,
      settingsData.socialLinks.whatsapp,
      (settingsData.socialLinks as any).eitaa || 'https://eitaa.com/noavaranpanjereh',
      settingsData.socialLinks.telegram,
      settingsData.socialLinks.aparat,
      settingsData.socialLinks.linkedin,
    ],
    priceRange: '$$$',
    currenciesAccepted: 'IRR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer, Cheque',
    areaServed: {
      '@type': 'Country',
      name: 'Iran',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'سیستم‌های مهندسی نما و پنجره',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'درب و پنجره دوجداره آلومینیوم ترمال‌بریک',
            description: 'سیستم‌های لولایی، کشویی و لیفت‌انداسلاید با عایق‌بندی کامل حرارتی و صوتی',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'نمای شیشه‌ای کرتین‌وال (Curtain Wall - لامل)',
            description: 'سیستم سازه‌ای خودایستا و لامل‌های آلومینیومی مجهز به سیستم تهویه و درزبندی EPDM',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'نمای شیشه‌ای فریم‌لس (Frameless)',
            description: 'ظاهر تمام شیشه‌ای یکدست با حداقل دید مقاطع آلومینیومی از نمای خارجی',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'شیشه بالکن تاشو و ریلی (جام‌بالکنی)',
            description: 'سیستم مدرن جمع‌شونده شیشه‌ای جهت بالکن، تراس، آلاچیق و کافه‌ها',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'نمای کامپوزیت آلومینیوم (ACP)',
            description: 'طراحی، شیارزنی CNC و اجرای پنل‌های کامپوزیت با استراکچر مقاوم مهندسی',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'هندریل شیشه‌ای و حفاظ استیل',
            description: 'جان‌پناه و حفاظ تمام شیشه‌ای دفنی و روکار منطبق با مبحث ۴ مقررات ملی ساختمان',
          },
        },
      ],
    },
  };

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: settingsData.companyName,
    alternateName: settingsData.companyNameEn,
    description: settingsData.brandSubtitle,
    inLanguage: 'fa-IR',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
  };

  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="describedby" href="/llms.txt" type="text/markdown" />
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js');` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col text-white selection:bg-signal-500 selection:text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-signal-500 focus:text-white">
          پرش به محتوای اصلی
        </a>
        <GoogleAnalytics />
        <Header />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
