'use client';

import React from 'react';
import { 
  AlertTriangle, 
  TrendingDown, 
  Users, 
  ShieldAlert, 
  Clock, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface AttritionCandidate {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  riskLevel: 'Düşük' | 'Orta' | 'Yüksek';
  riskScore: number; // 0-100
  tenureMonths: number;
  primarySignal: string;
}

const RISK_CANDIDATES: AttritionCandidate[] = [
  {
    id: 'tr_1',
    name: 'Kadir Öztürk',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    role: 'Reyon Satış Elemanı',
    department: 'Meyve Sebze Reyonu',
    riskLevel: 'Yüksek',
    riskScore: 84,
    tenureMonths: 28,
    primarySignal: '2 yıldır aynı pozisyonda terfi bekliyor, eğitim katılımı %40 düştü.'
  },
  {
    id: 'tr_2',
    name: 'Burcu Yılmaz',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    role: 'Kasiyer & Kasa Görevlisi',
    department: 'Kasa Operasyonları',
    riskLevel: 'Yüksek',
    riskScore: 79,
    tenureMonths: 19,
    primarySignal: 'Son 2 ayda 4 kez mazeretsiz devamsızlık ve motivasyon düşüşü kaydedildi.'
  },
  {
    id: 'tr_3',
    name: 'Oğuzhan Tekin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    role: 'Şarküteri Reyon Elemanı',
    department: 'Açık Şarküteri',
    riskLevel: 'Orta',
    riskScore: 61,
    tenureMonths: 14,
    primarySignal: 'Yönetici değerlendirmesinde müşteri memnuniyet puanında hafif gerileme.'
  },
  {
    id: 'tr_4',
    name: 'Seda Çelik',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    role: 'Mağaza Müdür Yardımcısı',
    department: 'Mağaza Yönetimi',
    riskLevel: 'Düşük',
    riskScore: 24,
    tenureMonths: 36,
    primarySignal: 'Yüksek bağlılık, aktif gelişim ve düzenli eğitim katılımı.'
  }
];

export default function TurnoverRiskModule() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 bg-rose-50 text-rose-900 px-3 py-1 rounded-full text-xs font-bold border border-rose-200">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>PKA TALENT — Çalışan Kaybetme Risk Analizi</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#0B2A4A] tracking-tight">
            Turnover Risk Analizi & Erken Uyarı Sinyalleri
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
            Devamsızlık, eğitim düşüşü ve terfi bekleme sürelerini yapay zekâ destekli kural motoruyla analiz edin; kritik çalışanları kaybetmeden önlem alın.
          </p>
        </div>

        <span className="px-4 py-2 bg-amber-100 text-amber-900 text-xs font-mono font-black rounded-2xl border border-amber-300 shadow-xs whitespace-nowrap">
          ⚠️ Örnek Risk Modeli (Tahmini Simülasyon)
        </span>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl space-y-1">
          <span className="text-[10px] font-mono font-black text-rose-900 uppercase">Yüksek Riskli Çalışan</span>
          <div className="text-2xl font-black text-rose-950">63 Çalışan</div>
          <span className="text-[10px] text-rose-700 font-bold block">Acil Müdahale & Görüşme Gerekli</span>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl space-y-1">
          <span className="text-[10px] font-mono font-black text-amber-900 uppercase">Orta Riskli Çalışan</span>
          <div className="text-2xl font-black text-amber-950">142 Çalışan</div>
          <span className="text-[10px] text-amber-700 font-bold block">Takip ve Gelişim Destegi</span>
        </div>

        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-1">
          <span className="text-[10px] font-mono font-black text-emerald-900 uppercase">Düşük Risk (Güvenli)</span>
          <div className="text-2xl font-black text-emerald-950">795 Çalışan</div>
          <span className="text-[10px] text-emerald-700 font-bold block">Yüksek Bağlılık Skoru</span>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-300 rounded-2xl space-y-1">
          <span className="text-[10px] font-mono font-black text-blue-900 uppercase">Ortalama Şirket Kıdemi</span>
          <div className="text-2xl font-black text-[#0B2A4A]">3.2 Yıl</div>
          <span className="text-[10px] text-blue-700 font-bold block">Kadro Bağlılık Ortalaması</span>
        </div>
      </div>

      {/* RISK SIGNALS & CANDIDATE LIST */}
      <div className="space-y-3 pt-2">
        <h4 className="font-extrabold text-sm text-[#0B2A4A] flex items-center space-x-2">
          <Activity className="w-4 h-4 text-rose-600" />
          <span>Risk Sinyalleri Tespit Edilen Öncelikli Çalışanlar</span>
        </h4>

        <div className="space-y-3">
          {RISK_CANDIDATES.map((cand) => (
            <div
              key={cand.id}
              className={`p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs transition-all ${
                cand.riskLevel === 'Yüksek'
                  ? 'bg-rose-50/60 border-rose-300 ring-2 ring-rose-200/50'
                  : cand.riskLevel === 'Orta'
                  ? 'bg-amber-50/60 border-amber-300'
                  : 'bg-emerald-50/60 border-emerald-300'
              }`}
            >
              <div className="flex items-center space-x-4">
                <img src={cand.avatar} alt={cand.name} className="w-12 h-12 rounded-xl object-cover border-2 border-gray-300 shrink-0" />
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-black text-sm text-[#0B2A4A]">{cand.name}</h5>
                    <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-md ${
                      cand.riskLevel === 'Yüksek'
                        ? 'bg-rose-600 text-white animate-pulse'
                        : cand.riskLevel === 'Orta'
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}>
                      {cand.riskLevel} Risk (%{cand.riskScore})
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 font-bold">{cand.role} • {cand.department}</p>
                  <p className="text-[11px] text-gray-600 italic pt-0.5">
                    <strong>Sinyal:</strong> "{cand.primarySignal}"
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 self-end sm:self-center shrink-0">
                <span className="text-[10px] font-mono font-bold text-gray-600 bg-white px-2.5 py-1 rounded-lg border border-gray-200">
                  Kıdem: {cand.tenureMonths} Ay
                </span>
                <button className="px-3.5 py-1.5 bg-[#0B2A4A] hover:bg-[#061B33] text-white text-xs font-bold rounded-xl shadow-xs transition-all">
                  Eylem Planı Başlat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
