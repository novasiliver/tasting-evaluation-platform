import { renderToBuffer } from '@react-pdf/renderer';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import React from 'react';
import CertificatePDFTemplate from '@/components/CertificatePDFTemplate';
import prisma from './prisma';

const UPLOAD_DIR = process.env.UPLOAD_DIR || (process.env.NODE_ENV === 'production' ? '/var/www/tastecert-uploads' : join(process.cwd(), 'uploads'));

export async function generateCertificatePDF(certificateId: string): Promise<string> {
  try {
    // Fetch certificate with related data
    const certificate = await prisma.certificate.findUnique({
      where: { id: certificateId },
      include: {
        product: {
          include: {
            user: {
              select: {
                name: true,
                company: true,
              },
            },
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!certificate) {
      throw new Error('Certificate not found');
    }

    // Create PDF
    const pdfDoc = (
      <CertificatePDFTemplate
        productName={certificate.product.name}
        producerName={certificate.product.user.company || certificate.product.user.name}
        categoryName={certificate.product.category.name}
        awardLevel={certificate.awardLevel}
        score={certificate.overallScore}
        certificateNumber={certificate.certificateNumber}
        issueDate={certificate.issueDate.toISOString()}
      />
    );

    const pdfBuffer = await renderToBuffer(pdfDoc);

    // Save PDF to file system
    const filename = `certificate-${certificate.certificateNumber.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
    const filepath = join(UPLOAD_DIR, 'certificates', filename);

    // Ensure directory exists
    await mkdir(join(UPLOAD_DIR, 'certificates'), { recursive: true });

    // Write file
    await writeFile(filepath, pdfBuffer);

    // Update certificate with PDF URL
    const baseUrl = process.env.NEXT_PUBLIC_UPLOAD_BASE_URL || '/api/images';
    const pdfUrl = `${baseUrl}/certificates/${filename}`;

    await prisma.certificate.update({
      where: { id: certificateId },
      data: { pdfUrl },
    });

    return pdfUrl;
  } catch (error) {
    console.error('Error generating certificate PDF:', error);
    throw error;
  }
}

