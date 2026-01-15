import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/qrcodes/public?productId={id}
 * Get QR code for a product (public endpoint, no auth required)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const qrCode = await prisma.qRCode.findUnique({
      where: { productId },
      select: {
        id: true,
        qrCodeUrl: true,
        redirectUrl: true,
        isActive: true,
        // Don't expose scan count or other sensitive info to public
      },
    });

    if (!qrCode) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 });
    }

    // Only return if QR code is active
    if (!qrCode.isActive) {
      return NextResponse.json({ error: 'QR code is not available' }, { status: 403 });
    }

    return NextResponse.json(qrCode);
  } catch (error) {
    console.error('Error fetching public QR code:', error);
    return NextResponse.json(
      { error: 'Failed to fetch QR code' },
      { status: 500 }
    );
  }
}

