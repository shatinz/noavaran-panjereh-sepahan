import fs from 'fs';
import path from 'path';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  summary: string;
  icon: string;
  image: string;
  features: string[];
  subcategories: { name: string; description: string }[];
  technicalSpecs: Record<string, string>;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  client: string;
  location: string;
  image: string;
  description: string;
  year: string;
  systemsUsed: string[];
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  tags: string[];
  content: string;
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  platform: 'aparat' | 'youtube' | 'direct';
  videoUrl: string;
  videoId?: string;
  duration?: string;
  thumbnail?: string;
  description: string;
  qrUrl?: string;
  qrImage?: string;
}

export interface MaterialItem {
  id: string;
  code: string;
  title: string;
  titleEn: string;
  category: string;
  categoryKey: 'thermal_hinged' | 'thermal_sliding' | 'normal_systems' | 'additional_systems';
  isThermalBreak: boolean;
  summary: string;
  image: string;
  qrImage: string;
  qrUrl: string;
  videoUrl: string;
  videoTitle: string;
  videoDuration: string;
  specs: {
    frameWidth: string;
    sashWidth: string;
    wallThickness: string;
    polyamideSize: string;
    glassThickness: string;
    thermalUf: string;
    appearance: string;
    cornerFixture: string;
    gaskets: string;
    hardware: string;
    openings: string;
  };
  features: string[];
}

export interface CompanySettings {
  companyName: string;
  companyNameEn: string;
  brandSubtitle: string;
  brandSubtitleEn: string;
  establishedYear: number;
  factoryArea: string;
  nationalId?: string;
  registrationNumber?: string;
  postalCode?: string;
  officialCompanyAddress?: string;
  officialCompanyAddressEn?: string;
  phone: string;
  phoneLabel: string;
  directPhones: string[];
  factoryPhones: string[];
  mobile: string;
  secondaryMobile?: string;
  whatsapp: string;
  telegram: string;
  email: string;
  officeAddress: string;
  officeAddressEn: string;
  factoryAddress: string;
  factoryAddressEn: string;
  workingHours: string;
  socialLinks: {
    instagram: string;
    telegram: string;
    whatsapp: string;
    aparat: string;
    linkedin: string;
  };
}

const dataDir = path.join(process.cwd(), 'data');

function readJsonFile<T>(filename: string, fallback: T): T {
  try {
    const filePath = path.join(dataDir, filename);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw) as T;
    }
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
  }
  return fallback;
}

function writeJsonFile<T>(filename: string, data: T): boolean {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
}

// In-memory cache for Vercel read-only serverless environments
let memoryArticles: ArticleItem[] | null = null;
let memoryProjects: ProjectItem[] | null = null;
let memoryVideos: VideoItem[] | null = null;
let memorySettings: CompanySettings | null = null;

// SERVICES
export async function getServices(): Promise<ServiceItem[]> {
  return readJsonFile<ServiceItem[]>('services.json', []);
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const services = await getServices();
  return services.find(s => s.slug === slug) || null;
}

// PROJECTS
export async function getProjects(): Promise<ProjectItem[]> {
  if (memoryProjects) return memoryProjects;
  const data = readJsonFile<ProjectItem[]>('projects.json', []);
  memoryProjects = data;
  return data;
}

export async function createProject(project: Omit<ProjectItem, 'id'>): Promise<ProjectItem> {
  const list = await getProjects();
  const newItem: ProjectItem = {
    ...project,
    id: `proj-${Date.now()}`
  };
  list.unshift(newItem);
  memoryProjects = list;
  writeJsonFile('projects.json', list);
  return newItem;
}

export async function updateProject(id: string, updates: Partial<ProjectItem>): Promise<ProjectItem | null> {
  const list = await getProjects();
  const index = list.findIndex(p => p.id === id);
  if (index === -1) return null;
  list[index] = { ...list[index], ...updates };
  memoryProjects = list;
  writeJsonFile('projects.json', list);
  return list[index];
}

export async function deleteProject(id: string): Promise<boolean> {
  const list = await getProjects();
  const filtered = list.filter(p => p.id !== id);
  if (filtered.length === list.length) return false;
  memoryProjects = filtered;
  writeJsonFile('projects.json', filtered);
  return true;
}

// ARTICLES
export async function getArticles(): Promise<ArticleItem[]> {
  if (memoryArticles) return memoryArticles;
  const data = readJsonFile<ArticleItem[]>('articles.json', []);
  memoryArticles = data;
  return data;
}

export async function getArticleBySlug(slug: string): Promise<ArticleItem | null> {
  const list = await getArticles();
  return list.find(a => a.slug === slug || a.id === slug) || null;
}

export async function createArticle(article: Omit<ArticleItem, 'id'>): Promise<ArticleItem> {
  const list = await getArticles();
  const newItem: ArticleItem = {
    ...article,
    id: `art-${Date.now()}`
  };
  list.unshift(newItem);
  memoryArticles = list;
  writeJsonFile('articles.json', list);
  return newItem;
}

export async function updateArticle(id: string, updates: Partial<ArticleItem>): Promise<ArticleItem | null> {
  const list = await getArticles();
  const index = list.findIndex(a => a.id === id || a.slug === id);
  if (index === -1) return null;
  list[index] = { ...list[index], ...updates };
  memoryArticles = list;
  writeJsonFile('articles.json', list);
  return list[index];
}

export async function deleteArticle(id: string): Promise<boolean> {
  const list = await getArticles();
  const filtered = list.filter(a => a.id !== id && a.slug !== id);
  if (filtered.length === list.length) return false;
  memoryArticles = filtered;
  writeJsonFile('articles.json', filtered);
  return true;
}

// VIDEOS
export async function getVideos(): Promise<VideoItem[]> {
  if (memoryVideos) return memoryVideos;
  const data = readJsonFile<VideoItem[]>('videos.json', []);
  memoryVideos = data;
  return data;
}

export async function createVideo(video: Omit<VideoItem, 'id'>): Promise<VideoItem> {
  const list = await getVideos();
  const newItem: VideoItem = {
    ...video,
    id: `vid-${Date.now()}`
  };
  list.unshift(newItem);
  memoryVideos = list;
  writeJsonFile('videos.json', list);
  return newItem;
}

export async function updateVideo(id: string, updates: Partial<VideoItem>): Promise<VideoItem | null> {
  const list = await getVideos();
  const index = list.findIndex(v => v.id === id);
  if (index === -1) return null;
  list[index] = { ...list[index], ...updates };
  memoryVideos = list;
  writeJsonFile('videos.json', list);
  return list[index];
}

export async function deleteVideo(id: string): Promise<boolean> {
  const list = await getVideos();
  const filtered = list.filter(v => v.id !== id);
  if (filtered.length === list.length) return false;
  memoryVideos = filtered;
  writeJsonFile('videos.json', filtered);
  return true;
}

// SETTINGS
export async function getSettings(): Promise<CompanySettings> {
  if (memorySettings) return memorySettings;
  const fallback: CompanySettings = {
    companyName: "نوآوران پنجره سپاهان",
    companyNameEn: "Noavaran Panjereh Sepahan",
    brandSubtitle: "طراحی، مهندسی محاسبات و تولید صنعتی نماهای مدرن شیشه‌ای و پنجره‌های دوجداره ترمال‌بریک",
    brandSubtitleEn: "Engineering, Manufacturing & Execution of Modern Architectural Facades & Thermal Break Windows",
    establishedYear: 1385,
    factoryArea: "۱۵۰۰ مترمربع",
    phone: "031-4144",
    phoneLabel: "خط ۴ رقمی: ۴۱۴۴-۰۳۱",
    directPhones: ["031-31313160", "031-31313150"],
    factoryPhones: ["031-33687561", "031-33687566"],
    mobile: "09139090673",
    whatsapp: "09139090673",
    telegram: "noavaranpanjereh",
    email: "info@noavaranpanjereh.ir",
    officeAddress: "اصفهان، خیابان محتشم کاشانی، روبروی پست بانک مرکزی، ساختمان نوید، طبقه ۶",
    officeAddressEn: "6th Floor, Navid Building, Opposite Central Post Bank, Mohtasham Kashani St, Isfahan, Iran",
    factoryAddress: "اصفهان، خیابان امام خمینی، خیابان بسیج، کوچه ورزشگاه، بن‌بست قربانی، پلاک ۵۰",
    factoryAddressEn: "No. 50, Ghorbani Dead-end, Varzeshgah Alley, Basij St, Imam Khomeini St, Isfahan, Iran",
    workingHours: "شنبه تا چهارشنبه: ۸:۰۰ الی ۱۷:۰۰ | پنج‌شنبه‌ها: ۸:۰۰ الی ۱۳:۰۰",
    socialLinks: {
      instagram: "https://instagram.com/noavaran.panjereh",
      telegram: "https://t.me/noavaranpanjereh",
      whatsapp: "https://wa.me/989139090673",
      aparat: "https://aparat.com/noavaranpanjereh",
      linkedin: "https://linkedin.com/company/noavaranpanjereh"
    }
  };
  const data = readJsonFile<CompanySettings>('settings.json', fallback);
  memorySettings = data;
  return data;
}

export async function updateSettings(updates: Partial<CompanySettings>): Promise<CompanySettings> {
  const current = await getSettings();
  const updated = { ...current, ...updates };
  memorySettings = updated;
  writeJsonFile('settings.json', updated);
  return updated;
}

// MATERIALS
let memoryMaterials: MaterialItem[] | null = null;

export async function getMaterials(): Promise<MaterialItem[]> {
  if (memoryMaterials) return memoryMaterials;
  const data = readJsonFile<MaterialItem[]>('materials.json', []);
  memoryMaterials = data;
  return data;
}

export async function getMaterialById(id: string): Promise<MaterialItem | null> {
  const list = await getMaterials();
  return list.find(m => m.id === id || m.code.toLowerCase() === id.toLowerCase()) || null;
}

