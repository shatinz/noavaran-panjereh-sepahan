import { NextResponse } from 'next/server';
import { getServices, createService, updateService, deleteService, reorderServices } from '@/lib/db';

// Never prerender: these handlers read/write live data and must run on every request.
export const dynamic = 'force-dynamic';

export async function GET() {
  const services = await getServices();
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'بدنه درخواست نامعتبر است' }, { status: 400 });
    }

    if (!body.title || typeof body.title !== 'string' || !body.title.trim()) {
      return NextResponse.json({ error: 'عنوان خدمت الزامی است' }, { status: 400 });
    }

    const { featuresText: _ignored, ...safeBody } = body;
    const created = await createService(safeBody);
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    const status = error?.statusCode === 400 ? 400 : 500;
    return NextResponse.json({ error: error?.message || 'Failed to create service' }, { status });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'بدنه درخواست نامعتبر است' }, { status: 400 });
    }

    if (body.reorder) {
      if (
        !Array.isArray(body.orderedIds) ||
        body.orderedIds.length === 0 ||
        !body.orderedIds.every((id: any) => typeof id === 'string' && id.trim())
      ) {
        return NextResponse.json({ error: 'آرایه شناسه‌های مرتب‌سازی نامعتبر است' }, { status: 400 });
      }
      const reordered = await reorderServices(body.orderedIds);
      return NextResponse.json({ success: true, services: reordered });
    }

    const { id, featuresText: _ignored, ...updates } = body;
    if (!id || typeof id !== 'string' || !id.trim()) {
      return NextResponse.json({ error: 'شناسه خدمت الزامی است' }, { status: 400 });
    }

    const updated = await updateService(id.trim(), updates);
    if (!updated) {
      return NextResponse.json({ error: 'خدمت مورد نظر یافت نشد' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error: any) {
    const status = error?.statusCode === 400 ? 400 : 500;
    return NextResponse.json({ error: error?.message || 'Failed to update service' }, { status });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id || typeof id !== 'string' || !id.trim()) {
      return NextResponse.json({ error: 'شناسه خدمت الزامی است' }, { status: 400 });
    }

    const success = await deleteService(id.trim());
    if (!success) {
      return NextResponse.json({ error: 'خدمت مورد نظر جهت حذف یافت نشد' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    const status = error?.statusCode === 400 ? 400 : 500;
    return NextResponse.json({ error: error?.message || 'Failed to delete service' }, { status });
  }
}
