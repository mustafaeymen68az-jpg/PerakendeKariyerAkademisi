import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Sliders, 
  MessageSquareCode, 
  LayoutDashboard, 
  ChevronRight, 
  Clock, 
  Award, 
  TrendingUp, 
  Users, 
  MapPin, 
  Globe, 
  Sparkles,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import Courses from './components/Courses';
import KPISimulator from './components/KPISimulator';
import AITutor from './components/AITutor';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [enrolledCourses, setEnrolledCourses] = useState([1]); // pre-enroll in course 1 for better initial dashboard UI
  const [studyHours, setStudyHours] = useState(14.5);
  const [quizScore, setQuizScore] = useState(88);

  const handleEnroll = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses((prev) => [...prev, courseId]);
      // Increment study hours or add simulator activity simulation
      setStudyHours((prev) => prev + 2);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return <Courses enrolledCourses={enrolledCourses} onEnroll={handleEnroll} />;
      case 'simulator':
        return <KPISimulator />;
      case 'tutor':
        return <AITutor />;
      case 'dashboard':
        return renderDashboard();
      case 'home':
      default:
        return renderHero();
    }
  };

  const renderHero = () => (
    <div style={{ animation: 'fadeInUp 0.6s ease' }}>
      {/* Hero Banner Area */}
      <div style={{ 
        position: 'relative', 
        padding: '5rem 0 4rem 0', 
        background: 'var(--gradient-hero)', 
        borderRadius: '24px',
        overflow: 'hidden',
        marginBottom: '4rem',
        border: '1px solid rgba(99, 102, 241, 0.1)'
      }}>
        {/* Decorative background grid element */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          zIndex: 0
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '750px' }}>
            <span className="badge badge-indigo" style={{ marginBottom: '1.25rem', padding: '0.4rem 1rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={14} style={{ color: 'var(--color-success)' }} /> Geleceğin Perakende Liderleri Burada Yetişiyor
            </span>
            <h1 style={{ 
              fontSize: '3.6rem', 
              lineHeight: '1.15', 
              fontWeight: '800', 
              fontFamily: 'var(--font-display)', 
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Veri ve Mühendislikle<br />Perakendeyi Yeniden Tasarlayın
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6', maxWidth: '650px' }}>
              Klasik perakende pratiklerini modern mühendislik metodolojileri, yöneylem modelleri, veri bilimi ve envanter optimizasyonuyla birleştiriyoruz. Sektörün en prestijli eğitim akademisine hoş geldiniz.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => setActiveTab('courses')} className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
                Eğitimleri Keşfet <ChevronRight size={18} />
              </button>
              <button onClick={() => setActiveTab('simulator')} className="btn btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
                KPI Simülatörünü Dene
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Pillars Section */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2.5rem' }}>
          Akademimizin Temel Odak Alanları
        </h2>
        <div className="grid-3">
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--color-accent)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifySelf: 'start', justifyContent: 'center' }}>
              <TrendingUp size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>İleri Perakende Analitiği</h3>
            <p style={{ fontSize: '0.9rem' }}>
              Mağaza içi müşteri trafikleri, sepet yapıları, brüt marjlar ve GMROI gibi kritik performans göstergelerini matematiksel modellerle analiz edin.
            </p>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--color-success)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifySelf: 'start', justifyContent: 'center' }}>
              <Sliders size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Envanter Optimizasyonu</h3>
            <p style={{ fontSize: '0.9rem' }}>
              Ekonomik Sipariş Miktarı (EOQ), emniyet stoku formülasyonları ve tedarik zincirinde yok satma/fazla stok bulundurma maliyetlerinin matematiksel optimizasyonu.
            </p>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifySelf: 'start', justifyContent: 'center' }}>
              <Users size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Operasyonel Çeviklik</h3>
            <p style={{ fontSize: '0.9rem' }}>
              Saha ve mağaza içi verimliliği artırmak için iş etütleri, süreç kuyruk modelleri, iş gücü optimizasyonları ve yalın perakende yönetimi prensipleri.
            </p>
          </div>
        </div>
      </div>

      {/* Simulator Highlight Banner */}
      <div className="glass-card" style={{ 
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(16, 185, 129, 0.04) 100%)',
        padding: '3rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '20px',
        marginBottom: '4rem'
      }}>
        <div style={{ flex: '1 1 450px' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '1rem' }}>Uygulamalı Simülasyon Laboratuvarı</span>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#fff' }}>Kararlarınızın Mağazayı Nasıl Etkilediğini Görün</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            Eğitimlerde öğrendiğiniz teorik envanter modelleri, marj hesaplamaları ve personel kapasite optimizasyonlarını entegre KPI simülasyon motorumuzda anında test edin. Fiyat belirleyin, sipariş verin, personel atayın ve karınızı maksimize edin!
          </p>
        </div>
        <button onClick={() => setActiveTab('simulator')} className="btn btn-success" style={{ padding: '0.85rem 1.75rem' }}>
          Simülatöre Giriş Yap
        </button>
      </div>

      {/* Quick Statistics Banner */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', borderTop: '1px solid var(--color-card-border)', paddingTop: '3rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}>1,200+</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Mezun Perakende Mühendisi</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#fff' }}>94%</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Kariyer İlerleme Oranı</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--color-success)' }}>5+</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Sektörel Uzmanlık Modülü</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#fff' }}>100%</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Çevrimiçi & Esnek Öğrenim</p>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div style={{ animation: 'fadeInUp 0.6s ease' }}>
      {/* Dashboard Welcome Header */}
      <div style={{ marginBottom: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '0.5rem' }}>Öğrenci Kontrol Paneli</h2>
          <p>Kayıtlı olduğunuz eğitimlerin ilerleme durumunu ve akademik performans metriklerinizi buradan takip edin.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', background: 'rgba(255,255,255,0.02)', padding: '0.5rem 1rem', borderRadius: '10px', border: '1px solid var(--color-card-border)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <MapPin size={14} style={{ color: 'var(--color-accent)' }} /> İstanbul, TR
          </span>
          <span style={{ color: 'var(--color-card-border)' }}>|</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Globe size={14} style={{ color: 'var(--color-success)' }} /> GMT+3
          </span>
        </div>
      </div>

      {/* Main Student Performance Stats */}
      <div className="metrics-grid" style={{ marginBottom: '2.5rem' }}>
        <div className="metric-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', textAlign: 'left' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--color-accent)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Clock size={24} />
          </div>
          <div>
            <div className="metric-label" style={{ marginBottom: '0.15rem' }}>Toplam Çalışma</div>
            <div className="metric-value" style={{ fontSize: '1.6rem', color: '#fff' }}>{studyHours} Saat</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-success)' }}>+2.4 Saat Bu Hafta</div>
          </div>
        </div>

        <div className="metric-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', textAlign: 'left' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--color-success)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Award size={24} />
          </div>
          <div>
            <div className="metric-label" style={{ marginBottom: '0.15rem' }}>Quiz Başarı Puanı</div>
            <div className="metric-value" style={{ fontSize: '1.6rem', color: '#fff' }}>{quizScore}%</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sınıf Ortalaması: 74%</div>
          </div>
        </div>

        <div className="metric-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', textAlign: 'left' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--color-warning)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Trophy size={24} />
          </div>
          <div>
            <div className="metric-label" style={{ marginBottom: '0.15rem' }}>Akademi Derecesi</div>
            <div className="metric-value" style={{ fontSize: '1.6rem', color: '#fff' }}>4 / 120</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-warning)' }}>İlk %5 Dilimdesiniz</div>
          </div>
        </div>
      </div>

      {/* Registered Courses Grid and Leaderboard layout */}
      <div className="grid-2" style={{ gap: '2rem', alignItems: 'start' }}>
        
        {/* Left Side: Enrolled Courses Detail */}
        <div className="glass-card" style={{ background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#fff', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={18} style={{ color: 'var(--color-accent)' }} /> Kayıtlı Eğitimleriniz ({enrolledCourses.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {enrolledCourses.includes(1) && (
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-card-border)', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff' }}>Perakende Analitiği ve Metrik Hesaplama</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-success)', fontWeight: '600' }}>%65 Tamamlandı</span>
                </div>
                {/* Progress bar */}
                <div style={{ width: '100%', height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', marginBottom: '0.75rem', overflow: 'hidden' }}>
                  <div style={{ width: '65%', height: '100%', background: 'linear-gradient(90deg, var(--color-accent) 0%, var(--color-success) 100%)', borderRadius: '3px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <span>Tamamlanan: 4 / 6 Hafta</span>
                  <button onClick={() => setActiveTab('courses')} style={{ background: 'none', border: 'none', color: 'var(--color-accent)', cursor: 'pointer', fontWeight: '500' }}>Öğrenime Devam Et</button>
                </div>
              </div>
            )}

            {enrolledCourses.includes(2) && (
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-card-border)', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff' }}>Stok ve Envanter Optimizasyonu</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: '600' }}>%15 Tamamlandı</span>
                </div>
                {/* Progress bar */}
                <div style={{ width: '100%', height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', marginBottom: '0.75rem', overflow: 'hidden' }}>
                  <div style={{ width: '15%', height: '100%', background: 'var(--color-accent)', borderRadius: '3px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <span>Tamamlanan: 1 / 8 Hafta</span>
                  <button onClick={() => setActiveTab('courses')} style={{ background: 'none', border: 'none', color: 'var(--color-accent)', cursor: 'pointer', fontWeight: '500' }}>Öğrenime Devam Et</button>
                </div>
              </div>
            )}

            {enrolledCourses.length === 1 && enrolledCourses.includes(1) && (
              <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(99, 102, 241, 0.03)', border: '1px dashed var(--color-card-border)', borderRadius: '10px' }}>
                <p style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>Akademik profilinizi güçlendirmek için yeni modüllere kaydolun!</p>
                <button onClick={() => setActiveTab('courses')} className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Katalogu Gez</button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Leaderboard and Certifications */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Certificate showcase */}
          <div className="glass-card" style={{ background: 'var(--bg-secondary)', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#fff', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.75rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} style={{ color: 'var(--color-warning)' }} /> Sertifikalarınız (1)
            </h3>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              background: 'rgba(245, 158, 11, 0.05)', 
              border: '1px solid rgba(245, 158, 11, 0.2)', 
              borderRadius: '10px', 
              padding: '1rem' 
            }}>
              <div style={{ 
                background: 'linear-gradient(135deg, var(--color-warning) 0%, #d97706 100%)', 
                color: '#fff', 
                width: '40px', 
                height: '40px', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <CheckCircle2 size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fff', display: 'block' }}>Perakende Metrik Uzmanlığı Giriş Belgesi</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Veriliş: 12.06.2026 • Doğrulama Kodu: RE-8849-TR</span>
              </div>
            </div>
          </div>

          {/* Academic Leaderboard mock */}
          <div className="glass-card" style={{ background: 'var(--bg-secondary)', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#fff', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.75rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Trophy size={18} style={{ color: 'var(--color-accent)' }} /> Haftalık Akademi Liderlik Tablosu
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.4rem 0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>1. Melis A. (1240 Puan)</span>
                <span style={{ color: 'var(--color-success)', fontWeight: '600' }}>98% Sınav</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.4rem 0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>2. Görkem K. (1190 Puan)</span>
                <span style={{ color: 'var(--color-success)', fontWeight: '600' }}>94% Sınav</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.4rem 0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>3. Selçuk B. (1150 Puan)</span>
                <span style={{ color: 'var(--color-success)', fontWeight: '600' }}>90% Sınav</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.5rem 0.75rem', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '6px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                <span style={{ fontWeight: '600', color: '#fff' }}>4. Selim K. (Siz - 1120 Puan)</span>
                <span style={{ color: '#fff', fontWeight: '700' }}>88% Sınav</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Top Header & Navbar */}
      <header style={{ 
        height: 'var(--header-height)', 
        borderBottom: '1px solid var(--color-card-border)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100, 
        backdropFilter: 'var(--glass-blur)', 
        WebkitBackdropFilter: 'var(--glass-blur)',
        background: 'rgba(11, 15, 25, 0.8)'
      }}>
        <div className="container" style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          >
            <div style={{ background: 'var(--gradient-tech)', p: 1, borderRadius: '10px', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)' }}>
              <GraduationCap size={20} />
            </div>
            <div>
              <span style={{ fontSize: '1.15rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '0.02em', display: 'block', lineHeight: '1.2' }}>PERAKENDE MÜHENDİSİ</span>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--color-success)', fontWeight: '700', display: 'block', textTransform: 'uppercase' }}>Eğitim Akademisi</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button 
              onClick={() => setActiveTab('home')}
              className="btn"
              style={{ 
                padding: '0.5rem 1rem', 
                fontSize: '0.85rem',
                background: activeTab === 'home' ? 'rgba(255,255,255,0.05)' : 'transparent',
                color: activeTab === 'home' ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '6px'
              }}
            >
              Ana Sayfa
            </button>
            <button 
              onClick={() => setActiveTab('courses')}
              className="btn"
              style={{ 
                padding: '0.5rem 1rem', 
                fontSize: '0.85rem',
                background: activeTab === 'courses' ? 'rgba(255,255,255,0.05)' : 'transparent',
                color: activeTab === 'courses' ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '6px'
              }}
            >
              Eğitimler
            </button>
            <button 
              onClick={() => setActiveTab('simulator')}
              className="btn"
              style={{ 
                padding: '0.5rem 1rem', 
                fontSize: '0.85rem',
                background: activeTab === 'simulator' ? 'rgba(255,255,255,0.05)' : 'transparent',
                color: activeTab === 'simulator' ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Sliders size={14} /> KPI Simülatörü
            </button>
            <button 
              onClick={() => setActiveTab('tutor')}
              className="btn"
              style={{ 
                padding: '0.5rem 1rem', 
                fontSize: '0.85rem',
                background: activeTab === 'tutor' ? 'rgba(255,255,255,0.05)' : 'transparent',
                color: activeTab === 'tutor' ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <MessageSquareCode size={14} /> AI Eğitmen
            </button>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="btn"
              style={{ 
                padding: '0.5rem 1rem', 
                fontSize: '0.85rem',
                background: activeTab === 'dashboard' ? 'rgba(255,255,255,0.05)' : 'transparent',
                color: activeTab === 'dashboard' ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <LayoutDashboard size={14} /> Öğrenci Paneli
            </button>
          </nav>
        </div>
      </header>

      {/* Main Page Content Body */}
      <main style={{ flexGrow: 1, padding: '3rem 0' }}>
        <div className="container">
          {renderContent()}
        </div>
      </main>

      {/* Footer Area */}
      <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--color-card-border)', padding: '3rem 0', color: 'var(--text-secondary)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{ maxWidth: '300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <GraduationCap size={24} style={{ color: 'var(--color-accent)' }} />
                <span style={{ fontWeight: '700', color: '#fff', fontSize: '1.1rem' }}>PERAKENDE MÜHENDİSİ</span>
              </div>
              <p style={{ fontSize: '0.85rem' }}>
                Türkiye'nin ilk ve tek perakende mühendisliği eğitim ve simülasyon akademisi. Sektöre yön veren analitik beyinler yetiştirir.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '4rem' }}>
              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hızlı Linkler</h4>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Ana Sayfa</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('courses'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Eğitimler</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('simulator'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>KPI Simülatörü</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('tutor'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Yapay Zeka Danışmanı</a></li>
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>İletişim</h4>
                <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                  info@perakendemuh.org<br />
                  Kadıköy, İstanbul / Türkiye
                </p>
              </div>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid var(--color-card-border)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>© {new Date().getFullYear()} Perakende Mühendisi Eğitim Akademisi. Tüm Hakları Saklıdır.</span>
            <span>Veriyle Yönetilen, Matematikle Güçlenen Sektör.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
