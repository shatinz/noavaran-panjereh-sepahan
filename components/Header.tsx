'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, ChevronDown, Building2, Calculator, ShieldCheck } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'صفحه اصلی' },
    {
      href: '/services',
      label: 'نمونه پروفیل‌ها',
      isDropdown: true,
      subItems: [
        { href: '/services/curtain-wall-lamella', label: 'نمای کرتین وال (لامل)' },
        { href: '/services/frameless-facade', label: 'نمای شیشه‌ای فریم‌لس' },
        { href: '/services/aluminum-windows-doors', label: 'درب و پنجره ترمال‌بریک' },
        { href: '/services/composite-facade', label: 'نمای کامپوزیت آلومینیوم (ACP)' },
        { href: '/services/thermowood-facade', label: 'نمای چوب طبیعی ترموود' },
        { href: '/services/steel-glass-railings', label: 'نرده شیشه‌ای و حفاظ استیل' },
      ],
    },
    { href: '/projects', label: 'پروژه‌ها' },
    { href: '/videos', label: 'ویدیوها' },
    { href: '/calculator', label: 'محاسبه قیمت' },
    { href: '/articles', label: 'مقالات' },
    { href: '/about', label: 'درباره شرکت' },
    { href: '/contact', label: 'تماس با ما' },
  ];

  return (
    <header className="sticky top-2 z-50 mx-2 sm:mx-3 my-2">
      {/* 
        Header Bar with:
        - Aluminum Texture background (#cbcccb)
        - Sharp 0px corners (no rounded fillet)
        - Logo on LEFT side
        - Extremely subtle soft drop shadow
      */}
      <div className="aluminum-header subtle-soft-shadow rounded-none px-4 py-3 flex items-center justify-between border border-[#b5b8b5]">
        
        {/* RIGHT SIDE: Navigation Links & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 bg-[#b8bab8] text-[#18191a] hover:bg-[#a3a6a3] rounded-none transition-colors border border-[#9fa29f]"
            aria-label="منوی اصلی"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              if (link.isDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold rounded-none transition-all ${
                        active 
                          ? 'bg-[#18191a] text-white border border-[#18191a]' 
                          : 'text-[#18191a] hover:bg-[#b8bab8] border border-transparent'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                    </button>

                    {servicesOpen && (
                      <div className="absolute right-0 top-full mt-1 w-60 aluminum-card subtle-soft-shadow rounded-none p-1.5 space-y-1 z-50">
                        {link.subItems?.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-3 py-2 text-xs font-bold text-[#18191a] hover:bg-[#18191a] hover:text-white rounded-none transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-extrabold rounded-none transition-all border ${
                    active
                      ? 'bg-[#18191a] text-white border-[#18191a]'
                      : 'text-[#18191a] hover:bg-[#b8bab8] border-transparent'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Phone Hotline Link */}
          <a
            href="tel:0314144"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#18191a] text-white text-xs font-bold rounded-none font-mono hover:bg-[#2c2e30] transition-colors border border-[#18191a]"
          >
            <Phone className="w-3.5 h-3.5 text-[#cbcccb]" />
            <span>۰۳۱-۴۱۴۴</span>
          </a>
        </div>

        {/* LEFT SIDE: Logo & Brand Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="text-right hidden sm:block">
            <span className="text-sm font-black text-[#18191a] block leading-tight tracking-tight">
              نوآوران پنجره سپاهان
            </span>
            <span className="text-[9px] text-[#484c50] block tracking-widest uppercase font-mono font-bold">
              Noavaran Panjereh
            </span>
          </div>
          <div className="w-9 h-9 bg-[#18191a] text-[#cbcccb] flex items-center justify-center rounded-none shadow-sm group-hover:bg-[#2c2e30] transition-colors border border-[#18191a]">
            <Building2 className="w-5 h-5 text-white" />
          </div>
        </Link>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden aluminum-card border border-[#b5b8b5] p-4 space-y-2 mt-1 subtle-soft-shadow">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 text-xs font-bold rounded-none transition-colors border ${
                pathname === link.href
                  ? 'bg-[#18191a] text-white border-[#18191a]'
                  : 'text-[#18191a] hover:bg-[#b8bab8] border-transparent'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#b5b8b5] flex items-center justify-between">
            <a
              href="tel:0314144"
              className="text-xs font-mono font-black text-[#18191a] flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              تماس: ۰۳۱-۴۱۴۴
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
