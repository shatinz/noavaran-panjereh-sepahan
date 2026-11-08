"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { withBasePath } from '@/lib/media';

export function dedupeUrls(urls: string[]): string[] {
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

export interface ImageLightboxProps {
  images: string[];
  title: string;
  index: number | null;
  onClose: () => void;
  onIndexChange?: (newIndex: number) => void;
}

export function ImageLightbox({
  images,
  title,
  index,
  onClose,
  onIndexChange,
}: ImageLightboxProps) {
  const [internalIndex, setInternalIndex] = useState<number | null>(index);
  const touchStartXRef = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const prevFocusedElementRef = useRef<HTMLElement | null>(null);

  const uniqueImages = dedupeUrls(images);
  const currentIndex = index !== undefined && onIndexChange ? index : internalIndex;

  const setIndex = useCallback(
    (newIdx: number | null) => {
      if (newIdx === null) {
        onClose();
      } else {
        if (onIndexChange) {
          onIndexChange(newIdx);
        } else {
          setInternalIndex(newIdx);
        }
      }
    },
    [onClose, onIndexChange]
  );

  useEffect(() => {
    setInternalIndex(index);
  }, [index]);

  // Focus and scroll management
  useEffect(() => {
    if (currentIndex === null) return;

    prevFocusedElementRef.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      prevFocusedElementRef.current?.focus();
    };
  }, [currentIndex]);

  // Keyboard navigation & Focus Trap
  useEffect(() => {
    if (currentIndex === null || uniqueImages.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIndex(currentIndex === 0 ? uniqueImages.length - 1 : currentIndex - 1);
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setIndex(currentIndex === uniqueImages.length - 1 ? 0 : currentIndex + 1);
        return;
      }
      if (e.key === 'Tab') {
        const controls = [
          closeButtonRef.current,
          prevButtonRef.current,
          nextButtonRef.current,
        ].filter((btn): btn is HTMLButtonElement => Boolean(btn));

        if (controls.length === 0) {
          e.preventDefault();
          return;
        }

        if (controls.length === 1) {
          e.preventDefault();
          controls[0].focus();
          return;
        }

        const activeElement = document.activeElement as HTMLElement | null;
        const activeIdx = controls.indexOf(activeElement as HTMLButtonElement);

        if (e.shiftKey) {
          // Backward tab: if on first control or not inside controls, wrap to last
          if (activeIdx <= 0) {
            e.preventDefault();
            controls[controls.length - 1].focus();
          }
        } else {
          // Forward tab: if on last control or not inside controls, wrap to first
          if (activeIdx === -1 || activeIdx >= controls.length - 1) {
            e.preventDefault();
            controls[0].focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, uniqueImages.length, onClose, setIndex]);

  if (currentIndex === null || uniqueImages.length === 0) return null;

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
        setIndex(currentIndex === 0 ? uniqueImages.length - 1 : currentIndex - 1);
      } else {
        // Swipe left -> Next
        setIndex(currentIndex === uniqueImages.length - 1 ? 0 : currentIndex + 1);
      }
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const currentImageSrc = uniqueImages[currentIndex] || uniqueImages[0];

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 bg-[#0a0002]/95 backdrop-blur-md flex items-center justify-center select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Close button */}
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-ink-900/90 text-white hover:bg-signal-500 transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-signal-500 shadow-lg"
        aria-label="بستن / Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Counter Badge */}
      {uniqueImages.length > 1 && (
        <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-ink-900/80 border border-ink-800 text-xs text-steel-300 font-mono z-20 backdrop-blur">
          {currentIndex + 1} / {uniqueImages.length}
        </div>
      )}

      {/* Previous button */}
      {uniqueImages.length > 1 && (
        <button
          ref={prevButtonRef}
          type="button"
          onClick={() => setIndex(currentIndex === 0 ? uniqueImages.length - 1 : currentIndex - 1)}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-ink-900/90 text-white hover:bg-signal-500 transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-signal-500 shadow-lg"
          aria-label="قبلی / Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Image Container */}
      <div
        className="relative w-full max-w-6xl h-[75vh] md:h-[85vh] p-2 sm:p-4 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={withBasePath(currentImageSrc)}
          alt={`${title} - ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      {/* Next button */}
      {uniqueImages.length > 1 && (
        <button
          ref={nextButtonRef}
          type="button"
          onClick={() => setIndex(currentIndex === uniqueImages.length - 1 ? 0 : currentIndex + 1)}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-ink-900/90 text-white hover:bg-signal-500 transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-signal-500 shadow-lg"
          aria-label="بعدی / Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const uniqueImages = dedupeUrls(images);

  if (!uniqueImages || uniqueImages.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {uniqueImages.map((src, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setLightboxIndex(idx)}
            className="relative aspect-square rounded-xl overflow-hidden group border border-ink-800 metal-shadow focus:outline-none focus:ring-2 focus:ring-signal-500 cursor-zoom-in"
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

      <ImageLightbox
        images={uniqueImages}
        title={title}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
}
