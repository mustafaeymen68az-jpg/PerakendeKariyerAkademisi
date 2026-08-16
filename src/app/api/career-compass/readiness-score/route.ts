import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let user = null;
    if (userId) {
      user = await prisma.user.findUnique({ where: { id: userId }, include: { readinessScoreRecord: true } });
    }
    if (!user) {
      user = await prisma.user.findFirst({ include: { readinessScoreRecord: true } });
    }
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    let scoreRecord = user.readinessScoreRecord;

    if (!scoreRecord) {
      scoreRecord = await prisma.readinessScore.create({
        data: {
          userId: user.id,
          technicalScore: 82,
          fieldScore: 78,
          competencyScore: 80,
          kpiScore: 85,
          managerScore: 80,
          mentorScore: 85,
          planAdherenceScore: 90,
          totalScore: 81.5,
          strengths: JSON.stringify(['Müşteri Deneyimi & Kasa Yönetimi (Seviye 4)', 'LMS Modül Tamamlama (%94)']),
          opportunities: JSON.stringify(['Stok Devir Hızı & Fire Hesabı (Seviye 2)', 'P&L Okuryazarlığı (Seviye 2)']),
          recommendedActions: JSON.stringify([
            'Mağaza İçi Stok, Sipariş ve Envanter Yönetimi eğitimini tamamla',
            'Raf Bulunurluğu Saha Görevini fotoğraflı olarak sisteme yükle',
            'Gelecek Salı günü mentorunla stok yönetimi vakasını görüş'
          ])
        }
      });
    }

    const score = scoreRecord.totalScore;

    let scoreBadge = 'Gelişim Devam Ediyor';
    let badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';

    if (score >= 90) {
      scoreBadge = 'Pozisyon Değerlendirmesine Hazır 🏆';
      badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    } else if (score >= 75) {
      scoreBadge = 'Pozisyona Güçlü Aday ⚡';
      badgeColor = 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40';
    } else if (score >= 60) {
      scoreBadge = 'Hedefe Yaklaşıyor 🎯';
      badgeColor = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    } else if (score >= 40) {
      scoreBadge = 'Gelişim Devam Ediyor 📈';
      badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    } else {
      scoreBadge = 'Temel Gelişim Aşaması 📚';
      badgeColor = 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }

    const components = [
      { name: 'Teknik Bilgi & Sınavlar', weightPercentage: 20, rawScore: scoreRecord.technicalScore, weighted: Number((scoreRecord.technicalScore * 0.20).toFixed(1)) },
      { name: 'Saha Görevleri & Uygulama', weightPercentage: 20, rawScore: scoreRecord.fieldScore, weighted: Number((scoreRecord.fieldScore * 0.20).toFixed(1)) },
      { name: 'Pozisyon Yetkinlikleri', weightPercentage: 20, rawScore: scoreRecord.competencyScore, weighted: Number((scoreRecord.competencyScore * 0.20).toFixed(1)) },
      { name: 'İş Sonuçları & KPI', weightPercentage: 15, rawScore: scoreRecord.kpiScore, weighted: Number((scoreRecord.kpiScore * 0.15).toFixed(1)) },
      { name: 'Yönetici Değerlendirmesi', weightPercentage: 10, rawScore: scoreRecord.managerScore, weighted: Number((scoreRecord.managerScore * 0.10).toFixed(1)) },
      { name: 'Mentor Değerlendirmesi', weightPercentage: 10, rawScore: scoreRecord.mentorScore, weighted: Number((scoreRecord.mentorScore * 0.10).toFixed(1)) },
      { name: 'Gelişim Planına Bağlılık', weightPercentage: 5, rawScore: scoreRecord.planAdherenceScore, weighted: Number((scoreRecord.planAdherenceScore * 0.05).toFixed(1)) }
    ];

    const disclaimer = 'Pozisyona Hazırlık Skoru, gelişim ve değerlendirme amacıyla oluşturulur. Terfi garantisi veya tek başına terfi kararı değildir.';

    return NextResponse.json({
      success: true,
      scoreRecord,
      totalScore: scoreRecord.totalScore,
      scoreBadge,
      badgeColor,
      components,
      strengths: JSON.parse(scoreRecord.strengths || '[]'),
      opportunities: JSON.parse(scoreRecord.opportunities || '[]'),
      recommendedActions: JSON.parse(scoreRecord.recommendedActions || '[]'),
      disclaimer,
      lastUpdated: scoreRecord.calculatedAt
    });
  } catch (error: any) {
    console.error('Error fetching readiness score:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
