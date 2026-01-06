import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Tastecert | Independent Sensory & Technical Certification for Artisan CPG Brands',
  description: 'Earn an impartial seal through blind expert sensory panels and laboratory analysis. Build retailer trust, consumer confidence, and market differentiation.',
  keywords: ['sensory certification', 'artisan food certification', 'CPG certification', 'quality seal', 'independent testing'],
  openGraph: {
    title: 'Tastecert - Independent Sensory & Technical Certification',
    description: 'Build retailer trust and consumer confidence with our scientific certification process.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      {/* 1. HERO SECTION - Above the Fold */}
      <header className="overflow-hidden pt-20 pr-6 pb-24 pl-6 bg-gradient-to-b from-[#FDFBF7] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/50 text-stone-600 text-xs font-medium uppercase tracking-wider border border-stone-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                Independent Certification
              </div>
              
              <h1 className="font-serif text-5xl lg:text-6xl text-stone-900 leading-[1.1] tracking-tight">
                Independent Sensory & Technical Certification for Artisan CPG Brands
              </h1>
              
              <p className="text-xl text-stone-600 leading-relaxed font-light">
                Earn an impartial seal through blind expert sensory panels and laboratory analysis — proven to build retailer trust, consumer confidence, and market differentiation.
              </p>

              {/* Key Benefits Bullets */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#2E4F3A] flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:check" width="14" className="text-white" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <p className="text-base text-stone-700">For artisan food & beverage producers</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#2E4F3A] flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:check" width="14" className="text-white" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <p className="text-base text-stone-700">Scientific 100-point scoring with clear benchmarks</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#2E4F3A] flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:check" width="14" className="text-white" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <p className="text-base text-stone-700">Stand out from superficial paid awards</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#2E4F3A] flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:check" width="14" className="text-white" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <p className="text-base text-stone-700">Real outcomes: increased retailer adoption and sales uplift</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link href="/submit" className="inline-flex items-center justify-center bg-[#D4AF37] hover:bg-[#b08d4b] text-white px-8 py-4 rounded-lg text-base font-semibold transition-all shadow-lg hover:shadow-xl">
                  Start Your Submission
                </Link>
                <Link href="/services" className="inline-flex items-center justify-center bg-white border-2 border-stone-300 hover:border-[#2E4F3A] text-stone-700 hover:text-[#2E4F3A] px-8 py-4 rounded-lg text-base font-semibold transition-all">
                  See Pricing & Process
                </Link>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-stone-100 relative z-10">
                <Image 
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/da6a5e12-2657-426e-8b86-6c8b45764c78_1600w.webp" 
                  alt="Artisan food producer inspecting quality" 
                  fill
                  className="opacity-95 object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#2E4F3A]/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. QUICK BENEFITS GRID */}
      <section className="py-20 px-6 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 tracking-tight mb-4">Why Producers Choose Tastecert</h2>
            <p className="text-lg text-stone-600 font-light">Trusted by artisan brands to validate exceptional quality and unlock market opportunities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Benefit 1 */}
            <div className="bg-[#FDFBF7] p-8 rounded-xl border border-stone-200 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:building-2" width="28" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">Retailer Trust</h3>
              <p className="text-sm text-stone-600 leading-relaxed">Buyers use our independent verification to vet new suppliers, reducing friction and accelerating shelf placement.</p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-[#FDFBF7] p-8 rounded-xl border border-stone-200 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-[#2E4F3A]/10 text-[#2E4F3A] rounded-xl flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:flask-conical" width="28" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">Scientific Rigor</h3>
              <p className="text-sm text-stone-600 leading-relaxed">Blind sensory panels + lab analysis deliver credible 100-point scores that stand up to scrutiny.</p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-[#FDFBF7] p-8 rounded-xl border border-stone-200 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:trending-up" width="28" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">Market Differentiation</h3>
              <p className="text-sm text-stone-600 leading-relaxed">Stand out from pay-to-play awards. Our seal signals true excellence to discerning consumers.</p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-[#FDFBF7] p-8 rounded-xl border border-stone-200 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-[#2E4F3A]/10 text-[#2E4F3A] rounded-xl flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:bar-chart-4" width="28" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">Measurable Results</h3>
              <p className="text-sm text-stone-600 leading-relaxed">Certified brands report increased distribution, premium pricing power, and consumer recognition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section id="works" className="py-24 px-6 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 tracking-tight mb-4">How It Works</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto font-light">A transparent, rigorous evaluation process from submission to certification.</p>
          </div>

          {/* Step Flow Design */}
          <div className="relative max-w-6xl mx-auto">
            {/* Connection Line - Desktop */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-1">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#2E4F3A] to-[#D4AF37] opacity-20 rounded-full"></div>
              </div>
            </div>

            <div className="relative space-y-12 lg:space-y-0 lg:flex lg:items-start lg:justify-between">
              {/* Step 1 */}
              <div className="relative flex flex-col items-center lg:w-1/5">
                <div className="relative z-10 mb-6">
                  <div className="w-24 h-24 bg-white rounded-2xl shadow-xl border-4 border-[#D4AF37] flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                    <svg className="w-10 h-10 text-[#2E4F3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                </div>
                {/* Arrow - Mobile */}
                <div className="lg:hidden flex justify-center mb-4">
                  <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Submit Product</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">Complete online form and ship 3 sample units to our facility</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs text-[#D4AF37] font-medium">
                    <iconify-icon icon="lucide:clock" width="14"></iconify-icon>
                    Days 1-3
                  </div>
                </div>
              </div>

              {/* Arrow - Desktop */}
              <div className="hidden lg:flex items-center justify-center lg:w-12 relative z-0 -mt-6">
                <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-center lg:w-1/5">
                <div className="relative z-10 mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#2E4F3A] to-[#1a2e23] rounded-2xl shadow-xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                </div>
                <div className="lg:hidden flex justify-center mb-4">
                  <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Blind Sensory Panel</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">5-7 certified experts evaluate anonymized samples</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs text-[#D4AF37] font-medium">
                    <iconify-icon icon="lucide:clock" width="14"></iconify-icon>
                    Days 4-10
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center lg:w-12 relative z-0 -mt-6">
                <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-center lg:w-1/5">
                <div className="relative z-10 mb-6">
                  <div className="w-24 h-24 bg-white rounded-2xl shadow-xl border-4 border-[#2E4F3A] flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                    <svg className="w-10 h-10 text-[#2E4F3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                </div>
                <div className="lg:hidden flex justify-center mb-4">
                  <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Lab Analysis</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">Technical tests verify composition, purity, and authenticity</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs text-[#D4AF37] font-medium">
                    <iconify-icon icon="lucide:clock" width="14"></iconify-icon>
                    Days 11-21
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center lg:w-12 relative z-0 -mt-6">
                <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              {/* Step 4 */}
              <div className="relative flex flex-col items-center lg:w-1/5">
                <div className="relative z-10 mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#2E4F3A] to-[#1a2e23] rounded-2xl shadow-xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                </div>
                <div className="lg:hidden flex justify-center mb-4">
                  <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Score & Feedback</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">Receive detailed 100-point score with actionable insights</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs text-[#D4AF37] font-medium">
                    <iconify-icon icon="lucide:clock" width="14"></iconify-icon>
                    Days 22-25
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center lg:w-12 relative z-0 -mt-6">
                <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              {/* Step 5 */}
              <div className="relative flex flex-col items-center lg:w-1/5">
                <div className="relative z-10 mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#b08d4b] rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#2E4F3A] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">5</span>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3">Earn Your Seal</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">85+ score earns Gold Seal for exceptional products</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs text-[#D4AF37] font-medium">
                    <iconify-icon icon="lucide:award" width="14"></iconify-icon>
                    Day 28
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/methodology" className="inline-flex items-center justify-center gap-2 text-[#2E4F3A] font-semibold hover:text-[#D4AF37] transition-colors">
              View Full Methodology <iconify-icon icon="lucide:arrow-right" width="20"></iconify-icon>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. TRUST & CREDIBILITY SECTION */}
      <section className="py-24 px-6 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          {/* Testimonials Carousel */}
          <div className="mb-20">
            <h2 className="font-serif text-3xl text-center text-stone-900 mb-12">What Producers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-[#FDFBF7] p-8 rounded-xl border border-stone-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-serif text-xl font-bold">
                    SC
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900">Sarah Chen</h4>
                    <p className="text-xs text-stone-500">Founder, Mountain Olive Co.</p>
                  </div>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed italic">"The Tastecert Gold Seal opened doors with specialty retailers who previously wouldn't take our calls. It's been transformational for our distribution."</p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-[#FDFBF7] p-8 rounded-xl border border-stone-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-[#2E4F3A]/20 flex items-center justify-center text-[#2E4F3A] font-serif text-xl font-bold">
                    MR
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900">Marcus Rodriguez</h4>
                    <p className="text-xs text-stone-500">Master Distiller, Heritage Spirits</p>
                  </div>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed italic">"Unlike other awards, Tastecert's blind process and scientific scoring gave us credible proof of quality. Buyers actually respect this certification."</p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-[#FDFBF7] p-8 rounded-xl border border-stone-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-serif text-xl font-bold">
                    EP
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900">Elena Petrov</h4>
                    <p className="text-xs text-stone-500">Co-Founder, Artisan Honey Collective</p>
                  </div>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed italic">"The detailed feedback helped us refine our process. Six months later, we achieved Gold certification and saw a 40% increase in wholesale orders."</p>
              </div>
            </div>
          </div>

        </div>
      </section>

       {/* 5. LEAD MAGNET / MID-PAGE CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#2E4F3A] to-[#1a2e23]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37] rounded-2xl mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Free Certification Guide</h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Download our comprehensive playbook for artisan brands seeking independent quality certification.
          </p>

          <a 
            href="/guides/tastecert-certification-guide.pdf" 
            download="Tastecert-Certification-Guide.pdf"
            className="inline-flex items-center justify-center gap-3 bg-[#D4AF37] hover:bg-[#b08d4b] text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all shadow-xl hover:shadow-2xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Free Guide
          </a>

          <p className="text-xs text-white/60 mt-6">PDF • No signup required • Instant download</p>
        </div>
      </section>

      {/* 6. AWARD-WINNING PRODUCTS */}
      <section className="bg-[#FDFBF7] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 mb-12 items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 tracking-tight">Recently Certified Products</h2>
              <p className="text-stone-600 mt-3 font-light">Discover excellence from artisan producers worldwide.</p>
            </div>
            <Link href="/winners" className="text-[#2E4F3A] hover:text-[#D4AF37] font-semibold text-sm flex items-center gap-1 transition-colors">
              Browse Full Directory <iconify-icon icon="lucide:arrow-right" width="16"></iconify-icon>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="group bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="aspect-[16/10] overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1524222717473-730000096953?w=1600&q=80" 
                  alt="Coffee" 
                  fill
                  className="group-hover:scale-105 transition-transform duration-700 object-cover"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-br from-[#D4AF37] to-[#b08d4b] px-3 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wide shadow-lg">
                  Gold Seal
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-serif text-xl text-stone-900 font-medium">Single Origin Robusta</h3>
                    <p className="text-sm text-stone-500 mt-1">Valley Heights Estate</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Coffee / Single Origin</span>
                  <Link href="/winners" className="text-stone-400 hover:text-[#2E4F3A] transition-colors flex items-center gap-1 text-sm font-medium">
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="group bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="aspect-[16/10] overflow-hidden relative">
                <Image 
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/df8bd7cd-7cbb-4b65-8e22-3e966cd83b1c_1600w.jpg" 
                  alt="Honey" 
                  fill
                  className="group-hover:scale-105 transition-transform duration-700 object-cover"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-br from-stone-400 to-stone-600 px-3 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wide shadow-lg">
                  Silver Seal
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-serif text-xl text-stone-900 font-medium">Wildflower Raw Honey</h3>
                    <p className="text-sm text-stone-500 mt-1">Apiary Co-op No. 4</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Pantry / Sweetener</span>
                  <Link href="/winners" className="text-stone-400 hover:text-[#2E4F3A] transition-colors flex items-center gap-1 text-sm font-medium">
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="group bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="aspect-[16/10] overflow-hidden relative">
                <Image 
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4376fa83-b9cb-4b88-b256-86cb4e040344_1600w.jpg" 
                  alt="Spices" 
                  fill
                  className="group-hover:scale-105 transition-transform duration-700 object-cover"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-br from-[#D4AF37] to-[#b08d4b] px-3 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wide shadow-lg">
                  Gold Seal
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-serif text-xl text-stone-900 font-medium">Organic Saffron Threads</h3>
                    <p className="text-sm text-stone-500 mt-1">Atlas Mountains Spice</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Pantry / Spices</span>
                  <Link href="/winners" className="text-stone-400 hover:text-[#2E4F3A] transition-colors flex items-center gap-1 text-sm font-medium">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL STRONG CTA BLOCK */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#2E4F3A] to-[#1a2e23]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-3 rounded-full bg-white/10 mb-6">
            <iconify-icon icon="lucide:award" className="text-[#D4AF37]" width="28"></iconify-icon>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-white tracking-tight mb-6">Ready to Certify Your Exceptional Product?</h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">Join hundreds of artisan producers who've validated their quality and unlocked new market opportunities.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/submit" className="w-full sm:w-auto px-10 py-4 bg-[#D4AF37] hover:bg-[#b08d4b] text-white rounded-lg font-semibold text-lg transition-all shadow-xl hover:shadow-2xl">
              Start Your Submission
            </Link>
            <Link href="/contact" className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-white/30 hover:bg-white/10 text-white rounded-lg font-semibold text-lg transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
