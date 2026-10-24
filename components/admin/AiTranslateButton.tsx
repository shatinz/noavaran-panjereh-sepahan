'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export type AiTranslations = Partial<Record<'en' | 'ar', Record<string, string | string[]>>>;

interface AiTranslateButtonProps {
  /** Returns the Persian source fields to translate (keys are echoed back in the result). */
  getFields: () => Record<string, string | string[]>;
  /** Receives the translated fields per language. */
  onResult: (translations: AiTranslations) => void;
  className?: string;
}

/**
 * "Translate with AI" button. It renders nothing while AI_TRANSLATION_ENABLED is false in
 * lib/ai-config.ts, so the feature stays invisible until it is switched on in the code base.
 */
export default function AiTranslateButton({ getFields, onResult, className = '' }: AiTranslateButtonProps) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetch('/api/admin/translate')
      .then((res) => (res.ok ? res.json() : { enabled: false }))
      .then((data) => {
        if (!cancelled) setEnabled(Boolean(data?.enabled));
      })
      .catch(() => {
        if (!cancelled) setEnabled(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!enabled) return null;

  const handleClick = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: getFields(), targets: ['en', 'ar'] }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || 'خطا در ترجمه خودکار');
        return;
      }
      onResult(data.translations || {});
    } catch {
      setError('ارتباط با سرور ترجمه برقرار نشد');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        title="فقط فیلدهای خالی انگلیسی و عربی با ترجمه خودکار پر می‌شوند"
        className="px-3 py-1.5 rounded-lg bg-bronze-500/10 hover:bg-bronze-500/20 border border-bronze-500/30 text-bronze-400 hover:text-bronze-300 text-[11px] font-bold flex items-center gap-1.5 transition-colors disabled:opacity-60"
      >
        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
        <span>{loading ? 'در حال ترجمه...' : 'ترجمه با هوش مصنوعی (EN + AR)'}</span>
      </button>
      {error && <span className="text-[11px] text-rose-400">{error}</span>}
    </div>
  );
}
