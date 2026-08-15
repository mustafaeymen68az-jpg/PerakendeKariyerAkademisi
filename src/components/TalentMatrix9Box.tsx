'use client';

import React, { useState } from 'react';
import { 
  Grid, 
  User, 
  Sparkles, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  X,
  Target,
  ShieldCheck
} from 'lucide-react';

interface Employee9Box {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  performanceScore: number; // 0 - 100
  potentialScore: number; // 0 - 100
  promotionReadiness: number; // %
  performanceCategory: 'Düşük' | 'Orta' | 'Yüksek';
  potentialCategory: 'Düşük' | 'Orta' | 'Yüksek';
  boxTitle: string;
  managerComment: string;
}

const EMPLOYEES_DATA: Employee9Box[] = [
  {
    id: 'emp_1',
    name: 'Ahmet Çelik',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    role: 'Manav Reyon Görevlisi',
    department: 'Meyve Sebze Reyonu',
    performanceScore: 92,
    potentialScore: 95,
    promotionReadiness: 91,
    performanceCategory: 'Yüksek',
    potentialCategory: 'Yüksek',
    boxTitle: '👑 Geleceğin Lideri (Star Talent)',
    managerComment: 'Üstün ciro başarısı, 5S mükemmelliği ve yüksek liderlik vizyonu. Mağaza Müdürü adayı.'
  },
  {
    id: 'emp_2',
    name: 'Zeynep Kaya',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    role: 'Kasiyer & Kasa Görevlisi',
    department: 'Kasa Operasyonları',
    performanceScore: 88,
    potentialScore: 90,
    promotionReadiness: 86,
    performanceCategory: 'Yüksek',
    potentialCategory: 'Yüksek',
    boxTitle: '👑 Geleceğin Lideri (Star Talent)',
    managerComment: 'Sıfır kasa açığı, yüksek müşteri memnuniyeti. Kıdemli Kasiyer terfisine hazır.'
  },
  {
    id: 'emp_3',
    name: 'Mehmet Öztürk',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    role: 'Kasap Reyon Şefi',
    department: 'Kasap Reyonu',
    performanceScore: 94,
    potentialScore: 72,
    promotionReadiness: 84,
    performanceCategory: 'Yüksek',
    potentialCategory: 'Orta',
    boxTitle: '💎 Kritik Uzman (High Performer)',
    managerComment: 'Et fire oranında şampiyon, ancak idari liderlik yetkinlikleri geliştirilmeli.'
  },
  {
    id: 'emp_4',
    name: 'Selin Demir',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    role: 'Şarküteri Reyon Şefi',
    department: 'Açık Şarküteri',
    performanceScore: 74,
    potentialScore: 91,
    promotionReadiness: 78,
    performanceCategory: 'Orta',
    potentialCategory: 'Yüksek',
    boxTitle: '🚀 Geliştirilecek Yetenek (High Potential)',
    managerComment: 'Kolej mezunu, teorik yetkinliği yüksek, saha operasyon deneyimi artırılmalı.'
  },
  {
    id: 'emp_5',
    name: 'Burak Şahin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    role: 'Mağaza Müdür Yardımcısı',
    department: 'Mağaza Yönetimi',
    performanceScore: 78,
    potentialScore: 76,
    promotionReadiness: 75,
    performanceCategory: 'Orta',
    potentialCategory: 'Orta',
    boxTitle: '⚖️ Çekirdek Oyuncu (Core Performer)',
    managerComment: 'Dengeli ve istikrarlı performans. Rutin mağaza operasyonunu eksiksiz yönetiyor.'
  },
  {
    id: 'emp_6',
    name: 'Elif Arslan',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    role: 'Unlu Mamuller Reyon Görevlisi',
    department: 'Unlu Mamuller',
    performanceScore: 54,
    potentialScore: 88,
    promotionReadiness: 62,
    performanceCategory: 'Düşük',
    potentialCategory: 'Yüksek',
    boxTitle: '💡 Potansiyel Var / Performans Müdahalesi',
    managerComment: 'Analitik zekası çok yüksek ancak vardiya uyumsuzluğu nedeniyle ciro hedefi aksıyor.'
  },
  {
    id: 'emp_7',
    name: 'Caner Yılmaz',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    role: 'Depo & Lojistik Elemanı',
    department: 'Lojistik',
    performanceScore: 52,
    potentialScore: 48,
    promotionReadiness: 45,
    performanceCategory: 'Düşük',
    potentialCategory: 'Düşük',
    boxTitle: '⚠️ Performans Aksiyon Planı (Underperformer)',
    managerComment: 'Ürün kabul ve mal giriş hataları yüksek. 60 günlük sıkı gelişim planı başlatıldı.'
  }
];

// Matrix 9 Box Definitions (Y: Potential [Yüksek, Orta, Düşük], X: Performance [Düşük, Orta, Yüksek])
const BOX_DEFINITIONS = [
  { id: 'b31', y: 'Yüksek', x: 'Düşük', title: '💡 Potansiyel Var / Performans Müdahalesi', color: 'bg-amber-50 border-amber-300 text-amber-950' },
  { id: 'b32', y: 'Yüksek', x: 'Orta', title: '🚀 Geliştirilecek Yetenek', color: 'bg-blue-50 border-blue-300 text-blue-950' },
  { id: 'b33', y: 'Yüksek', x: 'Yüksek', title: '👑 Geleceğin Lideri (Star Talent)', color: 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400/40' },

  { id: 'b21', y: 'Orta', x: 'Düşük', title: '❓ Soru İşareti / Dilemma', color: 'bg-gray-50 border-gray-300 text-gray-800' },
  { id: 'b22', y: 'Orta', x: 'Orta', title: '⚖️ Çekirdek Oyuncu (Core)', color: 'bg-slate-50 border-slate-300 text-slate-900' },
  { id: 'b23', y: 'Orta', x: 'Yüksek', title: '💎 Kritik Uzman (High Performer)', color: 'bg-[#DDF4F7] border-[#087F96] text-[#0B2A4A]' },

  { id: 'b11', y: 'Düşük', x: 'Düşük', title: '⚠️ Performans Aksiyon Planı', color: 'bg-rose-50 border-rose-300 text-rose-950' },
  { id: 'b12', y: 'Düşük', x: 'Orta', title: '🛡️ Etkili Uygulayıcı (Effective)', color: 'bg-gray-50 border-gray-300 text-gray-800' },
  { id: 'b13', y: 'Düşük', x: 'Yüksek', title: '🎯 Yüksek Usta (Trusted Professional)', color: 'bg-[#087F96]/10 border-[#087F96]/40 text-[#0B2A4A]' }
];

export default function TalentMatrix9Box() {
  const [selectedEmp, setSelectedEmp] = useState<Employee9Box | null>(null);

  const getEmployeesForBox = (xCat: string, yCat: string) => {
    return EMPLOYEES_DATA.filter((e) => e.performanceCategory === xCat && e.potentialCategory === yCat);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-900 px-3 py-1 rounded-full text-xs font-bold border border-indigo-200">
            <Grid className="w-4 h-4 text-indigo-600" />
            <span>PKA TALENT — Yetenek Değerlendirme & Matris</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#0B2A4A] tracking-tight">
            9 Box Talent Matrix (Performans vs Potansiyel)
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
            Çalışanların sürdürülebilir saha performansları ile gelecek potansiyellerini 9 kutulu stratejik matriste değerlendirin.
          </p>
        </div>

        <span className="px-4 py-2 bg-emerald-100 text-emerald-900 text-xs font-mono font-black rounded-2xl border border-emerald-300 shadow-xs whitespace-nowrap">
          👑 9 Box Yönetim Matrisi
        </span>
      </div>

      {/* MATRIX GRID WITH Y-AXIS AND X-AXIS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-500 px-2">
          <span>⬆️ DİKEY EKSEN: POTANSİYEL (Düşük ➔ Yüksek)</span>
          <span>➡️ YATAY EKSEN: PERFORMANS (Düşük ➔ Yüksek)</span>
        </div>

        {/* 9 Box Layout (3x3 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {BOX_DEFINITIONS.map((box) => {
            const emps = getEmployeesForBox(box.x, box.y);
            return (
              <div
                key={box.id}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-3 min-h-[160px] ${box.color}`}
              >
                <div>
                  <h4 className="font-extrabold text-xs tracking-tight">{box.title}</h4>
                  <span className="text-[9.5px] font-mono opacity-75 font-semibold">
                    Performans: {box.x} • Potansiyel: {box.y}
                  </span>
                </div>

                {/* Candidate Badges inside Box */}
                <div className="space-y-1.5 pt-1">
                  {emps.length === 0 ? (
                    <span className="text-[10px] text-gray-400 italic block">Kayıtlı Çalışan Yok</span>
                  ) : (
                    emps.map((e) => (
                      <button
                        key={e.id}
                        onClick={() => setSelectedEmp(e)}
                        className="w-full bg-white/90 hover:bg-white p-2 rounded-xl border border-black/10 shadow-2xs flex items-center justify-between transition-all hover:scale-[1.02] text-left"
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <img src={e.avatar} alt={e.name} className="w-7 h-7 rounded-lg object-cover border border-gray-300 shrink-0" />
                          <div className="truncate">
                            <h5 className="font-black text-xs text-[#0B2A4A] truncate">{e.name}</h5>
                            <p className="text-[9px] text-gray-600 truncate">{e.role}</p>
                          </div>
                        </div>

                        <span className="text-[9px] font-mono font-black bg-emerald-600 text-white px-2 py-0.5 rounded-md shrink-0">
                          %{e.promotionReadiness}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* POPUP CANDIDATE MODAL */}
      {selectedEmp && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 border-2 border-[#087F96] shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedEmp(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4 border-b border-gray-100 pb-4">
              <img src={selectedEmp.avatar} alt={selectedEmp.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-md" />
              <div>
                <span className="text-[10px] font-mono font-black text-[#087F96] uppercase tracking-wider block">
                  {selectedEmp.boxTitle}
                </span>
                <h4 className="font-black text-xl text-[#0B2A4A]">{selectedEmp.name}</h4>
                <p className="text-xs text-gray-600 font-bold">{selectedEmp.role} • {selectedEmp.department}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200">
                <span className="text-[9px] font-mono font-bold text-blue-800 uppercase block">Performans</span>
                <span className="text-lg font-black text-[#0B2A4A]">% {selectedEmp.performanceScore}</span>
              </div>

              <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200">
                <span className="text-[9px] font-mono font-bold text-indigo-800 uppercase block">Potansiyel</span>
                <span className="text-lg font-black text-indigo-950">% {selectedEmp.potentialScore}</span>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span className="text-[9px] font-mono font-bold text-emerald-800 uppercase block">Terfi Hazırlığı</span>
                <span className="text-lg font-black text-emerald-900">% {selectedEmp.promotionReadiness}</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-gray-500 uppercase block">Yönetici & İK Değerlendirme Notu</span>
              <p className="text-xs text-gray-800 italic font-medium leading-relaxed">
                "{selectedEmp.managerComment}"
              </p>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setSelectedEmp(null)}
                className="px-5 py-2.5 bg-[#0B2A4A] text-white text-xs font-extrabold rounded-xl hover:bg-[#061B33] transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
