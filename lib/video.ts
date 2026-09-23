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

export function extractVideoInfo(url: string, platform: 'aparat' | 'youtube' | 'direct') {
  if (platform === 'direct' || url.toLowerCase().endsWith('.m4v') || url.toLowerCase().endsWith('.mp4')) {
    return {
      videoId: '',
      isDirect: true,
      directUrl: url,
      embedUrl: url,
      thumbnail: '',
    };
  }

  if (platform === 'youtube') {
    let videoId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
    return {
      videoId,
      isDirect: false,
      directUrl: '',
      embedUrl: videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : url,
      thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '',
    };
  } else {
    // Aparat: https://www.aparat.com/v/k450123 or aparat.com/v/XYZ
    let videoId = '';
    const match = url.match(/aparat\.com\/v\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      videoId = match[1];
    } else {
      videoId = url.trim();
    }
    return {
      videoId,
      isDirect: false,
      directUrl: '',
      embedUrl: videoId ? `https://www.aparat.com/video/video/embed/videohash/${videoId}/vt/frame` : url,
      thumbnail: '',
    };
  }
}
