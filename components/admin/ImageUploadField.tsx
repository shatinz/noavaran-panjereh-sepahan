'use client';

import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Trash2, RefreshCw, ExternalLink, Link as LinkIcon, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  hint?: string;
  aspectRatioClass?: string;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  required = false,
  hint,
  aspectRatioClass = 'aspect-[4/3]',
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setErrorMessage('');

    // Client-side file type verification
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('فرمت فایل نامعتبر است. لطفاً فقط تصاویر JPG، PNG، WebP یا GIF انتخاب نمایید.');
      return;
    }

    // Client-side file size verification (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('حجم تصویر بیشتر از ۱۰ مگابایت است. لطفاً تصویری با حجم کمتر انتخاب کنید.');
      return;
    }

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
        onChange(data.url);
      } else {
        setErrorMessage(data.error || 'خطا در بارگذاری تصویر روی سرور');
      }
    } catch (err) {
      console.error('Upload request error:', err);
      setErrorMessage('خطای شبکه در ارسال تصویر به سرور');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentUrl = value;
    onChange('');
    setErrorMessage('');

    // If the image was uploaded locally to /uploads/, remove it from server storage
    if (currentUrl && currentUrl.startsWith('/uploads/')) {
      try {
        await fetch(`/api/admin/upload?url=${encodeURIComponent(currentUrl)}`, {
          method: 'DELETE',
        });
      } catch (err) {
        console.error('Failed to delete file from server:', err);
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-titanium-300 flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-rose-500">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-titanium-400 hover:text-bronze-400 flex items-center gap-1 transition-colors"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? 'بستن آدرس اینترنتی' : 'وارد کردن لینک / URL مستقیم'}</span>
        </button>
      </div>

      {hint && <p className="text-[11px] text-titanium-500">{hint}</p>}

      {errorMessage && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploading}
      />

      {/* Upload Zone / Preview Area */}
      {value ? (
        <div className="relative group rounded-2xl bg-charcoal-950 border border-charcoal-700/80 p-3 overflow-hidden shadow-inner">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Preview Image */}
            <div className={`relative ${aspectRatioClass} w-full sm:w-44 bg-charcoal-900 rounded-xl overflow-hidden border border-charcoal-700/60 shrink-0`}>
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={() => {
                  setErrorMessage('تصویر بارگذاری‌شده در این آدرس قابل مشاهده نیست.');
                }}
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-charcoal-950/80 backdrop-blur-sm border border-emerald-500/40 text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>آماده</span>
              </div>
            </div>

            {/* Info and Action Buttons */}
            <div className="flex-1 w-full space-y-3 text-right">
              <div className="space-y-1">
                <span className="text-[11px] text-titanium-400 block font-medium">مسیر فایل:</span>
                <p className="text-xs font-mono text-titanium-200 bg-charcoal-900/90 border border-charcoal-800 rounded-lg px-2.5 py-1.5 truncate text-left" dir="ltr">
                  {value}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-3 py-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700 text-titanium-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isUploading ? 'animate-spin' : ''}`} />
                  <span>{isUploading ? 'درحال آپلود...' : 'تغییر تصویر'}</span>
                </button>

                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700 text-titanium-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>مشاهده اندازه اصلی</span>
                </a>

                <button
                  type="button"
                  onClick={handleRemove}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-colors mr-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>حذف</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-6 transition-all duration-200 cursor-pointer text-center flex flex-col items-center justify-center gap-3 ${
            isDragging
              ? 'border-bronze-500 bg-bronze-500/10 text-bronze-300 scale-[1.01]'
              : 'border-charcoal-700 hover:border-bronze-500/70 bg-charcoal-950/70 hover:bg-charcoal-900/60 text-titanium-400 hover:text-titanium-200'
          }`}
        >
          {isUploading ? (
            <div className="py-4 flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-bronze-500 animate-spin" />
              <span className="text-xs font-bold text-white">در حال آپلود و ذخیره فایل بر روی سرور...</span>
              <span className="text-[11px] text-titanium-400">لطفاً چند لحظه شکیبا باشید</span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-charcoal-850 border border-charcoal-750 flex items-center justify-center text-bronze-400 shadow-md">
                <Upload className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-white">
                  تصویر را اینجا بکشید یا برای <span className="text-bronze-400 underline decoration-dotted">انتخاب فایل از دستگاه</span> کلیک کنید
                </p>
                <p className="text-[11px] text-titanium-500">
                  فرمت‌های مجاز: JPG، PNG، WebP، GIF (حداکثر ۱۰ مگابایت)
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Direct URL input fallback */}
      {showUrlInput && (
        <div className="pt-2 animate-in fade-in duration-200">
          <label className="text-[11px] text-titanium-400 block mb-1">
            آدرس مستقیم اینترنتی تصویر (اختیاری):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              dir="ltr"
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setErrorMessage('');
              }}
              placeholder="https://... یا /uploads/..."
              className="flex-1 bg-charcoal-950 border border-charcoal-700 focus:border-bronze-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono text-left"
            />
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-3 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-titanium-400 text-xs"
              >
                پاک کردن
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
