'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Play,
  Award,
  Search,
  Filter,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  LayoutList,
  LayoutGrid,
  Check,
  ChevronDown,
  ChevronUp,
  Target,
  History,
  Zap,
  Calendar,
  AlertTriangle,
  UserCheck,
  X,
  FileText,
  Video,
  CheckSquare
} from 'lucide-react';
import { getCourseImage } from '@/data/courseImages';

interface EmployeeCoursesFullCatalogProps {
  selectedGoal?: string;
  goalType?: 'VERTICAL' | 'HORIZONTAL';
}

export default function EmployeeCoursesFullCatalog({
  selectedGoal = 'Mağaza Müdürü',
  goalType = 'VERTICAL'
}: EmployeeCoursesFullCatalogProps) {
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PREVIOUS_POS' | 'CURRENT_POS' | 'TARGET_POS'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'LIST' | 'GRID'>('LIST');

  // Section collapse states - Closed by default as requested by user
  const [showPrevPos, setShowPrevPos] = useState(false);
  const [showCurrPos, setShowCurrPos] = useState(false);
  const [showTargetPos, setShowTargetPos] = useState(false);
  const [openSubAccordions, setOpenSubAccordions] = useState<{ [key: string]: boolean }>({});

  const toggleSubAccordion = (key: string) => {
    setOpenSubAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Active position sync from Admin panel
  const [activeEmpPos, setActiveEmpPos] = useState<string>('Kasiyer & Reyon Çalışanı');

  React.useEffect(() => {
    const syncPos = () => {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('pka_active_position') : null;
      if (saved) setActiveEmpPos(saved);
    };
    syncPos();
    window.addEventListener('pka_position_updated', syncPos);
    window.addEventListener('storage', syncPos);
    return () => {
      window.removeEventListener('pka_position_updated', syncPos);
      window.removeEventListener('storage', syncPos);
    };
  }, []);

  const resolveLevelFromPositionName = (posName: string) => {
    const p = posName.toLowerCase();
    if (p.includes('ceo') || (p.includes('genel müdür') && !p.includes('yardımcısı') && !p.includes('yrd'))) return 8;
    if (p.includes('coo') || p.includes('cmo') || p.includes('genel müdür yrd') || p.includes('genel müdür yardımcısı')) return 7;
    if (p.includes('direktör') || p.includes('direktor')) return 6;
    if (p.includes('bölge') || p.includes('saha müdürü')) return 5;
    if (p.includes('mağaza müdürü') && !p.includes('yardımcısı') && !p.includes('yrd')) return 4;
    if (p.includes('müdür yardımcısı') || p.includes('müdür yrd')) return 3;
    if (p.includes('takım lideri')) return 2;
    return 1;
  };

  const activeLevel = resolveLevelFromPositionName(activeEmpPos);

  // Active course modal for interactive playback/viewing
  const [activeModalCourse, setActiveModalCourse] = useState<any | null>(null);

  // 1. ÖNCEKİ POZİSYONLARDA ALINAN EĞİTİMLER (Level 1 & Level 2 - Tamamlanan Geçmiş Modüller)
  const previousPositionCourses = [
    {
      id: 1,
      title: '1. Temel Perakende & POS Sistemleri Kullanımı',
      positionLevel: 'Level 1: Kasiyer & Reyon',
      category: 'ZORUNLU OPERASYON',
      description: 'Kasa işlemleri, barkod okuma, POS terminal kullanımı ve nakit mutabakatı.',
      progress: 100,
      score: 95,
      status: 'COMPLETED',
      certCode: 'PKA-2026-8801',
      lastLesson: 'Ders 8: POS Kapanışı',
      scheduleDate: 'Ocak 2025 (Tamamlandı)',
      isOverdue: false,
      instructor: 'Hakan Kaya (POS & Kasa Sistemleri Kıdemli Eğitmeni)'
    },
    {
      id: 2,
      title: '2. Müşteri İletişimi & Kasa Hattı Standartları',
      positionLevel: 'Level 1: Kasiyer & Reyon',
      category: 'ZORUNLU HİZMET',
      description: 'Müşteri karşılama, sepet büyütme ve pozitif kasa hattı deneyimi.',
      progress: 100,
      score: 92,
      status: 'COMPLETED',
      certCode: 'PKA-2026-8802',
      lastLesson: 'Ders 6: Güler Yüzlü İletişim',
      scheduleDate: 'Şubat 2025 (Tamamlandı)',
      isOverdue: false,
      instructor: 'Ayşe Demir (Müşteri Deneyimi & İletişim Uzmanı)'
    },
    {
      id: 3,
      title: '3. Gıda Güvenliği & Hijyen Standartları',
      positionLevel: 'Level 1: Kasiyer & Reyon',
      category: 'ZORUNLU HIJYEN',
      description: 'Soğuk zincir koruma, reyon hijyeni ve gıda muhafaza koşulları.',
      progress: 100,
      score: 98,
      status: 'COMPLETED',
      certCode: 'PKA-2026-8803',
      lastLesson: 'Ders 5: Soğuk Hava Deposu',
      scheduleDate: 'Mart 2025 (Tamamlandı)',
      isOverdue: false,
      instructor: 'Doç. Dr. Selin Yılmaz (Gıda Güvenliği Baş Eğitmeni)'
    },
    {
      id: 4,
      title: '4. Reyon İçi Teşhir & Barkod Kontrolü',
      positionLevel: 'Level 1: Kasiyer & Reyon',
      category: 'ZORUNLU OPERASYON',
      description: 'Raf planogramı, FIFO kuralı, etiket eşleştirme ve barkod denetimi.',
      progress: 100,
      score: 90,
      status: 'COMPLETED',
      certCode: 'PKA-2026-8804',
      lastLesson: 'Ders 7: Raf Düzeni',
      scheduleDate: 'Nisan 2025 (Tamamlandı)',
      isOverdue: false,
      instructor: 'Mehmet Can (Görsel Mağazacılık & Planogram Uzmanı)'
    },
    {
      id: 5,
      title: '5. Fire Önleme & SKT Denetim Süreçleri',
      positionLevel: 'Level 1: Kasiyer & Reyon',
      category: 'ZORUNLU MALI',
      description: 'Son kullanma tarihi takibi, imha prosedürleri ve fire oranını azaltma.',
      progress: 100,
      score: 94,
      status: 'COMPLETED',
      certCode: 'PKA-2026-8805',
      lastLesson: 'Ders 4: SKT Kontrolü',
      scheduleDate: 'Mayıs 2025 (Tamamlandı)',
      isOverdue: false,
      instructor: 'Caner Şahin (Stok & Envanter Yönetim Eğitmeni)'
    },
    {
      id: 6,
      title: '6. Kasa Sonu Z-Raporu & Teslimat Tutanağı',
      positionLevel: 'Level 2: Takım Lideri',
      category: 'ZORUNLU MALI',
      description: 'Gün sonu z-raporu alımı, kasa nakit teslimi ve nakit açığı engelleme.',
      progress: 100,
      score: 89,
      status: 'COMPLETED',
      certCode: 'PKA-2026-8806',
      lastLesson: 'Ders 6: Kasa Sayımı',
      scheduleDate: 'Haziran 2025 (Tamamlandı)',
      isOverdue: false,
      instructor: 'Hakan Kaya (POS & Kasa Sistemleri Kıdemli Eğitmeni)'
    },
    {
      id: 7,
      title: '7. Mağaza İçi Sevkiyat & Mal Kabul Prosedürleri',
      positionLevel: 'Level 2: Takım Lideri',
      category: 'ZORUNLU LOJISTIK',
      description: 'Kamyon mal kabulü, irsaliye kontrolü, palet sayımı ve depolama.',
      progress: 100,
      score: 91,
      status: 'COMPLETED',
      certCode: 'PKA-2026-8807',
      lastLesson: 'Ders 5: İrsaliye Eşleme',
      scheduleDate: 'Ağustos 2025 (Tamamlandı)',
      isOverdue: false,
      instructor: 'Ahmet Yıldırım (Tedarik Zinciri & Lojistik Direktörü)'
    },
    {
      id: 8,
      title: '8. Zor Müşteri Kriz Yönetimi',
      positionLevel: 'Level 2: Takım Lideri',
      category: 'YETKİNLİK',
      description: 'Kasa hattında şikayet yönetimi, sakinleştirme teknikleri ve çözüm üretme.',
      progress: 100,
      score: 93,
      status: 'COMPLETED',
      certCode: 'PKA-2026-8808',
      lastLesson: 'Ders 4: Kriz Çözümü',
      scheduleDate: 'Eylül 2025 (Tamamlandı)',
      isOverdue: false,
      instructor: 'Ayşe Demir (Müşteri Deneyimi & İletişim Uzmanı)'
    },
    {
      id: 9,
      title: '9. İş Sağlığı ve Güvenliği (İSG) Perakende Uygulamaları',
      positionLevel: 'Level 2: Takım Lideri',
      category: 'ZORUNLU MEVZUAT',
      description: 'Kayma/düşme önleme, ağır kaldırma teknikleri ve acil durum tahliyesi.',
      progress: 100,
      score: 96,
      status: 'COMPLETED',
      certCode: 'PKA-2026-8809',
      lastLesson: 'Ders 6: Acil Durum',
      scheduleDate: 'Ekim 2025 (Tamamlandı)',
      isOverdue: false,
      instructor: 'Selin Öztürk (İSG & Perakende Mevzuat Uzmanı)'
    },
    {
      id: 10,
      title: '10. Perakende Matematiği & İskonto Hesapları',
      positionLevel: 'Level 2: Takım Lideri',
      category: 'ZORUNLU MALI',
      description: 'KDV hesapları, indirim ve kampanya kodları, sepet ortalaması analizi.',
      progress: 100,
      score: 92,
      status: 'COMPLETED',
      certCode: 'PKA-2026-8810',
      lastLesson: 'Ders 5: İskonto Hesabı',
      scheduleDate: 'Kasım 2025 (Tamamlandı)',
      isOverdue: false,
      instructor: 'Dr. Mustafa Eymen (Perakende Operasyon & P&L Baş Uzmanı)'
    }
  ];

  // 2. MEVCUT POZİSYONDA ALINAN / ALINMASI GEREKEN EĞİTİMLER (Level 3: Mağaza Müdür Yardımcısı - Aktif Seviye)
  const currentPositionCourses = [
    {
      id: 11,
      title: '11. Müşteri Deneyimi & Sepet Büyütme Yetkinliği',
      positionLevel: 'Level 3: Mağaza Müdür Yrd.',
      category: 'YETKİNLİK',
      description: 'Çapraz satış, kasa önü stant satışı ve müşteri sadakat programları.',
      progress: 100,
      score: 94,
      status: 'COMPLETED',
      certCode: 'PKA-2026-8811',
      lastLesson: 'Ders 4: Çapraz Satış',
      scheduleDate: 'Mayıs 2026 (Tamamlandı)',
      isOverdue: false,
      instructor: 'Ayşe Demir (Müşteri Deneyimi & İletişim Uzmanı)'
    },
    {
      id: 12,
      title: '12. Vardiya & Personel İş Gücü Planlaması',
      positionLevel: 'Level 3: Mağaza Müdür Yrd.',
      category: 'LİDERLİK',
      description: 'Haftalık vardiya çizelgesi hazırlama, mola saatleri ve yoğunluk yönetimi.',
      progress: 100,
      score: 85,
      status: 'COMPLETED',
      certCode: 'PKA-2026-8812',
      lastLesson: 'Ders 5: Vardiya Çizelgesi',
      scheduleDate: 'Temmuz 2026 (Tamamlandı)',
      isOverdue: false,
      instructor: 'Dr. Mustafa Eymen (Perakende Operasyon & P&L Baş Uzmanı)'
    },
    {
      id: 13,
      title: '13. Mağaza İçi Stok, Sipariş ve Envanter Yönetimi',
      positionLevel: 'Level 3: Mağaza Müdür Yrd.',
      category: 'ZORUNLU TERFİ',
      description: 'Stok devir hızı, emniyet stoku hesabı, sipariş periyotları ve fire azaltma pratikleri.',
      progress: 68,
      score: 0,
      status: 'IN_PROGRESS',
      certCode: null,
      lastLesson: 'Modül 3: Emniyet Stoku Hesabı',
      scheduleDate: 'Eylül 2026 (Aktif Takvim)',
      isOverdue: false,
      instructor: 'Caner Şahin (Stok & Envanter Yönetim Eğitmeni)'
    },
    {
      id: 14,
      title: '14. Mağaza Açılış/Kapanış ve Kasa Ofis Yönetimi',
      positionLevel: 'Level 3: Mağaza Müdür Yrd.',
      category: 'ZORUNLU TERFİ',
      description: 'Mağaza müdür yardımcılığı hedefi için vardiya çizelgesi ve kasa ofisi kapanış prosedürleri.',
      progress: 35,
      score: 0,
      status: 'IN_PROGRESS',
      certCode: null,
      lastLesson: 'Modül 2: Kasa Ofis Kapanışı',
      scheduleDate: 'Ağustos 2026 (Hedeflenen Tarih)',
      isOverdue: true,
      delayDays: 12,
      instructor: 'Hakan Kaya (POS & Kasa Sistemleri Kıdemli Eğitmeni)'
    }
  ];

  // 3. GELECEK HEDEF POZİSYONA HAZIRLIK ZORUNLU EĞİTİMLERİ (Fully Enriched for selectedGoal)
  const targetPositionCourses = [
    {
      id: 15,
      title: `15. Ekip Motivasyonu ve Gelişimsel Geri Bildirim (${selectedGoal} Zorunlu Modülü)`,
      positionLevel: `Hedef Pozisyon: ${selectedGoal}`,
      category: 'ZORUNLU LİDERLİK',
      description: `Hedefiniz olan "${selectedGoal}" pozisyonuna hazırlanmak için atanmış yönetsel liderlik ve motivasyon gelişim modülü.`,
      progress: 0,
      score: 0,
      status: 'NOT_STARTED',
      certCode: null,
      lastLesson: 'Modül 1: Liderlik Yetkinlikleri',
      scheduleDate: 'Ekim 2026 (Planlandı)',
      isOverdue: false,
      instructor: 'Bülent Arslan (C-Suite Liderlik & CEO Koçu)'
    },
    {
      id: 16,
      title: `16. P&L Bütçe, Finansal Okuryazarlık ve Kar/Zarar Yönetimi (${selectedGoal} Zorunlu Modülü)`,
      positionLevel: `Hedef Pozisyon: ${selectedGoal}`,
      category: 'ZORUNLU FINANSAL',
      description: `Hedefiniz olan "${selectedGoal}" kadrosunda şube gelir-gider tablosu okuma, bütçe yapma ve net kar artırma modülü.`,
      progress: 0,
      score: 0,
      status: 'NOT_STARTED',
      certCode: null,
      lastLesson: 'Modül 1: P&L Tablosu Okuma',
      scheduleDate: 'Kasım 2026 (Planlandı)',
      isOverdue: false,
      instructor: 'Dr. Mustafa Eymen (P&L ve Perakende Baş Uzmanı)'
    },
    {
      id: 17,
      title: `17. Mağaza Performans KPI Yönetimi ve Hedef Tutturma (${selectedGoal} Zorunlu Modülü)`,
      positionLevel: `Hedef Pozisyon: ${selectedGoal}`,
      category: 'ZORUNLU PERFORMANS',
      description: `Mağaza ciro KPI'ları, sepet büyütme oranları ve şube verimlilik göstergelerini yönetme stratejileri.`,
      progress: 0,
      score: 0,
      status: 'NOT_STARTED',
      certCode: null,
      lastLesson: 'Modül 1: KPI Metrikleri',
      scheduleDate: 'Aralık 2026 (Planlandı)',
      isOverdue: false,
      instructor: 'Dr. Mustafa Eymen (P&L ve Perakende Baş Uzmanı)'
    },
    {
      id: 18,
      title: `18. İş Hukuku, Personel Özlük ve İş Güvenliği Mevzuatı (${selectedGoal} Zorunlu Modülü)`,
      positionLevel: `Hedef Pozisyon: ${selectedGoal}`,
      category: 'ZORUNLU MEVZUAT',
      description: `Yöneticilik kademesinde iş hukuku tutanakları, personel özlük dosyaları ve yasal İSG yükümlülükleri.`,
      progress: 0,
      score: 0,
      status: 'NOT_STARTED',
      certCode: null,
      lastLesson: 'Modül 1: İş Hukuku Esasları',
      scheduleDate: 'Ocak 2027 (Planlandı)',
      isOverdue: false,
      instructor: 'Selin Öztürk (İSG & Perakende Mevzuat Uzmanı)'
    }
  ];

  const filterCourseList = (list: any[]) => {
    return list.filter((c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredPrev = filterCourseList(previousPositionCourses);
  const filteredCurr = filterCourseList(currentPositionCourses);
  const filteredTarget = filterCourseList(targetPositionCourses);

  const totalCompleted = [...previousPositionCourses, ...currentPositionCourses].filter(c => c.status === 'COMPLETED').length;
  const totalCourses = previousPositionCourses.length + currentPositionCourses.length;

  const overdueCourses = [...previousPositionCourses, ...currentPositionCourses].filter(c => c.isOverdue);

  const renderCourseItem = (c: any) => {
    const isCompleted = c.status === 'COMPLETED';
    const isInProgress = c.status === 'IN_PROGRESS';
    const imageUrl = getCourseImage(c.title, c.category);

    if (viewMode === 'LIST') {
      return (
        <div
          key={c.id}
          className={`p-4 sm:p-5 bg-[#061B33] rounded-2xl border transition-all flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-lg ${
            c.isOverdue
              ? 'border-rose-500/50 bg-rose-500/10'
              : isCompleted
              ? 'border-emerald-500/30 hover:border-emerald-500/60'
              : isInProgress
              ? 'border-amber-400/40 hover:border-amber-400'
              : 'border-white/10 opacity-85 hover:opacity-100'
          }`}
        >
          <div className="flex items-start space-x-4 flex-1">
            <div className="w-24 h-16 rounded-xl overflow-hidden shrink-0 border border-white/15 relative bg-[#0B2A4A]">
              <img src={imageUrl} alt={c.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[9px] font-bold border border-blue-500/30">
                  {c.category}
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 font-mono text-[9px] font-bold border border-amber-400/20">
                  {c.positionLevel}
                </span>
                <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold flex items-center space-x-1 border ${
                  c.isOverdue ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-white/10 text-gray-300 border-white/15'
                }`}>
                  <Calendar className="w-3 h-3" />
                  <span>Takvim: {c.scheduleDate}</span>
                </span>
                {c.isOverdue && (
                  <span className="px-2 py-0.5 rounded bg-rose-500 text-white font-mono text-[9px] font-black animate-pulse flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>⚠️ GECİKTİ ({c.delayDays} GÜN)</span>
                  </span>
                )}
              </div>

              <h4 className="font-extrabold text-white text-xs sm:text-sm leading-snug">{c.title}</h4>
              <p className="text-xs text-gray-300 line-clamp-1">{c.description}</p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px]">
                <div className="flex items-center space-x-1.5 text-amber-300 font-bold bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>👨‍🏫 Eğitmen: <strong className="text-white">{c.instructor}</strong></span>
                </div>
                <span className="text-gray-400 font-mono">Son Ders: <strong className="text-gray-200">{c.lastLesson}</strong></span>
              </div>
            </div>
          </div>

          {/* Progress & Action */}
          <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
            <div className="w-28 text-right hidden sm:block">
              <div className="flex justify-between text-[10px] font-mono font-bold text-gray-300 mb-1">
                <span>İlerleme:</span>
                <span className={c.isOverdue ? 'text-rose-400' : isCompleted ? 'text-emerald-400' : 'text-amber-300'}>%{c.progress}</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${c.isOverdue ? 'bg-rose-400' : isCompleted ? 'bg-emerald-400' : 'bg-amber-400'}`}
                  style={{ width: `${c.progress}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setActiveModalCourse(c)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 cursor-pointer shadow-md transition-all ${
                c.isOverdue
                  ? 'bg-rose-500 hover:bg-rose-600 text-white font-black'
                  : isCompleted
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : isInProgress
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-black'
                  : 'bg-[#087F96] hover:bg-[#056B80] text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{c.isOverdue ? '🚨 Öncelikli Başlat' : isCompleted ? 'İncele' : isInProgress ? 'Kaldığım Yerden Devam Et' : 'Eğitime Başla'}</span>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        key={c.id}
        className={`p-5 bg-[#061B33] rounded-2xl border space-y-3 flex flex-col justify-between shadow-md transition-all ${
          c.isOverdue
            ? 'border-rose-500/50 bg-rose-500/10'
            : isCompleted
            ? 'border-emerald-500/30 hover:border-emerald-500/60'
            : isInProgress
            ? 'border-amber-400/40 hover:border-amber-400'
            : 'border-white/10 opacity-85 hover:opacity-100'
        }`}
      >
        <div className="space-y-3">
          <div className="w-full h-32 rounded-xl overflow-hidden border border-white/15 relative bg-[#0B2A4A]">
            <img src={imageUrl} alt={c.title} className="w-full h-full object-cover" />
            <div className="absolute top-2 left-2 z-10">
              <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-bold shadow-md ${
                c.isOverdue
                  ? 'bg-rose-500 text-white font-black'
                  : isCompleted
                  ? 'bg-emerald-500 text-slate-950 font-extrabold'
                  : isInProgress
                  ? 'bg-amber-400 text-slate-950 font-extrabold'
                  : 'bg-purple-600 text-white'
              }`}>
                {c.category}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-[9px] font-mono text-amber-300 font-bold">
              <span>{c.positionLevel}</span>
              <span className="text-gray-300">📅 {c.scheduleDate}</span>
            </div>
            <h3 className="text-sm font-extrabold text-white leading-snug">{c.title}</h3>
            <p className="text-xs text-gray-300 line-clamp-2 pt-1">{c.description}</p>
            <div className="text-[10px] text-amber-300 font-bold pt-1 flex items-center space-x-1">
              <UserCheck className="w-3 h-3 text-amber-400" />
              <span>👨‍🏫 {c.instructor}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-white/10">
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                c.isOverdue ? 'bg-rose-400' : isCompleted ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
              style={{ width: `${c.progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-gray-400 font-mono">
              {isCompleted ? `Sınav: ${c.score}/100` : c.lastLesson}
            </span>

            <button
              onClick={() => setActiveModalCourse(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center space-x-1 cursor-pointer transition-all ${
                c.isOverdue
                  ? 'bg-rose-500 hover:bg-rose-600 text-white font-black'
                  : isCompleted
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : isInProgress
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-black'
                  : 'bg-[#087F96] hover:bg-[#056B80] text-white'
              }`}
            >
              <Play className="w-3 h-3" />
              <span>{c.isOverdue ? '🚨 Başlat' : isCompleted ? 'İncele' : isInProgress ? 'Devam Et' : 'Başla'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 text-white">
      {/* HEADER BANNER */}
      <div className="p-6 sm:p-8 bg-[#0B2A4A] rounded-3xl border border-white/15 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-7 h-7 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Bireysel Eğitim Kataloğum &amp; Terfi Müfredatım
              </h2>
            </div>
            <p className="text-xs text-gray-300 mt-1">
              Geçmiş pozisyonlarınızda aldığınız tamamlanan dersler ({previousPositionCourses.length} Modül) ve mevcut Seviye {activeLevel} ({activeEmpPos}) pozisyonunuzda almanız gereken zorunlu ve aktif modüller ({currentPositionCourses.length} Modül).
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="p-3 bg-[#061B33] rounded-2xl border border-white/10 text-right font-mono text-xs">
              <span className="text-gray-400 block text-[10px]">Tamamlanan Ders Sayısı:</span>
              <strong className="text-emerald-400 text-sm font-black">{totalCompleted} / {totalCourses} Modül (%{Math.round((totalCompleted/totalCourses)*100)})</strong>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Modül adı, eğitmen ismi veya konu ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#061B33] border border-white/15 rounded-2xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 shrink-0 overflow-x-auto pb-1 sm:pb-0">
            {[
              { key: 'ALL', label: 'Tüm Müfredat' },
              { key: 'PREVIOUS_POS', label: 'Bugüne Kadar Alınanlar' },
              { key: 'CURRENT_POS', label: 'Mevcut Pozisyon Dersleri' }
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilterStatus(f.key as any)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  filterStatus === f.key
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                    : 'bg-[#061B33] text-gray-300 border border-white/10 hover:bg-white/10'
                }`}
              >
                {f.label}
              </button>
            ))}

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-1 bg-[#061B33] p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setViewMode('LIST')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'LIST' ? 'bg-amber-400 text-slate-950' : 'text-gray-400 hover:text-white'}`}
                title="Liste Görünümü"
              >
                <LayoutList className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('GRID')}
                className={`p-1.5 rounded-lg transition-all ${viewMode === 'GRID' ? 'bg-amber-400 text-slate-950' : 'text-gray-400 hover:text-white'}`}
                title="Izgara Görünümü"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* OVERDUE REPORT BANNER IF APPLICABLE */}
      {overdueCourses.length > 0 && (
        <div className="p-4 bg-rose-500/15 border border-rose-500/40 rounded-2xl flex items-center justify-between gap-3 text-xs shadow-md">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <h4 className="font-extrabold text-rose-300 text-xs">⚠️ Geciken Eğitmen &amp; Takvim Uyarısı ({overdueCourses.length} Modül)</h4>
              <p className="text-[11px] text-gray-300">
                "{overdueCourses[0].title}" modülü hedeflenen {overdueCourses[0].scheduleDate} takviminde gecikmededir. Lütfen terfi skorunuz etkilenmeden öncelikle tamamlayınız.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModalCourse(overdueCourses[0])}
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs rounded-xl shrink-0 shadow-md cursor-pointer"
          >
            🚨 Eğitimi Aç
          </button>
        </div>
      )}

      {/* SECTION 1: BUGÜNE KADAR ALINAN VE TAMAMLANAN EĞİTİMLER (GROUPED BY POSITION LEVEL) */}
      {(filterStatus === 'ALL' || filterStatus === 'PREVIOUS_POS') && (
        <div className="p-6 bg-[#0B2A4A] rounded-3xl border border-emerald-500/30 space-y-4 shadow-xl">
          <button
            onClick={() => setShowPrevPos(!showPrevPos)}
            className="w-full flex items-center justify-between border-b border-white/10 pb-4 text-left cursor-pointer hover:bg-white/5 p-2 rounded-2xl transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <History className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                  <span>🏆 BUGÜNE KADAR ALINAN VE TAMAMLANAN EĞİTİMLER</span>
                </h3>
                <p className="text-xs text-emerald-300">
                  Bugüne kadar başarıyla tamamlanan, sınavları geçilen ve sertifikalandırılan tüm modüller ({previousPositionCourses.length} Ders, Tümü Geçildi ✅).
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold rounded-full border border-emerald-500/30">
                {filteredPrev.length} Ders (Tümü Geçildi ✅)
              </span>
              {showPrevPos ? <ChevronUp className="w-5 h-5 text-gray-300" /> : <ChevronDown className="w-5 h-5 text-gray-300" />}
            </div>
          </button>

          {showPrevPos && (
            <div className="space-y-4 pt-2">
              {filteredPrev.length > 0 ? (
                Object.entries(
                  filteredPrev.reduce((acc: { [key: string]: typeof filteredPrev }, course) => {
                    const levelKey = course.positionLevel || 'Alınan Dersler';
                    if (!acc[levelKey]) acc[levelKey] = [];
                    acc[levelKey].push(course);
                    return acc;
                  }, {})
                ).map(([levelTitle, courses]) => {
                  const isSubOpen = openSubAccordions[levelTitle] === true; // Default false (kapalı)

                  return (
                    <div key={levelTitle} className="bg-[#061B33] rounded-2xl border border-white/10 overflow-hidden shadow-md">
                      {/* Sub-accordion Header Bar */}
                      <button
                        onClick={() => toggleSubAccordion(levelTitle)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-white/5 transition-all"
                      >
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-emerald-400" />
                          <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                            📍 {levelTitle} Kıdeminde Alınan Dersler
                          </h4>
                        </div>

                        <div className="flex items-center space-x-3 shrink-0">
                          <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                            {courses.length} Modül (Geçildi ✅)
                          </span>
                          {isSubOpen ? (
                            <ChevronUp className="w-4 h-4 text-gray-300" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-300" />
                          )}
                        </div>
                      </button>

                      {/* Sub-accordion Content Body */}
                      {isSubOpen && (
                        <div className="p-4 sm:p-5 pt-0 border-t border-white/10 mt-2">
                          <div className={`grid gap-3 pt-3 ${viewMode === 'GRID' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                            {courses.map(renderCourseItem)}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-gray-400 p-4">Arama kriterlerine uygun geçmiş ders bulunamadı.</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: MEVCUT POZİSYONDA ALINMASI GEREKEN EĞİTİMLER (COLLAPSIBLE ACCORDION) */}
      {(filterStatus === 'ALL' || filterStatus === 'CURRENT_POS') && (
        <div className="p-6 bg-[#0B2A4A] rounded-3xl border border-amber-400/40 space-y-4 shadow-xl">
          <button
            onClick={() => setShowCurrPos(!showCurrPos)}
            className="w-full flex items-center justify-between border-b border-white/10 pb-4 text-left cursor-pointer hover:bg-white/5 p-2 rounded-2xl transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                  <span>⚡ MEVCUT POZİSYONDA ALINMASI GEREKEN EĞİTİMLER</span>
                </h3>
                <p className="text-xs text-amber-300">
                  Mevcut Seviye {activeLevel} ({activeEmpPos}) pozisyonunuzda yetkinliğinizi tamamlamak için almanız gereken zorunlu ve aktif dersler ({currentPositionCourses.length} Ders).
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <span className="px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-mono font-bold rounded-full border border-amber-400/30">
                {filteredCurr.length} Ders (%78 Aktif İlerleme)
              </span>
              {showCurrPos ? <ChevronUp className="w-5 h-5 text-gray-300" /> : <ChevronDown className="w-5 h-5 text-gray-300" />}
            </div>
          </button>

          {showCurrPos && (
            <div className="space-y-4 pt-2">
              {(() => {
                const currSubKey = `curr_pos_${activeLevel}`;
                const isCurrSubOpen = openSubAccordions[currSubKey] === true; // Default false (kapalı)

                return (
                  <div className="bg-[#061B33] rounded-2xl border border-amber-400/30 overflow-hidden shadow-md">
                    {/* Sub-accordion Header Bar */}
                    <button
                      onClick={() => toggleSubAccordion(currSubKey)}
                      className="w-full p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left cursor-pointer hover:bg-white/5 transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30 text-xs shrink-0 font-mono">
                          📍 Mevcut Seviye {activeLevel}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-amber-300 text-sm">{activeEmpPos}</h4>
                          <p className="text-[11px] text-gray-300">
                            Sayar Marketler • Kadıköy Şubesi (Aktif Çalışan Pozisyonunuz)
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0">
                        <span className="px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-mono font-bold rounded-full border border-amber-400/30">
                          {currentPositionCourses.length} Zorunlu Modül
                        </span>
                        {isCurrSubOpen ? (
                          <ChevronUp className="w-4 h-4 text-gray-300" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-300" />
                        )}
                      </div>
                    </button>

                    {/* Sub-accordion Content Body (Default Kapalı) */}
                    {isCurrSubOpen && (
                      <div className="p-4 sm:p-5 pt-0 border-t border-white/10 mt-2">
                        <div className={`grid gap-3 pt-3 ${viewMode === 'GRID' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                          {filteredCurr.length > 0 ? (
                            filteredCurr.map(renderCourseItem)
                          ) : (
                            <p className="text-xs text-gray-400 p-4">Arama kriterlerine uygun mevcut ders bulunamadı.</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* INTERACTIVE COURSE CONTENT PLAYBACK MODAL */}
      {activeModalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0B2A4A] border border-amber-400/50 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative text-white max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalCourse(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 border-b border-white/10 pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-xs font-bold border border-blue-500/30">
                  {activeModalCourse.category}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono text-xs font-bold border border-amber-400/30">
                  {activeModalCourse.positionLevel}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-white">{activeModalCourse.title}</h2>
              <div className="flex items-center space-x-2 text-xs text-amber-300 font-bold pt-1">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>👨‍🏫 Eğitmen: <strong className="text-white">{activeModalCourse.instructor}</strong></span>
              </div>
            </div>

            {/* Course Overview & Progress */}
            <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-3 text-xs">
              <p className="text-gray-200 leading-relaxed">{activeModalCourse.description}</p>

              <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-white/10">
                <span>📅 Aktif Takvim: <strong className="text-amber-300">{activeModalCourse.scheduleDate}</strong></span>
                <span>Durum: <strong className={activeModalCourse.status === 'COMPLETED' ? 'text-emerald-400' : 'text-amber-300'}>{activeModalCourse.status}</strong></span>
              </div>

              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-1">
                <div
                  className={`h-full rounded-full ${activeModalCourse.status === 'COMPLETED' ? 'bg-emerald-400' : 'bg-amber-400'}`}
                  style={{ width: `${activeModalCourse.progress}%` }}
                />
              </div>
            </div>

            {/* SYLLABUS / LESSON CHECKLIST */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Video className="w-4 h-4 text-amber-400" />
                <span>Modül Ders İçeriği ve Müfredat Listesi:</span>
              </h3>

              <div className="space-y-2 text-xs">
                {[
                  { id: 1, title: 'Ders 1: Modüle Giriş & Temel Teorik Kavramlar', duration: '18 Dk', done: activeModalCourse.progress >= 25 },
                  { id: 2, title: 'Ders 2: Saha Mağaza Uygulamaları & Vaka Analizi', duration: '24 Dk', done: activeModalCourse.progress >= 50 },
                  { id: 3, title: 'Ders 3: Yönetsel Karar Verme & PKA Simülasyonu', duration: '30 Dk', done: activeModalCourse.progress >= 75 },
                  { id: 4, title: 'Ders 4: Değerlendirme Sınavı & Sertifika Onayı', duration: '15 Dk', done: activeModalCourse.progress >= 100 }
                ].map((ls) => (
                  <div
                    key={ls.id}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                      ls.done ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-[#061B33] border-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <CheckSquare className={`w-4 h-4 ${ls.done ? 'text-emerald-400' : 'text-gray-500'}`} />
                      <span className={`font-extrabold ${ls.done ? 'text-emerald-300' : 'text-gray-200'}`}>{ls.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">{ls.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  alert(`"${activeModalCourse.title}" ders videoları oynatılıyor...`);
                  setActiveModalCourse(null);
                }}
                className="w-full sm:w-auto px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center space-x-2 shadow-md cursor-pointer transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Eğitimi Oynat ve Başlat</span>
              </button>

              <button
                onClick={() => setActiveModalCourse(null)}
                className="w-full sm:w-auto px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl cursor-pointer transition-all"
              >
                Pencereyi Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
