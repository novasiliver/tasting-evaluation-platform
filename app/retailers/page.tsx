'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RetailersPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    category: '',
    scoreRange: '',
    region: ''
  });

  const [certificateNumber, setCertificateNumber] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [verificationMessage, setVerificationMessage] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.scoreRange) params.append('score', filters.scoreRange);
    if (filters.region) params.append('region', filters.region);
    
    router.push(`/winners?${params.toString()}`);
  };

  const handleVerifyCertificate = async () => {
    if (!certificateNumber.trim()) {
      setVerificationStatus('error');
      setVerificationMessage('Please enter a certificate number');
      return;
    }

    setVerificationStatus('loading');
    setVerificationMessage('Verifying certificate...');

    try {
      const response = await fetch(`/api/certificates/verify?number=${encodeURIComponent(certificateNumber.trim())}`);
      const data = await response.json();

      if (data.valid && data.certificate) {
        setVerificationStatus('success');
        const cert = data.certificate;
        setVerificationMessage(
          `✓ Certificate ${cert.number} is valid and active.\n\n` +
          `Product: ${cert.productName}\n` +
          `Producer: ${cert.producer}\n` +
          `Category: ${cert.category || 'N/A'}\n` +
          `Award: ${cert.awardLevel} (Score: ${cert.score})\n` +
          `Issued: ${new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
        );
      } else {
        setVerificationStatus('error');
        setVerificationMessage(data.message || 'Certificate not found. Please check the number and try again.');
      }
    } catch (error) {
      console.error('Certificate verification error:', error);
      setVerificationStatus('error');
      setVerificationMessage('Error verifying certificate. Please try again later.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerifyCertificate();
    }
  };
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-[#2E4F3A] to-[#1a2e23]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8">
                <iconify-icon icon="lucide:building-2" width="14" className="text-[#D4AF37]" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/90">For Retailers & Buyers</span>
              </div>
              
              <h1 className="font-serif text-5xl md:text-6xl text-white leading-[1.1] tracking-tight mb-6">
                Why Retailers Trust the Tastecert Seal
              </h1>
              
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                Discover quality-verified artisan brands backed by blind sensory panels and laboratory analysis. Reduce risk, save time, and build a differentiated product assortment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/winners" className="inline-flex items-center justify-center bg-[#D4AF37] hover:bg-[#b08d4b] text-white px-8 py-4 rounded-lg text-base font-semibold transition-all shadow-lg">
                  Browse Certified Products
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center bg-white/10 border-2 border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-lg text-base font-semibold transition-all">
                  Contact for Buyer Access
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-stone-100 relative z-10">
                <Image 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80" 
                  alt="Retail buyer reviewing products" 
                  fill
                  className="opacity-90 object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Buyers */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 tracking-tight mb-4">Benefits for Retail Buyers</h2>
            <p className="text-lg text-stone-600 font-light">Independent verification that helps you make confident sourcing decisions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-[#FDFBF7] rounded-xl border border-stone-200 p-8 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-[#2E4F3A]/10 text-[#2E4F3A] rounded-xl flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:shield-check" width="28" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">Reduce Risk</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Blind-tested products verified by expert panels mean fewer quality surprises and customer complaints after onboarding new suppliers.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-[#FDFBF7] rounded-xl border border-stone-200 p-8 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:clock" width="28" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">Save Time</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Pre-vetted products accelerate your evaluation process. Skip lengthy internal tastings and rely on objective 100-point scores.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-[#FDFBF7] rounded-xl border border-stone-200 p-8 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-[#2E4F3A]/10 text-[#2E4F3A] rounded-xl flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:gem" width="28" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">Discover Standout Products</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Our directory showcases hidden gems from artisan producers — the kind of differentiated products your discerning customers crave.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-[#FDFBF7] rounded-xl border border-stone-200 p-8 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:file-check" width="28" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">Independent Verification</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Unlike supplier-funded awards, our certifications are paid by producers but scored impartially — no pay-for-play, just merit.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="bg-[#FDFBF7] rounded-xl border border-stone-200 p-8 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-[#2E4F3A]/10 text-[#2E4F3A] rounded-xl flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:users" width="28" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">Consumer Trust</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Tastecert seals on-shelf signal quality to your customers, building confidence in your curation and reducing returns.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="bg-[#FDFBF7] rounded-xl border border-stone-200 p-8 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:bar-chart-3" width="28" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">Data-Driven Decisions</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Access detailed score breakdowns and sensory profiles to match products with your store demographics and customer preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Retailers Use Tastecert */}
      <section className="py-20 px-6 bg-[#FDFBF7] border-y border-stone-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 tracking-tight mb-4">How Buyers Use Tastecert</h2>
            <p className="text-lg text-stone-600 font-light">From discovery to shelf placement — streamline your sourcing workflow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2E4F3A] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <iconify-icon icon="lucide:search" width="28" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">1. Search Directory</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Filter by category, score range, region, and producer to find products matching your assortment needs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <iconify-icon icon="lucide:file-text" width="28" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">2. Review Detailed Reports</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Access sensory profiles, scoring breakdowns, and lab test summaries to evaluate quality and fit.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#2E4F3A] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <iconify-icon icon="lucide:handshake" width="28" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">3. Connect with Producers</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Reach out directly via our platform to request samples, pricing, and order information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Preview */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 tracking-tight mb-3">Browse Certified Products</h2>
              <p className="text-lg text-stone-600">Filter by category, score, and region to find your next standout SKU.</p>
            </div>
            <Link href="/winners" className="mt-6 md:mt-0 inline-flex items-center gap-2 text-[#2E4F3A] hover:text-[#D4AF37] font-semibold transition-colors">
              View Full Directory <iconify-icon icon="lucide:arrow-right" width="20"></iconify-icon>
            </Link>
          </div>

          <div className="bg-[#FDFBF7] rounded-2xl border border-stone-200 p-8 mb-8">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wide mb-2 block">Category</label>
                <select 
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full px-4 py-2.5 border border-stone-300 rounded-lg bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  <option value="">All Categories</option>
                  <option value="coffee">Coffee</option>
                  <option value="olive-oil">Olive Oil</option>
                  <option value="honey">Honey</option>
                  <option value="chocolate">Chocolate</option>
                  <option value="spirits">Spirits</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wide mb-2 block">Score Range</label>
                <select 
                  value={filters.scoreRange}
                  onChange={(e) => setFilters({...filters, scoreRange: e.target.value})}
                  className="w-full px-4 py-2.5 border border-stone-300 rounded-lg bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  <option value="">All Scores</option>
                  <option value="gold">85+ (Gold Seal)</option>
                  <option value="silver">75-84 (Silver Seal)</option>
                  <option value="bronze">65-74 (Bronze Seal)</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wide mb-2 block">Region</label>
                <select 
                  value={filters.region}
                  onChange={(e) => setFilters({...filters, region: e.target.value})}
                  className="w-full px-4 py-2.5 border border-stone-300 rounded-lg bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  <option value="">All Regions</option>
                  <option value="north-america">North America</option>
                  <option value="europe">Europe</option>
                  <option value="latin-america">Latin America</option>
                  <option value="asia-pacific">Asia Pacific</option>
                </select>
              </div>

              <div className="flex items-end">
                <button 
                  onClick={handleSearch}
                  className="px-6 py-2.5 bg-[#2E4F3A] hover:bg-[#1a2e23] text-white font-semibold rounded-lg transition-all"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Sample Products */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Single Origin Robusta",
                producer: "Valley Heights Estate",
                category: "Coffee",
                score: 89,
                seal: "Gold",
                image: "https://images.unsplash.com/photo-1524222717473-730000096953?w=800&q=80"
              },
              {
                name: "Organic Saffron Threads",
                producer: "Atlas Mountains Spice",
                category: "Spices",
                score: 92,
                seal: "Gold",
                image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4376fa83-b9cb-4b88-b256-86cb4e040344_1600w.jpg"
              },
              {
                name: "Wildflower Raw Honey",
                producer: "Apiary Co-op No. 4",
                category: "Honey",
                score: 81,
                seal: "Silver",
                image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/df8bd7cd-7cbb-4b65-8e22-3e966cd83b1c_1600w.jpg"
              }
            ].map((product, i) => (
              <div key={i} className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all group">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg ${product.seal === 'Gold' ? 'bg-gradient-to-br from-[#D4AF37] to-[#b08d4b]' : 'bg-gradient-to-br from-stone-400 to-stone-600'}`}>
                      {product.seal} Seal
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg">
                      <span className="text-2xl font-bold text-stone-900">{product.score}</span>
                      <span className="text-xs text-stone-500">/100</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-medium text-stone-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-stone-500 mb-3">{product.producer}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400 uppercase tracking-wider">{product.category}</span>
                    <Link href="/winners" className="text-sm text-[#2E4F3A] hover:text-[#D4AF37] font-semibold">
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Verification Tool */}
      <section id="verify" className="py-20 px-6 bg-gradient-to-br from-[#2E4F3A] to-[#1a2e23] scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37] rounded-2xl mb-6">
              <iconify-icon icon="lucide:shield-check" width="32" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-white tracking-tight mb-4">Certificate Verification Lookup</h2>
            <p className="text-lg text-white/80">Verify any Tastecert certificate instantly to ensure authenticity and validity.</p>
          </div>

          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input 
                  type="text" 
                  value={certificateNumber}
                  onChange={(e) => {
                    setCertificateNumber(e.target.value);
                    setVerificationStatus('idle');
                    setVerificationMessage('');
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter Certificate Number (e.g., TC-2024-1234)" 
                  className="w-full px-6 py-4 rounded-lg bg-white/90 border border-white/30 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
              <button 
                onClick={handleVerifyCertificate}
                disabled={verificationStatus === 'loading'}
                className="px-8 py-4 bg-[#D4AF37] hover:bg-[#b08d4b] text-white font-semibold rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {verificationStatus === 'loading' ? 'Verifying...' : 'Verify Certificate'}
              </button>
            </div>
            
            {verificationMessage && (
              <div className={`mt-6 p-4 rounded-lg ${
                verificationStatus === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-100' 
                  : verificationStatus === 'error'
                  ? 'bg-red-500/20 border border-red-500/30 text-red-100'
                  : 'bg-white/10 border border-white/20 text-white/80'
              }`}>
                <p className="text-sm whitespace-pre-line">{verificationMessage}</p>
              </div>
            )}
            
            <p className="text-xs text-white/60 mt-4 text-center">Or scan the QR code on any certificate</p>
          </div>
        </div>
      </section>

      {/* Buyer Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 tracking-tight mb-4">What Buyers Say</h2>
            <p className="text-lg text-stone-600">Trusted by specialty retailers and distributors worldwide.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#FDFBF7] rounded-xl border border-stone-200 p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-[#2E4F3A]/20 flex items-center justify-center text-[#2E4F3A] font-serif text-2xl font-bold">
                  JL
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900">Jennifer Liu</h4>
                  <p className="text-sm text-stone-500">Category Manager, Gourmet Foods</p>
                  <p className="text-xs text-stone-400">National Specialty Chain</p>
                </div>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed italic">
                "Tastecert has become my first filter when evaluating new artisan suppliers. The blind scoring gives me confidence that I'm bringing in products that will delight our customers, not just products with slick marketing."
              </p>
            </div>

            <div className="bg-[#FDFBF7] rounded-xl border border-stone-200 p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-serif text-2xl font-bold">
                  DR
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900">David Ramirez</h4>
                  <p className="text-sm text-stone-500">VP of Procurement</p>
                  <p className="text-xs text-stone-400">Regional Distributor</p>
                </div>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed italic">
                "The verification portal is a game-changer. We can instantly check if a supplier's claims are legitimate. It's saved us from several bad onboarding decisions and accelerated approvals for quality producers."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#FDFBF7] border-t border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-6">Ready to Discover Exceptional Products?</h2>
          <p className="text-lg text-stone-600 mb-10 max-w-2xl mx-auto">
            Explore our directory of independently verified artisan brands or contact us for dedicated buyer access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/winners" className="inline-flex items-center justify-center px-10 py-4 bg-[#D4AF37] hover:bg-[#b08d4b] text-white rounded-lg font-semibold text-lg transition-all shadow-lg">
              Browse Certified Products
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-10 py-4 bg-white border-2 border-stone-300 hover:border-[#2E4F3A] text-stone-700 hover:text-[#2E4F3A] rounded-lg font-semibold text-lg transition-all">
              Contact for Buyer Access
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

