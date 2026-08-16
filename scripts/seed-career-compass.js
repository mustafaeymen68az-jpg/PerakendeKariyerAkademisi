const { PrismaBetterSqlite3 } = require('../node_modules/@prisma/adapter-better-sqlite3');
const { PrismaClient } = require('../node_modules/@prisma/client');

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

async function seedCareerCompass() {
  console.log('🚀 Seeding Kariyer Pusulam data...');

  // 1. Create Career Paths
  const storeOpsPath = await prisma.careerPath.upsert({
    where: { name: 'Mağaza Operasyonları Kariyer Yolu' },
    update: {},
    create: {
      name: 'Mağaza Operasyonları Kariyer Yolu',
      category: 'STORE_OPERATIONS',
      description: 'Saha mağaza ekibinden başlayıp Mağaza Müdürlüğü ve Bölge Müdürlüğüne uzanan temel mağaza liderlik yolu.',
      status: 'ACTIVE'
    }
  });

  const freshFoodPath = await prisma.careerPath.upsert({
    where: { name: 'Taze Gıda Yönetimi Kariyer Yolu' },
    update: {},
    create: {
      name: 'Taze Gıda Yönetimi Kariyer Yolu',
      category: 'FRESH_FOOD',
      description: 'Manav, kasap, şarküteri ve unlu mamuller alanında uzmanlaşarak Taze Gıda Yöneticiliğine uzanan uzmanlık yolu.',
      status: 'ACTIVE'
    }
  });

  const hqPath = await prisma.careerPath.upsert({
    where: { name: 'Satın Alma & Kategori Kariyer Yolu' },
    update: {},
    create: {
      name: 'Satın Alma & Kategori Kariyer Yolu',
      category: 'HEADQUARTERS',
      description: 'Mağaza ve saha birimlerinden Genel Merkez Satın Alma ve Kategori Yönetimine geçiş uzmanlık yolu.',
      status: 'ACTIVE'
    }
  });

  const hqHrPath = await prisma.careerPath.upsert({
    where: { name: 'İK & Akademi Kariyer Yolu' },
    update: {},
    create: {
      name: 'İK & Akademi Kariyer Yolu',
      category: 'SPECIALIST',
      description: 'İç eğitmenlik, mentörlük ve İnsan Kaynakları saha gelişim uzmanlığı kariyer yolu.',
      status: 'ACTIVE'
    }
  });

  // 2. Create Competencies (6 Categories)
  const competenciesData = [
    { name: 'Stok, Envanter & Fire Yönetimi', category: 'TEKNIK', description: 'Stok devir hızı, sayım doğruluğu, emniyet stoku ve fire azaltma teknikleri.' },
    { name: 'Kasa Operasyonları & Gün Sonu', category: 'TEKNIK', description: 'Kasa hattı verimliliği, nakit akışı, gün sonu kalibrasyonu ve kasa açığı takibi.' },
    { name: 'Vardiya & İş Gücü Planlaması', category: 'TEKNIK', description: 'Mağaza içi yoğunluk saatlerine göre personel vardiya ve haftalık çalışma çizelgesi hazırlama.' },
    { name: 'Müşteri Deneyimi & Şikayet Yönetimi', category: 'MUSTERI', description: 'Müşteri memnuniyeti, zor müşteri iletişimi, sepet büyütme ve şikayet çözme yetkinliği.' },
    { name: 'Perakende Matematiği & P&L', category: 'KPI', description: 'Ciro, brüt kar marjı, metrekarayaya düşen ciro, sepet ortalaması ve mağaza kar-zarar tablosu okuma.' },
    { name: 'Liderlik, Ekip Yönetimi & Motivasyon', category: 'LIDERLIK', description: 'Ekip içi görev dağılımı, motivasyon, yetki devri ve performans koçluğu.' },
    { name: 'Taze Gıda, Hijyen & Kalite', category: 'SAHA', description: 'Soğuk zincir, SKT takibi, gıda güvenliği standartları ve fire engelleme.' },
    { name: 'Geri Bildirim & Koçluk Yaklaşımı', category: 'DAVRANISAL', description: 'Çalışanlara yapılandırılmış gelişimsel geri bildirim verme ve kariyer rehberliği.' },
    { name: 'KPI Okuryazarlığı & Satış Büyütme', category: 'KPI', description: 'Günlük ve aylık mağaza hedef göstergelerini takip edip aksiyon alma.' }
  ];

  const competencies = {};
  for (const comp of competenciesData) {
    const created = await prisma.competency.upsert({
      where: { name: comp.name },
      update: { category: comp.category, description: comp.description },
      create: comp
    });
    competencies[comp.name] = created;
  }

  // 3. Create Positions
  const positionsData = [
    {
      name: 'Kasiyer & Reyon Çalışanı',
      group: 'STORE_OPERATIONS',
      careerLevel: 1,
      careerPathId: storeOpsPath.id,
      description: 'Mağaza içi müşteri karşılama, kasa ödeme işlemleri, reyon tanzim ve teşhir sorumlusu.',
      responsibilities: JSON.stringify([
        'Kasa işlemlerini doğru ve hızlı şekilde yürütmek',
        'Reyon etiket ve fiyat kontrollerini günlük yapmak',
        'Müşteri sorularını güler yüzle yanıtlamak',
        'Son kullanma tarihi (SKT) ve raf düzenini sağlamak'
      ]),
      prerequisites: JSON.stringify(['Lise mezuniyeti veya perakende ilgisi', 'Temel iletişim becerileri'])
    },
    {
      name: 'Kıdemli Çalışan / Takım Lideri',
      group: 'STORE_OPERATIONS',
      careerLevel: 2,
      careerPathId: storeOpsPath.id,
      description: 'Reyon ve kasa ekiplerine saha operasyonlarında liderlik eden, Mağaza Müdürü Yardımcılığı adayı.',
      responsibilities: JSON.stringify([
        'Vardiya başı görev dağılımını koordine etmek',
        'Reyon stok bulunurluğunu kontrol etmek',
        'Yeni başlayan personele sahada oryantasyon vermek',
        'Kasa kapanış ve teslimat süreçlerine destek olmak'
      ]),
      prerequisites: JSON.stringify(['En az 12 ay mağaza deneyimi', 'PKA Temel Sertifikası'])
    },
    {
      name: 'Mağaza Müdür Yardımcısı',
      group: 'STORE_MANAGEMENT',
      careerLevel: 3,
      careerPathId: storeOpsPath.id,
      description: 'Mağazanın günlük operasyon, kasa ofisi, envanter ve vardiya yönetiminden sorumlu yönetici.',
      responsibilities: JSON.stringify([
        'Mağaza açılış ve kapanış prosedürlerini eksiksiz uygulamak',
        'Haftalık personel vardiya planını hazırlamak',
        'Stok sayım, sipariş ve fire kontrollerini gerçekleştirmek',
        'Müşteri şikayetlerini 1. seviyede çözüme kavuşturmak',
        'İş sağlığı ve güvenliği kurallarını sahada denetlemek'
      ]),
      prerequisites: JSON.stringify(['En az 24 ay perakende tecrübesi', 'PKA Mağaza Yöneticiliği Sertifikası', 'Takım Liderliği deneyimi'])
    },
    {
      name: 'Mağaza Müdürü',
      group: 'STORE_MANAGEMENT',
      careerLevel: 4,
      careerPathId: storeOpsPath.id,
      description: 'Mağazanın tüm ciro, P&L, personel, denetim ve müşteri deneyiminden birinci derecede sorumlu lider.',
      responsibilities: JSON.stringify([
        'Mağaza yıllık ve aylık ciro/kar hedeflerini gerçekleştirmek',
        'Mağaza P&L tablosunu analiz ederek gider kontrolü sağlamak',
        'Ekip performansını değerlendirmek ve iç terfi adayları yetiştirmek',
        'Denetim ve mevzuat standartlarına %100 uyum sağlamak'
      ]),
      prerequisites: JSON.stringify(['Mağaza Müdür Yardımcılığı tecrübesi (min 18 ay)', 'PKA İleri Yönetici Sertifikası'])
    },
    {
      name: 'Bölge Müdürü',
      group: 'FIELD_MANAGEMENT',
      careerLevel: 5,
      careerPathId: storeOpsPath.id,
      description: 'Sorumlu olduğu bölgedeki 15-25 mağazanın performansını, yöneticilerini ve stratejik büyümesini yöneten lider.',
      responsibilities: JSON.stringify([
        'Bölge mağazalarının ciro ve kar hedeflerini takib etmek',
        'Mağaza müdürlerine liderlik ve performans koçluğu yapmak',
        'Bölgesel yetenek havuzu ve yedekleme planlarını onaylamak',
        'Yeni şube açılış ve dönüşüm projelerini yönetmek'
      ]),
      prerequisites: JSON.stringify(['Başarılı Mağaza Müdürlüğü geçmişi (min 3 yıl)', 'PKA Executive Liderlik Sertifikası'])
    },
    {
      name: 'Taze Gıda Reyon Sorumlusu',
      group: 'FRESH_FOOD',
      careerLevel: 2,
      careerPathId: freshFoodPath.id,
      description: 'Manav, kasap, şarküteri reyonlarında tazelik, fire azaltma ve hijyen süreçlerinden sorumlu uzman.',
      responsibilities: JSON.stringify(['Reyon fire oranını %3 altında tutmak', 'Soğuk zincir ve hijyen standartlarını uygulamak']),
      prerequisites: JSON.stringify(['Taze Gıda Hijyen Sertifikası'])
    },
    {
      name: 'Taze Gıda Şefi',
      group: 'FRESH_FOOD',
      careerLevel: 3,
      careerPathId: freshFoodPath.id,
      description: 'Tüm taze gıda reyonlarının kalitesinden, tedarikinden ve satış hedeflerinden sorumlu şef.',
      responsibilities: JSON.stringify(['Taze gıda sipariş takibi', 'Fire analizi ve şef eğitimleri']),
      prerequisites: JSON.stringify(['Taze Gıda Şeflik Eğitimi'])
    }
  ];

  const createdPositions = {};
  for (const posData of positionsData) {
    const created = await prisma.professionalPosition.create({
      data: posData
    });
    createdPositions[posData.name] = created;
  }

  // Link next positions
  await prisma.professionalPosition.update({
    where: { id: createdPositions['Kasiyer & Reyon Çalışanı'].id },
    data: { nextPositionId: createdPositions['Kıdemli Çalışan / Takım Lideri'].id }
  });
  await prisma.professionalPosition.update({
    where: { id: createdPositions['Kıdemli Çalışan / Takım Lideri'].id },
    data: { nextPositionId: createdPositions['Mağaza Müdür Yardımcısı'].id }
  });
  await prisma.professionalPosition.update({
    where: { id: createdPositions['Mağaza Müdür Yardımcısı'].id },
    data: { nextPositionId: createdPositions['Mağaza Müdürü'].id }
  });
  await prisma.professionalPosition.update({
    where: { id: createdPositions['Mağaza Müdürü'].id },
    data: { nextPositionId: createdPositions['Bölge Müdürü'].id }
  });

  // 4. Create Position Requirements (Target Competency Levels 1-5)
  const mgrAssistantId = createdPositions['Mağaza Müdür Yardımcısı'].id;
  const reqs = [
    { posName: 'Mağaza Müdür Yardımcısı', compName: 'Stok, Envanter & Fire Yönetimi', targetLevel: 4, weight: 1.2 },
    { posName: 'Mağaza Müdür Yardımcısı', compName: 'Kasa Operasyonları & Gün Sonu', targetLevel: 4, weight: 1.0 },
    { posName: 'Mağaza Müdür Yardımcısı', compName: 'Vardiya & İş Gücü Planlaması', targetLevel: 4, weight: 1.1 },
    { posName: 'Mağaza Müdür Yardımcısı', compName: 'Müşteri Deneyimi & Şikayet Yönetimi', targetLevel: 4, weight: 1.0 },
    { posName: 'Mağaza Müdür Yardımcısı', compName: 'Perakende Matematiği & P&L', targetLevel: 3, weight: 1.0 },
    { posName: 'Mağaza Müdür Yardımcısı', compName: 'Liderlik, Ekip Yönetimi & Motivasyon', targetLevel: 3, weight: 1.2 },
    { posName: 'Kasiyer & Reyon Çalışanı', compName: 'Kasa Operasyonları & Gün Sonu', targetLevel: 3, weight: 1.0 },
    { posName: 'Kasiyer & Reyon Çalışanı', compName: 'Müşteri Deneyimi & Şikayet Yönetimi', targetLevel: 3, weight: 1.0 },
    { posName: 'Kasiyer & Reyon Çalışanı', compName: 'Stok, Envanter & Fire Yönetimi', targetLevel: 2, weight: 1.0 },
  ];

  for (const r of reqs) {
    if (createdPositions[r.posName] && competencies[r.compName]) {
      await prisma.positionRequirement.upsert({
        where: {
          positionId_competencyId: {
            positionId: createdPositions[r.posName].id,
            competencyId: competencies[r.compName].id
          }
        },
        update: { targetLevel: r.targetLevel, weight: r.weight },
        create: {
          positionId: createdPositions[r.posName].id,
          competencyId: competencies[r.compName].id,
          targetLevel: r.targetLevel,
          weight: r.weight,
          required: true
        }
      });
    }
  }

  // 5. Create Field Task Templates
  const fieldTasksData = [
    {
      title: 'Raf Bulunurluğu ve Stok Doğruluğu Analizi',
      description: 'Bir mağaza reyonu seçip 20 kritik üründe raf stok ile otomasyon sistem stoğunu karşılaştırın. Sapma nedenlerini raporlayıp fotoğraflarla kanıt yükleyin.',
      competencyId: competencies['Stok, Envanter & Fire Yönetimi']?.id,
      targetPositionId: createdPositions['Mağaza Müdür Yardımcısı'].id,
      evidenceRequirements: JSON.stringify(['PHOTO', 'CHECKLIST', 'REPORT']),
      evaluatorRole: 'MANAGER'
    },
    {
      title: 'Kasa Sonu Kalibrasyonu ve Nakit Güvenlik Denetimi',
      description: 'Kasa hattı gün sonu z-raporları ile kasa nakit mevcudunu eşleştirin. Para üstü doğruluğu ve açıkları rapor haline getirin.',
      competencyId: competencies['Kasa Operasyonları & Gün Sonu']?.id,
      targetPositionId: createdPositions['Mağaza Müdür Yardımcısı'].id,
      evidenceRequirements: JSON.stringify(['PDF', 'REPORT']),
      evaluatorRole: 'MANAGER'
    },
    {
      title: 'Taze Gıda Fire Azaltma ve Hijyen Denetimi',
      description: 'Manav ve Şarküteri reyonlarında soğuk zincir sıcaklık değerlerini ölçün, SKT son 3 gün kalan ürünler için indirim etiketi aksiyonu uygulayın.',
      competencyId: competencies['Taze Gıda, Hijyen & Kalite']?.id,
      targetPositionId: createdPositions['Taze Gıda Şefi']?.id,
      evidenceRequirements: JSON.stringify(['PHOTO', 'CHECKLIST']),
      evaluatorRole: 'MENTOR'
    },
    {
      title: 'Haftalık Vardiya ve Müşteri Yoğunluk Analizi',
      description: 'Mağazanın saatlik kasa fiş sayılarına göre önümüzdeki haftanın personel vardiya çizelgesini hazırlayıp şablon yükleyin.',
      competencyId: competencies['Vardiya & İş Gücü Planlaması']?.id,
      targetPositionId: createdPositions['Mağaza Müdür Yardımcısı'].id,
      evidenceRequirements: JSON.stringify(['PDF', 'REPORT']),
      evaluatorRole: 'MANAGER'
    }
  ];

  for (const ft of fieldTasksData) {
    await prisma.fieldTask.create({ data: ft });
  }

  // 6. Ensure default user profiles have Career Profiles & Competency Assessments
  const users = await prisma.user.findMany({ take: 10 });
  for (const user of users) {
    const profile = await prisma.userCareerProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        currentPositionId: createdPositions['Kasiyer & Reyon Çalışanı']?.id,
        nextTargetPositionId: createdPositions['Mağaza Müdür Yardımcısı']?.id,
        longTermTargetPositionId: createdPositions['Mağaza Müdürü']?.id,
        totalExperienceMonths: 18,
        currentPositionExperienceMonths: 12,
        weeklyLearningHours: 5,
        preferredLearningStyle: 'SAHA',
        careerGoalType: 'VERTICAL',
        onboardingCompleted: true,
        managerShareConsent: true,
        currentStore: user.companyName ? `${user.companyName} - Merkez Şube` : 'Sayar Marketler - Kadıköy Şubesi',
        region: 'Marmara Bölgesi',
        managedEmployeesCount: 0,
        shiftManagementExp: true
      }
    });

    // Add baseline competency assessments
    for (const compName of Object.keys(competencies)) {
      const comp = competencies[compName];
      let score = 3;
      if (compName.includes('Kasa') || compName.includes('Müşteri')) score = 4;
      if (compName.includes('Matematiği') || compName.includes('P&L')) score = 2;

      await prisma.userCompetencyAssessment.create({
        data: {
          userId: user.id,
          competencyId: comp.id,
          score: score,
          source: 'SELF',
          notes: 'Kariyer Pusulam ilk ön değerlendirme kaydı.'
        }
      });
    }

    // Add Readiness Score Record
    await prisma.readinessScore.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        targetPositionId: createdPositions['Mağaza Müdür Yardımcısı']?.id,
        technicalScore: 82,
        fieldScore: 78,
        competencyScore: 80,
        kpiScore: 85,
        managerScore: 80,
        mentorScore: 85,
        planAdherenceScore: 90,
        totalScore: 81.5,
        strengths: JSON.stringify(['Müşteri Deneyimi & Kasa Yönetimi (Seviye 4)', 'LMS Modül Tamamlama (%94)']),
        opportunities: JSON.stringify(['Stok Devir Hızı & Fire Hesabı (Seviye 2)', 'P&L Okuryazarlığı (Seviye 2)']),
        recommendedActions: JSON.stringify([
          'Mağaza İçi Stok, Sipariş ve Envanter Yönetimi eğitimini tamamla',
          'Raf Bulunurluğu Saha Görevini fotoğraflı olarak sisteme yükle',
          'Gelecek Salı günü mentorunla stok yönetimi vakasını görüş'
        ])
      }
    });
  }

  console.log('✅ Kariyer Pusulam seed data successfully created!');
}

seedCareerCompass()
  .catch((e) => {
    console.error('❌ Error seeding Kariyer Pusulam:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
