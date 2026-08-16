import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, error: 'Kullanıcı ID gerekli.' }, { status: 400 });
    }

    const attempts = await prisma.userCareerOrientationAttempt.findMany({
      where: {
        userId,
        status: 'COMPLETED'
      },
      orderBy: { completedAt: 'desc' },
      include: {
        result: true
      }
    });

    // Check cooldown period (default 6 months)
    let canRetake = true;
    let daysRemaining = 0;
    let nextAllowedDate: Date | null = null;

    if (attempts.length > 0 && attempts[0].completedAt) {
      const lastCompleted = new Date(attempts[0].completedAt);
      const cooldownMonths = 6;
      nextAllowedDate = new Date(lastCompleted);
      nextAllowedDate.setMonth(nextAllowedDate.getMonth() + cooldownMonths);

      const now = new Date();
      if (now < nextAllowedDate) {
        canRetake = false;
        const diffMs = nextAllowedDate.getTime() - now.getTime();
        daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      }
    }

    return NextResponse.json({
      success: true,
      canRetake,
      daysRemaining,
      nextAllowedDate,
      history: attempts.map(a => ({
        attemptId: a.id,
        completedAt: a.completedAt,
        nextStepPosition: a.result?.nextStepPositionId,
        longTermPosition: a.result?.longTermPositionId,
        alternativePosition: a.result?.alternativePositionId,
        scores: a.result?.positionScores ? JSON.parse(a.result.positionScores) : null
      }))
    });
  } catch (error) {
    console.error('Career Orientation History Error:', error);
    return NextResponse.json({ success: false, error: 'Geçmiş verileri çekilemedi.' }, { status: 500 });
  }
}
