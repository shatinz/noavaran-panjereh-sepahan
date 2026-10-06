import { NextResponse } from 'next/server';
import { getVideos, createVideo, updateVideo, deleteVideo } from '@/lib/db';
import { extractVideoInfo } from '@/lib/video';

export async function GET() {
  const videos = await getVideos();
  return NextResponse.json(videos);
}

async function resolveCover(url: string, platform: 'aparat' | 'youtube' | 'direct', currentThumbnail?: string) {
  if (currentThumbnail && currentThumbnail.trim()) {
    return currentThumbnail.trim();
  }

  const info = extractVideoInfo(url, platform);

  if (platform === 'youtube' && info.videoId) {
    return `https://img.youtube.com/vi/${info.videoId}/hqdefault.jpg`;
  }

  if (info.videoId) {
    try {
      const res = await fetch(`https://www.aparat.com/etc/api/video/videohash/${info.videoId}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const data = await res.json();
        const poster = data?.video?.big_poster || data?.video?.small_poster;
        if (poster) return poster;
      }
    } catch (e) {
      // Fallback
    }
  }

  return info.thumbnail || '/images/hero/hero-poster.webp';
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const platform = body.platform || 'aparat';
    const info = extractVideoInfo(body.videoUrl || '', platform);
    const resolvedThumbnail = await resolveCover(body.videoUrl || '', platform, body.thumbnail);

    const newVideo = {
      ...body,
      videoId: info.videoId || body.videoId,
      thumbnail: resolvedThumbnail,
    };
    const created = await createVideo(newVideo);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...updates } = await request.json();
    if (updates.videoUrl) {
      const platform = updates.platform || 'aparat';
      const info = extractVideoInfo(updates.videoUrl, platform);
      updates.videoId = info.videoId || updates.videoId;
      if (!updates.thumbnail) {
        updates.thumbnail = await resolveCover(updates.videoUrl, platform, updates.thumbnail);
      }
    }
    const updated = await updateVideo(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update video' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    const success = await deleteVideo(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
  }
}
