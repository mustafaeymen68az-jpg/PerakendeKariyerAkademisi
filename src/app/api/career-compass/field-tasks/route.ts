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

    // Get assigned user field tasks or create demo user tasks if none exist
    let userTasks = await prisma.userFieldTask.findMany({
      where: { userId: user.id },
      include: { fieldTask: { include: { competency: true } } }
    });

    if (userTasks.length === 0) {
      const allTasks = await prisma.fieldTask.findMany({ where: { active: true } });
      for (const ft of allTasks) {
        await prisma.userFieldTask.create({
          data: {
            userId: user.id,
            fieldTaskId: ft.id,
            status: 'BEKLIYOR',
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
          }
        });
      }

      userTasks = await prisma.userFieldTask.findMany({
        where: { userId: user.id },
        include: { fieldTask: { include: { competency: true } } }
      });
    }

    return NextResponse.json({
      success: true,
      tasks: userTasks
    });
  } catch (error: any) {
    console.error('Error fetching field tasks:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userTaskId,
      evidenceFileUrl,
      evidenceNotes,
      reflectionProblem,
      reflectionRootCause,
      reflectionActionTaken,
      reflectionResult,
      reflectionFutureAction
    } = body;

    if (!userTaskId) {
      return NextResponse.json({ success: false, error: 'userTaskId is required' }, { status: 400 });
    }

    const reflectionObj = {
      problem: reflectionProblem || 'Raf bulunurluğunda stok sapması tespit edildi.',
      rootCause: reflectionRootCause || 'Depo mal kabulünün zamanında yapılmaması.',
      actionTaken: reflectionActionTaken || 'Reyon ve depo stoğu fiziksel olarak eşlendi, sapma sisteme girildi.',
      result: reflectionResult || 'Raf bulunurluk oranı %85\'ten %98\'e yükseldi.',
      futureAction: reflectionFutureAction || 'Haftalık mal kabul denetim rutinleri takvime eklendi.'
    };

    const updatedTask = await prisma.userFieldTask.update({
      where: { id: userTaskId },
      data: {
        status: 'INCELEMEDE',
        submittedAt: new Date(),
        evidence: JSON.stringify({
          fileUrl: evidenceFileUrl || 'raf_bulunurluk_analizi.pdf',
          notes: evidenceNotes || 'Saha uygulaması tamamlandı, fotomüzakere dokümanı eklendi.'
        }),
        reflection: JSON.stringify(reflectionObj)
      },
      include: { fieldTask: true }
    });

    return NextResponse.json({
      success: true,
      task: updatedTask,
      message: 'Saha görevi başarıyla yöneticinize / mentörünüze gönderildi!'
    });
  } catch (error: any) {
    console.error('Error submitting field task:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
