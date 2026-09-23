'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  PlaySquare, 
  Package, 
  Flame, 
  Award, 
  Headset, 
  Phone, 
  Layers, 
  Maximize, 
  Grid, 
  Box, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Send, 
  Clock, 
  MapPin, 
  Building2, 
  Cpu, 
  Sliders,
  ChevronLeft
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'motion' | 'products' | 'bestsellers' | 'resume' | 'contact'>('motion');
  const [motionPlaying, setMotionPlaying] = useState(true);
  const [windowSlidePos, setWindowSlidePos] = useState(30);
  const [bestsellerFilter, setBestsellerFilter] = useState<'all' | 'bestseller' | 'new'>('all');

  // Listen to hash changes in URL
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#tab-', '');
      if (['motion', 'products', 'bestsellers', 'resume', 'contact'].includes(hash)) {
        setActiveTab(hash as any);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const tabs = [
    { id: 'motion', label: 'تب ۱: موشن نما و پنجره', icon: PlaySquare, desc: 'انیمیشن و موشن متحرک سیستم‌های نما' },
    { id: 'products', label: 'تب ۲: نمایش محصولات', icon: Package, desc: 'کاتالوگ جامع سیستم‌های آلومینیوم' },
    { id: 'bestsellers', label: 'تب ۳: جدید و پرفروش', icon: Flame, desc: 'محصولات جدید و پرفروش‌ترین‌ها' },
    { id: 'resume', label: 'تب ۴: رزومه و پروژه‌ها', icon: Award, desc: 'کارنامه ۵۰+ پروژه شاخص مهندسی' },
    { id: 'contact', label: 'تب ۵: تماس و ارتباط', icon: Headset, desc: 'دفتر مرکزی، کارخانه و استعلام سریع' },
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 py-4 space-y-5">
      
      {/* ═══════════════════════════════════════════════════════════
          MAIN TAB SWITCHER BAR (Sharp 0px angles, #cbcccb with frame shadow)
          ═══════════════════════════════════════════════════════════ */}
      <div className="aluminum-card sharp frame-shadow p-2 border border-[#b0b3b0]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 sm:gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  window.location.hash = `tab-${tab.id}`;
                }}
                className={`sharp p-3 sm:p-3.5 text-right transition-all flex flex-col justify-between border ${
                  isActive
                    ? 'bg-[#18191a] text-white border-black shadow-md'
                    : 'bg-[#cbcccb] text-[#1a1a1a] hover:bg-[#b8bab8] border-[#9ea19e] hover:border-black'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isActive ? 'text-[#cbcccb]' : 'text-[#444]'}`}>
                    {tab.id.toUpperCase()}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-black'}`} />
                </div>
                <div>
                  <h3 className={`text-xs sm:text-[13px] font-black leading-tight ${isActive ? 'text-white' : 'text-black'}`}>
                    {tab.label}
                  </h3>
                  <p className={`text-[10px] hidden sm:block mt-1 font-medium line-clamp-1 ${isActive ? 'text-gray-300' : 'text-[#555]'}`}>
                    {tab.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          TAB 1: موشن از پنجره و ساختمان (WINDOW & BUILDING MOTION)
          ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'motion' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          
          {/* Main Motion Screen Frame */}
          <div className="aluminum-card sharp frame-shadow p-3 sm:p-4 border border-[#b0b3b0]">
            
            {/* Header Strip inside Frame */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#a8aba8] px-1 text-right">
              <div>
                <span className="text-[10px] font-mono font-extrabold text-[#444] uppercase block">
                  INTERACTIVE MOTION VIEW · TAB 1
                </span>
                <h2 className="text-sm sm:text-base font-black text-black">
                  موشن تعاملی عملکرد پنجره لیفت‌اند‌اسلاید و نمای مرتفع شیشه‌ای
                </h2>
              </div>

              {/* Motion playback toggles */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMotionPlaying(!motionPlaying)}
                  className={`sharp px-3 py-1.5 text-xs font-black border transition-all ${
                    motionPlaying 
                      ? 'bg-[#18191a] text-white border-black' 
                      : 'bg-white text-black border-[#888]'
                  }`}
                >
                  {motionPlaying ? 'موشن خودکار فعال' : 'توقف موشن'}
                </button>
              </div>
            </div>

            {/* Motion Viewport Screen */}
            <div className="relative h-[440px] sm:h-[560px] lg:h-[620px] bg-[#0c0e12] overflow-hidden sharp border border-black/20 frame-shadow">
              
              {/* Layer 1: Background Panoramic Cityscape Skyline */}
              <img
                src="https://arvinpanjereh.com/upload/service/742b5647-017c-4a6e-b416-a184adf97dcc.webp"
                alt="نمای ساختمان شهری و برج شیشه‌ای"
                className="absolute inset-0 w-full h-full object-cover scale-105"
              />

              {/* Dynamic Sunlight / Glass Reflection Ray Animation */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent w-[50%] h-full animate-light-sweep" />

              {/* Layer 2: Moving Window Panel System (Sliding Door Simulation) */}
              <div 
                className={`absolute inset-y-0 right-0 w-[55%] border-l-4 border-[#cbcccb] bg-black/40 backdrop-blur-[2px] shadow-2xl transition-all duration-700 flex flex-col justify-between p-4 ${
                  motionPlaying ? 'animate-window-slide' : ''
                }`}
                style={!motionPlaying ? { transform: `translateX(-${windowSlidePos}%)` } : {}}
              >
                {/* Aluminum Profile Frame Accent on Window */}
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                  <span className="text-[10px] font-mono text-[#cbcccb] font-bold">
                    سیستم کشویی سنگین: مقطع ۱۲۰ میلی‌متر آکپای
                  </span>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                </div>

                {/* Handle & Lock Hardware */}
                <div className="self-start my-auto flex items-center gap-2 bg-[#18191a]/90 text-white px-3 py-2 sharp border border-white/30 frame-shadow">
                  <Sliders className="w-4 h-4 text-[#cbcccb]" />
                  <span className="text-[11px] font-mono font-bold">دستگیره و یراق‌آلات ROTO آلمان</span>
                </div>

                <div className="text-right space-y-1 bg-black/75 p-3 sharp border border-white/20">
                  <div className="text-xs font-bold text-white">شیشه دوجداره ۶+۱۲+۶ لمینت عایق صوتی</div>
                  <div className="text-[10px] text-gray-300 font-mono">U-Value: 1.1 W/m²K · Sound: 42 dB</div>
                </div>
              </div>

              {/* Bottom Text Overlay with Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none" />

              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 lg:p-10 space-y-3 text-right z-10">
                <span className="sharp inline-block px-3 py-1 bg-[#cbcccb] text-[#18191a] text-[11px] font-black border border-black shadow-md">
                  مهندسی تخصصی سیستم‌های نما و بازشوهای مرتفع
                </span>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight text-shadow-heading">
                  راهکارهای مدرن نما: ساخت آینده معماری
                </h1>

                <p className="text-xs sm:text-sm text-gray-200 max-w-2xl font-medium leading-relaxed">
                  طراحی، محاسبات بار باد و زلزله، تولید صنعتی و اجرای دقیق نماهای کرتین‌وال لامل و پنجره‌های ترمال‌بریک لوکس برای پروژه‌های شاخص کشور.
                </p>

                {/* Interactive Slider if motion is paused */}
                {!motionPlaying && (
                  <div className="pt-2 max-w-xs space-y-1">
                    <span className="text-[10px] text-gray-300 font-bold block">
                      کنترل دستی بازشو پنجره: {windowSlidePos}٪
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="75"
                      value={windowSlidePos}
                      onChange={(e) => setWindowSlidePos(Number(e.target.value))}
                      className="w-full accent-[#cbcccb] cursor-pointer"
                    />
                  </div>
                )}

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('products')}
                    className="sharp px-6 py-2.5 bg-[#cbcccb] hover:bg-[#b8bab8] text-black text-xs font-black border border-black shadow-md transition-all flex items-center gap-2"
                  >
                    <span>مشاهده محصولات و مشخصات فنی</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <a
                    href="tel:0314144"
                    className="sharp px-5 py-2.5 bg-[#18191a] hover:bg-[#2c2e30] text-white text-xs font-bold border border-white/30 shadow-md transition-all flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#cbcccb]" />
                    <span>مشاوره فوری: ۴۱۴۴-۰۳۱</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom 3 Engineering Metrics in Sharp Aluminum Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <div className="aluminum-card sharp frame-shadow p-3.5 border border-[#b0b3b0] text-right">
                <div className="text-xl sm:text-2xl font-black text-black font-mono">۴۲ dB</div>
                <div className="text-xs font-bold text-[#333] mt-1">مهار کامل آلودگی صوتی با گاز آرگون</div>
              </div>

              <div className="aluminum-card sharp frame-shadow p-3.5 border border-[#b0b3b0] text-right">
                <div className="text-xl sm:text-2xl font-black text-black font-mono">۱.۱ W/m²K</div>
                <div className="text-xs font-bold text-[#333] mt-1">ضریب انتقال حرارت عایق (کاهش ۴۵٪ انرژی)</div>
              </div>

              <div className="aluminum-card sharp frame-shadow p-3.5 border border-[#b0b3b0] text-right">
                <div className="text-xl sm:text-2xl font-black text-black font-mono">کلاس ۴ اروپا</div>
                <div className="text-xs font-bold text-[#333] mt-1">نفوذناپذیری هوا و آب‌بندی با لاستیک‌های EPDM</div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB 2: نمایش محصولات (PRODUCTS SHOWCASE)
          ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'products' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          
          <div className="aluminum-card sharp frame-shadow p-4 sm:p-5 border border-[#b0b3b0]">
            <div className="border-b border-[#a8aba8] pb-3 mb-5 text-right">
              <span className="text-[10px] font-mono font-extrabold text-[#444] uppercase block">
                FULL CATALOG · TAB 2
              </span>
              <h2 className="text-base sm:text-lg font-black text-black">
                کاتالوگ تخصصی سیستم‌های نما، پنجره‌های آلومینیومی و بازشوهای مهندسی
              </h2>
              <p className="text-xs text-[#444] font-medium mt-1">
                تولید شده با به‌روزترین بیلت‌های آلیاژی ۶۰۶۳ استاندارد، خط رنگ پودری الکترواستاتیک و آنادایز اروپایی
              </p>
            </div>

            {/* Products 6-Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Product 1 */}
              <div className="aluminum-card sharp frame-shadow p-3 border border-[#b0b3b0] flex flex-col justify-between text-right group">
                <div className="relative h-56 bg-black sharp overflow-hidden border border-black/20 frame-shadow">
                  <img
                    src="https://arvinpanjereh.com/upload/service/742b5647-017c-4a6e-b416-a184adf97dcc.webp"
                    alt="نمای کرتین وال لامل"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <span className="absolute top-2 right-2 sharp px-2.5 py-1 bg-[#cbcccb] text-[#18191a] text-[10px] font-black border border-black">
                    نمای شیشه‌ای
                  </span>
                  <div className="absolute bottom-2 right-2 left-2 text-white">
                    <h3 className="text-sm font-black">نمای کرتین‌وال لامل (Stick &amp; Unitized)</h3>
                  </div>
                </div>
                <div className="pt-3 space-y-2">
                  <p className="text-[11.5px] text-[#333] leading-relaxed">
                    سیستم خودایستای نمای شیشه‌ای با مقاطع عمودی (Mullion) و افقی (Transom) جهت نماهای مرتفع بدون ستون مریی.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono font-bold bg-[#b8bab8] p-2 sharp border border-[#9ea19e]">
                    <span>عرض نما: ۵۰ الی ۶۰ mm</span>
                    <span>ممان اینرسی: تا ۵۵۰ cm⁴</span>
                  </div>
                </div>
              </div>

              {/* Product 2 */}
              <div className="aluminum-card sharp frame-shadow p-3 border border-[#b0b3b0] flex flex-col justify-between text-right group">
                <div className="relative h-56 bg-black sharp overflow-hidden border border-black/20 frame-shadow">
                  <img
                    src="https://arvinpanjereh.com/upload/service/0faef799-a472-46be-83bf-7cf42bbfaaa3.webp"
                    alt="درب و پنجره ترمال بریک"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <span className="absolute top-2 right-2 sharp px-2.5 py-1 bg-[#cbcccb] text-[#18191a] text-[10px] font-black border border-black">
                    سیستم پنجره
                  </span>
                  <div className="absolute bottom-2 right-2 left-2 text-white">
                    <h3 className="text-sm font-black">پنجره آلومینیوم ترمال‌بریک (Thermal Break)</h3>
                  </div>
                </div>
                <div className="pt-3 space-y-2">
                  <p className="text-[11.5px] text-[#333] leading-relaxed">
                    عایق‌بندی صددرصد با تیغه‌های پلی‌آمید تقویت‌شده ۲۴ میلی‌متر جهت جلوگیری از پل حرارتی و تعریق شیشه.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono font-bold bg-[#b8bab8] p-2 sharp border border-[#9ea19e]">
                    <span>ضخامت فریم: ۶۰ الی ۷۵ mm</span>
                    <span>تنوع بازشو: تک و دوحالته</span>
                  </div>
                </div>
              </div>

              {/* Product 3 */}
              <div className="aluminum-card sharp frame-shadow p-3 border border-[#b0b3b0] flex flex-col justify-between text-right group">
                <div className="relative h-56 bg-black sharp overflow-hidden border border-black/20 frame-shadow">
                  <img
                    src="https://arvinpanjereh.com/upload/service/2f5bb5ed-60bb-49e5-9003-8be94921ad5e.webp"
                    alt="سیستم لیفت اند اسلاید"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <span className="absolute top-2 right-2 sharp px-2.5 py-1 bg-[#cbcccb] text-[#18191a] text-[10px] font-black border border-black">
                    بازشو فوق‌لوکس
                  </span>
                  <div className="absolute bottom-2 right-2 left-2 text-white">
                    <h3 className="text-sm font-black">پنجره فوق‌لوکس لیفت‌اند‌اسلاید (Lift &amp; Slide)</h3>
                  </div>
                </div>
                <div className="pt-3 space-y-2">
                  <p className="text-[11.5px] text-[#333] leading-relaxed">
                    مکانیزم بالابرنده کشویی برای لنگه‌های سنگین تا وزن ۴۰۰ کیلوگرم با حرکت روان و بدون اصطکاک.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono font-bold bg-[#b8bab8] p-2 sharp border border-[#9ea19e]">
                    <span>تحمل وزن: تا ۴۰۰ کیلوگرم</span>
                    <span>عرض دهانه: تا ۶ متر یکپارچه</span>
                  </div>
                </div>
              </div>

              {/* Product 4 */}
              <div className="aluminum-card sharp frame-shadow p-3 border border-[#b0b3b0] flex flex-col justify-between text-right group">
                <div className="relative h-56 bg-black sharp overflow-hidden border border-black/20 frame-shadow">
                  <img
                    src="https://arvinpanjereh.com/upload/service/4eb9bebe-fbcf-49b0-bc35-12e0b62e49c7.webp"
                    alt="نمای شیشه‌ای فریم‌لس"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <span className="absolute top-2 right-2 sharp px-2.5 py-1 bg-[#cbcccb] text-[#18191a] text-[10px] font-black border border-black">
                    فریم مخفی
                  </span>
                  <div className="absolute bottom-2 right-2 left-2 text-white">
                    <h3 className="text-sm font-black">نمای شیشه‌ای فریم‌لس (Frameless Structural)</h3>
                  </div>
                </div>
                <div className="pt-3 space-y-2">
                  <p className="text-[11.5px] text-[#333] leading-relaxed">
                    سطح کاملاً یکدست شیشه‌ای از نمای خارجی با حداقل درز ژوئن و بازشوهای کاملاً مخفی از دید ناظر.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono font-bold bg-[#b8bab8] p-2 sharp border border-[#9ea19e]">
                    <span>فاصله ژوئن: ۱۰ الی ۲۰ mm</span>
                    <span>چسب سیلیکون: استراکچرال Dow</span>
                  </div>
                </div>
              </div>

              {/* Product 5 */}
              <div className="aluminum-card sharp frame-shadow p-3 border border-[#b0b3b0] flex flex-col justify-between text-right group">
                <div className="relative h-56 bg-black sharp overflow-hidden border border-black/20 frame-shadow">
                  <img
                    src="https://arvinpanjereh.com/upload/service/2514139a-0bc1-43d5-a2c2-0e131deadcd7.webp"
                    alt="نمای کامپوزیت آلومینیوم"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <span className="absolute top-2 right-2 sharp px-2.5 py-1 bg-[#cbcccb] text-[#18191a] text-[10px] font-black border border-black">
                    پوشش نما
                  </span>
                  <div className="absolute bottom-2 right-2 left-2 text-white">
                    <h3 className="text-sm font-black">نمای کامپوزیت آلومینیوم (ACP Fireproof)</h3>
                  </div>
                </div>
                <div className="pt-3 space-y-2">
                  <p className="text-[11.5px] text-[#333] leading-relaxed">
                    ورق‌های ۴ میلی‌متر با پوشش رنگ PVDF مقاوم در برابر اشعه فرابنفش، خودتمیزشونده و ضدحریق استاندارد FR.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono font-bold bg-[#b8bab8] p-2 sharp border border-[#9ea19e]">
                    <span>ضخامت ورق: ۴ میلی‌متر</span>
                    <span>گرید نسوز: B1 / A2 Fireproof</span>
                  </div>
                </div>
              </div>

              {/* Product 6 */}
              <div className="aluminum-card sharp frame-shadow p-3 border border-[#b0b3b0] flex flex-col justify-between text-right group">
                <div className="relative h-56 bg-black sharp overflow-hidden border border-black/20 frame-shadow">
                  <img
                    src="https://arvinpanjereh.com/upload/service/46deae7f-1443-48eb-9751-590cbe9cb3b0.webp"
                    alt="نرده و هندریل شیشه‌ای"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <span className="absolute top-2 right-2 sharp px-2.5 py-1 bg-[#cbcccb] text-[#18191a] text-[10px] font-black border border-black">
                    ایمنی و لوکس
                  </span>
                  <div className="absolute bottom-2 right-2 left-2 text-white">
                    <h3 className="text-sm font-black">هندریل شیشه‌ای و حفاظ استیل ۳۰۴</h3>
                  </div>
                </div>
                <div className="pt-3 space-y-2">
                  <p className="text-[11.5px] text-[#333] leading-relaxed">
                    نرده‌های شیشه‌ای دفنی، فیکس‌پوینت و اسپیگوت با شیشه‌های دوجداره لمینت سکوریت و یراق‌آلات استیل ضدزنگ.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono font-bold bg-[#b8bab8] p-2 sharp border border-[#9ea19e]">
                    <span>شیشه: ۸+۸ لمینت PVB</span>
                    <span>آلیاژ: AISI 304 نگیر</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB 3: محصولات جدید و پرفروش (NEW & BEST SELLERS)
          ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'bestsellers' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          
          <div className="aluminum-card sharp frame-shadow p-4 sm:p-5 border border-[#b0b3b0]">
            
            {/* Header & Filter Toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#a8aba8] pb-3 mb-5 gap-3 text-right">
              <div>
                <span className="text-[10px] font-mono font-extrabold text-[#444] uppercase block">
                  HOT PICKS &amp; INNOVATIONS · TAB 3
                </span>
                <h2 className="text-base sm:text-lg font-black text-black">
                  محصولات جدید و پرفروش‌ترین سیستم‌های نوآوران پنجره سپاهان
                </h2>
              </div>

              {/* Sub Filter */}
              <div className="flex items-center gap-1.5 self-stretch sm:self-auto">
                <button
                  onClick={() => setBestsellerFilter('all')}
                  className={`sharp px-3 py-1.5 text-xs font-black border transition-all ${
                    bestsellerFilter === 'all'
                      ? 'bg-[#18191a] text-white border-black'
                      : 'bg-[#cbcccb] text-black border-[#888] hover:bg-[#b8bab8]'
                  }`}
                >
                  همه موارد
                </button>
                <button
                  onClick={() => setBestsellerFilter('bestseller')}
                  className={`sharp px-3 py-1.5 text-xs font-black border transition-all ${
                    bestsellerFilter === 'bestseller'
                      ? 'bg-[#18191a] text-white border-black'
                      : 'bg-[#cbcccb] text-black border-[#888] hover:bg-[#b8bab8]'
                  }`}
                >
                  🔥 پرفروش‌ترین‌ها
                </button>
                <button
                  onClick={() => setBestsellerFilter('new')}
                  className={`sharp px-3 py-1.5 text-xs font-black border transition-all ${
                    bestsellerFilter === 'new'
                      ? 'bg-[#18191a] text-white border-black'
                      : 'bg-[#cbcccb] text-black border-[#888] hover:bg-[#b8bab8]'
                  }`}
                >
                  ⚡ محصولات جدید
                </button>
              </div>
            </div>

            {/* Bestsellers & New Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Item 1: Best Seller */}
              {(bestsellerFilter === 'all' || bestsellerFilter === 'bestseller') && (
                <div className="aluminum-card sharp frame-shadow p-4 border border-[#b0b3b0] flex flex-col justify-between text-right">
                  <div className="flex items-center justify-between pb-2 border-b border-[#a8aba8]">
                    <span className="sharp px-2.5 py-0.5 bg-[#18191a] text-white text-[10px] font-black border border-black flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-400" />
                      پرفروش‌ترین سیستم مسکونی لوکس
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#444]">کد: AK-70TB</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3">
                    <div className="sm:col-span-5 relative h-40 bg-black sharp overflow-hidden border border-black/20 frame-shadow">
                      <img
                        src="https://arvinpanjereh.com/upload/service/0faef799-a472-46be-83bf-7cf42bbfaaa3.webp"
                        alt="پنجره ترمال بریک سری ۷۰"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="sm:col-span-7 space-y-2">
                      <h3 className="text-sm font-black text-black">پنجره دوجداره ترمال‌بریک سری ۷۰ آکپای</h3>
                      <p className="text-[11px] text-[#333] leading-relaxed">
                        پراستفاده‌ترین سیستم در بیش از ۱۲۰ برج مسکونی در اصفهان. دارای ۳ ردیف لاستیک EPDM و یراق آلمانی Gu.
                      </p>
                      <div className="space-y-1 text-[10px] text-[#222] font-bold">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-black" />
                          <span>تحویل فوری از انبار مقاطع آماده</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-black" />
                          <span>گارانتی کتبی ۱۰ ساله آب‌بندی و هوابندی</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Item 2: Best Seller */}
              {(bestsellerFilter === 'all' || bestsellerFilter === 'bestseller') && (
                <div className="aluminum-card sharp frame-shadow p-4 border border-[#b0b3b0] flex flex-col justify-between text-right">
                  <div className="flex items-center justify-between pb-2 border-b border-[#a8aba8]">
                    <span className="sharp px-2.5 py-0.5 bg-[#18191a] text-white text-[10px] font-black border border-black flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-400" />
                      انتخاب اول پروژه‌های تجاری و بانکی
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#444]">کد: CW-50150</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3">
                    <div className="sm:col-span-5 relative h-40 bg-black sharp overflow-hidden border border-black/20 frame-shadow">
                      <img
                        src="https://arvinpanjereh.com/upload/service/742b5647-017c-4a6e-b416-a184adf97dcc.webp"
                        alt="کرتین وال لامل ۵۰ در ۱۵۰"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="sm:col-span-7 space-y-2">
                      <h3 className="text-sm font-black text-black">سیستم لامل کرتین‌وال مقطع ۵۰×۱۵۰ استاتیکی</h3>
                      <p className="text-[11px] text-[#333] leading-relaxed">
                        اجرا شده در شعب بانک ملت، تجارت و مجتمع‌های اداری. بالاترین ممان اینرسی برای دهانه‌های مرتفع تا ۴.۵ متر بین سقف‌ها.
                      </p>
                      <div className="space-y-1 text-[10px] text-[#222] font-bold">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-black" />
                          <span>محاسبات تاییدیه نظام مهندسی با Sap2000</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-black" />
                          <span>اجرای شیشه‌های جامبو سایز ۳×۴ متر</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Item 3: New Product */}
              {(bestsellerFilter === 'all' || bestsellerFilter === 'new') && (
                <div className="aluminum-card sharp frame-shadow p-4 border border-[#b0b3b0] flex flex-col justify-between text-right">
                  <div className="flex items-center justify-between pb-2 border-b border-[#a8aba8]">
                    <span className="sharp px-2.5 py-0.5 bg-black text-white text-[10px] font-black border border-black flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-300" />
                      محصول جدید ۱۴۰۳ · تکنولوژی اسلیم
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#444]">NEW: SLIM-MINIMAL</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3">
                    <div className="sm:col-span-5 relative h-40 bg-black sharp overflow-hidden border border-black/20 frame-shadow">
                      <img
                        src="https://arvinpanjereh.com/upload/service/2f5bb5ed-60bb-49e5-9003-8be94921ad5e.webp"
                        alt="پنجره مینیمال اسلیم"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="sm:col-span-7 space-y-2">
                      <h3 className="text-sm font-black text-black">پنجره کشویی اسلیم با فریم پنهان در کف (Zero Threshold)</h3>
                      <p className="text-[11px] text-[#333] leading-relaxed">
                        نمای تمام‌شیشه بدون پاخور و آستانه؛ فریم افقی و عمودی درون کفسازی و دیوارها مدفون شده و تنها ۲ سانتیمتر ژوئن دیده می‌شود.
                      </p>
                      <div className="space-y-1 text-[10px] text-[#222] font-bold">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-black" />
                          <span>دید پانورامای ۹۸٪ شیشه خالص</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-black" />
                          <span>قابلیت موتورایز و اتصال به خانه هوشمند BMS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Item 4: New Product */}
              {(bestsellerFilter === 'all' || bestsellerFilter === 'new') && (
                <div className="aluminum-card sharp frame-shadow p-4 border border-[#b0b3b0] flex flex-col justify-between text-right">
                  <div className="flex items-center justify-between pb-2 border-b border-[#a8aba8]">
                    <span className="sharp px-2.5 py-0.5 bg-black text-white text-[10px] font-black border border-black flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-300" />
                      محصول جدید · کنترل هوشمند اقلیم
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#444]">NEW: SMART-DSF</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3">
                    <div className="sm:col-span-5 relative h-40 bg-black sharp overflow-hidden border border-black/20 frame-shadow">
                      <img
                        src="https://arvinpanjereh.com/upload/service/4eb9bebe-fbcf-49b0-bc35-12e0b62e49c7.webp"
                        alt="نمای دوپوسته هوشمند"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="sm:col-span-7 space-y-2">
                      <h3 className="text-sm font-black text-black">نمای دوپوسته شیشه‌ای با کانال تهویه طبیعی (Double Skin)</h3>
                      <p className="text-[11px] text-[#333] leading-relaxed">
                        مهندسی تلفیقی دو جداره شیشه با فاصله ۴۰ سانتی‌متر همراه با لوورهای متحرک خورشیدی؛ کاهش تا ۶۰٪ مصرف برق سرمایش برج‌ها.
                      </p>
                      <div className="space-y-1 text-[10px] text-[#222] font-bold">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-black" />
                          <span>کاهش چشمگیر بار حرارتی خورشید</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-black" />
                          <span>امکان تعبیه لوورهای خورشیدی اتوماتیک</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB 4: رزومه و نمونه کارها (PORTFOLIO & RESUME)
          ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'resume' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          
          <div className="aluminum-card sharp frame-shadow p-4 sm:p-5 border border-[#b0b3b0]">
            <div className="border-b border-[#a8aba8] pb-3 mb-5 text-right">
              <span className="text-[10px] font-mono font-extrabold text-[#444] uppercase block">
                ICONIC ACHIEVEMENTS · TAB 4
              </span>
              <h2 className="text-base sm:text-lg font-black text-black">
                رزومه اجرایی و پروژه‌های شاخص نوآوران پنجره سپاهان
              </h2>
              <p className="text-xs text-[#444] font-medium mt-1">
                بیش از ۵۰ پروژه برجسته دولتی، بانکی، تجاری و ویلایی در اصفهان و سایر استان‌های کشور
              </p>
            </div>

            {/* Resume Highlights Counter Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <div className="aluminum-card sharp frame-shadow p-3 border border-[#b0b3b0] text-center">
                <div className="text-2xl font-black font-mono text-black">۱۵+</div>
                <div className="text-[11px] font-bold text-[#333] mt-0.5">سال سابقه صنعتی</div>
              </div>
              <div className="aluminum-card sharp frame-shadow p-3 border border-[#b0b3b0] text-center">
                <div className="text-2xl font-black font-mono text-black">۵۰+</div>
                <div className="text-[11px] font-bold text-[#333] mt-0.5">پروژه تحویل‌شده</div>
              </div>
              <div className="aluminum-card sharp frame-shadow p-3 border border-[#b0b3b0] text-center">
                <div className="text-2xl font-black font-mono text-black">۱۵۰۰ m²</div>
                <div className="text-[11px] font-bold text-[#333] mt-0.5">وسعت کارخانه تولیدی</div>
              </div>
              <div className="aluminum-card sharp frame-shadow p-3 border border-[#b0b3b0] text-center">
                <div className="text-2xl font-black font-mono text-black">۱۰ سال</div>
                <div className="text-[11px] font-bold text-[#333] mt-0.5">گارانتی تضمین کیفیت</div>
              </div>
            </div>

            {/* Project Portfolio Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Project 1 */}
              <div className="aluminum-card sharp frame-shadow p-3 border border-[#b0b3b0] flex flex-col justify-between text-right group">
                <div className="relative h-56 bg-black sharp overflow-hidden border border-black/20 frame-shadow">
                  <img
                    src="https://arvinpanjereh.com/upload/service/742b5647-017c-4a6e-b416-a184adf97dcc.webp"
                    alt="مجتمع تجاری اداری سپهر"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <span className="absolute top-2 right-2 sharp px-2.5 py-1 bg-[#18191a] text-white text-[10px] font-bold border border-black">
                    تجاری - اداری
                  </span>
                  <div className="absolute bottom-2 right-2 left-2 text-white">
                    <h3 className="text-sm font-black">مجتمع اداری تجاری سپهر اصفهان</h3>
                    <p className="text-[10px] text-gray-300 font-mono">متراژ: ۲۸۰۰ مترمربع نمای کرتین‌وال</p>
                  </div>
                </div>
                <div className="pt-2.5 text-[11px] text-[#333] space-y-1">
                  <div><strong>سیستم:</strong> لامل آلومینیومی ۵۰×۱۵۰ + شیشه دوجداره سکوریت لمینت</div>
                  <div><strong>کارفرما:</strong> بخش خصوصی · سال اجرا: ۱۴۰۱</div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="aluminum-card sharp frame-shadow p-3 border border-[#b0b3b0] flex flex-col justify-between text-right group">
                <div className="relative h-56 bg-black sharp overflow-hidden border border-black/20 frame-shadow">
                  <img
                    src="https://arvinpanjereh.com/upload/service/2f5bb5ed-60bb-49e5-9003-8be94921ad5e.webp"
                    alt="شعب بانک‌های استان اصفهان"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <span className="absolute top-2 right-2 sharp px-2.5 py-1 bg-[#18191a] text-white text-[10px] font-bold border border-black">
                    بانکی و سازمانی
                  </span>
                  <div className="absolute bottom-2 right-2 left-2 text-white">
                    <h3 className="text-sm font-black">شعب مرکزی بانک ملت و تجارت</h3>
                    <p className="text-[10px] text-gray-300 font-mono">متراژ: بیش از ۱۲۰۰ مترمربع</p>
                  </div>
                </div>
                <div className="pt-2.5 text-[11px] text-[#333] space-y-1">
                  <div><strong>سیستم:</strong> نمای شیشه‌ای ضدسرقت + کامپوزیت آلومینیوم نسوز</div>
                  <div><strong>کارفرما:</strong> مدیریت شعب بانک‌ها · سال اجرا: ۱۳۹۹ - ۱۴۰۲</div>
                </div>
              </div>

              {/* Project 3 */}
              <div className="aluminum-card sharp frame-shadow p-3 border border-[#b0b3b0] flex flex-col justify-between text-right group">
                <div className="relative h-56 bg-black sharp overflow-hidden border border-black/20 frame-shadow">
                  <img
                    src="https://arvinpanjereh.com/upload/service/0faef799-a472-46be-83bf-7cf42bbfaaa3.webp"
                    alt="برج مسکونی مهرگان"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <span className="absolute top-2 right-2 sharp px-2.5 py-1 bg-[#18191a] text-white text-[10px] font-bold border border-black">
                    مسکونی لوکس
                  </span>
                  <div className="absolute bottom-2 right-2 left-2 text-white">
                    <h3 className="text-sm font-black">برج باغ مسکونی مهرگان (خیابان مشتاق)</h3>
                    <p className="text-[10px] text-gray-300 font-mono">متراژ: ۱۸۵۰ مترمربع پنجره‌های ترمال‌بریک</p>
                  </div>
                </div>
                <div className="pt-2.5 text-[11px] text-[#333] space-y-1">
                  <div><strong>سیستم:</strong> پنجره‌های لیفت‌اند‌اسلاید دهانه عریض با آنادایز شامپاینی</div>
                  <div><strong>کارفرما:</strong> شرکت تعاونی مسکن مهرگان · سال اجرا: ۱۴۰۲</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB 5: تماس با ما و راه ارتباطی (CONTACT & COMMUNICATION)
          ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'contact' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          
          <div className="aluminum-card sharp frame-shadow p-4 sm:p-6 border border-[#b0b3b0]">
            <div className="border-b border-[#a8aba8] pb-3 mb-6 text-right">
              <span className="text-[10px] font-mono font-extrabold text-[#444] uppercase block">
                COMMUNICATION DESK · TAB 5
              </span>
              <h2 className="text-base sm:text-lg font-black text-black">
                راه‌های ارتباط با دفتر مرکزی و کارخانه نوآوران پنجره سپاهان
              </h2>
              <p className="text-xs text-[#444] font-medium mt-1">
                مشاوره فنی با مهندسین محاسب، استعلام سریع قیمت پیش‌فاکتور و ارسال نقشه‌های ساختمانی
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              
              {/* Right Side: Fast Contact Channels (Col 1 to 5) */}
              <div className="lg:col-span-5 space-y-3 text-right">
                
                {/* 4-Digit Hotline Card */}
                <div className="aluminum-card sharp frame-shadow p-4 border border-[#b0b3b0] space-y-2">
                  <span className="text-[10px] font-bold text-[#444] uppercase block">خط مستقیم ۴ رقمی</span>
                  <div className="flex items-center justify-between">
                    <a href="tel:0314144" className="text-2xl font-black font-mono text-black hover:underline">
                      ۰۳۱-۴۱۴۴
                    </a>
                    <div className="w-10 h-10 bg-[#18191a] text-white flex items-center justify-center sharp">
                      <Phone className="w-5 h-5 text-[#cbcccb]" />
                    </div>
                  </div>
                  <p className="text-[11px] text-[#444]">
                    پاسخگویی سریع کارشناسان فنی از ۸ صبح تا ۵ بعدازظهر
                  </p>
                </div>

                {/* Direct Mobile & WhatsApp */}
                <div className="aluminum-card sharp frame-shadow p-4 border border-[#b0b3b0] space-y-2">
                  <span className="text-[10px] font-bold text-[#444] uppercase block">واحد فروش و ارسال نقشه واتساپ</span>
                  <div className="flex items-center justify-between">
                    <a href="tel:09139090673" className="text-lg font-black font-mono text-black hover:underline">
                      ۰۹۱۳-۹۰۹۰۶۷۳
                    </a>
                    <a
                      href="https://wa.me/989139090673"
                      target="_blank"
                      rel="noreferrer"
                      className="sharp px-3 py-1.5 bg-emerald-700 text-white text-[11px] font-bold hover:bg-emerald-600 transition-colors"
                    >
                      ارسال در واتساپ
                    </a>
                  </div>
                  <p className="text-[11px] text-[#444]">
                    شماره همراه مستقیم مهندس محاسب جهت بررسی ابعاد و نقشه‌های اتوکد (DWG/PDF)
                  </p>
                </div>

                {/* Factory & Office Address */}
                <div className="aluminum-card sharp frame-shadow p-4 border border-[#b0b3b0] space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Building2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs font-black text-black block">کارخانه صنعتی و خط مونتاژ:</strong>
                      <span className="text-[11.5px] text-[#333] leading-relaxed block mt-0.5">
                        اصفهان، شهرک صنعتی جی، خیابان ۲۸، فرعی ۴، پلاک ۶۲
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 border-t border-[#a8aba8] pt-2.5">
                    <Clock className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs font-black text-black block">ساعات کاری و بازدید:</strong>
                      <span className="text-[11.5px] text-[#333] block mt-0.5">
                        شنبه تا چهارشنبه: ۸:۰۰ الی ۱۷:۰۰ | پنج‌شنبه: ۸:۰۰ الی ۱۳:۳۰
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Left Side: Online Consultation & RFQ Form (Col 6 to 12) */}
              <div className="lg:col-span-7">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('درخواست شما با موفقیت ثبت شد. کارشناسان ما تا حداکثر ۲ ساعت کاری با شما تماس خواهند گرفت.');
                  }}
                  className="aluminum-card sharp frame-shadow p-5 sm:p-6 border border-[#b0b3b0] space-y-4 text-right"
                >
                  <div className="border-b border-[#a8aba8] pb-2">
                    <h3 className="text-sm font-black text-black">فرم سریع استعلام قیمت و مشاوره پروژه</h3>
                    <p className="text-[11px] text-[#444]">مشخصات پروژه خود را وارد کنید تا کارشناسان جهت متره با شما تماس بگیرند.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-black block">نام و نام خانوادگی:</label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: مهندس حسینی"
                        className="w-full sharp px-3 py-2 bg-white text-xs border border-[#888] focus:border-black outline-none frame-shadow text-right"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-black block">شماره تماس مستقیم (موبایل):</label>
                      <input
                        type="tel"
                        required
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        className="w-full sharp px-3 py-2 bg-white text-xs border border-[#888] focus:border-black outline-none frame-shadow text-left font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-black block">نوع سیستم درخواستی:</label>
                      <select className="w-full sharp px-3 py-2 bg-white text-xs border border-[#888] focus:border-black outline-none frame-shadow text-right">
                        <option>نمای کرتین وال لامل</option>
                        <option>پنجره آلومینیوم ترمال‌بریک</option>
                        <option>سیستم فوق‌لوکس لیفت اند اسلاید</option>
                        <option>نمای شیشه‌ای فریم‌لس</option>
                        <option>نمای کامپوزیت آلومینیوم</option>
                        <option>نرده شیشه‌ای و حفاظ استیل</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-black block">متراژ تقریبی نما یا پنجره (مترمربع):</label>
                      <input
                        type="number"
                        placeholder="مثال: ۲۵۰"
                        className="w-full sharp px-3 py-2 bg-white text-xs border border-[#888] focus:border-black outline-none frame-shadow text-right font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-black block">توضیحات تکمیلی یا موقعیت پروژه:</label>
                    <textarea
                      rows={3}
                      placeholder="آدرس پروژه، نیاز به محاسبات ایستایی، رنگ پروفیل درخواستی یا نوع شیشه..."
                      className="w-full sharp px-3 py-2 bg-white text-xs border border-[#888] focus:border-black outline-none frame-shadow text-right"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sharp py-3 bg-[#18191a] hover:bg-[#333] text-white text-xs font-black border border-black shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>ارسال مشخصات جهت دریافت پیش‌فاکتور رسمی</span>
                  </button>
                </form>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
