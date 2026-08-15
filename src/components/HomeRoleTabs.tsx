'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import EmployeeScorecard from '@/components/EmployeeScorecard';
import TalentMatrix9Box from '@/components/TalentMatrix9Box';
import LearningControlCenter from '@/components/LearningControlCenter';
import ExecutiveDashboard from '@/components/ExecutiveDashboard';
import { Users, GraduationCap, Building2, Crown, UserCheck, ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function HomeRoleTabs() {
  const [activeTab, setActiveTab] = useState<'calisan' | 'ik' | 'egitmen' | 'ceo'>('calisan');

  return (
    <div id="rol-sekmeleri" className="space-y-8">
      {/* Central 4 Role Selector Buttons Bar in Upper-Middle */}
      <div className="flex flex-wrap justify-center items-center gap-3 bg-[#0B2A4A]/5 p-3 rounded-3xl border border-[#0B2A4A]/10 max-w-4xl mx-auto shadow-sm">
        <button
          onClick={() => setActiveTab('calisan')}
          className={`flex items-center space-x-2 px-5 py-3.5 rounded-2xl font-black text-xs transition-all shadow-md ${
            activeTab === 'calisan'
              ? 'bg-[#087F96] text-white shadow-xl scale-105 ring-2 ring-white'
              : 'bg-white/80 text-[#0B2A4A] hover:bg-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>👤 Çalışan Rolü & Paneli</span>
        </button>

        <button
          onClick={() => setActiveTab('ik')}
          className={`flex items-center space-x-2 px-5 py-3.5 rounded-2xl font-black text-xs transition-all shadow-md ${
            activeTab === 'ik'
              ? 'bg-emerald-600 text-white shadow-xl scale-105 ring-2 ring-white'
              : 'bg-white/80 text-[#0B2A4A] hover:bg-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>👔 İK Müdürü Rolü & Paneli</span>
        </button>

        <button
          onClick={() => setActiveTab('egitmen')}
          className={`flex items-center space-x-2 px-5 py-3.5 rounded-2xl font-black text-xs transition-all shadow-md ${
            activeTab === 'egitmen'
              ? 'bg-purple-600 text-white shadow-xl scale-105 ring-2 ring-white'
              : 'bg-white/80 text-[#0B2A4A] hover:bg-white'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>🎓 Eğitim Müdürü & Eğitmen Rolü</span>
        </button>

        <button
          onClick={() => setActiveTab('ceo')}
          className={`flex items-center space-x-2 px-5 py-3.5 rounded-2xl font-black text-xs transition-all shadow-md ${
            activeTab === 'ceo'
              ? 'bg-amber-500 text-slate-950 font-black shadow-xl scale-105 ring-2 ring-white'
              : 'bg-white/80 text-[#0B2A4A] hover:bg-white'
          }`}
        >
          <Crown className="w-4 h-4 text-slate-950" />
          <span>👑 CEO & Üst Yönetim Rolü</span>
        </button>
      </div>

      {/* Visible Demo Disclaimer Label */}
      <div className="text-center">
        <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-amber-50 text-amber-900 border border-amber-300 rounded-full text-xs font-bold shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Temsili demo verisidir; ürün deneyimini göstermek amacıyla oluşturulmuştur.</span>
        </span>
      </div>

      {/* Role Tab Active Content Display */}
      <div className="transition-all duration-300">
        {activeTab === 'calisan' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              <div>
                <span className="text-[10px] font-mono font-black text-[#087F96] uppercase tracking-wider block">ÇALIŞAN BAKIŞ AÇISI</span>
                <h3 className="text-xl font-black text-[#0B2A4A]">Çalışan Paneli & Kariyer GPS</h3>
                <p className="text-xs text-gray-600 mt-1">
                  Mevcut seviyeni ölç, yetkinlik eksiklerini tamamla, fotoğraflı saha görevi yükle ve açıklanabilir terfi skoru bileşenlerini incele.
                </p>
              </div>
              <Link
                href="/panel/calisan"
                className="px-6 py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-black text-xs rounded-2xl shadow-lg whitespace-nowrap flex items-center space-x-1.5"
              >
                <span>Tam Ekran Çalışan Portalına Git</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <EmployeeScorecard />
          </div>
        )}

        {activeTab === 'ik' && (
          <div className="space-y-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              <div>
                <span className="text-[10px] font-mono font-black text-emerald-800 uppercase tracking-wider block">İNSAN KAYNAKLARI MÜDÜRÜ BAKIŞ AÇISI</span>
                <h3 className="text-xl font-black text-emerald-950">İK Yetenek, Terfi ve Yedekleme Çözümleri</h3>
                <p className="text-xs text-gray-600 mt-1">
                  9-Box yetenek matrisi, 3'lü aday havuzu, açıklanabilir terfi karar destek skorları ve kritik pozisyon yedekleme planları.
                </p>
              </div>
              <Link
                href="/panel/ik"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-2xl shadow-lg whitespace-nowrap flex items-center space-x-1.5"
              >
                <span>Tam Ekran İK Portalına Git</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <TalentMatrix9Box />
          </div>
        )}

        {activeTab === 'egitmen' && (
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-3xl p-6 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              <div>
                <span className="text-[10px] font-mono font-black text-purple-800 uppercase tracking-wider block">EĞİTİM MÜDÜRÜ BAKIŞ AÇISI</span>
                <h3 className="text-xl font-black text-purple-950">Eğitim Kontrol Merkezi & Soru Bankası</h3>
                <p className="text-xs text-gray-600 mt-1">
                  SCORM/xAPI uyumlu ders paketleri, soru bankası, otomatik eğitim atamaları ve eğitim sonrası saha KPI etki analizi.
                </p>
              </div>
              <Link
                href="/panel/egitmen"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-2xl shadow-lg whitespace-nowrap flex items-center space-x-1.5"
              >
                <span>Tam Ekran Eğitim Portalına Git</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <LearningControlCenter />
          </div>
        )}

        {activeTab === 'ceo' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl p-6 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              <div>
                <span className="text-[10px] font-mono font-black text-amber-400 uppercase tracking-wider block">CEO & ÜST YÖNETİM BAKIŞ AÇISI</span>
                <h3 className="text-xl font-black text-amber-300">İnsan Sermayesi Yönetici Özeti & Simülatör</h3>
                <p className="text-xs text-gray-300 mt-1">
                  10 kritik insan sermayesi göstergesi, 20 Mağaza Büyüme Senaryo Simülatörü ve şeffaf ROI hesabı.
                </p>
              </div>
              <Link
                href="/panel/ceo"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-2xl shadow-lg whitespace-nowrap flex items-center space-x-1.5"
              >
                <span>Tam Ekran CEO Portalına Git</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <ExecutiveDashboard />
          </div>
        )}
      </div>
    </div>
  );
}
