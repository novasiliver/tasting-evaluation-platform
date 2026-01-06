import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const certificateNumber = searchParams.get('number');

    if (!certificateNumber) {
      return NextResponse.json(
        { error: 'Certificate number is required' },
        { status: 400 }
      );
    }

    // Find certificate in database
    const certificate = await prisma.certificate.findUnique({
      where: { 
        certificateNumber: certificateNumber.toUpperCase() 
      },
      include: {
        product: {
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
          },
        },
      },
    });

    if (!certificate) {
      return NextResponse.json(
        { 
          valid: false, 
          message: 'Certificate not found. Please check the number and try again.' 
        },
        { status: 404 }
      );
    }

    // Check if certificate is published
    if (!certificate.isPublished) {
      return NextResponse.json(
        { 
          valid: false, 
          message: 'This certificate is not yet published.' 
        },
        { status: 403 }
      );
    }

    // Return certificate details
    return NextResponse.json({
      valid: true,
      message: `✓ Certificate ${certificate.certificateNumber} is valid and active.`,
      certificate: {
        number: certificate.certificateNumber,
        productName: certificate.product.name,
        producer: certificate.product.user.company || certificate.product.user.name,
        category: certificate.product.category?.name,
        awardLevel: certificate.awardLevel,
        score: certificate.overallScore,
        issueDate: certificate.issueDate,
      },
    });
  } catch (error) {
    console.error('Error verifying certificate:', error);
    return NextResponse.json(
      { error: 'Failed to verify certificate' },
      { status: 500 }
    );
  }
}

