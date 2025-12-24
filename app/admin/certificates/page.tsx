'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Certificate {
  id: string;
  certificateNumber: string;
  awardLevel: string;
  issueDate: string | Date;
  isPublished: boolean;
  pdfUrl: string | null;
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
  };
}

export default function CertificatesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    grandGold: 0,
    gold: 0,
    silver: 0,
    bronze: 0,
    published: 0,
  });

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/certificates');
      if (response.ok) {
        const data = await response.json();
        setCertificates(data);

        // Calculate stats
        const stats = {
          total: data.length,
          grandGold: data.filter((c: Certificate) => c.awardLevel === 'GRAND_GOLD').length,
          gold: data.filter((c: Certificate) => c.awardLevel === 'GOLD').length,
          silver: data.filter((c: Certificate) => c.awardLevel === 'SILVER').length,
          bronze: data.filter((c: Certificate) => c.awardLevel === 'BRONZE').length,
          published: data.filter((c: Certificate) => c.isPublished).length,
        };
        setStats(stats);
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
      setError('Failed to fetch certificates');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter certificates based on active tab and search
  const filteredCertificates = certificates.filter((cert) => {
    // Tab filter
    if (activeTab === 'grand-gold' && cert.awardLevel !== 'GRAND_GOLD') return false;
    if (activeTab === 'gold' && cert.awardLevel !== 'GOLD') return false;
    if (activeTab === 'silver' && cert.awardLevel !== 'SILVER') return false;
    if (activeTab === 'bronze' && cert.awardLevel !== 'BRONZE') return false;
    if (activeTab === 'published' && !cert.isPublished) return false;
    if (activeTab === 'unpublished' && cert.isPublished) return false;
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesName = cert.product.name.toLowerCase().includes(searchLower);
      const matchesProducer = (cert.product.user.company || cert.product.user.name).toLowerCase().includes(searchLower);
      const matchesNumber = cert.certificateNumber.toLowerCase().includes(searchLower);
      if (!matchesName && !matchesProducer && !matchesNumber) return false;
    }
    
    return true;
  });

  const handlePreviewCertificate = (cert: Certificate) => {
    setSelectedCertificate(cert);
    setIsPreviewModalOpen(true);
    setOpenDropdownId(null);
  };

  const handleEditCertificate = (cert: Certificate) => {
    setSelectedCertificate(cert);
    setIsEditModalOpen(true);
    setOpenDropdownId(null);
  };

  const handleTogglePublish = async (certId: string, currentStatus: boolean) => {
    try {
      setIsSaving(true);
      const response = await fetch(`/api/certificates/${certId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isPublished: !currentStatus,
        }),
      });

      if (response.ok) {
        await fetchCertificates();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update publish status');
      }
    } catch (error) {
      console.error('Error toggling publish status:', error);
      setError('Failed to update publish status');
    } finally {
      setIsSaving(false);
      setOpenDropdownId(null);
    }
  };

  const handleMoreOptions = (certId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === certId ? null : certId);
  };

  const handleDelete = (cert: Certificate) => {
    setSelectedCertificate(cert);
    setIsDeleteModalOpen(true);
    setOpenDropdownId(null);
  };

  const confirmDelete = async () => {
    if (!selectedCertificate) return;

    try {
      setIsSaving(true);
      const response = await fetch(`/api/certificates/${selectedCertificate.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchCertificates();
        setIsDeleteModalOpen(false);
        setSelectedCertificate(null);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete certificate');
      }
    } catch (error) {
      console.error('Error deleting certificate:', error);
      setError('Failed to delete certificate');
    } finally {
      setIsSaving(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (openDropdownId) setOpenDropdownId(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdownId]);

  // Close modals on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPreviewModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-stone-200/80 sticky top-0 z-30">
        <div className="flex items-center justify-between px-8 h-14">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold text-stone-900">Certificates</h1>
            {!isLoading && (
              <span className="px-2 py-0.5 text-xs font-medium text-stone-500 bg-stone-100 rounded-full">
                {stats.total} Certificate{stats.total !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                <iconify-icon icon="lucide:search" width="16" className="text-stone-400" style={{ strokeWidth: 1.5, display: 'block' } as React.CSSProperties}></iconify-icon>
              </div>
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-9 pr-4 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm text-red-600">{error}</p>
              <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
                <iconify-icon icon="lucide:x" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-stone-200/80 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-stone-500">Total Certificates</span>
              <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                <iconify-icon icon="lucide:file-stack" width="16" className="text-violet-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
            {isLoading ? (
              <div className="h-8 w-16 bg-stone-100 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-semibold text-stone-900 tracking-tight">{stats.total}</p>
            )}
          </div>
          <div className="bg-white rounded-xl border border-stone-200/80 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-stone-500">Grand Gold Awards</span>
              <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
                <iconify-icon icon="lucide:award" width="16" className="text-yellow-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
            {isLoading ? (
              <div className="h-8 w-16 bg-stone-100 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-semibold text-stone-900 tracking-tight">{stats.grandGold}</p>
            )}
          </div>
          <div className="bg-white rounded-xl border border-stone-200/80 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-stone-500">Gold Awards</span>
              <div className="w-8 h-8 rounded-lg bg-gold-50 flex items-center justify-center">
                <iconify-icon icon="lucide:trophy" width="16" className="text-gold-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
            {isLoading ? (
              <div className="h-8 w-16 bg-stone-100 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-semibold text-stone-900 tracking-tight">{stats.gold}</p>
            )}
          </div>
          <div className="bg-white rounded-xl border border-stone-200/80 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-stone-500">Silver Awards</span>
              <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center">
                <iconify-icon icon="lucide:award" width="16" className="text-stone-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
            {isLoading ? (
              <div className="h-8 w-16 bg-stone-100 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-semibold text-stone-900 tracking-tight">{stats.silver}</p>
            )}
          </div>
          <div className="bg-white rounded-xl border border-stone-200/80 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-stone-500">Published</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <iconify-icon icon="lucide:globe" width="16" className="text-emerald-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
            {isLoading ? (
              <div className="h-8 w-16 bg-stone-100 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-semibold text-stone-900 tracking-tight">{stats.published}</p>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-6 mb-6 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 text-sm font-medium -mb-px transition-colors ${
              activeTab === 'all' ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            All Certificates
          </button>
          <button
            onClick={() => setActiveTab('grand-gold')}
            className={`pb-3 text-sm font-medium -mb-px transition-colors ${
              activeTab === 'grand-gold' ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            Grand Gold
          </button>
          <button
            onClick={() => setActiveTab('gold')}
            className={`pb-3 text-sm font-medium -mb-px transition-colors ${
              activeTab === 'gold' ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            Gold
          </button>
          <button
            onClick={() => setActiveTab('silver')}
            className={`pb-3 text-sm font-medium -mb-px transition-colors ${
              activeTab === 'silver' ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            Silver
          </button>
          <button
            onClick={() => setActiveTab('bronze')}
            className={`pb-3 text-sm font-medium -mb-px transition-colors ${
              activeTab === 'bronze' ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            Bronze
          </button>
          <button
            onClick={() => setActiveTab('published')}
            className={`pb-3 text-sm font-medium -mb-px transition-colors ${
              activeTab === 'published' ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setActiveTab('unpublished')}
            className={`pb-3 text-sm font-medium -mb-px transition-colors ${
              activeTab === 'unpublished' ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            Unpublished
          </button>
        </div>

        {/* Certificates Table */}
        {isLoading ? (
          <div className="bg-white rounded-xl border border-stone-200/80">
            <div className="p-8">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-stone-100 rounded-lg animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-stone-100 rounded w-48 mb-2 animate-pulse"></div>
                      <div className="h-3 bg-stone-100 rounded w-32 animate-pulse"></div>
                    </div>
                    <div className="h-6 bg-stone-100 rounded-full w-20 animate-pulse"></div>
                    <div className="h-6 bg-stone-100 rounded-full w-24 animate-pulse"></div>
                    <div className="w-8 h-8 bg-stone-100 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : filteredCertificates.length > 0 ? (
          <div className="bg-white rounded-xl border border-stone-200/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stone-100">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Product</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Producer</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Certificate Number</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Award Level</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Issue Date</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Status</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredCertificates.map((cert) => {
                    const issueDate = new Date(cert.issueDate);
                    const formattedDate = issueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const awardColors: Record<string, { bg: string; text: string }> = {
                      GRAND_GOLD: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
                      GOLD: { bg: 'bg-gold-50', text: 'text-gold-700' },
                      SILVER: { bg: 'bg-stone-100', text: 'text-stone-600' },
                      BRONZE: { bg: 'bg-orange-50', text: 'text-orange-700' },
                    };
                    const awardColor = awardColors[cert.awardLevel] || awardColors.BRONZE;

                    return (
                      <tr key={cert.id} className="hover:bg-stone-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                              {cert.product.imageUrl ? (
                                <Image src={cert.product.imageUrl} alt={cert.product.name} width={48} height={48} className="object-cover" />
                              ) : (
                                <iconify-icon icon="lucide:package" width="24" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-stone-900">{cert.product.name}</p>
                              <p className="text-xs text-stone-400">{cert.product.category.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-stone-600">{cert.product.user.company || cert.product.user.name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-mono text-stone-600">{cert.certificateNumber}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium ${awardColor.bg} ${awardColor.text} rounded-full`}>
                            {cert.awardLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-stone-600">{formattedDate}</p>
                        </td>
                        <td className="px-6 py-4">
                          {cert.isPublished ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-stone-600 bg-stone-100 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                              Unpublished
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <div className="relative">
                              <button
                                onClick={(e) => handleMoreOptions(cert.id, e)}
                                className="w-8 h-8 rounded-lg hover:bg-stone-100 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                                title="More options"
                              >
                                <iconify-icon icon="lucide:more-horizontal" width="16" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                              </button>
                              {openDropdownId === cert.id && (
                                <div className="absolute right-0 bottom-full mb-2 w-40 bg-white border border-stone-200 rounded-lg shadow-lg z-20">
                                  <div className="p-1">
                                    <button
                                      onClick={() => handlePreviewCertificate(cert)}
                                      className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 rounded-md transition-colors flex items-center gap-2"
                                    >
                                      <iconify-icon icon="lucide:eye" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                                      View
                                    </button>
                                    <button
                                      onClick={() => handleEditCertificate(cert)}
                                      className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 rounded-md transition-colors flex items-center gap-2"
                                    >
                                      <iconify-icon icon="lucide:pencil" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleTogglePublish(cert.id, cert.isPublished)}
                                      className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 rounded-md transition-colors flex items-center gap-2"
                                      disabled={isSaving}
                                    >
                                      <iconify-icon icon={cert.isPublished ? 'lucide:eye-off' : 'lucide:eye'} width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                                      {cert.isPublished ? 'Unpublish' : 'Publish'}
                                    </button>
                                    <button
                                      onClick={() => handleDelete(cert)}
                                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center gap-2"
                                    >
                                      <iconify-icon icon="lucide:trash-2" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-stone-200/80 p-12 text-center">
            <iconify-icon icon="lucide:file-x" width="48" className="text-stone-300 mx-auto mb-4" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            <p className="text-sm font-medium text-stone-600 mb-1">No certificates found</p>
            <p className="text-xs text-stone-400">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {isPreviewModalOpen && selectedCertificate && (
        <div className="fixed inset-0 bg-stone-900/70 z-50 flex items-center justify-center p-4" onClick={() => setIsPreviewModalOpen(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-stone-100">
              <h2 className="text-lg font-semibold text-stone-900 tracking-tight">Certificate Preview</h2>
              <button onClick={() => setIsPreviewModalOpen(false)} className="w-8 h-8 rounded-lg hover:bg-stone-100 flex items-center justify-center transition-colors">
                <iconify-icon icon="lucide:x" width="18" className="text-stone-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-stone-400 mb-1">Product</p>
                  <p className="text-sm font-medium text-stone-700">{selectedCertificate.product.name}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-400 mb-1">Certificate Number</p>
                  <p className="text-sm font-mono text-stone-700">{selectedCertificate.certificateNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-400 mb-1">Award Level</p>
                  <p className="text-sm font-medium text-stone-700">{selectedCertificate.awardLevel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedCertificate && (
        <div className="fixed inset-0 bg-stone-900/70 z-50 flex items-center justify-center p-4" onClick={() => setIsEditModalOpen(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-stone-100">
              <h2 className="text-lg font-semibold text-stone-900 tracking-tight">Edit Certificate</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="w-8 h-8 rounded-lg hover:bg-stone-100 flex items-center justify-center transition-colors">
                <iconify-icon icon="lucide:x" width="18" className="text-stone-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </button>
            </div>
            <div className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Award Level <span className="text-red-500">*</span></label>
                <select
                  id="edit-award-level"
                  defaultValue={selectedCertificate.awardLevel}
                  className="w-full px-4 py-2.5 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors"
                >
                  <option value="GRAND_GOLD">Grand Gold</option>
                  <option value="GOLD">Gold</option>
                  <option value="SILVER">Silver</option>
                  <option value="BRONZE">Bronze</option>
                  <option value="NONE">None</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Publish Status</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="edit-publish-status" 
                      value="published" 
                      defaultChecked={selectedCertificate.isPublished} 
                      className="w-4 h-4" 
                    />
                    <span className="text-sm text-stone-700">Published</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="edit-publish-status" 
                      value="unpublished" 
                      defaultChecked={!selectedCertificate.isPublished} 
                      className="w-4 h-4" 
                    />
                    <span className="text-sm text-stone-700">Unpublished</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Certificate Number</label>
                <input
                  type="text"
                  value={selectedCertificate.certificateNumber}
                  disabled
                  className="w-full px-4 py-2.5 text-sm border border-stone-200 rounded-lg bg-stone-50 text-stone-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Product</label>
                <input
                  type="text"
                  value={selectedCertificate.product.name}
                  disabled
                  className="w-full px-4 py-2.5 text-sm border border-stone-200 rounded-lg bg-stone-50 text-stone-500 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-stone-100 bg-stone-50">
              <button 
                onClick={() => setIsEditModalOpen(false)} 
                disabled={isSaving}
                className="px-4 py-2.5 text-sm font-medium text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={async () => {
                  const awardSelect = document.getElementById('edit-award-level') as HTMLSelectElement;
                  const statusRadio = document.querySelector('input[name="edit-publish-status"]:checked') as HTMLInputElement;
                  
                  try {
                    setIsSaving(true);
                    setError(null);
                    
                    const response = await fetch(`/api/certificates/${selectedCertificate.id}`, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        awardLevel: awardSelect.value,
                        isPublished: statusRadio.value === 'published',
                      }),
                    });

                    if (response.ok) {
                      await fetchCertificates();
                      setIsEditModalOpen(false);
                      setSelectedCertificate(null);
                    } else {
                      const data = await response.json();
                      setError(data.error || 'Failed to update certificate');
                    }
                  } catch (error: any) {
                    console.error('Error updating certificate:', error);
                    setError('Failed to update certificate');
                  } finally {
                    setIsSaving(false);
                  }
                }}
                disabled={isSaving}
                className="px-4 py-2.5 text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedCertificate && (
        <div className="fixed inset-0 bg-stone-900/70 z-50 flex items-center justify-center p-4" onClick={() => setIsDeleteModalOpen(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <iconify-icon icon="lucide:trash-2" width="28" className="text-red-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h2 className="text-lg font-semibold text-stone-900 tracking-tight mb-2">Delete Certificate?</h2>
              <p className="text-sm text-stone-500 mb-6">
                Are you sure you want to delete the certificate for <strong>{selectedCertificate.product.name}</strong>? This action cannot be undone.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2.5 text-sm font-medium text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isSaving}
                  className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Deleting...' : 'Delete Certificate'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

