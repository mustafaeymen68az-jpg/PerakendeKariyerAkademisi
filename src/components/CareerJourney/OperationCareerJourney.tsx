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
  Apple,
  Headphones,
  UserCheck,
  ShoppingBag,
  Truck,
  Cpu,
  Megaphone,
  ArrowRight,
  Crown
} from 'lucide-react';
import {
  CAREER_STEPS_15_DATA,
  CareerStep15,
  SCORING_WEIGHTS_15,
  CAREER_MOTTO
} from '@/data/careerSteps';

export default function OperationCareerJourney() {
  const [selectedStep, setSelectedStep] = useState<CareerStep15>(CAREER_STEPS_15_DATA[4]); // Default: Level 5 Mağaza Müdür Yardımcısı
  const [userCurrentLevelId, setUserCurrentLevelId] = useState<number>(5);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeView, setActiveView] = useState<'staircase' | 'grid'>('staircase');
  const [showPlanModal, setShowPlanModal] = useState(false);

  const openPositionDetails = (step: CareerStep15) => {
    setSelectedStep(step);
    setIsDrawerOpen(true);
  };

  // Helper function to render Lucide Icons dynamically by name
  const renderDepartmentIcon = (key: string) => {
    switch (key) {
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-[#087F96]" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#0B2A4A]" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-[#D97706]" />;
      case 'Users': return <Users className="w-5 h-5 text-[#34A853]" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-[#056B80]" />;
      case 'Truck': return <Truck className="w-5 h-5 text-[#8B5CF6]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#087F96]" />;
      case 'Megaphone': return <Megaphone className="w-5 h-5 text-rose-500" />;
      default: return <Briefcase className="w-5 h-5 text-gray-600" />;
    }
  };

  const currentUserStep = CAREER_STEPS_15_DATA.find((s) => s.id === userCurrentLevelId) || CAREER_STEPS_15_DATA[0];
  const nextTargetStep = CAREER_STEPS_15_DATA.find((s) => s.id === currentUserStep.nextCareerLevelId) || currentUserStep;

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-sans pb-24">
      {/* -------------------------------------------------- */}
      {/* HEADER SECTION */}
      {/* -------------------------------------------------- */}
      <section className="bg-gradient-to-b from-[#0B2A4A] via-[#061B33] to-[#0B2A4A] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#087F96]/30 relative overflow-hidden">
        {/* Background decorative glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#087F96]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#34A853]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          {/* Tag & View Switcher */}
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
                15 Basamak Merdiven Görünümü
              </button>
              <button
                onClick={() => setActiveView('grid')}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  activeView === 'grid'
                    ? 'bg-[#087F96] text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Kart Izgarası
              </button>
            </div>
          </div>

          {/* Main Titles */}
          <div className="max-w-4xl space-y-4">
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
              Kasadan CEO Koltuğuna <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#087F96] via-[#DDF4F7] to-[#34A853]">Kariyer Yolculuğu</span>
            </h1>
            <p className="text-[#DDF4F7] text-base sm:text-xl font-semibold leading-relaxed">
              {CAREER_MOTTO}
            </p>
          </div>

          {/* Core Motto Banner */}
          <div className="bg-[#061B33]/90 border border-[#087F96]/60 p-5 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-[#087F96] rounded-xl text-white shadow-md shrink-0">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-spin-slow" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#087F96] uppercase tracking-wider block font-extrabold">
                  Gelişim Felsefesi
                </span>
                <span className="font-display font-black text-sm sm:text-lg text-white tracking-wide">
                  Öğren <span className="text-[#087F96]">→</span> Uygula <span className="text-[#087F96]">→</span> Yetkinleş <span className="text-[#087F96]">→</span> Yönet <span className="text-[#087F96]">→</span> Liderlik Et <span className="text-[#087F96]">→</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">Geleceği Yönet</span>
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => openPositionDetails(CAREER_STEPS_15_DATA[0])}
                className="px-5 py-2.5 bg-white text-[#0B2A4A] hover:bg-[#DDF4F7] font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center space-x-1.5"
              >
                <span>1. Kasiyer</span>
                <ChevronRight className="w-4 h-4 text-[#087F96]" />
              </button>
              <button
                onClick={() => openPositionDetails(CAREER_STEPS_15_DATA[14])}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-lg hover:brightness-110 transition-all flex items-center space-x-1.5"
              >
                <Crown className="w-4 h-4 fill-current" />
                <span>15. CEO</span>
              </button>
            </div>
          </div>

          {/* Active Position Selector Strip */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono text-[#DDF4F7] uppercase font-bold">
                Mevcut Pozisyonunuzu Seçin:
              </span>
              <select
                value={userCurrentLevelId}
                onChange={(e) => setUserCurrentLevelId(Number(e.target.value))}
                className="bg-[#0B2A4A] border border-[#087F96] text-white text-xs font-extrabold px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087F96]"
              >
                {CAREER_STEPS_15_DATA.map((step) => (
                  <option key={step.id} value={step.id}>
                    {step.id}. {step.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4 text-xs font-semibold">
              <span className="flex items-center space-x-1 text-[#34A853]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Tamamlanan Basamaklar</span>
              </span>
              <span className="flex items-center space-x-1 text-[#087F96]">
                <Zap className="w-4 h-4 animate-pulse" />
                <span>Mevcut Seviyeniz</span>
              </span>
              <span className="flex items-center space-x-1 text-white">
                <Target className="w-4 h-4 text-amber-400" />
                <span>Sonraki Hedef</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* MAIN CONTAINER */}
      {/* -------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-12">

        {/* -------------------------------------------------- */}
        {/* 15 CAREER STEPS VISUAL MAP */}
        {/* -------------------------------------------------- */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200/80 space-y-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <span className="text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3.5 py-1 rounded-full uppercase tracking-wider">
                15 Basamaklı Kariyer Haritası
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0B2A4A] mt-2">
                Kasadan CEO Koltuğuna İlerleme Haritası
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Herhangi bir kariyer kartına tıklayarak <strong>"Buradan sonra nereye gidebilirim?"</strong> ve sonraki basamağın eğitimlerini görüntüleyin.
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs font-semibold">
              <span className="px-3 py-1 bg-emerald-50 text-[#34A853] rounded-lg border border-emerald-200">
                ✓ Tamamlandı
              </span>
              <span className="px-3 py-1 bg-[#DDF4F7] text-[#087F96] rounded-lg border border-[#087F96]">
                ● Mevcut
              </span>
              <span className="px-3 py-1 bg-[#0B2A4A] text-white rounded-lg">
                ▲ Sonraki Hedef
              </span>
            </div>
          </div>

          {activeView === 'staircase' ? (
            /* STAIRCASE VIEW (DESKTOP & MOBILE RESPONSIVE) */
            <div className="space-y-10">
              {/* Desktop 15 Steps Ascending Stairs */}
              <div className="hidden lg:block relative pt-14 pb-8 px-2 overflow-x-auto">
                <div className="grid grid-cols-15 gap-1.5 items-end min-h-[380px] min-w-[1100px]">
                  {CAREER_STEPS_15_DATA.map((step) => {
                    const isSelected = selectedStep.id === step.id;
                    const isUserCurrent = step.id === userCurrentLevelId;
                    const isCompleted = step.id < userCurrentLevelId;
                    const isNextTarget = step.id === userCurrentLevelId + 1;

                    // Height percentage ascending from 20% to 100%
                    const heightPercent = 20 + Math.round(((step.id - 1) / 14) * 80);

                    // Dynamic colors based on status
                    let cardBg = 'bg-[#F4F7F9] border-gray-300 text-[#0B2A4A] hover:bg-[#DDF4F7]';
                    let badgeBg = 'bg-gray-200 text-gray-700';

                    if (isCompleted) {
                      cardBg = 'bg-emerald-50 border-[#34A853] text-[#0B2A4A] hover:bg-emerald-100';
                      badgeBg = 'bg-[#34A853] text-white';
                    } else if (isUserCurrent) {
                      cardBg = 'bg-gradient-to-t from-[#087F96] to-[#056B80] border-white text-white shadow-xl ring-4 ring-[#087F96]/40 scale-105 z-20';
                      badgeBg = 'bg-white text-[#087F96]';
                    } else if (isNextTarget) {
                      cardBg = 'bg-[#0B2A4A] border-amber-400 text-white shadow-lg hover:brightness-110';
                      badgeBg = 'bg-amber-400 text-[#0B2A4A]';
                    } else if (step.id === 15) {
                      cardBg = 'bg-gradient-to-t from-slate-900 via-amber-950 to-slate-900 border-amber-400 text-white shadow-xl';
                      badgeBg = 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black';
                    }

                    return (
                      <div
                        key={step.id}
                        onClick={() => openPositionDetails(step)}
                        style={{ height: `${heightPercent}%` }}
                        className={`group cursor-pointer rounded-2xl p-2 border-2 transition-all duration-300 flex flex-col justify-between relative shadow-sm hover:-translate-y-2 hover:shadow-xl ${cardBg} ${
                          isSelected ? 'ring-4 ring-offset-2 ring-[#087F96] scale-105 z-30' : ''
                        }`}
                      >
                        {/* Header Badge */}
                        <div className="flex items-center justify-between text-[10px]">
                          <span className={`w-5 h-5 rounded-full font-mono font-black flex items-center justify-center ${badgeBg}`}>
                            {isCompleted ? '✓' : step.id}
                          </span>
                          {step.id === 15 ? (
                            <Crown className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
                          ) : (
                            <ArrowUp className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                          )}
                        </div>

                        {/* Title */}
                        <div className="my-auto text-center py-1">
                          <h3 className="font-display font-extrabold text-[10px] leading-tight tracking-tight line-clamp-3">
                            {step.title}
                          </h3>
                        </div>

                        {/* Footer button */}
                        <div className="text-[9px] text-center font-bold pt-1 border-t border-white/20 opacity-90 group-hover:opacity-100 flex items-center justify-center">
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
                    <span>BAŞLANGIÇ: 1. KASİYER (0-1 Yıl)</span>
                  </span>
                  <span className="text-gray-400 font-normal">
                    Tıkla ve "Buradan Sonra Nereye Gidebilirim?" Eğitimlerini İncele
                  </span>
                  <span className="flex items-center space-x-1.5 text-amber-600 font-extrabold">
                    <Crown className="w-4 h-4 text-amber-500" />
                    <span>ZİRVE: 15. CEO (Geleceği Tasarlama)</span>
                  </span>
                </div>
              </div>

              {/* Mobile Vertical Timeline (15 Steps) */}
              <div className="lg:hidden space-y-3">
                {CAREER_STEPS_15_DATA.map((step, idx) => {
                  const isSelected = selectedStep.id === step.id;
                  const isUserCurrent = step.id === userCurrentLevelId;
                  const isCompleted = step.id < userCurrentLevelId;
                  const isNextTarget = step.id === userCurrentLevelId + 1;

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
                  } else if (step.id === 15) {
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
                              <span className="text-[10px] font-mono opacity-80 uppercase block font-semibold">
                                {step.recommendedDuration}
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
            /* CARD GRID VIEW (15 Steps) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CAREER_STEPS_15_DATA.map((step) => {
                const isUserCurrent = step.id === userCurrentLevelId;
                const isCompleted = step.id < userCurrentLevelId;
                const isNextTarget = step.id === userCurrentLevelId + 1;

                return (
                  <div
                    key={step.id}
                    onClick={() => openPositionDetails(step)}
                    className={`border rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer space-y-4 flex flex-col justify-between group ${
                      isUserCurrent
                        ? 'bg-[#DDF4F7]/40 border-[#087F96] ring-2 ring-[#087F96]'
                        : isCompleted
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : isNextTarget
                        ? 'bg-[#0B2A4A] text-white border-amber-400'
                        : 'bg-[#F4F7F9] border-gray-200 hover:bg-white'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
                          isNextTarget ? 'bg-amber-400 text-[#0B2A4A]' : 'bg-white text-[#087F96] border-gray-200'
                        }`}>
                          {step.id}. BASAMAK
                        </span>
                        <span className="text-xs font-mono opacity-80">{step.recommendedDuration}</span>
                      </div>

                      <h3 className={`font-display font-bold text-lg ${isNextTarget ? 'text-white' : 'text-[#0B2A4A]'}`}>
                        {step.title}
                      </h3>

                      {step.badgeHeading && (
                        <p className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                          isNextTarget ? 'bg-white/10 text-amber-300' : 'bg-[#DDF4F7] text-[#087F96]'
                        }`}>
                          "{step.badgeHeading}"
                        </p>
                      )}

                      <p className={`text-xs line-clamp-3 leading-relaxed ${isNextTarget ? 'text-gray-300' : 'text-gray-600'}`}>
                        {step.purpose}
                      </p>
                    </div>

                    <div className={`pt-3 border-t flex items-center justify-between text-xs font-bold ${
                      isNextTarget ? 'border-white/20 text-amber-300' : 'border-gray-200 text-[#087F96]'
                    }`}>
                      <span>Sonraki Adım Eğitimleri</span>
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* -------------------------------------------------- */}
        {/* PROMOTION SYSTEM & SCORING MODEL */}
        {/* -------------------------------------------------- */}
        <section className="bg-gradient-to-br from-[#0B2A4A] to-[#061B33] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#087F96]/30 space-y-10 relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-[#DDF4F7] bg-[#087F96] px-3.5 py-1 rounded-full uppercase tracking-wider">
              Performans & Yetkinlik Odaklı Terfi
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl">
              Terfi Sadece Kıdeme Göre Değil, Yetkinliğe Göre
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
              Perakende Kariyer Akademisi'nde terfi kararları kişisel kanaatle değil; 100 puan üzerinden hesaplanan ağırlıklı değerlendirme formülü ile belirlenir.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Scoring Breakdown Bar Chart */}
            <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-md">
              <h3 className="text-xs font-mono font-bold text-[#DDF4F7] uppercase tracking-wider border-b border-white/10 pb-3">
                Ağırlıklı Terfi Puanlama Modeli (%100)
              </h3>

              <div className="space-y-3">
                {SCORING_WEIGHTS_15.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-white">{item.label}</span>
                      <span className="font-mono font-bold text-[#087F96]">%{item.percent}</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.percent * 3.33}%`, backgroundColor: item.color === '#0B2A4A' ? '#087F96' : item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formula Visual */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#087F96]/30 to-[#34A853]/20 border border-[#087F96]/40 p-6 rounded-2xl space-y-4 text-center">
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider block">
                Görsel Terfi Formülü
              </span>
              <div className="text-xs font-bold space-y-2 text-white">
                <div className="bg-white/10 p-2 rounded-lg">KPI (%30) + Saha Yetkinliği (%25)</div>
                <div className="bg-white/10 p-2 rounded-lg">+ Eğitim & Sınav (%15) + Değerlendirme (%15)</div>
                <div className="bg-white/10 p-2 rounded-lg">+ Final Projesi (%10) + Kültür (%5)</div>
              </div>
              <div className="pt-2">
                <span className="inline-block bg-[#34A853] text-white font-black text-sm px-6 py-2.5 rounded-xl shadow-lg">
                  = %80+ TERFİYE HAZIR CANDIDATE
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- */}
        {/* PERSONAL CAREER DASHBOARD MOCKUP */}
        {/* -------------------------------------------------- */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200/80 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <span className="text-xs font-bold text-[#34A853] bg-emerald-50 px-3.5 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
                Canlı Kişisel Panel
              </span>
              <h3 className="font-display font-extrabold text-2xl text-[#0B2A4A] mt-2">
                Kişisel Terfi Hazırlık Paneli
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Sisteme giriş yapan çalışanın anlık terfi hazırlık skoru ve sonraki basamak gelişim verileri.
              </p>
            </div>

            <button
              onClick={() => openPositionDetails(currentUserStep)}
              className="px-6 py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl shadow-md transition-all text-xs flex items-center space-x-2 shrink-0"
            >
              <span>Sonraki Basamak Eğitimlerini Gör</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Box 1 */}
            <div className="bg-[#F4F7F9] border border-gray-200 rounded-2xl p-5 space-y-2">
              <span className="text-[11px] font-mono text-gray-500 font-bold block">MEVCUT & SONRAKİ HEDEF</span>
              <div className="space-y-1">
                <div className="text-xs text-gray-700">Mevcut: <strong className="text-[#0B2A4A]">{currentUserStep.title}</strong></div>
                <div className="text-xs text-[#087F96] font-bold">Sonraki: <span className="bg-[#087F96] text-white px-2 py-0.5 rounded text-[11px] font-extrabold">{currentUserStep.nextCareerLevel}</span></div>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-[#F4F7F9] border border-gray-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-gray-500">
                <span>TERFİ HAZIRLIK ORANI</span>
                <span className="text-[#34A853] font-black text-sm">%83</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-gradient-to-r from-[#087F96] to-[#34A853] rounded-full w-[83%]" />
              </div>
              <span className="text-[10px] text-gray-500 block pt-1">Hedef: %80+ Terfiye Hazır</span>
            </div>

            {/* Box 3 */}
            <div className="bg-[#F4F7F9] border border-gray-200 rounded-2xl p-5 space-y-2">
              <span className="text-[11px] font-mono text-gray-500 font-bold block">SONRAKİ SEVİYE EĞİTİMLERİ</span>
              <div className="flex items-baseline space-x-2">
                <span className="font-display font-black text-2xl text-[#0B2A4A]">{currentUserStep.requiredTrainingForNextLevel.length}</span>
                <span className="text-xs text-gray-500">Modül Eğitim</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold block">Gerekli Yetkinlikler Hazırlandı</span>
            </div>

            {/* Box 4 */}
            <div className="bg-[#F4F7F9] border border-gray-200 rounded-2xl p-5 space-y-2">
              <span className="text-[11px] font-mono text-gray-500 font-bold block">PERFORMANS SKORLARI</span>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">KPI Skoru:</span>
                  <span className="font-bold text-[#34A853]">%84</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saha Yetkinliği:</span>
                  <span className="font-bold text-[#087F96]">4.2 / 5</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* -------------------------------------------------- */}
      {/* KRİTİK UX: SLIDE-OVER DETAIL DRAWER MODAL */}
      {/* -------------------------------------------------- */}
      {isDrawerOpen && selectedStep && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto flex flex-col justify-between relative border-l border-gray-200">
            
            {/* Drawer Header */}
            <div className="bg-[#0B2A4A] text-white p-6 sm:p-8 space-y-3 sticky top-0 z-20 border-b border-[#087F96]/40">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-[#DDF4F7] bg-[#087F96] px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedStep.id} / 15 BASAMAK DETAYI
                </span>

                <div className="flex items-center space-x-2">
                  {selectedStep.id > 1 && (
                    <button
                      onClick={() => {
                        const prev = CAREER_STEPS_15_DATA.find((s) => s.id === selectedStep.id - 1);
                        if (prev) setSelectedStep(prev);
                      }}
                      className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-gray-200 transition-colors"
                    >
                      ← {selectedStep.id - 1}. Adım
                    </button>
                  )}
                  {selectedStep.id < 15 && (
                    <button
                      onClick={() => {
                        const next = CAREER_STEPS_15_DATA.find((s) => s.id === selectedStep.id + 1);
                        if (next) setSelectedStep(next);
                      }}
                      className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-black transition-colors"
                    >
                      {selectedStep.id + 1}. Adım →
                    </button>
                  )}
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors ml-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  {selectedStep.title}
                </h3>
                {selectedStep.badgeHeading && (
                  <p className="text-xs text-[#DDF4F7] font-semibold mt-1 italic">
                    "{selectedStep.badgeHeading}"
                  </p>
                )}
              </div>
            </div>

            {/* Drawer Content */}
            <div className="p-6 sm:p-8 space-y-8 flex-1">

              {/* -------------------------------------------------- */}
              {/* KRİTİK UX KURALI: EN ÜSTTE İLK GÖRÜNEN ALAN */}
              {/* -------------------------------------------------- */}
              <div className="bg-gradient-to-br from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white p-6 rounded-3xl shadow-xl space-y-6 border border-amber-400/40">
                
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-amber-400 text-slate-950 rounded-xl font-bold shadow-md">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-300 font-extrabold uppercase tracking-widest block">
                      GELECEK KARİYER ADIMI
                    </span>
                    <h4 className="font-display font-black text-xl text-white">
                      Buradan sonra nereye gidebilirim?
                    </h4>
                  </div>
                </div>

                {/* Target Position Box */}
                <div className="bg-white/10 border border-white/20 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] font-mono text-gray-300 block font-semibold">
                    SONRAKİ KARİYER BASAMAĞI
                  </span>
                  <div className="font-display font-black text-xl text-amber-300 flex items-center space-x-2">
                    <span>{selectedStep.nextCareerLevel}</span>
                    <ArrowRight className="w-5 h-5 text-amber-400" />
                  </div>
                </div>

                {/* REQUIRED TRAININGS FOR NEXT LEVEL (Critical Feature) */}
                <div className="space-y-3">
                  <h5 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>{selectedStep.nextCareerLevel} İçin Almanız Gereken Eğitimler ({selectedStep.requiredTrainingForNextLevel.length})</span>
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedStep.requiredTrainingForNextLevel.map((trg, idx) => (
                      <Link
                        key={idx}
                        href={`/egitimler?search=${encodeURIComponent(trg)}`}
                        className="flex items-center justify-between text-xs text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-xl border border-white/10 transition-all group"
                      >
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-[#34A853] shrink-0" />
                          <span className="font-medium group-hover:text-amber-300 transition-colors">{trg}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* NEXT COMPETENCIES */}
                <div className="space-y-2 pt-2 border-t border-white/15">
                  <h5 className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Sonraki Basamakta Kazanılacak Yetkinlikler</span>
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedStep.nextCompetencies.map((cmp, idx) => (
                      <span key={idx} className="text-xs bg-emerald-950/80 text-emerald-200 font-semibold px-3 py-1 rounded-lg border border-emerald-500/30">
                        + {cmp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  {selectedStep.id < 15 && (
                    <button
                      type="button"
                      onClick={() => {
                        const nextStep = CAREER_STEPS_15_DATA.find((s) => s.id === selectedStep.nextCareerLevelId);
                        if (nextStep) {
                          setSelectedStep(nextStep);
                        }
                      }}
                      className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 font-black rounded-xl shadow-lg transition-all text-center text-xs sm:text-sm flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Sonraki Basamağa İlerle: {selectedStep.nextCareerLevel}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  <Link
                    href={`/egitimler?search=${encodeURIComponent(selectedStep.nextCareerLevel.replace(/\//g, ' '))}`}
                    className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-all text-center flex items-center justify-center space-x-1.5 border border-white/20"
                  >
                    <BookOpen className="w-4 h-4 text-amber-300" />
                    <span>{selectedStep.nextCareerLevel} Modüllerini Katalogda Gör</span>
                  </Link>
                </div>
              </div>

              {/* -------------------------------------------------- */}
              {/* MEVCUT POZİSYON DETAYLARI (ŞU ANKİ SEVİYENİZ) */}
              {/* -------------------------------------------------- */}
              <div className="space-y-6 pt-4 border-t-2 border-dashed border-gray-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-extrabold text-lg text-[#0B2A4A]">
                    ŞU ANKİ SEVİYENİZ ({selectedStep.id} / 15)
                  </h4>
                  <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                    {selectedStep.recommendedDuration}
                  </span>
                </div>

                {/* Purpose */}
                <div className="space-y-1 bg-[#F4F7F9] p-4 rounded-2xl border border-gray-200">
                  <span className="text-[11px] font-mono font-bold text-gray-500 block">ROLÜN AMACI</span>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                    {selectedStep.purpose}
                  </p>
                </div>

                {/* Special View for Level 4: Rotation Program */}
                {selectedStep.rotationProgram && (
                  <div className="bg-gradient-to-br from-[#0B2A4A] to-[#087F96] text-white p-5 rounded-2xl space-y-4">
                    <span className="text-xs font-mono font-bold text-amber-300 uppercase block">
                      {selectedStep.rotationProgram.title}
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedStep.rotationProgram.stages.map((stg, idx) => (
                        <div key={idx} className="bg-white/10 p-3 rounded-xl border border-white/10 text-center space-y-1">
                          <span className="font-mono font-bold text-amber-300 text-xs block">{idx + 1}. {stg.name}</span>
                          <span className="text-[10px] text-gray-200 block">{stg.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Special View for Level 6: Promotion Readiness Scorecard */}
                {selectedStep.promotionReadinessScorecard && (
                  <div className="bg-[#0B2A4A] text-white p-5 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-xs font-mono font-bold text-[#DDF4F7]">TERFİYE HAZIRLIK DEĞERLENDİRMESİ</span>
                      <span className="font-mono font-black text-lg text-amber-400">
                        SKOR: %{selectedStep.promotionReadinessScorecard.totalScore}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-white/10 p-2.5 rounded-lg flex justify-between">
                        <span>Eğitim:</span>
                        <strong className="text-emerald-400">%{selectedStep.promotionReadinessScorecard.trainingScore}</strong>
                      </div>
                      <div className="bg-white/10 p-2.5 rounded-lg flex justify-between">
                        <span>KPI:</span>
                        <strong className="text-emerald-400">%{selectedStep.promotionReadinessScorecard.kpiScore}</strong>
                      </div>
                      <div className="bg-white/10 p-2.5 rounded-lg flex justify-between">
                        <span>Saha Yetkinliği:</span>
                        <strong className="text-emerald-400">%{selectedStep.promotionReadinessScorecard.fieldCompetencyScore}</strong>
                      </div>
                      <div className="bg-white/10 p-2.5 rounded-lg flex justify-between">
                        <span>Final Proje:</span>
                        <strong className="text-amber-300">%{selectedStep.promotionReadinessScorecard.finalProjectScore}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Special View for Level 14: Department Icons */}
                {selectedStep.departmentIcons && (
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-[#0B2A4A] uppercase block">
                      Yönetilecek Şirket Departmanları (8 Disiplin)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {selectedStep.departmentIcons.map((dept, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 p-3 rounded-xl flex items-center space-x-2.5 shadow-2xs">
                          {renderDepartmentIcon(dept.key)}
                          <span className="text-xs font-bold text-[#0B2A4A]">{dept.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Special View for Level 15: CEO Focus Areas */}
                {selectedStep.ceoFocusAreas && (
                  <div className="bg-gradient-to-br from-slate-900 to-amber-950 text-white p-6 rounded-3xl space-y-4 border border-amber-400/40">
                    <div className="flex items-center space-x-2 text-amber-400">
                      <Crown className="w-6 h-6 fill-current" />
                      <h4 className="font-display font-black text-lg">CEO Prestij Paneli</h4>
                    </div>
                    <p className="text-xs text-gray-300">
                      CEO kariyer yolculuğunun sonu değil, yeni bir liderlik seviyesinin başlangıcıdır.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                      {selectedStep.ceoFocusAreas.map((area, idx) => (
                        <div key={idx} className="bg-white/10 p-2.5 rounded-xl border border-white/10 text-center">
                          <span className="font-bold text-amber-300 text-xs block">{area.title}</span>
                          <span className="text-[9px] text-gray-300 block">{area.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Current Competencies & KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h5 className="text-xs font-mono font-bold text-gray-500 uppercase">Mevcut Yetkinlikler</h5>
                    <div className="space-y-1">
                      {selectedStep.competencies.map((cmp, idx) => (
                        <div key={idx} className="text-xs text-gray-700 bg-white p-2 rounded-lg border border-gray-200 flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#087F96]" />
                          <span>{cmp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-xs font-mono font-bold text-gray-500 uppercase">Takip Edilen KPI'lar</h5>
                    <div className="space-y-1">
                      {selectedStep.kpis.map((kpi, idx) => (
                        <div key={idx} className="text-xs text-gray-700 bg-white p-2 rounded-lg border border-gray-200 flex items-center space-x-2">
                          <Target className="w-3.5 h-3.5 text-[#34A853] shrink-0" />
                          <span>{kpi}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Current Trainings */}
                <div className="space-y-2">
                  <h5 className="text-xs font-mono font-bold text-gray-500 uppercase">
                    Bu Pozisyonun Mevcut Eğitimleri ({selectedStep.currentTrainings.length})
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedStep.currentTrainings.map((trg, idx) => (
                      <span key={idx} className="text-xs bg-[#F4F7F9] text-gray-700 font-semibold px-2.5 py-1 rounded-lg border border-gray-200">
                        {trg}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200 sticky bottom-0 z-20 flex items-center justify-between gap-4">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-100 font-bold rounded-xl text-xs"
              >
                Kapat
              </button>
              <Link
                href="/egitimler"
                className="px-6 py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl shadow-md transition-all text-xs flex items-center space-x-1.5"
              >
                <span>Tüm Eğitim Kataloğunda Aç</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
