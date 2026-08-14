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
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { DEPARTMENTS_DATA, getDepartment100PointBreakdown } from '@/data/departmentsData';

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

        {/* HR Talent Pool Banner (+80 Points Threshold) */}
        <div className="bg-gradient-to-r from-[#0B2A4A] to-[#087F96] text-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-white/20">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="bg-emerald-400 text-[#0B2A4A] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider font-mono">
              +80 Puan Barajı Aktif ✓
            </span>
            <h3 className="font-display font-extrabold text-xl">
              Perakende İK Yetenek Havuzu (+80p Barajı Geçenler)
            </h3>
            <p className="text-gray-200 text-xs font-light max-w-2xl">
              Eğitim modüllerinde 80 puan üzeri alan yüksek nitelikli personeller listelenir. Aradığınız pozisyondaki çalışanı seçerek anında İK talebi oluşturabilir ve bildirim gönderebilirsiniz.
            </p>
          </div>

          <Link
            href="/kurumsal/yetenek-havuzu"
            className="px-6 py-3.5 bg-white text-[#0B2A4A] hover:bg-gray-100 font-extrabold rounded-2xl shadow-md transition-all shrink-0 text-xs flex items-center space-x-2"
          >
            <Sparkles className="h-4 w-4 text-[#087F96]" />
            <span>Yetenek Havuzunu İncele & Aday Seç →</span>
          </Link>
        </div>

        {/* Main Content Grid */}
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
        </div>

        {/* 📊 DEPARTMAN BAZLI ÖĞRENCİ YETKİNLİK & PUAN TABLOSU */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-[#0B2A4A] text-white rounded-2xl shadow-md border border-[#087F96]">
                <BarChart3 className="h-6 w-6 text-[#087F96]" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-xl text-[#0B2A4A]">
                  Departman Bazlı Öğrenci Yetkinlik & Ders Puan Tablosu
                </h3>
                <p className="text-xs text-gray-500 font-light">
                  Seçtiğiniz departmandaki tüm öğrencilerin ders ders aldığı puanları ve 100 üzerinden yetkinlik skorlarını inceleyin.
                </p>
              </div>
            </div>

            {/* Department Selector */}
            <div className="flex items-center space-x-2 text-xs font-bold self-start sm:self-auto">
              <label className="text-[#0B2A4A] whitespace-nowrap">Departman Seç:</label>
              <select
                className="p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-extrabold text-[#0B2A4A] outline-none focus:ring-2 focus:ring-[#087F96]"
                onChange={(e) => {
                  // Standard client re-render hook if needed
                }}
              >
                {DEPARTMENTS_DATA.map((d) => (
                  <option key={d.id} value={d.id}>{d.name} (Eğitim Tablosu)</option>
                ))}
              </select>
            </div>
          </div>

          {/* Department Students Matrix Table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B2A4A] text-white font-bold">
                <tr>
                  <th className="p-3.5">Öğrenci Adı & Kadrosu</th>
                  <th className="p-3.5">Kayıtlı Departman</th>
                  <th className="p-3.5">Ders Bazlı Puan Dağılımı (100 Puan)</th>
                  <th className="p-3.5 font-mono">Sınav Ortalama</th>
                  <th className="p-3.5 font-mono">100 Üzerinden Toplam Skor</th>
                  <th className="p-3.5 text-right">İK Yetenek Havuzu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {[
                  {
                    name: 'Mehmet Yılmaz',
                    role: 'Kasiyer → Mağaza Müdür Adayı',
                    dept: 'Kasiyerlik & Operasyon',
                    courseScores: 'Ders 1: 24/25 | Ders 2: 19/20 | Ders 3: 25/25 | Ders 4: 18/30',
                    examAvg: 96,
                    totalCompetencyScore: 86,
                    isTalentPool: true,
                    avatar: 'MY'
                  },
                  {
                    name: 'Ayşe Yıldız',
                    role: 'Reyon Şefi → Müdür Yardımcısı',
                    dept: 'Reyon Satış & Planogram',
                    courseScores: 'Ders 1: 20/20 | Ders 2: 25/25 | Ders 3: 25/25 | Ders 4: 24/30',
                    examAvg: 98,
                    totalCompetencyScore: 94,
                    isTalentPool: true,
                    avatar: 'AY'
                  },
                  {
                    name: 'Zeynep Kaya',
                    role: 'Kasap Şefi',
                    dept: 'Taze Gıda & Şarküteri',
                    courseScores: 'Ders 1: 25/25 | Ders 2: 24/25 | Ders 3: 23/25 | Ders 4: 23/25',
                    examAvg: 95,
                    totalCompetencyScore: 95,
                    isTalentPool: true,
                    avatar: 'ZK'
                  },
                  {
                    name: 'Canan Demir',
                    role: 'Reyon Satış Elemanı',
                    dept: 'Reyon Satış',
                    courseScores: 'Ders 1: 15/25 | Ders 2: 12/25 | Ders 3: 18/25 | Ders 4: 20/25',
                    examAvg: 65,
                    totalCompetencyScore: 65,
                    isTalentPool: false,
                    avatar: 'CD'
                  }
                ].map((st, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3.5 flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#087F96] text-white font-bold flex items-center justify-center text-xs font-mono shrink-0">
                        {st.avatar}
                      </div>
                      <div>
                        <span className="font-bold text-[#0B2A4A] block">{st.name}</span>
                        <span className="text-[10px] text-gray-500">{st.role}</span>
                      </div>
                    </td>

                    <td className="p-3.5 text-gray-600 font-medium">{st.dept}</td>

                    <td className="p-3.5 font-mono text-[11px] text-[#0B2A4A] bg-gray-50 rounded-lg">
                      {st.courseScores}
                    </td>

                    <td className="p-3.5 font-mono font-bold text-[#34A853]">
                      %{st.examAvg}
                    </td>

                    <td className="p-3.5 font-mono font-black text-sm text-[#0B2A4A]">
                      {st.totalCompetencyScore} / 100 Puan
                    </td>

                    <td className="p-3.5 text-right">
                      {st.isTalentPool ? (
                        <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full inline-flex items-center space-x-1">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          <span>+80p Havuzunda ✓</span>
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-full">
                          Gelişim Devam Ediyor
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
