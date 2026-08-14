'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  BookOpen, 
  HelpCircle, 
  Upload, 
  Target, 
  MessageSquare, 
  Award, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  FileText,
  Video,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function EgitmenDashboard() {
  const stats = [
    { name: 'Aktif Eğitmenlik Grubum', value: '26 Kadro', sub: 'Tüm Perakende Pozisyonları', icon: BookOpen, color: 'bg-[#087F96]' },
    { name: 'Kayıtlı Öğrenci Sayısı', value: '1,420 Katılımcı', sub: '%94 Aktif Devam Oranı', icon: Users, color: 'bg-[#0B2A4A]' },
    { name: 'Yüklü Döküman & Medya', value: '184 Dosya', sub: 'Video, PDF, Word, Ses', icon: Upload, color: 'bg-[#34A853]' },
    { name: 'Hazırlanan Sınavlar', value: '42 Aktif Sınav', sub: 'QR Sertifika Onaylı', icon: HelpCircle, color: 'bg-amber-600' },
  ];

  const quickActions = [
    {
      title: 'Döküman & Medya Yükle',
      desc: 'Derslere Video (.mp4), PDF, Word (.docx) veya Ses kaydı (.mp3) ekleyin.',
      href: '/egitmen/dokumanlar',
      icon: Upload,
      btnText: 'Dosya Yükle',
      badge: 'Video & Ses'
    },
    {
      title: 'Sınav Hazırlama',
      desc: 'Çoktan seçmeli soru bankası ve puan barajlı yeni sınavlar tanımlayın.',
      href: '/egitmen/sinavlar',
      icon: HelpCircle,
      btnText: 'Sınav Oluştur',
      badge: 'Soru Bankası'
    },
    {
      title: 'Öğrenci SWOT Analizi',
      desc: 'Öğrencilerin Güçlü/Zayıf yönlerini, Fırsat ve Tehditlerini değerlendirin.',
      href: '/egitmen/swot',
      icon: Target,
      btnText: 'SWOT Yap',
      badge: 'Değerlendirme'
    },
    {
      title: 'Öğrenciye Mesaj & Soru',
      desc: 'Öğrencilere doğrudan soru sorun, duyuru yapın veya geri bildirim iletin.',
      href: '/egitmen/mesajlar',
      icon: MessageSquare,
      btnText: 'Mesaj Gönder',
      badge: 'İletişim'
    }
  ];

  const recentStudents = [
    { name: 'Mehmet Yılmaz', dept: 'Mağaza Müdürü', status: 'Sınav Tamamlandı (%90)', date: 'Bugün 14:30', cert: 'Sertifikalı' },
    { name: 'Ayşe Demir', dept: 'Kasiyer', status: '2. Yıl Eğitimi Devam Ediyor', date: 'Bugün 12:15', cert: 'Devam Ediyor' },
    { name: 'Mustafa Eymen', dept: 'Reyon Satış Elemanı', status: 'SWOT Analizi Bekliyor', date: 'Dün 18:40', cert: 'İncelemede' },
    { name: 'Zeynep Kaya', dept: 'Kasap Reyonu Satış Elemanı', status: 'Sınav Tamamlandı (%95)', date: 'Dün 16:00', cert: 'Sertifikalı' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#0B2A4A] text-white p-8 rounded-3xl shadow-xl border border-[#087F96]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#DDF4F7] bg-white/10 px-3 py-1 rounded-full w-fit">
            <Sparkles className="h-3.5 w-3.5 text-[#34A853]" />
            <span>Perakende Mühendisi Eğitim Akademisi • Eğitmen Paneli</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            Hoş Geldiniz, Dr. Ahmet Yılmaz 👨‍🏫
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-2xl">
            Tüm 26 perakende kadrosundaki öğrencilerinizi yönetebilir, Video/PDF dökümanı ekleyebilir, sınavlar tanımlayabilir, SWOT analizleri hazırlayıp direkt mesaj gönderebilirsiniz.
          </p>
        </div>

        <Link
          href="/egitmen/dokumanlar"
          className="px-6 py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold text-xs rounded-xl shadow-md transition-all shrink-0 flex items-center space-x-2 z-10"
        >
          <Upload className="h-4 w-4" />
          <span>Yeni İçerik Yükle</span>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500">{st.name}</span>
                <div className={`${st.color} text-white p-2.5 rounded-xl shadow-xs`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-[#0B2A4A] font-mono block">{st.value}</span>
                <span className="text-[11px] font-medium text-gray-400 mt-0.5 block">{st.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Cards */}
      <div className="space-y-4">
        <h3 className="font-display font-extrabold text-lg text-[#0B2A4A] flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-[#087F96]" />
          <span>Eğitmen Hızlı Yönetim İşlemleri</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((act, idx) => {
            const Icon = act.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-[#087F96] transition-all shadow-xs flex flex-col justify-between space-y-4 group">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-[#DDF4F7] text-[#087F96] rounded-xl group-hover:bg-[#087F96] group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#087F96] bg-[#DDF4F7]/60 px-2 py-0.5 rounded-full">
                      {act.badge}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-base text-[#0B2A4A] group-hover:text-[#087F96] transition-colors">
                    {act.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    {act.desc}
                  </p>
                </div>

                <Link
                  href={act.href}
                  className="w-full py-2.5 bg-[#F4F7F9] hover:bg-[#087F96] text-[#0B2A4A] hover:text-white rounded-xl text-xs font-extrabold transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>{act.btnText}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Student Activity Table */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="font-display font-bold text-lg text-[#0B2A4A]">Son Öğrenci Aktivite & Sınav Durumları</h3>
            <p className="text-xs text-gray-500 font-light mt-0.5">Öğrencilerin son tamamladığı eğitimler ve değerlendirme süreçleri.</p>
          </div>
          <Link href="/egitmen/sonuclar" className="text-xs font-bold text-[#087F96] hover:underline flex items-center space-x-1">
            <span>Tüm Sonuçları Gör</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F4F7F9] text-gray-600 font-bold border-b border-gray-200">
              <tr>
                <th className="p-3 rounded-l-lg">Öğrenci Adı</th>
                <th className="p-3">Departman / Kadro</th>
                <th className="p-3">Aktivite / Sınav Notu</th>
                <th className="p-3">Tarih</th>
                <th className="p-3 rounded-r-lg text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentStudents.map((st, i) => (
                <tr key={i} className="hover:bg-gray-50/80 transition-colors font-medium">
                  <td className="p-3 font-bold text-[#0B2A4A] flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-[#087F96] text-white font-bold flex items-center justify-center text-[10px] shrink-0 font-mono">
                      {st.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span>{st.name}</span>
                  </td>
                  <td className="p-3 text-gray-600 font-semibold">{st.dept}</td>
                  <td className="p-3 text-gray-700">
                    <span className="bg-[#DDF4F7] text-[#056B80] px-2.5 py-1 rounded-full text-[11px] font-bold">
                      {st.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-400 font-mono text-[11px]">{st.date}</td>
                  <td className="p-3 text-right">
                    <Link href="/egitmen/swot" className="text-[#087F96] hover:underline font-bold">
                      SWOT Yap →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
