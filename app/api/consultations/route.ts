import { NextResponse } from 'next/server';
import { getConsultations, createConsultation, updateConsultation, deleteConsultation } from '@/lib/db';
import { sendConsultationEmail } from '@/lib/email';

export async function GET() {
  try {
    const list = await getConsultations();
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch consultations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, projectType, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'نام و شماره تماس الزامی است.' }, { status: 400 });
    }

    // Save lead in local store
    const item = await createConsultation({
      name: String(name).trim(),
      phone: String(phone).trim(),
      projectType: String(projectType || 'عمومی').trim(),
      message: message ? String(message).trim() : undefined,
    });

    // Fire email notification to company asynchronously
    try {
      await sendConsultationEmail({
        name: item.name,
        phone: item.phone,
        projectType: item.projectType,
        message: item.message,
        createdAt: item.createdAt,
      });
    } catch (emailErr) {
      console.warn('Consultation email notification deferred or failed:', emailErr);
    }

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error) {
    console.error('Error handling consultation submission:', error);
    return NextResponse.json({ error: 'خطایی در ثبت درخواست رخ داد.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ error: 'id and status are required' }, { status: 400 });
    }

    const updated = await updateConsultation(id, { status });
    if (!updated) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update consultation' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const success = await deleteConsultation(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete consultation' }, { status: 500 });
  }
}
