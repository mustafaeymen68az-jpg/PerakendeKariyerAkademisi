'use client';

import React, { useState } from 'react';
import { 
  Upload, 
  Video, 
  FileText, 
  Mic, 
  FileCode, 
  Plus, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  Search, 
  Filter,
  Building2,
  BookOpen,
  Volume2,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '@/data/departmentsData';

interface DocumentItem {
  id: string;
  title: string;
  deptName: string;
  type: 'VIDEO' | 'PDF' | 'WORD' | 'AUDIO' | 'PPTX';
  url: string;
  size: string;
  createdAt: string;
  description: string;
}

export default function DokumanYuklemePage() {
  const [selectedDeptId, setSelectedDeptId] = useState(DEPARTMENTS_DATA[0].id);
  const [docType, setDocType] = useState<'VIDEO' | 'PDF' | 'WORD' | 'AUDIO' | 'PPTX'>('PDF');
  const [docTitle, setDocTitle] = useState('');
  const [docUrl, setDocUrl] = useState('');
  const [docDesc, setDocDesc] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  // Sample Documents State
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: 'doc_1',
      title: 'Mağaza P&L Kar-Zarar Hesaplama Kılavuzu',
      deptName: 'Mağaza Müdürleri',
      type: 'PDF',
      url: 'https://example.com/pl-guide.pdf',
      size: '2.4 MB',
      createdAt: '2026-08-14',
      description: 'Mağaza P&L tablolarının adım adım hesaplanması ve aylık bütçe sapma formülleri.'
    },
    {
      id: 'doc_2',
      title: 'Kasa POS Cihazı Kullanım Sesli Anlatımı',
      deptName: 'Kasiyer',
      type: 'AUDIO',
      url: 'https://example.com/pos-audio.mp3',
      size: '12.8 MB (08:45 Dk)',
      createdAt: '2026-08-13',
      description: 'Zor müşteri anında POS işlemlerinde yapılması gereken adımların ses kaydı.'
    },
    {
      id: 'doc_3',
      title: 'Kasap Reyonu Karkas Parçalama Video Dersi',
      deptName: 'Kasap Reyonu Satış Elemanı',
      type: 'VIDEO',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      size: '45.0 MB (12:30 Dk)',
      createdAt: '2026-08-12',
      description: 'Dana karkas etlerin parçalanması, bıçak güvenliği ve hijyen video uygulaması.'
    },
    {
      id: 'doc_4',
      title: 'Meyve Sebze Tazelik ve Kalite Kontrol Formu',
      deptName: 'Meyve Sebze Reyonu Satış Elemanı',
      type: 'WORD',
      url: 'https://example.com/form.docx',
      size: '1.1 MB',
      createdAt: '2026-08-10',
      description: 'Günlük hal alım kabulünde doldurulacak kalite kontrol Word formu.'
    }
  ]);

  const activeDept = DEPARTMENTS_DATA.find((d) => d.id === selectedDeptId) || DEPARTMENTS_DATA[0];

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle) return;

    const newDoc: DocumentItem = {
      id: `doc_${Date.now()}`,
      title: docTitle,
      deptName: activeDept.name,
      type: docType,
      url: docUrl || 'https://example.com/sample-file',
      size: docType === 'VIDEO' ? '32 MB (10 Dk)' : docType === 'AUDIO' ? '8 MB (05 Dk)' : '1.8 MB',
      createdAt: new Date().toISOString().split('T')[0],
      description: docDesc || `${activeDept.name} için hazırlanan ${docType} dökümanı.`
    };

    setDocuments([newDoc, ...documents]);
    setDocTitle('');
    setDocUrl('');
    setDocDesc('');
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter((d) => d.id !== id));
  };

  const getDocBadge = (type: DocumentItem['type']) => {
    switch (type) {
      case 'VIDEO':
        return <span className="bg-[#087F96] text-white px-2.5 py-1 rounded-md text-[10px] font-extrabold flex items-center space-x-1"><Video className="h-3 w-3" /><span>VIDEO</span></span>;
      case 'PDF':
        return <span className="bg-red-600 text-white px-2.5 py-1 rounded-md text-[10px] font-extrabold flex items-center space-x-1"><FileText className="h-3 w-3" /><span>PDF</span></span>;
      case 'WORD':
        return <span className="bg-blue-600 text-white px-2.5 py-1 rounded-md text-[10px] font-extrabold flex items-center space-x-1"><FileCheck className="h-3 w-3" /><span>WORD</span></span>;
      case 'AUDIO':
        return <span className="bg-emerald-600 text-white px-2.5 py-1 rounded-md text-[10px] font-extrabold flex items-center space-x-1"><Mic className="h-3 w-3" /><span>SES KAYDI</span></span>;
      case 'PPTX':
        return <span className="bg-amber-600 text-white px-2.5 py-1 rounded-md text-[10px] font-extrabold flex items-center space-x-1"><FileCode className="h-3 w-3" /><span>SUNUM</span></span>;
    }
  };

  const filteredDocs = documents.filter((d) => 
    d.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    d.deptName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    d.type.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full w-fit mb-1">
            <Upload className="h-3.5 w-3.5" />
            <span>Eğitmen İçerik & Döküman Yönetimi</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#0B2A4A]">
            Döküman & Medya Yükleme Paneli
          </h2>
          <p className="text-xs text-gray-500 font-light mt-0.5">
            Derslere Video (.mp4), PDF dökümanı, Word belgesi (.docx), Ses kaydı (.mp3) ve sunumlar ekleyin.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upload Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
            <div className="p-2 bg-[#087F96] text-white rounded-xl">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#0B2A4A]">Yeni Döküman / Medya Ekle</h3>
              <p className="text-[11px] text-gray-500 font-light">Seçtiğiniz kadro ve ders için dosya tanımlayın.</p>
            </div>
          </div>

          <form onSubmit={handleAddDocument} className="space-y-4 text-xs font-medium">
            {/* Department Select */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Hedef Departman / Kadro (26 Kadro):</label>
              <select
                value={selectedDeptId}
                onChange={(e) => setSelectedDeptId(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
              >
                {DEPARTMENTS_DATA.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name} ({dept.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Document Type Select */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Dosya / Medya Türü:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'VIDEO', label: '🎥 Video', color: 'border-[#087F96]' },
                  { id: 'PDF', label: '📄 PDF', color: 'border-red-500' },
                  { id: 'WORD', label: '📝 Word', color: 'border-blue-500' },
                  { id: 'AUDIO', label: '🎙️ Ses Kaydı', color: 'border-emerald-500' },
                  { id: 'PPTX', label: '📊 Sunum', color: 'border-amber-500' }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setDocType(t.id as any)}
                    className={`py-2 px-2.5 rounded-xl border text-[11px] font-extrabold transition-all ${
                      docType === t.id
                        ? 'bg-[#0B2A4A] text-white border-[#0B2A4A] shadow-xs'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Döküman / Medya Başlığı:</label>
              <input
                type="text"
                required
                placeholder="Örn: Kasa Cihazı Kullanımı Sesli Anlatımı"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
              />
            </div>

            {/* URL or Upload Input */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Dosya URL veya Medya Bağlantısı:</label>
              <input
                type="url"
                placeholder="https://domain.com/dosya.mp4 (veya mp3 / pdf / docx)"
                value={docUrl}
                onChange={(e) => setDocUrl(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-mono text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Kısa İçerik Açıklaması:</label>
              <textarea
                rows={3}
                placeholder="Öğrencilerin bu dökümanda öğreneceği detay başlıklar..."
                value={docDesc}
                onChange={(e) => setDocDesc(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-xs"
            >
              <Upload className="h-4 w-4" />
              <span>Sisteme Yükle ve Yayınla</span>
            </button>
          </form>
        </div>

        {/* Right Column: Uploaded Document List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-display font-bold text-base text-[#0B2A4A]">Sistemdeki Döküman & Medya Kütüphanesi</h3>
                <p className="text-xs text-gray-500 font-light">Toplam {documents.length} adet yüklenmiş eğitim materyali.</p>
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Döküman veya kadro ara..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#087F96]"
                />
              </div>
            </div>

            {/* List */}
            <div className="space-y-3">
              {filteredDocs.map((doc) => (
                <div key={doc.id} className="bg-[#F8FAFC] border border-gray-200 hover:border-[#087F96]/40 p-4 rounded-xl transition-all space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2.5">
                      {getDocBadge(doc.type)}
                      <div>
                        <span className="text-[10px] font-bold text-[#087F96] bg-[#DDF4F7] px-2 py-0.5 rounded-full inline-block mb-0.5">
                          {doc.deptName}
                        </span>
                        <h4 className="font-display font-bold text-sm text-[#0B2A4A] leading-tight">
                          {doc.title}
                        </h4>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Dökümanı Sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-xs text-gray-600 font-light pl-1">
                    {doc.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 text-[11px] text-gray-500">
                    <span className="font-mono text-gray-400">Yüklenme: {doc.createdAt} • Boyut: {doc.size}</span>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#087F96] hover:underline font-bold flex items-center space-x-1"
                    >
                      <span>Ön İzle / İndir</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
