import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/qrcodes/track/scan
 * Track QR code scan by productId (public endpoint, no auth required)
 */
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Find QR code by product ID
    const qrCode = await prisma.qRCode.findUnique({
      where: { productId },
    });

    if (!qrCode) {
      // QR code doesn't exist yet, that's okay - just return success
      return NextResponse.json({ success: true, tracked: false });
    }

    if (!qrCode.isActive) {
      // QR code is inactive, don't track but return success
      return NextResponse.json({ success: true, tracked: false, inactive: true });
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

    return NextResponse.json({ success: true, tracked: true });
  } catch (error) {
    console.error('Error tracking QR code scan:', error);
    // Don't fail the page load if tracking fails
    return NextResponse.json({ success: true, tracked: false });
  }
}

