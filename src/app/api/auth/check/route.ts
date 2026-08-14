import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const sessionMatch = cookieHeader.match(/user_session=([^;]+)/);

    if (!sessionMatch) {
      return NextResponse.json({ autoLogin: false });
    }

    let sessionData: any;
    try {
      sessionData = JSON.parse(decodeURIComponent(sessionMatch[1]));
    } catch {
      // Invalid cookie - clear it
      const response = NextResponse.json({ autoLogin: false });
      response.cookies.set('user_session', '', { path: '/', maxAge: 0 });
      return response;
    }

    if (!sessionData?.id) {
      const response = NextResponse.json({ autoLogin: false });
      response.cookies.set('user_session', '', { path: '/', maxAge: 0 });
      return response;
    }

    // Verify user exists in DB and check lastLoginAt
    const user = await prisma.user.findUnique({
      where: { id: sessionData.id },
      select: { id: true, role: true, lastLoginAt: true },
    });

    if (!user) {
      const response = NextResponse.json({ autoLogin: false });
      response.cookies.set('user_session', '', { path: '/', maxAge: 0 });
      return response;
    }

    // Check 7-day window
    if (!user.lastLoginAt) {
      // lastLoginAt is null (legacy user) — require manual login
      const response = NextResponse.json({ autoLogin: false });
      response.cookies.set('user_session', '', { path: '/', maxAge: 0 });
      return response;
    }

    const timeSinceLastLogin = Date.now() - new Date(user.lastLoginAt).getTime();

    if (timeSinceLastLogin > SEVEN_DAYS_MS) {
      // Expired — clear cookie and require manual login
      const response = NextResponse.json({ autoLogin: false, reason: 'expired' });
      response.cookies.set('user_session', '', { path: '/', maxAge: 0 });
      return response;
    }

    // Valid session — determine redirect URL
    let redirectUrl = '/panel';
    if (user.role === 'ADMIN') {
      redirectUrl = '/admin';
    } else if (user.role === 'COMPANY_MANAGER') {
      redirectUrl = '/kurumsal';
    }

    return NextResponse.json({
      autoLogin: true,
      redirectUrl,
      user: {
        id: user.id,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ autoLogin: false });
  }
}
