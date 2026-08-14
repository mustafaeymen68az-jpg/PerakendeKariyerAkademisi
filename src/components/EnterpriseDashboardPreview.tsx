'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  Award, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles,
  Layers,
  Activity
} from 'lucide-react';

export default function EnterpriseDashboardPreview() {
  return (
    <section className="py-16 bg-[#061B33] text-white relative overflow-hidden" id="kurumsal-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#087F96]/20 border border-[#087F96]/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#DDF4F7] mb-3">
            <Activity className="h-4 w-4 text-[#087F96]" />
            <span>Power BI Kalitesinde Analitik Dashboard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            İnsan Kaynakları & Yönetici Dashboardu
          </h2>
          <p className="mt-3 text-base text-gray-300">
            Tüm şube, mağaza ve departmanların eğitim tamamlama, yetkinlik dağılımı, terfi hazırlığı ve yedekleme risk matrislerini canlı analitik ekranlarla izleyin.
          </p>
        </div>

        {/* 10 Top KPI Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
          <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10 shadow-md">
            <div className="text-[10px] text-gray-400 font-bold uppercase">Toplam Çalışan</div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">327</div>
            <div className="text-[10px] text-emerald-400 font-semibold mt-1">Aktif Mağaza Ekibi</div>
          </div>

          <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10 shadow-md">
            <div className="text-[10px] text-gray-400 font-bold uppercase">Aktif Öğrenci</div>
            <div className="text-2xl sm:text-3xl font-black text-[#DDF4F7] mt-1">298</div>
            <div className="text-[10px] text-blue-400 font-semibold mt-1">%91 Katılım Oranı</div>
          </div>

          <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10 shadow-md">
            <div className="text-[10px] text-gray-400 font-bold uppercase">Eğitim Tamamlama Oranı</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">%91</div>
            <div className="text-[10px] text-emerald-300 font-semibold mt-1">Hedef: %85+</div>
          </div>

          <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10 shadow-md">
            <div className="text-[10px] text-gray-400 font-bold uppercase">Ort. Yetkinlik Skoru</div>
            <div className="text-2xl sm:text-3xl font-black text-blue-300 mt-1">79 / 100</div>
            <div className="text-[10px] text-gray-300 font-semibold mt-1">Saha Genel Ort.</div>
          </div>

          <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10 shadow-md">
            <div className="text-[10px] text-gray-400 font-bold uppercase">Terfiye Hazır Çalışan</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">28</div>
            <div className="text-[10px] text-emerald-300 font-semibold mt-1">%80+ Terfi Skoru</div>
          </div>

          <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10 shadow-md">
            <div className="text-[10px] text-gray-400 font-bold uppercase">Yüksek Potansiyel (HiPo)</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">31</div>
            <div className="text-[10px] text-amber-300 font-semibold mt-1">Geleceğin Liderleri</div>
          </div>

          <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10 shadow-md">
            <div className="text-[10px] text-gray-400 font-bold uppercase">Yedekli Kritik Pozisyon</div>
            <div className="text-2xl sm:text-3xl font-black text-[#087F96] mt-1">%72</div>
            <div className="text-[10px] text-blue-300 font-semibold mt-1">İş Sürekliliği</div>
          </div>

          <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10 shadow-md">
            <div className="text-[10px] text-gray-400 font-bold uppercase">Turnover Oranı</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">%14.2</div>
            <div className="text-[10px] text-emerald-300 font-semibold mt-1">Sektör Ort. %35</div>
          </div>

          <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10 shadow-md">
            <div className="text-[10px] text-gray-400 font-bold uppercase">Açık Gelişim Planı</div>
            <div className="text-2xl sm:text-3xl font-black text-purple-400 mt-1">142</div>
            <div className="text-[10px] text-purple-300 font-semibold mt-1">90 Günlük Takipte</div>
          </div>

          <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10 shadow-md">
            <div className="text-[10px] text-gray-400 font-bold uppercase">Sertifika Sayısı</div>
            <div className="text-2xl sm:text-3xl font-black text-[#DDF4F7] mt-1">452</div>
            <div className="text-[10px] text-gray-300 font-semibold mt-1">Kanıtlanmış Başarı</div>
          </div>
        </div>

        {/* Analytic Chart Visualizations Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 1: Departmana Göre Yetkinlik & Terfi Pipeline */}
          <div className="lg:col-span-8 bg-[#0B2A4A] rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center">
                <BarChart3 className="h-4 w-4 text-[#087F96] mr-2" />
                Pozisyonlara Göre Terfi Hazırlık Pipeline'ı
              </h3>
              <span className="text-[10px] bg-white/10 text-gray-300 px-2 py-1 rounded">Canlı Veri</span>
            </div>

            {/* Simulated Bar Charts */}
            <div className="space-y-4 text-xs pt-2">
              <div>
                <div className="flex justify-between text-gray-300 font-medium mb-1">
                  <span>Mağaza Müdürü Adayları (18 Kişi)</span>
                  <span className="text-emerald-400 font-bold">%83 Terfiye Hazır</span>
                </div>
                <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500 w-[60%]" />
                  <div className="h-full bg-blue-500 w-[25%]" />
                  <div className="h-full bg-amber-500 w-[15%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-300 font-medium mb-1">
                  <span>Bölge Müdürü Adayları (4 Kişi)</span>
                  <span className="text-emerald-400 font-bold">%79 Terfiye Yakın</span>
                </div>
                <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500 w-[50%]" />
                  <div className="h-full bg-blue-500 w-[40%]" />
                  <div className="h-full bg-amber-500 w-[10%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-300 font-medium mb-1">
                  <span>Kategori Yöneticisi Adayları (7 Kişi)</span>
                  <span className="text-emerald-400 font-bold">%88 Terfiye Hazır</span>
                </div>
                <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500 w-[70%]" />
                  <div className="h-full bg-blue-500 w-[20%]" />
                  <div className="h-full bg-amber-500 w-[10%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-300 font-medium mb-1">
                  <span>Müdür Yardımcısı Adayları (35 Kişi)</span>
                  <span className="text-blue-400 font-bold">%74 Terfiye Yakın</span>
                </div>
                <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500 w-[40%]" />
                  <div className="h-full bg-blue-500 w-[35%]" />
                  <div className="h-full bg-amber-500 w-[25%]" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 text-[10px] text-gray-400 pt-2">
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5" /> Terfiye Hazır (≥80)</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-1.5" /> Terfiye Yakın (70-79)</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-1.5" /> Gelişim Gerekli (&lt;70)</span>
            </div>
          </div>

          {/* Chart 2: Yetkinlik Açıkları & Aksiyon Kartı */}
          <div className="lg:col-span-4 bg-[#0B2A4A] rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center">
                <AlertTriangle className="h-4 w-4 text-amber-400 mr-2" />
                En Büyük Yetkinlik Açıkları
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="flex justify-between font-bold text-white mb-0.5">
                  <span>P&L ve Finans Okuryazarlığı</span>
                  <span className="text-amber-400">%42 Açık</span>
                </div>
                <div className="text-[11px] text-gray-400">Atanan: Mağaza Müdürü Finans Eğitimi</div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="flex justify-between font-bold text-white mb-0.5">
                  <span>Stok Devir & Fire Analizi</span>
                  <span className="text-amber-400">%35 Açık</span>
                </div>
                <div className="text-[11px] text-gray-400">Atanan: Stok & Fire Mühendisliği</div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="flex justify-between font-bold text-white mb-0.5">
                  <span>Perakendede Yapay Zeka</span>
                  <span className="text-amber-400">%28 Açık</span>
                </div>
                <div className="text-[11px] text-gray-400">Atanan: AI Prompt & Veri Eğitimi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
