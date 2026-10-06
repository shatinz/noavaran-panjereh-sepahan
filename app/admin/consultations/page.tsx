'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/AdminNav';
import { ConsultationItem } from '@/lib/db';
import { MessageSquare, Phone, Calendar, CheckCircle2, Clock, Trash2, Filter, User, Building, AlertCircle } from 'lucide-react';

export default function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState<ConsultationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted'>('all');
  const [selectedItem, setSelectedItem] = useState<ConsultationItem | null>(null);

  const fetchConsultations = async () => {
    try {
      const res = await fetch('/api/consultations');
      if (res.ok) {
        const data = await res.json();
        setConsultations(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'new' | 'contacted' | 'archived') => {
    try {
      const res = await fetch('/api/consultations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setConsultations((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
        if (selectedItem?.id === id) {
          setSelectedItem((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (e) {
      alert('خطا در به‌روزرسانی وضعیت');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این درخواست مشاوره اطمینان دارید؟')) return;
    try {
      const res = await fetch(`/api/consultations?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setConsultations((prev) => prev.filter((c) => c.id !== id));
        if (selectedItem?.id === id) setSelectedItem(null);
      }
    } catch (e) {
      alert('خطا در حذف درخواست');
    }
  };

  const filteredItems = consultations.filter((c) => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  const newCount = consultations.filter((c) => c.status === 'new').length;

  return (
    <div className="min-h-[85vh] pb-16">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-signal-500" />
                <span>درخواست‌های مشاوره و پیش‌فاکتور</span>
              </h1>
              {newCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-signal-500/20 border border-signal-500/40 text-signal-400 text-xs font-bold font-mono">
                  {newCount} درخواست جدید
                </span>
              )}
            </div>
            <p className="text-xs text-titanium-400 mt-1">
              درخواست‌های ثبت‌شده توسط کاربران در فرم مشاوره و تماس سایت، با قابلیت تغییر وضعیت و ارسال ایمیل به شرکت
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-charcoal-900 border border-charcoal-800 p-1.5 rounded-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filter === 'all'
                  ? 'bg-charcoal-800 text-white'
                  : 'text-titanium-400 hover:text-white'
              }`}
            >
              همه ({consultations.length})
            </button>
            <button
              onClick={() => setFilter('new')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filter === 'new'
                  ? 'bg-signal-500/20 text-signal-400 border border-signal-500/30'
                  : 'text-titanium-400 hover:text-white'
              }`}
            >
              جدید ({newCount})
            </button>
            <button
              onClick={() => setFilter('contacted')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filter === 'contacted'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-titanium-400 hover:text-white'
              }`}
            >
              پیگیری‌شده ({consultations.filter((c) => c.status === 'contacted').length})
            </button>
          </div>
        </div>

        {/* List / Table */}
        {loading ? (
          <div className="text-center py-20 text-titanium-400 text-sm">در حال بارگذاری درخواست‌ها...</div>
        ) : filteredItems.length === 0 ? (
          <div className="rounded-3xl bg-charcoal-900 border border-charcoal-800 p-12 text-center space-y-3">
            <MessageSquare className="w-12 h-12 text-charcoal-700 mx-auto" />
            <h3 className="text-base font-bold text-white">درخواستی یافت نشد</h3>
            <p className="text-xs text-titanium-400">
              هنوز درخواستی در این دسته‌بندی ثبت نشده است.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cards List */}
            <div className="lg:col-span-2 space-y-3">
              {filteredItems.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                const isNew = item.status === 'new';

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all ${
                      isSelected
                        ? 'bg-charcoal-850 border-signal-500 shadow-lg'
                        : 'bg-charcoal-900 border-charcoal-800 hover:border-charcoal-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isNew
                              ? 'bg-signal-500/10 text-signal-400 border border-signal-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-extrabold text-white">{item.name}</h3>
                            {isNew ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-signal-500/20 text-signal-400">
                                جدید
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                                پیگیری‌شده
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-titanium-400 mt-0.5 inline-block">
                            سیستم: <strong className="text-titanium-200">{item.projectType}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <a
                          href={`tel:${item.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          dir="ltr"
                          className="px-3 py-1.5 rounded-lg bg-charcoal-800 hover:bg-signal-600 text-titanium-200 hover:text-white border border-charcoal-700 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{item.phone}</span>
                        </a>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                          className="p-1.5 rounded-lg text-charcoal-600 hover:text-rose-400 hover:bg-charcoal-800 transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {item.message && (
                      <p className="mt-3 text-xs text-titanium-300 line-clamp-2 bg-charcoal-950/50 p-2.5 rounded-lg border border-charcoal-800/60">
                        {item.message}
                      </p>
                    )}

                    <div className="mt-3 pt-3 border-t border-charcoal-800/60 flex items-center justify-between text-[11px] text-titanium-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.createdAt}</span>
                      </span>
                      <span className="text-titanium-400">کلیک برای نمایش و ویرایش وضعیت</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-1">
              {selectedItem ? (
                <div className="sticky top-20 rounded-2xl bg-charcoal-900 border border-charcoal-800 p-6 space-y-6">
                  <div className="border-b border-charcoal-800 pb-4">
                    <span className="text-[11px] text-signal-400 font-bold uppercase tracking-wider">
                      جزئیات درخواست
                    </span>
                    <h3 className="text-lg font-black text-white mt-1">{selectedItem.name}</h3>
                    <span className="text-xs text-titanium-400 font-mono block mt-1">
                      ثبت: {selectedItem.createdAt}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-[11px] text-titanium-400 block mb-1">شماره تماس:</span>
                      <a
                        href={`tel:${selectedItem.phone}`}
                        dir="ltr"
                        className="inline-flex items-center gap-2 text-base font-bold text-signal-400 hover:text-signal-300 font-mono"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{selectedItem.phone}</span>
                      </a>
                    </div>

                    <div>
                      <span className="text-[11px] text-titanium-400 block mb-1">سیستم درخواستی:</span>
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-charcoal-800 text-xs font-bold text-white border border-charcoal-700">
                        {selectedItem.projectType}
                      </span>
                    </div>

                    {selectedItem.message && (
                      <div>
                        <span className="text-[11px] text-titanium-400 block mb-1">توضیحات و پیام کاربر:</span>
                        <div className="bg-charcoal-950 p-3 rounded-xl border border-charcoal-800 text-xs text-titanium-200 leading-relaxed whitespace-pre-wrap">
                          {selectedItem.message}
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="text-[11px] text-titanium-400 block mb-2">تغییر وضعیت پیگیری:</span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleStatusChange(selectedItem.id, 'new')}
                          className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                            selectedItem.status === 'new'
                              ? 'bg-signal-500/20 text-signal-400 border-signal-500/50'
                              : 'bg-charcoal-800 text-titanium-400 border-charcoal-700 hover:text-white'
                          }`}
                        >
                          علامت‌گذاری: جدید
                        </button>
                        <button
                          onClick={() => handleStatusChange(selectedItem.id, 'contacted')}
                          className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                            selectedItem.status === 'contacted'
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                              : 'bg-charcoal-800 text-titanium-400 border-charcoal-700 hover:text-white'
                          }`}
                        >
                          علامت‌گذاری: پیگیری‌شده
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-charcoal-800 flex items-center justify-between">
                    <button
                      onClick={() => handleDelete(selectedItem.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف دائمی این درخواست</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-charcoal-900 border border-charcoal-800 p-8 text-center text-titanium-400 space-y-2">
                  <AlertCircle className="w-8 h-8 text-charcoal-700 mx-auto" />
                  <p className="text-xs">یک درخواست را از لیست انتخاب کنید تا جزئیات نمایش داده شود.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
