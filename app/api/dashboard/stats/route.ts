import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'PRODUCER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Get basic counts
    const [
      totalProducts,
      pendingProducts,
      evaluatedProducts,
      certifiedProducts,
    ] = await Promise.all([
      prisma.product.count({ where: { userId } }),
      prisma.product.count({ where: { userId, status: 'PENDING' } }),
      prisma.product.count({ where: { userId, status: 'EVALUATED' } }),
      prisma.product.count({ where: { userId, status: 'CERTIFIED' } }),
    ]);

    // Get recent products
    const recentProducts = await prisma.product.findMany({
      where: { userId },
      take: 5,
      orderBy: { submittedAt: 'desc' },
      include: {
        category: { select: { name: true } },
        evaluation: { select: { totalScore: true, overallScore: true } },
        certificate: { select: { awardLevel: true } },
      },
    });

    // Get certificates count and award breakdown
    const [certificatesCount, goldCount, silverCount, bronzeCount] = await Promise.all([
      prisma.certificate.count({
        where: { product: { userId } },
      }),
      prisma.certificate.count({
        where: { product: { userId }, awardLevel: 'GOLD' },
      }),
      prisma.certificate.count({
        where: { product: { userId }, awardLevel: 'SILVER' },
      }),
      prisma.certificate.count({
        where: { product: { userId }, awardLevel: 'BRONZE' },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalProducts,
        pendingProducts,
        evaluatedProducts,
        certifiedProducts,
        certificatesCount,
        goldCount,
        silverCount,
        bronzeCount,
      },
      recentProducts: recentProducts.map((product) => ({
        id: product.id,
        name: product.name,
        category: product.category.name,
        status: product.status,
        submittedAt: product.submittedAt,
        score: product.evaluation?.totalScore || product.evaluation?.overallScore || null,
        awardLevel: product.certificate?.awardLevel || null,
      })),
    });
  } catch (error) {
    console.error('Error fetching producer stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}

