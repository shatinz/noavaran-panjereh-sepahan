import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// SVG is intentionally not accepted: it can carry <script> and would be served
// from our own origin (stored XSS). Types are verified from the file bytes, not
// from the browser-supplied MIME type or file name.
function detectImage(buf: Buffer): { ext: string } | null {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return { ext: '.jpg' };
  if (buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return { ext: '.png' };
  if (buf.length >= 6 && ['GIF87a', 'GIF89a'].includes(buf.subarray(0, 6).toString('ascii'))) return { ext: '.gif' };
  if (buf.length >= 12 && buf.subarray(0, 4).toString('ascii') === 'RIFF' && buf.subarray(8, 12).toString('ascii') === 'WEBP') return { ext: '.webp' };
  return null;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'هیچ فایلی ارسال نشده است.' }, { status: 400 });
    }

    // Limit size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'حجم تصویر نباید بیشتر از ۱۰ مگابایت باشد.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const detected = detectImage(buffer);
    if (!detected) {
      return NextResponse.json({ error: 'فرمت فایل نامعتبر است. فقط تصاویر JPG، PNG، WebP و GIF مجاز هستند.' }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    fs.mkdirSync(uploadsDir, { recursive: true });

    const rawBase = path.basename(file.name, path.extname(file.name));
    const safeBase = rawBase.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 60) || 'image';
    const filename = `${safeBase}_${Date.now()}${detected.ext}`;
    fs.writeFileSync(path.join(uploadsDir, filename), buffer);

    return NextResponse.json({ success: true, url: `/uploads/${filename}`, filename });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'خطا در بارگذاری فایل' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url') || searchParams.get('filename') || searchParams.get('path');

    if (!url) {
      return NextResponse.json({ error: 'آدرس یا نام فایل ارسال نشده است.' }, { status: 400 });
    }

    const clean = url.split('?')[0].split('#')[0];
    const safeBase = path.basename(clean);

    // Verify allowed extensions to prevent arbitrary file deletion
    const ext = path.extname(safeBase).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
      return NextResponse.json({ error: 'فرمت فایل نامعتبر است.' }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const targetPath = path.join(uploadsDir, safeBase);

    // Ensure target path is strictly inside uploadsDir
    if (!targetPath.startsWith(uploadsDir + path.sep) && targetPath !== uploadsDir) {
      return NextResponse.json({ error: 'دسترسی غیرمجاز به مسیر فایل' }, { status: 403 });
    }

    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
      return NextResponse.json({ success: true, message: 'فایل با موفقیت از سرور حذف شد.', filename: safeBase });
    }

    return NextResponse.json({ success: true, message: 'فایل در حافظه سرور یافت نشد.', filename: safeBase });
  } catch (error) {
    console.error('Delete upload error:', error);
    return NextResponse.json({ error: 'خطا در حذف فایل از سرور' }, { status: 500 });
  }
}
