import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';

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

// Content layout:
//   data/<name>.json                  seed content, tracked in git
//   data/runtime/content/<name>.json  copy written by the admin panel, git-ignored
// Reads prefer the runtime copy, so `git reset --hard` deploys no longer wipe
// admin edits. To push new seed content for a collection that was already
// edited in the panel, delete its runtime copy.
const contentDir = path.join(dataDir, 'runtime', 'content');

function readJsonFile<T>(filename: string, fallback: T): T {
  for (const dir of [contentDir, dataDir]) {
    try {
      const filePath = path.join(dir, filename);
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
      }
    } catch (error) {
      console.error(`Error reading ${filename} from ${dir}:`, error);
    }
  }
  return fallback;
}

// Public pages are statically generated; purge them after content changes so
// admin edits show up without a rebuild (leads are private, so they skip this).
const PRIVATE_FILES = new Set(['consultations.json']);

function writeJsonFile<T>(filename: string, data: T): boolean {
  try {
    fs.mkdirSync(contentDir, { recursive: true });
    const filePath = path.join(contentDir, filename);
    const tmp = `${filePath}.${process.pid}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmp, filePath);
    if (!PRIVATE_FILES.has(filename)) {
      try {
        revalidatePath('/', 'layout');
      } catch {
        // not inside a request context (e.g. a script): nothing to purge
      }
    }
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
}

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
  const data = readJsonFile<ProjectItem[]>('projects.json', []);
  return data;
}

export async function createProject(project: Omit<ProjectItem, 'id'>): Promise<ProjectItem> {
  const list = await getProjects();
  const newItem: ProjectItem = {
    ...project,
    id: `proj-${Date.now()}`
  };
  list.unshift(newItem);
  writeJsonFile('projects.json', list);
  return newItem;
}

export async function updateProject(id: string, updates: Partial<ProjectItem>): Promise<ProjectItem | null> {
  const list = await getProjects();
  const index = list.findIndex(p => p.id === id);
  if (index === -1) return null;
  list[index] = { ...list[index], ...updates };
  writeJsonFile('projects.json', list);
  return list[index];
}

export async function deleteProject(id: string): Promise<boolean> {
  const list = await getProjects();
  const filtered = list.filter(p => p.id !== id);
  if (filtered.length === list.length) return false;
  writeJsonFile('projects.json', filtered);
  return true;
}

// ARTICLES
export async function getArticles(): Promise<ArticleItem[]> {
  const data = readJsonFile<ArticleItem[]>('articles.json', []);
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
  writeJsonFile('articles.json', list);
  return newItem;
}

export async function updateArticle(id: string, updates: Partial<ArticleItem>): Promise<ArticleItem | null> {
  const list = await getArticles();
  const index = list.findIndex(a => a.id === id || a.slug === id);
  if (index === -1) return null;
  list[index] = { ...list[index], ...updates };
  writeJsonFile('articles.json', list);
  return list[index];
}

export async function deleteArticle(id: string): Promise<boolean> {
  const list = await getArticles();
  const filtered = list.filter(a => a.id !== id && a.slug !== id);
  if (filtered.length === list.length) return false;
  writeJsonFile('articles.json', filtered);
  return true;
}

// VIDEOS
export async function getVideos(): Promise<VideoItem[]> {
  const data = readJsonFile<VideoItem[]>('videos.json', []);
  return data;
}

export async function createVideo(video: Omit<VideoItem, 'id'>): Promise<VideoItem> {
  const list = await getVideos();
  const newItem: VideoItem = {
    ...video,
    id: `vid-${Date.now()}`
  };
  list.unshift(newItem);
  writeJsonFile('videos.json', list);
  return newItem;
}

export async function updateVideo(id: string, updates: Partial<VideoItem>): Promise<VideoItem | null> {
  const list = await getVideos();
  const index = list.findIndex(v => v.id === id);
  if (index === -1) return null;
  list[index] = { ...list[index], ...updates };
  writeJsonFile('videos.json', list);
  return list[index];
}

export async function deleteVideo(id: string): Promise<boolean> {
  const list = await getVideos();
  const filtered = list.filter(v => v.id !== id);
  if (filtered.length === list.length) return false;
  writeJsonFile('videos.json', filtered);
  return true;
}

// SETTINGS
export async function getSettings(): Promise<CompanySettings> {
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
    email: "info@noavaranpanjereh.com",
    officeAddress: "اصفهان، خیابان محتشم کاشانی، روبروی پست بانک مرکزی، ساختمان نوید، طبقه ۶",
    officeAddressEn: "6th Floor, Navid Building, Opposite Central Post Bank, Mohtasham Kashani St, Isfahan, Iran",
    factoryAddress: "اصفهان، خیابان امام خمینی، خیابان بسیج، کوچه ورزشگاه، بن‌بست قربانی، پلاک ۵۰",
    factoryAddressEn: "No. 50, Ghorbani Dead-end, Varzeshgah Alley, Basij St, Imam Khomeini St, Isfahan, Iran",
    workingHours: "شنبه تا چهارشنبه: ۸:۰۰ الی ۱۷:۰۰ | پنج‌شنبه‌ها: ۸:۰۰ الی ۱۳:۰۰",
    socialLinks: {
      instagram: "https://instagram.com/noavaran_panjereh_sepahan",
      telegram: "https://t.me/noavaranpanjereh",
      whatsapp: "https://wa.me/989139090673",
      aparat: "https://aparat.com/noavaranpanjereh",
      linkedin: "https://linkedin.com/company/noavaranpanjereh"
    }
  };
  const data = readJsonFile<CompanySettings>('settings.json', fallback);
  return data;
}

export async function updateSettings(updates: Partial<CompanySettings>): Promise<CompanySettings> {
  const current = await getSettings();
  const updated = { ...current, ...updates };
  writeJsonFile('settings.json', updated);
  return updated;
}

// MATERIALS

export async function getMaterials(): Promise<MaterialItem[]> {
  const data = readJsonFile<MaterialItem[]>('materials.json', []);
  return data;
}

export async function getMaterialById(id: string): Promise<MaterialItem | null> {
  const list = await getMaterials();
  return list.find(m => m.id === id || m.code.toLowerCase() === id.toLowerCase()) || null;
}

export async function createMaterial(material: Omit<MaterialItem, 'id'> & { id?: string }): Promise<MaterialItem> {
  const list = await getMaterials();
  const generatedId = material.id || (material.code ? material.code.toLowerCase().replace(/[^a-z0-9]/g, '') : `mat-${Date.now()}`);
  const newItem: MaterialItem = {
    ...material,
    id: generatedId,
  };
  list.unshift(newItem);
  writeJsonFile('materials.json', list);
  return newItem;
}

export async function updateMaterial(id: string, updates: Partial<MaterialItem>): Promise<MaterialItem | null> {
  const list = await getMaterials();
  const index = list.findIndex(m => m.id === id || m.code.toLowerCase() === id.toLowerCase());
  if (index === -1) return null;
  list[index] = { ...list[index], ...updates };
  writeJsonFile('materials.json', list);
  return list[index];
}

export async function deleteMaterial(id: string): Promise<boolean> {
  const list = await getMaterials();
  const filtered = list.filter(m => m.id !== id && m.code.toLowerCase() !== id.toLowerCase());
  if (filtered.length === list.length) return false;
  writeJsonFile('materials.json', filtered);
  return true;
}

// ADMIN CREDENTIALS
// Stored hashed (scrypt) in data/runtime/ which is git-ignored, so deploys
// (`git reset --hard`) never reset or leak the password.
//
// Default seed password is 'noavaran2026' with mustChangePassword: true.
// The admin must change both username and password upon first login.
// ADMIN_PASSWORD environment variable may optionally override the initial seed value.
export interface AdminCredentials {
  username: string;
  passwordHash: string;
  mustChangePassword?: boolean;
  updatedAt?: number;
}

const runtimeDir = path.join(dataDir, 'runtime');
const adminAuthFile = path.join(runtimeDir, 'admin_auth.json');
const DEFAULT_ADMIN_PASSWORD = 'noavaran2026';

function hashPassword(password: string, saltHex?: string): string {
  const salt = saltHex ? Buffer.from(saltHex, 'hex') : crypto.randomBytes(16);
  const derived = crypto.scryptSync(password, salt, 32);
  return `scrypt$${salt.toString('hex')}$${derived.toString('hex')}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [scheme, saltHex, hashHex] = stored.split('$');
  if (scheme !== 'scrypt' || !saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, 'hex');
  const actual = Buffer.from(hashPassword(password, saltHex).split('$')[2], 'hex');
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

function safeEqualStrings(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

function readStoredCredentials(): AdminCredentials | null {
  try {
    if (fs.existsSync(adminAuthFile)) {
      const parsed = JSON.parse(fs.readFileSync(adminAuthFile, 'utf-8')) as Partial<AdminCredentials>;
      if (parsed.username && parsed.passwordHash) {
        return {
          username: parsed.username,
          passwordHash: parsed.passwordHash,
          mustChangePassword: Boolean(parsed.mustChangePassword),
          updatedAt: typeof parsed.updatedAt === 'number' ? parsed.updatedAt : undefined,
        };
      }
    }
  } catch (error) {
    console.error('Error reading admin credentials:', error);
  }
  return null;
}

export async function getAdminCredentials(): Promise<AdminCredentials> {
  const stored = readStoredCredentials();
  if (stored) return stored;

  const envPassword = process.env.ADMIN_PASSWORD;
  const seedPassword = envPassword && envPassword.length >= 8 ? envPassword : DEFAULT_ADMIN_PASSWORD;

  // First run with no stored credentials: seed default credentials with mustChangePassword: true.
  const creds: AdminCredentials = {
    username: process.env.ADMIN_USERNAME || 'admin',
    passwordHash: hashPassword(seedPassword),
    mustChangePassword: true,
    updatedAt: Date.now(),
  };

  try {
    fs.mkdirSync(runtimeDir, { recursive: true });
    const tmp = `${adminAuthFile}.${process.pid}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(creds, null, 2), { encoding: 'utf-8', mode: 0o600 });
    fs.renameSync(tmp, adminAuthFile);
    return creds;
  } catch (error: any) {
    if (error?.code === 'EEXIST') return readStoredCredentials() || creds;
    console.error('[admin] Could not persist seed credentials:', error);
    return creds;
  }
}

export async function verifyAdminLogin(username: string, password: string): Promise<boolean> {
  const creds = await getAdminCredentials();
  const userOk = safeEqualStrings(String(username || ''), creds.username);
  const passOk = verifyPassword(String(password || ''), creds.passwordHash);
  return userOk && passOk;
}

export async function updateAdminCredentials(updates: { username?: string; password?: string }): Promise<{ username: string }> {
  const current = await getAdminCredentials();
  const updated: AdminCredentials = {
    username: updates.username?.trim() || current.username,
    passwordHash: updates.password?.trim() ? hashPassword(updates.password.trim()) : current.passwordHash,
    mustChangePassword: false,
    updatedAt: Date.now(),
  };
  fs.mkdirSync(runtimeDir, { recursive: true });
  const tmp = `${adminAuthFile}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(updated, null, 2), { encoding: 'utf-8', mode: 0o600 });
  fs.renameSync(tmp, adminAuthFile);
  return { username: updated.username };
}

// CONSULTATION REQUESTS
export interface ConsultationItem {
  id: string;
  name: string;
  phone: string;
  projectType: string;
  message?: string;
  status: 'new' | 'contacted' | 'archived';
  createdAt: string;
}


export async function getConsultations(): Promise<ConsultationItem[]> {
  const data = readJsonFile<ConsultationItem[]>('consultations.json', []);
  return data;
}

export async function createConsultation(item: Omit<ConsultationItem, 'id' | 'createdAt' | 'status'>): Promise<ConsultationItem> {
  const list = await getConsultations();
  const newItem: ConsultationItem = {
    ...item,
    id: `lead-${Date.now()}`,
    status: 'new',
    createdAt: new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date()),
  };
  const updated = [newItem, ...list];
  writeJsonFile('consultations.json', updated);
  return newItem;
}

export async function updateConsultation(id: string, updates: Partial<ConsultationItem>): Promise<ConsultationItem | null> {
  const list = await getConsultations();
  const index = list.findIndex(c => c.id === id);
  if (index === -1) return null;
  const updatedItem = { ...list[index], ...updates };
  list[index] = updatedItem;
  writeJsonFile('consultations.json', list);
  return updatedItem;
}

export async function deleteConsultation(id: string): Promise<boolean> {
  const list = await getConsultations();
  const filtered = list.filter(c => c.id !== id);
  if (filtered.length === list.length) return false;
  writeJsonFile('consultations.json', filtered);
  return true;
}
