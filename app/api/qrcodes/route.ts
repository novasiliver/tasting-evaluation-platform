import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateAndSaveQRCode } from '@/lib/qrcode';
import path from 'path';
import fs from 'fs';

/**
 * GET /api/qrcodes
 * Get all QR codes (Admin only) or QR codes for user's products (Producer)
 */
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    let qrCodes;

    if (productId) {
      // Get QR code for specific product
      const qrCode = await prisma.qRCode.findUnique({
        where: { productId },
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
    }

    // Get all QR codes based on role
    if (session.user.role === 'ADMIN') {
      qrCodes = await prisma.qRCode.findMany({
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
        orderBy: { createdAt: 'desc' },
      });
    } else {
      // Producer: only their products
      qrCodes = await prisma.qRCode.findMany({
        where: {
          product: {
            userId: session.user.id,
          },
        },
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
        orderBy: { createdAt: 'desc' },
      });
    }

    return NextResponse.json(qrCodes);
  } catch (error) {
    console.error('Error fetching QR codes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch QR codes' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/qrcodes
 * Create a new QR code for a product
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Check if product exists and user has permission
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        certificate: true,
        user: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Only admins can generate QR codes
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Only administrators can generate QR codes' },
        { status: 403 }
      );
    }

    // Check if product has a certificate (required for QR code)
    if (!product.certificate) {
      return NextResponse.json(
        { error: 'Product must have a certificate to generate QR code' },
        { status: 400 }
      );
    }

    // Check if QR code already exists
    const existingQRCode = await prisma.qRCode.findUnique({
      where: { productId },
    });

    if (existingQRCode) {
      return NextResponse.json(
        { error: 'QR code already exists for this product' },
        { status: 400 }
      );
    }

    // Generate redirect URL (public product page with QR tracking)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const redirectUrl = `${baseUrl}/products/${productId}?qr=true`;

    // Generate QR code image
    const qrCodeFileName = `qr-${productId}-${Date.now()}.png`;
    const qrCodeDir = path.join(process.cwd(), 'public', 'qrcodes');
    const qrCodePath = path.join(qrCodeDir, qrCodeFileName);
    const qrCodeUrl = `/qrcodes/${qrCodeFileName}`;

    // Logo path (if available)
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    const logoExists = fs.existsSync(logoPath);

    // Generate QR code
    await generateAndSaveQRCode(redirectUrl, qrCodePath, {
      size: 500,
      margin: 4,
      logoPath: logoExists ? logoPath : undefined,
      logoSize: 80,
      foregroundColor: '#2E4F3A', // Deep green
      backgroundColor: '#FFFFFF', // White
    });

    // Create QR code record
    const qrCode = await prisma.qRCode.create({
      data: {
        productId,
        qrCodeUrl,
        redirectUrl,
        isActive: true,
      },
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

    return NextResponse.json(qrCode, { status: 201 });
  } catch (error) {
    console.error('Error creating QR code:', error);
    return NextResponse.json(
      { error: 'Failed to create QR code' },
      { status: 500 }
    );
  }
}

