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
import { getCourseImage } from '@/data/courseImages';
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
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
      desc: 'Mağaza içi stok takibi, fiyatlandırma stratejileri ve müşteri davranış modellerinde yapay zekânın temel mantığı.'
    },
    {
      id: 'uretken-yapay-zeka-ve-etkili-prompt-kullanim',
      title: '2. Üretken Yapay Zekâ ve Etkili Prompt Kullanımı',
      badge: 'Uygulamalı',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800',
      desc: 'ChatGPT, Claude ve LLM modellerine perakendeye özel prompt yazma, kampanya metni ve rapor taslağı oluşturma.'
    },
    {
      id: 'yapay-zeka-ile-raporlama-ve-veri-analizi',
      title: '3. Yapay Zekâ ile Raporlama ve Veri Analizi',
      badge: 'Veri & Analitik',
      icon: BarChart,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      desc: 'Binlerce satış satırını saniyeler içinde yapay zekâya analiz ettirme, trendleri ve mağaza kayıplarını otomatik bulma.'
    },
    {
      id: 'yapay-zeka-ile-talep-tahmini-ve-siparis-optimizasyonu',
      title: '4. Yapay Zekâ ile Talep Tahmini ve Sipariş Optimizasyonu',
      badge: 'Stok & Lojistik',
      icon: Database,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
      desc: 'Hava durumu, tatil ve geçmiş satış verilerinden yapay zekâ destekli sıfır zayi otomatik sipariş oluşturma.'
    },
    {
      id: 'yapay-zeka-destekli-magaza-yonetimi',
      title: '5. Yapay Zekâ Destekli Mağaza Yönetimi',
      badge: 'Saha Yönetimi',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800',
      desc: 'Vardiya çakışmalarını çözme, raf doluluk kameraları ve mağaza içi müşteri ısı haritası takibi.'
    },
    {
      id: 'yapay-zeka-veri-guvenligi-kvkk',
      title: '6. Yapay Zekâda Veri Güvenliği, KVKK ve Etik Kullanım',
      badge: 'Hukuk & Uyum',
      icon: Lock,
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
      desc: 'Müşteri alışveriş verisinin KVKK uyumuyla işlenmesi, veri sızıntılarını önleme ve güvenli kurumsal AI kullanımı.'
    },
    {
      id: 'yapay-zeka-ile-crm-ve-musteri-analitigi',
      title: '7. Yapay Zekâ ile CRM ve Müşteri Analitiği',
      badge: 'Pazarlama & CRM',
      icon: BrainCircuit,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      desc: 'Sepet tamamlatma önerileri, kayıp müşteri (churn) tahmini ve kişiselleştirilmiş dinamik teklif sistemleri.'
    },
    {
      id: 'ceo-genel-mudur-icin-yapay-zeka',
      title: '8. CEO / Genel Müdür İçin Yapay Zekâ',
      badge: 'Üst Yönetim',
      icon: Crown,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
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

        {/* 8 AI Courses Grid with Photo Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiCourses.map((course, idx) => {
            const Icon = course.icon;
            const instructor = getInstructorForCourse(course.id, course.badge);

            return (
              <div
                key={idx}
                onClick={() => handleOpenCourse(course)}
                className="bg-[#0B2A4A] border border-[#087F96]/40 hover:border-[#087F96] rounded-3xl overflow-hidden shadow-xl transition-all hover:scale-[1.02] flex flex-col justify-between group cursor-pointer"
              >
                {/* Photo Banner */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-950">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A] via-black/30 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-black/40 backdrop-blur-md text-[#DDF4F7] flex items-center justify-center border border-white/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-mono border border-emerald-500/30 uppercase">
                      {course.badge}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-base text-white group-hover:text-[#DDF4F7] transition-colors leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-gray-300 mt-2 leading-relaxed font-light line-clamp-3">
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
                        className="w-7 h-7 rounded-lg object-cover border border-[#087F96] flex-shrink-0"
                      />
                      <div className="truncate text-left">
                        <div className="text-[9px] text-[#DDF4F7] font-bold uppercase">Eğitmen:</div>
                        <div className="text-xs font-bold text-white hover:text-[#087F96] truncate">{instructor.name}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-mono text-[10px]">AI Sertifikalı</span>
                    <div className="text-[#087F96] group-hover:text-white font-bold flex items-center space-x-1">
                      <span>İçerik & Eğitmen</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
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
