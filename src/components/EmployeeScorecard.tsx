'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Calendar, 
  TrendingUp, 
  Award, 
  UserCheck, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Target,
  ChevronRight
} from 'lucide-react';

export default function EmployeeScorecard() {
  const [activeTab, setActiveTab] = useState<'scorecard' | 'plan'>('scorecard');

  const scorecardData = {
    name: 'Ahmet Yılmaz',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    currentRole: 'Mağaza Müdür Yardımcısı',
    targetRole: 'Mağaza Müdürü',
    overallCompetencyScore: 82,
    promotionReadinessScore: 83,
    kpiScore: 84,
    courseCompletion: 92, // %
    fieldTaskScore: 86,
    managerEvaluationScore: 78,
    strongAreas: ['Stok ve Envanter Yönetimi', 'Müşteri Deneyimi', 'Saha Operasyonu'],
    growthAreas: ['P&L Finans Bütçesi', 'Yönetici İletişimi'],
    recommendedCourses: ['Mağaza Müdürü P&L Eğitimi', 'İleri Liderlik & Koçluk']
  };

  return (
    <section className="py-16 bg-white border-b border-gray-200" id="gelisim-karnesi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-[#0B2A4A]/10 border border-[#0B2A4A]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0B2A4A] mb-3">
            <FileText className="h-4 w-4 text-[#087F96]" />
            <span>Şeffaf Performans ve Gelişim Takibi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2A4A] tracking-tight">
            Çalışan Gelişim Karnesi ve 90 Günlük Plan
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Her çalışanın mevcut pozisyonundan hedef pozisyona ulaşması için 90 günlük somut aksiyon adımları ve ölçülebilir gelişim karnesi sunulur.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
            <button
              onClick={() => setActiveTab('scorecard')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-2 ${
                activeTab === 'scorecard'
                  ? 'bg-[#0B2A4A] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Çalışan Gelişim Karnesi</span>
            </button>
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-2 ${
                activeTab === 'plan'
                  ? 'bg-[#0B2A4A] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>Önümüzdeki 90 Günlük Gelişim Planı</span>
            </button>
          </div>
        </div>

        {activeTab === 'scorecard' ? (
          /* Scorecard Card View */
          <div className="bg-[#061B33] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#087F96]/40 max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-[#087F96]/30 text-[#DDF4F7] font-black text-xl flex items-center justify-center border border-[#087F96]">
                  AY
                </div>
                <div>
                  <span className="text-xs text-[#087F96] font-extrabold uppercase">Aktif Çalışan Karnesi</span>
                  <h3 className="text-2xl font-black">{scorecardData.name}</h3>
                  <p className="text-xs text-gray-300">
                    {scorecardData.currentRole} → <span className="text-emerald-400 font-bold">Hedef: {scorecardData.targetRole}</span>
                  </p>
                </div>
              </div>

              <div className="bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-2xl text-center">
                <div className="text-[10px] text-gray-300 font-semibold uppercase">Terfi Hazırlık Skoru</div>
                <div className="text-3xl font-black text-emerald-400">%{scorecardData.promotionReadinessScore}</div>
                <div className="text-[10px] text-emerald-300 font-bold mt-0.5">TERFİYE HAZIR</div>
              </div>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                <div className="text-[11px] text-gray-400 font-semibold">Genel Yetkinlik</div>
                <div className="text-2xl font-black text-white mt-1">%{scorecardData.overallCompetencyScore}</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                <div className="text-[11px] text-gray-400 font-semibold">KPI Performansı</div>
                <div className="text-2xl font-black text-blue-400 mt-1">%{scorecardData.kpiScore}</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                <div className="text-[11px] text-gray-400 font-semibold">Eğitim Tamamlama</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">%{scorecardData.courseCompletion}</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                <div className="text-[11px] text-gray-400 font-semibold">Saha & Görev Skoru</div>
                <div className="text-2xl font-black text-purple-400 mt-1">%{scorecardData.fieldTaskScore}</div>
              </div>
            </div>

            {/* Strong & Growth Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Güçlü Alanlar</h4>
                <div className="space-y-1 text-xs text-gray-200">
                  {scorecardData.strongAreas.map((area, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Gelişim Alanları</h4>
                <div className="space-y-1 text-xs text-gray-200">
                  {scorecardData.growthAreas.map((area, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Target className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* 90-Day Actionable Plan Timeline */
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200 max-w-4xl mx-auto space-y-8">
            <div className="border-b border-gray-200 pb-4">
              <span className="text-xs text-[#087F96] font-bold uppercase tracking-wider">Kişisel Yol Haritası</span>
              <h3 className="text-2xl font-black text-[#0B2A4A]">90 Günlük Hızlandırılmış Gelişim Planı</h3>
              <p className="text-xs text-gray-500 mt-1">Gelişim süreci 30'ar günlük 3 ana evrede takip edilir.</p>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-6 relative before:absolute before:left-6 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-200">
              {/* Phase 1: 1-30 Days */}
              <div className="relative pl-12 space-y-2">
                <div className="absolute left-3.5 top-0.5 -translate-x-1/2 w-6 h-6 rounded-full bg-[#0B2A4A] text-white text-xs font-black flex items-center justify-center ring-4 ring-white">
                  1
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-[#0B2A4A]">1 – 30 Gün: Temel Yetkinlik & Teori</h4>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">Tamamlandı %100</span>
                </div>
                <p className="text-xs text-gray-600">
                  Stok Yönetimi Mikro Eğitimleri • KPI Temelleri • İlk Saha Uygulaması ve Mini Görev
                </p>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 w-full rounded-full" />
                </div>
              </div>

              {/* Phase 2: 31-60 Days */}
              <div className="relative pl-12 space-y-2">
                <div className="absolute left-3.5 top-0.5 -translate-x-1/2 w-6 h-6 rounded-full bg-[#087F96] text-white text-xs font-black flex items-center justify-center ring-4 ring-white">
                  2
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-[#0B2A4A]">31 – 60 Gün: Uygulama & Yönetici Gözlemi</h4>
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[10px] font-bold">Devam Ediyor %65</span>
                </div>
                <p className="text-xs text-gray-600">
                  Mağaza Müdürü Liderlik Eğitimi • Mağaza İçi Mini İyileştirme Projesi • Yönetici Saha Gözlemi
                </p>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#087F96] w-2/3 rounded-full" />
                </div>
              </div>

              {/* Phase 3: 61-90 Days */}
              <div className="relative pl-12 space-y-2">
                <div className="absolute left-3.5 top-0.5 -translate-x-1/2 w-6 h-6 rounded-full bg-gray-300 text-gray-700 text-xs font-black flex items-center justify-center ring-4 ring-white">
                  3
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-[#0B2A4A]">61 – 90 Gün: Değerlendirme & Terfi Komitesi</h4>
                  <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold">Planlandı</span>
                </div>
                <p className="text-xs text-gray-600">
                  Final Yeterlilik Sınavı • Yetkinlik Değerlendirmesi • Terfi Hazırlık Skorunun Yeniden Hesaplanması
                </p>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-300 w-0 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
