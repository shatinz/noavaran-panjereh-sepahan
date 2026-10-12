import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// `next start` only serves files that existed in /public at startup, so images
// uploaded from the admin panel afterwards would 404. This route serves them.
export const dynamic = 'force-dynamic';

const TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

export async function GET(_request: Request, { params }: { params: { path: string[] } }) {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  const requested = path.join(uploadsDir, ...params.path);

  // block path traversal
  if (!requested.startsWith(uploadsDir + path.sep)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const type = TYPES[path.extname(requested).toLowerCase()];
  if (!type || !fs.existsSync(requested) || !fs.statSync(requested).isFile()) {
    return new NextResponse('Not found', { status: 404 });
  }

  return new NextResponse(fs.readFileSync(requested), {
    headers: {
      'Content-Type': type,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
