'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  category: { id: string; name: string };
  user: { name: string; company: string | null };
  status: string;
  submittedAt: string;
  volume?: string;
  brand?: string;
  evaluation?: any;
  certificate?: any;
}

interface Submission {
  id: string;
  name: string;
  details: string;
  category: string;
  categoryColor: string;
  icon: string;
  producer: string;
  producerInitial: string;
  producerGradient: string;
  status: string;
  statusColor: string;
  date: string;
  time: string;
}

export default function SubmissionsPage() {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'producer' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    underReview: 0,
    evaluated: 0,
    certified: 0,
  });

  // Category colors mapping
  const categoryColors: Record<string, { color: string; icon: string }> = {
    'Olive Oil': { color: 'amber', icon: 'lucide:droplet' },
    'Wine': { color: 'red', icon: 'lucide:wine' },
    'Cheese': { color: 'yellow', icon: 'lucide:triangle' },
    'Honey': { color: 'orange', icon: 'lucide:hexagon' },
    'Chocolate': { color: 'amber', icon: 'lucide:square' },
    'Coffee': { color: 'zinc', icon: 'lucide:coffee' },
    'Spirits': { color: 'violet', icon: 'lucide:flask-conical' },
    'Specialty Foods': { color: 'emerald', icon: 'lucide:utensils' },
  };

  const getCategoryColor = (categoryName: string) => {
    return categoryColors[categoryName]?.color || 'zinc';
  };

  const getCategoryIcon = (categoryName: string) => {
    return categoryColors[categoryName]?.icon || 'lucide:package';
  };

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: 'amber',
      UNDER_REVIEW: 'blue',
      EVALUATED: 'emerald',
      CERTIFIED: 'emerald',
      REJECTED: 'red',
    };
    return statusMap[status] || 'zinc';
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

  useEffect(() => {
    fetchSubmissions();
    fetchCategories();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/products');
      if (response.ok) {
        const products: Product[] = await response.json();
        
        // Calculate stats
        const stats = {
          total: products.length,
          pending: products.filter(p => p.status === 'PENDING').length,
          underReview: products.filter(p => p.status === 'UNDER_REVIEW').length,
          evaluated: products.filter(p => p.status === 'EVALUATED').length,
          certified: products.filter(p => p.status === 'CERTIFIED').length,
        };
        setStats(stats);

        // Transform products to submissions format
        const transformed: Submission[] = products.map((product) => {
          const submittedDate = new Date(product.submittedAt);
          const producerName = product.user.company || product.user.name;
          const initials = producerName
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);

          // Generate gradient based on producer name
          const gradients = [
            'from-amber-400 to-orange-500',
            'from-violet-400 to-purple-500',
            'from-emerald-400 to-teal-500',
            'from-blue-400 to-indigo-500',
            'from-pink-400 to-rose-500',
            'from-yellow-400 to-amber-500',
          ];
          const gradientIndex = product.id.charCodeAt(0) % gradients.length;
          const gradient = gradients[gradientIndex];

          const details = [product.volume, product.brand].filter(Boolean).join(' • ') || 'No details';

          return {
            id: product.id,
            name: product.name,
            details,
            category: product.category.name,
            categoryColor: getCategoryColor(product.category.name),
            icon: getCategoryIcon(product.category.name),
            producer: producerName,
            producerInitial: initials,
            producerGradient: gradient,
            status: getStatusLabel(product.status),
            statusColor: getStatusColor(product.status),
            date: submittedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: submittedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          };
        });

        setSubmissions(transformed);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Filter and sort submissions
  const filteredSubmissions = submissions
    .filter((submission) => {
      // Search filter
      if (searchTerm && !submission.name.toLowerCase().includes(searchTerm.toLowerCase()) && !submission.producer.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      // Category filter
      if (categoryFilter && submission.category !== categoryFilter) {
        return false;
      }
      // Status filter
      if (statusFilter && submission.status !== statusFilter) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'producer':
          comparison = a.producer.localeCompare(b.producer);
          break;
        case 'date':
          // Parse date string (format: "Jan 18, 2024")
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          comparison = dateA - dateB;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Toggle sort
  const toggleSort = (field: 'name' | 'producer' | 'date') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setStatusFilter('');
    setSortBy('date');
    setSortOrder('desc');
  };

  // Export submissions
  const exportSubmissions = () => {
    // In a real app, this would generate a CSV or Excel file
    const dataStr = JSON.stringify(filteredSubmissions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `submissions_${new Date().toISOString()}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getStatusBadge = (status: string, color: string) => {
    const colors: Record<string, string> = {
      amber: 'text-amber-700 bg-amber-50',
      blue: 'text-blue-700 bg-blue-50',
      emerald: 'text-emerald-700 bg-emerald-50',
      red: 'text-red-700 bg-red-50',
    };
    const dotColors: Record<string, string> = {
      amber: 'bg-amber-500',
      blue: 'bg-blue-500',
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
      <header className="bg-white border-b border-zinc-200/80 sticky top-0 z-30">
        <div className="flex items-center justify-between px-8 h-14">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-zinc-900 tracking-tight">Product Submissions</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-lg border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors relative">
              <iconify-icon icon="lucide:bell" width="18" className="text-zinc-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
            </button>
            <button className="w-9 h-9 rounded-lg border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors">
              <iconify-icon icon="lucide:help-circle" width="18" className="text-zinc-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-6">
          <p className="text-sm text-zinc-500">Review and evaluate product submissions from producers</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-zinc-200/80 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center">
                <iconify-icon icon="lucide:inbox" width="20" className="text-zinc-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <span className="text-xs font-medium text-zinc-400">Total</span>
            </div>
            {isLoading ? (
              <div className="h-8 w-16 bg-zinc-100 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-semibold text-zinc-900 tracking-tight">{stats.total}</p>
            )}
            <p className="text-xs text-zinc-500 mt-1">All submissions</p>
          </div>
          <div className="bg-white rounded-xl border border-zinc-200/80 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <iconify-icon icon="lucide:clock" width="20" className="text-amber-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <span className="text-xs font-medium text-amber-600">Pending</span>
            </div>
            {isLoading ? (
              <div className="h-8 w-16 bg-zinc-100 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-semibold text-zinc-900 tracking-tight">{stats.pending}</p>
            )}
            <p className="text-xs text-zinc-500 mt-1">Awaiting review</p>
          </div>
          <div className="bg-white rounded-xl border border-zinc-200/80 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <iconify-icon icon="lucide:eye" width="20" className="text-blue-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <span className="text-xs font-medium text-blue-600">In Review</span>
            </div>
            {isLoading ? (
              <div className="h-8 w-16 bg-zinc-100 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-semibold text-zinc-900 tracking-tight">{stats.underReview}</p>
            )}
            <p className="text-xs text-zinc-500 mt-1">Being evaluated</p>
          </div>
          <div className="bg-white rounded-xl border border-zinc-200/80 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <iconify-icon icon="lucide:check-circle" width="20" className="text-emerald-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <span className="text-xs font-medium text-emerald-600">Completed</span>
            </div>
            {isLoading ? (
              <div className="h-8 w-16 bg-zinc-100 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-semibold text-zinc-900 tracking-tight">{stats.evaluated + stats.certified}</p>
            )}
            <p className="text-xs text-zinc-500 mt-1">Evaluated & Certified</p>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl border border-zinc-200/80">
          {/* Table Header with Search and Filters */}
          <div className="p-5 border-b border-zinc-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                  <iconify-icon icon="lucide:search" width="18" className="text-zinc-400" style={{ strokeWidth: 1.5, display: 'block' } as React.CSSProperties}></iconify-icon>
                </div>
                <input
                  type="text"
                  placeholder="Search products or producers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Category Filter */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                      setIsStatusDropdownOpen(false);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
                  >
                    <iconify-icon icon="lucide:tag" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties} className="text-zinc-400"></iconify-icon>
                    <span>{categoryFilter || 'All Categories'}</span>
                    <iconify-icon icon="lucide:chevron-down" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties} className="text-zinc-400"></iconify-icon>
                  </button>
                  {isCategoryDropdownOpen && (
                    <div className="absolute top-full mt-2 left-0 bg-white border border-zinc-200 rounded-lg shadow-lg py-2 z-10 min-w-[180px] max-h-64 overflow-y-auto">
                      <button onClick={() => { setCategoryFilter(''); setIsCategoryDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50">All Categories</button>
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => { setCategoryFilter(cat.name); setIsCategoryDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsStatusDropdownOpen(!isStatusDropdownOpen);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
                  >
                    <iconify-icon icon="lucide:filter" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties} className="text-zinc-400"></iconify-icon>
                    <span>{statusFilter || 'All Statuses'}</span>
                    <iconify-icon icon="lucide:chevron-down" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties} className="text-zinc-400"></iconify-icon>
                  </button>
                  {isStatusDropdownOpen && (
                    <div className="absolute top-full mt-2 left-0 bg-white border border-zinc-200 rounded-lg shadow-lg py-2 z-10 min-w-[180px]">
                      <button onClick={() => { setStatusFilter(''); setIsStatusDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50">All Statuses</button>
                      <button onClick={() => { setStatusFilter('Pending'); setIsStatusDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50">Pending</button>
                      <button onClick={() => { setStatusFilter('In Review'); setIsStatusDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50">In Review</button>
                      <button onClick={() => { setStatusFilter('Evaluated'); setIsStatusDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50">Evaluated</button>
                      <button onClick={() => { setStatusFilter('Certified'); setIsStatusDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50">Certified</button>
                      <button onClick={() => { setStatusFilter('Rejected'); setIsStatusDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50">Rejected</button>
                    </div>
                  )}
                </div>

                {/* Export Button */}
                <button
                  onClick={exportSubmissions}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
                >
                  <iconify-icon icon="lucide:download" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties} className="text-zinc-400"></iconify-icon>
                  Export
                </button>

                {/* Reset Button */}
                {(searchTerm || categoryFilter || statusFilter) && (
                  <button
                    onClick={resetFilters}
                    className="px-3 py-2.5 text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left px-6 py-4">
                    <button
                      onClick={() => toggleSort('name')}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider hover:text-zinc-700 transition-colors"
                    >
                      Product Name
                      <iconify-icon icon={sortBy === 'name' ? (sortOrder === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down') : 'lucide:arrow-up-down'} width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties} className="text-zinc-400"></iconify-icon>
                    </button>
                  </th>
                  <th className="text-left px-6 py-4">
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Category</span>
                  </th>
                  <th className="text-left px-6 py-4">
                    <button
                      onClick={() => toggleSort('producer')}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider hover:text-zinc-700 transition-colors"
                    >
                      Producer
                      <iconify-icon icon={sortBy === 'producer' ? (sortOrder === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down') : 'lucide:arrow-up-down'} width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties} className="text-zinc-400"></iconify-icon>
                    </button>
                  </th>
                  <th className="text-left px-6 py-4">
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</span>
                  </th>
                  <th className="text-left px-6 py-4">
                    <button
                      onClick={() => toggleSort('date')}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider hover:text-zinc-700 transition-colors"
                    >
                      Submission Date
                      <iconify-icon icon={sortBy === 'date' ? (sortOrder === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down') : 'lucide:arrow-up-down'} width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties} className="text-zinc-400"></iconify-icon>
                    </button>
                  </th>
                  <th className="text-right px-6 py-4">
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {isLoading ? (
                  [1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="hover:bg-zinc-50/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-zinc-100 animate-pulse"></div>
                          <div>
                            <div className="h-4 bg-zinc-100 rounded w-32 mb-2 animate-pulse"></div>
                            <div className="h-3 bg-zinc-100 rounded w-24 animate-pulse"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-6 bg-zinc-100 rounded-full w-20 animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-zinc-100 rounded w-24 animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-6 bg-zinc-100 rounded-full w-16 animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-zinc-100 rounded w-20 animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="h-8 bg-zinc-100 rounded w-20 ml-auto animate-pulse"></div>
                      </td>
                    </tr>
                  ))
                ) : filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((item) => {
                    const categoryColorClass = `bg-${item.categoryColor}-50`;
                    const categoryTextClass = `text-${item.categoryColor}-600`;
                    const categoryBadgeClass = `text-${item.categoryColor}-700 bg-${item.categoryColor}-50`;
                    
                    return (
                      <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg ${categoryColorClass} flex items-center justify-center flex-shrink-0`}>
                              <iconify-icon icon={item.icon} width="18" className={categoryTextClass} style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-zinc-900">{item.name}</p>
                              <p className="text-xs text-zinc-400">{item.details}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium ${categoryBadgeClass} rounded-full`}>
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${item.producerGradient} flex items-center justify-center text-white text-xs font-medium flex-shrink-0`}>
                              {item.producerInitial}
                            </div>
                            <span className="text-sm text-zinc-600">{item.producer}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(item.status, item.statusColor)}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-zinc-600">{item.date}</p>
                          <p className="text-xs text-zinc-400">{item.time}</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/admin/submissions/${item.id}/evaluate`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
                          >
                            <iconify-icon icon="lucide:clipboard-check" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                            Evaluate
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <iconify-icon icon="lucide:inbox" width="48" className="text-zinc-300" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        <p className="text-sm font-medium text-zinc-600">No submissions found</p>
                        <p className="text-xs text-zinc-400">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!isLoading && filteredSubmissions.length > 0 && (
            <div className="flex items-center justify-between p-5 border-t border-zinc-100">
              <p className="text-sm text-zinc-500">
                Showing {filteredSubmissions.length} of {stats.total} entries
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
