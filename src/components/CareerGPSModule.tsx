'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Navigation, 
  MapPin, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  BookOpen, 
  Award, 
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const POSITIONS = [
  'Kasiyer',
  'Reyon Satış Elemanı',
  'Meyve Sebze Reyon Görevlisi',
  'Kasap Reyon Görevlisi',
  'Şarküteri Reyon Görevlisi',
  'Kıdemli Kasiyer',
  'Takım Lideri',
  'Mağaza Müdür Yardımcısı Adayı',
  'Mağaza Müdür Yardımcısı',
  'Mağaza Müdürü Adayı',
  'Mağaza Müdürü',
  'Bölge Operasyon Müdürü Adayı',
  'Bölge Operasyon Müdürü',
  'Satış & Operasyon Direktörü'
];

interface RouteStep {
  stepNumber: number;
  title: string;
  isCompleted: boolean;
  isCurrent: boolean;
  requiredSkills: string[];
  requiredCourses: number;
}

export default function CareerGPSModule() {
  const [currentPosition, setCurrentPosition] = useState<string>('Kasiyer');
  const [targetPosition, setTargetPosition] = useState<string>('Mağaza Müdürü');

  const getRouteSteps = (): RouteStep[] => {
    return [
      {
        stepNumber: 1,
        title: 'Kasiyer (Mevcut Seviye)',
        isCompleted: true,
        isCurrent: true,
        requiredSkills: ['Kasa İşlemleri', '5S Düzeni', 'Müşteri İletişimi'],
        requiredCourses: 4
      },
      {
        stepNumber: 2,
        title: 'Kıdemli Kasiyer',
        isCompleted: true,
        isCurrent: false,
        requiredSkills: ['Gün Sonu Mutabakatı', 'İade & İptal Yönetimi', 'Stok Sayım'],
        requiredCourses: 6
      },
      {
        stepNumber: 3,
        title: 'Takım Lideri',
        isCompleted: false,
        isCurrent: false,
        requiredSkills: ['Vardiya Planlama', 'Ekip Motivasyonu', 'Reyon Düzeni'],
        requiredCourses: 8
      },
      {
        stepNumber: 4,
        title: 'Müdür Yardımcısı Adayı',
        isCompleted: false,
        isCurrent: false,
        requiredSkills: ['Fire Minimizasyonu', 'KPI Okuma', 'Saha Denetimi'],
        requiredCourses: 10
      },
      {
        stepNumber: 5,
        title: 'Mağaza Müdür Yardımcısı',
        isCompleted: false,
        isCurrent: false,
        requiredSkills: ['P&L Temelleri', 'Depo Lojistik', 'Personel Değerlendirme'],
        requiredCourses: 12
      },
      {
        stepNumber: 6,
        title: 'Mağaza Müdürü Adayı',
        isCompleted: false,
        isCurrent: false,
        requiredSkills: ['Bütçe Yönetimi', 'Kategori Marjı', 'Saha Liderliği'],
        requiredCourses: 14
      },
      {
        stepNumber: 7,
        title: 'Mağaza Müdürü (Hedef Pozisyon)',
        isCompleted: false,
        isCurrent: false,
        requiredSkills: ['Stratejik Mağaza Yönetimi', 'Bölgesel Rekabet', 'Geleceğin Yöneticisini Yetiştirme'],
        requiredCourses: 16
      }
    ];
  };

  const steps = getRouteSteps();

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-[#087F96] px-3 py-1 rounded-full text-xs font-bold border border-blue-200">
            <Navigation className="w-4 h-4 text-[#087F96] animate-pulse" />
            <span>PKA CAREER — Akıllı Kariyer Navigasyonu</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#0B2A4A] tracking-tight">
            Kariyer GPS'im (Akıllı Rota Haritası)
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
            Bugünkü pozisyonunu ve hedeflediğin rolü seç; sistem sana özel adım adım yetkinlik ve gelişim rotasını oluştursun.
          </p>
        </div>

        <span className="px-4 py-2 bg-emerald-100 text-emerald-900 text-xs font-mono font-black rounded-2xl border border-emerald-300 shadow-xs whitespace-nowrap">
          📍 Canlı Rota Simülatörü
        </span>
      </div>

      {/* Select Box Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gradient-to-r from-[#061B33] via-[#0B2A4A] to-[#087F96] p-5 rounded-2xl text-white shadow-lg">
        {/* Current Position Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider block flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Bugünkü Pozisyonun:</span>
          </label>
          <select
            value={currentPosition}
            onChange={(e) => setCurrentPosition(e.target.value)}
            className="w-full bg-white/10 text-white font-extrabold text-sm rounded-xl px-3.5 py-2.5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            {POSITIONS.map((pos) => (
              <option key={pos} value={pos} className="bg-slate-900 text-white">
                {pos}
              </option>
            ))}
          </select>
        </div>

        {/* Target Position Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider block flex items-center space-x-1.5">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span>Hedeflediğin Pozisyon:</span>
          </label>
          <select
            value={targetPosition}
            onChange={(e) => setTargetPosition(e.target.value)}
            className="w-full bg-white/10 text-white font-extrabold text-sm rounded-xl px-3.5 py-2.5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {POSITIONS.map((pos) => (
              <option key={pos} value={pos} className="bg-slate-900 text-white">
                {pos}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* GPS Summary Status Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-2xl space-y-0.5">
          <span className="text-[10px] font-mono text-blue-800 font-bold uppercase block">Mevcut Hazırlık</span>
          <span className="text-xl font-black text-[#0B2A4A]">%38</span>
          <span className="text-[9.5px] font-bold text-blue-600 block">Mağaza Müdürü Yolculuğu</span>
        </div>

        <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-0.5">
          <span className="text-[10px] font-mono text-amber-800 font-bold uppercase block">Tamamlanacak Eğitim</span>
          <span className="text-xl font-black text-amber-900">34 Modül</span>
          <span className="text-[9.5px] font-bold text-amber-700 block">Mikro Gelişim Dersleri</span>
        </div>

        <div className="p-3.5 bg-rose-50/80 border border-rose-200 rounded-2xl space-y-0.5">
          <span className="text-[10px] font-mono text-rose-800 font-bold uppercase block">Eksik Yetkinlik</span>
          <span className="text-xl font-black text-rose-900">7 Beceri</span>
          <span className="text-[9.5px] font-bold text-rose-700 block">Ölçümlenen Kazanım</span>
        </div>

        <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-0.5">
          <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase block">Tamamlanan Adım</span>
          <span className="text-xl font-black text-emerald-900">2 / 7</span>
          <span className="text-[9.5px] font-bold text-emerald-700 block">Basamak İlerlemesi</span>
        </div>

        <div className="col-span-2 md:col-span-1 p-3.5 bg-indigo-50/80 border border-indigo-200 rounded-2xl space-y-0.5">
          <span className="text-[10px] font-mono text-indigo-800 font-bold uppercase block">Tahmini Süreç</span>
          <span className="text-xs font-black text-indigo-950 block mt-1">Performansa Bağlı</span>
          <span className="text-[9px] font-medium text-gray-500 leading-tight block">Kurumsal ve bireysel gelişime göre şekillenir</span>
        </div>
      </div>

      {/* STEP-BY-STEP HORIZONTAL / VERTICAL ROUTE GRAPHIC */}
      <div className="space-y-3 pt-2">
        <h4 className="font-extrabold text-sm text-[#0B2A4A] flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#087F96]" />
          <span>Kariyer GPS Otomatik Rotası ({currentPosition} ➔ {targetPosition})</span>
        </h4>

        <div className="space-y-3">
          {steps.map((st) => (
            <div
              key={st.stepNumber}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs ${
                st.isCurrent
                  ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 border-emerald-500 ring-2 ring-emerald-300/40'
                  : st.isCompleted
                  ? 'bg-gray-50/80 border-gray-200 text-gray-700'
                  : 'bg-white border-dashed border-gray-300 text-gray-800'
              }`}
            >
              <div className="flex items-start sm:items-center space-x-3.5">
                <div className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                  st.isCurrent
                    ? 'bg-emerald-600 text-white shadow-md'
                    : st.isCompleted
                    ? 'bg-[#0B2A4A] text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {st.stepNumber}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-black text-sm text-[#0B2A4A]">{st.title}</h5>
                    {st.isCurrent && (
                      <span className="text-[9px] font-mono font-black px-2 py-0.5 bg-emerald-600 text-white rounded-md">
                        Mevcut Konum 📍
                      </span>
                    )}
                    {st.isCompleted && !st.isCurrent && (
                      <span className="text-[9px] font-mono font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-md">
                        Tamamlandı ✅
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {st.requiredSkills.map((sk) => (
                      <span key={sk} className="text-[10px] font-mono font-bold bg-white text-gray-700 px-2 py-0.5 rounded-md border border-gray-200">
                        • {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 self-end sm:self-center shrink-0">
                <span className="text-[10px] font-mono font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200">
                  {st.requiredCourses} Modül Eğitim
                </span>
                <Link
                  href="/kariyerimi-planla"
                  className="px-3 py-1.5 bg-[#087F96] hover:bg-[#056B80] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center space-x-1"
                >
                  <span>Adımı İncele</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Realistic Disclaimer Note */}
      <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/80 flex items-start space-x-3 text-xs text-amber-900 leading-relaxed">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <strong>Kariyer GPS Bilgilendirmesi:</strong> Belirtilen basamaklar ve tahmini gelişim süreleri bireysel performansınıza, saha yetkinlik değerlendirmelerinize ve kurumsal mağaza kadro ihtiyaçlarına bağlı olarak dinamik değişkenlik gösterir.
        </p>
      </div>
    </div>
  );
}
