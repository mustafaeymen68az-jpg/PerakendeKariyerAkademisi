import React from 'react';
import Link from 'next/link';
import { 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  Users, 
  HelpCircle, 
  Target, 
  Play, 
  ChevronRight, 
  FileText, 
  Sparkles, 
  ArrowLeft,
  Building2
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EgitimDetayPage({ params }: PageProps) {
  const { slug } = await params;

  // Comprehensive course mock database mapper
  const courseData = {
    title: 'Kasa Sistemleri, Hızlı Geçiş & Müşteri İletişimi',
    category: 'Mağaza Yönetimi ve Operasyon',
    department: 'Kasiyer',
    year: '1. Yıl',
    duration: 12,
    purpose: 'Kasa operasyonlarında sıfır hata ile çalışmak, para ve POS işlemlerini mevzuata uygun yönetmek ve kasa teslim anında müşteride üst düzey memnuniyet bırakmak.',
    importance: 'Kasa noktası müşterinin mağazadaki son temas alanıdır. Yapılan bir hesap hatası veya nezaketsiz davranış tüm alışveriş deneyimini olumsuz etkiler.',
    targetAudience: 'Yeni işe başlayan Kasiyerler, Kıdemli Kasiyer Adayları, Mağaza Kasa Sorumluları ve Yardımcı Personel.',
    content: [
      'POS Cihazı ve Yazar Kasa Tuş Takımı Eğitimi',
      'Barkod Okutma Hızı ve Çapraz Tarama Standartları',
      'Nakit, Kredi Kartı, Hediye Çeki ve Yemek Kartı Tahsilatları',
      'Sahte Para Kontrolü & Para Üstü Hesabı',
      'Kasa Açığı ve Fazlası Nedenleri & Kapanış Prosedürleri',
      'Zor Müşteri Yönetimi & Güler Yüzlü İletişim Protokolü'
    ],
    outcomes: [
      'Kasa geçiş hızında %25 artış ve kuyruk sürelerinde azalma.',
      'Kasa açığı/fazlası riskinin %90 oranında minimize edilmesi.',
      'Müşteri memnuniyet (CSAT) skorunda +15 puanlık artış.'
    ],
    sampleApp: 'Sanal POS ve Yazar Kasa Simülatöründe 50 farklı alışveriş senaryosunu zaman karşı yarışılarak tamamlamak.',
    caseStudy: 'Yoğun bir akşam saatinde iade talep eden öfkeli bir müşterinin kasa önünde sakinleştirilmesi ve doğru prosedürle ikna edilmesi vaka analizi.',
    evaluationMethod: '%40 Teorik Test + %30 Simülatör Kasa Testi + %30 Saha Supervizör Değerlendirmesi',
    examInfo: 'Eğitim sonunda %80 ve üzeri başarı sağlayan katılımcılara QR Doğrulamalı Perakende Kasiyer Yetkinlik Sertifikası verilir.',
    relatedCourses: [
      { title: 'Çapraz Satış & Kasa Arkası İkna Teknikleri', slug: 'capraz-satis-teknikleri' },
      { title: 'Kasa Açığı & Sahte Para Önleme Stratejileri', slug: 'kasa-acigi-onleme' },
      { title: 'Mağaza İçi Zor Müşteri & Kriz Çözümü', slug: 'zor-musteri-yonetimi' }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <Link href="/egitimler" className="inline-flex items-center text-xs font-bold text-[#087F96] hover:underline space-x-1">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Eğitim Kataloğuna Dön</span>
        </Link>

        {/* Hero Card Header */}
        <div className="bg-[#0B2A4A] text-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[#087F96]/30 relative overflow-hidden space-y-6">
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <span className="bg-[#087F96] text-white px-3 py-1 rounded-full uppercase">
              {courseData.category}
            </span>
            <span className="bg-[#DDF4F7] text-[#0B2A4A] px-3 py-1 rounded-full uppercase font-mono">
              Kariyer Yılı: {courseData.year}
            </span>
            <span className="bg-white/10 text-gray-200 px-3 py-1 rounded-full flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1 text-[#087F96]" />
              {courseData.duration} Saat Süre
            </span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl text-white leading-tight">
            {courseData.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-gray-300 font-medium">
            <div className="flex items-center space-x-1">
              <Building2 className="h-4 w-4 text-[#087F96]" />
              <span>Departman: <strong className="text-white">{courseData.department}</strong></span>
            </div>
            <div className="flex items-center space-x-1">
              <Award className="h-4 w-4 text-[#34A853]" />
              <span>Sertifikasyon: <strong className="text-white">QR Kod Onaylı</strong></span>
            </div>
          </div>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Comprehensive Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Purpose & Importance */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
              <div>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A] flex items-center space-x-2 mb-2">
                  <Target className="h-5 w-5 text-[#087F96]" />
                  <span>Eğitimin Amacı</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                  {courseData.purpose}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-display font-bold text-lg text-[#0B2A4A] flex items-center space-x-2 mb-2">
                  <HelpCircle className="h-5 w-5 text-[#087F96]" />
                  <span>Neden Önemli?</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                  {courseData.importance}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-display font-bold text-lg text-[#0B2A4A] flex items-center space-x-2 mb-2">
                  <Users className="h-5 w-5 text-[#087F96]" />
                  <span>Kimler Katılmalı?</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                  {courseData.targetAudience}
                </p>
              </div>
            </div>

            {/* Syllabus Content */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-4">
              <h3 className="font-display font-bold text-lg text-[#0B2A4A] flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-[#087F96]" />
                <span>Eğitim İçeriği Modülleri</span>
              </h3>

              <div className="space-y-2.5 pt-2">
                {courseData.content.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 bg-[#F4F7F9] p-3.5 rounded-xl border border-gray-200/60">
                    <span className="w-6 h-6 rounded-full bg-[#087F96] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#0B2A4A]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcomes & Application */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
              <div>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A] flex items-center space-x-2 mb-3">
                  <Sparkles className="h-5 w-5 text-[#34A853]" />
                  <span>Eğitim Çıktıları & Saha Katkısı</span>
                </h3>
                <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                  {courseData.outcomes.map((out, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-[#34A853] shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-display font-bold text-base text-[#0B2A4A] mb-1">Örnek Uygulama:</h3>
                <p className="text-xs text-gray-600 bg-[#DDF4F7]/50 p-3 rounded-lg font-mono">
                  {courseData.sampleApp}
                </p>
              </div>

              <div className="pt-2">
                <h3 className="font-display font-bold text-base text-[#0B2A4A] mb-1">Vaka Analizi (Case Study):</h3>
                <p className="text-xs text-gray-600 bg-[#F4F7F9] p-3 rounded-lg border border-gray-200">
                  {courseData.caseStudy}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: CTA & Assessment */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#087F96]/30 space-y-6 sticky top-24">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-[#087F96] uppercase">Eğitime Eriş</span>
                <h3 className="font-display font-extrabold text-xl text-[#0B2A4A]">Dijital Öğrenme</h3>
              </div>

              <Link
                href="/panel"
                className="w-full py-4 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-sm"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>Eğitime Başla</span>
              </Link>

              <div className="border-t border-gray-100 pt-4 space-y-3 text-xs text-gray-600">
                <div>
                  <strong className="block text-[#0B2A4A]">Değerlendirme Yöntemi:</strong>
                  <span className="text-gray-500">{courseData.evaluationMethod}</span>
                </div>
                <div>
                  <strong className="block text-[#0B2A4A]">Sınav & Sertifika:</strong>
                  <span className="text-gray-500">{courseData.examInfo}</span>
                </div>
              </div>
            </div>

            {/* Related Courses */}
            <div className="bg-[#061B33] text-white rounded-2xl p-6 shadow-sm space-y-4">
              <h4 className="font-display font-bold text-sm text-[#DDF4F7] uppercase">İlgili Diğer Eğitimler</h4>
              <div className="space-y-2.5">
                {courseData.relatedCourses.map((rel, i) => (
                  <Link key={i} href={`/egitim/${rel.slug}`} className="block p-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-gray-200 transition-colors">
                    • {rel.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
