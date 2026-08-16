'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, UserCheck, BarChart3, Award, Clock, TrendingUp, Star, 
  Building2, Crown, Sparkles, CheckCircle2, UserPlus, Mail, Upload, Link2, 
  RefreshCw, AlertCircle, ShieldCheck
} from 'lucide-react';

export default function KurumsalYoneticiPaneliPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [companyInfo, setCompanyInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Employee Add Modal / Tabs State
  const [activeTab, setActiveTab] = useState<'LIST' | 'SINGLE_ADD' | 'EMAIL_INVITE' | 'BULK_IMPORT' | 'INVITE_LINK'>('LIST');
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    systemRole: 'STUDENT',
    professionalPositionId: '',
    departmentId: '',
    storeRegion: 'Merkez'
  });
  const [bulkText, setBulkText] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [actionMsg, setActionMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/corporate/employees');
      const data = await res.json();
      if (data.success) {
        setEmployees(data.employees || []);
        setCompanyInfo(data.company || null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSingleAdd = async (e: React.FormEvent, isInvite: boolean = false) => {
    e.preventDefault();
    setActionMsg(null);
    try {
      const res = await fetch('/api/corporate/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isInvite ? 'EMAIL_INVITE' : 'SINGLE_ADD',
          ...formData
        })
      });
      const data = await res.json();
      if (data.success) {
        setActionMsg({ type: 'success', text: data.message });
        setFormData({ name: '', surname: '', email: '', systemRole: 'STUDENT', professionalPositionId: '', departmentId: '', storeRegion: 'Merkez' });
        fetchEmployees();
      } else {
        setActionMsg({ type: 'error', text: data.message });
      }
    } catch (e) {
      setActionMsg({ type: 'error', text: 'Bağlantı hatası oluştu.' });
    }
  };

  const handleBulkImport = async () => {
    setActionMsg(null);
    if (!bulkText.trim()) return;

    // Parse lines format: Name, Surname, Email
    const lines = bulkText.split('\n');
    const usersList = lines.map(line => {
      const parts = line.split(',').map(s => s.trim());
      return { name: parts[0], surname: parts[1] || '', email: parts[2] || parts[0] };
    }).filter(u => u.email && u.email.includes('@'));

    try {
      const res = await fetch('/api/corporate/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'BULK_IMPORT', usersList })
      });
      const data = await res.json();
      if (data.success) {
        setActionMsg({ type: 'success', text: data.message });
        setBulkText('');
        fetchEmployees();
      } else {
        setActionMsg({ type: 'error', text: data.message });
      }
    } catch (e) {
      setActionMsg({ type: 'error', text: 'Toplu yükleme hatası.' });
    }
  };

  const handleGenerateLink = async () => {
    try {
      const res = await fetch('/api/corporate/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'GENERATE_INVITE_LINK' })
      });
      const data = await res.json();
      if (data.success) {
        setInviteLink(data.inviteUrl);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-[#0B2A4A] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-[#087F96]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#DDF4F7] bg-[#087F96] px-3 py-1 rounded-full uppercase font-mono">
              Kurum Yöneticisi Paneli (RBAC & Veri İzolasyonu)
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl">
              {companyInfo?.name || 'Sayar Marketler Zinciri'}
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm font-light">
              Çalışan ekleme, e-posta davetleri, toplu Excel yükleme, lisans ve paket yönetimi.
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-2xl border border-white/10 shrink-0 text-xs font-mono">
            <div>
              <span className="text-gray-300 block">Kayıtlı Çalışan</span>
              <span className="text-xl font-bold text-emerald-400">{companyInfo?.employeeCount || employees.length} Personel</span>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <span className="text-gray-300 block">Lisans Limiti</span>
              <span className="text-xl font-bold text-amber-300">{companyInfo?.licenseLimit || 100} Lisans</span>
            </div>
          </div>
        </div>

        {/* Action Message Alert */}
        {actionMsg && (
          <div className={`p-4 rounded-2xl text-xs font-bold ${
            actionMsg.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}>
            {actionMsg.type === 'success' ? '✓ ' : '⚠️ '}{actionMsg.text}
          </div>
        )}

        {/* Employee Management Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
          
          {/* Sub Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <h2 className="font-black text-lg text-slate-900">Kurumsal Çalışan Yönetimi</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('LIST')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer ${activeTab === 'LIST' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                📋 Çalışan Listesi ({employees.length})
              </button>
              <button
                onClick={() => setActiveTab('SINGLE_ADD')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer ${activeTab === 'SINGLE_ADD' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                ➕ Tek Çalışan Ekle
              </button>
              <button
                onClick={() => setActiveTab('EMAIL_INVITE')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer ${activeTab === 'EMAIL_INVITE' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                ✉️ E-Posta ile Davet Et
              </button>
              <button
                onClick={() => setActiveTab('BULK_IMPORT')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer ${activeTab === 'BULK_IMPORT' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                📁 Toplu Excel / CSV Yükle
              </button>
              <button
                onClick={() => {
                  setActiveTab('INVITE_LINK');
                  handleGenerateLink();
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer ${activeTab === 'INVITE_LINK' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                🔗 Davet Bağlantısı
              </button>
            </div>
          </div>

          {/* TAB 1: EMPLOYEE LIST */}
          {activeTab === 'LIST' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold">
                    <tr>
                      <th className="p-3.5 rounded-l-xl">Ad Soyad</th>
                      <th className="p-3.5">E-Posta</th>
                      <th className="p-3.5">Sistem Rolü</th>
                      <th className="p-3.5">Mesleki Pozisyon</th>
                      <th className="p-3.5">Mağaza / Bölge</th>
                      <th className="p-3.5">Atanmış Eğitimler</th>
                      <th className="p-3.5 rounded-r-xl text-right">Durum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {employees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-50 font-semibold text-slate-800">
                        <td className="p-3.5 font-bold text-slate-900 flex items-center space-x-2">
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold font-mono text-[11px]">
                            {emp.name.slice(0, 2).toUpperCase()}
                          </div>
                          <span>{emp.name} {emp.surname}</span>
                        </td>
                        <td className="p-3.5 font-mono text-slate-600">{emp.email}</td>
                        <td className="p-3.5 font-bold">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] ${
                            emp.role === 'COMPANY_MANAGER' || emp.systemRoles?.includes('ORGANIZATION_ADMIN')
                              ? 'bg-purple-100 text-purple-800'
                              : emp.role === 'TRAINER' || emp.systemRoles?.includes('INSTRUCTOR')
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {emp.systemRoles?.join(', ') || emp.role}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-slate-700">{emp.professionalPosition}</td>
                        <td className="p-3.5 text-slate-500">{emp.storeRegion}</td>
                        <td className="p-3.5 font-mono text-blue-600 font-bold">{emp.assignedTrainingsCount || 2} Eğitim</td>
                        <td className="p-3.5 text-right font-mono">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            emp.accountStatus === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {emp.accountStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2 & 3: SINGLE ADD / EMAIL INVITE */}
          {(activeTab === 'SINGLE_ADD' || activeTab === 'EMAIL_INVITE') && (
            <form onSubmit={(e) => handleSingleAdd(e, activeTab === 'EMAIL_INVITE')} className="space-y-4 max-w-xl">
              <h3 className="font-bold text-sm text-slate-900">
                {activeTab === 'SINGLE_ADD' ? 'Yeni Çalışan Ekle' : 'E-Posta Daveti Gönder'}
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700">Ad *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Soyad</label>
                  <input
                    type="text"
                    value={formData.surname}
                    onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="font-bold text-slate-700">E-Posta *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700">Sistem Rolü *</label>
                  <select
                    value={formData.systemRole}
                    onChange={(e) => setFormData({ ...formData, systemRole: e.target.value })}
                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="STUDENT">Öğrenci</option>
                    <option value="INSTRUCTOR">Eğitmen</option>
                    <option value="ORGANIZATION_ADMIN">Kurum Yöneticisi</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">Mağaza / Bölge</label>
                  <input
                    type="text"
                    value={formData.storeRegion}
                    onChange={(e) => setFormData({ ...formData, storeRegion: e.target.value })}
                    className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
              >
                {activeTab === 'SINGLE_ADD' ? 'KAYDET VE EKLE' : 'DAVET ET VE E-POSTA GÖNDER'}
              </button>
            </form>
          )}

          {/* TAB 4: BULK IMPORT */}
          {activeTab === 'BULK_IMPORT' && (
            <div className="space-y-4 max-w-xl text-xs">
              <h3 className="font-bold text-sm text-slate-900">Toplu Excel / CSV Metin Formatı Yükle</h3>
              <p className="text-slate-500 font-medium">Her satıra bir çalışan gelecek şekilde <strong>Ad, Soyad, E-Posta</strong> formatında yapıştırınız.</p>
              
              <textarea
                rows={6}
                placeholder={"Ahmet, Yılmaz, ahmet@sayarmarket.com\nMehmet, Demir, mehmet@sayarmarket.com"}
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs"
              />

              <button
                onClick={handleBulkImport}
                className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
              >
                TOPLU HESAPLARI OLUŞTUR
              </button>
            </div>
          )}

          {/* TAB 5: INVITE LINK */}
          {activeTab === 'INVITE_LINK' && (
            <div className="space-y-4 max-w-xl text-xs">
              <h3 className="font-bold text-sm text-slate-900">Kuruma Özel Davet Bağlantısı</h3>
              <p className="text-slate-500 font-medium">Bu bağlantıyı çalışanlarınıza ileterek kurumunuza otomatik kayıt olmalarını sağlayabilirsiniz.</p>

              <div className="p-3 bg-slate-100 rounded-xl font-mono text-xs text-blue-700 border border-slate-200 break-all">
                {inviteLink || 'Yükleniyor...'}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
