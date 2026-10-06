'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Image, Video, Settings, LogOut, ArrowRight, Building2, Layers, MessageSquare } from 'lucide-react';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch (e) {
      // offline/static mode
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('noavaran_admin_session');
    }
    router.push('/admin/login');
  };

  const navItems = [
    { href: '/admin', label: 'داشبورد اصلی', icon: LayoutDashboard },
    { href: '/admin/consultations', label: 'درخواست‌های مشاوره', icon: MessageSquare },
    { href: '/admin/articles', label: 'مدیریت مقالات', icon: FileText },
    { href: '/admin/projects', label: 'مدیریت پروژه‌ها', icon: Image },
    { href: '/admin/materials', label: 'سیستم‌ها و متریال', icon: Layers },
    { href: '/admin/videos', label: 'ویدیوهای آموزشی', icon: Video },
    { href: '/admin/settings', label: 'اطلاعات تماس و شرکت', icon: Settings },
  ];

  if (pathname === '/admin/login') {
    return null;
  }

  return (
    <div className="bg-charcoal-900 border-b border-charcoal-800 py-3 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
        {/* Title */}
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-bronze-500 text-charcoal-950 text-xs font-black">
            ADMIN
          </span>
          <span className="text-sm font-bold text-white">
            پنل مدیریت نوآوران پنجره سپاهان
          </span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-charcoal-800 text-bronze-400 border border-charcoal-700'
                    : 'text-titanium-400 hover:text-white hover:bg-charcoal-850'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs text-titanium-400 hover:text-white flex items-center gap-1"
            title="مشاهده سایت"
          >
            <span>نمایش سایت</span>
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 p-1"
            title="خروج از پنل"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>خروج</span>
          </button>
        </div>
      </div>
    </div>
  );
}
