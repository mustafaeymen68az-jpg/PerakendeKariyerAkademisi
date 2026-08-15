'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Check, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  FileText, 
  Download, 
  Send, 
  Layers, 
  Award, 
  Clock, 
  Zap, 
  TrendingUp, 
  CheckSquare, 
  Star,
  Settings,
  Database,
  Lock,
  Headphones,
  Calendar,
  Briefcase
} from 'lucide-react';

export default function KurumsalFiyatlandirmaClient() {
  const formRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    title: '',
    email: '',
    phone: '',
    employeeCount: '101-250',
    subCount: '10-25',
    packageSelect: 'PKA LEARNING & CAREER',
    additionalServices: [] as string[],
    startDate: 'Hemen (1-2 Hafta)',
    notes: '',
    gdpr: false
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  // Active FAQ Accordions State
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  // Active Comparison View Tab for Mobile
  const [activeMobileTab, setActiveMobileTab] = useState<'learning' | 'career' | 'talent' | 'executive'>('career');

  const toggleFaq = (idx: number) => {
    setOpenFaqs(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    
    if (formErrors[name]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleCheckboxService = (serviceName: string) => {
    setFormData(prev => {
      const exists = prev.additionalServices.includes(serviceName);
      return {
        ...prev,
        additionalServices: exists 
          ? prev.additionalServices.filter(s => s !== serviceName)
          : [...prev.additionalServices, serviceName]
      };
    });
  };

  const scrollToForm = (pkgName?: string) => {
    if (pkgName) {
      setFormData(prev => ({ ...prev, packageSelect: pkgName }));
    }
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Ad Soyad zorunludur.';
    if (!formData.companyName.trim()) errs.companyName = 'Şirket Adı zorunludur.';
    if (!formData.email.trim()) errs.email = 'Kurumsal E-posta zorunludur.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Geçerli bir e-posta adresi giriniz.';
    
    if (!formData.phone.trim()) errs.phone = 'Telefon alanı zorunludur.';
    else if (formData.phone.replace(/\D/g, '').length < 10) errs.phone = 'Geçerli bir telefon numarası giriniz.';
    
    if (!formData.gdpr) errs.gdpr = 'KVKK aydınlatma metnini onaylamanız gerekmektedir.';

    return errs;
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setServerError('');

    try {
      // Map form fields to fit /api/requests schema safely
      const payload = {
        name: formData.name,
        companyName: formData.companyName,
        title: formData.title,
        email: formData.email,
        phone: formData.phone,
        city: 'İstanbul', // Default safe value
        employeeCount: parseInt(formData.employeeCount) || 150,
        subCount: parseInt(formData.subCount) || 15,
        training: `Kurumsal Paket: ${formData.packageSelect}`,
        department: 'Kurumsal Ücretlendirme Teklifi',
        notes: `İlgilenilen Ek Hizmetler: ${formData.additionalServices.join(', ') || 'Yok'}\nBaşlangıç Tarihi: ${formData.startDate}\nNotlar: ${formData.notes}`,
        gdpr: formData.gdpr
      };

      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
      } else {
        setServerError(result.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (err) {
      console.error(err);
      setServerError('Bağlantı hatası oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 17 Comparison Features Table Data
  const comparisonFeatures = [
    { name: 'Eğitim Yönetimi', l: true, c: true, t: true, e: true },
    { name: 'Eğitim İlerleme Takibi', l: true, c: true, t: true, e: true },
    { name: 'Sınav ve Sertifika', l: true, c: true, t: true, e: true },
    { name: 'Kariyer GPS', l: false, c: true, t: true, e: true },
    { name: 'Yetkinlik Pasaportu', l: false, c: true, t: true, e: true },
    { name: 'Terfi Hazırlık Skoru', l: false, c: true, t: true, e: true },
    { name: 'Saha Görevleri', l: false, c: true, t: true, e: true },
    { name: 'Yetkinlik Matrisi', l: false, c: false, t: true, e: true },
    { name: '9 Box Yetenek Matrisi', l: false, c: false, t: true, e: true },
    { name: 'Yetenek Havuzu', l: false, c: false, t: true, e: true },
    { name: 'Kritik Pozisyon Yedekleme', l: false, c: false, t: true, e: true },
    { name: 'Çalışan Kaybetme Riski Analizi', l: false, c: false, t: true, e: true },
    { name: 'Yönetici Dashboardu', l: false, c: false, t: false, e: true },
    { name: 'Yeni Mağaza Senaryoları', l: false, c: false, t: false, e: true },
    { name: 'Eğitim ROI Analizi', l: false, c: false, t: false, e: true },
    { name: 'SSO / API Seçenekleri', l: false, c: false, t: false, e: true },
    { name: 'Destek Seviyesi', l: 'Standart E-Posta', c: 'Öncelikli E-Posta', t: '7/24 Telefon & İK Desteği', e: 'Özel Müşteri Yöneticisi & SLA' }
  ];

  // FAQ List
  const faqs = [
    {
      q: 'Kurumsal fiyat nasıl hesaplanır?',
      a: 'Kurumsal fiyatlarımız; aktif çalışan sayısı, seçilen platform paketi (Learning, Career, Talent, Executive), içerik kütüphanesi kapsamı, entegrasyonlar, kuruma özel geliştirmeler ve destek seviyesine göre belirlenmektedir.'
    },
    {
      q: 'Aktif çalışan ne demektir?',
      a: 'Aktif çalışan; ilgili ücretlendirme döneminde sisteme giriş yapan, eğitim görüntüleyen, sınava katılan, saha görevi tamamlayan veya değerlendirme sürecine katılan kullanıcıdır.'
    },
    {
      q: 'Yalnızca eğitim modülünü satın alabilir miyiz?',
      a: 'Evet, temel dijitalleştirme ve eğitim takibi ihtiyaçlarınız için PKA LEARNING paketini tercih edebilirsiniz.'
    },
    {
      q: 'Paketimizi sonradan yükseltebilir miyiz?',
      a: 'Evet, ihtiyaçlarınız büyüdükçe dilediğiniz zaman bir üst pakete (örn. Career veya Talent) kolayca geçiş yapabilirsiniz. Ücret farkı kalan sözleşme süresine göre hesaplanır.'
    },
    {
      q: 'İlk kurulum ücretine neler dahildir?',
      a: 'Kurum hesabının açılması, logo ve kurumsal renk tanımı, organizasyon ve şube yapısının kurulması, çalışan verilerinin aktarımı, rol ve yetki tanımları, oryantasyon ve ilk 30 günlük başlangıç desteği dahildir.'
    },
    {
      q: 'İçerikler paket fiyatına dahil midir?',
      a: 'PKA standart zengin perakende eğitim kataloğu paket kapsamındadır. Şirketinize özel sıfırdan HD video çekimi veya özel modül tasarımları ek hizmet olarak bütçelenir.'
    },
    {
      q: 'Kendi eğitim içeriklerimizi yükleyebilir miyiz?',
      a: 'Evet! Kendi video, PDF, SCORM içeriklerinizi ve soru bankalarınızı platforma sınırsız olarak yükleyebilirsiniz.'
    },
    {
      q: 'Kuruma özel eğitim hazırlanabilir mi?',
      a: 'Evet, Perakende Akademisi prodüksiyon ekibimiz şirketinizin El Kitapçığına ve operasyon standartlarına özel HD video içerikler hazırlamaktadır.'
    },
    {
      q: 'Pilot uygulama ücretli midir?',
      a: 'Evet, 60–90 günlük 50–150 çalışan ve 3–10 mağaza kapsayan pilot uygulamalarımız 90.000–200.000 TL + KDV aralığında ücretlendirilir.'
    },
    {
      q: 'Pilot bedeli yıllık sözleşmeden düşülür mü?',
      a: 'Evet! Pilot uygulama sonrasında yıllık kurumsal sözleşmeye geçilmesi durumunda pilot bedelinin tamamı veya belirlenen bölümü ilk yıl lisans ücretinden mahsup edilir.'
    },
    {
      q: 'SSO veya İK sistemi entegrasyonu dahil midir?',
      a: 'SAP, Logo, Mikro, HRIS veya Active Directory SSO entegrasyonları Executive paketinde seçeneğe bağlı veya ek entegrasyon hizmeti olarak sunulur.'
    },
    {
      q: 'Çalışan sayımız değişirse ücret nasıl hesaplanır?',
      a: 'Dönem içi aktif çalışan sayısı artışlarında kademeli hacim avantajı uygulanarak ek lisanslandırma yapılır.'
    },
    {
      q: 'Verilerimiz başka kurumlarla karışır mı?',
      a: 'Hayır. Şirket verileriniz tamamen izole edilmiş (White-label & Tenancy), SSL şifrelemeli yüksek güvenlikli sunucularda saklanır.'
    },
    {
      q: 'Fiyatlara KDV dahil midir?',
      a: 'Tüm kurumsal paket ve hizmet fiyatlarımız KDV hariçtir.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* 1. HEADER SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#087F96]/10 text-[#087F96] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-[#087F96]/20">
            <Building2 className="h-4 w-4" />
            <span>Kurumsal Şirket Paketleri</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-[#0B2A4A] leading-tight">
            Kurumsal Ücretlendirme
          </h1>

          <p className="text-lg sm:text-xl font-bold text-[#087F96]">
            “Çalışan sayınıza ve ihtiyaç duyduğunuz modüllere göre ölçeklenen kurumsal çözümler.”
          </p>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium max-w-3xl mx-auto">
            Kurumsal fiyatlarımız; aktif çalışan sayısı, seçilen platform modülleri, içerik kütüphanesi, kuruma özel geliştirmeler, entegrasyonlar ve destek seviyesine göre belirlenmektedir.
          </p>
        </div>

        {/* TOP DISCLAIMER WARNING BANNER */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 text-xs text-amber-900 flex items-start space-x-3 max-w-5xl mx-auto shadow-xs">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold uppercase tracking-wider block text-[11px] text-amber-800">Fiyat ve Teklif Şeffaflık Uyarısı</span>
            <p className="leading-relaxed">
              Belirtilen fiyatlar tavsiye edilen başlangıç aralıklarıdır ve KDV hariçtir. Kesin kurumsal teklif; aktif çalışan sayısı, seçilen modüller, içerik kapsamı, entegrasyonlar, özelleştirmeler ve destek seviyesine göre hazırlanır.
            </p>
          </div>
        </div>

        {/* 2. PACKAGES GRID (4 CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* PACKAGE 1: PKA LEARNING */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  DİJİTAL EĞİTİM
                </span>
                <h2 className="font-display font-black text-xl text-[#0B2A4A]">PKA LEARNING</h2>
                <p className="text-[11px] text-gray-500 font-medium leading-snug">
                  Kurumsal eğitim süreçlerini dijitalleştirmek isteyen işletmeler.
                </p>
              </div>

              {/* Price Box */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-1 text-xs">
                <div className="text-gray-500 font-medium">Aylık Aktif Çalışan Başına:</div>
                <div className="text-2xl font-black text-[#0B2A4A]">90 – 160 TL</div>
                <div className="text-[10px] text-gray-400 font-mono pt-1 space-y-0.5">
                  <div>Min. Yıllık Sözleşme: <strong className="text-gray-700">180.000 TL</strong></div>
                  <div>İlk Kurulum: <strong className="text-gray-700">50.000 – 100.000 TL</strong></div>
                  <div className="text-amber-600 font-bold">KDV Hariçtir</div>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold text-[#0B2A4A] uppercase tracking-wider block">Paket Kapsamı:</span>
                <ul className="space-y-2 text-xs text-gray-600 font-medium">
                  {[
                    'Eğitim kataloğu',
                    'Eğitim atama',
                    'Video ve PDF içerikleri',
                    'Eğitim ilerleme takibi',
                    'Sınavlar',
                    'Sertifikalar',
                    'Temel eğitim raporları',
                    'Mağaza, bölge ve pozisyon filtreleri',
                    'Eğitim hatırlatmaları',
                    'Eğitim Müdürü paneli'
                  ].map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-2 text-[11px] leading-tight">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => scrollToForm('PKA LEARNING')}
                className="w-full py-3 bg-[#0B2A4A] hover:bg-[#061B33] text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center space-x-1"
              >
                <span>Kurumsal Teklif Al</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/talep-olustur"
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-[#0B2A4A] font-bold rounded-xl text-xs transition-colors flex items-center justify-center text-center"
              >
                Demo Talep Et
              </Link>
            </div>
          </div>

          {/* PACKAGE 2: PKA LEARNING & CAREER (HIGHLIGHTED / RECOMMENDED) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-[#087F96] shadow-2xl hover:shadow-2xl transition-all flex flex-col justify-between space-y-6 relative scale-102 lg:-translate-y-2">
            
            {/* Recommendation Ribbon */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md flex items-center space-x-1 border border-amber-300">
              <Star className="h-3 w-3 fill-current" />
              <span>EN ÇOK TERCİH EDİLEN</span>
            </div>

            <div className="space-y-4 pt-1">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#087F96] uppercase tracking-widest bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
                  EĞİTİM & KARİYER
                </span>
                <h2 className="font-display font-black text-xl text-[#0B2A4A]">PKA LEARNING & CAREER</h2>
                <p className="text-[11px] text-gray-500 font-medium leading-snug">
                  Çalışanların eğitim ve kariyer gelişimini birlikte yönetmek isteyen işletmeler.
                </p>
              </div>

              {/* Price Box */}
              <div className="bg-cyan-50/70 p-4 rounded-2xl border border-cyan-200 space-y-1 text-xs">
                <div className="text-gray-500 font-medium">Aylık Aktif Çalışan Başına:</div>
                <div className="text-2xl font-black text-[#087F96]">160 – 260 TL</div>
                <div className="text-[10px] text-gray-500 font-mono pt-1 space-y-0.5">
                  <div>Min. Yıllık Sözleşme: <strong className="text-gray-800">300.000 TL</strong></div>
                  <div>İlk Kurulum: <strong className="text-gray-800">100.000 – 200.000 TL</strong></div>
                  <div className="text-amber-600 font-bold">KDV Hariçtir</div>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold text-[#0B2A4A] uppercase tracking-wider block">PKA Learning + Ek Özellikler:</span>
                <ul className="space-y-2 text-xs text-gray-600 font-medium">
                  {[
                    'PKA Learning paketindeki bütün özellikler',
                    'Kariyer GPS',
                    'Kariyer yolları',
                    'Kariyer seviye testi',
                    'Yetkinlik pasaportu',
                    '90 günlük gelişim planı',
                    'Terfi hazırlık skoru',
                    'Çalışan ve yönetici geri bildirimi',
                    'Saha görevleri',
                    'Kişisel kariyer hedefleri'
                  ].map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-2 text-[11px] leading-tight">
                      <Check className="h-4 w-4 text-[#087F96] shrink-0 mt-0.5 font-bold" />
                      <span className={fIdx === 0 ? 'font-bold text-[#0B2A4A]' : ''}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => scrollToForm('PKA LEARNING & CAREER')}
                className="w-full py-3.5 bg-[#087F96] hover:bg-[#056B80] text-white font-black rounded-xl text-xs transition-colors shadow-md flex items-center justify-center space-x-1"
              >
                <span>Kurumsal Teklif Al</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/talep-olustur"
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-[#0B2A4A] font-bold rounded-xl text-xs transition-colors flex items-center justify-center text-center"
              >
                Demo Talep Et
              </Link>
            </div>
          </div>

          {/* PACKAGE 3: PKA TALENT */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-purple-700 uppercase tracking-widest bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                  YETENEK YÖNETİMİ
                </span>
                <h2 className="font-display font-black text-xl text-[#0B2A4A]">PKA TALENT</h2>
                <p className="text-[11px] text-gray-500 font-medium leading-snug">
                  Yetkinlik, yetenek ve terfi süreçlerini yönetmek isteyen İK ekipleri.
                </p>
              </div>

              {/* Price Box */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-1 text-xs">
                <div className="text-gray-500 font-medium">Aylık Aktif Çalışan Başına:</div>
                <div className="text-2xl font-black text-[#0B2A4A]">230 – 390 TL</div>
                <div className="text-[10px] text-gray-400 font-mono pt-1 space-y-0.5">
                  <div>Min. Yıllık Sözleşme: <strong className="text-gray-700">480.000 TL</strong></div>
                  <div>İlk Kurulum: <strong className="text-gray-700">150.000 – 350.000 TL</strong></div>
                  <div className="text-amber-600 font-bold">KDV Hariçtir</div>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold text-[#0B2A4A] uppercase tracking-wider block">PKA Career + Ek Özellikler:</span>
                <ul className="space-y-2 text-xs text-gray-600 font-medium">
                  {[
                    'Learning & Career paketindeki bütün özellikler',
                    'Yetkinlik matrisi',
                    '9 Box yetenek matrisi',
                    'Yetenek havuzu',
                    'Terfi yönetimi & Terfi komitesi',
                    'Kritik pozisyon yedekleme',
                    'Çalışan kaybetme risk analizi',
                    'Organizasyon haritası',
                    'Yönetici aday havuzu',
                    'Gelişmiş İK raporları (PDF/Excel)'
                  ].map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-2 text-[11px] leading-tight">
                      <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                      <span className={fIdx === 0 ? 'font-bold text-[#0B2A4A]' : ''}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => scrollToForm('PKA TALENT')}
                className="w-full py-3 bg-[#0B2A4A] hover:bg-[#061B33] text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center space-x-1"
              >
                <span>Kurumsal Teklif Al</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/talep-olustur"
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-[#0B2A4A] font-bold rounded-xl text-xs transition-colors flex items-center justify-center text-center"
              >
                Demo Talep Et
              </Link>
            </div>
          </div>

          {/* PACKAGE 4: PKA EXECUTIVE (SPECIAL OFFER HIGHLIGHTED) */}
          <div className="bg-gradient-to-b from-[#061B33] to-[#0B2A4A] text-white rounded-3xl p-6 border border-cyan-400/40 shadow-xl flex flex-col justify-between space-y-6 relative">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-widest bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  STRATEJİK LİDERLİK
                </span>
                <h2 className="font-display font-black text-xl text-white">PKA EXECUTIVE</h2>
                <p className="text-[11px] text-gray-300 font-light leading-snug">
                  İnsan sermayesini ve gelecekteki yönetici ihtiyacını stratejik olarak yönetmek isteyen büyük işletmeler.
                </p>
              </div>

              {/* Special Offer Highlight Box */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-amber-400/40 space-y-2 text-xs">
                <div className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                  ÖZEL TEKLİF MİMARİSİ
                </div>
                <div className="text-2xl font-black text-amber-300">Özel Teklif İste</div>
                <div className="text-[10px] text-gray-300 font-mono space-y-0.5 border-t border-white/10 pt-1.5">
                  <div>Tavsiye Başlangıç: <strong>320 – 550 TL/Ay</strong></div>
                  <div>Min. Yıllık: <strong>750.000 TL</strong> • Kurulum: <strong>250k–600k TL</strong></div>
                  <div className="text-amber-300 font-bold">KDV Hariçtir</div>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold text-amber-300 uppercase tracking-wider block">Tüm Paketler + Stratejik Yönetim:</span>
                <ul className="space-y-2 text-xs text-gray-200 font-light">
                  {[
                    'Önceki paketlerdeki bütün özellikler',
                    'Yönetici dashboardu & İnsan sermayesi analitiği',
                    'Bölge ve mağaza karşılaştırması',
                    'Yönetici aday havuzu & Kritik riskler',
                    'Yeni mağaza açılış senaryoları',
                    'Eğitim yatırım getirisi analizi (ROI)',
                    'Yönetim kurulu raporları',
                    'Kuruma özel KPI yapılandırması',
                    'SSO ve API entegrasyon seçenekleri',
                    'Öncelikli destek & SLA garantisi'
                  ].map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-2 text-[11px] leading-tight">
                      <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5 font-bold" />
                      <span className={fIdx === 0 ? 'font-bold text-white' : ''}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10">
              <button
                onClick={() => scrollToForm('PKA EXECUTIVE')}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs transition-colors shadow-lg flex items-center justify-center space-x-1"
              >
                <span>Özel Teklif İste</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/talep-olustur"
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center text-center border border-white/20"
              >
                Yönetici Demosu Talep Et
              </Link>
            </div>
          </div>

        </div>

        {/* 3. FEATURE COMPARISON MATRIX (PAKET KARŞILAŞTIRMA TABLOSU) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-black text-[#087F96] bg-cyan-50 px-3.5 py-1 rounded-full border border-cyan-200 uppercase tracking-wider">
              Detaylı Karşılaştırma Matrisi
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B2A4A]">
              Paket Özellik Karşılaştırma Tablosu
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Dört kurumsal paketin tüm teknik ve operasyonel modül kapsamları:
            </p>
          </div>

          {/* Desktop Matrix Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#0B2A4A] text-white uppercase font-black tracking-wider">
                  <th className="p-4 border-r border-white/10 w-2/5">Özellik / Modül Kapsamı</th>
                  <th className="p-4 border-r border-white/10 text-center w-1/7">PKA Learning</th>
                  <th className="p-4 border-r border-white/10 text-center w-1/7 bg-[#087F96] text-amber-300">PKA Career</th>
                  <th className="p-4 border-r border-white/10 text-center w-1/7">PKA Talent</th>
                  <th className="p-4 text-center w-1/7 text-amber-300">PKA Executive</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-medium">
                {comparisonFeatures.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-gray-50/60' : 'bg-white'}>
                    <td className="p-3.5 font-bold text-[#0B2A4A]">{row.name}</td>
                    
                    {/* Learning */}
                    <td className="p-3.5 text-center border-r border-gray-200">
                      {typeof row.l === 'boolean' ? (
                        row.l ? <Check className="h-5 w-5 text-emerald-600 mx-auto font-bold" /> : <span className="text-gray-300 text-lg">•</span>
                      ) : <span className="text-[11px] text-gray-600 font-bold">{row.l}</span>}
                    </td>

                    {/* Career */}
                    <td className="p-3.5 text-center border-r border-gray-200 bg-cyan-50/40">
                      {typeof row.c === 'boolean' ? (
                        row.c ? <Check className="h-5 w-5 text-[#087F96] mx-auto font-black" /> : <span className="text-gray-300 text-lg">•</span>
                      ) : <span className="text-[11px] text-[#087F96] font-bold">{row.c}</span>}
                    </td>

                    {/* Talent */}
                    <td className="p-3.5 text-center border-r border-gray-200">
                      {typeof row.t === 'boolean' ? (
                        row.t ? <Check className="h-5 w-5 text-purple-600 mx-auto font-bold" /> : <span className="text-gray-300 text-lg">•</span>
                      ) : <span className="text-[11px] text-purple-900 font-bold">{row.t}</span>}
                    </td>

                    {/* Executive */}
                    <td className="p-3.5 text-center bg-slate-900 text-white">
                      {typeof row.e === 'boolean' ? (
                        row.e ? <Check className="h-5 w-5 text-amber-400 mx-auto font-black" /> : <span className="text-gray-600 text-lg">•</span>
                      ) : <span className="text-[11px] text-amber-300 font-bold">{row.e}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Accordion / Vertical Cards View (No Horizontal Overflow) */}
          <div className="lg:hidden space-y-4">
            <div className="flex rounded-xl bg-gray-100 p-1 text-xs font-bold">
              <button
                onClick={() => setActiveMobileTab('learning')}
                className={`flex-1 py-2 text-center rounded-lg transition-all ${activeMobileTab === 'learning' ? 'bg-[#0B2A4A] text-white shadow-xs' : 'text-gray-600'}`}
              >
                Learning
              </button>
              <button
                onClick={() => setActiveMobileTab('career')}
                className={`flex-1 py-2 text-center rounded-lg transition-all ${activeMobileTab === 'career' ? 'bg-[#087F96] text-white shadow-xs font-black' : 'text-gray-600'}`}
              >
                Career ★
              </button>
              <button
                onClick={() => setActiveMobileTab('talent')}
                className={`flex-1 py-2 text-center rounded-lg transition-all ${activeMobileTab === 'talent' ? 'bg-purple-900 text-white shadow-xs' : 'text-gray-600'}`}
              >
                Talent
              </button>
              <button
                onClick={() => setActiveMobileTab('executive')}
                className={`flex-1 py-2 text-center rounded-lg transition-all ${activeMobileTab === 'executive' ? 'bg-slate-900 text-amber-300 shadow-xs' : 'text-gray-600'}`}
              >
                Exec
              </button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 divide-y divide-gray-200">
              {comparisonFeatures.map((feat, idx) => {
                let val: React.ReactNode = null;
                if (activeMobileTab === 'learning') {
                  val = typeof feat.l === 'boolean' ? (feat.l ? <span className="text-emerald-600 font-bold">✓ Var</span> : <span className="text-gray-400">Yok</span>) : feat.l;
                } else if (activeMobileTab === 'career') {
                  val = typeof feat.c === 'boolean' ? (feat.c ? <span className="text-[#087F96] font-bold">✓ Var</span> : <span className="text-gray-400">Yok</span>) : feat.c;
                } else if (activeMobileTab === 'talent') {
                  val = typeof feat.t === 'boolean' ? (feat.t ? <span className="text-purple-700 font-bold">✓ Var</span> : <span className="text-gray-400">Yok</span>) : feat.t;
                } else {
                  val = typeof feat.e === 'boolean' ? (feat.e ? <span className="text-amber-600 font-bold">✓ Var</span> : <span className="text-gray-400">Yok</span>) : feat.e;
                }

                return (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0B2A4A]">{feat.name}</span>
                    <span className="text-[11px] font-semibold">{val}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. VOLUME ADVANTAGE POLICY SECTION (ÇALIŞAN SAYISINA GÖRE HACİM AVANTAJI) */}
        <div className="bg-gradient-to-br from-[#0B2A4A] to-[#061B33] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Ölçeklenebilir Ticari Şartlar
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
              Çalışan Sayısına Göre Hacim Avantajı Politikası
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 font-light leading-relaxed">
              Şirketinizin aktif çalışan sayısı arttıkça birim kullanıcı maliyetleriniz otomatik olarak düşer:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-1">
              <div className="text-gray-300 font-bold text-[11px]">1 – 100 Aktif Çalışan</div>
              <div className="text-lg font-black text-white">Liste Fiyatı</div>
              <div className="text-[10px] text-gray-300 font-sans font-light">Standart başlangıç birim fiyatı.</div>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-1">
              <div className="text-cyan-300 font-bold text-[11px]">101 – 250 Aktif Çalışan</div>
              <div className="text-lg font-black text-cyan-300">%8’e Kadar Hacim Avantajı</div>
              <div className="text-[10px] text-gray-300 font-sans font-light">Bölgesel zincirler için avantajlı ölçek.</div>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-1">
              <div className="text-emerald-300 font-bold text-[11px]">251 – 500 Aktif Çalışan</div>
              <div className="text-lg font-black text-emerald-300">%15’e Kadar Hacim Avantajı</div>
              <div className="text-[10px] text-gray-300 font-sans font-light">Büyüyen market ağları için optimize.</div>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-1">
              <div className="text-amber-300 font-bold text-[11px]">501 – 1.000 Aktif Çalışan</div>
              <div className="text-lg font-black text-amber-300">%22’ye Kadar Hacim Avantajı</div>
              <div className="text-[10px] text-gray-300 font-sans font-light">Büyük ulusal perakende zincirleri.</div>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-1">
              <div className="text-purple-300 font-bold text-[11px]">1.001 – 2.500 Aktif Çalışan</div>
              <div className="text-lg font-black text-purple-300">%30’a Kadar Hacim Avantajı</div>
              <div className="text-[10px] text-gray-300 font-sans font-light">Makro perakende operasyonları.</div>
            </div>

            <div className="bg-amber-400/20 p-4 rounded-2xl border border-amber-400/40 space-y-1">
              <div className="text-amber-300 font-bold text-[11px]">2.501 ve Üzeri Çalışan</div>
              <div className="text-lg font-black text-amber-300">Özel Teklif & Enterprise</div>
              <div className="text-[10px] text-gray-200 font-sans font-light">Özel SLA, SSO ve adanmış sunucu mimarisi.</div>
            </div>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-2xl border border-white/10 text-xs space-y-2 font-sans leading-relaxed">
            <span className="font-bold text-amber-300 text-[11px] block">📌 Aktif Çalışan Tanımı & Sözleşme Şartı:</span>
            <p className="text-gray-300 font-light">
              “Aktif çalışan; ilgili ücretlendirme döneminde sisteme giriş yapan, eğitim görüntüleyen, sınava katılan, saha görevi tamamlayan veya değerlendirme sürecine katılan kullanıcıdır.”
            </p>
            <p className="text-[11px] text-gray-400">
              * Minimum kullanıcı ve minimum yıllık sözleşme tutarları kurumsal şartlara bağlı olarak uygulanır.
            </p>
          </div>
        </div>

        {/* 5. SETUP FEE SCOPE & PAID PILOT PROGRAM GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* SETUP FEE SCOPE (KURULUM BEDELİ KAPSAMI) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
                Devreye Alma Hizmetleri
              </span>
              <h3 className="font-display font-black text-2xl text-[#0B2A4A]">
                Kurulum Bedeli Kapsamı
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                İlk kurulum ve şirketinizin sisteme adaptasyonu sürecinde sağlanan hizmetler:
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-gray-700 font-medium">
              {[
                'Kurum hesabının ve alan adının (White-Label) açılması',
                'Logo, kurumsal renkler ve arayüz temasının tanımlanması',
                'Şirket organizasyon yapısının sisteme aktarılması',
                'Bölge, mağaza ve departman hiyerarşisinin kurulması',
                'Çalışan verilerinin toplu Excel/CSV aktarımı ile sisteme işlenmesi',
                'Kullanıcı rol ve yetki matrislerinin tanımlanması',
                'Temel pozisyon kariyer ve yetkinlik eşleştirmeleri',
                'İnsan Kaynakları ve Eğitim Yöneticileri oryantasyonu',
                'Test yayını, kabul süreçleri ve canlıya alma desteği',
                'Canlıya geçiş sonrasındaki ilk 30 günlük başlangıç desteği'
              ].map((step, sIdx) => (
                <li key={sIdx} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#087F96] shrink-0 mt-0.5" />
                  <span className="leading-snug">{step}</span>
                </li>
              ))}
            </ul>

            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-[11px] text-gray-500 italic">
              * Kurulum kapsamı kurumun çalışan sayısı, veri yapısı ve entegrasyon ihtiyaçlarına göre değişebilir.
            </div>
          </div>

          {/* PAID PILOT PROGRAM (PİLOT UYGULAMA ALANI) */}
          <div className="bg-gradient-to-br from-[#061B33] via-[#0B2A4A] to-[#087F96] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#087F96]/40 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-black text-amber-300 bg-amber-400/20 px-3.5 py-1 rounded-full border border-amber-400/40 uppercase tracking-wider">
                  Düşük Riskli Başlangıç
                </span>
                <h3 className="font-display font-black text-2xl text-white">
                  Ücretli Pilot Uygulama Alanı
                </h3>
                <p className="text-xs text-gray-200 font-light leading-relaxed">
                  Tüm şirkete yayılmadan önce seçili pilot mağazalarınızda akademiyi deneyimleyin:
                </p>
              </div>

              {/* Pilot Specs Box */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center text-amber-300 font-bold border-b border-white/10 pb-2">
                  <span>⏱️ Süre: 60 – 90 Gün</span>
                  <span>🏬 3 – 10 Mağaza</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-200 pt-1">
                  <div>👥 Kapsam: 50–150 Çalışan</div>
                  <div>📚 5–10 Eğitim Modülü</div>
                  <div>📊 Canlı Sınav & Rapor</div>
                  <div>📜 Gelişim Karneleri</div>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-sm font-black">
                  <span className="text-gray-300 font-sans">Pilot Fiyatı:</span>
                  <span className="text-amber-300 text-lg">90.000 – 200.000 TL + KDV</span>
                </div>
              </div>

              {/* Pilot Deduction Guarantee Note */}
              <div className="bg-emerald-500/20 p-3.5 rounded-xl border border-emerald-400/30 text-xs text-emerald-200 leading-relaxed font-light">
                <strong>💡 Mahsup Garantisi:</strong> Pilot uygulama sonrasında yıllık kurumsal sözleşmeye geçilmesi durumunda pilot bedelinin tamamı veya belirlenen bir bölümü <strong>ilk yıl lisans ücretinden mahsup edilir.</strong>
              </div>
            </div>

            <button
              onClick={() => scrollToForm('PİLOT UYGULAMA')}
              className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs transition-colors shadow-lg flex items-center justify-center space-x-2"
            >
              <Zap className="h-4 w-4 text-slate-950 fill-current" />
              <span>Pilot Uygulama Talep Et</span>
            </button>
          </div>

        </div>

        {/* 6. ADDITIONAL OPTIONAL SERVICES (EK HİZMETLER) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-black text-purple-900 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-300 uppercase tracking-wider">
              İsteğe Bağlı Özelleştirmeler
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#0B2A4A]">
              Ek Hizmetler ve Danışmanlık Seçenekleri
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Paketlerin dışında kurum ihtiyacınıza göre projelendirilen isteğe bağlı hizmetler:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-medium">
            {[
              { name: 'Kuruma Özel HD Video Çekimi', tag: 'Prodüksiyon' },
              { name: 'Özel Eğitim Modülü Tasarımı', tag: 'İçerik' },
              { name: 'Kuruma Özel Soru Bankası', tag: 'Sınav' },
              { name: 'White-Label Özel Domain', tag: 'Markalama' },
              { name: 'Active Directory / SSO', tag: 'Güvenlik' },
              { name: 'Bordro / HRIS Entegrasyonu', tag: 'Veri' },
              { name: 'Özel ERP / API Entegrasyonu', tag: 'Yazılım' },
              { name: 'Özel Dashboard ve Raporlama', tag: 'Analitik' },
              { name: 'Veri Temizleme ve Aktarım', tag: 'Veri' },
              { name: 'Yerinde Saha Danışmanlığı', tag: 'Danışmanlık' },
              { name: 'İç Eğitmen Yetiştirme (TTT)', tag: 'Akademi' },
              { name: 'Premium SLA & Öncelikli Deste', tag: 'Destek' },
              { name: 'Re-Branding Arayüz Teması', tag: 'Tasarım' },
              { name: 'Mağaza Audit Formları', tag: 'Denetim' }
            ].map((srv, idx) => (
              <div key={idx} className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#087F96] bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 uppercase">
                    {srv.tag}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">Proje Bazlı</span>
                </div>
                <div className="font-bold text-[#0B2A4A] text-xs">{srv.name}</div>
                <div className="text-[10px] text-gray-500 font-medium italic pt-1 border-t border-gray-200">
                  Proje kapsamına göre tekliflendirilir
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. PAYMENT & CONTRACT POLICY SECTION (ÖDEME VE SÖZLEŞME POLİTİKASI) */}
        <div className="bg-gray-100 rounded-3xl p-6 sm:p-8 border border-gray-300 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-gray-600 uppercase tracking-wider">TİCARİ ŞARTLAR</span>
            <h3 className="font-display font-black text-xl text-[#0B2A4A]">Ödeme ve Sözleşme Politikası</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-medium text-gray-700">
            <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-1">
              <div className="font-bold text-[#0B2A4A] flex items-center space-x-1">
                <Clock className="h-4 w-4 text-[#087F96]" />
                <span>Sözleşme Süresi</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-snug">Minimum sözleşme süresi 12 aydır. 24 ve 36 aylık taahhütlerde özel ticari indirimler uygulanır.</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-1">
              <div className="font-bold text-[#0B2A4A] flex items-center space-x-1">
                <FileText className="h-4 w-4 text-emerald-600" />
                <span>Ödeme Koşulları</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-snug">Ödemeler yıllık peşin veya anlaşılan kurumsal vadelerle faturalandırılır. Tüm fiyatlar KDV hariçtir.</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-1">
              <div className="font-bold text-[#0B2A4A] flex items-center space-x-1">
                <Users className="h-4 w-4 text-amber-600" />
                <span>Kullanıcı Aşımı</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-snug">Taahhüt edilen aktif çalışan sayısı aşıldığında ek kullanıcılar geçerli kademe fiyatından eklenir.</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-1">
              <div className="font-bold text-[#0B2A4A] flex items-center space-x-1">
                <Settings className="h-4 w-4 text-purple-600" />
                <span>Kapsam Dışı İşler</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-snug">Özel entegrasyonlar, kuruma özel film çekimleri ve ek yazılım geliştirmeleri paket fiyatına dahil değildir.</p>
            </div>
          </div>
        </div>

        {/* 8. FAQ ACCORDION SECTION (SIK SORULAN SORULAR) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-md space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-black text-[#087F96] bg-cyan-50 px-3.5 py-1 rounded-full border border-cyan-200 uppercase tracking-wider">
              Merak Edilenler
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-[#0B2A4A]">
              Sık Sorulan Sorular
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Kurumsal ücretlendirme, lisanslama ve devriye alma süreçleri hakkında net yanıtlar:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map((faq, fIdx) => {
              const isOpen = !!openFaqs[fIdx];
              return (
                <div 
                  key={fIdx} 
                  className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(fIdx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#0B2A4A] flex items-center justify-between space-x-2 hover:bg-gray-100 transition-colors"
                  >
                    <span className="flex items-center space-x-2">
                      <HelpCircle className="h-4 w-4 text-[#087F96] shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-[#087F96] shrink-0" /> : <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-gray-600 font-medium leading-relaxed border-t border-gray-200/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 9. QUOTE FORM SECTION (KURUMSAL FİYAT TEKLİFİ AL FORMU) */}
        <div ref={formRef} className="bg-gradient-to-br from-[#0B2A4A] via-[#061B33] to-[#087F96] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#087F96]/40 space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-amber-300 bg-amber-400/20 px-3.5 py-1 rounded-full border border-amber-400/30 uppercase tracking-wider">
              Anında İletişime Geçin
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
              Kurumsal Fiyat Teklifi Alın
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 font-light max-w-xl mx-auto">
              Şirketinizin çalışan sayısına ve ihtiyaç duyduğunuz modüllere özel kurumsal teklifinizi hazırlayıp 24 saat içinde sunalım.
            </p>
          </div>

          {isSuccess ? (
            <div className="bg-emerald-500/20 border border-emerald-400 text-white p-8 rounded-3xl text-center space-y-4 max-w-xl mx-auto">
              <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
              <h3 className="font-display font-bold text-xl text-white">Talebiniz Başarıyla Alınmıştır!</h3>
              <p className="text-xs text-gray-200 leading-relaxed font-light">
                Talebiniz alınmıştır. Kurumsal çözüm ekibimiz ihtiyaçlarınızı değerlendirdikten sonra sizinle iletişime geçecektir.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="px-6 py-2.5 bg-white text-[#0B2A4A] font-bold rounded-xl text-xs"
              >
                Yeni Talep Oluştur
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs font-medium">
              
              {serverError && (
                <div className="p-4 bg-rose-500/20 border border-rose-400 text-rose-200 rounded-xl text-xs">
                  {serverError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Ad Soyad */}
                <div className="space-y-1">
                  <label className="text-gray-200 font-bold block">Ad Soyad <span className="text-amber-400">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Örn: Ahmet Yılmaz"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                  />
                  {formErrors.name && <span className="text-rose-300 text-[10px] font-bold">{formErrors.name}</span>}
                </div>

                {/* Şirket Adı */}
                <div className="space-y-1">
                  <label className="text-gray-200 font-bold block">Şirket Adı <span className="text-amber-400">*</span></label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Örn: ABC Hipermarket A.Ş."
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                  />
                  {formErrors.companyName && <span className="text-rose-300 text-[10px] font-bold">{formErrors.companyName}</span>}
                </div>

                {/* Unvan */}
                <div className="space-y-1">
                  <label className="text-gray-200 font-bold block">Unvanınız</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Örn: İK Direktörü / Akademi Müdürü"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Kurumsal E-posta */}
                <div className="space-y-1">
                  <label className="text-gray-200 font-bold block">Kurumsal E-posta <span className="text-amber-400">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ahmet@sirketiniz.com"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                  />
                  {formErrors.email && <span className="text-rose-300 text-[10px] font-bold">{formErrors.email}</span>}
                </div>

                {/* Telefon */}
                <div className="space-y-1">
                  <label className="text-gray-200 font-bold block">Telefon <span className="text-amber-400">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0532 000 00 00"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                  />
                  {formErrors.phone && <span className="text-rose-300 text-[10px] font-bold">{formErrors.phone}</span>}
                </div>

                {/* Çalışan Sayısı */}
                <div className="space-y-1">
                  <label className="text-gray-200 font-bold block">Çalışan Sayısı</label>
                  <select
                    name="employeeCount"
                    value={formData.employeeCount}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl bg-[#061B33] border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="1-100">1 – 100 Aktif Çalışan</option>
                    <option value="101-250">101 – 250 Aktif Çalışan</option>
                    <option value="251-500">251 – 500 Aktif Çalışan</option>
                    <option value="501-1000">501 – 1.000 Aktif Çalışan</option>
                    <option value="1001-2500">1.001 – 2.500 Aktif Çalışan</option>
                    <option value="2501+">2.501 ve Üzeri (Enterprise)</option>
                  </select>
                </div>

                {/* Mağaza / Şube Sayısı */}
                <div className="space-y-1">
                  <label className="text-gray-200 font-bold block">Mağaza / Şube Sayısı</label>
                  <select
                    name="subCount"
                    value={formData.subCount}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl bg-[#061B33] border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="1-5">1 – 5 Mağaza</option>
                    <option value="6-20">6 – 20 Mağaza</option>
                    <option value="21-50">21 – 50 Mağaza</option>
                    <option value="51-100">51 – 100 Mağaza</option>
                    <option value="100+">100+ Mağaza</option>
                  </select>
                </div>

                {/* İlgilenilen Paket */}
                <div className="space-y-1">
                  <label className="text-gray-200 font-bold block">İlgilenilen Paket</label>
                  <select
                    name="packageSelect"
                    value={formData.packageSelect}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl bg-[#061B33] border border-white/20 text-amber-300 font-bold focus:outline-none focus:border-amber-400"
                  >
                    <option value="PKA LEARNING">PKA LEARNING (Dijital Eğitim)</option>
                    <option value="PKA LEARNING & CAREER">PKA LEARNING & CAREER (Önerilen)</option>
                    <option value="PKA TALENT">PKA TALENT (Yetenek Yönetimi)</option>
                    <option value="PKA EXECUTIVE">PKA EXECUTIVE (Stratejik Liderlik)</option>
                    <option value="PİLOT UYGULAMA">Ücretli Pilot Uygulama (60-90 Gün)</option>
                  </select>
                </div>
              </div>

              {/* İlgilenilen Ek Hizmetler (Checkboxes) */}
              <div className="space-y-2 pt-2">
                <label className="text-gray-200 font-bold block">İlgilenilen Ek Hizmetler (Opsiyonel)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                  {[
                    'Kuruma Özel HD Video Çekimi',
                    'White-Label Özel Domain',
                    'SSO / Active Directory',
                    'Bordro / HRIS Entegrasyonu',
                    'İç Eğitmen Yetiştirme (TTT)',
                    'Yerinde Saha Danışmanlığı'
                  ].map((srv, idx) => {
                    const isChecked = formData.additionalServices.includes(srv);
                    return (
                      <label key={idx} className="flex items-center space-x-2 bg-white/5 p-2 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxService(srv)}
                          className="rounded text-amber-400 focus:ring-0"
                        />
                        <span className="text-gray-200">{srv}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Açıklama / Notlar */}
              <div className="space-y-1 pt-1">
                <label className="text-gray-200 font-bold block">Açıklama / Notlar</label>
                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Şirketinizin özel ihtiyaçları, entegrasyon veya hedef tarih detayları..."
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* KVKK Approval */}
              <div className="space-y-1 pt-1">
                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="gdpr"
                    checked={formData.gdpr}
                    onChange={handleInputChange}
                    className="mt-0.5 rounded text-amber-400 focus:ring-0"
                  />
                  <span className="text-[11px] text-gray-300 leading-snug">
                    <Link href="/kurumsal-veri-guvenligi" className="underline text-amber-300">KVKK Aydınlatma Metni</Link>'ni okudum ve kişisel verilerimin teklif hazırlanması amacıyla işlenmesini onaylıyorum. <span className="text-amber-400">*</span>
                  </span>
                </label>
                {formErrors.gdpr && <span className="text-rose-300 text-[10px] font-bold block">{formErrors.gdpr}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-sm transition-all shadow-xl flex items-center justify-center space-x-2 scale-102 hover:scale-105"
              >
                {isSubmitting ? (
                  <span>Gönderiliyor...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4 fill-current" />
                    <span>Kurumsal Fiyat Teklifi Al</span>
                  </>
                )}
              </button>

            </form>
          )}
        </div>

        {/* BOTTOM DISCLAIMER WARNING */}
        <div className="text-center text-[11px] text-gray-500 max-w-3xl mx-auto space-y-1 border-t border-gray-200 pt-6">
          <p className="font-bold text-gray-700">Yasal Fiyat Uyarısı:</p>
          <p className="leading-relaxed font-light">
            “Belirtilen fiyatlar tavsiye edilen başlangıç aralıklarıdır ve KDV hariçtir. Kesin kurumsal teklif; aktif çalışan sayısı, seçilen modüller, içerik kapsamı, entegrasyonlar, özelleştirmeler ve destek seviyesine göre hazırlanır.”
          </p>
        </div>

      </div>
    </div>
  );
}
