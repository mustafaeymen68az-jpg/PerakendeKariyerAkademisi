'use client';

import React, { useState, useEffect } from 'react';
import OnboardingWizard from './OnboardingWizard';
import PersonalSwotWidget from './PersonalSwotWidget';
import CareerHierarchyTimeline from './CareerHierarchyTimeline';
import DynamicCareerPathMap from './DynamicCareerPathMap';
import {
  Compass,
  Target,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  Upload,
  FileText,
  AlertTriangle,
  TrendingUp,
  Users,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  MessageSquare,
  HelpCircle,
  BarChart3,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  Info,
  Calendar,
  Check,
  Brain,
  Play
} from 'lucide-react';
import { getCourseImage } from '@/data/courseImages';

interface CareerCompassMainProps {
  userId?: string;
  selectedGoal?: string;
  goalType?: 'VERTICAL' | 'HORIZONTAL';
  onOpenGoalModal?: () => void;
  onSelectGoal?: (goal: string, type: 'VERTICAL' | 'HORIZONTAL') => void;
}

export default function CareerCompassMain({
  userId,
  selectedGoal = 'Mağaza Müdürü',
  goalType = 'VERTICAL',
  onOpenGoalModal,
  onSelectGoal
}: CareerCompassMainProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [gapData, setGapData] = useState<any[]>([]);
  const [readinessData, setReadinessData] = useState<any>(null);
  const [fieldTasks, setFieldTasks] = useState<any[]>([]);
  const [coachData, setCoachData] = useState<any>(null);
  const [developmentPlan, setDevelopmentPlan] = useState<any>(null);

  // Modals
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showTargetModal, setShowTargetModal] = useState(false);

  // Task submission state
  const [evidenceFile, setEvidenceFile] = useState('');
  const [evidenceNotes, setEvidenceNotes] = useState('');
  const [reflectionProblem, setReflectionProblem] = useState('');
  const [reflectionRootCause, setReflectionRootCause] = useState('');
  const [reflectionActionTaken, setReflectionActionTaken] = useState('');
  const [reflectionResult, setReflectionResult] = useState('');
  const [reflectionFutureAction, setReflectionFutureAction] = useState('');
  const [submittingTask, setSubmittingTask] = useState(false);
  // Digital coach answer
  const [coachAnswer, setCoachAnswer] = useState('');
  const [coachAdvice, setCoachAdvice] = useState<string | null>(null);

  // Sync active position from Admin panel assignment
  const [activeEmpPos, setActiveEmpPos] = useState<string>('Kasiyer & Reyon Çalışanı');

  useEffect(() => {
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

  const getPositionDetails = (posName: string) => {
    const p = posName.toLowerCase();
    if (p.includes('ceo') || (p.includes('genel müdür') && !p.includes('yardımcısı') && !p.includes('yrd'))) {
      return { level: 8, name: 'CEO / Genel Müdür', nextName: 'Yönetim Kurulu Başkanı', nextScore: '15.0%', nextTime: 'Gelecek Vizyonu' };
    }
    if (p.includes('coo') || p.includes('cmo') || p.includes('genel müdür yrd') || p.includes('genel müdür yardımcısı')) {
      return { level: 7, name: 'Genel Müdür Yardımcısı (COO)', nextName: 'CEO / Genel Müdür', nextScore: '22.0%', nextTime: '2 - 3 Yıl' };
    }
    if (p.includes('direktör') || p.includes('direktor')) {
      return { level: 6, name: 'Perakende Operasyon Direktörü', nextName: 'Genel Müdür Yardımcısı (COO)', nextScore: '28.0%', nextTime: '2 Yıl' };
    }
    if (p.includes('bölge') || p.includes('saha müdürü')) {
      return { level: 5, name: 'Bölge / Saha Müdürü', nextName: 'Perakende Operasyon Direktörü', nextScore: '35.0%', nextTime: '1.5 - 2 Yıl' };
    }
    if (p.includes('mağaza müdürü') && !p.includes('yardımcısı') && !p.includes('yrd')) {
      return { level: 4, name: 'Mağaza Müdürü', nextName: 'Bölge / Saha Müdürü', nextScore: '45.0%', nextTime: '1.5 - 2 Yıl' };
    }
    if (p.includes('müdür yardımcısı') || p.includes('müdür yrd')) {
      return { level: 3, name: 'Mağaza Müdür Yardımcısı', nextName: 'Mağaza Müdürü', nextScore: '83.5%', nextTime: '14 Hafta (~3.5 Ay)' };
    }
    if (p.includes('takım lideri')) {
      return { level: 2, name: 'Takım Lideri / Kıdemli Satış Danışmanı', nextName: 'Mağaza Müdür Yardımcısı', nextScore: '88.0%', nextTime: '6 - 9 Ay' };
    }
    return { level: 1, name: 'Kasiyer & Reyon Çalışanı', nextName: 'Takım Lideri / Kıdemli Satış Danışmanı', nextScore: '92.0%', nextTime: '3 Ay Hazırlık Süresi' };
  };

  const posDetails = getPositionDetails(activeEmpPos);

  // Calculate target goal dynamic info
  const getGoalDetails = (goalName: string) => {
    const g = goalName.toLowerCase();
    if (g.includes('ceo') || (g.includes('genel müdür') && !g.includes('yardımcısı') && !g.includes('yrd'))) {
      return { timeframe: '10 - 12 Yıl', score: 22.0, levelName: 'Level 8: CEO / Genel Müdür' };
    }
    if (g.includes('coo') || g.includes('cmo') || g.includes('genel müdür yrd') || g.includes('genel müdür yardımcısı')) {
      return { timeframe: '8 - 10 Yıl', score: 28.0, levelName: 'Level 7: Genel Müdür Yrd. (COO)' };
    }
    if (g.includes('direktör') || g.includes('direktor')) {
      return { timeframe: '5 - 7 Yıl', score: 35.0, levelName: 'Level 6: Perakende Operasyon Direktörü' };
    }
    if (g.includes('bölge') || g.includes('saha müdürü')) {
      return { timeframe: '3 - 4 Yıl', score: 45.0, levelName: 'Level 5: Bölge Müdürü' };
    }
    if (g.includes('mağaza müdürü') && !g.includes('yardımcısı') && !g.includes('yrd')) {
      return { timeframe: '1.5 - 2 Yıl', score: 65.0, levelName: 'Level 4: Mağaza Müdürü' };
    }
    if (g.includes('müdür yardımcısı') || g.includes('müdür yrd')) {
      return { timeframe: '14 Hafta (~3.5 Ay)', score: 83.5, levelName: 'Level 3: Mağaza Müdür Yardımcısı' };
    }
    if (g.includes('takım lideri')) {
      return { timeframe: '3 Ay', score: 92.0, levelName: 'Level 2: Takım Lideri' };
    }
    if (g.includes('kasiyer') || g.includes('reyon')) {
      return { timeframe: '0 Ay (Mevcut)', score: 100.0, levelName: 'Level 1: Kasiyer & Reyon' };
    }
    return { timeframe: '6 Ay', score: 75.0, levelName: `Yatay Geçiş: ${goalName}` };
  };

  const targetInfo = getGoalDetails(selectedGoal);

  // Dynamic helper for Career Ladder Steps calculation
  const getCareerLadderSteps = (currentPosName: string, targetPosName: string, type: 'VERTICAL' | 'HORIZONTAL') => {
    const currentLvl = getPositionDetails(currentPosName).level;
    
    let targetLvl = 3;
    const g = targetPosName.toLowerCase();
    if (g.includes('ceo') || (g.includes('genel müdür') && !g.includes('yardımcısı') && !g.includes('yrd'))) targetLvl = 8;
    else if (g.includes('coo') || g.includes('cmo') || g.includes('genel müdür yrd') || g.includes('genel müdür yardımcısı')) targetLvl = 7;
    else if (g.includes('direktör') || g.includes('direktor')) targetLvl = 6;
    else if (g.includes('bölge') || g.includes('saha müdürü')) targetLvl = 5;
    else if (g.includes('mağaza müdürü') && !g.includes('yardımcısı') && !g.includes('yrd')) targetLvl = 4;
    else if (g.includes('müdür yardımcısı') || g.includes('müdür yrd')) targetLvl = 3;
    else if (g.includes('takım lideri')) targetLvl = 2;
    else if (g.includes('kasiyer') || g.includes('reyon')) targetLvl = 1;

    if (type === 'VERTICAL') {
      const startLvl = Math.min(currentLvl, targetLvl);
      const endLvl = Math.max(currentLvl, targetLvl);

      const allVerticalLevels = [
        { lvl: 1, title: 'Kasiyer & Reyon Çalışanı', timeframe: 'Mevcut Seviye', dateBadge: 'Ağustos 2026', targetDate: 'Ağustos 2026' },
        { lvl: 2, title: 'Takım Lideri / Kıdemli Satış', timeframe: '3 Ay Hazırlık', dateBadge: 'Kasım 2026', targetDate: 'Kasım 2026' },
        { lvl: 3, title: 'Mağaza Müdür Yardımcısı', timeframe: '1 - 1.5 Yıl', dateBadge: 'Ocak 2028', targetDate: 'Ocak 2028' },
        { lvl: 4, title: 'Mağaza Müdürü (P&L)', timeframe: '1.5 - 2 Yıl', dateBadge: 'Ocak 2030', targetDate: 'Ocak 2030' },
        { lvl: 5, title: 'Bölge / Saha Müdürü', timeframe: '1.5 - 2 Yıl', dateBadge: 'Ocak 2032', targetDate: 'Ocak 2032' },
        { lvl: 6, title: 'Perakende Operasyon Direktörü', timeframe: '2 Yıl', dateBadge: 'Ocak 2034', targetDate: 'Ocak 2034' },
        { lvl: 7, title: 'Genel Müdür Yardımcısı (COO)', timeframe: '2 - 3 Yıl', dateBadge: 'Ocak 2037', targetDate: 'Ocak 2037' },
        { lvl: 8, title: 'CEO / Genel Müdür', timeframe: '2 - 3 Yıl Vizyon', dateBadge: 'Ocak 2039', targetDate: 'Ocak 2039' }
      ];

      return allVerticalLevels.filter(item => item.lvl >= startLvl && item.lvl <= endLvl);
    }

    // HORIZONTAL TRANSITION STEPS
    return [
      { lvl: 1, title: currentPosName, timeframe: 'Mevcut Seviye', dateBadge: 'Ağustos 2026', targetDate: 'Ağustos 2026' },
      { lvl: 2, title: 'Yatay Geçiş Sertifikasyonu', timeframe: '8-12 Hafta Hazırlık', dateBadge: 'Kasım 2026', targetDate: 'Kasım 2026' },
      { lvl: 3, title: targetPosName, timeframe: '6 Ay İçinde Geçiş', dateBadge: 'Şubat 2027', targetDate: 'Şubat 2027' }
    ];
  };

  const ladderSteps = getCareerLadderSteps(activeEmpPos, selectedGoal, goalType);

  // EN GENİŞ KAPSAMLI HEDEF EĞİTİM MÜFREDATI LISTESI (10-12 MODULES)
  const fullCurriculumList = [
    { id: 1, title: '1. Temel Perakende & POS Sistemleri Kullanımı', category: 'ZORUNLU OPERASYON', score: 95, progress: 100, status: 'TAMAMLANDI', scheduleDate: 'Ocak 2025 (Tamamlandı)', isOverdue: false, instructor: 'Hakan Kaya (POS & Kasa Sistemleri Uzmanı)' },
    { id: 2, title: '2. Müşteri İletişimi & Kasa Hattı Standartları', category: 'ZORUNLU HİZMET', score: 92, progress: 100, status: 'TAMAMLANDI', scheduleDate: 'Şubat 2025 (Tamamlandı)', isOverdue: false, instructor: 'Ayşe Demir (Müşteri Deneyimi Uzmanı)' },
    { id: 3, title: '3. Gıda Güvenliği & Hijyen Standartları', category: 'ZORUNLU HIJYEN', score: 98, progress: 100, status: 'TAMAMLANDI', scheduleDate: 'Mart 2025 (Tamamlandı)', isOverdue: false, instructor: 'Doç. Dr. Selin Yılmaz (Gıda Güvenliği Uzmanı)' },
    { id: 4, title: '4. Reyon İçi Teşhir & Barkod Kontrolü', category: 'ZORUNLU STANDART', score: 90, progress: 100, status: 'TAMAMLANDI', scheduleDate: 'Nisan 2025 (Tamamlandı)', isOverdue: false, instructor: 'Mehmet Can (Planogram Uzmanı)' },
    { id: 5, title: '5. Fire Önleme & SKT Denetim Süreçleri', category: 'ZORUNLU KALİTE', score: 94, progress: 100, status: 'TAMAMLANDI', scheduleDate: 'Mayıs 2025 (Tamamlandı)', isOverdue: false, instructor: 'Caner Şahin (Stok & Envanter Eğitmeni)' },
    { id: 6, title: '6. Kasa Sonu Z-Raporu & Teslimat Tutanağı', category: 'ZORUNLU MALI', score: 89, progress: 100, status: 'TAMAMLANDI', scheduleDate: 'Haziran 2025 (Tamamlandı)', isOverdue: false, instructor: 'Hakan Kaya (POS & Kasa Sistemleri Uzmanı)' },
    { id: 7, title: '7. Mağaza İçi Sevkiyat & Mal Kabul Prosedürleri', category: 'ZORUNLU LOJISTIK', score: 91, progress: 100, status: 'TAMAMLANDI', scheduleDate: 'Ağustos 2025 (Tamamlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' },
    { id: 8, title: '8. Zor Müşteri Kriz Yönetimi', category: 'YETKİNLİK', score: 93, progress: 100, status: 'TAMAMLANDI', scheduleDate: 'Eylül 2025 (Tamamlandı)', isOverdue: false, instructor: 'Ayşe Demir (Müşteri Deneyimi Uzmanı)' },
    { id: 9, title: '9. İş Sağlığı ve Güvenliği (İSG) Perakende Uygulamaları', category: 'ZORUNLU MEVZUAT', score: 96, progress: 100, status: 'TAMAMLANDI', scheduleDate: 'Ekim 2025 (Tamamlandı)', isOverdue: false, instructor: 'Selin Öztürk (İSG & Mevzuat Uzmanı)' },
    { id: 10, title: '10. Perakende Matematiği & İskonto Hesapları', category: 'ZORUNLU MALI', score: 92, progress: 100, status: 'TAMAMLANDI', scheduleDate: 'Kasım 2025 (Tamamlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L ve Perakende Baş Uzmanı)' },
    { id: 11, title: '11. Müşteri Deneyimi & Sepet Büyütme Yetkinliği', category: 'SAHA PERFORMANSI', score: 94, progress: 100, status: 'TAMAMLANDI', scheduleDate: 'Mayıs 2026 (Tamamlandı)', isOverdue: false, instructor: 'Ayşe Demir (Müşteri Deneyimi Uzmanı)' },
    { id: 12, title: '12. Vardiya & Personel İş Gücü Planlaması', category: 'LİDERLİK', score: 85, progress: 100, status: 'TAMAMLANDI', scheduleDate: 'Temmuz 2026 (Tamamlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L ve Perakende Baş Uzmanı)' },
    { id: 13, title: '13. Mağaza İçi Stok, Sipariş ve Envanter Yönetimi', category: 'ZORUNLU TERFİ', score: 0, progress: 68, status: 'DEVAM EDİYOR', scheduleDate: 'Eylül 2026 (Aktif Takvim)', isOverdue: false, instructor: 'Caner Şahin (Stok & Envanter Eğitmeni)' },
    { id: 14, title: '14. Mağaza Açılış/Kapanış ve Kasa Ofis Yönetimi', category: 'ZORUNLU TERFİ', score: 0, progress: 35, status: 'DEVAM EDİYOR', scheduleDate: 'Ağustos 2026 (Hedeflenen Tarih)', isOverdue: true, delayDays: 12, instructor: 'Hakan Kaya (POS & Kasa Sistemleri Uzmanı)' },
    { id: 15, title: `15. Ekip Motivasyonu ve Gelişimsel Geri Bildirim (${selectedGoal} Modülü)`, category: 'SEÇMELİ LİDERLİK', score: 0, progress: 0, status: 'NOT_STARTED', scheduleDate: 'Ekim 2026 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (C-Suite Liderlik & CEO Koçu)' }
  ];

  const loadData = async () => {
    setLoading(true);
    try {
      const [profRes, gapRes, readRes, taskRes, coachRes, planRes] = await Promise.all([
        fetch(`/api/career-compass/profile?userId=${userId || ''}`).then((r) => r.json()),
        fetch(`/api/career-compass/gap-analysis?userId=${userId || ''}`).then((r) => r.json()),
        fetch(`/api/career-compass/readiness-score?userId=${userId || ''}`).then((r) => r.json()),
        fetch(`/api/career-compass/field-tasks?userId=${userId || ''}`).then((r) => r.json()),
        fetch(`/api/career-compass/digital-coach?userId=${userId || ''}`).then((r) => r.json()),
        fetch(`/api/career-compass/development-plan?userId=${userId || ''}`).then((r) => r.json())
      ]);

      if (profRes.success) {
        setProfileData(profRes);
        if (!profRes.profile?.onboardingCompleted) {
          setShowOnboarding(true);
        }
      }
      if (gapRes.success) setGapData(gapRes.gaps || []);
      if (readRes.success) setReadinessData(readRes);
      if (taskRes.success) setFieldTasks(taskRes.tasks || []);
      if (coachRes.success) setCoachData(coachRes);
      if (planRes.success) setDevelopmentPlan(planRes.plan);
    } catch (e) {
      console.error('Error loading Kariyer Pusulam data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [userId]);

  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask) return;
    setSubmittingTask(true);
    try {
      const res = await fetch('/api/career-compass/field-tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userTaskId: selectedTask.id,
          evidenceFileUrl: evidenceFile || 'raf_analiz_raporu.pdf',
          evidenceNotes,
          reflectionProblem,
          reflectionRootCause,
          reflectionActionTaken,
          reflectionResult,
          reflectionFutureAction
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('Saha görevi ve kişisel yansıtma başarıyla gönderildi!');
        setShowTaskModal(false);
        loadData();
      }
    } catch (err) {
      console.error(err);
      alert('Görev gönderilirken hata oluştu.');
    } finally {
      setSubmittingTask(false);
    }
  };

  const handleCoachSubmit = async (ans: string) => {
    setCoachAnswer(ans);
    try {
      const res = await fetch('/api/career-compass/digital-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          type: coachData?.currentPrompt?.type || 'MONDAY',
          response: ans,
          blockerType: ans.includes('zaman') ? 'TIME' : ans.includes('yönetici') ? 'MANAGER_SUPPORT' : 'COMPLETED'
        })
      });
      const data = await res.json();
      if (data.success) {
        setCoachAdvice(data.coachAdvice);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-300 animate-pulse">
        <Compass className="w-12 h-12 text-amber-400 mx-auto mb-3 animate-spin" />
        <span className="font-bold text-sm">Kariyer Pusulam verileriniz yükleniyor...</span>
      </div>
    );
  }

  if (showOnboarding) {
    return (
      <OnboardingWizard
        userId={userId}
        onComplete={() => {
          setShowOnboarding(false);
          loadData();
        }}
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. MODULE BRANDING HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#0B2A4A] via-[#09355E] to-[#087F96] p-6 sm:p-8 rounded-3xl border border-amber-400/30 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 opacity-10 pointer-events-none">
          <Compass className="w-80 h-80 text-amber-300" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
                🧭
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Kariyer Pusulam</h1>
                <p className="text-xs sm:text-sm text-amber-300 font-bold tracking-wide">
                  Bugünkü seviyeni keşfet, hedef pozisyonunu belirle, gelişim planını oluştur ve sahada ilerle.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 self-start md:self-auto">
            {/* 1. DİKEY TERFİ POZİSYON SEÇİMİ */}
            <div className="p-3 bg-[#061B33]/90 rounded-2xl border border-amber-400/50 space-y-1 shadow-md min-w-[220px]">
              <span className="text-[9px] text-amber-300 block uppercase font-mono font-bold">
                👑 DİKEY TERFİ HEDEFİNİZ:
              </span>
              <select
                value={goalType === 'VERTICAL' ? selectedGoal : ''}
                onChange={(e) => {
                  if (e.target.value && onSelectGoal) {
                    onSelectGoal(e.target.value, 'VERTICAL');
                  }
                }}
                className="w-full bg-[#0B2A4A] border border-amber-400/50 rounded-xl px-2.5 py-1.5 text-xs font-black text-amber-300 focus:outline-none focus:border-amber-400 cursor-pointer shadow-inner"
              >
                <option value="" disabled>-- Dikey Terfi Pozisyonu Seçin --</option>
                <option value="Kasiyer & Reyon Çalışanı">Level 1: Kasiyer &amp; Reyon Çalışanı</option>
                <option value="Takım Lideri">Level 2: Mağaza Takım Lideri</option>
                <option value="Mağaza Müdür Yardımcısı">Level 3: Mağaza Müdür Yardımcısı</option>
                <option value="Mağaza Müdürü">Level 4: Mağaza Müdürü (P&amp;L)</option>
                <option value="Bölge Müdürü">Level 5: Bölge / Saha Müdürü</option>
                <option value="Perakende Operasyon Direktörü">Level 6: Operasyon Direktörü</option>
                <option value="Genel Müdür Yardımcısı (COO)">Level 7: Genel Müdür Yrd. (COO)</option>
                <option value="CEO / Genel Müdür">Level 8: CEO / Genel Müdür</option>
              </select>
              <div className="flex items-center space-x-2 text-[10px] font-mono text-emerald-400 pt-0.5">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>Süre: <strong>{goalType === 'VERTICAL' ? targetInfo.timeframe : '3.5 Ay'}</strong></span>
                </span>
                <span>• Skor: <strong>%{goalType === 'VERTICAL' ? targetInfo.score : '83.5'}</strong></span>
              </div>
            </div>

            {/* 2. YATAY GEÇİŞ POZİSYON SEÇİMİ */}
            <div className="p-3 bg-[#061B33]/90 rounded-2xl border border-purple-500/50 space-y-1 shadow-md min-w-[240px]">
              <span className="text-[9px] text-purple-300 block uppercase font-mono font-bold">
                🔄 YATAY GEÇİŞ POZİSYONUNUZ:
              </span>
              <select
                value={goalType === 'HORIZONTAL' ? selectedGoal : ''}
                onChange={(e) => {
                  if (e.target.value && onSelectGoal) {
                    onSelectGoal(e.target.value, 'HORIZONTAL');
                  }
                }}
                className="w-full bg-[#0B2A4A] border border-purple-500/50 rounded-xl px-2.5 py-1.5 text-xs font-black text-purple-200 focus:outline-none focus:border-purple-400 cursor-pointer shadow-inner max-w-[260px] truncate"
              >
                <option value="">-- Yatay Geçiş Pozisyonu Seçin --</option>
                <optgroup label="🥑 TAZE GIDA & REYON UZMANLIKLARI" className="bg-slate-900 text-amber-300 font-bold">
                  <option value="Taze Gıda Şef / Yöneticisi">Taze Gıda Kategori Şefi / Uzmanı</option>
                  <option value="Kasap / Şarküteri & Mutfak Yöneticisi">Kasap / Şarküteri &amp; Mutfak Yöneticisi</option>
                  <option value="Unlu Mamuller & Pastacılık Sorumlusu">Unlu Mamuller &amp; Pastacılık Sorumlusu</option>
                  <option value="Manav / Meyve-Sebze Reyon Şefi">Manav / Meyve-Sebze Reyon Şefi</option>
                </optgroup>
                <optgroup label="📦 DEPO, LOJİSTİK & TEDARİK ZİNCİRİ" className="bg-slate-900 text-blue-300 font-bold">
                  <option value="Mağaza Depo & Mal Kabul Sorumlusu">Mağaza Depo &amp; Mal Kabul Sorumlusu</option>
                  <option value="Tedarik Zinciri & Lojistik Uzmanı">Tedarik Zinciri &amp; Lojistik Uzmanı</option>
                  <option value="Merkez Depo Operasyon Yöneticisi">Merkez Depo Operasyon Yöneticisi</option>
                </optgroup>
                <optgroup label="🛒 SATIN ALMA & KATEGORİ YÖNETİMİ" className="bg-slate-900 text-emerald-300 font-bold">
                  <option value="Satın Alma Uzmanı">Satın Alma Uzmanı / Müzakereci</option>
                  <option value="Kategori Yöneticisi">Kategori Yöneticisi (Genel Merkez)</option>
                  <option value="Tedarikçi İlişkileri & Ticari Pazarlama Uzmanı">Tedarikçi İlişkileri &amp; Ticari Pazarlama</option>
                </optgroup>
                <optgroup label="🎨 GÖRSEL MAĞAZACILIK & MERCHANDISING" className="bg-slate-900 text-pink-300 font-bold">
                  <option value="Görsel Mağazacılık & Merchandiser">Görsel Mağazacılık (Merchandiser)</option>
                  <option value="Planogram & Teşhir Mimarı">Planogram &amp; Teşhir Mimarı</option>
                </optgroup>
                <optgroup label="👥 İNSAN KAYNAKLARI & İÇ EĞİTİM" className="bg-slate-900 text-purple-300 font-bold">
                  <option value="İç Eğitmen / İK Uzmanı">İç Eğitmen / Akademi Uzmanı</option>
                  <option value="İnsan Kaynakları & İşe Alım Uzmanı">İnsan Kaynakları &amp; İşe Alım Uzmanı</option>
                </optgroup>
                <optgroup label="🌐 DİJİTAL PERAKENDE & E-TİCARET" className="bg-slate-900 text-cyan-300 font-bold">
                  <option value="E-Ticaret & Dijital Perakende Yöneticisi">E-Ticaret &amp; Dijital Perakende Yrd.</option>
                  <option value="Saha Hızlı Teslimat & Kurye Operasyon Şefi">Saha Hızlı Teslimat &amp; Kurye Şefi</option>
                </optgroup>
                <optgroup label="🛡️ RISK, KAYIP ÖNLEME & İSG" className="bg-slate-900 text-red-300 font-bold">
                  <option value="Perakende Risk & Kayıp Önleme Uzmanı">Perakende Risk &amp; Kayıp Önleme Uzmanı</option>
                  <option value="İSG & Şube Mevzuat Denetçisi">İSG &amp; Şube Mevzuat Denetçisi</option>
                </optgroup>
              </select>
              <div className="flex items-center space-x-2 text-[10px] font-mono text-purple-300 pt-0.5">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-purple-400" />
                  <span>Süre: <strong>{goalType === 'HORIZONTAL' ? targetInfo.timeframe : '6 Ay'}</strong></span>
                </span>
                <span>• Skor: <strong>%{goalType === 'HORIZONTAL' ? targetInfo.score : '75.0'}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. VISUAL STAGE PROGRESS BAR (10 STAGES) */}
        <div className="pt-6 border-t border-white/15 mt-6 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-amber-300">
            <span>Kariyer Yolculuğu İlerleme Durumu</span>
            <span>Aşama 7 / 10 (%70 Tamamlandı)</span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 pt-1">
            {[
              { step: 1, title: 'Profilim' },
              { step: 2, title: 'Mevcut Durum' },
              { step: 3, title: 'Yönelim' },
              { step: 4, title: 'Hedef Seçimi' },
              { step: 5, title: 'Fark Analizi' },
              { step: 6, title: 'Gelişim Planı' },
              { step: 7, title: 'Eğitim & Saha' },
              { step: 8, title: 'Mentorluk' },
              { step: 9, title: 'Hazırlık Skoru' },
              { step: 10, title: 'Terfi Havuzu' }
            ].map((st) => (
              <div key={st.step} className="space-y-1">
                <div
                  className={`h-2 rounded-full transition-all ${
                    st.step <= 7
                      ? st.step === 7
                        ? 'bg-amber-400 animate-pulse shadow-md'
                        : 'bg-emerald-400'
                      : 'bg-white/15'
                  }`}
                />
                <span
                  className={`text-[9px] font-bold block text-center truncate ${
                    st.step <= 7 ? 'text-amber-200 font-extrabold' : 'text-gray-400'
                  }`}
                >
                  {st.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2.1 VISUAL CAREER LADDER STEPS & ESTIMATED TARGET DATES (MEVCUT POZİSYONDAN HEDEFE BASAMAKLAR) */}
        <div className="pt-5 border-t border-white/15 mt-5 space-y-3 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm font-black text-amber-300 uppercase tracking-wider flex items-center space-x-2">
                <span>🪜 KARİYER MERDİVENİ BASAMAKLARI</span>
                <span className="text-xs text-gray-300 font-bold bg-white/10 px-2.5 py-0.5 rounded-md">
                  {activeEmpPos} ➔ {selectedGoal}
                </span>
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-300 font-bold bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/30 self-start md:self-auto shrink-0">
              📅 Tahmini Hedef Tarihleri (Ağustos 2026 Bazlı)
            </span>
          </div>

          {/* Desktop/Tablet Stairs Steps - Stretches 100% to fill full width */}
          <div
            className="hidden sm:grid gap-3 pt-1 w-full"
            style={{
              gridTemplateColumns: `repeat(${Math.max(1, ladderSteps.length)}, minmax(0, 1fr))`
            }}
          >
            {ladderSteps.map((step, idx) => {
              const isCurrent = idx === 0;
              const isTarget = idx === ladderSteps.length - 1;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 relative overflow-hidden w-full ${
                    isTarget
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-xl ring-2 ring-amber-400/40'
                      : isCurrent
                      ? 'bg-blue-500/20 border-blue-400 text-blue-200 shadow-md'
                      : 'bg-[#061B33]/90 border-white/15 text-gray-200 hover:border-white/30'
                  }`}
                >
                  {/* Step Header Badge */}
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                    <span className={`px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-mono ${
                      isTarget
                        ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                        : isCurrent
                        ? 'bg-blue-500 text-white font-black shadow-sm'
                        : 'bg-white/10 text-gray-300'
                    }`}>
                      {isTarget ? '🎯 HEDEF' : isCurrent ? '📍 MEVCUT' : `BASAMAK ${idx + 1}`}
                    </span>
                    <span className="text-amber-300 font-extrabold text-[10px] font-mono whitespace-nowrap">{step.dateBadge}</span>
                  </div>

                  {/* Position Title */}
                  <div className="space-y-1">
                    <div className="text-xs font-black leading-snug">
                      {step.title}
                    </div>
                    <div className="text-[10px] text-gray-300 font-mono">
                      ⌛ {step.timeframe}
                    </div>
                  </div>

                  {/* Estimated Target Date */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                    <span className="text-gray-400 text-[9px] shrink-0">Tahmini Tarih:</span>
                    <span className={`font-mono font-black ${isTarget ? 'text-amber-300 text-xs' : isCurrent ? 'text-emerald-300' : 'text-gray-200'}`}>
                      {step.targetDate}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile view fallback */}
          <div className="grid sm:hidden grid-cols-1 gap-2 pt-1 w-full">
            {ladderSteps.map((step, idx) => {
              const isCurrent = idx === 0;
              const isTarget = idx === ladderSteps.length - 1;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-2 ${
                    isTarget
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : isCurrent
                      ? 'bg-blue-500/20 border-blue-400 text-blue-200'
                      : 'bg-[#061B33]/90 border-white/15 text-gray-200'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold ${
                        isTarget ? 'bg-amber-400 text-slate-950' : isCurrent ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300'
                      }`}>
                        {isTarget ? '🎯 HEDEF' : isCurrent ? '📍 MEVCUT' : `B${idx + 1}`}
                      </span>
                      <span className="text-xs font-bold text-white">{step.title}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono">⌛ {step.timeframe}</div>
                  </div>
                  <span className="text-xs font-mono font-black text-amber-300 shrink-0">{step.targetDate}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2.5 DYNAMIC CAREER PATH MAP & LADDER */}
      <DynamicCareerPathMap
        selectedGoal={selectedGoal}
        goalType={goalType}
        onOpenGoalModal={onOpenGoalModal || (() => {})}
      />

      {/* TARGET POSITION SUMMARY CARDS MATCHING SELECTED GOAL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Current Position */}
        <div className="p-6 bg-[#0B2A4A] rounded-3xl border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">📍 Mevcut Pozisyonum</span>
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold border border-blue-500/30">
              Seviye {posDetails.level}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">{posDetails.name}</h3>
            <p className="text-xs text-gray-300 mt-1">Sayar Marketler • Kadıköy Şubesi (Aktif Görev)</p>
          </div>
          <div className="pt-2 text-xs space-y-2 text-gray-200">
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Saha operasyon yetkinlikleri ve görev tanımı tanımlandı</span>
            </div>
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Terfi havuzu yetkinlik matrisinde aktif değerlendirme</span>
            </div>
          </div>
        </div>

        {/* Card 2: Next Immediate Promotion Step */}
        <div className="p-6 bg-[#0B2A4A] rounded-3xl border border-amber-400/50 space-y-4 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider">⏱️ Sıradaki Terfi Pozisyonu</span>
            <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-400/40">
              Seviye {posDetails.level + 1}: {posDetails.nextName}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-amber-300">{posDetails.nextName}</h3>
            <p className="text-xs text-gray-300 mt-1">Sıradaki Terfi • Tahmini Süre: <strong>{posDetails.nextTime}</strong></p>
          </div>
          <div className="pt-2 text-xs space-y-2">
            <div className="flex items-center justify-between text-gray-300">
              <span>Terfi Hazırlık Skoru:</span>
              <span className="font-bold text-amber-300">{posDetails.nextScore}</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400" style={{ width: posDetails.nextScore }} />
            </div>
          </div>
        </div>

        {/* Card 3: Ultimate Career Goal (Dynamically Matched selectedGoal) */}
        <div className="p-6 bg-[#0B2A4A] rounded-3xl border border-cyan-400/30 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-[10px] font-black uppercase text-cyan-300 tracking-wider">🚀 Nihai Kariyer Hedefim</span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30">
              {targetInfo.levelName}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-cyan-300">{selectedGoal}</h3>
            <p className="text-xs text-gray-300 mt-1">Kurumsal Zirve • C-Suite Pipeline (Erişim: {targetInfo.timeframe})</p>
          </div>
          <div className="pt-2 text-xs text-gray-300 leading-relaxed">
            PKA Executive Liderlik pipeline kaydınız aktif durumdadır. Mağaza Müdürü terfisi sonrasında seçtiğiniz <strong>"{selectedGoal}"</strong> hedefi doğrultusunda değerlendirmeye alınacaksınız.
          </div>
        </div>
      </div>

      {/* 4. DYNAMIC COMPETENCY GAP ANALYSIS TABLE MATCHING SELECTED GOAL */}
      <div className="p-6 sm:p-8 bg-[#0B2A4A] rounded-3xl border border-white/10 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-white flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-amber-400" />
              <span>Yetkinlik Farkı Analizi (Mevcut Seviye vs "{selectedGoal}" Hedefi)</span>
            </h3>
            <p className="text-xs text-gray-300 mt-0.5">
              1-5 Ölçeğinde değerlendirilen yetkinlikleriniz ve hedefe ulaşmak için önerilen gelişim aksiyonları.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1.5 rounded-full border border-emerald-500/30 self-start sm:self-auto">
            Gelişim Aksiyonu Atandı
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/15 text-amber-300 uppercase font-mono text-[10px]">
                <th className="py-3 px-3">Yetkinlik Adı</th>
                <th className="py-3 px-3">Mevcut Seviye</th>
                <th className="py-3 px-3">"{selectedGoal}" Hedef Seviye</th>
                <th className="py-3 px-3">Fark</th>
                <th className="py-3 px-3">Önerilen Gelişim Aksiyonu</th>
                <th className="py-3 px-3 text-right">Durum Etiketi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {[
                { name: 'Stok Devir Hızı & Envanter Hesabı', currentLevel: 3, targetLevel: 5, diff: -2, recommendedAction: 'Mağaza İçi Stok & Envanter Eğitimi modülü tamamlanmalı.', tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30', statusTag: 'Gelişim Gerekiyor ⚠️' },
                { name: 'Vardiya Çizelgeleme & İş Gücü', currentLevel: 4, targetLevel: 5, diff: -1, recommendedAction: 'Vardiya Planlaması eğitimi başarıyla tamamlandı.', tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', statusTag: 'Yeterli ✅' },
                { name: `${selectedGoal} Yönetsel Bütçe & Fire Analizi`, currentLevel: 2, targetLevel: 5, diff: -3, recommendedAction: `${selectedGoal} P&L ve Bütçe Simülasyonu atandı.`, tagColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30', statusTag: 'Kritik Öncelikli 🚨' },
                { name: 'Müşteri Kriz Yönetimi & İletişim', currentLevel: 5, targetLevel: 5, diff: 0, recommendedAction: 'Yetkinlik hedef seviyede.', tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', statusTag: 'Mükemmel ⚡' }
              ].map((gap, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-bold text-white">
                    {gap.name}
                  </td>
                  <td className="py-3 px-3 font-mono font-extrabold text-gray-200">
                    <span className="px-2 py-0.5 rounded bg-white/10">{gap.currentLevel} / 5</span>
                  </td>
                  <td className="py-3 px-3 font-mono font-extrabold text-amber-300">
                    <span className="px-2 py-0.5 rounded bg-amber-400/20 border border-amber-400/30">{gap.targetLevel} / 5</span>
                  </td>
                  <td className="py-3 px-3 font-mono font-extrabold">
                    <span className={gap.diff < 0 ? 'text-amber-400' : 'text-emerald-400'}>
                      {gap.diff > 0 ? `+${gap.diff}` : gap.diff}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-200 font-medium">{gap.recommendedAction}</td>
                  <td className="py-3 px-3 text-right">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] border ${gap.tagColor}`}>
                      {gap.statusTag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
