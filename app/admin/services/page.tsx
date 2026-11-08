'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/AdminNav';
import { ServiceItem } from '@/lib/db';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  ArrowUp,
  ArrowDown,
  Layers,
  Sparkles,
  Check,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import ImageUploadField from '@/components/admin/ImageUploadField';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [form, setForm] = useState({
    title: '',
    titleEn: '',
    slug: '',
    summary: '',
    icon: 'Maximize',
    image: '',
    featuresText: '',
    subcategories: [] as { name: string; description: string }[],
    technicalSpecs: [] as { key: string; value: string }[],
  });

  const availableIcons = [
    'Maximize',
    'Grid',
    'ShieldCheck',
    'Columns',
    'Layers',
    'Box',
    'Wrench',
    'Building2',
  ];

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      if (Array.isArray(data)) {
        setServices(data);
      }
    } catch (e) {
      console.error(e);
      setMessage({ text: 'خطا در دریافت لیست خدمات', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setEditingService(null);
    setForm({
      title: '',
      titleEn: '',
      slug: '',
      summary: '',
      icon: 'Maximize',
      image: '',
      featuresText: '',
      subcategories: [],
      technicalSpecs: [],
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (s: ServiceItem) => {
    setEditingService(s);
    const specsList = s.technicalSpecs
      ? Object.entries(s.technicalSpecs).map(([key, value]) => ({ key, value }))
      : [];
    const subcatsList = Array.isArray(s.subcategories)
      ? s.subcategories.map(sub => ({ name: sub.name || '', description: sub.description || '' }))
      : [];

    setForm({
      title: s.title || '',
      titleEn: s.titleEn || '',
      slug: s.slug || '',
      summary: s.summary || '',
      icon: s.icon || 'Maximize',
      image: s.image || '',
      featuresText: Array.isArray(s.features) ? s.features.join('\n') : '',
      subcategories: subcatsList,
      technicalSpecs: specsList,
    });
    setModalOpen(true);
  };

  const handleAddSubcategory = () => {
    setForm(prev => ({
      ...prev,
      subcategories: [...prev.subcategories, { name: '', description: '' }],
    }));
  };

  const handleUpdateSubcategory = (index: number, field: 'name' | 'description', value: string) => {
    setForm(prev => {
      const updated = [...prev.subcategories];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, subcategories: updated };
    });
  };

  const handleRemoveSubcategory = (index: number) => {
    setForm(prev => ({
      ...prev,
      subcategories: prev.subcategories.filter((_, i) => i !== index),
    }));
  };

  const handleAddTechSpec = () => {
    setForm(prev => ({
      ...prev,
      technicalSpecs: [...prev.technicalSpecs, { key: '', value: '' }],
    }));
  };

  const handleUpdateTechSpec = (index: number, field: 'key' | 'value', value: string) => {
    setForm(prev => {
      const updated = [...prev.technicalSpecs];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, technicalSpecs: updated };
    });
  };

  const handleRemoveTechSpec = (index: number) => {
    setForm(prev => ({
      ...prev,
      technicalSpecs: prev.technicalSpecs.filter((_, i) => i !== index),
    }));
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`آیا از حذف خدمت «${title}» اطمینان دارید؟`)) return;

    try {
      const res = await fetch(`/api/admin/services?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) => prev.filter((s) => s.id !== id && s.slug !== id));
        setMessage({ text: `خدمت «${title}» با موفقیت حذف گردید.`, type: 'success' });
      } else {
        setMessage({ text: data.error || 'خطا در حذف خدمت', type: 'error' });
      }
    } catch (e) {
      setMessage({ text: 'خطا در برقراری ارتباط با سرور هنگام حذف', type: 'error' });
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === services.length - 1)
    ) {
      return;
    }

    const newServices = [...services];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newServices[index];
    newServices[index] = newServices[targetIndex];
    newServices[targetIndex] = temp;

    setServices(newServices);

    try {
      const orderedIds = newServices.map((s) => s.id || s.slug);
      const res = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reorder: true, orderedIds }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: 'ترتیب خدمات با موفقیت به‌روزرسانی و ذخیره شد.', type: 'success' });
      } else {
        setMessage({ text: 'خطا در ذخیره ترتیب جدید در سرور', type: 'error' });
        fetchServices();
      }
    } catch (e) {
      setMessage({ text: 'خطا در ارتباط با سرور هنگام تغییر ترتیب', type: 'error' });
      fetchServices();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const features = form.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const technicalSpecsRecord: Record<string, string> = {};
    for (const spec of form.technicalSpecs) {
      const k = spec.key.trim();
      if (k) {
        technicalSpecsRecord[k] = spec.value.trim();
      }
    }

    const subcategoriesList = form.subcategories
      .map(sub => ({ name: sub.name.trim(), description: sub.description.trim() }))
      .filter(sub => sub.name || sub.description);

    const baseItem = editingService ? { ...editingService } : {};
    delete (baseItem as any).featuresText;

    const payload = {
      ...baseItem,
      title: form.title.trim(),
      titleEn: form.titleEn.trim(),
      slug: form.slug.trim().toLowerCase().replace(/\s+/g, '-'),
      summary: form.summary.trim(),
      icon: form.icon,
      image: form.image.trim(),
      features,
      subcategories: subcategoriesList,
      technicalSpecs: technicalSpecsRecord,
    };
    delete (payload as any).featuresText;

    try {
      if (editingService) {
        const res = await fetch('/api/admin/services', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingService.id || editingService.slug, ...payload }),
        });
        const updated = await res.json();
        if (res.ok && updated) {
          setServices((prev) =>
            prev.map((s) => (s.id === editingService.id ? { ...s, ...updated } : s))
          );
          setModalOpen(false);
          setMessage({ text: 'اطلاعات خدمت با موفقیت به‌روزرسانی شد.', type: 'success' });
        } else {
          setMessage({ text: updated.error || 'خطا در ویرایش خدمت', type: 'error' });
        }
      } else {
        const res = await fetch('/api/admin/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        if (res.ok && created) {
          setServices((prev) => [...prev, created]);
          setModalOpen(false);
          setMessage({ text: 'خدمت مهندسی جدید با موفقیت افزوده شد.', type: 'success' });
        } else {
          setMessage({ text: created.error || 'خطا در ایجاد خدمت جدید', type: 'error' });
        }
      }
    } catch (err) {
      setMessage({ text: 'خطا در برقراری ارتباط با سرور', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-[85vh] pb-16">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-bronze-400" />
              <span>مدیریت خدمات و راهکارهای مهندسی</span>
            </h1>
            <p className="text-xs text-titanium-400 mt-1">
              تنظیم، ویرایش، حذف و جابجایی ترتیبی خدمات نمایش‌داده‌شده در صفحه اصلی سایت (۶ مورد اول پیش‌فرض، مابقی با دکمه بازشونده)
            </p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-bronze-500/20 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4 text-charcoal-950" />
            <span>افزودن خدمت جدید</span>
          </button>
        </div>

        {/* Message Banner */}
        {message && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
            }`}
          >
            {message.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Services List Table */}
        <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-titanium-300">
              <thead className="bg-charcoal-850 text-titanium-400 uppercase font-bold border-b border-charcoal-800">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">ردیف</th>
                  <th className="py-3 px-4">عنوان خدمت</th>
                  <th className="py-3 px-4">اسلاگ / شناسه</th>
                  <th className="py-3 px-4">خلاصه توضیحات</th>
                  <th className="py-3 px-4 text-center">تغییر ترتیب</th>
                  <th className="py-3 px-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-titanium-500">
                      در حال بارگذاری خدمات مهندسی...
                    </td>
                  </tr>
                ) : services.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-titanium-500">
                      هیچ خدمتی ثبت نشده است. با دکمه «افزودن خدمت جدید» شروع کنید.
                    </td>
                  </tr>
                ) : (
                  services.map((s, idx) => (
                    <tr
                      key={s.id || s.slug || idx}
                      className="hover:bg-charcoal-850/50 transition-colors"
                    >
                      <td className="py-3 px-4 text-center font-mono font-bold text-bronze-400">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="py-3 px-4 font-bold text-white max-w-xs truncate">
                        <div className="flex items-center gap-2">
                          <span>{s.title}</span>
                          {idx < 6 && (
                            <span className="px-1.5 py-0.5 rounded bg-bronze-500/20 text-bronze-300 text-[10px] font-mono">
                              صفحه اصلی
                            </span>
                          )}
                        </div>
                        {s.titleEn && (
                          <span className="block text-[11px] text-titanium-500 font-mono truncate">
                            {s.titleEn}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-titanium-400">
                        <span className="bg-charcoal-800 px-2 py-0.5 rounded border border-charcoal-700">
                          {s.slug}
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-sm truncate text-titanium-400">
                        {s.summary || '—'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMove(idx, 'up')}
                            disabled={idx === 0}
                            className={`p-1.5 rounded-lg border ${
                              idx === 0
                                ? 'border-charcoal-800 text-charcoal-700 cursor-not-allowed'
                                : 'border-charcoal-700 bg-charcoal-800 text-titanium-300 hover:text-white hover:border-bronze-500'
                            }`}
                            title="انتقال به بالا"
                            aria-label="انتقال به بالا"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMove(idx, 'down')}
                            disabled={idx === services.length - 1}
                            className={`p-1.5 rounded-lg border ${
                              idx === services.length - 1
                                ? 'border-charcoal-800 text-charcoal-700 cursor-not-allowed'
                                : 'border-charcoal-700 bg-charcoal-800 text-titanium-300 hover:text-white hover:border-bronze-500'
                            }`}
                            title="انتقال به پایین"
                            aria-label="انتقال به پایین"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(s)}
                            className="p-1.5 rounded-lg bg-charcoal-800 text-titanium-300 hover:text-white transition-colors"
                            title="ویرایش"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(s.id || s.slug, s.title)}
                            className="p-1.5 rounded-lg bg-charcoal-800 text-rose-400 hover:text-rose-300 transition-colors"
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

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-charcoal-900 border border-charcoal-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-bronze-400" />
                <span>{editingService ? 'ویرایش خدمت مهندسی' : 'افزودن خدمت جدید'}</span>
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg bg-charcoal-800 text-titanium-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-titanium-300 block mb-1 font-medium">عنوان خدمت (فارسی):</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setForm((prev) => ({
                        ...prev,
                        title: val,
                        slug: prev.slug || val.toLowerCase().replace(/\s+/g, '-'),
                      }));
                    }}
                    placeholder="مثال: نمای کرتین وال لامل"
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-titanium-300 block mb-1 font-medium">عنوان خدمت (انگلیسی):</label>
                  <input
                    type="text"
                    value={form.titleEn}
                    onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                    placeholder="Curtain Wall / Lamella Façade"
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-bronze-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-titanium-300 block mb-1 font-medium">شناسه یکتای آدرس (Slug):</label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="curtain-wall-lamella"
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-bronze-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-titanium-300 block mb-1 font-medium">آیکون شاخص:</label>
                  <select
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                  >
                    {availableIcons.map((ic) => (
                      <option key={ic} value={ic}>
                        {ic}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <ImageUploadField
                  label="تصویر کاور خدمت"
                  value={form.image}
                  onChange={(url) => setForm({ ...form, image: url })}
                  hint="تصویر کاور یا رندر اختصاصی خدمت (نسبت ۱۶:۹)"
                  aspectRatioClass="aspect-video"
                />
              </div>

              <div>
                <label className="text-titanium-300 block mb-1 font-medium">خلاصه توضیحات فنی (Summary):</label>
                <textarea
                  rows={3}
                  required
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  placeholder="توضیح کوتاه و فشرده معرفی راهکار و کاربرد آن..."
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="text-titanium-300 block mb-1 font-medium">
                  ویژگی‌ها و مزایای برجسته (هر ویژگی در یک خط):
                </label>
                <textarea
                  rows={4}
                  value={form.featuresText}
                  onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
                  placeholder="عایق‌بندی صددرصدی حرارت&#10;سیستم لیفت اند اسلاید با توان جابجایی لنگه‌های ۴۰۰ کیلوگرمی&#10;استفاده از یراق‌آلات اصیل اروپایی"
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Subcategories Editor */}
              <div className="space-y-3 pt-2 border-t border-charcoal-800">
                <div className="flex items-center justify-between">
                  <label className="text-titanium-300 font-medium flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-bronze-400" />
                    <span>زیرمجموعه‌ها و سیستم‌های مرتبط (Subcategories):</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAddSubcategory}
                    className="px-2.5 py-1 rounded-lg bg-charcoal-800 hover:bg-bronze-500 hover:text-charcoal-950 text-titanium-300 font-bold text-[11px] flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>افزودن زیرمجموعه</span>
                  </button>
                </div>
                {form.subcategories.length === 0 ? (
                  <p className="text-[11px] text-titanium-500 italic">هیچ زیرمجموعه‌ای تعریف نشده است (اختیاری).</p>
                ) : (
                  <div className="space-y-2">
                    {form.subcategories.map((sub, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-charcoal-850 border border-charcoal-800 space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="نام زیرمجموعه (مثال: سیستم آکاردئونی Folding)"
                            value={sub.name}
                            onChange={(e) => handleUpdateSubcategory(idx, 'name', e.target.value)}
                            className="flex-1 p-2 rounded-lg bg-charcoal-900 border border-charcoal-700 text-white text-xs focus:border-bronze-500 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSubcategory(idx)}
                            className="p-2 rounded-lg bg-charcoal-900 text-rose-400 hover:text-rose-300 transition-colors"
                            title="حذف زیرمجموعه"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="توضیحات کوتاه زیرمجموعه (مثال: امکان باز شدن کامل دهانه و ادغام فضا)"
                          value={sub.description}
                          onChange={(e) => handleUpdateSubcategory(idx, 'description', e.target.value)}
                          className="w-full p-2 rounded-lg bg-charcoal-900 border border-charcoal-700 text-white text-xs focus:border-bronze-500 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Technical Specs Editor */}
              <div className="space-y-3 pt-2 border-t border-charcoal-800">
                <div className="flex items-center justify-between">
                  <label className="text-titanium-300 font-medium flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-bronze-400" />
                    <span>مشخصات فنی کلیدی (Technical Specs):</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAddTechSpec}
                    className="px-2.5 py-1 rounded-lg bg-charcoal-800 hover:bg-bronze-500 hover:text-charcoal-950 text-titanium-300 font-bold text-[11px] flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>افزودن مشخصه فنی</span>
                  </button>
                </div>
                {form.technicalSpecs.length === 0 ? (
                  <p className="text-[11px] text-titanium-500 italic">هیچ مشخصه فنی ثبت نشده است (اختیاری).</p>
                ) : (
                  <div className="space-y-2">
                    {form.technicalSpecs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="عنوان مشخصه (مثال: عرض مقطع فریم)"
                          value={spec.key}
                          onChange={(e) => handleUpdateTechSpec(idx, 'key', e.target.value)}
                          className="w-1/3 p-2 rounded-lg bg-charcoal-850 border border-charcoal-700 text-white text-xs focus:border-bronze-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="مقدار مشخصه (مثال: ۶۰ تا ۱۴۰ میلی‌متر)"
                          value={spec.value}
                          onChange={(e) => handleUpdateTechSpec(idx, 'value', e.target.value)}
                          className="flex-1 p-2 rounded-lg bg-charcoal-850 border border-charcoal-700 text-white text-xs focus:border-bronze-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveTechSpec(idx)}
                          className="p-2 rounded-lg bg-charcoal-850 text-rose-400 hover:text-rose-300 transition-colors"
                          title="حذف مشخصه فنی"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 font-bold shadow-md shadow-bronze-500/20 disabled:opacity-50"
                >
                  {saving ? 'در حال ذخیره...' : 'ذخیره و انتشار خدمت'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
