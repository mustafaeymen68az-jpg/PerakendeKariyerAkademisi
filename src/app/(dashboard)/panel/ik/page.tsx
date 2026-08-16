'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TalentMatrix9Box from '@/components/TalentMatrix9Box';
import TalentPoolModule from '@/components/TalentPoolModule';
import TurnoverRiskModule from '@/components/TurnoverRiskModule';
import PromotionReadinessModule from '@/components/PromotionReadinessModule';
import SuccessionPlanModule from '@/components/SuccessionPlanModule';
import {
  Users,
  Building2,
  FileSpreadsheet,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  ShieldAlert,
  Award,
  ChevronRight,
  Sparkles,
  Layers,
  UserCheck,
  Briefcase,
  Upload,
  Download,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Settings
} from 'lucide-react';

export default function HRDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'summary' | 'org' | 'employees' | 'competencies' | 'talent' | 'promotion' | '9box' | 'critical' | 'succession' | 'turnover' | 'reports' | 'settings'
  >('summary');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('Tümü');
  const [selectedEmpDetail, setSelectedEmpDetail] = useState<any>(null);

  // Sample Data for Employees Tab
  const SAMPLE_EMPLOYEES = [
    { id: '101', name: 'Selin Yılmaz', title: 'Mağaza Müdür Yardımcısı', branch: 'Kadıköy Şubesi', score: 96, tenure: '3 Yıl 8 Ay', status: 'Terfiye Hazır' },
    { id: '102', name: 'Ahmet Can Demir', title: 'Kasiyer & Reyon Şefi', branch: 'Beşiktaş Şubesi', score: 94, tenure: '2 Yıl 4 Ay', status: 'Terfiye Hazır' },
    { id: '103', name: 'Merve Şahin', title: 'Taze Gıda Şefi', branch: 'Alsancak Şubesi', score: 92, tenure: '2 Yıl 1 Ay', status: 'Terfiye Hazır' },
    { id: '104', name: 'Caner Kaya', title: 'Mağaza Müdürü', branch: 'Tunalı Şubesi', score: 95, tenure: '4 Yıl 6 Ay', status: 'Bölge Müdürü Adayı' },
    { id: '105', name: 'Zeynep Arslan', title: 'Reyon Görevlisi', branch: 'Nilüfer Şubesi', score: 84, tenure: '1 Yıl 3 Ay', status: 'Gelişim Sürecinde' },
    { id: '106', name: 'Burak Çelik', title: 'Lojistik & Depo Sorumlusu', branch: 'Muratpaşa Şubesi', score: 86, tenure: '1 Yıl 9 Ay', status: 'Gelişim Sürecinde' },
  ];

  // Sample Data for Critical Positions
  const CRITICAL_POSITIONS = [
    { id: 'CP-1', position: 'Kategori Müdürü (Taze Gıda)', currentHolder: 'Mehmet Yılmaz', riskLevel: 'YÜKSEK', riskReason: 'Rakip Şirket Teklifi', successor: 'Merve Şahin (%92 Hazır)' },
    { id: 'CP-2', position: 'Kadıköy Mağaza Müdürü', currentHolder: 'Sertan Kılıç', riskLevel: 'ORTA', riskReason: 'Emeklilik / İç Geçiş', successor: 'Selin Yılmaz (%96 Hazır)' },
    { id: 'CP-3', position: 'Bölge Lojistik Müdürü', currentHolder: 'Ayhan Öztürk', riskLevel: 'DÜŞÜK', riskReason: 'Planlı Rotasyon', successor: 'Burak Çelik (%86 Hazır)' },
  ];

  return (
    <div className="min-h-screen bg-[#061B33] text-white flex flex-col font-sans">
      {/* Top Header Bar */}
      <div className="bg-[#0B2A4A] border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white shadow-md">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">İnsan Kaynakları & Yetenek Yönetimi Portalı</h1>
              <p className="text-xs text-gray-300">PKA TALENT • 9-Box Matrisi, Terfi Komitesi ve Yedekleme Planı</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => alert('Excel dosyanız aktarıldı: 120 çalışan verisi sisteme yüklendi.')}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md cursor-pointer"
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>Excel İle Çalışan Yükle</span>
            </button>
            <Link href="/" className="text-xs text-gray-400 hover:text-white px-2 py-1">
              Ana Siteye Dön
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* HR SIDEBAR NAVIGATION */}
        <div className="lg:col-span-1 space-y-1 bg-[#0B2A4A] p-3 rounded-2xl border border-white/10 h-fit text-xs font-bold">
          <div className="px-3 py-2 text-[10px] font-black text-emerald-400 uppercase tracking-wider">
            İK Navigasyonu
          </div>

          {[
            { id: 'summary', name: 'Yönetici Özeti', icon: BarChart3 },
            { id: 'org', name: 'Organizasyon Şeması', icon: Building2 },
            { id: 'employees', name: 'Çalışan Listesi', icon: Users },
            { id: 'competencies', name: 'Yetkinlik Matrisi', icon: Layers },
            { id: 'talent', name: 'Yetenek Havuzu', icon: Briefcase },
            { id: 'promotion', name: 'Terfi Yönetimi', icon: Award },
            { id: '9box', name: '9 Box Matrisi', icon: Sparkles },
            { id: 'critical', name: 'Kritik Pozisyonlar', icon: ShieldAlert },
            { id: 'succession', name: 'Yedekleme Planı', icon: UserCheck },
            { id: 'turnover', name: 'Çalışan Kaybetme Riski', icon: TrendingUp },
            { id: 'reports', name: 'Raporlar (PDF/Excel)', icon: Download },
            { id: 'settings', name: 'Sistem Ayarları', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === item.id ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* HR CONTENT AREA */}
        <div className="lg:col-span-4 space-y-6">
          
          {activeTab === 'summary' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10">
                  <div className="text-xs text-gray-400 font-bold">Toplam Çalışan</div>
                  <div className="text-3xl font-black text-white">1.240</div>
                  <div className="text-[10px] text-gray-400 mt-1">26 Kadro Pozisyonu</div>
                </div>
                <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-emerald-500/40">
                  <div className="text-xs text-gray-400 font-bold">Terfiye Hazır Aday</div>
                  <div className="text-3xl font-black text-emerald-400">42 Kişi</div>
                  <div className="text-[10px] text-emerald-300 mt-1">%80+ Terfi Skoru</div>
                </div>
                <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10">
                  <div className="text-xs text-gray-400 font-bold">Yedekli Kritik Pozisyon</div>
                  <div className="text-3xl font-black text-cyan-400">%76.2</div>
                  <div className="text-[10px] text-gray-400 mt-1">63 / 82 Pozisyon</div>
                </div>
                <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-rose-500/40">
                  <div className="text-xs text-gray-400 font-bold">Çalışan Kaybetme Riski</div>
                  <div className="text-3xl font-black text-rose-400">14 Kişi</div>
                  <div className="text-[10px] text-rose-300 mt-1">Karar Destek Uyarısı</div>
                </div>
              </div>

              {/* Live 9 Box Matrix Module Component */}
              <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10">
                <TalentMatrix9Box />
              </div>
            </div>
          )}

          {/* ORGANİZASYON ŞEMASI TABI */}
          {activeTab === 'org' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white">Kurumsal Organizasyon Hiyerarşisi</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-[#061B33] rounded-2xl border border-emerald-500/30 space-y-2">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">Marmara Bölge Müdürlüğü</span>
                  <h3 className="font-bold text-white text-sm">48 Mağaza • 620 Çalışan</h3>
                  <p className="text-gray-400">Bölge Müdürü: Caner Kaya</p>
                  <span className="inline-block px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] rounded font-bold">Kadro Doluluk: %98</span>
                </div>

                <div className="p-4 bg-[#061B33] rounded-2xl border border-cyan-500/30 space-y-2">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase">Ege Bölge Müdürlüğü</span>
                  <h3 className="font-bold text-white text-sm">32 Mağaza • 410 Çalışan</h3>
                  <p className="text-gray-400">Bölge Müdürü: Murat Aydın</p>
                  <span className="inline-block px-2.5 py-1 bg-cyan-500/20 text-cyan-300 text-[10px] rounded font-bold">Kadro Doluluk: %95</span>
                </div>

                <div className="p-4 bg-[#061B33] rounded-2xl border border-amber-500/30 space-y-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase">İç Anadolu Bölge Müdürlüğü</span>
                  <h3 className="font-bold text-white text-sm">24 Mağaza • 210 Çalışan</h3>
                  <p className="text-gray-400">Bölge Müdürü: Aylin Koç</p>
                  <span className="inline-block px-2.5 py-1 bg-amber-500/20 text-amber-300 text-[10px] rounded font-bold">Kadro Doluluk: %92</span>
                </div>
              </div>
            </div>
          )}

          {/* ÇALIŞAN LİSTESİ TABI */}
          {activeTab === 'employees' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Çalışan Listesi & Kariyer Karneleri</h2>
                <div className="relative">
                  <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="İsim veya şube ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-[#061B33] border border-white/15 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#061B33] text-gray-300 border-b border-white/10">
                      <th className="p-3">Ad Soyad</th>
                      <th className="p-3">Unvan / Pozisyon</th>
                      <th className="p-3">Şube</th>
                      <th className="p-3">Kıdem</th>
                      <th className="p-3 text-center">Yetkinlik Skoru</th>
                      <th className="p-3 text-center">Durum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {SAMPLE_EMPLOYEES.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.branch.toLowerCase().includes(searchQuery.toLowerCase())).map((emp) => (
                      <tr key={emp.id} className="hover:bg-white/5 cursor-pointer" onClick={() => setSelectedEmpDetail(emp)}>
                        <td className="p-3 font-bold text-white">{emp.name}</td>
                        <td className="p-3 text-gray-300">{emp.title}</td>
                        <td className="p-3 text-gray-400">{emp.branch}</td>
                        <td className="p-3 text-gray-400">{emp.tenure}</td>
                        <td className="p-3 text-center font-bold text-emerald-400">%{emp.score}</td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-bold">
                            {emp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* YETKİNLİK MATRİSİ TABI */}
          {activeTab === 'competencies' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white">26 Pozisyon Yetkinlik Standartları</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-2">
                  <div className="font-bold text-cyan-300">Kasiyer / Reyon Görevlisi Yetkinlikleri</div>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Kasa Açılış-Kapanış & Z-Raporu (%90 Beklenti)</li>
                    <li>• 5S Raf Düzeni & STT Etiket Kontrolü (%85 Beklenti)</li>
                    <li>• Müşteri Karşılama ve Çapraz Satış (%80 Beklenti)</li>
                  </ul>
                </div>

                <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-2">
                  <div className="font-bold text-emerald-300">Mağaza Müdürü Yetkinlikleri</div>
                  <ul className="space-y-1 text-gray-300">
                    <li>• P&L Bütçe Yönetimi & Ciro Hedefi (%95 Beklenti)</li>
                    <li>• Fire Minimizasyonu ve Stok Devir Hızı (%90 Beklenti)</li>
                    <li>• Ekip Liderliği & Yedek Yönetici Yetiştirme (%90 Beklenti)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === '9box' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10">
              <TalentMatrix9Box />
            </div>
          )}

          {activeTab === 'talent' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10">
              <TalentPoolModule />
            </div>
          )}

          {/* KRİTİK POZİSYONLAR TABI */}
          {activeTab === 'critical' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white">Kritik Pozisyon Risk & Yedekleme Durumu</h2>
              <div className="space-y-3 text-xs">
                {CRITICAL_POSITIONS.map((cp) => (
                  <div key={cp.id} className="p-4 bg-[#061B33] rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-sm">{cp.position}</div>
                      <div className="text-gray-400 mt-0.5">Mevcut Yönetici: {cp.currentHolder} • Risk Nedeni: {cp.riskReason}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-black ${cp.riskLevel === 'YÜKSEK' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                        RİSK: {cp.riskLevel}
                      </span>
                      <div className="text-emerald-400 font-bold text-[11px]">Yedek: {cp.successor}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'turnover' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10">
              <TurnoverRiskModule />
            </div>
          )}

          {activeTab === 'promotion' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10">
              <PromotionReadinessModule />
            </div>
          )}

          {activeTab === 'succession' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10">
              <SuccessionPlanModule />
            </div>
          )}

          {/* RAPORLAR TABI */}
          {activeTab === 'reports' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white">İnsan Kaynakları PDF & Excel Rapor Merkezi</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Aylık Terfi Komitesi Karnesi (PDF)</div>
                    <div className="text-gray-400">42 Terfiye Hazır Personel Dökümü</div>
                  </div>
                  <button onClick={() => alert('PDF Raporu bilgisayarınıza indirildi.')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg cursor-pointer">
                    İndir (PDF)
                  </button>
                </div>

                <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Tüm Şirket Yetkinlik Skorları (Excel)</div>
                    <div className="text-gray-400">1.240 Çalışanın Ham Veri Listesi</div>
                  </div>
                  <button onClick={() => alert('Excel Dosyası indirildi.')} className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg cursor-pointer">
                    İndir (XLSX)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SİSTEM AYARLARI TABI */}
          {activeTab === 'settings' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6 text-xs">
              <h2 className="text-xl font-bold text-white">Açıklanabilir Terfi Skoru Ağırlık Yapılandırması</h2>
              <div className="space-y-4 max-w-md bg-[#061B33] p-4 rounded-2xl border border-white/10">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Eğitim Tamamlama Ağırlığı (%20)</label>
                  <input type="range" min="10" max="40" defaultValue="20" className="w-full accent-emerald-500" />
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Sınav Notu Ağırlığı (%20)</label>
                  <input type="range" min="10" max="40" defaultValue="20" className="w-full accent-emerald-500" />
                </div>
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Saha Görevi Kanıt Ağırlığı (%25)</label>
                  <input type="range" min="10" max="40" defaultValue="25" className="w-full accent-emerald-500" />
                </div>
                <button onClick={() => alert('Ağırlık parametreleri kaydedildi.')} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl cursor-pointer">
                  Parametreleri Kaydet
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
