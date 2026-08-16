'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  Building2, 
  MapPin, 
  Briefcase, 
  Award, 
  BookOpen, 
  TrendingUp, 
  X, 
  Edit3, 
  LogOut, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Compass
} from 'lucide-react';
import { VisitorProfile } from './VisitorOnboardingModal';

const DEFAULT_PROFILE: VisitorProfile = {
  firstName: 'Ahmet',
  lastName: 'Çelik',
  companyName: 'Migros / Macrocenter',
  sectorChannel: 'Gıda Perakendeciliği',
  jobRole: 'Meyve Sebze Reyon Görevlisi',
  city: 'İstanbul',
  createdAt: new Date().toISOString()
};

export default function UserProfileModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<VisitorProfile>(DEFAULT_PROFILE);

  const loadProfile = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pka_visitor_profile');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setProfile({ ...DEFAULT_PROFILE, ...parsed });
        } catch (e) {
          console.error(e);
        }
      } else {
        setProfile(DEFAULT_PROFILE);
      }
    }
  };

  useEffect(() => {
    const handleLoad = () => loadProfile();
    handleLoad();
    window.addEventListener('pka_profile_updated', handleLoad);
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener('open_user_profile_details_modal', handleOpenModal);
    return () => {
      window.removeEventListener('pka_profile_updated', handleLoad);
      window.removeEventListener('open_user_profile_details_modal', handleOpenModal);
    };
  }, []);

  const handleEditProfile = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open_visitor_profile_modal'));
    }
  };

  const handleResetProfile = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pka_visitor_profile');
      window.dispatchEvent(new Event('pka_profile_updated'));
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const initials = `${profile.firstName?.[0] || 'A'}${profile.lastName?.[0] || 'Ç'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 my-auto text-slate-800 animate-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Card Header */}
        <div className="flex items-center space-x-4 border-b border-slate-100 pb-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0B2A4A] to-[#087F96] text-white flex items-center justify-center font-black text-2xl shadow-lg border-2 border-emerald-400 shrink-0">
            {initials}
          </div>

          <div className="space-y-1 min-w-0 flex-1">
            <div className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Aktif Kullanıcı Profili</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 truncate">
              {profile.firstName} {profile.lastName}
            </h3>
            <p className="text-xs text-slate-600 font-bold truncate">
              {profile.jobRole} • {profile.companyName}
            </p>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-0.5">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block flex items-center space-x-1">
              <User className="w-3 h-3 text-slate-500" />
              <span>Adı Soyadı:</span>
            </span>
            <span className="font-extrabold text-slate-900 text-sm block">
              {profile.firstName} {profile.lastName}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-0.5">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block flex items-center space-x-1">
              <Building2 className="w-3 h-3 text-slate-500" />
              <span>İşletme / Perakende Markası:</span>
            </span>
            <span className="font-extrabold text-slate-900 text-sm block truncate">
              {profile.companyName}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-0.5">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block flex items-center space-x-1">
              <Briefcase className="w-3 h-3 text-slate-500" />
              <span>Sektör Kanalı:</span>
            </span>
            <span className="font-extrabold text-slate-900 block truncate">
              {profile.sectorChannel}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-0.5">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>Bulunduğu İl:</span>
            </span>
            <span className="font-extrabold text-slate-900 block">
              {profile.city} (Türkiye)
            </span>
          </div>

        </div>

        {/* CANLI MÜFREDAT VE TERFİ PERFORMANS KARNESİ ÖZETİ */}
        <div className="bg-gradient-to-r from-[#061B33] to-[#0B2A4A] text-white p-4 rounded-2xl space-y-3 shadow-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[10px] font-mono font-black text-amber-300 uppercase flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Canlı Kariyer & Yetkinlik Karneniz</span>
            </span>
            <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
              %91 Terfiye Hazır
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[9px] font-mono text-gray-300 block">Mevcut Seviye</span>
              <span className="text-sm font-black text-white">5. Basamak</span>
            </div>

            <div className="p-2 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[9px] font-mono text-gray-300 block">Yetkinlik Skoru</span>
              <span className="text-sm font-black text-emerald-400">%88 Puan</span>
            </div>

            <div className="p-2 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[9px] font-mono text-gray-300 block">Hedef Rol</span>
              <span className="text-xs font-black text-amber-300 truncate block">Mağaza Müdürü</span>
            </div>
          </div>
        </div>

        {/* QUICK NAVIGATION ACTION BUTTONS */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/kariyerimi-planla"
              onClick={() => setIsOpen(false)}
              className="p-3 bg-[#087F96] hover:bg-[#056B80] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
            >
              <Compass className="w-4 h-4" />
              <span>Kariyer GPS Rotam</span>
            </Link>

            <Link
              href="/ik-cozumlari/calisan-ozgecmis-egitim-karnesi"
              onClick={() => setIsOpen(false)}
              className="p-3 bg-[#0B2A4A] hover:bg-[#061B33] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>Eğitim Karnem</span>
            </Link>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <button
              onClick={handleEditProfile}
              className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1.5 border border-slate-200"
            >
              <Edit3 className="w-4 h-4 text-slate-600" />
              <span>Bilgilerimi Düzenle</span>
            </button>

            <button
              onClick={handleResetProfile}
              className="py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1.5 border border-rose-200"
              title="Profil Bilgilerini Sıfırla"
            >
              <LogOut className="w-4 h-4 text-rose-600" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
