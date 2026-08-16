'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  BookOpen,
  Award,
  TrendingUp,
  CheckCircle2,
  Clock,
  Upload,
  FileText,
  AlertTriangle,
  Play,
  HelpCircle,
  Bell,
  Target,
  ChevronRight,
  ShieldCheck,
  QrCode,
  Sparkles,
  Layers,
  MessageSquare,
  FileCheck,
  UserCheck,
  Users,
  LogOut,
  Calendar
} from 'lucide-react';

import CareerCompassMain from '@/components/career-compass/CareerCompassMain';
import MentorshipSection from '@/components/career-compass/MentorshipSection';
import CareerInterviewsSection from '@/components/career-compass/CareerInterviewsSection';
import DynamicCareerPathMap from '@/components/career-compass/DynamicCareerPathMap';
import EmployeeCoursesFullCatalog from '@/components/career-compass/EmployeeCoursesFullCatalog';
import PersonalSwotWidget from '@/components/career-compass/PersonalSwotWidget';
import CareerOrientationTestModule from '@/components/career-compass/CareerOrientationTestModule';
import { Compass } from 'lucide-react';

export default function EmployeeDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'home' | 'compass' | 'orientation' | 'courses' | 'career' | 'competencies' | 'swot' | 'tasks' | 'mentor' | 'feedback' | 'achievements' | 'certificates' | 'interviews' | 'profile'
  >('home');

  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showTaskUploadModal, setShowTaskUploadModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  // Task Upload State
  const [taskNotes, setTaskNotes] = useState('');
  const [taskFile, setTaskFile] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Career Goal State
  const [selectedGoal, setSelectedGoal] = useState('Mağaza Müdürü');
  const [goalType, setGoalType] = useState<'VERTICAL' | 'HORIZONTAL'>('VERTICAL');

  // Employee Profile & Score state
  const [employeeData, setEmployeeData] = useState({
    name: 'Ahmet Yılmaz',
    position: 'Kasiyer & Reyon Çalışanı',
    store: 'Sayar Marketler - Kadıköy Şubesi',
    promotionScore: 92.0,
    scoreComponents: {
      training: { score: 95, weight: 20, weighted: 19.0 },
      exam: { score: 92, weight: 20, weighted: 18.4 },
      fieldTask: { score: 90, weight: 25, weighted: 22.5 },
      kpi: { score: 91, weight: 25, weighted: 22.75 },
      behavioral: { score: 94, weight: 10, weighted: 9.4 },
    },
    currentCourse: {
      title: 'Kasa Sonu Z-Raporu & Teslimat Tutanağı',
      progress: 85,
      lastLesson: 'Modül 2: Kasa Kapanış Tutanağı ve Z-Raporu İncelemesi',
    },
    missingCompetencies: ['Vardiya Planlaması', 'Kasa Sonu Z-Raporu Denetimi'],
    nextPosition: 'Takım Lideri',
  });

  // Helper to resolve next position title
  const getNextPositionTitle = (currentPosition: string) => {
    const p = currentPosition.toLowerCase();
    if (p.includes('kasiyer') || p.includes('reyon')) return 'Takım Lideri';
    if (p.includes('takım lideri')) return 'Mağaza Müdür Yardımcısı';
    if (p.includes('müdür yardımcısı') || p.includes('müdür yrd')) return 'Mağaza Müdürü';
    if (p.includes('mağaza müdürü')) return 'Bölge / Saha Müdürü';
    if (p.includes('bölge') || p.includes('saha müdürü')) return 'Perakende Operasyon Direktörü';
    if (p.includes('direktör')) return 'Genel Müdür Yardımcısı (COO)';
    if (p.includes('genel müdür yrd') || p.includes('coo')) return 'CEO / Genel Müdür';
    return 'Mağaza Müdürü';
  };

  // Sync active position when changed by Admin in Admin Panel
  useEffect(() => {
    const syncPositionFromStorage = () => {
      const savedPos = localStorage.getItem('pka_active_position');
      if (savedPos) {
        const nextPos = getNextPositionTitle(savedPos);
        setEmployeeData(prev => ({
          ...prev,
          position: savedPos,
          nextPosition: nextPos
        }));
      }
    };

    syncPositionFromStorage();
    window.addEventListener('pka_position_updated', syncPositionFromStorage);
    window.addEventListener('storage', syncPositionFromStorage);
    return () => {
      window.removeEventListener('pka_position_updated', syncPositionFromStorage);
      window.removeEventListener('storage', syncPositionFromStorage);
    };
  }, []);

  // Dynamic position-specific Field Tasks resolver
  const getPositionFieldTasks = (posName: string) => {
    const p = posName.toLowerCase();

    if (p.includes('satın alma') || p.includes('satin alma')) {
      return [
        {
          id: 1,
          title: 'Tedarikçi Sözleşme & İskonto Katkı Payı Denetimi',
          description: 'Son 3 ana tedarikçi sözleşmesindeki ticari iskonto oranları ve aksiyon bedelleri denetlendi. Rapor yüklendi.',
          status: 'COMPLETED',
          badgeText: 'TAMAMLANDI ✅'
        },
        {
          id: 2,
          title: 'Tedarikçi Fiyat Değişim & Rakip İnceleme Görseli',
          description: 'Rakip zincirlerdeki kritik 20 ürünün raf satış fiyatı incelenip karşılaştırmalı liste fotoğrafları eklendi.',
          status: 'PENDING',
          badgeText: 'Kanıt Yükle'
        },
        {
          id: 3,
          title: 'Tedarikçi İade Tutanak & Mal Kabul Audit Tutanağı',
          description: 'Hatalı ve eksik gelen palet sevkiyatının iade tutanağı ve irsaliye görseli taratılıp yüklendi.',
          status: 'PENDING',
          badgeText: 'Kanıt Yükle'
        }
      ];
    }

    if (p.includes('depo') || p.includes('lojistik') || p.includes('tedarik')) {
      return [
        {
          id: 1,
          title: 'Merkez Depo Giriş Mal Kabul & RF Sayım Görseli',
          description: 'Gelen 14 palet gıda dışı ürünün RF el terminali ile sayım dökümü ve kabul fişi taratıldı.',
          status: 'COMPLETED',
          badgeText: 'TAMAMLANDI ✅'
        },
        {
          id: 2,
          title: 'Depo İçi İş Güvenliği & Forklift Şerit Denetimi',
          description: 'Depo ana koridorlarında sarı güvenlik şeritleri ve emniyet ekipmanları fotoğraflanıp sisteme eklendi.',
          status: 'PENDING',
          badgeText: 'Kanıt Yükle'
        },
        {
          id: 3,
          title: 'Şube Sevkiyat Rota & Araç Doluluk Oranı Fotoğrafı',
          description: 'Sabah şube sevkiyatına çıkan 4 kamyonun palet dizilim ve doluluk oranı fotoğrafları yüklendi.',
          status: 'PENDING',
          badgeText: 'Kanıt Yükle'
        }
      ];
    }

    if (p.includes('taze gıda') || p.includes('kasap') || p.includes('manav') || p.includes('unlu mamuller')) {
      return [
        {
          id: 1,
          title: 'Soğuk Hava Deposu & Derece Takip Formu Görseli',
          description: 'Sabah ve akşam et/süt deposu dijital termometre değerleri fotoğraflanıp karta eklendi.',
          status: 'COMPLETED',
          badgeText: 'TAMAMLANDI ✅'
        },
        {
          id: 2,
          title: 'Taze Gıda Reyon Nemlendirme & Görsel Teşhir Kaydı',
          description: 'Manav ve şarküteri reyonu açılış teşhiri ile tazelik kontrolü fotoğraflandı.',
          status: 'PENDING',
          badgeText: 'Kanıt Yükle'
        },
        {
          id: 3,
          title: 'Taze Gıda İmhayı Önleme & İskonto Etiket Fotoğrafı',
          description: 'SKT son 2 günü kalan şarküteri ürünlerine sarı etiket basılıp sisteme yüklendi.',
          status: 'PENDING',
          badgeText: 'Kanıt Yükle'
        }
      ];
    }

    if (p.includes('mağaza müdürü') && !p.includes('yardımcısı') && !p.includes('yrd')) {
      return [
        {
          id: 1,
          title: 'Sabah Mağaza Açılış & Kasa Ofis Hazırlığı',
          description: 'Saat 08:30 ana kasa kasaları devir teslim tutanağı ve açılış kontrol listesi yüklendi.',
          status: 'COMPLETED',
          badgeText: 'TAMAMLANDI ✅'
        },
        {
          id: 2,
          title: 'Günlük Mağaza Fire & SKT İskonto Sayım Görseli',
          description: 'Günlük sarı etiket indirimi uygulanan ürünler ile imha tutanağı fotoğrafı eklendi.',
          status: 'PENDING',
          badgeText: 'Kanıt Yükle'
        },
        {
          id: 3,
          title: 'Mağaza İçi Haftalık P&L & Gider Optimizasyon Raporu',
          description: 'Haftalık enerji kullanımı ve personel puantaj cetveli kontrol edilip tarandı.',
          status: 'PENDING',
          badgeText: 'Kanıt Yükle'
        }
      ];
    }

    if (p.includes('bölge') || p.includes('saha müdürü')) {
      return [
        {
          id: 1,
          title: 'Bölge Mağazaları Haftalık Hizmet & Kalite Auditi',
          description: 'Bölgedeki 6 şubenin kasa hattı ve reyon standartları denetim formu taratıldı.',
          status: 'COMPLETED',
          badgeText: 'TAMAMLANDI ✅'
        },
        {
          id: 2,
          title: 'Bölgesel Rakip Fiyat Karşılaştırma & Kampanya Analizi',
          description: 'Bölgedeki rakip mağaza insert ve raf fiyatı denetim fotoğrafları eklendi.',
          status: 'PENDING',
          badgeText: 'Kanıt Yükle'
        },
        {
          id: 3,
          title: 'Şube Müdürleri Birebir Koçluk Görüşme Tutanakları',
          description: 'Şube müdürleriyle yapılan haftalık KPI hedef değerlendirme tutanağı sisteme aktarıldı.',
          status: 'PENDING',
          badgeText: 'Kanıt Yükle'
        }
      ];
    }

    if (p.includes('e-ticaret') || p.includes('dijital') || p.includes('kurye')) {
      return [
        {
          id: 1,
          title: 'Saha Hızlı Sipariş Toplama (Picking) Süre Denetimi',
          description: 'Mağaza e-ticaret toplama alanındaki ortalama sipariş hazırlama süre dökümü fotoğraflandı.',
          status: 'COMPLETED',
          badgeText: 'TAMAMLANDI ✅'
        },
        {
          id: 2,
          title: 'Kurye Çanta Hijyen & Sıcaklık Koruma Testi Fotoğrafı',
          description: 'Hızlı teslimat motor kurye çantalarının izolasyon ve hijyen denetim görselleri yüklendi.',
          status: 'PENDING',
          badgeText: 'Kanıt Yükle'
        },
        {
          id: 3,
          title: 'Mobil Uygulama Stok Eşleşme & Hatalı Stok Kaydı',
          description: 'Mobil e-ticaret stoğu ile mağaza fiziksel stok eşleştirme raporu sisteme eklendi.',
          status: 'PENDING',
          badgeText: 'Kanıt Yükle'
        }
      ];
    }

    // Kasiyer & Reyon or default
    return [
      {
        id: 1,
        title: 'Reyon Fiyat Etiketi ve Barkod Kontrolü',
        description: '45 Kritik üründe kasa ile raf fiyatı eşleştirildi. Fotoğraf eklendi.',
        status: 'COMPLETED',
        badgeText: 'TAMAMLANDI ✅'
      },
      {
        id: 2,
        title: 'Kasa Sonu Z-Raporu ve Sayım Görseli',
        description: 'Gün sonu z-raporu ve kasa nakiti teslim tutanağı yüklendi.',
        status: 'PENDING',
        badgeText: 'Kanıt Yükle'
      },
      {
        id: 3,
        title: 'Reyon Teşhir & Planogram Uyumluluk Fotoğrafı',
        description: 'Reyon ön yüz düzeni ve FIFO tarih kontrolü fotoğrafı sisteme aktarıldı.',
        status: 'PENDING',
        badgeText: 'Kanıt Yükle'
      }
    ];
  };

  const activeFieldTasks = getPositionFieldTasks(employeeData.position);

  const handleFileUploadMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTaskFile(file.name);
    }
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setShowTaskUploadModal(false);
      setTaskNotes('');
      setTaskFile(null);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#061B33] text-white flex flex-col font-sans">
      {/* Header Strip */}
      <div className="bg-[#0B2A4A] border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#087F96] flex items-center justify-center font-bold text-white shadow-md">
              <UserCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">{employeeData.name} • Çalışan Portalı</h1>
              <p className="text-xs text-gray-300">{employeeData.position} | {employeeData.store}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/" className="text-xs text-gray-400 hover:text-white px-2 py-1">
              Ana Siteye Dön
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* 12 NAV TAB SIDEBAR */}
        <div className="lg:col-span-1 space-y-1 bg-[#0B2A4A] p-3 rounded-2xl border border-white/10 h-fit">
          <div className="px-3 py-2 text-[10px] font-black text-[#087F96] uppercase tracking-wider">
            Çalışan Navigasyonu
          </div>

          <button
            onClick={() => setActiveTab('home')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'home' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <UserCheck className="h-4 w-4" />
            <span>Ana Sayfam</span>
          </button>

          {/* KARİYER PUSULAM HIGHLIGHT TAB */}
          <button
            onClick={() => setActiveTab('compass')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
              activeTab === 'compass'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 border-amber-400 shadow-lg'
                : 'bg-amber-500/10 text-amber-300 border-amber-400/30 hover:bg-amber-500/20'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Compass className="h-4 w-4" />
              <span>Kariyer Pusulam</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950/40 text-amber-300 font-mono">YENİ</span>
          </button>

          {/* KARİYER ROTAMI KEŞFET HIGHLIGHT TAB */}
          <button
            onClick={() => setActiveTab('orientation')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
              activeTab === 'orientation'
                ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 border-emerald-400 shadow-lg'
                : 'bg-emerald-500/10 text-emerald-300 border-emerald-400/30 hover:bg-emerald-500/20'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Compass className="h-4 w-4 text-emerald-300" />
              <span>Kariyer Rotamı Keşfet</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950/40 text-emerald-300 font-mono font-bold">TEST</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'courses' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Eğitimlerim</span>
          </button>

          <button
            onClick={() => setActiveTab('competencies')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'competencies' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Yetkinliklerim</span>
          </button>

          {/* SWOT ANALIZIM MENU TAB */}
          <button
            onClick={() => setActiveTab('swot')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'swot' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            <span>SWOT Analizim</span>
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'tasks' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Saha Görevlerim</span>
          </button>

          <button
            onClick={() => setActiveTab('mentor')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'mentor' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <Users className="h-4 w-4 text-amber-300" />
            <span>Koçum / Mentorum</span>
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'feedback' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Geri Bildirimlerim</span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'achievements' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>Başarılarım</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'certificates' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <Award className="h-4 w-4" />
            <span>Sertifikalarım</span>
          </button>

          <button
            onClick={() => setActiveTab('interviews')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'interviews' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <Calendar className="h-4 w-4 text-cyan-300" />
            <span>Kariyer Görüşmelerim</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'profile' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <User className="h-4 w-4" />
            <span>Profilim</span>
          </button>
        </div>

        {/* MAIN DASHBOARD CONTENT AREA */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* TAB: KARİYER PUSULAM */}
          {activeTab === 'compass' && (
            <CareerCompassMain
              userId={undefined}
              selectedGoal={selectedGoal}
              goalType={goalType}
              onOpenGoalModal={() => setShowGoalModal(true)}
              onSelectGoal={(goal, type) => {
                setSelectedGoal(goal);
                setGoalType(type);
              }}
            />
          )}

          {/* TAB: KARİYER ROTAMI KEŞFET (YÖNELİM TESTİ) */}
          {activeTab === 'orientation' && (
            <CareerOrientationTestModule
              userId="calisan_demo_user"
              userTitle={employeeData.position}
              onNavigateToPlan={() => setActiveTab('compass')}
              onNavigateToReadiness={() => setActiveTab('competencies')}
            />
          )}

          {/* TAB: KOÇUM / MENTORUM */}
          {activeTab === 'mentor' && <MentorshipSection userId={undefined} />}

          {/* TAB: KARİYER GÖRÜŞMELERİM */}
          {activeTab === 'interviews' && <CareerInterviewsSection />}
          
          {/* TAB 1: ANA SAYFAM */}
          {activeTab === 'home' && (
            <div className="space-y-6">
              
              {/* TOP SUMMARY STAT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Score Card with Explainable Popup trigger */}
                <div
                  onClick={() => setShowScoreModal(true)}
                  className="bg-[#0B2A4A] p-4 rounded-2xl border border-emerald-500/40 hover:border-emerald-400 cursor-pointer transition-all space-y-1 shadow-md group"
                >
                  <div className="flex justify-between items-center text-xs text-gray-300">
                    <span className="font-bold">Terfi Hazırlık Skoru</span>
                    <HelpCircle className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-3xl font-black text-emerald-400">%{employeeData.promotionScore}</div>
                  <div className="text-[10px] text-emerald-300 font-semibold">Tıkla & Hesaplama Bileşenlerini Gör</div>
                </div>

                <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-amber-400/30 space-y-1 shadow-md">
                  <div className="text-xs text-gray-300 font-bold flex items-center justify-between">
                    <span>Nihai Kariyer Hedefim</span>
                    <span className="text-[10px] text-amber-300 font-mono font-bold">🎯 Aktif Hedef</span>
                  </div>
                  <div className="text-sm font-black text-amber-300 truncate">{selectedGoal}</div>
                  <div className="text-[10px] text-gray-300 font-medium">Sıradaki Terfi: <strong className="text-white">{employeeData.nextPosition}</strong></div>
                </div>

                <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10 space-y-1">
                  <div className="text-xs text-gray-300 font-bold">Eğitim Tamamlama</div>
                  <div className="text-3xl font-black text-cyan-400">%78.5</div>
                  <div className="text-[10px] text-gray-400">12 / 15 Modül Tamamlandı</div>
                </div>

                <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10 space-y-1">
                  <div className="text-xs text-gray-300 font-bold">Yaklaşan Sınav / Görüşme</div>
                  <div className="text-sm font-black text-rose-300">18 Ağustos 2026</div>
                  <div className="text-[10px] text-gray-400">Stok Sınavı & Mentor Görüşmesi</div>
                </div>
              </div>

              {/* ACTIVE COURSE: DEVAM EDİLMESİ GEREKEN EĞİTİM */}
              <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Play className="h-5 w-5 text-emerald-400 fill-emerald-400" />
                    <h3 className="text-base font-bold text-white">Devam Edilen Eğitim</h3>
                  </div>
                  <span className="text-xs font-bold text-cyan-300">İlerleme: %{employeeData.currentCourse.progress}</span>
                </div>

                <div className="p-4 bg-[#061B33] rounded-xl border border-white/10 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-white">{employeeData.currentCourse.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">Son Ders: {employeeData.currentCourse.lastLesson}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg text-[10px] font-bold">
                      ZORUNLU EĞİTİM
                    </span>
                  </div>

                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${employeeData.currentCourse.progress}%` }} />
                  </div>

                  <div className="flex justify-end pt-1">
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-md">
                      <Play className="h-3.5 w-3.5 fill-white" />
                      <span>Kaldığım Yerden Devam Et</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* TASKS & FIELD TASKS WITH UPLOAD SUPPORT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-white">Bu Haftaki Görevlerim & Hedeflerim</h3>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">3 Görev</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 bg-[#061B33] rounded-xl border border-white/5 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>Reyon Fiyat Etiketi Kontrolü</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold">Tamamlandı</span>
                    </div>

                    <div className="p-3 bg-[#061B33] rounded-xl border border-white/5 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-amber-400" />
                        <span>Kasa Sonu Z-Raporu ve Sayım Görseli</span>
                      </div>
                      <button
                        onClick={() => setShowTaskUploadModal(true)}
                        className="px-2.5 py-1 bg-[#087F96] hover:bg-[#056B80] text-white text-[10px] font-bold rounded-lg flex items-center space-x-1"
                      >
                        <Upload className="h-3 w-3" />
                        <span>Kanıt Yükle</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white">Eksik Yetkinlikler & Gelişim İhtiyacı</h3>
                  <div className="space-y-2 text-xs">
                    {employeeData.missingCompetencies.map((comp, idx) => (
                      <div key={idx} className="p-3 bg-[#061B33] rounded-xl border border-rose-500/30 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-rose-400" />
                          <span>{comp}</span>
                        </div>
                        <span className="text-[10px] text-rose-300 font-bold">Önerilen Eğitim Atandı</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EĞİTİMLERİM & TÜM 15 MODÜL KATALOĞU */}
          {activeTab === 'courses' && (
            <EmployeeCoursesFullCatalog
              selectedGoal={selectedGoal}
              goalType={goalType}
            />
          )}

          {/* TAB 4: YETKİNLİKLERİM & RADAR SERTİFİKASYON */}
          {activeTab === 'competencies' && (
            <div className="bg-[#0B2A4A] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white flex items-center space-x-2">
                    <Layers className="w-6 h-6 text-amber-400" />
                    <span>Bireysel Yetkinlik Pasaportum &amp; Yetki Seviyeleri</span>
                  </h2>
                  <p className="text-xs text-gray-300">6 Yetkinlik boyutunda 1-5 seviye değerlendirmeleriniz.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#061B33] rounded-2xl border border-emerald-500/40 space-y-3">
                  <div className="flex justify-between font-bold text-white">
                    <span>Kasa Operasyonu &amp; Gün Sonu</span>
                    <span className="text-emerald-400 font-mono">Seviye 4 / 5 (Usta)</span>
                  </div>
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: '80%' }} />
                  </div>
                  <p className="text-[11px] text-gray-300">Kasa nakit mutabakatı ve Z-raporu kalibrasyonunda usta seviyede.</p>
                </div>

                <div className="p-4 bg-[#061B33] rounded-2xl border border-cyan-500/40 space-y-3">
                  <div className="flex justify-between font-bold text-white">
                    <span>Müşteri Deneyimi &amp; Şikayet Çözümü</span>
                    <span className="text-cyan-400 font-mono">Seviye 4 / 5 (İleri)</span>
                  </div>
                  <div className="w-full bg-white/15 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: '80%' }} />
                  </div>
                  <p className="text-[11px] text-gray-300">Zor müşteri iletişiminde kriz çözme ve memnuniyet odaklı.</p>
                </div>

                <div className="p-4 bg-[#061B33] rounded-2xl border border-amber-400/40 space-y-3">
                  <div className="flex justify-between font-bold text-white">
                    <span>Stok, Envanter &amp; Fire Önleme</span>
                    <span className="text-amber-400 font-mono">Seviye 2 / 5 (Gelişim Fırsatı)</span>
                  </div>
                  <div className="w-full bg-white/15 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: '40%' }} />
                  </div>
                  <p className="text-[11px] text-gray-300">Stok devir hızı hesabı ve emniyet stoku modülü devam ediyor.</p>
                </div>

                <div className="p-4 bg-[#061B33] rounded-2xl border border-purple-500/40 space-y-3">
                  <div className="flex justify-between font-bold text-white">
                    <span>Vardiya &amp; İş Gücü Planlaması</span>
                    <span className="text-purple-400 font-mono">Seviye 3 / 5 (Bağımsız)</span>
                  </div>
                  <div className="w-full bg-white/15 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full rounded-full" style={{ width: '60%' }} />
                  </div>
                  <p className="text-[11px] text-gray-300">Yoğunluk saatlerine göre haftalık personel vardiyası hazırlayabiliyor.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4.5: KIŞISEL SWOT ANALIZIM */}
          {activeTab === 'swot' && (
            <PersonalSwotWidget selectedGoal={selectedGoal} />
          )}

          {/* TAB 5: SAHA GÖREVLERİM & KANIT YÜKLEME */}
          {activeTab === 'tasks' && (
            <div className="bg-[#0B2A4A] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white flex items-center space-x-2">
                    <CheckCircle2 className="w-6 h-6 text-amber-400" />
                    <span>Saha Görevlerim ve Mağaza Uygulamaları</span>
                  </h2>
                  <p className="text-xs text-gray-300">Mağazada bizzat uygulayıp fotoğraflı kanıt yüklediğiniz görevler.</p>
                </div>
                <button
                  onClick={() => setShowTaskUploadModal(true)}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl flex items-center space-x-1.5 shadow-md cursor-pointer transition-all"
                >
                  <Upload className="h-4 w-4" />
                  <span>Saha Görevi Kanıtı Yükle</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                {activeFieldTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 bg-[#061B33] rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      task.status === 'COMPLETED'
                        ? 'border-emerald-500/30'
                        : 'border-amber-400/30'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-extrabold text-white text-sm flex items-center space-x-2">
                        <span>{task.title}</span>
                      </div>
                      <div className="text-gray-300 text-xs">{task.description}</div>
                    </div>

                    {task.status === 'COMPLETED' ? (
                      <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-lg border border-emerald-500/30 shrink-0 self-start sm:self-auto">
                        {task.badgeText}
                      </span>
                    ) : (
                      <button
                        onClick={() => setShowTaskUploadModal(true)}
                        className="px-3.5 py-2 bg-[#087F96] hover:bg-[#056B80] text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 cursor-pointer shrink-0 shadow-sm self-start sm:self-auto transition-all"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        <span>Kanıt Yükle</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: GERİ BİLDİRİMLERİM */}
          {activeTab === 'feedback' && (
            <div className="bg-[#0B2A4A] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white flex items-center space-x-2">
                    <MessageSquare className="w-6 h-6 text-amber-400" />
                    <span>Geri Bildirimlerim &amp; Yönetici Notları</span>
                  </h2>
                  <p className="text-xs text-gray-300">Mağaza müdürünüz ve İK tarafından gelişiminize dair verilen resmi notlar.</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 bg-[#061B33] rounded-2xl border border-emerald-500/30 space-y-2">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-emerald-400">Mustafa Eymen Kılıç (Mağaza Müdürü Notu)</span>
                    <span className="text-gray-400 font-mono text-[10px]">10 Ağustos 2026</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed font-sans">
                    "Kasa hattındaki yüksek verimliliği ve müşteri şikayetlerindeki yapıcı yaklaşımı nedeniyle Mağaza Müdür Yardımcılığı havuzuna önerilmiştir. Stok yönetimi modülünü tamamlaması bekleniyor."
                  </p>
                </div>

                <div className="p-4 bg-[#061B33] rounded-2xl border border-cyan-500/30 space-y-2">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-cyan-400">Zeynep Karahan (Bölge İK Direktörü Notu)</span>
                    <span className="text-gray-400 font-mono text-[10px]">15 Temmuz 2026</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed font-sans">
                    "Müşteri memnuniyet anketi sonuçları 4.9/5 ile Kadıköy şubesi birincisi. Terfi süreci başarıyla devam ediyor."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: BAŞARILARIM & ROZETLER */}
          {activeTab === 'achievements' && (
            <div className="bg-[#0B2A4A] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white flex items-center space-x-2">
                    <Sparkles className="w-6 h-6 text-amber-400" />
                    <span>Başarılarım, Rozetlerim &amp; Bölge Sıralamam</span>
                  </h2>
                  <p className="text-xs text-gray-300">PKA Akademi sürecinde kazandığınız başarı rozetleri ve puanlarınız.</p>
                </div>
                <span className="px-3 py-1.5 bg-amber-400/20 text-amber-300 rounded-full font-mono text-xs font-bold border border-amber-400/40">
                  🏆 Marmara Bölgesi 3. Sıra
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-[#061B33] rounded-2xl border border-amber-400/40 space-y-2 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center font-black text-2xl mx-auto">
                    ⭐
                  </div>
                  <h3 className="font-extrabold text-white text-sm">Kasa Mükemmellik Rozeti</h3>
                  <p className="text-gray-300 text-[11px]">Kasa hattında 500+ sıfır hata işlemi tamamlama başarısı.</p>
                </div>

                <div className="p-4 bg-[#061B33] rounded-2xl border border-emerald-500/40 space-y-2 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-black text-2xl mx-auto">
                    🥬
                  </div>
                  <h3 className="font-extrabold text-white text-sm">Taze Gıda Koruyucusu</h3>
                  <p className="text-gray-300 text-[11px]">Reyon fire oranını 3 ay üst üste %2.5 altında tutma rozeti.</p>
                </div>

                <div className="p-4 bg-[#061B33] rounded-2xl border border-cyan-400/40 space-y-2 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center font-black text-2xl mx-auto">
                    📚
                  </div>
                  <h3 className="font-extrabold text-white text-sm">Hızlı Öğrenen Lider</h3>
                  <p className="text-gray-300 text-[11px]">LMS platformunda 12 modülü dereceyle bitirme rozeti.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: SERTİFİKALARIM & QR DOĞRULAMA */}
          {activeTab === 'certificates' && (
            <div className="bg-[#0B2A4A] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white flex items-center space-x-2">
                    <Award className="w-6 h-6 text-amber-400" />
                    <span>QR Doğrulamalı Sertifikalarım</span>
                  </h2>
                  <p className="text-xs text-gray-300">Resmi kurumsal ve bireysel PKA sertifikalarınız.</p>
                </div>
              </div>

              <div className="p-6 bg-[#061B33] rounded-2xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-500/30">
                    RESMİ PKA SERTİFİKASI
                  </span>
                  <h3 className="text-base font-bold text-white">Temel Perakende ve Kasa Operasyonları Uzmanlığı</h3>
                  <p className="text-xs text-gray-400">Veriliş Tarihi: 12 Mayıs 2026 • Doğrulama Kodu: PKA-2026-8842</p>
                </div>

                <div className="p-3 bg-white text-slate-950 rounded-xl flex items-center space-x-2 shrink-0">
                  <QrCode className="h-10 w-10 text-[#0B2A4A]" />
                  <div className="text-[10px] font-mono font-bold">
                    <div>QR DOĞRULAMALI</div>
                    <div className="text-[#087F96]">VERIFIED</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: PROFİLİM */}
          {activeTab === 'profile' && (
            <div className="bg-[#0B2A4A] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-xs shadow-xl">
              <h2 className="text-xl font-extrabold text-white flex items-center space-x-2">
                <User className="w-6 h-6 text-amber-400" />
                <span>Kişisel ve Kurumsal Profil Bilgilerim</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#061B33] p-6 rounded-2xl border border-white/10">
                <div className="space-y-3 text-gray-300">
                  <div><strong className="text-white">Ad Soyad:</strong> {employeeData.name}</div>
                  <div><strong className="text-white">Unvan:</strong> {employeeData.position}</div>
                  <div><strong className="text-white">E-posta:</strong> ahmet@sayarmarket.com</div>
                  <div><strong className="text-white">Telefon:</strong> +90 532 555 0199</div>
                </div>
                <div className="space-y-3 text-gray-300">
                  <div><strong className="text-white">Mağaza / Şube:</strong> {employeeData.store}</div>
                  <div><strong className="text-white">Şirket Kıdemi:</strong> 2 Yıl 4 Ay</div>
                  <div><strong className="text-white">Terfi Hazırlık Skoru:</strong> %{employeeData.promotionScore}</div>
                  <div><strong className="text-white">Hesap Durumu:</strong> Active Employee (PKA Verified)</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: AÇIKLANABİLİR TERFİ HAZIRLIK SKORU MODAL'I */}
      {showScoreModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B2A4A] border border-emerald-500/40 rounded-3xl p-6 max-w-lg w-full space-y-5 text-white shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-emerald-400" />
                <h3 className="text-base font-bold">Açıklanabilir Terfi Hazırlık Skoru</h3>
              </div>
              <button onClick={() => setShowScoreModal(false)} className="text-gray-400 font-bold hover:text-white">✕</button>
            </div>

            <div className="p-4 bg-[#061B33] rounded-2xl border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400">Toplam Hazırlık Skoru</span>
                <div className="text-3xl font-black text-emerald-400">%{employeeData.promotionScore}</div>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-extrabold rounded-xl border border-emerald-500/30">
                TERFİYE HAZIR
              </span>
            </div>

            {/* Explanatory Breakdown Table */}
            <div className="space-y-3 text-xs">
              <span className="font-bold text-gray-300 block">Skor Hesaplama Bileşenleri & Kurumsal Ağırlıklar:</span>

              <div className="space-y-2">
                <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Eğitim Tamamlama Oranı</div>
                    <div className="text-[10px] text-gray-400">Ağırlık: %20 • Puan: {employeeData.scoreComponents.training.score}/100</div>
                  </div>
                  <span className="font-mono font-bold text-emerald-300">+{employeeData.scoreComponents.training.weighted} Puan</span>
                </div>

                <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Sınav Başarı Puanı</div>
                    <div className="text-[10px] text-gray-400">Ağırlık: %20 • Puan: {employeeData.scoreComponents.exam.score}/100</div>
                  </div>
                  <span className="font-mono font-bold text-emerald-300">+{employeeData.scoreComponents.exam.weighted} Puan</span>
                </div>

                <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Saha Görevi Değerlendirmesi</div>
                    <div className="text-[10px] text-gray-400">Ağırlık: %25 • Puan: {employeeData.scoreComponents.fieldTask.score}/100</div>
                  </div>
                  <span className="font-mono font-bold text-emerald-300">+{employeeData.scoreComponents.fieldTask.weighted} Puan</span>
                </div>

                <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Performans / Saha KPI Tutması</div>
                    <div className="text-[10px] text-gray-400">Ağırlık: %25 • Puan: {employeeData.scoreComponents.kpi.score}/100</div>
                  </div>
                  <span className="font-mono font-bold text-emerald-300">+{employeeData.scoreComponents.kpi.weighted} Puan</span>
                </div>

                <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Davranışsal Yetkinlik Değerlendirmesi</div>
                    <div className="text-[10px] text-gray-400">Ağırlık: %10 • Puan: {employeeData.scoreComponents.behavioral.score}/100</div>
                  </div>
                  <span className="font-mono font-bold text-emerald-300">+{employeeData.scoreComponents.behavioral.weighted} Puan</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-900/30 border border-blue-500/30 rounded-xl text-[11px] text-blue-200">
              * Bu ağırlıklar kurum yöneticileri tarafından yapılandırılabilir. Terfi önerisi insan onayı gerektirir.
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SAHA GÖREVİ KANIT / FOTOĞRAF YÜKLEME */}
      {showTaskUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B2A4A] border border-white/20 rounded-3xl p-6 max-w-md w-full space-y-4 text-white">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-base font-bold">Saha Görevi Kanıtı Yükle</h3>
              <button onClick={() => setShowTaskUploadModal(false)} className="text-gray-400 font-bold">✕</button>
            </div>

            {uploadSuccess ? (
              <div className="p-6 text-center space-y-3 bg-emerald-900/40 border border-emerald-500/50 rounded-2xl text-emerald-300">
                <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                <div className="font-bold text-sm">Kanıt Yöneticinize Gönderildi!</div>
                <div className="text-xs text-gray-300">Yönetici onayından sonra terfi skorunuz güncellenecektir.</div>
              </div>
            ) : (
              <form onSubmit={handleTaskSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Açıklama / Görev Notu *</label>
                  <textarea
                    required
                    rows={3}
                    value={taskNotes}
                    onChange={(e) => setTaskNotes(e.target.value)}
                    placeholder="Örn: 45 ürün etiket kontrolü yapıldı, fiyatlar kasayla birebir uyumlu."
                    className="w-full p-3 bg-[#061B33] border border-white/15 rounded-xl text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Fotoğraf veya Belge Yükle (PDF / JPG / PNG)</label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUploadMock}
                    className="w-full p-2.5 bg-[#061B33] border border-white/15 rounded-xl text-xs text-gray-300"
                  />
                  {taskFile && <div className="text-[11px] text-emerald-300 mt-1 font-bold">Seçilen Dosya: {taskFile}</div>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl shadow-md"
                >
                  Kanıtı Yöneticime Gönder
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: KARİYER HEDEFİ SEÇİCİ & YOL HARİTASI ASİSTANI */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0B2A4A] border border-amber-400/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-amber-400 text-slate-950 font-black text-xl shadow-md">
                  🧭
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">Kariyer Hedefi Belirleme Rehberi</h3>
                  <p className="text-[11px] text-amber-300">Gelişim yol haritanızı oluşturmak için hedef pozisyonunuzu seçin.</p>
                </div>
              </div>
              <button
                onClick={() => setShowGoalModal(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1.5">Kariyer Rota Türü</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGoalType('VERTICAL')}
                    className={`py-2.5 px-3 rounded-xl font-bold border transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                      goalType === 'VERTICAL' ? 'bg-[#087F96] text-white border-[#087F96] shadow-md' : 'bg-[#061B33] border-white/10 text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <span>👑 Dikey Terfi Rotası</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGoalType('HORIZONTAL')}
                    className={`py-2.5 px-3 rounded-xl font-bold border transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                      goalType === 'HORIZONTAL' ? 'bg-purple-600 text-white border-purple-600 shadow-md' : 'bg-[#061B33] border-white/10 text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <span>🔄 Yatay Geçiş Rotası</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1.5">
                  Hedef Pozisyon Seçin ({goalType === 'VERTICAL' ? 'Dikey Terfi Hiyerarşisi' : 'Yatay Kariyer Geçiş Departmanları'})
                </label>
                <select
                  value={selectedGoal}
                  onChange={(e) => setSelectedGoal(e.target.value)}
                  className="w-full p-3 bg-[#061B33] border border-amber-400/50 rounded-xl text-white font-extrabold focus:outline-none focus:border-amber-400 text-xs shadow-inner cursor-pointer"
                >
                  {goalType === 'VERTICAL' ? (
                    <optgroup label="👑 DİKEY TERFİ HİYERARŞİSİ (1-8 SEVİYE)">
                      <option value="Takım Lideri">Level 2: Mağaza Takım Lideri / Kıdemli Satış Danışmanı (3 Ay)</option>
                      <option value="Mağaza Müdür Yardımcısı">Level 3: Mağaza Müdür Yardımcısı (Sıradaki Hedef - 3.5 Ay)</option>
                      <option value="Mağaza Müdürü">Level 4: Mağaza Müdürü (P&amp;L ve Şube Yönetimi - 1.5-2 Yıl)</option>
                      <option value="Bölge Müdürü">Level 5: Bölge / Saha Müdürü (Çoklu Mağaza Yönetimi - 3-4 Yıl)</option>
                      <option value="Perakende Operasyon Direktörü">Level 6: Perakende Operasyon Direktörü (5-7 Yıl)</option>
                      <option value="Genel Müdür Yardımcısı (COO)">Level 7: Genel Müdür Yardımcısı - COO (8-10 Yıl)</option>
                      <option value="CEO / Genel Müdür">Level 8: CEO / Genel Müdür (Kurumsal Zirve - 10-12 Yıl)</option>
                    </optgroup>
                  ) : (
                    <optgroup label="🔄 YATAY KARİYER GEÇİŞ DEPARTMANLARI">
                      <option value="Taze Gıda Şef / Yöneticisi">Taze Gıda Kategori Şefi &amp; Uzmanı (Saha Uzmanlık)</option>
                      <option value="Satın Alma Uzmanı">Satın Alma &amp; Tedarikçi Yönetimi Uzmanı (Genel Merkez)</option>
                      <option value="Kategori Yöneticisi">Kategori Yöneticisi (Genel Merkez)</option>
                      <option value="Tedarik Zinciri & Lojistik Uzmanı">Tedarik Zinciri &amp; Depo Operasyon Uzmanı</option>
                      <option value="İç Eğitmen / İK Uzmanı">İç Eğitmen &amp; Yetenek Gelişim Uzmanı (İK)</option>
                      <option value="E-Ticaret & Dijital Perakende Yöneticisi">E-Ticaret &amp; Hızlı Teslimat Yöneticisi (Dijital)</option>
                      <option value="Görsel Mağazacılık & Merchandiser">Görsel Mağazacılık (Merchandiser / Display)</option>
                      <option value="Perakende Risk & Kayıp Önleme Uzmanı">Kayıp Önleme &amp; İç Denetim Uzmanı</option>
                    </optgroup>
                  )}
                </select>
              </div>

              {/* DYNAMIC ROADMAP PREVIEW CARD */}
              <div className="p-4 bg-[#061B33] rounded-2xl border border-amber-400/30 space-y-2.5 shadow-md">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center space-x-2 text-amber-300 font-bold">
                    <Target className="w-4 h-4 text-amber-400" />
                    <span>🎯 Seçilen Hedef: {selectedGoal}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                    Akademi Müfredatı Uyumlu ✅
                  </span>
                </div>
                <p className="text-[11px] text-gray-300">
                  Seçtiğiniz <strong>"{selectedGoal}"</strong> hedefi için gelişim haritanız, zorunlu perakende modülleri, takvimli eğitimler ve terfi skor kartınız otomatik olarak güncellenecektir.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowGoalModal(false);
                  setActiveTab('compass');
                }}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black rounded-2xl shadow-lg transition-all cursor-pointer text-xs flex items-center justify-center space-x-2"
              >
                <Compass className="w-4 h-4" />
                <span>🎯 Kariyer Hedefimi Kaydet &amp; Yol Haritasını Başlat</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
