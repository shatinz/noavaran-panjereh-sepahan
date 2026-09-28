import { MetadataRoute } from 'next';
import servicesData from '@/data/services.json';
import materialsData from '@/data/materials.json';
import projectsData from '@/data/projects.json';
import articlesData from '@/data/articles.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://noavaranpanjereh.com';

  const staticRoutes = [
    '',
    '/services',
    '/materials',
    '/projects',
    '/about',
    '/contact',
    '/calculator',
    '/videos',
    '/articles',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const services = servicesData.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const materials = materialsData.map((m) => ({
    url: `${baseUrl}/materials/${m.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const projects = projectsData.map((p) => ({
    url: `${baseUrl}/projects/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const articles = articlesData.map((a) => ({
    url: `${baseUrl}/articles/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...services, ...materials, ...projects, ...articles];
}
