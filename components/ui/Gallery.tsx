"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { withBasePath } from '@/lib/media';

function dedupeUrls(urls: string[]): string[] {
  if (!urls || !Array.isArray(urls)) return [];
  const seen = new Set<string>();
  const result: string[] = [];
  for (const u of urls) {
    if (!u || typeof u !== 'string') continue;
    const clean = u.trim().split('?')[0].split('#')[0].replace(/\/+$/, '').toLowerCase();
    if (!seen.has(clean)) {
      seen.add(clean);
      result.push(u.trim());
    }
  }
  return result;
}

export function Gallery({ images, title }: { images: string[], title: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const uniqueImages = dedupeUrls(images);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : prev === 0 ? uniqueImages.length - 1 : prev - 1
        );
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : prev === uniqueImages.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, uniqueImages.length]);

  if (!uniqueImages || uniqueImages.length === 0) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (Math.abs(diff) > 40 && uniqueImages.length > 1) {
      if (diff > 0) {
        // Swipe right -> Previous
        setLightboxIndex((prev) =>
          prev === null ? null : prev === 0 ? uniqueImages.length - 1 : prev - 1
        );
      } else {
        // Swipe left -> Next
        setLightboxIndex((prev) =>
          prev === null ? null : prev === uniqueImages.length - 1 ? 0 : prev + 1
        );
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {uniqueImages.map((src, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setLightboxIndex(idx)}
            className="relative aspect-square rounded-xl overflow-hidden group border border-ink-800 metal-shadow focus:outline-none focus:ring-2 focus:ring-signal-500"
            aria-label={`${title} - ${idx + 1}`}
          >
            <Image
              src={withBasePath(src)}
              alt={`${title} - ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(min-width: 768px) 33vw, 50vw"
            />
            <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/20 transition-colors" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#0a0002]/95 backdrop-blur-sm flex items-center justify-center select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-ink-900 text-white hover:bg-signal-500 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-signal-500"
            aria-label="بستن / Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter Badge */}
          <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-ink-900/80 border border-ink-800 text-xs text-steel-300 font-mono z-10">
            {lightboxIndex + 1} / {uniqueImages.length}
          </div>

          {uniqueImages.length > 1 && (
            <button
              type="button"
              onClick={() => setLightboxIndex((prev) => (prev! === 0 ? uniqueImages.length - 1 : prev! - 1))}
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-ink-900/90 text-white hover:bg-signal-500 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-signal-500"
              aria-label="قبلی / Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <div className="relative w-full max-w-5xl aspect-video p-4">
            <Image
              src={withBasePath(uniqueImages[lightboxIndex])}
              alt={`${title} - ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {uniqueImages.length > 1 && (
            <button
              type="button"
              onClick={() => setLightboxIndex((prev) => (prev! === uniqueImages.length - 1 ? 0 : prev! + 1))}
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-ink-900/90 text-white hover:bg-signal-500 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-signal-500"
              aria-label="بعدی / Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
