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
      include: {
        professionalPosition: true,
        targetPosition: true,
        userRoles: { include: { role: true } }
      }
    });

    if (!user) {
      const response = NextResponse.json({ autoLogin: false });
      response.cookies.set('user_session', '', { path: '/', maxAge: 0 });
      return response;
    }

    // Check 7-day window
    if (!user.lastLoginAt) {
      const response = NextResponse.json({ autoLogin: false });
      response.cookies.set('user_session', '', { path: '/', maxAge: 0 });
      return response;
    }

    const timeSinceLastLogin = Date.now() - new Date(user.lastLoginAt).getTime();

    if (timeSinceLastLogin > SEVEN_DAYS_MS) {
      const response = NextResponse.json({ autoLogin: false, reason: 'expired' });
      response.cookies.set('user_session', '', { path: '/', maxAge: 0 });
      return response;
    }

    const availableRolesSet = new Set<string>();
    user.userRoles.forEach(ur => availableRolesSet.add(ur.role.name));

    // Fallback legacy mapping
    if (user.role === 'ADMIN') availableRolesSet.add('PLATFORM_ADMIN');
    if (user.role === 'COMPANY_MANAGER') availableRolesSet.add('ORGANIZATION_ADMIN');
    if (user.role === 'TRAINER') availableRolesSet.add('INSTRUCTOR');
    if (user.role === 'PARTICIPANT' || user.role === 'USER') availableRolesSet.add('STUDENT');
    if (availableRolesSet.size === 0) availableRolesSet.add('STUDENT');

    const availableRoles = Array.from(availableRolesSet);
    const activeRole = sessionData.activeRole || sessionData.role || availableRoles[0];

    let redirectUrl = '/panel';
    if (activeRole === 'PLATFORM_ADMIN' || user.role === 'ADMIN') redirectUrl = '/admin';
    else if (activeRole === 'ORGANIZATION_ADMIN' || user.role === 'COMPANY_MANAGER') redirectUrl = '/kurumsal';
    else if (activeRole === 'INSTRUCTOR' || user.role === 'TRAINER') redirectUrl = '/egitmen';

    return NextResponse.json({
      autoLogin: true,
      redirectUrl,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        activeRole,
        availableRoles,
        professionalPosition: user.professionalPosition?.name || user.customPosition || user.title || 'Perakende Çalışanı',
        targetPosition: user.targetPosition?.name || 'Mağaza Müdürü',
        customerType: user.customerType || 'INDIVIDUAL',
        companyId: user.companyId
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ autoLogin: false });
  }
}
