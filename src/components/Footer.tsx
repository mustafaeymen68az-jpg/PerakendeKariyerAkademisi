'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { Mail, Phone, MapPin, Globe, ShieldCheck, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#061B33] text-white border-t border-[#087F96]/30">
      {/* Top Banner */}
      <div className="bg-[#0B2A4A] py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4 text-center md:text-left">
              <div className="bg-[#087F96]/20 p-3 rounded-xl border border-[#087F96]/40 shrink-0">
                <ShieldCheck className="h-8 w-8 text-[#087F96]" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  Perakende Sektörüne Özel Dijital Kariyer Akademisi
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm font-light mt-0.5">
                  Saha operasyonlarından CEO seviyesine kadar 2 yıllık sistematik yetkinlik gelişimi.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 shrink-0">
              <Link
                href="/talep-olustur"
                className="px-6 py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-lg text-sm shadow-md transition-all"
              >
                Kurumsal Demo Talep Et
              </Link>
              <Link
                href="/sertifikasyon"
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg text-sm transition-all flex items-center space-x-1.5"
              >
                <Award className="h-4 w-4 text-[#087F96]" />
                <span>Sertifika Doğrula</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" size="lg" showSubtext={true} />
            <p className="text-gray-300 text-sm font-light leading-relaxed max-w-sm mt-3">
              Mağaza çalışanından CEO ve Genel Müdüre kadar perakende sektöründeki tüm kadrolar için yapılandırılmış dijital eğitim, yetkinlik ve kariyer gelişim platformu.
            </p>
            <div className="pt-2 space-y-2 text-xs text-gray-300 font-mono">
              <div className="flex items-center space-x-2 text-[#087F96] font-bold text-sm">
                <Globe className="h-4 w-4" />
                <span>www.perakendekariyer.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-3.5 w-3.5 text-gray-400" />
                <span>info@perakendekariyer.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-3.5 w-3.5 text-gray-400" />
                <span>+90 (212) 444 8 752</span>
              </div>
            </div>
          </div>

          {/* Quick Links 1: Akademi & Eğitimler */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#DDF4F7] uppercase tracking-wider mb-4 border-b border-[#087F96]/30 pb-2">
              Akademi & Eğitimler
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link href="/" className="hover:text-[#087F96] transition-colors">Ana Sayfa</Link>
              </li>
              <li>
                <Link href="/egitimler" className="hover:text-[#087F96] transition-colors">Tüm Eğitim Kataloğu</Link>
              </li>
              <li>
                <Link href="/departmanlar" className="hover:text-[#087F96] transition-colors">Departman Bazlı Eğitimler</Link>
              </li>
              <li>
                <Link href="/taze-gida-akademisi" className="hover:text-[#087F96] transition-colors">Taze Gıda Akademisi</Link>
              </li>
              <li>
                <Link href="/yapay-zeka" className="hover:text-[#087F96] transition-colors">Yapay Zekâ ve Perakende</Link>
              </li>
              <li>
                <Link href="/programlar" className="hover:text-[#087F96] transition-colors">Yönetici Gelişim Programları</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links 2: Kariyer & Kurumsal */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#DDF4F7] uppercase tracking-wider mb-4 border-b border-[#087F96]/30 pb-2">
              Kariyer & Kurumsal
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link href="/kariyer-yollari" className="hover:text-[#087F96] transition-colors">Kariyer Yolları & Haritası</Link>
              </li>
              <li>
                <Link href="/operasyon-kariyer-yolculugu" className="hover:text-[#087F96] transition-colors font-semibold text-[#DDF4F7]">Operasyon Kariyer Yolculuğu (10 Basamak)</Link>
              </li>
              <li>
                <Link href="/kurumsal-cozumler" className="hover:text-[#087F96] transition-colors">Kurumsal Akademi Çözümleri</Link>
              </li>
              <li>
                <Link href="/kurumsal-cozumler#ic-egitmen" className="hover:text-[#087F96] transition-colors">İç Eğitmen Programı (TTT)</Link>
              </li>
              <li>
                <Link href="/sertifikasyon" className="hover:text-[#087F96] transition-colors">Sertifika & QR Doğrulama</Link>
              </li>
              <li>
                <Link href="/panel" className="hover:text-[#087F96] transition-colors">Öğrenci Kullanıcı Paneli</Link>
              </li>
              <li>
                <Link href="/kurumsal" className="hover:text-[#087F96] transition-colors">Kurumsal Yönetici Paneli</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links 3: Kurumsal Bilgi & İletişim */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#DDF4F7] uppercase tracking-wider mb-4 border-b border-[#087F96]/30 pb-2">
              Bilgi & İletişim
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link href="/hakkimizda" className="hover:text-[#087F96] transition-colors">Hakkımızda</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#087F96] transition-colors">Perakende Bilgi Merkezi (Blog)</Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-[#087F96] transition-colors">İletişim & Harita</Link>
              </li>
              <li>
                <Link href="/talep-olustur" className="hover:text-[#087F96] transition-colors">Kurumsal Demo Talep Et</Link>
              </li>
              <li>
                <span className="text-[#087F96] font-semibold block mt-3">Sosyal Medya</span>
                <div className="flex items-center space-x-3 mt-2">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white/10 hover:bg-[#087F96] p-2 rounded-lg transition-colors text-white"
                    title="LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white/10 hover:bg-[#087F96] p-2 rounded-lg transition-colors text-white"
                    title="Instagram"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white/10 hover:bg-[#087F96] p-2 rounded-lg transition-colors text-white"
                    title="YouTube"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="bg-[#0B2A4A] py-4 border-t border-white/10 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div>
            © {new Date().getFullYear()} <span className="font-semibold text-white">Perakende Kariyer Akademisi</span>. Tüm Hakları Saklıdır.
          </div>
          <div className="flex items-center space-x-4 font-mono text-[11px]">
            <span>www.perakendekariyer.com</span>
            <span>•</span>
            <span>Perakendecilikte Kariyer Yolculuğunuzun Adresi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
