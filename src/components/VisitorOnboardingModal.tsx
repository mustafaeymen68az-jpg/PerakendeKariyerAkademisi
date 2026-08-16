'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  X, ArrowRight, ArrowLeft, Sparkles, CheckCircle2, Building2, User, KeyRound,
  Search, Play, GraduationCap, ChevronRight, Check
} from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'WELCOME' | 'INDIVIDUAL' | 'CORPORATE'>('WELCOME');
  
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
  const [showSampleModal, setShowSampleModal] = useState(false);

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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem('pka_onboarding_dismissed');
      if (!dismissed) {
        const timer = setTimeout(() => setIsOpen(true), 500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setActiveTab('WELCOME');
    };
    window.addEventListener('open_visitor_onboarding', handleOpen);
    return () => window.removeEventListener('open_visitor_onboarding', handleOpen);
  }, []);

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pka_onboarding_dismissed', 'true');
    }
    setIsOpen(false);
  };

  const logAnalytics = async (eventName: string, metadata?: Record<string, unknown>) => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventName, metadata })
      });
    } catch (e) {
      // silent
    }
  };

  const handleStartIndividual = () => {
    setActiveTab('INDIVIDUAL');
    setIndivStep(1);
    setErrorMsg(null);
    logAnalytics('onboarding_started', { type: 'INDIVIDUAL' });
  };

  const handleStartCorporate = () => {
    setActiveTab('CORPORATE');
    setErrorMsg(null);
    logAnalytics('onboarding_started', { type: 'CORPORATE' });
  };

  // Individual Step Navigation
  const handleIndivStep1Next = (profileId: string) => {
    setUserProfile(profileId);
    setIndivStep(2);
    logAnalytics('customer_type_selected', { profileId });
  };

  const handleIndivStep2Next = () => {
    if (!selectedPosition) {
      setErrorMsg('Lütfen mevcut pozisyonunuzu seçiniz.');
      return;
    }
    if (selectedPosition === 'Diğer' && !customPosition.trim()) {
      setErrorMsg('Lütfen pozisyonunuzu yazınız.');
      return;
    }
    setErrorMsg(null);
    setIndivStep(3);
    logAnalytics('position_selected', { position: customPosition || selectedPosition });
  };

  const handleIndivStep3Next = async (goalTitle: string) => {
    setSelectedGoal(goalTitle);
    setErrorMsg(null);
    setIsLoadingRec(true);
    setIndivStep(4);
    logAnalytics('career_goal_selected', { goal: goalTitle });

    try {
      const res = await fetch('/api/onboarding/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          positionName: selectedPosition,
          customPosition: selectedPosition === 'Diğer' ? customPosition : undefined,
          careerGoalTitle: goalTitle
        })
      });
      const data = await res.json();
      if (data.success) {
        setRecommendation(data.recommendation);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingRec(false);
    }
  };

  // Corporate Form Submission
  const handleCorpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!corpForm.companyName.trim() || !corpForm.contactName.trim() || !corpForm.email.trim() || !corpForm.phone.trim()) {
      setErrorMsg('Lütfen zorunlu alanları doldurunuz.');
      return;
    }
    if (!corpForm.kvkkConsent) {
      setErrorMsg('Devam etmek için KVKK aydınlatma metnini onaylamalısınız.');
      return;
    }
    setErrorMsg(null);

    try {
      const res = await fetch('/api/onboarding/corporate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpForm)
      });
      const data = await res.json();
      if (data.success) {
        setCorpSuccess(true);
      } else {
        setErrorMsg(data.message || 'Talebiniz iletilemedi.');
      }
    } catch (e) {
      setErrorMsg('Bağlantı hatası oluştu.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden my-auto text-slate-800 transition-all">
        
        {/* Top Header / Close / Back Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center space-x-2">
            {activeTab !== 'WELCOME' && (
              <button
                onClick={() => {
                  if (activeTab === 'INDIVIDUAL' && indivStep > 1) {
                    setIndivStep(indivStep - 1);
                  } else {
                    setActiveTab('WELCOME');
                  }
                }}
                className="p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-200/60 transition-colors"
                title="Geri"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <span className="text-xs font-black tracking-wider uppercase text-blue-600 flex items-center space-x-1">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>PERAKENDE KARİYER AKADEMİSİ</span>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleDismiss}
              className="text-xs font-bold text-slate-600 hover:text-slate-800 transition-colors px-2 py-1"
            >
              Daha sonra
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
              title="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Validation Alert */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-700 text-center animate-in zoom-in-95">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* -------------------- 1. WELCOME SCREEN -------------------- */}
        {activeTab === 'WELCOME' && (
          <div className="p-6 sm:p-10 space-y-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-blue-500/20">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Size özel eğitim ve kariyer yolculuğunu oluşturalım
              </h2>
              <p className="text-sm text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
                Mevcut pozisyonunuzu ve hedefinizi belirtin; size uygun eğitimleri, yetkinlikleri ve bir sonraki kariyer adımını önerelim.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                onClick={handleStartIndividual}
                className="group p-6 bg-slate-50 hover:bg-blue-50/60 border-2 border-slate-200 hover:border-blue-500 rounded-3xl text-left transition-all shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base group-hover:text-blue-700">
                      Bireysel Olarak Devam Et
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Kendi kariyer hedefleriniz, yetkinlik gelişiminiz ve sertifikasyonunuz için kişisel gelişim rotanızı çizin.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs font-black text-blue-600 space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>HEMEN BAŞLA</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              <button
                onClick={handleStartCorporate}
                className="group p-6 bg-slate-50 hover:bg-purple-50/60 border-2 border-slate-200 hover:border-purple-500 rounded-3xl text-left transition-all shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base group-hover:text-purple-700">
                      Kurumum Adına Devam Et
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Mağaza ekipleriniz ve yöneticileriniz için kurumsal akademi paketleri, toplu lisanslar ve demo talebi.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs font-black text-purple-600 space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>KURUMSAL ÇÖZÜMLER</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>

            <div className="border-t border-slate-100 pt-6 text-center">
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push('/giris');
                }}
                className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-blue-700 transition-colors cursor-pointer"
              >
                <KeyRound className="w-4 h-4 text-blue-600" />
                <span>Mevcut hesabınızla giriş yapın ➔</span>
              </button>
            </div>
          </div>
        )}

        {/* -------------------- 2. INDIVIDUAL ONBOARDING FLOW -------------------- */}
        {activeTab === 'INDIVIDUAL' && (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Step Indicator */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
                      indivStep === step
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                        : indivStep > step
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {indivStep > step ? <Check className="w-4 h-4" /> : step}
                  </div>
                ))}
              </div>
              <span className="text-blue-600 font-extrabold">Adım {indivStep} / 4</span>
            </div>

            {/* STEP 1: Kullanıcı profili */}
            {indivStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Sizi nasıl tanıyalım?</h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Size en uygun içerik ve seviyeyi belirlemek için profil türünüzü seçin.</p>
                </div>

                <div className="space-y-3">
                  {USER_PROFILES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleIndivStep1Next(p.id)}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group cursor-pointer ${
                        userProfile === p.id
                          ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-blue-300 text-slate-800'
                      }`}
                    >
                      <div>
                        <div className="font-extrabold text-sm text-slate-900 group-hover:text-blue-700">{p.label}</div>
                        <div className="text-xs text-slate-500 font-medium mt-0.5">{p.desc}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Mevcut pozisyon */}
            {indivStep === 2 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Mevcut pozisyonunuz nedir?</h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Aşağıdaki kategorilerden pozisyonunuzu seçin veya listeden arayın.</p>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Pozisyon ara... (ör. Kasiyer, Mağaza Müdürü)"
                    value={positionSearch}
                    onChange={(e) => setPositionSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                {/* Grouped Positions Container */}
                <div className="max-h-64 overflow-y-auto space-y-4 pr-1">
                  {POSITION_GROUPS.map((group) => {
                    const filteredPositions = group.positions.filter(pos =>
                      pos.toLowerCase().includes(positionSearch.toLowerCase())
                    );
                    if (filteredPositions.length === 0) return null;

                    return (
                      <div key={group.groupKey} className="space-y-2">
                        <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white py-1">
                          {group.groupLabel}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {filteredPositions.map((pos) => (
                            <button
                              key={pos}
                              type="button"
                              onClick={() => setSelectedPosition(pos)}
                              className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                                selectedPosition === pos
                                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                              }`}
                            >
                              {pos}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Custom Position Text Field when "Diğer" selected */}
                {selectedPosition === 'Diğer' && (
                  <div className="animate-in fade-in space-y-2 pt-2">
                    <label className="text-xs font-bold text-slate-700">Lütfen Pozisyonunuzu Yazınız:</label>
                    <input
                      type="text"
                      placeholder="Örn: Görsel Düzenleme Uzmanı"
                      value={customPosition}
                      onChange={(e) => setCustomPosition(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                    />
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={handleIndivStep2Next}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 tracking-wider uppercase cursor-pointer"
                  >
                    <span>DEVAM ET</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Kariyer hedefi */}
            {indivStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Kariyer hedefiniz nedir?</h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Gelişim rotanızı şekillendirecek ana hedefinizi belirleyin.</p>
                </div>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {CAREER_GOALS.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => handleIndivStep3Next(g.title)}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group cursor-pointer ${
                        selectedGoal === g.title
                          ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-blue-300 text-slate-800'
                      }`}
                    >
                      <div>
                        <div className="font-extrabold text-sm text-slate-900 group-hover:text-blue-700">{g.title}</div>
                        <div className="text-xs text-slate-500 font-medium mt-0.5">{g.desc}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Kişiselleştirilmiş Sonuç Kartı */}
            {indivStep === 4 && (
              <div className="space-y-6">
                {isLoadingRec ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs font-bold text-slate-600">Size özel kariyer rotası ve eğitim paketi hazırlanıyor...</p>
                  </div>
                ) : recommendation ? (
                  <div className="space-y-6 animate-in zoom-in-95">
                    
                    {/* Hero Result Header */}
                    <div className="p-5 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl space-y-3 shadow-xl relative overflow-hidden">
                      <div className="absolute right-0 top-0 opacity-10 translate-x-4 -translate-y-4">
                        <Sparkles className="w-48 h-48" />
                      </div>
                      <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-mono font-bold text-blue-200">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>KİŞİSELLEŞTİRİLMİŞ AKADEMİ ROTASI</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black leading-snug">
                        {recommendation.summaryMessage}
                      </h3>
                      
                      {/* Career Pathway Badge */}
                      <div className="flex items-center space-x-2 pt-2 text-xs font-bold text-blue-200">
                        <span className="px-2.5 py-1 bg-white/10 rounded-xl">{recommendation.currentPosition}</span>
                        <ArrowRight className="w-4 h-4 text-emerald-400" />
                        <span className="px-2.5 py-1 bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 rounded-xl font-extrabold">
                          {recommendation.targetPosition}
                        </span>
                      </div>
                    </div>

                    {/* Stats & Competencies Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                        <div className="text-xs text-slate-500 font-bold uppercase">Toplam Modül</div>
                        <div className="text-lg font-black text-slate-900 mt-0.5">{recommendation.totalModules} Modül</div>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                        <div className="text-xs text-slate-500 font-bold uppercase">Tahmini Süre</div>
                        <div className="text-lg font-black text-slate-900 mt-0.5">{recommendation.estimatedHours} Saat</div>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl col-span-2 sm:col-span-1">
                        <div className="text-xs text-slate-500 font-bold uppercase">Sertifika</div>
                        <div className="text-lg font-black text-emerald-600 mt-0.5">Onaylı Uzmanlık</div>
                      </div>
                    </div>

                    {/* Target Competencies */}
                    <div className="space-y-2">
                      <div className="text-xs font-mono font-bold text-slate-400 uppercase">Kazanılacak Temel Yetkinlikler</div>
                      <div className="flex flex-wrap gap-2">
                        {recommendation.competencies.map((comp: string, i: number) => (
                          <span key={i} className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-50 border border-blue-200 rounded-xl text-xs font-bold text-blue-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>{comp}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Trainings Preview */}
                    <div className="space-y-3">
                      <div className="text-xs font-mono font-bold text-slate-400 uppercase">Önerilen Eğitim Paketi İçeriği</div>
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                        {recommendation.trainings.map((t: RecommendedTraining) => (
                          <div key={t.id} className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
                            <div className="font-extrabold text-slate-900">{t.title}</div>
                            <span className="text-[11px] font-bold text-slate-500 px-2 py-0.5 bg-slate-100 rounded-lg">{t.duration} Saat</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sample Lesson & Action Buttons */}
                    <div className="space-y-3 pt-2">
                      <button
                        onClick={() => setShowSampleModal(true)}
                        className="w-full py-3 px-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-800 font-black text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                      >
                        <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                        <span>ÜCRETSİZ ÖRNEK DERSE BAŞLA</span>
                      </button>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => {
                            handleDismiss();
                            router.push('/egitimler');
                          }}
                          className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-2xl transition-all text-center cursor-pointer"
                        >
                          Paketi İncele
                        </button>
                        
                        <button
                          onClick={() => {
                            handleDismiss();
                            router.push('/kayit?role=student');
                          }}
                          className="py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-2xl shadow-lg transition-all text-center cursor-pointer"
                        >
                          Kayıt Ol ve Başla ➔
                        </button>
                      </div>
                    </div>

                  </div>
                ) : null}

              </div>
            )}

          </div>
        )}

        {/* -------------------- 3. CORPORATE ONBOARDING FLOW -------------------- */}
        {activeTab === 'CORPORATE' && (
          <div className="p-6 sm:p-8 space-y-6">
            {!corpSuccess ? (
              <form onSubmit={handleCorpSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-black text-slate-900">Kurumsal Eğitim & Demo Talebi</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">Ekipleriniz için özel içerikler ve kurumsal yönetim paneli teklifi alın.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 uppercase">Şirket Adı *</label>
                    <input
                      type="text"
                      placeholder="Örn: Sayar Marketler"
                      value={corpForm.companyName}
                      onChange={(e) => setCorpForm({ ...corpForm, companyName: e.target.value })}
                      className="w-full mt-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 uppercase">Yetkili Ad Soyad *</label>
                    <input
                      type="text"
                      placeholder="Örn: Ahmet Yılmaz"
                      value={corpForm.contactName}
                      onChange={(e) => setCorpForm({ ...corpForm, contactName: e.target.value })}
                      className="w-full mt-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 uppercase">Kurumsal E-Posta *</label>
                    <input
                      type="email"
                      placeholder="ahmet@sirketiniz.com"
                      value={corpForm.email}
                      onChange={(e) => setCorpForm({ ...corpForm, email: e.target.value })}
                      className="w-full mt-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 uppercase">Telefon *</label>
                    <input
                      type="tel"
                      placeholder="0532 000 00 00"
                      value={corpForm.phone}
                      onChange={(e) => setCorpForm({ ...corpForm, phone: e.target.value })}
                      className="w-full mt-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 uppercase">Mağaza Sayısı</label>
                    <select
                      value={corpForm.storeCount}
                      onChange={(e) => setCorpForm({ ...corpForm, storeCount: e.target.value })}
                      className="w-full mt-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 cursor-pointer"
                    >
                      <option value="1-5">1 - 5 Mağaza</option>
                      <option value="5-20">5 - 20 Mağaza</option>
                      <option value="20-50">20 - 50 Mağaza</option>
                      <option value="50+">50+ Mağaza</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 uppercase">Lisans İhtiyacı</label>
                    <select
                      value={corpForm.licenseCount}
                      onChange={(e) => setCorpForm({ ...corpForm, licenseCount: e.target.value })}
                      className="w-full mt-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 cursor-pointer"
                    >
                      <option value="10-25">10 - 25 Çalışan</option>
                      <option value="25-100">25 - 100 Çalışan</option>
                      <option value="100-500">100 - 500 Çalışan</option>
                      <option value="500+">500+ Çalışan</option>
                    </select>
                  </div>
                </div>

                {/* KVKK Consent */}
                <div className="pt-2">
                  <label className="flex items-start space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={corpForm.kvkkConsent}
                      onChange={(e) => setCorpForm({ ...corpForm, kvkkConsent: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                    <span className="text-[11px] font-medium text-slate-600 leading-snug">
                      KVKK Aydınlatma Metnini okudum, kişisel verilerimin iletişim ve kurumsal teklif amacıyla işlenmesini onaylıyorum.
                    </span>
                  </label>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-4 bg-purple-700 hover:bg-purple-800 text-white font-black text-xs rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2 tracking-wider uppercase cursor-pointer"
                  >
                    <span>DEMO / TEKLİF TALEBİ GÖNDER</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Talebiniz Başarıyla Alındı!</h3>
                <p className="text-xs text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
                  Kurumsal eğitim danışmanımız en kısa sürede sizinle iletişime geçerek kurumunuza özel akademiyi tanımlayacaktır.
                </p>
                <button
                  onClick={handleDismiss}
                  className="px-6 py-3 bg-slate-900 text-white font-bold text-xs rounded-2xl shadow-lg cursor-pointer"
                >
                  Tamam
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* SAMPLE LESSON MODAL */}
      {showSampleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-slate-900 text-sm flex items-center space-x-2">
                <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>{recommendation?.sampleLesson?.title}</span>
              </h4>
              <button onClick={() => setShowSampleModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center text-white relative overflow-hidden">
              <div className="text-center space-y-2 p-6">
                <Play className="w-12 h-12 text-emerald-400 mx-auto fill-emerald-400 opacity-80" />
                <div className="font-black text-sm">Ücretsiz Örnek Ders Önizlemesi</div>
                <p className="text-xs text-slate-400">Gelişim rotanızdaki ilk modüle ait örnek ders yayını.</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowSampleModal(false);
                handleDismiss();
                router.push('/kayit?role=student');
              }}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-2xl shadow-lg cursor-pointer"
            >
              Dersin Tamamına Erişmek İçin Ücretsiz Kayıt Ol ➔
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
