'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Crown,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  ChevronRight,
  BookOpen,
  ShieldCheck,
  Target,
  BarChart3,
  Calendar
} from 'lucide-react';

interface CareerHierarchyTimelineProps {
  selectedGoal?: string;
  goalType?: 'VERTICAL' | 'HORIZONTAL';
}

export default function CareerHierarchyTimeline({
  selectedGoal = 'Mağaza Müdürü',
  goalType = 'VERTICAL'
}: CareerHierarchyTimelineProps) {
  // Determine target level index from selectedGoal
  const getGoalLevelIndex = (goalName: string) => {
    const g = goalName.toLowerCase();
    if (g.includes('kasiyer')) return 1;
    if (g.includes('takım lideri')) return 2;
    if (g.includes('müdür yardımcısı') || g.includes('müdür yrd')) return 3;
    if (g.includes('mağaza müdürü')) return 4;
    if (g.includes('bölge müdürü')) return 5;
    if (g.includes('direktör')) return 6;
    if (g.includes('genel müdür yrd') || g.includes('coo')) return 7;
    if (g.includes('ceo') || g.includes('genel müdür')) return 8;
    return 4; // default level 4
  };

  const targetLevel = getGoalLevelIndex(selectedGoal);
  const [selectedLevel, setSelectedLevel] = useState<number>(targetLevel);

  useEffect(() => {
    setSelectedLevel(targetLevel);
  }, [selectedGoal]);

  const levels = [
    {
      level: 1,
      name: 'Kasiyer & Reyon Çalışanı',
      category: 'Mağaza Giriş Seviyesi',
      status: targetLevel === 1 ? 'HEDEF POZİSYON 🎯' : 1 < targetLevel ? 'GEÇİLDİ ✅' : 'KALAN AŞAMA ⏳',
      badgeColor: targetLevel === 1 ? 'bg-amber-400 text-slate-950 font-black border-amber-300' : 1 < targetLevel ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-white/10 text-gray-300',
      timeframe: '8 Ay (Tamamlandı)',
      progress: 100,
      description: 'Kasa işlemleri, reyon fiyat etiket kontrolleri ve müşteri karşılama standartları.',
      trainings: [
        { name: 'Temel Perakende & POS Sistemleri', score: 95, status: 'GEÇTİ' },
        { name: 'Müşteri İletişimi & Kasa Hijyeni', score: 92, status: 'GEÇTİ' }
      ]
    },
    {
      level: 2,
      name: 'Takım Lideri / Kıdemli Satış Danışmanı',
      category: 'Mağaza Operasyon Liderliği',
      status: targetLevel === 2 ? 'HEDEF POZİSYON 🎯' : 2 < targetLevel ? 'GEÇİLDİ ✅' : 'KALAN AŞAMA ⏳',
      badgeColor: targetLevel === 2 ? 'bg-amber-400 text-slate-950 font-black border-amber-300' : 2 < targetLevel ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-white/10 text-gray-300',
      timeframe: '12 Ay (Tamamlandı)',
      progress: 100,
      description: 'Reyon düzenleme, takas ve iade süreçleri, vardiya başı ekip bilgilendirmesi.',
      trainings: [
        { name: 'Reyon İçi Stok & Teşhir Standardı', score: 88, status: 'GEÇTİ' },
        { name: 'Saha Yetkinlik & Müşteri Şikayet Yönetimi', score: 90, status: 'GEÇTİ' }
      ]
    },
    {
      level: 3,
      name: 'Mağaza Müdür Yardımcısı',
      category: 'İlk Seviye Yöneticilik',
      status: targetLevel === 3 ? 'HEDEF POZİSYON 🎯' : 3 < targetLevel ? 'GEÇİLDİ ✅' : 'TERFİ ADIMI ⏳',
      badgeColor: targetLevel === 3 ? 'bg-amber-400 text-slate-950 font-black border-amber-300' : 3 < targetLevel ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold',
      timeframe: '14 Hafta Kaldı (%83.5 Skoru)',
      progress: 83.5,
      description: 'Vardiya hazırlığı, kasa nakit teslimatı, fire takibi ve mağaza açılış/kapanış yönetimi.',
      trainings: [
        { name: 'Mağaza İçi Stok & Envanter Yönetimi', score: 68, status: 'DEVAM EDİYOR' },
        { name: 'Vardiya & İş Gücü Planlama Eğitimi', score: 85, status: 'GEÇTİ' },
        { name: 'Mağaza Matematiği & Fire Önleme', score: 92, status: 'GEÇTİ' }
      ]
    },
    {
      level: 4,
      name: 'Mağaza Müdürü',
      category: 'Mağaza Yönetimi (P&L)',
      status: targetLevel === 4 ? 'HEDEF POZİSYON 🎯' : 4 < targetLevel ? 'GEÇİLDİ ✅' : 'TERFİ ADIMI ⏳',
      badgeColor: targetLevel === 4 ? 'bg-amber-400 text-slate-950 font-black border-amber-300' : 4 < targetLevel ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold',
      timeframe: '1.5 - 2 Yıl Tahmini',
      progress: targetLevel === 4 ? 65 : 0,
      description: 'Mağaza P&L bütçe yönetimi, ciro hedefleri, personel performans değerlendirmesi.',
      trainings: [
        { name: 'P&L Bütçe & Kar/Zarar Okuryazarlığı', score: 0, status: 'ATANACAK' },
        { name: 'Performans Görüşmesi & Koçluk', score: 0, status: 'ATANACAK' }
      ]
    },
    {
      level: 5,
      name: 'Bölge / Saha Müdürü',
      category: 'Çoklu Mağaza Yönetimi',
      status: targetLevel === 5 ? 'HEDEF POZİSYON 🎯' : 5 < targetLevel ? 'GEÇİLDİ ✅' : 'TERFİ ADIMI ⏳',
      badgeColor: targetLevel === 5 ? 'bg-amber-400 text-slate-950 font-black border-amber-300' : 5 < targetLevel ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold',
      timeframe: '3 - 4 Yıl Tahmini',
      progress: targetLevel === 5 ? 45 : 0,
      description: '15-20 Mağazalık bölge operasyon yönetimi, şube bazlı kârlılık ve denetimler.',
      trainings: [
        { name: 'Bölge Liderliği & Çoklu Mağaza Yönetimi', score: 0, status: 'ATANACAK' }
      ]
    },
    {
      level: 6,
      name: 'Perakende Operasyon Direktörü',
      category: 'Üst Yönetim (Executive)',
      status: targetLevel === 6 ? 'HEDEF POZİSYON 🎯' : 6 < targetLevel ? 'GEÇİLDİ ✅' : 'TERFİ ADIMI ⏳',
      badgeColor: targetLevel === 6 ? 'bg-amber-400 text-slate-950 font-black border-amber-300' : 6 < targetLevel ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold',
      timeframe: '5 - 7 Yıl Tahmini',
      progress: targetLevel === 6 ? 35 : 0,
      description: 'Tüm mağaza ağının operasyonel stratejisi, yeni mağaza açılış simülasyonları ve bütçe.',
      trainings: [
        { name: 'Stratejik Perakende Yönetimi (PKA Executive)', score: 0, status: 'ATANACAK' }
      ]
    },
    {
      level: 7,
      name: 'Genel Müdür Yardımcısı (COO / CMO)',
      category: 'C-Suite Yönetim Komitesi',
      status: targetLevel === 7 ? 'HEDEF POZİSYON 🎯' : 7 < targetLevel ? 'GEÇİLDİ ✅' : 'TERFİ ADIMI ⏳',
      badgeColor: targetLevel === 7 ? 'bg-amber-400 text-slate-950 font-black border-amber-300' : 7 < targetLevel ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold',
      timeframe: '8 - 10 Yıl Tahmini',
      progress: targetLevel === 7 ? 28 : 0,
      description: 'Şirket ölçeğinde satış, pazarlama, tedarik zinciri ve büyüme politikaları.',
      trainings: [
        { name: 'Global Perakende & Liderlik Programı', score: 0, status: 'ATANACAK' }
      ]
    },
    {
      level: 8,
      name: 'CEO / Genel Müdür',
      category: 'Kurumsal Zirve & Yönetim Kurulu',
      status: targetLevel === 8 ? 'HEDEF POZİSYON 🎯' : 'KALAN VİZYON ⏳',
      badgeColor: targetLevel === 8 ? 'bg-amber-400 text-slate-950 font-black border-amber-300 shadow-md' : 'bg-white/10 text-gray-300',
      timeframe: '10-12+ Yıl Tahmini Vizyon',
      progress: targetLevel === 8 ? 22 : 0,
      description: 'Şirketin vizyonu, yönetim kurulu raporlaması, yatırım ve stratejik satın almalar.',
      trainings: [
        { name: 'PKA CEO Liderlik & Vizyon Programı', score: 0, status: 'ATANACAK' }
      ]
    }
  ];

  const currentLevelData = levels.find((l) => l.level === selectedLevel) || levels[targetLevel - 1] || levels[2];

  return (
    <div className="p-6 sm:p-8 bg-[#0B2A4A] rounded-3xl border border-amber-400/30 space-y-6 shadow-xl text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Crown className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-extrabold text-white">
              Genişletilmiş Kariyer Hiyerarşisi (Giriş Seviyesinden CEO / Genel Müdür'e)
            </h2>
          </div>
          <p className="text-xs text-gray-300 mt-1">
            Mevcut kariyer hedefiniz: <strong className="text-amber-300">"{selectedGoal}"</strong> (Seviye {targetLevel}).
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold rounded-full border border-emerald-500/30">
            Geçilen: {Math.max(1, targetLevel - 1)} / 8 Aşama
          </span>
          <span className="px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-mono font-bold rounded-full border border-amber-400/40">
            Aktif Hedef: Level {targetLevel}
          </span>
        </div>
      </div>

      {/* 8-LEVEL INTERACTIVE VISUAL LADDER GRAPH (SPACIOUS RESPONSIVE CARDS) */}
      <div className="space-y-2">
        <h3 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
          <BarChart3 className="w-4 h-4 text-amber-400" />
          <span>8 Seviyeli İnteraktif Kariyer Merdiveni (Seviyeye Tıklayarak Detayları İnceleyin):</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 pt-2">
          {levels.map((lvl) => {
            const isSelected = lvl.level === selectedLevel;
            const isTargetPos = lvl.level === targetLevel;

            return (
              <button
                key={lvl.level}
                onClick={() => setSelectedLevel(lvl.level)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 min-h-[140px] ${
                  isTargetPos
                    ? 'bg-amber-400/25 border-amber-400 scale-105 shadow-xl ring-2 ring-amber-400/70'
                    : isSelected
                    ? 'bg-blue-500/20 border-blue-400 scale-102'
                    : 'bg-[#061B33] border-white/10 hover:bg-white/10 opacity-85 hover:opacity-100'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-gray-400">Lvl {lvl.level}</span>
                    {lvl.level === 8 && <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                  </div>

                  {/* FULLY READABLE TITLE WITHOUT TRUNCATION */}
                  <h4 className="font-extrabold text-white text-[11px] leading-tight break-words tracking-tight min-h-[2.5rem] flex items-center">
                    {lvl.name}
                  </h4>
                </div>

                <div className="space-y-1 pt-1 border-t border-white/10">
                  <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-extrabold border ${lvl.badgeColor}`}>
                    {lvl.status}
                  </span>
                  <div className="text-[9px] text-gray-300 font-mono block leading-tight">{lvl.timeframe}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SELECTED LEVEL DETAIL BOX */}
      <div className="p-6 bg-[#061B33] rounded-3xl border border-white/10 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-black text-xs">
                Seviye {currentLevelData.level}
              </span>
              <h3 className="text-base font-extrabold text-white">{currentLevelData.name}</h3>
            </div>
            <p className="text-xs text-amber-300 font-medium mt-0.5">{currentLevelData.category}</p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-gray-300">Tahmini Zaman Dilimi:</span>
            <span className="font-mono font-extrabold text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
              {currentLevelData.timeframe}
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-200 leading-relaxed">{currentLevelData.description}</p>

        {/* MANDATORY TRAININGS & EXAM SCORES FOR THIS LEVEL */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold text-amber-300 flex items-center space-x-1.5">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Bu Pozisyon İçin Atanan Zorunlu Eğitimler ve Sınav Puanları:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {currentLevelData.trainings.map((tr, idx) => (
              <div key={idx} className="p-3.5 bg-[#0B2A4A] rounded-2xl border border-white/10 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-white leading-snug">{tr.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold shrink-0 ${
                    tr.status === 'GEÇTİ' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {tr.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-gray-300">Sınav / Modül Puanı:</span>
                  <span className="font-mono font-extrabold text-emerald-400">
                    {tr.score > 0 ? `${tr.score} / 100` : 'Sınav Bekleniyor'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
