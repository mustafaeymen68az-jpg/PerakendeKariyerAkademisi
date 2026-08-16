'use client';

import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  Image as ImageIcon, 
  Save, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  Download, 
  ExternalLink,
  Building2,
  BookOpen,
  Calendar,
  AlertCircle,
  Star,
  MessageSquare,
  Plus,
  X,
  BadgeCheck,
  ThumbsUp,
  Send
} from 'lucide-react';

interface StudentReview {
  id: string;
  studentName: string;
  studentRole: string;
  courseTitle: string;
  courseRating: number;
  trainerRating: number;
  date: string;
  comment: string;
}

const INITIAL_REVIEWS: StudentReview[] = [
  {
    id: 'rev-1',
    studentName: 'Selin Yılmaz',
    studentRole: 'Kadıköy Şube Müdür Yrd.',
    courseTitle: 'P&L Mağaza Bütçe Yönetimi & Fire Minimizasyonu',
    courseRating: 5.0,
    trainerRating: 5.0,
    date: '14 Mayıs 2025',
    comment: 'Ahmet Hocamız P&L formüllerini ve brüt marj sapma analizlerini gerçek perakende vaka örnekleriyle harika anlattı. Mağazamızdaki fire oranını %1.2 düşürmemizi sağladı.'
  },
  {
    id: 'rev-2',
    studentName: 'Ahmet Can Demir',
    studentRole: 'Beşiktaş Kasa Şefi',
    courseTitle: 'Kasiyer Müşteri Kriz Yönetimi & Kasa Hızı Ustalığı',
    courseRating: 4.9,
    trainerRating: 5.0,
    date: '20 Ocak 2025',
    comment: 'Kasa hattında karşılaştığımız agresif müşteri vakalarını canlı rol simülasyonu ile çözdük. Şubemizde 12 kasiyerimizin kasa hızını %98.2 seviyesine ulaştırdık.'
  },
  {
    id: 'rev-3',
    studentName: 'Caner Kaya',
    studentRole: 'Tunalı Mağaza Müdürü',
    courseTitle: 'Çoklu Mağaza Operasyon Yönetimi & Liderlik',
    courseRating: 5.0,
    trainerRating: 5.0,
    date: '15 Temmuz 2024',
    comment: 'Mağazamızın ₺24.8M ciroya ulaşmasında ve 5 müdür yardımcısı yetiştirmemizde Ahmet Hocamızın liderlik mentorluğunun katkısı tartışılmaz.'
  }
];

export default function EgitmenProfilPage() {
  const [name, setName] = useState('Dr. Ahmet Yılmaz');
  const [title, setTitle] = useState('Kıdemli Perakende Baş Eğitmeni & Operasyon Danışmanı');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80');
  
  // Mandatory Fields
  const [education, setEducation] = useState('İstanbul Üniversitesi - İşletme Fakültesi (Lisans), Marmara Üniversitesi - Perakende ve Pazarlama Yönetimi (Yüksek Lisans & Doktora)');
  const [experience, setExperience] = useState('22 Yıllık Perakende ve Saha Operasyon Deneyimi: Migros (5 Yıl Mağaza Müdürü), CarrefourSA (4 Yıl Bölge Müdürü), Perakende Mühendisi Eğitim Akademisi (Baş Eğitmen)');
  const [bio, setBio] = useState('Perakende matematiği, P&L kar-zarar yönetimi, mağaza verimlilik auditleri ve saha ekibi performans koçluğu alanında 20 yılı aşkın süredir Türkiye ve bölge ülkelerinde 15.000+ mağaza yöneticisi ve çalışanına sertifikalı eğitimler vermiş kıdemli perakende akademisyenidir.');
  const [cvUrl, setCvUrl] = useState('https://example.com/dr-ahmet-yilmaz-cv.pdf');
  const [specialties, setSpecialties] = useState('Mağaza P&L Yönetimi, KPI Denetimi, Kasa Hız Standartları, Taze Gıda Tazelik Denetimi, Fire Önleme Stratejileri');

  const [isSaved, setIsSaved] = useState(false);
  const [reviews, setReviews] = useState<StudentReview[]>(INITIAL_REVIEWS);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // New Review Form State
  const [newReviewForm, setNewReviewForm] = useState({
    studentName: '',
    studentRole: '',
    courseTitle: 'P&L Mağaza Bütçe Yönetimi & Fire Minimizasyonu',
    courseRating: 5,
    trainerRating: 5,
    comment: ''
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewForm.studentName || !newReviewForm.comment) return;

    const newRev: StudentReview = {
      id: `rev-${Date.now()}`,
      studentName: newReviewForm.studentName,
      studentRole: newReviewForm.studentRole || 'Saha Personeli',
      courseTitle: newReviewForm.courseTitle,
      courseRating: Number(newReviewForm.courseRating),
      trainerRating: Number(newReviewForm.trainerRating),
      date: 'Bugün',
      comment: newReviewForm.comment
    };

    setReviews([newRev, ...reviews]);
    setIsReviewModalOpen(false);
    setNewReviewForm({
      studentName: '',
      studentRole: '',
      courseTitle: 'P&L Mağaza Bütçe Yönetimi & Fire Minimizasyonu',
      courseRating: 5,
      trainerRating: 5,
      comment: ''
    });
    alert('Eğitim ve eğitmen değerlendirmeniz başarıyla gönderildi ve profil sayfasında yayınlandı!');
  };

  const isProfileComplete = name && title && education && experience && bio;
  const avgTrainerRating = (reviews.reduce((acc, curr) => acc + curr.trainerRating, 0) / reviews.length).toFixed(2);

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full w-fit mb-1">
            <User className="h-3.5 w-3.5" />
            <span>Zorunlu Eğitmen Profil &amp; Özgeçmiş Modülü</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#0B2A4A]">
            Eğitmen Profili, Özgeçmiş ve Kursiyer Yorumları
          </h2>
          <p className="text-xs text-gray-500 font-light mt-0.5">
            Profilinizi güncelleyin; tamamlanan eğitimlerinizin hemen altında öğrencilerin bıraktığı ders ve eğitmen değerlendirmelerini inceleyin.
          </p>
        </div>

        {/* Profile Completion Badge */}
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold border shrink-0 ${
          isProfileComplete 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
            : 'bg-amber-50 text-amber-800 border-amber-300'
        }`}>
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>Profil Durumu: {isProfileComplete ? '%100 Tamamlandı' : 'Eksik Bilgiler Var'}</span>
        </div>
      </div>

      {isSaved && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl flex items-center space-x-3 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>Eğitmen profiliniz, eğitim geçmişiniz ve özgeçmişiniz başarıyla güncellendi!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Mandatory Profile Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
            <div className="p-2.5 bg-[#087F96] text-white rounded-xl">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#0B2A4A]">Eğitmen Profil Formu</h3>
              <p className="text-[11px] text-gray-500 font-light">Tüm zorunlu alanları doldurup kaydedin.</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5 text-xs font-medium">
            
            {/* Name & Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#0B2A4A] font-bold mb-1">Ad Soyad (Zorunlu):</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-[#0B2A4A] font-bold mb-1">Unvan &amp; Akademik Sıfat (Zorunlu):</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Örn: Kıdemli Perakende Baş Eğitmeni"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
                />
              </div>
            </div>

            {/* Photo Avatar URL */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Profil Fotoğrafı Bağlantısı (URL):</label>
              <div className="flex items-center space-x-3">
                <input
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://domain.com/fotograf.jpg"
                  className="flex-1 p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-mono text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
                />
                <img 
                  src={avatar || "/images/hero-banner.jpg"} 
                  alt="Eğitmen Profil Fotoğrafı"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#087F96] shrink-0" 
                />
              </div>
            </div>

            {/* MANDATORY: Education History */}
            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-gray-200 space-y-2">
              <label className="block text-[#0B2A4A] font-extrabold text-xs flex items-center space-x-1.5">
                <GraduationCap className="h-4 w-4 text-[#087F96]" />
                <span>Nerede Okuduğu / Eğitim Geçmişi (Zorunlu):</span>
              </label>
              <textarea
                rows={3}
                required
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="Örn: İstanbul Üniversitesi İşletme Fakültesi (Lisans), Marmara Üniversitesi Perakende Yönetimi (Yüksek Lisans)"
                className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none leading-relaxed font-medium"
              />
            </div>

            {/* MANDATORY: Career & Experience */}
            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-gray-200 space-y-2">
              <label className="block text-[#0B2A4A] font-extrabold text-xs flex items-center space-x-1.5">
                <Briefcase className="h-4 w-4 text-[#087F96]" />
                <span>Kariyer Geçmişi ve Deneyimler (Zorunlu):</span>
              </label>
              <textarea
                rows={3}
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Örn: 15 Yıl Migros Mağaza Müdürlüğü, CarrefourSA Bölge Müdürlüğü, 5.000+ Katılımcı Eğitimi"
                className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none leading-relaxed font-medium"
              />
            </div>

            {/* MANDATORY: Biography Summary */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Biyografi Özeti &amp; Kendinizi Tanıtın (Zorunlu):</label>
              <textarea
                rows={4}
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Uzmanlık alanlarınız, akademik çalışmalarınız ve perakende yaklaşımınız hakkında detaylı biyografi..."
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none leading-relaxed font-medium"
              />
            </div>

            {/* CV Document Link & Specialties */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#0B2A4A] font-bold mb-1">Özgeçmiş (CV) Dosyası Bağlantısı:</label>
                <input
                  type="url"
                  value={cvUrl}
                  onChange={(e) => setCvUrl(e.target.value)}
                  placeholder="https://domain.com/ozgecmis.pdf"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-mono text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#0B2A4A] font-bold mb-1">Uzmanlık Alanları (Virgülle):</label>
                <input
                  type="text"
                  value={specialties}
                  onChange={(e) => setSpecialties(e.target.value)}
                  placeholder="P&L, Kasa Hızı, Fire Önleme..."
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-xs cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>Eğitmen Profilini ve Özgeçmişi Kaydet</span>
            </button>

          </form>
        </div>

        {/* Right Column: Public Instructor Resume Card Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0B2A4A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#087F96]/40 space-y-6 relative overflow-hidden">
            {/* Top Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2 text-[10px] font-mono font-bold text-[#DDF4F7] bg-white/10 px-3 py-1 rounded-full uppercase">
                <Sparkles className="h-3 w-3 text-[#34A853]" />
                <span>Onaylı Baş Eğitmen Profili</span>
              </div>
              <span className="text-[11px] font-mono text-gray-300">ID: TR-9942</span>
            </div>

            {/* Profile Avatar & Title */}
            <div className="flex items-center space-x-4">
              <img 
                src={avatar || "/images/hero-banner.jpg"} 
                alt={name} 
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#087F96] shadow-lg shrink-0"
              />
              <div>
                <h3 className="font-display font-black text-xl text-white leading-tight">
                  {name}
                </h3>
                <span className="text-xs font-bold text-[#DDF4F7] block mt-1">
                  {title}
                </span>
                <span className="text-[10px] text-gray-300 font-light block mt-0.5">
                  Perakende Kariyer Akademisi
                </span>
              </div>
            </div>

            {/* Education Badge Card */}
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1.5 text-xs">
              <span className="text-[10px] font-bold text-[#DDF4F7] uppercase tracking-wider block flex items-center space-x-1">
                <GraduationCap className="h-3.5 w-3.5 text-[#34A853]" />
                <span>Eğitim Geçmişi / Nerede Okudu:</span>
              </span>
              <p className="text-gray-200 font-light leading-relaxed text-[11px]">
                {education}
              </p>
            </div>

            {/* Career Experience Badge Card */}
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1.5 text-xs">
              <span className="text-[10px] font-bold text-[#DDF4F7] uppercase tracking-wider block flex items-center space-x-1">
                <Briefcase className="h-3.5 w-3.5 text-[#087F96]" />
                <span>Kariyer ve Perakende Deneyimi:</span>
              </span>
              <p className="text-gray-200 font-light leading-relaxed text-[11px]">
                {experience}
              </p>
            </div>

            {/* Biography */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] font-bold text-[#DDF4F7] uppercase tracking-wider block">
                Biyografi Özeti:
              </span>
              <p className="text-gray-300 font-light leading-relaxed text-[11px] line-clamp-4">
                {bio}
              </p>
            </div>

            {/* CV Download button */}
            {cvUrl && (
              <a
                href={cvUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#087F96] hover:bg-[#056B80] text-white rounded-xl text-xs font-extrabold transition-all flex items-center justify-center space-x-2 shadow-md"
              >
                <Download className="h-4 w-4" />
                <span>Eğitmen Özgeçmişini (CV) İndir / İncele</span>
              </a>
            )}
          </div>
        </div>

      </div>

      {/* 🔴 🔴🔴 EĞİTİMLERİN HEMEN ALTINDAKİ KURSİYER DEĞERLENDİRMELERİ VE EĞİTİM SONU YORUMLARI BÖLÜMÜ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full w-fit mb-1">
              <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              <span>Öğrenci Sonu Eğitim &amp; Eğitmen Değerlendirme Karnesi</span>
            </div>
            <h3 className="font-display font-extrabold text-xl text-[#0B2A4A]">
              Kursiyer Değerlendirmeleri ve Eğitim Sonu Yorumları ({reviews.length})
            </h3>
            <p className="text-xs text-gray-500 font-light mt-0.5">
              Eğitimi tamamlayan öğrencilerin ders ve eğitmen hakkındaki doğrudan geri bildirimleri ve puanları.
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl text-center">
              <span className="text-[10px] text-amber-800 font-bold block">Ortalama Eğitmen Skoru</span>
              <div className="flex items-center space-x-1 text-amber-600 font-black text-lg">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span>{avgTrainerRating} / 5.0</span>
              </div>
            </div>

            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow-md cursor-pointer transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>+ Değerlendirme &amp; Yorum Ekle</span>
            </button>
          </div>
        </div>

        {/* STUDENT REVIEW CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-5 bg-[#F8FAFC] rounded-2xl border border-gray-200 space-y-3 flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-gray-200/80 pb-2">
                  <div>
                    <span className="font-bold text-[#0B2A4A] text-sm block">{rev.studentName}</span>
                    <span className="text-[10px] text-[#087F96] font-semibold">{rev.studentRole}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono text-[9px] font-black rounded flex items-center space-x-1">
                    <BadgeCheck className="h-3 w-3 text-emerald-600" />
                    <span>Doğrulanmış Kursiyer</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 pt-0.5">
                  <span className="font-bold text-gray-700">{rev.courseTitle}</span>
                </div>

                <div className="flex items-center justify-between bg-amber-50 p-2 rounded-xl border border-amber-200/60 font-mono text-[10px]">
                  <span className="font-bold text-amber-900">Eğitmen Puanı:</span>
                  <div className="flex items-center space-x-1 text-amber-600 font-black">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span>{rev.trainerRating.toFixed(1)} / 5.0</span>
                  </div>
                </div>

                <p className="text-gray-700 italic text-[11px] leading-relaxed bg-white p-3 rounded-xl border border-gray-200">
                  "{rev.comment}"
                </p>
              </div>

              <div className="text-[10px] text-gray-400 font-mono pt-2 border-t border-gray-200 text-right">
                Tamamlama Tarihi: {rev.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: ÖĞRENCİ EĞİTİM & EĞİTMEN DEĞERLENDİRME MODALI */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 text-[#0B2A4A] shadow-2xl animate-in fade-in duration-200 font-sans">
            
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-amber-500 text-slate-950 rounded-xl font-bold">
                  <Star className="h-5 w-5 fill-slate-950" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#0B2A4A]">Eğitim &amp; Eğitmen Değerlendirmesi Yap</h3>
                  <p className="text-xs text-gray-500">Tamamladığınız eğitim ve eğitmeniz hakkındaki düşüncelerinizi yazın.</p>
                </div>
              </div>

              <button onClick={() => setIsReviewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-[#0B2A4A] font-bold mb-1">Adınız Soyadınız (Öğrenci):</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Selin Yılmaz"
                  value={newReviewForm.studentName}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, studentName: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#0B2A4A] font-bold mb-1">Unvanınız &amp; Şubeniz:</label>
                <input
                  type="text"
                  placeholder="Örn: Kadıköy Şube Müdür Yrd."
                  value={newReviewForm.studentRole}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, studentRole: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#0B2A4A] font-bold mb-1">Değerlendirilen Eğitim Programı:</label>
                <select
                  value={newReviewForm.courseTitle}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, courseTitle: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none font-bold"
                >
                  <option value="P&L Mağaza Bütçe Yönetimi & Fire Minimizasyonu">P&L Mağaza Bütçe Yönetimi &amp; Fire Minimizasyonu</option>
                  <option value="Kasiyer Müşteri Kriz Yönetimi & Kasa Hızı Ustalığı">Kasiyer Müşteri Kriz Yönetimi &amp; Kasa Hızı Ustalığı</option>
                  <option value="Çoklu Mağaza Operasyon Yönetimi & Liderlik">Çoklu Mağaza Operasyon Yönetimi &amp; Liderlik</option>
                  <option value="Taze Gıda & Hijyen Standartları Ustalığı">Taze Gıda &amp; Hijyen Standartları Ustalığı</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
                <div>
                  <label className="block text-amber-900 font-bold mb-1">Eğitim Puanı (1-5 ⭐):</label>
                  <select
                    value={newReviewForm.courseRating}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, courseRating: Number(e.target.value) })}
                    className="w-full p-2 bg-white border border-amber-300 rounded-xl text-xs font-bold text-amber-900 focus:outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5.0 - Mükemmel)</option>
                    <option value={4}>⭐⭐⭐⭐ (4.0 - Çok İyi)</option>
                    <option value={3}>⭐⭐⭐ (3.0 - Orta)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-amber-900 font-bold mb-1">Eğitmen Puanı (1-5 ⭐):</label>
                  <select
                    value={newReviewForm.trainerRating}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, trainerRating: Number(e.target.value) })}
                    className="w-full p-2 bg-white border border-amber-300 rounded-xl text-xs font-bold text-amber-900 focus:outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5.0 - Mükemmel)</option>
                    <option value={4}>⭐⭐⭐⭐ (4.0 - Çok İyi)</option>
                    <option value={3}>⭐⭐⭐ (3.0 - Orta)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#0B2A4A] font-bold mb-1">Eğitim ve Eğitmen Hakkındaki Yorumunuz:</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Dersin içeriği, anlatım tarzı ve sahadaki faydası hakkındaki samimi düşüncelerinizi yazın..."
                  value={newReviewForm.comment}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, comment: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none font-medium resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl cursor-pointer shadow-md flex items-center space-x-1.5"
                >
                  <Send className="h-4 w-4" />
                  <span>Değerlendirmeyi Yayınla</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
