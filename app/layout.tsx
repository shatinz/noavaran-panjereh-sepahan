import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingContact } from '@/components/FloatingContact';

import settingsData from '@/data/settings.json';

export const metadata: Metadata = {
  title: 'نوآوران پنجره سپاهان | طراحی و تولید نمای مدرن و پنجره آلومینیوم ترمال‌بریک',
  description: 'شرکت نوآوران پنجره سپاهان، طراح و مجری نماهای مدرن کرتین‌وال، نمای شیشه‌ای، و درب و پنجره‌های دوجداره آلومینیوم ترمال‌بریک در اصفهان.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: settingsData.companyName,
    alternateName: settingsData.companyNameEn,
    url: 'https://noavaranpanjereh.com',
    logo: 'https://noavaranpanjereh.com/images/logo-white.svg',
    description: settingsData.brandSubtitle,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settingsData.officeAddress,
      addressLocality: 'Isfahan',
      addressRegion: 'Isfahan',
      addressCountry: 'IR',
      postalCode: settingsData.postalCode
    },
    telephone: settingsData.phone,
    email: settingsData.email,
    sameAs: [
      settingsData.socialLinks.instagram,
      settingsData.socialLinks.linkedin,
      settingsData.socialLinks.telegram,
      settingsData.socialLinks.aparat,
    ],
    openingHours: 'Mo,Tu,We,Sa,Su 08:00-17:00 Th 08:00-13:00'
  };

  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js');` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col text-white selection:bg-signal-500 selection:text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-signal-500 focus:text-white">پرش به محتوای اصلی</a>
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
