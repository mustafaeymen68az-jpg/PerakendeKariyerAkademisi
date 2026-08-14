'use client';

import React from 'react';
import { 
  ShoppingBag, 
  Shirt, 
  Sparkles, 
  Tv, 
  Home, 
  Wrench, 
  Fuel, 
  Armchair, 
  Footprints, 
  Trophy, 
  Globe, 
  Grid
} from 'lucide-react';

interface Sector {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
}

const SECTORS: Sector[] = [
  { id: '1', name: 'Gıda Perakendesi', desc: 'Market, süpermarket, hipermarket, şarküteri ve taze gıda zincirleri.', icon: <ShoppingBag className="h-6 w-6" /> },
  { id: '2', name: 'Moda & Tekstil', desc: 'Giyim, aksesuar, lüks mağazacılık ve hazır giyim zincirleri.', icon: <Shirt className="h-6 w-6" /> },
  { id: '3', name: 'Kozmetik & Kişisel Bakım', desc: 'Güzellik, kişisel bakım ve parfümeri mağaza ağları.', icon: <Sparkles className="h-6 w-6" /> },
  { id: '4', name: 'Tüketici Elektroniği', desc: 'Teknoloji marketleri, beyaz eşya ve mobil perakende zincirleri.', icon: <Tv className="h-6 w-6" /> },
  { id: '5', name: 'Ev & Yaşam', desc: 'Züccaciye, dekorasyon, ev tekstili ve yaşam tarzı mağazaları.', icon: <Home className="h-6 w-6" /> },
  { id: '6', name: 'Yapı Market & DIY', desc: 'Yapı malzemeleri, hırdavat ve kendin-yap perakendeciliği.', icon: <Wrench className="h-6 w-6" /> },
  { id: '7', name: 'Akaryakıt Perakendesi', desc: 'İstasyon marketleri, convenience store ve hızlı tüketim noktaları.', icon: <Fuel className="h-6 w-6" /> },
  { id: '8', name: 'Mobilya Perakendesi', desc: 'Büyük ölçekli mobilya, yatak ve konsept teşhir mağazacılığı.', icon: <Armchair className="h-6 w-6" /> },
  { id: '9', name: 'Ayakkabı & Aksesuar', desc: 'Ayakkabı zincirleri, çanta ve deri ürünleri mağazacılığı.', icon: <Footprints className="h-6 w-6" /> },
  { id: '10', name: 'Spor Perakendesi', desc: 'Spor giyim, ekipman ve outdoor perakende zincirleri.', icon: <Trophy className="h-6 w-6" /> },
  { id: '11', name: 'E-Ticaret & Omnichannel', desc: 'Hızlı teslimat, e-ticaret depo operasyonu ve hibrit perakende.', icon: <Globe className="h-6 w-6" /> },
  { id: '12', name: 'Diğer Perakende Sektörleri', desc: 'Kitap-kırtasiye, oyuncak, optik ve özel niş perakende alanları.', icon: <Grid className="h-6 w-6" /> }
];

export default function RetailSubSectorsSection() {
  return (
    <section className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#0B2A4A]/10 border border-[#0B2A4A]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0B2A4A] mb-3">
            <ShoppingBag className="h-4 w-4 text-[#087F96]" />
            <span>Tüm Perakende Ağları İçin</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2A4A] tracking-tight">
            Perakendenin Her Alanında Kariyer ve Yetkinlik Gelişimi
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Platformumuz sadece gıda perakendesine değil; modadan elektroniğe, akaryakıttan omnichannel e-ticarete kadar perakendenin tüm alt sektörlerine özel dinamik kariyer ve yetkinlik altyapısı sunar.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {SECTORS.map((sector) => (
            <div
              key={sector.id}
              className="p-5 rounded-2xl bg-gray-50/70 hover:bg-[#0B2A4A] border border-gray-200 hover:border-[#0B2A4A] text-[#0B2A4A] hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#087F96]/10 text-[#087F96] group-hover:bg-white/10 group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                  {sector.icon}
                </div>
                <h3 className="font-bold text-sm sm:text-base group-hover:text-white transition-colors">
                  {sector.name}
                </h3>
                <p className="text-xs text-gray-500 group-hover:text-gray-300 mt-1 line-clamp-2 transition-colors">
                  {sector.desc}
                </p>
              </div>

              <div className="text-[11px] font-bold text-[#087F96] group-hover:text-[#DDF4F7] mt-4 flex items-center transition-colors">
                <span>Sektöre Özel Kariyer Yolları</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
