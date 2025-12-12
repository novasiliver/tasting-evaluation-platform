import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    console.log('GET /api/categories - Fetching categories...');
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    console.log('Categories fetched successfully:', categories.length);
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error('!!! ERROR fetching categories !!!');
    console.error('Error details:', error);
    console.error('Error message:', error.message);
    return NextResponse.json(
      { error: `Failed to fetch categories: ${error.message}` },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('POST /api/categories - Request body:', body);
    
    const { name, slug, description, imageUrl, isActive } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const categorySlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    console.log('Generated slug:', categorySlug);

    // Check if slug already exists
    console.log('Checking for existing slug...');
    const existingSlug = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    if (existingSlug) {
      console.log('Slug already exists:', existingSlug);
      return NextResponse.json(
        { error: 'Category slug already exists' },
        { status: 400 }
      );
    }

    console.log('Creating category...');
    const category = await prisma.category.create({
      data: {
        name,
        slug: categorySlug,
        description: description || null,
        imageUrl: imageUrl || null,
        isActive: isActive !== undefined ? isActive : true,
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    console.log('Category created successfully:', category.id);
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    console.error('!!! ERROR creating category !!!');
    console.error('Error details:', error);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error stack:', error.stack);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Category name or slug already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: `Failed to create category: ${error.message}` },
      { status: 500 }
    );
  }
}

