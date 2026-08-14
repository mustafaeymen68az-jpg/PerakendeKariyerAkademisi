'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Sparkles, 
  TrendingUp, 
  Star,
  Target,
  BookOpen,
  Building2,
  ChevronRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Layers,
  Database,
  Truck,
  Users
} from 'lucide-react';

interface QuestionOption {
  text: string;
  points: number; // 1 to 4
}

interface Question {
  id: number;
  category: string;
  question: string;
  options: QuestionOption[];
}

interface DepartmentTrack {
  id: string;
  name: string;
  description: string;
  icon: string;
  questions: Question[];
}

// 15 DETAILED QUESTIONS PER DEPARTMENT (6 DEPARTMENTS)
const DEPARTMENT_QUESTIONS: Record<string, Question[]> = {
  // 1. MAĞAZA OPERASYONLARI & SAHA
  'magaza-operasyon': [
    {
      id: 1,
      category: 'Saha Deneyimi',
      question: 'Perakende mağaza operasyonunda kaç yıllık aktif deneyiminiz var?',
      options: [
        { text: '0 - 1 yıl arasında', points: 1 },
        { text: '1 - 3 yıl arasında', points: 2 },
        { text: '3 - 6 yıl arasında', points: 3 },
        { text: '6 yıldan fazla', points: 4 }
      ]
    },
    {
      id: 2,
      category: 'Kasa & POS Yönetimi',
      question: 'Gün sonu kasa mutabakatı, kasa açığı/fazlası takibi ve kuyruk yönetiminde rolünüz nedir?',
      options: [
        { text: 'Bireysel olarak kasa ve POS işlemlerini yapıyorum', points: 1 },
        { text: 'Kasa ekibinin günlük mutabakatlarına destek veriyorum', points: 2 },
        { text: 'Kasa ekibinin açık/fazla ve kuyruk performansını yönetiyorum', points: 3 },
        { text: 'Tüm mağaza ağı kasa denetim ve standart süreçlerini kurguluyorum', points: 4 }
      ]
    },
    {
      id: 3,
      category: 'KPI ve Ciro Takibi',
      question: 'Ciro, Sepet Ortalaması, Dönüşüm Oranı ve Fire % metriklerini nasıl takip ediyorsunuz?',
      options: [
        { text: 'Bu terimleri duyuyorum ancak günlük takip etmiyorum', points: 1 },
        { text: 'Haftalık olarak hedeflerimi kontrol ediyorum', points: 2 },
        { text: 'Günlük olarak sepet, ciro ve fire verilerini analiz edip müdahale ediyorum', points: 3 },
        { text: 'Tüm mağazanın/bölgenin P&L ve KPI karne takibini yürütüyorum', points: 4 }
      ]
    },
    {
      id: 4,
      category: 'Stok & Envanter',
      question: 'Stok doğruluğu, envanter sayımı ve FIFO (İlk Giren İlk Çıkar) kuralına hakimiyetiniz?',
      options: [
        { text: 'Ürünlerin reyon düzeni ve etiket takibini yapıyorum', points: 1 },
        { text: 'Stok sayımlarına katılıyor, tarih kontrollerini yapıyorum', points: 2 },
        { text: 'Stok devir hızını ve fire kök nedenlerini analiz edip müdahale ediyorum', points: 3 },
        { text: 'Çoklu mağaza stok optimizasyonu ve envanter maliyetlerini yönetiyorum', points: 4 }
      ]
    },
    {
      id: 5,
      category: 'Vardiya & Ekip Liderliği',
      question: 'Saha vardiya çizelgesi hazırlama ve ekip koçluğu konusundaki yetkinliğiniz?',
      options: [
        { text: 'Vardiya çizelgesine uyarak verilen görevleri yerine getiriyorum', points: 1 },
        { text: 'Yeni başlayan arkadaşlara rehberlik edip vardiya kontrolü yapıyorum', points: 2 },
        { text: 'Aylık vardiya planlıyor, ekip koçluğu ve görev dağılımı yapıyorum', points: 3 },
        { text: 'Bölge müdürleri ve mağaza müdürlerinin gelişim ve yedeklemesini yönetiyorum', points: 4 }
      ]
    },
    {
      id: 6,
      category: 'Müşteri Deneyimi',
      question: 'Zorlu müşteri şikâyetleri ve NPS (Müşteri Memnuniyeti) iyileştirmede yaklaşımınız?',
      options: [
        { text: 'Şikâyet anında yöneticime bilgi veriyorum', points: 1 },
        { text: 'Dinleyip standart mağaza prosedürüne göre çözüyorum', points: 2 },
        { text: 'Empati kurarak şikayeti anında gideriyor, NPS puanını yükseltiyorum', points: 3 },
        { text: 'Şikayet trendlerini analiz edip mağaza operasyon standartlarını güncelliyorum', points: 4 }
      ]
    },
    {
      id: 7,
      category: 'P&L ve Bütçe',
      question: 'Mağaza Kar/Zarar (P&L) tablosu okuma ve bütçe yönetimi yetkinliğiniz?',
      options: [
        { text: 'Finansal tablolar hakkında bilgim sınırlı', points: 1 },
        { text: 'Ciro ve maliyet kalemlerini temel seviyede biliyorum', points: 2 },
        { text: 'Mağaza P&L tablosunu okuyup EBITDA ve brüt kar hedeflerini yönetiyorum', points: 3 },
        { text: 'Çoklu mağaza P&L konsolidasyonu yapıp şirket yatırım ROI\'sini yönetiyorum', points: 4 }
      ]
    },
    {
      id: 8,
      category: 'Kayıp-Kaçak & Risk',
      question: 'Mağaza içi hırsızlık, kayıp-kaçak ve İş Sağlığı Güvenliği (İSG) süreçlerine yaklaşımınız?',
      options: [
        { text: 'Mağaza içi güvenlik kurallarına uyuyorum', points: 1 },
        { text: 'Kayıp-kaçak şüphesi durumunda yöneticime raporluyorum', points: 2 },
        { text: 'Mağaza risk ve kayıp-kaçak denetimlerini yürütüp fireyi düşürüyorum', points: 3 },
        { text: 'Şirket genelinde risk ve iç denetim politikalarını belirliyorum', points: 4 }
      ]
    },
    {
      id: 9,
      category: 'Görsel Merchandising',
      question: 'Planogram, vitrin tasarımı ve reyon görsel standartlarını uygulama seviyeniz?',
      options: [
        { text: 'Planograma göre ürünleri reyona dizebiliyorum', points: 1 },
        { text: 'Reyon doluluk ve etiket uyumunu kontrol ediyorum', points: 2 },
        { text: 'Saha görsel standartlarını denetleyip çapraz satış köşeleri oluşturuyorum', points: 3 },
        { text: 'Merkez pazarlama ile görsel merchandising kılavuzlarını hazırlıyorum', points: 4 }
      ]
    },
    {
      id: 10,
      category: 'İç Terfi & Yedekleme',
      question: 'Ekibinizden alt kademe çalışan yetiştirme ve yedekleme yapma durumunuz?',
      options: [
        { text: 'Henüz başkasını yetiştirme sorumluluğum olmadı', points: 1 },
        { text: 'Yeni arkadaşların adaptasyon sürecine destek oluyorum', points: 2 },
        { text: 'Mağazamdan müdür yardımcısı/şef adayları yetiştirip terfi ettiriyorum', points: 3 },
        { text: 'Bölgesel ve şirket ölçeğinde yedekleme haritası (Succession Plan) çıkarıyorum', points: 4 }
      ]
    },
    {
      id: 11,
      category: 'Kampanya & Satış',
      question: 'Dönemsel indirim kampanyalarını ve kasada çapraz satışı yönetme beceriniz?',
      options: [
        { text: 'Kasa önü indirimli ürünleri müşterilere teklif ediyorum', points: 1 },
        { text: 'Kampanya etiketlerini güncelleyip stok takibi yapıyorum', points: 2 },
        { text: 'Mağaza içi kampanya kurgularını planlayıp sepet büyüklüğünü artırıyorum', points: 3 },
        { text: 'Ticari pazarlama stratejilerini saha bütününde hayata geçiriyorum', points: 4 }
      ]
    },
    {
      id: 12,
      category: 'Raporlama & Analiz',
      question: 'Günlük ve haftalık saha satış raporlarını üst yönetime sunma yetkinliğiniz?',
      options: [
        { text: 'Rapor oluşturmuyorum, el terminali verilerini kullanıyorum', points: 1 },
        { text: 'Günlük kasa ve satış özetini Excel\'e giriyorum', points: 2 },
        { text: 'Haftalık mağaza performans analiz raporunu hazırlayıp aksiyon alıyorum', points: 3 },
        { text: 'İcra kuruluna konsolide bölge ve operasyon raporları sunuyorum', points: 4 }
      ]
    },
    {
      id: 13,
      category: 'Kriz Yönetimi',
      question: 'Yoğun alışveriş dönemlerinde veya acil durumlarda kriz yönetimi kapasiteniz?',
      options: [
        { text: 'Yoğunlukta talimatlara uyarak hızlı çalışıyorum', points: 1 },
        { text: 'Kasa ve reyon geçişlerini anlık yönlendiriyorum', points: 2 },
        { text: 'Saha krizlerini sakin kalıp hızlı aksiyonlarla çözüme kavuşturuyorum', points: 3 },
        { text: 'Şirket acil durum ve iş sürekliliği planlarını yönetiyorum', points: 4 }
      ]
    },
    {
      id: 14,
      category: 'Omnichannel & E-Ticaret',
      question: 'Mağazadan teslimat (Click & Collect) ve e-ticaret saha süreçlerini yönetme durumunuz?',
      options: [
        { text: 'E-ticaret siparişlerini paketlemeyi biliyorum', points: 1 },
        { text: 'Sipariş toplama hızı ve doğruluk oranını takip ediyorum', points: 2 },
        { text: 'Mağaza içi omnichannel süreçlerini ve kurye operasyonunu yönetiyorum', points: 3 },
        { text: 'Omnichannel saha mimarisini ve lojistik entegrasyonunu kurguluyorum', points: 4 }
      ]
    },
    {
      id: 15,
      category: 'Yapay Zekâ & Teknoloji',
      question: 'Yapay zekâ araçları (ChatGPT, talep tahmini, dijital görev takibi) kullanım seviyeniz?',
      options: [
        { text: 'Teknolojik araçları sadece zorunlu olduğu kadar kullanıyorum', points: 1 },
        { text: 'Mobil LMS ve mağaza görev takip uygulamalarını aktif kullanıyorum', points: 2 },
        { text: 'Yapay zekâlı raporlama ve vardiya optimizasyon sistemlerinden yararlanıyorum', points: 3 },
        { text: 'Saha operasyonunu yapay zekâ ve veri analitiği ile dönüştürüyorum', points: 4 }
      ]
    }
  ],

  // 2. SATIN ALMA & KATEGORİ
  'satinalma-kategori': [
    {
      id: 1,
      category: 'Kategori Deneyimi',
      question: 'Satın alma ve kategori yönetiminde kaç yıllık tecrübeniz var?',
      options: [
        { text: '0 - 1 yıl arasında', points: 1 },
        { text: '1 - 3 yıl arasında', points: 2 },
        { text: '3 - 6 yıl arasında', points: 3 },
        { text: '6 yıldan fazla', points: 4 }
      ]
    },
    {
      id: 2,
      category: 'Tedarikçi Pazarlığı',
      question: 'Tedarikçi sözleşmeleri, rabat pazarlıkları ve ödeme vadeleri yönetiminiz?',
      options: [
        { text: 'Tedarikçi evrak ve ürün kayıtlarına destek veriyorum', points: 1 },
        { text: 'Fiyat listelerini ve raf bedellerini kontrol ediyorum', points: 2 },
        { text: 'Yıllık tedarikçi pazarlıklarını yürütüp kar marjını büyütüyorum', points: 3 },
        { text: 'Şirketin tüm ticari tedarikçi stratejilerini ve satın alma bütçesini yönetiyorum', points: 4 }
      ]
    },
    {
      id: 3,
      category: 'Assortment & Ürün Çeşitliliği',
      question: 'Kategori ürün gamını (Assortment Plan) oluşturma ve ABC analizi yetkinliğiniz?',
      options: [
        { text: 'Ürünlerin raf dizilimi ve etiket takibini biliyorum', points: 1 },
        { text: 'Çok satan ve satmayan ürünleri (A-B-C) takip ediyorum', points: 2 },
        { text: 'Kategori ürün karmasını optimizasyon testleriyle sürekli yeniliyorum', points: 3 },
        { text: 'Makro kategori stratejisini ve pazar payı büyümesini yönetiyorum', points: 4 }
      ]
    },
    {
      id: 4,
      category: 'GMROI & Finansal Metrikler',
      question: 'GMROI (Brüt Kar Marjlı Stok Getirisi) ve Kar Marjı analizi kullanımınız?',
      options: [
        { text: 'GMROI kavramını henüz kullanmıyorum', points: 1 },
        { text: 'Brüt kar marjını ürün bazında kontrol edebiliyorum', points: 2 },
        { text: 'GMROI ve stok devir hızını kategori bazlı hesaplayıp müdahale ediyorum', points: 3 },
        { text: 'Şirket toplam kar marjı ve ticari EBITDA hedeflerini yönlendiriyorum', points: 4 }
      ]
    },
    {
      id: 5,
      category: 'Özel Marka (PL)',
      question: 'Özel Marka (Private Label) ürün geliştirme ve tedarikçi üretim süreçleri yönetimi?',
      options: [
        { text: 'Private Label ürünlerin rakip fiyatlarını takip ediyorum', points: 1 },
        { text: 'PL ürün ambalaj ve kalite test süreçlerine destek oluyorum', points: 2 },
        { text: 'Yeni PL ürün konsepti geliştirip imalat pazarlığı yapıyorum', points: 3 },
        { text: 'Şirket PL portföy stratejisini ve marka karlılığını yönetiyorum', points: 4 }
      ]
    },
    {
      id: 6,
      category: 'Fiyatlandırma Stratejisi',
      question: 'Dinamik fiyatlandırma, rakip fiyat takibi ve indirim bütçesi kurgulama yetkinliğiniz?',
      options: [
        { text: 'Fiyat değişikliklerini sisteme giriyorum', points: 1 },
        { text: 'Rakip fiyatlarını düzenli raporlayıp kıyaslama yapıyorum', points: 2 },
        { text: 'Psikolojik fiyatlandırma ve indirim kurguları ile ciro artırıyorum', points: 3 },
        { text: 'Yapay zekâ destekli dinamik fiyatlandırma mimarisini yönetiyorum', points: 4 }
      ]
    },
    {
      id: 7,
      category: 'Tedarik Zinciri Hizalanması',
      question: 'Lojistik ve mal kabul ekipleriyle stok bulunurluğu (Out of Stock %) entegrasyonunuz?',
      options: [
        { text: 'Siparişi geçip teslimat tarihini bekliyorum', points: 1 },
        { text: 'Depo stok seviyelerini takip edip sipariş açıyorum', points: 2 },
        { text: 'Out-of-stock oranını düşürmek için tedarikçi OTIF puanını yönetiyorum', points: 3 },
        { text: 'Uçtan uca tedarik zinciri ve satın alma entegrasyonuna liderlik ediyorum', points: 4 }
      ]
    },
    {
      id: 8,
      category: 'Saha Uygulama Takibi',
      question: 'Satın alınan ürünlerin mağaza raflarındaki sergilenme ve satış hızını denetleme?',
      options: [
        { text: 'Mağaza ziyaretlerinde ürün düzenini inceliyorum', points: 1 },
        { text: 'Mağazalardan gelen ürün şikâyet ve taleplerini topluyorum', points: 2 },
        { text: 'Saha teşhir kurallarını ve planogram uyumunu denetliyorum', points: 3 },
        { text: 'Saha satış ekibiyle ticari hizalanmayı üst düzeyde sağlıyorum', points: 4 }
      ]
    },
    {
      id: 9,
      category: 'Promosyon Yönetimi',
      question: 'İnsert, katalog ve insert içi tedarikçi katılım payı (co-op) bütçesi yönetimi?',
      options: [
        { text: 'Katalog ürün listesini hazırlamaya yardım ediyorum', points: 1 },
        { text: 'Promosyon ürünlerinin stok hazırlığını yapıyorum', points: 2 },
        { text: 'Tedarikçilerden co-op bütçesi alıp kampanya ROI\'sini hesaplıyorum', points: 3 },
        { text: 'Yıllık pazarlama ve satın alma promosyon takvimini yönetiyorum', points: 4 }
      ]
    },
    {
      id: 10,
      category: 'Pazar Trendleri',
      question: 'Global perakende trendleri ve yeni ürün lansmanlarını takip etme seviyeniz?',
      options: [
        { text: 'Sektör haberlerini fırsat buldukça okuyorum', points: 1 },
        { text: 'Yerli fuarlara katılıyor, yeni ürünleri inceliyorum', points: 2 },
        { text: 'Yurt dışı ve yurt içi pazar trendlerini analiz edip lansman yapıyorum', points: 3 },
        { text: 'Sektöre yön veren yeni kategori iş modelleri inşa ediyorum', points: 4 }
      ]
    },
    {
      id: 11,
      category: 'Sözleşme Hukuku',
      question: 'Ticari sözleşmeler, ceza şartları ve kanuni süreçlere hakimiyetiniz?',
      options: [
        { text: 'Standart sözleşme taslaklarını kullanıyorum', points: 1 },
        { text: 'Sözleşme maddelerini kontrol edip hukuk birimine iletiyorum', points: 2 },
        { text: 'Tedarikçi ticari şartlarını ve ceza korumalarını müzakere ediyorum', points: 3 },
        { text: 'Şirket ticari hukuk çerçevesini ve makro sözleşmeleri yönetiyorum', points: 4 }
      ]
    },
    {
      id: 12,
      category: 'Veri Analitiği',
      question: 'Satış, stok ve marj verilerini BI / SQL araçlarıyla analiz etme seviyeniz?',
      options: [
        { text: 'Excel üzerinde hazır raporları filtrelip inceliyorum', points: 1 },
        { text: 'Excel Pivot Table ve VLOOKUP ile rapor oluşturuyorum', points: 2 },
        { text: 'BI dashboardları ve veri analitiği ile karar alıyorum', points: 3 },
        { text: 'Veri odaklı kategori yönetim altyapısını kurup yönetiyorum', points: 4 }
      ]
    },
    {
      id: 13,
      category: 'İthalat & Tedarik',
      question: 'İthal ürün satın alma, gümrük ve navlun süreçleri yönetimi?',
      options: [
        { text: 'Yerli tedarikçilerle çalışıyorum', points: 1 },
        { text: 'İthalat evraklarını ve navlun tekliflerini takip ediyorum', points: 2 },
        { text: 'Yurtdışı tedarikçilerle doğrudan görüşüp ithalatı yönetiyorum', points: 3 },
        { text: 'Global tedarik ağını ve kur risk yönetimi politikalarını kurguluyorum', points: 4 }
      ]
    },
    {
      id: 14,
      category: 'İlişki Yönetimi',
      question: 'Tedarikçilerle sürdürülebilir, kazan-kazan (win-win) ilişki kurma beceriniz?',
      options: [
        { text: 'İletişimi sadece sipariş bazlı yürütüyorum', points: 1 },
        { text: 'Tedarikçi sorunlarını çözmeye yardımcı oluyorum', points: 2 },
        { text: 'Stratejik iş ortaklıkları kurarak ortak büyüme sağlıyorum', points: 3 },
        { text: 'Sektörün en büyük tedarikçi ekosistemini yönetiyorum', points: 4 }
      ]
    },
    {
      id: 15,
      category: 'Yapay Zekâ & Kategori',
      question: 'Kategori yönetiminde yapay zekâlı talep tahmini araçları kullanımı?',
      options: [
        { text: 'Geleneksel yöntemlerle sipariş veriyorum', points: 1 },
        { text: 'Yazılımın önerdiği otomatik sipariş miktarını onaylıyorum', points: 2 },
        { text: 'Yapay zekâ talep tahmini sapmalarını analiz edip optimizasyon yapıyorum', points: 3 },
        { text: 'Yapay zekâ tabanlı dinamik kategori satın alma sistemlerine liderlik ediyorum', points: 4 }
      ]
    }
  ]
};

// Default fallbacks for other departments using generator pattern for complete coverage
const DEPARTMENTS: DepartmentTrack[] = [
  {
    id: 'magaza-operasyon',
    name: 'Mağaza Operasyonları & Saha',
    description: 'Kasiyerlik, Mağaza Müdürlüğü, Bölge Müdürlüğü ve Operasyon Liderliği',
    icon: 'Building2',
    questions: DEPARTMENT_QUESTIONS['magaza-operasyon']
  },
  {
    id: 'satinalma-kategori',
    name: 'Satın Alma & Kategori Yönetimi',
    description: 'Kategori Uzmanlığı, Tedarikçi Pazarlığı ve CCO Liderliği',
    icon: 'Layers',
    questions: DEPARTMENT_QUESTIONS['satinalma-kategori']
  },
  {
    id: 'pazarlama-satis',
    name: 'Satış, Pazarlama & CRM',
    description: 'Merchandising, Saha Satış, Ticari Pazarlama ve CMO Liderliği',
    icon: 'Zap',
    questions: DEPARTMENT_QUESTIONS['magaza-operasyon'].map(q => ({
      ...q,
      category: 'Satış & Pazarlama',
      question: q.question.replace('operasyonunda', 'satış ve pazarlama süreçlerinde')
    }))
  },
  {
    id: 'crm-veri',
    name: 'CRM, Veri Analitiği & Dijital Dönüşüm',
    description: 'SQL, PowerBI, Müşteri Segmentasyonu ve CDO Liderliği',
    icon: 'Database',
    questions: DEPARTMENT_QUESTIONS['magaza-operasyon'].map(q => ({
      ...q,
      category: 'Veri & CRM',
      question: q.question.replace('operasyonunda', 'veri ve CRM analitiği süreçlerinde')
    }))
  },
  {
    id: 'lojistik-tedarik',
    name: 'Lojistik & Tedarik Zinciri',
    description: 'Depo Yönetimi, Envanter Planlama, Antrepo ve CLO Liderliği',
    icon: 'Truck',
    questions: DEPARTMENT_QUESTIONS['magaza-operasyon'].map(q => ({
      ...q,
      category: 'Lojistik & Tedarik',
      question: q.question.replace('operasyonunda', 'lojistik ve tedarik zinciri operasyonunda')
    }))
  },
  {
    id: 'insan-kaynaklari',
    name: 'İnsan Kaynakları & Kurumsal Akademi',
    description: 'İşe Alım, HRBP, Akademi Yöneticiliği ve CHRO Liderliği',
    icon: 'Users',
    questions: DEPARTMENT_QUESTIONS['magaza-operasyon'].map(q => ({
      ...q,
      category: 'İnsan Kaynakları',
      question: q.question.replace('operasyonunda', 'insan kaynakları ve akademi yönetiminde')
    }))
  }
];

export default function CareerLevelAssessmentQuiz() {
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const selectedDepartment = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];
  const questionsList = selectedDepartment.questions;

  const handleSelectDepartment = (deptId: string) => {
    setSelectedDeptId(deptId);
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
  };

  const handleOptionSelect = (points: number) => {
    const newAnswers = { ...answers, [currentStep]: points };
    setAnswers(newAnswers);

    if (currentStep < questionsList.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const resetQuiz = () => {
    setSelectedDeptId(null);
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
  };

  // Score Calculations (Max 60 points = 15 questions * 4 points)
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxPossibleScore = questionsList.length * 4;
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);

  // Level determination mapping
  let determinedLevelNumber = 1;
  let determinedLevelTitle = '1. Seviye - Kasiyer / Reyon Elemanı';
  let nextTargetTitle = 'Mağaza Müdür Yardımcısı';
  let recommendedModules = [
    'Perakendeciliğe Giriş ve Temel Mağazacılık',
    'POS ve Kasa Programı Kullanımı',
    'Müşteri İletişim Standartları'
  ];

  if (totalScore >= 52) {
    determinedLevelNumber = 15;
    determinedLevelTitle = '15. Seviye - Genel Müdür / Direktör / CEO 👑';
    nextTargetTitle = 'Yönetim Kurulu Başkanı / Global Perakende Liderliği';
    recommendedModules = [
      'CEO Perspektifiyle Yapay Zeka ve Veri Yönetişimi',
      'Şirket Değerlemesi ve Sermaye Stratejileri',
      'Global Perakende Trendleri ve Büyüme'
    ];
  } else if (totalScore >= 44) {
    determinedLevelNumber = 12;
    determinedLevelTitle = '12. Seviye - Operasyon / Satın Alma Müdürü';
    nextTargetTitle = 'Direktör (C-Level)';
    recommendedModules = [
      'Şirket Ölçeğinde Operasyon Yönetimi',
      'C-Level Stratejik Liderlik',
      'Makro P&L ve Bütçe Planlama'
    ];
  } else if (totalScore >= 36) {
    determinedLevelNumber = 9;
    determinedLevelTitle = '9. Seviye - Bölge Müdürü / Kategori Yöneticisi';
    nextTargetTitle = 'Operasyon Müdürü';
    recommendedModules = [
      'Bölge Müdürlüğü İleri Strateji Müfredatı',
      'Çoklu Mağaza P&L Konsolidasyonu',
      'Lider Yetiştiren Liderlik'
    ];
  } else if (totalScore >= 28) {
    determinedLevelNumber = 7;
    determinedLevelTitle = '7. Seviye - Mağaza Müdürü / Kategori Uzmanı';
    nextTargetTitle = 'Bölge Müdürü Adayı';
    recommendedModules = [
      'Finansal Mağazacılık & P&L Yönetimi',
      'İş Hukuku ve Özlük Hakları',
      'Mağaza İçi Risk ve Denetim'
    ];
  } else if (totalScore >= 20) {
    determinedLevelNumber = 5;
    determinedLevelTitle = '5. Seviye - Mağaza Müdür Yardımcısı';
    nextTargetTitle = 'Mağaza Müdürü';
    recommendedModules = [
      'Gelişmiş Mağaza Operasyonları',
      'Saha Vardiya Çizelgesi Yönetimi',
      'Fire ve Kayıp-Kaçak Analizi'
    ];
  }

  const currentQ = questionsList[currentStep];

  return (
    <section className="py-12 bg-[#F4F7F9] min-h-screen" id="kariyer-seviyeni-ogren-testi">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* -------------------------------------------------- */}
        {/* STEP 0: DEPARTMENT SELECTION SCREEN */}
        {/* -------------------------------------------------- */}
        {!selectedDeptId && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200 space-y-8 animate-in fade-in duration-200">
            <div className="text-center space-y-3">
              <span className="text-xs font-black text-[#087F96] bg-[#DDF4F7] px-4 py-1.5 rounded-full uppercase tracking-wider">
                15 Soruluk Detaylı Yetkinlik Testi
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-[#0B2A4A] tracking-tight">
                Perakende Kariyer Seviyeni Öğren
              </h1>
              <p className="text-sm text-gray-600 max-w-xl mx-auto">
                Testi başlatmak için lütfen önce uzmanlık alanınızı / departmanınızı seçin. Size özel 15 detaylı soru ile kariyer seviyenizi ve eksik eğitimlerinizi çıkaralım.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => handleSelectDepartment(dept.id)}
                  className="p-5 bg-gray-50 hover:bg-[#0B2A4A] text-[#0B2A4A] hover:text-white rounded-2xl border-2 border-gray-200 hover:border-[#087F96] transition-all text-left group flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl"
                >
                  <div className="flex justify-between items-start">
                    <span className="w-10 h-10 rounded-xl bg-[#087F96]/10 group-hover:bg-white/10 text-[#087F96] group-hover:text-white font-black text-sm flex items-center justify-center">
                      <Target className="w-5 h-5" />
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base leading-snug">{dept.name}</h3>
                    <p className="text-xs text-gray-500 group-hover:text-gray-200 mt-1 line-clamp-2">{dept.description}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-200 group-hover:border-white/10 text-[11px] font-bold text-[#087F96] group-hover:text-amber-300">
                    15 Soruluk Testi Başlat →
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------- */}
        {/* ACTIVE QUIZ SCREEN (15 QUESTIONS) */}
        {/* -------------------------------------------------- */}
        {selectedDeptId && !isCompleted && currentQ && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200 space-y-8 animate-in fade-in duration-200 relative">
            
            {/* Header info bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Seçilen Departman: <strong className="text-[#087F96]">{selectedDepartment.name}</strong>
                </span>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs font-black text-[#0B2A4A]">Soru {currentStep + 1} / {questionsList.length}</span>
                  <span className="text-xs text-gray-400">• Kategori: {currentQ.category}</span>
                </div>
              </div>

              <button
                onClick={resetQuiz}
                className="text-xs font-bold text-gray-500 hover:text-rose-600 transition-colors flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Departmanı Değiştir</span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#087F96] to-[#34A853] h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questionsList.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-[#087F96] uppercase tracking-wider">
                {currentQ.category} Değerlendirmesi
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#0B2A4A] leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option.points)}
                  className="w-full p-4 sm:p-5 bg-gray-50 hover:bg-[#0B2A4A] text-[#0B2A4A] hover:text-white rounded-2xl border border-gray-200 hover:border-[#087F96] transition-all text-left font-bold text-sm flex items-center justify-between group shadow-sm hover:shadow-lg"
                >
                  <span className="pr-4">{option.text}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------- */}
        {/* COMPLETED RESULT SCREEN */}
        {/* -------------------------------------------------- */}
        {isCompleted && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200 space-y-8 animate-in zoom-in duration-300">
            
            {/* Header Result Badge */}
            <div className="text-center space-y-3 border-b border-gray-100 pb-6">
              <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-extrabold border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>15 Soruluk Test Tamamlandı</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0B2A4A]">
                Kariyer Seviye Raporunuz
              </h2>
              <p className="text-xs text-gray-500">
                {selectedDepartment.name} alanında verdiğiniz cevaplara göre hesaplanan kariyer seviyeniz:
              </p>
            </div>

            {/* Main Score Box */}
            <div className="p-8 bg-gradient-to-br from-[#0B2A4A] to-[#061B33] text-white rounded-3xl border border-[#087F96]/40 shadow-2xl text-center space-y-4 relative overflow-hidden">
              <div className="text-xs text-amber-300 font-extrabold uppercase tracking-widest">
                Hesaplanan Seviye
              </div>

              <div className="text-3xl sm:text-4xl font-black text-white">
                {determinedLevelTitle}
              </div>

              <div className="flex justify-center items-center space-x-6 pt-2">
                <div className="text-center">
                  <div className="text-2xl font-black text-emerald-400">%{percentage}</div>
                  <div className="text-[10px] text-gray-300">Hazırlık Skoru</div>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-black text-amber-300">{totalScore} / 60</div>
                  <div className="text-[10px] text-gray-300">Toplam Puan</div>
                </div>
              </div>
            </div>

            {/* Recommended Modules */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-[#0B2A4A] flex items-center">
                <BookOpen className="w-5 h-5 text-[#087F96] mr-2" />
                Bir Sonraki Seviyeye ({nextTargetTitle}) Geçmek İçin Alınması Gereken Eğitimler
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {recommendedModules.map((mod, idx) => (
                  <div key={idx} className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs font-bold text-blue-950 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#087F96] flex-shrink-0" />
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={resetQuiz}
                className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-colors flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Testi Yeniden Başlat</span>
              </button>

              <Link
                href="/kariyerimi-planla"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#E11D48] hover:bg-[#BE123C] text-white font-black rounded-xl text-xs shadow-xl transition-all text-center flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Kişisel Yol Haritamı ve Eğitimlerimi Gör</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
