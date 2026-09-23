import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

export const metadata: Metadata = {
  title: 'نوآوران پنجره سپاهان | تولید و اجرای نمای شیشه‌ای، کرتین وال و پنجره ترمال‌بریک',
  description: 'شرکت نوآوران پنجره سپاهان، طراح و مجری تخصصی نماهای مدرن کرتین وال (لامل)، نمای شیشه‌ای فریم‌لس، درب و پنجره‌های دوجداره آلومینیوم ترمال بریک، کامپوزیت و ترموود در اصفهان و سراسر کشور.',
  keywords: 'نوآوران پنجره سپاهان, کرتین وال, لامل, پنجره دوجداره, ترمال بریک, لیفت اند اسلاید, نمای کامپوزیت, فریم لس, اصفهان',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-charcoal-950 text-titanium-100 min-h-screen flex flex-col selection:bg-bronze-500 selection:text-charcoal-950">
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
