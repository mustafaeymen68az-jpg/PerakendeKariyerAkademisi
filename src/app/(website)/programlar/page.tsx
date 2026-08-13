import React from 'react';
import Link from 'next/link';
import { Crown, CheckCircle2, ArrowRight, Clock, Award, Building2, Briefcase, FileCheck, Layers } from 'lucide-react';

interface ProgramDetail {
  id: string;
  title: string;
  duration: string;
  purpose: string;
  modulesCount: number;
  fieldApp: string;
  finalProject: string;
  evaluation: string;
  certificate: string;
}

const EXECUTIVE_PROGRAMS: ProgramDetail[] = [
  {
    id: 'magaza-muduru-yetistirme',
    title: 'Mağaza Müdürü Yetiştirme Programı',
    duration: '6 Ay',
    purpose: 'Mağaza müdür yardımcılarını ve kıdemli şefleri tam yetkili mağaza müdürlüğü rolüne hazırlamak.',
    modulesCount: 24,
    fieldApp: '3 Farklı tipte mağazada 2 hafta süreli gölge yöneticilik ve vardiya yönetimi stajı.',
    finalProject: 'Örnek bir mağazanın P&L bilançosunu inceleyerek %5 brüt marj artış planı sunmak.',
    evaluation: '%40 Sınav + %30 Proje Sunumu + %30 Bölge Müdürü Mülakatı',
    certificate: 'Perakende Kariyer Akademisi Sertifikalı Mağaza Müdürü Belgesi'
  },
  {
    id: 'magaza-muduru-gelistirme',
    title: 'Mağaza Müdürü Geliştirme Programı',
    duration: '3 Ay',
    purpose: 'Mevcut mağaza müdürlerinin finansal analiz, liderlik, koçluk ve zayi önleme yetkinliklerini derinleştirmek.',
    modulesCount: 16,
    fieldApp: 'Saha denetim checklistleri ile mağaza içi verimlilik denetimi yapma.',
    finalProject: 'Kendi mağazasında 90 günlük fire ve shrink düşürme aksiyon planı.',
    evaluation: '%50 KPI İyileşme Oranı + %50 Proje Değerlendirmesi',
    certificate: 'Kıdemli Perakende Yöneticisi Uzmanlık Sertifikası'
  },
  {
    id: 'bolge-muduru-yetistirme',
    title: 'Bölge Müdürü Yetiştirme Programı',
    duration: '6 Ay',
    purpose: 'Başarılı mağaza müdürlerini 10-20 şubelik bölgenin P&L, bütçe ve liderliğini yönetmeye hazırlamak.',
    modulesCount: 28,
    fieldApp: '15 Şubelik bölgede 1 ay süreli kıdemli bölge müdürü ile saha denetimi.',
    finalProject: 'Bölgesel ciro büyütme, lokasyon analizi ve mağaza kapatma/açma simülasyonu.',
    evaluation: '%40 Bütçe Simülasyonu + %60 İcra Kurulu Sunumu',
    certificate: 'Saha Bölge Yöneticisi Lisans Belgesi'
  },
  {
    id: 'bolge-muduru-gelistirme',
    title: 'Bölge Müdürü Geliştirme Programı',
    duration: '3 Ay',
    purpose: 'Mevcut bölge müdürlerine stratejik perakendecilik, lokasyon analitiği ve üst düzey liderlik kazandırmak.',
    modulesCount: 18,
    fieldApp: 'Şirket geneli en düşük performanslı 3 mağazayı yerinde inceleme ve kriz müdahalesi.',
    finalProject: 'Şirket bazlı 1 yıllık bölge ciro ve brüt marj strateji haritası.',
    evaluation: 'Bölgesel P&L Hedef Gerçekleşme Oranı',
    certificate: 'Kıdemli Saha Operasyon Direktörü Lisansı'
  },
  {
    id: 'ceo-genel-mudur',
    title: 'CEO / Genel Müdür Gelişim Programı',
    duration: '4 Ay',
    purpose: 'Perakende şirket sahipleri ve genel müdürler için vizyoner liderlik, yapay zekâ ve omnichannel stratejileri.',
    modulesCount: 20,
    fieldApp: 'Uluslararası perakende örneklerinin ve dijital dark store modellerinin incelenmesi.',
    finalProject: 'Şirketin 3 Yıllık Dijital & Kurumsal Dönüşüm Master Planı.',
    evaluation: 'Danışma Kurulu ve Bağımsız Perakende Uzmanları Değerlendirmesi',
    certificate: 'Perakende Liderlik Master Diploması'
  },
  {
    id: 'is-ve-surec-gelistirme',
    title: 'İş ve Süreç Geliştirme Yöneticisi Programı',
    duration: '4 Ay',
    purpose: 'Perakende operasyonlarında israfı önleme, süreçleri standartlaştırma ve verimlilik mühendisliği.',
    modulesCount: 16,
    fieldApp: 'Kasa, depo ve reyon süreçlerinde zaman ve hareket etüdü ölçümü.',
    finalProject: 'Bir mağaza sürecinin dijitalleştirilerek %30 zaman tasarrufu sağlanması.',
    evaluation: 'Süreç Tasarımı Verimlilik Skoru',
    certificate: 'Perakende Süreç Mühendisi Sertifikası'
  },
  {
    id: 'crm-yonetici-yetistirme',
    title: 'CRM Yöneticisi Yetiştirme Programı',
    duration: '3 Ay',
    purpose: 'Müşteri sadakat verisinden ciro üretecek CRM yöneticileri yetiştirmek.',
    modulesCount: 14,
    fieldApp: 'Canlı veritabanı üzerinde RFM segmentasyonu kurgulama.',
    finalProject: 'Kayıp müşteri (churn) geri kazanma kampanyası tasarımı ve ROI hesabı.',
    evaluation: 'Kampanya Geri Dönüş Oranı & Sınav Skoru',
    certificate: 'Perakende CRM Yöneticisi Uzmanlık Belgesi'
  },
  {
    id: 'satis-muduru-yetistirme',
    title: 'Satış Müdürü Yetiştirme Programı',
    duration: '4 Ay',
    purpose: 'Saha satış hedeflerini tutturacak, ekibi motive edecek hırslı satış müdürleri yetiştirmek.',
    modulesCount: 18,
    fieldApp: 'Saha satış ekibine koçluk yapma ve mağaza tutundurma ziyareti.',
    finalProject: 'Sezonluk mağaza içi çapraz satış ve teşvik primi sistemi tasarımı.',
    evaluation: 'Satış Bütçesi Gerçekleşme Skoru',
    certificate: 'Perakende Satış Yöneticisi Sertifikası'
  }
];

export default function ProgramlarPage() {
  return (
    <div className="min-h-screen bg-[#F4F7F9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="bg-[#0B2A4A] text-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[#087F96]/30 text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#DDF4F7] bg-[#087F96] px-3.5 py-1 rounded-full uppercase tracking-wider">
            Özel Gelişim Parkurları
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl">
            Yönetici Gelişim Programları
          </h1>
          <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
            Eğitim modüllerinin ötesinde; saha uygulaması, final projesi ve ölçülebilir değerlendirme içeren uçtan uca yönetici yetiştirme ve geliştirme programları.
          </p>
        </div>

        {/* Detailed Programs Grid */}
        <div className="space-y-8">
          {EXECUTIVE_PROGRAMS.map((prog) => (
            <div key={prog.id} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-4 gap-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#087F96] text-white flex items-center justify-center font-bold shrink-0">
                    <Crown className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-extrabold text-xl text-[#0B2A4A]">{prog.title}</h2>
                    <p className="text-xs text-gray-500">{prog.purpose}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1.5 rounded-lg">
                  <Clock className="h-4 w-4" />
                  <span>Süre: {prog.duration} • {prog.modulesCount} Modül</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="bg-[#F4F7F9] p-4 rounded-xl space-y-1">
                  <span className="font-bold text-[#0B2A4A] block">Saha Uygulaması:</span>
                  <span className="text-gray-600 leading-relaxed block">{prog.fieldApp}</span>
                </div>

                <div className="bg-[#F4F7F9] p-4 rounded-xl space-y-1">
                  <span className="font-bold text-[#0B2A4A] block">Final Projesi:</span>
                  <span className="text-gray-600 leading-relaxed block">{prog.finalProject}</span>
                </div>

                <div className="bg-[#F4F7F9] p-4 rounded-xl space-y-1">
                  <span className="font-bold text-[#0B2A4A] block">Değerlendirme:</span>
                  <span className="text-gray-600 leading-relaxed block">{prog.evaluation}</span>
                </div>

                <div className="bg-[#DDF4F7]/60 p-4 rounded-xl space-y-1 border border-[#087F96]/30">
                  <span className="font-bold text-[#056B80] block flex items-center">
                    <Award className="h-4 w-4 mr-1 text-[#087F96]" />
                    Sertifikasyon:
                  </span>
                  <span className="text-[#0B2A4A] font-medium leading-relaxed block">{prog.certificate}</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Link
                  href="/talep-olustur"
                  className="px-6 py-2.5 bg-[#087F96] hover:bg-[#056B80] text-white font-bold text-xs rounded-xl shadow transition-all flex items-center space-x-1.5"
                >
                  <span>Program Başvurusu Yap</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
