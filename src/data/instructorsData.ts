export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  company: string;
  experienceYears: number;
  rating: number;
  totalStudents: number;
  bio: string;
  specialties: string[];
  coursesGiven: { id: string; title: string; category: string }[];
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
    bio: '18 yılı aşkın perakende saha operasyonu, mağaza müdürlüğü, bölge yönetimi ve C-Level icra kurulu tecrübesiyle sahanın gerçek ihtiyaçlarına yönelik eğitimler vermektedir.',
    specialties: ['Stratejik Mağazacılık', 'P&L ve Finansal KPI', 'Liderlik ve Yönetici Yetiştirme', 'Turnover Azaltma Stratejileri'],
    coursesGiven: [
      { id: 'kasiyerlikten-ceo-yolculugu', title: 'Kasadan CEO Koltuğuna İlerleme Haritası', category: 'Mağaza Yönetimi' },
      { id: 'ceo-genel-mudur-icin-yapay-zeka', title: 'CEO / Genel Müdür İçin Yapay Zekâ', category: 'Üst Yönetim' },
      { id: 'magaza-pl-finansal-kpi', title: 'Mağaza P&L ve Finansal Yönetim', category: 'Finans & Operasyon' }
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
    bio: 'Yapay zekâ ve makine öğreniminin perakendecilikte kullanım alanları üzerine doktora yapmış; LLM prompt mühendisliği ve stok tahmin algoritmaları uzmanıdır.',
    specialties: ['Üretken Yapay Zekâ (LLM)', 'Perakende Prompt Mühendisliği', 'Power BI & Python Analitiği', 'Dinamik Fiyatlandırma'],
    coursesGiven: [
      { id: 'perakendede-yapay-zeka-kullanimi', title: '1. Perakendede Yapay Zekâ Kullanımı', category: 'Temel & Saha' },
      { id: 'uretken-yapay-zeka-ve-etkili-prompt-kullanim', title: '2. Üretken Yapay Zekâ ve Etkili Prompt Kullanımı', category: 'Uygulamalı' },
      { id: 'yapay-zeka-ile-raporlama-ve-veri-analizi', title: '3. Yapay Zekâ ile Raporlama ve Veri Analizi', category: 'Veri & Analitik' }
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
    bio: 'Müşteri sadakat programları, RFM segmentasyonu, kayıp müşteri (churn) engelleme ve kişiselleştirilmiş kampanya kurguları uzmanıdır.',
    specialties: ['CRM & Segmentasyon', 'Müşteri Sadakati', 'Sepet Büyütme Teknikleri', 'Omnichannel Deneyim'],
    coursesGiven: [
      { id: 'yapay-zeka-ile-crm-ve-musteri-analitigi', title: '7. Yapay Zekâ ile CRM ve Müşteri Analitiği', category: 'Pazarlama & CRM' },
      { id: 'musteri-ilişkileri-ve-ikna-teknikleri', title: 'Müşteri İlişkileri ve İkna Teknikleri', category: 'Saha Satış' }
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
    bio: 'Tedarikçi müzakereleri, marj yönetimi, kategori planogramları ve satın alma kontrat hukuku konusunda uzman akademik danışman.',
    specialties: ['Tedarikçi Müzakeresi', 'Kategori Yönetimi (Category Management)', 'Marj ve İskonto Analizi', 'Fiyatlandırma Stratejileri'],
    coursesGiven: [
      { id: 'satinalma-kategori-yonetimi', title: 'Satın Alma ve İleri Kategori Yönetimi', category: 'Satın Alma' },
      { id: 'tedarikci-muzakere-teknikleri', title: 'Stratejik Tedarikçi Müzakere Teknikleri', category: 'Satın Alma' }
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
    bio: 'Saha işe alımı, yetenek havuzu mimarisi, terfi değerlendirme merkezleri (Assessment Center) ve yetkinlik pasaportu sistemlerinin kurucusudur.',
    specialties: ['İç Terfi & Yedekleme Planı', 'Yetenek Havuzu Mimarisi', 'Saha İK Partnerliği (HRBP)', 'Eğitim Gelişim Karnesi'],
    coursesGiven: [
      { id: 'perakende-ik-ve-yetenek-yonetimi', title: 'Perakende İK ve Yetenek Yönetimi', category: 'İnsan Kaynakları' },
      { id: 'terfi-ve-yedekleme-mimarisi', title: 'Terfi ve Yedekleme Planlaması Mimarisi', category: 'İnsan Kaynakları' }
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
    bio: 'Soğuk zincir lojistiği, antrepo yönetimi, stok devir hızı optimizasyonu ve AI destekli otomatik sipariş sistemleri uzmanıdır.',
    specialties: ['Tedarik Zinciri Optimizasyonu', 'Stok Devir Hızı (Inventory Turnover)', 'Otomatik Sipariş & Sıfır Zayi', 'Depo Yönetimi (WMS)'],
    coursesGiven: [
      { id: 'yapay-zeka-ile-talep-tahmini-ve-siparis-optimizasyonu', title: '4. Yapay Zekâ ile Talep Tahmini ve Sipariş Optimizasyonu', category: 'Stok & Lojistik' },
      { id: 'lojistik-ve-stok-planlama', title: 'Lojistik ve Stok Devir Planlaması', category: 'Lojistik' }
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
