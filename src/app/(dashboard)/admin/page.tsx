import React from 'react';
import { prisma } from '@/lib/db';
import AdminDashboardClient from './AdminDashboardClient';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const revalidate = 0; // Dynamic rendering for admin panel to see real-time updates

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('user_session');

  if (!sessionCookie) {
    redirect('/giris');
  }

  let user: any = null;
  try {
    user = JSON.parse(sessionCookie.value);
  } catch (e) {
    redirect('/giris');
  }

  if (user.role !== 'ADMIN') {
    redirect('/giris'); // Restrict access
  }

  let totalTrainings = 0;
  let pendingRequestCount = 0;
  let totalCompanies = 0;
  let totalStudents = 0;
  let requests: any[] = [];

  try {
    totalTrainings = await prisma.training.count();
    pendingRequestCount = await prisma.trainingRequest.count({ where: { status: 'BEKLIYOR' } });
    totalCompanies = await prisma.company.count();
    totalStudents = await prisma.user.count({ where: { role: 'PARTICIPANT' } });

    requests = await prisma.trainingRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        company: {
          select: { name: true }
        }
      }
    });
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
  }

  return (
    <AdminDashboardClient
      stats={{
        totalTrainings,
        pendingRequestCount,
        totalCompanies,
        totalStudents
      }}
      initialRequests={requests}
    />
  );
}
