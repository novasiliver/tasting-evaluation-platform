export const metadata = {
  title: 'Awards | Tastecert',
  description: 'Prestigious awards for exceptional specialty products. Gold, Silver, and Bronze recognition based on expert evaluation.',
  keywords: ['food awards', 'product awards', 'quality awards', 'gold silver bronze awards', 'specialty food recognition'],
  openGraph: {
    title: 'Tastecert Awards - Recognizing Excellence',
    description: 'Prestigious Gold, Silver, and Bronze awards for exceptional products.',
    type: 'website',
  },
};

export default function AwardsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-100/50 rounded-[100%] blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm text-xs font-semibold text-stone-600 mb-8">
            <iconify-icon icon="lucide:trophy" width="14" className="text-amber-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            Awards Program
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-tight mb-6 font-heading">
            Recognizing exceptional quality
          </h1>
          
          <p className="text-lg md:text-xl text-stone-500 leading-relaxed max-w-2xl mx-auto mb-10">
            The Tastecert Awards honor specialty products that achieve outstanding scores in our independent evaluation process. Gold, Silver, and Bronze recognition signals quality to consumers and retailers alike.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/submit" className="w-full sm:w-auto px-8 py-4 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-500 transition-colors shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2">
              <iconify-icon icon="lucide:send" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              Submit Your Product
            </a>
            <a href="#criteria" className="w-full sm:w-auto px-8 py-4 bg-white text-stone-700 border border-stone-200 rounded-full font-semibold hover:bg-stone-50 transition-colors">
              View Judging Criteria
            </a>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 md:p-12 lg:p-16">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4 block">Purpose</span>
                <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-6 font-heading">
                  Why the Tastecert Awards exist
                </h2>
                <div className="space-y-4 text-stone-600 leading-relaxed">
                  <p>
                    In a crowded marketplace, consumers and retailers need reliable signals to identify quality products. The Tastecert Awards provide that signal through objective, independent evaluation.
                  </p>
                  <p>
                    Our awards recognize brands that invest in quality—not marketing budgets. Every winning product has earned its distinction through measurable excellence in composition, safety, and sensory appeal.
                  </p>
                  <p>
                    For brands, an award provides credible third-party validation. For retailers, it simplifies sourcing decisions. For consumers, it offers confidence in their purchase.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 md:p-12 lg:p-16 flex items-center justify-center">
                <div className="space-y-6 w-full max-w-sm">
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <iconify-icon icon="lucide:users" width="20" className="text-amber-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-sm font-semibold text-stone-900 font-heading">For Consumers</span>
                    </div>
                    <p className="text-sm text-stone-500">Trust that award-winning products meet verified quality standards.</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <iconify-icon icon="lucide:store" width="20" className="text-amber-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-sm font-semibold text-stone-900 font-heading">For Retailers</span>
                    </div>
                    <p className="text-sm text-stone-500">Confidently stock products with proven quality credentials.</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <iconify-icon icon="lucide:building-2" width="20" className="text-amber-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-sm font-semibold text-stone-900 font-heading">For Brands</span>
                    </div>
                    <p className="text-sm text-stone-500">Differentiate with credible, third-party recognition.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Award Levels */}
      <section className="py-20 bg-white border-y border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4 block">Award Levels</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-4 font-heading">
              Three tiers of recognition
            </h2>
            <p className="text-stone-500">
              Awards are determined by final quality score. Each tier represents a meaningful threshold of excellence that consumers and retailers can trust.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Gold */}
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-3xl p-8 border border-amber-200 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-6">
                  <iconify-icon icon="lucide:trophy" width="32" className="text-amber-900" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>
                <h3 className="text-2xl font-semibold text-stone-900 font-heading mb-2">Gold Award</h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200 rounded-full text-xs font-semibold text-amber-800 mb-4">
                  95–100 points
                </div>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  Reserved for exceptional products that demonstrate outstanding excellence across all evaluation criteria. Gold winners represent the top tier of quality in their category.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-stone-700">
                    <iconify-icon icon="lucide:check" width="16" className="text-amber-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                    Exceptional sensory profile
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stone-700">
                    <iconify-icon icon="lucide:check" width="16" className="text-amber-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                    Superior ingredient quality
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stone-700">
                    <iconify-icon icon="lucide:check" width="16" className="text-amber-600" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                    Perfect safety compliance
                  </div>
                </div>
              </div>
            </div>

            {/* Silver */}
            <div className="relative">
              <div className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-3xl p-8 border border-stone-200 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-stone-300 to-stone-400 flex items-center justify-center shadow-lg shadow-stone-400/30 mb-6">
                  <iconify-icon icon="lucide:trophy" width="32" className="text-stone-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>
                <h3 className="text-2xl font-semibold text-stone-900 font-heading mb-2">Silver Award</h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-200 rounded-full text-xs font-semibold text-stone-700 mb-4">
                  90–94 points
                </div>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  Recognizes products with excellent quality that exceed industry standards. Silver winners demonstrate strong performance across all evaluation dimensions.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-stone-700">
                    <iconify-icon icon="lucide:check" width="16" className="text-stone-500" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                    Excellent sensory appeal
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stone-700">
                    <iconify-icon icon="lucide:check" width="16" className="text-stone-500" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                    High-quality ingredients
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stone-700">
                    <iconify-icon icon="lucide:check" width="16" className="text-stone-500" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                    Strong safety standards
                  </div>
                </div>
              </div>
            </div>

            {/* Bronze */}
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-900/5 to-amber-800/10 rounded-3xl p-8 border border-amber-900/20 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-700 to-amber-800 flex items-center justify-center shadow-lg shadow-amber-800/30 mb-6">
                  <iconify-icon icon="lucide:trophy" width="32" className="text-amber-200" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>
                <h3 className="text-2xl font-semibold text-stone-900 font-heading mb-2">Bronze Award</h3>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-900/20 rounded-full text-xs font-semibold text-amber-900 mb-4">
                  85–89 points
                </div>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  Honors products that meet high quality standards and demonstrate notable merit. Bronze winners have achieved meaningful quality distinction.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-stone-700">
                    <iconify-icon icon="lucide:check" width="16" className="text-amber-700" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                    Above-average sensory score
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stone-700">
                    <iconify-icon icon="lucide:check" width="16" className="text-amber-700" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                    Quality ingredients
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stone-700">
                    <iconify-icon icon="lucide:check" width="16" className="text-amber-700" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                    Meets safety requirements
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Judging Criteria */}
      <section id="criteria" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4 block">Judging Criteria</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-4 font-heading">
              How products are evaluated
            </h2>
            <p className="text-stone-500">
              Every product undergoes comprehensive evaluation across three core dimensions. Scores are weighted by category to reflect what matters most for each product type.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Lab Analysis */}
            <div className="bg-white rounded-2xl border border-stone-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <iconify-icon icon="lucide:flask-conical" width="24" className="text-blue-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>
                <span className="text-2xl font-bold text-stone-900 font-heading">30%</span>
              </div>
              <h3 className="text-xl font-semibold text-stone-900 font-heading mb-3">Lab Analysis</h3>
              <p className="text-sm text-stone-500 mb-6">Objective measurement of composition, purity, and safety.</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <span className="text-sm text-stone-600">Ingredient purity</span>
                  <span className="text-xs text-stone-400">10%</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <span className="text-sm text-stone-600">Nutritional accuracy</span>
                  <span className="text-xs text-stone-400">8%</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <span className="text-sm text-stone-600">Safety screening</span>
                  <span className="text-xs text-stone-400">7%</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-stone-600">Contaminant testing</span>
                  <span className="text-xs text-stone-400">5%</span>
                </div>
              </div>
            </div>

            {/* Sensory Evaluation */}
            <div className="bg-white rounded-2xl border border-stone-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <iconify-icon icon="lucide:scan-eye" width="24" className="text-purple-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>
                <span className="text-2xl font-bold text-stone-900 font-heading">50%</span>
              </div>
              <h3 className="text-xl font-semibold text-stone-900 font-heading mb-3">Sensory Evaluation</h3>
              <p className="text-sm text-stone-500 mb-6">Expert panel assessment of taste, aroma, texture, and appearance.</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <span className="text-sm text-stone-600">Taste profile</span>
                  <span className="text-xs text-stone-400">20%</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <span className="text-sm text-stone-600">Aroma quality</span>
                  <span className="text-xs text-stone-400">12%</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <span className="text-sm text-stone-600">Texture & mouthfeel</span>
                  <span className="text-xs text-stone-400">10%</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-stone-600">Visual appearance</span>
                  <span className="text-xs text-stone-400">8%</span>
                </div>
              </div>
            </div>

            {/* Overall Quality */}
            <div className="bg-white rounded-2xl border border-stone-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <iconify-icon icon="lucide:sparkles" width="24" className="text-green-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>
                <span className="text-2xl font-bold text-stone-900 font-heading">20%</span>
              </div>
              <h3 className="text-xl font-semibold text-stone-900 font-heading mb-3">Overall Impression</h3>
              <p className="text-sm text-stone-500 mb-6">Holistic assessment of quality, value proposition, and category fit.</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <span className="text-sm text-stone-600">Category excellence</span>
                  <span className="text-xs text-stone-400">8%</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <span className="text-sm text-stone-600">Consistency</span>
                  <span className="text-xs text-stone-400">6%</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <span className="text-sm text-stone-600">Innovation</span>
                  <span className="text-xs text-stone-400">4%</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-stone-600">Value proposition</span>
                  <span className="text-xs text-stone-400">2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Judging Process */}
      <section className="py-20 bg-white border-y border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4 block">Process</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-4 font-heading">
              How judging works
            </h2>
            <p className="text-stone-500">
              Our evaluation process is designed for objectivity, consistency, and fairness. Every product goes through the same rigorous steps.
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-stone-200"></div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-stone-50 rounded-2xl p-6 h-full">
                  <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center text-lg font-bold font-heading mb-4 relative z-10">1</div>
                  <h3 className="text-lg font-semibold text-stone-900 font-heading mb-2">Blind Submission</h3>
                  <p className="text-sm text-stone-500">
                    Products are anonymized upon receipt. Judges never know the brand, price, or origin during evaluation.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="bg-stone-50 rounded-2xl p-6 h-full">
                  <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center text-lg font-bold font-heading mb-4 relative z-10">2</div>
                  <h3 className="text-lg font-semibold text-stone-900 font-heading mb-2">Lab Testing</h3>
                  <p className="text-sm text-stone-500">
                    Certified laboratories analyze composition, verify claims, and screen for contaminants using standardized protocols.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="bg-stone-50 rounded-2xl p-6 h-full">
                  <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center text-lg font-bold font-heading mb-4 relative z-10">3</div>
                  <h3 className="text-lg font-semibold text-stone-900 font-heading mb-2">Panel Tasting</h3>
                  <p className="text-sm text-stone-500">
                    A panel of 8+ trained evaluators independently score sensory attributes. Outlier scores are reviewed and normalized.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="bg-stone-50 rounded-2xl p-6 h-full">
                  <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center text-lg font-bold font-heading mb-4 relative z-10">4</div>
                  <h3 className="text-lg font-semibold text-stone-900 font-heading mb-2">Score Calculation</h3>
                  <p className="text-sm text-stone-500">
                    Lab and sensory scores are combined using category-specific weighting. Final scores determine award eligibility.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Integrity callout */}
          <div className="mt-16 bg-stone-900 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center shrink-0">
                <iconify-icon icon="lucide:shield-check" width="28" className="text-amber-950" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white font-heading mb-2">Our commitment to integrity</h3>
                <p className="text-stone-400 leading-relaxed">
                  Tastecert Awards cannot be purchased or influenced. Every award is earned through evaluation performance alone. Our judges have no financial relationship with evaluated brands. We maintain strict conflict-of-interest policies and publish our methodology transparently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Using Award Badges */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4 block">Badge Usage</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-6 font-heading">
                How to use your award badge
              </h2>
              <p className="text-stone-500 mb-8 leading-relaxed">
                Award winners receive official badge assets and usage rights. Display your achievement across packaging, marketing, and sales materials to build consumer trust and retailer confidence.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-stone-200">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:package" width="20" className="text-green-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 font-heading text-sm mb-1">Product Packaging</h4>
                    <p className="text-sm text-stone-500">Display on labels, boxes, and bottles to catch consumer attention at point of purchase.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-stone-200">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:globe" width="20" className="text-blue-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 font-heading text-sm mb-1">Website & Digital</h4>
                    <p className="text-sm text-stone-500">Use on product pages, homepage, and digital ads to build online credibility.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-stone-200">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:megaphone" width="20" className="text-purple-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 font-heading text-sm mb-1">Marketing & PR</h4>
                    <p className="text-sm text-stone-500">Include in press releases, social media, and advertising campaigns.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-stone-200">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:presentation" width="20" className="text-amber-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 font-heading text-sm mb-1">Sales Materials</h4>
                    <p className="text-sm text-stone-500">Add to retailer presentations, sell sheets, and trade show displays.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 p-8">
              <h3 className="text-lg font-semibold text-stone-900 font-heading mb-6">Badge formats included</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="aspect-square bg-stone-50 rounded-2xl flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-3">
                      <iconify-icon icon="lucide:award" width="28" className="text-amber-900" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </div>
                    <span className="text-xs text-stone-500">Circle Badge</span>
                  </div>
                </div>
                <div className="aspect-square bg-stone-50 rounded-2xl flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="w-20 h-12 mx-auto rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-3">
                      <span className="text-xs font-bold text-amber-900 font-heading">GOLD</span>
                    </div>
                    <span className="text-xs text-stone-500">Horizontal Badge</span>
                  </div>
                </div>
                <div className="aspect-square bg-stone-50 rounded-2xl flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="w-12 h-16 mx-auto rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-3">
                      <iconify-icon icon="lucide:trophy" width="20" className="text-amber-900" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </div>
                    <span className="text-xs text-stone-500">Vertical Badge</span>
                  </div>
                </div>
                <div className="aspect-square bg-stone-900 rounded-2xl flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full border-2 border-amber-400 flex items-center justify-center mb-3">
                      <iconify-icon icon="lucide:award" width="28" className="text-amber-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </div>
                    <span className="text-xs text-stone-400">Dark Mode</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-stone-600">
                  <iconify-icon icon="lucide:file-image" width="16" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  PNG, SVG, and EPS formats
                </div>
                <div className="flex items-center gap-3 text-stone-600">
                  <iconify-icon icon="lucide:palette" width="16" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  Color, white, and black versions
                </div>
                <div className="flex items-center gap-3 text-stone-600">
                  <iconify-icon icon="lucide:maximize" width="16" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  High-resolution for print
                </div>
                <div className="flex items-center gap-3 text-stone-600">
                  <iconify-icon icon="lucide:file-text" width="16" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  Usage guidelines PDF
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Winners */}
      <section className="py-20 bg-white border-y border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4 block">Recognition</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight font-heading">
                Recent award winners
              </h2>
            </div>
            <a href="/awards#criteria" className="text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1">
              View judging criteria
              <iconify-icon icon="lucide:arrow-right" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Winner 1 */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-stone-400">Q4 2024</span>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-100 rounded-full">
                  <iconify-icon icon="lucide:award" width="12" className="text-amber-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  <span className="text-xs font-semibold text-amber-700">Gold</span>
                </div>
              </div>
              <h3 className="font-semibold text-stone-900 font-heading mb-1">Highland Springs Sparkling Water</h3>
              <p className="text-sm text-stone-500 mb-3">Beverages — Sparkling Water</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-stone-900 font-heading">97</span>
                <span className="text-xs text-stone-400">points</span>
              </div>
            </div>

            {/* Winner 2 */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-stone-400">Q4 2024</span>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-100 rounded-full">
                  <iconify-icon icon="lucide:award" width="12" className="text-amber-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  <span className="text-xs font-semibold text-amber-700">Gold</span>
                </div>
              </div>
              <h3 className="font-semibold text-stone-900 font-heading mb-1">Nourish Valley Organic Granola</h3>
              <p className="text-sm text-stone-500 mb-3">Food — Breakfast Cereals</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-stone-900 font-heading">96</span>
                <span className="text-xs text-stone-400">points</span>
              </div>
            </div>

            {/* Winner 3 */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-stone-400">Q4 2024</span>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-stone-200 rounded-full">
                  <iconify-icon icon="lucide:award" width="12" className="text-stone-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  <span className="text-xs font-semibold text-stone-700">Silver</span>
                </div>
              </div>
              <h3 className="font-semibold text-stone-900 font-heading mb-1">Pure Press Cold-Pressed Juice</h3>
              <p className="text-sm text-stone-500 mb-3">Beverages — Juices</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-stone-900 font-heading">93</span>
                <span className="text-xs text-stone-400">points</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-amber-900 to-amber-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center mx-auto mb-8">
            <iconify-icon icon="lucide:trophy" width="32" className="text-amber-950" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4 font-heading">
            Submit your product for evaluation
          </h2>
          <p className="text-amber-100/70 mb-8 max-w-xl mx-auto">
            All evaluated products scoring 85 or above are automatically considered for Tastecert Awards. Start your evaluation today and see where your product stands.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/submit" className="w-full sm:w-auto px-8 py-4 bg-amber-500 text-amber-950 rounded-full font-semibold hover:bg-amber-400 transition-colors">
              Submit Your Product
            </a>
            <a href="/services" className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
              <iconify-icon icon="lucide:file-text" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              Download Criteria PDF
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
