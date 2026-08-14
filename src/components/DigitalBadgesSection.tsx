'use client';

import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  QrCode,
  BrainCircuit,
  ShoppingBag,
  TrendingUp,
  Users,
  Building2,
  Cpu
} from 'lucide-react';

interface BadgeItem {
  id: string;
  title: string;
  category: string;
  color: string;
  iconName: string;
  description: string;
}

const BADGES_LIST: BadgeItem[] = [
  { id: '1', title: 'Mağaza Operasyon Uzmanı', category: 'Operasyon', color: 'from-blue-600 to-indigo-800', iconName: 'Building2', description: 'Mağaza içi stok, vardiya ve saha hijyen operasyonlarını kusursuz yöneten uzman rozeti.' },
  { id: '2', title: 'Müşteri Deneyimi Uzmanı', category: 'Hizmet', color: 'from-emerald-500 to-teal-700', iconName: 'Users', description: 'Müşteri memnuniyeti, NPS skoru ve şikayet yönetiminde yüksek başarı rozeti.' },
  { id: '3', title: 'Satış Uzmanı', category: 'Satış', color: 'from-[#087F96] to-cyan-800', iconName: 'TrendingUp', description: 'Çapraz satış, sepet büyütme ve ciro hedeflerini yakalayan satış lideri rozeti.' },
  { id: '4', title: 'Stok Yönetimi Uzmanı', category: 'Stok & Fire', color: 'from-purple-600 to-indigo-900', iconName: 'ShieldCheck', description: 'Envanter sayımı, FIFO uygulaması ve fire oranını %1.5 altına düşüren uzman rozeti.' },
  { id: '5', title: 'Taze Gıda Uzmanı', category: 'Gıda', color: 'from-green-600 to-emerald-800', iconName: 'Award', description: 'Soğuk zincir, reyon tazeliği ve gıda güvenliği standartlarını tam uygulayan uzman rozeti.' },
  { id: '6', title: 'Liderlik Rozeti', category: 'Yönetim', color: 'from-amber-500 to-orange-700', iconName: 'Sparkles', description: 'Ekip koçluğu yapabilen, motivasyonu ve bağlılığı yüksek tutan liderlik rozeti.' },
  { id: '7', title: 'KPI Uzmanı', category: 'Performans', color: 'from-rose-600 to-red-800', iconName: 'TrendingUp', description: 'Sepet ortalaması, dönüşüm oranı ve ciro KPI takibini şeffaf yürüten performans rozeti.' },
  { id: '8', title: 'CRM Uzmanı', category: 'Müşteri Verisi', color: 'from-blue-500 to-cyan-700', iconName: 'Users', description: 'Müşteri sadakat kartı verisi, RFM analizi ve kişiselleştirilmiş teklif yönetimi rozeti.' },
  { id: '9', title: 'Kategori Yönetimi', category: 'Ticari', color: 'from-[#0B2A4A] to-slate-900', iconName: 'ShoppingBag', description: 'Ürün gamı, planogram ve marj odaklı kategori stratejisi rozeti.' },
  { id: '10', title: 'Satın Alma Uzmanı', category: 'Tedarik', color: 'from-indigo-600 to-purple-800', iconName: 'Building2', description: 'Tedarikçi müzakeresi ve maliyet avantajı sağlayan satın alma lideri rozeti.' },
  { id: '11', title: 'Perakendede Yapay Zekâ', category: 'Gelecek', color: 'from-[#E11D48] to-[#991B1B]', iconName: 'Cpu', description: 'Prompt mühendisliği, yapay zeka ile sepet ve talep tahmini yapabilen AI rozeti.' },
  { id: '12', title: 'Dijital Dönüşüm', category: 'Teknoloji', color: 'from-cyan-600 to-blue-900', iconName: 'BrainCircuit', description: 'Omnichannel mağazacılık ve dijital perakende süreçlerini adapte eden dönüşüm rozeti.' }
];

export default function DigitalBadgesSection() {
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#F4F7F9] border-b border-gray-200" id="dijital-rozetler">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#0B2A4A]/10 border border-[#0B2A4A]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0B2A4A] mb-3">
            <Award className="h-4 w-4 text-[#D97706]" />
            <span>Doğrulanabilir Dijital Başarı Başarıları</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2A4A] tracking-tight">
            Perakende Yetkinlik Rozetleri
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Sadece eğitim tamamlayarak değil; yetkinliği sınav ve sahada kanıtlayarak rozet kazanın. Rozetlerinizi LinkedIn profilinizde ve dijital pasaportunuzda sergileyin.
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {BADGES_LIST.map((badge) => (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className="group cursor-pointer bg-white rounded-2xl p-5 border border-gray-200 hover:border-[#087F96] shadow-sm hover:shadow-xl transition-all text-center flex flex-col items-center justify-between space-y-3 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-bl-lg">
                {badge.category}
              </div>

              {/* Badge Icon Emblem */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-tr ${badge.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mt-2 border-2 border-white ring-4 ring-gray-100`}>
                <Award className="h-8 w-8 text-white" />
              </div>

              <div>
                <h3 className="font-bold text-xs sm:text-sm text-[#0B2A4A] group-hover:text-[#087F96] transition-colors leading-tight">
                  {badge.title}
                </h3>
                <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                  {badge.description}
                </p>
              </div>

              <div className="text-[10px] font-extrabold text-[#087F96] flex items-center">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                <span>Doğrulanabilir Rozet</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
