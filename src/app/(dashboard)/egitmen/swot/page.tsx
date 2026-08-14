'use client';

import React, { useState } from 'react';
import { 
  Target, 
  ShieldAlert, 
  TrendingUp, 
  AlertTriangle, 
  Save, 
  UserCheck, 
  Building2, 
  CheckCircle2, 
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '@/data/departmentsData';

interface SwotRecord {
  id: string;
  studentName: string;
  deptName: string;
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
  createdAt: string;
}

export default function SwotAnalizPage() {
  const [studentName, setStudentName] = useState('Mehmet Yılmaz');
  const [selectedDeptId, setSelectedDeptId] = useState(DEPARTMENTS_DATA[0].id);

  // SWOT Inputs
  const [strengths, setStrengths] = useState('P&L Kar-Zarar hesaplamalarında son derece hızlı ve doğru formül kuruyor. Saha ekibi üzerinde güçlü liderlik etkisine sahip.');
  const [weaknesses, setWeaknesses] = useState('Yoğun kampanya günlerinde dijital stok sayım ekranında veri girişini erteleyebiliyor.');
  const [opportunities, setOpportunities] = useState('Bölge Müdürlüğü / Kıdemli Mağaza Yöneticiliği terfi sürecine en yakın adaylardan biri.');
  const [threats, setThreats] = useState('Hızlı mağaza büyüme dönemlerinde zaman yönetimini doğru kurgulayamazsa aşırı yorulabilir.');

  // Records List
  const [records, setRecords] = useState<SwotRecord[]>([
    {
      id: 'swot_1',
      studentName: 'Mehmet Yılmaz',
      deptName: 'Mağaza Müdürleri',
      strengths: 'P&L Kar-Zarar hesaplamalarında son derece hızlı. Ekip koçluğunda başarılı.',
      weaknesses: 'Yoğun kampanya günlerinde dijital stok sayımında erteleme yapabiliyor.',
      opportunities: 'Bölge Müdürü aday adayı.',
      threats: 'Aşırı iş yükünde zaman yönetimi riski.',
      createdAt: '2026-08-14'
    },
    {
      id: 'swot_2',
      studentName: 'Zeynep Kaya',
      deptName: 'Kasap Reyonu Satış Elemanı',
      strengths: 'Karkas et parçalama hızı mükemmel. Hijyen kurallarına tam uyuyor.',
      weaknesses: 'Müşteri ikram iletişiminde biraz çekingen davranıyor.',
      opportunities: 'Reyon Şefliği pozisyonuna terfi adaylığı.',
      threats: 'Bıçak bileme bakım periyotlarında aksama riski.',
      createdAt: '2026-08-13'
    }
  ]);

  const activeDept = DEPARTMENTS_DATA.find((d) => d.id === selectedDeptId) || DEPARTMENTS_DATA[0];

  const handleSaveSwot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName) return;

    const newRecord: SwotRecord = {
      id: `swot_${Date.now()}`,
      studentName,
      deptName: activeDept.name,
      strengths,
      weaknesses,
      opportunities,
      threats,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setRecords([newRecord, ...records]);
    alert(`${studentName} isimli öğrencinin SWOT Analizi başarıyla kaydedildi!`);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full w-fit mb-1">
            <Target className="h-3.5 w-3.5" />
            <span>Öğrenci Gelişim & Kariyer SWOT Analiz Motoru</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#0B2A4A]">
            Öğrenci SWOT Analizi Hazırlama
          </h2>
          <p className="text-xs text-gray-500 font-light mt-0.5">
            Öğrencilerin Güçlü Yönlerini (S), Zayıf Yönlerini (W), Fırsatlarını (O) ve Tehditlerini (T) analiz edin.
          </p>
        </div>
      </div>

      <form onSubmit={handleSaveSwot} className="space-y-6">
        {/* Student & Department Selection Header Box */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
          <div>
            <label className="block text-[#0B2A4A] mb-1">Değerlendirilecek Öğrenci Adı Soyadı:</label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Örn: Mehmet Yılmaz"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
            />
          </div>

          <div>
            <label className="block text-[#0B2A4A] mb-1">Öğrencinin Kadrosu / Departmanı (26 Kadro):</label>
            <select
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none font-bold"
            >
              {DEPARTMENTS_DATA.map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({d.category})</option>
              ))}
            </select>
          </div>
        </div>

        {/* 4-Quadrant SWOT Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. STRENGTHS (Güçlü Yönler) */}
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center space-x-2 text-emerald-800">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              <h3 className="font-display font-extrabold text-base">
                1. GÜÇLÜ YÖNLER (Strengths)
              </h3>
            </div>
            <p className="text-[11px] text-emerald-700 font-light">
              Öğrencinin sahada ve sınavlarda öne çıkan en güçlü yetkinlikleri.
            </p>
            <textarea
              rows={4}
              required
              value={strengths}
              onChange={(e) => setStrengths(e.target.value)}
              placeholder="Örn: P&L marj analizi çok yüksek, iletişim yeteneği güçlü..."
              className="w-full p-3 bg-white border border-emerald-300 rounded-xl text-xs text-gray-800 outline-none focus:ring-2 focus:ring-emerald-500 resize-none font-medium"
            />
          </div>

          {/* 2. WEAKNESSES (Zayıf Yönler) */}
          <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center space-x-2 text-amber-800">
              <ShieldAlert className="h-5 w-5 text-amber-600" />
              <h3 className="font-display font-extrabold text-base">
                2. ZAYIF YÖNLER (Weaknesses)
              </h3>
            </div>
            <p className="text-[11px] text-amber-700 font-light">
              Geliştirilmesi gereken ve takibi icap eden eksik alanlar.
            </p>
            <textarea
              rows={4}
              required
              value={weaknesses}
              onChange={(e) => setWeaknesses(e.target.value)}
              placeholder="Örn: Stok sayımında zamanlama aksaması, heyecan yönetimi..."
              className="w-full p-3 bg-white border border-amber-300 rounded-xl text-xs text-gray-800 outline-none focus:ring-2 focus:ring-amber-500 resize-none font-medium"
            />
          </div>

          {/* 3. OPPORTUNITIES (Fırsatlar) */}
          <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center space-x-2 text-blue-800">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h3 className="font-display font-extrabold text-base">
                3. FIRSATLAR (Opportunities)
              </h3>
            </div>
            <p className="text-[11px] text-blue-700 font-light">
              Öğrenci için terfi, yetkinlik artırma ve kariyer sıçraması fırsatları.
            </p>
            <textarea
              rows={4}
              required
              value={opportunities}
              onChange={(e) => setOpportunities(e.target.value)}
              placeholder="Örn: Bölge Müdürlüğü veya Reyon Şefliği adaylığı..."
              className="w-full p-3 bg-white border border-blue-300 rounded-xl text-xs text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 resize-none font-medium"
            />
          </div>

          {/* 4. THREATS (Tehditler) */}
          <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center space-x-2 text-rose-800">
              <AlertTriangle className="h-5 w-5 text-rose-600" />
              <h3 className="font-display font-extrabold text-base">
                4. TEHDİTLER (Threats)
              </h3>
            </div>
            <p className="text-[11px] text-rose-700 font-light">
              Gelişimi engelleyebilecek dışsal veya motivasyonel risk faktörleri.
            </p>
            <textarea
              rows={4}
              required
              value={threats}
              onChange={(e) => setThreats(e.target.value)}
              placeholder="Örn: Aşırı iş yükü altında tükenmişlik riski..."
              className="w-full p-3 bg-white border border-rose-300 rounded-xl text-xs text-gray-800 outline-none focus:ring-2 focus:ring-rose-500 resize-none font-medium"
            />
          </div>

        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 text-sm"
        >
          <Save className="h-5 w-5" />
          <span>SWOT Analizini Kaydet ve Öğrenci Dosyasına İşle</span>
        </button>
      </form>

      {/* Previously Saved SWOT Records */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
        <h3 className="font-display font-bold text-lg text-[#0B2A4A] border-b border-gray-100 pb-3">
          Geçmiş SWOT Analizi Kayıtları ({records.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {records.map((rec) => (
            <div key={rec.id} className="bg-[#F8FAFC] p-4 rounded-xl border border-gray-200 space-y-2">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <strong className="font-display font-bold text-sm text-[#0B2A4A]">{rec.studentName}</strong>
                <span className="text-[10px] font-bold text-[#087F96] bg-[#DDF4F7] px-2 py-0.5 rounded-full">
                  {rec.deptName}
                </span>
              </div>

              <div className="space-y-1 text-gray-700 text-[11px] font-light">
                <p><strong className="text-emerald-700 font-bold">Güçlü Yönler:</strong> {rec.strengths}</p>
                <p><strong className="text-amber-700 font-bold">Zayıf Yönler:</strong> {rec.weaknesses}</p>
                <p><strong className="text-blue-700 font-bold">Fırsatlar:</strong> {rec.opportunities}</p>
                <p><strong className="text-rose-700 font-bold">Tehditler:</strong> {rec.threats}</p>
              </div>

              <span className="block text-[10px] font-mono text-gray-400 pt-2 border-t border-gray-200">
                Değerlendirme Tarihi: {rec.createdAt}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
