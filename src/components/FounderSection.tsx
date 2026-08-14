'use client';

import React from 'react';
import { 
  Building2, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles,
  TrendingUp,
  BrainCircuit,
  ShoppingBag,
  Users
} from 'lucide-react';

export default function FounderSection() {
  const expertiseList = [
    'Perakende Sektör Dinamikleri',
    'Mağaza Operasyon Yönetimi',
    'Satın Alma & Müzakere',
    'Kategori Yönetimi',
    'KPI ve Performans Yönetimi',
    'Veri Analitiği & Raporlama',
    'Perakende Eğitim Müfredatı',
    'Kariyer & Yetkinlik Geliştirme',
    'İnsan Kaynakları Teknolojisi',
    'Dijital Dönüşüm & AI Entegrasyonu',
    'CRM & Müşteri Bağlılığı'
  ];

  return (
    <section className="py-16 bg-white border-b border-gray-200" id="kurucu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B2A4A] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#087F96]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Founder Image & Title */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-4">
            <div className="inline-flex items-center space-x-2 bg-[#087F96]/20 border border-[#087F96]/40 px-3 py-1 rounded-full text-xs font-bold text-[#DDF4F7]">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>Saha Tecrübesi & Sektörel Liderlik</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Perakende Sahasından Doğan Bir Akademi
            </h2>

            <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-[#087F96] text-white font-black text-2xl flex items-center justify-center border-2 border-white/20 flex-shrink-0 shadow-lg">
                SK
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Selim Kılıç</h3>
                <p className="text-xs text-[#087F96] font-extrabold uppercase">Kurucu & Perakende Stratejisti</p>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-[11px] text-gray-300 hover:text-white mt-1 transition-colors font-semibold"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1 text-[#087F96]" />
                  <span>LinkedIn Profilini İncele</span>
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
              Perakende Kariyer Akademisi, teorik derslerden öte; perakende sahasındaki gerçek operasyonel ihtiyaçlar, KPI hedefleri, satın alma marjları ve insan kaynağı yetiştirme disiplinleri üzerine inşa edilmiş dijital bir teknoloji platformudur.
            </p>
          </div>

          {/* Core Expertise Grid */}
          <div className="lg:col-span-7 bg-[#061B33] p-6 sm:p-8 rounded-2xl border border-[#087F96]/40 space-y-4">
            <h3 className="text-sm font-extrabold text-[#DDF4F7] uppercase tracking-wider flex items-center">
              <Award className="h-4 w-4 text-[#087F96] mr-2" />
              Uzmanlık ve Danışmanlık Alanları
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {expertiseList.map((item, idx) => (
                <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center space-x-2 text-xs text-gray-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
