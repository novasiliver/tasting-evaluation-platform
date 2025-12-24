'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  _count?: {
    products: number;
  };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true,
    imageUrl: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stats
  const stats = {
    total: categories.length,
    active: categories.filter(c => c.isActive).length,
    inactive: categories.filter(c => !c.isActive).length,
    totalProducts: categories.reduce((sum, c) => sum + (c._count?.products || 0), 0),
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData({ ...formData, imageUrl: '' });
  };

  const openAddModal = () => {
    setFormData({
      name: '',
      description: '',
      isActive: true,
      imageUrl: '',
    });
    setImageFile(null);
    setImagePreview('');
    setError(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      isActive: category.isActive,
      imageUrl: category.imageUrl || '',
    });
    setImagePreview(category.imageUrl || '');
    setError(null);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
    setError(null);
  };

  const handleSaveCategory = async () => {
    if (!formData.name.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      // Upload image if there's a new file
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        const formDataImage = new FormData();
        formDataImage.append('file', imageFile);
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formDataImage,
        });
        if (uploadResponse.ok) {
          const { url } = await uploadResponse.json();
          imageUrl = url;
        }
      }

      const data = {
        name: formData.name,
        description: formData.description,
        isActive: formData.isActive,
        imageUrl,
      };

      let response;
      if (isEditModalOpen && selectedCategory) {
        // Update category
        response = await fetch(`/api/categories/${selectedCategory.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } else {
        // Create category
        response = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      }

      if (response.ok) {
        await fetchCategories();
        closeModal();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to save category');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      setError('Failed to save category');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    try {
      setIsSaving(true);
      const response = await fetch(`/api/categories/${selectedCategory.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchCategories();
        closeModal();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Failed to delete category');
    } finally {
      setIsSaving(false);
    }
  };

  // Filter and sort categories
  const filteredCategories = categories
    .filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || 
        (statusFilter === 'active' && category.isActive) ||
        (statusFilter === 'inactive' && !category.isActive);
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'products-desc') return (b._count?.products || 0) - (a._count?.products || 0);
      if (sortBy === 'products-asc') return (a._count?.products || 0) - (b._count?.products || 0);
      return 0;
    });

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-stone-200/80 sticky top-0 z-30">
        <div className="flex items-center justify-between px-8 h-14">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold text-stone-900">Categories</h1>
            {!isLoading && (
              <span className="px-2 py-0.5 text-xs font-medium text-stone-500 bg-stone-100 rounded-full">
                {stats.total} Categories
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
            >
              <iconify-icon icon="lucide:plus" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              Add Category
            </button>
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
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors appearance-none bg-white pr-10 bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25em_1.25em]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors appearance-none bg-white pr-10 bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25em_1.25em]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="products-desc">Most Products</option>
            <option value="products-asc">Least Products</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-gold-50 flex items-center justify-center">
                <iconify-icon icon="lucide:folder" width="20" className="text-gold-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
            {isLoading ? (
              <div className="h-8 w-16 bg-stone-100 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-semibold text-stone-900 tracking-tight">{stats.total}</p>
            )}
            <p className="text-sm text-stone-500">Total Categories</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <iconify-icon icon="lucide:check-circle" width="20" className="text-emerald-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
            {isLoading ? (
              <div className="h-8 w-16 bg-stone-100 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-semibold text-stone-900 tracking-tight">{stats.active}</p>
            )}
            <p className="text-sm text-stone-500">Active</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center">
                <iconify-icon icon="lucide:pause-circle" width="20" className="text-stone-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
            {isLoading ? (
              <div className="h-8 w-16 bg-stone-100 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-semibold text-stone-900 tracking-tight">{stats.inactive}</p>
            )}
            <p className="text-sm text-stone-500">Inactive</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <iconify-icon icon="lucide:package" width="20" className="text-blue-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
            {isLoading ? (
              <div className="h-8 w-16 bg-stone-100 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-semibold text-stone-900 tracking-tight">{stats.totalProducts}</p>
            )}
            <p className="text-sm text-stone-500">Total Products</p>
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

        {/* Categories Table */}
        {isLoading ? (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
            <iconify-icon icon="lucide:loader-2" width="32" className="animate-spin text-stone-400 mx-auto"></iconify-icon>
            <p className="text-sm text-stone-500 mt-4">Loading categories...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 text-center py-16">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
              <iconify-icon icon="lucide:folder-x" width="32" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">No categories found</h3>
            <p className="text-sm text-stone-500 mb-6">
              {searchTerm || statusFilter ? 'Try adjusting your search or filter criteria' : 'Get started by creating your first category'}
            </p>
            {(searchTerm || statusFilter) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('');
                }}
                className="px-4 py-2 text-sm font-medium text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stone-100">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Category</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Description</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Products</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Status</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category) => (
                    <tr key={category.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 relative">
                            {category.imageUrl ? (
                              <Image src={category.imageUrl} alt={category.name} width={48} height={48} className="object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <iconify-icon icon="lucide:image" width="20" className="text-stone-300" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-stone-900">{category.name}</p>
                            <p className="text-xs text-stone-400">
                              {new Date(category.createdAt).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-stone-600 max-w-xs truncate">
                          {category.description || '—'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-stone-900">{category._count?.products || 0}</span>
                          <span className="text-xs text-stone-400">products</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {category.isActive ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-stone-500 bg-stone-100 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEditModal(category)}
                            className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <iconify-icon icon="lucide:pencil" width="16" className="text-stone-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                          </button>
                          <button
                            onClick={() => openDeleteModal(category)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <iconify-icon icon="lucide:trash-2" width="16" className="text-red-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Category Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-stone-900/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-stone-100">
              <h2 className="text-lg font-semibold text-stone-900 tracking-tight">
                {isAddModalOpen ? 'Add Category' : 'Edit Category'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                <iconify-icon icon="lucide:x" width="20" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-5">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Category Image</label>
                  <div
                    className="border-2 border-dashed border-stone-200 rounded-xl p-6 text-center hover:border-gold-400 hover:bg-gold-50/30 transition-colors cursor-pointer"
                    onClick={() => document.getElementById('fileInput')?.click()}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageSelect}
                    />
                    {imagePreview ? (
                      <div className="relative inline-block w-24 h-24 rounded-xl overflow-hidden mx-auto">
                        <Image src={imagePreview} alt="Preview" width={96} height={96} className="object-cover" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage();
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <iconify-icon icon="lucide:x" width="14" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3">
                          <iconify-icon icon="lucide:image-plus" width="28" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        </div>
                        <p className="text-sm font-medium text-stone-600 mb-1">Click to upload or drag and drop</p>
                        <p className="text-xs text-stone-400">PNG, JPG up to 5MB (Recommended: 400x400px)</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Category Name */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Olive Oil, Wine, Cheese"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of this category..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-colors resize-none"
                  />
                </div>

                {/* Status Toggle */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">Status</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        formData.isActive ? 'bg-emerald-500' : 'bg-stone-300'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                          formData.isActive ? 'left-5' : 'left-0.5'
                        }`}
                      ></span>
                    </button>
                    <span className="text-sm text-stone-600">
                      {formData.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-stone-100 bg-stone-50">
              <button
                onClick={closeModal}
                disabled={isSaving}
                className="px-4 py-2.5 text-sm font-medium text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCategory}
                disabled={isSaving}
                className="px-4 py-2.5 text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving && <iconify-icon icon="lucide:loader-2" width="16" className="animate-spin"></iconify-icon>}
                {isAddModalOpen ? 'Add Category' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedCategory && (
        <div className="fixed inset-0 bg-stone-900/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
            <div className="p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <iconify-icon icon="lucide:trash-2" width="28" className="text-red-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h2 className="text-lg font-semibold text-stone-900 tracking-tight mb-2">Delete Category</h2>
              <p className="text-sm text-stone-500 mb-6">
                Are you sure you want to delete <strong>{selectedCategory.name}</strong>? 
                {selectedCategory._count?.products ? (
                  <span className="text-red-600"> This category has {selectedCategory._count.products} products and cannot be deleted.</span>
                ) : (
                  <span> This action cannot be undone.</span>
                )}
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={closeModal}
                  disabled={isSaving}
                  className="px-4 py-2.5 text-sm font-medium text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCategory}
                  disabled={isSaving || (selectedCategory._count?.products || 0) > 0}
                  className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving && <iconify-icon icon="lucide:loader-2" width="16" className="animate-spin"></iconify-icon>}
                  Delete Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
