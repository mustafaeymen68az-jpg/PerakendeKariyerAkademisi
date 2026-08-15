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
  Briefcase,
  Users,
  BarChart3,
  Layers,
  FileText,
  TrendingUp,
  Target
} from 'lucide-react';
import Logo from '@/components/Logo';

// Added "Çalışan Kariyer Planlaması" under HR_SUBMENU as requested
const HR_SUBMENU = [
  { name: 'Yönetici Admin Paneli (ADMIN)', path: '/admin', desc: 'Kullanıcı veritabanı & sistem yönetimi' },
  { name: 'Yetkinlik Matrisi (PKA TALENT)', path: '/ik-cozumlari/yetkinlik-matrisi', desc: 'Saha & merkez 26 pozisyon matrisi' },
  { name: '3\'lü Yetenek Havuzu', path: '/ik-cozumlari/calisan-kariyer-planlamasi', desc: 'Potansiyel, Terfiye Hazır & Gelişim' },
  { name: '9 Box Talent Matrix', path: '/ik-cozumlari/calisan-kariyer-planlamasi#9-box', desc: 'Performans vs Potansiyel Matrisi' },
  { name: 'Terfi Yönetimi', path: '/ik-cozumlari/terfi-yonetimi', desc: 'Ağırlıklı %80+ Terfi Skoru' },
  { name: 'Kritik Pozisyon Yedekleme', path: '/ik-cozumlari/yedekleme-plani', desc: 'Kritik rol iş sürekliliği & risk' },
  { name: 'Turnover Risk Analizi', path: '/ik-cozumlari/calisan-kariyer-planlamasi#turnover', desc: 'Çalışan kaybetme risk sinyalleri' },
  { name: 'Eğitim Kontrol Merkezi (PKA LEARNING)', path: '/ik-cozumlari/egitim-yonetimi', desc: 'Eğitim atama, takip ve ROI' },
  { name: 'CEO İnsan Sermayesi Dashboard (EXECUTIVE)', path: '/ik-cozumlari/gelisim-karnesi', desc: 'Pipeline & 20 Mağaza Büyüme Analizi' }
];

const MENU_ITEMS = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'PKA CAREER', path: '/kariyerimi-planla' },
  { name: 'Kariyer Haritası', path: '/kariyer-yollari', badge: '15 Basamak' },
  { name: 'PKA TALENT (İK)', path: '/ik-cozumlari', isDropdown: true },
  { name: 'PKA LEARNING', path: '/egitimler' },
  { name: 'PKA EXECUTIVE', path: '/ik-cozumlari/gelisim-karnesi' },
  { name: 'Kariyer Seviyeni Öğren', path: '/kariyer-seviyeni-ogren', badge: '15 Soru' }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHrDropdownOpen, setIsHrDropdownOpen] = useState(false);
  const [visitorProfile, setVisitorProfile] = useState<{ firstName?: string; lastName?: string; companyName?: string; city?: string } | null>(null);
  const hrRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const loadProfile = () => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('pka_visitor_profile');
        if (saved) {
          try {
            setVisitorProfile(JSON.parse(saved));
          } catch (e) {
            console.error(e);
          }
        }
      }
    };
    loadProfile();
    window.addEventListener('pka_profile_updated', loadProfile);
    return () => window.removeEventListener('pka_profile_updated', loadProfile);
  }, []);

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

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0B2A4A]/98 shadow-xl backdrop-blur-md py-2 border-b border-[#087F96]/30' 
        : 'bg-[#0B2A4A] py-2.5 border-b border-white/10'
    }`}>
      {/* Top Banner Strip */}
      <div className="bg-[#061B33] text-[#DDF4F7] text-xs py-1 px-4 hidden lg:block border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 font-bold">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>www.perakendekariyerakademisi.com</span>
            </span>
            <span className="text-white/30">|</span>
            <span className="text-gray-300">Perakende Sektörünün Kariyer, Yetkinlik ve Yönetici Yetiştirme Platformu</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new Event('open_visitor_profile_modal'));
                }
              }}
              className="text-[#DDF4F7] hover:text-white font-extrabold flex items-center space-x-1 cursor-pointer"
            >
              <User className="h-3.5 w-3.5 text-blue-300" />
              <span>👤 Çalışan Girişi</span>
            </button>

            <span className="text-white/30">|</span>

            <Link
              href="/ik-cozumlari/egitim-yonetimi"
              className="text-purple-300 hover:text-purple-200 font-extrabold flex items-center space-x-1"
            >
              <GraduationCap className="h-3.5 w-3.5 text-purple-400" />
              <span>🎓 Eğitmen Girişi</span>
            </Link>

            <span className="text-white/30">|</span>

            <Link href="/kurumsal-demo" className="text-amber-300 hover:text-amber-200 font-extrabold flex items-center space-x-1">
              <Sparkles className="h-3 w-3" />
              <span>Kurumsal Demo Talep Et</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* LEFT SECTION: Brand Logo + Navigation Links Aligned Left */}
          <div className="flex items-center space-x-4 xl:space-x-6 flex-1 min-w-0">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center space-x-2 shrink-0">
              <Logo variant="dark" size="md" showSubtext={true} />
            </Link>

            {/* Desktop Nav - Aligned Left Next to Logo */}
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
                        <span>İK Çözümleri</span>
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isHrDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* HR Dropdown Menu */}
                      {isHrDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 py-3 z-50 text-gray-900 animate-in fade-in zoom-in duration-150">
                          <div className="px-4 py-1.5 border-b border-gray-100 mb-1">
                            <span className="text-[10px] font-black text-[#087F96] uppercase tracking-wider">Kurumsal İK Modülleri</span>
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
                    {item.badge && (
                      <span className={`text-[8px] px-1.5 py-0.2 rounded-full font-black uppercase ${
                        item.badge === '15 Soru' ? 'bg-emerald-500 text-white' : 
                        item.badge === 'Yeni' ? 'bg-[#E11D48] text-white' : 'bg-amber-400 text-slate-950'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* RIGHT SECTION: Portal Login Buttons (Eğitmen Girişi & Çalışan Girişi) */}
          <div className="hidden lg:flex items-center space-x-2 shrink-0 ml-4">
            {/* Çalışan / Kullanıcı Profilim Button */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  if (visitorProfile) {
                    window.dispatchEvent(new Event('open_user_profile_details_modal'));
                  } else {
                    window.dispatchEvent(new Event('open_visitor_profile_modal'));
                  }
                }
              }}
              className="h-9 px-3 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl text-xs flex items-center space-x-1.5 shadow-md transition-all cursor-pointer whitespace-nowrap border border-white/20"
              title="Profil Bilgilerim ve Karnem"
            >
              <User className="h-4 w-4 text-amber-300" />
              <span>{visitorProfile ? `👤 ${visitorProfile.firstName} ${visitorProfile.lastName || ''}` : '👤 Çalışan Girişi'}</span>
            </button>

            {/* Eğitmen Girişi Button */}
            <Link
              href="/ik-cozumlari/egitim-yonetimi"
              className="h-9 px-3 bg-purple-700 hover:bg-purple-800 text-white font-extrabold rounded-xl text-xs flex items-center space-x-1.5 shadow-md transition-all whitespace-nowrap border border-purple-400/40"
              title="İç Eğitmen & Akademi Portalı Girişi"
            >
              <GraduationCap className="h-4 w-4 text-purple-200" />
              <span>🎓 Eğitmen Girişi</span>
            </Link>

            {/* Kurumsal Solutions */}
            <Link
              href="/kurumsal-cozumler"
              className="h-9 px-3.5 bg-[#E11D48] hover:bg-[#BE123C] text-white font-extrabold rounded-xl text-xs shadow-md transition-all flex items-center space-x-1.5 whitespace-nowrap"
            >
              <Building2 className="h-3.5 w-3.5" />
              <span>Kurumsal Solutions</span>
            </Link>
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
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  pathname === item.path
                    ? 'bg-[#087F96] text-white'
                    : 'text-gray-200 hover:bg-white/5'
                }`}
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="text-[9px] bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase font-mono">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}

            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new Event('open_visitor_profile_modal'));
                  }
                }}
                className="w-full py-2.5 bg-blue-600 text-white font-extrabold rounded-xl text-center text-xs flex items-center justify-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>👤 Çalışan Girişi & Profilim</span>
              </button>

              <Link
                href="/ik-cozumlari/egitim-yonetimi"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 bg-purple-700 text-white font-extrabold rounded-xl text-center text-xs flex items-center justify-center space-x-2"
              >
                <GraduationCap className="h-4 w-4" />
                <span>🎓 Eğitmen Girişi</span>
              </Link>

              <Link
                href="/kurumsal-cozumler"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-[#E11D48] text-white font-extrabold rounded-xl text-center text-xs flex items-center justify-center space-x-2"
              >
                <Building2 className="h-4 w-4" />
                <span>Kurumsal Solutions</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
