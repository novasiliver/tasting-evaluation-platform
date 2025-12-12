'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CertificateTemplate from '@/components/CertificateTemplate';

interface CertificateData {
  certificateNumber: string;
  awardLevel: 'GRAND_GOLD' | 'GOLD' | 'SILVER' | 'BRONZE' | 'NONE';
  overallScore: number;
  issueDate: string;
  product: {
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

export default function CertificatePage() {
  const params = useParams();
  const certificateNumber = params.id as string;
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
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
    <CertificateTemplate
      awardLevel={certificate.awardLevel}
      productName={certificate.product.name}
      producerName={producerName}
      categoryName={certificate.product.category.name}
      score={certificate.overallScore}
      issueDate={certificate.issueDate}
      certificateNumber={certificate.certificateNumber}
    />
  );
}

