'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  HelpCircle, 
  Bell, 
  UserCheck, 
  Building2, 
  CheckCircle2, 
  Clock, 
  Search,
  Sparkles,
  MessageCircle,
  Users,
  User,
  GraduationCap
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '@/data/departmentsData';

interface RecipientOption {
  value: string;
  label: string;
  category: 'GROUP' | 'STUDENT';
  deptId?: string;
}

const RECIPIENT_OPTIONS: RecipientOption[] = [
  // EĞİTİM GRUPLARI
  { value: 'Tüm Kadro Öğrencileri', label: '📢 Tüm Kadro & Tüm Eğitim Grupları (Genel)', category: 'GROUP' },
  { value: 'P&L Mağaza Bütçe Yönetimi Grubu', label: '👥 P&L Mağaza Bütçe Yönetimi Eğitim Grubu', category: 'GROUP', deptId: 'magaza_mudurleri' },
  { value: 'Kasiyer Müşteri Kriz Yönetimi Grubu', label: '👥 Kasiyer Müşteri Kriz Yönetimi Eğitim Grubu', category: 'GROUP', deptId: 'kasiyerler' },
  { value: 'Çoklu Mağaza Operasyon Liderliği Grubu', label: '👥 Çoklu Mağaza Operasyon Liderliği Grubu', category: 'GROUP', deptId: 'magaza_mudurleri' },
  { value: 'Taze Gıda & Hijyen Ustalığı Grubu', label: '👥 Taze Gıda & Hijyen Ustalığı Grubu', category: 'GROUP', deptId: 'reyon_gorevlileri' },
  { value: 'Bölgesel Ciro ve Pazar Payı Grubu', label: '👥 Bölgesel Ciro ve Pazar Payı Stratejileri Grubu', category: 'GROUP', deptId: 'saha_operasyon_mudurleri' },

  // BİREYSEL ÖĞRENCİLER
  { value: 'Selin Yılmaz', label: '🎓 Selin Yılmaz (Kadıköy Şube Müdür Yrd.)', category: 'STUDENT', deptId: 'magaza_mudurleri' },
  { value: 'Ahmet Can Demir', label: '🎓 Ahmet Can Demir (Beşiktaş Kasa Şefi)', category: 'STUDENT', deptId: 'kasiyerler' },
  { value: 'Caner Kaya', label: '🎓 Caner Kaya (Tunalı Mağaza Müdürü)', category: 'STUDENT', deptId: 'magaza_mudurleri' },
  { value: 'Mehmet Yılmaz', label: '🎓 Mehmet Yılmaz (Kadıköy Reyon Şefi)', category: 'STUDENT', deptId: 'reyon_gorevlileri' },
  { value: 'Zeynep Karahan', label: '🎓 Zeynep Karahan (Ege Bölge Kategori Uzmanı)', category: 'STUDENT', deptId: 'saha_operasyon_mudurleri' },
  { value: 'Merve Şahin', label: '🎓 Merve Şahin (Alsancak Taze Gıda Şefi)', category: 'STUDENT', deptId: 'taze_gida_kasap_manav' }
];

interface SentMessage {
  id: string;
  type: 'MESAJ' | 'SORU' | 'DUYURU';
  targetStudent: string;
  deptName: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function StudentMessagingPage() {
  const [msgType, setMsgType] = useState<'MESAJ' | 'SORU' | 'DUYURU'>('MESAJ');
  const [selectedDeptId, setSelectedDeptId] = useState(DEPARTMENTS_DATA[0].id);
  const [selectedRecipientValue, setSelectedRecipientValue] = useState<string>(RECIPIENT_OPTIONS[0].value);
  const [customRecipient, setCustomRecipient] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [messages, setMessages] = useState<SentMessage[]>([
    {
      id: 'msg_1',
      type: 'SORU',
      targetStudent: 'Mehmet Yılmaz',
      deptName: 'Mağaza Müdürleri',
      title: 'Mağaza P&L Tablosu 3. Hafta Vaka Çalışması',
      content: 'Mehmet merhaba, 3. modüldeki P&L brüt marj sapma analizinde fire oranını %1.2 yerine %0.8 düşürürsek ciroya etkisi ne olur? Cevabını panelinden iletebilirsin.',
      createdAt: '2026-08-14 15:20'
    },
    {
      id: 'msg_2',
      type: 'DUYURU',
      targetStudent: 'P&L Mağaza Bütçe Yönetimi Grubu',
      deptName: 'Kasiyer',
      title: 'POS Cihazı Yeni Nesil Güncelleme Dersi Yüklendi',
      content: 'Değerli P&L Mağaza Bütçe Yönetimi grubu öğrencilerimiz, sisteme yeni eklenen POS Cihazı Sesli Anlatım dökümanını incelemeyi unutmayın.',
      createdAt: '2026-08-13 10:00'
    }
  ]);

  const handleRecipientSelect = (val: string) => {
    setSelectedRecipientValue(val);
    const found = RECIPIENT_OPTIONS.find((r) => r.value === val);
    if (found && found.deptId) {
      const matchDept = DEPARTMENTS_DATA.find((d) => d.id === found.deptId);
      if (matchDept) {
        setSelectedDeptId(matchDept.id);
      }
    }
  };

  const activeRecipientName = selectedRecipientValue === 'CUSTOM' ? customRecipient : selectedRecipientValue;
  const activeDept = DEPARTMENTS_DATA.find((d) => d.id === selectedDeptId) || DEPARTMENTS_DATA[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !activeRecipientName) {
      alert('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    const newMsg: SentMessage = {
      id: `msg_${Date.now()}`,
      type: msgType,
      targetStudent: activeRecipientName,
      deptName: activeDept.name,
      title,
      content,
      createdAt: new Date().toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' })
    };

    setMessages([newMsg, ...messages]);
    setTitle('');
    setContent('');
    alert(`"${activeRecipientName}" alıcısına ${msgType === 'SORU' ? 'Soru' : msgType === 'DUYURU' ? 'Duyuru' : 'Mesaj'} başarıyla gönderildi!`);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full w-fit mb-1">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Öğrenci İletişim &amp; Soru Gönderme Paneli</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#0B2A4A]">
            Öğrencilere Soru ve Mesaj Gönder
          </h2>
          <p className="text-xs text-gray-500 font-light mt-0.5">
            Eğitim grubuna toplu duyuru iletin veya bireysel öğrenci seçerek doğrudan soru ve ödev gönderin.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
            <div className="p-2 bg-[#087F96] text-white rounded-xl">
              <Send className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#0B2A4A]">Yeni İletişim Gönderisi</h3>
              <p className="text-[11px] text-gray-500 font-light">Mesaj, soru veya duyuru tipini seçin.</p>
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="space-y-4 text-xs font-medium">
            {/* Type Selector */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Gönderim Türü:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'MESAJ', label: '💬 Bireysel Mesaj' },
                  { id: 'SORU', label: '❓ Soru & Ödev' },
                  { id: 'DUYURU', label: '📢 Genel Duyuru' }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setMsgType(t.id as any)}
                    className={`py-2 px-2 rounded-xl border text-[11px] font-extrabold transition-all cursor-pointer ${
                      msgType === t.id
                        ? 'bg-[#0B2A4A] text-white border-[#0B2A4A] shadow-xs'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Department Select */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Hedef Kadro / Departman (26 Kadro):</label>
              <select
                value={selectedDeptId}
                onChange={(e) => setSelectedDeptId(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
              >
                {DEPARTMENTS_DATA.map((dept) => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>

            {/* 🔴 RECIPIENT (EĞİTİM GRUBU VEYA ÖĞRENCİ SEÇİMİ) */}
            <div className="space-y-1">
              <label className="block text-[#0B2A4A] font-bold mb-1 flex items-center space-x-1.5">
                <Users className="h-4 w-4 text-[#087F96]" />
                <span>Alıcı Eğitim Grubu veya Öğrenci Seçin:</span>
              </label>

              <select
                value={selectedRecipientValue}
                onChange={(e) => handleRecipientSelect(e.target.value)}
                className="w-full p-3 bg-gray-50 border-2 border-[#087F96]/30 hover:border-[#087F96] rounded-xl text-xs font-bold text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none transition-all cursor-pointer shadow-xs"
              >
                <optgroup label="👥 EĞİTİM GRUPLARI / SINIFLAR">
                  {RECIPIENT_OPTIONS.filter((r) => r.category === 'GROUP').map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </optgroup>

                <optgroup label="🎓 BİREYSEL ÖĞRENCİLER">
                  {RECIPIENT_OPTIONS.filter((r) => r.category === 'STUDENT').map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </optgroup>

                <option value="CUSTOM">+ Diğer / Manuel Öğrenci veya Grup Yazın...</option>
              </select>

              {selectedRecipientValue === 'CUSTOM' && (
                <input
                  type="text"
                  required
                  value={customRecipient}
                  onChange={(e) => setCustomRecipient(e.target.value)}
                  placeholder="Örn: 2. Dönem Reyon Şefliği Sınıfı veya Ali Kaya"
                  className="w-full mt-2 p-2.5 bg-white border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none font-medium"
                />
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Konu Başlığı:</label>
              <input
                type="text"
                required
                placeholder="Örn: P&L Vaka Çalışması Sorusu veya Sınav Hatırlatması"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Mesaj / Soru İçeriği:</label>
              <textarea
                rows={5}
                required
                placeholder="Öğrenciye veya eğitim grubuna sormak istediğiniz soru veya iletmek istediğiniz detaylı duyuru..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none resize-none font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-xs cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>{activeRecipientName} Alıcısına Anında Gönder</span>
            </button>
          </form>
        </div>

        {/* Right Column: Sent Messages */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
            <h3 className="font-display font-bold text-base text-[#0B2A4A] border-b border-gray-100 pb-3">
              Gönderilen Soru &amp; Mesaj Geçmişi ({messages.length})
            </h3>

            <div className="space-y-3">
              {messages.map((m) => (
                <div key={m.id} className="bg-[#F8FAFC] p-4 rounded-xl border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      m.type === 'SORU' ? 'bg-amber-100 text-amber-800' :
                      m.type === 'DUYURU' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {m.type === 'SORU' ? '❓ SORU / ÖDEV' : m.type === 'DUYURU' ? '📢 DUYURU' : '💬 BİREYSEL MESAJ'}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">{m.createdAt}</span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#087F96] block">
                      Alıcı: {m.targetStudent} ({m.deptName})
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#0B2A4A] mt-0.5">
                      {m.title}
                    </h4>
                  </div>

                  <p className="text-xs text-gray-600 font-light leading-relaxed bg-white p-3 rounded-lg border border-gray-200/80">
                    {m.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
