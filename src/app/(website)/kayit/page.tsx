'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Building2,
  Briefcase,
  MapPin,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ChevronDown,
  UserCheck
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
    password: '',
    companyName: '',
    sectorChannel: 'Market / Süpermarket',
    sectorDetail: 'Diğer',
    city: 'Bursa',
    title: '',
    customTitle: '',
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
    if (!formData.email) {
      errs.email = 'E-posta adresi giriniz.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Geçerli bir e-posta giriniz.';
      isValid = false;
    }
    if (!formData.password) {
      errs.password = 'Şifre giriniz.';
      isValid = false;
    } else if (formData.password.length < 6) {
      errs.password = 'En az 6 karakter olmalıdır.';
      isValid = false;
    }
    if (!formData.companyName.trim()) {
      errs.companyName = 'İşletme adı giriniz.';
      isValid = false;
    }
    if (!formData.title) {
      errs.title = 'Lütfen pozisyonunuzu seçiniz.';
      isValid = false;
    } else if (formData.title === 'Diğer' && !formData.customTitle.trim()) {
      errs.customTitle = 'Lütfen pozisyonunuzu belirtiniz.';
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

    const finalTitle = formData.title === 'Diğer' ? formData.customTitle : formData.title;

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          title: finalTitle,
        }),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          window.location.href = result.redirectUrl;
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

      {/* Bright & Crystal Clear Overlay */}
      <div className="fixed inset-0 z-50 bg-black/15 overflow-y-auto flex items-center justify-center p-4 py-8 sm:py-12">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border-2 border-[#087F96]/40 shadow-[0_25px_70px_rgba(0,0,0,0.25)] relative overflow-hidden space-y-6 my-auto">
          {/* Subtle decorative top accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0B2A4A] via-[#087F96] to-[#34A853]" />

          {/* Brand Header */}
          <div className="flex justify-center pb-2 border-b border-gray-100">
            <Logo variant="light" size="sm" showSubtext={false} />
          </div>

          {isSuccess ? (
            <div className="text-center space-y-4 py-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600 animate-bounce" />
              </div>
              <h2 className="font-display font-extrabold text-xl text-[#0B2A4A]">
                Profil Bilgileriniz Kaydedildi!
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
              {/* User Icon Avatar */}
              <div className="flex flex-col items-center text-center pt-1">
                <div className="w-16 h-16 rounded-full bg-[#DDF4F7]/80 border border-[#087F96]/30 flex items-center justify-center mb-3 shadow-inner">
                  <User className="h-8 w-8 text-[#0B2A4A]" />
                </div>
                <h2 className="font-display font-extrabold text-2xl tracking-tight text-[#0B2A4A]">
                  Bilgileriniz
                </h2>
                <p className="text-xs text-[#5A6B7C] mt-1 font-medium">
                  Lütfen profil bilgilerinizi eksiksiz doldurunuz.
                </p>
              </div>

              {serverError && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 flex items-center space-x-2 text-xs">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Profile Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Row 1: İsim & Soyisim */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="İsim"
                      className={`w-full px-4 py-3 bg-[#F8FAFC] border rounded-2xl text-xs text-[#0B2A4A] font-medium placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                        errors.name ? 'border-red-500' : 'border-gray-200 focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10'
                      }`}
                    />
                    {errors.name && <span className="text-[10px] text-red-500 font-semibold px-1">{errors.name}</span>}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      placeholder="Soyisim"
                      className={`w-full px-4 py-3 bg-[#F8FAFC] border rounded-2xl text-xs text-[#0B2A4A] font-medium placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                        errors.surname ? 'border-red-500' : 'border-gray-200 focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10'
                      }`}
                    />
                    {errors.surname && <span className="text-[10px] text-red-500 font-semibold px-1">{errors.surname}</span>}
                  </div>
                </div>

                {/* Row 2: E-posta & Şifre */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="E-posta Adresi"
                        className={`w-full pl-9 pr-3 py-3 bg-[#F8FAFC] border rounded-2xl text-xs text-[#0B2A4A] font-medium placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                          errors.email ? 'border-red-500' : 'border-gray-200 focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10'
                        }`}
                      />
                    </div>
                    {errors.email && <span className="text-[10px] text-red-500 font-semibold px-1">{errors.email}</span>}
                  </div>

                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Şifre"
                        className={`w-full pl-9 pr-8 py-3 bg-[#F8FAFC] border rounded-2xl text-xs text-[#0B2A4A] font-medium placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                          errors.password ? 'border-red-500' : 'border-gray-200 focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-3.5 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                    {errors.password && <span className="text-[10px] text-red-500 font-semibold px-1">{errors.password}</span>}
                  </div>
                </div>

                {/* Row 3: İşletme Adı */}
                <div>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="İşletme Adı"
                      className={`w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border rounded-2xl text-xs text-[#0B2A4A] font-medium placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                        errors.companyName ? 'border-red-500' : 'border-gray-200 focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10'
                      }`}
                    />
                  </div>
                  {errors.companyName && <span className="text-[10px] text-red-500 font-semibold px-1">{errors.companyName}</span>}
                </div>

                {/* Row 4: Sektör Kanalı */}
                <div>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                    <select
                      name="sectorChannel"
                      value={formData.sectorChannel}
                      onChange={handleChange}
                      className="w-full pl-10 pr-8 py-3 bg-[#F8FAFC] border border-gray-200 rounded-2xl text-xs text-[#0B2A4A] font-medium focus:outline-none focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10 focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="Market / Süpermarket">Market / Süpermarket</option>
                      <option value="Gıda & Hızlı Tüketim (FMCG)">Gıda & Hızlı Tüketim (FMCG)</option>
                      <option value="Mağazacılık & Tekstil">Mağazacılık & Tekstil</option>
                      <option value="Elektronik Perakende">Elektronik Perakende</option>
                      <option value="E-Ticaret & Dijital Perakende">E-Ticaret & Dijital Perakende</option>
                      <option value="Lojistik & Depo Operasyonları">Lojistik & Depo Operasyonları</option>
                      <option value="Diğer">Diğer Sektör</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Row 5: Sektör Detayı / Diğer & Şehir */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      name="sectorDetail"
                      value={formData.sectorDetail}
                      onChange={handleChange}
                      placeholder="Diğer"
                      className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-2xl text-xs text-[#0B2A4A] font-medium placeholder-gray-400 focus:outline-none focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-gray-400" />
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Bursa"
                        className="w-full pl-9 pr-3 py-3 bg-[#F8FAFC] border border-gray-200 rounded-2xl text-xs text-[#0B2A4A] font-medium placeholder-gray-400 focus:outline-none focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 6: Şirketteki Pozisyonunuz / Göreviniz */}
                <div>
                  <div className="relative">
                    <UserCheck className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                    <select
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-8 py-3 bg-[#F8FAFC] border rounded-2xl text-xs text-[#0B2A4A] font-medium focus:outline-none focus:bg-white transition-all appearance-none cursor-pointer ${
                        errors.title ? 'border-red-500' : 'border-gray-200 focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10'
                      }`}
                    >
                      <option value="" disabled>
                        Lütfen görevinizi / pozisyonunuzu seçiniz...
                      </option>
                      {POSITIONS.map((pos) => (
                        <option key={pos} value={pos}>
                          {pos}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.title && <span className="text-[10px] text-red-500 font-semibold px-1">{errors.title}</span>}
                </div>

                {/* Custom position text input if 'Diğer' */}
                {formData.title === 'Diğer' && (
                  <div>
                    <input
                      type="text"
                      name="customTitle"
                      value={formData.customTitle}
                      onChange={handleChange}
                      placeholder="Pozisyonunuzu belirtiniz"
                      className={`w-full px-4 py-3 bg-[#F8FAFC] border rounded-2xl text-xs text-[#0B2A4A] font-medium placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                        errors.customTitle ? 'border-red-500' : 'border-gray-200 focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10'
                      }`}
                    />
                    {errors.customTitle && <span className="text-[10px] text-red-500 font-semibold px-1">{errors.customTitle}</span>}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-[#0B2A4A] via-[#1D4ED8] to-[#087F96] hover:opacity-95 text-white rounded-2xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#0B2A4A]/20 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        KAYDEDİLİYOR...
                      </span>
                    ) : (
                      <>
                        <span>DEVAM ET</span>
                        <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Footer Navigation Link */}
              <div className="pt-3 text-center space-y-4">
                <Link
                  href="/giris"
                  className="inline-block text-xs font-extrabold tracking-wider text-[#0B2A4A] hover:text-[#087F96] uppercase transition-colors"
                >
                  MEVCUT HESABINIZLA GİRİŞ YAPIN •
                </Link>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#087F96]" />
                  <span>VERİLERİNİZ GÜVENLE SAKLANIR</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
