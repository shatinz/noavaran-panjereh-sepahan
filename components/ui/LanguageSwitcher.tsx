"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { LOCALES, SupportedLocale } from '@/lib/i18n/types';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'header' | 'drawer' | 'footer';
}

export function LanguageSwitcher({ className = '', variant = 'header' }: LanguageSwitcherProps) {
  const { locale, setLocale, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: SupportedLocale) => {
    setLocale(code);
    setIsOpen(false);
  };

  const current = LOCALES[locale];

  if (variant === 'drawer') {
    return (
      <div className={`flex items-center gap-1.5 p-1 bg-ink-900 border border-ink-800 rounded-lg ${className}`}>
        {(Object.keys(LOCALES) as SupportedLocale[]).map((code) => {
          const loc = LOCALES[code];
          const isSelected = locale === code;
          return (
            <button
              key={code}
              onClick={() => handleSelect(code)}
              className={`flex-1 py-1.5 px-2 text-xs font-bold rounded transition-all flex items-center justify-center gap-1.5 ${
                isSelected
                  ? 'bg-signal-500 text-white shadow-md'
                  : 'text-steel-300 hover:text-white hover:bg-ink-800/80'
              }`}
            >
              <span>{loc.flag}</span>
              <span>{loc.nativeLabel}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`} dir="ltr">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Change Language / تغییر زبان"
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold font-sans bg-ink-950/80 hover:bg-ink-900 text-white border border-steel-400/40 hover:border-signal-500/60 shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-signal-500"
      >
        <Globe className="w-3.5 h-3.5 text-signal-500 shrink-0" />
        <span className="tracking-wide uppercase font-black">{current.shortCode}</span>
        <ChevronDown className={`w-3 h-3 text-steel-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} mt-1.5 w-36 rounded-xl bg-ink-950 border border-steel-400/30 metal-shadow p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md`}
          role="menu"
        >
          {(Object.keys(LOCALES) as SupportedLocale[]).map((code) => {
            const loc = LOCALES[code];
            const isSelected = locale === code;
            return (
              <button
                key={code}
                role="menuitem"
                onClick={() => handleSelect(code)}
                className={`w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-lg transition-colors text-left ${
                  isSelected
                    ? 'bg-signal-500/20 text-signal-400 font-bold border border-signal-500/30'
                    : 'text-steel-300 hover:text-white hover:bg-ink-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{loc.flag}</span>
                  <span className={code === 'fa' || code === 'ar' ? 'font-vazir font-bold' : 'font-sans font-medium'}>
                    {loc.nativeLabel}
                  </span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-signal-500 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
