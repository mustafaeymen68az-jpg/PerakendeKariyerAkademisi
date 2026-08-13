import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { ShieldCheck, Target, Award, Users, CheckCircle2, Building2, ArrowRight } from 'lucide-react';

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-[#F4F7F9] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="bg-[#0B2A4A] text-white p-8 sm:p-12 rounded-3xl shadow-xl border border-[#087F96]/30 text-center space-y-6">
          <Logo variant="dark" size="xl" showSubtext={true} className="justify-center" />
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
            Hakkımızda
          </h1>
          <p className="text-[#DDF4F7] text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Perakendecilikte Kariyer Yolculuğunuzun Adresi
          </p>
        </div>

        {/* Official Story Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-200 space-y-8">
          <div className="prose prose-lg max-w-none text-[#0B2A4A] space-y-6 leading-relaxed font-light">
            <p className="text-lg sm:text-xl font-medium text-[#087F96] border-l-4 border-[#087F96] pl-4 italic">
              “Perakende Kariyer Akademisi, perakende sektörünün gerçek saha ihtiyaçlarından doğmuş dijital eğitim, yetkinlik ve kariyer gelişim platformudur.”
            </p>

            <p className="text-base text-gray-700">
              Akademimiz mağaza çalışanından CEO / Genel Müdüre kadar tüm kadroların mesleki bilgi ve yönetim yetkinliklerini geliştirmeyi hedefler.
            </p>

            <p className="text-base text-gray-700">
              Eğitimlerimiz yalnızca teorik bilgi aktarımına değil; saha uygulamalarına, vaka analizlerine, KPI takibine ve ölçülebilir performans gelişimine dayanır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
            <div className="bg-[#F4F7F9] p-6 rounded-2xl space-y-2 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#DDF4F7] text-[#087F96] flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-base text-[#0B2A4A]">Saha Odaklılık</h3>
              <p className="text-xs text-gray-600 font-light">Gerçek mağaza operasyonları, raf/reyon düzeni ve canlı müşteri senaryoları.</p>
            </div>

            <div className="bg-[#F4F7F9] p-6 rounded-2xl space-y-2 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#DDF4F7] text-[#087F96] flex items-center justify-center mx-auto mb-3">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-base text-[#0B2A4A]">Ölçülebilirlik</h3>
              <p className="text-xs text-gray-600 font-light">Eğitimlerin mağaza firesine, ciroya ve sepet büyüklüğüne etkisini veriyle kanıtlama.</p>
            </div>

            <div className="bg-[#F4F7F9] p-6 rounded-2xl space-y-2 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#DDF4F7] text-[#087F96] flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-base text-[#0B2A4A]">Kademeli Kariyer</h3>
              <p className="text-xs text-gray-600 font-light">Kasiyerlikten bölge müdürlüğüne 2 yıllık net gelişim haritası.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#061B33] text-white p-8 rounded-2xl text-center space-y-4 shadow-lg border border-[#087F96]/40">
          <h3 className="font-display font-bold text-2xl">Platformu Keşfedin</h3>
          <p className="text-gray-300 text-sm max-w-xl mx-auto font-light">
            Eğitim kataloğumuzu inceleyin veya kurumunuz için akademi demosu talep edin.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/egitimler"
              className="px-6 py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-bold rounded-xl text-xs transition-all flex items-center space-x-1.5"
            >
              <span>Eğitim Kataloğu</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/talep-olustur"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-all border border-white/20"
            >
              <span>Kurumsal Demo</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
