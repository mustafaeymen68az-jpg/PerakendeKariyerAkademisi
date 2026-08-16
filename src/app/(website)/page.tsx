import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import HomeRoleTabs from '@/components/HomeRoleTabs';
import CareerGPSModule from '@/components/CareerGPSModule';
import CareerMapInteractive from '@/components/CareerMapInteractive';
import TalentPoolModule from '@/components/TalentPoolModule';
import TurnoverRiskModule from '@/components/TurnoverRiskModule';
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

// Central Single Source of Truth for Platform Statistics
const PLATFORM_STATS = {
  totalCourses: '45+',
  totalModules: '280+',
  activePositions: '26',
  careerSteps: '15 Basamak',
  retailSectors: '6 Ana Sektör',
};

export default async function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9]">
      {/* -------------------------------------------------- */}
      {/* 1. HERO ALANI WITH PROMINENT 4 ROLE BUTTONS TOP-CENTER */}
      {/* -------------------------------------------------- */}
      <section className="relative bg-gradient-to-br from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white overflow-hidden py-12 sm:py-16 border-b border-[#087F96]/30">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#087F96]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#DDF4F7]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          
          {/* Main Headline */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold text-[#DDF4F7]">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>Perakende Sektörünün Kariyer, Öğrenme ve Yetenek Yönetimi Platformu</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Perakende Sektörüne Özel <span className="text-[#DDF4F7]">Kariyer, Eğitim ve Yetenek Yönetimi</span>
            </h1>

            <p className="text-gray-200 text-base sm:text-lg font-light leading-relaxed max-w-3xl mx-auto">
              Aşağıdaki rol butonlarına tıklayarak doğrudan kendi rolünüze özel yönetim portalına ve sayfalarına geçiş yapabilirsiniz.
            </p>
          </div>

          {/* 🔴 PROMINENT 5 ROLE BUTTONS GRID IN TOP-CENTER HERO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 max-w-7xl mx-auto pt-2">
            
            {/* ROLE 1: ÖĞRENCİ / ÇALIŞAN */}
            <Link
              href="/panel/calisan"
              className="p-4 sm:p-5 bg-gradient-to-br from-[#087F96] to-[#056B80] hover:from-[#056B80] hover:to-[#044F5E] text-white rounded-3xl border-2 border-cyan-300/40 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner">
                  👤
                </div>
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-[9px] font-black tracking-wider uppercase font-mono">
                  ROL 1
                </span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                  Öğrenci / Çalışan Paneli
                </h3>
                <p className="text-[11px] text-cyan-100 font-light mt-1 leading-snug">
                  Kariyer GPS, 8 Sekmeli Panel, Görev Yükleme & Açıklanabilir Skor
                </p>
              </div>
              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-bold text-amber-300">
                <span>Sayfaya Git</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* ROLE 2: EĞİTİM MÜDÜRÜ */}
            <Link
              href="/ik-cozumlari/egitim-yonetimi"
              className="p-4 sm:p-5 bg-gradient-to-br from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-3xl border-2 border-indigo-300/40 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner">
                  📊
                </div>
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-[9px] font-black tracking-wider uppercase font-mono">
                  ROL 2
                </span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                  Eğitim Müdürü Paneli
                </h3>
                <p className="text-[11px] text-indigo-100 font-light mt-1 leading-snug">
                  SCORM LMS, Soru Bankası, Top 5 KPI & Saha Etki Analizi
                </p>
              </div>
              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-bold text-amber-300">
                <span>Sayfaya Git</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* ROLE 3: İNSAN KAYNAKLARI MÜDÜRÜ (İK) */}
            <Link
              href="/panel/ik"
              className="p-4 sm:p-5 bg-gradient-to-br from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white rounded-3xl border-2 border-emerald-300/40 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner">
                  👔
                </div>
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-[9px] font-black tracking-wider uppercase font-mono">
                  ROL 3
                </span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                  İnsan Kaynakları Müdürü (İK)
                </h3>
                <p className="text-[11px] text-emerald-100 font-light mt-1 leading-snug">
                  9-Box Matrisi, Terfi Komitesi, Risk Sinyalleri & Excel Yükleme
                </p>
              </div>
              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-bold text-amber-300">
                <span>Sayfaya Git</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* ROLE 4: CEO / GENEL MÜDÜR */}
            <Link
              href="/panel/ceo"
              className="p-4 sm:p-5 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 rounded-3xl border-2 border-amber-200 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-slate-950/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner">
                  👑
                </div>
                <span className="px-2 py-0.5 bg-slate-950/20 text-slate-950 rounded-full text-[9px] font-black tracking-wider uppercase font-mono">
                  ROL 4
                </span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-950">
                  CEO / Genel Müdür
                </h3>
                <p className="text-[11px] text-slate-900 font-medium mt-1 leading-snug">
                  10 İnsan Sermayesi KPI'sı, 20 Mağaza Simülatörü & ROI
                </p>
              </div>
              <div className="pt-2 border-t border-slate-950/20 flex items-center justify-between text-xs font-black text-slate-950">
                <span>Sayfaya Git</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* ROLE 5: EĞİTMEN */}
            <Link
              href="/egitmen"
              className="p-4 sm:p-5 bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-3xl border-2 border-purple-300/40 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner">
                  👨‍🏫
                </div>
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-[9px] font-black tracking-wider uppercase font-mono">
                  ROL 5
                </span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                  Eğitmen Paneli
                </h3>
                <p className="text-[11px] text-purple-100 font-light mt-1 leading-snug">
                  Eğitim Atama, Soru Bankası, Eğitmen SWOT & Sınav Yönetimi
                </p>
              </div>
              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-bold text-amber-300">
                <span>Sayfaya Git</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 2. 4 PERSONA KARTLARI VE İNTERAKTİF ROL SEKMELERİ */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-[#087F96] px-3.5 py-1 rounded-full text-xs font-bold border border-blue-200">
              <Users className="w-4 h-4 text-[#087F96]" />
              <span>Rol Bazlı İnceleme ve Canlı Demolar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B2A4A] tracking-tight">
              Aşağıdaki Sekmelerden Rol Seçerek Sayfaları İnceleyin
            </h2>
          </div>

          <HomeRoleTabs />
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 3. PKA CAREER: KARİYER GPS & İNTERAKTİF KARİYER HARİTASI */}
      {/* -------------------------------------------------- */}
      <section id="kariyer-haritasi" className="py-16 bg-white space-y-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <CareerGPSModule />
          <CareerMapInteractive />
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 4. PKA TALENT: YETENEK HAVUZU & TURNOVER RISK ANALİZİ */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-[#F4F7F9] space-y-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <TalentPoolModule />
          <TurnoverRiskModule />
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 5. PERAKENDE ALT SEKTÖRLERİ */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RetailSubSectorsSection />
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 6. REFERANSLAR, BAŞARI HİKÂYELERİ & KURUCU */}
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
