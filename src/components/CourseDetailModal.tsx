'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  BookOpen,
  Play,
  FileText,
  Download,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
  ChevronRight,
  Eye,
  Video,
  FileCheck,
  ShieldCheck,
  Star,
  Users,
  Zap,
  Maximize2,
  Minimize2,
  RotateCcw,
  Volume2,
  Layers,
  UserCheck
} from 'lucide-react';
import { getInstructorForCourse, Instructor } from '@/data/instructorsData';
import { getCourseImage } from '@/data/courseImages';
import InstructorProfileModal from '@/components/InstructorProfileModal';

export interface DetailedCourse {
  id: string;
  title: string;
  category: string;
  department?: string;
  badge?: string;
  duration?: string | number;
  level?: string;
  description: string;
  overview: string;
  learningOutcomes: string[];
  curriculum: {
    moduleTitle: string;
    duration: string;
    lessons: string[];
  }[];
  videoSample: {
    title: string;
    duration: string;
    videoUrl?: string;
    thumbnail: string;
    chapters: { time: string; title: string }[];
  };
  pdfDocuments: {
    title: string;
    fileSize: string;
    type: string;
    description: string;
    pages: number;
    sampleContent: string[];
  }[];
}

interface CourseDetailModalProps {
  course: DetailedCourse | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseDetailModal({ course, isOpen, onClose }: CourseDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'video' | 'pdf' | 'badge'>('content');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [selectedPdfIndex, setSelectedPdfIndex] = useState<number | null>(null);
  const [pdfPageNumber, setPdfPageNumber] = useState(1);

  // Instructor profile modal state
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);

  if (!isOpen || !course) return null;

  const currentPdf = selectedPdfIndex !== null ? course.pdfDocuments[selectedPdfIndex] : null;
  const assignedInstructor = getInstructorForCourse(course.id, course.category);
  const courseImage = getCourseImage(course.title, course.category, course.department);

  const handleOpenInstructor = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedInstructor(assignedInstructor);
    setIsInstructorModalOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden relative animate-in fade-in zoom-in duration-200">

          {/* Modal Header with Course Background Photo Banner */}
          <div className="relative bg-gradient-to-r from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white p-6 sm:p-8 flex-shrink-0 overflow-hidden">
            {/* Photo background with dark overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay"
              style={{ backgroundImage: `url(${courseImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A] via-black/40 to-transparent" />

            <div className="relative z-10">
              <button
                onClick={onClose}
                className="absolute top-0 right-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3 pr-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-0.5 rounded-full backdrop-blur-md">
                    {course.category}
                  </span>
                  {course.level && (
                    <span className="text-[10px] font-extrabold bg-white/10 text-gray-200 px-3 py-0.5 rounded-full backdrop-blur-md">
                      {course.level}
                    </span>
                  )}
                  <span className="text-[10px] font-mono font-bold text-amber-300 bg-black/40 px-2.5 py-0.5 rounded-full flex items-center space-x-1 backdrop-blur-md">
                    <Clock className="w-3 h-3 text-amber-300 inline mr-0.5" />
                    <span>{course.duration ? `${course.duration} ${typeof course.duration === 'number' ? 'Saat' : ''}` : '24 Saat'}</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black leading-tight text-white drop-shadow-md">{course.title}</h2>
                <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 font-light">{course.description}</p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center space-x-2 pt-6 overflow-x-auto border-t border-white/10 mt-6 text-xs">
                <button
                  onClick={() => setActiveTab('content')}
                  className={`px-4 py-2 rounded-xl font-extrabold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                    activeTab === 'content'
                      ? 'bg-[#087F96] text-white shadow-md'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Ders İçeriği & Müfredat</span>
                </button>

                <button
                  onClick={() => setActiveTab('video')}
                  className={`px-4 py-2 rounded-xl font-extrabold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                    activeTab === 'video'
                      ? 'bg-[#087F96] text-white shadow-md'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <Video className="w-4 h-4 text-emerald-300" />
                  <span>🎬 Örnek Eğitim Videosu</span>
                </button>

                <button
                  onClick={() => setActiveTab('pdf')}
                  className={`px-4 py-2 rounded-xl font-extrabold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                    activeTab === 'pdf'
                      ? 'bg-[#087F96] text-white shadow-md'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>📄 PDF Dokümanlar ({course.pdfDocuments?.length || 2})</span>
                </button>

                <button
                  onClick={() => setActiveTab('badge')}
                  className={`px-4 py-2 rounded-xl font-extrabold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                    activeTab === 'badge'
                      ? 'bg-[#087F96] text-white shadow-md'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <Award className="w-4 h-4 text-yellow-300" />
                  <span>🏆 Sertifika & Rozet</span>
                </button>
              </div>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">

            {/* INSTRUCTOR BANNER (CLICKABLE TO OPEN INSTRUCTOR PROFILE) */}
            <div
              onClick={handleOpenInstructor}
              className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-2 border-[#087F96]/30 hover:border-[#087F96] rounded-2xl flex items-center justify-between cursor-pointer transition-all shadow-sm group"
            >
              <div className="flex items-center space-x-3.5">
                <img
                  src={assignedInstructor.avatar}
                  alt={assignedInstructor.name}
                  className="w-12 h-12 rounded-xl object-cover border-2 border-[#087F96] shadow-md flex-shrink-0"
                />
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#087F96] flex items-center space-x-1">
                    <UserCheck className="w-3 h-3 text-[#087F96]" />
                    <span>Dersin Uzman Eğitmeni</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-[#0B2A4A] group-hover:text-[#087F96] transition-colors">
                    {assignedInstructor.name}
                  </h4>
                  <p className="text-[11px] text-gray-600 font-medium">
                    {assignedInstructor.title} • {assignedInstructor.experienceYears} Yıl Saha Tecrübesi
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs font-extrabold text-[#087F96] group-hover:translate-x-1 transition-transform">
                <span className="hidden sm:inline">Eğitmen Profilini İncele</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* TAB 1: CURRICULUM & CONTENT */}
            {activeTab === 'content' && (
              <div className="space-y-8 animate-in fade-in duration-150">
                {/* Overview & Learning Outcomes */}
                <div className="bg-blue-50/70 border border-blue-200 p-5 rounded-2xl space-y-3">
                  <h3 className="font-extrabold text-base text-[#0B2A4A] flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-[#087F96]" />
                    <span>Ders Özeti ve Perakende Kazanımları</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {course.overview}
                  </p>
                  <div className="pt-2 border-t border-blue-200/60">
                    <span className="text-[11px] font-bold text-[#0B2A4A] uppercase tracking-wider block mb-2">Öğrenme Hedefleri:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {course.learningOutcomes?.map((outcome, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-gray-800">
                          <CheckCircle2 className="w-4 h-4 text-[#087F96] flex-shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modules Accordion / List */}
                <div className="space-y-4">
                  <h3 className="font-extrabold text-lg text-[#0B2A4A] flex items-center space-x-2">
                    <Layers className="w-5 h-5 text-[#087F96]" />
                    <span>Detaylı Ders Müfredatı ({course.curriculum?.length || 0} Ana Modül)</span>
                  </h3>

                  <div className="space-y-3">
                    {course.curriculum?.map((mod, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                        <div className="bg-gray-50 p-4 flex items-center justify-between border-b border-gray-100">
                          <div className="flex items-center space-x-3">
                            <span className="w-7 h-7 rounded-lg bg-[#0B2A4A] text-white font-extrabold text-xs flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <h4 className="font-bold text-sm text-[#0B2A4A]">{mod.moduleTitle}</h4>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#087F96] bg-[#DDF4F7] px-2.5 py-0.5 rounded-full">
                            ⏱️ {mod.duration}
                          </span>
                        </div>

                        <div className="p-4 space-y-2 bg-white">
                          {mod.lessons.map((lesson, lIdx) => (
                            <div key={lIdx} className="flex items-center justify-between text-xs text-gray-700 py-1.5 px-3 rounded-xl hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                              <div className="flex items-center space-x-2">
                                <BookOpen className="w-3.5 h-3.5 text-[#087F96]" />
                                <span>{idx + 1}.{lIdx + 1} {lesson}</span>
                              </div>
                              <span className="text-[10px] text-gray-400 font-mono">15 Dk Mikro Ders</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SAMPLE VIDEO PLAYER */}
            {activeTab === 'video' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="border border-gray-200 rounded-3xl overflow-hidden bg-slate-900 shadow-2xl text-white">
                  {/* HTML5 Simulated Retail Video Player */}
                  <div className="relative aspect-video bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center group overflow-hidden">
                    {!isPlayingVideo ? (
                      <>
                        {/* Video Poster Preview Background */}
                        <div className="absolute inset-0 bg-cover bg-center opacity-40 blur-[1px]" style={{ backgroundImage: `url(${course.videoSample?.thumbnail || courseImage})` }} />

                        {/* Play Overlay */}
                        <div className="relative z-10 text-center space-y-3 p-6">
                          <button
                            onClick={() => setIsPlayingVideo(true)}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#087F96] hover:bg-[#056B80] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 ring-8 ring-[#087F96]/30 mx-auto"
                          >
                            <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 text-white fill-white" />
                          </button>
                          <div>
                            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                              🎬 Örnek Ders Videosu Önizleme
                            </span>
                            <h4 className="text-lg sm:text-xl font-bold mt-2 text-white">{course.videoSample?.title}</h4>
                            <p className="text-xs text-gray-300 font-mono mt-1">Eğitmen: {assignedInstructor.name} • Süre: {course.videoSample?.duration}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Active Video Player Simulation */
                      <div className="relative w-full h-full bg-black flex flex-col justify-between p-6">
                        <div className="flex items-center justify-between text-xs text-gray-300 z-10">
                          <span className="font-bold text-white flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                            <span>Ders Oynatılıyor: {course.videoSample?.title}</span>
                          </span>
                          <button onClick={() => setIsPlayingVideo(false)} className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs">
                            Durdur / Çık
                          </button>
                        </div>

                        <div className="my-auto text-center space-y-4 p-8 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10">
                          <Video className="w-12 h-12 text-[#087F96] mx-auto animate-pulse" />
                          <h4 className="text-lg font-extrabold text-white">
                            "{course.videoSample?.title}" Perakende İnteraktif Eğitimi
                          </h4>
                          <p className="text-xs text-gray-300 max-w-lg mx-auto">
                            Eğitmen: {assignedInstructor.name} ({assignedInstructor.title})
                          </p>
                        </div>

                        {/* Video Controls Bar */}
                        <div className="space-y-2 z-10">
                          <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#087F96] h-full w-2/5 rounded-full" />
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-gray-300 font-mono">
                            <span>02:15 / {course.videoSample?.duration}</span>
                            <span className="text-emerald-400 font-bold">1080p HD • PKA Canlı Ders</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Video Chapters List */}
                  <div className="p-6 bg-slate-950 border-t border-white/10 space-y-3">
                    <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center space-x-1.5">
                      <Clock className="w-4 h-4 text-[#087F96]" />
                      <span>Video İçerik Zaman Çizelgesi (Zaman Damgaları):</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {course.videoSample?.chapters?.map((chap, i) => (
                        <div
                          key={i}
                          onClick={() => setIsPlayingVideo(true)}
                          className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-between cursor-pointer transition-colors border border-white/5"
                        >
                          <span className="text-gray-300 font-medium">{chap.title}</span>
                          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                            {chap.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PDF HANDOUTS & DOWNLOADABLE DOCUMENTS */}
            {activeTab === 'pdf' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-lg text-[#0B2A4A] flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-amber-500" />
                      <span>Ders Kaynakları ve İndirilebilir PDF Dokümanlar</span>
                    </h3>
                    <p className="text-xs text-gray-500">
                      Eğitmen {assignedInstructor.name} tarafından hazırlanan şablonlar, checklist'ler ve prompt rehberleri.
                    </p>
                  </div>
                </div>

                {/* PDF Documents List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.pdfDocuments?.map((pdf, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-white border-2 border-gray-200 hover:border-[#087F96] rounded-2xl shadow-sm transition-all flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-mono text-[10px] font-bold uppercase">
                            PDF • {pdf.type}
                          </span>
                          <span className="text-xs font-mono font-bold text-gray-500">{pdf.fileSize}</span>
                        </div>

                        <h4 className="font-bold text-base text-[#0B2A4A] group-hover:text-[#087F96] transition-colors">
                          {pdf.title}
                        </h4>
                        <p className="text-xs text-gray-600 font-light">{pdf.description}</p>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => setSelectedPdfIndex(idx)}
                          className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-[#0B2A4A] font-bold rounded-xl text-xs transition-colors flex items-center space-x-1.5"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#087F96]" />
                          <span>PDF İncele ({pdf.pages} Sayfa)</span>
                        </button>

                        <a
                          href={`data:text/plain;charset=utf-8,${encodeURIComponent(pdf.sampleContent.join('\n\n'))}`}
                          download={`${pdf.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`}
                          className="px-3.5 py-2 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl text-xs shadow transition-colors flex items-center space-x-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>İndir</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Embedded PDF Viewer Modal if a PDF is selected */}
                {selectedPdfIndex !== null && currentPdf && (
                  <div className="mt-6 border-2 border-[#087F96] rounded-2xl overflow-hidden bg-slate-900 text-white shadow-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-6 h-6 text-amber-400" />
                        <div>
                          <h4 className="font-bold text-sm text-white">{currentPdf.title} (Canlı PDF İnceleme)</h4>
                          <p className="text-[10px] text-gray-300">Sayfa {pdfPageNumber} / {currentPdf.pages} • Resmi PKA Dokümanı</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setPdfPageNumber(Math.max(1, pdfPageNumber - 1))}
                          disabled={pdfPageNumber <= 1}
                          className="px-2.5 py-1 bg-white/10 hover:bg-white/20 disabled:opacity-40 rounded text-xs"
                        >
                          Önceki Sayfa
                        </button>
                        <button
                          onClick={() => setPdfPageNumber(Math.min(currentPdf.pages, pdfPageNumber + 1))}
                          disabled={pdfPageNumber >= currentPdf.pages}
                          className="px-2.5 py-1 bg-white/10 hover:bg-white/20 disabled:opacity-40 rounded text-xs"
                        >
                          Sonraki Sayfa
                        </button>
                        <button
                          onClick={() => setSelectedPdfIndex(null)}
                          className="p-1 rounded bg-red-500/20 text-red-300 hover:bg-red-500/40 text-xs"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Simulated PDF Document Page View */}
                    <div className="bg-white text-gray-900 p-8 rounded-xl shadow-inner min-h-[300px] space-y-4 font-serif border border-gray-300">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-3 text-xs font-mono text-gray-500">
                        <span>PERAKENDE KARİYER AKADEMİSİ DERS REHBERİ</span>
                        <span>SAYFA {pdfPageNumber}</span>
                      </div>

                      <div className="space-y-3 font-sans text-xs sm:text-sm text-gray-800">
                        <h5 className="font-bold text-base text-[#0B2A4A]">{currentPdf.title} - Bölüm {pdfPageNumber}</h5>
                        {currentPdf.sampleContent.map((para, pIdx) => (
                          <p key={pIdx} className="leading-relaxed text-gray-700">{para}</p>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-gray-200 text-center text-[10px] text-gray-400 font-mono">
                        © Perakende Kariyer Akademisi • www.perakendekariyerakademisi.com • Tüm hakları saklıdır.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: DIGITAL BADGE & CERTIFICATE PREVIEW */}
            {activeTab === 'badge' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="bg-gradient-to-br from-[#0B2A4A] to-[#061B33] text-white p-6 sm:p-8 rounded-3xl border border-[#087F96]/40 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                      🏆 Kazanılacak Dijital Rozet
                    </span>
                    <h3 className="text-2xl font-black text-white">{course.title} Uzmanlık Sertifikası</h3>
                    <p className="text-xs text-gray-300 leading-relaxed font-light">
                      Bu modülü başarıyla tamamlayıp mini sınavı geçtiğinizde, profilinize ve Perakende Yetkinlik Pasaportunuza doğrulanabilir dijital rozet eklenir.
                    </p>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center space-x-2 text-emerald-300">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Blockchain Doğrulanabilir QR Kodlu Sertifika</span>
                      </div>
                      <div className="flex items-center space-x-2 text-blue-300">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>LinkedIn ve Özgeçmişe Eklenebilir Rozet</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 text-center space-y-3">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black flex items-center justify-center shadow-2xl border-4 border-white">
                      <Award className="w-12 h-12 text-[#0B2A4A]" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-[#DDF4F7]">ONAYLI PERAKENDE ROZETİ</div>
                      <div className="text-[10px] text-amber-300 font-mono mt-0.5">{course.category}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Modal Actions Footer */}
          <div className="bg-gray-50 border-t border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl text-xs transition-colors"
            >
              Kapat
            </button>

            <Link
              href="/egitimler"
              onClick={onClose}
              className="w-full sm:w-auto px-8 py-3 bg-[#E11D48] hover:bg-[#BE123C] text-white font-extrabold rounded-xl text-xs shadow-lg transition-all text-center flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Bu Eğitime Şimdi Başla</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Instructor Profile Modal */}
      <InstructorProfileModal
        instructor={selectedInstructor}
        isOpen={isInstructorModalOpen}
        onClose={() => setIsInstructorModalOpen(false)}
      />
    </>
  );
}
