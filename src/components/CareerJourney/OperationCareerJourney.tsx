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
  Database
} from 'lucide-react';
import {
  ALL_CAREER_TRACKS_15,
  CareerTrack15,
  CareerStep15,
  SCORING_WEIGHTS_15,
  CAREER_MOTTO
} from '@/data/careerSteps';

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

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-sans pb-24">
      {/* -------------------------------------------------- */}
      {/* HEADER SECTION */}
      {/* -------------------------------------------------- */}
      <section className="bg-gradient-to-b from-[#0B2A4A] via-[#061B33] to-[#0B2A4A] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#087F96]/30 relative overflow-hidden">
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

      {/* -------------------------------------------------- */}
      {/* MAIN CONTENT AREA */}
      {/* -------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-12">

        {/* -------------------------------------------------- */}
        {/* DYNAMIC STEP COUNT STAIRCASE CAREER MAP SECTION */}
        {/* -------------------------------------------------- */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200/80 space-y-8 relative overflow-hidden" id="15-basamakli-harita">
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
                Herhangi bir kariyer kartına tıklayarak <strong>"Buradan sonra nereye gidebilirim?"</strong> ve sonraki basamağın eğitimlerini görüntüleyin.
              </p>
            </div>

            {/* Status Legend Badges */}
            <div className="flex items-center space-x-2 text-xs font-semibold">
              <span className="px-3 py-1 bg-emerald-50 text-[#34A853] rounded-lg border border-emerald-200">
                ✓ Tamamlandı
              </span>
              <span className="px-3 py-1 bg-[#DDF4F7] text-[#087F96] rounded-lg border border-[#087F96]">
                ● Mevcut
              </span>
              <span className="px-3 py-1 bg-[#0B2A4A] text-white rounded-lg border border-amber-400">
                ▲ Sonraki Hedef
              </span>
            </div>
          </div>

          {activeView === 'staircase' ? (
            /* DYNAMIC STAIRCASE VIEW (ADAPTS TO 7, 8, OR 15 STEPS NATURALLY) */
            <div className="space-y-10">
              {/* Desktop Dynamic Ascending Stairs */}
              <div className="hidden lg:block relative pt-16 pb-8 px-2 overflow-x-auto">
                <div 
                  className="grid gap-2 items-end min-h-[400px] min-w-[850px]"
                  style={{ gridTemplateColumns: `repeat(${totalStepsInTrack}, minmax(0, 1fr))` }}
                >
                  {activeTrack.steps.map((step) => {
                    const isSelected = selectedStep.id === step.id;
                    const isUserCurrent = step.id === userCurrentLevelId;
                    const isCompleted = step.id < userCurrentLevelId;
                    const isNextTarget = step.id === userCurrentLevelId + 1;
                    const isPeak = step.id === totalStepsInTrack;

                    // Height percentage ascending dynamically based on step count
                    const heightPercent = 25 + Math.round(((step.id - 1) / Math.max(totalStepsInTrack - 1, 1)) * 75);

                    // Dynamic colors based on status matching screenshot
                    let cardBg = 'bg-[#F4F7F9] border-gray-300 text-[#0B2A4A] hover:bg-[#DDF4F7] hover:border-[#087F96]';
                    let badgeBg = 'bg-gray-200 text-gray-700';

                    if (isCompleted) {
                      cardBg = 'bg-emerald-50 border-[#34A853] text-[#0B2A4A] hover:bg-emerald-100';
                      badgeBg = 'bg-[#34A853] text-white';
                    } else if (isUserCurrent) {
                      cardBg = 'bg-gradient-to-t from-[#087F96] to-[#056B80] border-white text-white shadow-xl ring-4 ring-[#087F96]/40 scale-105 z-20';
                      badgeBg = 'bg-white text-[#087F96]';
                    } else if (isNextTarget) {
                      cardBg = 'bg-[#0B2A4A] border-amber-400 text-white shadow-lg hover:brightness-110 ring-2 ring-amber-400/50';
                      badgeBg = 'bg-amber-400 text-[#0B2A4A] font-black';
                    } else if (isPeak) {
                      cardBg = 'bg-gradient-to-t from-slate-900 via-amber-950 to-slate-900 border-amber-400 text-white shadow-xl';
                      badgeBg = 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black';
                    }

                    return (
                      <div
                        key={step.id}
                        onClick={() => openPositionDetails(step)}
                        style={{ height: `${heightPercent}%` }}
                        className={`group cursor-pointer rounded-2xl p-2.5 border-2 transition-all duration-300 flex flex-col justify-between relative shadow-sm hover:-translate-y-2 hover:shadow-xl ${cardBg} ${
                          isSelected ? 'ring-4 ring-offset-2 ring-[#087F96] scale-105 z-30' : ''
                        }`}
                      >
                        {/* DURATION BADGE FLOATING DIRECTLY ABOVE TOP EDGE OF EACH STAIRCASE CARD */}
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap z-20 pointer-events-none">
                          <span className="text-[10px] font-black text-[#0B2A4A] bg-white border border-[#087F96]/40 px-2 py-0.5 rounded-full shadow-md font-mono flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-[#087F96]" />
                            <span>{step.recommendedDuration}</span>
                          </span>
                        </div>

                        {/* Header Badge */}
                        <div className="flex items-center justify-between text-[11px]">
                          <span className={`w-6 h-6 rounded-full font-mono font-black flex items-center justify-center ${badgeBg}`}>
                            {isCompleted ? '✓' : step.id}
                          </span>
                          {isPeak ? (
                            <Crown className="w-4 h-4 text-yellow-300 animate-bounce" />
                          ) : (
                            <ArrowUp className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                          )}
                        </div>

                        {/* Title & Duration */}
                        <div className="my-auto text-center py-1 space-y-1">
                          <h3 className="font-display font-extrabold text-[11px] leading-tight tracking-tight line-clamp-3">
                            {step.title}
                          </h3>
                          <div className="text-[9px] font-extrabold opacity-80 flex items-center justify-center space-x-0.5 font-mono">
                            <span>⏱️ {step.recommendedDuration}</span>
                          </div>
                        </div>

                        {/* Footer button */}
                        <div className="text-[10px] text-center font-extrabold pt-1.5 border-t border-white/20 opacity-90 group-hover:opacity-100 flex items-center justify-center">
                          <span>Detay</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Axis Label */}
                <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-500 pt-6 border-t border-gray-100">
                  <span className="flex items-center space-x-1.5 text-[#087F96]">
                    <Clock className="w-4 h-4" />
                    <span>BAŞLANGIÇ: {activeTrack.startRole}</span>
                  </span>
                  <span className="text-gray-400 font-normal">
                    Tıkla ve "Buradan Sonra Nereye Gidebilirim?" Eğitimlerini İncele
                  </span>
                  <span className="flex items-center space-x-1.5 text-amber-600 font-extrabold">
                    <Crown className="w-4 h-4 text-amber-500" />
                    <span>ZİRVE: {activeTrack.peakRole}</span>
                  </span>
                </div>
              </div>

              {/* Mobile Vertical Timeline */}
              <div className="lg:hidden space-y-3">
                {activeTrack.steps.map((step, idx) => {
                  const isSelected = selectedStep.id === step.id;
                  const isUserCurrent = step.id === userCurrentLevelId;
                  const isCompleted = step.id < userCurrentLevelId;
                  const isNextTarget = step.id === userCurrentLevelId + 1;
                  const isPeak = step.id === totalStepsInTrack;

                  let mobileBg = 'bg-white border-gray-200 text-[#0B2A4A]';
                  let badgeStyle = 'bg-gray-100 text-gray-700';

                  if (isCompleted) {
                    mobileBg = 'bg-emerald-50 border-[#34A853] text-[#0B2A4A]';
                    badgeStyle = 'bg-[#34A853] text-white';
                  } else if (isUserCurrent) {
                    mobileBg = 'bg-[#087F96] border-[#087F96] text-white shadow-lg';
                    badgeStyle = 'bg-white text-[#087F96]';
                  } else if (isNextTarget) {
                    mobileBg = 'bg-[#0B2A4A] border-amber-400 text-white';
                    badgeStyle = 'bg-amber-400 text-[#0B2A4A]';
                  } else if (isPeak) {
                    mobileBg = 'bg-gradient-to-r from-slate-900 to-amber-950 border-amber-400 text-white';
                    badgeStyle = 'bg-amber-400 text-slate-950';
                  }

                  return (
                    <div key={step.id} className="relative">
                      {idx > 0 && (
                        <div className="flex items-center justify-center -mt-1.5 mb-1.5 text-[#087F96]">
                          <ChevronUp className="w-4 h-4 text-[#087F96]" />
                        </div>
                      )}

                      <div
                        onClick={() => openPositionDetails(step)}
                        className={`rounded-2xl p-4 border-2 shadow-sm cursor-pointer transition-all ${mobileBg} ${
                          isSelected ? 'ring-4 ring-[#087F96] ring-offset-2 scale-[1.01]' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className={`w-8 h-8 rounded-xl font-mono font-extrabold text-xs flex items-center justify-center shadow-inner ${badgeStyle}`}>
                              {isCompleted ? '✓' : `#${step.id}`}
                            </span>
                            <div>
                              <span className="text-[10px] font-mono opacity-90 uppercase font-black text-amber-500 bg-black/10 px-2 py-0.5 rounded-full inline-block mb-0.5">
                                ⏱️ {step.recommendedDuration}
                              </span>
                              <h3 className="font-display font-extrabold text-sm sm:text-base">
                                {step.title}
                              </h3>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 text-xs font-bold px-3 py-1 bg-white/10 rounded-lg">
                            <span>Eğitimler</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* GRID VIEW */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeTrack.steps.map((step) => {
                const isSelected = selectedStep.id === step.id;

                return (
                  <div
                    key={step.id}
                    onClick={() => openPositionDetails(step)}
                    className={`bg-white rounded-2xl p-5 border-2 shadow-sm cursor-pointer transition-all hover:shadow-md ${
                      isSelected ? 'border-[#087F96] ring-2 ring-[#087F96]' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="w-8 h-8 rounded-xl bg-[#0B2A4A] text-white font-extrabold text-xs flex items-center justify-center">
                        #{step.id}
                      </span>
                      <span className="text-xs text-[#087F96] font-bold bg-[#DDF4F7] px-2 py-0.5 rounded-md font-mono">⏱️ {step.recommendedDuration}</span>
                    </div>

                    <h3 className="font-extrabold text-base text-[#0B2A4A] mb-1">{step.title}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-4">{step.purpose}</p>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#087F96]">
                      <span>Eğitim ve Yetkinlikleri Göster</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* -------------------------------------------------- */}
      {/* POSITION DETAILS DRAWER / MODAL */}
      {/* -------------------------------------------------- */}
      {isDrawerOpen && selectedStep && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in duration-200 space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-gray-200 pb-4">
              <div className="inline-flex items-center space-x-2 bg-[#087F96]/10 text-[#087F96] px-3.5 py-1 rounded-full text-xs font-extrabold mb-2">
                <span>{activeTrack.name} • Basamak #{selectedStep.id}</span>
                <span>•</span>
                <span>⏱️ Ortalama Süre: {selectedStep.recommendedDuration}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0B2A4A]">{selectedStep.title} Kariyer Kartı</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">{selectedStep.purpose}</p>
            </div>

            {/* Highlight: Buradan Sonra Nereye Gidebilirim? */}
            <div className="p-4 bg-[#0B2A4A] text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-[#087F96]/40 shadow-lg">
              <div>
                <span className="text-[10px] text-amber-300 font-extrabold uppercase tracking-wider block">
                  Buradan Sonra Nereye Gidebilirim?
                </span>
                <div className="font-extrabold text-base text-white mt-0.5">
                  → {selectedStep.nextCareerLevel}
                </div>
              </div>
              <button
                onClick={() => {
                  const nextStep = activeTrack.steps.find(s => s.id === selectedStep.nextCareerLevelId);
                  if (nextStep) setSelectedStep(nextStep);
                }}
                className="px-4 py-2 bg-[#087F96] hover:bg-[#056B80] text-white text-xs font-bold rounded-xl shadow transition-all flex items-center space-x-1"
              >
                <span>Sonraki Basamağı İncele</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Required Next-Level Trainings (Checklist) */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-[#0B2A4A] uppercase tracking-wider flex items-center">
                <BookOpen className="w-4 h-4 text-[#087F96] mr-1.5" />
                Sonraki Basamağa Geçmek İçin Alınması Gereken Eğitimler ({selectedStep.requiredTrainingForNextLevel?.length || 0})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedStep.requiredTrainingForNextLevel?.map((course, idx) => (
                  <div key={idx} className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-center space-x-2 text-blue-950 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#087F96] flex-shrink-0" />
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical & Behavioral Competencies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                <h5 className="font-bold text-emerald-900 uppercase tracking-wider flex items-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5" />
                  Mevcut Yetkinlikler
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStep.competencies.map((comp, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white text-emerald-800 font-bold rounded-lg border border-emerald-200">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl space-y-2">
                <h5 className="font-bold text-purple-900 uppercase tracking-wider flex items-center">
                  <Sparkles className="w-4 h-4 text-purple-600 mr-1.5" />
                  Hedeflenen Yetkinlikler
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStep.nextCompetencies.map((comp, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white text-purple-900 font-bold rounded-lg border border-purple-200">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* KPIs */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-gray-700 uppercase tracking-wider flex items-center">
                <Target className="w-4 h-4 text-rose-600 mr-1.5" />
                Takip Edilen KPI'lar ve Terfi Kriterleri
              </h4>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-1">
                {selectedStep.kpis.map((kpi, i) => (
                  <div key={i} className="flex items-center text-gray-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#087F96] mr-2" />
                    <span>{kpi}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-colors"
              >
                Kapat
              </button>

              <Link
                href="/egitimler"
                className="w-full sm:w-auto px-8 py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white font-extrabold rounded-xl text-xs shadow-lg transition-all text-center flex items-center justify-center space-x-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Eğitimlere Başla</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
