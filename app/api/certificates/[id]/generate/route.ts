import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { generateCertificatePDF } from '@/lib/certificateGenerator';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const decodedId = decodeURIComponent(id);
    
    // Check if it's a certificate number or database ID
    const isCertificateNumber = decodedId.match(/^TC-\d{4}-\d{6}$/);
    
    // Get certificate with product and user info
    const certificate = await prisma.certificate.findUnique({
      where: isCertificateNumber 
        ? { certificateNumber: decodedId }
        : { id: decodedId },
      include: {
        product: {
          include: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }

    // Allow admins to generate any certificate, or producers to generate their own
    const isAdmin = session.user.role === 'ADMIN';
    const isOwner = session.user.role === 'PRODUCER' && certificate.product.user.id === session.user.id;

    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const pdfUrl = await generateCertificatePDF(certificate.id);

    return NextResponse.json({ pdfUrl, message: 'Certificate PDF generated successfully' });
  } catch (error: any) {
    console.error('Error generating certificate PDF:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate certificate PDF' },
      { status: 500 }
    );
  }
}

