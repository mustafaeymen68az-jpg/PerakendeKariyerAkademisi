import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { eventName, userId, metadata } = await req.json();

    if (!eventName) {
      return NextResponse.json({ success: false, message: 'Olay adı zorunludur.' }, { status: 400 });
    }

    const event = await prisma.analyticsEvent.create({
      data: {
        eventName,
        userId: userId || undefined,
        metadata: metadata ? JSON.stringify(metadata) : undefined
      }
    });

    return NextResponse.json({ success: true, eventId: event.id });
  } catch (error) {
    console.error('Error logging analytics event:', error);
    return NextResponse.json({ success: false, message: 'Analitik kaydedilemedi.' }, { status: 500 });
  }
}
