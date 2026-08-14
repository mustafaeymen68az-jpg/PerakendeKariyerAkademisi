'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  User, 
  Sparkles, 
  Building2, 
  ChevronRight, 
  Award, 
  GraduationCap, 
  Crown, 
  LogOut, 
  ShieldCheck, 
  ChevronDown,
  Mail,
  Briefcase
} from 'lucide-react';
import Logo from '@/components/Logo';

const MENU_ITEMS = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'Eğitim Kataloğu', path: '/egitimler' },
  { name: 'Departmanlar', path: '/departmanlar' },
  { name: 'Kariyer Yolları', path: '/kariyer-yollari' },
  { name: 'Taze Gıda', path: '/taze-gida-akademisi' },
  { name: 'Yapay Zekâ', path: '/yapay-zeka', badge: 'Yeni' },
  { name: 'Yönetici Programları', path: '/programlar' },
  { name: 'Kurumsal', path: '/kurumsal-cozumler' },
  { name: 'Sertifikasyon', path: '/sertifikasyon' },
  { name: 'Blog', path: '/blog' },
  { name: 'Hakkımızda', path: '/hakkimizda' }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const [sessionUser, setSessionUser] = useState<{
    id?: string;
    name: string;
    email: string;
    role: string;
    department?: string;
    company?: string;
  } | null>(null);

  // Read user session on mount
  useEffect(() => {
    try {
      const match = document.cookie.match(/user_session=([^;]+)/);
      if (match) {
        const parsed = JSON.parse(decodeURIComponent(match[1]));
        setSessionUser(parsed);
      }
    } catch (e) {
      console.error(e);
    }
  }, [pathname]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close profile dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAdmin = sessionUser?.email === 'mustafaeymen68az@gmail.com' || sessionUser?.role === 'ADMIN';

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0B2A4A]/98 shadow-xl backdrop-blur-md py-2.5 border-b border-[#087F96]/20' 
        : 'bg-[#0B2A4A] py-3 border-b border-white/10'
    }`}>
      {/* Top Banner Strip */}
      <div className="bg-[#061B33] text-[#DDF4F7] text-xs py-1.5 px-4 hidden lg:block border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 font-semibold text-[#087F96]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Türkiye'nin Perakende Kariyer & Yetkinlik Platformu</span>
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">2 Yıllık Yapılandırılmış Gelişim Modeli</span>
          </div>
          <div className="flex items-center space-x-4 font-mono text-[11px]">
            <span className="text-gray-300">www.perakendekariyer.com</span>
            <span className="text-gray-400">•</span>
            <Link href="/sertifikasyon" className="hover:text-white transition-colors flex items-center space-x-1">
              <Award className="w-3 h-3 text-[#087F96]" />
              <span>Sertifika Doğrulama</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center">
            <Logo variant="dark" size="md" showSubtext={true} />
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden 2xl:flex items-center space-x-1">
            {MENU_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'text-[#087F96] bg-white/10 font-bold'
                      : 'text-gray-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center space-x-1">
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="bg-[#087F96] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Compact XL Navigation Menu */}
          <nav className="hidden lg:flex 2xl:hidden items-center space-x-1">
            {MENU_ITEMS.slice(0, 6).map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`px-2 py-1.5 rounded-md text-[12px] font-medium transition-all ${
                    isActive
                      ? 'text-[#087F96] bg-white/10 font-bold'
                      : 'text-gray-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons & Top Right User Profile Widget */}
          <div className="hidden lg:flex items-center space-x-2">
            
            {/* Special Admin Button for mustafaeymen68az@gmail.com */}
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center space-x-1.5 px-3 py-2 bg-[#087F96] hover:bg-[#056B80] text-white rounded-xl text-xs font-extrabold shadow-md transition-all animate-pulse"
                title="Yönetici ve Kullanıcı Rol Yönetim Paneli"
              >
                <Crown className="h-4 w-4 text-amber-300" />
                <span>👑 Admin Paneli</span>
              </Link>
            )}

            {/* User Profile Widget Popover Trigger */}
            <div className="relative" ref={profileRef}>
              {sessionUser ? (
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-1.5 pr-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all text-xs font-bold text-white shadow-xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#087F96] text-white font-bold flex items-center justify-center text-[11px] font-mono shrink-0 shadow-xs">
                    {sessionUser.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="text-left truncate max-w-[110px]">
                    <span className="block truncate font-bold leading-tight">{sessionUser.name}</span>
                    <span className="text-[9px] text-[#DDF4F7] block font-mono leading-none">
                      {sessionUser.role === 'ADMIN' ? '👑 Admin' : sessionUser.role === 'TRAINER' ? '👨‍🏫 Eğitmen' : '🎓 Öğrenci'}
                    </span>
                  </div>
                  <ChevronDown className={`h-3.5 w-3.5 text-gray-300 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/giris"
                    className="flex items-center space-x-1.5 px-3 py-2 border border-[#087F96]/40 rounded-xl text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    <User className="h-3.5 w-3.5 text-[#087F96]" />
                    <span>Giriş Yap</span>
                  </Link>
                  <Link
                    href="/kayit"
                    className="flex items-center space-x-1 px-3 py-2 bg-[#087F96] hover:bg-[#056B80] rounded-xl text-xs font-bold text-white shadow-md transition-all"
                  >
                    <span>Kayıt Ol</span>
                  </Link>
                </div>
              )}

              {/* User Profile Popover Modal */}
              {isProfileOpen && sessionUser && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 z-50 animate-in fade-in zoom-in-95 duration-200 text-gray-800 space-y-4">
                  {/* User Profile Header */}
                  <div className="flex items-center space-x-3 border-b border-gray-100 pb-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#0B2A4A] text-white font-black text-sm flex items-center justify-center font-mono shadow-md border-2 border-[#087F96]">
                      {sessionUser.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-sm text-[#0B2A4A]">
                        {sessionUser.name}
                      </h4>
                      <span className="text-[10px] font-extrabold text-[#087F96] bg-[#DDF4F7] px-2 py-0.5 rounded-full inline-block mt-0.5">
                        {sessionUser.role === 'ADMIN' ? '👑 Sistem Yöneticisi' : sessionUser.role === 'TRAINER' ? '👨‍🏫 Baş Eğitmen' : '🎓 Perakende Katılımcısı'}
                      </span>
                    </div>
                  </div>

                  {/* Profile Details List */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-200/60">
                      <Mail className="h-4 w-4 text-[#087F96] shrink-0" />
                      <span className="truncate font-mono font-medium">{sessionUser.email}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-200/60">
                      <Briefcase className="h-4 w-4 text-[#087F96] shrink-0" />
                      <span className="truncate font-medium">
                        {sessionUser.department || sessionUser.company || 'Perakende Kadrosu'}
                      </span>
                    </div>
                  </div>

                  {/* Navigation Links inside Profile Modal */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs">
                    {/* Admin Panel Button inside Profile Modal for mustafaeymen68az@gmail.com */}
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setIsProfileOpen(false)}
                        className="w-full p-2.5 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl transition-all flex items-center justify-between shadow-xs mb-2"
                      >
                        <span className="flex items-center space-x-1.5">
                          <Crown className="h-4 w-4 text-amber-300" />
                          <span>👑 Admin Paneli Girişi</span>
                        </span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    )}

                    <Link
                      href="/panel"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between font-bold text-[#0B2A4A]"
                    >
                      <span className="flex items-center space-x-2">
                        <User className="h-3.5 w-3.5 text-[#087F96]" />
                        <span>🎓 Öğrenci Paneli</span>
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                    </Link>

                    <Link
                      href="/egitmen"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-between font-bold text-[#0B2A4A]"
                    >
                      <span className="flex items-center space-x-2">
                        <GraduationCap className="h-3.5 w-3.5 text-[#087F96]" />
                        <span>👨‍🏫 Eğitmen Portalı</span>
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                    </Link>
                  </div>

                  {/* Logout Button */}
                  <div className="pt-2 border-t border-gray-100">
                    <a
                      href="/api/auth/logout"
                      className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Oturumu Dondur / Çıkış Yap</span>
                    </a>
                  </div>

                </div>
              )}
            </div>

            {/* Quick Demo Button */}
            <Link
              href="/talep-olustur"
              className="flex items-center space-x-1 px-3.5 py-2 bg-[#087F96] hover:bg-[#056B80] rounded-xl text-xs font-bold text-white shadow-md hover:shadow-lg transition-all"
            >
              <span>Demo Talep Et</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            {sessionUser ? (
              <Link
                href="/panel"
                className="px-2.5 py-1.5 bg-[#087F96] text-white rounded-lg text-xs font-bold flex items-center space-x-1"
              >
                <User className="h-3.5 w-3.5" />
                <span>{sessionUser.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link
                href="/giris"
                className="px-2.5 py-1.5 bg-white/10 rounded-lg text-xs font-medium text-white flex items-center space-x-1"
              >
                <User className="h-3.5 w-3.5 text-[#087F96]" />
                <span>Giriş</span>
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Menüyü Aç</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#061B33] border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-3 pt-3 pb-3 space-y-1 sm:px-4">
            {MENU_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#087F96] bg-white/10 font-bold'
                      : 'text-gray-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="bg-[#087F96] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 pb-5 border-t border-white/10 px-4 space-y-2.5">
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-[#087F96] hover:bg-[#056B80] rounded-lg text-sm font-bold text-white shadow-md"
              >
                <Crown className="h-4 w-4 text-amber-300" />
                <span>👑 Admin Paneline Git</span>
              </Link>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/panel"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-1.5 px-3 py-2.5 border border-white/20 rounded-lg text-xs font-semibold text-white bg-white/5"
              >
                <User className="h-4 w-4 text-[#087F96]" />
                <span>Öğrenci Paneli</span>
              </Link>
              <Link
                href="/egitmen"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-1.5 px-3 py-2.5 border border-white/20 rounded-lg text-xs font-semibold text-white bg-white/5"
              >
                <GraduationCap className="h-4 w-4 text-[#087F96]" />
                <span>Eğitmen Portalı</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
