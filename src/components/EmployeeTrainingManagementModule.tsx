'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  Award, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  Target, 
  Building2, 
  Calendar, 
  Star, 
  ArrowRight, 
  FileText, 
  X, 
  Zap, 
  ShieldCheck, 
  Layers, 
  BadgeCheck, 
  UserCheck
} from 'lucide-react';

interface EmployeeRecord {
  id: string;
  name: string;
  currentPosition: string;
  store: string;
  competencyScore: number;
  workDuration: string; // Çalışma Süresi (Kıdem)
  nextTargetCareer: string; // En Yakın Ulaşacağı Kariyer
  estimatedTime: string; // Tahmini Ulaşma Süresi
  completedModules: number;
  totalModules: number;
  readinessRate: number; // % Match / Uyum
  status: 'TERFIYE_YAKIN' | 'GELISIMDE' | 'YENI_BASLAYAN';
  assignedCourses: string[];
}

const INITIAL_EMPLOYEES: EmployeeRecord[] = [
  {
    id: 'EMP-201',
    name: 'Selin Yılmaz',
    currentPosition: 'Mağaza Müdür Yardımcısı',
    store: 'İstanbul - Kadıköy Premium',
    competencyScore: 96,
    workDuration: '3 Yıl 8 Ay',
    nextTargetCareer: 'Mağaza Müdürü',
    estimatedTime: '30 Gün',
    completedModules: 18,
    totalModules: 20,
    readinessRate: 94,
    status: 'TERFIYE_YAKIN',
    assignedCourses: [
      'P&L Mağaza Bütçe Yönetimi',
      'Ekip Liderliği & Süreç Yönetimi',
      'Fire Minimizasyonu & Marj Artırımı',
      'Kriz Yönetimi & Saha Audit'
    ]
  },
  {
    id: 'EMP-202',
    name: 'Ahmet Can Demir',
    currentPosition: 'Kasa Şefi / Kıdemli Kasiyer',
    store: 'İstanbul - Beşiktaş Çarşı',
    competencyScore: 94,
    workDuration: '2 Yıl 4 Ay',
    nextTargetCareer: 'Mağaza Müdür Yardımcısı',
    estimatedTime: '45 Gün',
    completedModules: 15,
    totalModules: 16,
    readinessRate: 91,
    status: 'TERFIYE_YAKIN',
    assignedCourses: [
      'Kasa Sistemleri & Gün Sonu Mutabakatı',
      'Müşteri İlişkileri & Şikayet Yönetimi',
      'Reyon Düzeni & 5S Protokolü',
      'Aday Personel Oryantasyon Eğitmenliği'
    ]
  },
  {
    id: 'EMP-203',
    name: 'Merve Şahin',
    currentPosition: 'Taze Gıda Reyon Sorumlusu',
    store: 'İzmir - Alsancak Hiper',
    competencyScore: 92,
    workDuration: '2 Yıl 1 Ay',
    nextTargetCareer: 'Manav & Taze Gıda Kategori Şefi',
    estimatedTime: '60 Gün',
    completedModules: 14,
    totalModules: 15,
    readinessRate: 88,
    status: 'TERFIYE_YAKIN',
    assignedCourses: [
      'Soğuk Zincir ve Saklama Koşulları',
      'FIFO Stok Devir ve Fire Önleme',
      'Taze Gıda Ürün Kabul ve Kalite Standartları',
      'Kategori Marjı & Fiyatlandırma'
    ]
  },
  {
    id: 'EMP-204',
    name: 'Caner Kaya',
    currentPosition: 'Mağaza Müdürü',
    store: 'Ankara - Tunalı Hilmi',
    competencyScore: 95,
    workDuration: '4 Yıl 6 Ay',
    nextTargetCareer: 'Bölge Müdürü (İç Anadolu)',
    estimatedTime: '60 Gün',
    completedModules: 24,
    totalModules: 25,
    readinessRate: 95,
    status: 'TERFIYE_YAKIN',
    assignedCourses: [
      'Çoklu Mağaza Operasyon Yönetimi',
      'Bölgesel Ciro ve Pazar Payı Stratejileri',
      'Yöneticinin Koçluk Rolü',
      'Bölge İK ve Yetenek Yedekleme'
    ]
  },
  {
    id: 'EMP-205',
    name: 'Zeynep Arslan',
    currentPosition: 'Reyon Görevlisi',
    store: 'Bursa - Nilüfer Süper',
    competencyScore: 84,
    workDuration: '1 Yıl 3 Ay',
    nextTargetCareer: 'Kasa Şefi Adayı',
    estimatedTime: '90 Gün',
    completedModules: 10,
    totalModules: 14,
    readinessRate: 78,
    status: 'GELISIMDE',
    assignedCourses: [
      'Kasa Önü Çapraz Satış Teknikleri',
      'Barkod ve Fiyat Etiketi Kontrolü',
      'Müşteri Karşılama ve Uyuşmazlık Yönetimi'
    ]
  },
  {
    id: 'EMP-206',
    name: 'Burak Çelik',
    currentPosition: 'Lojistik & Depo Sorumlusu',
    store: 'Antalya - Muratpaşa',
    competencyScore: 86,
    workDuration: '1 Yıl 9 Ay',
    nextTargetCareer: 'Depo & Mal Kabul Şefi',
    estimatedTime: '90 Gün',
    completedModules: 11,
    totalModules: 15,
    readinessRate: 80,
    status: 'GELISIMDE',
    assignedCourses: [
      'Ergonomik Yük Taşıma & İş Güvenliği',
      'İrsaliye ve İade Faturası Kontrolü',
      'Stok Sayım & Envanter Doğrulama'
    ]
  },
  {
    id: 'EMP-207',
    name: 'Elif Yıldız',
    currentPosition: 'Yeni Başlayan Kasiyer (Onboarding)',
    store: 'İstanbul - Levent Express',
    competencyScore: 68,
    workDuration: '3 Ay',
    nextTargetCareer: 'Kıdemli Kasiyer',
    estimatedTime: '120 Gün',
    completedModules: 4,
    totalModules: 12,
    readinessRate: 55,
    status: 'YENI_BASLAYAN',
    assignedCourses: [
      'Perakende Temel Etik ve Şirket Kültürü',
      'POS Cihazı ve Kasa Temel Kullanımı',
      'İş Sağlığı ve Güvenliği Onboarding'
    ]
  },
  {
    id: 'EMP-208',
    name: 'Emre Öztürk',
    currentPosition: 'Yeni Başlayan Reyon Görevlisi',
    store: 'Eskişehir - Tepebaşı',
    competencyScore: 65,
    workDuration: '2 Ay',
    nextTargetCareer: 'Reyon Sorumlusu Adayı',
    estimatedTime: '150 Gün',
    completedModules: 3,
    totalModules: 12,
    readinessRate: 50,
    status: 'YENI_BASLAYAN',
    assignedCourses: [
      '5S Mağaza İçi Düzen Standartları',
      'Ürün Etiketleme ve STT Kontrolü',
      'Müşteri Yönlendirme ve Güler Yüz Protocol'
    ]
  }
];

export default function EmployeeTrainingManagementModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'TERFIYE_YAKIN' | 'GELISIMDE' | 'YENI_BASLAYAN'>('ALL');
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeRecord | null>(null);

  const filteredEmployees = INITIAL_EMPLOYEES.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.currentPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.nextTargetCareer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.store.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'ALL' || emp.status === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 my-6">
      
      {/* HERO HEADER SECTION */}
      <div className="bg-gradient-to-br from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#087F96]/40 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-amber-400/30">
              <Users className="h-4 w-4" />
              <span>ÇALIŞAN EĞİTİM &amp; KARİYER GELİŞİM SİSTEMİ</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
              Çalışan Eğitim Yönetimi &amp; Kariyer Yolculuğu
            </h1>

            <p className="text-xs sm:text-sm text-gray-200 font-light leading-relaxed">
              Tüm perakende kadronuzun yetkinlik puanlarını, şirket içi çalışma sürelerini, eğitim tamamlama durumlarını ve <strong>en yakın ulaşacakları hedef kariyer adımlarını</strong> tek bir merkezden anlık takip edin.
            </p>
          </div>

          <Link
            href="/kurumsal-fiyatlandirma"
            className="px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-2xl shadow-xl transition-all inline-flex items-center space-x-2 text-xs border border-amber-300 shrink-0"
          >
            <Sparkles className="h-4 w-4 fill-current" />
            <span>Kurumsal Teklif Alın</span>
          </Link>
        </div>

        {/* 4 SUMMARY STAT CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
          <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-1">
            <div className="text-gray-300 font-sans font-medium text-[11px]">Takip Edilen Çalışan</div>
            <div className="text-2xl font-black text-white">1,420 Personel</div>
            <div className="text-[10px] text-cyan-300 font-sans">Canlı sistem kayıtları</div>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-1">
            <div className="text-gray-300 font-sans font-medium text-[11px]">Terfiye En Yakın (+90p)</div>
            <div className="text-2xl font-black text-emerald-300">285 Aday</div>
            <div className="text-[10px] text-emerald-200 font-sans">Hazır yedek yönetici kadrosu</div>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-1">
            <div className="text-gray-300 font-sans font-medium text-[11px]">Ortalama Terfi Süresi</div>
            <div className="text-2xl font-black text-amber-300">65 Gün</div>
            <div className="text-[10px] text-amber-200 font-sans">Eğitim tamamlama süresi</div>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-1">
            <div className="text-gray-300 font-sans font-medium text-[11px]">Eğitim Tamamlama Oranı</div>
            <div className="text-2xl font-black text-purple-300">%94.2</div>
            <div className="text-[10px] text-purple-200 font-sans">Mobil LMS tamamlama başarısı</div>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH CONTROLS */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto text-xs font-bold bg-gray-50 p-1.5 rounded-2xl border border-gray-200">
            {[
              { id: 'ALL', label: 'Tüm Çalışanlar', count: INITIAL_EMPLOYEES.length },
              { id: 'TERFIYE_YAKIN', label: '🏆 Terfiye En Yakın (+90p)', count: INITIAL_EMPLOYEES.filter(e => e.status === 'TERFIYE_YAKIN').length },
              { id: 'GELISIMDE', label: '📊 Gelişim Sürecindekiler (70-89p)', count: INITIAL_EMPLOYEES.filter(e => e.status === 'GELISIMDE').length },
              { id: 'YENI_BASLAYAN', label: '🌱 Yeni Başlayanlar (Onboarding)', count: INITIAL_EMPLOYEES.filter(e => e.status === 'YENI_BASLAYAN').length }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveCategory(f.id as any)}
                className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeCategory === f.id
                    ? 'bg-[#0B2A4A] text-white shadow-xs font-extrabold'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.label} ({f.count})
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Çalışan adı, pozisyon veya mağaza ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 font-medium focus:outline-none focus:border-[#087F96] w-full md:w-72"
            />
          </div>

        </div>

        {/* MAIN EMPLOYEE LIST TABLE */}
        <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-sm bg-white">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0B2A4A] text-white font-mono font-bold uppercase tracking-wider">
                <th className="p-4 border-r border-white/10">Çalışan Adı &amp; Mağaza</th>
                <th className="p-4 border-r border-white/10">Mevcut Pozisyon</th>
                <th className="p-4 border-r border-white/10 text-center">Yetkinlik Puanı</th>
                <th className="p-4 border-r border-white/10 text-center">Çalışma Süresi (Kıdem)</th>
                <th className="p-4 border-r border-white/10">En Yakın Ulaşacağı Kariyer</th>
                <th className="p-4 border-r border-white/10 text-center">Tahmini Ulaşma Süresi</th>
                <th className="p-4 text-center">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400 font-medium">
                    Arama kriterinize uygun çalışan kaydı bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50/80 transition-colors">
                    
                    {/* Column 1: Çalışan Adı & Mağaza */}
                    <td className="p-4">
                      <div className="font-black text-[#0B2A4A] text-sm flex items-center space-x-2">
                        <UserCheck className="h-4 w-4 text-[#087F96] shrink-0" />
                        <span>{emp.name}</span>
                      </div>
                      <div className="text-[11px] text-gray-500 font-sans pl-6">{emp.store}</div>
                    </td>

                    {/* Column 2: Pozisyon */}
                    <td className="p-4">
                      <span className="bg-gray-100 text-gray-800 font-bold px-2.5 py-1 rounded-lg text-[11px] border border-gray-200">
                        {emp.currentPosition}
                      </span>
                    </td>

                    {/* Column 3: Yetkinlik Puanı */}
                    <td className="p-4 text-center font-mono">
                      <span className={`px-2.5 py-1 rounded-lg font-black text-sm ${
                        emp.competencyScore >= 90 ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                        emp.competencyScore >= 80 ? 'bg-cyan-100 text-cyan-900 border border-cyan-300' :
                        'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        %{emp.competencyScore} Puan
                      </span>
                    </td>

                    {/* Column 4: Çalışma Süresi */}
                    <td className="p-4 text-center font-mono font-bold text-gray-700">
                      <div className="flex items-center justify-center space-x-1">
                        <Clock className="h-3.5 w-3.5 text-[#087F96]" />
                        <span>{emp.workDuration}</span>
                      </div>
                    </td>

                    {/* Column 5: En Yakın Ulaşacağı Kariyer */}
                    <td className="p-4">
                      <div className="font-black text-[#087F96] flex items-center space-x-1.5">
                        <Target className="h-4 w-4 text-amber-500 shrink-0" />
                        <span>{emp.nextTargetCareer}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono pl-5">
                        Terfi Uyum Skoru: %{emp.readinessRate}
                      </div>
                    </td>

                    {/* Column 6: Tahmini Ulaşma Süresi */}
                    <td className="p-4 text-center font-mono">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
                        emp.estimatedTime.includes('30') ? 'bg-emerald-500 text-white' :
                        emp.estimatedTime.includes('45') || emp.estimatedTime.includes('60') ? 'bg-amber-400 text-slate-950' :
                        'bg-blue-600 text-white'
                      }`}>
                        ⏱️ {emp.estimatedTime}
                      </span>
                    </td>

                    {/* Column 7: İşlem Button */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedEmployee(emp)}
                        className="px-3 py-1.5 bg-[#0B2A4A] hover:bg-[#061B33] text-white font-bold rounded-xl text-[11px] transition-colors flex items-center justify-center space-x-1 mx-auto"
                      >
                        <span>Eğitim Karnesi</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-500 flex items-center justify-between">
          <span>* Çalışan yetkinlik puanları teorik sınav notları (%40), saha denetim skorları (%40) ve yöneticinin 9 Box değerlendirmesinden (%20) otomatik hesaplanır.</span>
          <Link href="/kurumsal-fiyatlandirma" className="text-[#087F96] font-bold hover:underline flex items-center space-x-1">
            <span>Kurumsal Lisans Teklifi İste</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>

      {/* EMPLOYEE EDUCATION & CAREER DETAIL MODAL */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl border border-gray-200 animate-in fade-in duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-[#087F96]/10 text-[#087F96] rounded-2xl">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-[#0B2A4A]">
                    {selectedEmployee.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {selectedEmployee.currentPosition} • {selectedEmployee.store}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedEmployee(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-xl"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body Info Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200">
                <span className="text-[10px] text-gray-400 block font-sans">Yetkinlik Puanı:</span>
                <span className="text-lg font-black text-[#0B2A4A]">%{selectedEmployee.competencyScore} Puan</span>
              </div>

              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200">
                <span className="text-[10px] text-gray-400 block font-sans">Çalışma Süresi:</span>
                <span className="text-lg font-black text-[#087F96]">{selectedEmployee.workDuration}</span>
              </div>

              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
                <span className="text-[10px] text-emerald-800 block font-sans font-bold">Terfiye Kalan Süre:</span>
                <span className="text-lg font-black text-emerald-700">{selectedEmployee.estimatedTime}</span>
              </div>
            </div>

            {/* Target Career & Readiness Bar */}
            <div className="bg-cyan-50/70 p-4 rounded-2xl border border-cyan-200 space-y-2 text-xs">
              <div className="flex justify-between items-center font-bold text-[#0B2A4A]">
                <span className="flex items-center space-x-1.5">
                  <Target className="h-4 w-4 text-amber-500" />
                  <span>Hedef Kariyer Adımı: <strong>{selectedEmployee.nextTargetCareer}</strong></span>
                </span>
                <span className="text-[#087F96] font-mono">%{selectedEmployee.readinessRate} Hazır</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#087F96] h-full rounded-full transition-all duration-500"
                  style={{ width: `${selectedEmployee.readinessRate}%` }}
                />
              </div>
            </div>

            {/* Assigned Courses Checklist */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-[#0B2A4A] block">Tamamlanan ve Atanan Eğitim Modülleri:</span>
              <ul className="space-y-2">
                {selectedEmployee.assignedCourses.map((crs, cIdx) => (
                  <li key={cIdx} className="flex items-center space-x-2 bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{crs}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="px-5 py-2.5 bg-[#0B2A4A] text-white font-bold rounded-xl text-xs"
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
