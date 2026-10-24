import {
  AI_TRANSLATION_MAX_CHARS,
  AI_TRANSLATION_TIMEOUT_MS,
  NINEROUTER_BASE_URL,
  NINEROUTER_MODEL,
} from './ai-config';

export type TranslateLang = 'en' | 'ar';
export type TranslateValue = string | string[];
export type TranslateFields = Record<string, TranslateValue>;
export type TranslateResult = Partial<Record<TranslateLang, TranslateFields>>;

const LANG_NAMES: Record<TranslateLang, string> = { en: 'English', ar: 'Modern Standard Arabic' };

const SYSTEM_PROMPT = `You are a professional translator for the website of "Noavaran Panjereh Sepahan", an Iranian manufacturer of thermal-break aluminium windows, curtain-wall glass facades and railings.
You receive a JSON object of Persian source fields and translate them into the requested target languages.

Rules:
- Reply with ONE JSON object and nothing else (no markdown fences, no commentary).
- The reply has one key per target language code ("en" and/or "ar"). Each value is an object with exactly the same keys as the input and the same value types (string stays string, array of strings stays array of the same length).
- Skip keys whose source value is empty; do not invent content.
- Person names and place names are transliterated naturally (e.g. "مهندس" -> "Eng." / "المهندس", "دکتر" -> "Dr." / "الدكتور", "آقای" -> "Mr." / "السيد"). Building names are translated, not just transliterated (e.g. "ساختمان مسکونی" -> "Residential Building").
- The company name is "Noavaran Panjereh Sepahan" in English and "نوآوران پنجره سباهان" in Arabic.
- Years and dates keep the same Jalali (Persian calendar) values; only the digits change (Western digits for English, Arabic-Indic digits for Arabic). Do not convert to the Gregorian calendar.
- Keep numbers, units, brand names and technical terms (Thermal Break, PVB, EPDM, Low-E, Lamella...) accurate.
- If a value contains HTML, keep every tag, attribute, class and URL exactly as is and translate only the human-readable text.
- Arabic must be written in Arabic script, English in plain professional English.`;

function stripFences(text: string): string {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (fenced) return fenced[1];
  const first = trimmed.indexOf('{');
  const last = trimmed.lastIndexOf('}');
  return first >= 0 && last > first ? trimmed.slice(first, last + 1) : trimmed;
}

function sourceSize(fields: TranslateFields): number {
  return Object.values(fields).reduce<number>(
    (sum, v) => sum + (Array.isArray(v) ? v.join(' ').length : String(v ?? '').length),
    0
  );
}

/** Keeps only the requested keys, with matching value types. */
function sanitize(source: TranslateFields, candidate: unknown): TranslateFields {
  const out: TranslateFields = {};
  if (!candidate || typeof candidate !== 'object') return out;
  const obj = candidate as Record<string, unknown>;
  for (const key of Object.keys(source)) {
    const src = source[key];
    const val = obj[key];
    if (Array.isArray(src)) {
      if (Array.isArray(val)) out[key] = val.map((x) => String(x ?? '').trim()).filter(Boolean);
      else if (typeof val === 'string') out[key] = val.split(/[,\u060c]/).map((x) => x.trim()).filter(Boolean);
    } else if (typeof val === 'string' && val.trim()) {
      out[key] = val.trim();
    } else if (typeof val === 'number') {
      out[key] = String(val);
    }
  }
  return out;
}

export class AiTranslateError extends Error {
  constructor(message: string, public status = 502) {
    super(message);
  }
}

/** Translates Persian fields to English and/or Arabic through the 9router gateway. */
export async function translateWithAI(
  fields: TranslateFields,
  targets: TranslateLang[]
): Promise<TranslateResult> {
  // Drop empty source fields up-front so the model never has to guess about them.
  const source: TranslateFields = {};
  for (const [key, value] of Object.entries(fields)) {
    if (Array.isArray(value)) {
      const items = value.map((v) => String(v ?? '').trim()).filter(Boolean);
      if (items.length) source[key] = items;
    } else if (String(value ?? '').trim()) {
      source[key] = String(value).trim();
    }
  }
  if (Object.keys(source).length === 0) {
    throw new AiTranslateError('هیچ متن فارسی برای ترجمه وارد نشده است.', 400);
  }
  if (sourceSize(source) > AI_TRANSLATION_MAX_CHARS) {
    throw new AiTranslateError('متن برای ترجمه خیلی طولانی است.', 413);
  }

  const apiKey = process.env.NINEROUTER_API_KEY;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AI_TRANSLATION_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${NINEROUTER_BASE_URL.replace(/\/+$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({
        model: NINEROUTER_MODEL,
        stream: false,
        temperature: 0.2,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content:
              `Target languages: ${targets.map((t) => `"${t}" (${LANG_NAMES[t]})`).join(', ')}\n` +
              `Source (Persian) JSON:\n${JSON.stringify(source)}`,
          },
        ],
      }),
      signal: controller.signal,
    });
  } catch (error: any) {
    if (error?.name === 'AbortError') throw new AiTranslateError('پاسخ سرویس ترجمه بیش از حد طول کشید.', 504);
    throw new AiTranslateError('اتصال به 9router برقرار نشد.', 502);
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) {
    let detail = '';
    try {
      detail = (await response.text()).slice(0, 300);
    } catch {
      // ignore
    }
    console.error('[ai-translate] gateway error', response.status, detail);
    throw new AiTranslateError(`سرویس ترجمه خطا برگرداند (${response.status}).`, 502);
  }

  const data: any = await response.json().catch(() => null);
  const content: unknown = data?.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || !content.trim()) {
    throw new AiTranslateError('پاسخ خالی از سرویس ترجمه دریافت شد.', 502);
  }

  let parsed: any;
  try {
    parsed = JSON.parse(stripFences(content));
  } catch {
    console.error('[ai-translate] unparsable reply:', content.slice(0, 300));
    throw new AiTranslateError('پاسخ سرویس ترجمه قابل پردازش نبود.', 502);
  }

  const result: TranslateResult = {};
  for (const lang of targets) {
    result[lang] = sanitize(source, parsed?.[lang]);
  }
  return result;
}
