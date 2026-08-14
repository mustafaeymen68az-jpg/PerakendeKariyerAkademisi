'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  ChevronDown, 
  BookOpen, 
  CheckCircle2, 
  PlayCircle,
  X,
  Building2,
  Clock,
  Sparkles,
  ArrowRight,
  Award,
  ArrowLeft,
  Filter
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '@/data/departmentsData';

const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

interface CourseDepartmentNavProps {
  currentCourseTitle: string;
  departmentName: string;
  deptId: string;
  prevCourse: { title: string; slug: string };
  nextCourse: { title: string; slug: string };
}

export default function CourseDepartmentNav({
  currentCourseTitle,
  departmentName,
  deptId,
  prevCourse,
  nextCourse,
}: CourseDepartmentNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'y1' | 'y2'>('y1');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Department Selection State (Defaults to current page's department)
  const initialDept = DEPARTMENTS_DATA.find(
    (d) => d.id === deptId || d.name.toLowerCase() === departmentName.toLowerCase()
  ) || DEPARTMENTS_DATA[0];

  const [selectedDeptId, setSelectedDeptId] = useState<string>(initialDept.id);

  // Sync selectedDeptId if prop deptId changes
  useEffect(() => {
    const found = DEPARTMENTS_DATA.find(
      (d) => d.id === deptId || d.name.toLowerCase() === departmentName.toLowerCase()
    );
    if (found) {
      setSelectedDeptId(found.id);
    }
  }, [deptId, departmentName]);

  const activeDeptData = DEPARTMENTS_DATA.find((d) => d.id === selectedDeptId) || initialDept;

  const year1List = activeDeptData.year1Courses.map((name) => ({
    title: name,
    slug: createSlug(name),
  }));

  const year2List = activeDeptData.year2Courses.map((name) => ({
    title: name,
    slug: createSlug(name),
  }));

  const totalCourseCount = year1List.length + year2List.length;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative z-30" ref={dropdownRef}>
      {/* Top Header Bar in Exact Sequence: 1. Ana Kataloğa Dön | 2. Departman Seçimi | 3. Önceki Eğitim | 4. Sonraki Eğitim */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 bg-white p-3.5 px-5 rounded-2xl border border-gray-200 shadow-xs text-xs font-bold">
        
        {/* 1. Ana Kataloğa Dön */}
        <Link 
          href="/egitimler"
          className="px-4 py-2.5 bg-[#F4F7F9] hover:bg-[#DDF4F7] text-[#0B2A4A] border border-gray-200 hover:border-[#087F96] rounded-xl transition-all flex items-center space-x-2 shrink-0 font-extrabold shadow-2xs"
          title="Ana Eğitim Kataloğuna Dön"
        >
          <ArrowLeft className="h-4 w-4 text-[#087F96]" />
          <span>Ana Kataloğa Dön</span>
        </Link>

        {/* 2. Departman Seçim Butonu */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 shrink-0 font-extrabold shadow-sm border ${
            isOpen 
              ? 'bg-[#087F96] text-white border-[#087F96] ring-2 ring-[#087F96]/30' 
              : 'bg-[#DDF4F7] hover:bg-[#087F96] text-[#0B2A4A] hover:text-white border-[#087F96]/40'
          }`}
          title="Farklı Bir Departman veya Kadro Seçin"
        >
          <Building2 className="h-4 w-4" />
          <span>Departman: {activeDeptData.name} ({totalCourseCount} Eğitim)</span>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* 3. Önceki Eğitim */}
        <Link 
          href={`/egitim/${prevCourse.slug}`}
          className="flex items-center space-x-2 text-gray-700 hover:text-[#087F96] transition-all group max-w-[220px] sm:max-w-[260px] truncate bg-[#F8FAFC] hover:bg-[#DDF4F7]/50 p-2 px-3 rounded-xl border border-gray-200/80 shadow-2xs"
          title={`Önceki Eğitim: ${prevCourse.title}`}
        >
          <div className="w-6 h-6 rounded-lg bg-[#DDF4F7] group-hover:bg-[#087F96] group-hover:text-white text-[#087F96] flex items-center justify-center shrink-0 transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </div>
          <div className="truncate text-left">
            <span className="text-[9px] text-gray-400 font-semibold block uppercase leading-none">Önceki Eğitim</span>
            <span className="truncate block font-bold text-[#0B2A4A] text-xs leading-tight group-hover:text-[#087F96]">{prevCourse.title}</span>
          </div>
        </Link>

        {/* 4. Sonraki Eğitim */}
        <Link 
          href={`/egitim/${nextCourse.slug}`}
          className="flex items-center justify-end space-x-2 text-gray-700 hover:text-[#087F96] transition-all group max-w-[220px] sm:max-w-[260px] text-right truncate bg-[#F8FAFC] hover:bg-[#DDF4F7]/50 p-2 px-3 rounded-xl border border-gray-200/80 shadow-2xs"
          title={`Sonraki Eğitim: ${nextCourse.title}`}
        >
          <div className="truncate text-right">
            <span className="text-[9px] text-gray-400 font-semibold block uppercase leading-none">Sonraki Eğitim</span>
            <span className="truncate block font-bold text-[#0B2A4A] text-xs leading-tight group-hover:text-[#087F96]">{nextCourse.title}</span>
          </div>
          <div className="w-6 h-6 rounded-lg bg-[#DDF4F7] group-hover:bg-[#087F96] group-hover:text-white text-[#087F96] flex items-center justify-center shrink-0 transition-colors">
            <ChevronRight className="h-4 w-4" />
          </div>
        </Link>
      </div>

      {/* Interactive Department & Course Selector Popover Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 z-50 animate-in fade-in zoom-in-95 duration-200 space-y-4">
          
          {/* Top Bar: Department Dropdown Select Box (26 Kadro) */}
          <div className="bg-[#F4F7F9] p-3.5 rounded-xl border border-gray-200 space-y-2">
            <label className="text-xs font-extrabold text-[#0B2A4A] flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Filter className="h-4 w-4 text-[#087F96]" />
                <span>Departman / Kadro Seçimi Yapın (26 Kadro):</span>
              </span>
              <span className="text-[11px] font-normal text-gray-500">
                Seçtiğiniz kadronun tüm eğitimleri aşağıda listelenir
              </span>
            </label>
            <select
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
              className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] focus:border-[#087F96] outline-none shadow-xs"
            >
              {DEPARTMENTS_DATA.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name} ({dept.year1Courses.length + dept.year2Courses.length} Eğitim • {dept.category})
                </option>
              ))}
            </select>
          </div>

          {/* Department Header Details */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-[#087F96] text-white rounded-xl shadow-xs">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-[#087F96] uppercase bg-[#DDF4F7] px-2 py-0.5 rounded-full">
                  {activeDeptData.category}
                </span>
                <h4 className="font-display font-extrabold text-base text-[#0B2A4A] mt-0.5">
                  {activeDeptData.name} Eğitim Kataloğu
                </h4>
                <p className="text-xs text-gray-500 font-light mt-0.5">
                  Toplam <strong>{totalCourseCount} Eğitim Modülü</strong> ({activeDeptData.totalHours} Saat) • {activeDeptData.competencyLevel}
                </p>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Year Tabs */}
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
            <button
              onClick={() => setActiveTab('y1')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'y1'
                  ? 'bg-[#087F96] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>1. Yıl Eğitimleri ({year1List.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('y2')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'y2'
                  ? 'bg-[#0B2A4A] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Award className="h-3.5 w-3.5" />
              <span>2. Yıl İleri Eğitimler ({year2List.length})</span>
            </button>
          </div>

          {/* Course List */}
          <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1 text-xs">
            {(activeTab === 'y1' ? year1List : year2List).map((course, idx) => {
              const isCurrent = 
                currentCourseTitle.toLowerCase().trim() === course.title.toLowerCase().trim() ||
                createSlug(currentCourseTitle) === course.slug;

              return (
                <Link
                  key={idx}
                  href={`/egitim/${course.slug}`}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all border ${
                    isCurrent
                      ? 'bg-[#DDF4F7]/60 border-[#087F96] font-bold text-[#0B2A4A] shadow-xs'
                      : 'bg-[#F8FAFC] hover:bg-gray-100 border-gray-200/80 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate pr-2">
                    <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                      isCurrent ? 'bg-[#087F96] text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="truncate font-medium">{course.title}</span>
                  </div>

                  {isCurrent ? (
                    <span className="bg-[#087F96] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shrink-0 flex items-center space-x-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Şu An Açık</span>
                    </span>
                  ) : (
                    <span className="text-[#087F96] font-semibold flex items-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Ders Detayı</span>
                      <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Footer link to main catalog */}
          <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <Link
              href="/egitimler"
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto px-4 py-2 bg-[#0B2A4A] hover:bg-[#061B33] text-white font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-xs"
            >
              <LayoutGrid className="h-3.5 w-3.5 text-[#087F96]" />
              <span>📋 Ana Eğitim Kataloğuna Dön (Tüm Kadrolar)</span>
            </Link>

            <Link
              href={`/egitimler?dept=${encodeURIComponent(activeDeptData.id)}`}
              onClick={() => setIsOpen(false)}
              className="text-[#087F96] hover:underline font-bold flex items-center space-x-1"
            >
              <span>{activeDeptData.name} Kataloğunda Filtrele</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
