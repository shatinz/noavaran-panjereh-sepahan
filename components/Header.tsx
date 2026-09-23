'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Navigator' },
    { href: '/projects', label: 'Projects' },
    { href: '/calculator', label: 'Elamnitors' },
    { href: '/services', label: 'Layouts' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-3 sm:pt-4 pb-1">
      <div className="aluminum-bar rounded-xl px-5 sm:px-7 h-[58px] flex items-center justify-between">
        
        {/* LEFT: Logo & Brand Name */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Folded 3-panel architectural glass facade door icon */}
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
              {/* Outer vertical left frame */}
              <rect x="3" y="4" width="7" height="24" rx="0.5" />
              {/* Center angled folding leaf */}
              <polygon points="10,4 19,7 19,25 10,28" />
              {/* Right angled folding leaf with glass perspective */}
              <polygon points="19,7 27,9 27,23 19,25" />
              {/* Internal mullion detail lines */}
              <line x1="6.5" y1="4" x2="6.5" y2="28" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="14.5" y1="5.5" x2="14.5" y2="26.5" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="23" y1="8" x2="23" y2="24" strokeWidth="1.5" strokeOpacity="0.4" />
            </svg>
          </div>

          <div className="flex flex-col text-left leading-[1.05]">
            <span className="text-[12px] font-black text-black tracking-tight block">
              Noavaran
            </span>
            <span className="text-[12px] font-black text-black tracking-tight block">
              Panjereh
            </span>
            <span className="text-[12px] font-black text-black tracking-tight block">
              Sepahan
            </span>
          </div>
        </Link>

        {/* RIGHT: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((link, idx) => (
            <Link
              key={`${link.href}-${idx}`}
              href={link.href}
              className={`text-[13px] tracking-normal transition-colors ${
                pathname === link.href && link.label === 'Home'
                  ? 'text-black font-extrabold'
                  : 'text-[#2a2a2a] hover:text-black font-semibold'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-black hover:bg-black/5 rounded-lg transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 aluminum-bar rounded-xl p-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          {navLinks.map((link, idx) => (
            <Link
              key={`mob-${link.href}-${idx}`}
              href={link.href}
              className="block px-3 py-2 text-xs font-bold text-[#1a1a1a] hover:bg-white/30 rounded-md transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
