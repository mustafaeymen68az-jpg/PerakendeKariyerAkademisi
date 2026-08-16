'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  User,
  Crown,
  GraduationCap,
  Building2,
  Sparkles,
  LogOut,
  ChevronDown,
  KeyRound,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export default function TopHeaderBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkSession = () => {
      if (typeof window !== 'undefined') {
        const cookies = document.cookie.split('; ');
        const sessionCookie =
          cookies.find((row) => row.startsWith('user_session=')) ||
          cookies.find((row) => row.startsWith('pka_user_session='));
        if (sessionCookie) {
          try {
            const data = JSON.parse(decodeURIComponent(sessionCookie.split('=')[1]));
            setSessionUser(data);
          } catch (e) {
            setSessionUser(null);
          }
        } else {
          setSessionUser(null);
        }
      }
    };

    checkSession();
    window.addEventListener('pka_session_updated', checkSession);
    return () => window.removeEventListener('pka_session_updated', checkSession);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    document.cookie = 'user_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'pka_user_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    }
    setSessionUser(null);
    setIsDropdownOpen(false);
    router.push('/');
  };

  const handleOpenAuthModal = () => {
    setIsDropdownOpen(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open_visitor_onboarding'));
    }
  };

  const isAdmin =
    sessionUser?.role === 'ADMIN' ||
    sessionUser?.activeRole === 'PLATFORM_ADMIN' ||
    sessionUser?.email?.includes('admin');

  return (
    <header className="sticky top-0 z-40 bg-[#0B2A4A] border-b border-[#087F96]/30 shadow-md px-4 sm:px-6 py-2 flex items-center justify-between text-white">
      {/* Title & Info on Left */}
      <div className="flex items-center space-x-2 text-xs text-amber-300 font-extrabold">
        <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
        <span className="uppercase tracking-wider">Perakende Kariyer Akademisi</span>
      </div>

      {/* TOP RIGHT: SINGLE PROFILE ICON SQUARE BOX */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center transition-all shadow-md cursor-pointer border relative ${
            isAdmin
              ? 'bg-gradient-to-tr from-amber-500 to-amber-300 border-amber-200 text-slate-950 ring-2 ring-amber-400/40'
              : sessionUser
              ? 'bg-[#087F96] hover:bg-[#056B80] border-cyan-400/40 text-white'
              : 'bg-[#061B33] hover:bg-[#087F96]/30 border-[#087F96]/50 text-cyan-300 hover:text-white'
          }`}
          title="Profil ve Hesap Yönetimi"
        >
          {isAdmin ? (
            <Crown className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          ) : sessionUser ? (
            <User className="w-5 h-5 text-white stroke-[2.2]" />
          ) : (
            <User className="w-5 h-5 text-cyan-300 stroke-[2]" />
          )}

          {/* Indicator Dot */}
          <span
            className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0B2A4A] ${
              isAdmin ? 'bg-amber-400' : sessionUser ? 'bg-emerald-400' : 'bg-blue-400 animate-pulse'
            }`}
          />
        </button>

        {/* DROPDOWN MENU */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-3xl shadow-2xl border border-gray-200 py-3 px-3 text-gray-900 z-50 animate-in fade-in zoom-in duration-150 space-y-2">
            
            {/* Header: User / Session Status */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white font-extrabold ${
                  isAdmin ? 'bg-amber-500 text-slate-950' : sessionUser ? 'bg-[#087F96]' : 'bg-slate-300 text-slate-600'
                }`}
              >
                {isAdmin ? <Crown className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-extrabold text-xs text-[#0B2A4A] truncate">
                  {sessionUser ? sessionUser.name : 'Hoş Geldiniz'}
                </div>
                <div className="text-[10px] text-gray-500 truncate">
                  {sessionUser ? sessionUser.email : 'Giriş yapılmadı veya hesap yok'}
                </div>
                {isAdmin && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md text-[9px] font-black uppercase tracking-wider">
                    👑 PLATFORM ADMİNİ
                  </span>
                )}
              </div>
            </div>

            {/* Portals & Links Section */}
            <div className="space-y-1 pt-1">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider px-2">
                Hızlı Erişim Portalları
              </div>

              {/* Admin Section (Only shown if user is authorized as Admin) */}
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-2xl text-xs font-black transition-all border bg-amber-50 border-amber-300 text-amber-950 hover:bg-amber-100 shadow-sm"
                >
                  <div className="flex items-center space-x-2">
                    <Crown className="w-4 h-4 text-amber-600" />
                    <span>👑 Admin Paneli (Yönetici)</span>
                  </div>
                  <span className="px-2 py-0.5 bg-amber-400 text-slate-950 text-[9px] font-black rounded-lg">
                    YÖNETİCİ
                  </span>
                </Link>
              )}

              {/* 1. Öğrenci / Çalışan Paneli */}
              <Link
                href="/panel/calisan"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center space-x-2 p-2.5 rounded-2xl text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors border border-transparent hover:border-blue-200"
              >
                <User className="w-4 h-4 text-blue-600" />
                <span>👤 Öğrenci / Çalışan Paneli</span>
              </Link>

              {/* 2. Eğitim Müdürü Paneli */}
              <Link
                href="/ik-cozumlari/egitim-yonetimi"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center space-x-2 p-2.5 rounded-2xl text-xs font-bold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors border border-transparent hover:border-indigo-200"
              >
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>📊 Eğitim Müdürü Paneli</span>
              </Link>

              {/* 3. İnsan Kaynakları Müdürü (İK) Paneli */}
              <Link
                href="/panel/ik"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center space-x-2 p-2.5 rounded-2xl text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors border border-transparent hover:border-emerald-200"
              >
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>👔 İK Müdürü Paneli</span>
              </Link>

              {/* 4. CEO / Genel Müdür Paneli */}
              <Link
                href="/panel/ceo"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center space-x-2 p-2.5 rounded-2xl text-xs font-bold text-slate-800 hover:bg-amber-50 hover:text-amber-700 transition-colors border border-transparent hover:border-amber-200"
              >
                <Crown className="w-4 h-4 text-amber-600" />
                <span>👑 CEO / Genel Müdür</span>
              </Link>

              {/* 5. Eğitmen Paneli */}
              <Link
                href="/egitmen"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center space-x-2 p-2.5 rounded-2xl text-xs font-bold text-slate-800 hover:bg-purple-50 hover:text-purple-700 transition-colors border border-transparent hover:border-purple-200"
              >
                <GraduationCap className="w-4 h-4 text-purple-600" />
                <span>👨‍🏫 Eğitmen Paneli</span>
              </Link>
            </div>

            {/* Auth Action Footer */}
            <div className="border-t border-gray-100 pt-2">
              {sessionUser ? (
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 px-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-2xl text-xs font-extrabold flex items-center justify-center space-x-2 transition-all cursor-pointer border border-red-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Oturumu Kapat</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleOpenAuthModal}
                    className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black flex items-center justify-center space-x-1 shadow-md transition-all cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>GİRİŞ YAP</span>
                  </button>
                  <Link
                    href="/kayit"
                    onClick={() => setIsDropdownOpen(false)}
                    className="py-2.5 px-3 bg-[#087F96] hover:bg-[#056B80] text-white rounded-2xl text-xs font-black flex items-center justify-center space-x-1 shadow-md transition-all text-center"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>KAYIT OL</span>
                  </Link>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </header>
  );
}
