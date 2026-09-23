'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/AdminNav';
import { VideoItem } from '@/lib/db';
import { Plus, Edit2, Trash2, X, Play, Video as VideoIcon } from 'lucide-react';

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);

  const [form, setForm] = useState({
    title: '',
    category: 'آموزش نصب و دیتیل اجرایی',
    platform: 'aparat' as 'aparat' | 'youtube' | 'direct',
    videoUrl: '',
    duration: '05:00',
    thumbnail: '',
    description: '',
  });

  const categories = [
    'انیمیشن‌های تخصصی متریال و مقاطع',
    'آموزش نصب و دیتیل اجرایی',
    'مقایسه فنی سیستم‌ها',
    'تست‌های استاندارد و عایق‌بندی',
    'نگهداری و ریگلاژ',
  ];

  const fetchVideos = async () => {
    try {
      const res = await fetch('/api/admin/videos');
      const data = await res.json();
      setVideos(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleOpenAdd = () => {
    setEditingVideo(null);
    setForm({
      title: '',
      category: 'آموزش نصب و دیتیل اجرایی',
      platform: 'aparat',
      videoUrl: '',
      duration: '05:00',
      thumbnail: 'https://arvinpanjereh.com/upload/service/742b5647-017c-4a6e-b416-a184adf97dcc.webp',
      description: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (v: VideoItem) => {
    setEditingVideo(v);
    setForm({
      title: v.title,
      category: v.category,
      platform: v.platform,
      videoUrl: v.videoUrl,
      duration: v.duration || '',
      thumbnail: v.thumbnail || '',
      description: v.description,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این ویدیوی آموزشی اطمینان دارید؟')) return;
    try {
      await fetch(`/api/admin/videos?id=${id}`, { method: 'DELETE' });
      setVideos(videos.filter((v) => v.id !== id));
    } catch (e) {
      alert('خطا در حذف ویدیو');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingVideo) {
        const res = await fetch('/api/admin/videos', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingVideo.id, ...form }),
        });
        const updated = await res.json();
        setVideos(videos.map((v) => (v.id === editingVideo.id ? updated : v)));
      } else {
        const res = await fetch('/api/admin/videos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const created = await res.json();
        setVideos([created, ...videos]);
      }
      setModalOpen(false);
    } catch (e) {
      alert('خطا در ذخیره ویدیو');
    }
  };

  return (
    <div className="min-h-[85vh] pb-16">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white">مدیریت ویدیوهای آموزشی (آپارات و یوتیوب)</h1>
            <p className="text-xs text-titanium-400 mt-1">
              افزودن و اتصال ویدیوهای آموزشی از آپارات یا یوتیوب و تنظیم دسته‌بندی و توضیحات فنی
            </p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-bronze-500/20"
          >
            <Plus className="w-4 h-4 text-charcoal-950" />
            <span>افزودن ویدیوی جدید</span>
          </button>
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-titanium-300">
              <thead className="bg-charcoal-850 text-titanium-400 uppercase font-bold border-b border-charcoal-800">
                <tr>
                  <th className="py-3 px-4">عنوان ویدیو</th>
                  <th className="py-3 px-4">پلتفرم</th>
                  <th className="py-3 px-4">دسته‌بندی خوشه</th>
                  <th className="py-3 px-4">مدت</th>
                  <th className="py-3 px-4">لینک منبع</th>
                  <th className="py-3 px-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-titanium-500">
                      در حال دریافت ویدیوها...
                    </td>
                  </tr>
                ) : videos.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-titanium-500">
                      ویدیویی ثبت نشده است.
                    </td>
                  </tr>
                ) : (
                  videos.map((v) => (
                    <tr key={v.id} className="hover:bg-charcoal-850/50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-white max-w-xs truncate">
                        {v.title}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                            v.platform === 'aparat'
                              ? 'bg-rose-500/20 text-rose-300'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {v.platform === 'aparat' ? 'آپارات' : 'یوتیوب'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-bronze-400">{v.category}</td>
                      <td className="py-3 px-4 font-mono">{v.duration || '—'}</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-titanium-500 max-w-[150px] truncate">
                        {v.videoUrl}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(v)}
                            className="p-1.5 rounded-lg bg-charcoal-800 text-titanium-300 hover:text-white"
                            title="ویرایش"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(v.id)}
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
                {editingVideo ? 'ویرایش ویدیوی آموزشی' : 'افزودن ویدیوی جدید'}
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
                <label className="text-titanium-300 block mb-1 font-medium">عنوان و موضوع ویدیو:</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="مثال: آموزش مراحل نصب و رگلاژ پنجره لیفت اند اسلاید"
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-titanium-300 block mb-1 font-medium">پلتفرم میزبانی:</label>
                  <select
                    value={form.platform}
                    onChange={(e) => setForm({ ...form, platform: e.target.value as 'aparat' | 'youtube' | 'direct' })}
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                  >
                    <option value="aparat">آپارات (Aparat)</option>
                    <option value="youtube">یوتیوب (YouTube)</option>
                    <option value="direct">استریم مستقیم (انیمیشن کاتالوگ)</option>
                  </select>
                </div>
                <div>
                  <label className="text-titanium-300 block mb-1 font-medium">دسته‌بندی خوشه:</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-titanium-300 block mb-1 font-medium">
                  آدرس اینترنتی ویدیو (Link / Embed URL):
                </label>
                <input
                  type="text"
                  required
                  value={form.videoUrl}
                  onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                  placeholder={
                    form.platform === 'aparat'
                      ? 'https://www.aparat.com/v/XYZ یا کد ویدیو'
                      : 'https://www.youtube.com/watch?v=XYZ یا شناسه یوتیوب'
                  }
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-bronze-500 focus:outline-none"
                />
                <span className="text-[10px] text-titanium-500 block mt-1">
                  سیستم به طور خودکار کد آی‌فریم و پلیر ریسپانسیو را تولید و جاسازی خواهد کرد.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-titanium-300 block mb-1 font-medium">مدت زمان ویدیو:</label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="05:30"
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-bronze-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-titanium-300 block mb-1 font-medium">عکس کاور (Thumbnail URL):</label>
                  <input
                    type="text"
                    value={form.thumbnail}
                    onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                    placeholder="اختیاری (برای یوتیوب خودکار گرفته می‌شود)"
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-bronze-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-titanium-300 block mb-1 font-medium">توضیحات و نکات کلیدی آموزشی:</label>
                <textarea
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="توضیح کامل مباحث آموزشی مطرح شده در این ویدیو..."
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none leading-relaxed"
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
                  ذخیره و انتشار ویدیو
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
