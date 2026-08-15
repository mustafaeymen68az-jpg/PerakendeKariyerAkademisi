'use client';

import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  Target, 
  BarChart3,
  FileText,
  Search,
  Zap,
  ArrowRight,
  UserCheck,
  BrainCircuit,
  Compass,
  BookOpen,
  GraduationCap,
  Calendar,
  Clock,
  MessageSquare,
  Star,
  User,
  Send,
  Check
} from 'lucide-react';

export interface CompletedTrainingRecord {
  courseTitle: string;
  duration: string;
  completedDate: string;
  score: number;
  gradeStatus: 'Üstün Başarı' | 'Pek İyi' | 'Başarılı';
  certificateId: string;
}

export interface EvaluationItem {
  author: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}

export interface EmployeeEvaluations {
  managerReview: EvaluationItem;
  subordinateReview: EvaluationItem;
  hrReview: EvaluationItem;
}

export interface EmployeeCareerRecord {
  id: string;
  name: string;
  avatar: string;
  currentRole: string;
  recommendedRole: string;
  matchPercentage: number;
  competencyScore: number;
  city: string;
  experienceYears: number;
  completedTrainings: CompletedTrainingRecord[];
  evaluations: EmployeeEvaluations;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  developmentAreas: string[];
  careerAdvice: {
    phase: string;
    action: string;
    targetDate: string;
  }[];
}

const INITIAL_EMPLOYEES_CAREER_DATA: EmployeeCareerRecord[] = [
  {
    id: 'emp_1',
    name: 'Ahmet Çelik',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    currentRole: 'Baş Kasiyer',
    recommendedRole: 'Mağaza Müdür Yardımcısı',
    matchPercentage: 96,
    competencyScore: 94,
    city: 'İstanbul',
    experienceYears: 4,
    completedTrainings: [
      {
        courseTitle: 'Kasa Operasyon Sistemleri & Hızlı Geçiş Protokolleri',
        duration: '16 Saat',
        completedDate: '12 Şubat 2026',
        score: 98,
        gradeStatus: 'Üstün Başarı',
        certificateId: 'PKA-2026-KAS-098'
      },
      {
        courseTitle: 'Zor Müşteri İkna ve Çatışma Yönetimi',
        duration: '12 Saat',
        completedDate: '28 Mart 2026',
        score: 96,
        gradeStatus: 'Üstün Başarı',
        certificateId: 'PKA-2026-IKN-096'
      },
      {
        courseTitle: 'Vardiya Planlama & Mağaza İçi Personel Sevk Yönetimi',
        duration: '20 Saat',
        completedDate: '15 Mayıs 2026',
        score: 92,
        gradeStatus: 'Pek İyi',
        certificateId: 'PKA-2026-VAR-092'
      },
      {
        courseTitle: 'Perakendecilikte Stok Devri ve SKT Takip İlkeleri',
        duration: '14 Saat',
        completedDate: '10 Haziran 2026',
        score: 90,
        gradeStatus: 'Başarılı',
        certificateId: 'PKA-2026-STK-090'
      }
    ],
    evaluations: {
      managerReview: {
        author: 'Murat Yıldırım',
        role: 'Mağaza Müdürü (Üst Yönetici)',
        rating: 4.9,
        comment: 'Ahmet Bey kasa operasyonlarında, Z-raporu alımında ve yoğun saatlerdeki vardiya yönetiminde mükemmel performans gösteriyor. P&L bütçe eğitimini tamamladığında Mağaza Müdür Yardımcılığı görevine %100 hazırdır.',
        date: '10 Haziran 2026'
      },
      subordinateReview: {
        author: 'Selin Demir',
        role: 'Kasiyer (Ekip Çalışanı / Alt Kadro)',
        rating: 4.8,
        comment: 'Kasa yoğunluğu arttığında hemen kasaya girip bize destek veriyor. Müşteri şikayetlerinde çok sakin ve çözüm odaklı. Vardiya çizelgesinde adil ve duyarlı.',
        date: '02 Haziran 2026'
      },
      hrReview: {
        author: 'Ahmet Çelik',
        role: 'İnsan Kaynakları Direktörü (İK Yönetimi)',
        rating: 5.0,
        comment: 'Aday yetkinlik pasaportu sınavlarında 94 puanla şirketimizin iç terfi havuzunda 1. sıradadır. Liderlik ve analitik becerileri terfi kriterlerini karşılamaktadır.',
        date: '14 Haziran 2026'
      }
    },
    swot: {
      strengths: [
        'Kasa işlem hızı ve hatasız Z-Raporu alımında şirket 1.si (%99.2)',
        'Müşteri memnuniyet ve ikna skoru %96 (CSAT yüksek)',
        'Vardiya çakışmaları ve personel motivasyon yönetimi'
      ],
      weaknesses: [
        'P&L Mağaza Bütçesi ve Kar/Zarar tablosu okuma yetkinliği geliştirilmeli',
        'Taze Gıda Reyon fire analizlerinde ileri Excel ihtiyacı'
      ],
      opportunities: [
        'Marmara bölgesinde açılacak 3 yeni mağaza için Mağaza Müdür Yardımcısı adaylığı',
        '90 gün içinde %80+ Terfi Hazırlık Pasaportunu tamamlama şansı'
      ],
      threats: [
        'Yoğun tempoda tükenmişlik riski (Vardiya dengelenmeli)',
        'Rakip perakende zincirlerinden transfer teklifi alma ihtimali'
      ]
    },
    developmentAreas: [
      'Perakende Finansı ve P&L Bütçe Yönetimi Eğitimi (24 Saat)',
      'Manav ve Kasap Reyonu Fire Minimizasyonu Teknikleri',
      'İleri Düzey İletişim ve Çatışma Yönetimi'
    ],
    careerAdvice: [
      { phase: '1. Ay (Temmuz 2026)', action: 'P&L Bütçe Yönetimi ve Mağaza Marj Eğitimi tamamlanacak.', targetDate: '15 Temmuz 2026' },
      { phase: '2. Ay (Ağustos 2026)', action: 'Bölge Müdürlüğü bünyesinde 2 hafta Gölge Mağaza Müdür Yardımcılığı stajı.', targetDate: '10 Ağustos 2026' },
      { phase: '3. Ay (Eylül 2026)', action: '%80+ Terfi Sınavına girilerek Mağaza Müdür Yardımcısı unvanı atanacak.', targetDate: '01 Eylül 2026' }
    ]
  },
  {
    id: 'emp_2',
    name: 'Zeynep Kaya',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    currentRole: 'Reyon Şefi',
    recommendedRole: 'Kategori Yöneticisi Yardımcısı',
    matchPercentage: 92,
    competencyScore: 91,
    city: 'Ankara',
    experienceYears: 5,
    completedTrainings: [
      {
        courseTitle: 'Reyon Teşhir (Planogram) ve 5S Görsel Standartları',
        duration: '18 Saat',
        completedDate: '05 Ocak 2026',
        score: 95,
        gradeStatus: 'Üstün Başarı',
        certificateId: 'PKA-2026-[#087F96]-095'
      },
      {
        courseTitle: 'Fire Minimizasyonu & FIFO Ürün Devir Mantığı',
        duration: '16 Saat',
        completedDate: '20 Şubat 2026',
        score: 92,
        gradeStatus: 'Pek İyi',
        certificateId: 'PKA-2026-FIR-092'
      },
      {
        courseTitle: 'Tedarikçi Sipariş Teslimat & Kalite Kabul Protokolleri',
        duration: '14 Saat',
        completedDate: '11 Nisan 2026',
        score: 88,
        gradeStatus: 'Başarılı',
        certificateId: 'PKA-2026-TED-088'
      }
    ],
    evaluations: {
      managerReview: {
        author: 'Caner Şahin',
        role: 'Bölge Mağaza Müdürü (Üst Yönetici)',
        rating: 4.8,
        comment: 'Reyon düzeni ve SKT sıfır kayıp performansıyla Ankara mağazalarımızda öne çıkıyor. Kategori yönetimi ve pazarlık modülünü tamamladığında Merkeze geçişe hazırdır.',
        date: '08 Mayıs 2026'
      },
      subordinateReview: {
        author: 'Emre Aksoy',
        role: 'Reyon Elemanı (Ekip Çalışanı)',
        rating: 4.7,
        comment: 'Reyon dizilimlerini çok açık şekilde öğretiyor. Ekip içinde disiplinli ama her zaman yapıcı.',
        date: '12 Mayıs 2026'
      },
      hrReview: {
        author: 'Ahmet Çelik',
        role: 'İnsan Kaynakları Direktörü (İK Yönetimi)',
        rating: 4.9,
        comment: 'Zeynep Hanım 91 puan yetkinlik skoruyla Satın Alma & Kategori birimimiz için yüksek potansiyelli aday olarak değerlendirilmiştir.',
        date: '01 Haziran 2026'
      }
    },
    swot: {
      strengths: [
        'Reyon teşhir (Planogram) ve 5S düzeninde mükemmel uygulama',
        'Stok devir hızı ve FIFO takibinde sıfır SKT kaybı',
        'Tedarikçi sipariş teslimat doğrulaması'
      ],
      weaknesses: [
        'Tedarikçi ticari müzakere ve fiyat pazarlığı tecrübesi kısıtlı',
        'SQL ve Yapay Zekâ veri analiz araçları kullanımı başlangıç seviyesinde'
      ],
      opportunities: [
        'Merkez Satın Alma departmanına yatay geçiş yapma potansiyeli',
        'Kategori bazlı kar marjını %4 artırma olanağı'
      ],
      threats: [
        'Saha operasyonundan merkez operasyona geçişte adaptasyon süreci'
      ]
    },
    developmentAreas: [
      'Satın Alma & Kategori Yönetimi 101 Eğitimi',
      'Yapay Zekâ ile Talep Tahmini ve Sipariş Optimizasyonu',
      'Tedarikçi Pazarlık ve İkna Teknikleri'
    ],
    careerAdvice: [
      { phase: '1. Ay (Temmuz 2026)', action: 'Satın Alma & Kategori Yönetimi sertifika programı başlanacak.', targetDate: '20 Temmuz 2026' },
      { phase: '2. Ay (Ağustos 2026)', action: 'Kategori Müdürü ile ortak tedarikçi pazarlık toplantılarına katılım.', targetDate: '15 Ağustos 2026' },
      { phase: '3. Ay (Eylül 2026)', action: 'Kategori Uzman Yardımcısı kadrosuna atama teklifi sunulacak.', targetDate: '15 Eylül 2026' }
    ]
  },
  {
    id: 'emp_3',
    name: 'Dr. Mehmet Yılmaz',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    currentRole: 'Mağaza Müdürü',
    recommendedRole: 'Bölge Müdürü (Area Manager)',
    matchPercentage: 95,
    competencyScore: 96,
    city: 'İzmir',
    experienceYears: 8,
    completedTrainings: [
      {
        courseTitle: 'Mağaza P&L Finansal Yönetimi & Kar/Zarar Tablosu',
        duration: '24 Saat',
        completedDate: '10 Ocak 2026',
        score: 99,
        gradeStatus: 'Üstün Başarı',
        certificateId: 'PKA-2026-PNL-099'
      },
      {
        courseTitle: 'Multi-Store Liderlik ve Bölgesel Ciro Büyütme',
        duration: '30 Saat',
        completedDate: '18 Mart 2026',
        score: 96,
        gradeStatus: 'Üstün Başarı',
        certificateId: 'PKA-2026-LID-096'
      },
      {
        courseTitle: 'Resmi Kurum İlişkileri & İSG Saha Denetimleri',
        duration: '16 Saat',
        completedDate: '04 Mayıs 2026',
        score: 94,
        gradeStatus: 'Pek İyi',
        certificateId: 'PKA-2026-ISG-094'
      }
    ],
    evaluations: {
      managerReview: {
        author: 'Oğuzhan Kaya',
        role: 'Genel Müdür Yardımcısı (Üst Yönetici)',
        rating: 5.0,
        comment: 'Mehmet Bey Ege bölgesinde hedeflerini %118 oranında aşmış, 4 yeni Mağaza Müdürü yetiştirmiştir. Bölge Müdürlüğü pozisyonunda yüksek başarı gösterecektir.',
        date: '20 Mayıs 2026'
      },
      subordinateReview: {
        author: 'Gamze Tekin',
        role: 'Mağaza Müdür Yardımcısı (Ekip Çalışanı)',
        rating: 4.9,
        comment: 'Bizim kariyer gelişimimize birebir koçluk yapıyor. Mağazadaki her sorunda arkamızda duran gerçek bir lider.',
        date: '18 Mayıs 2026'
      },
      hrReview: {
        author: 'Ahmet Çelik',
        role: 'İnsan Kaynakları Direktörü (İK Yönetimi)',
        rating: 5.0,
        comment: 'Kıdemli Mağaza Müdürümüz Mehmet Yılmaz 96 puanla Ege Bölge Müdürlüğü aday listesinde 1. sıradadır.',
        date: '02 Haziran 2026'
      }
    },
    swot: {
      strengths: [
        '8 mağazalık bölge ciro hedefini %118 oranında aşma başarısı',
        'Ekip yetkinlik geliştirme ve iç terfi çıkarma oranı %90',
        'Üst düzey liderlik, kriz yönetimi ve resmi kurum ilişkileri'
      ],
      weaknesses: [
        'Omnichannel dijital sipariş ve e-ticaret lojistik entegrasyonu',
        'İngilizce sektörel raporlama ihtiyacı'
      ],
      opportunities: [
        'Ege Bölge Müdürlüğü kadrosuna 1. sıradan adaylık',
        'Kurumsal Akademi bünyesinde Saha Eğitmeni olma imkanı'
      ],
      threats: [
        'Geniş coğrafi bölge seyahat yoğunluğu'
      ]
    },
    developmentAreas: [
      'Bölge Yönetimi ve Multi-Store Operasyon Liderliği',
      'Omnichannel Perakendecilik & Sanal Mağaza Yönetimi',
      'Stratejik Karar Alma ve Risk Yönetimi'
    ],
    careerAdvice: [
      { phase: '1. Ay (Temmuz 2026)', action: 'Bölge Yönetimi Master Modülü tamamlanacak.', targetDate: '10 Temmuz 2026' },
      { phase: '2. Ay (Ağustos 2026)', action: 'Bölge Müdür Vekili olarak 12 mağazanın sorumluluğu üstlenilecek.', targetDate: '01 Ağustos 2026' },
      { phase: '3. Ay (Eylül 2026)', action: 'Resmi Bölge Müdürü terfisi ve yetkinlik pasaportu onayı.', targetDate: '01 Eylül 2026' }
    ]
  },
  {
    id: 'emp_4',
    name: 'Ayşe Demir',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    currentRole: 'Lojistik & Depo Sorumlusu',
    recommendedRole: 'Tedarik Zinciri & Depo Müdürü',
    matchPercentage: 88,
    competencyScore: 86,
    city: 'Bursa',
    experienceYears: 4,
    completedTrainings: [
      {
        courseTitle: 'Depo Kabul & WMS Otomasyon Yönetimi',
        duration: '20 Saat',
        completedDate: '14 Şubat 2026',
        score: 90,
        gradeStatus: 'Başarılı',
        certificateId: 'PKA-2026-WMS-090'
      },
      {
        courseTitle: 'Araç Filosu & Sevkiyat Rotalama Sistemleri',
        duration: '16 Saat',
        completedDate: '22 Nisan 2026',
        score: 86,
        gradeStatus: 'Başarılı',
        certificateId: 'PKA-2026-ROT-086'
      }
    ],
    evaluations: {
      managerReview: {
        author: 'Hakan Erdem',
        role: 'Lojistik Müdürü (Üst Yönetici)',
        rating: 4.6,
        comment: 'Ayşe Hanım WMS yazılımını çok etkin kullanıyor, depo hatasızlık oranı %98.5 seviyesindedir. Soğuk zincir lojistiği eğitiminden sonra Şef kadrosuna terfi edecektir.',
        date: '02 Nisan 2026'
      },
      subordinateReview: {
        author: 'Tarık Yıldız',
        role: 'Depo Elemanı (Ekip Çalışanı)',
        rating: 4.5,
        comment: 'Araç yükleme ve mal kabul çizelgelerini eksiksiz yönetiyor. Ekip arkadaşlarına karşı nazik.',
        date: '10 Nisan 2026'
      },
      hrReview: {
        author: 'Ahmet Çelik',
        role: 'İnsan Kaynakları Direktörü (İK Yönetimi)',
        rating: 4.7,
        comment: 'Bursa Lojistik Merkezi genişleme projemizde Depo Şefliği adayları arasında 86 puan yetkinlik skoruyla öne çıkmaktadır.',
        date: '15 Nisan 2026'
      }
    },
    swot: {
      strengths: [
        'Depo kabul ve sevkiyat hatasızlık oranı %98.5',
        'WMS (Warehouse Management System) yazılımı uzmanı',
        'Araç filosu ve sevkiyat rotalama başarısı'
      ],
      weaknesses: [
        'Soğuk zincir taze gıda antrepo sıcaklık denetimleri',
        'Grup içi sunum ve hitabet becerisi'
      ],
      opportunities: [
        'Bursa Lojistik Merkezi genişleme projesinde Lojistik Şefliği'
      ],
      threats: [
        'Yakıt ve nakliye maliyet artış baskısı'
      ]
    },
    developmentAreas: [
      'Soğuk Zincir Lojistiği ve İSG Standartları',
      'Tedarik Zinciri Veri Analitiği ve Rotalama',
      'Etkili Sunum ve İletişim Becerileri'
    ],
    careerAdvice: [
      { phase: '1. Ay (Temmuz 2026)', action: 'Soğuk Zincir Lojistiği eğitimi tamamlanacak.', targetDate: '25 Temmuz 2026' },
      { phase: '2. Ay (Ağustos 2026)', action: 'Lojistik Müdürü koçluğunda haftalık sevkiyat planlama.', targetDate: '20 Ağustos 2026' },
      { phase: '3. Ay (Eylül 2026)', action: 'Depo & Lojistik Şefi pozisyonuna terfi.', targetDate: '10 Eylül 2026' }
    ]
  }
];

export default function EmployeeCareerPlanningModule() {
  const [employeesData, setEmployeesData] = useState<EmployeeCareerRecord[]>(INITIAL_EMPLOYEES_CAREER_DATA);
  const [selectedEmpId, setSelectedEmpId] = useState<string>(INITIAL_EMPLOYEES_CAREER_DATA[0].id);
  const [minScoreFilter, setMinScoreFilter] = useState<number>(80);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Local state for editing reviews dynamically
  const [managerInput, setManagerInput] = useState<string>('');
  const [subordinateInput, setSubordinateInput] = useState<string>('');
  const [hrInput, setHrInput] = useState<string>('');
  const [savedSuccessMsg, setSavedSuccessMsg] = useState<string | null>(null);

  const filteredEmployees = useMemo(() => {
    return employeesData.filter(emp => {
      const matchesScore = emp.competencyScore >= minScoreFilter;
      const matchesSearch = searchQuery === '' || 
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.currentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.recommendedRole.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesScore && matchesSearch;
    });
  }, [employeesData, minScoreFilter, searchQuery]);

  const activeEmployee = useMemo(() => {
    return employeesData.find(e => e.id === selectedEmpId) || employeesData[0];
  }, [employeesData, selectedEmpId]);

  // Handler to update evaluation note dynamically
  const handleSaveEvaluation = (targetType: 'manager' | 'subordinate' | 'hr') => {
    let newComment = '';
    if (targetType === 'manager') newComment = managerInput;
    if (targetType === 'subordinate') newComment = subordinateInput;
    if (targetType === 'hr') newComment = hrInput;

    if (!newComment.trim()) return;

    setEmployeesData(prev => prev.map(emp => {
      if (emp.id !== activeEmployee.id) return emp;
      const updated = { ...emp };
      const todayStr = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

      if (targetType === 'manager') {
        updated.evaluations.managerReview = {
          ...updated.evaluations.managerReview,
          comment: newComment,
          date: todayStr
        };
      } else if (targetType === 'subordinate') {
        updated.evaluations.subordinateReview = {
          ...updated.evaluations.subordinateReview,
          comment: newComment,
          date: todayStr
        };
      } else if (targetType === 'hr') {
        updated.evaluations.hrReview = {
          ...updated.evaluations.hrReview,
          comment: newComment,
          date: todayStr
        };
      }

      return updated;
    }));

    if (targetType === 'manager') setManagerInput('');
    if (targetType === 'subordinate') setSubordinateInput('');
    if (targetType === 'hr') setHrInput('');

    setSavedSuccessMsg('Değerlendirme başarıyla güncellendi ve sisteme kaydedildi!');
    setTimeout(() => setSavedSuccessMsg(null), 3500);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#0B2A4A] text-white p-6 sm:p-8 rounded-3xl border border-[#087F96]/40 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-bold font-mono">
          <BrainCircuit className="w-4 h-4 text-emerald-400" />
          <span>İK KARAR DESTEK & AKILLI KARİYER PLANLAMA MOTORU</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white">Çalışan Kariyer Planlaması & 360° Değerlendirme</h2>
        <p className="text-xs sm:text-sm text-gray-200 font-light max-w-3xl leading-relaxed">
          Çalışanları yetkinlik puanlarına göre sıralayın; her çalışan için <strong>360° Üst Yönetici, Alt Çalışan ve İK Değerlendirmelerini</strong>, <strong>Aldığı Eğitimleri</strong>, <strong>SWOT Analizini</strong> ve <strong>90 Günlük Bireysel Kariyer Planını</strong> inceleyin.
        </p>
      </div>

      {/* Filter and Employee Selection Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Çalışan adı veya pozisyon ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#087F96] text-[#0B2A4A]"
          />
        </div>

        <div className="flex items-center space-x-3 text-xs w-full md:w-auto">
          <span className="text-gray-500 font-bold whitespace-nowrap">Puan Barajı:</span>
          <select
            value={minScoreFilter}
            onChange={(e) => setMinScoreFilter(Number(e.target.value))}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-bold text-[#0B2A4A] focus:outline-none focus:ring-2 focus:ring-[#087F96]"
          >
            <option value={80}>≥ 80 Puan (Terfiye Hazır)</option>
            <option value={90}>≥ 90 Puan (Dereceli Liderler)</option>
            <option value={70}>Tüm Puan Seviyeleri</option>
          </select>
        </div>
      </div>

      {/* Success Alert */}
      {savedSuccessMsg && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-xs font-bold text-emerald-900 flex items-center space-x-2 shadow-md animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{savedSuccessMsg}</span>
        </div>
      )}

      {/* Main Two-Column Layout: Employee List + Detailed SWOT, 360 Reviews & Completed Trainings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Sorted Employee List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-extrabold text-sm text-[#0B2A4A] flex items-center space-x-2">
              <Users className="w-4 h-4 text-[#087F96]" />
              <span>Puanına Göre Çalışanlar ({filteredEmployees.length})</span>
            </h3>
            <span className="text-[10px] text-gray-400 font-mono">Puana Göre Sıralı</span>
          </div>

          <div className="space-y-3">
            {filteredEmployees.map((emp) => {
              const isSelected = emp.id === activeEmployee.id;
              return (
                <div
                  key={emp.id}
                  onClick={() => setSelectedEmpId(emp.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    isSelected 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-[#087F96] shadow-md scale-[1.02]' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-[#087F96] flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-[#0B2A4A]">{emp.name}</h4>
                      <p className="text-[11px] text-gray-500">{emp.currentRole}</p>
                      <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                        Öneri: {emp.recommendedRole}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="px-2.5 py-1 bg-[#0B2A4A] text-white rounded-lg font-mono text-xs font-black">
                      {emp.competencyScore} Puan
                    </div>
                    <div className="text-[9px] text-emerald-600 font-mono font-bold mt-1">
                      %{emp.matchPercentage} Uyum
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Employee Details, 360 Reviews, Completed Trainings & SWOT */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Employee Header Overview */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={activeEmployee.avatar}
                  alt={activeEmployee.name}
                  className="w-16 h-16 rounded-2xl object-cover border-4 border-[#087F96] shadow-lg flex-shrink-0"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-black text-[#0B2A4A]">{activeEmployee.name}</h3>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full font-mono">
                      +{activeEmployee.competencyScore}p Barajı Geçti ✓
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">
                    Mevcut Pozisyon: <strong>{activeEmployee.currentRole}</strong> • {activeEmployee.city} ({activeEmployee.experienceYears} Yıl Deneyim)
                  </p>
                </div>
              </div>

              {/* Recommendation Badge */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-2xl shadow-md space-y-1 text-center sm:text-right w-full sm:w-auto">
                <div className="text-[10px] font-bold uppercase text-emerald-100">Önerilen Hedef Pozisyon</div>
                <div className="text-sm font-black text-white">{activeEmployee.recommendedRole}</div>
                <div className="text-[10px] font-mono font-bold text-amber-300">
                  Uyum Oranı: %{activeEmployee.matchPercentage}
                </div>
              </div>
            </div>

            {/* Quick Summary Alert */}
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-[#0B2A4A] flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#087F96] flex-shrink-0" />
              <span>
                <strong>Sistem Önerisi:</strong> {activeEmployee.name}, yetkinlik puanı ve aldığı {activeEmployee.completedTrainings.length} sertifikalı eğitimle <strong>{activeEmployee.recommendedRole}</strong> pozisyonu için en yüksek uyuma (%{activeEmployee.matchPercentage}) sahiptir.
              </span>
            </div>
          </div>

          {/* 360-DEGREE EVALUATION & REVIEW PANEL (ÜST YÖNETİCİ, ALT ÇALIŞAN & İK DEĞERLENDİRMELERİ) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-base text-[#0B2A4A] flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-[#087F96]" />
                <span>360° Yönetici, Ekip ve İK Değerlendirmeleri</span>
              </h3>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                Resmi Değerlendirme Kayıtları
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              
              {/* 1. ÜST YÖNETİCİ DEĞERLENDİRMESİ */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 p-5 rounded-2xl border border-blue-200 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-blue-100 pb-2">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-[#087F96]" />
                    <h4 className="font-extrabold text-xs text-[#0B2A4A]">1. Üst Yönetici Değerlendirmesi</h4>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] text-gray-500 font-mono">
                    <span className="font-bold text-gray-700">{activeEmployee.evaluations.managerReview.author} ({activeEmployee.evaluations.managerReview.role})</span>
                    <span>• {activeEmployee.evaluations.managerReview.date}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-700 font-medium leading-relaxed italic bg-white p-3 rounded-xl border border-blue-100">
                  "{activeEmployee.evaluations.managerReview.comment}"
                </p>

                {/* Edit / Add Manager Review Note Form */}
                <div className="pt-2 space-y-2">
                  <label className="block text-[10px] font-bold text-[#0B2A4A] uppercase">Yönetici Görüşünü Güncelle / Not Ekle:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Üst yönetici değerlendirme notunu yazın..."
                      value={managerInput}
                      onChange={(e) => setManagerInput(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#087F96]"
                    />
                    <button
                      onClick={() => handleSaveEvaluation('manager')}
                      className="px-4 py-2 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl text-xs transition-colors flex items-center space-x-1 whitespace-nowrap"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kaydet</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. ALT ÇALIŞAN / EKİP GERİ BİLDİRİMİ */}
              <div className="bg-gradient-to-br from-slate-50 to-emerald-50/50 p-5 rounded-2xl border border-emerald-200 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-emerald-100 pb-2">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <h4 className="font-extrabold text-xs text-[#0B2A4A]">2. Alt Çalışan / Ekip Geri Bildirimi</h4>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] text-gray-500 font-mono">
                    <span className="font-bold text-gray-700">{activeEmployee.evaluations.subordinateReview.author} ({activeEmployee.evaluations.subordinateReview.role})</span>
                    <span>• {activeEmployee.evaluations.subordinateReview.date}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-700 font-medium leading-relaxed italic bg-white p-3 rounded-xl border border-emerald-100">
                  "{activeEmployee.evaluations.subordinateReview.comment}"
                </p>

                {/* Edit / Add Subordinate Feedback Note Form */}
                <div className="pt-2 space-y-2">
                  <label className="block text-[10px] font-bold text-[#0B2A4A] uppercase">Ekip Geri Bildirimini Güncelle / Not Ekle:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ekip üyesi geri bildirim notunu yazın..."
                      value={subordinateInput}
                      onChange={(e) => setSubordinateInput(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                    <button
                      onClick={() => handleSaveEvaluation('subordinate')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center space-x-1 whitespace-nowrap"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kaydet</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. İK YÖNETİCİSİ DEĞERLENDİRMESİ */}
              <div className="bg-gradient-to-br from-slate-50 to-purple-50/50 p-5 rounded-2xl border border-purple-200 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-purple-100 pb-2">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <h4 className="font-extrabold text-xs text-[#0B2A4A]">3. İK Yöneticisi Değerlendirmesi</h4>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] text-gray-500 font-mono">
                    <span className="font-bold text-gray-700">{activeEmployee.evaluations.hrReview.author} ({activeEmployee.evaluations.hrReview.role})</span>
                    <span>• {activeEmployee.evaluations.hrReview.date}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-700 font-medium leading-relaxed italic bg-white p-3 rounded-xl border border-purple-100">
                  "{activeEmployee.evaluations.hrReview.comment}"
                </p>

                {/* Edit / Add HR Review Note Form */}
                <div className="pt-2 space-y-2">
                  <label className="block text-[10px] font-bold text-[#0B2A4A] uppercase">İK Değerlendirme Notunu Güncelle / Not Ekle:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="İnsan Kaynakları direktör notunu yazın..."
                      value={hrInput}
                      onChange={(e) => setHrInput(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    <button
                      onClick={() => handleSaveEvaluation('hr')}
                      className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center space-x-1 whitespace-nowrap"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kaydet</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* COMPLETED TRAININGS & EXAM SCORES TABLE */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-base text-[#0B2A4A] flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-[#087F96]" />
                <span>Çalışanın Şu Ana Kadar Aldığı Eğitimler & Sınav Puanları ({activeEmployee.completedTrainings.length} Ders)</span>
              </h3>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                Onaylı Sertifikalı
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0B2A4A] text-white font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4 rounded-l-xl">Tamamlanan Ders / Eğitim Modülü</th>
                    <th className="py-3 px-4">Süresi</th>
                    <th className="py-3 px-4">Tamamlanma Tarihi</th>
                    <th className="py-3 px-4 text-center">Sınav Puanı</th>
                    <th className="py-3 px-4 text-right rounded-r-xl">Sertifika Kodu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {activeEmployee.completedTrainings.map((tr, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#0B2A4A] flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{tr.courseTitle}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-gray-500">{tr.duration}</td>
                      <td className="py-3.5 px-4 font-mono text-gray-500">{tr.completedDate}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-lg font-mono font-black text-xs ${
                          tr.score >= 95 
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : tr.score >= 90
                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}>
                          %{tr.score} ({tr.gradeStatus})
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-[10px] text-gray-400 font-bold">
                        {tr.certificateId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4-BOX SWOT ANALYSIS DASHBOARD */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-lg text-[#0B2A4A] flex items-center space-x-2">
              <Compass className="w-5 h-5 text-[#087F96]" />
              <span>Çalışan SWOT Analiz Karnesi</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* STRENGTHS (GÜÇLÜ YÖNLER) */}
              <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl p-5 space-y-3">
                <h4 className="font-black text-sm text-emerald-900 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>S - Güçlü Yönler (Strengths)</span>
                </h4>
                <ul className="space-y-2 text-xs text-emerald-950 font-medium">
                  {activeEmployee.swot.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WEAKNESSES (GELİŞİM ALANLARI / ZAYIF YÖNLER) */}
              <div className="bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-5 space-y-3">
                <h4 className="font-black text-sm text-amber-900 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>W - Gelişim Alanları (Weaknesses)</span>
                </h4>
                <ul className="space-y-2 text-xs text-amber-950 font-medium">
                  {activeEmployee.swot.weaknesses.map((w, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* OPPORTUNITIES (FIRSATLAR) */}
              <div className="bg-blue-50/70 border-2 border-blue-300 rounded-2xl p-5 space-y-3">
                <h4 className="font-black text-sm text-blue-900 flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span>O - Kariyer Fırsatları (Opportunities)</span>
                </h4>
                <ul className="space-y-2 text-xs text-blue-950 font-medium">
                  {activeEmployee.swot.opportunities.map((o, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* THREATS (TEHDİTLER & RİSKLER) */}
              <div className="bg-rose-50/70 border-2 border-rose-300 rounded-2xl p-5 space-y-3">
                <h4 className="font-black text-sm text-rose-900 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  <span>T - Riskler ve Tehditler (Threats)</span>
                </h4>
                <ul className="space-y-2 text-xs text-rose-950 font-medium">
                  {activeEmployee.swot.threats.map((t, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 flex-shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* 90-DAY CAREER ADVICE ACTION PLAN */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md space-y-4">
            <h3 className="font-extrabold text-lg text-[#0B2A4A] flex items-center space-x-2">
              <Target className="w-5 h-5 text-[#087F96]" />
              <span>90 Günlük Bireysel Kariyer Tavsiyeleri & Aksiyon Planı</span>
            </h3>

            <div className="space-y-3">
              {activeEmployee.careerAdvice.map((adv, idx) => (
                <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-[#087F96] uppercase tracking-wider block font-mono">
                      {adv.phase}
                    </span>
                    <p className="text-xs font-bold text-[#0B2A4A]">{adv.action}</p>
                  </div>

                  <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-xl border border-emerald-300 whitespace-nowrap self-start sm:self-center">
                    Hedef: {adv.targetDate}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
