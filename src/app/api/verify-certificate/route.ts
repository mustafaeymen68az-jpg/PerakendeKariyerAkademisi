import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code')?.trim();

    if (!code) {
      return NextResponse.json({ success: false, message: 'Lütfen bir sertifika kodu belirtiniz.' }, { status: 400 });
    }

    const certificate = await prisma.certificate.findUnique({
      where: { code },
      include: {
        user: {
          select: { name: true, email: true, company: { select: { name: true } } }
        },
        training: {
          select: { title: true, duration: true }
        }
      }
    });

    if (!certificate) {
      return NextResponse.json({ success: false, message: 'Belirtilen kod ile eşleşen geçerli bir sertifika bulunamadı.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      certificate: {
        code: certificate.code,
        studentName: certificate.user.name,
        companyName: certificate.user.company?.name || 'Bireysel Katılımcı',
        trainingTitle: certificate.training.title,
        duration: certificate.training.duration,
        issueDate: certificate.issueDate,
        status: certificate.status
      }
    });
  } catch (error) {
    console.error('Error verifying certificate:', error);
    return NextResponse.json({ success: false, message: 'Sertifika doğrulama işlemi sırasında sunucu hatası oluştu.' }, { status: 500 });
  }
}
