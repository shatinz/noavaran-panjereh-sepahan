'use client';

import React, { useState, useEffect, useRef } from 'react';
import AdminNav from '@/components/AdminNav';
import { MaterialItem } from '@/lib/db';
import { Plus, Edit2, Trash2, X, Check, Layers, ExternalLink, Sparkles, Upload, Video, ShieldCheck } from 'lucide-react';

export default function AdminMaterialsPage() {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<MaterialItem | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    code: '',
    title: '',
    titleEn: '',
    category: 'سیستم‌های لولایی ترمال‌بریک',
    categoryKey: 'thermal_hinged' as MaterialItem['categoryKey'],
    isThermalBreak: true,
    summary: '',
    image: '',
    qrImage: '',
    qrUrl: '',
    videoUrl: '',
    videoTitle: '',
    videoDuration: '',
    specs: {
      frameWidth: '',
      sashWidth: '',
      wallThickness: '',
      polyamideSize: '',
      glassThickness: '',
      thermalUf: '',
      appearance: '',
      cornerFixture: '',
      gaskets: '',
      hardware: '',
      openings: '',
    },
    features: '',
  });

  const fetchMaterials = async () => {
    try {
      const res = await fetch('/api/admin/materials');
      const data = await res.json();
      setMaterials(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleOpenAdd = () => {
    setEditingMaterial(null);
    setForm({
      code: '',
      title: '',
      titleEn: '',
      category: 'سیستم‌های لولایی ترمال‌بریک',
      categoryKey: 'thermal_hinged',
      isThermalBreak: true,
      summary: '',
      image: '',
      qrImage: '',
      qrUrl: '',
      videoUrl: '',
      videoTitle: '',
      videoDuration: '',
      specs: {
        frameWidth: '',
        sashWidth: '',
        wallThickness: '',
        polyamideSize: '',
        glassThickness: '',
        thermalUf: '',
        appearance: '',
        cornerFixture: '',
        gaskets: '',
        hardware: '',
        openings: '',
      },
      features: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (m: MaterialItem) => {
    setEditingMaterial(m);
    setForm({
      code: m.code,
      title: m.title,
      titleEn: m.titleEn || '',
      category: m.category,
      categoryKey: m.categoryKey,
      isThermalBreak: m.isThermalBreak,
      summary: m.summary,
      image: m.image,
      qrImage: m.qrImage || '',
      qrUrl: m.qrUrl || '',
      videoUrl: m.videoUrl || '',
      videoTitle: m.videoTitle || '',
      videoDuration: m.videoDuration || '',
      specs: {
        frameWidth: m.specs?.frameWidth || '',
        sashWidth: m.specs?.sashWidth || '',
        wallThickness: m.specs?.wallThickness || '',
        polyamideSize: m.specs?.polyamideSize || '',
        glassThickness: m.specs?.glassThickness || '',
        thermalUf: m.specs?.thermalUf || '',
        appearance: m.specs?.appearance || '',
        cornerFixture: m.specs?.cornerFixture || '',
        gaskets: m.specs?.gaskets || '',
        hardware: m.specs?.hardware || '',
        openings: m.specs?.openings || '',
      },
      features: Array.isArray(m.features) ? m.features.join('\n') : '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این سیستم متریال اطمینان دارید؟')) return;
    try {
      const res = await fetch(`/api/admin/materials?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMaterials(materials.filter((m) => m.id !== id));
      } else {
        alert('خطا در حذف متریال');
      }
    } catch (e) {
      alert('خطا در حذف متریال');
    }
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setForm((prev) => ({ ...prev, image: data.url }));
      } else {
        alert(data.error || 'خطا در آپلود تصویر');
      }
    } catch (err) {
      console.error(err);
      alert('خطا در آپلود تصویر');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      features: form.features
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean),
    };

    try {
      if (editingMaterial) {
        const res = await fetch('/api/admin/materials', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingMaterial.id, ...payload }),
        });
        const updated = await res.json();
        setMaterials(materials.map((m) => (m.id === editingMaterial.id ? updated : m)));
      } else {
        const res = await fetch('/api/admin/materials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        setMaterials([created, ...materials]);
      }
      setModalOpen(false);
    } catch (e) {
      alert('خطا در ذخیره‌سازی اطلاعات');
    }
  };

  const categories = [
    { key: 'all', label: 'همه سیستم‌ها' },
    { key: 'thermal_hinged', label: 'لولایی ترمال‌بریک' },
    { key: 'thermal_sliding', label: 'کشویی ترمال‌بریک' },
    { key: 'normal_systems', label: 'سیستم‌های نرمال (نان‌ترمال)' },
    { key: 'additional_systems', label: 'سیستم‌های تکمیلی و نما' },
  ];

  const filteredMaterials = materials.filter((m) => {
    if (activeCategoryFilter === 'all') return true;
    return m.categoryKey === activeCategoryFilter;
  });

  return (
    <div className="min-h-[85vh] pb-16">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Layers className="w-6 h-6 text-signal-500" />
                <span>مدیریت سیستم‌ها و متریال مهندسی</span>
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-signal-500/20 text-signal-400 text-xs font-bold font-mono">
                {materials.length} سیستم فعال
              </span>
            </div>
            <p className="text-xs text-titanium-400 mt-1">
              کاتالوگ ۱۲ گانه مقاطع آلومینیومی، ترمال‌بریک، نرمال و سیستم‌های تکمیلی به همراه مشخصات فنی، ممان اینرسی و رندر CAD
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-signal-500 hover:bg-signal-400 text-white text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>افزودن سیستم متریال جدید</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCategoryFilter(c.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeCategoryFilter === c.key
                  ? 'bg-signal-500 text-white'
                  : 'bg-charcoal-900 text-titanium-400 hover:text-white border border-charcoal-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Table / Grid */}
        {loading ? (
          <div className="text-center py-20 text-titanium-400 text-sm">در حال بارگذاری متریال‌ها...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((m) => (
              <div
                key={m.id}
                className="rounded-2xl bg-charcoal-900 border border-charcoal-800 overflow-hidden flex flex-col justify-between hover:border-charcoal-700 transition-colors"
              >
                <div>
                  {/* Card Image */}
                  <div className="h-44 bg-charcoal-950 relative overflow-hidden flex items-center justify-center border-b border-charcoal-800">
                    {m.image ? (
                      <img
                        src={m.image}
                        alt={m.title}
                        className="w-full h-full object-contain p-4"
                      />
                    ) : (
                      <Layers className="w-12 h-12 text-charcoal-700" />
                    )}
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-charcoal-900/90 border border-charcoal-700 text-[11px] font-mono font-bold text-signal-400">
                      {m.code}
                    </span>
                    {m.isThermalBreak && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        ترمال‌بریک
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <div className="text-[11px] text-titanium-400">{m.category}</div>
                    <h3 className="text-base font-extrabold text-white leading-snug line-clamp-2">
                      {m.title}
                    </h3>
                    <p className="text-xs text-titanium-300 line-clamp-2 leading-relaxed">
                      {m.summary}
                    </p>

                    <div className="pt-2 border-t border-charcoal-800/60 grid grid-cols-2 gap-2 text-[11px] text-titanium-400">
                      <div>
                        عرض فریم: <span className="text-white font-mono">{m.specs?.frameWidth || '—'}</span>
                      </div>
                      <div>
                        ضخامت شیشه: <span className="text-white font-mono">{m.specs?.glassThickness || '—'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 bg-charcoal-850/60 border-t border-charcoal-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {m.videoUrl && (
                      <a
                        href={m.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-sky-400 hover:underline flex items-center gap-1"
                        title="مشاهده ویدیو"
                      >
                        <Video className="w-3.5 h-3.5" />
                        ویدیو
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(m)}
                      className="p-1.5 rounded-lg text-titanium-400 hover:text-white hover:bg-charcoal-800 transition-colors"
                      title="ویرایش"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="p-1.5 rounded-lg text-charcoal-600 hover:text-rose-400 hover:bg-charcoal-800 transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-charcoal-900 border border-charcoal-700 rounded-3xl w-full max-w-3xl my-8 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-charcoal-800 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-signal-500" />
                <span>{editingMaterial ? 'ویرایش سیستم متریال' : 'افزودن سیستم متریال جدید'}</span>
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-titanium-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-titanium-300 mb-1">
                    کد سیستم <span className="text-signal-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: TH 68"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-800 focus:border-signal-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-titanium-300 mb-1">
                    دسته‌بندی مهندسی <span className="text-signal-500">*</span>
                  </label>
                  <select
                    value={form.categoryKey}
                    onChange={(e) => {
                      const key = e.target.value as MaterialItem['categoryKey'];
                      const catNames: Record<string, string> = {
                        thermal_hinged: 'سیستم‌های لولایی ترمال‌بریک',
                        thermal_sliding: 'سیستم‌های کشویی ترمال‌بریک',
                        normal_systems: 'سیستم‌های نرمال (نان‌ترمال)',
                        additional_systems: 'سیستم‌های تکمیلی و نما',
                      };
                      setForm({
                        ...form,
                        categoryKey: key,
                        category: catNames[key] || form.category,
                        isThermalBreak: key.startsWith('thermal'),
                      });
                    }}
                    className="w-full bg-charcoal-950 border border-charcoal-800 focus:border-signal-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="thermal_hinged">سیستم‌های لولایی ترمال‌بریک</option>
                    <option value="thermal_sliding">سیستم‌های کشویی ترمال‌بریک</option>
                    <option value="normal_systems">سیستم‌های نرمال (نان‌ترمال)</option>
                    <option value="additional_systems">سیستم‌های تکمیلی و نما</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-titanium-300 mb-1">
                    عنوان کامل سیستم <span className="text-signal-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: سیستم درب و پنجره لولایی ترمال‌بریک TH 68"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-800 focus:border-signal-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-titanium-300 mb-1">
                    عنوان انگلیسی
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="TH 68 Thermal Break Hinged System"
                    value={form.titleEn}
                    onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-800 focus:border-signal-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none font-mono text-left"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-titanium-300 mb-1">
                    خلاصه توضیحات فنی و کاربرد
                  </label>
                  <textarea
                    rows={3}
                    placeholder="توضیح کوتاه در مورد مشخصات و کاربری سیستم..."
                    value={form.summary}
                    onChange={(e) => setForm({ ...form, summary: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-800 focus:border-signal-500 rounded-xl px-4 py-2 text-xs text-white focus:outline-none resize-none"
                  />
                </div>

                {/* Image Upload / URL */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-titanium-300 mb-1">
                    تصویر مقطع یا رندر ۳بعدی CAD
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      dir="ltr"
                      placeholder="/images/catalog/th68_render.jpg یا https://..."
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      className="flex-1 bg-charcoal-950 border border-charcoal-800 focus:border-signal-500 rounded-xl px-4 py-2 text-xs text-white focus:outline-none font-mono text-left"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="px-3 py-2 bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700 rounded-xl text-xs font-bold text-titanium-200 flex items-center gap-1.5 transition-colors"
                    >
                      <Upload className="w-4 h-4 text-signal-400" />
                      <span>{isUploading ? 'درحال آپلود...' : 'آپلود فایل'}</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </div>
                  {form.image && (
                    <div className="mt-2 w-32 h-20 bg-charcoal-950 rounded-lg border border-charcoal-800 overflow-hidden">
                      <img src={form.image} alt="Preview" className="w-full h-full object-contain p-1" />
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div>
                  <label className="block text-xs font-bold text-titanium-300 mb-1">
                    لینک ویدیوی انیمیشن مونتاژ (آپارات یا مستقیم)
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="https://www.aparat.com/v/..."
                    value={form.videoUrl}
                    onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-800 focus:border-signal-500 rounded-xl px-4 py-2 text-xs text-white focus:outline-none font-mono text-left"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-titanium-300 mb-1">
                    عنوان ویدیو
                  </label>
                  <input
                    type="text"
                    placeholder="انیمیشن مونتاژ سیستم..."
                    value={form.videoTitle}
                    onChange={(e) => setForm({ ...form, videoTitle: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-800 focus:border-signal-500 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Technical Specifications Section */}
              <div className="border-t border-charcoal-800 pt-5 space-y-4">
                <h4 className="text-xs font-bold text-signal-400 uppercase tracking-wider">
                  مشخصات فنی و ابعاد مهندسی
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-titanium-400 mb-1">عرض فریم</label>
                    <input
                      type="text"
                      placeholder="۶۸ میلی‌متر"
                      value={form.specs.frameWidth}
                      onChange={(e) =>
                        setForm({ ...form, specs: { ...form.specs, frameWidth: e.target.value } })
                      }
                      className="w-full bg-charcoal-950 border border-charcoal-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-titanium-400 mb-1">عرض لنگه (Sash)</label>
                    <input
                      type="text"
                      placeholder="۷۵ میلی‌متر"
                      value={form.specs.sashWidth}
                      onChange={(e) =>
                        setForm({ ...form, specs: { ...form.specs, sashWidth: e.target.value } })
                      }
                      className="w-full bg-charcoal-950 border border-charcoal-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-titanium-400 mb-1">ضخامت جداره</label>
                    <input
                      type="text"
                      placeholder="۱.۸ میلی‌متر"
                      value={form.specs.wallThickness}
                      onChange={(e) =>
                        setForm({ ...form, specs: { ...form.specs, wallThickness: e.target.value } })
                      }
                      className="w-full bg-charcoal-950 border border-charcoal-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-titanium-400 mb-1">تیغه پلی‌آمید</label>
                    <input
                      type="text"
                      placeholder="۲۴ میلی‌متر"
                      value={form.specs.polyamideSize}
                      onChange={(e) =>
                        setForm({ ...form, specs: { ...form.specs, polyamideSize: e.target.value } })
                      }
                      className="w-full bg-charcoal-950 border border-charcoal-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-titanium-400 mb-1">ضخامت شیشه خور</label>
                    <input
                      type="text"
                      placeholder="۲۰ الی ۵۴ میلی‌متر"
                      value={form.specs.glassThickness}
                      onChange={(e) =>
                        setForm({ ...form, specs: { ...form.specs, glassThickness: e.target.value } })
                      }
                      className="w-full bg-charcoal-950 border border-charcoal-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-titanium-400 mb-1">ضریب انتقال حرارت (Uf)</label>
                    <input
                      type="text"
                      placeholder="2.80 W/m²K"
                      value={form.specs.thermalUf}
                      onChange={(e) =>
                        setForm({ ...form, specs: { ...form.specs, thermalUf: e.target.value } })
                      }
                      className="w-full bg-charcoal-950 border border-charcoal-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Bullet Features */}
              <div className="border-t border-charcoal-800 pt-5">
                <label className="block text-xs font-bold text-titanium-300 mb-1">
                  ویژگی‌های برجسته (هر مورد در یک خط)
                </label>
                <textarea
                  rows={4}
                  placeholder={`قابلیت لنگه مخفی\nعایق حرارتی بالا با تیغه ۲۴ میلی‌متری\nپشتیبانی از شیشه‌های سنگین`}
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  className="w-full bg-charcoal-950 border border-charcoal-800 focus:border-signal-500 rounded-xl px-4 py-2 text-xs text-white focus:outline-none resize-none font-vazir"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-charcoal-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-xs font-semibold text-titanium-300"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-signal-500 hover:bg-signal-400 text-xs font-bold text-white flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>ذخیره سیستم</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
