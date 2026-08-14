import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { companyName, hrName, hrEmail, candidateName, candidateDept, candidateScore } = await req.json();

    if (!candidateName || !companyName) {
      return NextResponse.json({ success: false, message: 'Eksik aday veya şirket bilgisi.' }, { status: 400 });
    }

    const requestRecord = await prisma.talentPoolRequest.create({
      data: {
        companyName: companyName || 'Kurumsal Şirket',
        hrName: hrName || 'İK Yöneticisi',
        hrEmail: hrEmail || 'ik@sirket.com',
        candidateName,
        candidateDept: candidateDept || 'Genel Perakende',
        candidateScore: Number(candidateScore) || 85,
        status: 'BEKLIYOR'
      }
    });

    return NextResponse.json({
      success: true,
      request: requestRecord,
      message: `📩 İK Talebiniz Alındı! ${candidateName} (${candidateScore} Puan) adayı için Operasyon Ekibimize ve Admin Paneline anlık bildirim gönderildi.`
    });
  } catch (error) {
    console.error('Talent Pool Request Error:', error);
    return NextResponse.json({ success: false, message: 'İşlem sırasında hata oluştu.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const requests = await prisma.talentPoolRequest.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, requests });
  } catch (error) {
    console.error('Error fetching talent pool requests:', error);
    return NextResponse.json({ success: false, message: 'Talepler alınamadı.' }, { status: 500 });
  }
}
