import { NextResponse } from 'next/server';
import { getArticles, createArticle, updateArticle, deleteArticle } from '@/lib/db';

// Never prerender: these handlers read/write live data and must run on every request.
export const dynamic = 'force-dynamic';

export async function GET() {
  const articles = await getArticles();
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await createArticle(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...updates } = await request.json();
    const updated = await updateArticle(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    const success = await deleteArticle(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
