'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  description: string;
  status: string;
  submittedAt: string;
  category: {
    id: string;
    name: string;
  };
  evaluation?: {
    overallScore: number;
    totalScore?: number;
  };
  certificate?: {
    awardLevel: string;
  };
}

interface Producer {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  country: string | null;
  address: string | null;
  website: string | null;
  accountStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  products: Product[];
  stats: {
    totalSubmissions: number;
    approved: number;
    pending: number;
    rejected: number;
  };
}

export default function ProducerDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [producer, setProducer] = useState<Producer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchProducerDetails();
  }, [params.id]);

  const fetchProducerDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/producers/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setProducer(data);
      } else {
        setError('Failed to load producer details');
      }
    } catch (error) {
      console.error('Error fetching producer details:', error);
      setError('Failed to load producer details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProducerAction = async (action: 'approve' | 'reject') => {
    if (!producer) return;
    
    const actionText = action === 'approve' ? 'approve' : 'reject';
    if (!confirm(`Are you sure you want to ${actionText} this producer? ${action === 'approve' ? 'They will be able to submit products.' : 'They will not be able to submit products.'}`)) return;

    try {
      setActionLoading(true);
      const status = action === 'approve' ? 'APPROVED' : 'REJECTED';
      
      const response = await fetch(`/api/admin/producers/${producer.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        alert(`Producer ${actionText}d successfully!`);
        await fetchProducerDetails();
      } else {
        const error = await response.json();
        throw new Error(error.error || `Failed to ${actionText} producer`);
      }
    } catch (error: any) {
      console.error(`Error ${actionText}ing producer:`, error);
      alert(error.message || `Failed to ${actionText} producer`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCloseAccount = async () => {
    if (!producer) return;
    
    if (!confirm(`⚠️ WARNING: Are you sure you want to PERMANENTLY DELETE this producer account?\n\nThis will delete:\n- The producer account\n- All ${producer.stats.totalSubmissions} submitted products\n- All evaluations and certificates\n\nThis action CANNOT be undone!`)) return;

    // Double confirmation
    const confirmText = prompt('Type "DELETE" to confirm account deletion:');
    if (confirmText !== 'DELETE') {
      alert('Account deletion cancelled.');
      return;
    }

    try {
      setActionLoading(true);
      
      const response = await fetch(`/api/admin/producers/${producer.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Producer account deleted successfully!');
        router.push('/admin/producers');
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete producer account');
      }
    } catch (error: any) {
      console.error('Error deleting producer:', error);
      alert(error.message || 'Failed to delete producer account');
    } finally {
      setActionLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; dot: string }> = {
      PENDING: { bg: 'bg-gold-50', text: 'text-gold-700', dot: 'bg-gold-500' },
      UNDER_REVIEW: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
      EVALUATED: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
      CERTIFIED: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
      REJECTED: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    };
    return statusMap[status] || { bg: 'bg-stone-50', text: 'text-stone-700', dot: 'bg-stone-500' };
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: 'Pending',
      UNDER_REVIEW: 'In Review',
      EVALUATED: 'Evaluated',
      CERTIFIED: 'Certified',
      REJECTED: 'Rejected',
    };
    return statusMap[status] || status;
  };

  const getCategoryIcon = (categoryName: string) => {
    const icons: Record<string, string> = {
      'Olive Oil': 'lucide:droplet',
      'Wine': 'lucide:wine',
      'Cheese': 'lucide:moon',
      'Coffee': 'lucide:coffee',
      'Honey': 'lucide:hexagon',
      'Tea': 'lucide:leaf',
    };
    return icons[categoryName] || 'lucide:package';
  };

  const getCategoryColor = (categoryName: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      'Olive Oil': { bg: 'bg-gold-50', text: 'text-gold-600' },
      'Wine': { bg: 'bg-rose-50', text: 'text-rose-600' },
      'Cheese': { bg: 'bg-yellow-50', text: 'text-yellow-600' },
      'Coffee': { bg: 'bg-orange-50', text: 'text-orange-600' },
      'Honey': { bg: 'bg-gold-50', text: 'text-gold-600' },
      'Tea': { bg: 'bg-green-50', text: 'text-green-600' },
    };
    return colors[categoryName] || { bg: 'bg-violet-50', text: 'text-violet-600' };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <iconify-icon icon="lucide:loader-2" width="32" className="animate-spin text-stone-400"></iconify-icon>
      </div>
    );
  }

  if (error || !producer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <iconify-icon icon="lucide:alert-circle" width="48" className="text-red-400 mx-auto mb-4"></iconify-icon>
          <p className="text-lg font-medium text-stone-900">{error || 'Producer not found'}</p>
          <Link
            href="/admin/producers"
            className="mt-4 inline-flex items-center gap-2 text-sm text-gold-600 hover:text-gold-700"
          >
            <iconify-icon icon="lucide:arrow-left" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            Back to Producers
          </Link>
        </div>
      </div>
    );
  }

  const producerStatus = producer.accountStatus === 'APPROVED' ? 'Active' :
                        producer.accountStatus === 'REJECTED' ? 'Rejected' :
                        'Pending Review';

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-stone-200/80 sticky top-0 z-30">
        <div className="flex items-center justify-between px-8 h-14">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/producers"
              className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-700 transition-colors"
            >
              <iconify-icon icon="lucide:arrow-left" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              Back to Producers
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl border border-stone-200/80 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-400 to-orange-500 flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0">
                {getInitials(producer.company || producer.name)}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-semibold text-stone-900 tracking-tight">{producer.company || producer.name}</h1>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
                    producerStatus === 'Active' ? 'text-emerald-700 bg-emerald-50' :
                    producerStatus === 'Rejected' ? 'text-red-700 bg-red-50' :
                    'text-gold-700 bg-gold-50'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      producerStatus === 'Active' ? 'bg-emerald-500' :
                      producerStatus === 'Rejected' ? 'bg-red-500' :
                      'bg-gold-500'
                    }`}></span>
                    {producerStatus}
                  </span>
                </div>
                <p className="text-sm text-stone-500 mb-3">
                  {producer.company ? `${producer.name} • ${producer.email}` : producer.email}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500">
                  {producer.country && (
                    <span className="flex items-center gap-1.5">
                      <iconify-icon icon="lucide:map-pin" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties} className="text-stone-400"></iconify-icon>
                      {producer.country}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <iconify-icon icon="lucide:calendar" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties} className="text-stone-400"></iconify-icon>
                    Registered {new Date(producer.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <iconify-icon icon="lucide:package" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties} className="text-stone-400"></iconify-icon>
                    {producer.stats.totalSubmissions} Products Submitted
                  </span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {producerStatus !== 'Active' && (
                <button
                  onClick={() => handleProducerAction('approve')}
                  disabled={actionLoading}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <iconify-icon icon="lucide:check-circle" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  {actionLoading ? 'Processing...' : 'Approve'}
                </button>
              )}
              {producerStatus !== 'Rejected' && (
                <button
                  onClick={() => handleProducerAction('reject')}
                  disabled={actionLoading}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <iconify-icon icon="lucide:x-circle" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  {actionLoading ? 'Processing...' : 'Reject'}
                </button>
              )}
              <button
                onClick={handleCloseAccount}
                disabled={actionLoading}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-600 bg-stone-100 border border-stone-200 rounded-lg hover:bg-stone-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <iconify-icon icon="lucide:trash-2" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                {actionLoading ? 'Processing...' : 'Close Account'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-6">
            {/* Company Details */}
            <div className="bg-white rounded-xl border border-stone-200/80">
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
                <h2 className="text-base font-semibold text-stone-900">Company Details</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Contact Name</p>
                    <p className="text-sm text-stone-900">{producer.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Company Name</p>
                    <p className="text-sm text-stone-900">{producer.company || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Email Address</p>
                    <a href={`mailto:${producer.email}`} className="text-sm text-gold-600 hover:text-gold-700 transition-colors">{producer.email}</a>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Phone Number</p>
                    {producer.phone ? (
                      <a href={`tel:${producer.phone}`} className="text-sm text-stone-900">{producer.phone}</a>
                    ) : (
                      <p className="text-sm text-stone-400">—</p>
                    )}
                  </div>
                  {producer.country && (
                    <div>
                      <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Country</p>
                      <p className="text-sm text-stone-900">{producer.country}</p>
                    </div>
                  )}
                  {producer.address && (
                    <div className="md:col-span-2">
                      <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Address</p>
                      <p className="text-sm text-stone-900">{producer.address}</p>
                    </div>
                  )}
                  {producer.website && (
                    <div className="md:col-span-2">
                      <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Website</p>
                      <a href={producer.website} target="_blank" rel="noopener noreferrer" className="text-sm text-gold-600 hover:text-gold-700 transition-colors">
                        {producer.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submitted Products */}
            <div className="bg-white rounded-xl border border-stone-200/80">
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
                <h2 className="text-base font-semibold text-stone-900">Submitted Products</h2>
                <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-1 rounded">
                  {producer.products.length} products
                </span>
              </div>
              {producer.products.length === 0 ? (
                <div className="p-12 text-center">
                  <iconify-icon icon="lucide:package-x" width="48" className="text-stone-300 mx-auto mb-4"></iconify-icon>
                  <p className="text-sm text-stone-500">No products submitted yet</p>
                </div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {producer.products.slice(0, 5).map((product) => {
                    const statusColor = getStatusColor(product.status);
                    const categoryColor = getCategoryColor(product.category.name);
                    const categoryIcon = getCategoryIcon(product.category.name);
                    
                    return (
                      <div key={product.id} className="p-4 hover:bg-stone-50/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-lg ${categoryColor.bg} flex items-center justify-center flex-shrink-0`}>
                            <iconify-icon icon={categoryIcon} width="24" className={categoryColor.text} style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="text-sm font-medium text-stone-900 truncate">{product.name}</p>
                              <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${statusColor.text} ${statusColor.bg} rounded-full`}>
                                {getStatusLabel(product.status)}
                              </span>
                            </div>
                            <p className="text-xs text-stone-500 truncate">{product.category.name} • {product.description?.substring(0, 50) || 'No description'}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs text-stone-400">Submitted</p>
                            <p className="text-sm text-stone-600">
                              {new Date(product.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                          <Link
                            href={`/admin/submissions/${product.id}/evaluate`}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors"
                          >
                            <iconify-icon icon="lucide:chevron-right" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {producer.products.length > 5 && (
                <div className="px-6 py-4 border-t border-stone-100">
                  <Link
                    href={`/admin/submissions?producer=${producer.id}`}
                    className="text-sm text-gold-600 hover:text-gold-700 font-medium transition-colors flex items-center gap-1.5"
                  >
                    View all products
                    <iconify-icon icon="lucide:arrow-right" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </Link>
                </div>
              )}
            </div>

            {/* Activity Log */}
            <div className="bg-white rounded-xl border border-stone-200/80">
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
                <h2 className="text-base font-semibold text-stone-900">Activity Log</h2>
              </div>
              <div className="p-6">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-2 bottom-2 w-px bg-stone-200"></div>
                  
                  <div className="space-y-6">
                    {producer.products.length === 0 ? (
                      <div className="relative flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 z-10">
                          <iconify-icon icon="lucide:user-plus" width="16" className="text-violet-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        </div>
                        <div className="flex-1 pb-0">
                          <p className="text-sm text-stone-900">Account registered</p>
                          <p className="text-xs text-stone-400 mt-0.5">
                            {new Date(producer.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date(producer.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ) : (
                      producer.products.slice(0, 6).map((product, index) => {
                        const iconConfig = product.status === 'CERTIFIED' || product.status === 'EVALUATED' ? 
                          { icon: 'lucide:check-circle', color: 'emerald' } :
                          product.status === 'REJECTED' ?
                          { icon: 'lucide:x-circle', color: 'red' } :
                          { icon: 'lucide:package-plus', color: 'gold' };
                        
                        return (
                          <div key={product.id} className="relative flex gap-4">
                            <div className={`w-8 h-8 rounded-full bg-${iconConfig.color}-100 flex items-center justify-center flex-shrink-0 z-10`}>
                              <iconify-icon icon={iconConfig.icon} width="16" className={`text-${iconConfig.color}-600`} style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                            </div>
                            <div className="flex-1 pb-0">
                              <p className="text-sm text-stone-900">
                                {product.status === 'CERTIFIED' || product.status === 'EVALUATED' ? 'Product approved' : 
                                 product.status === 'REJECTED' ? 'Product rejected' : 
                                 'Submitted new product'} <span className="font-medium">{product.name}</span>
                              </p>
                              <p className="text-xs text-stone-400 mt-0.5">
                                {new Date(product.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date(product.submittedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                    
                    {/* Registration activity */}
                    {producer.products.length > 0 && (
                      <div className="relative flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 z-10">
                          <iconify-icon icon="lucide:user-plus" width="16" className="text-violet-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        </div>
                        <div className="flex-1 pb-0">
                          <p className="text-sm text-stone-900">Account registered and email verified</p>
                          <p className="text-xs text-stone-400 mt-0.5">
                            {new Date(producer.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date(producer.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl border border-stone-200/80">
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
                <h2 className="text-base font-semibold text-stone-900">Contact Information</h2>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Primary Contact</p>
                  <p className="text-sm text-stone-900">{producer.name}</p>
                  {producer.company && <p className="text-xs text-stone-500">{producer.company}</p>}
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Email</p>
                  <a href={`mailto:${producer.email}`} className="text-sm text-gold-600 hover:text-gold-700 transition-colors">{producer.email}</a>
                </div>
                {producer.phone && (
                  <div>
                    <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Phone</p>
                    <a href={`tel:${producer.phone}`} className="text-sm text-stone-900">{producer.phone}</a>
                  </div>
                )}
                {producer.website && (
                  <div>
                    <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Website</p>
                    <a href={producer.website} target="_blank" rel="noopener noreferrer" className="text-sm text-gold-600 hover:text-gold-700 transition-colors break-all">
                      {producer.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-xl border border-stone-200/80">
              <div className="px-6 py-4 border-b border-stone-100">
                <h2 className="text-base font-semibold text-stone-900">Statistics</h2>
              </div>
              <div className="p-4 grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-stone-50 rounded-lg">
                  <p className="text-2xl font-semibold text-stone-900 tracking-tight">{producer.stats.totalSubmissions}</p>
                  <p className="text-xs text-stone-500 mt-0.5">Products</p>
                </div>
                <div className="text-center p-3 bg-emerald-50 rounded-lg">
                  <p className="text-2xl font-semibold text-emerald-700 tracking-tight">{producer.stats.approved}</p>
                  <p className="text-xs text-stone-500 mt-0.5">Approved</p>
                </div>
                <div className="text-center p-3 bg-gold-50 rounded-lg">
                  <p className="text-2xl font-semibold text-gold-700 tracking-tight">{producer.stats.pending}</p>
                  <p className="text-xs text-stone-500 mt-0.5">Pending</p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <p className="text-2xl font-semibold text-red-700 tracking-tight">{producer.stats.rejected}</p>
                  <p className="text-xs text-stone-500 mt-0.5">Rejected</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-stone-200/80">
              <div className="px-6 py-4 border-b border-stone-100">
                <h2 className="text-base font-semibold text-stone-900">Quick Actions</h2>
              </div>
              <div className="p-4 space-y-2">
                <button
                  onClick={() => window.location.href = `mailto:${producer.email}`}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-stone-50 transition-colors group text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <iconify-icon icon="lucide:mail" width="18" className="text-blue-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900">Send Email</p>
                    <p className="text-xs text-stone-400">Contact producer directly</p>
                  </div>
                  <iconify-icon icon="lucide:external-link" width="18" className="text-stone-400 group-hover:text-stone-600 transition-colors" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </button>
                <Link
                  href={`/admin/submissions?producer=${producer.id}`}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-stone-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold-50 flex items-center justify-center flex-shrink-0">
                    <iconify-icon icon="lucide:package" width="18" className="text-gold-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900">View All Products</p>
                    <p className="text-xs text-stone-400">See full product list</p>
                  </div>
                  <iconify-icon icon="lucide:arrow-right" width="18" className="text-stone-400 group-hover:text-stone-600 transition-colors" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </Link>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-xl border border-stone-200/80">
              <div className="px-6 py-4 border-b border-stone-100">
                <h2 className="text-base font-semibold text-stone-900">Account Status</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone-600">Account Status</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
                    producerStatus === 'Active' ? 'text-emerald-700 bg-emerald-50' :
                    producerStatus === 'Rejected' ? 'text-red-700 bg-red-50' :
                    'text-gold-700 bg-gold-50'
                  }`}>
                    {producerStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone-600">Member Since</span>
                  <span className="text-sm font-medium text-stone-900">
                    {new Date(producer.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone-600">Email Verified</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700">
                    <iconify-icon icon="lucide:check-circle" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
