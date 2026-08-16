import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let user = null;
    if (userId) {
      user = await prisma.user.findUnique({ where: { id: userId } });
    }
    if (!user) {
      user = await prisma.user.findFirst();
    }
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Find active mentorship for employee
    let mentorship = await prisma.mentorship.findFirst({
      where: { menteeId: user.id, status: 'AKTIF' },
      include: {
        mentor: true,
        meetings: { orderBy: { scheduledAt: 'desc' } }
      }
    });

    // If none exists, assign a default trainer/mentor for demonstration
    if (!mentorship) {
      const mentorUser = await prisma.user.findFirst({
        where: { role: { in: ['TRAINER', 'ADMIN', 'COMPANY_MANAGER'] } }
      }) || user;

      mentorship = await prisma.mentorship.create({
        data: {
          mentorId: mentorUser.id,
          menteeId: user.id,
          status: 'AKTIF',
          meetings: {
            create: [
              {
                scheduledAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                agenda: 'Stok Yönetimi Vakası & 60 Günlük Kariyer Hedefleri',
                employeeNotes: 'Stok devir hızı hesabı konusunda mentorumdan tüyo alacağım.',
                mentorNotes: 'Çalışan istekle hazırlanmış, taze gıda konularına hevesli.',
                actionItems: JSON.stringify(['Mağaza İçi Stok modülünü bitir', 'Raf Bulunurluk ödevini teslim et']),
                privacyLevel: 'PRIVATE',
                status: 'PLANLANDI'
              }
            ]
          }
        },
        include: {
          mentor: true,
          meetings: { orderBy: { scheduledAt: 'desc' } }
        }
      });
    }

    // List all potential mentors
    const availableMentors = await prisma.user.findMany({
      where: { role: { in: ['TRAINER', 'ADMIN', 'COMPANY_MANAGER', 'DEPT_MANAGER'] } },
      take: 5
    });

    return NextResponse.json({
      success: true,
      mentorship,
      availableMentors
    });
  } catch (error: any) {
    console.error('Error fetching mentorship details:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mentorshipId, scheduledAt, agenda, employeeNotes, privacyLevel } = body;

    if (!mentorshipId) {
      return NextResponse.json({ success: false, error: 'mentorshipId is required' }, { status: 400 });
    }

    const newMeeting = await prisma.mentorMeeting.create({
      data: {
        mentorshipId,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        agenda: agenda || 'Birebir Kariyer & Bütçe Gelişim Görüşmesi',
        employeeNotes: employeeNotes || 'Hazırladığım vaka analizini görüşeceğiz.',
        privacyLevel: privacyLevel || 'PRIVATE',
        status: 'PLANLANDI'
      }
    });

    return NextResponse.json({
      success: true,
      meeting: newMeeting,
      message: 'Mentor randevusu başarıyla planlandı!'
    });
  } catch (error: any) {
    console.error('Error scheduling mentor meeting:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
