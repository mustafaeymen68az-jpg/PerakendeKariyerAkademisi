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
  AlertCircle
} from 'lucide-react';

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

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  const isProfileComplete = name && title && education && experience && bio;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full w-fit mb-1">
            <User className="h-3.5 w-3.5" />
            <span>Zorunlu Eğitmen Profil & Özgeçmiş Modülü</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#0B2A4A]">
            Eğitmen Profili ve Özgeçmiş Bilgileri
          </h2>
          <p className="text-xs text-gray-500 font-light mt-0.5">
            Eğitmen profilinizi, eğitim geçmişinizi (okuduğunuz okullar), kariyer tecrübelerinizi ve CV dosyanızı tanımlayın.
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
                <label className="block text-[#0B2A4A] font-bold mb-1">Unvan & Akademik Sıfat (Zorunlu):</label>
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
              <label className="block text-[#0B2A4A] font-bold mb-1">Biyografi Özeti & Kendinizi Tanıtın (Zorunlu):</label>
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
              className="w-full py-3.5 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-xs"
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
    </div>
  );
}
