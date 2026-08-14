'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  Sparkles, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  RotateCcw,
  Building2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Calendar,
  Layers,
  FileText
} from 'lucide-react';
import { ALL_CAREER_TRACKS_15, CareerStep15 } from '@/data/careerSteps';

interface PositionOption {
  id: string;
  name: string;
  category: string;
  level: number;
}

const POSITION_OPTIONS: PositionOption[] = [
  { id: 'kasiyer', name: 'Kasiyer', category: 'Mağaza Operasyonu', level: 1 },
  { id: 'kidemli-kasiyer', name: 'Kıdemli Kasiyer / Kasa Sorumlusu', category: 'Mağaza Operasyonu', level: 2 },
  { id: 'reyon-elemani', name: 'Reyon Elemanı', category: 'Mağaza Operasyonu', level: 1 },
  { id: 'reyon-sefi', name: 'Reyon Şefi', category: 'Mağaza Operasyonu', level: 3 },
  { id: 'takim-lideri', name: 'Takım Lideri / Vardiya Şefi', category: 'Mağaza Operasyonu', level: 3 },
  { id: 'mudur-yardimcisi', name: 'Mağaza Müdür Yardımcısı', category: 'Mağaza Operasyonu', level: 5 },
  { id: 'magaza-muduru', name: 'Mağaza Müdürü', category: 'Mağaza Operasyonu', level: 7 },
  { id: 'kategori-uzmani', name: 'Kategori Uzmanı', category: 'Satın Alma & Kategori', level: 8 },
  { id: 'crm-uzmani', name: 'CRM & Müşteri Analitiği Uzmanı', category: 'CRM & Veri', level: 8 },
  { id: 'stok-sefi', name: 'Depo & Stok Şefi', category: 'Lojistik & Tedarik', level: 3 },
  { id: 'ik-uzmani', name: 'İnsan Kaynakları Uzmanı', category: 'İnsan Kaynakları', level: 8 }
];

const TARGET_OPTIONS: PositionOption[] = [
  { id: 'magaza-muduru', name: 'Mağaza Müdürü', category: 'Mağaza Operasyonu', level: 7 },
  { id: 'bolge-muduru', name: 'Bölge Müdürü', category: 'Mağaza Operasyonu', level: 10 },
  { id: 'operasyon-muduru', name: 'Operasyon Müdürü', category: 'Mağaza Operasyonu', level: 12 },
  { id: 'kategori-yoneticisi', name: 'Kategori Yöneticisi', category: 'Satın Alma & Kategori', level: 11 },
  { id: 'satinalma-direktoru', name: 'Satın Alma & Ticaret Direktörü (CCO)', category: 'Satın Alma & Kategori', level: 15 },
  { id: 'pazarlama-muduru', name: 'Satış ve Pazarlama Müdürü', category: 'Pazarlama & Satış', level: 13 },
  { id: 'crm-direktoru', name: 'CRM, Veri ve Dijital Dönüşüm Direktörü (CDO)', category: 'CRM & Veri', level: 15 },
  { id: 'lojistik-muduru', name: 'Lojistik & Tedarik Chain Müdürü', category: 'Lojistik & Tedarik', level: 12 },
  { id: 'ik-direktoru', name: 'İnsan Kaynakları Direktörü (CHRO)', category: 'İnsan Kaynakları', level: 15 },
  { id: 'ceo', name: 'Genel Müdür / CEO', category: 'Zirve Liderlik', level: 15 }
];

// Helper to calculate realistic start and end dates (Month/Year) for each step
function calculateStepDateRange(stepIdx: number, stepsList: CareerStep15[]) {
  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  let startYear = 2026;
  let startMonthIndex = 7; // August 2026 (0-indexed)

  let cumulativeMonths = 0;
  for (let i = 0; i < stepIdx; i++) {
    const durStr = stepsList[i].recommendedDuration || '6-12 Ay';
    const match = durStr.match(/(\d+)/g);
    let avg = 6;
    if (match && match.length >= 2) {
      avg = Math.round((parseInt(match[0]) + parseInt(match[1])) / 2);
    } else if (match && match.length === 1) {
      avg = parseInt(match[0]);
    }
    cumulativeMonths += avg;
  }

  const currentDurStr = stepsList[stepIdx].recommendedDuration || '6-12 Ay';
  const currentMatch = currentDurStr.match(/(\d+)/g);
  let currentStepMonths = 6;
  if (currentMatch && currentMatch.length >= 2) {
    currentStepMonths = Math.round((parseInt(currentMatch[0]) + parseInt(currentMatch[1])) / 2);
  } else if (currentMatch && currentMatch.length === 1) {
    currentStepMonths = parseInt(currentMatch[0]);
  }

  const startTotalMonths = startMonthIndex + cumulativeMonths;
  const sYear = startYear + Math.floor(startTotalMonths / 12);
  const sMonth = monthNames[startTotalMonths % 12];

  const endTotalMonths = startTotalMonths + currentStepMonths;
  const eYear = startYear + Math.floor(endTotalMonths / 12);
  const eMonth = monthNames[endTotalMonths % 12];

  return {
    dateRangeText: `${sMonth} ${sYear} - ${eMonth} ${eYear}`,
    stepMonths: currentStepMonths
  };
}

export default function CareerPlannerWizard() {
  const [currentPositionId, setCurrentPositionId] = useState<string>('kasiyer');
  const [targetPositionId, setTargetPositionId] = useState<string>('magaza-muduru');
  const [isCalculated, setIsCalculated] = useState<boolean>(true); // Default true so output is visible
  const [expandedStepIndex, setExpandedStepIndex] = useState<number | null>(0); // First step expanded by default

  const currentPos = POSITION_OPTIONS.find(p => p.id === currentPositionId) || POSITION_OPTIONS[0];
  const targetPos = TARGET_OPTIONS.find(p => p.id === targetPositionId) || TARGET_OPTIONS[0];

  const calculateRoadmap = () => {
    setIsCalculated(true);
  };

  const resetForm = () => {
    setIsCalculated(false);
  };

  const toggleStepExpand = (index: number) => {
    setExpandedStepIndex(expandedStepIndex === index ? null : index);
  };

  // Find relevant track steps between current level and target level
  const selectedTrack = ALL_CAREER_TRACKS_15.find(t => 
    t.department.toLowerCase().includes(targetPos.category.toLowerCase().split('&')[0].trim())
  ) || ALL_CAREER_TRACKS_15[0];

  const currentLevelIndex = Math.min(currentPos.level - 1, 13);
  const targetLevelIndex = Math.max(targetPos.level - 1, currentLevelIndex + 1);

  const roadmapSteps = selectedTrack.steps.slice(currentLevelIndex, targetLevelIndex + 1);
  const stepCount = roadmapSteps.length;
  const estimatedMonths = Math.max(stepCount * 4, 6);

  // Aggregate required modules
  const allRequiredCourses = Array.from(new Set(
    roadmapSteps.flatMap(s => s.requiredTrainingForNextLevel || s.currentTrainings || [])
  ));

  const allCompetencies = Array.from(new Set(
    roadmapSteps.flatMap(s => s.nextCompetencies || s.competencies || [])
  ));

  return (
    <section className="py-12 bg-[#F4F7F9] min-h-screen" id="kariyer-planlama-wizard">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-[#0B2A4A]/10 border border-[#0B2A4A]/20 px-4 py-1.5 rounded-full text-xs font-extrabold text-[#0B2A4A]">
            <Target className="w-4 h-4 text-[#087F96]" />
            <span>Kişiselleştirilmiş Perakende Kariyer Hesaplayıcısı</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2A4A] tracking-tight">
            Kariyerini Planla: Neredesin? Nereye Ulaşmak İstiyorsun?
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Mevcut pozisyonunuzu ve hedeflediğiniz kariyeri seçin; size özel tahmini gelişim süresini, basamaklı yol haritasını ve pozisyonların üzerine tıkladığınızda açılan eğitim modüllerini listeleyelim.
          </p>
        </div>

        {/* Wizard Form Selection Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            
            {/* Field 1: Current Position */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase text-[#0B2A4A] tracking-wider flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-[#0B2A4A] text-white text-[10px] flex items-center justify-center font-bold">1</span>
                <span>Şu Anki Mevcut Pozisyonunuz *</span>
              </label>
              <select
                value={currentPositionId}
                onChange={(e) => {
                  setCurrentPositionId(e.target.value);
                  setIsCalculated(true);
                }}
                className="w-full p-4 bg-gray-50 border border-gray-300 rounded-2xl font-bold text-sm text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] focus:outline-none shadow-sm"
              >
                {POSITION_OPTIONS.map((pos) => (
                  <option key={pos.id} value={pos.id}>
                    {pos.name} ({pos.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Field 2: Target Position */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase text-[#087F96] tracking-wider flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-[#087F96] text-white text-[10px] flex items-center justify-center font-bold">2</span>
                <span>Hedeflediğiniz Kariyer Pozisyonu *</span>
              </label>
              <select
                value={targetPositionId}
                onChange={(e) => {
                  setTargetPositionId(e.target.value);
                  setIsCalculated(true);
                }}
                className="w-full p-4 bg-gray-50 border border-gray-300 rounded-2xl font-bold text-sm text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] focus:outline-none shadow-sm"
              >
                {TARGET_OPTIONS.map((pos) => (
                  <option key={pos.id} value={pos.id}>
                    {pos.name} ({pos.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={calculateRoadmap}
              className="px-10 py-4 bg-gradient-to-r from-[#E11D48] to-[#BE123C] hover:opacity-95 text-white font-black rounded-2xl shadow-xl hover:shadow-2xl text-sm transition-all flex items-center space-x-2.5"
            >
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              <span>Yol Haritamı ve Eğitim Modüllerimi Listeleyin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* -------------------------------------------------- */}
        {/* RESULT SECTION (CALCULATED ROADMAP) */}
        {/* -------------------------------------------------- */}
        {isCalculated && (
          <div className="space-y-8 animate-in fade-in zoom-in duration-300">
            
            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Route Overview */}
              <div className="bg-[#0B2A4A] text-white p-6 rounded-3xl border border-[#087F96]/40 shadow-xl space-y-2">
                <div className="text-[11px] text-[#DDF4F7] font-bold uppercase tracking-wider">Kişiselleştirilen Kariyer Rotası</div>
                <div className="text-xl font-black leading-tight text-white">
                  {currentPos.name} → <span className="text-emerald-400">{targetPos.name}</span>
                </div>
                <div className="text-xs text-gray-300 pt-1">
                  Kapsanan Rota: <span className="font-semibold text-white">{selectedTrack.name}</span>
                </div>
              </div>

              {/* Card 2: Estimated Duration */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xl space-y-2">
                <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider flex items-center">
                  <Clock className="w-3.5 h-3.5 text-[#087F96] mr-1.5" />
                  Tahmini Gelişim Süresi
                </div>
                <div className="text-3xl font-black text-[#0B2A4A]">
                  {estimatedMonths} Ay <span className="text-xs font-normal text-gray-500">({Math.round(estimatedMonths * 4)} Hafta)</span>
                </div>
                <div className="text-xs text-emerald-700 font-bold">
                  Sistematik mikro eğitim & saha uygulaması ile
                </div>
              </div>

              {/* Card 3: Total Training Modules */}
              <div className="bg-gradient-to-br from-[#087F96] to-[#056B80] text-white p-6 rounded-3xl shadow-xl space-y-2">
                <div className="text-[11px] text-blue-100 font-bold uppercase tracking-wider flex items-center">
                  <BookOpen className="w-3.5 h-3.5 text-white mr-1.5" />
                  Gerekli Eğitim Modülleri
                </div>
                <div className="text-3xl font-black text-white">
                  {allRequiredCourses.length} Eğitim Modülü
                </div>
                <div className="text-xs text-blue-100">
                  {roadmapSteps.length} basamaklı gelişim müfredatı
                </div>
              </div>
            </div>

            {/* 1. Intermediate Steps Roadmap with Collapsible Position Cards */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 gap-2">
                <div>
                  <span className="text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full uppercase tracking-wider">
                    Özel İlerleme Planı ve Tıklayınca Açılan Müfredat
                  </span>
                  <h3 className="text-2xl font-black text-[#0B2A4A] mt-2">
                    {currentPos.name} Unvanından {targetPos.name} Hedefine Geçiş Basamakları
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Eğitim modüllerini ve ders detaylarını görüntülemek için ilgili pozisyon kartının üzerine tıklayın.
                  </p>
                </div>
                <span className="text-xs font-bold text-gray-500 flex-shrink-0">
                  Toplam {roadmapSteps.length} Basamaklı Yol Haritası
                </span>
              </div>

              {/* Timeline Steps with Clickable Accordions */}
              <div className="space-y-4 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-1 before:bg-gray-200">
                {roadmapSteps.map((step, idx) => {
                  const isFirst = idx === 0;
                  const isLast = idx === roadmapSteps.length - 1;
                  const dateInfo = calculateStepDateRange(idx, roadmapSteps);
                  const isExpanded = expandedStepIndex === idx;

                  const stepCourses = step.requiredTrainingForNextLevel && step.requiredTrainingForNextLevel.length > 0 
                    ? step.requiredTrainingForNextLevel 
                    : (step.currentTrainings || []);

                  return (
                    <div 
                      key={step.id} 
                      className={`relative pl-14 p-5 rounded-3xl border-2 transition-all shadow-sm ${
                        isFirst 
                          ? 'bg-blue-50/60 border-[#087F96]' 
                          : isLast 
                          ? 'bg-emerald-50/60 border-emerald-500' 
                          : 'bg-white border-gray-200 hover:border-[#087F96]'
                      }`}
                    >
                      {/* Step Number Badge */}
                      <div className={`absolute left-3 top-6 -translate-x-1/2 w-8 h-8 rounded-full font-black text-xs flex items-center justify-center shadow-md ring-4 ring-white ${
                        isFirst 
                          ? 'bg-[#087F96] text-white' 
                          : isLast 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-[#0B2A4A] text-white'
                      }`}>
                        {idx + 1}
                      </div>

                      {/* CLICKABLE HEADER ROW FOR TOGGLING EXPAND/COLLAPSE */}
                      <div 
                        onClick={() => toggleStepExpand(idx)}
                        className="cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                            <h4 className="font-black text-lg text-[#0B2A4A] group-hover:text-[#087F96] transition-colors flex items-center space-x-2">
                              <span>{step.title}</span>
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-[#087F96]" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#087F96] transition-transform" />
                              )}
                            </h4>
                            {isFirst && <span className="px-2.5 py-0.5 bg-[#087F96] text-white rounded-full text-[10px] font-bold">Mevcut Durum</span>}
                            {isLast && <span className="px-2.5 py-0.5 bg-emerald-600 text-white rounded-full text-[10px] font-extrabold">Hedef Zirve</span>}
                          </div>
                          <p className="text-xs text-gray-600">{step.purpose}</p>
                        </div>

                        {/* Date Range Badge & Expand Control Button */}
                        <div className="flex flex-col sm:items-end flex-shrink-0 space-y-1.5">
                          <div className="inline-flex items-center space-x-1.5 bg-[#0B2A4A] text-amber-300 px-3.5 py-1.5 rounded-xl text-xs font-black border border-[#087F96]/40 shadow-sm">
                            <Calendar className="w-3.5 h-3.5 text-amber-300" />
                            <span>Planlanan Dönem: {dateInfo.dateRangeText}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-xs">
                            <span className="text-gray-500 font-medium">Süre: {step.recommendedDuration}</span>
                            <span>•</span>
                            <span className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-1 ${
                              isExpanded 
                                ? 'bg-[#087F96] text-white shadow-md' 
                                : 'bg-gray-100 text-[#087F96] group-hover:bg-[#087F96] group-hover:text-white'
                            }`}>
                              <span>📚 {stepCourses.length} Ders Modülünü {isExpanded ? 'Gizle ▲' : 'Gör (Tıkla Aç) ▼'}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* DATED TRAINING MODULES LIST (REVEALED ONLY WHEN EXPANDED / CLICKED) */}
                      {isExpanded && (
                        <div className="pt-4 mt-3 border-t border-gray-200/80 space-y-3 animate-in fade-in duration-200">
                          <div className="flex items-center justify-between text-xs font-black text-[#0B2A4A] uppercase tracking-wider">
                            <span className="flex items-center space-x-1.5">
                              <BookOpen className="w-4 h-4 text-[#087F96]" />
                              <span>{step.title} Altında Alınması Gereken Eğitim Modülleri ({dateInfo.dateRangeText}):</span>
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {stepCourses.map((courseName, cIdx) => (
                              <div 
                                key={cIdx} 
                                className="p-3 bg-gray-50/90 hover:bg-[#0B2A4A]/5 rounded-2xl border border-gray-200 hover:border-[#087F96] transition-all flex items-start space-x-2.5 text-xs text-[#0B2A4A] font-semibold"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#087F96] flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                  <span className="font-bold block leading-snug">{courseName}</span>
                                  <span className="text-[10px] text-gray-500 font-normal">
                                    Tahmini Tamamlama: {dateInfo.dateRangeText.split('-')[0]} • 15 Dk Mikro Ders
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Targeted Competencies (Kazanılacak Yetkinlikler) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-4">
              <h3 className="text-lg font-black text-[#0B2A4A] flex items-center">
                <Award className="w-5 h-5 text-[#087F96] mr-2" />
                Bu Yol Haritası Sonunda Kazanacağınız Yetkinlikler
              </h3>
              <div className="flex flex-wrap gap-2">
                {allCompetencies.map((comp, idx) => (
                  <span 
                    key={idx} 
                    className="px-3.5 py-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold flex items-center"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-6 sm:p-8 bg-[#0B2A4A] text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#087F96]/40 shadow-2xl">
              <div>
                <h4 className="text-xl font-black">Tarihli Gelişim Planınız Hazır!</h4>
                <p className="text-xs text-gray-300 mt-1">Eğitim modüllerine hemen başlayabilir veya planınızı yeniden düzenleyebilirsiniz.</p>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  onClick={resetForm}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Yeniden Seç</span>
                </button>

                <Link
                  href="/egitimler"
                  className="px-8 py-3.5 bg-[#E11D48] hover:bg-[#BE123C] text-white font-black rounded-xl shadow-xl text-xs transition-all flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Kişisel Gelişim Planımı Başlat</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
