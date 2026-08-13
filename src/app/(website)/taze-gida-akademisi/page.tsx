import React from 'react';
import Link from 'next/link';
import { Apple, Utensils, Beef, Cookie, Cake, CheckCircle2, ArrowRight, ShieldCheck, TrendingUp, Clock, Scale } from 'lucide-react';

export default function TazeGidaAkademisiPage() {
  const freshFoodSubgroups = [
    {
      id: 'meyve-sebze',
      name: 'Meyve Sebze Akademisi',
      icon: Apple,
      desc: 'Hal alımından mağaza sergilemesine, renk uyumundan fire minimizasyonuna günlük taze reyondur.',
      topics: ['Günlük HAL Tedarik', 'Nem & Sıcaklık Dengesi', 'Terazi Kalibrasyonu', 'Fire Çeşitleri & Zayi Önleme'],
      coursesCount: 24
    },
    {
      id: 'acik-sarkuteri',
      name: 'Açık Şarküteri Akademisi',
      icon: Utensils,
      desc: 'Gıda hijyeni, çapraz bulaşma önleme, dilimleme hassasiyeti, gramaj ve yöresel peynir/zeytin sunumu.',
      topics: ['Soğuk Zincir Yönetimi', 'Bulaşmasız Dilimleme', 'Gramaj & Ikram Etiği', 'Sıfır Tolerans Hijyen'],
      coursesCount: 22
    },
    {
      id: 'kasap',
      name: 'Kasap Reyonu Akademisi',
      icon: Beef,
      desc: 'Bıçak ustalığı, karkas et parçalama, randıman hesabı, marinasyon ve yüksek kârlı kıyma tebliği.',
      topics: ['Karkas Randıman Analizi', 'Bıçak Güvenliği', 'Özel Kesim Teknikleri', 'Kıyma & İşlenmiş Et Standartları'],
      coursesCount: 26
    },
    {
      id: 'kuruyemis',
      name: 'Kuruyemiş Akademisi',
      icon: Cookie,
      desc: 'Taze kuruyemiş muhafazası, kavurma hassasiyeti, nem derecesi, gramaj ve hızlı stok rotasyonu.',
      topics: ['Nem & Tazelik Kontrolü', 'Taze Kavurma Standartları', 'Hızlı Stok Rotasyonu', 'Gramaj Hassasiyeti'],
      coursesCount: 16
    },
    {
      id: 'unlu-mamuller',
      name: 'Unlu Mamuller Akademisi',
      icon: Cake,
      desc: 'Saatlik taze fırın pişirme planı, unlu mamul kârlılığı, sunum estetiği ve son kullanma tarihi takibi.',
      topics: ['Saatlik Pişirme Takvimi', 'Fırın Derece Yönetimi', 'Zayi & Fire Analizi', 'Reçete Maliyet Hesabı'],
      coursesCount: 20
    },
    {
      id: 'hazir-yemek',
      name: 'Hazır Yemek Akademisi',
      icon: Utensils,
      desc: 'Sıcak tezgah yemekleri, günlük menü planlaması, gıda güvenliği denetimi ve sıcak teşhir estetiği.',
      topics: ['Sıcak Tezgah Hijyeni', 'Günlük Menü Reçetesi', 'Mutfak Maliyet Takibi', 'Servis Hızı & Nezaket'],
      coursesCount: 18
    },
    {
      id: 'taze-gida-yonetimi',
      name: 'Taze Gıda Yönetimi Akademisi',
      icon: TrendingUp,
      desc: 'Tüm taze gıda reyonlarının bütünleşik brüt marj, fire oranı, tedarik zinciri ve denetim koordinasyonu.',
      topics: ['Bütünleşik Brüt Marj', 'Fire & Randıman Denetimi', 'Tedarikçi & HAL Yönetimi', 'HACCP Gıda Güvenliği'],
      coursesCount: 30
    }
  ];

  const focusPoints = [
    'Ürün Bilgisi', 'Hijyen', 'Gıda Güvenliği', 'Müşteri Hizmetleri',
    'Satış', 'Sipariş', 'Stok', 'Fire',
    'Randıman', 'Gramaj', 'Teşhir', 'Kârlılık'
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="bg-[#0B2A4A] text-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[#087F96]/30 text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#DDF4F7] bg-[#087F96] px-3.5 py-1 rounded-full uppercase tracking-wider">
            Özel Perakende Disiplini
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl">
            Taze Gıda ve Hizmet Reyonları Akademisi
          </h1>
          <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
            Perakendede kârlılığın ve müşteri sadakatinin %60'ı Taze Gıda reyonlarından gelir. Saha standartlarına tam uyumlu 7 özel akademi ile fireyi düşürün, brüt marjı artırın.
          </p>
        </div>

        {/* 12 Operational Focus Highlights */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
          <h3 className="font-display font-bold text-base text-[#0B2A4A] text-center">
            Taze Gıda Akademisi Temel İş Odakları
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-center text-xs font-semibold">
            {focusPoints.map((point, idx) => (
              <div key={idx} className="bg-[#DDF4F7]/50 border border-[#087F96]/20 p-3 rounded-xl text-[#0B2A4A] flex items-center justify-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#087F96]" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subgroups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freshFoodSubgroups.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#DDF4F7] text-[#087F96] flex items-center justify-center group-hover:bg-[#087F96] group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold text-[#087F96] font-mono bg-[#DDF4F7] px-2.5 py-1 rounded-full">
                      {group.coursesCount} Modül
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#0B2A4A]">
                    {group.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed font-light">
                    {group.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-700">
                    {group.topics.map((t, i) => (
                      <div key={i} className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#087F96]" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Link
                    href={`/egitimler?dept=${group.id}`}
                    className="w-full py-2.5 bg-[#087F96] hover:bg-[#056B80] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>Eğitimleri İncele</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
