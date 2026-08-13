import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Lütfen e-posta ve şifrenizi giriniz.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        company: true,
        department: true
      }
    });

    if (!user || user.password !== password) {
      return NextResponse.json({ success: false, message: 'Geçersiz e-posta adresi veya şifre.' }, { status: 401 });
    }

    // Determine redirect URL based on role
    let redirectUrl = '/panel';
    if (user.role === 'ADMIN') {
      redirectUrl = '/admin';
    } else if (user.role === 'COMPANY_MANAGER') {
      redirectUrl = '/kurumsal';
    }

    // Set a simulated session cookie (simple HTTP-only indicator in a production app)
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company?.name || null,
        department: user.department?.name || null
      },
      redirectUrl
    });

    // Save simple user details in a cookie for dashboard pages to read
    response.cookies.set('user_session', JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      company: user.company?.name || null,
      department: user.department?.name || null
    }), {
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Giriş işlemi sırasında hata oluştu.' }, { status: 500 });
  }
}
