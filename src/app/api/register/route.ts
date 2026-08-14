import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      surname,
      email,
      password,
      companyName,
      sectorChannel,
      sectorDetail,
      city,
      title,
    } = body;

    // Basic Validation
    if (!name || !surname || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Lütfen İsim, Soyisim, E-posta ve Şifre alanlarını doldurunuz.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Şifre en az 6 karakter olmalıdır.' },
        { status: 400 }
      );
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Bu e-posta adresi zaten kayıtlı. Giriş yapmayı deneyin.' },
        { status: 409 }
      );
    }

    // Combine fullName for display
    const fullName = `${name.trim()} ${surname.trim()}`;

    // Create user in DB
    const now = new Date();
    const user = await prisma.user.create({
      data: {
        name: fullName,
        surname: surname ? surname.trim() : null,
        email: email.trim().toLowerCase(),
        password,
        role: 'PARTICIPANT',
        companyName: companyName ? companyName.trim() : null,
        sectorChannel: sectorChannel ? sectorChannel.trim() : null,
        sectorDetail: sectorDetail ? sectorDetail.trim() : null,
        city: city ? city.trim() : null,
        title: title ? title.trim() : null,
        lastLoginAt: now,
      },
    });

    // Set session cookie (7 days)
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.companyName || null,
        department: null,
      },
      redirectUrl: '/panel',
    });

    response.cookies.set(
      'user_session',
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyId: null,
        company: user.companyName || null,
        department: null,
      }),
      {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        httpOnly: false,
        sameSite: 'lax',
      }
    );

    return response;
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, message: 'Kayıt işlemi sırasında hata oluştu.' },
      { status: 500 }
    );
  }
}
