import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  BarChart3, 
  Award, 
  FileCheck2, 
  GraduationCap, 
  Medal,
  Search,
  Video,
  Target,
  TrendingUp,
  LayoutDashboard,
  Check,
  Zap,
  DollarSign,
  PieChart,
  ShieldAlert,
  Sparkles,
  UserCheck,
  UserPlus,
  Compass,
  AlertTriangle
} from 'lucide-react';

export default function KurumsalCozumlerPage() {
  const corporateServices = [
    {
      id: 1,
      title: '1. Kurumsal Eğitim İhtiyaç Analizi',
      subtitle: 'Saha Denetimi & Yetkinlik Haritalama',
      image: '/images/corp/service_1.jpg',
      desc: 'Saha denetimleri, dijital bilgi ölçüm sınavları ve mağaza gözlemleri ile şirketinizin mevcut yetkinlik haritasını çıkarıyoruz.',
      benefits: [
        'Gereksiz eğitim maliyetlerini sıfırlar, sadece eksik alanlara odaklanır.',
        'Şubeler arasındaki bilgi ve uygulama standart farkını ortaya koyar.',
        'Mağaza fire ve stok kayıplarının kök nedenlerini veriyle tespit eder.'
      ],
      impact: '⚡ %40 Daha Hızlı Oryantasyon & %100 Doğru Bütçe Kullanımı',
      icon: Search,
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
    },
    {
      id: 2,
      title: '2. Şirkete Özel Akademi Kurulumu',
      subtitle: 'White-Label Kapalı Devre LMS',
      image: '/images/corp/service_2.jpg',
      desc: 'Kendi logonuz, kurumsal renkleriniz ve şirket alan adınızla (örn. akademi.sirketiniz.com) çalışanlarınıza özel kapalı devre dijital akademi platformu kuruyoruz.',
      benefits: [
        '7/24 Mobil ve Web erişimli, modern perakende öğrenme altyapısı.',
        'Çalışanların eğitim katılımını ve tamamlama oranlarını anlık izleme.',
        'Şirket içi duyurular, sınavlar ve video kütüphanesini tek noktada toplama.'
      ],
      impact: '🏢 Güçlü İşveren Markası & Sıfır Altyapı Maliyeti',
      icon: Building2,
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
    },
    {
      id: 3,
      title: '3. İçerik Özelleştirme & Video Production',
      subtitle: 'Operasyon Kitapçığına Özel Eğitimler',
      image: '/images/corp/service_3.jpg',
      desc: 'Market zincirinizin kendi operasyon El Kitapçığına, reyon standartlarına ve kasa prosedürlerine özel HD video eğitimler ve interaktif SCORM içerikleri üretiyoruz.',
      benefits: [
        'Manav fire önleme, et-şarküteri soğuk zincir ve kasa POS standartlarına tam uyum.',
        'Yeni giren personelin ilk haftadan standartlara uygun çalışması.',
        'Stok devir hızı ve tanzim-teşhir hatalarında gözle görülür düşüş.'
      ],
      impact: '📉 Mağaza Fire Oranlarında %35’e Varan Düşüş',
      icon: Video,
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
    },
    {
      id: 4,
      title: '4. Train The Trainer (İç Eğitmenlik)',
      subtitle: 'Şef & Müdürlerden Başeğitmen Yetiştirme',
      image: '/images/corp/service_4.jpg',
      desc: 'Kurum içi kıdemli şeflerinizi, mağaza müdürlerinizi ve bölge yöneticilerinizi pedagojik ve teknik açıdan yetiştirerek sertifikalı iç eğitmen haline getiriyoruz.',
      benefits: [
        'Dışarıdan sürekli danışman alma maliyetini tamamen ortadan kaldırır.',
        'Şirket kültürünün ve saha tecrübesinin içeride nesilden nesile aktarımı.',
        'İç eğitmenlerin motive olmasıyla yönetici sadakatinde artış.'
      ],
      impact: '💰 Eğitim Bütçesinde %60’a Varan Yıllık Tasarruf',
      icon: GraduationCap,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      id: 5,
      title: '5. Sınav & QR Barkodlu Sertifikasyon',
      subtitle: 'e-Devlet & Doğrulanabilir Dijital Başarı',
      image: '/images/corp/service_5.jpg',
      desc: 'Modül sonu otomatik değerlendirmeli dijital sınavlar, pratik saha denetimleri ve QR kod ile internetten doğrulanabilir resmi sertifikasyon sistemi.',
      benefits: [
        'Çalışan motivasyonunu ve sertifika alma arzusunu en üst seviyeye çıkarır.',
        'Kopya önleyici soru bankası ve süre kısıtlamalı resmî ölçüm.',
        'e-Devlet ve Üniversite onaylı akreditasyon imkânı.'
      ],
      impact: '📜 %95 Başarı Oranı & Çalışan Bağlılığında Artış',
      icon: ShieldCheck,
      badgeColor: 'bg-[#0B2A4A] text-amber-300 border-amber-400'
    },
    {
      id: 6,
      title: '6. Yetkinlik Matrisi & Yetenek Havuzu',
      subtitle: 'Gerçek Zamanlı İnsan Sermayesi İzleme',
      image: '/images/corp/service_6.jpg',
      desc: 'Her çalışanınızın 1. yıl ve 2. yıl yetkinlik puanlarını, sınav başarılarını ve reyon performansını tek bir canlı matriste anlık olarak görün.',
      benefits: [
        'Hangi reyon veya şubede kimin ne seviyede olduğunu anında tespit etme.',
        'Eksik yetkinlikleri olan personellere otomatik destek eğitimi atama.',
        'Kurumsal yetenek açığını önceden görüp stratejik planlama yapma.'
      ],
      impact: '📊 %100 Şeffaf Yetkinlik Ölçümü & Veriye Dayalı İK',
      icon: BarChart3,
      badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
    },
    {
      id: 7,
      title: '7. Kariyer Haritası & Terfi Yedekleme Planı',
      subtitle: '9-Box Matrisi ile Geleceğin Liderleri',
      image: '/images/corp/service_7.jpg',
      desc: 'Mağaza müdürü veya bölge müdürü adayı olan yüksek potansiyelli (High-Pot) çalışanlarınızı tespit edin ve otomatik 9-Box matrisinde yedekleyin.',
      benefits: [
        'Kritik yönetim pozisyonları boşaldığında dışarıdan aramak yerine içeriden atama.',
        'Çalışanların "Kariyer Yolum Açık" algısıyla işten ayrılma oranını (Turnover) düşürme.',
        'Kariyer basamaklarında şeffaf, adil ve objektif yükselme imkânı.'
      ],
      impact: '📉 Personel Devir Oranında (Turnover) %45 Azalma',
      icon: Target,
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
    },
    {
      id: 8,
      title: '8. Eğitim KPI Ölçümü (ROI)',
      subtitle: 'Ciro, Fire ve Sepet Büyüklüğü Analizi',
      image: '/images/corp/service_8.jpg',
      desc: 'Eğitimlerin mağaza firesine, kasa hızına, sepet büyüklüğüne ve mağaza cirosuna etkisini matematiksel modeller ve veri grafikleriyle kanıtlıyoruz.',
      benefits: [
        'Eğitime harcanan her 1 TL’nin şirkete ciro artışı ve fire tasarrufu olarak geri dönüşü.',
        'İcra Kurulu ve Yönetim Kurulu sunumları için hazır finansal etki raporları.',
        'Mağazalar arası ROI ve başarı karşılaştırmaları.'
      ],
      impact: '📈 Yıl Sonunda Ortalama 4.8x Yatırım Geri Dönüşü (ROI)',
      icon: TrendingUp,
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
    },
    {
      id: 9,
      title: '9. Yönetici Dashboardları',
      subtitle: 'Tek Tıkla Stratejik Raporlama',
      image: '/images/corp/service_9.jpg',
      desc: 'CEO, Genel Müdür, Operasyon Direktörü ve İK Yöneticileri için özel tasarlanmış anlık genel başarı, katılım, fire düşüşü ve mağaza karnesi dashboardları.',
      benefits: [
        'Tüm Türkiye/Bölge şubelerinin eğitim ve yetkinlik durumunu 10 saniyede inceleme.',
        'Zaman kaybettiren manuel Excel raporlamalarına son verme.',
        'Karar vericilere anlık stratejik yön gösteren renkli grafikler ve uyarı sinyalleri.'
      ],
      impact: '⏱️ Raporlama Süresinde %90 Zaman Tasarrufu',
      icon: LayoutDashboard,
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* HERO HEADER WITH EXECUTIVE ROI METRICS */}
        <div className="bg-gradient-to-br from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white p-8 sm:p-12 rounded-3xl shadow-xl border border-[#087F96]/30 text-center max-w-5xl mx-auto space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center space-x-2 bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
            <Sparkles className="h-4 w-4 text-slate-950" />
            <span>B2B Kurumsal Perakende Akademi Çözümleri</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl leading-tight">
            Şirketiniz İçin <span className="text-amber-300">Ölçülebilir & Yüksek ROI’li</span> Perakende Eğitim Akademisi
          </h1>

          <p className="text-gray-200 text-base sm:text-lg font-light leading-relaxed max-w-3xl mx-auto">
            Market zincirinizin fire oranlarını düşüren, kasa hızını artıran, personel devrini (turnover) azaltan ve tüm mağazalarınızı <strong>tek platformdan canlı yönetmenizi sağlayan</strong> uçtan uca kurumsal akademi mimarisi.
          </p>

          {/* Key Executive ROI Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto pt-2 text-xs font-bold">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Mağaza Firesinde %35 Düşüş</span>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center space-x-2">
              <Users className="w-5 h-5 text-amber-400" />
              <span>Turnover Oranında %45 Azalma</span>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center space-x-2">
              <DollarSign className="w-5 h-5 text-cyan-300" />
              <span>4.8x Yıllık Yatırım Getirisi (ROI)</span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/talep-olustur"
              className="px-8 py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-2xl shadow-xl transition-all inline-flex items-center space-x-2 text-sm border border-amber-300 scale-105 hover:scale-110"
            >
              <Building2 className="h-5 w-5" />
              <span>Kurumsal Demo ve Teklif Formu</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* 9 ENRICHED CORPORATE SERVICES GRID WITH HIGH-DEF VISUALS & EXECUTIVE PERSUASION */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-[#087F96] uppercase tracking-wider bg-cyan-50 px-3.5 py-1 rounded-full border border-cyan-200">
              Görsel Destekli Uçtan Uca Mimarimiz
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-[#0B2A4A]">
              Kurumsal Akademi Hizmet Paketi Bileşenleri & Görselleri
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto font-medium">
              Yöneticilerin ve İcra Kurullarının karar alma süreçlerini hızlandıran, verimliliği artıran 9 temel bileşen:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {corporateServices.map((service) => {
              const Icon = service.icon;

              return (
                <div 
                  key={service.id} 
                  className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:border-[#087F96] transition-all flex flex-col justify-between space-y-4 group overflow-hidden"
                >
                  <div className="space-y-3">
                    
                    {/* High-Definition Visual Banner */}
                    <div className="relative h-44 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-xs">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-[#0B2A4A]/90 text-amber-300 text-[10px] font-mono font-black px-2.5 py-1 rounded-full border border-amber-400/40 shadow-md backdrop-blur-xs">
                        BİLEŞEN #{service.id}
                      </div>
                      <div className="absolute bottom-3 left-3 bg-white/90 text-[#0B2A4A] p-2 rounded-xl border border-white shadow-md">
                        <Icon className="h-5 w-5 text-[#087F96]" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display font-black text-base text-[#0B2A4A] group-hover:text-[#087F96] transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mt-0.5">
                        {service.subtitle}
                      </p>
                    </div>

                    {/* Executive Description */}
                    <p className="text-xs text-gray-600 leading-relaxed font-normal bg-gray-50 p-3 rounded-xl border border-gray-150">
                      {service.desc}
                    </p>

                    {/* Key Benefits Bullet List */}
                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] font-extrabold text-[#0B2A4A] uppercase tracking-wider flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Yönetici & Şirket Faydaları:</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-gray-700">
                        {service.benefits.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start space-x-2 text-[11px] font-medium leading-snug">
                            <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Impact / ROI Badge Footer */}
                  <div className="pt-3 border-t border-gray-100">
                    <div className={`p-2.5 rounded-xl border text-[11px] font-black text-center shadow-2xs ${service.badgeColor}`}>
                      {service.impact}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 CORE HR & TALENT EXECUTIVE PILLARS WITH HIGH-DEFINITION DASHBOARD VISUALS */}
        <div className="bg-gradient-to-br from-[#061B33] via-[#0B2A4A] to-[#056B80] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#087F96]/40 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-black text-amber-300 bg-amber-500/20 px-3.5 py-1 rounded-full border border-amber-400/40 uppercase tracking-wider">
              Anlık İnsan Sermayesi Yönetimi
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
              Çalışan Gelişimi ve Anlık Personel Takip Gücü
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light max-w-2xl mx-auto">
              Perakende Kariyer Akademisi platformu ile tüm kadronuzu 7/24 canlı izleyebilir, yetersiz personelleri ve yüksek potansiyelli yetenekleri anında tespit edebilirsiniz:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* PILLAR 1: KARİYER PLANLAMASI + HD VISUAL DASHBOARD BANNER */}
            <div className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-white/15 space-y-4 hover:bg-white/15 transition-all flex flex-col justify-between overflow-hidden group">
              <div className="space-y-3">
                
                {/* High-Definition Visual Image Banner */}
                <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-white/20 shadow-md">
                  <img 
                    src="/images/corp/hr_1.jpg" 
                    alt="Şeffaf Çalışan Kariyer Planlaması Ekranı"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-[#0B2A4A]/90 text-cyan-300 text-[10px] font-mono font-black px-2.5 py-1 rounded-full border border-cyan-400/40 shadow-md backdrop-blur-xs">
                    GÜÇ #1 • CANLI EKRAN
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-1">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold shrink-0">
                    <Compass className="w-6 h-6 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">Şeffaf Çalışan Kariyer Planlaması</h3>
                    <span className="text-[10px] font-mono text-cyan-300 uppercase font-bold">15 Basamaklı Kariyer Haritası</span>
                  </div>
                </div>

                <p className="text-xs text-gray-200 leading-relaxed font-light bg-white/5 p-3.5 rounded-xl border border-white/10">
                  Çalışanlarınız 15 basamaklı kariyer haritasında hangi pozisyonda olduklarını, bir üst unvana yükselmek için hangi yetkinlikleri ve eğitimleri tamamlamaları gerektiğini 7/24 canlı görürler.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] font-bold text-cyan-300 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />
                <span>%100 Şeffaf Yükselme & Motivasyon Artışı</span>
              </div>
            </div>

            {/* PILLAR 2: TERFİ EDECEK PERSONEL TAKİBİ + HD VISUAL DASHBOARD BANNER */}
            <div className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-white/15 space-y-4 hover:bg-white/15 transition-all flex flex-col justify-between overflow-hidden group">
              <div className="space-y-3">
                
                {/* High-Definition Visual Image Banner */}
                <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-white/20 shadow-md">
                  <img 
                    src="/images/corp/hr_2.jpg" 
                    alt="Terfi Edecek Personeli Anlık Takip Ekranı"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-[#0B2A4A]/90 text-emerald-300 text-[10px] font-mono font-black px-2.5 py-1 rounded-full border border-emerald-400/40 shadow-md backdrop-blur-xs">
                    GÜÇ #2 • CANLI EKRAN
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-1">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold shrink-0">
                    <UserCheck className="w-6 h-6 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">Terfi Edecek Personeli Anlık Takip</h3>
                    <span className="text-[10px] font-mono text-emerald-300 uppercase font-bold">Terfi Komitesi Listesi</span>
                  </div>
                </div>

                <p className="text-xs text-gray-200 leading-relaxed font-light bg-white/5 p-3.5 rounded-xl border border-white/10">
                  2. Yıl eğitimlerini tamamlamış, sınav ve reyon simülasyon skorları %85'in üzerinde olan terfiye hazır personeliniz Terfi Komitesi ekranında anlık yeşil bayrakla listelenir.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] font-bold text-emerald-300 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Objektif Terfi Listeleri & Hızlı Atama</span>
              </div>
            </div>

            {/* PILLAR 3: YETERSİZ PERSONEL TESPİTİ + HD VISUAL DASHBOARD BANNER */}
            <div className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-white/15 space-y-4 hover:bg-white/15 transition-all flex flex-col justify-between overflow-hidden group">
              <div className="space-y-3">
                
                {/* High-Definition Visual Image Banner */}
                <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-white/20 shadow-md">
                  <img 
                    src="/images/corp/hr_3.jpg" 
                    alt="Yetersiz Personeli Anında Tespit Etme Ekranı"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-[#0B2A4A]/90 text-rose-300 text-[10px] font-mono font-black px-2.5 py-1 rounded-full border border-rose-400/40 shadow-md backdrop-blur-xs">
                    GÜÇ #3 • CANLI EKRAN
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-1">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold shrink-0">
                    <AlertTriangle className="w-6 h-6 text-rose-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">Yetersiz Personeli Anında Tespit Etme</h3>
                    <span className="text-[10px] font-mono text-rose-300 uppercase font-bold">Risk ve Erken Uyarı Sinyali</span>
                  </div>
                </div>

                <p className="text-xs text-gray-200 leading-relaxed font-light bg-white/5 p-3.5 rounded-xl border border-white/10">
                  Sınav sonuçlarında, manav-şarküteri fire oranlarında veya denetim skorlarında geride kalan yetersiz personeller kırmızı uyarı sinyaliyle anında tespit edilir ve otomatik destek eğitimi atanır.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] font-bold text-rose-300 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-300" />
                <span>Erken Uyarı ile Mağaza Fire ve Hata Engelleme</span>
              </div>
            </div>

            {/* PILLAR 4: ELDE TUTULACAK YETKİN PERSONEL HAVUZU + HD VISUAL DASHBOARD BANNER */}
            <div className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-white/15 space-y-4 hover:bg-white/15 transition-all flex flex-col justify-between overflow-hidden group">
              <div className="space-y-3">
                
                {/* High-Definition Visual Image Banner */}
                <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-white/20 shadow-md">
                  <img 
                    src="/images/corp/hr_4.jpg" 
                    alt="Elde Tutulacak Yetkin Personel Havuzu 9-Box Ekranı"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-[#0B2A4A]/90 text-amber-300 text-[10px] font-mono font-black px-2.5 py-1 rounded-full border border-amber-400/40 shadow-md backdrop-blur-xs">
                    GÜÇ #4 • CANLI EKRAN
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-1">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold shrink-0">
                    <Award className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">Elde Tutulacak Yetkin Personel Havuzu</h3>
                    <span className="text-[10px] font-mono text-amber-300 uppercase font-bold">9-Box Matrisi & Retention</span>
                  </div>
                </div>

                <p className="text-xs text-gray-200 leading-relaxed font-light bg-white/5 p-3.5 rounded-xl border border-white/10">
                  Şirketinizin geleceğini taşıyacak yüksek potansiyelli (High-Pot) yetkin çalışan havuzunuzu 9-Box matrisinde canlı görün. İşten ayrılma riski olan yıldız personelleri anında korumaya alın.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] font-bold text-amber-300 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                <span>%45 Daha Düşük Turnover & Kritik Yetenek Koruması</span>
              </div>
            </div>

          </div>
        </div>

        {/* WHY EXECUTIVES MUST BUY THIS PROGRAM (YÖNETİCİ İKNA TABLOSU / GİRİŞİM METRİKLERİ) */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-black text-purple-900 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-300 uppercase">
              Detaylı Karşılaştırmalı Analiz
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B2A4A]">
              Neden Bu Platformu Tercih Etmelisiniz?
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Geleneksel sınıf içi eğitimler ile Perakende Kariyer Akademisi dijital mimarisinin karşılaştırması:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#0B2A4A] text-white uppercase font-black tracking-wider">
                  <th className="p-3.5 border-r border-white/10 w-1/4">Kriter / Özellik</th>
                  <th className="p-3.5 border-r border-white/10 w-1/3 text-rose-300">Geleneksel Eğitimler</th>
                  <th className="p-3.5 bg-[#087F96] text-amber-300 w-5/12 font-black">Perakende Kariyer Akademisi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-medium">
                <tr>
                  <td className="p-3.5 font-bold text-[#0B2A4A] bg-gray-50">Maliyet & Zaman Kaybı</td>
                  <td className="p-3.5 text-rose-700 bg-rose-50/40">Yüksek seyahat, konaklama ve salon maliyetleri</td>
                  <td className="p-3.5 text-emerald-900 bg-emerald-50/60 font-black">7/24 Dijital Erişim, Sıfır Seyahat Maliyeti</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#0B2A4A] bg-gray-50">Standart Kalite Uyum</td>
                  <td className="p-3.5 text-rose-700 bg-rose-50/40">Eğitmenden eğitmene değişen farklı anlatımlar</td>
                  <td className="p-3.5 text-emerald-900 bg-emerald-50/60 font-black">%100 Şirket Kitapçığına Özel Standart HD Video</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#0B2A4A] bg-gray-50">Ölçüm & Raporlama</td>
                  <td className="p-3.5 text-rose-700 bg-rose-50/40">Kâğıt üzerinde İmza Listesi, Yanıltıcı Veri</td>
                  <td className="p-3.5 text-emerald-900 bg-emerald-50/60 font-black">Anlık Dijital Sınav, Canlı Matris ve ROI Raporu</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#0B2A4A] bg-gray-50">Saha Yangın & Fire Etkisi</td>
                  <td className="p-3.5 text-rose-700 bg-rose-50/40">Ölçülemez, Mağaza Fireleri Devam Eder</td>
                  <td className="p-3.5 text-emerald-900 bg-emerald-50/60 font-black">Mağaza Firesinde %35 Net Tasarruf Kanıtı</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#0B2A4A] bg-gray-50">Sertifikasyon Güvenilirliği</td>
                  <td className="p-3.5 text-rose-700 bg-rose-50/40">Kâğıt Baskı, Doğrulanamaz Matbu Belge</td>
                  <td className="p-3.5 text-emerald-900 bg-emerald-50/60 font-black">QR Kod Doğrulanabilir e-Devlet/Üniversite Onaylı</td>
                </tr>
                
                {/* NEW ENRICHED ROWS REQUESTED BY USER */}
                <tr className="bg-cyan-50/30">
                  <td className="p-3.5 font-bold text-[#0B2A4A] bg-cyan-100/50">Çalışan Kariyer Planlaması</td>
                  <td className="p-3.5 text-rose-700 bg-rose-50/40">Belirsiz, şahsa bağlı subjektif ilerleme</td>
                  <td className="p-3.5 text-emerald-900 bg-emerald-50/80 font-black">15 Basamaklı Canlı Kariyer Haritası ile %100 Şeffaf Planlama</td>
                </tr>
                <tr className="bg-cyan-50/30">
                  <td className="p-3.5 font-bold text-[#0B2A4A] bg-cyan-100/50">Terfi Edecek Personel Takibi</td>
                  <td className="p-3.5 text-rose-700 bg-rose-50/40">Kulaktan kulağa tavsiye, geç atamalar</td>
                  <td className="p-3.5 text-emerald-900 bg-emerald-50/80 font-black">Terfiye Hazır Adayların Canlı Sınav ve Skorlarla Anlık Takibi</td>
                </tr>
                <tr className="bg-cyan-50/30">
                  <td className="p-3.5 font-bold text-[#0B2A4A] bg-cyan-100/50">Yetersiz Personel Tespiti</td>
                  <td className="p-3.5 text-rose-700 bg-rose-50/40">Fire oluştuktan sonra fark edilen geç müdahaleler</td>
                  <td className="p-3.5 text-emerald-900 bg-emerald-50/80 font-black">Kırmızı Sinyalle Anında Tespit ve Otomatik Destek Eğitimi</td>
                </tr>
                <tr className="bg-cyan-50/30">
                  <td className="p-3.5 font-bold text-[#0B2A4A] bg-cyan-100/50">Elde Tutulacak Yetkin Personel Havuzu</td>
                  <td className="p-3.5 text-rose-700 bg-rose-50/40">Yüksek turnover (istifa), kilit yetenek kaybı</td>
                  <td className="p-3.5 text-emerald-900 bg-emerald-50/80 font-black">9-Box Matrisinde Canlı Yetenek Havuzu ve %45 Daha Düşük Turnover</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* EXPANDED "WOW" TRAIN THE TRAINER DEDICATED SECTION WITH HD VISUALS & FINANCIAL ROI CALCULATOR */}
        <div id="ic-egitmen" className="bg-gradient-to-br from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white rounded-3xl p-8 sm:p-12 border border-[#087F96]/40 shadow-2xl space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Title & Badges */}
          <div className="text-center space-y-3 max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
              <GraduationCap className="h-4 w-4 text-slate-950" />
              <span>Sürdürülebilir Akademi Mimarisi</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
              Train The Trainer – <span className="text-amber-300">Şirketinizin İç Eğitmen Ordusu</span>
            </h2>

            <p className="text-gray-200 text-sm sm:text-base font-light leading-relaxed max-w-3xl mx-auto">
              Dışarıdan sürekli yüksek bütçeli eğitim danışmanlığı satın almak yerine; şirketinizin kendi başarılı mağaza müdürlerini ve reyon şeflerini <strong>pedagojik ve teknik açıdan sertifikalı başeğitmenlere dönüştürüyoruz.</strong>
            </p>

            {/* Key Financial & Cultural Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto pt-3 text-xs font-bold font-mono">
              <div className="p-3 bg-white/10 rounded-2xl border border-white/20 text-emerald-300 flex items-center justify-center space-x-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <span>Yılda ₺2.400.000+ Net Tasarruf</span>
              </div>
              <div className="p-3 bg-white/10 rounded-2xl border border-white/20 text-amber-300 flex items-center justify-center space-x-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <span>%100 Özgün Kurum Kültürü Hafızası</span>
              </div>
              <div className="p-3 bg-white/10 rounded-2xl border border-white/20 text-cyan-300 flex items-center justify-center space-x-2">
                <Zap className="w-5 h-5 text-cyan-300" />
                <span>50+ Şubede 1:1 Standart Kalite</span>
              </div>
            </div>
          </div>

          {/* Visual Image Banner & Story Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-2">
            {/* Left Image Banner 1 */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl group h-80 sm:h-96">
              <img 
                src="/images/corp/ttt_1.jpg" 
                alt="Train The Trainer Master Workshop" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-white/20 text-xs space-y-1">
                <span className="text-amber-300 font-bold uppercase tracking-wider">🎓 Master İç Eğitmen Atölyesi</span>
                <p className="text-gray-200 font-light">Kendi müdürlerinizin anlatıcı değil, dönüştürücü liderler haline geldiği uygulama atölyeleri.</p>
              </div>
            </div>

            {/* Right Story Banner 2 */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl group h-80 sm:h-96">
              <img 
                src="/images/corp/ttt_2.jpg" 
                alt="Kurum Kültürü & Mentörlük" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-white/20 text-xs space-y-1">
                <span className="text-cyan-300 font-bold uppercase tracking-wider">🏛️ Nesilden Nesile Şirket Kültürü Transferi</span>
                <p className="text-gray-200 font-light">Kıdemli şeflerin saha tecrübelerini yeni giren personellere kurum ruhuyla aktardığı birebir mentörlük.</p>
              </div>
            </div>
          </div>

          {/* 3 STRATEGIC VALUE PILLARS (EKONOMİK TASARRUF, KURUM KÜLTÜRÜ, SÜRDÜRÜLEBİLİRLİK) */}
          <div className="space-y-4 pt-4">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase">YÖNETİM HAFIZASI & ROI</span>
              <h3 className="font-display font-extrabold text-2xl text-white">İç Eğitmenliğin Kuruma 3 Stratejik Gücü</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* VALUE PILLAR 1: EKONOMİK TASARRUF */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3 hover:bg-white/15 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                  <DollarSign className="w-7 h-7 text-emerald-300" />
                </div>
                <h4 className="font-bold text-lg text-white">1. Milyonlarca Liralık Ekonomik Tasarruf</h4>
                <p className="text-xs text-gray-200 leading-relaxed font-light">
                  Dışarıdan alınan günlük 50.000 TL+ danışmanlık ve salon eğitim faturalarını sıfırlar. Kendi kadrolu iç eğitmenlerinizle yılda <strong>₺2.400.000+ net bütçe tasarrufu</strong> sağlarsınız.
                </p>
                <div className="pt-2 border-t border-white/10 text-[11px] font-bold text-emerald-300">
                  💰 %75 Yıllık Bütçe Tasarrufu
                </div>
              </div>

              {/* VALUE PILLAR 2: KURUM KÜLTÜRÜ */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3 hover:bg-white/15 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                  <Building2 className="w-7 h-7 text-amber-300" />
                </div>
                <h4 className="font-bold text-lg text-white">2. Güçlü & Özgün Kurum Kültürü</h4>
                <p className="text-xs text-gray-200 leading-relaxed font-light">
                  Dışarıdan gelen jenerik teoriler yerine, şirketinizin 20 yıllık saha tecrübesi, müşteri dili ve çalışma etiği yeni işe giren her çalışana <strong>şirket aidiyeti ve gururuyla</strong> aşılanır.
                </p>
                <div className="pt-2 border-t border-white/10 text-[11px] font-bold text-amber-300">
                  🏛️ Nesiller Boyu Korumalı Şirket Hafızası
                </div>
              </div>

              {/* VALUE PILLAR 3: STANDART & HIZ */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3 hover:bg-white/15 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
                  <Zap className="w-7 h-7 text-cyan-300" />
                </div>
                <h4 className="font-bold text-lg text-white">3. %100 Standart Kalite & Yeni Şube Hızı</h4>
                <p className="text-xs text-gray-200 leading-relaxed font-light">
                  Yeni mağaza açılışlarında veya kadro genişlemelerinde dışarıdan eğitmen beklemek yok! Sertifikalı iç eğitmenleriniz <strong>aynı gün yeni ekibi sahada eğitime alıp standartlaştırır.</strong>
                </p>
                <div className="pt-2 border-t border-white/10 text-[11px] font-bold text-cyan-300">
                  ⚡ 3 Kat Hızlı Şube Kadrolaşması
                </div>
              </div>

            </div>
          </div>

          {/* 4-STAGE MASTER TRAINER CERTIFICATION METHODOLOGY */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono font-bold text-amber-300 uppercase">AKADEMİK METODOLOJİ</span>
              <h3 className="font-display font-extrabold text-2xl text-white">İç Eğitmenlik Sertifikasyon Süreci (4 Adım)</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-cyan-400/30 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-400 text-slate-950 font-black flex items-center justify-center">1</div>
                <h4 className="font-bold text-white text-sm">Andragoji (Yetişkin Eğitimi)</h4>
                <p className="text-gray-300 font-light">Yetişkinlerin nasıl öğrendiği, saha alışkanlıklarının nasıl değiştirildiği ve dikkat yönetimi.</p>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-2xl border border-emerald-400/30 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-400 text-slate-950 font-black flex items-center justify-center">2</div>
                <h4 className="font-bold text-white text-sm">Hitabet & Kriz Yönetimi</h4>
                <p className="text-gray-300 font-light">Sahnede ve mağazada topluluk önünde konuşma, zor soruları yanıtlama ve kriz yönetimi.</p>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-2xl border border-amber-400/30 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center">3</div>
                <h4 className="font-bold text-white text-sm">Şirket Kitapçığına %100 Uyum</h4>
                <p className="text-gray-300 font-light">Marketinizin manav fire, şarküteri soğuk zincir ve kasa POS El Kitapçıklarının birebir öğretimi.</p>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-2xl border border-purple-400/30 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-purple-400 text-slate-950 font-black flex items-center justify-center">4</div>
                <h4 className="font-bold text-white text-sm">Supervizör Audit & Sertifika</h4>
                <p className="text-gray-300 font-light">Canlı deneme dersi sunumu ve bağımsız jüri değerlendirmesi sonrası Kurumsal İç Eğitmen Sertifikası.</p>
              </div>
            </div>
          </div>

          {/* ROI COMPARISON MINI TABLE WIDGET */}
          <div className="bg-slate-950/80 rounded-2xl p-6 border border-white/20 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h4 className="font-bold text-base text-white">Finansal Karşılaştırma: Dış Eğitmen vs İç Eğitmen Ordusu</h4>
                <p className="text-xs text-gray-400">100 Şubeli Perakende Zinciri Yıllık Tahmini Hesaplaması:</p>
              </div>
              <div className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-mono font-bold border border-emerald-400/30">
                💰 YILLIK %75 NET ROI
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/30 space-y-1">
                <span className="text-rose-300 font-bold uppercase">❌ Dış Eğitim Danışmanlığı Maliyeti:</span>
                <div className="text-xl font-black text-rose-400">₺3.200.000 / Yıl</div>
                <p className="text-[11px] text-gray-300 font-sans font-light">Geliş-gidiş, konaklama, günlük 50.000 TL salon ve danışman kaşe ücretleri.</p>
              </div>

              <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/30 space-y-1">
                <span className="text-emerald-300 font-bold uppercase">✅ Train The Trainer İç Eğitmen Maliyeti:</span>
                <div className="text-xl font-black text-emerald-400">₺750.000 / Yıl</div>
                <p className="text-[11px] text-gray-300 font-sans font-light">Sertifikalı iç eğitmenlerle sıfır dış bağımlılık ve 7/24 sürdürülebilir eğitim.</p>
              </div>
            </div>
          </div>

        </div>

        {/* DEMO & QUOTE CALL TO ACTION */}
        <div className="bg-[#087F96] text-white p-8 sm:p-10 rounded-3xl text-center space-y-4 shadow-xl border border-cyan-400/40">
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
            Şirketiniz İçin Özel Akademi Sunumu & ROI Teklifi İsteyin
          </h3>
          <p className="text-gray-100 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Uzman ekibimiz mağaza sayınıza ve çalışan kadronuza uygun akademi mimarisini ve ROI hesaplamasını 24 saat içinde hazırlayıp üst yönetiminize sunsun.
          </p>
          <div className="pt-2">
            <Link
              href="/talep-olustur"
              className="px-8 py-4 bg-[#0B2A4A] hover:bg-[#061B33] text-amber-300 font-black rounded-2xl shadow-xl transition-all inline-flex items-center space-x-2 text-sm border border-amber-400/40 scale-105 hover:scale-110"
            >
              <Building2 className="h-5 w-5 text-amber-400" />
              <span>Kurumsal Demo ve Teklif Formu</span>
              <ArrowRight className="h-5 w-5 text-amber-400" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
