import { readFile } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const UPLOAD_DIR = process.env.UPLOAD_DIR || (process.env.NODE_ENV === 'production' ? '/var/www/tastecert-uploads' : join(process.cwd(), 'uploads'));

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;
    const decodedId = decodeURIComponent(id);
    
    // Check if it's a certificate number or database ID
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

    // Check authorization: admins can download any, producers can download their own, or if published anyone can view
    if (session) {
      const isAdmin = session.user.role === 'ADMIN';
      const isOwner = session.user.role === 'PRODUCER' && certificate.product.user.id === session.user.id;
      
      if (!isAdmin && !isOwner && !certificate.isPublished) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }
    } else if (!certificate.isPublished) {
      // Not logged in and certificate not published
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    if (!certificate.pdfUrl) {
      return NextResponse.json(
        { error: 'PDF not generated yet. Please generate the certificate first.' },
        { status: 404 }
      );
    }

    // Extract filename from URL
    const urlParts = certificate.pdfUrl.split('/');
    const filename = urlParts[urlParts.length - 1];
    const filepath = join(UPLOAD_DIR, 'certificates', filename);

    // Read PDF file
    const file = await readFile(filepath);

    return new NextResponse(file, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="certificate-${certificate.certificateNumber}.pdf"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('Error serving certificate PDF:', error);
    if (error.code === 'ENOENT') {
      return NextResponse.json({ error: 'PDF file not found' }, { status: 404 });
    }
    return NextResponse.json(
      { error: 'Failed to serve certificate PDF' },
      { status: 500 }
    );
  }
}

