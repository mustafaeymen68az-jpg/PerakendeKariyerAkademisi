import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { signInWithPassword, signUp, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Lütfen e-posta ve şifrenizi giriniz.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Auto-seed/ensure special Admin account for mustafaeymen68az@gmail.com
    if (cleanEmail === 'mustafaeymen68az@gmail.com') {
      let adminUser = await prisma.user.findUnique({ where: { email: cleanEmail } });
      if (!adminUser) {
        await prisma.user.create({
          data: {
            name: 'Mustafa Eymen',
            surname: 'Admin',
            email: cleanEmail,
            password: password || '123456',
            role: 'ADMIN',
            title: 'Sistem Yöneticisi & Admin'
          }
        });
      } else if (adminUser.role !== 'ADMIN') {
        await prisma.user.update({
          where: { id: adminUser.id },
          data: { role: 'ADMIN' }
        });
      }
    }

    // Auto-seed/ensure default Instructor account if requested
    if (cleanEmail === 'egitmen@perakendekariyer.com') {
      let trainerUser = await prisma.user.findUnique({ where: { email: cleanEmail } });
      if (!trainerUser) {
        await prisma.user.create({
          data: {
            name: 'Dr. Ahmet Yılmaz',
            surname: 'Eğitmen',
            email: cleanEmail,
            password: password || '123456',
            role: 'TRAINER',
            title: 'Kıdemli Perakende Baş Eğitmeni'
          }
        });
      }
    }

    let user = await prisma.user.findUnique({
      where: { email: cleanEmail },
      include: {
        company: true,
        department: true
      }
    });

    let supabaseAuthSuccess = false;
    let supabaseUser = null;
    let supabaseSession = null;

    // If Supabase is configured, sync/authenticate with Supabase Auth
    if (isSupabaseConfigured()) {
      let { data, error } = await signInWithPassword({ email: cleanEmail, password });

      // If user does not exist in Supabase Auth yet, auto-create them in Supabase Auth!
      if (error && (error.message.includes('Invalid login credentials') || error.message.includes('User not found'))) {
        const { data: signUpData, error: signUpError } = await signUp({ email: cleanEmail, password });
        if (!signUpError && signUpData?.user) {
          supabaseAuthSuccess = true;
          supabaseUser = signUpData.user;
          supabaseSession = signUpData.session;
        }
      } else if (!error && data?.user) {
        supabaseAuthSuccess = true;
        supabaseUser = data.user;
        supabaseSession = data.session;
      }
    }

    // If neither Supabase Auth nor local user password matched
    if (!supabaseAuthSuccess && (!user || user.password !== password)) {
      return NextResponse.json({ success: false, message: 'Geçersiz e-posta adresi veya şifre.' }, { status: 401 });
    }

    // Update lastLoginAt if user exists in database
    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });
    }

    const role = user?.role || 'USER';
    let redirectUrl = '/panel';
    if (role === 'ADMIN') {
      redirectUrl = '/admin';
    } else if (role === 'COMPANY_MANAGER') {
      redirectUrl = '/kurumsal';
    } else if (role === 'TRAINER') {
      redirectUrl = '/egitmen';
    }

    const response = NextResponse.json({
      success: true,
      supabaseAuthSuccess,
      supabaseUser: supabaseUser ? { id: supabaseUser.id, email: supabaseUser.email } : null,
      user: user
        ? {
            id: user.id,
            name: `${user.name} ${user.surname || ''}`.trim(),
            email: user.email,
            role: user.role,
            company: user.company?.name || null,
            department: user.department?.name || null
          }
        : {
            id: supabaseUser?.id || 'sp_user',
            name: cleanEmail.split('@')[0],
            email: cleanEmail,
            role: 'USER',
            company: null,
            department: null
          },
      redirectUrl
    });

    response.cookies.set(
      'user_session',
      JSON.stringify({
        id: user?.id || supabaseUser?.id,
        name: user ? `${user.name} ${user.surname || ''}`.trim() : cleanEmail.split('@')[0],
        email: cleanEmail,
        role: role,
        companyId: user?.companyId || null,
        company: user?.company?.name || null,
        department: user?.department?.name || null,
        supabaseAccessToken: supabaseSession?.access_token || null
      }),
      {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax',
      }
    );

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Giriş işlemi sırasında hata oluştu.' }, { status: 500 });
  }
}
