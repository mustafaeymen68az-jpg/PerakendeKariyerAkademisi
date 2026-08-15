'use client';

import React from 'react';
import { 
  Crown, 
  TrendingUp, 
  Users, 
  Building2, 
  ShieldAlert, 
  Sparkles, 
  DollarSign, 
  ArrowUpRight, 
  CheckCircle2, 
  BarChart3,
  HelpCircle
} from 'lucide-react';

export default function ExecutiveDashboard() {
  return (
    <div className="bg-[#061B33] text-white rounded-3xl border-2 border-[#087F96] shadow-2xl overflow-hidden p-6 sm:p-8 space-y-8">
      {/* Executive Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-400/40">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>PKA EXECUTIVE — Stratejik Karar Destek Ekranı</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            İnsan Sermayesi Yönetim Paneli
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
            Genel Müdür ve İcra Kurulu için organizasyonun yönetici pipeline'ı, kritik pozisyon yedekleme durumu ve büyüme kapasitesi.
          </p>
        </div>

        <span className="px-4 py-2 bg-amber-400 text-slate-950 text-xs font-mono font-black rounded-2xl shadow-md whitespace-nowrap">
          👑 CEO / Genel Müdür Görünümü
        </span>
      </div>

      {/* TOP STRATEGIC EXECUTIVE KPIS (Point 17) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
          <span className="text-[10px] font-mono text-gray-400 uppercase block">Toplam Çalışan</span>
          <div className="text-2xl font-black text-white mt-1">1.000</div>
          <span className="text-[9px] text-gray-400">Aktif Kadro</span>
        </div>

        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
          <span className="text-[10px] font-mono text-gray-400 uppercase block">Yıllık Turnover</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">%17</div>
          <span className="text-[9px] text-emerald-300">Önceki: %24 (-%7)</span>
        </div>

        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
          <span className="text-[10px] font-mono text-gray-400 uppercase block">İç Terfi Oranı</span>
          <div className="text-2xl font-black text-amber-300 mt-1">%39</div>
          <span className="text-[9px] text-amber-200">İçeriden Yetiştirme</span>
        </div>

        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
          <span className="text-[10px] font-mono text-gray-400 uppercase block">Terfiye Hazır Yönetici</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">33 Kişi</div>
          <span className="text-[9px] text-emerald-300">Hemen Atanabilir</span>
        </div>

        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
          <span className="text-[10px] font-mono text-gray-400 uppercase block">Yüksek Potansiyel</span>
          <div className="text-2xl font-black text-[#DDF4F7] mt-1">84 Personel</div>
          <span className="text-[9px] text-blue-300">Yetenek Havuzu</span>
        </div>

        <div className="p-4 bg-rose-950/40 rounded-2xl border border-rose-400/40">
          <span className="text-[10px] font-mono text-rose-300 uppercase block">Yedeksiz Pozisyon</span>
          <div className="text-2xl font-black text-rose-400 mt-1">21 Pozisyon</div>
          <span className="text-[9px] text-rose-300 font-bold">Kritik Risk ⚠️</span>
        </div>
      </div>

      {/* "20 YENİ MAĞAZA AÇSAK HAZIR MIZ?" SENARYO ANALİZİ (Point 19) */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl border-2 border-amber-400/60 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-amber-400/30 pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg shadow-md">
              🚀
            </div>
            <div>
              <h4 className="font-black text-lg text-white">Büyüme Hazırlık Analizi (Stratejik İş Gücü Senaryosu)</h4>
              <p className="text-xs text-amber-200">Soru: “Yarın 20 Yeni Mağaza Açsak Yönetici Kadromuz İçeriden Hazır mı?”</p>
            </div>
          </div>

          <span className="px-3.5 py-1.5 bg-amber-400/20 text-amber-300 text-xs font-mono font-black rounded-xl border border-amber-400/40">
            Örnek Senaryo Analizi ⚡
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2 text-center">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[10px] font-mono text-gray-400 block uppercase">Mağaza Müdürü İhtiyacı</span>
            <span className="text-xl font-black text-white">20 Mağaza</span>
          </div>

          <div className="p-3 bg-emerald-950/60 rounded-2xl border border-emerald-400/50">
            <span className="text-[10px] font-mono text-emerald-300 block uppercase">Hemen Terfiye Hazır</span>
            <span className="text-xl font-black text-emerald-400">13 Aday</span>
          </div>

          <div className="p-3 bg-blue-950/60 rounded-2xl border border-blue-400/50">
            <span className="text-[10px] font-mono text-blue-300 block uppercase">90 Gün İçinde Hazır</span>
            <span className="text-xl font-black text-blue-300">5 Aday</span>
          </div>

          <div className="p-3 bg-rose-950/60 rounded-2xl border border-rose-400/50">
            <span className="text-[10px] font-mono text-rose-300 block uppercase">Dış İşe Alım İhtiyacı</span>
            <span className="text-xl font-black text-rose-300">2 Kişi</span>
          </div>

          <div className="p-3 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl border border-emerald-400 text-white flex flex-col justify-center">
            <span className="text-[9px] font-mono uppercase font-black text-emerald-100">İç Kaynaktan Karşılama</span>
            <span className="text-2xl font-black text-white">%90 Kapasite ✅</span>
          </div>
        </div>
      </div>

      {/* YÖNETİCİ PIPELINE & AKADEMİ ROI (Point 18, 20) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Yönetici Pipeline */}
        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
          <h4 className="font-extrabold text-base text-white flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-[#087F96]" />
            <span>Yönetici Pipeline (Kadro vs Yedek Adaylar)</span>
          </h4>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <div className="flex justify-between items-center font-bold">
                <span className="text-white">Mağaza Müdürü Kadro İhtiyacı</span>
                <span className="text-amber-300 font-mono">40 İhtiyaç</span>
              </div>
              <div className="flex justify-between text-[11px] text-gray-300 font-mono">
                <span>Hazır: 28</span>
                <span>90 Gün: 7</span>
                <span>180 Gün: 3</span>
                <span className="text-rose-300 font-bold">Dış Alım: 2</span>
              </div>
            </div>

            <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <div className="flex justify-between items-center font-bold">
                <span className="text-white">Bölge Operasyon Müdürü Kadrosu</span>
                <span className="text-amber-300 font-mono">8 İhtiyaç</span>
              </div>
              <div className="flex justify-between text-[11px] text-gray-300 font-mono">
                <span>Hazır: 5</span>
                <span>Gelişimde: 2</span>
                <span className="text-rose-300 font-bold">Açık Pozisyon: 1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Akademi ROI */}
        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h4 className="font-extrabold text-base text-white flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <span>Akademinin İş Sonuçlarına Etkisi (ROI)</span>
            </h4>
            <span className="text-[9px] font-mono text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
              Örnek ROI Senaryosu 📊
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-[10px] text-gray-400 block">Fire Oranı Değişimi</span>
              <span className="text-base font-black text-emerald-400">%3,4 ➔ %2,8 (-%0,6)</span>
            </div>

            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-[10px] text-gray-400 block">Sepet Ortalaması</span>
              <span className="text-base font-black text-amber-300">685 TL ➔ 728 TL (+%6,3)</span>
            </div>

            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-[10px] text-gray-400 block">Mağaza Müdürü Turnover</span>
              <span className="text-base font-black text-emerald-400">%24 ➔ %17 (-%7)</span>
            </div>

            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-[10px] text-gray-400 block">İç Terfi Başarısı</span>
              <span className="text-base font-black text-emerald-400">%28 ➔ %39 (+%11)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
