import Link from 'next/link';

export const metadata = {
  title: 'About Us | Tastecert',
  description: 'The science behind every flavor. We combine sensory expertise with chemical analysis to build the world\'s most trusted food quality database.',
  keywords: ['about tastecert', 'quality certification', 'food science', 'sensory analysis'],
  openGraph: {
    title: 'About Us - Tastecert',
    description: 'The science behind every flavor.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 mesh-bg border-b border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-olive"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-600">Operated by NETSELINE LTD</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl text-[#1C1917] leading-[1.05] tracking-tight mb-8">
            Independent certification<br/>you can trust.
          </h1>
          
          <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mx-auto mb-12">
            Tastecert, operated by NETSELINE LTD, provides transparent, scientifically rigorous certification for artisan food and beverage producers. We combine expert sensory panels with laboratory analysis to deliver independent verification that retailers and consumers trust.
          </p>

          {/* Abstract Visual: The "Spectrum" */}
          <div className="flex justify-center gap-1 h-16 items-end max-w-xs mx-auto opacity-80">
            <div className="w-1 bg-olive h-8 rounded-full"></div>
            <div className="w-1 bg-olive/80 h-12 rounded-full"></div>
            <div className="w-1 bg-olive/60 h-6 rounded-full"></div>
            <div className="w-1 bg-gold h-16 rounded-full mx-2"></div>
            <div className="w-1 bg-[#1C1917]/60 h-10 rounded-full"></div>
            <div className="w-1 bg-[#1C1917]/40 h-5 rounded-full"></div>
            <div className="w-1 bg-[#1C1917]/20 h-8 rounded-full"></div>
          </div>
          <p className="text-xs text-stone-400 mt-4 font-mono">Sensory Data Spectrum v2.0</p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-100">
            <div className="py-12 pr-6">
              <div className="text-4xl font-serif text-[#1C1917] mb-1">12k+</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-stone-500">Products Certified</div>
            </div>
            <div className="py-12 px-6">
              <div className="text-4xl font-serif text-[#1C1917] mb-1">85</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-stone-500">Countries Served</div>
            </div>
            <div className="py-12 px-6">
              <div className="text-4xl font-serif text-[#1C1917] mb-1">400+</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-stone-500">Expert Sommeliers</div>
            </div>
            <div className="py-12 pl-6">
              <div className="text-4xl font-serif text-[#1C1917] mb-1">99.9%</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-stone-500">Analysis Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Methodology */}
      <section className="py-24 px-6 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Narrative */}
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1C1917] tracking-tight mb-6">
                Bridging the gap between artisanal craft and laboratory precision.
              </h2>
              <div className="space-y-6 text-stone-600 leading-relaxed">
                <p>
                  Traditionally, taste has been a matter of opinion. One critic's gold medal is another's pass. At Tastecert, we recognized that while taste is personal, quality is measurable.
                </p>
                <p>
                  Founded by a coalition of food chemists and Michelin-star sommeliers, we developed the <strong>Tastecert Index™</strong>. This proprietary methodology digitizes flavor profiles, allowing brands to maintain consistency and consumers to trust what they buy.
                </p>
              </div>

              <div className="mt-10 flex gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-olive">
                  <iconify-icon icon="lucide:check-circle" width="16"></iconify-icon>
                  <span>Independent Labs</span>
                </div>
              </div>
            </div>

            {/* Right: The Bento Grid (No images) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-stone-50 rounded-lg flex items-center justify-center text-[#1C1917] mb-4">
                  <iconify-icon icon="lucide:flask-conical" width="20"></iconify-icon>
                </div>
                <h3 className="font-serif text-lg text-[#1C1917] mb-2">Chemical Profiling</h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Gas chromatography mass spectrometry identifies over 2,000 volatile compounds.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-stone-50 rounded-lg flex items-center justify-center text-[#1C1917] mb-4">
                  <iconify-icon icon="lucide:brain-circuit" width="20"></iconify-icon>
                </div>
                <h3 className="font-serif text-lg text-[#1C1917] mb-2">AI Benchmarking</h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Our neural networks compare samples against a historical dataset of award-winning products.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow sm:col-span-2">
                <div className="w-10 h-10 bg-stone-50 rounded-lg flex items-center justify-center text-[#1C1917] mb-4">
                  <iconify-icon icon="lucide:users" width="20"></iconify-icon>
                </div>
                <h3 className="font-serif text-lg text-[#1C1917] mb-2">Blind Panel Testing</h3>
                <p className="text-sm text-stone-500 leading-relaxed max-w-md">
                  The human element remains crucial. Double-blind tests with certified sensory experts calibrate our digital findings to ensure emotional resonance.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values / Culture */}
      <section className="py-24 px-6 border-t border-stone-200 dot-pattern">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl text-[#1C1917] tracking-tight mb-4">Our Principles</h2>
          <p className="text-stone-600">Guided by accuracy, driven by passion.</p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Value 1 */}
          <div className="group">
            <div className="h-1 w-12 bg-olive mb-6 group-hover:w-full transition-all duration-500 ease-out"></div>
            <h3 className="text-lg font-medium text-[#1C1917] mb-3">Absolute Neutrality</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              We accept no funding from food manufacturers for our rankings. Our certification process is entirely blind and data-dependent.
            </p>
          </div>
          {/* Value 2 */}
          <div className="group">
            <div className="h-1 w-12 bg-gold mb-6 group-hover:w-full transition-all duration-500 ease-out"></div>
            <h3 className="text-lg font-medium text-[#1C1917] mb-3">Scientific Rigor</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              Methodologies are peer-reviewed annually. We maintain partnerships with 12 leading food science universities.
            </p>
          </div>
          {/* Value 3 */}
          <div className="group">
            <div className="h-1 w-12 bg-[#1C1917] mb-6 group-hover:w-full transition-all duration-500 ease-out"></div>
            <h3 className="text-lg font-medium text-[#1C1917] mb-3">Global Accessibility</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              Taste is a universal language. Our standards adapt to regional palates while maintaining a unified quality baseline.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 px-6 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <h2 className="font-serif text-3xl text-[#1C1917] tracking-tight">Leadership</h2>
            <Link href="/about" className="text-sm font-medium text-olive hover:text-[#465a26] mt-4 md:mt-0 flex items-center gap-1">
              View all board members <iconify-icon icon="lucide:arrow-right" width="16"></iconify-icon>
            </Link>
          </div>

          <div className="divide-y divide-stone-100 border-t border-b border-stone-100">
            {/* Member 1 */}
            <div className="group py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors px-4 -mx-4 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-olive/10 text-olive flex items-center justify-center text-sm font-bold font-serif">
                  DR
                </div>
                <div>
                  <h3 className="text-[#1C1917] font-medium">Dr. Eleanor Vance</h3>
                  <p className="text-sm text-stone-500">Chief Scientific Officer</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs text-stone-400 font-mono">PhD, Molecular Gastronomy</span>
                <iconify-icon icon="lucide:linkedin" className="text-stone-300 group-hover:text-[#0077b5] transition-colors" width="18"></iconify-icon>
              </div>
            </div>

            {/* Member 2 */}
            <div className="group py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors px-4 -mx-4 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center text-sm font-bold font-serif">
                  JM
                </div>
                <div>
                  <h3 className="text-[#1C1917] font-medium">Julian Moreau</h3>
                  <p className="text-sm text-stone-500">Head of Sensory Analysis</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs text-stone-400 font-mono">Master Sommelier</span>
                <iconify-icon icon="lucide:linkedin" className="text-stone-300 group-hover:text-[#0077b5] transition-colors" width="18"></iconify-icon>
              </div>
            </div>

            {/* Member 3 */}
            <div className="group py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors px-4 -mx-4 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1C1917]/5 text-[#1C1917] flex items-center justify-center text-sm font-bold font-serif">
                  AK
                </div>
                <div>
                  <h3 className="text-[#1C1917] font-medium">Sarah Chen</h3>
                  <p className="text-sm text-stone-500">VP of Operations</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs text-stone-400 font-mono">MBA, Supply Chain</span>
                <iconify-icon icon="lucide:linkedin" className="text-stone-300 group-hover:text-[#0077b5] transition-colors" width="18"></iconify-icon>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#1C1917] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <iconify-icon icon="lucide:award" width="48" className="text-gold mb-6 opacity-80"></iconify-icon>
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight mb-6">Join the standard.</h2>
          <p className="text-stone-400 text-lg mb-10 max-w-xl mx-auto">
            Demonstrate your commitment to quality with the world's most rigorous taste certification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit" className="bg-gold hover:bg-[#b08d4b] text-white px-8 py-3.5 rounded-lg text-sm font-semibold transition-all">
              Apply for Certification
            </Link>
            <Link href="/contact" className="bg-transparent border border-stone-700 hover:bg-stone-800 text-white px-8 py-3.5 rounded-lg text-sm font-semibold transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
