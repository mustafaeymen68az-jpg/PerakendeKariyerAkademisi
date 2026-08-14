'use client';

import React from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Crown,
  Layers
} from 'lucide-react';
import Link from 'next/link';

export default function CorporatePackagesSection() {
  return (
    <section className="py-16 bg-[#F4F7F9] border-b border-gray-200" id="kurumsal-paketler">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#0B2A4A]/10 border border-[#0B2A4A]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0B2A4A] mb-3">
            <Building2 className="h-4 w-4 text-[#087F96]" />
            <span>Ölçeklenebilir Perakende Çözümleri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2A4A] tracking-tight">
            Kurumsal Akademi Paketleri
          </h2>
          <p className="mt-3 text-base text-gray-600">
            50 çalışanlı bölgesel zincirlerden 10.000+ çalışanlı ulusal perakende devlerine kadar şirketinize uygun yetkinlik ve kariyer paketini seçin.
          </p>
        </div>

        {/* 3 Tier Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Tier 1: PKA START */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-lg flex flex-col justify-between hover:border-[#087F96] transition-all">
            <div>
              <div className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-black rounded-lg uppercase tracking-wider mb-4">
                50 – 250 Çalışan
              </div>
              <h3 className="text-2xl font-black text-[#0B2A4A]">PKA START</h3>
              <p className="text-xs text-gray-500 mt-1">
                Eğitim ve dijital yetkinlik geliştirme sürecini başlatmak isteyen işletmeler için.
              </p>

              <div className="my-6 border-t border-gray-100 pt-4 space-y-2.5 text-xs text-gray-700 font-medium">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] flex-shrink-0" />
                  <span>Kapsamlı Perakende Eğitim Kataloğu</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] flex-shrink-0" />
                  <span>Online Değerlendirme & Sınav Sistemi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] flex-shrink-0" />
                  <span>Dijital Sertifika & Rozet Yönetimi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] flex-shrink-0" />
                  <span>Temel İK İlerleme Raporlaması</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] flex-shrink-0" />
                  <span>İşletme Eğitim Dashboardu</span>
                </div>
              </div>
            </div>

            <Link
              href="/talep-olustur?paket=start"
              className="w-full py-3.5 px-4 bg-[#0B2A4A] hover:bg-[#061B33] text-white font-bold rounded-xl text-center text-xs transition-all shadow-md block"
            >
              Kurumsal Teklif Al
            </Link>
          </div>

          {/* Tier 2: PKA PROFESSIONAL (Featured Card) */}
          <div className="bg-[#0B2A4A] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#087F96] shadow-2xl flex flex-col justify-between relative transform lg:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#E11D48] text-white text-[11px] font-black rounded-full uppercase tracking-wider shadow-md">
              EN ÇOK TERCİH EDİLEN
            </div>

            <div>
              <div className="inline-block px-3 py-1 bg-white/10 text-[#DDF4F7] text-xs font-black rounded-lg uppercase tracking-wider mb-4 mt-2">
                250 – 1.000 Çalışan
              </div>
              <h3 className="text-2xl font-black text-white">PKA PROFESSIONAL</h3>
              <p className="text-xs text-gray-300 mt-1">
                Yetkinlik, terfi ve yedekleme süreçlerini tam otomatize etmek isteyen büyüme odaklı perakendeciler için.
              </p>

              <div className="my-6 border-t border-white/10 pt-4 space-y-2.5 text-xs text-gray-200 font-medium">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                  <Sparkles className="h-4 w-4 flex-shrink-0" />
                  <span>START Paketindeki Tüm Özellikler +</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Dinamik Yetkinlik Matrisi & Haritalama</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Çok Yönlü Kariyer Planlama Modülü</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Ağırlıklı Terfi Hazırlık Skoru</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Yetenek Havuzu & Pipeline Yönetimi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Kritik Pozisyon Yedekleme Planı</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Çalışan Gelişim Karnesi & 90 Günlük Plan</span>
                </div>
              </div>
            </div>

            <Link
              href="/talep-olustur?paket=professional"
              className="w-full py-3.5 px-4 bg-[#E11D48] hover:bg-[#BE123C] text-white font-black rounded-xl text-center text-xs transition-all shadow-lg block"
            >
              Kurumsal Teklif Al
            </Link>
          </div>

          {/* Tier 3: PKA ENTERPRISE */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-lg flex flex-col justify-between hover:border-[#087F96] transition-all">
            <div>
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-900 text-xs font-black rounded-lg uppercase tracking-wider mb-4">
                1.000+ Çalışan
              </div>
              <h3 className="text-2xl font-black text-[#0B2A4A]">PKA ENTERPRISE</h3>
              <p className="text-xs text-gray-500 mt-1">
                Özel akademi, White-label ve entegrasyon arayan büyük ölçekli kurumlar için.
              </p>

              <div className="my-6 border-t border-gray-100 pt-4 space-y-2.5 text-xs text-gray-700 font-medium">
                <div className="flex items-center space-x-2 text-purple-700 font-bold">
                  <Crown className="h-4 w-4 flex-shrink-0" />
                  <span>PROFESSIONAL Tüm Özellikler +</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] flex-shrink-0" />
                  <span>Şirkete Özel White-Label Akademi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] flex-shrink-0" />
                  <span>Şirkete Özel Müfredat & Video İletimi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] flex-shrink-0" />
                  <span>SAP / Logo / Nebim ERP & HR Entegrasyonu</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] flex-shrink-0" />
                  <span>Train the Trainer (İç Eğitici Programı)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] flex-shrink-0" />
                  <span>Özel Yönetici Analytics & Power BI Panelleri</span>
                </div>
              </div>
            </div>

            <Link
              href="/talep-olustur?paket=enterprise"
              className="w-full py-3.5 px-4 bg-[#0B2A4A] hover:bg-[#061B33] text-white font-bold rounded-xl text-center text-xs transition-all shadow-md block"
            >
              Kurumsal Teklif Al
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
