'use client';

import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  Award, 
  Sparkles, 
  Users, 
  BarChart3, 
  ArrowRight,
  ShieldCheck,
  Target
} from 'lucide-react';

export default function LearningControlCenter() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-8">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 bg-purple-50 text-purple-900 px-3 py-1 rounded-full text-xs font-bold border border-purple-200">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>PKA LEARNING — Eğitim Müdürlüğü Kontrol Merkezi</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#0B2A4A] tracking-tight">
            Eğitim Kontrol Merkezi & Etki Analizi
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
            Eğitimlerin sadece katılımını değil; ön test/son test puan değişimini, sahadaki KPI katkısını ve eğitim ROI'sini tek panelde izleyin.
          </p>
        </div>

        <span className="px-4 py-2 bg-emerald-100 text-emerald-900 text-xs font-mono font-black rounded-2xl border border-emerald-300 shadow-xs whitespace-nowrap">
          🎓 Eğitim Müdürü Dashboardu
        </span>
      </div>

      {/* TOP KPI STATS (Point 13) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-1">
          <span className="text-[10px] font-mono text-gray-500 font-bold uppercase block">Atanan Eğitim</span>
          <div className="text-2xl font-black text-[#0B2A4A]">6.420</div>
          <span className="text-[9.5px] text-gray-600 font-medium block">Tüm Mağazalar Ataması</span>
        </div>

        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-1">
          <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase block">Tamamlanan</span>
          <div className="text-2xl font-black text-emerald-900">5.340</div>
          <span className="text-[9.5px] text-emerald-700 font-bold block">Başarıyla Biten</span>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl space-y-1">
          <span className="text-[10px] font-mono text-amber-800 font-bold uppercase block">Geciken Dersler</span>
          <div className="text-2xl font-black text-amber-900">680</div>
          <span className="text-[9.5px] text-amber-700 font-bold block">Süre Aşımı Uyarısı</span>
        </div>

        <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl space-y-1">
          <span className="text-[10px] font-mono text-rose-800 font-bold uppercase block">Başarısız Sınavlar</span>
          <div className="text-2xl font-black text-rose-900">400</div>
          <span className="text-[9.5px] text-rose-700 font-bold block">Tekrar Sınav Hakkı</span>
        </div>

        <div className="col-span-2 md:col-span-1 p-4 bg-blue-50 border border-blue-300 rounded-2xl space-y-1">
          <span className="text-[10px] font-mono text-blue-800 font-bold uppercase block">Tamamlama Oranı</span>
          <div className="text-2xl font-black text-[#087F96]">%83</div>
          <span className="text-[9.5px] text-blue-700 font-bold block">Hedef: %85 Üzeri</span>
        </div>
      </div>

      {/* EĞİTİM ETKİ MODELİ (Point 14) */}
      <div className="bg-gradient-to-r from-[#061B33] via-[#0B2A4A] to-[#087F96] p-6 rounded-3xl text-white space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h4 className="font-extrabold text-base text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Eğitim Etki Modeli (Davranış ve Performans Değişim Karnesi)</span>
          </h4>
          <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
            Eğitim Etkisi Ölçümü ✅
          </span>
        </div>

        {/* Visual Pipeline Flow */}
        <div className="text-xs font-mono font-bold text-emerald-300 bg-white/10 p-3 rounded-xl border border-white/20 text-center leading-relaxed">
          Ön Test ➔ Eğitim ➔ Uygulama ➔ Son Test ➔ Saha Değerlendirmesi ➔ KPI ➔ Yetkinlik ➔ Sertifika
        </div>

        {/* 4 Impact Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 bg-white/10 rounded-2xl border border-white/15">
            <span className="text-[10px] font-mono text-gray-300 uppercase block">Ön Test Ortalama</span>
            <div className="text-xl font-black text-amber-300">62 Puan</div>
            <span className="text-[9px] text-gray-400">Eğitim Öncesi Bilgi</span>
          </div>

          <div className="p-3.5 bg-white/10 rounded-2xl border border-white/15">
            <span className="text-[10px] font-mono text-gray-300 uppercase block">Son Test Ortalama</span>
            <div className="text-xl font-black text-emerald-400">84 Puan</div>
            <span className="text-[9px] text-emerald-300 font-bold">+22 Puan Kazanım 📈</span>
          </div>

          <div className="p-3.5 bg-white/10 rounded-2xl border border-white/15">
            <span className="text-[10px] font-mono text-gray-300 uppercase block">Yetkinlik Değişimi</span>
            <div className="text-xl font-black text-blue-300">3.1 ➔ 4.0 / 5</div>
            <span className="text-[9px] text-blue-200">Saha Gözlem Notu</span>
          </div>

          <div className="p-3.5 bg-white/10 rounded-2xl border border-white/15">
            <span className="text-[10px] font-mono text-gray-300 uppercase block">Mağaza KPI Katkısı</span>
            <div className="text-xl font-black text-emerald-400">+ %7,2 Ciro</div>
            <span className="text-[9px] text-emerald-300 font-bold">Saha Başarısı: %81</span>
          </div>
        </div>
      </div>

      {/* İÇ EĞİTMEN AKADEMİSİ (Point 16) */}
      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div className="space-y-0.5">
            <h4 className="font-extrabold text-base text-[#0B2A4A] flex items-center space-x-2">
              <Users className="w-5 h-5 text-[#087F96]" />
              <span>Kurum İçi Eğitmen Akademisi (Train The Trainer)</span>
            </h4>
            <p className="text-xs text-gray-500">Saha liderlerini iç eğitmen olarak yetiştirme ve belgelendirme programı.</p>
          </div>
          <span className="px-3 py-1 bg-purple-100 text-purple-900 text-xs font-mono font-bold rounded-lg border border-purple-300">
            27 Aktif İç Eğitmen 🎓
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 bg-white rounded-xl border border-gray-200 text-center">
            <span className="text-[10px] font-mono text-gray-500 uppercase block">Aktif İç Eğitmen</span>
            <span className="text-xl font-black text-[#0B2A4A]">27 Kişi</span>
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-gray-200 text-center">
            <span className="text-[10px] font-mono text-gray-500 uppercase block">Bu Ay Ders Veren</span>
            <span className="text-xl font-black text-emerald-700">18 Eğitmen</span>
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-gray-200 text-center">
            <span className="text-[10px] font-mono text-gray-500 uppercase block">Eğitim Saati</span>
            <span className="text-xl font-black text-[#087F96]">416 Saat</span>
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-gray-200 text-center">
            <span className="text-[10px] font-mono text-gray-500 uppercase block">Eğitmen Puanı</span>
            <span className="text-xl font-black text-amber-600">4,6 / 5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
