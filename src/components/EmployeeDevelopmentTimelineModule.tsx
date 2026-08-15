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
  Building,
  History,
  CheckSquare,
  Layers,
  Printer,
  Download,
  Trophy,
  AlertCircle,
  FileWarning,
  Store,
  ShoppingCart,
  Package,
  Truck,
  Apple,
  BriefcaseBusiness,
  Crown,
  Milestone,
  Flag,
  ArrowUpRight,
  Check,
  GitFork,
  ArrowDown
} from 'lucide-react';
import { 
  EmployeeCareerRecord, 
  DepartmentType, 
  DEPARTMENTS_CONFIG, 
  MAIN_DEPARTMENT_GROUPS 
} from './EmployeeCareerPlanningModule';

function generate1000TimelineEmployeesData(): EmployeeCareerRecord[] {
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

    let score = 85;
    if (i < 180) score = 91 + (i % 9);
    else if (i < 500) score = 81 + (i % 10);
    else if (i < 780) score = 71 + (i % 10);
    else if (i < 930) score = 51 + (i % 20);
    const deptConfig = DEPARTMENTS_CONFIG[i % DEPARTMENTS_CONFIG.length];
    const dept = deptConfig.name;

    const match = Math.min(99, Math.max(45, score + (i % 5) - 2));
    const avatar = avatars[i % avatars.length];
    const city = cities[i % cities.length];
    
    // Mathematically consistent startYear and tenure calculation
    const startYear = 2021 + (i % 4); // 2021, 2022, 2023, 2024
    const tenureYears = 2026 - startYear;
    const tenureMonths = (i * 3) % 12;
    const tenure = `${tenureYears} Yıl ${tenureMonths} Ay`;
    const startDate = `${(i % 28) + 1} ${['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylülü', 'Ekim', 'Kasım', 'Aralık'][i % 12]} ${startYear}`;

    list.push({
      id: `emp_${i + 1}`,
      name,
      avatar,
      department: dept,
      currentRole: deptConfig.role,
      recommendedRole: deptConfig.target,
      matchPercentage: match,
      competencyScore: score,
      city,
      experienceYears: tenureYears + 2,
      startDate,
      tenure,
      previousExperiences: [
        { companyName: 'BİM A.Ş. / Migros', role: 'Saha Görevlisi', duration: '2 Yıl', yearsRange: `${startYear - 2}–${startYear}` }
      ],
      priorTrainings: [
        { title: 'Temel Perakendecilik Sertifikası', institution: 'MEB Sertifika', instructorName: 'Seda Yılmaz', companyWhereTaken: 'Harici Kurum', durationHours: 24, year: `${startYear - 2}` }
      ],
      completedTrainings: [
        { courseTitle: `${deptConfig.role} Master Sertifika Programı`, duration: '16 Saat', durationHours: 16, completedDate: '10 Mayıs 2026', instructorName: 'Prof. Dr. Ahmet Çelik', institution: 'Perakende Kariyer Akademisi', companyWhereTaken: 'Mevcut Şirket', score, gradeStatus: score >= 90 ? 'Üstün Başarı' : score >= 80 ? 'Pek İyi' : 'Başarılı', certificateId: `PKA-2026-${i + 1}-001` }
      ],
      awards: score >= 80 ? [
        { title: `2025 Yılı ${city} Perakende Başarı Ödülü`, category: 'Ödül', givenDate: '15 Aralık 2025', organization: 'Perakende Kariyer Akademisi', reason: `%${score} Üstün Başarı Skoru` }
      ] : [],
      promotions: score >= 80 ? [
        { fromRole: 'Stajyer / Görevli', toRole: deptConfig.role, promotionDate: `15 Mart ${startYear + 1}`, approvedBy: 'Ahmet Çelik (İK Direktörü)', note: 'Yüksek başarı puanı ile terfi.' }
      ] : [],
      warnings: [],
      penalties: [],
      evaluations: {
        managerReview: { author: 'Murat Yıldırım', role: 'Mağaza Müdürü', rating: score / 20, comment: `${name} yetkinlik skoru %${score} seviyesindedir.`, date: '10 Haziran 2026' },
        subordinateReview: { author: 'Selin Demir', role: 'Ekip Çalışanı', rating: 4.5, comment: 'Vardiyada uyumlu ve destekçi.', date: '02 Haziran 2026' },
        hrReview: { author: 'Ahmet Çelik', role: 'İK Direktörü', rating: 4.8, comment: `${name} İK Kariyer haritasında ${score} puanla yer almaktadır.`, date: '14 Haziran 2026' }
      },
      swot: {
        strengths: [`%${score} Yetkinlik Puanı`, 'Disiplinli vardiya takibi'],
        weaknesses: ['İleri Finansal Analitik'],
        opportunities: [`${deptConfig.target} pozisyon terfisi`],
        threats: ['Yoğun vardiya temposu']
      },
      developmentAreas: ['Saha İletişimi ve Bütçe Yönetimi'],
      careerAdvice: [
        { phase: '1. Ay (Ağustos 2026)', action: 'Terfi ve gelişim modülleri başlanacak.', targetDate: '15 Ağustos 2026' }
      ],
      hierarchy: {
        ceoChain: [
          {
            id: 'ceo_1',
            name: 'Prof. Dr. Ahmet Çelik',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
            role: 'Genel Müdür & CEO (Chief Executive Officer)',
            department: 'Genel Merkez Yönetim Kurulu',
            levelTitle: '👑 1. KADEME: GENEL MÜDÜR & CEO',
            isCeo: true
          },
          {
            id: `gmy_${i}`,
            name: i === 0 ? 'Fatih Şimşek' : i % 2 === 0 ? 'Fatih Şimşek' : 'Dr. Mehmet Yılmaz',
            avatar: avatars[(i + 6) % avatars.length],
            role: i === 0 ? 'Taze Gıda & Saha Operasyonları Direktörü (GMY)' : 'Operasyon & Satış Direktörü (GMY)',
            department: 'Genel Merkez İcra Kurulu',
            levelTitle: '👔 2. KADEME: DİREKTÖR / GENEL MÜDÜR YRD.'
          },
          {
            id: `bm_${i}`,
            name: i === 0 ? 'Murat Yıldırım' : i % 3 === 0 ? 'Murat Yıldırım' : i % 3 === 1 ? 'Hakan Arslan' : 'Volkan Kaya',
            avatar: avatars[(i + 3) % avatars.length],
            role: i === 0 ? 'Marmara Bölge Operasyon Müdürü' : 'Bölge Operasyon Müdürü (Area Manager)',
            department: deptConfig.groupName,
            levelTitle: '🏬 3. KADEME: BÖLGE MÜDÜRÜ'
          },
          {
            id: `mgr_${i}`,
            name: i === 0 ? 'Seda Yılmaz' : i % 3 === 0 ? 'Seda Yılmaz' : i % 3 === 1 ? 'Gamze Öztürk' : 'Caner Şahin',
            avatar: avatars[(i + 4) % avatars.length],
            role: i === 0 ? 'Taze Gıda & Manav Mağaza Müdürü' : 'Mağaza Müdürü / Birim Amiri',
            department: deptConfig.name,
            levelTitle: '🏪 4. KADEME: DOĞRUDAN MAĞAZA AMİRİ'
          }
        ],
        manager: {
          id: `mgr_${i}`,
          name: i === 0 ? 'Seda Yılmaz' : i % 3 === 0 ? 'Seda Yılmaz' : i % 3 === 1 ? 'Gamze Öztürk' : 'Caner Şahin',
          avatar: avatars[(i + 4) % avatars.length],
          role: i === 0 ? 'Taze Gıda & Manav Mağaza Müdürü' : 'Mağaza Müdürü / Birim Amiri',
          department: deptConfig.name,
          levelTitle: '🏪 DOĞRUDAN MAĞAZA AMİRİ'
        },
        subordinates: i === 0 ? [
          { id: 'sub_0_1', name: 'Elif Kaya', avatar: avatars[1], role: 'Manav Reyon Destek Elemanı', department: dept },
          { id: 'sub_0_2', name: 'Caner Arslan', avatar: avatars[2], role: 'Taze Gıda Kasa Operatörü', department: dept },
          { id: 'sub_0_3', name: 'Tuğba Demir', avatar: avatars[4], role: 'Meyve Sebze Reyon Stajyeri', department: dept },
          { id: 'sub_0_4', name: 'Kadir Öztürk', avatar: avatars[5], role: 'Reyon Mal Kabul Görevlisi', department: dept }
        ] : [
          {
            id: `sub_${i}_1`,
            name: `${femaleNames[(i * 3 + 1) % femaleNames.length]} ${lastNames[(i * 5 + 1) % lastNames.length]}`,
            avatar: avatars[(i + 1) % avatars.length],
            role: 'Reyon Satış Elemanı',
            department: dept
          },
          {
            id: `sub_${i}_2`,
            name: `${maleNames[(i * 3 + 2) % maleNames.length]} ${lastNames[(i * 5 + 2) % lastNames.length]}`,
            avatar: avatars[(i + 2) % avatars.length],
            role: 'Kasiyer & Kasa Görevlisi',
            department: dept
          },
          {
            id: `sub_${i}_3`,
            name: `${femaleNames[(i * 3 + 3) % femaleNames.length]} ${lastNames[(i * 5 + 3) % lastNames.length]}`,
            avatar: avatars[(i + 4) % avatars.length],
            role: 'Stajyer / Saha Destek',
            department: dept
          },
          {
            id: `sub_${i}_4`,
            name: `${maleNames[(i * 3 + 4) % maleNames.length]} ${lastNames[(i * 5 + 4) % lastNames.length]}`,
            avatar: avatars[(i + 5) % avatars.length],
            role: 'Kıdemli Operasyon Elemanı',
            department: dept
          }
        ]
      },
      personalCareerGoal: {
        targetRole: i % 3 === 0 
          ? (i % 2 === 0 ? 'Bölge Operasyon Müdürü' : 'Satınalma & Kategori Yöneticisi')
          : deptConfig.target,
        targetDate: '1. Çeyrek 2027',
        description: i % 3 === 0
          ? `Kariyerimi Planlıyorum Modülü: 2027 hedeflerim doğrultusunda ${i % 2 === 0 ? 'Bölge Operasyon Müdürü' : 'Satınalma & Kategori Yöneticisi'} pozisyonuna yükselmeyi planlıyorum.`
          : `Kariyerimi Planlıyorum Modülü: 2027 hedeflerim doğrultusunda ${deptConfig.target} pozisyonuna terfi etmek ve Perakende Akademi liderlik sertifikasyonunu %90+ puanla tamamlamak.`,
        savedAt: `${(i % 25) + 1} Ağustos 2026`,
        status: score >= 90 ? 'Hedefe Ulaşıldı' : score >= 80 ? 'Aktif Planlama' : 'Onay Bekliyor'
      }
    });
  }

  return list;
}

const INITIAL_TIMELINE_EMPLOYEES = generate1000TimelineEmployeesData();

export default function EmployeeDevelopmentTimelineModule() {
  const [employeesData] = useState<EmployeeCareerRecord[]>(INITIAL_TIMELINE_EMPLOYEES);
  const [selectedEmpId, setSelectedEmpId] = useState<string>(INITIAL_TIMELINE_EMPLOYEES[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');
  const [displayLimit, setDisplayLimit] = useState<number>(50);

  const filteredEmployees = useMemo(() => {
    return employeesData.filter(emp => {
      let matchesDept = true;
      if (selectedDeptFilter !== 'all') {
        matchesDept = emp.department === selectedDeptFilter;
      }
      const matchesSearch = searchQuery === '' || 
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.currentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.recommendedRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDept && matchesSearch;
    });
  }, [employeesData, selectedDeptFilter, searchQuery]);

  const visibleEmployees = useMemo(() => {
    return filteredEmployees.slice(0, displayLimit);
  }, [filteredEmployees, displayLimit]);

  const activeEmployee = useMemo(() => {
    return employeesData.find(e => e.id === selectedEmpId) || employeesData[0];
  }, [employeesData, selectedEmpId]);

  // Construct Chronological Career Timeline Milestones for Active Employee
  const careerTimelineMilestones = useMemo(() => {
    const startYear = parseInt(activeEmployee.startDate.split(' ').pop() || '2023', 10);
    const score = activeEmployee.competencyScore;

    return [
      {
        year: `${startYear - 2}`,
        date: `Eylül ${startYear - 2}`,
        title: 'Perakendeciliğe Giriş & Stajyerlik',
        role: 'Stajyer / Saha Görevlisi',
        company: 'BİM A.Ş. / Harici İşletme',
        score: Math.max(50, score - 30),
        status: 'completed',
        statusLabel: 'Tamamlandı ✅',
        description: 'Saha operasyonları, ürün etiketleme ve müşteri karşılama standartlarını deneyimledi.',
        badges: ['Harici Tecrübe', 'Temel Saha Eğitimi']
      },
      {
        year: `${startYear - 1}`,
        date: `Ocak ${startYear - 1}`,
        title: 'Operasyonel Uzmanlık & İlk Kıdem',
        role: 'Saha Görevlisi / Kasiyer',
        company: 'Migros / Retail Co.',
        score: Math.max(65, score - 18),
        status: 'completed',
        statusLabel: 'Tamamlandı ✅',
        description: 'MEB onaylı Müşteri İlişkileri ve Kasa Sistemleri sertifikalarını başarıyla tamamladı.',
        badges: ['Sertifikalı Katılım', 'Müşteri Memnuniyeti']
      },
      {
        year: `${startYear}`,
        date: activeEmployee.startDate,
        title: 'Perakende Kariyer Akademisi Katılımı',
        role: activeEmployee.currentRole,
        company: 'Mevcut Kurumsal Mağaza',
        score: Math.max(75, score - 8),
        status: 'completed',
        statusLabel: 'Şirkete Giriş 🏢',
        description: `İşe başlama tarihi: ${activeEmployee.startDate}. Mevcut şirket kıdemi: ${activeEmployee.tenure}.`,
        badges: ['Akademi Üyesi', 'Gelişim Karnesi Aktif']
      },
      {
        year: '2026',
        date: 'Ağustos 2026 (Canlı)',
        title: 'Mevcut Pozisyon & Yüksek Başarı Skorlaması',
        role: activeEmployee.currentRole,
        company: `${activeEmployee.department} Birimi`,
        score: activeEmployee.competencyScore,
        status: 'current',
        statusLabel: 'Mevcut Pozisyon 📍 (Canlı)',
        description: `Yetkinlik Skoru: %${activeEmployee.competencyScore} / 100. 360° Değerlendirme Notu: 4.8/5.0.`,
        badges: ['Canlı Yetkinlik Karnesi', activeEmployee.competencyScore >= 90 ? 'Terfiye Hazır 🟢' : 'Başarılı 🔵']
      },
      {
        year: '2027',
        date: '1. Çeyrek 2027 (Hedef)',
        title: 'Hedef Pozisyona Terfi & Yükselme Vizyonu',
        role: activeEmployee.recommendedRole,
        company: 'Mağaza / Bölge Yönetimi',
        score: Math.min(100, activeEmployee.competencyScore + 6),
        status: 'target',
        statusLabel: 'Önerilen Terfi Hedefi 🎯',
        description: `Uyum Oranı: %${activeEmployee.matchPercentage}. 90 Günlük Kariyer Tavsiyeleri ile Terfi Komitesine Hazırlanıyor.`,
        badges: [`%${activeEmployee.matchPercentage} Uyum`, 'Liderlik Pipeline']
      },
      {
        year: '2028+',
        date: '2028 - 2030 Vizyonu',
        title: 'Stratejik Bölge / Direktörlük Vizyonu',
        role: 'Bölge Operasyon Müdürü / Kategori Direktörü',
        company: 'Genel Merkez / Bölge Direktörlüğü',
        score: 98,
        status: 'vision',
        statusLabel: 'Gelecek Kariyer Vizyonu 🚀',
        description: 'P&L Bütçe Analitiği, Kategori Marjı ve Bölge Yönetim Liderliği Vizyonu.',
        badges: ['Stratejik Liderlik', 'Üst Düzey Yönetim']
      }
    ];
  }, [activeEmployee]);

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#0B2A4A] text-white p-6 sm:p-8 rounded-3xl border border-[#087F96]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-bold font-mono">
            <Milestone className="w-4 h-4 text-emerald-400" />
            <span>ÇALIŞAN KRONOLOJİK GELİŞİM KARNESİ & KARİYER HARİTASI</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">Çalışan Kronolojik Kariyer Haritası Grafiği</h2>
          <p className="text-xs sm:text-sm text-gray-200 font-light max-w-3xl leading-relaxed">
            Zaman çizelgesi (timeline) üzerinde çalışanın işe başlangıcından bugüne kadar olan <strong>terfi adımlarını, puan gelişim eğrisini ve gelecek terfi hedeflerini</strong> kronolojik grafik olarak inceleyin.
          </p>
        </div>

        {/* PDF & REPORT BUTTONS */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch gap-2.5 shrink-0">
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.print();
            }}
            className="px-5 py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-2xl text-xs shadow-lg transition-all flex items-center justify-center space-x-2 border border-white/20 whitespace-nowrap cursor-pointer"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>📄 PDF Kariyer Haritasını Yazdır</span>
          </button>

          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(`PERAKENDE KARİYER AKADEMİSİ — KRONOLOJİK ÇALIŞAN GELİŞİM KARNESİ\n--------------------------------------------------------------------------------\nÇalışan Adı: ${activeEmployee.name}\nDepartman: ${activeEmployee.department}\nMevcut Pozisyon: ${activeEmployee.currentRole} (${activeEmployee.city})\nİşe Başlangıç Tarihi: ${activeEmployee.startDate}\nMevcut Şirket Kıdemi: ${activeEmployee.tenure}\nYetkinlik Puanı: ${activeEmployee.competencyScore} / 100\n\n================================================================================\nKRONOLOJİK KARİYER YOLCULUĞU & ADIMLARI\n================================================================================\n1. Gelecek Vizyonu (2028+): Bölge Operasyon Müdürü / Kategori Direktörü (%98 Puan)\n2. Önerilen Hedef (2027): ${activeEmployee.recommendedRole} (%${activeEmployee.matchPercentage} Uyum)\n3. Mevcut Pozisyon (2026): ${activeEmployee.currentRole} (%${activeEmployee.competencyScore} Puan)\n4. Şirkete Giriş (${activeEmployee.startDate}): ${activeEmployee.currentRole}\n5. Geçmiş Tecrübe (2020-2022): Saha Görevlisi / Kasiyer\n`)}`}
            download={`${activeEmployee.name.replace(/\s+/g, '_')}_Kronolojik_Kariyer_Haritasi.txt`}
            className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs transition-all flex items-center justify-center space-x-1.5 border border-white/15 whitespace-nowrap cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Harita Raporu İndir</span>
          </a>
        </div>
      </div>

      {/* Sleek Top Filter & Employee Selector Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="1.000 çalışan arasında hızlı ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#087F96] text-[#0B2A4A]"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 text-xs w-full md:w-auto">
          {/* DEPARTMAN FİLTRESİ */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-bold whitespace-nowrap">Birim:</span>
            <select
              value={selectedDeptFilter}
              onChange={(e) => setSelectedDeptFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-extrabold text-[#0B2A4A] focus:outline-none focus:ring-2 focus:ring-[#087F96]"
            >
              <option value="all">Tüm 26 Departman (1.000 Personel)</option>
              {DEPARTMENTS_CONFIG.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* ACTIVE EMPLOYEE SELECTION DROPDOWN */}
          <div className="flex items-center space-x-2">
            <span className="text-[#087F96] font-extrabold whitespace-nowrap flex items-center space-x-1">
              <UserCheck className="w-4 h-4 text-[#087F96]" />
              <span>Seçili Çalışan:</span>
            </span>
            <select
              value={selectedEmpId}
              onChange={(e) => setSelectedEmpId(e.target.value)}
              className="bg-emerald-50 border-2 border-emerald-400 rounded-xl px-3.5 py-2 font-extrabold text-[#0B2A4A] focus:outline-none focus:ring-2 focus:ring-emerald-500 max-w-xs shadow-xs"
            >
              {filteredEmployees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} — {emp.currentRole} (%{emp.competencyScore}p)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Single Column Full Width Layout for Selected Employee */}
      <div className="space-y-6 w-full">
        
        {/* Active Employee Header Summary Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-md space-y-4 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div className="flex items-center space-x-4">
              <img
                src={activeEmployee.avatar}
                alt={activeEmployee.name}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-[#087F96] shadow-lg flex-shrink-0"
              />
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-2xl font-black text-[#0B2A4A]">{activeEmployee.name}</h3>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full font-mono border border-emerald-300">
                    +{activeEmployee.competencyScore}p Yetkinlik Skoru
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-900 text-xs font-extrabold rounded-full font-mono border border-blue-300">
                    {activeEmployee.department}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  Mevcut Pozisyon: <strong>{activeEmployee.currentRole}</strong> • {activeEmployee.city}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="bg-[#0B2A4A] text-white text-xs font-bold font-mono px-3.5 py-1.5 rounded-xl flex items-center space-x-1.5 shadow-xs">
                    <Calendar className="w-3.5 h-3.5 text-amber-300" />
                    <span>İşe Başlangıç: <strong>{activeEmployee.startDate}</strong></span>
                  </span>
                  <span className="bg-blue-100 text-blue-900 border border-blue-300 text-xs font-bold font-mono px-3.5 py-1.5 rounded-xl">
                    Mevcut Şirket Kıdemi: <strong>{activeEmployee.tenure}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* SIDE-BY-SIDE DUAL GOAL COMPARISON CARDS (ÖNERİLEN VE PLANLANAN KİŞİSEL HEDEF) */}
            {(() => {
              const personalGoalRole = activeEmployee.personalCareerGoal?.targetRole || activeEmployee.recommendedRole;
              const isMatching = personalGoalRole.trim().toLowerCase() === activeEmployee.recommendedRole.trim().toLowerCase();

              return (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
                  
                  {/* 1. ÖNERİLEN TERFİ HEDEFİ (SİSTEM ÖNERİSİ - DAİMA YEŞİL) */}
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 sm:p-5 rounded-2xl shadow-md space-y-1 text-left sm:text-right flex-1 sm:flex-none border border-emerald-400">
                    <div className="text-[10px] font-mono font-black uppercase text-emerald-100 flex items-center justify-start sm:justify-end space-x-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span>ÖNERİLEN TERFİ HEDEFİ</span>
                    </div>
                    <div className="text-sm sm:text-base font-black text-white">{activeEmployee.recommendedRole}</div>
                    <div className="text-xs font-mono font-bold text-amber-300">
                      Uyum Oranı: %{activeEmployee.matchPercentage}
                    </div>
                  </div>

                  {/* 2. PLANLANAN KİŞİSEL HEDEF (UYUMLU İSE YEŞİL, TUTARSIZ İSE KIRMIZI) */}
                  <div className={`p-4 sm:p-5 rounded-2xl shadow-md space-y-1 text-left sm:text-right flex-1 sm:flex-none border ${
                    isMatching
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-emerald-400'
                      : 'bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white border-rose-400 ring-2 ring-rose-300/40'
                  }`}>
                    <div className="text-[10px] font-mono font-black uppercase text-white/90 flex items-center justify-start sm:justify-end space-x-1">
                      <Target className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span>PLANLANAN KİŞİSEL HEDEF</span>
                    </div>
                    <div className="text-sm sm:text-base font-black text-white">{personalGoalRole}</div>
                    <div className="text-xs font-mono font-bold">
                      {isMatching ? (
                        <span className="text-emerald-100 bg-emerald-900/50 px-2.5 py-0.5 rounded-md border border-emerald-300/40 font-black inline-block">
                          Sistemle Uyumlu ✅
                        </span>
                      ) : (
                        <span className="text-white bg-rose-950/70 px-2.5 py-0.5 rounded-md border border-rose-200/50 font-black inline-block">
                          ⚠️ Tutarsızlık Var! (Kırmızı)
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })()}
          </div>

          {/* VISUAL SCORE EVOLUTION PROGRESS BAR GRAPH */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#0B2A4A]">
              <span className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span>Kariyer Yetkinlik Skoru İlerleme Grafiği (Geçmiş ➔ Gelecek Vizyonu)</span>
              </span>
              <span className="font-mono text-[#087F96] font-black">%60p ➔ %{activeEmployee.competencyScore}p ➔ %98p</span>
            </div>

            <div className="h-5 w-full bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200 flex shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 via-[#087F96] via-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000 flex items-center justify-end pr-3 text-[10px] font-mono font-black text-white shadow-md"
                style={{ width: `${Math.min(100, Math.max(20, activeEmployee.competencyScore))}%` }}
              >
                %{activeEmployee.competencyScore} Canlı Puan
              </div>
            </div>

            {(() => {
              const activeStartYear = parseInt(activeEmployee.startDate.split(' ').pop() || '2023', 10);
              return (
                <div className="flex justify-between text-xs font-mono text-gray-500 pt-0.5">
                  <span>{activeStartYear - 2}: Stajyer (%60)</span>
                  <span>{activeStartYear}: Şirkete Giriş (%78)</span>
                  <span className="font-bold text-emerald-700">2026: Mevcut (%{activeEmployee.competencyScore})</span>
                  <span className="font-bold text-blue-700">2027: Hedef Terfi (%{Math.min(100, activeEmployee.competencyScore + 6)})</span>
                  <span>2028+: Vizyon (%98)</span>
                </div>
              );
            })()}
          </div>

          {/* PERSONAL CAREER GOAL CARD (KARİYERİMİ PLANLIYORUM) */}
          {(() => {
            const personalGoalRole = activeEmployee.personalCareerGoal?.targetRole || activeEmployee.recommendedRole;
            const isMatching = personalGoalRole.trim().toLowerCase() === activeEmployee.recommendedRole.trim().toLowerCase();

            return (
              <div className={`p-5 rounded-2xl border-2 shadow-sm space-y-3 mt-4 transition-all ${
                isMatching 
                  ? 'bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-50 border-amber-300' 
                  : 'bg-gradient-to-r from-rose-500/10 via-red-50 to-rose-100 border-rose-300'
              }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-2">
                  <div className="flex items-center space-x-2">
                    <Target className={`w-5 h-5 shrink-0 ${isMatching ? 'text-amber-600' : 'text-rose-600'}`} />
                    <h4 className="font-black text-sm text-[#0B2A4A]">
                      🎯 Kayıtlı Kişisel Kariyer Hedefi (Kariyerimi Planlıyorum Modülü)
                    </h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isMatching ? (
                      <span className="text-[10px] font-mono font-black px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg border border-emerald-400">
                        Sistem Hedefi ile Uyumlu ✅
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-black px-2.5 py-1 bg-rose-200 text-rose-950 rounded-lg border border-rose-400 animate-pulse">
                        ⚠️ Tutarsızlık Var! (Farklı Hedef Beyanı)
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-gray-600">
                      Kayıt Tarihi: {activeEmployee.personalCareerGoal.savedAt}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2">
                    <span className="text-xs font-black text-[#0B2A4A]">
                      Kişinin Kendi Belirlediği Hedef Pozisyon:{' '}
                      <span className={`font-black ${isMatching ? 'text-emerald-700' : 'text-rose-700 font-extrabold'}`}>
                        {activeEmployee.personalCareerGoal.targetRole}
                      </span>
                    </span>
                    <span className="text-[11px] font-mono font-bold text-amber-900 bg-amber-100 px-3 py-0.5 rounded-md border border-amber-300">
                      🎯 Hedef Zaman: {activeEmployee.personalCareerGoal.targetDate}
                    </span>
                  </div>
                  <p className="text-xs text-gray-800 italic font-medium bg-gray-50/80 p-3 rounded-lg border border-gray-200/80 leading-relaxed">
                    "{activeEmployee.personalCareerGoal.description}"
                  </p>
                </div>
              </div>
            );
          })()}

          {/* 👑 6 KADEMELİ KURUMSAL RAPORLAMA ZİNCİRİ (CEO'YA KADAR RAPORLAMA KART GRİDİ) */}
          <div className="bg-gradient-to-r from-slate-900 via-[#0B2A4A] to-slate-900 text-white p-5 rounded-2xl border-2 border-amber-400/80 shadow-lg space-y-3 mt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-amber-400/30 pb-2.5">
              <h4 className="font-black text-sm text-white flex items-center space-x-2">
                <Crown className="w-5 h-5 text-amber-400 shrink-0" />
                <span>👑 {activeEmployee.name}'in 6 Kademeli Kurumsal Raporlama Zinciri (CEO'ya Kadar)</span>
              </h4>
              <span className="text-[10px] font-mono font-black text-amber-300 bg-amber-400/20 px-3 py-1 rounded-lg border border-amber-400/40 whitespace-nowrap">
                Tam Kurumsal Hiyerarşi Kartı 🌳
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              {/* 1. CEO */}
              <div className="p-3 bg-amber-950/50 border border-amber-400/50 rounded-xl flex items-center space-x-3 shadow-xs">
                <img src={activeEmployee.hierarchy.ceoChain[0].avatar} alt={activeEmployee.hierarchy.ceoChain[0].name} className="w-10 h-10 rounded-lg object-cover border-2 border-amber-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[9px] font-mono font-black text-amber-300 uppercase block">1. Kademe: Genel Müdür & CEO</span>
                  <h5 className="font-black text-xs text-white truncate">{activeEmployee.hierarchy.ceoChain[0].name}</h5>
                  <p className="text-[10px] text-gray-300 truncate">{activeEmployee.hierarchy.ceoChain[0].role}</p>
                </div>
              </div>

              {/* 2. GMY */}
              <div className="p-3 bg-slate-800/80 border border-blue-400/40 rounded-xl flex items-center space-x-3 shadow-xs">
                <img src={activeEmployee.hierarchy.ceoChain[1].avatar} alt={activeEmployee.hierarchy.ceoChain[1].name} className="w-10 h-10 rounded-lg object-cover border border-blue-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[9px] font-mono font-black text-emerald-300 uppercase block">2. Kademe: Operasyon Direktörü (GMY)</span>
                  <h5 className="font-black text-xs text-white truncate">{activeEmployee.hierarchy.ceoChain[1].name}</h5>
                  <p className="text-[10px] text-gray-300 truncate">{activeEmployee.hierarchy.ceoChain[1].role}</p>
                </div>
              </div>

              {/* 3. Bölge Müdürü */}
              <div className="p-3 bg-slate-800/80 border border-indigo-400/40 rounded-xl flex items-center space-x-3 shadow-xs">
                <img src={activeEmployee.hierarchy.ceoChain[2].avatar} alt={activeEmployee.hierarchy.ceoChain[2].name} className="w-10 h-10 rounded-lg object-cover border border-indigo-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[9px] font-mono font-black text-emerald-300 uppercase block">3. Kademe: Bölge Operasyon Müdürü</span>
                  <h5 className="font-black text-xs text-white truncate">{activeEmployee.hierarchy.ceoChain[2].name}</h5>
                  <p className="text-[10px] text-gray-300 truncate">{activeEmployee.hierarchy.ceoChain[2].role}</p>
                </div>
              </div>

              {/* 4. Doğrudan Amir */}
              <div className="p-3 bg-slate-800/80 border border-slate-400/40 rounded-xl flex items-center space-x-3 shadow-xs">
                <img src={activeEmployee.hierarchy.ceoChain[3].avatar} alt={activeEmployee.hierarchy.ceoChain[3].name} className="w-10 h-10 rounded-lg object-cover border border-slate-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[9px] font-mono font-black text-emerald-300 uppercase block">4. Kademe: Doğrudan Mağaza Amiri</span>
                  <h5 className="font-black text-xs text-white truncate">{activeEmployee.hierarchy.ceoChain[3].name}</h5>
                  <p className="text-[10px] text-gray-300 truncate">{activeEmployee.hierarchy.ceoChain[3].role}</p>
                </div>
              </div>

              {/* 5. Mevcut Çalışan (Aktif) */}
              <div className="p-3 bg-emerald-900/60 border-2 border-emerald-400 rounded-xl flex items-center space-x-3 shadow-xs">
                <img src={activeEmployee.avatar} alt={activeEmployee.name} className="w-10 h-10 rounded-lg object-cover border-2 border-emerald-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[9px] font-mono font-black text-emerald-300 uppercase block">5. Kademe: Mevcut Çalışan (Aktif)</span>
                  <h5 className="font-black text-xs text-white truncate">{activeEmployee.name}</h5>
                  <p className="text-[10px] text-emerald-200 font-bold truncate">{activeEmployee.currentRole} • %{activeEmployee.competencyScore}p</p>
                </div>
              </div>

              {/* 6. Alt Çalışanlar */}
              <div className="p-3 bg-blue-950/60 border border-blue-400/40 rounded-xl flex items-center space-x-3 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-blue-500/30 border border-blue-400 flex items-center justify-center text-amber-300 font-black text-xs shrink-0">
                  {activeEmployee.hierarchy.subordinates.length} Personel
                </div>
                <div className="truncate">
                  <span className="text-[9px] font-mono font-black text-emerald-300 uppercase block">6. Kademe: Alt Ekip Üyeleri</span>
                  <h5 className="font-black text-xs text-white truncate">{activeEmployee.hierarchy.subordinates.map(s => s.name).slice(0, 2).join(', ')}...</h5>
                  <p className="text-[10px] text-gray-300 truncate">Doğrudan Raporlayan Kadro ({activeEmployee.hierarchy.subordinates.length} Personel)</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ORGANİZASYON HİYERARŞİSİ & YÖNETİM AĞACI CARD (CEO'YA KADAR TAM ZİNCİR) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-md space-y-6 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div className="space-y-1">
              <h3 className="font-black text-xl text-[#0B2A4A] flex items-center space-x-2">
                <GitFork className="w-6 h-6 text-[#087F96]" />
                <span>Organizasyon Hiyerarşisi (CEO'ya Kadar Tüm Raporlama Zinciri)</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                {activeEmployee.name}'in Genel Müdür & CEO'ya kadar uzanan tüm komuta kademesi ve alt ekibi.
              </p>
            </div>

            <span className="px-4 py-1.5 bg-indigo-100 text-indigo-900 text-xs font-mono font-black rounded-full border border-indigo-300 whitespace-nowrap shadow-xs">
              👑 CEO'ya Kadar Tam Raporlama Zinciri
            </span>
          </div>

          {/* VISUAL HIERARCHY TREE DIAGRAM - FULL CHAIN FROM CEO TO SUBORDINATES */}
          <div className="flex flex-col items-center space-y-4 py-2">
            
            {/* CEO CHAIN NODES (LEVEL 1 -> LEVEL 4) */}
            {(activeEmployee.hierarchy.ceoChain || []).map((node, index) => {
              const isCeo = node.isCeo;
              return (
                <React.Fragment key={node.id}>
                  <div className={`w-full max-w-2xl p-4 sm:p-5 rounded-2xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative border-2 ${
                    isCeo
                      ? 'bg-gradient-to-r from-amber-950 via-slate-950 to-amber-950 text-white border-amber-400 ring-4 ring-amber-400/20'
                      : index === 1
                      ? 'bg-gradient-to-r from-slate-900 via-[#0B2A4A] to-slate-900 text-white border-[#087F96]'
                      : index === 2
                      ? 'bg-gradient-to-r from-blue-900 to-indigo-900 text-white border-blue-400'
                      : 'bg-gradient-to-r from-slate-800 to-slate-900 text-white border-slate-400'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className="relative shrink-0">
                        <img
                          src={node.avatar}
                          alt={node.name}
                          className={`w-14 h-14 rounded-2xl object-cover border-2 shadow-md ${
                            isCeo ? 'border-amber-400 ring-2 ring-amber-300' : 'border-blue-300'
                          }`}
                        />
                        {isCeo && (
                          <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-black shadow-md">
                            👑 CEO
                          </span>
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <span className={`text-[10px] font-mono font-black uppercase tracking-wider block ${
                          isCeo ? 'text-amber-300' : 'text-emerald-300'
                        }`}>
                          {node.levelTitle || `Üst Yönetici Kademe ${index + 1}`}
                        </span>
                        <h4 className="font-black text-base text-white">{node.name}</h4>
                        <p className="text-xs text-gray-300 font-medium">
                          {node.role} • {node.department}
                        </p>
                      </div>
                    </div>

                    <span className={`text-xs font-mono font-extrabold px-3.5 py-1.5 rounded-xl border whitespace-nowrap self-stretch sm:self-auto text-center ${
                      isCeo
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}>
                      {isCeo ? 'Yönetim Kurulu Zirvesi 👑' : index === 3 ? 'Doğrudan Amir 👔' : 'Üst Yönetici Kadro 🏢'}
                    </span>
                  </div>

                  {/* CONNECTING ARROW DOWN */}
                  <div className="flex flex-col items-center justify-center my-0.5 space-y-0.5">
                    <div className="w-1 h-5 bg-gradient-to-b from-[#087F96] to-emerald-500 rounded-full" />
                    <ArrowDown className="w-4 h-4 text-emerald-500 animate-bounce" />
                  </div>
                </React.Fragment>
              );
            })}

            {/* MEVCUT ÇALIŞAN (İNCELENEN AKTİF PROFİL - KADEME 5) */}
            <div className="w-full max-w-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 p-5 rounded-3xl border-4 border-emerald-500 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ring-4 ring-emerald-300/40">
              <div className="flex items-center space-x-4">
                <div className="relative shrink-0">
                  <img
                    src={activeEmployee.avatar}
                    alt={activeEmployee.name}
                    className="w-16 h-16 rounded-2xl object-cover border-4 border-emerald-600 shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[9px] font-black font-mono">
                    📍 Aktif
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-black text-emerald-900 uppercase tracking-wider block">
                    📍 5. Kademe: Mevcut Çalışan (Seçili Profil)
                  </span>
                  <h4 className="font-black text-xl text-[#0B2A4A]">{activeEmployee.name}</h4>
                  <p className="text-xs text-gray-700 font-bold">
                    {activeEmployee.currentRole} • {activeEmployee.department}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right space-y-1 w-full sm:w-auto">
                <span className="px-3.5 py-1.5 bg-emerald-600 text-white font-mono text-xs font-black rounded-xl shadow-xs inline-block">
                  %{activeEmployee.competencyScore} Yetkinlik Skoru
                </span>
                <span className="text-xs font-mono font-bold text-emerald-900 block">
                  {activeEmployee.hierarchy.subordinates.length} Ekip Üyesi Yönetiyor 👥
                </span>
              </div>
            </div>

            {/* CONNECTING ARROW DOWN */}
            <div className="flex flex-col items-center justify-center my-0.5 space-y-0.5">
              <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-[#087F96] rounded-full" />
              <ArrowDown className="w-4 h-4 text-[#087F96] animate-bounce" />
            </div>

            {/* KENDİSİNE BAĞLI ÇALIŞANLAR (ALT EKİP ÜYELERİ - KADEME 6) */}
            <div className="w-full space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-xs text-[#0B2A4A] uppercase tracking-wider flex items-center space-x-2">
                  <Users className="w-4 h-4 text-[#087F96]" />
                  <span>⬇️ 6. Kademe: Kendisine Bağlı Alt Çalışanlar / Ekip Üyeleri ({activeEmployee.hierarchy.subordinates.length} Personel)</span>
                </h4>
                <span className="text-[10px] font-mono text-gray-500">Doğrudan Raporlama Grubu</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {activeEmployee.hierarchy.subordinates.map((sub) => (
                  <div key={sub.id} className="p-4 bg-gray-50 hover:bg-blue-50/80 border-2 border-gray-200 hover:border-[#087F96] rounded-2xl transition-all flex items-center space-x-3.5 shadow-xs group hover:scale-[1.02]">
                    <img
                      src={sub.avatar}
                      alt={sub.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-[#087F96] flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="space-y-0.5 truncate">
                      <h5 className="font-extrabold text-xs text-[#0B2A4A] truncate">{sub.name}</h5>
                      <p className="text-[11px] text-gray-600 font-bold truncate">{sub.role}</p>
                      <span className="text-[9.5px] font-mono font-bold text-[#087F96] block truncate">
                        {sub.department}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* CHRONOLOGICAL CAREER TIMELINE GRAPH CARD (GENİŞ VE BÜYÜK YATAY KRONOLOJİK YOL HARİTASI) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-md space-y-6 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div className="space-y-1">
              <h3 className="font-black text-xl text-[#0B2A4A] flex items-center space-x-2">
                <Milestone className="w-6 h-6 text-[#087F96]" />
                <span>Yatay Kronolojik Kariyer Haritası & Yolculuk Zaman Çizelgesi</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                {activeEmployee.name} için geçmiş tecrübelerden gelecek terfi hedeflerine kronolojik yatay ilerleme akışı.
              </p>
            </div>

            <span className="px-4 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-mono font-bold rounded-full border border-emerald-300 whitespace-nowrap shadow-xs">
              Geniş Ekran Yatay İlerleme Akışı ⚡
            </span>
          </div>

          {/* 1. HORIZONTAL STEPPER PROGRESS LINE (YATAY TARİHLİ KRONOLOJİ ZAMAN DİZGİSİ) */}
          <div className="overflow-x-auto pb-4 pt-2">
            <div className="min-w-[900px] space-y-8">
              
              {/* Horizontal Bar Connecting Line with Circles */}
              <div className="relative flex items-center justify-between px-8 py-6">
                {/* Connecting Line */}
                <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-3 bg-gradient-to-r from-blue-600 via-[#087F96] via-emerald-500 via-amber-400 to-purple-600 rounded-full shadow-sm z-0" />

                {careerTimelineMilestones.map((ms, idx) => {
                  const isCurrent = ms.status === 'current';
                  const isTarget = ms.status === 'target';
                  const isVision = ms.status === 'vision';

                  return (
                    <div key={idx} className="relative z-10 flex flex-col items-center group cursor-pointer">
                      {/* Date Pill above circle */}
                      <div className={`text-xs font-mono font-black px-3.5 py-1.5 rounded-full border shadow-md mb-3 transition-all group-hover:scale-110 whitespace-nowrap ${
                        isCurrent
                          ? 'bg-emerald-600 text-white border-emerald-400 ring-4 ring-emerald-300 scale-105'
                          : isTarget
                          ? 'bg-amber-400 text-slate-950 border-amber-300 ring-4 ring-amber-200'
                          : isVision
                          ? 'bg-purple-700 text-white border-purple-400'
                          : 'bg-[#0B2A4A] text-white border-gray-300'
                      }`}>
                        {ms.date}
                      </div>

                      {/* Circle Node */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-xl border-4 transition-transform group-hover:scale-115 ${
                        isCurrent
                          ? 'bg-emerald-500 text-white border-white ring-4 ring-emerald-400/40 scale-110'
                          : isTarget
                          ? 'bg-amber-400 text-slate-950 border-white ring-4 ring-amber-400/40 scale-105'
                          : isVision
                          ? 'bg-purple-600 text-white border-white ring-4 ring-purple-400/30'
                          : 'bg-[#0B2A4A] text-white border-white'
                      }`}>
                        {isCurrent ? <Flag className="w-6 h-6" /> :
                         isTarget ? <Target className="w-6 h-6" /> :
                         isVision ? <Crown className="w-6 h-6" /> :
                         <Check className="w-6 h-6" />}
                      </div>

                      {/* Title label below circle */}
                      <div className="text-center mt-3 max-w-[140px]">
                        <div className="text-xs font-extrabold text-[#0B2A4A] line-clamp-1" title={ms.title}>{ms.title}</div>
                        <div className="text-[10px] text-gray-500 font-bold line-clamp-1">{ms.role}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 2. HORIZONTAL MILESTONE CARDS (FERAH GENİŞ 6 KARTLIK IZGARA) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 pt-2">
                {careerTimelineMilestones.map((ms, idx) => {
                  const isCurrent = ms.status === 'current';
                  const isTarget = ms.status === 'target';
                  const isVision = ms.status === 'vision';

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border-2 transition-all space-y-3 flex flex-col justify-between hover:scale-[1.02] shadow-xs ${
                        isCurrent
                          ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-400 shadow-md ring-2 ring-emerald-300/50'
                          : isTarget
                          ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300 shadow-md'
                          : isVision
                          ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-300'
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-black text-[#087F96] bg-blue-100 px-2 py-0.5 rounded-md">
                            {ms.date}
                          </span>
                          <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-lg ${
                            ms.score >= 90 ? 'bg-emerald-600 text-white' :
                            ms.score >= 80 ? 'bg-blue-600 text-white' :
                            ms.score >= 70 ? 'bg-amber-500 text-slate-950' : 'bg-gray-700 text-white'
                          }`}>
                            %{ms.score} Puan
                          </span>
                        </div>

                        <div>
                          <h4 className="font-extrabold text-xs text-[#0B2A4A] leading-snug">{ms.title}</h4>
                          <p className="text-[11px] text-gray-700 font-bold mt-0.5">
                            {ms.role}
                          </p>
                          <div className="text-[10px] text-gray-500 font-medium">{ms.company}</div>
                        </div>

                        <p className="text-[11px] text-gray-600 leading-snug">
                          {ms.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-gray-200/60 space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {ms.badges.map((badge, bIdx) => (
                            <span key={bIdx} className="text-[9px] font-bold text-gray-700 bg-white border border-gray-300 px-2 py-0.5 rounded-full flex items-center space-x-1">
                              <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                              <span>{badge}</span>
                            </span>
                          ))}
                        </div>

                        <div className={`text-[9.5px] font-mono font-bold px-2 py-1 rounded-md text-center border ${
                          isCurrent ? 'bg-emerald-100 text-emerald-900 border-emerald-300 font-black' :
                          isTarget ? 'bg-amber-100 text-amber-900 border-amber-300 font-black' :
                          isVision ? 'bg-purple-100 text-purple-900 border-purple-300 font-black' :
                          'bg-gray-200 text-gray-700 border-gray-300'
                        }`}>
                          {ms.statusLabel}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

        {/* 30-60-90 DAY INDIVIDUAL DEVELOPMENT ACTION PLAN (GENİŞ EKRAN) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-md space-y-4 w-full">
          <h3 className="font-extrabold text-lg text-[#0B2A4A] flex items-center space-x-2 border-b border-gray-100 pb-3">
            <Target className="w-5 h-5 text-[#087F96]" />
            <span>90 Günlük Bireysel Gelişim Aksiyon Planı & Hedef Takvimi</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 bg-blue-50/60 border-2 border-blue-200 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-blue-900 bg-blue-200 px-2.5 py-0.5 rounded-md">
                  1. AŞAMA (30 GÜN)
                </span>
                <span className="text-xs font-bold text-blue-700">Ağustos 2026</span>
              </div>
              <h4 className="font-extrabold text-sm text-[#0B2A4A]">Saha Koçluğu & Yetkinlik Denetimi</h4>
              <p className="text-xs text-gray-600 leading-snug">
                Mevcut reyon ve kasa operasyonlarında eksik kalan 2 mikro eğitimin tamamlanması ve mentör koçluğu.
              </p>
              <div className="text-xs font-mono font-bold text-blue-800 pt-2 border-t border-blue-200">
                Hedef: %100 Tamamlama
              </div>
            </div>

            <div className="p-5 bg-emerald-50/60 border-2 border-emerald-200 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-emerald-900 bg-emerald-200 px-2.5 py-0.5 rounded-md">
                  2. AŞAMA (60 GÜN)
                </span>
                <span className="text-xs font-bold text-emerald-700">Eylül 2026</span>
              </div>
              <h4 className="font-extrabold text-sm text-[#0B2A4A]">İleri Bütçe & Fire Minimizasyonu</h4>
              <p className="text-xs text-gray-600 leading-snug">
                Terfi hedefi için gerekli finansal marj ve stok devir hızı uzmanlık eğitiminin başarıyla geçilmesi.
              </p>
              <div className="text-xs font-mono font-bold text-emerald-800 pt-2 border-t border-emerald-200">
                Hedef: %90+ Sınav Skoru
              </div>
            </div>

            <div className="p-5 bg-amber-50/60 border-2 border-amber-200 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-md">
                  3. AŞAMA (90 GÜN)
                </span>
                <span className="text-xs font-bold text-amber-700">Ekim 2026</span>
              </div>
              <h4 className="font-extrabold text-sm text-[#0B2A4A]">Terfi Komitesi Mülakatı</h4>
              <p className="text-xs text-gray-600 leading-snug">
                {activeEmployee.recommendedRole} rolüne geçiş için İK direktörü ve bölge müdürü ile terfi değerlendirmesi.
              </p>
              <div className="text-xs font-mono font-bold text-amber-900 pt-2 border-t border-amber-200">
                Hedef: Resmi Terfi Onayı 🎯
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
