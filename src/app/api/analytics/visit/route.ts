import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';
import { getLocationFromIp } from '@/lib/geo';

function parseUserAgent(ua: string) {
  let deviceType = 'Masaüstü';
  let browser = 'Diğer';
  let os = 'Bilinmiyor';

  if (!ua) return { deviceType, browser, os };

  // Device
  if (/mobile/i.test(ua)) deviceType = 'Mobil';
  else if (/tablet|ipad/i.test(ua)) deviceType = 'Tablet';

  // OS
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(ua)) os = 'Mac OS';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/linux/i.test(ua)) os = 'Linux';

  // Browser
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/safari/i.test(ua)) browser = 'Safari';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/opera|opr/i.test(ua)) browser = 'Opera';

  return { deviceType, browser, os };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, path, pageTitle, referrer } = body || {};

    if (!sessionId) {
      return NextResponse.json({ success: false, message: 'Session ID gerekli' }, { status: 400 });
    }

    // IP Extraction
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const ipAddress = (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || '127.0.0.1';

    // User Agent Extraction
    const userAgent = req.headers.get('user-agent') || '';
    const { deviceType, browser, os } = parseUserAgent(userAgent);

    // User Session Cookie check
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('user_session');

    let userId: string | null = null;
    let userName: string | null = null;
    let userEmail: string | null = null;
    let userRole: string | null = null;
    let userCity: string | null = null;
    let isRegistered = false;

    if (sessionCookie?.value) {
      try {
        const userObj = JSON.parse(sessionCookie.value);
        if (userObj && userObj.id) {
          userId = userObj.id;
          userName = userObj.name ? `${userObj.name} ${userObj.surname || ''}`.trim() : userObj.email;
          userEmail = userObj.email;
          userRole = userObj.role;
          userCity = userObj.city || null;
          isRegistered = true;
        }
      } catch {
        // Invalid session cookie format
      }
    }

    // Geolocation Resolution
    const geo = await getLocationFromIp(ipAddress, req.headers);
    const city = userCity || geo.city || 'İstanbul';
    const country = geo.country || 'Türkiye';

    // Check existing visit session in last 30 minutes
    const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000);
    const existingVisit = await prisma.siteVisit.findFirst({
      where: {
        sessionId,
        lastActiveAt: { gte: thirtyMinsAgo }
      },
      orderBy: { lastActiveAt: 'desc' }
    });

    if (existingVisit) {
      const updated = await prisma.siteVisit.update({
        where: { id: existingVisit.id },
        data: {
          path: path || existingVisit.path,
          pageTitle: pageTitle || existingVisit.pageTitle,
          lastActiveAt: new Date(),
          visitCount: existingVisit.visitCount + 1,
          city: existingVisit.city || city,
          country: existingVisit.country || country,
          ...(isRegistered && !existingVisit.isRegistered ? {
            userId,
            userName,
            userEmail,
            userRole,
            isRegistered: true
          } : {})
        }
      });
      return NextResponse.json({ success: true, visitId: updated.id, updated: true });
    }

    // Create new visit record
    const newVisit = await prisma.siteVisit.create({
      data: {
        sessionId,
        userId: userId || undefined,
        userEmail: userEmail || undefined,
        userName: userName || undefined,
        userRole: userRole || undefined,
        isRegistered,
        ipAddress,
        userAgent,
        deviceType,
        browser,
        os,
        path: path || '/',
        pageTitle: pageTitle || '',
        referrer: referrer || '',
        city,
        country,
        visitCount: 1,
        lastActiveAt: new Date()
      }
    });

    return NextResponse.json({ success: true, visitId: newVisit.id, created: true });
  } catch (error) {
    console.error('Error recording site visit:', error);
    return NextResponse.json({ success: false, message: 'Ziyaret kaydedilemedi' }, { status: 500 });
  }
}

