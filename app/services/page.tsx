import Link from 'next/link';

export const metadata = {
  title: 'Services | Tastecert',
  description: 'Rigorous evaluation. Verifiable excellence. Independent third-party certification services for artisan producers.',
  keywords: ['certification services', 'product testing', 'sensory evaluation', 'quality certification'],
  openGraph: {
    title: 'Services - Tastecert',
    description: 'Rigorous evaluation. Verifiable excellence.',
    type: 'website',
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <header className="pt-24 pb-20 px-6 border-b border-stone-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-medium uppercase tracking-wider border border-stone-200">
            <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
            Professional Services
          </div>
          <h1 className="font-serif text-5xl lg:text-6xl text-stone-900 leading-[1.1] tracking-tight">
            Rigorous Evaluation.<br/>
            <span className="text-olive italic">Verifiable Excellence.</span>
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed font-light max-w-2xl mx-auto">
            We provide independent, third-party certification services for artisan producers. Our multi-stage process combines ISO-standard sensory analysis with chemical verification.
          </p>
        </div>
      </header>

      {/* Core Services Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            
            {/* Service 1 */}
            <div className="group">
              <div className="w-12 h-12 bg-stone-50 border border-stone-100 rounded-lg flex items-center justify-center text-olive mb-6 group-hover:bg-olive group-hover:text-white transition-all duration-300">
                <iconify-icon icon="lucide:flask-conical" width="24" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">Chemical Analysis</h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-4">
                Comprehensive laboratory testing to verify ingredient purity, detect contaminants, and ensure compliance with international food safety standards (ISO 22000).
              </p>
              <ul className="text-sm text-stone-600 space-y-2">
                <li className="flex items-center gap-2"><iconify-icon icon="lucide:check" className="text-stone-400 text-xs"></iconify-icon> Purity Verification</li>
                <li className="flex items-center gap-2"><iconify-icon icon="lucide:check" className="text-stone-400 text-xs"></iconify-icon> Heavy Metal Screening</li>
                <li className="flex items-center gap-2"><iconify-icon icon="lucide:check" className="text-stone-400 text-xs"></iconify-icon> Additive Detection</li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="group">
              <div className="w-12 h-12 bg-stone-50 border border-stone-100 rounded-lg flex items-center justify-center text-olive mb-6 group-hover:bg-olive group-hover:text-white transition-all duration-300">
                <iconify-icon icon="lucide:users" width="24" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">Sensory Panel Evaluation</h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-4">
                Double-blind taste testing conducted by a panel of 5 certified sommeliers and category experts. Products are scored on aroma, texture, flavor complexity, and finish.
              </p>
              <ul className="text-sm text-stone-600 space-y-2">
                <li className="flex items-center gap-2"><iconify-icon icon="lucide:check" className="text-stone-400 text-xs"></iconify-icon> 5-Expert Panel</li>
                <li className="flex items-center gap-2"><iconify-icon icon="lucide:check" className="text-stone-400 text-xs"></iconify-icon> Blind Methodology</li>
                <li className="flex items-center gap-2"><iconify-icon icon="lucide:check" className="text-stone-400 text-xs"></iconify-icon> Detailed Spider Graphs</li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="group">
              <div className="w-12 h-12 bg-stone-50 border border-stone-100 rounded-lg flex items-center justify-center text-olive mb-6 group-hover:bg-olive group-hover:text-white transition-all duration-300">
                <iconify-icon icon="lucide:map-pin" width="24" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">Origin Verification</h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-4">
                Documentary audit to confirm the geographical indication (GI) and ethical sourcing of raw materials. We trace the supply chain from farm to final packaging.
              </p>
              <ul className="text-sm text-stone-600 space-y-2">
                <li className="flex items-center gap-2"><iconify-icon icon="lucide:check" className="text-stone-400 text-xs"></iconify-icon> Supply Chain Audit</li>
                <li className="flex items-center gap-2"><iconify-icon icon="lucide:check" className="text-stone-400 text-xs"></iconify-icon> GI Validation</li>
                <li className="flex items-center gap-2"><iconify-icon icon="lucide:check" className="text-stone-400 text-xs"></iconify-icon> Fair Labor Checks</li>
              </ul>
            </div>

            {/* Service 4 */}
            <div className="group">
              <div className="w-12 h-12 bg-stone-50 border border-stone-100 rounded-lg flex items-center justify-center text-olive mb-6 group-hover:bg-olive group-hover:text-white transition-all duration-300">
                <iconify-icon icon="lucide:package-check" width="24" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">Packaging & Labeling</h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-4">
                Review of product packaging for regulatory compliance, sustainability claims, and protective quality to ensure the product reaches the consumer as intended.
              </p>
              <ul className="text-sm text-stone-600 space-y-2">
                <li className="flex items-center gap-2"><iconify-icon icon="lucide:check" className="text-stone-400 text-xs"></iconify-icon> Regulatory Review</li>
                <li className="flex items-center gap-2"><iconify-icon icon="lucide:check" className="text-stone-400 text-xs"></iconify-icon> Material Analysis</li>
                <li className="flex items-center gap-2"><iconify-icon icon="lucide:check" className="text-stone-400 text-xs"></iconify-icon> Storage Stability</li>
              </ul>
            </div>

            {/* Service 5 */}
            <div className="group">
              <div className="w-12 h-12 bg-stone-50 border border-stone-100 rounded-lg flex items-center justify-center text-olive mb-6 group-hover:bg-olive group-hover:text-white transition-all duration-300">
                <iconify-icon icon="lucide:file-bar-chart-2" width="24" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">Market Benchmarking</h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-4">
                Comparative analysis against current market leaders in your specific category. Understand exactly where your product stands regarding price-to-quality ratio.
              </p>
              <ul className="text-sm text-stone-600 space-y-2">
                <li className="flex items-center gap-2"><iconify-icon icon="lucide:check" className="text-stone-400 text-xs"></iconify-icon> Competitor Scoring</li>
                <li className="flex items-center gap-2"><iconify-icon icon="lucide:check" className="text-stone-400 text-xs"></iconify-icon> Price Positioning</li>
                <li className="flex items-center gap-2"><iconify-icon icon="lucide:check" className="text-stone-400 text-xs"></iconify-icon> Trend Alignment</li>
              </ul>
            </div>

            {/* Service 6 */}
            <div className="group">
              <div className="w-12 h-12 bg-stone-50 border border-stone-100 rounded-lg flex items-center justify-center text-olive mb-6 group-hover:bg-olive group-hover:text-white transition-all duration-300">
                <iconify-icon icon="lucide:shield-check" width="24" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-3">Digital Verification</h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-4">
                Issuance of blockchain-backed digital certificates. QR codes for packaging allow consumers to instantly view the product's quality score and origin story.
              </p>
              <ul className="text-sm text-stone-600 space-y-2">
                <li className="flex items-center gap-2"><iconify-icon icon="lucide:check" className="text-stone-400 text-xs"></iconify-icon> Blockchain Registry</li>
                <li className="flex items-center gap-2"><iconify-icon icon="lucide:check" className="text-stone-400 text-xs"></iconify-icon> Consumer QR Codes</li>
                <li className="flex items-center gap-2"><iconify-icon icon="lucide:check" className="text-stone-400 text-xs"></iconify-icon> Anti-Counterfeit</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Standards */}
      <section className="py-24 px-6 bg-[#FDFBF7] border-y border-stone-200">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="font-serif text-3xl text-stone-900 mb-4">Technical Standards</h2>
            <p className="text-stone-600 font-light">
              Our evaluation criteria differ by category. Below are the standard metrics for our three most popular categories.
            </p>
          </div>

          <div className="space-y-4">
            {/* Row 1 */}
            <div className="bg-white p-6 rounded-lg border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-olive/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                  <iconify-icon icon="lucide:coffee" width="20"></iconify-icon>
                </div>
                <div>
                  <h4 className="font-medium text-stone-900">Coffee & Tea</h4>
                  <p className="text-xs text-stone-500 mt-0.5">SCA Cupping Protocols</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-8 text-sm text-stone-600">
                <div>
                  <span className="block text-xs text-stone-400 uppercase tracking-wider mb-1">Defect Count</span>
                  <span className="font-medium">Max 5 Secondary</span>
                </div>
                <div>
                  <span className="block text-xs text-stone-400 uppercase tracking-wider mb-1">Moisture</span>
                  <span className="font-medium">10-12%</span>
                </div>
                <div>
                  <span className="block text-xs text-stone-400 uppercase tracking-wider mb-1">Min Score</span>
                  <span className="font-medium text-olive">85 Points</span>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="bg-white p-6 rounded-lg border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-olive/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                  <iconify-icon icon="lucide:droplets" width="20"></iconify-icon>
                </div>
                <div>
                  <h4 className="font-medium text-stone-900">Olive Oil & Fats</h4>
                  <p className="text-xs text-stone-500 mt-0.5">IOC Standards</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-8 text-sm text-stone-600">
                <div>
                  <span className="block text-xs text-stone-400 uppercase tracking-wider mb-1">Acidity</span>
                  <span className="font-medium">&lt; 0.8%</span>
                </div>
                <div>
                  <span className="block text-xs text-stone-400 uppercase tracking-wider mb-1">Peroxide</span>
                  <span className="font-medium">&lt; 20 meq</span>
                </div>
                <div>
                  <span className="block text-xs text-stone-400 uppercase tracking-wider mb-1">Sensory</span>
                  <span className="font-medium text-olive">Defect Free</span>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="bg-white p-6 rounded-lg border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-olive/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                  <iconify-icon icon="lucide:candy" width="20"></iconify-icon>
                </div>
                <div>
                  <h4 className="font-medium text-stone-900">Honey & Preserves</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Codex Alimentarius</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-8 text-sm text-stone-600">
                <div>
                  <span className="block text-xs text-stone-400 uppercase tracking-wider mb-1">HMF Level</span>
                  <span className="font-medium">&lt; 40 mg/kg</span>
                </div>
                <div>
                  <span className="block text-xs text-stone-400 uppercase tracking-wider mb-1">Sugar Profile</span>
                  <span className="font-medium">C4 Verified</span>
                </div>
                <div>
                  <span className="block text-xs text-stone-400 uppercase tracking-wider mb-1">Pollen</span>
                  <span className="font-medium text-olive">Analysis Req.</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
             <Link href="/about" className="text-sm text-stone-500 hover:text-stone-900 underline underline-offset-4">View technical requirements for all 42 categories</Link>
          </div>
        </div>
      </section>

      {/* Pricing / Packages */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl text-stone-900 mb-4">Certification Packages</h2>
            <p className="text-stone-600 font-light">Simple, flat-fee structures designed for producers of all sizes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* Basic */}
            <div className="p-8 rounded-2xl border border-stone-200 bg-white">
              <h3 className="font-medium text-stone-900 text-lg">Single Origin</h3>
              <p className="text-sm text-stone-500 mt-2 h-10">For small producers verifying a single product line.</p>
              <div className="my-6">
                <span className="text-3xl font-serif text-stone-900">$850</span>
                <span className="text-stone-400 text-sm">/ product</span>
              </div>
              <Link href="/submit" className="block w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-900 text-center rounded-lg text-sm font-medium transition-colors">Select Plan</Link>
              <div className="mt-8 space-y-4">
                <div className="flex gap-3 text-sm text-stone-600">
                  <iconify-icon icon="lucide:check" className="text-olive shrink-0 mt-0.5"></iconify-icon>
                  <span>Chemical analysis (Basic)</span>
                </div>
                <div className="flex gap-3 text-sm text-stone-600">
                  <iconify-icon icon="lucide:check" className="text-olive shrink-0 mt-0.5"></iconify-icon>
                  <span>Sensory panel (3 experts)</span>
                </div>
                <div className="flex gap-3 text-sm text-stone-600">
                  <iconify-icon icon="lucide:check" className="text-olive shrink-0 mt-0.5"></iconify-icon>
                  <span>Digital Certificate</span>
                </div>
                <div className="flex gap-3 text-sm text-stone-400">
                  <iconify-icon icon="lucide:x" className="shrink-0 mt-0.5"></iconify-icon>
                  <span>Marketing license</span>
                </div>
              </div>
            </div>

            {/* Standard (Highlighted) */}
            <div className="p-8 rounded-2xl border border-olive bg-[#FDFBF7] relative shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-olive text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full">
                Recommended
              </div>
              <h3 className="font-medium text-stone-900 text-lg">Gold Standard</h3>
              <p className="text-sm text-stone-500 mt-2 h-10">Complete verification for market-ready products.</p>
              <div className="my-6">
                <span className="text-3xl font-serif text-stone-900">$1,450</span>
                <span className="text-stone-400 text-sm">/ product</span>
              </div>
              <Link href="/submit" className="block w-full py-2.5 px-4 bg-olive hover:bg-[#465a26] text-white text-center rounded-lg text-sm font-medium transition-colors shadow-sm">Select Plan</Link>
              <div className="mt-8 space-y-4">
                <div className="flex gap-3 text-sm text-stone-600">
                  <iconify-icon icon="lucide:check" className="text-olive shrink-0 mt-0.5"></iconify-icon>
                  <span>Full Spectrum Chemical Analysis</span>
                </div>
                <div className="flex gap-3 text-sm text-stone-600">
                  <iconify-icon icon="lucide:check" className="text-olive shrink-0 mt-0.5"></iconify-icon>
                  <span>Sensory panel (5 experts)</span>
                </div>
                <div className="flex gap-3 text-sm text-stone-600">
                  <iconify-icon icon="lucide:check" className="text-olive shrink-0 mt-0.5"></iconify-icon>
                  <span>Physical & Digital Seal License</span>
                </div>
                <div className="flex gap-3 text-sm text-stone-600">
                  <iconify-icon icon="lucide:check" className="text-olive shrink-0 mt-0.5"></iconify-icon>
                  <span>Directory Listing (Featured)</span>
                </div>
              </div>
            </div>

            {/* Premium */}
            <div className="p-8 rounded-2xl border border-stone-200 bg-white">
              <h3 className="font-medium text-stone-900 text-lg">Portfolio</h3>
              <p className="text-sm text-stone-500 mt-2 h-10">For cooperatives or multi-product brands.</p>
              <div className="my-6">
                <span className="text-3xl font-serif text-stone-900">$3,200</span>
                <span className="text-stone-400 text-sm">/ 3 products</span>
              </div>
              <Link href="/contact" className="block w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-900 text-center rounded-lg text-sm font-medium transition-colors">Select Plan</Link>
              <div className="mt-8 space-y-4">
                <div className="flex gap-3 text-sm text-stone-600">
                  <iconify-icon icon="lucide:check" className="text-olive shrink-0 mt-0.5"></iconify-icon>
                  <span>All Gold Standard features</span>
                </div>
                <div className="flex gap-3 text-sm text-stone-600">
                  <iconify-icon icon="lucide:check" className="text-olive shrink-0 mt-0.5"></iconify-icon>
                  <span>On-site audit option</span>
                </div>
                <div className="flex gap-3 text-sm text-stone-600">
                  <iconify-icon icon="lucide:check" className="text-olive shrink-0 mt-0.5"></iconify-icon>
                  <span>Supply chain consultancy</span>
                </div>
                <div className="flex gap-3 text-sm text-stone-600">
                  <iconify-icon icon="lucide:check" className="text-olive shrink-0 mt-0.5"></iconify-icon>
                  <span>Custom Benchmarking Report</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-[#FDFBF7] border-t border-stone-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl text-stone-900 mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {/* Q1 */}
            <div className="bg-white rounded-lg border border-stone-200 p-6">
              <h3 className="font-medium text-stone-900 text-lg mb-2 flex items-start gap-3">
                <iconify-icon icon="lucide:help-circle" className="text-olive mt-1 shrink-0"></iconify-icon>
                How long does the process take?
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed pl-8">
                The standard timeline is 28 days from the moment your samples arrive at our laboratory. This allows 7 days for acclimatization, 14 days for concurrent chemical and sensory testing, and 7 days for data compilation and certification issuance.
              </p>
            </div>

            {/* Q2 */}
            <div className="bg-white rounded-lg border border-stone-200 p-6">
              <h3 className="font-medium text-stone-900 text-lg mb-2 flex items-start gap-3">
                <iconify-icon icon="lucide:help-circle" className="text-olive mt-1 shrink-0"></iconify-icon>
                What happens if my product doesn't pass?
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed pl-8">
                If a product scores below 85 points, certification is not granted. However, you will still receive the detailed technical report. This is often more valuable than the certificate itself, as it highlights specific defects or areas for improvement. You may resubmit after 6 months.
              </p>
            </div>

            {/* Q3 */}
            <div className="bg-white rounded-lg border border-stone-200 p-6">
              <h3 className="font-medium text-stone-900 text-lg mb-2 flex items-start gap-3">
                <iconify-icon icon="lucide:help-circle" className="text-olive mt-1 shrink-0"></iconify-icon>
                How do I ship samples internationally?
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed pl-8">
                Upon registration, we provide you with specific shipping labels and customs documentation to mark the goods as "Samples for Analysis - Not for Resale." This usually expedites the customs process. We have intake centers in the US, EU, and Singapore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-stone-900 text-center">
        <div className="max-w-xl mx-auto">
          <iconify-icon icon="lucide:mail-check" className="text-gold text-4xl mb-6"></iconify-icon>
          <h2 className="font-serif text-3xl md:text-4xl text-[#F2F0E9] mb-4">Ready to certify your quality?</h2>
          <p className="text-stone-400 mb-8 font-light">Begin the application process today. No payment is required until your samples are approved for shipping.</p>
          <Link href="/submit" className="inline-block bg-olive hover:bg-[#465a26] text-white px-8 py-3.5 rounded-lg font-medium transition-all shadow-lg hover:shadow-olive/20">
            Start Application
          </Link>
          <p className="mt-6 text-xs text-stone-500">
            Questions? Email us at <Link href="/contact" className="text-stone-400 underline">support@tastecert.org</Link>
          </p>
        </div>
      </section>
    </>
  );
}
