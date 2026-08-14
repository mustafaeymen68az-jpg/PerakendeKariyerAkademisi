'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  ChevronRight, 
  Award, 
  Layers, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  LayoutGrid, 
  List as ListIcon, 
  Table as TableIcon,
  UserCheck,
  Video,
  FileText
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '@/data/departmentsData';
import CourseDetailModal, { DetailedCourse } from '@/components/CourseDetailModal';
import { getDetailedCourseData } from '@/data/courseDetailsData';
import { getInstructorForCourse, Instructor } from '@/data/instructorsData';
import { getCourseImage } from '@/data/courseImages';
import InstructorProfileModal from '@/components/InstructorProfileModal';

interface CourseItem {
  id: string;
  title: string;
  category: string;
  deptId: string;
  department: string;
  year: '1. Yıl' | '2. Yıl';
  duration: number; // hours
  position: string;
  level: 'Temel Seviye' | 'Görev Yetkinliği' | 'İleri Seviye' | 'Stratejik Yönetim';
  description: string;
  slug: string;
}

// Helper function to resolve exact top-level category name matching CATEGORY_LIST tabs
const resolveCategoryName = (dept: any, courseTitle: string): string => {
  const dId = (dept.id || '').toLowerCase();
  const dName = (dept.name || '').toLowerCase();
  const cat = (dept.category || '').toLowerCase();
  const title = (courseTitle || '').toLowerCase();

  if (dId.includes('satinalma') || dName.includes('satın alma') || title.includes('satın alma') || title.includes('kategori')) {
    return 'Satın Alma ve Kategori';
  }
  if (dId.includes('lojistik') || dId.includes('stok') || dName.includes('lojistik') || dName.includes('depo') || title.includes('lojistik') || title.includes('stok devir')) {
    return 'Lojistik ve Tedarik';
  }
  if (dId.includes('pazarlama') || dId.includes('satis') || dName.includes('pazarlama') || dName.includes('satış') || title.includes('pazarlama') || title.includes('merchandising') || title.includes('crm')) {
    return 'Satış ve Pazarlama';
  }
  if (dId.includes('ik') || dId.includes('insan-kaynaklari') || dName.includes('insan kaynak') || title.includes('insan kaynak') || title.includes('terfi') || title.includes('ise alim')) {
    return 'İnsan Kaynakları';
  }
  if (dId.includes('veri') || dId.includes('yazilim') || dId.includes('dijital') || cat.includes('teknoloji') || cat.includes('dijital') || title.includes('yapay zeka') || title.includes('prompt') || title.includes('sql') || title.includes('powerbi')) {
    return 'Dijitalleşme';
  }
  return 'Mağaza Yönetimi ve Operasyon';
};

// Generate complete catalog dataset dynamically from 26 DEPARTMENTS_DATA (200+ total courses)
const BUILD_FULL_CATALOG = (): CourseItem[] => {
  const courses: CourseItem[] = [];

  DEPARTMENTS_DATA.forEach((dept) => {
    // Year 1 Courses
    dept.year1Courses.forEach((cName, idx) => {
      const slug = cName
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      const resolvedCategory = resolveCategoryName(dept, cName);

      courses.push({
        id: `dept_${dept.id}_y1_${idx}`,
        title: cName,
        category: resolvedCategory,
        deptId: dept.id,
        department: dept.name,
        year: '1. Yıl',
        duration: 12 + idx * 4,
        position: dept.name,
        level: idx === 0 ? 'Temel Seviye' : 'Görev Yetkinliği',
        description: `${dept.name} pozisyonu için 1. yıl müfredatı kapsamındaki ${cName} eğitim modülü. ${dept.description}`,
        slug: slug || `egitim-${dept.id}-y1-${idx}`
      });
    });

    // Year 2 Courses
    dept.year2Courses.forEach((cName, idx) => {
      const slug = cName
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      const resolvedCategory = resolveCategoryName(dept, cName);

      courses.push({
        id: `dept_${dept.id}_y2_${idx}`,
        title: cName,
        category: resolvedCategory,
        deptId: dept.id,
        department: dept.name,
        year: '2. Yıl',
        duration: 20 + idx * 6,
        position: dept.name,
        level: idx >= 2 ? 'Stratejik Yönetim' : 'İleri Seviye',
        description: `${dept.name} pozisyonu için 2. yıl müfredatı kapsamındaki ${cName} eğitim modülü. ${dept.description}`,
        slug: slug || `egitim-${dept.id}-y2-${idx}`
      });
    });
  });

  return courses;
};

const ALL_COURSES = BUILD_FULL_CATALOG();

const CATEGORY_LIST = [
  'Tümü',
  'Mağaza Yönetimi ve Operasyon',
  'Satın Alma ve Kategori',
  'Lojistik ve Tedarik',
  'Satış ve Pazarlama',
  'İnsan Kaynakları',
  'Dijitalleşme'
];

function EgitimlerCatalogContent() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedDept, setSelectedDept] = useState('Tümü');
  const [selectedYear, setSelectedYear] = useState<'Tümü' | '1. Yıl' | '2. Yıl'>('Tümü');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');

  const [selectedCourseDetail, setSelectedCourseDetail] = useState<DetailedCourse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);

  // Helper to calculate total courses per category
  const getCategoryCount = (catName: string) => {
    if (catName === 'Tümü') return ALL_COURSES.length;
    return ALL_COURSES.filter((c) => c.category === catName).length;
  };

  // Sync with URL Search Parameters
  useEffect(() => {
    const deptParam = searchParams.get('dept');
    const catParam = searchParams.get('cat');

    if (deptParam) {
      setSelectedDept(deptParam);
      setSelectedCategory('Tümü');
    }
    if (catParam) {
      setSelectedDept('Tümü');
      if (catParam === 'dijitallestirme') setSelectedCategory('Dijitalleşme');
      else if (catParam === 'magaza') setSelectedCategory('Mağaza Yönetimi ve Operasyon');
      else if (catParam === 'satinalma') setSelectedCategory('Satın Alma ve Kategori');
      else if (catParam === 'lojistik') setSelectedCategory('Lojistik ve Tedarik');
      else if (catParam === 'satis') setSelectedCategory('Satış ve Pazarlama');
      else if (catParam === 'ik') setSelectedCategory('İnsan Kaynakları');
    }
  }, [searchParams]);

  // Filter Catalog Courses
  const filteredCourses = useMemo(() => {
    return ALL_COURSES.filter((course) => {
      const matchesSearch =
        searchQuery === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'Tümü' || course.category === selectedCategory;

      const matchesDept =
        selectedDept === 'Tümü' || course.deptId === selectedDept;

      const matchesYear =
        selectedYear === 'Tümü' || course.year === selectedYear;

      return matchesSearch && matchesCategory && matchesDept && matchesYear;
    });
  }, [searchQuery, selectedCategory, selectedDept, selectedYear]);

  const activeDepartmentObject = useMemo(() => {
    if (selectedDept === 'Tümü') return null;
    return DEPARTMENTS_DATA.find((d) => d.id === selectedDept);
  }, [selectedDept]);

  const handleOpenCourseModal = (course: CourseItem) => {
    const detailed = getDetailedCourseData(course.slug || course.id, course.title, course.category);
    setSelectedCourseDetail(detailed);
    setIsModalOpen(true);
  };

  const handleOpenInstructorModal = (e: React.MouseEvent, instructor: Instructor) => {
    e.stopPropagation();
    setSelectedInstructor(instructor);
    setIsInstructorModalOpen(true);
  };

  const handleSelectCategoryTab = (cat: string) => {
    setSelectedCategory(cat);
    if (cat !== 'Tümü') {
      setSelectedDept('Tümü'); // reset position dropdown to prevent empty filtering collision
    }
  };

  const handleSelectDeptDropdown = (deptId: string) => {
    setSelectedDept(deptId);
    if (deptId !== 'Tümü') {
      setSelectedCategory('Tümü'); // reset category tab to prevent empty filtering collision
    }
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Eğitim adı, pozisyon veya konu ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#087F96] focus:bg-white transition-all text-[#0B2A4A] placeholder-gray-400"
            />
          </div>

          {/* Category Tabs with Course Counts */}
          <div className="flex items-center space-x-1 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 text-xs">
            {CATEGORY_LIST.map((cat) => {
              const count = getCategoryCount(cat);
              return (
                <button
                  key={cat}
                  onClick={() => handleSelectCategoryTab(cat)}
                  className={`px-3.5 py-2 rounded-xl font-extrabold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                    selectedCategory === cat
                      ? 'bg-[#087F96] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-[#0B2A4A]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-black ${
                    selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filter Dropdowns with Position Course Counts */}
        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs font-medium">
          <div className="flex flex-wrap items-center gap-3">
            {/* Department Dropdown with Explicit Module Count per Position */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 font-bold">Pozisyon / Kadro:</span>
              <select
                value={selectedDept}
                onChange={(e) => handleSelectDeptDropdown(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 font-bold text-[#0B2A4A] focus:outline-none focus:ring-2 focus:ring-[#087F96] text-xs sm:text-sm"
              >
                <option value="Tümü">Tüm Perakende Kadroları (26 Pozisyon • {ALL_COURSES.length} Modül)</option>
                {DEPARTMENTS_DATA.map((dept) => {
                  const courseCount = ALL_COURSES.filter((c) => c.deptId === dept.id).length || dept.totalCourses;
                  return (
                    <option key={dept.id} value={dept.id}>
                      {dept.name} — {courseCount} Eğitim Modülü ({dept.category})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Year Filter Buttons */}
            <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-xl">
              {(['Tümü', '1. Yıl', '2. Yıl'] as const).map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    selectedYear === yr
                      ? 'bg-white text-[#0B2A4A] shadow-xs'
                      : 'text-gray-500 hover:text-[#0B2A4A]'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {(searchQuery || selectedCategory !== 'Tümü' || selectedDept !== 'Tümü' || selectedYear !== 'Tümü') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tümü');
                setSelectedDept('Tümü');
                setSelectedYear('Tümü');
              }}
              className="text-[#E11D48] hover:underline font-bold text-xs"
            >
              Filtreleri Temizle
            </button>
          )}
        </div>
      </div>

      {/* Active Department Info Banner if Selected */}
      {activeDepartmentObject && (
        <div className="bg-[#0B2A4A] text-white p-5 sm:p-6 rounded-2xl border border-[#087F96]/40 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full font-mono">
              SEÇİLEN KADRO ÖZEL MÜFREDATI: {ALL_COURSES.filter(c => c.deptId === activeDepartmentObject.id).length || activeDepartmentObject.totalCourses} EĞİTİM MODÜLÜ ({activeDepartmentObject.totalHours} SAAT)
            </span>
            <h2 className="text-xl font-extrabold">{activeDepartmentObject.name} Eğitim Kataloğu</h2>
            <p className="text-xs text-gray-200 font-light">{activeDepartmentObject.description}</p>
          </div>
          <button
            onClick={() => handleSelectDeptDropdown('Tümü')}
            className="px-4 py-2 bg-[#087F96] hover:bg-[#056B80] text-white text-xs font-bold rounded-xl transition-all whitespace-nowrap"
          >
            Tüm Pozisyonları Göster
          </button>
        </div>
      )}

      {/* Results Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-gray-600 bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
        <div>
          <span>
            Toplam <strong className="text-[#0B2A4A] font-extrabold text-sm">{filteredCourses.length}</strong> Eğitim Gösteriliyor
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-gray-400 font-semibold hidden sm:inline">Görünüm:</span>
          <div className="bg-[#F4F7F9] p-1 rounded-xl flex items-center border border-gray-200 space-x-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#087F96] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#0B2A4A] hover:bg-gray-200/60'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Kutu</span>
            </button>

            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'list'
                  ? 'bg-[#087F96] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#0B2A4A] hover:bg-gray-200/60'
              }`}
            >
              <ListIcon className="w-4 h-4" />
              <span>Liste</span>
            </button>

            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table'
                  ? 'bg-[#087F96] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#0B2A4A] hover:bg-gray-200/60'
              }`}
            >
              <TableIcon className="w-4 h-4" />
              <span>Tablo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid Cards View with Rich Photo Banners */}
      {filteredCourses.length > 0 ? (
        <>
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const instructor = getInstructorForCourse(course.slug || course.id, course.category);
                const courseImg = getCourseImage(course.title, course.category, course.department);

                return (
                  <div
                    key={course.id}
                    onClick={() => handleOpenCourseModal(course)}
                    className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
                  >
                    {/* Top Course Photo Banner */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <img
                        src={courseImg}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                      {/* Badges on Top */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-bold">
                        <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full font-mono uppercase border border-white/30">
                          {course.year}
                        </span>
                        <span className="bg-black/50 backdrop-blur-md text-amber-300 font-mono font-bold px-3 py-1 rounded-full border border-white/20">
                          ⏱️ {course.duration} Saat
                        </span>
                      </div>

                      {/* Department Tag on Photo Bottom */}
                      <div className="absolute bottom-2.5 left-4 right-4">
                        <span className="text-[10px] font-extrabold text-emerald-300 uppercase tracking-wider block drop-shadow-md">
                          🎯 {course.department}
                        </span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-display font-bold text-base text-[#0B2A4A] group-hover:text-[#087F96] transition-colors leading-snug">
                          {course.title}
                        </h3>

                        <p className="text-xs text-gray-600 mt-2.5 line-clamp-3 font-light leading-relaxed">
                          {course.description}
                        </p>

                        {/* INSTRUCTOR MINI BADGE (CLICKABLE) */}
                        <div
                          onClick={(e) => handleOpenInstructorModal(e, instructor)}
                          className="mt-4 p-2 bg-gray-50 hover:bg-blue-50 rounded-xl border border-gray-200 flex items-center space-x-2.5 transition-colors"
                        >
                          <img
                            src={instructor.avatar}
                            alt={instructor.name}
                            className="w-7 h-7 rounded-lg object-cover border border-[#087F96] flex-shrink-0"
                          />
                          <div className="truncate text-left">
                            <div className="text-[9px] text-[#087F96] font-bold uppercase">Eğitmen:</div>
                            <div className="text-xs font-bold text-[#0B2A4A] hover:underline truncate">{instructor.name}</div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                        <span className="text-gray-500 font-medium">
                          {course.level}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenCourseModal(course);
                          }}
                          className="px-3.5 py-1.5 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl transition-all flex items-center space-x-1 shadow-sm"
                        >
                          <span>İncele / PDF Gör</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* List Rows View */}
          {viewMode === 'list' && (
            <div className="space-y-4">
              {filteredCourses.map((course) => {
                const instructor = getInstructorForCourse(course.slug || course.id, course.category);
                const courseImg = getCourseImage(course.title, course.category, course.department);

                return (
                  <div
                    key={course.id}
                    onClick={() => handleOpenCourseModal(course)}
                    className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group cursor-pointer"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <img
                        src={courseImg}
                        alt={course.title}
                        className="w-20 h-20 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                      />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center space-x-2 text-xs">
                          <span className="bg-[#DDF4F7] text-[#087F96] font-mono font-bold px-2 py-0.5 rounded text-[11px]">
                            {course.year}
                          </span>
                          <span className="text-[#087F96] font-bold text-xs">
                            {course.department}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span
                            onClick={(e) => handleOpenInstructorModal(e, instructor)}
                            className="text-[#0B2A4A] font-bold underline hover:text-[#087F96]"
                          >
                            Eğitmen: {instructor.name}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-base text-[#0B2A4A] group-hover:text-[#087F96] transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-1 font-light">{course.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 shrink-0">
                      <span className="text-xs font-mono font-bold text-gray-600">⏱️ {course.duration} Saat</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCourseModal(course);
                        }}
                        className="px-4 py-2 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl text-xs shadow-sm transition-all"
                      >
                        Ders İncele
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Table View */}
          {viewMode === 'table' && (
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0B2A4A] text-white uppercase font-bold tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Görsel & Eğitim Modülü</th>
                    <th className="py-3.5 px-4">Kadro / Pozisyon</th>
                    <th className="py-3.5 px-4">Eğitmen</th>
                    <th className="py-3.5 px-4">Süre</th>
                    <th className="py-3.5 px-4 text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCourses.map((course) => {
                    const instructor = getInstructorForCourse(course.slug || course.id, course.category);
                    const courseImg = getCourseImage(course.title, course.category, course.department);

                    return (
                      <tr
                        key={course.id}
                        onClick={() => handleOpenCourseModal(course)}
                        className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-4 flex items-center space-x-3">
                          <img src={courseImg} alt={course.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                          <span className="font-bold text-[#0B2A4A]">{course.title}</span>
                        </td>
                        <td className="py-3 px-4 text-gray-700 font-medium">{course.department}</td>
                        <td className="py-3 px-4">
                          <span
                            onClick={(e) => handleOpenInstructorModal(e, instructor)}
                            className="font-bold text-[#087F96] hover:underline"
                          >
                            {instructor.name}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-gray-600">{course.duration} Saat</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenCourseModal(course);
                            }}
                            className="px-3 py-1 bg-[#087F96] text-white font-bold rounded-lg hover:bg-[#056B80]"
                          >
                            Detay
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-4">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto" />
          <h3 className="text-lg font-bold text-[#0B2A4A]">Aranan Kriterlere Uygun Eğitim Bulunamadı</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Arama teriminizi değiştirmeyi veya filtreleri temizlemeyi deneyebilirsiniz.
          </p>
        </div>
      )}

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourseDetail}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Instructor Profile Modal */}
      <InstructorProfileModal
        instructor={selectedInstructor}
        isOpen={isInstructorModalOpen}
        onClose={() => setIsInstructorModalOpen(false)}
      />
    </div>
  );
}

export default function EgitimlerPage() {
  return (
    <div className="min-h-screen bg-[#F4F7F9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white p-8 sm:p-12 rounded-3xl border border-[#087F96]/30 shadow-xl text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#DDF4F7]">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>TÜM PERAKENDE POZİSYONLARI MÜFREDATI</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Perakende Kariyer Eğitim Kataloğu
          </h1>

          <p className="text-gray-200 text-sm sm:text-base max-w-3xl mx-auto font-light leading-relaxed">
            Mağaza kasiyerliğinden bölge müdürlüğüne, satın almadan lojistiğe kadar 26 perakende pozisyonu için hazırlanmış <strong>200'den fazla eğitim modülü</strong>, <strong>eğitmen profilleri</strong>, <strong>örnek ders videoları</strong> ve <strong>indirilebilir PDF dokümanları</strong>.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-12 font-bold text-gray-500">Katalog Yükleniyor...</div>}>
          <EgitimlerCatalogContent />
        </Suspense>
      </div>
    </div>
  );
}
