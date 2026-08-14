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
  Calendar
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
  const [selectedStep, setSelectedStep] = useState<CareerStep15>(activeTrack.steps[Math.min(4, activeTrack.steps.length - 1)]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'staircase' | 'grid'>('staircase');

  const handleTrackChange = (trackId: string) => {
    setActiveTrackId(trackId);
    const newTrack = ALL_CAREER_TRACKS_15.find(t => t.id === trackId) || ALL_CAREER_TRACKS_15[0];
    const defaultStep = newTrack.steps.find(s => s.id === userCurrentLevelId) || newTrack.steps[0];
    setSelectedStep(defaultStep);
  };

  const openPositionDetails = (step: CareerStep15) => {
    setSelectedStep(step);
    setIsDrawerOpen(true);
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
      {/* -------------------------------------------------- */}
      {/* TOP HEADER SECTION WITH CARRIER TRACK SELECTOR */}
      {/* -------------------------------------------------- */}
      <section id="kariyer-haritasi" className="bg-gradient-to-b from-[#0B2A4A] via-[#061B33] to-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#087F96]/30 relative overflow-hidden scroll-mt-6">
        {/* Background glow */}
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

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-12">

        {/* DYNAMIC STEP COUNT STAIRCASE CAREER MAP SECTION */}
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
                Herhangi bir kariyer kartına tıklayarak "Buradan sonra nereye gidebilirim?" ve sonraki basamağın eğitimlerini görüntüleyin.
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
                <span>Mevcut</span>
              </div>
              <div className="flex items-center space-x-1 bg-slate-900 text-white px-3 py-1.5 rounded-xl font-bold">
                <ArrowUp className="w-3.5 h-3.5 text-amber-300" />
                <span>Sonraki Hedef</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC TIME & TARGET DATE DASHBOARD BANNER */}
          <div className="bg-gradient-to-r from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white p-6 rounded-2xl shadow-lg border border-[#087F96]/40 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
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

            {/* Remaining Duration from Selected Step to Peak */}
            <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/15 pt-3 md:pt-0 md:pl-6">
              <div className="text-[10px] uppercase font-bold text-gray-300 tracking-wider flex items-center space-x-1">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span>Seçilen Pozisyondan Zirveye Kalan Süre</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-300 font-mono">
                {formatYearsMonths(remainingMinMonths)}
              </div>
              <div className="text-[10px] text-gray-300">
                Seçilen: {activeTrack.steps[effectiveCurrentIndex]?.title || 'Kasiyer'}
              </div>
            </div>

            {/* Estimated Peak Reaching Month/Year */}
            <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/15 pt-3 md:pt-0 md:pl-6">
              <div className="text-[10px] uppercase font-bold text-gray-300 tracking-wider flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-yellow-300" />
                <span>Tahmini Zirveye Ulaşım Tarihi</span>
              </div>
              <div className="text-lg sm:text-xl font-black text-yellow-300 font-mono">
                {minTargetDateStr} – {maxTargetDateStr}
              </div>
              <div className="text-[10px] text-gray-300">
                Planlanan Dönem: Ağustos 2026 Başlangıçlı
              </div>
            </div>
          </div>

          {/* DYNAMIC STAIRCASE MAP DISPLAY */}
          {activeView === 'staircase' ? (
            <div className="overflow-x-auto pb-6 custom-scrollbar">
              <div className="min-w-[1100px] flex items-end justify-between gap-2.5 pt-12 pb-4 px-2 relative min-h-[460px]">

                {/* Horizontal Baseline */}
                <div className="absolute bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-gray-200 via-[#087F96]/30 to-[#0B2A4A] rounded-full" />

                {activeTrack.steps.map((step, idx) => {
                  const isCurrent = step.id === userCurrentLevelId;
                  const isCompleted = step.id < userCurrentLevelId;
                  const isNextTarget = step.id === userCurrentLevelId + 1;
                  const isPeak = idx === totalStepsInTrack - 1;

                  // Staircase height calculation
                  const stepHeight = 120 + Math.round((idx / (totalStepsInTrack - 1)) * 260);

                  return (
                    <div
                      key={step.id}
                      onClick={() => openPositionDetails(step)}
                      style={{ height: `${stepHeight}px` }}
                      className={`relative flex-1 rounded-2xl p-3 flex flex-col justify-between cursor-pointer transition-all duration-300 group border-2 ${
                        isCurrent
                          ? 'bg-[#087F96] text-white border-white ring-4 ring-[#087F96]/40 shadow-2xl scale-105 z-20'
                          : isNextTarget
                          ? 'bg-slate-900 text-white border-amber-400 shadow-xl z-10 hover:scale-105'
                          : isCompleted
                          ? 'bg-emerald-50 text-emerald-950 border-emerald-300 hover:bg-emerald-100'
                          : isPeak
                          ? 'bg-gradient-to-t from-[#0B2A4A] to-slate-900 text-white border-amber-400 shadow-2xl hover:scale-105'
                          : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                      }`}
                    >
                      {/* Step Number Badge */}
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                        <span className={`px-2 py-0.5 rounded-full ${
                          isCurrent ? 'bg-white text-[#0B2A4A]' : 'bg-black/20 text-white'
                        }`}>
                          {idx + 1}. Basamak ↑
                        </span>

                        {isPeak && (
                          <Crown className="w-4 h-4 text-amber-300 animate-bounce" />
                        )}
                      </div>

                      {/* Title & Duration */}
                      <div className="my-auto space-y-1 text-center">
                        <h3 className="font-extrabold text-xs leading-snug line-clamp-2">
                          {step.title}
                        </h3>
                        <span className={`text-[9px] font-mono block ${
                          isCurrent ? 'text-amber-200' : 'text-gray-500'
                        }`}>
                          ⏱️ {step.recommendedDuration}
                        </span>
                      </div>

                      {/* Action Button */}
                      <button className={`w-full py-1 rounded-xl text-[10px] font-black transition-all ${
                        isCurrent 
                          ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}>
                        Detay
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
                  onClick={() => openPositionDetails(step)}
                  className="p-6 bg-white border-2 border-gray-200 rounded-3xl shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group cursor-pointer hover:border-[#087F96]"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#087F96] bg-[#DDF4F7] px-2.5 py-0.5 rounded-full">
                        {idx + 1}. Basamak
                      </span>
                      <span className="text-xs font-mono text-gray-500">⏱️ {step.recommendedDuration}</span>
                    </div>
                    <h3 className="font-extrabold text-base text-[#0B2A4A] group-hover:text-[#087F96] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">{step.purpose}</p>
                  </div>

                  <button className="w-full py-2 bg-[#087F96] text-white font-bold rounded-xl text-xs hover:bg-[#056B80]">
                    Ders & Yetkinlikleri Göster
                  </button>
                </div>
              ))}
            </div>
          )}

        </section>

      </div>
    </div>
  );
}
