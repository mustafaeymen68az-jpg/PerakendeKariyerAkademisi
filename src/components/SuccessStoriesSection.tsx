'use client';

import React from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  Building2,
  ArrowRight
} from 'lucide-react';

interface CaseStudy {
  id: string;
  companyCategory: string;
  storeCount: string;
  employeeCount: string;
  before: {
    competencyScore: number;
    completionRate: number;
    shrinkageRate: number;
  };
  after: {
    competencyScore: number;
    completionRate: number;
    shrinkageRate: number;
  };
  summary: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    companyCategory: 'Ulusal Gıda Market Zinciri',
    storeCount: '45 Mağaza',
    employeeCount: '450 Çalışan',
    before: { competencyScore: 61, completionRate: 42, shrinkageRate: 3.8 },
    after: { competencyScore: 79, completionRate: 91, shrinkageRate: 3.1 },
    summary: '90 günlük PKA Gelişim Modeli ile mağaza içi stok ve fire yönetiminde kayda değer iyileşme elde edildi.'
  },
  {
    id: '2',
    companyCategory: 'Moda & Hazır Giyim Perakendecisi',
    storeCount: '28 Mağaza',
    employeeCount: '290 Çalışan',
    before: { competencyScore: 58, completionRate: 35, shrinkageRate: 2.4 },
    after: { competencyScore: 84, completionRate: 94, shrinkageRate: 1.6 },
    summary: 'Kasiyer ve reyon şeflerinin çapraz satış ve müşteri deneyimi yetkinlikleri %44 artırılarak ortalama sepet büyütüldü.'
  }
];

export default function SuccessStoriesSection() {
  return (
    <section className="py-16 bg-white border-b border-gray-200" id="basari-hikayeleri">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#0B2A4A]/10 border border-[#0B2A4A]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0B2A4A] mb-3">
            <TrendingUp className="h-4 w-4 text-[#087F96]" />
            <span>Ölçülebilir Saha Dönüşümü</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2A4A] tracking-tight">
            Başarı Hikâyeleri ve Vaka Analizleri
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Yapılandırılmış akademi modeli uygulayan işletmelerin 90 günlük süreçteki yetkinlik artışı, eğitim tamamlama ve fire azalma sonuçları.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASE_STUDIES.map((study) => (
            <div key={study.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-6 relative overflow-hidden">
              {/* Mandatory Sample Tag */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-[10px] font-black uppercase tracking-wider">
                Örnek Senaryo
              </div>

              <div>
                <span className="text-xs text-[#087F96] font-extrabold uppercase">{study.storeCount} • {study.employeeCount}</span>
                <h3 className="text-xl font-black text-[#0B2A4A]">{study.companyCategory}</h3>
                <p className="text-xs text-gray-600 mt-1">{study.summary}</p>
              </div>

              {/* Before vs After Metric Comparison */}
              <div className="grid grid-cols-2 gap-4">
                {/* Before */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-center space-y-2">
                  <div className="text-[11px] font-bold text-gray-500 uppercase">Başlangıç Durumu</div>
                  <div className="text-xs text-gray-700">Yetkinlik Skoru: <span className="font-bold text-gray-900">{study.before.competencyScore}</span></div>
                  <div className="text-xs text-gray-700">Eğitim Tamamlama: <span className="font-bold text-gray-900">%{study.before.completionRate}</span></div>
                  <div className="text-xs text-red-600 font-bold">Fire Oranı: %{study.before.shrinkageRate}</div>
                </div>

                {/* 90 Days After */}
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                  <div className="text-[11px] font-extrabold text-emerald-800 uppercase">90 Gün Sonra</div>
                  <div className="text-xs text-emerald-950 font-semibold">Yetkinlik Skoru: <span className="font-black text-emerald-700">{study.after.competencyScore}</span></div>
                  <div className="text-xs text-emerald-950 font-semibold">Eğitim Tamamlama: <span className="font-black text-emerald-700">%{study.after.completionRate}</span></div>
                  <div className="text-xs text-emerald-700 font-black">Fire Oranı: %{study.after.shrinkageRate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
