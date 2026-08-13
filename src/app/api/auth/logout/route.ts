import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect(new URL('/', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
  
  // Delete the session cookie by setting its maxAge to 0
  response.cookies.set('user_session', '', { path: '/', maxAge: 0 });
  
  return response;
}
