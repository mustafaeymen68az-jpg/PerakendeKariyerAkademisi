'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Cpu,
  BrainCircuit,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart,
  Database,
  Lock,
  Crown,
  BookOpen,
  Video,
  FileText,
  CheckCircle2,
  UserCheck
} from 'lucide-react';
import CourseDetailModal, { DetailedCourse } from '@/components/CourseDetailModal';
import { getDetailedCourseData } from '@/data/courseDetailsData';
import { getInstructorForCourse, Instructor } from '@/data/instructorsData';
import InstructorProfileModal from '@/components/InstructorProfileModal';

export default function YapayZekaPage() {
  const [selectedCourse, setSelectedCourse] = useState<DetailedCourse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);

  const aiCourses = [
    {
      id: 'perakendede-yapay-zeka-kullanimi',
      title: '1. Perakendede Yapay Zekâ Kullanımı',
      badge: 'Temel & Saha',
      icon: Cpu,
      desc: 'Mağaza içi stok takibi, fiyatlandırma stratejileri ve müşteri davranış modellerinde yapay zekânın temel mantığı.'
    },
    {
      id: 'uretken-yapay-zeka-ve-etkili-prompt-kullanim',
      title: '2. Üretken Yapay Zekâ ve Etkili Prompt Kullanımı',
      badge: 'Uygulamalı',
      icon: Sparkles,
      desc: 'ChatGPT, Claude ve LLM modellerine perakendeye özel prompt yazma, kampanya metni ve rapor taslağı oluşturma.'
    },
    {
      id: 'yapay-zeka-ile-raporlama-ve-veri-analizi',
      title: '3. Yapay Zekâ ile Raporlama ve Veri Analizi',
      badge: 'Veri & Analitik',
      icon: BarChart,
      desc: 'Binlerce satış satırını saniyeler içinde yapay zekâya analiz ettirme, trendleri ve mağaza kayıplarını otomatik bulma.'
    },
    {
      id: 'yapay-zeka-ile-talep-tahmini-ve-siparis-optimizasyonu',
      title: '4. Yapay Zekâ ile Talep Tahmini ve Sipariş Optimizasyonu',
      badge: 'Stok & Lojistik',
      icon: Database,
      desc: 'Hava durumu, tatil ve geçmiş satış verilerinden yapay zekâ destekli sıfır zayi otomatik sipariş oluşturma.'
    },
    {
      id: 'yapay-zeka-destekli-magaza-yonetimi',
      title: '5. Yapay Zekâ Destekli Mağaza Yönetimi',
      badge: 'Saha Yönetimi',
      icon: Zap,
      desc: 'Vardiya çakışmalarını çözme, raf doluluk kameraları ve mağaza içi müşteri ısı haritası takibi.'
    },
    {
      id: 'yapay-zeka-veri-guvenligi-kvkk',
      title: '6. Yapay Zekâda Veri Güvenliği, KVKK ve Etik Kullanım',
      badge: 'Hukuk & Uyum',
      icon: Lock,
      desc: 'Müşteri alışveriş verisinin KVKK uyumuyla işlenmesi, veri sızıntılarını önleme ve güvenli kurumsal AI kullanımı.'
    },
    {
      id: 'yapay-zeka-ile-crm-ve-musteri-analitigi',
      title: '7. Yapay Zekâ ile CRM ve Müşteri Analitiği',
      badge: 'Pazarlama & CRM',
      icon: BrainCircuit,
      desc: 'Sepet tamamlatma önerileri, kayıp müşteri (churn) tahmini ve kişiselleştirilmiş dinamik teklif sistemleri.'
    },
    {
      id: 'ceo-genel-mudur-icin-yapay-zeka',
      title: '8. CEO / Genel Müdür İçin Yapay Zekâ',
      badge: 'Üst Yönetim',
      icon: Crown,
      desc: 'Şirket sahipleri ve CEO’lara özel yapay zekâ yatırımlarının ROI hesabı, dijital dönüşüm yol haritası ve liderlik.'
    }
  ];

  const handleOpenCourse = (courseItem: typeof aiCourses[0]) => {
    const detailed = getDetailedCourseData(courseItem.id, courseItem.title, courseItem.badge);
    setSelectedCourse(detailed);
    setIsModalOpen(true);
  };

  const handleOpenInstructorProfile = (e: React.MouseEvent, instructor: Instructor) => {
    e.stopPropagation();
    setSelectedInstructor(instructor);
    setIsInstructorModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#061B33] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Technological Header */}
        <div className="relative bg-gradient-to-r from-[#0B2A4A] via-[#087F96]/30 to-[#061B33] p-8 sm:p-12 rounded-3xl border border-[#087F96]/50 shadow-2xl overflow-hidden text-center space-y-4">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#087F96]/20 rounded-full blur-3xl" />
          <div className="inline-flex items-center space-x-2 bg-[#087F96] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
            <Sparkles className="h-4 w-4" />
            <span>Yapay Zekâ & Dijital Perakendecilik</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Perakendede Yapay Zekâ ve Dijital Dönüşüm
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Perakendecilik dünyasında yapay zekâ kullanan yöneticiler ve şirketler öne geçiyor. Eğitmen profillerini, <strong>örnek videoları</strong> ve <strong>indirilebilir PDF dokümanları</strong> incelemek için eğitim kartlarına tıklayın.
          </p>
        </div>

        {/* 8 AI Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiCourses.map((course, idx) => {
            const Icon = course.icon;
            const instructor = getInstructorForCourse(course.id, course.badge);

            return (
              <div
                key={idx}
                onClick={() => handleOpenCourse(course)}
                className="bg-[#0B2A4A] border border-[#087F96]/40 hover:border-[#087F96] rounded-2xl p-6 shadow-xl transition-all hover:scale-[1.02] flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#087F96]/30 text-[#DDF4F7] flex items-center justify-center group-hover:bg-[#087F96] group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold text-[#34A853] bg-[#34A853]/15 px-2.5 py-1 rounded-full font-mono">
                      {course.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white group-hover:text-[#DDF4F7] transition-colors leading-tight">
                    {course.title}
                  </h3>

                  <p className="text-xs text-gray-300 mt-3 leading-relaxed font-light">
                    {course.desc}
                  </p>

                  {/* INSTRUCTOR MINI PROFILE BADGE (CLICKABLE) */}
                  <div
                    onClick={(e) => handleOpenInstructorProfile(e, instructor)}
                    className="mt-4 p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 flex items-center space-x-2.5 transition-colors"
                  >
                    <img
                      src={instructor.avatar}
                      alt={instructor.name}
                      className="w-8 h-8 rounded-lg object-cover border border-[#087F96] flex-shrink-0"
                    />
                    <div className="truncate text-left">
                      <div className="text-[9px] text-[#DDF4F7] font-bold uppercase">Eğitmen:</div>
                      <div className="text-xs font-bold text-white hover:text-[#087F96] truncate">{instructor.name}</div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center space-x-3 text-[10px] text-gray-400 font-mono">
                    <span className="flex items-center space-x-1 text-emerald-400">
                      <Video className="w-3 h-3" />
                      <span>Video</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1 text-amber-300">
                      <FileText className="w-3 h-3" />
                      <span>PDF Doküman</span>
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-mono">AI Sertifikalı</span>
                  <div className="text-[#087F96] group-hover:text-white font-bold flex items-center space-x-1">
                    <span>İçerik & Eğitmen</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Retail Interactive Prompt Guide Widget */}
        <div className="bg-[#0B2A4A]/80 border border-[#087F96]/40 rounded-2xl p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-display font-bold text-xl text-white flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-[#087F96]" />
              <span>Örnek Perakende Yapay Zekâ Prompt Kütüphanesi</span>
            </h3>
            <span className="text-xs text-[#DDF4F7] font-mono">Hazır Şablonlar</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-[#061B33] p-4 rounded-xl border border-white/10 space-y-2">
              <span className="text-[#087F96] font-bold block">1. Mağaza Fire Analizi Promptu:</span>
              <p className="text-gray-300 font-sans italic">
                "Son 30 güne ait Meyve-Sebze fire oranlarını ve Hal fiyat artışlarını analiz et. Fireyi %3 düşürmek için reyon rotasyonu ve sipariş tavsiyesi raporu hazırla."
              </p>
            </div>

            <div className="bg-[#061B33] p-4 rounded-xl border border-white/10 space-y-2">
              <span className="text-[#087F96] font-bold block">2. Kategori Çapraz Satış Promptu:</span>
              <p className="text-gray-300 font-sans italic">
                "Peynir ve Zeytin reyonunda sepete giren ürünlerin yanına tamamlayıcı 3 ürün önerisi ve kasada uygulanacak 10 saniyelik ikna cümlesi oluştur."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Instructor Profile Modal */}
      <InstructorProfileModal
        instructor={selectedInstructor}
        isOpen={isInstructorModalOpen}
        onClose={() => setIsInstructorModalOpen(false)}
      />
    </div>
  );
}
