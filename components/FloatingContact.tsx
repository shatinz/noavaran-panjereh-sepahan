'use client';

import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2.5">
      {/* WhatsApp */}
      <a
        href="https://wa.me/989139090673"
        target="_blank"
        rel="noreferrer"
        className="w-11 h-11 sharp bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center frame-shadow transition-all hover:scale-105 active:scale-95 border border-emerald-700"
        title="ارسال نقشه و پیام در واتساپ"
        aria-label="ارسال پیام واتساپ"
      >
        <MessageSquare className="w-5 h-5" />
      </a>

      {/* Direct Call */}
      <a
        href="tel:0314144"
        className="w-11 h-11 sharp bg-[#18191a] hover:bg-[#333] text-white flex items-center justify-center frame-shadow transition-all hover:scale-105 active:scale-95 border border-black"
        title="تماس مستقیم: ۰۳۱-۴۱۴۴"
        aria-label="تماس با شرکت"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
