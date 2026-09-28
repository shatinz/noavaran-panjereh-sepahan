import React from "react";

export function SteelPanel({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-metal-brushed metal-shadow rounded-lg text-ink-950 overflow-hidden relative ${className}`}>
      {/* Light sheen overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
      {children}
    </div>
  );
}
