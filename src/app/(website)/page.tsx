import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import DepartmentGrid from '@/components/DepartmentGrid';
import { prisma } from '@/lib/db';
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
  ShieldCheck,
  BrainCircuit,
  Cpu,
  Target,
  BarChart3,
  Layers,
  ChevronRight,
  UserCheck,
  Building2,
  Briefcase,
  Play,
  FileCheck2,
  Medal,
  Crown
} from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  // DB query fallback metrics
  let totalTrainings = 4452;
  let totalDepartments = 26;
  let totalPrograms = 8;

  try {
    const tCount = await prisma.training.count();
    if (tCount > 0) totalTrainings = tCount;
  } catch (error) {
    console.error('Error querying DB metrics:', error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9]">
      {/* -------------------------------------------------- */}
      {/* 2. HERO ALANI */}
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
                <Link
                  href="/egitimler"
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>1. Eğitimleri Keşfet</span>
                </Link>

                <Link
                  href="/kariyer-yollari"
                  className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-xl transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <Layers className="h-4 w-4 text-[#087F96]" />
                  <span>2. Kariyer Yolunu Gör</span>
                </Link>

                <Link
                  href="/talep-olustur"
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#061B33] hover:bg-black/40 border border-[#087F96]/60 text-white font-bold rounded-xl transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <Building2 className="h-4 w-4 text-[#087F96]" />
                  <span>3. Kurumsal Demo Talep Et</span>
                </Link>
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

                {/* Feature Highlights inside Hero Card */}
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

                <div className="pt-2">
                  <Link
                    href="/panel"
                    className="w-full py-3 bg-[#087F96] hover:bg-[#056B80] text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-md"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Öğrenci & Yönetici Paneline Giriş Yap</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* METRİKLER BANTI */}
      {/* -------------------------------------------------- */}
      <section className="bg-white border-b border-gray-200 py-8 relative z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-100">
            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-[#0B2A4A] font-display">
                {totalTrainings}+
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1 block">
                Stratejik Eğitim Modülü
              </span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-[#087F96] font-display">
                {totalDepartments}
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

      {/* -------------------------------------------------- */}
      {/* 3. 2 YILLIK KARİYER GELİŞİM MODELİ */}
      {/* -------------------------------------------------- */}
      <section id="2-yillik-model" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full uppercase tracking-wider">
            Sistematik Gelişim Mimarisi
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0B2A4A] mt-3">
            Kariyerinizi Tesadüfe Bırakmayın
          </h2>
          <div className="h-1 w-16 bg-[#087F96] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-gray-600 text-base sm:text-lg font-light">
            Perakende Kariyer Akademisi eğitimleri iki yıllık sistematik gelişim modeliyle yapılandırılmıştır.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 1. YIL KARTI */}
          <div className="lg:col-span-5 bg-white border border-gray-200 hover:border-[#087F96] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#087F96] text-white font-black text-xs px-4 py-1.5 rounded-bl-xl font-mono">
              1. YIL MODÜLÜ
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#DDF4F7] text-[#087F96] flex items-center justify-center font-black text-xl mb-4">
                1
              </div>
              <h3 className="font-display font-extrabold text-xl text-[#0B2A4A]">
                TEMEL YETKİNLİK & GÖREVE HÂKİMİYET
              </h3>
              <p className="text-xs text-gray-500 mt-1 mb-6">
                İlk yılda personelin görev bilinci, operasyonel hız, müşteri memnuniyeti ve temel standartları eksiksiz edinmesi hedeflenir.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
                <li className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] shrink-0" />
                  <span>Görev ve sorumluluklar</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] shrink-0" />
                  <span>Operasyonel standartlar</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] shrink-0" />
                  <span>Mağaza süreçleri</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] shrink-0" />
                  <span>Müşteri deneyimi</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] shrink-0" />
                  <span>Satış becerileri</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] shrink-0" />
                  <span>Sistem kullanımı</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] shrink-0" />
                  <span>Temel finansal farkındalık</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] shrink-0" />
                  <span>Departman bazlı mesleki eğitimler</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 bg-[#DDF4F7]/40 p-4 rounded-xl">
              <span className="text-xs font-bold text-[#056B80] block text-center italic">
                “İşini doğru, bağımsız ve standartlara uygun yönet.”
              </span>
            </div>
          </div>

          {/* ORTADAKİ YÜKSELEN KARİYER YOLU / BASAMAK GÖRSELİ */}
          <div className="lg:col-span-2 bg-[#061B33] text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-6 shadow-md border border-[#087F96]/30">
            <div className="w-12 h-12 rounded-full bg-[#087F96] flex items-center justify-center text-white">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-[#DDF4F7]">Sürekli Gelişim</h4>
              <p className="text-[11px] text-gray-300 mt-1">
                Kademeli Yetkinlik Sıçraması
              </p>
            </div>
            
            {/* Visual steps */}
            <div className="w-full space-y-2 text-[10px] font-mono">
              <div className="bg-white/10 p-2 rounded-lg border-l-4 border-[#34A853] text-left">
                ▲ Liderlik & Strateji
              </div>
              <div className="bg-white/10 p-2 rounded-lg border-l-4 border-[#087F96] text-left">
                ▲ KPI & Finans Yönetimi
              </div>
              <div className="bg-white/10 p-2 rounded-lg border-l-4 border-[#DDF4F7] text-left">
                ▲ Görev ve Standartlar
              </div>
            </div>

            <Link
              href="/kariyer-yollari"
              className="text-xs text-[#087F96] hover:text-white font-bold underline flex items-center"
            >
              <span>Tüm Yolları İncele</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </div>

          {/* 2. YIL KARTI */}
          <div className="lg:col-span-5 bg-[#0B2A4A] text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden border border-[#087F96]/40">
            <div className="absolute top-0 right-0 bg-[#34A853] text-white font-black text-xs px-4 py-1.5 rounded-bl-xl font-mono">
              2. YIL MODÜLÜ
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#087F96] text-white flex items-center justify-center font-black text-xl mb-4 shadow-md">
                2
              </div>
              <h3 className="font-display font-extrabold text-xl text-white">
                İLERİ YETKİNLİK & KARİYER GELİŞİMİ
              </h3>
              <p className="text-xs text-gray-300 mt-1 mb-6">
                İkinci yılda çalışan veri odaklı analiz, finans, yapay zekâ ve liderlik becerileri edinerek üst yönetime hazırlanır.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-gray-200">
                <li className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#34A853] shrink-0" />
                  <span>KPI ve performans yönetimi</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#34A853] shrink-0" />
                  <span>Finans ve kârlılık</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#34A853] shrink-0" />
                  <span>Veri analitiği</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#34A853] shrink-0" />
                  <span>CRM & Müşteri Analitiği</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#34A853] shrink-0" />
                  <span>Liderlik</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#34A853] shrink-0" />
                  <span>Yapay zekâ kullanımı</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#34A853] shrink-0" />
                  <span>Süreç geliştirme</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#34A853] shrink-0" />
                  <span>Stratejik yönetim</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 bg-white/10 p-4 rounded-xl">
              <span className="text-xs font-bold text-[#DDF4F7] block text-center italic">
                “Sonuç üret, süreç geliştir ve bir üst kariyer seviyesine hazırlan.”
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* KASİYERLİKTEN OPERASYON MÜDÜRÜNE ÖZET KARİYER YOLCULUĞU BANNERI */}
      {/* -------------------------------------------------- */}
      <section className="py-14 bg-gradient-to-r from-[#0B2A4A] via-[#061B33] to-[#0B2A4A] text-white border-y border-[#087F96]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#DDF4F7] bg-[#087F96] px-3.5 py-1 rounded-full uppercase tracking-wider">
                15 Basamaklı Kariyer Navigasyonu
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-white mt-2">
                Kasadan CEO Koltuğuna Kariyer Yolculuğu
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm mt-1 font-light">
                Perakendede kariyer tesadüf değildir. Doğru eğitim, saha deneyimi, ölçülebilir performans ve gelişimle adım adım inşa edilir.
              </p>
            </div>

            <Link
              href="/operasyon-kariyer-yolculugu"
              className="px-6 py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm inline-flex items-center space-x-2 shrink-0 border border-white/20"
            >
              <span>Tüm Kariyer Yolculuğunu Keşfet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Summary Stepper Flow (8 Highlights) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 relative">
            {[
              { title: 'Kasiyer', desc: 'Kendi İşini Yönet' },
              { title: 'Takım Lideri', desc: 'Ekibi Koordine Et' },
              { title: 'Müdür Yardımcısı', desc: 'Günlük Operasyonu Yönet' },
              { title: 'Mağaza Müdürü', desc: 'İş Sonuçlarını Yönet' },
              { title: 'Bölge Müdürü', desc: 'Mağaza Müdürlerini Yönet' },
              { title: 'Operasyon Müdürü', desc: 'Operasyon Sistemini Yönet' },
              { title: 'Genel Müdür', desc: 'Şirketi Yönet' },
              { title: 'CEO', desc: 'Geleceği Yönet' }
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-white/10 border border-white/15 rounded-2xl p-3.5 relative space-y-1.5 hover:bg-white/20 hover:border-[#087F96] transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold text-[#087F96] bg-white px-1.5 py-0.5 rounded">
                    #{idx + 1}
                  </span>
                  {idx === 7 ? (
                    <Crown className="w-3.5 h-3.5 text-yellow-300" />
                  ) : (
                    <span className="text-[10px] text-gray-400 font-mono">→</span>
                  )}
                </div>
                <h3 className="font-display font-extrabold text-xs text-white group-hover:text-[#DDF4F7] transition-colors leading-tight">
                  {step.title}
                </h3>
                <p className="text-[10px] text-gray-300 font-light leading-tight">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 4. EĞİTİM ANA MODÜLLERİ (8 Core Modules) */}
      {/* -------------------------------------------------- */}
      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full uppercase">
              Müfredat Yapısı
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0B2A4A] mt-2">
              Perakendeye Özel Eğitim Modülleri
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 font-light">
              Perakendecilik operasyonlarının 8 temel disiplininde yapılandırılmış uzmanlık kartları.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1 */}
            <div className="bg-[#F4F7F9] border border-gray-200 hover:border-[#087F96] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#DDF4F7] text-[#087F96] flex items-center justify-center group-hover:bg-[#087F96] group-hover:text-white transition-colors mb-4">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A]">1. Mağaza Yönetimi ve Operasyon</h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Mağaza düzeni, stok kabul, vardiya yönetimi, kasa disiplini ve mağaza açılış/kapanış standartları.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs font-bold text-[#087F96] bg-white px-2.5 py-1 rounded-md border border-gray-200">
                  920+ Eğitim
                </span>
                <Link href="/egitimler?cat=magaza-yonetimi" className="text-xs font-bold text-[#087F96] hover:underline flex items-center">
                  <span>Eğitimleri Gör</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* 2 */}
            <div className="bg-[#F4F7F9] border border-gray-200 hover:border-[#087F96] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#DDF4F7] text-[#087F96] flex items-center justify-center group-hover:bg-[#087F96] group-hover:text-white transition-colors mb-4">
                  <UserCheck className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A]">2. Satış, Pazarlama ve Müşteri Yönetimi</h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  İkna edici satış teknikleri, çapraz satış, müşteri ilişkileri etiketi ve kampanya saha uygulamaları.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs font-bold text-[#087F96] bg-white px-2.5 py-1 rounded-md border border-gray-200">
                  640+ Eğitim
                </span>
                <Link href="/egitimler?cat=satis-pazarlama" className="text-xs font-bold text-[#087F96] hover:underline flex items-center">
                  <span>Eğitimleri Gör</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* 3 */}
            <div className="bg-[#F4F7F9] border border-gray-200 hover:border-[#087F96] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#DDF4F7] text-[#087F96] flex items-center justify-center group-hover:bg-[#087F96] group-hover:text-white transition-colors mb-4">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A]">3. Finans ve Operasyonel Mükemmellik</h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Mağaza Kar-Zarar (P&L), fire minimizasyonu, stok devir hızı (GMROI) ve maliyet optimizasyonu.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs font-bold text-[#087F96] bg-white px-2.5 py-1 rounded-md border border-gray-200">
                  510+ Eğitim
                </span>
                <Link href="/egitimler?cat=finans" className="text-xs font-bold text-[#087F96] hover:underline flex items-center">
                  <span>Eğitimleri Gör</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* 4 */}
            <div className="bg-[#F4F7F9] border border-gray-200 hover:border-[#087F96] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#DDF4F7] text-[#087F96] flex items-center justify-center group-hover:bg-[#087F96] group-hover:text-white transition-colors mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A]">4. İnsan Kaynakları, Liderlik ve Yöneticilik</h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Ekip motivasyonu, sirkülasyon düşürme, performans koçluğu ve yet yetkinlik değerlendirmesi.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs font-bold text-[#087F96] bg-white px-2.5 py-1 rounded-md border border-gray-200">
 me               430+ Eğitim
                </span>
                <Link href="/egitimler?cat=insan-kaynaklari" className="text-xs font-bold text-[#087F96] hover:underline flex items-center">
                  <span>Eğitimleri Gör</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* 5 */}
            <div className="bg-[#F4F7F9] border border-gray-200 hover:border-[#087F96] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#DDF4F7] text-[#087F96] flex items-center justify-center group-hover:bg-[#087F96] group-hover:text-white transition-colors mb-4">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A]">5. Dijitalleşme ve Yenilikçi Perakendecilik</h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Omnichannel perakendecilik, hızlı teslimat (dark store), barkod/POS entegrasyonu ve e-ticaret.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs font-bold text-[#087F96] bg-white px-2.5 py-1 rounded-md border border-gray-200">
                  380+ Eğitim
                </span>
                <Link href="/egitimler?cat=dijitallestirme" className="text-xs font-bold text-[#087F96] hover:underline flex items-center">
                  <span>Eğitimleri Gör</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* 6 */}
            <div className="bg-[#F4F7F9] border border-gray-200 hover:border-[#087F96] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#DDF4F7] text-[#087F96] flex items-center justify-center group-hover:bg-[#087F96] group-hover:text-white transition-colors mb-4">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A]">6. Stratejik Yönetim ve Liderlik Gelişimi</h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Bölgesel büyüme modelleri, rakip analizi, değişim yönetimi ve üst düzey liderlik vizyonu.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs font-bold text-[#087F96] bg-white px-2.5 py-1 rounded-md border border-gray-200">
                  290+ Eğitim
                </span>
                <Link href="/egitimler?cat=stratejik-yonetim" className="text-xs font-bold text-[#087F96] hover:underline flex items-center">
                  <span>Eğitimleri Gör</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* 7 */}
            <div className="bg-[#F4F7F9] border border-gray-200 hover:border-[#087F96] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#DDF4F7] text-[#087F96] flex items-center justify-center group-hover:bg-[#087F96] group-hover:text-white transition-colors mb-4">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A]">7. CRM ve Müşteri İlişkileri Yönetimi</h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  RFM müşteri segmentasyonu, sadakat kartı stratejileri, CLV hesaplama ve sepet büyütme.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs font-bold text-[#087F96] bg-white px-2.5 py-1 rounded-md border border-gray-200">
                  320+ Eğitim
                </span>
                <Link href="/egitimler?cat=crm" className="text-xs font-bold text-[#087F96] hover:underline flex items-center">
                  <span>Eğitimleri Gör</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* 8 */}
            <div className="bg-[#F4F7F9] border border-gray-200 hover:border-[#087F96] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#DDF4F7] text-[#087F96] flex items-center justify-center group-hover:bg-[#087F96] group-hover:text-white transition-colors mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A]">8. Taze Gıda ve Hizmet Reyonları</h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Kasap, şarküteri, meyve-sebze, fırın ve kuruyemiş reyonları hijyen, randıman ve fire yönetimi.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs font-bold text-[#087F96] bg-white px-2.5 py-1 rounded-md border border-gray-200">
                  950+ Eğitim
                </span>
                <Link href="/taze-gida-akademisi" className="text-xs font-bold text-[#087F96] hover:underline flex items-center">
                  <span>Eğitimleri Gör</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 5. DEPARTMAN BAZLI EĞİTİMLER (26 Pozisyon Grid) */}
      {/* -------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full uppercase">
            Rol ve Kadro Bazlı Müfredat
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0B2A4A] mt-2">
            Pozisyonunuza ve Departmanınıza Özel Eğitim Yolculuğu
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2 font-light">
            Perakendedeki 26 farklı uzmanlık alanından pozisyonunuzu seçin; 1. ve 2. yıl eğitim haritanızı inceleyin.
          </p>
        </div>

        {/* Interactive Client Component rendering all 26 positions */}
        <DepartmentGrid />
      </section>

      {/* -------------------------------------------------- */}
      {/* 9. TAZE GIDA AKADEMİSİ ÖZEL BÖLÜMÜ */}
      {/* -------------------------------------------------- */}
      <section className="bg-gradient-to-r from-[#0B2A4A] to-[#061B33] text-white py-20 border-y border-[#087F96]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#DDF4F7] bg-[#087F96] px-3 py-1 rounded-full uppercase">
                Özel Uzmanlık Alanı
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl">
                Taze Gıda ve Hizmet Reyonları Akademisi
              </h2>
              <p className="text-gray-200 font-light leading-relaxed">
                Perakendede kârlılığın ve müşteri sadakatinin kalbi Taze Gıda reyonlarıdır. Meyve Sebzeden Kasaba, Şarküteriden Unlu Mamullere kadar 7 kritik reyonun tüm saha standartları.
              </p>

              {/* Sub-groups badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Meyve Sebze', 'Açık Şarküteri', 'Kasap', 'Kuruyemiş', 'Unlu Mamuller', 'Hazır Yemek', 'Taze Gıda Yönetimi'].map((item) => (
                  <span key={item} className="bg-white/10 border border-[#087F96]/40 px-3 py-1 rounded-lg text-xs font-semibold text-[#DDF4F7]">
                    {item}
                  </span>
                ))}
              </div>

              {/* Operational focus topics (12 topics) */}
              <div className="grid grid-cols-3 gap-2 text-center pt-4 font-mono text-[11px]">
                {['Ürün Bilgisi', 'Hijyen', 'Gıda Güvenliği', 'Müşteri Hizmetleri', 'Satış', 'Sipariş', 'Stok', 'Fire', 'Randıman', 'Gramaj', 'Teşhir', 'Kârlılık'].map((item) => (
                  <div key={item} className="bg-white/5 border border-white/10 p-2 rounded-md text-gray-200">
                    ✓ {item}
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/taze-gida-akademisi"
                  className="px-6 py-3.5 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl shadow-lg transition-all inline-flex items-center space-x-2 text-sm"
                >
                  <span>Taze Gıda Akademisini İncele</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#061B33] border border-[#087F96]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              <h3 className="font-display font-bold text-xl text-white border-b border-white/10 pb-3 flex items-center justify-between">
                <span>Taze Gıda KPI & Randıman Simülasyonu</span>
                <span className="text-xs bg-[#34A853]/20 text-[#34A853] px-2.5 py-0.5 rounded-full font-mono">Saha Modeli</span>
              </h3>

              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 block">Orjinal Kasap Karkas Fire Oranı</span>
                    <span className="text-sm font-bold text-gray-200">Standard: %14.2</span>
                  </div>
                  <span className="text-lg font-bold text-[#34A853] font-mono">→ %8.4 Target</span>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 block">Şarküteri Gramaj & Randıman Hata Payı</span>
                    <span className="text-sm font-bold text-gray-200">Sıfır Tolerans Hijyen</span>
                  </div>
                  <span className="text-lg font-bold text-[#087F96] font-mono">%100 Uyum</span>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 block">Meyve Sebze Tazelik & Rotasyon Hızı</span>
                    <span className="text-sm font-bold text-gray-200">Daily HAL Supply Cycle</span>
                  </div>
                  <span className="text-lg font-bold text-[#DDF4F7] font-mono">+%22 Ciro Artışı</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 10. YAPAY ZEKÂ VE DİJİTAL PERAKENDE */}
      {/* -------------------------------------------------- */}
      <section className="py-20 bg-[#061B33] text-white border-b border-[#087F96]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#DDF4F7] bg-[#087F96] px-3.5 py-1 rounded-full uppercase tracking-wider">
              Geleceğin Perakendeciliği
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl mt-3 text-white">
              Perakendede Yapay Zekâ ve Dijital Dönüşüm
            </h2>
            <div className="h-1 w-20 bg-[#087F96] mx-auto mt-3 mb-4 rounded-full" />
            <p className="text-gray-300 text-sm sm:text-base font-light">
              Geleneksel perakende operasyonlarını yapay zekâ, talep tahmini ve veri analitiği ile yeni nesil seviyeye taşıyın.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Perakendede Yapay Zekâ Kullanımı', desc: 'Mağaza içi stok, fiyatlandırma ve müşteri davranış modellerinde yapay zekâ uygulamaları.' },
              { title: 'Üretken YZ ve Etkili Prompt Kullanımı', desc: 'ChatGPT, Claude ve LLM araçları ile perakende raporları, e-posta ve içerik üretimi.' },
              { title: 'YZ ile Raporlama ve Veri Analizi', desc: 'Büyük mağazacılık verilerinin yapay zekâ ile anlık analizi ve karar destek sistemleri.' },
              { title: 'YZ ile Talep Tahmini & Sipariş Opt.', desc: 'Hava durumu, özel gün ve geçmiş satış verileri ile sıfır zayi otomatik sipariş.' },
              { title: 'Yapay Zekâ Destekli Mağaza Yönetimi', desc: 'Vardiya çakışmaları, reyon doluluk takibi ve kameralı fire algılama sistemleri.' },
              { title: 'YZ’de Veri Güvenliği, KVKK & Etik', desc: 'Müşteri verisinin korunması, yapay zekâ etik ilkeleri ve yasal perakende çerçevesi.' },
              { title: 'YZ ile CRM ve Müşteri Analitiği', desc: 'Kişiselleştirilmiş sepet önerileri, kayıp müşteri (churn) tahmini ve dinamik teklif.' },
              { title: 'CEO / Genel Müdür İçin Yapay Zekâ', desc: 'Üst düzey yöneticilere özel yapay zekâ stratejisi, yatırım getirisi ve dijital liderlik.' }
            ].map((course, idx) => (
              <div
                key={idx}
                className="bg-[#0B2A4A] border border-[#087F96]/40 hover:border-[#087F96] rounded-xl p-5 shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#087F96]/30 text-[#DDF4F7] flex items-center justify-center mb-3 group-hover:bg-[#087F96] group-hover:text-white transition-colors">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-white group-hover:text-[#DDF4F7] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed font-light">
                    {course.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[#34A853] font-mono font-bold">Yapay Zekâ Sertifikalı</span>
                  <Link href="/yapay-zeka" className="text-[#087F96] hover:text-white font-semibold flex items-center">
                    İncele <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/yapay-zeka"
              className="px-8 py-3.5 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl shadow-lg transition-all inline-flex items-center space-x-2 text-sm"
            >
              <Cpu className="h-4 w-4" />
              <span>Yapay Zekâ ve Perakende Sayfasına Git</span>
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 11. YÖNETİCİ GELİŞİM PROGRAMLARI */}
      {/* -------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full uppercase">
            Geleceğin Liderleri
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0B2A4A] mt-2">
            Yönetici Gelişim Programları
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2 font-light">
            Saha uygulaması, final projesi ve ölçülebilir performans değerlendirmeli özel gelişim programları.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Mağaza Müdürü Yetiştirme', duration: '6 Ay', desc: 'Mağaza müdür yardımcılığından tam yetkili mağaza müdürlüğüne geçiş programı.' },
            { title: 'Mağaza Müdürü Geliştirme', duration: '3 Ay', desc: 'Kıdemli mağaza müdürleri için P&L kârlılığı, liderlik ve yüksek performans.' },
            { title: 'Bölge Müdürü Yetiştirme', duration: '6 Ay', desc: 'Çoklu mağaza yönetimi, bölgesel bütçeleme ve bölge liderliği hazırlığı.' },
            { title: 'Bölge Müdürü Geliştirme', duration: '3 Ay', desc: 'Aktif bölge müdürleri için stratejik perakendecilik, lokasyon analizi ve verimlilik.' },
            { title: 'CEO / Genel Müdür Gelişim', duration: '4 Ay', desc: 'Şirket sahipleri ve genel müdürler için vizyoner liderlik ve dijital perakende.' },
            { title: 'İş ve Süreç Geliştirme', duration: '4 Ay', desc: 'Perakende süreç optimizasyonu, israf önleme ve verimlilik mühendisliği.' },
            { title: 'CRM Yöneticisi Yetiştirme', duration: '3 Ay', desc: 'Veriye dayalı pazarlama, müşteri sadakat sistemleri ve CLV yönetimi.' },
            { title: 'Satış Müdürü Yetiştirme', duration: '4 Ay', desc: 'Saha satış hedefleri, mağaza içi tutundurma ve satış ekibi koçluğu.' }
          ].map((prog, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#087F96] mb-3">
                  <span className="bg-[#DDF4F7] px-2.5 py-1 rounded-full uppercase">Program</span>
                  <span className="text-gray-500 font-mono">{prog.duration} Süre</span>
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A]">
                  {prog.title}
                </h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  {prog.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Final Projesi & Sertifika</span>
                <Link href="/programlar" className="text-[#087F96] font-bold hover:underline">
                  Detaylar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 12. KURUMSAL AKADEMİ ÇÖZÜMLERİ (B2B) */}
      {/* -------------------------------------------------- */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full uppercase">
                B2B Perakende Akademisi
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0B2A4A]">
                Kurumunuza Özel Perakende Eğitim Akademisi
              </h2>
              <p className="text-gray-600 font-light leading-relaxed">
                Market zinciriniz için özel eğitim akademisi kurun; çalışan gelişimini, sınavları, sertifikaları ve kariyer planlarını tek platformdan yönetin.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700 pt-2">
                {[
                  'Kurumsal eğitim ihtiyaç analizi',
                  'Şirkete özel akademi kurulumu',
                  'Eğitim içeriklerinin özelleştirilmesi',
                  'İç eğitmen yetiştirme (TTT)',
                  'Sınav ve sertifikasyon altyapısı',
                  'Yetkinlik matrisi ve kariyer planı',
                  'Kariyer ve yedekleme planı',
                  'Eğitim KPI ölçümü & Yönetici paneli'
                ].map((serv, i) => (
                  <div key={i} className="flex items-center space-x-2 bg-[#F4F7F9] p-2.5 rounded-lg border border-gray-200/60">
                    <CheckCircle2 className="h-4 w-4 text-[#087F96] shrink-0" />
                    <span>{serv}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/talep-olustur"
                  className="px-8 py-4 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl shadow-lg transition-all inline-flex items-center space-x-2 text-sm"
                >
                  <Building2 className="h-4 w-4" />
                  <span>Kurumsal Demo Talep Et</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#0B2A4A] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-[#087F96]/40 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-display font-bold text-xl text-white">
                  Train The Trainer – İç Eğitmen Programı
                </h3>
                <p className="text-xs text-gray-300 mt-1 font-light">
                  Akademilerin sürdürülebilirliğini sağlayacak kurum içi eğitmen yetiştirme programı.
                </p>
              </div>

              <div className="space-y-3 text-xs text-gray-200">
                <div className="bg-white/5 p-3 rounded-lg flex items-start space-x-3">
                  <Medal className="h-5 w-5 text-[#087F96] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white">Saha Eğitmen Yetkinliği</h4>
                    <p className="text-gray-300 text-[11px]">Şirket içi başarılı mağaza müdürlerini ve reyon şeflerini sertifikalı akademi eğitmeni yapın.</p>
                  </div>
                </div>

                <div className="bg-white/5 p-3 rounded-lg flex items-start space-x-3">
                  <FileCheck2 className="h-5 w-5 text-[#34A853] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white">Standart Eğitim Müfredatı</h4>
                    <p className="text-gray-300 text-[11px]">Tüm şubelerinizde aynı kalitede mağazacılık standartlarını iç eğitmenlerle yayın.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 14. ÖLÇME VE SERTİFİKASYON FLOWCHART */}
      {/* -------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full uppercase">
            Ölçülebilir Başarı
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0B2A4A] mt-2">
            Eğitim Değil, Ölçülebilir Gelişim
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2 font-light">
            Katılımcıların yetkinlik artışı ön testten saha KPI takibine kadar 8 adımlı metodoloji ile izlenir.
          </p>
        </div>

        {/* Visual Flowchart */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
          {[
            { step: '1', title: 'Ön Test', desc: 'Mevcut yetkinlik seviyesi tespiti' },
            { step: '2', title: 'Eğitim', desc: 'Teorik & dijital modül anlatımı' },
            { step: '3', title: 'Uygulama', desc: 'Simülatör & pratik vaka senaryosu' },
            { step: '4', title: 'Son Test', desc: 'Bilgi ve öğrenme ölçümü' },
            { step: '5', title: 'Saha Değ.', desc: 'Mağaza içi gözlem ve denetim' },
            { step: '6', title: 'KPI Takibi', desc: 'Fire, ciro & sepet takibi (30-60-90 gün)' },
            { step: '7', title: 'Yetkinlik', desc: 'Son yetkinlik skor güncellemesi' },
            { step: '8', title: 'Sertifika', desc: 'QR kod doğrulamalı kurumsal belge' }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-[#087F96] transition-all flex flex-col items-center justify-between">
              <div className="w-8 h-8 rounded-full bg-[#087F96] text-white text-xs font-bold font-mono flex items-center justify-center mb-2">
                {item.step}
              </div>
              <h3 className="font-display font-bold text-xs text-[#0B2A4A]">{item.title}</h3>
              <p className="text-[10px] text-gray-500 mt-1 leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* CTA SECTION */}
      {/* -------------------------------------------------- */}
      <section className="bg-gradient-to-br from-[#0B2A4A] to-[#087F96] text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-display font-black text-3xl sm:text-4xl">
            Perakende Kariyer Akademisi İle Geleceğinizi Yapılandırın
          </h2>
          <p className="text-gray-100 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            İster bireysel kariyer basamaklarını tırmanın, ister yüzlerce mağazalık zincirinizin yetkinlik akademisini kurun.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/talep-olustur"
              className="w-full sm:w-auto px-8 py-4 bg-[#061B33] hover:bg-black/50 border border-white/20 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 text-sm"
            >
              <Building className="h-5 w-5 text-[#087F96]" />
              <span>Kurumsal Demo Talep Et</span>
            </Link>
            <Link
              href="/sertifikasyon"
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#0B2A4A] hover:bg-gray-100 font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-sm"
            >
              <Award className="h-5 w-5 text-[#087F96]" />
              <span>Sertifika Doğrulama Sistemi</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
