import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Tastecert - Premium Quality Certification for Specialty Products',
  description: 'Prestigious certificates and awards for exceptional olive oils, wines, and gourmet foods. Expert evaluation, trusted by producers and consumers worldwide.',
  keywords: ['olive oil certification', 'wine awards', 'specialty food certification', 'gourmet product awards', 'product quality seal'],
  openGraph: {
    title: 'Tastecert - Premium Quality Certification',
    description: 'Prestigious certificates and awards for exceptional specialty products.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      {/* Hero / Introduction */}
      <section id="intro" className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Abstract gradient background */}
        <div className="absolute inset-0 -z-10 bg-[#FAFAF9]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-orange-200/30 rounded-[100%] blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-100/30 rounded-[100%] blur-3xl opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-100 shadow-sm text-xs font-semibold text-orange-600 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              Now supporting ISO 8586:2023
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-stone-900 tracking-tight leading-[1.1] mb-6 font-heading">
              The seal of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">excellence.</span>
            </h1>
            
            <p className="text-lg text-stone-500 leading-relaxed font-medium mb-8 max-w-lg">
              Prestigious certification for exceptional olive oils, wines, and specialty foods. Expert evaluation by trained panels, delivering certificates and awards recognized worldwide.
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-md mb-8">
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                  <iconify-icon icon="lucide:flask-conical" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>
                Human + Lab testing
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                  <iconify-icon icon="lucide:check-circle" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>
                Retail-ready seal
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/submit" className="w-full sm:w-auto px-8 py-4 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-500 transition-all hover:shadow-orange-500/25 hover:shadow-xl text-center">
                Submit Your Product
              </Link>
              <Link href="/winners" className="w-full sm:w-auto px-8 py-4 bg-white text-stone-700 border border-stone-200 rounded-full font-semibold hover:bg-stone-50 transition-colors text-center flex items-center justify-center gap-2 shadow-sm">
                <iconify-icon icon="lucide:trophy" width="20" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                View Winners
              </Link>
            </div>
            
            {/* Secondary CTA */}
            <div className="mt-4">
              <a href="#tasting" className="text-sm text-stone-500 hover:text-orange-600 transition-colors inline-flex items-center gap-1">
                or learn how it works
                <iconify-icon icon="lucide:arrow-down" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </a>
            </div>
            
            <div className="mt-10 flex items-center gap-4 text-sm font-medium text-stone-400">
              <span>Trusted by premium producers</span>
              <div className="flex gap-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="font-heading font-semibold text-stone-800">Estate Wineries</span>
                <span className="font-heading font-semibold text-stone-800">Artisan Producers</span>
                <span className="font-heading font-semibold text-stone-800">Premium Brands</span>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Floating Card Stack with lab-focused image */}
            <div className="relative z-10 w-full aspect-square md:aspect-[4/5] max-w-md mx-auto">
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl shadow-stone-900/10 border-4 border-white transform hover:scale-[1.02] transition-transform duration-500 relative">
                <Image src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=2670&auto=format&fit=crop" alt="Premium olive oil bottles with gold seal certification" fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)' }}></div>
              </div>

              {/* Floating UI Widget: Taste Profile */}
              <div className="absolute -bottom-8 -left-8 right-8 bg-white p-5 rounded-2xl shadow-xl shadow-stone-900/10 border border-stone-100 float-element">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                      <iconify-icon icon="lucide:activity" width="20" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-stone-900 font-heading">Flavor Profile</h3>
                      <p className="text-xs text-stone-500">Sample B-92</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-md">98/100</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-1">
                      <span>Umami</span>
                      <span>High</span>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 w-[85%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-1">
                      <span>Acidity</span>
                      <span>Balanced</span>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-stone-800 w-[60%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Widget 2: Status */}
              <div className="absolute top-8 -right-6 bg-white/90 backdrop-blur px-4 py-3 rounded-xl shadow-lg border border-white/50 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' } as React.CSSProperties}>
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-semibold text-stone-800">Lab Analysis Complete</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Service Offering */}
      <section id="tasting" className="py-24 bg-stone-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-4 block">Our Service Offering</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight mb-4 font-heading">Professional evaluation with official documentation</h2>
            <p className="text-stone-500 text-lg leading-relaxed">
              From detailed sensory reports to recognized quality seals—we provide comprehensive documentation that companies trust and consumers value.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 items-end">
            {/* 1. Sensory Evaluation Report */}
            <div className="group flex flex-col">
              <div className="relative mb-6 overflow-hidden rounded-2xl bg-white p-6 border-2 border-stone-200 hover:border-orange-300 transition-all hover:shadow-2xl h-[380px] flex items-center">
                {/* Mock Report Document */}
                <div className="w-full">
                  <div className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-xl p-6 border border-stone-200">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-300">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
                          <iconify-icon icon="lucide:clipboard-check" width="16" className="text-white" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                        </div>
                        <span className="text-xs font-bold text-stone-900">SENSORY ANALYSIS</span>
                      </div>
                      <span className="text-[10px] text-stone-500 font-mono">#M-2024-087</span>
                    </div>
                    
                    {/* Score Display */}
                    <div className="text-center mb-5 py-4 bg-white rounded-lg">
                      <div className="text-xs text-stone-500 mb-1 uppercase tracking-wider">Total Score</div>
                      <div className="text-5xl font-bold text-orange-600 font-heading mb-2">87<span className="text-2xl">%</span></div>
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-xs text-green-700 font-semibold">
                        <iconify-icon icon="lucide:shield-check" width="12" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                        Certified Quality
                      </div>
                    </div>

                    {/* Attribute Scores */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-stone-700 font-medium">Taste</span>
                          <span className="font-bold text-stone-900">92%</span>
                        </div>
                        <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 w-[92%] rounded-full"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-stone-700 font-medium">Aroma</span>
                          <span className="font-bold text-stone-900">85%</span>
                        </div>
                        <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 w-[85%] rounded-full"></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-stone-700 font-medium">Texture</span>
                          <span className="font-bold text-stone-900">84%</span>
                        </div>
                        <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 w-[84%] rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center px-4 min-h-[120px] flex flex-col justify-start">
                <h3 className="text-xl font-bold text-stone-900 font-heading mb-2">Sensory evaluation</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  A professional taste assessment of your product with detailed scoring across all sensory attributes by our expert panel.
                </p>
              </div>
            </div>

            {/* 2. Detailed Tasting Notes */}
            <div className="group flex flex-col">
              <div className="relative mb-6 overflow-hidden rounded-2xl bg-white p-6 border-2 border-stone-200 hover:border-orange-300 transition-all hover:shadow-2xl h-[380px] flex items-center">
                {/* Mock Tasting Notes Document */}
                <div className="w-full">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-blue-300">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <iconify-icon icon="lucide:message-square-quote" width="16" className="text-white" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <span className="text-xs font-bold text-stone-900">JURY COMMENTS</span>
                    </div>

                    {/* Feedback Cards */}
                    <div className="space-y-3 mb-4">
                      <div className="bg-white rounded-lg p-3 border border-blue-200">
                        <div className="flex items-start gap-2">
                          <iconify-icon icon="lucide:thumbs-up" width="14" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                          <div>
                            <div className="text-[9px] font-bold text-green-700 mb-1 uppercase tracking-wider">Strengths</div>
                            <div className="text-xs text-stone-700 leading-relaxed">
                              "Exceptional balance and depth of flavor. Well-executed product..."
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-3 border border-amber-200">
                        <div className="flex items-start gap-2">
                          <iconify-icon icon="lucide:lightbulb" width="14" className="text-amber-600 mt-0.5 shrink-0" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                          <div>
                            <div className="text-[9px] font-bold text-amber-700 mb-1 uppercase tracking-wider">Suggestions</div>
                            <div className="text-xs text-stone-700 leading-relaxed">
                              "Consider slight refinement in sweetness balance..."
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overall Rating */}
                    <div className="bg-white rounded-lg p-3 border border-stone-200">
                      <div className="text-[9px] font-bold text-stone-700 mb-2 uppercase tracking-wider">Overall Impression</div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(4)].map((_, i) => (
                            <iconify-icon key={i} icon="lucide:star" width="14" className="text-orange-500" style={{ strokeWidth: 0, fill: 'currentColor' } as React.CSSProperties}></iconify-icon>
                          ))}
                          <iconify-icon icon="lucide:star" width="14" className="text-stone-300" style={{ strokeWidth: 0, fill: 'currentColor' } as React.CSSProperties}></iconify-icon>
                        </div>
                        <span className="text-xs font-bold text-stone-900">Excellent Quality</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center px-4 min-h-[120px] flex flex-col justify-start">
                <h3 className="text-xl font-bold text-stone-900 font-heading mb-2">Tasting reports</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Personalized tasting notes from our jury that you can use to improve quality or as marketing content.
                </p>
              </div>
            </div>

            {/* 3. The Quality Award Badge */}
            <div className="group flex flex-col">
              <div className="relative mb-6 overflow-hidden rounded-2xl bg-white p-6 border-2 border-stone-200 hover:border-orange-300 transition-all hover:shadow-2xl h-[380px] flex items-center justify-center">
                {/* Official Award Seal */}
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full scale-125"></div>
                  
                  {/* Main Badge */}
                  <div className="relative w-52 h-52">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 shadow-2xl"></div>
                    
                    {/* Inner circle */}
                    <div className="absolute inset-[8px] rounded-full bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 flex flex-col items-center justify-center">
                      {/* Year badge */}
                      <div className="mb-2 px-4 py-1 bg-orange-600/20 rounded-full border border-orange-500/30">
                        <span className="text-orange-300 text-xs font-bold tracking-widest">2024</span>
                      </div>
                      
                      {/* Trophy icon */}
                      <iconify-icon icon="lucide:award" width="56" className="text-orange-400 mb-3" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      
                      {/* Text */}
                      <div className="text-center">
                        <div className="text-white font-bold text-sm font-heading mb-1">QUALITY SEAL</div>
                        <div className="text-orange-300 text-[10px] uppercase tracking-[0.25em]">Tastecert Certified</div>
                      </div>
                    </div>

                    {/* Star decorations */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                      {[...Array(3)].map((_, i) => (
                        <iconify-icon key={i} icon="lucide:star" width="18" className="text-orange-500" style={{ strokeWidth: 0, fill: 'currentColor' } as React.CSSProperties}></iconify-icon>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center px-4 min-h-[120px] flex flex-col justify-start">
                <h3 className="text-xl font-bold text-stone-900 font-heading mb-2">The Superior Taste Award</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  A recognized symbol of excellence that brands can display on packaging and marketing materials worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why companies work with us */}
      <section id="why" className="py-24 bg-stone-50 border-y border-stone-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-200 to-blue-200 rounded-3xl blur-2xl opacity-30 transform rotate-3"></div>
                <div className="relative bg-white rounded-2xl shadow-xl border border-stone-200/60 overflow-hidden">
                  <div className="border-b border-stone-100 p-4 flex items-center justify-between bg-white">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400/20 border border-yellow-400/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400/50"></div>
                    </div>
                    <div className="px-3 py-1 bg-stone-50 rounded-md border border-stone-100">
                      <span className="text-[10px] font-mono text-stone-400">metric_analysis_v2.0</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-8">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 relative">
                        <Image src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop" alt="Sample" width={64} height={64} className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-stone-900">Vanilla Bean Extract</h3>
                            <p className="text-xs text-stone-500 mt-1">Batch #4029 • Madagascar Origin</p>
                          </div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-100">
                            <iconify-icon icon="lucide:check-circle" width="12" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon> Pass
                          </span>
                        </div>
                        <div className="mt-4 flex gap-4">
                          <div className="text-center px-3 py-2 rounded-lg bg-stone-50 border border-stone-100">
                            <div className="text-[10px] uppercase text-stone-400 font-semibold">Vanillin</div>
                            <div className="text-sm font-semibold text-stone-900">2.4%</div>
                          </div>
                          <div className="text-center px-3 py-2 rounded-lg bg-stone-50 border border-stone-100">
                            <div className="text-[10px] uppercase text-stone-400 font-semibold">Moisture</div>
                            <div className="text-sm font-semibold text-stone-900">28%</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">Flavor Radar</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-medium text-stone-600 w-16">Sweet</span>
                          <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                            <div className="w-[80%] h-full bg-stone-800 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-medium text-stone-600 w-16">Floral</span>
                          <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                            <div className="w-[92%] h-full bg-orange-500 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-medium text-stone-600 w-16">Woody</span>
                          <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                            <div className="w-[45%] h-full bg-stone-300 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-6 font-heading">
                Why producers choose Tastecert
              </h2>
              <p className="text-stone-500 mb-8 leading-relaxed text-lg">
                Certification that elevates your brand. Our rigorous evaluation process combines expert sensory panels with advanced laboratory analysis, delivering prestigious recognition that resonates with discerning consumers.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:rocket" width="20" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900">Prestigious Recognition</h4>
                    <p className="text-sm text-stone-500 mt-1">Earn certification marks that signal excellence to consumers, retailers, and distributors worldwide.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:shield-check" width="20" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900">Expert Evaluation</h4>
                    <p className="text-sm text-stone-500 mt-1">Trained tasting panels (ISO 8586) and validated methodologies ensure credible, transparent results.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:line-chart" width="20" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900">Market Differentiation</h4>
                    <p className="text-sm text-stone-500 mt-1">Stand out in premium markets with independent third-party validation of your product quality.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
              <div className="flex items-center gap-3">
                <a href="/submit" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-stone-900 text-white font-semibold hover:bg-stone-800 transition-colors">
                  <iconify-icon icon="lucide:send" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  Start your analysis
                </a>
                <a href="/winners" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-stone-200 text-stone-700 font-semibold hover:bg-stone-50 transition-colors">
                  <iconify-icon icon="lucide:trophy" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  See Winners
                </a>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards / Quality Seal */}
      <section id="awards" className="py-24 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4 block">Recognition</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 font-heading">Awards & Quality Seal</h2>
            <p className="text-stone-400 text-lg max-w-2xl mx-auto">
              Every product earns a score and corresponding seal. High performers receive tiered awards recognized by buyers and retailers worldwide.
            </p>
          </div>

          {/* Perfect Badge (primary) */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <div className="w-56 h-56 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 shadow-2xl flex items-center justify-center">
                <div className="w-[85%] h-[85%] rounded-full bg-stone-900/90 border border-white/20 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-1 text-amber-300 mb-2">
                    <iconify-icon icon="lucide:sparkles" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    <span className="text-xs font-semibold tracking-[0.2em]">METRIC</span>
                    <iconify-icon icon="lucide:sparkles" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <span className="text-white text-3xl font-bold tracking-tight font-heading">PERFECT</span>
                  <span className="text-xs text-stone-300 mt-2 px-3 py-1 rounded-full border border-white/10">Score 98–100</span>
                </div>
              </div>
              <div className="absolute inset-0 -z-10 blur-3xl rounded-full bg-amber-500/40 animate-pulse" style={{ animationDuration: '3s' } as React.CSSProperties}></div>
            </div>
          </div>

          <p className="text-stone-300 max-w-2xl mx-auto mb-12 text-center text-lg">
            The "Perfect" badge is reserved for products that deliver exceptional balance, intensity, and cleanliness across sensory and lab metrics.
          </p>

          <div className="text-center mb-20">
            <a href="/winners" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all border border-white/20 hover:border-white/30">
              <iconify-icon icon="lucide:trophy" width="18" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              View Award Winners
              <iconify-icon icon="lucide:arrow-right" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            </a>
          </div>

          {/* Tiered badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center mb-20">
            {/* Gold */}
            <div className="flex flex-col items-center gap-6 group">
              <div className="w-44 h-44 rounded-full badge-modern bg-gradient-to-br from-stone-100/20 to-stone-400/5 flex flex-col items-center justify-center text-center p-4 transform group-hover:-translate-y-2 transition-transform duration-500 relative">
                <div className="absolute inset-0 rounded-full border border-white/20"></div>
                <iconify-icon icon="lucide:trophy" className="text-orange-200 mb-2 drop-shadow-lg" width="32" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/60 mb-1">Grade A</span>
                <span className="text-2xl font-semibold text-white tracking-tight font-heading">GOLD</span>
                <span className="text-[10px] font-medium text-white/40 mt-1 bg-white/10 px-2 py-0.5 rounded-full">Score 95–97</span>
              </div>
              <div className="text-center">
                <h3 className="text-white font-semibold mb-1">Gold Distinction</h3>
                <p className="text-sm text-stone-500">Exceptional complexity.</p>
              </div>
            </div>

            {/* Silver */}
            <div className="flex flex-col items-center gap-6 group">
              <div className="w-44 h-44 rounded-full badge-modern bg-gradient-to-br from-slate-100/20 to-slate-400/5 flex flex-col items-center justify-center text-center p-4 transform group-hover:-translate-y-2 transition-transform duration-500 relative">
                <div className="absolute inset-0 rounded-full border border-white/20"></div>
                <iconify-icon icon="lucide:medal" className="text-slate-200 mb-2 drop-shadow-lg" width="32" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/60 mb-1">Grade B</span>
                <span className="text-2xl font-semibold text-white tracking-tight font-heading">SILVER</span>
                <span className="text-[10px] font-medium text-white/40 mt-1 bg-white/10 px-2 py-0.5 rounded-full">Score 85–94</span>
              </div>
              <div className="text-center">
                <h3 className="text-white font-semibold mb-1">Silver Distinction</h3>
                <p className="text-sm text-stone-500">Outstanding balance.</p>
              </div>
            </div>

            {/* Bronze */}
            <div className="flex flex-col items-center gap-6 group">
              <div className="w-44 h-44 rounded-full badge-modern bg-gradient-to-br from-orange-900/40 to-orange-800/10 flex flex-col items-center justify-center text-center p-4 transform group-hover:-translate-y-2 transition-transform duration-500 relative">
                <div className="absolute inset-0 rounded-full border border-white/20"></div>
                <iconify-icon icon="lucide:star" className="text-orange-300 mb-2 drop-shadow-lg" width="32" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/60 mb-1">Grade C</span>
                <span className="text-2xl font-semibold text-white tracking-tight font-heading">BRONZE</span>
                <span className="text-[10px] font-medium text-white/40 mt-1 bg-white/10 px-2 py-0.5 rounded-full">Score 80–84</span>
              </div>
              <div className="text-center">
                <h3 className="text-white font-semibold mb-1">Bronze Distinction</h3>
                <p className="text-sm text-stone-500">Market standard.</p>
              </div>
            </div>
          </div>

          {/* Impact Statistics */}
          {/* <div className="mt-20 mb-16">
            <h3 className="text-2xl font-semibold text-white text-center mb-10 font-heading">The impact of certification</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-500 font-heading mb-2">3.2x</div>
                <div className="text-sm text-stone-400 leading-relaxed">Average sales increase for award winners</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-emerald-500 font-heading mb-2">89%</div>
                <div className="text-sm text-stone-400 leading-relaxed">Retailers prefer certified products</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-500 font-heading mb-2">500+</div>
                <div className="text-sm text-stone-400 leading-relaxed">Brands displaying our seal globally</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-500 font-heading mb-2">15M+</div>
                <div className="text-sm text-stone-400 leading-relaxed">Consumers see our badges monthly</div>
              </div>
            </div>
          </div> */}

        </div>
      </section>

      {/* How does it work? */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight mb-4 font-heading">How does it work?</h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              From product registration to official certification—our streamlined process delivers results in just 2-3 weeks.
            </p>
          </div>

          {/* Timeline Steps */}
          <div className="relative mb-16">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-[140px] left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-stone-300 via-stone-200 to-stone-300"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {/* Step 1: Register Online */}
              <div className="relative flex flex-col items-center text-center group">
                {/* Visual Mockup */}
                <div className="relative mb-8 w-full max-w-[240px] group-hover:scale-105 transition-transform duration-300">
                  {/* Computer/Monitor Illustration */}
                  <div className="relative aspect-[4/3] bg-white rounded-2xl shadow-2xl border-8 border-stone-700 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-50 p-6 flex flex-col items-center justify-center">
                      {/* Browser mockup */}
                      <div className="w-full bg-white rounded-lg shadow-lg border border-stone-200 p-4">
                        <div className="flex gap-1 mb-3">
                          <div className="w-2 h-2 rounded-full bg-red-400"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                          <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-stone-200 rounded w-3/4"></div>
                          <div className="h-2 bg-stone-200 rounded w-full"></div>
                          <div className="h-2 bg-stone-200 rounded w-2/3"></div>
                        </div>
                        <div className="mt-3 h-6 bg-orange-600 rounded flex items-center justify-center">
                          <iconify-icon icon="lucide:send" width="12" className="text-white" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Stand */}
                  <div className="mx-auto w-20 h-4 bg-stone-400 rounded-b-lg"></div>
                  <div className="mx-auto w-32 h-2 bg-stone-500 rounded-full mt-1"></div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white z-10">
                    1
                  </div>
                </div>

                <h3 className="text-lg font-bold text-stone-900 font-heading mb-2">Register your products online</h3>
                <p className="text-sm text-stone-600 leading-relaxed max-w-xs">
                  Complete our simple online form with your product details and select your evaluation package.
                </p>
              </div>

              {/* Step 2: Send Samples */}
              <div className="relative flex flex-col items-center text-center group">
                {/* Visual Mockup */}
                <div className="relative mb-8 w-full max-w-[240px] group-hover:scale-105 transition-transform duration-300">
                  {/* Envelope/Package Illustration */}
                  <div className="relative aspect-[4/3] flex items-center justify-center">
                    <div className="relative w-48 h-32">
                      {/* Envelope body */}
                      <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg shadow-2xl border-2 border-stone-300"></div>
                      {/* Envelope flap */}
                      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-br from-stone-200 to-stone-300 origin-top transform -rotate-0 shadow-lg" style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}></div>
                      {/* Address label */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-2 bg-white rounded px-3 py-2 shadow-md border border-stone-200">
                        <div className="text-[8px] text-stone-500 font-semibold mb-1">To:</div>
                        <div className="flex items-center gap-1">
                          <div className="w-5 h-5 rounded-full bg-orange-600 flex items-center justify-center">
                            <iconify-icon icon="lucide:flask-conical" width="10" className="text-white" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                          </div>
                          <div className="text-[9px] font-bold text-stone-900">Tastecert Labs</div>
                        </div>
                      </div>
                      {/* Stamp */}
                      <div className="absolute top-2 right-2 w-8 h-8 bg-amber-100 border-2 border-amber-400 rounded transform rotate-12"></div>
                    </div>
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-stone-400 to-stone-500 flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white z-10">
                    2
                  </div>
                </div>

                <h3 className="text-lg font-bold text-stone-900 font-heading mb-2">Send us your samples</h3>
                <p className="text-sm text-stone-600 leading-relaxed max-w-xs">
                  Ship 6+ units to our certified lab. We'll handle all temperature-controlled storage needs.
                </p>
              </div>

              {/* Step 3: Testing */}
              <div className="relative flex flex-col items-center text-center group">
                {/* Visual Mockup */}
                <div className="relative mb-8 w-full max-w-[240px] group-hover:scale-105 transition-transform duration-300">
                  {/* Flag/Badge Illustration */}
                  <div className="relative aspect-[4/3] flex items-center justify-center">
                    {/* Flag pole */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-40 bg-stone-600"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-stone-700 rounded-full"></div>
                    
                    {/* Flag with badge */}
                    <div className="relative mt-8">
                      <div className="w-40 h-28 bg-gradient-to-br from-orange-600 to-orange-700 shadow-2xl relative overflow-hidden">
                        {/* Badge/Seal on flag */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-stone-900 to-stone-800 border-4 border-amber-400 flex items-center justify-center shadow-xl">
                            <iconify-icon icon="lucide:badge-check" width="32" className="text-amber-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-stone-400 to-stone-500 flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white z-10">
                    3
                  </div>
                </div>

                <h3 className="text-lg font-bold text-stone-900 font-heading mb-2">Products are tested</h3>
                <p className="text-sm text-stone-600 leading-relaxed max-w-xs">
                  Our expert panel conducts blind sensory evaluation while labs perform chemical analysis.
                </p>
              </div>

              {/* Step 4: Results & Certification */}
              <div className="relative flex flex-col items-center text-center group">
                {/* Visual Mockup */}
                <div className="relative mb-8 w-full max-w-[240px] group-hover:scale-105 transition-transform duration-300">
                  {/* Certificate Illustration */}
                  <div className="relative aspect-[4/3] flex items-center justify-center px-4">
                    <div className="relative w-full bg-white rounded-lg shadow-2xl border-4 border-stone-300 p-6 transform rotate-2">
                      {/* Ribbon/Seal */}
                      <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-orange-600 to-orange-700 border-4 border-white shadow-xl flex items-center justify-center z-10">
                        <div className="flex gap-0.5">
                          {[...Array(3)].map((_, i) => (
                            <iconify-icon key={i} icon="lucide:star" width="10" className="text-amber-300" style={{ strokeWidth: 0, fill: 'currentColor' } as React.CSSProperties}></iconify-icon>
                          ))}
                        </div>
                      </div>
                      
                      {/* Certificate content */}
                      <div className="space-y-2 pt-2">
                        <div className="h-1.5 bg-stone-200 rounded w-3/4 mx-auto"></div>
                        <div className="h-1.5 bg-stone-200 rounded w-full"></div>
                        <div className="h-1.5 bg-stone-200 rounded w-5/6 mx-auto"></div>
                        <div className="my-3 py-2 border-y border-stone-200">
                          <div className="text-2xl font-bold text-orange-600 font-heading">92%</div>
                        </div>
                        <div className="h-1 bg-stone-200 rounded w-2/3 mx-auto"></div>
                        <div className="flex justify-between pt-2">
                          <div className="h-2 w-12 bg-stone-300"></div>
                          <div className="h-2 w-12 bg-stone-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-stone-400 to-stone-500 flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white z-10">
                    4
                  </div>
                </div>

                <h3 className="text-lg font-bold text-stone-900 font-heading mb-2">Get your evaluation results & certification</h3>
                <p className="text-sm text-stone-600 leading-relaxed max-w-xs">
                  Receive comprehensive reports, quality scores, and official certification badges for your marketing.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a href="/submit" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-full font-semibold hover:bg-stone-800 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
              <iconify-icon icon="lucide:clipboard-list" width="20" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              Registration details & timeline
            </a>
          </div>
        </div>
      </section>

      {/* Winners Gallery Section */}
      <section className="py-24 bg-gradient-to-br from-stone-50 via-white to-stone-50 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-4 block">Certified Excellence</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight mb-4 font-heading">
              Award-winning products
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed">
              Explore our gallery of certified winners. See which products earned gold, silver, and bronze distinctions from our expert panels.
            </p>
          </div>

          {/* Preview badges/awards */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-xl mb-2">
                <iconify-icon icon="lucide:trophy" width="32" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <span className="text-xs font-semibold text-stone-600">Gold</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center shadow-xl mb-2">
                <iconify-icon icon="lucide:medal" width="32" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <span className="text-xs font-semibold text-stone-600">Silver</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center shadow-xl mb-2">
                <iconify-icon icon="lucide:star" width="32" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <span className="text-xs font-semibold text-stone-600">Bronze</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/winners" 
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full font-semibold hover:shadow-xl hover:shadow-orange-500/25 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <iconify-icon icon="lucide:trophy" width="20" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              View Winners Gallery
            </Link>
            <Link 
              href="/awards" 
              className="px-8 py-4 bg-white text-stone-700 border-2 border-stone-200 rounded-full font-semibold hover:bg-stone-50 transition-colors flex items-center gap-2"
            >
              <iconify-icon icon="lucide:info" width="20" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              Learn About Awards
            </Link>
          </div>
        </div>
      </section>

      {/* CTA: Invite to submit */}
      <section id="submit" className="py-20 bg-stone-50 border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-stone-100 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-stone-900 font-heading">Ready to submit your product?</h3>
              <p className="text-stone-500 mt-2 text-lg">Get a clear, defensible report and a seal buyers understand.</p>
            </div>
            <div className="flex items-center gap-3">
              <a href="/submit" className="px-6 py-3 rounded-full bg-stone-900 text-white font-semibold hover:bg-stone-800 transition-colors">
                Start Submission
              </a>
              <a href="#tasting" className="px-6 py-3 rounded-full bg-white text-stone-700 border border-stone-200 font-semibold hover:bg-stone-50 transition-colors">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
