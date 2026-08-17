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

    const { id, deleteAll } = await req.json();

    if (deleteAll) {
      await prisma.siteVisit.deleteMany({});
      return NextResponse.json({ success: true, message: 'Tüm ziyaretçi geçmişi silindi.' });
    }

    if (!id) {
      return NextResponse.json({ success: false, message: 'Ziyaretçi ID gerekli' }, { status: 400 });
    }

    await prisma.siteVisit.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Ziyaretçi kaydı silindi.' });
  } catch (error) {
    console.error('Error deleting visitor log:', error);
    return NextResponse.json({ success: false, message: 'Ziyaretçi kaydı silinemedi' }, { status: 500 });
  }
}
