'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  ChevronRight,
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';

interface TalentCandidate {
  id: string;
  name: string;
  location: string;
  currentRole: string;
  targetRole: string;
  promotionScore: number;
  competencyScore: number;
  kpiScore: number;
  missingSkill: string;
  recommendedCourse: string;
  readinessStatus: 'Terfiye Hazır' | 'Terfiye Yakın' | 'Gelişim Gerekli';
}

const TALENT_LIST: TalentCandidate[] = [
  {
    id: '1',
    name: 'Mehmet Yılmaz',
    location: 'İstanbul / Kadıköy',
    currentRole: 'Mağaza Müdür Yardımcısı',
    targetRole: 'Mağaza Müdürü',
    promotionScore: 88,
    competencyScore: 86,
    kpiScore: 91,
    missingSkill: 'P&L ve Finansal Bütçe Yönetimi',
    recommendedCourse: 'Mağaza Müdürü Finans ve Bütçe Eğitimi',
    readinessStatus: 'Terfiye Hazır'
  },
  {
    id: '2',
    name: 'Ayşe Demir',
    location: 'İzmir / Bornova',
    currentRole: 'Mağaza Müdürü',
    targetRole: 'Bölge Müdürü',
    promotionScore: 82,
    competencyScore: 84,
    kpiScore: 85,
    missingSkill: 'Çoklu Mağaza Liderliği ve Denetim',
    recommendedCourse: 'Bölge Müdürlüğü Liderlik Programı',
    readinessStatus: 'Terfiye Hazır'
  },
  {
    id: '3',
    name: 'Burak Çetin',
    location: 'Ankara / Çankaya',
    currentRole: 'Kategori Uzmanı',
    targetRole: 'Kategori Yöneticisi',
    promotionScore: 79,
    competencyScore: 78,
    kpiScore: 82,
    missingSkill: 'Tedarikçi Pazarlık ve Kontrat Yönetimi',
    recommendedCourse: 'Stratejik Satın Alma ve Kategori Yönetimi',
    readinessStatus: 'Terfiye Yakın'
  },
  {
    id: '4',
    name: 'Selin Aksoy',
    location: 'Bursa / Nilüfer',
    currentRole: 'Reyon Şefi',
    targetRole: 'Mağaza Müdür Yardımcısı',
    promotionScore: 75,
    competencyScore: 74,
    kpiScore: 78,
    missingSkill: 'Stok ve Envanter Yönetimi',
    recommendedCourse: 'Mağazacılık Operasyon ve Stok Eğitimi',
    readinessStatus: 'Terfiye Yakın'
  },
  {
    id: '5',
    name: 'Emre Öztürk',
    location: 'Antalya / Muratpaşa',
    currentRole: 'Kasiyer Şefi',
    targetRole: 'Müdür Yardımcısı',
    promotionScore: 68,
    competencyScore: 66,
    kpiScore: 72,
    missingSkill: 'Müşteri Şikayet Yönetimi ve İletişim',
    recommendedCourse: 'Müşteri Deneyimi ve Kriz Yönetimi',
    readinessStatus: 'Gelişim Gerekli'
  }
];

export default function TalentPoolModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');

  const filteredTalent = TALENT_LIST.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.currentRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.targetRole.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'ALL' || item.targetRole.includes(filterRole);
    return matchesSearch && matchesRole;
  });

  return (
    <section className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#087F96]/10 border border-[#087F96]/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#087F96] mb-3">
              <Users className="h-4 w-4" />
              <span>Kurumsal Yetenek Havuzu Yönetimi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2A4A] tracking-tight">
              Yetenek Havuzu ve Terfi Pipeline'ı
            </h2>
            <p className="mt-2 text-base text-gray-600 max-w-2xl">
              Geleceğin yöneticilerini şimdiden tespit edin, eksik yetkinliklerini görün ve doğrudan hedefe yönelik gelişim programları atayın.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold">
              <ShieldCheck className="h-4 w-4 mr-1 text-emerald-600" />
              Yedekleme Oranı: %72
            </span>
          </div>
        </div>

        {/* Top 5 KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-[#0B2A4A] text-white p-4 rounded-xl shadow-md border border-[#087F96]/30">
            <div className="text-[11px] text-gray-300 font-semibold uppercase tracking-wider">Mağaza Müdürü Adayları</div>
            <div className="text-3xl font-black text-[#DDF4F7] mt-1">18</div>
            <div className="text-[10px] text-emerald-400 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> %80+ Hazır: 11 Aday
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Bölge Müdürü Adayları</div>
            <div className="text-3xl font-black text-[#0B2A4A] mt-1">4</div>
            <div className="text-[10px] text-gray-500 mt-1">Kritik Yedek Pozisyon</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Kategori Yöneticisi Adayları</div>
            <div className="text-3xl font-black text-[#0B2A4A] mt-1">7</div>
            <div className="text-[10px] text-blue-600 font-semibold mt-1">Ticari Pipeline</div>
          </div>

          <div className="bg-[#087F96] text-white p-4 rounded-xl shadow-md">
            <div className="text-[11px] text-blue-100 font-semibold uppercase tracking-wider">Yüksek Potansiyelli Çalışanlar</div>
            <div className="text-3xl font-black text-white mt-1">31</div>
            <div className="text-[10px] text-white/90 mt-1">HiPo Yetenek Havuzu</div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
            <div className="text-[11px] text-emerald-800 font-semibold uppercase tracking-wider">Yedekli Kritik Pozisyon</div>
            <div className="text-3xl font-black text-emerald-700 mt-1">%72</div>
            <div className="text-[10px] text-emerald-600 mt-1">Sistem Genelinde</div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Aday adı veya pozisyon ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0B2A4A] focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-xs font-semibold text-gray-600">Hedef Pozisyon:</span>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="bg-white border border-gray-300 text-xs rounded-lg p-2 font-medium focus:ring-2 focus:ring-[#0B2A4A] focus:outline-none"
            >
              <option value="ALL">Tüm Hedef Pozisyonlar</option>
              <option value="Mağaza Müdürü">Mağaza Müdürü</option>
              <option value="Bölge Müdürü">Bölge Müdürü</option>
              <option value="Kategori Yöneticisi">Kategori Yöneticisi</option>
              <option value="Müdür Yardımcısı">Müdür Yardımcısı</option>
            </select>
          </div>
        </div>

        {/* Talent Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-left text-xs">
            <thead className="bg-[#0B2A4A] text-white">
              <tr>
                <th className="py-3.5 px-4 font-bold">Çalışan & Lokasyon</th>
                <th className="py-3.5 px-4 font-bold">Mevcut → Hedef Pozisyon</th>
                <th className="py-3.5 px-4 font-bold text-center">Terfi Skoru</th>
                <th className="py-3.5 px-4 font-bold text-center">Yetkinlik / KPI</th>
                <th className="py-3.5 px-4 font-bold">Eksik Yetkinlik</th>
                <th className="py-3.5 px-4 font-bold">Önerilen Eğitim</th>
                <th className="py-3.5 px-4 font-bold text-right">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTalent.map((item) => {
                const isReady = item.readinessStatus === 'Terfiye Hazır';
                const isNear = item.readinessStatus === 'Terfiye Yakın';
                return (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#0B2A4A] text-sm">{item.name}</div>
                      <div className="text-[11px] text-gray-500">{item.location}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-600 font-medium">{item.currentRole}</div>
                      <div className="text-[#087F96] font-bold text-[11px]">→ {item.targetRole}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-black ${
                        isReady ? 'bg-emerald-100 text-emerald-800' : isNear ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        %{item.promotionScore}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="text-[11px] font-semibold text-gray-700">Yetkinlik: %{item.competencyScore}</div>
                      <div className="text-[11px] font-semibold text-emerald-700">KPI: %{item.kpiScore}</div>
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <span className="inline-flex items-center text-[11px] text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                        <AlertTriangle className="h-3 w-3 mr-1 text-amber-600 flex-shrink-0" />
                        {item.missingSkill}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-[11px] text-gray-700 font-medium flex items-center">
                        <BookOpen className="h-3.5 w-3.5 text-[#087F96] mr-1 flex-shrink-0" />
                        {item.recommendedCourse}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`inline-block px-3 py-1 rounded-lg text-[11px] font-extrabold uppercase ${
                        isReady ? 'bg-emerald-600 text-white' : isNear ? 'bg-blue-600 text-white' : 'bg-amber-600 text-white'
                      }`}>
                        {item.readinessStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
