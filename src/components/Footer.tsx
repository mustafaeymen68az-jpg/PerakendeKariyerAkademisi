import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { 
  Building2, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  CheckCircle2,
  Award,
  Globe,
  Share2
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#061B33] text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Strategic Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" size="lg" showSubtext={true} />
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              Perakende Kariyer Akademisi; perakende sektöründe çalışanların kariyerlerini planlamasını, yetkinliklerini geliştirmesini; perakende işletmelerinin ise yetenek yönetimini, terfi süreçlerini ve kritik pozisyon yedeklemeyi ölçülebilir biçimde yönetmesini sağlayan dijital kariyer ve İnsan Kaynakları gelişim platformudur.
            </p>
            <div className="text-xs text-gray-400 font-mono">
              Domain: <span className="text-[#DDF4F7] font-bold">www.perakendekariyerakademisi.com</span>
            </div>
          </div>

          {/* Col 2: Hızlı Bağlantılar */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-[#DDF4F7] uppercase tracking-wider">Hızlı Navigasyon</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
              <li><Link href="/egitimler" className="hover:text-white transition-colors">Eğitim Kataloğu</Link></li>
              <li><Link href="/ik-cozumlari" className="hover:text-white transition-colors">İK Çözümleri</Link></li>
              <li><Link href="/kariyer-seviyeni-ogren" className="hover:text-white transition-colors">Kariyer Seviyeni Öğren Testi</Link></li>
              <li><Link href="/pozisyon-yetkinlikleri" className="hover:text-white transition-colors">Pozisyon Kartları</Link></li>
              <li><Link href="/yetkinlik-aday-havuzu" className="hover:text-white transition-colors">Aday Havuzu (Yakında)</Link></li>
            </ul>
          </div>

          {/* Col 3: Kurumsal Çözümler */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-[#DDF4F7] uppercase tracking-wider">Kurumsal İK</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="/ik-cozumlari#yetkinlik-matrisi" className="hover:text-white transition-colors">Yetkinlik Matrisi</Link></li>
              <li><Link href="/ik-cozumlari#terfi-yonetimi" className="hover:text-white transition-colors">Terfi Hazırlık Skoru</Link></li>
              <li><Link href="/ik-cozumlari#yetenek-havuzu" className="hover:text-white transition-colors">Yetenek Havuzu</Link></li>
              <li><Link href="/ik-cozumlari#yedekleme-plani" className="hover:text-white transition-colors">Kritik Pozisyon Yedekleme</Link></li>
              <li><Link href="/kurumsal-demo" className="hover:text-white transition-colors">Kurumsal Demo Talep Et</Link></li>
              <li><Link href="/kurumsal-veri-guvenligi" className="hover:text-white transition-colors">Kurumsal Veri Güvenliği</Link></li>
            </ul>
          </div>

          {/* Col 4: Yasal & Güvenlik Metinleri */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-[#DDF4F7] uppercase tracking-wider">KVKK & Güvenlik</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="/kurumsal-veri-guvenligi" className="hover:text-white transition-colors">KVKK Aydınlatma Metni</Link></li>
              <li><Link href="/kurumsal-veri-guvenligi" className="hover:text-white transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="/kurumsal-veri-guvenligi" className="hover:text-white transition-colors">Çerez Politikası</Link></li>
              <li><Link href="/kurumsal-veri-guvenligi" className="hover:text-white transition-colors">Kullanıcı Sözleşmesi</Link></li>
              <li><Link href="/kurumsal-veri-guvenligi" className="hover:text-white transition-colors">Veri Saklama & İmha Politikası</Link></li>
              <li><Link href="/kurumsal-veri-guvenligi" className="hover:text-white transition-colors">Bilgi Güvenliği Standardı</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Rights Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <div>
            © 2026 Perakende Kariyer Akademisi (www.perakendekariyerakademisi.com). Tüm hakları saklıdır.
          </div>
          <div className="flex items-center space-x-2 text-gray-400 text-[11px]">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Veri Barındırma, Rol Bazlı Erişim ve SSL Şifrelemeli Güvenli Mimarisi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
