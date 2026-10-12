#!/usr/bin/env node
// SEO report for the Noavaran site, built from REAL data only:
//   1. Google Search Console (clicks, impressions, CTR, position, queries, pages)
//   2. First-party analytics (data/runtime/analytics.json written by the site)
//
// Usage:
//   node scripts/seo_report.mjs                 # markdown report, last 28 days
//   node scripts/seo_report.mjs --days 90       # longer window
//   node scripts/seo_report.mjs --json          # machine-readable
//   node scripts/seo_report.mjs --site sc-domain:noavaranpanjereh.com
//   node scripts/seo_report.mjs --submit-sitemap   # (re)submit /sitemap.xml
//
// Credentials: GSC_CREDENTIALS_JSON (raw or base64) or ./gsc-credentials.json
// Property:    --site, GSC_SITE_URL, or auto-detected from NEXT_PUBLIC_SITE_URL.
// Exit codes:  0 ok, 2 not configured, 3 no access to Search Console, 1 other error.

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const DAYS = Math.min(Math.max(parseInt(opt('days', '28'), 10) || 28, 7), 480);
const AS_JSON = flag('json');
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.com';
const API = 'https://www.googleapis.com/webmasters/v3';

function loadCreds() {
  const env = process.env.GSC_CREDENTIALS_JSON;
  if (env) {
    const raw = env.trim().startsWith('{') ? env : Buffer.from(env, 'base64').toString('utf8');
    return JSON.parse(raw);
  }
  const file = path.join(root, 'gsc-credentials.json');
  if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8'));
  return null;
}

const b64url = (v) => Buffer.from(v).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

async function token(creds, scope) {
  const uri = creds.token_uri || 'https://oauth2.googleapis.com/token';
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64url(
    JSON.stringify({ iss: creds.client_email, scope, aud: uri, exp: now + 3600, iat: now })
  )}`;
  const sig = b64url(crypto.createSign('RSA-SHA256').update(unsigned).sign(creds.private_key));
  const res = await fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${sig}` }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`auth failed: ${data.error_description || data.error}`);
  return data.access_token;
}

async function gsc(tok, url, body, method) {
  const res = await fetch(url, {
    method: method || (body ? 'POST' : 'GET'),
    headers: { Authorization: `Bearer ${tok}`, ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const e = new Error((await res.json().catch(() => ({})))?.error?.message || `HTTP ${res.status}`);
    e.status = res.status;
    throw e;
  }
  return res.status === 204 ? {} : res.json();
}

const host = (u) => {
  try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; }
};
const usable = (l) => ['siteOwner', 'siteFullUser', 'siteRestrictedUser'].includes(l);
const ymd = (d) => d.toISOString().slice(0, 10);
const n = (v, d = 0) => Number(v).toLocaleString('en-US', { maximumFractionDigits: d, minimumFractionDigits: d });
const pct = (v) => `${(v * 100).toFixed(1)}%`;

function delta(cur, prev, invert = false) {
  if (!prev) return 'n/a';
  const c = ((cur - prev) / prev) * 100;
  const arrow = (invert ? c <= 0 : c >= 0) ? '▲' : '▼';
  return `${arrow} ${c >= 0 ? '+' : ''}${c.toFixed(0)}%`;
}

function firstParty() {
  const file = path.join(root, 'data', 'runtime', 'analytics.json');
  if (!fs.existsSync(file)) return null;
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return null; }
}

async function main() {
  const creds = loadCreds();
  if (!creds) {
    console.error('NOT CONFIGURED: put gsc-credentials.json in the project root or set GSC_CREDENTIALS_JSON.');
    process.exit(2);
  }

  const tok = await token(creds, 'https://www.googleapis.com/auth/webmasters');
  const { siteEntry = [] } = await gsc(tok, `${API}/sites`);
  const wanted = opt('site', process.env.GSC_SITE_URL);
  const h = host(SITE_URL);
  const matching = siteEntry.filter((s) => {
    const sh = s.siteUrl.startsWith('sc-domain:') ? s.siteUrl.slice(10) : host(s.siteUrl);
    return sh === h;
  });
  const chosen = wanted
    ? siteEntry.find((s) => s.siteUrl === wanted) || { siteUrl: wanted, permissionLevel: 'unknown' }
    : matching.filter((s) => usable(s.permissionLevel)).sort((a, b) => b.siteUrl.startsWith('sc-domain:') - a.siteUrl.startsWith('sc-domain:'))[0] || matching[0];

  if (!chosen) {
    console.error(`NO PROPERTY for ${h}. Visible properties: ${siteEntry.map((s) => `${s.siteUrl} (${s.permissionLevel})`).join(', ') || 'none'}`);
    process.exit(3);
  }

  const base = `${API}/sites/${encodeURIComponent(chosen.siteUrl)}`;

  if (flag('submit-sitemap')) {
    const sm = `${SITE_URL.replace(/\/$/, '')}/sitemap.xml`;
    await gsc(tok, `${base}/sitemaps/${encodeURIComponent(sm)}`, undefined, 'PUT');
    console.log(`Submitted sitemap ${sm} to ${chosen.siteUrl}`);
    return;
  }

  const DAY = 86400000;
  const end = new Date(Date.now() - 2 * DAY);
  const start = new Date(end.getTime() - (DAYS - 1) * DAY);
  const pEnd = new Date(start.getTime() - DAY);
  const pStart = new Date(pEnd.getTime() - (DAYS - 1) * DAY);
  const q = (s, e, dimensions, rowLimit) =>
    gsc(tok, `${base}/searchAnalytics/query`, { startDate: ymd(s), endDate: ymd(e), dimensions, rowLimit });

  let data;
  try {
    const [t, pt, queries, pages, devices, qp] = await Promise.all([
      q(start, end, [], 1),
      q(pStart, pEnd, [], 1),
      q(start, end, ['query'], 250),
      q(start, end, ['page'], 250),
      q(start, end, ['device'], 5),
      q(start, end, ['query', 'page'], 500),
    ]);
    data = { t: t.rows?.[0], pt: pt.rows?.[0], queries: queries.rows || [], pages: pages.rows || [], devices: devices.rows || [], qp: qp.rows || [] };
  } catch (e) {
    if (e.status === 403) {
      console.error(
        `NO ACCESS: ${creds.client_email} is only "${chosen.permissionLevel}" on ${chosen.siteUrl}.\n` +
          'Fix: Search Console -> Settings -> Users and permissions -> Add user -> that email as Restricted or Full.'
      );
      process.exit(3);
    }
    throw e;
  }

  const totals = { clicks: data.t?.clicks ?? 0, impressions: data.t?.impressions ?? 0, ctr: data.t?.ctr ?? 0, position: data.t?.position ?? 0 };
  const prev = { clicks: data.pt?.clicks ?? 0, impressions: data.pt?.impressions ?? 0, ctr: data.pt?.ctr ?? 0, position: data.pt?.position ?? 0 };

  // Heuristics Claude Code can act on
  const strikingDistance = data.queries
    .filter((r) => r.position > 3.5 && r.position <= 15 && r.impressions >= 10)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15);
  const lowCtrPages = data.pages
    .filter((r) => r.impressions >= 50 && r.ctr < 0.02)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 10);
  const cannibal = new Map();
  for (const r of data.qp) {
    const [query, page] = r.keys;
    if (!cannibal.has(query)) cannibal.set(query, []);
    cannibal.get(query).push({ page, impressions: r.impressions, position: r.position });
  }
  const cannibalized = [...cannibal.entries()]
    .filter(([, pages]) => pages.length > 1 && pages.reduce((a, p) => a + p.impressions, 0) >= 20)
    .slice(0, 10)
    .map(([query, pages]) => ({ query, pages }));

  const fp = firstParty();
  const report = {
    property: chosen.siteUrl,
    permission: chosen.permissionLevel,
    range: { start: ymd(start), end: ymd(end), days: DAYS },
    totals, previous: prev,
    topQueries: data.queries.slice(0, 20).map((r) => ({ query: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position })),
    topPages: data.pages.slice(0, 20).map((r) => ({ page: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position })),
    devices: data.devices.map((r) => ({ device: r.keys[0], clicks: r.clicks, impressions: r.impressions })),
    opportunities: {
      strikingDistance: strikingDistance.map((r) => ({ query: r.keys[0], impressions: r.impressions, position: r.position, ctr: r.ctr })),
      lowCtrPages: lowCtrPages.map((r) => ({ page: r.keys[0], impressions: r.impressions, ctr: r.ctr, position: r.position })),
      cannibalized,
    },
    firstParty: fp && { since: fp.startedAt, totals: fp.totals, clicks: fp.clicks, topPages: Object.entries(fp.pages || {}).sort((a, b) => b[1].views - a[1].views).slice(0, 10).map(([p, v]) => ({ path: p, views: v.views })) },
  };

  if (AS_JSON) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  const L = [];
  L.push(`# SEO report — ${report.property}`);
  L.push(`Range: ${report.range.start} → ${report.range.end} (${DAYS} days, Search Console data lags ~2 days)\n`);
  L.push('## Headline');
  L.push(`- Clicks: **${n(totals.clicks)}** (${delta(totals.clicks, prev.clicks)})`);
  L.push(`- Impressions: **${n(totals.impressions)}** (${delta(totals.impressions, prev.impressions)})`);
  L.push(`- CTR: **${pct(totals.ctr)}** (${delta(totals.ctr, prev.ctr)})`);
  L.push(`- Avg position: **${totals.position.toFixed(1)}** (${delta(totals.position, prev.position, true)}, lower is better)\n`);

  L.push('## Top queries');
  L.push('| Query | Clicks | Impr. | CTR | Pos |', '|---|---:|---:|---:|---:|');
  report.topQueries.slice(0, 15).forEach((r) => L.push(`| ${r.query} | ${n(r.clicks)} | ${n(r.impressions)} | ${pct(r.ctr)} | ${r.position.toFixed(1)} |`));

  L.push('\n## Top pages');
  L.push('| Page | Clicks | Impr. | CTR | Pos |', '|---|---:|---:|---:|---:|');
  report.topPages.slice(0, 15).forEach((r) => L.push(`| ${decodeURI(r.page).replace(/^https?:\/\/[^/]+/, '') || '/'} | ${n(r.clicks)} | ${n(r.impressions)} | ${pct(r.ctr)} | ${r.position.toFixed(1)} |`));

  L.push('\n## Opportunities (act on these)');
  L.push('### Striking distance — queries ranking 4–15 with impressions (improve title/H1/content, add internal links)');
  report.opportunities.strikingDistance.forEach((r) => L.push(`- "${r.query}" — pos ${r.position.toFixed(1)}, ${n(r.impressions)} impr., CTR ${pct(r.ctr)}`));
  if (!report.opportunities.strikingDistance.length) L.push('- none yet (not enough data)');
  L.push('### Low CTR pages — ≥50 impressions, CTR < 2% (rewrite <title> and meta description)');
  report.opportunities.lowCtrPages.forEach((r) => L.push(`- ${decodeURI(r.page)} — ${n(r.impressions)} impr., CTR ${pct(r.ctr)}, pos ${r.position.toFixed(1)}`));
  if (!report.opportunities.lowCtrPages.length) L.push('- none yet');
  L.push('### Possible cannibalization — one query served by several pages');
  report.opportunities.cannibalized.forEach((c) => L.push(`- "${c.query}": ${c.pages.map((p) => decodeURI(p.page).replace(/^https?:\/\/[^/]+/, '') + ` (pos ${p.position.toFixed(1)})`).join(' vs ')}`));
  if (!report.opportunities.cannibalized.length) L.push('- none detected');

  if (report.firstParty) {
    L.push('\n## First-party analytics (on-site)');
    L.push(`Since ${report.firstParty.since}: ${n(report.firstParty.totals.pageViews)} page views, ${n(report.firstParty.totals.visitors)} visitors, ${n(report.firstParty.totals.clicks)} tracked clicks.`);
    Object.entries(report.firstParty.clicks || {}).forEach(([k, v]) => L.push(`- click:${k} = ${v}`));
  }
  console.log(L.join('\n'));
}

main().catch((e) => {
  console.error('ERROR:', e.message);
  process.exit(1);
});
