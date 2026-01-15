'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  brand: string | null;
  description: string;
  imageUrl: string | null;
  productionCountry: string | null;
  productionRegion: string | null;
  vintage: string | null;
  volume: string | null;
  category: {
    id: string;
    name: string;
  };
  user: {
    name: string;
    company: string | null;
  };
  certificate: {
    id: string;
    certificateNumber: string;
    awardLevel: string;
    overallScore: number;
    issueDate: string;
  } | null;
  evaluation: {
    totalScore: number | null;
    overallScore: number;
    tastingNotes: string | null;
  } | null;
}

interface QRCode {
  id: string;
  qrCodeUrl: string;
  redirectUrl: string;
  isActive: boolean;
}

export default function PublicProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [qrCode, setQrCode] = useState<QRCode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/products/${productId}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError('Product not found');
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to load product');
        }
        return;
      }

      const data = await response.json();
      setProduct(data);

      // Track QR code scan if accessed via QR code
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('qr') === 'true') {
        // Track scan using productId (public endpoint, no auth needed)
        fetch(`/api/qrcodes/track/scan?productId=${productId}`, { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }).catch(err => console.error('Error tracking scan:', err));
      }

      // Fetch QR code if product has certificate
      if (data.certificate) {
        fetchQRCode(productId);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product');
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
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-stone-600">Loading product information...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-serif text-stone-900 mb-4">Product Not Found</h1>
          <p className="text-stone-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <Link
            href="/winners"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#2E4F3A] text-white font-semibold rounded-lg hover:bg-[#1e3a2a] transition-colors"
          >
            Browse Certified Products
          </Link>
        </div>
      </div>
    );
  }

  const awardColors: Record<string, { bg: string; text: string; border: string }> = {
    GRAND_GOLD: { bg: 'bg-gradient-to-br from-yellow-400 to-yellow-600', text: 'text-yellow-900', border: 'border-yellow-500' },
    GOLD: { bg: 'bg-gradient-to-br from-[#D4AF37] to-[#b08d4b]', text: 'text-yellow-900', border: 'border-[#D4AF37]' },
    SILVER: { bg: 'bg-gradient-to-br from-gray-300 to-gray-500', text: 'text-gray-900', border: 'border-gray-400' },
    BRONZE: { bg: 'bg-gradient-to-br from-amber-600 to-amber-800', text: 'text-amber-100', border: 'border-amber-700' },
  };

  const awardLabels: Record<string, string> = {
    GRAND_GOLD: 'Grand Gold Award',
    GOLD: 'Gold Award',
    SILVER: 'Silver Award',
    BRONZE: 'Bronze Award',
  };

  const awardLevel = product.certificate?.awardLevel || 'NONE';
  const awardColor = awardColors[awardLevel] || { bg: 'bg-stone-200', text: 'text-stone-700', border: 'border-stone-300' };
  const awardLabel = awardLabels[awardLevel] || 'No Award';

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="text-2xl font-serif text-[#2E4F3A] font-bold">
            Tastecert
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            {product.imageUrl ? (
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-lg">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-square rounded-2xl bg-stone-100 flex items-center justify-center">
                <svg className="w-24 h-24 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}

            {/* Certificate Badge */}
            {product.certificate && (
              <div className="mt-6 text-center">
                <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-xl border-2 ${awardColor.bg} ${awardColor.text} ${awardColor.border} shadow-lg`}>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-sm font-medium opacity-90">Certified</p>
                    <p className="text-lg font-bold">{awardLabel}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-4xl font-serif text-stone-900 mb-2">{product.name}</h1>
              {product.brand && (
                <p className="text-lg text-stone-600 mb-4">by {product.brand}</p>
              )}
              <p className="text-stone-500 mb-4">
                Produced by <span className="font-semibold text-stone-700">{product.user.company || product.user.name}</span>
              </p>
            </div>

            {/* Certificate Information */}
            {product.certificate && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 mb-6">
                <h2 className="text-xl font-serif text-stone-900 mb-4">Certification Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Award Level:</span>
                    <span className={`font-semibold ${awardColor.text}`}>{awardLabel}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Score:</span>
                    <span className="font-semibold text-stone-900">
                      {product.evaluation?.totalScore?.toFixed(1) || product.certificate.overallScore.toFixed(1)}/100
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Certificate Number:</span>
                    <span className="font-mono text-sm font-semibold text-stone-700">
                      {product.certificate.certificateNumber}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Issued:</span>
                    <span className="font-medium text-stone-700">
                      {new Date(product.certificate.issueDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-stone-200">
                  <Link
                    href={`/certificates/${product.certificate.certificateNumber}`}
                    className="inline-flex items-center gap-2 text-[#2E4F3A] font-semibold hover:text-[#D4AF37] transition-colors"
                  >
                    View Full Certificate
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}

            {/* Product Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 mb-6">
              <h2 className="text-xl font-serif text-stone-900 mb-4">Product Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Category:</span>
                  <span className="font-medium text-stone-700">{product.category.name}</span>
                </div>
                {product.productionCountry && (
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Origin:</span>
                    <span className="font-medium text-stone-700">
                      {product.productionRegion 
                        ? `${product.productionRegion}, ${product.productionCountry}`
                        : product.productionCountry}
                    </span>
                  </div>
                )}
                {product.vintage && (
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Vintage:</span>
                    <span className="font-medium text-stone-700">{product.vintage}</span>
                  </div>
                )}
                {product.volume && (
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Volume:</span>
                    <span className="font-medium text-stone-700">{product.volume}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 mb-6">
                <h2 className="text-xl font-serif text-stone-900 mb-4">Description</h2>
                <p className="text-stone-600 leading-relaxed whitespace-pre-wrap">{product.description}</p>
              </div>
            )}

            {/* Tasting Notes */}
            {product.evaluation?.tastingNotes && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 mb-6">
                <h2 className="text-xl font-serif text-stone-900 mb-4">Tasting Notes</h2>
                <p className="text-stone-600 leading-relaxed whitespace-pre-wrap">{product.evaluation.tastingNotes}</p>
              </div>
            )}

            {/* QR Code */}
            {qrCode && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                <h2 className="text-xl font-serif text-stone-900 mb-4">QR Code</h2>
                <p className="text-sm text-stone-600 mb-6">Scan this QR code to verify this product's certification</p>
                <div className="flex items-start gap-6">
                  <div className="relative w-40 h-40 border-2 border-stone-200 rounded-lg p-3 bg-white flex-shrink-0">
                    <Image
                      src={qrCode.qrCodeUrl}
                      alt="QR Code"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
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
                    <a
                      href={qrCode.qrCodeUrl}
                      download={`qr-code-${product.name.replace(/\s+/g, '-')}.png`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#2E4F3A] rounded-lg hover:bg-[#1e3a2a] transition-colors w-fit"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download QR Code
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back to Directory */}
        <div className="mt-12 text-center">
          <Link
            href="/winners"
            className="inline-flex items-center gap-2 text-[#2E4F3A] font-semibold hover:text-[#D4AF37] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Browse All Certified Products
          </Link>
        </div>
      </main>
    </div>
  );
}

