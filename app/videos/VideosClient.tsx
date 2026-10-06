"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { VideoItem } from '@/lib/db';
import { extractVideoInfo } from '@/lib/video';
import { FilterChips } from '@/components/ui/FilterChips';
import { Search, Play, X, Clock, ExternalLink } from 'lucide-react';

export function VideosClient({ videos }: { videos: VideoItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const rawCats = Array.from(new Set(videos.map(v => v.category)));
  const categories = [
    { id: 'all', label: `همه ویدیوها (${videos.length})` },
    ...rawCats.map(c => ({ id: c, label: c }))
  ];

  const filtered = videos.filter(v => {
    const matchCat = activeCategory === 'all' || v.category === activeCategory;
    const matchSearch = v.title.includes(searchQuery) || v.description.includes(searchQuery);
    return matchCat && matchSearch;
  });

  useEffect(() => {
    if (activeVideo) {
      document.body.classList.add('video-modal-open');
    } else {
      document.body.classList.remove('video-modal-open');
    }
    return () => {
      document.body.classList.remove('video-modal-open');
    };
  }, [activeVideo]);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-12 space-y-12" dir="rtl">
      
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-ink-950 border border-ink-800 rounded-xl p-4 metal-shadow">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-steel-400 absolute right-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="جستجوی عنوان یا موضوع ویدیو..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-ink-900 border border-ink-800 rounded-lg pr-12 pl-4 py-3 text-white focus:border-signal-500 focus:outline-none transition-colors font-vazir text-sm"
          />
        </div>
        <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <FilterChips 
            categories={categories} 
            activeCategory={activeCategory} 
            onChange={setActiveCategory} 
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(v => {
          const info = extractVideoInfo(v.videoUrl || v.videoId || '', v.platform);
          return (
            <button
              key={v.id}
              onClick={() => setActiveVideo(v)}
              className="group bg-ink-950 border border-ink-800 rounded-xl overflow-hidden metal-shadow hover:border-signal-500/50 transition-colors flex flex-col text-right h-full text-right"
            >
              <div className="relative aspect-video w-full bg-ink-900 overflow-hidden">
                <Image
                  src={info.thumbnail || v.thumbnail || '/images/catalog/th68_render.jpg'}
                  alt={v.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-signal-500/90 rounded-full flex items-center justify-center text-white backdrop-blur shadow-[0_0_20px_rgba(171,0,23,0.5)] group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 ml-1" />
                  </div>
                </div>
                {v.duration && (
                  <div className="absolute bottom-3 left-3 bg-ink-950/90 text-white text-[10px] font-mono px-2 py-1 rounded backdrop-blur flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {v.duration}
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="mb-2 inline-flex">
                  <span className="text-[10px] font-bold text-signal-500 bg-signal-500/10 px-2 py-1 rounded">
                    {v.category}
                  </span>
                </div>
                <h3 className="text-base font-black text-white font-vazir mb-2 group-hover:text-signal-500 transition-colors">
                  {v.title}
                </h3>
                <p className="text-xs text-steel-400 font-vazir leading-relaxed line-clamp-2 mt-auto">
                  {v.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 bg-ink-950 rounded-xl border border-ink-800 metal-shadow">
          <p className="text-steel-400 font-vazir">هیچ ویدیویی با این مشخصات یافت نشد.</p>
        </div>
      )}

      {/* Video Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-[100] bg-[#0a0002]/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="w-full max-w-5xl bg-ink-950 border border-ink-800 rounded-2xl overflow-hidden metal-shadow flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-ink-800 flex justify-between items-center bg-ink-900">
              <h3 className="text-base font-black text-white font-vazir">{activeVideo.title}</h3>
              <button 
                onClick={() => setActiveVideo(null)}
                className="p-2 bg-ink-950 text-steel-400 hover:text-white hover:bg-signal-500 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="aspect-video w-full bg-black relative">
              {extractVideoInfo(activeVideo.videoUrl || activeVideo.videoId || '', activeVideo.platform).embedUrl ? (
                <iframe
                  src={extractVideoInfo(activeVideo.videoUrl || activeVideo.videoId || '', activeVideo.platform).embedUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-none"
                  title={activeVideo.title}
                />
              ) : (
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <div className="p-6 md:p-8 bg-ink-950 text-right space-y-4">
              <div className="inline-block px-3 py-1 bg-signal-500/10 text-signal-500 text-xs font-bold rounded-lg border border-signal-500/20">
                {activeVideo.category}
              </div>
              <p className="text-sm text-steel-300 font-vazir leading-relaxed text-justify max-w-4xl">
                {activeVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
