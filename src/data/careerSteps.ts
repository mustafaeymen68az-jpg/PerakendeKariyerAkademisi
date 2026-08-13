export interface CareerStep15 {
  id: number;
  title: string;
  badgeHeading?: string;
  coreMessage?: string;
  purpose: string;
  recommendedDuration: string;
  
  // Current level details
  currentTrainings: string[];
  competencies: string[];
  kpis: string[];
  
  // Dynamic Next Level Training Engine
  nextCareerLevel: string;
  nextCareerLevelId: number;
  requiredTrainingForNextLevel: string[];
  nextCompetencies: string[];
  promotionCriteria?: string[];
  ctaText?: string;
  
  // Optional special attributes for specific levels
  rotationProgram?: {
    title: string;
    stages: { name: string; icon: string; desc: string }[];
  };
  promotionReadinessScorecard?: {
    trainingScore: number; // e.g. 90
    kpiScore: number; // e.g. 82
    fieldCompetencyScore: number; // e.g. 85
    finalProjectScore: number; // e.g. 75
    totalScore: number; // e.g. 83
  };
  branchingView?: {
    stage1: string;
    stage2: string;
    stage3: string;
  };
  departmentIcons?: { name: string; key: string }[];
  ceoFocusAreas?: { title: string; desc: string }[];
  finalProject?: {
    title: string;
    stages?: string[];
  };
}

export const CAREER_STEPS_15_DATA: CareerStep15[] = [
  // 1. KASİYER
  {
    id: 1,
    title: 'Kasiyer',
    badgeHeading: 'Kariyer Burada Başlıyor',
    coreMessage: 'Kendi İşini Yönet',
    purpose: 'Perakendenin temel operasyonunu, müşteri temasını ve mağaza disiplinini öğrenmek.',
    recommendedDuration: '6–12 Ay',
    currentTrainings: [
      'Perakendeciliğe Giriş ve Temel Mağazacılık',
      'Kurum Kültürü ve Hizmet Standartları',
      'Temel Kasiyerlik',
      'Kasa Açılışı ve Kapanışı',
      'POS ve Kasa Programı',
      'Nakit ve Kart İşlemleri',
      'Barkod ve Fiyat İşlemleri',
      'İade / Değişim',
      'Müşteri İletişimi',
      'Dijital Kart / CRM',
      'Kasa Önü Satış',
      'Kayıp-Kaçak',
      'KVKK',
      'İSG'
    ],
    competencies: [
      'Müşteri odaklılık',
      'Dikkat',
      'Hız ve doğruluk',
      'İş disiplini',
      'Temel satış',
      'Sistem kullanımı'
    ],
    kpis: [
      'Kasa açık/fazla farkı',
      'İşlem hata oranı',
      'İşlem hızı',
      'Müşteri memnuniyet puanı',
      'Dijital kart yönlendirme'
    ],
    nextCareerLevel: 'Kıdemli Kasiyer / Kasa Sorumlusu',
    nextCareerLevelId: 2,
    requiredTrainingForNextLevel: [
      'Gün Sonu Kasa Mutabakatı',
      'Kasa Açık/Fazla Farklarının Yönetimi',
      'Hızlı Kasa ve Kuyruk Yönetimi',
      'Sahte Para ve Şüpheli İşlemler',
      'Zor Müşteri Yönetimi',
      'Temel Problem Çözme',
      'Vardiya Takibi',
      'Yeni Kasiyer İşbaşı Eğitimi',
      'Etkin Takım Çalışması',
      'Etkili İletişim',
      'Temel Liderlik',
      'Temel Excel ve Rapor Okuma'
    ],
    nextCompetencies: [
      'İlk seviye liderlik',
      'Ekip koordinasyonu',
      'Problem çözme',
      'Hata kontrolü',
      'Çalışan yönlendirme',
      'Günlük raporlama'
    ],
    ctaText: 'Bu Kariyer Basamağına Hazırlan'
  },

  // 2. KIDEMLİ KASİYER / KASA SORUMLUSU
  {
    id: 2,
    title: 'Kıdemli Kasiyer / Kasa Sorumlusu',
    badgeHeading: 'Bireysel Operasyondan Ekip Koordinasyonuna',
    coreMessage: 'Operasyonuna Sahip Çık',
    purpose: 'Bireysel operasyondan ekip koordinasyonuna geçmek.',
    recommendedDuration: '6–12 Ay',
    currentTrainings: [
      'Gün Sonu Kasa Mutabakatı',
      'Kasa Farklarının Yönetimi',
      'Hızlı Kasa ve Kuyruk Yönetimi',
      'Sahte Para Kontrolü',
      'Zor Müşteri Yönetimi',
      'Temel Problem Çözme',
      'Vardiya Takibi',
      'Yeni Kasiyer İşbaşı Eğitimi'
    ],
    competencies: [
      'Ekip koordinasyonu',
      'Problem çözme',
      'İlk seviye liderlik',
      'Vardiya takibi',
      'Hata kontrolü',
      'Müşteri problemi çözme'
    ],
    kpis: [
      'Kasa ekibi açık/fazla oranı',
      'Kuyruk bekleme süresi',
      'Müşteri şikâyet çözüm hızı',
      'Yeni kasiyer adaptasyon süresi'
    ],
    nextCareerLevel: 'Takım Lideri / Vardiya Sorumlusu',
    nextCareerLevelId: 3,
    requiredTrainingForNextLevel: [
      'Vardiya Yönetimi',
      'Günlük Görev Dağılımı',
      'Kasa ve Reyon Yoğunluk Yönetimi',
      'Mağaza Açılış/Kapanış',
      'Reyon Doluluk Takibi',
      'Kampanya Kontrolü',
      'Check-list Yönetimi',
      'Temel Stok',
      'Müşteri Şikâyeti',
      'Takım Liderliği',
      'Motivasyon',
      'Çatışma Yönetimi',
      'Geri Bildirim',
      'Temel KPI'
    ],
    nextCompetencies: [
      'Görev dağıtma',
      'Önceliklendirme',
      'Zaman yönetimi',
      'Ekip yönlendirme',
      'Anlık karar alma',
      'Saha kontrolü'
    ],
    ctaText: 'Vardiya Liderliğine Hazırlan'
  },

  // 3. TAKIM LİDERİ / VARDİYA SORUMLUSU
  {
    id: 3,
    title: 'Takım Lideri / Vardiya Sorumlusu',
    badgeHeading: 'Ekibi Yönlendirme Basamağı',
    coreMessage: 'Kendi işini yapmaktan ekibi yönlendirmeye geçiş.',
    purpose: 'Kendi işini yapmaktan ekibi koordine etmeye ve vardiya saha hakimiyeti sağlamaya geçiş.',
    recommendedDuration: '12–18 Ay',
    currentTrainings: [
      'Vardiya Yönetimi',
      'Günlük Görev Dağılımı',
      'Kasa ve Reyon Yoğunluk Yönetimi',
      'Mağaza Açılış/Kapanış',
      'Check-list Yönetimi',
      'Temel KPI ve Saha Kontrolü'
    ],
    competencies: [
      'Görev dağıtma',
      'Önceliklendirme',
      'Zaman yönetimi',
      'Ekip yönlendirme',
      'Anlık karar alma',
      'Saha kontrolü'
    ],
    kpis: [
      'Vardiya görev gerçekleşme oranı',
      'Reyon raf bulunurluğu',
      'Ekip motivasyon puanı',
      'Açılış/Kapanış denetim skoru'
    ],
    nextCareerLevel: 'Mağaza Müdür Yardımcısı Adayı',
    nextCareerLevelId: 4,
    requiredTrainingForNextLevel: [
      'Günlük Mağaza İşleyişi',
      'Kasa Operasyonu',
      'Reyon Yönetimi',
      'Depo ve Mal Kabul',
      'Stok Yönetimi',
      'Sipariş',
      'Sayım ve Envanter',
      'Fire ve İade',
      'SKT',
      'Planogram',
      'Kampanya',
      'Taze Gıda Temelleri',
      'Perakende Matematiği',
      'Temel Finans',
      'KPI',
      'Excel',
      'Mikro / Mikroskop'
    ],
    nextCompetencies: [
      'Tüm mağaza süreçlerine hakimiyet',
      'Rotasyonel mağazacılık',
      'Stok ve sayım disiplini',
      'Finansal temel farkındalık'
    ],
    ctaText: 'Rotasyon Programına Başvur'
  },

  // 4. MAĞAZA MÜDÜR YARDIMCISI ADAYI
  {
    id: 4,
    title: 'Mağaza Müdür Yardımcısı Adayı',
    badgeHeading: 'Saha Rotasyon Programı',
    coreMessage: 'Mağazanın Tamamını Öğren',
    purpose: 'Mağazanın 6 kritik departmanında rotasyon tamamlayarak müdür yardımcılığına hazırlanmak.',
    recommendedDuration: '3–6 Ay',
    currentTrainings: [
      'Mağaza Rotasyon Programı',
      'Reyon ve Mal Kabul Disiplini',
      'Stok Sayım Yöntemleri',
      'Taze Gıda Hijyen ve Kalite'
    ],
    competencies: [
      'Çok yönlü departman hakimiyeti',
      'Hızlı adaptasyon',
      'Kapsamlı saha analizi',
      'Vekâlet yeteneği'
    ],
    kpis: [
      'Rotasyon modül tamamlama skoru',
      'Departman sınav puanları',
      'Saha gölgeleme değerlendirmesi'
    ],
    nextCareerLevel: 'Mağaza Müdür Yardımcısı',
    nextCareerLevelId: 5,
    requiredTrainingForNextLevel: [
      'Günlük Operasyon Yönetimi',
      'Vardiya ve Norm Kadro Takibi',
      'Stok ve Otomatik Sipariş',
      'Raf Bulunurluğu ve Merchandising',
      'Sayım ve Envanter Kontrolü',
      'Fire ve SKT Takibi',
      'Müşteri Şikâyet Yönetimi',
      'KPI Yorumlama ve Aksiyon Alma',
      'CRM ve Dijital Kart Takibi'
    ],
    nextCompetencies: [
      'Operasyon koordinasyonu',
      'Personel yönetimi',
      'KPI yorumlama',
      'Stok yönetimi',
      'Müşteri problemi çözme',
      'Vekâlet'
    ],
    rotationProgram: {
      title: '6 Aşamalı Mağaza Rotasyon Programı',
      stages: [
        { name: 'Kasa', icon: 'Calculator', desc: 'Kasa işlemleri & mutabakat' },
        { name: 'Reyon', icon: 'Layers', desc: 'Raf düzeni & planogram' },
        { name: 'Depo', icon: 'PackageCheck', desc: 'Mal kabul & stok sayımı' },
        { name: 'Taze Gıda', icon: 'Apple', desc: 'Hijyen & tazelik kontrolü' },
        { name: 'Müşteri Hizmetleri', icon: 'Headphones', desc: 'İade & şikâyet yönetimi' },
        { name: 'Yönetici Gölgeleme', icon: 'UserCheck', desc: 'Müdür yanında birebir pratik' }
      ]
    },
    ctaText: 'Rotasyonu Tamamla & Müdür Yardımcısı Ol'
  },

  // 5. MAĞAZA MÜDÜR YARDIMCISI
  {
    id: 5,
    title: 'Mağaza Müdür Yardımcısı',
    badgeHeading: 'Günlük Operasyon Yöneticisi',
    coreMessage: 'Günlük Operasyonu Yönet',
    purpose: 'Mağazanın günlük operasyonunu eksiksiz yürütmek ve Mağaza Müdürüne vekâlet etmek.',
    recommendedDuration: '12–18 Ay',
    currentTrainings: [
      'Günlük Operasyon Yönetimi',
      'Vardiya ve Norm Kadro',
      'Stok ve Sipariş Yönetimi',
      'Raf Bulunurluğu',
      'Sayım ve Envanter',
      'Fire ve İade Yönetimi',
      'SKT Kontrolü',
      'Müşteri İlişkileri',
      'KPI ve Excel Raporlama'
    ],
    competencies: [
      'Operasyon koordinasyonu',
      'Personel yönetimi',
      'KPI yorumlama',
      'Stok yönetimi',
      'Müşteri problemi çözme',
      'Vekâlet'
    ],
    kpis: [
      'Raf bulunurluğu (%98+)',
      'Fire ve zayi oranı',
      'Envanter farkı',
      'Kampanya uygulama başarısı',
      'Personel görev gerçekleşmesi',
      'Müşteri memnuniyet skoru'
    ],
    nextCareerLevel: 'Mağaza Müdürü Adayı',
    nextCareerLevelId: 6,
    requiredTrainingForNextLevel: [
      'Mağaza Müdürü Yetiştirme Programı',
      'Mağaza Liderliği ve Strateji',
      'KPI Yönetimi ve Aksiyon Planlama',
      'Brüt Kâr ve Marj Yönetimi',
      'Mağaza Bütçe Planlama',
      'Personel Verimliliği ve Norm Kadro',
      'Stok Devir Hızı ve GMROI',
      'Fire Minimizasyonu Stratejileri',
      'Müşteri Deneyimi Mükemmelliği',
      'Performans Görüşmesi ve Geri Bildirim',
      'Kriz Yönetimi'
    ],
    nextCompetencies: [
      'P&L (Kâr-Zarar) yönetimi',
      'Stratejik mağaza liderliği',
      'Performans koçluğu',
      'Bütçeleme ve maliyet kontrolü'
    ],
    finalProject: {
      title: '90 Günlük Mağaza Gelişim Projesi',
      stages: ['Mevcut Durum Analizi', 'Problem ve Kök Neden', 'Hedef KPI ve Aksiyon', 'Uygulama', 'Sonuç Raporu']
    },
    ctaText: 'Mağaza Müdürü Adaylığına Yüksel'
  },

  // 6. MAĞAZA MÜDÜRÜ ADAYI
  {
    id: 6,
    title: 'Mağaza Müdürü Adayı',
    badgeHeading: 'Terfiye Hazırlık Değerlendirme Süreci',
    coreMessage: 'Yönetmeye Hazır Olduğunu Kanıtla',
    purpose: 'Mağazayı bağımsız yönetebilme yetkinliğini 90 günlük gelişim projesi ve simülasyonlarla kanıtlamak.',
    recommendedDuration: '3–6 Ay',
    currentTrainings: [
      'Mağaza Müdürü Yetiştirme Programı',
      'Finans & P&L Yönetimi',
      'Kriz Yönetimi ve Vekâlet'
    ],
    competencies: [
      'Bağımsız mağaza yönetimi',
      'Liderlik ve temsil',
      'Finansal analiz',
      'Proje sunum yeteneği'
    ],
    kpis: [
      'Mağaza vekâlet günleri KPI skoru',
      '90 Günlük Proje değerlendirme puanı',
      'Bölge Müdürü onay skoru'
    ],
    nextCareerLevel: 'Mağaza Müdürü',
    nextCareerLevelId: 7,
    requiredTrainingForNextLevel: [
      'Liderlik ve Mağaza Koçluğu',
      'İleri Mağaza Finansı',
      'Müşteri Sadakati ve CRM Stratejileri',
      'İnsan Kaynakları ve Ekip Yönetimi'
    ],
    nextCompetencies: [
      'Tam iş birimi liderliği',
      'Ciro ve marj yönetimi',
      'Ekip geliştirme'
    ],
    promotionReadinessScorecard: {
      trainingScore: 90,
      kpiScore: 82,
      fieldCompetencyScore: 85,
      finalProjectScore: 75,
      totalScore: 83
    },
    ctaText: 'Terfi Skorunu İncele & Atan'
  },

  // 7. MAĞAZA MÜDÜRÜ
  {
    id: 7,
    title: 'Mağaza Müdürü',
    badgeHeading: "Mağazanın CEO'su Ol",
    coreMessage: 'İş Sonuçlarını Yönet',
    purpose: 'Mağazanın satışından, kârlılığından, müşterilerinden, çalışanlarından ve operasyonel standartlarından tam sorumluluk almak.',
    recommendedDuration: '18–24 Ay',
    currentTrainings: [
      'Mağaza Liderliği ve Stratejisi',
      'P&L ve Finansal Tablolar',
      'KPI ve Bütçe Yönetimi',
      'Müşteri Deneyimi Stratejileri',
      'CRM ve Sepet Büyütme',
      'İnsan Kaynakları ve Performans'
    ],
    competencies: [
      'İş liderliği',
      'Ciro ve kârlılık yönetimi',
      'Ekip koçluğu',
      'Operasyonel mükemmellik',
      'Müşteri odaklılık'
    ],
    kpis: [
      'Ciro ve Satış Büyümesi (% YoY)',
      'Müşteri Sayısı ve Sepet Ortalaması',
      'Brüt Kâr ve Marj Oranı',
      'Fire ve Envanter Farkı',
      'Stok Devir Günü (GMROI)',
      'Personel Maliyeti & Norm Kadro',
      'Müşteri Memnuniyeti (NPS)',
      'Denetim Skoru'
    ],
    nextCareerLevel: 'Kıdemli / Mentor Mağaza Müdürü',
    nextCareerLevelId: 8,
    requiredTrainingForNextLevel: [
      'Mağaza Müdürü Geliştirme ve Koçluk',
      'Mentorluk ve İç Eğitmenlik',
      'Performans Görüşmesi Yönetimi',
      'Yeni Yönetici Yetiştirme',
      'Düşük Performanslı Mağaza İyileştirme',
      'Yeni Mağaza Açılış Süreçleri',
      'Kök Neden Analizi ve Problem Çözme',
      'Proje Yönetimi ve Süreç Geliştirme'
    ],
    nextCompetencies: [
      'Koçluk ve mentorluk',
      'Başka yöneticileri yetiştirme',
      'Süreç iyileştirme',
      'Çoklu mağaza desteği'
    ],
    ctaText: 'Mentor Mağaza Müdürlüğüne İlerle'
  },

  // 8. KIDEMLİ / MENTOR MAĞAZA MÜDÜRÜ
  {
    id: 8,
    title: 'Kıdemli / Mentor Mağaza Müdürü',
    badgeHeading: 'Başarılı Yönetici Yetiştirme Seviyesi',
    coreMessage: 'Başarılı mağaza yönetmekten başarılı yönetici yetiştirmeye.',
    purpose: 'Yalnızca kendi mağazasını yönetmekle kalmayıp yeni mağaza müdürlerini eğitmek ve düşük performanslı mağazaları iyileştirmek.',
    recommendedDuration: '18–24 Ay',
    currentTrainings: [
      'Koçluk ve Mentorluk',
      'İç Eğitmenlik Sertifikasyonu',
      'Düşük Performans İyileştirme',
      'Yeni Mağaza Açılış Operasyonu'
    ],
    competencies: [
      'Yönetici geliştirme',
      'Mentorluk',
      'İç eğitmenlik',
      'Düşük performans analizi',
      'Saha rol modelliği'
    ],
    kpis: [
      'Yetiştirilen müdür sayısı',
      'Mentorluk yapılan mağazaların ciro artışı',
      'Yeni mağaza açılış zamanında tamamlama oranı'
    ],
    nextCareerLevel: 'Bölge Müdürü Adayı',
    nextCareerLevelId: 9,
    requiredTrainingForNextLevel: [
      'Çoklu Mağaza Yönetimi',
      'Bölgesel KPI ve Performans Analizi',
      'Mağazalar Arası Benchmarking',
      'Bölgesel Kârlılık ve Bütçeleme',
      'Mağaza Müdürü Performans Yönetimi',
      'İleri Bölge Denetimi',
      'Power BI ve Raporlama',
      'CRM ve Bölgesel Kampanyalar',
      'Problemli Mağaza Dönüşüm Stratejileri'
    ],
    nextCompetencies: [
      'Çoklu mağaza vizyonu',
      'Bölgesel kârlılık yönetimi',
      'Benchmarking ve analitik bakış'
    ],
    ctaText: 'Bölge Yönetimi Adaylığına Geç'
  },

  // 9. BÖLGE MÜDÜRÜ ADAYI
  {
    id: 9,
    title: 'Bölge Müdürü Adayı',
    badgeHeading: 'Tek Mağazadan Bölge Yönetimine Geçiş',
    coreMessage: 'Çoklu Mağazaya Hazırlan',
    purpose: 'Bir mağaza grubunu (3-5 mağaza) mentörlük eşliğinde yöneterek Bölge Müdürlüğüne hazırlanmak.',
    recommendedDuration: '6–12 Ay',
    currentTrainings: [
      'Çoklu Mağaza Yönetim Programı',
      'Bölge KPI ve Benchmarking',
      'Power BI ile Bölge Analitiği'
    ],
    competencies: [
      'Çoklu mağaza gözetimi',
      'Mağaza müdürlerini yönlendirme',
      'Bölgesel kârlılık vizyonu'
    ],
    kpis: [
      'Sorumlu 3-5 mağazanın toplam ciro ve kârlılığı',
      'Bölge iyileştirme projesi değerlendirme skoru'
    ],
    nextCareerLevel: 'Bölge Müdürü',
    nextCareerLevelId: 10,
    requiredTrainingForNextLevel: [
      'Stratejik Bölge Yönetimi',
      'Bölge Bütçesi ve EBITDA Yönetimi',
      'Mağaza Müdürleri Liderliği ve Koçluk',
      'Bölgesel Stok ve Lojistik Optimizasyonu'
    ],
    nextCompetencies: [
      'Bölge liderliği',
      'Müdür yönetimi',
      'Stratejik karar alma'
    ],
    branchingView: {
      stage1: '1 Mağaza (Müdür)',
      stage2: '3–5 Mağaza (Adaylık)',
      stage3: 'Tüm Bölge (Bölge Müdürü)'
    },
    finalProject: {
      title: '3–5 Mağazalık Bölge Performans İyileştirme Projesi',
      stages: ['Bölge Analizi', 'Mağaza Benchmarking', 'Kök Neden & Aksiyon', 'Uygulama', 'Final KPI Sunumu']
    },
    ctaText: 'Bölge Müdürü Olarak Atan'
  },

  // 10. BÖLGE MÜDÜRÜ
  {
    id: 10,
    title: 'Bölge Müdürü',
    badgeHeading: 'Mağazaları Değil, Mağaza Müdürlerini Yönetin',
    coreMessage: 'Mağaza Yönetmez, Mağaza Müdürlerini Yönetir.',
    purpose: 'Sorumlu olduğu 10-15 mağazanın satış, kârlılık, insan kaynağı, stok ve operasyonel mükemmelliğini yönetmek.',
    recommendedDuration: '24 Ay',
    currentTrainings: [
      'Stratejik Bölge Yönetimi',
      'Bölgesel P&L ve EBITDA',
      'Yönetici Yetiştirme ve Koçluk',
      'Bölgesel İnsan Kaynakları',
      'Power BI ve Bölge Analitiği'
    ],
    competencies: [
      'Bölge müdürlüğü liderliği',
      'Çoklu saha yönetimi',
      'Mağaza müdürlerini geliştirme',
      'Bölgesel kârlılık',
      'Denetim ve standartlar'
    ],
    kpis: [
      'Bölge Toplam Cirosu ve Büyüme',
      'Bölge Brüt Kâr ve Mağaza Kârlılıkları',
      'Bölgesel Fire ve Stok Devir Hızı',
      'Personel Verimliliği ve Devir Oranı (Turnover)',
      'Bölge Müşteri Memnuniyeti & Denetim Skoru'
    ],
    nextCareerLevel: 'Kıdemli Bölge Müdürü / Bölge Operasyon Yöneticisi',
    nextCareerLevelId: 11,
    requiredTrainingForNextLevel: [
      'İş ve Süreç Geliştirme',
      'Proje Yönetimi ve Stratejik Operasyon',
      'Yatırım, Lokasyon ve Yeni Mağaza Stratejileri',
      'İç Denetim ve Risk Yönetimi',
      'İleri Veri Analizi ve Yapay Zekâ',
      'Yönetici Yedekleme (Succession Planning)'
    ],
    nextCompetencies: [
      'Şirket çapında süreç geliştirme',
      'Yatırım ve lokasyon analizi',
      'Risk yönetimi'
    ],
    ctaText: 'Bölge Operasyon Yöneticiliğine İlerle'
  },

  // 11. KIDEMLİ BÖLGE MÜDÜRÜ / BÖLGE OPERASYON YÖNETİCİSİ
  {
    id: 11,
    title: 'Kıdemli Bölge Müdürü / Bölge Operasyon Yöneticisi',
    badgeHeading: 'Bölge Yönetiminden Şirket Operasyon Sistemine',
    coreMessage: 'Bölge yönetiminden şirket operasyon sistemine geçiş.',
    purpose: 'Büyük mağaza gruplarını yönetmek, yeni formatlar geliştirmek ve şirket çapında operasyonel standartları belirlemek.',
    recommendedDuration: '18–24 Ay',
    currentTrainings: [
      'İş ve Süreç Geliştirme',
      'Yatırım ve Lokasyon Analizi',
      'İç Denetim & Risk Yönetimi',
      'Yapay Zekâ ve İleri Veri Analitiği'
    ],
    competencies: [
      'Sistem geliştirme',
      'Bölge müdürlerini yönetme',
      'Stratejik proje liderliği',
      'Değişim yönetimi'
    ],
    kpis: [
      'Büyük bölge grubunun karlılığı',
      'Yeni açılan mağazaların verimlilik süresi',
      'Şirket çapında süreç iyileştirme ROI puanı'
    ],
    nextCareerLevel: 'Operasyon Müdürü',
    nextCareerLevelId: 12,
    requiredTrainingForNextLevel: [
      'Operasyon Stratejisi ve Yıllık Planlama',
      'Şirket Kârlılığı, EBITDA ve İşletme Sermayesi',
      'Stok Yatırımı ve Tedarik Zinciri Entegrasyonu',
      'Operasyon Bütçesi Yönetimi',
      'Bölge Müdürleri Yönetimi ve Organizasyon Tasarımı',
      'Power BI ve Yapay Zekâ Destekli Talep Tahmini',
      'Risk Yönetimi ve İş Sürekliliği'
    ],
    nextCompetencies: [
      'Şirket operasyon stratejisi',
      'EBITDA ve sermaye yönetimi',
      'Bölge müdürlerinin liderliği',
      'Sistem tasarımı'
    ],
    finalProject: {
      title: 'Şirket Çapında Operasyonel Verimlilik ve Kârlılık Projesi'
    },
    ctaText: 'Operasyon Müdürlüğüne Yüksel'
  },

  // 12. OPERASYON MÜDÜRÜ
  {
    id: 12,
    title: 'Operasyon Müdürü',
    badgeHeading: 'Mağaza Ağının Sistem Yöneticisi',
    coreMessage: 'Mağazaları Değil, Mağazaların Başarılı Çalışmasını Sağlayan Sistemi Yönet.',
    purpose: 'Şirketin tüm mağaza ağının operasyonel performansından, Bölge Müdürlerinin yönetiminden ve saha stratejilerinden sorumlu olmak.',
    recommendedDuration: '24+ Ay',
    currentTrainings: [
      'Operasyon Stratejisi',
      'Yıllık İş Planlama ve Bütçe',
      'EBITDA ve İşletme Sermayesi',
      'Organizasyon Tasarımı',
      'Yapay Zekâ ve Talep Tahmini'
    ],
    competencies: [
      'Tüm mağaza ağının liderliği',
      'Operasyon stratejisi',
      'Finansal ve operasyonel mükemmellik',
      'Dijital dönüşüm',
      'Üst yönetim temsilciliği'
    ],
    kpis: [
      'Şirket Toplam Satış ve Mağaza Kârlılıkları',
      'Operasyon Bütçesi ve Gider Yönetimi Uyum Oranı',
      'Şirket Çapında Fire ve Stok Devir Oranı',
      'Personel Verimliliği ve Genel Turnover',
      'Dijital Dönüşüm & Yapay Zekâ Entegrasyon Puanı'
    ],
    nextCareerLevel: 'Operasyon Direktörü',
    nextCareerLevelId: 13,
    requiredTrainingForNextLevel: [
      'Stratejik Yönetim ve İcra Kurulu Liderliği',
      'Yönetim Kurulu Raporlama Standartları',
      'Yatırım Yönetimi ve Bölgesel Büyüme Stratejileri',
      'Yeni Mağaza Formatları Tasarımı',
      'İşletme Sermayesi ve Nakit Akışı Yönetimi',
      'Dijital Dönüşüm ve Omnichannel Stratejileri',
      'CRM ve İnsan Sermayesi Yönetimi',
      'Kurumsallaşma ve Liderlik'
    ],
    nextCompetencies: [
      'İcra kurulu liderliği',
      'Omnichannel stratejisi',
      'Kurumsal büyüme',
      'Yönetim kurulu raporlaması'
    ],
    ctaText: 'Operasyon Direktörlüğüne İlerle'
  },

  // 13. OPERASYON DİREKTÖRÜ
  {
    id: 13,
    title: 'Operasyon Direktörü',
    badgeHeading: 'Operasyonu Şirket Stratejisine Bağlama',
    coreMessage: 'Operasyonu şirket stratejisine bağlar.',
    purpose: 'Şirketin tüm operasyonel vizyonunu genel şirket stratejisiyle birleştirip yönetim kurulu seviyesinde yürütmek.',
    recommendedDuration: '24+ Ay',
    currentTrainings: [
      'Stratejik Yönetim',
      'Yönetim Kurulu Raporlama',
      'Yatırım Yönetimi & Format Geliştirme',
      'Omnichannel & CRM Stratejisi',
      'İnsan Sermayesi Yönetimi'
    ],
    competencies: [
      'Şirket üst düzey liderliği',
      'Yatırım ve format stratejisi',
      'Omnichannel vizyonu',
      'Yönetim kurulu seviyesinde temsil'
    ],
    kpis: [
      'Şirket Toplam EBITDA ve Büyüme',
      'Omnichannel satış payı ve kârlılığı',
      'Şirket çapında operasyonel mükemmellik indeksi'
    ],
    nextCareerLevel: 'Genel Müdür',
    nextCareerLevelId: 14,
    requiredTrainingForNextLevel: [
      'Genel Müdürlük ve İcra Yönetimi',
      'Kurumsal Yönetişim ve Yönetim Kurulu İlişkileri',
      'Finansal Tablolar, Nakit Akışı ve Sermaye Yönetimi',
      'Satınalma, Kategori ve Private Label Stratejileri',
      'Pazarlama ve Omnichannel CRM',
      'İnsan Sermayesi ve Teşkilat Yönetimi',
      'Data, Yapay Zekâ, Siber Güvenlik ve Risk'
    ],
    nextCompetencies: [
      'Tüm fonksiyonların (Finans, Satınalma, İK, Lojistik, Teknoloji vb.) yönetimi',
      'Şirket Genel Müdürlük vizyonu',
      'Kurumsal yönetişim'
    ],
    ctaText: 'Genel Müdürlük Seviyesine Yüksel'
  },

  // 14. GENEL MÜDÜR
  {
    id: 14,
    title: 'Genel Müdür',
    badgeHeading: 'Fonksiyon Yönetiminden Şirket Yönetimine',
    coreMessage: 'Fonksiyon Yönetiminden Şirket Yönetimine',
    purpose: 'Tüm departmanları (Finans, Operasyon, Satınalma, İK, Lojistik, Teknoloji, Pazarlama) hizalayarak şirketin cirosunu ve değerini büyütmek.',
    recommendedDuration: '36+ Ay',
    currentTrainings: [
      'Genel Müdürlük ve İcra Yönetimi',
      'Kurumsal Yönetişim',
      'Yönetim Kurulu İlişkileri',
      'Finansal Tablolar ve Nakit Akışı',
      'Kategori & Satınalma Stratejisi',
      'Omnichannel Pazarlama',
      'Yapay Zekâ ve Veri Yönetişimi'
    ],
    competencies: [
      'Tam şirket yönetimi',
      'Tüm fonksiyonların liderliği',
      'Stratejik sermaye ve büyüme yönetimi',
      'Kurumsal temsil'
    ],
    kpis: [
      'Şirket Değerlemesi ve Ciro Büyümesi',
      'Konsolide EBITDA ve Serbest Nakit Akışı',
      'Pazar Payı ve Marka Algısı',
      'Çalışan Memnuniyeti ve Kurum Kültürü Skoru'
    ],
    nextCareerLevel: 'CEO',
    nextCareerLevelId: 15,
    requiredTrainingForNextLevel: [
      'Gıda Perakendesinde CEO Rolü',
      'Vizyon ve Strateji Oluşturma',
      'Sürdürülebilir Büyüme ve Finansal Strateji',
      'Şirket Değerlemesi ve Sermaye Yönetimi',
      'RFM, Churn, CLV ve Yapay Zekâ – CEO Perspektifi',
      'Tahmine Dayalı Analitik ve Veri Yönetişimi',
      'CEO Liderliği ve Üst Yönetim Takımı Kurma',
      'Yönetici Yedekleme ve Kurumsallaşma',
      'Yönetim Kurulu Yönetimi ve Nesil Geçişi',
      'Risk Yönetimi ve Yeni İş Modelleri'
    ],
    nextCompetencies: [
      'Geleceği tasarlama',
      'Sürdürülebilir vizyon ve büyüme',
      'Yönetim kurulu ve hissedar ilişkileri',
      'Yeni iş modelleri geliştirme'
    ],
    departmentIcons: [
      { name: 'Finans', key: 'BarChart3' },
      { name: 'Operasyon', key: 'Building2' },
      { name: 'Satınalma', key: 'ShoppingBag' },
      { name: 'CRM', key: 'Users' },
      { name: 'İK', key: 'UserCheck' },
      { name: 'Lojistik', key: 'Truck' },
      { name: 'Teknoloji', key: 'Cpu' },
      { name: 'Pazarlama', key: 'Megaphone' }
    ],
    ctaText: 'CEO Koltuğuna Hazırlan'
  },

  // 15. CEO
  {
    id: 15,
    title: 'CEO',
    badgeHeading: 'Zirve Liderlik Paneli',
    coreMessage: 'Geleceği Yönet',
    purpose: 'Şirketi yönetmekten geleceği tasarlamaya geçerek vizyon, büyüme, sermaye, teknoloji ve sürdürülebilir liderlik inşa etmek.',
    recommendedDuration: 'Sürekli Liderlik',
    currentTrainings: [
      'CEO Perspektifiyle Yapay Zekâ ve Veri Yönetişimi',
      'Şirket Değerlemesi ve Sermaye Stratejileri',
      'Global Perakende Trendleri ve Yeni İş Modelleri',
      'Kurumsallaşma ve Yönetim Kurulu Yönetimi',
      'Sürdürülebilir Büyüme ve Nesil Geçişi'
    ],
    competencies: [
      'Geleceği tasarlama',
      'Stratejik vizyonerlik',
      'Sermaye ve değer yaratımı',
      'Yönetim kurulu liderliği',
      'Sürdürülebilir dönüşüm'
    ],
    kpis: [
      'Şirket Piyasa Değeri ve Büyüme',
      'Sürdürülebilir Karlılık (EBITDA)',
      'Global / Bölgesel Pazar Liderliği',
      'Teknoloji ve İnovasyon İndeksi'
    ],
    nextCareerLevel: 'Geleceği Tasarlayan Yönetim Kurulu Liderliği',
    nextCareerLevelId: 15,
    requiredTrainingForNextLevel: [
      'Global Perakende Liderlik Zirveleri',
      'Geleceğin Yapay Zekâ İş Modelleri',
      'Sürdürülebilirlik ve ESG Stratejileri'
    ],
    nextCompetencies: [
      'Sürekli vizyoner liderlik',
      'Sektöre yön verme'
    ],
    ceoFocusAreas: [
      { title: 'Vizyon', desc: 'Şirketin 5-10 yıllık gelecek rotasını belirleme' },
      { title: 'Büyüme', desc: 'Pazar payını ve yeni yatırımları ölçeklendirme' },
      { title: 'Sermaye', desc: 'Finansal kaynakları ve şirket değerini büyütme' },
      { title: 'Teknoloji', desc: 'Yapay zekâ ve dijital dönüşüme liderlik etme' },
      { title: 'Müşteri', desc: 'Yeni nesil tüketici deneyimini şekillendirme' },
      { title: 'İnsan', desc: 'Üst düzey yönetim takımını kurma ve yedekleme' },
      { title: 'Kurumsallaşma', desc: 'Sürdürülebilir yönetişim sistemini oturtma' },
      { title: 'Yönetim Kurulu', desc: 'Hissedarlar ve kurul ile stratejik hizalanma' },
      { title: 'Risk', desc: 'Küresel ve bölgesel krizlere hazırlık' },
      { title: 'Yeni İş Modelleri', desc: 'Omnichannel ve e-ticaret yenilikleri' }
    ],
    ctaText: 'Geleceğin Perakendesini Tasarla'
  }
];

// Donut / Bar Chart Data for Promotion Scoring Model (%100 Total)
export const SCORING_WEIGHTS_15 = [
  { label: 'KPI ve İş Sonuçları', percent: 30, color: '#0B2A4A', icon: 'Target' },
  { label: 'Saha Yetkinliği', percent: 25, color: '#087F96', icon: 'ShieldCheck' },
  { label: 'Eğitim ve Sınav', percent: 15, color: '#34A853', icon: 'GraduationCap' },
  { label: 'Yönetici Değerlendirmesi', percent: 15, color: '#056B80', icon: 'Users' },
  { label: 'Final Projesi', percent: 10, color: '#D97706', icon: 'FileText' },
  { label: 'Kurum Kültürü', percent: 5, color: '#8B5CF6', icon: 'Award' }
];

export const CAREER_MOTTO = "Perakendede kariyer tesadüf değildir. Doğru eğitim, saha deneyimi, ölçülebilir performans ve gelişimle adım adım inşa edilir.";
