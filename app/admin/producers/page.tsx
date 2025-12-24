'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Producer {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  country: string;
  status: string;
  products: number;
  registered: string | Date;
  category: string;
}

export default function ProducersPage() {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'products' | 'registered'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedProducers, setSelectedProducers] = useState<string[]>([]);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');
  const [selectedProducerId, setSelectedProducerId] = useState<string | null>(null);
  const [producers, setProducers] = useState<Producer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetchProducers();
  }, []);

  const fetchProducers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/producers');
      if (response.ok) {
        const data: Producer[] = await response.json();
        setProducers(data);

        // Calculate stats
        const stats = {
          total: data.length,
          active: data.filter(p => p.status === 'Active').length,
          pending: data.filter(p => p.status === 'Pending' || p.status === 'New').length,
          rejected: data.filter(p => p.status === 'Rejected').length,
        };
        setStats(stats);
      }
    } catch (error) {
      console.error('Error fetching producers:', error);
    } finally {
      setIsLoading(false);
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

  const getGradient = (id: string) => {
    const gradients = [
      'from-gold-400 to-orange-500',
      'from-violet-400 to-purple-500',
      'from-emerald-400 to-teal-500',
      'from-blue-400 to-indigo-500',
      'from-pink-400 to-rose-500',
      'from-yellow-400 to-gold-500',
    ];
    const gradientIndex = id.charCodeAt(0) % gradients.length;
    return gradients[gradientIndex];
  };

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      Active: 'emerald',
      Pending: 'gold',
      New: 'gold',
      Rejected: 'red',
    };
    return statusMap[status] || 'stone';
  };

  // Filter and sort producers
  const filteredProducers = producers
    .filter((producer) => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = producer.name.toLowerCase().includes(searchLower);
      const emailMatch = producer.email.toLowerCase().includes(searchLower);
      const companyMatch = producer.company?.toLowerCase().includes(searchLower);
      
      if (searchTerm && !nameMatch && !emailMatch && !companyMatch) {
        return false;
      }
      // Status filter
      if (statusFilter && producer.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
      // Date filter
      if (dateFilter) {
        const registeredDate = new Date(producer.registered);
        const now = new Date();
        const diffTime = now.getTime() - registeredDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        switch (dateFilter) {
          case 'today':
            if (diffDays !== 0) return false;
            break;
          case 'week':
            if (diffDays > 7) return false;
            break;
          case 'month':
            if (diffDays > 30) return false;
            break;
          case 'year':
            if (diffDays > 365) return false;
            break;
        }
      }
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = (a.company || a.name).localeCompare(b.company || b.name);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'products':
          comparison = a.products - b.products;
          break;
        case 'registered':
          comparison = new Date(a.registered).getTime() - new Date(b.registered).getTime();
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Toggle sort
  const toggleSort = (field: 'name' | 'status' | 'products' | 'registered') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Toggle select producer
  const toggleSelectProducer = (id: string) => {
    if (selectedProducers.includes(id)) {
      setSelectedProducers(selectedProducers.filter((pid) => pid !== id));
    } else {
      setSelectedProducers([...selectedProducers, id]);
    }
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedProducers.length === filteredProducers.length) {
      setSelectedProducers([]);
    } else {
      setSelectedProducers(filteredProducers.map((p) => p.id));
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setDateFilter('');
    setSortBy('name');
    setSortOrder('asc');
  };

  // Handle approve/reject
  const handleProducerAction = (producerId: string, action: 'approve' | 'reject') => {
    setSelectedProducerId(producerId);
    setActionType(action);
    setIsActionModalOpen(true);
  };

  const confirmAction = async () => {
    if (!selectedProducerId) return;

    try {
      const response = await fetch(`/api/admin/producers/${selectedProducerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: actionType }),
      });

      if (response.ok) {
        // Update local state to reflect the change immediately
        setProducers(producers.map(p => {
          if (p.id === selectedProducerId) {
            return {
              ...p,
              status: actionType === 'approve' ? 'Active' : 'Rejected',
            };
          }
          return p;
        }));

        // Close modal and refresh data
        setIsActionModalOpen(false);
        setSelectedProducerId(null);
        
        // Refresh the full list from server
        await fetchProducers();
      } else {
        const errorData = await response.json();
        console.error('Failed to update producer status:', errorData.error);
        alert(`Failed to ${actionType} producer: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error updating producer status:', error);
      alert(`Failed to ${actionType} producer. Please try again.`);
    }
  };

  const getStatusBadge = (status: string, color: string) => {
    const colors: Record<string, string> = {
      gold: 'text-gold-700 bg-gold-50',
      emerald: 'text-emerald-700 bg-emerald-50',
      red: 'text-red-700 bg-red-50',
    };
    const dotColors: Record<string, string> = {
      gold: 'bg-gold-500',
      emerald: 'bg-emerald-500',
      red: 'bg-red-500',
    };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium ${colors[color]} rounded-full`}>
        <span className={`w-1.5 h-1.5 ${dotColors[color]} rounded-full`}></span>
        {status}
      </span>
    );
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-stone-200/80 sticky top-0 z-30">
        <div className="flex items-center justify-between px-8 h-14">
          <div>
            <h1 className="text-lg font-semibold text-stone-900 tracking-tight">Producer Management</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors relative">
              <iconify-icon icon="lucide:bell" width="18" className="text-stone-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-gold-500 rounded-full"></span>
            </button>
            <button className="w-9 h-9 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors">
              <iconify-icon icon="lucide:search" width="18" className="text-stone-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-stone-900 tracking-tight">All Producers</h2>
            <p className="text-sm text-stone-500 mt-0.5">Manage and review registered food producers</p>
          </div>
          {/* Producers register themselves through the public registration form */}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-stone-200/80 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <iconify-icon icon="lucide:users" width="20" className="text-blue-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <div>
                {isLoading ? (
                  <div className="h-8 w-16 bg-stone-100 rounded animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-semibold text-stone-900 tracking-tight">{stats.total}</p>
                )}
                <p className="text-xs text-stone-500">Total Producers</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-stone-200/80 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <iconify-icon icon="lucide:check-circle" width="20" className="text-emerald-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <div>
                {isLoading ? (
                  <div className="h-8 w-16 bg-stone-100 rounded animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-semibold text-stone-900 tracking-tight">{stats.active}</p>
                )}
                <p className="text-xs text-stone-500">Active</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-stone-200/80 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold-50 flex items-center justify-center">
                <iconify-icon icon="lucide:clock" width="20" className="text-gold-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <div>
                {isLoading ? (
                  <div className="h-8 w-16 bg-stone-100 rounded animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-semibold text-stone-900 tracking-tight">{stats.pending}</p>
                )}
                <p className="text-xs text-stone-500">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-stone-200/80 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <iconify-icon icon="lucide:x-circle" width="20" className="text-red-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <div>
                {isLoading ? (
                  <div className="h-8 w-16 bg-stone-100 rounded animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-semibold text-stone-900 tracking-tight">{stats.rejected}</p>
                )}
                <p className="text-xs text-stone-500">Rejected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl border border-stone-200/80 mb-6">
          <div className="p-4 border-b border-stone-100">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                  <iconify-icon icon="lucide:search" width="18" className="text-stone-400" style={{ strokeWidth: 1.5, display: 'block' } as React.CSSProperties}></iconify-icon>
                </div>
                <input
                  type="text"
                  placeholder="Search producers by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Status Filter */}
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none pl-3 pr-9 py-2.5 text-sm border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all cursor-pointer"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                    <option value="suspended">Suspended</option>
                  </select>
                  <iconify-icon icon="lucide:chevron-down" width="16" className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>

                {/* Date Filter */}
                <div className="relative">
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="appearance-none pl-3 pr-9 py-2.5 text-sm border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all cursor-pointer"
                  >
                    <option value="">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                  <iconify-icon icon="lucide:chevron-down" width="16" className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>

                {/* Reset */}
                <button
                  onClick={resetFilters}
                  className="px-3 py-2.5 text-sm text-stone-500 hover:text-stone-700 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="text-left px-5 py-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedProducers.length === filteredProducers.length && filteredProducers.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded border-stone-300 text-gold-500 focus:ring-gold-500/20"
                      />
                    </div>
                  </th>
                  <th className="text-left px-5 py-3">
                    <button
                      onClick={() => toggleSort('name')}
                      className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider hover:text-stone-700 transition-colors"
                    >
                      Producer Name
                      <iconify-icon icon={sortBy === 'name' ? (sortOrder === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down') : 'lucide:arrow-up-down'} width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </button>
                  </th>
                  <th className="text-left px-5 py-3">
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Email</span>
                  </th>
                  <th className="text-left px-5 py-3">
                    <button
                      onClick={() => toggleSort('status')}
                      className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider hover:text-stone-700 transition-colors"
                    >
                      Status
                      <iconify-icon icon={sortBy === 'status' ? (sortOrder === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down') : 'lucide:arrow-up-down'} width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </button>
                  </th>
                  <th className="text-left px-5 py-3">
                    <button
                      onClick={() => toggleSort('products')}
                      className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider hover:text-stone-700 transition-colors"
                    >
                      Products
                      <iconify-icon icon={sortBy === 'products' ? (sortOrder === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down') : 'lucide:arrow-up-down'} width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </button>
                  </th>
                  <th className="text-left px-5 py-3">
                    <button
                      onClick={() => toggleSort('registered')}
                      className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider hover:text-stone-700 transition-colors"
                    >
                      Registered
                      <iconify-icon icon={sortBy === 'registered' ? (sortOrder === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down') : 'lucide:arrow-up-down'} width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </button>
                  </th>
                  <th className="text-right px-5 py-3">
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {isLoading ? (
                  [1, 2, 3, 4, 5, 6].map((i) => (
                    <tr key={i} className="hover:bg-stone-50/50">
                      <td className="px-5 py-4">
                        <div className="w-4 h-4 bg-stone-100 rounded animate-pulse"></div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-stone-100 animate-pulse"></div>
                          <div>
                            <div className="h-4 bg-stone-100 rounded w-32 mb-2 animate-pulse"></div>
                            <div className="h-3 bg-stone-100 rounded w-24 animate-pulse"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="h-4 bg-stone-100 rounded w-40 animate-pulse"></div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="h-6 bg-stone-100 rounded-full w-16 animate-pulse"></div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="h-4 bg-stone-100 rounded w-20 animate-pulse"></div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="h-4 bg-stone-100 rounded w-24 animate-pulse"></div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="h-8 bg-stone-100 rounded w-20 ml-auto animate-pulse"></div>
                      </td>
                    </tr>
                  ))
                ) : filteredProducers.length > 0 ? (
                  filteredProducers.map((producer) => {
                    const initials = getInitials(producer.company || producer.name);
                    const gradient = getGradient(producer.id);
                    const statusColor = getStatusColor(producer.status);
                    const registeredDate = new Date(producer.registered);
                    const formattedDate = registeredDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                    return (
                      <tr key={producer.id} className="hover:bg-stone-50/50 transition-colors">
                        <td className="px-5 py-4">
                          <input
                            type="checkbox"
                            checked={selectedProducers.includes(producer.id)}
                            onChange={() => toggleSelectProducer(producer.id)}
                            className="w-4 h-4 rounded border-stone-300 text-gold-500 focus:ring-gold-500/20"
                          />
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-medium`}>
                              {initials}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-stone-900">{producer.company || producer.name}</p>
                              <p className="text-xs text-stone-400">{producer.category} • {producer.country}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm text-stone-600">{producer.email}</p>
                        </td>
                        <td className="px-5 py-4">
                          {getStatusBadge(producer.status, statusColor)}
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm text-stone-600">{producer.products} product{producer.products !== 1 ? 's' : ''}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm text-stone-600">{formattedDate}</p>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            {producer.status === 'Pending' || producer.status === 'New' ? (
                              <>
                                <button
                                  onClick={() => handleProducerAction(producer.id, 'approve')}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                                >
                                  <iconify-icon icon="lucide:check" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleProducerAction(producer.id, 'reject')}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                                >
                                  <iconify-icon icon="lucide:x" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                                  Reject
                                </button>
                              </>
                            ) : null}
                            <Link
                              href={`/admin/producers/${producer.id}`}
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors"
                              title="View details"
                            >
                              <iconify-icon icon="lucide:eye" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <iconify-icon icon="lucide:users" width="48" className="text-stone-300" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        <p className="text-sm font-medium text-stone-600">No producers found</p>
                        <p className="text-xs text-stone-400">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!isLoading && filteredProducers.length > 0 && (
            <div className="flex items-center justify-between p-4 border-t border-stone-100">
              <p className="text-sm text-stone-500">
                Showing {filteredProducers.length} of {stats.total} producers
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Producers register themselves - no add modal needed */}

      {/* Action Confirmation Modal */}
      {isActionModalOpen && (
        <div className="fixed inset-0 bg-stone-900/70 z-50 flex items-center justify-center p-4" onClick={() => setIsActionModalOpen(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className={`w-14 h-14 rounded-full ${actionType === 'approve' ? 'bg-emerald-100' : 'bg-red-100'} flex items-center justify-center mx-auto mb-4`}>
                <iconify-icon icon={actionType === 'approve' ? 'lucide:check-circle' : 'lucide:x-circle'} width="28" className={actionType === 'approve' ? 'text-emerald-600' : 'text-red-600'} style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h2 className="text-lg font-semibold text-stone-900 tracking-tight mb-2">
                {actionType === 'approve' ? 'Approve Producer' : 'Reject Producer'}
              </h2>
              <p className="text-sm text-stone-500 mb-6">
                {actionType === 'approve' 
                  ? 'Are you sure you want to approve this producer? They will be able to submit products for evaluation.'
                  : 'Are you sure you want to reject this producer? This action can be reversed later.'
                }
              </p>
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => setIsActionModalOpen(false)} className="px-4 py-2.5 text-sm font-medium text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className={`px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-colors ${actionType === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}
                >
                  {actionType === 'approve' ? 'Approve' : 'Reject'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
