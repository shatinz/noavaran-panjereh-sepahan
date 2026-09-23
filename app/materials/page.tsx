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
  Clock
} from 'lucide-react';
import materialsData from '@/data/materials.json';
import { MaterialItem } from '@/lib/db';

export default function MaterialsCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideoMaterial, setActiveVideoMaterial] = useState<MaterialItem | null>(null);
  const [activeSpecsMaterial, setActiveSpecsMaterial] = useState<MaterialItem | null>(null);

  const categories = [
    { key: 'all', label: 'همه سیستم‌ها' },
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
    <div className="space-y-16 pb-24 pt-8">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-charcoal-900 via-charcoal-900/90 to-charcoal-950 border border-charcoal-800 p-8 sm:p-14 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#222832_1px,transparent_1px),linear-gradient(to_bottom,#222832_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-25 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bronze-500/10 border border-bronze-500/30 text-bronze-400 text-xs font-medium">
            <ShieldCheck className="w-4 h-4 text-bronze-400" />
            <span>کاتالوگ مهندسی مقاطع و سیستم‌های مصرفی نوآوران پنجره سپاهان</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            سیستم‌های تخصصی{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bronze-400 via-bronze-300 to-amber-200">
              درب، پنجره ترمال‌بریک و حفاظ
            </span>
          </h1>

          <p className="text-sm sm:text-base text-titanium-300 max-w-2xl mx-auto leading-relaxed">
            بررسی مشخصات فنی، ممان اینرسی، مقاطع سه‌بعدی CAD، گسکت‌های هوابندی و انیمیشن‌های آموزشی مونتاژ سیستم‌های استاندارد مورد استفاده در خط تولید کارخانه.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-titanium-400 pt-2 font-mono">
            <span className="flex items-center gap-1.5 bg-charcoal-800/80 px-3 py-1.5 rounded-lg border border-charcoal-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-bronze-400" /> بیلت آلیاژی استاندارد 6063 T6
            </span>
            <span className="flex items-center gap-1.5 bg-charcoal-800/80 px-3 py-1.5 rounded-lg border border-charcoal-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-bronze-400" /> تاییدیه‌های فنی Orgadata آلمان
            </span>
            <span className="flex items-center gap-1.5 bg-charcoal-800/80 px-3 py-1.5 rounded-lg border border-charcoal-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-bronze-400" /> گسکت‌های ضد فرابنفش EPDM
            </span>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH BAR */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800 shadow-md">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-titanium-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="جستجوی کد سیستم (مثلاً TH68, TS143)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-charcoal-950 border border-charcoal-700 text-xs text-white placeholder-titanium-500 focus:outline-none focus:border-bronze-500 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-bronze-500 text-charcoal-950 shadow-md shadow-bronze-500/20'
                    : 'bg-charcoal-800 text-titanium-300 hover:text-white hover:bg-charcoal-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-titanium-400 px-2 font-mono">
          نمایش {filtered.length} سیستم مهندسی
        </div>
      </section>

      {/* 3. MATERIAL CARDS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group rounded-3xl bg-charcoal-900/70 border border-charcoal-800 hover:border-bronze-500/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-bronze-500/5"
          >
            {/* Top Badges */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg bg-charcoal-950 border border-charcoal-700 text-bronze-400 font-mono font-bold text-xs">
                  {item.code}
                </span>
                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                  item.isThermalBreak 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-charcoal-800 text-titanium-300 border border-charcoal-700'
                }`}>
                  {item.isThermalBreak ? 'عایق ترمال‌بریک' : 'سیستم نرمال'}
                </span>
              </div>

              {/* 3D Profile CAD Render Container */}
              <div className="relative h-60 w-full rounded-2xl bg-charcoal-950/80 border border-charcoal-800/80 overflow-hidden flex items-center justify-center p-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* QR Code Floating Icon */}
                {item.qrImage && (
                  <a
                    href={item.qrUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="مشاهده صفحه کاتالوگ با اسکن QR"
                    className="absolute bottom-3 left-3 bg-white p-1 rounded-lg shadow-md border border-charcoal-600 hover:scale-110 transition-transform"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img src={item.qrImage} alt="QR Code" className="w-8 h-8 object-contain" />
                  </a>
                )}

                {/* Quick Video Trigger */}
                {item.videoUrl && (
                  <button
                    onClick={() => setActiveVideoMaterial(item)}
                    className="absolute top-3 left-3 p-2 rounded-xl bg-charcoal-950/80 backdrop-blur text-bronze-400 border border-charcoal-700 hover:bg-bronze-500 hover:text-charcoal-950 transition-all flex items-center gap-1.5 text-[11px] font-bold"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>انیمیشن</span>
                  </button>
                )}
              </div>

              {/* Title & Summary */}
              <div>
                <span className="text-[11px] font-bold text-bronze-400 block mb-1">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-bronze-300 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-titanium-400 line-clamp-3 leading-relaxed mt-2 text-justify">
                  {item.summary}
                </p>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 gap-2 bg-charcoal-950/90 p-3 rounded-xl border border-charcoal-800 text-[11px]">
                <div>
                  <span className="text-titanium-500 block text-[10px]">عرض فریم:</span>
                  <span className="font-mono text-titanium-200 font-semibold">{item.specs.frameWidth}</span>
                </div>
                <div>
                  <span className="text-titanium-500 block text-[10px]">شیشه‌خور:</span>
                  <span className="font-mono text-titanium-200 font-semibold">{item.specs.glassThickness}</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-charcoal-800/60 flex items-center justify-between">
                  <span className="text-titanium-500 text-[10px]">عایق‌بندی:</span>
                  <span className="font-mono text-bronze-400 text-[10px] font-semibold">{item.specs.thermalUf}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-5 border-t border-charcoal-800 mt-4 flex items-center gap-2">
              <button
                onClick={() => setActiveSpecsMaterial(item)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-titanium-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-bronze-400" />
                <span>مشخصات فنی</span>
              </button>

              {item.videoUrl && (
                <button
                  onClick={() => setActiveVideoMaterial(item)}
                  className="py-2.5 px-3.5 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-md shadow-bronze-500/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>ویدیو</span>
                </button>
              )}

              {item.qrUrl && (
                <a
                  href={item.qrUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="مشاهده در وب‌سایت کاتالوگ سازنده"
                  className="p-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-titanium-400 hover:text-bronze-400 border border-charcoal-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* 4. COMPARISON MATRIX TABLE */}
      <section className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-6 sm:p-8 space-y-6">
        <div className="border-b border-charcoal-800 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white">جدول مقایسه مهندسی سیستم‌های پنجره و درب</h2>
            <p className="text-xs text-titanium-400 mt-1">مقایسه ابعاد، ممان اینرسی، شیشه‌خور و ضرایب حرارتی جهت انتخاب دقیق توسط مهندسین مشاور</p>
          </div>
          <span className="text-xs font-mono text-bronze-400 bg-bronze-500/10 px-3 py-1 rounded-lg border border-bronze-500/20">
            استاندارد کارخانه نوآوران پنجره سپاهان
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs border-collapse">
            <thead>
              <tr className="border-b border-charcoal-700 text-titanium-400 font-semibold bg-charcoal-950/60">
                <th className="p-3.5">کد سیستم</th>
                <th className="p-3.5">نوع سیستم</th>
                <th className="p-3.5">عرض فریم</th>
                <th className="p-3.5">عرض لنگه</th>
                <th className="p-3.5">شیشه‌خور</th>
                <th className="p-3.5">ضریب حرارتی Uf</th>
                <th className="p-3.5">انواع بازشو</th>
                <th className="p-3.5 text-center">ویدیو / QR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800/70">
              {materials.map((m) => (
                <tr key={m.id} className="hover:bg-charcoal-800/40 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-bronze-400">{m.code}</td>
                  <td className="p-3.5 text-white font-medium">{m.category}</td>
                  <td className="p-3.5 font-mono text-titanium-300">{m.specs.frameWidth}</td>
                  <td className="p-3.5 font-mono text-titanium-300">{m.specs.sashWidth}</td>
                  <td className="p-3.5 font-mono text-titanium-300">{m.specs.glassThickness}</td>
                  <td className="p-3.5 font-mono text-emerald-400">{m.specs.thermalUf}</td>
                  <td className="p-3.5 text-titanium-300 max-w-xs">{m.specs.openings}</td>
                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {m.videoUrl && (
                        <button
                          onClick={() => setActiveVideoMaterial(m)}
                          className="p-1.5 rounded-lg bg-bronze-500/20 text-bronze-400 hover:bg-bronze-500 hover:text-charcoal-950 transition-colors"
                          title="پخش انیمیشن"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                      )}
                      {m.qrUrl && (
                        <a
                          href={m.qrUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-charcoal-800 text-titanium-400 hover:text-white transition-colors"
                          title="صفحه کاتالوگ"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
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
      <section className="rounded-3xl bg-gradient-to-r from-bronze-600/20 via-bronze-500/10 to-transparent border border-bronze-500/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-right">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            نیاز به مشاوره فنی یا استعلام قیمت این سیستم‌ها دارید؟
          </h2>
          <p className="text-xs sm:text-sm text-titanium-300 leading-relaxed max-w-2xl">
            تیم مهندسی محاسبات نوآوران پنجره سپاهان آماده پاسخگویی، تهیه نقشه‌های Shop Drawing و محاسبه ممان اینرسی دهانه‌های ساختمانی شماست.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://wa.me/989301545858?text=سلام،%20درخواست%20مشاوره%20فنی%20در%20مورد%20سیستم‌های%20کاتالوگ%20را%20داشتم."
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-bronze-500/20 transition-all"
          >
            <span>استعلام سریع در واتساپ مهندسی</span>
            <ArrowUpLeft className="w-4 h-4" />
          </a>

          <a
            href="tel:03133687755"
            className="px-5 py-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white font-semibold text-xs flex items-center gap-2 border border-charcoal-700 transition-all"
          >
            <Phone className="w-4 h-4 text-bronze-400" />
            <span>۳۳۶۸۷۷۵۵-۰۳۱</span>
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MODAL 1: VIDEO ANIMATION PLAYER
          ═══════════════════════════════════════════════════════════ */}
      {activeVideoMaterial && (
        <div
          className="fixed inset-0 z-50 bg-charcoal-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveVideoMaterial(null)}
        >
          <div
            className="bg-charcoal-900 border border-charcoal-700 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-charcoal-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-bronze-500/20 text-bronze-400 text-xs font-medium font-mono">
                  {activeVideoMaterial.code}
                </span>
                <span className="text-xs text-white font-semibold line-clamp-1">
                  {activeVideoMaterial.videoTitle || activeVideoMaterial.title}
                </span>
              </div>
              <button
                onClick={() => setActiveVideoMaterial(null)}
                className="p-1.5 rounded-lg bg-charcoal-800 text-titanium-300 hover:text-white"
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
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {activeVideoMaterial.title}
                  </h3>
                  <p className="text-xs text-titanium-300 mt-1 leading-relaxed">
                    {activeVideoMaterial.summary}
                  </p>
                </div>

                {activeVideoMaterial.qrImage && (
                  <div className="flex-shrink-0 text-center bg-white p-2 rounded-xl shadow border border-charcoal-700">
                    <img src={activeVideoMaterial.qrImage} alt="QR Code" className="w-14 h-14 object-contain" />
                    <span className="block text-[8px] text-charcoal-900 font-mono font-bold mt-1">اسکن QR کاتالوگ</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-charcoal-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-titanium-400 font-mono">مدت ویدیو: {activeVideoMaterial.videoDuration}</span>
                <div className="flex items-center gap-3">
                  {activeVideoMaterial.qrUrl && (
                    <a
                      href={activeVideoMaterial.qrUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-bronze-400 hover:text-bronze-300 font-semibold flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>مشاهده صفحه وب‌سایت کاتالوگ سازنده</span>
                    </a>
                  )}
                  {activeVideoMaterial.videoUrl && (
                    <a
                      href={activeVideoMaterial.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="px-3 py-1 rounded-lg bg-charcoal-800 text-titanium-200 hover:text-white flex items-center gap-1 font-medium"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>دانلود ویدیو</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          MODAL 2: FULL TECHNICAL SPECS SHEET
          ═══════════════════════════════════════════════════════════ */}
      {activeSpecsMaterial && (
        <div
          className="fixed inset-0 z-50 bg-charcoal-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveSpecsMaterial(null)}
        >
          <div
            className="bg-charcoal-900 border border-charcoal-700 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 border-b border-charcoal-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-bronze-500/20 text-bronze-400 font-mono font-bold text-sm">
                  {activeSpecsMaterial.code}
                </span>
                <div>
                  <h2 className="text-base font-bold text-white">{activeSpecsMaterial.title}</h2>
                  <span className="text-[11px] text-titanium-400 font-mono">{activeSpecsMaterial.titleEn}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveSpecsMaterial(null)}
                className="p-1.5 rounded-lg bg-charcoal-800 text-titanium-300 hover:text-white"
                aria-label="بستن"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Profile Image & QR Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-charcoal-950 p-4 rounded-2xl border border-charcoal-800">
                <div className="sm:col-span-2 flex items-center justify-center h-48 bg-black/40 rounded-xl p-2">
                  <img src={activeSpecsMaterial.image} alt={activeSpecsMaterial.title} className="max-h-full object-contain" />
                </div>
                <div className="flex flex-col items-center justify-center text-center p-3 bg-white/5 rounded-xl border border-charcoal-700">
                  <img src={activeSpecsMaterial.qrImage} alt="QR Code" className="w-24 h-24 object-contain bg-white p-1 rounded-lg" />
                  <span className="text-[11px] font-bold text-white mt-2">اسکن بارکد QR</span>
                  <span className="text-[10px] text-titanium-400 mt-0.5">انتقال به صفحه اختصاصی سیستم</span>
                  {activeSpecsMaterial.qrUrl && (
                    <a
                      href={activeSpecsMaterial.qrUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-bronze-400 hover:underline mt-2 flex items-center gap-1 font-mono"
                    >
                      <span>باز کردن لینک مستقیم</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Specs Table */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-bronze-400 uppercase tracking-wider">
                  مشخصات فنی و استانداردهای مهندسی
                </h3>
                <div className="rounded-2xl border border-charcoal-800 overflow-hidden text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-charcoal-800">
                    <div className="divide-y divide-charcoal-800">
                      <div className="p-3 bg-charcoal-950/40 flex justify-between">
                        <span className="text-titanium-400">اندازه عرض فریم:</span>
                        <span className="font-mono font-semibold text-white">{activeSpecsMaterial.specs.frameWidth}</span>
                      </div>
                      <div className="p-3 flex justify-between">
                        <span className="text-titanium-400">اندازه عرض لنگه:</span>
                        <span className="font-mono font-semibold text-white">{activeSpecsMaterial.specs.sashWidth}</span>
                      </div>
                      <div className="p-3 bg-charcoal-950/40 flex justify-between">
                        <span className="text-titanium-400">ضخامت دیواره پروفیل:</span>
                        <span className="font-mono font-semibold text-white">{activeSpecsMaterial.specs.wallThickness}</span>
                      </div>
                      <div className="p-3 flex justify-between">
                        <span className="text-titanium-400">اندازه تیغه پلی‌آمید:</span>
                        <span className="font-mono font-semibold text-white">{activeSpecsMaterial.specs.polyamideSize}</span>
                      </div>
                      <div className="p-3 bg-charcoal-950/40 flex justify-between">
                        <span className="text-titanium-400">ضخامت شیشه‌خور:</span>
                        <span className="font-mono font-semibold text-white">{activeSpecsMaterial.specs.glassThickness}</span>
                      </div>
                    </div>

                    <div className="divide-y divide-charcoal-800">
                      <div className="p-3 bg-charcoal-950/40 flex justify-between">
                        <span className="text-titanium-400">ضریب هدایت حرارتی (Uf):</span>
                        <span className="font-mono font-semibold text-emerald-400">{activeSpecsMaterial.specs.thermalUf}</span>
                      </div>
                      <div className="p-3 flex justify-between">
                        <span className="text-titanium-400">نمای ظاهری پروفیل:</span>
                        <span className="font-semibold text-white">{activeSpecsMaterial.specs.appearance}</span>
                      </div>
                      <div className="p-3 bg-charcoal-950/40 flex justify-between">
                        <span className="text-titanium-400">نوع گونیای گوشه:</span>
                        <span className="font-semibold text-white">{activeSpecsMaterial.specs.cornerFixture}</span>
                      </div>
                      <div className="p-3 flex justify-between">
                        <span className="text-titanium-400">گسکت‌های درزبندی:</span>
                        <span className="font-semibold text-white">{activeSpecsMaterial.specs.gaskets}</span>
                      </div>
                      <div className="p-3 bg-charcoal-950/40 flex justify-between">
                        <span className="text-titanium-400">یراق‌آلات سازگار:</span>
                        <span className="font-semibold text-white">{activeSpecsMaterial.specs.hardware}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Openings & Features */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-bronze-400 uppercase tracking-wider">
                  انواع بازشو و کاربری‌ها
                </h3>
                <p className="text-xs text-titanium-200 bg-charcoal-950 p-3 rounded-xl border border-charcoal-800 leading-relaxed">
                  {activeSpecsMaterial.specs.openings}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold text-bronze-400 uppercase tracking-wider">
                  ویژگی‌های شاخص مهندسی
                </h3>
                <ul className="space-y-1.5 text-xs text-titanium-300">
                  {activeSpecsMaterial.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-bronze-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 border-t border-charcoal-800 flex items-center justify-between">
              {activeSpecsMaterial.videoUrl && (
                <button
                  onClick={() => {
                    const m = activeSpecsMaterial;
                    setActiveSpecsMaterial(null);
                    setActiveVideoMaterial(m);
                  }}
                  className="py-2 px-4 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>پخش انیمیشن این سیستم</span>
                </button>
              )}
              <button
                onClick={() => setActiveSpecsMaterial(null)}
                className="py-2 px-4 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white text-xs font-semibold mr-auto"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
