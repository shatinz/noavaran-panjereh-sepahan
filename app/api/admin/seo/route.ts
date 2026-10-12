import { NextResponse } from 'next/server';
import { getSearchConsole } from '@/lib/gsc';

export const dynamic = 'force-dynamic';

// Admin-only (protected by middleware). `?refresh=1` bypasses the 30 minute cache.
export async function GET(request: Request) {
  const force = new URL(request.url).searchParams.get('refresh') === '1';
  const result = await getSearchConsole({ force });
  return NextResponse.json(result);
}
