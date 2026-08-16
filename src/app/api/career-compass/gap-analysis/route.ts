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
        include: { careerProfile: true }
      });
    }

    if (!user) {
      user = await prisma.user.findFirst({
        include: { careerProfile: true }
      });
    }

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const targetPosId = user.careerProfile?.nextTargetPositionId || user.targetPositionId;

    if (!targetPosId) {
      return NextResponse.json({
        success: true,
        gaps: [],
        message: 'Lütfen önce hedef pozisyonunuzu seçin.'
      });
    }

    // Fetch position requirements for target position
    const requirements = await prisma.positionRequirement.findMany({
      where: { positionId: targetPosId },
      include: { competency: true }
    });

    // Fetch user assessments
    const userAssessments = await prisma.userCompetencyAssessment.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    // Map user latest score per competency
    const latestUserScores: Record<string, { score: number; source: string; date: Date }> = {};
    for (const ua of userAssessments) {
      if (!latestUserScores[ua.competencyId]) {
        latestUserScores[ua.competencyId] = {
          score: ua.score,
          source: ua.source === 'SELF' ? 'Öz Değerlendirme' : ua.source === 'MANAGER' ? 'Yönetici Değerlendirmesi' : 'Sınav & Saha Görevi',
          date: ua.assessmentDate
        };
      }
    }

    // Build gap analysis table items
    const gaps = requirements.map((req) => {
      const comp = req.competency;
      const userEval = latestUserScores[comp.id] || { score: 2, source: 'Sistem Tahmini', date: new Date() };
      const currentLevel = userEval.score;
      const targetLevel = req.targetLevel;
      const diff = currentLevel - targetLevel;

      let statusTag = 'Beklenen Seviyede';
      let tagColor = 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      let recommendedAction = 'Seviyeyi koru ve pekiştir';

      if (diff < -1) {
        statusTag = 'Gelişim Fırsatı';
        tagColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
        recommendedAction = 'Zorunlu Eğitim + Saha Uygulama Görevi';
      } else if (diff === -1) {
        statusTag = 'Hedefe Yakın';
        tagColor = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
        recommendedAction = 'Uygulama Görevi + Mentor Rehberliği';
      } else if (diff === 0) {
        statusTag = 'Beklenen Seviyede';
        tagColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
        recommendedAction = 'Mevcut Seviyeyi Koru & Uygula';
      } else if (diff === 1) {
        statusTag = 'Güçlü Yetkinlik';
        tagColor = 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40';
        recommendedAction = 'Ekip Arkadaşlarına Rehberlik Et';
      } else if (diff > 1) {
        statusTag = 'Rol Model Seviyesi';
        tagColor = 'bg-purple-500/20 text-purple-300 border-purple-500/40';
        recommendedAction = 'İç Eğitmen / Mentor Adayı';
      }

      return {
        competencyId: comp.id,
        name: comp.name,
        category: comp.category,
        currentLevel,
        targetLevel,
        diff,
        source: userEval.source,
        recommendedAction,
        lastAssessmentDate: userEval.date,
        statusTag,
        tagColor
      };
    });

    return NextResponse.json({
      success: true,
      targetPositionId: targetPosId,
      gaps
    });
  } catch (error: any) {
    console.error('Error fetching gap analysis:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
