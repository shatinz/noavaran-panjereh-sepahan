import React from 'react';

export function SpecTable({ specs }: { specs: Record<string, string | number> }) {
  if (!specs || Object.keys(specs).length === 0) return null;

  return (
    <div className="w-full border border-ink-800 rounded-xl overflow-hidden metal-shadow">
      <div className="bg-ink-900 border-b border-ink-800 px-4 py-3 font-bold text-white font-vazir">
        مشخصات فنی سیستم
      </div>
      <div className="divide-y divide-ink-800">
        {Object.entries(specs).map(([key, value], idx) => {
          if (!value && value !== 0) return null; // Drop falsy values like "0" for area
          
          let displayKey = key;
          // Simple heuristic mapping if keys are English
          if (key === 'frameWidth') displayKey = 'عرض فریم';
          if (key === 'sashWidth') displayKey = 'عرض لنگه';
          if (key === 'glassThickness') displayKey = 'ضخامت شیشه';
          if (key === 'polyamide') displayKey = 'پلی‌آمید';
          if (key === 'thermalInsulation') displayKey = 'عایق حرارتی';
          if (key === 'soundInsulation') displayKey = 'عایق صوتی';
          
          return (
            <div key={idx} className="flex items-center justify-between p-4 hover:bg-ink-900/50 transition-colors">
              <span className="text-steel-400 text-sm font-vazir">{displayKey}</span>
              <span className="text-white font-medium text-sm font-sans" dir="auto">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
