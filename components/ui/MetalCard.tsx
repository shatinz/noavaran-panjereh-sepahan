import React from "react";
import Image from "next/image";

interface MetalCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  badge?: string;
  specs?: string[];
  className?: string;
}

function renderSpecItems(spec: string) {
  // If spec has multiple numbers separated by hyphens (e.g. "۴۲ - ۴۷ - ۵۹ - ۹۰ - ۱۰۰ میلی‌متر")
  if (spec.includes("-")) {
    const parts = spec.split("-").map((p) => p.trim()).filter(Boolean);
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-vazir text-xs md:text-sm font-black text-ink-950">
        {parts.map((part, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <span className="w-2 h-2 rounded-full bg-signal-500 inline-block shrink-0 shadow-sm" aria-hidden="true" />
            )}
            <span>{part}</span>
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <span className="font-vazir text-xs md:text-sm font-bold text-ink-950">
      {spec}
    </span>
  );
}

export function MetalCard({ imageSrc, imageAlt, title, badge, specs, className = "" }: MetalCardProps) {
  return (
    <div className={`group relative bg-metal-brushed metal-shadow metal-shadow-hover rounded-xl overflow-hidden flex flex-col ${className}`}>
      {/* Sheen sweep on hover */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-xl">
        <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white/20 hidden group-hover:block animate-metal-sweep" />
      </div>
      
      {/* Neutral steel-light backdrop, object-contain */}
      <div className="relative aspect-[4/3] w-full bg-[#e3e4e6]">
        {badge && (
          <div className="absolute top-3 right-3 z-10 bg-signal-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
            {badge}
          </div>
        )}
        <Image 
          src={imageSrc} 
          alt={imageAlt} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 drop-shadow-md" 
        />
      </div>
      
      {/* Steel caption plate */}
      <div className="p-5 bg-gradient-to-b from-steel-200 to-steel-300 flex-grow border-t border-white/50 flex flex-col justify-between shadow-inner">
        <h3 className="font-bold text-base md:text-lg text-ink-950 font-vazir text-center mb-3 line-clamp-2 leading-tight">{title}</h3>
        
        {specs && specs.length > 0 && (
          <div className="flex flex-col items-center justify-center gap-1.5 mt-auto pt-2.5 border-t border-steel-400/40 w-full">
            {specs.slice(0, 2).map((spec, i) => (
              <div key={i} className="w-full flex items-center justify-center">
                {renderSpecItems(spec)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
