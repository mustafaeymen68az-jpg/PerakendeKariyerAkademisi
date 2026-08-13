import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    // Read body (it could be URL-encoded or JSON depending on submission style)
    let userId = '';
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData();
      userId = formData.get('userId') as string;
    } else {
      const body = await req.json();
      userId = body.userId;
    }

    if (!userId) {
      return NextResponse.json({ success: false, message: 'User ID is required.' }, { status: 400 });
    }

    // Find the user
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
    }

    // Find first training in database
    const training = await prisma.training.findFirst();
    if (!training) {
      return NextResponse.json({ success: false, message: 'No trainings found in the database. Please seed first.' }, { status: 400 });
    }

    // Check if certificate already exists
    const existingCert = await prisma.certificate.findFirst({
      where: { userId, trainingId: training.id }
    });

    if (!existingCert) {
      const code = `CERT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      await prisma.certificate.create({
        data: {
          code: code,
          userId: userId,
          trainingId: training.id,
          status: 'AKTIF'
        }
      });
    }

    // Redirect back to certificates page
    return NextResponse.redirect(new URL('/panel/sertifikalar', req.url), { status: 303 });
  } catch (error) {
    console.error('Error creating demo certificate:', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}
