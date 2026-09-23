'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  RefreshCw, 
  FileSpreadsheet, 
  ShieldCheck, 
  Grid, 
  Layers, 
  Maximize, 
  Box, 
  TreePine,
  Sparkles,
  ChevronLeft
} from 'lucide-react';

export default function CalculatorPage() {
  const [systemType, setSystemType] = useState('thermal-break');
  const [width, setWidth] = useState<number>(3.0);
  const [height, setHeight] = useState<number>(2.4);
  const [quantity, setQuantity] = useState<number>(1);
  const [glassType, setGlassType] = useState('superclear-argon');
  const [finishColor, setFinishColor] = useState('anodize-champagne');

  const systemRates: Record<string, { title: string; subtitle: string; baseRate: number; unit: string; icon: any }> = {
    'thermal-break': { 
      title: 'درب و پنجره آلومینیوم ترمال بریک', 
      subtitle: 'عایق کامل حرارتی با تیغه پلی‌آمید و یراق‌آلات آلمانی',
      baseRate: 8500000, 
      unit: 'مترمربع',
      icon: Grid
    },
    'lift-slide': { 
      title: 'پنجره فوق‌لوکس لیفت اند اسلاید', 
      subtitle: 'سیستم کشویی سنگین برای دهانه‌های عریض تا ۶ متر',
      baseRate: 14500000, 
      unit: 'مترمربع',
      icon: Maximize
    },
    'curtain-wall': { 
      title: 'نمای کرتین وال / لامل', 
      subtitle: 'سیستم خودایستا لامل با لاستیک‌های EPDM عایق',
      baseRate: 12500000, 
      unit: 'مترمربع',
      icon: Layers
    },
    'frameless': { 
      title: 'نمای شیشه‌ای فریم‌لس', 
      subtitle: 'نمای یکپارچه شیشه‌ای با فریم‌های پنهان آلومینیومی',
      baseRate: 11000000, 
      unit: 'مترمربع',
      icon: Box
    },
    'composite': { 
      title: 'نمای کامپوزیت آلومینیوم نسوز (ACP)', 
      subtitle: 'ورق‌های ۴ میلی‌متری ضدحریق با رنگ PVDF',
      baseRate: 6800000, 
      unit: 'مترمربع',
      icon: Sparkles
    },
    'thermowood': { 
      title: 'نمای چوب طبیعی ترموود فنلاندی', 
      subtitle: 'چوب فرآوری‌شده حرارتی مقاوم در برابر رطوبت و افتاب',
      baseRate: 9200000, 
      unit: 'مترمربع',
      icon: TreePine
    },
  };

  const glassMultipliers: Record<string, { title: string; desc: string; priceAdd: number }> = {
    'superclear-argon': { 
      title: 'دوجداره ۶+۴ سوپرکلیر با گاز آرگون', 
      desc: 'شفافیت بالا و عایق استاندارد صوتی و حرارتی',
      priceAdd: 0 
    },
    'laminated-security': { 
      title: 'شیشه سکوریت + لمینت ضدسرقت و نشکن', 
      desc: 'ایمنی فوق‌العاده در برابر ضربه و زلزله',
      priceAdd: 1800000 
    },
    'low-e-sun': { 
      title: 'شیشه Low-E سان‌انرژی (کنترل تابش)', 
      desc: 'کاهش ورود گرمای خورشید در تابستان و حفظ گرما در زمستان',
      priceAdd: 2200000 
    },
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
    const text = `سلام و احترام. استعلام آنلاین قیمت از وب‌سایت نوآوران پنجره سپاهان:
📌 سیستم انتخابی: ${systemRates[systemType].title}
📐 ابعاد دهانه: عرض ${width} متر × ارتفاع ${height} متر
🔢 تعداد: ${quantity} عدد (مجموع متراژ: ${totalArea} مترمربع)
🪟 نوع شیشه: ${glassMultipliers[glassType].title}
🎨 پوشش رنگ: ${finishMultipliers[finishColor]}
💰 برآورد تخمینی قیمت: ${formatPrice(totalEstimatedPrice)} تومان

لطفاً جهت برآورد دقیق کارگاهی، بررسی نقشه‌ها و صدور پیش‌فاکتور رسمی اقدام فرمایید.`;
    return encodeURIComponent(text);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-black text-bronze-400 uppercase tracking-widest bg-bronze-500/10 px-4 py-1.5 rounded-full border border-bronze-500/20 inline-block">
          محاسبه‌گر پیش‌فاکتور مهندسی
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          محاسبه‌گر آنلاین متراژ و قیمت نوآوران پنجره سپاهان
        </h1>
        <p className="text-xs sm:text-sm text-titanium-300 leading-relaxed font-normal">
          ابعاد و مشخصات فنی دهانه پنجره یا نمای ساختمان خود را مشخص کنید تا برآورد تقریبی بودجه فوراً محاسبه گردد.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Columns: Input Controls */}
        <div className="lg:col-span-2 rounded-3xl bg-charcoal-900 border border-charcoal-800 p-6 sm:p-9 space-y-8 shadow-2xl">
          {/* Step 1: System Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-bronze-500 text-charcoal-950 font-black text-xs flex items-center justify-center">۱</span>
              <span>نوع سیستم نما یا پنجره:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {Object.entries(systemRates).map(([key, item]) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSystemType(key)}
                    className={`p-4 rounded-2xl text-right transition-all flex items-start gap-3 border ${
                      systemType === key
                        ? 'bg-bronze-500/15 border-bronze-500 text-white shadow-lg shadow-bronze-500/10'
                        : 'bg-charcoal-850 border-charcoal-750 text-titanium-300 hover:border-charcoal-600'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${systemType === key ? 'bg-bronze-500 text-charcoal-950' : 'bg-charcoal-800 text-bronze-400'}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">{item.title}</div>
                      <div className="text-[10px] text-titanium-400 mt-1 leading-relaxed font-normal">{item.subtitle}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Dimensions */}
          <div className="space-y-4 pt-6 border-t border-charcoal-800">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-bronze-500 text-charcoal-950 font-black text-xs flex items-center justify-center">۲</span>
              <span>ابعاد و تعداد دهانه‌ها:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-2">
                <label className="text-xs text-titanium-300 font-bold block">عرض (متر):</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="50"
                  value={width}
                  onChange={(e) => setWidth(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                  className="w-full p-3.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono font-bold text-sm focus:border-bronze-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-titanium-300 font-bold block">ارتفاع (متر):</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="50"
                  value={height}
                  onChange={(e) => setHeight(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                  className="w-full p-3.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono font-bold text-sm focus:border-bronze-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-titanium-300 font-bold block">تعداد دهانه:</label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-3.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono font-bold text-sm focus:border-bronze-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Glass Options */}
          <div className="space-y-4 pt-6 border-t border-charcoal-800">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-bronze-500 text-charcoal-950 font-black text-xs flex items-center justify-center">۳</span>
              <span>نوع شیشه دوجداره:</span>
            </div>

            <div className="space-y-3">
              {Object.entries(glassMultipliers).map(([key, item]) => (
                <label
                  key={key}
                  className={`flex items-center justify-between p-4 rounded-2xl border text-xs cursor-pointer transition-all ${
                    glassType === key
                      ? 'bg-charcoal-800 border-bronze-500 text-white'
                      : 'bg-charcoal-850 border-charcoal-750 text-titanium-300 hover:border-charcoal-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="glass"
                      checked={glassType === key}
                      onChange={() => setGlassType(key)}
                      className="accent-bronze-500 w-4 h-4"
                    />
                    <div>
                      <div className="font-bold text-white text-xs">{item.title}</div>
                      <div className="text-[10px] text-titanium-400 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                  {item.priceAdd > 0 && (
                    <span className="text-[10px] text-bronze-400 font-mono font-bold shrink-0 bg-bronze-500/10 px-2.5 py-1 rounded-lg border border-bronze-500/20">
                      +{formatPrice(item.priceAdd)} تومان/متر
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Step 4: Finish & Color */}
          <div className="space-y-4 pt-6 border-t border-charcoal-800">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-bronze-500 text-charcoal-950 font-black text-xs flex items-center justify-center">۴</span>
              <span>پوشش و رنگ آلومینیوم:</span>
            </div>

            <select
              value={finishColor}
              onChange={(e) => setFinishColor(e.target.value)}
              className="w-full p-4 rounded-2xl bg-charcoal-850 border border-charcoal-700 text-white text-xs font-bold focus:border-bronze-500 focus:outline-none"
            >
              {Object.entries(finishMultipliers).map(([key, title]) => (
                <option key={key} value={key}>{title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column: Instant Summary & WhatsApp Inquiry */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-gradient-to-b from-charcoal-850 via-charcoal-900 to-charcoal-950 border border-charcoal-700 p-7 space-y-6 shadow-2xl sticky top-28">
            <div className="flex items-center gap-2.5 text-bronze-400 text-xs font-black uppercase tracking-wider">
              <FileSpreadsheet className="w-4 h-4 text-bronze-400" />
              <span>خلاصه متره و پیش‌فاکتور</span>
            </div>

            <div className="space-y-3.5 pb-5 border-b border-charcoal-750 text-xs">
              <div className="flex justify-between text-titanium-400">
                <span>متراژ کل:</span>
                <span className="font-mono text-white font-extrabold text-sm">{totalArea} مترمربع</span>
              </div>
              <div className="flex justify-between text-titanium-400">
                <span>سیستم:</span>
                <span className="text-white text-[11px] font-bold line-clamp-1">{systemRates[systemType].title}</span>
              </div>
              <div className="flex justify-between text-titanium-400">
                <span>شیشه:</span>
                <span className="text-white text-[11px] line-clamp-1">{glassMultipliers[glassType].title}</span>
              </div>
              <div className="flex justify-between text-titanium-400">
                <span>پوشش رنگ:</span>
                <span className="text-white text-[11px]">{finishMultipliers[finishColor]}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] text-titanium-400 block font-bold">برآورد تقریبی بودجه:</span>
              <div className="text-3xl font-black text-bronze-400 font-mono gold-gradient-text">
                {formatPrice(totalEstimatedPrice)} <span className="text-xs font-bold text-titanium-300 font-sans">تومان</span>
              </div>
              <span className="text-[10px] text-titanium-500 block pt-1 leading-relaxed">
                * برآورد نهایی پس از برداشت ابعاد دقیق کارگاهی و محاسبه ممان اینرسی پروفیل تایید خواهد شد.
              </span>
            </div>

            <div className="pt-3 space-y-3">
              <a
                href={`https://wa.me/989139090673?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/25 transition-all hover:scale-105 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>ارسال استعلام به واتساپ واحد مهندسی</span>
              </a>

              <a
                href="tel:0314144"
                className="w-full py-3.5 rounded-2xl bg-charcoal-800 hover:bg-charcoal-750 text-titanium-100 font-bold text-xs flex items-center justify-center gap-2 border border-charcoal-700 transition-colors font-mono"
              >
                <Phone className="w-4 h-4 text-bronze-400" />
                <span>استعلام تلفنی مستقیم: ۰۳۱-۴۱۴۴</span>
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-charcoal-900/60 border border-charcoal-800 text-xs text-titanium-400 space-y-2.5">
            <div className="flex items-center gap-2 text-bronze-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>گارانتی و تضمین کیفیت نوآوران پنجره</span>
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
