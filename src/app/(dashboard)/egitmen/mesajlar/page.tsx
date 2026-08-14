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
  MessageCircle
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '@/data/departmentsData';

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
  const [targetStudent, setTargetStudent] = useState('Tüm Kadro Öğrencileri');
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
      targetStudent: 'Tüm Kadro Öğrencileri',
      deptName: 'Kasiyer',
      title: 'POS Cihazı Yeni Nesil Güncelleme Dersi Yüklendi',
      content: 'Değerli Kasiyer kadrosu öğrencilerimiz, sisteme yeni eklenen POS Cihazı Sesli Anlatım dökümanını incelemeyi unutmayın.',
      createdAt: '2026-08-13 10:00'
    }
  ]);

  const activeDept = DEPARTMENTS_DATA.find((d) => d.id === selectedDeptId) || DEPARTMENTS_DATA[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const newMsg: SentMessage = {
      id: `msg_${Date.now()}`,
      type: msgType,
      targetStudent,
      deptName: activeDept.name,
      title,
      content,
      createdAt: new Date().toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' })
    };

    setMessages([newMsg, ...messages]);
    setTitle('');
    setContent('');
    alert(`Öğrenciye ${msgType === 'SORU' ? 'Soru' : 'Mesaj'} başarıyla gönderildi!`);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#087F96] bg-[#DDF4F7] px-3 py-1 rounded-full w-fit mb-1">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Öğrenci İletişim & Soru Gönderme Paneli</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#0B2A4A]">
            Öğrencilere Soru ve Mesaj Gönder
          </h2>
          <p className="text-xs text-gray-500 font-light mt-0.5">
            Öğrencilere doğrudan soru sorun, bireysel geri bildirim iletin veya kadro bazlı duyuru yayınlayın.
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
                    className={`py-2 px-2 rounded-xl border text-[11px] font-extrabold transition-all ${
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

            {/* Target Student */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Alıcı Öğrenci (veya Tüm Kadro):</label>
              <input
                type="text"
                required
                value={targetStudent}
                onChange={(e) => setTargetStudent(e.target.value)}
                placeholder="Örn: Mehmet Yılmaz (veya Tüm Öğrenciler)"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-[#0B2A4A] font-bold mb-1">Konu Başlığı:</label>
              <input
                type="text"
                required
                placeholder="Örn: P&L Vaka Çalışması Sorusu"
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
                placeholder="Öğrenciye sormak istediğiniz soru veya iletmek istediğiniz detaylı mesaj..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs text-[#0B2A4A] focus:ring-2 focus:ring-[#087F96] outline-none resize-none font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#087F96] hover:bg-[#056B80] text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-xs"
            >
              <Send className="h-4 w-4" />
              <span>Öğrenciye Anında Gönder</span>
            </button>
          </form>
        </div>

        {/* Right Column: Sent Messages */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
            <h3 className="font-display font-bold text-base text-[#0B2A4A] border-b border-gray-100 pb-3">
              Gönderilen Soru & Mesaj Geçmişi ({messages.length})
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
