'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  HelpCircle, 
  Award, 
  Target, 
  MessageSquare, 
  LogOut, 
  GraduationCap, 
  Menu, 
  X,
  Building2,
  Video,
  Upload,
  UserCheck,
  User,
  CheckSquare,
  Sparkles,
  BookOpenCheck
} from 'lucide-react';

export default function EgitmenLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Genel Bakış', href: '/egitmen', icon: LayoutDashboard },
    { name: 'Eğitmen Profilim & Özgeçmiş', href: '/egitmen/profil', icon: User },
    { name: 'Eğitim Atama Motoru', href: '/egitmen/egitim-atama', icon: BookOpenCheck },
    { name: 'Döküman & Medya Yükle', href: '/egitmen/dokumanlar', icon: Upload },
    { name: 'Sınav Hazırlama', href: '/egitmen/sinavlar', icon: HelpCircle },
    { name: 'Sınav Sonuçları', href: '/egitmen/sonuclar', icon: Award },
    { name: 'Öğrenci SWOT Analizi', href: '/egitmen/swot', icon: Target },
    { name: 'Öğrenciye Mesaj & Soru', href: '/egitmen/mesajlar', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F9] flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#0B2A4A] text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-[#087F96]" />
          <span className="font-display font-extrabold text-sm tracking-wide">
            Perakende Kariyer Akademisi
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-300 hover:text-white rounded-lg focus:outline-none"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-[#0B2A4A] text-white shrink-0 shadow-xl flex flex-col justify-between`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 hidden md:block">
            <div className="flex items-center space-x-3">
              <div className="bg-[#087F96] p-2.5 rounded-xl shadow-md">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-display font-extrabold text-sm leading-tight text-white">
                  Perakende Kariyer
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#DDF4F7] bg-white/10 px-2 py-0.5 rounded-full inline-block mt-0.5">
                  Eğitmen Portalı
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2 block">
              Eğitmen Menüsü
            </span>

            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#087F96] text-white shadow-md font-extrabold'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-[#087F96]'}`} />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Profile Quick Link */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <Link 
            href="/egitmen/profil"
            className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 flex items-center space-x-3 transition-colors block"
          >
            <div className="w-9 h-9 rounded-full bg-[#087F96] text-white font-bold flex items-center justify-center text-xs shrink-0 font-mono ring-2 ring-white/20">
              AY
            </div>
            <div className="truncate">
              <span className="text-xs font-bold text-white block truncate">
                Dr. Ahmet Yılmaz
              </span>
              <span className="text-[10px] text-[#DDF4F7] block truncate">
                Profili Düzenle & CV →
              </span>
            </div>
          </Link>

          <a
            href="/api/auth/logout"
            className="flex items-center justify-center space-x-2 w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-300 rounded-xl text-xs font-bold transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Çıkış Yap</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
