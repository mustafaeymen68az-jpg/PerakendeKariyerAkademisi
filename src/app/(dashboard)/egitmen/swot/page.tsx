'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Target, 
  ShieldAlert, 
  TrendingUp, 
  AlertTriangle, 
  Save, 
  UserCheck, 
  Building2, 
  CheckCircle2, 
  Sparkles,
  Search,
  BookOpen,
  User,
  GraduationCap,
  Clock,
  Calendar,
  Award,
  Plus,
  Star,
  MessageSquare,
  Crown,
  BarChart3,
  ThumbsUp
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '@/data/departmentsData';

interface CompletedCourse {
  title: string;
  durationHours: number;
  score: number;
  completedDate: string;
  grade: string;
}

interface RecommendedCourse {
  title: string;
  durationHours: number;
  priority: 'KRİTİK GELİŞİM' | 'ZORUNLU LİDERLİK' | 'SEÇMELİ MODÜL';
  priorityColor: string;
  skillImpact: string;
  reason: string;
}

interface EnrolledStudent {
  id: string;
  name: string;
  role: string;
  deptId: string;
  courseName: string;
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
  completedCourses: CompletedCourse[];
  recommendedCourses: RecommendedCourse[];
}

const ENROLLED_STUDENTS: EnrolledStudent[] = [
  {
    id: 'student-selin',
    name: 'Selin Yılmaz',
    role: 'Kadıköy Şube Müdür Yrd.',
    deptId: 'magaza_mudurleri',
    courseName: 'P&L Mağaza Bütçe Yönetimi & Fire Minimizasyonu',
    strengths: 'P&L Kar-Zarar hesaplamalarında son derece hızlı ve doğru formül kuruyor. Saha ekibi üzerinde güçlü liderlik etkisine sahip.',
    weaknesses: 'Yoğun kampanya günlerinde dijital stok sayım ekranında veri girişini erteleyebiliyor.',
    opportunities: 'Kadıköy Premium Mağaza Müdürlüğü terfi sürecine en yakın aday.',
    threats: 'Yüksek mükemmeliyetçilik sebebiyle delegasyon zamanlamasında zorlanabilir.',
    completedCourses: [
      { title: 'P&L Mağaza Bütçe Yönetimi Uzmanlığı', durationHours: 32, score: 98, completedDate: '14 Mayıs 2025', grade: 'PKA Derece' },
      { title: 'Ekip Liderliği & Süreç Yönetimi', durationHours: 24, score: 96, completedDate: '22 Mart 2025', grade: 'Üstün Başarı' },
      { title: 'Fire Minimizasyonu & Marj Artırımı', durationHours: 16, score: 95, completedDate: '10 Ağustos 2024', grade: 'PKA Başarı' },
      { title: 'Perakende Saha Auditi & Kriz Yönetimi', durationHours: 20, score: 94, completedDate: '18 Ocak 2024', grade: 'Tamamlandı' }
    ],
    recommendedCourses: [
      {
        title: 'Çoklu Mağaza Lojistik & Tedarik Zinciri Yönetimi',
        durationHours: 24,
        priority: 'KRİTİK GELİŞİM',
        priorityColor: 'bg-rose-100 text-rose-800 border-rose-200',
        skillImpact: 'Lojistik ve sevkiyat yetkinliğini %82\'den %95\'e yükseltir.',
        reason: 'Eğitmenin tespit ettiği lojistik koordinasyon gelişim ihtiyacı için.'
      },
      {
        title: 'P&L İleri Seviye Kurumsal Yıl Sonu Tahminleme',
        durationHours: 16,
        priority: 'ZORUNLU LİDERLİK',
        priorityColor: 'bg-amber-100 text-amber-800 border-amber-200',
        skillImpact: 'Finansal bütçeleme hassasiyetini %98 seviyesine ulaştırır.',
        reason: 'Mağaza Müdürlüğü terfi mülakatı öncesi zorunlu liderlik modülü.'
      },
      {
        title: 'Ekip İçi Delegasyon & İleri Zaman Yönetimi',
        durationHours: 12,
        priority: 'SEÇMELİ MODÜL',
        priorityColor: 'bg-blue-100 text-blue-800 border-blue-200',
        skillImpact: 'Görev delegasyonu ve zaman yönetimini güçlendirir.',
        reason: 'Mükemmeliyetçilik yönetimi tavsiyesi doğrultusunda eklenmiştir.'
      }
    ]
  },
  {
    id: 'student-ahmet',
    name: 'Ahmet Can Demir',
    role: 'Beşiktaş Kasa Şefi',
    deptId: 'kasiyerler',
    courseName: 'Kasiyer Müşteri Kriz Yönetimi & Kasa Hızı Ustalığı',
    strengths: 'Kasa işlem hızında bölge birincisi (%98.2), 12 kasiyeri eğiten sabırlı iç eğitmen.',
    weaknesses: 'Reyon mal kabul ve tedarikçi irsaliye kayıtlarında saha tecrübesi artırılmalı.',
    opportunities: '6 ay içerisinde Mağaza Müdür Yardımcılığı pozisyonuna yükselme potansiyeli.',
    threats: 'Aşırı efor sarf ederek mola sürelerini es geçmesi durumunda tükenmişlik riski.',
    completedCourses: [
      { title: 'Kasa Sistemleri & Gün Sonu Mutabakatı', durationHours: 28, score: 99, completedDate: '20 Ocak 2025', grade: 'Bölge 1.\'si' },
      { title: 'Müşteri İlişkileri & Şikayet Yönetimi', durationHours: 16, score: 94, completedDate: '15 Kasım 2024', grade: 'Üstün Başarı' },
      { title: 'Reyon Düzeni & 5S Saha Protokolü', durationHours: 12, score: 92, completedDate: '10 Eylül 2024', grade: 'Tamamlandı' },
      { title: 'Aday Personel Oryantasyon Eğitmenliği', durationHours: 20, score: 96, completedDate: '05 Haziran 2024', grade: 'Eğitmen Sertifikalı' }
    ],
    recommendedCourses: [
      {
        title: 'Reyon Mal Kabul & Tedarikçi İrsaliye Kontrolü',
        durationHours: 20,
        priority: 'KRİTİK GELİŞİM',
        priorityColor: 'bg-rose-100 text-rose-800 border-rose-200',
        skillImpact: 'Mal kabul ve stok giriş yetkinliğini %95 seviyesine getirir.',
        reason: 'Müdür Yardımcılığı terfisi için zorunlu saha modülü.'
      },
      {
        title: 'Zor Müşteri İletişimi & Saha Kriz Simülasyonu',
        durationHours: 16,
        priority: 'ZORUNLU LİDERLİK',
        priorityColor: 'bg-amber-100 text-amber-800 border-amber-200',
        skillImpact: 'Kriz anında şikayet çözüm hızını %99\'a çıkarır.',
        reason: 'Kasa hattı kriz yönetimi pekiştirme eğitimi.'
      }
    ]
  },
  {
    id: 'student-caner',
    name: 'Caner Kaya',
    role: 'Tunalı Mağaza Müdürü',
    deptId: 'magaza_mudurleri',
    courseName: 'Çoklu Mağaza Operasyon Yönetimi & Liderlik',
    strengths: '₺24.8M ciro başarısı, 5 yeni müdür yardımcısı yetiştiren güçlü mentorluk altyapısı.',
    weaknesses: 'E-ticaret omni-channel operasyon entegrasyonunda dijital araç hakimiyeti.',
    opportunities: 'İç Anadolu Bölge Müdürlüğü kadrosuna terfi adaylığı.',
    threats: 'Bölgesel rekabette agresif rakip mağaza açılış baskısı.',
    completedCourses: [
      { title: 'Çoklu Mağaza Operasyon Yönetimi', durationHours: 40, score: 96, completedDate: '15 Temmuz 2024', grade: 'Üst Düzey Yönetim' },
      { title: 'Bölgesel Ciro ve Pazar Payı Stratejileri', durationHours: 32, score: 95, completedDate: '10 Kasım 2023', grade: 'PKA Liderlik' },
      { title: 'Yöneticinin Koçluk & Mentorluk Rolü', durationHours: 24, score: 94, completedDate: '05 Eylül 2022', grade: 'Üstün Başarı' }
    ],
    recommendedCourses: [
      {
        title: 'E-Ticaret Omni-Channel Operasyon Entegrasyonu',
        durationHours: 32,
        priority: 'KRİTİK GELİŞİM',
        priorityColor: 'bg-rose-100 text-rose-800 border-rose-200',
        skillImpact: 'Dijital sipariş ve omnichannel hakimiyetini %96\'ya çıkarır.',
        reason: 'Bölge Müdürlüğü dijital dönüşüm gereksinimi.'
      },
      {
        title: 'Çoklu Bölge Pazar Payı & Rekabet Analizi',
        durationHours: 24,
        priority: 'ZORUNLU LİDERLİK',
        priorityColor: 'bg-amber-100 text-amber-800 border-amber-200',
        skillImpact: 'Bölgesel ciro stratejileri ve rakip analizini güçlendirir.',
        reason: 'Bölge Müdürü adayı stratejik modülü.'
      }
    ]
  },
  {
    id: 'student-mehmet',
    name: 'Mehmet Yılmaz',
    role: 'Kadıköy Reyon Şefi',
    deptId: 'reyon_gorevlileri',
    courseName: 'Taze Gıda & Hijyen Standartları Ustalığı',
    strengths: 'Reyon düzeni ve reyon içi müşteri iletişiminde yüksek performans.',
    weaknesses: 'Kapanış sayımlarında sistem veri girişini uzatabiliyor.',
    opportunities: 'Mağaza Müdür Yardımcılığı havuzuna dahil edilme imkanı.',
    threats: 'Yoğun mesai saatlerinde motivasyon düşüşü riski.',
    completedCourses: [
      { title: 'Taze Gıda & Hijyen Standartları Ustalığı', durationHours: 24, score: 92, completedDate: '18 Şubat 2025', grade: 'PKA Başarı' },
      { title: 'Reyon Düzeni & 5S Saha Standartları', durationHours: 16, score: 90, completedDate: '10 Ekim 2024', grade: 'Tamamlandı' }
    ],
    recommendedCourses: [
      {
        title: 'Dijital Stok Sayım & Kapanış Raporlama Eğitimi',
        durationHours: 16,
        priority: 'KRİTİK GELİŞİM',
        priorityColor: 'bg-rose-100 text-rose-800 border-rose-200',
        skillImpact: 'Kapanış sayım süresini %40 hızlandırır.',
        reason: 'Sistem veri girişi aksaklığını gidermek için.'
      }
    ]
  },
  {
    id: 'student-zeynep',
    name: 'Zeynep Karahan',
    role: 'Ege Bölge Kategori Uzmanı',
    deptId: 'saha_operasyon_mudurleri',
    courseName: 'Bölgesel Ciro ve Pazar Payı Stratejileri',
    strengths: 'Bölgesel kategori karlılık analizlerinde %98 başarı, pazar payı hakimiyeti.',
    weaknesses: 'Saha ziyaret takvimini yoğun toplantılardan dolayı erteleyebiliyor.',
    opportunities: 'Ege Bölge Kategori Müdürlüğü kadrosu.',
    threats: 'Lojistik tedarik aksamalarında doğrudan müdahale edememe riski.',
    completedCourses: [
      { title: 'Bölgesel Ciro ve Pazar Payı Stratejileri', durationHours: 36, score: 98, completedDate: '05 Nisan 2025', grade: 'Derece' },
      { title: 'Kategori Yönetimi & Tedarikçi Pazarlığı', durationHours: 28, score: 95, completedDate: '12 Kasım 2024', grade: 'Üstün Başarı' }
    ],
    recommendedCourses: [
      {
        title: 'Saha Ziyaret & Otomatik Takvim Yönetimi',
        durationHours: 12,
        priority: 'SEÇMELİ MODÜL',
        priorityColor: 'bg-blue-100 text-blue-800 border-blue-200',
        skillImpact: 'Saha denetim sıklığını %100 düzene sokar.',
        reason: 'Saha ziyaret disiplini ve takvim koçluğu.'
      }
    ]
  },
  {
    id: 'student-merve',
    name: 'Merve Şahin',
    role: 'Alsancak Taze Gıda Şefi',
    deptId: 'taze_gida_kasap_manav',
    courseName: 'Taze Gıda Saklama & Fire Minimizasyonu',
    strengths: '%1.2 ile bölgenin en düşük soğuk zincir fire oranını yakaladı.',
    weaknesses: 'Yeni katılan personelin oryantasyonunda sert üslup kullanabiliyor.',
    opportunities: 'İç Eğitmen Sertifika Programı adaylığı.',
    threats: 'Sezonluk ürün stok dalgalanmaları.',
    completedCourses: [
      { title: 'Taze Gıda Saklama & Fire Minimizasyonu', durationHours: 20, score: 97, completedDate: '25 Ocak 2025', grade: 'Şube Rekortmeni' },
      { title: 'Soğuk Zincir Lojistik Standartları', durationHours: 16, score: 94, completedDate: '14 Ağustos 2024', grade: 'PKA Başarı' }
    ],
    recommendedCourses: [
      {
        title: 'Yapıcı Geri Bildirim & Empatik İletişim Koçluğu',
        durationHours: 16,
        priority: 'ZORUNLU LİDERLİK',
        priorityColor: 'bg-amber-100 text-amber-800 border-amber-200',
        skillImpact: 'Yeni personel adaptasyonunu %90 güçlendirir.',
        reason: 'Ekip içi iletişim üslubunu yumuşatmak ve motivasyonu artırmak için.'
      }
    ]
  }
];

// TRAINER EVALUATION DATA (ÖĞRENCİLERİN EĞİTMENİ DEĞERLENDİRDİĞİ VERİLER)
interface CourseTrainerRating {
  courseName: string;
  ratingScore: number;
  satisfactionRate: number;
  evaluatedStudentCount: number;
  topStudentFeedback: string;
}

const TRAINER_COURSE_RATINGS: CourseTrainerRating[] = [
  {
    courseName: 'P&L Mağaza Bütçe Yönetimi & Fire Minimizasyonu',
    ratingScore: 4.95,
    satisfactionRate: 99,
    evaluatedStudentCount: 48,
    topStudentFeedback: 'Ahmet Hocamız P&L formüllerini ve brüt marj hesaplarını mağaza içinden gerçek vaka örnekleriyle mükemmel anlatıyor.'
  },
  {
    courseName: 'Kasiyer Müşteri Kriz Yönetimi & Kasa Hızı Ustalığı',
    ratingScore: 4.88,
    satisfactionRate: 97,
    evaluatedStudentCount: 65,
    topStudentFeedback: 'Kasa hattında yaşadığımız zor müşteri vakalarını rol simülasyonu ile çözmek harikaydı.'
  },
  {
    courseName: 'Çoklu Mağaza Operasyon Yönetimi & Liderlik',
    ratingScore: 4.96,
    satisfactionRate: 99.2,
    evaluatedStudentCount: 18,
    topStudentFeedback: 'Üst düzey yöneticilik ve ciro artırma stratejilerinde ufkumuzu açtı.'
  },
  {
    courseName: 'Taze Gıda & Hijyen Standartları Ustalığı',
    ratingScore: 4.85,
    satisfactionRate: 96.5,
    evaluatedStudentCount: 25,
    topStudentFeedback: 'Soğuk zincir ve fire önleme konularında pratik ipuçları çok faydalıydı.'
  }
];

interface StudentTestimonial {
  studentName: string;
  studentRole: string;
  courseName: string;
  rating: number;
  date: string;
  comment: string;
}

const STUDENT_TESTIMONIALS: StudentTestimonial[] = [
  {
    studentName: 'Selin Yılmaz',
    studentRole: 'Kadıköy Şube Müdür Yrd.',
    courseName: 'P&L Mağaza Bütçe Yönetimi',
    rating: 5.0,
    date: '14 Mayıs 2025',
    comment: 'Ahmet Bey sayesinde şubemizdeki P&L sapmalarını anında tespit eder hale geldik. Eğitimdeki vaka simülasyonları gerçek sahayla %100 uyumlu.'
  },
  {
    studentName: 'Ahmet Can Demir',
    studentRole: 'Beşiktaş Kasa Şefi',
    courseName: 'Kasiyer Kriz Yönetimi',
    rating: 4.9,
    date: '20 Ocak 2025',
    comment: 'Kasa hattı krizlerinde müşteriyi sakinleştirme teknikleri harikaydı. 12 yeni kasiyerimize bu yöntemleri öğrettim.'
  },
  {
    studentName: 'Caner Kaya',
    studentRole: 'Tunalı Mağaza Müdürü',
    courseName: 'Çoklu Mağaza Liderliği',
    rating: 5.0,
    date: '15 Temmuz 2024',
    comment: 'Mağazamızın ₺24.8M ciroya ulaşmasında Ahmet Hocamızın stratejik mentorluk seanslarının katkısı çok büyüktür.'
  }
];

interface SwotRecord {
  id: string;
  studentName: string;
  deptName: string;
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
  createdAt: string;
}

export default function SwotAnalizPage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'STUDENT_SWOT' | 'TRAINER_SWOT'>(
    tabParam === 'trainer' ? 'TRAINER_SWOT' : 'STUDENT_SWOT'
  );

  useEffect(() => {
    if (tabParam === 'trainer') {
      setActiveTab('TRAINER_SWOT');
    } else if (tabParam === 'student') {
      setActiveTab('STUDENT_SWOT');
    }
  }, [tabParam]);

  // Student SWOT State
  const [selectedStudentId, setSelectedStudentId] = useState<string>(ENROLLED_STUDENTS[0].id);
  const [customStudentName, setCustomStudentName] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState(ENROLLED_STUDENTS[0].deptId);

  const [strengths, setStrengths] = useState(ENROLLED_STUDENTS[0].strengths);
  const [weaknesses, setWeaknesses] = useState(ENROLLED_STUDENTS[0].weaknesses);
  const [opportunities, setOpportunities] = useState(ENROLLED_STUDENTS[0].opportunities);
  const [threats, setThreats] = useState(ENROLLED_STUDENTS[0].threats);

  const [records, setRecords] = useState<SwotRecord[]>([
    {
      id: 'swot_1',
      studentName: 'Selin Yılmaz',
      deptName: 'Mağaza Müdürleri',
      strengths: 'P&L Kar-Zarar hesaplamalarında son derece hızlı. Ekip koçluğunda başarılı.',
      weaknesses: 'Yoğun kampanya günlerinde dijital stok sayımında erteleme yapabiliyor.',
      opportunities: 'Bölge Müdürü aday adayı.',
      threats: 'Aşırı iş yükünde zaman yönetimi riski.',
      createdAt: '2026-08-14'
    },
    {
      id: 'swot_2',
      studentName: 'Ahmet Can Demir',
      deptName: 'Kasiyerler',
      strengths: 'Kasa işlem hızı mükemmel. Hijyen ve müşteri kriz yönetiminde usta.',
      weaknesses: 'Reyon irsaliye kayıtlarında eksik tecrübe.',
      opportunities: 'Müdür Yardımcılığı terfi adaylığı.',
      threats: 'Aşırı efordan tükenmişlik riski.',
      createdAt: '2026-08-13'
    }
  ]);

  const handleSelectStudentChange = (id: string) => {
    setSelectedStudentId(id);
    if (id === 'CUSTOM') {
      setCustomStudentName('');
      return;
    }

    const student = ENROLLED_STUDENTS.find((s) => s.id === id);
    if (student) {
      setSelectedDeptId(student.deptId);
      setStrengths(student.strengths);
      setWeaknesses(student.weaknesses);
      setOpportunities(student.opportunities);
      setThreats(student.threats);
    }
  };

  const activeStudent = ENROLLED_STUDENTS.find((s) => s.id === selectedStudentId);
  const currentStudentName = selectedStudentId === 'CUSTOM' ? customStudentName : (activeStudent?.name || 'Öğrenci');
  const activeDept = DEPARTMENTS_DATA.find((d) => d.id === selectedDeptId) || DEPARTMENTS_DATA[0];

  const handleSaveSwot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStudentName) {
      alert('Lütfen değerlendirilecek bir öğrenci seçin veya ad soyad girin.');
      return;
    }

    const newRecord: SwotRecord = {
      id: `swot_${Date.now()}`,
      studentName: currentStudentName,
      deptName: activeDept.name,
      strengths,
      weaknesses,
      opportunities,
      threats,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setRecords([newRecord, ...records]);
    alert(`${currentStudentName} isimli öğrencinin SWOT Analizi başarıyla kaydedildi!`);
  };

  const handleAssignCourse = (courseTitle: string) => {
    alert(`"${courseTitle}" eğitimi ${currentStudentName} isimli öğrencinin hesabına eğitmen tarafından atandı.`);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      
      {/* Header & Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full w-fit mb-1">
            <Target className="h-3.5 w-3.5" />
            <span>Öğrenci &amp; Eğitmen Gelişim SWOT Analiz Motoru</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#0B2A4A]">
            Perakende Akademi SWOT Analizi &amp; Değerlendirme Portalı
          </h2>
          <p className="text-xs text-gray-500 font-light mt-0.5">
            İster öğrencilerinizi değerlendirin, ister öğrencilerinizin ders bazlı siz Eğitmeni puanladığı SWOT ve memnuniyet karnesini inceleyin.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center space-x-2 bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
          <button
            onClick={() => setActiveTab('STUDENT_SWOT')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'STUDENT_SWOT'
                ? 'bg-[#0B2A4A] text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
            }`}
          >
            👨‍🎓 Öğrenci SWOT Analizi (Siz Değerlendirin)
          </button>
          <button
            onClick={() => setActiveTab('TRAINER_SWOT')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'TRAINER_SWOT'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
            }`}
          >
            ⭐ Eğitmen SWOT Analizi (Öğrencilerin Puanları)
          </button>
        </div>
      </div>

      {/* 🔴 TAB 1: ÖĞRENCİ SWOT ANALİZİ */}
      {activeTab === 'STUDENT_SWOT' && (
        <div className="space-y-6">
          <form onSubmit={handleSaveSwot} className="space-y-6">
            {/* Student & Department Selection Header Box */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
              
              {/* ENROLLED STUDENTS SELECT DROPDOWN */}
              <div className="space-y-1">
                <label className="block text-[#0B2A4A] flex items-center space-x-1.5">
                  <UserCheck className="h-4 w-4 text-[#087F96]" />
                  <span>Değerlendirilecek Öğrenci Seçin (Eğitmeninizin Kursiyerleri):</span>
                </label>

                <select
                  value={selectedStudentId}
                  onChange={(e) => handleSelectStudentChange(e.target.value)}
                  className="w-full p-3 bg-gray-50 border-2 border-[#087F96]/30 hover:border-[#087F96] rounded-xl text-xs text-[#0B2A4A] font-bold focus:ring-2 focus:ring-[#087F96] outline-none transition-all cursor-pointer shadow-xs"
                >
                  {ENROLLED_STUDENTS.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} — {st.role} ({st.courseName})
                    </option>
                  ))}
                  <option value="CUSTOM">+ Diğer / Manuel Öğrenci Adı Girin...</option>
                </select>

                {selectedStudentId === 'CUSTOM' && (
                  <input
                    type="text"
                    required
                    value={customStudentName}
                    onChange={(e) => setCustomStudentName(e.target.value)}
                    placeholder="Örn: Mehmet Yılmaz"
                    className="w-full mt-2 p-2.5 bg-white border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none font-medium"
                  />
                )}

                {activeStudent && selectedStudentId !== 'CUSTOM' && (
                  <div className="pt-1.5 text-[10px] text-[#087F96] font-semibold flex items-center space-x-1">
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span>Aktif Kurs: {activeStudent.courseName}</span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-[#0B2A4A] flex items-center space-x-1.5">
                  <Building2 className="h-4 w-4 text-[#087F96]" />
                  <span>Öğrencinin Kadrosu / Departmanı (26 Kadro):</span>
                </label>
                <select
                  value={selectedDeptId}
                  onChange={(e) => setSelectedDeptId(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none font-bold"
                >
                  {DEPARTMENTS_DATA.map((d) => (
                    <option key={d.id} value={d.id}>{d.name} ({d.category})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 📚 KİŞİNİN ALDIĞI EĞİTİMLER (SÜRE, SINAV NOTU & TAMAMLAMA TARİHİ) */}
            {activeStudent && activeStudent.completedCourses && activeStudent.completedCourses.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="font-display font-bold text-base text-[#0B2A4A] flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-[#087F96]" />
                    <span>{activeStudent.name} Tarafından Tamamlanan Kurum İçi Eğitimler:</span>
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-[#087F96] bg-[#DDF4F7] px-2.5 py-1 rounded-full">
                    {activeStudent.completedCourses.length} Eğitim Tamamlandı
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  {activeStudent.completedCourses.map((crs, idx) => (
                    <div key={idx} className="p-3.5 bg-[#F8FAFC] rounded-xl border border-gray-200 space-y-2 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="font-bold text-[#0B2A4A] leading-snug">{crs.title}</div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md inline-block">
                          {crs.grade}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-gray-200 space-y-1 text-[10px] text-gray-600 font-mono">
                        <div className="flex justify-between items-center">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-[#087F96]" />
                            <span>{crs.durationHours} Saat</span>
                          </span>
                          <span className="font-black text-emerald-600">Sınav Notu: %{crs.score}</span>
                        </div>

                        <div className="flex items-center space-x-1 text-gray-500 pt-0.5">
                          <Calendar className="h-3 w-3 text-amber-600" />
                          <span>Tamamlama: {crs.completedDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 🎯 EĞİTMENİN KİŞİ HAKKINDA ÖNERDİĞİ EĞİTİMLER LİSTESİ */}
            {activeStudent && activeStudent.recommendedCourses && activeStudent.recommendedCourses.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="font-display font-bold text-base text-[#0B2A4A] flex items-center space-x-2">
                    <Target className="h-5 w-5 text-amber-600" />
                    <span>Eğitmenin {activeStudent.name} Hakkında Önerdiği Gelişim Eğitimleri:</span>
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                    {activeStudent.recommendedCourses.length} Eğitim Önerisi
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {activeStudent.recommendedCourses.map((rc, rIdx) => (
                    <div key={rIdx} className="p-4 bg-[#F8FAFC] rounded-xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 flex-wrap gap-1">
                          <span className="font-bold text-[#0B2A4A] text-sm">{rc.title}</span>
                          <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-extrabold border ${rc.priorityColor}`}>
                            {rc.priority}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-600">{rc.reason}</p>
                        <div className="text-[10px] text-emerald-700 font-semibold">
                          ⚡ Yetkinlik Katkısı: {rc.skillImpact}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-200">
                        <span className="text-[10px] text-gray-500 font-mono flex items-center space-x-1">
                          <Clock className="h-3.5 w-3.5 text-[#087F96]" />
                          <span>{rc.durationHours} Saat</span>
                        </span>

                        <button
                          type="button"
                          onClick={() => handleAssignCourse(rc.title)}
                          className="px-3.5 py-2 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl text-[11px] cursor-pointer shadow-sm flex items-center space-x-1.5 transition-all"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Eğitimi Öğrenciye Ata</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4-Quadrant SWOT Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 1. STRENGTHS (Güçlü Yönler) */}
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center space-x-2 text-emerald-800">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-display font-extrabold text-base">
                    1. GÜÇLÜ YÖNLER (Strengths)
                  </h3>
                </div>
                <p className="text-[11px] text-emerald-700 font-light">
                  Öğrencinin sahada ve sınavlarda öne çıkan en güçlü yetkinlikleri.
                </p>
                <textarea
                  rows={4}
                  required
                  value={strengths}
                  onChange={(e) => setStrengths(e.target.value)}
                  placeholder="Örn: P&L marj analizi çok yüksek, iletişim yeteneği güçlü..."
                  className="w-full p-3 bg-white border border-emerald-300 rounded-xl text-xs text-gray-800 outline-none focus:ring-2 focus:ring-emerald-500 resize-none font-medium"
                />
              </div>

              {/* 2. WEAKNESSES (Zayıf Yönler) */}
              <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center space-x-2 text-amber-800">
                  <ShieldAlert className="h-5 w-5 text-amber-600" />
                  <h3 className="font-display font-extrabold text-base">
                    2. ZAYIF YÖNLER (Weaknesses)
                  </h3>
                </div>
                <p className="text-[11px] text-amber-700 font-light">
                  Geliştirilmesi gereken ve takibi icap eden eksik alanlar.
                </p>
                <textarea
                  rows={4}
                  required
                  value={weaknesses}
                  onChange={(e) => setWeaknesses(e.target.value)}
                  placeholder="Örn: Stok sayımında zamanlama aksaması, heyecan yönetimi..."
                  className="w-full p-3 bg-white border border-amber-300 rounded-xl text-xs text-gray-800 outline-none focus:ring-2 focus:ring-amber-500 resize-none font-medium"
                />
              </div>

              {/* 3. OPPORTUNITIES (Fırsatlar) */}
              <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center space-x-2 text-blue-800">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <h3 className="font-display font-extrabold text-base">
                    3. FIRSATLAR (Opportunities)
                  </h3>
                </div>
                <p className="text-[11px] text-blue-700 font-light">
                  Öğrenci için terfi, yetkinlik artırma ve kariyer sıçraması fırsatları.
                </p>
                <textarea
                  rows={4}
                  required
                  value={opportunities}
                  onChange={(e) => setOpportunities(e.target.value)}
                  placeholder="Örn: Bölge Müdürlüğü veya Reyon Şefliği adaylığı..."
                  className="w-full p-3 bg-white border border-blue-300 rounded-xl text-xs text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 resize-none font-medium"
                />
              </div>

              {/* 4. THREATS (Tehditler) */}
              <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center space-x-2 text-rose-800">
                  <AlertTriangle className="h-5 w-5 text-rose-600" />
                  <h3 className="font-display font-extrabold text-base">
                    4. TEHDİTLER (Threats)
                  </h3>
                </div>
                <p className="text-[11px] text-rose-700 font-light">
                  Gelişimi engelleyebilecek dışsal veya motivasyonel risk faktörleri.
                </p>
                <textarea
                  rows={4}
                  required
                  value={threats}
                  onChange={(e) => setThreats(e.target.value)}
                  placeholder="Örn: Aşırı iş yükü altında tükenmişlik riski..."
                  className="w-full p-3 bg-white border border-rose-300 rounded-xl text-xs text-gray-800 outline-none focus:ring-2 focus:ring-rose-500 resize-none font-medium"
                />
              </div>

            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer"
            >
              <Save className="h-5 w-5" />
              <span>SWOT Analizini Kaydet ve {currentStudentName} Dosyasına İşle</span>
            </button>
          </form>

          {/* Previously Saved SWOT Records */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
            <h3 className="font-display font-bold text-lg text-[#0B2A4A] border-b border-gray-100 pb-3">
              Geçmiş SWOT Analizi Kayıtları ({records.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {records.map((rec) => (
                <div key={rec.id} className="bg-[#F8FAFC] p-4 rounded-xl border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <strong className="font-display font-bold text-sm text-[#0B2A4A]">{rec.studentName}</strong>
                    <span className="text-[10px] font-bold text-[#087F96] bg-[#DDF4F7] px-2 py-0.5 rounded-full">
                      {rec.deptName}
                    </span>
                  </div>

                  <div className="space-y-1 text-gray-700 text-[11px] font-light">
                    <p><strong className="text-emerald-700 font-bold">Güçlü Yönler:</strong> {rec.strengths}</p>
                    <p><strong className="text-amber-700 font-bold">Zayıf Yönler:</strong> {rec.weaknesses}</p>
                    <p><strong className="text-blue-700 font-bold">Fırsatlar:</strong> {rec.opportunities}</p>
                    <p><strong className="text-rose-700 font-bold">Tehditler:</strong> {rec.threats}</p>
                  </div>

                  <div className="text-[10px] text-gray-400 font-mono pt-1 text-right">
                    Tarih: {rec.createdAt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 👑 TAB 2: EĞİTMEN SWOT ANALİZİ & KURSİYER DEĞERLENDİRMELERİ */}
      {activeTab === 'TRAINER_SWOT' && (
        <div className="space-y-6">
          
          {/* Trainer Overview Card */}
          <div className="bg-[#0B2A4A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-400/40 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
                  AY
                </div>
                <div>
                  <div className="flex items-center space-x-2 flex-wrap gap-1">
                    <h3 className="font-bold text-xl text-white">Dr. Ahmet Yılmaz</h3>
                    <span className="px-2.5 py-0.5 bg-amber-400/20 text-amber-300 font-mono text-[10px] font-bold rounded-lg border border-amber-400/30">
                      KIDEMLİ PERAKENDE &amp; P&amp;L EĞİTMENİ
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">
                    PKA Akademi Lider Eğitmeni • 148 Öğrenci Tarafından Değerlendirildi
                  </p>
                </div>
              </div>

              <div className="bg-[#061B33] p-4 rounded-2xl border border-amber-400/30 text-center shrink-0 w-full sm:w-auto">
                <span className="text-[10px] text-gray-400 font-mono uppercase block">Genel Eğitmen Değerlendirme Skoru</span>
                <div className="flex items-center justify-center space-x-1.5 text-2xl font-black text-amber-400 mt-0.5">
                  <Star className="h-6 w-6 text-amber-400 fill-amber-400" />
                  <span>4.92 / 5.0</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">%98.4 Kursiyer Memnuniyeti</span>
              </div>
            </div>
          </div>

          {/* 📊 HANGİ EĞİTİMDE HANGİ PUANI ALDI (DERS BAZLI ÖĞRENCİ DEĞERLENDİRME SKORLARI) */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-display font-bold text-base text-[#0B2A4A] flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-[#087F96]" />
                <span>Eğitim Programı Bazında Kursiyer Değerlendirme Puanları &amp; Notları:</span>
              </h3>
              <span className="text-[10px] font-mono font-bold text-[#087F96] bg-[#DDF4F7] px-2.5 py-1 rounded-full">
                4 Aktif Program Değerlendirildi
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {TRAINER_COURSE_RATINGS.map((cr, idx) => (
                <div key={idx} className="p-4 bg-[#F8FAFC] rounded-2xl border border-gray-200 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="font-bold text-[#0B2A4A] text-sm leading-snug">{cr.courseName}</div>
                      <span className="text-[10px] text-gray-500 font-mono">{cr.evaluatedStudentCount} Kursiyer Değerlendirdi</span>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-center shrink-0">
                      <div className="flex items-center space-x-1 text-amber-700 font-black text-sm">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <span>{cr.ratingScore}</span>
                      </div>
                      <span className="text-[9px] text-emerald-700 font-bold block">%{cr.satisfactionRate} Uyum</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-gray-200 text-gray-700 italic text-[11px] leading-relaxed">
                    "{cr.topStudentFeedback}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🟢 ÖĞRENCİ GERİ BİLDİRİMLERİNE DAYALI EĞİTMEN SWOT MATRİSİ */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base text-[#0B2A4A] border-b border-gray-100 pb-3 flex items-center space-x-2">
              <Crown className="h-5 w-5 text-amber-500" />
              <span>Öğrenci Değerlendirmelerine Göre Eğitmen SWOT Matrisi (Dr. Ahmet Yılmaz):</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Güçlü Yönler (S) */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-800">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  <h4 className="font-display font-extrabold text-sm uppercase">1. GÜÇLÜ YÖNLER (Strengths)</h4>
                </div>
                <ul className="space-y-2 text-xs text-emerald-950 font-medium">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Vaka analizlerini gerçek perakende saha örnekleriyle zenginleştirme yeteneği (%99 öğrenci onayı).</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Birebir mentorluk randevularında yüksek ilgi, sabırlı anlatım ve motive edici geri bildirim tarzı.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>P&amp;L ve finansal bütçeleme formüllerini anlaşılır ve akılda kalıcı pratik yöntemlerle aktarma başarısı.</span>
                  </li>
                </ul>
              </div>

              {/* Gelişim Alanları (W) */}
              <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center space-x-2 text-amber-800">
                  <ShieldAlert className="h-5 w-5 text-amber-600" />
                  <h4 className="font-display font-extrabold text-sm uppercase">2. GELİŞİM ALANLARI (Weaknesses)</h4>
                </div>
                <ul className="space-y-2 text-xs text-amber-950 font-medium">
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Dersteki canlı vaka tartışmaları uzadığında soru-cevap süreleri biraz kısıtlanabiliyor.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Dijital sunum slaytlarında daha fazla video simülasyonu ve interaktif anket beklentisi bulunuyor.</span>
                  </li>
                </ul>
              </div>

              {/* Fırsatlar (O) */}
              <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center space-x-2 text-blue-800">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <h4 className="font-display font-extrabold text-sm uppercase">3. FIRSATLAR (Opportunities)</h4>
                </div>
                <ul className="space-y-2 text-xs text-blue-950 font-medium">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Bölge Müdürlüğü terfi adaylarına özel "Birebir Executive Liderlik Koçluğu" atölyesi açılması.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Şirket geneli için haftalık "Eğitmene Sor" canlı yayın soru-cevap saatleri düzenleme imkânı.</span>
                  </li>
                </ul>
              </div>

              {/* Tehditler (T) */}
              <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center space-x-2 text-rose-800">
                  <AlertTriangle className="h-5 w-5 text-rose-600" />
                  <h4 className="font-display font-extrabold text-sm uppercase">4. RISK KONTROLÜ &amp; TEHDİTLER (Threats)</h4>
                </div>
                <ul className="space-y-2 text-xs text-rose-950 font-medium">
                  <li className="flex items-start space-x-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>Yoğun kurumsal eğitim takviminden dolayı birebir mentorluk randevu kotasının çabuk dolması.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* 💬 DETAYLI KURSİYER DEĞERLENDİRME & YORUM KARNESİ */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base text-[#0B2A4A] border-b border-gray-100 pb-3 flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-[#087F96]" />
              <span>Son Gerçekleşen Kursiyer Değerlendirmeleri ve Detaylı Yorumlar:</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {STUDENT_TESTIMONIALS.map((st, sIdx) => (
                <div key={sIdx} className="p-4 bg-[#F8FAFC] rounded-2xl border border-gray-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0B2A4A] text-sm">{st.studentName}</span>
                      <div className="flex items-center space-x-1 text-amber-500 font-black">
                        <Star className="h-3.5 w-3.5 fill-amber-500" />
                        <span>{st.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-[#087F96] font-semibold">{st.studentRole}</div>
                    <div className="text-[10px] text-gray-500 font-mono">Ders: {st.courseName}</div>
                    <p className="text-gray-700 italic text-[11px] leading-relaxed bg-white p-3 rounded-xl border border-gray-200">
                      "{st.comment}"
                    </p>
                  </div>

                  <div className="text-[10px] text-gray-400 font-mono pt-2 border-t border-gray-200 text-right">
                    Tarih: {st.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
