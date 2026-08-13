'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { 
  User, 
  BookOpen, 
  Award, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle, 
  BarChart3, 
  GraduationCap, 
  Play, 
  FileText, 
  ChevronRight,
  BrainCircuit
} from 'lucide-react';

export default function PanelPage() {
  const [userProfile] = useState({
    name: 'Selim Kılıç',
    role: 'Mağaza Müdürü Adayı',
    department: 'Mağaza Yönetimi',
    careerYear: '2. Yıl', // 1. Yıl / 2. Yıl
    completedTrainings: 18,
    ongoingTrainings: 3,
    pendingTrainings: 5,
    totalHours: 142,
    examAverageScore: 92,
    certificatesCount: 4,
    competencyScore: 88, // 100 max
    careerProgressPct: 78 // %
  });

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-[#0B2A4A] text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-[#087F96]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-[#DDF4F7] bg-[#087F96] px-3 py-1 rounded-full uppercase">
                Kariyer Yılım: {userProfile.careerYear}
              </span>
              <span className="text-xs text-gray-300 font-mono">
                {userProfile.department}
              </span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl">
              Hoş Geldiniz, {userProfile.name}
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm font-light">
              Perakende Kariyer Akademisi 2. Yıl "İleri Yetkinlik & Kariyer Gelişimi" programındasınız.
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl border border-white/10 shrink-0">
            <div className="text-center font-mono">
              <span className="text-xs text-gray-300 block">Kariyer İlerleme</span>
              <span className="text-2xl font-black text-[#34A853]">%{userProfile.careerProgressPct}</span>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-center font-mono">
              <span className="text-xs text-gray-300 block">Yetkinlik Skoru</span>
              <span className="text-2xl font-black text-[#087F96]">{userProfile.competencyScore}/100</span>
            </div>
          </div>
        </div>

        {/* 6 Key Student Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-xs text-gray-500 font-medium block">Tamamlanan</span>
            <span className="text-2xl font-black text-[#34A853] font-mono mt-1 block">
              {userProfile.completedTrainings} Eğitim
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-xs text-gray-500 font-medium block">Devam Eden</span>
            <span className="text-2xl font-black text-[#087F96] font-mono mt-1 block">
              {userProfile.ongoingTrainings} Eğitim
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-xs text-gray-500 font-medium block">Bekleyen</span>
            <span className="text-2xl font-black text-gray-700 font-mono mt-1 block">
              {userProfile.pendingTrainings} Modül
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-xs text-gray-500 font-medium block">Toplam Süre</span>
            <span className="text-2xl font-black text-[#0B2A4A] font-mono mt-1 block">
              {userProfile.totalHours} Saat
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-xs text-gray-500 font-medium block">Sınav Ortalaması</span>
            <span className="text-2xl font-black text-[#34A853] font-mono mt-1 block">
              %{userProfile.examAverageScore}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-xs text-gray-500 font-medium block">Sertifikalarım</span>
            <span className="text-2xl font-black text-[#087F96] font-mono mt-1 block">
              {userProfile.certificatesCount} Belge
            </span>
          </div>
        </div>

        {/* Dashboard Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active Learning Courses */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-display font-bold text-lg text-[#0B2A4A] flex items-center space-x-2">
                  <Play className="h-5 w-5 text-[#087F96]" />
                  <span>Devam Eden Eğitimlerim</span>
                </h3>
                <span className="text-xs font-mono font-bold text-[#087F96]">3 Aktif Ders</span>
              </div>

              <div className="space-y-3">
                {[
                  { title: 'Mağaza P&L (Kar-Zarar) ve Finansal KPI Yönetimi', progress: 75, duration: '40 Saat', year: '2. Yıl' },
                  { title: 'Üretken Yapay Zekâ ve Etkili Prompt Kullanımı', progress: 40, duration: '18 Saat', year: '2. Yıl' },
                  { title: 'RFM Müşteri Segmentasyonu & CLV Sadakat Analitiği', progress: 20, duration: '28 Saat', year: '2. Yıl' }
                ].map((course, idx) => (
                  <div key={idx} className="bg-[#F4F7F9] p-4 rounded-xl border border-gray-200/60 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#0B2A4A]">{course.title}</span>
                      <span className="font-mono text-[#087F96] font-bold">%{course.progress}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#087F96] h-full rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-gray-500 pt-1 font-mono">
                      <span>Kariyer Yılı: {course.year} • Süre: {course.duration}</span>
                      <Link href="/egitim/magaza-pl-ve-kpi-yonetimi" className="text-[#087F96] font-bold hover:underline">
                        Derse Devam Et →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Learning Path */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
              <h3 className="font-display font-bold text-lg text-[#0B2A4A] flex items-center space-x-2">
                <BrainCircuit className="h-5 w-5 text-[#34A853]" />
                <span>Pozisyonunuza Önerilen Eğitimler</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Çoklu Mağaza Bölge Yönetimi & Saha Denetimi', dept: 'Bölge Müdürü Hazırlık', year: '2. Yıl' },
                  { title: 'Tedarikçi Müzakere Teknikleri & GMROI Opt.', dept: 'Satınalma & Kategori', year: '2. Yıl' }
                ].map((rec, i) => (
                  <div key={i} className="bg-[#DDF4F7]/40 border border-[#087F96]/30 p-4 rounded-xl space-y-2">
                    <span className="text-[10px] font-bold text-[#056B80] uppercase">{rec.dept}</span>
                    <h4 className="font-display font-bold text-sm text-[#0B2A4A]">{rec.title}</h4>
                    <Link href="/egitimler" className="text-xs font-bold text-[#087F96] hover:underline flex items-center">
                      İncele ve Programa Ekle <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Certificates & Exam Scores */}
          <div className="lg:col-span-4 space-y-6">
            {/* Sertifikalarım */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
              <h3 className="font-display font-bold text-base text-[#0B2A4A] flex items-center justify-between">
                <span>Sertifikalarım</span>
                <Link href="/sertifikasyon" className="text-xs text-[#087F96] hover:underline">Tümü</Link>
              </h3>

              <div className="space-y-2 text-xs">
                {[
                  { name: 'Kasa Sistemleri & POS Uzmanlığı', date: '2025', code: 'PKA-8841' },
                  { name: 'Reyon Düzeni & FIFO Disiplini', date: '2025', code: 'PKA-7120' },
                  { name: 'Meyve Sebze Tazelik Standartları', date: '2025', code: 'PKA-6632' },
                  { name: 'Temel Perakende Finansal Farkındalık', date: '2026', code: 'PKA-9910' }
                ].map((cert, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[#F4F7F9] rounded-xl border border-gray-200/60">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-[#087F96] shrink-0" />
                      <span className="font-semibold text-[#0B2A4A]">{cert.name}</span>
                    </div>
                    <Link href="/sertifika-ornegi" className="text-[10px] text-[#087F96] font-mono font-bold hover:underline">
                      Görüntüle
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistant Quick Ask */}
            <div className="bg-[#0B2A4A] text-white rounded-2xl p-6 shadow-md space-y-3 border border-[#087F96]/40">
              <div className="flex items-center space-x-2">
                <BrainCircuit className="h-5 w-5 text-[#087F96]" />
                <h4 className="font-display font-bold text-sm">Akademi Yapay Zekâ Mentor</h4>
              </div>
              <p className="text-xs text-gray-300 font-light">
                GMROI, Basket Size, Fire hesaplama formülleri veya sınav soruları hakkında mentorunuza danışın.
              </p>
              <Link
                href="/yapay-zeka"
                className="w-full py-2 bg-[#087F96] hover:bg-[#056B80] text-white rounded-lg text-xs font-bold transition-all text-center block"
              >
                Yapay Zekâ Mentorunu Aç
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
