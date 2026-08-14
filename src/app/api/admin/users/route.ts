import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        role: true,
        title: true,
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
