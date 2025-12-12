import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const {
      productId,
      appearanceScore,
      aromaScore,
      tasteScore,
      aftertasteScore,
      harmonyScore,
      totalScore,
      tastingNotes,
      technicalNotes,
      recommendations,
      attributes,
    } = data;

    // Check if evaluation already exists for this product
    const existingEvaluation = await prisma.evaluation.findUnique({
      where: { productId },
    });

    // Calculate overallScore from totalScore if not provided
    const overallScore = totalScore || 
      ((appearanceScore || 0) + aromaScore + tasteScore + (aftertasteScore || 0) + (harmonyScore || 0)) / 
      (1 + (appearanceScore ? 1 : 0) + 1 + (aftertasteScore ? 1 : 0) + (harmonyScore ? 1 : 0));

    // Create or update evaluation
    const evaluationData = {
      judgeId: session.user.id,
      evaluatedBy: session.user.id,
      appearanceScore: appearanceScore || null,
      aromaScore,
      tasteScore,
      aftertasteScore: aftertasteScore || null,
      harmonyScore: harmonyScore || null,
      totalScore: totalScore || overallScore,
      overallScore, // Keep for backward compatibility
      tastingNotes: tastingNotes || null,
      technicalNotes: technicalNotes || null,
      recommendations: recommendations || null,
      attributes: attributes ? JSON.stringify(attributes) : null,
      evaluationDate: new Date(),
      evaluatedAt: new Date(),
    };

    const evaluation = existingEvaluation
      ? await prisma.evaluation.update({
          where: { productId },
          data: evaluationData,
        })
      : await prisma.evaluation.create({
          data: {
            productId,
            ...evaluationData,
          },
        });

    // Update product status to EVALUATED
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { status: 'EVALUATED' },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
        certificate: {
          select: {
            awardLevel: true,
          },
        },
      },
    });

    // Send email notification (non-blocking)
    if (updatedProduct.user.email) {
      import('@/lib/email').then(({ sendEvaluationCompleteEmail }) => {
        sendEvaluationCompleteEmail(
          updatedProduct.user.email!,
          updatedProduct.user.name || 'Producer',
          updatedProduct.name,
          evaluation.overallScore,
          updatedProduct.certificate?.awardLevel || null
        ).catch(console.error);
      });
    }

    return NextResponse.json(evaluation, { status: 201 });
  } catch (error) {
    console.error('Error creating evaluation:', error);
    return NextResponse.json(
      { error: 'Failed to create evaluation' },
      { status: 500 }
    );
  }
}

