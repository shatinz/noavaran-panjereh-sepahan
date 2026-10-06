export interface VideoItem {
  id: string;
  title: string;
  category: string;
  platform: 'aparat' | 'youtube' | 'direct';
  videoUrl: string;
  videoId?: string;
  duration?: string;
  thumbnail?: string;
  description: string;
  embedCode?: string;
  qrUrl?: string;
  qrImage?: string;
}

export function extractVideoInfo(url: string, platform?: 'aparat' | 'youtube' | 'direct') {
  if (!url) {
    return {
      videoId: '',
      isDirect: false,
      directUrl: '',
      embedUrl: '',
      thumbnail: '/images/hero/hero-poster.webp',
    };
  }

  const cleanUrl = url.trim();

  if (platform === 'youtube' || cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be')) {
    let videoId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = cleanUrl.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
    return {
      videoId,
      isDirect: false,
      directUrl: '',
      embedUrl: videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : cleanUrl,
      thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '',
    };
  }

  if (platform === 'direct' && (cleanUrl.toLowerCase().endsWith('.m4v') || cleanUrl.toLowerCase().endsWith('.mp4'))) {
    return {
      videoId: '',
      isDirect: true,
      directUrl: cleanUrl,
      embedUrl: cleanUrl,
      thumbnail: '',
    };
  }

  // Default: Aparat embed
  let videoId = '';
  const hashMatch = cleanUrl.match(/videohash\/([a-zA-Z0-9_-]+)/);
  const vMatch = cleanUrl.match(/aparat\.com\/v\/([a-zA-Z0-9_-]+)/);
  if (hashMatch && hashMatch[1]) {
    videoId = hashMatch[1];
  } else if (vMatch && vMatch[1]) {
    videoId = vMatch[1];
  } else {
    // Check if raw id was passed (e.g. "x64o5mg")
    const parts = cleanUrl.split('/');
    const lastPart = parts[parts.length - 1].replace(/\?.*$/, '');
    if (lastPart && /^[a-zA-Z0-9_-]+$/.test(lastPart)) {
      videoId = lastPart;
    } else {
      videoId = cleanUrl;
    }
  }

  return {
    videoId,
    isDirect: false,
    directUrl: '',
    embedUrl: videoId ? `https://www.aparat.com/video/video/embed/videohash/${videoId}/vt/frame` : cleanUrl,
    thumbnail: '',
  };
}
