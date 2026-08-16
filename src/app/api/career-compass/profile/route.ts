import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let user = null;
    if (userId) {
      user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          company: true,
          department: true,
          professionalPosition: true,
          targetPosition: true,
          careerProfile: true,
          readinessScoreRecord: true,
        }
      });
    }

    if (!user) {
      user = await prisma.user.findFirst({
        include: {
          company: true,
          department: true,
          professionalPosition: true,
          targetPosition: true,
          careerProfile: true,
          readinessScoreRecord: true,
        }
      });
    }

    if (!user) {
      return NextResponse.json({ success: false, error: 'User profile not found' }, { status: 404 });
    }

    const currentPosId = user.careerProfile?.currentPositionId || user.professionalPositionId;
    const targetPosId = user.careerProfile?.nextTargetPositionId || user.targetPositionId;
    const longTermPosId = user.careerProfile?.longTermTargetPositionId;

    const currentPosition = currentPosId ? await prisma.professionalPosition.findUnique({ where: { id: currentPosId } }) : null;
    const targetPosition = targetPosId ? await prisma.professionalPosition.findUnique({ where: { id: targetPosId } }) : null;
    const longTermTargetPosition = longTermPosId ? await prisma.professionalPosition.findUnique({ where: { id: longTermPosId } }) : null;

    const developmentPlan = await prisma.careerDevelopmentPlan.findUnique({
      where: { userId: user.id },
      include: { items: true }
    });

    const userTasks = await prisma.userFieldTask.findMany({
      where: { userId: user.id },
      include: { fieldTask: true }
    });

    const readinessScore = await prisma.readinessScore.findUnique({
      where: { userId: user.id }
    });

    return NextResponse.json({
      success: true,
      user,
      profile: user.careerProfile,
      currentPosition,
      targetPosition,
      longTermTargetPosition,
      developmentPlan,
      userTasks,
      readinessScore
    });
  } catch (error: any) {
    console.error('Error fetching career profile:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
