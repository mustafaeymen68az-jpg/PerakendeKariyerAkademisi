'use client';

import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  BarChart3, 
  UserCheck, 
  Sliders, 
  ChevronRight,
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  avatar: string;
  currentRole: string;
  targetRole: string;
  kpi: number; // 30%
  field: number; // 25%
  exam: number; // 15%
  manager: number; // 15%
  project: number; // 10%
  culture: number; // 5%
}

const SAMPLE_CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    currentRole: 'Mağaza Müdür Yardımcısı',
    targetRole: 'Mağaza Müdürü',
    kpi: 84,
    field: 82,
    exam: 91,
    manager: 78,
    project: 86,
    culture: 90
  },
  {
    id: '2',
    name: 'Zeynep Kaya',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    currentRole: 'Kategori Uzmanı',
    targetRole: 'Kategori Yöneticisi',
    kpi: 92,
    field: 88,
    exam: 95,
    manager: 90,
    project: 89,
    culture: 94
  },
  {
    id: '3',
    name: 'Caner Demir',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    currentRole: 'Reyon Şefi',
    targetRole: 'Müdür Yardımcısı',
    kpi: 74,
    field: 76,
    exam: 80,
    manager: 70,
    project: 75,
    culture: 82
  }
];

export default function PromotionReadinessModule() {
  const [selectedId, setSelectedId] = useState<string>('1');
  const candidate = SAMPLE_CANDIDATES.find(c => c.id === selectedId) || SAMPLE_CANDIDATES[0];

  // Weighted calculation:
  // KPI %30, Saha %25, Eğitim %15, Yönetici %15, Proje %10, Kültür %5
  const calculateScore = (c: Candidate) => {
    const raw = (c.kpi * 0.30) + (c.field * 0.25) + (c.exam * 0.15) + (c.manager * 0.15) + (c.project * 0.10) + (c.culture * 0.05);
    return Math.round(raw);
  };

  const finalScore = calculateScore(candidate);

  const getStatus = (score: number) => {
    if (score >= 80) return { label: 'TERFİYE HAZIR', color: 'bg-emerald-600 text-white border-emerald-500', badgeColor: 'bg-emerald-100 text-emerald-800' };
    if (score >= 70) return { label: 'TERFİYE YAKIN', color: 'bg-blue-600 text-white border-blue-500', badgeColor: 'bg-blue-100 text-blue-800' };
    if (score >= 60) return { label: 'GELİŞİM GEREKLİ', color: 'bg-amber-600 text-white border-amber-500', badgeColor: 'bg-amber-100 text-amber-800' };
    return { label: 'HENÜZ HAZIR DEĞİL', color: 'bg-red-600 text-white border-red-500', badgeColor: 'bg-red-100 text-red-800' };
  };

  const status = getStatus(finalScore);

  return (
    <section className="py-16 bg-gradient-to-b from-[#F4F7F9] to-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#0B2A4A]/10 border border-[#0B2A4A]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0B2A4A] mb-3">
            <Sparkles className="h-4 w-4 text-[#D97706]" />
            <span>Stratejik İK Karar Destek Modülü</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2A4A] tracking-tight">
            Kimin Terfiye Hazır Olduğunu Tahmin Etmeyin, <span className="text-[#E11D48]">Ölçün.</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            Terfi kararlarını sezgilere değil; KPI, saha performansı, sınav ve yetkinlik skorlarının objektif ağırlıklandırılmasına dayandırın.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Candidate Switcher & Score breakdown */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200/80 space-y-6">
            {/* Candidate Selector Tabs */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Örnek Terfi Adayı Seçin:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SAMPLE_CANDIDATES.map((c) => {
                  const s = getStatus(calculateScore(c));
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedId(c.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center space-x-3 ${
                        selectedId === c.id 
                          ? 'border-[#0B2A4A] bg-[#0B2A4A]/5 ring-2 ring-[#0B2A4A]/20 shadow-sm' 
                          : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden font-bold text-[#0B2A4A] flex items-center justify-center border border-gray-300">
                        {c.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-[#0B2A4A] truncate">{c.name}</div>
                        <div className="text-[11px] text-gray-500 truncate">{c.currentRole}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Profile Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#0B2A4A] text-white rounded-xl gap-4">
              <div>
                <div className="text-xs text-[#DDF4F7] font-medium">Aday Profili</div>
                <h3 className="text-xl font-bold">{candidate.name}</h3>
                <div className="text-xs text-gray-300 mt-0.5">
                  <span className="text-gray-400">Mevcut:</span> {candidate.currentRole} → <span className="text-emerald-400 font-semibold">Hedef:</span> {candidate.targetRole}
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wide border ${status.color}`}>
                  {status.label}
                </span>
                <div className="text-xs text-gray-300 mt-1">Terfi Skoru: %{finalScore}</div>
              </div>
            </div>

            {/* Score Breakdown Progress Bars */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ağırlıklı Yetkinlik & Performans Bileşenleri</h4>
              
              {/* KPI */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-gray-700 font-bold">KPI Performansı (%30 Ağırlık)</span>
                  <span className="text-[#0B2A4A] font-bold">{candidate.kpi} / 100</span>
                </div>
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${candidate.kpi}%` }} />
                </div>
              </div>

              {/* Saha Yetkinliği */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-gray-700 font-bold">Saha Yetkinliği (%25 Ağırlık)</span>
                  <span className="text-[#0B2A4A] font-bold">{candidate.field} / 100</span>
                </div>
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full transition-all duration-500" style={{ width: `${candidate.field}%` }} />
                </div>
              </div>

              {/* Eğitim & Sınav */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-gray-700 font-bold">Eğitim & Sınav Puanı (%15 Ağırlık)</span>
                  <span className="text-[#0B2A4A] font-bold">{candidate.exam} / 100</span>
                </div>
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#087F96] rounded-full transition-all duration-500" style={{ width: `${candidate.exam}%` }} />
                </div>
              </div>

              {/* Yönetici Değerlendirmesi */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-gray-700 font-bold">Yönetici Değerlendirmesi (%15 Ağırlık)</span>
                  <span className="text-[#0B2A4A] font-bold">{candidate.manager} / 100</span>
                </div>
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full transition-all duration-500" style={{ width: `${candidate.manager}%` }} />
                </div>
              </div>

              {/* Final Projesi */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-gray-700 font-bold">Final Projesi (%10 Ağırlık)</span>
                  <span className="text-[#0B2A4A] font-bold">{candidate.project} / 100</span>
                </div>
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${candidate.project}%` }} />
                </div>
              </div>

              {/* Kurum Kültürü */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-gray-700 font-bold">Kurum Kültürü Uyumu (%5 Ağırlık)</span>
                  <span className="text-[#0B2A4A] font-bold">{candidate.culture} / 100</span>
                </div>
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${candidate.culture}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Final Scorecard & Action Box */}
          <div className="lg:col-span-5 space-y-6">
            {/* Big Gauge Card */}
            <div className="bg-[#0B2A4A] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-[#087F96]/30 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#087F96]/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="text-xs uppercase font-bold tracking-widest text-[#DDF4F7] mb-2">
                Hesaplanan Terfi Hazırlık Skoru
              </div>

              {/* Score Circular Badge */}
              <div className="relative inline-flex items-center justify-center my-4">
                <div className="w-36 h-36 rounded-full border-8 border-[#087F96]/30 bg-[#061B33] flex flex-col items-center justify-center shadow-inner">
                  <span className="text-5xl font-black text-white">% {finalScore}</span>
                  <span className="text-[11px] text-gray-300 font-medium mt-1">Hazırlık Skoru</span>
                </div>
              </div>

              <div className="mt-2">
                <span className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-extrabold shadow-md ${status.color}`}>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{status.label}</span>
                </span>
              </div>

              <p className="mt-4 text-xs text-gray-300 leading-relaxed">
                Bu skor, adayın **{candidate.targetRole}** pozisyonuna geçiş yapmaya ne derecede hazır olduğunu objektif verilere dayanarak ortaya koyar.
              </p>

              <button className="w-full mt-6 py-3.5 px-4 bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 text-sm">
                <UserCheck className="h-4 w-4" />
                <span>{candidate.targetRole} Aday Havuzuna Al</span>
              </button>
            </div>

            {/* Score Skalası Açıklaması */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
              <h5 className="text-xs font-bold text-[#0B2A4A] uppercase tracking-wider flex items-center space-x-1.5">
                <BarChart3 className="h-4 w-4 text-[#087F96]" />
                <span>Terfi Skoru Değerlendirme Skalası</span>
              </h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                  <div className="font-bold text-emerald-800">%80 ve üzeri</div>
                  <div className="text-[11px] text-emerald-700">Terfiye Hazır</div>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="font-bold text-blue-800">%70 – %79</div>
                  <div className="text-[11px] text-blue-700">Terfiye Yakın</div>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                  <div className="font-bold text-amber-800">%60 – %69</div>
                  <div className="text-[11px] text-amber-700">Gelişim Gerekli</div>
                </div>
                <div className="p-2.5 rounded-lg bg-red-50 border border-red-200">
                  <div className="font-bold text-red-800">%60 Altı</div>
                  <div className="text-[11px] text-red-700">Henüz Hazır Değil</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
