'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  UserCheck, 
  ShoppingCart, 
  Apple, 
  Utensils, 
  Beef, 
  Cookie, 
  Cake, 
  ShieldAlert, 
  Truck, 
  Calculator, 
  Cpu, 
  BarChart3, 
  Users, 
  Globe, 
  Headphones, 
  Wrench, 
  Sparkles, 
  Crown, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  X,
  Award,
  BookOpen
} from 'lucide-react';

export interface DepartmentItem {
  id: string;
  name: string;
  category: string;
  iconName: string;
  year1Courses: string[];
  year2Courses: string[];
  totalCourses: number;
  totalHours: number;
  competencyLevel: string;
  careerGoal: string;
  description: string;
}

export const DEPARTMENTS_DATA: DepartmentItem[] = [
  {
    id: 'tum-calisanlar',
    name: 'Tüm Çalışanlar',
    category: 'Genel Operasyon',
    iconName: 'Users',
    year1Courses: ['Perakendecilik 101 & Sektör Mantığı', 'Müşteri Deneyimi & İletişim', 'İş Sağlığı ve Güvenliği', 'Temel Operasyon Standartları'],
    year2Courses: ['Verimlilik & Zaman Yönetimi', 'Çatışma Yönetimi', 'Kişisel Kariyer Planlama', 'Dijital Dönüşüm Farkındalığı'],
    totalCourses: 12,
    totalHours: 48,
    competencyLevel: 'Temel & Genel',
    careerGoal: 'Sektörel Standartlaşma & Uyum',
    description: 'Şirket kültürüne adaptasyon, perakende etiği ve müşteri odaklı genel yetkinlikler.'
  },
  {
    id: 'kasiyer',
    name: 'Kasiyer',
    category: 'Mağaza Operasyonu',
    iconName: 'ShoppingCart',
    year1Courses: ['Kasa Sistemleri & Hızlı Geçiş', 'Nakit & Pos Yönetimi', 'Müşteri İlişkileri & Teşekkür Protokolü', 'Kasa Açığı & Sahte Para Kontrolü'],
    year2Courses: ['Çapraz Satış Teknikleri', 'Şikayet Yönetimi & Kriz Çözümü', 'Kasa Arkası Stok Yönetimi', 'Kasa Sorumlusu Hazırlık'],
    totalCourses: 18,
    totalHours: 72,
    competencyLevel: 'Operasyonel Uzmanlık',
    careerGoal: 'Baş Kasiyer → Mağaza Müdür Yardımcısı',
    description: 'Kasa süreçlerini hızlı, hatasız ve yüksek müşteri memnuniyetiyle yönetme yetkinliği.'
  },
  {
    id: 'reyon-satis-elemani',
    name: 'Reyon Satış Elemanları',
    category: 'Mağaza Operasyonu',
    iconName: 'UserCheck',
    year1Courses: ['Reyon Düzeni & Planogram Uyum', 'Etiket & Fiyat Kontrolü', 'Stok Sayım & FIFO Mantığı', 'Müşteri Yönlendirme'],
    year2Courses: ['Satış Artırma & Cross-Selling', 'Kategori Ürün Bilgisi', 'Fire Minimizasyonu', 'Reyon Şefliği Hazırlık'],
    totalCourses: 20,
    totalHours: 80,
    competencyLevel: 'Saha Yetkinliği',
    careerGoal: 'Reyon Şefi → Müdür Yardımcısı',
    description: 'Raf düzeni, stok takibi, teşhir görselleşmesi ve aktif reyon satışı.'
  },
  {
    id: 'meyve-sebze-reyonu',
    name: 'Meyve Sebze Reyonu Satış Elemanı',
    category: 'Taze Gıda Akademisi',
    iconName: 'Apple',
    year1Courses: ['Meyve Sebze Tazelik ve Kalite Kontrolü', 'Reyon Sergileme & Renk Uyumu', 'Nem ve Sıcaklık Yönetimi', 'Fire Çeşitleri ve Önleme'],
    year2Courses: ['Günlük Hal Alım Mantığı & Tedarik', 'Fire ve Marj Optimizasyonu', 'Gramaj & Terazi Kalibrasyonu', 'Reyon Liderliği'],
    totalCourses: 24,
    totalHours: 96,
    competencyLevel: 'Taze Gıda Uzmanı',
    careerGoal: 'Meyve Sebze Reyon Şefi → Taze Gıda Yöneticisi',
    description: 'Görsel şölen sunan taze reyon teşhiri, tazelik yönetimi ve fire azaltma.'
  },
  {
    id: 'acik-sarkuteri',
    name: 'Açık Şarküteri Reyonu Satış Elemanı',
    category: 'Taze Gıda Akademisi',
    iconName: 'Utensils',
    year1Courses: ['Gıda Hijyeni & Soğuk Zincir', 'Dilimleme & Sunum Standartları', 'Ürün Muhafaza & Çapraz Bulaşma', 'Müşteri İkram Mantığı'],
    year2Courses: ['Şarküteri Ürün Bilgisi & Yöresel Çeşitler', 'Randıman & Gramaj Hesaplama', 'Kârlılık Yönetimi', 'Şarküteri Şefliği'],
    totalCourses: 22,
    totalHours: 88,
    competencyLevel: 'Hijyen & Ürün Ustalığı',
    careerGoal: 'Şarküteri Şefi → Taze Gıda Kategori Uzmanı',
    description: 'Yüksek hijyen standartları, lezzet sunumu ve şarküteri kârlılığı.'
  },
  {
    id: 'kasap-reyonu',
    name: 'Kasap Reyonu Satış Elemanı',
    category: 'Taze Gıda Akademisi',
    iconName: 'Beef',
    year1Courses: ['Et Çeşitleri ve Karkas Parçalama', 'Bıçak Güvenliği & Hijyen', 'Kıyma & İşlenmiş Ürün Hazırlama', 'Soğuk Depo Yönetimi'],
    year2Courses: ['Et Randımanı & Karkas Maliyet Analizi', 'Özel Kesim & Müşteri Danışmanlığı', 'Fire ve Atık Yönetimi', 'Kasap Reyon Şefliği'],
    totalCourses: 26,
    totalHours: 104,
    competencyLevel: 'Ustalık & Teknik',
    careerGoal: 'Baş Kasap → Taze Gıda Kategori Müdürü',
    description: 'Et işleme, karkas randımanı, soğuk zincir güvenliği ve yüksek marjlı satış.'
  },
  {
    id: 'kuruyemis-reyonu',
    name: 'Kuruyemiş Reyonu Satış Elemanı',
    category: 'Taze Gıda Akademisi',
    iconName: 'Cookie',
    year1Courses: ['Tazelik & Nem Kontrolü', 'Kavurma & Depolama Standartları', 'Ambalaj ve Gramaj Yönetimi', 'Sunum & Teşhir'],
    year2Courses: ['Ürün Menşei ve Kalite Sınıfları', 'Tazelik Çevrim Hızı (Rotasyon)', 'Kârlılık Optimizasyonu', 'Reyon Yöneticiliği'],
    totalCourses: 16,
    totalHours: 64,
    competencyLevel: 'Reyon Uzmanı',
    careerGoal: 'Reyon Şefi → Mağaza Müdür Yardımcısı',
    description: 'Taze kuruyemiş muhafazası, kavurma hassasiyeti ve hızlı stok devri.'
  },
  {
    id: 'taze-gida-reyonlari',
    name: 'Taze Gıda Reyonları Yönetimi',
    category: 'Taze Gıda Akademisi',
    iconName: 'Utensils',
    year1Courses: ['Taze Gıda Operasyon Standartları', 'Soğuk Zincir Taktik Takibi', 'Tarım ve Gıda Mevzuatı', 'Günlük Fire Analizi'],
    year2Courses: ['Taze Gıda Kârlılık & Randıman Yönetimi', 'Tedarik Zinciri & Hal Süreçleri', 'Gıda Güvenliği Denetçiliği', 'Taze Gıda Koordinatörlüğü'],
    totalCourses: 30,
    totalHours: 120,
    competencyLevel: 'Kıdemli Taze Gıda Uzmanı',
    careerGoal: 'Taze Gıda Müdürü → Operasyon Direktörü',
    description: 'Bütünleşik taze gıda reyonları stratejisi, gıda güvenliği ve yüksek brut marj.'
  },
  {
    id: 'unlu-mamuller',
    name: 'Unlu Mamuller ve Hazır Yemek Reyonu',
    category: 'Taze Gıda Akademisi',
    iconName: 'Cake',
    year1Courses: ['Pişirme & Fırın Operasyonları', 'Sıcak Teşhir & Saatlik Üretim', 'Son Kullanma Tarihi Takibi', 'Sunum Estetiği'],
    year2Courses: ['Reçete & Hammadde Maliyet Takibi', 'Mutfak Fire & Zayi Analizi', 'Sıcak Yemek Menü Planlaması', 'Fırın & Hazır Yemek Şefliği'],
    totalCourses: 20,
    totalHours: 80,
    competencyLevel: 'Üretim & Servis Ustalığı',
    careerGoal: 'Unlu Mamuller Şefi → Taze Gıda Yöneticisi',
    description: 'Taze fırın ürünleri, sıcak yemek konseptleri, unlu mamul kârlılığı.'
  },
  {
    id: 'magaza-mudur-yardimcisi',
    name: 'Mağaza Müdür Yardımcıları',
    category: 'Mağaza Yönetimi',
    iconName: 'Building2',
    year1Courses: ['Vardiya & Personel Planlama', 'Kasa & Gün Sonu Kapanış Yönetimi', 'Stok Kabul & Depo Denetimi', 'Saha Müşteri İlişkileri'],
    year2Courses: ['Mağaza KPI Analizi (Ciro, Fire, İşgücü)', 'Ekip Liderliği & Motivasyon', 'Mağaza Müdürü Hazırlık Programı', 'Kayıp Önleme'],
    totalCourses: 32,
    totalHours: 128,
    competencyLevel: 'Yönetici Adayı',
    careerGoal: 'Mağaza Müdürü',
    description: 'Günlük operasyon takibi, personel sevk ve idaresi, kasa & depo kontrolü.'
  },
  {
    id: 'magaza-muduru',
    name: 'Mağaza Müdürleri',
    category: 'Mağaza Yönetimi',
    iconName: 'Building2',
    year1Courses: ['Mağaza P&L (Kar-Zarar) Yönetimi', 'Mağaza KPI Denetimi ve Analitiği', 'Personel Performans & Koçluk', 'Yerel Rekabet Analizi'],
    year2Courses: ['Stratejik Mağaza Yönetimi', 'Bütçe Planlama & Maliyet Kontrolü', 'Müşteri Sadakat Stratejileri', 'Bölge Müdürlüğü Hazırlık'],
    totalCourses: 40,
    totalHours: 160,
    competencyLevel: 'Üst Düzey Mağaza Yöneticisi',
    careerGoal: 'Kıdemli Mağaza Müdürü → Bölge Müdürü',
    description: 'Mağazayı bağımsız bir kârlı işletme gibi yönetme, liderlik ve finansal başarı.'
  },
  {
    id: 'bolge-muduru',
    name: 'Bölge Müdürleri',
    category: 'Saha Stratejisi',
    iconName: 'Crown',
    year1Courses: ['Çoklu Mağaza Operasyon Denetimi', 'Bölgesel Bütçe & Ciro Hedefleme', 'Mağaza Müdürü Yetiştirme & Liderlik', 'Saha Kayıp Önleme Stratejileri'],
    year2Courses: ['Bölgesel Genişleme & Lokasyon Analizi', 'Portföy Kârlılık Optimizasyonu', 'Stratejik Perakendecilik & Trendler', 'Satış / Operasyon Direktörlüğü'],
    totalCourses: 48,
    totalHours: 192,
    competencyLevel: 'Saha Üst Yöneticisi',
    careerGoal: 'Saha Operasyon Müdürü → Operasyon Direktörü',
    description: '10-20 mağazalık bölgeyi sevk ve idare etme, bölgesel KPI ve P&L mükemmelliği.'
  },
  {
    id: 'satinalma-kategori',
    name: 'Satınalma ve Kategori Yönetimi',
    category: 'Merkez Operasyon',
    iconName: 'BarChart3',
    year1Courses: ['Tedarikçi Müzakere Teknikleri', 'Kategori Rolleri & Assortment Planlama', 'Raf İçi Marj Analizi', 'Kampanya & Promosyon Yönetimi'],
    year2Courses: ['GMROI ve Stok Devir Hızı Optimizasyonu', 'Stratejik Satınalma & Kontrat Yönetimi', 'Özel Marka (Private Label) Geliştirme', 'Kategori Yöneticisi Yetiştirme'],
    totalCourses: 36,
    totalHours: 144,
    competencyLevel: 'Stratejik Satınalma Uzmanı',
    careerGoal: 'Kategori Yöneticisi → Satınalma Müdürü',
    description: 'Doğru ürün, doğru fiyat, tedarikçi ilişkileri ve yüksek ürün kârlılığı.'
  },
  {
    id: 'lojistik-depo',
    name: 'Lojistik ve Depo',
    category: 'Merkez Operasyon',
    iconName: 'Truck',
    year1Courses: ['Depo Mal Kabul & Mal Çıkış Standartları', 'WMS (Depo Yönetim Sistemi) Kullanımı', 'Cross-Docking & Sevkiyat Planı', 'Hasar & Zayi Önleme'],
    year2Courses: ['Soğuk Depo Lojistiği & Araç Takibi', 'Tedarik Zinciri Optimizasyonu', 'Depo Otomasyonu & Yapay Zekâ', 'Lojistik Müdürü Hazırlık'],
    totalCourses: 24,
    totalHours: 96,
    competencyLevel: 'Tedarik Zinciri Uzmanı',
    careerGoal: 'Depo Şefi → Lojistik Yöneticisi',
    description: 'Depo süreçlerinin hızı, sevkiyat doğruluğu ve tedarik zinciri kesintisizliği.'
  },
  {
    id: 'finans',
    name: 'Finans',
    category: 'Merkez Operasyon',
    iconName: 'Calculator',
    year1Courses: ['Nakit Akış Yönetimi & Banka Operasyonları', 'Mağaza Bazlı Maliyet Muhasebesi', 'Kredi Kartı & Komisyon Oranı Takibi', 'Bütçe Hazırlama'],
    year2Courses: ['Finansal Modelleme & Yatırım Geri Dönüşü (ROI)', 'Sermaye Yapısı & Borç Yönetimi', 'Risk Yönetimi & Türev Araçlar', 'Finans Müdürü Hazırlık'],
    totalCourses: 28,
    totalHours: 112,
    competencyLevel: 'Finansal Analist',
    careerGoal: 'Finans Müdürü → CFO',
    description: 'Kurumsal finansal sağlık, nakit dengesi ve yatırım kârlılığı analizi.'
  },
  {
    id: 'muhasebe',
    name: 'Muhasebe',
    category: 'Merkez Operasyon',
    iconName: 'Calculator',
    year1Courses: ['Perakende Fatura & İrsaliye Sistemleri', 'E-Fatura & E-Arşiv İşlemleri', 'Mevzuat & Vergi Uygulamaları', 'Tedarikçi Cari Hesap Yönetimi'],
    year2Courses: ['Dönem Sonu Kapanış & Bilanço Analizi', 'Vergi Planlaması & Denetim', 'UFRS / TFRS Perakende Standardı', 'Muhasebe Müdürü'],
    totalCourses: 26,
    totalHours: 104,
    competencyLevel: 'Mali İşler Uzmanı',
    careerGoal: 'Muhasebe Şefi → Mali İşler Müdürü',
    description: 'Yasal mevzuat uyumu, şeffaf kayıt tutma ve cari hesap takibi.'
  },
  {
    id: 'insan-kaynaklari',
    name: 'İnsan Kaynakları',
    category: 'Merkez Operasyon',
    iconName: 'Users',
    year1Courses: ['Saha İşe Alım & Mülakat Teknikleri', 'İş Kanunu & Perakende Bordrolama', 'Oryantasyon & Eğitim Takibi', 'Performans Değerlendirme'],
    year2Courses: ['Yetkinlik Matrisi & Kariyer Haritaları', 'Çalışan Bağlılığı & Turnover Önleme', 'Yedekleme & Yetenek Yönetimi', 'İK Müdürü Yetiştirme'],
    totalCourses: 30,
    totalHours: 120,
    competencyLevel: 'İnsan Kaynakları Uzmanı',
    careerGoal: 'İK Şefi → İK Direktörü',
    description: 'Doğru yetenek işe alımı, sirkülasyon (turnover) düşürme ve çalışan gelişimi.'
  },
  {
    id: 'bilgi-islem',
    name: 'Bilgi İşlem (IT)',
    category: 'Teknoloji',
    iconName: 'Cpu',
    year1Courses: ['Mağaza POS & Yazar Kasa Destek', 'Ağ Güvenliği & Barkod Okuyucu Sistemler', 'Donanım & Terazi Entegrasyonu', 'Kullanıcı Destek (Helpdesk)'],
    year2Courses: ['ERP Entegrasyonu & Veritabanı Yönetimi', 'Siber Güvenlik & KVKK Bilgi Güvenliği', 'Bulut Altyapı & Mağaza Otomasyonu', 'IT Yöneticiliği'],
    totalCourses: 28,
    totalHours: 112,
    competencyLevel: 'Sistem & Ağ Uzmanı',
    careerGoal: 'IT Şefi → Bilgi İşlem Müdürü (CIO)',
    description: 'Mağaza donanım ve yazılımlarının 7/24 kesintisiz çalışması.'
  },
  {
    id: 'rapor-analiz-bi',
    name: 'Rapor Analiz / BI',
    category: 'Teknoloji & Veri',
    iconName: 'BarChart3',
    year1Courses: ['Perakende Metrikleri (Basket Size, Traffic, Conversion)', 'SQL & Veri Çekme Esasları', 'PowerBI / Tableau Dashboard Tasarımı', 'Satış Raporlaması'],
    year2Courses: ['İleri Perakende Analitiği & Tahminleme', 'Python / R ile Veri Madenciliği', 'Müşteri Kayıp (Churn) Analizi', 'BI Yöneticisi Hazırlık'],
    totalCourses: 32,
    totalHours: 128,
    competencyLevel: 'Veri Analisti',
    careerGoal: 'BI Uzmanı → Veri Analitiği Müdürü',
    description: 'Büyük veriyi stratejik iş kararlarına dönüştüren BI ve veri analitiği.'
  },
  {
    id: 'pazarlama-crm',
    name: 'Pazarlama ve CRM',
    category: 'Merkez Operasyon',
    iconName: 'Globe',
    year1Courses: ['Müşteri Segmentasyonu & RFM Analizi', 'Sadakat Kartı & Kampanya Kurgusu', 'Broşür & Saha İnsert Yönetimi', 'Sosyal Medya & Dijital İletişim'],
    year2Courses: ['CLV (Müşteri Yaşam Boyu Değeri) Artırma', 'Kişiselleştirilmiş Yapay Zekâ Kampanyaları', 'Omnichannel Pazarlama Stratejisi', 'Pazarlama Müdürü Hazırlık'],
    totalCourses: 34,
    totalHours: 136,
    competencyLevel: 'Pazarlama & Müşteri Deneyimi Uzmanı',
    careerGoal: 'CRM Yöneticisi → Pazarlama Direktörü (CMO)',
    description: 'Müşteri sadakatini artırma, veriye dayalı kampanya ve marka gücü.'
  },
  {
    id: 'e-ticaret-online',
    name: 'E-Ticaret ve Online Sipariş',
    category: 'Dijital Perakende',
    iconName: 'ShoppingCart',
    year1Courses: ['Online Sipariş Toplama (Picking) Standartları', 'Hızlı Kurye Sevkiyat Süreçleri', 'Web & Mobil Uygulama Yönetimi', 'Stok Senkronizasyonu'],
    year2Courses: ['E-Ticaret Sepet Büyüklüğü (AOV) Artırma', 'Dark Store (Hızlı Market) Operasyonu', 'Dijital Pazarlama & CAC Optimizasyonu', 'E-Ticaret Müdürü'],
    totalCourses: 30,
    totalHours: 120,
    competencyLevel: 'E-Ticaret Uzmanı',
    careerGoal: 'E-Ticaret Yöneticisi → Dijital Dönüşüm Direktörü',
    description: 'Mağaza içi sipariş toplama hızı, teslimat doğruluğu ve omnichannel büyüme.'
  },
  {
    id: 'musteri-hizmetleri',
    name: 'Müşteri Hizmetleri ve Danışma',
    category: 'Saha Operasyonu',
    iconName: 'Headphones',
    year1Courses: ['Müşteri Karşılama & İletişim Etiketi', 'İade ve Değişim Prosedürleri', 'Çağrı Merkezi & Şikayet Kaydı', 'Zor Müşteri Yönetimi'],
    year2Courses: ['Müşteri Memnuniyeti (NPS / CSAT) Ölçümü', 'Süreç İyileştirme Geri Bildirimleri', 'Müşteri Deneyimi Tasarımı', 'Müşteri Hizmetleri Şefliği'],
    totalCourses: 18,
    totalHours: 72,
    competencyLevel: 'Müşteri Deneyimi Temsilcisi',
    careerGoal: 'Müşteri Hizmetleri Şefi → Müşteri Deneyimi Müdürü',
    description: 'Sorunsuz iade/değişim, yüksek memnuniyet skoru ve marka sadakati.'
  },
  {
    id: 'guvenlik-kayip-onleme',
    name: 'Güvenlik ve Kayıp Önleme',
    category: 'Saha Güvenliği',
    iconName: 'ShieldAlert',
    year1Courses: ['Mağaza İçi Güvenlik & CCTV Takibi', 'Hırsızlık & İç Kayıp Belirleme', 'Acil Durum & Yangın Tahliye', 'Stok Sayım Auditi'],
    year2Courses: ['Kayıp Önleme Stratejileri (Shrinkage Reduction)', 'Suistimal İnceleme & Adli Süreçler', 'Güvenlik Teknolojileri & RFID', 'Kayıp Önleme Müdürü'],
    totalCourses: 22,
    totalHours: 88,
    competencyLevel: 'Kayıp Önleme Uzmanı',
    careerGoal: 'Güvenlik Şefi → Kayıp Önleme Müdürü',
    description: 'Mağaza kayıp oranlarını (shrink) düşürme, envanter emniyeti ve CCTV denetimi.'
  },
  {
    id: 'teknik-bakim-idari',
    name: 'Teknik Bakım ve İdari İşler',
    category: 'Saha Destek',
    iconName: 'Wrench',
    year1Courses: ['Soğutma & İklimlendirme Bakım Standartları', 'Elektrik & Jeneratör Sistemleri', 'Demirbaş & Araç Filo Takibi', 'Servis Sağlayıcı Yönetimi'],
    year2Courses: ['Enerji Verimliliği & Yeşil Mağazacılık', 'Rutin & Önleyici Bakım Planlaması', 'İdari İşler Bütçeleme', 'Teknik Müdürü Hazırlık'],
    totalCourses: 20,
    totalHours: 80,
    competencyLevel: 'Teknik Hizmetler Uzmanı',
    careerGoal: 'Teknik Şef → İdari İşler ve Bakım Müdürü',
    description: 'Soğutma ve jeneratör arızalarını sıfırlama, enerji tasarrufu.'
  },
  {
    id: 'temizlik-destek',
    name: 'Temizlik ve Destek Hizmetleri',
    category: 'Saha Destek',
    iconName: 'Sparkles',
    year1Courses: ['Mağaza Hijyen & Temizlik Protokolleri', 'Kimyasal Madde Güvenli Kullanımı', 'Atık Ayrıştırma & Geri Dönüşüm', 'Reyon & Kasa Arası Temizlik'],
    year2Courses: ['Hijyen Denetim Standartları (HACCP)', 'Ekipman Bakımı & Verimlilik', 'Temizlik Şefliği Hazırlık', 'Saha Destek Liderliği'],
    totalCourses: 14,
    totalHours: 56,
    competencyLevel: 'Saha Hijyen Görevlisi',
    careerGoal: 'Temizlik Şefi → Saha Destek Sorumlusu',
    description: 'Işıl ışıl mağaza ortamı, zemin ve reyon hijyeni.'
  },
  {
    id: 'ceo-genel-mudur',
    name: 'CEO / Genel Müdür / İşletme Sahibi',
    category: 'Üst Yönetim',
    iconName: 'Crown',
    year1Courses: ['Stratejik Perakende Liderliği & Vizyon', 'Şirket Geneli P&L & Nakit Yönetimi', 'Omnichannel Büyüme Stratejileri', 'Kurumsal Dönüşüm & Kültür'],
    year2Courses: ['Perakendede Yapay Zekâ & Stratejik Kararlar', 'Şirket Evlilikleri & Satınalma (M&A)', 'Uluslararası Perakende Modelleri', 'Sürdürülebilirlik & ESG'],
    totalCourses: 50,
    totalHours: 200,
    competencyLevel: 'Stratejik İcra Kurulu',
    careerGoal: 'Sektörel Liderlik & Şirket Büyütme',
    description: 'Perakendecilikte vizyoner liderlik, kârlı büyüme, yapay zekâ destekli üst yönetim.'
  }
];

export default function DepartmentGrid() {
  const [selectedDept, setSelectedDept] = useState<DepartmentItem | null>(null);

  const getDepartmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingCart': return <ShoppingCart className="h-6 w-6" />;
      case 'UserCheck': return <UserCheck className="h-6 w-6" />;
      case 'Apple': return <Apple className="h-6 w-6" />;
      case 'Utensils': return <Utensils className="h-6 w-6" />;
      case 'Beef': return <Beef className="h-6 w-6" />;
      case 'Cookie': return <Cookie className="h-6 w-6" />;
      case 'Cake': return <Cake className="h-6 w-6" />;
      case 'ShieldAlert': return <ShieldAlert className="h-6 w-6" />;
      case 'Truck': return <Truck className="h-6 w-6" />;
      case 'Calculator': return <Calculator className="h-6 w-6" />;
      case 'Cpu': return <Cpu className="h-6 w-6" />;
      case 'BarChart3': return <BarChart3 className="h-6 w-6" />;
      case 'Users': return <Users className="h-6 w-6" />;
      case 'Globe': return <Globe className="h-6 w-6" />;
      case 'Headphones': return <Headphones className="h-6 w-6" />;
      case 'Wrench': return <Wrench className="h-6 w-6" />;
      case 'Sparkles': return <Sparkles className="h-6 w-6" />;
      case 'Crown': return <Crown className="h-6 w-6" />;
      default: return <Building2 className="h-6 w-6" />;
    }
  };

  return (
    <div>
      {/* 26 Department Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {DEPARTMENTS_DATA.map((dept) => (
          <div
            key={dept.id}
            onClick={() => setSelectedDept(dept)}
            className="bg-white hover:bg-[#DDF4F7]/20 border border-gray-200 hover:border-[#087F96] rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="bg-[#DDF4F7] p-2.5 rounded-lg text-[#087F96] group-hover:bg-[#087F96] group-hover:text-white transition-colors">
                  {getDepartmentIcon(dept.iconName)}
                </div>
                <span className="text-[11px] font-bold text-[#087F96] bg-[#DDF4F7]/60 px-2 py-0.5 rounded-full">
                  {dept.category}
                </span>
              </div>
              <h3 className="font-display font-bold text-base text-[#0B2A4A] group-hover:text-[#087F96] transition-colors leading-tight">
                {dept.name}
              </h3>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                {dept.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">
                {dept.totalCourses} Modül • {dept.totalHours} Saat
              </span>
              <span className="text-[#087F96] font-bold flex items-center group-hover:translate-x-1 transition-transform">
                Detay <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup for Selected Department */}
      {selectedDept && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 relative p-6 sm:p-8 space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setSelectedDept(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start space-x-4 border-b border-gray-100 pb-5">
              <div className="bg-[#087F96] text-white p-3.5 rounded-xl shadow-md shrink-0">
                {getDepartmentIcon(selectedDept.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-2.5 py-1 rounded-full uppercase">
                  {selectedDept.category}
                </span>
                <h3 className="font-display font-extrabold text-2xl text-[#0B2A4A] mt-1">
                  {selectedDept.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {selectedDept.description}
                </p>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center bg-[#F4F7F9] p-4 rounded-xl border border-gray-200/60">
              <div>
                <span className="text-xs text-gray-500 block uppercase font-medium">Toplam Modül</span>
                <span className="text-lg font-extrabold text-[#0B2A4A] font-mono">{selectedDept.totalCourses} Eğitim</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block uppercase font-medium">Eğitim Süresi</span>
                <span className="text-lg font-extrabold text-[#087F96] font-mono">{selectedDept.totalHours} Saat</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block uppercase font-medium">Yetkinlik</span>
                <span className="text-xs font-bold text-[#056B80] mt-1 block">{selectedDept.competencyLevel}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block uppercase font-medium">Kariyer Hedefi</span>
                <span className="text-xs font-bold text-[#34A853] mt-1 block">{selectedDept.careerGoal}</span>
              </div>
            </div>

            {/* 2-Year Curriculum Breakdown */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-base text-[#0B2A4A] flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-[#087F96]" />
                <span>2 Yıllık Eğitim Yolculuğu Müfredatı</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Year 1 */}
                <div className="bg-[#F4F7F9] border border-[#087F96]/30 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#087F96]/20 pb-2">
                    <span className="font-display font-bold text-sm text-[#0B2A4A] flex items-center space-x-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#087F96] text-white text-xs font-bold flex items-center justify-center">1</span>
                      <span>1. YIL: Temel Yetkinlik</span>
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-700">
                    {selectedDept.year1Courses.map((c, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-[#087F96] shrink-0 pt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[11px] font-semibold text-[#056B80] bg-[#DDF4F7] p-2 rounded-lg italic">
                    "İşini doğru, bağımsız ve standartlara uygun yönet."
                  </div>
                </div>

                {/* Year 2 */}
                <div className="bg-[#061B33] text-white rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-display font-bold text-sm text-white flex items-center space-x-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#087F96] text-white text-xs font-bold flex items-center justify-center">2</span>
                      <span>2. YIL: İleri Yetkinlik</span>
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-300">
                    {selectedDept.year2Courses.map((c, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-[#34A853] shrink-0 pt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[11px] font-semibold text-[#DDF4F7] bg-white/10 p-2 rounded-lg italic">
                    "Sonuç üret, süreç geliştir ve bir üst kariyer seviyesine hazırlan."
                  </div>
                </div>
              </div>
            </div>

            {/* Modal CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedDept(null)}
                className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Kapat
              </button>
              <Link
                href={`/egitimler?dept=${selectedDept.id}`}
                onClick={() => setSelectedDept(null)}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#087F96] hover:bg-[#056B80] text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Bu Departmanın Tüm Eğitimlerini Gör</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
