import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserSystemRoles, ROLE_REDIRECTS, SystemRoleType } from '@/lib/rbac';

export async function POST(req: Request) {
  try {
    const { targetRole } = await req.json();

    const cookieHeader = req.headers.get('cookie') || '';
    const sessionMatch = cookieHeader.match(/user_session=([^;]+)/);

    if (!sessionMatch) {
      return NextResponse.json({ success: false, message: 'Oturum bulunamadı.' }, { status: 401 });
    }

    let sessionData: any;
    try {
      sessionData = JSON.parse(decodeURIComponent(sessionMatch[1]));
    } catch {
      return NextResponse.json({ success: false, message: 'Geçersiz oturum.' }, { status: 401 });
    }

    if (!sessionData?.id) {
      return NextResponse.json({ success: false, message: 'Kullanıcı doğrulanamadı.' }, { status: 401 });
    }

    const availableRoles = await getUserSystemRoles(sessionData.id);

    if (!availableRoles.includes(targetRole as SystemRoleType) && !availableRoles.includes('PLATFORM_ADMIN')) {
      return NextResponse.json({
        success: false,
        message: 'Bu role geçiş yetkiniz bulunmamaktadır.'
      }, { status: 403 });
    }

    const redirectUrl = ROLE_REDIRECTS[targetRole as SystemRoleType] || '/panel';

    const updatedSession = {
      ...sessionData,
      activeRole: targetRole,
      role: targetRole // Update primary active role context
    };

    const response = NextResponse.json({
      success: true,
      activeRole: targetRole,
      redirectUrl
    });

    response.cookies.set('user_session', JSON.stringify(updatedSession), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax'
    });

    return response;
  } catch (error) {
    console.error('Error switching active role:', error);
    return NextResponse.json({ success: false, message: 'Rol değiştirilemedi.' }, { status: 500 });
  }
}
