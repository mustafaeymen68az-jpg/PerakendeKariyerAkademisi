'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  BookOpen,
  Award,
  TrendingUp,
  CheckCircle2,
  Clock,
  Upload,
  FileText,
  AlertTriangle,
  Play,
  HelpCircle,
  Bell,
  Target,
  ChevronRight,
  ShieldCheck,
  QrCode,
  Sparkles,
  Layers,
  MessageSquare,
  FileCheck,
  UserCheck,
  LogOut,
  Calendar
} from 'lucide-react';

export default function EmployeeDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'home' | 'courses' | 'career' | 'competencies' | 'tasks' | 'feedback' | 'certificates' | 'profile'
  >('home');

  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showTaskUploadModal, setShowTaskUploadModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  // Task Upload State
  const [taskNotes, setTaskNotes] = useState('');
  const [taskFile, setTaskFile] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Career Goal State
  const [selectedGoal, setSelectedGoal] = useState('Mağaza Müdürü');
  const [goalType, setGoalType] = useState<'VERTICAL' | 'HORIZONTAL'>('VERTICAL');

  // Employee Profile & Score state
  const [employeeData, setEmployeeData] = useState({
    name: 'Ahmet Yılmaz',
    position: 'Kasiyer & Reyon Görevlisi',
    store: 'Sayar Marketler - Kadıköy Şubesi',
    promotionScore: 83.5,
    scoreComponents: {
      training: { score: 90, weight: 20, weighted: 18.0 },
      exam: { score: 85, weight: 20, weighted: 17.0 },
      fieldTask: { score: 80, weight: 25, weighted: 20.0 },
      kpi: { score: 82, weight: 25, weighted: 20.5 },
      behavioral: { score: 80, weight: 10, weighted: 8.0 },
    },
    currentCourse: {
      title: 'Mağaza İçi Stok, Sipariş ve Envanter Yönetimi',
      progress: 68,
      lastLesson: 'Modül 3: Emniyet Stoku Hesabı & Fire Önleme',
    },
    missingCompetencies: ['Stok Devir Hızı Hesabı', 'Kasa Sonu Kalibrasyonu'],
    nextPosition: 'Mağaza Müdür Yardımcısı',
  });

  const handleFileUploadMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTaskFile(file.name);
    }
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setShowTaskUploadModal(false);
      setTaskNotes('');
      setTaskFile(null);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#061B33] text-white flex flex-col font-sans">
      {/* Header Strip */}
      <div className="bg-[#0B2A4A] border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#087F96] flex items-center justify-center font-bold text-white shadow-md">
              <UserCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">{employeeData.name} • Çalışan Portalı</h1>
              <p className="text-xs text-gray-300">{employeeData.position} | {employeeData.store}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowGoalModal(true)}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black flex items-center space-x-1.5 shadow-md"
            >
              <Target className="h-4 w-4" />
              <span>Hedefim: {selectedGoal}</span>
            </button>

            <Link href="/" className="text-xs text-gray-400 hover:text-white px-2 py-1">
              Ana Siteye Dön
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* 8 NAV TAB SIDEBAR */}
        <div className="lg:col-span-1 space-y-1 bg-[#0B2A4A] p-3 rounded-2xl border border-white/10 h-fit">
          <div className="px-3 py-2 text-[10px] font-black text-[#087F96] uppercase tracking-wider">
            Çalışan Navigasyonu
          </div>

          <button
            onClick={() => setActiveTab('home')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'home' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <UserCheck className="h-4 w-4" />
            <span>Ana Sayfam</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'courses' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Eğitimlerim</span>
          </button>

          <button
            onClick={() => setActiveTab('career')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'career' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Kariyer Yolum</span>
          </button>

          <button
            onClick={() => setActiveTab('competencies')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'competencies' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Yetkinliklerim</span>
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'tasks' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Görevlerim</span>
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'feedback' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Geri Bildirimlerim</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'certificates' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <Award className="h-4 w-4" />
            <span>Sertifikalarım</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'profile' ? 'bg-[#087F96] text-white shadow-md' : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <User className="h-4 w-4" />
            <span>Profilim</span>
          </button>
        </div>

        {/* MAIN DASHBOARD CONTENT AREA */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* TAB 1: ANA SAYFAM */}
          {activeTab === 'home' && (
            <div className="space-y-6">
              
              {/* TOP SUMMARY STAT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Score Card with Explainable Popup trigger */}
                <div
                  onClick={() => setShowScoreModal(true)}
                  className="bg-[#0B2A4A] p-4 rounded-2xl border border-emerald-500/40 hover:border-emerald-400 cursor-pointer transition-all space-y-1 shadow-md group"
                >
                  <div className="flex justify-between items-center text-xs text-gray-300">
                    <span className="font-bold">Terfi Hazırlık Skoru</span>
                    <HelpCircle className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-3xl font-black text-emerald-400">%{employeeData.promotionScore}</div>
                  <div className="text-[10px] text-emerald-300 font-semibold">Tıkla & Hesaplama Bileşenlerini Gör</div>
                </div>

                <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10 space-y-1">
                  <div className="text-xs text-gray-300 font-bold">Hedef Pozisyon</div>
                  <div className="text-sm font-black text-amber-300 truncate">{employeeData.nextPosition}</div>
                  <div className="text-[10px] text-gray-400">Sonraki Aşama</div>
                </div>

                <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10 space-y-1">
                  <div className="text-xs text-gray-300 font-bold">Eğitim Tamamlama</div>
                  <div className="text-3xl font-black text-cyan-400">%78.5</div>
                  <div className="text-[10px] text-gray-400">12 / 15 Modül Tamamlandı</div>
                </div>

                <div className="bg-[#0B2A4A] p-4 rounded-2xl border border-white/10 space-y-1">
                  <div className="text-xs text-gray-300 font-bold">Yaklaşan Sınav / Görüşme</div>
                  <div className="text-sm font-black text-rose-300">18 Ağustos 2026</div>
                  <div className="text-[10px] text-gray-400">Stok Sınavı & Mentor Görüşmesi</div>
                </div>
              </div>

              {/* ACTIVE COURSE: DEVAM EDİLMESİ GEREKEN EĞİTİM */}
              <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Play className="h-5 w-5 text-emerald-400 fill-emerald-400" />
                    <h3 className="text-base font-bold text-white">Devam Edilen Eğitim</h3>
                  </div>
                  <span className="text-xs font-bold text-cyan-300">İlerleme: %{employeeData.currentCourse.progress}</span>
                </div>

                <div className="p-4 bg-[#061B33] rounded-xl border border-white/10 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-white">{employeeData.currentCourse.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">Son Ders: {employeeData.currentCourse.lastLesson}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg text-[10px] font-bold">
                      ZORUNLU EĞİTİM
                    </span>
                  </div>

                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${employeeData.currentCourse.progress}%` }} />
                  </div>

                  <div className="flex justify-end pt-1">
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-md">
                      <Play className="h-3.5 w-3.5 fill-white" />
                      <span>Kaldığım Yerden Devam Et</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* TASKS & FIELD TASKS WITH UPLOAD SUPPORT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-white">Bu Haftaki Görevlerim & Hedeflerim</h3>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">3 Görev</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 bg-[#061B33] rounded-xl border border-white/5 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>Reyon Fiyat Etiketi Kontrolü</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold">Tamamlandı</span>
                    </div>

                    <div className="p-3 bg-[#061B33] rounded-xl border border-white/5 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-amber-400" />
                        <span>Kasa Sonu Z-Raporu ve Sayım Görseli</span>
                      </div>
                      <button
                        onClick={() => setShowTaskUploadModal(true)}
                        className="px-2.5 py-1 bg-[#087F96] hover:bg-[#056B80] text-white text-[10px] font-bold rounded-lg flex items-center space-x-1"
                      >
                        <Upload className="h-3 w-3" />
                        <span>Kanıt Yükle</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white">Eksik Yetkinlikler & Gelişim İhtiyacı</h3>
                  <div className="space-y-2 text-xs">
                    {employeeData.missingCompetencies.map((comp, idx) => (
                      <div key={idx} className="p-3 bg-[#061B33] rounded-xl border border-rose-500/30 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-rose-400" />
                          <span>{comp}</span>
                        </div>
                        <span className="text-[10px] text-rose-300 font-bold">Önerilen Eğitim Atandı</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EĞİTİMLERİM */}
          {activeTab === 'courses' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white">Eğitimlerim ve Öğrenme İlerlemesi</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-[#061B33] rounded-2xl border border-blue-500/40 space-y-3">
                  <span className="px-2.5 py-1 bg-rose-500/20 text-rose-300 text-[10px] font-bold rounded-lg border border-rose-500/30">
                    ZORUNLU EĞİTİM
                  </span>
                  <h3 className="text-sm font-bold text-white">Mağaza İçi Stok, Sipariş ve Envanter Yönetimi</h3>
                  <p className="text-xs text-gray-400">Stok devir hızı, emniyet stoku ve fire azaltma pratikleri.</p>
                  <div className="flex justify-between items-center pt-2 text-xs">
                    <span className="text-cyan-300 font-bold">%68 Tamamlandı</span>
                    <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl">
                      Devam Et
                    </button>
                  </div>
                </div>

                <div className="p-5 bg-[#061B33] rounded-2xl border border-white/10 space-y-3">
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-lg border border-emerald-500/30">
                    ÖNERİLEN EĞİTİM
                  </span>
                  <h3 className="text-sm font-bold text-white">Müşteri İletişimi ve Zor Müşteri Yönetimi</h3>
                  <p className="text-xs text-gray-400">Kasa hattında kriz yönetimi ve şikâyet çözme yetkinlikleri.</p>
                  <div className="flex justify-between items-center pt-2 text-xs">
                    <span className="text-gray-400 font-bold">%0 Başlanmadı</span>
                    <button className="px-3 py-1.5 bg-[#087F96] hover:bg-[#056B80] text-white font-bold text-xs rounded-xl">
                      Eğitime Başla
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KARİYER YOLUM & HEDEF SEÇİCİ */}
          {activeTab === 'career' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white">Kariyer Yolum ve Hedef Pozisyonum</h2>
                  <p className="text-xs text-gray-400">Dikey terfi ve yatay kariyer geçiş imkânları.</p>
                </div>
                <button
                  onClick={() => setShowGoalModal(true)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl flex items-center space-x-1.5"
                >
                  <Target className="h-4 w-4" />
                  <span>Kariyer Hedefimi Değiştir</span>
                </button>
              </div>

              <div className="p-5 bg-[#061B33] rounded-2xl border border-white/10 space-y-3 text-xs">
                <div className="flex items-center space-x-2 text-amber-300 font-bold">
                  <Sparkles className="h-4 w-4" />
                  <span>Seçili Kariyer Hedefi: {selectedGoal} ({goalType === 'VERTICAL' ? 'Dikey Terfi Rotası' : 'Yatay Geçiş Rotası'})</span>
                </div>
                <p className="text-gray-300">
                  {selectedGoal} hedefiniz için gerekli yetkinlik tamamlama oranınız %83.5 düzeyindedir. Eksik kalan 2 modülü tamamlayarak terfi komitesi değerlendirmesine girebilirsiniz.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: GÖREVLERİM & SAHA KANIT YÜKLEME */}
          {activeTab === 'tasks' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Saha Görevlerim ve Kanıt Yükleme</h2>
                <button
                  onClick={() => setShowTaskUploadModal(true)}
                  className="px-4 py-2 bg-[#087F96] hover:bg-[#056B80] text-white font-bold text-xs rounded-xl flex items-center space-x-1.5"
                >
                  <Upload className="h-4 w-4" />
                  <span>Saha Görevi Kanıtı Yükle</span>
                </button>
              </div>

              <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">Kasa Sonu Z-Raporu ve Etiket Denetimi</div>
                  <div className="text-gray-400 mt-0.5">Durum: Onay Bekliyor (Yöneticiye İletildi)</div>
                </div>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-[10px] font-bold rounded-lg border border-amber-500/30">
                  ONAY BEKLİYOR
                </span>
              </div>
            </div>
          )}

          {/* TAB 7: SERTİFİKALARIM & QR DOĞRULAMA */}
          {activeTab === 'certificates' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white">QR Doğrulamalı Sertifikalarım</h2>

              <div className="p-6 bg-[#061B33] rounded-2xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-500/30">
                    RESMİ PKA SERTİFİKASI
                  </span>
                  <h3 className="text-base font-bold text-white">Temel Perakende ve Kasa Operasyonları Uzmanlığı</h3>
                  <p className="text-xs text-gray-400">Veriliş Tarihi: 12 Mayıs 2026 • Doğrulama Kodu: PKA-2026-8842</p>
                </div>

                <div className="p-3 bg-white text-slate-950 rounded-xl flex items-center space-x-2 shrink-0">
                  <QrCode className="h-10 w-10 text-[#0B2A4A]" />
                  <div className="text-[10px] font-mono font-bold">
                    <div>QR DOĞRULAMALI</div>
                    <div className="text-[#087F96]">VERIFIED</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'competencies' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white">Bireysel Yetkinlik Pasaportum & Radar Skorum</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-3">
                  <div className="flex justify-between font-bold text-white">
                    <span>Kasa Operasyonu & POS Kullanımı</span>
                    <span className="text-emerald-400">%92 (Usta)</span>
                  </div>
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-3">
                  <div className="flex justify-between font-bold text-white">
                    <span>Stok Takibi & Fire Önleme</span>
                    <span className="text-cyan-400">%85 (Gelişmiş)</span>
                  </div>
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-3">
                  <div className="flex justify-between font-bold text-white">
                    <span>Müşteri İlişkileri & Kriz Yönetimi</span>
                    <span className="text-amber-400">%88 (İleri)</span>
                  </div>
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>

                <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-3">
                  <div className="flex justify-between font-bold text-white">
                    <span>Ekip Liderliği & İletişim</span>
                    <span className="text-purple-400">%90 (Yüksek)</span>
                  </div>
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white">Yönetici Geri Bildirimleri & Performans Görüşmeleri</h2>
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-[#061B33] rounded-2xl border border-emerald-500/30 space-y-2">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-emerald-400">Mağaza Müdürü Notu (10 Ağustos 2026)</span>
                    <span className="text-gray-400 font-mono">10.08.2026</span>
                  </div>
                  <p className="text-gray-300">"Kasa devir hızındaki artış ve reyon düzeni takdire şayan. Stok eğitimi tamamlandığında terfi adaylığı onaylanacaktır."</p>
                </div>

                <div className="p-4 bg-[#061B33] rounded-2xl border border-cyan-500/30 space-y-2">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-cyan-400">Bölge İK Uzmanı Notu (15 Temmuz 2026)</span>
                    <span className="text-gray-400 font-mono">15.07.2026</span>
                  </div>
                  <p className="text-gray-300">"Müşteri memnuniyet anketi sonuçları 4.9/5 ile bölge birincisi. Terfi süreci başarıyla devam ediyor."</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-[#0B2A4A] p-6 rounded-2xl border border-white/10 space-y-6 text-xs">
              <h2 className="text-xl font-bold text-white">Kişisel ve Kurumsal Profil Bilgilerim</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#061B33] p-5 rounded-2xl border border-white/10">
                <div className="space-y-2 text-gray-300">
                  <div><strong className="text-white">Ad Soyad:</strong> {employeeData.name}</div>
                  <div><strong className="text-white">Unvan:</strong> {employeeData.position}</div>
                  <div><strong className="text-white">E-posta:</strong> ahmet@sayarmarket.com</div>
                  <div><strong className="text-white">Telefon:</strong> +90 532 555 0199</div>
                </div>
                <div className="space-y-2 text-gray-300">
                  <div><strong className="text-white">Mağaza / Şube:</strong> {employeeData.store}</div>
                  <div><strong className="text-white">Şirket Kıdemi:</strong> 2 Yıl 4 Ay</div>
                  <div><strong className="text-white">Terfi Hazırlık Skoru:</strong> %{employeeData.promotionScore}</div>
                  <div><strong className="text-white">Hesap Durumu:</strong> Active Employee (PKA Verified)</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: AÇIKLANABİLİR TERFİ HAZIRLIK SKORU MODAL'I */}
      {showScoreModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B2A4A] border border-emerald-500/40 rounded-3xl p-6 max-w-lg w-full space-y-5 text-white shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-emerald-400" />
                <h3 className="text-base font-bold">Açıklanabilir Terfi Hazırlık Skoru</h3>
              </div>
              <button onClick={() => setShowScoreModal(false)} className="text-gray-400 font-bold hover:text-white">✕</button>
            </div>

            <div className="p-4 bg-[#061B33] rounded-2xl border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400">Toplam Hazırlık Skoru</span>
                <div className="text-3xl font-black text-emerald-400">%{employeeData.promotionScore}</div>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-extrabold rounded-xl border border-emerald-500/30">
                TERFİYE HAZIR
              </span>
            </div>

            {/* Explanatory Breakdown Table */}
            <div className="space-y-3 text-xs">
              <span className="font-bold text-gray-300 block">Skor Hesaplama Bileşenleri & Kurumsal Ağırlıklar:</span>

              <div className="space-y-2">
                <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Eğitim Tamamlama Oranı</div>
                    <div className="text-[10px] text-gray-400">Ağırlık: %20 • Puan: {employeeData.scoreComponents.training.score}/100</div>
                  </div>
                  <span className="font-mono font-bold text-emerald-300">+{employeeData.scoreComponents.training.weighted} Puan</span>
                </div>

                <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Sınav Başarı Puanı</div>
                    <div className="text-[10px] text-gray-400">Ağırlık: %20 • Puan: {employeeData.scoreComponents.exam.score}/100</div>
                  </div>
                  <span className="font-mono font-bold text-emerald-300">+{employeeData.scoreComponents.exam.weighted} Puan</span>
                </div>

                <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Saha Görevi Değerlendirmesi</div>
                    <div className="text-[10px] text-gray-400">Ağırlık: %25 • Puan: {employeeData.scoreComponents.fieldTask.score}/100</div>
                  </div>
                  <span className="font-mono font-bold text-emerald-300">+{employeeData.scoreComponents.fieldTask.weighted} Puan</span>
                </div>

                <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Performans / Saha KPI Tutması</div>
                    <div className="text-[10px] text-gray-400">Ağırlık: %25 • Puan: {employeeData.scoreComponents.kpi.score}/100</div>
                  </div>
                  <span className="font-mono font-bold text-emerald-300">+{employeeData.scoreComponents.kpi.weighted} Puan</span>
                </div>

                <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Davranışsal Yetkinlik Değerlendirmesi</div>
                    <div className="text-[10px] text-gray-400">Ağırlık: %10 • Puan: {employeeData.scoreComponents.behavioral.score}/100</div>
                  </div>
                  <span className="font-mono font-bold text-emerald-300">+{employeeData.scoreComponents.behavioral.weighted} Puan</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-900/30 border border-blue-500/30 rounded-xl text-[11px] text-blue-200">
              * Bu ağırlıklar kurum yöneticileri tarafından yapılandırılabilir. Terfi önerisi insan onayı gerektirir.
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SAHA GÖREVİ KANIT / FOTOĞRAF YÜKLEME */}
      {showTaskUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B2A4A] border border-white/20 rounded-3xl p-6 max-w-md w-full space-y-4 text-white">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-base font-bold">Saha Görevi Kanıtı Yükle</h3>
              <button onClick={() => setShowTaskUploadModal(false)} className="text-gray-400 font-bold">✕</button>
            </div>

            {uploadSuccess ? (
              <div className="p-6 text-center space-y-3 bg-emerald-900/40 border border-emerald-500/50 rounded-2xl text-emerald-300">
                <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                <div className="font-bold text-sm">Kanıt Yöneticinize Gönderildi!</div>
                <div className="text-xs text-gray-300">Yönetici onayından sonra terfi skorunuz güncellenecektir.</div>
              </div>
            ) : (
              <form onSubmit={handleTaskSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Açıklama / Görev Notu *</label>
                  <textarea
                    required
                    rows={3}
                    value={taskNotes}
                    onChange={(e) => setTaskNotes(e.target.value)}
                    placeholder="Örn: 45 ürün etiket kontrolü yapıldı, fiyatlar kasayla birebir uyumlu."
                    className="w-full p-3 bg-[#061B33] border border-white/15 rounded-xl text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Fotoğraf veya Belge Yükle (PDF / JPG / PNG)</label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUploadMock}
                    className="w-full p-2.5 bg-[#061B33] border border-white/15 rounded-xl text-xs text-gray-300"
                  />
                  {taskFile && <div className="text-[11px] text-emerald-300 mt-1 font-bold">Seçilen Dosya: {taskFile}</div>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl shadow-md"
                >
                  Kanıtı Yöneticime Gönder
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: KARİYER HEDEFİ SEÇİCİ */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B2A4A] border border-white/20 rounded-3xl p-6 max-w-md w-full space-y-4 text-white">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-base font-bold">Kariyer Hedefinizi Belirleyin</h3>
              <button onClick={() => setShowGoalModal(false)} className="text-gray-400 font-bold">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Rota Türü</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGoalType('VERTICAL')}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all ${
                      goalType === 'VERTICAL' ? 'bg-[#087F96] text-white border-[#087F96]' : 'bg-white/5 border-white/10 text-gray-300'
                    }`}
                  >
                    Dikey Terfi Rotası
                  </button>
                  <button
                    type="button"
                    onClick={() => setGoalType('HORIZONTAL')}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all ${
                      goalType === 'HORIZONTAL' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white/5 border-white/10 text-gray-300'
                    }`}
                  >
                    Yatay Geçiş Rotası
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Hedef Pozisyon Seçin</label>
                <select
                  value={selectedGoal}
                  onChange={(e) => setSelectedGoal(e.target.value)}
                  className="w-full p-3 bg-[#061B33] border border-white/15 rounded-xl text-white focus:outline-none"
                >
                  <option value="Mağaza Müdür Yardımcısı">Mağaza Müdür Yardımcısı (Dikey)</option>
                  <option value="Mağaza Müdürü">Mağaza Müdürü (Dikey)</option>
                  <option value="Bölge Müdürü">Bölge Müdürü (Dikey)</option>
                  <option value="Satın Alma Uzmanı">Satın Alma Uzmanı (Yatay Geçiş)</option>
                  <option value="Kategori Yöneticisi">Kategori Yöneticisi (Yatay Geçiş)</option>
                  <option value="İç Eğitmen / İK Uzmanı">İç Eğitmen / İK Uzmanı (Yatay Geçiş)</option>
                </select>
              </div>

              <button
                onClick={() => setShowGoalModal(false)}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl shadow-md"
              >
                Kariyer Hedefimi Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
