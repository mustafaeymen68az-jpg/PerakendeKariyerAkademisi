'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, Send, CheckCircle2, Phone, Mail, Globe, MapPin } from 'lucide-react';

export default function TalepOlusturPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    title: '',
    phone: '',
    email: '',
    storeCount: '1 - 10',
    employeeCount: '1 - 50',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="bg-[#0B2A4A] text-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[#087F96]/30 text-center space-y-3">
          <span className="text-xs font-bold text-[#DDF4F7] bg-[#087F96] px-3.5 py-1 rounded-full uppercase">
            B2B Kurumsal Başvuru
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl">
            Kurumsal Demo ve Akademi Teklif Formu
          </h1>
          <p className="text-gray-300 text-sm font-light leading-relaxed max-w-2xl mx-auto">
            Market zinciriniz veya perakende şirketiniz için özelleştirilmiş akademi kurulumu, iç eğitmenlik (TTT) ve demo sunumu için formu doldurun.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-[#34A853] text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-[#34A853]/15 text-[#34A853] flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="font-display font-bold text-2xl text-[#0B2A4A]">Talebiniz Alındı!</h2>
            <p className="text-gray-600 text-sm max-w-md mx-auto font-light">
              Kurumsal akademi danışmanlarımız 24 saat içerisinde sizinle iletişime geçerek özel sunum ve demo erişim bilgilerini iletecektir.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-[#087F96] text-white font-bold rounded-xl text-xs"
              >
                Yeni Form Doldur
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-200 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                <div>
                  <label className="block text-[#0B2A4A] mb-1">Şirket / Market Zinciri Adı *</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Özgür Marketler Zinciri A.Ş."
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full p-3 bg-[#F4F7F9] border border-gray-200 rounded-xl text-xs text-[#0B2A4A] focus:outline-none focus:border-[#087F96]"
                  />
                </div>

                <div>
                  <label className="block text-[#0B2A4A] mb-1">Ad Soyad *</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Ahmet Yılmaz"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-3 bg-[#F4F7F9] border border-gray-200 rounded-xl text-xs text-[#0B2A4A] focus:outline-none focus:border-[#087F96]"
                  />
                </div>

                <div>
                  <label className="block text-[#0B2A4A] mb-1">Unvan / Görev *</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: İnsan Kaynakları Müdürü / Genel Müdür"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 bg-[#F4F7F9] border border-gray-200 rounded-xl text-xs text-[#0B2A4A] focus:outline-none focus:border-[#087F96]"
                  />
                </div>

                <div>
                  <label className="block text-[#0B2A4A] mb-1">Telefon Numarası *</label>
                  <input
                    type="tel"
                    required
                    placeholder="05XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 bg-[#F4F7F9] border border-gray-200 rounded-xl text-xs text-[#0B2A4A] focus:outline-none focus:border-[#087F96]"
                  />
                </div>

                <div>
                  <label className="block text-[#0B2A4A] mb-1">E-Posta Adresi *</label>
                  <input
                    type="email"
                    required
                    placeholder="ahmet@sirketiniz.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 bg-[#F4F7F9] border border-gray-200 rounded-xl text-xs text-[#0B2A4A] focus:outline-none focus:border-[#087F96]"
                  />
                </div>

                <div>
                  <label className="block text-[#0B2A4A] mb-1">Mağaza / Şube Sayısı</label>
                  <select
                    value={formData.storeCount}
                    onChange={(e) => setFormData({ ...formData, storeCount: e.target.value })}
                    className="w-full p-3 bg-[#F4F7F9] border border-gray-200 rounded-xl text-xs text-[#0B2A4A] focus:outline-none focus:border-[#087F96]"
                  >
                    <option>1 - 10 Mağaza</option>
                    <option>11 - 50 Mağaza</option>
                    <option>51 - 100 Mağaza</option>
                    <option>100+ Mağaza</option>
                  </select>
                </div>
              </div>

              <div className="text-xs font-semibold">
                <label className="block text-[#0B2A4A] mb-1">Eğitim & Akademi İhtiyaçlarınız / Notlar</label>
                <textarea
                  rows={4}
                  placeholder="Hangi departmanlarda eğitim veya akademi kurulumu hedeflediğinizi kısaca belirtebilirsiniz..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-[#F4F7F9] border border-gray-200 rounded-xl text-xs text-[#0B2A4A] focus:outline-none focus:border-[#087F96]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Send className="h-4 w-4" />
                  <span>Kurumsal Demo Talebini Gönder</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
