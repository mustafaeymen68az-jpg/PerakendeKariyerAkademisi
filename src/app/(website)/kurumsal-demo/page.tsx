'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  Users,
  Award,
  BarChart3
} from 'lucide-react';

export default function CorporateDemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    role: '',
    phone: '',
    email: '',
    employeeCount: '50-250',
    storeCount: '1-10',
    subSector: 'Gıda Perakendesi',
    solutionInterest: 'Yetkinlik & Terfi Yönetimi',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const demoBreakdown = [
    'Çalışan yetkinlik haritası ve seviye tespiti',
    'Çok yönlü dikey & yatay kariyer planlama sistemi',
    'Ağırlıklı Terfi Hazırlık Skoru modülü',
    'Yetenek havuzu ve terfi aday pipeline\'ı',
    'Kritik pozisyon yedekleme planı ve risk matrisi',
    '40 modüllü mikro eğitim yönetimi ve LMS',
    'Saha KPI ve performans bağlantısı',
    'Çalışan gelişim karnesi ve 90 günlük planlar',
    'Power BI tarzı İK & Yönetici dashboardu',
    'Şirkete özel White-Label kurumsal akademi modeli'
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9]">
      <section className="bg-[#0B2A4A] text-white py-14 border-b border-[#087F96]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-[#087F96]/20 border border-[#087F96]/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#DDF4F7] mb-3">
            <Clock className="h-4 w-4 text-emerald-400" />
            <span>30 Dakikalık Birebir Online Sunum</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Ücretsiz 30 Dakikalık Kurumsal Demo Talep Et</h1>
          <p className="mt-3 text-base text-gray-300 max-w-2xl mx-auto">
            Şirketiniz için özel kariyer, yetkinlik, terfi ve akademi çözümlerimizi uzman ekibimiz eşliğinde canlı demoda keşfedin.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: What You Will See in 30 Min Demo */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#087F96]/10 text-[#087F96] px-3 py-1 rounded-full text-xs font-extrabold">
                <Sparkles className="h-4 w-4" />
                <span>Demoda Neler Göreceksiniz?</span>
              </div>
              <h2 className="text-xl font-black text-[#0B2A4A]">
                30 Dakikalık Kurumsal Demoda Neler Göreceksiniz?
              </h2>

              <div className="space-y-3 text-xs text-gray-700 font-medium">
                {demoBreakdown.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Comprehensive Request Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xl">
              {submitted ? (
                <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950">
                  <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-black shadow-lg">
                    ✓
                  </div>
                  <h3 className="text-2xl font-black text-emerald-900">Demo Talebiniz Alındı!</h3>
                  <p className="text-xs text-emerald-800">
                    Kurumsal İK temsilcimiz 24 saat içinde sizinle iletişime geçerek demo randevunuzu konfiirme edecektir.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <h3 className="text-lg font-black text-[#0B2A4A] border-b border-gray-100 pb-3">
                    Kurumsal Demo Başvuru Formu
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Ad Soyad *</label>
                      <input
                        required
                        type="text"
                        placeholder="Ahmet Yılmaz"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B2A4A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Şirket Adı *</label>
                      <input
                        required
                        type="text"
                        placeholder="ABC Perakende A.Ş."
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B2A4A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Unvan / Görev *</label>
                      <input
                        required
                        type="text"
                        placeholder="İK Direktörü / Genel Müdür"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B2A4A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Telefon *</label>
                      <input
                        required
                        type="tel"
                        placeholder="0532 000 00 00"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B2A4A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Kurumsal E-posta *</label>
                      <input
                        required
                        type="email"
                        placeholder="ahmet@abcperakende.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B2A4A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Çalışan Sayısı *</label>
                      <select
                        value={formData.employeeCount}
                        onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B2A4A] focus:outline-none"
                      >
                        <option value="50-250">50 – 250 Çalışan</option>
                        <option value="250-1000">250 – 1.000 Çalışan</option>
                        <option value="1000+">1.000+ Çalışan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Mağaza / Şube Sayısı</label>
                      <input
                        type="text"
                        placeholder="Örn: 15 Şube"
                        value={formData.storeCount}
                        onChange={(e) => setFormData({ ...formData, storeCount: e.target.value })}
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B2A4A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Perakende Alt Sektörü</label>
                      <select
                        value={formData.subSector}
                        onChange={(e) => setFormData({ ...formData, subSector: e.target.value })}
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B2A4A] focus:outline-none"
                      >
                        <option value="Gıda Perakendesi">Gıda Perakendesi</option>
                        <option value="Moda & Tekstil">Moda & Tekstil</option>
                        <option value="Kozmetik">Kozmetik & Kişisel Bakım</option>
                        <option value="Elektronik">Tüketici Elektroniği</option>
                        <option value="Yapı Market">Yapı Market & DIY</option>
                        <option value="Diğer">Diğer Perakende Sektörleri</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">İlgilenilen Çözüm / Notlar</label>
                    <textarea
                      rows={3}
                      placeholder="Şirketinizdeki terfi, eğitim veya yedekleme ihtiyaçlarınız hakkında kısaca bilgi yazabilirsiniz..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B2A4A] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#E11D48] hover:bg-[#BE123C] text-white font-black rounded-xl shadow-xl text-sm transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Ücretsiz 30 Dakikalık Kurumsal Demo Talep Et</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
