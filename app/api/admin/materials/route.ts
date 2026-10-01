import { NextResponse } from 'next/server';
import { getMaterials, createMaterial, updateMaterial, deleteMaterial } from '@/lib/db';

export async function GET() {
  const materials = await getMaterials();
  return NextResponse.json(materials);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await createMaterial(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create material system' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...updates } = await request.json();
    const updated = await updateMaterial(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Material system not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update material system' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    const success = await deleteMaterial(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete material system' }, { status: 500 });
  }
}
