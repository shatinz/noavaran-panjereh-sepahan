'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, PlaySquare, Package, Flame, Award, Headset } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const tabs = [
    { id: 'motion', href: '/#tab-motion', label: 'موشن نما و پنجره', icon: PlaySquare },
    { id: 'products', href: '/#tab-products', label: 'نمایش محصولات', icon: Package },
    { id: 'bestsellers', href: '/#tab-bestsellers', label: 'محصولات جدید و پرفروش', icon: Flame },
    { id: 'resume', href: '/#tab-resume', label: 'رزومه و نمونه‌کارها', icon: Award },
    { id: 'contact', href: '/#tab-contact', label: 'تماس با ما و ارتباط', icon: Headset },
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

        {/* CENTER / LEFT: 5 Sharp Tabs Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <a
                key={tab.id}
                href={tab.href}
                className="sharp px-3 py-2 text-xs font-black text-[#1a1a1a] hover:bg-[#18191a] hover:text-white transition-all border border-transparent hover:border-black flex items-center gap-1.5 frame-shadow-hover"
              >
                <Icon className="w-3.5 h-3.5 opacity-70" />
                <span>{tab.label}</span>
              </a>
            );
          })}
        </nav>

        {/* LEFT: Quick Hotline Button with Sharp Corners */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href="tel:0314144"
            className="sharp px-3.5 py-2 bg-[#18191a] text-white text-xs font-black tracking-wider flex items-center gap-2 hover:bg-[#333] transition-colors border border-black shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-[#cbcccb]" />
            <span className="font-mono">۰۳۱-۴۱۴۴</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-black hover:bg-black/10 sharp border border-transparent transition-colors"
          aria-label="منوی سایت"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden mt-1.5 aluminum-bar sharp frame-shadow p-3 space-y-1 border border-[#b0b3b0]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <a
                key={tab.id}
                href={tab.href}
                onClick={() => setIsOpen(false)}
                className="sharp block px-3 py-2 text-xs font-bold text-[#1a1a1a] hover:bg-[#18191a] hover:text-white transition-colors border border-transparent hover:border-black flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </a>
            );
          })}
          <div className="pt-2 border-t border-[#b0b3b0]">
            <a
              href="tel:0314144"
              className="sharp w-full py-2 bg-[#18191a] text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#cbcccb]" />
              <span>تماس مستقیم: ۰۳۱-۴۱۴۴</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
