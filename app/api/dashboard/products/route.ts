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

    const products = await prisma.product.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        evaluation: {
          select: {
            id: true,
            totalScore: true,
            overallScore: true,
            evaluatedAt: true,
          },
        },
        certificate: {
          select: {
            id: true,
            awardLevel: true,
            certificateNumber: true,
            issueDate: true,
            isPublished: true,
            pdfUrl: true,
          },
        },
      },
      orderBy: {
        submittedAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching producer products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

