import { MetadataRoute } from 'next';
import servicesData from '@/data/services.json';
import materialsData from '@/data/materials.json';
import projectsData from '@/data/projects.json';
import articlesData from '@/data/articles.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noavaranpanjereh.vercel.app';
  const now = new Date();

  const coreRoutes: Array<{ route: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { route: '', priority: 1.0, changeFrequency: 'daily' },
    { route: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/materials', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/projects', priority: 0.9, changeFrequency: 'weekly' },
    { route: '/calculator', priority: 0.85, changeFrequency: 'weekly' },
    { route: '/articles', priority: 0.8, changeFrequency: 'weekly' },
    { route: '/videos', priority: 0.8, changeFrequency: 'weekly' },
    { route: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { route: '/contact', priority: 0.85, changeFrequency: 'monthly' },
  ];

  const staticPages: MetadataRoute.Sitemap = coreRoutes.map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: now,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  const services: MetadataRoute.Sitemap = servicesData.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const materials: MetadataRoute.Sitemap = materialsData.map((m) => ({
    url: `${baseUrl}/materials/${m.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const projects: MetadataRoute.Sitemap = projectsData.map((p) => ({
    url: `${baseUrl}/projects/${p.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const articles: MetadataRoute.Sitemap = articlesData.map((a) => ({
    url: `${baseUrl}/articles/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticPages, ...services, ...materials, ...projects, ...articles];
}
