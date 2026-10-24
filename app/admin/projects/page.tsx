'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/AdminNav';
import { ProjectItem, CategoryItem } from '@/lib/db';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, FolderTree, Layers, Calendar, Building2, HardHat } from 'lucide-react';
import ImageUploadField from '@/components/admin/ImageUploadField';
import MultiImageUpload from '@/components/admin/MultiImageUpload';
import CategoryManagerModal from '@/components/admin/CategoryManagerModal';
import AiTranslateButton, { AiTranslations } from '@/components/admin/AiTranslateButton';
import { lookupProjectText } from '@/lib/i18n/project-dictionary';
import { SYSTEM_TAG_TRANSLATIONS, formatLocalizedYear } from '@/lib/i18n/entities';

const splitList = (value: string) => value.split(',').map((s) => s.trim()).filter(Boolean);

// Per-language fields edited in the "translations" panel (English / Arabic).
const emptyTranslations = {
  locationEn: '',
  locationAr: '',
  descriptionEn: '',
  descriptionAr: '',
  yearEn: '',
  yearAr: '',
  systemsUsedEn: '',
  systemsUsedAr: '',
};

type LangCode = 'en' | 'ar';
const LANG_PANELS: { code: LangCode; label: string; dir: 'ltr' | 'rtl'; suffix: 'En' | 'Ar' }[] = [
  { code: 'en', label: 'English', dir: 'ltr', suffix: 'En' },
  { code: 'ar', label: 'العربية', dir: 'rtl', suffix: 'Ar' },
];

// English / Arabic text for a project's systems, but only when every tag is known.
function translateSystems(systems: string[] | undefined, locale: LangCode): string {
  if (!systems || systems.length === 0) return '';
  const out: string[] = [];
  for (const sys of systems) {
    const hit = SYSTEM_TAG_TRANSLATIONS[sys]?.[locale] || lookupProjectText('systems', sys, locale);
    if (!hit) return '';
    out.push(hit);
  }
  return out.join(', ');
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  const [form, setForm] = useState({
    title: '',
    titleEn: '',
    titleAr: '',
    category: 'تجاری و اداری',
    client: '',
    employer: '',
    employerEn: '',
    employerAr: '',
    executor: 'شرکت نوآوران پنجره سپاهان',
    executorEn: 'Noavaran Panjereh Sepahan',
    executorAr: 'شركة نوآوران پنجره سباهان',
    location: 'اصفهان',
    image: '',
    images: [] as string[],
    description: '',
    year: '۱۴۰۳',
    systemsUsed: 'پنجره دوجداره ترمال‌بریک, نمای کرتین وال لامل',
    ...emptyTranslations,
  });

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (data.projects) {
        setCategories(data.projects);
      }
    } catch (e) {
      console.error('Error fetching categories:', e);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      setProjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.all([fetchProjects(), fetchCategories()]);
  }, []);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setForm({
      title: '',
      titleEn: '',
      titleAr: '',
      category: categories[0]?.nameFa || 'تجاری و اداری',
      client: '',
      employer: '',
      employerEn: '',
      employerAr: '',
      executor: 'شرکت نوآوران پنجره سپاهان',
      executorEn: 'Noavaran Panjereh Sepahan',
      executorAr: 'شركة نوآوران پنجره سباهان',
      location: 'اصفهان',
      image: '',
      images: [],
      description: '',
      year: '۱۴۰۳',
      systemsUsed: 'پنجره دوجداره ترمال‌بریک, نمای کرتین وال لامل',
      ...emptyTranslations,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject(project);
    const employerFa = project.employer || project.client || '';
    setForm({
      title: project.title,
      // Existing projects without saved translations are pre-filled from the built-in
      // dictionary, so what the admin sees here matches what visitors see on the site.
      titleEn: project.titleEn || lookupProjectText('titles', project.title, 'en') || '',
      titleAr: project.titleAr || lookupProjectText('titles', project.title, 'ar') || '',
      category: project.category,
      client: project.client || '',
      employer: employerFa,
      employerEn: project.employerEn || lookupProjectText('employers', employerFa, 'en') || '',
      employerAr: project.employerAr || lookupProjectText('employers', employerFa, 'ar') || '',
      executor: project.executor || 'شرکت نوآوران پنجره سپاهان',
      executorEn: project.executorEn || 'Noavaran Panjereh Sepahan',
      executorAr: project.executorAr || 'شركة نوآوران پنجره سباهان',
      location: project.location || '',
      image: project.image || '',
      images: project.images || [],
      description: project.description || '',
      year: project.year || '',
      systemsUsed: project.systemsUsed?.join(', ') || '',
      locationEn: project.locationEn || lookupProjectText('locations', project.location, 'en') || '',
      locationAr: project.locationAr || lookupProjectText('locations', project.location, 'ar') || '',
      descriptionEn: project.descriptionEn || lookupProjectText('descriptions', project.description, 'en') || '',
      descriptionAr: project.descriptionAr || lookupProjectText('descriptions', project.description, 'ar') || '',
      yearEn: project.yearEn || formatLocalizedYear(project.year, 'en'),
      yearAr: project.yearAr || formatLocalizedYear(project.year, 'ar'),
      systemsUsedEn: project.systemsUsedEn?.join(', ') || translateSystems(project.systemsUsed, 'en'),
      systemsUsedAr: project.systemsUsedAr?.join(', ') || translateSystems(project.systemsUsed, 'ar'),
    });
    setModalOpen(true);
  };

  // Collects the Persian source text for the "translate with AI" button.
  const getTranslationSource = () => ({
    title: form.title,
    employer: form.employer,
    executor: form.executor,
    location: form.location,
    year: form.year,
    systems: splitList(form.systemsUsed),
    description: form.description,
  });

  // Fills only the EMPTY English / Arabic fields, so manual translations are never overwritten.
  const applyAiTranslations = (result: AiTranslations) => {
    setForm((prev) => {
      const next: Record<string, any> = { ...prev };
      for (const { code, suffix } of LANG_PANELS) {
        const r = result[code];
        if (!r) continue;
        const put = (key: string, value: string | string[] | undefined) => {
          const text = Array.isArray(value) ? value.join(', ') : value;
          if (text && !String(next[key] || '').trim()) next[key] = text;
        };
        put(`title${suffix}`, r.title);
        put(`employer${suffix}`, r.employer);
        put(`executor${suffix}`, r.executor);
        put(`location${suffix}`, r.location);
        put(`year${suffix}`, r.year);
        put(`systemsUsed${suffix}`, r.systems);
        put(`description${suffix}`, r.description);
      }
      return next as typeof prev;
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این پروژه از گالری اطمینان دارید؟')) return;
    try {
      await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      setProjects(projects.filter((p) => p.id !== id));
    } catch (e) {
      alert('خطا در حذف پروژه');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image || !form.image.trim()) {
      alert('لطفاً تصویر شاخص پروژه را آپلود کرده یا آدرس آن را وارد نمایید.');
      return;
    }

    // Deduplicate images array against cover image and within itself
    const seen = new Set<string>();
    const coverNorm = form.image.trim().split('?')[0].split('#')[0].toLowerCase();
    seen.add(coverNorm);

    const dedupedGallery: string[] = [];
    for (const img of form.images || []) {
      if (!img) continue;
      const norm = img.trim().split('?')[0].split('#')[0].toLowerCase();
      if (!seen.has(norm)) {
        seen.add(norm);
        dedupedGallery.push(img.trim());
      }
    }

    const payload = {
      ...form,
      employer: form.employer || form.client,
      client: form.client || form.employer,
      images: dedupedGallery,
      systemsUsed: splitList(form.systemsUsed),
      systemsUsedEn: splitList(form.systemsUsedEn),
      systemsUsedAr: splitList(form.systemsUsedAr),
    };

    try {
      if (editingProject) {
        const res = await fetch('/api/admin/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProject.id, ...payload }),
        });
        const updated = await res.json();
        setProjects(projects.map((p) => (p.id === editingProject.id ? updated : p)));
      } else {
        const res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        setProjects([created, ...projects]);
      }
      setModalOpen(false);
    } catch (e) {
      alert('خطا در ذخیره اطلاعات');
    }
  };

  return (
    <div className="min-h-[85vh] pb-16">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white">مدیریت پروژه‌ها و کارنامه</h1>
            <p className="text-xs text-titanium-400 mt-1">
              افزودن، ویرایش مشخصات، نام انگلیسی، دسته‌بندی، کارفرما، سال اجرا و گالری تصاویر نامحدود
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCatModalOpen(true)}
              className="px-3.5 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700 text-titanium-200 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <FolderTree className="w-4 h-4 text-bronze-400" />
              <span>مدیریت دسته‌بندی‌ها</span>
            </button>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2.5 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-bronze-500/20"
            >
              <Plus className="w-4 h-4 text-charcoal-950" />
              <span>افزودن پروژه جدید</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-titanium-300">
              <thead className="bg-charcoal-850 text-titanium-400 uppercase font-bold border-b border-charcoal-800">
                <tr>
                  <th className="py-3 px-4">تصویر</th>
                  <th className="py-3 px-4">عنوان پروژه (فارسی / انگلیسی)</th>
                  <th className="py-3 px-4">دسته‌بندی</th>
                  <th className="py-3 px-4">کارفرما</th>
                  <th className="py-3 px-4">سال</th>
                  <th className="py-3 px-4">گالری عکس</th>
                  <th className="py-3 px-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-titanium-500">
                      در حال دریافت پروژه‌ها...
                    </td>
                  </tr>
                ) : projects.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-titanium-500">
                      پروژه‌ای ثبت نشده است.
                    </td>
                  </tr>
                ) : (
                  projects.map((p) => (
                    <tr key={p.id} className="hover:bg-charcoal-850/50 transition-colors">
                      <td className="py-2 px-4">
                        <div className="w-12 h-12 rounded-lg bg-charcoal-800 overflow-hidden border border-charcoal-700/60">
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="py-3 px-4 max-w-xs space-y-0.5">
                        <div className="font-semibold text-white truncate">{p.title}</div>
                        {p.titleEn && (
                          <div className="text-[11px] font-mono text-titanium-400 truncate" dir="ltr">
                            {p.titleEn}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-bronze-400">{p.category}</td>
                      <td className="py-3 px-4 truncate max-w-[150px]">{p.employer || p.client || '—'}</td>
                      <td className="py-3 px-4 font-mono">{p.year || '—'}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-charcoal-800 text-[10px] font-mono text-titanium-300">
                          {p.images?.length || 0} عکس
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-titanium-300 hover:text-white transition-colors"
                            title="ویرایش"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-rose-950 text-rose-400 hover:text-rose-300 transition-colors"
                            title="حذف"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Category Manager Modal */}
      <CategoryManagerModal
        isOpen={catModalOpen}
        onClose={() => setCatModalOpen(false)}
        type="projects"
        categories={categories}
        onCategoriesChanged={() => {
          fetchCategories();
          fetchProjects();
        }}
      />

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-charcoal-900 border border-charcoal-700 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-right">
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-4">
              <h2 className="text-base font-bold text-white">
                {editingProject ? 'ویرایش پروژه' : 'افزودن پروژه جدید'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg bg-charcoal-800 text-titanium-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* Titles Section */}
              <div className="p-4 rounded-2xl bg-charcoal-850/60 border border-charcoal-800 space-y-3">
                <h3 className="text-xs font-bold text-bronze-400">عناوین و نام پروژه</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-titanium-300 block mb-1 font-medium">
                      عنوان پروژه (فارسی) <span className="text-rose-500">*</span>:
                    </label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="مثال: ساختمان تجاری مهندس طاووسی"
                      className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-titanium-300 block mb-1 font-medium">
                      نام پروژه به انگلیسی (Finglish / English Name):
                    </label>
                    <input
                      type="text"
                      value={form.titleEn}
                      onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                      placeholder="e.g. Eng. Tavoosi Commercial Center"
                      className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-sans focus:border-bronze-500 focus:outline-none text-left"
                      dir="ltr"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-titanium-300 block mb-1 font-medium">
                      نام پروژه به عربی (العربية - اختیاری):
                    </label>
                    <input
                      type="text"
                      value={form.titleAr}
                      onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
                      placeholder="مثال: مجمع المهندس طاووسي التجاري"
                      className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-sans focus:border-bronze-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Category & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-titanium-300 font-medium">دسته‌بندی:</label>
                    <button
                      type="button"
                      onClick={() => setCatModalOpen(true)}
                      className="text-[11px] text-bronze-400 hover:text-bronze-300 flex items-center gap-1"
                    >
                      <FolderTree className="w-3 h-3" />
                      <span>مدیریت دسته‌ها</span>
                    </button>
                  </div>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.nameFa}>
                        {c.nameFa} ({c.nameEn})
                      </option>
                    ))}
                    {!categories.find((c) => c.nameFa === form.category) && (
                      <option value={form.category}>{form.category}</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="text-titanium-300 block mb-1 font-medium">سال اجرا (نمایش در صفحه پروژه):</label>
                  <input
                    type="text"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    placeholder="مثال: ۱۴۰۲ یا ۱۴۰۰ - ۱۴۰۳"
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-bronze-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Employer (Client) & Executor */}
              <div className="p-4 rounded-2xl bg-charcoal-850/60 border border-charcoal-800 space-y-3">
                <h3 className="text-xs font-bold text-bronze-400">مشخصات کارفرما و مجری پروژه</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-titanium-300 block mb-1 font-medium">کارفرما (فارسی):</label>
                    <input
                      type="text"
                      value={form.employer}
                      onChange={(e) => setForm({ ...form, employer: e.target.value, client: e.target.value })}
                      placeholder="مثال: بانک مهر اقتصاد / مهندس طاووسی"
                      className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-titanium-300 block mb-1 font-medium">کارفرما (انگلیسی):</label>
                    <input
                      type="text"
                      value={form.employerEn}
                      onChange={(e) => setForm({ ...form, employerEn: e.target.value })}
                      placeholder="e.g. Mehr Eqtesad Bank"
                      className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-sans focus:border-bronze-500 focus:outline-none text-left"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="text-titanium-300 block mb-1 font-medium">مجری پروژه (فارسی):</label>
                    <input
                      type="text"
                      value={form.executor}
                      onChange={(e) => setForm({ ...form, executor: e.target.value })}
                      placeholder="شرکت نوآوران پنجره سپاهان"
                      className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-titanium-300 block mb-1 font-medium">مجری پروژه (انگلیسی):</label>
                    <input
                      type="text"
                      value={form.executorEn}
                      onChange={(e) => setForm({ ...form, executorEn: e.target.value })}
                      placeholder="Noavaran Panjereh Sepahan"
                      className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-sans focus:border-bronze-500 focus:outline-none text-left"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Systems */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-titanium-300 block mb-1 font-medium">موقعیت مکانی:</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-titanium-300 block mb-1 font-medium">سیستم‌های اجرا شده (با کاما):</label>
                  <input
                    type="text"
                    value={form.systemsUsed}
                    onChange={(e) => setForm({ ...form, systemsUsed: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <ImageUploadField
                label="تصویر اصلی / شاخص پروژه"
                required
                value={form.image}
                onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
                hint="تصویر اصلی و کاور کارت پروژه (نسبت ابعاد ۴:۳)"
                aspectRatioClass="aspect-[4/3]"
              />

              {/* Unlimited Gallery Images */}
              <MultiImageUpload
                label="گالری تصاویر پروژه (نامحدود)"
                images={form.images}
                onChange={(urls) => setForm((prev) => ({ ...prev, images: urls }))}
                hint="تصاویر تکمیلی پروژه جهت نمایش در لایت‌باکس و گالری با قابلیت فشرده‌سازی خودکار و حذف تکراری‌ها"
                excludeImages={[form.image]}
              />

              <div>
                <label className="text-titanium-300 block mb-1 font-medium">توضیحات تکمیلی پروژه:</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-charcoal-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-titanium-300 font-medium"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 font-bold shadow-md shadow-bronze-500/20"
                >
                  {editingProject ? 'ثبت تغییرات پروژه' : 'ایجاد پروژه جدید'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
