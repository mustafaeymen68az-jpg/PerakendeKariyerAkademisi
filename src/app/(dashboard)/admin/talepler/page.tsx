'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Inbox,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  Building2,
  Users,
  Calendar,
  DollarSign,
  FileText,
  Plus,
  Eye,
  Check,
  X,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Download,
  AlertCircle,
  Send
} from 'lucide-react';

interface TrainingRequest {
  id: string;
  code: string;
  companyName: string;
  requesterName: string;
  requesterTitle: string;
  requesterPhone: string;
  requesterEmail: string;
  trainingName: string;
  category: string;
  participantCount: number;
  budget: number;
  proposedDate: string;
  notes: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  city: string;
}

const INITIAL_REQUESTS: TrainingRequest[] = [
  {
    id: 'req-1',
    code: 'TLP-2026-9912',
    companyName: 'Sayar Marketler Grubu',
    requesterName: 'Mehmet Sevim',
    requesterTitle: 'İnsan Kaynakları Direktörü',
    requesterPhone: '+90 532 555 0122',
    requesterEmail: 'mehmet.sevim@sayarmarket.com',
    trainingName: 'Taze Gıda Kategori & Hijyen Standartları Eğitimi',
    category: 'Saha Operasyonu',
    participantCount: 48,
    budget: 54000,
    proposedDate: '25 Ağustos 2026',
    notes: 'Ege ve Marmara şubelerimizdeki tüm taze gıda şefleri ve reyon personelinin katılımı zorunludur.',
    status: 'PENDING',
    createdAt: '16 Ağustos 2026',
    city: 'İstanbul / İzmir'
  },
  {
    id: 'req-2',
    code: 'TLP-2026-9844',
    companyName: 'Grosper Hipermarketleri',
    requesterName: 'Ayşe Karahan',
    requesterTitle: 'Eğitim Müdürü',
    requesterPhone: '+90 533 444 0988',
    requesterEmail: 'ayse.karahan@grosper.com.tr',
    trainingName: 'P&L Mağaza Bütçe Yönetimi & Fire Minimizasyonu Uzmanlığı',
    category: 'Yönetici Gelişimi',
    participantCount: 18,
    budget: 42000,
    proposedDate: '01 Eylül 2026',
    notes: '2026 Q4 Mağaza Müdürü terfi adayları için zorunlu sertifikasyon programıdır.',
    status: 'PENDING',
    createdAt: '15 Ağustos 2026',
    city: 'Ankara'
  },
  {
    id: 'req-3',
    code: 'TLP-2026-9710',
    companyName: 'Akdeniz Perakende A.Ş.',
    requesterName: 'Caner Öztürk',
    requesterTitle: 'Operasyon Müdürü',
    requesterPhone: '+90 535 888 1144',
    requesterEmail: 'caner@akdenizperakende.com',
    trainingName: 'Kasiyer Müşteri Kriz Yönetimi & Kasa Hızı Ustalığı',
    category: 'Kasa Hattı',
    participantCount: 65,
    budget: 68000,
    proposedDate: '10 Eylül 2026',
    notes: 'Yaz sezonu yoğunluğunda kasa hattı bekleme sürelerini düşürmek hedeflenmektedir.',
    status: 'APPROVED',
    createdAt: '12 Ağustos 2026',
    city: 'Antalya'
  },
  {
    id: 'req-4',
    code: 'TLP-2026-9502',
    companyName: 'Bursa Taze Gıda Pazarlama',
    requesterName: 'Selin Aksoy',
    requesterTitle: 'İK Uzmanı',
    requesterPhone: '+90 530 111 2233',
    requesterEmail: 'selin@bursatazegida.com',
    trainingName: 'Mağaza İçi 5S Düzeni & Stok Sayım Audit Eğitimi',
    category: 'Stok Yönetimi',
    participantCount: 25,
    budget: 28000,
    proposedDate: '15 Eylül 2026',
    notes: 'Depo ve reyon düzeni standartlaştırma çalışması.',
    status: 'APPROVED',
    createdAt: '10 Ağustos 2026',
    city: 'Bursa'
  },
  {
    id: 'req-5',
    code: 'TLP-2026-9320',
    companyName: 'Ege Gross Perakende',
    requesterName: 'Hakan Yılmaz',
    requesterTitle: 'Genel Müdür Yrd.',
    requesterPhone: '+90 532 999 8877',
    requesterEmail: 'hakan@egegross.com',
    trainingName: 'E-Ticaret Omni-Channel Operasyon Liderliği',
    category: 'Dijital Dönüşüm',
    participantCount: 12,
    budget: 35000,
    proposedDate: '20 Eylül 2026',
    notes: 'Online sipariş hazırlama ve hızlı kurye teslimat entegrasyonu.',
    status: 'REJECTED',
    createdAt: '08 Ağustos 2026',
    city: 'İzmir'
  }
];

export default function TrainingRequestsPage() {
  const [requests, setRequests] = useState<TrainingRequest[]>(INITIAL_REQUESTS);
  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedRequest, setSelectedRequest] = useState<TrainingRequest | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // New Request Form State
  const [newForm, setNewForm] = useState({
    companyName: '',
    requesterName: '',
    requesterTitle: '',
    requesterPhone: '',
    requesterEmail: '',
    trainingName: 'Taze Gıda Kategori & Hijyen Standartları Eğitimi',
    category: 'Saha Operasyonu',
    participantCount: 20,
    budget: 30000,
    proposedDate: '2026-09-15',
    city: 'İstanbul',
    notes: ''
  });

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'APPROVED' } : r))
    );
    alert('Eğitim talebi başarıyla onaylandı ve LMS sisteminde kuruma tanımlandı.');
  };

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'REJECTED' } : r))
    );
    alert('Eğitim talebi reddedildi ve gerekçe ilgili kuruma bildirildi.');
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: TrainingRequest = {
      id: `req-${Date.now()}`,
      code: `TLP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      companyName: newForm.companyName || 'Kurumsal Müşteri A.Ş.',
      requesterName: newForm.requesterName || 'Yetkili İK Uzmanı',
      requesterTitle: newForm.requesterTitle || 'İnsan Kaynakları Müdürü',
      requesterPhone: newForm.requesterPhone || '+90 532 000 0000',
      requesterEmail: newForm.requesterEmail || 'ik@kurum.com',
      trainingName: newForm.trainingName,
      category: newForm.category,
      participantCount: Number(newForm.participantCount) || 20,
      budget: Number(newForm.budget) || 30000,
      proposedDate: newForm.proposedDate,
      notes: newForm.notes || 'Manuel admin talebi oluşturuldu.',
      status: 'PENDING',
      createdAt: 'Bugün',
      city: newForm.city || 'İstanbul'
    };

    setRequests([newReq, ...requests]);
    setIsNewModalOpen(false);
    alert('Yeni Manuel Eğitim Talebi başarıyla oluşturuldu.');
  };

  const filteredRequests = requests.filter((r) => {
    const matchesTab = activeTab === 'ALL' || r.status === activeTab;
    const matchesSearch =
      r.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.requesterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.trainingName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || r.category === selectedCategory;
    return matchesTab && matchesSearch && matchesCategory;
  });

  const pendingCount = requests.filter((r) => r.status === 'PENDING').length;
  const approvedCount = requests.filter((r) => r.status === 'APPROVED').length;
  const rejectedCount = requests.filter((r) => r.status === 'REJECTED').length;
  const totalBudget = requests.reduce((acc, curr) => acc + curr.budget, 0);

  return (
    <div className="min-h-screen bg-[#061B33] text-white p-6 font-sans space-y-6">
      
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-amber-300 font-semibold mb-1">
            <Link href="/admin" className="hover:underline flex items-center space-x-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Admin Paneli</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
            <span>Kurumsal Eğitim Talepleri</span>
          </div>
          <h1 className="text-2xl font-black text-white flex items-center space-x-2.5">
            <Inbox className="h-7 w-7 text-amber-400" />
            <span>Eğitim Talepleri &amp; Kurumsal Onay Merkezi</span>
          </h1>
          <p className="text-xs text-gray-300 mt-0.5">
            Kurumların perakende eğitimi başvurularını inceleyin, onaylayın veya teklif detaylarını yönetin.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-2 shadow-lg cursor-pointer transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>+ Manuel Eğitim Talebi Ekle</span>
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-[#0B2A4A] rounded-2xl border border-amber-400/30 space-y-1 shadow-md">
          <div className="flex justify-between items-center text-gray-300">
            <span>Aksiyon Bekleyen Talepler</span>
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300">{pendingCount} Talep</div>
          <p className="text-[10px] text-amber-300/80 font-mono">İnceleme Süresi: Ort. 4.2 Saat</p>
        </div>

        <div className="p-4 bg-[#0B2A4A] rounded-2xl border border-emerald-500/30 space-y-1 shadow-md">
          <div className="flex justify-between items-center text-gray-300">
            <span>Onaylanan Eğitimler</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{approvedCount} Eğitim</div>
          <p className="text-[10px] text-emerald-300/80 font-mono">Aktif Katılımcı: 108 Personel</p>
        </div>

        <div className="p-4 bg-[#0B2A4A] rounded-2xl border border-rose-500/30 space-y-1 shadow-md">
          <div className="flex justify-between items-center text-gray-300">
            <span>Reddedilen / Revize Talepler</span>
            <XCircle className="h-4 w-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400">{rejectedCount} Talep</div>
          <p className="text-[10px] text-rose-300/80 font-mono">Revizyon İstenebilir</p>
        </div>

        <div className="p-4 bg-[#0B2A4A] rounded-2xl border border-cyan-500/30 space-y-1 shadow-md">
          <div className="flex justify-between items-center text-gray-300">
            <span>Toplam Talep Bütçe Hacmi</span>
            <DollarSign className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-300">₺{totalBudget.toLocaleString('tr-TR')}</div>
          <p className="text-[10px] text-cyan-300/80 font-mono">Kurumsal Eğitim Bütçesi</p>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        
        {/* Status Tabs */}
        <div className="flex items-center space-x-1.5 bg-[#061B33] p-1.5 rounded-xl border border-white/10 overflow-x-auto w-full md:w-auto">
          {[
            { id: 'ALL', name: `Tüm Talepler (${requests.length})` },
            { id: 'PENDING', name: `Bekleyenler (${pendingCount})` },
            { id: 'APPROVED', name: `Onaylananlar (${approvedCount})` },
            { id: 'REJECTED', name: `Reddedilenler (${rejectedCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Search & Category Filter */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Kurum, kişi veya eğitim ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#061B33] border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#061B33] border border-white/15 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-amber-400"
          >
            <option value="ALL">Tüm Kategoriler</option>
            <option value="Saha Operasyonu">Saha Operasyonu</option>
            <option value="Yönetici Gelişimi">Yönetici Gelişimi</option>
            <option value="Kasa Hattı">Kasa Hattı</option>
            <option value="Stok Yönetimi">Stok Yönetimi</option>
            <option value="Dijital Dönüşüm">Dijital Dönüşüm</option>
          </select>
        </div>
      </div>

      {/* REQUESTS TABLE */}
      <div className="bg-[#0B2A4A] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#061B33] text-gray-300 border-b border-white/10 font-bold">
                <th className="p-4">Talep Kodu &amp; Kurum</th>
                <th className="p-4">Talep Eden Yetkili</th>
                <th className="p-4">Talep Edilen Eğitim &amp; Kategori</th>
                <th className="p-4 text-center">Katılımcı Sayısı</th>
                <th className="p-4 text-center">Bütçe &amp; Tarih</th>
                <th className="p-4 text-center">Durum</th>
                <th className="p-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400 font-semibold">
                    Arama kriterlerinize uygun eğitim talebi bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 space-y-1">
                      <span className="font-mono text-[10px] font-bold text-amber-300 block">{req.code}</span>
                      <div className="font-bold text-white text-sm flex items-center space-x-1.5">
                        <Building2 className="h-4 w-4 text-cyan-400 shrink-0" />
                        <span>{req.companyName}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 block">{req.city}</span>
                    </td>

                    <td className="p-4 space-y-0.5">
                      <div className="font-bold text-white">{req.requesterName}</div>
                      <div className="text-gray-300 text-[11px]">{req.requesterTitle}</div>
                      <div className="text-gray-400 text-[10px] font-mono">{req.requesterPhone}</div>
                    </td>

                    <td className="p-4 space-y-1 max-w-xs">
                      <div className="font-bold text-white leading-snug">{req.trainingName}</div>
                      <span className="px-2 py-0.5 bg-white/10 text-cyan-300 rounded font-mono text-[9px] font-bold">
                        {req.category}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <span className="px-3 py-1 bg-[#061B33] border border-white/10 rounded-xl text-white font-bold font-mono">
                        {req.participantCount} Personel
                      </span>
                    </td>

                    <td className="p-4 text-center space-y-0.5">
                      <div className="font-black text-emerald-400 text-sm">₺{req.budget.toLocaleString('tr-TR')}</div>
                      <div className="text-gray-400 text-[10px] font-mono">{req.proposedDate}</div>
                    </td>

                    <td className="p-4 text-center">
                      {req.status === 'PENDING' && (
                        <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-[10px] font-black inline-flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>BEKLEYEN</span>
                        </span>
                      )}
                      {req.status === 'APPROVED' && (
                        <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-[10px] font-black inline-flex items-center space-x-1">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>ONAYLANDI</span>
                        </span>
                      )}
                      {req.status === 'REJECTED' && (
                        <span className="px-2.5 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-lg text-[10px] font-black inline-flex items-center space-x-1">
                          <XCircle className="h-3 w-3" />
                          <span>REDDEDİLDİ</span>
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold text-[11px] inline-flex items-center space-x-1 cursor-pointer transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Detay</span>
                      </button>

                      {req.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleApprove(req.id)}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] inline-flex items-center space-x-1 cursor-pointer transition-colors shadow-md"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>Onayla</span>
                          </button>

                          <button
                            onClick={() => handleReject(req.id)}
                            className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-[11px] inline-flex items-center space-x-1 cursor-pointer transition-colors shadow-md"
                          >
                            <X className="h-3.5 w-3.5" />
                            <span>Reddet</span>
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B2A4A] border border-amber-400/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 text-white shadow-2xl animate-in fade-in duration-200">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-mono text-xs text-amber-300 font-bold">{selectedRequest.code}</span>
                  <h3 className="font-bold text-lg text-white">{selectedRequest.companyName}</h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1.5 text-gray-400 hover:text-white rounded-xl font-bold cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-2">
                <div className="font-bold text-amber-300 text-sm">{selectedRequest.trainingName}</div>
                <div className="text-gray-300">{selectedRequest.notes}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-[#061B33] rounded-xl border border-white/10 space-y-1">
                  <span className="text-gray-400 block text-[10px]">Talep Eden Yetkili</span>
                  <div className="font-bold text-white">{selectedRequest.requesterName}</div>
                  <div className="text-gray-300">{selectedRequest.requesterTitle}</div>
                  <div className="text-cyan-300 font-mono">{selectedRequest.requesterEmail}</div>
                </div>

                <div className="p-3 bg-[#061B33] rounded-xl border border-white/10 space-y-1">
                  <span className="text-gray-400 block text-[10px]">Bütçe &amp; Katılımcı</span>
                  <div className="font-black text-emerald-400 text-base">₺{selectedRequest.budget.toLocaleString('tr-TR')}</div>
                  <div className="text-gray-300">{selectedRequest.participantCount} Personel</div>
                  <div className="text-amber-300 font-mono">Tarih: {selectedRequest.proposedDate}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-3 border-t border-white/10 text-xs">
              {selectedRequest.status === 'PENDING' && (
                <>
                  <button
                    onClick={() => {
                      handleApprove(selectedRequest.id);
                      setSelectedRequest(null);
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl cursor-pointer"
                  >
                    Talebi Onayla
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedRequest.id);
                      setSelectedRequest(null);
                    }}
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl cursor-pointer"
                  >
                    Talebi Reddet
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl cursor-pointer"
              >
                Kapat
              </button>
            </div>

          </div>
        </div>
      )}

      {/* NEW REQUEST MANUALLY MODAL */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B2A4A] border border-amber-400/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 text-white shadow-2xl animate-in fade-in duration-200">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-black text-lg text-amber-300 flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Yeni Manuel Eğitim Talebi Oluştur</span>
              </h3>
              <button onClick={() => setIsNewModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-300 mb-1">Kurum / Şirket Adı:</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Migros Ticaret A.Ş."
                  value={newForm.companyName}
                  onChange={(e) => setNewForm({ ...newForm, companyName: e.target.value })}
                  className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-300 mb-1">Yetkili Ad Soyad:</label>
                  <input
                    type="text"
                    required
                    placeholder="Mehmet Yılmaz"
                    value={newForm.requesterName}
                    onChange={(e) => setNewForm({ ...newForm, requesterName: e.target.value })}
                    className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-300 mb-1">E-posta:</label>
                  <input
                    type="email"
                    required
                    placeholder="mehmet@kurum.com"
                    value={newForm.requesterEmail}
                    onChange={(e) => setNewForm({ ...newForm, requesterEmail: e.target.value })}
                    className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">Talep Edilen Eğitim Programı:</label>
                <input
                  type="text"
                  required
                  value={newForm.trainingName}
                  onChange={(e) => setNewForm({ ...newForm, trainingName: e.target.value })}
                  className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-300 mb-1">Katılımcı Sayısı:</label>
                  <input
                    type="number"
                    required
                    value={newForm.participantCount}
                    onChange={(e) => setNewForm({ ...newForm, participantCount: Number(e.target.value) })}
                    className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-300 mb-1">Bütçe (TL):</label>
                  <input
                    type="number"
                    required
                    value={newForm.budget}
                    onChange={(e) => setNewForm({ ...newForm, budget: Number(e.target.value) })}
                    className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">Açıklama &amp; Notlar:</label>
                <textarea
                  rows={2}
                  value={newForm.notes}
                  onChange={(e) => setNewForm({ ...newForm, notes: e.target.value })}
                  className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl cursor-pointer"
                >
                  Talebi Kaydet
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
