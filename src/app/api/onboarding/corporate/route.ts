import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      companyName,
      contactName,
      email,
      phone,
      roleTitle,
      storeCount,
      employeeCount,
      trainingInterests,
      licenseCount,
      requestType, // "DEMO" | "QUOTE"
      kvkkConsent
    } = body;

    // Server-side validation
    if (!companyName?.trim()) {
      return NextResponse.json({ success: false, message: 'Lütfen şirket adını giriniz.' }, { status: 400 });
    }
    if (!contactName?.trim()) {
      return NextResponse.json({ success: false, message: 'Lütfen yetkili ad ve soyadını giriniz.' }, { status: 400 });
    }
    if (!email?.trim() || !email.includes('@')) {
      return NextResponse.json({ success: false, message: 'Lütfen geçerli bir kurumsal e-posta adresi giriniz.' }, { status: 400 });
    }
    if (!phone?.trim()) {
      return NextResponse.json({ success: false, message: 'Lütfen telefon numaranızı giriniz.' }, { status: 400 });
    }
    if (!kvkkConsent) {
      return NextResponse.json({ success: false, message: 'Devam etmek için KVKK aydınlatma metnini onaylamalısınız.' }, { status: 400 });
    }

    // Save request to TrainingRequest model
    const requestRecord = await prisma.trainingRequest.create({
      data: {
        name: contactName.trim(),
        companyName: companyName.trim(),
        title: roleTitle?.trim() || 'Yetkili',
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        city: 'İstanbul',
        subCount: storeCount ? parseInt(storeCount, 10) : undefined,
        employeeCount: employeeCount ? parseInt(employeeCount, 10) : undefined,
        department: Array.isArray(trainingInterests) ? trainingInterests.join(', ') : trainingInterests,
        notes: `Talep Tipi: ${requestType || 'DEMO'}, Lisans İhtiyacı: ${licenseCount || 'Belirtilmedi'}`,
        gdpr: Boolean(kvkkConsent),
        status: 'BEKLIYOR'
      }
    });

    // Log analytics event
    await prisma.analyticsEvent.create({
      data: {
        eventName: 'corporate_demo_requested',
        metadata: JSON.stringify({ companyName, contactName, email, requestType })
      }
    });

    return NextResponse.json({
      success: true,
      requestId: requestRecord.id,
      message: 'Kurumsal demo/teklif talebiniz başarıyla alınmıştır. Eğitim danışmanımız en kısa sürede sizinle iletişime geçecektir.'
    });
  } catch (error) {
    console.error('Error handling corporate onboarding request:', error);
    return NextResponse.json({ success: false, message: 'Talebiniz alınırken sunucu hatası oluştu.' }, { status: 500 });
  }
}
