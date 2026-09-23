'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, PlaySquare, Package, Flame, Award, Headset, Layers, Video, FileText, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  const tabs = [
    { id: 'motion', href: '/#tab-motion', label: 'موشن نما و پنجره', icon: PlaySquare },
    { id: 'products', href: '/#tab-products', label: 'نمایش محصولات', icon: Package },
    { id: 'materials', href: '/materials', label: 'کاتالوگ متریال‌ها', icon: Layers, isPage: true },
    { id: 'bestsellers', href: '/#tab-bestsellers', label: 'محصولات جدید و پرفروش', icon: Flame },
    { id: 'resume', href: '/#tab-resume', label: 'رزومه و نمونه‌کارها', icon: Award },
    { id: 'contact', href: '/#tab-contact', label: 'تماس با ما و ارتباط', icon: Headset },
  ];

  const moreLinks = [
    { href: '/videos', label: 'ویدیوهای آموزشی و تست', icon: Video },
    { href: '/projects', label: 'آرشیو ۵۰+ پروژه شاخص', icon: Award },
    { href: '/calculator', label: 'محاسبه‌گر آنلاین پیش‌فاکتور', icon: Package },
    { href: '/articles', label: 'دانشنامه و مقالات مهندسی', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 w-full max-w-[1440px] mx-auto px-3 sm:px-6 pt-2 pb-1">
      {/* Aluminum Header Bar - Sharp 0px corners, #cbcccb with zoomed brushed texture, subtle all-around shadow */}
      <div className="aluminum-bar sharp frame-shadow px-4 sm:px-6 h-[60px] flex items-center justify-between border border-[#b0b3b0]">
        
        {/* RIGHT: Logo & Brand Name (in RTL) */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="text-black flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 group-hover:scale-105 transition-transform"
            >
              <rect x="3" y="4" width="7" height="24" rx="0" />
              <polygon points="10,4 19,7 19,25 10,28" />
              <polygon points="19,7 27,9 27,23 19,25" />
              <line x1="6.5" y1="4" x2="6.5" y2="28" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="14.5" y1="5.5" x2="14.5" y2="26.5" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="23" y1="8" x2="23" y2="24" strokeWidth="1.5" strokeOpacity="0.4" />
            </svg>
          </div>

          <div className="flex flex-col text-right leading-[1.1]">
            <span className="text-xs sm:text-[13px] font-black text-black tracking-tight block">
              نوآوران پنجره سپاهان
            </span>
            <span className="text-[9px] text-[#444] font-bold font-mono tracking-wider uppercase block">
              Noavaran Panjereh
            </span>
          </div>
        </Link>

        {/* CENTER / LEFT: Sharp Tabs Navigation */}
        <nav className="hidden xl:flex items-center gap-1.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isMaterials = tab.href === '/materials';
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`sharp px-2.5 py-1.5 text-xs font-black transition-all border flex items-center gap-1.5 frame-shadow-hover ${
                  pathname === tab.href
                    ? 'bg-[#18191a] text-white border-black'
                    : 'text-[#1a1a1a] hover:bg-[#18191a] hover:text-white border-transparent hover:border-black'
                }`}
              >
                <Icon className="w-3.5 h-3.5 opacity-70" />
                <span>{tab.label}</span>
                {isMaterials && (
                  <span className="px-1.5 py-0.2 bg-black text-[#cbcccb] text-[9px] font-mono font-bold sharp">
                    ۱۲ سیستم
                  </span>
                )}
              </Link>
            );
          })}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              onMouseEnter={() => setMoreOpen(true)}
              className="sharp px-2 py-1.5 text-xs font-bold text-[#222] hover:bg-[#18191a] hover:text-white transition-all flex items-center gap-1 border border-transparent hover:border-black"
            >
              <span>سایر بخش‌ها</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {moreOpen && (
              <div
                onMouseLeave={() => setMoreOpen(false)}
                className="absolute left-0 top-full mt-1 w-52 aluminum-card sharp frame-shadow p-2 border border-[#b0b3b0] space-y-1 z-50 animate-in fade-in"
              >
                {moreLinks.map((ml) => {
                  const Icon = ml.icon;
                  return (
                    <Link
                      key={ml.href}
                      href={ml.href}
                      onClick={() => setMoreOpen(false)}
                      className="sharp flex items-center gap-2 px-2.5 py-2 text-xs font-bold text-black hover:bg-[#18191a] hover:text-white transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5 opacity-70" />
                      <span>{ml.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* LEFT: Official Phones with Sharp Corners */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href="tel:03133687755"
            className="sharp px-3 py-1.5 bg-[#18191a] text-white text-xs font-black tracking-wider flex items-center gap-1.5 hover:bg-[#333] transition-colors border border-black shadow-sm"
            title="تلفن رسمی شرکت"
          >
            <Phone className="w-3.5 h-3.5 text-[#cbcccb]" />
            <span className="font-mono">۰۳۱-۳۳۶۸۷۷۵۵</span>
          </a>
          <a
            href="tel:0314144"
            className="sharp px-2.5 py-1.5 bg-[#cbcccb] text-black text-xs font-black tracking-wider flex items-center gap-1 hover:bg-[#b8bab8] transition-colors border border-black shadow-sm"
            title="خط ۴ رقمی"
          >
            <span className="font-mono">۰۳۱-۴۱۴۴</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="xl:hidden p-2 text-black hover:bg-black/10 sharp border border-transparent transition-colors"
          aria-label="منوی سایت"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="xl:hidden mt-1.5 aluminum-bar sharp frame-shadow p-3 space-y-1.5 border border-[#b0b3b0]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                onClick={() => setIsOpen(false)}
                className="sharp block px-3 py-2 text-xs font-bold text-[#1a1a1a] hover:bg-[#18191a] hover:text-white transition-colors border border-transparent hover:border-black flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.href === '/materials' && (
                  <span className="px-1.5 py-0.5 bg-black text-white text-[9px] font-mono sharp">
                    ۱۲ سیستم
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-[#b0b3b0] space-y-1">
            {moreLinks.map((ml) => (
              <Link
                key={ml.href}
                href={ml.href}
                onClick={() => setIsOpen(false)}
                className="sharp block px-3 py-1.5 text-xs text-[#333] hover:bg-black/10"
              >
                {ml.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[#b0b3b0] grid grid-cols-2 gap-2">
            <a
              href="tel:03133687755"
              className="sharp py-2 bg-[#18191a] text-white text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#cbcccb]" />
              <span className="font-mono">۰۳۱-۳۳۶۸۷۷۵۵</span>
            </a>
            <a
              href="tel:0314144"
              className="sharp py-2 bg-white text-black text-xs font-bold flex items-center justify-center gap-1 border border-black"
            >
              <span className="font-mono">خط ۴ رقمی: ۴۱۴۴</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
