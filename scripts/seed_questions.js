const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const adapter = new PrismaBetterSqlite3({ url: 'dev.db' });
const prisma = new PrismaClient({ adapter });

const VERBATIM_QUESTIONS = [
  {
    number: 1,
    text: 'Kariyerinde en çok hangi başarı seni mutlu eder?',
    weight: 1.0,
    options: [
      { code: 'A', text: 'Ekip arkadaşlarımın günlük işlerini daha iyi yapmasına yardımcı olmak', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Bir vardiyanın sorunsuz tamamlanmasını sağlamak', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Bir mağazanın satış, çalışan ve müşteri hedeflerini gerçekleştirmek', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Birden fazla mağazanın performansını geliştirmek', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Tüm mağazalarda uygulanacak başarılı bir operasyon sistemi kurmak', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Şirket departmanlarını ortak hedefler doğrultusunda yönetmek', target: 'COO' },
      { code: 'G', text: 'Şirketin geleceğini ve büyüme yönünü belirlemek', target: 'CEO' }
    ]
  },
  {
    number: 2,
    text: 'En çok hangi tür sorumluluğu almak istersin?',
    weight: 1.5,
    options: [
      { code: 'A', text: 'Küçük bir ekibin günlük koordinasyonu', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Bir vardiyanın operasyon sorumluluğu', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Bir mağazanın tüm sonuçları', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Bir bölgedeki mağazaların sonuçları', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Şirketin perakende operasyon sistemi', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Şirket çapındaki kaynakların ve faaliyetlerin koordinasyonu', target: 'COO' },
      { code: 'G', text: 'Şirketin tamamının başarısı ve sürdürülebilirliği', target: 'CEO' }
    ]
  },
  {
    number: 3,
    text: 'Hangi problemi çözmek sana daha ilgi çekici gelir?',
    weight: 1.0,
    options: [
      { code: 'A', text: 'Ekip içindeki günlük görev ve iletişim problemi', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Vardiya, kasa, stok veya müşteri yoğunluğu problemi', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Mağazanın satış, fire veya personel verimliliği problemi', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Mağazalar arasındaki performans farkı', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Operasyon süreçlerindeki verimsizlik', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Departmanlar arasındaki hedef ve kaynak uyuşmazlığı', target: 'COO' },
      { code: 'G', text: 'Şirketin büyüme ve rekabet problemi', target: 'CEO' }
    ]
  },
  {
    number: 4,
    text: 'En çok hangi grubu geliştirmek istersin?',
    weight: 1.0,
    options: [
      { code: 'A', text: 'Yeni başlayan çalışanları', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Vardiya ekibini', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Mağaza çalışanlarını ve yönetici adaylarını', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Mağaza müdürlerini', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Bölge ve operasyon yöneticilerini', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Departman yöneticilerini', target: 'COO' },
      { code: 'G', text: 'Şirketin üst düzey liderlerini', target: 'CEO' }
    ]
  },
  {
    number: 5,
    text: 'İş gününün nasıl geçmesini tercih edersin?',
    weight: 1.5,
    options: [
      { code: 'A', text: 'Ekiple birlikte sahada çalışarak', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Günlük operasyonu ve vardiyayı koordine ederek', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Mağazanın çalışan, müşteri ve ticari sonuçlarını yöneterek', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Farklı mağazaları ziyaret edip yöneticilere rehberlik ederek', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Süreçleri analiz edip operasyon projeleri geliştirerek', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Departmanlar arası karar ve uygulamaları koordine ederek', target: 'COO' },
      { code: 'G', text: 'Şirketin geleceğine ilişkin stratejik kararlar alarak', target: 'CEO' }
    ]
  },
  {
    number: 6,
    text: 'Hangi sonuçtan doğrudan sorumlu olmak istersin?',
    weight: 1.0,
    options: [
      { code: 'A', text: 'Ekibin günlük görev başarısı', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Vardiyanın sorunsuz işlemesi', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Mağazanın kârlılığı ve müşteri memnuniyeti', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Bölgedeki mağazaların toplam performansı', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Operasyonun verimliliği ve standartları', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Şirketin genel faaliyet sonuçları', target: 'COO' },
      { code: 'G', text: 'Şirketin büyümesi, itibarı ve uzun vadeli değeri', target: 'CEO' }
    ]
  },
  {
    number: 7,
    text: 'Kararlarının hangi ölçekte etki yaratmasını istersin?',
    weight: 1.5,
    options: [
      { code: 'A', text: 'Kendi ekibimde', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Çalıştığım vardiyada', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Mağazamda', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Bir bölgedeki mağazalarda', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Tüm perakende operasyonunda', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Şirketin bütün departmanlarında', target: 'COO' },
      { code: 'G', text: 'Şirketin ve sektörün geleceğinde', target: 'CEO' }
    ]
  },
  {
    number: 8,
    text: 'Hangi konuda daha fazla eğitim almak istersin?',
    weight: 1.0,
    options: [
      { code: 'A', text: 'İletişim, iş öğretme ve ekip koordinasyonu', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Vardiya, stok, kasa ve günlük operasyon', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Mağaza yönetimi, P&L, satış ve ekip liderliği', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Çoklu mağaza, bölgesel bütçe ve yönetici koçluğu', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Süreç geliştirme, verimlilik ve dijital dönüşüm', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Finans, kaynak yönetimi ve şirket çapında icra', target: 'COO' },
      { code: 'G', text: 'Strateji, büyüme, yatırım ve üst düzey liderlik', target: 'CEO' }
    ]
  },
  {
    number: 9,
    text: 'Beş yıl sonra kendini en çok nerede görmek istersin?',
    weight: 1.5,
    options: [
      { code: 'A', text: 'Deneyimli bir takım lideri olarak', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Mağaza yönetim ekibinde', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Başarılı bir mağazanın yöneticisi olarak', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Bir mağaza bölgesini yönetirken', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Şirketin perakende operasyonlarını geliştirirken', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Üst yönetimde şirket faaliyetlerini yönetirken', target: 'COO' },
      { code: 'G', text: 'Şirketin genel yönetiminden sorumlu olurken', target: 'CEO' }
    ]
  },
  {
    number: 10,
    text: 'Hangi çalışma ortamı sana daha uygundur?',
    weight: 1.0,
    options: [
      { code: 'A', text: 'Ekiple yakın ve sürekli iletişim', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Hızlı ve yoğun vardiya ortamı', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Tek bir işletmenin uçtan uca yönetimi', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Sürekli saha ziyareti ve farklı mağazalar', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Proje, süreç ve merkez-saha koordinasyonu', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Departmanlar arası üst yönetim ortamı', target: 'COO' },
      { code: 'G', text: 'Stratejik kararların alındığı yönetim ortamı', target: 'CEO' }
    ]
  },
  {
    number: 11,
    text: 'Bir başarı hikâyesi yazacak olsan hangisini seçerdin?',
    weight: 1.0,
    options: [
      { code: 'A', text: 'Yeni çalışanların kısa sürede başarılı olmasını sağladım', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Zor bir vardiyayı ekibimle sorunsuz yönettim', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Mağazamın satışını artırıp fire ve turnover oranını düşürdüm', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Düşük performanslı bir bölgeyi başarıya taşıdım', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Tüm mağazalarda verimlilik sağlayan yeni bir sistem kurdum', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Şirketin farklı birimlerini büyük bir dönüşümde bir araya getirdim', target: 'COO' },
      { code: 'G', text: 'Şirketi yeni pazarlara taşıyan büyüme stratejisini yönettim', target: 'CEO' }
    ]
  },
  {
    number: 12,
    text: 'İnsan yönetiminin hangi tarafı sana daha çekici gelir?',
    weight: 1.0,
    options: [
      { code: 'A', text: 'Çalışana işi öğretmek', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Günlük görev ve performansı takip etmek', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Ekip kurmak, bağlılığı artırmak ve yönetici adayı yetiştirmek', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Mağaza müdürlerine koçluk yapmak', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Yönetim standartları ve liderlik sistemi oluşturmak', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Üst düzey yönetici ekiplerini ortak hedefte buluşturmak', target: 'COO' },
      { code: 'G', text: 'Kurum kültürünü ve liderlik anlayışını şekillendirmek', target: 'CEO' }
    ]
  },
  {
    number: 13,
    text: 'Hangi verileri incelemek seni daha çok ilgilendirir?',
    weight: 1.0,
    options: [
      { code: 'A', text: 'Günlük görev ve müşteri geri bildirimleri', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Vardiya, kasa ve stok sonuçları', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Mağaza satışı, fire, personel ve kârlılık', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Mağazalar arası bölgesel performans', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Şirket genelindeki operasyon ve verimlilik göstergeleri', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Bütçe, yatırım, kaynak ve departman performansı', target: 'COO' },
      { code: 'G', text: 'Pazar, rekabet, büyüme ve şirket değeri', target: 'CEO' }
    ]
  },
  {
    number: 14,
    text: 'İşinde hangi zaman aralığına odaklanmayı tercih edersin?',
    weight: 1.0,
    options: [
      { code: 'A', text: 'Günlük görevler', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Günlük ve haftalık operasyon', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Aylık ve yıllık mağaza hedefleri', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Yıllık bölge hedefleri', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Bir ila üç yıllık operasyon programları', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Üç ila beş yıllık şirket planları', target: 'COO' },
      { code: 'G', text: 'Beş yıl ve üzeri şirket vizyonu', target: 'CEO' }
    ]
  },
  {
    number: 15,
    text: 'Yetki kullanırken en çok hangi alanda rahat hissedersin?',
    weight: 1.5,
    options: [
      { code: 'A', text: 'Günlük görevleri yönlendirmek', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Vardiya içinde hızlı karar vermek', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Mağaza çalışanı, bütçe ve operasyon kararları almak', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Mağaza müdürlerini ve bölgesel kaynakları yönetmek', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Şirket genelindeki operasyon standartlarını belirlemek', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Büyük bütçe ve kaynak kararlarını koordine etmek', target: 'COO' },
      { code: 'G', text: 'Şirketin stratejik yönüyle ilgili nihai kararlar almak', target: 'CEO' }
    ]
  },
  {
    number: 16,
    text: 'Aşağıdaki görevlerden hangisini daha istekli üstlenirsin?',
    weight: 1.5,
    options: [
      { code: 'A', text: 'Yeni bir çalışana işi öğretmek', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Yoğun bir vardiyayı yönetmek', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Mağazanın yıllık iş planını hazırlamak', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'On mağazalık bölge için gelişim planı hazırlamak', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Tüm mağazalara uygulanacak yeni operasyon modelini tasarlamak', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Departmanların yıllık bütçe ve hedeflerini uyumlu hâle getirmek', target: 'COO' },
      { code: 'G', text: 'Şirketin yeni pazara giriş kararını hazırlamak', target: 'CEO' }
    ]
  },
  {
    number: 17,
    text: 'Karşılaşmak istediğin mesleki zorluk hangisidir?',
    weight: 1.0,
    options: [
      { code: 'A', text: 'Ekip içinde güven kazanmak', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Yoğun operasyonu hatasız yönetmek', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Mağazayı kârlı ve çalışan bağlılığı yüksek hâle getirmek', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Farklı mağaza ve yöneticileri ortak standarda taşımak', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Büyük ölçekli operasyon değişimini gerçekleştirmek', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Şirket kaynaklarını doğru önceliklere yönlendirmek', target: 'COO' },
      { code: 'G', text: 'Belirsiz bir pazarda şirketin geleceğine karar vermek', target: 'CEO' }
    ]
  },
  {
    number: 18,
    text: 'Hangi tür toplantıya katılmak sana daha anlamlı gelir?',
    weight: 1.0,
    options: [
      { code: 'A', text: 'Günlük ekip toplantısı', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Vardiya değerlendirme toplantısı', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Mağaza performans toplantısı', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Bölge değerlendirme toplantısı', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Operasyon ve süreç geliştirme toplantısı', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'İcra kurulu toplantısı', target: 'COO' },
      { code: 'G', text: 'Yönetim kurulu ve strateji toplantısı', target: 'CEO' }
    ]
  },
  {
    number: 19,
    text: 'Hangi cümle seni daha iyi tanımlar?',
    weight: 1.0,
    options: [
      { code: 'A', text: 'İnsanlara işi doğru yapmayı göstermeyi severim', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Günlük operasyonun kontrolüm altında olmasını severim', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Bir işletmenin tüm sonuçlarını sahiplenmek isterim', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Yöneticileri geliştirerek daha geniş sonuçlar üretmek isterim', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Sorunları tek tek çözmek yerine sistem kurmak isterim', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Farklı departmanları ortak amaçta yönetmek isterim', target: 'COO' },
      { code: 'G', text: 'Şirketin geleceğini şekillendirmek isterim', target: 'CEO' }
    ]
  },
  {
    number: 20,
    text: 'Kariyerinde ulaşmak istediğin en üst sorumluluk seviyesi hangisidir?',
    weight: 1.5,
    options: [
      { code: 'A', text: 'Küçük bir ekibi yönlendirmek', target: 'TAKIM_LIDERI' },
      { code: 'B', text: 'Bir vardiyayı yönetmek', target: 'MUDUR_YRD' },
      { code: 'C', text: 'Bir mağazayı yönetmek', target: 'MAGAZA_MUDURU' },
      { code: 'D', text: 'Bir mağaza bölgesini yönetmek', target: 'BOLGE_MUDURU' },
      { code: 'E', text: 'Perakende operasyon sistemini yönetmek', target: 'OPERASYON_DIREKTORU' },
      { code: 'F', text: 'Şirket faaliyetlerinin büyük bölümünü yönetmek', target: 'COO' },
      { code: 'G', text: 'Şirketin tamamını yönetmek', target: 'CEO' }
    ]
  }
];

const TIE_BREAKER_QUESTIONS = [
  {
    number: 21,
    text: 'İnsan yönetimi mi, süreç ve sistem geliştirme mi sana daha çekici geliyor?',
    options: [
      { code: 'TB1', text: 'İnsan ve Ekip Yönetimi (Liderlik & Koçluk)', target: 'HUMAN_MGMT' },
      { code: 'TB2', text: 'Süreç, Sistem ve Verimlilik Geliştirme (Operasyon & Sistem)', target: 'SYSTEM_MGMT' }
    ]
  },
  {
    number: 22,
    text: 'Tek bir işletmenin sonuçlarını mı, çok sayıda birimin ortak sonuçlarını mı yönetmek istersin?',
    options: [
      { code: 'TB1', text: 'Tek bir işletmeyi uçtan uca mükemmel yönetmek', target: 'SINGLE_STORE' },
      { code: 'TB2', text: 'Çok sayıda şubenin ortak performansını ve stratejisini yönetmek', target: 'MULTI_STORE' }
    ]
  },
  {
    number: 23,
    text: 'Günlük uygulamaya mı, uzun vadeli stratejiye mi daha yakın çalışmak istersin?',
    options: [
      { code: 'TB1', text: 'Günlük sahadaki pratik uygulamalara ve aksiyonlara', target: 'TACTICAL' },
      { code: 'TB2', text: 'Geleceğin yönünü belirleyen uzun vadeli stratejilere', target: 'STRATEGIC' }
    ]
  }
];

async function run() {
  try {
    let test = await prisma.careerOrientationTest.findFirst({ where: { active: true } });
    if (!test) {
      test = await prisma.careerOrientationTest.create({
        data: {
          title: 'Perakende Kariyer Yönelim Testi',
          description: 'İlgi alanlarını, almak istediğin sorumlulukları ve gelecekte yapmak istediğin işleri keşfet.',
          version: 'v1.0',
          active: true,
          cooldownMonths: 6
        }
      });
    }

    await prisma.careerOrientationQuestion.deleteMany({ where: { testId: test.id } });
    console.log('Deleted existing questions.');

    for (const q of VERBATIM_QUESTIONS) {
      await prisma.careerOrientationQuestion.create({
        data: {
          testId: test.id,
          questionNumber: q.number,
          text: q.text,
          weight: q.weight,
          isTieBreaker: false,
          active: true,
          options: {
            create: q.options.map(opt => ({
              optionCode: opt.code,
              text: opt.text,
              targetPositionId: opt.target,
              directScore: 3.0,
              adjacentScore: 1.0
            }))
          }
        }
      });
    }

    for (const tb of TIE_BREAKER_QUESTIONS) {
      await prisma.careerOrientationQuestion.create({
        data: {
          testId: test.id,
          questionNumber: tb.number,
          text: tb.text,
          weight: 1.0,
          isTieBreaker: true,
          active: true,
          options: {
            create: tb.options.map(opt => ({
              optionCode: opt.code,
              text: opt.text,
              targetPositionId: opt.target,
              directScore: 3.0,
              adjacentScore: 0.0
            }))
          }
        }
      });
    }

    console.log('✅ Successfully seeded 20 questions + 3 tie breakers into dev.db!');
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
