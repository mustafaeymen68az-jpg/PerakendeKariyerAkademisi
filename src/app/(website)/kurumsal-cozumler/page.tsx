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

        {/* 4 CORE HR & TALENT EXECUTIVE PILLARS (ÇALIŞAN KARİYERİ, TERFİ TAKİBİ, YETERSİZ PERSONEL & ELDE TUTULACAK YETENEK) */}
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
            
            {/* PILLAR 1: KARİYER PLANLAMASI */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3 hover:bg-white/15 transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
                  <Compass className="w-6 h-6 text-cyan-300" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase">GÜÇ #1</span>
                  <h3 className="font-bold text-base text-white">Şeffaf Çalışan Kariyer Planlaması</h3>
                </div>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-light">
                Çalışanlarınız 15 basamaklı kariyer haritasında hangi pozisyonda olduklarını, bir üst unvana yükselmek için hangi yetkinlikleri ve eğitimleri tamamlamaları gerektiğini 7/24 canlı görürler.
              </p>
              <div className="pt-2 border-t border-white/10 text-[11px] font-bold text-cyan-300 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />
                <span>%100 Şeffaf Yükselme & Motivasyon Artışı</span>
              </div>
            </div>

            {/* PILLAR 2: TERFİ EDECEK PERSONEL TAKİBİ */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3 hover:bg-white/15 transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                  <UserCheck className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase">GÜÇ #2</span>
                  <h3 className="font-bold text-base text-white">Terfi Edecek Personeli Anlık Takip</h3>
                </div>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-light">
                2. Yıl eğitimlerini tamamlamış, sınav ve reyon simülasyon skorları %85'in üzerinde olan terfiye hazır personeliniz Terfi Komitesi ekranında anlık yeşil bayrakla listelenir.
              </p>
              <div className="pt-2 border-t border-white/10 text-[11px] font-bold text-emerald-300 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Objektif Terfi Listeleri & Hızlı Atama</span>
              </div>
            </div>

            {/* PILLAR 3: YETERSİZ PERSONEL TESPİTİ */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3 hover:bg-white/15 transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-6 h-6 text-rose-300" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-rose-300 uppercase">GÜÇ #3</span>
                  <h3 className="font-bold text-base text-white">Yetersiz Personeli Anında Tespit Etme</h3>
                </div>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-light">
                Sınav sonuçlarında, manav-şarküteri fire oranlarında veya denetim skorlarında geride kalan yetersiz personeller kırmızı uyarı sinyaliyle anında tespit edilir ve otomatik destek eğitimi atanır.
              </p>
              <div className="pt-2 border-t border-white/10 text-[11px] font-bold text-rose-300 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-300" />
                <span>Erken Uyarı ile Mağaza Fire ve Hata Engelleme</span>
              </div>
            </div>

            {/* PILLAR 4: ELDE TUTULACAK YETKİN PERSONEL HAVUZU */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3 hover:bg-white/15 transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-300 uppercase">GÜÇ #4</span>
                  <h3 className="font-bold text-base text-white">Elde Tutulacak Yetkin Personel Havuzu</h3>
                </div>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-light">
                Şirketinizin geleceğini taşıyacak yüksek potansiyelli (High-Pot) yetkin çalışan havuzunuzu 9-Box matrisinde canlı görün. İşten ayrılma riski olan yıldız personelleri anında korumaya alın.
              </p>
              <div className="pt-2 border-t border-white/10 text-[11px] font-bold text-amber-300 flex items-center space-x-1">
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

        {/* TRAIN THE TRAINER DEDICATED SECTION */}
        <div id="ic-egitmen" className="bg-[#061B33] text-white rounded-3xl p-8 sm:p-10 border border-[#087F96]/40 shadow-xl space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-[#DDF4F7] bg-[#087F96] px-3.5 py-1 rounded-full uppercase tracking-wider">
              Sürdürülebilir Akademi Mimarisi
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl">
              Train The Trainer – İç Eğitmen Eğitimi Programı
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
              Akademilerin sürdürülebilirliğini sağlayacak kurum içi eğitmen yetiştirme programı. Şirket içi başarılı mağaza müdürlerini ve reyon şeflerini pedagojik ve teknik yönden eğiterek kendi akademinizin eğitmeni yapın.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
              <Medal className="h-6 w-6 text-[#087F96]" />
              <h3 className="font-bold text-white text-sm">Eğitmenlik Metodolojisi</h3>
              <p className="text-gray-300 font-light">Yetişkin eğitimi (Andragoji), sahada etkili sunum teknikleri ve soru yanıtlama kriz yönetimi.</p>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
              <FileCheck2 className="h-6 w-6 text-[#34A853]" />
              <h3 className="font-bold text-white text-sm">Standart İçerik Dağıtımı</h3>
              <p className="text-gray-300 font-light">Şirket genelindeki tüm şubelerde 1:1 aynı kalite ve standartta mağazacılık ve taze gıda anlatımı.</p>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
              <GraduationCap className="h-6 w-6 text-[#DDF4F7]" />
              <h3 className="font-bold text-white text-sm">Sertifikalı İç Eğitmen</h3>
              <p className="text-gray-300 font-light">Programı başarıyla tamamlayan şeflere Kurumsal İç Eğitmen Sertifikası verilir.</p>
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
