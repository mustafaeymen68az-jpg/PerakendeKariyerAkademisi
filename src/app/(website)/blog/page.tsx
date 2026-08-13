'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Search, ArrowRight, Clock, Sparkles } from 'lucide-react';

const BLOG_CATEGORIES = [
  'Tüm Makaleler',
  'Mağazacılık',
  'Satınalma',
  'Kategori Yönetimi',
  'CRM',
  'Finans',
  'Taze Gıda',
  'Liderlik',
  'Veri Analitiği',
  'Yapay Zekâ',
  'Kariyer'
];

const BLOG_POSTS = [
  {
    id: 'b1',
    title: 'Perakendede Yapay Zekâ ile Talep Tahmini Nasıl Yapılır?',
    category: 'Yapay Zekâ',
    readTime: '6 dk',
    date: '10 Şubat 2026',
    excerpt: 'Hava durumu, özel tatil günleri ve geçmiş satış verilerinin yapay zekâ algoritmalarıyla işlenerek mağaza firesini düşürme yöntemleri.',
    slug: 'perakendede-yapay-zeka-ile-talep-tahmini'
  },
  {
    id: 'b2',
    title: 'Taze Gıda Reyonlarında Fire Nasıl Sıfırlanır?',
    category: 'Taze Gıda',
    readTime: '8 dk',
    date: '8 Şubat 2026',
    excerpt: 'Meyve-Sebze ve Şarküteri reyonlarında nem dengesi, saatlik rotasyon ve terazi kalibrasyon disiplini ile kârlılık artırma.',
    slug: 'taze-gida-fire-nasil-sifirlanir'
  },
  {
    id: 'b3',
    title: 'Mağaza Müdürü Olmak İçin Hangi Yetkinlikler Gerekli?',
    category: 'Kariyer',
    readTime: '5 dk',
    date: '5 Şubat 2026',
    excerpt: 'Kasiyerlik veya müdür yardımcılığından mağaza müdürlüğüne geçişte 2 yıllık yetkinlik haritasının önemi ve P&L hakimiyeti.',
    slug: 'magaza-muduru-olmak-icin-yetkinlikler'
  },
  {
    id: 'b4',
    title: 'GMROI Nedir? Raf İçi Stok Kârlılığı Nasıl Hesaplanır?',
    category: 'Kategori Yönetimi',
    readTime: '7 dk',
    date: '1 Şubat 2026',
    excerpt: 'Gross Margin Return on Investment (GMROI) metriği ile kategori yöneticilerinin raf verimliliğini ölçme formülleri.',
    slug: 'gmroi-nedir-raf-ici-stok-karliligi'
  },
  {
    id: 'b5',
    title: 'RFM Analizi İle Kayıp Müşterileri Geri Kazanma Stratejisi',
    category: 'CRM',
    readTime: '6 dk',
    date: '28 Ocak 2026',
    excerpt: 'Recency, Frequency, Monetary (RFM) segmentasyonu kullanarak son 60 gündür gelmeyen sadık müşterilere özel teklifler sunma.',
    slug: 'rfm-analizi-ile-kayip-musteriler'
  },
  {
    id: 'b6',
    title: 'Perakendede Sirkülasyonu (Turnover) Düşürmenin 5 Yolu',
    category: 'Liderlik',
    readTime: '9 dk',
    date: '24 Ocak 2026',
    excerpt: 'Saha çalışanlarının bağlılığını artırma, yapılandırılmış akademi eğitimi sunma ve adil prim sistemleri kurgulama rehberi.',
    slug: 'perakendede-turnover-dusurme'
  }
];

export default function BlogPage() {
  const [selectedCat, setSelectedCat] = useState('Tüm Makaleler');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat = selectedCat === 'Tüm Makaleler' || post.category === selectedCat;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F4F7F9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="bg-[#0B2A4A] text-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[#087F96]/30 text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#DDF4F7] bg-[#087F96] px-3.5 py-1 rounded-full uppercase tracking-wider">
            Sektörel Birikim
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl">
            Perakende Bilgi Merkezi
          </h1>
          <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
            Perakendecilik, saha operasyonları, taze gıda, finans, yapay zekâ ve kariyer üzerine güncel sektör analizleri.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Bilgi merkezinde makale ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[#F4F7F9] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#087F96] text-[#0B2A4A]"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                  selectedCat === cat
                    ? 'bg-[#087F96] text-white shadow'
                    : 'bg-[#F4F7F9] text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-gray-400 mb-3">
                  <span className="bg-[#DDF4F7] text-[#087F96] px-2.5 py-1 rounded-full uppercase">
                    {post.category}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-[#0B2A4A] group-hover:text-[#087F96] transition-colors leading-tight">
                  {post.title}
                </h3>

                <p className="text-xs text-gray-600 mt-2.5 line-clamp-3 font-light leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-400 font-mono">{post.date}</span>
                <span className="text-[#087F96] font-bold flex items-center group-hover:translate-x-1 transition-transform">
                  Devamını Oku <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
