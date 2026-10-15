import type { Metadata } from 'next';
import { Vazirmatn, Lalezar, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import { LanguageProvider } from '@/lib/i18n/context';
import { getSettings } from '@/lib/db';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-vazir',
  display: 'swap',
});

const lalezar = Lalezar({
  subsets: ['arabic', 'latin'],
  weight: ['400'],
  variable: '--font-lalezar',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.com';

export async function generateMetadata(): Promise<Metadata> {
  const settingsData = await getSettings();
  return {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'نوآوران پنجره | کارخانه تولید پنجره دوجداره ترمال‌بریک و نمای مدرن (سپاهان)',
    template: '%s | نوآوران پنجره',
  },
  description: 'کارخانه نوآوران پنجره (شرکت نوآوران پنجره سپاهان)؛ طراحی محاسباتی و تولید تخصصی انواع درب و پنجره دوجداره آلومینیوم ترمال‌بریک، نمای شیشه‌ای کرتین‌وال لامل و جام‌بالکنی در اصفهان و سراسر کشور.',
  keywords: [
    'نوآوران پنجره',
    'نواروان پنجره',
    'نوآوران پنجره سپاهان',
    'نواروان پنجره سپاهان',
    'کارخانه نوآوران پنجره',
    'شرکت نوآوران پنجره',
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
    'آروین پنجره پارتاک',
    'نمای کامپوزیت آلومینیوم',
    'هندریل شیشه ای',
    'Noavaran Panjereh',
    'Thermal Break Windows',
    'Curtain Wall Facade',
    'Aluminum Windows Iran',
  ],
  authors: [{ name: 'نوآوران پنجره', url: siteUrl }],
  creator: 'نوآوران پنجره',
  publisher: 'نوآوران پنجره',
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
    siteName: 'نوآوران پنجره | شرکت نوآوران پنجره سپاهان',
    title: 'نوآوران پنجره | کارخانه تولید پنجره دوجداره ترمال‌بریک و نمای مدرن',
    description: 'کارخانه نوآوران پنجره (شرکت نوآوران پنجره سپاهان)؛ تولیدکننده صنعتی و تخصصی نماهای مدرن کرتین‌وال، پنجره‌های دوجداره ترمال‌بریک و جام‌بالکنی در کارخانه ۱۵۰۰ متری اصفهان با بیش از ۳۰ سال سابقه.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'کارخانه نوآوران پنجره - طراحی و اجرای نما و پنجره ترمال‌بریک',
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
      { url: '/icon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon-96.png', type: 'image/png', sizes: '96x96' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google6b6e2b2e45f40ad7',
  },
};
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settingsData = await getSettings();
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${siteUrl}/#organization`,
    name: 'نوآوران پنجره',
    legalName: settingsData.companyName,
    alternateName: [
      'نوآوران پنجره سپاهان',
      'نواروان پنجره',
      'نواروان پنجره سپاهان',
      'شرکت نوآوران پنجره',
      'کارخانه نوآوران پنجره',
      settingsData.companyNameEn,
      'Noavaran Panjereh',
      'Noavaran Panjereh Sepahan',
      'آروین پنجره پارتاک',
    ],
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    image: [`${siteUrl}/images/logo.png`, `${siteUrl}/images/og-image.png`],
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
    name: 'نوآوران پنجره',
    alternateName: [
      'نوآوران پنجره سپاهان',
      'نواروان پنجره',
      'نواروان پنجره سپاهان',
      'شرکت نوآوران پنجره',
      'کارخانه نوآوران پنجره',
      settingsData.companyName,
      settingsData.companyNameEn,
      'Noavaran Panjereh',
    ],
    description: 'کارخانه نوآوران پنجره؛ طراحی محاسباتی و تولید صنعتی انواع پنجره دوجداره ترمال‌بریک و کرتین‌وال',
    inLanguage: 'fa-IR',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
  };

  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} ${lalezar.variable} ${inter.variable}`}>
      <head>
        <link rel="describedby" href="/llms.txt" type="text/markdown" />
        <script dangerouslySetInnerHTML={{ __html: `
          document.documentElement.classList.add('js');
          try {
            var l = localStorage.getItem('noavaran_locale');
            if (l === 'en') {
              document.documentElement.lang = 'en';
              document.documentElement.dir = 'ltr';
              document.documentElement.classList.add('lang-en');
            } else if (l === 'ar') {
              document.documentElement.lang = 'ar';
              document.documentElement.dir = 'rtl';
              document.documentElement.classList.add('lang-ar');
            } else {
              document.documentElement.classList.add('lang-fa');
            }
          } catch(e){}
        ` }} />
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
        <LanguageProvider>
          <GoogleAnalytics />
          <AnalyticsTracker />
          <Header phone={settingsData.factoryPhones?.[0] || settingsData.phone} />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
