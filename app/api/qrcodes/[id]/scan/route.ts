import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/qrcodes/[id]/scan
 * Track QR code scan (public endpoint)
 * Also accepts productId in query string as alternative
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    let qrCode;

    // Check if we have a productId in query string (for easier tracking)
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (productId) {
      // Find QR code by product ID
      qrCode = await prisma.qRCode.findUnique({
        where: { productId },
      });
    } else {
      // Find by QR code ID
      qrCode = await prisma.qRCode.findUnique({
        where: { id: params.id },
      });
    }

    if (!qrCode) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 });
    }

    if (!qrCode.isActive) {
      return NextResponse.json({ error: 'QR code is inactive' }, { status: 403 });
    }

    // Update scan count and last scanned timestamp
    await prisma.qRCode.update({
      where: { id: qrCode.id },
      data: {
        scanCount: {
          increment: 1,
        },
        lastScannedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking QR code scan:', error);
    return NextResponse.json(
      { error: 'Failed to track scan' },
      { status: 500 }
    );
  }
}

