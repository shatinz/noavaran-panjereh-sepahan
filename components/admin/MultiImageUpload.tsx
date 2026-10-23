'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  ChevronUp,
  ChevronDown,
  Plus,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Link as LinkIcon,
} from 'lucide-react';

interface MultiImageUploadProps {
  label: string;
  images: string[];
  onChange: (urls: string[]) => void;
  hint?: string;
  excludeImages?: string[]; // e.g. cover image to avoid adding as duplicate
}

interface UploadingItem {
  id: string;
  name: string;
  previewUrl: string;
  progress: number;
  status: 'compressing' | 'uploading' | 'done' | 'error';
  error?: string;
}

// Client-side image downscale / compression
async function compressImageFile(file: File): Promise<File> {
  if (file.type === 'image/gif' || file.size < 400 * 1024) return file;
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const maxDim = 1920;
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      } else if (file.size < 1.5 * 1024 * 1024) {
        return resolve(file);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(file);
      ctx.drawImage(img, 0, 0, width, height);

      // Preserve PNG format to keep transparent alpha channel intact
      const isPng = file.type === 'image/png';
      const targetMime = isPng ? 'image/png' : 'image/webp';
      const ext = isPng ? '.png' : '.webp';
      const quality = isPng ? undefined : 0.85;

      canvas.toBlob(
        (blob) => {
          if (blob && blob.size > 0 && blob.size < file.size) {
            const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, ext), {
              type: targetMime,
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        },
        targetMime,
        quality
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };
    img.src = objectUrl;
  });
}

function normalizeUrl(url: string): string {
  return url.trim().split('?')[0].split('#')[0].toLowerCase();
}

export default function MultiImageUpload({
  label,
  images = [],
  onChange,
  hint,
  excludeImages = [],
}: MultiImageUploadProps) {
  const [uploadingQueue, setUploadingQueue] = useState<UploadingItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [manualUrl, setManualUrl] = useState('');
  const [showManualUrl, setShowManualUrl] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef(images);
  const createdObjectUrlsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  // Clean up all object URLs on unmount
  useEffect(() => {
    return () => {
      createdObjectUrlsRef.current.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {}
      });
      createdObjectUrlsRef.current.clear();
    };
  }, []);

  const existingNorms = new Set([
    ...images.map(normalizeUrl),
    ...excludeImages.map(normalizeUrl),
  ]);

  const showToast = (msg: string, isError = false) => {
    if (isError) {
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(''), 5000);
    } else {
      setSuccessMessage(msg);
      setTimeout(() => setSuccessMessage(''), 4000);
    }
  };

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    const validFiles: File[] = [];
    for (const file of fileArray) {
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
        showToast(`فرمت فایل ${file.name} مجاز نیست.`, true);
        continue;
      }
      if (file.size > 15 * 1024 * 1024) {
        showToast(`حجم تصویر ${file.name} بیشتر از ۱۵ مگابایت است.`, true);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    // Create queue items
    const newQueueItems: UploadingItem[] = validFiles.map((file) => {
      const pUrl = URL.createObjectURL(file);
      createdObjectUrlsRef.current.add(pUrl);
      return {
        id: `up-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: file.name,
        previewUrl: pUrl,
        progress: 10,
        status: 'compressing',
      };
    });

    setUploadingQueue((prev) => [...prev, ...newQueueItems]);

    // Concurrency limit = 3
    const concurrency = 3;
    let nextIndex = 0;
    const uploadedUrls: string[] = [];

    const uploadWorker = async () => {
      while (nextIndex < validFiles.length) {
        const currentIndex = nextIndex++;
        const file = validFiles[currentIndex];
        const queueItem = newQueueItems[currentIndex];

        try {
          // 1. Compress
          const readyFile = await compressImageFile(file);
          setUploadingQueue((prev) =>
            prev.map((q) => (q.id === queueItem.id ? { ...q, status: 'uploading', progress: 40 } : q))
          );

          // 2. Upload with 30s timeout
          const formData = new FormData();
          formData.append('file', readyFile);

          const res = await fetch('/api/admin/upload', {
            method: 'POST',
            body: formData,
            signal: AbortSignal.timeout(30000),
          });

          const data = await res.json();
          if (res.ok && data.url) {
            const newUrl = data.url;
            const norm = normalizeUrl(newUrl);

            // Deduplication check
            if (!existingNorms.has(norm)) {
              existingNorms.add(norm);
              uploadedUrls.push(newUrl);
            }

            setUploadingQueue((prev) =>
              prev.map((q) => (q.id === queueItem.id ? { ...q, status: 'done', progress: 100 } : q))
            );
          } else {
            setUploadingQueue((prev) =>
              prev.map((q) =>
                q.id === queueItem.id
                  ? { ...q, status: 'error', error: data.error || 'خطا در آپلود' }
                  : q
              )
            );
          }
        } catch (err: any) {
          const isTimeout = err?.name === 'TimeoutError' || err?.message?.includes('timeout');
          setUploadingQueue((prev) =>
            prev.map((q) =>
              q.id === queueItem.id
                ? { ...q, status: 'error', error: isTimeout ? 'وقفه زمانی سرور' : 'خطای شبکه' }
                : q
            )
          );
        }
      }
    };

    const workers = Array.from({ length: Math.min(concurrency, validFiles.length) }, () =>
      uploadWorker()
    );
    await Promise.all(workers);

    if (uploadedUrls.length > 0) {
      onChange([...imagesRef.current, ...uploadedUrls]);
      showToast(`${uploadedUrls.length} تصویر با موفقیت به گالری اضافه شد.`);
    }

    // Clean up queue after 1.5 seconds and revoke completed preview URLs
    setTimeout(() => {
      newQueueItems.forEach((item) => {
        try {
          URL.revokeObjectURL(item.previewUrl);
          createdObjectUrlsRef.current.delete(item.previewUrl);
        } catch {}
      });
      setUploadingQueue((prev) => prev.filter((q) => q.status !== 'done'));
    }, 1500);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddManualUrl = () => {
    if (!manualUrl.trim()) return;
    const url = manualUrl.trim();
    const norm = normalizeUrl(url);

    if (existingNorms.has(norm)) {
      showToast('این تصویر قبلاً در گالری یا به عنوان تصویر اصلی اضافه شده است.', true);
      return;
    }

    existingNorms.add(norm);
    onChange([...images, url]);
    setManualUrl('');
    setShowManualUrl(false);
    showToast('تصویر به گالری افزوده شد.');
  };

  const handleRemove = async (index: number) => {
    const targetUrl = images[index];
    const newImages = images.filter((_, idx) => idx !== index);
    onChange(newImages);

    // If local file, clean up from server
    if (targetUrl && targetUrl.startsWith('/uploads/')) {
      try {
        await fetch(`/api/admin/upload?url=${encodeURIComponent(targetUrl)}`, {
          method: 'DELETE',
        });
      } catch (err) {
        console.error('Failed to delete upload file:', err);
      }
    }
  };

  const moveItem = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    const reordered = [...images];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    onChange(reordered);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-titanium-300 flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-bronze-400" />
          <span>{label}</span>
          <span className="text-[11px] text-bronze-400 font-mono">({images.length} تصویر)</span>
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowManualUrl(!showManualUrl)}
            className="text-[11px] text-titanium-400 hover:text-bronze-400 flex items-center gap-1 transition-colors"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showManualUrl ? 'بستن افزودن لینک' : 'افزودن لینک مستقیم'}</span>
          </button>
        </div>
      </div>

      {hint && <p className="text-[11px] text-titanium-500">{hint}</p>}

      {errorMessage && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Manual URL Input */}
      {showManualUrl && (
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-charcoal-950 border border-charcoal-800">
          <input
            type="text"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="آدرس اینترنتی تصویر (https://... یا /uploads/...)"
            className="flex-1 p-2 rounded-xl bg-charcoal-850 border border-charcoal-700 text-white font-mono text-xs focus:border-bronze-500 focus:outline-none"
            dir="ltr"
          />
          <button
            type="button"
            onClick={handleAddManualUrl}
            className="px-3 py-2 rounded-xl bg-bronze-500 hover:bg-bronze-400 text-charcoal-950 font-bold text-xs shrink-0"
          >
            افزودن
          </button>
        </div>
      )}

      {/* Hidden Multi-file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        className="hidden"
      />

      {/* Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
          if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-bronze-400 bg-bronze-500/10'
            : 'border-charcoal-700 hover:border-bronze-500/60 bg-charcoal-950/60'
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-charcoal-800 flex items-center justify-center text-bronze-400">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-titanium-200">
            برای افزودن عکس به گالری، فایل‌ها را اینجا بکشید یا کلیک کنید
          </p>
          <p className="text-[10px] text-titanium-400">
            انتخاب همزمان نامحدود عکس (JPG, PNG, WebP) با فشرده‌سازی خودکار و بارگذاری سریع موازی
          </p>
        </div>
      </div>

      {/* Uploading Queue items */}
      {uploadingQueue.length > 0 && (
        <div className="space-y-2 pt-2">
          <span className="text-[11px] text-titanium-400 font-medium">در حال پردازش و آپلود:</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {uploadingQueue.map((item) => (
              <div
                key={item.id}
                className="relative rounded-xl overflow-hidden bg-charcoal-950 border border-charcoal-800 p-2 space-y-1.5"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-charcoal-900">
                  <img src={item.previewUrl} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-charcoal-950/70 flex items-center justify-center">
                    {item.status === 'compressing' && (
                      <span className="text-[10px] text-bronze-400 font-bold">فشرده‌سازی...</span>
                    )}
                    {item.status === 'uploading' && (
                      <Loader2 className="w-5 h-5 text-bronze-400 animate-spin" />
                    )}
                    {item.status === 'done' && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    )}
                    {item.status === 'error' && (
                      <span className="text-[10px] text-rose-400 font-bold">{item.error}</span>
                    )}
                  </div>
                </div>
                <div className="w-full bg-charcoal-800 rounded-full h-1 overflow-hidden">
                  <div
                    className="bg-bronze-500 h-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Existing Images Gallery Grid */}
      {images.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((url, idx) => (
              <div
                key={`${url}-${idx}`}
                className="relative group rounded-xl overflow-hidden bg-charcoal-950 border border-charcoal-800 aspect-[4/3] shadow-md"
              >
                <img
                  src={url}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-charcoal-950/80 backdrop-blur-sm text-[10px] font-mono text-white">
                  #{idx + 1}
                </div>

                {/* Hover overlay with action buttons */}
                <div className="absolute inset-0 bg-charcoal-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {idx > 0 && (
                        <button
                          type="button"
                          onClick={() => moveItem(idx, idx - 1)}
                          className="p-1 rounded bg-charcoal-800 hover:bg-charcoal-700 text-titanium-200"
                          title="انتقال به جلو"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {idx < images.length - 1 && (
                        <button
                          type="button"
                          onClick={() => moveItem(idx, idx + 1)}
                          className="p-1 rounded bg-charcoal-800 hover:bg-charcoal-700 text-titanium-200"
                          title="انتقال به عقب"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemove(idx)}
                      className="p-1 rounded bg-rose-500/20 hover:bg-rose-500/40 text-rose-400"
                      title="حذف از گالری"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[10px] font-mono text-titanium-300 truncate text-left" dir="ltr">
                    {url}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
