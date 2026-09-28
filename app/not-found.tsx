import React from 'react';
import Link from 'next/link';
import { Home, Search, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-ink-950 border border-ink-800 rounded-2xl p-8 md:p-12 max-w-lg w-full text-center metal-shadow space-y-6">
        <div className="relative inline-block">
          <div className="text-9xl font-black text-ink-900 font-mono select-none drop-shadow-md">
            404
          </div>
          <AlertTriangle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-signal-500 drop-shadow-[0_0_15px_rgba(171,0,23,0.5)]" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white font-vazir">صفحه مورد نظر یافت نشد</h1>
          <p className="text-steel-400 font-vazir text-sm leading-relaxed">
            متأسفانه آدرسی که جستجو کرده‌اید تغییر یافته یا دیگر وجود ندارد.
          </p>
        </div>

        <div className="pt-6 border-t border-ink-800 flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-signal-500 hover:bg-signal-400 text-white font-bold rounded-lg transition-colors font-vazir"
          >
            <Home className="w-5 h-5" />
            بازگشت به صفحه اصلی
          </Link>
          <Link 
            href="/services"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-ink-900 hover:bg-ink-800 text-white font-bold rounded-lg border border-ink-800 transition-colors font-vazir"
          >
            <Search className="w-5 h-5" />
            مشاهده خدمات
          </Link>
        </div>
      </div>
    </div>
  );
}
