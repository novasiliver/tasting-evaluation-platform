'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import CertificateTemplate from '@/components/CertificateTemplate';

interface CertificateData {
  certificateNumber: string;
  awardLevel: 'GRAND_GOLD' | 'GOLD' | 'SILVER' | 'BRONZE' | 'NONE';
  overallScore: number;
  issueDate: string;
  product: {
    id: string;
    name: string;
    category: {
      name: string;
    };
    user: {
      name: string;
      company: string | null;
    };
  };
}

interface QRCode {
  id: string;
  qrCodeUrl: string;
  redirectUrl: string;
  isActive: boolean;
}

export default function CertificatePage() {
  const params = useParams();
  const certificateNumber = params.id as string;
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [qrCode, setQrCode] = useState<QRCode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (certificateNumber) {
      fetchCertificate();
    } else {
      console.error('Certificate number not found in params:', params);
      setError('Invalid certificate number');
      setIsLoading(false);
    }
  }, [certificateNumber]);

  const fetchCertificate = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/certificates/${encodeURIComponent(certificateNumber)}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError('Certificate not found');
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to load certificate');
        }
        return;
      }

      const data = await response.json();
      setCertificate(data);
      
      // Fetch QR code if product has ID
      if (data.product?.id) {
        fetchQRCode(data.product.id);
      }
      
      // Update document title and meta tags
      const awardTitle = 
        data.awardLevel === 'GRAND_GOLD' ? 'Grand Gold' :
        data.awardLevel === 'GOLD' ? 'Gold' :
        data.awardLevel === 'SILVER' ? 'Silver' :
        data.awardLevel === 'BRONZE' ? 'Bronze' :
        'Recognition';
      const producerName = data.product.user.company || data.product.user.name;
      document.title = `Certificate of ${awardTitle} Award - ${data.product.name} | Tastecert`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `Official ${awardTitle} Award certificate for ${data.product.name} by ${producerName}. Issued by Tastecert International Food Quality Awards.`);
      }
    } catch (error) {
      console.error('Error fetching certificate:', error);
      setError('Failed to load certificate');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQRCode = async (productId: string) => {
    try {
      const response = await fetch(`/api/qrcodes/public?productId=${productId}`);
      if (response.ok) {
        const data = await response.json();
        setQrCode(data);
      }
      // Silently fail if QR code doesn't exist - it's optional
    } catch (error) {
      console.error('Error fetching QR code:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-sm text-zinc-600">Loading certificate...</p>
        </div>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <iconify-icon icon="lucide:alert-circle" width="48" className="text-red-500 mx-auto mb-4" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
          <h1 className="text-xl font-semibold text-zinc-900 mb-2">Certificate Not Found</h1>
          <p className="text-sm text-zinc-600 mb-4">
            {error || 'The certificate you are looking for does not exist or is not published.'}
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors"
          >
            <iconify-icon icon="lucide:home" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  const producerName = certificate.product.user.company || certificate.product.user.name;

  return (
    <div className="min-h-screen bg-stone-100">
      <CertificateTemplate
        awardLevel={certificate.awardLevel}
        productName={certificate.product.name}
        producerName={producerName}
        categoryName={certificate.product.category.name}
        score={certificate.overallScore}
        issueDate={certificate.issueDate}
        certificateNumber={certificate.certificateNumber}
      />
      
      {/* QR Code Section */}
      {qrCode && (
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-200">
            <h2 className="text-2xl font-serif text-stone-900 mb-2 text-center">Product QR Code</h2>
            <p className="text-sm text-stone-600 mb-8 text-center">Scan this QR code to view the product page</p>
            <div className="flex items-start justify-center gap-8 max-w-2xl mx-auto">
              <div className="relative w-48 h-48 border-2 border-stone-200 rounded-lg p-4 bg-white flex-shrink-0">
                <Image
                  src={qrCode.qrCodeUrl}
                  alt="QR Code"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-1 flex flex-col gap-4 pt-2">
                <div>
                  <p className="text-xs text-stone-500 mb-2">Redirects to:</p>
                  <a
                    href={qrCode.redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#2E4F3A] hover:text-[#D4AF37] break-all font-medium"
                  >
                    {qrCode.redirectUrl}
                  </a>
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href={qrCode.qrCodeUrl}
                    download={`qr-code-${certificate.product.name.replace(/\s+/g, '-')}.png`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#2E4F3A] rounded-lg hover:bg-[#1e3a2a] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download QR Code
                  </a>
                  <Link
                    href={`/products/${certificate.product.id}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-stone-700 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    View Product Page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

