'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, Sparkles, Building2, ChevronRight, Award, GraduationCap } from 'lucide-react';
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
  const pathname = usePathname();

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

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0B2A4A]/98 shadow-xl backdrop-blur-md py-2.5 border-b border-[#087F96]/20' 
        : 'bg-[#0B2A4A] py-4 border-b border-white/10'
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

          {/* Compact XL Navigation Menu for medium-large desktops */}
          <nav className="hidden lg:flex 2xl:hidden items-center space-x-1">
            {MENU_ITEMS.slice(0, 7).map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`px-2 py-1.5 rounded-md text-[13px] font-medium transition-all ${
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

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link
              href="/panel"
              className="flex items-center space-x-1.5 px-3 py-2 border border-[#087F96]/40 rounded-lg text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <User className="h-3.5 w-3.5 text-[#087F96]" />
              <span>Öğrenci Paneli</span>
            </Link>
            <Link
              href="/egitmen"
              className="flex items-center space-x-1.5 px-3 py-2 bg-[#087F96]/20 border border-[#087F96]/60 text-white rounded-lg text-xs font-semibold hover:bg-[#087F96]/40 transition-colors"
            >
              <GraduationCap className="h-3.5 w-3.5 text-[#087F96]" />
              <span>Eğitmen Paneli</span>
            </Link>
            <Link
              href="/kurumsal"
              className="flex items-center space-x-1.5 px-3 py-2 bg-[#061B33] border border-[#087F96]/60 text-white rounded-lg text-xs font-semibold hover:bg-white/10 transition-colors"
            >
              <Building2 className="h-3.5 w-3.5 text-[#087F96]" />
              <span>Yönetici Paneli</span>
            </Link>
            <Link
              href="/talep-olustur"
              className="flex items-center space-x-1 px-3.5 py-2 bg-[#087F96] hover:bg-[#056B80] rounded-lg text-xs font-bold text-white shadow-md hover:shadow-lg transition-all"
            >
              <span>Demo Talep Et</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            <Link
              href="/panel"
              className="px-2.5 py-1.5 bg-white/10 rounded-lg text-xs font-medium text-white flex items-center space-x-1"
            >
              <User className="h-3.5 w-3.5 text-[#087F96]" />
              <span>Panel</span>
            </Link>
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
                href="/kurumsal"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-1.5 px-3 py-2.5 border border-white/20 rounded-lg text-xs font-semibold text-white bg-white/5"
              >
                <Building2 className="h-4 w-4 text-[#087F96]" />
                <span>Yönetici Paneli</span>
              </Link>
            </div>
            <Link
              href="/talep-olustur"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-[#087F96] hover:bg-[#056B80] rounded-lg text-sm font-bold text-white shadow-md"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Kurumsal Demo Talep Et</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
