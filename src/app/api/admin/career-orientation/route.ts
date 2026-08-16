import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const test = await prisma.careerOrientationTest.findFirst({
      where: { active: true },
      include: {
        questions: {
          include: { options: true },
          orderBy: { questionNumber: 'asc' }
        }
      }
    });

    if (!test) {
      return NextResponse.json({ success: false, error: 'Test henüz tanımlanmamış.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      test
    });
  } catch (error) {
    console.error('Admin Career Orientation GET Error:', error);
    return NextResponse.json({ success: false, error: 'Yönetim verisi çekilemedi.' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { testId, title, description, cooldownMonths, questions } = body;

    if (!testId) {
      return NextResponse.json({ success: false, error: 'Test ID gerekli.' }, { status: 400 });
    }

    // Update test main config
    await prisma.careerOrientationTest.update({
      where: { id: testId },
      data: {
        title,
        description,
        cooldownMonths: parseInt(cooldownMonths) || 6
      }
    });

    // Update questions if provided
    if (questions && Array.isArray(questions)) {
      for (const q of questions) {
        if (q.id) {
          await prisma.careerOrientationQuestion.update({
            where: { id: q.id },
            data: {
              text: q.text,
              weight: parseFloat(q.weight) || 1.0
            }
          });

          if (q.options && Array.isArray(q.options)) {
            for (const opt of q.options) {
              if (opt.id) {
                await prisma.careerOrientationOption.update({
                  where: { id: opt.id },
                  data: {
                    text: opt.text,
                    targetPositionId: opt.targetPositionId
                  }
                });
              }
            }
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Kariyer Yönelim Testi yönetici ayarları başarıyla güncellendi.'
    });
  } catch (error) {
    console.error('Admin Career Orientation PUT Error:', error);
    return NextResponse.json({ success: false, error: 'Güncelleme hatası.' }, { status: 500 });
  }
}
