'use client';

import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Target,
  Sparkles,
  Award,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Clock,
  BookOpen,
  Users,
  ShieldCheck,
  FileText,
  AlertCircle,
  TrendingUp,
  Brain,
  Building2,
  Compass
} from 'lucide-react';

interface PositionOption {
  id: string;
  name: string;
  group: string;
  careerLevel: number;
}

interface OnboardingWizardProps {
  userId?: string;
  onComplete: (data: any) => void;
}

export default function OnboardingWizard({ userId, onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState<PositionOption[]>([]);
  
  // Step 1: Current Situation
  const [companyName, setCompanyName] = useState('Sayar Marketler');
  const [storeName, setStoreName] = useState('Kadıköy Şubesi');
  const [region, setRegion] = useState('Marmara Bölgesi');
  const [currentPositionId, setCurrentPositionId] = useState('');
  const [totalExperienceMonths, setTotalExperienceMonths] = useState('18');
  const [currentPositionExperienceMonths, setCurrentPositionExperienceMonths] = useState('12');
  const [managedEmployeesCount, setManagedEmployeesCount] = useState('0');
  const [shiftManagementExp, setShiftManagementExp] = useState(true);
  const [operatedSystems, setOperatedSystems] = useState(['KasaPOS', 'SAP_Store', 'LMS']);

  // Step 2: Career Objective
  const [careerGoalType, setCareerGoalType] = useState('VERTICAL');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});

  // Step 3: Target Positions
  const [nextTargetPositionId, setNextTargetPositionId] = useState('');
  const [longTermTargetPositionId, setLongTermTargetPositionId] = useState('');

  // Step 4: Work Preferences
  const [weeklyLearningHours, setWeeklyLearningHours] = useState('5');
  const [preferredLearningStyle, setPreferredLearningStyle] = useState('SAHA');
  const [wantMentor, setWantMentor] = useState(true);
  const [managerShareConsent, setManagerShareConsent] = useState(true);

  // Step 5: Pre-Assessment
  const [selfRatings, setSelfRatings] = useState<Record<string, number>>({
    'stok': 3,
    'kasa': 4,
    'musteri': 4,
    'liderlik': 2,
    'matematik': 2
  });
  const [quizScore, setQuizScore] = useState(85);

  // Completion Result
  const [completedResult, setCompletedResult] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/career-compass/onboarding')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPositions(data.positions || []);
          if (data.user) {
            setCompanyName(data.user.company?.name || 'Sayar Marketler');
            if (data.user.professionalPositionId) {
              setCurrentPositionId(data.user.professionalPositionId);
            } else if (data.positions?.length > 0) {
              setCurrentPositionId(data.positions[0].id);
            }
          } else if (data.positions?.length > 0) {
            setCurrentPositionId(data.positions[0].id);
            setNextTargetPositionId(data.positions[Math.min(2, data.positions.length - 1)].id);
            setLongTermTargetPositionId(data.positions[Math.min(3, data.positions.length - 1)].id);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Onboarding init error:', err);
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/career-compass/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          currentPositionId,
          nextTargetPositionId,
          longTermTargetPositionId,
          totalExperienceMonths,
          currentPositionExperienceMonths,
          weeklyLearningHours,
          preferredLearningStyle,
          careerGoalType,
          currentStore: `${companyName} - ${storeName}`,
          region,
          managedEmployeesCount,
          shiftManagementExp,
          operatedSystems,
          managerShareConsent,
          selfCompetencyRatings: selfRatings
        })
      });
      const data = await res.json();
      if (data.success) {
        setCompletedResult(data.personalResultText);
      } else {
        alert('Hata oluştu: ' + data.error);
      }
    } catch (e) {
      console.error(e);
      alert('Onboarding gönderilirken teknik bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-300 animate-pulse">
        <Compass className="w-10 h-10 text-amber-400 mx-auto mb-3 animate-spin" />
        Kariyer Pusulam sihirbazı yükleniyor...
      </div>
    );
  }

  if (completedResult) {
    return (
      <div className="bg-[#0B2A4A] p-8 rounded-3xl border border-amber-400/40 text-white space-y-6 shadow-2xl animate-in fade-in duration-300 max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg">
            🏆
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Kariyer Haritanız Hazır!</h2>
            <p className="text-xs text-amber-300 font-medium">Bugünkü seviyeniz analiz edildi, kişisel gelişim planınız aktif hale getirildi.</p>
          </div>
        </div>

        <div className="p-6 bg-[#061B33] rounded-2xl border border-amber-400/30 whitespace-pre-line text-sm text-gray-200 leading-relaxed font-sans shadow-inner">
          {completedResult}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => onComplete(completedResult)}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center space-x-2 transition-all cursor-pointer"
          >
            <span>🚀 Kariyer Pusulam Modülüne Başla</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0B2A4A] p-6 sm:p-8 rounded-3xl border border-white/10 text-white space-y-6 shadow-2xl max-w-4xl mx-auto">
      {/* Wizard Header & Progress Bar */}
      <div className="space-y-4 border-b border-white/10 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight">Kariyer Pusulam • İlk Kullanım Oryantasyonu</h2>
              <p className="text-xs text-gray-300">5 Adımda Mevcut Durumunu Analiz Et ve Hedefine İlerle</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
            Adım {step} / 5
          </span>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-5 gap-2 pt-2">
          {[
            { n: 1, label: '1. Mevcut Durum' },
            { n: 2, label: '2. Kariyer Amacı' },
            { n: 3, label: '3. Hedef Pozisyon' },
            { n: 4, label: '4. Çalışma Tercihleri' },
            { n: 5, label: '5. Ön Değerlendirme' }
          ].map((s) => (
            <div key={s.n} className="space-y-1">
              <div className={`h-2 rounded-full transition-all duration-300 ${s.n <= step ? 'bg-amber-400 shadow-sm' : 'bg-white/10'}`} />
              <span className={`text-[10px] font-bold block text-center truncate ${s.n <= step ? 'text-amber-300' : 'text-gray-400'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: MEVCUT DURUM */}
      {step === 1 && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-1">
            <h3 className="text-sm font-extrabold text-amber-300 flex items-center space-x-2">
              <UserCheck className="w-4 h-4" />
              <span>Şu anda kariyerinin hangi noktasındasın?</span>
            </h3>
            <p className="text-xs text-gray-300">Mevcut şirket, saha tecrübeniz ve operasyonel bilgileriniz onay için aşağıda listelenmiştir.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-300 mb-1 font-bold">Şirket / Mağaza Şubesi</label>
              <input
                type="text"
                value={`${companyName} - ${storeName}`}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1 font-bold">Bölge</label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1 font-bold">Mevcut Mesleki Pozisyonunuz</label>
              <select
                value={currentPositionId}
                onChange={(e) => setCurrentPositionId(e.target.value)}
                className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3 py-2.5 text-white font-medium focus:outline-none focus:border-amber-400"
              >
                {positions.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#061B33] text-white">
                    {p.name} ({p.group})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-1 font-bold">Toplam Perakende Deneyimi (Ay)</label>
              <input
                type="number"
                value={totalExperienceMonths}
                onChange={(e) => setTotalExperienceMonths(e.target.value)}
                className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1 font-bold">Yönetilen Çalışan Sayısı</label>
              <input
                type="number"
                value={managedEmployeesCount}
                onChange={(e) => setManagedEmployeesCount(e.target.value)}
                className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center space-x-3 pt-6">
              <input
                type="checkbox"
                id="shiftExp"
                checked={shiftManagementExp}
                onChange={(e) => setShiftManagementExp(e.target.checked)}
                className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
              />
              <label htmlFor="shiftExp" className="text-gray-200 font-bold cursor-pointer">
                Vardiya / Kapanış yönetimi deneyimim var
              </label>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: KARİYER AMACI */}
      {step === 2 && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-1">
            <h3 className="text-sm font-extrabold text-amber-300 flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Kariyerinde neyi başarmak istiyorsun?</span>
            </h3>
            <p className="text-xs text-gray-300">Ana hedefinize uygun bir gelişim patikası ve yetkinlik haritası çıkarılacaktır.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              { id: 'VERTICAL', label: 'Bir üst pozisyona hazırlanmak', desc: 'Saha mağaza yöneticiliğine veya şefliğe tırmanmak' },
              { id: 'EXPERT', label: 'Mevcut görevimde uzmanlaşmak', desc: 'Mevcut pozisyonda en yüksek verimlilik seviyesine ulaşmak' },
              { id: 'MANAGER', label: 'Yönetici olmak', desc: 'Mağaza Müdürü veya Saha Yöneticisi sorumluluğu almak' },
              { id: 'DEPARTMENT', label: 'Farklı bir departmana geçmek', desc: 'Kategori, Satın Alma veya İK departmanlarına geçiş yapmak' },
              { id: 'FRESH_FOOD', label: 'Taze gıda alanında uzmanlaşmak', desc: 'Manav, kasap veya şarküteri uzmanlığı yolunda ilerlemek' },
              { id: 'HQ', label: 'Merkez organizasyona geçmek', desc: 'Genel Merkez saha ve operasyon yönetimine dahil olmak' },
              { id: 'MENTOR', label: 'İç eğitmen veya mentor olmak', desc: 'Bilgi ve deneyimlerini yeni çalışanlara aktarmak' },
              { id: 'GENERAL_MANAGEMENT', label: 'Genel müdürlük yolunda ilerlemek', desc: 'Bölge ve Operasyon Direktörlüğü vizyonu ile yetişmek' },
              { id: 'UNDECIDED', label: 'Henüz karar vermedim (Kariyer Testi)', desc: 'Kısa yönelim testi ile en uygun patikayı keşfet' }
            ].map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => {
                  setCareerGoalType(g.id);
                  if (g.id === 'UNDECIDED') setShowQuiz(true);
                  else setShowQuiz(false);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  careerGoalType === g.id
                    ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-amber-400 text-white shadow-md'
                    : 'bg-[#061B33] border-white/10 text-gray-300 hover:border-amber-400/50'
                }`}
              >
                <div className="font-extrabold text-amber-300">{g.label}</div>
                <div className="text-[11px] text-gray-400 mt-1">{g.desc}</div>
              </button>
            ))}
          </div>

          {showQuiz && (
            <div className="p-4 bg-amber-500/10 border border-amber-400/30 rounded-2xl space-y-3 text-xs">
              <div className="font-extrabold text-amber-300 flex items-center space-x-2">
                <Brain className="w-4 h-4 text-amber-400" />
                <span>Kısa Yönelim Testi: En çok hangisinden keyif alıyorsun?</span>
              </div>
              <div className="space-y-2 text-gray-200">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="quiz" defaultChecked className="accent-amber-400" />
                  <span>Ekip arkadaşlarımı yönlendirmek ve mağaza hedeflerine koşmak</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="quiz" className="accent-amber-400" />
                  <span>Ürün kalitesi, tazelik ve reyon görselliği ile ilgilenmek</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="quiz" className="accent-amber-400" />
                  <span>Satış verilerini, fire oranlarını ve kar-zarar tablolarını analiz etmek</span>
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: HEDEF POZİSYON SEÇİMİ */}
      {step === 3 && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-1">
            <h3 className="text-sm font-extrabold text-amber-300 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Sıradaki ve Uzun Vadeli Kariyer Hedeflerinizi Belirleyin</span>
            </h3>
            <p className="text-xs text-gray-300">Sıradaki hedefiniz ile uzun vadeli vizyonunuz ayrı olarak takip edilecektir.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#061B33] rounded-2xl border border-amber-400/30 space-y-2">
              <label className="block text-amber-300 font-extrabold uppercase tracking-wider text-[11px]">
                ⏱️ Sıradaki Kariyer Hedefim (Önümüzdeki 6-12 Ay)
              </label>
              <select
                value={nextTargetPositionId}
                onChange={(e) => setNextTargetPositionId(e.target.value)}
                className="w-full bg-[#0B2A4A] border border-white/20 rounded-xl px-3 py-2.5 text-white font-bold focus:outline-none focus:border-amber-400"
              >
                {positions.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#0B2A4A] text-white">
                    {p.name}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-gray-400">Gelişim planınız doğrudan bu hedefe yönelik hazırlanacaktır.</p>
            </div>

            <div className="p-4 bg-[#061B33] rounded-2xl border border-cyan-400/30 space-y-2">
              <label className="block text-cyan-300 font-extrabold uppercase tracking-wider text-[11px]">
                🚀 Uzun Vadeli Kariyer Hedefim (2-3 Yıl)
              </label>
              <select
                value={longTermTargetPositionId}
                onChange={(e) => setLongTermTargetPositionId(e.target.value)}
                className="w-full bg-[#0B2A4A] border border-white/20 rounded-xl px-3 py-2.5 text-white font-bold focus:outline-none focus:border-cyan-400"
              >
                {positions.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#0B2A4A] text-white">
                    {p.name}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-gray-400">Genel merkez vizyonunuz ve liderlik pipeline kaydınız.</p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: ÇALIŞMA TERCİHLERİ */}
      {step === 4 && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-1">
            <h3 className="text-sm font-extrabold text-amber-300 flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Gelişim ve Öğrenme Tercihleriniz</span>
            </h3>
            <p className="text-xs text-gray-300">Haftalık çalışma temponuza en uygun öğrenme formatını belirleyin.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-300 mb-1 font-bold">Haftalık Eğitime Ayırabileceğiniz Süre</label>
              <select
                value={weeklyLearningHours}
                onChange={(e) => setWeeklyLearningHours(e.target.value)}
                className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3 py-2.5 text-white font-medium focus:outline-none focus:border-amber-400"
              >
                <option value="3">Haftada 3 Saat (Hafif Tempo)</option>
                <option value="5">Haftada 5 Saat (Önerilen Standart)</option>
                <option value="8">Haftada 8 Saat (Hızlı Gelişim)</option>
                <option value="12">Haftada 12+ Saat (Yoğun Hazırlık)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-1 font-bold">Tercih Ettiğiniz Öğrenme Türü</label>
              <select
                value={preferredLearningStyle}
                onChange={(e) => setPreferredLearningStyle(e.target.value)}
                className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3 py-2.5 text-white font-medium focus:outline-none focus:border-amber-400"
              >
                <option value="SAHA">Gerçek Mağaza Saha Uygulaması & Görevi</option>
                <option value="VIDEO">Mikro Video ve İnteraktif LMS Modülleri</option>
                <option value="CANLI">Canlı Web seminerleri ve Eğitmen Oturumları</option>
                <option value="OKUMA">Rehber Okumaları ve Vaka Analizleri</option>
              </select>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <input
                type="checkbox"
                id="mentorConsent"
                checked={wantMentor}
                onChange={(e) => setWantMentor(e.target.checked)}
                className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
              />
              <label htmlFor="mentorConsent" className="text-gray-200 font-bold cursor-pointer">
                Bir Bölge Mentoru / Koçu ile çalışmak istiyorum
              </label>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <input
                type="checkbox"
                id="managerShare"
                checked={managerShareConsent}
                onChange={(e) => setManagerShareConsent(e.target.checked)}
                className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
              />
              <label htmlFor="managerShare" className="text-gray-200 font-bold cursor-pointer">
                Kariyer gelişim planımı Mağaza Müdürüme aç
              </label>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: ÖN DEĞERLENDİRME */}
      {step === 5 && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-1">
            <h3 className="text-sm font-extrabold text-amber-300 flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Hızlı Öz Değerlendirme & Yetkinlik Puanlaması</span>
            </h3>
            <p className="text-xs text-gray-300">1 (Bilgim Yok) ile 5 (Başkalarına Öğretiyorum) arasında yetkinlik seviyelerinizi işaretleyin.</p>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { id: 'stok', name: 'Stok, Envanter & Fire Yönetimi' },
              { id: 'kasa', name: 'Kasa Operasyonları & Gün Sonu Kalibrasyonu' },
              { id: 'musteri', name: 'Müşteri Deneyimi & Şikayet Yönetimi' },
              { id: 'liderlik', name: 'Vardiya Hazırlama & Ekip Yönlendirme' },
              { id: 'matematik', name: 'Perakende Matematiği & P&L Okuryazarlığı' }
            ].map((c) => (
              <div key={c.id} className="p-3 bg-[#061B33] rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="font-bold text-white text-xs">{c.name}</span>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelfRatings({ ...selfRatings, [c.id]: lvl })}
                      className={`w-7 h-7 rounded-lg text-xs font-black transition-all ${
                        selfRatings[c.id] === lvl
                          ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          onClick={handleBack}
          disabled={step === 1 || isSubmitting}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all ${
            step === 1 ? 'opacity-30 cursor-not-allowed text-gray-500' : 'bg-white/10 text-gray-300 hover:bg-white/20 cursor-pointer'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Geri</span>
        </button>

        {step < 5 ? (
          <button
            onClick={handleNext}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow-md cursor-pointer transition-all"
          >
            <span>Devam Et</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-2 shadow-lg cursor-pointer transition-all"
          >
            {isSubmitting ? (
              <span>Hesaplanıyor...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Kariyer Haritamı Oluştur &amp; Başla</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
