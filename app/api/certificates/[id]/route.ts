import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const decodedId = decodeURIComponent(id);
    
    // Check if it's a certificate number (TC-YYYY-XXXXXX) or database ID
    const isCertificateNumber = decodedId.match(/^TC-\d{4}-\d{6}$/);
    
    const certificate = await prisma.certificate.findUnique({
      where: isCertificateNumber 
        ? { certificateNumber: decodedId }
        : { id: decodedId },
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
        { error: 'Certificate not found' },
        { status: 404 }
      );
    }

    // For public access, only return published certificates
    // Check if this is a public request (no auth header or session)
    const session = await getServerSession(authOptions);
    if (!session && !certificate.isPublished) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      );
    }

    // Return formatted data for public viewing
    return NextResponse.json({
      certificateNumber: certificate.certificateNumber,
      awardLevel: certificate.awardLevel,
      overallScore: certificate.overallScore,
      issueDate: certificate.issueDate,
      product: {
        name: certificate.product.name,
        category: {
          name: certificate.product.category.name,
        },
        user: {
          name: certificate.product.user.name,
          company: certificate.product.user.company,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching certificate:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certificate' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const decodedId = decodeURIComponent(id);
    const body = await request.json();
    const { awardLevel, isPublished, validUntil, overallScore } = body;

    // Check if it's a certificate number or database ID
    const isCertificateNumber = decodedId.match(/^TC-\d{4}-\d{6}$/);

    const updateData: any = {};
    if (awardLevel !== undefined) updateData.awardLevel = awardLevel;
    if (isPublished !== undefined) updateData.isPublished = isPublished;
    if (validUntil !== undefined) updateData.validUntil = validUntil ? new Date(validUntil) : null;
    if (overallScore !== undefined) updateData.overallScore = overallScore;

    const certificate = await prisma.certificate.update({
      where: isCertificateNumber 
        ? { certificateNumber: decodedId }
        : { id: decodedId },
      data: updateData,
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

    return NextResponse.json(certificate);
  } catch (error: any) {
    console.error('Error updating certificate:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update certificate' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const decodedId = decodeURIComponent(id);
    
    // Check if it's a certificate number or database ID
    const isCertificateNumber = decodedId.match(/^TC-\d{4}-\d{6}$/);

    // Check if certificate exists
    const certificate = await prisma.certificate.findUnique({
      where: isCertificateNumber 
        ? { certificateNumber: decodedId }
        : { id: decodedId },
    });

    if (!certificate) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      );
    }

    // Delete certificate
    await prisma.certificate.delete({
      where: isCertificateNumber 
        ? { certificateNumber: decodedId }
        : { id: decodedId },
    });

    // Update product status back to EVALUATED
    await prisma.product.update({
      where: { id: certificate.productId },
      data: { status: 'EVALUATED' },
    });

    return NextResponse.json({ message: 'Certificate deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting certificate:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete certificate' },
      { status: 500 }
    );
  }
}

