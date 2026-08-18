'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  BookOpen, 
  ChevronRight, 
  CheckCircle2, 
  CheckSquare,
  Square,
  PlusCircle,
  Download,
  Send,
  X,
  Sparkles,
  User,
  ExternalLink,
  ArrowUpDown,
  ChevronDown,
  Filter,
  Briefcase,
  Check,
  UserCheck,
  Eye,
  EyeOff,
  DollarSign,
  Tag,
  CreditCard,
  Coins,
  ShoppingCart,
  Clock,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Award,
  GraduationCap,
  FileCheck,
  FileText,
  FileSpreadsheet,
  FileCode,
  ChevronUp,
  FolderOpen,
  Layers,
  LayoutGrid,
  List
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '@/data/departmentsData';
import CourseDetailModal, { DetailedCourse } from '@/components/CourseDetailModal';
import { getDetailedCourseData } from '@/data/courseDetailsData';
import { getInstructorForCourse, Instructor, INSTRUCTORS_DATA } from '@/data/instructorsData';
import { getCourseImage } from '@/data/courseImages';
import InstructorProfileModal from '@/components/InstructorProfileModal';

interface CourseItem {
  id: string;
  title: string;
  category: string;
  subCategory: string;
  deptId: string;
  department: string;
  duration: number;
  level: string;
  isMandatory: boolean;
  description: string;
  slug: string;
}

// DYNAMIC PRICING CALCULATION ACCORDING TO POSITION STATUS & COURSE IMPORTANCE
const calculateCoursePrice = (course: CourseItem) => {
  const titleLower = (course.title || '').toLowerCase();
  const levelLower = (course.level || '').toLowerCase();
  const deptLower = (course.department || '').toLowerCase();

  let basePrice = 2400;

  // 1. Position Status Weighting
  if (
    deptLower.includes('ceo') || 
    deptLower.includes('genel müdür') || 
    deptLower.includes('direktör') || 
    deptLower.includes('satın alma müdürü') || 
    deptLower.includes('bölge müdürü')
  ) {
    basePrice = 8500;
  } else if (
    deptLower.includes('mağaza müdürü') || 
    deptLower.includes('kategori') || 
    deptLower.includes('ik') || 
    deptLower.includes('crm') || 
    deptLower.includes('lojistik')
  ) {
    basePrice = 4800;
  } else if (
    deptLower.includes('vardiya') || 
    deptLower.includes('şef') || 
    deptLower.includes('uzman')
  ) {
    basePrice = 3200;
  } else {
    // Basic Operational
    basePrice = 1850;
  }

  // 2. Level Multiplier
  if (levelLower.includes('stratejik')) {
    basePrice *= 1.4;
  } else if (levelLower.includes('ileri')) {
    basePrice *= 1.25;
  } else if (levelLower.includes('görev')) {
    basePrice *= 1.1;
  }

  // 3. Special Keyword Premium
  if (titleLower.includes('yapay zeka') || titleLower.includes('power bi') || titleLower.includes('sql')) {
    basePrice += 2400;
  } else if (titleLower.includes('terfi') || titleLower.includes('strateji') || titleLower.includes('audit') || titleLower.includes('p&l')) {
    basePrice += 1800;
  } else if (titleLower.includes('fire') || titleLower.includes('soğuk zincir') || titleLower.includes('omnichannel')) {
    basePrice += 1200;
  }

  // 4. Duration Adder
  basePrice += (course.duration || 12) * 45;

  // 5. Mandatory multiplier
  if (course.isMandatory) {
    basePrice *= 1.1;
  }

  // Round to clean 50s (e.g. ₺3,450 or ₺5,800)
  const finalPrice = Math.round(basePrice / 50) * 50;

  let badge = 'Standart';
  let badgeColor = 'bg-blue-100 text-blue-800 border-blue-200';
  if (finalPrice >= 8000) {
    badge = 'Executive';
    badgeColor = 'bg-[#0B2A4A] text-amber-300 border-amber-400 font-black';
  } else if (finalPrice >= 4500) {
    badge = 'Yönetici';
    badgeColor = 'bg-purple-100 text-purple-900 border-purple-300 font-bold';
  } else if (finalPrice >= 2800) {
    badge = 'Uzmanlık';
    badgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
  }

  return {
    price: finalPrice,
    formatted: `₺${finalPrice.toLocaleString('tr-TR')}`,
    badge,
    badgeColor
  };
};

// CERTIFICATION BADGE HELPER: ÜNİVERSİTE SERTİFİKALI / EĞİTMEN SERTİFİKALI / SERTİFİKASIZ
const getCourseCertBadge = (course: CourseItem, price: number) => {
  const titleLower = (course.title || '').toLowerCase();
  const deptLower = (course.department || '').toLowerCase();

  if (
    price >= 7000 || 
    titleLower.includes('yapay zeka') || 
    titleLower.includes('power bi') || 
    titleLower.includes('sql') || 
    titleLower.includes('terfi') || 
    titleLower.includes('strateji') || 
    deptLower.includes('ceo') || 
    deptLower.includes('direktör') || 
    deptLower.includes('satın alma')
  ) {
    return {
      type: 'universite',
      label: '🎓 Üniversite Sertifikalı',
      shortLabel: '🎓 Üniversite',
      color: 'bg-purple-900 text-purple-100 border-purple-400 font-black',
      badgeClass: 'bg-purple-100 text-purple-900 border-purple-300 font-extrabold',
      icon: GraduationCap
    };
  }

  if (course.duration <= 16 && !course.isMandatory && price <= 2500) {
    return {
      type: 'sertifikasiz',
      label: '⚪ Sertifikasız',
      shortLabel: '⚪ Sertifikasız',
      color: 'bg-gray-100 text-gray-600 border-gray-300 font-medium',
      badgeClass: 'bg-gray-100 text-gray-600 border-gray-300 font-medium',
      icon: X
    };
  }

  return {
    type: 'egitmen',
    label: '📜 Eğitmen Sertifikalı',
    shortLabel: '📜 Eğitmen',
    color: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-extrabold',
    badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-extrabold',
    icon: Award
  };
};

// CLEAN MAIN DOMAIN CATEGORIES HIERARCHY
const HIERARCHY = [
  { id: 'all', name: 'Tüm Eğitimler' },
  { id: 'taze_gida', name: '🥦 Taze Gıda Reyonları' },
  { id: 'reyon_elemanlari', name: '🛒 Reyon Elemanları' },
  { id: 'saha_magaza', name: '🏬 Saha & Mağaza Yönetimi' },
  { id: 'satinalma_lojistik', name: '📦 Satın Alma & Lojistik' },
  { id: 'pazarlama_satis_crm', name: '📣 Pazarlama & Satış & CRM' },
  { id: 'yapay_zeka', name: '🤖 Yapay Zekâ & Dijital' },
  { id: 'ik_egitmenlik', name: '👥 İK & İç Eğitmenlik' },
];

const resolveCategoryMapping = (dept: any, courseTitle: string) => {
  const title = (courseTitle || '').toLowerCase();
  const dName = (dept.name || '').toLowerCase();

  if (title.includes('taze') || title.includes('manav') || title.includes('et') || title.includes('sarkuteri') || title.includes('firin') || title.includes('unlu') || title.includes('fire') || dName.includes('taze')) {
    let subCat = 'Soğuk Zincir & Fire';
    if (title.includes('et') || title.includes('sarkuteri')) subCat = 'Et & Şarküteri';
    else if (title.includes('manav') || title.includes('meyve')) subCat = 'Manav & Meyve-Sebze';
    else if (title.includes('firin') || title.includes('unlu')) subCat = 'Unlu Mamuller & Fırın';
    return { category: '🥦 Taze Gıda Reyonları', catId: 'taze_gida', subCategory: subCat };
  }

  if (title.includes('kasiyer') || title.includes('kasa') || title.includes('pos') || title.includes('etiket') || title.includes('reyon') || dName.includes('kasiyer') || dName.includes('reyon')) {
    let subCat = 'Tanzim Teşhir';
    if (title.includes('kasa') || title.includes('pos')) subCat = 'Kasa & POS';
    else if (title.includes('etiket') || title.includes('sayim')) subCat = 'Stok Devir & Etiket';
    else if (title.includes('iletisim') || title.includes('musteri')) subCat = 'Müşteri İletişimi';
    return { category: '🛒 Reyon Elemanları', catId: 'reyon_elemanlari', subCategory: subCat };
  }

  if (title.includes('satın alma') || title.includes('kategori') || title.includes('tedarik') || title.includes('lojistik') || title.includes('depo') || dName.includes('satın alma') || dName.includes('lojistik')) {
    let subCat = 'Kategori Yönetimi & Marj';
    if (title.includes('tedarikci') || title.includes('pazarlik')) subCat = 'Tedarikçi Pazarlığı';
    else if (title.includes('depo') || title.includes('stok') || title.includes('lojistik')) subCat = 'Depo & Lojistik';
    return { category: '📦 Satın Alma & Lojistik', catId: 'satinalma_lojistik', subCategory: subCat };
  }

  if (title.includes('pazarlama') || title.includes('satis') || title.includes('crm') || title.includes('sadakat') || title.includes('merchandising') || title.includes('omnichannel')) {
    let subCat = 'Müşteri Sadakati (CRM)';
    if (title.includes('visual') || title.includes('magaza ici')) subCat = 'Visual Merchandising';
    else if (title.includes('dijital') || title.includes('omnichannel')) subCat = 'Dijital Perakende & Omnichannel';
    return { category: '📣 Pazarlama & Satış & CRM', catId: 'pazarlama_satis_crm', subCategory: subCat };
  }

  if (title.includes('yapay zeka') || title.includes('prompt') || title.includes('veri') || title.includes('power bi') || title.includes('sql') || title.includes('tahmin')) {
    let subCat = 'Perakendede Yapay Zekâ';
    if (title.includes('siparis') || title.includes('tahmin')) subCat = 'Otomatik Sipariş & Tahmin';
    else if (title.includes('power bi') || title.includes('analitik')) subCat = 'Veri Analitiği & Power BI';
    return { category: '🤖 Yapay Zekâ & Dijital', catId: 'yapay_zeka', subCategory: subCat };
  }

  if (title.includes('ik') || title.includes('insan kaynak') || title.includes('egitmen') || title.includes('terfi') || title.includes('mülakat')) {
    let subCat = 'İç Eğitmen Yetiştirme';
    if (title.includes('terfi') || title.includes('yetkinlik')) subCat = 'Terfi Komitesi & Yetkinlik';
    return { category: '👥 İK & İç Eğitmenlik', catId: 'ik_egitmenlik', subCategory: subCat };
  }

  let subCat = 'Mağaza Müdürlüğü & P&L';
  if (dName.includes('bolge') || title.includes('audit')) subCat = 'Bölge Müdürlüğü & Audit';
  else if (title.includes('vardiya') || title.includes('lider')) subCat = 'Vardiya & Ekip Liderliği';
  return { category: '🏬 Saha & Mağaza Yönetimi', catId: 'saha_magaza', subCategory: subCat };
};

const BUILD_FULL_CATALOG = (): CourseItem[] => {
  const courses: CourseItem[] = [];

  DEPARTMENTS_DATA.forEach((dept) => {
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

      const mapped = resolveCategoryMapping(dept, cName);

      courses.push({
        id: `dept_${dept.id}_y1_${idx}`,
        title: cName,
        category: mapped.category,
        subCategory: mapped.subCategory,
        deptId: dept.id,
        department: dept.name,
        duration: 12 + idx * 4,
        level: idx === 0 ? 'Temel Seviye' : 'Görev Yetkinliği',
        isMandatory: idx % 2 === 0,
        description: `${dept.name} pozisyonu için 1. yıl müfredatı kapsamındaki ${cName} eğitim modülü. ${dept.description}`,
        slug: slug || `egitim-${dept.id}-y1-${idx}`
      });
    });

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

      const mapped = resolveCategoryMapping(dept, cName);

      courses.push({
        id: `dept_${dept.id}_y2_${idx}`,
        title: cName,
        category: mapped.category,
        subCategory: mapped.subCategory,
        deptId: dept.id,
        department: dept.name,
        duration: 20 + idx * 6,
        level: idx >= 2 ? 'Stratejik Yönetim' : 'İleri Seviye',
        isMandatory: idx === 0,
        description: `${dept.name} pozisyonu için 2. yıl müfredatı kapsamındaki ${cName} eğitim modülü. ${dept.description}`,
        slug: slug || `egitim-${dept.id}-y2-${idx}`
      });
    });
  });

  return courses;
};

const ALL_COURSES = BUILD_FULL_CATALOG();

const ALL_INSTRUCTORS = Object.values(INSTRUCTORS_DATA);

function EgitimlerCatalogContent() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [positionSearchQuery, setPositionSearchQuery] = useState('');
  const [selectedMainCatId, setSelectedMainCatId] = useState('all');

  // HEADER DROPDOWN FILTERS
  const [instructorFilter, setInstructorFilter] = useState('all');
  const [positionFilter, setPositionFilter] = useState('all');
  const [kapsamFilter, setKapsamFilter] = useState('all');
  const [certFilter, setCertFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  // FILTER EXCLUSIVELY TO SHOW ONLY SELECTED COURSES
  const [showOnlySelected, setShowOnlySelected] = useState(false);

  const [sortField, setSortField] = useState<'title' | 'department' | 'duration' | 'price'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // MULTI-SELECTION CHECKBOX STATE
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  
  // SHOPPING CART STATE & DRAWER MODAL
  const [cartItemIds, setCartItemIds] = useState<string[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const [selectedCourseDetail, setSelectedCourseDetail] = useState<DetailedCourse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);

  // VIEW MODE: POSITION GROUPED OR FLAT TABLE
  const [viewMode, setViewMode] = useState<'grouped' | 'flat'>('grouped');
  const [expandedPositionIds, setExpandedPositionIds] = useState<string[]>(() => DEPARTMENTS_DATA.map((d) => d.id));

  const togglePositionExpand = (deptId: string) => {
    setExpandedPositionIds((prev) =>
      prev.includes(deptId) ? prev.filter((id) => id !== deptId) : [...prev, deptId]
    );
  };

  const toggleExpandAllPositions = () => {
    const allIds = DEPARTMENTS_DATA.map((d) => d.id);
    if (expandedPositionIds.length === allIds.length) {
      setExpandedPositionIds([]);
    } else {
      setExpandedPositionIds(allIds);
    }
  };

  // Active Main Category Object
  const currentMainCatObj = useMemo(() => {
    return HIERARCHY.find((c) => c.id === selectedMainCatId) || HIERARCHY[0];
  }, [selectedMainCatId]);

  // Filtered positions list based on position search input
  const filteredPositionsList = useMemo(() => {
    if (!positionSearchQuery) return DEPARTMENTS_DATA;
    return DEPARTMENTS_DATA.filter((d) =>
      d.name.toLowerCase().includes(positionSearchQuery.toLowerCase())
    );
  }, [positionSearchQuery]);

  // TOTAL SELECTED BUDGET (TL) & TOTAL HOURS (SAAT) CALCULATION
  const selectedTotals = useMemo(() => {
    let budget = 0;
    let hours = 0;
    selectedCourseIds.forEach((id) => {
      const course = ALL_COURSES.find((c) => c.id === id);
      if (course) {
        budget += calculateCoursePrice(course).price;
        hours += course.duration || 0;
      }
    });
    return { budget, hours, count: selectedCourseIds.length };
  }, [selectedCourseIds]);

  // CART TOTALS CALCULATION
  const cartTotals = useMemo(() => {
    let budget = 0;
    let hours = 0;
    cartItemIds.forEach((id) => {
      const course = ALL_COURSES.find((c) => c.id === id);
      if (course) {
        budget += calculateCoursePrice(course).price;
        hours += course.duration || 0;
      }
    });
    return { budget, hours, count: cartItemIds.length };
  }, [cartItemIds]);

  // Course Count Helpers
  const getMainCategoryCount = (catId: string) => {
    if (catId === 'all') return ALL_COURSES.length;
    const obj = HIERARCHY.find(c => c.id === catId);
    if (!obj) return 0;
    return ALL_COURSES.filter(c => c.category === obj.name).length;
  };

  const getPositionCourseCount = (deptId: string) => {
    return ALL_COURSES.filter((c) => c.deptId === deptId || c.department === deptId).length;
  };

  // Filter & Sort Courses including Certification Badge & Level Filter
  const filteredCourses = useMemo(() => {
    const list = ALL_COURSES.filter((course) => {
      if (showOnlySelected && !selectedCourseIds.includes(course.id)) {
        return false;
      }

      const priceInfo = calculateCoursePrice(course);
      const certBadge = getCourseCertBadge(course, priceInfo.price);

      const matchesSearch =
        searchQuery === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesMainCategory =
        selectedMainCatId === 'all' || course.category === currentMainCatObj.name;

      const instructorObj = getInstructorForCourse(course.slug || course.id, course.category);
      const matchesInstructor =
        instructorFilter === 'all' || instructorObj.id === instructorFilter || instructorObj.name === instructorFilter;

      const matchesPosition =
        positionFilter === 'all' || course.deptId === positionFilter || course.department === positionFilter;

      const matchesKapsam =
        kapsamFilter === 'all' ||
        (kapsamFilter === 'Zorunlu' && course.isMandatory) ||
        (kapsamFilter === 'Önerilen' && !course.isMandatory);

      const matchesCert =
        certFilter === 'all' || certBadge.type === certFilter;

      const matchesLevel =
        levelFilter === 'all' || priceInfo.badge === levelFilter;

      return (
        matchesSearch &&
        matchesMainCategory &&
        matchesInstructor &&
        matchesPosition &&
        matchesKapsam &&
        matchesCert &&
        matchesLevel
      );
    });

    return list.sort((a, b) => {
      if (sortField === 'price') {
        const priceA = calculateCoursePrice(a).price;
        const priceB = calculateCoursePrice(b).price;
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      }
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        return sortOrder === 'asc'
          ? (valA as string).localeCompare(valB as string, 'tr')
          : (valB as string).localeCompare(valA as string, 'tr');
      }
      return sortOrder === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });
  }, [searchQuery, selectedMainCatId, currentMainCatObj, instructorFilter, positionFilter, kapsamFilter, certFilter, levelFilter, showOnlySelected, selectedCourseIds, sortField, sortOrder]);

  // GROUPED COURSES BY DEPARTMENT / POSITION
  const groupedCoursesByDepartment = useMemo(() => {
    return DEPARTMENTS_DATA.map((dept) => {
      const courses = filteredCourses.filter(
        (c) => c.deptId === dept.id || c.department === dept.name
      );
      return {
        dept,
        courses
      };
    }).filter((group) => group.courses.length > 0);
  }, [filteredCourses]);

  // DISPLAYED TOTALS FOR TABLE FOOTER (TFOOT): IF COURSES CHECKED -> SELECTED TOTAL, ELSE -> FILTERED TOTAL
  const displayedTotals = useMemo(() => {
    if (selectedCourseIds.length > 0) {
      return selectedTotals;
    }
    let budget = 0;
    let hours = 0;
    filteredCourses.forEach((c) => {
      budget += calculateCoursePrice(c).price;
      hours += c.duration || 0;
    });
    return { budget, hours, count: filteredCourses.length };
  }, [selectedCourseIds, selectedTotals, filteredCourses]);

  const getCoursesForExport = () => {
    if (selectedCourseIds.length > 0) {
      return ALL_COURSES.filter(c => selectedCourseIds.includes(c.id));
    }
    return filteredCourses;
  };

  // 100% PERFECT TURKISH CHARACTER EXCEL (.xls XML) EXPORT
  const exportToExcel = () => {
    const coursesToExport = getCoursesForExport();
    let totalHours = 0;
    let totalPrice = 0;

    const tableRowsHtml = coursesToExport.map((c, idx) => {
      const priceInfo = calculateCoursePrice(c);
      const certBadge = getCourseCertBadge(c, priceInfo.price);
      const instructor = getInstructorForCourse(c.slug || c.id, c.category);
      totalHours += c.duration;
      totalPrice += priceInfo.price;

      return `
        <tr>
          <td style="text-align: center; border: 1px solid #CCC; padding: 6px;">${idx + 1}</td>
          <td style="font-weight: bold; color: #0B2A4A; border: 1px solid #CCC; padding: 6px;">${c.title}</td>
          <td style="border: 1px solid #CCC; padding: 6px;">${c.department}</td>
          <td style="border: 1px solid #CCC; padding: 6px;">${instructor.name}</td>
          <td style="text-align: center; border: 1px solid #CCC; padding: 6px;">${c.duration} Sa</td>
          <td style="text-align: right; font-weight: bold; color: #087F96; border: 1px solid #CCC; padding: 6px;">₺${priceInfo.price.toLocaleString('tr-TR')} TL</td>
          <td style="text-align: center; border: 1px solid #CCC; padding: 6px;">${priceInfo.badge}</td>
          <td style="border: 1px solid #CCC; padding: 6px;">${certBadge.label}</td>
          <td style="text-align: center; border: 1px solid #CCC; padding: 6px;">${c.isMandatory ? 'Zorunlu' : 'Önerilen'}</td>
        </tr>
      `;
    }).join('');

    const excelHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Eğitim Teklifi</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          body { font-family: Calibri, Arial, sans-serif; }
          table { border-collapse: collapse; width: 100%; }
          th { background-color: #0B2A4A; color: #FFFFFF; font-weight: bold; text-align: left; padding: 8px; border: 1px solid #0B2A4A; }
          td { padding: 6px; border: 1px solid #CCC; }
          .tfoot { background-color: #F4F7F9; font-weight: bold; }
        </style>
      </head>
      <body>
        <h2 style="color: #0B2A4A;">PERAKENDE KARİYER AKADEMİSİ - KURUMSAL EĞİTİM LİSTESİ</h2>
        <p><b>Tarih:</b> ${new Date().toLocaleDateString('tr-TR')} | <b>Toplam Ders:</b> ${coursesToExport.length}</p>
        <table border="1">
          <thead>
            <tr>
              <th>#</th>
              <th>Ders Adı</th>
              <th>Pozisyon</th>
              <th>Eğitmen</th>
              <th>Süre</th>
              <th>Eğitim Ücreti</th>
              <th>Eğitim Seviyesi</th>
              <th>Sertifika Akreditasyonu</th>
              <th>Kapsam</th>
            </tr>
          </thead>
          <tbody>
            ${tableRowsHtml}
          </tbody>
          <tfoot>
            <tr class="tfoot">
              <td colspan="4" style="text-align: right; font-weight: bold; border: 1px solid #CCC; padding: 8px;">GENEL TOPLAM SÜRE VE BÜTÇE:</td>
              <td style="text-align: center; color: #087F96; font-weight: bold; border: 1px solid #CCC; padding: 8px;">${totalHours} Saat</td>
              <td style="text-align: right; color: #0B2A4A; font-weight: bold; border: 1px solid #CCC; padding: 8px;">₺${totalPrice.toLocaleString('tr-TR')} TL</td>
              <td colspan="3" style="border: 1px solid #CCC; padding: 8px;"></td>
            </tr>
          </tfoot>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + excelHtml], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Perakende_Akademi_Egitim_Teklifi_${new Date().toISOString().slice(0, 10)}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerActionNotification(`📊 ${coursesToExport.length} Eğitimin Türkçe Karakter Uyumlu Excel Dokümanı İndirildi!`);
  };

  const exportToWord = () => {
    const coursesToExport = getCoursesForExport();
    let totalHours = 0;
    let totalPrice = 0;
    
    const tableRowsHtml = coursesToExport.map((c, idx) => {
      const priceInfo = calculateCoursePrice(c);
      const certBadge = getCourseCertBadge(c, priceInfo.price);
      const instructor = getInstructorForCourse(c.slug || c.id, c.category);
      totalHours += c.duration;
      totalPrice += priceInfo.price;

      return `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${idx + 1}</td>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; color: #0B2A4A;">${c.title}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${c.department}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${instructor.name}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${c.duration} Sa</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: bold; color: #087F96;">₺${priceInfo.price.toLocaleString('tr-TR')} TL</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${priceInfo.badge}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${certBadge.label}</td>
        </tr>
      `;
    }).join('');

    const wordHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Kurumsal Eğitim Teklifi</title></head>
      <body style="font-family: Arial, sans-serif; padding: 25px;">
        <h1 style="color: #0B2A4A; text-align: center; margin-bottom: 5px;">PERAKENDE KARİYER AKADEMİSİ</h1>
        <h2 style="color: #087F96; text-align: center; font-size: 16px; margin-top: 0;">Kurumsal Eğitim Teklifi & Müfredat Raporu</h2>
        <p style="text-align: right; font-size: 11px; color: #666;">Tarih: ${new Date().toLocaleDateString('tr-TR')}</p>
        <hr style="border: 1px solid #0B2A4A; margin-bottom: 20px;" />
        <h3>Seçilen Eğitim Detayları ve Bütçe Tablosu</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <thead>
            <tr style="background-color: #0B2A4A; color: white;">
              <th style="padding: 8px; border: 1px solid #ddd;">#</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Ders Adı</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Pozisyon</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Eğitmen</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Süre</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Ücret</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Seviye</th>
              <th style="padding: 8px; border: 1px solid #ddd;">Sertifika</th>
            </tr>
          </thead>
          <tbody>
            ${tableRowsHtml}
          </tbody>
          <tfoot>
            <tr style="background-color: #F4F7F9; font-weight: bold;">
              <td colspan="4" style="padding: 10px; border: 1px solid #ddd; text-align: right;">TOPLAM MÜFREDAT SÜRESİ VE BÜTÇE:</td>
              <td style="padding: 10px; border: 1px solid #ddd; text-align: center; color: #087F96;">${totalHours} Saat</td>
              <td style="padding: 10px; border: 1px solid #ddd; text-align: right; color: #0B2A4A; font-size: 14px;">₺${totalPrice.toLocaleString('tr-TR')} TL</td>
              <td colspan="2" style="padding: 10px; border: 1px solid #ddd;"></td>
            </tr>
          </tfoot>
        </table>
        <div style="margin-top: 30px; font-size: 11px; color: #555;">
          <p><strong>Kurumsal Notlar & Bilgilendirme:</strong></p>
          <ul>
            <li>Tüm ücretlere KDV dahildir.</li>
            <li>Üniversite Onaylı eğitimlerde e-Devlet Barkodlu sertifikasyon sunulmaktadır.</li>
          </ul>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', wordHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Perakende_Akademi_Teklif_${new Date().toISOString().slice(0, 10)}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerActionNotification(`📝 ${coursesToExport.length} Eğitimin Word (.doc) Dokümanı İndirildi!`);
  };

  const exportToPdf = () => {
    const coursesToExport = getCoursesForExport();
    let totalHours = 0;
    let totalPrice = 0;
    
    const tableRowsHtml = coursesToExport.map((c, idx) => {
      const priceInfo = calculateCoursePrice(c);
      const certBadge = getCourseCertBadge(c, priceInfo.price);
      const instructor = getInstructorForCourse(c.slug || c.id, c.category);
      totalHours += c.duration;
      totalPrice += priceInfo.price;

      return `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${idx + 1}</td>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; color: #0B2A4A;">${c.title}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${c.department}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${instructor.name}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${c.duration} Sa</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: bold; color: #087F96;">₺${priceInfo.price.toLocaleString('tr-TR')} TL</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${priceInfo.badge}</td>
          <td style="padding: 8px; border: 1px solid #ddd; font-size: 11px;">${certBadge.shortLabel}</td>
        </tr>
      `;
    }).join('');

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Perakende Kariyer Akademisi - Kurumsal Teklif Raporu PDF</title>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #333; }
              .header { text-align: center; border-bottom: 3px solid #0B2A4A; padding-bottom: 15px; margin-bottom: 20px; }
              .title { font-size: 24px; font-weight: 900; color: #0B2A4A; margin: 0; }
              .subtitle { font-size: 14px; color: #087F96; margin-top: 5px; font-weight: 700; }
              .meta { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 12px; color: #555; }
              table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 25px; }
              th { background-color: #0B2A4A; color: white; padding: 10px; border: 1px solid #0B2A4A; text-align: left; }
              td { padding: 9px; border: 1px solid #e2e8f0; }
              .tfoot-row { background-color: #f8fafc; font-weight: bold; }
              .summary-box { background-color: #f0fdf4; border: 2px solid #22c55e; padding: 15px; border-radius: 12px; display: flex; justify-content: space-between; font-size: 13px; font-weight: bold; }
              .footer { margin-top: 40px; font-size: 11px; text-align: center; color: #888; border-top: 1px solid #ddd; padding-top: 10px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="title">PERAKENDE KARİYER EĞİTİM AKADEMİSİ</div>
              <div class="subtitle">Resmî Kurumsal Teklif ve Müfredat Raporu</div>
            </div>
            <div class="meta">
              <div><strong>Teklif No:</strong> PKA-2026-${Math.floor(1000 + Math.random() * 9000)}</div>
              <div><strong>Tarih:</strong> ${new Date().toLocaleDateString('tr-TR')}</div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ders Adı</th>
                  <th>Pozisyon</th>
                  <th>Eğitmen</th>
                  <th>Süre</th>
                  <th style="text-align: right;">Ücret</th>
                  <th>Seviye</th>
                  <th>Sertifika Türü</th>
                </tr>
              </thead>
              <tbody>
                ${tableRowsHtml}
              </tbody>
              <tfoot>
                <tr class="tfoot-row">
                  <td colspan="4" style="text-align: right; padding: 10px;">TOPLAM MÜFREDAT VE BÜTÇE:</td>
                  <td style="text-align: center; color: #087F96; font-weight: bold;">${totalHours} Saat</td>
                  <td style="text-align: right; color: #0B2A4A; font-size: 14px; font-weight: 900;">₺${totalPrice.toLocaleString('tr-TR')} TL</td>
                  <td colspan="2"></td>
                </tr>
              </tfoot>
            </table>
            <div class="summary-box">
              <div>Seçilen Toplam Eğitim: ${coursesToExport.length} Ders</div>
              <div>Toplam Eğitim Süresi: ${totalHours} Saat</div>
              <div style="color: #15803d;">Genel Toplam Bütçe: ₺${totalPrice.toLocaleString('tr-TR')} TL</div>
            </div>
            <div class="footer">
              Perakende Kariyer Akademisi © 2026 • Kurumsal Çözümler ve Yetenek Yönetimi Merkezi • e-Devlet Onaylı Eğitim Kataloğu
            </div>
            <script>
              window.onload = function() { window.print(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
    triggerActionNotification(`📄 ${coursesToExport.length} Eğitimin PDF Raporu Hazırlandı!`);
  };

  const handleSelectMainCategory = (catId: string) => {
    setSelectedMainCatId(catId);
    if (catId === 'all') {
      setViewMode('grouped');
      setExpandedPositionIds(DEPARTMENTS_DATA.map((d) => d.id));
    }
  };

  const toggleCourseSelect = (courseId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedCourseIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const toggleSelectAllFiltered = () => {
    const filteredIds = filteredCourses.map((c) => c.id);
    const allSelected = filteredIds.every((id) => selectedCourseIds.includes(id));
    if (allSelected) {
      setSelectedCourseIds((prev) => prev.filter((id) => !filteredIds.includes(id)));
    } else {
      setSelectedCourseIds((prev) => Array.from(new Set([...prev, ...filteredIds])));
    }
  };

  // Add course to cart
  const addToCart = (courseId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!cartItemIds.includes(courseId)) {
      setCartItemIds(prev => [...prev, courseId]);
      const course = ALL_COURSES.find(c => c.id === courseId);
      triggerActionNotification(`🛒 "${course?.title || 'Eğitim'}" sepetinize eklendi!`);
    } else {
      setIsCartModalOpen(true);
    }
  };

  // Add selected courses to cart
  const addSelectedToCart = () => {
    const idsToAdd = selectedCourseIds.length > 0 ? selectedCourseIds : filteredCourses.map(c => c.id);
    setCartItemIds(prev => Array.from(new Set([...prev, ...idsToAdd])));
    triggerActionNotification(`🛒 ${idsToAdd.length} eğitim sepetinize eklendi!`);
    setIsCartModalOpen(true);
  };

  const handleSort = (field: 'title' | 'department' | 'duration' | 'price') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

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

  const triggerActionNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  const isAllSelected = filteredCourses.length > 0 && filteredCourses.every(c => selectedCourseIds.includes(c.id));

  const renderCourseTable = (courseList: CourseItem[], showTableFooter: boolean = false) => {
    const isListAllSelected = courseList.length > 0 && courseList.every((c) => selectedCourseIds.includes(c.id));

    return (
      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs table-fixed">
          <thead className="bg-[#0B2A4A] text-white uppercase font-black tracking-wider border-b border-white/10 select-none">
            <tr>
              <th
                onClick={() => {
                  const listIds = courseList.map((c) => c.id);
                  const allSel = listIds.every((id) => selectedCourseIds.includes(id));
                  if (allSel) {
                    setSelectedCourseIds((prev) => prev.filter((id) => !listIds.includes(id)));
                  } else {
                    setSelectedCourseIds((prev) => Array.from(new Set([...prev, ...listIds])));
                  }
                }}
                className="py-3 px-1 w-[40px] text-center cursor-pointer hover:bg-white/15 transition-colors border-r border-white/10"
                title="Tüm Listeyi Seç / Kaldır"
              >
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={isListAllSelected}
                    onChange={() => {}}
                    className="w-3.5 h-3.5 rounded text-[#087F96] focus:ring-[#087F96] cursor-pointer accent-[#087F96]"
                  />
                </div>
              </th>

              <th className="py-2.5 px-2.5 w-[22%] bg-[#052240] border-r border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => handleSort('title')}>
                    <span className="text-cyan-300 font-black text-[10px] tracking-wider truncate">DERS ADI</span>
                    <ArrowUpDown className="w-3 h-3 text-cyan-300 shrink-0" />
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Ders ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-7 pr-5 py-0.5 bg-[#0B2A4A] text-white placeholder-gray-400 text-[10px] font-normal rounded-lg border border-cyan-400/40 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </th>

              <th className="py-2.5 px-2 w-[13%] bg-[#084C74] border-r border-white/20">
                <select
                  value={positionFilter}
                  onChange={(e) => setPositionFilter(e.target.value)}
                  className="w-full bg-transparent text-amber-300 font-black text-[10px] uppercase outline-none cursor-pointer border-b border-amber-300 pb-0.5 hover:text-white truncate"
                >
                  <option value="all" className="bg-[#0B2A4A] text-white">🏬 POZİSYON (TÜMÜ)</option>
                  {DEPARTMENTS_DATA.map((d) => (
                    <option key={d.id} value={d.id} className="bg-[#0B2A4A] text-amber-300 font-bold">
                      {d.name}
                    </option>
                  ))}
                </select>
              </th>

              <th className="py-2.5 px-2 w-[12%] bg-[#056B80] border-r border-white/20">
                <select
                  value={instructorFilter}
                  onChange={(e) => setInstructorFilter(e.target.value)}
                  className="w-full bg-transparent text-amber-300 font-black text-[10px] uppercase outline-none cursor-pointer border-b border-amber-300 pb-0.5 hover:text-white truncate"
                >
                  <option value="all" className="bg-[#0B2A4A] text-white">🎓 EĞİTMEN (TÜMÜ)</option>
                  {ALL_INSTRUCTORS.map((inst) => (
                    <option key={inst.id} value={inst.id} className="bg-[#0B2A4A] text-amber-300 font-bold">
                      👤 {inst.name}
                    </option>
                  ))}
                </select>
              </th>

              <th
                onClick={() => handleSort('duration')}
                className="py-3 px-1 w-[45px] text-center cursor-pointer hover:bg-white/10 transition-colors border-r border-white/10"
              >
                <div className="flex items-center justify-center space-x-0.5 text-[10px]">
                  <span>SÜRE</span>
                  <ArrowUpDown className="w-2.5 h-2.5 text-cyan-300 shrink-0" />
                </div>
              </th>

              <th
                onClick={() => handleSort('price')}
                className="py-3 px-2 w-[85px] bg-[#084C74] text-right cursor-pointer hover:bg-[#053856] transition-colors border-r border-white/20"
                title="Fiyata göre artan/azalan sırala"
              >
                <div className="flex items-center justify-end space-x-0.5 text-amber-300 font-black text-[10px]">
                  <span>ÜCRET</span>
                  <ArrowUpDown className="w-2.5 h-2.5 text-amber-300 shrink-0" />
                </div>
              </th>

              <th className="py-2.5 px-2 w-[100px] bg-[#053856] border-r border-white/20 text-center">
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="w-full bg-transparent text-amber-300 font-black text-[10px] uppercase outline-none cursor-pointer border-b border-amber-300 pb-0.5 hover:text-white text-center truncate"
                >
                  <option value="all" className="bg-[#0B2A4A] text-white">⭐ SEVİYE (TÜMÜ)</option>
                  <option value="Executive" className="bg-[#0B2A4A] text-amber-300 font-bold">👑 Executive</option>
                  <option value="Yönetici" className="bg-[#0B2A4A] text-purple-300 font-bold">👔 Yönetici</option>
                  <option value="Uzmanlık" className="bg-[#0B2A4A] text-emerald-300 font-bold">⭐ Uzmanlık</option>
                  <option value="Standart" className="bg-[#0B2A4A] text-blue-300 font-bold">🔹 Standart</option>
                </select>
              </th>

              <th className="py-2.5 px-2 w-[125px] bg-purple-950 border-r border-purple-400/40 text-center">
                <select
                  value={certFilter}
                  onChange={(e) => setCertFilter(e.target.value)}
                  className="w-full bg-transparent text-purple-200 font-black text-[10px] uppercase outline-none cursor-pointer border-b border-purple-300 pb-0.5 hover:text-white text-center truncate"
                >
                  <option value="all" className="bg-[#0B2A4A] text-white">📜 SERTİFİKA TÜRÜ</option>
                  <option value="universite" className="bg-[#0B2A4A] text-purple-200">🎓 Üniversite</option>
                  <option value="egitmen" className="bg-[#0B2A4A] text-emerald-200">📜 Eğitmen</option>
                  <option value="sertifikasiz" className="bg-[#0B2A4A] text-gray-300">⚪ Sertifikasız</option>
                </select>
              </th>

              <th className="py-2.5 px-1 w-[55px] text-center border-r border-white/10">
                <select
                  value={kapsamFilter}
                  onChange={(e) => setKapsamFilter(e.target.value)}
                  className="w-full bg-transparent text-white font-black text-[10px] uppercase outline-none cursor-pointer border-b border-white/40 pb-0.5 hover:text-cyan-300 text-center"
                >
                  <option value="all" className="bg-[#0B2A4A] text-white">KAPSAM</option>
                  <option value="Zorunlu" className="bg-[#0B2A4A] text-rose-300">Zorunlu</option>
                  <option value="Önerilen" className="bg-[#0B2A4A] text-blue-300">Önerilen</option>
                </select>
              </th>

              <th className="py-3 px-1 w-[140px] text-center">İŞLEM</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 font-medium">
            {courseList.map((course) => {
              const instructor = getInstructorForCourse(course.slug || course.id, course.category);
              const courseImg = getCourseImage(course.title, course.category, course.department);
              const isSelected = selectedCourseIds.includes(course.id);
              const isInCart = cartItemIds.includes(course.id);
              const priceInfo = calculateCoursePrice(course);
              const certBadge = getCourseCertBadge(course, priceInfo.price);

              return (
                <tr
                  key={course.id}
                  onClick={() => handleOpenCourseModal(course)}
                  className={`hover:bg-blue-50/60 cursor-pointer transition-colors ${
                    isSelected ? 'bg-emerald-50/90 border-l-4 border-l-emerald-500 font-bold' : ''
                  }`}
                >
                  <td
                    className="py-3 px-1 text-center border-r border-gray-100 w-[40px]"
                    onClick={(e) => toggleCourseSelect(course.id, e)}
                  >
                    <div className="flex flex-col items-center justify-center space-y-0.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="w-3.5 h-3.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                      />
                      {isSelected && (
                        <span className="px-1 py-0.2 bg-emerald-600 text-white font-black text-[8px] rounded-full uppercase tracking-tighter">
                          ✓
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-2.5 px-2.5 w-[22%] overflow-hidden">
                    <div className="flex items-start space-x-2">
                      <div className="relative shrink-0 mt-0.5">
                        <img src={courseImg} alt={course.title} className="w-8 h-8 rounded-lg object-cover border border-gray-200 shadow-xs" />
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-sm">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="font-extrabold text-xs text-[#0B2A4A] group-hover:text-[#087F96] leading-tight truncate" title={course.title}>
                          {course.title}
                        </div>
                        <span className="text-[10px] text-gray-400 block truncate">{course.subCategory}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-2.5 px-2 text-emerald-800 font-extrabold text-[11px] truncate bg-emerald-50/20" title={course.department}>
                    {course.department}
                  </td>

                  <td className="py-2.5 px-2 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center space-x-1.5 min-w-0">
                      <img
                        src={instructor.avatar}
                        alt={instructor.name}
                        className="w-6 h-6 rounded-full object-cover border border-emerald-500 shrink-0"
                      />
                      <button
                        onClick={(e) => handleOpenInstructorModal(e, instructor)}
                        className="font-bold text-[11px] text-[#0B2A4A] hover:text-[#087F96] hover:underline truncate"
                        title={instructor.name}
                      >
                        {instructor.name}
                      </button>
                    </div>
                  </td>

                  <td className="py-2.5 px-1 text-center font-mono font-bold text-gray-700 text-xs border-r border-gray-100">{course.duration} Sa</td>

                  <td className="py-2.5 px-2 text-right whitespace-nowrap bg-amber-50/70 border-r border-amber-200/80">
                    <div className="font-black text-xs text-[#0B2A4A] font-mono">
                      {priceInfo.formatted}
                    </div>
                  </td>

                  <td className="py-2.5 px-2 text-center border-r border-gray-100 w-[100px]" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setLevelFilter(levelFilter === priceInfo.badge ? 'all' : priceInfo.badge)}
                      className={`inline-flex items-center justify-center px-2 py-0.5 rounded-lg text-[10px] border shadow-2xs font-extrabold cursor-pointer transition-transform hover:scale-105 ${priceInfo.badgeColor}`}
                      title={`Tıklayarak sadece ${priceInfo.badge} seviyesindeki eğitimleri süzün`}
                    >
                      {priceInfo.badge}
                    </button>
                  </td>

                  <td className="py-2.5 px-2 text-center border-r border-gray-100 w-[125px]">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] border shadow-2xs ${certBadge.badgeClass}`}>
                      {certBadge.shortLabel}
                    </span>
                  </td>

                  <td className="py-2.5 px-1 text-center border-r border-gray-100">
                    <span className={`px-1.5 py-0.5 text-[9px] font-black rounded ${
                      course.isMandatory ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {course.isMandatory ? 'Zorunlu' : 'Önerilen'}
                    </span>
                  </td>

                  <td className="py-2.5 px-1 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center space-x-1">
                      <button
                        onClick={() => {
                          addToCart(course.id);
                          setIsCartModalOpen(true);
                        }}
                        className="px-2 py-1 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-lg shadow-xs transition-all flex items-center space-x-0.5 text-[10px] border border-amber-300"
                        title="Şimdi Satın Al"
                      >
                        <CreditCard className="w-3 h-3" />
                        <span>Satın Al</span>
                      </button>

                      <button
                        onClick={(e) => addToCart(course.id, e)}
                        className={`p-1 rounded-lg font-bold text-[10px] transition-all border ${
                          isInCart
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300 font-black'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500'
                        }`}
                        title={isInCart ? 'Sepetinizde Ekli' : 'Sepete Ekle'}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleOpenCourseModal(course)}
                        className="px-1.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg text-[10px] border border-gray-200"
                      >
                        Detay
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>

          {showTableFooter && (
            <tfoot className="bg-[#0B2A4A] text-white font-black border-t-2 border-amber-400 select-none">
              <tr>
                <td className="py-3 px-1 text-center font-mono text-[9px] text-amber-300 border-r border-white/10">
                  {selectedCourseIds.length > 0 ? `${selectedCourseIds.length} SEÇİLİ` : `${courseList.length} DERS`}
                </td>
                <td className="py-3 px-2.5 text-xs text-amber-300 uppercase tracking-wider font-extrabold">
                  {selectedCourseIds.length > 0
                    ? `SEÇİLEN (${selectedCourseIds.length}) EĞİTİM TOPLAMI`
                    : `LİSTELENEN (${courseList.length}) EĞİTİM TOPLAMI`}
                </td>
                <td className="py-3 px-2 text-[10px] text-gray-300 font-bold uppercase truncate border-r border-white/10">
                  GENEL MÜFREDAT
                </td>
                <td className="py-3 px-2 text-[10px] text-gray-300 font-bold uppercase truncate border-r border-white/10">
                  AKADEMİ KADROSU
                </td>
                <td className="py-3 px-1 text-center font-mono font-black text-cyan-300 text-xs border-r border-white/10">
                  {displayedTotals.hours} Sa
                </td>
                <td className="py-3 px-2 text-right bg-amber-400/25 text-amber-300 font-black text-xs font-mono border-r border-amber-400/50 shadow-inner">
                  <div className="space-y-0.5">
                    <div className="text-amber-300 text-xs font-black">
                      ₺{displayedTotals.budget.toLocaleString('tr-TR')} TL
                    </div>
                    <div className="text-[8px] text-amber-200 font-bold uppercase tracking-tighter">
                      TOPLAM TUTAR
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 text-center text-[9px] text-amber-200 font-bold border-r border-white/10">
                  TÜM SEVİYELER
                </td>
                <td className="py-3 px-2 text-center text-[9px] text-purple-200 font-bold border-r border-white/10">
                  AKREDİTE
                </td>
                <td className="py-3 px-1 text-center text-[9px] text-gray-300 font-bold border-r border-white/10">
                  GENEL
                </td>
                <td className="py-3 px-1 text-center">
                  <button
                    onClick={addSelectedToCart}
                    className="px-2.5 py-1 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-lg text-[10px] shadow-md border border-amber-300 cursor-pointer transition-all hover:scale-105"
                  >
                    💳 Toplu Satın Al
                  </button>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#0B2A4A] text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-emerald-400 flex items-center space-x-3 animate-in fade-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{notificationMsg}</span>
        </div>
      )}

      {/* TOP FLOATING / HEADER SHOPPING CART BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-[#0B2A4A] via-[#052240] to-[#087F96] p-4 rounded-3xl text-white shadow-lg border border-amber-400/40">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-black text-amber-300 uppercase tracking-wider flex items-center space-x-2">
              <span>Perakende Akademi Eğitim Sepeti</span>
              {cartTotals.count > 0 && (
                <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.2 rounded-full font-mono">
                  {cartTotals.count} Eğitmen Dersi
                </span>
              )}
            </div>
            <div className="text-xs text-gray-200 font-medium">
              Eğitimleri sepete ekleyebilir, kurumsal fatura veya kredi kartı ile anında satın alabilirsiniz.
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsCartModalOpen(true)}
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-2xl text-xs shadow-xl transition-all flex items-center space-x-2 border border-amber-300 cursor-pointer scale-105 hover:scale-110 shrink-0"
        >
          <ShoppingCart className="w-4 h-4 text-slate-950" />
          <span>SEPETİM ({cartTotals.count}) - ₺{cartTotals.budget.toLocaleString('tr-TR')} TL</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>

      {/* SERTİFİKA ROZET TÜRLERİ & AKREDİTASYON BİLGİLENDİRME KARTI */}
      <div className="bg-white p-6 rounded-3xl border-2 border-purple-400/60 shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-[#0B2A4A] font-black text-sm uppercase tracking-wider">
            <Award className="w-5 h-5 text-purple-600" />
            <span>📜 Eğitim Sertifikasyon Türleri & Akreditasyon Rozetleri</span>
          </div>

          {/* TOP CERTIFICATION FILTER DROPDOWN */}
          <div className="flex items-center space-x-2 text-xs font-bold text-gray-700">
            <span>Rozet Süzgeci:</span>
            <select
              value={certFilter}
              onChange={(e) => setCertFilter(e.target.value)}
              className="bg-purple-50 text-purple-900 font-extrabold text-xs px-3 py-1.5 rounded-xl border border-purple-300 outline-none cursor-pointer"
            >
              <option value="all">Sertifika (Tümü)</option>
              <option value="universite">🎓 Üniversite Sertifikalı</option>
              <option value="egitmen">📜 Eğitmen Sertifikalı</option>
              <option value="sertifikasiz">⚪ Sertifikasız</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-purple-50/80 rounded-2xl border border-purple-300 flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-purple-900 text-purple-100 font-black shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-purple-900 block text-xs">🎓 Üniversite Sertifikalı</span>
              <p className="text-[11px] text-gray-600 font-medium leading-snug">
                Anlaşmalı Devlet/Vakıf Üniversitesi Onaylı, e-Devlet Barkodlu ve uluslararası geçerli sertifika.
              </p>
            </div>
          </div>

          <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-300 flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-emerald-700 text-white font-black shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-emerald-900 block text-xs">📜 Eğitmen Sertifikalı</span>
              <p className="text-[11px] text-gray-600 font-medium leading-snug">
                Akademi Başeğitmeni Islak/Dijital İmzalı Kurumsal Uzmanlık Sertifikası.
              </p>
            </div>
          </div>
          <div className="p-3 bg-gray-100/90 rounded-2xl border border-gray-300 flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-gray-400 text-white font-black shrink-0">
              <X className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-gray-800 block text-xs">⚪ Sertifikasız</span>
              <p className="text-[11px] text-gray-600 font-medium leading-snug">
                Hızlı oryantasyon ve temel görev bilgilendirme modülleri (Sertifika verilmez).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TEK ARAMA ÇUBUĞU VE POZİSYON / KATEGORİ SEÇİM KARTI */}
      <div className="bg-gradient-to-r from-blue-900 via-[#0B2A4A] to-[#087F96] p-6 rounded-3xl text-white shadow-xl space-y-4 border border-blue-400/40">
        
        {/* TEK ARAMA ÇUBUĞU VEYA POZİSYON MENÜSÜNDEN SEÇİM ROW */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center space-x-2">
                <span>Tek Arama Çubuğunda Pozisyona Göre Eğitim Seçimi</span>
              </h2>
              <p className="text-xs text-gray-200 font-medium">
                Kutuya yazarak veya menüden seçerek {ALL_COURSES.length} eğitimi pozisyon bazlı süzün
              </p>
            </div>
          </div>

          {/* SINGLE UNIFIED SEARCH INPUT + POSITION SELECT DROPDOWN */}
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
            
            {/* 1. SINGLE LIVE SEARCH INPUT */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type="text"
                placeholder="Pozisyon veya ders ara (örn: Manav, Kasiyer)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-white/10 hover:bg-white/20 text-white placeholder-gray-300 text-xs font-bold rounded-2xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* 2. SINGLE POSITION & CATEGORY DROPDOWN SELECT */}
            <div className="relative w-full sm:w-72">
              <select
                value={positionFilter !== 'all' ? positionFilter : selectedMainCatId}
                onChange={(e) => {
                  const val = e.target.value;
                  const isMainCat = HIERARCHY.some((h) => h.id === val);
                  if (isMainCat) {
                    handleSelectMainCategory(val);
                    setPositionFilter('all');
                  } else {
                    setPositionFilter(val);
                  }
                }}
                className="w-full py-2.5 px-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-2xl border border-amber-300 outline-none cursor-pointer shadow-md transition-all truncate"
              >
                <option value="all" className="bg-[#0B2A4A] text-white font-bold">
                  🎓 Tüm Pozisyonlar ve Eğitimler ({ALL_COURSES.length} Ders)
                </option>
                <optgroup label="── 🏢 ANA POZİSYON KATEGORİLERİ ──" className="bg-[#0B2A4A] text-amber-300 font-extrabold">
                  {HIERARCHY.filter(h => h.id !== 'all').map(h => (
                    <option key={h.id} value={h.id} className="bg-[#0B2A4A] text-cyan-200 font-bold">
                      {h.name} ({getMainCategoryCount(h.id)} Ders)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="── 🏬 TÜM POZİSYON KADROLARI ──" className="bg-[#052240] text-emerald-300 font-extrabold">
                  {DEPARTMENTS_DATA.map(d => (
                    <option key={d.id} value={d.id} className="bg-[#0B2A4A] text-white font-medium">
                      🏬 {d.name} ({getPositionCourseCount(d.id)} Ders)
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

          </div>

        </div>
      </div>

      {/* TOOLBAR WITH MASTER CHECKBOX & SHOW ONLY SELECTED BUTTON & EXPORT BUTTONS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-gray-600 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={toggleSelectAllFiltered}
            className="flex items-center space-x-2 px-3.5 py-2 bg-[#0B2A4A] hover:bg-[#061B33] text-white rounded-xl transition-all shadow-xs border border-white/20"
          >
            {isAllSelected ? (
              <CheckSquare className="w-4 h-4 text-emerald-400" />
            ) : (
              <Square className="w-4 h-4 text-gray-300" />
            )}
            <span>Tümünü Seç / Seçimi Kaldır ({filteredCourses.length})</span>
          </button>

          {/* EXPORT BUTTONS GROUP IN TOOLBAR */}
          <div className="flex items-center space-x-1.5 bg-gray-100 p-1 rounded-xl border border-gray-200">
            <span className="text-[10px] text-gray-500 font-extrabold px-1.5">DÖKÜMAN İNDİR:</span>
            
            <button
              onClick={exportToPdf}
              className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-[11px] transition-all flex items-center space-x-1 shadow-xs"
              title="Seçilen / Listelenen Eğitimleri PDF Olarak İndir"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>

            <button
              onClick={exportToExcel}
              className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-[11px] transition-all flex items-center space-x-1 shadow-xs"
              title="Seçilen / Listelenen Eğitimleri Türkçe Karakter Uyumlu Excel (.xls) Olarak İndir"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Excel</span>
            </button>

            <button
              onClick={exportToWord}
              className="px-2.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-[11px] transition-all flex items-center space-x-1 shadow-xs"
              title="Seçilen / Listelenen Eğitimleri Word (.doc) Olarak İndir"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Word</span>
            </button>
          </div>

          {/* VIEW MODE TOGGLE & POSITION GROUPING CONTROLS */}
          <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => {
                setViewMode('grouped');
                setExpandedPositionIds(DEPARTMENTS_DATA.map((d) => d.id));
              }}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-extrabold transition-all flex items-center space-x-1.5 cursor-pointer ${
                viewMode === 'grouped'
                  ? 'bg-[#0B2A4A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#0B2A4A] hover:bg-gray-200'
              }`}
              title="Eğitimleri pozisyonlarına göre gruplayarak göster"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Pozisyona Göre Aç ({groupedCoursesByDepartment.length} Pozisyon)</span>
            </button>

            <button
              onClick={() => setViewMode('flat')}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-extrabold transition-all flex items-center space-x-1.5 cursor-pointer ${
                viewMode === 'flat'
                  ? 'bg-[#0B2A4A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#0B2A4A] hover:bg-gray-200'
              }`}
              title="Tüm eğitimleri düz tablo halinde göster"
            >
              <List className="w-3.5 h-3.5" />
              <span>Düz Liste</span>
            </button>

            {viewMode === 'grouped' && (
              <button
                onClick={toggleExpandAllPositions}
                className="px-2.5 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-lg text-[11px] transition-all flex items-center space-x-1 shadow-xs cursor-pointer ml-1"
                title="Tüm pozisyon kartlarını aç veya kapat"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>{expandedPositionIds.length === DEPARTMENTS_DATA.length ? 'Tümünü Daralt' : 'Tümünü Aç'}</span>
              </button>
            )}
          </div>

          {selectedCourseIds.length > 0 && (
            <button
              onClick={() => setShowOnlySelected((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 shadow-md border cursor-pointer ${
                showOnlySelected
                  ? 'bg-amber-400 text-slate-950 border-amber-500 scale-105'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500'
              }`}
              title="Tıklayarak sadece seçilen eğitimleri ekranda filtreleyin"
            >
              {showOnlySelected ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>
                {showOnlySelected
                  ? `👁️ SEÇİLENLER (${selectedCourseIds.length})`
                  : `SEÇİLENLERİ GÖSTER (${selectedCourseIds.length})`}
              </span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-3 text-xs">
          {(searchQuery || instructorFilter !== 'all' || positionFilter !== 'all' || kapsamFilter !== 'all' || certFilter !== 'all' || levelFilter !== 'all' || showOnlySelected) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setInstructorFilter('all');
                setPositionFilter('all');
                setKapsamFilter('all');
                setCertFilter('all');
                setLevelFilter('all');
                setShowOnlySelected(false);
              }}
              className="text-rose-600 font-extrabold hover:underline flex items-center space-x-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Sıfırla</span>
            </button>
          )}

          <span className="text-gray-400 font-medium hidden md:inline">
            Süre veya fiyat sıralaması için ilgili başlığa tıklayabilirsiniz.
          </span>
        </div>
      </div>

      {/* FLUID FULL-WIDTH TABLE / POSITION GROUPED CARDS */}
      {filteredCourses.length > 0 ? (
        viewMode === 'grouped' ? (
          <div className="space-y-6">
            {groupedCoursesByDepartment.map(({ dept, courses }) => {
              const isExpanded = expandedPositionIds.includes(dept.id);
              const deptTotalHours = courses.reduce((sum, c) => sum + (c.duration || 0), 0);

              return (
                <div
                  key={dept.id}
                  className="bg-white border-2 border-slate-200 hover:border-[#087F96]/40 rounded-3xl overflow-hidden shadow-sm transition-all space-y-0"
                >
                  {/* Position Accordion Card Header */}
                  <div
                    onClick={() => togglePositionExpand(dept.id)}
                    className="bg-gradient-to-r from-[#0B2A4A] via-[#052240] to-[#087F96] text-white p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:brightness-110 transition-all select-none border-b border-white/10"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0 text-sm">
                        🏬
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-black text-sm sm:text-base text-white truncate">{dept.name}</h3>
                          <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full font-mono shrink-0">
                            {courses.length} Eğitim
                          </span>
                          <span className="text-[10px] bg-white/20 text-cyan-200 font-bold px-2.5 py-0.5 rounded-full font-mono shrink-0 hidden sm:inline-block">
                            ⏱️ {deptTotalHours} Saat
                          </span>
                        </div>
                        <p className="text-xs text-gray-200 font-light truncate max-w-2xl">
                          {dept.careerGoal ? `🎯 Hedef: ${dept.careerGoal} • ` : ''}{dept.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0 ml-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPositionFilter(positionFilter === dept.id ? 'all' : dept.id);
                        }}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] rounded-xl transition-all border border-white/20 hidden md:inline-flex items-center space-x-1"
                        title="Sadece bu pozisyona ait eğitimleri süz"
                      >
                        <Filter className="w-3 h-3 text-amber-300" />
                        <span>{positionFilter === dept.id ? 'Süzmeyi Kaldır' : 'Pozisyonu Süz'}</span>
                      </button>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Position Course Table */}
                  {isExpanded && (
                    <div className="p-1 overflow-x-auto">
                      {renderCourseTable(courses, false)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          renderCourseTable(filteredCourses, true)
        )
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-4">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto" />
          <h3 className="text-lg font-bold text-[#0B2A4A]">Aranan Kriterlere Uygun Eğitim Bulunamadı</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Arama teriminizi, pozisyon filtresini veya eğitmen süzgecini değiştirmeyi deneyebilirsiniz.
          </p>
        </div>
      )}

      {/* STICKY BATCH ACTION BAR AT BOTTOM WITH DOCUMENT DOWNLOAD BUTTONS (PDF, EXCEL, WORD) */}
      {selectedCourseIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0B2A4A] text-white px-6 py-4 rounded-3xl shadow-2xl border-2 border-amber-400 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-6 max-w-5xl w-11/12 animate-in slide-in-from-bottom duration-200">
          
          {/* TOTAL HOURS & TOTAL BUDGET DISPLAY */}
          <div className="flex items-center space-x-4 shrink-0 cursor-pointer" onClick={() => setShowOnlySelected(prev => !prev)}>
            <span className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
              {selectedTotals.count}
            </span>
            <div className="space-y-0.5">
              <div className="text-xs font-black text-amber-300 flex items-center space-x-2">
                <span>{selectedTotals.count} Eğitim Seçildi</span>
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 px-2 py-0.2 rounded-md font-mono text-[10px] flex items-center space-x-1 font-black">
                  <Clock className="w-3 h-3 text-cyan-300" />
                  <span>TOPLAM: {selectedTotals.hours} SAAT</span>
                </span>
              </div>
              <div className="text-sm text-emerald-400 font-black font-mono flex items-center space-x-1">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>TOPLAM TUTAR: ₺{selectedTotals.budget.toLocaleString('tr-TR')} TL</span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS: EXPORT PDF, EXCEL, WORD & PURCHASE */}
          <div className="flex flex-wrap items-center gap-2 w-full justify-end text-xs font-bold">
            
            {/* EXPORT DOCUMENT BUTTONS */}
            <div className="flex items-center space-x-1 bg-white/10 p-1 rounded-xl border border-white/20">
              <button
                onClick={exportToPdf}
                className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-all flex items-center space-x-1"
                title="Seçilen Eğitimleri PDF Teklif Olarak İndir"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>

              <button
                onClick={exportToExcel}
                className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all flex items-center space-x-1"
                title="Seçilen Eğitimleri Türkçe Karakter Uyumlu Excel Listesi Olarak İndir"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Excel</span>
              </button>

              <button
                onClick={exportToWord}
                className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all flex items-center space-x-1"
                title="Seçilen Eğitimleri Word Dokümanı Olarak İndir"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Word</span>
              </button>
            </div>

            {/* SEÇİLENLERİ ŞİMDİ SATIN AL BUTTON */}
            <button
              onClick={() => {
                addSelectedToCart();
                setIsCartModalOpen(true);
              }}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl shadow-lg flex items-center space-x-1.5 scale-105 border border-amber-300"
            >
              <CreditCard className="w-4 h-4 text-slate-950" />
              <span>💳 Şimdi Satın Al (₺{selectedTotals.budget.toLocaleString('tr-TR')} TL)</span>
            </button>

            <button
              onClick={() => {
                setSelectedCourseIds([]);
                setShowOnlySelected(false);
              }}
              className="p-2 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded-xl transition-colors"
              title="Seçimi Temizle"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* INTERACTIVE SHOPPING CART DRAWER / MODAL WITH DOCUMENT EXPORT */}
      {isCartModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-200 flex flex-col max-h-[90vh]">
            
            {/* Cart Header */}
            <div className="bg-[#0B2A4A] text-white p-6 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-amber-400 text-slate-950 font-black">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">Eğitim Sepetiniz</h2>
                  <p className="text-xs text-gray-300">
                    Seçilen dersler, toplam eğitim saatleri ve ödeme özeti
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="p-6 overflow-y-auto space-y-3 flex-1 custom-scrollbar">
              {cartItemIds.length > 0 ? (
                cartItemIds.map((id) => {
                  const course = ALL_COURSES.find((c) => c.id === id);
                  if (!course) return null;
                  const priceInfo = calculateCoursePrice(course);
                  const certBadge = getCourseCertBadge(course, priceInfo.price);
                  const instructor = getInstructorForCourse(course.slug || course.id, course.category);

                  return (
                    <div
                      key={id}
                      className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between gap-4 hover:border-blue-300 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-black text-[#0B2A4A]">{course.title}</span>
                          <span className={`px-1.5 py-0.2 rounded text-[9px] border ${certBadge.badgeClass}`}>
                            {certBadge.shortLabel}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-[11px] text-gray-500 font-medium">
                          <span>🏬 {course.department}</span>
                          <span>👤 {instructor.name}</span>
                          <span className="font-bold text-[#087F96]">⏱️ {course.duration} Saat</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 shrink-0">
                        <div className="text-right">
                          <div className="font-black text-sm text-[#0B2A4A] font-mono">{priceInfo.formatted}</div>
                          <span className="text-[9px] text-gray-400 font-bold">KDV Dahil</span>
                        </div>

                        <button
                          onClick={() => setCartItemIds(prev => prev.filter(cId => cId !== id))}
                          className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
                          title="Sepetten Çıkar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 space-y-3">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto" />
                  <div className="text-sm font-bold text-gray-700">Sepetinizde henüz eğitim bulunmuyor</div>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">
                    Katalogdaki eğitimlerden seçerek veya "Sepete Ekle" butonuna basarak sepetinize ekleyebilirsiniz.
                  </p>
                </div>
              )}
            </div>

            {/* Cart Footer & Checkout Summary & Export Buttons */}
            {cartItemIds.length > 0 && (
              <div className="p-6 bg-blue-50/80 border-t border-gray-200 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold border-b border-gray-200/80 pb-3">
                  <span className="text-gray-600 flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-[#087F96]" />
                    <span>Toplam Müfredat Süresi:</span>
                  </span>
                  <span className="font-black text-[#0B2A4A] font-mono text-sm">{cartTotals.hours} Saat Eğitim</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  {/* EXPORT IN CART MODAL */}
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => exportToPdf()}
                      className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-[11px] flex items-center space-x-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                    <button
                      onClick={() => exportToExcel()}
                      className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-[11px] flex items-center space-x-1"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>Excel</span>
                    </button>
                    <button
                      onClick={() => exportToWord()}
                      className="px-2.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-[11px] flex items-center space-x-1"
                    >
                      <FileCode className="w-3.5 h-3.5" />
                      <span>Word</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="text-[10px] font-bold text-gray-500">Toplam Tutar:</div>
                      <div className="text-xl font-black text-[#0B2A4A] font-mono">
                        ₺{cartTotals.budget.toLocaleString('tr-TR')} TL
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsCartModalOpen(false);
                        triggerActionNotification(`💳 ₺${cartTotals.budget.toLocaleString('tr-TR')} TL tutarındaki ödemeniz başarıyla simüle edildi! Kurs kayıtlarınız profilinize tanımlandı.`);
                      }}
                      className="px-5 py-2.5 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-2xl shadow-xl transition-all flex items-center space-x-1.5 text-xs cursor-pointer border border-cyan-400"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-300" />
                      <span>💳 Satın Al</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <CourseDetailModal
        course={selectedCourseDetail}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

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
    <div className="min-h-screen bg-[#F4F7F9] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-gradient-to-r from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white p-8 sm:p-10 rounded-3xl border border-[#087F96]/30 shadow-xl text-center space-y-3">
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Perakende Kariyer Eğitim Kataloğu & Sertifikasyon
          </h1>

          <p className="text-gray-200 text-xs sm:text-sm max-w-3xl mx-auto font-light leading-relaxed">
            Eğitim Seviyeleri (Executive, Yönetici, Uzmanlık, Standart) Ücret sütunundan ayrılarak müstakil bir <strong>SEVİYE</strong> sütun butonuna dönüştürülmüştür.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-12 font-bold text-gray-500">Katalog Yükleniyor...</div>}>
          <EgitimlerCatalogContent />
        </Suspense>
      </div>
    </div>
  );
}
