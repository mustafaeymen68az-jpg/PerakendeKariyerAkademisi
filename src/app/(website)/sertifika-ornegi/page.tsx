'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { Award, ArrowLeft, Printer, ShieldCheck } from 'lucide-react';

export default function SertifikaOrnegiPage() {
  const certDetails = {
    participantName: 'Selim Kılıç',
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
            className="px-4 py-2 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-lg text-xs transition-all flex items-center space-x-1.5 shadow"
          >
            <Printer className="h-4 w-4" />
            <span>Sertifikayı Yazdır / PDF İndir</span>
          </button>
        </div>

        {/* Certificate Outer Frame */}
        <div className="bg-[#FFFFFF] text-[#0B2A4A] p-8 sm:p-12 rounded-3xl border-8 border-[#0B2A4A] shadow-2xl relative overflow-hidden space-y-8 font-sans">
          {/* Inner Golden/Turquoise Filigree Frame Border */}
          <div className="border-2 border-[#087F96] p-8 sm:p-10 rounded-2xl relative space-y-8">
            {/* Header with Logo */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-6 gap-4">
              <Logo variant="light" size="lg" showSubtext={true} />
              <div className="text-right font-mono text-xs text-gray-500">
                <span className="block font-bold text-[#0B2A4A]">KURUMSAL BAŞARI BELGESİ</span>
                <span>Belge No: <strong>{certDetails.certificateNo}</strong></span>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center space-y-3 py-2">
              <span className="text-xs font-bold text-[#087F96] tracking-widest uppercase font-mono">
                ÜSTÜN BAŞARI VE YETKİNLİK SERTİFİKASI
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0B2A4A]">
                Bu Belge Sayın
              </h2>
              <h1 className="font-display font-black text-3xl sm:text-5xl text-[#087F96] tracking-tight underline decoration-[#087F96]/30 py-2">
                {certDetails.participantName}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto font-light leading-relaxed">
                Perakende Kariyer Akademisi 2 Yıllık Yapılandırılmış Gelişim Müfredatı kapsamında düzenlenen aşağıdaki uzmanlık modülünü başarıyla tamamlamıştır.
              </p>
            </div>

            {/* Course Title Badge */}
            <div className="bg-[#F4F7F9] border border-[#087F96]/30 p-6 rounded-2xl text-center space-y-2">
              <span className="text-xs font-bold text-[#056B80] uppercase tracking-wider block font-mono">
                TAMAMLATILAN EĞİTİM MODÜLÜ
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-[#0B2A4A]">
                {certDetails.courseTitle}
              </h3>
              <div className="flex justify-center items-center space-x-6 text-xs text-gray-600 font-mono pt-2">
                <span>Departman: <strong>{certDetails.department}</strong></span>
                <span>•</span>
                <span>Eğitim Süresi: <strong>{certDetails.duration}</strong></span>
              </div>
            </div>

            {/* Footer Signatures and QR Code */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end border-t border-gray-200 pt-8 text-xs">
              {/* QR Verification Box */}
              <div className="flex items-center space-x-3 bg-[#F4F7F9] p-3 rounded-xl border border-gray-200">
                {/* SVG QR Code Simulation */}
                <svg className="w-16 h-16 shrink-0" viewBox="0 0 100 100" fill="#0B2A4A">
                  <rect width="100" height="100" fill="#FFFFFF"/>
                  <path d="M10 10h30v30H10zM60 10h30v30H60zM10 60h30v30H10z"/>
                  <path d="M20 20h10v10H20zM70 20h10v10H70zM20 70h10v10H20z" fill="#FFFFFF"/>
                  <path d="M50 10h5v80h-5zM10 50h80v5H10zM60 60h15v15H60zM80 75h10v15H80z"/>
                </svg>
                <div className="text-[10px] space-y-0.5 font-mono">
                  <span className="font-bold text-[#087F96] block">QR KOD DOĞRULAMA</span>
                  <span className="text-gray-500 block">Kamera ile tara</span>
                  <span className="text-gray-400 block text-[9px] truncate">www.perakendekariyer.com</span>
                </div>
              </div>

              {/* Date & Location */}
              <div className="text-center space-y-1 font-mono text-xs">
                <span className="text-gray-400 text-[10px] block">TAMAMLAMA TARİHİ</span>
                <span className="font-bold text-[#0B2A4A] text-sm block">{certDetails.completionDate}</span>
                <span className="text-gray-500 text-[11px] block">İstanbul, Türkiye</span>
              </div>

              {/* Official Seal / Signature */}
              <div className="text-right space-y-1">
                <div className="font-display font-extrabold text-sm text-[#0B2A4A]">
                  Perakende Kariyer Akademisi
                </div>
                <div className="text-xs text-[#087F96] font-semibold italic">
                  Akademi Direktörlüğü
                </div>
                <div className="text-[10px] text-gray-400 font-mono pt-1">
                  Resmi Onay Mührü
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
