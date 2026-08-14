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
  UserCheck
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '@/data/departmentsData';

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

      courses.push({
        id: `dept_${dept.id}_y1_${idx}`,
        title: cName,
        category: dept.category === 'Genel Operasyon' ? 'Mağaza Yönetimi ve Operasyon' : dept.category,
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

      courses.push({
        id: `dept_${dept.id}_y2_${idx}`,
        title: cName,
        category: dept.category === 'Genel Operasyon' ? 'Mağaza Yönetimi ve Operasyon' : dept.category,
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

const ALL_CATALOG_COURSES = BUILD_FULL_CATALOG();

function EgitimlerCatalogContent() {
  const searchParams = useSearchParams();
  const initialSearchParam = searchParams.get('search') || '';
  const initialDeptParam = searchParams.get('dept') || searchParams.get('pos') || searchParams.get('position') || searchParams.get('title') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearchParam);
  const [selectedDept, setSelectedDept] = useState('Tümü');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedYear, setSelectedYear] = useState('Tümü');
  const [selectedLevel, setSelectedLevel] = useState('Tümü');

  // Layout view mode state: 'grid' | 'list' | 'table'
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');

  // Handle URL query parameters or cookie session
  useEffect(() => {
    if (initialSearchParam) {
      setSearchQuery(initialSearchParam);
    }

    if (initialDeptParam) {
      const found = DEPARTMENTS_DATA.find(
        (d) => d.id === initialDeptParam || d.name.toLowerCase().includes(initialDeptParam.toLowerCase()) || initialDeptParam.toLowerCase().includes(d.name.toLowerCase())
      );
      if (found) {
        setSelectedDept(found.name);
      }
    } else {
      // Check user session cookie for registered position
      try {
        const match = document.cookie.match(/user_session=([^;]+)/);
        if (match) {
          const userObj = JSON.parse(decodeURIComponent(match[1]));
          const userPos = userObj.title || userObj.department;
          if (userPos) {
            const found = DEPARTMENTS_DATA.find(
              (d) => d.name.toLowerCase().includes(userPos.toLowerCase()) || userPos.toLowerCase().includes(d.name.toLowerCase())
            );
            if (found) {
              setSelectedDept(found.name);
            }
          }
        }
      } catch (err) {
        // Fallback
      }
    }
  }, [initialSearchParam, initialDeptParam]);

  const categories = [
    'Tümü',
    'Mağaza Yönetimi ve Operasyon',
    'Mağaza Operasyonu',
    'Saha Operasyonu',
    'Saha Stratejisi',
    'Merkez Operasyon',
    'Taze Gıda Akademisi',
    'Taze Gıda ve Hizmet Reyonları',
    'Finans ve Operasyonel Mükemmellik',
    'İnsan Kaynakları, Liderlik ve Yöneticilik',
    'Dijitalleşme ve Yenilikçi Perakendecilik',
    'Dijital Perakende',
    'Teknoloji & Veri',
    'Stratejik Yönetim ve Liderlik Gelişimi',
    'Saha Güvenliği',
    'Saha Destek',
    'Üst Yönetim'
  ];

  const levels = ['Tümü', 'Temel Seviye', 'Görev Yetkinliği', 'İleri Seviye', 'Stratejik Yönetim'];
  const years = ['Tümü', '1. Yıl', '2. Yıl'];

  const filteredCourses = useMemo(() => {
    return ALL_CATALOG_COURSES.filter((course) => {
      const q = searchQuery.toLowerCase().trim();

      // 1. Search Query Filter
      let matchesSearch = true;
      if (q) {
        const stopWords = new Set(['ve', 'ile', 'veya', 'de', 'da', 'bir', 'için']);
        const tokens = q.split(/[\s\/()]+/).filter((t) => t.length >= 2 && !stopWords.has(t));

        if (tokens.length > 0) {
          matchesSearch = tokens.some((token) =>
            course.title.toLowerCase().includes(token) ||
            course.description.toLowerCase().includes(token) ||
            course.department.toLowerCase().includes(token) ||
            course.position.toLowerCase().includes(token) ||
            course.category.toLowerCase().includes(token)
          );
        }
      }

      // 2. Exact Department / Position Filter
      let matchesDept = selectedDept === 'Tümü';
      if (!matchesDept) {
        const deptObj = DEPARTMENTS_DATA.find((d) => d.name === selectedDept || d.id === selectedDept);
        if (deptObj) {
          matchesDept = course.deptId === deptObj.id || course.department === deptObj.name;
        } else {
          matchesDept = course.department.toLowerCase().includes(selectedDept.toLowerCase()) || selectedDept.toLowerCase().includes(course.department.toLowerCase());
        }
      }

      const matchesCategory = selectedCategory === 'Tümü' || course.category === selectedCategory;
      const matchesYear = selectedYear === 'Tümü' || course.year === selectedYear;
      const matchesLevel = selectedLevel === 'Tümü' || course.level === selectedLevel;

      return matchesSearch && matchesDept && matchesCategory && matchesYear && matchesLevel;
    });
  }, [searchQuery, selectedDept, selectedCategory, selectedYear, selectedLevel]);

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-[#0B2A4A] text-white p-8 rounded-2xl shadow-xl border border-[#087F96]/30 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="text-xs font-bold text-[#DDF4F7] bg-[#087F96] px-3 py-1 rounded-full uppercase tracking-wider">
              26 Pozisyon Kadrosu & {ALL_CATALOG_COURSES.length} Modüllü Müfredat
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
              Kariyer ve Eğitim Kataloğu
            </h1>
            <p className="text-gray-300 text-sm font-light leading-relaxed">
              Her pozisyon ve kadronun 1. ve 2. Yıl özel eğitim müfredatını inceleyin, arayın veya filtreleyin.
            </p>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Eğitim adı, pozisyon (örn. Kasap, Kasiyer, Şarküteri, Mağaza Müdürü) veya konu ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#F4F7F9] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#087F96] transition-all text-[#0B2A4A] font-semibold"
            />
          </div>

          {/* Select Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
            {/* Departman / Pozisyon Filter */}
            <div>
              <label className="block text-gray-500 font-bold mb-1">Şirketteki Pozisyonunuz</label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full p-2.5 bg-[#F4F7F9] border border-gray-200 rounded-lg text-xs font-semibold text-[#0B2A4A] focus:outline-none focus:border-[#087F96]"
              >
                <option value="Tümü">Tüm Pozisyonlar (26 Kadro - {ALL_CATALOG_COURSES.length} Modül)</option>
                {DEPARTMENTS_DATA.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name} ({d.totalCourses} Eğitim)
                  </option>
                ))}
              </select>
            </div>

            {/* Ana Eğitim Başlığı Filter */}
            <div>
              <label className="block text-gray-500 font-bold mb-1">Kategori</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 bg-[#F4F7F9] border border-gray-200 rounded-lg text-xs font-semibold text-[#0B2A4A] focus:outline-none focus:border-[#087F96]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Kariyer Yılı Filter */}
            <div>
              <label className="block text-gray-500 font-bold mb-1">Kariyer Yılı</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full p-2.5 bg-[#F4F7F9] border border-gray-200 rounded-lg text-xs font-semibold text-[#0B2A4A] focus:outline-none focus:border-[#087F96]"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y === 'Tümü' ? 'Tüm Yıllar' : y}</option>
                ))}
              </select>
            </div>

            {/* Yetkinlik Seviyesi Filter */}
            <div>
              <label className="block text-gray-500 font-bold mb-1">Yetkinlik Seviyesi</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-2.5 bg-[#F4F7F9] border border-gray-200 rounded-lg text-xs font-semibold text-[#0B2A4A] focus:outline-none focus:border-[#087F96]"
              >
                {levels.map((l) => (
                  <option key={l} value={l}>{l === 'Tümü' ? 'Tüm Seviyeler' : l}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Info Badges */}
        {selectedDept !== 'Tümü' && (
          <div className="bg-[#DDF4F7] border border-[#087F96]/30 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#056B80]">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-[#087F96] shrink-0" />
              <div>
                <span className="font-bold text-[#0B2A4A] text-sm block">
                  🎯 "{selectedDept}" Pozisyonuna Özel Eğitim Müfredatı
                </span>
                <span className="font-medium text-xs">
                  Bu kadroya tanımlanmış 1. Yıl ve 2. Yıl eğitim modülleri listelenmektedir.
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedDept('Tümü');
                setSearchQuery('');
              }}
              className="font-bold underline text-[#087F96] hover:text-[#0B2A4A] shrink-0"
            >
              Tüm Kataloğu Gör
            </button>
          </div>
        )}

        {/* Results Toolbar: Counter & View Mode Toggles */}
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
                title="Kutu / Grid Görünümü"
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
                title="Liste Görünümü"
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
                title="Tablo Görünümü"
              >
                <TableIcon className="w-4 h-4" />
                <span>Tablo</span>
              </button>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------- */}
        {/* COURSES DISPLAY ACCORDING TO VIEW MODE */}
        {/* -------------------------------------------------- */}
        {filteredCourses.length > 0 ? (
          <>
            {/* VIEW MODE 1: GRID CARDS */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold mb-3">
                        <span className="bg-[#DDF4F7] text-[#087F96] px-2.5 py-1 rounded-full font-mono uppercase">
                          {course.year}
                        </span>
                        <span className="text-gray-500 flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                          {course.duration} Saat
                        </span>
                      </div>

                      <span className="text-[10px] font-bold text-[#087F96] uppercase tracking-wider block mb-1">
                        🎯 {course.department} Pozisyonu
                      </span>

                      <h3 className="font-display font-bold text-base text-[#0B2A4A] group-hover:text-[#087F96] transition-colors leading-tight">
                        <Link href={`/egitim/${course.slug}`}>
                          {course.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-gray-600 mt-2.5 line-clamp-3 font-light leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="text-gray-500 font-medium">
                        {course.level}
                      </span>
                      <Link
                        href={`/egitim/${course.slug}`}
                        className="px-3.5 py-1.5 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-lg transition-all flex items-center space-x-1"
                      >
                        <span>Eğitimi İncele</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VIEW MODE 2: LIST ROWS */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="bg-[#DDF4F7] text-[#087F96] font-mono font-bold px-2 py-0.5 rounded text-[11px]">
                          {course.year}
                        </span>
                        <span className="text-[#087F96] font-bold text-xs">
                          🎯 {course.department} Pozisyonu
                        </span>
                      </div>

                      <h3 className="font-display font-extrabold text-base text-[#0B2A4A] group-hover:text-[#087F96] transition-colors">
                        <Link href={`/egitim/${course.slug}`}>
                          {course.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-gray-600 font-light leading-relaxed line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100 gap-2">
                      <div className="flex items-center space-x-3 text-xs text-gray-500 font-medium">
                        <span className="flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1 text-gray-400" />
                          {course.duration} Saat
                        </span>
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-bold text-[11px]">
                          {course.level}
                        </span>
                      </div>

                      <Link
                        href={`/egitim/${course.slug}`}
                        className="px-4 py-2 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-lg transition-all text-xs flex items-center space-x-1"
                      >
                        <span>İncele</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VIEW MODE 3: FULL HTML DATA TABLE */}
            {viewMode === 'table' && (
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0B2A4A] text-white font-display font-bold uppercase text-[11px] tracking-wider">
                      <tr>
                        <th className="p-4">Kariyer Yılı</th>
                        <th className="p-4">Eğitim Modül Adı & Açıklama</th>
                        <th className="p-4">Pozisyon / Kadro</th>
                        <th className="p-4">Süre</th>
                        <th className="p-4">Seviye</th>
                        <th className="p-4 text-right">İşlem</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 font-medium text-gray-700">
                      {filteredCourses.map((course) => (
                        <tr key={course.id} className="hover:bg-[#DDF4F7]/20 transition-colors">
                          <td className="p-4 whitespace-nowrap">
                            <span className="bg-[#DDF4F7] text-[#087F96] font-mono font-bold px-2.5 py-1 rounded text-[11px] block text-center">
                              {course.year}
                            </span>
                          </td>
                          <td className="p-4 space-y-1 max-w-md">
                            <Link href={`/egitim/${course.slug}`} className="font-bold text-[#0B2A4A] hover:text-[#087F96] transition-colors text-sm block">
                              {course.title}
                            </Link>
                            <p className="text-gray-500 font-light text-[11px] line-clamp-1">
                              {course.description}
                            </p>
                          </td>
                          <td className="p-4 whitespace-nowrap space-y-0.5">
                            <span className="font-bold text-[#087F96] block">{course.department}</span>
                          </td>
                          <td className="p-4 whitespace-nowrap font-mono text-gray-600 font-bold">
                            <span className="flex items-center">
                              <Clock className="w-3.5 h-3.5 mr-1 text-gray-400" />
                              {course.duration} Saat
                            </span>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-bold text-[11px]">
                              {course.level}
                            </span>
                          </td>
                          <td className="p-4 whitespace-nowrap text-right">
                            <Link
                              href={`/egitim/${course.slug}`}
                              className="px-3.5 py-1.5 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-lg transition-all text-xs inline-flex items-center space-x-1"
                            >
                              <span>Detay</span>
                              <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center space-y-3 border border-gray-200">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="font-display font-bold text-lg text-[#0B2A4A]">Aradığınız kriterlere uygun eğitim bulunamadı</h3>
            <p className="text-xs text-gray-500">Lütfen arama teriminizi değiştirin veya filtreleri temizleyin.</p>
            <button
              onClick={() => {
                setSelectedDept('Tümü');
                setSelectedCategory('Tümü');
                setSelectedYear('Tümü');
                setSelectedLevel('Tümü');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#087F96] text-white rounded-xl text-xs font-bold shadow-md"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EgitimlerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F7F9] py-12 text-center text-xs font-bold text-[#0B2A4A]">Katalog Yükleniyor...</div>}>
      <EgitimlerCatalogContent />
    </Suspense>
  );
}
