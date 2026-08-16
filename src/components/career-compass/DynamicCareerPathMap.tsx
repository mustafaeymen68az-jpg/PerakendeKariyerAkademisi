'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Crown,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Target,
  BarChart3,
  Award,
  Play,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  Briefcase,
  Calendar,
  AlertTriangle,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  UserCheck
} from 'lucide-react';

interface DynamicCareerPathMapProps {
  selectedGoal: string;
  goalType: 'VERTICAL' | 'HORIZONTAL';
  onOpenGoalModal: () => void;
}

export default function DynamicCareerPathMap({
  selectedGoal,
  goalType,
  onOpenGoalModal
}: DynamicCareerPathMapProps) {
  const [showHigherLevels, setShowHigherLevels] = useState<boolean>(false);
  const [activePosIndex, setActivePosIndex] = useState<number>(0);

  // Position accordion open/collapsed state map (level number -> boolean). Default: all closed
  const [openPositionAccordions, setOpenPositionAccordions] = useState<Record<number, boolean>>({});

  // Helper to get estimated timeframe, readiness score, and level number for target goal
  const getGoalInfo = (goalName: string) => {
    const g = goalName.toLowerCase();
    if (g.includes('ceo') || (g.includes('genel müdür') && !g.includes('yardımcısı') && !g.includes('yrd'))) {
      return { timeframe: '10 - 12 Yıl', score: 22.0, level: 8, levelName: 'Level 8: CEO / Genel Müdür' };
    }
    if (g.includes('coo') || g.includes('cmo') || g.includes('genel müdür yrd') || g.includes('genel müdür yardımcısı')) {
      return { timeframe: '8 - 10 Yıl', score: 28.0, level: 7, levelName: 'Level 7: Genel Müdür Yrd. (COO)' };
    }
    if (g.includes('direktör') || g.includes('direktor')) {
      return { timeframe: '5 - 7 Yıl', score: 35.0, level: 6, levelName: 'Level 6: Perakende Operasyon Direktörü' };
    }
    if (g.includes('bölge') || g.includes('saha müdürü')) {
      return { timeframe: '3 - 4 Yıl', score: 45.0, level: 5, levelName: 'Level 5: Bölge Müdürü' };
    }
    if (g.includes('mağaza müdürü') && !g.includes('yardımcısı') && !g.includes('yrd')) {
      return { timeframe: '1.5 - 2 Yıl', score: 65.0, level: 4, levelName: 'Level 4: Mağaza Müdürü' };
    }
    if (g.includes('müdür yardımcısı') || g.includes('müdür yrd')) {
      return { timeframe: '14 Hafta (~3.5 Ay)', score: 83.5, level: 3, levelName: 'Level 3: Mağaza Müdür Yardımcısı' };
    }
    if (g.includes('takım lideri')) {
      return { timeframe: '3 Ay', score: 92.0, level: 2, levelName: 'Level 2: Takım Lideri' };
    }
    if (g.includes('kasiyer') || g.includes('reyon')) {
      return { timeframe: '0 Ay (Mevcut)', score: 100.0, level: 1, levelName: 'Level 1: Kasiyer & Reyon' };
    }
    return { timeframe: '6 Ay', score: 75.0, level: 3, levelName: `Yatay Geçiş: ${goalName}` };
  };

  const currentGoalInfo = getGoalInfo(selectedGoal);

  // 1. VERTICAL POSITIONS LIST (LEVEL 1 TO LEVEL 8 CEO WITH MAXIMUM ENRICHED RETAIL CURRICULUMS)
  const verticalPositions = [
    {
      level: 1,
      id: 'v1',
      name: 'Kasiyer & Reyon Çalışanı',
      shortName: '1. Kasiyer & Reyon',
      category: 'Mağaza Giriş Seviyesi (Mevcut Kıdem)',
      timeframe: 'Mevcut Seviye',
      trainings: [
        { title: 'Temel Perakende & POS Sistemleri Kullanımı', category: 'ZORUNLU OPERASYON', status: 'TAMAMLANDI', score: 95, progress: 100, scheduleDate: 'Ocak 2025 (Tamamlandı)', isOverdue: false, instructor: 'Hakan Kaya (POS & Kasa Sistemleri Uzmanı)' },
        { title: 'Müşteri İletişimi & Kasa Hattı Standartları', category: 'ZORUNLU HİZMET', status: 'TAMAMLANDI', score: 92, progress: 100, scheduleDate: 'Şubat 2025 (Tamamlandı)', isOverdue: false, instructor: 'Ayşe Demir (Müşteri Deneyimi Uzmanı)' },
        { title: 'Gıda Güvenliği & Hijyen Standartları', category: 'ZORUNLU HIJYEN', status: 'TAMAMLANDI', score: 98, progress: 100, scheduleDate: 'Mart 2025 (Tamamlandı)', isOverdue: false, instructor: 'Doç. Dr. Selin Yılmaz (Gıda Güvenliği Uzmanı)' },
        { title: 'Reyon İçi Teşhir & Barkod Kontrolü', category: 'ZORUNLU STANDART', status: 'TAMAMLANDI', score: 90, progress: 100, scheduleDate: 'Nisan 2025 (Tamamlandı)', isOverdue: false, instructor: 'Mehmet Can (Planogram Uzmanı)' },
        { title: 'Fire Önleme & SKT Denetim Süreçleri', category: 'ZORUNLU KALİTE', status: 'TAMAMLANDI', score: 94, progress: 100, scheduleDate: 'Mayıs 2025 (Tamamlandı)', isOverdue: false, instructor: 'Caner Şahin (Stok & Envanter Eğitmeni)' },
        { title: 'Müşteri Sadakat Kartları & Kampanya İskontoları', category: 'HİZMET KALİTESİ', status: 'TAMAMLANDI', score: 91, progress: 100, scheduleDate: 'Mayıs 2025 (Tamamlandı)', isOverdue: false, instructor: 'Ayşe Demir (Müşteri Deneyimi Uzmanı)' },
        { title: 'Kasa Hattında Nakit ve Kredi Kartı İade Prosedürleri', category: 'OPERASYON', status: 'TAMAMLANDI', score: 93, progress: 100, scheduleDate: 'Haziran 2025 (Tamamlandı)', isOverdue: false, instructor: 'Hakan Kaya (POS Uzmanı)' },
        { title: 'Reyon Temizlik, Hijyen ve Görsel Standart Rehberi', category: 'HIJYEN', status: 'TAMAMLANDI', score: 96, progress: 100, scheduleDate: 'Temmuz 2025 (Tamamlandı)', isOverdue: false, instructor: 'Doç. Dr. Selin Yılmaz (Gıda Uzmanı)' },
        { title: 'Müşteri İtirazları ve Şikayet Karşılama İlkeleri', category: 'MÜŞTERİ HİZMETİ', status: 'TAMAMLANDI', score: 89, progress: 100, scheduleDate: 'Ağustos 2025 (Tamamlandı)', isOverdue: false, instructor: 'Ayşe Demir (Müşteri Deneyimi Uzmanı)' },
        { title: 'İş Sağlığı Güvenliği (İSG) Temel Perakende Eğitimi', category: 'MEVZUAT', status: 'TAMAMLANDI', score: 97, progress: 100, scheduleDate: 'Eylül 2025 (Tamamlandı)', isOverdue: false, instructor: 'Selin Öztürk (İSG Uzmanı)' }
      ]
    },
    {
      level: 2,
      id: 'v2',
      name: 'Takım Lideri / Kıdemli Satış Danışmanı',
      shortName: '2. Takım Lideri',
      category: 'Mağaza Operasyon Liderliği',
      timeframe: '12 Ay (Geçildi)',
      trainings: [
        { title: 'Kasa Sonu Z-Raporu & Teslimat Tutanağı', category: 'ZORUNLU MALI', status: 'TAMAMLANDI', score: 89, progress: 100, scheduleDate: 'Haziran 2025 (Tamamlandı)', isOverdue: false, instructor: 'Hakan Kaya (POS & Kasa Sistemleri Uzmanı)' },
        { title: 'Reyon İçi Stok & Teşhir Standardı', category: 'ZORUNLU SAHA', status: 'TAMAMLANDI', score: 88, progress: 100, scheduleDate: 'Temmuz 2025 (Tamamlandı)', isOverdue: false, instructor: 'Mehmet Can (Planogram Uzmanı)' },
        { title: 'Mağaza İçi Sevkiyat & Mal Kabul Prosedürleri', category: 'ZORUNLU LOJISTIK', status: 'TAMAMLANDI', score: 91, progress: 100, scheduleDate: 'Ağustos 2025 (Tamamlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' },
        { title: 'Zor Müşteri Kriz Yönetimi & Şikayet Çözümleme', category: 'ZORUNLU YETKİNLİK', status: 'TAMAMLANDI', score: 93, progress: 100, scheduleDate: 'Eylül 2025 (Tamamlandı)', isOverdue: false, instructor: 'Ayşe Demir (Müşteri Deneyimi Uzmanı)' },
        { title: 'İSG Perakende Uygulamaları & Risk Değerlendirme', category: 'ZORUNLU MEVZUAT', status: 'TAMAMLANDI', score: 96, progress: 100, scheduleDate: 'Ekim 2025 (Tamamlandı)', isOverdue: false, instructor: 'Selin Öztürk (İSG & Mevzuat Uzmanı)' },
        { title: 'Perakende Matematiği & İskonto Hesapları', category: 'ZORUNLU MALI', status: 'TAMAMLANDI', score: 92, progress: 100, scheduleDate: 'Kasım 2025 (Tamamlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L ve Perakende Baş Uzmanı)' },
        { title: 'Vardiya Başlangıcı & Ekip Günlük Görev Dağılımı', category: 'LİDERLİK', status: 'TAMAMLANDI', score: 90, progress: 100, scheduleDate: 'Aralık 2025 (Tamamlandı)', isOverdue: false, instructor: 'Bülent Arslan (C-Suite Liderlik Koçu)' },
        { title: 'Mağaza İçi İade, İptal ve Hatalı İşlem Denetimi', category: 'DENETİM', status: 'TAMAMLANDI', score: 94, progress: 100, scheduleDate: 'Ocak 2026 (Tamamlandı)', isOverdue: false, instructor: 'Hakan Kaya (POS Uzmanı)' },
        { title: 'Kasa Hattı Hızlandırma & Müşteri Bekleme Süresi Optimizasyonu', category: 'PERFORMANS', status: 'TAMAMLANDI', score: 92, progress: 100, scheduleDate: 'Şubat 2026 (Tamamlandı)', isOverdue: false, instructor: 'Ayşe Demir (Müşteri Deneyimi Uzmanı)' },
        { title: 'Çapraz Satış ve Sepet Büyütme Teknikleri', category: 'SATIŞ UZMANLIĞI', status: 'TAMAMLANDI', score: 95, progress: 100, scheduleDate: 'Mart 2026 (Tamamlandı)', isOverdue: false, instructor: 'Mehmet Can (Görsel Mağazacılık Uzmanı)' }
      ]
    },
    {
      level: 3,
      id: 'v3',
      name: 'Mağaza Müdür Yardımcısı',
      shortName: '3. Mağaza Müdür Yrd.',
      category: 'İlk Seviye Yöneticilik (Aktif Kıdem)',
      timeframe: '14 Hafta Hazırlık (%83.5 Skoru)',
      trainings: [
        { title: 'Müşteri Deneyimi & Sepet Büyütme Yetkinliği', category: 'SAHA PERFORMANSI', status: 'TAMAMLANDI', score: 94, progress: 100, scheduleDate: 'Mayıs 2026 (Tamamlandı)', isOverdue: false, instructor: 'Ayşe Demir (Müşteri Deneyimi Uzmanı)' },
        { title: 'Finansal Perakende Matematiği & Marj Hesapları', category: 'FINANSAL YETKİNLİK', status: 'TAMAMLANDI', score: 92, progress: 100, scheduleDate: 'Haziran 2026 (Tamamlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Uzmanı)' },
        { title: 'Vardiya & Personel İş Gücü Planlaması', category: 'ZORUNLU TERFİ', status: 'TAMAMLANDI', score: 85, progress: 100, scheduleDate: 'Temmuz 2026 (Tamamlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L ve Perakende Baş Uzmanı)' },
        { title: 'Mağaza Açılış/Kapanış ve Kasa Ofis Yönetimi', category: 'ZORUNLU TERFİ', status: 'DEVAM EDİYOR', score: 35, progress: 35, scheduleDate: 'Ağustos 2026 (Gecikti)', isOverdue: true, delayDays: 12, instructor: 'Hakan Kaya (POS & Kasa Sistemleri Uzmanı)' },
        { title: 'Mağaza İçi Stok, Sipariş ve Envanter Yönetimi', category: 'ZORUNLU TERFİ', status: 'DEVAM EDİYOR', score: 68, progress: 68, scheduleDate: 'Eylül 2026 (Aktif)', isOverdue: false, instructor: 'Caner Şahin (Stok & Envanter Eğitmeni)' },
        { title: 'Taze Gıda Reyon Denetimi & Kalite Kontrolü', category: 'TERFİ UZMANLIK', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Ekim 2026 (Planlandı)', isOverdue: false, instructor: 'Doç. Dr. Selin Yılmaz (Gıda Güvenliği Uzmanı)' },
        { title: 'Ekip Motivasyonu ve Gelişimsel Geri Bildirim', category: 'SEÇMELİ LİDERLİK', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Kasım 2026 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (CEO Koçu)' },
        { title: 'Fire Önleme & SKT Sayım Denetim Protokolü', category: 'STOK & KALİTE', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Aralık 2026 (Planlandı)', isOverdue: false, instructor: 'Caner Şahin (Envanter Uzmanı)' },
        { title: 'Tedarikçi İade & Mal Kabul Standartları', category: 'LOJİSTİK', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Ocak 2027 (Planlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' },
        { title: 'Şube İçi İSG & Acil Durum Tahliye Tatbikatı', category: 'İSG & MEVZUAT', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Şubat 2027 (Planlandı)', isOverdue: false, instructor: 'Selin Öztürk (İSG Uzmanı)' },
        { title: 'Mağaza İçi Çalınma, Kayıp ve İç Audit Standartları', category: 'GÜVENLİK', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Mart 2027 (Planlandı)', isOverdue: false, instructor: 'Selin Öztürk (Güvenlik Uzmanı)' },
        { title: 'Personel İzin, Mesai ve Puantaj Takip Sistemleri', category: 'İK İŞLEMLERİ', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Nisan 2027 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (C-Suite Koçu)' }
      ]
    },
    {
      level: 4,
      id: 'v4',
      name: 'Mağaza Müdürü',
      shortName: '4. Mağaza Müdürü',
      category: 'Mağaza Yönetimi (P&L)',
      timeframe: '1.5 - 2 Yıl Tahmini',
      trainings: [
        { title: 'P&L Bütçe, Finansal Okuryazarlık ve Kar/Zarar Yönetimi', category: 'FINANSAL YÖNETİM', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ocak 2027 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Baş Uzmanı)' },
        { title: 'Mağaza Performans KPI Yönetimi & Hedef Tutturma', category: 'PERFORMANS', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Şubat 2027 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Baş Uzmanı)' },
        { title: 'Ekip Liderliği, Performans Değerlendirme & Koçluk', category: 'LİDERLİK', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Mart 2027 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (C-Suite Koçu)' },
        { title: 'İş Hukuku, Personel Özlük ve İş Güvenliği Mevzuatı', category: 'MEVZUAT & HR', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Nisan 2027 (Planlandı)', isOverdue: false, instructor: 'Selin Öztürk (İSG & Mevzuat Uzmanı)' },
        { title: 'Stratejik Reyon Planogramı & Kategori Yönetimi', category: 'GÖRSEL MAĞAZACILIK', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Mayıs 2027 (Planlandı)', isOverdue: false, instructor: 'Mehmet Can (Planogram Uzmanı)' },
        { title: 'Mağaza Fire Oranı Düşürme & Envanter Sayım Denetimi', category: 'STOK YÖNETİMİ', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Haziran 2027 (Planlandı)', isOverdue: false, instructor: 'Caner Şahin (Stok & Envanter Eğitmeni)' },
        { title: 'Şube Pazarlama & Bölgesel Rekabet Analizi', category: 'PAZARLAMA', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Temmuz 2027 (Planlandı)', isOverdue: false, instructor: 'Ayşe Demir (Müşteri Deneyimi Uzmanı)' },
        { title: 'Kriz Anlarında Şube Liderliği & İK Görüşme Teknikleri', category: 'LİDERLİK', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ağustos 2027 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (C-Suite Koçu)' },
        { title: 'Müşteri Sadakat Programları & Sepet Ortalama Büyütme', category: 'MÜŞTERİ STRATEJİSİ', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Eylül 2027 (Planlandı)', isOverdue: false, instructor: 'Ayşe Demir (Müşteri Deneyimi Uzmanı)' },
        { title: 'Enerji Tasarrufu & Şube Gider Optimizasyonu', category: 'OPERASYONEL VERİMLİLİK', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ekim 2027 (Planlandı)', isOverdue: false, instructor: 'Hakan Kaya (Operasyon Uzmanı)' },
        { title: 'Çalınma, Kaçak & İç Denetim Güvenlik Protokolleri', category: 'GÜVENLİK & MEVZUAT', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Kasım 2027 (Planlandı)', isOverdue: false, instructor: 'Selin Öztürk (Güvenlik Uzmanı)' },
        { title: 'Yıl Sonu Mağaza Kapanış & Envanter Devir Raporu', category: 'FINANSAL KAPANIŞ', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Aralık 2027 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Baş Uzmanı)' },
        { title: 'Rakip Mağaza Fiyat Denetimi & Bölgesel Kampanya Ayarı', category: 'FİYATLANDIRMA', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ocak 2028 (Planlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' },
        { title: 'Şube İçi Eğitim ve Yetenek Yedekleme Planlaması', category: 'YETENEK YÖNETİMİ', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Şubat 2028 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (C-Suite Koçu)' }
      ]
    },
    {
      level: 5,
      id: 'v5',
      name: 'Bölge / Saha Müdürü',
      shortName: '5. Bölge Müdürü',
      category: 'Çoklu Mağaza Yönetimi',
      timeframe: '3 - 4 Yıl Tahmini',
      trainings: [
        { title: 'Çoklu Mağaza Operasyonu & Bölge Liderliği', category: 'BÖLGE YÖNETİMİ', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ocak 2028 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Baş Uzmanı)' },
        { title: 'Stratejik Bölge Kârlılık, Bütçe ve Fire Analizi', category: 'FINANSAL STRATEJİ', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Şubat 2028 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Baş Uzmanı)' },
        { title: 'Bölge Mağazaları Haftalık KPI & Satış Denetimi', category: 'PERFORMANS AUDIT', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Mart 2028 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Baş Uzmanı)' },
        { title: 'Bölgesel Lojistik, Depo Sevkiyat & Tedarik Optimizasyonu', category: 'LOJİSTİK', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Nisan 2028 (Planlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' },
        { title: 'Bölgesel Rekabet Analizi & Yeni Mağaza Lokasyon Tespiti', category: 'PAZAR ARAŞTIRMASI', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Mayıs 2028 (Planlandı)', isOverdue: false, instructor: 'Ayşe Demir (Müşteri Deneyimi Uzmanı)' },
        { title: 'Bölge Mağazaları Denetimi & Standart Hizmet Audit', category: 'AUDİT & KALİTE', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Haziran 2028 (Planlandı)', isOverdue: false, instructor: 'Ayşe Demir (Müşteri Deneyimi Uzmanı)' },
        { title: 'Şube Müdürleri Performans Değerlendirme & Koçluk', category: 'EXECUTIVE KOÇLUK', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Temmuz 2028 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (C-Suite Koçu)' },
        { title: 'Bölgesel İnsan Kaynakları & Mağaza Müdürü Seçimi', category: 'İK YÖNETİMİ', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ağustos 2028 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (C-Suite Koçu)' },
        { title: 'Bölge İçi Mal Transferi & Stok Dengesi Optimizasyonu', category: 'STOK STRATEJİSİ', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Eylül 2028 (Planlandı)', isOverdue: false, instructor: 'Caner Şahin (Stok Uzmanı)' },
        { title: 'Yeni Lokasyon Ekspertiz & Fizibilite Raporlaması', category: 'YATIRIM', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ekim 2028 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Baş Uzmanı)' },
        { title: 'İş Sağlığı ve Güvenliği Bölge Denetim Süreçleri', category: 'MEVZUAT & İSG', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Kasım 2028 (Planlandı)', isOverdue: false, instructor: 'Selin Öztürk (İSG Uzmanı)' },
        { title: 'Bölgesel Satış Bütçeleme & Dönemsel Kampanya Yönetimi', category: 'SATIŞ YÖNETİMİ', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Aralık 2028 (Planlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' },
        { title: 'Bölgesel Depo Sevkiyat Rotası ve Nakliye Maliyet Yönetimi', category: 'LOJİSTİK', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ocak 2029 (Planlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' },
        { title: 'Kriz Dönemlerinde Bölgesel Stok & Liderlik Koordinasyonu', category: 'KRİZ LİDERLİĞİ', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Şubat 2029 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (C-Suite Koçu)' }
      ]
    },
    {
      level: 6,
      id: 'v6',
      name: 'Perakende Operasyon Direktörü',
      shortName: '6. Operasyon Direktörü',
      category: 'Üst Yönetim (Executive)',
      timeframe: '5 - 7 Yıl Tahmini',
      trainings: [
        { title: 'Yeni Mağaza Açma Simülatörü & Yatırım Analizi', category: 'YATIRIM & GELECEK', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ocak 2030 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Baş Uzmanı)' },
        { title: 'Genel Operasyon Stratejisi & Omnichannel Dönüşüm', category: 'STRATEJİ', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Nisan 2030 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (C-Suite Koçu)' },
        { title: 'Makro Perakende Ekonomisi & Fiyatlandırma Stratejileri', category: 'EKONOMİ & FINANS', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Temmuz 2030 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Baş Uzmanı)' },
        { title: 'Şirket Geneli P&L & Bütçe Yönetim Direktörlüğü', category: 'C-SUITE FINANS', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ekim 2030 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Baş Uzmanı)' },
        { title: 'Tedarik Zinciri Zirve Yönetimi & Tedarikçi Müzakereleri', category: 'TEDARİK ZİNCİRİ', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ocak 2031 (Planlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' },
        { title: 'Şirket Ölçeğinde Fire & Kaçak Önleme Sistemleri', category: 'STOK DİREKTÖRLÜĞÜ', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Nisan 2031 (Planlandı)', isOverdue: false, instructor: 'Caner Şahin (Envanter Uzmanı)' },
        { title: 'Kurumsal Müşteri Sadakat & Büyüme Ekosistemi', category: 'MÜŞTERİ STRATEJİSİ', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Temmuz 2031 (Planlandı)', isOverdue: false, instructor: 'Ayşe Demir (Müşteri Deneyimi Uzmanı)' },
        { title: 'Yapay Zeka Destekli Otomatik Stok & Sipariş Algoritmaları', category: 'AI & PERAKENDE', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ekim 2031 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (AI & Perakende Uzmanı)' },
        { title: 'C-Level Raporlama & Yönetim Komitesi Sunumları', category: 'EXECUTIVE', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Aralık 2031 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (C-Suite Koçu)' },
        { title: 'Kriz Yönetimi & Kurumsal İtibar Koruma', category: 'KRİZ LİDERLİĞİ', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ocak 2032 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (C-Suite Koçu)' },
        { title: 'Merkez Depo Otomasyonu & Otomatik Toplama Sistemleri', category: 'LOJİSTİK DİREKTÖRLÜĞÜ', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Şubat 2032 (Planlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' },
        { title: 'Kurumsal Sürdürülebilirlik & Sıfır Atık Perakende Protokolü', category: 'ESG VERİMLİLİK', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Mart 2032 (Planlandı)', isOverdue: false, instructor: 'Selin Öztürk (ESG Uzmanı)' }
      ]
    },
    {
      level: 7,
      id: 'v7',
      name: 'Genel Müdür Yardımcısı (COO / CMO)',
      shortName: '7. Genel Müdür Yrd.',
      category: 'C-Suite Yönetim Komitesi',
      timeframe: '8 - 10 Yıl Tahmini',
      trainings: [
        { title: 'C-Level Kurumsal Büyüme & Ekosistem Liderliği', category: 'C-SUITE', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ocak 2032 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (CEO Koçu)' },
        { title: 'Makro Finansal Yatırım & Şirket Değerleme', category: 'C-FINANCE', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Nisan 2032 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Baş Uzmanı)' },
        { title: 'Pazarlama & Marka Algısı Yönetimi (CMO Masterclass)', category: 'CMO MASTER', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Temmuz 2032 (Planlandı)', isOverdue: false, instructor: 'Ayşe Demir (Müşteri Deneyimi Uzmanı)' },
        { title: 'Dijital Perakende, AI & e-Ticaret Entegrasyonu', category: 'DİJİTAL DÖNÜŞÜM', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ekim 2032 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Baş Uzmanı)' },
        { title: 'Şirket İçi Liderlik Dönüşümü & Yönetici Koçluğu', category: 'EXECUTIVE COACHING', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ocak 2033 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (CEO Koçu)' },
        { title: 'Uluslararası Perakende Expansion & Franchise Sistemleri', category: 'GLOBAL EXPANSION', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Nisan 2033 (Planlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' },
        { title: 'Sürdürülebilir Tedarik Zinciri & Karbon Ayak İzi Optimizasyonu', category: 'GREEN RETAIL', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Temmuz 2033 (Planlandı)', isOverdue: false, instructor: 'Selin Öztürk (ESG Uzmanı)' },
        { title: 'Paydaş İletişimi & Yatırımcı İlişkileri', category: 'INVESTOR RELATIONS', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ekim 2033 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (CEO Koçu)' },
        { title: 'Şirket Ölçeğinde Dijital CRM ve Müşteri Ömrü Boyu Değeri', category: 'CLV STRATEJİSİ', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ocak 2034 (Planlandı)', isOverdue: false, instructor: 'Ayşe Demir (Müşteri Deneyimi Uzmanı)' },
        { title: 'Kurumsal Dönüşüm ve Şirket Kültürü Liderliği', category: 'CULTURE & LEADERSHIP', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Nisan 2034 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (CEO Koçu)' }
      ]
    },
    {
      level: 8,
      id: 'v8',
      name: 'CEO / Genel Müdür',
      shortName: '8. CEO / Genel Müdür',
      category: 'Kurumsal Zirve & Yönetim Kurulu',
      timeframe: '10-12+ Yıl Tahmini Vizyon',
      trainings: [
        { title: 'PKA CEO Liderlik & Yönetim Kurulu Raporlaması', category: 'ZİRVE LİDERLİK', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ocak 2034 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (C-Suite Liderlik & CEO Koçu)' },
        { title: 'Stratejik Şirket Birleşmeleri & Satın Almalar (M&A)', category: 'M&A STRATEJİ', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Nisan 2034 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Baş Uzmanı)' },
        { title: 'Kurumsal Yönetişim, Sürdürülebilirlik & ESG Stratejileri', category: 'ESG & GOVERNANCE', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Temmuz 2034 (Planlandı)', isOverdue: false, instructor: 'Selin Öztürk (İSG & Mevzuat Uzmanı)' },
        { title: 'Global Ekonomik Kriz Yönetimi & Dayanıklılık (Resilience)', category: 'RISK & RESILIENCE', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ekim 2034 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Baş Uzmanı)' },
        { title: 'C-Suite Talent Pipeline & Yönetici Yetiştirme Akademisi', category: 'TALENT PIPELINE', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ocak 2035 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (CEO Koçu)' },
        { title: 'Vizyoner Kurucu Liderlik & Paydaş Yönetimi', category: 'VISIONARY LEADERSHIP', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Nisan 2035 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (CEO Koçu)' },
        { title: 'Halka Arz (IPO) & Sermaye Piyasaları Hazırlığı', category: 'CAPITAL MARKETS', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Temmuz 2035 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Baş Uzmanı)' },
        { title: 'Geleceğin Perakende Ekosistemi & Global Vizyon', category: 'GLOBAL VISION', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ekim 2035 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (CEO Koçu)' },
        { title: 'Kurumsal Stratejik Ortaklıklar & Zirve Müzakereleri', category: 'STRATEGIC ALLIANCES', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Ocak 2036 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (CEO Koçu)' },
        { title: 'Makroekonomik Senaryo Planlama & Geleceğin Liderliği', category: 'FUTURE FORESIGHT', status: 'ATANACAK', score: 0, progress: 0, scheduleDate: 'Nisan 2036 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Baş Uzmanı)' }
      ]
    }
  ];

  // Dynamic helper to resolve label and badge color for any level relative to target level
  const resolveLevelBadge = (lvlNumber: number) => {
    if (lvlNumber === currentGoalInfo.level) {
      return {
        label: 'HEDEF POZİSYON 🎯',
        badgeColor: 'bg-amber-400 text-slate-950 font-black border-amber-300 shadow-md animate-pulse',
        isTarget: true
      };
    }
    if (lvlNumber < currentEmpLevel) {
      return {
        label: 'GEÇİLDİ ✅',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        isTarget: false
      };
    }
    if (lvlNumber === currentEmpLevel) {
      return {
        label: 'MEVCUT POZİSYONUM 📍',
        badgeColor: 'bg-blue-500 text-white font-black border-blue-400',
        isTarget: false
      };
    }
    if (lvlNumber < currentGoalInfo.level) {
      return {
        label: 'TERFİ ADIMI ⏳',
        badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold',
        isTarget: false
      };
    }
    return {
      label: 'KALAN VİZYON ⏳',
      badgeColor: 'bg-white/10 text-gray-300 border-white/15',
      isTarget: false
    };
  };

  // Helper to resolve explicit month/year target arrival date and step duration for each position level
  const resolveLevelArrivalInfo = (lvlNumber: number) => {
    switch (lvlNumber) {
      case 1:
        return { duration: 'Mevcut Seviye', arrivalDate: 'Aktif Dönem (Mevcut Seviye 📍)' };
      case 2:
        return { duration: '3 Ay Hazırlık', arrivalDate: 'Kasım 2026 (~3 Ay Sonra)' };
      case 3:
        return { duration: '1 - 1.5 Yıl', arrivalDate: '2028 Başı (~1.5 Yıl Sonra)' };
      case 4:
        return { duration: '1.5 - 2 Yıl', arrivalDate: '2030 Başı (~3.5 Yıl Sonra)' };
      case 5:
        return { duration: '1.5 - 2 Yıl', arrivalDate: '2032 Başı (~5.5 Yıl Sonra)' };
      case 6:
        return { duration: '2 Yıl', arrivalDate: '2034 Başı (~7.5 Yıl Sonra)' };
      case 7:
        return { duration: '2 - 3 Yıl', arrivalDate: '2037 Başı (~10.5 Yıl Sonra)' };
      case 8:
        return { duration: '2 - 3 Yıl', arrivalDate: '2039 (12+ Yıl Vizyonu)' };
      default:
        return { duration: '6 Ay', arrivalDate: '2027 (Planlandı)' };
    }
  };

  const [activeEmpPosition, setActiveEmpPosition] = useState<string>('Kasiyer & Reyon Çalışanı');

  useEffect(() => {
    const syncPos = () => {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('pka_active_position') : null;
      if (saved) setActiveEmpPosition(saved);
    };
    syncPos();
    window.addEventListener('pka_position_updated', syncPos);
    window.addEventListener('storage', syncPos);
    return () => {
      window.removeEventListener('pka_position_updated', syncPos);
      window.removeEventListener('storage', syncPos);
    };
  }, []);

  const resolveLevelFromPositionName = (posName: string) => {
    const p = posName.toLowerCase();
    if (p.includes('ceo') || (p.includes('genel müdür') && !p.includes('yardımcısı') && !p.includes('yrd'))) return 8;
    if (p.includes('coo') || p.includes('cmo') || p.includes('genel müdür yrd') || p.includes('genel müdür yardımcısı')) return 7;
    if (p.includes('direktör') || p.includes('direktor')) return 6;
    if (p.includes('bölge') || p.includes('saha müdürü')) return 5;
    if (p.includes('mağaza müdürü') && !p.includes('yardımcısı') && !p.includes('yrd')) return 4;
    if (p.includes('müdür yardımcısı') || p.includes('müdür yrd')) return 3;
    if (p.includes('takım lideri')) return 2;
    return 1;
  };

  // Dynamic Level derived from admin assignment
  const currentEmpLevel = resolveLevelFromPositionName(activeEmpPosition);
  const maxDisplayLevel = showHigherLevels ? 8 : Math.max(currentEmpLevel, currentGoalInfo.level);
  const displayVerticalPositions = verticalPositions.filter(p => p.level >= currentEmpLevel && p.level <= maxDisplayLevel);

  // Dynamic curriculum builder for Horizontal Career Transitions
  const buildHorizontalPositions = (goal: string) => {
    const g = goal.toLowerCase();

    if (g.includes('depo') || g.includes('lojistik') || g.includes('tedarik')) {
      return [
        {
          level: 1,
          id: 'h1',
          name: 'Saha & Depo Operasyon Temelleri',
          shortName: '1. Saha & Depo Temeli',
          category: 'Mağaza Sevkiyat Temeli',
          timeframe: 'Mevcut Kıdem: 1.5 Yıl',
          trainings: [
            { title: 'Mağaza İçi Sevkiyat & Mal Kabul Prosedürleri', category: 'LOJİSTİK', status: 'TAMAMLANDI', score: 95, progress: 100, scheduleDate: 'Ocak 2025 (Tamamlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' },
            { title: 'Depo Düzeni, Paletleme & FIFO Kuralı', category: 'STOK YÖNETİMİ', status: 'TAMAMLANDI', score: 92, progress: 100, scheduleDate: 'Şubat 2025 (Tamamlandı)', isOverdue: false, instructor: 'Caner Şahin (Stok Uzmanı)' },
            { title: 'Barkod Otomasyonu & El Terminali (RF) Kullanımı', category: 'OTOMASYON', status: 'TAMAMLANDI', score: 98, progress: 100, scheduleDate: 'Mart 2025 (Tamamlandı)', isOverdue: false, instructor: 'Hakan Kaya (POS Uzmanı)' }
          ]
        },
        {
          level: 2,
          id: 'h2',
          name: 'Departman Geçiş & Lojistik Hazırlık',
          shortName: '2. Lojistik Geçiş Eğitimi',
          category: 'Yatay Geçiş Sertifikasyonu',
          timeframe: '8-12 Hafta Hazırlık',
          trainings: [
            { title: 'Depo İçi İş Güvenliği & Forklift/Transpalet Güvenliği', category: 'İSG & MEVZUAT', status: 'DEVAM EDİYOR', score: 80, progress: 80, scheduleDate: 'Ağustos 2026 (Aktif)', isOverdue: false, instructor: 'Selin Öztürk (İSG Uzmanı)' },
            { title: 'Merkez Depo Otomasyonu & Otomatik Toplama Sistemleri (WMS)', category: 'LOJİSTİK DİREKTÖRLÜĞÜ', status: 'DEVAM EDİYOR', score: 60, progress: 60, scheduleDate: 'Eylül 2026 (Aktif)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' },
            { title: 'Tedarikçi Sevkiyat Randevu & Slot Yönetimi', category: 'TEDARİK ZİNCİRİ', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Ekim 2026 (Planlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' }
          ]
        },
        {
          level: 3,
          id: 'h3',
          name: goal || 'Merkez Depo Operasyon Yöneticisi',
          shortName: `3. ${goal}`,
          category: 'Hedef Departman Pozisyonu',
          timeframe: '6 Ay İçinde Geçiş',
          trainings: [
            { title: 'Merkez Depo Vardiya & İş Gücü Planlaması', category: 'OPERASYON YÖNETİMİ', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Kasım 2026 (Planlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' },
            { title: 'Şube Sevkiyat Rotalaması & Nakliye Maliyet Optimizasyonu', category: 'MALİYET YÖNETİMİ', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Aralık 2026 (Planlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' },
            { title: 'Depo Fire, Hasar & Envanter Devir Hızı Yönetimi', category: 'ENVANTER KONTROL', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Ocak 2027 (Planlandı)', isOverdue: false, instructor: 'Caner Şahin (Stok Uzmanı)' },
            { title: 'Soğuk Hava Deposu & İklimlendirmeli Depolama Protokolü', category: 'GIDA GÜVENLİĞİ', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Şubat 2027 (Planlandı)', isOverdue: false, instructor: 'Doç. Dr. Selin Yılmaz (Gıda Uzmanı)' },
            { title: 'Yeşil Perakende & Karbon Ayak İzi Lojistik Stratejisi', category: 'GREEN LOGISTICS', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Mart 2027 (Planlandı)', isOverdue: false, instructor: 'Selin Öztürk (ESG Uzmanı)' }
          ]
        }
      ];
    }

    if (g.includes('satın alma') || g.includes('satin alma')) {
      return [
        {
          level: 1,
          id: 'h1',
          name: 'Saha & Ürün Temelleri',
          shortName: '1. Saha & Ürün Temeli',
          category: 'Mağaza Ürün Temeli',
          timeframe: 'Mevcut Kıdem: 1.5 Yıl',
          trainings: [
            { title: 'Reyon İçi Ürün Grubunu Tanıma & Kategori Temelleri', category: 'KATEGORİ', status: 'TAMAMLANDI', score: 95, progress: 100, scheduleDate: 'Ocak 2025 (Tamamlandı)', isOverdue: false, instructor: 'Mehmet Can (Planogram Uzmanı)' },
            { title: 'Tedarikçi İade & Mal Kabul Standartları', category: 'LOJİSTİK', status: 'TAMAMLANDI', score: 91, progress: 100, scheduleDate: 'Şubat 2025 (Tamamlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' }
          ]
        },
        {
          level: 2,
          id: 'h2',
          name: 'Satın Alma Geçiş Hazırlığı',
          shortName: '2. Satın Alma Geçişi',
          category: 'Yatay Geçiş Sertifikasyonu',
          timeframe: '8-12 Hafta Hazırlık',
          trainings: [
            { title: 'Perakende Matematiği, Marj & Kar Oranı Hesapları', category: 'MALI YETKİNLİK', status: 'DEVAM EDİYOR', score: 85, progress: 85, scheduleDate: 'Ağustos 2026 (Aktif)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Uzmanı)' },
            { title: 'Tedarikçi Sözleşme Hukuku & Ticari Koşul Müzakereleri', category: 'MÜZAKERE', status: 'DEVAM EDİYOR', score: 50, progress: 50, scheduleDate: 'Eylül 2026 (Aktif)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' }
          ]
        },
        {
          level: 3,
          id: 'h3',
          name: goal || 'Satın Alma Uzmanı / Müzakereci',
          shortName: `3. ${goal}`,
          category: 'Hedef Departman Pozisyonu',
          timeframe: '6 Ay İçinde Geçiş',
          trainings: [
            { title: 'Stratejik Tedarikçi Seçimi & Portföy Yönetimi', category: 'SATIN ALMA', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Ekim 2026 (Planlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' },
            { title: 'Hammadde & Ürün Fiyat Dalgalanması Risk Yönetimi', category: 'RISK YÖNETİMİ', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Kasım 2026 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Uzmanı)' },
            { title: 'İthalat & Gümrük Mevzuatı Perakende Satın Alması', category: 'MEVZUAT', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Aralık 2026 (Planlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' },
            { title: 'Tedarikçi Kampanya & İskonto Katkı Payı Müzakeresi', category: 'MÜZAKERE', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Ocak 2027 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Uzmanı)' },
            { title: 'Özel Markalı Ürün (Private Label) Geliştirme Süreçleri', category: 'ÜRÜN GELİŞTİRME', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Şubat 2027 (Planlandı)', isOverdue: false, instructor: 'Mehmet Can (Planogram Uzmanı)' }
          ]
        }
      ];
    }

    if (g.includes('taze gıda') || g.includes('kasap') || g.includes('manav') || g.includes('unlu mamuller')) {
      return [
        {
          level: 1,
          id: 'h1',
          name: 'Saha Hijyen & Gıda Temelleri',
          shortName: '1. Gıda Temeli',
          category: 'Taze Gıda Temeli',
          timeframe: 'Mevcut Kıdem: 1.5 Yıl',
          trainings: [
            { title: 'Gıda Güvenliği, HACCP & Hijyen Standartları', category: 'ZORUNLU HIJYEN', status: 'TAMAMLANDI', score: 98, progress: 100, scheduleDate: 'Ocak 2025 (Tamamlandı)', isOverdue: false, instructor: 'Doç. Dr. Selin Yılmaz (Gıda Güvenliği Uzmanı)' },
            { title: 'Soğuk Zincir Koruma & Sıcaklık Takip Protokolü', category: 'KALİTE KONTROL', status: 'TAMAMLANDI', score: 95, progress: 100, scheduleDate: 'Şubat 2025 (Tamamlandı)', isOverdue: false, instructor: 'Doç. Dr. Selin Yılmaz (Gıda Güvenliği Uzmanı)' }
          ]
        },
        {
          level: 2,
          id: 'h2',
          name: 'Taze Gıda Uzmanlık Geçişi',
          shortName: '2. Uzmanlık Geçişi',
          category: 'Yatay Geçiş Sertifikasyonu',
          timeframe: '8-12 Hafta Hazırlık',
          trainings: [
            { title: 'Taze Gıda (Et, Süt, Şarküteri, Manav) Fire Yönetimi', category: 'FIRE KONTROL', status: 'DEVAM EDİYOR', score: 75, progress: 75, scheduleDate: 'Ağustos 2026 (Aktif)', isOverdue: false, instructor: 'Caner Şahin (Stok Uzmanı)' },
            { title: 'Reyon Nemlendirme, Buzlama & Görsel Teşhir Kriterleri', category: 'TEŞHİR STANDARDI', status: 'DEVAM EDİYOR', score: 60, progress: 60, scheduleDate: 'Eylül 2026 (Aktif)', isOverdue: false, instructor: 'Mehmet Can (Planogram Uzmanı)' }
          ]
        },
        {
          level: 3,
          id: 'h3',
          name: goal || 'Taze Gıda Kategori Şefi / Uzmanı',
          shortName: `3. ${goal}`,
          category: 'Hedef Departman Pozisyonu',
          timeframe: '6 Ay İçinde Geçiş',
          trainings: [
            { title: 'Yerel Tedarikçi & Hal Alım Operasyon Yönetimi', category: 'SATIN ALMA', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Ekim 2026 (Planlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' },
            { title: 'Taze Gıda İşleme, Gramajlama & Paketleme Standartları', category: 'ÜRETİM KONTROL', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Kasım 2026 (Planlandı)', isOverdue: false, instructor: 'Doç. Dr. Selin Yılmaz (Gıda Uzmanı)' },
            { title: 'Organik & Coğrafi İşaretli Ürün Kategori Stratejisi', category: 'KATEGORİ YÖNETİMİ', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Aralık 2026 (Planlandı)', isOverdue: false, instructor: 'Mehmet Can (Planogram Uzmanı)' },
            { title: 'Taze Gıda Günlük Fiyatlandırma & İskonto Yönetimi', category: 'FİYATLANDIRMA', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Ocak 2027 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Uzmanı)' }
          ]
        }
      ];
    }

    // Default Fallback for all other Horizontal Positions (Kategori, İK, E-Ticaret, Merchandising, Risk)
    return [
      {
        level: 1,
        id: 'h1',
        name: 'Saha Operasyon Deneyimi',
        shortName: '1. Saha Deneyimi',
        category: 'Mağaza Temeli',
        timeframe: 'Mevcut Kıdem: 1.5 Yıl',
        trainings: [
          { title: 'Temel Perakende & POS Sistemleri Kullanımı', category: 'ZORUNLU', status: 'TAMAMLANDI', score: 95, progress: 100, scheduleDate: 'Ocak 2025 (Tamamlandı)', isOverdue: false, instructor: 'Hakan Kaya (POS Uzmanı)' },
          { title: 'Müşteri Deneyimi & Saha İletişimi', category: 'HİZMET', status: 'TAMAMLANDI', score: 92, progress: 100, scheduleDate: 'Şubat 2025 (Tamamlandı)', isOverdue: false, instructor: 'Ayşe Demir (Müşteri Deneyimi Uzmanı)' }
        ]
      },
      {
        level: 2,
        id: 'h2',
        name: 'Departman Geçiş Hazırlık Eğitimi',
        shortName: '2. Geçiş Eğitimi',
        category: 'Yatay Geçiş Sertifikası',
        timeframe: '8-12 Hafta Hazırlık',
        trainings: [
          { title: 'Genel Merkez & Departmanlar Arası İletişim', category: 'YATAY GEÇİŞ', status: 'DEVAM EDİYOR', score: 80, progress: 80, scheduleDate: 'Ağustos 2026 (Aktif)', isOverdue: false, instructor: 'Ayşe Demir (İletişim Uzmanı)' },
          { title: `${goal} Temel Metodoloji & Süreç Eğitimi`, category: 'UZMANLIK TEMELİ', status: 'DEVAM EDİYOR', score: 65, progress: 65, scheduleDate: 'Eylül 2026 (Aktif)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Baş Uzmanı)' }
        ]
      },
      {
        level: 3,
        id: 'h3',
        name: goal || 'Hedef Departman Pozisyonu',
        shortName: `3. ${goal || 'Hedef Pozisyon'}`,
        category: 'Hedef Departman Pozisyonu',
        timeframe: '6 Ay İçinde Geçiş',
        trainings: [
          { title: `${goal} İleri Seviye Operasyon & KPI Yönetimi`, category: 'UZMANLIK MASTER', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Ekim 2026 (Planlandı)', isOverdue: false, instructor: 'Dr. Mustafa Eymen (P&L Baş Uzmanı)' },
          { title: `${goal} Veri Analitiği & Raporlama Standartları`, category: 'ANALİTİK', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Kasım 2026 (Planlandı)', isOverdue: false, instructor: 'Bülent Arslan (C-Suite Koçu)' },
          { title: `${goal} Departmanı Çapraz Bütçe & Proje Yönetimi`, category: 'PROJE YÖNETİMİ', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Aralık 2026 (Planlandı)', isOverdue: false, instructor: 'Ahmet Yıldırım (Lojistik Direktörü)' },
          { title: `${goal} Sektörel Trendler & Dijital Dönüşüm Stratejileri`, category: 'DİJİTAL STRATEJİ', status: 'ATANDI', score: 0, progress: 0, scheduleDate: 'Ocak 2027 (Planlandı)', isOverdue: false, instructor: 'Selin Öztürk (ESG & Mevzuat Uzmanı)' }
        ]
      }
    ];
  };

  const horizontalPositions = buildHorizontalPositions(selectedGoal);

  const currentPositionsList = goalType === 'VERTICAL' ? displayVerticalPositions : horizontalPositions;

  // Calculate total courses across all displayed positions up to target level
  const totalCoursesCount = currentPositionsList.reduce((sum, p) => sum + p.trainings.length, 0);

  // Sync active position index to target goal index whenever selectedGoal changes
  useEffect(() => {
    if (goalType === 'VERTICAL') {
      const foundIdx = displayVerticalPositions.findIndex((p) => selectedGoal.toLowerCase().includes(p.name.toLowerCase()));
      if (foundIdx !== -1) setActivePosIndex(foundIdx);
      else setActivePosIndex(0);
    } else {
      setActivePosIndex(0);
    }
  }, [selectedGoal, goalType, showHigherLevels]);

  const togglePosAccordion = (lvl: number) => {
    setOpenPositionAccordions((prev) => ({
      ...prev,
      [lvl]: !prev[lvl]
    }));
  };

  return (
    <div className="bg-[#0B2A4A] p-6 sm:p-8 rounded-3xl border border-amber-400/30 space-y-6 shadow-xl text-white">

      {/* OVERDUE TRAININGS ALERT BANNER */}
      <div className="p-4 bg-rose-500/15 border border-rose-500/40 rounded-2xl flex items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <h4 className="font-extrabold text-rose-300 text-xs">⚠️ Geciken Eğitim Uyarısı (12 Gün Raporlandı)</h4>
            <p className="text-[11px] text-gray-300">
              "Mağaza Açılış/Kapanış ve Kasa Ofis Yönetimi" eğitimi hedeflenen Ağustos 2026 takviminde %35 seviyesindedir. Terfi skoru etkilenmemesi için öncelikle tamamlayınız.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('"Mağaza Açılış/Kapanış ve Kasa Ofis Yönetimi" eğitimi başlatılıyor...')}
          className="px-3.5 py-2 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs rounded-xl shrink-0 shadow-md"
        >
          🚨 Eğitime Git
        </button>
      </div>

      {/* STEP-BY-STEP VERTICAL TIMELINE LIST WITH INTEGRATED EXPANDABLE COURSES */}
      <div className="p-5 sm:p-6 bg-[#061B33] rounded-3xl border border-amber-400/40 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2.5">
            <Calendar className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-extrabold text-amber-300 uppercase tracking-wider">
                Mevcut Pozisyondan "{selectedGoal}" Hedefine Kademeli Zaman Çizelgesi &amp; Eğitimi
              </h3>
              <p className="text-[11px] text-gray-300 mt-0.5">
                Her bir seviye adımına tıklayarak o kademede alınması gereken genişletilmiş perakende akademisi eğitim modüllerini inceleyebilirsiniz.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0 self-start sm:self-auto">
            {goalType === 'VERTICAL' && (
              <button
                onClick={() => setShowHigherLevels(!showHigherLevels)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded-xl text-[10px] font-bold flex items-center space-x-1.5 transition-all"
              >
                {showHigherLevels ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showHigherLevels ? 'Üst Seviyeleri Gizle' : '+ Tüm 8 Seviyeyi Göster'}</span>
              </button>
            )}

            <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-500/20 px-3.5 py-1.5 rounded-full border border-emerald-500/30">
              🏁 Toplam Hedef Süresi: {currentGoalInfo.timeframe}
            </span>
          </div>
        </div>

        {/* STEP-BY-STEP VERTICAL TIMELINE LIST WITH INTEGRATED ACCORDION COURSES */}
        <div className="space-y-3 pt-1">
          {currentPositionsList.map((pos, idx) => {
            const levelBadge = resolveLevelBadge(pos.level);
            const isCurrent = pos.level === currentEmpLevel; // Mevcut Kıdem: Level 1 (Kasiyer & Reyon)
            const isPassed = pos.level < currentEmpLevel; // Geçilen Kıdemler
            const arrivalInfo = resolveLevelArrivalInfo(pos.level);
            const isOpen = openPositionAccordions[pos.level] === true;

            return (
              <div
                key={pos.id}
                id={`pos-section-${pos.level}`}
                className={`rounded-2xl border transition-all shadow-md overflow-hidden ${
                  levelBadge.isTarget
                    ? 'bg-[#0B2A4A] border-amber-400 shadow-2xl ring-1 ring-amber-400/50'
                    : isCurrent
                    ? 'bg-[#0B2A4A] border-blue-400'
                    : isPassed
                    ? 'bg-[#0B2A4A] border-emerald-500/30 opacity-80'
                    : 'bg-[#0B2A4A] border-white/10'
                }`}
              >
                {/* STEP ITEM HEADER (CLICKABLE ACCORDION BAR) */}
                <button
                  onClick={() => togglePosAccordion(pos.level)}
                  className="w-full p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left cursor-pointer hover:bg-white/5 transition-all"
                >
                  <div className="flex items-start sm:items-center space-x-3.5 flex-1">
                    {/* Step Number Circle */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-black text-xs shrink-0 border ${
                      levelBadge.isTarget
                        ? 'bg-amber-400 text-slate-950 border-amber-300'
                        : isCurrent
                        ? 'bg-blue-500 text-white border-blue-400'
                        : isPassed
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-white/10 text-gray-300 border-white/20'
                    }`}>
                      {pos.level}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono text-gray-400 font-bold">
                          Adım {idx + 1} • Level {pos.level}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black border ${levelBadge.badgeColor}`}>
                          {isCurrent ? 'MEVCUT POZİSYONUM 📍' : levelBadge.label}
                        </span>
                        <span className="text-[10px] font-mono text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          {pos.category}
                        </span>
                      </div>

                      <h4 className="font-extrabold text-white text-sm sm:text-base pt-0.5">
                        {pos.name}
                      </h4>
                    </div>
                  </div>

                  {/* Arrival Date, Duration & Courses Count Toggle Button */}
                  <div className="flex items-center space-x-4 shrink-0 border-t sm:border-t-0 border-white/10 pt-2 sm:pt-0 justify-between sm:justify-end">
                    <div className="text-right space-y-0.5">
                      <span className="text-[10px] text-gray-400 font-mono block">Tahmini Ulaşma Zamanı &amp; Takvimi:</span>
                      <div className="text-xs font-mono font-black text-amber-300 flex items-center space-x-1 justify-end">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-white">{arrivalInfo.arrivalDate}</span>
                      </div>
                      <div className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1 justify-end font-semibold">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        <span>Kademe Süresi: <strong>{arrivalInfo.duration}</strong></span>
                      </div>
                    </div>

                    <div className="px-3 py-1.5 bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 text-xs font-mono font-black rounded-xl border border-amber-400/30 flex items-center space-x-1.5 transition-all">
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      <span>{pos.trainings.length} Ders</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-amber-300" /> : <ChevronDown className="w-4 h-4 text-amber-300" />}
                    </div>
                  </div>
                </button>

                {/* ACCORDION BODY: LIST OF COURSES FOR THIS STEP */}
                {isOpen && (
                  <div className="p-4 bg-[#061B33] border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-gray-300 pb-1">
                      <span>📚 {pos.name} Seviyesine Ait Zorunlu &amp; Seçmeli Eğitim Çizelgesi ({pos.trainings.length} Ders):</span>
                      <span>Tamamlanan: {pos.trainings.filter((t: any) => t.status === 'TAMAMLANDI').length} / {pos.trainings.length}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {pos.trainings.map((tr: any, tIdx: number) => (
                        <div
                          key={tIdx}
                          className={`p-3.5 rounded-xl border space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md ${
                            tr.isOverdue
                              ? 'bg-rose-500/10 border-rose-500/40'
                              : 'bg-[#0B2A4A] border-white/10'
                          }`}
                        >
                          <div className="space-y-1 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[9px] font-bold border border-blue-500/30">
                                {tr.category}
                              </span>
                              <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold flex items-center space-x-1 border ${
                                tr.isOverdue
                                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                                  : 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                              }`}>
                                <Calendar className="w-3 h-3" />
                                <span>Takvim: {tr.scheduleDate}</span>
                              </span>
                              {tr.isOverdue && (
                                <span className="px-2 py-0.5 rounded bg-rose-500 text-white font-mono text-[9px] font-extrabold flex items-center space-x-1 animate-pulse">
                                  <AlertTriangle className="w-3 h-3" />
                                  <span>⚠️ GECİKTİ ({tr.delayDays} GÜN)</span>
                                </span>
                              )}
                            </div>

                            <h5 className="font-extrabold text-white text-xs sm:text-sm pt-0.5">{tr.title}</h5>

                            <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-300 font-mono pt-0.5">
                              <span className="text-amber-300 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                                👨‍🏫 Eğitmen: <strong className="text-white">{tr.instructor}</strong>
                              </span>
                              <span>Durum: <strong className={tr.status === 'TAMAMLANDI' ? 'text-emerald-400' : tr.isOverdue ? 'text-rose-400' : 'text-amber-300'}>{tr.status}</strong></span>
                              {tr.score > 0 && <span>Sınav Notu: <strong className="text-emerald-400">{tr.score} / 100</strong></span>}
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 shrink-0">
                            {tr.progress > 0 && (
                              <div className="w-24 text-right hidden sm:block">
                                <span className="text-[10px] text-amber-300 font-mono font-bold">%{tr.progress}</span>
                                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-0.5">
                                  <div className={`h-full rounded-full ${tr.isOverdue ? 'bg-rose-400' : 'bg-emerald-400'}`} style={{ width: `${tr.progress}%` }} />
                                </div>
                              </div>
                            )}

                            <button
                              onClick={() => alert(`"${tr.title}" eğitimi başlatılıyor... (Eğitmen: ${tr.instructor})`)}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 shadow-md cursor-pointer transition-all ${
                                tr.isOverdue
                                  ? 'bg-rose-500 hover:bg-rose-600 text-white font-black'
                                  : tr.status === 'TAMAMLANDI'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                                  : tr.progress > 0
                                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-black'
                                  : 'bg-[#087F96] hover:bg-[#056B80] text-white'
                              }`}
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>{tr.isOverdue ? '🚨 Öncelikli Başlat' : tr.status === 'TAMAMLANDI' ? 'İncele' : tr.progress > 0 ? 'Kaldığım Yerden Devam Et' : 'Eğitime Başla'}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
