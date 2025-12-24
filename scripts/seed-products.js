const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding sample products and users...');

  // First, create a demo producer user
  const demoProducer = await prisma.user.upsert({
    where: { email: 'demo@producer.com' },
    update: {},
    create: {
      email: 'demo@producer.com',
      username: 'demoproducer',
      password: '$2a$10$demopasswordhash', // Hashed password placeholder
      name: 'Demo Producer',
      company: 'Artisan Foods Co.',
      role: 'PRODUCER',
      emailVerified: new Date(),
    },
  });
  console.log(`✅ Created demo producer: ${demoProducer.name}`);

  // Get all categories
  const categories = await prisma.category.findMany();
  
  if (categories.length === 0) {
    console.log('⚠️  No categories found. Please run seed-categories.js first.');
    return;
  }

  const sampleProducts = [
    {
      name: 'Highland Estate Reserve Coffee',
      description: 'Single-origin Arabica beans from highland estates, featuring notes of dark chocolate, caramel, and citrus with a smooth, balanced finish.',
      categoryId: categories.find(c => c.name === 'Coffee')?.id || categories[0].id,
      imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
      productionCountry: 'Colombia',
      productionRegion: 'Huila',
      volume: '250g',
      status: 'CERTIFIED',
    },
    {
      name: 'Mediterranean Extra Virgin Olive Oil',
      description: 'Cold-pressed extra virgin olive oil from century-old olive groves. Rich, fruity flavor with a peppery finish.',
      categoryId: categories.find(c => c.name === 'Olive Oil')?.id || categories[0].id,
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
      productionCountry: 'Greece',
      productionRegion: 'Crete',
      volume: '500ml',
      status: 'CERTIFIED',
    },
    {
      name: 'Aged Balsamic Vinegar',
      description: 'Traditional 12-year aged balsamic vinegar from Modena. Complex, sweet-tart flavor with woody notes.',
      categoryId: categories.find(c => c.name === 'Vinegar')?.id || categories[0].id,
      imageUrl: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=800&q=80',
      productionCountry: 'Italy',
      productionRegion: 'Modena',
      volume: '250ml',
      status: 'CERTIFIED',
    },
    {
      name: 'Wildflower Raw Honey',
      description: 'Unfiltered raw honey harvested from wildflower meadows. Rich floral notes with natural enzymatic properties.',
      categoryId: categories.find(c => c.name === 'Honey')?.id || categories[0].id,
      imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=800&q=80',
      productionCountry: 'New Zealand',
      productionRegion: 'Canterbury',
      volume: '350g',
      status: 'CERTIFIED',
    },
    {
      name: 'Artisan Sourdough Bread',
      description: 'Traditional sourdough made with organic flour and wild yeast starter. Crispy crust and tangy, complex flavor.',
      categoryId: categories.find(c => c.name === 'Bakery')?.id || categories[0].id,
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
      productionCountry: 'France',
      productionRegion: 'Provence',
      volume: '800g',
      status: 'EVALUATED',
    },
    {
      name: 'Heritage Cheddar Cheese',
      description: 'Traditionally crafted cheddar aged for 18 months. Sharp, nutty flavor with crystalline texture.',
      categoryId: categories.find(c => c.name === 'Cheese')?.id || categories[0].id,
      imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&q=80',
      productionCountry: 'England',
      productionRegion: 'Somerset',
      volume: '200g',
      status: 'CERTIFIED',
    },
    {
      name: 'Dark Chocolate 85%',
      description: 'Single-origin dark chocolate with 85% cacao. Intense cocoa notes with hints of red berries.',
      categoryId: categories.find(c => c.name === 'Chocolate')?.id || categories[0].id,
      imageUrl: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80',
      productionCountry: 'Ecuador',
      productionRegion: 'Esmeraldas',
      volume: '100g',
      status: 'CERTIFIED',
    },
    {
      name: 'Organic Sencha Green Tea',
      description: 'Premium Japanese green tea with sweet, grassy notes and umami richness. First flush harvest.',
      categoryId: categories.find(c => c.name === 'Tea')?.id || categories[0].id,
      imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80',
      productionCountry: 'Japan',
      productionRegion: 'Shizuoka',
      volume: '50g',
      status: 'UNDER_REVIEW',
    },
    {
      name: 'Craft Gin with Botanicals',
      description: 'Small-batch gin infused with juniper, coriander, and local botanicals. Balanced and aromatic.',
      categoryId: categories.find(c => c.name === 'Spirits')?.id || categories[0].id,
      imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
      productionCountry: 'Scotland',
      productionRegion: 'Highlands',
      volume: '700ml',
      alcoholContent: '42%',
      status: 'PENDING',
    },
    {
      name: 'Saffron Threads',
      description: 'Premium quality saffron threads hand-harvested from crocus flowers. Intense aroma and deep golden color.',
      categoryId: categories.find(c => c.name === 'Spices')?.id || categories[0].id,
      imageUrl: 'https://images.unsplash.com/photo-1596040033229-a0b3b83294b4?w=800&q=80',
      productionCountry: 'Iran',
      productionRegion: 'Khorasan',
      volume: '5g',
      status: 'CERTIFIED',
    },
  ];

  let createdCount = 0;
  for (const product of sampleProducts) {
    try {
      const created = await prisma.product.create({
        data: {
          ...product,
          userId: demoProducer.id,
        },
      });
      
      // Add evaluations for CERTIFIED and EVALUATED products
      if (product.status === 'CERTIFIED' || product.status === 'EVALUATED') {
        const score = 8.5 + Math.random() * 1.5; // Random score between 8.5-10.0
        await prisma.evaluation.create({
          data: {
            productId: created.id,
            appearanceScore: 8 + Math.random() * 2,
            aromaScore: 8 + Math.random() * 2,
            tasteScore: 8 + Math.random() * 2,
            aftertasteScore: 8 + Math.random() * 2,
            harmonyScore: 8 + Math.random() * 2,
            totalScore: score,
            overallScore: score,
            tastingNotes: 'Excellent quality product demonstrating exceptional craftsmanship and traditional production methods.',
            technicalNotes: 'Meets all quality standards and certification requirements.',
            recommendations: 'Highly recommended for premium retail placement.',
          },
        });

        // Add certificate for CERTIFIED products
        if (product.status === 'CERTIFIED') {
          const awardLevel = score >= 9.5 ? 'GOLD' : score >= 9.0 ? 'GOLD' : score >= 8.5 ? 'SILVER' : 'BRONZE';
          await prisma.certificate.create({
            data: {
              productId: created.id,
              certificateNumber: `TC-${new Date().getFullYear()}-${String(createdCount + 1).padStart(6, '0')}`,
              awardLevel: awardLevel,
              overallScore: score,
              isPublished: true,
              issueDate: new Date(),
            },
          });
        }
      }
      
      console.log(`✅ Created product: ${created.name} (${product.status})`);
      createdCount++;
    } catch (error) {
      console.error(`❌ Error creating ${product.name}:`, error.message);
    }
  }

  console.log('✨ Seeding complete!');
  console.log(`📊 Total products created: ${createdCount}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

