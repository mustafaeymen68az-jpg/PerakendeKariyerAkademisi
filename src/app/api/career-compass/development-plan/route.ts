import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let user = null;
    if (userId) {
      user = await prisma.user.findUnique({ where: { id: userId } });
    }
    if (!user) {
      user = await prisma.user.findFirst();
    }
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const plan = await prisma.careerDevelopmentPlan.findUnique({
      where: { userId: user.id },
      include: { items: { orderBy: { createdAt: 'asc' } } }
    });

    return NextResponse.json({
      success: true,
      plan
    });
  } catch (error: any) {
    console.error('Error fetching development plan:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, itemId, status, notes } = body;

    let targetUserId = userId;
    if (!targetUserId) {
      const u = await prisma.user.findFirst();
      targetUserId = u?.id;
    }

    if (itemId && status) {
      await prisma.developmentPlanItem.update({
        where: { id: itemId },
        data: { status }
      });
    }

    if (notes) {
      await prisma.careerDevelopmentPlan.update({
        where: { userId: targetUserId },
        data: { notes }
      });
    }

    const updatedPlan = await prisma.careerDevelopmentPlan.findUnique({
      where: { userId: targetUserId },
      include: { items: true }
    });

    return NextResponse.json({
      success: true,
      plan: updatedPlan
    });
  } catch (error: any) {
    console.error('Error updating development plan:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
