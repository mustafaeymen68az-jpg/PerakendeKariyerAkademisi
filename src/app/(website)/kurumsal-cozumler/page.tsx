import React from 'react';
import Link from 'next/link';
import { Building2, CheckCircle2, ArrowRight, ShieldCheck, Users, BarChart3, Award, FileCheck2, Cpu, GraduationCap, Medal } from 'lucide-react';

export default function KurumsalCozumlerPage() {
  const corporateServices = [
    { title: '1. Kurumsal Eğitim İhtiyaç Analizi', desc: 'Saha denetimleri ve sınavlarla şirketinizin mevcut yetkinlik haritasını çıkarma.' },
    { title: '2. Şirkete Özel Akademi Kurulumu', desc: 'Kendi logonuz, kurumsal renkleriniz ve özel alan adınızla kapalı devre LMS platformu.' },
    { title: '3. İçerik Özelleştirme & Video', desc: 'Market zincirinizin kendi operasyon kitapçıklarına uyumlu özel eğitim videoları.' },
    { title: '4. Train The Trainer (İç Eğitmen)', desc: 'Kurum içi şef ve müdürlerinizi akademi eğitmeni haline getirme programı.' },
    { title: '5. Sınav & QR Sertifikasyon', desc: 'Otomatik değerlendirmeli sınav sistemi ve doğrulanabilir dijital sertifikalar.' },
    { title: '6. Yetkinlik Matrisi & Yetenek Havuzu', desc: 'Her çalışanın 1. ve 2. yıl yetkinlik puanını canlı matriste izleme.' },
    { title: '7. Kariyer & Yedekleme Planı', desc: 'Mağaza müdürü veya bölge müdürü adayı olan yüksek potansiyelli çalışanları belirleme.' },
    { title: '8. Eğitim KPI Ölçümü (ROI)', desc: 'Eğitimlerin mağaza firesi, ciro artışı ve sepet büyüklüğüne etkisini veriyle kanıtlama.' },
    { title: '9. Yönetici Dashboardları', desc: 'İcra kurulu ve İK yöneticileri için anlık genel başarı ve katılım grafikleri.' }
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Header */}
        <div className="bg-[#0B2A4A] text-white p-8 sm:p-12 rounded-3xl shadow-xl border border-[#087F96]/30 text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#DDF4F7] bg-[#087F96] px-3.5 py-1 rounded-full uppercase tracking-wider">
            B2B Perakende Çözümleri
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl">
            Kurumunuza Özel Perakende Eğitim Akademisi
          </h1>
          <p className="text-gray-200 text-base sm:text-lg font-light leading-relaxed">
            Market zinciriniz için özel eğitim akademisi kurun; çalışan gelişimini, sınavları, sertifikaları ve kariyer planlarını tek platformdan yönetin.
          </p>
          <div className="pt-2">
            <Link
              href="/talep-olustur"
              className="px-8 py-4 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl shadow-lg transition-all inline-flex items-center space-x-2 text-sm"
            >
              <Building2 className="h-4 w-4" />
              <span>Kurumsal Demo Talep Et</span>
            </Link>
          </div>
        </div>

        {/* 9 Corporate Services Grid */}
        <div className="space-y-6">
          <h2 className="font-display font-extrabold text-2xl text-[#0B2A4A] text-center">
            Kurumsal Akademi Hizmet Paketi Bileşenleri
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {corporateServices.map((service, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-[#087F96] transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#DDF4F7] text-[#087F96] flex items-center justify-center font-bold mb-3">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-[#0B2A4A]">{service.title}</h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed font-light">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Train The Trainer Dedicated Section */}
        <div id="ic-egitmen" className="bg-[#061B33] text-white rounded-3xl p-8 sm:p-10 border border-[#087F96]/40 shadow-xl space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-[#DDF4F7] bg-[#087F96] px-3.5 py-1 rounded-full uppercase">
              Sürdürülebilir Akademi
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl">
              Train The Trainer – İç Eğitmen Eğitimi Programı
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
              Akademilerin sürdürülebilirliğini sağlayacak kurum içi eğitmen yetiştirme programı. Şirket içi başarılı mağaza müdürlerini ve reyon şeflerini pedagojik ve teknik yönden eğiterek kendi akademinizin eğitmeni yapın.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
              <Medal className="h-6 w-6 text-[#087F96]" />
              <h3 className="font-bold text-white text-sm">Eğitmenlik Metodolojisi</h3>
              <p className="text-gray-300 font-light">Yetişkin eğitimi (Andragoji), sahada etkili sunum teknikleri ve soru yanıtlama kriz yönetimi.</p>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
              <FileCheck2 className="h-6 w-6 text-[#34A853]" />
              <h3 className="font-bold text-white text-sm">Standart İçerik Dağıtımı</h3>
              <p className="text-gray-300 font-light">Şirket genelindeki tüm şubelerde 1:1 aynı kalite ve standartta mağazacılık ve taze gıda anlatımı.</p>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
              <GraduationCap className="h-6 w-6 text-[#DDF4F7]" />
              <h3 className="font-bold text-white text-sm">Sertifikalı İç Eğitmen</h3>
              <p className="text-gray-300 font-light">Programı başarıyla tamamlayan şeflere Kurumsal İç Eğitmen Sertifikası verilir.</p>
            </div>
          </div>
        </div>

        {/* Demo CTA */}
        <div className="bg-[#087F96] text-white p-8 rounded-2xl text-center space-y-4 shadow-lg">
          <h3 className="font-display font-extrabold text-2xl">Şirketiniz İçin Özel Akademi Sunumu İsteyin</h3>
          <p className="text-gray-100 text-sm max-w-xl mx-auto font-light">
            Uzman ekibimiz mağaza sayınıza ve çalışan kadronuza uygun akademi mimarisini 24 saat içinde hazırlayıp sunsun.
          </p>
          <div className="pt-2">
            <Link
              href="/talep-olustur"
              className="px-8 py-3.5 bg-[#0B2A4A] hover:bg-black/40 text-white font-bold rounded-xl shadow transition-all inline-flex items-center space-x-2 text-sm"
            >
              <span>Kurumsal Demo ve Teklif Formu</span>
              <ArrowRight className="h-4 w-4 text-[#087F96]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
