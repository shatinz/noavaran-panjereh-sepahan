'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const ENDPOINT = '/api/analytics/track';

function send(payload: Record<string, unknown>) {
  try {
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // analytics must never break the page
  }
}

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

// Derive a stable label for a clicked element. `data-track="..."` always wins.
function labelForClick(target: EventTarget | null): string | null {
  if (!(target instanceof Element)) return null;

  const tracked = target.closest('[data-track]');
  if (tracked) return tracked.getAttribute('data-track');

  const link = target.closest('a[href]') as HTMLAnchorElement | null;
  if (!link) return null;
  const href = (link.getAttribute('href') || '').toLowerCase();

  if (href.startsWith('tel:')) return 'phone_call';
  if (href.startsWith('mailto:')) return 'email';
  if (href.includes('wa.me') || href.includes('whatsapp')) return 'whatsapp';
  if (href.includes('t.me') || href.includes('telegram')) return 'telegram';
  if (href.includes('eitaa')) return 'eitaa';
  if (href.includes('instagram.com')) return 'instagram';
  if (href.includes('aparat.com')) return 'aparat';
  if (href.includes('linkedin.com')) return 'linkedin';
  if (/\.(pdf|zip|rar|docx?|xlsx?)(\?|$)/.test(href)) return 'file_download';
  return null;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  // Page views
  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) return;
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    let newVisitor = false;
    let newToday = false;
    let newSession = false;

    try {
      if (!localStorage.getItem('nv_seen')) {
        newVisitor = true;
        localStorage.setItem('nv_seen', '1');
      }
      const today = todayStamp();
      if (localStorage.getItem('nv_day') !== today) {
        newToday = true;
        localStorage.setItem('nv_day', today);
      }
    } catch {
      // storage blocked: fall back to counting nothing as "new"
    }

    try {
      if (!sessionStorage.getItem('nv_session')) {
        newSession = true;
        sessionStorage.setItem('nv_session', '1');
      }
    } catch {
      // ignore
    }

    send({
      type: 'pageview',
      path: pathname,
      title: document.title,
      referrer: newSession ? document.referrer : undefined,
      newVisitor,
      newToday,
      newSession,
    });
  }, [pathname]);

  // Clicks on contact / social / download links (one delegated listener)
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (window.location.pathname.startsWith('/admin')) return;
      const label = labelForClick(event.target);
      if (label) send({ type: 'click', label, path: window.location.pathname });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
