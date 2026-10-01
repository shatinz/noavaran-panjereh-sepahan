'use client';

import React, { useState } from 'react';
import { CheckCircle2, MessageSquare } from 'lucide-react';
import { trackCalculatorCalculation, trackWhatsAppClick } from '@/lib/analytics';

export function CalculatorClient() {
  const [systemType, setSystemType] = useState('thermal-break');
  const [width, setWidth] = useState<number>(3);
  const [height, setHeight] = useState<number>(2.4);
  const [quantity, setQuantity] = useState<number>(1);
  const [glassType, setGlassType] = useState('superclear-argon');
  const [finishColor, setFinishColor] = useState('anodize-champagne');

  const systemRates: Record<string, { title: string; baseRate: number; unit: string }> = {
    'thermal-break': { title: 'پنجره آلومینیوم ترمال‌بریک لولایی (TH 68 / TH 60)', baseRate: 8500000, unit: 'مترمربع' },
    'lift-slide': { title: 'پنجره کشویی لیفت‌انداسلاید (TS 143 / TS 115)', baseRate: 14500000, unit: 'مترمربع' },
    'curtain-wall': { title: 'نمای شیشه‌ای کرتین‌وال (Curtain Wall)', baseRate: 12500000, unit: 'مترمربع' },
    'frameless': { title: 'نمای شیشه‌ای فریم‌لس استپ‌دار', baseRate: 11000000, unit: 'مترمربع' },
    'composite': { title: 'نمای کامپوزیت آلومینیوم (ACP)', baseRate: 6800000, unit: 'مترمربع' },
    'fence': { title: 'هندریل شیشه‌ای و حفاظ', baseRate: 5900000, unit: 'مترطول' },
  };

  const glassMultipliers: Record<string, { title: string; priceAdd: number }> = {
    'superclear-argon': { title: 'شیشه دوجداره سوپرکلیر + گاز آرگون', priceAdd: 0 },
    'laminated-security': { title: 'شیشه لمینت سکوریت (ضدسرقت)', priceAdd: 1800000 },
    'low-e-sun': { title: 'شیشه Low-E کنترل‌کننده انرژی', priceAdd: 2200000 },
  };

  const finishMultipliers: Record<string, string> = {
    'anodize-champagne': 'آنادایز شامپاین براق',
    'anodize-black': 'آنادایز مشکی مات',
    'powder-white': 'رنگ پودری الکترواستاتیک',
    'anodize-gold': 'آنادایز طلایی',
  };

  const totalArea = Number((width * height * quantity).toFixed(2));
  const currentBase = systemRates[systemType].baseRate;
  const glassAdd = glassMultipliers[glassType].priceAdd;
  const estimatedUnitPrice = currentBase + glassAdd;
  const totalEstimatedPrice = Math.round(totalArea * estimatedUnitPrice);

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('fa-IR').format(num);
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick();
    trackCalculatorCalculation({
      systemType: systemRates[systemType].title,
      dimensions: `${width}x${height} (${quantity} units)`,
      estimatedPrice: totalEstimatedPrice,
    });
  };

  const generateWhatsAppMessage = () => {
    const text = `سلام. از طریق ماشین‌حساب سایت نوآوران پنجره سپاهان استعلام می‌گیرم:
سیستم: ${systemRates[systemType].title}
ابعاد: عرض ${width} متر × ارتفاع ${height} متر
تعداد: ${quantity} عدد (مجموع متراژ: ${totalArea} ${systemRates[systemType].unit})
شیشه: ${glassMultipliers[glassType].title}
پوشش: ${finishMultipliers[finishColor]}
برآورد آنلاین: ${formatPrice(totalEstimatedPrice)} تومان
لطفاً جهت بررسی دقیق‌تر و صدور پیش‌فاکتور رسمی راهنمایی بفرمایید.`;
    return encodeURIComponent(text);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
      {/* Form Fields */}
      <div className="lg:col-span-2 bg-ink-950 border border-ink-800 rounded-xl p-6 md:p-8 space-y-8 metal-shadow">
        
        {/* Step 1: System */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white font-vazir flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-signal-500 text-white flex items-center justify-center text-sm font-bold shrink-0">۱</span>
            انتخاب سیستم اجرایی
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-8">
            {Object.entries(systemRates).map(([key, item]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSystemType(key)}
                className={`p-4 rounded-lg text-right text-sm font-bold border transition-all font-vazir ${
                  systemType === key
                    ? 'bg-signal-500 border-signal-500 text-white shadow-[0_0_15px_rgba(171,0,23,0.3)]'
                    : 'bg-ink-900 border-ink-800 text-steel-300 hover:border-signal-500/50 hover:text-white'
                }`}
              >
                <div className="line-clamp-1">{item.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Dimensions */}
        <div className="space-y-4 pt-4 border-t border-ink-800">
          <h3 className="text-lg font-bold text-white font-vazir flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-signal-500 text-white flex items-center justify-center text-sm font-bold shrink-0">۲</span>
            ابعاد حدودی هر فریم
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pl-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-steel-400 font-vazir block">عرض (متر)</label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value) || 0)}
                className="w-full bg-ink-900 border border-ink-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-signal-500 font-mono text-center"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-steel-400 font-vazir block">ارتفاع (متر)</label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value) || 0)}
                className="w-full bg-ink-900 border border-ink-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-signal-500 font-mono text-center"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-steel-400 font-vazir block">تعداد لنگه/آیتم مشابه</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                className="w-full bg-ink-900 border border-ink-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-signal-500 font-mono text-center"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Glass */}
        <div className="space-y-4 pt-4 border-t border-ink-800">
          <h3 className="text-lg font-bold text-white font-vazir flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-signal-500 text-white flex items-center justify-center text-sm font-bold shrink-0">۳</span>
            نوع شیشه و آپشن‌ها
          </h3>
          <div className="grid grid-cols-1 gap-3 pl-8">
            {Object.entries(glassMultipliers).map(([key, item]) => (
              <button
                key={key}
                type="button"
                onClick={() => setGlassType(key)}
                className={`p-4 rounded-lg text-right text-sm font-bold border transition-all font-vazir flex justify-between items-center ${
                  glassType === key
                    ? 'bg-signal-500 border-signal-500 text-white shadow-[0_0_15px_rgba(171,0,23,0.3)]'
                    : 'bg-ink-900 border-ink-800 text-steel-300 hover:border-signal-500/50 hover:text-white'
                }`}
              >
                <span>{item.title}</span>
                {item.priceAdd === 0 ? (
                  <span className="text-xs bg-ink-950/50 px-2 py-1 rounded">پایه</span>
                ) : (
                  <span className="text-xs bg-ink-950/50 px-2 py-1 rounded" dir="ltr">
                    +{formatPrice(item.priceAdd)} T
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Step 4: Finish */}
        <div className="space-y-4 pt-4 border-t border-ink-800">
          <h3 className="text-lg font-bold text-white font-vazir flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-signal-500 text-white flex items-center justify-center text-sm font-bold shrink-0">۴</span>
            پوشش و رنگ پروفیل
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pl-8">
            {Object.entries(finishMultipliers).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFinishColor(key)}
                className={`p-3 rounded-lg text-center text-xs font-bold border transition-all font-vazir ${
                  finishColor === key
                    ? 'bg-signal-500 border-signal-500 text-white'
                    : 'bg-ink-900 border-ink-800 text-steel-300 hover:border-signal-500/50 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Results Box */}
      <div className="space-y-6 relative">
        <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blood-900/20 via-ink-900 to-ink-950 border border-signal-500/50 rounded-xl p-6 md:p-8 space-y-6 metal-shadow sticky top-24">
          <div className="text-center space-y-2 border-b border-ink-800 pb-6">
            <h4 className="text-sm font-bold text-steel-400 font-vazir">برآورد اولیه هزینه‌ها</h4>
            <div className="text-4xl font-black text-white font-mono tracking-tighter" dir="ltr">
              {formatPrice(totalEstimatedPrice)} <span className="text-xl text-signal-500 font-vazir tracking-normal">تومان</span>
            </div>
            <p className="text-xs text-steel-500 font-vazir mt-2">
              (برای متراژ حدودی {totalArea} {systemRates[systemType].unit})
            </p>
          </div>

          <div className="space-y-3 font-vazir text-xs text-steel-300 bg-ink-950 p-4 rounded-lg border border-ink-800">
            <div className="flex justify-between items-center border-b border-ink-800 pb-2">
              <span>هزینه شیشه:</span>
              <span className="font-bold text-white">{glassAdd === 0 ? 'رایگان' : 'اضافه شده'}</span>
            </div>
            <div className="flex justify-between items-center border-b border-ink-800 pb-2">
              <span>رنگ و پوشش:</span>
              <span className="font-bold text-white">{finishMultipliers[finishColor]}</span>
            </div>
            <div className="flex items-start gap-2 pt-1 text-steel-400 leading-relaxed text-[10px]">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-signal-500" />
              <span>برآورد فوق حدودی بوده و شامل هزینه‌های حمل، جرثقیل و زیرسازی آهنی نمی‌باشد.</span>
            </div>
          </div>

          <a
            href={`https://wa.me/989301545858?text=${generateWhatsAppMessage()}`}
            onClick={handleWhatsAppClick}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 bg-signal-500 hover:bg-signal-400 text-white font-bold rounded-lg transition-colors font-vazir shadow-[0_0_20px_rgba(171,0,23,0.4)]"
          >
            <MessageSquare className="w-5 h-5" />
            <span>ارسال پیش‌فاکتور به واتساپ</span>
          </a>
        </div>
      </div>

    </div>
  );
}
