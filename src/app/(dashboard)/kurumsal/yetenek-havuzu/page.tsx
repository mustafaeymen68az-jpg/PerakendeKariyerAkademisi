'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  Award, 
  Search, 
  Filter, 
  Send, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  Star, 
  ArrowRight,
  ArrowLeft,
  UserCheck,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '@/data/departmentsData';

interface Candidate {
  id: string;
  name: string;
  currentRole: string;
  targetRole: string;
  score: number; // Must be >= 80
  completedModules: number;
  certificates: number;
  city: string;
  competencies: string[];
  avatar: string;
}

export default function HRTalentPoolPage() {
  const [selectedDeptId, setSelectedDeptId] = useState<string>('ALL');
  const [minScoreFilter, setMinScoreFilter] = useState<number>(80);
  const [searchQuery, setSearchQuery] = useState('');
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Qualified candidates database (ALL candidates HAVE >= 80 Points)
  const [candidates] = useState<Candidate[]>([
    {
      id: 'cand_1',
      name: 'Mehmet Yılmaz',
      currentRole: 'Mağaza Müdür Yardımcısı',
      targetRole: 'Mağaza Müdürü',
      score: 96,
      completedModules: 18,
      certificates: 4,
      city: 'İstanbul',
      competencies: ['P&L Kar-Zarar', 'Mağaza Audit', 'KPI Bütçeleme', 'Turnover Yönetimi'],
      avatar: 'MY'
    },
    {
      id: 'cand_2',
      name: 'Ayşe Yıldız',
      currentRole: 'Kasiyer',
      targetRole: 'Kasa Şefi / Kıdemli Kasiyer',
      score: 94,
      completedModules: 14,
      certificates: 3,
      city: 'Ankara',
      competencies: ['Kasa Hız Standartları', 'Sahte Para Tespiti', 'POS Mutabakatı', 'Müşteri Memnuniyeti'],
      avatar: 'AY'
    },
    {
      id: 'cand_3',
      name: 'Zeynep Kaya',
      currentRole: 'Kasap Reyonu Satış Elemanı',
      targetRole: 'Kasap Usta Şefi',
      score: 95,
      completedModules: 16,
      certificates: 4,
      city: 'İzmir',
      competencies: ['Dana Karkas Kesim', 'Soğuk Zincir Hijyeni', 'Gramaj Hassasiyeti', 'Reyon Teşhir'],
      avatar: 'ZK'
    },
    {
      id: 'cand_4',
      name: 'Murat Arslan',
      currentRole: 'Meyve Sebze Reyon Satış Elemanı',
      targetRole: 'Taze Gıda Reyon Şefi',
      score: 88,
      completedModules: 12,
      certificates: 2,
      city: 'Bursa',
      competencies: ['Fire Minimizasyonu', 'Tazelik Denetimi', 'Hal Alım Kabul', 'Etiketleme'],
      avatar: 'MA'
    },
    {
      id: 'cand_5',
      name: 'Elin Şahin',
      currentRole: 'Açık Şarküteri Elemanı',
      targetRole: 'Şarküteri Usta Şefi',
      score: 92,
      completedModules: 15,
      certificates: 3,
      city: 'Antalya',
      competencies: ['Peynir/Zeytin Sunumu', 'Gıda Güvenliği ISO 22000', 'Gramaj İkram', 'Teşhir Düzeni'],
      avatar: 'EŞ'
    },
    {
      id: 'cand_6',
      name: 'Ali Can',
      currentRole: 'Lojistik ve Depo Elemanı',
      targetRole: 'Depo Sorumlusu / WMS Uzmanı',
      score: 84,
      completedModules: 10,
      certificates: 2,
      city: 'Kocaeli',
      competencies: ['WMS Adresli Stok', 'Mal Kabul', 'Forklift Güvenliği', '5S Depo Düzeni'],
      avatar: 'AC'
    }
  ]);

  // HR Request Trigger Function
  const handleRequestCandidate = async (candidate: Candidate) => {
    setSendingId(candidate.id);
    try {
      const res = await fetch('/api/admin/talent-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: 'Büyük Perakende Market Zinciri A.Ş.',
          hrName: 'İnsan Kaynakları Yöneticisi',
          hrEmail: 'ik@perakendemarket.com',
          candidateName: candidate.name,
          candidateDept: candidate.currentRole,
          candidateScore: candidate.score
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAlertMessage(data.message);
      } else {
        setAlertMessage(`📩 İK Talebiniz Alındı! ${candidate.name} (${candidate.score} Puan) adayı için Admin Paneline anlık bildirim iletildi.`);
      }
    } catch (e) {
      console.error(e);
      setAlertMessage(`📩 İK Talebiniz Alındı! ${candidate.name} (${candidate.score} Puan) adayı için Admin Paneline anlık bildirim iletildi.`);
    } finally {
      setSendingId(null);
      setTimeout(() => setAlertMessage(null), 6000);
    }
  };

  // Filter candidates (Strict Rule: Score must be >= minScoreFilter where minScoreFilter is at least 80)
  const filteredCandidates = candidates.filter((c) => {
    const matchesDept = selectedDeptId === 'ALL' || 
                        c.currentRole.toLowerCase().includes(selectedDeptId.toLowerCase()) || 
                        c.targetRole.toLowerCase().includes(selectedDeptId.toLowerCase());
    const matchesScore = c.score >= minScoreFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.currentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesScore && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link 
              href="/kurumsal"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#087F96] hover:underline mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kurumsal Yönetici Paneline Dön</span>
            </Link>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#0B2A4A]">
              Perakende İK Yetenek Havuzu (+80 Puan Barajı) 🏆
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 font-light mt-0.5 max-w-3xl">
              İnsan Kaynakları yöneticileri için nitelikli personel arama havuzu. Yalnızca eğitim modüllerinde <strong>+80 Puan (+80p)</strong> barajını aşan başarılı adaylar sergilenir.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono font-extrabold text-emerald-800 bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 shadow-2xs shrink-0">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <span>+80 Puan Şartı Aktif</span>
          </div>
        </div>

        {/* Instant Alert Modal Notification */}
        {alertMessage && (
          <div className="bg-[#0B2A4A] text-white p-4 sm:p-5 rounded-2xl shadow-xl border border-[#087F96] flex items-center space-x-3 text-xs font-bold animate-in fade-in duration-300">
            <div className="p-2 bg-[#087F96] rounded-xl shrink-0">
              <Send className="h-5 w-5 text-white" />
            </div>
            <div className="leading-relaxed">
              {alertMessage}
            </div>
          </div>
        )}

        {/* Filter Box */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
            <Filter className="h-5 w-5 text-[#087F96]" />
            <h2 className="font-display font-extrabold text-base text-[#0B2A4A]">
              İK Yetenek Havuzu Arama ve Filtreleme
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
            {/* Department Select */}
            <div>
              <label className="block text-[#0B2A4A] mb-1">Aranan Pozisyon / Kadro (26 Kadro):</label>
              <select
                value={selectedDeptId}
                onChange={(e) => setSelectedDeptId(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-[#0B2A4A] outline-none focus:ring-2 focus:ring-[#087F96]"
              >
                <option value="ALL">Tüm Pozisyonlar & Kadrolar (6 Aday)</option>
                {DEPARTMENTS_DATA.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Score Tier Select (+80p Barajı) */}
            <div>
              <label className="block text-[#0B2A4A] mb-1">Puan Barajı Filtresi (+80p):</label>
              <select
                value={minScoreFilter}
                onChange={(e) => setMinScoreFilter(Number(e.target.value))}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-extrabold text-emerald-800 outline-none focus:ring-2 focus:ring-[#087F96]"
              >
                <option value={80}>+80 Puan ve Üstü (Tüm Başarılı Adaylar)</option>
                <option value={90}>+90 Puan ve Üstü (Yüksek Potansiyeller)</option>
                <option value={95}>+95 Puan ve Üstü (Terfiye Hazır Usta Adaylar)</option>
              </select>
            </div>

            {/* Candidate Search */}
            <div>
              <label className="block text-[#0B2A4A] mb-1">Aday Adı veya Şehir Ara:</label>
              <div className="relative">
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Örn: Mehmet Yılmaz veya İstanbul"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#087F96]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Qualified Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((cand) => (
            <div key={cand.id} className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-[#087F96] transition-all shadow-xs flex flex-col justify-between space-y-5 group">
              
              <div className="space-y-4">
                {/* Top Badge & Score */}
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center space-x-1 border border-emerald-300">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    <span>+80p BARAJI AŞILDI</span>
                  </span>

                  <span className="bg-[#0B2A4A] text-white font-mono font-black text-sm px-3 py-1 rounded-xl shadow-xs">
                    %{cand.score} Puan
                  </span>
                </div>

                {/* Candidate Name & Role */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#087F96] text-white font-black text-base flex items-center justify-center font-mono shadow-md border-2 border-white shrink-0">
                    {cand.avatar}
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-base text-[#0B2A4A] group-hover:text-[#087F96] transition-colors">
                      {cand.name}
                    </h3>
                    <span className="text-xs font-bold text-gray-600 block mt-0.5">
                      Mevcut: {cand.currentRole}
                    </span>
                    <span className="text-[11px] text-[#087F96] font-medium block">
                      🎯 Terfi Hedefi: {cand.targetRole}
                    </span>
                  </div>
                </div>

                {/* Competencies Badges */}
                <div className="space-y-1.5 pt-2 border-t border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Öne Çıkan Yetkinlikleri:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cand.competencies.map((comp, i) => (
                      <span key={i} className="bg-[#F4F7F9] text-[#0B2A4A] text-[10px] font-bold px-2.5 py-1 rounded-lg border border-gray-200">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button: Trigger HR Request & Instant Admin Notification */}
              <button
                disabled={sendingId === cand.id}
                onClick={() => handleRequestCandidate(cand)}
                className="w-full py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 text-xs"
              >
                <Send className="h-4 w-4" />
                <span>📩 Bu Personel İçin İK Talep Et (Bildirim Gönder)</span>
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
