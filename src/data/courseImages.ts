// Category and Keyword-based High Resolution Retail Image Bank
export const RETAIL_IMAGE_BANK: Record<string, string> = {
  // Store Operations & Cashier
  'magaza-operasyon': 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800',
  'kasa-pos': 'https://images.unsplash.com/photo-1556742049-0a670c480728?auto=format&fit=crop&q=80&w=800',
  'musteri-hizmetleri': 'https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?auto=format&fit=crop&q=80&w=800',

  // Purchasing & Category
  'satinalma-kategori': 'https://images.unsplash.com/photo-1542744899-28c0b240ef42?auto=format&fit=crop&q=80&w=800',
  'tedarikci-muzakere': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',

  // Sales & Marketing
  'pazarlama-satis': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  'merchandising': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',

  // CRM & AI & Analytics
  'yapay-zeka': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
  'crm-veri': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',

  // Logistics & Supply Chain
  'lojistik-tedarik': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
  'depo-stok': 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800',

  // HR & Academy
  'insan-kaynaklari': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
  'liderlik-yonetim': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',

  // Fresh Food & Specialty
  'taze-gida': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
  'manav-meyve': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800',
  'kasap-et': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=800',
  'unlu-mamul': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',

  // Default fallback
  'default': 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800'
};

// Dynamic helper function to get high quality photo URL for any course
export function getCourseImage(courseTitle: string, category?: string, department?: string): string {
  const t = (courseTitle + ' ' + (category || '') + ' ' + (department || '')).toLowerCase();

  if (t.includes('yapay zeka') || t.includes('prompt') || t.includes('ai') || t.includes('robot')) {
    return RETAIL_IMAGE_BANK['yapay-zeka'];
  }
  if (t.includes('kasa') || t.includes('pos') || t.includes('kasiyer')) {
    return RETAIL_IMAGE_BANK['kasa-pos'];
  }
  if (t.includes('taze gida') || t.includes('manav') || t.includes('meyve')) {
    return RETAIL_IMAGE_BANK['manav-meyve'];
  }
  if (t.includes('kasap') || t.includes('et') || t.includes('sarkuteri')) {
    return RETAIL_IMAGE_BANK['kasap-et'];
  }
  if (t.includes('unlu') || t.includes('firin') || t.includes('ekmek')) {
    return RETAIL_IMAGE_BANK['unlu-mamul'];
  }
  if (t.includes('satinalma') || t.includes('kategori') || t.includes('tedarikci')) {
    return RETAIL_IMAGE_BANK['satinalma-kategori'];
  }
  if (t.includes('crm') || t.includes('veri') || t.includes('analitik') || t.includes('sql')) {
    return RETAIL_IMAGE_BANK['crm-veri'];
  }
  if (t.includes('lojistik') || t.includes('depo') || t.includes('stok') || t.includes('antrepo')) {
    return RETAIL_IMAGE_BANK['lojistik-tedarik'];
  }
  if (t.includes('ik') || t.includes('insan kaynak') || t.includes('terfi') || t.includes('akademi')) {
    return RETAIL_IMAGE_BANK['insan-kaynaklari'];
  }
  if (t.includes('merchandising') || t.includes('gorsel') || t.includes('vitrin') || t.includes('pazarlama')) {
    return RETAIL_IMAGE_BANK['merchandising'];
  }
  if (t.includes('musteri') || t.includes('ikna') || t.includes('iletisim')) {
    return RETAIL_IMAGE_BANK['musteri-hizmetleri'];
  }
  if (t.includes('liderlik') || t.includes('ceo') || t.includes('mudur')) {
    return RETAIL_IMAGE_BANK['liderlik-yonetim'];
  }

  return RETAIL_IMAGE_BANK['magaza-operasyon'];
}
