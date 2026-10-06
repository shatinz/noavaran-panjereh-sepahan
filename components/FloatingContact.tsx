"use client";

import React, { useState, useEffect } from "react";
import { Phone, MessageSquare, X } from "lucide-react";
import settingsData from "../data/settings.json";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { factoryPhones, socialLinks } = settingsData;

  // Show after scrolling down 300px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-30 flex flex-col items-end floating-contact-btn transition-all duration-300" dir="rtl">
      {isOpen && (
        <div className="mb-4 bg-ink-950 border border-ink-800 metal-shadow rounded-2xl p-4 w-64 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-ink-800">
            <span className="font-bold text-white font-vazir text-sm">ارتباط سریع</span>
            <button onClick={() => setIsOpen(false)} className="text-steel-400 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            <a href={`tel:${factoryPhones[0].replace(/\D/g, '')}`} className="flex items-center gap-3 p-2 hover:bg-ink-900 rounded-lg transition-colors group">
              <div className="w-8 h-8 rounded-full bg-signal-500/20 text-signal-500 flex items-center justify-center group-hover:bg-signal-500 group-hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-steel-400 font-vazir">تماس با کارخانه</span>
                <span className="text-sm font-bold text-white font-sans"><bdi dir="ltr" style={{ unicodeBidi: 'isolate' }}>{factoryPhones[0]}</bdi></span>
              </div>
            </a>
            
            <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 hover:bg-ink-900 rounded-lg transition-colors group">
              <div className="w-8 h-8 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-steel-400 font-vazir">پشتیبانی واتساپ</span>
                <span className="text-sm font-bold text-white font-vazir">ارسال پیام</span>
              </div>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center metal-shadow transition-all duration-300 ${
          isOpen ? "bg-ink-800 text-white rotate-90" : "bg-signal-500 hover:bg-signal-400 text-white hover:scale-105"
        }`}
        aria-label="تماس با ما"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}
