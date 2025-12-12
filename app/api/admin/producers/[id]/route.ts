import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const producer = await prisma.user.findUnique({
      where: {
        id: params.id,
        role: 'PRODUCER',
      },
      include: {
        products: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
            evaluation: {
              select: {
                overallScore: true,
                totalScore: true,
              },
            },
            certificate: {
              select: {
                awardLevel: true,
              },
            },
          },
          orderBy: {
            submittedAt: 'desc',
          },
        },
      },
    });

    if (!producer) {
      return NextResponse.json(
        { error: 'Producer not found' },
        { status: 404 }
      );
    }

    // Calculate statistics
    const stats = {
      totalSubmissions: producer.products.length,
      approved: producer.products.filter(p => p.status === 'CERTIFIED' || p.status === 'EVALUATED').length,
      pending: producer.products.filter(p => p.status === 'PENDING' || p.status === 'UNDER_REVIEW').length,
      rejected: producer.products.filter(p => p.status === 'REJECTED').length,
    };

    return NextResponse.json({
      ...producer,
      stats,
    });
  } catch (error) {
    console.error('Error fetching producer details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch producer details' },
      { status: 500 }
    );
  }
}

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
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    // Map status to AccountStatus enum
    let accountStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
    if (status === 'Active' || status === 'APPROVED') {
      accountStatus = 'APPROVED';
    } else if (status === 'Rejected' || status === 'REJECTED') {
      accountStatus = 'REJECTED';
    } else if (status === 'Pending' || status === 'PENDING') {
      accountStatus = 'PENDING';
    } else {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    console.log(`Updating producer ${params.id} account status to ${accountStatus}`);

    // Update producer account status
    const user = await prisma.user.update({
      where: {
        id: params.id,
        role: 'PRODUCER',
      },
      data: { accountStatus },
    });

    console.log(`Producer ${params.id} account status updated successfully`);
    
    return NextResponse.json({
      success: true,
      message: `Producer ${accountStatus === 'APPROVED' ? 'approved' : accountStatus === 'REJECTED' ? 'rejected' : 'reset to pending'} successfully`,
      user,
    });
  } catch (error) {
    console.error('Error updating producer status:', error);
    return NextResponse.json(
      { error: 'Failed to update producer status' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log(`Deleting producer account ${params.id}`);

    // Check if producer exists
    const producer = await prisma.user.findUnique({
      where: {
        id: params.id,
        role: 'PRODUCER',
      },
      include: {
        products: true,
      },
    });

    if (!producer) {
      return NextResponse.json(
        { error: 'Producer not found' },
        { status: 404 }
      );
    }

    // Delete the producer account
    // Due to cascade delete in schema, this will also delete:
    // - All products
    // - All evaluations (via product cascade)
    // - All certificates (via product cascade)
    // - All accounts
    // - All sessions
    await prisma.user.delete({
      where: { id: params.id },
    });

    console.log(`Producer ${params.id} and ${producer.products.length} products deleted successfully`);
    
    return NextResponse.json({
      success: true,
      message: `Producer account and ${producer.products.length} products deleted successfully`,
    });
  } catch (error) {
    console.error('Error deleting producer:', error);
    return NextResponse.json(
      { error: 'Failed to delete producer account' },
      { status: 500 }
    );
  }
}

