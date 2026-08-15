'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, GraduationCap, Crown, Building2, Sparkles } from 'lucide-react';

export default function TopHeaderBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-[#0B2A4A] border-b border-[#087F96]/30 shadow-lg px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
      {/* Title & Info on Left */}
      <div className="flex items-center space-x-2 text-xs text-amber-300 font-extrabold">
        <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
        <span className="uppercase tracking-wider">Perakende Kariyer Akademisi • Portallar</span>
      </div>

      {/* 4 LARGE ACTION BUTTONS PROMINENTLY IN TOP RIGHT */}
      <div className="flex flex-wrap items-center justify-end gap-2 w-full sm:w-auto">
        
        {/* 1. Çalışan Girişi */}
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new Event('open_visitor_profile_modal'));
            }
          }}
          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs shadow-md transition-all flex items-center space-x-1.5 border border-blue-400/40 cursor-pointer hover:scale-105"
        >
          <User className="h-3.5 w-3.5 text-white" />
          <span>👤 Çalışan Girişi</span>
        </button>

        {/* 2. Eğitmen Girişi */}
        <Link
          href="/ik-cozumlari/egitim-yonetimi"
          className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-extrabold rounded-xl text-xs shadow-md transition-all flex items-center space-x-1.5 border border-purple-400/40 hover:scale-105"
        >
          <GraduationCap className="h-3.5 w-3.5 text-purple-200" />
          <span>🎓 Eğitmen Girişi</span>
        </Link>

        {/* 3. Admin Paneli (Yönetici) */}
        <Link
          href="/admin"
          className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-md transition-all flex items-center space-x-1.5 border border-amber-300 hover:scale-105"
        >
          <Crown className="h-3.5 w-3.5 text-slate-950" />
          <span>👑 Admin Paneli (Yönetici)</span>
        </Link>

        {/* 4. Kurumsal Çözümler (Renamed from Kurumsal Solutions) */}
        <Link
          href="/kurumsal-cozumler"
          className="px-3.5 py-1.5 bg-[#E11D48] hover:bg-[#BE123C] text-white font-extrabold rounded-xl text-xs shadow-lg transition-all flex items-center space-x-1.5 border border-rose-400/40 hover:scale-105"
        >
          <Building2 className="h-3.5 w-3.5 text-white" />
          <span>Kurumsal Çözümler</span>
        </Link>
      </div>
    </header>
  );
}
