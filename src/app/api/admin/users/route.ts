import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('user_session');

    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: 'Yetkisiz erişim.' }, { status: 401 });
    }

    let sessionUser: any = null;
    try {
      sessionUser = JSON.parse(sessionCookie.value);
    } catch {
      return NextResponse.json({ success: false, message: 'Geçersiz oturum.' }, { status: 401 });
    }

    if (sessionUser.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Bu işlem için admin yetkisi gereklidir.' }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        password: true,
        role: true,
        title: true,
        companyName: true,
        sectorChannel: true,
        sectorDetail: true,
        city: true,
        lastLoginAt: true,
        createdAt: true,
        company: { select: { name: true } },
        department: { select: { name: true } }
      }
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ success: false, message: 'Kullanıcılar alınırken hata oluştu.' }, { status: 500 });
  }
}
