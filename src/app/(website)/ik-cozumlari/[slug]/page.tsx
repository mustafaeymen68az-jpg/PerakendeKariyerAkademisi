import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  BarChart3, 
  Award, 
  ShieldCheck, 
  Building2, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Users, 
  ChevronRight,
  Layers,
  Target,
  ArrowLeft
} from 'lucide-react';
import PromotionReadinessModule from '@/components/PromotionReadinessModule';
import SuccessionPlanModule from '@/components/SuccessionPlanModule';
import EnterpriseROICalculator from '@/components/EnterpriseROICalculator';
import EmployeeCareerPlanningModule from '@/components/EmployeeCareerPlanningModule';
import EmployeeDevelopmentTimelineModule from '@/components/EmployeeDevelopmentTimelineModule';
import EmployeePerformanceKPIModule from '@/components/EmployeePerformanceKPIModule';

interface HRDetailData {
  slug: string;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  iconName: string;
  benefits: string[];
  moduleDetails: {
    heading: string;
    text: string;
  }[];
}

const HR_SOLUTIONS_DATA: Record<string, HRDetailData> = {
  'calisan-ozgecmis-egitim-karnesi': {
    slug: 'calisan-ozgecmis-egitim-karnesi',
    title: 'Çalışan Özgeçmiş, Deneyim ve Eğitim Karnesi',
    badge: 'Resmi İK Özgeçmiş & Eğitim Karnesi',
    subtitle: 'İşe Başlangıç Tarihi, Geçmiş Şirket Deneyimleri, Eğitim Süreleri Özet Karnesi ve PDF İndirme',
    description: 'Çalışanın tüm geçmiş iş deneyimlerini, harici ve şirket içi eğitimlerini, eğitmen ve kurum detaylarını inceleyin ve resmi PDF karnesi olarak indirin.',
    iconName: 'FileText',
    benefits: [
      'İşe başlangıç tarihi ve şirket kıdem bilgileri',
      'Daha önce çalıştığı firmalar ve hizmet süreleri dökümü',
      'İşe başlamadan önce ve işe başladıktan sonra alınan tüm eğitimler',
      'Eğitmen, kurum ve çalıştığı şirket detaylı döküm modalı',
      'Tek tıkla resmi PDF karnesi oluşturma ve indirme'
    ],
    moduleDetails: [
      { heading: 'İş Deneyimi & Kıdem Takibi', text: 'Çalışanın işe başlangıç tarihi ve geçmiş şirket süreleri kronolojik olarak listelenir.' },
      { heading: 'Eğitmen & Kurum Detayları', text: 'Alınan her dersin eğitmeni, kurumu ve hangi şirkette çalışırken alındığı kaydedilir.' },
      { heading: 'PDF Karnesi İndirme', text: 'Tüm karne resmi olarak onaylı PDF formatında bilgisayara indirilebilir.' }
    ]
  },

  'calisan-kariyer-planlamasi': {
    slug: 'calisan-kariyer-planlamasi',
    title: 'Çalışan Kariyer Planlaması & SWOT Analizi',
    badge: 'Puan Sıralaması & SWOT Analizi',
    subtitle: 'Yetkinlik Puanlarına Göre Sıralı Çalışan Listesi, Akıllı Pozisyon Önerisi ve 90 Günlük Gelişim Tavsiyeleri',
    description: 'Çalışanları yetkinlik puanlarına göre listeleyin, otomatik üretilen SWOT analizlerini inceleyin ve 90 günlük somut gelişim tavsiyeleriyle en doğru pozisyon terfisini belirleyin.',
    iconName: 'Target',
    benefits: [
      'Puanlara göre sıralı canlı çalışan veri listesi',
      'Kişiye özel S-W-O-T Analiz Raporu (Güçlü/Zayıf Yönler, Fırsat ve Riskler)',
      'Yapay zekâ ve kural tabanlı %95 hassasiyetli hedef pozisyon önerisi',
      '30-60-90 günlük bireysel aksiyon tavsiye takvimi'
    ],
    moduleDetails: [
      { heading: 'Puan Bazlı Çalışan Sıralaması', text: 'Çalışanlar yetkinlik sınav ve saha notlarına göre +90p, +80p şeklinde otomatik gruplanır.' },
      { heading: '4 Kutu SWOT Karnesi', text: 'Çalışanın güçlü yönleri ve geliştirmesi gereken kritik 3 alan tek bakışta analiz edilir.' },
      { heading: 'Uyumlu Pozisyon Önerisi', text: 'Mevcut rol ile hedef rol arasındaki yetkinlik örtüşme yüzdesi (%94) hesaplanır.' }
    ]
  },

  'yetkinlik-matrisi': {
    slug: 'yetkinlik-matrisi',
    title: 'Perakende Yetkinlik Matrisi & Beceri Haritası',
    badge: 'Teknik & Davranışsal Yetkinlikler',
    subtitle: '26 Perakende Pozisyonu İçin 1. ve 2. Yıl Becerilerinin Birebir Ölçümü',
    description: 'Mağaza kasiyerinden Genel Müdüre kadar her rolün sahip olması gereken teknik, operasyonel ve davranışsal yetkinliklerin 5 kademeli şeffaf puanlama matrisi.',
    iconName: 'BarChart3',
    benefits: [
      'Rol bazlı net 1. Yıl ve 2. Yıl kazanım standartları',
      'Objektif değerlendirme rehberi ile kişisel kayırmacılığı önleme',
      'Eksik yetkinlikleri anında tespit edip nokta atışı eğitime yönlendirme',
      'Kıdemli ve yeni başlayan personel yetkinlik kıyaslama'
    ],
    moduleDetails: [
      { heading: '1. Seviye: Temel Saha Operasyon Becerileri', text: 'Kasa açılış-kapanış, 5S raf düzeni, ürün kabul ve müşteri güler yüz protokolleri.' },
      { heading: '2. Seviye: Görev Yetkinliği & Problem Çözme', text: 'Zor müşteri yönetimi, fire minimizasyonu, FIFO stok devir mantığı ve çapraz satış.' },
      { heading: '3. Seviye: Ekip Liderliği & Süreç Yönetimi', text: 'Vardiya çakışmalarını çözme, reyon ciro takibi, aday eğitimi ve geri bildirim verme.' },
      { heading: '4. Seviye: Stratejik Yönetim & Kar Marjı', text: 'P&L bütçe yönetimi, kategori marjı, rakip mağaza analizi ve bölgesel büyüme.' }
    ]
  },

  'terfi-yonetimi': {
    slug: 'terfi-yonetimi',
    title: 'Terfi Yönetimi & %80+ Karar Destek Sistemi',
    badge: '%80+ Hazırlık Skorlaması',
    subtitle: 'Subjektif Değerlendirmeye Son Veren Ağırlıklı İç Terfi Algoritması',
    description: 'Çalışanların teorik sınav puanları (%40), saha denetim skorları (%40) ve yönetici değerlendirmelerinin (%20) harmanlandığı şeffaf terfi hazırlık sistemi.',
    iconName: 'Award',
    benefits: [
      'Adil, şeffaf ve ölçülebilir terfi süreci',
      'Terfi alan çalışanlarda ilk 90 günde %92 başarı oranı',
      'İç terfi oranını %85 seviyesine çıkarma',
      'Hangi adayın ne zaman terfiye hazır olduğunu canlı takip etme'
    ],
    moduleDetails: [
      { heading: 'Ağırlıklı Skor Algoritması', text: 'Sadece sınav yetmez. Saha başarısı, ciro katkısı ve yetkinlik notu matematiksel formülle birleşir.' },
      { heading: '90 Günlük Uyum Takibi', text: 'Terfi eden yöneticinin yeni pozisyonundaki ilk 3 aydaki adaptasyon karnesi.' }
    ]
  },

  'yedekleme-plani': {
    slug: 'yedekleme-plani',
    title: 'Kritik Pozisyon İş Sürekliliği & Yedekleme Planı',
    badge: 'Succession Planning & Risk',
    subtitle: 'Mağaza Müdürü ve Bölge Müdürü Ayrılmalarına Karşı %100 Hazırlık',
    description: 'Kritik mağaza ve merkez pozisyonları boşaldığında aynı gün görevi devralacak "Ready Now" (Hemen Hazır) yedek yöneticilerin pipeline yönetimi.',
    iconName: 'ShieldCheck',
    benefits: [
      'Mağaza müdür ayrılmalarında ciro kaybını sıfırlama',
      'Bölge ve kategori bazlı yedek yönetici havuzu',
      '90 gün, 1 yıl ve 2 yıl vadeli yedekleme haritası',
      'Kritik kriz anlarında kesintisiz operasyon'
    ],
    moduleDetails: [
      { heading: 'Kritiklik Derecelendirmesi', text: 'Mağaza cirosu ve bölge büyüklüğüne göre pozisyonların risk seviyeleri haritalandırılır.' },
      { heading: 'Gölge Yönetici Hazırlığı', text: 'Yedek adaylar haftalık mağaza denetimlerinde aktif görev alarak göreve hazırlanır.' }
    ]
  },

  'egitim-yonetimi': {
    slug: 'egitim-yonetimi',
    title: 'Kurumsal Eğitim & LMS Gelişim Yönetimi',
    badge: '40 Modül • 160 Mikro Ders',
    subtitle: 'Tüm Şirket Çalışanları İçin Yapılandırılmış Gelişim Yol Yolculuğu',
    description: 'İş sağlığından kasa sistemlerine, manav fire yönetiminden yapay zekâya kadar 40 ana modül ve 160 mikro eğitimle otomatik atama ve takip.',
    iconName: 'Building2',
    benefits: [
      'Mobil uyumlu 15 dakikalık mikro öğrenme videoları',
      'Eğitim tamamlama ve sertifikasyon takip ekranı',
      'Otomatik yeni işe alım (onboarding) eğitim ataması',
      'Bölge ve mağaza bazlı eğitim başarı sıralaması'
    ],
    moduleDetails: [
      { heading: 'Modüler Eğitim Yapısı', text: 'Her perakende kadrosuna özel 1. yıl ve 2. yıl müfredat adımları.' },
      { heading: 'PDF Doküman ve Video Sınavı', text: 'Eğitim sonlarında interaktif sınavlar ve indirilebilir ders materyalleri.' }
    ]
  },

  'performans-kpi': {
    slug: 'performans-kpi',
    title: 'Perakende Performans & KPI Entegrasyon Motoru',
    badge: 'Ciro • Fire % • Sepet KPI',
    subtitle: 'Saha Yetkinlik Puanının Mağaza Finansal Sonuçlarıyla Birleştirilmesi',
    description: 'Eğitim alan çalışanların ciro artışı, sepet büyüklüğü, fire minimizasyonu ve müşteri memnuniyet skorlarına (CSAT) etkisini ölçen analitik motor.',
    iconName: 'TrendingUp',
    benefits: [
      'Eğitim yatırımının ROI (Geri Dönüş) hesabını çıkarma',
      'Fire oranında ortalama %3.2 somut düşüş',
      'Kasa önü sepet tamamlama ile ortalama sepet büyüklüğünde %14 artış',
      'Mağaza bazlı performans ve prim hesaplama'
    ],
    moduleDetails: [
      { heading: 'Finansal Bağlantı', text: 'Yetkinlik puanı yüksek mağazaların fire ve ciro başarı korelasyon analizi.' },
      { heading: 'Ödüllendirme Motoru', text: 'Yüksek yetkinlik gösteren çalışanlara adil prim dağıtım hesaplayıcısı.' }
    ]
  },

  'gelisim-karnesi': {
    slug: 'gelisim-karnesi',
    title: '90 Günlük Bireysel Çalışan Gelişim Karnesi',
    badge: 'Kişiselleştirilmiş Gelişim Karnesi',
    subtitle: 'Her Çalışan İçin Şeffaf, Takip Edilebilir Gelişim Karnesi ve Aksiyon Planı',
    description: 'Çalışanın mevcut yetkinlik açığını, alması gereken 3 kritik eğitimi ve 90 günlük gelişim hedeflerini listeleyen bireysel başarı karnesi.',
    iconName: 'FileText',
    benefits: [
      'Çalışan ve yönetici arasında şeffaf hedef birliği',
      '90 günde bir güncellenen dinamik gelişim takvimi',
      'LinkedIn ve özgeçmişe eklenebilir doğrulanabilir karne',
      'Saha koçluğu ve geri bildirim kayıtları'
    ],
    moduleDetails: [
      { heading: 'Kişisel Aksiyon Haritası', text: 'Çalışanın güçlendirmesi gereken 3 temel alan belirlenir.' },
      { heading: 'Eğitmen & Müdür Onayı', text: 'Her 30 günde bir gelişim adımları kontrol edilip imzalanır.' }
    ]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = HR_SOLUTIONS_DATA[resolvedParams.slug];
  if (!data) return { title: 'İK Çözümü Bulunamadı | Perakende Kariyer Akademisi' };
  return {
    title: `${data.title} | Perakende Kariyer Akademisi`,
    description: data.description
  };
}

export default async function HRSolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = HR_SOLUTIONS_DATA[resolvedParams.slug];

  if (!data) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 w-full">
        
        {/* Back Link */}
        <Link
          href="/ik-cozumlari"
          className="inline-flex items-center space-x-2 text-xs font-bold text-[#087F96] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tüm Kurumsal İK Çözümlerine Dön</span>
        </Link>

        {/* Specialized Interactive Modules based on Slug */}
        {(data.slug === 'calisan-kariyer-planlamasi' || data.slug === 'calisan-ozgecmis-egitim-karnesi') && <EmployeeCareerPlanningModule />}
        {data.slug === 'gelisim-karnesi' && <EmployeeDevelopmentTimelineModule />}
        {data.slug === 'terfi-yonetimi' && <PromotionReadinessModule />}
        {data.slug === 'yedekleme-plani' && <SuccessionPlanModule />}
        {data.slug === 'yetkinlik-matrisi' && <EnterpriseROICalculator />}
        {data.slug === 'performans-kpi' && <EmployeePerformanceKPIModule />}

      </div>
    </div>
  );
}
