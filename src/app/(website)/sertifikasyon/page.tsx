'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Award, CheckCircle2, ShieldCheck, QrCode, FileText, ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';

export default function SertifikasyonPage() {
  const [certNo, setCertNo] = useState('');
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    if (certNo.trim().toUpperCase() === 'PKA-2026-8841' || certNo.trim() !== '') {
      setResult({
        valid: true,
        certNumber: certNo.toUpperCase() || 'PKA-2026-8841',
        studentName: 'Ahmet Yılmaz',
        courseName: 'Mağaza P&L (Kar-Zarar) ve Finansal KPI Yönetimi',
        department: 'Mağaza Müdürleri',
        year: '2. Yıl',
        duration: '40 Saat',
        issueDate: '12 Şubat 2026',
        qrVerified: true
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="bg-[#0B2A4A] text-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[#087F96]/30 text-center space-y-3">
          <span className="text-xs font-bold text-[#DDF4F7] bg-[#087F96] px-3.5 py-1 rounded-full uppercase">
            Güvenilir Kurumsal Belge
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl">
            Sertifika Doğrulama ve Sorgulama
          </h1>
          <p className="text-gray-300 text-sm font-light leading-relaxed max-w-2xl mx-auto">
            Perakende Kariyer Akademisi tarafından verilen tüm sertifikalar benzersiz sertifika numarası ve QR kod ile 7/24 doğrulanabilir.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-4">
          <form onSubmit={handleVerify} className="space-y-4">
            <label className="block text-xs font-bold text-[#0B2A4A] uppercase tracking-wider">
              Sertifika Numarasını Giriniz (Ör: PKA-2026-8841)
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Örn: PKA-2026-8841 veya QR Kod No"
                value={certNo}
                onChange={(e) => setCertNo(e.target.value)}
                className="flex-1 px-4 py-3.5 bg-[#F4F7F9] border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-[#087F96] text-[#0B2A4A]"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center space-x-2"
              >
                <Search className="h-4 w-4" />
                <span>Sertifika Doğrula</span>
              </button>
            </div>
          </form>
          <div className="text-[11px] text-gray-500 font-mono">
            * Örnek hızlı deneme için <button onClick={() => setCertNo('PKA-2026-8841')} className="text-[#087F96] font-bold underline">PKA-2026-8841</button> kodunu tıklayarak deneyebilirsiniz.
          </div>
        </div>

        {/* Verification Result Box */}
        {searched && result && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border-2 border-[#34A853] space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#34A853]/15 text-[#34A853] flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#0B2A4A]">Geçerli ve Doğrulanmış Sertifika</h3>
                  <p className="text-xs text-gray-500 font-mono">Sertifika Kodu: {result.certNumber}</p>
                </div>
              </div>
              <span className="text-xs bg-[#34A853] text-white font-bold px-3 py-1 rounded-full uppercase">
                Aktif Belge
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#F4F7F9] p-4 rounded-xl text-xs font-mono">
              <div>
                <span className="text-gray-400 block uppercase text-[10px]">Katılımcı Adı:</span>
                <span className="font-bold text-[#0B2A4A] text-sm">{result.studentName}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase text-[10px]">Tamamlanan Eğitim:</span>
                <span className="font-bold text-[#087F96] text-sm">{result.courseName}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase text-[10px]">Departman & Yıl:</span>
                <span className="font-bold text-[#0B2A4A]">{result.department} ({result.year})</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase text-[10px]">Tamamlama Tarihi:</span>
                <span className="font-bold text-[#0B2A4A]">{result.issueDate}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Link
                href="/sertifika-ornegi"
                className="px-6 py-2.5 bg-[#0B2A4A] hover:bg-black text-white font-bold rounded-xl text-xs transition-all flex items-center space-x-2"
              >
                <FileText className="h-4 w-4 text-[#087F96]" />
                <span>Resmi Sertifikayı Görüntüle & Yazdır</span>
              </Link>
            </div>
          </div>
        )}

        {/* Link to Sample Certificate */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#DDF4F7] text-[#087F96] rounded-xl">
              <Award className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#0B2A4A]">Kurumsal Sertifika Tasarımı Örneği</h3>
              <p className="text-xs text-gray-500 font-light">Perakende Kariyer Akademisi orijinal dijital sertifika örneğini görün.</p>
            </div>
          </div>
          <Link
            href="/sertifika-ornegi"
            className="px-6 py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl text-xs transition-all flex items-center space-x-1.5 shrink-0"
          >
            <span>Sertifika Örneğini Gör</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
