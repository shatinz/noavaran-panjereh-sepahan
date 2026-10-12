---
name: noavaran-seo
description: SEO work on the Noavaran Panjereh Sepahan site (Next.js, Persian/RTL) using REAL data. Use for anything about SEO, rankings, impressions/clicks/CTR/position, Search Console, keywords, titles/meta descriptions, sitemap, robots, canonical, structured data, llms.txt, indexing problems, or the admin dashboard's analytics/SEO panels.
---

# Noavaran SEO (real-data workflow)

The business: aluminium thermal-break windows, curtain-wall and glass facades, Isfahan, Iran.
Language of the site and of searchers: **Persian (fa-IR, RTL)**. Production domain: `https://noavaranpanjereh.com`
(`NEXT_PUBLIC_SITE_URL`). The old `*.vercel.app` deployments were deleted: never reference, ping or submit them.

## Golden rules
1. **Only report numbers that came from a tool run in this session.** If Search Console is not reachable, say so and
   give the fix; never estimate impressions/clicks/positions. (The admin dashboard once showed seeded fake numbers.)
2. **Never print, log or commit secrets**: `gsc-credentials.json` (service-account private key), `.env*`, session secret.
   `client_email` is fine to show.
3. Search Console data lags ~2 days and needs weeks to show effects. Don't judge a change after a few days.
4. Do not use the Indexing API for normal pages (Google only supports it for JobPosting/BroadcastEvent). Submit the
   sitemap instead: `node scripts/seo_report.mjs --submit-sitemap`.
5. Never change a URL/slug without adding a 301 redirect. Never keyword-stuff; write for Persian readers first.

## Where the real numbers come from
| Need | How |
|---|---|
| Google clicks, impressions, CTR, avg. position, queries, pages | `node scripts/seo_report.mjs` (add `--days 90`, `--json`) |
| Same inside the admin UI | `/admin` -> "آمار واقعی سئو از گوگل" panel (`lib/gsc.ts`, `components/admin/SeoPanel.tsx`) |
| On-site visits, unique visitors, sessions, devices, sources, link clicks (phone/WhatsApp/...) | `/admin` -> first-party panel; raw file `data/runtime/analytics.json` (`lib/analytics-store.ts`) |
| Technical health of a running instance | `node scripts/seo_check.mjs --base <url>` |

`seo_report.mjs` exit codes: `0` ok · `2` no credentials · `3` no Search Console access · `1` other error.

### Known blocker (check first)
The Google service account (see `client_email` in `gsc-credentials.json`) must be added in Search Console
(Settings -> Users and permissions) as **Restricted or Full** user on `sc-domain:noavaranpanjereh.com`.
As an *unverified user* the API answers 403 and no numbers are available. Only the property owner can grant this.
Optionally pin the property with `GSC_SITE_URL`. On the server, `gsc-credentials.json` lives in the project root
(git-ignored, survives `git reset --hard` deploys) or is supplied via `GSC_CREDENTIALS_JSON`.

## How to run an SEO analysis
1. `node scripts/seo_report.mjs --json` (if exit 3/2: report the blocker and stop the data-driven part).
2. Read `opportunities`:
   - **strikingDistance** (position 4-15, impressions): improve `<title>`, H1, intro copy, internal links for that query.
   - **lowCtrPages** (>=50 impressions, CTR < 2%): rewrite title + meta description to match the query intent.
   - **cannibalized**: one query served by several pages -> consolidate or differentiate; set clear canonical/internal links.
3. Cross-check with first-party data: pages with many impressions but few on-site views/clicks indicate a snippet or
   landing-page problem; click events (`phone_call`, `whatsapp`, `contact_form`) show conversion.
4. Map findings to files (below), implement, then run `npx tsc --noEmit`, build, and `seo_check.mjs`.
5. Summarise with before/after metrics and tell the user when to re-check (2-4 weeks).

## Where SEO lives in the code
- `app/layout.tsx` — `generateMetadata` (site-wide title template, OG, verification) + Organization/WebSite JSON-LD.
- `app/<page>/page.tsx`, `app/<section>/[slug]/page.tsx` — per-page metadata, **canonical**, BreadcrumbList and
  Service/Product/BlogPosting/VideoObject/ItemList JSON-LD (already present on all public pages).
- `app/sitemap.ts` (reads content through `lib/db.ts`; lastModified from content files / article dates),
  `app/robots.ts` (do NOT add `public/robots.txt`, it shadows this file), `public/llms.txt` + `public/llms-full.txt`
  (links must be real: service slugs come from `data/services.json`).
- Content: seed `data/*.json`; admin edits are written to `data/runtime/content/*.json` (wins over the seed) and call
  `revalidatePath` so static pages refresh. Persian dates in articles (`۱۴۰۳/۰۴/۱۵`) are converted in `sitemap.ts`.
- `/logo-motion` is intentionally `noindex` and not in the sitemap.

## Quick technical checks
```bash
npx tsc --noEmit && npx next build
node scripts/seo_check.mjs --base http://127.0.0.1:3000   # after `next start`
```
Fix every ERROR it prints (missing/wrong canonical, noindex in sitemap, dead llms.txt links, retired domain, bad JSON-LD).

## Reference
General Google Search Central / GEO knowledge (robots, sitemaps, canonicals, JS SEO, structured data, Core Web Vitals):
`reference/google-seo-guidelines.md` in this skill folder — read it when a task needs those details.
