import { DetailedCourse } from '@/components/CourseDetailModal';

export const AI_COURSES_DETAILED: Record<string, DetailedCourse> = {
  'perakendede-yapay-zeka-kullanimi': {
    id: 'perakendede-yapay-zeka-kullanimi',
    title: '1. Perakendede Yapay Zekâ Kullanımı',
    category: 'Temel & Saha',
    level: 'Temel & Saha Seviyesi',
    duration: '24 Saat (16 Mikro Ders)',
    description: 'Mağaza içi stok takibi, fiyatlandırma stratejileri ve müşteri davranış modellerinde yapay zekânın temel mantığı ve saha uygulamaları.',
    overview: 'Bu eğitim modülünde; perakendecilik sektöründe yapay zekâ (AI) ve makine öğreniminin müşteri deneyimi, stok yönetimi, mağaza düzeni ve satış artırma süreçlerine nasıl entegre edildiğini uygulamalı vakalarla öğreneceksiniz.',
    learningOutcomes: [
      'Yapay zekâ ve makine öğreniminin perakendedeki 10 temel kullanım alanını kavrama',
      'Mağaza içi müşteri ısı haritaları ve kamera analitiği verilerini okuma',
      'Dinamik fiyatlandırma ve rekabet analizi algoritmalarını anlama',
      'Stok devir hızını artırmak için AI tahmin modellerini kullanma'
    ],
    curriculum: [
      {
        moduleTitle: 'Modül 1: Perakendede Dijital Dönüşüm ve Yapay Zekâ Temelleri',
        duration: '6 Saat',
        lessons: [
          'Perakende 4.0 ve Yapay Zekânın Sektörel Rolü',
          'Geleneksel Mağazacılık vs. AI Destekli Mağazacılık',
          'Müşteri Davranış Analitiği ve Kamera Sistemleri'
        ]
      },
      {
        moduleTitle: 'Modül 2: Saha Operasyonunda Yapay Zekâ Uygulamaları',
        duration: '8 Saat',
        lessons: [
          'Raf Doluluk ve Kayıp-Kaçak Kameralarının Çalışma Mantığı',
          'Otomatik Barkod ve Etiket Fiyat Kontrol Algoritmaları',
          'Mağaza İçi Trafik Yoğunluğu ve Vardiya Optimizasyonu'
        ]
      },
      {
        moduleTitle: 'Modül 3: Veriye Dayalı Satış ve Müşteri Deneyimi',
        duration: '6 Saat',
        lessons: [
          'Kişiselleştirilmiş Kampanya ve Sepet Tamamlama Önerileri',
          'Müşteri Kayıp (Churn) Riski Erken Uyarı Sistemleri',
          'Omnichannel Veri Bütünleşmesi'
        ]
      },
      {
        moduleTitle: 'Modül 4: Vaka Analizi ve Saha Projesi',
        duration: '4 Saat',
        lessons: [
          'Örnek Mağaza AI Dönüşüm Senaryosu Çalışması',
          'Final Mini Sınavı ve Değerlendirme'
        ]
      }
    ],
    videoSample: {
      title: 'Mağaza İçi Müşteri Trafiği ve Kamera Analitiği Dersi',
      duration: '04:15',
      thumbnail: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=1000',
      chapters: [
        { time: '00:00', title: 'Giriş: Perakendede AI Kameralar' },
        { time: '01:10', title: 'Müşteri Isı Haritası Okuma' },
        { time: '02:30', title: 'Kasa Kuyruk Yoğunluk Tespiti' },
        { time: '03:45', title: 'Saha Aksiyon Rehberi' }
      ]
    },
    pdfDocuments: [
      {
        title: '📄 Perakendede Yapay Zekâ Kullanım Rehberi V1.pdf',
        fileSize: '2.4 MB',
        type: 'Rehber & Şablon',
        pages: 14,
        description: 'Saha çalışanları ve mağaza yöneticileri için AI kameralar, ısı haritaları ve dinamik stok takip kılavuzu.',
        sampleContent: [
          'PERAKENDEDE YAPAY ZEKÂ KULLANIM REHBERİ',
          '1. Mağaza İçi Kamera Analitiği:',
          'Kameralardan elde edilen ısı haritaları, müşterilerin hangi reyonlarda ne kadar süre vakit geçirdiğini (Dwell Time) milisaniye hassasiyetinde ölçer.',
          '2. Kasa Kuyruk Uyarısı:',
          'Bekleyen müşteri sayısı 4 kişiyi aştığında yapay zekâ sistemi doğrudan vardiya müdürünün mobil cihazına "Destek Kasa Açılış Uyarısı" gönderir.',
          '3. Raf Doluluk Kontrolü:',
          'Eksilen kritik ürünler (Out-of-Stock) tespit edildiğinde depodan reyon görevlisine anlık bildirim düşer.'
        ]
      },
      {
        title: '📄 AI Destekli Mağaza KPI Kontrol Çizelgesi.pdf',
        fileSize: '1.8 MB',
        type: 'Checklist',
        pages: 8,
        description: 'Günlük vardiyada kontrol edilecek 12 temel AI veri metriği ve onay listesi.',
        sampleContent: [
          'GÜNLÜK AI MAĞAZA CHECKLISTI',
          '✓ Sabah Açılış: Raf kamerası kalibrasyonu kontrolü',
          '✓ Saat 12:00: Kasa kuyruk yoğunluk raporu incelemesi',
          '✓ Saat 16:00: Sepet ikraz tamamlatma oranı %80+ mı?',
          '✓ Kapanış: Günlük fire ve kayıp-kaçak AI uyarısı değerlendirmesi'
        ]
      }
    ]
  },

  'uretken-yapay-zeka-ve-etkili-prompt-kullanim': {
    id: 'uretken-yapay-zeka-ve-etkili-prompt-kullanim',
    title: '2. Üretken Yapay Zekâ ve Etkili Prompt Kullanımı',
    category: 'Uygulamalı',
    level: 'Uygulamalı Uzmanlık',
    duration: '32 Saat (20 Mikro Ders)',
    description: 'ChatGPT, Claude, DeepSeek ve LLM modellerine perakendeye özel prompt yazma, kampanya metni ve rapor taslağı oluşturma.',
    overview: 'Bu eğitimde; perakendecilik sahasında ve genel merkezde sıklıkla ihtiyaç duyulan metin yazımı, kampanya kurgusu, şikayet yanıtları ve yönetim raporlarını LLM modelleri ile saniyeler içinde hazırlama tekniklerini öğreneceksiniz.',
    learningOutcomes: [
      'Perakendeye özel 5 aşamalı Prompt Mimarisi (Role, Context, Task, Constraint, Output)',
      'Müşteri şikâyetlerine 10 saniyede KVKK uyumlu empati dolu yanıt hazırlama',
      'Haftalık mağaza satış performansını AI ile özet rapor metnine dönüştürme',
      'Sosyal medya, SMS ve push bildirim kampanya metin taslakları üretme'
    ],
    curriculum: [
      {
        moduleTitle: 'Modül 1: Prompt Mühendisliğinin Perakende Mantığı',
        duration: '8 Saat',
        lessons: [
          'Rol-Bağlam-Görev-Kısıt Çerçevesi ile Prompt Yazımı',
          'ChatGPT ve Claude Modellerinde Sıfır Sapma Sağlama',
          'Perakende Terimler Sözlüğü ve AI Sözlük Entegrasyonu'
        ]
      },
      {
        moduleTitle: 'Modül 2: Uygulamalı Mağaza ve Pazarlama Promptları',
        duration: '12 Saat',
        lessons: [
          'Çapraz Satış ve Sepet Büyütme Cümleleri Üretme',
          'Zor Müşteri Şikâyet Çözüm Şablonları',
          'Kategori İndirim Kampanyası Duyuru Metinleri'
        ]
      },
      {
        moduleTitle: 'Modül 3: Yönetici Raporlaması ve Özet Çıkarma',
        duration: '8 Saat',
        lessons: [
          'Excel Tablosunu AI Modeline Verip Yönetici Özeti Alma',
          'Haftalık Bölge Müdürü Toplantı Notu Şablonu'
        ]
      },
      {
        moduleTitle: 'Modül 4: Uygulama ve Atölye',
        duration: '4 Saat',
        lessons: [
          'Canlı Prompt Simülasyonu ve Sertifika Sınavı'
        ]
      }
    ],
    videoSample: {
      title: 'ChatGPT ile 10 Saniyede Mağaza Satış Raporu Oluşturma',
      duration: '05:30',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
      chapters: [
        { time: '00:00', title: 'Prompt Yapısının Kurulumu' },
        { time: '01:30', title: 'Excel Satış Verisini Metne Çevirme' },
        { time: '03:15', title: 'Kritik Uyarı Cümlelerini Ekleme' },
        { time: '04:50', title: 'Bölge Müdürüne Gönderim Formatı' }
      ]
    },
    pdfDocuments: [
      {
        title: '📄 Perakende Yapay Zekâ 100+ Hazır Prompt Kütüphanesi.pdf',
        fileSize: '3.1 MB',
        type: 'Prompt Kitapçığı',
        pages: 22,
        description: 'Satın alma, mağaza müdürü, İK ve pazarlama için kopyala-yapıştır kullanıma hazır 100+ prompt şablonu.',
        sampleContent: [
          'PERAKENDE 100+ HAZIR PROMPT KÜTÜPHANESİ',
          'PROMPT #14 (Kasa Önü Çapraz Satış):',
          '"Sen 15 yıllık tecrübeli bir Mağaza Müdürüsün. Müşteri kasada Deterjan aldığında, yanına Çamaşır Yumuşatıcısı sattıracak 2 alternatifikna cümlesi yaz. Tonu samimi, nazik ve çözüm odaklı olsun."',
          'PROMPT #42 (Mağaza Fire Raporu Özeti):',
          '"Aşağıdaki fire verilerini incele. En yüksek kayıp yaşanan 3 kategoriyi tespit et ve Bölge Müdürüne sunulacak 4 maddelik aksiyon planı çıkar."'
        ]
      },
      {
        title: '📄 LLM ile Rapor Hazırlama Rehberi.pdf',
        fileSize: '1.6 MB',
        type: 'Ders Notu',
        pages: 10,
        description: 'Görsel, tablo ve metin çıktılarının doğruluk kontrol checklisti.',
        sampleContent: [
          'LLM VERİ DOĞRULAMA ÇERÇEVESİ',
          '1. Hallucination (Yanlış Bilgi) Kontrolü:',
          'AI çıktısındaki sayısal ciro ve oran değerlerini orijinal Excel dosyanızla birebir kıyaslayın.',
          '2. KVKK Uyum Maskelemesi:',
          'Müşteri isim ve TC Kimlik numaralarını AI modeline girmeden önce mutlaka maskeleyin.'
        ]
      }
    ]
  },

  'yapay-zeka-ile-raporlama-ve-veri-analizi': {
    id: 'yapay-zeka-ile-raporlama-ve-veri-analizi',
    title: '3. Yapay Zekâ ile Raporlama ve Veri Analizi',
    category: 'Veri & Analitik',
    level: 'İleri Seviye Veri Analitiği',
    duration: '30 Saat (18 Mikro Ders)',
    description: 'Binlerce satış satırını saniyeler içinde yapay zekâya analiz ettirme, trendleri ve mağaza kayıplarını otomatik bulma.',
    overview: 'Bu modülde; büyük veri setlerini (SQL, Excel, Power BI) yapay zeka araçlarıyla işleyerek mağaza cirosu, sepet ortalaması, marj kayıpları ve müşteri alışveriş sıklıklarını analiz etmeyi öğreneceksiniz.',
    learningOutcomes: [
      'Gelişmiş Python / AI veri analitiği kütüphanelerini kod yazmadan kullanma',
      'Şubeler arası ciro ve kârlılık sapmalarını otomatik tespit etme',
      'Müşteri sepet analizlerinde çapraz ürün birliktelik kurallarını çıkarma',
      'Anomali tespiti ile kasanın veya stoğun kaçak risklerini bulma'
    ],
    curriculum: [
      {
        moduleTitle: 'Modül 1: Perakende Veri Setleri ve AI Hazırlığı',
        duration: '6 Saat',
        lessons: [
          'Veri Temizleme ve AI Formatına Dönüştürme',
          'Ciro, Marj, Sepet Boyutu ve Ziyaretçi Frekansı Verileri'
        ]
      },
      {
        moduleTitle: 'Modül 2: Otomatik Trend ve Mağaza Kıyaslama',
        duration: '10 Saat',
        lessons: [
          'Şube Performans Skorlama Algoritmaları',
          'Reyon Verimliliği ve m² Başına Satış Hesabı',
          'Otomatik Grafik ve Yönetici Dashboardı Üretme'
        ]
      },
      {
        moduleTitle: 'Modül 3: Sepet ve Müşteri Analitiği',
        duration: '10 Saat',
        lessons: [
          'Birliktelik Kuralı (Market Basket Analysis)',
          'Fiyat Esnekliği ve İndirim Etki Analizi'
        ]
      },
      {
        moduleTitle: 'Modül 4: Bitirme Projesi',
        duration: '4 Saat',
        lessons: [
          '50.000 Satırlık Satış Verisinde AI Otomatik Raporlama Projesi'
        ]
      }
    ],
    videoSample: {
      title: 'Power BI ve Yapay Zekâ ile Anomali Tespiti',
      duration: '06:10',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
      chapters: [
        { time: '00:00', title: 'Veri Kümesini Yükleme' },
        { time: '01:45', title: 'AI Anomali Algoritması Çalıştırma' },
        { time: '03:50', title: 'Mağaza Sapma Raporu Okuma' },
        { time: '05:20', title: 'Yönetim Özeti Çıkarma' }
      ]
    },
    pdfDocuments: [
      {
        title: '📄 Yapay Zekâ Veri Analizi ve Raporlama Kılavuzu.pdf',
        fileSize: '4.2 MB',
        type: 'Teknik Kılavuz',
        pages: 18,
        description: 'Binlerce satır satış verisini analiz eden formüller ve AI veri işleme kodsuz komut seti.',
        sampleContent: [
          'YAPAY ZEKÂ VERİ ANALİZİ REHBERİ',
          '1. Trend Analizi:',
          'Son 12 ayın ciro verisi yüklendiğinde AI modeli dönemsel (Sezonsal) kırılımları otomatik ayıklar.',
          '2. Şube Sapma Matrisi:',
          'Ortalamanın %15 altında kalan mağazalar kârlılık uyarısı olarak işaretlenir.'
        ]
      }
    ]
  }
};

// Generic fallback detailed course generator for any catalog course ID
export function getDetailedCourseData(courseId: string, title?: string, category?: string): DetailedCourse {
  const existing = AI_COURSES_DETAILED[courseId];
  if (existing) return existing;

  const courseTitle = title || 'Perakende Profesyonellik Eğitimi';
  const courseCat = category || 'Mağaza Yönetimi & Operasyon';

  return {
    id: courseId,
    title: courseTitle,
    category: courseCat,
    level: 'Görev Yetkinlik Seviyesi',
    duration: '16 Saat (12 Mikro Ders)',
    description: `${courseTitle} müfredatı; perakendecilik sahasındaki uygulamalı becerileri, KPI yönetimi ve mağaza operasyonel standartlarını geliştirmek üzere tasarlanmıştır.`,
    overview: `Bu modül, ${courseTitle} alanında teorik ve pratik tüm süreçleri kapsar. Ders videoları, indirilebilir PDF çalışma dokümanları, mini sınavlar ve vaka analizleriyle zenginleştirilmiştir.`,
    learningOutcomes: [
      `${courseTitle} konusundaki temel standartları tam öğrenme`,
      'Saha operasyonunda verimlilik ve hız sağlama',
      'Müşteri memnuniyeti ve mağaza ciro KPI hedeflerine katkıda bulunma',
      'Hata oranını minimize eden kontrol checklist yapılarını uygulama'
    ],
    curriculum: [
      {
        moduleTitle: 'Modül 1: Temel İlkeler ve Saha Hazırlığı',
        duration: '4 Saat',
        lessons: [
          'Giriş ve Standart İş Prosedürleri (SOP)',
          'Operasyonel Riskler ve Önleyici Tedbirler',
          'Günlük Hazırlık ve Kontrol Listeleri'
        ]
      },
      {
        moduleTitle: 'Modül 2: Uygulamalı Yetkinlik ve Süreç Yönetimi',
        duration: '6 Saat',
        lessons: [
          'Uygulamalı Saha Adımları ve Teknikler',
          'Müşteri İletişimi ve Çatışma Yönetimi',
          'Veri Raporlama ve Takip'
        ]
      },
      {
        moduleTitle: 'Modül 3: İleri Seviye ve KPI Hedefleri',
        duration: '4 Saat',
        lessons: [
          'Performans Skor Kartı ve Metrik Analizi',
          'Sürekli İyileştirme (Kaizen) Çalışması'
        ]
      },
      {
        moduleTitle: 'Modül 4: Ölçme ve Değerlendirme',
        duration: '2 Saat',
        lessons: [
          'Vaka Çalışması ve Sertifikasyon Mini Sınavı'
        ]
      }
    ],
    videoSample: {
      title: `${courseTitle} Uygulamalı Saha Dersi`,
      duration: '04:45',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0a670c480728?auto=format&fit=crop&q=80&w=1000',
      chapters: [
        { time: '00:00', title: 'Ders Tanıtımı ve Hedefler' },
        { time: '01:20', title: 'Saha Operasyonel İpuçları' },
        { time: '02:50', title: 'Sık Yapılan Hatalar ve Çözümleri' },
        { time: '04:10', title: 'Özet ve Aksiyon Adımları' }
      ]
    },
    pdfDocuments: [
      {
        title: `📄 ${courseTitle.replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ ]/g, '')} Çalışma Rehberi.pdf`,
        fileSize: '2.1 MB',
        type: 'Rehber & Doküman',
        pages: 12,
        description: `Bu eğitim modülüne ait tüm özet ders notları, kontrol çizelgeleri ve saha uygulama kuralları.`,
        sampleContent: [
          `PERAKENDE KARİYER AKADEMİSİ DERS REHBERİ: ${courseTitle.toUpperCase()}`,
          '1. Temel Saha İlkesi:',
          'Operasyonel mükemmellik her sabah yapılan 10 dakikalık kontrol listesi onaylanması ile başlar.',
          '2. KPI Uyum Hedefi:',
          'Hata oranının %1\'in altında tutulması için çift kontrol mekanizması uygulanmalıdır.',
          '3. Ekip Koordinasyonu:',
          'Vardiya değişimlerinde teslim formu eksiksiz doldurulmalıdır.'
        ]
      },
      {
        title: `📄 ${courseTitle.replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ ]/g, '')} Saha Checklist.pdf`,
        fileSize: '1.4 MB',
        type: 'Checklist',
        pages: 6,
        description: 'Günlük ve haftalık saha uygulamaları kontrol çizelgesi.',
        sampleContent: [
          'GÜNLÜK SAHA CHECKLISTI',
          '✓ Ürün ve reyon düzeni kontrolü',
          '✓ Etiket ve fiyat doğrulaması',
          '✓ Müşteri iletişim standartlarına uyum',
          '✓ Gün sonu rapor teslimi'
        ]
      }
    ]
  };
}
