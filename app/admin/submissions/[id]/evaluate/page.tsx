'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  brand: string | null;
  imageUrl: string | null;
  status: string;
  submittedAt: string | Date;
  category: { id: string; name: string };
  user: { id: string; name: string; company: string | null };
  productionCountry: string | null;
  volume: string | null;
}

const QUALITY_ATTRIBUTES = [
  'Authentic Origin',
  'Quality Packaging',
  'Proper Labeling',
  'Traceability Documented',
  'No Defects Detected',
  'Organic Certified',
  'Meets Category Standards',
  'Production Method Verified',
];

export default function ProductEvaluationPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scores, setScores] = useState({
    appearance: 8.0,
    aroma: 7.5,
    taste: 8.5,
    aftertaste: 7.0,
    harmony: 8.0,
  });
  const [attributes, setAttributes] = useState<Record<string, boolean>>({
    'Authentic Origin': true,
    'Quality Packaging': true,
    'Proper Labeling': true,
    'Traceability Documented': true,
    'No Defects Detected': true,
    'Organic Certified': false,
    'Meets Category Standards': true,
    'Production Method Verified': true,
  });
  const [notes, setNotes] = useState({
    tastingNotes: '',
    technicalNotes: '',
    recommendations: '',
  });
  const [awardLevel, setAwardLevel] = useState('GOLD');
  const [showAwardDropdown, setShowAwardDropdown] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  // Auto-save key based on product ID
  const getStorageKey = (productId: string) => `evaluation_draft_${productId}`;

  // Note: Draft loading is now handled in fetchProduct to prioritize existing evaluation data

  // Auto-save form data to localStorage
  useEffect(() => {
    if (product?.id) {
      const draft = {
        scores,
        attributes,
        notes,
        awardLevel,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(getStorageKey(product.id), JSON.stringify(draft));
      setIsDraftSaved(true);
      // Hide the indicator after 2 seconds
      const timer = setTimeout(() => setIsDraftSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [scores, attributes, notes, awardLevel, product?.id]);

  // Clear saved draft after successful submission
  const clearSavedDraft = () => {
    if (product?.id) {
      localStorage.removeItem(getStorageKey(product.id));
    }
  };

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
        
        // Load existing evaluation data if available
        if (data.evaluation) {
          const evaluation = data.evaluation;
          setScores({
            appearance: evaluation.appearanceScore || 8.0,
            aroma: evaluation.aromaScore || 7.5,
            taste: evaluation.tasteScore || 8.5,
            aftertaste: evaluation.aftertasteScore || 7.0,
            harmony: evaluation.harmonyScore || 8.0,
          });
          
          if (evaluation.attributes) {
            try {
              const attrs = typeof evaluation.attributes === 'string' ? JSON.parse(evaluation.attributes) : evaluation.attributes;
              setAttributes(attrs);
            } catch (e) {
              console.error('Error parsing attributes:', e);
            }
          }
          
          setNotes({
            tastingNotes: evaluation.tastingNotes || '',
            technicalNotes: evaluation.technicalNotes || '',
            recommendations: evaluation.recommendations || '',
          });
        } else {
          // If no existing evaluation, check for saved draft
          const savedDraft = localStorage.getItem(getStorageKey(data.id));
          if (savedDraft) {
            try {
              const draft = JSON.parse(savedDraft);
              if (draft.scores) setScores(draft.scores);
              if (draft.attributes) setAttributes(draft.attributes);
              if (draft.notes) setNotes(draft.notes);
              if (draft.awardLevel) setAwardLevel(draft.awardLevel);
            } catch (error) {
              console.error('Error loading saved draft:', error);
            }
          }
        }
        
        // Load award level from certificate if available
        if (data.certificate?.awardLevel) {
          setAwardLevel(data.certificate.awardLevel);
        }
      } else {
        router.push('/admin/submissions');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      router.push('/admin/submissions');
    } finally {
      setIsLoading(false);
    }
  };

  const overallScore = Object.values(scores).reduce((sum, val) => sum + val, 0) / Object.values(scores).length;

  const getScoreLabel = (score: number) => {
    if (score >= 9.0) return 'Outstanding';
    if (score >= 8.0) return 'Excellent';
    if (score >= 7.0) return 'Very Good';
    if (score >= 6.0) return 'Good';
    return 'Fair';
  };

  const updateScore = (key: keyof typeof scores, value: number) => {
    setScores(prev => ({ ...prev, [key]: value }));
  };

  const toggleAttribute = (attr: string) => {
    setAttributes(prev => ({ ...prev, [attr]: !prev[attr] }));
  };

  const mapAwardToEnum = (award: string): string => {
    // If already an enum value, return it directly
    if (['GRAND_GOLD', 'GOLD', 'SILVER', 'BRONZE', 'NONE'].includes(award)) {
      return award;
    }
    
    // Otherwise map display names to enum values
    const mapping: Record<string, string> = {
      'Grand Gold Award': 'GRAND_GOLD',
      'Grand Gold': 'GRAND_GOLD',
      'Gold Award': 'GOLD',
      'Silver Award': 'SILVER',
      'Bronze Award': 'BRONZE',
      'No Award': 'NONE',
    };
    return mapping[award] || 'NONE';
  };

  const handleSubmitEvaluation = async (createCertificate: boolean) => {
    if (!product) return;

    try {
      setIsSubmitting(true);

      // Submit evaluation
      const evalResponse = await fetch('/api/evaluations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          appearanceScore: scores.appearance,
          aromaScore: scores.aroma,
          tasteScore: scores.taste,
          aftertasteScore: scores.aftertaste,
          harmonyScore: scores.harmony,
          totalScore: overallScore,
          tastingNotes: notes.tastingNotes,
          technicalNotes: notes.technicalNotes,
          recommendations: notes.recommendations,
          attributes: attributes,
        }),
      });

      if (!evalResponse.ok) {
        const error = await evalResponse.json();
        throw new Error(error.error || 'Failed to submit evaluation');
      }

      // Create certificate if requested
      if (createCertificate && awardLevel !== 'NONE') {
        const mappedAwardLevel = mapAwardToEnum(awardLevel);
        console.log('Creating certificate with award level:', awardLevel, '→', mappedAwardLevel);
        
        const certResponse = await fetch('/api/certificates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: product.id,
            awardLevel: mappedAwardLevel,
          }),
        });

        if (!certResponse.ok) {
          const error = await certResponse.json();
          throw new Error(error.error || 'Failed to create certificate');
        }
      }

      // Clear saved draft after successful submission
      clearSavedDraft();
      
      alert(createCertificate ? 'Evaluation submitted and certificate created successfully!' : 'Evaluation saved successfully!');
      router.push('/admin/submissions');
    } catch (error: any) {
      console.error('Error submitting evaluation:', error);
      alert(error.message || 'Failed to submit evaluation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!product || !confirm('Are you sure you want to reject this product?')) return;

    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/products/${product.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'REJECTED' }),
      });

      if (response.ok) {
        alert('Product rejected successfully');
        router.push('/admin/submissions');
      } else {
        throw new Error('Failed to reject product');
      }
    } catch (error: any) {
      console.error('Error rejecting product:', error);
      alert(error.message || 'Failed to reject product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetToPending = async () => {
    if (!product || !confirm('Reset this product to Pending status? This will clear any existing evaluation and allow re-evaluation.')) return;

    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/products/${product.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'PENDING' }),
      });

      if (response.ok) {
        alert('Product reset to Pending successfully. You can now re-evaluate it.');
        router.push('/admin/submissions');
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to reset product status');
      }
    } catch (error: any) {
      console.error('Error resetting product:', error);
      alert(error.message || 'Failed to reset product status');
    } finally {
      setIsSubmitting(false);
    }
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

  const submittedDate = new Date(product.submittedAt);
  const formattedDate = submittedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-stone-200/80 sticky top-0 z-30">
        <div className="flex items-center justify-between px-8 h-14">
          <div className="flex items-center gap-3">
            <Link href="/admin/submissions" className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors">
              <iconify-icon icon="lucide:arrow-left" width="16" className="text-stone-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-stone-400">Submissions</span>
              <iconify-icon icon="lucide:chevron-right" width="14" className="text-stone-300" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              <span className="text-stone-900 font-medium">Product Evaluation</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isDraftSaved && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full animate-in fade-in slide-in-from-right">
                <iconify-icon icon="lucide:check-circle" width="12" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                Draft saved
              </span>
            )}
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
              product.status === 'PENDING' ? 'text-gold-700 bg-gold-50' :
              product.status === 'EVALUATED' ? 'text-emerald-700 bg-emerald-50' :
              'text-stone-700 bg-stone-50'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                product.status === 'PENDING' ? 'bg-gold-500' :
                product.status === 'EVALUATED' ? 'bg-emerald-500' :
                'bg-stone-500'
              }`}></span>
              {product.status}
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-8 max-w-5xl">
        {/* Product Info Header */}
        <div className="bg-white rounded-xl border border-stone-200/80 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            {/* Product Image */}
            <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-gold-50 to-orange-50 flex items-center justify-center flex-shrink-0 border border-gold-100 overflow-hidden relative">
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
                <div>
                  <p className="text-xs text-stone-400 mb-1">Producer</p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold-400 to-orange-500 flex items-center justify-center text-white text-xs font-medium">
                      {(product.user.name || 'P')[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-stone-700">{product.user.name}</span>
                  </div>
                </div>
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
                <div>
                  <p className="text-xs text-stone-400 mb-1">Submitted</p>
                  <p className="text-sm font-medium text-stone-700">{formattedDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-6 pt-6 border-t border-stone-100">
            <p className="text-xs text-stone-400 mb-2">Product Description</p>
            <p className="text-sm text-stone-600 leading-relaxed">{product.description || 'No description provided'}</p>
          </div>
        </div>

        {/* Evaluation Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Sensory Scoring */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sensory Scoring */}
            <div className="bg-white rounded-xl border border-stone-200/80 p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                  <iconify-icon icon="lucide:scan-search" width="16" className="text-violet-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>
                <h2 className="text-base font-semibold text-stone-900">Sensory Scoring</h2>
              </div>

              <div className="space-y-6">
                {[
                  { key: 'appearance' as const, label: 'Appearance' },
                  { key: 'aroma' as const, label: 'Aroma' },
                  { key: 'taste' as const, label: 'Taste' },
                  { key: 'aftertaste' as const, label: 'Aftertaste' },
                  { key: 'harmony' as const, label: 'Harmony / Balance' },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-stone-700">{label}</label>
                      <span className="text-sm font-semibold text-stone-900 bg-stone-100 px-2 py-0.5 rounded">{scores[key].toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={scores[key]}
                      onChange={(e) => updateScore(key, parseFloat(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                    <div className="flex justify-between mt-1.5">
                      <span className="text-xs text-stone-400">Poor</span>
                      <span className="text-xs text-stone-400">Excellent</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Attributes */}
            <div className="bg-white rounded-xl border border-stone-200/80 p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <iconify-icon icon="lucide:check-square" width="16" className="text-emerald-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>
                <h2 className="text-base font-semibold text-stone-900">Quality Attributes</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {QUALITY_ATTRIBUTES.map((attr) => (
                  <label
                    key={attr}
                    onClick={() => toggleAttribute(attr)}
                    className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 hover:border-stone-300 cursor-pointer transition-colors"
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${attributes[attr] ? 'border-emerald-500 bg-emerald-500' : 'border-stone-300'}`}>
                      {attributes[attr] && (
                        <iconify-icon icon="lucide:check" width="12" className="text-white" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      )}
                    </div>
                    <span className="text-sm text-stone-700">{attr}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Evaluator Notes */}
            <div className="bg-white rounded-xl border border-stone-200/80 p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <iconify-icon icon="lucide:file-text" width="16" className="text-blue-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>
                <h2 className="text-base font-semibold text-stone-900">Evaluator Notes</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Tasting Notes</label>
                  <textarea
                    rows={3}
                    value={notes.tastingNotes}
                    onChange={(e) => setNotes({ ...notes, tastingNotes: e.target.value })}
                    className="w-full px-4 py-3 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors resize-none"
                    placeholder="Describe the sensory characteristics observed..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Technical Observations</label>
                  <textarea
                    rows={3}
                    value={notes.technicalNotes}
                    onChange={(e) => setNotes({ ...notes, technicalNotes: e.target.value })}
                    className="w-full px-4 py-3 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors resize-none"
                    placeholder="Note any technical aspects, defects, or special characteristics..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Recommendations</label>
                  <textarea
                    rows={2}
                    value={notes.recommendations}
                    onChange={(e) => setNotes({ ...notes, recommendations: e.target.value })}
                    className="w-full px-4 py-3 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors resize-none"
                    placeholder="Any recommendations for the producer or certification decision..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Score Summary & Actions */}
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="bg-white rounded-xl border border-stone-200/80 p-6">
              <h2 className="text-sm font-medium text-stone-500 mb-4">Overall Score</h2>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-gold-50 to-orange-50 border-4 border-gold-200">
                  <span className="text-4xl font-semibold text-gold-600 tracking-tight">{overallScore.toFixed(1)}</span>
                </div>
              </div>
              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gold-700 bg-gold-50 rounded-full">
                  <iconify-icon icon="lucide:star" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  {getScoreLabel(overallScore)}
                </span>
              </div>

              <div className="mt-6 pt-6 border-t border-stone-100 space-y-3">
                {Object.entries(scores).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-xs text-stone-500 capitalize">{key}</span>
                    <span className="text-xs font-medium text-stone-700">{value.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Award Level */}
            <div className="bg-white rounded-xl border border-stone-200/80 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gold-50 flex items-center justify-center">
                  <iconify-icon icon="lucide:trophy" width="16" className="text-gold-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>
                <h2 className="text-base font-semibold text-stone-900">Award Level</h2>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowAwardDropdown(!showAwardDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      awardLevel === 'GRAND_GOLD' ? 'bg-yellow-500' :
                      awardLevel === 'GOLD' ? 'bg-gold-400' :
                      awardLevel === 'SILVER' ? 'bg-stone-400' :
                      awardLevel === 'BRONZE' ? 'bg-orange-400' :
                      'bg-stone-300'
                    }`}>
                      <iconify-icon icon="lucide:award" width="14" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </div>
                    <span>{
                      awardLevel === 'GRAND_GOLD' ? 'Grand Gold Award' :
                      awardLevel === 'GOLD' ? 'Gold Award' :
                      awardLevel === 'SILVER' ? 'Silver Award' :
                      awardLevel === 'BRONZE' ? 'Bronze Award' :
                      'No Award'
                    }</span>
                  </div>
                  <iconify-icon icon="lucide:chevron-down" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties} className="text-stone-400"></iconify-icon>
                </button>

                {showAwardDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border border-stone-200 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                      {['GRAND_GOLD', 'GOLD', 'SILVER', 'BRONZE', 'NONE'].map((award) => (
                        <button
                          key={award}
                          onClick={() => {
                            setAwardLevel(award);
                            setShowAwardDropdown(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 rounded-md transition-colors flex items-center gap-2"
                        >
                          <div className={`w-4 h-4 rounded-full ${
                            award === 'GRAND_GOLD' ? 'bg-yellow-500' :
                            award === 'GOLD' ? 'bg-gold-400' :
                            award === 'SILVER' ? 'bg-stone-400' :
                            award === 'BRONZE' ? 'bg-orange-400' :
                            'bg-stone-300'
                          }`}></div>
                          {
                            award === 'GRAND_GOLD' ? 'Grand Gold Award' :
                            award === 'GOLD' ? 'Gold Award' :
                            award === 'SILVER' ? 'Silver Award' :
                            award === 'BRONZE' ? 'Bronze Award' :
                            'No Award'
                          }
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 p-3 bg-gold-50 rounded-lg">
                <p className="text-xs text-gold-700">
                  Award eligibility: Grand Gold (9.0+), Gold (8.0-8.9), Silver (7.0-7.9), Bronze (6.0-6.9)
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-stone-200/80 p-6">
              <h2 className="text-sm font-medium text-stone-500 mb-4">Actions</h2>
              <div className="space-y-3">
                {product.status === 'REJECTED' ? (
                  // Show Reset button for rejected products
                  <button
                    onClick={handleResetToPending}
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-gold-600 rounded-lg hover:bg-gold-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <iconify-icon icon="lucide:rotate-ccw" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    {isSubmitting ? 'Resetting...' : 'Reset to Pending & Re-evaluate'}
                  </button>
                ) : (
                  // Show normal action buttons for non-rejected products
                  <>
                    <button
                      onClick={() => handleSubmitEvaluation(true)}
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <iconify-icon icon="lucide:check-circle" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      {isSubmitting ? 'Submitting...' : 'Approve & Issue Certificate'}
                    </button>
                    <button
                      onClick={() => handleSubmitEvaluation(false)}
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <iconify-icon icon="lucide:save" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      {isSubmitting ? 'Saving...' : 'Save Evaluation Only'}
                    </button>
                  </>
                )}
                {product.status !== 'REJECTED' && (
                  <button
                    onClick={handleReject}
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-600 bg-white border border-stone-200 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <iconify-icon icon="lucide:x-circle" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    Reject Submission
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
