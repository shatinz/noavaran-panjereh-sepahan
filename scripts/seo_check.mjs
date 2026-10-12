#!/usr/bin/env node
// Technical SEO self-check against a running instance of the site.
//
//   node scripts/seo_check.mjs --base http://127.0.0.1:3000
//   node scripts/seo_check.mjs --base https://noavaranpanjereh.com
//
// Checks: robots.txt (sitemap URL, admin disallowed), sitemap URLs (200, canonical
// matches, title/description present and sane length, h1 count, JSON-LD parses),
// llms.txt links resolve. Exit code 1 if any ERROR was found.

const args = process.argv.slice(2);
const base = (args[args.indexOf('--base') + 1] || 'http://127.0.0.1:3000').replace(/\/$/, '');
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

async function main() {
  console.log(`Checking ${base}\n`);

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
    // check against the instance under test, keep the sitemap's path
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

await main();
console.log('');
warns.forEach((w) => console.log(`WARN  ${w}`));
errors.forEach((e) => console.log(`ERROR ${e}`));
console.log(`\n${errors.length} error(s), ${warns.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
