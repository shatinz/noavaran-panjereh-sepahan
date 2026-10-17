'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/AdminNav';
import { ProjectItem } from '@/lib/db';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';
import ImageUploadField from '@/components/admin/ImageUploadField';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  const [form, setForm] = useState({
    title: '',
    category: 'تجاری و اداری',
    client: '',
    location: 'اصفهان',
    image: '',
    description: '',
    year: '۱۴۰۳',
    systemsUsed: 'پنجره دوجداره ترمال‌بریک, نمای کرتین وال لامل',
  });

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
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setForm({
      title: '',
      category: 'تجاری و اداری',
      client: '',
      location: 'اصفهان',
      image: '',
      description: '',
      year: '۱۴۰۳',
      systemsUsed: 'پنجره دوجداره ترمال‌بریک, نمای کرتین وال لامل',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      category: project.category,
      client: project.client,
      location: project.location,
      image: project.image,
      description: project.description,
      year: project.year,
      systemsUsed: project.systemsUsed?.join(', ') || '',
    });
    setModalOpen(true);
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
      alert('لطفاً تصویر پروژه را آپلود کرده یا آدرس آن را وارد نمایید.');
      return;
    }
    const payload = {
      ...form,
      systemsUsed: form.systemsUsed.split(',').map((s) => s.trim()).filter(Boolean),
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
              افزودن، ویرایش مشخصات، دسته‌بندی و تصاویر پروژه‌های اجرا شده
            </p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-bronze-500/20"
          >
            <Plus className="w-4 h-4 text-charcoal-950" />
            <span>افزودن پروژه جدید</span>
          </button>
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-titanium-300">
              <thead className="bg-charcoal-850 text-titanium-400 uppercase font-bold border-b border-charcoal-800">
                <tr>
                  <th className="py-3 px-4">تصویر</th>
                  <th className="py-3 px-4">عنوان پروژه</th>
                  <th className="py-3 px-4">دسته‌بندی</th>
                  <th className="py-3 px-4">کارفرما</th>
                  <th className="py-3 px-4">سال</th>
                  <th className="py-3 px-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-titanium-500">
                      در حال دریافت پروژه‌ها...
                    </td>
                  </tr>
                ) : projects.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-titanium-500">
                      پروژه‌ای ثبت نشده است.
                    </td>
                  </tr>
                ) : (
                  projects.map((p) => (
                    <tr key={p.id} className="hover:bg-charcoal-850/50 transition-colors">
                      <td className="py-2 px-4">
                        <div className="w-12 h-12 rounded-lg bg-charcoal-800 overflow-hidden">
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-white max-w-xs truncate">
                        {p.title}
                      </td>
                      <td className="py-3 px-4 text-bronze-400">{p.category}</td>
                      <td className="py-3 px-4">{p.client}</td>
                      <td className="py-3 px-4 font-mono">{p.year}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-lg bg-charcoal-800 text-titanium-300 hover:text-white"
                            title="ویرایش"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 rounded-lg bg-charcoal-800 text-rose-400 hover:text-rose-300"
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
          <div className="bg-charcoal-900 border border-charcoal-700 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
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

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-titanium-300 block mb-1 font-medium">عنوان پروژه:</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="مثال: ساختمان تجاری مهندس طاووسی"
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-titanium-300 block mb-1 font-medium">دسته‌بندی:</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                  >
                    <option value="بانکی و دولتی">بانکی و دولتی</option>
                    <option value="تجاری و اداری">تجاری و اداری</option>
                    <option value="مسکونی و ویلایی">مسکونی و ویلایی</option>
                    <option value="تعاونی و برج‌ها">تعاونی و برج‌ها</option>
                  </select>
                </div>
                <div>
                  <label className="text-titanium-300 block mb-1 font-medium">کارفرما:</label>
                  <input
                    type="text"
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  <label className="text-titanium-300 block mb-1 font-medium">سال اجرا:</label>
                  <input
                    type="text"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-bronze-500 focus:outline-none"
                  />
                </div>
              </div>

              <ImageUploadField
                label="تصویر اصلی پروژه"
                required
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
                hint="تصویر با کیفیت از پروژه اجرا شده با نسبت ابعاد ۴:۳"
                aspectRatioClass="aspect-[4/3]"
              />

              <div>
                <label className="text-titanium-300 block mb-1 font-medium">سیستم‌های اجرا شده (با کاما):</label>
                <input
                  type="text"
                  value={form.systemsUsed}
                  onChange={(e) => setForm({ ...form, systemsUsed: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-titanium-300 block mb-1 font-medium">توضیحات پروژه:</label>
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
                  ذخیره پروژه
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
