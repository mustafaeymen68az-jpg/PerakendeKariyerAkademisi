'use client';

import React from 'react';
import { 
  X, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Building2, 
  Sparkles, 
  Download, 
  FileText, 
  Star, 
  TrendingUp, 
  UserCheck, 
  BarChart3,
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';
import { TalentCandidate } from '@/data/talentPoolData';

interface CandidateProfileModalProps {
  candidate: TalentCandidate | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CandidateProfileModal({ candidate, isOpen, onClose }: CandidateProfileModalProps) {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white p-6 sm:p-8 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-emerald-400 shadow-xl flex-shrink-0"
            />

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-emerald-500 text-white font-mono font-black text-xs px-3 py-1 rounded-full uppercase flex items-center space-x-1 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>+{candidate.competencyScore} Puan Barajı Geçildi</span>
                </span>
                <span className="bg-white/10 text-gray-200 text-xs px-3 py-1 rounded-full font-medium">
                  {candidate.city}
                </span>
                <span className="bg-white/10 text-gray-200 text-xs px-3 py-1 rounded-full font-medium">
                  {candidate.experienceYears} Yıl Saha Tecrübesi
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white">{candidate.name}</h2>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-200">
                <span className="flex items-center space-x-1">
                  <Building2 className="w-4 h-4 text-amber-300" />
                  <span>Şu Anki Şirketi: <strong>{candidate.currentCompany}</strong></span>
                </span>
                <span className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-emerald-300" />
                  <span>Hedef Pozisyon: <strong>{candidate.departmentName}</strong></span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-8">
          
          {/* Competency Scores Dashboard Banner */}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 p-6 rounded-3xl border border-blue-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-blue-200/80 pb-3">
              <h3 className="font-extrabold text-base text-[#0B2A4A] flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-[#087F96]" />
                <span>Onaylı Yetkinlik & Sınav Puan Karnesi</span>
              </h3>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                +80 İK Havuzuna Uygun ✓
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-white p-3.5 rounded-2xl border border-blue-100 shadow-xs">
                <div className="text-[10px] font-bold text-gray-500 uppercase">Genel Puan</div>
                <div className="text-2xl font-black text-[#087F96] font-mono">{candidate.competencyScore}/100</div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-blue-100 shadow-xs">
                <div className="text-[10px] font-bold text-gray-500 uppercase">Teorik Sınav</div>
                <div className="text-2xl font-black text-[#0B2A4A] font-mono">%{candidate.theoryExamScore}</div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-blue-100 shadow-xs">
                <div className="text-[10px] font-bold text-gray-500 uppercase">Saha Denetimi</div>
                <div className="text-2xl font-black text-emerald-600 font-mono">%{candidate.fieldAuditScore}</div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-blue-100 shadow-xs">
                <div className="text-[10px] font-bold text-gray-500 uppercase">Liderlik Skoru</div>
                <div className="text-2xl font-black text-amber-600 font-mono">%{candidate.leadershipScore}</div>
              </div>
            </div>
          </div>

          {/* Section 1: Earned Digital Certificates & Badges */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-lg text-[#0B2A4A] flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Kazanılan Dijital Sertifikalar ve Rozetler ({candidate.certificates.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {candidate.certificates.map((cert, idx) => (
                <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-4 space-y-2 shadow-sm hover:border-[#087F96] transition-all">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                      🏆
                    </span>
                    <span className="text-[9px] font-mono font-bold text-gray-400">{cert.credentialId}</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#0B2A4A] leading-snug">{cert.title}</h4>
                  <div className="text-[10px] text-gray-500 font-mono">Veriliş: {cert.issueDate}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Completed Training Modules */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-lg text-[#0B2A4A] flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-[#087F96]" />
              <span>Tamamlanan Eğitim Modülleri ({candidate.completedCourses.length} Ders)</span>
            </h3>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0B2A4A] text-white font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Tamamlanan Ders Modülü</th>
                    <th className="py-3 px-4">Eğitim Süresi</th>
                    <th className="py-3 px-4">Tamamlanma Tarihi</th>
                    <th className="py-3 px-4 text-right">Sınav Başarı Skoru</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {candidate.completedCourses.map((course, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-[#0B2A4A] flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{course.title}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 font-mono">{course.duration}</td>
                      <td className="py-3 px-4 text-gray-500 font-mono">{course.completedDate}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600">{course.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="bg-gray-50 border-t border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl text-xs transition-colors"
          >
            Kapat
          </button>

          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(`PERAKENDE KARİYER AKADEMİSİ - YETKİNLİK PASAPORTU\n\nAday: ${candidate.name}\nHedef Pozisyon: ${candidate.departmentName}\nYetkinlik Skoru: ${candidate.competencyScore}/100\nŞehir: ${candidate.city}\nTamamlanan Eğitim Sayısı: ${candidate.completedCourses.length}\n`)}`}
            download={`${candidate.name.replace(/\s+/g, '_')}_Yetkinlik_Pasaportu.txt`}
            className="w-full sm:w-auto px-8 py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl text-xs shadow-lg transition-all text-center flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Aday Yetkinlik Pasaportunu İndir</span>
          </a>
        </div>
      </div>
    </div>
  );
}
