'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Winner {
  id: string;
  name: string;
  producer: string;
  award: string;
  awardLabel: string;
  year: string;
  status: string;
  image: string;
  badgeGradient: string;
  badgeBorder: string;
  badgeIcon: string;
  awardBadgeColor: string;
  certificateId?: string;
}

export default function WinnersGalleryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [awardFilter, setAwardFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingWinner, setEditingWinner] = useState<Winner | null>(null);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    unpublished: 0,
    grandGold: 0,
  });

  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/products/winners');
      if (response.ok) {
        const data = await response.json();
        
        // Transform API data to match UI format
        const transformed: Winner[] = data.map((product: any) => {
          const awardLevel = product.award || 'BRONZE';
          const awardMap: Record<string, { label: string; gradient: string; border: string; icon: string; badgeColor: string }> = {
            GRAND_GOLD: {
              label: 'Grand Gold',
              gradient: 'from-yellow-400 to-yellow-600',
              border: 'border-yellow-300',
              icon: 'text-yellow-900',
              badgeColor: 'text-yellow-700 bg-yellow-50',
            },
            GOLD: {
              label: 'Gold',
              gradient: 'from-gold-400 to-gold-600',
              border: 'border-gold-300',
              icon: 'text-white',
              badgeColor: 'text-gold-700 bg-gold-50',
            },
            SILVER: {
              label: 'Silver',
              gradient: 'from-stone-300 to-stone-500',
              border: 'border-stone-200',
              icon: 'text-white',
              badgeColor: 'text-stone-600 bg-stone-100',
            },
            BRONZE: {
              label: 'Bronze',
              gradient: 'from-orange-400 to-orange-600',
              border: 'border-orange-300',
              icon: 'text-orange-900',
              badgeColor: 'text-orange-700 bg-orange-50',
            },
          };
          
          const awardInfo = awardMap[awardLevel] || awardMap.BRONZE;
          const isPublished = product.isPublished !== false; // Default to published if not specified
          
          return {
            id: product.id,
            name: product.name,
            producer: product.producer,
            award: awardLevel === 'GRAND_GOLD' ? 'grand-gold' : awardLevel.toLowerCase(),
            awardLabel: awardInfo.label,
            year: product.year || new Date().getFullYear().toString(),
            status: isPublished ? 'published' : 'unpublished',
            image: product.image || `https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=400&h=400&fit=crop`,
            badgeGradient: awardInfo.gradient,
            badgeBorder: awardInfo.border,
            badgeIcon: awardInfo.icon,
            awardBadgeColor: awardInfo.badgeColor,
            certificateId: product.certificateId,
          };
        });

        setWinners(transformed);

        // Calculate stats
        const stats = {
          total: transformed.length,
          published: transformed.filter(w => w.status === 'published').length,
          unpublished: transformed.filter(w => w.status === 'unpublished').length,
          grandGold: transformed.filter(w => w.award === 'grand-gold').length,
        };
        setStats(stats);
      }
    } catch (error) {
      console.error('Error fetching winners:', error);
      setError('Failed to fetch winners');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditWinner = (winner: any) => {
    setEditingWinner(winner);
    setIsEditModalOpen(true);
  };

  const handleDeleteWinner = (winner: any) => {
    setEditingWinner(winner);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteWinner = async () => {
    if (!editingWinner || !editingWinner.certificateId) return;

    try {
      setIsSaving(true);
      const response = await fetch(`/api/certificates/${editingWinner.certificateId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isPublished: false,
        }),
      });

      if (response.ok) {
        await fetchWinners();
        setIsDeleteModalOpen(false);
        setEditingWinner(null);
        setError(null);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to remove winner');
      }
    } catch (error) {
      console.error('Error removing winner:', error);
      setError('Failed to remove winner');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveWinner = async (formData: { awardLevel: string; isPublished: boolean }) => {
    if (!editingWinner || !editingWinner.certificateId) return;

    try {
      setIsSaving(true);
      setError(null);

      const awardMap: Record<string, 'GRAND_GOLD' | 'GOLD' | 'SILVER' | 'BRONZE'> = {
        'grand-gold': 'GRAND_GOLD',
        'gold': 'GOLD',
        'silver': 'SILVER',
        'bronze': 'BRONZE',
      };

      const response = await fetch(`/api/certificates/${editingWinner.certificateId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          awardLevel: awardMap[formData.awardLevel] || 'BRONZE',
          isPublished: formData.isPublished,
        }),
      });

      if (response.ok) {
        await fetchWinners();
        setIsEditModalOpen(false);
        setEditingWinner(null);
        setError(null);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update winner');
      }
    } catch (error) {
      console.error('Error updating winner:', error);
      setError('Failed to update winner');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePublishStatus = async (winnerId: string) => {
    const winner = winners.find(w => w.id === winnerId);
    if (!winner || !winner.certificateId) return;

    try {
      setIsSaving(true);
      const newStatus = winner.status === 'published' ? false : true;
      
      const response = await fetch(`/api/certificates/${winner.certificateId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isPublished: newStatus,
        }),
      });

      if (response.ok) {
        await fetchWinners(); // Refresh data
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update publish status');
      }
    } catch (error) {
      console.error('Error toggling publish status:', error);
      setError('Failed to update publish status');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredWinners = winners.filter(winner => {
    if (awardFilter && winner.award !== awardFilter) return false;
    if (yearFilter && winner.year !== yearFilter) return false;
    if (statusFilter && winner.status !== statusFilter) return false;
    if (searchTerm && !winner.name.toLowerCase().includes(searchTerm.toLowerCase()) && !winner.producer.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-stone-200/80 sticky top-0 z-30">
        <div className="flex items-center justify-between px-8 h-14">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold text-stone-900">Winners Gallery</h1>
            {!isLoading && (
              <span className="px-2 py-0.5 text-xs font-medium text-stone-500 bg-stone-100 rounded-full">
                {stats.total} Winner{stats.total !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Filters Bar */}
      <div className="bg-white border-b border-stone-200/80 px-8 py-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-64 max-w-md">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              <iconify-icon icon="lucide:search" width="16" className="text-stone-400" style={{ strokeWidth: 1.5, display: 'block' } as React.CSSProperties}></iconify-icon>
            </div>
            <input
              type="text"
              placeholder="Search products or producers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors"
            />
          </div>

          {/* Award Type Filter */}
          <select
            value={awardFilter}
            onChange={(e) => setAwardFilter(e.target.value)}
            className="px-4 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors appearance-none bg-white pr-10 bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25em_1.25em]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}
          >
            <option value="">All Awards</option>
            <option value="grand-gold">Grand Gold</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="bronze">Bronze</option>
          </select>

          {/* Year Filter */}
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-4 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors appearance-none bg-white pr-10 bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25em_1.25em]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}
          >
            <option value="">All Years</option>
            {Array.from(new Set(winners.map(w => w.year))).sort((a, b) => b.localeCompare(a)).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors appearance-none bg-white pr-10 bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25em_1.25em]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-stone-900 text-white' : 'bg-white text-stone-400 hover:bg-stone-50'}`}
            >
              <iconify-icon icon="lucide:grid-3x3" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-stone-900 text-white' : 'bg-white text-stone-400 hover:bg-stone-50'}`}
            >
              <iconify-icon icon="lucide:list" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-gold-50 flex items-center justify-center">
                <iconify-icon icon="lucide:trophy" width="20" className="text-gold-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
            {isLoading ? (
              <div className="h-8 w-16 bg-stone-100 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-semibold text-stone-900 tracking-tight">{stats.total}</p>
            )}
            <p className="text-sm text-stone-500">Total Winners</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <iconify-icon icon="lucide:globe" width="20" className="text-emerald-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
            {isLoading ? (
              <div className="h-8 w-16 bg-stone-100 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-semibold text-stone-900 tracking-tight">{stats.published}</p>
            )}
            <p className="text-sm text-stone-500">Published</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center">
                <iconify-icon icon="lucide:eye-off" width="20" className="text-stone-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
            {isLoading ? (
              <div className="h-8 w-16 bg-stone-100 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-semibold text-stone-900 tracking-tight">{stats.unpublished}</p>
            )}
            <p className="text-sm text-stone-500">Unpublished</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
                <iconify-icon icon="lucide:star" width="20" className="text-yellow-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
            {isLoading ? (
              <div className="h-8 w-16 bg-stone-100 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-semibold text-stone-900 tracking-tight">{stats.grandGold}</p>
            )}
            <p className="text-sm text-stone-500">Grand Gold Awards</p>
          </div>
        </div>

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

        {/* Winners Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                <div className="aspect-square bg-stone-100 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-stone-100 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-stone-100 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredWinners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWinners.map((winner) => (
            <div key={winner.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden group">
              <div className="relative aspect-square overflow-hidden bg-stone-100">
                <Image
                  src={winner.image}
                  alt={winner.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Award Badge */}
                <div className="absolute top-3 left-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${winner.badgeGradient} flex items-center justify-center shadow-lg border-2 ${winner.badgeBorder}`}>
                    <iconify-icon icon="lucide:award" width="24" className={winner.badgeIcon} style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                </div>
                {/* Year Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 text-xs font-semibold text-white bg-stone-900/80 backdrop-blur-sm rounded-full">{winner.year}</span>
                </div>
                {/* Status Badge */}
                <div className="absolute bottom-3 left-3">
                  {winner.status === 'published' ? (
                    <span className="px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-100 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Published
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 text-xs font-medium text-stone-600 bg-stone-100 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                      Unpublished
                    </span>
                  )}
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleEditWinner(winner)}
                    className="p-2.5 bg-white rounded-lg hover:bg-stone-100 transition-colors"
                    title="Edit"
                  >
                    <iconify-icon icon="lucide:pencil" width="18" className="text-stone-700" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </button>
                  <button
                    onClick={() => handleTogglePublishStatus(winner.id)}
                    className="p-2.5 bg-white rounded-lg hover:bg-stone-100 transition-colors"
                    title={winner.status === 'published' ? 'Unpublish' : 'Publish'}
                  >
                    <iconify-icon icon={winner.status === 'published' ? 'lucide:eye-off' : 'lucide:eye'} width="18" className="text-stone-700" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </button>
                  <button
                    onClick={() => handleDeleteWinner(winner)}
                    className="p-2.5 bg-white rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <iconify-icon icon="lucide:trash-2" width="18" className="text-red-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 text-xs font-medium ${winner.awardBadgeColor} rounded`}>{winner.awardLabel}</span>
                </div>
                <h3 className="text-sm font-semibold text-stone-900 mb-1 truncate">{winner.name}</h3>
                <p className="text-xs text-stone-500 truncate">{winner.producer}</p>
              </div>
            </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
            <iconify-icon icon="lucide:trophy" width="48" className="text-stone-300 mx-auto mb-4" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            <p className="text-sm font-medium text-stone-600 mb-1">No winners found</p>
            <p className="text-xs text-stone-400">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Edit Winner Modal */}
      {isEditModalOpen && editingWinner && (
        <div className="fixed inset-0 bg-stone-900/70 z-50 flex items-center justify-center p-4" onClick={() => setIsEditModalOpen(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-stone-100 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-semibold text-stone-900 tracking-tight">Edit Winner</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                <iconify-icon icon="lucide:x" width="20" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </button>
            </div>
            <div className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={editingWinner.name}
                  disabled
                  className="w-full px-4 py-2.5 text-sm border border-stone-200 rounded-lg bg-stone-50 text-stone-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Producer</label>
                <input
                  type="text"
                  value={editingWinner.producer}
                  disabled
                  className="w-full px-4 py-2.5 text-sm border border-stone-200 rounded-lg bg-stone-50 text-stone-500 cursor-not-allowed"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Award Type <span className="text-red-500">*</span></label>
                  <select 
                    id="edit-award"
                    defaultValue={editingWinner.award}
                    className="w-full px-4 py-2.5 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors"
                  >
                    <option value="grand-gold">Grand Gold</option>
                    <option value="gold">Gold</option>
                    <option value="silver">Silver</option>
                    <option value="bronze">Bronze</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Year</label>
                  <input
                    type="text"
                    value={editingWinner.year}
                    disabled
                    className="w-full px-4 py-2.5 text-sm border border-stone-200 rounded-lg bg-stone-50 text-stone-500 cursor-not-allowed"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Status</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="edit-status" value="published" defaultChecked={editingWinner.status === 'published'} className="w-4 h-4" />
                    <span className="text-sm text-stone-700">Published</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="edit-status" value="unpublished" defaultChecked={editingWinner.status === 'unpublished'} className="w-4 h-4" />
                    <span className="text-sm text-stone-700">Unpublished</span>
                  </label>
                </div>
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
                onClick={() => {
                  const awardSelect = document.getElementById('edit-award') as HTMLSelectElement;
                  const statusRadio = document.querySelector('input[name="edit-status"]:checked') as HTMLInputElement;
                  handleSaveWinner({
                    awardLevel: awardSelect.value,
                    isPublished: statusRadio.value === 'published',
                  });
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
      {isDeleteModalOpen && editingWinner && (
        <div className="fixed inset-0 bg-stone-900/70 z-50 flex items-center justify-center p-4" onClick={() => setIsDeleteModalOpen(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <iconify-icon icon="lucide:trash-2" width="28" className="text-red-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h2 className="text-lg font-semibold text-stone-900 tracking-tight mb-2">Remove from Gallery</h2>
              <p className="text-sm text-stone-500 mb-6">
                Are you sure you want to remove <strong>{editingWinner.name}</strong> from the winners gallery? This action cannot be undone.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2.5 text-sm font-medium text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
                  Cancel
                </button>
                <button onClick={confirmDeleteWinner} className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                  Remove Winner
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

