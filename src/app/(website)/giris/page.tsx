'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, Lock, Mail, AlertCircle, ArrowRight, ChevronRight, Loader2, ShieldCheck } from 'lucide-react';
import HomePageBackground from '@/components/HomePageBackground';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // Auto-login check on page load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/check');
        const result = await response.json();
        if (result.autoLogin && result.redirectUrl) {
          window.location.href = result.redirectUrl;
          return;
        }
      } catch (err) {
        console.error('Session check failed:', err);
      }
      setIsCheckingSession(false);
    };
    checkSession();
  }, []);

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
    <div className="relative min-h-screen">
      {/* Background Home Page UI */}
      <HomePageBackground />

      {/* Bright & Crystal Clear Overlay */}
      <div className="fixed inset-0 z-50 bg-black/15 overflow-y-auto flex items-center justify-center p-4 py-8 sm:py-12">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border-2 border-[#087F96]/40 shadow-[0_25px_70px_rgba(0,0,0,0.25)] relative overflow-hidden space-y-6 my-auto">
          {/* Decorative gradient */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#087F96] via-[#0B2A4A] to-[#087F96]" />

          {/* Brand Header */}
          <div className="flex justify-center pb-2 border-b border-gray-100">
            <Logo variant="light" size="sm" showSubtext={false} />
          </div>

          {isCheckingSession ? (
            <div className="py-8 text-center space-y-3">
              <Loader2 className="h-8 w-8 text-[#087F96] animate-spin mx-auto" />
              <p className="text-xs text-[#5A6B7C] font-medium">Oturum kontrol ediliyor...</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center">
                <h2 className="font-display font-extrabold text-2xl tracking-tight text-[#0B2A4A]">
                  Giriş Yap
                </h2>
                <p className="text-xs text-[#5A6B7C] mt-1 font-medium">
                  Perakende Kariyer Akademisi panelinize erişmek için bilgilerinizi giriniz.
                </p>
              </div>

              {serverError && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 flex items-center space-x-2 text-xs">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">E-posta Adresiniz</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border rounded-2xl text-xs text-[#0B2A4A] font-medium placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-200 focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10'
                      }`}
                      placeholder="ornek@perakendekariyer.com"
                    />
                  </div>
                  {errors.email && <span className="text-[10px] font-bold text-red-500">{errors.email}</span>}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-gray-700">Şifreniz</label>
                    <Link href="/sifremi-unuttum" className="text-[10px] text-[#087F96] hover:underline font-medium">
                      Şifremi Unuttum?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                    <input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border rounded-2xl text-xs text-[#0B2A4A] font-medium placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                        errors.password ? 'border-red-500' : 'border-gray-200 focus:border-[#087F96] focus:ring-2 focus:ring-[#087F96]/10'
                      }`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && <span className="text-[10px] font-bold text-red-500">{errors.password}</span>}
                </div>

                <div className="pt-2">
                  <button
                    id="login-submit"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-[#0B2A4A] via-[#1D4ED8] to-[#087F96] hover:opacity-95 text-white rounded-2xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#0B2A4A]/20 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
                  >
                    {isSubmitting ? <span>GİRİŞ YAPILIYOR...</span> : (
                      <>
                        <span>GİRİŞ YAP</span>
                        <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Register Link */}
              <div className="border-t border-gray-100 pt-4 text-center">
                <p className="text-xs text-[#5A6B7C]">
                  Hesabınız yok mu?{' '}
                  <Link
                    href="/kayit"
                    className="font-extrabold text-[#087F96] hover:text-[#056B80] uppercase tracking-wider transition-colors"
                  >
                    ÜCRETSİZ KAYIT OL →
                  </Link>
                </p>
              </div>

              {/* Demo Accounts Quick Fill */}
              <div className="border-t border-gray-100 pt-4 space-y-2.5">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
                  Hızlı Test Hesapları
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => fillMockAccount('admin@perakendemuhendisi.com', 'admin123')}
                    className="px-3 py-2 bg-gray-50 hover:bg-[#DDF4F7]/40 border border-gray-200 text-left rounded-xl text-xs transition-colors flex justify-between items-center group cursor-pointer"
                  >
                    <div>
                      <span className="font-bold text-[#0B2A4A] block">Yönetici Paneli (Admin)</span>
                      <span className="text-[10px] text-gray-400">admin@perakendemuhendisi.com</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-[#087F96]" />
                  </button>

                  <button
                    onClick={() => fillMockAccount('ahmet@sayarmarket.com', 'ahmet123')}
                    className="px-3 py-2 bg-gray-50 hover:bg-[#DDF4F7]/40 border border-gray-200 text-left rounded-xl text-xs transition-colors flex justify-between items-center group cursor-pointer"
                  >
                    <div>
                      <span className="font-bold text-[#0B2A4A] block">Katılımcı Paneli (Ahmet Yılmaz)</span>
                      <span className="text-[10px] text-gray-400">ahmet@sayarmarket.com</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-[#087F96]" />
                  </button>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center space-x-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-1">
                <ShieldCheck className="h-3.5 w-3.5 text-[#087F96]" />
                <span>VERİLERİNİZ GÜVENLE SAKLANIR</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
