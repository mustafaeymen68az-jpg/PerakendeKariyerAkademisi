'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { Award, ArrowLeft, Printer, ShieldCheck } from 'lucide-react';

export default function SertifikaOrnegiPage() {
  const certDetails = {
    participantName: 'Ahmet Çelik',
    courseTitle: 'Mağaza P&L (Kar-Zarar) ve Finansal KPI Yönetimi',
    department: 'Mağaza Müdürleri',
    duration: '40 Saat',
    completionDate: '12 Şubat 2026',
    certificateNo: 'PKA-2026-8841',
    qrVerificationUrl: 'https://www.perakendekariyer.com/sertifikasyon?no=PKA-2026-8841'
  };

  return (
    <div className="min-h-screen bg-[#061B33] py-12 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation & Print Top Bar */}
        <div className="flex items-center justify-between">
          <Link href="/sertifikasyon" className="inline-flex items-center text-xs font-bold text-[#DDF4F7] hover:underline space-x-1">
            <ArrowLeft className="h-4 w-4 text-[#087F96]" />
            <span>Sertifika Doğrulamaya Dön</span>
          </Link>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl text-xs shadow transition-all flex items-center space-x-1.5"
          >
            <Printer className="h-4 w-4" />
            <span>Sertifikayı Yazdır / PDF İndir</span>
          </button>
        </div>

        {/* Certificate Frame */}
        <div className="bg-white text-gray-900 rounded-3xl p-8 sm:p-14 shadow-2xl border-8 border-amber-400/80 relative space-y-8 print:p-6 print:border-4">
          {/* Decorative Corner Accents */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#0B2A4A]" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#0B2A4A]" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#0B2A4A]" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#0B2A4A]" />

          {/* Certificate Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Logo variant="light" size="lg" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black text-[#087F96] tracking-widest uppercase">PERAKENDE KARİYER AKADEMİSİ</span>
              <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#0B2A4A] tracking-tight">ÜSTÜN BAŞARI SERTİFİKASI</h1>
              <p className="text-xs text-gray-500 font-mono">Resmi Dijital Doğrulama Sertifikası</p>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="text-center space-y-6 max-w-2xl mx-auto py-4">
            <p className="text-xs sm:text-sm text-gray-600 font-light">
              Bu sertifika, aşağıda bilgileri yer alan katılımcının Perakende Kariyer Akademisi tarafından düzenlenen ileri düzey gelişim ve yetkinlik programını başarıyla tamamladığını belgelemektedir:
            </p>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0B2A4A] border-b-2 border-amber-400 inline-block pb-1">
                {certDetails.participantName}
              </h2>
              <p className="text-xs text-[#087F96] font-extrabold uppercase pt-2">{certDetails.department}</p>
            </div>

            <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-500">Tamamlanan Müfredat / Program:</span>
              <h3 className="font-extrabold text-base text-[#0B2A4A]">{certDetails.courseTitle}</h3>
              <p className="text-xs text-gray-600">Toplam Süre: {certDetails.duration}</p>
            </div>
          </div>

          {/* Footer & Seals */}
          <div className="pt-8 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-center">
            <div className="text-xs space-y-1">
              <div className="font-bold text-[#0B2A4A]">Tamamlama Tarihi</div>
              <div className="text-gray-600 font-mono">{certDetails.completionDate}</div>
            </div>

            {/* Medal / Seal */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-black flex items-center justify-center shadow-lg border-2 border-white">
                <Award className="h-8 w-8 text-[#0B2A4A]" />
              </div>
              <span className="text-[10px] font-black text-[#0B2A4A] mt-1 uppercase tracking-wider">PKA ONAYLI SERTİFİKA</span>
            </div>

            <div className="text-xs space-y-1">
              <div className="font-bold text-[#0B2A4A]">Sertifika No</div>
              <div className="text-gray-600 font-mono">{certDetails.certificateNo}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
