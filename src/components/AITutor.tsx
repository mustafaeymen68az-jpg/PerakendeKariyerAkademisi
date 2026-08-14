'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BookOpen, GraduationCap, CheckCircle } from 'lucide-react';

interface Question {
  tag: string;
  q: string;
  a: string;
}

const SUGGESTED_QUESTIONS: Question[] = [
  {
    tag: 'Finansal Metrikler',
    q: 'GMROI Nedir ve Nasıl Hesaplanır?',
    a: `**GMROI (Gross Margin Return on Investment - Brüt Kar Stok Yatırım Getirisi)**, bir perakendecinin stoğa yatırdığı her 1 liralık sermayeden ne kadar brüt kar elde ettiğini ölçen kritik bir verimlilik metriğidir.

### Formül:
$$GMROI = \\frac{\\text{Brüt Kar}}{\\text{Ortalama Stok Maliyeti}} \\times 100$$

### Örnek Analiz:
Eğer yıllık brüt karınız **$150,000** ve mağazanızdaki ortalama envanterinizin maliyet değeri **$50,000** ise:
$$GMROI = \\frac{150,000}{50,000} \\times 100 = \\%300$$
Bu, envantere bağladığınız her 1 doların size 3 dolar brüt kar olarak döndüğünü gösterir. 
* Perakende mühendisliğinde hedef genellikle **%150** ve üzeridir.`
  },
  {
    tag: 'Tedarik Zinciri',
    q: 'Emniyet Stoku (Safety Stock) Nasıl Hesaplanır?',
    a: `**Emniyet Stoku (Safety Stock)**, talep belirsizlikleri ve tedarik süresindeki (lead time) gecikmelere karşı mağazayı/depoyu koruyan tampon envanterdir.

### Formül (Standart Model):
$$SS = Z \\times \\sigma_{LT}$$
* **Z**: İstenen servis seviyesine karşılık gelen standart sapma çarpanı (Z-Skoru). Örneğin %95 servis seviyesi için Z = 1.64.
* **$\\sigma_{LT}$**: Tedarik süresi boyunca talebin standart sapması.

### Tedarik Süresi ve Talep Değişken Olduğunda:
$$SS = Z \\times \\sqrt{L \\cdot \\sigma_D^2 + D^2 \\cdot \\sigma_L^2}$$
* **L**: Ortalama tedarik süresi (gün)
* **$\\sigma_D$**: Günlük talebin standart sapması
* **D**: Ortalama günlük talep
* **$\\sigma_L$**: Tedarik süresinin standart sapması

*Emniyet stoku arttıkça 'yok satma' ihtimaliniz düşer ancak envanter bulundurma maliyetleriniz (holding cost) doğrusal olarak artar.*`
  },
  {
    tag: 'Operasyonel Karar',
    q: 'Kamçı Etkisi (Bullwhip Effect) Nedir?',
    a: `**Kamçı Etkisi (Bullwhip Effect)**, tedarik zincirinde tüketici talebindeki küçük dalgalanmaların, perakendeciden toptancıya, distribütöre ve üreticiye doğru gidildikçe katlanarak büyümesi fenomenidir.

### Temel Nedenleri:
1. **Talep Tahmin Güncellemeleri:** Her halka kendi tahminlerini yaparken bir önceki halkanın sipariş verisini baz alır, gerçek tüketici verisinden uzaklaşır.
2. **Toplu Sipariş Verme (Batching):** Sipariş verme maliyetini düşürmek için haftalık yerine aylık toplu sipariş verilmesi tedarik zincirinde ani tepe noktaları oluşturur.
3. **Fiyat Dalgalanmaları & Promosyonlar:** Büyük indirimler müşterinin talebini öne çekerek yapay talep patlamaları yaratır.
4. **Kıtlık ve Rasyonlama Oyunu:** Ürün kıtlığı olduğunda distribütörlerin fazladan sipariş verip stok biriktirmesi.

### Nasıl Önlenir?
* **Bilgi Paylaşımı (EDI/API):** Tedarik zincirindeki tüm paydaşların gerçek zamanlı POS (satış noktası) verilerini paylaşması.
* **Sürekli Yenileme Programları (VMI):** Satıcı Yönetimli Envanter (Vendor Managed Inventory) ile tedarikçinin mağaza stoklarını doğrudan izlemesi.
* **Küçük Sipariş Miktarları:** Sipariş ve kurulum maliyetlerini düşürerek daha sık ve az miktarda sipariş geçmek.`
  },
  {
    tag: 'Mağaza Yönetimi',
    q: 'ABC ve XYZ Analizi Birlikte Nasıl Kullanılır?',
    a: `**ABC - XYZ Matrisi**, envanter yönetiminde ürünleri hem ciro katkılarına (ABC) hem de talep tahmin edilebilirliğine (XYZ) göre sınıflandıran 9 kutulu güçlü bir mühendislik matrisidir.

### Sınıflandırma Mantığı:
* **A Grubu:** Toplam cironun %70-80'ini oluşturan, en değerli %10-20 ürün. (Sıkı kontrol gerektirir)
* **B Grubu:** Toplam cironun %15-20'sini oluşturan orta düzey %30 ürün.
* **C Grubu:** Cironun sadece %5-10'unu oluşturan ama ürün çeşidinin %50'sini kapsayan düşük değerli ürünler.
* **X Sınıfı:** Düzenli talebi olan, tahmin etmesi kolay (varyasyon katsayısı düşük).
* **Y Sınıfı:** Mevsimsel veya trende bağlı, orta düzeyde dalgalı talep.
* **Z Sınıfı:** Tamamen düzensiz, seyrek ve tahmin etmesi çok zor talep.

### Matris Stratejisi:
1. **AX Ürünleri:** En kıymetli ve düzenli ürünlerdir. Stok seviyeleri otomatik sipariş (JIT) ile minimum emniyet stokuyla yönetilebilir.
2. **AZ Ürünleri:** Yüksek değerli ancak çok düzensizdir. Yüksek emniyet stoku gerektirir, sıkı takip edilmelidir.
3. **CX Ürünleri:** Düşük değerli ve düzenli. Büyük partiler halinde sipariş verilebilir, izleme maliyeti düşük tutulur.`
  }
];

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: 'Merhaba! Ben Perakende Kariyer Akademisi Yapay Zeka Danışmanıyım. Perakende analitiği, stok optimizasyonu, yöneylem araştırması veya mağaza operasyonları konularında sorularınızı yanıtlamaya hazırım. Sol taraftaki hazır konuları seçebilir veya sorunuzu aşağıya yazabilirsiniz.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let botResponse = "Üzgünüm, bu konuda henüz detaylı bilgiye sahip değilim. Lütfen hazır sorulardan birini seçerek başlayın veya perakende matematiği ile ilgili başka bir soru sorun.";
      
      const matchedQuestion = SUGGESTED_QUESTIONS.find(
        (sq) => sq.q.toLowerCase().includes(textToSend.toLowerCase()) || 
                textToSend.toLowerCase().includes(sq.q.toLowerCase())
      );

      if (matchedQuestion) {
        botResponse = matchedQuestion.a;
      } else if (textToSend.toLowerCase().includes('marj') || textToSend.toLowerCase().includes('karlılık')) {
        botResponse = `**Brüt Kar Marjı**, satış gelirinden satılan malın maliyeti düşüldükten sonra kalan tutarın satış gelirine oranıdır. 
        
$$Marj = \\frac{\\text{Satış Fiyatı} - \\text{Maliyet}}{\\text{Satış Fiyatı}} \\times 100$$

Örneğin, 100 TL'ye satılan bir ürünün maliyeti 60 TL ise, marjınız **%40**'tır.
Perakendede marj takibi şube ve kategori bazında sürekli izlenmesi gereken en kritik KPI'dır.`;
      } else if (textToSend.toLowerCase().includes('stok devir') || textToSend.toLowerCase().includes('envanter devir')) {
        botResponse = `**Stok Devir Hızı (Inventory Turnover)**, stoğun belirli bir dönemde kaç kez satılıp yenilendiğini gösteren orandır.
        
$$Stok Devir Hizi = \\frac{\\text{Satilan Malin Maliyeti (SMM)}}{\\text{Ortalama Stok Degeri}}$$

Yüksek stok devir hızı sermaye verimliliğini gösterirken, düşük olması rafta bekleyen ve nakit bağlayan atıl stoğa işaret eder.`;
      }

      const botMsg: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-150 overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[600px]">
      {/* Suggestions Sidebar (Left) */}
      <div className="md:col-span-4 bg-gray-50 border-r border-gray-150 p-4 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
            <Sparkles className="h-5 w-5 text-turquoise-accent" />
            <h3 className="font-display font-bold text-xs text-primary-navy uppercase tracking-wider">
              Hazır Konular
            </h3>
          </div>
          <p className="text-[11px] text-secondary-text font-light leading-relaxed">
            Hızlı öğrenmek için aşağıdaki konulardan birini seçebilirsiniz:
          </p>
          <div className="space-y-2">
            {SUGGESTED_QUESTIONS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item.q)}
                className="w-full text-left p-3 rounded-lg border border-gray-200 bg-white hover:bg-light-blue/20 hover:border-corporate-blue/30 text-xs transition-colors flex items-start space-x-2 cursor-pointer group"
              >
                <BookOpen className="h-4 w-4 text-corporate-blue shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-bold text-corporate-blue block mb-0.5">
                    {item.tag}
                  </span>
                  <span className="font-semibold text-primary-navy group-hover:text-corporate-blue transition-colors line-clamp-2">
                    {item.q}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 bg-corporate-blue/5 border border-corporate-blue/15 rounded-lg mt-4">
          <div className="flex items-center space-x-1.5 text-corporate-blue text-[11px] font-bold">
            <GraduationCap className="h-4 w-4" />
            <span>Mühendislik Kütüphanesi</span>
          </div>
          <p className="text-[10px] text-gray-500 mt-1 font-light leading-relaxed">
            LaTeX biçimindeki formüller ve grafikler otomatik olarak derlenir ve açıklanır.
          </p>
        </div>
      </div>

      {/* Chat Window (Right) */}
      <div className="md:col-span-8 flex flex-col justify-between h-full bg-white">
        {/* Chat Messages */}
        <div className="grow p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 max-w-[85%] ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-white shadow-sm ${
                  isBot ? 'bg-primary-navy' : 'bg-corporate-blue'
                }`}>
                  {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>

                {/* Message Body */}
                <div className="space-y-1">
                  <div className={`p-4 rounded-xl text-xs leading-relaxed ${
                    isBot 
                      ? 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-150' 
                      : 'bg-corporate-blue text-white rounded-tr-none'
                  }`}>
                    {/* Simplified markdown formatter for demo purposes */}
                    <div className="whitespace-pre-line prose prose-sm max-w-none">
                      {msg.text}
                    </div>
                  </div>
                  <span className={`text-[9px] text-gray-400 block px-1 ${!isBot && 'text-right'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-start gap-3 max-w-[85%] mr-auto">
              <div className="h-8 w-8 rounded-full bg-primary-navy flex items-center justify-center shrink-0 text-white shadow-sm">
                <Bot className="h-4 w-4 animate-bounce" />
              </div>
              <div className="p-4 bg-gray-100 border border-gray-150 rounded-xl rounded-tl-none">
                <span className="flex space-x-1.5 justify-center items-center py-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce duration-300" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-gray-150 bg-gray-50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputText);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Perakende metrikleri veya formülleri hakkında sorun..."
              className="grow px-4 py-3 bg-white border border-gray-250 rounded-lg text-xs focus:outline-none focus:border-corporate-blue"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-3 bg-corporate-blue hover:bg-corporate-blue/90 text-white rounded-lg transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
