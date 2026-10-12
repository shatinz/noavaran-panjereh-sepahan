import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, getSession } from '@/lib/session';

const UNAUTHORIZED_MESSAGE = 'دسترسی غیرمجاز. لطفاً وارد شوید.';
const MUST_CHANGE_PASSWORD_MESSAGE = 'تغییر رمز عبور اولیه الزامی است.';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and login authentication API
  if (pathname === '/admin/login' || pathname === '/api/admin/auth') {
    return NextResponse.next();
  }

  // Public contact form: only POST (creating a lead) is open to visitors.
  // Listing, updating and deleting leads is admin-only.
  if (pathname === '/api/consultations' && request.method === 'POST') {
    return NextResponse.next();
  }

  const session = await getSession(request.cookies.get(SESSION_COOKIE)?.value);

  // Protect Admin UI routes
  if (pathname.startsWith('/admin')) {
    if (!session) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (session.mustChangePassword) {
      if (pathname !== '/admin/change-password') {
        return NextResponse.redirect(new URL('/admin/change-password', request.url));
      }
      return NextResponse.next();
    }

    // If password was already changed, prevent staying on change-password page
    if (pathname === '/admin/change-password') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Protect Admin API routes and the lead-management methods
  if (pathname.startsWith('/api/admin') || pathname === '/api/consultations') {
    if (!session) {
      return NextResponse.json({ error: UNAUTHORIZED_MESSAGE }, { status: 401 });
    }

    if (session.mustChangePassword) {
      return NextResponse.json(
        { error: MUST_CHANGE_PASSWORD_MESSAGE, mustChangePassword: true },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/consultations'],
};
