'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Award,
  BookOpen,
  Star,
  Users,
  Briefcase,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BadgeCheck
} from 'lucide-react';
import { INSTRUCTORS_DATA } from '@/data/instructorsData';

export default function EgitmenDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || (params?.id as string) || 'ahmet-celik';

  const instructor = INSTRUCTORS_DATA[slug] || INSTRUCTORS_DATA['ahmet-celik'];

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Button */}
        <Link href="/egitimler" className="inline-flex items-center text-xs font-extrabold text-[#087F96] hover:underline space-x-1.5 bg-white px-4 py-2 rounded-xl shadow-xs border border-gray-200">
          <ArrowLeft className="w-4 h-4" />
          <span>Eğitim Kataloğuna Dön</span>
        </Link>

        {/* Instructor Profile Header Banner */}
        <div className="bg-gradient-to-r from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-6 border border-[#087F96]/30">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
            <div className="relative">
              <img
                src={instructor.avatar}
                alt={instructor.name}
                className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-2xl flex-shrink-0"
              />
              {instructor.verifiedBadge && (
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1 shadow">
                  <BadgeCheck className="w-6 h-6" />
                </div>
              )}
            </div>

            <div className="space-y-2 flex-1">
              <div className="inline-flex items-center space-x-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold px-3 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-300" /> ONAYLI PKA EĞİTMENİ
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white">{instructor.name}</h1>
              <p className="text-sm font-bold text-amber-300">{instructor.title}</p>
              <p className="text-xs text-gray-200 font-light">{instructor.company} • {instructor.experienceYears} Yıl Saha Tecrübesi</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 text-center bg-white/10 p-4 rounded-2xl border border-white/15">
            <div>
              <div className="flex items-center justify-center text-amber-300 space-x-1 font-bold text-base">
                <Star className="w-4 h-4 fill-amber-300" />
                <span>{instructor.rating}</span>
              </div>
              <div className="text-[10px] text-gray-300 font-medium mt-0.5">Eğitmen Puanı</div>
            </div>

            <div className="border-x border-white/15">
              <div className="text-base font-black text-white flex items-center justify-center space-x-1">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>{instructor.totalStudents.toLocaleString('tr-TR')}+</span>
              </div>
              <div className="text-[10px] text-gray-300 font-medium mt-0.5">Yetiştirilen Profesyonel</div>
            </div>

            <div>
              <div className="text-base font-black text-amber-300 flex items-center justify-center space-x-1">
                <Briefcase className="w-4 h-4 text-amber-300" />
                <span>{instructor.experienceYears} Yıl</span>
              </div>
              <div className="text-[10px] text-gray-300 font-medium mt-0.5">Sektörel Tecrübe</div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200 space-y-8">
          {/* Bio */}
          <div className="space-y-3">
            <h2 className="text-lg font-extrabold text-[#0B2A4A] flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#087F96]" />
              <span>Hakkında ve Sektörel Biyografi</span>
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed font-light bg-blue-50/60 p-5 rounded-2xl border border-blue-100">
              {instructor.bio}
            </p>
          </div>

          {/* Specialties */}
          <div className="space-y-3">
            <h2 className="text-lg font-extrabold text-[#0B2A4A] flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Uzmanlık Alanları</span>
            </h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {instructor.specialties.map((spec, i) => (
                <span key={i} className="px-3.5 py-1.5 bg-gray-100 text-[#0B2A4A] font-bold rounded-xl border border-gray-200">
                  ✓ {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Courses Given */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-lg font-extrabold text-[#0B2A4A] flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-[#087F96]" />
              <span>{instructor.name} Tarafından Verilen Eğitimler ({instructor.coursesGiven.length})</span>
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {instructor.coursesGiven.map((course, i) => (
                <div key={i} className="p-4 bg-white border border-gray-200 rounded-2xl flex items-center justify-between hover:border-[#087F96] transition-colors shadow-xs">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-xl bg-[#0B2A4A] text-white font-extrabold text-xs flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="font-bold text-sm text-[#0B2A4A]">{course.title}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {course.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
            <Link
              href="/egitimler"
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-colors"
            >
              Kataloğa Dön
            </Link>

            <a
              href={instructor.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl text-xs shadow transition-all flex items-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>LinkedIn Profilini İncele</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
