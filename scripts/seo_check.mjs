#!/usr/bin/env node
// Technical SEO & Performance self-check against a running instance of the site.
//
//   node scripts/seo_check.mjs --base http://127.0.0.1:3000
//   node scripts/seo_check.mjs --base https://noavaranpanjereh.com
//   node scripts/seo_check.mjs --base http://127.0.0.1:3111 --perf
//   node scripts/seo_check.mjs --base http://127.0.0.1:3111 --perf --lighthouse
//
// Checks: robots.txt (sitemap URL, admin disallowed), sitemap URLs (200, canonical
// matches, title/description present and sane length, h1 count, JSON-LD parses),
// llms.txt links resolve.
// Optional flags:
//   --perf: viewport meta, unoptimized preloads, icon sizes <= 20 KB, font @import,
//           static asset Cache-Control >= 30 days, HTML wire size/cf-cache-status,
//           responsive image srcset sizes.
//   --lighthouse: runs mobile Lighthouse audit and asserts thresholds
//                 (perf >= 85, LCP <= 2.5s, CLS <= 0.1, TBT <= 200ms, target-size pass).
// Exit code 1 if any ERROR was found.

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const args = process.argv.slice(2);
const base = (args[args.indexOf('--base') + 1] || 'http://127.0.0.1:3000').replace(/\/$/, '');
const isPerf = args.includes('--perf');
const isLighthouse = args.includes('--lighthouse');

const errors = [];
const warns = [];
const err = (m) => errors.push(m);
const warn = (m) => warns.push(m);

async function get(url) {
  try {
    const res = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
    return { status: res.status, text: await res.text(), headers: res.headers };
  } catch (e) {
    return { status: 0, text: '', error: e.message };
  }
}

const tag = (html, re) => (html.match(re) || [])[1]?.trim();
const origin = (u) => { try { return new URL(u).origin; } catch { return ''; } };

async function checkTechnicalSeo() {
  console.log(`Checking technical SEO on ${base}\n`);

  // robots.txt
  const robots = await get(`${base}/robots.txt`);
  if (robots.status !== 200) err(`robots.txt -> HTTP ${robots.status}`);
  else {
    const sm = (robots.text.match(/^Sitemap:\s*(\S+)/im) || [])[1];
    if (!sm) err('robots.txt has no Sitemap: line');
    else if (/vercel\.app/.test(sm)) err(`robots.txt points to a retired domain: ${sm}`);
    if (!/Disallow:\s*\/admin/i.test(robots.text)) err('robots.txt does not disallow /admin');
    console.log(`robots.txt ok (sitemap: ${sm})`);
  }

  // sitemap
  const sitemap = await get(`${base}/sitemap.xml`);
  if (sitemap.status !== 200) {
    err(`sitemap.xml -> HTTP ${sitemap.status}`);
    return;
  }
  const locs = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  console.log(`sitemap.xml: ${locs.length} URLs`);
  if (new Set(locs).size !== locs.length) err('sitemap.xml contains duplicate URLs');
  const sitemapOrigin = origin(locs[0] || '');

  const seenTitles = new Map();
  for (const loc of locs) {
    const pathOnly = loc.replace(/^https?:\/\/[^/]+/, '') || '/';
    const r = await get(`${base}${pathOnly}`);
    if (r.status !== 200) {
      err(`${pathOnly} -> HTTP ${r.status}`);
      continue;
    }
    const html = r.text;
    const title = tag(html, /<title[^>]*>([^<]*)<\/title>/i);
    const desc = tag(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i) || tag(html, /<meta[^>]+content="([^"]*)"[^>]+name="description"/i);
    const canonical = tag(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i) || tag(html, /<link[^>]+href="([^"]*)"[^>]+rel="canonical"/i);
    const h1s = (html.match(/<h1[\s>]/gi) || []).length;
    const noindex = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html);

    if (noindex) err(`${pathOnly} is in the sitemap but has noindex`);
    if (!title) err(`${pathOnly}: missing <title>`);
    else {
      if (title.length > 75) warn(`${pathOnly}: title is ${title.length} chars (may be truncated)`);
      if (seenTitles.has(title)) warn(`${pathOnly}: same <title> as ${seenTitles.get(title)}`);
      seenTitles.set(title, pathOnly);
    }
    if (!desc) err(`${pathOnly}: missing meta description`);
    else if (desc.length < 70 || desc.length > 170) warn(`${pathOnly}: description is ${desc.length} chars`);
    if (!canonical) err(`${pathOnly}: missing canonical`);
    else {
      const expected = loc.replace(/\/$/, '');
      if (canonical.replace(/\/$/, '') !== expected) err(`${pathOnly}: canonical ${canonical} != sitemap URL ${loc}`);
    }
    if (h1s !== 1) warn(`${pathOnly}: ${h1s} <h1> elements`);

    for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      try { JSON.parse(m[1]); } catch { err(`${pathOnly}: invalid JSON-LD`); }
    }
  }

  // llms.txt
  const llms = await get(`${base}/llms.txt`);
  if (llms.status === 200) {
    const links = [...llms.text.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => m[1]);
    for (const link of links) {
      if (/vercel\.app/.test(link)) err(`llms.txt links to retired domain: ${link}`);
      const pathOnly = link.replace(/^https?:\/\/[^/]+/, '') || '/';
      const r = await get(`${base}${pathOnly}`);
      if (r.status !== 200) err(`llms.txt link ${pathOnly} -> HTTP ${r.status}`);
    }
    console.log(`llms.txt: ${links.length} links checked`);
  } else warn(`llms.txt -> HTTP ${llms.status}`);

  if (sitemapOrigin && origin(base) !== sitemapOrigin && !/127\.0\.0\.1|localhost/.test(base)) {
    warn(`sitemap origin ${sitemapOrigin} differs from checked base ${origin(base)} (check NEXT_PUBLIC_SITE_URL)`);
  }
}

async function checkPerformance() {
  console.log(`\nChecking Performance & Mobile factors on ${base}...\n`);
  const r = await get(`${base}/`);
  if (r.status !== 200) {
    err(`Performance: root page / -> HTTP ${r.status}`);
    return;
  }
  const html = r.text;
  const headers = r.headers;

  // 1. exactly one viewport meta
  const viewportMatches = html.match(/<meta[^>]+name=["']viewport["'][^>]*>/gi) || [];
  if (viewportMatches.length === 0) {
    err('Performance: missing <meta name="viewport"> tag');
  } else if (viewportMatches.length > 1) {
    err(`Performance: duplicate <meta name="viewport"> tags (${viewportMatches.length} found)`);
  } else {
    console.log('Performance: exactly one viewport meta found [OK]');
  }

  // 2. <link rel=preload as=image> for raw /images/*.png (non /_next/image) = ERROR
  const preloads = [...html.matchAll(/<link[^>]+rel=["']preload["'][^>]*>/gi)].map((m) => m[0]);
  for (const pl of preloads) {
    if (/as=["']image["']/i.test(pl)) {
      const href = (pl.match(/href=["']([^"']+)["']/i) || [])[1];
      if (href && /\/images\/[^\s"']+\.png/i.test(href) && !href.includes('/_next/image')) {
        err(`Performance: preload for unoptimized raw image: ${href}`);
      }
    }
  }

  // 3. favicon/icon files > 20 KB = ERROR
  const iconLinks = [...html.matchAll(/<link[^>]+rel=["'](?:icon|apple-touch-icon|shortcut icon)["'][^>]*>/gi)].map((m) => m[0]);
  const iconHrefs = new Set();
  for (const l of iconLinks) {
    const href = (l.match(/href=["']([^"']+)["']/i) || [])[1];
    if (href) iconHrefs.add(href);
  }
  // Also check standard /favicon.ico
  iconHrefs.add('/favicon.ico');

  for (const iconHref of iconHrefs) {
    const fullUrl = iconHref.startsWith('http') ? iconHref : `${base}${iconHref.startsWith('/') ? '' : '/'}${iconHref}`;
    try {
      const iconRes = await fetch(fullUrl, { signal: AbortSignal.timeout(10000) });
      if (iconRes.status === 200) {
        const buf = await iconRes.arrayBuffer();
        const size = buf.byteLength;
        const sizeKb = (size / 1024).toFixed(1);
        if (size > 20 * 1024) {
          err(`Performance: icon ${iconHref} is ${sizeKb} KB (> 20 KB)`);
        } else {
          console.log(`Performance: icon ${iconHref} is ${sizeKb} KB [OK]`);
        }
      }
    } catch (e) {
      warn(`Performance: could not fetch icon ${iconHref}: ${e.message}`);
    }
  }

  // 4. @import url(https://fonts.googleapis present in served CSS = WARN
  const styleSheets = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+)["']/gi)].map((m) => m[1]);
  let hasGoogleFontsImport = /@import\s+(?:url\(['"]?)?https:\/\/fonts\.googleapis\.com/i.test(html);
  for (const ss of styleSheets) {
    const fullCssUrl = ss.startsWith('http') ? ss : `${base}${ss.startsWith('/') ? '' : '/'}${ss}`;
    try {
      const cssRes = await fetch(fullCssUrl, { signal: AbortSignal.timeout(10000) });
      const cssText = await cssRes.text();
      if (/@import\s+(?:url\(['"]?)?https:\/\/fonts\.googleapis\.com/i.test(cssText)) {
        hasGoogleFontsImport = true;
        break;
      }
    } catch {}
  }
  if (hasGoogleFontsImport) {
    warn('Performance: CSS @import from fonts.googleapis.com detected (render-blocking font chain)');
  } else {
    console.log('Performance: no CSS @import from Google Fonts [OK]');
  }

  // 5. Cache-Control of a sample of /images/* and /projects/* assets < 30 days = WARN
  const sampleAssets = ['/images/logo.png', '/images/logo-header.webp', '/projects/proj-1.webp'];
  for (const asset of sampleAssets) {
    try {
      const assetRes = await fetch(`${base}${asset}`, { method: 'HEAD', signal: AbortSignal.timeout(10000) });
      if (assetRes.status === 200) {
        const cc = assetRes.headers.get('cache-control') || '';
        const maxAgeMatch = cc.match(/max-age=(\d+)/i);
        const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : 0;
        if (maxAge < 2592000) {
          warn(`Performance: ${asset} Cache-Control max-age is ${maxAge}s (< 30 days / 2592000s; cc="${cc}")`);
        } else {
          console.log(`Performance: ${asset} Cache-Control max-age=${maxAge}s (>= 30 days) [OK]`);
        }
      }
    } catch {}
  }

  // 6. HTML Content-Encoding/size on the wire and cf-cache-status
  const contentEncoding = headers.get('content-encoding') || 'none';
  const cfCacheStatus = headers.get('cf-cache-status') || '';
  const server = headers.get('server') || '';
  const wireSize = headers.get('content-length') || Buffer.byteLength(html, 'utf8');
  console.log(`Performance: HTML wire transfer: ~${(wireSize / 1024).toFixed(1)} KB, encoding: ${contentEncoding}${cfCacheStatus ? `, cf-cache-status: ${cfCacheStatus}` : ''}`);
  if (/cloudflare/i.test(server) || cfCacheStatus) {
    if (cfCacheStatus.toUpperCase() === 'DYNAMIC') {
      warn('Performance: cf-cache-status is DYNAMIC on Cloudflare host (HTML not edge-cached; consider Cloudflare Cache Rule)');
    }
  }

  // 7. <img>/next-image srcset without sizes for large images = WARN
  const imgTags = [...html.matchAll(/<img[^>]+>/gi)].map((m) => m[0]);
  for (const img of imgTags) {
    const hasSrcset = /srcset=/i.test(img);
    const hasSizes = /sizes=/i.test(img);
    const src = (img.match(/src=["']([^"']+)["']/i) || [])[1] || '';
    if (hasSrcset && !hasSizes) {
      const srcset = (img.match(/srcset=["']([^"']+)["']/i) || [])[1] || '';
      if (/(\d+w.*){2,}/.test(srcset) || srcset.includes('1080w') || srcset.includes('1920w')) {
        warn(`Performance: <img> with large srcset missing 'sizes' attribute: ${src}`);
      }
    }
  }
}

async function runLighthouseAudit() {
  console.log(`\nRunning Mobile Lighthouse audit against ${base}...`);
  const chromePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const outDir = path.resolve('.claudeweb/perf');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const urlObj = new URL(base);
  const host = urlObj.hostname.replace(/[^a-z0-9]/gi, '_');
  const port = urlObj.port ? `_${urlObj.port}` : '';
  const outPath = path.join(outDir, `lh-${host}${port}-mobile.json`);

  const cmd = 'npx';
  const lighthouseArgs = [
    '--yes',
    'lighthouse',
    base,
    '--form-factor=mobile',
    '--only-categories=performance,accessibility',
    '--output=json',
    `--output-path=${outPath}`,
    '--chrome-flags=--headless=new --no-sandbox',
    '--quiet',
  ];

  const env = { ...process.env, CHROME_PATH: chromePath };

  try {
    execFileSync(cmd, lighthouseArgs, {
      env,
      stdio: ['pipe', 'pipe', 'inherit'],
      shell: true,
      maxBuffer: 50 * 1024 * 1024,
      timeout: 180000,
    });
  } catch (e) {
    if (!fs.existsSync(outPath)) {
      err(`Lighthouse audit execution failed: ${e.message}`);
      return;
    }
  }

  if (!fs.existsSync(outPath)) {
    err(`Lighthouse output JSON not found at ${outPath}`);
    return;
  }

  const rawJson = fs.readFileSync(outPath, 'utf8');
  const lh = JSON.parse(rawJson);
  const perfScore = Math.round((lh.categories?.performance?.score ?? 0) * 100);
  const a11yScore = Math.round((lh.categories?.accessibility?.score ?? 0) * 100);
  const lcpSec = ((lh.audits?.['largest-contentful-paint']?.numericValue ?? 0) / 1000).toFixed(2);
  const cls = (lh.audits?.['cumulative-layout-shift']?.numericValue ?? 0).toFixed(3);
  const tbtMs = Math.round(lh.audits?.['total-blocking-time']?.numericValue ?? 0);
  const targetSizeScore = lh.audits?.['target-size']?.score;

  console.log(`\nLighthouse Mobile Summary (${base}):`);
  console.log(`  Performance:   ${perfScore} / 100 (threshold: >= 85)`);
  console.log(`  Accessibility: ${a11yScore} / 100`);
  console.log(`  LCP:           ${lcpSec} s (threshold: <= 2.5 s)`);
  console.log(`  CLS:           ${cls} (threshold: <= 0.1)`);
  console.log(`  TBT:           ${tbtMs} ms (threshold: <= 200 ms)`);
  console.log(`  Target Size:   ${targetSizeScore === 1 ? 'PASS' : targetSizeScore === 0 ? 'FAIL' : 'N/A'}`);
  console.log(`  Report saved:  ${outPath}`);

  if (perfScore < 85) err(`Lighthouse: Performance score ${perfScore} < 85`);
  if (parseFloat(lcpSec) > 2.5) err(`Lighthouse: LCP ${lcpSec} s > 2.5 s`);
  if (parseFloat(cls) > 0.1) err(`Lighthouse: CLS ${cls} > 0.1`);
  if (tbtMs > 200) err(`Lighthouse: TBT ${tbtMs} ms > 200 ms`);
  if (targetSizeScore === 0) err('Lighthouse: Touch target size check (target-size) failed');
}

async function main() {
  await checkTechnicalSeo();
  if (isPerf) {
    await checkPerformance();
  }
  if (isLighthouse) {
    await runLighthouseAudit();
  }
}

await main();
console.log('');
warns.forEach((w) => console.log(`WARN  ${w}`));
errors.forEach((e) => console.log(`ERROR ${e}`));
console.log(`\n${errors.length} error(s), ${warns.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
