import React from 'react';
import Link from 'next/link';
import { 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  Users, 
  HelpCircle, 
  Target, 
  Play, 
  ChevronRight, 
  ChevronLeft,
  FileText, 
  Sparkles, 
  ArrowLeft,
  ArrowRight,
  Building2,
  UserCheck,
  Layers,
  ShieldCheck,
  Check,
  Zap,
  BarChart3,
  LayoutGrid
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '@/data/departmentsData';
import CourseDepartmentNav from '@/components/CourseDepartmentNav';
import CourseVideoPlayer from '@/components/CourseVideoPlayer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

interface ModuleDetail {
  id: number;
  title: string;
  duration: string;
  badge: string;
  description: string;
  subTopics: string[];
  keySkill: string;
}

interface DetailedCourse {
  title: string;
  category: string;
  department: string;
  deptId: string;
  year: string;
  duration: number;
  purpose: string;
  importance: string;
  targetAudience: string;
  modules: ModuleDetail[];
  outcomes: string[];
  sampleApp: string;
  caseStudy: string;
  evaluationMethod: string;
  examInfo: string;
  relatedCourses: { title: string; slug: string }[];
}

interface FlatCourse {
  title: string;
  slug: string;
  department: string;
  year: string;
}

const buildFlatCourseList = (): FlatCourse[] => {
  const list: FlatCourse[] = [];
  DEPARTMENTS_DATA.forEach((dept) => {
    dept.year1Courses.forEach((cName) => {
      list.push({
        title: cName,
        slug: createSlug(cName),
        department: dept.name,
        year: '1. Yıl',
      });
    });
    dept.year2Courses.forEach((cName) => {
      list.push({
        title: cName,
        slug: createSlug(cName),
        department: dept.name,
        year: '2. Yıl',
      });
    });
  });
  return list;
};

const ALL_FLAT_COURSES = buildFlatCourseList();

function buildDetailedModules(cName: string, deptName: string, isYear2: boolean = false): ModuleDetail[] {
  const prefix = cName;
  
  if (isYear2) {
    return [
      {
        id: 1,
        title: `${prefix} İleri Seviye Stratejileri, Mevzuat & Yönetim İlkeleri`,
        duration: '3 Saat',
        badge: 'Strateji & Mevzuat',
        description: `${prefix} alanında 2. Yıl uzmanlaşma düzeyi, ileri mevzuat UFRS/KVKK uyumu, kurumsal standartlar ve stratejik risk yönetimi esasları.`,
        subTopics: [
          `${prefix} Kurumsal Standartları ve İleri Seviye Prosedürler`,
          'Sektörel Mevzuat, Hijyen ve İSG Risk Değerlendirmesi',
          'Süreç Audit (Denetim) ve Uyumluluk Kontrol Listeleri',
          'Ekip Emniyeti ve Operasyonel Sorumluluk Haritası'
        ],
        keySkill: 'İleri Seviye Mevzuat & Stratejik Yönetim'
      },
      {
        id: 2,
        title: `${prefix} Finansal KPI, Kar-Zarar (P&L) ve Bütçe Yönetimi`,
        duration: '4 Saat',
        badge: 'Finans & KPI',
        description: `Bölüm/mağaza ciro hedefleri, brüt marj optimizasyonu, GMROI (Stok Yatırım Getirisi) hesabı ve bütçe sapmalarının yönetimi.`,
        subTopics: [
          'Brüt Marj, Fire Oranı ve Stok Devir Hızı (ROIC/GMROI) Hesabı',
          'Aylık ve Yıllık Bütçe Planlama, Maliyet Kalemleri Kontrolü',
          'Kategori ve Reyon Bazlı Ciro/Kârlılık Analiz Tabloları',
          'Bütçe Sapma Analizi ve Düzeltici Aksiyon Planları'
        ],
        keySkill: 'Finansal KPI & P&L Yönetimi'
      },
      {
        id: 3,
        title: `İleri Tedarik Zinciri, Stok Devri & Fire Minimizasyonu`,
        duration: '4 Saat',
        badge: 'Tedarik & Stok',
        description: `Sipariş tahminleme modelleri, otomatik tamamlama (replenishment), tedarikçi teslimat kalitesi denetimi ve fire oranının sıfırlanması.`,
        subTopics: [
          'Talep Tahminleme & Emniyet Stoğu Miktarı Belirleme',
          'FIFO / FEFO Disiplini ve Raf Ömrü (Shelf Life) Takibi',
          'Tedarikçi Teslimat Uyum Skorları ve Mal Kabul Audit',
          'Saha Fire & Zayi Minimization Taktikleri'
        ],
        keySkill: 'Tedarik Zinciri & Stok Optimizasyonu'
      },
      {
        id: 4,
        title: `Ekip Liderliği, Performans Koçluğu & Vardiya Yönetimi`,
        duration: '3 Saat',
        badge: 'Liderlik & Koçluk',
        description: `Saha çalışanlarının sevki, vardiya/mola planlaması, performans geri bildirimi verme, çatışma çözümü ve motivasyon teknikleri.`,
        subTopics: [
          'Vardiya ve İşgücü Matrisi (Workforce Management) Hazırlama',
          'Birebir Geri Bildirim (1-on-1) ve Gelişim Koçluğu',
          'Ekip İçi Çatışma Yönetimi ve Takım Ruhu Oluşturma',
          'Performans Değerlendirme ve Kariyer Yedekleme'
        ],
        keySkill: 'Saha Liderliği & İnsan Yönetimi'
      },
      {
        id: 5,
        title: `Yapay Zekâ, Veri Analitiği & Dijital Perakendecilik`,
        duration: '3 Saat',
        badge: 'Yapay Zekâ & Veri',
        description: `Perakende veri madenciliği, PowerBI/Excel dashboard takibi, AI destekli talep tahminleme ve dijital dönüşüm modülleri.`,
        subTopics: [
          'Perakende Veri Göstergeleri (Traffic, Conversion, Basket Size)',
          'Yapay Zekâ Prompt Mühendisliği ile Saha Raporlama',
          'Omnichannel (Çoklu Kanal) Müşteri Deneyimi Entegrasyonu',
          'Otomatik Uyarı Sistemleri ve Veri Odaklı Karar Alma'
        ],
        keySkill: 'Yapay Zekâ & Dijital Perakendecilik'
      },
      {
        id: 6,
        title: `Stratejik Saha Zorlukları & Üst Düzey Kriz Çözümleri`,
        duration: '3 Saat',
        badge: 'Kriz Yönetimi',
        description: `Olağandışı saha krizleri, üst düzey müşteri şikayetleri, tedarik kilitlenmeleri ve kriz anlarında yönetici soğukkanlılığı.`,
        subTopics: [
          'Kriz Anlarında Protokol Listeleri ve İletişim Stratejisi',
          'Üst Düzey Müşteri ve Resmi Denetim Yönetimi',
          'Saha İş Sürekliliği (Business Continuity) Planları',
          'Geçmiş Kriz Vaka Analizleri ve Yönetici Simülasyonu'
        ],
        keySkill: 'Üst Düzey Kriz & Risk Yönetimi'
      }
    ];
  }

  return [
    {
      id: 1,
      title: `${prefix} Temel Standartları, Mevzuat & İş Sağlığı Güvenliği`,
      duration: '2 Saat',
      badge: 'Teorik & Standartlaşma',
      description: `${prefix} konusundaki kurumsal standartlar, hijyen/güvenlik mevzuatları, kişisel koruyucu donanımlar ve mağaza içi temel disiplin esaslarının detaylı incelenmesi.`,
      subTopics: [
        `${prefix} Kurumsal Standartları ve Prosedür Eğitimi`,
        'İş Sağlığı, Güvenliği ve Saha Risk Faktörlerinin Yönetimi',
        'Temel Ekipman Kullanımı, Ergonomi ve Hijyen Esasları',
        'Saha Çalışma Ortamı Organizasyonu ve 5S Disiplini'
      ],
      keySkill: 'Mevzuat Uyumu & Temel Saha Güvenliği'
    },
    {
      id: 2,
      title: `${prefix} Operasyonel Süreç Adımları ve Standart İş Akışı`,
      duration: '3 Saat',
      badge: 'Uygulamalı İş Akışı',
      description: `Adım adım ${prefix.toLowerCase()} süreçlerinin yürütülmesi, zaman optimizasyonu, doğru tekniklerin saha üzerinde uygulanması ve iş akış kılavuzlarının disiplinle takibi.`,
      subTopics: [
        'Süreç Öncesi Hazırlık ve Ekipman/Malzeme Kontrolü',
        'Standart İş Adımlarının Sırasıyla Uygulanması',
        'Operasyonel Hataları Önleyici Kritik Kontrol Noktaları',
        'Kalite Standartlarına Uygun Hizmet ve Teşhir Hazırlığı'
      ],
      keySkill: 'Standart Süreç Yürütme & Operasyon Hızı'
    },
    {
      id: 3,
      title: `Stok Devir Hızı, Kalite Kontrol & Fire/Zayi Önleme Disiplini`,
      duration: '3 Saat',
      badge: 'Maliyet & Fire Kontrolü',
      description: `Stok yönetimi, FIFO (İlk Giren İlk Çıkar) kuralı, son kullanma tarihi takibi, ürün muhafaza şartları ve fire/kayıp oranlarını en aza indirme teknikleri.`,
      subTopics: [
        'FIFO / FEFO Mantığı ve Depo/Reyon Stok Rotasyonu',
        'Ürün Saklama Koşulları, Isı/Nem Sensör Takip Protokolleri',
        'Hasar, Kullanım Dışı ve Zayi Ürün Ayrıştırma Prosedürü',
        'Fire Analiz Raporlaması ve Önleyici Tedbirler'
      ],
      keySkill: 'Fire Minimizasyonu & Envanter Emniyeti'
    },
    {
      id: 4,
      title: `Saha Uygulamaları, Ekip İçi İletişim & Vardiya Koordinasyonu`,
      duration: '2 Saat',
      badge: 'Ekip Çalışması & İletişim',
      description: `Vardiya devir teslim süreçleri, mağaza içi ekipler arası efektif iletişim, görev dağılımlarının pürüzsüz yürütülmesi ve bilgi akışının sağlanması.`,
      subTopics: [
        'Vardiya Devir-Teslim Formlarının Doldurulması ve Takibi',
        'Ekipler Arası Açık İletişim ve Geri Bildirim Kültürü',
        'Yoğun Saatlerde Esnek Görev Paylaşımı ve Yardımlaşma',
        'Saha Amirleri ve Yöneticilerle Raporlama Protokolleri'
      ],
      keySkill: 'Vardiya Koordinasyonu & Ekip İletişimi'
    },
    {
      id: 5,
      title: `KPI Hedefleme, Verimlilik Analizi & Zaman Yönetimi`,
      duration: '3 Saat',
      badge: 'KPI & Verimlilik',
      description: `Mağaza ve departman bazlı ciro, marj, müşteri memnuniyeti skoru (CSAT/NPS) ve verimlilik göstergelerinin okunması ve geliştirilmesi.`,
      subTopics: [
        'Departman Temel Performans Göstergelerinin (KPI) Analizi',
        'Birim Zaman Bazlı İş Çıktısı ve Verimlilik Artırma',
        'Müşteri Bekleme ve Hizmet Sürelerinin Optimizasyonu',
        'Kişisel Günlük İş Planı Hazırlama ve Önceliklendirme'
      ],
      keySkill: 'KPI Analitiği & Saha Verimliliği'
    },
    {
      id: 6,
      title: `Saha Zorlukları, Zor Müşteri Yönetimi & Kriz Çözümleri`,
      duration: '3 Saat',
      badge: 'Problem Çözme & Kriz',
      description: `Saha operasyonlarında karşılaşılan beklenmedik durumlar, müşteri şikayetleri, anlık arızalar ve kriz anlarında soğukkanlı yönetişim.`,
      subTopics: [
        'Şikayet Eden veya Öfkeli Müşteriyi Sakinleştirme Adımları',
        'Sistem ve Ekipman Arızalarında B Planı Uygulama',
        'İade, Değişim ve Anlaşmazlık Durumlarında Prosedür Yönetimi',
        'Vaka Analizleri Üzerinden Çözüm Simülasyonları'
      ],
      keySkill: 'Kriz Yönetimi & Müşteri Odaklı Çözüm'
    }
  ];
}

function getCourseBySlug(targetSlug: string): DetailedCourse {
  const normalizedTarget = targetSlug.toLowerCase().trim();

  // Search in DEPARTMENTS_DATA
  for (const dept of DEPARTMENTS_DATA) {
    // Check Year 1 Courses
    for (let idx = 0; idx < dept.year1Courses.length; idx++) {
      const cName = dept.year1Courses[idx];
      const cSlug = createSlug(cName);

      if (cSlug === normalizedTarget || normalizedTarget.includes(cSlug) || cSlug.includes(normalizedTarget)) {
        const related = dept.year1Courses
          .filter((_, i) => i !== idx)
          .slice(0, 3)
          .map((title) => ({ title, slug: createSlug(title) }));

        return {
          title: cName,
          category: dept.category === 'Genel Operasyon' ? 'Mağaza Yönetimi ve Operasyon' : dept.category,
          department: dept.name,
          deptId: dept.id,
          year: '1. Yıl',
          duration: 12 + idx * 4,
          purpose: `${cName} eğitiminin temel amacı, ${dept.name} kadrosunda görev yapan personelin ${cName.toLowerCase()} alanında mevzuata uygun, sıfır hata ve yüksek verimlilikle uzmanlaşmasını sağlamaktır.`,
          importance: `${cName} süreci, perakende mağaza operasyonunda fire minimizasyonu, reyon standartları ve yüksek müşteri memnuniyeti açısından doğrudan etkiye sahiptir.`,
          targetAudience: `Yeni işe başlayan ve kıdemli ${dept.name} kadroları, Mağaza Yöneticileri ve Saha Ekip Liderleri.`,
          modules: buildDetailedModules(cName, dept.name, false),
          outcomes: [
            `${cName} operasyonlarında %30'a varan verimlilik artışı.`,
            'Hata ve fire oranlarında %85 oranında azalma.',
            'Saha denetim ve KPI değerlendirme skorlarında yükseliş.'
          ],
          sampleApp: `Sanal Mağaza Simülatöründe ${cName} ile ilgili 10 farklı saha senaryosunu zaman sınırı dahilinde başarıyla tamamlamak.`,
          caseStudy: `Yoğun mağaza operasyonu sırasında ${cName} sürecinde karşılaşılan anlık problemin çözülmesi ve standartlara uygun sevk edilmesi vaka analizi.`,
          evaluationMethod: '%40 Teorik Test + %30 Saha Uygulama Simülasyonu + %30 Süpervizör Değerlendirmesi',
          examInfo: `Eğitim sonunda %80 ve üzeri başarı sağlayan katılımcılara QR Doğrulamalı Perakende ${dept.name} Yetkinlik Sertifikası verilir.`,
          relatedCourses: related.length > 0 ? related : [
            { title: 'Perakendecilik 101 & Sektör Mantığı', slug: 'perakendecilik-101' },
            { title: 'Verimlilik & Zaman Yönetimi', slug: 'verimlilik-zaman-yonetimi' }
          ]
        };
      }
    }

    // Check Year 2 Courses
    for (let idx = 0; idx < dept.year2Courses.length; idx++) {
      const cName = dept.year2Courses[idx];
      const cSlug = createSlug(cName);

      if (cSlug === normalizedTarget || normalizedTarget.includes(cSlug) || cSlug.includes(normalizedTarget)) {
        const related = dept.year2Courses
          .filter((_, i) => i !== idx)
          .slice(0, 3)
          .map((title) => ({ title, slug: createSlug(title) }));

        return {
          title: cName,
          category: dept.category === 'Genel Operasyon' ? 'Mağaza Yönetimi ve Operasyon' : dept.category,
          department: dept.name,
          deptId: dept.id,
          year: '2. Yıl',
          duration: 20 + idx * 6,
          purpose: `${cName} ileri seviye modülünün amacı, ${dept.name} kadrosundaki personelin stratejik yönetim, liderlik ve finansal KPI analizi yetkinliklerini üst seviyeye taşımaktır.`,
          importance: `${cName} ileri seviye uzmanlığı, mağaza kârlılığı, P&L optimizasyonu ve geleceğin yöneticilerini yetiştirme hedefleri için kritik rol oynar.`,
          targetAudience: `Kıdemli ${dept.name} çalışanları, Yönetici Adayları, Şefler ve Bölge Yöneticileri.`,
          modules: buildDetailedModules(cName, dept.name, true),
          outcomes: [
            'Bölgesel ve mağaza bazlı kârlılık oranlarında sürdürülebilir artış.',
            'Liderlik ve ekip yönetim yetkinliklerinde gözle görülür gelişim.',
            'Üst kademe yöneticiliğe geçiş hazırlığının tamamlanması.'
          ],
          sampleApp: `Gerçek mağaza verileriyle ${cName} senaryolarında maliyet analizi ve kar-zarar optimizasyon raporu hazırlamak.`,
          caseStudy: `Yıllık bütçe ve marj hedeflerini tutturmak için ${cName} stratejilerinin uygulanması ve yönetici kuruluna sunulması vaka analizi.`,
          evaluationMethod: '%40 İleri Seviye Bütçe/KPI Sınavı + %30 Vaka Analiz Sunumu + %30 Yönetici Onayı',
          examInfo: `Eğitim sonunda başarı sağlayan katılımcılara QR Doğrulamalı Perakende ${dept.name} İleri Seviye Sertifikası verilir.`,
          relatedCourses: related.length > 0 ? related : [
            { title: 'Stratejik Perakendecilik & Trendler', slug: 'stratejik-perakendecilik' },
            { title: 'Bütçe Planlama & Maliyet Kontrolü', slug: 'butce-planlama-maliyet' }
          ]
        };
      }
    }
  }

  // Fallback for any unknown slug
  const readableTitle = targetSlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: readableTitle || 'Perakende Yetkinlik Eğitimi',
    category: 'Mağaza Yönetimi ve Operasyon',
    department: 'Genel Perakendecilik',
    deptId: 'tum-calisanlar',
    year: '1. Yıl',
    duration: 16,
    purpose: `${readableTitle} eğitim modülü, perakende sektöründe profesyonel kariyer gelişimini desteklemek ve saha operasyonel standartlarını artırmak amacıyla hazırlanmıştır.`,
    importance: 'Bu eğitim, perakende zincir mağazalarında hizmet kalitesi, stok disiplini ve müşteri memnuniyeti standartlarını doğrudan yükseltmektedir.',
    targetAudience: 'Tüm perakende çalışanları, Mağaza Yöneticileri ve Kariyer Akademisi katılımcıları.',
    modules: buildDetailedModules(readableTitle, 'Genel Perakendecilik', false),
    outcomes: [
      'Saha operasyonlarında yüksek standart ve verimlilik.',
      'Müşteri memnuniyet skorlarında sürdürülebilir artış.',
      'Kişisel kariyer gelişim haritasında yetkinlik kazanımı.'
    ],
    sampleApp: `Saha simülatöründe ${readableTitle} başlığındaki 5 temel senaryonun başarıyla uygulamaya geçirilmesi.`,
    caseStudy: 'Mağaza içi günlük operasyonel süreçlerin vaka analizi yöntemiyle incelenmesi ve çözüm geliştirilmesi.',
    evaluationMethod: '%50 Teorik Sınav + %50 Saha Supervizör Değerlendirmesi',
    examInfo: 'Eğitim sonunda başarı sağlayan katılımcılara QR Doğrulamalı Perakende Yetkinlik Sertifikası verilir.',
    relatedCourses: [
      { title: 'Perakendecilik 101 & Sektör Mantığı', slug: 'perakendecilik-101' },
      { title: 'Müşteri Deneyimi & İletişim', slug: 'musteri-deneyimi-iletisim' },
      { title: 'Verimlilik & Zaman Yönetimi', slug: 'verimlilik-zaman-yonetimi' }
    ]
  };
}

export default async function EgitimDetayPage({ params }: PageProps) {
  const { slug } = await params;
  const courseData = getCourseBySlug(slug);

  // Compute sequential Prev / Next courses from ALL_FLAT_COURSES
  const currentSlug = createSlug(courseData.title);
  const currentIndex = ALL_FLAT_COURSES.findIndex(
    (c) => c.slug === currentSlug || c.slug === slug || slug.includes(c.slug)
  );

  const validIndex = currentIndex >= 0 ? currentIndex : 0;
  const prevCourse = validIndex > 0 ? ALL_FLAT_COURSES[validIndex - 1] : ALL_FLAT_COURSES[ALL_FLAT_COURSES.length - 1];
  const nextCourse = validIndex < ALL_FLAT_COURSES.length - 1 ? ALL_FLAT_COURSES[validIndex + 1] : ALL_FLAT_COURSES[0];

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Navigation Bar with Interactive Department Selector Dropdown */}
        <CourseDepartmentNav
          currentCourseTitle={courseData.title}
          departmentName={courseData.department}
          deptId={courseData.deptId}
          prevCourse={prevCourse}
          nextCourse={nextCourse}
        />

        {/* Hero Card Header */}
        <div className="bg-[#0B2A4A] text-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[#087F96]/30 relative overflow-hidden space-y-6">
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <span className="bg-[#087F96] text-white px-3 py-1 rounded-full uppercase">
              {courseData.category}
            </span>
            <span className="bg-[#DDF4F7] text-[#0B2A4A] px-3 py-1 rounded-full uppercase font-mono">
              Kariyer Yılı: {courseData.year}
            </span>
            <span className="bg-white/10 text-gray-200 px-3 py-1 rounded-full flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1 text-[#087F96]" />
              {courseData.duration} Saat Süre
            </span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl text-white leading-tight">
            {courseData.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-gray-300 font-medium">
            <div className="flex items-center space-x-1">
              <Building2 className="h-4 w-4 text-[#087F96]" />
              <span>Departman / Kadro: <strong className="text-white">{courseData.department}</strong></span>
            </div>
            <div className="flex items-center space-x-1">
              <Award className="h-4 w-4 text-[#34A853]" />
              <span>Sertifikasyon: <strong className="text-white">QR Kod Onaylı</strong></span>
            </div>
          </div>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Comprehensive Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Interactive Introductory Training Video Player */}
            <CourseVideoPlayer 
              courseTitle={courseData.title} 
              departmentName={courseData.department} 
            />

            {/* Purpose & Importance */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
              <div>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A] flex items-center space-x-2 mb-2">
                  <Target className="h-5 w-5 text-[#087F96]" />
                  <span>Eğitimin Amacı</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                  {courseData.purpose}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-display font-bold text-lg text-[#0B2A4A] flex items-center space-x-2 mb-2">
                  <HelpCircle className="h-5 w-5 text-[#087F96]" />
                  <span>Neden Önemli?</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                  {courseData.importance}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-display font-bold text-lg text-[#0B2A4A] flex items-center space-x-2 mb-2">
                  <Users className="h-5 w-5 text-[#087F96]" />
                  <span>Kimler Katılmalı?</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                  {courseData.targetAudience}
                </p>
              </div>
            </div>

            {/* EXPANDED SYLLABUS CONTENT MODULES */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#0B2A4A] flex items-center space-x-2">
                    <BookOpen className="h-6 w-6 text-[#087F96]" />
                    <span>Eğitim İçeriği Modülleri (Detaylı Müfredat)</span>
                  </h3>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Bu eğitim 6 ana modülden oluşmakta olup toplam {courseData.duration} saatlik pratik ve teorik içerik barındırmaktadır.
                  </p>
                </div>
                <span className="hidden sm:inline-block text-xs font-bold font-mono bg-[#DDF4F7] text-[#087F96] px-3 py-1 rounded-full border border-[#087F96]/20">
                  6 Modül • {courseData.duration} Saat
                </span>
              </div>

              {/* Detailed Module Cards List */}
              <div className="space-y-4 pt-1">
                {courseData.modules.map((mod) => (
                  <div 
                    key={mod.id} 
                    className="bg-[#F8FAFC] border border-gray-200 hover:border-[#087F96]/40 rounded-2xl p-5 sm:p-6 transition-all space-y-4 group shadow-xs hover:shadow-md"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/80 pb-3">
                      <div className="flex items-center space-x-3">
                        <span className="w-8 h-8 rounded-xl bg-[#087F96] text-white text-xs font-black flex items-center justify-center shrink-0 shadow-sm font-mono">
                          {mod.id}
                        </span>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F96] bg-[#DDF4F7] px-2.5 py-0.5 rounded-full inline-block mb-1">
                            {mod.badge}
                          </span>
                          <h4 className="font-display font-bold text-base text-[#0B2A4A] group-hover:text-[#087F96] transition-colors">
                            Modül {mod.id}: {mod.title}
                          </h4>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-gray-500 bg-white px-3 py-1 rounded-lg border border-gray-200 shrink-0 self-start sm:self-auto">
                        ⏱️ {mod.duration}
                      </span>
                    </div>

                    {/* Detailed Description */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light pl-1">
                      {mod.description}
                    </p>

                    {/* Sub-Topics List */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200/70 space-y-2">
                      <span className="text-[11px] font-bold text-[#0B2A4A] uppercase tracking-wider block flex items-center space-x-1">
                        <Layers className="h-3.5 w-3.5 text-[#087F96]" />
                        <span>Bu Modülde Öğrenilecek Detay Başlıklar ve Saha Adımları:</span>
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-gray-700">
                        {mod.subTopics.map((sub, sIdx) => (
                          <div key={sIdx} className="flex items-start space-x-2">
                            <Check className="h-3.5 w-3.5 text-[#34A853] shrink-0 mt-0.5 stroke-[3]" />
                            <span className="font-medium text-[11px] sm:text-xs">{sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Skill Badge */}
                    <div className="flex items-center justify-between text-xs pt-1 text-gray-500 border-t border-gray-100">
                      <span className="flex items-center space-x-1.5 text-[11px] font-semibold text-[#056B80]">
                        <Zap className="h-3.5 w-3.5 text-[#087F96]" />
                        <span>Kazanılacak Saha Yetkinliği: <strong>{mod.keySkill}</strong></span>
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 uppercase font-bold">
                        Modül {mod.id} / 6
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcomes & Application */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
              <div>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A] flex items-center space-x-2 mb-3">
                  <Sparkles className="h-5 w-5 text-[#34A853]" />
                  <span>Eğitim Çıktıları & Saha Katkısı</span>
                </h3>
                <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                  {courseData.outcomes.map((out, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-[#34A853] shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-display font-bold text-base text-[#0B2A4A] mb-1">Örnek Uygulama:</h3>
                <p className="text-xs text-gray-600 bg-[#DDF4F7]/50 p-3 rounded-lg font-mono">
                  {courseData.sampleApp}
                </p>
              </div>

              <div className="pt-2">
                <h3 className="font-display font-bold text-base text-[#0B2A4A] mb-1">Vaka Analizi (Case Study):</h3>
                <p className="text-xs text-gray-600 bg-[#F4F7F9] p-3 rounded-lg border border-gray-200">
                  {courseData.caseStudy}
                </p>
              </div>
            </div>

            {/* UNIFIED MEDIA & DOCUMENTS CARD (PDF, EXCEL, SLIDES, VISUALS) */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <span className="text-[10px] font-black text-white bg-[#E11D48] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Tek Kart Medya Kütüphanesi
                  </span>
                  <h3 className="font-display font-bold text-xl text-[#0B2A4A] mt-1 flex items-center space-x-2">
                    <FileText className="h-6 w-6 text-[#087F96]" />
                    <span>Dersin Tüm Yazılı, Görsel & Veri Dökümanları</span>
                  </h3>
                  <p className="text-xs text-gray-500 font-light mt-0.5">
                    Videolar, PDF çalışma rehberleri, Excel KPI şablonları, PowerPoint ders slaytları ve infografikler tek kartta:
                  </p>
                </div>
              </div>

              {/* Grid of 4 Document Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. PDF Handouts */}
                <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 flex items-center space-x-1">
                      <FileText className="w-4 h-4 text-amber-600" />
                      <span>📄 PDF Ders Rehberi & El Kitabı</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">2.4 MB</span>
                  </div>
                  <p className="text-xs text-gray-600 font-light">
                    Saha çalışanları için adım adım uygulama adımları, SOP kuralları ve kontrol listeleri.
                  </p>
                  <a
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(`${courseData.title} - Ders Rehberi ve Uygulama Kitapçığı\n\n1. Giriş ve SOP Standartları\n2. Saha Uygulama Kuralları\n3. Yangın ve Fire Önleme Kontrol Listesi`)}`}
                    download={`${createSlug(courseData.title)}_ders_rehberi.pdf`}
                    className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-lg text-xs transition-colors flex items-center justify-center space-x-1 shadow-xs"
                  >
                    <span>PDF İndir (.PDF)</span>
                  </a>
                </div>

                {/* 2. Excel KPI Spreadsheets */}
                <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 flex items-center space-x-1">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span>📊 Excel KPI & Hesaplama Tablosu</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">1.8 MB</span>
                  </div>
                  <p className="text-xs text-gray-600 font-light">
                    Mağaza fire hesabı, GMROI stok getirisi ve sepet ikraz oranları otomatik Excel şablonu.
                  </p>
                  <a
                    href={`data:application/vnd.ms-excel;charset=utf-8,${encodeURIComponent(`SKU\tMetrik\tDeğer\nSKU-101\tFire Oranı Target\t%1.4\nSKU-202\tKasa İşlem Hızı\t3.5 İşlem/Dk\nSKU-303\tSepet Ortalaması\t₺485.00`)}`}
                    download={`${createSlug(courseData.title)}_kpi_hesaplama.xlsx`}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-lg text-xs transition-colors flex items-center justify-center space-x-1 shadow-xs"
                  >
                    <span>Excel İndir (.XLSX)</span>
                  </a>
                </div>

                {/* 3. PowerPoint Slides */}
                <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-900 flex items-center space-x-1">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <span>📊 PowerPoint Ders Slaytları</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">8.5 MB</span>
                  </div>
                  <p className="text-xs text-gray-600 font-light">
                    Eğitmen tarafından anlatılan 35 slaytlık interaktif ders sunumu ve grafik materyalleri.
                  </p>
                  <a
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(`${courseData.title} - 35 Slayt Ders Sunumu`)}`}
                    download={`${createSlug(courseData.title)}_ders_slaytlari.pptx`}
                    className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white font-extrabold rounded-lg text-xs transition-colors flex items-center justify-center space-x-1 shadow-xs"
                  >
                    <span>Slayt İndir (.PPTX)</span>
                  </a>
                </div>

                {/* 4. Visual Infographic & Diagram */}
                <div className="p-4 bg-cyan-50/60 border border-cyan-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-900 flex items-center space-x-1">
                      <FileText className="w-4 h-4 text-cyan-600" />
                      <span>🖼️ Reyon & Saha İnfografik Şeması</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded">1080p HD</span>
                  </div>
                  <p className="text-xs text-gray-600 font-light">
                    Reyon ve panolara asılmak üzere tasarlanmış yüksek çözünürlüklü görsel rehber şeması.
                  </p>
                  <a
                    href={`/images/corp/service_1.jpg`}
                    download={`${createSlug(courseData.title)}_infografik.jpg`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-lg text-xs transition-colors flex items-center justify-center space-x-1 shadow-xs"
                  >
                    <span>Görsel İndir (.JPG)</span>
                  </a>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: CTA & Assessment */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#087F96]/30 space-y-6 sticky top-24">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-[#087F96] uppercase">Eğitime Eriş</span>
                <h3 className="font-display font-extrabold text-xl text-[#0B2A4A]">Dijital Öğrenme</h3>
              </div>

              <Link
                href="/panel"
                className="w-full py-4 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-sm"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>Eğitime Başla</span>
              </Link>

              <div className="border-t border-gray-100 pt-4 space-y-3 text-xs text-gray-600">
                <div>
                  <strong className="block text-[#0B2A4A]">Değerlendirme Yöntemi:</strong>
                  <span className="text-gray-500">{courseData.evaluationMethod}</span>
                </div>
                <div>
                  <strong className="block text-[#0B2A4A]">Sınav & Sertifika:</strong>
                  <span className="text-gray-500">{courseData.examInfo}</span>
                </div>
              </div>
            </div>

            {/* Related Courses */}
            <div className="bg-[#061B33] text-white rounded-2xl p-6 shadow-sm space-y-4">
              <h4 className="font-display font-bold text-sm text-[#DDF4F7] uppercase">İlgili Diğer Eğitimler</h4>
              <div className="space-y-2.5">
                {courseData.relatedCourses.map((rel, i) => (
                  <Link key={i} href={`/egitim/${rel.slug}`} className="block p-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-gray-200 transition-colors">
                    • {rel.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SEQUENTIAL NAVIGATION FOOTER CARD */}
        <div className="pt-6 border-t border-gray-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full uppercase tracking-wider">
                Sıralı Öğrenme Yolculuğu
              </span>
              <h3 className="font-display font-extrabold text-xl text-[#0B2A4A]">
                Eğitimler Arası Gezinme
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Previous Course Card */}
              <Link
                href={`/egitim/${prevCourse.slug}`}
                className="bg-[#F8FAFC] hover:bg-[#DDF4F7]/30 border border-gray-200 hover:border-[#087F96] p-5 rounded-2xl transition-all group flex items-center justify-between"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#087F96] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-[#087F96] uppercase tracking-wider block">
                      ← ÖNCEKİ EĞİTİM ({prevCourse.department})
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#0B2A4A] group-hover:text-[#087F96] transition-colors leading-tight mt-0.5">
                      {prevCourse.title}
                    </h4>
                  </div>
                </div>
              </Link>

              {/* Next Course Card */}
              <Link
                href={`/egitim/${nextCourse.slug}`}
                className="bg-[#F8FAFC] hover:bg-[#DDF4F7]/30 border border-gray-200 hover:border-[#087F96] p-5 rounded-2xl transition-all group flex items-center justify-between text-right"
              >
                <div className="flex items-center justify-end space-x-3.5 w-full">
                  <div>
                    <span className="text-[10px] font-extrabold text-[#087F96] uppercase tracking-wider block">
                      SONRAKİ EĞİTİM ({nextCourse.department}) →
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#0B2A4A] group-hover:text-[#087F96] transition-colors leading-tight mt-0.5">
                      {nextCourse.title}
                    </h4>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-[#087F96] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    <ArrowRight className="h-5 w-5 stroke-[2.5]" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Dynamic Department Catalog Filter Link */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href={`/egitimler?dept=${encodeURIComponent(courseData.deptId || courseData.department)}`}
                className="inline-flex items-center space-x-2 text-xs font-extrabold text-white bg-[#087F96] hover:bg-[#056B80] px-6 py-3 rounded-xl shadow-md transition-all"
              >
                <LayoutGrid className="h-4 w-4" />
                <span>🎯 {courseData.department} Kadrosunun Tüm Eğitim Kataloğunu Gör</span>
              </Link>

              <Link
                href="/egitimler"
                className="inline-flex items-center space-x-2 text-xs font-bold text-[#0B2A4A] hover:text-[#087F96] bg-[#F4F7F9] hover:bg-[#DDF4F7] px-5 py-3 rounded-xl border border-gray-200 transition-all shadow-xs"
              >
                <ArrowLeft className="h-4 w-4 text-[#087F96]" />
                <span>📋 Ana Eğitim Kataloğuna Dön (Tüm 26 Kadro • {ALL_FLAT_COURSES.length} Eğitim)</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
