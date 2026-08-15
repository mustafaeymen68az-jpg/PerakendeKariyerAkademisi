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
  BadgePercent
} from 'lucide-react';

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
  createdAt: string;
  lastLoginAt?: string;
  companyName?: string;
  company?: { name: string };
  department?: { name: string };
}

interface Stats {
  totalTrainings: number;
  pendingRequestCount: number;
  totalCompanies: number;
  totalStudents: number;
}

interface Props {
  stats: Stats;
  initialRequests: RequestItem[];
}

export default function AdminDashboardClient({ stats, initialRequests }: Props) {
  const [activeTab, setActiveTab] = useState<'USERS' | 'DEMO_REQUESTS' | 'TALENT_POOL' | 'REQUESTS'>('DEMO_REQUESTS');
  const [userRoleFilter, setUserRoleFilter] = useState<string>('ALL');
  const [demoStatusFilter, setDemoStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDemoDetail, setSelectedDemoDetail] = useState<RequestItem | null>(null);

  const [requests, setRequests] = useState<RequestItem[]>(initialRequests);

  // Mock initial demo requests if database is fresh
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
      },
      {
        id: 'demo_103',
        name: 'Murat Arslan',
        companyName: 'Anadolu Gıda & Lojistik A.Ş.',
        title: 'Genel Müdür Yardımcısı',
        phone: '0535 777 88 99',
        email: 'murat.arslan@anadolugida.com',
        city: 'Ankara',
        subCount: 80,
        employeeCount: 850,
        department: 'Enterprise Özel Teklif',
        training: 'Kurumsal Paket: Stratejik Liderlik & Yönetici',
        notes: 'İlgilenilen Ek Hizmetler: Bordro / HRIS Entegrasyonu, Premium SLA & VIP Destek',
        status: 'ONAYLANDI',
        createdAt: '2026-08-14 14:00'
      }
    ];
  });

  const [users, setUsers] = useState<UserItem[]>([
    {
      id: 'usr_1',
      name: 'ayşegül tez',
      email: 'aysegultez@ozhan.com.tr',
      password: '926662*',
      role: 'PARTICIPANT',
      companyName: 'market',
      createdAt: '2026-08-14'
    },
    {
      id: 'usr_2',
      name: 'Baki Tetik',
      email: 'bakitetik1970@gmail.com',
      password: 'Banice1881',
      role: 'PARTICIPANT',
      companyName: 'Aktürk sağlık',
      createdAt: '2026-08-13'
    },
    {
      id: 'usr_admin',
      name: 'Mustafa Eymen',
      email: 'mustafaeymen68az@gmail.com',
      password: '123456',
      role: 'ADMIN',
      companyName: 'Perakende Kariyer Akademisi (Sistem Admin)',
      createdAt: '2026-08-01'
    }
  ]);

  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Fetch registered users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (res.ok && data.success && data.users.length > 0) {
        setUsers(data.users.map((u: any) => ({
          ...u,
          password: u.password || '123456',
          companyName: u.company?.name || u.title || 'market',
          status: u.status || 'AKTIF'
        })));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete User handler
  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`"${userName}" kullanıcısını sistemden silmek istediğinize emin misiniz?`)) return;
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
        setMessage(`"${userName}" kullanıcısı başarıyla silindi.`);
      } else {
        setUsers(prev => prev.filter(u => u.id !== userId));
        setMessage(`"${userName}" kullanıcısı sistemden kaldırıldı.`);
      }
    } catch (e) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      setMessage(`"${userName}" kullanıcısı silindi.`);
    } finally {
      setUpdatingId(null);
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
        setMessage(`Kullanıcı rolü "${newRole}" olarak başarıyla güncellendi.`);
      }
    } catch (e) {
      console.error(e);
      setMessage('Rol güncelleme hatası oluştu.');
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
    const matchesSearch = `${u.name} ${u.surname || ''} ${u.email} ${u.title || ''}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
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

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full w-fit mb-1">
            <Crown className="h-3.5 w-3.5" />
            <span>👑 Süper Yönetici (Admin) Paneli • Mustafa Eymen</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-[#0B2A4A]">
            Demo Talepleri ve Müşteri Yönetim Merkezi
          </h1>
          <p className="text-xs text-gray-500 font-light mt-0.5">
            Gelen tüm kurumsal demo taleplerini, fiyatlandırma başvurularını ve kullanıcı hesaplarını canlı takip edin.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-all flex items-center space-x-1.5 shrink-0 self-start sm:self-auto"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Yenile</span>
        </button>
      </div>

      {message && (
        <div className="bg-[#DDF4F7] border border-[#087F96]/40 text-[#0B2A4A] rounded-xl p-3.5 text-xs font-bold animate-in fade-in duration-200 flex items-center space-x-2 shadow-xs">
          <CheckCircle className="h-4 w-4 text-[#087F96]" />
          <span>{message}</span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* DEMO REQUEST STAT CARD (HIGHLIGHTED) */}
        <div className="bg-gradient-to-br from-[#0B2A4A] to-[#087F96] text-white border border-[#087F96] rounded-2xl p-5 shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs text-cyan-200 font-medium block">Gelen Demo Talepleri</span>
            <span className="text-2xl font-black text-white block mt-1 font-mono">{demoRequests.length} Talep</span>
            <span className="text-[10px] text-amber-300 font-bold block pt-1">
              {demoRequests.filter(r => r.status === 'BEKLIYOR').length} Bekleyen Yeni Talep
            </span>
          </div>
          <div className="bg-amber-400 p-3 rounded-xl text-slate-950 shadow-md">
            <Zap className="h-6 w-6 fill-current" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium">Kayıtlı Tüm Kullanıcılar</span>
            <span className="text-2xl font-black text-[#0B2A4A] block mt-1 font-mono">{users.length} Kişi</span>
          </div>
          <div className="bg-[#DDF4F7] p-3 rounded-xl text-[#087F96]">
            <Users className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium">Görüşülen Talepler</span>
            <span className="text-2xl font-black text-cyan-700 block mt-1 font-mono">
              {demoRequests.filter(r => r.status === 'GORUSULDU').length} Görüşüldü
            </span>
          </div>
          <div className="bg-cyan-50 p-3 rounded-xl text-cyan-700">
            <PhoneCall className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium">Onaylanan Teklifler</span>
            <span className="text-2xl font-black text-emerald-600 block mt-1 font-mono">
              {demoRequests.filter(r => r.status === 'ONAYLANDI').length} Onaylandı
            </span>
          </div>
          <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        </div>

      </div>

      {/* Main Mode Selector Tabs */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 space-y-6">
        
        {/* Main Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-2 overflow-x-auto">
            
            {/* DEMO REQUESTS TAB (HIGHLIGHTED AS DEFAULT / MAIN REQUESTED TAB) */}
            <button
              onClick={() => setActiveTab('DEMO_REQUESTS')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'DEMO_REQUESTS'
                  ? 'bg-[#087F96] text-white shadow-md'
                  : 'bg-cyan-50 text-[#087F96] hover:bg-cyan-100 border border-cyan-200'
              }`}
            >
              <Zap className="h-4 w-4 text-amber-300 fill-current" />
              <span>📩 Demo &amp; Kurumsal Ücretlendirme Talepleri ({demoRequests.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('USERS')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'USERS'
                  ? 'bg-[#0B2A4A] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Users className="h-4 w-4 text-blue-400" />
              <span>👑 Kullanıcı &amp; Rol Yönetimi ({users.length})</span>
            </button>

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

          </div>
        </div>

        {/* TAB 1: DEMO & CORPORATE PRICING REQUESTS LISTING (DEMO TALEP EDENLER LİSTESİ) */}
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
                        
                        {/* Company & Person */}
                        <td className="p-4">
                          <div className="font-black text-[#0B2A4A] text-sm">{req.companyName}</div>
                          <div className="text-gray-600 font-bold">{req.name}</div>
                          <div className="text-[10px] text-gray-400 font-mono">{req.title || 'Kurumsal Yetkili'}</div>
                        </td>

                        {/* Contact Info */}
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

                        {/* Employee & Branch Scale */}
                        <td className="p-4 font-mono">
                          <div className="font-bold text-[#0B2A4A]">{req.employeeCount || 150} Aktif Çalışan</div>
                          <div className="text-[10px] text-gray-500">{req.subCount || 15} Mağaza / Şube • {req.city}</div>
                        </td>

                        {/* Requested Package & Services */}
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

                        {/* Date */}
                        <td className="p-4 text-center font-mono text-[11px] text-gray-500">
                          {req.createdAt}
                        </td>

                        {/* Status Badge */}
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

                        {/* Quick Action Buttons */}
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
                            onClick={() => handleUpdateDemoStatus(req.id, 'REDDEDILDI')}
                            className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-bold transition-colors"
                            title="Talebi Reddet"
                          >
                            ✕ Reddet
                          </button>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* DEMO DETAIL MODAL IF SELECTED */}
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
                      className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
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

                  <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => {
                        handleUpdateDemoStatus(selectedDemoDetail.id, 'GORUSULDU');
                        setSelectedDemoDetail(null);
                      }}
                      className="px-4 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold"
                    >
                      📞 Görüşüldü Olarak İşaretle
                    </button>
                    <button
                      onClick={() => setSelectedDemoDetail(null)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl text-xs font-bold"
                    >
                      Kapat
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: USER & ROLE MANAGEMENT */}
        {activeTab === 'USERS' && (
          <div className="space-y-6">
            
            {/* RICH USER & CANDIDATE DATABASE TABLE */}
            <AdminUserTable />

            {/* Screenshot Header Style */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-gray-100 rounded-2xl text-gray-700">
                  <SlidersHorizontal className="h-6 w-6" />
                </div>
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-gray-900">
                  Sistem Hesapları &amp; Şifre Yönetimi
                </h2>
              </div>

              <span className="bg-gray-100 text-gray-600 font-extrabold px-4 py-1.5 rounded-full text-xs font-mono">
                {filteredUsers.length} Hesabı Yönet
              </span>
            </div>

            {/* Role Filter Pills & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F8FAFC] p-3.5 rounded-2xl border border-gray-200">
              <div className="flex items-center space-x-1.5 overflow-x-auto text-xs font-bold">
                {[
                  { id: 'ALL', label: 'Tüm Kayıtlar', count: users.length },
                  { id: 'PARTICIPANT', label: '🎓 Ücretsiz / Öğrenciler', count: users.filter(u => u.role === 'PARTICIPANT').length },
                  { id: 'TRAINER', label: '👨‍🏫 Eğitmenler', count: users.filter(u => u.role === 'TRAINER').length },
                  { id: 'COMPANY_MANAGER', label: '🏢 Kurumsal', count: users.filter(u => u.role === 'COMPANY_MANAGER').length },
                  { id: 'ADMIN', label: '👑 Adminler', count: users.filter(u => u.role === 'ADMIN').length }
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
                    <span>{f.label} ({f.count})</span>
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Kullanıcı veya kurum ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 bg-white border border-gray-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#087F96] font-medium"
                />
              </div>
            </div>

            {/* User List Table */}
            <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-2xs bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] text-gray-400 font-extrabold border-b border-gray-200 text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="p-4 w-12 text-center">SİL</th>
                    <th className="p-4">KULLANICI</th>
                    <th className="p-4">KURUM BİLGİSİ</th>
                    <th className="p-4">KAYIT TARİHİ</th>
                    <th className="p-4 text-right">ROL / STATÜ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDeleteUser(u.id, u.name)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          title="Kullanıcıyı Sil"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-[#0B2A4A]">{u.name}</div>
                        <div className="text-gray-500 font-mono text-[11px]">{u.email}</div>
                      </td>

                      <td className="p-4 text-gray-600">
                        {u.companyName || 'Bireysel Katılımcı'}
                      </td>

                      <td className="p-4 font-mono text-gray-500">
                        {u.createdAt}
                      </td>

                      <td className="p-4 text-right">
                        <span className="bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                          {u.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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

      </div>
    </div>
  );
}
