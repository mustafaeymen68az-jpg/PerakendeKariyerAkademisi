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
  Info,
  Printer,
  Download,
  Trophy,
  AlertCircle,
  FileWarning,
  ShieldX,
  Medal,
  Store,
  ShoppingCart,
  Package,
  Truck,
  Apple,
  BriefcaseBusiness
} from 'lucide-react';

export type DepartmentType = 'Mağaza Yönetimi' | 'Kasa & Operasyon' | 'Reyon & Teşhir' | 'Lojistik & Depo' | 'Taze Gıda & Şarküteri' | 'Merkez & İK';

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

export interface AwardRecord {
  title: string;
  category: 'Ödül' | 'Plaket' | 'Rozet' | 'Başarı Belgesi';
  givenDate: string;
  organization: string;
  reason: string;
}

export interface PromotionRecord {
  fromRole: string;
  toRole: string;
  promotionDate: string;
  approvedBy: string;
  note: string;
}

export interface DisciplineNotice {
  type: 'Sözlü İkaz' | 'Yazılı Uyarı' | 'Tutanak' | 'Disiplin Cezası';
  issueDate: string;
  reason: string;
  status: 'Sicil Temiz (Zamanaşımı)' | 'Aktif Not' | 'Tutanak İşleme Alındı';
  issuedBy: string;
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
  department: DepartmentType;
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
  awards: AwardRecord[];
  promotions: PromotionRecord[];
  warnings: DisciplineNotice[];
  penalties: DisciplineNotice[];
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

function generate1000EmployeesData(): EmployeeCareerRecord[] {
  const avatars = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400'
  ];

  const cities = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Kocaeli', 'Gaziantep', 'Konya', 'Trabzon', 'Eskişehir', 'Samsun', 'Mersin', 'Kayseri', 'Denizli'];

  const maleNames = [
    'Ahmet', 'Mehmet', 'Caner', 'Murat', 'Hakan', 'Oğuzhan', 'Fatih', 'Volkan', 'Tolga', 'Onur',
    'Kadir', 'Burak', 'Cemal', 'Kerem', 'Sinan', 'Alperen', 'Melih', 'Emre', 'Tarık', 'İbrahim',
    'Mert', 'Ferhat', 'Hasan', 'Mustafa', 'Serhat'
  ];

  const femaleNames = [
    'Zeynep', 'Selin', 'Deniz', 'Gamze', 'Elif', 'Ayşe', 'Seda', 'Ebru', 'Yasemin', 'Kübra',
    'Gizem', 'Büşra', 'Merve', 'Tuğba', 'Sibel', 'Hande', 'Aslıhan', 'Derya', 'Rabia', 'Nurcan',
    'Ezgi', 'Betül', 'Ceren', 'Pınar', 'Sümeyye'
  ];

  const lastNames = [
    'Çelik', 'Kaya', 'Yılmaz', 'Şahin', 'Özer', 'Arslan', 'Yıldırım', 'Tekin', 'Bulut', 'Aksoy',
    'Demir', 'Öztürk', 'Erdem', 'Kılıç', 'Çetin', 'Güneş', 'Doğan', 'Şimşek', 'Yalçın', 'Aktaş',
    'Şen', 'Kaplan', 'Kara', 'Bozkurt', 'Polat'
  ];

  const roleByDept: Record<DepartmentType, { role: string; target: string }[]> = {
    'Mağaza Yönetimi': [
      { role: 'Mağaza Müdürü', target: 'Bölge Müdürü (Area Manager)' },
      { role: 'Kıdemli Mağaza Müdürü', target: 'Bölge Operasyon Müdürü' },
      { role: 'Mağaza Müdür Yardımcısı', target: 'Mağaza Müdürü' },
      { role: 'Vardiya Müdürü', target: 'Mağaza Müdür Yardımcısı' },
      { role: 'Stajyer Mağaza Müdürü', target: 'Vardiya Müdürü' }
    ],
    'Kasa & Operasyon': [
      { role: 'Kasa Operasyon Şefi', target: 'Kasa Direktörü Adayı' },
      { role: 'Baş Kasiyer', target: 'Mağaza Müdür Yardımcısı' },
      { role: 'Kasa Şefi', target: 'Baş Kasiyer' },
      { role: 'Kasiyer & Reyon Elemanı', target: 'Kasa Şefi' },
      { role: 'Stajyer Kasiyer', target: 'Kasiyer' }
    ],
    'Reyon & Teşhir': [
      { role: 'Görsel Mağazacılık Şefi', target: 'Görsel Tasarım Direktörü' },
      { role: 'Reyon Şefi', target: 'Kategori Yöneticisi Yardımcısı' },
      { role: 'Gıda Dışı Reyon Şefi', target: 'Mağaza Müdür Yardımcısı' },
      { role: 'Satış Elemanı', target: 'Reyon Şefi Adayı' },
      { role: 'Reyon Elemanı', target: 'Satış Elemanı' }
    ],
    'Lojistik & Depo': [
      { role: 'Lojistik & Depo Şefi', target: 'Tedarik Zinciri Müdürü' },
      { role: 'Depo Şefi', target: 'Lojistik Bölge Müdürü' },
      { role: 'Lojistik & Depo Sorumlusu', target: 'Depo Şefi' },
      { role: 'Sevkiyat Sorumlusu', target: 'Filo Yönetim Şefi' },
      { role: 'Depo Destek Elemanı', target: 'Mal Kabul Sorumlusu' }
    ],
    'Taze Gıda & Şarküteri': [
      { role: 'Kasap Reyon Şefi', target: 'Taze Gıda Kategori Şefi' },
      { role: 'Şarküteri Şefi', target: 'Taze Gıda Reyon Şefi' },
      { role: 'Unlu Mamüller Şefi', target: 'Üretim Müdürü' },
      { role: 'Manav Reyon Şefi', target: 'Hal & Tedarik Şefi' },
      { role: 'Manav Görevlisi', target: 'Manav Şefi Adayı' }
    ],
    'Merkez & İK': [
      { role: 'Kategori Yöneticisi', target: 'Satın Alma Direktörü Adayı' },
      { role: 'İnsan Kaynakları Uzmanı', target: 'İK Müdürü' },
      { role: 'Müşteri Hizmetleri Şefi', target: 'Müşteri Deneyimi Müdürü' },
      { role: 'İK İş Ortağı', target: 'Kıdemli İK Yöneticisi' },
      { role: 'Veri Analisti', target: 'İş Zekası Yöneticisi' }
    ]
  };

  const list: EmployeeCareerRecord[] = [];

  for (let i = 0; i < 1000; i++) {
    const isMale = i % 2 === 0;
    const firstName = isMale ? maleNames[i % maleNames.length] : femaleNames[i % femaleNames.length];
    const lastName = lastNames[(i * 7) % lastNames.length];
    
    let name = `${firstName} ${lastName}`;
    if (i === 0) name = 'Ahmet Çelik';
    if (i === 1) name = 'Zeynep Kaya';
    if (i === 2) name = 'Dr. Mehmet Yılmaz';
    if (i === 3) name = 'Caner Şahin';

    // Score distribution:
    // 0..179 (180 headcount = 18%): 91-99 (Terfi Edebilir)
    // 180..499 (320 headcount = 32%): 81-90 (Başarılı)
    // 500..779 (280 headcount = 28%): 71-80 (Geliştirilebilir)
    // 780..929 (150 headcount = 15%): 51-70 (Orta Performans)
    // 930..999 (70 headcount = 7%): 35-50 (Zayıf Performans)
    let score = 85;
    if (i < 180) score = 91 + (i % 9);
    else if (i < 500) score = 81 + (i % 10);
    else if (i < 780) score = 71 + (i % 10);
    else if (i < 930) score = 51 + (i % 20);
    else score = 35 + (i % 16);

    // Department distribution:
    const deptModulo = i % 100;
    let dept: DepartmentType = 'Reyon & Teşhir';
    if (deptModulo < 16) dept = 'Mağaza Yönetimi';
    else if (deptModulo < 40) dept = 'Kasa & Operasyon';
    else if (deptModulo < 62) dept = 'Reyon & Teşhir';
    else if (deptModulo < 80) dept = 'Lojistik & Depo';
    else if (deptModulo < 94) dept = 'Taze Gıda & Şarküteri';
    else dept = 'Merkez & İK';

    const rolesList = roleByDept[dept];
    const roleObj = rolesList[i % rolesList.length];

    const match = Math.min(99, Math.max(45, score + (i % 5) - 2));
    const avatar = avatars[i % avatars.length];
    const city = cities[i % cities.length];
    const tenureYears = Math.floor(score / 15) + 1;
    const tenure = `${tenureYears} Yıl ${(i * 3) % 12} Ay`;
    const startDate = `${(i % 28) + 1} ${['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'][i % 12]} 202${2 + (i % 4)}`;

    const awards: AwardRecord[] = score >= 90 ? [
      { title: `2025 Yılı ${city} Perakende Yıldızı Ödülü`, category: 'Ödül', givenDate: '15 Aralık 2025', organization: 'Perakende Kariyer Akademisi', reason: `%${score} Üstün Başarı Skoru` },
      { title: 'Sıfır Fire ve Müşteri Teşekkür Plaketi', category: 'Plaket', givenDate: '10 Haziran 2024', organization: 'Genel Müdürlük', reason: 'Saha operasyon mükemmelliği' }
    ] : score >= 80 ? [
      { title: 'Ayın Örnek Çalışanı Rozeti', category: 'Rozet', givenDate: '01 Eylül 2024', organization: 'Müşteri Hizmetleri', reason: 'Yüksek CSAT skoru' }
    ] : [];

    const promotions: PromotionRecord[] = score >= 80 ? [
      { fromRole: 'Stajyer / Görevli', toRole: roleObj.role, promotionDate: '15 Mart 2023', approvedBy: 'Ahmet Çelik (İK Direktörü)', note: 'Yüksek başarı puanı ile terfi.' }
    ] : [];

    const warnings: DisciplineNotice[] = score <= 50 ? [
      { type: 'Sözlü İkaz', issueDate: '10 Mart 2026', reason: 'Vardiya açılış saati aksaması', status: 'Aktif Not', issuedBy: 'Mağaza Müdürü' }
    ] : score <= 70 ? [
      { type: 'Sözlü İkaz', issueDate: '12 Ekim 2023', reason: 'Operasyonel evrak gecikmesi', status: 'Sicil Temiz (Zamanaşımı)', issuedBy: 'Saha Şefi' }
    ] : [];

    const penalties: DisciplineNotice[] = score <= 40 ? [
      { type: 'Tutanak', issueDate: '15 Nisan 2026', reason: 'Reyon etiket ve hijyen denetimi uyarısı', status: 'Tutanak İşleme Alındı', issuedBy: 'İSG Kurulu' }
    ] : [];

    list.push({
      id: `emp_${i + 1}`,
      name,
      avatar,
      department: dept,
      currentRole: roleObj.role,
      recommendedRole: roleObj.target,
      matchPercentage: match,
      competencyScore: score,
      city,
      experienceYears: tenureYears,
      startDate,
      tenure,
      previousExperiences: [
        { companyName: 'BİM A.Ş. / Migros', role: 'Saha Görevlisi', duration: '2 Yıl', yearsRange: '2020–2022' }
      ],
      priorTrainings: [
        { title: 'Temel Perakendecilik Sertifikası', institution: 'MEB Sertifika', instructorName: 'Seda Yılmaz', companyWhereTaken: 'Harici Kurum', durationHours: 24, year: '2020' }
      ],
      completedTrainings: [
        { courseTitle: `${roleObj.role} Master Sertifika Programı`, duration: '16 Saat', durationHours: 16, completedDate: '10 Mayıs 2026', instructorName: 'Prof. Dr. Ahmet Çelik', institution: 'Perakende Kariyer Akademisi', companyWhereTaken: 'Mevcut Şirket', score, gradeStatus: score >= 90 ? 'Üstün Başarı' : score >= 80 ? 'Pek İyi' : 'Başarılı', certificateId: `PKA-2026-${i + 1}-001` }
      ],
      awards,
      promotions,
      warnings,
      penalties,
      evaluations: {
        managerReview: { author: 'Murat Yıldırım', role: 'Mağaza Müdürü', rating: score / 20, comment: `${name} yetkinlik skoru %${score} seviyesindedir. ${roleObj.target} rolü için takibe alınmıştır.`, date: '10 Haziran 2026' },
        subordinateReview: { author: 'Selin Demir', role: 'Ekip Çalışanı', rating: 4.5, comment: 'Vardiyada uyumlu ve destekçi.', date: '02 Haziran 2026' },
        hrReview: { author: 'Ahmet Çelik', role: 'İK Direktörü', rating: 4.8, comment: `${name} İK Kariyer haritasında ${score} puanla yer almaktadır.`, date: '14 Haziran 2026' }
      },
      swot: {
        strengths: [`%${score} Yetkinlik Puanı`, 'Disiplinli vardiya takibi'],
        weaknesses: ['İleri Finansal Analitik'],
        opportunities: [`${roleObj.target} pozisyon terfisi`],
        threats: ['Yoğun vardiya temposu']
      },
      developmentAreas: ['Saha İletişimi ve Bütçe Yönetimi'],
      careerAdvice: [
        { phase: '1. Ay (Ağustos 2026)', action: 'Terfi ve gelişim modülleri başlanacak.', targetDate: '15 Ağustos 2026' }
      ]
    });
  }

  return list;
}

const INITIAL_EMPLOYEES_CAREER_DATA = generate1000EmployeesData();

export default function EmployeeCareerPlanningModule() {
  const [employeesData, setEmployeesData] = useState<EmployeeCareerRecord[]>(INITIAL_EMPLOYEES_CAREER_DATA);
  const [selectedEmpId, setSelectedEmpId] = useState<string>(INITIAL_EMPLOYEES_CAREER_DATA[0].id);
  const [scoreFilterCategory, setScoreFilterCategory] = useState<string>('all');
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayLimit, setDisplayLimit] = useState<number>(50);

  // Interactive Training Breakdown Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalFilterType, setModalFilterType] = useState<'all' | 'hours' | 'post' | 'prior'>('all');

  // Local state for editing reviews dynamically
  const [managerInput, setManagerInput] = useState<string>('');
  const [subordinateInput, setSubordinateInput] = useState<string>('');
  const [hrInput, setHrInput] = useState<string>('');
  const [savedSuccessMsg, setSavedSuccessMsg] = useState<string | null>(null);

  // Auto select candidate from URL query param e.g. ?name=Ahmet+Kaya
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const nameParam = params.get('name') || params.get('emp') || params.get('search');
      if (nameParam) {
        const matched = employeesData.find(e => e.name.toLowerCase().includes(nameParam.toLowerCase()));
        if (matched) {
          setSelectedEmpId(matched.id);
          setScoreFilterCategory('all');
          setSelectedDepartmentFilter('all');
        } else {
          setSearchQuery(nameParam);
        }
      }
    }
  }, [employeesData]);

  // Reset display limit when filter conditions change
  React.useEffect(() => {
    setDisplayLimit(50);
  }, [scoreFilterCategory, selectedDepartmentFilter, searchQuery]);

  // Dynamically calculate score tier counts for top Summary Dashboard (filtered dynamically by selected Department)
  const scoreCounts = useMemo(() => {
    let tier91_100 = 0;
    let tier81_90 = 0;
    let tier71_80 = 0;
    let tier51_70 = 0;
    let tier0_50 = 0;

    const filteredForDept = employeesData.filter(e => {
      if (selectedDepartmentFilter === 'all') return true;
      return e.department === selectedDepartmentFilter;
    });

    filteredForDept.forEach(e => {
      if (e.competencyScore >= 91) tier91_100++;
      else if (e.competencyScore >= 81) tier81_90++;
      else if (e.competencyScore >= 71) tier71_80++;
      else if (e.competencyScore >= 51) tier51_70++;
      else tier0_50++;
    });

    const total = filteredForDept.length;

    return {
      total,
      tier91_100,
      tier81_90,
      tier71_80,
      tier51_70,
      tier0_50,
      pct91_100: total > 0 ? Math.round((tier91_100 / total) * 100) : 0,
      pct81_90: total > 0 ? Math.round((tier81_90 / total) * 100) : 0,
      pct71_80: total > 0 ? Math.round((tier71_80 / total) * 100) : 0,
      pct51_70: total > 0 ? Math.round((tier51_70 / total) * 100) : 0,
      pct0_50: total > 0 ? Math.round((tier0_50 / total) * 100) : 0,
    };
  }, [employeesData, selectedDepartmentFilter]);

  // Dynamically calculate department success & headcount stats
  const departmentAnalytics = useMemo(() => {
    const depts: Record<DepartmentType, {
      name: DepartmentType;
      icon: any;
      count: number;
      totalScore: number;
      avgScore: number;
      promotable: number;
      successful: number;
      needsImprovement: number;
    }> = {
      'Mağaza Yönetimi': { name: 'Mağaza Yönetimi', icon: Store, count: 0, totalScore: 0, avgScore: 0, promotable: 0, successful: 0, needsImprovement: 0 },
      'Kasa & Operasyon': { name: 'Kasa & Operasyon', icon: ShoppingCart, count: 0, totalScore: 0, avgScore: 0, promotable: 0, successful: 0, needsImprovement: 0 },
      'Reyon & Teşhir': { name: 'Reyon & Teşhir', icon: Package, count: 0, totalScore: 0, avgScore: 0, promotable: 0, successful: 0, needsImprovement: 0 },
      'Lojistik & Depo': { name: 'Lojistik & Depo', icon: Truck, count: 0, totalScore: 0, avgScore: 0, promotable: 0, successful: 0, needsImprovement: 0 },
      'Taze Gıda & Şarküteri': { name: 'Taze Gıda & Şarküteri', icon: Apple, count: 0, totalScore: 0, avgScore: 0, promotable: 0, successful: 0, needsImprovement: 0 },
      'Merkez & İK': { name: 'Merkez & İK', icon: BriefcaseBusiness, count: 0, totalScore: 0, avgScore: 0, promotable: 0, successful: 0, needsImprovement: 0 }
    };

    employeesData.forEach(emp => {
      const dept = emp.department || 'Reyon & Teşhir';
      if (depts[dept]) {
        depts[dept].count += 1;
        depts[dept].totalScore += emp.competencyScore;
        if (emp.competencyScore >= 91) depts[dept].promotable += 1;
        else if (emp.competencyScore >= 81) depts[dept].successful += 1;
        else depts[dept].needsImprovement += 1;
      }
    });

    Object.values(depts).forEach(d => {
      d.avgScore = d.count > 0 ? Number((d.totalScore / d.count).toFixed(1)) : 0;
    });

    return Object.values(depts);
  }, [employeesData]);

  const filteredEmployees = useMemo(() => {
    return employeesData.filter(emp => {
      let matchesScore = true;
      if (scoreFilterCategory === '91-100') matchesScore = emp.competencyScore >= 91 && emp.competencyScore <= 100;
      else if (scoreFilterCategory === '81-90') matchesScore = emp.competencyScore >= 81 && emp.competencyScore <= 90;
      else if (scoreFilterCategory === '71-80') matchesScore = emp.competencyScore >= 71 && emp.competencyScore <= 80;
      else if (scoreFilterCategory === '51-70') matchesScore = emp.competencyScore >= 51 && emp.competencyScore <= 70;
      else if (scoreFilterCategory === '0-50') matchesScore = emp.competencyScore <= 50;

      let matchesDept = true;
      if (selectedDepartmentFilter !== 'all') {
        matchesDept = emp.department === selectedDepartmentFilter;
      }

      const matchesSearch = searchQuery === '' || 
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.currentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.recommendedRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesScore && matchesDept && matchesSearch;
    });
  }, [employeesData, scoreFilterCategory, selectedDepartmentFilter, searchQuery]);

  const visibleEmployees = useMemo(() => {
    return filteredEmployees.slice(0, displayLimit);
  }, [filteredEmployees, displayLimit]);

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

  const awardsList = activeEmployee.awards || [];
  const promotionsList = activeEmployee.promotions || [];
  const warningsList = activeEmployee.warnings || [];
  const penaltiesList = activeEmployee.penalties || [];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#0B2A4A] text-white p-6 sm:p-8 rounded-3xl border border-[#087F96]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-bold font-mono">
            <BrainCircuit className="w-4 h-4 text-emerald-400" />
            <span>İK KARAR DESTEK & AKILLI KARİYER PLANLAMA MOTORU</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">Çalışan Özgeçmiş, Deneyim ve Eğitim Karnesi</h2>
          <p className="text-xs sm:text-sm text-gray-200 font-light max-w-3xl leading-relaxed">
            Eğitim özet kartlarına ve departman analiz butonlarına tıklayarak <strong>1000 kişilik organizasyonda hangi departmanda kaç kişinin ne durumda olduğunu</strong>, eğitmen ve kurum detaylarını, ödülleri ve sicil durumlarını inceleyebilirsiniz.
          </p>
        </div>

        {/* PDF & REPORT DOWNLOAD BUTTONS */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch gap-2.5 shrink-0">
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.print();
            }}
            className="px-5 py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-2xl text-xs shadow-lg transition-all flex items-center justify-center space-x-2 border border-white/20 whitespace-nowrap"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>📄 PDF Karnesini İndir / Yazdır</span>
          </button>

          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(`PERAKENDE KARİYER AKADEMİSİ — RESMİ ÇALIŞAN ÖZGEÇMİŞ, DENEYİM VE EĞİTİM KARNESİ\n--------------------------------------------------------------------------------\nAday / Çalışan: ${activeEmployee.name}\nDepartman: ${activeEmployee.department}\nMevcut Pozisyon: ${activeEmployee.currentRole} (${activeEmployee.city})\nİşe Başlangıç Tarihi: ${activeEmployee.startDate}\nMevcut Şirket Kıdemi: ${activeEmployee.tenure}\nÖnerilen Hedef Pozisyon: ${activeEmployee.recommendedRole} (%${activeEmployee.matchPercentage} Uyum)\nYetkinlik Puanı: ${activeEmployee.competencyScore} / 100\n\n================================================================================\n1. ÖDÜLLER VE PLAKETLER (${awardsList.length} ADET)\n================================================================================\n${awardsList.length > 0 ? awardsList.map(a => `- ${a.title} (${a.category}) | ${a.givenDate} | ${a.organization}`).join('\n') : 'Kayıtlı Ödül/Plaket Bulunmamaktadır'}\n\n================================================================================\n2. TERFİ GEÇMİŞİ (${promotionsList.length} ADET)\n================================================================================\n${promotionsList.length > 0 ? promotionsList.map(p => `- ${p.fromRole} -> ${p.toRole} | ${p.promotionDate} | Onay: ${p.approvedBy}`).join('\n') : 'Henüz iç terfi kaydı bulunmamaktadır'}\n\n================================================================================\n3. UYARILAR VE İKAZLAR (${warningsList.length} ADET)\n================================================================================\n${warningsList.length > 0 ? warningsList.map(w => `- ${w.type} (${w.issueDate}): ${w.reason} | Durum: ${w.status}`).join('\n') : 'Sicili tamamen temizdir (0 Uyarı)'}\n\n================================================================================\n4. CEZALAR VE TUTANAKLAR (${penaltiesList.length} ADET)\n================================================================================\n${penaltiesList.length > 0 ? penaltiesList.map(p => `- ${p.type} (${p.issueDate}): ${p.reason}`).join('\n') : 'Tutanak Sayısı: 0 Adet (Sicili %100 Temizdir)'}\n`)}`}
            download={`${activeEmployee.name.replace(/\s+/g, '_')}_Ozgecmis_Deneyim_Egitim_Karnesi.txt`}
            className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs transition-all flex items-center justify-center space-x-1.5 border border-white/15 whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Rapor İndir</span>
          </a>
        </div>
      </div>

      {/* TOP SUMMARY DASHBOARD KPI BANNER */}
      <div className="bg-gradient-to-r from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-[#087F96]/40 space-y-6">
        
        {/* SECTION 1: PUAN SEVİYESİ KPI METRİKLERİ */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/15 pb-3">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-amber-300" />
              <h3 className="font-extrabold text-sm text-white">
                Çalışan Performans & Terfi Özet Dashboard 
                {selectedDepartmentFilter !== 'all' && (
                  <span className="text-amber-300 ml-2">— {selectedDepartmentFilter} ({scoreCounts.total} Personel)</span>
                )}
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
              {selectedDepartmentFilter === 'all' ? 'Canlı 1.000 Personel Analizi ⚡' : `Canlı ${selectedDepartmentFilter} (${scoreCounts.total} Personel) ⚡`}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            
            <div
              onClick={() => { setScoreFilterCategory('all'); setSelectedDepartmentFilter('all'); }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center group hover:scale-105 ${
                scoreFilterCategory === 'all' && selectedDepartmentFilter === 'all'
                  ? 'bg-white text-[#0B2A4A] border-white shadow-lg font-black'
                  : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">Toplam Personel</div>
              <div className="text-2xl font-black font-mono mt-1">{scoreCounts.total}</div>
              <div className="text-[9px] font-bold mt-1 text-emerald-400">Tüm Kadro →</div>
            </div>

            <div
              onClick={() => setScoreFilterCategory('91-100')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center group hover:scale-105 ${
                scoreFilterCategory === '91-100'
                  ? 'bg-emerald-500 text-white border-emerald-300 shadow-lg font-black'
                  : 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/40 text-emerald-200'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Terfi Edebilir 🟢</div>
              <div className="text-2xl font-black font-mono text-emerald-300 mt-1">{scoreCounts.tier91_100} Kişi</div>
              <div className="text-[9px] font-bold mt-1 text-emerald-200">%{scoreCounts.pct91_100} Lider Adayı →</div>
            </div>

            <div
              onClick={() => setScoreFilterCategory('81-90')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center group hover:scale-105 ${
                scoreFilterCategory === '81-90'
                  ? 'bg-blue-600 text-white border-blue-300 shadow-lg font-black'
                  : 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/40 text-blue-200'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-100">Başarılı 🔵</div>
              <div className="text-2xl font-black font-mono text-blue-300 mt-1">{scoreCounts.tier81_90} Kişi</div>
              <div className="text-[9px] font-bold mt-1 text-blue-200">%{scoreCounts.pct81_90} Yüksek Performans →</div>
            </div>

            <div
              onClick={() => setScoreFilterCategory('71-80')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center group hover:scale-105 ${
                scoreFilterCategory === '71-80'
                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg font-black'
                  : 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/40 text-amber-200'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-100">Geliştirilebilir 🟡</div>
              <div className="text-2xl font-black font-mono text-amber-300 mt-1">{scoreCounts.tier71_80} Kişi</div>
              <div className="text-[9px] font-bold mt-1 text-amber-200">%{scoreCounts.pct71_80} Eğitime Yönlendir →</div>
            </div>

            <div
              onClick={() => setScoreFilterCategory('51-70')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center group hover:scale-105 ${
                scoreFilterCategory === '51-70'
                  ? 'bg-orange-500 text-white border-orange-300 shadow-lg font-black'
                  : 'bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/40 text-orange-200'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-orange-100">Orta Performans 🟠</div>
              <div className="text-2xl font-black font-mono text-orange-300 mt-1">{scoreCounts.tier51_70} Kişi</div>
              <div className="text-[9px] font-bold mt-1 text-orange-200">%{scoreCounts.pct51_70} Takipte →</div>
            </div>

            <div
              onClick={() => setScoreFilterCategory('0-50')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center group hover:scale-105 ${
                scoreFilterCategory === '0-50'
                  ? 'bg-rose-600 text-white border-rose-300 shadow-lg font-black'
                  : 'bg-rose-500/20 hover:bg-rose-500/30 border-rose-500/40 text-rose-200'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-rose-100">Zayıf Performans 🔴</div>
              <div className="text-2xl font-black font-mono text-rose-300 mt-1">{scoreCounts.tier0_50} Kişi</div>
              <div className="text-[9px] font-bold mt-1 text-rose-200">%{scoreCounts.pct0_50} İkaz / Mentörlük →</div>
            </div>

          </div>
        </div>

        {/* SECTION 2: DEPARTMAN BAZLI BAŞARI & KİŞİ SAYISI KARNESİ (DEPARTMENT DASHBOARD) */}
        <div className="space-y-3 pt-2 border-t border-white/15">
          <div className="flex items-center justify-between">
            <h4 className="font-black text-xs uppercase tracking-wider text-amber-300 flex items-center space-x-2">
              <Building className="w-4 h-4 text-amber-300" />
              <span>Departman Bazlı Başarı Karnesi (Filtrelemek İçin Tıklayın)</span>
            </h4>
            <span className="text-[10px] font-mono text-gray-300">6 Departman Analizi</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {departmentAnalytics.map((dept) => {
              const IconComp = dept.icon;
              const isDeptSelected = selectedDepartmentFilter === dept.name;
              return (
                <div
                  key={dept.name}
                  onClick={() => {
                    if (isDeptSelected) setSelectedDepartmentFilter('all');
                    else setSelectedDepartmentFilter(dept.name);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 group hover:scale-105 ${
                    isDeptSelected
                      ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-xl font-extrabold'
                      : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="p-1.5 rounded-xl bg-white/15 text-amber-300 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                      isDeptSelected ? 'bg-slate-900 text-amber-300' : 'bg-white/15 text-emerald-300'
                    }`}>
                      Ort %{dept.avgScore}
                    </span>
                  </div>

                  <div>
                    <h5 className="font-extrabold text-xs truncate">{dept.name}</h5>
                    <div className="text-[11px] font-black font-mono mt-0.5">
                      {dept.count} Çalışan
                    </div>
                  </div>

                  <div className={`text-[9px] font-mono font-bold space-y-0.5 pt-1.5 border-t ${
                    isDeptSelected ? 'border-slate-950/20 text-slate-900' : 'border-white/10 text-gray-300'
                  }`}>
                    <div className="flex justify-between">
                      <span>🟢 Terfiye Hazır:</span>
                      <strong className={isDeptSelected ? 'text-slate-950' : 'text-emerald-300'}>{dept.promotable}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>🔵 Başarılı:</span>
                      <strong className={isDeptSelected ? 'text-slate-950' : 'text-blue-200'}>{dept.successful}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>🟡 Gelişime Açık:</span>
                      <strong className={isDeptSelected ? 'text-slate-950' : 'text-amber-200'}>{dept.needsImprovement}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Filter and Employee Selection Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="1.000 çalışan arasında adı, pozisyon veya departman ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#087F96] text-[#0B2A4A]"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 text-xs w-full md:w-auto">
          {/* DEPARTMAN FİLTRESİ */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-bold whitespace-nowrap">Departman:</span>
            <select
              value={selectedDepartmentFilter}
              onChange={(e) => setSelectedDepartmentFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-extrabold text-[#0B2A4A] focus:outline-none focus:ring-2 focus:ring-[#087F96]"
            >
              <option value="all">Tüm Departmanlar (1.000 Personel)</option>
              <option value="Mağaza Yönetimi">Mağaza Yönetimi ({departmentAnalytics.find(d => d.name === 'Mağaza Yönetimi')?.count})</option>
              <option value="Kasa & Operasyon">Kasa & Operasyon ({departmentAnalytics.find(d => d.name === 'Kasa & Operasyon')?.count})</option>
              <option value="Reyon & Teşhir">Reyon & Teşhir ({departmentAnalytics.find(d => d.name === 'Reyon & Teşhir')?.count})</option>
              <option value="Lojistik & Depo">Lojistik & Depo ({departmentAnalytics.find(d => d.name === 'Lojistik & Depo')?.count})</option>
              <option value="Taze Gıda & Şarküteri">Taze Gıda & Şarküteri ({departmentAnalytics.find(d => d.name === 'Taze Gıda & Şarküteri')?.count})</option>
              <option value="Merkez & İK">Merkez & İK ({departmentAnalytics.find(d => d.name === 'Merkez & İK')?.count})</option>
            </select>
          </div>

          {/* PUAN SEVİYESİ FİLTRESİ */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-bold whitespace-nowrap">Puan Seviyesi:</span>
            <select
              value={scoreFilterCategory}
              onChange={(e) => setScoreFilterCategory(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-extrabold text-[#0B2A4A] focus:outline-none focus:ring-2 focus:ring-[#087F96]"
            >
              <option value="all">Tüm Puan Seviyeleri (0-100 Puan)</option>
              <option value="91-100">Terfi Edebilir (91 - 100 Puan) 🟢 — {scoreCounts.tier91_100} Personel</option>
              <option value="81-90">Başarılı (81 - 90 Puan) 🔵 — {scoreCounts.tier81_90} Personel</option>
              <option value="71-80">Geliştirilebilir (71 - 80 Puan) 🟡 — {scoreCounts.tier71_80} Personel</option>
              <option value="51-70">Orta Performans (51 - 70 Puan) 🟠 — {scoreCounts.tier51_70} Personel</option>
              <option value="0-50">Zayıf Performans (0 - 50 Puan) 🔴 — {scoreCounts.tier0_50} Personel</option>
            </select>
          </div>
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
              <span>Puanına Göre Çalışanlar ({filteredEmployees.length} / {employeesData.length})</span>
            </h3>
            <span className="text-[10px] text-gray-400 font-mono">Puana Göre Sıralı</span>
          </div>

          <div className="space-y-3 max-h-[900px] overflow-y-auto pr-1">
            {visibleEmployees.map((emp) => {
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
                      <div className="flex items-center space-x-1.5">
                        <h4 className="font-bold text-xs text-[#0B2A4A]">{emp.name}</h4>
                        <span className="text-[9px] font-mono font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                          {emp.department}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500">{emp.currentRole}</p>
                      <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                        Öneri: {emp.recommendedRole}
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <div className={`px-2.5 py-1 rounded-lg font-mono text-xs font-black shadow-xs ${
                      emp.competencyScore >= 91 ? 'bg-emerald-600 text-white' :
                      emp.competencyScore >= 81 ? 'bg-blue-600 text-white' :
                      emp.competencyScore >= 71 ? 'bg-amber-500 text-slate-950' :
                      emp.competencyScore >= 51 ? 'bg-orange-500 text-white' : 'bg-rose-600 text-white'
                    }`}>
                      {emp.competencyScore} Puan
                    </div>
                    <div className="text-[9px] font-mono font-extrabold text-gray-600">
                      {emp.competencyScore >= 91 ? 'Terfi Edebilir 🟢' :
                       emp.competencyScore >= 81 ? 'Başarılı 🔵' :
                       emp.competencyScore >= 71 ? 'Geliştirilebilir 🟡' :
                       emp.competencyScore >= 51 ? 'Orta Performans 🟠' : 'Zayıf Performans 🔴'}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* LOAD MORE BUTTON FOR 1000 EMPLOYEES */}
            {filteredEmployees.length > displayLimit && (
              <button
                onClick={() => setDisplayLimit(prev => prev + 50)}
                className="w-full py-3 bg-[#0B2A4A] hover:bg-[#061B33] text-white font-extrabold rounded-2xl text-xs shadow-md transition-all flex items-center justify-center space-x-2 border border-[#087F96]/30 cursor-pointer mt-2"
              >
                <span>Daha Fazla Çalışan Göster (+50 Personel)</span>
                <span className="text-[10px] opacity-75 font-mono">({displayLimit} / {filteredEmployees.length} Gösteriliyor)</span>
              </button>
            )}
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
                      +{activeEmployee.competencyScore}p Yetkinlik Skoru
                    </span>
                    <span className="px-2.5 py-0.5 bg-blue-100 text-blue-900 text-[10px] font-extrabold rounded-full font-mono">
                      {activeEmployee.department}
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

          {/* 4 SEPARATE SPECIAL LISTS (ÖDÜLLER, PLAKETLER, TERFİLER, UYARILAR, CEZALAR & TUTANAKLAR) */}
          <div className="space-y-6">
            <h3 className="font-extrabold text-lg text-[#0B2A4A] flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Resmi Sicil, Ödül, Terfi ve Disiplin Karnesi</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 1. ÖDÜLLER VE PLAKETLER */}
              <div className="bg-amber-50/60 border-2 border-amber-300 rounded-3xl p-5 space-y-3 shadow-sm">
                <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                  <h4 className="font-black text-xs text-amber-900 flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    <span>1. Ödüller ve Plaketler ({awardsList.length})</span>
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                    Başarı Karnesi
                  </span>
                </div>

                {awardsList.length > 0 ? (
                  <div className="space-y-2.5">
                    {awardsList.map((aw, idx) => (
                      <div key={idx} className="p-3.5 bg-white border border-amber-200 rounded-2xl space-y-1 shadow-xs">
                        <div className="flex items-center justify-between">
                          <h5 className="font-extrabold text-xs text-[#0B2A4A]">{aw.title}</h5>
                          <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                            {aw.category}
                          </span>
                        </div>
                        <div className="text-[11px] text-gray-600">{aw.reason}</div>
                        <div className="text-[9px] font-mono text-gray-400 font-bold pt-1 border-t border-gray-100">
                          Tarih: {aw.givenDate} • {aw.organization}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-white/80 border border-amber-200 rounded-2xl text-center text-xs text-amber-800 italic">
                    Henüz kayıtlı ödül veya plaket bulunmamaktadır.
                  </div>
                )}
              </div>

              {/* 2. TERFİ GEÇMİŞİ */}
              <div className="bg-emerald-50/60 border-2 border-emerald-300 rounded-3xl p-5 space-y-3 shadow-sm">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                  <h4 className="font-black text-xs text-emerald-900 flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>2. Terfi Geçmişi ve Unvan Yükselmeleri ({promotionsList.length})</span>
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    Kariyer Yolu
                  </span>
                </div>

                {promotionsList.length > 0 ? (
                  <div className="space-y-2.5">
                    {promotionsList.map((pr, idx) => (
                      <div key={idx} className="p-3.5 bg-white border border-emerald-200 rounded-2xl space-y-1 shadow-xs">
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="font-bold text-gray-500">{pr.fromRole}</span>
                          <ChevronRight className="w-4 h-4 text-emerald-600" />
                          <span className="font-extrabold text-emerald-800">{pr.toRole}</span>
                        </div>
                        <p className="text-[11px] text-gray-600 leading-snug">{pr.note}</p>
                        <div className="text-[9px] font-mono text-emerald-700 font-bold pt-1 border-t border-gray-100">
                          Terfi Tarihi: {pr.promotionDate} • Onay: {pr.approvedBy}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-white/80 border border-emerald-200 rounded-2xl text-center text-xs text-emerald-800 italic">
                    Henüz iç terfi kaydı işlenmemiştir.
                  </div>
                )}
              </div>

              {/* 3. UYARILAR VE İKAZLAR */}
              <div className="bg-orange-50/60 border-2 border-orange-300 rounded-3xl p-5 space-y-3 shadow-sm">
                <div className="flex items-center justify-between border-b border-orange-200 pb-2">
                  <h4 className="font-black text-xs text-orange-900 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    <span>3. Sözlü ve Yazılı Uyarılar / İkazlar ({warningsList.length})</span>
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-md">
                    İkaz Kaydı
                  </span>
                </div>

                {warningsList.length > 0 ? (
                  <div className="space-y-2.5">
                    {warningsList.map((wr, idx) => (
                      <div key={idx} className="p-3.5 bg-white border border-orange-200 rounded-2xl space-y-1 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs text-orange-950">{wr.type}</span>
                          <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                            {wr.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-700">{wr.reason}</p>
                        <div className="text-[9px] font-mono text-gray-500 font-bold pt-1 border-t border-gray-100">
                          Düzenlenme: {wr.issueDate} • Düzenleyen: {wr.issuedBy}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-white/80 border border-emerald-300 rounded-2xl text-center text-xs text-emerald-800 font-bold flex items-center justify-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Resmi sicili tamamen temizdir. Kayıtlı uyarı bulunmamaktadır.</span>
                  </div>
                )}
              </div>

              {/* 4. CEZALAR VE TUTANAKLAR */}
              <div className="bg-rose-50/60 border-2 border-rose-300 rounded-3xl p-5 space-y-3 shadow-sm">
                <div className="flex items-center justify-between border-b border-rose-200 pb-2">
                  <h4 className="font-black text-xs text-rose-900 flex items-center space-x-2">
                    <FileWarning className="w-4 h-4 text-rose-600" />
                    <span>4. Cezalar ve Tutanak Kayıtları ({penaltiesList.length})</span>
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                    Disiplin Sicili
                  </span>
                </div>

                {penaltiesList.length > 0 ? (
                  <div className="space-y-2.5">
                    {penaltiesList.map((pn, idx) => (
                      <div key={idx} className="p-3.5 bg-white border border-rose-200 rounded-2xl space-y-1 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs text-rose-950">{pn.type}</span>
                          <span className="text-[9px] font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                            {pn.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-700">{pn.reason}</p>
                        <div className="text-[9px] font-mono text-gray-500 font-bold pt-1 border-t border-gray-100">
                          Tarih: {pn.issueDate} • Veren Birim: {pn.issuedBy}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-white/80 border border-emerald-300 rounded-2xl text-center text-xs text-emerald-800 font-bold flex items-center justify-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Sayılan Tutanak: 0 Adet (Disiplin sicili tamamen temizdir).</span>
                  </div>
                )}
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
