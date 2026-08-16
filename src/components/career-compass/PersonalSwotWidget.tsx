'use client';

import React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  AlertOctagon,
  Sparkles,
  BookOpen,
  Calendar,
  Play,
  CheckCircle2,
  Clock,
  Award,
  ArrowRight
} from 'lucide-react';

interface PersonalSwotWidgetProps {
  selectedGoal?: string;
}

export default function PersonalSwotWidget({
  selectedGoal = 'Mağaza Müdürü'
}: PersonalSwotWidgetProps) {
  // Recommended courses mapped directly to identified weak areas for the target goal
  const recommendedCourses = [
    {
      id: 1,
      weakness: 'Stok Devir Hızı Hesabı & Emniyet Stoku Formülü',
      courseTitle: 'Mağaza İçi Stok, Sipariş ve Envanter Yönetimi',
      instructor: 'Caner Şahin (Stok & Envanter Eğitmeni)',
      scheduleDate: 'Eylül 2026 (Aktif)',
      progress: 68,
      status: 'DEVAM EDİYOR',
      badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
      actionText: 'Kaldığım Yerden Devam Et',
      gain: 'Emniyet stoku formül uygulaması, sipariş periyodu hesabı ve fire oranını düşürme yöntemleri.'
    },
    {
      id: 2,
      weakness: 'Vardiya Çizelgeleme & Yoğun Saat Kestirimi',
      courseTitle: 'Vardiya & Personel İş Gücü Planlaması',
      instructor: 'Dr. Mustafa Eymen (P&L ve Perakende Baş Uzmanı)',
      scheduleDate: 'Ağustos 2026 (Tamamlandı)',
      progress: 100,
      status: 'TAMAMLANDI',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      actionText: 'İçeriği İncele',
      gain: 'Yoğun kasa saat kestirim yöntemleri, yasal mola çizelgeleri ve mağaza içi vardiya adalet matrisi.'
    },
    {
      id: 3,
      weakness: `Yönetsel Bütçe Okuryazarlığı & P&L Simülasyonu (${selectedGoal} İçin)`,
      courseTitle: `P&L Bütçe, Finansal Okuryazarlık ve Kar/Zarar Yönetimi`,
      instructor: 'Dr. Mustafa Eymen (P&L ve Perakende Baş Uzmanı)',
      scheduleDate: 'Ekim 2026 (Planlandı)',
      progress: 0,
      status: 'ATANACAK',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      actionText: 'Eğitime Başla',
      gain: `${selectedGoal} seviyesinde şube gelir-gider tablosu okuma, bütçe yapma ve net kar marjı artırma simülatörü.`
    },
    {
      id: 4,
      weakness: 'Terfi Rekabeti & Ekip Yönetim Yetkinliği',
      courseTitle: 'Ekip Motivasyonu ve Gelişimsel Geri Bildirim',
      instructor: 'Bülent Arslan (C-Suite Liderlik & CEO Koçu)',
      scheduleDate: 'Kasım 2026 (Planlandı)',
      progress: 0,
      status: 'ATANACAK',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      actionText: 'Eğitime Başla',
      gain: 'İK Yetenek Havuzunda mülakat puanını yükselten liderlik simülatörü ve koçluk geri bildirim teknikleri.'
    }
  ];

  return (
    <div className="p-6 sm:p-8 bg-[#0B2A4A] rounded-3xl border border-white/10 space-y-6 shadow-xl text-white">
      {/* HEADER BANNER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-extrabold text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Kişisel SWOT Analizim (Eğitmen &amp; İK Onaylı - "{selectedGoal}" Hedefi)</span>
          </h3>
          <p className="text-xs text-gray-300 mt-0.5">
            Saha performans verileriniz, sınav notlarınız ve yetkinlik değerlendirmelerinize dayalı otomatik kişisel SWOT tablosu.
          </p>
        </div>
        <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full font-mono text-xs font-bold border border-amber-500/40 shrink-0">
          Hedef: {selectedGoal}
        </span>
      </div>

      {/* 4-QUADRANT SWOT MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* STRENGTHS */}
        <div className="p-5 bg-[#061B33] rounded-2xl border border-emerald-500/40 space-y-3 shadow-md">
          <div className="flex items-center space-x-2 text-emerald-400 font-extrabold text-sm border-b border-white/10 pb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Güçlü Yönler (Strengths)</span>
          </div>
          <ul className="space-y-2 text-gray-200 list-disc list-inside leading-relaxed">
            <li><strong className="text-white">POS &amp; Kasa Hızı:</strong> Kasa hattı devir hızında şube 1.'si (%94 verimlilik).</li>
            <li><strong className="text-white">Müşteri Memnuniyeti:</strong> Müşteri anket sonucu 4.9/5.0 skorunda.</li>
            <li><strong className="text-white">Teorik Sınav Başarısı:</strong> Perakende Matematiği sınavı %92 başarı puanı.</li>
            <li><strong className="text-white">Ekip Uyum Yeteneği:</strong> Vardiya içi yardımseverlik ve iletişim gücü yüksek.</li>
          </ul>
        </div>

        {/* WEAKNESSES */}
        <div className="p-5 bg-[#061B33] rounded-2xl border border-rose-500/40 space-y-3 shadow-md">
          <div className="flex items-center space-x-2 text-rose-400 font-extrabold text-sm border-b border-white/10 pb-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <span>Gelişim Alanları (Weaknesses - {selectedGoal} İçin)</span>
          </div>
          <ul className="space-y-2 text-gray-200 list-disc list-inside leading-relaxed">
            <li><strong className="text-white">Stok Devir Hızı Hesabı:</strong> Emniyet stoku formül uygulamasında takviye gerekiyor.</li>
            <li><strong className="text-white">Vardiya Çizelgeleme:</strong> Yoğun saat kestirim yöntemleri eğitimi tamamlanmalı.</li>
            <li><strong className="text-white">Yönetsel Bütçe Okuryazarlığı:</strong> {selectedGoal} pozisyonu P&amp;L ve fire analiz simülasyonu pratik ihtiyacı var.</li>
            <li><strong className="text-white">Terfi Mülakat Hazırlığı:</strong> İK Yetenek Havuzunda üst kademe sunum yetkinliği geliştirilmeli.</li>
          </ul>
        </div>

        {/* OPPORTUNITIES */}
        <div className="p-5 bg-[#061B33] rounded-2xl border border-cyan-400/40 space-y-3 shadow-md">
          <div className="flex items-center space-x-2 text-cyan-300 font-extrabold text-sm border-b border-white/10 pb-2">
            <TrendingUp className="w-5 h-5 text-cyan-300" />
            <span>Fırsatlar (Opportunities)</span>
          </div>
          <ul className="space-y-2 text-gray-200 list-disc list-inside leading-relaxed">
            <li><strong className="text-white">Bölgesel Büyüme:</strong> Marmara Bölgesi yeni mağaza açılışları nedeniyle <strong>"{selectedGoal}"</strong> kadrosu açık.</li>
            <li><strong className="text-white">PKA Mentorluk Desteği:</strong> Bölge mentoru ile haftalık birebir koçluk hakkı tanımlı.</li>
            <li><strong className="text-white">Saha Görevi Başarısı:</strong> Reyon denetim raporlaması İK Havuzunda yüksek puan aldı.</li>
          </ul>
        </div>

        {/* THREATS */}
        <div className="p-5 bg-[#061B33] rounded-2xl border border-[#087F96]/40 space-y-3 shadow-md">
          <div className="flex items-center space-x-2 text-[#087F96] font-extrabold text-sm border-b border-white/10 pb-2">
            <AlertOctagon className="w-5 h-5 text-[#087F96]" />
            <span>Tehditler &amp; Riskler (Threats)</span>
          </div>
          <ul className="space-y-2 text-gray-200 list-disc list-inside leading-relaxed">
            <li><strong className="text-white">Terfi Rekabeti:</strong> Diğer şubelerden 3 kıdemli aday aynı terfi havuzunda yarışıyor.</li>
            <li><strong className="text-white">Eğitim Süre Gecikmesi:</strong> Modül tamamlama süresi gecikirse terfi takvimi ertelenebilir.</li>
          </ul>
        </div>
      </div>

      {/* RECOMMENDED COURSES SPECIFICALLY TARGETING WEAK AREAS */}
      <div className="p-6 bg-[#061B33] rounded-3xl border border-amber-400/40 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <h4 className="text-sm font-extrabold text-amber-300 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>🎯 Zayıf Alanları Güçlendirmek İçin Önerilen Eğitimler &amp; Gelişim Kataloğu</span>
            </h4>
            <p className="text-xs text-gray-300 mt-0.5">
              SWOT Analizinde tespit edilen gelişim noktalarınızı kapatarak <strong>"{selectedGoal}"</strong> hedefine ulaşmanızı sağlayacak özel dersler.
            </p>
          </div>
          <span className="px-3 py-1 bg-amber-400 text-slate-950 rounded-lg text-xs font-black shrink-0">
            {recommendedCourses.length} Özel Öneri
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {recommendedCourses.map((rec) => (
            <div
              key={rec.id}
              className="p-4 bg-[#0B2A4A] rounded-2xl border border-white/15 space-y-3 shadow-md hover:border-amber-400/50 transition-all"
            >
              {/* Weakness Link Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                <div className="flex items-center space-x-2 text-rose-300 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Hedeflenen Gelişim Alanı: <strong>{rec.weakness}</strong></span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${rec.badgeColor}`}>
                  {rec.status}
                </span>
              </div>

              {/* Course Title & Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="space-y-1.5 flex-1">
                  <h5 className="font-black text-white text-xs sm:text-sm flex items-center space-x-1.5">
                    <span>{rec.courseTitle}</span>
                  </h5>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-300 font-mono">
                    <span className="text-amber-300 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      👨‍🏫 Eğitmen: <strong className="text-white">{rec.instructor}</strong>
                    </span>
                    <span className="flex items-center space-x-1 text-cyan-300">
                      <Calendar className="w-3 h-3" />
                      <span>Takvim: {rec.scheduleDate}</span>
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-300 leading-snug pt-1">
                    <strong className="text-emerald-400">💡 Gelişim Kazanımı:</strong> {rec.gain}
                  </p>
                </div>

                <button
                  onClick={() => alert(`"${rec.courseTitle}" eğitimi açılıyor...`)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 shadow-md cursor-pointer transition-all shrink-0 ${
                    rec.status === 'TAMAMLANDI'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                      : rec.progress > 0
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-black'
                      : 'bg-[#087F96] hover:bg-[#056B80] text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{rec.actionText}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
