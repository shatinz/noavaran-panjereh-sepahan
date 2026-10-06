import { NextResponse } from 'next/server';
import { recordPageView } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path, title, isMobile } = body;

    // Reject admin URLs or API calls from inflating public visit metrics
    if (!path || path.startsWith('/admin') || path.startsWith('/api')) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const updated = await recordPageView(path, title, isMobile);
    return NextResponse.json({ ok: true, totalVisits: updated.totalVisits });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
