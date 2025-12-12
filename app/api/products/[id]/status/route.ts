import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { ProductStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    // Validate status is a valid ProductStatus enum value
    const validStatuses = ['PENDING', 'UNDER_REVIEW', 'EVALUATED', 'CERTIFIED', 'REJECTED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    console.log(`Updating product ${params.id} status to ${status}`);

    // If changing FROM rejected TO pending, we should also delete any existing evaluation/certificate
    // to allow re-evaluation
    const currentProduct = await prisma.product.findUnique({
      where: { id: params.id },
      select: { status: true },
    });

    if (currentProduct?.status === ProductStatus.REJECTED && status === ProductStatus.PENDING) {
      console.log('Product was rejected, clearing evaluation for re-evaluation...');
      
      // Delete existing evaluation and certificate to allow fresh evaluation
      await prisma.evaluation.deleteMany({
        where: { productId: params.id },
      });
      
      await prisma.certificate.deleteMany({
        where: { productId: params.id },
      });
    }

    // Update product status
    const product = await prisma.product.update({
      where: { id: params.id },
      data: { status: status as ProductStatus },
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

    console.log(`Product ${params.id} status updated to ${status} successfully`);

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error updating product status:', error);
    return NextResponse.json(
      { error: `Failed to update product status: ${error.message}` },
      { status: 500 }
    );
  }
}
