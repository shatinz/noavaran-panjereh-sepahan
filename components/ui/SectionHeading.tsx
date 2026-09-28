import React from "react";

export function SectionHeading({ title, subtitle, className = "", centered = true }: { title: string, subtitle?: string, className?: string, centered?: boolean }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-right'} ${className}`}>
      {subtitle && (
        <span className="inline-block text-signal-500 font-bold tracking-widest text-xs md:text-sm mb-3 font-vazir uppercase">
          <span className={`inline-block w-2 h-2 bg-signal-500 rounded-sm ml-2 align-middle ${centered ? '' : ''}`} />
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-black text-white font-vazir relative pb-4 leading-snug">
        {title}
        <div className={`absolute bottom-0 h-px bg-steel-500 w-full left-0 opacity-40`} />
        <div className={`absolute bottom-0 h-0.5 bg-steel-300 w-24 ${centered ? 'left-1/2 -translate-x-1/2' : 'right-0'}`} />
      </h2>
    </div>
  );
}
