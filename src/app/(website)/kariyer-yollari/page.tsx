'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, CheckCircle2, TrendingUp, ChevronRight, Award, ShieldCheck, Compass, Sparkles } from 'lucide-react';
import OperationCareerJourney from '@/components/CareerJourney/OperationCareerJourney';

interface TrackItem {
  id: string;
  title: string;
  department: string;
  steps: {
    level: string;
    title: string;
    duration: string;
    keySkills: string[];
  }[];
}

const CAREER_TRACKS: TrackItem[] = [
  {
    id: 'kasiyer-operasyon-track',
    title: '1. Kasiyerlikten Operasyon Müdürlüğüne Yolculuk',
    department: 'Mağaza Operasyonu',
    steps: [
      { level: '1. Seviye', title: 'Kasiyer', duration: '6-12 Ay', keySkills: ['POS Kullanımı', 'Kasa İşlemleri', 'Müşteri İletişimi'] },
      { level: '2. Seviye', title: 'Mağaza Müdür Yardımcısı', duration: '12-18 Ay', keySkills: ['Vardiya Planlama', 'Stok & Envanter', 'Reyon Yönetimi'] },
      { level: '3. Seviye', title: 'Mağaza Müdürü', duration: '18-24 Ay', keySkills: ['Mağaza P&L', 'Ciro & Fire', 'Koçluk'] },
      { level: '4. Seviye', title: 'Bölge Müdürü', duration: '24 Ay', keySkills: ['Çoklu Mağaza', 'Bölge KPI', 'Müdür Yönetimi'] },
      { level: '5. Seviye', title: 'Operasyon Müdürü', duration: '24+ Ay', keySkills: ['Saha Stratejisi', 'Operasyon Bütçesi', 'Süreç Geliştirme'] }
    ]
  },
  {
    id: 'satinalma-track',
    title: '2. Satınalma & Kategori Yönetim Yolculuğu',
    department: 'Merkez Operasyon',
    steps: [
      { level: '1. Seviye', title: 'Satınalma Uzmanı', duration: '0 - 1. Yıl', keySkills: ['Tedarikçi Kayıtları', 'Raf İçi Fiyat Kontrolü'] },
      { level: '2. Seviye', title: 'Kategori Yöneticisi', duration: '1 - 3. Yıl', keySkills: ['Assortment Planlama', 'GMROI Optimizasyonu', 'Tedarikçi Pazarlığı'] },
      { level: '3. Seviye', title: 'Satınalma Müdürü', duration: '3.+ Yıl', keySkills: ['Kategori Bütçeleri', 'Özel Marka (PL) Stratejisi'] }
    ]
  },
  {
    id: 'bi-track',
    title: '3. Veri & Perakende Analitiği Yolculuğu',
    department: 'Teknoloji & Veri',
    steps: [
      { level: '1. Seviye', title: 'Raporlama Uzmanı', duration: '0 - 1. Yıl', keySkills: ['SQL Çekimleri', 'Günlük Satış Raporları'] },
      { level: '2. Seviye', title: 'BI (İş Zekası) Uzmanı', duration: '1 - 2. Yıl', keySkills: ['PowerBI Dashboard', 'Yapay Zekâ Talep Tahmini'] },
      { level: '3. Seviye', title: 'Veri Analitiği Yöneticisi', duration: '2.+ Yıl', keySkills: ['Perakende Veri Madenciliği', 'Stratejik Tahminleme'] }
    ]
  },
  {
    id: 'crm-track',
    title: '4. CRM & Müşteri Deneyimi Yolculuğu',
    department: 'Pazarlama',
    steps: [
      { level: '1. Seviye', title: 'CRM Uzmanı', duration: '0 - 1. Yıl', keySkills: ['Müşteri Veritabanı', 'SMS & Kampanya Kurgusu'] },
      { level: '2. Seviye', title: 'CRM Yöneticisi', duration: '1 - 3. Yıl', keySkills: ['RFM Segmentasyonu', 'CLV Artırma', 'Churn Analizi'] },
      { level: '3. Seviye', title: 'Pazarlama / Müşteri Deneyimi Yöneticisi', duration: '3.+ Yıl', keySkills: ['Omnichannel Marka Stratejisi', 'Yapay Zekâ CRM'] }
    ]
  }
];

export default function KariyerYollariPage() {
  const [viewMode, setViewMode] = useState<'operasyon' | 'tum-departmanlar'>('operasyon');

  return (
    <div className="min-h-screen bg-[#F4F7F9]">
      {/* Top Toggle Switch Strip */}
      <div className="bg-[#0B2A4A] border-b border-[#087F96]/30 py-3 px-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-white text-xs font-semibold">
            <Compass className="w-4 h-4 text-[#087F96]" />
            <span>Kariyer Haritası Modu:</span>
          </div>

          <div className="flex items-center space-x-2 bg-white/10 p-1 rounded-xl border border-white/15 text-xs">
            <button
              onClick={() => setViewMode('operasyon')}
              className={`px-4 py-2 rounded-lg font-extrabold transition-all flex items-center space-x-2 ${
                viewMode === 'operasyon'
                  ? 'bg-[#087F96] text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>15 Basamaklı Operasyon Kariyer Yolculuğu</span>
            </button>

            <button
              onClick={() => setViewMode('tum-departmanlar')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                viewMode === 'tum-departmanlar'
                  ? 'bg-[#087F96] text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <span>Diğer Departman Yolları</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'operasyon' ? (
        <OperationCareerJourney />
      ) : (
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Header */}
            <div className="bg-[#0B2A4A] text-white p-8 sm:p-10 rounded-3xl shadow-xl border border-[#087F96]/30 text-center max-w-4xl mx-auto space-y-4">
              <span className="text-xs font-bold text-[#DDF4F7] bg-[#087F96] px-3.5 py-1 rounded-full uppercase tracking-wider">
                Görsel Zaman Çizelgesi
              </span>
              <h1 className="font-display font-black text-3xl sm:text-4xl">
                Perakende Departman Kariyer Haritaları
              </h1>
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                Perakende Kariyer Akademisi'nde her pozisyonun gelişim basamakları nettir. 1. yıl temel görev yetkinliğini, 2. yıl ise üst pozisyona geçiş yetkinliğini kazandırır.
              </p>
            </div>

            {/* Career Tracks List */}
            <div className="space-y-10">
              {CAREER_TRACKS.map((track) => (
                <div key={track.id} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <span className="text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full">
                        {track.department}
                      </span>
                      <h2 className="font-display font-bold text-xl text-[#0B2A4A] mt-2">
                        {track.title}
                      </h2>
                    </div>
                    <span className="text-xs font-mono text-gray-500 font-semibold hidden sm:block">
                      {track.steps.length} Kademeli İlerleme
                    </span>
                  </div>

                  {/* Stepper Timeline Visual */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                    {track.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="bg-[#F4F7F9] border border-gray-200 rounded-2xl p-5 relative space-y-3 hover:border-[#087F96] transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono font-bold text-[#087F96] bg-white px-2 py-0.5 rounded border border-gray-200">
                              {step.level}
                            </span>
                            <span className="text-gray-400 text-[11px] font-mono">{step.duration}</span>
                          </div>
                          <h3 className="font-display font-bold text-base text-[#0B2A4A]">
                            {step.title}
                          </h3>
                          <div className="pt-2 space-y-1 text-xs text-gray-600">
                            {step.keySkills.map((skill, sIdx) => (
                              <div key={sIdx} className="flex items-center space-x-1.5">
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#34A853] shrink-0" />
                                <span>{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-gray-200/60 text-[11px] font-semibold text-[#087F96] flex items-center justify-between">
                          <span>Eğitim Tamamlama Oranı</span>
                          <span className="font-mono">%100 Modül</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="bg-[#061B33] text-white p-8 rounded-3xl text-center space-y-4 border border-[#087F96]/40">
              <h3 className="font-display font-bold text-2xl">Kendi Pozisyonunuzun Kariyer Yolunu Başlatın</h3>
              <p className="text-gray-300 text-sm max-w-2xl mx-auto font-light">
                Sisteme giriş yaparak mevcut pozisyonunuzu seçin, yetkinlik skorunuzu öğrenin ve 2 yıllık gelişim haritanızı aktif hale getirin.
              </p>
              <div className="pt-2">
                <Link
                  href="/panel"
                  className="px-8 py-3.5 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl shadow-lg transition-all inline-flex items-center space-x-2 text-sm"
                >
                  <span>Öğrenci Paneline Giriş Yap</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
