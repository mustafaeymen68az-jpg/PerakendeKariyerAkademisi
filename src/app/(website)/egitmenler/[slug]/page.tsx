'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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
  BadgeCheck,
  GraduationCap,
  Building2,
  Clock,
  ChevronRight,
  Layers,
  FileText
} from 'lucide-react';
import { INSTRUCTORS_DATA } from '@/data/instructorsData';
import CourseDetailModal, { DetailedCourse } from '@/components/CourseDetailModal';
import { getDetailedCourseData } from '@/data/courseDetailsData';

export default function EgitmenDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || (params?.id as string) || 'zeynep-kaya';

  const instructor = INSTRUCTORS_DATA[slug] || INSTRUCTORS_DATA['zeynep-kaya'];

  const [selectedCourseModal, setSelectedCourseModal] = useState<DetailedCourse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCourse = (courseTitle: string, category: string, slugStr: string) => {
    const detailed = getDetailedCourseData(slugStr, courseTitle, category);
    setSelectedCourseModal(detailed);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-10 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Button */}
        <div className="flex items-center justify-between">
          <Link 
            href="/egitimler" 
            className="inline-flex items-center text-xs font-black text-[#087F96] hover:underline space-x-1.5 bg-white px-4 py-2 rounded-xl shadow-xs border border-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Eğitim Kataloğuna Dön</span>
          </Link>

          <span className="text-xs text-gray-500 font-bold">
            PKA Onaylı Başeğitmen Profili
          </span>
        </div>

        {/* 1. INSTRUCTOR HEADER BANNER WITH RICH METRICS */}
        <div className="bg-gradient-to-r from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-6 border border-[#087F96]/30">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
            <div className="relative">
              <img
                src={instructor.avatar}
                alt={instructor.name}
                className="w-28 h-28 rounded-3xl object-cover border-4 border-white shadow-2xl flex-shrink-0"
              />
              {instructor.verifiedBadge && (
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1.5 shadow-lg">
                  <BadgeCheck className="w-6 h-6" />
                </div>
              )}
            </div>

            <div className="space-y-2 flex-1">
              <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black px-3.5 py-1 rounded-full">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>ONAYLI PKA EĞİTMENİ & AKADEMİSYENİ</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{instructor.name}</h1>
              <p className="text-sm font-black text-amber-300">{instructor.title}</p>
              <p className="text-xs text-gray-200 font-light">{instructor.company} • {instructor.experienceYears} Yıl Saha Tecrübesi</p>
            </div>
          </div>

          {/* 4 METRICS CARDS: STUDENTS, COURSES, HOURS, COMPANIES */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center bg-white/10 p-4 rounded-2xl border border-white/15">
            <div>
              <div className="flex items-center justify-center text-amber-300 space-x-1 font-black text-base">
                <Star className="w-4 h-4 fill-amber-300" />
                <span>{instructor.rating}</span>
              </div>
              <div className="text-[10px] text-gray-300 font-bold mt-0.5">Eğitmen Puanı</div>
            </div>

            <div className="border-l sm:border-x border-white/15">
              <div className="text-base font-black text-emerald-300 flex items-center justify-center space-x-1">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>{instructor.totalStudents.toLocaleString('tr-TR')}+</span>
              </div>
              <div className="text-[10px] text-gray-300 font-bold mt-0.5">Yetiştirilen Profesyonel</div>
            </div>

            <div className="border-t sm:border-t-0 border-white/15 pt-2 sm:pt-0">
              <div className="text-base font-black text-cyan-300 flex items-center justify-center space-x-1">
                <Clock className="w-4 h-4 text-cyan-300" />
                <span>{instructor.totalHoursGiven.toLocaleString('tr-TR')}+ Saat</span>
              </div>
              <div className="text-[10px] text-gray-300 font-bold mt-0.5">Eğitim & Danışmanlık Süresi</div>
            </div>

            <div className="border-t sm:border-t-0 border-l border-white/15 pt-2 sm:pt-0">
              <div className="text-base font-black text-amber-300 flex items-center justify-center space-x-1">
                <Building2 className="w-4 h-4 text-amber-300" />
                <span>{instructor.totalCompaniesServed} Şirket</span>
              </div>
              <div className="text-[10px] text-gray-300 font-bold mt-0.5">Hizmet Verilen Kurumsal</div>
            </div>
          </div>
        </div>

        {/* 2. MAIN CONTENT SECTIONS */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200 space-y-8">
          
          {/* Section A: Hakkında & Sektörel Biyografi */}
          <div className="space-y-3">
            <h2 className="text-lg font-black text-[#0B2A4A] flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#087F96]" />
              <span>Hakkında ve Sektörel Biyografi</span>
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed font-light bg-blue-50/60 p-5 rounded-2xl border border-blue-100">
              {instructor.bio}
            </p>
          </div>

          {/* Section B: Akademik Eğitimler & Bitirdiği Okullar */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-lg font-black text-[#0B2A4A] flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              <span>Akademik Eğitimler & Bitirdiği Okullar</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {instructor.academicDegrees && instructor.academicDegrees.length > 0 ? (
                instructor.academicDegrees.map((deg, i) => (
                  <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-1.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-black rounded-full font-mono uppercase">
                        {deg.degree}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono font-bold">{deg.year}</span>
                    </div>
                    <h3 className="font-extrabold text-sm text-[#0B2A4A]">{deg.school}</h3>
                    <p className="text-xs text-gray-600 font-medium">{deg.department}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-gray-50 rounded-2xl text-xs text-gray-500">Akademik eğitim bilgileri yükleniyor.</div>
              )}
            </div>
          </div>

          {/* Section C: Kurumsal & Bireysel Eğitim Geçmişi */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-lg font-black text-[#0B2A4A] flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <span>Şu Ana Kadar Verdiği Kurumsal ve Bireysel Eğitimler</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {instructor.corporateHistory && instructor.corporateHistory.length > 0 ? (
                instructor.corporateHistory.map((corp, i) => (
                  <div key={i} className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-2 shadow-xs">
                    <div className="text-xs font-black text-emerald-900">{corp.company}</div>
                    <div className="text-xs text-gray-700 font-medium">{corp.role}</div>
                    <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px] font-bold text-emerald-800">
                      <span>Katılımcı Sayısı:</span>
                      <span className="font-mono font-black">{corp.participants.toLocaleString('tr-TR')} Kişi</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-gray-50 rounded-2xl text-xs text-gray-500">Kurumsal eğitim bilgileri yükleniyor.</div>
              )}
            </div>
          </div>

          {/* Section D: Yetkinlikler & Uzmanlık Alanları */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-lg font-black text-[#0B2A4A] flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Uzmanlık Alanları & Yetkinlik Pasaportu</span>
            </h2>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider block mb-2">Uzmanlık Alanları:</span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {instructor.specialties.map((spec, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-100 text-[#0B2A4A] font-extrabold rounded-xl border border-gray-200">
                      ✓ {spec}
                    </span>
                  ))}
                </div>
              </div>

              {instructor.competenciesPassport && (
                <div>
                  <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider block mb-2">Yetkinlik Pasaportu Modülleri:</span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {instructor.competenciesPassport.map((comp, i) => (
                      <span key={i} className="px-3 py-1.5 bg-emerald-100 text-emerald-950 font-extrabold rounded-xl border border-emerald-200">
                        ⭐ {comp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 🔴 Section E: Platformdaki Kayıtlı Tüm Eğitimleri (Tıklanınca İlgili Eğitime Gider) */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-[#0B2A4A] flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-[#087F96]" />
                <span>{instructor.name} Tarafından Verilen PKA Eğitimleri ({instructor.coursesGiven.length})</span>
              </h2>

              <span className="text-xs text-[#087F96] font-bold">
                Tıklayarak Müfredat İnceleyebilirsiniz
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {instructor.coursesGiven.map((course, i) => (
                <div
                  key={i}
                  onClick={() => handleOpenCourse(course.title, course.category, course.slug || course.id)}
                  className="p-4 bg-white border border-gray-200 hover:border-[#087F96] rounded-2xl flex items-center justify-between hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-xl bg-[#0B2A4A] text-white font-black text-xs flex items-center justify-center group-hover:bg-[#087F96] transition-colors">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-extrabold text-sm text-[#0B2A4A] group-hover:text-[#087F96] transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-[11px] text-gray-500 font-medium mt-0.5">⏱️ Süre: {course.duration || 16} Saat</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      {course.category}
                    </span>
                    <button className="px-3.5 py-1.5 bg-[#087F96] hover:bg-[#056B80] text-white font-bold text-xs rounded-xl shadow-xs flex items-center space-x-1">
                      <span>Ders İncele / PDF</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
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

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourseModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
