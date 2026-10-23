import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getCategories, saveCategory, deleteCategory, updateCategories } from '@/lib/db';
import { SESSION_COOKIE, getSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

async function verifyAuth(): Promise<boolean> {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = await getSession(token);
  return Boolean(session && !session.mustChangePassword);
}

export async function GET() {
  try {
    const data = await getCategories();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await verifyAuth())) {
      return NextResponse.json({ error: 'دسترسی غیرمجاز. لطفاً وارد شوید.' }, { status: 401 });
    }

    const body = await request.json();
    const { type, category, oldNameFa } = body;

    if (!type || !['projects', 'articles'].includes(type)) {
      return NextResponse.json({ error: 'نوع نامعتبر است (باید projects یا articles باشد)' }, { status: 400 });
    }

    if (!category || typeof category !== 'object' || !category.nameFa || typeof category.nameFa !== 'string' || !category.nameFa.trim()) {
      return NextResponse.json({ error: 'نام فارسی دسته‌بندی الزامی است' }, { status: 400 });
    }

    // Input sanitization: clean and constrain ids and labels
    const rawId = typeof category.id === 'string' ? category.id : '';
    const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50) || `cat-${Date.now()}`;
    const safeNameFa = category.nameFa.trim().slice(0, 100);
    const safeNameEn = (category.nameEn && typeof category.nameEn === 'string' ? category.nameEn.trim() : safeNameFa).slice(0, 100);
    const safeNameAr = category.nameAr && typeof category.nameAr === 'string' ? category.nameAr.trim().slice(0, 100) : undefined;

    const catWithId = {
      id: safeId,
      nameFa: safeNameFa,
      nameEn: safeNameEn,
      nameAr: safeNameAr,
    };

    const saved = await saveCategory(
      type,
      catWithId,
      typeof oldNameFa === 'string' && oldNameFa.trim() ? oldNameFa.trim() : undefined
    );
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('Error saving category:', error);
    return NextResponse.json({ error: 'خطا در ذخیره دسته‌بندی' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await verifyAuth())) {
      return NextResponse.json({ error: 'دسترسی غیرمجاز. لطفاً وارد شوید.' }, { status: 401 });
    }

    const body = await request.json();
    if (!body || typeof body !== 'object' || !Array.isArray(body.projects) || !Array.isArray(body.articles)) {
      return NextResponse.json({ error: 'فرمت داده‌های ارسالی نامعتبر است' }, { status: 400 });
    }

    const updated = await updateCategories(body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating categories:', error);
    return NextResponse.json({ error: 'خطا در ذخیره دسته‌بندی‌ها' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await verifyAuth())) {
      return NextResponse.json({ error: 'دسترسی غیرمجاز. لطفاً وارد شوید.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'projects' | 'articles';
    const id = searchParams.get('id');
    const reassignTo = searchParams.get('reassignTo') || undefined;

    if (!type || !['projects', 'articles'].includes(type)) {
      return NextResponse.json({ error: 'نوع دسته‌بندی نامعتبر است' }, { status: 400 });
    }

    if (!id || typeof id !== 'string' || !id.trim()) {
      return NextResponse.json({ error: 'شناسه دسته‌بندی الزامی است' }, { status: 400 });
    }

    const result = await deleteCategory(type, id.trim(), reassignTo?.trim());
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'خطا در حذف دسته‌بندی' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'خطا در حذف دسته‌بندی' }, { status: 500 });
  }
}
