import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { signUp, isSupabaseConfigured } from '@/lib/supabase';

const toStr = (val: any) => (val !== undefined && val !== null ? String(val).trim() : '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawName = toStr(body.name);
    let rawSurname = toStr(body.surname);
    const email = toStr(body.email).toLowerCase();
    const phone = toStr(body.phone);
    const password = toStr(body.password);
    const companyName = toStr(body.companyName);
    const sectorChannel = toStr(body.sectorChannel);
    const sectorDetail = toStr(body.sectorDetail);
    const city = toStr(body.city);
    const title = toStr(body.title);

    // Smart Name / Surname splitting if surname is missing
    let firstName = rawName;
    if (!rawSurname && rawName.includes(' ')) {
      const parts = rawName.split(' ');
      firstName = parts.slice(0, -1).join(' ');
      rawSurname = parts.slice(-1).join(' ');
    }

    // Basic Validation: Name, Surname (or full name), Phone, Email, Password required
    if (!firstName || !phone || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Lütfen Ad, Soyad, Telefon Numarası, E-posta ve Şifre alanlarını doldurunuz.' },
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

    // Check if email already exists in local DB
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Bu e-posta adresi zaten kayıtlı. Giriş yapmayı deneyin.' },
        { status: 409 }
      );
    }

    // Supabase Auth (non-blocking)
    let supabaseUserId = null;
    if (isSupabaseConfigured()) {
      try {
        const { data: sbData, error: sbError } = await signUp({
          email,
          password,
        });

        if (sbError && !sbError.message.includes('already registered')) {
          console.warn('Supabase Auth signUp info:', sbError.message);
        } else if (sbData?.user) {
          supabaseUserId = sbData.user.id;
        }
      } catch (sbErr) {
        console.warn('Supabase Auth warning:', sbErr);
      }
    }

    const fullName = rawSurname ? `${firstName} ${rawSurname}` : firstName;
    const now = new Date();

    // Construct user data object
    const userData: any = {
      name: fullName,
      surname: rawSurname || null,
      email,
      password,
      role: 'PARTICIPANT',
      companyName: companyName || null,
      title: title || null,
      lastLoginAt: now,
    };

    if (phone) userData.phone = phone;
    if (sectorChannel) userData.sectorChannel = sectorChannel;
    if (sectorDetail) userData.sectorDetail = sectorDetail;
    if (city) userData.city = city;

    let user;
    try {
      user = await prisma.user.create({
        data: userData,
      });
    } catch (createErr: any) {
      console.warn('Prisma create retry without optional fields:', createErr?.message);
      // Fallback if optional field schema mismatch occurs
      delete userData.phone;
      delete userData.sectorChannel;
      delete userData.sectorDetail;
      delete userData.city;
      user = await prisma.user.create({
        data: userData,
      });
    }

    // Set session cookie (7 days)
    const response = NextResponse.json({
      success: true,
      user: {
        id: supabaseUserId || user.id,
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
        id: supabaseUserId || user.id,
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
  } catch (error: any) {
    console.error('Register error details:', error);
    return NextResponse.json(
      { success: false, message: 'Kayıt işlemi sırasında bir hata oluştu. Lütfen bilgilerinizi kontrol edip tekrar deneyiniz.' },
      { status: 500 }
    );
  }
}
