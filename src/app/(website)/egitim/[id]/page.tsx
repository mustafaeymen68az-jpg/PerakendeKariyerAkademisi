'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  Video,
  FileText,
  Award,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Download,
  Eye,
  Play,
  Sparkles,
  Layers,
  Star
} from 'lucide-react';
import { getDetailedCourseData } from '@/data/courseDetailsData';

export default function EgitimDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || 'perakendede-yapay-zeka-kullanimi';

  const course = getDetailedCourseData(id);

  const [activeTab, setActiveTab] = useState<'content' | 'video' | 'pdf' | 'badge'>('content');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [selectedPdfIndex, setSelectedPdfIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Back Link */}
        <Link href="/egitimler" className="inline-flex items-center text-xs font-extrabold text-[#087F96] hover:underline space-x-1.5 bg-white px-4 py-2 rounded-xl shadow-xs border border-gray-200">
          <ArrowLeft className="w-4 h-4" />
          <span>Eğitim Kataloğuna Dön</span>
        </Link>

        {/* Course Banner Header */}
        <div className="bg-gradient-to-r from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4 border border-[#087F96]/30">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full font-bold uppercase">
              {course.category}
            </span>
            <span className="bg-white/10 text-gray-200 px-3 py-1 rounded-full font-bold">
              {course.level}
            </span>
            <span className="font-mono text-amber-300 font-bold bg-black/20 px-3 py-1 rounded-full">
              ⏱️ {course.duration}
            </span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight">
            {course.title}
          </h1>

          <p className="text-gray-200 text-sm sm:text-base font-light max-w-3xl leading-relaxed">
            {course.description}
          </p>

          {/* Navigation Bar */}
          <div className="flex items-center space-x-2 pt-6 overflow-x-auto border-t border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-4 py-2.5 rounded-xl font-extrabold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
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
              className={`px-4 py-2.5 rounded-xl font-extrabold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
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
              className={`px-4 py-2.5 rounded-xl font-extrabold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                activeTab === 'pdf'
                  ? 'bg-[#087F96] text-white shadow-md'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>📄 İndirilebilir PDF Dokümanlar</span>
            </button>

            <button
              onClick={() => setActiveTab('badge')}
              className={`px-4 py-2.5 rounded-xl font-extrabold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
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

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200/80 space-y-8">
          {activeTab === 'content' && (
            <div className="space-y-8">
              <div className="bg-blue-50/70 border border-blue-200 p-6 rounded-2xl space-y-4">
                <h3 className="font-extrabold text-lg text-[#0B2A4A] flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-[#087F96]" />
                  <span>Ders Özeti ve Perakende Kazanımları</span>
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed font-light">{course.overview}</p>
                <div className="pt-3 border-t border-blue-200/60">
                  <span className="text-xs font-bold text-[#0B2A4A] uppercase tracking-wider block mb-2">Kazanılacak Yetkinlikler:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {course.learningOutcomes?.map((out, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-gray-800 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#087F96] flex-shrink-0 mt-0.5" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-extrabold text-xl text-[#0B2A4A] flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-[#087F96]" />
                  <span>Detaylı Müfredat Modülleri</span>
                </h3>

                <div className="space-y-4">
                  {course.curriculum?.map((mod, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                      <div className="bg-gray-50 p-4 flex items-center justify-between border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <span className="w-8 h-8 rounded-xl bg-[#0B2A4A] text-white font-extrabold text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h4 className="font-bold text-base text-[#0B2A4A]">{mod.moduleTitle}</h4>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full">
                          ⏱️ {mod.duration}
                        </span>
                      </div>

                      <div className="p-4 space-y-2">
                        {mod.lessons.map((les, lIdx) => (
                          <div key={lIdx} className="flex items-center justify-between text-xs text-gray-700 py-2 px-3 rounded-xl hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                            <div className="flex items-center space-x-2 font-medium">
                              <BookOpen className="w-3.5 h-3.5 text-[#087F96]" />
                              <span>{idx + 1}.{lIdx + 1} {les}</span>
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

          {activeTab === 'video' && (
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-3xl overflow-hidden bg-slate-900 shadow-2xl text-white">
                <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
                  {!isPlayingVideo ? (
                    <div className="text-center space-y-4 p-8 relative z-10">
                      <button
                        onClick={() => setIsPlayingVideo(true)}
                        className="w-20 h-20 rounded-full bg-[#087F96] hover:bg-[#056B80] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 ring-8 ring-[#087F96]/30 mx-auto"
                      >
                        <Play className="w-10 h-10 ml-1 fill-white" />
                      </button>
                      <div>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full uppercase">
                          🎬 Örnek Ders Videosu
                        </span>
                        <h4 className="text-xl font-bold text-white mt-2">{course.videoSample?.title}</h4>
                        <p className="text-xs text-gray-300 font-mono mt-1">Süre: {course.videoSample?.duration}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full p-8 text-center space-y-4 bg-slate-900 flex flex-col justify-center">
                      <Video className="w-14 h-14 text-[#087F96] mx-auto animate-pulse" />
                      <h4 className="text-xl font-bold text-white">"{course.videoSample?.title}" Dersi Oynatılıyor</h4>
                      <p className="text-xs text-gray-300 max-w-lg mx-auto">1080p HD Canlı Eğitim Modülü Simülasyonu</p>
                      <button onClick={() => setIsPlayingVideo(false)} className="px-4 py-2 bg-white/20 rounded-xl text-xs inline-block mx-auto">
                        Dersi Durdur
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-slate-950 border-t border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-[#087F96]" />
                    <span>Zaman Damgaları & Bölümler:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {course.videoSample?.chapters?.map((chap, i) => (
                      <div key={i} className="p-3 bg-white/5 rounded-xl flex items-center justify-between text-gray-300">
                        <span>{chap.title}</span>
                        <span className="font-mono text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded text-[10px]">
                          {chap.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pdf' && (
            <div className="space-y-6">
              <h3 className="font-extrabold text-xl text-[#0B2A4A] flex items-center space-x-2">
                <FileText className="w-6 h-6 text-amber-500" />
                <span>İndirilebilir PDF Dokümanlar ve Rehberler</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.pdfDocuments?.map((pdf, idx) => (
                  <div key={idx} className="p-6 bg-white border-2 border-gray-200 rounded-2xl shadow-sm space-y-4">
                    <div className="space-y-2">
                      <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-mono text-[10px] font-bold">
                        PDF • {pdf.fileSize}
                      </span>
                      <h4 className="font-bold text-base text-[#0B2A4A]">{pdf.title}</h4>
                      <p className="text-xs text-gray-600 font-light">{pdf.description}</p>
                    </div>

                    <a
                      href={`data:text/plain;charset=utf-8,${encodeURIComponent(pdf.sampleContent.join('\n\n'))}`}
                      download={`${pdf.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`}
                      className="w-full py-2.5 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl text-xs shadow flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>PDF Dokümanı İndir ({pdf.pages} Sayfa)</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'badge' && (
            <div className="bg-[#0B2A4A] text-white p-8 rounded-3xl border border-[#087F96]/40 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full uppercase">
                  🏆 Kazanılacak Dijital Rozet
                </span>
                <h3 className="text-2xl font-black text-white">{course.title} Sertifikası</h3>
                <p className="text-xs text-gray-300 font-light">
                  Bu modülü tamamladığınızda Blockchain onaylı dijital rozetiniz profilinize ve Perakende Yetkinlik Pasaportunuza eklenecektir.
                </p>
              </div>

              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 font-black flex items-center justify-center shadow-2xl border-4 border-white flex-shrink-0">
                <Award className="w-12 h-12 text-[#0B2A4A]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
