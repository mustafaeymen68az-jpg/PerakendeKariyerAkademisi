'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, ChevronRight, AlertCircle, Building, User, Mail, Phone, MapPin } from 'lucide-react';

interface Dept {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  departments: Dept[];
  initialTraining: string;
  initialDept: string;
}

export default function RequestFormClient({ departments, initialTraining, initialDept }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    title: '',
    phone: '',
    email: '',
    city: '',
    subCount: '',
    employeeCount: '',
    department: initialDept,
    training: initialTraining,
    count: '',
    format: 'ONLINE',
    date: '',
    notes: '',
    gdpr: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    // Clear error
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Ad Soyad alanı zorunludur.';
    if (!formData.companyName.trim()) errs.companyName = 'Şirket Adı alanı zorunludur.';
    if (!formData.email.trim()) errs.email = 'E-posta alanı zorunludur.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Geçerli bir e-posta adresi giriniz.';
    
    if (!formData.phone.trim()) errs.phone = 'Telefon alanı zorunludur.';
    else if (formData.phone.replace(/\D/g, '').length < 10) errs.phone = 'Geçerli bir telefon numarası giriniz.';
    
    if (!formData.city.trim()) errs.city = 'Şehir alanı zorunludur.';
    if (!formData.gdpr) errs.gdpr = 'KVKK metnini onaylamanız gerekmektedir.';

    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrKey = Object.keys(validationErrors)[0];
      const el = document.getElementsByName(firstErrKey)[0];
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    setServerError('');
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
      } else {
        setServerError(result.message || 'Bir sorun oluştu. Lütfen tekrar deneyin.');
      }
    } catch (e) {
      console.error(e);
      setServerError('Sunucu ile bağlantı kurulamadı.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-150 p-8 md:p-12 text-center space-y-6 max-w-lg mx-auto animate-in zoom-in duration-300">
        <div className="bg-green-50 text-green-500 rounded-full p-4 w-fit mx-auto">
          <CheckCircle2 className="h-16 w-16" />
        </div>
        <h2 className="font-display font-extrabold text-2xl text-primary-navy">
          Talebiniz Başarıyla Alındı!
        </h2>
        <p className="text-sm text-secondary-text font-light leading-relaxed">
          Kurumsal eğitim talebiniz sistemimize kaydedilmiştir. Perakende danışmanlarımız en geç **24 saat içinde** şirketiniz ile iletişime geçerek detaylı teklifimizi ve eğitim planlamamızı sunacaktır.
        </p>
        <div className="pt-6">
          <button
            onClick={() => window.location.href = '/egitimler'}
            className="px-6 py-3 bg-corporate-blue hover:bg-corporate-blue/90 text-white rounded-lg text-sm font-semibold shadow-md transition-all inline-flex items-center space-x-1"
          >
            <span>Eğitim Kataloğuna Dön</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-150 p-6 sm:p-8 md:p-10 space-y-8">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 flex items-center space-x-2 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Section 1: Contact Info */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-base text-primary-navy border-b border-gray-100 pb-2">
          İletişim Bilgileri
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Yetkili Adı Soyadı *</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-9 pr-4 py-2.5 bg-gray-50 border rounded-lg text-sm focus:outline-none transition-all ${
                  errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-250 focus:border-corporate-blue focus:bg-white'
                }`}
                placeholder="Adınız Soyadınız"
              />
            </div>
            {errors.name && <span className="text-[10px] font-bold text-red-500">{errors.name}</span>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Yetkili Unvanı</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-250 rounded-lg text-sm focus:outline-none focus:border-corporate-blue focus:bg-white transition-all"
              placeholder="Örn: İK Müdürü, Genel Müdür"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">E-posta Adresi *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-9 pr-4 py-2.5 bg-gray-50 border rounded-lg text-sm focus:outline-none transition-all ${
                  errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-250 focus:border-corporate-blue focus:bg-white'
                }`}
                placeholder="ornek@sirketiniz.com"
              />
            </div>
            {errors.email && <span className="text-[10px] font-bold text-red-500">{errors.email}</span>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Telefon Numarası *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-9 pr-4 py-2.5 bg-gray-50 border rounded-lg text-sm focus:outline-none transition-all ${
                  errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-250 focus:border-corporate-blue focus:bg-white'
                }`}
                placeholder="05XXXXXXXXX"
              />
            </div>
            {errors.phone && <span className="text-[10px] font-bold text-red-500">{errors.phone}</span>}
          </div>
        </div>
      </div>

      {/* Section 2: Company Info */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-base text-primary-navy border-b border-gray-100 pb-2">
          Şirket Bilgileri
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-gray-700">Şirket/Kurum Adı *</label>
            <div className="relative">
              <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full pl-9 pr-4 py-2.5 bg-gray-50 border rounded-lg text-sm focus:outline-none transition-all ${
                  errors.companyName ? 'border-red-500 focus:border-red-500' : 'border-gray-250 focus:border-corporate-blue focus:bg-white'
                }`}
                placeholder="Şirketinizin Resmi Adı"
              />
            </div>
            {errors.companyName && <span className="text-[10px] font-bold text-red-500">{errors.companyName}</span>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Faaliyet Gösterilen Şehir *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full pl-9 pr-4 py-2.5 bg-gray-50 border rounded-lg text-sm focus:outline-none transition-all ${
                  errors.city ? 'border-red-500 focus:border-red-500' : 'border-gray-250 focus:border-corporate-blue focus:bg-white'
                }`}
                placeholder="Örn: İstanbul"
              />
            </div>
            {errors.city && <span className="text-[10px] font-bold text-red-500">{errors.city}</span>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Şube / Mağaza Sayısı</label>
            <input
              type="number"
              name="subCount"
              value={formData.subCount}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-250 rounded-lg text-sm focus:outline-none focus:border-corporate-blue focus:bg-white transition-all"
              placeholder="Örn: 12"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Toplam Çalışan Sayısı</label>
            <input
              type="number"
              name="employeeCount"
              value={formData.employeeCount}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-250 rounded-lg text-sm focus:outline-none focus:border-corporate-blue focus:bg-white transition-all"
              placeholder="Örn: 150"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Training Needs */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-base text-primary-navy border-b border-gray-100 pb-2">
          Eğitim İhtiyaçları
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">İlgili Departman</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-250 rounded-lg text-sm focus:outline-none focus:border-corporate-blue focus:bg-white transition-all"
            >
              <option value="">Seçiniz</option>
              {departments.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">İlgilenilen Eğitim / Konu</label>
            <input
              type="text"
              name="training"
              value={formData.training}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-250 rounded-lg text-sm focus:outline-none focus:border-corporate-blue focus:bg-white transition-all"
              placeholder="Örn: Kasiyer Eğitim Modülleri, Fire Yönetimi"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Tahmini Katılımcı Sayısı</label>
            <input
              type="number"
              name="count"
              value={formData.count}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-250 rounded-lg text-sm focus:outline-none focus:border-corporate-blue focus:bg-white transition-all"
              placeholder="Örn: 25"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Eğitim Formatı</label>
            <select
              name="format"
              value={formData.format}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-250 rounded-lg text-sm focus:outline-none focus:border-corporate-blue focus:bg-white transition-all"
            >
              <option value="ONLINE">Online / Uzaktan Eğitim</option>
              <option value="YUZ_YUZE">Sınıf İçi / Yüz Yüze Eğitim</option>
              <option value="HIBRIZ">Hibrit (Online + Saha Pratikleri)</option>
            </select>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-semibold text-gray-700">Talep Edilen Başlangıç Tarihi</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-250 rounded-lg text-sm focus:outline-none focus:border-corporate-blue focus:bg-white transition-all text-gray-500"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-gray-700">Ek Açıklamalar ve Özel Talepler</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-250 rounded-lg text-sm focus:outline-none focus:border-corporate-blue focus:bg-white transition-all"
              placeholder="Eğitim içeriğinde özellikle değinilmesini istediğiniz noktalar veya hedefler..."
            />
          </div>
        </div>
      </div>

      {/* KVKK / GDPR Agreement */}
      <div className="space-y-3 pt-2">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="gdpr"
            checked={formData.gdpr}
            onChange={handleChange}
            className="mt-1 h-4.5 w-4.5 rounded border-gray-300 text-corporate-blue focus:ring-corporate-blue cursor-pointer"
          />
          <span className="text-xs text-secondary-text leading-relaxed">
            Perakende Kariyer Akademisi'nin kurumsal başvuru kapsamında paylaştığım kişisel verilerimi incelemesini, benimle irtibata geçmesini ve <Link href="/kvkk" target="_blank" className="text-corporate-blue hover:underline">KVKK Aydınlatma Metni</Link>'nde belirtilen kurallara uygun olarak işlemesini onaylıyorum. *
          </span>
        </label>
        {errors.gdpr && <p className="text-[10px] font-bold text-red-500">{errors.gdpr}</p>}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-turquoise-accent hover:bg-turquoise-accent/90 text-primary-navy font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span>Gönderiliyor...</span>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Başvuruyu Tamamla ve Gönder</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
