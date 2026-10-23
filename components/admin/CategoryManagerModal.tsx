'use client';

import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, Check, AlertCircle, FolderTree } from 'lucide-react';
import { CategoryItem } from '@/lib/db';

interface CategoryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'projects' | 'articles';
  categories: CategoryItem[];
  onCategoriesChanged: () => void;
}

export default function CategoryManagerModal({
  isOpen,
  onClose,
  type,
  categories,
  onCategoriesChanged,
}: CategoryManagerModalProps) {
  const [editingCat, setEditingCat] = useState<CategoryItem | null>(null);
  const [oldNameFa, setOldNameFa] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);
  const [nameFa, setNameFa] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  // Deletion modal state
  const [deletingCat, setDeletingCat] = useState<CategoryItem | null>(null);
  const [reassignTo, setReassignTo] = useState<string>('');

  if (!isOpen) return null;

  const typeTitle = type === 'projects' ? 'دسته‌بندی‌های پروژه‌ها' : 'دسته‌بندی‌های مقالات';

  const resetForm = () => {
    setEditingCat(null);
    setOldNameFa('');
    setIsAdding(false);
    setNameFa('');
    setNameEn('');
    setNameAr('');
    setError('');
  };

  const handleStartAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleStartEdit = (cat: CategoryItem) => {
    resetForm();
    setEditingCat(cat);
    setOldNameFa(cat.nameFa);
    setNameFa(cat.nameFa);
    setNameEn(cat.nameEn || '');
    setNameAr(cat.nameAr || '');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nameFa.trim()) {
      setError('نام فارسی دسته‌بندی الزامی است.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        type,
        category: {
          id: editingCat ? editingCat.id : `cat-${Date.now()}`,
          nameFa: nameFa.trim(),
          nameEn: nameEn.trim() || nameFa.trim(),
          nameAr: nameAr.trim() || undefined,
        },
        oldNameFa: editingCat ? oldNameFa : undefined,
      };

      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'خطا در ذخیره دسته‌بندی');
        return;
      }

      resetForm();
      onCategoriesChanged();
    } catch (err) {
      setError('خطای ارتباط با سرور');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingCat) return;
    setSaving(true);
    setError('');

    try {
      const url = `/api/admin/categories?type=${type}&id=${encodeURIComponent(deletingCat.id)}${
        reassignTo ? `&reassignTo=${encodeURIComponent(reassignTo)}` : ''
      }`;
      const res = await fetch(url, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'خطا در حذف دسته‌بندی');
        return;
      }

      setDeletingCat(null);
      setReassignTo('');
      onCategoriesChanged();
    } catch (err) {
      setError('خطای ارتباط با سرور');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-charcoal-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-charcoal-900 border border-charcoal-700 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-right">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-charcoal-800 pb-4">
          <div className="flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-bronze-400" />
            <h2 className="text-base font-bold text-white">مدیریت {typeTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-charcoal-800 text-titanium-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Categories List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-titanium-300">لیست دسته‌بندی‌های فعلی ({categories.length}):</span>
            {!isAdding && !editingCat && (
              <button
                type="button"
                onClick={handleStartAdd}
                className="px-3 py-1.5 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 font-bold text-xs flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>افزودن دسته‌بندی جدید</span>
              </button>
            )}
          </div>

          <div className="divide-y divide-charcoal-800 rounded-2xl bg-charcoal-850 border border-charcoal-750 overflow-hidden">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-3.5 flex items-center justify-between gap-3 hover:bg-charcoal-800/50 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>{cat.nameFa}</span>
                    <span className="text-[11px] font-mono text-bronze-400 font-normal">({cat.nameEn})</span>
                  </div>
                  {cat.nameAr && (
                    <div className="text-[10px] text-titanium-400 font-sans">عربی: {cat.nameAr}</div>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleStartEdit(cat)}
                    className="p-1.5 rounded-lg bg-charcoal-700 hover:bg-charcoal-600 text-titanium-300 hover:text-white transition-colors"
                    title="ویرایش دسته‌بندی"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setError('');
                      setDeletingCat(cat);
                      setReassignTo(categories.find((c) => c.id !== cat.id)?.nameFa || '');
                    }}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
                    title="حذف دسته‌بندی"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add / Edit Form */}
        {(isAdding || editingCat) && (
          <form onSubmit={handleSave} className="p-4 rounded-2xl bg-charcoal-950 border border-bronze-500/30 space-y-4">
            <h3 className="text-xs font-bold text-bronze-400 flex items-center gap-1.5">
              <span>{editingCat ? `ویرایش دسته‌بندی: ${editingCat.nameFa}` : 'افزودن دسته‌بندی جدید'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-titanium-300 block mb-1 font-medium">
                  نام فارسی <span className="text-rose-500">*</span>:
                </label>
                <input
                  type="text"
                  required
                  value={nameFa}
                  onChange={(e) => setNameFa(e.target.value)}
                  placeholder="مثال: صنعتی و کارگاهی"
                  className="w-full p-2 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-titanium-300 block mb-1 font-medium">
                  نام انگلیسی (English):
                </label>
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder="e.g. Industrial & Factories"
                  className="w-full p-2 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-sans focus:border-bronze-500 focus:outline-none text-left"
                  dir="ltr"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-titanium-300 block mb-1 font-medium">
                  نام عربی (العربية - اختیاری):
                </label>
                <input
                  type="text"
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  placeholder="مثال: الصناعية والمصانع"
                  className="w-full p-2 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-sans focus:border-bronze-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-charcoal-800">
              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                className="px-3 py-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-titanium-300 text-xs"
              >
                انصراف
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-1.5 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{saving ? 'در حال ذخیره...' : 'ذخیره دسته‌بندی'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Delete Confirmation Modal */}
        {deletingCat && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-3">
            <h4 className="text-xs font-bold text-rose-300">
              تایید حذف دسته‌بندی «{deletingCat.nameFa}»
            </h4>
            <p className="text-[11px] text-titanium-300 leading-relaxed">
              اگر این دسته‌بندی در پروژه‌ها یا مقالات استفاده شده باشد، می‌توانید موارد موجود را به دسته‌بندی دیگری منتقل نمایید:
            </p>

            <div>
              <label className="text-[11px] text-titanium-400 block mb-1">
                انتقال موارد استفاده‌شده به دسته‌بندی:
              </label>
              <select
                value={reassignTo}
                onChange={(e) => setReassignTo(e.target.value)}
                className="w-full p-2 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white text-xs focus:border-rose-500 focus:outline-none"
              >
                <option value="">بدون انتقال (در صورت عدم استفاده حذف شود)</option>
                {categories
                  .filter((c) => c.id !== deletingCat.id)
                  .map((c) => (
                    <option key={c.id} value={c.nameFa}>
                      {c.nameFa} ({c.nameEn})
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingCat(null)}
                className="px-3 py-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-titanium-300 text-xs"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={saving}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{saving ? 'درحال حذف...' : 'تایید و حذف'}</span>
              </button>
            </div>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white text-xs font-bold"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}
