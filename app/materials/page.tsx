'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Layers, 
  Maximize, 
  Play, 
  ExternalLink, 
  QrCode, 
  X, 
  Download, 
  CheckCircle2, 
  Search, 
  Sliders, 
  Sparkles,
  Phone,
  ArrowUpLeft,
  FileText,
  Clock,
  ArrowLeft,
  Building2,
  Info
} from 'lucide-react';
import materialsData from '@/data/materials.json';
import { MaterialItem } from '@/lib/db';

export default function MaterialsCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideoMaterial, setActiveVideoMaterial] = useState<MaterialItem | null>(null);
  const [activeSpecsMaterial, setActiveSpecsMaterial] = useState<MaterialItem | null>(null);

  const categories = [
    { key: 'all', label: 'همه ۱۲ سیستم' },
    { key: 'thermal_hinged', label: 'لولایی ترمال‌بریک (TH)' },
    { key: 'thermal_sliding', label: 'کشویی و لیفت ترمال‌بریک (TS)' },
    { key: 'normal_systems', label: 'سیستم‌های نرمال (AH / AS / MAS)' },
    { key: 'additional_systems', label: 'سیستم‌های الحاقی و نرده (Plisse / Fence)' },
  ];

  const materials = materialsData as unknown as MaterialItem[];

  const filtered = materials.filter((m) => {
    const matchesCategory = selectedCategory === 'all' || m.categoryKey === selectedCategory;
    const matchesSearch =
      m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 py-4 space-y-5">
      {/* 1. HERO SECTION (Brushed Aluminum Sharp Frame) */}
      <section className="aluminum-card sharp frame-shadow p-6 sm:p-10 border border-[#b0b3b0] text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18191a] text-white text-[11px] font-bold sharp border border-black shadow-sm">
          <ShieldCheck className="w-4 h-4 text-[#cbcccb]" />
          <span>کاتالوگ مهندسی مقاطع و سیستم‌های مصرفی نوآوران پنجره سپاهان</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight leading-tight">
          سیستم‌های تخصصی درب، پنجره ترمال‌بریک و حفاظ شیشه‌ای
        </h1>

        <p className="text-xs sm:text-sm text-[#333] max-w-3xl mx-auto leading-relaxed font-medium">
          بررسی مشخصات فنی، ممان اینرسی، مقاطع سه‌بعدی CAD، گسکت‌های هوابندی و انیمیشن‌های آموزشی مونتاژ سیستم‌های استاندارد مورد استفاده در خط تولید کارخانه نوآوران پنجره سپاهان.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] text-black pt-2 font-mono">
          <span className="flex items-center gap-1.5 bg-[#b8bab8] px-3 py-1.5 sharp border border-[#9ea19e] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-black" /> بیلت آلیاژی استاندارد 6063 T6
          </span>
          <span className="flex items-center gap-1.5 bg-[#b8bab8] px-3 py-1.5 sharp border border-[#9ea19e] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-black" /> محاسبات استاتیکی Orgadata آلمان
          </span>
          <span className="flex items-center gap-1.5 bg-[#b8bab8] px-3 py-1.5 sharp border border-[#9ea19e] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-black" /> لاستیک‌های عایق و ضد UV از نوع EPDM
          </span>
        </div>
      </section>

      {/* 2. FILTER & SEARCH BAR */}
      <section className="aluminum-card sharp frame-shadow p-3 sm:p-4 border border-[#b0b3b0] space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#555] absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="جستجوی کد سیستم (مثلاً TH68, TS143)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-9 py-2 sharp bg-white text-xs border border-[#888] focus:border-black outline-none frame-shadow text-right font-medium"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`sharp px-3 py-1.5 text-xs font-black border transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-[#18191a] text-white border-black shadow-sm'
                    : 'bg-[#cbcccb] text-black border-[#888] hover:bg-[#b8bab8]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-[11px] text-[#444] font-mono font-bold flex justify-between items-center border-t border-[#a8aba8] pt-2">
          <span>نمایش {filtered.length} سیستم مهندسی اختصاصی</span>
          <Link href="/" className="text-black hover:underline flex items-center gap-1">
            <span>بازگشت به صفحه اصلی</span>
            <ArrowLeft className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* 3. MATERIAL CARDS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="aluminum-card sharp frame-shadow p-4 border border-[#b0b3b0] flex flex-col justify-between text-right"
          >
            {/* Top Badges */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#a8aba8]">
                <span className="font-mono font-black text-xs px-2.5 py-0.5 bg-[#18191a] text-white sharp border border-black">
                  {item.code}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 sharp border ${
                  item.isThermalBreak 
                    ? 'bg-emerald-700 text-white border-emerald-800' 
                    : 'bg-[#9ea19e] text-black border-black'
                }`}>
                  {item.isThermalBreak ? 'عایق ترمال‌بریک' : 'سیستم نرمال'}
                </span>
              </div>

              {/* 3D Profile CAD Render Container */}
              <div className="relative h-56 w-full sharp bg-white border border-[#9ea19e] overflow-hidden flex items-center justify-center p-2 frame-shadow">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain block mx-auto hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                {/* QR Code Floating Icon */}
                {item.qrImage && (
                  <a
                    href={item.qrUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="مشاهده صفحه کاتالوگ با اسکن QR"
                    className="absolute bottom-2 left-2 bg-white p-1 sharp shadow-md border border-black hover:scale-110 transition-transform"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img src={item.qrImage} alt="QR Code" className="w-9 h-9 object-contain" />
                  </a>
                )}

                {/* Quick Video Trigger */}
                {item.videoUrl && (
                  <button
                    onClick={() => setActiveVideoMaterial(item)}
                    className="absolute top-2 left-2 px-2.5 py-1 sharp bg-[#18191a] text-white border border-black hover:bg-[#333] transition-all flex items-center gap-1.5 text-[11px] font-bold shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-[#cbcccb]" />
                    <span>انیمیشن</span>
                  </button>
                )}
              </div>

              {/* Title & Summary */}
              <div>
                <span className="text-[10px] font-mono font-bold text-[#444] uppercase block">
                  {item.category}
                </span>
                <h3 className="text-xs sm:text-sm font-black text-black leading-snug mt-0.5">
                  {item.title}
                </h3>
                <p className="text-[11.5px] text-[#333] line-clamp-2 leading-relaxed mt-1 font-medium text-justify">
                  {item.summary}
                </p>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 gap-1.5 bg-[#b8bab8] p-2.5 sharp border border-[#9ea19e] text-[10px] font-mono font-bold text-black">
                <div>
                  <span className="text-[#444] block font-sans text-[9px]">عرض فریم:</span>
                  <span>{item.specs.frameWidth}</span>
                </div>
                <div>
                  <span className="text-[#444] block font-sans text-[9px]">شیشه‌خور:</span>
                  <span>{item.specs.glassThickness}</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-[#9ea19e] flex items-center justify-between">
                  <span className="text-[#444] font-sans text-[9px]">عایق‌بندی:</span>
                  <span>{item.specs.thermalUf}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[#a8aba8] mt-3 flex items-center gap-2">
              <button
                onClick={() => setActiveSpecsMaterial(item)}
                className="flex-1 py-2 px-2.5 sharp bg-white hover:bg-gray-100 text-black text-xs font-bold border border-black flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>مشخصات فنی</span>
              </button>

              {item.videoUrl && (
                <button
                  onClick={() => setActiveVideoMaterial(item)}
                  className="py-2 px-3 sharp bg-[#18191a] hover:bg-[#333] text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors border border-black shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-[#cbcccb]" />
                  <span>پخش ویدیو</span>
                </button>
              )}

              {item.qrUrl && (
                <a
                  href={item.qrUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="مشاهده در وب‌سایت کاتالوگ سازنده"
                  className="p-2 sharp bg-[#cbcccb] hover:bg-[#b8bab8] text-black border border-black transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* 4. COMPARISON MATRIX TABLE */}
      <section className="aluminum-card sharp frame-shadow p-4 sm:p-6 border border-[#b0b3b0] space-y-4">
        <div className="border-b border-[#a8aba8] pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-right">
          <div>
            <h2 className="text-base font-black text-black">جدول مقایسه مهندسی سیستم‌های پنجره و درب</h2>
            <p className="text-xs text-[#444] mt-0.5">مقایسه ابعاد، ممان اینرسی، شیشه‌خور و ضرایب حرارتی جهت انتخاب دقیق توسط مهندسین مشاور</p>
          </div>
          <span className="text-[10px] font-mono font-bold text-white bg-black px-2.5 py-1 sharp">
            استاندارد کارخانه نوآوران پنجره سپاهان
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs border-collapse">
            <thead>
              <tr className="border-b border-black text-black font-black bg-[#b8bab8]">
                <th className="p-2.5">کد سیستم</th>
                <th className="p-2.5">نوع سیستم</th>
                <th className="p-2.5">عرض فریم</th>
                <th className="p-2.5">عرض لنگه</th>
                <th className="p-2.5">شیشه‌خور</th>
                <th className="p-2.5">ضریب حرارتی Uf</th>
                <th className="p-2.5">انواع بازشو</th>
                <th className="p-2.5 text-center">ویدیو / کاتالوگ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#a8aba8]">
              {materials.map((m) => (
                <tr key={m.id} className="hover:bg-white/40 transition-colors">
                  <td className="p-2.5 font-mono font-black text-black">{m.code}</td>
                  <td className="p-2.5 text-black font-bold">{m.category}</td>
                  <td className="p-2.5 font-mono text-[#222]">{m.specs.frameWidth}</td>
                  <td className="p-2.5 font-mono text-[#222]">{m.specs.sashWidth}</td>
                  <td className="p-2.5 font-mono text-[#222]">{m.specs.glassThickness}</td>
                  <td className="p-2.5 font-mono font-bold text-black">{m.specs.thermalUf}</td>
                  <td className="p-2.5 text-[#333] max-w-xs">{m.specs.openings}</td>
                  <td className="p-2.5 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {m.videoUrl && (
                        <button
                          onClick={() => setActiveVideoMaterial(m)}
                          className="p-1 sharp bg-[#18191a] text-white hover:bg-[#333] transition-colors border border-black"
                          title="پخش انیمیشن"
                        >
                          <Play className="w-3 h-3 fill-current text-[#cbcccb]" />
                        </button>
                      )}
                      {m.qrUrl && (
                        <a
                          href={m.qrUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 sharp bg-white text-black hover:bg-gray-100 transition-colors border border-black"
                          title="صفحه کاتالوگ"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. CONSULTATION & INQUIRY CTA */}
      <section className="aluminum-card sharp frame-shadow p-6 sm:p-8 border border-[#b0b3b0] flex flex-col md:flex-row items-center justify-between gap-6 text-right">
        <div className="space-y-1.5">
          <h2 className="text-base sm:text-lg font-black text-black">
            نیاز به مشاوره فنی یا استعلام قیمت این سیستم‌ها دارید؟
          </h2>
          <p className="text-xs text-[#333] leading-relaxed max-w-2xl font-medium">
            تیم مهندسی محاسبات نوآوران پنجره سپاهان آماده پاسخگویی، تهیه نقشه‌های Shop Drawing و محاسبه ممان اینرسی دهانه‌های ساختمانی شماست.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href="https://wa.me/989301545858?text=سلام،%20درخواست%20مشاوره%20فنی%20در%20مورد%20سیستم‌های%20کاتالوگ%20را%20داشتم."
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 sharp bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 border border-emerald-800 shadow-sm transition-all"
          >
            <span>استعلام در واتساپ مهندسی</span>
            <ArrowUpLeft className="w-4 h-4" />
          </a>

          <a
            href="tel:03133687755"
            className="px-5 py-2.5 sharp bg-[#18191a] hover:bg-[#333] text-white font-bold text-xs flex items-center gap-2 border border-black shadow-sm transition-all"
          >
            <Phone className="w-4 h-4 text-[#cbcccb]" />
            <span className="font-mono">۰۳۱-۳۳۶۸۷۷۵۵</span>
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MODAL 1: VIDEO ANIMATION PLAYER (.m4v Direct)
          ═══════════════════════════════════════════════════════════ */}
      {activeVideoMaterial && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveVideoMaterial(null)}
        >
          <div
            className="aluminum-card sharp frame-shadow max-w-3xl w-full border border-black overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-3 sm:p-4 border-b border-[#a8aba8] bg-[#cbcccb] flex items-center justify-between text-right">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 sharp bg-[#18191a] text-white text-xs font-mono font-bold border border-black">
                  {activeVideoMaterial.code}
                </span>
                <span className="text-xs sm:text-sm text-black font-black line-clamp-1">
                  {activeVideoMaterial.videoTitle || activeVideoMaterial.title}
                </span>
              </div>
              <button
                onClick={() => setActiveVideoMaterial(null)}
                className="p-1 text-black hover:bg-black/20 sharp transition-colors"
                aria-label="بستن"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              <video
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                src={activeVideoMaterial.videoUrl}
              >
                مرورگر شما از پخش مستقیم ویدیو پشتیبانی نمی‌کند.
              </video>
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#cbcccb] border-t border-[#a8aba8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-right">
              <div>
                <h3 className="text-xs font-black text-black">
                  {activeVideoMaterial.title}
                </h3>
                <p className="text-[11px] text-[#333] mt-0.5 line-clamp-1 font-medium">
                  {activeVideoMaterial.summary}
                </p>
              </div>

              <div className="flex items-center gap-2 self-stretch sm:self-auto">
                {activeVideoMaterial.videoUrl && (
                  <a
                    href={activeVideoMaterial.videoUrl}
                    download
                    className="sharp px-3 py-1.5 bg-[#18191a] hover:bg-[#333] text-white text-xs font-bold flex items-center gap-1.5 border border-black transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>دانلود فایل ویدیو</span>
                  </a>
                )}
                {activeVideoMaterial.qrUrl && (
                  <a
                    href={activeVideoMaterial.qrUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="sharp px-3 py-1.5 bg-white text-black hover:bg-gray-100 text-xs font-bold flex items-center gap-1.5 border border-black transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>لینک QR کاتالوگ</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          MODAL 2: TECHNICAL SPECIFICATIONS MODAL
          ═══════════════════════════════════════════════════════════ */}
      {activeSpecsMaterial && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveSpecsMaterial(null)}
        >
          <div
            className="aluminum-card sharp frame-shadow max-w-2xl w-full border border-black overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-3.5 border-b border-[#a8aba8] bg-[#cbcccb] flex items-center justify-between text-right">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 sharp bg-black text-white text-xs font-mono font-bold">
                  {activeSpecsMaterial.code}
                </span>
                <span className="text-xs sm:text-sm font-black text-black">
                  مشخصات فنی و استانداردهای مهندسی
                </span>
              </div>
              <button
                onClick={() => setActiveSpecsMaterial(null)}
                className="p-1 text-black hover:bg-black/20 sharp transition-colors"
                aria-label="بستن"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto text-right">
              {/* Profile Image & Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center bg-[#b8bab8] p-3 sharp border border-[#9ea19e]">
                <div className="sm:col-span-4 h-32 bg-white sharp border border-[#888] flex items-center justify-center p-2">
                  <img
                    src={activeSpecsMaterial.image}
                    alt={activeSpecsMaterial.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="sm:col-span-8 space-y-1.5">
                  <h3 className="text-xs font-black text-black">{activeSpecsMaterial.title}</h3>
                  <p className="text-[11px] text-[#333] leading-relaxed font-medium">{activeSpecsMaterial.summary}</p>
                </div>
              </div>

              {/* Full Specs Key-Value Table */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-black text-black">مشخصات مهندسی مقطع:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {Object.entries(activeSpecsMaterial.specs).map(([key, value]) => {
                    const labels: Record<string, string> = {
                      frameDepth: 'عمق فریم',
                      frameWidth: 'عرض فریم',
                      sashDepth: 'عمق لنگه',
                      sashWidth: 'عرض لنگه',
                      glassThickness: 'ضخامت شیشه',
                      maxGlassThickness: 'حداکثر شیشه‌خور',
                      glassThicknessRange: 'بازه شیشه‌خور',
                      polyamideWidth: 'عرض پلی‌آمید',
                      airPermeability: 'هوابندی',
                      waterTightness: 'آب‌بندی',
                      windResistance: 'مقاومت باد',
                      acousticInsulation: 'عایق صوتی',
                      thermalTransmittance: 'ضریب حرارتی',
                      thermalUf: 'ضریب Uf',
                      profileAlloy: 'آلیاژ شمش',
                      maxSashWeight: 'حداکثر وزن لنگه',
                      maxHeight: 'حداکثر ارتفاع',
                      maxWidth: 'حداکثر عرض',
                      gasketType: 'نوع لاستیک',
                      openings: 'انواع بازشو',
                      openingOptions: 'گزینه‌های بازشو',
                      applications: 'کاربردها',
                    };
                    const label = labels[key] || key;
                    return (
                      <div
                        key={key}
                        className="p-2 bg-[#b8bab8] sharp border border-[#9ea19e] flex justify-between items-center text-[11px]"
                      >
                        <span className="font-sans text-[#333] font-bold">{label}:</span>
                        <strong className="text-black">{value}</strong>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Applications */}
              {activeSpecsMaterial.applications && activeSpecsMaterial.applications.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black text-black">کاربردهای استاندارد:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeSpecsMaterial.applications.map((app, idx) => (
                      <span
                        key={idx}
                        className="sharp px-2.5 py-1 bg-white text-black text-[11px] font-bold border border-black"
                      >
                        ✓ {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-3 bg-[#cbcccb] border-t border-[#a8aba8] flex items-center justify-between">
              {activeSpecsMaterial.videoUrl && (
                <button
                  onClick={() => {
                    const item = activeSpecsMaterial;
                    setActiveSpecsMaterial(null);
                    setActiveVideoMaterial(item);
                  }}
                  className="sharp px-4 py-1.5 bg-[#18191a] hover:bg-[#333] text-white text-xs font-bold flex items-center gap-1.5 border border-black shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-[#cbcccb]" />
                  <span>پخش ویدیوی این سیستم</span>
                </button>
              )}

              <button
                onClick={() => setActiveSpecsMaterial(null)}
                className="sharp px-4 py-1.5 bg-white text-black hover:bg-gray-100 text-xs font-bold border border-black transition-colors"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
