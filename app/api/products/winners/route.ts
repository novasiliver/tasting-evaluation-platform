import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        status: 'CERTIFIED',
        certificate: {
          isNot: null,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            company: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        certificate: {
          select: {
            id: true,
            awardLevel: true,
            issueDate: true,
            certificateNumber: true,
            isPublished: true,
          },
        },
        evaluation: {
          select: {
            totalScore: true,
            evaluationDate: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    // Transform to match frontend format
    const transformedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      producer: product.user.company || product.user.name,
      category: product.category?.name.toLowerCase().replace(/ /g, '-') || 'other',
      categoryLabel: product.category?.name || 'Other',
      award: product.certificate?.awardLevel || 'BRONZE',
      year: product.certificate?.issueDate
        ? new Date(product.certificate.issueDate).getFullYear().toString()
        : new Date().getFullYear().toString(),
      image: product.imageUrl || `https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=400&h=400&fit=crop`,
      summary: product.description?.substring(0, 150) || '',
      description: product.description || '',
      score: product.evaluation?.totalScore || 0,
      origin: product.productionCountry || 'Unknown',
      certDate: product.certificate?.issueDate
        ? new Date(product.certificate.issueDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '',
      isPublished: product.certificate?.isPublished ?? true,
      certificateId: product.certificate?.id,
      judges: [], // We can add judges later if needed
    }));

    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error('Error fetching winners:', error);
    return NextResponse.json({ error: 'Failed to fetch winners' }, { status: 500 });
  }
}

