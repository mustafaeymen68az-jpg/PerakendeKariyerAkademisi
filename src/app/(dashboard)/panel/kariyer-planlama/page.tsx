'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Award, 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  Building2, 
  Flag, 
  ArrowRight,
  UserCheck,
  Zap,
  BarChart3,
  ArrowLeft,
  Lightbulb,
  ShieldAlert,
  BrainCircuit
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '@/data/departmentsData';

interface CareerPathOption {
  id: string;
  fromTitle: string;
  targetTitle: string;
  totalSteps: number;
  currentStepIndex: number;
  stages: { name: string; desc: string }[];
  completedCourses: string[];
  remainingCourses: { title: string; duration: string; targetMonth: string }[];
}

export default function StudentCareerPlannerPage() {
  const [userData, setUserData] = useState<{ name: string; position: string }>({
    name: 'Mehmet Yılmaz',
    position: 'Kasiyer'
  });

  const [selectedTargetDeptId, setSelectedTargetDeptId] = useState('magaza-muduru');

  useEffect(() => {
    try {
      const match = document.cookie.match(/user_session=([^;]+)/);
      if (match) {
        const parsed = JSON.parse(decodeURIComponent(match[1]));
        setUserData({
          name: parsed.name || 'Mehmet Yılmaz',
          position: parsed.title || parsed.department || 'Kasiyer'
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Find target department
  const targetDept = DEPARTMENTS_DATA.find((d) => d.id === selectedTargetDeptId) || DEPARTMENTS_DATA[0];

  // Pre-completed training courses from previous education history
  const previousCompletedCourses = [
    'Kasa POS Cihazı ve Hızlı Geçiş Standartları',
    'Müşteri İletişimi ve Güler Yüzlü Hizmet Esasları',
    'Sahte Para Kontrolü ve Kasa Güvenliği'
  ];

  // Remaining required courses for the target goal
  const remainingCourses = targetDept.year1Courses.concat(targetDept.year2Courses)
    .filter((title) => !previousCompletedCourses.includes(title))
    .slice(0, 6)
    .map((title, idx) => ({
      title,
      duration: `${idx % 2 === 0 ? 3 : 4} Saat`,
      targetMonth: idx === 0 ? 'Bu Ay (Ağustos)' : idx === 1 ? 'Eylül 2026' : idx === 2 ? 'Ekim 2026' : 'Kasım 2026'
    }));

  const totalCoursesInPath = previousCompletedCourses.length + remainingCourses.length;
  const completionPercentage = Math.round((previousCompletedCourses.length / totalCoursesInPath) * 100);

  // Career Journey Stages
  const careerStages = [
    { title: '1. Aşama: Temel Saha Hizmeti', status: 'COMPLETED', desc: 'Saha uyumu, kıyafet/hijyen standartları ve temel kasa işlemleri.' },
    { title: '2. Aşama: Görev Ustalığı & Hız', status: 'COMPLETED', desc: 'Kasa hız standartları, sıfır hata ve müşteri memnuniyeti.' },
    { title: `3. Aşama: ${targetDept.name} Adaylığı`, status: 'IN_PROGRESS', desc: 'P&L kar-zarar yönetimi, mağaza auditleri ve bütçe planlaması.' },
    { title: '4. Aşama: Stratejik Liderlik & Denetim', status: 'LOCKED', desc: 'Performans koçluğu, turnover düşürme ve mağaza verimliliği.' },
    { title: `5. Terfi Hedefi: ${targetDept.name}`, status: 'LOCKED', desc: 'QR Sertifika onaylı resmi terfi ve atama süreci.' }
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header & Back Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link 
              href="/panel"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#087F96] hover:underline mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Öğrenci Paneline Dön</span>
            </Link>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#0B2A4A]">
              Kariyer Planlama ve Akıllı Eğitim Takvimi 🎯
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 font-light mt-0.5">
              Hedeflediğiniz kariyer pozisyonunu seçin, tamamlanan ve kalan eğitimlerinizi inceleyerek kişisel takviminizi takip edin.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#0B2A4A] bg-white p-3 rounded-2xl border border-gray-200 shadow-xs shrink-0">
            <Building2 className="h-4 w-4 text-[#087F96]" />
            <span>Mevcut Pozisyonum: <strong>{userData.position}</strong></span>
          </div>
        </div>

        {/* 1. Career Target Selector Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
          <div className="flex items-center space-x-3 border-b border-gray-100 pb-4">
            <div className="p-3 bg-[#087F96] text-white rounded-2xl shadow-md">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-lg text-[#0B2A4A]">
                Hedef Kariyer Pozisyonunuzu Seçin
              </h2>
              <p className="text-xs text-gray-500 font-light">
                Hangi perakende kadrosuna terfi etmek istiyorsunuz? Seçtiğiniz hedefe göre yol haritanız anında güncellenir.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-bold">
            <div>
              <label className="block text-[#0B2A4A] mb-1.5">Hedeflediğiniz Kadro / Departman (26 Kadro):</label>
              <select
                value={selectedTargetDeptId}
                onChange={(e) => setSelectedTargetDeptId(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none shadow-xs"
              >
                {DEPARTMENTS_DATA.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    🎯 {dept.name} ({dept.year1Courses.length + dept.year2Courses.length} Eğitim • {dept.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-[#F4F7F9] p-3 rounded-xl border border-gray-200 flex flex-col justify-center space-y-1">
              <span className="text-[10px] text-gray-400 font-semibold uppercase">Hedef Kadro Detayı</span>
              <span className="text-xs font-extrabold text-[#0B2A4A]">{targetDept.name}</span>
              <span className="text-[11px] text-[#087F96] font-medium">{targetDept.totalHours} Saatlik Müfredat • {targetDept.competencyLevel}</span>
            </div>

            <div className="bg-[#DDF4F7]/60 p-3 rounded-xl border border-[#087F96]/30 flex flex-col justify-center space-y-1">
              <span className="text-[10px] text-[#087F96] font-extrabold uppercase">Terfi Yolculuğu Hedefi</span>
              <span className="text-xs font-extrabold text-[#0B2A4A] flex items-center space-x-1">
                <span>{userData.position}</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#087F96]" />
                <span className="text-[#087F96]">{targetDept.name}</span>
              </span>
              <span className="text-[11px] text-gray-600 font-light">Otomatik Müfredat Hesabı Aktif</span>
            </div>
          </div>
        </div>

        {/* 2. Career Journey Overview Progress Card */}
        <div className="bg-[#0B2A4A] text-white p-8 rounded-3xl shadow-xl border border-[#087F96]/40 space-y-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#DDF4F7] bg-white/10 px-3.5 py-1 rounded-full w-fit">
                <Sparkles className="h-3.5 w-3.5 text-[#34A853]" />
                <span>CANLI KARİYER İLERLEME ANALİZİ</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                Kariyer Yolculuğunuzun <strong className="text-[#DDF4F7]">%{completionPercentage}</strong> Kısmındasınız!
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 font-light max-w-2xl">
                Tamamlanan <strong>{previousCompletedCourses.length} eğitiminiz</strong> işlendi. Hedeflediğiniz <strong>"{targetDept.name}"</strong> pozisyonuna ulaşmanız için <strong>{remainingCourses.length} zorunlu dersiniz</strong> kalmıştır.
              </p>
            </div>

            {/* Circular / Large Gauge Percentage */}
            <div className="bg-white/10 p-5 rounded-2xl border border-white/20 text-center shrink-0 min-w-[160px] space-y-1">
              <span className="text-xs font-mono text-gray-300 uppercase font-bold block">Tamamlama Oranı</span>
              <span className="text-4xl font-black text-white font-mono block">%{completionPercentage}</span>
              <span className="text-[10px] text-[#DDF4F7] font-semibold block">Aşama 3 / 5 Ulaşıldı</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 relative z-10">
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5 border border-white/20">
              <div 
                className="bg-gradient-to-r from-[#087F96] to-[#34A853] h-full rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-gray-300">
              <span>Aşama 1: Başlangıç (%0)</span>
              <span className="text-white font-bold">🎯 Şu Anki Seviye (%{completionPercentage})</span>
              <span>Final: {targetDept.name} (%100)</span>
            </div>
          </div>
        </div>

        {/* 3. Visual Step-by-Step Career Roadmap */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
            <TrendingUp className="h-5 w-5 text-[#087F96]" />
            <h3 className="font-display font-extrabold text-lg text-[#0B2A4A]">
              Adım Adım Kariyer Yol Haritası (5 Aşama)
            </h3>
          </div>

          <div className="space-y-4">
            {careerStages.map((st, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  st.status === 'COMPLETED'
                    ? 'bg-emerald-50/60 border-emerald-300 text-emerald-900'
                    : st.status === 'IN_PROGRESS'
                    ? 'bg-[#DDF4F7]/60 border-[#087F96] text-[#0B2A4A] ring-2 ring-[#087F96]/20 shadow-xs'
                    : 'bg-gray-50 border-gray-200 text-gray-400'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    st.status === 'COMPLETED'
                      ? 'bg-emerald-600 text-white'
                      : st.status === 'IN_PROGRESS'
                      ? 'bg-[#087F96] text-white shadow-md'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {st.status === 'COMPLETED' ? <CheckCircle2 className="h-5 w-5" /> : idx + 1}
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-sm sm:text-base">
                      {st.title}
                    </h4>
                    <p className="text-xs font-light leading-relaxed mt-0.5">
                      {st.desc}
                    </p>
                  </div>
                </div>

                <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full shrink-0 uppercase tracking-wider self-start sm:self-auto ${
                  st.status === 'COMPLETED'
                    ? 'bg-emerald-200/80 text-emerald-900'
                    : st.status === 'IN_PROGRESS'
                    ? 'bg-[#087F96] text-white shadow-xs'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {st.status === 'COMPLETED' ? 'Tamamlandı ✓' : st.status === 'IN_PROGRESS' ? 'Şu Anki Aşama ⚡' : 'Kilitli'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Completed vs Remaining Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Previous Completed Courses */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 space-y-4">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <div>
                <h3 className="font-display font-bold text-base text-[#0B2A4A]">Tamamlanan Önceki Eğitimler ({previousCompletedCourses.length})</h3>
                <p className="text-xs text-gray-500 font-light">Geçmişte başarıyla bitirdiğiniz ve hesaba katılan dersler.</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {previousCompletedCourses.map((c, i) => (
                <div key={i} className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px]">✓</span>
                    <span className="font-bold text-emerald-900">{c}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-extrabold">Geçti (%95)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Remaining Required Courses */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 space-y-4">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
              <BookOpen className="h-5 w-5 text-[#087F96]" />
              <div>
                <h3 className="font-display font-bold text-base text-[#0B2A4A]">Terfi İçin Kalan Zorunlu Eğitimler ({remainingCourses.length})</h3>
                <p className="text-xs text-gray-500 font-light">Hedefiniz olan "{targetDept.name}" pozisyonu için almanız gereken dersler.</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {remainingCourses.map((c, i) => (
                <div key={i} className="bg-[#F8FAFC] hover:bg-[#DDF4F7]/40 p-3 rounded-xl border border-gray-200 transition-colors flex items-center justify-between">
                  <div className="flex items-center space-x-2 truncate pr-2">
                    <span className="w-5 h-5 rounded-full bg-[#087F96] text-white font-bold flex items-center justify-center text-[10px] shrink-0 font-mono">{i + 1}</span>
                    <span className="font-bold text-[#0B2A4A] truncate">{c.title}</span>
                  </div>
                  <Link 
                    href={`/egitim/${c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="text-[#087F96] hover:underline font-bold text-[11px] shrink-0"
                  >
                    Ders Detayı →
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 5. Otomatik Pozisyon Bazlı SWOT Analizi & Kişisel Yetkinlik Önerileri */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2.5 bg-[#087F96] text-white rounded-xl shadow-xs">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg text-[#0B2A4A]">
                  Alınan Eğitimlere Göre Otomatik SWOT Analizi ({targetDept.name})
                </h3>
                <p className="text-xs text-gray-500 font-light">
                  Tamamlanan {previousCompletedCourses.length} dersiniz ve sınav notlarınıza göre üretilen pozisyona özel SWOT matrisi.
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ✓ %95 Başarı Skoru Analiz Edildi
            </span>
          </div>

          {/* 4-Quadrant SWOT Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            {/* Güçlü Yönler */}
            <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-emerald-800 font-extrabold">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span>1. GÜÇLÜ YÖNLER (Strengths)</span>
              </div>
              <p className="text-emerald-900 font-medium leading-relaxed">
                Tamamladığınız <strong>"{previousCompletedCourses[0]}"</strong> ve <strong>"{previousCompletedCourses[1]}"</strong> modüllerinde <strong>%95 başarı notuna</strong> ulaştınız. Kasa hızı, sahte para tespiti ve müşteri iletişiminde yüksek yetkinliğiniz var.
              </p>
            </div>

            {/* Zayıf / Geliştirilecek Yönler */}
            <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-amber-800 font-extrabold">
                <ShieldAlert className="h-4 w-4 text-amber-600" />
                <span>2. GELİŞTİRİLECEK YÖNLER (Weaknesses)</span>
              </div>
              <p className="text-amber-900 font-medium leading-relaxed">
                Hedefiniz olan <strong>"{targetDept.name}"</strong> kadrosuna geçiş için gereken <strong>"Mağaza P&L Kar-Zarar Yönetimi"</strong> ve <strong>"KPI Bütçe Analitiği"</strong> derslerini henüz tamamlamadınız.
              </p>
            </div>

            {/* Fırsatlar */}
            <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-blue-800 font-extrabold">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span>3. KARİYER FIRSATLARI (Opportunities)</span>
              </div>
              <p className="text-blue-900 font-medium leading-relaxed">
                Mağaza Müdür Yardımcılığı veya Kıdemli Kasiyer Ustalığı terfi adaylığında <strong>ilk %10'luk dilimdesiniz</strong>. Yapay Zekâ ve P&L modüllerini bitirdiğinizde terfi şansınız %40 artacak.
              </p>
            </div>

            {/* Saha Riskleri */}
            <div className="bg-rose-50/70 border border-rose-200 p-4 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-rose-800 font-extrabold">
                <ShieldAlert className="h-4 w-4 text-rose-600" />
                <span>4. SAHA RİSKLERİ & TEHDİTLER (Threats)</span>
              </div>
              <p className="text-rose-900 font-medium leading-relaxed">
                Yoğun kampanya dönemlerinde stok ve fire sayımlarını zamanında sisteme girmeme riski bulunmaktadır. Zaman yönetimini bütçeleme dersi ile desteklemelisiniz.
              </p>
            </div>

          </div>

          {/* Personal Competency Action Plan */}
          <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-gray-200 space-y-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h4 className="font-display font-extrabold text-sm text-[#0B2A4A]">
                💡 Kişisel Yetkinlik Gelişim Önerileri ve Eylem Planınız
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1.5 shadow-2xs">
                <span className="text-[10px] font-bold text-[#087F96] bg-[#DDF4F7] px-2 py-0.5 rounded-full uppercase">
                  1. Öneri: Finans & P&L
                </span>
                <strong className="block text-[#0B2A4A] font-bold">Mağaza P&L Kar-Zarar Simülasyonunu Başlatın</strong>
                <p className="text-gray-600 font-light text-[11px] leading-relaxed">
                  Brüt marj ve fire hesaplama formüllerini bu ay takviminize ekleyerek bütçeleme yetkinliğinizi güçlendirin.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1.5 shadow-2xs">
                <span className="text-[10px] font-bold text-[#087F96] bg-[#DDF4F7] px-2 py-0.5 rounded-full uppercase">
                  2. Öneri: Saha Auditi
                </span>
                <strong className="block text-[#0B2A4A] font-bold">Mağaza İçi Fire Önleme Kılavuzunu İnceleyin</strong>
                <p className="text-gray-600 font-light text-[11px] leading-relaxed">
                  Reyon düzeni ve zayiat minimizasyonu için koli ve etiket denetim adımlarını pratiğe dökün.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1.5 shadow-2xs">
                <span className="text-[10px] font-bold text-[#087F96] bg-[#DDF4F7] px-2 py-0.5 rounded-full uppercase">
                  3. Öneri: Eğitmen İletişimi
                </span>
                <strong className="block text-[#0B2A4A] font-bold">Eğitmeninizden Vaka Görüşü Alın</strong>
                <p className="text-gray-600 font-light text-[11px] leading-relaxed">
                  Eğitmen mesajlaşma modülünden Dr. Ahmet Yılmaz'a P&L sorularınızı ileterek mentörlük desteği alın.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Personalized Smart Training Calendar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-[#087F96]" />
              <div>
                <h3 className="font-display font-extrabold text-lg text-[#0B2A4A]">
                  Kişiselleştirilmiş Akıllı Eğitim Takvimi
                </h3>
                <p className="text-xs text-gray-500 font-light">
                  Kalan dersleriniz için hedefinize göre planlanan aylık eğitim takviminiz.
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold text-[#087F96] bg-[#DDF4F7] px-3.5 py-1.5 rounded-xl border border-[#087F96]/30">
              📅 Hedef Tamamlama: Aralık 2026
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {remainingCourses.slice(0, 4).map((c, idx) => (
              <div key={idx} className="bg-[#F8FAFC] p-4 rounded-2xl border border-gray-200 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-[#087F96] bg-[#DDF4F7] px-2.5 py-0.5 rounded-full uppercase">
                    {c.targetMonth}
                  </span>
                  <span className="font-mono text-gray-400 text-[11px]">{c.duration}</span>
                </div>

                <h4 className="font-display font-bold text-sm text-[#0B2A4A] leading-tight">
                  {c.title}
                </h4>

                <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 font-light">Durum: Bekliyor</span>
                  <Link 
                    href={`/egitim/${c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="text-[#087F96] font-bold hover:underline"
                  >
                    Başlat →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
