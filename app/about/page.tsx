import Image from 'next/image';

export const metadata = {
  title: 'About Us | Tastecert',
  description: 'Premium quality certification for specialty food products. Expert-led evaluation process you can trust.',
  keywords: ['about tastecert', 'quality certification', 'product evaluation experts', 'independent certification'],
  openGraph: {
    title: 'About Tastecert - Premium Quality Certification',
    description: 'Independent certification for exceptional specialty products.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-100/50 rounded-[100%] blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm text-xs font-semibold text-stone-600 mb-8">
            <iconify-icon icon="lucide:info" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            About Tastecert
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-tight mb-6 font-heading">
            The authority on specialty product excellence
          </h1>
          
          <p className="text-lg md:text-xl text-stone-500 leading-relaxed max-w-2xl mx-auto">
            We provide prestigious certification for exceptional olive oils, wines, and gourmet foods—delivering independent evaluation that producers trust and consumers recognize.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-4 block">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-6 font-heading">
                Elevating craftsmanship through certification
              </h2>
              <p className="text-stone-500 leading-relaxed mb-6">
                Tastecert exists to create a trusted, transparent standard for certifying exceptional specialty products. We believe every producer deserves fair assessment, and every consumer deserves honest information about the quality of what they buy.
              </p>
              <p className="text-stone-500 leading-relaxed mb-8">
                Our organization operates independently from manufacturers, retailers, and advertisers. We have no financial stake in the products we evaluate—our only commitment is to accuracy and integrity.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-stone-200 text-sm font-medium text-stone-700">
                  <iconify-icon icon="lucide:shield-check" width="16" className="text-green-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  100% Independent
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-stone-200 text-sm font-medium text-stone-700">
                  <iconify-icon icon="lucide:eye-off" width="16" className="text-blue-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  Blind Testing
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-stone-200 text-sm font-medium text-stone-700">
                  <iconify-icon icon="lucide:award" width="16" className="text-orange-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  ISO Certified
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-stone-900/10 relative">
                <Image src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2670&auto=format&fit=crop" alt="Premium wine evaluation and certification" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-lg border border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <iconify-icon icon="lucide:users" width="24" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-stone-900 font-heading">50+</div>
                    <div className="text-xs text-stone-500">Certified Panelists</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Evaluate */}
      <section className="py-20 bg-white border-y border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-4 block">What We Evaluate</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-4 font-heading">
              Food & beverage products of all kinds
            </h2>
            <p className="text-stone-500">
              From artisan producers to global brands, we evaluate a wide range of consumable products with the same rigorous standards.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="group p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-default">
              <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center mb-4 group-hover:border-orange-200 transition-colors">
                <iconify-icon icon="lucide:coffee" width="24" className="text-stone-600 group-hover:text-orange-600 transition-colors" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-semibold text-stone-900 mb-2 font-heading">Beverages</h3>
              <p className="text-sm text-stone-500">Coffee, tea, juices, soft drinks, water, energy drinks</p>
            </div>

            <div className="group p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-default">
              <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center mb-4 group-hover:border-orange-200 transition-colors">
                <iconify-icon icon="lucide:wine" width="24" className="text-stone-600 group-hover:text-orange-600 transition-colors" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-semibold text-stone-900 mb-2 font-heading">Alcohol</h3>
              <p className="text-sm text-stone-500">Wine, beer, spirits, cider, ready-to-drink cocktails</p>
            </div>

            <div className="group p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-default">
              <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center mb-4 group-hover:border-orange-200 transition-colors">
                <iconify-icon icon="lucide:milk" width="24" className="text-stone-600 group-hover:text-orange-600 transition-colors" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-semibold text-stone-900 mb-2 font-heading">Dairy & Alternatives</h3>
              <p className="text-sm text-stone-500">Milk, cheese, yogurt, plant-based alternatives</p>
            </div>

            <div className="group p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-default">
              <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center mb-4 group-hover:border-orange-200 transition-colors">
                <iconify-icon icon="lucide:cookie" width="24" className="text-stone-600 group-hover:text-orange-600 transition-colors" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-semibold text-stone-900 mb-2 font-heading">Snacks & Sweets</h3>
              <p className="text-sm text-stone-500">Chocolate, confectionery, chips, crackers, nuts</p>
            </div>

            <div className="group p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-default">
              <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center mb-4 group-hover:border-orange-200 transition-colors">
                <iconify-icon icon="lucide:salad" width="24" className="text-stone-600 group-hover:text-orange-600 transition-colors" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-semibold text-stone-900 mb-2 font-heading">Prepared Foods</h3>
              <p className="text-sm text-stone-500">Sauces, soups, ready meals, dressings, spreads</p>
            </div>

            <div className="group p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-default">
              <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center mb-4 group-hover:border-orange-200 transition-colors">
                <iconify-icon icon="lucide:wheat" width="24" className="text-stone-600 group-hover:text-orange-600 transition-colors" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-semibold text-stone-900 mb-2 font-heading">Bakery & Grains</h3>
              <p className="text-sm text-stone-500">Bread, pastries, cereals, pasta, flour products</p>
            </div>

            <div className="group p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-default">
              <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center mb-4 group-hover:border-orange-200 transition-colors">
                <iconify-icon icon="lucide:beef" width="24" className="text-stone-600 group-hover:text-orange-600 transition-colors" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-semibold text-stone-900 mb-2 font-heading">Proteins</h3>
              <p className="text-sm text-stone-500">Meat, seafood, plant-based proteins, deli products</p>
            </div>

            <div className="group p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-default">
              <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center mb-4 group-hover:border-orange-200 transition-colors">
                <iconify-icon icon="lucide:droplets" width="24" className="text-stone-600 group-hover:text-orange-600 transition-colors" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-semibold text-stone-900 mb-2 font-heading">Oils & Condiments</h3>
              <p className="text-sm text-stone-500">Olive oil, vinegar, honey, spices, seasonings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process - continuing in next message due to length */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-4 block">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-4 font-heading">
              How we evaluate products
            </h2>
            <p className="text-stone-500">
              Every product goes through a structured, multi-stage evaluation designed to deliver accurate, reproducible results.
            </p>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl border border-stone-200 p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center text-lg font-bold font-heading shrink-0">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-stone-900 mb-3 font-heading">Sample Receipt & Anonymization</h3>
                  <p className="text-stone-500 leading-relaxed mb-4">
                    Products arrive at our facility and are immediately logged into our tracking system. All identifying information—brand names, packaging, origin details—is removed. Each sample receives a randomized code, ensuring our panelists never know what they're evaluating.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600">Chain of custody documented</span>
                    <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600">Temperature-controlled storage</span>
                    <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600">Double-blind coding</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl border border-stone-200 p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center text-lg font-bold font-heading shrink-0">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-stone-900 mb-3 font-heading">Expert Sensory Panel Evaluation</h3>
                  <p className="text-stone-500 leading-relaxed mb-4">
                    Our trained sensory panelists—certified under ISO 8586 standards—evaluate each product across multiple attributes: appearance, aroma, taste, texture, and aftertaste. Panelists work independently in controlled booths with standardized lighting and temperature to eliminate environmental bias.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600">ISO 8586 certified panelists</span>
                    <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600">Controlled evaluation environment</span>
                    <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600">Standardized scoring scales</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl border border-stone-200 p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center text-lg font-bold font-heading shrink-0">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-stone-900 mb-3 font-heading">Laboratory Analysis</h3>
                  <p className="text-stone-500 leading-relaxed mb-4">
                    Alongside human evaluation, our laboratory conducts instrumental analysis using spectroscopy, chromatography, and other validated methods. This quantifies key compounds—sugars, acids, volatile aromatics—providing objective data that complements sensory findings.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600">Chemical composition analysis</span>
                    <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600">Validated lab methods</span>
                    <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600">Quantitative measurements</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl border border-stone-200 p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center text-lg font-bold font-heading shrink-0">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-stone-900 mb-3 font-heading">Scoring & Report Generation</h3>
                  <p className="text-stone-500 leading-relaxed mb-4">
                    Panel scores are aggregated using statistical methods that identify and account for outliers. Combined with lab data, we generate a comprehensive quality score (0–100) along with detailed attribute breakdowns. Products meeting quality thresholds receive our certification seal.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600">Statistical validation</span>
                    <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600">Clear scoring criteria</span>
                    <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600">Actionable insights</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-4 block">Why Trust Tastecert</span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 font-heading">
              Fair, independent, and reliable
            </h2>
            <p className="text-stone-400">
              Our evaluation process is designed to eliminate bias and deliver results you can confidently use for business decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-orange-600/20 flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:ban" width="24" className="text-orange-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="text-lg font-semibold mb-3 font-heading">No Pay-to-Play</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Evaluation fees cover testing costs only. Payment never influences scores. A product that doesn't meet standards won't receive certification regardless of the fee paid.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:eye-off" width="24" className="text-blue-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="text-lg font-semibold mb-3 font-heading">True Blind Testing</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Panelists never see brand names, packaging, or price points. They evaluate products purely on sensory merit—what they see, smell, taste, and feel.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:scale" width="24" className="text-green-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="text-lg font-semibold mb-3 font-heading">Standardized Criteria</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Every product category has defined evaluation criteria developed by food scientists. The same standards apply whether you're a startup or a multinational.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:rotate-ccw" width="24" className="text-purple-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="text-lg font-semibold mb-3 font-heading">Reproducible Results</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                We use statistical validation to ensure consistency. If we tested your product again under the same conditions, you'd get the same score within a defined margin.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:building" width="24" className="text-amber-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="text-lg font-semibold mb-3 font-heading">No Industry Ownership</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Tastecert is not owned or funded by producers, retailers, or trade associations. We answer only to our mission of providing honest evaluation.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-rose-600/20 flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:file-check" width="24" className="text-rose-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="text-lg font-semibold mb-3 font-heading">Transparent Methodology</h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Our evaluation criteria, scoring methods, and certification thresholds are publicly documented. We believe accountability requires transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-stone-900 font-heading mb-2">12K+</div>
              <div className="text-sm text-stone-500 font-medium">Products Evaluated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-stone-900 font-heading mb-2">50+</div>
              <div className="text-sm text-stone-500 font-medium">Certified Panelists</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-stone-900 font-heading mb-2">28</div>
              <div className="text-sm text-stone-500 font-medium">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-stone-900 font-heading mb-2">8</div>
              <div className="text-sm text-stone-500 font-medium">Years of Operation</div>
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
              <iconify-icon icon="lucide:mail" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
