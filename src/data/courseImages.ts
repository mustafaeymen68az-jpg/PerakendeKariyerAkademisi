// High Resolution Retail & Professional Training Image Bank
export const RETAIL_IMAGE_BANK = {
  // Soft Skills & Personal Development
  timeManagement: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=800', // Clock, agenda, time
  conflictAndStress: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800', // Team collaboration & stress management
  careerPlanning: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800', // Career roadmap, notepad, goals
  communication: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800', // Presentation & body language
  digitalTransformation: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800', // Tech & digital awareness
  leadership: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800', // Executive leadership

  // Retail Store Operations
  storeFloor: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800', // Store aisles & manager
  cashierPos: 'https://images.unsplash.com/photo-1556742049-0a670c480728?auto=format&fit=crop&q=80&w=800', // POS cashier checkout
  customerService: 'https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?auto=format&fit=crop&q=80&w=800', // Customer relations

  // Purchasing, Category & Finance
  purchasingCategory: 'https://images.unsplash.com/photo-1542744899-28c0b240ef42?auto=format&fit=crop&q=80&w=800', // Purchasing & vendor meeting
  financePnL: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800', // Finance, P&L, budget

  // CRM, Data & AI
  aiRetail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800', // AI & LLM prompt
  dataAnalytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', // Power BI & analytics

  // Supply Chain & Logistics
  logistics: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800', // Warehouse & logistics

  // HR & Safety
  humanResources: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800', // HR interview & onboarding
  safetyAudit: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=800', // ISG & risk audit

  // Fresh Food Reyons (Strictly targeted!)
  produceReyon: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800', // Fruit & vegetables
  meatReyon: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=800', // Meat & butcher
  bakeryReyon: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800'  // Bakery & bread
};

// 10 Diverse Fallback Images to prevent repeated visuals on adjacent cards
const FALLBACK_IMAGE_SERIES = [
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1542744899-28c0b240ef42?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1556742049-0a670c480728?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
];

export function getCourseImage(courseTitle: string, category?: string, department?: string): string {
  const title = (courseTitle || '').toLowerCase();
  const cat = (category || '').toLowerCase();
  const dept = (department || '').toLowerCase();

  // 1. Soft Skills & Personal Development (High priority exact matches)
  if (title.includes('verimlilik') || title.includes('zaman yönetimi') || title.includes('zaman yonetimi') || title.includes('planlama')) {
    return RETAIL_IMAGE_BANK.timeManagement;
  }
  if (title.includes('çatışma') || title.includes('catisma') || title.includes('stres') || title.includes('motivasyon')) {
    return RETAIL_IMAGE_BANK.conflictAndStress;
  }
  if (title.includes('kariyer') || title.includes('gelişim') || title.includes('gelisim') || title.includes('hedef')) {
    return RETAIL_IMAGE_BANK.careerPlanning;
  }
  if (title.includes('iletişim') || title.includes('iletisim') || title.includes('beden dili') || title.includes('sunum') || title.includes('ikna')) {
    return RETAIL_IMAGE_BANK.communication;
  }
  if (title.includes('dijital') || title.includes('farkındalık') || title.includes('farkindalik') || title.includes('dönüşüm') || title.includes('donusum')) {
    return RETAIL_IMAGE_BANK.digitalTransformation;
  }
  if (title.includes('liderlik') || title.includes('yönetici') || title.includes('yonetici') || title.includes('koçluk') || title.includes('kocluk')) {
    return RETAIL_IMAGE_BANK.leadership;
  }

  // 2. AI & Technology
  if (title.includes('yapay zekâ') || title.includes('yapay zeka') || title.includes('prompt') || title.includes('ai') || title.includes('üretken')) {
    return RETAIL_IMAGE_BANK.aiRetail;
  }
  if (title.includes('crm') || title.includes('veri') || title.includes('analitik') || title.includes('sql') || title.includes('powerbi')) {
    return RETAIL_IMAGE_BANK.dataAnalytics;
  }

  // 3. Store Operations & Cashier
  if (title.includes('kasa') || title.includes('pos') || title.includes('kasiyer')) {
    return RETAIL_IMAGE_BANK.cashierPos;
  }
  if (title.includes('müşteri') || title.includes('musteri') || title.includes('hizmet') || title.includes('şikayet')) {
    return RETAIL_IMAGE_BANK.customerService;
  }
  if (title.includes('mağaza') || title.includes('magaza') || title.includes('saha') || title.includes('operasyon')) {
    return RETAIL_IMAGE_BANK.storeFloor;
  }

  // 4. Purchasing, Category & Finance
  if (title.includes('satın alma') || title.includes('satinalma') || title.includes('kategori') || title.includes('tedarikçi') || title.includes('pazarlık')) {
    return RETAIL_IMAGE_BANK.purchasingCategory;
  }
  if (title.includes('finans') || title.includes('p&l') || title.includes('bütçe') || title.includes('butce') || title.includes('maliyet') || title.includes('kar')) {
    return RETAIL_IMAGE_BANK.financePnL;
  }

  // 5. Logistics & Supply Chain
  if (title.includes('lojistik') || title.includes('depo') || title.includes('stok') || title.includes('envanter') || title.includes('antrepo')) {
    return RETAIL_IMAGE_BANK.logistics;
  }

  // 6. HR & Risk
  if (title.includes('insan kaynak') || title.includes('işe alım') || title.includes('ise alim') || title.includes('hrbp') || title.includes('terfi')) {
    return RETAIL_IMAGE_BANK.humanResources;
  }
  if (title.includes('isg') || title.includes('sağlık') || title.includes('saglik') || title.includes('risk') || title.includes('denetim') || title.includes('fire')) {
    return RETAIL_IMAGE_BANK.safetyAudit;
  }

  // 7. Fresh Food Reyons (Strict Exact Term Check ONLY!)
  if (title.includes('manav') || title.includes('meyve') || title.includes('sebze')) {
    return RETAIL_IMAGE_BANK.produceReyon;
  }
  if (title.includes('kasap') || title.includes('şarküteri') || title.includes('sarkuteri') || title.includes('et reyonu') || title.includes('kırmızı et')) {
    return RETAIL_IMAGE_BANK.meatReyon;
  }
  if (title.includes('fırın') || title.includes('firin') || title.includes('unlu mamul') || title.includes('ekmek')) {
    return RETAIL_IMAGE_BANK.bakeryReyon;
  }

  // 8. Deterministic Hash Fallback based on Course Title (Prevents repeating adjacent images)
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % FALLBACK_IMAGE_SERIES.length;
  return FALLBACK_IMAGE_SERIES[index];
}
