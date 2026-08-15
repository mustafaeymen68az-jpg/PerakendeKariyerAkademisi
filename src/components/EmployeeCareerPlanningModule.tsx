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
  Check,
  Building,
  Briefcase,
  History,
  CheckSquare,
  Layers,
  X,
  ExternalLink,
  Info
} from 'lucide-react';

export interface CompletedTrainingRecord {
  courseTitle: string;
  duration: string;
  durationHours: number;
  completedDate: string;
  instructorName: string;
  institution: string;
  companyWhereTaken: string;
  score: number;
  gradeStatus: 'Üstün Başarı' | 'Pek İyi' | 'Başarılı';
  certificateId: string;
}

export interface PreviousWorkExperience {
  companyName: string;
  role: string;
  duration: string;
  yearsRange: string;
}

export interface PriorTrainingRecord {
  title: string;
  institution: string;
  instructorName: string;
  companyWhereTaken: string;
  durationHours: number;
  year: string;
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
  startDate: string;
  tenure: string;
  previousExperiences: PreviousWorkExperience[];
  priorTrainings: PriorTrainingRecord[];
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
    startDate: '15 Mart 2022',
    tenure: '4 Yıl 5 Ay',
    previousExperiences: [
      {
        companyName: 'CarrefourSA',
        role: 'Reyon Görevlisi & Kasiyer',
        duration: '2 Yıl 3 Ay',
        yearsRange: '2018–2020'
      },
      {
        companyName: 'BİM A.Ş.',
        role: 'Kasa Şefi',
        duration: '1 Yıl 8 Ay',
        yearsRange: '2020–2022'
      }
    ],
    priorTrainings: [
      {
        title: 'Temel Perakendecilik & Müşteri İletişimi',
        institution: 'Halk Eğitim Merkezi',
        instructorName: 'Kemal Sunal (Sertifikalı Eğitmen)',
        companyWhereTaken: 'CarrefourSA Dönemi',
        durationHours: 40,
        year: '2018'
      },
      {
        title: 'Kasa Bilgisayar Sistemleri Sertifikası',
        institution: 'MEB Onaylı Perakende Kursu',
        instructorName: 'Merve Öztürk (Kasa Uzmanı)',
        companyWhereTaken: 'BİM A.Ş. Dönemi',
        durationHours: 24,
        year: '2019'
      }
    ],
    completedTrainings: [
      {
        courseTitle: 'Kasa Operasyon Sistemleri & Hızlı Geçiş Protokolleri',
        duration: '16 Saat',
        durationHours: 16,
        completedDate: '12 Şubat 2026',
        instructorName: 'Prof. Dr. Ahmet Çelik',
        institution: 'Perakende Kariyer Akademisi',
        companyWhereTaken: 'Mevcut Şirket (Perakende Kariyer Akademi)',
        score: 98,
        gradeStatus: 'Üstün Başarı',
        certificateId: 'PKA-2026-KAS-098'
      },
      {
        courseTitle: 'Zor Müşteri İkna ve Çatışma Yönetimi',
        duration: '12 Saat',
        durationHours: 12,
        completedDate: '28 Mart 2026',
        instructorName: 'Zeynep Kaya (Kategori Müdürü)',
        institution: 'Perakende Kariyer Akademisi',
        companyWhereTaken: 'Mevcut Şirket (Perakende Kariyer Akademi)',
        score: 96,
        gradeStatus: 'Üstün Başarı',
        certificateId: 'PKA-2026-IKN-096'
      },
      {
        courseTitle: 'Vardiya Planlama & Mağaza İçi Personel Sevk Yönetimi',
        duration: '20 Saat',
        durationHours: 20,
        completedDate: '15 Mayıs 2026',
        instructorName: 'Mustafa Aydın (Saha Lideri)',
        institution: 'Perakende Kariyer Akademisi',
        companyWhereTaken: 'Mevcut Şirket (Perakende Kariyer Akademi)',
        score: 92,
        gradeStatus: 'Pek İyi',
        certificateId: 'PKA-2026-VAR-092'
      },
      {
        courseTitle: 'Perakendecilikte Stok Devri ve SKT Takip İlkeleri',
        duration: '14 Saat',
        durationHours: 14,
        completedDate: '10 Haziran 2026',
        instructorName: 'Hakan Erdem (Stok Denetçisi)',
        institution: 'Perakende Kariyer Akademisi',
        companyWhereTaken: 'Mevcut Şirket (Perakende Kariyer Akademi)',
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
    startDate: '10 Ocak 2021',
    tenure: '5 Yıl 7 Ay',
    previousExperiences: [
      {
        companyName: 'A101 Marketler',
        role: 'Satış Elemanı & Kasiyer',
        duration: '2 Yıl',
        yearsRange: '2019–2021'
      }
    ],
    priorTrainings: [
      {
        title: 'Reyon Düzeni & Hijyen Sertifikası',
        institution: 'Tarım İl Müdürlüğü Akademi',
        instructorName: 'Seda Yılmaz (Gıda Mühendisi)',
        companyWhereTaken: 'A101 Marketler Dönemi',
        durationHours: 30,
        year: '2019'
      }
    ],
    completedTrainings: [
      {
        courseTitle: 'Reyon Teşhir (Planogram) ve 5S Görsel Standartları',
        duration: '18 Saat',
        durationHours: 18,
        completedDate: '05 Ocak 2026',
        instructorName: 'Dr. Mehmet Yılmaz',
        institution: 'Perakende Kariyer Akademisi',
        companyWhereTaken: 'Mevcut Şirket (Perakende Kariyer Akademi)',
        score: 95,
        gradeStatus: 'Üstün Başarı',
        certificateId: 'PKA-2026-PLAN-095'
      },
      {
        courseTitle: 'Fire Minimizasyonu & FIFO Ürün Devir Mantığı',
        duration: '16 Saat',
        durationHours: 16,
        completedDate: '20 Şubat 2026',
        instructorName: 'Oğuzhan Kaya (Operasyon Direktörü)',
        institution: 'Perakende Kariyer Akademisi',
        companyWhereTaken: 'Mevcut Şirket (Perakende Kariyer Akademi)',
        score: 92,
        gradeStatus: 'Pek İyi',
        certificateId: 'PKA-2026-FIR-092'
      },
      {
        courseTitle: 'Tedarikçi Sipariş Teslimat & Kalite Kabul Protokolleri',
        duration: '14 Saat',
        durationHours: 14,
        completedDate: '11 Nisan 2026',
        instructorName: 'Gamze Tekin (Satın Alma Uzmanı)',
        institution: 'Perakende Kariyer Akademisi',
        companyWhereTaken: 'Mevcut Şirket (Perakende Kariyer Akademi)',
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
    startDate: '01 Eylül 2018',
    tenure: '7 Yıl 11 Ay',
    previousExperiences: [
      {
        companyName: 'Metro Grossmarket',
        role: 'Mağaza Müdürü Adayı',
        duration: '3 Yıl 6 Ay',
        yearsRange: '2014–2018'
      }
    ],
    priorTrainings: [
      {
        title: 'İleri Mağaza Yönetimi & P&L Eğitimi',
        institution: 'İstanbul Perakende Enstitüsü',
        instructorName: 'Prof. Dr. Tarık Yıldız',
        companyWhereTaken: 'Metro Grossmarket Dönemi',
        durationHours: 60,
        year: '2015'
      }
    ],
    completedTrainings: [
      {
        courseTitle: 'Mağaza P&L Finansal Yönetimi & Kar/Zarar Tablosu',
        duration: '24 Saat',
        durationHours: 24,
        completedDate: '10 Ocak 2026',
        instructorName: 'Prof. Dr. Ahmet Çelik',
        institution: 'Perakende Kariyer Akademisi',
        companyWhereTaken: 'Mevcut Şirket (Perakende Kariyer Akademi)',
        score: 99,
        gradeStatus: 'Üstün Başarı',
        certificateId: 'PKA-2026-PNL-099'
      },
      {
        courseTitle: 'Multi-Store Liderlik ve Bölgesel Ciro Büyütme',
        duration: '30 Saat',
        durationHours: 30,
        completedDate: '18 Mart 2026',
        instructorName: 'Oğuzhan Kaya (Genel Müdür Yrd.)',
        institution: 'Perakende Kariyer Akademisi',
        companyWhereTaken: 'Mevcut Şirket (Perakende Kariyer Akademi)',
        score: 96,
        gradeStatus: 'Üstün Başarı',
        certificateId: 'PKA-2026-LID-096'
      },
      {
        courseTitle: 'Resmi Kurum İlişkileri & İSG Saha Denetimleri',
        duration: '16 Saat',
        durationHours: 16,
        completedDate: '04 Mayıs 2026',
        instructorName: 'Hakan Erdem (İSG Başdenetçisi)',
        institution: 'Perakende Kariyer Akademisi',
        companyWhereTaken: 'Mevcut Şirket (Perakende Kariyer Akademi)',
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
    startDate: '15 Haziran 2022',
    tenure: '4 Yıl 2 Ay',
    previousExperiences: [
      {
        companyName: 'ŞOK Marketler',
        role: 'Depo Elemanı',
        duration: '2 Yıl',
        yearsRange: '2020–2022'
      }
    ],
    priorTrainings: [
      {
        title: 'Depo Yönetimi & İSG Temel Eğitimi',
        institution: 'Lojistik Derneği Akademi',
        instructorName: 'Mustafa Aydın (Lojistik Şefi)',
        companyWhereTaken: 'ŞOK Marketler Dönemi',
        durationHours: 32,
        year: '2020'
      }
    ],
    completedTrainings: [
      {
        courseTitle: 'Depo Kabul & WMS Otomasyon Yönetimi',
        duration: '20 Saat',
        durationHours: 20,
        completedDate: '14 Şubat 2026',
        instructorName: 'Caner Şahin (Lojistik Başeğitmeni)',
        institution: 'Perakende Kariyer Akademisi',
        companyWhereTaken: 'Mevcut Şirket (Perakende Kariyer Akademi)',
        score: 90,
        gradeStatus: 'Başarılı',
        certificateId: 'PKA-2026-WMS-090'
      },
      {
        courseTitle: 'Araç Filosu & Sevkiyat Rotalama Sistemleri',
        duration: '16 Saat',
        durationHours: 16,
        completedDate: '22 Nisan 2026',
        instructorName: 'Seda Yılmaz (Rotalama Uzmanı)',
        institution: 'Perakende Kariyer Akademisi',
        companyWhereTaken: 'Mevcut Şirket (Perakende Kariyer Akademi)',
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
  },
  {
    id: 'emp_5',
    name: 'Ahmet Kaya',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    currentRole: 'Mağaza Müdür Yardımcısı',
    recommendedRole: 'Mağaza Müdürü (İzmir Alsancak)',
    matchPercentage: 94,
    competencyScore: 88,
    city: 'İzmir',
    experienceYears: 5,
    startDate: '10 Nisan 2021',
    tenure: '5 Yıl 4 Ay',
    previousExperiences: [
      {
        companyName: 'BİM A.Ş.',
        role: 'Kasa Şefi',
        duration: '2 Yıl',
        yearsRange: '2019–2021'
      }
    ],
    priorTrainings: [
      {
        title: 'Mağaza İçi Vardiya Yönetimi',
        institution: 'MEB Sertifika Programı',
        instructorName: 'Kemal Sunal',
        companyWhereTaken: 'BİM A.Ş. Dönemi',
        durationHours: 30,
        year: '2019'
      }
    ],
    completedTrainings: [
      {
        courseTitle: 'Mağaza Müdürlüğü Terfi Hazırlık Programı',
        duration: '24 Saat',
        durationHours: 24,
        completedDate: '15 Mayıs 2026',
        instructorName: 'Prof. Dr. Ahmet Çelik',
        institution: 'Perakende Kariyer Akademisi',
        companyWhereTaken: 'Mevcut Şirket (Perakende Kariyer Akademi)',
        score: 88,
        gradeStatus: 'Pek İyi',
        certificateId: 'PKA-2026-MUD-088'
      }
    ],
    evaluations: {
      managerReview: {
        author: 'Mehmet Yılmaz',
        role: 'Mağaza Müdürü (Üst Yönetici)',
        rating: 4.8,
        comment: 'Ahmet Kaya BeyAlsancak mağazamızda 1. yedek olarak harika bir performans gösteriyor. Mağaza boşaldığında göreve hazırdır.',
        date: '10 Mayıs 2026'
      },
      subordinateReview: {
        author: 'Burak Çetin',
        role: 'Baş Kasiyer (Ekip Çalışanı)',
        rating: 4.7,
        comment: 'Ekibe her zaman destek veriyor, vardiya dağılımlarında adil.',
        date: '02 Mayıs 2026'
      },
      hrReview: {
        author: 'Ahmet Çelik',
        role: 'İnsan Kaynakları Direktörü (İK Yönetimi)',
        rating: 4.9,
        comment: 'Ahmet Kaya 88 puan yetkinlik skoruyla İzmir Alsancak Mağaza Müdürlüğü için onaylanmış 1. yedektir.',
        date: '14 Mayıs 2026'
      }
    },
    swot: {
      strengths: ['Saha liderliği ve ciro takibi', 'Vardiya sevk yönetimi'],
      weaknesses: ['İleri Finansal P&L analizleri'],
      opportunities: ['İzmir Alsancak Mağaza Müdürlüğü terfisi'],
      threats: ['Yoğun vardiya temposu']
    },
    developmentAreas: ['P&L Finansal Bütçe Yönetimi'],
    careerAdvice: [
      { phase: '1. Ay (Temmuz 2026)', action: 'Terfi onayı tebliği.', targetDate: '15 Temmuz 2026' }
    ]
  },
  {
    id: 'emp_6',
    name: 'Caner Şahin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    currentRole: 'Baş Kasiyer',
    recommendedRole: 'Kasa Operasyon Şefi (İstanbul Kuleli)',
    matchPercentage: 96,
    competencyScore: 92,
    city: 'İstanbul',
    experienceYears: 4,
    startDate: '01 Şubat 2022',
    tenure: '4 Yıl 6 Ay',
    previousExperiences: [
      { companyName: 'Migros', role: 'Kasiyer', duration: '2 Yıl', yearsRange: '2020–2022' }
    ],
    priorTrainings: [
      { title: 'Kasa Hijyen ve Hızlı Geçiş', institution: 'Halk Eğitim', instructorName: 'Seda Yılmaz', companyWhereTaken: 'Migros', durationHours: 20, year: '2020' }
    ],
    completedTrainings: [
      { courseTitle: 'Kasa Operasyon Şefliği Master Programı', duration: '18 Saat', durationHours: 18, completedDate: '20 Nisan 2026', instructorName: 'Prof. Dr. Ahmet Çelik', institution: 'Perakende Kariyer Akademisi', companyWhereTaken: 'Mevcut Şirket', score: 92, gradeStatus: 'Pek İyi', certificateId: 'PKA-2026-KAS-092' }
    ],
    evaluations: {
      managerReview: { author: 'Selin Özer', role: 'Kasa Şefi', rating: 4.9, comment: 'Caner Kuleli mağazasında 1. yedek olarak %92 başarı göstermiştir.', date: '12 Mayıs 2026' },
      subordinateReview: { author: 'Merve Öztürk', role: 'Kasiyer', rating: 4.8, comment: 'Hızlı ve yardımsever.', date: '10 Mayıs 2026' },
      hrReview: { author: 'Ahmet Çelik', role: 'İK Direktörü', rating: 5.0, comment: 'Kasa Şefliği 1. yedek adayı.', date: '15 Mayıs 2026' }
    },
    swot: {
      strengths: ['Hızlı kasa ve Z-Raporu hatasızlığı'],
      weaknesses: ['Stok devir takibi'],
      opportunities: ['Kasa Şefliği terfisi'],
      threats: ['Yoğun kasa sırası']
    },
    developmentAreas: ['Stok ve Reyon Yönetimi'],
    careerAdvice: [{ phase: '1. Ay', action: 'Kasa Şefliği ataması', targetDate: '01 Ağustos 2026' }]
  }
];

export default function EmployeeCareerPlanningModule() {
  const [employeesData, setEmployeesData] = useState<EmployeeCareerRecord[]>(INITIAL_EMPLOYEES_CAREER_DATA);
  const [selectedEmpId, setSelectedEmpId] = useState<string>(INITIAL_EMPLOYEES_CAREER_DATA[0].id);
  const [minScoreFilter, setMinScoreFilter] = useState<number>(80);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Training Breakdown Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalFilterType, setModalFilterType] = useState<'all' | 'hours' | 'post' | 'prior'>('all');

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

  // Calculated totals for training summary
  const trainingSummary = useMemo(() => {
    const postHours = activeEmployee.completedTrainings.reduce((sum, item) => sum + item.durationHours, 0);
    const priorHours = activeEmployee.priorTrainings.reduce((sum, item) => sum + item.durationHours, 0);
    const totalCount = activeEmployee.completedTrainings.length + activeEmployee.priorTrainings.length;
    const totalHours = postHours + priorHours;

    return {
      totalCount,
      totalHours,
      postCount: activeEmployee.completedTrainings.length,
      postHours,
      priorCount: activeEmployee.priorTrainings.length,
      priorHours
    };
  }, [activeEmployee]);

  // Combined list of all trainings (Post + Prior) with unified fields for modal
  const combinedTrainingsList = useMemo(() => {
    const list: {
      id: string;
      title: string;
      durationHours: number;
      durationText: string;
      completedDateOrYear: string;
      instructorName: string;
      institution: string;
      companyWhereTaken: string;
      scoreOrBadge: string;
      typeCategory: 'post' | 'prior';
    }[] = [];

    // Add Post (Corporate) Trainings
    activeEmployee.completedTrainings.forEach((tr, idx) => {
      list.push({
        id: `post_${idx}`,
        title: tr.courseTitle,
        durationHours: tr.durationHours,
        durationText: tr.duration,
        completedDateOrYear: tr.completedDate,
        instructorName: tr.instructorName,
        institution: tr.institution,
        companyWhereTaken: tr.companyWhereTaken,
        scoreOrBadge: `%${tr.score} (${tr.gradeStatus})`,
        typeCategory: 'post'
      });
    });

    // Add Prior (External) Trainings
    activeEmployee.priorTrainings.forEach((pt, idx) => {
      list.push({
        id: `prior_${idx}`,
        title: pt.title,
        durationHours: pt.durationHours,
        durationText: `${pt.durationHours} Saat`,
        completedDateOrYear: pt.year,
        instructorName: pt.instructorName,
        institution: pt.institution,
        companyWhereTaken: pt.companyWhereTaken,
        scoreOrBadge: 'Sertifikalı Katılım',
        typeCategory: 'prior'
      });
    });

    if (modalFilterType === 'post') return list.filter(t => t.typeCategory === 'post');
    if (modalFilterType === 'prior') return list.filter(t => t.typeCategory === 'prior');
    return list;
  }, [activeEmployee, modalFilterType]);

  const handleOpenSummaryModal = (filter: 'all' | 'hours' | 'post' | 'prior') => {
    setModalFilterType(filter);
    setIsModalOpen(true);
  };

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
        <h2 className="text-2xl sm:text-4xl font-black text-white">Çalışan Özgeçmiş, Deneyim ve Eğitim Karnesi</h2>
        <p className="text-xs sm:text-sm text-gray-200 font-light max-w-3xl leading-relaxed">
          Eğitim özet kartlarına tıklayarak çalışanın <strong>hangi eğitmeni hangi kurumdan</strong> ve <strong>hangi şirkette çalışırken aldığını</strong> detaylı döküm tablosunda inceleyebilirsiniz.
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

      {/* Main Two-Column Layout */}
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

        {/* Right Column: Active Employee Complete Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Employee Header Overview & Employment Dates */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={activeEmployee.avatar}
                  alt={activeEmployee.name}
                  className="w-16 h-16 rounded-2xl object-cover border-4 border-[#087F96] shadow-lg flex-shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-black text-[#0B2A4A]">{activeEmployee.name}</h3>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full font-mono">
                      +{activeEmployee.competencyScore}p Barajı Geçti ✓
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">
                    Mevcut Pozisyon: <strong>{activeEmployee.currentRole}</strong> • {activeEmployee.city}
                  </p>

                  {/* START DATE & TENURE BADGE */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="bg-[#0B2A4A] text-white text-[10px] font-bold font-mono px-3 py-1 rounded-lg flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-amber-300" />
                      <span>İşe Başlangıç: <strong>{activeEmployee.startDate}</strong></span>
                    </span>
                    <span className="bg-blue-100 text-blue-900 border border-blue-300 text-[10px] font-bold font-mono px-3 py-1 rounded-lg">
                      Mevcut Şirket Kıdemi: <strong>{activeEmployee.tenure}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommendation Badge */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-2xl shadow-md space-y-1 text-center sm:text-right w-full sm:w-auto shrink-0">
                <div className="text-[10px] font-bold uppercase text-emerald-100">Önerilen Hedef Pozisyon</div>
                <div className="text-sm font-black text-white">{activeEmployee.recommendedRole}</div>
                <div className="text-[10px] font-mono font-bold text-amber-300">
                  Uyum Oranı: %{activeEmployee.matchPercentage}
                </div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE CLICKABLE EĞİTİM ÖZET KARNESİ BANNER */}
          <div className="bg-gradient-to-r from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white p-6 rounded-3xl shadow-xl border border-[#087F96]/40 space-y-4">
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <h3 className="font-extrabold text-sm text-white flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-amber-300" />
                <span>Eğitim Sayısı ve Toplam Süre Özet Karnesi (Detay İçin Tıklayın)</span>
              </h3>
              <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                Detaylı İnceleme Aktif 🔍
              </span>
            </div>

            {/* 4 INTERACTIVE CLICKABLE SUMMARY CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              
              <div
                onClick={() => handleOpenSummaryModal('all')}
                className="bg-white/10 hover:bg-white/20 p-3.5 rounded-2xl border border-white/15 backdrop-blur-xs transition-all cursor-pointer group hover:scale-105"
              >
                <div className="text-[10px] font-bold text-gray-300 uppercase flex items-center justify-center space-x-1">
                  <span>Toplam Eğitim</span>
                  <ExternalLink className="w-3 h-3 text-amber-300 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="text-2xl font-black text-amber-300 font-mono mt-1">{trainingSummary.totalCount} Modül</div>
                <div className="text-[9px] text-gray-300 mt-1 font-bold">Detayları Gör →</div>
              </div>

              <div
                onClick={() => handleOpenSummaryModal('hours')}
                className="bg-white/10 hover:bg-white/20 p-3.5 rounded-2xl border border-white/15 backdrop-blur-xs transition-all cursor-pointer group hover:scale-105"
              >
                <div className="text-[10px] font-bold text-gray-300 uppercase flex items-center justify-center space-x-1">
                  <span>Toplam Süre</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="text-2xl font-black text-emerald-300 font-mono mt-1">{trainingSummary.totalHours} Saat</div>
                <div className="text-[9px] text-gray-300 mt-1 font-bold">Süre Dağılımı →</div>
              </div>

              <div
                onClick={() => handleOpenSummaryModal('post')}
                className="bg-white/10 hover:bg-white/20 p-3.5 rounded-2xl border border-white/15 backdrop-blur-xs transition-all cursor-pointer group hover:scale-105"
              >
                <div className="text-[10px] font-bold text-gray-300 uppercase flex items-center justify-center space-x-1">
                  <span>Şirket İçi Akademi</span>
                  <ExternalLink className="w-3 h-3 text-white opacity-80 group-hover:opacity-100" />
                </div>
                <div className="text-lg font-black text-white font-mono mt-1">{trainingSummary.postCount} Ders ({trainingSummary.postHours} Sa)</div>
                <div className="text-[9px] text-[#DDF4F7] mt-1 font-bold">Akademi Listesi →</div>
              </div>

              <div
                onClick={() => handleOpenSummaryModal('prior')}
                className="bg-white/10 hover:bg-white/20 p-3.5 rounded-2xl border border-white/15 backdrop-blur-xs transition-all cursor-pointer group hover:scale-105"
              >
                <div className="text-[10px] font-bold text-gray-300 uppercase flex items-center justify-center space-x-1">
                  <span>İşe Başlamadan Önce</span>
                  <ExternalLink className="w-3 h-3 text-white opacity-80 group-hover:opacity-100" />
                </div>
                <div className="text-lg font-black text-white font-mono mt-1">{trainingSummary.priorCount} Ders ({trainingSummary.priorHours} Sa)</div>
                <div className="text-[9px] text-[#DDF4F7] mt-1 font-bold">Harici Liste →</div>
              </div>

            </div>
          </div>

          {/* SECTION 1: DAHA ÖNCE ÇALIŞTIĞI FİRMALAR VE SÜRELERİ */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md space-y-4">
            <h3 className="font-extrabold text-base text-[#0B2A4A] flex items-center space-x-2 border-b border-gray-100 pb-3">
              <Building className="w-5 h-5 text-[#087F96]" />
              <span>Daha Önce Çalıştığı Firmalar ve Hizmet Süreleri</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeEmployee.previousExperiences.map((exp, idx) => (
                <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-1.5 hover:border-[#087F96] transition-all">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-xs text-[#0B2A4A]">{exp.companyName}</h4>
                    <span className="text-[10px] font-mono font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-md">
                      {exp.yearsRange}
                    </span>
                  </div>
                  <div className="text-xs text-gray-700 font-bold">{exp.role}</div>
                  <div className="text-[11px] text-emerald-700 font-mono font-bold">
                    Çalışma Süresi: {exp.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: MEVCUT İŞYERİNDEN ÖNCE ALDIĞI EĞİTİMLER */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md space-y-4">
            <h3 className="font-extrabold text-base text-[#0B2A4A] flex items-center space-x-2 border-b border-gray-100 pb-3">
              <History className="w-5 h-5 text-[#087F96]" />
              <span>Mevcut İşyerinden Önce Aldığı Harici Eğitimler ({activeEmployee.priorTrainings.length} Ders)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeEmployee.priorTrainings.map((pt, idx) => (
                <div key={idx} className="p-4 bg-blue-50/50 border border-blue-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-xs text-[#0B2A4A]">{pt.title}</h4>
                    <span className="text-[10px] font-mono font-bold text-[#087F96] bg-blue-100 px-2 py-0.5 rounded-md">
                      {pt.year}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-xs text-gray-700">
                    <div>Eğitimi Veren Eğitmen: <strong className="text-[#0B2A4A]">{pt.instructorName}</strong></div>
                    <div>Veren Kurum / Akademi: <strong className="text-[#087F96]">{pt.institution}</strong></div>
                    <div>Çalıştığı Şirket: <strong className="text-emerald-800">{pt.companyWhereTaken}</strong></div>
                  </div>

                  <div className="text-[11px] text-blue-900 font-mono font-bold pt-1 border-t border-blue-100">
                    Eğitim Süresi: {pt.durationHours} Saat
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: İŞE BAŞLADIKTAN SONRA ŞİRKET İÇİ ALDIĞI EĞİTİMLER VE PUANLARI */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-base text-[#0B2A4A] flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-[#087F96]" />
                <span>İşe Başladıktan Sonra Şirket İçi Akademi Aldığı Eğitimler ({activeEmployee.completedTrainings.length} Ders)</span>
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
                    <th className="py-3 px-4">Eğitmeni</th>
                    <th className="py-3 px-4">Kurum / Akademi</th>
                    <th className="py-3 px-4">Çalıştığı Şirket</th>
                    <th className="py-3 px-4 font-mono">Süre / Tarih</th>
                    <th className="py-3 px-4 text-center rounded-r-xl">Sınav Puanı</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {activeEmployee.completedTrainings.map((tr, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#0B2A4A]">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>{tr.courseTitle}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-800 font-bold">{tr.instructorName}</td>
                      <td className="py-3.5 px-4 text-[#087F96] font-bold">{tr.institution}</td>
                      <td className="py-3.5 px-4 text-emerald-800 font-medium">{tr.companyWhereTaken}</td>
                      <td className="py-3.5 px-4 font-mono text-gray-500">
                        {tr.duration} • {tr.completedDate}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-lg font-mono font-black text-xs ${
                          tr.score >= 95 
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : tr.score >= 90
                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}>
                          %{tr.score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 360-DEGREE EVALUATION & REVIEW PANEL */}
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

      {/* DETAILED TRAINING SUMMARY BREAKDOWN MODAL (ÖZET KARTLARINA TIKLANDIĞINDA AÇILAN DETAY MODALI) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden relative animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white p-6 relative flex-shrink-0 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-amber-300" />
                  <h3 className="text-lg font-black text-white">
                    {activeEmployee.name} — Detaylı Eğitim & Eğitmen Dökümü
                  </h3>
                </div>
                <p className="text-xs text-gray-200">
                  {modalFilterType === 'post' ? 'Şirket İçi Akademi Eğitimleri' : modalFilterType === 'prior' ? 'İşe Başlamadan Önceki Harici Eğitimler' : 'Tüm Şirket İçi ve Harici Eğitimler'} ({combinedTrainingsList.length} Ders • Toplam {combinedTrainingsList.reduce((s, c) => s + c.durationHours, 0)} Saat)
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Table */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200 text-xs text-[#0B2A4A] flex items-center space-x-2">
                <Info className="w-4 h-4 text-[#087F96] flex-shrink-0" />
                <span>
                  Bu listede çalışanın aldığı eğitimin adı, süresi, <strong>eğitimi veren eğitmeni</strong>, <strong>veren kurum/akademi</strong> ve <strong>eğitimin alındığı şirket dönemi</strong> detaylı olarak sunulmuştur.
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0B2A4A] text-white font-bold uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Eğitim / Ders Adı</th>
                      <th className="py-3 px-4">Eğitimi Veren Eğitmen</th>
                      <th className="py-3 px-4">Veren Kurum / Akademi</th>
                      <th className="py-3 px-4">Alındığı Şirket</th>
                      <th className="py-3 px-4 font-mono">Süresi</th>
                      <th className="py-3 px-4 text-center">Durum / Skoru</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                    {combinedTrainingsList.map((tr) => (
                      <tr key={tr.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#0B2A4A]">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            <span>{tr.title}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-gray-800">{tr.instructorName}</td>
                        <td className="py-3.5 px-4 font-bold text-[#087F96]">{tr.institution}</td>
                        <td className="py-3.5 px-4 text-emerald-900 font-bold">{tr.companyWhereTaken}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-gray-600">{tr.durationText}</td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="px-2.5 py-1 rounded-lg font-mono font-bold text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-300">
                            {tr.scoreOrBadge}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 border-t border-gray-200 p-4 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Toplam gösterilen eğitim: <strong>{combinedTrainingsList.length} Modül</strong>
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 bg-[#0B2A4A] text-white font-bold rounded-xl text-xs hover:bg-[#061B33]"
              >
                Kapat
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
