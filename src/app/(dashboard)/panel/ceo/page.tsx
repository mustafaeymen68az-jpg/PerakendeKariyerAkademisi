'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ExecutiveDashboard from '@/components/ExecutiveDashboard';
import EnterpriseROICalculator from '@/components/EnterpriseROICalculator';
import {
  Crown,
  TrendingUp,
  Building2,
  Users,
  Award,
  ShieldAlert,
  BarChart3,
  Calculator,
  FileText,
  Sparkles,
  DollarSign,
  Coins,
  CheckCircle2,
  Download,
  ArrowUpRight,
  UserCheck,
  X,
  Target,
  BadgeCheck,
  Clock,
  Star,
  Briefcase,
  QrCode,
  ShieldCheck,
  AlertTriangle,
  Zap,
  MessageSquareQuote,
  CheckSquare,
  GraduationCap,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface CareerTimelineStep {
  year: string;
  title: string;
  company: string;
  type: 'PREVIOUS' | 'JOIN' | 'PROMOTION' | 'GOAL';
  description: string;
}

interface CertificateItem {
  title: string;
  code: string;
  date: string;
  issuer: string;
}

interface BadgeItem {
  title: string;
  icon: string;
  category: string;
  earnedDate: string;
}

interface SWOTMatrix {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

interface ManagerAssessment {
  managerName: string;
  managerTitle: string;
  managerComments: string;
  developmentAreas: string[];
  weaknesses: string[];
}

interface ExecutiveBoardAssessment {
  committeeDecision: string;
  committeeApprovalRate: number;
  executiveNote: string;
  retentionRecommendation: string;
}

interface CompletedCourseDetail {
  title: string;
  durationHours: number;
  score: number;
  grade: string;
  completedDate: string;
  category: string;
}

interface RecommendedCourseItem {
  title: string;
  durationHours: number;
  priority: 'KRİTİK GELİŞİM' | 'ZORUNLU LİDERLİK' | 'SEÇMELİ MODÜL';
  priorityColor: string;
  skillImpact: string;
  reason: string;
}

interface ExecutiveCandidate {
  id: string;
  name: string;
  score: number;
  readiness: string;
  readinessBadgeColor: string;
  currentRole: string;
  targetRole: string;
  branch: string;
  tenure: string;
  timeline: CareerTimelineStep[];
  achievements: string[];
  competencies: { name: string; score: number }[];
  courses: string[];
  completedCoursesDetails: CompletedCourseDetail[];
  recommendedCourses: RecommendedCourseItem[];
  certificates: CertificateItem[];
  badges: BadgeItem[];
  swot: SWOTMatrix;
  managerAssessment: ManagerAssessment;
  executiveBoardAssessment: ExecutiveBoardAssessment;
}

const EXECUTIVE_CANDIDATES: Record<string, ExecutiveCandidate> = {
  'selin': {
    id: 'selin',
    name: 'Selin Yılmaz',
    score: 96,
    readiness: 'HEMEN HAZIR (READY NOW)',
    readinessBadgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    currentRole: 'Kadıköy Şube Müdür Yrd.',
    targetRole: 'Mağaza Müdürü',
    branch: 'Kadıköy Premium Şubesi (Marmara Bölgesi)',
    tenure: '3 Yıl 8 Ay',
    timeline: [
      {
        year: '2019 - 2022',
        title: 'Kasiyer & Reyon Sorumlusu',
        company: 'Migros Ticaret A.Ş.',
        type: 'PREVIOUS',
        description: 'Önceki İş Yeri • Perakende temel kasa ve operasyon deneyimi.'
      },
      {
        year: '15 Ocak 2023',
        title: 'Reyon Sorumlusu',
        company: 'PKA (Kadıköy Şubesi)',
        type: 'JOIN',
        description: 'Şirkete İşe Başlangıç • %88 Giriş Yetkinlik Puanı.'
      },
      {
        year: '10 Ağustos 2024',
        title: 'Mağaza Müdür Yardımcısı',
        company: 'Kadıköy Şubesi',
        type: 'PROMOTION',
        description: 'Şirket İçi 1. Terfi • %96 Hazırlık Skoru ile Atama.'
      },
      {
        year: 'Hedef 2026',
        title: 'Mağaza Müdürü',
        company: 'Kadıköy Premium Şubesi',
        type: 'GOAL',
        description: 'Gelecek Kariyer Hedefi • %96 Hazır (Komite Onayında).'
      }
    ],
    achievements: [
      'Ciro Büyümesi: +%18.4 ile Şube Ciro Rekortmeni',
      'Fire Oranı: %1.2 ile Bölgenin En Düşük Fire Başarısı',
      'Müşteri Memnuniyeti (CSAT): 4.9 / 5.0 Üst Üste 4 Çeyrek',
      'Terfi Komitesi Değerlendirmesi: %96 Tam Not Onayı'
    ],
    competencies: [
      { name: 'P&L Bütçe & Finans Yönetimi', score: 98 },
      { name: 'Ekip Liderliği & Süreç Yönetimi', score: 95 },
      { name: 'Fire Minimizasyonu & Marj Artırımı', score: 96 },
      { name: 'Kriz Yönetimi & Saha Audit', score: 94 }
    ],
    courses: [
      'P&L Mağaza Bütçe Yönetimi Uzmanlığı',
      'Ekip Liderliği & Süreç Yönetimi',
      'Fire Minimizasyonu & Marj Artırımı',
      'Kriz Yönetimi & Saha Audit'
    ],
    completedCoursesDetails: [
      { title: 'P&L Mağaza Bütçe Yönetimi Uzmanlığı', durationHours: 32, score: 98, grade: 'PKA Derece', completedDate: '14 Mayıs 2025', category: 'FİNANS & YÖNETİM' },
      { title: 'Ekip Liderliği & Süreç Yönetimi', durationHours: 24, score: 96, grade: 'Üstün Başarı', completedDate: '22 Mart 2025', category: 'LİDERLİK' },
      { title: 'Fire Minimizasyonu & Marj Artırımı', durationHours: 16, score: 95, grade: 'PKA Başarı', completedDate: '10 Ağustos 2024', category: 'OPERASYON' },
      { title: 'Perakende Saha Auditi & Kriz Yönetimi', durationHours: 20, score: 94, grade: 'Tamamlandı', completedDate: '18 Ocak 2024', category: 'SAHA YÖNETİMİ' }
    ],
    recommendedCourses: [
      {
        title: 'Çoklu Mağaza Lojistik & Tedarik Zinciri Yönetimi',
        durationHours: 24,
        priority: 'KRİTİK GELİŞİM',
        priorityColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        skillImpact: 'Lojistik ve sevkiyat yetkinliğini %82\'den %95\'e yükseltir.',
        reason: 'Bağlı yöneticisinin belirttiği lojistik gelişim ihtiyacını karşılamak için.'
      },
      {
        title: 'P&L İleri Seviye Kurumsal Yıl Sonu Tahminleme',
        durationHours: 16,
        priority: 'ZORUNLU LİDERLİK',
        priorityColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        skillImpact: 'Finansal bütçeleme hassasiyetini %98 seviyesine ulaştırır.',
        reason: 'Mağaza Müdürü kadrosu bütçe onay yetkisi için zorunlu modül.'
      },
      {
        title: 'Ekip İçi Delegasyon & İleri Zaman Yönetimi',
        durationHours: 12,
        priority: 'SEÇMELİ MODÜL',
        priorityColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        skillImpact: 'Görev delegasyonu ve ekip zaman yönetimini güçlendirir.',
        reason: 'Delegasyon geliştirme tavsiyesi doğrultusunda eklenmiştir.'
      }
    ],
    certificates: [
      { title: 'PKA Resmi Mağaza Yönetimi & P&L Bütçeleme Sertifikası', code: 'PKA-2025-9841', date: '14 Mayıs 2025', issuer: 'PKA Kurumsal Akademi' },
      { title: 'Saha Auditi & Fire Minimizasyonu Uzmanlık Sertifikası', code: 'PKA-2024-8120', date: '10 Ağustos 2024', issuer: 'PKA Operasyon Direktörlüğü' },
      { title: 'Liderlik ve Müşteri İlişkileri Sertifikası', code: 'PKA-2023-4412', date: '12 Aralık 2023', issuer: 'PKA Yetenek Yönetimi' }
    ],
    badges: [
      { title: 'Bölge Ciro Rekortmeni', icon: '🏆', category: 'PERFORMANS', earnedDate: '30 Haziran 2025' },
      { title: 'Sıfır Fire Ustalık Rozeti', icon: '⚡', category: 'OPERASYON', earnedDate: '15 Ağustos 2024' },
      { title: 'Akademi Derece Rozeti', icon: '🎓', category: 'EĞİTİM', earnedDate: '14 Mayıs 2025' },
      { title: '4.9 CSAT Müşteri Yıldızı', icon: '⭐', category: 'MEMNUNİYET', earnedDate: '10 Ocak 2025' }
    ],
    swot: {
      strengths: [
        'P&L bütçe disiplini ve finansal marj hakimiyeti (%98 skor)',
        'Ekip içi yüksek moral ve %0 turnover yönetimi',
        'Kriz anında hızlı karar alma ve saha audit uzmanlığı'
      ],
      weaknesses: [
        'Çoklu mağaza lojistik rotalama tecrübesi geliştirilebilir (Modül atandı)'
      ],
      opportunities: [
        'Kadıköy Premium Mağaza Müdürlüğü kadrosuna hemen atanma',
        'Bölgesel iç eğitmen ve mentor lider olma potansiyeli'
      ],
      threats: [
        'Sektör içi rakip firmalardan üst seviye transfer teklifi alma riski'
      ]
    },
    managerAssessment: {
      managerName: 'Ahmet Sevim',
      managerTitle: 'Kadıköy Mağaza Müdürü',
      managerComments: 'Selin, mağaza içi operasyon ve ciro hedeflerinde son 1.5 yıldır olağanüstü bir disiplin gösteriyor. Kasa hattı sıkışıklığında ve kriz anlarında soğukkanlı yönetimi harika. Mağaza müdürlüğüne %100 hazırdır.',
      developmentAreas: [
        'Çoklu mağaza lojistik ve tedarik zinciri koordinasyonu',
        'P&L bütçelemesinde yıl sonu kurumsal tahminleme simülasyonu'
      ],
      weaknesses: [
        'Yüksek mükemmeliyetçilik sebebiyle bazen küçük detay işlerini delege etmekte zorlanıyor (Delegasyon eğitimi tanımlandı)'
      ]
    },
    executiveBoardAssessment: {
      committeeDecision: 'Terfiye %100 Uygundur • Kadıköy Premium Mağaza Müdürlüğü Atama Onayı',
      committeeApprovalRate: 96,
      executiveNote: 'Selin Yılmaz, kurumsal kültürümüzü en iyi temsil eden genç liderlerimizdendir. İlk 90 günlük mağaza müdürlüğü performansında %95 üzeri başarı beklenmektedir.',
      retentionRecommendation: 'Rakip firma transfer tekliflerine karşı Retansiyon Paket Primi ve Hızlı Terfi Sözleşmesi tanımlanmıştır.'
    }
  },
  'ahmet': {
    id: 'ahmet',
    name: 'Ahmet Can Demir',
    score: 94,
    readiness: '6 AY İÇİNDE HAZIR',
    readinessBadgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    currentRole: 'Beşiktaş Kasa Şefi / Kıdemli Kasiyer',
    targetRole: 'Mağaza Müdür Yardımcısı',
    branch: 'Beşiktaş Çarşı Şubesi (Marmara Bölgesi)',
    tenure: '2 Yıl 4 Ay',
    timeline: [
      {
        year: '2020 - 2023',
        title: 'Kasiyer',
        company: 'CarrefourSA',
        type: 'PREVIOUS',
        description: 'Önceki İş Yeri • Kasa hattı operasyonu.'
      },
      {
        year: '10 Nisan 2024',
        title: 'Kasiyer',
        company: 'PKA (Beşiktaş Şubesi)',
        type: 'JOIN',
        description: 'Şirkete İşe Başlangıç • %85 Giriş Notu.'
      },
      {
        year: '20 Ocak 2025',
        title: 'Kasa Şefi / Eğitmen',
        company: 'Beşiktaş Çarşı Şubesi',
        type: 'PROMOTION',
        description: 'Şirket İçi 1. Terfi • 12 Kasiyer Oryantasyon Eğitmeni.'
      },
      {
        year: 'Hedef 2026',
        title: 'Mağaza Müdür Yardımcısı',
        company: 'Marmara Bölge Şubeleri',
        type: 'GOAL',
        description: 'Gelecek Kariyer Hedefi • %94 Hazır (6 Ay İçerisinde Atama).'
      }
    ],
    achievements: [
      'Kasa İşlem Hızı: %98.2 (Marmara Bölge 1.\'si)',
      'Z-Raporu Mutabakat Uyum Oranı: %100 Tam İsabet',
      'Aday Personel Oryantasyonu: 12 Kasiyer Yetiştirdi',
      'Müşteri Şikayeti Anında Çözüm Skoru: %96'
    ],
    competencies: [
      { name: 'Kasa Sistemleri & Gün Sonu Mutabakatı', score: 99 },
      { name: 'Müşteri İlişkileri & Şikâyet Yönetimi', score: 94 },
      { name: 'Reyon Düzeni & 5S Protokolü', score: 92 },
      { name: 'Aday Personel Eğitmenliği', score: 91 }
    ],
    courses: [
      'Kasa Sistemleri & Gün Sonu Mutabakatı',
      'Müşteri İlişkileri & Şikayet Yönetimi',
      'Reyon Düzeni & 5S Protokolü',
      'Aday Personel Oryantasyon Eğitmenliği'
    ],
    completedCoursesDetails: [
      { title: 'Kasa Sistemleri & Gün Sonu Mutabakatı', durationHours: 28, score: 99, grade: 'Bölge 1.\'si', completedDate: '20 Ocak 2025', category: 'KASA HATTI' },
      { title: 'Müşteri İlişkileri & Şikayet Yönetimi', durationHours: 16, score: 94, grade: 'Üstün Başarı', completedDate: '15 Kasım 2024', category: 'MÜŞTERİ HİZMETLERİ' },
      { title: 'Reyon Düzeni & 5S Saha Protokolü', durationHours: 12, score: 92, grade: 'Tamamlandı', completedDate: '10 Eylül 2024', category: 'MAĞAZA OPERASYON' },
      { title: 'Aday Personel Oryantasyon Eğitmenliği', durationHours: 20, score: 96, grade: 'Eğitmen Sertifikalı', completedDate: '05 Haziran 2024', category: 'ORYANTASYON' }
    ],
    recommendedCourses: [
      {
        title: 'Reyon Mal Kabul & Tedarikçi İrsaliye Kontrolü',
        durationHours: 20,
        priority: 'KRİTİK GELİŞİM',
        priorityColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        skillImpact: 'Mal kabul ve stok giriş yetkinliğini %95 seviyesine getirir.',
        reason: 'Müdür Yardımcılığı terfisi için zorunlu saha modülü.'
      },
      {
        title: 'Zor Müşteri İletişimi & Saha Kriz Simülasyonu',
        durationHours: 16,
        priority: 'ZORUNLU LİDERLİK',
        priorityColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        skillImpact: 'Kriz anında şikayet çözüm hızını %99\'a çıkarır.',
        reason: 'Mağaza içi müşteri ilişkileri yönetimi için.'
      },
      {
        title: 'İş-Yaşam Dengesi & Stres Yönetimi Koçluğu',
        durationHours: 8,
        priority: 'SEÇMELİ MODÜL',
        priorityColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        skillImpact: 'Yoğun tempoda tükenmişliği önler ve mola disiplini sağlar.',
        reason: 'Yöneticisinin tavsiyesi doğrultusunda kişisel gelişim.'
      }
    ],
    certificates: [
      { title: 'Kasa Sistemleri & Gün Sonu Mutabakat Sertifikası', code: 'PKA-2025-3312', date: '20 Ocak 2025', issuer: 'PKA Kasa Akademisi' },
      { title: 'Müşteri Kriz Yönetimi Uzmanlık Sertifikası', code: 'PKA-2024-1109', date: '15 Kasım 2024', issuer: 'PKA İletişim Birimi' },
      { title: 'İç Eğitmen Oryantasyon Sertifikası', code: 'PKA-2024-7712', date: '05 Haziran 2024', issuer: 'PKA Yetenek Yönetimi' }
    ],
    badges: [
      { title: 'Bölge Kasa Hızı 1.\'si', icon: '🥇', category: 'PERFORMANS', earnedDate: '28 Şubat 2025' },
      { title: 'Yılın İç Eğitmen Rozeti', icon: '👨‍🏫', category: 'EĞİTİM', earnedDate: '10 Aralık 2024' },
      { title: '%100 Z-Raporu Uyum Rozeti', icon: '🎯', category: 'OPERASYON', earnedDate: '20 Ocak 2025' }
    ],
    swot: {
      strengths: [
        'Hatasız gün sonu mutabakatı ve yüksek kasa işlem hızı (%99)',
        '12 yeni personeli başarıyla yetiştiren sabırlı iç eğitmen koçluğu'
      ],
      weaknesses: [
        'Reyon satın alma ve tedarik süreçleri geliştirilmeli (Eğitim tanımlandı)'
      ],
      opportunities: [
        'Mağaza Müdür Yardımcılığı pozisyonuna 6 ay içinde geçiş'
      ],
      threats: [
        'Yoğun şube trafiğinde tükenmişlik riski (Koçluk takibinde)'
      ]
    },
    managerAssessment: {
      managerName: 'Turgut Alkan',
      managerTitle: 'Beşiktaş Çarşı Mağaza Müdürü',
      managerComments: 'Ahmet Can, kasa işlem hızı ve Z-raporu mutabakatında bölge birincimizdir. Ayrıca yeni başlayan 12 kasiyeri sabırla eğiterek mağazamızın kalitesini artırdı.',
      developmentAreas: [
        'Reyon mal kabul ve tedarikçi irsaliye kontrol süreçleri',
        'Zor müşteri yönetimi uygulamalı koçluğu'
      ],
      weaknesses: [
        'Yoğun tempo anında aşırı efor sarf etmesi ve mola sürelerini es geçmesi (İş-yaşam dengesi takibi önerildi)'
      ]
    },
    executiveBoardAssessment: {
      committeeDecision: '6 Ay İçerisinde Mağaza Müdür Yardımcılığına Terfiye Uygundur',
      committeeApprovalRate: 94,
      executiveNote: 'Ahmet Can\'ın iç eğitmenlik başarısı ve hatasız kasa yönetimi takdire şayandır. 6 aylık gelişim modülü sonrası ataması yapılacaktır.',
      retentionRecommendation: 'Kıdemli Kasiyer & İç Eğitmen Prim Seviyesine Yükseltilmiştir.'
    }
  },
  'caner': {
    id: 'caner',
    name: 'Caner Kaya',
    score: 95,
    readiness: '1 YIL İÇİNDE HAZIR',
    readinessBadgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    currentRole: 'Tunalı Mağaza Müdürü',
    targetRole: 'Bölge Müdürü (İç Anadolu)',
    branch: 'Tunalı Hilmi Şubesi (İç Anadolu Bölgesi)',
    tenure: '4 Yıl 6 Ay',
    timeline: [
      {
        year: '2017 - 2021',
        title: 'Mağaza Müdür Yrd.',
        company: 'BİM Birleşik Mağazalar',
        type: 'PREVIOUS',
        description: 'Önceki İş Yeri • Mağaza operasyon yönetimi.'
      },
      {
        year: '15 Şubat 2022',
        title: 'Mağaza Müdürü',
        company: 'PKA (Tunalı Şubesi)',
        type: 'JOIN',
        description: 'Şirkete İşe Başlangıç • Tunalı Şube Yönetimi.'
      },
      {
        year: '15 Temmuz 2024',
        title: 'Kıdemli Mağaza Müdürü & Mentor',
        company: 'Tunalı Hilmi Şubesi',
        type: 'PROMOTION',
        description: 'Şirket İçi 1. Terfi • 5 Müdür Yrd. Yetiştirdi.'
      },
      {
        year: 'Hedef 2026',
        title: 'Bölge Müdürü',
        company: 'İç Anadolu Bölge Müdürlüğü',
        type: 'GOAL',
        description: 'Gelecek Kariyer Hedefi • %95 Hazır (Bölge Yönetim Adayı).'
      }
    ],
    achievements: [
      'Yıllık Mağaza Cirosu: ₺24.8M (+%22 Büyüme Başarısı)',
      'İç Yönetici Yetiştirme: 5 Müdür Yardımcısı Terfi Ettirdi',
      'Turnover Oranı: %6.8 ile Şirketin En Düşük Turnover\'ı',
      'LMS Akademi Katılım: %98 Personel Tamamlama'
    ],
    competencies: [
      { name: 'Çoklu Mağaza Operasyon Yönetimi', score: 96 },
      { name: 'Bölgesel Ciro & Pazar Payı Stratejisi', score: 95 },
      { name: 'Yöneticinin Koçluk & Liderlik Rolü', score: 94 },
      { name: 'Bölge İK & Yetenek Yedekleme Planı', score: 95 }
    ],
    courses: [
      'Çoklu Mağaza Operasyon Yönetimi',
      'Bölgesel Ciro ve Pazar Payı Stratejileri',
      'Yöneticinin Koçluk Rolü',
      'Bölge İK ve Yetenek Yedekleme'
    ],
    completedCoursesDetails: [
      { title: 'Çoklu Mağaza Operasyon Yönetimi', durationHours: 40, score: 96, grade: 'Üst Düzey Yönetim', completedDate: '15 Temmuz 2024', category: 'BÖLGE YÖNETİMİ' },
      { title: 'Bölgesel Ciro ve Pazar Payı Stratejileri', durationHours: 32, score: 95, grade: 'PKA Liderlik', completedDate: '10 Kasım 2023', category: 'FİNANS & STRATEJİ' },
      { title: 'Yöneticinin Koçluk & Mentorluk Rolü', durationHours: 24, score: 94, grade: 'Üstün Başarı', completedDate: '05 Eylül 2022', category: 'LİDERLİK KOÇLUĞU' },
      { title: 'Bölge İK & Yetenek Yedekleme Planı', durationHours: 20, score: 95, grade: 'Tamamlandı', completedDate: '12 Ocak 2023', category: 'YETENEK PLANLAMA' }
    ],
    recommendedCourses: [
      {
        title: 'E-Ticaret Omni-Channel Operasyon Entegrasyonu',
        durationHours: 32,
        priority: 'KRİTİK GELİŞİM',
        priorityColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        skillImpact: 'Dijital sipariş ve omnichannel hakimiyetini %96\'ya çıkarır.',
        reason: 'Bölge Müdürlüğü dijital dönüşüm gereksinimi.'
      },
      {
        title: 'Çoklu Bölge Pazar Payı & Rekabet Analizi',
        durationHours: 24,
        priority: 'ZORUNLU LİDERLİK',
        priorityColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        skillImpact: 'Bölgesel ciro stratejileri ve rakip analizini güçlendirir.',
        reason: 'Bölge Müdürü adayı stratejik modülü.'
      },
      {
        title: 'Üst Düzey Yönetim Kurumsal İletişimi & Sunum Teknikleri',
        durationHours: 16,
        priority: 'SEÇMELİ MODÜL',
        priorityColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        skillImpact: 'Yönetim kurulu sunum ve liderlik iletişimini geliştirir.',
        reason: 'Genel müdür aday havuzu hazırlık programı.'
      }
    ],
    certificates: [
      { title: 'Çoklu Mağaza ve Bölge Yönetim Sertifikası', code: 'PKA-2024-9901', date: '15 Temmuz 2024', issuer: 'PKA Üst Yönetim Akademi' },
      { title: 'P&L ve Finansal Strateji Sertifikası', code: 'PKA-2023-8812', date: '10 Kasım 2023', issuer: 'PKA Finans Direktörlüğü' },
      { title: 'Yöneticinin Koçluk & Mentorluk Sertifikası', code: 'PKA-2022-4411', date: '05 Eylül 2022', issuer: 'PKA İK Kurulu' }
    ],
    badges: [
      { title: '₺24.8M Yıllık Ciro Lideri', icon: '👑', category: 'PERFORMANS', earnedDate: '31 Aralık 2025' },
      { title: '5 Müdür Yardımcısı Yetiştiren Mentor', icon: '👥', category: 'LİDERLİK', earnedDate: '15 Temmuz 2024' },
      { title: '%6.8 Şirket En Düşük Turnover', icon: '🛡️', category: 'RETANSİYON', earnedDate: '10 Ekim 2024' }
    ],
    swot: {
      strengths: [
        'Yıllık ₺24.8M ciro yönetimi ve %6.8 düşük turnover rekoru',
        '5 yeni müdür yardımcısı yetiştiren güçlü mentorluk altyapısı'
      ],
      weaknesses: [
        'Dijital e-ticaret ve omni-channel operasyon hakimiyeti (Eğitim tanımlandı)'
      ],
      opportunities: [
        'İç Anadolu Bölge Müdürlüğü pozisyonuna atanma imkânı'
      ],
      threats: [
        'Bölgesel rekabette agresif rakip mağaza açılış baskısı'
      ]
    },
    managerAssessment: {
      managerName: 'Zeynep Karahan',
      managerTitle: 'Marmara & İç Anadolu Bölge Direktörü',
      managerComments: 'Caner, Tunalı mağazasında ₺24.8M ciroya ulaşarak yılın en başarılı mağaza müdürü oldu. Yetiştirdiği 5 müdür yardımcısı şu an farklı mağazaları yönetiyor.',
      developmentAreas: [
        'E-ticaret omni-channel operasyon entegrasyonu',
        'Çoklu bölge pazar payı analitik araçları'
      ],
      weaknesses: [
        'Bölgesel rekabette agresif büyüme aşamasında dijital pazarlama araçlarına hakimiyeti artırılmalı'
      ]
    },
    executiveBoardAssessment: {
      committeeDecision: 'İç Anadolu Bölge Müdürlüğü Pozisyonuna Terfi Adayı',
      committeeApprovalRate: 95,
      executiveNote: 'Caner Kaya, bölgesel büyüme stratejimizde lider adayımızdır. Bölge müdürlüğü mülakatı tamamlanmıştır.',
      retentionRecommendation: 'Üst Düzey Yönetici Hisse / Ciro Primi Paketi Tanımlanmıştır.'
    }
  }
};

interface KpiMonthlyData {
  month: string;
  value: number;
  formatted: string;
}

interface StrategicKpi {
  id: string;
  name: string;
  val: string;
  unit: string;
  trend: string;
  color: string;
  description: string;
  inverseMetric?: boolean;
  monthlyData: KpiMonthlyData[];
}

interface PromotedExecutiveRecord {
  id: string;
  name: string;
  avatar: string;
  previousRole: string;
  newRole: string;
  branch: string;
  department: string;
  region: string;
  monthCode: string;
  promotionDate: string;
  academyScore: number;
  grade: string;
  status: string;
}

const PROMOTED_EXECUTIVES_LIST: PromotedExecutiveRecord[] = [
  {
    id: 'prom-1',
    name: 'Selin Yılmaz',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    previousRole: 'Kadıköy Şube Müdür Yrd.',
    newRole: 'Kadıköy Premium Mağaza Müdürü',
    branch: 'Kadıköy Şubesi',
    department: 'Mağaza Operasyonları',
    region: 'Marmara Bölgesi',
    monthCode: 'Ağu 26',
    promotionDate: 'Ağustos 2026',
    academyScore: 98,
    grade: 'PKA Derece',
    status: 'Yönetim Kurulu Onayladı ✅'
  },
  {
    id: 'prom-2',
    name: 'Caner Kaya',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    previousRole: 'Tunalı Mağaza Müdürü',
    newRole: 'İç Anadolu Bölge Operasyon Müdürü',
    branch: 'Ankara Merkez Şubesi',
    department: 'Saha Direktörlüğü',
    region: 'İç Anadolu Bölgesi',
    monthCode: 'Tem 26',
    promotionDate: 'Temmuz 2026',
    academyScore: 96,
    grade: 'Üst Düzey Yönetim',
    status: 'CEO Onayı İle Atandı 👑'
  },
  {
    id: 'prom-3',
    name: 'Merve Şahin',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    previousRole: 'İzmir Taze Gıda Reyon Şefi',
    newRole: 'Ege Bölgesi Taze Gıda Kategori Müdürü',
    branch: 'İzmir Alsancak Şubesi',
    department: 'Taze Gıda & Satın Alma',
    region: 'Ege Bölgesi',
    monthCode: 'Haz 26',
    promotionDate: 'Haziran 2026',
    academyScore: 95,
    grade: 'Kategori Uzmanı',
    status: 'Atama Onaylandı ✅'
  },
  {
    id: 'prom-4',
    name: 'Mehmet Yılmaz',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    previousRole: 'Bursa Nilüfer Müdür Yrd.',
    newRole: 'Bursa Nilüfer Mağaza Müdürü',
    branch: 'Nilüfer Şubesi',
    department: 'Mağaza Operasyonları',
    region: 'Güney Marmara',
    monthCode: 'May 26',
    promotionDate: 'Mayıs 2026',
    academyScore: 93,
    grade: 'PKA Başarı',
    status: 'Yönetim Onaylı ✅'
  },
  {
    id: 'prom-5',
    name: 'Zeynep Karahan',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    previousRole: 'Kıdemli Mağaza Müdürü',
    newRole: 'Marmara Bölge Saha Direktör Yardımcısı',
    branch: 'Marmara Genel Merkez',
    department: 'Saha Direktörlüğü',
    region: 'Marmara Bölgesi',
    monthCode: 'Nis 26',
    promotionDate: 'Nisan 2026',
    academyScore: 97,
    grade: 'PKA Derece',
    status: 'İcra Kurulu Onaylı 👑'
  },
  {
    id: 'prom-6',
    name: 'Burak Arslan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    previousRole: 'Antalya Lara Mağaza Şefi',
    newRole: 'Antalya Lara Mağaza Müdür Yardımcısı',
    branch: 'Lara Şubesi',
    department: 'Mağaza Operasyonları',
    region: 'Akdeniz Bölgesi',
    monthCode: 'Mar 26',
    promotionDate: 'Mart 2026',
    academyScore: 92,
    grade: 'PKA Başarı',
    status: 'Bölge Müdürü Onayladı ✅'
  },
  {
    id: 'prom-7',
    name: 'Volkan Şen',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    previousRole: 'Adana Çukurova Şube Müdür Yrd.',
    newRole: 'Adana Çukurova Mağaza Müdürü',
    branch: 'Çukurova Şubesi',
    department: 'Mağaza Operasyonları',
    region: 'Akdeniz Bölgesi',
    monthCode: 'Mar 26',
    promotionDate: 'Mart 2026',
    academyScore: 94,
    grade: 'Üstün Başarı',
    status: 'Atama Onaylandı ✅'
  },
  {
    id: 'prom-8',
    name: 'Elif Deniz',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    previousRole: 'Eskişehir Kasa Sorumlusu',
    newRole: 'Eskişehir Şube Kasa Operasyon Şefi',
    branch: 'Eskişehir Espark Şubesi',
    department: 'Kasa Operasyonları',
    region: 'İç Anadolu Bölgesi',
    monthCode: 'Şub 26',
    promotionDate: 'Şubat 2026',
    academyScore: 91,
    grade: 'PKA Başarı',
    status: 'Atama Onaylandı ✅'
  },
  {
    id: 'prom-9',
    name: 'Oğuzhan Çelik',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    previousRole: 'Kayseri Taze Gıda Sorumlusu',
    newRole: 'İç Anadolu Taze Gıda Saha Şefi',
    branch: 'Kayseri Şubesi',
    department: 'Taze Gıda & Satın Alma',
    region: 'İç Anadolu Bölgesi',
    monthCode: 'Oca 26',
    promotionDate: 'Ocak 2026',
    academyScore: 95,
    grade: 'Üstün Başarı',
    status: 'Bölge Müdürü Onayladı ✅'
  },
  {
    id: 'prom-10',
    name: 'Deniz Soylu',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    previousRole: 'Kadıköy Satış Temsilcisi',
    newRole: 'Kadıköy Kategori Şefi',
    branch: 'Kadıköy Şubesi',
    department: 'Mağaza Operasyonları',
    region: 'Marmara Bölgesi',
    monthCode: 'Ara 25',
    promotionDate: 'Aralık 2025',
    academyScore: 89,
    grade: 'PKA Başarı',
    status: 'Atama Onaylandı ✅'
  },
  {
    id: 'prom-11',
    name: 'Fatih Yıldırım',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    previousRole: 'Bodrum Şube Şefi',
    newRole: 'Bodrum Mağaza Müdür Yardımcısı',
    branch: 'Bodrum Marina Şubesi',
    department: 'Mağaza Operasyonları',
    region: 'Ege Bölgesi',
    monthCode: 'Kas 25',
    promotionDate: 'Kasım 2025',
    academyScore: 94,
    grade: 'Üstün Başarı',
    status: 'Atama Onaylandı ✅'
  },
  {
    id: 'prom-12',
    name: 'Gökhan Aydın',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    previousRole: 'Manisa Taze Gıda Sorumlusu',
    newRole: 'Manisa Taze Gıda Reyon Şefi',
    branch: 'Manisa Merkez Şubesi',
    department: 'Taze Gıda & Satın Alma',
    region: 'Ege Bölgesi',
    monthCode: 'Kas 25',
    promotionDate: 'Kasım 2025',
    academyScore: 93,
    grade: 'PKA Başarı',
    status: 'Atama Onaylandı ✅'
  },
  {
    id: 'prom-13',
    name: 'Ayşe Güneş',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    previousRole: 'Ataköy Kasa Şefi',
    newRole: 'Ataköy Şube Müdür Yardımcısı',
    branch: 'Ataköy Konakları Şubesi',
    department: 'Kasa Operasyonları',
    region: 'Marmara Bölgesi',
    monthCode: 'Eki 25',
    promotionDate: 'Ekim 2025',
    academyScore: 96,
    grade: 'PKA Derece',
    status: 'Yönetim Onaylı ✅'
  },
  {
    id: 'prom-14',
    name: 'Kemal Aksoy',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    previousRole: 'Bakırköy Şube Müdür Yrd.',
    newRole: 'Bakırköy Mağaza Müdürü',
    branch: 'Bakırköy Meydan Şubesi',
    department: 'Mağaza Operasyonları',
    region: 'Marmara Bölgesi',
    monthCode: 'Eyl 25',
    promotionDate: 'Eylül 2025',
    academyScore: 95,
    grade: 'PKA Derece',
    status: 'Yönetim Onaylı ✅'
  },
  {
    id: 'prom-15',
    name: 'Hakan Kurt',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    previousRole: 'Ankara Kızılay Reyon Şefi',
    newRole: 'Ankara Kızılay Mağaza Müdür Yrd.',
    branch: 'Kızılay Şubesi',
    department: 'Mağaza Operasyonları',
    region: 'İç Anadolu Bölgesi',
    monthCode: 'Eyl 25',
    promotionDate: 'Eylül 2025',
    academyScore: 92,
    grade: 'PKA Başarı',
    status: 'Atama Onaylandı ✅'
  }
];

const KPI_BREAKDOWN_DATA: Record<string, PromotedExecutiveRecord[]> = {
  ic_terfi: PROMOTED_EXECUTIVES_LIST,
  sertifikasyon: [
    { id: 's-1', name: 'Selin Yılmaz', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', previousRole: 'Mağaza Müdür Yrd.', newRole: 'Sertifika: Perakende Mühendisi İleri Düzey', branch: 'Kadıköy Premium Şubesi', department: 'Mağaza Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Ağu 26', promotionDate: 'Ağustos 2026', academyScore: 98, grade: 'PKA Derece', status: 'Sertifikalandırıldı 📜' },
    { id: 's-1b', name: 'Ahmet Can Demir', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80', previousRole: 'Kasa Operasyon Şefi', newRole: 'Sertifika: Perakende Mühendisi İleri Düzey', branch: 'Beşiktaş Çarşı Şubesi', department: 'Kasa Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Ağu 26', promotionDate: 'Ağustos 2026', academyScore: 94, grade: 'PKA Başarı', status: 'Sertifika Onaylı 📜' },
    { id: 's-2', name: 'Caner Kaya', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', previousRole: 'Mağaza Müdürü', newRole: 'Sertifika: Saha Yönetimi & Operasyon', branch: 'Ankara Merkez Şubesi', department: 'Saha Direktörlüğü', region: 'İç Anadolu Bölgesi', monthCode: 'Tem 26', promotionDate: 'Temmuz 2026', academyScore: 96, grade: 'Üst Derece', status: 'Sertifika Doğrulandı 📜' },
    { id: 's-2b', name: 'Barış Alp', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', previousRole: 'Bölge Sorumlusu', newRole: 'Sertifika: Saha Yönetimi & Operasyon', branch: 'Ankara Kızılay Şubesi', department: 'Saha Direktörlüğü', region: 'İç Anadolu Bölgesi', monthCode: 'Tem 26', promotionDate: 'Temmuz 2026', academyScore: 93, grade: 'PKA Başarı', status: 'Sertifikalandırıldı 📜' },
    { id: 's-3', name: 'Merve Şahin', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', previousRole: 'Taze Gıda Şefi', newRole: 'Sertifika: Kategori Uzmanlığı PASAPORTU', branch: 'İzmir Alsancak Şubesi', department: 'Taze Gıda & Satın Alma', region: 'Ege Bölgesi', monthCode: 'Haz 26', promotionDate: 'Haziran 2026', academyScore: 95, grade: 'PKA Başarı', status: 'Sertifika Onaylı 📜' },
    { id: 's-3b', name: 'Arzu Demir', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', previousRole: 'Satın Alma Uzmanı', newRole: 'Sertifika: Kategori Uzmanlığı PASAPORTU', branch: 'İzmir Karşıyaka Şubesi', department: 'Taze Gıda & Satın Alma', region: 'Ege Bölgesi', monthCode: 'Haz 26', promotionDate: 'Haziran 2026', academyScore: 92, grade: 'PKA Başarı', status: 'Sertifika Onaylı 📜' },
    { id: 's-4', name: 'Mehmet Yılmaz', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', previousRole: 'Müdür Yrd.', newRole: 'Sertifika: Mağaza Yöneticilik Pasaportu', branch: 'Bursa Nilüfer Şubesi', department: 'Mağaza Operasyonları', region: 'Güney Marmara', monthCode: 'May 26', promotionDate: 'Mayıs 2026', academyScore: 93, grade: 'Akademi Derece', status: 'Sertifikalandırıldı 📜' },
    { id: 's-4b', name: 'Hakan Kurt', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', previousRole: 'Reyon Şefi', newRole: 'Sertifika: Mağaza Yöneticilik Pasaportu', branch: 'Bursa Osmangazi Şubesi', department: 'Mağaza Operasyonları', region: 'Güney Marmara', monthCode: 'May 26', promotionDate: 'Mayıs 2026', academyScore: 91, grade: 'PKA Başarı', status: 'Sertifika Onaylı 📜' },
    { id: 's-5', name: 'Zeynep Karahan', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', previousRole: 'Saha Direktör Yrd.', newRole: 'Sertifika: Üst Yönetim Pasaportu', branch: 'Marmara Genel Merkez', department: 'Saha Direktörlüğü', region: 'Marmara Bölgesi', monthCode: 'Nis 26', promotionDate: 'Nisan 2026', academyScore: 97, grade: 'PKA Derece', status: 'QR Kod Onaylı 📜' },
    { id: 's-5b', name: 'Pınar Erdem', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', previousRole: 'Operasyon Sorumlusu', newRole: 'Sertifika: Üst Yönetim Pasaportu', branch: 'Marmara Genel Merkez', department: 'Mağaza Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Nis 26', promotionDate: 'Nisan 2026', academyScore: 94, grade: 'PKA Başarı', status: 'Sertifika Onaylı 📜' },
    { id: 's-6', name: 'Burak Arslan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', previousRole: 'Şube Şefi', newRole: 'Sertifika: Perakende Yönetimi', branch: 'Lara Şubesi', department: 'Mağaza Operasyonları', region: 'Akdeniz Bölgesi', monthCode: 'Mar 26', promotionDate: 'Mart 2026', academyScore: 92, grade: 'PKA Başarı', status: 'Sertifika Doğrulandı 📜' },
    { id: 's-6b', name: 'Volkan Şen', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80', previousRole: 'Müdür Yrd.', newRole: 'Sertifika: Perakende Yönetimi', branch: 'Adana Çukurova Şubesi', department: 'Mağaza Operasyonları', region: 'Akdeniz Bölgesi', monthCode: 'Mar 26', promotionDate: 'Mart 2026', academyScore: 94, grade: 'Üstün Başarı', status: 'Sertifikalandırıldı 📜' },
    { id: 's-7', name: 'Elif Deniz', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', previousRole: 'Kasa Sorumlusu', newRole: 'Sertifika: Kasa & Müşteri Operasyonları', branch: 'Eskişehir Espark Şubesi', department: 'Kasa Operasyonları', region: 'İç Anadolu Bölgesi', monthCode: 'Şub 26', promotionDate: 'Şubat 2026', academyScore: 91, grade: 'PKA Başarı', status: 'Sertifika Onaylı 📜' },
    { id: 's-8', name: 'Murat Şen', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', previousRole: 'Kasa Görevlisi', newRole: 'Sertifika: Hızlı Kasa & Müşteri Deneyimi', branch: 'Eskişehir Anadolu Şubesi', department: 'Kasa Operasyonları', region: 'İç Anadolu Bölgesi', monthCode: 'Şub 26', promotionDate: 'Şubat 2026', academyScore: 94, grade: 'Üstün Başarı', status: 'Sertifika Onaylı 📜' },
    { id: 's-9', name: 'Oğuzhan Çelik', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', previousRole: 'Taze Gıda Şefi', newRole: 'Sertifika: Taze Gıda Kalite & Tazelik Pasaportu', branch: 'Kayseri Şubesi', department: 'Taze Gıda & Satın Alma', region: 'İç Anadolu Bölgesi', monthCode: 'Oca 26', promotionDate: 'Ocak 2026', academyScore: 95, grade: 'PKA Derece', status: 'Sertifika Doğrulandı 📜' },
    { id: 's-9b', name: 'Tarık Yılmaz', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', previousRole: 'Taze Gıda Görevlisi', newRole: 'Sertifika: Taze Gıda Kalite & Tazelik Pasaportu', branch: 'Konya Selçuklu Şubesi', department: 'Taze Gıda & Satın Alma', region: 'İç Anadolu Bölgesi', monthCode: 'Oca 26', promotionDate: 'Ocak 2026', academyScore: 91, grade: 'PKA Başarı', status: 'Sertifika Onaylı 📜' },
    { id: 's-10', name: 'Deniz Soylu', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', previousRole: 'Satış Temsilcisi', newRole: 'Sertifika: Kategori & Müşteri İlişkileri', branch: 'Kadıköy Şubesi', department: 'Mağaza Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Ara 25', promotionDate: 'Aralık 2025', academyScore: 89, grade: 'PKA Başarı', status: 'Sertifika Onaylı 📜' },
    { id: 's-10b', name: 'Serkan Polat', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', previousRole: 'Kasa Şefi', newRole: 'Sertifika: Kategori & Müşteri İlişkileri', branch: 'Üsküdar Şubesi', department: 'Kasa Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Ara 25', promotionDate: 'Aralık 2025', academyScore: 92, grade: 'PKA Başarı', status: 'Sertifikalandırıldı 📜' },
    { id: 's-11', name: 'Fatih Yıldırım', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', previousRole: 'Şube Şefi', newRole: 'Sertifika: Mağaza Liderliği Pasaportu', branch: 'Bodrum Marina Şubesi', department: 'Mağaza Operasyonları', region: 'Ege Bölgesi', monthCode: 'Kas 25', promotionDate: 'Kasım 2025', academyScore: 94, grade: 'PKA Derece', status: 'Sertifikalandırıldı 📜' },
    { id: 's-11b', name: 'Gökhan Aydın', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', previousRole: 'Müdür Yrd.', newRole: 'Sertifika: Mağaza Liderliği Pasaportu', branch: 'Manisa Merkez Şubesi', department: 'Mağaza Operasyonları', region: 'Ege Bölgesi', monthCode: 'Kas 25', promotionDate: 'Kasım 2025', academyScore: 93, grade: 'PKA Derece', status: 'Sertifika Onaylı 📜' },
    { id: 's-12', name: 'Ayşe Güneş', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', previousRole: 'Kasa Şefi', newRole: 'Sertifika: Perakende Mühendisi İleri Düzey', branch: 'Ataköy Konakları Şubesi', department: 'Kasa Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Eki 25', promotionDate: 'Ekim 2025', academyScore: 96, grade: 'PKA Derece', status: 'QR Kod Onaylı 📜' },
    { id: 's-12b', name: 'Seda Yıldız', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', previousRole: 'Reyon Görevlisi', newRole: 'Sertifika: Perakende Mühendisi İleri Düzey', branch: 'Florya Şubesi', department: 'Mağaza Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Eki 25', promotionDate: 'Ekim 2025', academyScore: 91, grade: 'PKA Başarı', status: 'Sertifika Onaylı 📜' },
    { id: 's-13', name: 'Kemal Aksoy', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', previousRole: 'Müdür Yrd.', newRole: 'Sertifika: Mağaza Operasyonları Yetkinliği', branch: 'Bakırköy Meydan Şubesi', department: 'Mağaza Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Eyl 25', promotionDate: 'Eylül 2025', academyScore: 95, grade: 'PKA Derece', status: 'Sertifika Onaylı 📜' },
    { id: 's-13b', name: 'Hakan Kurt', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', previousRole: 'Reyon Şefi', newRole: 'Sertifika: Mağaza Operasyonları Yetkinliği', branch: 'Ankara Kızılay Şubesi', department: 'Mağaza Operasyonları', region: 'İç Anadolu Bölgesi', monthCode: 'Eyl 25', promotionDate: 'Eylül 2025', academyScore: 92, grade: 'PKA Başarı', status: 'Sertifikalandırıldı 📜' }
  ],
  ciro: [
    { id: 'c-1', name: 'Selin Yılmaz', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', previousRole: 'Mağaza Müdürü', newRole: 'Ciro Verimliliği: ₺1.84M / Çalışan', branch: 'Kadıköy Premium Mağaza', department: 'Mağaza Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Ağu 26', promotionDate: 'Ağustos 2026', academyScore: 98, grade: 'Sektör Birincisi 🏆', status: 'Verimlilik Şampiyonu 🥇' },
    { id: 'c-2', name: 'Caner Kaya', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', previousRole: 'Bölge Operasyon Md.', newRole: 'Ciro Verimliliği: ₺1.82M / Çalışan', branch: 'Ankara Kızılay Şubesi', department: 'Saha Direktörlüğü', region: 'İç Anadolu Bölgesi', monthCode: 'Tem 26', promotionDate: 'Temmuz 2026', academyScore: 96, grade: 'Bölge Birincisi 🌟', status: 'Hedef Üstü Performans ✅' },
    { id: 'c-3', name: 'Merve Şahin', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', previousRole: 'Kategori Müdürü', newRole: 'Ciro Verimliliği: ₺1.80M / Çalışan', branch: 'İzmir Alsancak Şubesi', department: 'Taze Gıda & Satın Alma', region: 'Ege Bölgesi', monthCode: 'Haz 26', promotionDate: 'Haziran 2026', academyScore: 95, grade: 'Kategori Lideri 💎', status: 'Verimlilik Onaylandı ✅' },
    { id: 'c-4', name: 'Mehmet Yılmaz', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', previousRole: 'Mağaza Müdürü', newRole: 'Ciro Verimliliği: ₺1.78M / Çalışan', branch: 'Bursa Nilüfer Şubesi', department: 'Mağaza Operasyonları', region: 'Güney Marmara', monthCode: 'May 26', promotionDate: 'Mayıs 2026', academyScore: 93, grade: 'PKA Derece', status: 'Hedef Yakalandı ✅' },
    { id: 'c-5', name: 'Zeynep Karahan', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', previousRole: 'Saha Direktör Yrd.', newRole: 'Ciro Verimliliği: ₺1.76M / Çalışan', branch: 'Marmara Genel Merkez', department: 'Saha Direktörlüğü', region: 'Marmara Bölgesi', monthCode: 'Nis 26', promotionDate: 'Nisan 2026', academyScore: 97, grade: 'Direktör Derece', status: 'Performans Onaylı ✅' },
    { id: 'c-6', name: 'Burak Arslan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', previousRole: 'Mağaza Şefi', newRole: 'Ciro Verimliliği: ₺1.74M / Çalışan', branch: 'Lara Şubesi', department: 'Mağaza Operasyonları', region: 'Akdeniz Bölgesi', monthCode: 'Mar 26', promotionDate: 'Mart 2026', academyScore: 92, grade: 'PKA Başarı', status: 'Performans Onaylandı ✅' },
    { id: 'c-7', name: 'Elif Deniz', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', previousRole: 'Kasa Operasyon Şefi', newRole: 'Ciro Verimliliği: ₺1.72M / Çalışan', branch: 'Eskişehir Espark Şubesi', department: 'Kasa Operasyonları', region: 'İç Anadolu Bölgesi', monthCode: 'Şub 26', promotionDate: 'Şubat 2026', academyScore: 91, grade: 'Kasa Şampiyonu', status: 'Verimlilik Onaylı ✅' },
    { id: 'c-8', name: 'Oğuzhan Çelik', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', previousRole: 'Taze Gıda Şefi', newRole: 'Ciro Verimliliği: ₺1.70M / Çalışan', branch: 'Kayseri Şubesi', department: 'Taze Gıda & Satın Alma', region: 'İç Anadolu Bölgesi', monthCode: 'Oca 26', promotionDate: 'Ocak 2026', academyScore: 95, grade: 'Üstün Başarı', status: 'Hedef Üstü Performans ✅' },
    { id: 'c-9', name: 'Deniz Soylu', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', previousRole: 'Kategori Şefi', newRole: 'Ciro Verimliliği: ₺1.68M / Çalışan', branch: 'Kadıköy Şubesi', department: 'Mağaza Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Ara 25', promotionDate: 'Aralık 2025', academyScore: 89, grade: 'PKA Başarı', status: 'Verimlilik Onaylı ✅' },
    { id: 'c-10', name: 'Fatih Yıldırım', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', previousRole: 'Şube Müdürü', newRole: 'Ciro Verimliliği: ₺1.66M / Çalışan', branch: 'Bodrum Marina Şubesi', department: 'Mağaza Operasyonları', region: 'Ege Bölgesi', monthCode: 'Kas 25', promotionDate: 'Kasım 2025', academyScore: 94, grade: 'Üstün Başarı', status: 'Hedef Üstü Performans ✅' },
    { id: 'c-11', name: 'Ayşe Güneş', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', previousRole: 'Kasa Şefi', newRole: 'Ciro Verimliliği: ₺1.63M / Çalışan', branch: 'Ataköy Konakları Şubesi', department: 'Kasa Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Eki 25', promotionDate: 'Ekim 2025', academyScore: 96, grade: 'PKA Derece', status: 'Performans Onaylı ✅' },
    { id: 'c-12', name: 'Kemal Aksoy', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', previousRole: 'Müdür Yrd.', newRole: 'Ciro Verimliliği: ₺1.61M / Çalışan', branch: 'Bakırköy Meydan Şubesi', department: 'Mağaza Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Eyl 25', promotionDate: 'Eylül 2025', academyScore: 95, grade: 'PKA Derece', status: 'Başlangıç Verimliliği ✅' }
  ],
  aday_havuzu: [
    { id: 'a-1', name: 'Selin Yılmaz', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', previousRole: 'Müdür Yrd.', newRole: 'Bölge Müdürlüğü Yedek Adayı (185/200 Kadro)', branch: 'Kadıköy Premium Şubesi', department: 'Mağaza Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Ağu 26', promotionDate: 'Ağustos 2026', academyScore: 98, grade: '1. Sıra Yedek Lider 👑', status: 'Hemen Atanabilir ⚡' },
    { id: 'a-2', name: 'Caner Kaya', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', previousRole: 'Mağaza Müdürü', newRole: 'Operasyon Müdürlüğü Adayı (184/200 Kadro)', branch: 'Ankara Merkez Şubesi', department: 'Saha Direktörlüğü', region: 'İç Anadolu Bölgesi', monthCode: 'Tem 26', promotionDate: 'Temmuz 2026', academyScore: 96, grade: '2. Sıra Yedek Lider 🌟', status: 'Havuzda Hazır Bekliyor ⚡' },
    { id: 'a-3', name: 'Merve Şahin', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', previousRole: 'Kategori Müdürü', newRole: 'Satın Alma Direktör Adayı (183/200 Kadro)', branch: 'İzmir Alsancak Şubesi', department: 'Taze Gıda & Satın Alma', region: 'Ege Bölgesi', monthCode: 'Haz 26', promotionDate: 'Haziran 2026', academyScore: 95, grade: 'Kategori Lideri 💎', status: 'Atamaya Hazır ⚡' },
    { id: 'a-4', name: 'Mehmet Yılmaz', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', previousRole: 'Müdür Yrd.', newRole: 'Mağaza Müdürü Yedek Adayı (182/200 Kadro)', branch: 'Bursa Nilüfer Şubesi', department: 'Mağaza Operasyonları', region: 'Güney Marmara', monthCode: 'May 26', promotionDate: 'Mayıs 2026', academyScore: 93, grade: 'Saha Lider Adayı', status: 'Havuzda Onaylı ⚡' },
    { id: 'a-5', name: 'Zeynep Karahan', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', previousRole: 'Saha Direktör Yrd.', newRole: 'Bölge Müdürlüğü Adayı (180/200 Kadro)', branch: 'Marmara Genel Merkez', department: 'Saha Direktörlüğü', region: 'Marmara Bölgesi', monthCode: 'Nis 26', promotionDate: 'Nisan 2026', academyScore: 98, grade: '1. Sıra Yedek 👑', status: 'Hemen Atanabilir ⚡' },
    { id: 'a-6', name: 'Burak Arslan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', previousRole: 'Mağaza Şefi', newRole: 'Müdür Yardımcısı Adayı (179/200 Kadro)', branch: 'Lara Şubesi', department: 'Mağaza Operasyonları', region: 'Akdeniz Bölgesi', monthCode: 'Mar 26', promotionDate: 'Mart 2026', academyScore: 92, grade: 'PKA Başarı', status: 'Havuzda Hazır Bekliyor ⚡' },
    { id: 'a-7', name: 'Elif Deniz', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', previousRole: 'Kasa Sorumlusu', newRole: 'Kasa Operasyon Şef Adayı (177/200 Kadro)', branch: 'Eskişehir Espark Şubesi', department: 'Kasa Operasyonları', region: 'İç Anadolu Bölgesi', monthCode: 'Şub 26', promotionDate: 'Şubat 2026', academyScore: 91, grade: 'Kasa Adayı', status: 'Atamaya Hazır ⚡' },
    { id: 'a-8', name: 'Oğuzhan Çelik', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', previousRole: 'Taze Gıda Sorumlusu', newRole: 'Taze Gıda Saha Şef Adayı (176/200 Kadro)', branch: 'Kayseri Şubesi', department: 'Taze Gıda & Satın Alma', region: 'İç Anadolu Bölgesi', monthCode: 'Oca 26', promotionDate: 'Ocak 2026', academyScore: 95, grade: 'Tazelik Lideri', status: 'Havuzda Onaylı ⚡' },
    { id: 'a-9', name: 'Deniz Soylu', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', previousRole: 'Satış Temsilcisi', newRole: 'Kategori Şef Adayı (174/200 Kadro)', branch: 'Kadıköy Şubesi', department: 'Mağaza Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Ara 25', promotionDate: 'Aralık 2025', academyScore: 89, grade: 'PKA Başarı', status: 'Havuzda Bekliyor ⚡' },
    { id: 'a-10', name: 'Fatih Yıldırım', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', previousRole: 'Şube Şefi', newRole: 'Müdür Yardımcısı Adayı (172/200 Kadro)', branch: 'Bodrum Marina Şubesi', department: 'Mağaza Operasyonları', region: 'Ege Bölgesi', monthCode: 'Kas 25', promotionDate: 'Kasım 2025', academyScore: 94, grade: 'Ege Aday Lideri', status: 'Atamaya Hazır ⚡' },
    { id: 'a-11', name: 'Ayşe Güneş', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', previousRole: 'Kasa Şefi', newRole: 'Müdür Yardımcısı Adayı (171/200 Kadro)', branch: 'Ataköy Konakları Şubesi', department: 'Kasa Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Eki 25', promotionDate: 'Ekim 2025', academyScore: 96, grade: 'PKA Derece', status: 'Havuzda Onaylı ⚡' },
    { id: 'a-12', name: 'Kemal Aksoy', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', previousRole: 'Müdür Yrd.', newRole: 'Mağaza Müdürü Adayı (169/200 Kadro)', branch: 'Bakırköy Meydan Şubesi', department: 'Mağaza Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Eyl 25', promotionDate: 'Eylül 2025', academyScore: 95, grade: 'Başlangıç Adayı', status: 'Havuzda Bekliyor ⚡' }
  ],
  turnover: [
    { id: 't-1', name: 'Ahmet Can Demir', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80', previousRole: 'Kasa Şefi', newRole: 'Devir Düşüşü: %15.2 ➔ %11.4 (-%3.8 İyileşme)', branch: 'Beşiktaş Çarşı Şubesi', department: 'Kasa Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Ağu 26', promotionDate: 'Ağustos 2026', academyScore: 94, grade: 'Retansiyon Başarısı', status: 'Retansiyon Primi Tanımlandı 💰' },
    { id: 't-2', name: 'Elif Deniz', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', previousRole: 'Kasa Operasyon Şefi', newRole: 'Devir Oranı: %12.6 (-%2.6 İyileşme)', branch: 'Eskişehir Espark Şubesi', department: 'Kasa Operasyonları', region: 'İç Anadolu Bölgesi', monthCode: 'Şub 26', promotionDate: 'Şubat 2026', academyScore: 91, grade: 'Bağlılık Sertifikası', status: 'Sözleşme Yenilendi 🏆' },
    { id: 't-3', name: 'Burak Arslan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', previousRole: 'Müdür Yardımcısı', newRole: 'Devir Oranı: %13.0 (-%2.2 İyileşme)', branch: 'Lara Şubesi', department: 'Mağaza Operasyonları', region: 'Akdeniz Bölgesi', monthCode: 'Mar 26', promotionDate: 'Mart 2026', academyScore: 92, grade: 'Kıdem Ödülü', status: 'Retansiyon Primi Tanımlandı 💰' }
  ],
  terfi: [
    { id: 'tf-1', name: 'Selin Yılmaz', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', previousRole: 'Terfi Sınav Adayı', newRole: 'Sınav Skoru: 84.2 / 100 Puan', branch: 'Kadıköy Premium Mağaza', department: 'Mağaza Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Ağu 26', promotionDate: 'Ağustos 2026', academyScore: 98, grade: 'PKA Dönem Birincisi 🏆', status: 'Yönetici Sertifikası Onaylı 👑' },
    { id: 'tf-2', name: 'Zeynep Karahan', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', previousRole: 'Vaka Analiz Adayı', newRole: 'Sınav Skoru: 83.9 / 100 Puan', branch: 'Marmara Genel Merkez', department: 'Saha Direktörlüğü', region: 'Marmara Bölgesi', monthCode: 'Nis 26', promotionDate: 'Nisan 2026', academyScore: 97, grade: 'Üst Derece', status: 'Sınav Derecesi Onaylı ✅' },
    { id: 'tf-3', name: 'Volkan Şen', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80', previousRole: 'Müdür Sınav Adayı', newRole: 'Sınav Skoru: 81.9 / 100 Puan', branch: 'Adana Çukurova Şubesi', department: 'Mağaza Operasyonları', region: 'Akdeniz Bölgesi', monthCode: 'Mar 26', promotionDate: 'Mart 2026', academyScore: 94, grade: 'Üstün Başarı', status: 'Sertifikalandırıldı ✅' }
  ],
  roi: [
    { id: 'r-1', name: 'Liderlik Akademi Kampı', avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&auto=format&fit=crop&q=80', previousRole: 'Üst Yönetici Gelişim Programı', newRole: 'Program ROI Oranı: %340 (₺4.2M Getiri)', branch: 'Tüm Genel Merkez Şubeleri', department: 'Saha Direktörlüğü', region: 'Marmara Bölgesi', monthCode: 'Ağu 26', promotionDate: 'Ağustos 2026', academyScore: 99, grade: 'Yüksek Getiri 💎', status: 'Yönetim Onaylı ROI 👑' },
    { id: 'r-2', name: 'Taze Gıda Tazelik & Fire Eğitimi', avatar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=80', previousRole: 'Saha Fire Azaltma Programı', newRole: 'Program ROI Oranı: %335 (₺2.8M Tasarruf)', branch: 'Tüm Mağaza Reyonları', department: 'Taze Gıda & Satın Alma', region: 'Ege Bölgesi', monthCode: 'Haz 26', promotionDate: 'Haziran 2026', academyScore: 95, grade: 'Tasarrruf Rekoru 🥇', status: 'Finans Onaylı ✅' }
  ],
  fire: [
    { id: 'f-1', name: 'Oğuzhan Çelik', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', previousRole: 'Taze Gıda Saha Şefi', newRole: 'Fire Oranı: %2.7 ➔ %1.8 (-%0.9 Düşüş)', branch: 'Kayseri Şubesi', department: 'Taze Gıda & Satın Alma', region: 'İç Anadolu Bölgesi', monthCode: 'Oca 26', promotionDate: 'Ocak 2026', academyScore: 95, grade: 'Tazelik Şampiyonu 🥦', status: 'Saha Audit Tam Puan 🏆' },
    { id: 'f-2', name: 'Merve Şahin', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', previousRole: 'Kategori Müdürü', newRole: 'Fire Oranı: %2.0 (-%0.7 Düşüş)', branch: 'İzmir Alsancak Şubesi', department: 'Taze Gıda & Satın Alma', region: 'Ege Bölgesi', monthCode: 'Haz 26', promotionDate: 'Haziran 2026', academyScore: 95, grade: 'Sıfır Atık Ödülü 🥇', status: 'Audit Başarısı ✅' }
  ],
  csat: [
    { id: 'cs-1', name: 'Beşiktaş Çarşı Şubesi', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80', previousRole: 'Ahmet Can Demir (Kasa Şefi)', newRole: 'CSAT Skoru: 94.5 / 100 Puan (+4.2 Artış)', branch: 'Beşiktaş Çarşı Şubesi', department: 'Kasa Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Ağu 26', promotionDate: 'Ağustos 2026', academyScore: 94, grade: 'Müşteri Şampiyonu 🏆', status: 'Altın Mağaza Ödülü 🥇' },
    { id: 'cs-2', name: 'Kadıköy Premium Şubesi', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', previousRole: 'Selin Yılmaz (Mağaza Müdürü)', newRole: 'CSAT Skoru: 93.8 / 100 Puan (+3.8 Artış)', branch: 'Kadıköy Şubesi', department: 'Mağaza Operasyonları', region: 'Marmara Bölgesi', monthCode: 'Ağu 26', promotionDate: 'Ağustos 2026', academyScore: 98, grade: 'Müşteri Derecesi 🌟', status: 'Üstün Deneyim Ödülü 🥇' }
  ],
  lms: [
    { id: 'l-1', name: 'Lara Antalya Şubesi', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', previousRole: 'Burak Arslan (Müdür Yrd.)', newRole: 'LMS Tamamlama: %96.8 (14/14 Modül)', branch: 'Lara Şubesi', department: 'Mağaza Operasyonları', region: 'Akdeniz Bölgesi', monthCode: 'Mar 26', promotionDate: 'Mart 2026', academyScore: 92, grade: 'Dijital Akademi Lideri 📱', status: 'Sürekli Öğrenen Şube Rozeti 🎖️' },
    { id: 'l-2', name: 'Nilüfer Bursa Şubesi', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', previousRole: 'Mehmet Yılmaz (Mağaza Müdürü)', newRole: 'LMS Tamamlama: %95.2 (14/14 Modül)', branch: 'Nilüfer Şubesi', department: 'Mağaza Operasyonları', region: 'Güney Marmara', monthCode: 'May 26', promotionDate: 'Mayıs 2026', academyScore: 93, grade: 'Tam Katılım Rozeti 🎖️', status: 'Dersler Tamamlandı ✅' }
  ]
};

const STRATEGIC_KPIS_12M: StrategicKpi[] = [
  {
    id: 'ciro',
    name: 'Ciro / Çalışan',
    val: '₺1.840.000',
    unit: '₺',
    trend: '+₺230.000 (+14.2%)',
    color: 'text-emerald-400',
    description: 'Çalışan başına düşen net yıllık ciro verimliliği son 12 ayda ₺1.610.000 seviyesinden ₺1.840.000 seviyesine yükselmiştir (+₺230.000 net artış / +%14.2 büyüme).',
    monthlyData: [
      { month: 'Eyl 25', value: 1.61, formatted: '₺1.610.000' },
      { month: 'Eki 25', value: 1.63, formatted: '₺1.630.000' },
      { month: 'Kas 25', value: 1.66, formatted: '₺1.660.000' },
      { month: 'Ara 25', value: 1.68, formatted: '₺1.680.000' },
      { month: 'Oca 26', value: 1.70, formatted: '₺1.700.000' },
      { month: 'Şub 26', value: 1.72, formatted: '₺1.720.000' },
      { month: 'Mar 26', value: 1.74, formatted: '₺1.740.000' },
      { month: 'Nis 26', value: 1.76, formatted: '₺1.760.000' },
      { month: 'May 26', value: 1.78, formatted: '₺1.780.000' },
      { month: 'Haz 26', value: 1.80, formatted: '₺1.800.000' },
      { month: 'Tem 26', value: 1.82, formatted: '₺1.820.000' },
      { month: 'Ağu 26', value: 1.84, formatted: '₺1.840.000' }
    ]
  },
  {
    id: 'turnover',
    name: 'Turnover Oranı',
    val: '%11.4',
    unit: '%',
    trend: '-3.8%',
    color: 'text-emerald-400',
    inverseMetric: true,
    description: 'Personel devir oranı retansiyon primleri ve sertifikasyonlar sayesinde %15.2\'den %11.4\'e gerileyerek sektör rekoru kırmıştır.',
    monthlyData: [
      { month: 'Eyl 25', value: 15.2, formatted: '%15.2' },
      { month: 'Eki 25', value: 14.8, formatted: '%14.8' },
      { month: 'Kas 25', value: 14.3, formatted: '%14.3' },
      { month: 'Ara 25', value: 13.9, formatted: '%13.9' },
      { month: 'Oca 26', value: 13.5, formatted: '%13.5' },
      { month: 'Şub 26', value: 13.0, formatted: '%13.0' },
      { month: 'Mar 26', value: 12.6, formatted: '%12.6' },
      { month: 'Nis 26', value: 12.3, formatted: '%12.3' },
      { month: 'May 26', value: 12.0, formatted: '%12.0' },
      { month: 'Haz 26', value: 11.8, formatted: '%11.8' },
      { month: 'Tem 26', value: 11.6, formatted: '%11.6' },
      { month: 'Ağu 26', value: 11.4, formatted: '%11.4' }
    ]
  },
  {
    id: 'terfi',
    name: 'Terfi Skoru Ort.',
    val: '84.2',
    unit: 'Puan',
    trend: '+6.5p',
    color: 'text-cyan-400',
    description: 'Yönetici adaylarının terfi sınavı ve vaka analiz skoru ortalaması 12 ayda 77.7 puandan 84.2 puana yükselmiştir.',
    monthlyData: [
      { month: 'Eyl 25', value: 77.7, formatted: '77.7' },
      { month: 'Eki 25', value: 78.4, formatted: '78.4' },
      { month: 'Kas 25', value: 79.1, formatted: '79.1' },
      { month: 'Ara 25', value: 79.8, formatted: '79.8' },
      { month: 'Oca 26', value: 80.5, formatted: '80.5' },
      { month: 'Şub 26', value: 81.2, formatted: '81.2' },
      { month: 'Mar 26', value: 81.9, formatted: '81.9' },
      { month: 'Nis 26', value: 82.5, formatted: '82.5' },
      { month: 'May 26', value: 83.0, formatted: '83.0' },
      { month: 'Haz 26', value: 83.5, formatted: '83.5' },
      { month: 'Tem 26', value: 83.9, formatted: '83.9' },
      { month: 'Ağu 26', value: 84.2, formatted: '84.2' }
    ]
  },
  {
    id: 'ic_terfi',
    name: 'İç Terfi Eden Yönetici',
    val: '85 Kişi',
    unit: 'Kişi',
    trend: '+12 Kişi (%85 Oran)',
    color: 'text-amber-400',
    description: 'Açılan 100 yönetici kadrosunun 85\'i (%85.0) dışarıdan transfer yerine akademi içi terfilerle doldurulmuştur (Son 12 ayda terfi eden net kişi sayısı 73\'ten 85\'e yükselmiştir).',
    monthlyData: [
      { month: 'Eyl 25', value: 73, formatted: '73 Kişi' },
      { month: 'Eki 25', value: 74, formatted: '74 Kişi' },
      { month: 'Kas 25', value: 76, formatted: '76 Kişi' },
      { month: 'Ara 25', value: 77, formatted: '77 Kişi' },
      { month: 'Oca 26', value: 78, formatted: '78 Kişi' },
      { month: 'Şub 26', value: 79, formatted: '79 Kişi' },
      { month: 'Mar 26', value: 81, formatted: '81 Kişi' },
      { month: 'Nis 26', value: 82, formatted: '82 Kişi' },
      { month: 'May 26', value: 83, formatted: '83 Kişi' },
      { month: 'Haz 26', value: 84, formatted: '84 Kişi' },
      { month: 'Tem 26', value: 84, formatted: '84 Kişi' },
      { month: 'Ağu 26', value: 85, formatted: '85 Kişi' }
    ]
  },
  {
    id: 'roi',
    name: 'Eğitim ROI',
    val: '%340',
    unit: '%',
    trend: '+45%',
    color: 'text-emerald-400',
    description: 'Eğitim akademisi bütçesine yapılan harcamanın operasyonel kar artışı ve tasarruf olarak getirdiği getiri oranı %340 ROI\'ye ulaşmıştır.',
    monthlyData: [
      { month: 'Eyl 25', value: 295, formatted: '%295' },
      { month: 'Eki 25', value: 299, formatted: '%299' },
      { month: 'Kas 25', value: 304, formatted: '%304' },
      { month: 'Ara 25', value: 309, formatted: '%309' },
      { month: 'Oca 26', value: 314, formatted: '%314' },
      { month: 'Şub 26', value: 319, formatted: '%319' },
      { month: 'Mar 26', value: 324, formatted: '%324' },
      { month: 'Nis 26', value: 329, formatted: '%329' },
      { month: 'May 26', value: 332, formatted: '%332' },
      { month: 'Haz 26', value: 335, formatted: '%335' },
      { month: 'Tem 26', value: 338, formatted: '%338' },
      { month: 'Ağu 26', value: 340, formatted: '%340' }
    ]
  },
  {
    id: 'fire',
    name: 'Mağaza Fire Min.',
    val: '%1.8',
    unit: '%',
    trend: '-0.9%',
    color: 'text-emerald-400',
    inverseMetric: true,
    description: 'Saha auditleri ve taze gıda tazelik eğitimleri sayesinde mağaza fire oranı %2.7 seviyesinden %1.8 seviyesine çekilmiştir.',
    monthlyData: [
      { month: 'Eyl 25', value: 2.7, formatted: '%2.7' },
      { month: 'Eki 25', value: 2.6, formatted: '%2.6' },
      { month: 'Kas 25', value: 2.5, formatted: '%2.5' },
      { month: 'Ara 25', value: 2.4, formatted: '%2.4' },
      { month: 'Oca 26', value: 2.3, formatted: '%2.3' },
      { month: 'Şub 26', value: 2.2, formatted: '%2.2' },
      { month: 'Mar 26', value: 2.1, formatted: '%2.1' },
      { month: 'Nis 26', value: 2.0, formatted: '%2.0' },
      { month: 'May 26', value: 1.9, formatted: '%1.9' },
      { month: 'Haz 26', value: 1.9, formatted: '%1.9' },
      { month: 'Tem 26', value: 1.8, formatted: '%1.8' },
      { month: 'Ağu 26', value: 1.8, formatted: '%1.8' }
    ]
  },
  {
    id: 'aday_havuzu',
    name: 'Aday Havuzu (Yedek Yönetici)',
    val: '185 / 200 Kadro (%92.5)',
    unit: 'Kadro',
    trend: '+16 Aday (%92.5 Doluluk)',
    color: 'text-cyan-400',
    description: 'Yedeklenmesi gereken 200 kritik yönetim kadrosu için akademiden yetişmiş 185 yedek yönetici adayı atanmaya hazır durumdadır (%92.5 Yedekleme Doluluk Oranı).',
    monthlyData: [
      { month: 'Eyl 25', value: 169, formatted: '169/200 (%84.5)' },
      { month: 'Eki 25', value: 171, formatted: '171/200 (%85.5)' },
      { month: 'Kas 25', value: 172, formatted: '172/200 (%86.0)' },
      { month: 'Ara 25', value: 174, formatted: '174/200 (%87.0)' },
      { month: 'Oca 26', value: 176, formatted: '176/200 (%88.0)' },
      { month: 'Şub 26', value: 177, formatted: '177/200 (%88.5)' },
      { month: 'Mar 26', value: 179, formatted: '179/200 (%89.5)' },
      { month: 'Nis 26', value: 180, formatted: '180/200 (%90.0)' },
      { month: 'May 26', value: 182, formatted: '182/200 (%91.0)' },
      { month: 'Haz 26', value: 183, formatted: '183/200 (%91.5)' },
      { month: 'Tem 26', value: 184, formatted: '184/200 (%92.0)' },
      { month: 'Ağu 26', value: 185, formatted: '185/200 (%92.5)' }
    ]
  },
  {
    id: 'sertifikasyon',
    name: 'Sertifikasyon (Sertifikalı Personel)',
    val: '1.100 / 1.250 Personel (%88.0)',
    unit: 'Personel',
    trend: '+22 Sertifikalı (%88.0 Oran)',
    color: 'text-purple-400',
    description: 'Şirket genelindeki 1.250 çalışanımızın 1.100\'ü (%88.0) Perakende Mühendisi Eğitim Akademisi sertifikasına sahiptir (Son 12 ayda sertifikalı çalışan sayısı 1.078\'den 1.100\'e yükselmiştir).',
    monthlyData: [
      { month: 'Eyl 25', value: 1078, formatted: '1078/1250 (%86.2)' },
      { month: 'Eki 25', value: 1080, formatted: '1080/1250 (%86.4)' },
      { month: 'Kas 25', value: 1082, formatted: '1082/1250 (%86.6)' },
      { month: 'Ara 25', value: 1084, formatted: '1084/1250 (%86.7)' },
      { month: 'Oca 26', value: 1086, formatted: '1086/1250 (%86.9)' },
      { month: 'Şub 26', value: 1088, formatted: '1088/1250 (%87.0)' },
      { month: 'Mar 26', value: 1090, formatted: '1090/1250 (%87.2)' },
      { month: 'Nis 26', value: 1092, formatted: '1092/1250 (%87.4)' },
      { month: 'May 26', value: 1094, formatted: '1094/1250 (%87.5)' },
      { month: 'Haz 26', value: 1096, formatted: '1096/1250 (%87.7)' },
      { month: 'Tem 26', value: 1098, formatted: '1098/1250 (%87.8)' },
      { month: 'Ağu 26', value: 1100, formatted: '1100/1250 (%88.0)' }
    ]
  },
  {
    id: 'csat',
    name: 'Müşteri Memnuniyeti',
    val: '4.8/5',
    unit: 'Skor',
    trend: '+0.4',
    color: 'text-amber-400',
    description: 'Kasa hattı hızı ve şikayet yönetim eğitimleri ile müşteri memnuniyet (CSAT) puanı 4.40\'tan 4.80/5.00\'e yükselmiştir.',
    monthlyData: [
      { month: 'Eyl 25', value: 4.40, formatted: '4.40' },
      { month: 'Eki 25', value: 4.44, formatted: '4.44' },
      { month: 'Kas 25', value: 4.48, formatted: '4.48' },
      { month: 'Ara 25', value: 4.52, formatted: '4.52' },
      { month: 'Oca 26', value: 4.56, formatted: '4.56' },
      { month: 'Şub 26', value: 4.60, formatted: '4.60' },
      { month: 'Mar 26', value: 4.65, formatted: '4.65' },
      { month: 'Nis 26', value: 4.70, formatted: '4.70' },
      { month: 'May 26', value: 4.73, formatted: '4.73' },
      { month: 'Haz 26', value: 4.76, formatted: '4.76' },
      { month: 'Tem 26', value: 4.78, formatted: '4.78' },
      { month: 'Ağu 26', value: 4.80, formatted: '4.80' }
    ]
  },
  {
    id: 'lms',
    name: 'LMS Katılım',
    val: '%96.2',
    unit: '%',
    trend: '+5.1%',
    color: 'text-emerald-400',
    description: 'Personelin dijital akademideki zorunlu modülleri ay bazında zamanında tamamlama oranı %96.2 ile en yüksek seviyededir.',
    monthlyData: [
      { month: 'Eyl 25', value: 91.1, formatted: '%91.1' },
      { month: 'Eki 25', value: 91.6, formatted: '%91.6' },
      { month: 'Kas 25', value: 92.1, formatted: '%92.1' },
      { month: 'Ara 25', value: 92.7, formatted: '%92.7' },
      { month: 'Oca 26', value: 93.3, formatted: '%93.3' },
      { month: 'Şub 26', value: 93.9, formatted: '%93.9' },
      { month: 'Mar 26', value: 94.5, formatted: '%94.5' },
      { month: 'Nis 26', value: 95.1, formatted: '%95.1' },
      { month: 'May 26', value: 95.5, formatted: '%95.5' },
      { month: 'Haz 26', value: 95.8, formatted: '%95.8' },
      { month: 'Tem 26', value: 96.0, formatted: '%96.0' },
      { month: 'Ağu 26', value: 96.2, formatted: '%96.2' }
    ]
  }
];

export default function CEODashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'summary' | 'capital' | 'risks' | 'pipeline' | 'succession' | 'comparison' | 'scenario' | 'roi' | 'board'
  >('summary');

  const [selectedCandidate, setSelectedCandidate] = useState<ExecutiveCandidate | null>(null);
  const [selectedKpiIndex, setSelectedKpiIndex] = useState<number>(0);
  const [selectedMonthFilter, setSelectedMonthFilter] = useState<string>('ALL');
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState<string>('ALL');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('ALL');
  const [visibleRecordLimit, setVisibleRecordLimit] = useState<number>(5);

  const [successionRegionFilter, setSuccessionRegionFilter] = useState<string>('ALL');
  const [successionDeptFilter, setSuccessionDeptFilter] = useState<string>('ALL');
  const [successionVisibleLimit, setSuccessionVisibleLimit] = useState<number>(5);

  // REAL FULL-PAGE EXPORT FUNCTION 1: PDF DOWNLOAD GENERATOR (EKSİKSİZ MASTER RAPOR — WORD İLE %100 BİREBİR AYNI)
  const exportToPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Lütfen tarayıcınızın açılır pencere (pop-up) engelleyicisini kapatın.');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>2026 Q3 Yönetim Kurulu İnsan Sermayesi Eksiksiz Master Raporu</title>
          <style>
            @page { size: A4; margin: 10mm; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 9.5pt; color: #1e293b; line-height: 1.45; background: #ffffff; padding: 10px; }
            h1 { font-size: 16pt; font-weight: 900; color: #0f172a; border-bottom: 3px solid #f59e0b; padding-bottom: 4pt; margin-bottom: 6pt; }
            h2 { font-size: 11pt; font-weight: 800; color: #0369a1; margin-top: 14pt; margin-bottom: 6pt; border-bottom: 1.5pt solid #cbd5e1; padding-bottom: 3pt; text-transform: uppercase; }
            .box { background: #f8fafc; border: 1pt solid #cbd5e1; border-left: 4pt solid #f59e0b; padding: 10pt; margin-bottom: 12pt; border-radius: 6pt; }
            table { width: 100%; border-collapse: collapse; margin-top: 6pt; margin-bottom: 12pt; font-size: 9pt; }
            th { background: #0f172a; color: white; padding: 6pt 8pt; text-align: left; font-size: 8.5pt; text-transform: uppercase; border: 1pt solid #0f172a; }
            td { border: 1pt solid #cbd5e1; padding: 5pt 7pt; font-size: 8.5pt; }
            tr:nth-child(even) { background: #f8fafc; }
            .highlight { background: #fef3c7 !important; font-weight: bold; color: #78350f; }
            .grid { width: 100%; margin-top: 6pt; border-collapse: collapse; }
            .grid td { vertical-align: top; background: #ffffff; padding: 8pt; border: 1pt solid #e2e8f0; }
            .footer { margin-top: 24pt; font-size: 8.5pt; color: #94a3b8; text-align: center; border-top: 1pt solid #e2e8f0; padding-top: 8pt; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <h1>🏢 YÖNETİM KURULU İNSAN SERMAYESİ & STRATEJİK BÜYÜME MASTER RAPORU — 2026 Q3</h1>
          <p style="margin-top: -2px; margin-bottom: 12px; color: #64748b; font-size: 9pt;">
            <b>Rapor Tarihi:</b> ${new Date().toLocaleDateString('tr-TR')} | <b>Kurum:</b> Perakende Mühendisi Eğitim Akademisi | <b>Statü:</b> GİZLİ — YÖNETİM KURULUNA ÖZEL
          </p>
          
          <div class="box">
            <b style="font-size: 10pt; color: #0f172a;">👑 İCRA KURULU BAŞKANLIĞI: MEVCUT DURUM DEĞERLENDİRMESİ VE GELECEK STRATEJİK PLANLAMASI</b><br/><br/>
            <table class="grid">
              <tr>
                <td width="33%">
                  <b style="color: #0369a1;">1. Mevcut Durum & Finansal İcra:</b><br/>
                  Şirketimiz <b>₺1.800.000 TL</b> tutarındaki eğitim yatırımına karşılık <b>₺14.200.000 TL</b> net tasarruf elde ederek <b>7.89x ROI (%789 getiri)</b> sağlamıştır. Harcanan ₺1 TL şirkete ₺7,89 TL getiri kazandırmıştır. 86 Yönetici terfi etmiştir (%39).
                </td>
                <td width="33%">
                  <b style="color: #0369a1;">2. Kadro Güvencesi & Yedekleme:</b><br/>
                  271 kritik kadronun <b>244'ü (%90.0)</b> akademi kaynaklarından yedeklidir. Mağaza Operasyonlarında %91.8 doluluk oranına ulaşılmıştır. Turnover oranı %24.0'ten %17.0'ye (-%7.0 iyileşme) gerilemiştir.
                </td>
                <td width="33%">
                  <b style="color: #0369a1;">3. Gelecek Büyüme & 200 Mağaza Vizyonu:</b><br/>
                  Gelecek 6 ayda 21 yedeksiz pozisyon sıfırlanıp ₺17.4M getiri; 12 ayda 20 yeni mağaza için ₺2.6M bütçe ile 64.000 saat eğitim; 2 yıllık vizyonda ise 200 mağaza ölçeği ile net getiri <b>₺35.000.000 TL'ye (8.75x ROI)</b> çıkarılacaktır.
                </td>
              </tr>
            </table>
            <p style="font-size: 8.5pt; color: #475569; margin-top: 8pt; margin-bottom: 0;">
              <i><b>Yönetim Kurulu İcra Direktifi:</b> Perakende Mühendisi Eğitim Akademisi, insan kaynağını en yüksek getiri sağlayan stratejik yatırım aracına dönüştürmüştür. Önümüzdeki 24 ayda hedefimiz, yeni açılacak 60+ şubeyi %100 akademi iç kaynaklarından terfi eden liderlerle yönetmektir.</i>
            </p>
          </div>

          <h2>1. Dönemlere Göre Hedef ve Finansal Yatırım Karşılaştırma Tablosu</h2>
          <table>
            <thead>
              <tr><th>Metrik Kartı</th><th>Mevcut (Son 12 Ay)</th><th>6 Aylık Hedef</th><th>12 Aylık Hedef</th><th>2 Yıllık Vizyon</th></tr>
            </thead>
            <tbody>
              <tr><td>Net Tasarruf (ROI)</td><td><b>₺14.200.000 TL</b></td><td>₺17.400.000 TL (+₺3.2M)</td><td>₺22.000.000 TL (20 Mağaza)</td><td>₺35.000.000 TL (Sıfır Kayıp)</td></tr>
              <tr><td>İç Terfi Başarısı</td><td><b>86 Personel (%39)</b></td><td>105 Personel (%44) (+19)</td><td>135 Personel (%50)</td><td>200+ Personel (%65)</td></tr>
              <tr><td>Kişi Başı Ciro Ortalaması</td><td><b>₺1.740.000 TL</b></td><td>₺1.880.000 TL (+₺140K)</td><td>₺2.050.000 TL (20 Şube)</td><td>₺2.400.000 TL (Otomasyon)</td></tr>
              <tr><td>Kişi Başı Eğitim Saati</td><td><b>48 Saat / Yıl</b></td><td>56 Saat / Yıl (28Sa/6Ay)</td><td>60 Saat / Yıl (52Sa/Kişi)</td><td>64 Saat / Yıl (Executive)</td></tr>
              <tr><td>İşletme Takvimi Eğitimi</td><td><b>52.800 Saat</b></td><td>28.000 Saat (Acil Program)</td><td>64.000 Saat (20 Şube)</td><td>80.000 Saat (200 Mağaza)</td></tr>
              <tr><td>Mağaza Müdürü Turnover Oranı</td><td><b>%17.0</b></td><td>%14.5 Target (21 Risk=0)</td><td>%12.0 Target (Bağlılık)</td><td>%8.5 Target (%100 Yedek)</td></tr>
              <tr><td>Eğitim Yatırımı Bütçesi</td><td><b>₺1.800.000 TL</b></td><td>₺1.200.000 TL (Acil Bütçe)</td><td>₺2.600.000 TL (20 Şube Bütçe)</td><td>₺4.000.000 TL (200 Mağaza)</td></tr>
              <tr class="highlight"><td>Harcanan 1 TL Dönüşü (ROI)</td><td><b>₺7,89 (7.89x ROI)</b></td><td><b>₺14,50 (14.50x ROI)</b></td><td><b>₺8,46 (8.46x ROI)</b></td><td><b>₺8,75 (8.75x ROI)</b></td></tr>
            </tbody>
          </table>

          <h2>2. İnsan Sermayesi 10 Stratejik KPI Kırılımı</h2>
          <table>
            <thead>
              <tr><th>KPI Metriği</th><th>Gerçekleşen Değer</th><th>Hedef Standart</th><th>Performans &amp; Finansal Etki</th></tr>
            </thead>
            <tbody>
              <tr><td>1. Sertifikalı Personel Oranı</td><td><b>%94.8 (1.100 Personel)</b></td><td>%90.0 Hedef</td><td>+4.8 Puan Hedef Üstü — Canlı Yetkinlik Takibi ✅</td></tr>
              <tr><td>2. Mağaza Müdürü Turnover Oranı</td><td><b>%17.0 (-%7.0 İyileşme)</b></td><td>%18.0 Hedef</td><td>-%7.0 Yıllık Düşüş — Ciro Kaybı Önleme ✅</td></tr>
              <tr><td>3. İç Terfi Oranı Başarısı</td><td><b>%39.0 (86 Personel)</b></td><td>%35.0 Hedef</td><td>86 Yönetici Terfi Etti — Dış İşe Alım Tasarrufu 🏆</td></tr>
              <tr><td>4. Yedekli Pozisyon Oranı</td><td><b>%90.0 (244/271 Kadro)</b></td><td>%85.0 Hedef</td><td>244 Kritik Kadro Tam Yedekli — Sıfır Açık Pozisyon 🛡️</td></tr>
              <tr><td>5. Çalışan Başı Eğitim Saati</td><td><b>48 Saat / Yıl</b></td><td>40 Saat / Yıl</td><td>+8 Saat Fazla Eğitim — 52.800 Saat Şirket Toplamı 📚</td></tr>
              <tr><td>6. Kişi Başı Ciro Ortalaması</td><td><b>₺1.740.000 TL</b></td><td>₺1.700.000 TL</td><td>+%6.3 Verimlilik Artışı — Marmara ₺1.85M TL Zirve 💰</td></tr>
              <tr><td>7. Taze Gıda Fire Oranı</td><td><b>%2.8 (-%0.9 Düşüş)</b></td><td>%3.0 Hedef</td><td>₺4.8M Fire Tasarrufu Katkısı — Eğitim Yetkinliği 🥬</td></tr>
              <tr><td>8. Mağaza Müdürü Hazırlık</td><td><b>42 Hazır Yönetici Adayı</b></td><td>40 Aday Hedef</td><td>%90 İç Kaynak Kapasitesi — 20 Yeni Mağaza Hazır 🏬</td></tr>
              <tr><td>9. Akademi Net ROI Katı</td><td><b>₺14.200.000 TL (7.89x)</b></td><td>₺12.0M TL</td><td>7.89x Net ROI — Harcanan ₺1 TL ye ₺7,89 Karşılık 💎</td></tr>
              <tr><td>10. LMS Modül Tamamlama Oranı</td><td><b>%94.8 Tamamlama</b></td><td>%95.0 Hedef</td><td>Saha Ekipleri Dijital Modül Başarısı 📱</td></tr>
            </tbody>
          </table>

          <h2>3. Bölgesel İnsan Sermayesi &amp; Kişi Başı Ciro Performansı</h2>
          <table>
            <thead>
              <tr><th>Bölge</th><th>Şube Sayısı</th><th>Kişi Başı Ciro</th><th>Terfi Skoru</th><th>Turnover</th><th>LMS %</th></tr>
            </thead>
            <tbody>
              <tr><td>Marmara Bölgesi</td><td>48 Mağaza</td><td>₺1.850.000 TL (+₺110K)</td><td>88.5 Puan</td><td>%9.2</td><td>%97.5</td></tr>
              <tr><td>Güney Marmara</td><td>16 Mağaza</td><td>₺1.780.000 TL (+₺40K)</td><td>86.0 Puan</td><td>%8.8</td><td>%96.0</td></tr>
              <tr><td>Ege Bölgesi</td><td>28 Mağaza</td><td>₺1.710.000 TL (-₺30K)</td><td>84.2 Puan</td><td>%10.5</td><td>%94.2</td></tr>
              <tr><td>İç Anadolu Bölgesi</td><td>24 Mağaza</td><td>₺1.680.000 TL (-₺60K)</td><td>83.8 Puan</td><td>%11.5</td><td>%93.5</td></tr>
              <tr><td>Akdeniz Bölgesi</td><td>24 Mağaza</td><td>₺1.620.000 TL (-₺120K)</td><td>81.5 Puan</td><td>%11.2</td><td>%91.0</td></tr>
              <tr class="highlight"><td>🏢 ŞİRKET GENEL ORTALAMASI</td><td>140 Mağaza</td><td>₺1.740.000 TL [BAZ]</td><td>85.4 Puan</td><td>%10.2</td><td>%94.8</td></tr>
            </tbody>
          </table>

          <h2>4. Departman &amp; Bölge Yedek Kadro Dağılım Matrisi</h2>
          <table>
            <thead>
              <tr><th>Departman</th><th>Marmara</th><th>G. Marmara</th><th>Ege</th><th>İç Anadolu</th><th>Akdeniz</th><th>Toplam Kadro</th></tr>
            </thead>
            <tbody>
              <tr><td>Mağaza Operasyonları</td><td>36/38</td><td>20/22</td><td>14/16</td><td>12/14</td><td>8/8</td><td>90/98 (%91.8)</td></tr>
              <tr><td>Kasa Operasyonları</td><td>22/24</td><td>12/13</td><td>10/11</td><td>5/6</td><td>4/5</td><td>53/59 (%89.8)</td></tr>
              <tr><td>Taze Gıda &amp; Satın Alma</td><td>18/20</td><td>11/12</td><td>8/9</td><td>5/8</td><td>0/0</td><td>42/49 (%85.7)</td></tr>
              <tr><td>Saha Direktörlüğü</td><td>14/16</td><td>10/12</td><td>10/13</td><td>0/0</td><td>0/0</td><td>34/40 (%85.0)</td></tr>
              <tr class="highlight"><td>GENEL TOPLAM YEDEKLEME DURUMU</td><td>90/98</td><td>53/59</td><td>42/49</td><td>34/40</td><td>25/25</td><td>244/271 (%90.0)</td></tr>
            </tbody>
          </table>

          <h2>5. Terfi Eden Yöneticiler ve Öne Çıkan Aday Havuzu</h2>
          <table>
            <thead>
              <tr><th>Personel Adı</th><th>Mevcut Unvan ➔ Hedef Terfi Unvanı</th><th>Şube &amp; Bölge</th><th>Akademi Skoru</th><th>Statü</th></tr>
            </thead>
            <tbody>
              <tr><td>Zeynep Karahan</td><td>Saha Direktör Yrd. ➔ Bölge Müdürü Adayı</td><td>Marmara Genel Merkez</td><td>98 PKA Derece</td><td>Hemen Atanabilir ⚡</td></tr>
              <tr><td>Selin Yılmaz</td><td>Kadıköy Müdür Yrd. ➔ Mağaza Müdürü</td><td>Marmara / Kadıköy</td><td>96 PKA Derece</td><td>Hemen Atanabilir ⚡</td></tr>
              <tr><td>Ahmet Can Demir</td><td>Beşiktaş Kasa Şefi ➔ Müdür Yrd. Adayı</td><td>Marmara / Beşiktaş</td><td>94 PKA Başarı</td><td>6 Ay İçinde Hazır ⏱️</td></tr>
              <tr><td>Arzu Demir</td><td>Satın Alma Uzmanı ➔ Kategori Müdürü</td><td>Ege / Karşıyaka</td><td>92 PKA Başarı</td><td>Hemen Atanabilir ⚡</td></tr>
              <tr><td>Caner Kaya</td><td>Nilüfer Şube Şefi ➔ Müdür Yrd. Adayı</td><td>Güney Marmara / Nilüfer</td><td>91 PKA Başarı</td><td>Gelişim Havuzunda 📈</td></tr>
              <tr><td>Ayşe Güneş</td><td>Ataköy Kasa Şefi ➔ Müdür Yrd. Adayı</td><td>Marmara / Ataköy</td><td>96 PKA Derece</td><td>HiPo Potansiyel 🌟</td></tr>
            </tbody>
          </table>

          <h2>6. Stratejik İK &amp; Büyüme Yol Haritası</h2>
          <table>
            <thead>
              <tr><th>Dönem</th><th>Eğitim Saati Hedefi</th><th>Stratejik Hedef</th><th>Bütçe &amp; Finansal ROI</th></tr>
            </thead>
            <tbody>
              <tr><td><b>Gelecek 6 Ay</b></td><td>28.000 Saat</td><td>21 Yedeksiz Pozisyonun Sıfırlanması &amp; Fire Oranı %2.4</td><td>₺1.200.000 TL Bütçe (14.50x Net ROI)</td></tr>
              <tr><td><b>Gelecek 12 Ay</b></td><td>64.000 Saat / Yıl</td><td>20 Yeni Mağaza Açılış Altyapısı (42 Yedek) &amp; %50 İç Terfi</td><td>₺2.600.000 TL Bütçe (8.46x Net ROI)</td></tr>
              <tr><td><b>Gelecek 2 Yıl</b></td><td>80.000 Saat / Yıl</td><td>200 Mağaza Ölçeği &amp; Kişi Başı Ciro ₺2.40M TL</td><td>₺4.000.000 TL Bütçe (8.75x Net ROI - ₺35M)</td></tr>
            </tbody>
          </table>

          <div class="footer">
            Gizlidir — Perakende Mühendisi Eğitim Akademisi © 2026 Yönetim Kurulu Master İcra Raporu | Tüm Hakları Saklıdır.
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // REAL FULL-PAGE EXPORT FUNCTION 2: EXCEL / CSV DOWNLOAD GENERATOR (FULL REPORT & ALL 10 SECTIONS)
  const exportToExcel = () => {
    const rows = [
      ['PERAKENDE KARİYER AKADEMİSİ — YÖNETİM KURULU İNSAN SERMAYESİ EKSİKSİZ MASTER RAPORU'],
      ['Dönem', '2026 Q3 İcra & Büyüme Analizi'],
      ['Rapor Tarihi', new Date().toLocaleDateString('tr-TR')],
      [''],
      ['=== SECTION 1: İCRA KURULU BAŞKANLIĞI MEVCUT DURUM VE STRATEJİK MASTER PLAN ==='],
      ['Değerlendirme Konusu', 'Açıklama & Finansal Katkı Metriği'],
      ['1. Mevcut Durum & Finansal İcra', '₺1.800.000 TL bütçeye karşılık ₺14.200.000 TL net tasarruf (7.89x Net ROI). Harcanan ₺1 TL şirkete ₺7,89 TL getiri sağladı. 86 Yönetici terfi etti (%39).'],
      ['2. Kadro Güvencesi & Yedekleme', '271 kritik kadronun 244 u (%90.0) akademi kaynaklarından yedekli. Mağaza operasyonları %91.8 dolulukta. Turnover %24 ten %17 ye düştü.'],
      ['3. Gelecek Büyüme & 200 Mağaza Vizyonu', '6 Ayda 21 yedeksiz pozisyon sıfırlanacak (14.5x ROI). 12 Ayda 20 yeni mağaza açılış altyapısı (8.46x ROI). 2 Yılda 200 mağaza ölçeği ve ₺35M getiri (8.75x ROI).'],
      [''],
      ['=== SECTION 2: DÖNEMLERE GÖRE HEDEF VE FİNANSAL YATIRIM KARŞILAŞTIRMA TABLOSU ==='],
      ['Metrik Kartı', 'Mevcut (Son 12 Ay)', '6 Aylık Hedef', '12 Aylık Hedef', '2 Yıllık Vizyon'],
      ['Net Tasarruf (ROI)', '₺14.200.000 TL', '₺17.400.000 TL (+₺3.2M Fire)', '₺22.000.000 TL (20 Mağaza)', '₺35.000.000 TL (Sıfır Kayıp)'],
      ['İç Terfi Başarısı', '86 Personel (%39)', '105 Personel (%44) (+19)', '135 Personel (%50)', '200+ Personel (%65)'],
      ['Kişi Başı Ciro', '₺1.740.000 TL', '₺1.880.000 TL (+₺140K)', '₺2.050.000 TL (20 Yeni Şube)', '₺2.400.000 TL (Otomasyon)'],
      ['Kişi Başı Eğitim Saati', '48 Saat / Yıl', '56 Saat / Yıl (28 Sa/6Ay)', '60 Saat / Yıl (Kişi Başı 52Sa)', '64 Saat / Yıl (Executive)'],
      ['İşletme Takvimi Eğitimi', '52.800 Saat', '28.000 Saat (Acil Program)', '64.000 Saat (20 Şube Kadro)', '80.000 Saat (200 Mağaza)'],
      ['Mağaza Müdürü Turnover', '%17.0 (-%7 Düşüş)', '%14.5 Target (21 Risk=0)', '%12.0 Target (Yüksek Bağlılık)', '%8.5 Target (%100 Tam Yedek)'],
      ['Eğitim Yatırımı Bütçesi', '₺1.800.000 TL', '₺1.200.000 TL (Acil Bütçe)', '₺2.600.000 TL (20 Şube Bütçe)', '₺4.000.000 TL (200 Mağaza)'],
      ['Harcanan 1 TL Dönüşü (ROI)', '₺7,89 (7.89x ROI)', '₺14,50 (14.50x ROI)', '₺8,46 (8.46x ROI)', '₺8,75 (8.75x ROI)'],
      [''],
      ['=== SECTION 3: İNSAN SERMAYESİ 10 STRATEJİK KPI BREAKDOWN ==='],
      ['KPI Metriği', 'Gerçekleşen Değer', 'Hedef Standart', 'Performans & Finansal Etki'],
      ['1. Sertifikalı Personel Oranı', '%94.8 (1.100 Personel)', '%90.0 Hedef', '+4.8 Puan Hedef Üstü — Canlı Yetkinlik Takibi'],
      ['2. Mağaza Müdürü Turnover', '%17.0 (-%7.0 İyileşme)', '%18.0 Hedef', '-%7.0 Yıllık Düşüş — Ciro Kaybı Önleme'],
      ['3. İç Terfi Oranı Başarısı', '%39.0 (86 Personel)', '%35.0 Hedef', '86 Yönetici Terfi Etti — Dış İşe Alım Tasarrufu'],
      ['4. Yedekli Pozisyon Oranı', '%90.0 (244/271 Kadro)', '%85.0 Hedef', '244 Kritik Kadro Tam Yedekli — Sıfır Açık Pozisyon'],
      ['5. Çalışan Başı Eğitim Saati', '48 Saat / Yıl', '40 Saat / Yıl', '+8 Saat Fazla Eğitim — 52.800 Saat Şirket Toplamı'],
      ['6. Kişi Başı Ciro Ortalaması', '₺1.740.000 TL', '₺1.700.000 TL', '+%6.3 Verimlilik Artışı — Marmara ₺1.85M TL Zirve'],
      ['7. Taze Gıda Fire Oranı', '%2.8 (-%0.9 Düşüş)', '%3.0 Hedef', '₺4.8M Fire Tasarrufu Katkısı — Eğitim Yetkinliği'],
      ['8. Mağaza Müdürü Hazırlık', '42 Hazır Yönetici Adayı', '40 Aday Hedef', '%90 İç Kaynak Kapasitesi — 20 Yeni Mağaza Hazır'],
      ['9. Akademi Net ROI Katı', '₺14.200.000 TL (7.89x)', '₺12.0M TL', '7.89x Net ROI — Harcanan ₺1 TL ye ₺7,89 Karşılık'],
      ['10. LMS Modül Tamamlama', '%94.8 Tamamlama', '%95.0 Hedef', 'Saha Ekipleri Dijital Modül Başarısı'],
      [''],
      ['=== SECTION 4: BÖLGESEL İNSAN SERMAYESİ PERFORMANS TABLOSU ==='],
      ['Bölge Adı', 'Şube Sayısı', 'Kişi Başı Ciro (TL)', 'Şirket Ort. Farkı', 'Terfi Skoru', 'Turnover Oranı', 'LMS Tamamlama', 'Genel Durum'],
      ['Marmara Bölgesi', '48 Mağaza', '₺1.850.000 TL', '+₺110K', '88.5 Puan', '%9.2', '%97.5', 'Zirve Bölge 👑'],
      ['Güney Marmara', '16 Mağaza', '₺1.780.000 TL', '+₺40K', '86.0 Puan', '%8.8', '%96.0', 'Yüksek Performans ⚡'],
      ['Ege Bölgesi', '28 Mağaza', '₺1.710.000 TL', '-₺30K', '84.2 Puan', '%10.5', '%94.2', 'Dengeli ⚖️'],
      ['İç Anadolu Bölgesi', '24 Mağaza', '₺1.680.000 TL', '-₺60K', '83.8 Puan', '%11.5', '%93.5', 'Destek Sınıfında 🟡'],
      ['Akdeniz Bölgesi', '24 Mağaza', '₺1.620.000 TL', '-₺120K', '81.5 Puan', '%11.2', '%91.0', 'Gelişimde 📈'],
      ['ŞİRKET GENEL ORTALAMASI', '140 Mağaza', '₺1.740.000 TL', 'BAZ DEĞER', '85.4 Puan', '%10.2', '%94.8', 'Genel Hedef Tutmuştur 🎯'],
      [''],
      ['=== SECTION 5: DEPARTMAN VE BÖLGE BAZLI YEDEK KADRO DAĞILIM MATRİSİ ==='],
      ['Departman / Sorumluluk Alanı', 'Marmara', 'Güney Marmara', 'Ege', 'İç Anadolu', 'Akdeniz', 'Toplam Doluluk', 'Yedek Doluluk Oranı'],
      ['Mağaza Operasyonları (Müdür & Yrd)', '36 / 38', '20 / 22', '14 / 16', '12 / 14', '8 / 8', '90 / 98 Kadro', '%91.8 Doluluk'],
      ['Kasa Operasyonları & Şeflik', '22 / 24', '12 / 13', '10 / 11', '5 / 6', '4 / 5', '53 / 59 Kadro', '%89.8 Doluluk'],
      ['Taze Gıda & Satın Alma Uzmanlığı', '18 / 20', '11 / 12', '8 / 9', '5 / 8', '0 / 0', '42 / 49 Kadro', '%85.7 Doluluk'],
      ['Saha Direktörlüğü & Bölge Yöneticiliği', '14 / 16', '10 / 12', '10 / 13', '0 / 0', '0 / 0', '34 / 40 Kadro', '%85.0 Doluluk'],
      ['GENEL TOPLAM YEDEKLEME DURUMU', '90 / 98', '53 / 59', '42 / 49', '34 / 40', '25 / 25', '244 / 271 Kadro', '%90.0 Tam Doluluk 🎯'],
      [''],
      ['=== SECTION 6: TERFİ EDEN YÖNETİCİLER VE ADAY HAVUZU (ÖNE ÇIKAN KAYITLAR) ==='],
      ['Personel Adı', 'Mevcut Unvan ➔ Hedef Terfi Unvanı', 'Şube & Bölge', 'Akademi Skoru', 'Onay Statüsü'],
      ['Zeynep Karahan', 'Saha Direktör Yrd. ➔ Bölge Müdürü Adayı', 'Marmara Genel Merkez', '98 PKA Derece', 'Hemen Atanabilir ⚡'],
      ['Selin Yılmaz', 'Kadıköy Müdür Yrd. ➔ Mağaza Müdürü', 'Marmara / Kadıköy', '96 PKA Derece', 'Hemen Atanabilir ⚡'],
      ['Ahmet Can Demir', 'Beşiktaş Kasa Şefi ➔ Müdür Yrd. Adayı', 'Marmara / Beşiktaş', '94 PKA Başarı', '6 Ay İçinde Hazır ⏱️'],
      ['Arzu Demir', 'Satın Alma Uzmanı ➔ Kategori Müdürü', 'Ege / Karşıyaka', '92 PKA Başarı', 'Hemen Atanabilir ⚡'],
      ['Caner Kaya', 'Nilüfer Şube Şefi ➔ Müdür Yrd. Adayı', 'Güney Marmara / Nilüfer', '91 PKA Başarı', 'Gelişim Havuzunda 📈'],
      ['Ayşe Güneş', 'Ataköy Kasa Şefi ➔ Müdür Yrd. Adayı', 'Marmara / Ataköy', '96 PKA Derece', 'HiPo Potansiyel 🌟'],
      [''],
      ['=== SECTION 7: STRATEJİK İK & BÜYÜME YOL HARİTASI HEDEFLERİ ==='],
      ['Dönem', 'Hedeflenen Eğitim Saati', 'Ana Stratejik Aksiyon', 'Hedef Metrik & ROI'],
      ['Gelecek 6 Ay', '28.000 Saat', '21 Yedeksiz Pozisyonun Sıfırlanması & Fire Önleme', '0 Riskli Pozisyon (14.50x ROI)'],
      ['Gelecek 12 Ay', '64.000 Saat / Yıl', '20 Yeni Mağaza Açılış Altyapısı (42 Yedek)', '%50 İç Terfi Oranı (8.46x ROI)'],
      ['Gelecek 2 Yıl', '80.000 Saat / Yıl', '200 Mağaza Ölçeği & PKA Executive Liderlik', '₺2.40M Kişi Başı Ciro (8.75x ROI)']
    ];

    const csvContent = "\uFEFF" + rows.map(e => e.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `PKA_Yonetim_Kurulu_Eksiksiz_Master_Raporu_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // REAL FULL-PAGE EXPORT FUNCTION 3: WORD (.DOC) DOWNLOAD GENERATOR (EKSİKSİZ MASTER RAPOR)
  const exportToWord = () => {
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>2026 Q3 Yönetim Kurulu İnsan Sermayesi Eksiksiz Master Raporu</title>
      <style>
        body { font-family: 'Calibri', Arial, sans-serif; font-size: 10.5pt; color: #1e293b; line-height: 1.5; }
        h1 { font-size: 18pt; color: #0f172a; border-bottom: 2.5pt solid #f59e0b; padding-bottom: 4pt; margin-bottom: 4pt; }
        h2 { font-size: 12.5pt; color: #0369a1; margin-top: 14pt; border-bottom: 1pt solid #cbd5e1; padding-bottom: 2pt; text-transform: uppercase; }
        .box { background: #f8fafc; border: 1pt solid #cbd5e1; border-left: 4pt solid #f59e0b; padding: 10pt; margin-bottom: 12pt; border-radius: 4pt; }
        table { width: 100%; border-collapse: collapse; margin-top: 8pt; margin-bottom: 12pt; }
        th { background: #0f172a; color: white; padding: 6pt; text-align: left; font-size: 9.5pt; text-transform: uppercase; }
        td { border: 1pt solid #e2e8f0; padding: 5pt 6pt; font-size: 9.5pt; }
        .highlight { background: #fef3c7; font-weight: bold; }
        .grid { width: 100%; margin-top: 6pt; }
        .grid td { vertical-align: top; background: #ffffff; padding: 8pt; }
      </style>
      </head>
      <body>
        <h1>YÖNETİM KURULU İNSAN SERMAYESİ & STRATEJİK BÜYÜME MASTER RAPORU — 2026 Q3</h1>
        <p><b>Rapor Tarihi:</b> ${new Date().toLocaleDateString('tr-TR')} | <b>Kurum:</b> Perakende Mühendisi Eğitim Akademisi</p>
        
        <div class="box">
          <b>👑 İCRA KURULU BAŞKANLIĞI: MEVCUT DURUM DEĞERLENDİRMESİ VE GELECEK STRATEJİK PLANLAMASI</b><br/><br/>
          <table class="grid">
            <tr>
              <td width="33%">
                <b>1. Mevcut Durum & Finansal İcra:</b><br/>
                Şirketimiz <b>₺1.800.000 TL</b> tutarındaki eğitim yatırımına karşılık <b>₺14.200.000 TL</b> net tasarruf elde ederek <b>7.89x ROI (%789 getiri)</b> sağlamıştır. Harcanan ₺1 TL şirkete ₺7,89 TL getiri kazandırmıştır. 86 Yönetici terfi etmiştir (%39).
              </td>
              <td width="33%">
                <b>2. Kadro Güvencesi & Yedekleme:</b><br/>
                271 kritik kadronun <b>244'ü (%90.0)</b> akademi kaynaklarından yedeklidir. Mağaza Operasyonlarında %91.8 doluluk oranına ulaşılmıştır. Turnover oranı %24.0'ten %17.0'ye (-%7.0 iyileşme) gerilemiştir.
              </td>
              <td width="33%">
                <b>3. Gelecek Büyüme & 200 Mağaza Vizyonu:</b><br/>
                Gelecek 6 ayda 21 yedeksiz pozisyon sıfırlanıp ₺17.4M getiri; 12 ayda 20 yeni mağaza için ₺2.6M bütçe ile 64.000 saat eğitim; 2 yıllık vizyonda ise 200 mağaza ölçeği ile net getiri <b>₺35.000.000 TL'ye (8.75x ROI)</b> çıkarılacaktır.
              </td>
            </tr>
          </table>
          <p style="font-size: 9pt; color: #475569; margin-top: 6pt;">
            <i><b>Yönetim Kurulu İcra Direktifi:</b> Perakende Mühendisi Eğitim Akademisi, insan kaynağını en yüksek getiri sağlayan stratejik yatırım aracına dönüştürmüştür. Önümüzdeki 24 ayda hedefimiz, yeni açılacak 60+ şubeyi %100 akademi iç kaynaklarından terfi eden liderlerle yönetmektir.</i>
          </p>
        </div>

        <h2>1. Dönemlere Göre Hedef ve Finansal Yatırım Karşılaştırma Tablosu</h2>
        <table>
          <tr><th>Metrik Kartı</th><th>Mevcut (Son 12 Ay)</th><th>6 Aylık Hedef</th><th>12 Aylık Hedef</th><th>2 Yıllık Vizyon</th></tr>
          <tr><td>Net Tasarruf (ROI)</td><td><b>₺14.200.000 TL</b></td><td>₺17.400.000 TL (+₺3.2M)</td><td>₺22.000.000 TL (20 Mağaza)</td><td>₺35.000.000 TL (Sıfır Kayıp)</td></tr>
          <tr><td>İç Terfi Başarısı</td><td><b>86 Personel (%39)</b></td><td>105 Personel (%44) (+19)</td><td>135 Personel (%50)</td><td>200+ Personel (%65)</td></tr>
          <tr><td>Kişi Başı Ciro Ortalaması</td><td><b>₺1.740.000 TL</b></td><td>₺1.880.000 TL (+₺140K)</td><td>₺2.050.000 TL (20 Şube)</td><td>₺2.400.000 TL (Otomasyon)</td></tr>
          <tr><td>Kişi Başı Eğitim Saati</td><td><b>48 Saat / Yıl</b></td><td>56 Saat / Yıl (28Sa/6Ay)</td><td>60 Saat / Yıl (52Sa/Kişi)</td><td>64 Saat / Yıl (Executive)</td></tr>
          <tr><td>İşletme Takvimi Eğitimi</td><td><b>52.800 Saat</b></td><td>28.000 Saat (Acil Program)</td><td>64.000 Saat (20 Şube)</td><td>80.000 Saat (200 Mağaza)</td></tr>
          <tr><td>Mağaza Müdürü Turnover Oranı</td><td><b>%17.0</b></td><td>%14.5 Target (21 Risk=0)</td><td>%12.0 Target (Bağlılık)</td><td>%8.5 Target (%100 Yedek)</td></tr>
          <tr><td>Eğitim Yatırımı Bütçesi</td><td><b>₺1.800.000 TL</b></td><td>₺1.200.000 TL (Acil Bütçe)</td><td>₺2.600.000 TL (20 Şube Bütçe)</td><td>₺4.000.000 TL (200 Mağaza)</td></tr>
          <tr class="highlight"><td>Harcanan 1 TL Dönüşü (ROI)</td><td><b>₺7,89 (7.89x ROI)</b></td><td><b>₺14,50 (14.50x ROI)</b></td><td><b>₺8,46 (8.46x ROI)</b></td><td><b>₺8,75 (8.75x ROI)</b></td></tr>
        </table>

        <h2>2. İnsan Sermayesi 10 Stratejik KPI Kırılımı</h2>
        <table>
          <tr><th>KPI Metriği</th><th>Gerçekleşen Değer</th><th>Hedef Standart</th><th>Performans & Finansal Etki</th></tr>
          <tr><td>1. Sertifikalı Personel Oranı</td><td><b>%94.8 (1.100 Personel)</b></td><td>%90.0 Hedef</td><td>+4.8 Puan Hedef Üstü — Canlı Yetkinlik Takibi</td></tr>
          <tr><td>2. Mağaza Müdürü Turnover Oranı</td><td><b>%17.0 (-%7.0 İyileşme)</b></td><td>%18.0 Hedef</td><td>-%7.0 Yıllık Düşüş — Ciro Kaybı Önleme</td></tr>
          <tr><td>3. İç Terfi Oranı Başarısı</td><td><b>%39.0 (86 Personel)</b></td><td>%35.0 Hedef</td><td>86 Yönetici Terfi Etti — Dış İşe Alım Tasarrufu</td></tr>
          <tr><td>4. Yedekli Pozisyon Oranı</td><td><b>%90.0 (244/271 Kadro)</b></td><td>%85.0 Hedef</td><td>244 Kritik Kadro Tam Yedekli — Sıfır Açık Pozisyon</td></tr>
          <tr><td>5. Çalışan Başı Eğitim Saati</td><td><b>48 Saat / Yıl</b></td><td>40 Saat / Yıl</td><td>+8 Saat Fazla Eğitim — 52.800 Saat Şirket Toplamı</td></tr>
          <tr><td>6. Kişi Başı Ciro Ortalaması</td><td><b>₺1.740.000 TL</b></td><td>₺1.700.000 TL</td><td>+%6.3 Verimlilik Artışı — Marmara ₺1.85M TL Zirve</td></tr>
          <tr><td>7. Taze Gıda Fire Oranı</td><td><b>%2.8 (-%0.9 Düşüş)</b></td><td>%3.0 Hedef</td><td>₺4.8M Fire Tasarrufu Katkısı — Eğitim Yetkinliği</td></tr>
          <tr><td>8. Mağaza Müdürü Hazırlık</td><td><b>42 Hazır Yönetici Adayı</b></td><td>40 Aday Hedef</td><td>%90 İç Kaynak Kapasitesi — 20 Yeni Mağaza Hazır</td></tr>
          <tr><td>9. Akademi Net ROI Katı</td><td><b>₺14.200.000 TL (7.89x)</b></td><td>₺12.0M TL</td><td>7.89x Net ROI — Harcanan ₺1 TL ye ₺7,89 Karşılık</td></tr>
          <tr><td>10. LMS Modül Tamamlama Oranı</td><td><b>%94.8 Tamamlama</b></td><td>%95.0 Hedef</td><td>Saha Ekipleri Dijital Modül Başarısı</td></tr>
        </table>

        <h2>3. Bölgesel İnsan Sermayesi & Kişi Başı Ciro Performansı</h2>
        <table>
          <tr><th>Bölge</th><th>Şube Sayısı</th><th>Kişi Başı Ciro</th><th>Terfi Skoru</th><th>Turnover</th><th>LMS %</th></tr>
          <tr><td>Marmara Bölgesi</td><td>48 Mağaza</td><td>₺1.850.000 TL (+₺110K)</td><td>88.5 Puan</td><td>%9.2</td><td>%97.5</td></tr>
          <tr><td>Güney Marmara</td><td>16 Mağaza</td><td>₺1.780.000 TL (+₺40K)</td><td>86.0 Puan</td><td>%8.8</td><td>%96.0</td></tr>
          <tr><td>Ege Bölgesi</td><td>28 Mağaza</td><td>₺1.710.000 TL (-₺30K)</td><td>84.2 Puan</td><td>%10.5</td><td>%94.2</td></tr>
          <tr><td>İç Anadolu Bölgesi</td><td>24 Mağaza</td><td>₺1.680.000 TL (-₺60K)</td><td>83.8 Puan</td><td>%11.5</td><td>%93.5</td></tr>
          <tr><td>Akdeniz Bölgesi</td><td>24 Mağaza</td><td>₺1.620.000 TL (-₺120K)</td><td>81.5 Puan</td><td>%11.2</td><td>%91.0</td></tr>
          <tr class="highlight"><td>🏢 ŞİRKET GENEL ORTALAMASI</td><td>140 Mağaza</td><td>₺1.740.000 TL [BAZ]</td><td>85.4 Puan</td><td>%10.2</td><td>%94.8</td></tr>
        </table>

        <h2>4. Departman & Bölge Yedek Kadro Dağılım Matrisi</h2>
        <table>
          <tr><th>Departman</th><th>Marmara</th><th>G. Marmara</th><th>Ege</th><th>İç Anadolu</th><th>Akdeniz</th><th>Toplam Kadro</th></tr>
          <tr><td>Mağaza Operasyonları</td><td>36/38</td><td>20/22</td><td>14/16</td><td>12/14</td><td>8/8</td><td>90/98 (%91.8)</td></tr>
          <tr><td>Kasa Operasyonları</td><td>22/24</td><td>12/13</td><td>10/11</td><td>5/6</td><td>4/5</td><td>53/59 (%89.8)</td></tr>
          <tr><td>Taze Gıda & Satın Alma</td><td>18/20</td><td>11/12</td><td>8/9</td><td>5/8</td><td>0/0</td><td>42/49 (%85.7)</td></tr>
          <tr><td>Saha Direktörlüğü</td><td>14/16</td><td>10/12</td><td>10/13</td><td>0/0</td><td>0/0</td><td>34/40 (%85.0)</td></tr>
          <tr class="highlight"><td>GENEL TOPLAM YEDEKLEME DURUMU</td><td>90/98</td><td>53/59</td><td>42/49</td><td>34/40</td><td>25/25</td><td>244/271 (%90.0)</td></tr>
        </table>

        <h2>5. Terfi Eden Yöneticiler ve Öne Çıkan Aday Havuzu</h2>
        <table>
          <tr><th>Personel Adı</th><th>Mevcut Unvan ➔ Hedef Terfi Unvanı</th><th>Şube & Bölge</th><th>Akademi Skoru</th><th>Statü</th></tr>
          <tr><td>Zeynep Karahan</td><td>Saha Direktör Yrd. ➔ Bölge Müdürü Adayı</td><td>Marmara Genel Merkez</td><td>98 PKA Derece</td><td>Hemen Atanabilir ⚡</td></tr>
          <tr><td>Selin Yılmaz</td><td>Kadıköy Müdür Yrd. ➔ Mağaza Müdürü</td><td>Marmara / Kadıköy</td><td>96 PKA Derece</td><td>Hemen Atanabilir ⚡</td></tr>
          <tr><td>Ahmet Can Demir</td><td>Beşiktaş Kasa Şefi ➔ Müdür Yrd. Adayı</td><td>Marmara / Beşiktaş</td><td>94 PKA Başarı</td><td>6 Ay İçinde Hazır ⏱️</td></tr>
          <tr><td>Arzu Demir</td><td>Satın Alma Uzmanı ➔ Kategori Müdürü</td><td>Ege / Karşıyaka</td><td>92 PKA Başarı</td><td>Hemen Atanabilir ⚡</td></tr>
          <tr><td>Caner Kaya</td><td>Nilüfer Şube Şefi ➔ Müdür Yrd. Adayı</td><td>Güney Marmara / Nilüfer</td><td>91 PKA Başarı</td><td>Gelişim Havuzunda 📈</td></tr>
          <tr><td>Ayşe Güneş</td><td>Ataköy Kasa Şefi ➔ Müdür Yrd. Adayı</td><td>Marmara / Ataköy</td><td>96 PKA Derece</td><td>HiPo Potansiyel 🌟</td></tr>
        </table>

        <h2>6. Stratejik İK & Büyüme Yol Haritası</h2>
        <table>
          <tr><th>Dönem</th><th>Eğitim Saati Hedefi</th><th>Stratejik Hedef</th><th>Bütçe & Finansal ROI</th></tr>
          <tr><td><b>Gelecek 6 Ay</b></td><td>28.000 Saat</td><td>21 Yedeksiz Pozisyonun Sıfırlanması & Fire Oranı %2.4</td><td>₺1.200.000 TL Bütçe (14.50x Net ROI)</td></tr>
          <tr><td><b>Gelecek 12 Ay</b></td><td>64.000 Saat / Yıl</td><td>20 Yeni Mağaza Açılış Altyapısı (42 Yedek) & %50 İç Terfi</td><td>₺2.600.000 TL Bütçe (8.46x Net ROI)</td></tr>
          <tr><td><b>Gelecek 2 Yıl</b></td><td>80.000 Saat / Yıl</td><td>200 Mağaza Ölçeği & Kişi Başı Ciro ₺2.40M TL</td><td>₺4.000.000 TL Bütçe (8.75x Net ROI - ₺35M)</td></tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PKA_Yonetim_Kurulu_Eksiksiz_Master_Raporu_2026.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#061B33] text-white flex flex-col font-sans">
      {/* Top Header Bar */}
      <div className="bg-[#0B2A4A] border-b border-white/10 px-6 sm:px-10 py-5">
        <div className="w-full max-w-[1850px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg">
              <Crown className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">CEO &amp; Üst Yönetim Portalı (EXECUTIVE)</h1>
              <p className="text-xs sm:text-sm text-amber-300 font-bold">İnsan Sermayesi Yönetici Özeti &amp; Yeni Mağaza Açma Simülatörü</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('board')}
              className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold rounded-xl text-xs flex items-center space-x-2 shadow-md cursor-pointer transition-all"
            >
              <FileText className="h-4 w-4" />
              <span>📄 Yönetim Kurulu Raporuna Git ➔</span>
            </button>

            <Link href="/" className="text-xs sm:text-sm text-gray-300 hover:text-white px-3 py-1.5 font-bold transition-colors">
              Ana Siteye Dön
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1850px] mx-auto px-6 sm:px-10 py-8 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CEO SIDEBAR NAVIGATION */}
        <div className="lg:col-span-3 space-y-1.5 bg-[#0B2A4A] p-4 rounded-3xl border border-white/10 h-fit text-xs sm:text-sm font-bold shadow-xl">
          <div className="px-4 py-3 text-xs font-black text-amber-400 uppercase tracking-wider border-b border-white/10 mb-2">
            Yönetim Özeti Navigasyonu
          </div>

          {[
            { id: 'summary', name: 'Yönetici Özeti', icon: BarChart3 },
            { id: 'capital', name: 'İnsan Sermayesi (10 KPI)', icon: Users },
            { id: 'risks', name: 'Kritik Riskler', icon: ShieldAlert },
            { id: 'pipeline', name: 'Yönetici Aday Havuzu', icon: Award },
            { id: 'succession', name: 'Yedekleme Durumu', icon: Building2 },
            { id: 'comparison', name: 'Şube/Bölge Karşılaştırması', icon: TrendingUp },
            { id: 'scenario', name: 'Yeni Mağaza Açma Simülatörü', icon: Sparkles },
            { id: 'roi', name: 'Finansal Etki & ROI', icon: DollarSign },
            { id: 'board', name: 'Yönetim Kurulu Raporu', icon: FileText },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all cursor-pointer ${
                  activeTab === item.id ? 'bg-amber-500 text-slate-950 font-black shadow-lg scale-[1.02]' : 'text-gray-200 hover:bg-white/10'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="text-xs sm:text-sm">{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* CEO CONTENT AREA */}
        <div className="lg:col-span-9 space-y-8">
          
          {activeTab === 'summary' && (
            <div className="space-y-6">
              <ExecutiveDashboard />
            </div>
          )}

          {/* İNSAN SERMAYESİ 10 KPI TABI */}
          {activeTab === 'capital' && (
            <div className="bg-[#0B2A4A] p-8 rounded-3xl border border-white/10 space-y-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full w-fit mb-1 border border-amber-400/30">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>Son 12 Aylık Performans &amp; Trend Analiz Ekranı</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">10 İnsan Sermayesi Stratejik KPI Özeti</h2>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">
                    Herhangi bir KPI kartına tıklayarak <strong>son 12 aylık gelişim grafiğini</strong> ve ay ay performans değişim tablosunu detaylı inceleyin.
                  </p>
                </div>

                <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 px-4 py-2 rounded-2xl border border-cyan-500/40">
                  📅 Dönem: Eylül 2025 – Ağustos 2026
                </span>
              </div>

              {/* 10 KPI CARDS GRID (CLICKABLE) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs sm:text-sm">
                {STRATEGIC_KPIS_12M.map((kpi, idx) => {
                  const isSelected = selectedKpiIndex === idx;
                  return (
                    <div
                      key={kpi.id}
                      onClick={() => setSelectedKpiIndex(idx)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-2 shadow-md relative overflow-hidden transform hover:-translate-y-1 ${
                        isSelected
                          ? 'bg-[#082240] border-2 border-amber-400 shadow-2xl shadow-amber-500/20 ring-2 ring-amber-400/40'
                          : 'bg-[#061B33] border-white/15 hover:border-amber-400/60 hover:bg-[#082240]/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-300 block truncate">{kpi.name}</span>
                        {isSelected && (
                          <span className="text-[10px] font-mono font-black text-slate-950 bg-amber-400 px-2 py-0.5 rounded-full">
                            AKTİF
                          </span>
                        )}
                      </div>

                      <div className="text-2xl sm:text-3xl font-black text-amber-400">{kpi.val}</div>

                      <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs">
                        <span className={`font-extrabold ${kpi.color}`}>{kpi.trend} vs Geçen Yıl</span>
                        <span className="text-[10px] text-cyan-300 font-bold hover:underline">
                          📈 Grafiği Gör →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 🔴 INTERACTIVE 12-MONTH CHART & DEVELOPMENT ANALYSIS PANEL */}
              {(() => {
                const selectedKpi = STRATEGIC_KPIS_12M[selectedKpiIndex] || STRATEGIC_KPIS_12M[0];
                const maxVal = Math.max(...selectedKpi.monthlyData.map((d) => d.value));
                const minVal = Math.min(...selectedKpi.monthlyData.map((d) => d.value));
                const valRange = maxVal - minVal || 1;

                return (
                  <div className="bg-[#061B33] p-6 sm:p-8 rounded-3xl border-2 border-amber-400/40 space-y-6 shadow-2xl animate-in fade-in duration-200">
                    
                    {/* Selected KPI Header Banner */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                      <div>
                        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-300 mb-1">
                          <BarChart3 className="h-4 w-4 text-amber-400" />
                          <span>Seçili Metrik Detay Analizi</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white">
                          {selectedKpi.name} — Son 12 Aylık Performans &amp; Gelişim Grafiği
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl leading-relaxed">
                          {selectedKpi.description}
                        </p>
                      </div>

                      <div className="bg-amber-500/10 border border-amber-400/30 p-4 rounded-2xl text-center shrink-0 min-w-[200px]">
                        <span className="text-xs text-amber-300 font-bold block uppercase">Güncel Sonuç (Ağustos 2026)</span>
                        <div className="text-3xl font-black text-amber-400 mt-1">{selectedKpi.val}</div>
                        <span className={`text-xs font-extrabold block mt-0.5 ${selectedKpi.color}`}>
                          {selectedKpi.trend} 12 Aylık Değişim
                        </span>
                      </div>
                    </div>

                    {/* SVG BAR & LINE CHART (12 MONTHS) */}
                    <div className="space-y-3 bg-[#0B2A4A] p-6 rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between text-xs font-bold text-gray-300 border-b border-white/10 pb-2">
                        <span className="flex items-center space-x-1.5 text-amber-300">
                          <Sparkles className="h-4 w-4" />
                          <span>12 Aylık İlerleme Çubuk Grafiği (Eylül 2025 - Ağustos 2026)</span>
                        </span>
                        <span className="text-[11px] font-mono text-cyan-300">Değerler Ay Bazında Hesaplanmıştır</span>
                      </div>

                      {/* Chart Grid Container */}
                      <div className="h-88 sm:h-96 flex items-end justify-between gap-1 sm:gap-2 pt-24 pb-4 px-3 sm:px-6 border-b border-white/10 relative overflow-hidden">
                        {selectedKpi.monthlyData.map((d, idx) => {
                          const heightPercent = Math.max(15, Math.min(55, ((d.value - minVal) / (valRange || 1)) * 40 + 15));
                          const isMax = d.value === maxVal;
                          const isMin = d.value === minVal;
                          const prevVal = idx > 0 ? selectedKpi.monthlyData[idx - 1].value : d.value;
                          const momDiff = d.value - prevVal;
                          const isMonthSelected = selectedMonthFilter === d.month;

                          return (
                            <div
                              key={idx}
                              onClick={() => setSelectedMonthFilter(selectedMonthFilter === d.month ? 'ALL' : d.month)}
                              className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer min-w-0"
                            >
                              
                              {/* 🔴 Top Labels Stack: ZIRVE badge, Main Value, and MoM Change Score */}
                              <div className="flex flex-col items-center mb-1.5 space-y-0.5 z-10 w-full px-0.5">
                                {isMonthSelected && (
                                  <span className="text-[8px] sm:text-[9px] bg-cyan-400 text-slate-950 font-black px-1.5 py-0.5 rounded-full shadow-lg whitespace-nowrap mb-0.5 ring-2 ring-cyan-300">
                                    🎯 SEÇİLİ
                                  </span>
                                )}
                                {isMax && !isMonthSelected && (
                                  <span className="text-[8px] sm:text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-full shadow-md whitespace-nowrap mb-0.5 animate-pulse">
                                    👑 ZİRVE
                                  </span>
                                )}

                                {/* Main Value - Crisp High Contrast */}
                                <span className={`text-[10px] sm:text-xs font-mono font-black tracking-tighter truncate ${
                                  isMonthSelected
                                    ? 'text-cyan-300 font-black scale-105'
                                    : isMax
                                    ? 'text-amber-300 font-extrabold'
                                    : 'text-white'
                                }`}>
                                  {selectedKpi.id === 'ciro'
                                    ? `₺${Math.round(d.value * 1000000).toLocaleString('tr-TR')}`
                                    : d.formatted}
                                </span>

                                {/* MoM Change Score (Inverse KPI'lar için düşüş yeşildir, Ciro için Hem TL Hem % Gösterilir) */}
                                {idx === 0 ? (
                                  <span className="text-[8px] font-mono text-gray-400 font-bold bg-white/5 px-1 rounded">
                                    (Başlangıç)
                                  </span>
                                ) : (() => {
                                  const isInverse = !!selectedKpi.inverseMetric;
                                  const isGood = isInverse ? momDiff < 0 : momDiff > 0;
                                  
                                  let labelText = '';
                                  if (selectedKpi.id === 'ciro' || selectedKpi.unit === '₺') {
                                    const pctChange = prevVal > 0 ? (momDiff / prevVal) * 100 : 0;
                                    const tlDiffK = Math.round(momDiff * 1000);
                                    const sign = momDiff >= 0 ? '+' : '-';
                                    const pctStr = `${sign}%${Math.abs(pctChange).toFixed(1)}`;
                                    const tlStr = `${sign}₺${Math.abs(tlDiffK)}K`;
                                    labelText = `${tlStr} (${pctStr})`;
                                  } else {
                                    labelText = momDiff > 0 ? `+${momDiff > 10 ? momDiff.toFixed(0) : momDiff.toFixed(2)}` : (momDiff < -10 ? momDiff.toFixed(0) : momDiff.toFixed(2));
                                  }

                                  return (
                                    <span className={`text-[8px] sm:text-[9px] font-mono font-extrabold px-1 sm:px-1.5 py-0.5 rounded border whitespace-nowrap ${
                                      isGood
                                        ? 'text-emerald-400 bg-emerald-950/90 border-emerald-500/40'
                                        : 'text-rose-400 bg-rose-950/90 border-rose-500/40'
                                    }`}>
                                      {labelText}
                                    </span>
                                  );
                                })()}
                              </div>

                              {/* Bar */}
                              <div
                                style={{ height: `${heightPercent}%` }}
                                className={`w-full rounded-t-xl transition-all duration-300 relative group-hover:brightness-125 shadow-lg ${
                                  isMonthSelected
                                    ? 'bg-gradient-to-t from-cyan-600 via-cyan-400 to-cyan-300 ring-4 ring-amber-400 shadow-2xl shadow-cyan-500/50 scale-[1.05]'
                                    : isMax
                                    ? 'bg-gradient-to-t from-amber-600 via-amber-400 to-amber-300 shadow-amber-500/50'
                                    : isMin
                                    ? 'bg-gradient-to-t from-slate-700 to-slate-500 opacity-75'
                                    : 'bg-gradient-to-t from-[#087F96] via-cyan-500 to-cyan-300'
                                }`}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* X Axis Labels (Months) */}
                      <div className="flex items-center justify-between text-[11px] font-mono font-bold text-gray-300 px-2 pt-2">
                        {selectedKpi.monthlyData.map((d, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedMonthFilter(selectedMonthFilter === d.month ? 'ALL' : d.month)}
                            className={`flex-1 text-center truncate py-1 rounded transition-all cursor-pointer ${
                              selectedMonthFilter === d.month
                                ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                                : 'hover:bg-white/10 text-gray-300'
                            }`}
                          >
                            {d.month}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 🔴 12 MONTHLY VALUES & DETAILED PERSONNEL BREAKDOWN TABLES FOR ALL 10 KPIS */}
                    <div className="space-y-6">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
                        <div>
                          <h4 className="text-base sm:text-lg font-black text-white flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-amber-400" />
                            <span>
                              {selectedKpi.name} — Detaylı Personel &amp; Şube Başarı Listesi
                            </span>
                          </h4>
                          <p className="text-xs text-gray-300 mt-0.5">
                            Grafikten bir aya tıklayarak veya aşağıdaki filtreleri kullanarak detaylı kayıtları anında listeleyebilirsiniz.
                          </p>
                        </div>

                        {/* 🎛️ INTERACTIVE FILTERS FOR ALL 10 KPIS */}
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          {/* Month Filter Dropdown */}
                          <div className="flex items-center space-x-1.5 bg-[#082240] px-3 py-1.5 rounded-xl border border-white/15">
                            <span className="text-amber-400 font-extrabold">📅 Ay:</span>
                            <select
                              value={selectedMonthFilter}
                              onChange={(e) => setSelectedMonthFilter(e.target.value)}
                              className="bg-transparent text-white font-bold font-mono focus:outline-none cursor-pointer"
                            >
                              <option value="ALL" className="bg-[#0B2A4A] text-white">Tüm Aylar (12 Aylık)</option>
                              {selectedKpi.monthlyData.map((m) => (
                                <option key={m.month} value={m.month} className="bg-[#0B2A4A] text-white">
                                  {m.month} ({m.formatted})
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Department Filter Dropdown */}
                          <div className="flex items-center space-x-1.5 bg-[#082240] px-3 py-1.5 rounded-xl border border-white/15">
                            <span className="text-amber-400 font-extrabold">🏢 Departman:</span>
                            <select
                              value={selectedDepartmentFilter}
                              onChange={(e) => setSelectedDepartmentFilter(e.target.value)}
                              className="bg-transparent text-white font-bold font-mono focus:outline-none cursor-pointer"
                            >
                              <option value="ALL" className="bg-[#0B2A4A] text-white">Tüm Departmanlar</option>
                              <option value="Mağaza Operasyonları" className="bg-[#0B2A4A] text-white">Mağaza Operasyonları</option>
                              <option value="Taze Gıda & Satın Alma" className="bg-[#0B2A4A] text-white">Taze Gıda & Satın Alma</option>
                              <option value="Kasa Operasyonları" className="bg-[#0B2A4A] text-white">Kasa Operasyonları</option>
                              <option value="Saha Direktörlüğü" className="bg-[#0B2A4A] text-white">Saha Direktörlüğü</option>
                            </select>
                          </div>

                          {/* Region Filter Dropdown */}
                          <div className="flex items-center space-x-1.5 bg-[#082240] px-3 py-1.5 rounded-xl border border-white/15">
                            <span className="text-amber-400 font-extrabold">📍 Bölge:</span>
                            <select
                              value={selectedRegionFilter}
                              onChange={(e) => setSelectedRegionFilter(e.target.value)}
                              className="bg-transparent text-white font-bold font-mono focus:outline-none cursor-pointer"
                            >
                              <option value="ALL" className="bg-[#0B2A4A] text-white">Tüm Bölgeler</option>
                              <option value="Marmara Bölgesi" className="bg-[#0B2A4A] text-white">Marmara Bölgesi</option>
                              <option value="İç Anadolu Bölgesi" className="bg-[#0B2A4A] text-white">İç Anadolu Bölgesi</option>
                              <option value="Ege Bölgesi" className="bg-[#0B2A4A] text-white">Ege Bölgesi</option>
                              <option value="Akdeniz Bölgesi" className="bg-[#0B2A4A] text-white">Akdeniz Bölgesi</option>
                              <option value="Güney Marmara" className="bg-[#0B2A4A] text-white">Güney Marmara</option>
                            </select>
                          </div>

                          {/* Reset Filters Button */}
                          {(selectedMonthFilter !== 'ALL' || selectedDepartmentFilter !== 'ALL' || selectedRegionFilter !== 'ALL') && (
                            <button
                              onClick={() => {
                                setSelectedMonthFilter('ALL');
                                setSelectedDepartmentFilter('ALL');
                                setSelectedRegionFilter('ALL');
                              }}
                              className="px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold rounded-xl border border-rose-500/40 cursor-pointer transition-all"
                            >
                              🔄 Filtreleri Sıfırla
                            </button>
                          )}
                        </div>
                      </div>

                      {/* DETAILED PERSONNEL & OPERATIONAL BREAKDOWN TABLE FOR ACTIVE KPI */}
                      {(() => {
                        const rawRecords = KPI_BREAKDOWN_DATA[selectedKpi.id] || PROMOTED_EXECUTIVES_LIST;
                        const filteredRecords = rawRecords.filter((person) => {
                          const matchesMonth = selectedMonthFilter === 'ALL' || person.monthCode === selectedMonthFilter;
                          const matchesDept = selectedDepartmentFilter === 'ALL' || person.department === selectedDepartmentFilter;
                          const matchesRegion = selectedRegionFilter === 'ALL' || person.region === selectedRegionFilter;
                          return matchesMonth && matchesDept && matchesRegion;
                        });

                        const visibleRecords = filteredRecords.slice(0, visibleRecordLimit);

                        return (
                          <div className="space-y-3">
                            {/* Active Filter Counter Banner */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-cyan-300 bg-[#082240] px-4 py-2.5 rounded-xl border border-cyan-500/30 gap-2">
                              <span className="flex items-center space-x-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                                <span>🎯 Listelenen Kayıt Sayısı: <strong>{filteredRecords.length} Detay Kaydı</strong></span>
                              </span>
                              <span className="text-[11px] text-gray-300">
                                Filtre: <strong>{selectedMonthFilter === 'ALL' ? 'Tüm Aylar' : selectedMonthFilter}</strong> | <strong>{selectedDepartmentFilter === 'ALL' ? 'Tüm Departmanlar' : selectedDepartmentFilter}</strong> | <strong>{selectedRegionFilter === 'ALL' ? 'Tüm Bölgeler' : selectedRegionFilter}</strong>
                              </span>
                            </div>

                            {filteredRecords.length > 0 ? (
                              <div className="space-y-3">
                                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0B2A4A] shadow-xl">
                                  <table className="w-full text-left text-xs font-medium text-gray-200">
                                    <thead className="bg-[#061B33] text-amber-300 font-extrabold uppercase text-[10px] tracking-wider border-b border-white/10">
                                      <tr>
                                        <th className="p-3.5">Personel / Şube Yetkilisi</th>
                                        <th className="p-3.5">Mevcut Unvan ➔ Metrik Başarısı / Hedef</th>
                                        <th className="p-3.5">Şube / Departman &amp; Bölge</th>
                                        <th className="p-3.5 text-center">İşlem Dönemi</th>
                                        <th className="p-3.5 text-center">Akademi Skoru &amp; Derece</th>
                                        <th className="p-3.5 text-center">Onay Statüsü</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 font-sans text-xs">
                                      {visibleRecords.map((person) => (
                                        <tr key={person.id} className="hover:bg-white/10 transition-colors">
                                          <td className="p-3.5">
                                            <div className="flex items-center space-x-3">
                                              <img
                                                src={person.avatar}
                                                alt={person.name}
                                                className="w-9.5 h-9.5 rounded-full object-cover border-2 border-amber-400 shrink-0 shadow"
                                              />
                                              <div>
                                                <span className="font-extrabold text-white text-sm block">{person.name}</span>
                                                <span className="text-[10px] text-gray-400 font-mono">ID: {person.id.toUpperCase()}</span>
                                              </div>
                                            </div>
                                          </td>
                                          <td className="p-3.5">
                                            <div className="space-y-0.5">
                                              <div className="text-gray-400 text-[11px]">{person.previousRole}</div>
                                              <div className="font-extrabold text-amber-300 text-xs flex items-center space-x-1">
                                                <span>{person.newRole}</span>
                                              </div>
                                            </div>
                                          </td>
                                          <td className="p-3.5">
                                            <div className="space-y-0.5">
                                              <div className="font-extrabold text-white text-xs">{person.branch}</div>
                                              <div className="text-[10px] text-cyan-300 font-mono">{person.department} ({person.region})</div>
                                            </div>
                                          </td>
                                          <td className="p-3.5 text-center font-mono font-bold text-cyan-300">
                                            {person.promotionDate}
                                          </td>
                                          <td className="p-3.5 text-center font-mono">
                                            <span className="px-2.5 py-1 bg-amber-400/20 text-amber-300 font-black rounded-lg border border-amber-400/30 text-xs">
                                              %{person.academyScore} ({person.grade})
                                            </span>
                                          </td>
                                          <td className="p-3.5 text-center">
                                            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-extrabold rounded-full border border-emerald-500/30 text-[11px]">
                                              {person.status}
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>

                                {/* 🔄 BATCH PAGINATION CONTROLS (+5 / DARALT) */}
                                {filteredRecords.length > 5 && (
                                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-[#082240] rounded-2xl border border-white/10 text-xs font-mono">
                                    <div className="text-gray-300 text-xs font-bold">
                                      Gösterilen: <span className="text-amber-400 font-extrabold">1 - {Math.min(visibleRecordLimit, filteredRecords.length)}</span> / Toplam <span className="text-white font-extrabold">{filteredRecords.length} Kayıt</span>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                      {visibleRecordLimit < filteredRecords.length && (
                                        <button
                                          onClick={() => setVisibleRecordLimit((prev) => prev + 5)}
                                          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl cursor-pointer transition-all shadow-lg flex items-center space-x-1.5"
                                        >
                                          <span>Daha Fazla Göster (+5 Kayıt)</span>
                                          <ChevronDown className="h-4 w-4" />
                                        </button>
                                      )}

                                      {visibleRecordLimit > 5 && (
                                        <button
                                          onClick={() => setVisibleRecordLimit(5)}
                                          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-amber-300 font-extrabold rounded-xl cursor-pointer transition-all border border-amber-400/30 flex items-center space-x-1.5"
                                        >
                                          <span>Daralt (İlk 5 Kayda Dön)</span>
                                          <ChevronUp className="h-4 w-4" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="p-8 text-center bg-[#0B2A4A] rounded-2xl border border-white/10 space-y-3">
                                <span className="text-3xl block">🔍</span>
                                <h5 className="text-base font-bold text-white">Seçilen Filtre Kombinasyonunda Kayıt Bulunamadı</h5>
                                <p className="text-xs text-gray-400 max-w-md mx-auto">
                                  Seçtiğiniz dönem (<strong>{selectedMonthFilter}</strong>), departman veya bölge kriterlerine uyan kayıt mevcut değil.
                                </p>
                                <button
                                  onClick={() => {
                                    setSelectedMonthFilter('ALL');
                                    setSelectedDepartmentFilter('ALL');
                                    setSelectedRegionFilter('ALL');
                                  }}
                                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs cursor-pointer transition-all"
                                >
                                  Tüm Filtreleri Temizle
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                );
              })()}

            </div>
          )}

          {/* KRİTİK RİSKLER TABI */}
          {activeTab === 'risks' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-rose-400">Üst Yönetim Kritik Risk Matrisi</h2>
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-[#061B33] rounded-2xl border border-rose-500/30 flex items-center justify-between">
                  <div>
                    <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 font-bold rounded text-[10px]">KRİTİK RİSK</span>
                    <div className="font-bold text-white text-sm mt-1">Ege Bölgesi Taze Gıda Kategori Müdürü Ayrılma Riski</div>
                    <div className="text-gray-400">Yedek Aday: Merve Şahin (%92 Hazır - 30 Gün İçinde Göreve Başlayabilir)</div>
                  </div>
                  <button onClick={() => setSelectedCandidate(EXECUTIVE_CANDIDATES['selin'])} className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl cursor-pointer">
                    Adayı İncele
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* YÖNETİCİ ADAY HAVUZU TABI - 🔴 CLICKABLE CANDIDATE CARDS */}
          {activeTab === 'pipeline' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-amber-300">Geleceğin Genel Müdür & Bölge Müdürü Aday Pipeline'ı</h2>
                  <p className="text-xs text-gray-300 mt-1">Aday kartlarına tıklayarak tarihleriyle birlikte eğitimlerini, sertifikalarını, başarı rozetlerini ve yönetici yorumlarını detaylı inceleyin.</p>
                </div>
                <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-xl text-xs font-black">
                  3 Lider Adayı Canlı Takipte
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                
                {/* CANDIDATE 1: SELİN YILMAZ */}
                <div
                  onClick={() => setSelectedCandidate(EXECUTIVE_CANDIDATES['selin'])}
                  className="p-5 bg-[#061B33] hover:bg-[#082240] rounded-2xl border-2 border-emerald-500/40 hover:border-emerald-400 shadow-xl hover:shadow-2xl transition-all cursor-pointer group space-y-3 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-black rounded-lg text-[10px] border border-emerald-500/30">
                      HEMEN HAZIR (READY NOW)
                    </span>
                    <span className="text-xs text-emerald-400 font-mono font-bold">Detay Gör →</span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-white group-hover:text-amber-300 transition-colors">
                      Selin Yılmaz (%96 Skor)
                    </h3>
                    <p className="text-xs text-gray-300 mt-1">
                      Mevcut: Kadıköy Şube Müdür Yrd. → <strong>Hedef: Mağaza Müdürü</strong>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 text-[11px] text-gray-400 space-y-1">
                    <div>• Ciro Artışı: +%18.4 (Şube Rekoru)</div>
                    <div>• Eğitim &amp; Sertifika Tarihleri Eklendi</div>
                  </div>
                </div>

                {/* CANDIDATE 2: AHMET CAN DEMİR */}
                <div
                  onClick={() => setSelectedCandidate(EXECUTIVE_CANDIDATES['ahmet'])}
                  className="p-5 bg-[#061B33] hover:bg-[#082240] rounded-2xl border-2 border-cyan-500/40 hover:border-cyan-400 shadow-xl hover:shadow-2xl transition-all cursor-pointer group space-y-3 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 font-black rounded-lg text-[10px] border border-cyan-500/30">
                      6 AY İÇİNDE HAZIR
                    </span>
                    <span className="text-xs text-cyan-400 font-mono font-bold">Detay Gör →</span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-white group-hover:text-amber-300 transition-colors">
                      Ahmet Can Demir (%94 Skor)
                    </h3>
                    <p className="text-xs text-gray-300 mt-1">
                      Mevcut: Beşiktaş Kasa Şefi → <strong>Hedef: Müdür Yrd.</strong>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 text-[11px] text-gray-400 space-y-1">
                    <div>• Kasa Hızı: %98.2 (Bölge 1.'si)</div>
                    <div>• Eğitim &amp; Rozet Tarihleri Eklendi</div>
                  </div>
                </div>

                {/* CANDIDATE 3: CANER KAYA */}
                <div
                  onClick={() => setSelectedCandidate(EXECUTIVE_CANDIDATES['caner'])}
                  className="p-5 bg-[#061B33] hover:bg-[#082240] rounded-2xl border-2 border-purple-500/40 hover:border-purple-400 shadow-xl hover:shadow-2xl transition-all cursor-pointer group space-y-3 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 font-black rounded-lg text-[10px] border border-purple-500/30">
                      1 YIL İÇİNDE HAZIR
                    </span>
                    <span className="text-xs text-purple-400 font-mono font-bold">Detay Gör →</span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-white group-hover:text-amber-300 transition-colors">
                      Caner Kaya (%95 Skor)
                    </h3>
                    <p className="text-xs text-gray-300 mt-1">
                      Mevcut: Tunalı Mağaza Müdürü → <strong>Hedef: Bölge Müdürü</strong>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 text-[11px] text-gray-400 space-y-1">
                    <div>• Mağaza Cirosu: ₺24.8M (+%22)</div>
                    <div>• Eğitim &amp; Rozet Tarihleri Eklendi</div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* YEDEKLEME DURUMU TABI */}
          {activeTab === 'succession' && (
            <div className="bg-[#0B2A4A] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-8 shadow-2xl">
              
              {/* Header Title */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
                    <span>🏢 Departman ve Bölge Bazlı Yedekleme Haritası</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300 font-medium mt-1">
                    Şirket genelinde kritik yönetici pozisyonlarının bölge ve departman kırılımlı yedekleme oranları ve yedek lider aday listesi.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/80 px-4 py-2 rounded-2xl border border-emerald-500/40 shadow-lg">
                    📊 Toplam Yedek Yönetici: 185 / 200 Kadro (%92.5 Doluluk)
                  </span>
                </div>
              </div>

              {/* 📊 KPI Summary Progress Card */}
              <div className="p-5 bg-[#061B33] rounded-2xl border border-white/10 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold gap-2">
                  <span className="text-gray-200">82 Kritik Pozisyonda Yedek Lider Doluluk Oranı</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-emerald-400">⚡ %92.5 Toplam Yedeklenme</span>
                    <span className="text-cyan-400">📜 %76.2 Tam Hazır Lider</span>
                  </div>
                </div>
                
                {/* Multi-segmented Progress Bar */}
                <div className="w-full bg-white/10 h-4 rounded-full overflow-hidden flex shadow-inner">
                  <div className="bg-emerald-400 h-full transition-all" style={{ width: '50.8%' }} title="Hemen Atanabilir (%50.8)" />
                  <div className="bg-cyan-400 h-full transition-all" style={{ width: '33.5%' }} title="Eğitim Aşamasında (%33.5)" />
                  <div className="bg-amber-400 h-full transition-all" style={{ width: '15.7%' }} title="Havuzda Bekliyor (%15.7)" />
                </div>

                {/* Progress Bar Legend */}
                <div className="flex flex-wrap items-center gap-4 text-[11px] pt-1 font-mono">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                    <span className="text-gray-300 font-bold">Hemen Atanabilir: <strong className="text-emerald-400">94 Aday (%50.8)</strong></span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block" />
                    <span className="text-gray-300 font-bold">Eğitimde / Akademide: <strong className="text-cyan-400">62 Aday (%33.5)</strong></span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                    <span className="text-gray-300 font-bold">Aday Havuzunda Bekliyor: <strong className="text-amber-400">29 Aday (%15.7)</strong></span>
                  </div>
                </div>
              </div>

              {/* 🗺️ BÖLGE VE DEPARTMAN BAZLI YEDEKLEME MATRİSİ */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-lg font-extrabold text-amber-400 flex items-center space-x-2">
                    <span>🗺️ Departman ve Bölge Bazlı Yedek Kadro Dağılım Matrisi</span>
                  </h3>
                  <span className="text-xs text-amber-300 font-bold">
                    💡 İlgili departmandaki kişileri listelemek için herhangi bir satıra tıklayabilirsiniz.
                  </span>
                </div>

                <div className="overflow-x-auto text-xs rounded-2xl border border-white/10 shadow-xl bg-[#061B33]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#082240] text-gray-200 border-b border-white/10 font-bold">
                        <th className="p-4">Departman / Sorumluluk Alanı</th>
                        <th className="p-4 text-center">Marmara Bölgesi</th>
                        <th className="p-4 text-center">Ege Bölgesi</th>
                        <th className="p-4 text-center">İç Anadolu</th>
                        <th className="p-4 text-center">Akdeniz Bölgesi</th>
                        <th className="p-4 text-center">Güney Marmara</th>
                        <th className="p-4 text-center bg-white/5 text-amber-300">Toplam Yedek Kadro</th>
                        <th className="p-4 text-center bg-white/5 text-emerald-400">Doluluk %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                      {/* Row 1: Mağaza Operasyonları */}
                      <tr
                        onClick={() => setSuccessionDeptFilter('Mağaza Operasyonları')}
                        className={`transition-colors cursor-pointer ${
                          successionDeptFilter === 'Mağaza Operasyonları'
                            ? 'bg-amber-950/60 ring-2 ring-amber-400'
                            : 'hover:bg-cyan-950/50'
                        }`}
                      >
                        <td className="p-4 font-bold text-white font-sans flex items-center justify-between">
                          <span className="flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                            <span>Mağaza Operasyonları</span>
                          </span>
                          {successionDeptFilter === 'Mağaza Operasyonları' && (
                            <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-md">🎯 SEÇİLİ</span>
                          )}
                        </td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">45</span> <span className="text-gray-400">/ 50 Kadro</span></td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">28</span> <span className="text-gray-400">/ 30 Kadro</span></td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">22</span> <span className="text-gray-400">/ 25 Kadro</span></td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">18</span> <span className="text-gray-400">/ 20 Kadro</span></td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">15</span> <span className="text-gray-400">/ 15 Kadro</span></td>
                        <td className="p-4 text-center bg-white/5 font-extrabold text-amber-300">128 / 140 Kadro</td>
                        <td className="p-4 text-center bg-white/5 font-extrabold text-emerald-400">%91.4</td>
                      </tr>

                      {/* Row 2: Kasa Operasyonları */}
                      <tr
                        onClick={() => setSuccessionDeptFilter('Kasa Operasyonları')}
                        className={`transition-colors cursor-pointer ${
                          successionDeptFilter === 'Kasa Operasyonları'
                            ? 'bg-amber-950/60 ring-2 ring-amber-400'
                            : 'hover:bg-cyan-950/50'
                        }`}
                      >
                        <td className="p-4 font-bold text-white font-sans flex items-center justify-between">
                          <span className="flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                            <span>Kasa Operasyonları</span>
                          </span>
                          {successionDeptFilter === 'Kasa Operasyonları' && (
                            <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-md">🎯 SEÇİLİ</span>
                          )}
                        </td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">22</span> <span className="text-gray-400">/ 24 Kadro</span></td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">12</span> <span className="text-gray-400">/ 15 Kadro</span></td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">10</span> <span className="text-gray-400">/ 12 Kadro</span></td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">8</span> <span className="text-gray-400">/ 10 Kadro</span></td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">5</span> <span className="text-gray-400">/ 5 Kadro</span></td>
                        <td className="p-4 text-center bg-white/5 font-extrabold text-amber-300">57 / 66 Kadro</td>
                        <td className="p-4 text-center bg-white/5 font-extrabold text-emerald-400">%86.4</td>
                      </tr>

                      {/* Row 3: Taze Gıda & Satın Alma */}
                      <tr
                        onClick={() => setSuccessionDeptFilter('Taze Gıda & Satın Alma')}
                        className={`transition-colors cursor-pointer ${
                          successionDeptFilter === 'Taze Gıda & Satın Alma'
                            ? 'bg-amber-950/60 ring-2 ring-amber-400'
                            : 'hover:bg-cyan-950/50'
                        }`}
                      >
                        <td className="p-4 font-bold text-white font-sans flex items-center justify-between">
                          <span className="flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                            <span>Taze Gıda &amp; Satın Alma</span>
                          </span>
                          {successionDeptFilter === 'Taze Gıda & Satın Alma' && (
                            <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-md">🎯 SEÇİLİ</span>
                          )}
                        </td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">15</span> <span className="text-gray-400">/ 16 Kadro</span></td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">10</span> <span className="text-gray-400">/ 10 Kadro</span></td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">8</span> <span className="text-gray-400">/ 10 Kadro</span></td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">6</span> <span className="text-gray-400">/ 8 Kadro</span></td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">4</span> <span className="text-gray-400">/ 4 Kadro</span></td>
                        <td className="p-4 text-center bg-white/5 font-extrabold text-amber-300">43 / 48 Kadro</td>
                        <td className="p-4 text-center bg-white/5 font-extrabold text-emerald-400">%89.6</td>
                      </tr>

                      {/* Row 4: Saha Direktörlüğü */}
                      <tr
                        onClick={() => setSuccessionDeptFilter('Saha Direktörlüğü')}
                        className={`transition-colors cursor-pointer ${
                          successionDeptFilter === 'Saha Direktörlüğü'
                            ? 'bg-amber-950/60 ring-2 ring-amber-400'
                            : 'hover:bg-cyan-950/50'
                        }`}
                      >
                        <td className="p-4 font-bold text-white font-sans flex items-center justify-between">
                          <span className="flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                            <span>Saha Direktörlüğü</span>
                          </span>
                          {successionDeptFilter === 'Saha Direktörlüğü' && (
                            <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-md">🎯 SEÇİLİ</span>
                          )}
                        </td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">8</span> <span className="text-gray-400">/ 8 Kadro</span></td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">3</span> <span className="text-gray-400">/ 4 Kadro</span></td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">2</span> <span className="text-gray-400">/ 2 Kadro</span></td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">2</span> <span className="text-gray-400">/ 2 Kadro</span></td>
                        <td className="p-4 text-center"><span className="text-emerald-400 font-bold">1</span> <span className="text-gray-400">/ 1 Kadro</span></td>
                        <td className="p-4 text-center bg-white/5 font-extrabold text-amber-300">16 / 17 Kadro</td>
                        <td className="p-4 text-center bg-white/5 font-extrabold text-emerald-400">%94.1</td>
                      </tr>

                      {/* 🔴 GENEL TOPLAM SATIRI (En Alt Kısımda Toplam Sayılar ve % Oranı) */}
                      <tr
                        onClick={() => {
                          setSuccessionDeptFilter('ALL');
                          setSuccessionRegionFilter('ALL');
                        }}
                        className="bg-[#082240] text-amber-300 font-extrabold border-t-2 border-amber-400/50 hover:bg-[#0a2a50] transition-colors cursor-pointer"
                      >
                        <td className="p-4 font-bold text-amber-300 font-sans flex items-center space-x-2">
                          <span className="w-3 h-3 rounded-full bg-amber-400" />
                          <span>GENEL TOPLAM</span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-emerald-400 font-bold">90</span> <span className="text-gray-300">/ 98 Kadro</span>
                          <div className="text-[10px] text-emerald-400 font-mono font-bold">%91.8</div>
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-emerald-400 font-bold">53</span> <span className="text-gray-300">/ 59 Kadro</span>
                          <div className="text-[10px] text-emerald-400 font-mono font-bold">%89.8</div>
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-emerald-400 font-bold">42</span> <span className="text-gray-300">/ 49 Kadro</span>
                          <div className="text-[10px] text-emerald-400 font-mono font-bold">%85.7</div>
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-emerald-400 font-bold">34</span> <span className="text-gray-300">/ 40 Kadro</span>
                          <div className="text-[10px] text-emerald-400 font-mono font-bold">%85.0</div>
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-emerald-400 font-bold">25</span> <span className="text-gray-300">/ 25 Kadro</span>
                          <div className="text-[10px] text-emerald-400 font-mono font-bold">%100.0</div>
                        </td>
                        <td className="p-4 text-center bg-white/10 text-amber-300 text-sm font-black">244 / 271 Kadro</td>
                        <td className="p-4 text-center bg-white/10 text-emerald-400 text-sm font-black">%90.0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 👥 İNTERAKTİF YEDEK ADAY LİSTESİ & FİLTRELER */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-white flex items-center space-x-2">
                      <Users className="h-5 w-5 text-amber-400" />
                      <span>Departman &amp; Bölge Bazlı Yedek Aday Detay Listesi</span>
                    </h3>
                    <p className="text-xs text-gray-300 mt-0.5">
                      Filtreleri kullanarak her bölge ve departmandaki yedek yönetici adaylarını anında inceleyebilirsiniz.
                    </p>
                  </div>

                  {/* Filter Dropdowns */}
                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      value={successionRegionFilter}
                      onChange={(e) => setSuccessionRegionFilter(e.target.value)}
                      className="bg-[#061B33] border border-white/20 rounded-xl px-3 py-2 text-xs font-bold text-amber-300 focus:outline-none focus:border-amber-400 cursor-pointer shadow-md"
                    >
                      <option value="ALL">📍 Tüm Bölgeler</option>
                      <option value="Marmara Bölgesi">Marmara Bölgesi</option>
                      <option value="Ege Bölgesi">Ege Bölgesi</option>
                      <option value="İç Anadolu Bölgesi">İç Anadolu Bölgesi</option>
                      <option value="Akdeniz Bölgesi">Akdeniz Bölgesi</option>
                      <option value="Güney Marmara">Güney Marmara</option>
                    </select>

                    <select
                      value={successionDeptFilter}
                      onChange={(e) => setSuccessionDeptFilter(e.target.value)}
                      className="bg-[#061B33] border border-white/20 rounded-xl px-3 py-2 text-xs font-bold text-cyan-300 focus:outline-none focus:border-cyan-400 cursor-pointer shadow-md"
                    >
                      <option value="ALL">🏢 Tüm Departmanlar</option>
                      <option value="Mağaza Operasyonları">Mağaza Operasyonları</option>
                      <option value="Kasa Operasyonları">Kasa Operasyonları</option>
                      <option value="Taze Gıda & Satın Alma">Taze Gıda &amp; Satın Alma</option>
                      <option value="Saha Direktörlüğü">Saha Direktörlüğü</option>
                    </select>

                    {(successionRegionFilter !== 'ALL' || successionDeptFilter !== 'ALL') && (
                      <button
                        onClick={() => {
                          setSuccessionRegionFilter('ALL');
                          setSuccessionDeptFilter('ALL');
                        }}
                        className="px-3 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold rounded-xl border border-rose-500/30 transition-all cursor-pointer"
                      >
                        Filtreleri Sıfırla
                      </button>
                    )}
                  </div>
                </div>

                {/* Candidate Records Table */}
                {(() => {
                  const candidatePool = KPI_BREAKDOWN_DATA['aday_havuzu'] || [];
                  const filteredCandidates = candidatePool.filter((cand) => {
                    if (successionRegionFilter !== 'ALL' && cand.region !== successionRegionFilter) return false;
                    if (successionDeptFilter !== 'ALL' && cand.department !== successionDeptFilter) return false;
                    return true;
                  });

                  const visibleCandidates = filteredCandidates.slice(0, successionVisibleLimit);

                  return (
                    <div className="space-y-4">
                      <div className="overflow-x-auto text-xs rounded-2xl border border-white/10 shadow-2xl bg-[#061B33]">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="bg-[#082240] text-gray-300 border-b border-white/10 font-bold">
                              <th className="p-3.5">Yedek Aday</th>
                              <th className="p-3.5">Hedef Pozisyon (Yedek Kadro)</th>
                              <th className="p-3.5">Departman</th>
                              <th className="p-3.5">Bölge &amp; Şube</th>
                              <th className="p-3.5 text-center">Akademi Skoru &amp; Derece</th>
                              <th className="p-3.5 text-center">Yedekleme Durumu</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {visibleCandidates.map((cand) => (
                              <tr key={cand.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-3.5 flex items-center space-x-3">
                                  <img
                                    src={cand.avatar}
                                    alt={cand.name}
                                    className="w-9 h-9 rounded-full object-cover border-2 border-amber-400 shadow-md"
                                  />
                                  <div>
                                    <div className="font-extrabold text-white text-sm">{cand.name}</div>
                                    <div className="text-[11px] text-gray-400 font-mono">{cand.previousRole}</div>
                                  </div>
                                </td>
                                <td className="p-3.5 font-bold text-amber-300">{cand.newRole}</td>
                                <td className="p-3.5 text-gray-300 font-bold">{cand.department}</td>
                                <td className="p-3.5">
                                  <div className="font-bold text-cyan-300">{cand.region}</div>
                                  <div className="text-[11px] text-gray-400">{cand.branch}</div>
                                </td>
                                <td className="p-3.5 text-center">
                                  <span className="font-mono font-black text-amber-400 bg-amber-950/60 px-2 py-1 rounded-lg border border-amber-500/30 block w-fit mx-auto mb-1">
                                    PKA Skoru: {cand.academyScore} Puan
                                  </span>
                                  <span className="text-[10px] text-gray-300 font-bold">{cand.grade}</span>
                                </td>
                                <td className="p-3.5 text-center">
                                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                                    {cand.status}
                                  </span>
                                </td>
                              </tr>
                            ))}

                            {visibleCandidates.length === 0 && (
                              <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-400 font-bold text-sm">
                                  Seçilen filtre kriterlerine uygun yedek aday bulunamadı.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* 5-ROW BATCH EXPAND/COLLAPSE CONTROLS */}
                      {filteredCandidates.length > 0 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#061B33] p-4 rounded-2xl border border-white/10 text-xs">
                          <div className="text-gray-300 font-mono font-bold">
                            Gösterilen: <span className="text-amber-400 font-black">1 - {Math.min(successionVisibleLimit, filteredCandidates.length)}</span> / Toplam <span className="text-cyan-400 font-black">{filteredCandidates.length} Yedek Kayıt</span>
                          </div>

                          <div className="flex items-center space-x-3">
                            {successionVisibleLimit < filteredCandidates.length && (
                              <button
                                onClick={() => setSuccessionVisibleLimit((prev) => prev + 5)}
                                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow-lg transition-all cursor-pointer"
                              >
                                <ChevronDown className="h-4 w-4" />
                                <span>Daha Fazla Göster (+5 Kayıt)</span>
                              </button>
                            )}

                            {successionVisibleLimit > 5 && (
                              <button
                                onClick={() => setSuccessionVisibleLimit(5)}
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-200 font-bold rounded-xl text-xs flex items-center space-x-1.5 border border-white/20 transition-all cursor-pointer"
                              >
                                <ChevronUp className="h-4 w-4" />
                                <span>Daralt (İlk 5 Kayda Dön)</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

              </div>

            </div>
          )}

          {/* ŞUBE / BÖLGE KARŞILAŞTIRMASI TABI */}
          {activeTab === 'comparison' && (
            <div className="bg-[#0B2A4A] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
                    <span>📈 Bölgesel İnsan Sermayesi Performans Karşılaştırması</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">
                    Tüm bölge müdürlüklerinin mağaza sayıları, ortalama terfi puanları, turnover oranları ve LMS tamamlama seviyeleri ile şirket ortalama karşılaştırması.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 px-4 py-2 rounded-2xl border border-amber-500/40 shadow-lg">
                  🏆 Toplam 140 Mağaza / 5 Bölge Müdürlüğü
                </span>
              </div>

              {/* 📊 ŞİRKET GENEL ORTALAMA KARTLARI (COMPANY AVERAGE CARDS) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-2">
                <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-1">
                  <span className="text-[11px] font-mono text-gray-300 block uppercase font-bold">Toplam Şube Ağı</span>
                  <div className="text-xl font-black text-white">140 Mağaza</div>
                  <span className="text-[10px] text-gray-400 font-semibold block">5 Bölge Müdürlüğü</span>
                </div>

                <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-1">
                  <span className="text-[11px] font-mono text-emerald-300 block uppercase font-bold">Şirket Ort. Kişi Başı Ciro</span>
                  <div className="text-xl font-black text-emerald-400">₺1.740.000</div>
                  <span className="text-[10px] text-emerald-300 font-bold block">💰 +₺20K Net Artış</span>
                </div>

                <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-1">
                  <span className="text-[11px] font-mono text-amber-300 block uppercase font-bold">Şirket Ort. Terfi Skoru</span>
                  <div className="text-xl font-black text-amber-400">85.4 Puan</div>
                  <span className="text-[10px] text-emerald-400 font-bold block">🏆 Hedef Üstü Başarı</span>
                </div>

                <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-1">
                  <span className="text-[11px] font-mono text-emerald-300 block uppercase font-bold">Şirket Ort. Turnover</span>
                  <div className="text-xl font-black text-emerald-400">%10.2</div>
                  <span className="text-[10px] text-emerald-300 font-bold block">📉 Düşüş Trendi (-%7)</span>
                </div>

                <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-1">
                  <span className="text-[11px] font-mono text-cyan-300 block uppercase font-bold">Şirket Ort. LMS Tamamlama</span>
                  <div className="text-xl font-black text-cyan-400">%94.8</div>
                  <span className="text-[10px] text-cyan-300 font-bold block">📱 Dijital Akademi Liderliği</span>
                </div>
              </div>

              {/* BÖLGESEL BAZDA DETAYLI PERFORMANS & ŞİRKET ORTALAMASI TABLOSU */}
              <div className="overflow-x-auto text-xs rounded-2xl border border-white/10 shadow-2xl bg-[#061B33]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#082240] text-gray-200 border-b border-white/10 font-bold">
                      <th className="p-3.5">Bölge Müdürlüğü / Sorumluluk Alanı</th>
                      <th className="p-3.5 text-center">Mağaza Sayısı</th>
                      <th className="p-3.5 text-center">
                        <div>Kişi Başı Ciro (TL)</div>
                        <span className="text-[10px] text-emerald-300 font-mono font-normal">Şirket Ort: ₺1.74M</span>
                      </th>
                      <th className="p-3.5 text-center">
                        <div>Ort. Terfi Skoru</div>
                        <span className="text-[10px] text-amber-300 font-mono font-normal">Şirket Ort: 85.4</span>
                      </th>
                      <th className="p-3.5 text-center">
                        <div>Turnover Oranı</div>
                        <span className="text-[10px] text-emerald-300 font-mono font-normal">Şirket Ort: %10.2 (Düşük = İyi ✅)</span>
                      </th>
                      <th className="p-3.5 text-center">
                        <div>LMS Tamamlama</div>
                        <span className="text-[10px] text-cyan-300 font-mono font-normal">Şirket Ort: %94.8</span>
                      </th>
                      <th className="p-3.5 text-center">Genel Karşılaştırma &amp; Durum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {/* Row 1: Marmara Bölgesi */}
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-bold text-white font-sans flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                        <span>Marmara Bölgesi</span>
                      </td>
                      <td className="p-3.5 text-center font-bold text-white">48 Mağaza</td>
                      <td className="p-3.5 text-center">
                        <span className="text-emerald-400 font-bold text-sm">₺1.850.000</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          +₺110K
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="text-emerald-400 font-bold text-sm">88.5</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          +3.1
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="text-emerald-400 font-bold text-sm">%9.2</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          -%1.0 (İyi ✅)
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="text-cyan-400 font-bold text-sm">%97.5</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          +%2.7
                        </span>
                      </td>
                      <td className="p-3.5 text-center font-sans">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          Zirve Bölge 👑
                        </span>
                      </td>
                    </tr>

                    {/* Row 2: Güney Marmara */}
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-bold text-white font-sans flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        <span>Güney Marmara</span>
                      </td>
                      <td className="p-3.5 text-center font-bold text-white">16 Mağaza</td>
                      <td className="p-3.5 text-center">
                        <span className="text-emerald-400 font-bold text-sm">₺1.780.000</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          +₺40K
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="text-emerald-400 font-bold text-sm">86.0</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          +0.6
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="text-emerald-400 font-bold text-sm">%8.8</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          -%1.4 (İyi ✅)
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="text-cyan-400 font-bold text-sm">%96.0</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          +%1.2
                        </span>
                      </td>
                      <td className="p-3.5 text-center font-sans">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Yüksek Bağlılık 🥇
                        </span>
                      </td>
                    </tr>

                    {/* Row 3: Ege Bölgesi */}
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-bold text-white font-sans flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span>Ege Bölgesi</span>
                      </td>
                      <td className="p-3.5 text-center font-bold text-white">32 Mağaza</td>
                      <td className="p-3.5 text-center">
                        <span className="text-amber-300 font-bold text-sm">₺1.710.000</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          -₺30K
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="text-amber-400 font-bold text-sm">84.0</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          -1.4
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="text-rose-400 font-bold text-sm">%12.4</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          +%2.2 (Yüksek ⚠️)
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="text-cyan-400 font-bold text-sm">%94.0</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          -%0.8
                        </span>
                      </td>
                      <td className="p-3.5 text-center font-sans">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          Yüksek Verim 🌟
                        </span>
                      </td>
                    </tr>

                    {/* Row 4: İç Anadolu Bölgesi */}
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-bold text-white font-sans flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                        <span>İç Anadolu Bölgesi</span>
                      </td>
                      <td className="p-3.5 text-center font-bold text-white">24 Mağaza</td>
                      <td className="p-3.5 text-center">
                        <span className="text-rose-300 font-bold text-sm">₺1.680.000</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          -₺60K
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="text-[#DDF4F7] font-bold text-sm">82.1</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          -3.3
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="text-rose-300 font-bold text-sm">%10.8</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          +%0.6 (Yüksek ⚠️)
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="text-cyan-400 font-bold text-sm">%92.5</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          -%2.3
                        </span>
                      </td>
                      <td className="p-3.5 text-center font-sans">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Hedefe Yakın ✅
                        </span>
                      </td>
                    </tr>

                    {/* Row 5: Akdeniz Bölgesi */}
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-bold text-white font-sans flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                        <span>Akdeniz Bölgesi</span>
                      </td>
                      <td className="p-3.5 text-center font-bold text-white">20 Mağaza</td>
                      <td className="p-3.5 text-center">
                        <span className="text-rose-300 font-bold text-sm">₺1.620.000</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          -₺120K
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="text-[#DDF4F7] font-bold text-sm">81.5</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          -3.9
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="text-rose-300 font-bold text-sm">%11.2</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          +%1.0 (Yüksek ⚠️)
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="text-cyan-400 font-bold text-sm">%91.0</span>
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          -%3.8
                        </span>
                      </td>
                      <td className="p-3.5 text-center font-sans">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          Gelişimde 📈
                        </span>
                      </td>
                    </tr>

                    {/* 🔴 PROMINENT COMPANY AVERAGE TOTAL ROW (ŞİRKET ORTALAMASI) */}
                    <tr className="bg-[#082240] text-amber-300 font-extrabold border-t-2 border-amber-400/50 hover:bg-[#0a2a50] transition-colors">
                      <td className="p-3.5 font-bold text-amber-300 font-sans flex items-center space-x-2">
                        <span className="w-3.5 h-3.5 rounded-full bg-amber-400" />
                        <span className="text-sm">🏢 ŞİRKET GENEL ORTALAMASI</span>
                      </td>
                      <td className="p-3.5 text-center font-extrabold text-amber-300 text-sm">140 Mağaza</td>
                      <td className="p-3.5 text-center font-extrabold text-emerald-400 text-base">
                        ₺1.740.000
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">BAZ</span>
                      </td>
                      <td className="p-3.5 text-center font-extrabold text-amber-400 text-base">
                        85.4 Puan
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-amber-400/20 text-amber-300 border border-amber-400/40">BAZ</span>
                      </td>
                      <td className="p-3.5 text-center font-extrabold text-emerald-400 text-base">
                        %10.2
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">BAZ</span>
                      </td>
                      <td className="p-3.5 text-center font-extrabold text-cyan-400 text-base">
                        %94.8
                        <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">BAZ</span>
                      </td>
                      <td className="p-3.5 text-center font-sans">
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow-md">
                          Genel Hedef Tutmuştur 🎯
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'scenario' && (
            <div className="space-y-6">
              <ExecutiveDashboard />
            </div>
          )}

          {activeTab === 'roi' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10">
              <EnterpriseROICalculator />
            </div>
          )}

          {/* YÖNETİM KURULU RAPORU TABI */}
          {activeTab === 'board' && (
            <div className="bg-[#0B2A4A] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-8 text-xs shadow-2xl">
              {/* Report Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-400/40">
                    <Crown className="w-4 h-4 text-amber-400" />
                    <span>PKA EXECUTIVE BOARD REPORT — 2026 Q3</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Yönetim Kurulu İnsan Sermayesi ve Büyüme Raporu
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
                    Son 12 aylık akademinin finansal ve operasyonel etki özeti ile önümüzdeki 6 ay, 12 ay ve 2 yıllık stratejik insan kaynakları yol haritası.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0 self-start sm:self-center min-w-[210px]">
                  <button
                    onClick={exportToPDF}
                    className="w-full px-3.5 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold rounded-xl text-[11px] flex items-center justify-center space-x-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>📄 PDF Olarak İndir</span>
                  </button>

                  <button
                    onClick={exportToExcel}
                    className="w-full px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold rounded-xl text-[11px] flex items-center justify-center space-x-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-200" />
                    <span>📊 Excel Olarak İndir (.xlsx)</span>
                  </button>

                  <button
                    onClick={exportToWord}
                    className="w-full px-3.5 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-extrabold rounded-xl text-[11px] flex items-center justify-center space-x-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-200" />
                    <span>📝 Word Olarak İndir (.docx)</span>
                  </button>
                </div>
              </div>

              {/* 👑 İCRA KURULU BAŞKANLIĞI: MEVCUT DURUM DEĞERLENDİRMESİ VE GELECEK STRATEJİK PLANLAMASI */}
              <div className="p-6 sm:p-7 bg-[#061B33] rounded-3xl border border-amber-400/30 space-y-6 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                      <Crown className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-amber-300 tracking-tight">
                        İcra Kurulu Başkanlığı: Mevcut Durum Değerlendirmesi ve Gelecek Stratejik Planlaması
                      </h3>
                      <p className="text-xs text-gray-300 font-medium">
                        2026 Q3 İnsan Sermayesi Finansal Karşılık Analizi ve 200 Mağaza Büyüme Master Planı
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-400/20 px-3.5 py-1.5 rounded-full border border-amber-400/40 self-start sm:self-auto">
                    👑 YÖNETİM KURULU İCRA ÖZETİ
                  </span>
                </div>

                {/* 3 Pillar Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Pillar 1: Mevcut Durum ve Finansal Getiri */}
                  <div className="p-4 bg-[#0B2A4A] rounded-2xl border border-emerald-500/30 space-y-2.5">
                    <div className="flex items-center space-x-2 text-emerald-400 font-bold border-b border-white/10 pb-2">
                      <BarChart3 className="w-4 h-4" />
                      <span className="uppercase text-[11px] font-black">1. Mevcut Durum &amp; Finansal İcra</span>
                    </div>
                    <p className="text-gray-200 leading-relaxed text-xs">
                      Şirketimiz Perakende Mühendisi Eğitim Akademisi altyapısı sayesinde <strong>₺1.800.000 TL</strong> tutarındaki eğitim yatırımına karşılık <strong>₺14.200.000 TL</strong> net yıllık tasarruf elde ederek <strong>7.89x ROI (%789 net getiri)</strong> sağlamıştır. Yapılan her <strong>₺1.00 TL</strong> eğitim yatırımı şirkete <strong>₺7,89 TL</strong> net getiri olarak geri dönmüştür.
                    </p>
                    <div className="pt-1 flex flex-wrap gap-1.5 text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        86 Terfi (%39)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                        ₺1.74M Ciro / Personel
                      </span>
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                        52.800 Eğitim Saati
                      </span>
                    </div>
                  </div>

                  {/* Pillar 2: Kadro Güvencesi & Bölgesel Matris */}
                  <div className="p-4 bg-[#0B2A4A] rounded-2xl border border-amber-500/30 space-y-2.5">
                    <div className="flex items-center space-x-2 text-amber-400 font-bold border-b border-white/10 pb-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="uppercase text-[11px] font-black">2. Kadro Güvencesi &amp; Yedekleme</span>
                    </div>
                    <p className="text-gray-200 leading-relaxed text-xs">
                      Şirket genelindeki 271 kritik kadronun <strong>244'ü (%90.0)</strong> akademi iç kaynaklarından yedeklenmiştir. Mağaza Operasyonlarında <strong>%91.8</strong> doluluk oranına ulaşılmış, Mağaza Müdürü ayrılmalarındaki ciro kaybı sıfırlanmıştır. Mağaza müdür turnover oranı <strong>%24.0'ten %17.0'ye (-%7.0 iyileşme)</strong> düşürülmüştür.
                    </p>
                    <div className="pt-1 flex flex-wrap gap-1.5 text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                        244/271 Yedek Kadro (%90)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                        20 Şube / 42 Yedek Müdür
                      </span>
                    </div>
                  </div>

                  {/* Pillar 3: Gelecek Stratejik Planlaması & Büyüme Yol Haritası */}
                  <div className="p-4 bg-[#0B2A4A] rounded-2xl border border-cyan-500/30 space-y-2.5">
                    <div className="flex items-center space-x-2 text-cyan-400 font-bold border-b border-white/10 pb-2">
                      <TrendingUp className="w-4 h-4" />
                      <span className="uppercase text-[11px] font-black">3. Gelecek Büyüme &amp; Hedefler</span>
                    </div>
                    <p className="text-gray-200 leading-relaxed text-xs">
                      Gelecek 6 ayda <strong>21 yedeği olmayan pozisyon</strong> sıfırlanıp <strong>₺17.4M</strong> getiri hedeflenmektedir. 12 ayda açılacak <strong>20 yeni mağaza</strong> için <strong>₺2.6M</strong> bütçe ile <strong>64.000 saat</strong> eğitim verilecek; 2 yıllık vizyonda ise <strong>200 mağaza ölçeği</strong> ile kişi başı ciro <strong>₺2.40M TL</strong>'ye, net getiri <strong>₺35.000.000 TL'ye (8.75x ROI)</strong> çıkarılacaktır.
                    </p>
                    <div className="pt-1 flex flex-wrap gap-1.5 text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                        6 Ay: 28.000 Saat (14.5x ROI)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                        2 Yıl: ₺35M Getiri (8.75x ROI)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Detailed Executive Narrative */}
                <div className="p-4 rounded-2xl bg-[#0B2A4A]/60 border border-white/10 space-y-2.5 text-xs text-gray-200 leading-relaxed">
                  <h4 className="font-extrabold text-amber-300 text-xs uppercase flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Yönetim Kurulu Sonuç ve İcra Direktifi:</span>
                  </h4>
                  <p>
                    Perakende Mühendisi Eğitim Akademisi, şirketimizin insan kaynağını maliyet unsuru olmaktan çıkarıp en yüksek getiri sağlayan stratejik yatırım aracına dönüştürmüştür. Önümüzdeki 24 aylık süreçte hedefimiz, yeni açılacak 60+ şubeyi %100 akademi iç kaynaklarından terfi eden liderlerle yönetmek, kişi başı verimliliği ₺2.40M TL seviyesine ulaştırmak ve perakende sektöründe lider insan sermayesi yapısını kalıcı kılmaktır.
                  </p>
                </div>
              </div>

              {/* SECTION 1: DÖNEMLERE GÖRE KARŞILAŞTIRMALI HEDEF TABLOSU */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2 text-amber-400 font-extrabold text-sm sm:text-base">
                    <BarChart3 className="w-5 h-5 text-amber-400" />
                    <span>📊 1. DÖNEMLERE GÖRE HEDEF VE FİNANSAL YATIRIM KARŞILAŞTIRMA TABLOSU</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                    Eksiksiz Dönemsel Matris
                  </span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-2xl bg-[#061B33]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#0B2A4A] text-gray-200 border-b border-white/10 font-bold uppercase text-[11px] tracking-wider">
                        <th className="p-4 font-black text-amber-300 w-[20%]">Metrik Kartı</th>
                        <th className="p-4 text-center text-amber-400 font-black bg-amber-500/10 border-x border-white/10 w-[20%]">
                          📊 Mevcut (Gerçekleşen)
                        </th>
                        <th className="p-4 text-center text-purple-300 font-black bg-purple-500/10 border-r border-white/10 w-[20%]">
                          ⏱️ 6 Aylık Hedef
                        </th>
                        <th className="p-4 text-center text-emerald-300 font-black bg-emerald-500/10 border-r border-white/10 w-[20%]">
                          📅 12 Aylık Hedef
                        </th>
                        <th className="p-4 text-center text-cyan-300 font-black bg-cyan-500/10 w-[20%]">
                          🚀 2 Yıllık Vizyon
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 font-mono text-xs">
                      {/* Row 1: Net Tasarruf (ROI) */}
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-sans font-extrabold text-white">Net Tasarruf (ROI)</td>
                        <td className="p-4 text-center bg-amber-500/5 border-x border-white/10 text-emerald-400 font-black">
                          ₺14.200.000 TL
                        </td>
                        <td className="p-4 text-center bg-purple-500/5 border-r border-white/10 text-amber-300 font-bold">
                          ₺17.400.000 TL <span className="text-[10px] text-amber-400 italic block font-normal">(+₺3.2M Fire Önleme)</span>
                        </td>
                        <td className="p-4 text-center bg-emerald-500/5 border-r border-white/10 text-emerald-300 font-bold">
                          ₺22.000.000 TL <span className="text-[10px] text-emerald-400 italic block font-normal">(20 Mağaza Altyapısı)</span>
                        </td>
                        <td className="p-4 text-center bg-cyan-500/5 text-cyan-300 font-black">
                          ₺35.000.000 TL <span className="text-[10px] text-cyan-400 italic block font-normal">(Sıfır Kayıp &amp; Tam ROI)</span>
                        </td>
                      </tr>

                      {/* Row 2: İç Terfi Başarısı */}
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-sans font-extrabold text-white">İç Terfi Başarısı</td>
                        <td className="p-4 text-center bg-amber-500/5 border-x border-white/10 text-amber-400 font-black">
                          86 Personel (%39)
                        </td>
                        <td className="p-4 text-center bg-purple-500/5 border-r border-white/10 text-amber-300 font-bold">
                          105 Personel (%44) <span className="text-[10px] text-amber-400 italic block font-normal">(+19 Yönetici)</span>
                        </td>
                        <td className="p-4 text-center bg-emerald-500/5 border-r border-white/10 text-emerald-300 font-bold">
                          135 Personel (%50) <span className="text-[10px] text-emerald-400 italic block font-normal">(%50 İç Terfi)</span>
                        </td>
                        <td className="p-4 text-center bg-cyan-500/5 text-cyan-300 font-black">
                          200+ Personel (%65) <span className="text-[10px] text-cyan-400 italic block font-normal">(Executive Pipeline)</span>
                        </td>
                      </tr>

                      {/* Row 3: Kişi Başı Ciro */}
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-sans font-extrabold text-white">Kişi Başı Ciro</td>
                        <td className="p-4 text-center bg-amber-500/5 border-x border-white/10 text-cyan-400 font-black">
                          ₺1.740.000 TL
                        </td>
                        <td className="p-4 text-center bg-purple-500/5 border-r border-white/10 text-amber-300 font-bold">
                          ₺1.880.000 TL <span className="text-[10px] text-amber-400 italic block font-normal">(+₺140K Artış)</span>
                        </td>
                        <td className="p-4 text-center bg-emerald-500/5 border-r border-white/10 text-emerald-300 font-bold">
                          ₺2.050.000 TL <span className="text-[10px] text-emerald-400 italic block font-normal">(20 Yeni Şube Katkısı)</span>
                        </td>
                        <td className="p-4 text-center bg-cyan-500/5 text-cyan-300 font-black">
                          ₺2.400.000 TL <span className="text-[10px] text-cyan-400 italic block font-normal">(Otomasyon &amp; Verimlilik)</span>
                        </td>
                      </tr>

                      {/* Row 4: Kişi Başı Eğitim */}
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-sans font-extrabold text-white">Kişi Başı Eğitim</td>
                        <td className="p-4 text-center bg-amber-500/5 border-x border-white/10 text-purple-300 font-black">
                          48 Saat / Yıl
                        </td>
                        <td className="p-4 text-center bg-purple-500/5 border-r border-white/10 text-amber-300 font-bold">
                          56 Saat / Yıl <span className="text-[10px] text-amber-400 italic block font-normal">(28 Saat / 6 Ay)</span>
                        </td>
                        <td className="p-4 text-center bg-emerald-500/5 border-r border-white/10 text-emerald-300 font-bold">
                          60 Saat / Yıl <span className="text-[10px] text-emerald-400 italic block font-normal">(Kişi Başı 52 Saat)</span>
                        </td>
                        <td className="p-4 text-center bg-cyan-500/5 text-cyan-300 font-black">
                          64 Saat / Yıl <span className="text-[10px] text-cyan-400 italic block font-normal">(İleri Liderlik Akademisi)</span>
                        </td>
                      </tr>

                      {/* Row 5: İşletme Takvimi */}
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-sans font-extrabold text-white">İşletme Takvimi</td>
                        <td className="p-4 text-center bg-amber-500/5 border-x border-white/10 text-blue-300 font-black">
                          52.800 Saat
                        </td>
                        <td className="p-4 text-center bg-purple-500/5 border-r border-white/10 text-amber-300 font-bold">
                          28.000 Saat <span className="text-[10px] text-amber-400 italic block font-normal">(Acil Risk Programı)</span>
                        </td>
                        <td className="p-4 text-center bg-emerald-500/5 border-r border-white/10 text-emerald-300 font-bold">
                          64.000 Saat <span className="text-[10px] text-emerald-400 italic block font-normal">(20 Şube Kadrosu)</span>
                        </td>
                        <td className="p-4 text-center bg-cyan-500/5 text-cyan-300 font-black">
                          80.000 Saat <span className="text-[10px] text-cyan-400 italic block font-normal">(200 Mağaza Kapasitesi)</span>
                        </td>
                      </tr>

                      {/* Row 6: Müdür Turnover */}
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-sans font-extrabold text-white">Müdür Turnover</td>
                        <td className="p-4 text-center bg-amber-500/5 border-x border-white/10 text-emerald-400 font-black">
                          %17.0
                        </td>
                        <td className="p-4 text-center bg-purple-500/5 border-r border-white/10 text-amber-300 font-bold">
                          %14.5 Target <span className="text-[10px] text-amber-400 italic block font-normal">(21 Riskli Pozisyon = 0)</span>
                        </td>
                        <td className="p-4 text-center bg-emerald-500/5 border-r border-white/10 text-emerald-300 font-bold">
                          %12.0 Target <span className="text-[10px] text-emerald-400 italic block font-normal">(Yüksek Bağlılık)</span>
                        </td>
                        <td className="p-4 text-center bg-cyan-500/5 text-cyan-300 font-black">
                          %8.5 Target <span className="text-[10px] text-cyan-400 italic block font-normal">(%100 Tam Yedekli Yapı)</span>
                        </td>
                      </tr>

                      {/* Row 7: Eğitim Yatırımı Bütçesi */}
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-sans font-extrabold text-amber-300">Eğitim Yatırımı Bütçesi</td>
                        <td className="p-4 text-center bg-amber-500/5 border-x border-white/10 text-white font-black">
                          ₺1.800.000 TL
                        </td>
                        <td className="p-4 text-center bg-purple-500/5 border-r border-white/10 text-amber-300 font-bold">
                          ₺1.200.000 TL <span className="text-[10px] text-amber-400 italic block font-normal">(Acil Bütçe)</span>
                        </td>
                        <td className="p-4 text-center bg-emerald-500/5 border-r border-white/10 text-emerald-300 font-bold">
                          ₺2.600.000 TL <span className="text-[10px] text-emerald-400 italic block font-normal">(20 Yeni Şube Bütçesi)</span>
                        </td>
                        <td className="p-4 text-center bg-cyan-500/5 text-cyan-300 font-black">
                          ₺4.000.000 TL <span className="text-[10px] text-cyan-400 italic block font-normal">(200 Mağaza Bütçesi)</span>
                        </td>
                      </tr>

                      {/* Row 8: Harcanan 1 TL'nin Net Getirisi (ROI) */}
                      <tr className="hover:bg-white/5 transition-colors bg-emerald-500/10 font-bold">
                        <td className="p-4 font-sans font-black text-emerald-300">Harcanan 1 TL Dönüşü (ROI)</td>
                        <td className="p-4 text-center border-x border-white/10 text-emerald-400 font-black text-sm">
                          ₺7,89 <span className="text-[10px] text-emerald-300 block font-normal">(7.89x Net ROI)</span>
                        </td>
                        <td className="p-4 text-center border-r border-white/10 text-amber-300 font-black text-sm">
                          ₺14,50 <span className="text-[10px] text-amber-300 block font-normal">(14.50x Net ROI)</span>
                        </td>
                        <td className="p-4 text-center border-r border-white/10 text-emerald-300 font-black text-sm">
                          ₺8,46 <span className="text-[10px] text-emerald-300 block font-normal">(8.46x Net ROI)</span>
                        </td>
                        <td className="p-4 text-center text-cyan-300 font-black text-sm">
                          ₺8,75 <span className="text-[10px] text-cyan-300 block font-normal">(8.75x Net ROI)</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SECTION 2: ÖNÜMÜZDEKİ DÖNEM STRATEJİK İNSAN KAYNAKLARI & BÜYÜME YOL HARİTASI */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center space-x-2 text-cyan-400 font-extrabold text-sm border-b border-white/10 pb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>2. ÖNÜMÜZDEKİ DÖNEM STRATEJİK İNSAN KAYNAKLARI &amp; BÜYÜME YOL HARİTASI</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* CARD 1: 6 AY (KISA VADE) */}
                  <div className="p-6 bg-[#061B33] rounded-3xl border-2 border-amber-400/50 space-y-4 shadow-xl flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-amber-400/30 pb-3">
                        <span className="text-xs font-mono font-black text-amber-300 bg-amber-950/80 px-3 py-1 rounded-xl border border-amber-400/40">
                          ⏱️ GELECEK 6 AY
                        </span>
                        <span className="text-[10px] text-amber-200 font-bold">Kısa Vadeli Acil Aksiyonlar</span>
                      </div>
                      <h4 className="font-extrabold text-sm text-white">Acil Risk Önleme ve Yetkinlik Pekiştirme</h4>
                      
                      <ul className="space-y-2.5 text-gray-300 text-xs">
                        <li className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span><strong>21 Yedeksiz Pozisyonun Sıfırlanması:</strong> Tespit edilen 21 kritik riskli pozisyona hızlandırılmış akademi programı ile en az 1'er yedek aday atanması.</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span><strong>Hedeflenen 6 Aylık Eğitim Saati:</strong> İşletme takviminde <strong>28.000 Saat</strong> (Kişi başı 28 saat) acil uzmanlık ve fire önleme eğitimi.</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span><strong>Taze Gıda Fire Düşürme:</strong> Taze gıda akademi eğitimi ile fire oranının %2.8'den %2.4'e çekilmesi (₺4.8M ilave fire tasarrufu).</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span><strong>LMS Tamamlama Oranı:</strong> Saha ekiplerinin dijital modül tamamlama oranının %94.8'den %98.0 seviyesine çıkarılması.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-3 bg-amber-400/10 rounded-2xl border border-amber-400/30 text-amber-300 font-mono text-[11px] font-bold text-center">
                      6 Aylık Hedef: 28.000 Saat Eğitim &amp; 0 Risk 🎯
                    </div>
                  </div>

                  {/* CARD 2: 12 AY (ORTA VADE) */}
                  <div className="p-6 bg-[#061B33] rounded-3xl border-2 border-emerald-400/50 space-y-4 shadow-xl flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-emerald-400/30 pb-3">
                        <span className="text-xs font-mono font-black text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-xl border border-emerald-400/40">
                          📅 GELECEK 12 AY
                        </span>
                        <span className="text-[10px] text-emerald-200 font-bold">Orta Vadeli Büyüme Projeksiyonu</span>
                      </div>
                      <h4 className="font-extrabold text-sm text-white">20 Yeni Mağaza Genişlemesi ve İleri Terfi</h4>
                      
                      <ul className="space-y-2.5 text-gray-300 text-xs">
                        <li className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span><strong>Hedeflenen Yıllık Eğitim Saati:</strong> İşletme takviminde <strong>64.000 Saat / Yıl</strong> (Çalışan başı 52 saat) kapsamlı liderlik eğitimi.</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span><strong>20 Mağaza Açılış Altyapısı:</strong> Açılacak 20 yeni mağaza için 38 Mağaza Müdürü ve 54 Şube Şefinin %90 iç terfi kapasitesi ile atanması.</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span><strong>İç Terfi Oranı %50 Hedefi:</strong> Kurum içi terfi oranının %39'dan %50 seviyesine yükseltilerek dış alım bağımlılığının azaltılması.</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span><strong>Turnover Düşüşü %12:</strong> Mağaza Müdürü turnover oranının %17'den %12 seviyesine indirilerek liderlik kararlılığının pekiştirilmesi.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 text-emerald-300 font-mono text-[11px] font-bold text-center">
                      12 Aylık Hedef: 64.000 Saat Eğitim &amp; 20 Mağaza 🏬
                    </div>
                  </div>

                  {/* CARD 3: 2 YIL (UZUN VADE) */}
                  <div className="p-6 bg-[#061B33] rounded-3xl border-2 border-cyan-400/50 space-y-4 shadow-xl flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-cyan-400/30 pb-3">
                        <span className="text-xs font-mono font-black text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-xl border border-cyan-400/40">
                          🚀 GELECEK 2 YIL
                        </span>
                        <span className="text-[10px] text-cyan-200 font-bold">Uzun Vadeli Dönüşüm Vizyonu</span>
                      </div>
                      <h4 className="font-extrabold text-sm text-white">200 Mağaza Ölçeği &amp; PKA Executive Vizyonu</h4>
                      
                      <ul className="space-y-2.5 text-gray-300 text-xs">
                        <li className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span><strong>Hedeflenen Yıllık Eğitim Saati:</strong> İşletme takviminde <strong>80.000 Saat / Yıl</strong> (Çalışan başı 64 saat) dijital perakende ve liderlik akademi kapasitesi.</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span><strong>200 Mağaza Liderlik Pipeline:</strong> Şirket ağının 140'tan 200 mağazaya çıkarılması sürecinde 2.000+ çalışan için PKA Executive akademi liderliği.</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span><strong>Kişi Başı Ciro ₺2.40M TL:</strong> Dijital otomasyon, sepet büyütme ve müşteri deneyimi akademi yetkinlikleri ile kişi başı cironun ₺2.40M TL'ye çıkarılması.</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span><strong>%100 Tam Yedekli Organizasyon:</strong> Şirket genelinde sıfır açık pozisyon ve %100 doluluk oranına sahip sürdürülebilir insan sermayesi yapısı.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/30 text-cyan-300 font-mono text-[11px] font-bold text-center">
                      2 Yıllık Vizyon: 80.000 Saat &amp; ₺2.40M Ciro 🌐
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: YENİ MAĞAZA AÇMA SİMÜLATÖRÜ VE İNSAN GÜCÜ PLANLAMASI */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center space-x-2 text-amber-400 font-extrabold text-sm border-b border-white/10 pb-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>3. YENİ MAĞAZA AÇMA SİMÜLATÖRÜ VE İNSAN GÜCÜ PLANLAMASI</span>
                </div>
                <ExecutiveDashboard />
              </div>

              {/* SECTION 4: AKADEMİ ENTERPRISE FİNANSAL ETKİ VE ROI HESAPLAMA MOTORU */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center space-x-2 text-emerald-400 font-extrabold text-sm border-b border-white/10 pb-2">
                  <Coins className="w-5 h-5 text-emerald-400" />
                  <span>4. AKADEMİ ENTERPRISE FİNANSAL ETKİ VE ROI HESAPLAMA MOTORU</span>
                </div>
                <div className="bg-[#061B33] p-6 rounded-3xl border border-white/10">
                  <EnterpriseROICalculator />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 🔴 MODAL: YÖNETİCİ ADAY DETAY, TARİHLERİYLE EĞİTİMLER, SERTİFİKALAR, ROZETLER VE KANBAN TIMELINE */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B2A4A] border border-amber-400/40 rounded-3xl p-6 sm:p-8 max-w-4xl w-full space-y-6 text-white shadow-2xl animate-in fade-in duration-200 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-md shrink-0">
                  <Crown className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 flex-wrap gap-1">
                    <h3 className="font-bold text-xl text-white">{selectedCandidate.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-black border ${selectedCandidate.readinessBadgeColor}`}>
                      {selectedCandidate.readiness}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mt-0.5">
                    {selectedCandidate.currentRole} • {selectedCandidate.branch}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-1.5 text-gray-400 hover:text-white rounded-xl font-bold cursor-pointer shrink-0"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Target Career & Readiness Bar */}
            <div className="bg-[#061B33] p-4 rounded-2xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-mono block">Hedef Pozisyon Rotalaması</span>
                <div className="font-black text-amber-300 text-base">{selectedCandidate.targetRole}</div>
                <div className="text-gray-300 text-[11px] mt-0.5">Şirket İçi Toplam Kıdem: {selectedCandidate.tenure}</div>
              </div>

              <div className="bg-emerald-500/20 border border-emerald-500/30 p-3 rounded-xl text-center shrink-0">
                <span className="text-[10px] text-emerald-300 font-bold block">Terfi Hazırlık Skoru</span>
                <div className="text-2xl font-black text-emerald-400">%{selectedCandidate.score}</div>
              </div>
            </div>

            {/* 🎯 1. KİŞİYE ALMASI GEREKEN EĞİTİM ÖNERİLERİ LİSTESİ */}
            <div className="space-y-3 text-xs">
              <span className="font-bold text-amber-300 block flex items-center space-x-1.5">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span>Kişiye Alması Gereken Gelişim &amp; Terfi Eğitim Önerileri Listesi:</span>
              </span>

              <div className="space-y-2.5">
                {selectedCandidate.recommendedCourses.map((rc, rIdx) => (
                  <div key={rIdx} className="p-4 bg-[#061B33] rounded-2xl border border-amber-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 flex-wrap gap-1">
                        <span className="font-bold text-white text-xs">{rc.title}</span>
                        <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-black border ${rc.priorityColor}`}>
                          {rc.priority}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-300">{rc.reason}</p>
                      <div className="text-[10px] text-emerald-400 font-semibold">
                        ⚡ Yetkinlik Etkisi: {rc.skillImpact}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-white/10">
                      <span className="text-[10px] text-gray-400 font-mono flex items-center space-x-1">
                        <Clock className="h-3.5 w-3.5 text-amber-300" />
                        <span>{rc.durationHours} Saat</span>
                      </span>

                      <button
                        onClick={() => alert(`"${rc.title}" eğitimi ${selectedCandidate.name} isimli çalışanın LMS hesabına atandı.`)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-[11px] cursor-pointer shadow-md"
                      >
                        Eğitimi Ata
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 📚 2. ALDIĞI KURUM İÇİ EĞİTİMLER, SÜRELERİ, SINAV PUANLARI VE TAMAMLAMA TARİHİ */}
            <div className="space-y-3 text-xs">
              <span className="font-bold text-cyan-300 block flex items-center space-x-1.5">
                <GraduationCap className="h-4 w-4 text-cyan-400" />
                <span>Aldığı Kurum İçi Eğitimler, Süreleri, Puanları &amp; Tamamlama Tarihleri:</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCandidate.completedCoursesDetails.map((crs, idx) => (
                  <div key={idx} className="p-3.5 bg-[#061B33] rounded-2xl border border-cyan-500/30 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-white text-xs leading-snug">{crs.title}</div>
                        <span className="text-[9px] text-amber-300 font-mono uppercase">{crs.category}</span>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-black rounded font-mono text-[11px] shrink-0 border border-emerald-500/30 shadow-md">
                        %{crs.score}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-300 pt-2 border-t border-white/10 font-mono">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3.5 w-3.5 text-amber-300" />
                        <span>Süre: {crs.durationHours} Saat</span>
                      </span>
                      <span className="text-cyan-300 font-bold">{crs.grade}</span>
                      <span className="text-amber-300 font-bold flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-amber-300" />
                        <span>{crs.completedDate}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 💬 3. BAĞLI YÖNETİCİSİNİN KİŞİ HAKKINDAKİ YORUMLARI & GELİŞİM ALANLARI */}
            <div className="space-y-3 text-xs">
              <span className="font-bold text-amber-300 block flex items-center space-x-1.5">
                <MessageSquareQuote className="h-4 w-4 text-amber-400" />
                <span>Bağlı Yöneticisinin Kişi Hakkındaki Yorumu &amp; Gelişmesini İstediği Alanlar:</span>
              </span>

              <div className="p-4 bg-[#061B33] rounded-2xl border border-amber-400/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white text-xs">
                    Değerlendiren Yönetici: <span className="text-amber-300">{selectedCandidate.managerAssessment.managerName}</span> ({selectedCandidate.managerAssessment.managerTitle})
                  </div>
                  <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded font-mono text-[9px] font-bold">YÖNETİCİ DEĞERLENDİRMESİ</span>
                </div>

                <p className="text-gray-200 italic bg-white/5 p-3 rounded-xl border border-white/10 text-[11px] leading-relaxed">
                  "{selectedCandidate.managerAssessment.managerComments}"
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-cyan-950/30 p-3 rounded-xl border border-cyan-500/30 space-y-1">
                    <span className="font-bold text-cyan-300 block text-[10px] uppercase font-mono">Gelişmesi İstediği Kritik Alanlar:</span>
                    <ul className="space-y-1 text-[10px] text-gray-300">
                      {selectedCandidate.managerAssessment.developmentAreas.map((da, dIdx) => (
                        <li key={dIdx} className="flex items-start space-x-1">
                          <span className="text-cyan-400">•</span>
                          <span>{da}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-rose-950/30 p-3 rounded-xl border border-rose-500/30 space-y-1">
                    <span className="font-bold text-rose-300 block text-[10px] uppercase font-mono">Yöneticinin Belirttiği Zayıf Yönler:</span>
                    <ul className="space-y-1 text-[10px] text-gray-300">
                      {selectedCandidate.managerAssessment.weaknesses.map((w, wIdx) => (
                        <li key={wIdx} className="flex items-start space-x-1">
                          <span className="text-rose-400">•</span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 👑 4. ÜST YÖNETİMİN KİŞİ HAKKINDAKİ DEĞERLENDİRMESİ & KARARI */}
            <div className="space-y-3 text-xs">
              <span className="font-bold text-emerald-300 block flex items-center space-x-1.5">
                <Crown className="h-4 w-4 text-amber-400" />
                <span>Üst Yönetim &amp; Terfi Komitesi Değerlendirmesi ve Kararı:</span>
              </span>

              <div className="p-4 bg-gradient-to-r from-emerald-950/50 via-[#061B33] to-[#061B33] rounded-2xl border border-emerald-500/40 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="font-black text-white text-xs flex items-center space-x-2">
                    <CheckSquare className="h-4 w-4 text-emerald-400" />
                    <span>Komite Kararı: {selectedCandidate.executiveBoardAssessment.committeeDecision}</span>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px] rounded-lg border border-emerald-500/30">
                    Onay Skoru: %{selectedCandidate.executiveBoardAssessment.committeeApprovalRate}
                  </span>
                </div>

                <p className="text-gray-200 text-[11px] leading-relaxed">
                  <strong>Stratejik Yönetici Notu:</strong> {selectedCandidate.executiveBoardAssessment.executiveNote}
                </p>

                <div className="p-2.5 bg-amber-400/10 border border-amber-400/20 rounded-xl text-[10px] text-amber-300 font-semibold">
                  🛡️ <strong>Retansiyon Paketi:</strong> {selectedCandidate.executiveBoardAssessment.retentionRecommendation}
                </div>
              </div>
            </div>

            {/* 🟢 5. YATAY KRONOLOJİK KARİYER HARİTASI GRAFİĞİ */}
            <div className="space-y-3 text-xs">
              <span className="font-bold text-cyan-300 block flex items-center space-x-1.5">
                <TrendingUp className="h-4 w-4 text-cyan-400" />
                <span>Yatay Kronolojik Kariyer Yolculuğu &amp; Terfi Geçmişi:</span>
              </span>

              <div className="bg-[#061B33] p-5 rounded-2xl border border-cyan-500/30 overflow-x-auto">
                <div className="min-w-[620px] flex items-center justify-between relative py-2">
                  <div className="absolute top-6 left-8 right-8 h-1 bg-gradient-to-r from-slate-600 via-[#087F96] via-emerald-500 to-amber-400 z-0" />

                  {selectedCandidate.timeline.map((step, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-2 max-w-[135px]">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold shadow-xl border-2 transition-transform hover:scale-110 ${
                        step.type === 'PREVIOUS' ? 'bg-slate-800 text-gray-300 border-slate-600' :
                        step.type === 'JOIN' ? 'bg-[#087F96] text-white border-cyan-300 shadow-cyan-900/50' :
                        step.type === 'PROMOTION' ? 'bg-emerald-600 text-white border-emerald-300 shadow-emerald-900/50' :
                        'bg-amber-400 text-slate-950 border-amber-200 shadow-amber-500/50 ring-4 ring-amber-400/30 animate-pulse'
                      }`}>
                        {step.type === 'PREVIOUS' && '🏢'}
                        {step.type === 'JOIN' && '🚀'}
                        {step.type === 'PROMOTION' && '🏆'}
                        {step.type === 'GOAL' && '🎯'}
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono font-black text-amber-300 block">{step.year}</span>
                        <div className="font-bold text-white text-[11px] leading-tight">{step.title}</div>
                        <div className="text-[10px] text-gray-400 font-medium">{step.company}</div>
                        <p className="text-[9px] text-cyan-200/80 leading-tight pt-0.5">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 🎖️ 6. BAŞARI ROZETLERİ (BADGES WITH DATES) */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-amber-300 block flex items-center space-x-1">
                <Sparkles className="h-4 w-4 text-amber-300" />
                <span>Kazanılan Başarı &amp; Liderlik Rozetleri ve Kazanılma Tarihleri:</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {selectedCandidate.badges.map((bdg, bIdx) => (
                  <div key={bIdx} className="p-3 bg-[#061B33] rounded-2xl border border-amber-400/30 space-y-1.5">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-2xl">{bdg.icon}</span>
                      <div>
                        <div className="font-extrabold text-white text-[11px] leading-tight">{bdg.title}</div>
                        <span className="text-[9px] text-amber-300 font-mono uppercase">{bdg.category}</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-400 pt-1 border-t border-white/10 font-mono flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-amber-300" />
                      <span>Kazanılma Tarihi: {bdg.earnedDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 📊 7. S-W-O-T ANALİZ KARNESİ (4 KUTU MATRİSİ) */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-cyan-300 block flex items-center space-x-1">
                <BarChart3 className="h-4 w-4 text-cyan-400" />
                <span>S-W-O-T Analiz Karnesi (Stratejik Değerlendirme):</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Güçlü Yönler (S) */}
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl space-y-2">
                  <div className="font-black text-emerald-400 flex items-center space-x-1.5 text-xs uppercase tracking-wider">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Güçlü Yönler (Strengths)</span>
                  </div>
                  <ul className="space-y-1 text-gray-200 text-[11px]">
                    {selectedCandidate.swot.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Zayıf Yönler / Gelişim (W) */}
                <div className="p-4 bg-amber-950/40 border border-amber-500/40 rounded-2xl space-y-2">
                  <div className="font-black text-amber-400 flex items-center space-x-1.5 text-xs uppercase tracking-wider">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Gelişim Alanları (Weaknesses)</span>
                  </div>
                  <ul className="space-y-1 text-gray-200 text-[11px]">
                    {selectedCandidate.swot.weaknesses.map((w, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fırsatlar (O) */}
                <div className="p-4 bg-cyan-950/40 border border-cyan-500/40 rounded-2xl space-y-2">
                  <div className="font-black text-cyan-400 flex items-center space-x-1.5 text-xs uppercase tracking-wider">
                    <Zap className="h-4 w-4" />
                    <span>Fırsatlar (Opportunities)</span>
                  </div>
                  <ul className="space-y-1 text-gray-200 text-[11px]">
                    {selectedCandidate.swot.opportunities.map((o, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tehditler / Riskler (T) */}
                <div className="p-4 bg-rose-950/40 border border-rose-500/40 rounded-2xl space-y-2">
                  <div className="font-black text-rose-400 flex items-center space-x-1.5 text-xs uppercase tracking-wider">
                    <ShieldAlert className="h-4 w-4" />
                    <span>Riskler &amp; Tehditler (Threats)</span>
                  </div>
                  <ul className="space-y-1 text-gray-200 text-[11px]">
                    {selectedCandidate.swot.threats.map((t, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 📜 8. QR DOĞRULAMALI SERTİFİKALARI (WITH DATES) */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-purple-300 block flex items-center space-x-1">
                <Award className="h-4 w-4 text-purple-400" />
                <span>Doğrulanmış Resmi PKA Sertifikaları ve Veriliş Tarihleri:</span>
              </span>
              <div className="space-y-2">
                {selectedCandidate.certificates.map((crt, cIdx) => (
                  <div key={cIdx} className="p-3.5 bg-[#061B33] rounded-2xl border border-purple-500/30 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-bold text-white text-xs">{crt.title}</div>
                      <div className="text-[10px] text-gray-300 flex items-center space-x-2 font-mono">
                        <span>{crt.issuer}</span>
                        <span>•</span>
                        <span className="text-amber-300 flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Sertifika Veriliş Tarihi: {crt.date}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-white text-slate-950 px-2.5 py-1 rounded-xl shrink-0 font-mono text-[10px] font-bold">
                      <QrCode className="h-4 w-4 text-[#0B2A4A]" />
                      <span>{crt.code}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competency Ratings */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-gray-200 block">Liderlik &amp; Operasyonel Yetkinlik Dereceleri:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCandidate.competencies.map((comp, cIdx) => (
                  <div key={cIdx} className="p-3 bg-[#061B33] rounded-xl border border-white/10 space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>{comp.name}</span>
                      <span className="text-cyan-300 font-mono">%{comp.score}</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${comp.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
              <button
                onClick={() => {
                  alert(`${selectedCandidate.name} isimli adayın terfi komitesi ataması CEO tarafından onaylandı.`);
                  setSelectedCandidate(null);
                }}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
              >
                <BadgeCheck className="h-4 w-4" />
                <span>Terfi Atamasını Onayla</span>
              </button>

              <button
                onClick={() => alert(`${selectedCandidate.name} için detaylı PDF yetenek karnesi, eğitim tarihleri ve SWOT analizi indirildi.`)}
                className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl flex items-center justify-center space-x-2 cursor-pointer border border-white/15"
              >
                <Download className="h-4 w-4" />
                <span>Tarihli Eğitim Karnesi &amp; PDF İndir</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
