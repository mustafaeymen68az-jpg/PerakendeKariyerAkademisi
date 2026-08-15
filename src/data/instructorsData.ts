export interface AcademicDegree {
  degree: string; // e.g. "Lisans", "Yüksek Lisans / MBA", "Doktora"
  school: string; // e.g. "İstanbul Üniversitesi"
  department: string; // e.g. "İşletme Fakültesi"
  year: string; // e.g. "2008 - 2012"
}

export interface CorporateTrainingHistory {
  company: string; // e.g. "Migros Taze Gıda Akademisi"
  role: string; // e.g. "Kurumsal İç Eğitmen Yetiştirme"
  participants: number; // e.g. 1450
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  company: string;
  experienceYears: number;
  rating: number;
  totalStudents: number;
  totalCoursesCount: number;
  totalHoursGiven: number;
  totalCompaniesServed: number;
  bio: string;
  specialties: string[];
  competenciesPassport: string[];
  academicDegrees: AcademicDegree[];
  corporateHistory: CorporateTrainingHistory[];
  coursesGiven: { id: string; title: string; category: string; slug: string; duration: number }[];
  linkedinUrl: string;
  verifiedBadge: boolean;
}

export const INSTRUCTORS_DATA: Record<string, Instructor> = {
  'ahmet-celik': {
    id: 'ahmet-celik',
    name: 'Ahmet Çelik',
    title: 'Kurucu & Perakende Stratejisti',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    company: 'Perakende Kariyer Akademisi',
    experienceYears: 18,
    rating: 4.9,
    totalStudents: 14200,
    totalCoursesCount: 16,
    totalHoursGiven: 2400,
    totalCompaniesServed: 42,
    bio: '18 yılı aşkın perakende saha operasyonu, mağaza müdürlüğü, bölge yönetimi ve C-Level icra kurulu tecrübesiyle sahanın gerçek ihtiyaçlarına yönelik stratejik eğitimler vermektedir. Mağaza kârlılığı, turnover azaltma ve yönetici yedekleme mimarilerinde Türkiye perakende sektörünün önde gelen akademisyen ve saha danışmanlarındandır.',
    specialties: ['Stratejik Mağazacılık', 'P&L ve Finansal KPI', 'Liderlik ve Yönetici Yetiştirme', 'Turnover Azaltma Stratejileri', 'Saha Denetimi & Audit'],
    competenciesPassport: ['Stratejik Karar Alma', 'Mağaza P&L Yönetimi', 'Yönetici Koçluğu', 'Kriz Yönetimi', 'Saha Audit & Süreç Mimarisi'],
    academicDegrees: [
      { degree: 'Lisans', school: 'Marmara Üniversitesi', department: 'İktisadi ve İdari Bilimler Fakültesi', year: '2002 - 2006' },
      { degree: 'Yüksek Lisans / MBA', school: 'İstanbul Üniversitesi', department: 'Pazarlama ve Perakende Yönetimi', year: '2007 - 2009' }
    ],
    corporateHistory: [
      { company: 'Şok / Bizim Toptan Grubu', role: 'Bölge Müdürleri Yönetici Gelişim Programı', participants: 3200 },
      { company: 'Migros Ticaret A.Ş.', role: 'Mağaza Müdürleri P&L Finansal Karnesi', participants: 4500 },
      { company: 'CarrefourSA', role: 'Kasiyerlikten Yönetici Aday Havuzu Yetiştirme', participants: 2800 }
    ],
    coursesGiven: [
      { id: 'kasadan-ceo-koltuguna-ilerleme-haritasi', title: 'Kasadan CEO Koltuğuna İlerleme Haritası', category: 'Mağaza Yönetimi', slug: 'kasadan-ceo-koltuguna-ilerleme-haritasi', duration: 16 },
      { id: 'ceo-genel-mudur-icin-yapay-zeka', title: 'CEO / Genel Müdür İçin Yapay Zekâ', category: 'Üst Yönetim', slug: 'ceo-genel-mudur-icin-yapay-zeka', duration: 24 },
      { id: 'magaza-pl-finansal-kpi', title: 'Mağaza P&L ve Finansal Yönetim', category: 'Finans & Operasyon', slug: 'magaza-pl-finansal-kpi', duration: 20 }
    ],
    linkedinUrl: 'https://www.linkedin.com',
    verifiedBadge: true
  },

  'dr-mehmet-yilmaz': {
    id: 'dr-mehmet-yilmaz',
    name: 'Dr. Mehmet Yılmaz',
    title: 'Yapay Zekâ ve Veri Analitiği Başdanışmanı',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    company: 'Ex-Amazon Retail AI Lead',
    experienceYears: 14,
    rating: 4.95,
    totalStudents: 9800,
    totalCoursesCount: 12,
    totalHoursGiven: 1850,
    totalCompaniesServed: 28,
    bio: 'Yapay zekâ ve makine öğreniminin perakendecilikte kullanım alanları üzerine doktora yapmış; LLM prompt mühendisliği, otomatik sipariş algoritmaları ve stok tahmin yöntemlerinde küresel perakende devlerinde liderlik üstlenmiştir.',
    specialties: ['Üretken Yapay Zekâ (LLM)', 'Perakende Prompt Mühendisliği', 'Power BI & Python Analitiği', 'Dinamik Fiyatlandırma', 'Otomatik Sipariş Motorları'],
    competenciesPassport: ['Prompt Mühendisliği', 'Power BI Raporlama', 'Tahmin Algoritmaları', 'Büyük Veri Analitiği', 'AI Entegrasyonu'],
    academicDegrees: [
      { degree: 'Lisans', school: 'Boğaziçi Üniversitesi', department: 'Bilgisayar Mühendisliği', year: '2006 - 2010' },
      { degree: 'Yüksek Lisans', school: 'ETH Zürich', department: 'Data Science & Machine Learning', year: '2010 - 2012' },
      { degree: 'Doktora (PhD)', school: 'İstanbul Teknik Üniversitesi', department: 'Yapay Zekâ ve Perakende Tahmin Algoritmaları', year: '2013 - 2017' }
    ],
    corporateHistory: [
      { company: 'Amazon EMEA Retail', role: 'AI Demand Forecasting Program', participants: 1800 },
      { company: 'A101 Yeni Mağazacılık', role: 'Veri Analitiği ve Power BI Eğitim Serisi', participants: 2400 }
    ],
    coursesGiven: [
      { id: 'perakendede-yapay-zeka-kullanimi', title: 'Perakendede Yapay Zekâ Kullanımı', category: 'Temel & Saha', slug: 'perakendede-yapay-zeka-kullanimi', duration: 12 },
      { id: 'uretken-yapay-zeka-ve-etkili-prompt-kullanimi', title: 'Üretken Yapay Zekâ ve Etkili Prompt Kullanımı', category: 'Uygulamalı', slug: 'uretken-yapay-zeka-ve-etkili-prompt-kullanimi', duration: 18 },
      { id: 'yapay-zeka-ile-raporlama-ve-veri-analizi', title: 'Yapay Zekâ ile Raporlama ve Veri Analizi', category: 'Veri & Analitik', slug: 'yapay-zeka-ile-raporlama-ve-veri-analizi', duration: 24 }
    ],
    linkedinUrl: 'https://www.linkedin.com',
    verifiedBadge: true
  },

  'selin-arslan': {
    id: 'selin-arslan',
    name: 'Selin Arslan',
    title: 'CRM ve Müşteri Alışveriş Deneyimi Direktörü',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    company: 'Perakende CRM Danışmanlığı',
    experienceYears: 12,
    rating: 4.88,
    totalStudents: 8100,
    totalCoursesCount: 10,
    totalHoursGiven: 1400,
    totalCompaniesServed: 31,
    bio: 'Müşteri sadakat programları, RFM segmentasyonu, kayıp müşteri (churn) engelleme ve kişiselleştirilmiş kampanya kurguları uzmanıdır. Mağaza içi müşteri ilişkileri ve ikna psikolojisinde perakende çalışanlarına doğrudan rehberlik yapmaktadır.',
    specialties: ['CRM & Segmentasyon', 'Müşteri Sadakati', 'Sepet Büyütme Teknikleri', 'Omnichannel Deneyim', 'İkna Psikolojisi'],
    competenciesPassport: ['RFM Müşteri Segmentasyonu', 'Churn Önleme', 'Sepet Ortalaması Büyütme', 'Müşteri İletişim Protokolü'],
    academicDegrees: [
      { degree: 'Lisans', school: 'Galatasaray Üniversitesi', department: 'İletişim Fakültesi', year: '2008 - 2012' },
      { degree: 'Yüksek Lisans', school: 'Koç Üniversitesi', department: 'Stratejik Pazarlama', year: '2013 - 2015' }
    ],
    corporateHistory: [
      { company: 'Boyner Mağazacılık', role: 'Müşteri Sadakat & CRM Atölyesi', participants: 2100 },
      { company: 'Teknosa', role: 'Omnichannel Mağaza İçi Satış ve Müşteri İlişkileri', participants: 3400 }
    ],
    coursesGiven: [
      { id: 'yapay-zeka-ile-crm-ve-musteri-analitigi', title: 'Yapay Zekâ ile CRM ve Müşteri Analitiği', category: 'Pazarlama & CRM', slug: 'yapay-zeka-ile-crm-ve-musteri-analitigi', duration: 16 },
      { id: 'musteri-iliskileri-ve-ikna-teknikleri', title: 'Müşteri İlişkileri ve İkna Teknikleri', category: 'Saha Satış', slug: 'musteri-iliskileri-ve-ikna-teknikleri', duration: 14 }
    ],
    linkedinUrl: 'https://www.linkedin.com',
    verifiedBadge: true
  },

  'prof-hakan-erdem': {
    id: 'prof-hakan-erdem',
    name: 'Prof. Dr. Hakan Erdem',
    title: 'Satın Alma ve Ticari Kategori Stratejisti',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    company: 'Perakende Akademisi Başdanışmanı',
    experienceYears: 22,
    rating: 4.92,
    totalStudents: 16500,
    totalCoursesCount: 18,
    totalHoursGiven: 3100,
    totalCompaniesServed: 54,
    bio: 'Tedarikçi müzakereleri, marj yönetimi, kategori planogramları ve satın alma kontrat hukuku konusunda 22 yıllık tecrübesiyle perakende sektörüne yön veren kıdemli akademisyen ve danışman.',
    specialties: ['Tedarikçi Müzakeresi', 'Kategori Yönetimi (Category Management)', 'Marj ve İskonto Analizi', 'Fiyatlandırma Stratejileri', 'Ticari Sözleşmeler'],
    competenciesPassport: ['Stratejik Satın Alma', 'Kategori Planogramı', 'Tedarikçi Pazarlığı', 'Brüt Marj Optimizasyonu'],
    academicDegrees: [
      { degree: 'Lisans', school: 'İstanbul Üniversitesi', department: 'İktisat Fakültesi', year: '1998 - 2002' },
      { degree: 'Yüksek Lisans', school: 'İstanbul Üniversitesi', department: 'Uluslararası Ticaret ve Lojistik', year: '2002 - 2004' },
      { degree: 'Doktora (PhD)', school: 'Marmara Üniversitesi', department: 'Perakendede Kategori Yönetimi ve Marj Optimizasyonu', year: '2005 - 2009' }
    ],
    corporateHistory: [
      { company: 'BİM Birleşik Mağazalar', role: 'Satın Alma Uzmanları Müzakere Atölyesi', participants: 4200 },
      { company: 'Metro Toptancı Market', role: 'Kategori Yönetimi & Marj Hesabı Eğitimi', participants: 3100 }
    ],
    coursesGiven: [
      { id: 'satinalma-ve-ileri-kategori-yonetimi', title: 'Satın Alma ve İleri Kategori Yönetimi', category: 'Satın Alma', slug: 'satinalma-ve-ileri-kategori-yonetimi', duration: 20 },
      { id: 'stratejik-tedarikci-muzakere-teknikleri', title: 'Stratejik Tedarikçi Müzakere Teknikleri', category: 'Satın Alma', slug: 'stratejik-tedarikci-muzakere-teknikleri', duration: 18 }
    ],
    linkedinUrl: 'https://www.linkedin.com',
    verifiedBadge: true
  },

  'zeynep-kaya': {
    id: 'zeynep-kaya',
    name: 'Zeynep Kaya',
    title: 'İnsan Kaynakları ve Kurumsal Akademi Direktörü',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    company: 'Perakende HR Executive',
    experienceYears: 15,
    rating: 4.9,
    totalStudents: 11200,
    totalCoursesCount: 14,
    totalHoursGiven: 2100,
    totalCompaniesServed: 38,
    bio: 'Saha işe alımı, yetenek havuzu mimarisi, terfi değerlendirme merkezleri (Assessment Center) ve yetkinlik pasaportu sistemlerinin kurucusudur. 15 yıllık tecrübesiyle perakende sektöründe iç eğitmen yetiştirme ve yedekleme planı mimarisini yönetmektedir.',
    specialties: ['İç Terfi & Yedekleme Planı', 'Yetenek Havuzu Mimarisi', 'Saha İK Partnerliği (HRBP)', 'Eğitim Gelişim Karnesi', 'Değerlendirme Merkezi (Assessment)'],
    competenciesPassport: ['Terfi Skoru Formülü Mimarisi', '9-Box Matrisi Kurulumu', 'İç Eğitmen Yetiştirme', 'Mülakat Teknikleri & İşe Alım'],
    academicDegrees: [
      { degree: 'Lisans', school: 'Hacettepe Üniversitesi', department: 'Psikoloji Bölümü', year: '2005 - 2009' },
      { degree: 'Yüksek Lisans / MBA', school: 'İstanbul Bilgi Üniversitesi', department: 'İnsan Kaynakları Yönetimi', year: '2010 - 2012' }
    ],
    corporateHistory: [
      { company: 'Watsons Türkiye', role: 'Saha İK Partnerliği & Terfi Komitesi Yapılandırması', participants: 2900 },
      { company: 'Gratis', role: 'Mağaza Müdürü Aday Havuzu & Assessment Center', participants: 3800 },
      { company: 'Lindex & LC Waikiki', role: 'İç Eğitmen Yetiştirme Programı', participants: 2100 }
    ],
    coursesGiven: [
      { id: 'perakende-ik-ve-yetenek-yonetimi', title: 'Perakende İK ve Yetenek Yönetimi', category: 'İnsan Kaynakları', slug: 'perakende-ik-ve-yetenek-yonetimi', duration: 16 },
      { id: 'terfi-ve-yedekleme-planlamasi-mimarisi', title: 'Terfi ve Yedekleme Planlaması Mimarisi', category: 'İnsan Kaynakları', slug: 'terfi-ve-yedekleme-planlamasi-mimarisi', duration: 22 }
    ],
    linkedinUrl: 'https://www.linkedin.com',
    verifiedBadge: true
  },

  'can-demirel': {
    id: 'can-demirel',
    name: 'Can Demirel',
    title: 'Lojistik ve Tedarik Zinciri Müdürü',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
    company: 'Global Perakende Lojistiği',
    experienceYears: 13,
    rating: 4.87,
    totalStudents: 6900,
    totalCoursesCount: 9,
    totalHoursGiven: 1250,
    totalCompaniesServed: 24,
    bio: 'Soğuk zincir lojistiği, antrepo yönetimi, stok devir hızı optimizasyonu ve AI destekli otomatik sipariş sistemleri uzmanıdır.',
    specialties: ['Tedarik Zinciri Optimizasyonu', 'Stok Devir Hızı (Inventory Turnover)', 'Otomatik Sipariş & Sıfır Zayi', 'Depo Yönetimi (WMS)'],
    competenciesPassport: ['WMS Depo Otomasyonu', 'Soğuk Zincir Kalite Denetimi', 'Sıfır Zayi Stratejileri'],
    academicDegrees: [
      { degree: 'Lisans', school: 'Yıldız Teknik Üniversitesi', department: 'Endüstri Mühendisliği', year: '2007 - 2011' },
      { degree: 'Yüksek Lisans', school: 'İzmir Yüksek Teknoloji Enstitüsü', department: 'Tedarik Zinciri Lojistiği', year: '2012 - 2014' }
    ],
    corporateHistory: [
      { company: 'Ekol Lojistik', role: 'Perakende Depo Otomasyonu & Sıfır Zayi', participants: 1900 },
      { company: 'Hakmar Alışveriş Merkezleri', role: 'Soğuk Zincir ve Stok Devir Hızı Danışmanlığı', participants: 1500 }
    ],
    coursesGiven: [
      { id: 'yapay-zeka-ile-talep-tahmini-ve-siparis-optimizasyonu', title: 'Yapay Zekâ ile Talep Tahmini ve Sipariş Optimizasyonu', category: 'Stok & Lojistik', slug: 'yapay-zeka-ile-talep-tahmini-ve-siparis-optimizasyonu', duration: 16 },
      { id: 'lojistik-ve-stok-planlama', title: 'Lojistik ve Stok Devir Planlaması', category: 'Lojistik', slug: 'lojistik-ve-stok-planlama', duration: 14 }
    ],
    linkedinUrl: 'https://www.linkedin.com',
    verifiedBadge: true
  }
};

// Default instructor mapping function based on course category / title
export function getInstructorForCourse(courseId: string, category?: string): Instructor {
  if (courseId.includes('yapay-zeka') || courseId.includes('prompt') || courseId.includes('analizi')) {
    return INSTRUCTORS_DATA['dr-mehmet-yilmaz'];
  }
  if (courseId.includes('crm') || courseId.includes('musteri') || category?.includes('Pazarlama')) {
    return INSTRUCTORS_DATA['selin-arslan'];
  }
  if (courseId.includes('satinalma') || courseId.includes('kategori') || category?.includes('Satın Alma')) {
    return INSTRUCTORS_DATA['prof-hakan-erdem'];
  }
  if (courseId.includes('ik') || courseId.includes('yetenek') || category?.includes('İnsan Kaynakları')) {
    return INSTRUCTORS_DATA['zeynep-kaya'];
  }
  if (courseId.includes('lojistik') || courseId.includes('stok') || category?.includes('Lojistik')) {
    return INSTRUCTORS_DATA['can-demirel'];
  }

  // Default master instructor
  return INSTRUCTORS_DATA['ahmet-celik'];
}
