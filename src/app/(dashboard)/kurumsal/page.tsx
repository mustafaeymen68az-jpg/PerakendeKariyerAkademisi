'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  UserCheck, 
  BarChart3, 
  Award, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Building2, 
  Crown, 
  FileText, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export default function KurumsalYoneticiPaneliPage() {
  const corporateStats = {
    companyName: 'Büyük Perakende Market Zinciri A.Ş.',
    totalEmployees: 450,
    activeStudents: 412,
    completionRatePct: 86, // %
    avgExamScore: 89,
    careerYearDist: { year1: 240, year2: 172 },
    totalCertificates: 620,
    totalTrainingHours: 8450,
    avgCompetencyScore: 84
  };

  const lowPerformers = [
    { name: 'Mehmet Kaya', dept: 'Kasiyer', issue: 'Sınav Başarısı %62', score: 62 },
    { name: 'Canan Demir', dept: 'Reyon Satış', issue: 'Eğitim Tamamlama Gecikmesi', score: 65 }
  ];

  const highPotentials = [
    { name: 'Ayşe Yıldız', dept: 'Reyon Şefi', score: 96, targetRole: 'Müdür Yardımcısı' },
    { name: 'Murat Arslan', dept: 'Kasiyer', score: 95, targetRole: 'Kıdemli Kasiyer' },
    { name: 'Elin Şahin', dept: 'Açık Şarküteri Şefi', score: 94, targetRole: 'Taze Gıda Uzmanı' }
  ];

  const promotionReadyCandidates = [
    { name: 'Ahmet Yılmaz', currentRole: 'Mağaza Müdür Yard.', targetRole: 'Mağaza Müdürü', year: '2. Yıl', score: 98 },
    { name: 'Zeynep Aksoy', currentRole: 'Mağaza Müdürü', targetRole: 'Bölge Müdürü', year: '2. Yıl', score: 97 }
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-[#0B2A4A] text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-[#087F96]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#DDF4F7] bg-[#087F96] px-3 py-1 rounded-full uppercase font-mono">
              Kurumsal Yönetici Dashboard
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl">
              {corporateStats.companyName}
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm font-light">
              Çalışan yetkinlik matrisi, sınav skorları, yedekleme planları ve terfiye hazır adaylar.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 p-3.5 rounded-xl border border-white/10 shrink-0 text-xs font-mono">
            <div>
              <span className="text-gray-300 block">Ort. Yetkinlik Skoru</span>
              <span className="text-xl font-bold text-[#34A853]">{corporateStats.avgCompetencyScore}/100</span>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <span className="text-gray-300 block">Eğitim Tamamlama</span>
              <span className="text-xl font-bold text-[#087F96]">%{corporateStats.completionRatePct}</span>
            </div>
          </div>
        </div>

        {/* 6 Key Executive Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-xs text-gray-500 font-medium block">Çalışan Sayısı</span>
            <span className="text-2xl font-black text-[#0B2A4A] font-mono mt-1 block">
              {corporateStats.totalEmployees} Personel
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-xs text-gray-500 font-medium block">Aktif Öğrenci</span>
            <span className="text-2xl font-black text-[#087F96] font-mono mt-1 block">
              {corporateStats.activeStudents} Aktif
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-xs text-gray-500 font-medium block">Sınav Ortalaması</span>
            <span className="text-2xl font-black text-[#34A853] font-mono mt-1 block">
              %{corporateStats.avgExamScore}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-xs text-gray-500 font-medium block">Sertifika Sayısı</span>
            <span className="text-2xl font-black text-[#087F96] font-mono mt-1 block">
              {corporateStats.totalCertificates} Adet
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-xs text-gray-500 font-medium block">Eğitim Saatleri</span>
            <span className="text-2xl font-black text-[#0B2A4A] font-mono mt-1 block">
              {corporateStats.totalTrainingHours} Saat
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-xs text-gray-500 font-medium block">Kariyer Yılı Dağılımı</span>
            <span className="text-xs font-bold text-gray-700 font-mono mt-2 block">
              1.Yıl: {corporateStats.careerYearDist.year1} • 2.Yıl: {corporateStats.careerYearDist.year2}
            </span>
          </div>
        </div>

        {/* Dashboard Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Promotion Ready Candidates & High Potentials */}
          <div className="lg:col-span-8 space-y-6">
            {/* Terfiye Hazır Adaylar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-display font-bold text-lg text-[#0B2A4A] flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-[#34A853]" />
                  <span>Terfiye Hazır Lider Adayları</span>
                </h3>
                <span className="text-xs bg-[#34A853]/15 text-[#34A853] font-bold px-2.5 py-1 rounded-full font-mono">
                  Hazır Kadro
                </span>
              </div>

              <div className="space-y-3">
                {promotionReadyCandidates.map((cand, i) => (
                  <div key={i} className="bg-[#DDF4F7]/40 border border-[#087F96]/30 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#0B2A4A] text-sm">{cand.name}</h4>
                      <p className="text-xs text-gray-600 font-mono">
                        Mevcut: {cand.currentRole} → <strong className="text-[#087F96]">Hedef: {cand.targetRole}</strong>
                      </p>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-xs text-gray-500 block">Kariyer Yılı: {cand.year}</span>
                      <span className="text-sm font-bold text-[#34A853]">Skor: %{cand.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Yüksek Potansiyelli Çalışanlar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
              <h3 className="font-display font-bold text-lg text-[#0B2A4A] flex items-center space-x-2">
                <Star className="h-5 w-5 text-[#087F96]" />
                <span>Yüksek Potansiyelli Çalışanlar (High-Po)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {highPotentials.map((hp, idx) => (
                  <div key={idx} className="bg-[#F4F7F9] p-4 rounded-xl border border-gray-200 space-y-1 text-xs">
                    <span className="font-bold text-[#0B2A4A] block text-sm">{hp.name}</span>
                    <span className="text-gray-500 block font-mono">{hp.dept}</span>
                    <div className="pt-2 flex justify-between items-center text-[11px] font-mono">
                      <span className="text-[#087F96] font-bold">Skor: %{hp.score}</span>
                      <span className="text-gray-400">{hp.targetRole}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Low Performers & Department Success */}
          <div className="lg:col-span-4 space-y-6">
            {/* Düşük Gelişim Gösteren Çalışanlar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
              <h3 className="font-display font-bold text-base text-[#0B2A4A] flex items-center space-x-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span>Destek Gereken Çalışanlar</span>
              </h3>

              <div className="space-y-3 text-xs">
                {lowPerformers.map((lp, idx) => (
                  <div key={idx} className="bg-red-50 p-3 rounded-xl border border-red-200 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#0B2A4A]">{lp.name} ({lp.dept})</span>
                      <span className="text-red-600 font-mono font-bold">%{lp.score}</span>
                    </div>
                    <p className="text-gray-600 text-[11px] font-mono">• {lp.issue}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Departman Bazlı Başarı */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
              <h3 className="font-display font-bold text-base text-[#0B2A4A]">Departman Bazlı Başarı</h3>
              <div className="space-y-2.5 text-xs font-mono">
                {[
                  { dept: 'Taze Gıda Reyonları', score: 94 },
                  { dept: 'Mağaza Müdürleri', score: 92 },
                  { dept: 'Satınalma & Kategori', score: 88 },
                  { dept: 'Kasiyer', score: 82 }
                ].map((d, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-gray-700">
                      <span>{d.dept}</span>
                      <span className="font-bold text-[#087F96]">%{d.score}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#087F96] h-full" style={{ width: `${d.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
