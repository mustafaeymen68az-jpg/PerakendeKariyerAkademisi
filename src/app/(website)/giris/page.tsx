'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, Lock, Mail, AlertCircle, ArrowRight, ChevronRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = { email: '', password: '' };
    let isValid = true;
    if (!email) {
      errs.email = 'E-posta adresi giriniz.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Geçerli bir e-posta adresi giriniz.';
      isValid = false;
    }
    if (!password) {
      errs.password = 'Şifrenizi giriniz.';
      isValid = false;
    }
    setErrors(errs);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError('');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        // Successful login, redirect to panel
        window.location.href = result.redirectUrl;
      } else {
        setServerError(result.message || 'Hatalı giriş yaptınız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (e) {
      console.error(e);
      setServerError('Sunucu ile bağlantı kurulamadı.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillMockAccount = (mockEmail: string, mockPass: string) => {
    setEmail(mockEmail);
    setPassword(mockPass);
  };

  return (
    <div className="bg-light-bg min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-gray-150 shadow-xl">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-3 group mb-4">
            <div className="bg-corporate-blue p-2.5 rounded-lg text-white">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-lg leading-tight tracking-tight text-primary-navy">
                Perakende Mühendisi
              </span>
              <span className="text-[10px] text-turquoise-accent uppercase tracking-widest font-medium">
                Eğitim Akademisi
              </span>
            </div>
          </Link>
          <h2 className="font-display font-extrabold text-xl text-primary-navy">
            Akademi Paneline Giriş
          </h2>
          <p className="text-xs text-secondary-text mt-1">
            Yetkinliklerinizi yönetmek ve gelişim raporlarınızı izlemek için giriş yapın.
          </p>
        </div>

        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 flex items-center space-x-2 text-xs">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">E-posta Adresiniz</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-9 pr-4 py-2.5 bg-gray-50 border rounded-lg text-xs focus:outline-none transition-all ${
                  errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-250 focus:border-corporate-blue focus:bg-white'
                }`}
                placeholder="ornek@perakendemuhendisi.com"
              />
            </div>
            {errors.email && <span className="text-[10px] font-bold text-red-500">{errors.email}</span>}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-700">Şifreniz</label>
              <Link href="/sifremi-unuttum" className="text-[10px] text-corporate-blue hover:underline">
                Şifremi Unuttum?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-9 pr-4 py-2.5 bg-gray-50 border rounded-lg text-xs focus:outline-none transition-all ${
                  errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-250 focus:border-corporate-blue focus:bg-white'
                }`}
                placeholder="••••••••"
              />
            </div>
            {errors.password && <span className="text-[10px] font-bold text-red-500">{errors.password}</span>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-corporate-blue hover:bg-corporate-blue/90 text-white rounded-lg text-xs font-semibold shadow-md transition-all flex items-center justify-center space-x-1.5 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? <span>Giriş Yapılıyor...</span> : (
                <>
                  <span>Giriş Yap</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Demo Accounts Quick Fill (WCAG helper) */}
        <div className="border-t border-gray-150 pt-6 space-y-3">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
            Test Hesapları (Hızlı Tıklama)
          </h4>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => fillMockAccount('admin@perakendemuhendisi.com', 'admin123')}
              className="px-3 py-2 bg-gray-50 hover:bg-light-blue/20 border border-gray-200 text-left rounded-lg text-xs transition-colors flex justify-between items-center group"
            >
              <div>
                <span className="font-bold text-primary-navy block">Yönetici Paneli (Admin)</span>
                <span className="text-[10px] text-gray-400">admin@perakendemuhendisi.com</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-corporate-blue" />
            </button>

            <button
              onClick={() => fillMockAccount('company@sayarmarket.com', 'company123')}
              className="px-3 py-2 bg-gray-50 hover:bg-light-blue/20 border border-gray-200 text-left rounded-lg text-xs transition-colors flex justify-between items-center group"
            >
              <div>
                <span className="font-bold text-primary-navy block">Kurumsal Panel (Sayar Market)</span>
                <span className="text-[10px] text-gray-400">company@sayarmarket.com</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-corporate-blue" />
            </button>

            <button
              onClick={() => fillMockAccount('ahmet@sayarmarket.com', 'ahmet123')}
              className="px-3 py-2 bg-gray-50 hover:bg-light-blue/20 border border-gray-200 text-left rounded-lg text-xs transition-colors flex justify-between items-center group"
            >
              <div>
                <span className="font-bold text-primary-navy block">Katılımcı Paneli (Ahmet Yılmaz)</span>
                <span className="text-[10px] text-gray-400">ahmet@sayarmarket.com</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-corporate-blue" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
