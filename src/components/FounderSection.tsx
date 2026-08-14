'use client';

import React from 'react';
import Link from 'next/link';
import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
  Users
} from 'lucide-react';

export default function FounderSection() {
  return (
    <section className="py-16 bg-white border-b border-gray-200" id="kurucu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B2A4A] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#087F96]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Founder Image & Title */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-4">
            <div className="inline-flex items-center space-x-2 bg-[#087F96]/20 border border-[#087F96]/40 px-3 py-1 rounded-full text-xs font-bold text-[#DDF4F7]">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>Saha Tecrübesi & Sektörel Liderlik</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Perakende Sahasından Doğan Bir Akademi
            </h2>

            <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-[#087F96] text-white font-black text-2xl flex items-center justify-center border-2 border-white/20 flex-shrink-0 shadow-lg">
                AÇ
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Ahmet Çelik</h3>
                <p className="text-xs text-[#087F96] font-extrabold uppercase">Kurucu & Perakende Stratejisti</p>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-[11px] text-gray-300 hover:text-white mt-1 transition-colors font-semibold"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1 text-[#087F96]" />
                  <span>LinkedIn Profilini İncele</span>
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
              Perakende Kariyer Akademisi, teorik derslerden öte; perakende sahasındaki gerçek operasyonel ihtiyaçlar, KPI hedefleri, satın alma marjları ve insan kaynağı yetiştirme disiplinleri üzerine inşa edilmiş dijital bir teknoloji platformudur.
            </p>
          </div>

          {/* Core Expertise Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <div className="font-extrabold text-[#DDF4F7] text-sm flex items-center space-x-2">
                <Target className="h-4 w-4 text-[#087F96]" />
                <span>Saha Yetkinlik Standartlaştırma</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Mağaza çalışanlarının, reyon şeflerinin ve müdür yardımcılarının yetkinliklerini objektif skorlama sistemleriyle ölçme.
              </p>
            </div>

            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <div className="font-extrabold text-[#DDF4F7] text-sm flex items-center space-x-2">
                <Users className="h-4 w-4 text-emerald-400" />
                <span>İç Terfi & Yedekleme Mimarisi</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Kritik pozisyonların (Mağaza Müdürü, Bölge Müdürü) tek kişiye bağımlı kalmadan kurum içinden yetiştirilerek yedeklenmesi.
              </p>
            </div>

            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <div className="font-extrabold text-[#DDF4F7] text-sm flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span>Mikro Öğrenme ve Akademi Tasarımı</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Yoğun mağaza temposuna uygun 10–20 dakikalık modüller, mini sınavlar ve saha görevleri ile sürekli öğrenme kültürü.
              </p>
            </div>

            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <div className="font-extrabold text-[#DDF4F7] text-sm flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-purple-400" />
                <span>Kurumsal İK & Executive Yönetişim</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                C-Level (CEO, CHRO, CCO) seviyesi için makro P&L yönetimi, turnover azaltma ve ROI odaklı insan kaynağı yatırımları.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
