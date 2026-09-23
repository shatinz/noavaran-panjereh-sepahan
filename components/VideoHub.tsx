'use client';

import React, { useState } from 'react';
import { VideoItem } from '@/lib/db';
import { extractVideoInfo } from '@/lib/video';
import { Play, Video, Search, Filter, X, ExternalLink, Clock, Layers, QrCode, Download } from 'lucide-react';

interface Props {
  videos: VideoItem[];
}

export default function VideoHub({ videos }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // Extract unique categories
  const categories = ['همه', ...Array.from(new Set(videos.map((v) => v.category)))];

  const filtered = videos.filter((v) => {
    const matchesCategory = selectedCategory === 'همه' || v.category === selectedCategory;
    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getVideoDetails = (v: VideoItem) => {
    return extractVideoInfo(v.videoUrl || v.videoId || '', v.platform);
  };

  return (
    <div className="space-y-6">
      {/* Search & Category Filter Bar */}
      <div className="aluminum-card sharp frame-shadow p-3 sm:p-4 border border-[#b0b3b0] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#555] absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="جستجوی ویدیو یا موضوع..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-3 pr-9 py-2 sharp bg-white text-xs border border-[#888] focus:border-black outline-none frame-shadow text-right font-medium"
          />
        </div>

        {/* Category Clusters */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`sharp px-3 py-1.5 text-xs font-black whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#18191a] text-white border-black shadow-sm'
                  : 'bg-[#cbcccb] text-black border-[#888] hover:bg-[#b8bab8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Videos */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center text-[#555] text-xs aluminum-card sharp frame-shadow border border-[#b0b3b0]">
          ویدیویی با این مشخصات یافت نشد.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((v) => {
            const isDirect = v.platform === 'direct' || v.videoUrl?.toLowerCase().endsWith('.m4v') || v.videoUrl?.toLowerCase().endsWith('.mp4');
            return (
              <div
                key={v.id}
                onClick={() => setActiveVideo(v)}
                className="aluminum-card sharp frame-shadow p-3 border border-[#b0b3b0] flex flex-col justify-between group cursor-pointer text-right hover:border-black transition-colors"
              >
                {/* Thumbnail Container */}
                <div className="relative h-48 w-full bg-white sharp overflow-hidden border border-[#9ea19e] flex items-center justify-center frame-shadow">
                  <img
                    src={v.thumbnail || 'https://arvinpanjereh.com/upload/service/742b5647-017c-4a6e-b416-a184adf97dcc.webp'}
                    alt={v.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/35 transition-colors">
                    <div className="w-11 h-11 sharp bg-[#18191a] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform border border-black">
                      <Play className="w-5 h-5 fill-current text-[#cbcccb] mr-0.5" />
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-2 right-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 sharp bg-black text-white text-[10px] font-mono font-bold">
                      {isDirect ? 'انیمیشن مقاطع مهندسی' : v.platform === 'aparat' ? 'آپارات' : 'یوتیوب'}
                    </span>
                  </div>

                  {v.qrImage && (
                    <div className="absolute top-2 left-2 bg-white p-1 sharp shadow border border-black">
                      <img src={v.qrImage} alt="QR Code" className="w-7 h-7 object-contain" />
                    </div>
                  )}

                  {v.duration && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 sharp bg-black/80 text-[10px] font-mono text-white flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {v.duration}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="pt-3 space-y-2 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#444] block">{v.category}</span>
                    <h3 className="text-xs sm:text-sm font-black text-black group-hover:text-black transition-colors line-clamp-1 leading-snug mt-0.5">
                      {v.title}
                    </h3>
                    <p className="text-[11px] text-[#333] line-clamp-2 leading-relaxed mt-1 font-medium">
                      {v.description}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-[#a8aba8] flex items-center justify-between text-[11px] text-black font-black">
                    <span>پخش انیمیشن و ویدیو</span>
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Video Modal Player */}
      {activeVideo && (() => {
        const isDirect = activeVideo.platform === 'direct' || activeVideo.videoUrl?.toLowerCase().endsWith('.m4v') || activeVideo.videoUrl?.toLowerCase().endsWith('.mp4');
        const details = getVideoDetails(activeVideo);

        return (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="aluminum-card sharp frame-shadow max-w-3xl w-full border border-black overflow-hidden flex flex-col text-right"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-3 sm:p-4 border-b border-[#a8aba8] bg-[#cbcccb] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 sharp bg-black text-white text-xs font-bold font-mono">
                    {activeVideo.category}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-black line-clamp-1">
                    {activeVideo.title}
                  </span>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1 text-black hover:bg-black/20 sharp transition-colors"
                  aria-label="بستن"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                {isDirect ? (
                  <video
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                    src={activeVideo.videoUrl}
                  >
                    مرورگر شما از پخش مستقیم ویدیو پشتیبانی نمی‌کند.
                  </video>
                ) : details.embedUrl ? (
                  <iframe
                    src={details.embedUrl}
                    title={activeVideo.title}
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="text-white text-xs">پخش‌کننده ویدیو بارگذاری نشد.</div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-[#cbcccb] border-t border-[#a8aba8] space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xs font-black text-black">
                      {activeVideo.title}
                    </h3>
                    <p className="text-[11px] text-[#333] mt-1 font-medium leading-relaxed max-w-xl">
                      {activeVideo.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isDirect && activeVideo.videoUrl && (
                      <a
                        href={activeVideo.videoUrl}
                        download
                        className="sharp px-3 py-1.5 bg-[#18191a] hover:bg-[#333] text-white text-xs font-bold flex items-center gap-1.5 border border-black shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>دانلود فایل ویدیو</span>
                      </a>
                    )}
                    {activeVideo.videoUrl && !isDirect && (
                      <a
                        href={activeVideo.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="sharp px-3 py-1.5 bg-white text-black hover:bg-gray-100 text-xs font-bold flex items-center gap-1.5 border border-black"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>مشاهده در {activeVideo.platform}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
