'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, BookOpen, Award, Clock, CheckCircle2, TrendingUp, AlertCircle, 
  BarChart3, GraduationCap, Play, FileText, ChevronRight, BrainCircuit, 
  UserCheck, Target, MessageSquare, Send, Sparkles, ShieldCheck
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '@/data/departmentsData';

export default function StudentPanelPage() {
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    role: string;
    company?: string;
    professionalPosition: string;
    targetPosition: string;
  }>({
    name: 'Öğrenci Kullanıcı',
    email: '',
    role: 'STUDENT',
    company: 'Perakende Şirketi',
    professionalPosition: 'Kasiyer',
    targetPosition: 'Mağaza Müdür Yardımcısı'
  });

  const [activeTab, setActiveTab] = useState<'COURSES' | 'ROADMAP' | 'EXAMS' | 'CERTIFICATES' | 'ASK_TRAINER' | 'SETTINGS'>('COURSES');
  const [questionText, setQuestionText] = useState('');
  const [questionSent, setQuestionSent] = useState(false);

  useEffect(() => {
    async function loadUserData() {
      try {
        const res = await fetch('/api/auth/check');
        const data = await res.json();
        if (data.autoLogin && data.user) {
          setUserData({
            name: data.user.name || 'Katılımcı',
            email: data.user.email || '',
            role: data.user.activeRole || data.user.role || 'STUDENT',
            company: data.user.company || 'Şirket',
            professionalPosition: data.user.professionalPosition || 'Kasiyer',
            targetPosition: data.user.targetPosition || 'Mağaza Müdür Yardımcısı'
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadUserData();
  }, []);

  const handleAskInstructor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    setQuestionSent(true);
    setQuestionText('');
    setTimeout(() => setQuestionSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome & Career Goal Header */}
        <div className="bg-gradient-to-r from-[#0B2A4A] via-[#087F96] to-[#0B2A4A] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-white bg-blue-600/60 px-3 py-1 rounded-full uppercase border border-blue-400/40">
                Sistem Yetkisi: Öğrenci
              </span>
              <span className="text-xs font-black text-amber-300 bg-black/30 px-3.5 py-1 rounded-full border border-amber-300/40 flex items-center space-x-1">
                <span>Mevcut Pozisyon:</span>
                <span className="text-white uppercase underline ml-1">{userData.professionalPosition}</span>
              </span>
              <span className="text-xs font-black text-emerald-300 bg-black/30 px-3.5 py-1 rounded-full border border-emerald-300/40 flex items-center space-x-1">
                <span>Hedef Pozisyon:</span>
                <span className="text-white uppercase underline ml-1">{userData.targetPosition}</span>
              </span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-3xl tracking-tight">
              Hoş Geldiniz, {userData.name}
            </h1>
            <p className="text-gray-200 text-xs sm:text-sm font-medium max-w-xl">
              “{userData.professionalPosition}” pozisyonundan “{userData.targetPosition}” hedefine özel kişiselleştirilmiş eğitim ve gelişim rotanız aktif durumdadır.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0 z-10">
            <div className="text-center font-mono">
              <span className="text-[11px] text-blue-200 uppercase font-bold block">Yetkinlik Skoru</span>
              <span className="text-2xl font-black text-emerald-400">86 / 100</span>
            </div>
            <div className="h-10 w-px bg-white/20 hidden sm:block" />
            <div className="text-center font-mono">
              <span className="text-[11px] text-blue-200 uppercase font-bold block">İlerleme Oranı</span>
              <span className="text-2xl font-black text-amber-300">%68</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 border-b border-gray-200 overflow-x-auto pb-2">
          {[
            { id: 'COURSES', label: 'Eğitimlerim' },
            { id: 'ROADMAP', label: 'Kariyer Yolum' },
            { id: 'EXAMS', label: 'Sınavlarım' },
            { id: 'CERTIFICATES', label: 'Sertifikalarım' },
            { id: 'ASK_TRAINER', label: 'Eğitmene Sor' },
            { id: 'SETTINGS', label: 'Hesap & Profil Ayarları' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0B2A4A] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: COURSES */}
        {activeTab === 'COURSES' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Enrolled Courses */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 space-y-4">
                  <h3 className="font-bold text-base text-[#0B2A4A] flex items-center justify-between border-b border-gray-100 pb-3">
                    <span className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-[#087F96]" />
                      <span>Devam Eden Eğitimlerim</span>
                    </span>
                    <span className="text-xs text-slate-500 font-mono">3 Aktif Eğitim</span>
                  </h3>

                  <div className="space-y-3">
                    {[
                      { title: 'Kasa Hattı Operasyonları ve Müşteri Deneyimi', progress: 75, instructor: 'Selim Kılıç', duration: '16 Saat' },
                      { title: 'Perakende Matematiği, Ciro ve Kasa Farkı Yönetimi', progress: 40, instructor: 'Muzaffer Tuğsavul', duration: '12 Saat' },
                      { title: 'Mağaza İçi İletişim ve Vardiya Yönetimine Giriş', progress: 15, instructor: 'Selim Kılıç', duration: '20 Saat' }
                    ].map((course, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-[#0B2A4A]">{course.title}</h4>
                          <span className="font-mono text-xs font-black text-[#087F96]">%{course.progress}</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-[#087F96] h-full rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }} />
                        </div>
                        <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
                          <span>Eğitmen: {course.instructor} • {course.duration}</span>
                          <button className="px-3 py-1 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold text-xs rounded-xl shadow-xs cursor-pointer">
                            Derse Devam Et ➔
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Next Training Card */}
                <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-6 shadow-xl space-y-3 relative overflow-hidden">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-mono font-bold text-emerald-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>BANA ÖNERİLEN SONRAKİ EĞİTİM</span>
                  </div>
                  <h3 className="text-lg font-black">
                    Mağaza Müdür Yardımcılığına Hazırlık ve Ekip Liderliği Modülü
                  </h3>
                  <p className="text-xs text-emerald-100 font-medium">
                    “{userData.professionalPosition}” görevinizden “{userData.targetPosition}” unvanına geçiş yapabilmeniz için önerilen 2. Seviye liderlik eğitimi.
                  </p>
                  <div className="pt-2 flex items-center space-x-3">
                    <Link href="/egitimler" className="px-4 py-2 bg-white text-emerald-950 font-black text-xs rounded-xl shadow-md hover:bg-emerald-50 transition-colors">
                      Eğitim Detayını İncele
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar: Next Recommendations & Competency Score */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 space-y-4">
                  <h3 className="font-bold text-sm text-[#0B2A4A] flex items-center space-x-2 border-b border-gray-100 pb-2">
                    <Award className="h-4 w-4 text-amber-500" />
                    <span>Yetkinlik Puanı Derlemesi</span>
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Kasa Operasyonu & Güvenlik', score: 92 },
                      { name: 'Müşteri İlişkileri & İletişim', score: 88 },
                      { name: 'Perakende Matematiği', score: 78 },
                      { name: 'Ekip Liderliği Hazırlığı', score: 65 }
                    ].map((comp, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>{comp.name}</span>
                          <span className="font-mono text-blue-600">{comp.score} Puan</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: `${comp.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: ROADMAP */}
        {activeTab === 'ROADMAP' && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 space-y-6">
            <div>
              <h3 className="text-xl font-black text-[#0B2A4A]">Kariyer Yolum & Terfi Rotası</h3>
              <p className="text-xs text-slate-500 mt-1">Mevcut pozisyonunuzdan hedef pozisyonunuza gelişim adımları.</p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-4">
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-700">
                <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-xl">Mevcut: {userData.professionalPosition}</span>
                <span className="text-slate-400">➔ ➔ ➔</span>
                <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl">Hedef: {userData.targetPosition}</span>
              </div>
              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full" style={{ width: '65%' }} />
              </div>
              <div className="text-xs font-mono font-bold text-slate-500 text-center">
                Terfi Kriterleri Tamamlanma Oranı: %65 (2/3 Sınav Geçildi, 1 Uygulama Projesi Bekliyor)
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EXAMS */}
        {activeTab === 'EXAMS' && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 space-y-6">
            <h3 className="text-xl font-black text-[#0B2A4A]">Sınavlarım & Ölçme Değerlendirme</h3>
            <div className="space-y-3">
              {[
                { title: 'Kasa Sistemleri ve Güvenlik Sınavı', score: '96 / 100', status: 'TAMAMLANDI', date: '12 Ocak 2026' },
                { title: 'Müşteri Sadakati ve İletişim Sınavı', score: '90 / 100', status: 'TAMAMLANDI', date: '28 Ocak 2026' },
                { title: 'Ekip Yönetimi ve Vardiya Dönem Sonu Sınavı', score: 'Bekliyor', status: 'AKTİF', date: 'Girebilirsiniz' }
              ].map((exam, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#0B2A4A]">{exam.title}</h4>
                    <span className="text-xs text-slate-500">{exam.date}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-xs font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">{exam.score}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-xl ${exam.status === 'TAMAMLANDI' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {exam.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CERTIFICATES */}
        {activeTab === 'CERTIFICATES' && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 space-y-6">
            <h3 className="text-xl font-black text-[#0B2A4A]">Sertifikalarım & Rozetlerim</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: `${userData.professionalPosition} Yetkinlik Sertifikası`, code: 'PKA-2026-8812', date: '15.01.2026' },
                { title: 'Perakende Hijyen ve İSG Başarı Belgesi', code: 'PKA-2026-4410', date: '02.02.2026' }
              ].map((cert, idx) => (
                <div key={idx} className="p-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl space-y-3 shadow-md">
                  <Award className="w-8 h-8 text-amber-400" />
                  <h4 className="font-black text-base">{cert.title}</h4>
                  <div className="text-xs text-slate-300 font-mono">Kod: {cert.code} • Tarih: {cert.date}</div>
                  <Link href="/sertifika-ornegi" className="inline-block px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-xl border border-white/20">
                    PDF İndir / Görüntüle
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ASK TRAINER */}
        {activeTab === 'ASK_TRAINER' && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 space-y-6">
            <div>
              <h3 className="text-xl font-black text-[#0B2A4A]">Eğitmene Soru Sor</h3>
              <p className="text-xs text-slate-500 mt-1">Eğitim modülleriniz, vaka sorularınız veya sınavlarınız hakkında akademi eğitmenlerimize mesaj gönderin.</p>
            </div>

            {questionSent && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-800">
                ✓ Sorduğunuz soru akademi eğitmenine iletilmiştir. Cevap panelinizde görüntülenecektir.
              </div>
            )}

            <form onSubmit={handleAskInstructor} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Sorunuz / Mesajınız:</label>
                <textarea
                  rows={4}
                  placeholder="Eğitmeninizden öğrenmek istediğiniz konuyu detaylı yazınız..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full mt-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  required
                />
              </div>
              <button
                type="submit"
                className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-2xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>EĞİTMENE GÖNDER</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === 'SETTINGS' && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 space-y-6">
            <h3 className="text-xl font-black text-[#0B2A4A]">Hesap ve Profil Ayarları</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-400 font-bold uppercase">Ad Soyad</span>
                <div className="font-black text-slate-900 text-sm">{userData.name}</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-400 font-bold uppercase">E-Posta</span>
                <div className="font-black text-slate-900 text-sm">{userData.email || 'ogrenci@perakendekariyer.com'}</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-400 font-bold uppercase">Mevcut Mesleki Pozisyon</span>
                <div className="font-black text-blue-700 text-sm">{userData.professionalPosition}</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-400 font-bold uppercase">Hedef Pozisyon</span>
                <div className="font-black text-emerald-700 text-sm">{userData.targetPosition}</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
