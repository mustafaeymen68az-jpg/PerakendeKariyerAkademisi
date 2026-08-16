'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  Lock,
  Eye,
  Plus,
  MessageSquare,
  FileText,
  UserCheck,
  Award,
  Sparkles
} from 'lucide-react';

interface MentorshipSectionProps {
  userId?: string;
}

export default function MentorshipSection({ userId }: MentorshipSectionProps) {
  const [loading, setLoading] = useState(true);
  const [mentorship, setMentorship] = useState<any>(null);
  const [availableMentors, setAvailableMentors] = useState<any[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // New meeting form
  const [scheduledAt, setScheduledAt] = useState('');
  const [agenda, setAgenda] = useState('');
  const [employeeNotes, setEmployeeNotes] = useState('');
  const [privacyLevel, setPrivacyLevel] = useState('PRIVATE');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mentor Selector State
  const [showMentorSelector, setShowMentorSelector] = useState(false);
  const [selectedMentorUser, setSelectedMentorUser] = useState<any>({
    id: 'm1',
    name: 'Ahmet Karahan',
    title: 'Bölge Mentoru & Saha Direktörü',
    experience: '12 Yıl Perakende Deneyimi',
    expertise: ['Stok Yönetimi', 'Ekip Liderliği', 'Perakende Matematiği'],
    rating: '4.9 / 5.0',
    satisfactionScore: '%98 Memnuniyet',
    menteesCount: 14,
    department: 'Mağaza Operasyon'
  });

  // Detailed Mentor Profile Modal State
  const [showMentorProfileModal, setShowMentorProfileModal] = useState(false);
  const [activeProfileMentor, setActiveProfileMentor] = useState<any>(null);

  const getMentorDetailedProfile = (mentor: any) => {
    if (!mentor) return { bio: '', certificates: [], menteeReviews: [], generalAdvice: [] };
    const nameStr = mentor.name || 'Mentör';

    return {
      bio: `${nameStr}, perakende sektöründe ${mentor.experience || '10+ yıl deneyim'} ile bizzat sahada mağaza yönetimi, P&L optimizasyonu ve yetenek yetiştirme süreçlerini yönetmiştir. Perakende Akademisi bünyesinde ${mentor.menteesCount || 10} çalışan adayı ile birebir çalışarak %98'in üzerinde başarı memnuniyet skoruna ulaşmıştır.`,
      certificates: ['Senior Retail Coach Certification (ICF)', 'Mağaza P&L & Finans Uzmanlığı', 'Perakende İSG & İş Hukuku Denetçisi'],
      menteeReviews: [
        {
          menteeName: 'Ahmet Yılmaz',
          menteeTitle: 'Kasiyer ➔ Mağaza Müdür Yrd Adayı',
          rating: '5.0',
          date: '12 Temmuz 2026',
          comment: `${nameStr} ile yaptığımız seanslarda stok devir hızı hesabını ve mağaza içi fire kriz yönetimini bizzat uygulayarak öğrendim. Kasa hattı verimliliğimiz %25 arttı!`,
          mentorAdvice: 'Ahmet stok takibi konusunda çok disiplinli. Sadece kasa operasyonunda değil, reyon teşhir ve müşteri ilişki yönetimi konusunda da potansiyeli çok yüksek. Mağaza Müdür Yardımcılığı terfisine tam hazır!'
        },
        {
          menteeName: 'Merve Kaya',
          menteeTitle: 'Takım Lideri ➔ Mağaza Müdürü Adayı',
          rating: '4.9',
          date: '28 Haziran 2026',
          comment: 'Mağaza P&L tablosu ve puantaj giderlerini nasıl optimize edeceğimi mentorum sayesinde kavradım. Bölge denetimlerinde mağazam 98 puan aldı.',
          mentorAdvice: 'Merve analitik düşünen, sayısal perakende verilerine hakim harika bir lider adayı. Ekip içi iletişimi güçlü. Önümüzdeki dönem Bölge Müdürü terfi listesine girmesini tavsiye ediyorum.'
        },
        {
          menteeName: 'Mehmet Demir',
          menteeTitle: 'Reyon Uzmanı ➔ Takım Lideri',
          rating: '5.0',
          date: '14 Mayıs 2026',
          comment: 'Kariyerimde tıkanmış hissettiğim bir dönemde mentorumun yol haritası ve haftalık görev takibi sayesinde motivasyonum 2 katına çıktı.',
          mentorAdvice: 'Mehmet sahada yüksek enerjisi ve müşteri memnuniyeti odağı ile öne çıkıyor. Vardiya planlama eğitimlerini tamamladıktan sonra terfisini hızlandıracağız.'
        }
      ],
      generalAdvice: [
        '💡 "Bir mağazada başarı fireyi azaltmakla başlar; fire ise doğru mal kabul ve stok devir takibi ile önlenir."',
        '💡 "Kasa hattındaki her 1 saniyelik hızlanma, yıllık müşteri memnuniyet skorunuzu %15 artırır."',
        '💡 "Terfi almak istiyorsanız sadece kendi görevinizi değil, bir üst amirinizin sorumluluklarını da öğrenmeye gönüllü olun."'
      ]
    };
  };

  const loadMentorship = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/career-compass/mentorship?userId=${userId || ''}`).then((r) => r.json());
      if (res.success) {
        setMentorship(res.mentorship);
        setAvailableMentors(res.availableMentors || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMentorship();
  }, [userId]);

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorship) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/career-compass/mentorship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mentorshipId: mentorship.id,
          scheduledAt,
          agenda,
          employeeNotes,
          privacyLevel
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('Mentor randevunuz başarıyla oluşturuldu!');
        setShowScheduleModal(false);
        setAgenda('');
        setEmployeeNotes('');
        loadMentorship();
      }
    } catch (e) {
      console.error(e);
      alert('Randevu oluşturulurken bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-300 animate-pulse">
        Mentorluk verileri yükleniyor...
      </div>
    );
  }

  const mentorCandidates = [
    {
      id: 'm1',
      name: 'Ahmet Karahan',
      title: 'Bölge Mentoru & Saha Direktörü',
      experience: '12 Yıl Perakende Deneyimi',
      expertise: ['Stok Yönetimi', 'Ekip Liderliği', 'Perakende Matematiği'],
      rating: '4.9 / 5.0',
      satisfactionScore: '%98 Memnuniyet',
      menteesCount: 14,
      department: 'Mağaza Operasyon'
    },
    {
      id: 'm2',
      name: 'Zeynep Karahan',
      title: 'Saha İK Direktörü & Kariyer Koçu',
      experience: '10 Yıl İK & Yetenek Gelişim Deneyimi',
      expertise: ['Mülakat Teknikleri', 'Yetkinlik Değerlendirmesi', 'Terfi Süreçleri'],
      rating: '5.0 / 5.0',
      satisfactionScore: '%100 Memnuniyet',
      menteesCount: 18,
      department: 'İnsan Kaynakları'
    },
    {
      id: 'm3',
      name: 'Mustafa Eymen Kılıç',
      title: 'Kıdemli Mağaza Müdürü & Operasyon Koçu',
      experience: '15 Yıl Mağaza Operasyon Deneyimi',
      expertise: ['Mağaza P&L Yönetimi', 'Fire Azaltma', 'Kasa Hattı Verimliliği'],
      rating: '4.8 / 5.0',
      satisfactionScore: '%96 Memnuniyet',
      menteesCount: 12,
      department: 'Mağaza Yönetimi'
    },
    {
      id: 'm4',
      name: 'Selim Yıldırım',
      title: 'Kategori & Satın Alma Direktörü',
      experience: '14 Yıl Genel Merkez Deneyimi',
      expertise: ['Kategori Yönetimi', 'Tedarikçi Pazarlık', 'Planogram & Raf Düzeni'],
      rating: '4.9 / 5.0',
      satisfactionScore: '%98 Memnuniyet',
      menteesCount: 9,
      department: 'Satın Alma & Kategori'
    },
    {
      id: 'm5',
      name: 'Dr. Selin Öztürk',
      title: 'Tedarik Zinciri & Lojistik Bölge Müdürü',
      experience: '11 Yıl Depo & Lojistik Deneyimi',
      expertise: ['WMS Otomasyonu', 'Depo Güvenliği', 'Sevkiyat Rotalama & FIFO'],
      rating: '4.95 / 5.0',
      satisfactionScore: '%99 Memnuniyet',
      menteesCount: 11,
      department: 'Lojistik & Depo'
    },
    {
      id: 'm6',
      name: 'Caner Şahin',
      title: 'E-Ticaret & Dijital Saha Yöneticisi',
      experience: '8 Yıl Omnichannel Perakende Deneyimi',
      expertise: ['Hızlı Sipariş Toplama (Picking)', 'Kurye Operasyonu', 'Stok Senkronizasyonu'],
      rating: '4.85 / 5.0',
      satisfactionScore: '%97 Memnuniyet',
      menteesCount: 8,
      department: 'E-Ticaret & Dijital'
    },
    {
      id: 'm7',
      name: 'Ayşe Demir',
      title: 'Taze Gıda Kategori & Hijyen Baş Denetçisi',
      experience: '13 Yıl Taze Gıda Deneyimi',
      expertise: ['HACCP & Gıda Güvenliği', 'Soğuk Zincir Yönetimi', 'Manav/Şarküteri Teşhiri'],
      rating: '4.9 / 5.0',
      satisfactionScore: '%98 Memnuniyet',
      menteesCount: 15,
      department: 'Taze Gıda Akademisi'
    },
    {
      id: 'm8',
      name: 'Bülent Arslan',
      title: 'Görsel Mağazacılık & Merchandising Yöneticisi',
      experience: '16 Yıl Görsel Teşhir Deneyimi',
      expertise: ['Planogram Tasarımı', 'Insert & Kampanya Teşhiri', 'POP & Mağaza İçi Yönlendirme'],
      rating: '4.75 / 5.0',
      satisfactionScore: '%95 Memnuniyet',
      menteesCount: 7,
      department: 'Görsel Mağazacılık'
    }
  ];

  const handleSelectMentor = (mentor: any) => {
    setSelectedMentorUser(mentor);
    alert(`Tebrikler! ${mentor.name} mentor olarak seçildi ve talebiniz iletildi.`);
    setShowMentorSelector(false);
  };

  const mentorUser = selectedMentorUser || mentorship?.mentor || mentorCandidates[0];
  const meetings = mentorship?.meetings || [];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-[#0B2A4A] rounded-3xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-white shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold">Koçum / Mentorum Modülü &amp; Mentor Seçimi</h2>
            <p className="text-xs text-gray-300">Bölge mentorunuzu seçin, birebir görüşmeler planlayın ve gizlilik seviyelerini yönetin.</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowMentorSelector(true)}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer border border-white/20"
          >
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>Mentorunu Değiştir / Seç</span>
          </button>

          <button
            onClick={() => setShowScheduleModal(true)}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Mentor Randevusu Planla</span>
          </button>
        </div>
      </div>

      {/* Mentor Profile Card */}
      <div className="p-6 bg-[#0B2A4A] rounded-3xl border border-amber-400/30 text-white space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider">Atanmış Aktif Mentorum</span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
            Aktif Mentörlük 🟢 ({mentorUser.rating})
          </span>
        </div>

        <div
          onClick={() => {
            setActiveProfileMentor(mentorUser);
            setShowMentorProfileModal(true);
          }}
          className="flex items-center space-x-4 cursor-pointer group hover:bg-white/10 p-3 rounded-2xl transition-all border border-transparent hover:border-amber-400/30"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-black text-xl text-amber-300 shrink-0 group-hover:scale-105 transition-transform">
            {mentorUser.name ? mentorUser.name.charAt(0) : 'M'}
          </div>
          <div className="space-y-0.5">
            <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors flex items-center space-x-2">
              <span className="underline decoration-amber-400/50 underline-offset-4">{mentorUser.name}</span>
              <span className="text-xs text-amber-400 font-mono font-bold">👤 (Mentör Profil Sayfası ➔)</span>
            </h3>
            <p className="text-xs text-amber-300 font-medium">{mentorUser.title}</p>
            <p className="text-[11px] text-gray-300 mt-0.5">
              Uzmanlık: {Array.isArray(mentorUser.expertise) ? mentorUser.expertise.join(', ') : mentorUser.expertise}
            </p>
          </div>
        </div>
      </div>

      {/* MENTOR SELECTION MODAL (LIST VIEW) */}
      {showMentorSelector && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B2A4A] border border-amber-400/40 rounded-3xl p-6 sm:p-8 max-w-4xl w-full space-y-5 text-white shadow-2xl animate-in fade-in max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
              <div>
                <h3 className="text-lg font-extrabold text-amber-300 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-amber-400" />
                  <span>Kurumsal Mentor Kataloğu &amp; Mentor Seçimi</span>
                </h3>
                <p className="text-xs text-gray-300">Kariyer hedefinize uygun uzman mentoru seçerek birebir eşleşme talebi gönderin.</p>
              </div>
              <button
                onClick={() => setShowMentorSelector(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* SINGLE-COLUMN LIST VIEW */}
            <div className="space-y-3.5 text-xs overflow-y-auto pr-1 flex-1">
              {mentorCandidates.map((m) => (
                <div
                  key={m.id}
                  className="p-4 sm:p-5 bg-[#061B33] rounded-2xl border border-white/10 hover:border-amber-400/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group shadow-md"
                >
                  {/* Left Info: Avatar + Details */}
                  <div className="flex items-start space-x-4">
                    <div
                      onClick={() => {
                        setActiveProfileMentor(m);
                        setShowMentorProfileModal(true);
                      }}
                      className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-black text-lg text-amber-300 shrink-0 group-hover:scale-105 transition-transform cursor-pointer"
                    >
                      {m.name.charAt(0)}
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4
                          onClick={() => {
                            setActiveProfileMentor(m);
                            setShowMentorProfileModal(true);
                          }}
                          className="font-black text-white text-base hover:text-amber-300 hover:underline cursor-pointer transition-colors flex items-center space-x-1.5"
                        >
                          <span>{m.name}</span>
                          <span className="text-[10px] text-amber-400 font-mono font-normal"> (Profili Gör 👤)</span>
                        </h4>
                        <span className="px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-300 text-[10px] font-bold border border-amber-400/20">
                          {m.department}
                        </span>
                      </div>

                      <p className="text-amber-300 text-xs font-bold">{m.title}</p>
                      <p className="text-gray-300 text-[11px] font-mono">💼 {m.experience}</p>

                      {/* Mentorship Badges / Expertise Tag Pills */}
                      <div className="pt-1 flex flex-wrap gap-1.5">
                        <span className="text-[10px] text-gray-400 font-bold self-center mr-1">Yetkinlik Alanları:</span>
                        {m.expertise.map((exp, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-white/10 text-gray-200 rounded-md text-[10px] font-medium border border-white/10"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Stats & Action Button */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 pt-3 md:pt-0 border-white/10 gap-3 shrink-0">
                    {/* Stats Pill */}
                    <div className="flex items-center space-x-3 text-right">
                      <div className="text-right">
                        <div className="text-amber-300 font-black text-xs font-mono flex items-center justify-end space-x-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>{m.rating}</span>
                        </div>
                        <div className="text-[10px] text-emerald-300 font-bold">{m.satisfactionScore}</div>
                      </div>

                      <div className="h-6 w-px bg-white/15 hidden sm:block" />

                      <div className="text-left md:text-right">
                        <div className="text-white font-black text-xs font-mono flex items-center space-x-1">
                          <Users className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{m.menteesCount} Danışan</span>
                        </div>
                        <div className="text-[10px] text-gray-400 font-medium">Aktif Mentorluk</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setActiveProfileMentor(m);
                          setShowMentorProfileModal(true);
                        }}
                        className="px-3 py-2 bg-white/10 hover:bg-white/20 text-amber-300 font-bold rounded-xl text-xs flex items-center space-x-1 transition-all cursor-pointer border border-amber-400/30"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Profil &amp; Yorumlar</span>
                      </button>

                      <button
                        onClick={() => handleSelectMentor(m)}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
                      >
                        Bu Mentoru Seç &amp; Talep Gönder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DETAILED MENTOR PROFILE & REVIEWS MODAL */}
      {showMentorProfileModal && activeProfileMentor && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0B2A4A] border border-amber-400/40 rounded-3xl p-6 sm:p-8 max-w-3xl w-full space-y-6 text-white shadow-2xl animate-in fade-in max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center font-black text-2xl text-amber-300 shrink-0">
                  {activeProfileMentor.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-black text-white">{activeProfileMentor.name}</h3>
                    <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 font-mono text-[10px] font-bold border border-amber-400/30">
                      ★ {activeProfileMentor.rating}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-amber-300">{activeProfileMentor.title}</p>
                  <p className="text-[11px] text-gray-300 font-mono mt-0.5">
                    💼 {activeProfileMentor.experience} • 👥 {activeProfileMentor.menteesCount} Aktif Danışan
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowMentorProfileModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Mentor Bio & Qualifications */}
            <div className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-2">
              <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Mentör Biyografisi &amp; Uzmanlık Geçmişi</span>
              </h4>
              <p className="text-xs text-gray-200 leading-relaxed">
                {getMentorDetailedProfile(activeProfileMentor).bio}
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                {getMentorDetailedProfile(activeProfileMentor).certificates.map((cert, i) => (
                  <span key={i} className="px-2.5 py-1 bg-white/10 text-gray-200 rounded-lg text-[10px] font-semibold border border-white/10">
                    📜 {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Mentee Reviews & Mentor Advice Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>Mentörlük Yaptığı Çalışan Değerlendirmeleri &amp; Gelişim Notları</span>
              </h4>

              <div className="space-y-3 text-xs">
                {getMentorDetailedProfile(activeProfileMentor).menteeReviews.map((rev, idx) => (
                  <div key={idx} className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-2.5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 font-bold flex items-center justify-center text-xs">
                          {rev.menteeName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-extrabold text-white text-xs">{rev.menteeName}</div>
                          <div className="text-[10px] text-amber-300 font-mono">{rev.menteeTitle}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-amber-300 font-mono font-bold text-[11px]">★ {rev.rating} / 5.0</div>
                        <div className="text-[9px] text-gray-400">{rev.date}</div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase block">Çalışanın Mentörlük Yorumu:</span>
                        <p className="text-gray-300 text-xs italic mt-0.5">"{rev.comment}"</p>
                      </div>

                      <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-400/20 text-amber-200">
                        <span className="text-[10px] font-extrabold text-amber-300 uppercase block">Mentörün Gelişim Notu &amp; Tavsiyesi:</span>
                        <p className="text-xs text-amber-100 font-medium mt-0.5">{rev.mentorAdvice}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* General Advice & Tips */}
            <div className="p-4 bg-[#061B33] rounded-2xl border border-emerald-500/30 space-y-2">
              <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Mentörün Çalışanlara Altın Perakende Tavsiyeleri</span>
              </h4>
              <div className="space-y-1.5 text-xs text-gray-200">
                {getMentorDetailedProfile(activeProfileMentor).generalAdvice.map((adv, idx) => (
                  <div key={idx} className="p-2 bg-white/5 rounded-lg border border-white/5 font-medium">
                    {adv}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex justify-end space-x-3 pt-2 border-t border-white/10">
              <button
                onClick={() => setShowMentorProfileModal(false)}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-gray-300 font-bold rounded-xl text-xs cursor-pointer"
              >
                Kapat
              </button>
              <button
                onClick={() => {
                  handleSelectMentor(activeProfileMentor);
                  setShowMentorProfileModal(false);
                }}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <UserCheck className="w-4 h-4" />
                <span>{activeProfileMentor.name} İle Mentorluğa Başla</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scheduled & Past Meetings List */}
      <div className="p-6 bg-[#0B2A4A] rounded-3xl border border-white/10 text-white space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-extrabold text-amber-300 flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Mentor Görüşmeleri &amp; Toplantı Notları</span>
          </h3>
          <span className="text-xs font-mono text-gray-300">{meetings.length} Toplantı Kaydı</span>
        </div>

        <div className="space-y-3 text-xs">
          {meetings.map((m: any, idx: number) => (
            <div key={idx} className="p-4 bg-[#061B33] rounded-2xl border border-white/10 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
                <div className="font-extrabold text-white text-xs sm:text-sm flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{m.agenda || 'Gelişim & Vaka Değerlendirmesi'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-white/10 text-gray-300 font-mono text-[10px]">
                    {new Date(m.scheduledAt).toLocaleDateString('tr-TR')}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/30">
                    {m.privacyLevel === 'PRIVATE' ? '🔒 Özel (Sadece Mentor)' : '👁️ Yöneticim Görebilir'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 block uppercase">Çalışanın Görüşme Öncesi Notları:</span>
                  <p className="text-gray-200 text-xs mt-0.5">{m.employeeNotes || 'Not eklenmedi.'}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-300 block uppercase">Mentorun Tavsiye Notları:</span>
                  <p className="text-gray-200 text-xs mt-0.5">{m.mentorNotes || 'Görüşme zamanı bekleniyor.'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B2A4A] border border-amber-400/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 text-white shadow-2xl animate-in fade-in">
            <h3 className="text-base font-extrabold text-amber-300">Yeni Mentor Görüşmesi Planla</h3>

            <form onSubmit={handleScheduleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 mb-1 font-bold">Tarih &amp; Saat</label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-bold">Görüşme Gündemi / Konusu</label>
                <input
                  type="text"
                  value={agenda}
                  onChange={(e) => setAgenda(e.target.value)}
                  placeholder="Örn: Stok Devir Hızı Hesabı & Mağaza Müdürlüğü Hedefleri"
                  className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-bold">Görüşme Öncesi Hazırlık Notlarınız</label>
                <textarea
                  rows={3}
                  value={employeeNotes}
                  onChange={(e) => setEmployeeNotes(e.target.value)}
                  placeholder="Mentörünüze danışmak istediğiniz konular..."
                  className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-bold">Gizlilik Seviyesi</label>
                <select
                  value={privacyLevel}
                  onChange={(e) => setPrivacyLevel(e.target.value)}
                  className="w-full bg-[#061B33] border border-white/15 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-amber-400"
                >
                  <option value="PRIVATE">Sadece Mentor Görsün (Gizli Özel Not)</option>
                  <option value="MANAGER_READ">Mağaza Yöneticim ve İK da Görebilsin</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 bg-white/10 text-gray-300 font-bold rounded-xl"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl"
                >
                  {isSubmitting ? 'Kaydediliyor...' : 'Randevuyu Oluştur'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
