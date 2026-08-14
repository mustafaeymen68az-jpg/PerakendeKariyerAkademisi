'use client';

import React from 'react';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  TrendingUp, 
  BrainCircuit, 
  ShieldCheck, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface DomainCoverage {
  title: string;
  focus: string;
  icon: React.ReactNode;
}

const DOMAINS: DomainCoverage[] = [
  { title: 'Perakende CEO / Genel Müdür Perspektifi', focus: 'Makro Perakende Stratejileri & Şirket Büyümesi', icon: <Building2 className="h-5 w-5" /> },
  { title: 'İnsan Kaynakları & Yetenek Yönetimi', focus: 'İç Terfi, Turnover Azaltma & İK Metrikleri', icon: <Users className="h-5 w-5" /> },
  { title: 'Akademik Danışmanlık', focus: 'Bilimsel Öğrenme Yöntemleri & Yetkinlik Ölçümü', icon: <GraduationCap className="h-5 w-5" /> },
  { title: 'Mağaza Operasyonları', focus: 'Saha Standartları & Şube İçi Verimlilik', icon: <ShieldCheck className="h-5 w-5" /> },
  { title: 'Satın Alma / Kategori Yönetimi', focus: 'Ticari Strateji, Marjlar & Tedarikçi İlişkileri', icon: <TrendingUp className="h-5 w-5" /> },
  { title: 'Finans / KPI & Bütçe', focus: 'P&L Analizi, Fire Yönetimi & EBITDA Katkısı', icon: <TrendingUp className="h-5 w-5" /> },
  { title: 'CRM / Veri Analitiği', focus: 'Müşteri Davranış Analizi & Sadakat', icon: <BrainCircuit className="h-5 w-5" /> },
  { title: 'Dijital Dönüşüm & Yapay Zekâ', focus: 'Omnichannel Mağazacılık & AI Uygulamaları', icon: <Sparkles className="h-5 w-5" /> }
];

export default function AdvisoryBoardSection() {
  return (
    <section className="py-16 bg-[#F4F7F9] border-b border-gray-200" id="danisma-kurulu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#0B2A4A]/10 border border-[#0B2A4A]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0B2A4A] mb-3">
            <GraduationCap className="h-4 w-4 text-[#087F96]" />
            <span>Sektörel & Akademik Danışma Mimarisi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2A4A] tracking-tight">
            Akademik & Sektörel Danışma Kurulu
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Platformumuzun müfredatı, terfi sınavları ve yetkinlik standartları perakende liderleri, akademisyenler ve İK direktörlerinin danışmanlığında şekillenmektedir.
          </p>
        </div>

        {/* Board Domain Coverage Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DOMAINS.map((dom, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2 hover:border-[#087F96] transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#087F96]/10 text-[#087F96] flex items-center justify-center font-bold">
                {dom.icon}
              </div>
              <h3 className="font-extrabold text-sm text-[#0B2A4A]">{dom.title}</h3>
              <p className="text-xs text-gray-500">{dom.focus}</p>
              <div className="text-[10px] text-emerald-700 font-bold flex items-center pt-2">
                <CheckCircle2 className="h-3 w-3 mr-1" /> Danışma Temsil Alanı
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
