import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import PromotionReadinessModule from '@/components/PromotionReadinessModule';
import TalentPoolModule from '@/components/TalentPoolModule';
import SuccessionPlanModule from '@/components/SuccessionPlanModule';
import CompetencyPassport from '@/components/CompetencyPassport';
import CareerMapInteractive from '@/components/CareerMapInteractive';
import EmployeeScorecard from '@/components/EmployeeScorecard';
import EnterpriseDashboardPreview from '@/components/EnterpriseDashboardPreview';
import DigitalBadgesSection from '@/components/DigitalBadgesSection';
import RetailSubSectorsSection from '@/components/RetailSubSectorsSection';
import CorporatePackagesSection from '@/components/CorporatePackagesSection';
import FounderSection from '@/components/FounderSection';
import AdvisoryBoardSection from '@/components/AdvisoryBoardSection';
import SuccessStoriesSection from '@/components/SuccessStoriesSection';
import EnterpriseROICalculator from '@/components/EnterpriseROICalculator';

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
  Crown,
  HelpCircle,
  Zap,
  Lock,
  Search,
  Check
} from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9]">
      {/* -------------------------------------------------- */}
      {/* 1. HERO ALANI */}
      {/* -------------------------------------------------- */}
      <section className="relative bg-gradient-to-br from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white overflow-hidden py-16 sm:py-24 border-b border-[#087F96]/30">
        {/* Glow circles */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#087F96]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#DDF4F7]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero Copy & 2 Main CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold text-[#DDF4F7]">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span>Perakende HR & Kariyer Teknolojisi Platformu</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Perakende Sektörünün Kariyer, Yetkinlik ve <span className="text-[#DDF4F7]">Yönetici Yetiştirme Platformu</span>
              </h1>

              {/* Subtitle */}
              <p className="text-gray-200 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Çalışanların kariyer yolunu görünür hale getirir, yetkinliklerini ölçer ve geliştirir; perakende işletmelerinin geleceğin mağaza yöneticilerini, bölge yöneticilerini ve üst düzey liderlerini bugünden belirlemesine yardımcı olur.
              </p>

              {/* 2 Main CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 max-w-xl mx-auto lg:mx-0">
                {/* CTA 1: Kariyerimi Planla */}
                <Link
                  href="/kariyerimi-planla"
                  className="group p-4 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-white/20 text-left flex flex-col justify-between"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black uppercase tracking-wider text-white">Kariyerimi Planla</span>
                    <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                  <span className="text-xs text-blue-100 font-normal mt-2">
                    Mevcut ve hedef pozisyonunu seç, yol haritanı gör
                  </span>
                </Link>

                {/* CTA 2: Kurumsal Çözümleri İncele */}
                <Link
                  href="/ik-cozumlari"
                  className="group p-4 bg-gradient-to-r from-[#E11D48] to-[#BE123C] hover:opacity-95 text-white font-extrabold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-left flex flex-col justify-between"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black uppercase tracking-wider text-white">Kurumsal Çözümleri İncele</span>
                    <Building2 className="h-4 w-4 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-xs text-rose-100 font-normal mt-2">
                    İnsan Kaynakları, CEO, Genel Müdür ve işverenler için
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Col: Live Interactive Dashboard / Career Mockup */}
            <div className="lg:col-span-5">
              <div className="bg-[#061B33]/90 backdrop-blur-xl border border-[#087F96]/40 rounded-3xl p-6 shadow-2xl space-y-4 relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-[#087F96] flex items-center justify-center font-bold text-white text-xs">
                      PKA
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">Canlı Yönetici Dashboardı</div>
                      <div className="text-[10px] text-gray-400">Genel Merkez & Şube Görünümü</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-bold">
                    CANLI PANEL
                  </span>
                </div>

                {/* Mockup Dashboard Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] text-gray-400">Terfi Hazırlık Skoru</div>
                    <div className="text-xl font-black text-emerald-400 mt-0.5">%83</div>
                    <div className="text-[9px] text-emerald-300">Terfiye Hazır (Mağaza Müdürü)</div>
                  </div>

                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] text-gray-400">Kritik Pozisyon Yedekleme</div>
                    <div className="text-xl font-black text-[#DDF4F7] mt-0.5">%72</div>
                    <div className="text-[9px] text-blue-300">18 Mağaza Müdürü Adayı</div>
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-gray-300 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span className="font-semibold text-white">Ahmet Yılmaz</span>
                  </div>
                  <span className="text-[11px] text-gray-400">Mağaza Müdürü Aday Havuzunda</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 2. ANA SAYFADA İKİ AYRI KULLANICI YOLCULUĞU */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2A4A] tracking-tight">
              İki Ayrı İhtiyaç, Tek Entegre Platform
            </h2>
            <p className="mt-2 text-base text-gray-600">
              İster perakende kariyerinizi adım adım planlayın, ister kurumsal yapınızda geleceğin liderlerini yetiştirin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: PERAKENDE ÇALIŞANLARI İÇİN */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-200 shadow-xl flex flex-col justify-between space-y-6 hover:border-[#087F96] transition-all">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">
                  <UserCheck className="h-4 w-4 text-[#087F96]" />
                  <span>PERAKENDE ÇALIŞANLARI İÇİN</span>
                </div>

                <h3 className="text-2xl font-black text-[#0B2A4A]">
                  Perakendede kariyerini tesadüfe bırakma.
                </h3>

                {/* Flow */}
                <div className="space-y-3 pt-2 text-xs text-gray-700 font-medium">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-[#0B2A4A] text-white text-[10px] font-bold flex items-center justify-center">1</span>
                    <span>Pozisyonunu ve Hedefini Seç</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-[#0B2A4A] text-white text-[10px] font-bold flex items-center justify-center">2</span>
                    <span>Yetkinliklerini ve Eksiklerini Ölç</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-[#0B2A4A] text-white text-[10px] font-bold flex items-center justify-center">3</span>
                    <span>Gelişim Yol Haritanı Gör</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-[#0B2A4A] text-white text-[10px] font-bold flex items-center justify-center">4</span>
                    <span>Eğitim Modüllerini Tamamla</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-[#0B2A4A] text-white text-[10px] font-bold flex items-center justify-center">5</span>
                    <span>Sertifika ve Dijital Rozet Kazan</span>
                  </div>
                  <div className="flex items-center space-x-2 font-bold text-[#087F96]">
                    <span className="w-5 h-5 rounded-full bg-[#087F96] text-white text-[10px] font-bold flex items-center justify-center">6</span>
                    <span>Bir Sonraki Kariyer Seviyene Hazırlan</span>
                  </div>
                </div>
              </div>

              <Link
                href="/kariyerimi-planla"
                className="w-full py-4 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl text-center text-xs shadow-lg transition-all"
              >
                Kariyer Yolculuğumu Başlat
              </Link>
            </div>

            {/* Card 2: PERAKENDE İŞLETMELERİ VE İNSAN KAYNAKLARI İÇİN */}
            <div className="bg-[#0B2A4A] text-white p-8 rounded-3xl border border-[#087F96]/40 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-white/10 text-[#DDF4F7] px-3 py-1 rounded-full text-xs font-bold">
                  <Building2 className="h-4 w-4 text-emerald-400" />
                  <span>PERAKENDE İŞLETMELERİ VE İK İÇİN</span>
                </div>

                <h3 className="text-2xl font-black text-white">
                  Geleceğin yöneticilerini bugünden keşfedin.
                </h3>

                {/* Flow */}
                <div className="space-y-3 pt-2 text-xs text-gray-200 font-medium">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-[#087F96] text-white text-[10px] font-bold flex items-center justify-center">1</span>
                    <span>Çalışanları değerlendir</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-[#087F96] text-white text-[10px] font-bold flex items-center justify-center">2</span>
                    <span>Yetkinlikleri ölç</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-[#087F96] text-white text-[10px] font-bold flex items-center justify-center">3</span>
                    <span>Gelişim planı oluştur</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-[#087F96] text-white text-[10px] font-bold flex items-center justify-center">4</span>
                    <span>Yüksek potansiyelli çalışanları belirle</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-[#087F96] text-white text-[10px] font-bold flex items-center justify-center">5</span>
                    <span>Terfi aday havuzu oluştur</span>
                  </div>
                  <div className="flex items-center space-x-2 font-bold text-emerald-400">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">6</span>
                    <span>Kritik pozisyonlar için yedekleme yap</span>
                  </div>
                </div>
              </div>

              <Link
                href="/kurumsal-demo"
                className="w-full py-4 bg-[#E11D48] hover:bg-[#BE123C] text-white font-black rounded-xl text-center text-xs shadow-lg transition-all"
              >
                Kurumsal Demo Talep Et
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 3. PROBLEM → ÇÖZÜM ALANI */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-[#F4F7F9] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2A4A] tracking-tight">
              Perakende Sektöründe Kariyerin En Büyük Sorunu: <span className="text-[#E11D48]">Çalışan Geleceğini Göremiyor</span>
            </h2>
          </div>

          {/* Visual Journey Steps Flow */}
          <div className="max-w-4xl mx-auto space-y-3">
            {[
              { step: 1, text: 'Bugün hangi pozisyondayım?' },
              { step: 2, text: 'Bir sonraki kariyer adımım ne?' },
              { step: 3, text: 'Oraya ulaşmak için hangi yetkinliklere ihtiyacım var?' },
              { step: 4, text: 'Hangi eğitimleri almalıyım?' },
              { step: 5, text: 'Terfiye ne kadar hazırım?' },
              { step: 6, text: 'Kariyer hedefime nasıl ulaşırım?' }
            ].map((item) => (
              <div key={item.step} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B2A4A] text-white font-extrabold text-xs flex items-center justify-center">
                    {item.step}
                  </span>
                  <span className="font-bold text-sm text-[#0B2A4A]">{item.text}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-[#087F96]" />
              </div>
            ))}
          </div>

          {/* Conclusion Banner */}
          <div className="mt-8 text-center bg-[#0B2A4A] text-white p-6 rounded-2xl max-w-4xl mx-auto border border-[#087F96]/40 shadow-xl">
            <p className="text-base sm:text-lg font-bold text-[#DDF4F7]">
              Perakende Kariyer Akademisi, çalışanların kariyer yolculuğunu görünür, ölçülebilir ve yönetilebilir hale getirir.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 4. CEO / GENEL MÜDÜR / İŞVEREN İÇİN İŞ SONUÇLARI */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 bg-[#0B2A4A]/10 border border-[#0B2A4A]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0B2A4A] mb-3">
              <TrendingUp className="h-4 w-4 text-[#087F96]" />
              <span>Finansal & Operasyonel Etki</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2A4A] tracking-tight">
              Eğitim Değil, Ölçülebilir İnsan Kaynağı Sonuçları
            </h2>
          </div>

          {/* 7 Outcome Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
              <h3 className="font-extrabold text-base text-[#0B2A4A]">1. Turnover Oranını Azaltın</h3>
              <p className="text-xs text-gray-600">Çalışanların kurum içinde net bir gelecek ve terfi yolu görmesini sağlayın.</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
              <h3 className="font-extrabold text-base text-[#0B2A4A]">2. İç Terfi Oranını Artırın</h3>
              <p className="text-xs text-gray-600">Yönetici ihtiyacını mümkün olduğunca kurum içinden yetiştirerek karşılayın.</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
              <h3 className="font-extrabold text-base text-[#0B2A4A]">3. Yetiştirme Süresini Kısaltın</h3>
              <p className="text-xs text-gray-600">Yüksek potansiyelli yetenekleri erkenden belirleyip hızlandırılmış eğitim verin.</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
              <h3 className="font-extrabold text-base text-[#0B2A4A]">4. Kritik Pozisyonları Yedekleyin</h3>
              <p className="text-xs text-gray-600">Kritik görevleri tek kişiye bağımlı olmaktan çıkarın, risk haritası oluşturun.</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
              <h3 className="font-extrabold text-base text-[#0B2A4A]">5. Standart Yönetim Kültürü</h3>
              <p className="text-xs text-gray-600">Şube ve mağazalar arasında ortak yönetim standartları geliştirin.</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
              <h3 className="font-extrabold text-base text-[#0B2A4A]">6. Yetneği Objektif Ölçün</h3>
              <p className="text-xs text-gray-600">Terfi kararlarını yalnızca yöneticinin kişisel kanaatine bırakmayın.</p>
            </div>

            <div className="p-6 bg-[#0B2A4A] text-white rounded-2xl border border-[#087F96]/40 space-y-2 sm:col-span-2">
              <h3 className="font-extrabold text-base text-emerald-400">7. İnsan Kaynağı Maliyetlerini Azaltın</h3>
              <p className="text-xs text-gray-200">İşe alım, adaptasyon ve yanlış terfi maliyetlerini radikal şekilde azaltmaya yardımcı olun.</p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 5 - 14. CORE HR & CAREER INTERACTIVE MODULES */}
      {/* -------------------------------------------------- */}
      <PromotionReadinessModule />
      <TalentPoolModule />
      <SuccessionPlanModule />

      {/* DIRECT TARGET ANCHOR FOR KARİYER HARİTASI */}
      <div id="kariyer-haritasi" className="scroll-mt-24">
        <CareerMapInteractive />
      </div>

      <CompetencyPassport />
      <EmployeeScorecard />
      <EnterpriseDashboardPreview />

      {/* -------------------------------------------------- */}
      {/* 15. MİKRO ÖĞRENME MODELİ */}
      {/* -------------------------------------------------- */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2A4A] tracking-tight">
              Saha Dostu Mikro Öğrenme Modeli
            </h2>
            <p className="mt-3 text-base text-gray-600">
              Uzun eğitim saatlerini sahadaki yoğun tempoya uygun, 10–20 dakikalık modüller halinde sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-8">
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="text-3xl font-black text-[#0B2A4A]">40</div>
              <div className="text-xs text-gray-600 font-bold mt-1">Ana Modül</div>
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="text-3xl font-black text-[#087F96]">160</div>
              <div className="text-xs text-gray-600 font-bold mt-1">Mikro Eğitim</div>
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="text-3xl font-black text-emerald-600">10-20 Dk</div>
              <div className="text-xs text-gray-600 font-bold mt-1">Kısa Dersler</div>
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="text-3xl font-black text-purple-600">24 Hafta</div>
              <div className="text-xs text-gray-600 font-bold mt-1">Gelişim Yolculuğu</div>
            </div>
          </div>

          {/* Loop Diagram */}
          <div className="p-6 bg-[#0B2A4A] text-white rounded-3xl border border-[#087F96]/40 text-center font-bold text-xs flex flex-wrap justify-center items-center gap-3">
            <span className="px-3 py-1.5 bg-[#087F96] rounded-xl">Mikro Eğitim</span> →
            <span className="px-3 py-1.5 bg-blue-600 rounded-xl">Mini Test</span> →
            <span className="px-3 py-1.5 bg-emerald-600 rounded-xl">Saha Görevi</span> →
            <span className="px-3 py-1.5 bg-purple-600 rounded-xl">Yönetici Gözlemi</span> →
            <span className="px-3 py-1.5 bg-amber-600 rounded-xl">KPI Takibi</span> →
            <span className="px-3 py-1.5 bg-rose-600 rounded-xl">Yetkinlik Puanı</span>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 16 - 25. BADGES, SECTORS, STORIES, FOUNDER, PACKAGES & FOOTER */}
      {/* -------------------------------------------------- */}
      <DigitalBadgesSection />
      <RetailSubSectorsSection />
      <SuccessStoriesSection />
      <FounderSection />
      <AdvisoryBoardSection />
      <CorporatePackagesSection />

      {/* Corporate Demo Banner */}
      <section className="py-16 bg-[#0B2A4A] text-white border-b border-[#087F96]/30">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">Şirketiniz İçin Birebir Demo Randevusu Alın</h2>
          <p className="text-sm text-gray-300">
            30 dakikalık online demoda çalışan yetkinlik haritası, terfi hazırlık skoru ve yedekleme planı sistemimizi canlı inceleyin.
          </p>
          <Link
            href="/kurumsal-demo"
            className="inline-block px-8 py-4 bg-[#E11D48] hover:bg-[#BE123C] text-white font-extrabold rounded-2xl shadow-2xl text-sm transition-all"
          >
            Ücretsiz 30 Dakikalık Kurumsal Demo Talep Et
          </Link>
        </div>
      </section>
    </div>
  );
}
