import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all producers with their product counts
    const producers = await prisma.user.findMany({
      where: {
        role: 'PRODUCER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        phone: true,
        accountStatus: true,
        createdAt: true,
        _count: {
          select: {
            products: true,
          },
        },
        products: {
          select: {
            id: true,
            categoryId: true,
            status: true,
            productionCountry: true,
          },
          take: 10, // Get recent products for category info
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform data
    const transformed = producers.map((producer) => {
      // Get most common category from products
      const categories = producer.products.map(p => p.categoryId);
      const categoryCounts: { [key: string]: number } = {};
      categories.forEach(catId => {
        categoryCounts[catId] = (categoryCounts[catId] || 0) + 1;
      });
      const mostCommonCategoryId = Object.keys(categoryCounts).reduce((a, b) =>
        categoryCounts[a] > categoryCounts[b] ? a : b, categories[0] || ''
      );

      // Get most common country
      const countries = producer.products
        .map(p => p.productionCountry)
        .filter(Boolean) as string[];
      const countryCounts: { [key: string]: number } = {};
      countries.forEach(country => {
        countryCounts[country] = (countryCounts[country] || 0) + 1;
      });
      const mostCommonCountry = Object.keys(countryCounts).reduce((a, b) =>
        countryCounts[a] > countryCounts[b] ? a : b, countries[0] || ''
      );

      // Use account status from database
      const statusMap: { [key: string]: string } = {
        'APPROVED': 'Active',
        'REJECTED': 'Rejected',
        'PENDING': 'Pending Review',
      };
      const status = statusMap[producer.accountStatus] || 'Pending Review';

      return {
        id: producer.id,
        name: producer.name,
        email: producer.email,
        company: producer.company,
        phone: producer.phone,
        country: mostCommonCountry || producer.products[0]?.productionCountry || 'Unknown',
        accountStatus: producer.accountStatus,
        status,
        products: producer._count.products,
        registered: producer.createdAt,
        categoryId: mostCommonCategoryId,
      };
    });

    // Get category names for the most common categories
    const categoryIds = Array.from(new Set(transformed.map(p => p.categoryId).filter(Boolean)));
    const categories = await prisma.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const categoryMap = new Map(categories.map(c => [c.id, c.name]));

    // Add category names
    const result = transformed.map(producer => ({
      ...producer,
      category: producer.categoryId ? categoryMap.get(producer.categoryId) || 'Unknown' : 'Unknown',
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching producers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch producers' },
      { status: 500 }
    );
  }
}

