import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const careerPaths = await prisma.careerPath.findMany({
      include: {
        positions: {
          orderBy: { careerLevel: 'asc' },
          include: {
            requirements: { include: { competency: true } }
          }
        }
      }
    });

    const competencies = await prisma.competency.findMany({
      orderBy: { name: 'asc' }
    });

    const fieldTasks = await prisma.fieldTask.findMany({
      include: { competency: true, targetPosition: true }
    });

    return NextResponse.json({
      success: true,
      careerPaths,
      competencies,
      fieldTasks
    });
  } catch (error: any) {
    console.error('Error fetching admin career paths:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { entityType, data } = body;

    if (entityType === 'CAREER_PATH') {
      const created = await prisma.careerPath.create({ data });
      return NextResponse.json({ success: true, item: created });
    } else if (entityType === 'POSITION') {
      const created = await prisma.professionalPosition.create({ data });
      return NextResponse.json({ success: true, item: created });
    } else if (entityType === 'COMPETENCY') {
      const created = await prisma.competency.create({ data });
      return NextResponse.json({ success: true, item: created });
    } else if (entityType === 'FIELD_TASK') {
      const created = await prisma.fieldTask.create({ data });
      return NextResponse.json({ success: true, item: created });
    }

    return NextResponse.json({ success: false, error: 'Invalid entityType' }, { status: 400 });
  } catch (error: any) {
    console.error('Error creating entity:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
