import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminCredentials, updateAdminCredentials, verifyAdminLogin } from '@/lib/db';
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  getSession,
  invalidateAllSessions,
  isSessionConfigured,
} from '@/lib/session';

// In-memory brute-force throttle: 5 failures per 15 minutes per IP.
const g = globalThis as unknown as { __nvLoginFails?: Map<string, { n: number; reset: number }> };
const fails = (g.__nvLoginFails ||= new Map());
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILS = 5;

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}

function isLocked(ip: string): boolean {
  const entry = fails.get(ip);
  if (!entry) return false;
  if (entry.reset < Date.now()) {
    fails.delete(ip);
    return false;
  }
  return entry.n >= MAX_FAILS;
}

function registerFailure(ip: string) {
  const now = Date.now();
  const entry = fails.get(ip);
  if (!entry || entry.reset < now) fails.set(ip, { n: 1, reset: now + WINDOW_MS });
  else entry.n += 1;
}

export async function GET() {
  const session = await getSession(cookies().get(SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({
    authenticated: true,
    mustChangePassword: session.mustChangePassword,
  });
}

export async function POST(request: Request) {
  try {
    if (!isSessionConfigured()) {
      return NextResponse.json(
        { error: 'تنظیمات امنیتی سرور (ADMIN_SESSION_SECRET) کامل نیست؛ با مدیر سرور تماس بگیرید.' },
        { status: 503 }
      );
    }

    const ip = clientIp(request);
    if (isLocked(ip)) {
      return NextResponse.json(
        { error: 'تعداد تلاش‌های ناموفق زیاد است. لطفاً ۱۵ دقیقه دیگر دوباره تلاش کنید.' },
        { status: 429 }
      );
    }

    const { username, password } = await request.json();

    if (await verifyAdminLogin(username, password)) {
      fails.delete(ip);
      const creds = await getAdminCredentials();
      const mustChange = Boolean(creds.mustChangePassword);
      const token = await createSessionToken({ mustChangePassword: mustChange });

      cookies().set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: SESSION_MAX_AGE_SECONDS,
        path: '/',
      });

      return NextResponse.json({ success: true, mustChangePassword: mustChange });
    }

    registerFailure(ip);
    return NextResponse.json({ error: 'نام کاربری یا رمز عبور اشتباه است.' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getSession(cookies().get(SESSION_COOKIE)?.value);
    if (!session) {
      return NextResponse.json({ error: 'عدم دسترسی مجاز' }, { status: 401 });
    }

    const { currentPassword, newUsername, newPassword } = await request.json();
    const creds = await getAdminCredentials();

    if (!(await verifyAdminLogin(creds.username, currentPassword))) {
      return NextResponse.json({ error: 'رمز عبور فعلی نامعتبر است.' }, { status: 400 });
    }

    if (!newPassword || String(newPassword).trim().length < 8) {
      return NextResponse.json({ error: 'رمز عبور جدید باید حداقل ۸ کاراکتر باشد.' }, { status: 400 });
    }

    const updated = await updateAdminCredentials({
      username: newUsername || creds.username,
      password: newPassword,
    });

    // Invalidate all previously issued sessions across browsers/devices
    invalidateAllSessions();

    // Issue a fresh session cookie with mustChangePassword: false
    const newToken = await createSessionToken({
      mustChangePassword: false,
      issuedAt: Date.now() + 1,
    });

    cookies().set(SESSION_COOKIE, newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE_SECONDS,
      path: '/',
    });

    return NextResponse.json({
      success: true,
      username: updated.username,
      mustChangePassword: false,
    });
  } catch (error) {
    return NextResponse.json({ error: 'خطای سرور در تغییر رمز عبور' }, { status: 500 });
  }
}

export async function DELETE() {
  cookies().delete(SESSION_COOKIE);
  return NextResponse.json({ success: true });
}
