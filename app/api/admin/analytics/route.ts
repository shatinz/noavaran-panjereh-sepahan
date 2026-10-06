import { NextResponse } from 'next/server';
import { getAnalyticsStats } from '@/lib/db';

export async function GET() {
  try {
    const stats = await getAnalyticsStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
