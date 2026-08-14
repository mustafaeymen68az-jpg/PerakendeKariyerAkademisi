'use client';

import React, { useState, useEffect } from 'react';
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
  Sparkles
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
  role: string;
  title?: string;
  status?: string;
  createdAt: string;
  lastLoginAt?: string;
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
  const [activeTab, setActiveTab] = useState<'REQUESTS' | 'USERS'>('USERS');
  const [userRoleFilter, setUserRoleFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const [requests, setRequests] = useState<RequestItem[]>(initialRequests);
  const [users, setUsers] = useState<UserItem[]>([
    {
      id: 'usr_admin',
      name: 'Mustafa Eymen',
      surname: 'Admin',
      email: 'mustafaeymen68az@gmail.com',
      role: 'ADMIN',
      title: 'Sistem Yöneticisi & Admin',
      status: 'AKTIF',
      createdAt: '2026-08-14'
    },
    {
      id: 'usr_trainer',
      name: 'Dr. Ahmet Yılmaz',
      surname: 'Eğitmen',
      email: 'egitmen@perakendekariyer.com',
      role: 'TRAINER',
      title: 'Kıdemli Perakende Baş Eğitmeni',
      status: 'AKTIF',
      createdAt: '2026-08-14'
    },
    {
      id: 'usr_student1',
      name: 'Mehmet Yılmaz',
      surname: '',
      email: 'mehmet@market.com',
      role: 'PARTICIPANT',
      title: 'Mağaza Müdürü Adayı',
      status: 'AKTIF',
      createdAt: '2026-08-13'
    },
    {
      id: 'usr_student2',
      name: 'Ayşe Demir',
      surname: '',
      email: 'ayse@kasiyer.com',
      role: 'PARTICIPANT',
      title: 'Kasiyer',
      status: 'AKTIF',
      createdAt: '2026-08-12'
    },
    {
      id: 'usr_company',
      name: 'Ali Kaya',
      surname: 'Yönetici',
      email: 'ali@migros.com',
      role: 'COMPANY_MANAGER',
      title: 'Kurumsal İK Direktörü',
      status: 'AKTIF',
      createdAt: '2026-08-10'
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
        setUsers(data.users.map((u: any) => ({ ...u, status: u.status || 'AKTIF' })));
      }
    } catch (e) {
      console.error(e);
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

  // Toggle account access status (Sayfalarını / Hesaplarını Kapatma)
  const handleToggleAccountStatus = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'KAPALI' ? 'AKTIF' : 'KAPALI';
        setMessage(`Kullanıcı hesabı ${nextStatus === 'KAPALI' ? 'KAPATILDI / ENGELLENDİ' : 'AKTİF HALE GETİRİLDİ'}.`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
    setTimeout(() => setMessage(''), 3000);
  };

  // Update corporate request status
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    setMessage('');
    try {
      const response = await fetch('/api/admin/update-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setRequests(prev =>
          prev.map(req => (req.id === id ? { ...req, status: newStatus } : req))
        );
        setMessage('Talep durumu başarıyla güncellendi.');
      }
    } catch (e) {
      console.error(e);
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

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return <span className="bg-amber-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-black flex items-center space-x-1"><Crown className="h-3 w-3" /><span>ADMIN</span></span>;
      case 'TRAINER':
        return <span className="bg-[#087F96] text-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center space-x-1"><GraduationCap className="h-3 w-3" /><span>EĞİTMEN</span></span>;
      case 'COMPANY_MANAGER':
        return <span className="bg-purple-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center space-x-1"><Building2 className="h-3 w-3" /><span>KURUMSAL MÜDÜR</span></span>;
      default:
        return <span className="bg-blue-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center space-x-1"><Users className="h-3 w-3" /><span>ÖĞRENCİ</span></span>;
    }
  };

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
            Kullanıcı, Rol ve İçerik Yönetim Merkezi
          </h1>
          <p className="text-xs text-gray-500 font-light mt-0.5">
            Tüm öğrencileri, eğitmenleri, kurumsal yöneticileri ayrı ayrı inceleyin, rolleri güncelleyin veya hesap erişimlerini kapatın.
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
            <span className="text-xs text-gray-500 font-medium">Eğitmen Sayısı</span>
            <span className="text-2xl font-black text-[#087F96] block mt-1 font-mono">
              {users.filter(u => u.role === 'TRAINER').length} Eğitmen
            </span>
          </div>
          <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
            <GraduationCap className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium">Öğrenci / Katılımcı</span>
            <span className="text-2xl font-black text-blue-600 block mt-1 font-mono">
              {users.filter(u => u.role === 'PARTICIPANT').length} Öğrenci
            </span>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
            <UserCheck className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium">Bekleyen Kurumsal Talep</span>
            <span className="text-2xl font-black text-amber-600 block mt-1 font-mono">{stats.pendingRequestCount} Talep</span>
          </div>
          <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
            <Inbox className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Main Mode Selector Tabs: USER MANAGEMENT vs CORPORATE REQUESTS vs TALENT POOL NOTIFICATIONS */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 space-y-6">
        
        {/* Main Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('USERS')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'USERS'
                  ? 'bg-[#0B2A4A] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Users className="h-4 w-4 text-[#087F96]" />
              <span>👑 Kullanıcı & Rol Yönetimi ({users.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('TALENT_POOL' as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 whitespace-nowrap ${
                (activeTab as any) === 'TALENT_POOL'
                  ? 'bg-[#087F96] text-white shadow-md'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <Sparkles className="h-4 w-4 text-emerald-300" />
              <span>📩 İK Yetenek Havuzu Aday Bildirimleri (+80p)</span>
            </button>

            <button
              onClick={() => setActiveTab('REQUESTS')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'REQUESTS'
                  ? 'bg-[#0B2A4A] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Inbox className="h-4 w-4 text-amber-500" />
              <span>🏢 Kurumsal Talepler ({requests.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: USER & ROLE MANAGEMENT */}
        {activeTab === 'USERS' && (
          <div className="space-y-4">
            
            {/* Role Filter Pills & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F8FAFC] p-3 rounded-2xl border border-gray-200">
              
              {/* Category Filter Pills */}
              <div className="flex items-center space-x-1.5 overflow-x-auto text-xs font-bold">
                {[
                  { id: 'ALL', label: 'Tüm Kullanıcılar', count: users.length },
                  { id: 'PARTICIPANT', label: '🎓 Öğrenciler', count: users.filter(u => u.role === 'PARTICIPANT').length },
                  { id: 'TRAINER', label: '👨‍🏫 Eğitmenler', count: users.filter(u => u.role === 'TRAINER').length },
                  { id: 'COMPANY_MANAGER', label: '🏢 Kurumsal Yöneticiler', count: users.filter(u => u.role === 'COMPANY_MANAGER').length },
                  { id: 'ADMIN', label: '👑 Adminler', count: users.filter(u => u.role === 'ADMIN').length }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setUserRoleFilter(f.id)}
                    className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                      userRoleFilter === f.id
                        ? 'bg-[#087F96] text-white shadow-xs'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <span>{f.label} ({f.count})</span>
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="İsim veya e-posta ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 bg-white border border-gray-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#087F96]"
                />
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0B2A4A] text-white font-bold">
                  <tr>
                    <th className="p-3.5">Kullanıcı Adı</th>
                    <th className="p-3.5">E-posta</th>
                    <th className="p-3.5">Mevcut Rol</th>
                    <th className="p-3.5">Hesap Durumu</th>
                    <th className="p-3.5">Rol Değiştir (İstediğin Rolü Ver)</th>
                    <th className="p-3.5 text-right">Erişim Kapat / Aç</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      {/* User Name */}
                      <td className="p-3.5 font-bold text-[#0B2A4A] flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-[#087F96] text-white font-bold flex items-center justify-center text-xs font-mono shrink-0">
                          {u.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="block font-bold">{u.name} {u.surname || ''}</span>
                          <span className="text-[10px] text-gray-400 font-normal">{u.title || u.company?.name || 'Kullanıcı'}</span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="p-3.5 font-mono text-gray-600 font-semibold">{u.email}</td>

                      {/* Current Role Badge */}
                      <td className="p-3.5">
                        {getRoleBadge(u.role)}
                      </td>

                      {/* Account Status Badge */}
                      <td className="p-3.5">
                        {u.status === 'KAPALI' ? (
                          <span className="bg-red-100 text-red-800 px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center space-x-1 w-fit">
                            <Lock className="h-3 w-3 text-red-600" />
                            <span>KAPALI / ENGELLENDİ</span>
                          </span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center space-x-1 w-fit">
                            <CheckCircle className="h-3 w-3 text-emerald-600" />
                            <span>AKTİF HESAP</span>
                          </span>
                        )}
                      </td>

                      {/* Role Switcher Dropdown */}
                      <td className="p-3.5">
                        <select
                          value={u.role}
                          disabled={updatingId === u.id}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          className="p-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-[#0B2A4A] outline-none focus:ring-2 focus:ring-[#087F96]"
                        >
                          <option value="PARTICIPANT">🎓 Öğrenci / Katılımcı Yap</option>
                          <option value="TRAINER">👨‍🏫 Eğitmen Yap</option>
                          <option value="COMPANY_MANAGER">🏢 Kurumsal Yönetici Yap</option>
                          <option value="ADMIN">👑 Admin Yap</option>
                        </select>
                      </td>

                      {/* Account Suspend/Block Button */}
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleToggleAccountStatus(u.id)}
                          className={`px-3 py-1.5 rounded-xl font-extrabold text-[11px] transition-all ${
                            u.status === 'KAPALI'
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              : 'bg-red-600 hover:bg-red-700 text-white'
                          }`}
                        >
                          {u.status === 'KAPALI' ? 'Hesabı Aç ✓' : 'Sayfayı / Hesabı Kapat ✖'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 2: CORPORATE REQUESTS */}
        {activeTab === 'REQUESTS' && (
          <div className="space-y-4">
            <h3 className="font-display font-bold text-base text-[#0B2A4A]">Gelen Kurumsal Eğitim Talepleri</h3>

            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0B2A4A] text-white font-bold">
                  <tr>
                    <th className="p-3">Şirket / Yetkili</th>
                    <th className="p-3">İletişim</th>
                    <th className="p-3">Şehir / Detay</th>
                    <th className="p-3">Eğitim & Kişi Sayısı</th>
                    <th className="p-3">Durum</th>
                    <th className="p-3 text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50 font-medium">
                      <td className="p-3">
                        <strong className="block text-[#0B2A4A] font-bold">{req.companyName}</strong>
                        <span className="text-gray-500 text-[11px]">{req.name} ({req.title || 'Yetkili'})</span>
                      </td>
                      <td className="p-3 text-gray-600 font-mono text-[11px]">
                        <div>{req.email}</div>
                        <div>{req.phone}</div>
                      </td>
                      <td className="p-3 text-gray-600">
                        {req.city} • {req.employeeCount || '-'} Çalışan
                      </td>
                      <td className="p-3 text-gray-700 font-bold">
                        {req.training || 'Genel Kurumsal'} ({req.count || 10} Kişi)
                      </td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          req.status === 'ONAYLANDI' ? 'bg-emerald-100 text-emerald-800' :
                          req.status === 'REDDEDILDI' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => handleUpdateStatus(req.id, 'ONAYLANDI')}
                          className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold"
                        >
                          Onayla
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(req.id, 'REDDEDILDI')}
                          className="px-2.5 py-1 bg-red-600 text-white rounded-lg text-[10px] font-bold"
                        >
                          Reddet
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: TALENT POOL NOTIFICATIONS */}
        {(activeTab as any) === 'TALENT_POOL' && (
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
