import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('user_session');

  // Protected dashboard routes — require session
  const protectedPaths = ['/admin', '/panel', '/kurumsal', '/egitmen'];
  const isProtectedRoute = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );

  // Auth pages (login & register) — redirect logged-in users away
  const authPaths = ['/giris', '/kayit'];
  const isAuthRoute = authPaths.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );

  if (isProtectedRoute && !sessionCookie) {
    // No session cookie — redirect to register page
    const registerUrl = new URL('/kayit', request.url);
    return NextResponse.redirect(registerUrl);
  }

  if (isAuthRoute && sessionCookie) {
    // User has session cookie — redirect to their panel
    try {
      const sessionData = JSON.parse(decodeURIComponent(sessionCookie.value));
      let redirectUrl = '/panel';
      if (sessionData.role === 'ADMIN') {
        redirectUrl = '/admin';
      } else if (sessionData.role === 'COMPANY_MANAGER') {
        redirectUrl = '/kurumsal';
      } else if (sessionData.role === 'TRAINER') {
        redirectUrl = '/egitmen';
      }
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    } catch {
      // Invalid cookie — let them through to login
      const response = NextResponse.next();
      response.cookies.set('user_session', '', { path: '/', maxAge: 0 });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/panel/:path*',
    '/kurumsal/:path*',
    '/egitmen/:path*',
    '/giris',
    '/kayit',
  ],
};
