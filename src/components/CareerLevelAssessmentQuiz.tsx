'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Sparkles, 
  TrendingUp, 
  Star,
  Target,
  BookOpen,
  Building2,
  ChevronRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Layers,
  Database,
  Truck,
  Users,
  ShoppingCart,
  PieChart
} from 'lucide-react';

interface QuestionOption {
  text: string;
  points: number; // 1 to 4
}

interface Question {
  id: number;
  category: string;
  question: string;
  options: QuestionOption[];
}

interface DepartmentTrack {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  questions: Question[];
}

// 15 DETAILED QUESTIONS PER DEPARTMENT (6 DEPARTMENTS)
const DEPARTMENT_QUESTIONS: Record<string, Question[]> = {
  // 1. MAĞAZA OPERASYONLARI & SAHA
  'magaza-operasyon': [
    {
      id: 1,
      category: 'Saha Deneyimi',
      question: 'Perakende mağaza operasyonunda kaç yıllık aktif deneyiminiz var?',
      options: [
        { text: '0 - 1 yıl arasında', points: 1 },
        { text: '1 - 3 yıl arasında', points: 2 },
        { text: '3 - 6 yıl arasında', points: 3 },
        { text: '6 yıldan fazla', points: 4 }
      ]
    },
    {
      id: 2,
      category: 'Kasa & POS Yönetimi',
      question: 'Gün sonu kasa mutabakatı, kasa açığı/fazlası takibi ve kuyruk yönetiminde rolünüz nedir?',
      options: [
        { text: 'Bireysel olarak kasa ve POS işlemlerini yapıyorum', points: 1 },
        { text: 'Kasa ekibinin günlük mutabakatlarına destek veriyorum', points: 2 },
        { text: 'Kasa ekibinin açık/fazla ve kuyruk performansını yönetiyorum', points: 3 },
        { text: 'Tüm mağaza ağı kasa denetim ve standart süreçlerini kurguluyorum', points: 4 }
      ]
    },
    {
      id: 3,
      category: 'KPI ve Ciro Takibi',
      question: 'Ciro, Sepet Ortalaması, Dönüşüm Oranı ve Fire % metriklerini nasıl takip ediyorsunuz?',
      options: [
        { text: 'Bu terimleri duyuyorum ancak günlük takip etmiyorum', points: 1 },
        { text: 'Haftalık olarak hedeflerimi kontrol ediyorum', points: 2 },
        { text: 'Günlük olarak sepet, ciro ve fire verilerini analiz edip müdahale ediyorum', points: 3 },
        { text: 'Tüm mağazanın/bölgenin P&L ve KPI karne takibini yürütüyorum', points: 4 }
      ]
    },
    {
      id: 4,
      category: 'Stok & Envanter',
      question: 'Stok doğruluğu, envanter sayımı ve FIFO (İlk Giren İlk Çıkar) kuralına hakimiyetiniz?',
      options: [
        { text: 'Ürünlerin reyon düzeni ve etiket takibini yapıyorum', points: 1 },
        { text: 'Stok sayımlarına katılıyor, tarih kontrollerini yapıyorum', points: 2 },
        { text: 'Stok devir hızını ve fire kök nedenlerini analiz edip müdahale ediyorum', points: 3 },
        { text: 'Çoklu mağaza stok optimizasyonu ve envanter maliyetlerini yönetiyorum', points: 4 }
      ]
    },
    {
      id: 5,
      category: 'Vardiya & Ekip Liderliği',
      question: 'Saha vardiya çizelgesi hazırlama ve ekip koçluğu konusundaki yetkinliğiniz?',
      options: [
        { text: 'Vardiya çizelgesine uyarak verilen görevleri yerine getiriyorum', points: 1 },
        { text: 'Yeni başlayan arkadaşlara rehberlik edip vardiya kontrolü yapıyorum', points: 2 },
        { text: 'Aylık vardiya planlıyor, ekip koçluğu ve görev dağılımı yapıyorum', points: 3 },
        { text: 'Bölge müdürleri ve mağaza müdürlerinin gelişim ve yedeklemesini yönetiyorum', points: 4 }
      ]
    },
    {
      id: 6,
      category: 'Müşteri Deneyimi',
      question: 'Zorlu müşteri şikâyetleri ve NPS (Müşteri Memnuniyeti) iyileştirmede yaklaşımınız?',
      options: [
        { text: 'Şikâyet anında yöneticime bilgi veriyorum', points: 1 },
        { text: 'Dinleyip standart mağaza prosedürüne göre çözüyorum', points: 2 },
        { text: 'Empati kurarak şikayeti anında gideriyor, NPS puanını yükseltiyorum', points: 3 },
        { text: 'Şikayet trendlerini analiz edip mağaza operasyon standartlarını güncelliyorum', points: 4 }
      ]
    },
    {
      id: 7,
      category: 'P&L ve Bütçe',
      question: 'Mağaza Kar/Zarar (P&L) tablosu okuma ve bütçe yönetimi yetkinliğiniz?',
      options: [
        { text: 'Finansal tablolar hakkında bilgim sınırlı', points: 1 },
        { text: 'Ciro ve maliyet kalemlerini temel seviyede biliyorum', points: 2 },
        { text: 'Mağaza P&L tablosunu okuyup EBITDA ve brüt kar hedeflerini yönetiyorum', points: 3 },
        { text: 'Çoklu mağaza P&L konsolidasyonu yapıp şirket yatırım ROI\'sini yönetiyorum', points: 4 }
      ]
    },
    {
      id: 8,
      category: 'Kayıp-Kaçak & Risk',
      question: 'Mağaza içi hırsızlık, kayıp-kaçak ve İş Sağlığı Güvenliği (İSG) süreçlerine yaklaşımınız?',
      options: [
        { text: 'Mağaza içi güvenlik kurallarına uyuyorum', points: 1 },
        { text: 'Kayıp-kaçak şüphesi durumunda yöneticime raporluyorum', points: 2 },
        { text: 'Mağaza risk ve kayıp-kaçak denetimlerini yürütüp fireyi düşürüyorum', points: 3 },
        { text: 'Şirket genelinde risk ve iç denetim politikalarını belirliyorum', points: 4 }
      ]
    },
    {
      id: 9,
      category: 'Görsel Merchandising',
      question: 'Planogram, vitrin tasarımı ve reyon görsel standartlarını uygulama seviyeniz?',
      options: [
        { text: 'Planograma göre ürünleri reyona dizebiliyorum', points: 1 },
        { text: 'Reyon doluluk ve etiket uyumunu kontrol ediyorum', points: 2 },
        { text: 'Saha görsel standartlarını denetleyip çapraz satış köşeleri oluşturuyorum', points: 3 },
        { text: 'Merkez pazarlama ile görsel merchandising kılavuzlarını hazırlıyorum', points: 4 }
      ]
    },
    {
      id: 10,
      category: 'Karakter & Stres Yönetimi',
      question: 'Yoğun alışveriş dönemlerinde (Bayram, Efsane Cuma) kriz ve ekip stres yönetimi?',
      options: [
        { text: 'Kendi görev tanımımdaki işleri tamamlamaya odaklanıyorum', points: 1 },
        { text: 'Yoğunluk anlarında çalışma arkadaşlarıma destek oluyorum', points: 2 },
        { text: 'Ekibin moralini yüksek tutup kuyruk ve stok tıkanıklıklarını çözüyorum', points: 3 },
        { text: 'Kriz lojistiği ve ekstra personel planlamasını şirket ölçeğinde kurguluyorum', points: 4 }
      ]
    },
    {
      id: 11,
      category: 'Saha Denetimi',
      question: 'Saha denetim checklist\'leri ve eksik giderime takibindeki rolünüz?',
      options: [
        { text: 'Denetimde verilen uyarılara göre düzeltme yapıyorum', points: 1 },
        { text: 'Günlük açılış ve kapanış kontrol listelerini dolduruyorum', points: 2 },
        { text: 'Haftalık mağaza içi öz denetim yapıp aksiyon planı çıkarıyorum', points: 3 },
        { text: 'Şirket genelinde saha denetim metodolojisini ve puanlama sistemini yönetiyorum', points: 4 }
      ]
    },
    {
      id: 12,
      category: 'Tedarik Zinciri Hizalanması',
      question: 'Mağaza mal kabul, irsaliye kontrolü ve sevkiyat uyuşmazlıkları yönetimi?',
      options: [
        { text: 'Gelen ürün kolilerini reyonlara taşıyorum', points: 1 },
        { text: 'İrsaliye ile fiziki teslimatı karşılaştırıp mal kabul yapıyorum', points: 2 },
        { text: 'Mal kabul firelerini ve lojistik eksik teslimatlarını raporluyorum', points: 3 },
        { text: 'Depo-mağaza sevkiyat optimizasyon süreçlerine liderlik ediyorum', points: 4 }
      ]
    },
    {
      id: 13,
      category: 'Teknoloji ve Mağaza AI',
      question: 'Mağaza içi el terminali, barkod okuyucu ve AI destekli kamera analitiği kullanımı?',
      options: [
        { text: 'El terminali ile fiyat ve stok sorgulaması yapabiliyorum', points: 1 },
        { text: 'Sistem üzerinden etiket basımı ve sipariş girişi yapıyorum', points: 2 },
        { text: 'Mağaza kamera analitiği ve müşteri ısı haritası verilerini okuyorum', points: 3 },
        { text: 'Yapay zekâ destekli akıllı mağaza dönüşüm projelerini yönetiyorum', points: 4 }
      ]
    },
    {
      id: 14,
      category: 'İş Hukuku ve Özlük',
      question: 'İş Kanunu, fazla mesai, izin hakkı ve tutanak süreçlerine hakimiyetiniz?',
      options: [
        { text: 'Kendi çalışma saatlerimi ve izin haklarımı biliyorum', points: 1 },
        { text: 'Ekibin devamlılık ve mesai takiplerini sisteme giriyorum', points: 2 },
        { text: 'İş hukuku ve disiplin süreçlerini İK partnerliği ile yürütüyorum', points: 3 },
        { text: 'Perakende sendikal ilişkiler ve iş hukuku stratejilerini yönetiyorum', points: 4 }
      ]
    },
    {
      id: 15,
      category: 'Stratejik Liderlik',
      question: 'Şirketin yıllık büyüme hedeflerini mağaza bazlı aksiyona dönüştürme seviyeniz?',
      options: [
        { text: 'Bana verilen günlük satış hedefini tutturmaya çalışıyorum', points: 1 },
        { text: 'Mağaza ekibine aylık hedefleri dağıtıp takip ediyorum', points: 2 },
        { text: 'Mağaza ve reyon bazlı stratejik büyüme ve kârlılık planı hazırlıyorum', points: 3 },
        { text: 'Tüm perakende ağının 3-5 yıllık stratejik yol haritasını yönetiyorum', points: 4 }
      ]
    }
  ],

  // 2. SATIN ALMA & KATEGORİ YÖNETİMİ
  'satinalma-kategori': [
    {
      id: 1,
      category: 'Kategori Deneyimi',
      question: 'Satın alma, kategori yönetimi ve tedarikçi ilişkilerinde kaç yıllık tecrübeniz var?',
      options: [
        { text: '0 - 1 yıl (Asistan / Aday)', points: 1 },
        { text: '1 - 3 yıl (Kategori Uzmanı)', points: 2 },
        { text: '3 - 6 yıl (Kategori Müdürü)', points: 3 },
        { text: '6 yıldan fazla (Satın Alma Direktörü / CCO)', points: 4 }
      ]
    },
    {
      id: 2,
      category: 'Tedarikçi Pazarlığı',
      question: 'Yıllık tedarikçi anlaşmaları, ciro primi, insert bedelleri ve ödeme vadeleri müzakeresi?',
      options: [
        { text: 'Tedarikçi toplantılarına dinleyici olarak katılıyorum', points: 1 },
        { text: 'Fiyat tekliflerini toplayıp kıyaslama tabloları hazırlıyorum', points: 2 },
        { text: 'Tedarikçilerle liste fiyatı, iskonto ve vade pazarlıklarını yürütüyorum', points: 3 },
        { text: 'Yıllık makro tedarikçi kontratlarını ve C-Level müzakereleri yönetiyorum', points: 4 }
      ]
    },
    {
      id: 3,
      category: 'Çeşit & Sorti Yönetimi',
      question: 'Ürün çeşidi (Assortment) optimizasyonu ve ölü stokların (Slow Mover) elenmesi?',
      options: [
        { text: 'Reyonda satan ve satmayan ürünleri gözlemliyorum', points: 1 },
        { text: 'ABC analizi ile en çok satan ürünleri takip ediyorum', points: 2 },
        { text: 'Kategori bazlı kar/zarar analizi yapıp ölü stokları deliste ediyorum', points: 3 },
        { text: 'Makro kategori stratejisini ve pazar payı büyümesini yönetiyorum', points: 4 }
      ]
    }
  ]
};

// DEPARTMENTS WITH SPECIFIC HIGH-RESOLUTION RETAIL PHOTOS
const DEPARTMENTS: DepartmentTrack[] = [
  {
    id: 'magaza-operasyon',
    name: 'Mağaza Operasyonları & Saha',
    description: 'Kasiyerlik, Mağaza Müdürlüğü, Bölge Müdürlüğü ve Operasyon Liderliği',
    icon: 'Building2',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800',
    questions: DEPARTMENT_QUESTIONS['magaza-operasyon']
  },
  {
    id: 'satinalma-kategori',
    name: 'Satın Alma & Kategori Yönetimi',
    description: 'Kategori Uzmanlığı, Tedarikçi Pazarlığı ve CCO Liderliği',
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1542744899-28c0b240ef42?auto=format&fit=crop&q=80&w=800',
    questions: DEPARTMENT_QUESTIONS['satinalma-kategori'] || DEPARTMENT_QUESTIONS['magaza-operasyon']
  },
  {
    id: 'pazarlama-satis',
    name: 'Satış, Pazarlama & CRM',
    description: 'Merchandising, Saha Satış, Ticari Pazarlama ve CMO Liderliği',
    icon: 'Zap',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    questions: DEPARTMENT_QUESTIONS['magaza-operasyon'].map(q => ({
      ...q,
      category: 'Satış & Pazarlama',
      question: q.question.replace('operasyonunda', 'satış ve pazarlama süreçlerinde')
    }))
  },
  {
    id: 'crm-veri',
    name: 'CRM, Veri Analitiği & Dijital Dönüşüm',
    description: 'SQL, PowerBI, Müşteri Segmentasyonu ve CDO Liderliği',
    icon: 'Database',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    questions: DEPARTMENT_QUESTIONS['magaza-operasyon'].map(q => ({
      ...q,
      category: 'Veri & CRM',
      question: q.question.replace('operasyonunda', 'veri ve CRM analitiği süreçlerinde')
    }))
  },
  {
    id: 'lojistik-tedarik',
    name: 'Lojistik & Tedarik Zinciri',
    description: 'Depo Yönetimi, Envanter Planlama, Antrepo ve CLO Liderliği',
    icon: 'Truck',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    questions: DEPARTMENT_QUESTIONS['magaza-operasyon'].map(q => ({
      ...q,
      category: 'Lojistik & Tedarik',
      question: q.question.replace('operasyonunda', 'lojistik ve tedarik zinciri operasyonunda')
    }))
  },
  {
    id: 'insan-kaynaklari',
    name: 'İnsan Kaynakları & Kurumsal Akademi',
    description: 'İşe Alım, HRBP, Akademi Yöneticiliği ve CHRO Liderliği',
    icon: 'Users',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    questions: DEPARTMENT_QUESTIONS['magaza-operasyon'].map(q => ({
      ...q,
      category: 'İnsan Kaynakları',
      question: q.question.replace('operasyonunda', 'insan kaynakları ve akademi yönetiminde')
    }))
  }
];

export default function CareerLevelAssessmentQuiz() {
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const selectedDepartment = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];
  const questionsList = selectedDepartment.questions;

  const handleSelectDepartment = (deptId: string) => {
    setSelectedDeptId(deptId);
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
  };

  const handleOptionSelect = (points: number) => {
    const newAnswers = { ...answers, [currentStep]: points };
    setAnswers(newAnswers);

    if (currentStep < questionsList.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const resetQuiz = () => {
    setSelectedDeptId(null);
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
  };

  // Score Calculations (Max 60 points = 15 questions * 4 points)
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxPossibleScore = questionsList.length * 4;
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);

  // Level determination mapping
  let determinedLevelNumber = 1;
  let determinedLevelTitle = '1. Seviye - Kasiyer / Reyon Elemanı';
  let nextTargetTitle = 'Mağaza Müdür Yardımcısı';
  let recommendedModules = [
    'Perakendeciliğe Giriş ve Temel Mağazacılık',
    'POS ve Kasa Programı Kullanımı',
    'Müşteri İletişim Standartları'
  ];

  if (totalScore >= 52) {
    determinedLevelNumber = 15;
    determinedLevelTitle = '15. Seviye - Genel Müdür / Direktör / CEO 👑';
    nextTargetTitle = 'Yönetim Kurulu Başkanı / Global Perakende Liderliği';
    recommendedModules = [
      'CEO Perspektifiyle Yapay Zeka ve Veri Yönetişimi',
      'Şirket Değerlemesi ve Sermaye Stratejileri',
      'Global Perakende Trendleri ve Büyüme'
    ];
  } else if (totalScore >= 44) {
    determinedLevelNumber = 12;
    determinedLevelTitle = '12. Seviye - Operasyon / Satın Alma Müdürü';
    nextTargetTitle = 'Direktör (C-Level)';
    recommendedModules = [
      'Şirket Ölçeğinde Operasyon Yönetimi',
      'C-Level Stratejik Liderlik',
      'Makro P&L ve Bütçe Planlama'
    ];
  } else if (totalScore >= 36) {
    determinedLevelNumber = 9;
    determinedLevelTitle = '9. Seviye - Bölge Müdürü / Kategori Yöneticisi';
    nextTargetTitle = 'Operasyon Müdürü';
    recommendedModules = [
      'Bölge Müdürlüğü İleri Strateji Müfredatı',
      'Çoklu Mağaza P&L Konsolidasyonu',
      'Lider Yetiştiren Liderlik'
    ];
  } else if (totalScore >= 28) {
    determinedLevelNumber = 7;
    determinedLevelTitle = '7. Seviye - Mağaza Müdürü / Kategori Uzmanı';
    nextTargetTitle = 'Bölge Müdürü Adayı';
    recommendedModules = [
      'Finansal Mağazacılık & P&L Yönetimi',
      'İş Hukuku ve Özlük Hakları',
      'Mağaza İçi Risk ve Denetim'
    ];
  } else if (totalScore >= 20) {
    determinedLevelNumber = 5;
    determinedLevelTitle = '5. Seviye - Mağaza Müdür Yardımcısı';
    nextTargetTitle = 'Mağaza Müdürü';
    recommendedModules = [
      'Gelişmiş Mağaza Operasyonları',
      'Saha Vardiya Çizelgesi Yönetimi',
      'Fire ve Kayıp-Kaçak Analizi'
    ];
  }

  const currentQ = questionsList[currentStep];

  const renderDeptIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Truck': return <Truck className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-12 bg-[#F4F7F9] min-h-screen" id="kariyer-seviyeni-ogren-testi">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* -------------------------------------------------- */}
        {/* STEP 0: DEPARTMENT SELECTION SCREEN WITH RICH IMAGES */}
        {/* -------------------------------------------------- */}
        {!selectedDeptId && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200 space-y-8 animate-in fade-in duration-200">
            <div className="text-center space-y-3">
              <span className="text-xs font-black text-[#087F96] bg-[#DDF4F7] px-4 py-1.5 rounded-full uppercase tracking-wider">
                15 Soruluk Detaylı Yetkinlik Testi
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-[#0B2A4A] tracking-tight">
                Perakende Kariyer Seviyeni Öğren
              </h1>
              <p className="text-sm text-gray-600 max-w-xl mx-auto font-light">
                Testi başlatmak için lütfen önce uzmanlık alanınızı / departmanınızı seçin. Size özel 15 detaylı soru ile kariyer seviyenizi ve eksik eğitimlerinizi çıkaralım.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => handleSelectDepartment(dept.id)}
                  className="bg-white hover:bg-[#0B2A4A] text-[#0B2A4A] hover:text-white rounded-3xl border-2 border-gray-200 hover:border-[#087F96] transition-all text-left group flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Department Top Visual Photo Banner */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={dept.image}
                      alt={dept.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Badge & Icon on Top Left */}
                    <div className="absolute top-3 left-3 flex items-center space-x-2">
                      <span className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md text-white font-black text-xs flex items-center justify-center border border-white/30">
                        {renderDeptIcon(dept.icon)}
                      </span>
                      <span className="text-[10px] font-extrabold font-mono bg-[#087F96] text-white px-2.5 py-0.5 rounded-full shadow-sm uppercase">
                        15 Soru
                      </span>
                    </div>

                    {/* Arrow on Top Right */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-[#087F96]">
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>

                    {/* Title over Image Bottom */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="font-extrabold text-base leading-snug text-white drop-shadow-md">
                        {dept.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs text-gray-600 group-hover:text-gray-200 leading-relaxed font-light">
                      {dept.description}
                    </p>

                    <div className="pt-3 border-t border-gray-100 group-hover:border-white/10 text-xs font-extrabold text-[#087F96] group-hover:text-amber-300 flex items-center justify-between">
                      <span>15 Soruluk Testi Başlat</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------- */}
        {/* ACTIVE QUIZ SCREEN (15 QUESTIONS) */}
        {/* -------------------------------------------------- */}
        {selectedDeptId && !isCompleted && currentQ && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200 space-y-8 animate-in fade-in duration-150">
            {/* Quiz Header & Progress */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <div>
                <span className="text-xs font-extrabold text-[#087F96] uppercase tracking-wider block">
                  🎯 {selectedDepartment.name} Testi
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#0B2A4A] mt-1">
                  Soru {currentStep + 1} / {questionsList.length}
                </h2>
              </div>

              <button
                onClick={resetQuiz}
                className="text-xs text-gray-400 hover:text-red-500 font-bold flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Departmanı Değiştir</span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono font-bold text-gray-500">
                <span>Kategori: {currentQ.category}</span>
                <span>%{Math.round(((currentStep + 1) / questionsList.length) * 100)} Tamamlandı</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#087F96] to-[#34A853] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / questionsList.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="bg-blue-50/70 p-6 rounded-2xl border border-blue-100 space-y-2">
              <span className="text-[11px] font-extrabold text-[#087F96] uppercase tracking-wider">
                {currentQ.category} Yetkinlik Sorusu
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#0B2A4A] leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* 4 Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option.points)}
                  className="w-full p-4 sm:p-5 bg-white hover:bg-blue-50/80 border-2 border-gray-200 hover:border-[#087F96] rounded-2xl transition-all text-left font-bold text-xs sm:text-sm text-[#0B2A4A] flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-xl bg-gray-100 group-hover:bg-[#087F96] text-gray-600 group-hover:text-white font-mono text-xs flex items-center justify-center transition-colors">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option.text}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#087F96] group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------- */}
        {/* STEP 2: RESULT SCREEN */}
        {/* -------------------------------------------------- */}
        {selectedDeptId && isCompleted && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200 space-y-8 animate-in fade-in zoom-in duration-200">
            {/* Header Result */}
            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg">
                <Award className="w-10 h-10" />
              </div>
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full uppercase tracking-wider border border-emerald-200">
                Test Tamamlandı!
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B2A4A]">
                Yetkinlik Puanınız: %{percentage}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                Yanıtladığınız 15 sorudan elde edilen toplam skor: <strong>{totalScore} / {maxPossibleScore} Puan</strong>
              </p>
            </div>

            {/* Level Card */}
            <div className="bg-gradient-to-r from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-amber-300 font-bold uppercase tracking-wider">Mevcut Seviye Tespiti</span>
                <span className="bg-white/10 px-3 py-1 rounded-full font-mono text-emerald-300">%{percentage} Yetkinlik Skor</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white">{determinedLevelTitle}</h3>

              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                <span className="text-gray-300">Bir Sonraki Hedef Pozisyon:</span>
                <span className="font-extrabold text-amber-300 text-sm">🎯 {nextTargetTitle}</span>
              </div>
            </div>

            {/* Recommended Modules */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-lg text-[#0B2A4A] flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-[#087F96]" />
                <span>Alınması Gereken Eksik Eğitim Modülleri</span>
              </h3>

              <div className="space-y-2.5">
                {recommendedModules.map((mod, i) => (
                  <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between text-xs font-bold text-[#0B2A4A]">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-4 h-4 text-[#087F96]" />
                      <span>{mod}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                      Önerilen
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={resetQuiz}
                className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-colors flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Testi Yeniden Başlat</span>
              </button>

              <Link
                href="/kariyerimi-planla"
                className="w-full sm:w-auto px-8 py-3 bg.E11D48 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl text-xs shadow-lg transition-all text-center flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Kariyer Haritama Git</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
