import fs from 'fs';
import path from 'path';
import { MetadataRoute } from 'next';
import { getServices, getMaterials, getProjects, getArticles } from '@/lib/db';

// Content lives in the DB layer (admin edits included); the sitemap must read
// it from there instead of importing the seed JSON files at build time.
export const dynamic = 'force-dynamic';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.com';

// Last modification time of a content collection (runtime copy wins over seed).
function contentMtime(filename: string): Date {
  const dataDir = path.join(process.cwd(), 'data');
  for (const dir of [path.join(dataDir, 'runtime', 'content'), dataDir]) {
    try {
      return fs.statSync(path.join(dir, filename)).mtime;
    } catch {
      // try next location
    }
  }
  return new Date('2026-01-01T00:00:00Z');
}

// "۱۴۰۳/۰۴/۱۵" (Jalali) -> Date
function jalaliToDate(value: string): Date | null {
  const digits = value.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
  const m = digits.match(/(\d{4})\D(\d{1,2})\D(\d{1,2})/);
  if (!m) return null;
  const jy = Number(m[1]) - 979;
  const jm = Number(m[2]) - 1;
  const jd = Number(m[3]) - 1;
  const jDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  let jDayNo = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4);
  for (let i = 0; i < jm; i++) jDayNo += jDaysInMonth[i];
  jDayNo += jd;
  let gDayNo = jDayNo + 79;
  let gy = 1600 + 400 * Math.floor(gDayNo / 146097);
  gDayNo %= 146097;
  let leap = true;
  if (gDayNo >= 36525) {
    gDayNo--;
    gy += 100 * Math.floor(gDayNo / 36524);
    gDayNo %= 36524;
    if (gDayNo >= 365) gDayNo++;
    else leap = false;
  }
  gy += 4 * Math.floor(gDayNo / 1461);
  gDayNo %= 1461;
  if (gDayNo >= 366) {
    leap = false;
    gDayNo--;
    gy += Math.floor(gDayNo / 365);
    gDayNo %= 365;
  }
  const gDaysInMonth = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let gm = 0;
  while (gm < 12 && gDayNo >= gDaysInMonth[gm]) {
    gDayNo -= gDaysInMonth[gm];
    gm++;
  }
  const date = new Date(Date.UTC(gy, gm, gDayNo + 1));
  return Number.isNaN(date.getTime()) ? null : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, materials, projects, articles] = await Promise.all([
    getServices(),
    getMaterials(),
    getProjects(),
    getArticles(),
  ]);

  const mtimes = {
    services: contentMtime('services.json'),
    materials: contentMtime('materials.json'),
    projects: contentMtime('projects.json'),
    articles: contentMtime('articles.json'),
  };
  const latest = new Date(Math.max(...Object.values(mtimes).map((d) => d.getTime())));

  const core: Array<{ route: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; lastModified: Date }> = [
    { route: '', priority: 1.0, changeFrequency: 'weekly', lastModified: latest },
    { route: '/services', priority: 0.9, changeFrequency: 'monthly', lastModified: mtimes.services },
    { route: '/materials', priority: 0.9, changeFrequency: 'monthly', lastModified: mtimes.materials },
    { route: '/projects', priority: 0.9, changeFrequency: 'weekly', lastModified: mtimes.projects },
    { route: '/articles', priority: 0.8, changeFrequency: 'weekly', lastModified: mtimes.articles },
    { route: '/videos', priority: 0.8, changeFrequency: 'monthly', lastModified: contentMtime('videos.json') },
    { route: '/about', priority: 0.8, changeFrequency: 'yearly', lastModified: contentMtime('settings.json') },
    { route: '/contact', priority: 0.85, changeFrequency: 'yearly', lastModified: contentMtime('settings.json') },
  ];

  return [
    ...core.map((c) => ({
      url: `${baseUrl}${c.route}`,
      lastModified: c.lastModified,
      changeFrequency: c.changeFrequency,
      priority: c.priority,
    })),
    ...services.map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: mtimes.services,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    ...materials.map((m) => ({
      url: `${baseUrl}/materials/${m.id}`,
      lastModified: mtimes.materials,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...projects.map((p) => ({
      url: `${baseUrl}/projects/${p.id}`,
      lastModified: mtimes.projects,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    ...articles.map((a) => ({
      url: `${baseUrl}/articles/${a.slug}`,
      lastModified: jalaliToDate(a.date) || mtimes.articles,
      changeFrequency: 'yearly' as const,
      priority: 0.75,
    })),
  ];
}
