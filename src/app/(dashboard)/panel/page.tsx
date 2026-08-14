'use client';

import React, { useState, useEffect } from 'react';
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
  BrainCircuit,
  UserCheck
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '@/data/departmentsData';

export default function PanelPage() {
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    role: string;
    company?: string;
    position?: string;
  }>({
    name: 'Katılımcı',
    email: '',
    role: 'PARTICIPANT',
    company: 'Şirket',
    position: 'Kasiyer'
  });

  useEffect(() => {
    try {
      const match = document.cookie.match(/user_session=([^;]+)/);
      if (match) {
        const parsed = JSON.parse(decodeURIComponent(match[1]));
        setUserData({
          name: parsed.name || 'Katılımcı',
          email: parsed.email || '',
          role: parsed.role || 'PARTICIPANT',
          company: parsed.company || 'Şirket',
          position: parsed.title || parsed.department || 'Kasiyer'
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Match department data for user position
  const matchedDept = DEPARTMENTS_DATA.find(
    (d) => d.name.toLowerCase().includes((userData.position || '').toLowerCase()) || (userData.position || '').toLowerCase().includes(d.name.toLowerCase())
  ) || DEPARTMENTS_DATA[1]; // Fallback to Kasiyer or Reyon

  const userProfile = {
    name: userData.name,
    position: userData.position || matchedDept.name,
    department: matchedDept.name,
    company: userData.company || 'Perakende Market',
    careerYear: '1. Yıl',
    completedTrainings: 3,
    ongoingTrainings: matchedDept.year1Courses.length,
    pendingTrainings: matchedDept.year2Courses.length,
    totalHours: matchedDept.totalHours,
    examAverageScore: 94,
    certificatesCount: 2,
    competencyScore: 85,
    careerProgressPct: 65
  };

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
              <span className="text-xs text-[#DDF4F7] font-mono bg-white/10 px-3 py-1 rounded-full border border-white/10">
                🎯 Pozisyon: {userProfile.position}
              </span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl">
              Hoş Geldiniz, {userProfile.name}
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm font-light">
              "{userProfile.position}" pozisyonuna özel 1. ve 2. Yıl yapılandırılmış eğitim programındasınız.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10 shrink-0">
            <div className="text-center font-mono">
              <span className="text-xs text-gray-300 block">Kariyer İlerleme</span>
              <span className="text-2xl font-black text-[#34A853]">%{userProfile.careerProgressPct}</span>
            </div>
            <div className="h-10 w-px bg-white/20 hidden sm:block" />
            <Link 
              href="/panel/kariyer-planlama"
              className="px-4 py-2.5 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5 shrink-0"
            >
              <span>🎯 Kariyer Planlama & Takvim</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
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
              {userProfile.ongoingTrainings} Modül
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-xs text-gray-500 font-medium block">2. Yıl Hedef</span>
            <span className="text-2xl font-black text-gray-700 font-mono mt-1 block">
              {userProfile.pendingTrainings} Modül
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <span className="text-xs text-gray-500 font-medium block">Toplam Müfredat</span>
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
          {/* Active Learning Courses for exact user position */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-display font-bold text-lg text-[#0B2A4A] flex items-center space-x-2">
                  <UserCheck className="h-5 w-5 text-[#087F96]" />
                  <span>"{userProfile.position}" 1. Yıl Eğitim Müfredatı</span>
                </h3>
                <Link
                  href={`/egitimler?dept=${encodeURIComponent(userProfile.position)}`}
                  className="text-xs font-bold text-[#087F96] hover:underline"
                >
                  Tüm Kataloğu Gör →
                </Link>
              </div>

              <div className="space-y-3">
                {matchedDept.year1Courses.map((cName, idx) => {
                  const progress = 90 - idx * 20;
                  return (
                    <div key={idx} className="bg-[#F4F7F9] p-4 rounded-xl border border-gray-200/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#0B2A4A]">{cName}</span>
                        <span className="font-mono text-[#087F96] font-bold">%{progress > 0 ? progress : 15}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#087F96] h-full rounded-full transition-all duration-500"
                          style={{ width: `${progress > 0 ? progress : 15}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[11px] text-gray-500 pt-1 font-mono">
                        <span>Kariyer Yılı: 1. Yıl • Modül {idx + 1}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 🎓 ÖĞRENCİ DERS BAZLI PUAN KARNESİ & TOPLAM YETKİNLİK SKORU */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-[#0B2A4A] text-white rounded-xl">
                    <Award className="h-5 w-5 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#0B2A4A]">
                      Ders Bazlı Puan Karnem & Yetkinlik Derlemesi
                    </h3>
                    <p className="text-xs text-gray-500 font-light">
                      Her eğitimden kazandığınız puanlar ve 100 üzerinden toplam yetkinlik skoru derlemeniz.
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Toplam Yetkinlik: 86 / 100 Puan
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { course: 'Kasa Sistemleri & Hızlı Geçiş Standartları', points: 25, earned: 24, scorePct: 96, status: 'GEÇTİ ✓' },
                  { course: 'Nakit, POS & Kasa Açığı Güvenlik Prosedürleri', points: 20, earned: 19, scorePct: 95, status: 'GEÇTİ ✓' },
                  { course: 'Müşteri İlişkileri & İletişim Protokolü', points: 25, earned: 25, scorePct: 100, status: 'GEÇTİ ✓' },
                  { course: 'Çapraz Satış Teknikleri & Kasa Arkası Fırsatlar', points: 30, earned: 18, scorePct: 60, status: 'DEVAM EDİYOR ⚡' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[#0B2A4A]">{idx + 1}. {item.course}</span>
                      </div>
                      <span className="text-[11px] text-gray-500 block font-mono">
                        Sınav Başarı Skoru: %{item.scorePct}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0 self-start sm:self-auto">
                      <span className="font-mono text-xs font-black text-[#0B2A4A] bg-white px-2.5 py-1 rounded-lg border border-gray-200">
                        {item.earned} / {item.points} Puan
                      </span>
                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                        item.status.includes('GEÇTİ') ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended 2. Yıl Path for exact user position */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
              <h3 className="font-display font-bold text-lg text-[#0B2A4A] flex items-center space-x-2">
                <BrainCircuit className="h-5 w-5 text-[#34A853]" />
                <span>2. Yıl İleri Seviye Kariyer Modülleri ({userProfile.position})</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {matchedDept.year2Courses.map((recName, i) => (
                  <div key={i} className="bg-[#DDF4F7]/40 border border-[#087F96]/30 p-4 rounded-xl space-y-2">
                    <span className="text-[10px] font-bold text-[#056B80] uppercase">2. Yıl İleri Seviye</span>
                    <h4 className="font-display font-bold text-sm text-[#0B2A4A]">{recName}</h4>
                    <Link href={`/egitimler?dept=${encodeURIComponent(userProfile.position)}`} className="text-xs font-bold text-[#087F96] hover:underline flex items-center">
                      Müfredatı İncele <ChevronRight className="h-3.5 w-3.5 ml-1" />
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
                  { name: `${userProfile.position} Yetkinlik Sertifikası`, date: '2025', code: 'PKA-8841' },
                  { name: 'Perakende Hijyen & Saha Disiplini', date: '2025', code: 'PKA-7120' },
                  { name: 'Müşteri Memnuniyeti & Hizmet Standardı', date: '2026', code: 'PKA-9910' }
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
                {userProfile.position} pozisyonu KPI hesaplamaları veya sınav sorularınız için mentora danışın.
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
