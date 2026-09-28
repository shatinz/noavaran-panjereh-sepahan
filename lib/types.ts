export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  summary?: string;
  icon?: string;
  image?: string;
  features?: string[];
  subcategories?: { name: string; description: string }[];
  technicalSpecs?: Record<string, string>;
}

export interface MaterialItem {
  id: string;
  category: string;
  title: string;
  description: string;
  image?: string;
  gallery?: string[];
  features?: string[];
  specs?: Record<string, string>;
  colors?: string[];
  videoUrl?: string;
  videoQr?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  year?: string;
  description?: string;
  image?: string;
  gallery?: string[];
  materials?: string[];
}

export interface ArticleItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  author?: string;
  image?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  url: string;
  thumbnail?: string;
  duration?: string;
}

export interface SettingsData {
  companyName: string;
  companyNameEn: string;
  brandSubtitle: string;
  brandSubtitleEn: string;
  establishedYear: number;
  factoryArea: string;
  nationalId: string;
  registrationNumber: string;
  postalCode: string;
  phone: string;
  phoneLabel: string;
  directPhones: string[];
  factoryPhones: string[];
  mobile: string;
  secondaryMobile: string;
  whatsapp: string;
  telegram: string;
  email: string;
  officialCompanyAddress: string;
  officialCompanyAddressEn: string;
  officeAddress: string;
  officeAddressEn: string;
  factoryAddress: string;
  factoryAddressEn: string;
  workingHours: string;
  socialLinks: Record<string, string>;
}
