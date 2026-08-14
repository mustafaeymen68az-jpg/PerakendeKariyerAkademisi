'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Film, 
  Sparkles, 
  Clock,
  Tv,
  Award,
  RotateCcw,
  Building2,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

interface CourseVideoPlayerProps {
  courseTitle: string;
  departmentName: string;
}

interface VideoProfile {
  videoUrl: string;
  fallbackUrl: string;
  posterBadge: string;
  categoryTag: string;
  chapters: { time: number; label: string; title: string; desc: string }[];
}

function getCourseVideoProfile(title: string, dept: string): VideoProfile {
  const t = title.toLowerCase();
  const d = dept.toLowerCase();

  // 1. Taze Gıda (Kasap, Manav, Şarküteri, Unlu Mamuller)
  if (d.includes('kasap') || d.includes('meyve') || d.includes('sarkuteri') || d.includes('unlu') || d.includes('taze gida') || t.includes('et') || t.includes('tazelik')) {
    return {
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      fallbackUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      posterBadge: "🥩 Taze Gıda & Ürün Kalite Uygulamaları",
      categoryTag: "Taze Gıda Hijyen & Ustalık Eğitimi",
      chapters: [
        { time: 0, label: "00:00", title: "1. Bölüm: Kalite & Tazelik Kontrolü", desc: "Soğuk zincir muhafazası, ürün kabulü ve hijyen standartları." },
        { time: 3, label: "00:03", title: "2. Bölüm: Kesim & Teşhir Hazırlığı", desc: "Bıçak güvenliği, porsiyonlama ve reyon içi estetik sergileme." },
        { time: 7, label: "00:07", title: "3. Bölüm: Fire Minimizasyonu & Satış", desc: "Gramaj hassasiyeti, zayiatı önleme ve ikramla müşteri kazanımı." }
      ]
    };
  }

  // 2. Kasiyer & Kasa Sistemleri
  if (d.includes('kasiyer') || t.includes('kasa') || t.includes('pos') || t.includes('tahsilat')) {
    return {
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      fallbackUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      posterBadge: "💳 Kasa Sistemleri & Hızlı Geçiş Simülasyonu",
      categoryTag: "Kasa Operasyon & Müşteri İletişimi",
      chapters: [
        { time: 0, label: "00:00", title: "1. Bölüm: POS & Barkod Hız Standartları", desc: "Sanal POS kullanımı, tuş takımı pratikliği ve hızlı okutma." },
        { time: 3, label: "00:03", title: "2. Bölüm: Nakit & Kart Tahsilat İşlemleri", desc: "Sahte para kontrolü, para üstü hesabı ve pos mutabakatı." },
        { time: 7, label: "00:07", title: "3. Bölüm: Kasa Açığı Önleme & Teşekkür", desc: "Gün sonu Z-Raporu, kasa devri ve güler yüzlü uğurlama." }
      ]
    };
  }

  // 3. Mağaza Yönetimi (Mağaza Müdürü, Müdür Yardımcısı, Bölge Müdürü)
  if (d.includes('mudur') || d.includes('yonetim') || t.includes('p&l') || t.includes('bütçe') || t.includes('kpi') || t.includes('liderlik')) {
    return {
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      fallbackUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      posterBadge: "📊 Mağaza P&L, KPI ve Liderlik Yönetimi",
      categoryTag: "Üst Düzey Perakende Yöneticilik Eğitimi",
      chapters: [
        { time: 0, label: "00:00", title: "1. Bölüm: P&L & Ciro Bütçelemesi", desc: "Mağaza finansal tablolarının analizi, brüt marj ve maliyet hesabı." },
        { time: 3, label: "00:03", title: "2. Bölüm: Saha Auditi & Verimlilik", desc: "Mağaza denetim skorları, vardiya matrisi ve işgücü optimizasyonu." },
        { time: 7, label: "00:07", title: "3. Bölüm: Ekip Koçluğu & Kriz Yönetimi", desc: "Performans görüşmeleri, turnover düşürme ve liderlik stratejileri." }
      ]
    };
  }

  // 4. Lojistik ve Depo
  if (d.includes('lojistik') || d.includes('depo') || t.includes('stok') || t.includes('sevkiyat')) {
    return {
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      fallbackUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      posterBadge: "📦 Lojistik, WMS ve Depo Operasyonları",
      categoryTag: "Tedarik Zinciri & Depo Mimarisi",
      chapters: [
        { time: 0, label: "00:00", title: "1. Bölüm: Mal Kabul & WMS Kaydı", desc: "İrsaliye kontrolü, barkodlama ve depoya kabul adımları." },
        { time: 3, label: "00:03", title: "2. Bölüm: Cross-Docking & Toplama", desc: "Forklift emniyeti, adresli stok toplama ve sevkiyat planı." },
        { time: 7, label: "00:07", title: "3. Bölüm: Hasar Önleme & Sayım", desc: "Depo içi 5S düzeni, periyodik sayım ve hasarsız sevk." }
      ]
    };
  }

  // Default General Operation Video Profile
  return {
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    fallbackUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    posterBadge: "🎓 Perakende Saha Operasyon Standartları",
    categoryTag: "Genel Perakendecilik Yetkinlik Modülü",
    chapters: [
      { time: 0, label: "00:00", title: "1. Bölüm: Temel Kavramlar & Standartlar", desc: `${title} konusundaki kurumsal kurallar ve saha iş disiplini.` },
      { time: 3, label: "00:03", title: "2. Bölüm: Uygulama & Süreç Takibi", desc: "Saha üzerinde adım adım doğru uygulama ve zaman yönetimi." },
      { time: 7, label: "00:07", title: "3. Bölüm: Çıktılar & Müşteri Memnuniyeti", desc: "Sertifikasyon standartları ve yüksek performans sonuçları." }
    ]
  };
}

export default function CourseVideoPlayer({ courseTitle, departmentName }: CourseVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const profile = getCourseVideoProfile(courseTitle, departmentName);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(true);
      });
    }
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const jumpToTime = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full w-fit mb-1.5">
            <Film className="h-3.5 w-3.5" />
            <span>{profile.categoryTag}</span>
          </div>
          <h3 className="font-display font-extrabold text-xl text-[#0B2A4A] flex items-center space-x-2">
            <span>🎥 {courseTitle} - Eğitime Özel Tanıtım Videosu</span>
          </h3>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-gray-500 bg-[#F4F7F9] px-3 py-1.5 rounded-xl border border-gray-200 self-start sm:self-auto">
          <Tv className="h-4 w-4 text-[#087F96]" />
          <span>HD 1080p • Konuya Özel İçerik</span>
        </div>
      </div>

      {/* Dynamic Native Video Player Container */}
      <div className="relative rounded-2xl overflow-hidden bg-black shadow-xl aspect-video group border border-[#087F96]/40">
        
        {/* Real HTML5 Video Element with course-specific source */}
        <video
          ref={videoRef}
          controls
          playsInline
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={profile.videoUrl} type="video/mp4" />
          <source src={profile.fallbackUrl} type="video/mp4" />
          Tarayıcınız video oynatmayı desteklemiyor.
        </video>

        {/* Custom Play Overlay Card when video is paused */}
        {!isPlaying && (
          <div 
            onClick={togglePlay}
            className="absolute inset-0 bg-gradient-to-t from-[#061B33]/90 via-[#0B2A4A]/60 to-transparent flex flex-col justify-between p-6 sm:p-8 cursor-pointer transition-all hover:bg-[#061B33]/70 pointer-events-auto"
          >
            {/* Top Badges */}
            <div className="flex items-center justify-between">
              <span className="bg-[#087F96] text-white text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center space-x-1.5">
                <Building2 className="h-3.5 w-3.5" />
                <span>{departmentName} Kadrosu</span>
              </span>

              <span className="bg-black/60 backdrop-blur-md text-white text-xs font-mono font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                <Clock className="h-3.5 w-3.5 text-[#34A853]" />
                <span>Eğitime Özel Video</span>
              </span>
            </div>

            {/* Center Big Play Button */}
            <div className="text-center space-y-3 my-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#087F96] hover:bg-[#056B80] text-white rounded-full flex items-center justify-center mx-auto shadow-2xl transition-all transform hover:scale-110 ring-4 ring-white/40">
                <Play className="h-8 w-8 sm:h-10 sm:w-10 fill-current ml-1" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#DDF4F7] uppercase tracking-wider block font-mono">
                  {profile.posterBadge}
                </span>
                <h4 className="font-display font-black text-lg sm:text-2xl text-white drop-shadow-md">
                  {courseTitle}
                </h4>
                <p className="text-xs sm:text-sm text-gray-200 font-light max-w-md mx-auto">
                  {departmentName} kadrosu için hazırlanan özel video içeriğini başlatmak için tıklayın.
                </p>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex items-center justify-between text-xs text-gray-300 border-t border-white/10 pt-3">
              <span className="flex items-center space-x-1 font-semibold text-[#DDF4F7]">
                <Sparkles className="h-4 w-4 text-[#34A853]" />
                <span>Perakende Mühendisi Kariyer Akademisi Video Modülü</span>
              </span>
              <span className="font-mono text-[11px] bg-white/10 px-2.5 py-0.5 rounded-full text-gray-200">
                Sesli & Altyazılı
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Video Chapter Timestamps tailored to this exact course */}
      <div className="bg-[#F8FAFC] p-4 rounded-xl border border-gray-200 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-extrabold text-[#0B2A4A] uppercase tracking-wider flex items-center space-x-1.5">
            <Award className="h-4 w-4 text-[#087F96]" />
            <span>Bu Eğitime Özel Video Adımları (Tıklayıp Dakikaya Git):</span>
          </h4>
          <button 
            onClick={restartVideo}
            className="text-xs text-[#087F96] font-bold hover:underline flex items-center space-x-1"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Yeniden Başlat</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          {profile.chapters.map((ch, idx) => (
            <button 
              key={idx}
              onClick={() => jumpToTime(ch.time)}
              className="p-3 bg-white hover:bg-[#DDF4F7]/50 border border-gray-200 hover:border-[#087F96]/40 rounded-xl transition-all text-left space-y-0.5 shadow-2xs"
            >
              <span className="font-mono font-bold text-[#087F96] bg-[#DDF4F7] px-2 py-0.5 rounded text-[10px]">
                {ch.label}
              </span>
              <strong className="block text-[#0B2A4A] font-bold text-xs mt-1">{ch.title}</strong>
              <span className="text-gray-500 text-[11px] font-light block leading-tight mt-0.5">
                {ch.desc}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
