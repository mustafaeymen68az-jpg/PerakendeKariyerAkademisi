'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Building2,
  Briefcase,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ChevronDown,
  UserPlus
} from 'lucide-react';
import Logo from '@/components/Logo';
import HomePageBackground from '@/components/HomePageBackground';

const POSITIONS = [
  'Açık Şarküteri Reyonu Satış Elemanı',
  'Bilgi İşlem',
  'Bölge Müdürü',
  'CEO / Genel Müdür / İşletme Sahibi',
  'E-Ticaret ve Online Sipariş',
  'Finans',
  'Güvenlik ve Kayıp Önleme',
  'İnsan Kaynakları',
  'Kasap Reyonu Satış Elemanı',
  'Kasiyer',
  'Kuruyemiş Reyonu Satış Elemanı',
  'Lojistik ve Depo',
  'Mağaza Müdür Yardımcıları',
  'Mağaza Müdürleri',
  'Meyve Sebze Reyonu Satış Elemanı',
  'Muhasebe',
  'Müşteri Hizmetleri ve Danışma',
  'Pazarlama ve CRM',
  'Rapor Analiz',
  'Reyon Satış Elemanları',
  'Satınalma ve Kategori Yönetimi',
  'Taze Gıda Reyonları',
  'Teknik Bakım ve İdari İşler',
  'Temizlik ve Destek Hizmetleri',
  'Unlu Mamuller ve Hazır Yemek Reyonu',
  'Diğer'
];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    position: '',
    customPosition: '',
    companyName: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errs.name = 'İsim giriniz.';
      isValid = false;
    }
    if (!formData.surname.trim()) {
      errs.surname = 'Soyisim giriniz.';
      isValid = false;
    }
    if (!formData.email.trim()) {
      errs.email = 'E-posta adresi giriniz.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Geçerli bir e-posta adresi giriniz.';
      isValid = false;
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Telefon numarası giriniz.';
      isValid = false;
    }
    if (!formData.position) {
      errs.position = 'Lütfen pozisyonunuzu seçiniz.';
      isValid = false;
    } else if (formData.position === 'Diğer' && !formData.customPosition.trim()) {
      errs.customPosition = 'Lütfen pozisyonunuzu belirtiniz.';
      isValid = false;
    }
    if (!formData.companyName.trim()) {
      errs.companyName = 'Çalıştığınız kurumu / işletmeyi giriniz.';
      isValid = false;
    }
    if (!formData.password) {
      errs.password = 'Şifre belirleyiniz.';
      isValid = false;
    } else if (formData.password.length < 6) {
      errs.password = 'En az 6 karakter olmalıdır.';
      isValid = false;
    }

    setErrors(errs);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError('');

    const finalTitle = formData.position === 'Diğer' ? formData.customPosition : formData.position;

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          phone: formData.phone,
          title: finalTitle,
          companyName: formData.companyName,
          password: formData.password,
        }),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          window.location.href = result.redirectUrl || '/panel';
        }, 1200);
      } else {
        setServerError(result.message || 'Kayıt sırasında bir hata oluştu.');
      }
    } catch (err) {
      console.error(err);
      setServerError('Sunucu ile bağlantı kurulamadı.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Home Page UI */}
      <HomePageBackground />

      {/* Crystal Clear Form Overlay */}
      <div className="fixed inset-0 z-50 bg-black/20 overflow-y-auto flex items-center justify-center p-4 py-6 sm:py-10">
        <div className="max-w-md w-full bg-white p-7 sm:p-9 rounded-3xl border-2 border-[#087F96]/40 shadow-[0_25px_70px_rgba(0,0,0,0.25)] relative overflow-hidden space-y-5 my-auto">
          
          {/* Top Decorative Gradient */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0B2A4A] via-[#087F96] to-[#34A853]" />

          {/* Brand Header */}
          <div className="flex justify-center pb-2 border-b border-gray-100">
            <Logo variant="light" size="sm" showSubtext={false} />
          </div>

          {/* Auth Tab Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <Link
              href="/giris"
              className="flex-1 py-2 text-center text-xs font-bold text-slate-500 hover:text-slate-900 rounded-xl transition-all"
            >
              Giriş Yap
            </Link>
            <div className="flex-1 py-2 text-center text-xs font-black text-[#0B2A4A] bg-white rounded-xl shadow-sm">
              İlk Defa Kayıt Ol
            </div>
          </div>

          {isSuccess ? (
            <div className="text-center space-y-4 py-8">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600 animate-bounce" />
              </div>
              <h2 className="font-display font-extrabold text-xl text-[#0B2A4A]">
                Kayıt Başarıyla Tamamlandı!
              </h2>
              <p className="text-xs text-[#5A6B7C]">
                Hoş geldiniz! Perakende Kariyer Akademisi panelinize yönlendiriliyorsunuz...
              </p>
              <div className="flex justify-center pt-2">
                <div className="w-6 h-6 border-2 border-[#087F96] border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          ) : (
            <>
              {/* Form Title */}
              <div className="text-center pt-1">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#DDF4F7] text-[#087F96] rounded-full text-[10px] font-extrabold tracking-wider uppercase mb-2">
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>İLK DEFA KAYIT FORMU</span>
                </div>
                <h2 className="font-display font-extrabold text-2xl tracking-tight text-[#0B2A4A]">
                  Aramıza Hoş Geldiniz
                </h2>
                <p className="text-xs text-[#5A6B7C] mt-1 font-medium">
                  Kayıt olmak için lütfen aşağıdaki bilgileri eksiksiz doldurunuz.
                </p>
              </div>

              {serverError && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 flex items-center space-x-2 text-xs">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                
                {/* 1. AD & SOYAD */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-extrabold text-[#0B2A4A] mb-1">
                      Ad *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 h-3.5 w-3.5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Adınız"
                        className={`w-full pl-9 pr-3 py-2.5 bg-[#F8FAFC] border rounded-2xl text-xs text-[#0B2A4A] font-medium placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                          errors.name ? 'border-red-500' : 'border-gray-200 focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10'
                        }`}
                      />
                    </div>
                    {errors.name && <span className="text-[10px] text-red-500 font-semibold px-1">{errors.name}</span>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-[#0B2A4A] mb-1">
                      Soyad *
                    </label>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      placeholder="Soyadınız"
                      className={`w-full px-3 py-2.5 bg-[#F8FAFC] border rounded-2xl text-xs text-[#0B2A4A] font-medium placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                        errors.surname ? 'border-red-500' : 'border-gray-200 focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10'
                      }`}
                    />
                    {errors.surname && <span className="text-[10px] text-red-500 font-semibold px-1">{errors.surname}</span>}
                  </div>
                </div>

                {/* 2. E-POSTA */}
                <div>
                  <label className="block text-[11px] font-extrabold text-[#0B2A4A] mb-1">
                    E-Posta Adresi *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ornek@domain.com"
                      className={`w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border rounded-2xl text-xs text-[#0B2A4A] font-medium placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-200 focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10'
                      }`}
                    />
                  </div>
                  {errors.email && <span className="text-[10px] text-red-500 font-semibold px-1">{errors.email}</span>}
                </div>

                {/* 3. TELEFON */}
                <div>
                  <label className="block text-[11px] font-extrabold text-[#0B2A4A] mb-1">
                    Telefon Numarası *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="05XX XXX XX XX"
                      className={`w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border rounded-2xl text-xs text-[#0B2A4A] font-medium placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                        errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10'
                      }`}
                    />
                  </div>
                  {errors.phone && <span className="text-[10px] text-red-500 font-semibold px-1">{errors.phone}</span>}
                </div>

                {/* 4. POZİSYON */}
                <div>
                  <label className="block text-[11px] font-extrabold text-[#0B2A4A] mb-1">
                    Pozisyon / Görev *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-8 py-2.5 bg-[#F8FAFC] border rounded-2xl text-xs text-[#0B2A4A] font-medium focus:outline-none focus:bg-white transition-all appearance-none cursor-pointer ${
                        errors.position ? 'border-red-500' : 'border-gray-200 focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10'
                      }`}
                    >
                      <option value="" disabled>
                        Pozisyonunuzu seçiniz...
                      </option>
                      {POSITIONS.map((pos) => (
                        <option key={pos} value={pos}>
                          {pos}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.position && <span className="text-[10px] text-red-500 font-semibold px-1">{errors.position}</span>}
                </div>

                {/* Diğer pozisyon girme alanı */}
                {formData.position === 'Diğer' && (
                  <div>
                    <input
                      type="text"
                      name="customPosition"
                      value={formData.customPosition}
                      onChange={handleChange}
                      placeholder="Pozisyonunuzu yazınız..."
                      className={`w-full px-4 py-2.5 bg-[#F8FAFC] border rounded-2xl text-xs text-[#0B2A4A] font-medium placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                        errors.customPosition ? 'border-red-500' : 'border-gray-200 focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10'
                      }`}
                    />
                    {errors.customPosition && <span className="text-[10px] text-red-500 font-semibold px-1">{errors.customPosition}</span>}
                  </div>
                )}

                {/* 5. ÇALIŞTIĞI KURUM */}
                <div>
                  <label className="block text-[11px] font-extrabold text-[#0B2A4A] mb-1">
                    Çalıştığı Kurum / İşletme *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Şirket / İşletme Adı"
                      className={`w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border rounded-2xl text-xs text-[#0B2A4A] font-medium placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                        errors.companyName ? 'border-red-500' : 'border-gray-200 focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10'
                      }`}
                    />
                  </div>
                  {errors.companyName && <span className="text-[10px] text-red-500 font-semibold px-1">{errors.companyName}</span>}
                </div>

                {/* 6. ŞİFRE */}
                <div>
                  <label className="block text-[11px] font-extrabold text-[#0B2A4A] mb-1">
                    Şifre Belirleyin *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="En az 6 karakter"
                      className={`w-full pl-10 pr-10 py-2.5 bg-[#F8FAFC] border rounded-2xl text-xs text-[#0B2A4A] font-medium placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                        errors.password ? 'border-red-500' : 'border-gray-200 focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <span className="text-[10px] text-red-500 font-semibold px-1">{errors.password}</span>}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-[#0B2A4A] via-[#1D4ED8] to-[#087F96] hover:opacity-95 text-white rounded-2xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#0B2A4A]/20 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        KAYIT OLUŞTURULUYOR...
                      </span>
                    ) : (
                      <>
                        <span>KAYDOL VE BAŞLA</span>
                        <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Footer */}
              <div className="pt-2 text-center space-y-2">
                <p className="text-xs text-[#5A6B7C]">
                  Zaten hesabınız var mı?{' '}
                  <Link
                    href="/giris"
                    className="font-extrabold text-[#087F96] hover:text-[#056B80] uppercase tracking-wider transition-colors"
                  >
                    GİRİŞ YAP →
                  </Link>
                </p>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#087F96]" />
                  <span>VERİLERİNİZ 256-BIT GÜVENLE SAKLANIR</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
