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
import SuccessionPlanModule from '@/components/SuccessionPlanModule';
import EnterpriseROICalculator from '@/components/EnterpriseROICalculator';

export const metadata = {
  title: 'İK Çözümleri | Perakende Kariyer Akademisi',
  description: 'Yetkinlik matrisi, terfi yönetimi, kritik pozisyon yedekleme ve kurumsal gelişim karnesi çözümleri.'
};

export default function HRPage() {
  const hrModules = [
    { title: 'Yetkinlik Matrisi', desc: 'Mağaza ve merkez çalışanlarının teknik ve davranışsal yetkinlik haritası.', icon: <BarChart3 className="h-6 w-6 text-[#087F96]" /> },
    { title: 'Terfi Yönetimi', desc: 'KPI, sınav ve saha skorlarının ağırlıklandırıldığı %80+ terfi hazırlık sistemi.', icon: <Award className="h-6 w-6 text-[#087F96]" /> },
    { title: 'Yedekleme Planı', desc: 'Mağaza ve bölge müdürlüğü pozisyonlarında iş sürekliliği ve risk haritası.', icon: <ShieldCheck className="h-6 w-6 text-[#087F96]" /> },
    { title: 'Eğitim Yönetimi', desc: '40 modül ve 160 mikro eğitim ile yapılandırılmış öğrenme süreçleri.', icon: <Building2 className="h-6 w-6 text-[#087F96]" /> },
    { title: 'Performans & KPI', desc: 'Ciro, fire ve sepet ortalaması KPI\'larının yetkinlik skoruyla birleştirilmesi.', icon: <TrendingUp className="h-6 w-6 text-[#087F96]" /> },
    { title: 'Çalışan Gelişim Karnesi', desc: 'Her çalışan için 90 günlük somut aksiyon adımları ve şeffaf başarı karnesi.', icon: <FileText className="h-6 w-6 text-[#087F96]" /> }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9]">
      {/* Hero Header */}
      <section className="bg-[#0B2A4A] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#087F96]/30">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#DDF4F7]">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>KURUMSAL İNSAN KAYNAKLARI SİSTEMLERİ</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Perakende İK & Yetkinlik Dönüşüm Çözümleri
          </h1>

          <p className="text-gray-200 text-sm sm:text-base max-w-3xl font-light leading-relaxed">
            Objektif yetkinlik matrisi, %80+ puan terfi hazırlık skorlaması ve kritik pozisyon yedekleme planları ile şirketinizde iç terfi oranını %85'e çıkarın, turn-over oranını düşürün.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/kurumsal-demo"
              className="px-6 py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white font-extrabold rounded-xl text-xs shadow-lg transition-all flex items-center space-x-2"
            >
              <span>Kurumsal Demo Talep Et</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/kariyerimi-planla"
              className="px-6 py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl text-xs shadow-lg transition-all flex items-center space-x-2"
            >
              <span>Kariyerimi Planlıyorum</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main HR Modules Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold text-[#0B2A4A]">Kurumsal İK Modül Yapısı</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hrModules.map((mod, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3 hover:border-[#087F96] transition-all">
                <div className="p-3 bg-gray-50 rounded-xl w-fit border border-gray-100">
                  {mod.icon}
                </div>
                <h3 className="font-bold text-base text-[#0B2A4A]">{mod.title}</h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Promotion Readiness Interactive Module */}
        <PromotionReadinessModule />

        {/* Succession Plan Module */}
        <SuccessionPlanModule />

        {/* Enterprise ROI Calculator */}
        <EnterpriseROICalculator />
      </section>
    </div>
  );
}
