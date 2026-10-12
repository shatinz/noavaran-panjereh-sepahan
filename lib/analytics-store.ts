// First-party analytics store (real data only).
//
// - Source of truth is a JSON file in data/runtime/ which is git-ignored, so
//   `git reset --hard` during CI/CD deploys can no longer overwrite live stats.
// - Every operation re-reads the file: Next.js bundles route handlers and
//   server components separately, so a module-level cache would go stale.
// - Writes are serialized with a process-wide promise chain and are atomic
//   (tmp file + rename).
// - No IPs or user agents are stored. Unique visitors are counted from a
//   client-side "first time seen" flag, so there is no visitor list on disk.

import fs from 'fs';
import path from 'path';

const RUNTIME_DIR = path.join(process.cwd(), 'data', 'runtime');
const STORE_FILE = path.join(RUNTIME_DIR, 'analytics.json');

const TZ = 'Asia/Tehran';
const KEEP_DAYS = 120;
const MAX_PAGES = 300;
const MAX_CLICK_LABELS = 60;
const MAX_SOURCES = 60;

export interface DayStats {
  pageViews: number;
  visitors: number; // visitors seen for the first time that day
  sessions: number;
  clicks: number;
}

export interface AnalyticsData {
  version: 2;
  startedAt: string;
  totals: { pageViews: number; visitors: number; sessions: number; clicks: number };
  days: Record<string, DayStats>;
  pages: Record<string, { views: number; title: string; lastViewed: string }>;
  sources: Record<string, number>;
  devices: { mobile: number; desktop: number; tablet: number };
  clicks: Record<string, number>;
}

export type DeviceType = 'mobile' | 'desktop' | 'tablet';

function emptyData(): AnalyticsData {
  return {
    version: 2,
    startedAt: new Date().toISOString(),
    totals: { pageViews: 0, visitors: 0, sessions: 0, clicks: 0 },
    days: {},
    pages: {},
    sources: {},
    devices: { mobile: 0, desktop: 0, tablet: 0 },
    clicks: {},
  };
}

function emptyDay(): DayStats {
  return { pageViews: 0, visitors: 0, sessions: 0, clicks: 0 };
}

export function dayKey(date: Date = new Date()): string {
  // en-CA gives YYYY-MM-DD
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(date);
}

function load(): AnalyticsData {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(STORE_FILE, 'utf-8')) as AnalyticsData;
      if (parsed && parsed.version === 2) return parsed;
    }
  } catch (error) {
    console.error('[analytics] failed to read store, starting fresh:', error);
  }
  return emptyData();
}

function save(data: AnalyticsData): boolean {
  try {
    fs.mkdirSync(RUNTIME_DIR, { recursive: true });
    const tmp = `${STORE_FILE}.${process.pid}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(data), 'utf-8');
    fs.renameSync(tmp, STORE_FILE);
    return true;
  } catch (error) {
    // e.g. read-only filesystem on serverless hosting
    console.error('[analytics] failed to persist store:', error);
    return false;
  }
}

function prune(data: AnalyticsData) {
  const keys = Object.keys(data.days).sort();
  if (keys.length > KEEP_DAYS) {
    for (const k of keys.slice(0, keys.length - KEEP_DAYS)) delete data.days[k];
  }
}

// Serialize all mutations in this process (shared across bundles via globalThis).
const g = globalThis as unknown as { __nvAnalyticsLock?: Promise<unknown> };

function withLock<T>(fn: () => T): Promise<T> {
  const prev = g.__nvAnalyticsLock || Promise.resolve();
  const next = prev.then(fn, fn);
  g.__nvAnalyticsLock = next.catch(() => undefined);
  return next;
}

// ---------------------------------------------------------------------------
// Input helpers
// ---------------------------------------------------------------------------

const BOT_RE =
  /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|headless|lighthouse|pagespeed|pingdom|uptime|monitor|curl|wget|python-requests|httpclient|axios|node-fetch|go-http/i;

export function isBot(userAgent: string | null | undefined): boolean {
  if (!userAgent) return true;
  return BOT_RE.test(userAgent);
}

export function detectDevice(userAgent: string): DeviceType {
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|playbook|silk/.test(ua) || (/android/.test(ua) && !/mobile/.test(ua))) return 'tablet';
  if (/mobi|iphone|ipod|android|windows phone/.test(ua)) return 'mobile';
  return 'desktop';
}

export function normalizePath(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  let p = raw.split('#')[0].split('?')[0].trim();
  if (!p.startsWith('/')) return null;
  if (p.length > 1) p = p.replace(/\/+$/, '');
  if (p.length > 120) return null;
  if (!/^\/[A-Za-z0-9\-._~%/\u0600-\u06FF]*$/.test(p)) return null;
  if (p.startsWith('/admin') || p.startsWith('/api') || p.startsWith('/_next')) return null;
  return p || '/';
}

export function normalizeLabel(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const label = raw.trim().toLowerCase();
  return /^[a-z0-9_:.\-]{1,40}$/.test(label) ? label : null;
}

const SEARCH_HOSTS = /(^|\.)(google|bing|yahoo|duckduckgo|yandex|ecosia|baidu)\./i;
const SOCIAL_HOSTS =
  /(^|\.)(instagram|facebook|t\.co|twitter|x\.com|linkedin|telegram|t\.me|eitaa|rubika|bale|wa\.me|whatsapp|aparat|youtube|pinterest)\b/i;

export function classifySource(referrer: unknown, ownHost: string | null): string {
  if (typeof referrer !== 'string' || !referrer) return 'direct';
  let host = '';
  try {
    host = new URL(referrer).hostname.replace(/^www\./, '');
  } catch {
    return 'direct';
  }
  if (!host) return 'direct';
  if (ownHost && (host === ownHost || host === ownHost.replace(/^www\./, ''))) return 'direct';
  if (SEARCH_HOSTS.test(host)) return 'search';
  if (SOCIAL_HOSTS.test(host)) return 'social';
  return `referral:${host.slice(0, 60)}`;
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export interface PageViewInput {
  path: string;
  title?: string;
  device: DeviceType;
  source?: string; // only provided for the first page of a session
  newVisitor?: boolean; // first time this browser is seen, ever
  newToday?: boolean; // first time this browser is seen today
  newSession?: boolean;
}

export function recordPageView(input: PageViewInput): Promise<boolean> {
  return withLock(() => {
    const data = load();
    const today = dayKey();
    const day = (data.days[today] ||= emptyDay());

    data.totals.pageViews += 1;
    day.pageViews += 1;
    data.devices[input.device] += 1;

    if (input.newVisitor) data.totals.visitors += 1;
    if (input.newVisitor || input.newToday) day.visitors += 1;

    if (input.newSession) {
      data.totals.sessions += 1;
      day.sessions += 1;
      if (input.source && (data.sources[input.source] !== undefined || Object.keys(data.sources).length < MAX_SOURCES)) {
        data.sources[input.source] = (data.sources[input.source] || 0) + 1;
      }
    }

    const existing = data.pages[input.path];
    if (existing) {
      existing.views += 1;
      existing.lastViewed = new Date().toISOString();
      if (input.title) existing.title = input.title.slice(0, 160);
    } else if (Object.keys(data.pages).length < MAX_PAGES) {
      data.pages[input.path] = {
        views: 1,
        title: (input.title || input.path).slice(0, 160),
        lastViewed: new Date().toISOString(),
      };
    }

    prune(data);
    return save(data);
  });
}

export function recordClick(label: string): Promise<boolean> {
  return withLock(() => {
    const data = load();
    if (data.clicks[label] === undefined && Object.keys(data.clicks).length >= MAX_CLICK_LABELS) {
      return false;
    }
    const day = (data.days[dayKey()] ||= emptyDay());
    data.totals.clicks += 1;
    day.clicks += 1;
    data.clicks[label] = (data.clicks[label] || 0) + 1;
    prune(data);
    return save(data);
  });
}

// ---------------------------------------------------------------------------
// Read model for the admin dashboard
// ---------------------------------------------------------------------------

export interface AnalyticsSummary {
  startedAt: string;
  hasData: boolean;
  totals: AnalyticsData['totals'];
  today: DayStats;
  last7: { pageViews: number; visitors: number };
  prev7: { pageViews: number; visitors: number };
  daily: { date: string; pageViews: number; visitors: number; clicks: number }[];
  topPages: { path: string; title: string; views: number }[];
  devices: { mobile: number; desktop: number; tablet: number; total: number };
  sources: { key: string; label: string; sessions: number }[];
  clicks: { label: string; count: number }[];
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const data = load();
  const now = new Date();
  const DAY = 24 * 60 * 60 * 1000;

  const daily: AnalyticsSummary['daily'] = [];
  for (let i = 13; i >= 0; i--) {
    const key = dayKey(new Date(now.getTime() - i * DAY));
    const d = data.days[key] || emptyDay();
    daily.push({ date: key, pageViews: d.pageViews, visitors: d.visitors, clicks: d.clicks });
  }

  const sum = (from: number, to: number) => {
    let pageViews = 0;
    let visitors = 0;
    for (let i = from; i < to; i++) {
      const d = data.days[dayKey(new Date(now.getTime() - i * DAY))];
      if (d) {
        pageViews += d.pageViews;
        visitors += d.visitors;
      }
    }
    return { pageViews, visitors };
  };

  const devTotal = data.devices.mobile + data.devices.desktop + data.devices.tablet;

  return {
    startedAt: data.startedAt,
    hasData: data.totals.pageViews > 0 || data.totals.clicks > 0,
    totals: data.totals,
    today: data.days[dayKey(now)] || emptyDay(),
    last7: sum(0, 7),
    prev7: sum(7, 14),
    daily,
    topPages: Object.entries(data.pages)
      .map(([p, v]) => ({ path: p, title: v.title, views: v.views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10),
    devices: { ...data.devices, total: devTotal },
    sources: Object.entries(data.sources)
      .map(([key, sessions]) => ({
        key,
        sessions,
        label:
          key === 'direct'
            ? 'ورود مستقیم'
            : key === 'search'
              ? 'موتورهای جستجو (گوگل و ...)'
              : key === 'social'
                ? 'شبکه‌های اجتماعی و پیام‌رسان‌ها'
                : key.replace(/^referral:/, ''),
      }))
      .sort((a, b) => b.sessions - a.sessions)
      .slice(0, 8),
    clicks: Object.entries(data.clicks)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count),
  };
}
