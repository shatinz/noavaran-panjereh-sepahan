"use client";

import React from 'react';

export function FilterChips({ 
  categories, 
  activeCategory, 
  onChange 
}: { 
  categories: { id: string, label: string }[], 
  activeCategory: string, 
  onChange: (id: string) => void 
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-12">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-6 py-2.5 rounded-full text-sm font-bold font-vazir transition-all border ${
            activeCategory === cat.id
              ? 'bg-signal-500 text-white border-signal-500 shadow-[0_0_15px_rgba(171,0,23,0.3)]'
              : 'bg-ink-900 text-steel-300 border-ink-800 hover:border-signal-500/50 hover:text-white'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
