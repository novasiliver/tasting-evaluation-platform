'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  producer: string;
  category: string;
  categoryLabel: string;
  award: string;
  year: string;
  image: string;
  summary: string;
  description: string;
  score: number;
  origin: string;
  certDate: string;
  judges: string[];
}

interface Category {
  id: string;
  name: string;
}

export default function WinnersGalleryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [awardFilter, setAwardFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch products and categories from API
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Apply filters whenever filters or products change
    applyFilters();
  }, [searchQuery, categoryFilter, awardFilter, yearFilter, products]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/products/winners');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
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

  const applyFilters = () => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.producer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    // Award filter
    if (awardFilter) {
      filtered = filtered.filter((p) => p.award === awardFilter);
    }

    // Year filter
    if (yearFilter) {
      filtered = filtered.filter((p) => p.year === yearFilter);
    }

    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('');
    setAwardFilter('');
    setYearFilter('');
  };

  const getAwardBadge = (award: string) => {
    const normalizedAward = award.toUpperCase();
    const badges = {
      'GRAND_GOLD': {
        bg: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
        icon: 'lucide:award',
        text: 'Grand Gold',
      },
      'GOLD': {
        bg: 'bg-gradient-to-br from-gold-400 to-gold-600',
        icon: 'lucide:trophy',
        text: 'Gold',
      },
      'SILVER': {
        bg: 'bg-gradient-to-br from-stone-300 to-stone-500',
        icon: 'lucide:medal',
        text: 'Silver',
      },
      'BRONZE': {
        bg: 'bg-gradient-to-br from-olive-400 to-olive-700',
        icon: 'lucide:award',
        text: 'Bronze',
      },
    };
    return badges[normalizedAward as keyof typeof badges] || badges.BRONZE;
  };

  return (
    <div className="bg-stone-50 text-stone-600 antialiased min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gold-50/50 to-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold-100 rounded-full mb-6">
              <iconify-icon icon="lucide:trophy" width="14" className="text-gold-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              <span className="text-xs font-medium text-gold-700">Award-Winning Excellence</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-semibold text-stone-900 tracking-tight mb-4">Winners Gallery</h1>
            <p className="text-lg text-stone-500 leading-relaxed">
              Discover exceptional products recognized for their outstanding quality, craftsmanship, and taste by our expert panel of judges.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16 mt-12">
            <div className="text-center">
              <p className="text-3xl font-semibold text-stone-900 tracking-tight">{products.length}</p>
              <p className="text-sm text-stone-500 mt-1">Awarded Products</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-stone-900 tracking-tight">
                {new Set(products.map((p) => p.producer)).size}
              </p>
              <p className="text-sm text-stone-500 mt-1">Certified Producers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-stone-900 tracking-tight">
                {new Set(products.map((p) => p.category)).size}
              </p>
              <p className="text-sm text-stone-500 mt-1">Categories</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-stone-900 tracking-tight">
                {new Set(products.map((p) => p.origin)).size}
              </p>
              <p className="text-sm text-stone-500 mt-1">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-stone-200/80 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                <iconify-icon
                  icon="lucide:search"
                  width="18"
                  className="text-stone-400"
                  style={{ strokeWidth: 1.5, display: 'block' } as React.CSSProperties}
                ></iconify-icon>
              </div>
              <input
                type="text"
                placeholder="Search products or producers..."
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-stone-200 rounded-lg bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Filter */}
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-2.5 text-sm border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 cursor-pointer"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => {
                    const categorySlug = category.name.toLowerCase().replace(/ /g, '-');
                    return (
                      <option key={category.id} value={categorySlug}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
                <iconify-icon
                  icon="lucide:chevron-down"
                  width="16"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                  style={{ strokeWidth: 1.5 } as React.CSSProperties}
                ></iconify-icon>
              </div>

              {/* Award Filter */}
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-2.5 text-sm border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 cursor-pointer"
                  value={awardFilter}
                  onChange={(e) => setAwardFilter(e.target.value)}
                >
                  <option value="">All Awards</option>
                  <option value="GRAND_GOLD">Grand Gold</option>
                  <option value="GOLD">Gold</option>
                  <option value="SILVER">Silver</option>
                  <option value="BRONZE">Bronze</option>
                </select>
                <iconify-icon
                  icon="lucide:chevron-down"
                  width="16"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                  style={{ strokeWidth: 1.5 } as React.CSSProperties}
                ></iconify-icon>
              </div>

              {/* Year Filter */}
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-2.5 text-sm border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 cursor-pointer"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                >
                  <option value="">All Years</option>
                  {Array.from(new Set(products.map(p => p.year))).sort((a, b) => b.localeCompare(a)).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <iconify-icon
                  icon="lucide:chevron-down"
                  width="16"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                  style={{ strokeWidth: 1.5 } as React.CSSProperties}
                ></iconify-icon>
              </div>

              {/* Reset Filters */}
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm text-stone-500 hover:text-stone-700 transition-colors"
              >
                <iconify-icon icon="lucide:x" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-stone-500">
              <span className="font-medium text-stone-900">{filteredProducts.length}</span> award-winning products
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <iconify-icon icon="lucide:loader-2" width="32" className="animate-spin text-stone-400 mx-auto"></iconify-icon>
              <p className="text-sm text-stone-500 mt-4">Loading products...</p>
            </div>
          )}

          {/* No Results */}
          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <iconify-icon icon="lucide:search-x" width="48" className="text-stone-300 mx-auto mb-4"></iconify-icon>
              <p className="text-lg font-medium text-stone-700">No products found</p>
              <p className="text-sm text-stone-500 mt-2">Try adjusting your filters or search terms</p>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const badge = getAwardBadge(product.award);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-stone-200 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-stone-100">
                    <Image
                      src={product.image || 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=400&h=400&fit=crop'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Award Badge */}
                    <div className="absolute top-3 right-3">
                      <div className={`${badge.bg} px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg`}>
                        <iconify-icon icon={badge.icon} width="14" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        <span className="text-xs font-semibold text-white">{badge.text}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-stone-900 text-sm mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-stone-500 mb-3">{product.producer}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-stone-100 rounded text-xs text-stone-600">
                        <iconify-icon icon="lucide:tag" width="12" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        {product.categoryLabel}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-stone-100 rounded text-xs text-stone-600">
                        <iconify-icon icon="lucide:calendar" width="12" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        {product.year}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
          <div className="absolute inset-4 md:inset-8 lg:inset-16 flex items-center justify-center pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-full overflow-y-auto pointer-events-auto">
              <div className="p-6 lg:p-8">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors"
                >
                  <iconify-icon icon="lucide:x" width="20" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </button>

                {/* Content */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Image */}
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100">
                    <Image
                      src={selectedProduct.image || 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=600&h=600&fit=crop'}
                      alt={selectedProduct.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <div className={`${getAwardBadge(selectedProduct.award).bg} px-4 py-2 rounded-full flex items-center gap-2 shadow-lg`}>
                        <iconify-icon
                          icon={getAwardBadge(selectedProduct.award).icon}
                          width="18"
                          className="text-white"
                          style={{ strokeWidth: 1.5 } as React.CSSProperties}
                        ></iconify-icon>
                        <span className="text-sm font-semibold text-white">{getAwardBadge(selectedProduct.award).text} Award</span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <h2 className="text-2xl font-semibold text-stone-900 mb-2">{selectedProduct.name}</h2>
                    <p className="text-stone-500 mb-6">{selectedProduct.producer}</p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3">
                        <iconify-icon icon="lucide:tag" width="18" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        <span className="text-sm text-stone-600">{selectedProduct.categoryLabel}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <iconify-icon icon="lucide:map-pin" width="18" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        <span className="text-sm text-stone-600">{selectedProduct.origin}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <iconify-icon icon="lucide:calendar" width="18" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        <span className="text-sm text-stone-600">Certified: {selectedProduct.certDate}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <iconify-icon icon="lucide:bar-chart-3" width="18" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        <span className="text-sm text-stone-600">Score: {selectedProduct.score}/100</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-stone-900 mb-2">About This Product</h3>
                      <p className="text-sm text-stone-600 leading-relaxed">{selectedProduct.description}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-stone-900 mb-2">Evaluation Panel</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.judges.map((judge, index) => (
                          <span key={index} className="px-3 py-1.5 bg-stone-100 rounded-lg text-xs text-stone-600">
                            {judge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

