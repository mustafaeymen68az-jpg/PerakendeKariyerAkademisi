'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TalentMatrix9Box from '@/components/TalentMatrix9Box';
import TalentPoolModule from '@/components/TalentPoolModule';
import TurnoverRiskModule from '@/components/TurnoverRiskModule';
import PromotionReadinessModule from '@/components/PromotionReadinessModule';
import SuccessionPlanModule from '@/components/SuccessionPlanModule';
import {
  Users,
  Building2,
  FileSpreadsheet,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  ShieldAlert,
  Award,
  ChevronRight,
  Sparkles,
  Layers,
  UserCheck,
  Briefcase,
  Upload,
  Download
} from 'lucide-react';

export default function HRDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'summary' | 'org' | 'employees' | 'competencies' | 'talent' | 'promotion' | '9box' | 'critical' | 'succession' | 'turnover' | 'reports' | 'settings'
  >('summary');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('Tümü');

  return (
    <div className="min-h-screen bg-[#061B33] text-white flex flex-col font-sans">
      {/* Top Header Bar */}
      <div className="bg-[#0B2A4A] border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white shadow-md">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">İnsan Kaynakları & Yetenek Yönetimi Portalı</h1>
              <p className="text-xs text-gray-300">PKA TALENT • 9-Box Matrisi, Terfi Komitesi ve Yedekleme Planı</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md">
              <FileSpreadsheet className="h-4 w-4" />
              <span>Excel İle Çalışan Yükle</span>
            </button>
            <Link href="/" className="text-xs text-gray-400 hover:text-white px-2 py-1">
              Ana Siteye Dön
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* HR SIDEBAR NAVIGATION */}
        <div className="lg:col-span-1 space-y-1 bg-[#0B2A4A] p-3 rounded-2xl border border-white/10 h-fit text-xs font-bold">
          <div className="px-3 py-2 text-[10px] font-black text-emerald-400 uppercase tracking-wider">
            İK Navigasyonu
          </div>

          {[
            { id: 'summary', name: 'Yönetici Özeti', icon: BarChart3 },
            { id: 'org', name: 'Organizasyon', icon: Building2 },
            { id: 'employees', name: 'Çalışanlar', icon: Users },
            { id: 'competencies', name: 'Yetkinlik Matrisi', icon: Layers },
            { id: 'talent', name: 'Yetenek Havuzu', icon: Briefcase },
            { id: 'promotion', name: 'Terfi Yönetimi', icon: Award },
            { id: '9box', name: '9 Box Matrisi', icon: Sparkles },
            { id: 'critical', name: 'Kritik Pozisyonlar', icon: ShieldAlert },
            { id: 'succession', name: 'Yedekleme Planı', icon: UserCheck },
            { id: 'turnover', name: 'Çalışan Kaybetme Riski', icon: TrendingUp },
            { id: 'reports', name: 'Raporlar (PDF/Excel)', icon: Download },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl transition-all ${
                  activeTab === item.id ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* HR CONTENT AREA */}
        <div className="lg:col-span-4 space-y-6">
          
          {activeTab === 'summary' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10">
                  <div className="text-xs text-gray-400 font-bold">Toplam Çalışan</div>
                  <div className="text-3xl font-black text-white">1.240</div>
                  <div className="text-[10px] text-gray-400 mt-1">26 Kadro Pozisyonu</div>
                </div>
                <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-emerald-500/40">
                  <div className="text-xs text-gray-400 font-bold">Terfiye Hazır Aday</div>
                  <div className="text-3xl font-black text-emerald-400">42 Kişi</div>
                  <div className="text-[10px] text-emerald-300 mt-1">%80+ Terfi Skoru</div>
                </div>
                <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10">
                  <div className="text-xs text-gray-400 font-bold">Yedekli Kritik Pozisyon</div>
                  <div className="text-3xl font-black text-cyan-400">%76.2</div>
                  <div className="text-[10px] text-gray-400 mt-1">63 / 82 Pozisyon</div>
                </div>
                <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-rose-500/40">
                  <div className="text-xs text-gray-400 font-bold">Çalışan Kaybetme Riski</div>
                  <div className="text-3xl font-black text-rose-400">14 Kişi</div>
                  <div className="text-[10px] text-rose-300 mt-1">Karar Destek Uyarısı</div>
                </div>
              </div>

              {/* Live 9 Box Matrix Module Component */}
              <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10">
                <TalentMatrix9Box />
              </div>
            </div>
          )}

          {activeTab === '9box' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10">
              <TalentMatrix9Box />
            </div>
          )}

          {activeTab === 'talent' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10">
              <TalentPoolModule />
            </div>
          )}

          {activeTab === 'turnover' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10">
              <TurnoverRiskModule />
            </div>
          )}

          {activeTab === 'promotion' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10">
              <PromotionReadinessModule />
            </div>
          )}

          {activeTab === 'succession' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10">
              <SuccessionPlanModule />
            </div>
          )}

          {['org', 'employees', 'competencies', 'critical', 'reports', 'settings'].includes(activeTab) && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-4">
              <h2 className="text-xl font-bold text-white capitalize">{activeTab} Modülü</h2>
              <p className="text-xs text-gray-300">
                Organizasyon şeması, yetkinlik sözlüğü ve Excel/PDF rapor alma arayüzü aktiftir.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
