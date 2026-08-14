import React from 'react';
import { 
  Building2, 
  CheckCircle2, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Layers, 
  Sparkles 
} from 'lucide-react';

export const metadata = {
  title: 'Pozisyon Yetkinlik Kartları | Perakende Kariyer Akademisi',
  description: 'Perakende sektöründeki tüm standart pozisyonların görev, yetkinlik, KPI, zorunlu eğitim ve terfi kriterleri kütüphanesi.'
};

const SAMPLE_POSITIONS = [
  {
    name: 'Mağaza Müdürü',
    purpose: 'Mağazanın tüm P&L (Kar/Zarar), satış, stok, operasyon ve ekip süreçlerine liderlik etmek.',
    experience: '4 - 7 Yıl',
    avgGrowth: '24 Ay',
    responsibilities: ['Yıllık mağaza bütçe ve ciro takibi', 'Personel vardiya ve verimlilik planlaması', 'Stok devir hızı ve fire kontrolü'],
    technicalSkills: ['P&L Yönetimi', 'Ticari Mağazacılık', 'Stok Mühendisliği'],
    behavioralSkills: ['Stratejik Liderlik', 'İkna & Müzakere', 'Motivasyon'],
    kpis: ['Yıllık Ciro Hedefi (%100+)', 'Mağaza EBITDA', 'Turnover Oranı (<%10)'],
    mandatoryCourses: ['Mağaza Müdürlüğü Liderlik Akademisi', 'Finansal Mağazacılık'],
    recommendedCourses: ['Perakendede Yapay Zeka Uygulamaları'],
    promotionCriteria: 'Üst üste 2 yıl ciro ve kârlılık hedeflerini yakalamak, Terfi Skoru %80+.',
    nextPositions: ['Bölge Müdürü', 'İnsan Kaynakları Müdürü'],
    altPositions: ['Kategori Yöneticisi', 'Satın Alma Müdürü']
  },
  {
    name: 'Kategori Yöneticisi',
    purpose: 'Sorumlu olduğu ürün kategorisinin bütçe, raflama, tedarikçi anlaşmaları ve karlılığını sevk etmek.',
    experience: '5 - 8 Yıl',
    avgGrowth: '36 Ay',
    responsibilities: ['Tedarikçi sözleşme müzakereleri', 'Sezonluk kategori bütçe tasarımı', 'Planogram ve raf verimliliği'],
    technicalSkills: ['Marj Hesaplama', 'Kategori Analitiği', 'Tedarik Zinciri'],
    behavioralSkills: ['Stratejik Müzakere', 'Karar Vericilik', 'Analitik Düşünme'],
    kpis: ['Kategori Cirosu', 'Kategori Brüt Karı', 'Stok Devir Hızı'],
    mandatoryCourses: ['Stratejik Kategori Yönetimi & Müzakere'],
    recommendedCourses: ['Sepet & Veri Analitiği'],
    promotionCriteria: 'Kategori karlılık hedeflerini tam yakalamak.',
    nextPositions: ['Satın Alma Müdürü', 'Ticari Direktör'],
    altPositions: ['Mağaza Müdürü', 'İş Geliştirme Yöneticisi']
  }
];

export default function PositionCardsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9]">
      <section className="bg-[#0B2A4A] text-white py-14 border-b border-[#087F96]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-[#087F96]/20 border border-[#087F96]/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#DDF4F7] mb-3">
            <Layers className="h-4 w-4 text-[#087F96]" />
            <span>Standart Perakende Rol Kütüphanesi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Pozisyon Yetkinlik Kartları</h1>
          <p className="mt-3 text-base text-gray-300 max-w-2xl mx-auto">
            Perakende sektöründeki görevlerin görev tanımı, teknik/davranışsal yetkinlikleri, KPI'ları ve terfi kriterleri standartlaştırılmıştır.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {SAMPLE_POSITIONS.map((pos, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 gap-2">
                <div>
                  <span className="text-xs text-[#087F96] font-bold uppercase tracking-wider">Pozisyon Kartı</span>
                  <h2 className="text-2xl font-black text-[#0B2A4A]">{pos.name}</h2>
                  <p className="text-xs text-gray-600 mt-1">{pos.purpose}</p>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <span className="px-3 py-1 bg-gray-100 font-bold rounded-lg text-gray-700">Deneyim: {pos.experience}</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold rounded-lg">Gelişim Süresi: {pos.avgGrowth}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div>
                  <h4 className="font-bold text-[#0B2A4A] uppercase tracking-wider mb-2">Teknik & Davranışsal Yetkinlikler</h4>
                  <div className="space-y-1 text-gray-700 font-medium">
                    <p><span className="font-bold text-gray-900">Teknik:</span> {pos.technicalSkills.join(', ')}</p>
                    <p><span className="font-bold text-gray-900">Davranışsal:</span> {pos.behavioralSkills.join(', ')}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#0B2A4A] uppercase tracking-wider mb-2">KPI'lar & Terfi Kriteri</h4>
                  <p className="text-gray-700 font-medium mb-1"><span className="font-bold text-gray-900">KPI:</span> {pos.kpis.join(' • ')}</p>
                  <p className="text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200 font-semibold">{pos.promotionCriteria}</p>
                </div>

                <div>
                  <h4 className="font-bold text-[#0B2A4A] uppercase tracking-wider mb-2">Zorunlu Eğitimler & Rotalar</h4>
                  <p className="text-gray-700 font-medium mb-1"><span className="font-bold text-gray-900">Eğitimler:</span> {pos.mandatoryCourses.join(', ')}</p>
                  <p className="text-gray-600"><span className="font-bold text-gray-900">Sonraki:</span> {pos.nextPositions.join(' → ')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
