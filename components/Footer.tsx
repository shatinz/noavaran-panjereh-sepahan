'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, Building2, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-4 pb-8 mt-6">
      <div className="aluminum-card rounded-2xl p-6 sm:p-10 border border-[#b2b4b2] shadow-mockup-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">

          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-black text-white flex items-center justify-center rounded-lg shadow-sm">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className="text-sm font-black text-black block tracking-tight">Noavaran Panjereh</span>
                <span className="text-[10px] text-[#555] block font-mono uppercase tracking-wider">Sepahan Co.</span>
              </div>
            </div>
            <p className="text-[11.5px] text-[#444] leading-relaxed font-medium">
              Architectural engineering and precision fabrication of high-rise glass curtain walls, frameless systems, and European thermal-break aluminum fenestration.
            </p>
          </div>

          {/* Col 2: Architectural Systems */}
          <div>
            <h3 className="text-xs font-black text-[#1a1a1a] uppercase tracking-wider mb-3 border-l-2 border-black pl-2">
              Facade Systems
            </h3>
            <ul className="space-y-2 text-[11.5px] font-semibold text-[#444]">
              <li>
                <Link href="/services/curtain-wall-lamella" className="hover:text-black hover:underline flex items-center justify-between transition-colors">
                  <span>Curtain Wall (Lamella)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/services/frameless-facade" className="hover:text-black hover:underline flex items-center justify-between transition-colors">
                  <span>Frameless Glass Facade</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/services/aluminum-windows-doors" className="hover:text-black hover:underline flex items-center justify-between transition-colors">
                  <span>Thermal Break &amp; Lift-Slide</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/services/composite-facade" className="hover:text-black hover:underline flex items-center justify-between transition-colors">
                  <span>Aluminum Composite (ACP)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Portal */}
          <div>
            <h3 className="text-xs font-black text-[#1a1a1a] uppercase tracking-wider mb-3 border-l-2 border-black pl-2">
              Navigation
            </h3>
            <ul className="space-y-2 text-[11.5px] font-semibold text-[#444]">
              <li><Link href="/projects" className="hover:text-black hover:underline block">Iconic Projects Archive (50+)</Link></li>
              <li><Link href="/calculator" className="hover:text-black hover:underline block">Online Window Cost Estimator</Link></li>
              <li><Link href="/articles" className="hover:text-black hover:underline block">Technical Knowledgebase</Link></li>
              <li><Link href="/about" className="hover:text-black hover:underline block">Company Profile &amp; Factory</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Factory */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-black text-[#1a1a1a] uppercase tracking-wider mb-3 border-l-2 border-black pl-2">
              Headquarters
            </h3>
            <div className="space-y-2 text-[11.5px]">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <a href="tel:0314144" className="font-mono text-sm font-black text-black hover:underline block">
                  ۰۳۱-۴۱۴۴
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <span className="text-[11.5px] leading-relaxed text-[#444] font-medium">
                  Isfahan, Jey Industrial City, 28th St., Alley 4
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-[#b2b4b2] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#666] font-semibold gap-2">
          <p>© {new Date().getFullYear()} Noavaran Panjereh Sepahan Co. All rights reserved.</p>
          <p className="font-mono text-[10.5px]">
            iPhone 17 Pro Brushed Aluminum Edition
          </p>
        </div>
      </div>
    </footer>
  );
}
