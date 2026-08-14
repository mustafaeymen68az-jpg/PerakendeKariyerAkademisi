import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Award, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  FileText, 
  Layers, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import PromotionReadinessModule from '@/components/PromotionReadinessModule';
import TalentPoolModule from '@/components/TalentPoolModule';
import SuccessionPlanModule from '@/components/SuccessionPlanModule';
import EnterpriseROICalculator from '@/components/EnterpriseROICalculator';

export const metadata = {
  title: 'İK Çözümleri | Perakende Kariyer Akademisi',
  description: 'Yetkinlik matrisi, kariyer planlama, yetenek havuzu, terfi yönetimi ve kritik pozisyon yedekleme çözümleri.'
};

export default function HRPage() {
  const hrModules = [
    { title: 'Yetkinlik Matrisi', desc: 'Mağaza ve merkez çalışanlarının teknik ve davranışsal yetkinlik haritası.', icon: <BarChart3 className="h-6 w-6 text-[#087F96]" /> },
    { title: 'Kariyer Planlama', desc: 'Saha çalışanları için görünür, dikey ve yatay kariyer patikaları.', icon: <Layers className="h-6 w-6 text-[#087F96]" /> },
    { title: 'Yetenek Havuzu', desc: 'Yüksek potansiyelli çalışanların ve geleceğin yöneticilerinin pipeline yönetimi.', icon: <Users className="h-6 w-6 text-[#087F96]" /> },
    { title: 'Terfi Yönetimi', desc: 'KPI, sınav ve saha skorlarının ağırlıklandırıldığı %80+ terfi hazırlık sistemi.', icon: <Award className="h-6 w-6 text-[#087F96]" /> },
    { title: 'Yedekleme Planı', desc: 'Mağaza ve bölge müdürlüğü pozisyonlarında iş sürekliliği ve risk haritası.', icon: <ShieldCheck className="h-6 w-6 text-[#087F96]" /> },
    { title: 'Eğitim Yönetimi', desc: '40 modül ve 160 mikro eğitim ile yapılandırılmış öğrenme süreçleri.', icon: <Building2 className="h-6 w-6 text-[#087F96]" /> },
    { title: 'Performans & KPI', desc: 'Ciro, fire ve sepet ortalaması KPI\'larının yetkinlik skoruyla birleştirilmesi.', icon: <TrendingUp className="h-6 w-6 text-[#087F96]" /> },
    { title: 'Çalışan Gelişim Karnesi', desc: 'Her çalışan için 90 günlük somut aksiyon adımları ve şeffaf başarı karnesi.', icon: <FileText className="h-6 w-6 text-[#087F96]" /> }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9]">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white py-16 sm:py-20 border-b border-[#087F96]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#DDF4F7] mb-4">
            <Building2 className="h-4 w-4 text-emerald-400" />
            <span>Kurumsal Perakende İK Teknolojisi</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Perakende İnsan Kaynakları Çözümleri
          </h1>

          <p className="mt-4 text-base sm:text-xl text-gray-200 font-light max-w-3xl mx-auto">
            Geleceğin mağaza, bölge ve üst düzey yöneticilerini tesadüflere bırakmayın. Ölçülebilir yetkinlik matrisi, terfi hazırlık skoru ve yedekleme planları ile kurumsal akademi sisteminizi kurun.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/kurumsal-demo"
              className="px-8 py-4 bg-[#E11D48] hover:bg-[#BE123C] text-white font-extrabold rounded-xl shadow-xl text-sm transition-all"
            >
              Kurumsal Demo Talep Et
            </Link>
            <a
              href="#roi-hesaplayici"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/30 text-sm transition-all"
            >
              ROI Hesaplayıcıyı İncele
            </a>
          </div>
        </div>
      </section>

      {/* 8 Core Modules Overview Grid */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B2A4A]">8 Temel Kurumsal İK Modülü</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Perakende işletmelerinin ihtiyaç duyduğu tüm yetenek yönetimi ve terfi süreçleri tek bir sistemde.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hrModules.map((mod, idx) => (
              <div key={idx} className="p-6 bg-gray-50/80 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all hover:border-[#087F96] space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#087F96]/10 flex items-center justify-center">
                  {mod.icon}
                </div>
                <h3 className="font-bold text-base text-[#0B2A4A]">{mod.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Live Interactive Modules */}
      <PromotionReadinessModule />
      <TalentPoolModule />
      <SuccessionPlanModule />
      <EnterpriseROICalculator />
    </div>
  );
}
