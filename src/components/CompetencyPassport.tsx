'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Share2, 
  QrCode, 
  ExternalLink, 
  Star, 
  CheckCircle2, 
  BookOpen, 
  TrendingUp, 
  Sparkles,
  User,
  BadgeCheck,
  BrainCircuit,
  Building2
} from 'lucide-react';

export default function CompetencyPassport() {
  const [copied, setCopied] = useState(false);

  const passportData = {
    name: 'Selim Kılıç',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    passportNo: 'PKA-2026-88941',
    currentRole: 'Mağaza Müdür Yardımcısı',
    department: 'Mağaza Operasyonları',
    careerLevel: 'Seviye 4 - Uzman / Yönetici Adayı',
    targetRole: 'Mağaza Müdürü',
    promotionReadiness: 83,
    competencies: [
      { name: 'Mağaza Yönetimi', rating: 4, score: 85 },
      { name: 'Müşteri Deneyimi', rating: 4, score: 88 },
      { name: 'Finans & P&L', rating: 3, score: 72 },
      { name: 'Stok Yönetimi', rating: 5, score: 96 },
      { name: 'Liderlik & Koçluk', rating: 4, score: 82 },
      { name: 'Satış Yönetimi', rating: 4, score: 86 },
      { name: 'CRM & Müşteri Verisi', rating: 3, score: 70 },
      { name: 'Dijital Yetkinlik', rating: 4, score: 84 },
      { name: 'Perakendede Yapay Zekâ', rating: 4, score: 80 }
    ],
    completedCourses: 14,
    earnedBadges: 8,
    kpiAchievements: '2025 Q4 Mağaza Ciro Hedefi %112 Tamamlandı',
    verifiedUrl: 'https://www.perakendekariyerakademisi.com/verify/PKA-2026-88941'
  };

  const handleShare = () => {
    navigator.clipboard.writeText(passportData.verifiedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#F4F7F9] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#0B2A4A]/10 border border-[#0B2A4A]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0B2A4A] mb-3">
            <BadgeCheck className="h-4 w-4 text-[#087F96]" />
            <span>Doğrulanabilir Dijital Kimlik</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2A4A] tracking-tight">
            Perakende Yetkinlik Pasaportu
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Tüm eğitimlerinizi, sınav sonuçlarınızı, saha başarılarınızı ve yetkinlik skorlarınızı tek bir dijital pasaportta toplayın ve doğrulama linkiyle paylaşın.
          </p>
        </div>

        {/* Passport Card Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-[#0B2A4A] via-[#061B33] to-[#087F96] p-6 sm:p-8 text-white relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-2xl bg-white/10 p-1 border-2 border-white/30 overflow-hidden flex-shrink-0 shadow-lg">
                  <div className="w-full h-full bg-[#061B33] rounded-xl flex items-center justify-center font-bold text-white text-2xl border border-white/20">
                    SK
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center space-x-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full mb-1">
                    <ShieldCheck className="h-3 w-3 mr-1" /> ONAYLANMIŞ PERAKENDE PASAPORTU
                  </div>
                  <h3 className="text-2xl font-black">{passportData.name}</h3>
                  <p className="text-xs text-gray-200">{passportData.currentRole} • {passportData.department}</p>
                  <p className="text-[11px] text-[#DDF4F7] font-mono mt-1">ID: {passportData.passportNo}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center sm:text-right">
                <div className="text-[11px] text-gray-300 font-medium">Terfi Hazırlık Oranı</div>
                <div className="text-3xl font-black text-emerald-400">%{passportData.promotionReadiness}</div>
                <div className="text-[10px] text-gray-200">Hedef: {passportData.targetRole}</div>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Star Competency Ratings Grid */}
            <div className="lg:col-span-7 space-y-6">
              <h4 className="text-xs font-bold text-[#0B2A4A] uppercase tracking-wider flex items-center space-x-1.5">
                <Star className="h-4 w-4 text-[#D97706]" />
                <span>Onaylanmış Yetkinlik Dereceleri</span>
              </h4>

              <div className="space-y-3">
                {passportData.competencies.map((comp, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-200/80">
                    <div className="text-xs font-bold text-[#0B2A4A]">{comp.name}</div>
                    <div className="flex items-center space-x-3">
                      <div className="flex text-[#D97706]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-3.5 w-3.5 ${star <= comp.rating ? 'fill-[#D97706]' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs font-black text-gray-700 w-10 text-right">%{comp.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Badges, QR Code & Share Action */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Stats Summary Box */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-center">
                    <div className="text-2xl font-black text-[#0B2A4A]">{passportData.completedCourses}</div>
                    <div className="text-[11px] text-gray-600 font-semibold">Tamamlanan Eğitim</div>
                  </div>
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                    <div className="text-2xl font-black text-emerald-800">{passportData.earnedBadges}</div>
                    <div className="text-[11px] text-emerald-700 font-semibold">Dijital Rozet</div>
                  </div>
                </div>

                {/* KPI Highlight */}
                <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 font-medium">
                  <span className="font-bold block text-purple-950 mb-0.5">⭐ Başarı Kaydı:</span>
                  {passportData.kpiAchievements}
                </div>

                {/* Verification Box with QR Code Simulation */}
                <div className="p-4 bg-[#0B2A4A] text-white rounded-2xl text-center space-y-3 border border-[#087F96]/30">
                  <div className="flex justify-center">
                    <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center shadow-md">
                      {/* Simulated QR Code SVG */}
                      <QrCode className="h-20 w-20 text-[#0B2A4A]" />
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-300">
                    Resmi Doğrulama Bağlantısı & QR Kod
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono break-all bg-[#061B33] p-1.5 rounded border border-white/10">
                    perakendekariyerakademisi.com/verify/...
                  </div>
                </div>
              </div>

              {/* Share CTA Button */}
              <button 
                onClick={handleShare}
                className="w-full py-3.5 px-4 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 text-sm"
              >
                <Share2 className="h-4 w-4" />
                <span>{copied ? 'Doğrulama Linki Kopyalandı!' : 'Yetkinlik Pasaportumu Paylaş'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
