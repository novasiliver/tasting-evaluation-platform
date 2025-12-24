'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  status: string;
  submittedAt: string;
  imageUrl: string | null;
  productionCountry: string | null;
  productionRegion: string | null;
  vintage: string | null;
  ingredients: string | null;
  volume: string | null;
  alcoholContent: string | null;
  packaging: string | null;
  category: {
    id: string;
    name: string;
  };
  user: {
    name: string;
    company: string | null;
  };
  evaluation?: {
    appearanceScore: number;
    aromaScore: number;
    tasteScore: number;
    aftertasteScore: number;
    harmonyScore: number;
    totalScore: number;
    overallScore: number;
    tastingNotes: string | null;
    technicalNotes: string | null;
    recommendations: string | null;
    attributes: string | null;
    evaluatedAt: string;
  };
  certificate?: {
    id: string;
    certificateNumber: string;
    awardLevel: string;
    issueDate: string;
    isPublished: boolean;
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/products/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        router.push('/dashboard/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      router.push('/dashboard/products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/products/${params.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Product deleted successfully');
        router.push('/dashboard/products');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    } finally {
      setIsDeleting(false);
    }
  };


  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string; dot: string }> = {
      PENDING: { bg: 'bg-gold-50', text: 'text-gold-700', dot: 'bg-gold-500' },
      UNDER_REVIEW: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
      EVALUATED: { bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-500' },
      CERTIFIED: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
      REJECTED: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    };
    return colors[status] || { bg: 'bg-stone-50', text: 'text-stone-700', dot: 'bg-stone-500' };
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      PENDING: 'Pending Review',
      UNDER_REVIEW: 'Under Evaluation',
      EVALUATED: 'Evaluated',
      CERTIFIED: 'Certified',
      REJECTED: 'Rejected',
    };
    return labels[status] || status;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-600"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const statusColor = getStatusColor(product.status);
  const attributes = product.evaluation?.attributes ? JSON.parse(product.evaluation.attributes) : {};

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200/80 sticky top-0 z-30">
        <div className="flex items-center justify-between px-8 h-14">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/products" className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors">
              <iconify-icon icon="lucide:arrow-left" width="16" className="text-stone-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-stone-400">My Products</span>
              <iconify-icon icon="lucide:chevron-right" width="14" className="text-stone-300" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              <span className="text-stone-900 font-medium">Product Details</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <iconify-icon icon="lucide:trash-2" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${statusColor.bg} ${statusColor.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusColor.dot}`}></span>
              {getStatusLabel(product.status)}
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-8 max-w-5xl mx-auto">
        {/* Product Info Header */}
        <div className="bg-white rounded-xl border border-stone-200/80 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            {/* Product Image */}
            <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-gold-50 to-olive-50 flex items-center justify-center flex-shrink-0 border border-gold-100 overflow-hidden relative">
              {product.imageUrl ? (
                <Image src={product.imageUrl} alt={product.name} width={128} height={128} className="object-cover" />
              ) : (
                <iconify-icon icon="lucide:package" width="48" className="text-gold-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              )}
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-xl font-semibold text-stone-900 tracking-tight mb-1">{product.name}</h1>
                  <p className="text-sm text-stone-500">Product ID: <span className="font-medium text-stone-700">{product.id.substring(0, 8)}</span></p>
                </div>
                <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gold-700 bg-gold-50 rounded-full self-start">
                  {product.category.name}
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {product.volume && (
                  <div>
                    <p className="text-xs text-stone-400 mb-1">Volume</p>
                    <p className="text-sm font-medium text-stone-700">{product.volume}</p>
                  </div>
                )}
                {product.productionCountry && (
                  <div>
                    <p className="text-xs text-stone-400 mb-1">Origin</p>
                    <p className="text-sm font-medium text-stone-700">{product.productionCountry}</p>
                  </div>
                )}
                {product.vintage && (
                  <div>
                    <p className="text-xs text-stone-400 mb-1">Vintage</p>
                    <p className="text-sm font-medium text-stone-700">{product.vintage}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-stone-400 mb-1">Submitted</p>
                  <p className="text-sm font-medium text-stone-700">
                    {new Date(product.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-6 pt-6 border-t border-stone-100">
            <p className="text-xs text-stone-400 mb-2">Product Description</p>
            <p className="text-sm text-stone-600 leading-relaxed">{product.description || 'No description provided'}</p>
          </div>

          {product.ingredients && (
            <div className="mt-4">
              <p className="text-xs text-stone-400 mb-2">Ingredients</p>
              <p className="text-sm text-stone-600">{product.ingredients}</p>
            </div>
          )}
        </div>

        {/* Evaluation Results */}
        {product.evaluation && (
          <div className="bg-white rounded-xl border border-stone-200/80 p-6 mb-6">
            <h2 className="text-base font-semibold text-stone-900 mb-6">Evaluation Results</h2>
            
            {/* Scores */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="text-center p-4 bg-stone-50 rounded-lg">
                <p className="text-2xl font-semibold text-stone-900">{product.evaluation.appearanceScore.toFixed(1)}</p>
                <p className="text-xs text-stone-500 mt-1">Appearance</p>
              </div>
              <div className="text-center p-4 bg-stone-50 rounded-lg">
                <p className="text-2xl font-semibold text-stone-900">{product.evaluation.aromaScore.toFixed(1)}</p>
                <p className="text-xs text-stone-500 mt-1">Aroma</p>
              </div>
              <div className="text-center p-4 bg-stone-50 rounded-lg">
                <p className="text-2xl font-semibold text-stone-900">{product.evaluation.tasteScore.toFixed(1)}</p>
                <p className="text-xs text-stone-500 mt-1">Taste</p>
              </div>
              <div className="text-center p-4 bg-stone-50 rounded-lg">
                <p className="text-2xl font-semibold text-stone-900">{product.evaluation.aftertasteScore.toFixed(1)}</p>
                <p className="text-xs text-stone-500 mt-1">Aftertaste</p>
              </div>
              <div className="text-center p-4 bg-gold-50 rounded-lg">
                <p className="text-2xl font-semibold text-gold-700">{(product.evaluation.totalScore || product.evaluation.overallScore).toFixed(1)}</p>
                <p className="text-xs text-stone-500 mt-1">Overall</p>
              </div>
            </div>

            {/* Notes */}
            {product.evaluation.tastingNotes && (
              <div className="mb-4">
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Tasting Notes</p>
                <p className="text-sm text-stone-600 leading-relaxed">{product.evaluation.tastingNotes}</p>
              </div>
            )}

            {product.evaluation.recommendations && (
              <div>
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">Recommendations</p>
                <p className="text-sm text-stone-600 leading-relaxed">{product.evaluation.recommendations}</p>
              </div>
            )}
          </div>
        )}

        {/* Certificate */}
        {product.certificate && (
          <div className="bg-white rounded-xl border border-stone-200/80 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-stone-900">Certificate</h2>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full ${
                product.certificate.awardLevel === 'GOLD' ? 'bg-gold-50 text-gold-700' :
                product.certificate.awardLevel === 'SILVER' ? 'bg-stone-100 text-stone-700' :
                'bg-olive-50 text-olive-700'
              }`}>
                <iconify-icon icon="lucide:trophy" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                {product.certificate.awardLevel.charAt(0) + product.certificate.awardLevel.slice(1).toLowerCase()} Award
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Certificate Number</p>
                <p className="text-sm font-mono text-stone-900">{product.certificate.certificateNumber}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Issue Date</p>
                <p className="text-sm text-stone-900">
                  {new Date(product.certificate.issueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Status</p>
                <p className="text-sm text-stone-900">
                  {product.certificate.isPublished ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-700">
                      <iconify-icon icon="lucide:eye" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-stone-500">
                      <iconify-icon icon="lucide:eye-off" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      Private
                    </span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Score</p>
                <p className="text-sm font-semibold text-gold-600">
                  {product.evaluation ? (product.evaluation.totalScore || product.evaluation.overallScore).toFixed(1) : '—'} / 10.0
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/certificates/${encodeURIComponent(product.certificate.certificateNumber)}`}
                target="_blank"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-gold-600 rounded-lg hover:bg-gold-700 transition-colors"
              >
                <iconify-icon icon="lucide:eye" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                View Certificate
              </Link>
            </div>
          </div>
        )}

        {/* Status Messages */}
        {product.status === 'PENDING' && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
            <div className="flex items-start gap-3">
              <iconify-icon icon="lucide:info" width="20" className="text-blue-600 flex-shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              <div>
                <h3 className="text-sm font-semibold text-blue-900 mb-1">Product Under Review</h3>
                <p className="text-sm text-blue-700">
                  Your product has been submitted and is waiting for evaluation. We'll notify you via email once the evaluation is complete.
                </p>
              </div>
            </div>
          </div>
        )}

        {product.status === 'REJECTED' && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-6">
            <div className="flex items-start gap-3">
              <iconify-icon icon="lucide:x-circle" width="20" className="text-red-600 flex-shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              <div>
                <h3 className="text-sm font-semibold text-red-900 mb-1">Product Rejected</h3>
                <p className="text-sm text-red-700">
                  Unfortunately, this product did not meet our certification standards. Please contact us for more information.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
