import { readFile } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

const QRCODE_DIR = join(process.cwd(), 'public', 'qrcodes');

export const dynamic = 'force-dynamic';

/**
 * GET /api/qrcodes/image/[filename]
 * Serve QR code images dynamically
 * This allows QR codes to be accessible immediately after generation without server restart
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    
    // Security: Prevent directory traversal
    const filepath = join(QRCODE_DIR, filename);
    const resolvedPath = join(QRCODE_DIR, filename);
    if (!resolvedPath.startsWith(QRCODE_DIR)) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    // Validate filename format (basic security check)
    if (!filename.match(/^qr-[a-zA-Z0-9_-]+-\d+\.png$/)) {
      return NextResponse.json({ error: 'Invalid filename format' }, { status: 400 });
    }

    const file = await readFile(filepath);

    return new NextResponse(file, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return NextResponse.json({ error: 'QR code image not found' }, { status: 404 });
    }
    console.error('Error serving QR code image:', error);
    return NextResponse.json({ error: 'Failed to serve QR code image' }, { status: 500 });
  }
}

