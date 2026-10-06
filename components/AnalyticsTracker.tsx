'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    // Skip admin and api routes
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) return;

    // Prevent duplicate triggers for identical path
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const pageTitle = typeof document !== 'undefined' ? document.title : '';

    // Fire non-blocking beacon or fetch with short timeout
    try {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: pathname,
          title: pageTitle,
          isMobile,
        }),
        keepalive: true,
        signal: AbortSignal.timeout(3000),
      }).catch(() => {});
    } catch (e) {
      // Ignore background analytics errors
    }
  }, [pathname]);

  return null;
}
