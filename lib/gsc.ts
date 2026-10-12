// Google Search Console integration (real search numbers: impressions, clicks,
// CTR, average position, queries, pages).
//
// Auth: Google service account (JWT bearer flow, no extra dependencies).
//   - credentials: env GSC_CREDENTIALS_JSON (raw JSON or base64) or the
//     git-ignored file ./gsc-credentials.json
//   - property:    env GSC_SITE_URL (e.g. "sc-domain:noavaranpanjereh.com" or
//     "https://noavaranpanjereh.com/"). If unset, it is discovered from the
//     properties the service account can see, matching NEXT_PUBLIC_SITE_URL.
//
// IMPORTANT: the service account must be added in Search Console
// (Settings -> Users and permissions) as at least a *Restricted* user. Accounts
// that only show up as "siteUnverifiedUser" get HTTP 403 from the Search
// Analytics API. This module reports that state explicitly instead of failing.
//
// Results are cached (memory + data/runtime/gsc-cache.json) for 30 minutes so
// the dashboard never hammers the API.

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const RUNTIME_DIR = path.join(process.cwd(), 'data', 'runtime');
const CACHE_FILE = path.join(RUNTIME_DIR, 'gsc-cache.json');
const CACHE_TTL_MS = 30 * 60 * 1000;
const API = 'https://www.googleapis.com/webmasters/v3';
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

export interface GscTotals {
  clicks: number;
  impressions: number;
  ctr: number; // 0..1
  position: number;
}

export interface GscRow extends GscTotals {
  key: string;
}

export interface GscSitemap {
  path: string;
  lastDownloaded?: string;
  isPending: boolean;
  errors: number;
  warnings: number;
}

export interface GscSummary {
  property: string;
  startDate: string;
  endDate: string;
  totals: GscTotals;
  previous: GscTotals;
  daily: GscRow[];
  queries: GscRow[];
  pages: GscRow[];
  devices: GscRow[];
  countries: GscRow[];
  sitemaps: GscSitemap[];
  fetchedAt: string;
}

export type GscResult =
  | { status: 'ok'; data: GscSummary; stale?: boolean; staleReason?: string }
  | {
      status: 'not_configured' | 'no_property' | 'no_access' | 'error';
      message: string;
      serviceAccount?: string;
      property?: string;
      candidates?: string[];
    };

interface Credentials {
  client_email: string;
  private_key: string;
  token_uri?: string;
}

function loadCredentials(): Credentials | null {
  try {
    const env = process.env.GSC_CREDENTIALS_JSON;
    if (env) {
      const raw = env.trim().startsWith('{') ? env : Buffer.from(env, 'base64').toString('utf-8');
      return JSON.parse(raw) as Credentials;
    }
    const file = path.join(process.cwd(), 'gsc-credentials.json');
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf-8')) as Credentials;
  } catch (error) {
    console.error('[gsc] could not read credentials:', error);
  }
  return null;
}

const b64url = (input: string | Buffer) =>
  Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

const g = globalThis as unknown as {
  __nvGscToken?: { token: string; exp: number };
  __nvGscMem?: { at: number; result: GscResult };
};

async function getAccessToken(creds: Credentials): Promise<string> {
  if (g.__nvGscToken && g.__nvGscToken.exp > Date.now() + 60_000) return g.__nvGscToken.token;

  const tokenUri = creds.token_uri || 'https://oauth2.googleapis.com/token';
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64url(
    JSON.stringify({ iss: creds.client_email, scope: SCOPE, aud: tokenUri, exp: now + 3600, iat: now })
  )}`;
  const signature = b64url(crypto.createSign('RSA-SHA256').update(unsigned).sign(creds.private_key));

  const res = await fetch(tokenUri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Google auth failed: ${data.error_description || data.error || res.status}`);
  g.__nvGscToken = { token: data.access_token, exp: Date.now() + (data.expires_in || 3600) * 1000 };
  return data.access_token;
}

class GscHttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function gscFetch<T>(token: string, url: string, body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${token}`, ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const j = await res.json();
      message = j?.error?.message || message;
    } catch {
      // ignore
    }
    throw new GscHttpError(res.status, message);
  }
  return (await res.json()) as T;
}

const ok = (level: string) => ['siteOwner', 'siteFullUser', 'siteRestrictedUser'].includes(level);

interface SiteEntry {
  siteUrl: string;
  permissionLevel: string;
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

function pickProperty(sites: SiteEntry[]): { property?: string; candidates: string[]; hasUnverifiedOnly: boolean } {
  const explicit = process.env.GSC_SITE_URL;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.com';
  const host = hostOf(siteUrl);

  if (explicit) {
    const found = sites.find((s) => s.siteUrl === explicit);
    return {
      property: explicit,
      candidates: found ? [found.siteUrl] : [],
      hasUnverifiedOnly: !!found && !ok(found.permissionLevel),
    };
  }

  const matching = sites.filter((s) => {
    const h = s.siteUrl.startsWith('sc-domain:') ? s.siteUrl.slice('sc-domain:'.length) : hostOf(s.siteUrl);
    return h === host || h.replace(/^www\./, '') === host;
  });
  const usable = matching.filter((s) => ok(s.permissionLevel));
  // Prefer the domain property (covers http/https and subdomains)
  usable.sort((a, b) => Number(b.siteUrl.startsWith('sc-domain:')) - Number(a.siteUrl.startsWith('sc-domain:')));

  return {
    property: usable[0]?.siteUrl,
    candidates: matching.map((s) => s.siteUrl),
    hasUnverifiedOnly: matching.length > 0 && usable.length === 0,
  };
}

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

interface ApiRow {
  keys?: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

const toTotals = (r?: ApiRow): GscTotals => ({
  clicks: r?.clicks ?? 0,
  impressions: r?.impressions ?? 0,
  ctr: r?.ctr ?? 0,
  position: r?.position ?? 0,
});

const toRows = (rows?: ApiRow[]): GscRow[] =>
  (rows || []).map((r) => ({ key: r.keys?.[0] ?? '', ...toTotals(r) }));

async function fetchSummary(creds: Credentials, property: string): Promise<GscSummary> {
  const token = await getAccessToken(creds);
  const base = `${API}/sites/${encodeURIComponent(property)}`;

  // Search Console data is final ~2 days behind.
  const DAY = 86_400_000;
  const end = new Date(Date.now() - 2 * DAY);
  const start = new Date(end.getTime() - 27 * DAY);
  const prevEnd = new Date(start.getTime() - DAY);
  const prevStart = new Date(prevEnd.getTime() - 27 * DAY);

  const q = (startDate: Date, endDate: Date, dimensions: string[], rowLimit: number) =>
    gscFetch<{ rows?: ApiRow[] }>(token, `${base}/searchAnalytics/query`, {
      startDate: ymd(startDate),
      endDate: ymd(endDate),
      dimensions,
      rowLimit,
    });

  const [totals, previous, daily, queries, pages, devices, countries, sitemaps] = await Promise.all([
    q(start, end, [], 1),
    q(prevStart, prevEnd, [], 1),
    q(start, end, ['date'], 60),
    q(start, end, ['query'], 25),
    q(start, end, ['page'], 25),
    q(start, end, ['device'], 5),
    q(start, end, ['country'], 8),
    gscFetch<{ sitemap?: Array<Record<string, any>> }>(token, `${base}/sitemaps`).catch(() => ({ sitemap: [] })),
  ]);

  return {
    property,
    startDate: ymd(start),
    endDate: ymd(end),
    totals: toTotals(totals.rows?.[0]),
    previous: toTotals(previous.rows?.[0]),
    daily: toRows(daily.rows).sort((a, b) => a.key.localeCompare(b.key)),
    queries: toRows(queries.rows),
    pages: toRows(pages.rows),
    devices: toRows(devices.rows),
    countries: toRows(countries.rows),
    sitemaps: (sitemaps.sitemap || []).map((s) => ({
      path: String(s.path),
      lastDownloaded: s.lastDownloaded,
      isPending: !!s.isPending,
      errors: Number(s.errors || 0),
      warnings: Number(s.warnings || 0),
    })),
    fetchedAt: new Date().toISOString(),
  };
}

function readDiskCache(): { at: number; result: GscResult } | null {
  try {
    if (fs.existsSync(CACHE_FILE)) return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  } catch {
    // ignore
  }
  return null;
}

function writeDiskCache(entry: { at: number; result: GscResult }) {
  try {
    fs.mkdirSync(RUNTIME_DIR, { recursive: true });
    const tmp = `${CACHE_FILE}.${process.pid}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(entry), 'utf-8');
    fs.renameSync(tmp, CACHE_FILE);
  } catch {
    // read-only filesystem: memory cache still works
  }
}

async function compute(creds: Credentials): Promise<GscResult> {
  const serviceAccount = creds.client_email;
  try {
    const token = await getAccessToken(creds);
    const list = await gscFetch<{ siteEntry?: SiteEntry[] }>(token, `${API}/sites`);
    const { property, candidates, hasUnverifiedOnly } = pickProperty(list.siteEntry || []);

    if (!property) {
      return hasUnverifiedOnly
        ? {
            status: 'no_access',
            serviceAccount,
            candidates,
            message:
              'حساب سرویس فقط به‌عنوان «کاربر تأییدنشده» به پراپرتی دسترسی دارد و گوگل اجازه‌ی خواندن آمار را نمی‌دهد.',
          }
        : {
            status: 'no_property',
            serviceAccount,
            candidates,
            message: 'هیچ پراپرتی Search Console مطابق دامنه‌ی سایت برای این حساب سرویس پیدا نشد.',
          };
    }

    try {
      const data = await fetchSummary(creds, property);
      return { status: 'ok', data };
    } catch (error) {
      if (error instanceof GscHttpError && error.status === 403) {
        return {
          status: 'no_access',
          serviceAccount,
          property,
          candidates,
          message: 'گوگل دسترسی خواندن آمار را برای این حساب سرویس رد کرد (۴۰۳).',
        };
      }
      throw error;
    }
  } catch (error) {
    return {
      status: 'error',
      serviceAccount,
      message: error instanceof Error ? error.message : 'خطای ناشناخته در ارتباط با Search Console',
    };
  }
}

export async function getSearchConsole(options: { force?: boolean } = {}): Promise<GscResult> {
  const creds = loadCredentials();
  if (!creds) {
    return {
      status: 'not_configured',
      message: 'فایل gsc-credentials.json یا متغیر GSC_CREDENTIALS_JSON تنظیم نشده است.',
    };
  }

  const now = Date.now();
  const cached = g.__nvGscMem || readDiskCache();
  if (!options.force && cached && now - cached.at < CACHE_TTL_MS) {
    g.__nvGscMem = cached;
    return cached.result;
  }

  const result = await compute(creds);

  if (result.status === 'ok') {
    const entry = { at: now, result };
    g.__nvGscMem = entry;
    writeDiskCache(entry);
    return result;
  }

  // Keep showing last good data (marked stale) if the API fails temporarily.
  if (cached && cached.result.status === 'ok' && result.status === 'error') {
    return { ...cached.result, stale: true, staleReason: result.message };
  }

  // Cache non-OK states briefly so a misconfiguration isn't re-queried on every refresh.
  g.__nvGscMem = { at: now - CACHE_TTL_MS + 2 * 60 * 1000, result };
  return result;
}
