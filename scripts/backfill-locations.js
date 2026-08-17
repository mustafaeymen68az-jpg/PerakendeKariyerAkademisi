const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const { PrismaClient } = require('@prisma/client');

async function main() {
  const adapter = new PrismaBetterSqlite3({ url: 'dev.db' });
  const prisma = new PrismaClient({ adapter });

  try {
    const result = await prisma.siteVisit.updateMany({
      where: {
        OR: [{ city: null }, { country: null }]
      },
      data: {
        city: 'İstanbul',
        country: 'Türkiye'
      }
    });
    console.log('Güncellenen ziyaret kaydı sayısı:', result.count);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
