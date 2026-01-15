import { readFile } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Use UPLOAD_DIR from environment, fallback to production path or local uploads
const UPLOAD_DIR = process.env.UPLOAD_DIR || (process.env.NODE_ENV === 'production' ? '/var/www/tastecert-uploads' : join(process.cwd(), 'uploads'));

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const filepath = join(UPLOAD_DIR, ...path);
    
    // Security: Prevent directory traversal
    const resolvedPath = join(UPLOAD_DIR, ...path);
    if (!resolvedPath.startsWith(UPLOAD_DIR)) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const file = await readFile(filepath);

    // Determine content type
    const ext = path[path.length - 1].split('.').pop()?.toLowerCase();
    const contentType = 
      ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' :
      ext === 'png' ? 'image/png' :
      ext === 'webp' ? 'image/webp' :
      'application/octet-stream';

    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    console.error('Error serving image:', error);
    return NextResponse.json({ error: 'Failed to serve file' }, { status: 500 });
  }
}

