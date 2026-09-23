import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

export const metadata: Metadata = {
  title: 'نوآوران پنجره سپاهان | طراح و مجری نماهای مدرن کرتین‌وال و پنجره‌های ترمال‌بریک',
  description: 'شرکت نوآوران پنجره سپاهان؛ طراحی، ساخت و اجرای تخصصی انواع نماهای شیشه‌ای کرتین‌وال (لامل)، فریم‌لس، پنجره‌های لوکس لیفت‌اند‌اسلاید و ترمال‌بریک در اصفهان و سراسر کشور.',
  keywords: 'نوآوران پنجره سپاهان, کرتین وال, پنجره ترمال بریک, لیفت اند اسلاید, نمای شیشه ای, فریم لس, اصفهان',
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
      <body className="min-h-screen flex flex-col sharp selection:bg-[#18191a] selection:text-white">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
