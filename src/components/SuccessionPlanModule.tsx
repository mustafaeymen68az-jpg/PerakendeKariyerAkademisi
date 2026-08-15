'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  UserCheck, 
  AlertOctagon, 
  TrendingUp, 
  Building2, 
  MapPin, 
  CheckCircle2,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  Users,
  Award,
  Zap,
  Clock,
  ExternalLink,
  User
} from 'lucide-react';
import CandidateProfileModal from './CandidateProfileModal';
import { TalentCandidate } from '@/data/talentPoolData';

export interface SuccessionRole {
  id: string;
  roleName: string;
  location: string;
  currentManager: string;
  riskCategory: 'low' | 'medium' | 'high'; // low = çift/çok yedekli, medium = tek yedekli, high = yedeği yok
  riskLevelText: 'DÜŞÜK RİSK (ÇİFT YEDEKLİ)' | 'ORTA RİSK (TEK YEDEKLİ)' | 'YÜKSEK RİSK (YEDEĞİ YOK)';
  successorsCount: number;
  successors: {
    name: string;
    score: number;
    status: 'Terfiye Hazır' | 'Terfiye Yakın' | 'Gelişim Aşamasında';
  }[];
  actionPlan: string;
}

const SUCCESSION_DATA: SuccessionRole[] = [
  {
    id: '1',
    roleName: 'Mağaza Müdürü',
    location: 'İzmir Alsancak Mağazası',
    currentManager: 'Mehmet Yılmaz',
    riskCategory: 'low',
    riskLevelText: 'DÜŞÜK RİSK (ÇİFT YEDEKLİ)',
    successorsCount: 3,
    successors: [
      { name: 'Ahmet Kaya (Müdür Yrd.)', score: 88, status: 'Terfiye Hazır' },
      { name: 'Ayşe Demir (Müdür Yrd.)', score: 79, status: 'Terfiye Yakın' },
      { name: 'Burak Çetin (Baş Kasiyer)', score: 71, status: 'Gelişim Aşamasında' }
    ],
    actionPlan: 'Yedek aday Ahmet Kaya %88 puanla terfi sınavını geçmiş olup mağaza boşaldığı gün göreve başlamaya %100 hazırdır.'
  },
  {
    id: '2',
    roleName: 'Kasa Operasyon Şefi',
    location: 'İstanbul Kuleli Mağazası',
    currentManager: 'Selin Özer',
    riskCategory: 'low',
    riskLevelText: 'DÜŞÜK RİSK (ÇİFT YEDEKLİ)',
    successorsCount: 2,
    successors: [
      { name: 'Caner Şahin (Baş Kasiyer)', score: 92, status: 'Terfiye Hazır' },
      { name: 'Merve Öztürk (Kasiyer)', score: 85, status: 'Terfiye Hazır' }
    ],
    actionPlan: '2 adet onaylı yedek hazır tutulmakta olup, %92 puanlı Caner Şahin 1. yedek olarak atanmıştır.'
  },
  {
    id: '3',
    roleName: 'Reyon Şefi (Taze Gıda)',
    location: 'Ankara Kızılay Mağazası',
    currentManager: 'Zeynep Kaya',
    riskCategory: 'low',
    riskLevelText: 'DÜŞÜK RİSK (ÇİFT YEDEKLİ)',
    successorsCount: 2,
    successors: [
      { name: 'Emre Aksoy (Reyon Elemanı)', score: 90, status: 'Terfiye Hazır' },
      { name: 'Tarık Yıldız (Reyon Elemanı)', score: 82, status: 'Terfiye Yakın' }
    ],
    actionPlan: 'Emre Aksoy 5S ve FIFO reyon sertifikasını tamamlamış, 1. yedek olarak listelenmiştir.'
  },
  {
    id: '4',
    roleName: 'Bölge Müdürü',
    location: 'Marmara 1. Bölge (14 Mağaza)',
    currentManager: 'Hakan Arslan',
    riskCategory: 'medium',
    riskLevelText: 'ORTA RİSK (TEK YEDEKLİ)',
    successorsCount: 1,
    successors: [
      { name: 'Seda Öztürk (Kıdemli Mağaza Müdürü)', score: 81, status: 'Terfiye Hazır' }
    ],
    actionPlan: '1 adet yedek bulunuyor. Risk seviyesini düşürmek için 2. yedek aday olarak Murat Şahin eğitime alındı.'
  },
  {
    id: '5',
    roleName: 'Lojistik & Depo Müdürü',
    location: 'Bursa Lojistik Merkezi',
    currentManager: 'Ayşe Demir',
    riskCategory: 'medium',
    riskLevelText: 'ORTA RİSK (TEK YEDEKLİ)',
    successorsCount: 1,
    successors: [
      { name: 'Tarık Yıldız (Depo Şefi)', score: 80, status: 'Terfiye Hazır' }
    ],
    actionPlan: 'Tarık Yıldız WMS otomasyon sertifikasını aldı. 2. yedek adayın seçimi 30 gün içinde tamamlanacak.'
  },
  {
    id: '6',
    roleName: 'IT & Perakende Sistem Mimarı',
    location: 'Genel Merkez / Bilgi Teknolojileri',
    currentManager: 'Dr. Mehmet Yılmaz',
    riskCategory: 'high',
    riskLevelText: 'YÜKSEK RİSK (YEDEĞİ YOK)',
    successorsCount: 0,
    successors: [],
    actionPlan: '⚡ UYARI: Bu kritik pozisyonun hazır yedeği bulunmamaktadır! 90 günlük acil yetiştirme programı başlatılmış ve 2 kıdemli yazılımcı eğitime yönlendirilmiştir.'
  },
  {
    id: '7',
    roleName: 'Soğuk Zincir Kalite Şefi',
    location: 'Gebze Lojistik Merkezi Antrepo',
    currentManager: 'Mustafa Aydın',
    riskCategory: 'high',
    riskLevelText: 'YÜKSEK RİSK (YEDEĞİ YOK)',
    successorsCount: 0,
    successors: [],
    actionPlan: '⚡ KRİTİK RİSK: Antrepo kalite kontrolünde tek kişiye bağımlılık mevcuttur. 60 günlük hızlı sertifikasyon süreci aktif edilmiştir.'
  }
];

export default function SuccessionPlanModule() {
  const [riskFilter, setRiskFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [selectedRoleId, setSelectedRoleId] = useState<string>('1');

  // Candidate Profile Modal State
  const [modalCandidate, setModalCandidate] = useState<TalentCandidate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Filter roles dynamically based on clicked top risk summary card
  const filteredRoles = React.useMemo(() => {
    if (riskFilter === 'all') return SUCCESSION_DATA;
    return SUCCESSION_DATA.filter(r => r.riskCategory === riskFilter);
  }, [riskFilter]);

  const activeRole = React.useMemo(() => {
    return SUCCESSION_DATA.find(r => r.id === selectedRoleId) || filteredRoles[0] || SUCCESSION_DATA[0];
  }, [selectedRoleId, filteredRoles]);

  // Helper to open profile card modal
  const handleOpenCandidateModal = (rawName: string, targetRole: string, score: number) => {
    const cleanName = rawName.replace(/\(.*\)/, '').trim();
    
    const candidateData: TalentCandidate = {
      id: `succ_${cleanName.toLowerCase().replace(/\s+/g, '_')}`,
      name: cleanName,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400`,
      deptId: 'operasyon',
      departmentName: 'Mağaza Operasyonları & Saha Liderliği',
      targetPosition: targetRole,
      currentCompany: 'Perakende Kariyer Akademisi İç Terfi Havuzu',
      city: 'Türkiye (Perakende Saha)',
      experienceYears: 4,
      competencyScore: score,
      theoryExamScore: Math.min(100, score + 2),
      fieldAuditScore: score,
      leadershipScore: Math.max(70, score - 3),
      completedCourses: [
        {
          title: `${targetRole} Liderlik & Yetkinlik Modülü`,
          duration: '24 Saat',
          completedDate: '15 Mayıs 2026',
          grade: `%${score} (Üstün Başarı)`
        },
        {
          title: 'Zor Müşteri İkna ve Çatışma Yönetimi',
          duration: '16 Saat',
          completedDate: '10 Nisan 2026',
          grade: '%94 (Pek İyi)'
        },
        {
          title: 'Reyon Teşhir 5S & FIFO Standartları',
          duration: '18 Saat',
          completedDate: '02 Mart 2026',
          grade: '%90 (Başarılı)'
        }
      ],
      certificates: [
        {
          title: `${targetRole} Yetkinlik Pasaportu`,
          credentialId: `PKA-2026-SUCC-${score}`,
          issueDate: 'Mayıs 2026',
          badgeColor: 'emerald'
        }
      ],
      biography: `${cleanName}, şirket içi yedek yönetici yetiştirme havuzunda %${score} yetkinlik puanı alarak ${targetRole} kadrosu için 1. sırada onaylanmış terfi adayıdır.`
    };

    setModalCandidate(candidateData);
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 bg-[#0B2A4A] text-white relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#087F96]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#DDF4F7]">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Kritik Görev İş Sürekliliği & Risk Haritası</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Kritik Pozisyon Yedekleme Planı
          </h2>
          <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            Yedek yönetici adaylarının <strong>üzerine tıklayarak</strong> yetkinlik sınav puanlarını, eğitim geçmişini ve dijital yetkinlik pasaportunu detaylı inceleyebilirsiniz.
          </p>
        </div>

        {/* 4 INTERACTIVE CLICKABLE RISK SUMMARY CARDS (TIKLANDIĞINDA AKTİF OLUR VE FİLTRELER) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* CARD 0: TÜM POZİSYONLAR */}
          <div 
            onClick={() => setRiskFilter('all')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer text-center group ${
              riskFilter === 'all'
                ? 'bg-[#087F96] border-white ring-4 ring-[#087F96]/40 shadow-2xl scale-105'
                : 'bg-[#061B33] border-[#087F96]/40 hover:border-[#087F96] hover:scale-102'
            }`}
          >
            <div className="text-xs text-gray-300 font-bold uppercase tracking-wider">Yedekli Kritik Pozisyon Oranı</div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1">%78</div>
            <div className="text-[11px] text-gray-300 font-semibold mt-1 flex items-center justify-center space-x-1">
              <span>Tüm Pozisyonları Göster ({SUCCESSION_DATA.length})</span>
              <ChevronRight className="w-3.5 h-3.5 text-amber-300" />
            </div>
          </div>

          {/* CARD 1: ÇİFT / ÇOK YEDEĞİ OLAN (LOW RISK) */}
          <div 
            onClick={() => setRiskFilter('low')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer text-center group ${
              riskFilter === 'low'
                ? 'bg-emerald-950/80 border-emerald-400 ring-4 ring-emerald-500/40 shadow-2xl scale-105'
                : 'bg-[#061B33] border-emerald-500/30 hover:border-emerald-400 hover:scale-102'
            }`}
          >
            <div className="text-xs text-gray-300 font-bold uppercase tracking-wider">Çift/Çok Yedeği Olan</div>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">14 Pozisyon</div>
            <div className="text-[11px] text-emerald-400 font-mono font-extrabold mt-1 flex items-center justify-center space-x-1">
              <span>Düşük Risk Grubu ✓</span>
            </div>
          </div>

          {/* CARD 2: TEK YEDEĞİ OLAN (MEDIUM RISK) */}
          <div 
            onClick={() => setRiskFilter('medium')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer text-center group ${
              riskFilter === 'medium'
                ? 'bg-amber-950/80 border-amber-400 ring-4 ring-amber-500/40 shadow-2xl scale-105'
                : 'bg-[#061B33] border-amber-500/30 hover:border-amber-400 hover:scale-102'
            }`}
          >
            <div className="text-xs text-gray-300 font-bold uppercase tracking-wider">Tek Yedeği Olan</div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-1">5 Pozisyon</div>
            <div className="text-[11px] text-amber-300 font-mono font-extrabold mt-1 flex items-center justify-center space-x-1">
              <span>Takip Gerekli ⚠️</span>
            </div>
          </div>

          {/* CARD 3: YEDEĞİ OLMAYAN (HIGH RISK - CRITICAL) */}
          <div 
            onClick={() => setRiskFilter('high')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer text-center group ${
              riskFilter === 'high'
                ? 'bg-rose-950/90 border-rose-500 ring-4 ring-rose-500/40 shadow-2xl scale-105'
                : 'bg-[#061B33] border-rose-500/40 hover:border-rose-400 hover:scale-102'
            }`}
          >
            <div className="text-xs text-gray-300 font-bold uppercase tracking-wider">Yedeği Olmayan (Kritik Risk)</div>
            <div className="text-3xl sm:text-4xl font-black text-rose-400 mt-1">2 Pozisyon</div>
            <div className="text-[11px] text-rose-300 font-mono font-extrabold mt-1 flex items-center justify-center space-x-1">
              <span>Acil Gelişim Planı ⚡</span>
            </div>
          </div>

        </div>

        {/* Filter Info Bar */}
        <div className="flex items-center justify-between text-xs font-mono font-bold bg-[#061B33] p-4 rounded-xl border border-[#087F96]/30">
          <span>
            Filtre: <strong className="text-amber-300 uppercase">
              {riskFilter === 'all' ? 'Tüm Pozisyonlar' : riskFilter === 'low' ? 'Düşük Risk (Çift/Çok Yedekli)' : riskFilter === 'medium' ? 'Orta Risk (Tek Yedekli)' : 'Yüksek Risk (Yedeği Yok)'}
            </strong> ({filteredRoles.length} Pozisyon Listeleniyor)
          </span>

          <span className="text-emerald-400 flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Kişi Kartına Tıklayıp Detay İnceleyin</span>
          </span>
        </div>

        {/* Interactive Succession Demo Viewer */}
        <div className="bg-[#061B33]/90 rounded-3xl border border-[#087F96]/40 p-6 sm:p-8 backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shadow-2xl">
          
          {/* Left Column: Filtered Roles List */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-300 mb-2 flex items-center space-x-1.5">
              <Building2 className="w-4 h-4 text-[#087F96]" />
              <span>Kritik Pozisyon Seçin ({filteredRoles.length}):</span>
            </h4>

            {filteredRoles.map((role) => {
              const isSelected = activeRole.id === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-[#087F96] text-white border-white shadow-xl scale-[1.02]'
                      : 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-extrabold text-sm">{role.roleName}</h5>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      role.riskCategory === 'low' ? 'bg-emerald-500 text-white' :
                      role.riskCategory === 'medium' ? 'bg-amber-400 text-slate-950' : 'bg-rose-600 text-white'
                    }`}>
                      {role.riskCategory === 'low' ? 'Çift Yedekli' : role.riskCategory === 'medium' ? 'Tek Yedekli' : '⚡ Yedeği Yok'}
                    </span>
                  </div>

                  <div className="text-xs opacity-90 flex items-center justify-between">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-300" />
                      <span>{role.location}</span>
                    </span>
                    <span className="font-mono text-[10px] text-emerald-300 font-bold">
                      {role.successorsCount} Hazır Yedek
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Position Successor Pipeline & Action Plan */}
          <div className="lg:col-span-7 bg-white/5 p-6 rounded-2xl border border-white/10 space-y-6">
            
            {/* Header Info */}
            <div className="border-b border-white/10 pb-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full uppercase ${
                  activeRole.riskCategory === 'low' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                  activeRole.riskCategory === 'medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-rose-500/30 text-rose-300 border border-rose-500/50'
                }`}>
                  {activeRole.riskLevelText}
                </span>

                {/* CLICKABLE CURRENT MANAGER BADGE */}
                <div 
                  onClick={() => handleOpenCandidateModal(activeRole.currentManager, activeRole.roleName, 95)}
                  className="text-xs text-gray-300 font-mono cursor-pointer hover:text-amber-300 transition-colors flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-lg border border-white/15"
                >
                  <User className="w-3.5 h-3.5 text-amber-300" />
                  <span>Mevcut Yönetici: <strong className="text-white underline">{activeRole.currentManager}</strong> (Kartı Aç)</span>
                </div>
              </div>

              <h3 className="text-2xl font-black text-white">{activeRole.roleName}</h3>
              <p className="text-xs text-gray-300 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>{activeRole.location}</span>
              </p>
            </div>

            {/* Successor Candidates List (CLICKABLE TO OPEN CANDIDATE PROFILE MODAL) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-300 flex items-center space-x-1.5">
                  <UserCheck className="w-4 h-4" />
                  <span>Onaylı Yedek Yönetici Adayları ({activeRole.successors.length})</span>
                </h4>
                <span className="text-[10px] text-emerald-300 font-mono">Tıklayıp Kartı Açın 🔍</span>
              </div>

              {activeRole.successors.length > 0 ? (
                <div className="space-y-2.5">
                  {activeRole.successors.map((succ, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleOpenCandidateModal(succ.name, activeRole.roleName, succ.score)}
                      className="p-4 bg-white/10 hover:bg-white/20 border border-white/15 hover:border-emerald-400 rounded-2xl flex items-center justify-between gap-3 transition-all cursor-pointer group hover:scale-[1.01] shadow-md"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-xl bg-[#087F96] text-white flex items-center justify-center font-bold text-xs font-mono border border-white/20 group-hover:bg-emerald-600 transition-colors">
                          #{idx + 1}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors flex items-center space-x-1.5">
                            <span>{succ.name}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-amber-300 opacity-80 group-hover:opacity-100" />
                          </div>
                          <div className="text-[10px] text-emerald-300 font-mono font-bold mt-0.5">{succ.status}</div>
                        </div>
                      </div>

                      <div className="text-right font-mono flex items-center space-x-2">
                        <span className="px-2.5 py-1 bg-emerald-500 text-white rounded-lg text-xs font-black group-hover:bg-emerald-400 transition-colors">
                          {succ.score} Puan
                        </span>
                        
                        <a
                          href={`/ik-cozumlari/calisan-kariyer-planlamasi?name=${encodeURIComponent(succ.name.replace(/\(.*\)/, '').trim())}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1 bg-[#087F96] hover:bg-[#056B80] text-white rounded-lg text-[10px] font-bold transition-colors flex items-center space-x-1"
                        >
                          <span>Kariyer Planı ↗</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-rose-950/60 border border-rose-500/50 rounded-2xl text-center space-y-2">
                  <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto animate-bounce" />
                  <div className="font-bold text-sm text-rose-200">Bu Pozisyonda Henüz Hazır Yedek Bulunmamaktadır!</div>
                  <p className="text-xs text-gray-300 max-w-md mx-auto">
                    Kritik görev sürekliliği için 90 günlük acil iç terfi eğitimi ve yedek aday yetiştirme süreci başlatılmıştır.
                  </p>
                </div>
              )}
            </div>

            {/* Succession Action Plan Alert */}
            <div className="p-4 bg-[#087F96]/20 border border-[#087F96]/40 rounded-2xl text-xs space-y-1">
              <div className="font-bold text-amber-300 uppercase text-[10px] tracking-wider flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>İş Sürekliliği & Terfi Aksiyon Planı</span>
              </div>
              <p className="text-gray-200 leading-relaxed font-light">
                {activeRole.actionPlan}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* CANDIDATE PROFILE MODAL */}
      <CandidateProfileModal
        candidate={modalCandidate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
