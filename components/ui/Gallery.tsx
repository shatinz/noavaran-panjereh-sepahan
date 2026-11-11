"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronRight, ChevronLeft, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
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
  initialZoom?: boolean;
  onClose: () => void;
  onIndexChange?: (newIndex: number) => void;
}

export function ImageLightbox({
  images,
  title,
  index,
  initialZoom = false,
  onClose,
  onIndexChange,
}: ImageLightboxProps) {
  const [internalIndex, setInternalIndex] = useState<number | null>(index);
  const [scale, setScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartDistRef = useRef<number | null>(null);
  const lastTapRef = useRef<number>(0);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const prevFocusedElementRef = useRef<HTMLElement | null>(null);

  const uniqueImages = dedupeUrls(images);
  const currentIndex = index !== undefined && onIndexChange ? index : internalIndex;

  const setIndex = useCallback(
    (newIdx: number | null) => {
      setScale(1);
      setPan({ x: 0, y: 0 });
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
    if (index !== null) {
      if (initialZoom) {
        setScale(2.5);
        setPan({ x: 0, y: 0 });
      } else {
        setScale(1);
        setPan({ x: 0, y: 0 });
      }
    }
  }, [index, initialZoom]);

  // Focus and scroll management
  useEffect(() => {
    if (currentIndex === null) return;

    prevFocusedElementRef.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

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
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setScale((prev) => Math.min(prev + 0.5, 4));
        return;
      }
      if (e.key === '-') {
        e.preventDefault();
        setScale((prev) => {
          const next = Math.max(1, prev - 0.5);
          if (next === 1) setPan({ x: 0, y: 0 });
          return next;
        });
        return;
      }
      if (e.key === '0') {
        e.preventDefault();
        setScale(1);
        setPan({ x: 0, y: 0 });
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
          if (activeIdx <= 0) {
            e.preventDefault();
            controls[controls.length - 1].focus();
          }
        } else {
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

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (scale > 1) {
      setScale(1);
      setPan({ x: 0, y: 0 });
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - (rect.left + rect.width / 2);
      const clickY = e.clientY - (rect.top + rect.height / 2);
      setScale(2.5);
      setPan({
        x: -clickX * 1.5,
        y: -clickY * 1.5,
      });
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY < 0 ? 0.35 : -0.35;
    setScale((prev) => {
      const next = Math.min(Math.max(1, prev + delta), 4);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...pan };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || scale <= 1) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Mobile double tap detection
    const now = Date.now();
    if (e.touches.length === 1 && now - lastTapRef.current < 300) {
      // Double tap detected
      e.preventDefault();
      if (scale > 1) {
        setScale(1);
        setPan({ x: 0, y: 0 });
      } else {
        setScale(2.5);
        setPan({ x: 0, y: 0 });
      }
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;

    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartDistRef.current = dist;
    } else if (e.touches.length === 1) {
      if (scale > 1) {
        dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        panStartRef.current = { ...pan };
        setIsDragging(true);
      } else {
        touchStartXRef.current = e.touches[0].clientX;
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDistRef.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchStartDistRef.current;
      setScale((prev) => Math.min(Math.max(1, prev * factor), 4));
      touchStartDistRef.current = dist;
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      setPan({
        x: panStartRef.current.x + dx,
        y: panStartRef.current.y + dy,
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchStartDistRef.current = null;
    setIsDragging(false);
    if (touchStartXRef.current !== null && scale <= 1) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchEndX - touchStartXRef.current;
      touchStartXRef.current = null;

      if (Math.abs(diff) > 40 && uniqueImages.length > 1) {
        if (diff > 0) {
          setIndex(currentIndex === 0 ? uniqueImages.length - 1 : currentIndex - 1);
        } else {
          setIndex(currentIndex === uniqueImages.length - 1 ? 0 : currentIndex + 1);
        }
      }
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isDragging) {
      onClose();
    }
  };

  const currentImageSrc = uniqueImages[currentIndex] || uniqueImages[0];

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 bg-[#0a0002]/95 backdrop-blur-md flex items-center justify-center select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Top Bar with Controls */}
      <div className="absolute top-4 inset-x-4 md:inset-x-6 flex items-center justify-between z-30 pointer-events-none">
        {/* Left: Counter & Double-click zoom hint */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {uniqueImages.length > 1 && (
            <div className="px-3.5 py-1.5 rounded-full bg-ink-900/90 border border-ink-800 text-xs text-steel-300 font-mono shadow-lg backdrop-blur">
              {currentIndex + 1} / {uniqueImages.length}
            </div>
          )}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink-900/80 border border-white/10 text-[11px] text-steel-400 font-vazir shadow-lg backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-signal-500 animate-pulse" />
            <span>دوبار کلیک برای بزرگنمایی تصویر</span>
          </div>
        </div>

        {/* Center: Zoom Controls Toolbar */}
        <div className="flex items-center gap-1.5 bg-ink-900/90 border border-ink-800 p-1 rounded-full shadow-xl backdrop-blur pointer-events-auto">
          <button
            type="button"
            onClick={() => setScale((prev) => Math.min(prev + 0.5, 4))}
            className="w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-signal-500 transition-colors"
            title="بزرگنمایی (+)"
            aria-label="بزرگنمایی"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono px-1.5 text-steel-300 min-w-10 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => {
              setScale((prev) => {
                const next = Math.max(1, prev - 0.5);
                if (next === 1) setPan({ x: 0, y: 0 });
                return next;
              });
            }}
            disabled={scale <= 1}
            className="w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-signal-500 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            title="کوچک‌نمایی (-)"
            aria-label="کوچک‌نمایی"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          {scale > 1 && (
            <button
              type="button"
              onClick={() => {
                setScale(1);
                setPan({ x: 0, y: 0 });
              }}
              className="w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-signal-500 transition-colors"
              title="بازنشانی بزرگنمایی (100%)"
              aria-label="اندازه استاندارد"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: Close button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-ink-900/90 text-white hover:bg-signal-500 transition-colors focus:outline-none focus:ring-2 focus:ring-signal-500 shadow-xl pointer-events-auto"
          aria-label="بستن / Close"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Previous button */}
      {uniqueImages.length > 1 && (
        <button
          ref={prevButtonRef}
          type="button"
          onClick={() => setIndex(currentIndex === 0 ? uniqueImages.length - 1 : currentIndex - 1)}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-ink-900/90 text-white hover:bg-signal-500 transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-signal-500 shadow-lg"
          aria-label="قبلی / Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Image Container with Double-Click Zoom & Pan */}
      <div
        className={`relative w-full max-w-6xl h-[75vh] md:h-[85vh] p-2 sm:p-4 flex items-center justify-center overflow-hidden ${
          scale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
        }`}
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={handleDoubleClick}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out will-change-transform"
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0px) scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          <Image
            src={withBasePath(currentImageSrc)}
            alt={`${title} - ${currentIndex + 1}`}
            fill
            className="object-contain pointer-events-none select-none"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Next button */}
      {uniqueImages.length > 1 && (
        <button
          ref={nextButtonRef}
          type="button"
          onClick={() => setIndex(currentIndex === uniqueImages.length - 1 ? 0 : currentIndex + 1)}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-ink-900/90 text-white hover:bg-signal-500 transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-signal-500 shadow-lg"
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
