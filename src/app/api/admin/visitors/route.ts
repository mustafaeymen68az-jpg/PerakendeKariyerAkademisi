import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('user_session');

    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: 'Yetkisiz erişim' }, { status: 401 });
    }

    let user: any = null;
    try {
      user = JSON.parse(sessionCookie.value);
    } catch {
      return NextResponse.json({ success: false, message: 'Oturum geçersiz' }, { status: 401 });
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Yönetici yetkisi gerekli' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get('filter') || 'ALL';
    const search = searchParams.get('search') || '';

    const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);

    // Compute stats
    const totalVisitors = await prisma.siteVisit.count();
    const registeredVisitors = await prisma.siteVisit.count({ where: { isRegistered: true } });
    const guestVisitors = await prisma.siteVisit.count({ where: { isRegistered: false } });
    const activeNow = await prisma.siteVisit.count({ where: { lastActiveAt: { gte: fifteenMinsAgo } } });

    // Compute top locations
    const cityGroups = await prisma.siteVisit.groupBy({
      by: ['city', 'country'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 6
    });

    const topLocations = cityGroups.map(g => ({
      city: g.city || 'Bilinmiyor',
      country: g.country || 'Türkiye',
      count: g._count.id
    }));

    // Build filter condition
    let whereCondition: any = {};

    if (filter === 'REGISTERED') {
      whereCondition.isRegistered = true;
    } else if (filter === 'UNREGISTERED') {
      whereCondition.isRegistered = false;
    } else if (filter === 'ACTIVE_NOW') {
      whereCondition.lastActiveAt = { gte: fifteenMinsAgo };
    }

    if (search.trim()) {
      const q = search.trim();
      whereCondition.OR = [
        { userName: { contains: q } },
        { userEmail: { contains: q } },
        { sessionId: { contains: q } },
        { ipAddress: { contains: q } },
        { path: { contains: q } },
        { pageTitle: { contains: q } },
        { browser: { contains: q } },
        { deviceType: { contains: q } },
        { city: { contains: q } },
        { country: { contains: q } }
      ];
    }

    const visitors = await prisma.siteVisit.findMany({
      where: whereCondition,
      orderBy: { lastActiveAt: 'desc' },
      take: 100,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            role: true,
            title: true,
            companyName: true,
            city: true
          }
        }
      }
    });

    const formattedVisitors = visitors.map(v => ({
      id: v.id,
      sessionId: v.sessionId,
      userId: v.userId,
      userEmail: v.userEmail || v.user?.email || null,
      userName: v.userName || (v.user ? `${v.user.name} ${v.user.surname || ''}`.trim() : null),
      userRole: v.userRole || v.user?.role || null,
      isRegistered: v.isRegistered,
      ipAddress: v.ipAddress,
      userAgent: v.userAgent,
      deviceType: v.deviceType,
      browser: v.browser,
      os: v.os,
      path: v.path,
      pageTitle: v.pageTitle,
      referrer: v.referrer,
      city: v.city || v.user?.city || 'İstanbul',
      country: v.country || 'Türkiye',
      visitCount: v.visitCount,
      lastActiveAt: v.lastActiveAt.toISOString(),
      createdAt: v.createdAt.toISOString(),
      user: v.user
    }));

    return NextResponse.json({
      success: true,
      stats: {
        totalVisitors,
        registeredVisitors,
        guestVisitors,
        activeNow,
        topLocations
      },
      visitors: formattedVisitors
    });
  } catch (error) {
    console.error('Error fetching admin visitors:', error);
    return NextResponse.json({ success: false, message: 'Ziyaretçiler alınamadı' }, { status: 500 });
  }
}
