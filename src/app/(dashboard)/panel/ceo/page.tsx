'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ExecutiveDashboard from '@/components/ExecutiveDashboard';
import EnterpriseROICalculator from '@/components/EnterpriseROICalculator';
import {
  Crown,
  TrendingUp,
  Building2,
  Users,
  Award,
  ShieldAlert,
  BarChart3,
  Calculator,
  FileText,
  Sparkles,
  DollarSign
} from 'lucide-react';

export default function CEODashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'summary' | 'capital' | 'risks' | 'pipeline' | 'succession' | 'comparison' | 'scenario' | 'roi' | 'board'
  >('summary');

  return (
    <div className="min-h-screen bg-[#061B33] text-white flex flex-col font-sans">
      {/* Top Header Bar */}
      <div className="bg-[#0B2A4A] border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Crown className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">CEO & Üst Yönetim Portalı (EXECUTIVE)</h1>
              <p className="text-xs text-amber-300 font-semibold">İnsan Sermayesi Yönetici Özeti & 20 Mağaza Büyüme Senaryo Simülatörü</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/" className="text-xs text-gray-400 hover:text-white px-2 py-1">
              Ana Siteye Dön
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* CEO SIDEBAR NAVIGATION */}
        <div className="lg:col-span-1 space-y-1 bg-[#0B2A4A] p-3 rounded-2xl border border-white/10 h-fit text-xs font-bold">
          <div className="px-3 py-2 text-[10px] font-black text-amber-400 uppercase tracking-wider">
            Yönetim Özeti Navigasyonu
          </div>

          {[
            { id: 'summary', name: 'Yönetici Özeti', icon: BarChart3 },
            { id: 'capital', name: 'İnsan Sermayesi (10 KPI)', icon: Users },
            { id: 'risks', name: 'Kritik Riskler', icon: ShieldAlert },
            { id: 'pipeline', name: 'Yönetici Aday Havuzu', icon: Award },
            { id: 'succession', name: 'Yedekleme Durumu', icon: Building2 },
            { id: 'comparison', name: 'Şube/Bölge Karşılaştırması', icon: TrendingUp },
            { id: 'scenario', name: '20 Mağaza Senaryosu', icon: Sparkles },
            { id: 'roi', name: 'Finansal Etki & ROI', icon: DollarSign },
            { id: 'board', name: 'Yönetim Kurulu Raporu', icon: FileText },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl transition-all ${
                  activeTab === item.id ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* CEO CONTENT AREA */}
        <div className="lg:col-span-4 space-y-6">
          
          {activeTab === 'summary' && (
            <div className="space-y-6">
              <ExecutiveDashboard />
            </div>
          )}

          {activeTab === 'scenario' && (
            <div className="space-y-6">
              <ExecutiveDashboard />
            </div>
          )}

          {activeTab === 'roi' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10">
              <EnterpriseROICalculator />
            </div>
          )}

          {['capital', 'risks', 'pipeline', 'succession', 'comparison', 'board'].includes(activeTab) && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-4">
              <h2 className="text-xl font-bold text-white capitalize">{activeTab} Modülü</h2>
              <p className="text-xs text-gray-300">
                Üst yönetim analitiği ve Yönetim Kurulu özet raporlama paneli aktiftir.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
