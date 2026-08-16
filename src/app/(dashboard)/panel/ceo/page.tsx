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
  BookOpen
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
        year: 'Ocak 2023',
        title: 'Reyon Sorumlusu',
        company: 'PKA (Kadıköy Şubesi)',
        type: 'JOIN',
        description: 'Şirkete İşe Başlangıç • %88 Giriş Yetkinlik Puanı.'
      },
      {
        year: 'Ağustos 2024',
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
      { title: 'P&L Mağaza Bütçe Yönetimi Uzmanlığı', durationHours: 32, score: 98, grade: 'PKA Derece', completedDate: 'Mayıs 2025', category: 'FİNANS & YÖNETİM' },
      { title: 'Ekip Liderliği & Süreç Yönetimi', durationHours: 24, score: 96, grade: 'Üstün Başarı', completedDate: 'Mart 2025', category: 'LİDERLİK' },
      { title: 'Fire Minimizasyonu & Marj Artırımı', durationHours: 16, score: 95, grade: 'PKA Başarı', completedDate: 'Ağustos 2024', category: 'OPERASYON' },
      { title: 'Perakende Saha Auditi & Kriz Yönetimi', durationHours: 20, score: 94, grade: 'Tamamlandı', completedDate: 'Ocak 2024', category: 'SAHA YÖNETİMİ' }
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
      { title: 'PKA Resmi Mağaza Yönetimi & P&L Bütçeleme Sertifikası', code: 'PKA-2025-9841', date: 'Mayıs 2025', issuer: 'PKA Kurumsal Akademi' },
      { title: 'Saha Auditi & Fire Minimizasyonu Uzmanlık Sertifikası', code: 'PKA-2024-8120', date: 'Ağustos 2024', issuer: 'PKA Operasyon Direktörlüğü' },
      { title: 'Liderlik ve Müşteri İlişkileri Sertifikası', code: 'PKA-2023-4412', date: 'Aralık 2023', issuer: 'PKA Yetenek Yönetimi' }
    ],
    badges: [
      { title: 'Bölge Ciro Rekortmeni', icon: '🏆', category: 'PERFORMANS' },
      { title: 'Sıfır Fire Ustalık Rozeti', icon: '⚡', category: 'OPERASYON' },
      { title: 'Akademi Derece Rozeti', icon: '🎓', category: 'EĞİTİM' },
      { title: '4.9 CSAT Müşteri Yıldızı', icon: '⭐', category: 'MEMNUNİYET' }
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
        year: 'Nisan 2024',
        title: 'Kasiyer',
        company: 'PKA (Beşiktaş Şubesi)',
        type: 'JOIN',
        description: 'Şirkete İşe Başlangıç • %85 Giriş Notu.'
      },
      {
        year: 'Ocak 2025',
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
      { title: 'Kasa Sistemleri & Gün Sonu Mutabakatı', durationHours: 28, score: 99, grade: 'Bölge 1.\'si', completedDate: 'Ocak 2025', category: 'KASA HATTI' },
      { title: 'Müşteri İlişkileri & Şikayet Yönetimi', durationHours: 16, score: 94, grade: 'Üstün Başarı', completedDate: 'Kasım 2024', category: 'MÜŞTERİ HİZMETLERİ' },
      { title: 'Reyon Düzeni & 5S Saha Protokolü', durationHours: 12, score: 92, grade: 'Tamamlandı', completedDate: 'Eylül 2024', category: 'MAĞAZA OPERASYON' },
      { title: 'Aday Personel Oryantasyon Eğitmenliği', durationHours: 20, score: 96, grade: 'Eğitmen Sertifikalı', completedDate: 'Haziran 2024', category: 'ORYANTASYON' }
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
      { title: 'Kasa Sistemleri & Gün Sonu Mutabakat Sertifikası', code: 'PKA-2025-3312', date: 'Ocak 2025', issuer: 'PKA Kasa Akademisi' },
      { title: 'Müşteri Kriz Yönetimi Uzmanlık Sertifikası', code: 'PKA-2024-1109', date: 'Kasım 2024', issuer: 'PKA İletişim Birimi' },
      { title: 'İç Eğitmen Oryantasyon Sertifikası', code: 'PKA-2024-7712', date: 'Haziran 2024', issuer: 'PKA Yetenek Yönetimi' }
    ],
    badges: [
      { title: 'Bölge Kasa Hızı 1.\'si', icon: '🥇', category: 'PERFORMANS' },
      { title: 'Yılın İç Eğitmen Rozeti', icon: '👨‍🏫', category: 'EĞİTİM' },
      { title: '%100 Z-Raporu Uyum Rozeti', icon: '🎯', category: 'OPERASYON' }
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
        year: 'Şubat 2022',
        title: 'Mağaza Müdürü',
        company: 'PKA (Tunalı Şubesi)',
        type: 'JOIN',
        description: 'Şirkete İşe Başlangıç • Tunalı Şube Yönetimi.'
      },
      {
        year: 'Temmuz 2024',
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
      { title: 'Çoklu Mağaza Operasyon Yönetimi', durationHours: 40, score: 96, grade: 'Üst Düzey Yönetim', completedDate: 'Temmuz 2024', category: 'BÖLGE YÖNETİMİ' },
      { title: 'Bölgesel Ciro ve Pazar Payı Stratejileri', durationHours: 32, score: 95, grade: 'PKA Liderlik', completedDate: 'Kasım 2023', category: 'FİNANS & STRATEJİ' },
      { title: 'Yöneticinin Koçluk & Mentorluk Rolü', durationHours: 24, score: 94, grade: 'Üstün Başarı', completedDate: 'Eylül 2022', category: 'LİDERLİK KOÇLUĞU' },
      { title: 'Bölge İK & Yetenek Yedekleme Planı', durationHours: 20, score: 95, grade: 'Tamamlandı', completedDate: 'Ocak 2023', category: 'YETENEK PLANLAMA' }
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
      { title: 'Çoklu Mağaza ve Bölge Yönetim Sertifikası', code: 'PKA-2024-9901', date: 'Temmuz 2024', issuer: 'PKA Üst Yönetim Akademi' },
      { title: 'P&L ve Finansal Strateji Sertifikası', code: 'PKA-2023-8812', date: 'Kasım 2023', issuer: 'PKA Finans Direktörlüğü' },
      { title: 'Yöneticinin Koçluk & Mentorluk Sertifikası', code: 'PKA-2022-4411', date: 'Eylül 2022', issuer: 'PKA İK Kurulu' }
    ],
    badges: [
      { title: '₺24.8M Yıllık Ciro Lideri', icon: '👑', category: 'PERFORMANS' },
      { title: '5 Müdür Yardımcısı Yetiştiren Mentor', icon: '👥', category: 'LİDERLİK' },
      { title: '%6.8 Şirket En Düşük Turnover', icon: '🛡️', category: 'RETANSİYON' }
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

export default function CEODashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'summary' | 'capital' | 'risks' | 'pipeline' | 'succession' | 'comparison' | 'scenario' | 'roi' | 'board'
  >('summary');

  const [selectedCandidate, setSelectedCandidate] = useState<ExecutiveCandidate | null>(null);

  return (
    <div className="min-h-screen bg-[#061B33] text-white flex flex-col font-sans">
      {/* Top Header Bar */}
      <div className="bg-[#0B2A4A] border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Crown className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">CEO & Üst Yönetim Portalı (EXECUTIVE)</h1>
              <p className="text-xs text-amber-300 font-semibold">İnsan Sermayesi Yönetici Özeti & 20 Mağaza Büyüme Senaryo Simülatörü</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => alert('Yönetim Kurulu Raporu (PDF) bilgisayarınıza indirildi.')}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow-md cursor-pointer"
            >
              <FileText className="h-4 w-4" />
              <span>Yönetim Kurulu Özetini İndir</span>
            </button>

            <Link href="/" className="text-xs text-gray-400 hover:text-white px-2 py-1">
              Ana Siteye Dön
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* CEO SIDEBAR NAVIGATION */}
        <div className="lg:col-span-1 space-y-1 bg-[#0B2A4A] p-3 rounded-2xl border border-white/10 h-fit text-xs font-bold">
          <div className="px-3 py-2 text-[10px] font-black text-amber-400 uppercase tracking-wider">
            Yönetim Özeti Navigasyonu
          </div>

          {[
            { id: 'summary', name: 'Yönetici Özeti', icon: BarChart3 },
            { id: 'capital', name: 'İnsan Sermayesi (10 KPI)', icon: Users },
            { id: 'risks', name: 'Kritik Riskler', icon: ShieldAlert },
            { id: 'pipeline', name: 'Yönetici Aday Havuzu', icon: Award },
            { id: 'succession', name: 'Yedekleme Durumu', icon: Building2 },
            { id: 'comparison', name: 'Şube/Bölge Karşılaştırması', icon: TrendingUp },
            { id: 'scenario', name: '20 Mağaza Senaryosu', icon: Sparkles },
            { id: 'roi', name: 'Finansal Etki & ROI', icon: DollarSign },
            { id: 'board', name: 'Yönetim Kurulu Raporu', icon: FileText },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === item.id ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* CEO CONTENT AREA */}
        <div className="lg:col-span-4 space-y-6">
          
          {activeTab === 'summary' && (
            <div className="space-y-6">
              <ExecutiveDashboard />
            </div>
          )}

          {/* İNSAN SERMAYESİ 10 KPI TABI */}
          {activeTab === 'capital' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-amber-300">10 İnsan Sermayesi Stratejik KPI Özeti</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                {[
                  { name: 'Ciro / Çalışan', val: '₺1.84M', trend: '+14.2%', color: 'text-emerald-400' },
                  { name: 'Turnover Oranı', val: '%11.4', trend: '-3.8%', color: 'text-emerald-400' },
                  { name: 'Terfi Skoru Ort.', val: '84.2', trend: '+6.5p', color: 'text-cyan-400' },
                  { name: 'İç Terfi Oranı', val: '%85.0', trend: '+12.0%', color: 'text-amber-400' },
                  { name: 'Eğitim ROI', val: '%340', trend: '+45%', color: 'text-emerald-400' },
                  { name: 'Mağaza Fire Min.', val: '%1.8', trend: '-0.9%', color: 'text-emerald-400' },
                  { name: 'Aday Havuzu Doluluk', val: '%92.5', trend: '+8.0%', color: 'text-cyan-400' },
                  { name: 'Sertifikasyon %', val: '%88.0', trend: '+15%', color: 'text-purple-400' },
                  { name: 'Müşteri Memnuniyeti', val: '4.8/5', trend: '+0.4', color: 'text-amber-400' },
                  { name: 'LMS Katılım', val: '%96.2', trend: '+5.1%', color: 'text-emerald-400' },
                ].map((kpi, idx) => (
                  <div key={idx} className="p-3 bg-[#061B33] rounded-2xl border border-white/10 space-y-1">
                    <span className="text-[10px] text-gray-400 block truncate">{kpi.name}</span>
                    <div className="text-xl font-black text-white">{kpi.val}</div>
                    <span className={`text-[10px] font-bold ${kpi.color}`}>{kpi.trend} vs Geçen Yıl</span>
                  </div>
                ))}
              </div>
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
                  <p className="text-xs text-gray-300 mt-1">Aday kartlarına tıklayarak alması gereken eğitim önerilerini, sertifikalarını, başarı rozetlerini ve yönetici yorumlarını detaylı inceleyin.</p>
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
                    <div>• Gelişim Önerileri: 3 Atanabilir Modül</div>
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
                    <div>• Gelişim Önerileri: 3 Atanabilir Modül</div>
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
                    <div>• Gelişim Önerileri: 3 Atanabilir Modül</div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* YEDEKLEME DURUMU TABI */}
          {activeTab === 'succession' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white">Mağaza ve Bölge Bazlı Yedekleme Haritası</h2>
              <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 text-xs space-y-2">
                <div className="flex justify-between items-center text-gray-300 font-bold">
                  <span>82 Kritik Pozisyonda Yedek Aday Oranı</span>
                  <span className="text-emerald-400">%76.2 Doluluk</span>
                </div>
                <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '76.2%' }} />
                </div>
              </div>
            </div>
          )}

          {/* ŞUBE / BÖLGE KARŞILAŞTIRMASI TABI */}
          {activeTab === 'comparison' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white">Bölgesel İnsan Sermayesi Performans Karşılaştırması</h2>
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#061B33] text-gray-300 border-b border-white/10">
                      <th className="p-3">Bölge Müdürlüğü</th>
                      <th className="p-3 text-center">Mağaza Sayısı</th>
                      <th className="p-3 text-center">Ort. Terfi Skoru</th>
                      <th className="p-3 text-center">Turnover Oranı</th>
                      <th className="p-3 text-center">LMS Tamamlama</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="p-3 font-bold text-white">Marmara Bölgesi</td>
                      <td className="p-3 text-center">48 Mağaza</td>
                      <td className="p-3 text-center text-emerald-400 font-bold">88.5</td>
                      <td className="p-3 text-center text-emerald-400 font-bold">%9.2</td>
                      <td className="p-3 text-center text-cyan-400 font-bold">%97.5</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">Ege Bölgesi</td>
                      <td className="p-3 text-center">32 Mağaza</td>
                      <td className="p-3 text-center text-emerald-400 font-bold">84.0</td>
                      <td className="p-3 text-center text-amber-400 font-bold">%12.4</td>
                      <td className="p-3 text-center text-cyan-400 font-bold">%94.0</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">İç Anadolu Bölgesi</td>
                      <td className="p-3 text-center">24 Mağaza</td>
                      <td className="p-3 text-center text-emerald-400 font-bold">82.1</td>
                      <td className="p-3 text-center text-emerald-400 font-bold">%10.8</td>
                      <td className="p-3 text-center text-cyan-400 font-bold">%92.5</td>
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
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6 text-xs">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-amber-300">2026 Q3 Yönetim Kurulu İnsan Sermayesi Raporu</h2>
                <button
                  onClick={() => alert('Yönetim Kurulu Raporu (PDF) bilgisayarınıza indirildi.')}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl cursor-pointer"
                >
                  Raporu İndir (PDF)
                </button>
              </div>

              <div className="p-5 bg-[#061B33] rounded-2xl border border-white/10 space-y-3">
                <h3 className="text-sm font-bold text-white">Yönetici Yönetim Kurulu Özeti:</h3>
                <p className="text-gray-300 leading-relaxed">
                  Şirketimiz perakende akademi altyapısıyla iç terfi oranını %85 seviyesine çıkarmış, kritik mağaza müdür ayrılmalarındaki ciro kaybını sıfırlamıştır. Toplam 1.240 çalışanın yetkinlik takibi canlı yapılmakta olup, yeni açılacak 20 mağaza için 42 yedek yönetici adayımız tamamen hazırdır.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 🔴 MODAL: YÖNETİCİ ADAY DETAY, EĞİTİM ÖNERİLERİ LİSTESİ, TAMAMLANAN EĞİTİMLER, SERTİFİKALAR, SWOT VE TIMELINE */}
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

            {/* 📚 2. ALDIĞI KURUM İÇİ EĞİTİMLER, SÜRELERİ VE SINAV PUANLARI */}
            <div className="space-y-3 text-xs">
              <span className="font-bold text-cyan-300 block flex items-center space-x-1.5">
                <GraduationCap className="h-4 w-4 text-cyan-400" />
                <span>Aldığı Kurum İçi Eğitimler, Süreleri &amp; Sınav Başarı Puanları:</span>
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
                        <span>Eğitim Süresi: {crs.durationHours} Saat</span>
                      </span>
                      <span className="text-cyan-300 font-bold">{crs.grade}</span>
                      <span className="text-gray-400">{crs.completedDate}</span>
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

            {/* 🎖️ 6. BAŞARI ROZETLERİ (BADGES) */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-amber-300 block flex items-center space-x-1">
                <Sparkles className="h-4 w-4 text-amber-300" />
                <span>Kazanılan Başarı &amp; Liderlik Rozetleri:</span>
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {selectedCandidate.badges.map((bdg, bIdx) => (
                  <div key={bIdx} className="p-3 bg-[#061B33] rounded-2xl border border-amber-400/30 flex items-center space-x-2.5">
                    <span className="text-2xl">{bdg.icon}</span>
                    <div>
                      <div className="font-extrabold text-white text-[11px] leading-tight">{bdg.title}</div>
                      <span className="text-[9px] text-amber-300 font-mono uppercase">{bdg.category}</span>
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

            {/* 📜 8. QR DOĞRULAMALI SERTİFİKALARI */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-purple-300 block flex items-center space-x-1">
                <Award className="h-4 w-4 text-purple-400" />
                <span>Doğrulanmış Resmi PKA Sertifikaları:</span>
              </span>
              <div className="space-y-2">
                {selectedCandidate.certificates.map((crt, cIdx) => (
                  <div key={cIdx} className="p-3 bg-[#061B33] rounded-2xl border border-purple-500/30 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-bold text-white text-xs">{crt.title}</div>
                      <div className="text-[10px] text-gray-400">{crt.issuer} • Veriliş: {crt.date}</div>
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
                onClick={() => alert(`${selectedCandidate.name} için detaylı PDF yetenek karnesi, eğitim önerileri ve SWOT analizi indirildi.`)}
                className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl flex items-center justify-center space-x-2 cursor-pointer border border-white/15"
              >
                <Download className="h-4 w-4" />
                <span>Eğitim Önerileri &amp; PDF İndir</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
