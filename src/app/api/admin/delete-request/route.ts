import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('user_session');

    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: 'Yetkisiz erişim' }, { status: 401 });
    }

    let user: any = null;
    try {
      user = JSON.parse(sessionCookie.value);
    } catch {
      return NextResponse.json({ success: false, message: 'Oturum geçersiz' }, { status: 401 });
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Yönetici yetkisi gerekli' }, { status: 403 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: 'Talep ID gerekli' }, { status: 400 });
    }

    await prisma.trainingRequest.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Demo talebi başarıyla silindi.' });
  } catch (error) {
    console.error('Error deleting training request:', error);
    return NextResponse.json({ success: false, message: 'Talep silinemedi' }, { status: 500 });
  }
}
