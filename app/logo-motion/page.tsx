import React from "react";
import type { Metadata } from "next";
import { LogoMotionClient } from "./LogoMotionClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://noavaranpanjereh.vercel.app";

export const metadata: Metadata = {
  title: "لوگو موشن و انیمیشن رسمی | نوآوران پنجره سپاهان",
  description: "استودیوی ۳ انیمیشن و لوگوگرافی رسمی شرکت نوآوران پنجره سپاهان؛ شامل موشن اسکن مهندسی بلوپرینت، کوره متالیک اکستروژن و هولوگرافی سه‌بعدی شیشه دوجداره.",
  alternates: {
    canonical: "/logo-motion",
  },
  openGraph: {
    title: "لوگو موشن و لوگوگرافی نوآوران پنجره سپاهان",
    description: "۳ سبک موشن‌گرافیک رسمی بر پایه آرم و هویت اصیل برند نوآوران پنجره سپاهان.",
    url: `${siteUrl}/logo-motion`,
  },
};

export default function LogoMotionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "استودیوی لوگو موشن نوآوران پنجره سپاهان",
    description: "۳ سبک انیمیشن و لوگوگرافی بر پایه لوگوی رسمی شرکت نوآوران پنجره سپاهان",
    url: `${siteUrl}/logo-motion`,
    publisher: {
      "@type": "Organization",
      name: "شرکت نوآوران پنجره سپاهان",
      logo: `${siteUrl}/images/logo.png`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LogoMotionClient />
    </>
  );
}
