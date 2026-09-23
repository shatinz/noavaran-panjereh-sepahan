'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, ChevronDown, Video, Layers, Building2, BookOpen, Calculator, ShieldCheck } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'صفحه اصلی' },
    {
      href: '/services',
      label: 'خدمات و سیستم‌ها',
      isDropdown: true,
      subItems: [
        { href: '/services/curtain-wall-lamella', label: 'نمای کرتین وال (لامل)' },
        { href: '/services/frameless-facade', label: 'نمای شیشه‌ای فریم‌لس' },
        { href: '/services/aluminum-windows-doors', label: 'درب و پنجره ترمال‌بریک' },
        { href: '/services/composite-facade', label: 'نمای کامپوزیت آلومینیوم' },
        { href: '/services/thermowood-facade', label: 'نمای چوبی ترموود' },
        { href: '/services/steel-glass-railings', label: 'حفاظ استیل و نرده شیشه‌ای' },
      ],
    },
    { href: '/projects', label: 'پروژه‌های شاخص' },
    { href: '/videos', label: 'ویدیوهای آموزشی', badge: 'آپارات و یوتیوب' },
    { href: '/calculator', label: 'محاسبه‌گر پیش‌فاکتور' },
    { href: '/articles', label: 'دانشنامه و مقالات' },
    { href: '/about', label: 'درباره شرکت' },
    { href: '/contact', label: 'تماس با ما' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-charcoal-900/95 backdrop-blur-md border-b border-charcoal-800 shadow-xl py-3'
          : 'bg-charcoal-950/80 backdrop-blur-sm border-b border-charcoal-850 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-bronze-500 to-bronze-700 flex items-center justify-center text-charcoal-950 font-bold shadow-md shadow-bronze-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-charcoal-950" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white block leading-tight">
                نوآوران پنجره <span className="text-bronze-400">سپاهان</span>
              </span>
              <span className="text-[10px] text-titanium-400 block tracking-widest uppercase font-mono">
                Architectural Facades & Windows
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
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
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        active ? 'text-bronze-400 font-semibold' : 'text-titanium-300 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4 opacity-70" />
                    </button>

                    {servicesOpen && (
                      <div className="absolute right-0 top-full mt-1 w-64 rounded-xl bg-charcoal-850 border border-charcoal-700/80 shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-150">
                        {link.subItems?.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-3 py-2.5 text-xs text-titanium-200 hover:text-bronze-300 hover:bg-charcoal-800 rounded-lg transition-colors"
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
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors relative ${
                    active ? 'text-bronze-400 font-semibold' : 'text-titanium-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="mr-1.5 text-[9px] bg-bronze-500/20 text-bronze-300 px-1.5 py-0.5 rounded border border-bronze-500/30">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick CTA Phone */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:0314144"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bronze-500/10 hover:bg-bronze-500/20 text-bronze-400 border border-bronze-500/30 transition-all font-mono text-sm tracking-wider group"
              title="تماس فوری با کارشناسان فنی"
            >
              <Phone className="w-4 h-4 text-bronze-400 group-hover:rotate-12 transition-transform" />
              <span>۰۳۱-۴۱۴۴</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="tel:0314144"
              className="p-2 rounded-lg bg-bronze-500/20 text-bronze-400 border border-bronze-500/30"
              title="تماس مستقیم"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-charcoal-800 text-titanium-300 hover:text-white"
              aria-label="منوی سایت"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-charcoal-900 border-b border-charcoal-800 px-4 pt-3 pb-6 space-y-1">
          {navLinks.map((link) => {
            if (link.isDropdown) {
              return (
                <div key={link.href} className="py-1">
                  <div className="text-xs font-bold text-titanium-400 px-3 py-1 uppercase tracking-wider">
                    {link.label}
                  </div>
                  <div className="pr-4 space-y-1 mt-1 border-r border-charcoal-700">
                    {link.subItems?.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-2 text-sm text-titanium-200 hover:text-bronze-400"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 text-sm font-medium text-titanium-200 hover:text-bronze-400 rounded-lg hover:bg-charcoal-800"
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 mt-2 border-t border-charcoal-800 flex items-center justify-between">
            <Link
              href="/admin"
              className="text-xs text-titanium-400 hover:text-bronze-400 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              ورود به پنل مدیریت
            </Link>
            <a
              href="tel:0314144"
              className="text-xs text-bronze-400 font-mono flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              خط ۴ رقمی: ۴۱۴۴-۰۳۱
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
