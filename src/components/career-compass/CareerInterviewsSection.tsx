'use client';

import React from 'react';
import { Calendar, UserCheck, Award, FileText, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CareerInterviewsSection() {
  const reviews = [
    {
      date: '10 Ağustos 2026',
      reviewer: 'Mustafa Eymen Kılıç (Mağaza Müdürü)',
      title: 'Dönemsel Kariyer & Terfi Değerlendirmesi',
      notes: 'Ahmet Bey, kasa hattındaki yüksek verimliliği ve müşteri şikayetlerindeki yapıcı yaklaşımı nedeniyle Mağaza Müdür Yardımcılığı havuzuna önerilmiştir. Stok yönetimi modülünü tamamlaması bekleniyor.',
      status: 'Olumlu / Gelişim Havuzunda 🟢'
    },
    {
      date: '15 Mayıs 2026',
      reviewer: 'Zeynep Karahan (Saha İK Direktörü)',
      title: 'İç Terfi Yetkinlik Görüşmesi',
      notes: 'LMS sertifika derecesi %94.8 düzeyindedir. Saha görevleri başarıyla takip edilmektedir.',
      status: 'Tamamlandı ✅'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 bg-[#0B2A4A] rounded-3xl border border-white/10 flex items-center space-x-3 text-white shadow-xl">
        <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold">Kariyer Görüşmelerim &amp; İK Değerlendirmeleri</h2>
          <p className="text-xs text-gray-300">Yöneticileriniz ve İK ile gerçekleştirdiğiniz resmi terfi ve kariyer inceleme kayıtları.</p>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((rev, idx) => (
          <div key={idx} className="p-6 bg-[#0B2A4A] rounded-3xl border border-white/10 space-y-3 text-white shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h3 className="font-extrabold text-amber-300 text-sm">{rev.title}</h3>
                <span className="text-xs text-gray-300">Değerlendiren: {rev.reviewer}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-gray-400">{rev.date}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  {rev.status}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed font-sans">{rev.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
