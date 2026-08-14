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

const HR_SUBMENU = [
  { name: 'Yetkinlik Matrisi', path: '/ik-cozumlari#yetkinlik-matrisi', desc: 'Saha & merkez yetkinlik haritası' },
  { name: 'Kariyer Planlama', path: '/kariyerimi-planla', desc: 'Mevcut & hedef pozisyon yol haritası' },
  { name: 'Yetenek Havuzu', path: '/ik-cozumlari#yetenek-havuzu', desc: 'Yüksek potansiyelli çalışan pipeline\'ı' },
  { name: 'Terfi Yönetimi', path: '/ik-cozumlari#terfi-yonetimi', desc: 'Ağırlıklı %80+ Terfi Skoru' },
  { name: 'Yedekleme Planı', path: '/ik-cozumlari#yedekleme-plani', desc: 'Kritik pozisyon iş sürekliliği' },
  { name: 'Eğitim Yönetimi', path: '/ik-cozumlari#egitim-yonetimi', desc: '40 Modül & 160 Mikro Eğitim' },
  { name: 'Performans & KPI', desc: 'Ciro, fire ve sepet KPI bağlantısı', path: '/ik-cozumlari#performans-kpi' },
  { name: 'Çalışan Gelişim Karnesi', desc: '90 günlük aksiyon karnesi', path: '/ik-cozumlari#gelisim-karnesi' }
];

const MENU_ITEMS = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'Eğitim Kataloğu', path: '/egitimler' },
  { name: 'İK Çözümleri', path: '/ik-cozumlari', isDropdown: true },
  { name: 'Kariyer Haritası', path: '/#15-basamakli-harita' },
  { name: 'Kariyer Seviyeni Öğren', path: '/kariyer-seviyeni-ogren', badge: '15 Soruluk Test' },
  { name: 'Kariyerimi Planla', path: '/kariyerimi-planla', badge: 'Planlayıcı' },
  { name: 'Yapay Zekâ', path: '/yapay-zeka', badge: 'Yeni' },
  { name: 'Kurumsal Solutions', path: '/kurumsal-cozumler' },
  { name: 'Aday Havuzu', path: '/yetkinlik-aday-havuzu', badge: 'Yakında' }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHrDropdownOpen, setIsHrDropdownOpen] = useState(false);
  const hrRef = useRef<HTMLDivElement>(null);
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

          <div className="flex items-center space-x-4">
            <Link href="/kurumsal-demo" className="text-amber-300 hover:text-amber-200 font-extrabold flex items-center space-x-1">
              <Sparkles className="h-3 w-3" />
              <span>Kurumsal Demo Talep Et</span>
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/kariyer-seviyeni-ogren" className="text-emerald-300 hover:text-emerald-200 font-bold">
              Kariyer Seviyeni Öğren Testi
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Logo variant="dark" size="md" showSubtext={true} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {MENU_ITEMS.map((item) => {
              if (item.isDropdown) {
                return (
                  <div key={item.name} className="relative" ref={hrRef}>
                    <button
                      onClick={() => setIsHrDropdownOpen(!isHrDropdownOpen)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
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
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                    isActive 
                      ? 'bg-[#087F96] text-white shadow-md' 
                      : 'text-gray-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${
                      item.badge === 'Planlayıcı' ? 'bg-[#087F96] text-white' :
                      item.badge === '15 Soruluk Test' ? 'bg-emerald-500 text-white' : 
                      item.badge === 'Yeni' ? 'bg-[#E11D48] text-white' : 'bg-amber-400 text-black'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/kariyerimi-planla"
              className="px-4 py-2 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center space-x-1.5"
            >
              <Target className="h-3.5 w-3.5 text-amber-300" />
              <span>Kariyerimi Planla</span>
            </Link>

            <Link
              href="/kurumsal-demo"
              className="px-4 py-2 bg-gradient-to-r from-[#E11D48] to-[#BE123C] hover:opacity-95 text-white font-black rounded-xl text-xs shadow-lg transition-all flex items-center space-x-1.5"
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
        <div className="lg:hidden bg-[#061B33] border-b border-white/10 px-4 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-bold text-gray-200 hover:bg-white/10 hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <Link
              href="/kariyer-seviyeni-ogren"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl text-xs text-center block shadow-md"
            >
              Kariyer Seviyeni Öğren (15 Soruluk Test)
            </Link>

            <Link
              href="/kariyerimi-planla"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-[#087F96] text-white font-bold rounded-xl text-xs text-center block shadow-md"
            >
              Kariyerimi Planla (Mevcut → Hedef Pozisyon)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
