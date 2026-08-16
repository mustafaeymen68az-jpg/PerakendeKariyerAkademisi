import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const positions = await prisma.professionalPosition.findMany({
      where: { active: true },
      orderBy: [{ group: 'asc' }, { careerLevel: 'asc' }]
    });

    const goals = await prisma.careerGoal.findMany({
      orderBy: { createdAt: 'asc' }
    });

    const departments = await prisma.department.findMany({
      select: { id: true, name: true, slug: true }
    });

    return NextResponse.json({
      success: true,
      positions,
      goals,
      departments
    });
  } catch (error) {
    console.error('Error fetching onboarding reference data:', error);
    return NextResponse.json({ success: false, message: 'Veriler alınamadı.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { positionId, positionName, customPosition, careerGoalId, careerGoalTitle } = body;

    const actualPositionName = customPosition || positionName || 'Perakende Çalışanı';

    // 1. Try to find explicit RecommendationRule match
    let rule = await prisma.recommendationRule.findFirst({
      where: {
        active: true,
        OR: [
          { positionId: positionId || undefined },
          { position: { name: { contains: actualPositionName } } }
        ]
      },
      include: {
        position: true,
        targetPosition: true
      }
    });

    // 2. Fetch position details for target position roadmap
    let currentPositionObj = null;
    let targetPositionObj = null;

    if (positionId) {
      currentPositionObj = await prisma.professionalPosition.findUnique({
        where: { id: positionId },
        include: { nextPosition: true }
      });
      targetPositionObj = currentPositionObj?.nextPosition || null;
    }

    if (!targetPositionObj) {
      targetPositionObj = await prisma.professionalPosition.findFirst({
        where: {
          group: currentPositionObj?.group || 'STORE_MANAGEMENT',
          careerLevel: { gt: currentPositionObj?.careerLevel || 1 }
        },
        orderBy: { careerLevel: 'asc' }
      });
    }

    // 3. Fetch recommended trainings
    let recommendedTrainings: any[] = [];
    if (rule?.recommendedTrainingIds) {
      try {
        const ids = JSON.parse(rule.recommendedTrainingIds);
        if (Array.isArray(ids) && ids.length > 0) {
          recommendedTrainings = await prisma.training.findMany({
            where: { id: { in: ids } },
            take: 4
          });
        }
      } catch (e) {
        // Fallback
      }
    }

    if (recommendedTrainings.length === 0) {
      // Rule fallback: get trainings matching level or general retail trainings
      recommendedTrainings = await prisma.training.findMany({
        where: { published: true },
        take: 4,
        orderBy: { createdAt: 'desc' }
      });
    }

    // Parse competencies
    let competencies: string[] = ["Perakende Operasyonları", "Müşteri Memnuniyeti", "KPI & Ciro Yönetimi", "Ekip İletişimi"];
    if (rule?.competencies) {
      try {
        const parsed = JSON.parse(rule.competencies);
        if (Array.isArray(parsed)) competencies = parsed;
      } catch {
        competencies = rule.competencies.split(',').map(s => s.trim());
      }
    }

    const targetName = targetPositionObj?.name || 'Mağaza Yönetimi';

    const recommendation = {
      title: rule?.title || `${actualPositionName} Kariyer Gelişim Paketi`,
      summaryMessage: `“${actualPositionName}” pozisyonundan “${targetName}” seviyesine ilerlemeniz için size özel bir gelişim rotası hazırladık.`,
      currentPosition: actualPositionName,
      targetPosition: targetName,
      careerGoal: careerGoalTitle || 'Kariyerde Yükselmek',
      pathTitle: rule?.recommendedPathTitle || `${actualPositionName} ➔ ${targetName} Uzmanlık Rotası`,
      totalModules: rule?.moduleCount || recommendedTrainings.length || 5,
      estimatedHours: rule?.estimatedHours || 24,
      competencies,
      trainings: recommendedTrainings.map(t => ({
        id: t.id,
        title: t.title,
        duration: t.duration,
        level: t.level,
        format: t.format,
        coverImage: t.coverImage,
        description: t.description
      })),
      sampleLesson: {
        title: recommendedTrainings[0]?.title ? `${recommendedTrainings[0].title} - Örnek Ders` : "Perakendede Operasyonel Mükemmellik Örnek Dersi",
        duration: "12 Dakika",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      }
    };

    // Log analytics event
    await prisma.analyticsEvent.create({
      data: {
        eventName: 'recommendation_viewed',
        metadata: JSON.stringify({ actualPositionName, targetName, careerGoalTitle })
      }
    });

    return NextResponse.json({
      success: true,
      recommendation
    });
  } catch (error) {
    console.error('Error generating recommendation:', error);
    return NextResponse.json({ success: false, message: 'Öneri üretilirken hata oluştu.' }, { status: 500 });
  }
}
