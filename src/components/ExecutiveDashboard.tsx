'use client';

import React, { useState } from 'react';
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
  HelpCircle,
  ChevronDown,
  ChevronUp,
  X,
  UserCheck,
  AlertTriangle,
  Award
} from 'lucide-react';

// Sample candidate datasets for Executive Summary Cards
const EXEC_CARD_DATASETS = {
  terfi: {
    title: '86 Kişi İç Terfi Eden Yönetici & Personel Listesi',
    subtitle: 'Son 12 ayda akademi sertifikasını alarak kurum içinden üst kademeye terfi eden çalışanlar (%39 İç Terfi Oranı).',
    totalCount: 86,
    badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
    records: [
      { id: 'et-1', name: 'Selin Yılmaz', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', role: 'Mağaza Müdür Yardımcısı ➔ Mağaza Müdürü', department: 'Mağaza Operasyonları', region: 'Marmara Bölgesi', branch: 'Kadıköy Premium Şubesi', score: 98, date: 'Ağustos 2026', status: 'İçeriden Terfi Eden ✅' },
      { id: 'et-2', name: 'Caner Kaya', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', role: 'Şube Şefi ➔ Mağaza Müdürü', department: 'Saha Direktörlüğü', region: 'İç Anadolu Bölgesi', branch: 'Ankara Merkez Şubesi', score: 96, date: 'Temmuz 2026', status: 'İçeriden Terfi Eden ✅' },
      { id: 'et-3', name: 'Merve Şahin', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', role: 'Taze Gıda Şefi ➔ Kategori Müdürü', department: 'Taze Gıda & Satın Alma', region: 'Ege Bölgesi', branch: 'İzmir Alsancak Şubesi', score: 95, date: 'Haziran 2026', status: 'İçeriden Terfi Eden ✅' },
      { id: 'et-4', name: 'Mehmet Yılmaz', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', role: 'Reyon Şefi ➔ Müdür Yardımcısı', department: 'Mağaza Operasyonları', region: 'Güney Marmara', branch: 'Bursa Nilüfer Şubesi', score: 93, date: 'Mayıs 2026', status: 'İçeriden Terfi Eden ✅' },
      { id: 'et-5', name: 'Burak Arslan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', role: 'Kasa Şefi ➔ Müdür Yardımcısı', department: 'Kasa Operasyonları', region: 'Akdeniz Bölgesi', branch: 'Lara Şubesi', score: 92, date: 'Mart 2026', status: 'İçeriden Terfi Eden ✅' },
      { id: 'et-6', name: 'Volkan Şen', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80', role: 'Müdür Yrd. ➔ Mağaza Müdürü', department: 'Mağaza Operasyonları', region: 'Akdeniz Bölgesi', branch: 'Adana Çukurova Şubesi', score: 94, date: 'Mart 2026', status: 'İçeriden Terfi Eden ✅' },
      { id: 'et-7', name: 'Elif Deniz', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', role: 'Kasa Sorumlusu ➔ Kasa Şefi', department: 'Kasa Operasyonları', region: 'İç Anadolu Bölgesi', branch: 'Eskişehir Espark Şubesi', score: 91, date: 'Şubat 2026', status: 'İçeriden Terfi Eden ✅' },
      { id: 'et-8', name: 'Oğuzhan Çelik', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', role: 'Taze Gıda Görevlisi ➔ Saha Şefi', department: 'Taze Gıda & Satın Alma', region: 'İç Anadolu Bölgesi', branch: 'Kayseri Şubesi', score: 95, date: 'Ocak 2026', status: 'İçeriden Terfi Eden ✅' }
    ]
  },
  hazir: {
    title: '33 Kişi Terfiye Hazır Yönetici Listesi',
    subtitle: 'Akademi eğitimlerini ve vaka analizlerini 90+ puanla tamamlamış, anında atanabilir durumda olan lider adayları.',
    totalCount: 33,
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    records: [
      { id: 'eh-1', name: 'Zeynep Karahan', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', role: 'Saha Direktör Yardımcısı ➔ Bölge Müdürü Adayı', department: 'Saha Direktörlüğü', region: 'Marmara Bölgesi', branch: 'Marmara Genel Merkez', score: 98, date: 'PKA Derece', status: 'Hemen Atanabilir ⚡' },
      { id: 'eh-2', name: 'Ahmet Can Demir', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80', role: 'Kasa Operasyon Şefi ➔ Müdür Yrd. Adayı', department: 'Kasa Operasyonları', region: 'Marmara Bölgesi', branch: 'Beşiktaş Çarşı Şubesi', score: 94, date: 'PKA Başarı', status: 'Hemen Atanabilir ⚡' },
      { id: 'eh-3', name: 'Pınar Erdem', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', role: 'Operasyon Sorumlusu ➔ Mağaza Müdürü Adayı', department: 'Mağaza Operasyonları', region: 'Marmara Bölgesi', branch: 'Kadıköy Premium Şubesi', score: 94, date: 'PKA Başarı', status: 'Hemen Atanabilir ⚡' },
      { id: 'eh-4', name: 'Barış Alp', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', role: 'Bölge Sorumlusu ➔ Saha Direktör Adayı', department: 'Saha Direktörlüğü', region: 'İç Anadolu Bölgesi', branch: 'Ankara Kızılay Şubesi', score: 93, date: 'PKA Başarı', status: 'Hemen Atanabilir ⚡' },
      { id: 'eh-5', name: 'Arzu Demir', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', role: 'Satın Alma Uzmanı ➔ Kategori Müdürü Adayı', department: 'Taze Gıda & Satın Alma', region: 'Ege Bölgesi', branch: 'İzmir Karşıyaka Şubesi', score: 92, date: 'PKA Başarı', status: 'Hemen Atanabilir ⚡' },
      { id: 'eh-6', name: 'Hakan Kurt', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', role: 'Reyon Şefi ➔ Müdür Yrd. Adayı', department: 'Mağaza Operasyonları', region: 'Güney Marmara', branch: 'Bursa Osmangazi Şubesi', score: 91, date: 'PKA Başarı', status: 'Hemen Atanabilir ⚡' },
      { id: 'eh-7', name: 'Murat Şen', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', role: 'Kasa Görevlisi ➔ Kasa Şef Adayı', department: 'Kasa Operasyonları', region: 'İç Anadolu Bölgesi', branch: 'Eskişehir Anadolu Şubesi', score: 94, date: 'Üstün Başarı', status: 'Hemen Atanabilir ⚡' }
    ]
  },
  potansiyel: {
    title: '84 Personel Yüksek Potansiyel Yetenek Havuzu',
    subtitle: 'Yüksek performans gösteren ve kariyer patikasında liderlik eğitimi devam eden HiPo yetenekler.',
    totalCount: 84,
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    records: [
      { id: 'ep-1', name: 'Deniz Soylu', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', role: 'Satış Temsilcisi ➔ Kategori Şef Adayı', department: 'Mağaza Operasyonları', region: 'Marmara Bölgesi', branch: 'Kadıköy Şubesi', score: 89, date: 'Gelişim Havuzunda', status: 'Yüksek Potansiyel (HiPo) 🌟' },
      { id: 'ep-2', name: 'Fatih Yıldırım', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', role: 'Şube Şefi ➔ Müdür Yrd. Adayı', department: 'Mağaza Operasyonları', region: 'Ege Bölgesi', branch: 'Bodrum Marina Şubesi', score: 94, date: 'Gelişim Havuzunda', status: 'Yüksek Potansiyel (HiPo) 🌟' },
      { id: 'ep-3', name: 'Ayşe Güneş', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', role: 'Kasa Şefi ➔ Müdür Yrd. Adayı', department: 'Kasa Operasyonları', region: 'Marmara Bölgesi', branch: 'Ataköy Konakları Şubesi', score: 96, date: 'Gelişim Havuzunda', status: 'Yüksek Potansiyel (HiPo) 🌟' },
      { id: 'ep-4', name: 'Kemal Aksoy', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', role: 'Müdür Yrd. ➔ Mağaza Müdürü Adayı', department: 'Mağaza Operasyonları', region: 'Marmara Bölgesi', branch: 'Bakırköy Meydan Şubesi', score: 95, date: 'Gelişim Havuzunda', status: 'Yüksek Potansiyel (HiPo) 🌟' },
      { id: 'ep-5', name: 'Tarık Yılmaz', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', role: 'Taze Gıda Görevlisi ➔ Taze Gıda Şef Adayı', department: 'Taze Gıda & Satın Alma', region: 'İç Anadolu Bölgesi', branch: 'Konya Selçuklu Şubesi', score: 91, date: 'Gelişim Havuzunda', status: 'Yüksek Potansiyel (HiPo) 🌟' },
      { id: 'ep-6', name: 'Serkan Polat', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', role: 'Kasa Şefi ➔ Müdür Yrd. Adayı', department: 'Kasa Operasyonları', region: 'Marmara Bölgesi', branch: 'Üsküdar Şubesi', score: 92, date: 'Gelişim Havuzunda', status: 'Yüksek Potansiyel (HiPo) 🌟' },
      { id: 'ep-7', name: 'Gökhan Aydın', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', role: 'Müdür Yrd. ➔ Mağaza Müdürü Adayı', department: 'Mağaza Operasyonları', region: 'Ege Bölgesi', branch: 'Manisa Merkez Şubesi', score: 93, date: 'Gelişim Havuzunda', status: 'Yüksek Potansiyel (HiPo) 🌟' }
    ]
  },
  yedeksiz: {
    title: '21 Pozisyon Yedeği Olmayan Kritik Risk Listesi',
    subtitle: 'Mevcut durumda 0 yedek adayı bulunan ve acil akademi yetiştirme programına alınması gereken kritik pozisyonlar.',
    totalCount: 21,
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    records: [
      { id: 'ey-1', name: 'Kadıköy Premium Şubesi', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', role: 'Kritik Pozisyon: Kıdemli Mağaza Müdürü', department: 'Mağaza Operasyonları', region: 'Marmara Bölgesi', branch: 'Kadıköy Premium Şubesi', score: 0, date: 'Yedek Aday: 0', status: 'Kritik Risk 🚨 (Yedeksiz)' },
      { id: 'ey-2', name: 'İzmir Alsancak Şubesi', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', role: 'Kritik Pozisyon: Taze Gıda Kategori Müdürü', department: 'Taze Gıda & Satın Alma', region: 'Ege Bölgesi', branch: 'İzmir Alsancak Şubesi', score: 0, date: 'Yedek Aday: 0', status: 'Kritik Risk 🚨 (Yedeksiz)' },
      { id: 'ey-3', name: 'Beşiktaş Çarşı Şubesi', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80', role: 'Kritik Pozisyon: Kasa Operasyon Şefi', department: 'Kasa Operasyonları', region: 'Marmara Bölgesi', branch: 'Beşiktaş Çarşı Şubesi', score: 0, date: 'Yedek Aday: 0', status: 'Yüksek Risk ⚠️ (Yedeksiz)' },
      { id: 'ey-4', name: 'Ankara Kızılay Şubesi', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', role: 'Kritik Pozisyon: İç Anadolu Bölge Müdürü', department: 'Saha Direktörlüğü', region: 'İç Anadolu Bölgesi', branch: 'Ankara Kızılay Şubesi', score: 0, date: 'Yedek Aday: 0', status: 'Kritik Risk 🚨 (Yedeksiz)' },
      { id: 'ey-5', name: 'Bursa Osmangazi Şubesi', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', role: 'Kritik Pozisyon: Mağaza Müdürü', department: 'Mağaza Operasyonları', region: 'Güney Marmara', branch: 'Bursa Osmangazi Şubesi', score: 0, date: 'Yedek Aday: 0', status: 'Yüksek Risk ⚠️ (Yedeksiz)' },
      { id: 'ey-6', name: 'Adana Çukurova Şubesi', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80', role: 'Kritik Pozisyon: Akdeniz Taze Gıda Şefi', department: 'Taze Gıda & Satın Alma', region: 'Akdeniz Bölgesi', branch: 'Adana Çukurova Şubesi', score: 0, date: 'Yedek Aday: 0', status: 'Kritik Risk 🚨 (Yedeksiz)' },
      { id: 'ey-7', name: 'Kayseri Şubesi', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', role: 'Kritik Pozisyon: Şube Müdür Yardımcısı', department: 'Mağaza Operasyonları', region: 'İç Anadolu Bölgesi', branch: 'Kayseri Şubesi', score: 0, date: 'Yedek Aday: 0', status: 'Yüksek Risk ⚠️ (Yedeksiz)' }
    ]
  }
};

export default function ExecutiveDashboard() {
  const [activeCategory, setActiveCategory] = useState<'terfi' | 'hazir' | 'potansiyel' | 'yedeksiz' | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(5);

  const handleCategoryClick = (category: 'terfi' | 'hazir' | 'potansiyel' | 'yedeksiz') => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
      setVisibleCount(5);
    }
  };

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

      {/* TOP STRATEGIC EXECUTIVE KPIS (INTERACTIVE CARDS) */}
      <div className="space-y-4">
        <div className="text-xs text-amber-300 font-bold flex items-center space-x-2">
          <span>💡 Detaylı çalışan ve pozisyon listelerini incelemek için aşağıdaki kartlara tıklayabilirsiniz:</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Card 1: Toplam Çalışan */}
          <div className="p-5 bg-white/5 rounded-2xl border border-white/15">
            <span className="text-xs font-mono text-gray-300 uppercase font-bold block">Toplam Çalışan</span>
            <div className="text-3xl font-black text-white mt-1">1.000</div>
            <span className="text-xs text-gray-300 font-semibold mt-1 block">Aktif Kadro</span>
          </div>

          {/* Card 2: Yıllık Turnover */}
          <div className="p-5 bg-white/5 rounded-2xl border border-white/15">
            <span className="text-xs font-mono text-emerald-300 uppercase font-bold block">Yıllık Turnover</span>
            <div className="text-3xl font-black text-emerald-400 mt-1">%17</div>
            <span className="text-xs text-emerald-300 font-semibold mt-1 block">Önceki: %24 (-%7)</span>
          </div>

          {/* Card 3: İç Terfi Oranı (CLICKABLE) */}
          <div
            onClick={() => handleCategoryClick('terfi')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group shadow-md transform hover:-translate-y-1 ${
              activeCategory === 'terfi'
                ? 'bg-amber-950/60 border-2 border-amber-400 ring-2 ring-amber-400/50 shadow-amber-500/20'
                : 'bg-white/5 border-white/15 hover:border-amber-400/60 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-300 uppercase font-bold block">İç Terfi Oranı</span>
              <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-md opacity-90 group-hover:opacity-100">
                {activeCategory === 'terfi' ? 'AÇIK 📜' : '👆 TIKLA'}
              </span>
            </div>
            <div className="text-3xl font-black text-amber-400 mt-1">%39</div>
            <span className="text-xs text-amber-200 font-bold mt-1 block">
              86 Personel Terfi Etti (%39)
            </span>
          </div>

          {/* Card 4: Terfiye Hazır Yönetici (CLICKABLE) */}
          <div
            onClick={() => handleCategoryClick('hazir')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group shadow-md transform hover:-translate-y-1 ${
              activeCategory === 'hazir'
                ? 'bg-emerald-950/60 border-2 border-emerald-400 ring-2 ring-emerald-400/50 shadow-emerald-500/20'
                : 'bg-white/5 border-white/15 hover:border-emerald-400/60 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-300 uppercase font-bold block">Terfiye Hazır Yönetici</span>
              <span className="text-[9px] bg-emerald-400 text-slate-950 font-black px-1.5 py-0.5 rounded-md opacity-90 group-hover:opacity-100">
                {activeCategory === 'hazir' ? 'AÇIK 📜' : '👆 TIKLA'}
              </span>
            </div>
            <div className="text-3xl font-black text-emerald-400 mt-1">33 Kişi</div>
            <span className="text-xs text-emerald-300 font-semibold mt-1 block">Hemen Atanabilir ⚡</span>
          </div>

          {/* Card 5: Yüksek Potansiyel (CLICKABLE) */}
          <div
            onClick={() => handleCategoryClick('potansiyel')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group shadow-md transform hover:-translate-y-1 ${
              activeCategory === 'potansiyel'
                ? 'bg-cyan-950/60 border-2 border-cyan-400 ring-2 ring-cyan-400/50 shadow-cyan-500/20'
                : 'bg-white/5 border-white/15 hover:border-cyan-400/60 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#DDF4F7] uppercase font-bold block">Yüksek Potansiyel</span>
              <span className="text-[9px] bg-cyan-400 text-slate-950 font-black px-1.5 py-0.5 rounded-md opacity-90 group-hover:opacity-100">
                {activeCategory === 'potansiyel' ? 'AÇIK 📜' : '👆 TIKLA'}
              </span>
            </div>
            <div className="text-3xl font-black text-[#DDF4F7] mt-1">84 Personel</div>
            <span className="text-xs text-cyan-300 font-semibold mt-1 block">Yetenek Havuzu 🌟</span>
          </div>

          {/* Card 6: Yedeksiz Pozisyon (CLICKABLE) */}
          <div
            onClick={() => handleCategoryClick('yedeksiz')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group shadow-md transform hover:-translate-y-1 ${
              activeCategory === 'yedeksiz'
                ? 'bg-rose-900/80 border-2 border-rose-400 ring-2 ring-rose-400/50 shadow-rose-500/30'
                : 'bg-rose-950/60 border border-rose-400/50 hover:bg-rose-900/60 hover:border-rose-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-rose-300 uppercase font-bold block">Yedeksiz Pozisyon</span>
              <span className="text-[9px] bg-rose-400 text-slate-950 font-black px-1.5 py-0.5 rounded-md opacity-90 group-hover:opacity-100">
                {activeCategory === 'yedeksiz' ? 'AÇIK 📜' : '👆 TIKLA'}
              </span>
            </div>
            <div className="text-3xl font-black text-rose-400 mt-1">21 Pozisyon</div>
            <span className="text-xs text-rose-300 font-extrabold mt-1 block">Kritik Risk ⚠️</span>
          </div>
        </div>
      </div>

      {/* 🔴 INTERACTIVE CANDIDATES / POSITIONS MODAL DRAWER TABLE */}
      {activeCategory && (() => {
        const dataset = EXEC_CARD_DATASETS[activeCategory];
        const visibleList = dataset.records.slice(0, visibleCount);

        return (
          <div className="bg-[#0B2A4A] p-6 sm:p-7 rounded-3xl border-2 border-amber-400/70 space-y-5 shadow-2xl animate-fadeIn">
            {/* Table Header & Close Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 text-xs font-mono font-black rounded-xl border ${dataset.badgeColor}`}>
                    {dataset.totalCount} Kayıt
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-white">{dataset.title}</h4>
                </div>
                <p className="text-xs text-gray-300 mt-1">{dataset.subtitle}</p>
              </div>

              <button
                onClick={() => setActiveCategory(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-200 font-bold rounded-xl text-xs flex items-center space-x-1.5 border border-white/20 transition-all cursor-pointer w-fit self-end sm:self-center"
              >
                <X className="w-4 h-4" />
                <span>Listeyi Kapat</span>
              </button>
            </div>

            {/* Candidates Table */}
            <div className="overflow-x-auto text-xs rounded-2xl border border-white/10 shadow-2xl bg-[#061B33]">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#082240] text-gray-300 border-b border-white/10 font-bold">
                    <th className="p-3.5">Personel / Şube Pozisyonu</th>
                    <th className="p-3.5">Unvan / Kariyer Değişimi</th>
                    <th className="p-3.5">Departman</th>
                    <th className="p-3.5">Bölge &amp; Şube</th>
                    <th className="p-3.5 text-center">PKA Skoru / Tarih</th>
                    <th className="p-3.5 text-center">Durum &amp; Aksiyon</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {visibleList.map((rec) => (
                    <tr key={rec.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 flex items-center space-x-3">
                        <img
                          src={rec.avatar}
                          alt={rec.name}
                          className="w-9 h-9 rounded-full object-cover border-2 border-amber-400 shadow-md"
                        />
                        <div>
                          <div className="font-extrabold text-white text-sm">{rec.name}</div>
                          <div className="text-[11px] text-gray-400 font-mono">{rec.branch}</div>
                        </div>
                      </td>
                      <td className="p-3.5 font-bold text-amber-300">{rec.role}</td>
                      <td className="p-3.5 text-gray-300 font-bold">{rec.department}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-cyan-300">{rec.region}</div>
                        <div className="text-[11px] text-gray-400">{rec.branch}</div>
                      </td>
                      <td className="p-3.5 text-center">
                        {rec.score > 0 ? (
                          <span className="font-mono font-black text-amber-400 bg-amber-950/60 px-2 py-1 rounded-lg border border-amber-500/30 block w-fit mx-auto mb-1">
                            PKA Skoru: {rec.score} Puan
                          </span>
                        ) : (
                          <span className="font-mono font-black text-rose-300 bg-rose-950/60 px-2 py-1 rounded-lg border border-rose-500/30 block w-fit mx-auto mb-1">
                            Yedek: 0 Pozisyon
                          </span>
                        )}
                        <span className="text-[10px] text-gray-300 font-bold">{rec.date}</span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border whitespace-nowrap ${
                          rec.status.includes('Kritik') || rec.status.includes('Risk')
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            : rec.status.includes('Hemen') || rec.status.includes('Atanabilir')
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : rec.status.includes('Terfi')
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                        }`}>
                          {rec.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 5-ROW BATCH EXPAND/COLLAPSE CONTROLS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#061B33] p-4 rounded-2xl border border-white/10 text-xs">
              <div className="text-gray-300 font-mono font-bold">
                Gösterilen: <span className="text-amber-400 font-black">1 - {Math.min(visibleCount, dataset.records.length)}</span> / Toplam <span className="text-cyan-400 font-black">{dataset.totalCount} Kayıt</span>
              </div>

              <div className="flex items-center space-x-3">
                {visibleCount < dataset.records.length && (
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 5)}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow-lg transition-all cursor-pointer"
                  >
                    <ChevronDown className="h-4 w-4" />
                    <span>Daha Fazla Göster (+5 Kayıt)</span>
                  </button>
                )}

                {visibleCount > 5 && (
                  <button
                    onClick={() => setVisibleCount(5)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-200 font-bold rounded-xl text-xs flex items-center space-x-1.5 border border-white/20 transition-all cursor-pointer"
                  >
                    <ChevronUp className="h-4 w-4" />
                    <span>Daralt (İlk 5 Kayda Dön)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}

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
