import { NextResponse } from 'next/server';
import { getAnalyticsSummary } from '@/lib/analytics-store';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const summary = await getAnalyticsSummary();
    return NextResponse.json(summary);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
