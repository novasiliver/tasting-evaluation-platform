'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface QRCode {
  id: string;
  qrCodeUrl: string;
  redirectUrl: string;
  isActive: boolean;
  scanCount: number;
  lastScannedAt: string | null;
  createdAt: string;
  product: {
    id: string;
    name: string;
    imageUrl: string | null;
    user: {
      name: string;
      company: string | null;
    };
    category: {
      name: string;
    };
    certificate: {
      certificateNumber: string;
      awardLevel: string;
      overallScore: number;
    } | null;
  };
}

interface ProductWithoutQR {
  id: string;
  name: string;
  user: {
    name: string;
    company: string | null;
  };
  certificate: {
    certificateNumber: string;
    awardLevel: string;
  };
}

export default function QRCodesPage() {
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [productsWithoutQR, setProductsWithoutQR] = useState<ProductWithoutQR[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQRCode, setSelectedQRCode] = useState<QRCode | null>(null);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [showProductsWithoutQR, setShowProductsWithoutQR] = useState(false);

  useEffect(() => {
    fetchQRCodes();
  }, []);

  useEffect(() => {
    // Fetch products without QR codes after QR codes are loaded
    if (qrCodes.length >= 0) {
      fetchProductsWithoutQR();
    }
  }, [qrCodes]);

  const fetchQRCodes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/qrcodes', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch QR codes');
      }

      const data = await response.json();
      setQrCodes(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductsWithoutQR = async () => {
    try {
      const response = await fetch('/api/products?status=CERTIFIED', {
        credentials: 'include',
      });
      if (response.ok) {
        const products = await response.json();
        // Filter products that have certificates but no QR codes
        const productsWithCertificates = products.filter((p: any) => {
          if (!p.certificate) return false;
          // Check if this product has a QR code
          return !qrCodes.some(qr => qr.product.id === p.id);
        });
        setProductsWithoutQR(productsWithCertificates);
      }
    } catch (err) {
      console.error('Error fetching products without QR codes:', err);
    }
  };

  const handleGenerateForProduct = async (productId: string) => {
    try {
      setIsGenerating(productId);
      const response = await fetch('/api/qrcodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate QR code');
      }

      await fetchQRCodes();
      await fetchProductsWithoutQR();
      alert('QR code generated successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to generate QR code');
    } finally {
      setIsGenerating(null);
    }
  };

  const handleToggleActive = async (qrCode: QRCode) => {
    try {
      const response = await fetch(`/api/qrcodes/${qrCode.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ isActive: !qrCode.isActive }),
      });

      if (!response.ok) {
        throw new Error('Failed to update QR code');
      }

      await fetchQRCodes();
      await fetchProductsWithoutQR();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleRegenerate = async (qrCode: QRCode) => {
    if (!confirm('Are you sure you want to regenerate this QR code? The old QR code will no longer work.')) {
      return;
    }

    try {
      setIsGenerating(qrCode.id);
      const response = await fetch(`/api/qrcodes/${qrCode.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ regenerate: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to regenerate QR code');
      }

      await fetchQRCodes();
      await fetchProductsWithoutQR();
      alert('QR code regenerated successfully');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsGenerating(null);
    }
  };

  const handleDelete = async (qrCode: QRCode) => {
    if (!confirm('Are you sure you want to delete this QR code? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/qrcodes/${qrCode.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete QR code');
      }

      await fetchQRCodes();
      await fetchProductsWithoutQR();
      alert('QR code deleted successfully');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const awardColors: Record<string, string> = {
    GRAND_GOLD: 'text-yellow-600',
    GOLD: 'text-[#D4AF37]',
    SILVER: 'text-gray-500',
    BRONZE: 'text-amber-700',
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E4F3A]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-stone-900 mb-2">QR Code Management</h1>
        <p className="text-stone-600">Manage QR codes for certified products</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Generate QR Code Section */}
      <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-stone-900">Generate QR Codes</h2>
            <p className="text-sm text-stone-600 mt-1">Generate QR codes for certified products</p>
          </div>
          <button
            onClick={() => setShowProductsWithoutQR(!showProductsWithoutQR)}
            className="px-4 py-2 text-sm font-medium text-[#2E4F3A] bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors"
          >
            {showProductsWithoutQR ? 'Hide' : 'Show'} Products Without QR Codes
          </button>
        </div>

        {showProductsWithoutQR && (
          <div className="mt-4">
            {productsWithoutQR.length === 0 ? (
              <p className="text-sm text-stone-500">All certified products have QR codes.</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {productsWithoutQR.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-stone-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-stone-900">{product.name}</p>
                      <p className="text-xs text-stone-500">
                        {product.user.company || product.user.name} • {product.certificate.awardLevel}
                      </p>
                    </div>
                    <button
                      onClick={() => handleGenerateForProduct(product.id)}
                      disabled={isGenerating === product.id}
                      className="px-4 py-2 text-sm font-medium text-white bg-[#2E4F3A] rounded-lg hover:bg-[#1e3a2a] transition-colors disabled:opacity-50"
                    >
                      {isGenerating === product.id ? (
                        <span className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Generating...
                        </span>
                      ) : (
                        'Generate QR Code'
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
          <p className="text-sm text-stone-600 mb-1">Total QR Codes</p>
          <p className="text-3xl font-bold text-stone-900">{qrCodes.length}</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
          <p className="text-sm text-stone-600 mb-1">Active</p>
          <p className="text-3xl font-bold text-green-600">
            {qrCodes.filter(qr => qr.isActive).length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
          <p className="text-sm text-stone-600 mb-1">Inactive</p>
          <p className="text-3xl font-bold text-stone-400">
            {qrCodes.filter(qr => !qr.isActive).length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
          <p className="text-sm text-stone-600 mb-1">Total Scans</p>
          <p className="text-3xl font-bold text-[#D4AF37]">
            {qrCodes.reduce((sum, qr) => sum + qr.scanCount, 0)}
          </p>
        </div>
      </div>

      {/* QR Codes List */}
      <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-600 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-600 uppercase tracking-wider">QR Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-600 uppercase tracking-wider">Scans</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-600 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-stone-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {qrCodes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-stone-500">
                    No QR codes found. QR codes are automatically generated when products are certified.
                  </td>
                </tr>
              ) : (
                qrCodes.map((qrCode) => (
                  <tr key={qrCode.id} className="hover:bg-stone-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {qrCode.product.imageUrl ? (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100">
                            <Image
                              src={qrCode.product.imageUrl}
                              alt={qrCode.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center">
                            <svg className="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-stone-900">{qrCode.product.name}</p>
                          <p className="text-sm text-stone-500">
                            {qrCode.product.user.company || qrCode.product.user.name}
                          </p>
                          {qrCode.product.certificate && (
                            <span className={`text-xs font-medium ${awardColors[qrCode.product.certificate.awardLevel] || 'text-stone-600'}`}>
                              {qrCode.product.certificate.awardLevel}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded border border-stone-200 bg-white p-1">
                          <Image
                            src={qrCode.qrCodeUrl}
                            alt="QR Code"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <button
                          onClick={() => setSelectedQRCode(qrCode)}
                          className="text-sm text-[#2E4F3A] hover:text-[#D4AF37] font-medium"
                        >
                          View
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          qrCode.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {qrCode.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-stone-900">{qrCode.scanCount}</p>
                        {qrCode.lastScannedAt && (
                          <p className="text-xs text-stone-500">
                            Last: {new Date(qrCode.lastScannedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600">
                      {new Date(qrCode.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleActive(qrCode)}
                          className="text-sm px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors"
                        >
                          {qrCode.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleRegenerate(qrCode)}
                          disabled={isGenerating === qrCode.id}
                          className="text-sm px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors disabled:opacity-50"
                        >
                          {isGenerating === qrCode.id ? 'Generating...' : 'Regenerate'}
                        </button>
                        <button
                          onClick={() => handleDelete(qrCode)}
                          className="text-sm px-3 py-1.5 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Code Modal */}
      {selectedQRCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-serif text-stone-900 mb-2">{selectedQRCode.product.name}</h2>
                <p className="text-stone-600">QR Code Preview</p>
              </div>
              <button
                onClick={() => setSelectedQRCode(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-64 h-64 border-4 border-stone-200 rounded-lg p-4 bg-white">
                <Image
                  src={selectedQRCode.qrCodeUrl}
                  alt="QR Code"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-stone-600 mb-2">Redirects to:</p>
                <a
                  href={selectedQRCode.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2E4F3A] hover:text-[#D4AF37] font-medium break-all"
                >
                  {selectedQRCode.redirectUrl}
                </a>
              </div>
              <div className="flex gap-3">
                <a
                  href={selectedQRCode.qrCodeUrl}
                  download={`qr-code-${selectedQRCode.product.name.replace(/\s+/g, '-')}.png`}
                  className="px-4 py-2 bg-[#2E4F3A] text-white rounded-lg hover:bg-[#1e3a2a] transition-colors"
                >
                  Download QR Code
                </a>
                <button
                  onClick={() => setSelectedQRCode(null)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

