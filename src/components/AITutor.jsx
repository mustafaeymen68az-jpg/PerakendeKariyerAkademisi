import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BookOpen, GraduationCap, CheckCircle } from 'lucide-react';

const SUGGESTED_QUESTIONS = [
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

export default function AITutor() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Merhaba! Ben Perakende Kariyer Akademisi Yapay Zeka Danışmanıyım. Perakende analitiği, stok optimizasyonu, yöneylem araştırması veya mağaza operasyonları konularında sorularınızı yanıtlamaya hazırım. Sol taraftaki hazır konuları seçebilir veya sorunuzu aşağıya yazabilirsiniz.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      // Find matches in FAQ
      const matched = SUGGESTED_QUESTIONS.find(
        (sq) => sq.q.toLowerCase().includes(textToSend.toLowerCase()) || 
                textToSend.toLowerCase().includes(sq.q.toLowerCase())
      );

      let responseText = '';
      if (matched) {
        responseText = matched.a;
      } else {
        // Fallback dynamic responses depending on keywords
        const query = textToSend.toLowerCase();
        if (query.includes('kpi') || query.includes('metrik') || query.includes('indikatör')) {
          responseText = `Perakendede kullanılan temel KPI'lar (Anahtar Performans Göstergeleri) üç ana başlıkta incelenir:
1. **Finansal Performans:** Brüt Kar Marjı, GMROI (Stok Yatırım Getirisi), Metrekare Verimliliği.
2. **Stok Performansı:** Stok Devir Hızı (Inventory Turnover Ratio), Günlük Stok Tutma Süresi (DOH - Days on Hand), Stoksuzluk Oranı (Out-of-Stock).
3. **Müşteri İlişkileri:** Sepet Dönüşüm Oranı (Conversion Rate), Ortalama Sepet Değeri (ATV), Mağaza Trafiği (Store Footfall).

Hangi KPI hakkında detaylı bilgi ve formül hesaplaması istersiniz?`;
        } else if (query.includes('eoq') || query.includes('sipariş miktarı')) {
          responseText = `**Ekonomik Sipariş Miktarı (EOQ - Economic Order Quantity)**, toplam envanter maliyetlerini (sipariş açma maliyeti + stok bulundurma maliyeti) minimize eden en uygun sipariş hacmidir.

Formül:
$$EOQ = \\sqrt{\\frac{2DS}{H}}$$
* **D**: Yıllık talep miktarı (adet)
* **S**: Sipariş verme maliyeti (sipariş başına sabit maliyet)
* **H**: Birim ürünün yıllık stok bulundurma maliyeti ($/adet.yıl)

Bu model, talebin sabit ve tedarik süresinin sıfır veya sabit olduğu durumlarda mükemmel çalışır.`;
        } else if (query.includes('merhaba') || query.includes('selam')) {
          responseText = `Tekrar merhaba! Perakende Mühendisliği ile ilgili hangi konuda araştırmalar yapıyorsunuz bugün? Size;
* Stok Kontrol Yöntemleri
* Perakende Finansal Formülleri
* Tedarik Zinciri Rotalama Problemleri
konularında teknik makaleler sunabilirim.`;
        } else {
          responseText = `Sorduğunuz soru çok değerli: "${textToSend}".
Perakende Mühendisliği metodolojisinde bu durum, operasyonel verimlilik ve veri entegrasyonu katmanı ile doğrudan ilişkilidir.

Akademimiz bünyesinde yer alan **"Perakende Analitiği"** veya **"Stok Optimizasyonu"** eğitimlerimizde bu konuları gerçek mağaza POS verileri ve optimizasyon kütüphaneleriyle uygulamalı olarak işliyoruz. Sorduğunuz bu özel konu hakkında detaylı bir çalışma hazırlamamı ister misiniz?`;
        }
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  // Helper to convert markdown-like syntax to React JSX elements for beautiful rendering
  const renderFormattedText = (text) => {
    return text.split('\n').map((line, idx) => {
      // Bold Markdown headers `### text`
      if (line.startsWith('### ')) {
        return <h4 key={idx} style={{ color: 'var(--color-success)', marginTop: '1rem', marginBottom: '0.5rem', fontSize: '1.05rem', fontFamily: 'var(--font-display)' }}>{line.replace('### ', '')}</h4>;
      }
      // Bold list labels or items `**text**` and code formatting `$$text$$`
      let formattedLine = line;
      
      // Handle simple math formatting $$expression$$
      if (line.includes('$$')) {
        const parts = line.split('$$');
        return (
          <div key={idx} style={{ background: 'rgba(0,0,0,0.15)', padding: '0.75rem', borderRadius: '6px', margin: '0.75rem 0', fontFamily: 'Courier New, monospace', fontSize: '1rem', color: '#6ee7b7', borderLeft: '3px solid var(--color-success)', overflowX: 'auto' }}>
            {parts[1].replace(/\\text\{([^}]+)\}/g, '$1').replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)').replace(/\\times/g, 'x').replace(/\\%/g, '%').replace(/\\cdot/g, '·').replace(/\^2/g, '²').replace(/\\sqrt\{([^}]+)\}/g, '√($1)')}
          </div>
        );
      }

      // Convert inline formatting like **text**
      const boldRegex = /\*\*([^*]+)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        // text before bold
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        // bold text
        parts.push(<strong key={match.index} style={{ color: '#fff', fontWeight: '600' }}>{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      if (line.startsWith('* ') || line.startsWith('- ')) {
        return (
          <li key={idx} style={{ marginLeft: '1.25rem', marginBottom: '0.25rem', listStyleType: 'square', color: 'var(--text-secondary)' }}>
            {parts.length > 0 ? parts : line.substring(2)}
          </li>
        );
      }

      // Default line rendering
      return (
        <p key={idx} style={{ marginBottom: '0.5rem', minHeight: line.trim() === '' ? '0.75rem' : 'auto' }}>
          {parts.length > 0 ? parts : line}
        </p>
      );
    });
  };

  return (
    <div style={{ animation: 'fadeInUp 0.6s ease' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(90deg, #fff 0%, var(--text-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
          Akademik Yapay Zeka Eğitmeni
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Perakende mühendisliğine dair formüller, teoremler, yöneylem teorileri ve sektörel senaryoları anında danışın.
        </p>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'stretch' }}>
        {/* Responsive Grid for screens */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          {/* Main Layout containing side menu and chat on large screens, stacked on small */}
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1.5rem', minHeight: '550px' }}>
            
            {/* Left Box: FAQs list */}
            <div className="glass-card" style={{ flex: '1 1 250px', background: 'var(--bg-secondary)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={16} style={{ color: 'var(--color-accent)' }} /> Hızlı Başvuru Konuları
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Hazır analiz ve formül kılavuzlarına tek tıklamayla ulaşın:</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', flexGrow: 1 }}>
                {SUGGESTED_QUESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(item.q)}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--color-card-border)',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      color: 'var(--text-primary)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      e.currentTarget.style.borderColor = 'var(--color-card-border)';
                    }}
                  >
                    <span className="badge badge-indigo" style={{ fontSize: '0.65rem', marginBottom: '0.35rem', padding: '0.15rem 0.4rem' }}>{item.tag}</span>
                    <div style={{ fontSize: '0.85rem', fontWeight: '500', lineHeight: '1.3' }}>{item.q}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Box: Chat Interface */}
            <div className="glass-card" style={{ flex: '2 1 450px', background: 'var(--bg-secondary)', padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '550px' }}>
              {/* Active Chat Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: 'linear-gradient(135deg, var(--color-accent) 0%, #8b5cf6 100%)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <Bot size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    Yapay Zeka Asistanı <Sparkles size={14} style={{ color: 'var(--color-success)' }} />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ width: '6px', height: '6px', background: 'var(--color-success)', borderRadius: '50%', display: 'inline-block' }} /> Çevrimiçi | Mühendislik Modülü
                  </div>
                </div>
              </div>

              {/* Chat Message Logs */}
              <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem', marginBottom: '1rem' }}>
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    style={{ 
                      display: 'flex', 
                      gap: '0.75rem', 
                      flexDirection: msg.sender === 'bot' ? 'row' : 'row-reverse',
                      alignItems: 'start'
                    }}
                  >
                    {/* Avatar */}
                    <div style={{ 
                      background: msg.sender === 'bot' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      border: msg.sender === 'bot' ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: msg.sender === 'bot' ? 'var(--color-accent)' : 'var(--color-success)',
                      flexShrink: 0
                    }}>
                      {msg.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                    </div>

                    {/* Speech bubble */}
                    <div style={{ 
                      maxWidth: '80%', 
                      background: msg.sender === 'bot' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(99, 102, 241, 0.12)',
                      border: msg.sender === 'bot' ? '1px solid var(--color-card-border)' : '1px solid rgba(99, 102, 241, 0.25)',
                      borderRadius: msg.sender === 'bot' ? '0 12px 12px 12px' : '12px 0 12px 12px',
                      padding: '0.85rem 1.1rem',
                      fontSize: '0.9rem',
                      color: msg.sender === 'bot' ? 'var(--text-secondary)' : '#fff'
                    }}>
                      <div style={{ wordBreak: 'break-word', lineHeight: '1.5' }}>
                        {msg.sender === 'bot' ? renderFormattedText(msg.text) : msg.text}
                      </div>
                      <span style={{ display: 'block', textAlign: 'right', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(99, 102, 241, 0.15)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
                      <Bot size={16} />
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--color-card-border)', borderRadius: '0 12px 12px 12px', padding: '0.75rem 1rem', display: 'flex', gap: '0.25rem' }}>
                      <span className="dot-typing" style={{ width: '6px', height: '6px', background: 'var(--text-secondary)', borderRadius: '50%', animation: 'glowPulse 1s infinite alternate' }} />
                      <span className="dot-typing" style={{ width: '6px', height: '6px', background: 'var(--text-secondary)', borderRadius: '50%', animation: 'glowPulse 1s infinite alternate 0.2s' }} />
                      <span className="dot-typing" style={{ width: '6px', height: '6px', background: 'var(--text-secondary)', borderRadius: '50%', animation: 'glowPulse 1s infinite alternate 0.4s' }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input panel */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputText);
                }}
                style={{ 
                  display: 'flex', 
                  gap: '0.75rem', 
                  borderTop: '1px solid var(--color-card-border)', 
                  paddingTop: '1rem',
                  marginTop: 'auto'
                }}
              >
                <input
                  type="text"
                  placeholder="Perakende analitiği veya formüller hakkında soru sorun..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  style={{
                    flexGrow: 1,
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--color-card-border)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.9rem',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--color-card-border)'}
                />
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ padding: '0.75rem', borderRadius: '8px', width: '42px', height: '42px', justifyContent: 'center' }}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
