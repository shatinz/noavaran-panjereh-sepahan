const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBasePath(path?: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path;
  if (BASE_PATH && path.startsWith(BASE_PATH)) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
}

export const ServiceImageMap: Record<string, string> = {
  "aluminum-windows-doors": "/projects/proj-31.webp",
  "curtain-wall-lamella": "/projects/proj-47.webp",
  "curtain-wall": "/projects/proj-47.webp",
  "frameless-facade": "/projects/proj-44.webp",
  "glass-balcony": "/projects/proj-12.webp",
  "composite-facade": "/projects/proj-3.webp",
  "steel-glass-railings": "/projects/proj-5.webp",
};

export const ArticleImageMap: Record<string, string> = {
  // Add mapping if needed, or fallback
};

export function getLocalMediaFallback(idOrSlug: string, type: 'service' | 'article' | 'video' | 'project' | 'material'): string {
  if (type === 'service') return withBasePath(ServiceImageMap[idOrSlug] || "/projects/proj-1.webp");
  if (type === 'article') return withBasePath(ArticleImageMap[idOrSlug] || "/projects/proj-2.webp");
  if (type === 'project') return withBasePath(`/projects/${idOrSlug}.webp`); // Project images match IDs
  return withBasePath("/projects/proj-1.webp");
}
