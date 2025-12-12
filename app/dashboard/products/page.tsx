'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

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
  imageUrl: string | null;
  certificate?: {
    awardLevel: string;
  };
  evaluation?: {
    totalScore?: number;
    overallScore?: number;
  };
}

export default function ProducerProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/dashboard/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (statusFilter && product.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-zinc-100 text-zinc-600',
      UNDER_REVIEW: 'bg-blue-50 text-blue-700',
      EVALUATED: 'bg-violet-50 text-violet-700',
      CERTIFIED: 'bg-emerald-50 text-emerald-700',
      REJECTED: 'bg-red-50 text-red-700',
    };
    return colors[status] || 'bg-zinc-100 text-zinc-600';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      PENDING: 'Submitted',
      UNDER_REVIEW: 'Under Evaluation',
      EVALUATED: 'Scored',
      CERTIFIED: 'Awarded',
      REJECTED: 'Rejected',
    };
    return labels[status] || status;
  };

  const getCategoryIcon = (categoryName: string) => {
    const icons: Record<string, string> = {
      'Olive Oil': 'lucide:droplet',
      'Wine': 'lucide:wine',
      'Cheese': 'lucide:cheese',
      'Coffee': 'lucide:coffee',
      'Honey': 'lucide:hexagon',
      'Tea': 'lucide:leaf',
      'Bakery': 'lucide:cookie',
      'Dairy': 'lucide:milk',
      'Vinegar': 'lucide:grape',
      'Preserves': 'lucide:cherry',
      'Confectionery': 'lucide:candy',
      'Seafood': 'lucide:fish',
    };
    return icons[categoryName] || 'lucide:package';
  };

  const getCategoryGradient = (categoryName: string) => {
    const gradients: Record<string, string> = {
      'Olive Oil': 'from-amber-50 to-orange-50',
      'Wine': 'from-purple-50 to-pink-50',
      'Cheese': 'from-yellow-50 to-amber-50',
      'Coffee': 'from-orange-50 to-amber-50',
      'Honey': 'from-amber-50 to-yellow-50',
      'Tea': 'from-green-50 to-emerald-50',
      'Bakery': 'from-orange-50 to-amber-50',
      'Dairy': 'from-blue-50 to-cyan-50',
      'Vinegar': 'from-purple-50 to-pink-50',
      'Preserves': 'from-red-50 to-orange-50',
      'Confectionery': 'from-pink-50 to-rose-50',
      'Seafood': 'from-teal-50 to-cyan-50',
    };
    return gradients[categoryName] || 'from-zinc-50 to-zinc-100';
  };

  const getCategoryIconColor = (categoryName: string) => {
    const colors: Record<string, string> = {
      'Olive Oil': 'text-amber-300',
      'Wine': 'text-purple-300',
      'Cheese': 'text-yellow-300',
      'Coffee': 'text-orange-300',
      'Honey': 'text-amber-300',
      'Tea': 'text-green-300',
      'Bakery': 'text-orange-300',
      'Dairy': 'text-blue-300',
      'Vinegar': 'text-purple-300',
      'Preserves': 'text-red-300',
      'Confectionery': 'text-pink-300',
      'Seafood': 'text-teal-300',
    };
    return colors[categoryName] || 'text-zinc-300';
  };

  return (
    <div className="antialiased min-h-screen text-zinc-600 bg-zinc-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight mb-1">My Products</h1>
            <p className="text-sm text-zinc-500">Manage and track all your submitted products for certification.</p>
          </div>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-amber-500 to-orange-600 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-sm"
          >
            <iconify-icon icon="lucide:plus" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            Add New Product
          </Link>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl border border-zinc-200/80 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 flex items-center">
                <iconify-icon icon="lucide:search" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>
            
            {/* Filter Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setStatusFilter('')}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  statusFilter === '' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => setStatusFilter('PENDING')}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  statusFilter === 'PENDING' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                Submitted
              </button>
              <button
                onClick={() => setStatusFilter('UNDER_REVIEW')}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  statusFilter === 'UNDER_REVIEW' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                Under Evaluation
              </button>
              <button
                onClick={() => setStatusFilter('EVALUATED')}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  statusFilter === 'EVALUATED' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                Scored
              </button>
              <button
                onClick={() => setStatusFilter('CERTIFIED')}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  statusFilter === 'CERTIFIED' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                Awarded
              </button>
              <button
                onClick={() => setStatusFilter('REJECTED')}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  statusFilter === 'REJECTED' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                Rejected
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-zinc-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                <iconify-icon icon="lucide:grid-3x3" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                <iconify-icon icon="lucide:list" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </button>
            </div>
          </div>
        </div>

        {/* Products Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-zinc-500">
            Showing <span className="font-medium text-zinc-900">{filteredProducts.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-zinc-200/80 p-12 text-center">
            <iconify-icon icon="lucide:package-x" width="48" className="text-zinc-300 mx-auto mb-4"></iconify-icon>
            <p className="text-sm text-zinc-500 mb-4">No products found</p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors"
            >
              <iconify-icon icon="lucide:plus" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              Submit Your First Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl border border-zinc-200/80 overflow-hidden hover:shadow-lg hover:border-zinc-300 transition-all group">
                <div className={`aspect-square bg-gradient-to-br ${getCategoryGradient(product.category.name)} relative overflow-hidden`}>
                  {product.imageUrl ? (
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <iconify-icon icon={getCategoryIcon(product.category.name)} width="48" className={getCategoryIconColor(product.category.name)} style={{ strokeWidth: 1 } as React.CSSProperties}></iconify-icon>
                    </div>
                  )}
                  {product.certificate && (
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 ${
                        product.certificate.awardLevel === 'GOLD' ? 'bg-amber-500 text-white' :
                        product.certificate.awardLevel === 'SILVER' ? 'bg-zinc-400 text-white' :
                        'bg-amber-700 text-white'
                      } text-xs font-medium rounded-full shadow-sm`}>
                        <iconify-icon icon="lucide:trophy" width="12" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        {product.certificate.awardLevel.charAt(0) + product.certificate.awardLevel.slice(1).toLowerCase()}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-zinc-900 leading-tight line-clamp-2">{product.name}</h3>
                  </div>
                  <p className="text-xs text-zinc-500 mb-3">{product.category.name}</p>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mb-4">
                    <iconify-icon icon="lucide:calendar" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    <span>
                      Submitted: {new Date(product.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 ${getStatusColor(product.status)} text-xs font-medium rounded-full`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        product.status === 'CERTIFIED' ? 'bg-emerald-500' :
                        product.status === 'UNDER_REVIEW' ? 'bg-blue-500 animate-pulse' :
                        product.status === 'EVALUATED' ? 'bg-violet-500' :
                        product.status === 'REJECTED' ? 'bg-red-500' :
                        'bg-zinc-400'
                      }`}></span>
                      {getStatusLabel(product.status)}
                    </span>
                    <Link
                      href={`/dashboard/products/${product.id}`}
                      className="text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
