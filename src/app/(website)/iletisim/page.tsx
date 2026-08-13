import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { Mail, Phone, MapPin, Globe, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function IletisimPage() {
  return (
    <div className="min-h-screen bg-[#F4F7F9] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="bg-[#0B2A4A] text-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[#087F96]/30 text-center space-y-3">
          <span className="text-xs font-bold text-[#DDF4F7] bg-[#087F96] px-3.5 py-1 rounded-full uppercase">
            Bize Ulaşın
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl">
            İletişim & Genel Merkez
          </h1>
          <p className="text-gray-300 text-sm font-light leading-relaxed max-w-2xl mx-auto">
            Perakende Kariyer Akademisi kurumsal eğitim danışmanları ile iletişime geçin.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#DDF4F7] text-[#087F96] flex items-center justify-center mx-auto">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B2A4A]">Resmi Domain</h3>
            <p className="text-xs font-mono font-bold text-[#087F96]">www.perakendekariyer.com</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#DDF4F7] text-[#087F96] flex items-center justify-center mx-auto">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B2A4A]">E-Posta</h3>
            <p className="text-xs font-mono text-gray-600">info@perakendekariyer.com</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#DDF4F7] text-[#087F96] flex items-center justify-center mx-auto">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B2A4A]">Telefon</h3>
            <p className="text-xs font-mono text-gray-600">+90 (212) 444 8 752</p>
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 space-y-4">
          <div className="flex items-center space-x-3 text-[#0B2A4A]">
            <MapPin className="h-6 w-6 text-[#087F96]" />
            <h3 className="font-display font-bold text-xl">Akademi Genel Merkez Adresi</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
            Perakende Kariyer Akademisi Plaza, Maslak Mah. Büyükdere Cad. No: 145/A, Sarıyer / İstanbul, Türkiye.
          </p>
        </div>
      </div>
    </div>
  );
}
