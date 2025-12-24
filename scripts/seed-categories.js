const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const categories = [
  {
    id: 'cat-001',
    name: 'Olive Oil',
    slug: 'olive-oil',
    description: 'Extra virgin and premium olive oils from artisan producers worldwide',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
    isActive: true,
  },
  {
    id: 'cat-002',
    name: 'Wine',
    slug: 'wine',
    description: 'Fine red, white, rosé, and specialty wines from renowned vineyards',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
    isActive: true,
  },
  {
    id: 'cat-003',
    name: 'Cheese',
    slug: 'cheese',
    description: 'Artisan and specialty cheeses crafted with traditional methods',
    imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&q=80',
    isActive: true,
  },
  {
    id: 'cat-004',
    name: 'Chocolate',
    slug: 'chocolate',
    description: 'Premium dark, milk, white, and specialty chocolates',
    imageUrl: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80',
    isActive: true,
  },
  {
    id: 'cat-005',
    name: 'Honey',
    slug: 'honey',
    description: 'Raw, organic, and specialty honeys from sustainable apiaries',
    imageUrl: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/df8bd7cd-7cbb-4b65-8e22-3e966cd83b1c_1600w.jpg',
    isActive: true,
  },
  {
    id: 'cat-006',
    name: 'Coffee',
    slug: 'coffee',
    description: 'Single-origin specialty coffee beans and artisan blends',
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
    isActive: true,
  },
  {
    id: 'cat-007',
    name: 'Spirits',
    slug: 'spirits',
    description: 'Premium spirits, liqueurs, and craft distilled beverages',
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
    isActive: true,
  },
  {
    id: 'cat-008',
    name: 'Tea',
    slug: 'tea',
    description: 'Premium loose-leaf teas and specialty tea blends',
    imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80',
    isActive: true,
  },
  {
    id: 'cat-009',
    name: 'Bakery',
    slug: 'bakery',
    description: 'Artisan breads, pastries, and baked goods',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    isActive: true,
  },
  {
    id: 'cat-010',
    name: 'Dairy',
    slug: 'dairy',
    description: 'Premium milk, butter, yogurt, and dairy products',
    imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&q=80',
    isActive: true,
  },
  {
    id: 'cat-011',
    name: 'Vinegar',
    slug: 'vinegar',
    description: 'Aged balsamic and specialty vinegars',
    imageUrl: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=800&q=80',
    isActive: true,
  },
  {
    id: 'cat-012',
    name: 'Preserves',
    slug: 'preserves',
    description: 'Artisan jams, marmalades, and fruit preserves',
    imageUrl: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=800&q=80',
    isActive: true,
  },
  {
    id: 'cat-013',
    name: 'Confectionery',
    slug: 'confectionery',
    description: 'Artisan candies, sweets, and confections',
    imageUrl: 'https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&q=80',
    isActive: true,
  },
  {
    id: 'cat-014',
    name: 'Seafood',
    slug: 'seafood',
    description: 'Sustainable and premium seafood products',
    imageUrl: 'https://images.unsplash.com/photo-1615485500834-bc10199bc768?w=800&q=80',
    isActive: true,
  },
  {
    id: 'cat-015',
    name: 'Spices',
    slug: 'spices',
    description: 'Premium spices and specialty seasonings',
    imageUrl: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4376fa83-b9cb-4b88-b256-86cb4e040344_1600w.jpg',
    isActive: true,
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
  console.log(`📊 Total categories: ${categories.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
