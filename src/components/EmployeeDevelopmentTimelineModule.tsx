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
  Check
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
    else score = 35 + (i % 16);

    const deptConfig = DEPARTMENTS_CONFIG[i % DEPARTMENTS_CONFIG.length];
    const dept = deptConfig.name;

    const match = Math.min(99, Math.max(45, score + (i % 5) - 2));
    const avatar = avatars[i % avatars.length];
    const city = cities[i % cities.length];
    const tenureYears = Math.floor(score / 15) + 1;
    const tenure = `${tenureYears} Yıl ${(i * 3) % 12} Ay`;
    const startDate = `${(i % 28) + 1} ${['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'][i % 12]} 202${2 + (i % 4)}`;

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
        { courseTitle: `${deptConfig.role} Master Sertifika Programı`, duration: '16 Saat', durationHours: 16, completedDate: '10 Mayıs 2026', instructorName: 'Prof. Dr. Ahmet Çelik', institution: 'Perakende Kariyer Akademisi', companyWhereTaken: 'Mevcut Şirket', score, gradeStatus: score >= 90 ? 'Üstün Başarı' : score >= 80 ? 'Pek İyi' : 'Başarılı', certificateId: `PKA-2026-${i + 1}-001` }
      ],
      awards: score >= 80 ? [
        { title: `2025 Yılı ${city} Perakende Başarı Ödülü`, category: 'Ödül', givenDate: '15 Aralık 2025', organization: 'Perakende Kariyer Akademisi', reason: `%${score} Üstün Başarı Skoru` }
      ] : [],
      promotions: score >= 80 ? [
        { fromRole: 'Stajyer / Görevli', toRole: deptConfig.role, promotionDate: '15 Mart 2023', approvedBy: 'Ahmet Çelik (İK Direktörü)', note: 'Yüksek başarı puanı ile terfi.' }
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
      ]
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
    const startYear = parseInt(activeEmployee.startDate.split(' ').pop() || '2022', 10);
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

      {/* Filter and Employee Selector Bar */}
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
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Sorted Employee List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-extrabold text-sm text-[#0B2A4A] flex items-center space-x-2">
              <Users className="w-4 h-4 text-[#087F96]" />
              <span>Kariyer Karnesi İncelenecek Çalışanlar ({filteredEmployees.length})</span>
            </h3>
            <span className="text-[10px] text-gray-400 font-mono">1.000 Kadro</span>
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
                        <span className="text-[9px] font-mono font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded truncate max-w-[110px]" title={emp.department}>
                          {emp.department}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500">{emp.currentRole}</p>
                      <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                        Hedef: {emp.recommendedRole}
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <div className={`px-2.5 py-1 rounded-lg font-mono text-xs font-black shadow-xs ${
                      emp.competencyScore >= 91 ? 'bg-emerald-600 text-white' :
                      emp.competencyScore >= 81 ? 'bg-blue-600 text-white' :
                      emp.competencyScore >= 71 ? 'bg-amber-500 text-slate-950' : 'bg-orange-500 text-white'
                    }`}>
                      {emp.competencyScore} Puan
                    </div>
                    <div className="text-[9px] font-mono font-extrabold text-[#087F96]">
                      Kariyer Haritası →
                    </div>
                  </div>
                </div>
              );
            })}

            {/* LOAD MORE BUTTON */}
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

        {/* Right Column: Visual Chronological Career Timeline & Score Chart */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Employee Header Summary Card */}
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

              {/* Target Role Card */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-2xl shadow-md space-y-1 text-center sm:text-right w-full sm:w-auto shrink-0">
                <div className="text-[10px] font-bold uppercase text-emerald-100">Önerilen Terfi Hedefi</div>
                <div className="text-sm font-black text-white">{activeEmployee.recommendedRole}</div>
                <div className="text-[10px] font-mono font-bold text-amber-300">
                  Uyum Oranı: %{activeEmployee.matchPercentage}
                </div>
              </div>
            </div>

            {/* VISUAL SCORE EVOLUTION PROGRESS BAR GRAPH */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#0B2A4A]">
                <span className="flex items-center space-x-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Kariyer Yetkinlik Skoru İlerleme Grafiği (Geçmiş ➔ Gelecek)</span>
                </span>
                <span className="font-mono text-[#087F96]">%60p ➔ %{activeEmployee.competencyScore}p ➔ %98p</span>
              </div>

              <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200 flex">
                <div 
                  className="bg-gradient-to-r from-blue-400 via-[#087F96] to-emerald-500 h-full rounded-full transition-all duration-1000 flex items-center justify-end pr-2 text-[9px] font-mono font-black text-white"
                  style={{ width: `${Math.min(100, Math.max(20, activeEmployee.competencyScore))}%` }}
                >
                  %{activeEmployee.competencyScore} Canlı Puan
                </div>
              </div>

              <div className="flex justify-between text-[10px] font-mono text-gray-500 pt-0.5">
                <span>2020: Stajyer (%60)</span>
                <span>2022: Şirkete Giriş (%78)</span>
                <span className="font-bold text-emerald-700">2026: Mevcut (%{activeEmployee.competencyScore})</span>
                <span className="font-bold text-blue-700">2027: Hedef Terfi (%{Math.min(100, activeEmployee.competencyScore + 6)})</span>
                <span>2028+: Vizyon (%98)</span>
              </div>
            </div>

          </div>

          {/* CHRONOLOGICAL CAREER TIMELINE GRAPH CARD */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div className="space-y-1">
                <h3 className="font-black text-lg text-[#0B2A4A] flex items-center space-x-2">
                  <Milestone className="w-5 h-5 text-[#087F96]" />
                  <span>Kronolojik Kariyer Haritası & Yolculuk Zaman Çizelgesi</span>
                </h3>
                <p className="text-xs text-gray-500">
                  {activeEmployee.name} için geçmiş tecrübelerden gelecek terfi hedeflerine kadar olan kronolojik basamaklar.
                </p>
              </div>

              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-mono font-bold rounded-full border border-emerald-300 whitespace-nowrap">
                Canlı Zaman Çizelgesi ⚡
              </span>
            </div>

            {/* VISUAL TIMELINE NODES (KRONOLOJİK ZAMAN ÇİZELGESİ) */}
            <div className="relative border-l-4 border-[#087F96]/30 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8 py-2">
              {careerTimelineMilestones.map((ms, idx) => {
                const isCompleted = ms.status === 'completed';
                const isCurrent = ms.status === 'current';
                const isTarget = ms.status === 'target';
                const isVision = ms.status === 'vision';

                return (
                  <div key={idx} className="relative group">
                    {/* Node Dot Icon */}
                    <div className={`absolute -left-[35px] sm:-left-[43px] top-1.5 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-md border-2 transition-all ${
                      isCurrent
                        ? 'bg-emerald-500 text-white border-white ring-4 ring-emerald-400/30 scale-110'
                        : isTarget
                        ? 'bg-amber-400 text-slate-950 border-white ring-4 ring-amber-400/30 scale-105'
                        : isVision
                        ? 'bg-purple-600 text-white border-white ring-4 ring-purple-400/30'
                        : 'bg-[#0B2A4A] text-white border-white'
                    }`}>
                      {isCurrent ? <Flag className="w-4 h-4" /> :
                       isTarget ? <Target className="w-4 h-4" /> :
                       isVision ? <Crown className="w-4 h-4" /> :
                       <Check className="w-4 h-4" />}
                    </div>

                    {/* Timeline Node Card Container */}
                    <div className={`p-5 rounded-2xl border-2 transition-all space-y-3 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-400 shadow-md'
                        : isTarget
                        ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 shadow-md'
                        : isVision
                        ? 'bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-300 shadow-xs'
                        : 'bg-gray-50/80 border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/60 pb-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono font-black text-[#087F96] bg-blue-100 px-2.5 py-0.5 rounded-md">
                              {ms.date}
                            </span>
                            <h4 className="font-black text-sm text-[#0B2A4A]">{ms.title}</h4>
                          </div>
                          <p className="text-xs text-gray-700 font-bold">
                            Unvan: <strong className="text-[#0B2A4A]">{ms.role}</strong> • {ms.company}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <span className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-lg shadow-xs ${
                            ms.score >= 90 ? 'bg-emerald-600 text-white' :
                            ms.score >= 80 ? 'bg-blue-600 text-white' :
                            ms.score >= 70 ? 'bg-amber-500 text-slate-950' : 'bg-gray-700 text-white'
                          }`}>
                            %{ms.score} Puan
                          </span>
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${
                            isCurrent ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                            isTarget ? 'bg-amber-100 text-amber-900 border-amber-300' :
                            isVision ? 'bg-purple-100 text-purple-900 border-purple-300' :
                            'bg-gray-200 text-gray-700 border-gray-300'
                          }`}>
                            {ms.statusLabel}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 font-medium leading-relaxed">
                        {ms.description}
                      </p>

                      {/* Milestones & Skill Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {ms.badges.map((badge, bIdx) => (
                          <span key={bIdx} className="text-[9.5px] font-bold text-gray-700 bg-white border border-gray-300 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                            <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                            <span>{badge}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* 30-60-90 DAY INDIVIDUAL DEVELOPMENT ACTION PLAN */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-md space-y-4">
            <h3 className="font-extrabold text-base text-[#0B2A4A] flex items-center space-x-2 border-b border-gray-100 pb-3">
              <Target className="w-5 h-5 text-[#087F96]" />
              <span>90 Günlük Bireysel Gelişim Aksiyon Planı & Hedef Takvimi</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="p-4 bg-blue-50/60 border-2 border-blue-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black text-blue-900 bg-blue-200 px-2 py-0.5 rounded-md">
                    1. AŞAMA (30 GÜN)
                  </span>
                  <span className="text-[9px] font-bold text-blue-700">Ağustos 2026</span>
                </div>
                <h4 className="font-extrabold text-xs text-[#0B2A4A]">Saha Koçluğu & Yetkinlik Denetimi</h4>
                <p className="text-[11px] text-gray-600 leading-snug">
                  Mevcut reyon ve kasa operasyonlarında eksik kalan 2 mikro eğitimin tamamlanması ve mentör koçluğu.
                </p>
                <div className="text-[9.5px] font-mono font-bold text-blue-800 pt-1 border-t border-blue-200">
                  Hedef: %100 Tamamlama
                </div>
              </div>

              <div className="p-4 bg-emerald-50/60 border-2 border-emerald-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black text-emerald-900 bg-emerald-200 px-2 py-0.5 rounded-md">
                    2. AŞAMA (60 GÜN)
                  </span>
                  <span className="text-[9px] font-bold text-emerald-700">Eylül 2026</span>
                </div>
                <h4 className="font-extrabold text-xs text-[#0B2A4A]">İleri Bütçe & Fire Minimizasyonu</h4>
                <p className="text-[11px] text-gray-600 leading-snug">
                  Terfi hedefi için gerekli finansal marj ve stok devir hızı uzmanlık eğitiminin başarıyla geçilmesi.
                </p>
                <div className="text-[9.5px] font-mono font-bold text-emerald-800 pt-1 border-t border-emerald-200">
                  Hedef: %90+ Sınav Skoru
                </div>
              </div>

              <div className="p-4 bg-amber-50/60 border-2 border-amber-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black text-amber-900 bg-amber-200 px-2 py-0.5 rounded-md">
                    3. AŞAMA (90 GÜN)
                  </span>
                  <span className="text-[9px] font-bold text-amber-700">Ekim 2026</span>
                </div>
                <h4 className="font-extrabold text-xs text-[#0B2A4A]">Terfi Komitesi Mülakatı</h4>
                <p className="text-[11px] text-gray-600 leading-snug">
                  {activeEmployee.recommendedRole} rolüne geçiş için İK direktörü ve bölge müdürü ile terfi değerlendirmesi.
                </p>
                <div className="text-[9.5px] font-mono font-bold text-amber-900 pt-1 border-t border-amber-200">
                  Hedef: Resmi Terfi Onayı 🎯
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
