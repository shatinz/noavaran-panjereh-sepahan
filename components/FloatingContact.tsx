'use client';

import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href="https://wa.me/989139090673"
        target="_blank"
        rel="noreferrer"
        className="w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20 transition-all hover:scale-110 active:scale-95"
        title="ارسال نقشه و پیام در واتساپ"
        aria-label="ارسال پیام واتساپ"
      >
        <MessageSquare className="w-5 h-5" />
      </a>

      {/* Direct Call */}
      <a
        href="tel:0314144"
        className="w-11 h-11 rounded-full bg-[#1a1a1a] hover:bg-[#333] text-white flex items-center justify-center shadow-lg shadow-black/20 transition-all hover:scale-110 active:scale-95"
        title="تماس مستقیم: ۰۳۱-۴۱۴۴"
        aria-label="تماس با شرکت"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
