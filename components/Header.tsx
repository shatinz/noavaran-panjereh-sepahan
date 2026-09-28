"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";
import { withBasePath } from "@/lib/media";
import settingsData from "@/data/settings.json";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const phone = settingsData.factoryPhones[0];

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
    { href: "/", label: "خانه" },
    { href: "/services", label: "خدمات" },
    { href: "/materials", label: "محصولات" },
    { href: "/projects", label: "پروژه‌ها" },
    { href: "/videos", label: "ویدیوها" },
    { href: "/articles", label: "مقالات" },
    { href: "/calculator", label: "ماشین‌حساب" },
    { href: "/about", label: "درباره ما" },
    { href: "/contact", label: "ارتباط با ما" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full" dir="rtl">
      {/* Aluminum Header Bar */}
      <div className="bg-metal-brushed metal-shadow border-b border-steel-200">
        <div className="max-w-[1440px] mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* RIGHT: Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src={withBasePath("/images/icon.svg")}
                alt="نوآوران پنجره سپاهان"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col text-ink-950 leading-tight">
              <span className="text-sm md:text-base font-black tracking-tight font-vazir">
                نوآوران پنجره سپاهان
              </span>
              <span className="text-[10px] md:text-xs font-bold font-sans tracking-widest uppercase opacity-70">
                Noavaran Panjereh
              </span>
            </div>
          </Link>

          {/* CENTER: Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-bold font-vazir transition-all relative group ${
                  pathname === link.href
                    ? "text-signal-500"
                    : "text-ink-900 hover:text-signal-500"
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 right-0 w-full h-0.5 bg-signal-500 transition-transform origin-right ${pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            ))}
          </nav>

          {/* LEFT: Actions (EN pill, CTA, Phone, Hamburger) */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center bg-ink-950 text-white text-[10px] font-bold px-2 py-1 rounded cursor-pointer hover:bg-ink-800 transition-colors">
              EN
            </div>
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="hidden md:flex items-center gap-2 text-ink-950 font-bold hover:text-signal-500 transition-colors font-sans"
            >
              <Phone className="w-4 h-4" />
              <bdi dir="ltr" style={{ unicodeBidi: 'isolate' }}>{phone}</bdi>
            </a>
            <Button variant="primary" href="/contact" className="hidden sm:inline-flex text-sm py-2 px-4">
              درخواست مشاوره
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-ink-950 hover:bg-ink-900/10 rounded-md transition-colors"
              aria-label="منوی سایت"
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
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-ink-950 z-50 transform transition-transform duration-300 lg:hidden flex flex-col border-l border-ink-800 metal-shadow ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-ink-800">
          <span className="text-white font-bold font-vazir">منوی دسترسی</span>
          <button onClick={() => setIsOpen(false)} className="p-2 text-steel-400 hover:text-white" aria-label="بستن منو">
            <X className="w-6 h-6" />
          </button>
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
              درخواست مشاوره
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
