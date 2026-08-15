import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import CareerGPSModule from '@/components/CareerGPSModule';
import TalentMatrix9Box from '@/components/TalentMatrix9Box';
import TurnoverRiskModule from '@/components/TurnoverRiskModule';
import LearningControlCenter from '@/components/LearningControlCenter';
import ExecutiveDashboard from '@/components/ExecutiveDashboard';
import TalentPoolModule from '@/components/TalentPoolModule';
import SuccessionPlanModule from '@/components/SuccessionPlanModule';
import PromotionReadinessModule from '@/components/PromotionReadinessModule';
import EmployeeScorecard from '@/components/EmployeeScorecard';
import RetailSubSectorsSection from '@/components/RetailSubSectorsSection';
import CorporatePackagesSection from '@/components/CorporatePackagesSection';
import FounderSection from '@/components/FounderSection';
import AdvisoryBoardSection from '@/components/AdvisoryBoardSection';
import SuccessStoriesSection from '@/components/SuccessStoriesSection';
import EnterpriseROICalculator from '@/components/EnterpriseROICalculator';

import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Building,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Target,
  BarChart3,
  Layers,
  ChevronRight,
  UserCheck,
  Building2,
  Briefcase,
  Crown,
  Zap,
  Navigation,
  Grid,
  ShieldAlert,
  Activity,
  Check
} from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9]">
      {/* -------------------------------------------------- */}
      {/* 1. HERO ALANI */}
      {/* -------------------------------------------------- */}
      <section className="relative bg-gradient-to-br from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white overflow-hidden py-16 sm:py-20 border-b border-[#087F96]/30">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#087F96]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#DDF4F7]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold text-[#DDF4F7]">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span>Perakende Sektörünün Kariyer ve İnsan Sermayesi Yönetim Platformu</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Perakende Sektörünün Kariyer, Yetkinlik ve <span className="text-[#DDF4F7]">Yönetici Yetiştirme Platformu</span>
              </h1>

              {/* Subtitle & Supporting Message */}
              <p className="text-gray-200 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Çalışanın kariyerini, kurumun geleceğini yönetin. Perakende çalışanlarının kariyer yolunu görünür hale getirir; işletmelerin yeteneği keşfetmesini, geliştirmesini ve geleceğin yöneticilerini içeriden yetiştirmesini sağlar.
              </p>

              {/* Brand Journey Steps Pill */}
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 bg-white/10 p-2.5 rounded-2xl border border-white/15 text-xs font-mono font-bold text-amber-300">
                <span>Ölç</span>
                <span className="text-white">➔</span>
                <span>Geliştir</span>
                <span className="text-white">➔</span>
                <span>Yeteneği Keşfet</span>
                <span className="text-white">➔</span>
                <span>Terfi Ettir</span>
                <span className="text-white">➔</span>
                <span className="text-emerald-300 font-black">Geleceğin Liderlerini Yetiştir</span>
              </div>

              {/* 2 Main CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-xl mx-auto lg:mx-0">
                <Link
                  href="/kariyerimi-planla"
                  className="group p-4 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-white/20 text-left flex flex-col justify-between"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black uppercase tracking-wider text-white">Kariyerimi Planla</span>
                    <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                  <span className="text-xs text-blue-100 font-normal mt-2">
                    Mevcut seviyeni öğren, eksiklerini gör ve yolculuğunu başlat
                  </span>
                </Link>

                <Link
                  href="/ik-cozumlari"
                  className="group p-4 bg-gradient-to-r from-[#E11D48] to-[#BE123C] hover:opacity-95 text-white font-extrabold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-left flex flex-col justify-between"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black uppercase tracking-wider text-white">Kurumsal Çözümleri İncele</span>
                    <Building2 className="h-4 w-4 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-xs text-rose-100 font-normal mt-2">
                    İK, Eğitim Müdürlüğü ve CEO / İşveren panelleri
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Col: Live Interactive Mockup */}
            <div className="lg:col-span-5">
              <div className="bg-[#061B33]/90 backdrop-blur-xl border border-[#087F96]/40 rounded-3xl p-6 shadow-2xl space-y-4 relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-[#087F96] flex items-center justify-center font-bold text-white text-xs">
                      PKA
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">Canlı Yönetici Dashboardı</div>
                      <div className="text-[10px] text-gray-400">PKA EXECUTIVE & PKA TALENT</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-bold">
                    CANLI PANEL
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] text-gray-400">Terfi Hazırlık Skoru</div>
                    <div className="text-xl font-black text-emerald-400 mt-0.5">%83</div>
                    <div className="text-[9px] text-emerald-300">Terfiye Hazır (Mağaza Müdürü)</div>
                  </div>

                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] text-gray-400">Kritik Pozisyon Yedekleme</div>
                    <div className="text-xl font-black text-[#DDF4F7] mt-0.5">%75</div>
                    <div className="text-[9px] text-blue-300">63 Pozisyon Yedekli</div>
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-gray-300 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span className="font-semibold text-white">Ahmet Yılmaz</span>
                  </div>
                  <span className="text-[11px] text-gray-400">Mağaza Müdürü Aday Havuzunda</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 2. 4 PERSONA GİRİŞİ (HERO ALTINDAKİ ANA BÖLÜM) */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-[#087F96] px-3.5 py-1 rounded-full text-xs font-bold border border-blue-200">
              <Users className="w-4 h-4 text-[#087F96]" />
              <span>4 Profesyonel Persona Girişi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B2A4A] tracking-tight">
              Perakende Kariyer Akademisi'nde Ne Yapmak İstiyorsunuz?
            </h2>
            <p className="text-sm text-gray-600">
              Rolünüze özel tasarlanmış dijital araçlar, analiz panelleri ve gelişim rotaları ile hedefinizi seçin.
            </p>
          </div>

          {/* 4 LARGE PROFESSIONAL PERSONA CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* PERSONA 1: ÇALIŞANIM */}
            <div className="bg-gradient-to-b from-blue-50/60 via-white to-blue-50/30 rounded-3xl border-2 border-blue-200 hover:border-[#087F96] p-6 shadow-lg flex flex-col justify-between space-y-5 transition-all hover:scale-[1.02] group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#087F96] text-white flex items-center justify-center font-black text-xl shadow-md">
                  👤
                </div>
                <span className="text-[10px] font-mono font-black text-[#087F96] uppercase tracking-wider block">PKA CAREER</span>
                <h3 className="text-xl font-black text-[#0B2A4A] group-hover:text-[#087F96] transition-colors">
                  Kariyerimi Planlamak İstiyorum
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  Perakende sektöründe mevcut seviyeni öğren, kariyer hedefini belirle, eksik yetkinliklerini gör ve gelişim yolculuğunu başlat.
                </p>

                <div className="space-y-1.5 pt-2 border-t border-gray-100 text-[11px] font-bold text-gray-700">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#087F96]">✓</span>
                    <span>Kariyer GPS</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#087F96]">✓</span>
                    <span>Kariyer Seviyeni Öğren</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#087F96]">✓</span>
                    <span>Yetkinlik Pasaportu & Terfi Skoru</span>
                  </div>
                </div>
              </div>

              <Link
                href="/kariyerimi-planla"
                className="w-full py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-black text-xs rounded-xl text-center shadow-md transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Kariyerimi Planla</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* PERSONA 2: İNSAN KAYNAKLARI YÖNETİCİSİYİM */}
            <div className="bg-gradient-to-b from-emerald-50/60 via-white to-emerald-50/30 rounded-3xl border-2 border-emerald-200 hover:border-emerald-500 p-6 shadow-lg flex flex-col justify-between space-y-5 transition-all hover:scale-[1.02] group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-md">
                  👔
                </div>
                <span className="text-[10px] font-mono font-black text-emerald-700 uppercase tracking-wider block">PKA TALENT</span>
                <h3 className="text-xl font-black text-[#0B2A4A] group-hover:text-emerald-700 transition-colors">
                  Yeteneği Keşfetmek ve Terfiyi Yönetmek İstiyorum
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  Çalışanların yetkinliklerini ölç, yüksek potansiyelli çalışanları belirle, terfi adaylarını oluştur ve kritik pozisyonları yedekle.
                </p>

                <div className="space-y-1.5 pt-2 border-t border-gray-100 text-[11px] font-bold text-gray-700">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-emerald-600">✓</span>
                    <span>Yetkinlik Matrisi & 3'lü Havuz</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-emerald-600">✓</span>
                    <span>9 Box Talent Matrix</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-emerald-600">✓</span>
                    <span>Kritik Pozisyon & Turnover Risk</span>
                  </div>
                </div>
              </div>

              <Link
                href="/ik-cozumlari"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl text-center shadow-md transition-all flex items-center justify-center space-x-1.5"
              >
                <span>İK Çözümleri</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* PERSONA 3: EĞİTİM YÖNETİCİSİYİM */}
            <div className="bg-gradient-to-b from-purple-50/60 via-white to-purple-50/30 rounded-3xl border-2 border-purple-200 hover:border-purple-600 p-6 shadow-lg flex flex-col justify-between space-y-5 transition-all hover:scale-[1.02] group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-xl shadow-md">
                  🎓
                </div>
                <span className="text-[10px] font-mono font-black text-purple-700 uppercase tracking-wider block">PKA LEARNING</span>
                <h3 className="text-xl font-black text-[#0B2A4A] group-hover:text-purple-700 transition-colors">
                  Çalışanları Geliştirmek ve Eğitim Etkisini Ölçmek İstiyorum
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  Eğitim ihtiyaçlarını belirle, gelişim programlarını yönet, saha uygulamalarını takip et ve eğitimlerin performansa etkisini ölç.
                </p>

                <div className="space-y-1.5 pt-2 border-t border-gray-100 text-[11px] font-bold text-gray-700">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-purple-600">✓</span>
                    <span>Eğitim Kontrol Merkezi</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-purple-600">✓</span>
                    <span>Eğitim Etki Analizi & ROI</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-purple-600">✓</span>
                    <span>İç Eğitmen Akademisi</span>
                  </div>
                </div>
              </div>

              <Link
                href="/ik-cozumlari/egitim-yonetimi"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl text-center shadow-md transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Eğitim Yönetimi</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* PERSONA 4: CEO / GENEL MÜDÜRÜM */}
            <div className="bg-gradient-to-b from-amber-50/60 via-white to-amber-50/30 rounded-3xl border-2 border-amber-300 hover:border-amber-500 p-6 shadow-lg flex flex-col justify-between space-y-5 transition-all hover:scale-[1.02] group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center justify-center font-black text-xl shadow-md">
                  👑
                </div>
                <span className="text-[10px] font-mono font-black text-amber-800 uppercase tracking-wider block">PKA EXECUTIVE</span>
                <h3 className="text-xl font-black text-[#0B2A4A] group-hover:text-amber-800 transition-colors">
                  İnsan Sermayemi ve Geleceğin Yöneticilerini Yönetmek İstiyorum
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  Organizasyonunuzun yönetici pipeline'ını, yüksek potansiyellerini, kritik pozisyon risklerini ve gelecekteki yönetici ihtiyacını tek ekranda görün.
                </p>

                <div className="space-y-1.5 pt-2 border-t border-gray-100 text-[11px] font-bold text-gray-700">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-amber-600">✓</span>
                    <span>İnsan Sermayesi Dashboardu</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-amber-600">✓</span>
                    <span>Yönetici Pipeline</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-amber-600">✓</span>
                    <span>"20 Yeni Mağaza Açsak" Senaryosu</span>
                  </div>
                </div>
              </div>

              <Link
                href="/ik-cozumlari/gelisim-karnesi"
                className="w-full py-3 bg-[#0B2A4A] hover:bg-[#061B33] text-white font-black text-xs rounded-xl text-center shadow-md transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Yönetici Dashboardu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 3. PKA CAREER: KARİYER GPS MODÜLÜ */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-[#F4F7F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CareerGPSModule />
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 4. PKA TALENT: YETENEK HAVUZU & 9 BOX MATRİSİ */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-white border-t border-gray-200 space-y-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* 9 Box Talent Matrix */}
          <TalentMatrix9Box />

          {/* 3'lü Yetenek Havuzu Modülü */}
          <TalentPoolModule />

          {/* Turnover Risk Analizi */}
          <TurnoverRiskModule />
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 5. PKA LEARNING: EĞİTİM KONTROL MERKEZİ */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-[#F4F7F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LearningControlCenter />
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 6. PKA EXECUTIVE: CEO İNSAN SERMAYESİ DASHBOARDU */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-[#061B33]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ExecutiveDashboard />
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 7. PERAKENDE ALT SEKTÖRLERİ (Point 27) */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RetailSubSectorsSection />
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 8. REFERANSLAR, BAŞARI HİKÂYELERİ & KURUCU */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-[#F4F7F9] space-y-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SuccessStoriesSection />
          <FounderSection />
          <AdvisoryBoardSection />
        </div>
      </section>
    </div>
  );
}
