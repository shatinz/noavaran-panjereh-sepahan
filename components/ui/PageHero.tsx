import React from 'react';
import { withBasePath } from '@/lib/media';

export function PageHero({ title, subtitle, bgImage }: { title: string, subtitle?: string, bgImage?: string }) {
  return (
    <div className={`relative w-full ${bgImage ? 'py-20 md:py-32' : 'py-16 md:py-24'} overflow-hidden border-b border-ink-800 bg-ink-950 flex flex-col items-center justify-center text-center`}>
      {bgImage ? (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-70" 
            style={{ backgroundImage: `url(${withBasePath(bgImage)})` }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/80 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(171,0,23,0.18)_0%,_transparent_70%)] pointer-events-none" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(171,0,23,0.3)_0%,_transparent_70%)] pointer-events-none" />
      )}
      <div className="relative z-10 max-w-[1440px] px-4 md:px-8 space-y-4">
        {subtitle && (
          <div className="text-signal-500 font-bold font-sans tracking-widest uppercase text-sm">
            {subtitle}
          </div>
        )}
        <h1 className="text-3xl md:text-5xl font-black text-white font-vazir drop-shadow-sm">
          {title}
        </h1>
      </div>
    </div>
  );
}
