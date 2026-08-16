'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileSpreadsheet,
  Upload,
  Download,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ArrowLeft,
  ChevronRight,
  RefreshCw,
  Database,
  Users,
  Award,
  TrendingUp,
  Inbox,
  Check,
  X,
  Sparkles
} from 'lucide-react';

interface PreviewRow {
  id: number;
  name: string;
  email: string;
  store: string;
  position: string;
  score: number;
  status: 'VALID' | 'WARNING';
  note?: string;
}

const SAMPLE_PARSED_ROWS: PreviewRow[] = [
  { id: 1, name: 'Selin Yılmaz', email: 'selin.yilmaz@sayarmarket.com', store: 'Kadıköy Premium', position: 'Müdür Yardımcısı', score: 96, status: 'VALID' },
  { id: 2, name: 'Ahmet Can Demir', email: 'ahmet.can@besiktas.com', store: 'Beşiktaş Çarşı', position: 'Kasiyer Şefi', score: 94, status: 'VALID' },
  { id: 3, name: 'Caner Kaya', email: 'caner.kaya@tunali.com', store: 'Tunalı Hilmi', position: 'Mağaza Müdürü', score: 95, status: 'VALID' },
  { id: 4, name: 'Merve Şahin', email: 'merve.sahin@sayarmarket.com', store: 'Alsancak Şubesi', position: 'Taze Gıda Şefi', score: 92, status: 'VALID' },
  { id: 5, name: 'Burak Tan', email: 'burak.tan_invalid_email', store: 'Kadıköy Premium', position: 'Reyon Görevlisi', score: 78, status: 'WARNING', note: 'Geçersiz E-posta Formatı' }
];

export default function ExcelImportExportPage() {
  const [selectedFileType, setSelectedFileType] = useState('EMPLOYEES');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isParsed, setIsParsed] = useState(false);
  const [parsedRows, setParsedRows] = useState<PreviewRow[]>(SAMPLE_PARSED_ROWS);

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsParsed(true);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const handleCommitImport = () => {
    alert('Toplu Excel verileri veritabanına başarıyla aktarıldı! (5 Kayıt güncellendi).');
    setIsParsed(false);
    setUploadProgress(0);
  };

  const handleDownloadExport = (type: string) => {
    // Generate simulated CSV file download
    let csvContent = 'data:text/csv;charset=utf-8,';
    if (type === 'EMPLOYEES') {
      csvContent += 'Ad Soyad,E-Posta,Mağaza,Unvan,Terfi Skoru\n';
      csvContent += 'Selin Yılmaz,selin@sayarmarket.com,Kadıköy Premium,Müdür Yrd.,96\n';
      csvContent += 'Ahmet Can Demir,ahmet@besiktas.com,Beşiktaş Çarşı,Kasa Şefi,94\n';
      csvContent += 'Caner Kaya,caner@tunali.com,Tunalı Hilmi,Mağaza Müdürü,95\n';
    } else {
      csvContent += 'Sertifika Kodu,Ad Soyad,Eğitim Adı,Tarih\n';
      csvContent += 'PKA-2025-9841,Selin Yılmaz,P&L Mağaza Bütçe Yönetimi,14.05.2025\n';
      csvContent += 'PKA-2025-3312,Ahmet Can Demir,Kasa Sistemleri Mutabakatı,20.01.2025\n';
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PKA_${type}_Export_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert(`PKA_${type}_Export_2026.csv bilgisayarınıza başarıyla indirildi.`);
  };

  return (
    <div className="min-h-screen bg-[#061B33] text-white p-6 font-sans space-y-6">
      
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-amber-300 font-semibold mb-1">
            <Link href="/admin" className="hover:underline flex items-center space-x-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Admin Paneli</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
            <span>Excel &amp; CSV Aktarım Merkezi</span>
          </div>
          <h1 className="text-2xl font-black text-white flex items-center space-x-2.5">
            <FileSpreadsheet className="h-7 w-7 text-emerald-400" />
            <span>Excel / CSV Toplu Veri Aktarım &amp; İçe/Dışa Transfer</span>
          </h1>
          <p className="text-xs text-gray-300 mt-0.5">
            Çalışan listelerini, sınav notlarını ve sertifika veritabanını topluca içeri veya dışarı aktarın.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleDownloadExport('SAMPLE_TEMPLATE')}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 border border-white/15 cursor-pointer"
          >
            <Download className="h-4 w-4 text-cyan-300" />
            <span>Örnek Excel Şablonu İndir (.xlsx)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: EXCEL IMPORT (İÇE AKTARIM) */}
        <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-lg font-bold text-amber-300 flex items-center space-x-2">
              <Upload className="h-5 w-5 text-amber-400" />
              <span>Excel Verisi İçe Aktar (Import Data)</span>
            </h2>
            <span className="px-2.5 py-0.5 bg-amber-400/20 text-amber-300 rounded font-mono text-[10px] font-bold">
              .XLSX, .XLS, .CSV
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-gray-300 mb-1">Hedef Veri Tipi Seçin:</label>
              <select
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
                className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="EMPLOYEES">Çalışan &amp; Personel Listesi (.xlsx)</option>
                <option value="GRADES">Eğitim Notları &amp; Sınav Karneleri (.xlsx)</option>
                <option value="STORES">Şube &amp; Kadro Doluluk Verileri (.xlsx)</option>
                <option value="CERTIFICATES">Sertifika &amp; Rozet Kayıtları (.xlsx)</option>
              </select>
            </div>

            {/* DRAG & DROP ZONE */}
            <div
              onClick={handleSimulateUpload}
              className="p-8 border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 bg-[#061B33] rounded-2xl text-center cursor-pointer transition-all hover:bg-[#082240] space-y-3 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">
                  Excel veya CSV Dosyanızı Buraya Sürükleyin ya da Seçin
                </div>
                <p className="text-gray-400 text-[11px] mt-1">
                  Maksimum dosya boyutu: 15 MB • Otomatik sütun eşleştirme aktiftir.
                </p>
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md inline-flex items-center space-x-1.5"
              >
                <Upload className="h-4 w-4" />
                <span>Dosya Seç &amp; Yükle</span>
              </button>
            </div>

            {/* PROGRESS BAR */}
            {isUploading && (
              <div className="space-y-1.5 bg-[#061B33] p-4 rounded-xl border border-white/10">
                <div className="flex justify-between font-bold text-xs">
                  <span>Excel Ayrıştırılıyor...</span>
                  <span className="font-mono text-cyan-400">%{uploadProgress}</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: EXCEL EXPORT (DIŞA AKTARIM) */}
        <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-lg font-bold text-emerald-400 flex items-center space-x-2">
              <Download className="h-5 w-5 text-emerald-400" />
              <span>Veritabanı Excel Aktarımı (Export Data)</span>
            </h2>
            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-mono text-[10px] font-bold">
              CANLI VERİ İNDİR
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <p className="text-gray-300">
              Sistemdeki tüm canlı verileri tek tıkla Excel (`.xlsx`) veya `.csv` formatında bilgisayarınıza aktarabilirsiniz:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleDownloadExport('EMPLOYEES')}
                className="p-4 bg-[#061B33] hover:bg-[#082240] rounded-2xl border border-white/10 hover:border-emerald-400 text-left space-y-2 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between">
                  <Users className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] text-gray-400 font-mono">1.240 Kayıt</span>
                </div>
                <div className="font-bold text-white text-xs">Tüm Çalışan Listesini İndir</div>
                <p className="text-[10px] text-gray-400">Şube, unvan, kıdem ve iletişim verileri.</p>
              </button>

              <button
                onClick={() => handleDownloadExport('CERTIFICATES')}
                className="p-4 bg-[#061B33] hover:bg-[#082240] rounded-2xl border border-white/10 hover:border-purple-400 text-left space-y-2 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between">
                  <Award className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] text-gray-400 font-mono">842 Kayıt</span>
                </div>
                <div className="font-bold text-white text-xs">Sertifika &amp; QR Kayıtlarını İndir</div>
                <p className="text-[10px] text-gray-400">Doğrulanmış sertifika ve rozet verileri.</p>
              </button>

              <button
                onClick={() => handleDownloadExport('REQUESTS')}
                className="p-4 bg-[#061B33] hover:bg-[#082240] rounded-2xl border border-white/10 hover:border-amber-400 text-left space-y-2 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between">
                  <Inbox className="h-5 w-5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] text-gray-400 font-mono">166 Kayıt</span>
                </div>
                <div className="font-bold text-white text-xs">Eğitim Talepleri &amp; Bütçeleri İndir</div>
                <p className="text-[10px] text-gray-400">Kurumsal onay ve bütçe raporları.</p>
              </button>

              <button
                onClick={() => handleDownloadExport('KPI_SCORES')}
                className="p-4 bg-[#061B33] hover:bg-[#082240] rounded-2xl border border-white/10 hover:border-cyan-400 text-left space-y-2 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between">
                  <TrendingUp className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] text-gray-400 font-mono">10 KPI Matrisi</span>
                </div>
                <div className="font-bold text-white text-xs">KPI &amp; Terfi Skorlarını İndir</div>
                <p className="text-[10px] text-gray-400">Mağaza ve bölge bazlı skor özetleri.</p>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* PREVIEW & VALIDATION TABLE FOR IMPORTED EXCEL */}
      {isParsed && (
        <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-cyan-500/40 space-y-4 shadow-xl animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-3">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>Yüklenen Excel Önizleme &amp; Doğrulama Tablosu</span>
              </h3>
              <p className="text-xs text-gray-300 mt-0.5">
                Toplu aktarım öncesi yüklenen verileri kontrol edin. Yeşil satırlar hatasız, kırmızı satırlar revize gerektirir.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleCommitImport}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs shadow-lg cursor-pointer flex items-center space-x-2"
              >
                <Check className="h-4 w-4" />
                <span>Verileri Veritabanına Aktar (Import)</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#061B33] text-gray-300 border-b border-white/10 font-bold">
                  <th className="p-3">#</th>
                  <th className="p-3">Ad Soyad</th>
                  <th className="p-3">E-posta Adresi</th>
                  <th className="p-3">Mağaza / Şube</th>
                  <th className="p-3">Unvan</th>
                  <th className="p-3 text-center">Giriş Skoru</th>
                  <th className="p-3 text-center">Doğrulama Durumu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {parsedRows.map((row) => (
                  <tr key={row.id} className={row.status === 'WARNING' ? 'bg-rose-500/10' : 'hover:bg-white/5'}>
                    <td className="p-3 font-mono font-bold text-gray-400">{row.id}</td>
                    <td className="p-3 font-bold text-white">{row.name}</td>
                    <td className="p-3 font-mono text-gray-300">{row.email}</td>
                    <td className="p-3 text-gray-300">{row.store}</td>
                    <td className="p-3 text-gray-300">{row.position}</td>
                    <td className="p-3 text-center font-mono font-bold text-cyan-300">%{row.score}</td>
                    <td className="p-3 text-center">
                      {row.status === 'VALID' ? (
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded font-black text-[10px]">
                          GEÇERLİ VERİ
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded font-black text-[10px] flex items-center justify-center space-x-1">
                          <AlertTriangle className="h-3 w-3" />
                          <span>{row.note}</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
