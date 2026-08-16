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

    const today = new Date();
    const day = today.getDay(); // 1 = Mon, 3 = Wed, 5 = Fri

    let currentPrompt = {
      type: 'MONDAY',
      title: 'Pazartesi Kariyer Koçu Kontrolü',
      prompt: 'Bu hafta kariyer hedefin için hangi somut adımı atacaksın?',
      options: [
        'Mağaza İçi Stok Yönetimi modülünü tamamlayacağım',
        'Raf Bulunurluk Saha Görevini uygulayıp rapor yükleyeceğim',
        'Bölge mentorumla birebir görüşme yapacağım',
        'Reyonda SKT denetimi yapıp fire oranını inceleyeceğim'
      ]
    };

    if (day === 3) {
      currentPrompt = {
        type: 'WEDNESDAY',
        title: 'Çarşamba İlerleme & Engel Kontrolü',
        prompt: 'Planladığın görevi tamamlamanı engelleyen bir durum var mı?',
        options: [
          'Zaman bulamadım',
          'Yöneticimden destek alamadım',
          'Konuyu tam anlamadım',
          'Teknik bir sorun yaşadım',
          'Görevi başarıyla tamamladım',
          'Başka bir engelim var'
        ]
      };
    } else if (day === 5) {
      currentPrompt = {
        type: 'FRIDAY',
        title: 'Cuma Uygulama & Değerlendirme',
        prompt: 'Bu hafta öğrendiğin hangi bilgiyi sahada işinde uyguladın?',
        options: [
          'Raf emniyet stoku hesabını reyonda uyguladım',
          'Kasa kapanışında nakit mutabakatı sağladım',
          'Gıda hijyen kontrol listesini tamamladım',
          'Müşteri şikayetini yapıcı yöntemle çözdüm'
        ]
      };
    }

    const history = await prisma.digitalCoachCheckIn.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    return NextResponse.json({
      success: true,
      currentPrompt,
      history
    });
  } catch (error: any) {
    console.error('Error fetching digital coach prompts:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, type, response, blockerType } = body;

    let targetUserId = userId;
    if (!targetUserId) {
      const u = await prisma.user.findFirst();
      targetUserId = u?.id;
    }

    const checkIn = await prisma.digitalCoachCheckIn.create({
      data: {
        userId: targetUserId,
        weekNumber: 33,
        dayOfWeek: type || 'MONDAY',
        prompt: type === 'WEDNESDAY' ? 'Planladığın görevi tamamlamanı engelleyen bir durum var mı?' : 'Bu hafta kariyer hedefin için hangi somut adımı atacaksın?',
        response: response || 'Görevi tamamladım',
        blockerType: blockerType || 'COMPLETED'
      }
    });

    let coachAdvice = 'Harika bir adım! Gelişim yolculuğunda küçük ve kararlı adımlar büyük başarılara kapı açar.';

    if (blockerType === 'TIME') {
      coachAdvice = 'Zaman yönetimi yoğun mağaza günlerinde zordur. Eğitimi haftada 2 gün 15\'er dakikalık mikro modüller halinde tamamlamayı deneyebilirsin.';
    } else if (blockerType === 'MANAGER_SUPPORT') {
      coachAdvice = 'Yöneticinle haftalık 5 dakikalık bir ayaküstü görüşme yapıp kariyer pusulanızdaki saha görevini ve desteğini talep edebilirsin.';
    } else if (blockerType === 'NOT_UNDERSTOOD') {
      coachAdvice = 'Anlamadığın noktalar için mentörünle birebir randevu planlayabilir veya eğitim altındaki soru-cevap bölümünü kullanabilirsin.';
    }

    return NextResponse.json({
      success: true,
      checkIn,
      coachAdvice
    });
  } catch (error: any) {
    console.error('Error recording digital coach response:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
