import { NextResponse } from 'next/server';
import {
  classifySource,
  detectDevice,
  isBot,
  normalizeLabel,
  normalizePath,
  recordClick,
  recordPageView,
} from '@/lib/analytics-store';

export const dynamic = 'force-dynamic';

// Very small in-memory rate limiter so one client cannot inflate the numbers.
const g = globalThis as unknown as { __nvTrackHits?: Map<string, { n: number; reset: number }> };
const hits = (g.__nvTrackHits ||= new Map());
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 60;

function allowed(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    if (hits.size > 5000) {
      hits.forEach((v, k) => {
        if (v.reset < now) hits.delete(k);
      });
    }
    hits.set(ip, { n: 1, reset: now + WINDOW_MS });
    return true;
  }
  entry.n += 1;
  return entry.n <= MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  try {
    const ua = request.headers.get('user-agent');
    if (isBot(ua)) return NextResponse.json({ ok: true, ignored: 'bot' });

    const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
    if (!allowed(ip)) return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });

    const body = await request.json();
    const type = body?.type === 'click' ? 'click' : 'pageview';

    if (type === 'click') {
      const label = normalizeLabel(body.label);
      if (!label) return NextResponse.json({ ok: true, ignored: 'bad_label' });
      await recordClick(label);
      return NextResponse.json({ ok: true });
    }

    const pagePath = normalizePath(body.path);
    if (!pagePath) return NextResponse.json({ ok: true, ignored: 'path' });

    const ownHost = request.headers.get('host')?.split(':')[0] || null;
    const newSession = body.newSession === true;

    await recordPageView({
      path: pagePath,
      title: typeof body.title === 'string' ? body.title : undefined,
      device: detectDevice(ua || ''),
      newVisitor: body.newVisitor === true,
      newToday: body.newToday === true,
      newSession,
      source: newSession ? classifySource(body.referrer, ownHost) : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
