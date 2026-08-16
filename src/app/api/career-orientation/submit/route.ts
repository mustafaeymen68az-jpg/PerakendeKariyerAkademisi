import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const POSITION_ORDER = [
  'TAKIM_LIDERI',
  'MUDUR_YRD',
  'MAGAZA_MUDURU',
  'BOLGE_MUDURU',
  'OPERASYON_DIREKTORU',
  'COO',
  'CEO'
];

const POSITION_NAMES: Record<string, string> = {
  TAKIM_LIDERI: 'Takım Lideri / Kıdemli Satış Çalışanı',
  MUDUR_YRD: 'Mağaza Müdür Yardımcısı',
  MAGAZA_MUDURU: 'Mağaza Müdürü',
  BOLGE_MUDURU: 'Bölge / Saha Müdürü',
  OPERASYON_DIREKTORU: 'Perakende Operasyon Direktörü',
  COO: 'Genel Müdür Yardımcısı / COO',
  CEO: 'CEO / Genel Müdür'
};

const POSITION_COMPETENCIES: Record<string, string[]> = {
  TAKIM_LIDERI: ['Ekip Koordinasyonu', 'Günlük Saha Takibi', 'POS & Kasa Sistemleri', 'İş Öğretme & Koçluk'],
  MUDUR_YRD: ['Vardiya & Kasa Yönetimi', 'Stok & Envanter Sayımı', 'Z-Raporu Denetimi', 'Müşteri Kriz Yönetimi'],
  MAGAZA_MUDURU: ['Mağaza P&L Yönetimi', 'Fire Azaltma & Kar Oranı', 'Ekip Liderliği & İşe Alım', 'Bütçe & Satış Hedefleri'],
  BOLGE_MUDURU: ['Çoklu Mağaza Auditi', 'Bölgesel Bütçe & KPI', 'Şube Müdürleri Koçluğu', 'Bölge Fire & Performans'],
  OPERASYON_DIREKTORU: ['Operasyon Standartları', 'Süreç & Sistem Tasarımı', 'Verimlilik Projeleri', 'Omichannel & Lojistik'],
  COO: ['Departmanlar Arası İcra', 'Bütçe & Kaynak Dağılımı', 'Büyüme & Operasyon Yetkinliği', 'Üst Düzey Liderlik'],
  CEO: ['Stratejik Şirket Vizyonu', 'Yatırım & Pazar Büyümesi', 'Kurum Kültürü & Değer', 'Yönetim Kurulu Liderliği']
};

const POSITION_TRAININGS: Record<string, string[]> = {
  TAKIM_LIDERI: ['Ekip Liderliği & İletişim', 'Kasa Sonu Z-Raporu & Teslimat Tutanağı', 'Reyon İçi Teşhir & Planogram'],
  MUDUR_YRD: ['Vardiya & Personel İş Gücü Planlaması', 'Mağaza İçi Stok & Envanter Yönetimi', 'Zor Müşteri Kriz Yönetimi'],
  MAGAZA_MUDURU: ['Mağaza P&L Yönetimi & Finans', 'Perakende Matematiği & İskonto', 'Fire Önleme & SKT Denetimi'],
  BOLGE_MUDURU: ['Bölgesel Bütçe & Çoklu Şube Yönetimi', 'Şube Müdürleri Koçluğu', 'Bölgesel Rakip Analizi'],
  OPERASYON_DIREKTORU: ['Perakende Operasyon Model Tasarımı', 'Dijital Dönüşüm & WMS', 'Verimlilik & Süreç İyileştirme'],
  COO: ['Üst Düzey İcra & Kaynak Yönetimi', 'Kurumsal Strateji & Departman Uyumlandırma', 'Bütçeleme & Finansal Performans'],
  CEO: ['C-Suite Liderlik & Şirket Vizyonu', 'Yatırım, Büyüme & Pazar Stratejileri', 'Kurumsal İtibar & Sürdürülebilirlik']
};

const POSITION_FIELD_TASKS: Record<string, string[]> = {
  TAKIM_LIDERI: ['Reyon Fiyat Etiketi ve Barkod Kontrolü', 'Yeni Çalışan Uyum & Eğitim Mentörlüğü'],
  MUDUR_YRD: ['Vardiya Kasa Devir Teslim Tutanağı', 'Stok Sayımı ve Sayım Görseli Yükleme'],
  MAGAZA_MUDURU: ['Günlük Fire & SKT İskonto Sayım Görseli', 'Haftalık Mağaza P&L Gider Raporu'],
  BOLGE_MUDURU: ['Bölge Şubeleri Kasa & Reyon Auditi', 'Şube Müdürleri Birebir Koçluk Görüşmesi'],
  OPERASYON_DIREKTORU: ['Tüm Şubeler Operasyon Standart Formu', 'Yeni Otomasyon & WMS Pilot Denetimi'],
  COO: ['Departmanlar Arası Bütçe Uyum Toplantısı', 'Şirket Çapı Kaynak Tahsis Raporu'],
  CEO: ['Stratejik Büyüme ve Pazar Giriş Analizi', 'Yönetim Kurulu ve Hissedar Sunumu']
};

function getNextStepPosition(currentTitle: string): string {
  const p = (currentTitle || '').toLowerCase();
  if (p.includes('kasiyer') || p.includes('reyon')) return 'Takım Lideri / Kıdemli Satış Çalışanı';
  if (p.includes('takım lideri') || p.includes('takim lideri')) return 'Mağaza Müdür Yardımcısı';
  if (p.includes('müdür yardımcısı') || p.includes('müdür yrd')) return 'Mağaza Müdürü';
  if (p.includes('mağaza müdürü')) return 'Bölge / Saha Müdürü';
  if (p.includes('bölge') || p.includes('saha müdürü')) return 'Perakende Operasyon Direktörü';
  if (p.includes('direktör')) return 'Genel Müdür Yardımcısı / COO';
  if (p.includes('coo') || p.includes('genel müdür yrd')) return 'CEO / Genel Müdür';
  return 'Takım Lideri / Kıdemli Satış Çalışanı';
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, attemptId, answers, isTieBreakerCompleted } = body;

    if (!attemptId || !answers || !Array.isArray(answers)) {
      return NextResponse.json({ success: false, error: 'Eksik veya geçersiz parametre.' }, { status: 400 });
    }

    // Load attempt & questions with options
    let attempt = null;
    if (attemptId && !attemptId.startsWith('test_')) {
      attempt = await prisma.userCareerOrientationAttempt.findUnique({
        where: { id: attemptId },
        include: {
          test: {
            include: {
              questions: {
                include: { options: true }
              }
            }
          }
        }
      });
    }

    if (!attempt) {
      const activeTest = await prisma.careerOrientationTest.findFirst({
        where: { active: true },
        include: {
          questions: {
            include: { options: true }
          }
        }
      });

      if (!activeTest) {
        return NextResponse.json({ success: false, error: 'Aktif test bulunamadı.' }, { status: 404 });
      }

      attempt = await prisma.userCareerOrientationAttempt.create({
        data: {
          userId: userId || 'calisan_demo_user',
          testId: activeTest.id,
          status: 'IN_PROGRESS'
        },
        include: {
          test: {
            include: {
              questions: {
                include: { options: true }
              }
            }
          }
        }
      });
    }

    // Initialize position scores map
    const scores: Record<string, number> = {
      TAKIM_LIDERI: 0,
      MUDUR_YRD: 0,
      MAGAZA_MUDURU: 0,
      BOLGE_MUDURU: 0,
      OPERASYON_DIREKTORU: 0,
      COO: 0,
      CEO: 0
    };

    let totalMaxScore = 0;

    // Process main 20 answers
    for (const ans of answers) {
      // Find question by ID or by question number/text
      let q = attempt.test.questions.find(item => item.id === ans.questionId);
      if (!q && ans.questionId && ans.questionId.startsWith('q')) {
        const qNum = parseInt(ans.questionId.replace('q', ''));
        if (!isNaN(qNum)) {
          q = attempt.test.questions.find(item => item.questionNumber === qNum);
        }
      }

      if (!q || q.isTieBreaker) continue;

      let selectedOpt = q.options.find(o => o.id === ans.optionId);
      if (!selectedOpt && ans.optionId) {
        // Fallback option code matching
        const parts = ans.optionId.split('_');
        const optCode = parts[parts.length - 1]?.toUpperCase();
        selectedOpt = q.options.find(o => o.optionCode === optCode);
      }

      if (!selectedOpt || !selectedOpt.targetPositionId) continue;

      const targetPos = selectedOpt.targetPositionId;
      const weight = q.weight || 1.0;
      const idx = POSITION_ORDER.indexOf(targetPos);

      if (idx !== -1) {
        // Direct score: 3 pts * weight
        scores[targetPos] += 3.0 * weight;

        // Neighbor 1 step below
        if (idx > 0) {
          scores[POSITION_ORDER[idx - 1]] += 1.0 * weight;
        }

        // Neighbor 1 step above
        if (idx < POSITION_ORDER.length - 1) {
          scores[POSITION_ORDER[idx + 1]] += 1.0 * weight;
        }

        totalMaxScore += 3.0 * weight;

        // Persist answer log
        try {
          await prisma.userCareerOrientationAnswer.upsert({
            where: {
              attemptId_questionId: {
                attemptId: attempt.id,
                questionId: q.id
              }
            },
            create: {
              attemptId: attempt.id,
              questionId: q.id,
              optionId: selectedOpt.id,
              scoreData: JSON.stringify({ targetPos, weight })
            },
            update: {
              optionId: selectedOpt.id,
              scoreData: JSON.stringify({ targetPos, weight })
            }
          });
        } catch {
          // Ignore unique conflict if fallback
        }
      }
    }

    // Sort positions by total score descending
    const sortedPositions = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topPosKey = sortedPositions[0][0];
    const secondPosKey = sortedPositions[1][0];
    const topScore = sortedPositions[0][1];
    const secondScore = sortedPositions[1][1];

    // Tie-breaker check: difference < 5% of max score
    const diff = topScore - secondScore;
    const isTie = diff < totalMaxScore * 0.05;

    if (isTie && !isTieBreakerCompleted) {
      // Update attempt status to TIE_BREAKER
      await prisma.userCareerOrientationAttempt.update({
        where: { id: attempt.id },
        data: { status: 'TIE_BREAKER' }
      });

      const tieBreakerQuestions = attempt.test.questions.filter(q => q.isTieBreaker);
      return NextResponse.json({
        success: true,
        needsTieBreaker: true,
        attemptId: attempt.id,
        tieBreakerQuestions: tieBreakerQuestions.map(q => ({
          id: q.id,
          number: q.questionNumber,
          text: q.text,
          options: q.options.map(o => ({
            id: o.id,
            code: o.optionCode,
            text: o.text,
            targetPositionId: o.targetPositionId
          }))
        }))
      });
    }

    // Resolve user current position
    let currentEmpPos = 'Kasiyer & Reyon Çalışanı';
    let validUser = false;
    if (userId) {
      try {
        const dbUser = await prisma.user.findUnique({
          where: { id: userId },
          select: { id: true, title: true }
        });
        if (dbUser) {
          validUser = true;
          if (dbUser.title) {
            currentEmpPos = dbUser.title;
          }
        }
      } catch {
        // Non-existent demo user ID handled gracefully
      }
    }

    const nextStepName = getNextStepPosition(currentEmpPos);
    const longTermName = POSITION_NAMES[topPosKey] || 'Bölge / Saha Müdürü';
    const alternativeName = POSITION_NAMES[secondPosKey] || 'Mağaza Müdürü';

    const narrativeSummary = `Yanıtların, uzun vadede birden fazla mağazayı ve yöneticiyi geliştirmeye yönelik güçlü bir kariyer ilgisine sahip olduğunu gösteriyor. Bugünkü kariyer basamağına göre önerilen ilk adımın ${nextStepName} pozisyonuna hazırlanmak. Bu basamakta kazanacağın ekip koordinasyonu ve günlük operasyon deneyimi, uzun vadeli ${longTermName} hedefinin temelini oluşturacaktır.`;

    // Persist result
    const result = await prisma.careerOrientationResult.upsert({
      where: { attemptId: attempt.id },
      create: {
        attemptId: attempt.id,
        nextStepPositionId: nextStepName,
        longTermPositionId: longTermName,
        alternativePositionId: alternativeName,
        positionScores: JSON.stringify(scores),
        resultSummary: narrativeSummary
      },
      update: {
        nextStepPositionId: nextStepName,
        longTermPositionId: longTermName,
        alternativePositionId: alternativeName,
        positionScores: JSON.stringify(scores),
        resultSummary: narrativeSummary
      }
    });

    // Mark attempt completed
    await prisma.userCareerOrientationAttempt.update({
      where: { id: attempt.id },
      data: {
        status: 'COMPLETED',
        completedAt: new Date()
      }
    });

    // Log analytics event safely without breaking if userId is a demo string
    try {
      await prisma.analyticsEvent.create({
        data: {
          eventName: 'career_orientation_completed',
          userId: validUser ? userId : null,
          metadata: JSON.stringify({
            attemptId: attempt.id,
            demoUserId: userId,
            longTermPositionId: longTermName,
            nextStepPositionId: nextStepName,
            alternativePositionId: alternativeName
          })
        }
      });
    } catch (analyticsErr) {
      console.warn('Analytics event log skipped:', analyticsErr);
    }

    return NextResponse.json({
      success: true,
      needsTieBreaker: false,
      result: {
        id: result.id,
        attemptId: attempt.id,
        nextStepPosition: nextStepName,
        longTermPosition: longTermName,
        alternativePosition: alternativeName,
        summary: narrativeSummary,
        scores,
        requiredCompetencies: POSITION_COMPETENCIES[topPosKey] || POSITION_COMPETENCIES['BOLGE_MUDURU'],
        recommendedTrainings: POSITION_TRAININGS[topPosKey] || POSITION_TRAININGS['BOLGE_MUDURU'],
        recommendedFieldTasks: POSITION_FIELD_TASKS[topPosKey] || POSITION_FIELD_TASKS['BOLGE_MUDURU'],
        noticeText: 'Bu sonuç hedef pozisyona hazır olduğunu değil, ilgi alanlarının ve almak istediğin sorumlulukların bu kariyer yoluyla uyum gösterdiğini ifade eder. Hazır oluş seviyeni belirlemek için teknik bilgi, yetkinlik, saha deneyimi ve iş sonuçları ayrıca değerlendirilecektir.'
      }
    });
  } catch (error: any) {
    console.error('Career Orientation Submit Error:', error);
    return NextResponse.json({ success: false, error: `Hesaplama hatası: ${error?.message || 'Bilinmeyen hata'}` }, { status: 500 });
  }
}
