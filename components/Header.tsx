"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";
import { withBasePath } from "@/lib/media";
import { useLanguage } from "@/lib/i18n/context";
import { LanguageSwitcher } from "./ui/LanguageSwitcher";

export function Header({ phone }: { phone: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t, dir, isRTL } = useLanguage();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: t('nav.home') },
    { href: "/services", label: t('nav.services') },
    { href: "/materials", label: t('nav.materials') },
    { href: "/projects", label: t('nav.projects') },
    { href: "/videos", label: t('nav.videos') },
    { href: "/articles", label: t('nav.articles') },
    { href: "/about", label: t('nav.about') },
    { href: "/contact", label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full" dir={dir}>
      {/* Aluminum Header Bar */}
      <div className="bg-metal-brushed metal-shadow border-b border-steel-200">
        <div className="max-w-[1440px] mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src={withBasePath("/images/logo-header.webp")}
                alt="نوآوران پنجره سپاهان"
                fill
                className="object-contain"
                priority
                sizes="48px"
              />
            </div>
            <div className="flex flex-col text-ink-950 leading-tight min-w-0">
              <span className="text-sm md:text-base font-black tracking-tight font-vazir whitespace-nowrap">
                {t('nav.brandName')}
              </span>
              <span className="text-[9px] md:text-[11px] font-bold font-sans tracking-wider uppercase opacity-75 whitespace-nowrap overflow-hidden text-ellipsis">
                {t('nav.brandSub')}
              </span>
            </div>
          </Link>

          {/* CENTER: Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-1.5 text-xs xl:text-sm font-bold font-vazir whitespace-nowrap transition-all relative group ${
                  pathname === link.href
                    ? "text-signal-500"
                    : "text-ink-900 hover:text-signal-500"
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 ${isRTL ? 'right-0 origin-right' : 'left-0 origin-left'} w-full h-0.5 bg-signal-500 transition-transform ${pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            ))}
          </nav>

          {/* Nav links for lg screens (compact) */}
          <nav className="hidden lg:flex xl:hidden items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2 py-1.5 text-xs font-bold font-vazir whitespace-nowrap transition-all relative group ${
                  pathname === link.href
                    ? "text-signal-500"
                    : "text-ink-900 hover:text-signal-500"
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 ${isRTL ? 'right-0 origin-right' : 'left-0 origin-left'} w-full h-0.5 bg-signal-500 transition-transform ${pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            ))}
          </nav>

          {/* ACTIONS: (Language Switcher, Phone, Consultation CTA, Hamburger) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher Button */}
            <LanguageSwitcher />

            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="hidden 2xl:flex items-center gap-1.5 text-ink-950 font-bold hover:text-signal-500 transition-colors font-sans text-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <bdi dir="ltr" style={{ unicodeBidi: 'isolate' }}>{phone}</bdi>
            </a>
            <Button variant="primary" href="/contact" className="hidden sm:inline-flex text-xs py-2 px-3.5 whitespace-nowrap">
              {t('nav.consultationCta')}
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-ink-950 hover:bg-ink-900/10 rounded-md transition-colors"
              aria-label={t('nav.mobileMenuTitle')}
              aria-expanded={isOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer Content */}
      <div 
        className={`fixed top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} h-full w-4/5 max-w-sm bg-ink-950 z-50 transform transition-transform duration-300 lg:hidden flex flex-col border-ink-800 metal-shadow ${
          isOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-ink-800">
          <span className="text-white font-bold font-vazir">{t('nav.mobileMenuTitle')}</span>
          <button onClick={() => setIsOpen(false)} className="p-2 text-steel-400 hover:text-white" aria-label={t('nav.close')}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Language Selector */}
        <div className="p-4 border-b border-ink-800/60 bg-ink-900/40">
          <LanguageSwitcher variant="drawer" />
        </div>

        <div className="flex flex-col p-4 overflow-y-auto flex-grow">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`px-4 py-3 text-base font-bold font-vazir border-b border-ink-800/50 ${
                pathname === link.href ? "text-signal-500" : "text-white hover:text-signal-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-6 flex flex-col gap-4 mt-auto">
            <Button variant="primary" href="/contact" className="w-full justify-center">
              {t('nav.consultationCta')}
            </Button>
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="w-full py-3 border border-steel-500 text-white rounded-lg flex items-center justify-center gap-2 font-sans font-bold"
            >
              <Phone className="w-4 h-4" />
              <bdi dir="ltr" style={{ unicodeBidi: 'isolate' }}>{phone}</bdi>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
