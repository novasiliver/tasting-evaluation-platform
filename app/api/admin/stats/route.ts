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

    // Get basic counts
    const [
      totalProducers,
      pendingSubmissions,
      awardedProducts,
      totalCertificates,
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'PRODUCER' } }),
      prisma.product.count({ where: { status: 'PENDING' } }),
      prisma.product.count({ where: { status: 'CERTIFIED' } }),
      prisma.certificate.count(),
    ]);

    // Get monthly submissions data (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlySubmissions = await prisma.product.groupBy({
      by: ['submittedAt'],
      where: {
        submittedAt: {
          gte: sixMonthsAgo,
        },
      },
      _count: true,
    });

    // Transform to monthly format
    const submissionsByMonth: { [key: string]: number } = {};
    monthlySubmissions.forEach((item) => {
      const month = new Date(item.submittedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      });
      submissionsByMonth[month] = (submissionsByMonth[month] || 0) + item._count;
    });

    // Get last 6 months with zero if no data
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      last6Months.push({
        month: monthKey,
        count: submissionsByMonth[monthKey] || 0,
      });
    }

    // Get monthly awards data by level
    const monthlyAwards = await prisma.certificate.findMany({
      where: {
        issueDate: {
          gte: sixMonthsAgo,
        },
      },
      select: {
        issueDate: true,
        awardLevel: true,
      },
    });

    // Group by month and award level
    const awardsByMonth: { [key: string]: { GOLD: number; SILVER: number; BRONZE: number } } = {};
    monthlyAwards.forEach((cert) => {
      const month = new Date(cert.issueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      });
      if (!awardsByMonth[month]) {
        awardsByMonth[month] = { GOLD: 0, SILVER: 0, BRONZE: 0 };
      }
      if (cert.awardLevel !== 'NONE') {
        awardsByMonth[month][cert.awardLevel as 'GOLD' | 'SILVER' | 'BRONZE']++;
      }
    });

    // Format awards data for last 6 months
    const awardsByMonthFormatted = last6Months.map((item) => ({
      month: item.month,
      gold: awardsByMonth[item.month]?.GOLD || 0,
      silver: awardsByMonth[item.month]?.SILVER || 0,
      bronze: awardsByMonth[item.month]?.BRONZE || 0,
    }));

    // Get recent activity (last 10 items)
    const [recentProducts, recentEvaluations, recentCertificates] = await Promise.all([
      prisma.product.findMany({
        take: 5,
        orderBy: { submittedAt: 'desc' },
        include: {
          user: { select: { name: true, company: true } },
          category: { select: { name: true } },
        },
      }),
      prisma.evaluation.findMany({
        take: 3,
        orderBy: { evaluatedAt: 'desc' },
        include: {
          product: {
            include: {
              user: { select: { name: true, company: true } },
            },
          },
        },
      }),
      prisma.certificate.findMany({
        take: 2,
        orderBy: { issueDate: 'desc' },
        include: {
          product: {
            include: {
              user: { select: { name: true, company: true } },
            },
          },
        },
      }),
    ]);

    // Format recent activity
    const recentActivity = [
      ...recentProducts.map((product) => ({
        type: 'submission',
        id: product.id,
        title: product.name,
        producer: product.user.company || product.user.name,
        date: product.submittedAt,
        status: product.status,
      })),
      ...recentEvaluations.map((evaluation) => ({
        type: 'evaluation',
        id: evaluation.id,
        title: evaluation.product.name,
        producer: evaluation.product.user.company || evaluation.product.user.name,
        date: evaluation.evaluatedAt,
        score: evaluation.totalScore || evaluation.overallScore,
      })),
      ...recentCertificates.map((cert) => ({
        type: 'certificate',
        id: cert.id,
        title: cert.product.name,
        producer: cert.product.user.company || cert.product.user.name,
        date: cert.issueDate,
        awardLevel: cert.awardLevel,
      })),
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    // Calculate trends (compare with previous period)
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const [currentProducers, previousProducers] = await Promise.all([
      prisma.user.count({
        where: {
          role: 'PRODUCER',
          createdAt: { gte: threeMonthsAgo },
        },
      }),
      prisma.user.count({
        where: {
          role: 'PRODUCER',
          createdAt: {
            gte: new Date(threeMonthsAgo.getTime() - 3 * 30 * 24 * 60 * 60 * 1000),
            lt: threeMonthsAgo,
          },
        },
      }),
    ]);

    const producerTrend = previousProducers > 0
      ? ((currentProducers - previousProducers) / previousProducers) * 100
      : 0;

    return NextResponse.json({
      stats: {
        totalProducers,
        pendingSubmissions,
        awardedProducts,
        certificateDownloads: totalCertificates, // Using total as proxy for now
      },
      trends: {
        producerTrend: producerTrend.toFixed(1),
      },
      charts: {
        monthlySubmissions: last6Months,
        monthlyAwards: awardsByMonthFormatted,
      },
      recentActivity,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}

