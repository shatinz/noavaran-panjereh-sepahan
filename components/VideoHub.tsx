'use client';

import React, { useState } from 'react';
import { VideoItem } from '@/lib/db';
import { extractVideoInfo } from '@/lib/video';
import { Play, Video, Search, Filter, X, ExternalLink, Clock, Layers } from 'lucide-react';

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

  const getEmbedUrl = (v: VideoItem) => {
    const info = extractVideoInfo(v.videoUrl || v.videoId || '', v.platform);
    return info.embedUrl;
  };

  return (
    <div className="space-y-10">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-[3px] aluminum-surface border border-[#b5b8b5]">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#888] absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="جستجوی ویدیو یا موضوع..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 rounded-[3px] bg-white/40 border border-[#b5b8b5] text-xs text-[#1a1a1a] placeholder-[#999] focus:outline-none focus:border-[#888] transition-colors"
          />
        </div>

        {/* Category Clusters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-[3px] text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1a1a1a] text-white shadow-card'
                  : 'bg-white/30 text-[#555] hover:text-[#1a1a1a] border border-[#b5b8b5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 aluminum-surface rounded-[3px] border border-[#b5b8b5] text-[#888] text-sm">
          ویدیویی با این مشخصات یافت نشد.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((v) => (
            <div
              key={v.id}
              onClick={() => setActiveVideo(v)}
              className="rounded-[3px] aluminum-surface border border-[#b5b8b5] hover:border-[#888] overflow-hidden cursor-pointer flex flex-col justify-between group shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative h-52 w-full bg-[#e0e0e0] overflow-hidden">
                <img
                  src={v.thumbnail || 'https://arvinpanjereh.com/upload/service/742b5647-017c-4a6e-b416-a184adf97dcc.webp'}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current mr-0.5" />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-[2px] bg-[#1a1a1a]/80 backdrop-blur-md text-[10px] font-mono text-white border border-white/10">
                    {v.platform === 'aparat' ? 'آپارات' : 'یوتیوب'}
                  </span>
                </div>

                {v.duration && (
                  <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-[2px] bg-[#1a1a1a]/90 text-[10px] font-mono text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {v.duration}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="p-5 space-y-2.5 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#1a1a1a]">{v.category}</span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#1a1a1a] group-hover:underline transition-colors line-clamp-2 leading-relaxed mt-1">
                    {v.title}
                  </h3>
                  <p className="text-[11px] text-[#555] line-clamp-3 leading-relaxed mt-2">
                    {v.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#b5b8b5] flex items-center justify-between text-[11px] text-[#1a1a1a] font-semibold">
                  <span>پخش ویدیو و توضیحات</span>
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="aluminum-surface border border-[#b5b8b5] rounded-[3px] max-w-3xl w-full overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#b5b8b5] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-[2px] bg-[#1a1a1a] text-white text-xs font-medium">
                  {activeVideo.category}
                </span>
                <span className="text-xs text-[#888] font-mono">
                  {activeVideo.platform === 'aparat' ? 'Aparat Embed' : 'YouTube Embed'}
                </span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-[3px] bg-white/30 text-[#555] hover:text-[#1a1a1a] border border-[#b5b8b5]"
                aria-label="بستن"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Responsive Video Frame (16:9) */}
            <div className="relative w-full pb-[56.25%] bg-black">
              <iframe
                src={getEmbedUrl(activeVideo)}
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-[#1a1a1a] leading-snug">
                {activeVideo.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#555] leading-relaxed text-justify">
                {activeVideo.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-[#888] border-t border-[#b5b8b5]">
                <span className="font-mono">مدت زمان: {activeVideo.duration || '—'}</span>
                {activeVideo.videoUrl && (
                  <a
                    href={activeVideo.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[#1a1a1a] hover:underline font-bold"
                  >
                    <span>مشاهده در {activeVideo.platform === 'aparat' ? 'وب‌سایت آپارات' : 'وب‌سایت یوتیوب'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
