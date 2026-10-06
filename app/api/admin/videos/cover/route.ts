import { NextResponse } from 'next/server';
import { extractVideoInfo } from '@/lib/video';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get('url') || '';
    const platform = (searchParams.get('platform') as 'aparat' | 'youtube' | 'direct') || 'aparat';

    if (!videoUrl) {
      return NextResponse.json({ error: 'URL required' }, { status: 400 });
    }

    const info = extractVideoInfo(videoUrl, platform);

    if (platform === 'youtube' || videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      if (info.videoId) {
        return NextResponse.json({
          success: true,
          coverUrl: `https://img.youtube.com/vi/${info.videoId}/hqdefault.jpg`,
          source: 'youtube',
        });
      }
    }

    // Aparat native cover lookup
    if (info.videoId) {
      try {
        const res = await fetch(`https://www.aparat.com/etc/api/video/videohash/${info.videoId}`, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
          signal: AbortSignal.timeout(4000),
        });

        if (res.ok) {
          const data = await res.json();
          const poster = data?.video?.big_poster || data?.video?.small_poster || data?.video?.poster;
          if (poster) {
            return NextResponse.json({
              success: true,
              coverUrl: poster,
              source: 'aparat',
            });
          }
        }
      } catch (err) {
        // Fallback or network timeout
      }
    }

    // Default fallback cover if not found
    return NextResponse.json({
      success: true,
      coverUrl: info.thumbnail || '/images/hero/hero-poster.webp',
      source: 'fallback',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cover' }, { status: 500 });
  }
}
