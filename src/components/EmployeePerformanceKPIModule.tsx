'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  TrendingUp, 
  BarChart3, 
  DollarSign, 
  Award, 
  Target, 
  CheckCircle2, 
  Flame, 
  ShoppingCart, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  Search, 
  Filter, 
  Zap, 
  Layers, 
  Calculator, 
  Percent, 
  ThumbsUp, 
  Star
} from 'lucide-react';

interface EmployeeKPIRecord {
  id: string;
  name: string;
  title: string;
  store: string;
  region: string;
  completedModules: number;
  fieldAuditScore: number;
  crossSellCount: number;
  wasteReductionRate: string;
  totalScore: number;
  bonusEarned: number;
  status: 'Üstün Başarı' | 'Hedef Yolunda' | 'Gelişim Gerekli';
}

const INITIAL_EMPLOYEE_KPIS: EmployeeKPIRecord[] = [
  {
    id: 'EMP-101',
    name: 'Merve Demir',
    title: 'Kasa Şefi / Mağaza Adayı',
    store: 'İstanbul Anadolu - Kadıköy',
    region: 'İstanbul',
    completedModules: 12,
    fieldAuditScore: 96,
    crossSellCount: 142,
    wasteReductionRate: '%2.8 Tasarruf',
    totalScore: 98,
    bonusEarned: 4500,
    status: 'Üstün Başarı'
  },
  {
    id: 'EMP-102',
    name: 'Caner Şahin',
    title: 'Reyon Yöneticisi (Taze Gıda)',
    store: 'İstanbul Avrupa - Beşiktaş',
    region: 'İstanbul',
    completedModules: 10,
    fieldAuditScore: 92,
    crossSellCount: 98,
    wasteReductionRate: '%3.5 Tasarruf',
    totalScore: 94,
    bonusEarned: 3800,
    status: 'Üstün Başarı'
  },
  {
    id: 'EMP-103',
    name: 'Selin Yılmaz',
    title: 'Mağaza Müdürü',
    store: 'İzmir - Alsancak Premium',
    region: 'Ege',
    completedModules: 14,
    fieldAuditScore: 95,
    crossSellCount: 110,
    wasteReductionRate: '%4.1 Tasarruf',
    totalScore: 96,
    bonusEarned: 6000,
    status: 'Üstün Başarı'
  },
  {
    id: 'EMP-104',
    name: 'Burak Kaya',
    title: 'Kasa Görevlisi',
    store: 'Ankara - Tunalı Hilmi',
    region: 'İç Anadolu',
    completedModules: 8,
    fieldAuditScore: 88,
    crossSellCount: 120,
    wasteReductionRate: '%1.8 Tasarruf',
    totalScore: 89,
    bonusEarned: 2900,
    status: 'Hedef Yolunda'
  },
  {
    id: 'EMP-105',
    name: 'Zeynep Arslan',
    title: 'Müdür Yardımcısı',
    store: 'Bursa - Nilüfer Hiper',
    region: 'Marmara',
    completedModules: 9,
    fieldAuditScore: 84,
    crossSellCount: 75,
    wasteReductionRate: '%2.0 Tasarruf',
    totalScore: 85,
    bonusEarned: 2400,
    status: 'Hedef Yolunda'
  },
  {
    id: 'EMP-106',
    name: 'Emre Çelik',
    title: 'Reyon Görevlisi',
    store: 'Antalya - Muratpaşa',
    region: 'Akdeniz',
    completedModules: 5,
    fieldAuditScore: 72,
    crossSellCount: 40,
    wasteReductionRate: '%0.8 Tasarruf',
    totalScore: 74,
    bonusEarned: 1000,
    status: 'Gelişim Gerekli'
  }
];

export default function EmployeePerformanceKPIModule() {
  // Simulator State
  const [staffCount, setStaffCount] = useState<number>(45);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(3500000);
  const [currentWasteRate, setCurrentWasteRate] = useState<number>(3.2);
  const [trainingEngagement, setTrainingEngagement] = useState<number>(85);

  // Filter State for Leaderboard Table
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Tümü');

  // Calculations for Financial Impact
  const estimatedWasteSavings = Math.round((monthlyRevenue * (currentWasteRate / 100)) * (trainingEngagement / 100) * 0.45);
  const estimatedCrossSellRevenue = Math.round((monthlyRevenue * 0.08) * (trainingEngagement / 100));
  const estimatedBasketGrowth = Math.round(10 + (trainingEngagement / 100) * 6);
  const netMonthlyFinancialROI = estimatedWasteSavings + estimatedCrossSellRevenue;

  const filteredEmployees = INITIAL_EMPLOYEE_KPIS.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'Tümü' || emp.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="space-y-12 my-6">
      
      {/* 1. HERO HEADER */}
      <div className="bg-gradient-to-br from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#087F96]/40 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-amber-400/30">
              <TrendingUp className="h-4 w-4" />
              <span>PERAKENDE PERFORMANS &amp; KPI ENTEGRASYON MOTORU</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
              Saha Yetkinliği ile Perakende Finansal Başarısını Birleştiren KPI Sistemi
            </h1>

            <p className="text-xs sm:text-sm text-gray-200 font-light leading-relaxed">
              Eğitim ve yetkinlik skorlarının mağaza ciro artışına, fire düşüşüne, sepet büyüklüğüne ve müşteri memnuniyetine (CSAT) etkisini anlık analitik göstergelerle ölçün ve şeffaf prim dağıtımını otomatize edin.
            </p>
          </div>

          <Link
            href="/kurumsal-fiyatlandirma"
            className="px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-2xl shadow-xl transition-all inline-flex items-center space-x-2 text-xs border border-amber-300 shrink-0"
          >
            <Sparkles className="h-4 w-4 fill-current" />
            <span>Kurumsal Teklif Alın</span>
          </Link>
        </div>

        {/* 4 SUMMARY STAT CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
          <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-1">
            <div className="text-gray-300 font-sans font-medium text-[11px]">Mağaza Ciro Artışı</div>
            <div className="text-2xl font-black text-emerald-300">+%18.4</div>
            <div className="text-[10px] text-emerald-200 font-sans">Eğitimli mağazalar ortalaması</div>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-1">
            <div className="text-gray-300 font-sans font-medium text-[11px]">Mağaza Fire Oranı Düşüşü</div>
            <div className="text-2xl font-black text-cyan-300">-%68 Tasarruf</div>
            <div className="text-[10px] text-cyan-200 font-sans">%3.2'den %1.0'e gerileme</div>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-1">
            <div className="text-gray-300 font-sans font-medium text-[11px]">Kasa Önü Sepet Büyümesi</div>
            <div className="text-2xl font-black text-amber-300">+%33 Büyüme</div>
            <div className="text-[10px] text-amber-200 font-sans">285 TL ➔ 380 TL sepet ortalaması</div>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-1">
            <div className="text-gray-300 font-sans font-medium text-[11px]">Müşteri Memnuniyeti (CSAT)</div>
            <div className="text-2xl font-black text-purple-300">4.8 / 5.0</div>
            <div className="text-[10px] text-purple-200 font-sans">%96 Hizmet kalitesi memnuniyeti</div>
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE RETAIL FINANCIAL ROI & KPI CALCULATOR */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-md space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-emerald-200">
            <Calculator className="h-4 w-4" />
            <span>Canlı Performans &amp; Finansal Etki Simülatörü</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B2A4A]">
            Mağazanızın Tahmini Aylık Finansal ROI Hesabı
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Aşağıdaki kaydırıcıları mağaza verilerinize göre ayarlayarak akademimizin aylık net tasarruf ve ciro katkısını hesaplayın:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* SLIDERS COLUMN */}
          <div className="lg:col-span-7 space-y-6 text-xs font-medium">
            
            {/* Slider 1: Staff Count */}
            <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <div className="flex justify-between items-center">
                <label className="font-bold text-[#0B2A4A] flex items-center space-x-1.5">
                  <Users className="h-4 w-4 text-[#087F96]" />
                  <span>Aktif Mağaza Çalışan Sayısı:</span>
                </label>
                <span className="font-mono font-black text-[#087F96] text-sm bg-cyan-50 px-3 py-1 rounded-lg border border-cyan-200">
                  {staffCount} Personel
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={staffCount}
                onChange={(e) => setStaffCount(Number(e.target.value))}
                className="w-full accent-[#087F96] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>10 Personel</span>
                <span>250 Personel</span>
                <span>500 Personel</span>
              </div>
            </div>

            {/* Slider 2: Monthly Revenue */}
            <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <div className="flex justify-between items-center">
                <label className="font-bold text-[#0B2A4A] flex items-center space-x-1.5">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span>Aylık Mağaza Ciro Hedefi:</span>
                </label>
                <span className="font-mono font-black text-emerald-700 text-sm bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                  {monthlyRevenue.toLocaleString('tr-TR')} TL
                </span>
              </div>
              <input
                type="range"
                min="500000"
                max="15000000"
                step="250000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>500.000 TL</span>
                <span>7.500.000 TL</span>
                <span>15.000.000 TL</span>
              </div>
            </div>

            {/* Slider 3: Current Waste Rate */}
            <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <div className="flex justify-between items-center">
                <label className="font-bold text-[#0B2A4A] flex items-center space-x-1.5">
                  <Flame className="h-4 w-4 text-amber-600" />
                  <span>Mevcut Mağaza Fire Oranı (%):</span>
                </label>
                <span className="font-mono font-black text-amber-700 text-sm bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                  %{currentWasteRate.toFixed(1)} Fire
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6.0"
                step="0.1"
                value={currentWasteRate}
                onChange={(e) => setCurrentWasteRate(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>%0.5 Düşük Fire</span>
                <span>%3.0 Ortalama</span>
                <span>%6.0 Yüksek Fire</span>
              </div>
            </div>

            {/* Slider 4: Training Engagement */}
            <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <div className="flex justify-between items-center">
                <label className="font-bold text-[#0B2A4A] flex items-center space-x-1.5">
                  <Award className="h-4 w-4 text-purple-600" />
                  <span>Eğitim Tamamlama Katılım Hedefi (%):</span>
                </label>
                <span className="font-mono font-black text-purple-800 text-sm bg-purple-50 px-3 py-1 rounded-lg border border-purple-200">
                  %{trainingEngagement} Tamamlama
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                step="5"
                value={trainingEngagement}
                onChange={(e) => setTrainingEngagement(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>%40 Başlangıç</span>
                <span>%75 Hedef</span>
                <span>%100 Tam Katılım</span>
              </div>
            </div>

          </div>

          {/* SIMULATION RESULT DISPLAY CARD */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#061B33] to-[#0B2A4A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#087F96]/40 space-y-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-widest bg-cyan-900/50 px-2.5 py-0.5 rounded-full border border-cyan-400/30">
                  TAHMİNİ FİNANSAL KAZANÇ
                </span>
                <h3 className="font-display font-black text-2xl text-white">
                  Aylık Toplam Net Katkı
                </h3>
              </div>

              {/* Total ROI Box */}
              <div className="bg-white/10 p-5 rounded-2xl border border-white/15 space-y-1 text-center font-mono">
                <div className="text-xs text-gray-300 font-sans">Aylık Ek Finansal Kazanım:</div>
                <div className="text-3xl sm:text-4xl font-black text-amber-300">
                  +{netMonthlyFinancialROI.toLocaleString('tr-TR')} TL
                </div>
                <div className="text-[11px] text-emerald-300 font-sans font-bold pt-1">
                  Yıllık Tahmini Etki: +{(netMonthlyFinancialROI * 12).toLocaleString('tr-TR')} TL
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2 text-xs font-mono pt-2 border-t border-white/10">
                <div className="flex justify-between items-center text-gray-200">
                  <span>📉 Fire Önleme Tasarrufu:</span>
                  <span className="font-bold text-cyan-300">+{estimatedWasteSavings.toLocaleString('tr-TR')} TL/ay</span>
                </div>
                <div className="flex justify-between items-center text-gray-200">
                  <span>🛒 Çapraz Satış Ciro Ekstra:</span>
                  <span className="font-bold text-emerald-300">+{estimatedCrossSellRevenue.toLocaleString('tr-TR')} TL/ay</span>
                </div>
                <div className="flex justify-between items-center text-gray-200">
                  <span>🛍️ Tahmini Sepet Artışı:</span>
                  <span className="font-bold text-amber-300">+% {estimatedBasketGrowth} Büyüme</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('leaderboard-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs transition-colors shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Personel Skor Kartlarını Gör</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </div>

      {/* 3. 2 HD VISUAL FEATURE BANNERS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Banner 1: KPI Analytics Engine */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative h-64 w-full overflow-hidden bg-slate-900">
              <Image
                src="/images/corp/kpi_1.jpg"
                alt="Perakende KPI Entegrasyon Motoru"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-[#0B2A4A]/90 backdrop-blur-md text-cyan-300 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-cyan-400/30">
                ANLIK PERFORMANS MOTORU
              </div>
            </div>

            <div className="p-6 space-y-3">
              <h3 className="font-display font-black text-xl text-[#0B2A4A]">
                Eğitim &amp; Saha Notlarının Otomatik KPI Entegrasyonu
              </h3>

              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Yalnızca test geçmek yetmez! Mağaza personelinin mikro video tamamlama oranı, sınav notları, gizli müşteri audit puanı ve kasadaki ürün tavsiye sayısı tek bir analitik dashboard üzerinde birleşir.
              </p>

              <ul className="space-y-2 text-xs text-gray-700 font-semibold pt-1">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Mağaza bazında anlık performans sıcaklık haritası</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Subjektif amir değerlendirmelerini sıfıra indiren matematiksel skor</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 pt-0">
            <Link
              href="/kurumsal-fiyatlandirma"
              className="w-full py-3 bg-[#0B2A4A] hover:bg-[#061B33] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center space-x-1 text-center"
            >
              <span>Platform Demosu İste</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Banner 2: Store Heatmap & Bonus Distribution */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative h-64 w-full overflow-hidden bg-slate-900">
              <Image
                src="/images/corp/kpi_2.jpg"
                alt="Şube & Mağaza Performans Isı Haritası"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-purple-900/90 backdrop-blur-md text-purple-200 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-purple-400/30">
                ŞEFFAF PRİM DAĞITIM SİSTEMİ
              </div>
            </div>

            <div className="p-6 space-y-3">
              <h3 className="font-display font-black text-xl text-[#0B2A4A]">
                Bölge ve Mağaza Kıyaslamalı Prim &amp; Ödüllendirme Algoritması
              </h3>

              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Yüksek performans gösteren personeli ve mağazaları anında tespit edin. Hak edilen primleri otomatik hesaplayarak çalışan motivasyonunu ve şirkete bağlılığı (retention) zirveye çıkarın.
              </p>

              <ul className="space-y-2 text-xs text-gray-700 font-semibold pt-1">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] shrink-0" />
                  <span>Mağazalar arası tatlı rekabet sunan canlı liderlik tablosu</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] shrink-0" />
                  <span>Adil prim hesaplaması ile iş gücü devir (turnover) oranında %45 azalma</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 pt-0">
            <Link
              href="/talep-olustur"
              className="w-full py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center space-x-1 text-center"
            >
              <span>İK Yetenek Analizi Talep Et</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </div>

      {/* 4. PERAKENDE 4 TEMEL ÖLÇÜM BOYUTU */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black text-[#087F96] bg-cyan-50 px-3.5 py-1 rounded-full border border-cyan-200 uppercase tracking-wider">
            360 Derece Değerlendirme
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B2A4A]">
            Perakende Performans ve KPI Ölçüm Boyutları
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Platformumuzda her çalışan 4 kritik perakende metriği üzerinden objektif olarak puanlanır:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-medium">
          
          <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-2">
            <div className="flex items-center justify-between text-blue-900">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <span className="text-[10px] font-mono font-bold uppercase bg-blue-100 px-2 py-0.5 rounded">Finansal KPI</span>
            </div>
            <h4 className="font-bold text-[#0B2A4A] text-sm">Ciro &amp; Fire Katkısı</h4>
            <p className="text-[11px] text-gray-600 leading-snug">Reyon ciro hedefi tutturma, kasa önü çapraz satış adedi ve taze gıda fire azaltma yüzdesi.</p>
          </div>

          <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between text-emerald-900">
              <Layers className="h-5 w-5 text-emerald-600" />
              <span className="text-[10px] font-mono font-bold uppercase bg-emerald-100 px-2 py-0.5 rounded">Operasyonel KPI</span>
            </div>
            <h4 className="font-bold text-[#0B2A4A] text-sm">Saha Standartları</h4>
            <p className="text-[11px] text-gray-600 leading-snug">5S raf düzeni, FIFO stok dönme disiplini, etiket doğruluğu ve kasa açılış-kapanış hızı.</p>
          </div>

          <div className="p-5 bg-purple-50/60 rounded-2xl border border-purple-200 space-y-2">
            <div className="flex items-center justify-between text-purple-900">
              <ThumbsUp className="h-5 w-5 text-purple-600" />
              <span className="text-[10px] font-mono font-bold uppercase bg-purple-100 px-2 py-0.5 rounded">Müşteri KPI</span>
            </div>
            <h4 className="font-bold text-[#0B2A4A] text-sm">CSAT &amp; Güler Yüz</h4>
            <p className="text-[11px] text-gray-600 leading-snug">Müşteri memnuniyet anketi puanı, şikayet sıklığı, iletişim becerisi ve yardımseverlik skoru.</p>
          </div>

          <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-amber-900">
              <Award className="h-5 w-5 text-amber-600" />
              <span className="text-[10px] font-mono font-bold uppercase bg-amber-100 px-2 py-0.5 rounded">Gelişim KPI</span>
            </div>
            <h4 className="font-bold text-[#0B2A4A] text-sm">Eğitim &amp; Sınav Notu</h4>
            <p className="text-[11px] text-gray-600 leading-snug">Mikro ders tamamlama hızı, sertifikasyon sınav ortalaması ve saha görev tamamlama skoru.</p>
          </div>

        </div>
      </div>

      {/* 5. CANLI MAĞAZA & PERSONEL KPI LİDERLİK TABLOSU */}
      <div id="leaderboard-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-black text-purple-900 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-300 uppercase tracking-wider">
              Örnek Canlı Veri Paneli
            </span>
            <h3 className="font-display font-black text-2xl text-[#0B2A4A]">
              Çalışan KPI &amp; Prim Hak Ediş Liderlik Tablosu
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Saha yetkinliği ve finansal hedefleri tutturarak prim kazanan örnek çalışan listesi:
            </p>
          </div>

          {/* SEARCH & REGION FILTERS */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Personel veya mağaza ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 font-medium focus:outline-none focus:border-[#087F96]"
              />
            </div>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#0B2A4A] focus:outline-none focus:border-[#087F96]"
            >
              <option value="Tümü">Tüm Bölgeler</option>
              <option value="İstanbul">İstanbul Bölgesi</option>
              <option value="Ege">Ege Bölgesi</option>
              <option value="İç Anadolu">İç Anadolu</option>
              <option value="Marmara">Marmara Bölgesi</option>
              <option value="Akdeniz">Akdeniz Bölgesi</option>
            </select>
          </div>
        </div>

        {/* LEADERBOARD TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-[#0B2A4A] text-white font-mono font-bold uppercase tracking-wider">
                <th className="p-3.5 border-r border-white/10">Çalışan Bilgisi</th>
                <th className="p-3.5 border-r border-white/10">Mağaza &amp; Bölge</th>
                <th className="p-3.5 border-r border-white/10 text-center">Eğitim Modülleri</th>
                <th className="p-3.5 border-r border-white/10 text-center">Saha Denetim</th>
                <th className="p-3.5 border-r border-white/10 text-center">Çapraz Satış</th>
                <th className="p-3.5 border-r border-white/10 text-center">Fire Azaltma</th>
                <th className="p-3.5 border-r border-white/10 text-center">Toplam KPI</th>
                <th className="p-3.5 text-center text-amber-300">Hak Edilen Prim</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                  
                  {/* Name & Title */}
                  <td className="p-3.5">
                    <div className="font-black text-[#0B2A4A] text-sm">{emp.name}</div>
                    <div className="text-[11px] text-gray-500 font-sans">{emp.title}</div>
                  </td>

                  {/* Store & Region */}
                  <td className="p-3.5">
                    <div className="font-bold text-[#087F96]">{emp.store}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{emp.region}</div>
                  </td>

                  {/* Completed Modules */}
                  <td className="p-3.5 text-center font-mono">
                    <span className="bg-blue-50 text-blue-800 px-2.5 py-1 rounded-lg border border-blue-200 font-bold">
                      {emp.completedModules} Modül
                    </span>
                  </td>

                  {/* Field Audit */}
                  <td className="p-3.5 text-center font-mono font-bold text-gray-700">
                    {emp.fieldAuditScore} / 100
                  </td>

                  {/* Cross Sell */}
                  <td className="p-3.5 text-center font-mono text-emerald-700 font-bold">
                    +{emp.crossSellCount} Adet
                  </td>

                  {/* Waste Reduction */}
                  <td className="p-3.5 text-center font-mono text-cyan-700 font-bold">
                    {emp.wasteReductionRate}
                  </td>

                  {/* Total KPI Score */}
                  <td className="p-3.5 text-center font-mono">
                    <span className={`px-2.5 py-1 rounded-lg font-black text-sm ${
                      emp.totalScore >= 90 ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                      emp.totalScore >= 80 ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {emp.totalScore} Puan
                    </span>
                  </td>

                  {/* Bonus Earned */}
                  <td className="p-3.5 text-center font-mono font-black text-sm text-emerald-700 bg-emerald-50/50">
                    +{emp.bonusEarned.toLocaleString('tr-TR')} TL
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-500 italic flex items-center justify-between">
          <span>* Prim hesaplama katsayıları şirketinizin mevcut prim yönetmeliğine göre özelleştirilir.</span>
          <Link href="/kurumsal-fiyatlandirma" className="text-[#087F96] font-bold not-italic hover:underline flex items-center space-x-1">
            <span>Kurumsal Entegrasyon Şartlarını İnceleyin</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
