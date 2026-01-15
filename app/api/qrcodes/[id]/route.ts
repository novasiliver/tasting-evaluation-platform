import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateAndSaveQRCode } from '@/lib/qrcode';
import { getBaseUrl } from '@/lib/baseUrl';
import path from 'path';
import fs from 'fs';

/**
 * GET /api/qrcodes/[id]
 * Get a specific QR code by ID
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const qrCode = await prisma.qRCode.findUnique({
      where: { id: params.id },
      include: {
        product: {
          include: {
            user: {
              select: { id: true, name: true, company: true },
            },
            category: {
              select: { id: true, name: true },
            },
            certificate: {
              select: {
                id: true,
                certificateNumber: true,
                awardLevel: true,
                overallScore: true,
              },
            },
          },
        },
      },
    });

    if (!qrCode) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 });
    }

    // Check permissions
    if (session.user.role !== 'ADMIN' && qrCode.product.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(qrCode);
  } catch (error) {
    console.error('Error fetching QR code:', error);
    return NextResponse.json(
      { error: 'Failed to fetch QR code' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/qrcodes/[id]
 * Update QR code (activate/deactivate, regenerate)
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { isActive, regenerate } = body;

    const qrCode = await prisma.qRCode.findUnique({
      where: { id: params.id },
      include: {
        product: {
          include: {
            certificate: true,
          },
        },
      },
    });

    if (!qrCode) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 });
    }

    // Check permissions
    if (session.user.role !== 'ADMIN' && qrCode.product.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updateData: any = {};

    // Update active status
    if (typeof isActive === 'boolean') {
      updateData.isActive = isActive;
    }

    // Regenerate QR code if requested
    if (regenerate) {
      const baseUrl = getBaseUrl(request);
      const redirectUrl = `${baseUrl}/products/${qrCode.productId}?qr=true`;

      // Delete old QR code file (handle both old static path and new API path)
      const oldUrl = qrCode.qrCodeUrl;
      if (oldUrl.startsWith('/api/qrcodes/image/')) {
        // Extract filename from API path
        const oldFileName = oldUrl.replace('/api/qrcodes/image/', '');
        const oldFilePath = path.join(process.cwd(), 'public', 'qrcodes', oldFileName);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      } else if (oldUrl.startsWith('/qrcodes/')) {
        // Old static path
        const oldFilePath = path.join(process.cwd(), 'public', oldUrl);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      // Generate new QR code
      const qrCodeFileName = `qr-${qrCode.productId}-${Date.now()}.png`;
      const qrCodeDir = path.join(process.cwd(), 'public', 'qrcodes');
      const qrCodePath = path.join(qrCodeDir, qrCodeFileName);
      // Use API route instead of static file for dynamic serving
      const qrCodeUrl = `/api/qrcodes/image/${qrCodeFileName}`;

      const logoPath = path.join(process.cwd(), 'public', 'logo.png');
      const logoExists = fs.existsSync(logoPath);

      await generateAndSaveQRCode(redirectUrl, qrCodePath, {
        size: 500,
        margin: 4,
        logoPath: logoExists ? logoPath : undefined,
        logoSize: 80,
        foregroundColor: '#2E4F3A',
        backgroundColor: '#FFFFFF',
      });

      updateData.qrCodeUrl = qrCodeUrl;
      updateData.redirectUrl = redirectUrl;
    }

    const updatedQRCode = await prisma.qRCode.update({
      where: { id: params.id },
      data: updateData,
      include: {
        product: {
          include: {
            user: {
              select: { id: true, name: true, company: true },
            },
            category: {
              select: { id: true, name: true },
            },
            certificate: {
              select: {
                id: true,
                certificateNumber: true,
                awardLevel: true,
                overallScore: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(updatedQRCode);
  } catch (error) {
    console.error('Error updating QR code:', error);
    return NextResponse.json(
      { error: 'Failed to update QR code' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/qrcodes/[id]
 * Delete QR code
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const qrCode = await prisma.qRCode.findUnique({
      where: { id: params.id },
    });

    if (!qrCode) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 });
    }

    // Delete QR code file (handle both old static path and new API path)
    const qrCodeUrl = qrCode.qrCodeUrl;
    if (qrCodeUrl.startsWith('/api/qrcodes/image/')) {
      // Extract filename from API path
      const fileName = qrCodeUrl.replace('/api/qrcodes/image/', '');
      const filePath = path.join(process.cwd(), 'public', 'qrcodes', fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } else if (qrCodeUrl.startsWith('/qrcodes/')) {
      // Old static path
      const filePath = path.join(process.cwd(), 'public', qrCodeUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete from database
    await prisma.qRCode.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'QR code deleted successfully' });
  } catch (error) {
    console.error('Error deleting QR code:', error);
    return NextResponse.json(
      { error: 'Failed to delete QR code' },
      { status: 500 }
    );
  }
}

