import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';

export function Breadcrumbs({ items }: { items: { label: string, href?: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "خانه",
        "item": "https://noavaranpanjereh.com/"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": item.href ? `https://noavaranpanjereh.com${item.href}` : undefined
      }))
    ]
  };

  return (
    <nav aria-label="Breadcrumb" className="w-full bg-ink-950 border-b border-white/5 py-3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center gap-2 text-xs font-vazir text-steel-400 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1 shrink-0">
          <Home className="w-3.5 h-3.5" />
          <span className="sr-only">خانه</span>
        </Link>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronLeft className="w-3.5 h-3.5 shrink-0 opacity-50" />
            {item.href ? (
              <Link href={item.href} className="hover:text-white transition-colors shrink-0">
                {item.label}
              </Link>
            ) : (
              <span className="text-white shrink-0 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}
