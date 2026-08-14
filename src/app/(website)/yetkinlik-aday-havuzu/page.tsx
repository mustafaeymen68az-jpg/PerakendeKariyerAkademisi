'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Building2,
  Clock
} from 'lucide-react';

export default function CandidatePoolPage() {
  const [cityFilter, setCityFilter] = useState('Uşak');
  const [roleFilter, setRoleFilter] = useState('Mağaza Müdürü');

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9]">
      <section className="bg-[#0B2A4A] text-white py-14 border-b border-[#087F96]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 mb-3">
            <Clock className="h-4 w-4" />
            <span>Yakında Hizmetinizde • Erken Erişim Simülasyonu</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Yetkinlik Bazlı Perakende Aday Havuzu</h1>
          <p className="mt-3 text-base text-gray-300 max-w-2xl mx-auto">
            İnsan Kaynakları yöneticilerinin şehir, deneyim, KPI puanı, liderlik skoru ve sertifika filtreleriyle nitelikli perakende adaylarına ulaşacağı yetenek platformu.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* HR Search Filter Panel */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h2 className="font-black text-sm text-[#0B2A4A] flex items-center">
                <Filter className="h-4 w-4 text-[#087F96] mr-2" />
                Aday Arama & Yetkinlik Filtreleri
              </h2>
              <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-[10px] font-black uppercase">
                Yakında
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Aranan Pozisyon</label>
                <select 
                  value={roleFilter} 
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl font-medium"
                >
                  <option value="Mağaza Müdürü">Mağaza Müdürü</option>
                  <option value="Bölge Müdürü">Bölge Müdürü</option>
                  <option value="Kategori Yöneticisi">Kategori Yöneticisi</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Şehir / Lokasyon</label>
                <select 
                  value={cityFilter} 
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl font-medium"
                >
                  <option value="Uşak">Uşak</option>
                  <option value="İstanbul">İstanbul</option>
                  <option value="İzmir">İzmir</option>
                  <option value="Ankara">Ankara</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Min. Deneyim</label>
                <select className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl font-medium">
                  <option value="5+">5+ Yıl</option>
                  <option value="3+">3+ Yıl</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Liderlik Skoru</label>
                <select className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl font-medium">
                  <option value="80">≥ 80 Puan</option>
                  <option value="70">≥ 70 Puan</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sample Filtered Results Preview */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-4">
            <h3 className="font-bold text-sm text-[#0B2A4A]">Filtreye Uygun Örnek Adaylar ({roleFilter} - {cityFilter})</h3>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-sm text-[#0B2A4A]">Aday #8841</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Terfi Skoru: %88</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Mevcut: Mağaza Müdür Yardımcısı (6 Yıl) • {cityFilter} • Finans: %75, Operasyon: %88, KPI: %82
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1.5 bg-amber-500/20 text-amber-900 border border-amber-500/40 rounded-xl text-xs font-bold">
                  Yakında Açılacak
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
