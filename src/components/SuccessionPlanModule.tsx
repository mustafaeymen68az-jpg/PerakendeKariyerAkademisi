'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  UserCheck, 
  AlertOctagon, 
  TrendingUp, 
  Building2, 
  MapPin, 
  CheckCircle2,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SuccessionRole {
  id: string;
  roleName: string;
  location: string;
  currentManager: string;
  riskLevel: 'DÜŞÜK RİSK' | 'ORTA RİSK' | 'YÜKSEK RİSK';
  successors: {
    name: string;
    score: number;
    status: 'Terfiye Hazır' | 'Terfiye Yakın';
  }[];
}

const SUCCESSION_DATA: SuccessionRole[] = [
  {
    id: '1',
    roleName: 'Mağaza Müdürü',
    location: 'İzmir Alsancak Mağazası',
    currentManager: 'Mehmet Yılmaz',
    riskLevel: 'DÜŞÜK RİSK',
    successors: [
      { name: 'Ahmet Kaya', score: 88, status: 'Terfiye Hazır' },
      { name: 'Ayşe Demir', score: 79, status: 'Terfiye Yakın' },
      { name: 'Burak Çetin', score: 71, status: 'Terfiye Yakın' }
    ]
  },
  {
    id: '2',
    roleName: 'Bölge Müdürü',
    location: 'Marmara 1. Bölge (14 Mağaza)',
    currentManager: 'Hakan Arslan',
    riskLevel: 'ORTA RİSK',
    successors: [
      { name: 'Seda Öztürk', score: 81, status: 'Terfiye Hazır' },
      { name: 'Murat Şahin', score: 73, status: 'Terfiye Yakın' }
    ]
  },
  {
    id: '3',
    roleName: 'Taze Gıda Kategori Müdürü',
    location: 'Genel Merkez / Satın Alma',
    currentManager: 'Serkan Yıldız',
    riskLevel: 'YÜKSEK RİSK',
    successors: [
      { name: 'Deniz Aksu', score: 67, status: 'Terfiye Yakın' }
    ]
  }
];

export default function SuccessionPlanModule() {
  const [activeId, setActiveId] = useState<string>('1');
  const activeRole = SUCCESSION_DATA.find(r => r.id === activeId) || SUCCESSION_DATA[0];

  return (
    <section className="py-16 bg-[#0B2A4A] text-white relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#087F96]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#DDF4F7] mb-3">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Kritik Görev İş Sürekliliği</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Kritik Pozisyon Yedekleme Planı
          </h2>
          <p className="mt-3 text-base text-gray-300">
            Kritik görevleri tek kişiye bağımlı olmaktan çıkarın. Mağaza müdürleri, bölge müdürleri ve kategori liderleri ayrılsa bile yerini hemen dolduracak hazır yedekler yetiştirin.
          </p>
        </div>

        {/* Top Risk Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#061B33] p-5 rounded-2xl border border-[#087F96]/40 text-center">
            <div className="text-xs text-gray-400 font-semibold uppercase">Yedekli Kritik Pozisyon Oranı</div>
            <div className="text-4xl font-black text-emerald-400 mt-1">%78</div>
            <div className="text-[11px] text-gray-300 mt-1">Hedef: %85+</div>
          </div>

          <div className="bg-[#061B33] p-5 rounded-2xl border border-emerald-500/30 text-center">
            <div className="text-xs text-gray-400 font-semibold uppercase">Çift/Çok Yedeği Olan</div>
            <div className="text-4xl font-black text-white mt-1">14 Pozisyon</div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-1">Düşük Risk Grubu</div>
          </div>

          <div className="bg-[#061B33] p-5 rounded-2xl border border-amber-500/30 text-center">
            <div className="text-xs text-gray-400 font-semibold uppercase">Tek Yedeği Olan</div>
            <div className="text-4xl font-black text-amber-400 mt-1">5 Pozisyon</div>
            <div className="text-[11px] text-amber-300 font-semibold mt-1">Takip Gerekli</div>
          </div>

          <div className="bg-[#061B33] p-5 rounded-2xl border border-red-500/40 text-center">
            <div className="text-xs text-gray-400 font-semibold uppercase">Yedeği Olmayan (Kritik Risk)</div>
            <div className="text-4xl font-black text-red-400 mt-1">2 Pozisyon</div>
            <div className="text-[11px] text-red-300 font-semibold mt-1">Acil Gelişim Planı</div>
          </div>
        </div>

        {/* Interactive Succession Demo Viewer */}
        <div className="bg-[#061B33]/90 rounded-2xl border border-[#087F96]/40 p-6 sm:p-8 backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Selector */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Kritik Pozisyon Seçin:
            </h4>
            {SUCCESSION_DATA.map((role) => {
              const isSelected = activeId === role.id;
              const isHigh = role.riskLevel === 'YÜKSEK RİSK';
              const isMed = role.riskLevel === 'ORTA RİSK';
              return (
                <button
                  key={role.id}
                  onClick={() => setActiveId(role.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-[#087F96]/20 border-[#087F96] text-white shadow-lg ring-1 ring-[#087F96]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-sm text-white">{role.roleName}</div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      isHigh ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                      isMed ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {role.riskLevel}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1 flex items-center">
                    <MapPin className="h-3 w-3 mr-1 text-[#087F96]" />
                    {role.location}
                  </div>
                  <div className="text-[11px] text-gray-300 mt-2">
                    Mevcut: <span className="font-semibold text-white">{role.currentManager}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Detail Display */}
          <div className="lg:col-span-8 bg-white/5 rounded-xl border border-white/10 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-white/10 pb-4 gap-2">
              <div>
                <span className="text-xs text-[#087F96] font-extrabold uppercase tracking-wider">Seçilen Pozisyon</span>
                <h3 className="text-2xl font-black text-white">{activeRole.roleName}</h3>
                <p className="text-xs text-gray-400">{activeRole.location}</p>
              </div>
              <div className="bg-[#061B33] px-4 py-2 rounded-xl border border-white/15 text-right">
                <div className="text-[10px] text-gray-400">Mevcut Yönetici</div>
                <div className="text-sm font-bold text-emerald-400">{activeRole.currentManager}</div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3 flex items-center space-x-1.5">
                <UserCheck className="h-4 w-4 text-[#087F96]" />
                <span>Hazırlanan Potansiyel Yedekler ({activeRole.successors.length})</span>
              </h4>

              <div className="space-y-3">
                {activeRole.successors.map((succ, idx) => {
                  const isReady = succ.score >= 80;
                  return (
                    <div key={idx} className="bg-[#061B33] p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-[#087F96]/30 text-[#DDF4F7] font-bold flex items-center justify-center text-sm border border-[#087F96]/50">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-white">{succ.name}</div>
                          <div className="text-xs text-gray-400">Yedek Önceliği #{idx + 1}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-xs text-gray-400">Hazırlık Skoru</div>
                          <div className="text-base font-black text-white">%{succ.score}</div>
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-xs font-extrabold ${
                          isReady ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white'
                        }`}>
                          {succ.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {activeRole.riskLevel === 'YÜKSEK RİSK' && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center space-x-2">
                <AlertOctagon className="h-4 w-4 text-red-400 flex-shrink-0" />
                <span>**Uyarı:** Bu pozisyonda henüz %80 üzeri tam hazır yedek bulunmamaktadır. Hızlandırılmış gelişim planı başlatılması önerilir.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
