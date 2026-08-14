import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  UserCheck, 
  FileText, 
  Key, 
  Server, 
  HardDrive,
  CheckCircle2
} from 'lucide-react';

export const metadata = {
  title: 'Kurumsal Veri Güvenliği & KVKK | Perakende Kariyer Akademisi',
  description: 'Kurumsal veri barındırma, rol bazlı erişim kontrolü, audit log, KVKK uyumluluğu ve veri saklama politikamız.'
};

export default function SecurityPage() {
  const securityFeatures = [
    { title: 'Veri Barındırma (Hosting)', desc: 'Tüm kurumsal veriler ISO 27001 sertifikalı, yüksek güvenlikli yerel bulut veri merkezlerinde uçtan uca şifreli barındırılır.', icon: <Server className="h-5 w-5 text-[#087F96]" /> },
    { title: 'Rol Bazlı Erişim (RBAC)', desc: 'Şirket yöneticisi, İK direktörü, bölge müdürü ve çalışan bazında tam yetki sınırlandırması uygulanır.', icon: <Key className="h-5 w-5 text-[#087F96]" /> },
    { title: 'Yönetici Yetkilendirmesi', desc: 'Sadece yetkilendirilmiş İK yöneticileri çalışan değerlendirme ve terfi kararlarına erişebilir.', icon: <UserCheck className="h-5 w-5 text-[#087F96]" /> },
    { title: 'Çalışan Veri Erişimi', desc: 'Çalışanlar yalnızca kendi kişisel karnelerini, eğitimlerini ve yetkinlik pasaportlarını görüntüleyebilir.', icon: <Lock className="h-5 w-5 text-[#087F96]" /> },
    { title: 'Audit Log (Erişim İzleme)', desc: 'Sistem üzerindeki tüm veri görüntüleme, düzenleme ve terfi işlemleri zaman damgasıyla audit log kayıt altına alınır.', icon: <FileText className="h-5 w-5 text-[#087F96]" /> },
    { title: 'Yedekleme & İş Sürekliliği', desc: 'Günlük otomatik felaket kurtarma yedeklemeleri ve %99.9 erişilebilirlik garantisi sunulur.', icon: <Database className="h-5 w-5 text-[#087F96]" /> },
    { title: 'Şifreleme (SSL / TLS & AES-256)', desc: 'Veriler aktarım esnasında TLS 1.3, veritabanında AES-256 standartlarında şifrelenir.', icon: <HardDrive className="h-5 w-5 text-[#087F96]" /> },
    { title: 'KVKK & Saklama Politikası', desc: '6698 sayılı Kişisel Verilerin Korunması Kanunu ve veri saklama/imha mevzuatına tam uyumlu altyapı.', icon: <ShieldCheck className="h-5 w-5 text-[#087F96]" /> }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9]">
      <section className="bg-[#0B2A4A] text-white py-16 border-b border-[#087F96]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-[#087F96]/20 border border-[#087F96]/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#DDF4F7] mb-3">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Kurumsal Altyapı Güvencesi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Kurumsal Veri Güvenliği ve KVKK Mimarisi</h1>
          <p className="mt-3 text-base text-gray-300 max-w-2xl mx-auto">
            Çalışanlarınızın yetkinlik, sınav, performans ve terfi verileri en üst düzey kurumsal bilgi güvenliği standartları ile korunmaktadır.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((sec, idx) => (
              <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#087F96]/10 flex items-center justify-center">
                  {sec.icon}
                </div>
                <h3 className="font-bold text-base text-[#0B2A4A]">{sec.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{sec.desc}</p>
                <div className="pt-2 text-[10px] font-bold text-emerald-700 flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Uyumlu Mimariler
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
