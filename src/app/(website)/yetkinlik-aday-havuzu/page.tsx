'use client';

import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Building2, 
  Clock,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Star,
  UserCheck
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '@/data/departmentsData';
import { TALENT_POOL_CANDIDATES, TalentCandidate } from '@/data/talentPoolData';
import CandidateProfileModal from '@/components/CandidateProfileModal';

export default function CandidatePoolPage() {
  const [selectedDeptId, setSelectedDeptId] = useState<string>('Tümü');
  const [selectedCity, setSelectedCity] = useState<string>('Tümü');
  const [minScoreFilter, setMinScoreFilter] = useState<number>(80);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedCandidate, setSelectedCandidate] = useState<TalentCandidate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Filter candidates dynamically
  const filteredCandidates = useMemo(() => {
    return TALENT_POOL_CANDIDATES.filter((cand) => {
      const matchesDept = selectedDeptId === 'Tümü' || cand.deptId === selectedDeptId;
      const matchesCity = selectedCity === 'Tümü' || cand.city === selectedCity;
      const matchesScore = cand.competencyScore >= minScoreFilter;
      const matchesSearch = searchQuery === '' || 
        cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cand.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cand.currentCompany.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDept && matchesCity && matchesScore && matchesSearch;
    });
  }, [selectedDeptId, selectedCity, minScoreFilter, searchQuery]);

  const handleOpenCandidateModal = (cand: TalentCandidate) => {
    setSelectedCandidate(cand);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 w-full">
        
        {/* Header Hero Banner */}
        <div className="bg-gradient-to-r from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white p-8 sm:p-12 rounded-3xl border border-[#087F96]/30 shadow-xl text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-500/40 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>ONAYLI +80 PUAN BARAJI PERAKENDE ADAY HAVUZU</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Perakende Aday & Yetenek Havuzu
          </h1>

          <p className="text-gray-200 text-sm sm:text-base max-w-3xl mx-auto font-light leading-relaxed">
            Perakende Kariyer Akademisi eğitim ve sınavlarında <strong>+80 puan barajını aşmış</strong> nitelikli saha ve merkez yöneticisi adayları. Adayların yetkinlik karnesini, aldığı eğitimleri ve sertifikalarını incelemek için profil kartlarına tıklayabilirsiniz.
          </p>
        </div>

        {/* Search & HR Filter Controls */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Box */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Aday adı, pozisyon veya şirket ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#087F96] text-[#0B2A4A]"
              />
            </div>

            {/* Department Dropdown Filter */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto text-xs">
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-gray-500 font-bold whitespace-nowrap">Pozisyon / Kadro:</span>
                <select
                  value={selectedDeptId}
                  onChange={(e) => setSelectedDeptId(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-bold text-[#0B2A4A] focus:outline-none focus:ring-2 focus:ring-[#087F96] w-full sm:w-auto"
                >
                  <option value="Tümü">Tüm Perakende Kadroları (26 Pozisyon)</option>
                  {DEPARTMENTS_DATA.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name} (+80p Barajlı Adaylar)
                    </option>
                  ))}
                </select>
              </div>

              {/* City Filter */}
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-gray-500 font-bold whitespace-nowrap">Şehir:</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-bold text-[#0B2A4A] focus:outline-none focus:ring-2 focus:ring-[#087F96]"
                >
                  <option value="Tümü">Tüm Şehirler</option>
                  <option value="İstanbul">İstanbul</option>
                  <option value="Ankara">Ankara</option>
                  <option value="İzmir">İzmir</option>
                  <option value="Bursa">Bursa</option>
                  <option value="Antalya">Antalya</option>
                  <option value="Uşak">Uşak</option>
                  <option value="Gaziantep">Gaziantep</option>
                  <option value="Konya">Konya</option>
                  <option value="Kocaeli">Kocaeli</option>
                </select>
              </div>

              {/* Min Score Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 font-bold whitespace-nowrap">Min. Skor:</span>
                <select
                  value={minScoreFilter}
                  onChange={(e) => setMinScoreFilter(Number(e.target.value))}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-bold text-[#0B2A4A] focus:outline-none focus:ring-2 focus:ring-[#087F96]"
                >
                  <option value={80}>≥ 80 Puan Barajı</option>
                  <option value={85}>≥ 85 Puan (Yüksek Başarı)</option>
                  <option value={90}>≥ 90 Puan (Derece Yapanlar)</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Results Counter Toolbar */}
        <div className="flex items-center justify-between text-xs font-bold text-gray-600 bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <span>
            Toplam <strong className="text-[#0B2A4A] font-extrabold text-sm">{filteredCandidates.length}</strong> Onaylı Aday Listeleniyor
          </span>
          <span className="text-emerald-600 font-mono flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Tüm Adaylar +80p Pasaport Onaylıdır</span>
          </span>
        </div>

        {/* Candidate Cards Grid */}
        {filteredCandidates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((cand) => (
              <div
                key={cand.id}
                onClick={() => handleOpenCandidateModal(cand)}
                className="bg-white border-2 border-gray-200 hover:border-[#087F96] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-5 group cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Candidate Avatar & Score Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={cand.avatar}
                        alt={cand.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-[#087F96] shadow-md flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-extrabold text-base text-[#0B2A4A] group-hover:text-[#087F96] transition-colors">
                          {cand.name}
                        </h3>
                        <div className="text-xs text-gray-500 font-medium">{cand.currentCompany}</div>
                      </div>
                    </div>

                    <span className="bg-emerald-50 text-emerald-700 font-mono font-extrabold text-xs px-2.5 py-1 rounded-xl border border-emerald-200 shadow-xs flex-shrink-0">
                      {cand.competencyScore}/100 Puan
                    </span>
                  </div>

                  {/* Details Badges */}
                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-gray-700">
                      <span className="text-gray-400">Hedef Kadro:</span>
                      <strong className="text-[#0B2A4A] font-bold">{cand.departmentName}</strong>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <span className="text-gray-400">Lokasyon:</span>
                      <strong className="text-gray-800">{cand.city}</strong>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <span className="text-gray-400">Saha Tecrübesi:</span>
                      <strong className="text-gray-800">{cand.experienceYears} Yıl</strong>
                    </div>
                  </div>

                  {/* Completed Courses Summary */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#087F96] block">Tamamlanan Eğitimler:</span>
                    <div className="text-xs text-gray-600 font-light line-clamp-2">
                      {cand.completedCourses.map(c => c.title).join(' • ')}
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-600 font-mono font-bold flex items-center space-x-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>3 Onaylı Sertifika</span>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenCandidateModal(cand);
                    }}
                    className="px-3.5 py-2 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl transition-all flex items-center space-x-1 shadow-sm"
                  >
                    <span>Eğitim & Karnesini Gör</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3">
            <Users className="h-12 w-12 text-gray-300 mx-auto" />
            <h3 className="text-lg font-bold text-[#0B2A4A]">Seçilen Kriterlere Uygun Aday Bulunamadı</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Filtrelerinizi değiştirerek daha geniş aday listesine ulaşabilirsiniz.
            </p>
          </div>
        )}

        {/* Candidate Profile Modal */}
        <CandidateProfileModal
          candidate={selectedCandidate}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}
