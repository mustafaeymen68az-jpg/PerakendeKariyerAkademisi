'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  ShieldCheck, 
  Building2, 
  MapPin, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Edit3, 
  Trash2, 
  Eye, 
  Sparkles,
  BookOpen,
  ChevronRight,
  Plus,
  Briefcase
} from 'lucide-react';

export interface AdminUser {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  sectorChannel: string;
  role: string;
  city: string;
  competencyScore: number;
  readinessStatus: 'Terfiye Hazır' | 'Terfiye Yakın' | 'Gelişim Gerekli' | 'Zayıf Performans';
  completedCoursesCount: number;
  joinedDate: string;
  lastActive: string;
}

const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr_1',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    firstName: 'Ahmet',
    lastName: 'Çelik',
    email: 'ahmet.celik@migros.com.tr',
    phone: '0532 123 45 67',
    companyName: 'Migros / Macrocenter',
    sectorChannel: 'Gıda Perakendeciliği',
    role: 'Meyve Sebze Reyon Görevlisi',
    city: 'İstanbul',
    competencyScore: 88,
    readinessStatus: 'Terfiye Hazır',
    completedCoursesCount: 14,
    joinedDate: '12 Ocak 2025',
    lastActive: 'Bugün 08:30'
  },
  {
    id: 'usr_2',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    firstName: 'Zeynep',
    lastName: 'Kaya',
    email: 'zeynep.kaya@carrefoursa.com',
    phone: '0533 234 56 78',
    companyName: 'CarrefourSA',
    sectorChannel: 'Gıda Perakendeciliği',
    role: 'Kasiyer & Kasa Şefi',
    city: 'İzmir',
    competencyScore: 92,
    readinessStatus: 'Terfiye Hazır',
    completedCoursesCount: 18,
    joinedDate: '05 Şubat 2025',
    lastActive: 'Bugün 07:15'
  },
  {
    id: 'usr_3',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    firstName: 'Mehmet',
    lastName: 'Öztürk',
    email: 'mehmet.ozturk@lcwaikiki.com',
    phone: '0535 345 67 89',
    companyName: 'LC Waikiki',
    sectorChannel: 'Moda & Tekstil Perakendeciliği',
    role: 'Mağaza Müdürü',
    city: 'Ankara',
    competencyScore: 95,
    readinessStatus: 'Terfiye Hazır',
    completedCoursesCount: 24,
    joinedDate: '10 Kasım 2024',
    lastActive: 'Dün 18:45'
  },
  {
    id: 'usr_4',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    firstName: 'Selin',
    lastName: 'Demir',
    email: 'selin.demir@watsons.com.tr',
    phone: '0536 456 78 90',
    companyName: 'Watsons Türkiye',
    sectorChannel: 'Kozmetik & Kişisel Bakım',
    role: 'Güzellik Danışmanı',
    city: 'Bursa',
    competencyScore: 78,
    readinessStatus: 'Terfiye Yakın',
    completedCoursesCount: 11,
    joinedDate: '18 Mart 2025',
    lastActive: 'Bugün 09:10'
  },
  {
    id: 'usr_5',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    firstName: 'Burak',
    lastName: 'Şahin',
    email: 'burak.sahin@teknosa.com',
    phone: '0537 567 89 01',
    companyName: 'Teknosa',
    sectorChannel: 'Elektronik & Teknoloji Perakendeciliği',
    role: 'Kategori Satış Uzmanı',
    city: 'Antalya',
    competencyScore: 74,
    readinessStatus: 'Gelişim Gerekli',
    completedCoursesCount: 8,
    joinedDate: '22 Nisan 2025',
    lastActive: '3 Gün Önce'
  },
  {
    id: 'usr_6',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    firstName: 'Elif',
    lastName: 'Arslan',
    email: 'elif.arslan@koctas.com.tr',
    phone: '0538 678 90 12',
    companyName: 'Koçtaş Yapı Market',
    sectorChannel: 'Yapı Market & Ev Geliştirme',
    role: 'Müşteri Danışmanı',
    city: 'Adana',
    competencyScore: 48,
    readinessStatus: 'Zayıf Performans',
    completedCoursesCount: 4,
    joinedDate: '02 Mayıs 2025',
    lastActive: '5 Gün Önce'
  },
  {
    id: 'usr_7',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    firstName: 'Caner',
    lastName: 'Yılmaz',
    email: 'caner.yilmaz@bim.com.tr',
    phone: '0539 789 01 23',
    companyName: 'BİM Birleşik Mağazalar',
    sectorChannel: 'Gıda Perakendeciliği',
    role: 'Depo & Lojistik Elemanı',
    city: 'Kocaeli',
    competencyScore: 52,
    readinessStatus: 'Zayıf Performans',
    completedCoursesCount: 5,
    joinedDate: '15 Ocak 2025',
    lastActive: 'Bugün 06:40'
  }
];

export default function AdminUserTable() {
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('ALL');
  const [cityFilter, setCityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const fullSearch = `${u.firstName} ${u.lastName} ${u.companyName} ${u.role} ${u.email} ${u.city}`.toLowerCase();
      const matchesSearch = searchTerm === '' || fullSearch.includes(searchTerm.toLowerCase());
      const matchesSector = sectorFilter === 'ALL' || u.sectorChannel.includes(sectorFilter);
      const matchesCity = cityFilter === 'ALL' || u.city === cityFilter;
      const matchesStatus = statusFilter === 'ALL' || u.readinessStatus === statusFilter;

      return matchesSearch && matchesSector && matchesCity && matchesStatus;
    });
  }, [users, searchTerm, sectorFilter, cityFilter, statusFilter]);

  const handleDeleteUser = (id: string) => {
    if (confirm('Bu kullanıcıyı sistemden silmek istediğinize emin misiniz?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
      if (selectedUser?.id === id) setSelectedUser(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* KPI Summary Header Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-gray-500 uppercase block">Toplam Kullanıcı</span>
          <div className="text-2xl font-black text-[#0B2A4A]">{users.length} Personel</div>
          <span className="text-[10px] text-emerald-600 font-bold block">Canlı Sistem Kaydı</span>
        </div>

        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-emerald-900 uppercase block">Terfiye Hazır %80+</span>
          <div className="text-2xl font-black text-emerald-950">
            {users.filter(u => u.readinessStatus === 'Terfiye Hazır').length} Personel
          </div>
          <span className="text-[10px] text-emerald-700 font-bold block">Yönetici Pipeline</span>
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-amber-900 uppercase block">Geliştirilecek Kadro</span>
          <div className="text-2xl font-black text-amber-950">
            {users.filter(u => u.readinessStatus === 'Gelişim Gerekli' || u.readinessStatus === 'Terfiye Yakın').length} Personel
          </div>
          <span className="text-[10px] text-amber-700 font-bold block">Eğitim Takibinde</span>
        </div>

        <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold text-rose-900 uppercase block">Zayıf Performans</span>
          <div className="text-2xl font-black text-rose-950">
            {users.filter(u => u.readinessStatus === 'Zayıf Performans').length} Personel
          </div>
          <span className="text-[10px] text-rose-700 font-bold block">Mentörlük Bekliyor</span>
        </div>
      </div>

      {/* FILTER CONTROL BAR */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="İsim, e-posta, şirket veya il ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#087F96] text-[#0B2A4A]"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Sector Dropdown */}
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-xs rounded-xl px-3 py-2 font-bold text-[#0B2A4A] focus:outline-none focus:ring-2 focus:ring-[#087F96]"
          >
            <option value="ALL">Tüm Sektör Kanalları</option>
            <option value="Gıda">Gıda Perakendeciliği</option>
            <option value="Moda">Moda & Tekstil</option>
            <option value="Kozmetik">Kozmetik & Bakım</option>
            <option value="Elektronik">Elektronik & Teknoloji</option>
            <option value="Yapı">Yapı Market</option>
          </select>

          {/* City Dropdown */}
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-xs rounded-xl px-3 py-2 font-bold text-[#0B2A4A] focus:outline-none focus:ring-2 focus:ring-[#087F96]"
          >
            <option value="ALL">Tüm İller</option>
            <option value="İstanbul">İstanbul</option>
            <option value="Ankara">Ankara</option>
            <option value="İzmir">İzmir</option>
            <option value="Bursa">Bursa</option>
            <option value="Antalya">Antalya</option>
            <option value="Adana">Adana</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-xs rounded-xl px-3 py-2 font-bold text-[#0B2A4A] focus:outline-none focus:ring-2 focus:ring-[#087F96]"
          >
            <option value="ALL">Tüm Hazırlık Statüleri</option>
            <option value="Terfiye Hazır">Terfiye Hazır (%80+)</option>
            <option value="Terfiye Yakın">Terfiye Yakın</option>
            <option value="Gelişim Gerekli">Gelişim Gerekli</option>
            <option value="Zayıf Performans">Zayıf Performans</option>
          </select>

          {/* Export Report CSV */}
          <button
            onClick={() => alert('Kullanıcı veritabanı Excel/CSV formatında indirildi.')}
            className="px-3.5 py-2 bg-[#0B2A4A] hover:bg-[#061B33] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center space-x-1.5"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Excel İndir</span>
          </button>
        </div>

      </div>

      {/* USER MANAGEMENT DATA TABLE */}
      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B2A4A] text-white font-mono font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Kullanıcı / Personel</th>
                <th className="p-4">İşletme & Sektör</th>
                <th className="p-4">Şirketteki Görevi</th>
                <th className="p-4">İl</th>
                <th className="p-4 text-center">Yetkinlik Skoru</th>
                <th className="p-4 text-center">Terfi Hazırlık</th>
                <th className="p-4 text-center">Ders</th>
                <th className="p-4 text-right">İşlemler</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-400 italic font-medium">
                    Arama kriterlerinize uygun kayıtlı kullanıcı bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50/80 transition-colors">
                    
                    {/* User Name & Avatar */}
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img src={u.avatar} alt={u.firstName} className="w-10 h-10 rounded-xl object-cover border border-gray-300 shrink-0" />
                        <div>
                          <h4 className="font-extrabold text-sm text-[#0B2A4A]">{u.firstName} {u.lastName}</h4>
                          <p className="text-[11px] text-gray-500 font-mono">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Company & Sector */}
                    <td className="p-4">
                      <div className="font-bold text-[#0B2A4A]">{u.companyName}</div>
                      <div className="text-[10px] text-gray-500">{u.sectorChannel}</div>
                    </td>

                    {/* Job Role */}
                    <td className="p-4">
                      <div className="font-extrabold text-slate-800">{u.role}</div>
                    </td>

                    {/* City */}
                    <td className="p-4">
                      <span className="inline-flex items-center space-x-1 font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span>{u.city}</span>
                      </span>
                    </td>

                    {/* Competency Score */}
                    <td className="p-4 text-center">
                      <span className={`inline-block font-mono font-black text-sm px-2.5 py-1 rounded-lg ${
                        u.competencyScore >= 90 ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                        u.competencyScore >= 75 ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                        u.competencyScore >= 60 ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                        'bg-rose-100 text-rose-900 border border-rose-300'
                      }`}>
                        %{u.competencyScore}
                      </span>
                    </td>

                    {/* Readiness Badge */}
                    <td className="p-4 text-center">
                      <span className={`inline-block text-[10px] font-mono font-black px-2.5 py-1 rounded-full ${
                        u.readinessStatus === 'Terfiye Hazır' ? 'bg-emerald-600 text-white' :
                        u.readinessStatus === 'Terfiye Yakın' ? 'bg-blue-600 text-white' :
                        u.readinessStatus === 'Gelişim Gerekli' ? 'bg-amber-500 text-white' :
                        'bg-rose-600 text-white animate-pulse'
                      }`}>
                        {u.readinessStatus}
                      </span>
                    </td>

                    {/* Courses Count */}
                    <td className="p-4 text-center font-bold text-gray-700">
                      {u.completedCoursesCount} Modül
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedUser(u)}
                          className="p-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl font-bold text-xs transition-colors flex items-center space-x-1"
                          title="Detay İncele"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline">İncele</span>
                        </button>

                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl transition-colors"
                          title="Kullanıcıyı Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* USER DETAILS MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-5 border-2 border-[#087F96] shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4 border-b border-gray-100 pb-4">
              <img src={selectedUser.avatar} alt={selectedUser.firstName} className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-md" />
              <div>
                <span className="text-[10px] font-mono font-black text-[#087F96] uppercase tracking-wider block">
                  Kullanıcı Veritabanı Karnesi
                </span>
                <h4 className="font-black text-xl text-[#0B2A4A]">{selectedUser.firstName} {selectedUser.lastName}</h4>
                <p className="text-xs text-gray-600 font-bold">{selectedUser.role} • {selectedUser.companyName}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200">
                <span className="text-[9px] font-mono font-bold text-blue-800 uppercase block">Bulunduğu İl</span>
                <span className="text-sm font-black text-[#0B2A4A] mt-0.5 block">{selectedUser.city}</span>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span className="text-[9px] font-mono font-bold text-emerald-800 uppercase block">Yetkinlik Skoru</span>
                <span className="text-sm font-black text-emerald-900 mt-0.5 block">%{selectedUser.competencyScore}</span>
              </div>

              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
                <span className="text-[9px] font-mono font-bold text-purple-800 uppercase block">Tamamlanan Ders</span>
                <span className="text-sm font-black text-purple-950 mt-0.5 block">{selectedUser.completedCoursesCount} Modül</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">E-Posta Adresi:</span>
                <span className="font-mono font-bold text-gray-900">{selectedUser.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Sektör Kanalı:</span>
                <span className="font-bold text-gray-900">{selectedUser.sectorChannel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Sisteme Kayıt Tarihi:</span>
                <span className="font-mono text-gray-900">{selectedUser.joinedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Son Aktiflik:</span>
                <span className="font-mono text-emerald-700 font-bold">{selectedUser.lastActive}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <Link
                href="/ik-cozumlari/calisan-ozgecmis-egitim-karnesi"
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-[#087F96] text-white text-xs font-extrabold rounded-xl hover:bg-[#056B80] transition-colors"
              >
                🎓 Tüm Karnesini Aç
              </Link>

              <button
                onClick={() => setSelectedUser(null)}
                className="px-5 py-2 bg-[#0B2A4A] text-white text-xs font-extrabold rounded-xl hover:bg-[#061B33] transition-colors"
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
