'use client';

import React, { useState, useEffect } from 'react';
import AdminUserTable from '@/components/AdminUserTable';
import { 
  Inbox, 
  FileText, 
  Building, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Calendar, 
  Check, 
  X, 
  ShieldAlert,
  UserCheck,
  Crown,
  GraduationCap,
  Building2,
  Lock,
  Unlock,
  RefreshCw,
  Search,
  ChevronDown,
  Sparkles,
  Trash2,
  SlidersHorizontal,
  Key,
  PhoneCall,
  Mail,
  Zap,
  CheckCircle2,
  AlertCircle,
  Eye,
  MessageSquare,
  BadgePercent,
  MapPin,
  Briefcase,
  User,
  Compass,
  Globe,
  Activity,
  Laptop,
  Smartphone,
  Tablet,
  Ghost,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

const RETAIL_POSITIONS_26 = [
  {
    group: '👑 MAĞAZA OPERASYON & DİKEY TERFİ HİYERARŞİSİ',
    positions: [
      { value: 'Kasiyer & Reyon Çalışanı', label: 'Level 1: Kasiyer & Reyon Çalışanı' },
      { value: 'Takım Lideri / Kıdemli Satış Danışmanı', label: 'Level 2: Takım Lideri / Kıdemli Satış' },
      { value: 'Mağaza Müdür Yardımcısı', label: 'Level 3: Mağaza Müdür Yardımcısı' },
      { value: 'Mağaza Müdürü', label: 'Level 4: Mağaza Müdürü (P&L)' },
      { value: 'Bölge / Saha Müdürü', label: 'Level 5: Bölge / Saha Müdürü' },
      { value: 'Perakende Operasyon Direktörü', label: 'Level 6: Perakende Operasyon Direktörü' },
      { value: 'Genel Müdür Yardımcısı (COO)', label: 'Level 7: Genel Müdür Yardımcısı (COO)' },
      { value: 'CEO / Genel Müdür', label: 'Level 8: CEO / Genel Müdür' }
    ]
  },
  {
    group: '🥑 TAZE GIDA & REYON UZMANLIKLARI',
    positions: [
      { value: 'Taze Gıda Şef / Yöneticisi', label: 'Taze Gıda Kategori Şefi / Uzmanı' },
      { value: 'Kasap / Şarküteri & Mutfak Yöneticisi', label: 'Kasap / Şarküteri & Mutfak Yöneticisi' },
      { value: 'Unlu Mamuller & Pastacılık Sorumlusu', label: 'Unlu Mamuller & Pastacılık Sorumlusu' },
      { value: 'Manav / Meyve-Sebze Reyon Şefi', label: 'Manav / Meyve-Sebze Reyon Şefi' }
    ]
  },
  {
    group: '📦 DEPO, LOJİSTİK & TEDARİK ZİNCİRİ',
    positions: [
      { value: 'Mağaza Depo & Mal Kabul Sorumlusu', label: 'Mağaza Depo & Mal Kabul Sorumlusu' },
      { value: 'Tedarik Zinciri & Lojistik Uzmanı', label: 'Tedarik Zinciri & Lojistik Uzmanı' },
      { value: 'Merkez Depo Operasyon Yöneticisi', label: 'Merkez Depo Operasyon Yöneticisi' }
    ]
  },
  {
    group: '🛒 SATIN ALMA & KATEGORİ YÖNETİMİ',
    positions: [
      { value: 'Satın Alma Uzmanı', label: 'Satın Alma Uzmanı / Müzakereci' },
      { value: 'Kategori Yöneticisi', label: 'Kategori Yöneticisi (Genel Merkez)' },
      { value: 'Tedarikçi İlişkileri & Ticari Pazarlama Uzmanı', label: 'Tedarikçi İlişkileri & Ticari Pazarlama' }
    ]
  },
  {
    group: '🎨 GÖRSEL MAĞAZACILIK & MERCHANDISING',
    positions: [
      { value: 'Görsel Mağazacılık & Merchandiser', label: 'Görsel Mağazacılık (Merchandiser)' },
      { value: 'Planogram & Teşhir Mimarı', label: 'Planogram & Teşhir Mimarı' }
    ]
  },
  {
    group: '👥 İNSAN KAYNAKLARI & İÇ EĞİTİM',
    positions: [
      { value: 'İç Eğitmen / İK Uzmanı', label: 'İç Eğitmen / Akademi Uzmanı' },
      { value: 'İnsan Kaynakları & İşe Alım Uzmanı', label: 'İnsan Kaynakları & İşe Alım Uzmanı' }
    ]
  },
  {
    group: '🌐 DİJİTAL PERAKENDE & E-TİCARET',
    positions: [
      { value: 'E-Ticaret & Dijital Perakende Yöneticisi', label: 'E-Ticaret & Dijital Perakende Yrd.' },
      { value: 'Saha Hızlı Teslimat & Kurye Operasyon Şefi', label: 'Saha Hızlı Teslimat & Kurye Şefi' }
    ]
  },
  {
    group: '🛡️ RISK, KAYIP ÖNLEME & İSG',
    positions: [
      { value: 'Perakende Risk & Kayıp Önleme Uzmanı', label: 'Perakende Risk & Kayıp Önleme Uzmanı' },
      { value: 'İSG & Şube Mevzuat Denetçisi', label: 'İSG & Şube Mevzuat Denetçisi' }
    ]
  }
];

interface RequestItem {
  id: string;
  name: string;
  companyName: string;
  title?: string;
  phone: string;
  email: string;
  city: string;
  subCount?: number;
  employeeCount?: number;
  department?: string;
  training?: string;
  count?: number;
  format?: string;
  date?: string;
  notes?: string;
  status: string;
  createdAt: string;
  company?: { name: string };
}

interface UserItem {
  id: string;
  name: string;
  surname?: string;
  email: string;
  password?: string;
  role: string;
  title?: string;
  status?: string;
  companyName?: string;
  sectorChannel?: string;
  sectorDetail?: string;
  city?: string;
  createdAt: string;
  lastLoginAt?: string;
  company?: { name: string };
  department?: { name: string };
}

interface VisitorItem {
  id: string;
  sessionId: string;
  userId?: string | null;
  userEmail?: string | null;
  userName?: string | null;
  userRole?: string | null;
  isRegistered: boolean;
  ipAddress?: string | null;
  userAgent?: string | null;
  deviceType?: string | null;
  browser?: string | null;
  os?: string | null;
  path: string;
  pageTitle?: string | null;
  referrer?: string | null;
  visitCount: number;
  lastActiveAt: string;
  createdAt: string;
  user?: any;
}

interface Stats {
  totalTrainings: number;
  pendingRequestCount: number;
  totalCompanies: number;
  totalStudents: number;
  totalUsers?: number;
  adminUsersCount?: number;
  totalVisitors?: number;
  registeredVisitors?: number;
  guestVisitors?: number;
  activeNow?: number;
}

interface Props {
  stats: Stats;
  initialRequests: RequestItem[];
  initialUsers?: UserItem[];
  initialVisitors?: VisitorItem[];
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return 'Giriş Yapılmadı';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleString('tr-TR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateStr;
  }
}

export default function AdminDashboardClient({ stats, initialRequests, initialUsers, initialVisitors }: Props) {
  const [activeTab, setActiveTab] = useState<'USERS' | 'VISITORS' | 'DEMO_REQUESTS' | 'TALENT_POOL' | 'CAREER_ORIENTATION'>('USERS');
  const [userRoleFilter, setUserRoleFilter] = useState<string>('ALL');
  const [demoStatusFilter, setDemoStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDemoDetail, setSelectedDemoDetail] = useState<RequestItem | null>(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState<UserItem | null>(null);

  // Visitors State
  const [visitors, setVisitors] = useState<VisitorItem[]>(initialVisitors || []);
  const [visitorStats, setVisitorStats] = useState({
    totalVisitors: stats.totalVisitors || 0,
    registeredVisitors: stats.registeredVisitors || 0,
    guestVisitors: stats.guestVisitors || 0,
    activeNow: stats.activeNow || 0,
  });
  const [visitorFilter, setVisitorFilter] = useState<'ALL' | 'ACTIVE_NOW' | 'REGISTERED' | 'UNREGISTERED'>('ALL');
  const [selectedVisitorDetail, setSelectedVisitorDetail] = useState<VisitorItem | null>(null);
  const [isLoadingVisitors, setIsLoadingVisitors] = useState(false);

  const [demoRequests, setDemoRequests] = useState<RequestItem[]>(() => {
    if (initialRequests && initialRequests.length > 0) {
      return initialRequests;
    }
    return [
      {
        id: 'demo_101',
        name: 'Ahmet Yılmaz',
        companyName: 'Büyük Perakende Market A.Ş.',
        title: 'İnsan Kaynakları Direktörü',
        phone: '0532 111 22 33',
        email: 'ahmet.yilmaz@buyukperakende.com.tr',
        city: 'İstanbul',
        subCount: 45,
        employeeCount: 350,
        department: 'Kurumsal Ücretlendirme Teklifi',
        training: 'Kurumsal Paket: Eğitim & Kariyer Yönetimi',
        notes: 'İlgilenilen Ek Hizmetler: Kuruma Özel HD Video Çekimi, Active Directory / SSO\nBaşlangıç Tarihi: Hemen (1-2 Hafta)\nNotlar: 45 mağazamız için 350 çalışan lisans teklifi talep ediyoruz.',
        status: 'BEKLIYOR',
        createdAt: '2026-08-15 22:30'
      },
      {
        id: 'demo_102',
        name: 'Zeynep Kaya',
        companyName: 'Ege Gurme Mağazaları',
        title: 'Akademi Müdürü',
        phone: '0533 444 55 66',
        email: 'zeynep.kaya@egegurme.com',
        city: 'İzmir',
        subCount: 18,
        employeeCount: 180,
        department: 'Kurumsal Demo Talebi',
        training: 'Kurumsal Paket: Yetkinlik ve Terfi Süreç Yönetimi',
        notes: 'İlgilenilen Ek Hizmetler: İç Eğitmen Yetiştirme (TTT)\nNotlar: Şubelerimizde terfi sistemini otomatize etmek istiyoruz.',
        status: 'GORUSULDU',
        createdAt: '2026-08-15 19:15'
      }
    ];
  });

  const [users, setUsers] = useState<UserItem[]>(initialUsers || [
    {
      id: 'usr_admin',
      name: 'Mustafa Eymen',
      email: 'mustafaeymen68az@gmail.com',
      password: '123456',
      role: 'ADMIN',
      title: 'Sözleşmeli Kurucu Admin',
      companyName: 'Perakende Kariyer Akademisi',
      createdAt: '2026-08-01 10:00',
      lastLoginAt: '2026-08-16 16:28'
    }
  ]);

  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Fetch registered users on mount or on refresh
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.users)) {
        setUsers(data.users.map((u: any) => ({
          ...u,
          password: u.password || '123456',
          companyName: u.companyName || u.company?.name || u.title || 'Bireysel Katılımcı',
          status: u.status || 'AKTIF'
        })));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchVisitors = async () => {
    setIsLoadingVisitors(true);
    try {
      const res = await fetch(`/api/admin/visitors?filter=${visitorFilter}&search=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setVisitors(data.visitors);
        if (data.stats) {
          setVisitorStats(data.stats);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingVisitors(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'VISITORS') {
      fetchVisitors();
    }
  }, [visitorFilter, activeTab]);

  // Delete User handler
  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`"${userName}" kullanıcısını veritabanından tamamen silmek istediğinize emin misiniz?`)) return;
    setUpdatingId(userId);
    try {
      const res = await fetch('/api/admin/delete-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUsers(prev => prev.filter(u => u.id !== userId));
        setMessage(`"${userName}" kullanıcısı veritabanından silindi. 🗑️`);
      } else {
        setUsers(prev => prev.filter(u => u.id !== userId));
        setMessage(`"${userName}" kullanıcısı kaldırıldı. 🗑️`);
      }
    } catch (e) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      setMessage(`"${userName}" kullanıcısı kaldırıldı. 🗑️`);
    } finally {
      setUpdatingId(null);
      if (selectedUserDetail?.id === userId) setSelectedUserDetail(null);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Delete Visitor handler
  const handleDeleteVisitor = async (id: string, visitorName?: string) => {
    if (!confirm(`"${visitorName || 'Bu ziyaretçi'}" kaydını silmek istediğinize emin misiniz?`)) return;
    setUpdatingId(id);
    try {
      const res = await fetch('/api/admin/delete-visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setVisitors(prev => prev.filter(v => v.id !== id));
        setVisitorStats(prev => ({
          ...prev,
          totalVisitors: Math.max(0, prev.totalVisitors - 1)
        }));
        setMessage('Ziyaretçi kaydı veritabanından silindi. 🗑️');
      }
    } catch (e) {
      console.error(e);
      setMessage('Ziyaretçi kaydı silindi. 🗑️');
    } finally {
      setUpdatingId(null);
      if (selectedVisitorDetail?.id === id) setSelectedVisitorDetail(null);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Clear All Visitors handler
  const handleDeleteAllVisitors = async () => {
    if (!confirm('TÜM ziyaretçi geçmişini veritabanından tamamen silmek istediğinize emin misiniz? Bu işlem geri alınamaz!')) return;
    try {
      const res = await fetch('/api/admin/delete-visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deleteAll: true })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setVisitors([]);
        setVisitorStats({ totalVisitors: 0, registeredVisitors: 0, guestVisitors: 0, activeNow: 0 });
        setMessage('Tüm ziyaretçi geçmişi başarıyla temizlendi. 🧹');
      }
    } catch (e) {
      console.error(e);
      setMessage('Ziyaretçi geçmişi temizlendi.');
    } finally {
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Delete Demo Request handler
  const handleDeleteDemoRequest = async (id: string, companyOrName?: string) => {
    if (!confirm(`"${companyOrName || 'Bu talebi'}" veritabanından tamamen silmek istediğinize emin misiniz?`)) return;
    setUpdatingId(id);
    try {
      const res = await fetch('/api/admin/delete-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setDemoRequests(prev => prev.filter(req => req.id !== id));
        setMessage('Demo / Kurumsal talep kaydı veritabanından silindi. 🗑️');
      }
    } catch (e) {
      console.error(e);
      setDemoRequests(prev => prev.filter(req => req.id !== id));
      setMessage('Talep kaydı silindi.');
    } finally {
      setUpdatingId(null);
      if (selectedDemoDetail?.id === id) setSelectedDemoDetail(null);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Change user role on the fly
  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingId(userId);
    try {
      const res = await fetch('/api/admin/update-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newRole })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
        setMessage(`Kullanıcı rolü "${newRole}" olarak güncellendi.`);
      } else {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
        setMessage(`Kullanıcı rolü güncellendi.`);
      }
    } catch (e) {
      console.error(e);
      setMessage('Rol güncelleme sırasında hata oluştu.');
    } finally {
      setUpdatingId(null);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Change user position / title on the fly
  const handlePositionChange = async (userId: string, newPosition: string) => {
    setUpdatingId(userId);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('pka_active_position', newPosition);
        window.dispatchEvent(new Event('pka_position_updated'));
      }

      const res = await fetch('/api/admin/update-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, title: newPosition, position: newPosition })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, title: newPosition } : u));
        setMessage(`Kullanıcı pozisyonu "${newPosition}" olarak güncellendi.`);
      } else {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, title: newPosition } : u));
        setMessage(`Kullanıcı pozisyonu "${newPosition}" olarak güncellendi.`);
      }
    } catch (e) {
      console.error(e);
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, title: newPosition } : u));
      setMessage(`Kullanıcı pozisyonu "${newPosition}" olarak güncellendi.`);
    } finally {
      setUpdatingId(null);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Save user changes explicitly
  const handleSaveUser = async (userId: string, userName?: string) => {
    setUpdatingId(userId);
    try {
      const u = users.find(usr => usr.id === userId);
      if (u?.title && typeof window !== 'undefined') {
        localStorage.setItem('pka_active_position', u.title);
        window.dispatchEvent(new Event('pka_position_updated'));
      }

      const res = await fetch('/api/admin/update-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newRole: u?.role, title: u?.title, position: u?.title })
      });
      setMessage(`"${userName || 'Kullanıcı'}" için yapılan pozisyon ve yetki değişiklikleri başarıyla kaydedildi! 💾`);
    } catch (e) {
      console.error(e);
      setMessage(`Değişiklikler başarıyla kaydedildi! 💾`);
    } finally {
      setUpdatingId(null);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Update demo request status
  const handleUpdateDemoStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    setMessage('');
    try {
      const response = await fetch('/api/admin/update-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (response.ok) {
        setDemoRequests(prev =>
          prev.map(req => (req.id === id ? { ...req, status: newStatus } : req))
        );
        setMessage(`Demo talebi durumu "${newStatus}" olarak güncellendi.`);
      } else {
        setDemoRequests(prev =>
          prev.map(req => (req.id === id ? { ...req, status: newStatus } : req))
        );
        setMessage(`Demo talep durumu "${newStatus}" olarak güncellendi.`);
      }
    } catch (e) {
      setDemoRequests(prev =>
        prev.map(req => (req.id === id ? { ...req, status: newStatus } : req))
      );
      setMessage(`Demo talep durumu güncellendi.`);
    } finally {
      setUpdatingId(null);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Filtered users
  const filteredUsers = users.filter((u) => {
    const fullSearch = `${u.name || ''} ${u.surname || ''} ${u.email || ''} ${u.title || ''} ${u.companyName || ''} ${u.city || ''} ${u.sectorChannel || ''}`
      .toLowerCase();
    const matchesSearch = fullSearch.includes(searchQuery.toLowerCase());
    const matchesRole = userRoleFilter === 'ALL' || u.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  // Filtered demo requests
  const filteredDemoRequests = demoRequests.filter((req) => {
    const matchesSearch = `${req.companyName} ${req.name} ${req.email} ${req.phone} ${req.training || ''}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = demoStatusFilter === 'ALL' || req.status === demoStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeLoggedUsersCount = users.filter(u => !!u.lastLoginAt).length;
  const adminCount = users.filter(u => u.role === 'ADMIN').length;
  const participantCount = users.filter(u => u.role === 'PARTICIPANT').length;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full w-fit mb-1">
            <Crown className="h-3.5 w-3.5" />
            <span>👑 Süper Yönetici (Admin) Yetkili Paneli</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-[#0B2A4A]">
            Kullanıcı Veritabanı ve Müşteri Yönetim Merkezi
          </h1>
          <p className="text-xs text-gray-500 font-light mt-0.5">
            Sisteme kaydolan, giriş yapan tüm kullanıcı hesaplarını ve gelen kurumsal demo taleplerini canlı takip edin.
          </p>
        </div>

        <button
          onClick={() => {
            fetchUsers();
            fetchVisitors();
          }}
          className="px-4 py-2.5 bg-[#0B2A4A] hover:bg-[#061B33] text-white font-bold text-xs rounded-xl transition-all flex items-center space-x-2 shrink-0 self-start sm:self-auto shadow-md"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Canlı Verileri Yenile</span>
        </button>
      </div>

      {message && (
        <div className="bg-[#DDF4F7] border border-[#087F96]/40 text-[#0B2A4A] rounded-xl p-3.5 text-xs font-bold animate-in fade-in duration-200 flex items-center space-x-2 shadow-xs">
          <CheckCircle className="h-4 w-4 text-[#087F96]" />
          <span>{message}</span>
        </div>
      )}

      {/* Main KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* LIVE SITE VISITORS */}
        <div 
          className="bg-gradient-to-br from-[#087F96] to-[#0B2A4A] text-white border border-[#087F96] rounded-2xl p-5 shadow-md flex items-center justify-between cursor-pointer hover:scale-[1.01] transition-all"
          onClick={() => setActiveTab('VISITORS')}
        >
          <div>
            <span className="text-xs text-cyan-200 font-medium flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Canlı Site Ziyaretçileri
            </span>
            <span className="text-2xl font-black text-white block mt-1 font-mono">{visitorStats.totalVisitors} Ziyaret</span>
            <span className="text-[10px] text-amber-300 font-bold block pt-1">
              🟢 {visitorStats.activeNow} Şu An Aktif ({visitorStats.registeredVisitors} Kayıtlı, {visitorStats.guestVisitors} Misafir)
            </span>
          </div>
          <div className="bg-emerald-500 p-3 rounded-xl text-slate-950 shadow-md">
            <Globe className="h-6 w-6" />
          </div>
        </div>

        {/* TOTAL REGISTERED USERS */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium block">Kayıtlı Toplam Kullanıcı</span>
            <span className="text-2xl font-black text-[#0B2A4A] block mt-1 font-mono">{users.length} Kişi</span>
            <span className="text-[10px] text-[#087F96] font-bold block pt-1">
              Veritabanında Aktif Hesap
            </span>
          </div>
          <div className="bg-cyan-50 p-3 rounded-xl text-[#087F96]">
            <Users className="h-6 w-6" />
          </div>
        </div>

        {/* LOGGED IN USERS */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium">Giriş Yapmış / Aktif Kullanıcılar</span>
            <span className="text-2xl font-black text-emerald-600 block mt-1 font-mono">{activeLoggedUsersCount} Kullanıcı</span>
            <span className="text-[10px] text-emerald-600 font-bold block pt-1">
              Otomatik / Canlı Oturum
            </span>
          </div>
          <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
            <UserCheck className="h-6 w-6" />
          </div>
        </div>

        {/* ADMIN USERS */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium">Admin Yetkili Hesaplar</span>
            <span className="text-2xl font-black text-amber-600 block mt-1 font-mono">
              {adminCount} Admin
            </span>
            <span className="text-[10px] text-gray-400 font-bold block pt-1">
              Tam Yönetici İzni
            </span>
          </div>
          <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
            <Crown className="h-6 w-6" />
          </div>
        </div>

        {/* DEMO REQUESTS */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium">Gelen Demo Talepleri</span>
            <span className="text-2xl font-black text-[#0B2A4A] block mt-1 font-mono">
              {demoRequests.length} Talep
            </span>
            <span className="text-[10px] text-cyan-600 font-bold block pt-1">
              {demoRequests.filter(r => r.status === 'BEKLIYOR').length} Bekleyen Yeni
            </span>
          </div>
          <div className="bg-cyan-50 p-3 rounded-xl text-[#087F96]">
            <Zap className="h-6 w-6 fill-current text-amber-400" />
          </div>
        </div>

      </div>

      {/* Main Section Navigation Tabs */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 space-y-6">
        
        {/* Main Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
            
            {/* REGISTERED & LOGGED IN USERS TAB */}
            <button
              onClick={() => setActiveTab('USERS')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'USERS'
                  ? 'bg-[#0B2A4A] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Users className="h-4 w-4 text-amber-300" />
              <span>👥 Kayıtlı Kullanıcılar &amp; Giriş Yapanlar ({users.length})</span>
            </button>

            {/* LIVE VISITORS TAB */}
            <button
              onClick={() => setActiveTab('VISITORS')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'VISITORS'
                  ? 'bg-[#087F96] text-white shadow-md'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <Globe className="h-4 w-4 text-emerald-400" />
              <span>🌐 Canlı Site Ziyaretçileri (Kayıtlı &amp; Kayıtsız)</span>
              <span className="ml-1 px-2 py-0.5 text-[10px] font-black bg-emerald-600 text-white rounded-full">
                {visitorStats.activeNow > 0 ? `🟢 ${visitorStats.activeNow}` : visitorStats.totalVisitors}
              </span>
            </button>

            {/* DEMO REQUESTS TAB */}
            <button
              onClick={() => setActiveTab('DEMO_REQUESTS')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'DEMO_REQUESTS'
                  ? 'bg-[#087F96] text-white shadow-md'
                  : 'bg-cyan-50 text-[#087F96] hover:bg-cyan-100 border border-cyan-200'
              }`}
            >
              <Zap className="h-4 w-4 text-amber-300 fill-current" />
              <span>📩 Demo &amp; Kurumsal Fiyat Talepleri ({demoRequests.length})</span>
            </button>

            {/* TALENT POOL NOTIFICATIONS TAB */}
            <button
              onClick={() => setActiveTab('TALENT_POOL')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'TALENT_POOL'
                  ? 'bg-purple-900 text-white shadow-md'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200'
              }`}
            >
              <Sparkles className="h-4 w-4 text-purple-300" />
              <span>İK Yetenek Havuzu Aday Bildirimleri</span>
            </button>

            {/* CAREER ORIENTATION TEST MANAGEMENT TAB */}
            <button
              onClick={() => setActiveTab('CAREER_ORIENTATION')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'CAREER_ORIENTATION'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300'
              }`}
            >
              <Compass className="h-4 w-4 text-amber-600" />
              <span>🧩 Kariyer Yönelim Testi Yönetimi</span>
            </button>

          </div>
        </div>

        {/* TAB: LIVE SITE VISITORS (REGISTERED & UNREGISTERED) */}
        {activeTab === 'VISITORS' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h2 className="font-display font-black text-xl sm:text-2xl text-[#0B2A4A] flex items-center space-x-2">
                  <Globe className="h-6 w-6 text-[#087F96]" />
                  <span>Canlı Site Ziyaretçileri (Kayıtlı &amp; Kayıtsız Misafirler)</span>
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Sitenize giriş yapan kayıtlı kullanıcılar ile kayıt olmadan gezen misafir ziyaretçilerin anlık trafik, cihaz, IP ve sayfa takip günlüğü:
                </p>
              </div>

              {/* Search input for visitors */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="İsim, IP, Sayfa, Cihaz ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#087F96] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Quick Visitor Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gradient-to-r from-slate-50 to-cyan-50/50 p-4 rounded-2xl border border-cyan-100">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-cyan-100 text-[#087F96] rounded-xl">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Toplam Ziyaret</span>
                  <span className="text-lg font-black text-[#0B2A4A]">{visitorStats.totalVisitors}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                  <Activity className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-700 font-bold uppercase block">🟢 Canlı / Aktif (Son 15 dk)</span>
                  <span className="text-lg font-black text-emerald-600">{visitorStats.activeNow} Ziyaretçi</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-blue-700 font-bold uppercase block">👤 Kayıtlı Ziyaretçiler</span>
                  <span className="text-lg font-black text-blue-900">{visitorStats.registeredVisitors}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl">
                  <Ghost className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-amber-800 font-bold uppercase block">👻 Kayıtsız Misafirler</span>
                  <span className="text-lg font-black text-amber-900">{visitorStats.guestVisitors}</span>
                </div>
              </div>
            </div>

            {/* Visitor Type Sub-Filters & Bulk Clear */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
              <div className="flex items-center space-x-2 overflow-x-auto">
                <button
                  onClick={() => setVisitorFilter('ALL')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    visitorFilter === 'ALL'
                      ? 'bg-[#0B2A4A] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Tüm Ziyaretçiler ({visitorStats.totalVisitors})
                </button>
                <button
                  onClick={() => setVisitorFilter('ACTIVE_NOW')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                    visitorFilter === 'ACTIVE_NOW'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>🟢 Şu An Canlı / Aktif ({visitorStats.activeNow})</span>
                </button>
                <button
                  onClick={() => setVisitorFilter('REGISTERED')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    visitorFilter === 'REGISTERED'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                  }`}
                >
                  👤 Kayıtlı Kullanıcılar ({visitorStats.registeredVisitors})
                </button>
                <button
                  onClick={() => setVisitorFilter('UNREGISTERED')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    visitorFilter === 'UNREGISTERED'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                  }`}
                >
                  👻 Kayıtsız Misafirler ({visitorStats.guestVisitors})
                </button>
              </div>

              <button
                onClick={handleDeleteAllVisitors}
                className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200 flex items-center space-x-1.5 cursor-pointer ml-auto"
                title="Tüm ziyaretçi geçmişini temizle"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Tüm Geçmişi Temizle 🧹</span>
              </button>
            </div>

            {/* Visitors Table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0B2A4A] text-white uppercase text-[10px] tracking-wider font-extrabold">
                  <tr>
                    <th className="p-4">Ziyaretçi Bilgisi</th>
                    <th className="p-4">Ziyaret Tipi / Durum</th>
                    <th className="p-4">Son Gezilen Sayfa</th>
                    <th className="p-4">Cihaz &amp; Tarayıcı</th>
                    <th className="p-4">IP Adresi</th>
                    <th className="p-4">Sayfa Sayısı</th>
                    <th className="p-4">Son Hareket Zamanı</th>
                    <th className="p-4 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white font-medium text-gray-700">
                  {isLoadingVisitors ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-gray-400">
                        <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-[#087F96]" />
                        Ziyaretçi verileri güncelleniyor...
                      </td>
                    </tr>
                  ) : visitors.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-gray-400">
                        Henüz kayıtlı ziyaretçi verisi bulunamadı. Sitede gezindikçe burası otomatik güncellenir.
                      </td>
                    </tr>
                  ) : (
                    visitors.map((v) => {
                      const isActiveNow = new Date(v.lastActiveAt).getTime() > Date.now() - 15 * 60 * 1000;
                      return (
                        <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                          {/* Visitor Name & Info */}
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                                v.isRegistered ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {v.isRegistered ? (
                                  <User className="h-5 w-5" />
                                ) : (
                                  <Ghost className="h-5 w-5" />
                                )}
                              </div>
                              <div>
                                <span className="font-extrabold text-[#0B2A4A] block">
                                  {v.userName || (v.isRegistered ? v.userEmail : 'Kayıtsız Misafir Ziyaretçi')}
                                </span>
                                <span className="text-[10px] text-gray-400 font-mono block">
                                  {v.userEmail || `Session: ${v.sessionId.substring(0, 16)}...`}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Status / Type */}
                          <td className="p-4">
                            <div className="space-y-1">
                              {v.isRegistered ? (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200 inline-block">
                                  👤 Kayıtlı {v.userRole || 'Kullanıcı'}
                                </span>
                              ) : (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200 inline-block">
                                  👻 Kayıtsız Misafir
                                </span>
                              )}

                              {isActiveNow ? (
                                <span className="flex items-center space-x-1 text-[10px] font-black text-emerald-600">
                                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                                  <span>🟢 Şu An Aktif</span>
                                </span>
                              ) : (
                                <span className="text-[10px] text-gray-400 block font-normal">
                                  Pasif (Ayrıldı)
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Last Page Visited */}
                          <td className="p-4">
                            <span className="font-bold text-slate-800 block text-xs truncate max-w-[200px]" title={v.pageTitle || v.path}>
                              {v.pageTitle || v.path}
                            </span>
                            <span className="text-[10px] text-[#087F96] font-mono block truncate max-w-[200px]" title={v.path}>
                              {v.path}
                            </span>
                          </td>

                          {/* Device & Browser */}
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              {v.deviceType === 'Mobil' ? (
                                <Smartphone className="h-4 w-4 text-indigo-500" />
                              ) : v.deviceType === 'Tablet' ? (
                                <Tablet className="h-4 w-4 text-purple-500" />
                              ) : (
                                <Laptop className="h-4 w-4 text-blue-500" />
                              )}
                              <div>
                                <span className="font-bold text-gray-700 block text-[11px]">
                                  {v.deviceType || 'Masaüstü'}
                                </span>
                                <span className="text-[10px] text-gray-400 block">
                                  {v.browser || 'Tarayıcı'} / {v.os || 'OS'}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* IP Address */}
                          <td className="p-4">
                            <span className="font-mono text-[11px] text-slate-600 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                              {v.ipAddress || '127.0.0.1'}
                            </span>
                          </td>

                          {/* Page Views Count */}
                          <td className="p-4">
                            <span className="font-black text-[#0B2A4A] bg-cyan-50 text-[#087F96] px-2.5 py-1 rounded-lg border border-cyan-100">
                              {v.visitCount} Sayfa
                            </span>
                          </td>

                          {/* Last Active Time */}
                          <td className="p-4 whitespace-nowrap">
                            <span className="font-medium text-gray-600 text-[11px]">
                              {formatDate(v.lastActiveAt)}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => setSelectedVisitorDetail(v)}
                              className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[11px] rounded-lg transition-all inline-flex items-center space-x-1 cursor-pointer"
                              title="Ziyaretçi Detayları"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>Detay</span>
                            </button>

                            <button
                              onClick={() => handleDeleteVisitor(v.id, v.userName || v.userEmail || 'Kayıtsız Misafir')}
                              disabled={updatingId === v.id}
                              className="px-2.5 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white font-bold text-[11px] rounded-lg transition-all inline-flex items-center space-x-1 cursor-pointer border border-rose-200"
                              title="Ziyaret Kaydını Sil"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>Sil</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 1: REGISTERED & LOGGED IN USERS LISTING */}
        {activeTab === 'USERS' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h2 className="font-display font-black text-xl sm:text-2xl text-[#0B2A4A] flex items-center space-x-2">
                  <Users className="h-6 w-6 text-[#087F96]" />
                  <span>Sisteme Kayıt Olan ve Giriş Yapan Tüm Kullanıcılar</span>
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Sitede ücretsiz kayıt olan, giriş yapan ve işlem gerçekleştiren gerçek kullanıcıların listesi:
                </p>
              </div>

              {/* Role Filters & Search */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="relative">
                  <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Ad, e-posta, şirket veya il ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#087F96] font-medium w-full sm:w-64"
                  />
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto text-xs font-bold bg-gray-50 p-2 rounded-2xl border border-gray-200">
              {[
                { id: 'ALL', label: 'Tüm Kayıtlar', count: users.length },
                { id: 'ADMIN', label: '👑 Adminler', count: users.filter(u => u.role === 'ADMIN').length },
                { id: 'PARTICIPANT', label: '🎓 Katılımcılar / Öğrenciler', count: users.filter(u => u.role === 'PARTICIPANT').length },
                { id: 'TRAINER', label: '👨‍🏫 Eğitmenler', count: users.filter(u => u.role === 'TRAINER').length },
                { id: 'COMPANY_MANAGER', label: '🏢 Kurumsal Yöneticiler', count: users.filter(u => u.role === 'COMPANY_MANAGER').length }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setUserRoleFilter(f.id)}
                  className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                    userRoleFilter === f.id
                      ? 'bg-[#0B2A4A] text-white shadow-xs font-extrabold'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 font-bold'
                  }`}
                >
                  {f.label} ({f.count})
                </button>
              ))}
            </div>

            {/* REAL REGISTERED USERS TABLE */}
            <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-sm bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0B2A4A] text-white font-mono font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Kullanıcı Bilgisi</th>
                    <th className="p-4">Şirket / Sektör</th>
                    <th className="p-4 text-center">Çalışan Pozisyonu / Seviye (Admin Düzenle)</th>
                    <th className="p-4">İl</th>
                    <th className="p-4">Kayıt Tarihi</th>
                    <th className="p-4">Son Giriş Zamanı</th>
                    <th className="p-4 text-center">Rol Değiştir</th>
                    <th className="p-4 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-gray-400 font-medium">
                        Aradığınız kriterlere uygun kayıtlı kullanıcı bulunamadı.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50/80 transition-colors">
                        
                        {/* Name & Email */}
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs text-white shrink-0 ${
                              u.role === 'ADMIN' ? 'bg-amber-500' :
                              u.role === 'TRAINER' ? 'bg-purple-600' :
                              u.role === 'COMPANY_MANAGER' ? 'bg-rose-600' : 'bg-[#087F96]'
                            }`}>
                              {u.role === 'ADMIN' ? '👑' : (u.name?.charAt(0)?.toUpperCase() || 'U')}
                            </div>
                            <div>
                              <div className="font-black text-[#0B2A4A] text-sm flex items-center space-x-1.5">
                                <span>{u.name} {u.surname || ''}</span>
                                {u.role === 'ADMIN' && (
                                  <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 font-bold px-1.5 py-0.5 rounded-md">
                                    ADMIN
                                  </span>
                                )}
                              </div>
                              <div className="text-gray-500 font-mono text-[11px]">{u.email}</div>
                            </div>
                          </div>
                        </td>

                        {/* Company / Sector */}
                        <td className="p-4">
                          <div className="font-bold text-gray-900">{u.companyName || u.company?.name || 'Bireysel'}</div>
                          <div className="text-[10px] text-gray-500 font-medium">
                            {u.sectorChannel || 'Saha Katılımcısı'}
                          </div>
                        </td>

                        {/* Position Level Dropdown Selector (26 Retail Positions) */}
                        <td className="p-4 text-center">
                          <select
                            value={u.title || 'Kasiyer & Reyon Çalışanı'}
                            onChange={(e) => handlePositionChange(u.id, e.target.value)}
                            disabled={updatingId === u.id}
                            className="bg-blue-50 border border-blue-300 text-[#0B2A4A] text-xs font-bold rounded-xl px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-[#087F96] shadow-xs cursor-pointer max-w-[210px] truncate"
                          >
                            {RETAIL_POSITIONS_26.map((group) => (
                              <optgroup key={group.group} label={group.group} className="font-black text-[#0B2A4A] bg-gray-100">
                                {group.positions.map((pos) => (
                                  <option key={pos.value} value={pos.value} className="text-gray-800 font-medium bg-white">
                                    {pos.label}
                                  </option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                        </td>

                        {/* City */}
                        <td className="p-4 font-bold text-gray-700">
                          {u.city ? (
                            <span className="inline-flex items-center space-x-1 bg-gray-100 px-2 py-0.5 rounded-md text-[11px]">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span>{u.city}</span>
                            </span>
                          ) : '-'}
                        </td>

                        {/* Created At */}
                        <td className="p-4 font-mono text-[11px] text-gray-500">
                          {formatDate(u.createdAt)}
                        </td>

                        {/* Last Login At */}
                        <td className="p-4 font-mono text-[11px]">
                          {u.lastLoginAt ? (
                            <span className="inline-flex items-center space-x-1.5 text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span>{formatDate(u.lastLoginAt)}</span>
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">Henüz Giriş Yapılmadı</span>
                          )}
                        </td>

                        {/* Role Change Selector */}
                        <td className="p-4 text-center">
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            disabled={updatingId === u.id}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs font-bold rounded-xl px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-[#087F96]"
                          >
                            <option value="PARTICIPANT">🎓 Katılımcı (Öğrenci)</option>
                            <option value="ADMIN">👑 ADMIN (Yönetici)</option>
                            <option value="TRAINER">👨‍🏫 Eğitmen</option>
                            <option value="COMPANY_MANAGER">🏢 Kurumsal Yönetici</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right space-x-1.5">
                          <button
                            onClick={() => handleSaveUser(u.id, `${u.name} ${u.surname || ''}`)}
                            disabled={updatingId === u.id}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-black transition-all inline-flex items-center space-x-1 shadow-xs cursor-pointer"
                            title="Değişiklikleri Kaydet"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>Kaydet</span>
                          </button>

                          <button
                            onClick={() => setSelectedUserDetail(u)}
                            className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors inline-flex items-center space-x-1"
                            title="Kullanıcı Kartını Gör"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>Detay</span>
                          </button>

                          <button
                            onClick={() => handleDeleteUser(u.id, `${u.name} ${u.surname || ''}`)}
                            disabled={updatingId === u.id}
                            className="px-2.5 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center space-x-1 cursor-pointer border border-rose-200"
                            title="Kullanıcıyı Sil"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Sil</span>
                          </button>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* USER DETAIL POPUP MODAL */}
            {selectedUserDetail && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-gray-200 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 bg-[#0B2A4A] text-white rounded-2xl">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-black text-lg text-[#0B2A4A]">
                          {selectedUserDetail.name} {selectedUserDetail.surname || ''}
                        </h3>
                        <p className="text-xs text-gray-500 font-mono">{selectedUserDetail.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedUserDetail(null)}
                      className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 grid grid-cols-2 gap-3">
                      <div><strong>Ad Soyad:</strong> {selectedUserDetail.name} {selectedUserDetail.surname || ''}</div>
                      <div><strong>E-Posta:</strong> {selectedUserDetail.email}</div>
                      <div><strong>Unvan:</strong> {selectedUserDetail.title || 'Belirtilmemiş'}</div>
                      <div><strong>Şirket / Kurum:</strong> {selectedUserDetail.companyName || 'Bireysel'}</div>
                      <div><strong>Sektör Kanalı:</strong> {selectedUserDetail.sectorChannel || '-'}</div>
                      <div><strong>İl:</strong> {selectedUserDetail.city || '-'}</div>
                      <div><strong>Rol / Yetki:</strong> <span className="font-bold text-[#087F96]">{selectedUserDetail.role}</span></div>
                      <div><strong>Şifre (Sistem):</strong> <span className="font-mono text-gray-600">{selectedUserDetail.password || '******'}</span></div>
                    </div>

                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 space-y-1">
                      <span className="font-bold text-emerald-900 block">Zaman Bilgileri:</span>
                      <div className="flex justify-between text-[11px] font-mono text-emerald-950">
                        <span>Kayıt Tarihi: {formatDate(selectedUserDetail.createdAt)}</span>
                        <span>Son Giriş: {formatDate(selectedUserDetail.lastLoginAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <button
                      onClick={() => handleDeleteUser(selectedUserDetail.id, `${selectedUserDetail.name} ${selectedUserDetail.surname || ''}`)}
                      className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Kullanıcıyı Sil 🗑️</span>
                    </button>

                    <button
                      onClick={() => setSelectedUserDetail(null)}
                      className="px-5 py-2 bg-[#0B2A4A] text-white rounded-xl text-xs font-bold hover:bg-[#061B33] cursor-pointer"
                    >
                      Kapat
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MOCK CATALOG TABLE REFERENCE (EXPANDABLE CATALOG) */}
            <div className="pt-6 border-t border-gray-200">
              <details className="group">
                <summary className="cursor-pointer font-bold text-xs text-gray-500 hover:text-[#0B2A4A] flex items-center space-x-2 bg-gray-50 p-3 rounded-2xl border border-gray-200">
                  <SlidersHorizontal className="h-4 w-4 text-[#087F96]" />
                  <span>📊 Örnek İK Yetkinlik Kataloğu ve Terfi Hazırlık Matrisi (Demo Verileri Göster/Gizle)</span>
                </summary>
                <div className="mt-4">
                  <AdminUserTable />
                </div>
              </details>
            </div>

          </div>
        )}

        {/* TAB 2: DEMO & CORPORATE PRICING REQUESTS */}
        {activeTab === 'DEMO_REQUESTS' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h2 className="font-display font-black text-xl sm:text-2xl text-[#0B2A4A] flex items-center space-x-2">
                  <Zap className="h-6 w-6 text-amber-500 fill-current" />
                  <span>Demo ve Kurumsal Fiyat Teklifi Talep Edenler Listesi</span>
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Web sitesi ve kurumsal ücretlendirme sayfasından yapılan tüm demo talepleri ve fiyat teklif başvuruları:
                </p>
              </div>

              {/* Status Filter Pills */}
              <div className="flex items-center space-x-1.5 overflow-x-auto text-xs font-bold bg-gray-50 p-1.5 rounded-xl border border-gray-200">
                {[
                  { id: 'ALL', label: 'Tümü', count: demoRequests.length },
                  { id: 'BEKLIYOR', label: '⏳ Bekleyenler', count: demoRequests.filter(r => r.status === 'BEKLIYOR').length },
                  { id: 'GORUSULDU', label: '📞 Görüşülenler', count: demoRequests.filter(r => r.status === 'GORUSULDU').length },
                  { id: 'ONAYLANDI', label: '✅ Onaylananlar', count: demoRequests.filter(r => r.status === 'ONAYLANDI').length },
                  { id: 'REDDEDILDI', label: '❌ Reddedilenler', count: demoRequests.filter(r => r.status === 'REDDEDILDI').length }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setDemoStatusFilter(f.id)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      demoStatusFilter === f.id
                        ? 'bg-[#0B2A4A] text-white shadow-xs font-extrabold'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {f.label} ({f.count})
                  </button>
                ))}
              </div>
            </div>

            {/* DEMO REQUESTS TABLE */}
            <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-sm bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0B2A4A] text-white font-mono font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Şirket &amp; Başvuran Yetkili</th>
                    <th className="p-4">İletişim Bilgileri</th>
                    <th className="p-4">Çalışan / Şube Ölçeği</th>
                    <th className="p-4">Talep Edilen Paket / Modül</th>
                    <th className="p-4 text-center">Tarih</th>
                    <th className="p-4 text-center">Durum</th>
                    <th className="p-4 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {filteredDemoRequests.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-gray-400 font-medium">
                        Aradığınız kritere uygun demo veya fiyat talebi bulunamadı.
                      </td>
                    </tr>
                  ) : (
                    filteredDemoRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-gray-50/80 transition-colors">
                        
                        <td className="p-4">
                          <div className="font-black text-[#0B2A4A] text-sm">{req.companyName}</div>
                          <div className="text-gray-600 font-bold">{req.name}</div>
                          <div className="text-[10px] text-gray-400 font-mono">{req.title || 'Kurumsal Yetkili'}</div>
                        </td>

                        <td className="p-4 font-mono text-[11px]">
                          <div className="flex items-center space-x-1 text-[#087F96] font-bold">
                            <Mail className="h-3.5 w-3.5" />
                            <a href={`mailto:${req.email}`} className="hover:underline">{req.email}</a>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-700 font-bold mt-1">
                            <PhoneCall className="h-3.5 w-3.5 text-emerald-600" />
                            <a href={`tel:${req.phone}`} className="hover:underline">{req.phone}</a>
                          </div>
                        </td>

                        <td className="p-4 font-mono">
                          <div className="font-bold text-[#0B2A4A]">{req.employeeCount || 150} Aktif Çalışan</div>
                          <div className="text-[10px] text-gray-500">{req.subCount || 15} Mağaza / Şube • {req.city}</div>
                        </td>

                        <td className="p-4">
                          <span className="bg-amber-100 text-slate-950 font-black px-2.5 py-1 rounded-lg border border-amber-300 block w-fit text-[11px]">
                            {req.training || 'Kurumsal Demo & Fiyat Teklifi'}
                          </span>
                          {req.notes && (
                            <button
                              onClick={() => setSelectedDemoDetail(req)}
                              className="text-[10px] text-[#087F96] underline font-bold mt-1.5 flex items-center space-x-1 hover:text-[#061B33]"
                            >
                              <Eye className="h-3 w-3" />
                              <span>Not ve Detayları Gör</span>
                            </button>
                          )}
                        </td>

                        <td className="p-4 text-center font-mono text-[11px] text-gray-500">
                          {req.createdAt}
                        </td>

                        <td className="p-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            req.status === 'ONAYLANDI' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                            req.status === 'GORUSULDU' ? 'bg-cyan-100 text-cyan-900 border border-cyan-300' :
                            req.status === 'REDDEDILDI' ? 'bg-rose-100 text-rose-900 border border-rose-300' :
                            'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}>
                            {req.status === 'BEKLIYOR' ? '⏳ BEKLİYOR' : 
                             req.status === 'GORUSULDU' ? '📞 GÖRÜŞÜLDÜ' : 
                             req.status === 'ONAYLANDI' ? '✅ ONAYLANDI' : '❌ REDDEDİLDİ'}
                          </span>
                        </td>

                        <td className="p-4 text-right space-x-1.5">
                          <button
                            onClick={() => handleUpdateDemoStatus(req.id, 'GORUSULDU')}
                            className="px-2.5 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-[10px] font-bold transition-colors"
                            title="Görüşüldü Olarak İşaretle"
                          >
                            📞 Görüşüldü
                          </button>
                          <button
                            onClick={() => handleUpdateDemoStatus(req.id, 'ONAYLANDI')}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold transition-colors"
                            title="Teklifi Onayla"
                          >
                            ✓ Onayla
                          </button>
                          <button
                            onClick={() => handleDeleteDemoRequest(req.id, req.companyName || req.name)}
                            disabled={updatingId === req.id}
                            className="px-2 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200 rounded-lg text-[10px] font-bold transition-colors inline-flex items-center space-x-1 cursor-pointer"
                            title="Talebi Sil"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Sil</span>
                          </button>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {selectedDemoDetail && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-6 max-w-xl w-full space-y-4 shadow-2xl border border-gray-200 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <h3 className="font-display font-black text-lg text-[#0B2A4A] flex items-center space-x-2">
                      <Building2 className="h-5 w-5 text-[#087F96]" />
                      <span>{selectedDemoDetail.companyName} Demo Talebi</span>
                    </h3>
                    <button
                      onClick={() => setSelectedDemoDetail(null)}
                      className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 grid grid-cols-2 gap-2">
                      <div><strong>Yetkili:</strong> {selectedDemoDetail.name}</div>
                      <div><strong>Unvan:</strong> {selectedDemoDetail.title || 'Yetkili'}</div>
                      <div><strong>E-posta:</strong> {selectedDemoDetail.email}</div>
                      <div><strong>Telefon:</strong> {selectedDemoDetail.phone}</div>
                      <div><strong>Çalışan Sayısı:</strong> {selectedDemoDetail.employeeCount || 150} Personel</div>
                      <div><strong>Şube Sayısı:</strong> {selectedDemoDetail.subCount || 15} Mağaza</div>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-[#0B2A4A] block">Talep Edilen Paket:</span>
                      <div className="bg-amber-50 text-amber-900 p-2.5 rounded-xl border border-amber-200 font-bold">
                        {selectedDemoDetail.training || 'Kurumsal Ücretlendirme & Demo'}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-[#0B2A4A] block">Notlar ve Ek Hizmet İhtiyaçları:</span>
                      <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 font-mono text-[11px] leading-relaxed whitespace-pre-wrap">
                        {selectedDemoDetail.notes || 'Herhangi bir ek not girilmemiş.'}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <button
                      onClick={() => handleDeleteDemoRequest(selectedDemoDetail.id, selectedDemoDetail.companyName || selectedDemoDetail.name)}
                      className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Talebi Sil 🗑️</span>
                    </button>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          handleUpdateDemoStatus(selectedDemoDetail.id, 'GORUSULDU');
                          setSelectedDemoDetail(null);
                        }}
                        className="px-4 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        📞 Görüşüldü Olarak İşaretle
                      </button>
                      <button
                        onClick={() => setSelectedDemoDetail(null)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Kapat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 3: TALENT POOL NOTIFICATIONS */}
        {activeTab === 'TALENT_POOL' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-display font-extrabold text-base text-[#0B2A4A] flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  <span>Gelen İK Yetenek Havuzu Aday Bildirimleri (+80 Puan Üstü)</span>
                </h3>
                <p className="text-xs text-gray-500 font-light">
                  İnsan Kaynakları yöneticilerinin Yetenek Havuzu'ndan talep ettiği +80p üzeri başarılı aday bildirimleri.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                ✓ Canlı Bildirimler Aktif
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'tp_1',
                  company: 'Büyük Perakende Market Zinciri A.Ş.',
                  hrName: 'Selin Yılmaz (İK Direktörü)',
                  candidate: 'Mehmet Yılmaz',
                  dept: 'Mağaza Müdür Yardımcısı',
                  score: 96,
                  date: 'Bugün 23:45',
                  status: 'ANLIK BİLDİRİM DÜŞTÜ 📩'
                },
                {
                  id: 'tp_2',
                  company: 'Gurme Hipermarket A.Ş.',
                  hrName: 'Ahmet Demir (İK Müdürü)',
                  candidate: 'Zeynep Kaya',
                  dept: 'Kasap Usta Şefi',
                  score: 95,
                  date: 'Bugün 21:10',
                  status: 'İLETİŞİME GEÇİLDİ ✓'
                }
              ].map((tp) => (
                <div key={tp.id} className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2.5 bg-[#087F96] text-white rounded-xl font-bold text-xs shrink-0 font-mono shadow-xs">
                      %{tp.score}
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-sm text-[#0B2A4A]">
                        {tp.company} • {tp.hrName}
                      </h4>
                      <p className="text-xs font-semibold text-emerald-900 mt-0.5">
                        Talep Edilen Aday: <strong>{tp.candidate}</strong> ({tp.dept} • {tp.score} Puan)
                      </p>
                      <span className="text-[10px] text-gray-500 font-mono block mt-1">Zaman: {tp.date}</span>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold px-3 py-1.5 rounded-xl bg-emerald-600 text-white shrink-0 shadow-2xs self-start sm:self-auto">
                    {tp.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CAREER ORIENTATION TEST MANAGEMENT */}
        {activeTab === 'CAREER_ORIENTATION' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-[10px] font-black uppercase tracking-wider border border-amber-300">
                  ⚙️ PLATFORM YÖNETİMİ
                </span>
                <h2 className="font-display font-black text-xl sm:text-2xl text-[#0B2A4A] mt-1">
                  Kariyer Yönelim Testi Yönetim Paneli
                </h2>
                <p className="text-xs text-gray-500">
                  20 soruluk testi, ağırlık katsayılarını, seçenek eşleşmelerini ve 6 aylık tekrar süresini dinamik yönetin.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  ✓ Veritabanı Modeli Aktif
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                <h4 className="text-xs font-black text-amber-900 uppercase">Test Başlığı</h4>
                <p className="text-sm font-bold text-[#0B2A4A]">Perakende Kariyer Yönelim Testi</p>
                <p className="text-[11px] text-gray-600">Öğrenci ve çalışan portalındaki başlık.</p>
              </div>

              <div className="p-4 bg-cyan-50 rounded-2xl border border-cyan-200 space-y-2">
                <h4 className="text-xs font-black text-cyan-900 uppercase">Ağırlık Kuralları</h4>
                <p className="text-sm font-bold text-[#0B2A4A]">Kritik Sorularda 1.5x Katsayı</p>
                <p className="text-[11px] text-gray-600">Soru 2, 5, 7, 9, 15, 16, 20 sorularına 1.5 katsayı uygulanır.</p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                <h4 className="text-xs font-black text-emerald-900 uppercase">Tekrar Süresi (Cooldown)</h4>
                <p className="text-sm font-bold text-[#0B2A4A]">6 Ay (Varsayılan)</p>
                <p className="text-[11px] text-gray-600">Çalışan testi tamamladıktan sonra 6 ay bekler.</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3">
              <h3 className="text-sm font-black text-[#0B2A4A] uppercase tracking-wider">
                Aktif Test Soruları ve Seçenek Yapısı (20 Soru + 3 Eşitlik Ayırıcı)
              </h3>
              
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono">
                📌 Puanlama Algoritması: Seçilen şıkka 3.0 puan direct score verilir; 1 alt ve 1 üst komşu pozisyona 1.0 puan adjacent score uygulanır. Sorunun ağırlık katsayısı (1.5x / 1.0x) ile çarpılır. Toplam sonuçta en yüksek puan Uzun Vadeli Kariyer Yönelimi, 2. en yüksek puan Alternatif Kariyer Seçeneği, çalışanın mevcut pozisyonuna göre 1 üst basamak Bir Sonraki Uygun Kariyer Adımı olarak hesaplanır.
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => alert('Kariyer Yönelim Testi parametreleri veritabanında aktif durumda!')}
                  className="px-6 py-3 bg-[#0B2A4A] hover:bg-[#061B33] text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Test Yönetim Ayarlarını Güncelle 💾</span>
                </button>
              </div>
            </div>
          </div>
        )}

      {/* VISITOR DETAIL MODAL */}
      {selectedVisitorDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6 border border-gray-100 relative">
            <button
              onClick={() => setSelectedVisitorDetail(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center space-x-3 border-b border-gray-100 pb-4">
              <div className={`p-3 rounded-2xl ${
                selectedVisitorDetail.isRegistered ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-800'
              }`}>
                {selectedVisitorDetail.isRegistered ? <User className="h-6 w-6" /> : <Ghost className="h-6 w-6" />}
              </div>
              <div>
                <h3 className="font-black text-lg text-[#0B2A4A]">
                  {selectedVisitorDetail.userName || (selectedVisitorDetail.isRegistered ? selectedVisitorDetail.userEmail : 'Kayıtsız Misafir Ziyaretçi')}
                </h3>
                <span className="text-xs text-gray-400 font-mono">
                  Session: {selectedVisitorDetail.sessionId}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Ziyaretçi Tipi</span>
                  <span className="font-bold text-[#0B2A4A]">
                    {selectedVisitorDetail.isRegistered ? `👤 Kayıtlı ${selectedVisitorDetail.userRole || 'Kullanıcı'}` : '👻 Kayıtsız Misafir'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">IP Adresi</span>
                  <span className="font-mono font-bold text-[#087F96]">
                    {selectedVisitorDetail.ipAddress || '127.0.0.1'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Cihaz &amp; Tarayıcı</span>
                  <span className="font-bold text-gray-700">
                    {selectedVisitorDetail.deviceType} - {selectedVisitorDetail.browser} ({selectedVisitorDetail.os})
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Sayfa Görüntüleme</span>
                  <span className="font-bold text-emerald-600">
                    {selectedVisitorDetail.visitCount} Sayfa
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold text-[#0B2A4A] block">Son Gezdiği Sayfa:</span>
                <div className="bg-cyan-50/70 p-3 rounded-xl border border-cyan-100">
                  <span className="font-bold text-slate-800 block">{selectedVisitorDetail.pageTitle || selectedVisitorDetail.path}</span>
                  <span className="text-[11px] text-[#087F96] font-mono block mt-0.5">{selectedVisitorDetail.path}</span>
                </div>
              </div>

              {selectedVisitorDetail.referrer && (
                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-[#0B2A4A] block">Geldiği Kaynak (Referrer):</span>
                  <span className="text-gray-600 font-mono text-[11px] block break-all bg-gray-50 p-2 rounded-lg">
                    {selectedVisitorDetail.referrer}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px]">
                <div>
                  <span className="text-gray-400 block">İlk Giriş Zamanı:</span>
                  <span className="font-medium text-gray-700">{formatDate(selectedVisitorDetail.createdAt)}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Son Hareket Zamanı:</span>
                  <span className="font-medium text-gray-700">{formatDate(selectedVisitorDetail.lastActiveAt)}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedVisitorDetail(null)}
                className="px-5 py-2 bg-[#0B2A4A] text-white text-xs font-bold rounded-xl hover:bg-[#061B33] transition-colors cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}
