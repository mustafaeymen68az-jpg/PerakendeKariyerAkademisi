import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserSystemRoles } from '@/lib/rbac';

async function verifyPlatformAdmin(req: Request) {
  const cookieHeader = req.headers.get('cookie') || '';
  const sessionMatch = cookieHeader.match(/user_session=([^;]+)/);
  if (!sessionMatch) return false;
  try {
    const session = JSON.parse(decodeURIComponent(sessionMatch[1]));
    if (!session?.id) return false;
    const roles = await getUserSystemRoles(session.id);
    return roles.includes('PLATFORM_ADMIN');
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  try {
    const positions = await prisma.professionalPosition.findMany({
      include: { department: true, nextPosition: true },
      orderBy: [{ group: 'asc' }, { careerLevel: 'asc' }]
    });

    const goals = await prisma.careerGoal.findMany({
      orderBy: { createdAt: 'asc' }
    });

    const rules = await prisma.recommendationRule.findMany({
      include: { position: true, targetPosition: true, careerGoal: true },
      orderBy: { createdAt: 'desc' }
    });

    const packages = await prisma.corporatePackage.findMany({
      orderBy: { createdAt: 'asc' }
    });

    return NextResponse.json({
      success: true,
      positions,
      goals,
      rules,
      packages
    });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return NextResponse.json({ success: false, message: 'Yönetim verileri yüklenemedi.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isAdmin = await verifyPlatformAdmin(req);
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: 'Bu işlem için yetkiniz yok.' }, { status: 403 });
    }

    const body = await req.json();
    const { type, data } = body;

    if (type === 'POSITION') {
      const { name, group, careerLevel, departmentId, nextPositionId } = data;
      const created = await prisma.professionalPosition.create({
        data: {
          name,
          group,
          careerLevel: parseInt(careerLevel || 1, 10),
          departmentId: departmentId || undefined,
          nextPositionId: nextPositionId || undefined
        }
      });
      return NextResponse.json({ success: true, item: created });
    }

    if (type === 'RECOMMENDATION_RULE') {
      const { title, positionId, targetPositionId, careerGoalId, recommendedTrainingIds, competencies, estimatedHours, moduleCount } = data;
      const created = await prisma.recommendationRule.create({
        data: {
          title,
          positionId: positionId || undefined,
          targetPositionId: targetPositionId || undefined,
          careerGoalId: careerGoalId || undefined,
          recommendedTrainingIds: JSON.stringify(recommendedTrainingIds || []),
          competencies: JSON.stringify(competencies || []),
          estimatedHours: parseInt(estimatedHours || 16, 10),
          moduleCount: parseInt(moduleCount || 5, 10)
        }
      });
      return NextResponse.json({ success: true, item: created });
    }

    return NextResponse.json({ success: false, message: 'Geçersiz tür.' }, { status: 400 });
  } catch (error) {
    console.error('Error saving admin item:', error);
    return NextResponse.json({ success: false, message: 'Veri kaydedilirken sunucu hatası oluştu.' }, { status: 500 });
  }
}
