import React, { useState } from 'react';
import { Search, BookOpen, Clock, BarChart, X, CheckCircle, GraduationCap } from 'lucide-react';

const COURSES_DATA = [
  {
    id: 1,
    title: 'Perakende Analitiği ve Metrik Hesaplama',
    category: 'Analitik',
    duration: '6 Hafta',
    level: 'Başlangıç',
    levelClass: 'badge-indigo',
    summary: 'Perakendede veri odaklı karar almanın temelleri. Marj, GMROI ve stok devir hızı gibi kritik KPI hesaplamaları.',
    description: 'Bu eğitimde, perakende sektöründe faaliyet gösteren mühendislerin bilmesi gereken temel finansal ve operasyonel metrikleri öğreneceksiniz. Excel ve veri tabanı sorgularıyla brüt kar marjı, metrekare verimliliği ve sepet büyüklüğü analizleri gibi gerçek hayat senaryoları üzerinde çalışacaksınız.',
    curriculum: [
      'Hafta 1: Perakende Dünyasında Mühendislik Yaklaşımı ve Verinin Önemi',
      'Hafta 2: Karlılık Metrikleri: Marj, Mark-up ve GMROI (Brüt Kar Stok Yatırım Getirisi)',
      'Hafta 3: Satış Alanı Performans Analizleri: Metrekare Başına Ciro ve Yoğunluk',
      'Hafta 4: Stok Performans Metrikleri: Envanter Devir Hızı ve Günlük Stok (DOH)',
      'Hafta 5: Müşteri Davranış Metrikleri: Sepet Büyüklüğü, Dönüşüm Oranı ve Trafik Analizi',
      'Hafta 6: Uygulamalı Dashboard Tasarımı ve Raporlama Temelleri'
    ],
    skills: ['Metrik Analizi', 'Veri Görselleştirme', 'Finansal Modelleme', 'Raporlama'],
    instructor: 'Yrd. Doç. Dr. Ahmet Yılmaz (Eski Perakende Direktörü)'
  },
  {
    id: 2,
    title: 'Stok ve Envanter Optimizasyonu',
    category: 'Operasyon',
    duration: '8 Hafta',
    level: 'Orta',
    levelClass: 'badge-warning',
    summary: 'EOQ modelleri, emniyet stoku hesaplamaları ve talep tahminleme ile envanter maliyetlerini minimize etme.',
    description: 'Envanter yönetimi, perakende şirketlerinin nakit akışını doğrudan etkiler. Bu derste, matematiksel optimizasyon modellerini kullanarak ne zaman ve ne kadar sipariş verilmesi gerektiğini hesaplayacak, servis seviyesini yüksek tutarken stok bulundurma maliyetlerini nasıl düşüreceğinizi öğreneceksiniz.',
    curriculum: [
      'Hafta 1: Envanter Türleri ve Stok Maliyet Bileşenleri (Elde Tutma, Sipariş Verme, Yok Satma)',
      'Hafta 2: Ekonomik Sipariş Miktarı (EOQ) ve Ekonomik Üretim Miktarı (EPQ) Modelleri',
      'Hafta 3: Belirsizlik Altında Envanter Yönetimi ve Emniyet Stoku (Safety Stock) Hesaplama',
      'Hafta 4: Servis Seviyesi Optimizasyonu ve Dağılım Modelleri',
      'Hafta 5: Sürekli ve Periyodik Envanter Gözden Geçirme Politikaları (s,Q ve s,S sistemleri)',
      'Hafta 6: Kategori Bazlı Stok Yönetimi: ABC/XYZ Analizi ve Önceliklendirme',
      'Hafta 7: Promosyon Dönemlerinde Stok Yönetimi ve Kamçı Etkisi (Bullwhip Effect) Engelleme',
      'Hafta 8: Gerçek Dünya Senaryolarıyla Envanter Optimizasyon Simülasyonu Projesi'
    ],
    skills: ['Envanter Yönetimi', 'Yöneylem Araştırması', 'Olasılık & İstatistik', 'EOQ Modelleme'],
    instructor: 'Mühendis Hakan Demir (Tedarik Zinciri Optimizasyon Müdürü)'
  },
  {
    id: 3,
    title: 'Büyük Veri ve Müşteri Analitiği',
    category: 'Analitik',
    duration: '10 Hafta',
    level: 'İleri',
    levelClass: 'badge-emerald',
    summary: 'Python ve SQL ile sepet analizi, RFM segmentasyonu ve müşteri yaşam boyu değeri (CLV) hesaplama.',
    description: 'Müşteri davranışlarını anlamak, kişiselleştirilmiş pazarlama ve doğru ürün konumlandırması için elzemdir. Bu ileri düzey eğitimde, milyonlarca satırdan oluşan perakende satış verilerini işleyerek pazar sepeti analizi (Birliktelik Kuralları) yapacak ve makine öğrenmesi modelleri geliştireceksiniz.',
    curriculum: [
      'Hafta 1: Perakendede Büyük Veri Teknolojileri ve SQL Temelleri',
      'Hafta 2: Satış Verisi Ön İşleme ve Temizleme Adımları (Python & Pandas)',
      'Hafta 3: RFM (Yenilik, Sıklık, Parasal Değer) Analizi ile Müşteri Segmentasyonu',
      'Hafta 4: Birliktelik Kuralları Analizi (Association Rule Mining) ve Apriori Algoritması',
      'Hafta 5: Öneri Sistemleri: Müşteriye Özel Ürün Tavsiye Motorları',
      'Hafta 6: Müşteri Yaşam Boyu Değeri (Customer Lifetime Value - CLV) Tahminleme',
      'Hafta 7: Müşteri Kayıp (Churn) Analizi ve Makine Öğrenmesi ile Sınıflandırma',
      'Hafta 8: A/B Testleri ile Kampanya Verimliliği Ölçümleme',
      'Hafta 9: Lokasyon Analitiği: Yeni Mağaza Yeri Seçimi ve Demografi Modelleme',
      'Hafta 10: Uçtan Uca Müşteri Analitiği Projesi Sunumu ve Değerlendirme'
    ],
    skills: ['Python', 'SQL', 'Makine Öğrenmesi', 'Müşteri Segmentasyonu', 'Sepet Analizi'],
    instructor: 'Dr. Selin Kaya (Veri Bilimi Yöneticisi)'
  },
  {
    id: 4,
    title: 'Tedarik Zinciri ve Lojistik Yönetimi',
    category: 'Lojistik',
    duration: '6 Hafta',
    level: 'Orta',
    levelClass: 'badge-warning',
    summary: 'Dağıtım merkezlerinden mağazalara rota optimizasyonu, depo tasarımı ve omnichannel lojistiği.',
    description: 'Fiziksel ürünlerin doğru zamanda doğru yerde olması perakendenin can damarıdır. Bu derste lojistik ağ tasarımlarını, depo içi yerleşim optimizasyonunu, araç rotalama algoritmalarını ve modern e-ticaret lojistiğinin operasyonel süreçlerini inceleyeceğiz.',
    curriculum: [
      'Hafta 1: Küresel Tedarik Zinciri Yapıları ve Perakende Lojistiğine Giriş',
      'Hafta 2: Depo Yönetim Sistemleri (WMS) ve Depo İçi Yerleşim (Layout) Optimizasyonu',
      'Hafta 3: Sipariş Toplama (Picking) Algoritmaları ve Rota Planlama',
      'Hafta 4: Araç Rotalama Problemleri (VRP) ve Dağıtım Optimizasyonu',
      'Hafta 5: Çok Kanallı (Omnichannel) Perakende Lojistiği ve Mağazadan Gönderim (Ship-from-Store)',
      'Hafta 6: Tedarik Zincirinde Sürdürülebilirlik ve Yeşil Lojistik Uygulamaları'
    ],
    skills: ['Tedarik Zinciri', 'Lojistik', 'Rota Optimizasyonu', 'Depo Yönetimi'],
    instructor: 'Caner Özkan (Lojistik ve Dağıtım Operasyonları Direktörü)'
  },
  {
    id: 5,
    title: 'Perakende Operasyonlarında Çevik Liderlik',
    category: 'Liderlik',
    duration: '4 Hafta',
    level: 'Başlangıç',
    levelClass: 'badge-indigo',
    summary: 'Mağaza operasyonlarında yalın yönetim ilkeleri, saha yönetimi ve KPI odaklı motivasyon modelleri.',
    description: 'Mühendislik formasyonunu saha operasyonlarına entegre ederek mükemmelliği yakalayın. Yalın mağaza yönetimi teknikleri, zaman etütleri, israfların önlenmesi ve yüksek performanslı ekiplerin yönetimi konularında yetkinlik kazanın.',
    curriculum: [
      'Hafta 1: Mağaza İçi Yalın Yönetim (Lean Store) ve 5S Metodolojisi',
      'Hafta 2: Zaman Etütleri, Standart İş Oluşturma ve Personel Verimliliği Planlaması',
      'Hafta 3: Operasyonel İsrafların (Muda) Tespiti ve Kaizen Çalışmaları',
      'Hafta 4: KPI ve OKR Temelli Performans Yönetimi ve Liderlik Becerileri'
    ],
    skills: ['Yalın Yönetim', 'Liderlik', 'Süreç Optimizasyonu', 'KPI/OKR Yönetimi'],
    instructor: 'Meltem Şahin (İnsan Kaynakları ve Saha Geliştirme Müdürü)'
  }
];

export default function Courses({ enrolledCourses, onEnroll }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tüm Dersler');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const categories = ['Tüm Dersler', 'Analitik', 'Operasyon', 'Lojistik', 'Liderlik'];

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tüm Dersler' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ animation: 'fadeInUp 0.6s ease' }}>
      {/* Header section */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(90deg, #fff 0%, var(--text-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
          Eğitim Programları
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Endüstri standartlarında müfredat ve gerçek veri senaryoları ile tasarlanmış, perakende mühendisliği sertifika programlarımızı inceleyin.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Category filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="btn"
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                borderRadius: '6px',
                background: selectedCategory === category ? 'var(--color-accent)' : 'rgba(255,255,255,0.03)',
                color: selectedCategory === category ? '#fff' : 'var(--text-secondary)',
                border: selectedCategory === category ? '1px solid var(--color-accent)' : '1px solid var(--color-card-border)',
                transition: 'all 0.2s ease'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Eğitim veya beceri ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              borderRadius: '8px',
              border: '1px solid var(--color-card-border)',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '0.9rem',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--color-card-border)'}
          />
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid-3">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledCourses.includes(course.id);
            return (
              <div 
                key={course.id} 
                className="glass-card" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Visual gradient accent on card top */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--gradient-tech)' }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '0.5rem' }}>
                  <span className="badge badge-indigo">{course.category}</span>
                  <span className={`badge ${course.levelClass}`}>{course.level}</span>
                </div>
                
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', height: '3.6rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>
                  {course.title}
                </h3>
                
                <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {course.summary}
                </p>
                
                <div style={{ borderTop: '1px solid var(--color-card-border)', paddingTop: '1rem', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={14} style={{ color: 'var(--color-accent)' }} />
                    <span>{course.duration}</span>
                  </div>
                  {isEnrolled ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-success)', fontWeight: '600' }}>
                      <CheckCircle size={14} />
                      <span>Kayıtlı</span>
                    </div>
                  ) : null}
                </div>
                
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                  <button 
                    onClick={() => setSelectedCourse(course)}
                    className="btn btn-secondary" 
                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem', justifyContent: 'center' }}
                  >
                    Detayları İncele
                  </button>
                  {!isEnrolled ? (
                    <button 
                      onClick={() => onEnroll(course.id)}
                      className="btn btn-primary" 
                      style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem', justifyContent: 'center' }}
                    >
                      Kayıt Ol
                    </button>
                  ) : (
                    <button 
                      disabled
                      className="btn" 
                      style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', color: 'var(--text-muted)', border: '1px solid var(--color-card-border)', cursor: 'default' }}
                    >
                      Katıldınız
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <GraduationCap size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Arama Sonucu Bulunamadı</h4>
          <p>Kriterlerinize uygun eğitim bulunamadı. Lütfen arama terimini değiştirin veya başka bir kategori seçin.</p>
        </div>
      )}

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '1.5rem',
          animation: 'fadeInUp 0.3s ease'
        }}>
          <div className="glass-card" style={{
            width: '100%',
            maxWidth: '750px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            background: 'var(--bg-secondary)',
            borderColor: 'rgba(99, 102, 241, 0.4)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            padding: '2.5rem'
          }}>
            {/* Close button */}
            <button 
              onClick={() => setSelectedCourse(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--color-card-border)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
              <span className="badge badge-indigo">{selectedCourse.category}</span>
              <span className={`badge ${selectedCourse.levelClass}`}>{selectedCourse.level}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginLeft: 'auto' }}>
                <Clock size={14} /> {selectedCourse.duration}
              </span>
            </div>

            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#fff' }}>
              {selectedCourse.title}
            </h2>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1rem', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '1.5rem' }}>
              {selectedCourse.description}
            </p>

            <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-success)' }}>
                  <BookOpen size={16} /> Ders Müfredatı
                </h4>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {selectedCourse.curriculum.map((week, idx) => (
                    <li key={idx} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', paddingLeft: '1rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent)' }}>•</span>
                      {week}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent)' }}>
                  <BarChart size={16} /> Kazanılacak Beceriler
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {selectedCourse.skills.map((skill) => (
                    <span key={skill} className="badge" style={{ background: 'rgba(255,255,255,0.03)', color: '#fff', border: '1px solid var(--color-card-border)', textTransform: 'none' }}>
                      {skill}
                    </span>
                  ))}
                </div>

                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-card-border)' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Eğitmen</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff' }}>{selectedCourse.instructor}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', borderTop: '1px solid var(--color-card-border)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
              <button 
                onClick={() => setSelectedCourse(null)}
                className="btn btn-secondary"
              >
                Kapat
              </button>
              {!enrolledCourses.includes(selectedCourse.id) ? (
                <button 
                  onClick={() => {
                    onEnroll(selectedCourse.id);
                    setSelectedCourse(null);
                  }}
                  className="btn btn-primary"
                >
                  Programa Kayıt Ol
                </button>
              ) : (
                <button 
                  disabled
                  className="btn"
                  style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', border: '1px solid rgba(16, 185, 129, 0.3)', cursor: 'default' }}
                >
                  Zaten Kayıtlısınız
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
