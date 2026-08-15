'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  Briefcase,
  Users,
  BarChart3,
  Layers,
  FileText,
  TrendingUp,
  Target,
  UserCheck
} from 'lucide-react';
import Logo from '@/components/Logo';

// 4 Main Role Portals for Top Right Header Access
const TOP_ROLE_BUTTONS = [
  {
    name: 'Çalışan Girişi',
    path: '/panel/calisan',
    icon: User,
    isModalTrigger: true,
    bgClass: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-400/40',
  },
  {
    name: 'Eğitmen Girişi',
    path: '/ik-cozumlari/egitim-yonetimi',
    icon: GraduationCap,
    bgClass: 'bg-purple-700 hover:bg-purple-800 text-white border-purple-400/40',
  },
  {
    name: 'Admin Paneli (Yönetici)',
    path: '/admin',
    icon: Crown,
    bgClass: 'bg-amber-400 hover:bg-amber-500 text-slate-950 font-black border-amber-300',
  },
  {
    name: 'Kurumsal Çözümler', // Renamed from "Kurumsal Solutions" as requested
    path: '/kurumsal-cozumler',
    icon: Building2,
    bgClass: 'bg-[#E11D48] hover:bg-[#BE123C] text-white border-rose-400/40',
  },
];

const HR_SUBMENU = [
  { name: 'Yetkinlik Matrisi (PKA TALENT)', path: '/ik-cozumlari/yetkinlik-matrisi', desc: 'Saha & merkez 26 pozisyon matrisi' },
  { name: 'Yönetici Aday Havuzu', path: '/ik-cozumlari/calisan-kariyer-planlamasi', desc: 'Potansiyel & Terfiye Hazırlık Havuzu' },
  { name: '9 Box Yetenek Matrisi', path: '/ik-cozumlari/calisan-kariyer-planlamasi#9-box', desc: 'Performans vs Potansiyel Matrisi' },
  { name: 'Terfi Yönetimi', path: '/ik-cozumlari/terfi-yonetimi', desc: 'Ağırlıklı %80+ Terfi Skoru' },
  { name: 'Kritik Pozisyon Yedekleme', path: '/ik-cozumlari/yedekleme-plani', desc: 'Kritik rol iş sürekliliği & risk' },
  { name: 'Çalışan Kaybetme Riski Analizi', path: '/ik-cozumlari/calisan-kariyer-planlamasi#turnover', desc: 'Erken uyarı risk sinyalleri' },
  { name: 'Eğitim Yönetimi (PKA LEARNING)', path: '/ik-cozumlari/egitim-yonetimi', desc: 'Eğitim atama, takip ve etki analizi' },
  { name: 'Yönetici Analitiği (EXECUTIVE)', path: '/ik-cozumlari/gelisim-karnesi', desc: '20 Mağaza Büyüme & İnsan Sermayesi Karnesi' }
];

const MENU_ITEMS = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'Bireysel Gelişim', path: '/bireysel-gelisim' },
  { name: 'Kurumsal Çözümler', path: '/kurumsal-cozumler' },
  { name: 'İK ve Yetenek Yönetimi', path: '/ik-cozumlari', isDropdown: true },
  { name: 'Eğitimler', path: '/egitimler' },
  { name: 'Kariyer Yolları', path: '/kariyer-yollari' },
  { name: 'Başarı Hikâyeleri', path: '/basari-hikayeleri' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHrDropdownOpen, setIsHrDropdownOpen] = useState(false);
  const [sessionUser, setSessionUser] = useState<any>(null);
  const hrRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkSession = () => {
      if (typeof window !== 'undefined') {
        const cookies = document.cookie.split('; ');
        const sessionCookie = cookies.find(row => row.startsWith('pka_user_session='));
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (hrRef.current && !hrRef.current.contains(event.target as Node)) {
        setIsHrDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    document.cookie = 'pka_user_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setSessionUser(null);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B2A4A] border-b border-white/10 shadow-2xl">
      
      {/* 🔴 PROMINENT TOP STRIP WITH 4 ENTRY BUTTONS MOVED TO THE TOP RIGHT AS REQUESTED */}
      <div className="bg-[#041224] py-1.5 px-4 border-b border-amber-400/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          
          <div className="flex items-center space-x-2 text-xs text-amber-300 font-black shrink-0">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>PERAKENDE KARIYER AKADEMISI GİRİŞ PORTALLARI</span>
          </div>

          {/* 4 ACTION BUTTONS MOVED TO TOP RIGHT */}
          <div className="flex flex-wrap items-center justify-end gap-1.5 w-full md:w-auto">
            {TOP_ROLE_BUTTONS.map((roleBtn) => {
              const Icon = roleBtn.icon;
              const isActive = pathname === roleBtn.path;

              if (roleBtn.isModalTrigger) {
                return (
                  <button
                    key={roleBtn.name}
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.dispatchEvent(new Event('open_visitor_profile_modal'));
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center justify-center space-x-1.5 transition-all shadow-md border cursor-pointer ${roleBtn.bgClass}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>👤 {roleBtn.name}</span>
                  </button>
                );
              }

              return (
                <Link
                  key={roleBtn.name}
                  href={roleBtn.path}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center justify-center space-x-1.5 transition-all shadow-md border ${roleBtn.bgClass} ${
                    isActive ? 'ring-2 ring-amber-400 scale-105' : 'hover:scale-105'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{roleBtn.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Header Navigation Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <Logo variant="dark" size="md" showSubtext={true} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-0.5">
            {MENU_ITEMS.map((item) => {
              if (item.isDropdown) {
                return (
                  <div key={item.name} className="relative" ref={hrRef}>
                    <button
                      onClick={() => setIsHrDropdownOpen(!isHrDropdownOpen)}
                      className={`h-8 px-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-1 whitespace-nowrap ${
                        pathname.startsWith('/ik-cozumlari')
                          ? 'bg-[#087F96] text-white shadow-md'
                          : 'text-gray-200 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isHrDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isHrDropdownOpen && (
                      <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 py-3 z-50 text-gray-900 animate-in fade-in zoom-in duration-150">
                        <div className="px-4 py-1.5 border-b border-gray-100 mb-1">
                          <span className="text-[10px] font-black text-[#087F96] uppercase tracking-wider">Kurumsal İK Çözüm Modülleri</span>
                        </div>
                        {HR_SUBMENU.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.path}
                            onClick={() => setIsHrDropdownOpen(false)}
                            className="px-4 py-2 hover:bg-gray-50 flex items-start space-x-2.5 transition-colors group"
                          >
                            <div className="w-2 h-2 rounded-full bg-[#087F96] mt-1.5 group-hover:scale-125 transition-transform" />
                            <div>
                              <div className="font-bold text-xs text-[#0B2A4A] group-hover:text-[#087F96]">{sub.name}</div>
                              <div className="text-[10px] text-gray-500">{sub.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`h-8 px-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-1 whitespace-nowrap ${
                    isActive 
                      ? 'bg-[#087F96] text-white shadow-md' 
                      : 'text-gray-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Single Login / Session User Control */}
          <div className="hidden lg:flex items-center space-x-2 shrink-0 ml-4">
            {sessionUser ? (
              <div className="flex items-center space-x-2">
                <Link
                  href={
                    sessionUser.role === 'ADMIN' || sessionUser.role === 'SUPER_ADMIN' ? '/panel/admin' :
                    sessionUser.role === 'EXECUTIVE' ? '/panel/ceo' :
                    sessionUser.role === 'HR_MANAGER' || sessionUser.role === 'COMPANY_ADMIN' || sessionUser.role === 'COMPANY_MANAGER' ? '/panel/ik' :
                    sessionUser.role === 'TRAINER' || sessionUser.role === 'TRAINING_MANAGER' ? '/panel/egitmen' : '/panel/calisan'
                  }
                  className="h-9 px-3.5 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl text-xs flex items-center space-x-1.5 shadow-md transition-all whitespace-nowrap border border-white/20"
                >
                  <User className="h-3.5 w-3.5 text-amber-300" />
                  <span>{sessionUser.name} (Paneline Git)</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="h-9 w-9 bg-red-600/80 hover:bg-red-700 text-white rounded-xl flex items-center justify-center transition-colors"
                  title="Oturumu Kapat"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/kurumsal-demo"
                className="h-9 px-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-md transition-all flex items-center space-x-1.5 whitespace-nowrap border border-amber-300"
              >
                <Sparkles className="h-4 w-4" />
                <span>Demo Talep Et</span>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#061B33] border-b border-white/10 animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-3 pb-6 space-y-2">
            <div className="py-2 border-b border-white/10 space-y-2">
              <span className="text-[11px] font-black text-amber-300 uppercase block text-center">GİRİŞ PORTALLARI</span>
              <div className="grid grid-cols-2 gap-2">
                {TOP_ROLE_BUTTONS.map((btn) => (
                  <Link
                    key={btn.name}
                    href={btn.path}
                    onClick={() => setIsOpen(false)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-black text-center shadow-md ${btn.bgClass}`}
                  >
                    {btn.name}
                  </Link>
                ))}
              </div>
            </div>

            {MENU_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  pathname === item.path
                    ? 'bg-[#087F96]'
                    : 'text-gray-200 hover:bg-white/5'
                }`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
