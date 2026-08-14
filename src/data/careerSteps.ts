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
    trainingScore: number;
    kpiScore: number;
    fieldCompetencyScore: number;
    finalProjectScore: number;
    totalScore: number;
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

export interface CareerTrack15 {
  id: string;
  name: string;
  badgeText: string;
  headline: string;
  department: string;
  startRole: string;
  peakRole: string;
  description: string;
  steps: CareerStep15[];
}

// ==========================================
// TRACK 1: KASİYERLİKTEN CEO / GENEL MÜDÜRLÜĞE
// ==========================================
export const CAREER_STEPS_15_DATA: CareerStep15[] = [
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
    competencies: ['Müşteri odaklılık', 'Dikkat', 'Hız ve doğruluk', 'İş disiplini', 'Temel satış', 'Sistem kullanımı'],
    kpis: ['Kasa açık/fazla farkı', 'İşlem hata oranı', 'İşlem hızı', 'Müşteri memnuniyet puanı', 'Dijital kart yönlendirme'],
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
    nextCompetencies: ['İlk seviye liderlik', 'Ekip koordinasyonu', 'Problem çözme', 'Hata kontrolü', 'Çalışan yönlendirme', 'Günlük raporlama'],
    ctaText: 'Bu Kariyer Basamağına Hazırlan'
  },
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
    competencies: ['Ekip koordinasyonu', 'Problem çözme', 'İlk seviye liderlik', 'Vardiya takibi', 'Hata kontrolü', 'Müşteri problemi çözme'],
    kpis: ['Kasa ekibi açık/fazla oranı', 'Kuyruk bekleme süresi', 'Müşteri şikâyet çözüm hızı', 'Yeni kasiyer adaptasyon süresi'],
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
    nextCompetencies: ['Görev dağıtma', 'Önceliklendirme', 'Zaman yönetimi', 'Ekip yönlendirme', 'Anlık karar alma', 'Saha kontrolü'],
    ctaText: 'Vardiya Liderliğine Hazırlan'
  },
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
    competencies: ['Görev dağıtma', 'Önceliklendirme', 'Zaman yönetimi', 'Ekip yönlendirme', 'Anlık karar alma', 'Saha kontrolü'],
    kpis: ['Vardiya görev gerçekleşme oranı', 'Kasa ve reyon geçiş süresi', 'Saha standartları skor kartı', 'Mağaza içi müşteri NPS'],
    nextCareerLevel: 'Mağaza Müdür Yardımcısı Adayı',
    nextCareerLevelId: 4,
    requiredTrainingForNextLevel: [
      'Mağaza Operasyon Yönetimi',
      'Stok ve Envanter Yönetimi',
      'Reyon Yönetimi',
      'Saha Hijyen ve Düzen',
      'Zimmet ve Mal Kabul',
      'İade ve Değişim Süreçleri',
      'İş Güvenliği ve Acil Durum',
      'Mağaza Performans Metrikleri',
      'Satış ve Ciro Odaklılık',
      'Liderlik ve Koçluk',
      'Çatışma ve Problem Yönetimi',
      'Geri Bildirim Verme',
      'Mağaza İçi İletişim',
      'Temel Raporlama ve Analiz'
    ],
    nextCompetencies: ['Operasyonel sorumluluk', 'Stok bilinci', 'Saha takibi', 'Liderlik başlangıcı', 'Performans odağı', 'Problem çözme'],
    ctaText: 'Müdür Yardımcılığı Adaylığına Hazırlan'
  },
  {
    id: 4,
    title: 'Mağaza Müdür Yardımcısı Adayı',
    badgeHeading: 'Yönetim Öncesi Hazırlık Havuzu',
    coreMessage: 'Liderliğe Son Adım',
    purpose: 'Mağaza yöneticiliğine geçiş öncesinde tüm operasyonel, stok ve liderlik yetkinliklerini simülasyon ve saha uygulamalarıyla tamamlamak.',
    recommendedDuration: '6–12 Ay',
    currentTrainings: [
      'Mağaza Operasyon Yönetimi',
      'Stok ve Envanter Yönetimi',
      'Reyon Yönetimi',
      'Liderlik ve Koçluk',
      'Temel Raporlama ve Analiz'
    ],
    competencies: ['Operasyonel sorumluluk', 'Stok bilinci', 'Saha takibi', 'Liderlik başlangıcı', 'Performans odağı', 'Problem çözme'],
    kpis: ['Adaylık sınav puanı', 'Stok doğruluğu skoru', 'Saha simülasyon başarı puanı', 'Mentor değerlendirme notu'],
    nextCareerLevel: 'Mağaza Müdür Yardımcısı',
    nextCareerLevelId: 5,
    requiredTrainingForNextLevel: [
      'Gelişmiş Mağaza Operasyonları',
      'Saha Vardiya Çizelgesi Yönetimi',
      'Fire ve Kayıp-Kaçak İleri Analizi',
      'Stok Devir Hızı ve Sipariş Yönetimi',
      'Personel İşe Alım Mülakatı',
      'Mağaza İçi Ekip Motivasyonu',
      'Performans Karne Takibi',
      'Kriz ve Müşteri Şikayet Yönetimi'
    ],
    nextCompetencies: ['Vardiya yönetimi', 'Stok denetimi', 'Ekip motivasyonu', 'Saha denetimi', 'Veri takibi'],
    ctaText: 'Mağaza Müdür Yardımcılığına Geç'
  },
  {
    id: 5,
    title: 'Mağaza Müdür Yardımcısı',
    badgeHeading: 'Bireysel Başarıdan Ekip Başarısına Geçiş',
    coreMessage: 'Resmi Yönetim Başlıyor',
    purpose: 'Bireysel başarıdan ekip başarısına geçerek, mağazanın günlük operasyon, stok, personel ve müşteri memnuniyeti süreçlerini kesintisiz yönetmek.',
    recommendedDuration: '12–18 Ay',
    currentTrainings: [
      'Gelişmiş Mağaza Operasyonları',
      'Saha Vardiya Çizelgesi Yönetimi',
      'Fire ve Kayıp-Kaçak İleri Analizi',
      'Stok Devir Hızı ve Sipariş Yönetimi',
      'Personel İşe Alım Mülakatı',
      'Mağaza İçi Ekip Motivasyonu'
    ],
    competencies: ['Vardiya yönetimi', 'Stok denetimi', 'Ekip motivasyonu', 'Saha denetimi', 'Veri takibi'],
    kpis: ['Mağaza ciro hedef oranı', 'Stok devir hızı', 'Fire ve kayıp oranı (%1.5 altı)', 'Ekip bağlılığı ve turnover'],
    nextCareerLevel: 'Mağaza Müdürü Adayı',
    nextCareerLevelId: 6,
    requiredTrainingForNextLevel: [
      'Mağaza Müdürü Aday Havuzu Eğitim Müfredatı',
      'P&L (Kar/Zarar) Temelleri',
      'Stratejik Mağaza Yönetimi',
      'Mağaza Bütçe Planlama',
      'İleri Müşteri Deneyimi Stratejileri',
      'Bölge İletişimi ve Raporlama',
      'Liderlik ve Koçluk Yetkinliği',
      'Mağaza İçi Çatışma Yönetimi'
    ],
    nextCompetencies: ['Kar/zarar mantığı', 'Stratejik bakış', 'Gelişmiş liderlik', 'Bütçe bilinci'],
    ctaText: 'Mağaza Müdürü Aday Havuzuna Katıl'
  },
  {
    id: 6,
    title: 'Mağaza Müdürü Adayı',
    badgeHeading: 'Sorumluluk Alanını Büyütme',
    coreMessage: 'Mağazanın Tüm Sorumluluğuna Aday Ol',
    purpose: 'Mağazanın tek yetkilisi ve lideri olmak üzere P&L, ciro, stok, personel ve bölge hedeflerine tam hazırlık sağlamak.',
    recommendedDuration: '6–12 Ay',
    currentTrainings: [
      'P&L (Kar/Zarar) Temelleri',
      'Stratejik Mağaza Yönetimi',
      'Mağaza Bütçe Planlama',
      'Bölge İletişimi ve Raporlama'
    ],
    competencies: ['Kar/zarar mantığı', 'Stratejik bakış', 'Gelişmiş liderlik', 'Bütçe bilinci'],
    kpis: ['P&L sınav başarısı', 'Bölge müdürü değerlendirmesi', 'Proje sunum notu'],
    nextCareerLevel: 'Mağaza Müdürü',
    nextCareerLevelId: 7,
    requiredTrainingForNextLevel: [
      'Tam Yetkili Mağaza Müdürlüğü Müfredatı',
      'Finansal Mağazacılık & P&L Yönetimi',
      'İncelenmiş Ciro ve EBITDA Yönetimi',
      'İş Hukuku ve Mağaza Özlük Yönetimi',
      'Mağaza İçi Risk ve Denetim',
      'Bölgesel Rekabet Analizi'
    ],
    nextCompetencies: ['Mağaza liderliği', 'Bütçe ve P&L yönetimi', 'İç terfi yönetimi', 'Kriz stratejisi'],
    ctaText: 'Mağaza Müdürü Koltuğuna Geç'
  },
  {
    id: 7,
    title: 'Mağaza Müdürü',
    badgeHeading: 'Tam Sorumlu Mağaza Lideri',
    coreMessage: 'Kendi İşletmenin CEO\'su Ol',
    purpose: 'Mağazayı bağımsız bir iş birimi gibi yöneterek ciro, kârlılık, stok, müşteri ve insan kaynağını hedefler doğrultusunda sevk ve idare etmek.',
    recommendedDuration: '18–24 Ay',
    currentTrainings: [
      'Finansal Mağazacılık & P&L Yönetimi',
      'İncelenmiş Ciro ve EBITDA Yönetimi',
      'İş Hukuku ve Mağaza Özlük Yönetimi',
      'Mağaza İçi Risk ve Denetim'
    ],
    competencies: ['Mağaza liderliği', 'Bütçe ve P&L yönetimi', 'İç terfi yönetimi', 'Kriz stratejisi'],
    kpis: ['Yıllık mağaza ciro hedefi', 'Mağaza EBITDA net karı', 'Mağaza içi terfi yetiştirme sayısı', 'Müşteri memnuniyet skoru'],
    nextCareerLevel: 'Kıdemli / Mentor Mağaza Müdürü',
    nextCareerLevelId: 8,
    requiredTrainingForNextLevel: [
      'Mentorluk ve Koçluk Becerileri',
      'Çoklu Mağaza Başlatma (New Store Opening)',
      'Problem Mağaza İyileştirme (Turnaround)',
      'Bölge İK ve İşe Alım Katkısı',
      'Saha Standartları Denetçiliği'
    ],
    nextCompetencies: ['Mentorluk', 'Model olma', 'Sorunlu mağaza iyileştirme', 'Bölgeye rehberlik'],
    ctaText: 'Mentor Mağaza Müdürlüğüne İlerle'
  },
  {
    id: 8,
    title: 'Kıdemli / Mentor Mağaza Müdürü',
    badgeHeading: 'Deneyimi Paylaşma ve Diğer Müdürleri Yetiştirme',
    coreMessage: 'Lider Yetiştiren Lider Ol',
    purpose: 'Diğer mağaza müdürlerine mentorluk yapmak, problemli mağazaları iyileştirmek ve bölgeye liderlik desteği vermek.',
    recommendedDuration: '12–18 Ay',
    currentTrainings: [
      'Mentorluk ve Koçluk Becerileri',
      'Çoklu Mağaza Başlatma (New Store Opening)',
      'Problem Mağaza İyileştirme (Turnaround)'
    ],
    competencies: ['Mentorluk', 'Model olma', 'Sorunlu mağaza iyileştirme', 'Bölgeye rehberlik'],
    kpis: ['Yetiştirilen yeni mağaza müdürü sayısı', 'Mentörlük yapılan mağazaların ciro artışı', 'Bölge denetim skoru'],
    nextCareerLevel: 'Bölge Müdürü Adayı',
    nextCareerLevelId: 9,
    requiredTrainingForNextLevel: [
      'Bölge Müdürlüğü İleri Strateji Akademisi',
      'Çoklu Mağaza P&L Konsolidasyonu',
      'Bölgesel İnsan Kaynağı ve Terfi Yönetimi',
      'Bölge Lojistik ve Tedarik Yönetimi',
      'Stratejik Bölge Rekabet Yönetimi'
    ],
    nextCompetencies: ['Çoklu mağaza vizyonu', 'Bölgesel P&L analitiği', 'Üst yönetim iletişimi'],
    ctaText: 'Bölge Müdürü Adaylığına Hazırlan'
  },
  {
    id: 9,
    title: 'Bölge Müdürü Adayı',
    badgeHeading: 'Tek Mağazadan Çoklu Mağaza Yönetimine Geçiş',
    coreMessage: 'Bölge Vizyonunu İnşa Et',
    purpose: '10-20 mağazalık bir bölgenin tüm operasyonel, finansal ve insan kaynağı sorumluluğunu üstlenmeye hazır hale gelmek.',
    recommendedDuration: '6–12 Ay',
    currentTrainings: [
      'Bölge Müdürlüğü İleri Strateji Akademisi',
      'Çoklu Mağaza P&L Konsolidasyonu',
      'Bölgesel İnsan Kaynağı ve Terfi Yönetimi'
    ],
    competencies: ['Çoklu mağaza vizyonu', 'Bölgesel P&L analitiği', 'Üst yönetim iletişimi'],
    kpis: ['Bölge adaylık sınav skoru', 'Simülasyon bölge yönetimi başarısı', 'Genel müdürlük mülakat onayı'],
    nextCareerLevel: 'Bölge Müdürü',
    nextCareerLevelId: 10,
    requiredTrainingForNextLevel: [
      'Tam Yetkili Bölge Yönetimi Müfredatı',
      'Bölgesel Satış & Pazarlama Stratejileri',
      'Çoklu Saha Denetimi ve Standartlaştırma',
      'Bölge İK ve Yedekleme Haritası',
      'Genel Merkez & İcra Kurulu Raporlaması'
    ],
    nextCompetencies: ['Bölge liderliği', 'Çoklu P&L yönetimi', 'Stratejik hizalanma', 'Müdür yedekleme'],
    ctaText: 'Bölge Müdürlüğü Görevini Üstlen'
  },
  {
    id: 10,
    title: 'Bölge Müdürü',
    badgeHeading: 'Bölgesel Saha Lideri',
    coreMessage: 'Bölgeni Şirketin Büyüme Motoru Yap',
    purpose: 'Sorumluluğundaki 10-20 mağazanın tüm satış, kârlılık, stok ve insan kaynağını genel merkez stratejilerine uygun olarak sevk etmek.',
    recommendedDuration: '24–36 Ay',
    currentTrainings: [
      'Tam Yetkili Bölge Yönetimi Müfredatı',
      'Bölgesel Satış & Pazarlama Stratejileri',
      'Çoklu Saha Denetimi ve Standartlaştırma'
    ],
    competencies: ['Bölge liderliği', 'Çoklu P&L yönetimi', 'Stratejik hizalanma', 'Müdür yedekleme'],
    kpis: ['Bölge toplam ciro ve EBITDA kârı', 'Bölge mağaza müdürü yedekleme oranı', 'Bölge kayıp-kaçak ve fire ortalaması'],
    nextCareerLevel: 'Kıdemli Bölge Müdürü',
    nextCareerLevelId: 11,
    requiredTrainingForNextLevel: [
      'Üst Düzey Bölgesel İnovasyon',
      'Makro Perakende Stratejileri',
      'Yeni Bölge Açılış Stratejileri',
      'Sektörel Benchmark ve Rekabet Yönetimi'
    ],
    nextCompetencies: ['Kıdemli bölge liderliği', 'Stratejik mentorluk', 'Makro bütçeleme'],
    ctaText: 'Kıdemli Bölge Müdürlüğüne Yüksel'
  },
  {
    id: 11,
    title: 'Kıdemli Bölge Müdürü',
    badgeHeading: 'Bölge Liderlerinin Lideri',
    coreMessage: 'Stratejik Saha Gücü Oluştur',
    purpose: 'Birden fazla bölgeye rehberlik etmek, büyük metropol bölgelerini yönetmek ve operasyon müdürlüğüne hazırlanmak.',
    recommendedDuration: '18–24 Ay',
    currentTrainings: [
      'Üst Düzey Bölgesel İnovasyon',
      'Makro Perakende Stratejileri',
      'Yeni Bölge Açılış Stratejileri'
    ],
    competencies: ['Kıdemli bölge liderliği', 'Stratejik mentorluk', 'Makro bütçeleme'],
    kpis: ['Metropol bölge ciro büyümesi', 'Yetiştirilen bölge müdürü sayısı', 'Şirket genel operasyon kurul katkısı'],
    nextCareerLevel: 'Operasyon Müdürü',
    nextCareerLevelId: 12,
    requiredTrainingForNextLevel: [
      'Şirket Ölçeğinde Operasyon Yönetimi',
      'Saha Verimlilik ve Süreç Mimarisi',
      'Omnichannel ve E-Ticaret Saha Entegrasyonu',
      'Tedarik Zinciri ve Lojistik Hizalanması',
      'Büyük Ölçekli Bütçe ve Maliyet Yönetimi'
    ],
    nextCompetencies: ['Şirket geneli operasyon vizyonu', 'Süreç mimarisi', 'Omnichannel yönetimi'],
    ctaText: 'Operasyon Müdürlüğüne İlerle'
  },
  {
    id: 12,
    title: 'Operasyon Müdürü',
    badgeHeading: 'Tüm Saha Ağının Mimarisi',
    coreMessage: 'Şirketin Operasyonel Kalbini Yönet',
    purpose: 'Tüm mağazalar ağının operasyonel standartlarını, saha süreçlerini, bütçelerini ve verimlilik politikalarını belirlemek.',
    recommendedDuration: '24–36 Ay',
    currentTrainings: [
      'Şirket Ölçeğinde Operasyon Yönetimi',
      'Saha Verimlilik ve Süreç Mimarisi',
      'Omnichannel ve E-Ticaret Saha Entegrasyonu'
    ],
    competencies: ['Şirket geneli operasyon vizyonu', 'Süreç mimarisi', 'Omnichannel yönetimi'],
    kpis: ['Şirket toplam operasyon maliyeti / ciro oranı', 'Saha standartlaşma endeksi', 'Bölge müdürleri bağlılık ve başarı oranı'],
    nextCareerLevel: 'Operasyon Direktörü',
    nextCareerLevelId: 13,
    requiredTrainingForNextLevel: [
      'C-Level Operasyonel Liderlik',
      'Stratejik Şirket Dönüşümü',
      'Yatırım ROI ve Mağaza Ağı Genişleme',
      'Yönetim Kurulu ve İcra Kurulu Raporlaması'
    ],
    nextCompetencies: ['Direktörlük vizyonu', 'C-Level yönetişim', 'Makro şirket karlılığı'],
    ctaText: 'Operasyon Direktörlüğüne Yüksel'
  },
  {
    id: 13,
    title: 'Operasyon Direktörü',
    badgeHeading: 'İcra Kurulu Operasyon Lideri',
    coreMessage: 'Operasyonu Geleceğe Taşı',
    purpose: 'Şirket icra kurulunda tüm saha ve operasyonu temsil ederek makro stratejilere ve karlılık hedeflerine yön vermek.',
    recommendedDuration: '24–36 Ay',
    currentTrainings: [
      'C-Level Operasyonel Liderlik',
      'Stratejik Şirket Dönüşümü',
      'Yatırım ROI ve Mağaza Ağı Genişleme'
    ],
    competencies: ['Direktörlük vizyonu', 'C-Level yönetişim', 'Makro şirket karlılığı'],
    kpis: ['Şirket toplam EBITDA ve kar marjı', 'Saha verimlilik artış yüzdesi', 'Mağaza ağı büyüme stratejisi başarısı'],
    nextCareerLevel: 'Genel Müdür Yardımcısı',
    nextCareerLevelId: 14,
    requiredTrainingForNextLevel: [
      'Executive Genel Yönetim Müfredatı',
      'Şirket Değerlemesi ve Sermaye Yönetimi',
      'Global Perakende İnovasyonu',
      'Kurumsal Yönetişim ve Hissedar İlişkileri'
    ],
    nextCompetencies: ['Genel yönetim zekası', 'Sermaye odağı', 'Şirket liderliği'],
    ctaText: 'Genel Müdür Yardımcılığına İlerle'
  },
  {
    id: 14,
    title: 'Genel Müdür Yardımcısı',
    badgeHeading: 'Şirketin İkinci Kaptanı',
    coreMessage: 'Zirveye Bir Adım Kala',
    purpose: 'Tüm operasyonel, ticari ve idari birimlerin Genel Müdür (CEO) vizyonu doğrultusunda uyum içinde çalışmasını sağlamak.',
    recommendedDuration: '24 Ay',
    currentTrainings: [
      'Executive Genel Yönetim Müfredatı',
      'Şirket Değerlemesi ve Sermaye Yönetimi',
      'Global Perakende İnovasyonu'
    ],
    competencies: ['Genel yönetim zekası', 'Sermaye odağı', 'Şirket liderliği'],
    kpis: ['Şirket yıllık büyüme oranı', 'Pazar payı artışı', 'Yönetim kurulu stratejik hedef tamamlama'],
    nextCareerLevel: 'Genel Müdür / CEO',
    nextCareerLevelId: 15,
    requiredTrainingForNextLevel: [
      'Global Executive CEO Summit',
      'Yapay Zekâ ve Şirket Dönüşümü',
      'Yönetim Kurulu Başrakanlığı ve Kurumsallaşma'
    ],
    nextCompetencies: ['CEO vizyonerliği', 'Geleceği tasarlama'],
    ctaText: 'CEO Koltuğuna Hazırlan'
  },
  {
    id: 15,
    title: 'Genel Müdür / CEO',
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
    competencies: ['Geleceği tasarlama', 'Stratejik vizyonerlik', 'Sermaye ve değer yaratımı', 'Yönetim kurulu liderliği', 'Sürdürülebilir dönüşüm'],
    kpis: ['Şirket Piyasa Değeri ve Büyüme', 'Sürdürülebilir Karlılık (EBITDA)', 'Global / Bölgesel Pazar Liderliği', 'Teknoloji ve İnovasyon İndeksi'],
    nextCareerLevel: 'Geleceği Tasarlayan Yönetim Kurulu Liderliği',
    nextCareerLevelId: 15,
    requiredTrainingForNextLevel: ['Global Perakende Liderlik Zirveleri', 'Geleceğin Yapay Zekâ İş Modelleri', 'Sürdürülebilirlik ve ESG Stratejileri'],
    nextCompetencies: ['Sürekli vizyoner liderlik', 'Sektöre yön verme'],
    ceoFocusAreas: [
      { title: 'Vizyon', desc: 'Şirketin 5-10 yıllık gelecek rotasını belirleme' },
      { title: 'Büyüme', desc: 'Pazar payını ve yeni yatırımları ölçeklendirme' },
      { title: 'Sermaye', desc: 'Finansal kaynakları ve şirket değerini büyütme' },
      { title: 'Teknoloji', desc: 'Yapay zekâ ve dijital dönüşüme liderlik etme' },
      { title: 'İnsan', desc: 'Üst düzey yönetim takımını kurma ve yedekleme' }
    ],
    ctaText: 'Geleceğin Perakendesini Tasarla'
  }
];

const LEVEL_DURATIONS = [
  '6–12 Ay',   // 1
  '6–12 Ay',   // 2
  '12–18 Ay',  // 3
  '6–12 Ay',   // 4
  '12–18 Ay',  // 5
  '6–12 Ay',   // 6
  '18–24 Ay',  // 7
  '12–18 Ay',  // 8
  '6–12 Ay',   // 9
  '24–36 Ay',  // 10
  '18–24 Ay',  // 11
  '24–36 Ay',  // 12
  '24–36 Ay',  // 13
  '24 Ay',     // 14
  'Sürekli Liderlik' // 15
];

// Helper generator function to create 15 steps for alternate career tracks
function generateAlternateTrackSteps(
  titles: string[],
  departmentName: string
): CareerStep15[] {
  return titles.map((title, index) => {
    const stepId = index + 1;
    const isPeak = stepId === 15;
    const nextTitle = isPeak ? titles[14] : titles[index + 1];

    return {
      id: stepId,
      title: title,
      badgeHeading: `${departmentName} - Seviye ${stepId}`,
      coreMessage: isPeak ? 'Zirve Liderlik' : `Adım Step ${stepId}`,
      purpose: `${title} pozisyonunda ${departmentName.toLowerCase()} alanındaki yetkinlikleri ve operasyonu yönetmek.`,
      recommendedDuration: LEVEL_DURATIONS[index],
      currentTrainings: [
        `${title} Temel Müfredatı`,
        `${departmentName} Operasyon Standartları`,
        'Veri Analitiği ve Raporlama',
        'Ekip İletişimi ve Koçluk'
      ],
      competencies: [
        `${departmentName} uzmanlığı`,
        'Analitik düşünme',
        'Problem çözme',
        'Ekip koçluğu'
      ],
      kpis: [
        `${departmentName} performans skoru`,
        'Hata ve sapma oranı',
        'Hedef gerçekleşme yüzdesi'
      ],
      nextCareerLevel: nextTitle,
      nextCareerLevelId: isPeak ? 15 : stepId + 1,
      requiredTrainingForNextLevel: [
        `İleri ${nextTitle} Müfredatı`,
        `Stratejik ${departmentName} Yönetimi`,
        'P&L ve Bütçe Planlama',
        'C-Level Yönetici Liderliği'
      ],
      nextCompetencies: [
        `İleri ${nextTitle} yetkinliği`,
        'Stratejik liderlik',
        'Bütçe yönetimi'
      ],
      ctaText: isPeak ? 'Zirve Liderliği Yönet' : `${nextTitle} Pozisyonuna Hazırlan`
    };
  });
}

// 6 DISTINCT CAREER TRACKS (ALL 15 STEPS EACH)
export const ALL_CAREER_TRACKS_15: CareerTrack15[] = [
  {
    id: 'kasiyer-ceo',
    name: 'Kasiyerlikten CEO / Genel Müdürlüğe',
    badgeText: '15 BASAMAKLI KARİYER HARİTASI',
    headline: 'Kasadan CEO Koltuğuna İlerleme Haritası',
    department: 'Mağaza Operasyonu & Genel Yönetim',
    startRole: '1. Kasiyer (0-1 Yıl)',
    peakRole: '15. CEO (Geleceği Tasarlama)',
    description: 'Sahanın en alt kademesinden başlayıp tüm operasyon, bölge ve genel yönetim basamaklarını tırmanarak zirveye ulaşan efsanevi kariyer rotası.',
    steps: CAREER_STEPS_15_DATA
  },
  {
    id: 'satinalma-direktoru',
    name: 'Reyon Elemanlığından Satın Alma Direktörlüğüne',
    badgeText: '15 BASAMAKLI KARİYER HARİTASI',
    headline: 'Reyondan Satın Alma Direktörlüğüne İlerleme Haritası',
    department: 'Satın Alma & Kategori Yönetimi',
    startRole: '1. Reyon Elemanı (0-1 Yıl)',
    peakRole: '15. Satın Alma & Ticaret Direktörü (CCO)',
    description: 'Reyon uzmanlığından tedarikçi müzakerelerine, kategori yönetiminden ticari direktörlüğe uzanan stratejik perakende rotası.',
    steps: generateAlternateTrackSteps([
      'Reyon Elemanı',
      'Kıdemli Reyon Personeli',
      'Reyon Şefi',
      'Kasa & Saha Sorumlusu',
      'Mağaza Müdür Yardımcısı',
      'Kategori Asistanı / Stajyeri',
      'Kategori Uzman Yardımcısı',
      'Kategori Uzmanı',
      'Kıdemli Kategori Uzmanı',
      'Kategori Yöneticisi Adayı',
      'Kategori Yöneticisi',
      'Satın Alma Müdürü',
      'Kıdemli Satın Alma Müdürü',
      'Ticari & Satın Alma Grup Müdürü',
      'Satın Alma & Ticaret Direktörü (CCO)'
    ], 'Satın Alma & Kategori')
  },
  {
    id: 'pazarlama-satis',
    name: 'Reyon Elemanlığından Pazarlama ve Satış Müdürlüğüne',
    badgeText: '15 BASAMAKLI KARİYER HARİTASI',
    headline: 'Reyondan Pazarlama ve Satış Müdürlüğüne İlerleme Haritası',
    department: 'Satış, Pazarlama & CRM',
    startRole: '1. Reyon Elemanı (0-1 Yıl)',
    peakRole: '15. Satış ve Pazarlama Direktörü (CMO)',
    description: 'Müşteri temasından sepet büyütmeye, CRM verisinden markanın tüm satış ve pazarlama direktörlüğüne ulaşan modern kariyer yolu.',
    steps: generateAlternateTrackSteps([
      'Reyon Elemanı',
      'Müşteri İlişkileri Temsilcisi',
      'Reyon & Görsel Şefi (Merchandiser)',
      'Mağaza Satış Lideri',
      'Mağaza Müdür Yardımcısı',
      'Pazarlama Asistanı',
      'Ticari Pazarlama Uzman Yardımcısı',
      'CRM & Müşteri Analitiği Uzmanı',
      'Kıdemli Pazarlama Uzmanı',
      'Dijital Pazarlama Yöneticisi',
      'Ticari Pazarlama Yöneticisi',
      'Bölge Satış & Pazarlama Müdürü',
      'Pazarlama Müdürü',
      'Satış & Pazarlama Grup Müdürü',
      'Satış ve Pazarlama Direktörü (CMO)'
    ], 'Satış & Pazarlama')
  },
  {
    id: 'crm-veri',
    name: 'Reyon Elemanlığından CRM, Veri & Dijital Dönüşüm Direktörlüğüne',
    badgeText: '15 BASAMAKLI KARİYER HARİTASI',
    headline: 'Reyondan CRM ve Veri Direktörlüğüne İlerleme Haritası',
    department: 'CRM, Veri Analitiği & Dijitalleşme',
    startRole: '1. Reyon Elemanı (0-1 Yıl)',
    peakRole: '15. CRM, Veri ve Dijital Dönüşüm Direktörü (CDO)',
    description: 'Saha müşteri kaydından başlayarak SQL, Power BI, sepet analitiği, CRM segmentasyonu ve şirketin tüm veri-yapay zeka direktörlüğüne uzanan teknoloji rotası.',
    steps: generateAlternateTrackSteps([
      'Reyon Elemanı',
      'Kasa & CRM Veri Kayıt Sorumlusu',
      'Mağaza Müşteri İlişkileri Şefi',
      'Saha Veri Toplama & Kampanya Lideri',
      'Mağaza Müdür Yardımcısı',
      'CRM / Veri Analitiği Asistanı',
      'Raporlama & SQL Uzman Yardımcısı',
      'CRM & Müşteri Analitiği Uzmanı',
      'Kıdemli Veri Analisti',
      'Perakende BI Yöneticisi Adayı',
      'CRM & Müşteri Bağlılığı Yöneticisi',
      'Veri Analitiği & BI Müdürü',
      'Kıdemli CRM & Veri Yönetimi Müdürü',
      'Dijital Dönüşüm & Veri Grup Müdürü',
      'CRM, Veri ve Dijital Dönüşüm Direktörü (CDO)'
    ], 'CRM & Veri Analitiği')
  },
  {
    id: 'lojistik-tedarik',
    name: 'Reyon Elemanlığından Lojistik ve Tedarik Chain Müdürlüğüne',
    badgeText: '15 BASAMAKLI KARİYER HARİTASI',
    headline: 'Reyondan Lojistik Müdürlüğüne İlerleme Haritası',
    department: 'Lojistik & Tedarik Zinciri',
    startRole: '1. Reyon Elemanı (0-1 Yıl)',
    peakRole: '15. Lojistik & Tedarik Zinciri Direktörü (CLO)',
    description: 'Depo ve mal kabulden başlayarak stok planlama, antrepo yönetimi ve tüm perakende lojistik ağının direktörlüğüne uzanan operasyonel hat.',
    steps: generateAlternateTrackSteps([
      'Reyon Elemanı',
      'Mal Kabul & Depo Görevlisi',
      'Depo Şefi / Stok Sorumlusu',
      'Mağaza Stok & Fire Şefi',
      'Bölge Stok Kontrolörü',
      'Lojistik Operasyon Asistanı',
      'Depo & Sevkiyat Uzman Yardımcısı',
      'Stok & Envanter Planlama Uzmanı',
      'Kıdemli Lojistik Uzmanı',
      'Depo / Antrepo Yöneticisi',
      'Tedarik Zinciri Yöneticisi',
      'Lojistik Operasyon Müdürü',
      'Kıdemli Lojistik Müdürü',
      'Tedarik Zinciri Grup Müdürü',
      'Lojistik & Tedarik Zinciri Direktörü (CLO)'
    ], 'Lojistik & Tedarik Zinciri')
  },
  {
    id: 'insan-kaynaklari',
    name: 'Reyon Elemanlığından İnsan Kaynakları Direktörlüğüne',
    badgeText: '15 BASAMAKLI KARİYER HARİTASI',
    headline: 'Reyondan İK Direktörlüğüne İlerleme Haritası',
    department: 'İnsan Kaynakları & Kurumsal Akademi',
    startRole: '1. Reyon Elemanı (0-1 Yıl)',
    peakRole: '15. İnsan Kaynakları Direktörü (CHRO)',
    description: 'Saha çalışan deneyiminden başlayarak eğitim uzmanlığı, HRBP,akademi yöneticiliği ve şirket insan kaynakları direktörlüğüne giden insan odaklı rota.',
    steps: generateAlternateTrackSteps([
      'Reyon Elemanı',
      'Mağaza Ekip Lideri',
      'Mağaza Müdür Yardımcısı',
      'Mağaza Eğitmen Şefi',
      'Saha İK & İşe Alım Sorumlusu',
      'Akademi / LMS Uzman Yardımcısı',
      'İK Operasyon Uzmanı',
      'İşe Alım & Yetenek Uzmanı',
      'Saha İK Partneri (HRBP)',
      'Kıdemli İK Uzmanı / HRBP',
      'Eğitim & Gelişim Yöneticisi',
      'İnsan Kaynakları Müdürü',
      'Kurumsal Akademi Yöneticisi',
      'İK Grup Müdürü',
      'İnsan Kaynakları Direktörü (CHRO)'
    ], 'İnsan Kaynakları')
  }
];

export const SCORING_WEIGHTS_15 = [
  { label: 'KPI ve İş Sonuçları', percent: 30, color: '#0B2A4A', icon: 'Target' },
  { label: 'Saha Yetkinliği', percent: 25, color: '#087F96', icon: 'ShieldCheck' },
  { label: 'Eğitim ve Sınav', percent: 15, color: '#34A853', icon: 'GraduationCap' },
  { label: 'Yönetici Değerlendirmesi', percent: 15, color: '#056B80', icon: 'Users' },
  { label: 'Final Projesi', percent: 10, color: '#D97706', icon: 'FileText' },
  { label: 'Kurum Kültürü', percent: 5, color: '#8B5CF6', icon: 'Award' }
];

export const CAREER_MOTTO = "Perakendede kariyer tesadüf değildir. Doğru eğitim, saha deneyimi, ölçülebilir performans ve gelişimle adım adım inşa edilir.";
