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

    const { productId, awardLevel, certificateNumber } = await request.json();
    
    console.log('Certificate creation request - Award Level:', awardLevel);

    // Check if certificate already exists
    const existing = await prisma.certificate.findUnique({
      where: { productId },
    });

    // Auto-generate certificate number if not provided
    let finalCertificateNumber = certificateNumber;
    if (!finalCertificateNumber) {
      const year = new Date().getFullYear();
      const prefix = `TC-${year}-`;
      
      // Get the latest certificate number for this year
      const latestCert = await prisma.certificate.findFirst({
        where: {
          certificateNumber: {
            startsWith: prefix,
          },
        },
        orderBy: {
          certificateNumber: 'desc',
        },
      });

      let sequence = 1;
      if (latestCert) {
        const latestSeq = parseInt(latestCert.certificateNumber.replace(prefix, ''));
        if (!isNaN(latestSeq)) {
          sequence = latestSeq + 1;
        }
      }

      finalCertificateNumber = `${prefix}${sequence.toString().padStart(6, '0')}`;
    } else {
      // Check if provided certificate number is unique
      const existingNumber = await prisma.certificate.findUnique({
        where: { certificateNumber: finalCertificateNumber },
      });

      if (existingNumber) {
        return NextResponse.json(
          { error: 'Certificate number already exists' },
          { status: 400 }
        );
      }
    }

    // Get product evaluation to calculate overallScore
    const evaluation = await prisma.evaluation.findUnique({
      where: { productId },
      select: { totalScore: true, overallScore: true },
    });

    // Create or update certificate
    const certificate = existing
        ? await prisma.certificate.update({
          where: { productId },
          data: {
            awardLevel,
            overallScore: evaluation?.totalScore || evaluation?.overallScore || 0,
            isPublished: true, // Ensure certificate is published when updated
          },
          include: {
            product: {
              include: {
                user: {
                  select: {
                    email: true,
                    name: true,
                  },
                },
              },
            },
          },
        })
      : await prisma.certificate.create({
          data: {
            productId,
            awardLevel,
            certificateNumber: finalCertificateNumber,
            overallScore: evaluation?.totalScore || evaluation?.overallScore || 0,
            issueDate: new Date(),
            isPublished: true, // Certificates are published by default when created
          },
          include: {
            product: {
              include: {
                user: {
                  select: {
                    email: true,
                    name: true,
                  },
                },
              },
            },
          },
        });

    // Update product status to CERTIFIED
    await prisma.product.update({
      where: { id: productId },
      data: { status: 'CERTIFIED' },
    });

    // Send email notification (non-blocking)
    if (certificate.product.user.email) {
      import('@/lib/email').then(({ sendCertificateIssuedEmail }) => {
        sendCertificateIssuedEmail(
          certificate.product.user.email!,
          certificate.product.user.name || 'Producer',
          certificate.product.name,
          certificate.certificateNumber,
          certificate.awardLevel
        ).catch(console.error);
      });
    }

    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    console.error('Error creating certificate:', error);
    return NextResponse.json(
      { error: 'Failed to create certificate' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
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
      orderBy: {
        issueDate: 'desc',
      },
    });

    return NextResponse.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certificates' },
      { status: 500 }
    );
  }
}

