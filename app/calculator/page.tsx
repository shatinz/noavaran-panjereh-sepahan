'use client';

import React, { useState } from 'react';
import { Calculator, CheckCircle2, MessageSquare, Phone, RefreshCw, FileSpreadsheet, ShieldCheck } from 'lucide-react';

export default function CalculatorPage() {
  const [systemType, setSystemType] = useState('thermal-break');
  const [width, setWidth] = useState<number>(3);
  const [height, setHeight] = useState<number>(2.4);
  const [quantity, setQuantity] = useState<number>(1);
  const [glassType, setGlassType] = useState('superclear-argon');
  const [finishColor, setFinishColor] = useState('anodize-champagne');

  const systemRates: Record<string, { title: string; baseRate: number; unit: string }> = {
    'thermal-break': { title: 'پنجره دوجداره آلومینیوم ترمال بریک (TH 68 / TH 60)', baseRate: 8500000, unit: 'مترمربع' },
    'lift-slide': { title: 'پنجره فوق‌لوکس لیفت اند اسلاید (TS 143 / TS 115)', baseRate: 14500000, unit: 'مترمربع' },
    'curtain-wall': { title: 'نمای کرتین وال / لامل (Curtain Wall)', baseRate: 12500000, unit: 'مترمربع' },
    'frameless': { title: 'نمای شیشه‌ای فریم‌لس استراکچرال', baseRate: 11000000, unit: 'مترمربع' },
    'composite': { title: 'نمای کامپوزیت آلومینیوم نسوز (ACP)', baseRate: 6800000, unit: 'مترمربع' },
    'fence': { title: 'حفاظ و جان‌پناه شیشه‌ای تمام آلومینیوم', baseRate: 5900000, unit: 'مترطول' },
  };

  const glassMultipliers: Record<string, { title: string; priceAdd: number }> = {
    'superclear-argon': { title: 'دوجداره ۶+۱۲+۶ سوپرکلیر با تزریق گاز آرگون', priceAdd: 0 },
    'laminated-security': { title: 'شیشه سکوریت + لمینت ضدسرقت و نشکن', priceAdd: 1800000 },
    'low-e-sun': { title: 'شیشه Low-E سان‌انرژی ضدتابش و کنترل دما', priceAdd: 2200000 },
  };

  const finishMultipliers: Record<string, string> = {
    'anodize-champagne': 'آنادایز شامپاینی اروپایی مات',
    'anodize-black': 'آنادایز مشکی سمباده‌ای مدرن',
    'powder-white': 'رنگ پودری الکترواستاتیک کد ۹۰۱۶',
    'anodize-gold': 'آنادایز طلایی براق لوکس',
  };

  const totalArea = Number((width * height * quantity).toFixed(2));
  const currentBase = systemRates[systemType].baseRate;
  const glassAdd = glassMultipliers[glassType].priceAdd;
  const estimatedUnitPrice = currentBase + glassAdd;
  const totalEstimatedPrice = Math.round(totalArea * estimatedUnitPrice);

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('fa-IR').format(num);
  };

  const generateWhatsAppMessage = () => {
    const text = `سلام و احترام. استعلام آنلاین از وب‌سایت نوآوران پنجره سپاهان:
سیستم انتخابی: ${systemRates[systemType].title}
ابعاد: عرض ${width} متر × ارتفاع ${height} متر
تعداد: ${quantity} عدد (مجموع متراژ: ${totalArea} مترمربع)
نوع شیشه: ${glassMultipliers[glassType].title}
پوشش: ${finishMultipliers[finishColor]}
برآورد تقریبی: ${formatPrice(totalEstimatedPrice)} تومان
لطفاً جهت بررسی نقشه‌های فاز ۲ و صدور پیش‌فاکتور رسمی راهنمایی بفرمایید.`;
    return encodeURIComponent(text);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 py-4 space-y-5">
      {/* Header */}
      <section className="aluminum-card sharp frame-shadow p-6 sm:p-10 border border-[#b0b3b0] text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18191a] text-white text-[11px] font-bold sharp border border-black shadow-sm">
          <Calculator className="w-4 h-4 text-[#cbcccb]" />
          <span>برآوردگر آنلاین متراژ و پیش‌فاکتور مهندسی</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight leading-tight">
          محاسبه‌گر پیش‌فاکتور نوآوران پنجره سپاهان
        </h1>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#333] leading-relaxed font-medium">
          ابعاد و مشخصات دهانه یا نمای ساختمان را انتخاب کنید تا مشخصات متره و پیش‌فاکتور تخمینی فوراً محاسبه گردد.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Form Inputs */}
        <div className="lg:col-span-2 aluminum-card sharp frame-shadow p-6 sm:p-8 space-y-6 text-right border border-[#b0b3b0]">
          {/* Step 1: System Selection */}
          <div className="space-y-3">
            <label className="text-xs font-black text-black block">
              ۱. نوع سیستم نما یا پنجره:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.entries(systemRates).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSystemType(key)}
                  className={`p-3 sharp text-right text-xs font-bold border transition-all ${
                    systemType === key
                      ? 'bg-[#18191a] border-black text-white shadow-sm'
                      : 'bg-[#cbcccb] border-[#9ea19e] text-black hover:bg-[#b8bab8]'
                  }`}
                >
                  <div className="font-black">{item.title}</div>
                  <div className="text-[10px] mt-0.5 opacity-80">واحد محاسبه: {item.unit}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Dimensions */}
          <div className="space-y-3 pt-4 border-t border-[#a8aba8]">
            <label className="text-xs font-black text-black block">
              ۲. ابعاد دهانه یا سطح نما:
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-black font-bold block mb-1">عرض (متر):</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="50"
                  value={width}
                  onChange={(e) => setWidth(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                  className="w-full p-2.5 sharp bg-white border border-[#888] text-black font-mono text-sm focus:border-black outline-none frame-shadow text-left"
                />
              </div>

              <div>
                <label className="text-[11px] text-black font-bold block mb-1">ارتفاع (متر):</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="50"
                  value={height}
                  onChange={(e) => setHeight(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                  className="w-full p-2.5 sharp bg-white border border-[#888] text-black font-mono text-sm focus:border-black outline-none frame-shadow text-left"
                />
              </div>

              <div>
                <label className="text-[11px] text-black font-bold block mb-1">تعداد لنگه/دهانه:</label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2.5 sharp bg-white border border-[#888] text-black font-mono text-sm focus:border-black outline-none frame-shadow text-left"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Glass Type */}
          <div className="space-y-3 pt-4 border-t border-[#a8aba8]">
            <label className="text-xs font-black text-black block">
              ۳. مشخصات شیشه دوجداره:
            </label>
            <div className="space-y-2">
              {Object.entries(glassMultipliers).map(([key, item]) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-3 sharp border text-xs cursor-pointer transition-all ${
                    glassType === key
                      ? 'bg-[#18191a] border-black text-white'
                      : 'bg-[#cbcccb] border-[#9ea19e] text-black hover:bg-[#b8bab8]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="glass"
                      checked={glassType === key}
                      onChange={() => setGlassType(key)}
                      className="accent-black"
                    />
                    <span className="font-bold">{item.title}</span>
                  </div>
                  {item.priceAdd > 0 && (
                    <span className="text-[10px] font-mono font-bold">
                      +{formatPrice(item.priceAdd)} تومان/متر
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Step 4: Finish Color */}
          <div className="space-y-3 pt-4 border-t border-[#a8aba8]">
            <label className="text-xs font-black text-black block">
              ۴. نوع پوشش و رنگ پروفیل:
            </label>
            <select
              value={finishColor}
              onChange={(e) => setFinishColor(e.target.value)}
              className="w-full p-2.5 sharp bg-white border border-[#888] text-black text-xs font-bold focus:border-black outline-none frame-shadow text-right"
            >
              {Object.entries(finishMultipliers).map(([key, title]) => (
                <option key={key} value={key}>{title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right 1 Col: Calculation Summary & Send to WhatsApp */}
        <div className="space-y-4 text-right">
          <div className="aluminum-card sharp frame-shadow border border-[#b0b3b0] p-6 space-y-4">
            <div className="flex items-center gap-2 text-black text-xs font-black pb-2 border-b border-[#a8aba8]">
              <FileSpreadsheet className="w-4 h-4 text-black" />
              <span>خلاصه محاسبات متره و برآورد</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between bg-[#b8bab8] p-2 sharp border border-[#9ea19e]">
                <span className="text-[#333] font-bold">مجموع متراژ محاسبه شده:</span>
                <span className="font-mono text-black font-black">{totalArea} مترمربع</span>
              </div>
              <div className="flex justify-between bg-[#b8bab8] p-2 sharp border border-[#9ea19e]">
                <span className="text-[#333] font-bold">نوع سیستم:</span>
                <span className="text-black text-[11px] font-bold line-clamp-1">{systemRates[systemType].title}</span>
              </div>
              <div className="flex justify-between bg-[#b8bab8] p-2 sharp border border-[#9ea19e]">
                <span className="text-[#333] font-bold">پوشش رنگ:</span>
                <span className="text-black text-[11px] font-bold">{finishMultipliers[finishColor]}</span>
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#a8aba8]">
              <span className="text-[11px] text-[#444] font-bold block">برآورد تقریبی بودجه مورد نیاز:</span>
              <div className="text-2xl font-black text-black font-mono">
                {formatPrice(totalEstimatedPrice)} <span className="text-xs font-normal text-[#333]">تومان</span>
              </div>
              <span className="text-[10px] text-[#555] block pt-1">
                * قیمت نهایی پس از برداشت ابعاد دقیق کارگاهی و محاسبه ممان اینرسی پروفیل نهایی خواهد شد.
              </span>
            </div>

            <div className="pt-2 space-y-2">
              <a
                href={`https://wa.me/989301545858?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 sharp bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 border border-emerald-800 shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>ارسال ابعاد به واتساپ واحد مهندسی</span>
              </a>

              <a
                href="tel:03133687755"
                className="w-full py-2.5 sharp bg-[#18191a] hover:bg-[#333] text-white font-bold text-xs flex items-center justify-center gap-2 border border-black transition-colors font-mono"
              >
                <Phone className="w-4 h-4 text-[#cbcccb]" />
                <span>استعلام تلفنی: ۰۳۱-۳۳۶۸۷۷۵۵</span>
              </a>
            </div>
          </div>

          <div className="aluminum-card sharp frame-shadow border border-[#b0b3b0] p-4 text-xs text-[#333] space-y-1.5">
            <div className="flex items-center gap-2 text-black font-black">
              <ShieldCheck className="w-4 h-4" />
              <span>مزیت استعلام از نوآوران پنجره سپاهان</span>
            </div>
            <p className="text-[11px] leading-relaxed font-medium">
              ارسال پیش‌فاکتور رسمی شرکتی با جزئیات کامل متریال، برند یراق‌آلات، خلوص گاز آرگون، و ۱۰ سال گارانتی کتبی.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
