import { NextResponse } from 'next/server';
import { AI_TRANSLATION_ENABLED } from '@/lib/ai-config';
import { AiTranslateError, TranslateFields, TranslateLang, translateWithAI } from '@/lib/ai-translate';

// Never prerender: this handler talks to the 9router gateway on every request.
export const dynamic = 'force-dynamic';

// Reachable only with an admin session (see middleware.ts: /api/admin/*).

export async function GET() {
  return NextResponse.json({ enabled: AI_TRANSLATION_ENABLED });
}

export async function POST(request: Request) {
  if (!AI_TRANSLATION_ENABLED) {
    return NextResponse.json({ error: 'ترجمه با هوش مصنوعی غیرفعال است.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const rawFields = body?.fields;
    if (!rawFields || typeof rawFields !== 'object' || Array.isArray(rawFields)) {
      return NextResponse.json({ error: 'fields الزامی است.' }, { status: 400 });
    }

    const fields: TranslateFields = {};
    for (const [key, value] of Object.entries(rawFields as Record<string, unknown>)) {
      if (Array.isArray(value)) fields[key] = value.map((v) => String(v ?? ''));
      else if (typeof value === 'string' || typeof value === 'number') fields[key] = String(value);
    }

    const requested: unknown[] = Array.isArray(body?.targets) ? body.targets : ['en', 'ar'];
    const targets = requested.filter((t): t is TranslateLang => t === 'en' || t === 'ar');
    if (targets.length === 0) {
      return NextResponse.json({ error: 'targets نامعتبر است.' }, { status: 400 });
    }

    const translations = await translateWithAI(fields, targets);
    return NextResponse.json({ translations });
  } catch (error) {
    if (error instanceof AiTranslateError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error('[ai-translate] unexpected error:', error);
    return NextResponse.json({ error: 'خطا در ترجمه خودکار.' }, { status: 500 });
  }
}
