import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

export const metadata: Metadata = {
  title: 'Noavaran Panjereh Sepahan | Modern Facade Solutions',
  description: 'Luxury real architectural glass facade as an Iranian contemporary high-rise & facade specialist. Precision-engineered aluminum systems and curtain walls.',
  keywords: 'Noavaran Panjereh Sepahan, modern facade solutions, curtain wall, thermal break aluminum, architectural glass, Isfahan',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col selection:bg-gray-400/40 selection:text-black">
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
