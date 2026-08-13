'use client';

import React, { useState } from 'react';
import { Inbox, FileText, Building, Users, CheckCircle, XCircle, Clock, Calendar, Check, X, ShieldAlert } from 'lucide-react';

interface Request {
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

interface Stats {
  totalTrainings: number;
  pendingRequestCount: number;
  totalCompanies: number;
  totalStudents: number;
}

interface Props {
  stats: Stats;
  initialRequests: Request[];
}

export default function AdminDashboardClient({ stats, initialRequests }: Props) {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

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
        // Update local state
        setRequests(prev =>
          prev.map(req => (req.id === id ? { ...req, status: newStatus } : req))
        );
        setMessage('Talep durumu başarıyla güncellendi.');
      } else {
        setMessage('Güncelleme işlemi sırasında bir sorun oluştu.');
      }
    } catch (e) {
      console.error(e);
      setMessage('Sunucu bağlantı hatası oluştu.');
    } finally {
      setUpdatingId(null);
      // Clear alert after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-display font-extrabold text-2xl text-primary-navy">
          Yönetici Paneli (Admin)
        </h1>
        <p className="text-xs text-secondary-text mt-1">
          Eğitim akademisi genel istatistikleri, kurumsal talepler ve içerik yönetimi.
        </p>
      </div>

      {message && (
        <div className="bg-light-blue border border-corporate-blue/20 text-corporate-blue rounded-lg p-3 text-xs font-semibold animate-in fade-in duration-200">
          {message}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium">Toplam Eğitim</span>
            <span className="text-2xl font-bold text-primary-navy block mt-1 font-mono">{stats.totalTrainings}</span>
          </div>
          <div className="bg-light-blue p-3 rounded-lg text-corporate-blue">
            <FileText className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium">Bekleyen Talep</span>
            <span className="text-2xl font-bold text-corporate-blue block mt-1 font-mono">
              {requests.filter(r => r.status === 'BEKLIYOR').length}
            </span>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg text-warning-orange">
            <Inbox className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium">Kayıtlı Şirket</span>
            <span className="text-2xl font-bold text-primary-navy block mt-1 font-mono">{stats.totalCompanies || 1}</span>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg text-gray-600">
            <Building className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white border border-gray-150 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium">Aktif Katılımcı</span>
            <span className="text-2xl font-bold text-primary-navy block mt-1 font-mono">{stats.totalStudents || 1}</span>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-green-600">
            <Users className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Requests Management Table */}
      <div className="bg-white border border-gray-150 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-100 py-4 px-6 flex justify-between items-center">
          <div>
            <h3 className="font-display font-bold text-sm text-primary-navy">
              Kurumsal Eğitim Talepleri ({requests.length})
            </h3>
            <p className="text-[10px] text-secondary-text mt-0.5">Şirketlerden gelen eğitim başvuruları ve onay süreçleri.</p>
          </div>
          <Inbox className="h-5 w-5 text-gray-400" />
        </div>

        {requests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-6">Başvuran</th>
                  <th className="py-3.5 px-6">Şirket / Şehir</th>
                  <th className="py-3.5 px-6">Eğitim / Departman</th>
                  <th className="py-3.5 px-6">Kişi / Format</th>
                  <th className="py-3.5 px-6">Tarih</th>
                  <th className="py-3.5 px-6">Durum</th>
                  <th className="py-3.5 px-6 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150">
                {requests.map((req) => {
                  const isPending = req.status === 'BEKLIYOR';
                  const isApproved = req.status === 'ONAYLANDI';
                  const isRejected = req.status === 'REDDEDILDI';

                  return (
                    <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 px-6">
                        <span className="block font-bold text-primary-navy">{req.name}</span>
                        <span className="block text-[10px] text-gray-400 mt-0.5">{req.title || 'Yetkili'}</span>
                      </td>
                      <td className="py-3.5 px-6">
                        <span className="block font-semibold text-gray-800">{req.companyName}</span>
                        <span className="block text-[10px] text-gray-400 mt-0.5">{req.city}</span>
                      </td>
                      <td className="py-3.5 px-6">
                        <span className="block font-semibold text-corporate-blue line-clamp-1">{req.training || 'Belirtilmedi'}</span>
                        <span className="block text-[10px] text-gray-400 mt-0.5">{req.department || 'Tüm Departmanlar'}</span>
                      </td>
                      <td className="py-3.5 px-6">
                        <span className="block font-mono font-semibold">{req.count || 0} Kişi</span>
                        <span className="block text-[10px] text-gray-400 mt-0.5">{req.format === 'ONLINE' ? 'Online' : 'Yüz Yüze'}</span>
                      </td>
                      <td className="py-3.5 px-6 text-gray-500 font-mono">
                        {req.date ? new Date(req.date).toLocaleDateString('tr-TR') : 'Esnek'}
                      </td>
                      <td className="py-3.5 px-6">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                          isApproved 
                            ? 'bg-green-50 text-green-600' 
                            : isRejected 
                            ? 'bg-red-50 text-red-600' 
                            : 'bg-amber-50 text-amber-600'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        {isPending ? (
                          <div className="flex justify-end space-x-1.5">
                            <button
                              onClick={() => handleUpdateStatus(req.id, 'ONAYLANDI')}
                              disabled={updatingId === req.id}
                              className="p-1.5 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded transition-colors cursor-pointer"
                              title="Talebi Onayla"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(req.id, 'REDDEDILDI')}
                              disabled={updatingId === req.id}
                              className="p-1.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded transition-colors cursor-pointer"
                              title="Talebi Reddet"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-gray-400 font-medium">İşlem Yapıldı</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            <Inbox className="h-12 w-12 text-gray-200 mx-auto mb-4" />
            <h3 className="font-display font-bold text-sm text-primary-navy">
              Henüz Eğitim Talebi Bulunmuyor
            </h3>
            <p className="text-xs text-secondary-text mt-1">
              Web sitesi üzerindeki formdan gelen kurumsal eğitim talepleri burada listelenecektir.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
