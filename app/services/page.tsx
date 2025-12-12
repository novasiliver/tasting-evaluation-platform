export const metadata = {
  title: 'Services | Tastecert',
  description: 'Comprehensive evaluation services for specialty products. From product testing to prestigious awards and certification.',
  keywords: ['product testing', 'sensory evaluation', 'quality scoring', 'product certification services', 'food testing'],
  openGraph: {
    title: 'Our Services - Tastecert',
    description: 'Comprehensive evaluation services for exceptional products.',
    type: 'website',
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-100/50 rounded-[100%] blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm text-xs font-semibold text-stone-600 mb-8">
            <iconify-icon icon="lucide:layers" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            Our Services
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-tight mb-6 font-heading">
            Comprehensive evaluation services
          </h1>
          
          <p className="text-lg md:text-xl text-stone-500 leading-relaxed max-w-2xl mx-auto">
            From initial product testing to prestigious awards, we offer end-to-end services that help food and beverage brands understand, improve, and showcase their quality.
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#product-testing" className="px-4 py-2 bg-white rounded-full border border-stone-200 text-sm font-medium text-stone-700 hover:border-orange-300 hover:text-orange-600 transition-all">
              Product Testing
            </a>
            <a href="#sensory-evaluation" className="px-4 py-2 bg-white rounded-full border border-stone-200 text-sm font-medium text-stone-700 hover:border-orange-300 hover:text-orange-600 transition-all">
              Sensory Evaluation
            </a>
            <a href="#quality-scoring" className="px-4 py-2 bg-white rounded-full border border-stone-200 text-sm font-medium text-stone-700 hover:border-orange-300 hover:text-orange-600 transition-all">
              Quality Scoring
            </a>
            <a href="#certification" className="px-4 py-2 bg-white rounded-full border border-stone-200 text-sm font-medium text-stone-700 hover:border-orange-300 hover:text-orange-600 transition-all">
              Certification
            </a>
            <a href="#awards" className="px-4 py-2 bg-white rounded-full border border-stone-200 text-sm font-medium text-stone-700 hover:border-orange-300 hover:text-orange-600 transition-all">
              Awards
            </a>
          </div>
        </div>
      </section>

      {/* Service 1: Product Testing */}
      <section id="product-testing" className="py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left Content */}
              <div className="p-8 md:p-12 lg:p-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                    <iconify-icon icon="lucide:flask-conical" width="24" className="text-orange-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-orange-600">Service 01</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-4 font-heading">
                  Product Testing
                </h2>
                
                <p className="text-stone-500 leading-relaxed mb-8">
                  Our foundational service that analyzes your food or beverage product through rigorous laboratory testing. We measure chemical composition, nutritional content, and safety parameters to give you a complete picture of what's in your product.
                </p>

                {/* Benefits */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">Key Benefits</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-stone-600 text-sm">Identify ingredient quality and purity levels</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-stone-600 text-sm">Verify nutritional claims for label accuracy</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-stone-600 text-sm">Detect contaminants or unwanted substances</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-stone-600 text-sm">Meet regulatory compliance requirements</span>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="bg-stone-50 rounded-2xl p-6">
                  <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">How It Works</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold font-heading shrink-0">1</div>
                      <span className="text-stone-600 text-sm">Submit product samples via our secure portal</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold font-heading shrink-0">2</div>
                      <span className="text-stone-600 text-sm">Lab conducts composition & safety analysis</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold font-heading shrink-0">3</div>
                      <span className="text-stone-600 text-sm">Receive detailed lab report within 5–7 days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 md:p-12 lg:p-16 flex items-center justify-center">
                <div className="relative w-full max-w-sm">
                  <div className="aspect-square rounded-3xl bg-white shadow-2xl shadow-orange-500/10 p-8 flex flex-col justify-center">
                    <div className="text-center mb-6">
                      <iconify-icon icon="lucide:test-tubes" width="64" className="text-orange-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-stone-100">
                        <span className="text-xs text-stone-500">Sugar Content</span>
                        <span className="text-sm font-semibold text-stone-900 font-heading">12.4g/100ml</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-stone-100">
                        <span className="text-xs text-stone-500">Acidity (pH)</span>
                        <span className="text-sm font-semibold text-stone-900 font-heading">3.8</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-stone-100">
                        <span className="text-xs text-stone-500">Protein</span>
                        <span className="text-sm font-semibold text-stone-900 font-heading">2.1g/100ml</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-xs text-stone-500">Contaminants</span>
                        <span className="text-sm font-semibold text-green-600 font-heading">None Detected</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 2: Sensory Evaluation */}
      <section id="sensory-evaluation" className="py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left Visual */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 md:p-12 lg:p-16 flex items-center justify-center order-2 lg:order-1">
                <div className="relative w-full max-w-sm">
                  <div className="aspect-square rounded-3xl bg-white shadow-2xl shadow-blue-500/10 p-8 flex flex-col justify-center">
                    <div className="text-center mb-6">
                      <iconify-icon icon="lucide:radar" width="64" className="text-blue-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <iconify-icon icon="lucide:eye" width="20" className="text-blue-600 mb-1" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        <div className="text-xs text-stone-500">Appearance</div>
                        <div className="text-lg font-bold text-stone-900 font-heading">8.5</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <iconify-icon icon="lucide:wind" width="20" className="text-blue-600 mb-1" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        <div className="text-xs text-stone-500">Aroma</div>
                        <div className="text-lg font-bold text-stone-900 font-heading">9.2</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <iconify-icon icon="lucide:utensils" width="20" className="text-blue-600 mb-1" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        <div className="text-xs text-stone-500">Taste</div>
                        <div className="text-lg font-bold text-stone-900 font-heading">8.8</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <iconify-icon icon="lucide:hand" width="20" className="text-blue-600 mb-1" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        <div className="text-xs text-stone-500">Texture</div>
                        <div className="text-lg font-bold text-stone-900 font-heading">8.1</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="p-8 md:p-12 lg:p-16 order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <iconify-icon icon="lucide:scan-eye" width="24" className="text-blue-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Service 02</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-4 font-heading">
                  Sensory Evaluation
                </h2>
                
                <p className="text-stone-500 leading-relaxed mb-8">
                  Our expert panel of trained tasters evaluates your product across all sensory dimensions—appearance, aroma, taste, texture, and aftertaste. This human-centered evaluation captures what no machine can measure.
                </p>

                {/* Benefits */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">Key Benefits</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-stone-600 text-sm">Understand how consumers perceive your product</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-stone-600 text-sm">Identify specific strengths and weaknesses</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-stone-600 text-sm">Compare against category benchmarks</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-stone-600 text-sm">Get actionable improvement recommendations</span>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="bg-stone-50 rounded-2xl p-6">
                  <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">How It Works</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold font-heading shrink-0">1</div>
                      <span className="text-stone-600 text-sm">Product anonymized and prepared for tasting</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold font-heading shrink-0">2</div>
                      <span className="text-stone-600 text-sm">Panel of 8+ trained evaluators scores independently</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold font-heading shrink-0">3</div>
                      <span className="text-stone-600 text-sm">Receive attribute-level scores and written feedback</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 3: Quality Scoring */}
      <section id="quality-scoring" className="py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left Content */}
              <div className="p-8 md:p-12 lg:p-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
                    <iconify-icon icon="lucide:bar-chart-3" width="24" className="text-purple-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-purple-600">Service 03</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-4 font-heading">
                  Quality Scoring
                </h2>
                
                <p className="text-stone-500 leading-relaxed mb-8">
                  We combine lab analysis and sensory evaluation data into a single, comprehensive quality score. Our proprietary algorithm weighs factors based on product category standards, giving you a clear benchmark of where your product stands.
                </p>

                {/* Benefits */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">Key Benefits</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-stone-600 text-sm">Single score that's easy to understand and communicate</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-stone-600 text-sm">Track quality improvements over time</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-stone-600 text-sm">See how you compare to category averages</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-stone-600 text-sm">Use scores for retail buyer presentations</span>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="bg-stone-50 rounded-2xl p-6">
                  <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">How It Works</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold font-heading shrink-0">1</div>
                      <span className="text-stone-600 text-sm">Complete Product Testing + Sensory Evaluation</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold font-heading shrink-0">2</div>
                      <span className="text-stone-600 text-sm">Data processed through category-specific algorithm</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold font-heading shrink-0">3</div>
                      <span className="text-stone-600 text-sm">Receive 0–100 score with detailed breakdown</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 md:p-12 lg:p-16 flex items-center justify-center">
                <div className="relative w-full max-w-sm">
                  <div className="aspect-square rounded-3xl bg-white shadow-2xl shadow-purple-500/10 p-8 flex flex-col justify-center items-center">
                    <div className="relative mb-6">
                      <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#E9D5FF" strokeWidth="8"></circle>
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#9333EA" strokeWidth="8" strokeLinecap="round" strokeDasharray="247" strokeDashoffset="37"></circle>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-4xl font-bold text-stone-900 font-heading">85</span>
                          <span className="text-sm text-stone-500 block">/ 100</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 rounded-full text-xs font-semibold text-purple-700">
                        <iconify-icon icon="lucide:trending-up" width="12" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                        Above Category Average
                      </span>
                    </div>
                    <div className="w-full mt-6 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-stone-500">Lab Score</span>
                        <span className="font-semibold text-stone-900">88/100</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-stone-500">Sensory Score</span>
                        <span className="font-semibold text-stone-900">82/100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 4: Certification & Results */}
      <section id="certification" className="py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left Visual */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 md:p-12 lg:p-16 flex items-center justify-center order-2 lg:order-1">
                <div className="relative w-full max-w-sm">
                  <div className="aspect-square rounded-3xl bg-white shadow-2xl shadow-green-500/10 p-8 flex flex-col justify-center items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6 shadow-lg shadow-green-500/30">
                      <iconify-icon icon="lucide:badge-check" width="48" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 font-heading mb-2">Tastecert Certified</h3>
                    <p className="text-sm text-stone-500 text-center mb-4">Quality Verified Product</p>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                      <iconify-icon icon="lucide:shield-check" width="16" className="text-green-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      <span className="text-xs font-semibold text-green-700">Score: 85+</span>
                    </div>
                    <div className="mt-6 text-xs text-stone-400 text-center">
                      Valid through December 2025
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="p-8 md:p-12 lg:p-16 order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                    <iconify-icon icon="lucide:badge-check" width="24" className="text-green-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-green-600">Service 04</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-4 font-heading">
                  Certification & Results
                </h2>
                
                <p className="text-stone-500 leading-relaxed mb-8">
                  Products that meet our quality thresholds earn the Tastecert Certified seal—a trusted mark that signals excellence to retailers, distributors, and consumers. All evaluated products receive a detailed results report.
                </p>

                {/* Benefits */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">Key Benefits</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-stone-600 text-sm">Build credibility with retailers and buyers</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-stone-600 text-sm">Use certification seal on packaging and marketing</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-stone-600 text-sm">Get listed in our verified product directory</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-stone-600 text-sm">Receive shareable digital results certificate</span>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="bg-stone-50 rounded-2xl p-6">
                  <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">How It Works</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold font-heading shrink-0">1</div>
                      <span className="text-stone-600 text-sm">Complete full evaluation (Testing + Sensory + Scoring)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold font-heading shrink-0">2</div>
                      <span className="text-stone-600 text-sm">Products scoring 75+ receive certification</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold font-heading shrink-0">3</div>
                      <span className="text-stone-600 text-sm">Download seal assets and results documentation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 5: Awards */}
      <section id="awards" className="py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-amber-900 to-amber-950 rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left Content */}
              <div className="p-8 md:p-12 lg:p-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                    <iconify-icon icon="lucide:trophy" width="24" className="text-amber-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Service 05</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4 font-heading">
                  Awards for Top Products
                </h2>
                
                <p className="text-amber-100/70 leading-relaxed mb-8">
                  The highest-scoring products in each category earn prestigious Tastecert Awards. Announced quarterly, these awards recognize exceptional quality and give winning brands powerful marketing differentiation.
                </p>

                {/* Benefits */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-amber-300 uppercase tracking-wider mb-4">Key Benefits</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-amber-400" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-amber-100/80 text-sm">Stand out from competitors with award recognition</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-amber-400" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-amber-100/80 text-sm">Featured in press releases and industry publications</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-amber-400" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-amber-100/80 text-sm">Receive physical trophy and digital badge assets</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <iconify-icon icon="lucide:check" width="12" className="text-amber-400" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-amber-100/80 text-sm">Invitation to annual awards ceremony</span>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <h4 className="text-sm font-semibold text-amber-300 uppercase tracking-wider mb-4">How It Works</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-amber-950 flex items-center justify-center text-sm font-bold font-heading shrink-0">1</div>
                      <span className="text-amber-100/80 text-sm">All certified products automatically entered</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-amber-950 flex items-center justify-center text-sm font-bold font-heading shrink-0">2</div>
                      <span className="text-amber-100/80 text-sm">Top scorers per category reviewed by judges</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-amber-950 flex items-center justify-center text-sm font-bold font-heading shrink-0">3</div>
                      <span className="text-amber-100/80 text-sm">Winners announced quarterly with media coverage</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <div className="p-8 md:p-12 lg:p-16 flex items-center justify-center">
                <div className="relative w-full max-w-sm">
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-amber-400 to-amber-500 shadow-2xl shadow-amber-500/30 p-8 flex flex-col justify-center items-center">
                    <div className="absolute inset-0 rounded-3xl opacity-30"></div>
                    <iconify-icon icon="lucide:trophy" width="80" className="text-amber-950/80 mb-4" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    <h3 className="text-2xl font-bold text-amber-950 font-heading mb-1">Gold Award</h3>
                    <p className="text-amber-800 text-sm mb-6">Excellence in Quality</p>
                    
                    <div className="flex gap-4 mt-4">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-amber-300 flex items-center justify-center mb-2">
                          <iconify-icon icon="lucide:award" width="24" className="text-amber-800" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        </div>
                        <span className="text-xs text-amber-900 font-medium">Gold</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center mb-2">
                          <iconify-icon icon="lucide:award" width="24" className="text-stone-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        </div>
                        <span className="text-xs text-amber-900 font-medium">Silver</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-amber-700 flex items-center justify-center mb-2">
                          <iconify-icon icon="lucide:award" width="24" className="text-amber-200" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        </div>
                        <span className="text-xs text-amber-900 font-medium">Bronze</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-20 bg-white border-y border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-4 block">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-4 font-heading">
              Simple, transparent pricing
            </h2>
            <p className="text-stone-500">
              Choose individual services or bundle them for comprehensive evaluation. Volume discounts available for brands with multiple products.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Basic */}
            <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200">
              <h3 className="text-lg font-semibold text-stone-900 font-heading mb-2">Essential</h3>
              <p className="text-sm text-stone-500 mb-6">Product Testing only</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-stone-900 font-heading">$299</span>
                <span className="text-stone-500 text-sm">/product</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-stone-600">
                  <iconify-icon icon="lucide:check" width="16" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                  Lab composition analysis
                </li>
                <li className="flex items-center gap-2 text-sm text-stone-600">
                  <iconify-icon icon="lucide:check" width="16" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                  Safety screening
                </li>
                <li className="flex items-center gap-2 text-sm text-stone-600">
                  <iconify-icon icon="lucide:check" width="16" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                  Detailed lab report
                </li>
              </ul>
              <a href="/submit" className="block w-full py-3 text-center text-sm font-semibold text-stone-700 border border-stone-300 rounded-full hover:bg-stone-100 transition-colors">
                Get Started
              </a>
            </div>

            {/* Professional */}
            <div className="bg-stone-900 rounded-2xl p-8 border border-stone-800 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-600 text-white text-xs font-semibold rounded-full">
                Most Popular
              </div>
              <h3 className="text-lg font-semibold text-white font-heading mb-2">Professional</h3>
              <p className="text-sm text-stone-400 mb-6">Full evaluation + certification</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white font-heading">$699</span>
                <span className="text-stone-400 text-sm">/product</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-stone-300">
                  <iconify-icon icon="lucide:check" width="16" className="text-orange-400" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                  Everything in Essential
                </li>
                <li className="flex items-center gap-2 text-sm text-stone-300">
                  <iconify-icon icon="lucide:check" width="16" className="text-orange-400" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                  Full sensory panel evaluation
                </li>
                <li className="flex items-center gap-2 text-sm text-stone-300">
                  <iconify-icon icon="lucide:check" width="16" className="text-orange-400" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                  Quality score (0–100)
                </li>
                <li className="flex items-center gap-2 text-sm text-stone-300">
                  <iconify-icon icon="lucide:check" width="16" className="text-orange-400" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                  Certification seal (if qualified)
                </li>
                <li className="flex items-center gap-2 text-sm text-stone-300">
                  <iconify-icon icon="lucide:check" width="16" className="text-orange-400" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                  Award eligibility
                </li>
              </ul>
              <a href="/submit" className="block w-full py-3 text-center text-sm font-semibold text-white bg-orange-600 rounded-full hover:bg-orange-500 transition-colors">
                Get Started
              </a>
            </div>

            {/* Enterprise */}
            <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200">
              <h3 className="text-lg font-semibold text-stone-900 font-heading mb-2">Enterprise</h3>
              <p className="text-sm text-stone-500 mb-6">For brands with 10+ products</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-stone-900 font-heading">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-stone-600">
                  <iconify-icon icon="lucide:check" width="16" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                  Everything in Professional
                </li>
                <li className="flex items-center gap-2 text-sm text-stone-600">
                  <iconify-icon icon="lucide:check" width="16" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                  Volume discounts
                </li>
                <li className="flex items-center gap-2 text-sm text-stone-600">
                  <iconify-icon icon="lucide:check" width="16" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                  Dedicated account manager
                </li>
                <li className="flex items-center gap-2 text-sm text-stone-600">
                  <iconify-icon icon="lucide:check" width="16" className="text-green-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                  Priority scheduling
                </li>
              </ul>
              <a href="/contact" className="block w-full py-3 text-center text-sm font-semibold text-stone-700 border border-stone-300 rounded-full hover:bg-stone-100 transition-colors">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-4 font-heading">
            Ready to evaluate your product?
          </h2>
          <p className="text-stone-500 mb-8 max-w-xl mx-auto">
            Submit your food or beverage product for independent evaluation. Get clear, actionable results and—if you qualify—a certification seal trusted by retailers worldwide.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/submit" className="w-full sm:w-auto px-8 py-4 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-500 transition-colors">
              Submit Your Product
            </a>
            <a href="/contact" className="w-full sm:w-auto px-8 py-4 bg-white text-stone-700 border border-stone-200 rounded-full font-semibold hover:bg-stone-50 transition-colors flex items-center justify-center gap-2">
              <iconify-icon icon="lucide:calendar" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              Schedule a Call
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
