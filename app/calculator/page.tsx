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
    'thermal-break': { title: 'پنجره دوجداره آلومینیوم ترمال بریک', baseRate: 8500000, unit: 'مترمربع' },
    'lift-slide': { title: 'پنجره فوق‌لوکس لیفت اند اسلاید (Lift & Slide)', baseRate: 14500000, unit: 'مترمربع' },
    'curtain-wall': { title: 'نمای کرتین وال / لامل (Curtain Wall)', baseRate: 12500000, unit: 'مترمربع' },
    'frameless': { title: 'نمای شیشه‌ای فریم‌لس (Frameless)', baseRate: 11000000, unit: 'مترمربع' },
    'composite': { title: 'نمای کامپوزیت آلومینیوم نسوز (ACP)', baseRate: 6800000, unit: 'مترمربع' },
    'thermowood': { title: 'نمای چوب طبیعی ترموود فنلاندی', baseRate: 9200000, unit: 'مترمربع' },
  };

  const glassMultipliers: Record<string, { title: string; priceAdd: number }> = {
    'superclear-argon': { title: 'دوجداره ۶+۴ سوپرکلیر با تزریق گاز آرگون', priceAdd: 0 },
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-bronze-400 uppercase tracking-widest">
          برآوردگر آنلاین مهندسی
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
          محاسبه‌گر پیش‌فاکتور و متراژ نوآوران پنجره سپاهان
        </h1>
        <p className="mt-3 text-sm text-titanium-300 leading-relaxed">
          ابعاد و مشخصات دهانه یا نمای ساختمان را انتخاب کنید تا مشخصات متره و پیش‌فاکتور تخمینی فوراً محاسبه گردد.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Form Inputs */}
        <div className="lg:col-span-2 rounded-3xl bg-charcoal-900 border border-charcoal-800 p-6 sm:p-8 space-y-6">
          {/* Step 1: System Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-white block">
              ۱. نوع سیستم نما یا پنجره:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(systemRates).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSystemType(key)}
                  className={`p-3.5 rounded-xl text-right text-xs font-medium border transition-all ${
                    systemType === key
                      ? 'bg-bronze-500/20 border-bronze-500 text-white shadow-sm'
                      : 'bg-charcoal-850 border-charcoal-700/80 text-titanium-300 hover:border-charcoal-600'
                  }`}
                >
                  <div className="font-bold">{item.title}</div>
                  <div className="text-[10px] text-titanium-400 mt-1">واحد محاسبه: {item.unit}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Dimensions */}
          <div className="space-y-3 pt-4 border-t border-charcoal-800">
            <label className="text-xs font-bold text-white block">
              ۲. ابعاد دهانه یا سطح نما:
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] text-titanium-400 block mb-1">عرض (متر):</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="50"
                  value={width}
                  onChange={(e) => setWidth(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono text-sm focus:border-bronze-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-titanium-400 block mb-1">ارتفاع (متر):</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="50"
                  value={height}
                  onChange={(e) => setHeight(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono text-sm focus:border-bronze-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-titanium-400 block mb-1">تعداد لنگه/دهانه:</label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono text-sm focus:border-bronze-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Glass Type */}
          <div className="space-y-3 pt-4 border-t border-charcoal-800">
            <label className="text-xs font-bold text-white block">
              ۳. مشخصات شیشه دوجداره:
            </label>
            <div className="space-y-2">
              {Object.entries(glassMultipliers).map(([key, item]) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    glassType === key
                      ? 'bg-charcoal-800 border-bronze-500 text-white'
                      : 'bg-charcoal-850 border-charcoal-700 text-titanium-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="glass"
                      checked={glassType === key}
                      onChange={() => setGlassType(key)}
                      className="accent-bronze-500"
                    />
                    <span>{item.title}</span>
                  </div>
                  {item.priceAdd > 0 && (
                    <span className="text-[10px] text-bronze-400 font-mono">
                      +{formatPrice(item.priceAdd)} تومان/متر
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Step 4: Finish Color */}
          <div className="space-y-3 pt-4 border-t border-charcoal-800">
            <label className="text-xs font-bold text-white block">
              ۴. نوع پوشش و رنگ پروفیل:
            </label>
            <select
              value={finishColor}
              onChange={(e) => setFinishColor(e.target.value)}
              className="w-full p-3 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white text-xs focus:border-bronze-500 focus:outline-none"
            >
              {Object.entries(finishMultipliers).map(([key, title]) => (
                <option key={key} value={key}>{title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right 1 Col: Calculation Summary & Send to WhatsApp */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-gradient-to-b from-charcoal-850 to-charcoal-900 border border-charcoal-700 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center gap-2 text-bronze-400 text-xs font-bold uppercase tracking-wider">
              <FileSpreadsheet className="w-4 h-4" />
              <span>خلاصه محاسبات متره و برآورد</span>
            </div>

            <div className="space-y-3 pb-4 border-b border-charcoal-700 text-xs">
              <div className="flex justify-between text-titanium-400">
                <span>مجموع متراژ محاسبه شده:</span>
                <span className="font-mono text-white font-bold">{totalArea} مترمربع</span>
              </div>
              <div className="flex justify-between text-titanium-400">
                <span>نوع سیستم:</span>
                <span className="text-white text-[11px] line-clamp-1">{systemRates[systemType].title}</span>
              </div>
              <div className="flex justify-between text-titanium-400">
                <span>پوشش رنگ:</span>
                <span className="text-white text-[11px]">{finishMultipliers[finishColor]}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-titanium-400 block">برآورد تقریبی بودجه مورد نیاز:</span>
              <div className="text-2xl font-black text-bronze-400 font-mono">
                {formatPrice(totalEstimatedPrice)} <span className="text-xs font-normal text-titanium-300">تومان</span>
              </div>
              <span className="text-[10px] text-titanium-500 block pt-1">
                * قیمت نهایی پس از برداشت ابعاد دقیق کارگاهی و محاسبه ممان اینرسی پروفیل نهایی خواهد شد.
              </span>
            </div>

            <div className="pt-2 space-y-3">
              <a
                href={`https://wa.me/989139090673?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>ارسال ابعاد به واتساپ واحد مهندسی</span>
              </a>

              <a
                href="tel:0314144"
                className="w-full py-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-titanium-200 font-bold text-xs flex items-center justify-center gap-2 border border-charcoal-700 transition-colors font-mono"
              >
                <Phone className="w-4 h-4 text-bronze-400" />
                <span>استعلام تلفنی: ۰۳۱-۴۱۴۴</span>
              </a>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-charcoal-900/50 border border-charcoal-800 text-xs text-titanium-400 space-y-2">
            <div className="flex items-center gap-2 text-bronze-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>مزیت استعلام از نوآوران پنجره سپاهان</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              ارسال پیش‌فاکتور رسمی شرکتی با جزئیات کامل متریال، برند یراق‌آلات، خلوص گاز آرگون، و ۱۰ سال گارانتی کتبی.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
