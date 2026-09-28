"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { withBasePath } from '@/lib/media';

export function Gallery({ images, title }: { images: string[], title: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, idx) => (
          <button 
            key={idx} 
            onClick={() => setLightboxIndex(idx)}
            className="relative aspect-square rounded-xl overflow-hidden group border border-ink-800 metal-shadow"
          >
            <Image 
              src={withBasePath(src)} 
              alt={`${title} - تصویر ${idx + 1}`} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/20 transition-colors" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-[#0a0002]/95 backdrop-blur-sm flex items-center justify-center">
          <button 
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-ink-900 text-white hover:bg-signal-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          {images.length > 1 && (
            <button 
              onClick={() => setLightboxIndex(prev => prev! === 0 ? images.length - 1 : prev! - 1)}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-ink-900 text-white hover:bg-signal-500 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <div className="relative w-full max-w-5xl aspect-video p-4">
            <Image 
              src={withBasePath(images[lightboxIndex])} 
              alt={`${title} - تصویر بزرگ`} 
              fill 
              className="object-contain"
            />
          </div>

          {images.length > 1 && (
            <button 
              onClick={() => setLightboxIndex(prev => prev! === images.length - 1 ? 0 : prev! + 1)}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-ink-900 text-white hover:bg-signal-500 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
