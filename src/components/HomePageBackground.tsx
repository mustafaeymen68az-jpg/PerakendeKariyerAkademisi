'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Building,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  CheckCircle2,
  BrainCircuit,
  Layers,
  Building2,
  Play
} from 'lucide-react';
import Logo from '@/components/Logo';

export default function HomePageBackground() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9] select-none pointer-events-none">
      {/* -------------------------------------------------- */}
      {/* HERO ALANI */}
      {/* -------------------------------------------------- */}
      <section className="relative bg-gradient-to-br from-[#0B2A4A] via-[#061B33] to-[#056B80] text-white overflow-hidden py-16 md:py-24 border-b border-[#087F96]/30">
        {/* Decorative background glow circles */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#087F96]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#DDF4F7]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Sol Bölüm */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Brand Logo in Hero */}
              <div className="flex justify-center lg:justify-start">
                <Logo variant="dark" size="xl" showSubtext={false} className="bg-white/10 p-3 rounded-2xl border border-white/15 shadow-lg backdrop-blur-md" />
              </div>

              {/* Accent Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#087F96]/20 border border-[#087F96]/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#DDF4F7]">
                <Sparkles className="h-4 w-4 text-[#087F96]" />
                <span>2 Yıllık Kariyer ve Yetkinlik Gelişim Modeli</span>
              </div>

              {/* Ana Başlık */}
              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
                Perakendecilikte Kariyer Yolculuğunuzun <span className="text-[#087F96]">Adresi</span>
              </h1>

              {/* Alt Açıklama */}
              <p className="text-gray-200 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Mağaza çalışanından CEO ve Genel Müdüre kadar perakende sektöründeki tüm pozisyonlar için yapılandırılmış dijital eğitim, yetkinlik ve kariyer gelişim platformu.
              </p>

              {/* 3 Buton */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
                <div className="px-7 py-3.5 bg-[#087F96] text-white font-bold rounded-xl flex items-center justify-center space-x-2 text-sm">
                  <BookOpen className="h-4 w-4" />
                  <span>1. Eğitimleri Keşfet</span>
                </div>

                <div className="px-7 py-3.5 bg-white/10 border border-white/30 text-white font-semibold rounded-xl flex items-center justify-center space-x-2 text-sm">
                  <Layers className="h-4 w-4 text-[#087F96]" />
                  <span>2. Kariyer Yolunu Gör</span>
                </div>
              </div>
            </div>

            {/* Sağ Tarafta Modern Görsel Kompozisyon / Dashboard */}
            <div className="lg:col-span-5">
              <div className="bg-[#061B33]/90 backdrop-blur-xl border border-[#087F96]/40 rounded-2xl p-6 shadow-2xl space-y-5 relative">
                {/* Header of composite */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-[#087F96] flex items-center justify-center text-white font-bold shadow-md">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-base">Akademi Dijital Dashboard</h3>
                      <p className="text-[11px] text-gray-300">Canlı Perakende Kariyer & KPI Takibi</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#34A853]/20 text-[#34A853] px-2.5 py-1 rounded-full font-mono font-bold border border-[#34A853]/40">
                    Sistem Aktif
                  </span>
                </div>

                {/* Dashboard Stats Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                    <span className="text-[11px] text-gray-400 block font-medium">Tamamlanan Eğitim</span>
                    <span className="text-2xl font-black text-white font-mono mt-0.5 block">4,452+</span>
                    <span className="text-[10px] text-[#34A853] flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-0.5" /> %98 Başarı Oranı
                    </span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                    <span className="text-[11px] text-gray-400 block font-medium">Aktif Pozisyon</span>
                    <span className="text-2xl font-black text-[#087F96] font-mono mt-0.5 block">26 Kadro</span>
                    <span className="text-[10px] text-[#DDF4F7] flex items-center mt-1">
                      Kasiyerden CEO'ya
                    </span>
                  </div>
                </div>

                {/* Feature Highlights */}
                <div className="space-y-2.5">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5 flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-[#087F96] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Saha & Operasyonel Yetkinlik</h4>
                      <p className="text-[11px] text-gray-300">Mağaza süreçleri, müşteri memnuniyeti, reyon düzeni ve stok disiplini.</p>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-3 border border-white/5 flex items-start space-x-3">
                    <BrainCircuit className="h-5 w-5 text-[#087F96] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Yapay Zekâ & Dijital Perakendecilik</h4>
                      <p className="text-[11px] text-gray-300">Talep tahmini, prompt mühendisliği ve veri analitiği modülleri.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRİKLER BANTI */}
      <section className="bg-white border-b border-gray-200 py-8 relative z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-100">
            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-[#0B2A4A] font-display">
                4,452+
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1 block">
                Stratejik Eğitim Modülü
              </span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-[#087F96] font-display">
                26
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1 block">
                Uzmanlık Pozisyonu
              </span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-[#0B2A4A] font-display">
                2 Yıl
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1 block">
                Yapılandırılmış Müfredat
              </span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-[#34A853] font-display">
                %100
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1 block">
                Saha & KPI Uyumlu
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
