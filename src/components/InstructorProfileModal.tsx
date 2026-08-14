'use client';

import React from 'react';
import Link from 'next/link';
import {
  X,
  Award,
  BookOpen,
  Star,
  Users,
  Briefcase,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  BadgeCheck
} from 'lucide-react';
import { Instructor } from '@/data/instructorsData';

interface InstructorProfileModalProps {
  instructor: Instructor | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InstructorProfileModal({ instructor, isOpen, onClose }: InstructorProfileModalProps) {
  if (!isOpen || !instructor) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in duration-200 space-y-6">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Instructor Banner Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left border-b border-gray-100 pb-6">
          <div className="relative">
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-[#087F96] shadow-xl flex-shrink-0"
            />
            {instructor.verifiedBadge && (
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1 shadow">
                <BadgeCheck className="w-5 h-5" />
              </div>
            )}
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="inline-flex items-center space-x-1 bg-blue-50 text-[#087F96] border border-blue-200 text-[10px] font-extrabold px-3 py-0.5 rounded-full mb-1">
              <ShieldCheck className="w-3 h-3 text-[#087F96] mr-1" /> ONAYLI AKADEMİ EĞİTMENİ
            </div>
            <h3 className="text-2xl font-black text-[#0B2A4A]">{instructor.name}</h3>
            <p className="text-xs font-bold text-[#087F96]">{instructor.title}</p>
            <p className="text-xs text-gray-500 font-medium">{instructor.company} • {instructor.experienceYears} Yıl Sektörel Tecrübe</p>
          </div>
        </div>

        {/* Rating & Stats Strip */}
        <div className="grid grid-cols-3 gap-3 text-center bg-gray-50 p-3.5 rounded-2xl border border-gray-200/80">
          <div>
            <div className="flex items-center justify-center text-amber-500 space-x-1 font-bold text-sm">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{instructor.rating}</span>
            </div>
            <div className="text-[10px] text-gray-500 font-medium mt-0.5">Eğitmen Puanı</div>
          </div>

          <div className="border-x border-gray-200">
            <div className="text-sm font-black text-[#0B2A4A] flex items-center justify-center space-x-1">
              <Users className="w-4 h-4 text-[#087F96]" />
              <span>{instructor.totalStudents.toLocaleString('tr-TR')}+</span>
            </div>
            <div className="text-[10px] text-gray-500 font-medium mt-0.5">Yetiştirilen Profesyonel</div>
          </div>

          <div>
            <div className="text-sm font-black text-emerald-600 flex items-center justify-center space-x-1">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>{instructor.experienceYears} Yıl</span>
            </div>
            <div className="text-[10px] text-gray-500 font-medium mt-0.5">Saha Tecrübesi</div>
          </div>
        </div>

        {/* Biyografi */}
        <div className="space-y-2 text-xs">
          <h4 className="font-extrabold text-[#0B2A4A] uppercase tracking-wider flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-[#087F96]" />
            <span>Hakkında & Sektörel Biyografi</span>
          </h4>
          <p className="text-gray-700 leading-relaxed font-light bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
            {instructor.bio}
          </p>
        </div>

        {/* Uzmanlık Alanları */}
        <div className="space-y-2 text-xs">
          <h4 className="font-extrabold text-[#0B2A4A] uppercase tracking-wider flex items-center space-x-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Uzmanlık Alanları</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {instructor.specialties.map((spec, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 text-[#0B2A4A] font-bold rounded-xl border border-gray-200">
                ✓ {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Eğitmenin Verdiği Tüm Dersler */}
        <div className="space-y-3 text-xs">
          <h4 className="font-extrabold text-[#0B2A4A] uppercase tracking-wider flex items-center space-x-1.5">
            <BookOpen className="w-4 h-4 text-[#087F96]" />
            <span>Verdiği Tüm Eğitim Modülleri ({instructor.coursesGiven.length})</span>
          </h4>

          <div className="space-y-2">
            {instructor.coursesGiven.map((crs, i) => (
              <div key={i} className="p-3 bg-white border border-gray-200 rounded-xl flex items-center justify-between hover:border-[#087F96] transition-colors">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-[#087F96]" />
                  <span className="font-bold text-[#0B2A4A]">{crs.title}</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {crs.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-colors"
          >
            Kapat
          </button>

          <a
            href={instructor.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl text-xs shadow transition-all flex items-center space-x-1.5"
          >
            <ExternalLink className="w-4 h-4" />
            <span>LinkedIn Profilini İncele</span>
          </a>
        </div>
      </div>
    </div>
  );
}
