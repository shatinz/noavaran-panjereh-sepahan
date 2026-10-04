import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentialsPath = path.join(__dirname, '..', 'gsc-credentials.json');

if (!fs.existsSync(credentialsPath)) {
  console.log('[GSC Bot] Credentials file gsc-credentials.json not found. Skipping GSC API operations.');
  process.exit(0);
}

const creds = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

function base64url(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getAccessToken(scopes) {
  const header = JSON.stringify({ alg: 'RS256', typ: 'JWT' });
  const now = Math.floor(Date.now() / 1000);
  const claimSet = JSON.stringify({
    iss: creds.client_email,
    scope: scopes.join(' '),
    aud: creds.token_uri,
    exp: now + 3600,
    iat: now
  });

  const signatureInput = `${base64url(header)}.${base64url(claimSet)}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signatureInput);
  const signature = signer.sign(creds.private_key, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${signatureInput}.${signature}`;

  const res = await fetch(creds.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    }),
    signal: AbortSignal.timeout(10000)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Auth failed: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

async function listSites(token) {
  const res = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(10000)
  });
  if (!res.ok) {
    const err = await res.text();
    console.warn(`[GSC Bot] Error listing sites (${res.status}): ${err}`);
    return [];
  }
  const data = await res.json();
  return data.siteEntry || [];
}

async function submitSitemap(token, siteUrl, sitemapUrl) {
  const encodedSite = encodeURIComponent(siteUrl);
  const encodedSitemap = encodeURIComponent(sitemapUrl);
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/sitemaps/${encodedSitemap}`;
  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(10000)
    });
    if (res.status === 204 || res.ok) {
      console.log(`[GSC Bot] Successfully submitted sitemap ${sitemapUrl} to ${siteUrl}`);
      return true;
    } else {
      const err = await res.text();
      console.warn(`[GSC Bot] Sitemap submission failed for ${siteUrl} (${res.status}): ${err}`);
      return false;
    }
  } catch (e) {
    console.warn(`[GSC Bot] Network error submitting sitemap for ${siteUrl}: ${e.message}`);
    return false;
  }
}

async function notifyIndexing(token, targetUrl, type = 'URL_UPDATED') {
  try {
    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: targetUrl,
        type: type
      }),
      signal: AbortSignal.timeout(10000)
    });
    const data = await res.json();
    if (res.ok) {
      console.log(`[Indexing API] Successfully notified Googlebot for: ${targetUrl}`);
      return true;
    } else {
      console.warn(`[Indexing API] Notice for ${targetUrl} (${res.status}):`, data.error?.message || JSON.stringify(data));
      return false;
    }
  } catch (e) {
    console.warn(`[Indexing API] Network error for ${targetUrl}: ${e.message}`);
    return false;
  }
}

async function querySearchAnalytics(token, siteProperty, startDate, endDate, dimensions, rowLimit = 25) {
  const encodedSite = encodeURIComponent(siteProperty);
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions,
        rowLimit
      }),
      signal: AbortSignal.timeout(10000)
    });
    if (!res.ok) {
      const errText = await res.text();
      console.warn(`[GSC Bot] Search Analytics for ${siteProperty} (${res.status}):`, errText);
      return null;
    }
    return await res.json();
  } catch (e) {
    console.warn(`[GSC Bot] Failed querying Search Analytics:`, e.message);
    return null;
  }
}

async function main() {
  console.log(`[GSC Bot] Authenticating service account: ${creds.client_email}...`);
  
  const scopes = [
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/indexing'
  ];

  let token;
  try {
    token = await getAccessToken(scopes);
    console.log('[GSC Bot] OAuth2 token acquired successfully.');
  } catch (e) {
    console.error('[GSC Bot] Failed to obtain token:', e.message);
    process.exit(1);
  }

  // 1. List sites
  console.log('[GSC Bot] Fetching registered properties...');
  const sites = await listSites(token);
  console.log(`[GSC Bot] Found ${sites.length} registered properties:`);
  sites.forEach(s => console.log(` - ${s.siteUrl} (${s.permissionLevel})`));

  // Target domains for Noavaran Panjereh
  const targetDomains = [
    'https://noavaranpanjereh.com/',
    'sc-domain:noavaranpanjereh.com',
    'https://noavaranpanjereh.vercel.app/',
    'https://noavaran.vercel.app/',
    'sc-domain:noavaranpanjereh.ir',
    'https://noavaranpanjereh.ir/'
  ];

  for (const domain of targetDomains) {
    const matched = sites.find(s => s.siteUrl === domain || s.siteUrl === domain.replace(/\/$/, ''));
    if (matched) {
      console.log(`\n[GSC Bot] Processing verified property: ${domain}`);
      const sitemapUrl = domain.startsWith('http') ? `${domain.replace(/\/$/, '')}/sitemap.xml` : 'https://noavaranpanjereh.vercel.app/sitemap.xml';
      await submitSitemap(token, matched.siteUrl, sitemapUrl);

      // Query Search Analytics
      const now = new Date();
      const past30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const startDate = past30.toISOString().split('T')[0];
      const endDate = now.toISOString().split('T')[0];
      
      const analytics = await querySearchAnalytics(token, matched.siteUrl, startDate, endDate, ['query'], 20);
      if (analytics && analytics.rows) {
        console.log(`[GSC Bot] Top queries for ${matched.siteUrl}:`);
        analytics.rows.forEach(r => console.log(`   * "${r.keys[0]}": ${r.clicks} clicks, ${r.impressions} imp, pos ${r.position.toFixed(1)}`));
        
        const dbDir = path.join(__dirname, '..', 'data', 'db');
        if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
        fs.writeFileSync(path.join(dbDir, 'gsc-analytics.json'), JSON.stringify(analytics, null, 2), 'utf8');
      }
    } else {
      console.log(`\n[GSC Bot] Notice: Property ${domain} is not yet added or pending Owner verification for ${creds.client_email}.`);
    }
  }

  // 2. Ping Indexing API for core URLs
  console.log('\n[Indexing API] Pinging Googlebot for core high-intent landing pages...');
  const coreUrls = [
    'https://noavaranpanjereh.vercel.app/',
    'https://noavaranpanjereh.vercel.app/services',
    'https://noavaranpanjereh.vercel.app/services/curtain-wall',
    'https://noavaranpanjereh.vercel.app/services/thermal-break',
    'https://noavaranpanjereh.vercel.app/services/glass-balcony',
    'https://noavaranpanjereh.vercel.app/services/frameless',
    'https://noavaranpanjereh.vercel.app/calculator',
    'https://noavaranpanjereh.vercel.app/projects',
    'https://noavaranpanjereh.vercel.app/articles',
    'https://noavaranpanjereh.vercel.app/contact'
  ];

  for (const url of coreUrls) {
    await notifyIndexing(token, url);
  }

  console.log('\n[GSC Bot] SEO Automation & Indexing task completed.');
}

main().catch(err => {
  console.error('[GSC Bot] Fatal error:', err);
});
