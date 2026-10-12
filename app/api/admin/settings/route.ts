import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/db';

// Never prerender: these handlers read/write live data and must run on every request.
export const dynamic = 'force-dynamic';

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  try {
    const updates = await request.json();
    const updated = await updateSettings(updates);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
