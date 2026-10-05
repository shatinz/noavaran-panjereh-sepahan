import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminCredentials, updateAdminCredentials } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const creds = await getAdminCredentials();

    if (username === creds.username && password === creds.password) {
      // Set session cookie
      cookies().set('noavaran_admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'نام کاربری یا رمز عبور اشتباه است.' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = cookies().get('noavaran_admin_session');
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: 'عدم دسترسی مجاز' }, { status: 401 });
    }

    const { currentPassword, newUsername, newPassword } = await request.json();
    const creds = await getAdminCredentials();

    if (currentPassword !== creds.password) {
      return NextResponse.json({ error: 'رمز عبور فعلی نامعتبر است.' }, { status: 400 });
    }

    if (!newPassword || newPassword.trim().length < 4) {
      return NextResponse.json({ error: 'رمز عبور جدید باید حداقل ۴ کاراکتر باشد.' }, { status: 400 });
    }

    const updated = await updateAdminCredentials({
      username: newUsername || creds.username,
      password: newPassword,
    });

    return NextResponse.json({ success: true, username: updated.username });
  } catch (error) {
    return NextResponse.json({ error: 'خطای سرور در تغییر رمز عبور' }, { status: 500 });
  }
}

export async function DELETE() {
  cookies().delete('noavaran_admin_session');
  return NextResponse.json({ success: true });
}

