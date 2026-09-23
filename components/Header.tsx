'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Building2 } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'صفحه اصلی' },
    { href: '/services', label: 'خدمات' },
    { href: '/projects', label: 'پروژه‌ها' },
    { href: '/calculator', label: 'ماشین‌آلات' },
    { href: '/articles', label: 'مقالات' },
    { href: '/contact', label: 'تماس' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="aluminum-surface border-b border-[#b5b8b5] shadow-card">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 h-[52px] flex items-center justify-between">

          {/* Logo — appears on RIGHT in RTL */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-[#1a1a1a] text-white flex items-center justify-center rounded-[3px] group-hover:bg-[#333] transition-colors">
              <Building2 className="w-[18px] h-[18px]" />
            </div>
            <div className="hidden sm:block leading-none">
              <span className="text-[13px] font-black text-[#1a1a1a] block">Noavaran</span>
              <span className="text-[10px] text-[#666] block font-medium leading-tight">Panjereh Sepahan</span>
            </div>
          </Link>

          {/* Desktop Navigation — appears on LEFT in RTL */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] transition-colors ${
                  pathname === link.href
                    ? 'text-[#1a1a1a] font-bold'
                    : 'text-[#555] hover:text-[#1a1a1a] font-medium'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#1a1a1a] hover:bg-black/5 rounded-[3px] transition-colors"
            aria-label="منوی اصلی"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="lg:hidden border-t border-[#b5b8b5] px-5 py-3 space-y-0.5 aluminum-surface">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2.5 text-sm rounded-[3px] transition-colors ${
                  pathname === link.href
                    ? 'text-[#1a1a1a] font-bold bg-white/20'
                    : 'text-[#555] hover:text-[#1a1a1a] font-medium hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
