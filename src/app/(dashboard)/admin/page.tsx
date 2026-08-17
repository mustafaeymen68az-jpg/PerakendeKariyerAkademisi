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
  let totalUsers = 0;
  let adminUsersCount = 0;
  let requests: any[] = [];
  let initialUsers: any[] = [];

  let visitorStats = {
    totalVisitors: 0,
    registeredVisitors: 0,
    guestVisitors: 0,
    activeNow: 0
  };
  let initialVisitors: any[] = [];

  try {
    totalTrainings = await prisma.training.count();
    pendingRequestCount = await prisma.trainingRequest.count({ where: { status: 'BEKLIYOR' } });
    totalCompanies = await prisma.company.count();
    totalStudents = await prisma.user.count({ where: { role: 'PARTICIPANT' } });
    totalUsers = await prisma.user.count();
    adminUsersCount = await prisma.user.count({ where: { role: 'ADMIN' } });

    // Visitors data
    const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
    visitorStats = {
      totalVisitors: await prisma.siteVisit.count(),
      registeredVisitors: await prisma.siteVisit.count({ where: { isRegistered: true } }),
      guestVisitors: await prisma.siteVisit.count({ where: { isRegistered: false } }),
      activeNow: await prisma.siteVisit.count({ where: { lastActiveAt: { gte: fifteenMinsAgo } } })
    };

    const rawVisitors = await prisma.siteVisit.findMany({
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

    initialVisitors = rawVisitors.map(v => ({
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
      visitCount: v.visitCount,
      lastActiveAt: v.lastActiveAt ? new Date(v.lastActiveAt).toISOString() : new Date().toISOString(),
      createdAt: v.createdAt ? new Date(v.createdAt).toISOString() : new Date().toISOString(),
      user: v.user
    }));

    requests = await prisma.trainingRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        company: {
          select: { name: true }
        }
      }
    });

    const rawUsers = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        password: true,
        role: true,
        title: true,
        companyName: true,
        sectorChannel: true,
        sectorDetail: true,
        city: true,
        lastLoginAt: true,
        createdAt: true,
        company: { select: { name: true } },
        department: { select: { name: true } }
      }
    });

    initialUsers = rawUsers.map(u => ({
      ...u,
      createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : new Date().toISOString(),
      lastLoginAt: u.lastLoginAt ? new Date(u.lastLoginAt).toISOString() : null,
    }));
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
  }

  return (
    <AdminDashboardClient
      stats={{
        totalTrainings,
        pendingRequestCount,
        totalCompanies,
        totalStudents,
        totalUsers,
        adminUsersCount,
        ...visitorStats
      }}
      initialRequests={requests}
      initialUsers={initialUsers}
      initialVisitors={initialVisitors}
    />
  );
}
