import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Lütfen e-posta ve şifrenizi giriniz.' }, { status: 400 });
    }

    // Auto-seed/ensure special Admin account for mustafaeymen68az@gmail.com
    if (email === 'mustafaeymen68az@gmail.com') {
      let adminUser = await prisma.user.findUnique({ where: { email } });
      if (!adminUser) {
        await prisma.user.create({
          data: {
            name: 'Mustafa Eymen',
            surname: 'Admin',
            email: 'mustafaeymen68az@gmail.com',
            password: password || '123456',
            role: 'ADMIN',
            title: 'Sistem Yöneticisi & Admin'
          }
        });
      } else if (adminUser.role !== 'ADMIN') {
        // Upgrade role to ADMIN if it was previously set otherwise
        await prisma.user.update({
          where: { id: adminUser.id },
          data: { role: 'ADMIN' }
        });
      }
    }

    // Auto-seed/ensure default Instructor account if requested
    if (email === 'egitmen@perakendekariyer.com') {
      let trainerUser = await prisma.user.findUnique({ where: { email } });
      if (!trainerUser) {
        await prisma.user.create({
          data: {
            name: 'Dr. Ahmet Yılmaz',
            surname: 'Eğitmen',
            email: 'egitmen@perakendekariyer.com',
            password: password || '123456',
            role: 'TRAINER',
            title: 'Kıdemli Perakende Baş Eğitmeni'
          }
        });
      }
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

    // Update lastLoginAt
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Determine redirect URL based on role
    let redirectUrl = '/panel';
    if (user.role === 'ADMIN') {
      redirectUrl = '/admin';
    } else if (user.role === 'COMPANY_MANAGER') {
      redirectUrl = '/kurumsal';
    } else if (user.role === 'TRAINER') {
      redirectUrl = '/egitmen';
    }

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: `${user.name} ${user.surname || ''}`.trim(),
        email: user.email,
        role: user.role,
        company: user.company?.name || null,
        department: user.department?.name || null
      },
      redirectUrl
    });

    response.cookies.set('user_session', JSON.stringify({
      id: user.id,
      name: `${user.name} ${user.surname || ''}`.trim(),
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      company: user.company?.name || null,
      department: user.department?.name || null
    }), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Giriş işlemi sırasında hata oluştu.' }, { status: 500 });
  }
}
