'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Building2,
  User,
  KeyRound,
  Search,
  Play,
  GraduationCap,
  ChevronRight,
  Check,
  Mail,
  Lock,
  Phone,
  Briefcase,
  UserPlus,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import Logo from '@/components/Logo';

export interface VisitorProfile {
  firstName: string;
  lastName: string;
  companyName: string;
  sectorChannel: string;
  jobRole: string;
  city: string;
  createdAt?: string;
}

interface RecommendedTraining {
  id: string;
  title: string;
  duration: number;
  level: string;
  format: string;
  coverImage?: string;
  description?: string;
}

interface RecommendationResult {
  title: string;
  summaryMessage: string;
  currentPosition: string;
  targetPosition: string;
  careerGoal: string;
  pathTitle: string;
  totalModules: number;
  estimatedHours: number;
  competencies: string[];
  trainings: RecommendedTraining[];
  sampleLesson: {
    title: string;
    duration: string;
    videoUrl: string;
  };
}

const POSITIONS_LIST = [
  'Açık Şarküteri Reyonu Satış Elemanı',
  'Bilgi İşlem',
  'Bölge Müdürü',
  'CEO / Genel Müdür / İşletme Sahibi',
  'E-Ticaret ve Online Sipariş',
  'Finans',
  'Güvenlik ve Kayıp Önleme',
  'İnsan Kaynakları',
  'Kasap Reyonu Satış Elemanı',
  'Kasiyer',
  'Kuruyemiş Reyonu Satış Elemanı',
  'Lojistik ve Depo',
  'Mağaza Müdür Yardımcıları',
  'Mağaza Müdürleri',
  'Meyve Sebze Reyonu Satış Elemanı',
  'Muhasebe',
  'Müşteri Hizmetleri ve Danışma',
  'Pazarlama ve CRM',
  'Rapor Analiz',
  'Reyon Satış Elemanları',
  'Satınalma ve Kategori Yönetimi',
  'Taze Gıda Reyonları',
  'Teknik Bakım ve İdari İşler',
  'Temizlik ve Destek Hizmetleri',
  'Unlu Mamuller ve Hazır Yemek Reyonu',
  'Diğer'
];

const POSITION_GROUPS = [
  {
    groupKey: 'STORE_OPERATIONS',
    groupLabel: 'Mağaza Operasyonu',
    positions: ['Kasiyer', 'Reyon satış elemanı', 'Satış danışmanı', 'Müşteri hizmetleri çalışanı']
  },
  {
    groupKey: 'FRESH_FOOD',
    groupLabel: 'Taze Gıda',
    positions: ['Kasap reyonu çalışanı', 'Şarküteri çalışanı', 'Meyve-sebze çalışanı', 'Unlu mamuller çalışanı', 'Taze gıda yöneticisi']
  },
  {
    groupKey: 'STORE_MANAGEMENT',
    groupLabel: 'Mağaza Yönetimi',
    positions: ['Takım lideri', 'Mağaza müdür yardımcısı', 'Mağaza müdürü']
  },
  {
    groupKey: 'FIELD_MANAGEMENT',
    groupLabel: 'Saha Yönetimi',
    positions: ['Bölge müdürü', 'Operasyon müdürü']
  },
  {
    groupKey: 'HEADQUARTERS',
    groupLabel: 'Merkez Departmanları',
    positions: [
      'Satın alma ve kategori yönetimi', 'Lojistik ve depo', 'Finans', 'Muhasebe',
      'İnsan kaynakları', 'Bilgi işlem', 'Raporlama / BI', 'Pazarlama ve CRM',
      'E-ticaret', 'Güvenlik ve kayıp önleme', 'Teknik bakım ve idari işler'
    ]
  },
  {
    groupKey: 'EXECUTIVE',
    groupLabel: 'Üst Yönetim',
    positions: ['Genel müdür', 'CEO', 'İşletme sahibi']
  },
  {
    groupKey: 'OTHER',
    groupLabel: 'Diğer',
    positions: ['Henüz çalışmıyorum', 'Diğer']
  }
];

const USER_PROFILES = [
  { id: 'employee', label: 'Perakende çalışanıyım', desc: 'Mağaza veya saha operasyonlarında görev alıyorum.' },
  { id: 'manager', label: 'Perakende yöneticisiyim', desc: 'Ekip veya mağaza yönetiyorum.' },
  { id: 'trainer', label: 'Eğitmenim', desc: 'Sektör profesyonellerine eğitim veriyorum.' },
  { id: 'newbie', label: 'Sektöre yeni başlayacağım', desc: 'Perakende sektöründe kariyer adımı atmak istiyorum.' },
  { id: 'changer', label: 'Kariyerimi değiştirmek istiyorum', desc: 'Farklı bir alandan perakendeye geçmek istiyorum.' }
];

const CAREER_GOALS = [
  { id: 'expert', title: 'Mevcut görevimde uzmanlaşmak', desc: 'Derinlemesine bilgi ve operasyonel yetkinlik kazanmak' },
  { id: 'promote', title: 'Bir üst pozisyona hazırlanmak', desc: 'Bir sonraki terfi adımına hızla hazırlanmak' },
  { id: 'leader', title: 'Yönetici olmak', desc: 'Ekip liderliği ve yönetim becerileri edinmek' },
  { id: 'dept_switch', title: 'Farklı bir departmana geçmek', desc: 'Merkez veya farklı bir operasyon birimine geçmek' },
  { id: 'cert', title: 'Sertifika almak', desc: 'Uluslararası standartlarda sertifikasyon sahibi olmak' },
  { id: 'team', title: 'Ekibimi geliştirmek', desc: 'Ekibimin yetkinlik ve performansını artırmak' },
  { id: 'undecided', title: 'Henüz karar vermedim', desc: 'Sistemin önerilerini incelemek istiyorum' }
];

export default function VisitorOnboardingModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER' | 'WELCOME' | 'INDIVIDUAL' | 'CORPORATE'>('LOGIN');

  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register State
  const [regData, setRegData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    position: '',
    customPosition: '',
    companyName: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  // Individual Flow Step (1 to 4)
  const [indivStep, setIndivStep] = useState(1);
  const [userProfile, setUserProfile] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [customPosition, setCustomPosition] = useState('');
  const [positionSearch, setPositionSearch] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');

  // Individual Result State
  const [isLoadingRec, setIsLoadingRec] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);

  // Corporate Flow State
  const [corpForm, setCorpForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    roleTitle: '',
    storeCount: '5-10',
    employeeCount: '50-100',
    trainingInterests: [] as string[],
    licenseCount: '25',
    requestType: 'DEMO',
    kvkkConsent: false
  });
  const [corpSuccess, setCorpSuccess] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // SITE İLK AÇILDIĞINDA GİRİŞ EKRANI EN ÖNE GELSİN
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('user_session=') || row.startsWith('pka_user_session='));
      // If user is not logged in, auto open the Login Modal on site start
      if (!sessionCookie) {
        const timer = setTimeout(() => setIsOpen(true), 200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setActiveTab('LOGIN');
      setErrorMsg(null);
    };
    window.addEventListener('open_visitor_onboarding', handleOpen);
    return () => window.removeEventListener('open_visitor_onboarding', handleOpen);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setErrorMsg('E-posta ve şifre zorunludur.');
      return;
    }
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        window.location.href = data.redirectUrl || '/panel';
      } else {
        setErrorMsg(data.message || 'Hatalı giriş yaptınız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Sunucu ile bağlantı kurulamadı.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regData.name.trim() || !regData.surname.trim() || !regData.email.trim() || !regData.phone.trim() || !regData.position || !regData.companyName.trim() || !regData.password) {
      setErrorMsg('Lütfen tüm zorunlu alanları doldurunuz.');
      return;
    }
    if (regData.password.length < 6) {
      setErrorMsg('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);
    const finalTitle = regData.position === 'Diğer' ? regData.customPosition : regData.position;

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regData.name,
          surname: regData.surname,
          email: regData.email,
          phone: regData.phone,
          title: finalTitle,
          companyName: regData.companyName,
          password: regData.password
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        window.location.href = data.redirectUrl || '/panel';
      } else {
        setErrorMsg(data.message || 'Kayıt sırasında bir hata oluştu.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Sunucu ile bağlantı kurulamadı.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillMock = (email: string, pass: string) => {
    setLoginEmail(email);
    setLoginPassword(pass);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden my-auto text-slate-800 transition-all">
        
        {/* Top Accent Gradient */}
        <div className="h-2 bg-gradient-to-r from-[#0B2A4A] via-[#087F96] to-[#34A853]" />

        {/* Modal Top Header Bar */}
        <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center space-x-2">
            <Logo variant="light" size="sm" showSubtext={false} />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDismiss}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors px-2 py-1"
            >
              Siteyi İncele ➔
            </button>
            <button
              onClick={handleDismiss}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
              title="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Tab Bar: Giriş Yap | İlk Defa Kayıt Ol | Kariyer Rotası */}
        <div className="px-6 pt-4">
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => { setActiveTab('LOGIN'); setErrorMsg(null); }}
              className={`flex-1 py-2 text-center text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                activeTab === 'LOGIN' ? 'bg-white text-[#0B2A4A] shadow-md' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              🔑 Giriş Yap
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('REGISTER'); setErrorMsg(null); }}
              className={`flex-1 py-2 text-center text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                activeTab === 'REGISTER' ? 'bg-white text-[#0B2A4A] shadow-md' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              👤 İlk Defa Kayıt Ol
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('WELCOME'); setErrorMsg(null); }}
              className={`flex-1 py-2 text-center text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                activeTab === 'WELCOME' || activeTab === 'INDIVIDUAL' || activeTab === 'CORPORATE'
                  ? 'bg-[#087F96] text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              ✨ Rota Analizi
            </button>
          </div>
        </div>

        {/* Validation Alert */}
        {errorMsg && (
          <div className="mx-6 mt-3 p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-700 flex items-center space-x-2 animate-in zoom-in-95">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* -------------------- 1. LOGIN TAB -------------------- */}
        {activeTab === 'LOGIN' && (
          <div className="p-6 sm:p-8 space-y-5">
            <div className="text-center space-y-1">
              <h2 className="font-display font-extrabold text-2xl tracking-tight text-[#0B2A4A]">
                Giriş Yap
              </h2>
              <p className="text-xs text-[#5A6B7C] font-medium">
                Perakende Kariyer Akademisi panelinize erişmek için bilgilerinizi giriniz.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-extrabold text-[#0B2A4A] mb-1">
                  E-Posta Adresi *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="ornek@perakendemuhendisi.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-2xl text-xs text-[#0B2A4A] font-semibold focus:outline-none focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#0B2A4A] mb-1">
                  Şifreniz *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-2xl text-xs text-[#0B2A4A] font-semibold focus:outline-none focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-[#0B2A4A] via-[#1D4ED8] to-[#087F96] hover:opacity-95 text-white rounded-2xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>GİRİŞ YAPILIYOR...</span>
                  ) : (
                    <>
                      <span>GİRİŞ YAP</span>
                      <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Test Accounts */}
            <div className="border-t border-slate-100 pt-3 space-y-2">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider text-center block">
                Hızlı Test Hesapları
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleFillMock('admin@perakendemuhendisi.com', 'admin123')}
                  className="p-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-left rounded-xl text-xs transition-colors cursor-pointer"
                >
                  <span className="font-extrabold text-amber-900 block">👑 Admin Hesabı</span>
                  <span className="text-[10px] text-amber-700">admin@perakendemuhendisi.com</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleFillMock('ahmet@sayarmarket.com', 'ahmet123')}
                  className="p-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-left rounded-xl text-xs transition-colors cursor-pointer"
                >
                  <span className="font-extrabold text-blue-900 block">👤 Çalışan Hesabı</span>
                  <span className="text-[10px] text-blue-700">ahmet@sayarmarket.com</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- 2. REGISTER TAB -------------------- */}
        {activeTab === 'REGISTER' && (
          <div className="p-6 sm:p-8 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#DDF4F7] text-[#087F96] rounded-full text-[10px] font-extrabold tracking-wider uppercase mb-1">
                <UserPlus className="w-3.5 h-3.5" />
                <span>İLK DEFA KAYIT FORMU</span>
              </div>
              <h2 className="font-display font-extrabold text-xl text-[#0B2A4A]">
                Profilinizi Oluşturun
              </h2>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              {/* Ad & Soyad */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold text-[#0B2A4A] mb-1">Ad *</label>
                  <input
                    type="text"
                    value={regData.name}
                    onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                    placeholder="Adınız"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0B2A4A] font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-[#0B2A4A] mb-1">Soyad *</label>
                  <input
                    type="text"
                    value={regData.surname}
                    onChange={(e) => setRegData({ ...regData, surname: e.target.value })}
                    placeholder="Soyadınız"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0B2A4A] font-medium"
                    required
                  />
                </div>
              </div>

              {/* E-posta */}
              <div>
                <label className="block text-[11px] font-extrabold text-[#0B2A4A] mb-1">E-Posta Adresi *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    placeholder="ornek@domain.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0B2A4A] font-medium"
                    required
                  />
                </div>
              </div>

              {/* Telefon */}
              <div>
                <label className="block text-[11px] font-extrabold text-[#0B2A4A] mb-1">Telefon Numarası *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    value={regData.phone}
                    onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                    placeholder="05XX XXX XX XX"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0B2A4A] font-medium"
                    required
                  />
                </div>
              </div>

              {/* Pozisyon */}
              <div>
                <label className="block text-[11px] font-extrabold text-[#0B2A4A] mb-1">Pozisyon / Görev *</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <select
                    value={regData.position}
                    onChange={(e) => setRegData({ ...regData, position: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0B2A4A] font-medium cursor-pointer"
                    required
                  >
                    <option value="" disabled>Pozisyon seçiniz...</option>
                    {POSITIONS_LIST.map((pos) => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>
              </div>

              {regData.position === 'Diğer' && (
                <div>
                  <input
                    type="text"
                    value={regData.customPosition}
                    onChange={(e) => setRegData({ ...regData, customPosition: e.target.value })}
                    placeholder="Pozisyonunuzu belirtiniz..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0B2A4A] font-medium"
                  />
                </div>
              )}

              {/* Çalıştığı Kurum */}
              <div>
                <label className="block text-[11px] font-extrabold text-[#0B2A4A] mb-1">Çalıştığı Kurum / Şirket *</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={regData.companyName}
                    onChange={(e) => setRegData({ ...regData, companyName: e.target.value })}
                    placeholder="Şirket / İşletme Adı"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0B2A4A] font-medium"
                    required
                  />
                </div>
              </div>

              {/* Şifre */}
              <div>
                <label className="block text-[11px] font-extrabold text-[#0B2A4A] mb-1">Şifre Belirleyin *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={regData.password}
                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                    placeholder="En az 6 karakter"
                    className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0B2A4A] font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-[#0B2A4A] via-[#1D4ED8] to-[#087F96] hover:opacity-95 text-white rounded-2xl text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>KAYDEDİLİYOR...</span>
                  ) : (
                    <>
                      <span>KAYDOL VE BAŞLA</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* -------------------- 3. WELCOME ONBOARDING TAB -------------------- */}
        {activeTab === 'WELCOME' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-blue-500/20">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Kişisel Kariyer Rotanızı Oluşturalım
              </h2>
              <p className="text-xs text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
                Mevcut pozisyonunuzu ve hedefinizi seçerek yetkinlik haritanızı hemen görüntüleyin.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => { setActiveTab('INDIVIDUAL'); setIndivStep(1); }}
                className="group p-5 bg-slate-50 hover:bg-blue-50/60 border-2 border-slate-200 hover:border-blue-500 rounded-3xl text-left transition-all shadow-sm cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="font-black text-slate-900 text-sm group-hover:text-blue-700">
                  Bireysel Gelişim
                </h3>
                <p className="text-[11px] text-slate-500 font-medium mt-1">
                  Kendi kariyer hedefleriniz ve yetkinlikleriniz için gelişim haritası çıkarın.
                </p>
              </button>

              <button
                onClick={() => setActiveTab('CORPORATE')}
                className="group p-5 bg-slate-50 hover:bg-purple-50/60 border-2 border-slate-200 hover:border-purple-500 rounded-3xl text-left transition-all shadow-sm cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-black text-slate-900 text-sm group-hover:text-purple-700">
                  Kurumsal Akademi
                </h3>
                <p className="text-[11px] text-slate-500 font-medium mt-1">
                  Mağaza ve ekipleriniz için toplu eğitim lisansları ve özel demo talebi.
                </p>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
