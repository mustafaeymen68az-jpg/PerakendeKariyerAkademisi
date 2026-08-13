const fs = require('fs');
const path = require('path');
const XLSX = require('C:\\Users\\Selim Kılıç\\Desktop\\perakendedata-main\\node_modules\\xlsx');
const { PrismaBetterSqlite3 } = require('C:\\Users\\Selim Kılıç\\Desktop\\perakende mühendisi eğitim akademisi\\node_modules\\@prisma/adapter-better-sqlite3');
const { PrismaClient } = require('C:\\Users\\Selim Kılıç\\Desktop\\perakende mühendisi eğitim akademisi\\node_modules\\@prisma/client');

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

const DEPARTMENTS = [
  { name: "Bilgi İşlem", slug: "bilgi-islem", desc: "Bilgi teknolojileri, yazılım ve donanım altyapısı yönetimi." },
  { name: "Bölge Müdürü", slug: "bolge-muduru", desc: "Mağazalar arası koordinasyon, ciro hedefleri ve bölge koçluğu." },
  { name: "Finans", slug: "finans", desc: "Bütçe planlama, nakit akışı ve finansal analiz." },
  { name: "İnsan Kaynakları", slug: "insan-kaynaklari", desc: "İşe alım, eğitim planlama, kariyer yönetimi ve çalışan deneyimi." },
  { name: "Kasiyer", slug: "kasiyer", desc: "Kasa hattı operasyonları, ödeme sistemleri ve müşteri ilişkileri." },
  { name: "Lojistik ve Depo", slug: "lojistik-depo", desc: "Mal kabul, depo yerleşim ve mağaza dağıtım süreçleri." },
  { name: "Mağaza Müdür Yardımcıları", slug: "magaza-mudur-yardimcilari", desc: "Mağaza günlük operasyonu, reyon düzeni ve vardiya yönetimi." },
  { name: "Mağaza Müdürleri", slug: "magaza-mudurleri", desc: "Mağaza karlılığı, ekip liderliği, stok ve KPI yönetimi." },
  { name: "Muhasebe", slug: "muhasebe", desc: "Fatura takibi, cari hesap mutabakatı ve yasal bildirimler." },
  { name: "Patron ve Üst Yönetim", slug: "patron-ust-yonetim", desc: "Stratejik büyüme, yatırım kararları ve dijital dönüşüm." },
  { name: "Rapor Analiz", slug: "rapor-analiz", desc: "Satış verileri analitiği ve Power BI dashboard tasarımları." },
  { name: "Satınalma ve Kategori Yönetimi", slug: "satinalma-kategori", desc: "Tedarikçi sözleşmeleri, kategori marjı ve ürün asortmanı." },
  { name: "Tüm Çalışanlar", slug: "tum-calisanlar", desc: "Oryantasyon, İSG, hijyen kuralları ve kurumsal kültür." },
  { name: "Mağazalar Müdürlüğü", slug: "magazalar-mudurlugu", desc: "Tüm mağazalar operasyonel mükemmellik ve standartlar yönetimi." },
  { name: "Reyon Yönetimi", slug: "reyon-yonetimi", desc: "Reyon tanzim, teşhir, bulunurluk ve fiyat kontrol süreçleri." },
  { name: "Stok Yönetimi", slug: "stok-yonetimi", desc: "Sipariş planlama, emniyet stoku ve envanter optimizasyonu." },
  { name: "Taze Gıda ve Hizmet Reyonları", slug: "taze-gida", desc: "Manav, kasap, şarküteri ve unlu mamuller operasyonları." },
  { name: "CRM ve Müşteri Yönetimi", slug: "crm-musteri-yonetimi", desc: "Müşteri sadakat kartı, RFM analizi ve kişiselleştirilmiş kampanyalar." },
  { name: "Satış ve Pazarlama", slug: "satis-pazarlama", desc: "Mağaza içi aktiviteler, insert çalışmaları ve kampanya yönetimi." },
  { name: "Gıda Güvenliği, İSG ve Denetim", slug: "gida-guvenligi-denetim", desc: "Resmi hijyen denetimleri, iş sağlığı ve güvenliği takibi." }
];

const CATEGORIES = [
  { name: "Analitik ve Raporlama", slug: "analitik-raporlama", desc: "Perakende matematiği, veri analizi ve Power BI." },
  { name: "Mağaza Operasyonu", slug: "magaza-operasyonu", desc: "Saha operasyonları, bulunurluk, düzen ve tanzim." },
  { name: "Yönetim ve Liderlik", slug: "yonetim-liderlik", desc: "Ekip yönetimi, koçluk ve stratejik liderlik." },
  { name: "Tedarik Zinciri ve Lojistik", slug: "tedarik-lojistik", desc: "Depo yönetimi, rota optimizasyonu ve mal kabul." },
  { name: "Taze Gıda Yönetimi", slug: "taze-gida-yonetimi", desc: "Fire takibi, hijyen ve reyon standartları." },
  { name: "Finans ve Bütçe", slug: "finans-butce", desc: "P&L takibi, mağaza karlılığı ve finansal modelleme." },
  { name: "Müşteri ve CRM", slug: "musteri-crm", desc: "Segmentasyon, sadakat programları ve şikayet yönetimi." },
  { name: "İSG ve Mevzuat", slug: "isg-mevzuat", desc: "İş sağlığı ve güvenliği, hijyen kuralları ve yasal süreçler." }
];

const SHEET_DEPT_MAP = {
  'Şef Genel': ['Mağaza Müdürleri', 'Mağaza Müdür Yardımcıları'],
  'Uyum Şefi': ['Gıda Güvenliği, İSG ve Denetim'],
  'İnsan Kaynakları': ['İnsan Kaynakları'],
  'Kayıp Önleme': ['Mağazalar Müdürlüğü', 'Reyon Yönetimi'],
  'Teknik Servis': ['Bilgi İşlem'],
  'Depo ve Mal Kabul': ['Lojistik ve Depo', 'Stok Yönetimi'],
  'Alan Asortman Yerleşim': ['Satınalma ve Kategori Yönetimi', 'Reyon Yönetimi'],
  'İdari Şeflik': ['Muhasebe', 'Finans'],
  'MH Yönetsel ve İdari': ['CRM ve Müşteri Yönetimi'],
  'Kasa Hattı': ['Kasiyer'],
  'Kasa Ofisi': ['Muhasebe', 'Finans'],
  'Fiyat Bütünlüğü': ['Stok Yönetimi', 'Reyon Yönetimi'],
  'Et- Balık- Tavuk': ['Taze Gıda ve Hizmet Reyonları'],
  'Hazır Yemek': ['Taze Gıda ve Hizmet Reyonları'],
  'Meyve - Sebze': ['Taze Gıda ve Hizmet Reyonları'],
  'Şarküteri': ['Taze Gıda ve Hizmet Reyonları'],
  'Unlu Mamuller': ['Taze Gıda ve Hizmet Reyonları'],
  'Gıda - 1&3': ['Reyon Yönetimi', 'Tüm Çalışanlar'],
  'Gıda Dışı - 4&5': ['Reyon Yönetimi'],
  'Gıda Dışı - 6': ['Reyon Yönetimi']
};

function toSlug(text) {
  const trMap = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'i': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'c', 'Ğ': 'g', 'I': 'i', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u',
  };
  return text.replace(/[çğıiöşüÇĞIİÖŞÜ]/g, (match) => trMap[match] || match)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

async function main() {
  console.log('Clearing database tables...');
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.document.deleteMany();
  await prisma.kpiResult.deleteMany();
  await prisma.kpiDefinition.deleteMany();
  await prisma.evaluation.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.trainingSession.deleteMany();
  await prisma.programModule.deleteMany();
  await prisma.trainingProgram.deleteMany();
  await prisma.training.deleteMany();
  await prisma.category.deleteMany();
  await prisma.department.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();
  await prisma.trainer.deleteMany();

  console.log('Seeding Departments...');
  const createdDepts = {};
  for (const dept of DEPARTMENTS) {
    const d = await prisma.department.create({
      data: { name: dept.name, slug: dept.slug, description: dept.desc }
    });
    createdDepts[dept.name] = d;
  }

  console.log('Seeding Categories...');
  const createdCats = {};
  for (const cat of CATEGORIES) {
    const c = await prisma.category.create({
      data: { name: cat.name, slug: cat.slug, description: cat.desc }
    });
    createdCats[cat.name] = c;
  }

  console.log('Seeding Trainers...');
  const selim = await prisma.trainer.create({
    data: {
      name: "Selim Kılıç",
      title: "Perakende Mühendisi & Akademi Kurucusu",
      bio: "Saha tecrübesine ve veriye dayalı yönetim yaklaşımlarına sahip perakende danışmanı ve eğitmen.",
      experience: "15+ Yıl Perakende ve CRM Yönetimi",
      specialty: "Perakende Analitiği, Kategori Yönetimi, CRM ve Saha Operasyonları",
      linkedin: "https://www.linkedin.com/in/selimkilic",
      image: "/trainers/selim.jpg"
    }
  });
  const muzaffer = await prisma.trainer.create({
    data: {
      name: "Muzaffer Tuğsavul",
      title: "Kıdemli Perakende Yönetim Danışmanı",
      bio: "Türkiye'nin önde gelen market zincirlerinde üst düzey yöneticilik yapmış, saha operasyonlarında uzman.",
      experience: "25+ Yıl Mağaza ve Bölge Yönetimi",
      specialty: "Liderlik, Mağaza Operasyonları ve Müşteri İlişkileri",
      linkedin: "https://www.linkedin.com/in/muzaffer-tugsavul",
      image: "/trainers/muzaffer.jpg"
    }
  });

  // Load candidate excel file
  const excelPath = 'C:\\Users\\Selim Kılıç\\Desktop\\Yeni klasör (2)\\SElim 2025 Ekim\\YENİ BİLGİSAYAR\\İnsan Kaynakları\\sayar market eğitim bilgileri\\Opsiyonlu Program Uzmanlık Eğitim Dökümanları.xls';
  let trainingsCount = 0;

  if (fs.existsSync(excelPath)) {
    console.log(`Reading Excel file: ${excelPath}`);
    const wb = XLSX.readFile(excelPath);
    
    for (const sheetName of wb.SheetNames) {
      if (sheetName === 'Sheet1') continue;
      
      const sheet = wb.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const mappedDepts = SHEET_DEPT_MAP[sheetName.trim()] || ['Tüm Çalışanlar'];
      
      console.log(`Processing Sheet: ${sheetName} (${rows.length} rows), mapped to:`, mappedDepts);
      
      // Determine level based on sheet name
      let level = 'GOREV';
      if (sheetName.includes('Genel') || sheetName.includes('Genel Müdür') || sheetName.includes('Yönetsel')) {
        level = 'YONETICI';
      } else if (sheetName.includes('Liderlik') || sheetName.includes('İleri')) {
        level = 'ILERI_YONETIM';
      }
      
      // We look for category match
      let categoryName = 'Mağaza Operasyonu';
      if (sheetName.includes('İnsan Kaynakları')) categoryName = 'Yönetim ve Liderlik';
      if (sheetName.includes('Depo') || sheetName.includes('Lojistik')) categoryName = 'Tedarik Zinciri ve Lojistik';
      if (sheetName.includes('Fiyat') || sheetName.includes('Kasa')) categoryName = 'Mağaza Operasyonu';
      if (sheetName.includes('Şarküteri') || sheetName.includes('Meyve') || sheetName.includes('Et')) categoryName = 'Taze Gıda Yönetimi';
      if (sheetName.includes('MH') || sheetName.includes('İdari')) categoryName = 'Müşteri ve CRM';
      
      const category = createdCats[categoryName] || createdCats['Mağaza Operasyonu'];
      
      // Header is at index 2, data starts from index 3
      let mainTopic = '';
      for (let r = 3; r < rows.length; r++) {
        const row = rows[r];
        if (!row || !Array.isArray(row) || row.length < 3) continue;
        
        // Col 0: Code, Col 1: Main Topic (optional, merged), Col 2: Sub-topic/Title, Col 3: Objective, Col 4: Content
        const code = String(row[0] || '').trim();
        const rowMainTopic = String(row[1] || '').trim();
        const rowTitle = String(row[2] || '').trim();
        const objective = String(row[3] || '').trim();
        const content = String(row[4] || '').trim();
        
        if (rowMainTopic) {
          mainTopic = rowMainTopic;
        }
        
        if (!rowTitle || rowTitle === 'null' || rowTitle.length < 3) continue;
        
        const title = `${mainTopic ? mainTopic + ' - ' : ''}${rowTitle}`;
        const slug = toSlug(`${sheetName}-${title}-${code}`);
        const duration = Math.floor(Math.random() * 6) * 4 + 4; // 4, 8, 12, 16, 20, 24 saat
        
        try {
          const training = await prisma.training.create({
            data: {
              title: title,
              slug: slug,
              duration: duration,
              level: level,
              format: Math.random() > 0.4 ? 'ONLINE' : 'YUZ_YUZE',
              type: 'HER_IKISI',
              targetAudience: mappedDepts.join(', '),
              description: `${title} modülü kapsamında detaylı saha uygulamaları, teorik bilgiler ve operasyonel standartlar.`,
              objectives: objective || `${title} konusunda çalışan yetkinliğini artırmak ve operasyonel hataları azaltmak.`,
              content: content || `${title} süreci, iş adımları, kontrol listeleri ve raporlama yöntemleri.`,
              achievements: 'Eğitim sonrasında katılımcılar ilgili iş adımlarını hatasız uygulayabilir, yönetebilir ve KPI sonuçlarını iyileştirebilir.',
              prerequisites: code ? `Kod: ${code}` : 'Ön koşul bulunmamaktadır.',
              examMethod: 'Eğitim sonu çoktan seçmeli bilgi sınavı ve 30 günlük yönetici gözlem formu.',
              kpis: 'Hata oranı, işlem hızı ve operasyonel uyum puanı.',
              status: 'AKTIF',
              certStatus: true,
              coverImage: `/trainers/course-${Math.floor(Math.random() * 5) + 1}.jpg`,
              tags: `${sheetName}, Perakende, Eğitim`,
              published: true,
              category: { connect: { id: category.id } },
              departments: {
                connect: mappedDepts.map(dName => ({ id: createdDepts[dName].id }))
              },
              trainer: { connect: { id: Math.random() > 0.5 ? selim.id : muzaffer.id } }
            }
          });
          trainingsCount++;
        } catch (e) {
          // Skip duplicates
        }
      }
    }
  } else {
    console.log(`Excel file not found, seeding default mock data.`);
  }

  // Seed default trainings if none found
  if (trainingsCount === 0) {
    console.log('Seeding mock trainings...');
    const mockTrainings = [
      { title: 'Mağaza Müdürü Liderliği ve Ekip Yönetimi', dept: 'Mağaza Müdürleri', cat: 'Yönetim ve Liderlik', level: 'YONETICI', duration: 24 },
      { title: 'Perakende Matematiği ve KPI Eğitimi', dept: 'Mağaza Müdürleri', cat: 'Analitik ve Raporlama', level: 'YONETICI', duration: 16 },
      { title: 'Stok, Sipariş ve Envanter Yönetimi', dept: 'Stok Yönetimi', cat: 'Tedarik Zinciri ve Lojistik', level: 'GOREV', duration: 12 },
      { title: 'Satınalma ve Kategori Yönetimi', dept: 'Satınalma ve Kategori Yönetimi', cat: 'Yönetim ve Liderlik', level: 'ILERI_YONETIM', duration: 32 },
      { title: 'CRM ve Müşteri Segmentasyonu', dept: 'CRM ve Müşteri Yönetimi', cat: 'Müşteri ve CRM', level: 'GOREV', duration: 16 },
      { title: 'RFM, Churn ve Müşteri Yaşam Değeri', dept: 'CRM ve Müşteri Yönetimi', cat: 'Analitik ve Raporlama', level: 'ILERI_YONETIM', duration: 20 },
      { title: 'Taze Gıda Satış, Sipariş ve Fire Yönetimi', dept: 'Taze Gıda ve Hizmet Reyonları', cat: 'Taze Gıda Yönetimi', level: 'GOREV', duration: 16 },
      { title: 'Perakende Finans ve Mağaza Kârlılığı', dept: 'Finans', cat: 'Finans ve Bütçe', level: 'ILERI_YONETIM', duration: 24 },
      { title: 'Bölge Müdürü ve Mağaza Koçluğu', dept: 'Bölge Müdürü', cat: 'Yönetim ve Liderlik', level: 'ILERI_YONETIM', duration: 36 },
      { title: 'Power BI ile Perakende Dashboard Tasarımı', dept: 'Rapor Analiz', cat: 'Analitik ve Raporlama', level: 'ILERI_YONETIM', duration: 24 }
    ];

    for (const mt of mockTrainings) {
      await prisma.training.create({
        data: {
          title: mt.title,
          slug: toSlug(mt.title),
          duration: mt.duration,
          level: mt.level,
          format: 'ONLINE',
          type: 'HER_IKISI',
          targetAudience: mt.dept,
          description: `${mt.title} eğitim programı ile verimli iş süreçleri ve KPI odaklı yönetim anlayışını kazanın.`,
          objectives: `${mt.title} konusunda operasyonel ve finansal sonuçları iyileştirme amaçlanmaktadır.`,
          content: 'Uygulamalı vaka analizleri, hesaplama yöntemleri ve saha pratikleri.',
          achievements: 'KPI takibi, raporlama ve hızlı karar alma yetkinliği.',
          prerequisites: 'Temel perakende bilgisi.',
          examMethod: 'Eğitim sonu testi ve KPI takip modülü.',
          kpis: 'Satış hacmi, stok devir hızı ve fire oranları.',
          status: 'AKTIF',
          certStatus: true,
          coverImage: `/trainers/course-${Math.floor(Math.random() * 5) + 1}.jpg`,
          category: { connect: { id: createdCats[mt.cat].id } },
          departments: { connect: [{ id: createdDepts[mt.dept].id }] },
          trainer: { connect: { id: selim.id } }
        }
      });
      trainingsCount++;
    }
  }

  console.log(`Successfully seeded ${trainingsCount} trainings.`);

  console.log('Seeding Training Programs...');
  const programs = [
    { name: "Mağaza Müdürü Gelişim Programı", slug: "magaza-muduru-gelisim-programi", duration: 80 },
    { name: "Mağaza Müdür Yardımcısı Yetiştirme Programı", slug: "magaza-mudur-yardimcisi-yetistirme-programi", duration: 64 },
    { name: "Bölge Müdürü ve Mağaza Koçluğu Programı", slug: "bolge-muduru-magaza-koclugu-programi", duration: 96 },
    { name: "Satınalma ve Kategori Yönetimi Akademisi", slug: "satinalma-kategori-yonetimi-akademisi", duration: 120 },
    { name: "Kasiyer Yetkinlik ve Sertifikasyon Programı", slug: "kasiyer-yetkinlik-sertifikasyon-programi", duration: 32 }
  ];

  for (const prog of programs) {
    const p = await prisma.trainingProgram.create({
      data: {
        name: prog.name,
        slug: prog.slug,
        objective: `${prog.name} ile perakende standartlarını yakalayın ve yönetimsel yetkinliklerinizi saha gerçekliğiyle birleştirin.`,
        targetAudience: "İlgili unvanlardaki tüm perakende çalışanları ve yönetici adayları.",
        totalDuration: prog.duration,
        certRequirements: "Eğitime %80 devamlılık, eğitim sonu sınavlarından minimum 70 puan alma ve işbaşı uygulama projesi onayı.",
        examMethod: "Çoktan seçmeli sınavlar, vaka analizleri ve 360 derece yönetici değerlendirmesi.",
        kpis: "Ciro artışı, sepet ortalaması, müşteri memnuniyeti ve stok devir hızı."
      }
    });

    // Link top 3 trainings to each program as modules
    const allTrainings = await prisma.training.findMany({ take: 3 });
    for (let i = 0; i < allTrainings.length; i++) {
      await prisma.programModule.create({
        data: {
          programId: p.id,
          trainingId: allTrainings[i].id,
          order: i + 1
        }
      });
    }
  }

  console.log('Seeding Companies & Branches...');
  const sayar = await prisma.company.create({
    data: {
      name: "Sayar Marketler Zinciri",
      logo: "/companies/sayar.png",
      industry: "Gıda Perakendeciliği",
      subCount: 18,
      employeeCount: 350
    }
  });

  const branchCent = await prisma.branch.create({
    data: { name: "Merkez Ofis", companyId: sayar.id }
  });
  const branchMain = await prisma.branch.create({
    data: { name: "Merkez Şube", companyId: sayar.id }
  });

  console.log('Seeding Users...');
  const admin = await prisma.user.create({
    data: {
      name: "Admin Kullanıcı",
      email: "admin@perakendemuhendisi.com",
      password: "admin123",
      role: "ADMIN"
    }
  });

  const manager = await prisma.user.create({
    data: {
      name: "Mehmet Sayar",
      email: "company@sayarmarket.com",
      password: "company123",
      role: "COMPANY_MANAGER",
      companyId: sayar.id,
      branchId: branchCent.id
    }
  });

  const participant = await prisma.user.create({
    data: {
      name: "Ahmet Yılmaz",
      email: "ahmet@sayarmarket.com",
      password: "ahmet123",
      role: "PARTICIPANT",
      companyId: sayar.id,
      branchId: branchMain.id,
      departmentId: createdDepts['Kasiyer'].id
    }
  });

  // Seed a few default KPI Definitions
  console.log('Seeding KPI Definitions...');
  const kpis = [
    { name: "Kasa Farkı Oranı", unit: "%", target: "%0.02", dept: "Kasiyer" },
    { name: "Ortalama İşlem Süresi", unit: "Saat", target: "45 sn", dept: "Kasiyer" },
    { name: "Ciro Artışı", unit: "%", target: "%15", dept: "Mağaza Müdürleri" },
    { name: "Fire Oranı", unit: "%", target: "%1.5", dept: "Taze Gıda ve Hizmet Reyonları" }
  ];

  for (const k of kpis) {
    await prisma.kpiDefinition.create({
      data: {
        name: k.name,
        unit: k.unit,
        target: k.target,
        departmentId: createdDepts[k.dept].id
      }
    });
  }

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
