'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  description: string;
}

export default function SubmitPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    category: '',
    origin: '',
    productionDate: '',
    ingredients: '',
    certifications: '',
    volume: '',
    alcoholContent: '',
    storageInstructions: '',
    imageUrl: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is logged in
    if (status !== 'authenticated') {
      alert('You must be logged in to submit a product. Redirecting to sign in...');
      router.push('/auth/signin?callbackUrl=/submit');
      return;
    }

    if (!formData.productName || !formData.category) {
      alert('Please fill in all required fields (Product Name and Category).');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.productName,
          description: formData.productDescription,
          categoryId: formData.category,
          productionCountry: formData.origin,
          ingredients: formData.ingredients,
          volume: formData.volume,
          alcoholContent: formData.alcoholContent,
          imageUrl: formData.imageUrl || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Product submission failed:', error);
        console.error('Response status:', response.status);
        alert(`Failed to create product: ${error.error || 'Unknown error'}`);
        setLoading(false);
        return;
      }

      const result = await response.json();
      console.log('Product created successfully:', result);
      alert('Thank you for your submission! We will review your product and contact you within 24-48 hours.');
      
      // Reset form
      setFormData({
        productName: '',
        productDescription: '',
        category: '',
        origin: '',
        productionDate: '',
        ingredients: '',
        certifications: '',
        volume: '',
        alcoholContent: '',
        storageInstructions: '',
        imageUrl: '',
      });
      setImagePreview(null);
      router.push('/dashboard/products');
    } catch (error: any) {
      console.error('Error submitting product:', error);
      alert(error.message || 'Failed to submit product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', 'products');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({ ...formData, imageUrl: data.url });
        setImagePreview(data.url);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {/* Hero / Introduction */}
      <section className="pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-100/50 rounded-[100%] blur-3xl"></div>
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm text-xs font-semibold text-stone-600 mb-6">
            <iconify-icon icon="lucide:send" width="14" className="text-orange-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            Product Submission
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight mb-5 font-heading">
            Submit your product for evaluation
          </h1>
          
          <p className="text-lg text-stone-500 leading-relaxed max-w-2xl mx-auto mb-8">
            Whether you're a startup launching your first product or an established brand seeking quality validation, our evaluation process provides the credible, independent assessment you need.
          </p>

          {status !== 'authenticated' && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                Please{' '}
                <Link href="/auth/signin?callbackUrl=/submit" className="font-semibold underline">
                  sign in
                </Link>{' '}
                or{' '}
                <Link href="/auth/signup" className="font-semibold underline">
                  create an account
                </Link>{' '}
                to submit your product.
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-stone-500">
            <div className="flex items-center gap-2">
              <iconify-icon icon="lucide:check-circle" width="18" className="text-green-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              <span>Independent evaluation</span>
            </div>
            <div className="flex items-center gap-2">
              <iconify-icon icon="lucide:check-circle" width="18" className="text-green-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              <span>Results in 2-3 weeks</span>
            </div>
            <div className="flex items-center gap-2">
              <iconify-icon icon="lucide:check-circle" width="18" className="text-green-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              <span>Detailed scoring report</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 border-b border-stone-100">
              <h2 className="text-xl font-semibold text-stone-900 font-heading mb-1">Product Submission Form</h2>
              <p className="text-sm text-stone-500">Complete all required fields to submit your product for evaluation.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="productName"
                  required
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="e.g. Premium Extra Virgin Olive Oil"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Product Image */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Product Image
                </label>
                <div className="space-y-3">
                  {imagePreview ? (
                    <div className="relative w-full h-64 rounded-xl border border-stone-200 overflow-hidden">
                      <Image
                        src={imagePreview}
                        alt="Product preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData({ ...formData, imageUrl: '' });
                        }}
                        className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-lg hover:bg-zinc-50 transition-colors"
                      >
                        <iconify-icon icon="lucide:x" width="18" className="text-zinc-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      </button>
                    </div>
                  ) : (
                    <label className="block">
                      <div className="border-2 border-dashed border-stone-300 rounded-xl p-8 text-center hover:border-orange-400 hover:bg-orange-50/30 transition-colors cursor-pointer">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
                            <iconify-icon icon="lucide:image-plus" width="24" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-stone-600 mb-1">
                              {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                            </p>
                            <p className="text-xs text-stone-400">PNG, JPG up to 5MB</p>
                          </div>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Product Description
                </label>
                <textarea
                  rows={4}
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  placeholder="Describe your product, its key features, production method, and unique characteristics..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Category & Origin */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Origin / Country
                  </label>
                  <input
                    type="text"
                    name="origin"
                    value={formData.origin}
                    onChange={handleChange}
                    placeholder="e.g. Italy, Spain, USA"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Production Date */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Production Date
                </label>
                <input
                  type="date"
                  name="productionDate"
                  value={formData.productionDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Ingredients */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Key Ingredients
                </label>
                <textarea
                  rows={2}
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  placeholder="List the main ingredients or components..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Certifications */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Certifications (if any)
                </label>
                <input
                  type="text"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                  placeholder="e.g. Organic, PDO, PGI, Fair Trade"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Volume & Alcohol Content */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Volume / Size
                  </label>
                  <input
                    type="text"
                    name="volume"
                    value={formData.volume}
                    onChange={handleChange}
                    placeholder="e.g. 500ml, 250g"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Alcohol Content (if applicable)
                  </label>
                  <input
                    type="text"
                    name="alcoholContent"
                    value={formData.alcoholContent}
                    onChange={handleChange}
                    placeholder="e.g. 13.5%"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Storage Instructions */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Storage Instructions
                </label>
                <textarea
                  rows={2}
                  name="storageInstructions"
                  value={formData.storageInstructions}
                  onChange={handleChange}
                  placeholder="Temperature requirements, shelf life, special handling..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || status !== 'authenticated'}
                  className="w-full py-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <iconify-icon icon="lucide:loader-2" width="18" className="animate-spin" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <iconify-icon icon="lucide:send" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      Submit Product for Evaluation
                    </>
                  )}
                </button>
                <p className="text-xs text-stone-400 text-center mt-3">
                  By submitting, you agree to our{' '}
                  <a href="/terms" className="text-orange-600 hover:underline">Terms & Conditions</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
