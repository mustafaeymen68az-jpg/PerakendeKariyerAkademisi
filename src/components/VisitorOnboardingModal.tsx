'use client';

import React, { useState, useEffect } from 'react';
import { User, ArrowRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

export interface VisitorProfile {
  firstName: string;
  lastName: string;
  companyName: string;
  sectorChannel: string;
  jobRole: string;
  city: string;
  createdAt: string;
}

const TURKEY_CITIES = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin', 
  'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 
  'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 
  'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 
  'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 
  'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 
  'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 
  'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 
  'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak', 
  'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
];

const SECTOR_CHANNELS = [
  'Gıda Perakendeciliği (Süpermarket, Hipermarket, İndirim Market)',
  'Moda & Tekstil Perakendeciliği',
  'Kozmetik & Kişisel Bakım',
  'Elektronik & Teknoloji Perakendeciliği',
  'Ev, Yaşam & Züccaciye',
  'Yapı Market & Ev Geliştirme',
  'Akaryakıt & İstasyon Perakendeciliği',
  'Mobilya & Dekorasyon',
  'Spor & Outdoor',
  'Ayakkabı & Çanta',
  'E-Ticaret & Omnichannel Perakende',
  'Lojistik & Depo Dağıtım',
  'Diğer Perakende Sektörleri'
];

const JOB_ROLES = [
  'Kasiyer & Kasa Görevlisi',
  'Reyon Satış Elemanı',
  'Meyve Sebze / Kasap / Şarküteri Reyon Şefi',
  'Mağaza Müdür Yardımcısı',
  'Mağaza Müdürü',
  'Bölge Operasyon Müdürü',
  'Satınalma & Kategori Yöneticisi',
  'İnsan Kaynakları Uzmanı / Müdürü',
  'Eğitim & Gelişim Müdürü',
  'CEO / Genel Müdür / Şirket Sahibi',
  'Diğer Saha veya Merkez Görevi'
];

export default function VisitorOnboardingModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDemoLoginMode, setIsDemoLoginMode] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    sectorChannel: '',
    jobRole: '',
    city: ''
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has already saved profile
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('pka_visitor_profile');
      if (!savedProfile) {
        // Show modal after small delay for first-time visitors
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 600);
        return () => clearTimeout(timer);
      } else {
        try {
          const parsed = JSON.parse(savedProfile);
          setFormData(parsed);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  // Listen for custom trigger event (e.g. from header profile button)
  useEffect(() => {
    const handleOpenModalEvent = () => setIsOpen(true);
    window.addEventListener('open_visitor_profile_modal', handleOpenModalEvent);
    return () => window.removeEventListener('open_visitor_profile_modal', handleOpenModalEvent);
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setErrorMsg('Lütfen adınızı ve soyadınızı giriniz.');
      return;
    }
    if (!formData.companyName.trim()) {
      setErrorMsg('Lütfen çalıştığınız perakende işletmesinin adını giriniz.');
      return;
    }
    if (!formData.sectorChannel) {
      setErrorMsg('Lütfen sektör kanalını seçiniz.');
      return;
    }
    if (!formData.jobRole) {
      setErrorMsg('Lütfen şirketteki görevinizi seçiniz.');
      return;
    }
    if (!formData.city) {
      setErrorMsg('Lütfen bulunduğunuz ili açılır listeden seçiniz.');
      return;
    }

    const completeProfile: VisitorProfile = {
      ...formData,
      createdAt: new Date().toISOString()
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('pka_visitor_profile', JSON.stringify(completeProfile));
      // Notify components about profile update
      window.dispatchEvent(new Event('pka_profile_updated'));
    }

    setIsOpen(false);
  };

  const handleDemoQuickLogin = (demoName: string, role: string, company: string, sector: string, city: string) => {
    const demoProfile: VisitorProfile = {
      firstName: demoName.split(' ')[0],
      lastName: demoName.split(' ')[1] || '',
      companyName: company,
      sectorChannel: sector,
      jobRole: role,
      city: city,
      createdAt: new Date().toISOString()
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('pka_visitor_profile', JSON.stringify(demoProfile));
      window.dispatchEvent(new Event('pka_profile_updated'));
    }

    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Container Card matching user screenshot layout */}
      <div className="relative w-full max-w-md bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 my-auto text-slate-800">
        
        {/* Optional Close Button (if already has profile) */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          title="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Icon Circle Avatar Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative w-20 h-20 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center shadow-inner">
            <User className="w-10 h-10 text-slate-600" />
            <div className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Bilgileriniz
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Lütfen profil bilgilerinizi eksiksiz doldurunuz.
            </p>
          </div>
        </div>

        {/* Validation Error Message */}
        {errorMsg && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 font-bold text-center animate-in zoom-in-95">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* FORM FIELDS */}
        {!isDemoLoginMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Row 1: İsim & Soyisim side-by-side */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="İsim"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-[#1D4ED8] rounded-2xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 transition-all shadow-2xs"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Soyisim"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-[#1D4ED8] rounded-2xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Row 2: İşletme Adı */}
            <div>
              <input
                type="text"
                placeholder="İşletme Adı"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-[#1D4ED8] rounded-2xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 transition-all shadow-2xs"
              />
            </div>

            {/* Row 3: Sektör Kanalı (Select Dropdown) */}
            <div>
              <select
                value={formData.sectorChannel}
                onChange={(e) => handleChange('sectorChannel', e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-[#1D4ED8] rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 transition-all shadow-2xs appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-slate-400">
                  Sektör Kanalı Seçiniz
                </option>
                {SECTOR_CHANNELS.map((sec) => (
                  <option key={sec} value={sec} className="text-slate-900 py-1">
                    {sec}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 4: Şirketteki Görevin & İl side-by-side */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <select
                  value={formData.jobRole}
                  onChange={(e) => handleChange('jobRole', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-[#1D4ED8] rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 transition-all shadow-2xs appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-slate-400">
                    Şirketteki Görevin
                  </option>
                  {JOB_ROLES.map((role) => (
                    <option key={role} value={role} className="text-slate-900">
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* İl (Açılır Kutu / Select Dropdown) */}
              <div>
                <select
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-[#1D4ED8] rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 transition-all shadow-2xs appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-slate-400">
                    İl Seçiniz
                  </option>
                  {TURKEY_CITIES.map((city) => (
                    <option key={city} value={city} className="text-slate-900">
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Primary Submit Button: DEVAM ET ➔ */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-[#1E40AF] via-[#1D4ED8] to-[#2563EB] hover:from-[#1E3A8A] hover:to-[#1D4ED8] text-white font-black text-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2 tracking-wider uppercase active:scale-[0.99] cursor-pointer"
              >
                <span>DEVAM ET</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </form>
        ) : (
          /* Demo Quick Login Options */
          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold text-slate-500 text-center uppercase tracking-wider">
              Hazır Örnek Profillerden Biriyle Giriş Yapın:
            </p>

            <button
              onClick={() => handleDemoQuickLogin('Ahmet Çelik', 'Manav Reyon Görevlisi', 'Migros / Macrocenter', 'Gıda Perakendeciliği', 'İstanbul')}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <h4 className="font-black text-sm text-slate-900">Ahmet Çelik</h4>
                <p className="text-xs text-slate-600 font-medium">Manav Reyon Görevlisi • Migros (İstanbul)</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleDemoQuickLogin('Zeynep Kaya', 'Kasiyer & Kasa Görevlisi', 'CarrefourSA', 'Gıda Perakendeciliği', 'İzmir')}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <h4 className="font-black text-sm text-slate-900">Zeynep Kaya</h4>
                <p className="text-xs text-slate-600 font-medium">Kasiyer Şefi • CarrefourSA (İzmir)</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleDemoQuickLogin('Mehmet Öztürk', 'Mağaza Müdürü', 'LC Waikiki', 'Moda & Tekstil Perakendeciliği', 'Ankara')}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <h4 className="font-black text-sm text-slate-900">Mehmet Öztürk</h4>
                <p className="text-xs text-slate-600 font-medium">Mağaza Müdürü • LC Waikiki (Ankara)</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setIsDemoLoginMode(false)}
              className="w-full py-2.5 text-xs text-slate-500 font-bold hover:underline text-center block pt-2"
            >
              ← Form İle Bilgi Doldurmaya Dön
            </button>
          </div>
        )}

        {/* Bottom Link matching user screenshot: MEVCUT HESABINIZLA GİRİŞ YAPIN • */}
        <div className="border-t border-slate-100 pt-4 text-center">
          <button
            type="button"
            onClick={() => setIsDemoLoginMode(!isDemoLoginMode)}
            className="text-[11px] font-mono font-bold text-slate-600 hover:text-slate-900 tracking-wider uppercase transition-colors inline-flex items-center space-x-1 cursor-pointer"
          >
            <span>{isDemoLoginMode ? 'YENİ PROFİL BİLGİSİ GİRİN' : 'MEVCUT HESABINIZLA GİRİŞ YAPIN'}</span>
            <span className="text-blue-600 font-black">•</span>
          </button>
        </div>

      </div>
    </div>
  );
}
