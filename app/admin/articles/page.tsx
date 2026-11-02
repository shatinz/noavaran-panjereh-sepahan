'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import AdminNav from '@/components/AdminNav';
import { ArticleItem, CategoryItem } from '@/lib/db';
import { Plus, Edit2, Trash2, X, Check, FileText, Upload, Image as ImageIcon, Loader2, ExternalLink, FolderTree } from 'lucide-react';
import ImageUploadField from '@/components/admin/ImageUploadField';
import MultiImageUpload from '@/components/admin/MultiImageUpload';
import CategoryManagerModal from '@/components/admin/CategoryManagerModal';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);
  const [contentUploading, setContentUploading] = useState(false);
  const contentFileInputRef = useRef<HTMLInputElement>(null);
  const contentEditorRef = useRef<HTMLDivElement>(null);
  const savedContentRangeRef = useRef<Range | null>(null);

  useEffect(() => {
    if (modalOpen && contentEditorRef.current) {
      contentEditorRef.current.innerHTML = form.content || '';
      savedContentRangeRef.current = null;
    }
  }, [modalOpen, editingArticle?.id]);

  const saveContentSelection = () => {
    const editor = contentEditorRef.current;
    const selection = window.getSelection();
    if (!editor || !selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (editor.contains(range.commonAncestorContainer)) savedContentRangeRef.current = range.cloneRange();
  };

  const restoreContentSelection = () => {
    const editor = contentEditorRef.current;
    if (!editor) return null;
    editor.focus();
    const selection = window.getSelection();
    const range = savedContentRangeRef.current;
    if (selection && range && editor.contains(range.commonAncestorContainer)) {
      try {
        selection.removeAllRanges();
        selection.addRange(range.cloneRange());
        return range;
      } catch (error) {
        savedContentRangeRef.current = null;
      }
    }
    const endRange = document.createRange();
    endRange.selectNodeContents(editor);
    endRange.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(endRange);
    return endRange;
  };

  const runEditorCommand = (command: string, value?: string) => {
    const editor = contentEditorRef.current;
    if (!editor) return;
    try {
      restoreContentSelection();
      editor.focus();
      document.execCommand(command, false, value);
      saveContentSelection();
      const html = editor.innerHTML;
      setForm((prev) => ({ ...prev, content: html }));
    } catch (error) {
      console.error('Article formatting command failed:', command, error);
    }
  };

  const editorToolbarButton = (label: string, command: string, value?: string) => (
    <button key={command + (value || '')} type="button" onMouseDown={(event) => event.preventDefault()}
      onClick={() => runEditorCommand(command, value)}
      className="min-w-9 h-8 px-2 rounded-lg border border-charcoal-700 bg-charcoal-800 hover:bg-charcoal-700 text-titanium-200 font-semibold text-xs"
      title={label} aria-label={label}>{label}</button>
  );

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'دانشنامه و راهنمای خرید',
    date: '۱۴۰۳/۰۶/۰۱',
    author: 'واحد مهندسی نوآوران پنجره سپاهان',
    image: '',
    images: [] as string[],
    excerpt: '',
    tags: 'پنجره دوجداره, ترمال بریک, اصفهان',
    content: '',
  });

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (data.articles) {
        setCategories(data.articles);
      }
    } catch (e) {
      console.error('Error fetching categories:', e);
    }
  };

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/admin/articles');
      const data = await res.json();
      setArticles(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.all([fetchArticles(), fetchCategories()]);
  }, []);

  const handleOpenAdd = () => {
    setEditingArticle(null);
    setForm({
      title: '',
      slug: '',
      category: categories[0]?.nameFa || 'دانشنامه و راهنمای خرید',
      date: new Intl.DateTimeFormat('fa-IR').format(new Date()),
      author: 'واحد مهندسی نوآوران پنجره سپاهان',
      image: '',
      images: [],
      excerpt: '',
      tags: 'پنجره دوجداره, ترمال بریک, اصفهان',
      content: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (article: ArticleItem) => {
    setEditingArticle(article);
    setForm({
      title: article.title,
      slug: article.slug,
      category: article.category,
      date: article.date,
      author: article.author,
      image: article.image,
      images: article.images || [],
      excerpt: article.excerpt,
      tags: article.tags?.join(', ') || '',
      content: article.content,
    });
    setModalOpen(true);
  };

  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setContentUploading(true);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        const editor = contentEditorRef.current;
        if (editor) {
          const range = restoreContentSelection();
          const figure = document.createElement('figure');
          figure.className = 'my-6 text-center';
          const image = document.createElement('img');
          image.src = data.url;
          image.alt = form.title || 'تصویر مقاله';
          image.className = 'rounded-xl mx-auto max-h-96 object-contain shadow-lg';
          image.style.maxWidth = '100%';
          figure.appendChild(image);
          const caption = document.createElement('figcaption');
          caption.className = 'text-xs text-steel-400 mt-2';
          caption.textContent = 'تصویر: ' + (form.title || 'توضیحات تصویر');
          figure.appendChild(caption);
          if (range) {
            range.deleteContents();
            range.insertNode(figure);
            const spacer = document.createElement('p');
            spacer.appendChild(document.createElement('br'));
            figure.parentNode?.insertBefore(spacer, figure.nextSibling);
            const nextRange = document.createRange();
            nextRange.setStart(spacer, 0);
            nextRange.collapse(true);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(nextRange);
            savedContentRangeRef.current = nextRange.cloneRange();
          } else editor.appendChild(figure);
          setForm((prev) => ({ ...prev, content: editor.innerHTML }));
        } else {
          setForm((prev) => ({ ...prev, content: prev.content + '<figure><img src="' + data.url + '" alt="تصویر مقاله" /></figure>' }));
        }
      } else {
        alert(data.error || 'خطا در بارگذاری تصویر');
      }
    } catch (err) {
      console.error('Content image upload error:', err);
      alert('خطا در ارتباط با سرور هنگام آپلود');
    } finally {
      setContentUploading(false);
      if (contentFileInputRef.current) contentFileInputRef.current.value = '';
    }
  };

  // Extract all image URLs currently embedded in article content
  const contentImages = useMemo(() => {
    if (!form.content) return [];
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    const mdRegex = /!\[.*?\]\((.*?)\)/gi;
    const found: string[] = [];
    let match;
    while ((match = imgRegex.exec(form.content)) !== null) {
      if (!found.includes(match[1])) found.push(match[1]);
    }
    while ((match = mdRegex.exec(form.content)) !== null) {
      if (!found.includes(match[1])) found.push(match[1]);
    }
    return found;
  }, [form.content]);

  // Delete an embedded image from both article content and server storage
  const handleDeleteContentImage = async (targetUrl: string) => {
    if (!confirm('آیا از حذف این تصویر از متن مقاله و سرور اطمینان دارید؟')) return;

    let updatedContent = form.content;
    const escapedUrl = targetUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Remove <figure> wrapping this image
    const figureRegex = new RegExp(`\\s*<figure[^>]*>\\s*<img[^>]*src=["']${escapedUrl}["'][^>]*>(?:(?!<\\/figure>).)*<\\/figure>\\s*`, 'gis');
    updatedContent = updatedContent.replace(figureRegex, '\n\n');

    // Remove standalone <img>
    const standaloneImgRegex = new RegExp(`\\s*<img[^>]*src=["']${escapedUrl}["'][^>]*>\\s*`, 'gi');
    updatedContent = updatedContent.replace(standaloneImgRegex, '\n');

    // Remove markdown image ![...](...)
    const mdRegex = new RegExp(`\\s*!\\[[^\\]]*\\]\\(${escapedUrl}\\)\\s*`, 'gi');
    updatedContent = updatedContent.replace(mdRegex, '\n');

    // Clean up excessive newlines
    updatedContent = updatedContent.replace(/\n{3,}/g, '\n\n').trim();

    setForm((prev) => ({ ...prev, content: updatedContent }));
    if (contentEditorRef.current) contentEditorRef.current.innerHTML = updatedContent;

    // Delete the file from the server if it was locally uploaded to /uploads/
    if (targetUrl.startsWith('/uploads/')) {
      try {
        await fetch(`/api/admin/upload?url=${encodeURIComponent(targetUrl)}`, {
          method: 'DELETE',
        });
      } catch (err) {
        console.error('Failed to delete file from disk:', err);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این مقاله اطمینان دارید؟')) return;
    try {
      await fetch(`/api/admin/articles?id=${id}`, { method: 'DELETE' });
      setArticles(articles.filter((a) => a.id !== id));
    } catch (e) {
      alert('خطا در حذف مقاله');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const articleHtml = contentEditorRef.current?.innerHTML ?? form.content;
    if (!contentEditorRef.current?.innerText.trim()) {
      alert('لطفاً متن مقاله را وارد کنید.');
      return;
    }
    if (!form.image || !form.image.trim()) {
      alert('لطفاً تصویر شاخص مقاله را آپلود کرده یا آدرس آن را وارد نمایید.');
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
      content: articleHtml,
      images: dedupedGallery,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editingArticle) {
        const res = await fetch('/api/admin/articles', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingArticle.id, ...payload }),
        });
        const updated = await res.json();
        if (!res.ok) throw new Error(updated.error || 'ذخیره مقاله انجام نشد');
        setArticles(articles.map((a) => (a.id === editingArticle.id ? updated : a)));
      } else {
        const res = await fetch('/api/admin/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            slug: payload.slug || payload.title.replace(/\s+/g, '-'),
          }),
        });
        const created = await res.json();
        if (!res.ok) throw new Error(created.error || 'ایجاد مقاله انجام نشد');
        setArticles([created, ...articles]);
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
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white">مدیریت مقالات و دانشنامه</h1>
            <p className="text-xs text-titanium-400 mt-1">
              افزودن، ویرایش و حذف مقالات تخصصی، دسته‌بندی‌ها و تصاویر گالری
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
              <span>افزودن مقاله جدید</span>
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
                  <th className="py-3 px-4">عنوان مقاله</th>
                  <th className="py-3 px-4">دسته‌بندی</th>
                  <th className="py-3 px-4">تاریخ</th>
                  <th className="py-3 px-4">نویسنده</th>
                  <th className="py-3 px-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-titanium-500">
                      در حال بارگذاری مقالات...
                    </td>
                  </tr>
                ) : articles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-titanium-500">
                      مقاله‌ای ثبت نشده است.
                    </td>
                  </tr>
                ) : (
                  articles.map((a) => (
                    <tr key={a.id} className="hover:bg-charcoal-850/50 transition-colors">
                      <td className="py-2 px-4">
                        <div className="w-12 h-12 rounded-lg bg-charcoal-800 overflow-hidden">
                          {a.image ? (
                            <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-titanium-500">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-white max-w-xs truncate">
                        {a.title}
                      </td>
                      <td className="py-3 px-4 text-bronze-400">{a.category}</td>
                      <td className="py-3 px-4 font-mono">{a.date}</td>
                      <td className="py-3 px-4">{a.author}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(a)}
                            className="p-1.5 rounded-lg bg-charcoal-800 text-titanium-300 hover:text-white"
                            title="ویرایش"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(a.id)}
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
          <div className="bg-charcoal-900 border border-charcoal-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-4">
              <h2 className="text-base font-bold text-white">
                {editingArticle ? 'ویرایش مقاله' : 'افزودن مقاله جدید'}
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
                <label className="text-titanium-300 block mb-1 font-medium">عنوان مقاله:</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  <label className="text-titanium-300 block mb-1 font-medium">نامک (Slug):</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="اختیاری (خودکار تولید می‌شود)"
                    className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono focus:border-bronze-500 focus:outline-none"
                  />
                </div>
              </div>

              <ImageUploadField
                label="تصویر شاخص مقاله"
                required
                value={form.image}
                onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
                hint="تصویر کاور مقاله با نسبت استاندارد ۱۶:۹ (افقی)"
                aspectRatioClass="aspect-video"
              />

              <MultiImageUpload
                label="گالری تصاویر مقاله (نامحدود)"
                images={form.images}
                onChange={(urls) => setForm((prev) => ({ ...prev, images: urls }))}
                hint="تصاویر تکمیلی مقاله جهت نمایش در انتهای مقاله و گالری لایت‌باکس"
                excludeImages={[form.image]}
              />

              <div>
                <label className="text-titanium-300 block mb-1 font-medium">خلاصه مقاله (Excerpt):</label>
                <textarea
                  rows={2}
                  required
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-titanium-300 block mb-1 font-medium">برچسب‌ها (با کاما جدا کنید):</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white focus:border-bronze-500 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-titanium-300 font-medium flex items-center gap-2">
                    <span>متن کامل مقاله:</span>
                    {contentImages.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-bronze-500/20 text-bronze-400 text-[10px] font-mono font-bold">
                        {contentImages.length} تصویر درج‌شده
                      </span>
                    )}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => contentFileInputRef.current?.click()}
                      disabled={contentUploading}
                      className="text-[11px] text-bronze-400 hover:text-bronze-300 flex items-center gap-1.5 bg-bronze-500/10 hover:bg-bronze-500/20 px-2.5 py-1 rounded-lg border border-bronze-500/30 transition-colors"
                      title="آپلود تصویر و قرارگیری در متن مقاله"
                    >
                      {contentUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      <span>{contentUploading ? 'درحال آپلود...' : 'افزودن تصویر به متن مقاله'}</span>
                    </button>
                    <input
                      ref={contentFileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={handleContentImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="rounded-t-xl border border-charcoal-700 bg-charcoal-900 p-3 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-titanium-500 font-semibold ml-1">سبک متن</span>
                    <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => runEditorCommand('formatBlock', 'p')}
                      title="متن عادی" aria-label="متن عادی" className="h-9 px-3 rounded-lg border border-charcoal-600 bg-charcoal-800 text-titanium-200 hover:bg-charcoal-700 text-xs">متن عادی</button>
                    <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => runEditorCommand('formatBlock', 'h1')}
                      title="عنوان اصلی — بزرگ‌ترین تیتر مقاله" aria-label="عنوان ۱" className="h-9 px-3 rounded-lg border border-bronze-500/50 bg-bronze-500/15 text-bronze-300 hover:bg-bronze-500/25 text-sm font-bold">عنوان ۱</button>
                    <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => runEditorCommand('formatBlock', 'h2')}
                      title="عنوان بخش — برای تیترهای اصلی داخل مقاله" aria-label="عنوان ۲" className="h-9 px-3 rounded-lg border border-charcoal-600 bg-charcoal-800 text-white hover:bg-charcoal-700 text-base font-bold">عنوان ۲</button>
                    <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => runEditorCommand('formatBlock', 'h3')}
                      title="زیرعنوان — برای بخش‌های کوچک‌تر" aria-label="عنوان ۳" className="h-9 px-3 rounded-lg border border-charcoal-600 bg-charcoal-800 text-titanium-200 hover:bg-charcoal-700 text-sm font-semibold">عنوان ۳</button>
                    <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => runEditorCommand('formatBlock', 'blockquote')}
                      title="نقل‌قول" aria-label="نقل قول" className="h-9 px-3 rounded-lg border border-charcoal-600 bg-charcoal-800 text-titanium-200 hover:bg-charcoal-700 text-xs">❝ نقل‌قول</button>
                  </div>
                  <div className="h-px bg-charcoal-700" />
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-titanium-500 font-semibold ml-1">قالب‌بندی</span>
                    {editorToolbarButton('B ضخیم', 'bold')}
                    {editorToolbarButton('I مورب', 'italic')}
                    {editorToolbarButton('U زیرخط', 'underline')}
                    {editorToolbarButton('S خط‌خورده', 'strikeThrough')}
                    <span className="mx-1 h-6 w-px bg-charcoal-700" />
                    {editorToolbarButton('• فهرست', 'insertUnorderedList')}
                    {editorToolbarButton('1. شماره‌دار', 'insertOrderedList')}
                    {editorToolbarButton('⇥ تورفتگی', 'indent')}
                    {editorToolbarButton('⇤ کاهش تورفتگی', 'outdent')}
                    <span className="mx-1 h-6 w-px bg-charcoal-700" />
                    {editorToolbarButton('راست‌چین', 'justifyRight')}
                    {editorToolbarButton('وسط‌چین', 'justifyCenter')}
                    {editorToolbarButton('چپ‌چین', 'justifyLeft')}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-titanium-500 font-semibold ml-1">ابزارهای بیشتر</span>
                    <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => {
                      const url = window.prompt('آدرس کامل لینک را وارد کنید:');
                      if (url) runEditorCommand('createLink', url);
                    }} title="افزودن لینک به متن انتخاب‌شده" className="h-8 px-2.5 rounded-lg border border-charcoal-600 bg-charcoal-800 hover:bg-charcoal-700 text-titanium-200 text-xs">افزودن لینک</button>
                    {editorToolbarButton('حذف لینک', 'unlink')}
                    {editorToolbarButton('خط جداکننده', 'insertHorizontalRule')}
                    {editorToolbarButton('پاک‌کردن قالب', 'removeFormat')}
                    <span className="mx-1 h-6 w-px bg-charcoal-700" />
                    {editorToolbarButton('↶ بازگشت', 'undo')}
                    {editorToolbarButton('↷ انجام دوباره', 'redo')}
                  </div>
                </div>
                <p className="text-[11px] text-titanium-500 mt-2 mb-1">متن را مستقیم ویرایش کنید؛ برای درج تصویر، نشانگر را در محل موردنظر قرار دهید. قالب‌بندی و فاصله خطوط در صفحه مقاله نیز حفظ می‌شود.</p>
                <div ref={contentEditorRef} contentEditable suppressContentEditableWarning role="textbox"
                  aria-label="متن کامل مقاله" aria-multiline="true" dir="auto"
                  onInput={(event) => {
                    const html = event.currentTarget.innerHTML;
                    setForm((prev) => ({ ...prev, content: html }));
                    saveContentSelection();
                  }}
                  onKeyUp={saveContentSelection} onMouseUp={saveContentSelection} onClick={saveContentSelection} onBlur={saveContentSelection}
                  className="w-full min-h-[360px] max-h-[65vh] overflow-y-auto p-5 rounded-b-xl bg-charcoal-850 border border-charcoal-700 text-white leading-8 focus:border-bronze-500 focus:outline-none whitespace-pre-wrap [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:my-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:my-5 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:my-4 [&_p]:my-3 [&_blockquote]:border-r-4 [&_blockquote]:border-bronze-500 [&_blockquote]:pr-4 [&_blockquote]:my-4 [&_blockquote]:text-titanium-300 [&_ul]:list-disc [&_ul]:pr-6 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pr-6 [&_ol]:my-3 [&_a]:text-bronze-400 [&_a]:underline [&_img]:max-w-full [&_img]:h-auto [&_figure]:my-6"
                  data-placeholder="متن مقاله را اینجا بنویسید..." />

                {/* List of embedded images with direct delete option */}
                {contentImages.length > 0 && (
                  <div className="mt-2.5 p-3 rounded-2xl bg-charcoal-950/90 border border-charcoal-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-titanium-300 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-bronze-400" />
                        <span>تصاویر درج‌شده در متن این مقاله ({contentImages.length}):</span>
                      </span>
                      <span className="text-[10px] text-titanium-500">
                        جهت حذف هر عکس از متن مقاله و سرور، دکمه «حذف تصویر» را بزنید
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                      {contentImages.map((imgUrl, idx) => {
                        const filename = imgUrl.split('/').pop() || imgUrl;
                        return (
                          <div
                            key={`${imgUrl}-${idx}`}
                            className="flex items-center gap-2.5 p-2 rounded-xl bg-charcoal-900 border border-charcoal-800 hover:border-charcoal-700 transition-colors"
                          >
                            <div className="w-14 h-12 rounded-lg bg-charcoal-950 overflow-hidden border border-charcoal-750 shrink-0">
                              <img
                                src={imgUrl}
                                alt="Article photo"
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex-1 min-w-0 text-right">
                              <p className="text-[11px] text-white font-mono truncate" dir="ltr" title={imgUrl}>
                                {filename}
                              </p>
                              <div className="flex items-center gap-1.5 mt-1.5">
                                <a
                                  href={imgUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] text-titanium-400 hover:text-white flex items-center gap-0.5 bg-charcoal-800 px-2 py-0.5 rounded transition-colors"
                                  title="مشاهده اندازه اصلی"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  <span>نمایش</span>
                                </a>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteContentImage(imgUrl)}
                                  className="text-[10px] text-rose-400 hover:text-rose-300 flex items-center gap-0.5 bg-rose-500/10 hover:bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/20 transition-colors mr-auto"
                                  title="حذف کامل این تصویر از متن مقاله و سرور"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  <span>حذف تصویر</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
                  className="px-5 py-2 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 font-bold shadow-md shadow-bronze-500/20"
                >
                  ذخیره اطلاعات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Category Manager Modal */}
      <CategoryManagerModal
        isOpen={catModalOpen}
        onClose={() => setCatModalOpen(false)}
        type="articles"
        categories={categories}
        onCategoriesChanged={() => {
          fetchCategories();
          fetchArticles();
        }}
      />
    </div>
  );
}
