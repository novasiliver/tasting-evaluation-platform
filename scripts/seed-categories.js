const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const categories = [
  {
    id: 'cat-001',
    name: 'Olive Oil',
    description: 'Extra virgin and premium olive oils from around the world',
  },
  {
    id: 'cat-002',
    name: 'Wine',
    description: 'Red, white, rosé, and specialty wines',
  },
  {
    id: 'cat-003',
    name: 'Cheese',
    description: 'Artisan and specialty cheeses',
  },
  {
    id: 'cat-004',
    name: 'Chocolate',
    description: 'Dark, milk, white, and specialty chocolates',
  },
  {
    id: 'cat-005',
    name: 'Honey',
    description: 'Raw, organic, and specialty honeys',
  },
  {
    id: 'cat-006',
    name: 'Coffee',
    description: 'Specialty coffee beans and blends',
  },
  {
    id: 'cat-007',
    name: 'Spirits',
    description: 'Premium spirits, liqueurs, and distilled beverages',
  },
  {
    id: 'cat-008',
    name: 'Specialty Foods',
    description: 'Gourmet and artisan food products',
  },
];

async function main() {
  console.log('🌱 Seeding categories...');

  for (const category of categories) {
    try {
      const result = await prisma.category.upsert({
        where: { id: category.id },
        update: category,
        create: category,
      });
      console.log(`✅ Created/Updated: ${result.name}`);
    } catch (error) {
      console.error(`❌ Error creating ${category.name}:`, error.message);
    }
  }

  console.log('✨ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

