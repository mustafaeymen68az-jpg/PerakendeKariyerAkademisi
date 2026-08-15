'use client';

import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Star, 
  Users, 
  Briefcase, 
  BookOpen, 
  Award, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  BadgeCheck,
  Building2,
  Sparkles
} from 'lucide-react';
import { INSTRUCTORS_DATA } from '@/data/instructorsData';

export default function EgitmenlerPage() {
  const instructors = Object.values(INSTRUCTORS_DATA);

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* HEADER HERO BANNER */}
        <div className="bg-gradient-to-r from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white p-8 sm:p-12 rounded-3xl border border-[#087F96]/30 shadow-xl text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>PKA Uzman Akademisyen & Eğitmen Kadrosu</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Perakende Kariyer Akademisi Eğitmenlerimiz
          </h1>

          <p className="text-gray-200 text-xs sm:text-sm max-w-3xl mx-auto font-light leading-relaxed">
            Türkiye'nin önde gelen perakende devlerinde yöneticilik, C-Level danışmanlık ve akademisyenlik yapmış onaylı başeğitmen kadromuz. Profillerini inceleyebilir ve verdikleri eğitimlere doğrudan ulaşabilirsiniz.
          </p>
        </div>

        {/* INSTRUCTORS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((inst) => (
            <div
              key={inst.id}
              className="bg-white rounded-3xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group border-t-4 border-t-[#087F96]"
            >
              <div className="p-6 space-y-5">
                
                {/* Avatar & Basic Info */}
                <div className="flex items-center space-x-4">
                  <div className="relative shrink-0">
                    <img
                      src={inst.avatar}
                      alt={inst.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-[#087F96] shadow-md group-hover:scale-105 transition-transform"
                    />
                    {inst.verifiedBadge && (
                      <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1 shadow-md">
                        <BadgeCheck className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="inline-flex items-center space-x-1 bg-blue-50 text-[#087F96] border border-blue-100 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" />
                      <span>ONAYLI EĞİTMEN</span>
                    </div>
                    <h2 className="text-lg font-black text-[#0B2A4A] group-hover:text-[#087F96] transition-colors">
                      {inst.name}
                    </h2>
                    <p className="text-xs font-bold text-[#087F96] line-clamp-1">{inst.title}</p>
                    <p className="text-[11px] text-gray-500 font-medium">{inst.company}</p>
                  </div>
                </div>

                {/* Rating & Stats Strip */}
                <div className="grid grid-cols-3 gap-2 text-center bg-gray-50 p-3 rounded-2xl border border-gray-200/70 text-xs">
                  <div>
                    <div className="flex items-center justify-center text-amber-500 space-x-1 font-black">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{inst.rating}</span>
                    </div>
                    <div className="text-[9px] text-gray-500 font-bold mt-0.5">Puan</div>
                  </div>

                  <div className="border-x border-gray-200">
                    <div className="font-black text-[#0B2A4A] flex items-center justify-center space-x-1">
                      <Users className="w-3.5 h-3.5 text-[#087F96]" />
                      <span>{inst.totalStudents.toLocaleString('tr-TR')}</span>
                    </div>
                    <div className="text-[9px] text-gray-500 font-bold mt-0.5">Öğrenci</div>
                  </div>

                  <div>
                    <div className="font-black text-emerald-600 flex items-center justify-center space-x-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{inst.experienceYears} Yıl</span>
                    </div>
                    <div className="text-[9px] text-gray-500 font-bold mt-0.5">Tecrübe</div>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-gray-600 line-clamp-3 font-light bg-blue-50/40 p-3 rounded-xl border border-blue-100/50 leading-relaxed">
                  {inst.bio}
                </p>

                {/* Specialties */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">Uzmanlık Alanları:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {inst.specialties.slice(0, 3).map((spec, i) => (
                      <span key={i} className="px-2.5 py-1 bg-gray-100 text-[#0B2A4A] font-bold text-[10px] rounded-lg border border-gray-200">
                        ✓ {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Courses Count Pill */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100">
                  <span className="font-bold text-gray-600 flex items-center space-x-1">
                    <BookOpen className="w-4 h-4 text-[#087F96]" />
                    <span>Verdiği PKA Eğitimleri:</span>
                  </span>
                  <span className="font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {inst.coursesGiven.length} Ders Modülü
                  </span>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-bold">Detaylı Akademik Biyografi</span>
                
                <Link
                  href={`/egitmenler/${inst.id}`}
                  className="px-4 py-2 bg-[#0B2A4A] hover:bg-[#087F96] text-white font-extrabold rounded-xl text-xs shadow transition-all flex items-center space-x-1"
                >
                  <span>Profili & Dersleri Gör</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
