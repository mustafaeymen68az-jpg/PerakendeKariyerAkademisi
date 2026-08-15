'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  TrendingUp,
  Award,
  BookOpen,
  Target,
  CheckCircle2,
  Users,
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowUpRight,
  BarChart3,
  Check,
  X,
  Briefcase,
  Compass,
  ArrowUp,
  Zap,
  GraduationCap,
  Clock,
  ChevronUp,
  PackageCheck,
  Calculator,
  Layers,
  ShoppingBag,
  Truck,
  Cpu,
  Megaphone,
  ArrowRight,
  Crown,
  UserCheck,
  Database,
  Calendar,
  CheckSquare
} from 'lucide-react';
import {
  ALL_CAREER_TRACKS_15,
  CareerTrack15,
  CareerStep15,
  SCORING_WEIGHTS_15,
  CAREER_MOTTO
} from '@/data/careerSteps';

const TURKISH_MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

function parseDurationRange(durationStr: string): { minMonths: number; maxMonths: number } {
  if (durationStr.includes('Sürekli')) return { minMonths: 24, maxMonths: 36 };
  const matches = durationStr.match(/(\d+)(?:–(\d+))?/);
  if (!matches) return { minMonths: 12, maxMonths: 18 };
  const min = parseInt(matches[1], 10);
  const max = matches[2] ? parseInt(matches[2], 10) : min;
  return { minMonths: min, maxMonths: max };
}

function calculateTargetDate(startMonthIndex: number, startYear: number, monthsToAdd: number): string {
  const totalMonths = startMonthIndex + monthsToAdd;
  const targetYear = startYear + Math.floor(totalMonths / 12);
  const targetMonthIndex = totalMonths % 12;
  return `${TURKISH_MONTHS[targetMonthIndex]} ${targetYear}`;
}

export default function OperationCareerJourney() {
  const [activeTrackId, setActiveTrackId] = useState<string>('kasiyer-ceo');
  const activeTrack = ALL_CAREER_TRACKS_15.find(t => t.id === activeTrackId) || ALL_CAREER_TRACKS_15[0];

  const [userCurrentLevelId, setUserCurrentLevelId] = useState<number>(5);
  const [selectedStep, setSelectedStep] = useState<CareerStep15>(
    activeTrack.steps.find(s => s.id === 5) || activeTrack.steps[0]
  );
  const [activeView, setActiveView] = useState<'staircase' | 'grid'>('staircase');

  // Track selection change handler
  const handleTrackChange = (trackId: string) => {
    setActiveTrackId(trackId);
    const newTrack = ALL_CAREER_TRACKS_15.find(t => t.id === trackId) || ALL_CAREER_TRACKS_15[0];
    const defaultStep = newTrack.steps.find(s => s.id === userCurrentLevelId) || newTrack.steps[0];
    setSelectedStep(defaultStep);
  };

  // Step click handler (interactively updates level & top calculations & detail panel)
  // Clicking any step makes ONLY that step active (no dual active highlight)
  const handleStepClick = (step: CareerStep15) => {
    setUserCurrentLevelId(step.id);
    setSelectedStep(step);
  };

  const totalStepsInTrack = activeTrack.steps.length;

  // --------------------------------------------------
  // DYNAMIC DURATION & TARGET DATE ENGINE CALCULATIONS
  // --------------------------------------------------
  let totalTrackMinMonths = 0;
  let totalTrackMaxMonths = 0;

  activeTrack.steps.forEach((step, idx) => {
    if (idx < totalStepsInTrack - 1) {
      const { minMonths, maxMonths } = parseDurationRange(step.recommendedDuration);
      totalTrackMinMonths += minMonths;
      totalTrackMaxMonths += maxMonths;
    }
  });

  const currentUserStepIndex = activeTrack.steps.findIndex(s => s.id === userCurrentLevelId);
  const effectiveCurrentIndex = currentUserStepIndex !== -1 ? currentUserStepIndex : 0;

  let remainingMinMonths = 0;
  let remainingMaxMonths = 0;

  for (let i = effectiveCurrentIndex; i < totalStepsInTrack - 1; i++) {
    const { minMonths, maxMonths } = parseDurationRange(activeTrack.steps[i].recommendedDuration);
    remainingMinMonths += minMonths;
    remainingMaxMonths += maxMonths;
  }

  const currentDate = new Date();
  const currentMonthIdx = currentDate.getMonth();
  const currentYearVal = currentDate.getFullYear();

  const minTargetDateStr = calculateTargetDate(currentMonthIdx, currentYearVal, remainingMinMonths);
  const maxTargetDateStr = calculateTargetDate(currentMonthIdx, currentYearVal, remainingMaxMonths);

  const formatYearsMonths = (totalMonths: number) => {
    const years = (totalMonths / 12).toFixed(1);
    return `~${years} Yıl (${totalMonths} Ay)`;
  };

  return (
    <div id="15-basamakli-harita" className="min-h-screen bg-[#F4F7F9] font-sans pb-24 scroll-mt-6">
      
      {/* TOP HEADER SECTION WITH CAREER TRACK SELECTOR */}
      <section id="kariyer-haritasi" className="bg-gradient-to-b from-[#0B2A4A] via-[#061B33] to-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#087F96]/30 relative overflow-hidden scroll-mt-6">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#087F96]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#34A853]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#DDF4F7] bg-[#087F96]/30 px-4 py-2 rounded-full border border-[#087F96]/50 shadow-inner backdrop-blur-md">
              <Compass className="w-4 h-4 text-[#087F96]" />
              <span>PERAKENDE KARİYER NAVİGASYON VE GELİŞİM SİSTEMİ</span>
            </div>

            <div className="flex items-center space-x-2 bg-white/10 p-1.5 rounded-2xl border border-white/15 text-xs">
              <button
                onClick={() => setActiveView('staircase')}
                className={`px-4 py-2 rounded-xl font-extrabold transition-all ${
                  activeView === 'staircase'
                    ? 'bg-[#087F96] text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Merdiven Görünümü
              </button>
              <button
                onClick={() => setActiveView('grid')}
                className={`px-4 py-2 rounded-xl font-extrabold transition-all ${
                  activeView === 'grid'
                    ? 'bg-[#087F96] text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Kartlar Görünümü
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight text-white">
              {activeTrack.headline}
            </h1>
            <p className="text-gray-200 text-sm sm:text-base max-w-3xl font-light">
              {activeTrack.description}
            </p>
          </div>

          {/* 6 CAREER TRACK SELECTOR TABS */}
          <div className="pt-4 border-t border-white/10">
            <label className="block text-xs font-extrabold uppercase text-[#DDF4F7] mb-3 tracking-wider flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-[#087F96]" />
              <span>Kariyer Planı Seçin (6 Stratejik Rota):</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2.5">
              {ALL_CAREER_TRACKS_15.map((track) => {
                const isActive = activeTrackId === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => handleTrackChange(track.id)}
                    className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                      isActive
                        ? 'bg-[#087F96] text-white border-white ring-2 ring-[#087F96] shadow-xl font-bold'
                        : 'bg-white/5 border-white/15 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-bold text-[#DDF4F7] opacity-80 mb-1">
                      {track.department}
                    </div>
                    <div className="text-xs font-black leading-snug line-clamp-2">
                      {track.name}
                    </div>
                    <div className="text-[9px] text-[#DDF4F7] font-semibold mt-2 pt-1 border-t border-white/10 flex items-center justify-between">
                      <span>{track.steps.length} Basamak</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 mt-10">

        {/* STAIRCASE & INTERACTIVE DASHBOARD SECTION */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200/80 space-y-8 relative overflow-hidden">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <span className="text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3.5 py-1 rounded-full uppercase tracking-wider">
                {activeTrack.badgeText} ({totalStepsInTrack} Basamaklı)
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0B2A4A] mt-2">
                {activeTrack.headline}
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Tıkladığınız pozisyon aktif olur; zirveye kalan süre ve hedef tarih anında interaktif olarak güncellenir.
              </p>
            </div>

            {/* Status Legend */}
            <div className="flex items-center space-x-3 text-xs shrink-0">
              <div className="flex items-center space-x-1 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200 font-bold">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tamamlandı</span>
              </div>
              <div className="flex items-center space-x-1 bg-[#087F96] text-white px-3 py-1.5 rounded-xl font-extrabold shadow-sm">
                <div className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
                <span>Seçilen Pozisyon</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC TIME & TARGET DATE INTERACTIVE BANNER */}
          <div className="bg-gradient-to-r from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white p-6 rounded-3xl shadow-lg border border-[#087F96]/40 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Total Track Duration */}
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-gray-300 tracking-wider flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span>Başlangıçtan Zirveye Toplam Süre</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
                ~{(totalTrackMinMonths / 12).toFixed(1)}–{(totalTrackMaxMonths / 12).toFixed(1)} Yıl <span className="text-xs font-normal text-gray-200">({totalTrackMinMonths}–{totalTrackMaxMonths} Ay)</span>
              </div>
            </div>

            {/* Remaining Duration from Selected Step to Peak (INTERACTIVE) */}
            <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/15 pt-3 md:pt-0 md:pl-6">
              <div className="text-[10px] uppercase font-bold text-gray-300 tracking-wider flex items-center space-x-1">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span>SEÇİLEN POZİSYONDAN ZİRVEYE KALAN SÜRE</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-300 font-mono">
                {formatYearsMonths(remainingMinMonths)}
              </div>
              <div className="text-[10px] text-emerald-200 font-bold">
                Seçilen: <strong>{selectedStep.title} ({effectiveCurrentIndex + 1}. Basamak)</strong>
              </div>
            </div>

            {/* Estimated Peak Reaching Month/Year (INTERACTIVE) */}
            <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/15 pt-3 md:pt-0 md:pl-6">
              <div className="text-[10px] uppercase font-bold text-gray-300 tracking-wider flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-yellow-300" />
                <span>TAHMİNİ ZİRVEYE ULAŞIM TARİHİ</span>
              </div>
              <div className="text-lg sm:text-xl font-black text-yellow-300 font-mono">
                {minTargetDateStr} – {maxTargetDateStr}
              </div>
              <div className="text-[10px] text-gray-300">
                Planlanan Dönem: Ağustos {currentYearVal} Başlangıçlı
              </div>
            </div>
          </div>

          {/* FLUID STAIRCASE DISPLAY (SINGLE ACTIVE SELECTION, PROMINENT DURATION BADGES AT TOP) */}
          {activeView === 'staircase' ? (
            <div className="w-full pt-10 pb-12 px-2 relative min-h-[560px]">
              
              {/* Horizontal Baseline */}
              <div className="absolute bottom-6 left-0 right-0 h-3 bg-gradient-to-r from-gray-200 via-[#087F96]/40 to-[#0B2A4A] rounded-full" />

              <div className="w-full flex items-end justify-between gap-1 sm:gap-2">
                {activeTrack.steps.map((step, idx) => {
                  const isCurrent = step.id === userCurrentLevelId;
                  const isCompleted = idx < effectiveCurrentIndex;
                  const isPeak = idx === totalStepsInTrack - 1;

                  // Fluid staircase height calculation with ample space for details & buttons
                  const stepHeight = 200 + Math.round((idx / (totalStepsInTrack - 1)) * 300);

                  return (
                    <div
                      key={step.id}
                      onClick={() => handleStepClick(step)}
                      style={{ height: `${stepHeight}px` }}
                      className={`relative flex-1 rounded-2xl p-2 sm:p-2.5 flex flex-col justify-between cursor-pointer transition-all duration-300 group border-2 ${
                        isCurrent
                          ? 'bg-gradient-to-b from-[#087F96] to-[#061B33] text-white border-white ring-4 ring-[#087F96]/40 shadow-2xl scale-105 z-20'
                          : isCompleted
                          ? 'bg-emerald-50/90 text-emerald-950 border-emerald-300 hover:bg-emerald-100/90 hover:scale-105'
                          : isPeak
                          ? 'bg-gradient-to-b from-slate-900 to-[#0B2A4A] text-white border-amber-400/80 shadow-lg hover:scale-105'
                          : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50 hover:border-[#087F96]/60 shadow-xs hover:scale-105'
                      }`}
                    >
                      {/* PROMINENT DURATION BADGE AT THE VERY TOP OF EACH COLUMN */}
                      <div className={`text-[9px] sm:text-[10px] font-mono font-black text-center py-1 px-1 rounded-xl mb-1 border shadow-xs leading-none ${
                        isCurrent 
                          ? 'bg-amber-400 text-slate-950 border-amber-300' 
                          : isCompleted 
                          ? 'bg-emerald-200/80 text-emerald-900 border-emerald-300' 
                          : isPeak
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      }`}>
                        ⏱️ {step.recommendedDuration}
                      </div>

                      {/* Step Number & Crown */}
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold px-0.5">
                        <span className={`px-2 py-0.5 rounded-full ${
                          isCurrent ? 'bg-white text-[#0B2A4A]' : 'bg-black/10 text-gray-700 font-bold'
                        }`}>
                          {idx + 1}. Basamak
                        </span>

                        {isPeak && (
                          <Crown className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                        )}
                      </div>

                      {/* Title */}
                      <div className="my-auto space-y-1 text-center py-2">
                        <h3 className="font-extrabold text-[11px] sm:text-xs leading-snug line-clamp-2">
                          {step.title}
                        </h3>
                      </div>

                      {/* Action Button (100% visible at the bottom) */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStepClick(step);
                        }}
                        className={`w-full py-1.5 rounded-xl text-[10px] font-black transition-all shadow-xs ${
                          isCurrent 
                            ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                            : 'bg-[#087F96]/10 text-[#087F96] hover:bg-[#087F96] hover:text-white'
                        }`}
                      >
                        {isCurrent ? 'Seçildi ✓' : 'Seç'}
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          ) : (
            /* GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTrack.steps.map((step, idx) => (
                <div
                  key={step.id}
                  onClick={() => handleStepClick(step)}
                  className={`p-6 bg-white border-2 rounded-3xl shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group cursor-pointer ${
                    step.id === userCurrentLevelId ? 'border-[#087F96] ring-2 ring-[#087F96]' : 'border-gray-200 hover:border-[#087F96]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#087F96] bg-[#DDF4F7] px-2.5 py-0.5 rounded-full">
                        {idx + 1}. Basamak
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-300">⏱️ {step.recommendedDuration}</span>
                    </div>
                    <h3 className="font-extrabold text-base text-[#0B2A4A] group-hover:text-[#087F96] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">{step.purpose}</p>
                  </div>

                  <button className="w-full py-2 bg-[#087F96] text-white font-bold rounded-xl text-xs hover:bg-[#056B80]">
                    Seç ve Detayı Gör
                  </button>
                </div>
              ))}
            </div>
          )}

        </section>

        {/* INLINE DETAILED TRAINING & COMPETENCY PANEL FOR SELECTED STEP */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-[#087F96] space-y-8 animate-in fade-in duration-200">
          
          {/* Panel Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-full text-xs font-bold font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>SEÇİLEN BASAMAK KARİYER YOLCULUĞU VE EĞİTİM KARNESİ</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0B2A4A]">
                {selectedStep.title}
              </h3>
              <p className="text-xs text-gray-600">
                Önerilen Pozisyon Süresi: <strong>{selectedStep.recommendedDuration}</strong> • Amaç: {selectedStep.purpose}
              </p>
            </div>

            <div className="bg-[#0B2A4A] text-white p-4 rounded-2xl text-center space-y-1 w-full sm:w-auto">
              <div className="text-[10px] font-bold uppercase text-gray-300">Bir Sonraki Hedef Rol</div>
              <div className="text-sm font-black text-amber-300">{selectedStep.nextCareerLevel}</div>
            </div>
          </div>

          {/* Next Level Required Trainings Grid */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-base text-[#0B2A4A] flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-[#087F96]" />
              <span>Sonraki Seviyeye Terfi İçin Alınması Gereken Zorunlu Eğitimler</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedStep.requiredTrainingForNextLevel.map((training, idx) => (
                <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex items-start space-x-3 text-xs text-gray-800 font-bold hover:border-[#087F96] transition-all">
                  <BookOpen className="w-4 h-4 text-[#087F96] flex-shrink-0 mt-0.5" />
                  <span>{training}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Competencies & Promotion Criteria Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            
            {/* Competencies to Gain */}
            <div className="space-y-3 bg-blue-50/60 p-5 rounded-2xl border border-blue-200">
              <h4 className="font-extrabold text-sm text-[#0B2A4A] flex items-center space-x-2">
                <Award className="w-4 h-4 text-[#087F96]" />
                <span>Kazanılması Gereken Yetkinlikler</span>
              </h4>
              <ul className="space-y-2 text-xs text-gray-700 font-medium">
                {selectedStep.nextCompetencies.map((comp, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Promotion Criteria */}
            <div className="space-y-3 bg-amber-50/60 p-5 rounded-2xl border border-amber-200">
              <h4 className="font-extrabold text-sm text-[#0B2A4A] flex items-center space-x-2">
                <CheckSquare className="w-4 h-4 text-amber-600" />
                <span>Terfi & Değerlendirme Kriterleri</span>
              </h4>
              <ul className="space-y-2 text-xs text-gray-700 font-medium">
                {selectedStep.promotionCriteria && selectedStep.promotionCriteria.length > 0 ? (
                  selectedStep.promotionCriteria.map((crit, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                      <span>{crit}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                      <span>Eğitim sonu sınavında minimum %80 başarı skoru</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                      <span>Saha operasyon denetiminde %85 üzeri karne</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

          </div>

        </section>

      </div>
    </div>
  );
}
