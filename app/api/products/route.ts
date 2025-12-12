import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { ProductStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    console.log('POST /api/products - Starting product creation...');
    
    const session = await getServerSession(authOptions);
    console.log('Session:', session ? `User: ${session.user.email}` : 'No session');

    if (!session) {
      console.error('No session found - unauthorized');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user ID and check account status
    let userId = session.user.id;
    let userAccountStatus = null;
    
    if (!userId) {
      console.log('User ID not in session, looking up by email...');
      const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
        select: { id: true, accountStatus: true, role: true },
      });
      if (!user) {
        console.error('User not found in database');
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      userId = user.id;
      userAccountStatus = user.accountStatus;
      console.log('Found user ID from database:', userId, 'Account status:', userAccountStatus);
    } else {
      // Get account status
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { accountStatus: true, role: true },
      });
      userAccountStatus = user?.accountStatus;
      console.log('User account status:', userAccountStatus);
    }

    // Check if producer account is approved
    if (session.user.role === 'PRODUCER' && userAccountStatus !== 'APPROVED') {
      console.error('Producer account not approved. Status:', userAccountStatus);
      return NextResponse.json(
        { 
          error: userAccountStatus === 'REJECTED' 
            ? 'Your account has been rejected. You cannot submit products.' 
            : 'Your account is pending approval. Please wait for admin approval before submitting products.',
          accountStatus: userAccountStatus
        },
        { status: 403 }
      );
    }

    const data = await request.json();
    console.log('Request data:', data);
    
    const {
      name,
      description,
      categoryId,
      productionCountry,
      productionRegion,
      vintage,
      ingredients,
      volume,
      alcoholContent,
      packaging,
      imageUrl,
    } = data;

    // Validate required fields
    if (!name || !categoryId) {
      console.error('Validation failed: missing name or categoryId');
      return NextResponse.json(
        { error: 'Name and category are required' },
        { status: 400 }
      );
    }

    console.log('Creating product with data:', {
      name,
      categoryId,
      userId,
      description: description || '',
    });

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        description: description || '',
        categoryId,
        userId,
        productionCountry: productionCountry || null,
        productionRegion: productionRegion || null,
        vintage: vintage || null,
        ingredients: ingredients || null,
        volume: volume || null,
        alcoholContent: alcoholContent || null,
        packaging: packaging || null,
        imageUrl: imageUrl || null,
        status: 'PENDING',
      },
      include: {
        category: true,
        user: {
          select: {
            name: true,
            company: true,
            email: true,
          },
        },
      },
    });

    console.log('Product created successfully:', product.id);

    // Send email notification (non-blocking)
    if (product.user.email) {
      import('@/lib/email').then(({ sendProductSubmissionEmail }) => {
        sendProductSubmissionEmail(
          product.user.email!,
          product.user.name || 'Producer',
          product.name
        ).catch(console.error);
      }).catch((error) => {
        // Silently fail if email module can't be loaded
        console.warn('Failed to load email module:', error);
      });
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('!!! ERROR creating product !!!');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Full error:', error);
    
    return NextResponse.json(
      { error: `Failed to create product: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where = status && Object.values(ProductStatus).includes(status as ProductStatus) 
      ? { status: status as ProductStatus } 
      : {};

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        user: {
          select: {
            name: true,
            company: true,
          },
        },
        evaluation: true,
        certificate: true,
      },
      orderBy: {
        submittedAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

