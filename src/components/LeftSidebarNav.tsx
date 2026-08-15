'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  BookOpen, 
  Briefcase, 
  Map, 
  Target, 
  Bot, 
  Users, 
  Building2, 
  Sparkles, 
  ChevronDown, 
  ShieldCheck, 
  Menu, 
  X, 
  Award,
  Layers,
  ChevronRight,
  UserCheck,
  User,
  GraduationCap,
  Crown,
  CreditCard
} from 'lucide-react';
import Logo from '@/components/Logo';

const HR_SUBMENU = [
  { name: '🎓 İç Eğitmen Yetiştirme', path: '/kurumsal-cozumler#ic-egitmen' },
  { name: 'Çalışan Özgeçmiş & Deneyim ve Eğitim Karnesi', path: '/ik-cozumlari/calisan-ozgecmis-egitim-karnesi' },
  { name: 'Çalışan Kariyer Planlaması', path: '/ik-cozumlari/calisan-kariyer-planlamasi' },
  { name: 'Yetkinlik Matrisi', path: '/ik-cozumlari/yetkinlik-matrisi' },
  { name: 'Terfi Yönetimi', path: '/ik-cozumlari/terfi-yonetimi' },
  { name: 'Yedekleme Planı', path: '/ik-cozumlari/yedekleme-plani' },
  { name: 'Eğitim Yönetimi', path: '/ik-cozumlari/egitim-yonetimi' },
  { name: 'Performans & KPI', path: '/ik-cozumlari/performans-kpi' },
  { name: 'Çalışan Gelişim Karnesi', path: '/ik-cozumlari/gelisim-karnesi' }
];

const INSTRUCTORS_SUBMENU = [
  { name: '🌟 Tüm Eğitmenlerimiz', path: '/egitmenler' },
  { name: 'Ahmet Çelik (Kurucu & Stratejist)', path: '/egitmenler/ahmet-celik' },
  { name: 'Zeynep Kaya (İK & Akademi Dir.)', path: '/egitmenler/zeynep-kaya' },
  { name: 'Dr. Mehmet Yılmaz (Yapay Zekâ Lead)', path: '/egitmenler/dr-mehmet-yilmaz' },
  { name: 'Selin Arslan (CRM & Deneyim Dir.)', path: '/egitmenler/selin-arslan' },
  { name: 'Prof. Dr. Hakan Erdem (Satın Alma Stratejisti)', path: '/egitmenler/prof-hakan-erdem' },
  { name: 'Can Demirel (Lojistik & Stok Müdürü)', path: '/egitmenler/can-demirel' }
];

// Main sidebar menu items - Kurumsal Ücretlendirme is now a standalone main item
const MENU_ITEMS = [
  { name: 'Ana Sayfa', path: '/', icon: Home },
  { name: 'Eğitim Kataloğu', path: '/egitimler', icon: BookOpen },
  { name: 'Kurumsal Akademi', path: '/kurumsal-cozumler', icon: Building2 },
  { name: 'İK Çözümleri', path: '/ik-cozumlari', icon: Briefcase, isDropdown: true },
  { name: 'Kariyer Haritası', path: '/kariyer-yollari', icon: Map },
  { name: 'Kariyer Seviyeni Öğren', path: '/kariyer-seviyeni-ogren', icon: Target },
  { name: 'Yapay Zekâ', path: '/yapay-zeka', icon: Bot },
  { name: 'Aday & Yetenek Havuzu', path: '/yetkinlik-aday-havuzu', icon: Users },
  { name: 'Eğitmenlerimiz', path: '/egitmenler', icon: GraduationCap, isInstructorsDropdown: true },
  { name: 'Kurumsal Ücretlendirme', path: '/kurumsal-fiyatlandirma', icon: CreditCard }
];

export default function LeftSidebarNav() {
  const pathname = usePathname();
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isHrOpen, setIsHrOpen] = useState(false);
  const [isInstructorsOpen, setIsInstructorsOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpenMobile(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Top Header Toggle Bar */}
      <div className="xl:hidden bg-[#0B2A4A] text-white p-3 border-b border-white/10 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center space-x-2">
          <Logo variant="dark" size="sm" showSubtext={false} />
        </Link>

        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center space-x-2 text-xs font-bold"
        >
          {isOpenMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span>Menü</span>
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {isOpenMobile && (
        <div 
          onClick={() => setIsOpenMobile(false)}
          className="xl:hidden fixed inset-0 bg-black/70 backdrop-blur-xs z-40 animate-in fade-in duration-200"
        />
      )}

      {/* LEFT VERTICAL SIDEBAR */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#061B33] text-white border-r border-[#087F96]/30 flex flex-col justify-between shadow-2xl transition-transform duration-300 ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
      }`}>
        
        {/* TOP BRAND HEADER */}
        <div className="p-5 border-b border-white/10 space-y-3 flex-shrink-0 bg-[#0B2A4A]/60">
          <div className="flex items-center justify-between">
            <Link href="/" className="block">
              <Logo variant="dark" size="md" showSubtext={true} />
            </Link>
            <button
              onClick={() => setIsOpenMobile(false)}
              className="xl:hidden text-gray-400 hover:text-white p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* MIDDLE VERTICAL MENU */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
          <div className="text-[10px] font-black text-[#087F96] uppercase tracking-wider px-3 mb-2">
            Platform Menüsü
          </div>

          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            // Eğitmenlerimiz Dropdown Submenu
            if (item.isInstructorsDropdown) {
              return (
                <div key={item.name} className="space-y-1">
                  <button
                    onClick={() => setIsInstructorsOpen(!isInstructorsOpen)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                      pathname.startsWith('/egitmenler')
                        ? 'bg-[#087F96] text-white shadow-md'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-4 w-4 text-amber-400" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isInstructorsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Accordion Submenu for Instructors */}
                  {isInstructorsOpen && (
                    <div className="pl-6 space-y-1 py-1 border-l-2 border-amber-400/50 ml-4 animate-in fade-in duration-150">
                      {INSTRUCTORS_SUBMENU.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.path}
                          className={`block px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
                            pathname === sub.path
                              ? 'text-amber-300 bg-white/10 font-extrabold'
                              : 'text-gray-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          • {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // İK Çözümleri Dropmenu
            if (item.isDropdown) {
              return (
                <div key={item.name} className="space-y-1">
                  <button
                    onClick={() => setIsHrOpen(!isHrOpen)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                      pathname.startsWith('/ik-cozumlari')
                        ? 'bg-[#087F96] text-white shadow-md'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-4 w-4 text-emerald-400" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isHrOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Accordion Submenu */}
                  {isHrOpen && (
                    <div className="pl-6 space-y-1 py-1 border-l-2 border-[#087F96]/40 ml-4 animate-in fade-in duration-150">
                      {HR_SUBMENU.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.path}
                          className={`block px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${
                            pathname === sub.path
                              ? 'text-white bg-[#087F96]/40'
                              : 'text-gray-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          • {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                  isActive
                    ? 'bg-[#087F96] text-white shadow-md'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-[#087F96]'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* BOTTOM USER/FOOTER ACTION */}
        <div className="p-4 border-t border-white/10 space-y-2 flex-shrink-0 bg-[#0B2A4A]/60">
          <Link
            href="/talep-olustur"
            className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-md border border-amber-300"
          >
            <Sparkles className="h-4 w-4 text-slate-950" />
            <span>Kurumsal Teklif Al</span>
          </Link>

          <div className="text-[10px] text-center text-gray-400 font-mono pt-1">
            © 2026 Perakende Akademi
          </div>
        </div>

      </aside>
    </>
  );
}
