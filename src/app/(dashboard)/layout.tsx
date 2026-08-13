import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  GraduationCap,
  LayoutDashboard,
  TrendingUp,
  Bot,
  Award,
  Users,
  FileSpreadsheet,
  PlusCircle,
  Inbox,
  LogOut,
  UserCheck
} from 'lucide-react';

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
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

  // Define sidebar menu options based on role
  let menuItems: SidebarItem[] = [];

  if (user.role === 'ADMIN') {
    menuItems = [
      { name: 'Admin Paneli', path: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
      { name: 'Eğitim Talepleri', path: '/admin/talepler', icon: <Inbox className="h-5 w-5" /> },
      { name: 'Excel Aktarımı', path: '/admin/excel-import', icon: <FileSpreadsheet className="h-5 w-5" /> }
    ];
  } else if (user.role === 'COMPANY_MANAGER') {
    menuItems = [
      { name: 'Kurumsal Panel', path: '/kurumsal', icon: <LayoutDashboard className="h-5 w-5" /> },
      { name: 'Çalışan Gelişimi', path: '/kurumsal/calisanlar', icon: <UserCheck className="h-5 w-5" /> },
      { name: 'KPI Analizi', path: '/kurumsal/kpi-takip', icon: <TrendingUp className="h-5 w-5" /> }
    ];
  } else {
    // PARTICIPANT
    menuItems = [
      { name: 'Katılımcı Paneli', path: '/panel', icon: <LayoutDashboard className="h-5 w-5" /> },
      { name: 'KPI Simülatörü', path: '/panel/simulatordashboard', icon: <TrendingUp className="h-5 w-5" /> },
      { name: 'Yapay Zeka Mentor', path: '/panel/mentor', icon: <Bot className="h-5 w-5" /> },
      { name: 'Sertifikalarım', path: '/panel/sertifikalar', icon: <Award className="h-5 w-5" /> }
    ];
  }

  return (
    <div className="flex h-screen bg-light-bg overflow-hidden">
      {/* Left Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-primary-navy text-gray-300 border-r border-gray-800 shrink-0">
        {/* Sidebar Header / Logo */}
        <div className="p-6 border-b border-gray-800">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-corporate-blue p-2 rounded-lg text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm leading-tight text-white">
                Perakende Mühendisi
              </span>
              <span className="text-[9px] text-turquoise-accent uppercase tracking-widest font-semibold">
                Akademi Paneli
              </span>
            </div>
          </Link>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* User Info & Logout (Bottom) */}
        <div className="p-4 border-t border-gray-800 bg-[#071526] space-y-3">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-9 h-9 rounded-full bg-corporate-blue text-white flex items-center justify-center text-sm font-bold shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-bold text-white truncate">{user.name}</span>
              <span className="block text-[9px] text-gray-400 truncate">{user.email}</span>
            </div>
          </div>
          
          <Link
            href="/api/auth/logout"
            className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-red-400 hover:text-white hover:bg-red-500/10 transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            <span>Çıkış Yap</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar (for mobile header etc.) */}
        <header className="h-16 bg-white border-b border-gray-150 flex items-center justify-between px-6 md:px-8 relative z-20 shrink-0">
          <div className="flex items-center space-x-2 md:hidden">
            {/* Mobile Logo */}
            <div className="bg-primary-navy p-1.5 rounded-md text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-display font-bold text-xs text-primary-navy">Akademi Paneli</span>
          </div>
          
          <div className="hidden md:flex items-center text-xs font-semibold text-gray-500">
            Rol: <span className="bg-light-blue text-corporate-blue px-2 py-0.5 rounded-full ml-1 font-bold text-[10px]">{user.role}</span>
            {user.company && (
              <span className="ml-3 border-l border-gray-200 pl-3">Şirket: <strong>{user.company}</strong></span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <span className="block text-xs font-bold text-primary-navy">{user.name}</span>
              <span className="block text-[9px] text-gray-400 uppercase tracking-widest">{user.role === 'ADMIN' ? 'Yönetici' : user.role === 'COMPANY_MANAGER' ? 'Şirket Yöneticisi' : 'Katılımcı'}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-light-blue text-corporate-blue border border-corporate-blue/20 flex items-center justify-center font-bold text-sm">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Dashboard Scrollable Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative z-10 focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}
