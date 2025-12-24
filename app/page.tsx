import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Tastecert | Independent Quality Certification',
  description: 'Independent certification for exceptional specialty products. Rigorous blind-tested evaluation and verified documentation.',
  keywords: ['quality certification', 'product evaluation', 'specialty food certification', 'independent testing'],
  openGraph: {
    title: 'Tastecert - Independent Quality Certification',
    description: 'The definitive seal of quality for artisan producers.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      {/* 1. Introduction / Hero */}
      <header className="overflow-hidden pt-20 pr-6 pb-24 pl-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mr-auto ml-auto gap-x-16 gap-y-16 items-center">
          <div className="space-y-8 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/50 text-stone-600 text-xs font-medium uppercase tracking-wider border border-stone-200">
              <span className="w-1.5 h-1.5 rounded-full bg-olive"></span>
              Global Standard
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl text-stone-900 leading-[1.1] tracking-tight">
              Independent Certification for Exceptional Products
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed font-light">
              Tastecert provides the definitive seal of quality for artisan producers. We connect traditional craftsmanship with modern market trust through rigorous, blind-tested evaluation and verified documentation.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link href="/submit" className="inline-flex items-center justify-center bg-olive hover:bg-[#465a26] text-white px-8 py-3.5 rounded-lg text-base font-medium transition-all shadow-sm hover:shadow-md">
                Start Certification
              </Link>
              <a href="#works" className="inline-flex items-center justify-center bg-white border border-stone-200 hover:border-stone-300 text-stone-700 px-8 py-3.5 rounded-lg text-base font-medium transition-all">
                How it Works
              </a>
            </div>
            <div className="flex items-center gap-6 pt-4 text-sm text-stone-500">
              <div className="flex items-center gap-2">
                <iconify-icon icon="lucide:check" className="text-olive"></iconify-icon>
                <span>ISO 9001 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <iconify-icon icon="lucide:check" className="text-olive"></iconify-icon>
                <span>Global Recognition</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-stone-100 relative z-10">
              <Image 
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/da6a5e12-2657-426e-8b86-6c8b45764c78_1600w.webp" 
                alt="Artisan inspecting product quality in natural light" 
                fill
                className="opacity-95 object-cover"
              />
              {/* Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-xl p-5 shadow-lg border border-white/50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-olive/10 text-olive flex items-center justify-center shrink-0">
                  <iconify-icon icon="lucide:shield-check" width="24" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">Verified Excellence</p>
                  <p className="text-xs text-stone-500">Every product undergoes double-blind chemical & sensory analysis.</p>
                </div>
              </div>
            </div>
            {/* Decorative subtle element */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-olive/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </header>

      {/* 2. Official Documentation */}
      <section className="py-24 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Visual: Realistic Legal Certificate */}
            <div className="relative order-2 lg:order-1 bg-stone-100 rounded-2xl p-8 lg:p-12 flex items-center justify-center">
              
              {/* Certificate Container */}
              <div className="relative paper-texture w-full aspect-[1/1.3] md:aspect-[1/1.4] max-w-md mx-auto p-6 md:p-8 flex flex-col intricate-border shadow-xl transform rotate-1 transition hover:rotate-0 duration-500">
                
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                  <iconify-icon icon="lucide:award" width="200" height="200"></iconify-icon>
                </div>

                {/* Certificate Header */}
                <div className="text-center border-b border-stone-200 pb-6 relative z-10">
                  <div className="flex justify-center mb-3">
                    <iconify-icon icon="lucide:award" className="text-stone-800" width="32"></iconify-icon>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-stone-900 uppercase tracking-widest font-semibold mb-2">Certificate</h2>
                  <p className="font-serif text-sm text-stone-500 italic">of Quality & Authenticity</p>
                </div>

                {/* Certificate Body */}
                <div className="flex-grow flex flex-col justify-center text-center py-6 relative z-10 space-y-6">
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-400 font-medium">This document certifies that</p>
                  
                  <h3 className="font-serif text-2xl md:text-3xl text-stone-900 font-medium italic leading-tight">
                    Highland Estate Reserve
                  </h3>
                  
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-400 font-medium">Produced by Green Valley Roasters</p>
                  
                  <div className="text-sm md:text-base text-stone-600 font-light leading-relaxed px-4">
                    has successfully met the rigorous standards of the Tastecert Quality Institute, achieving a verified score in the Coffee (Single Origin) category.
                  </div>
                </div>

                {/* Certificate Footer */}
                <div className="mt-auto pt-6 border-t border-stone-200 relative z-10">
                  <div className="grid grid-cols-2 gap-8 items-end">
                    <div className="text-center">
                      <div className="h-12 flex items-end justify-center mb-1">
                        <span className="font-signature text-2xl md:text-3xl text-stone-800 transform -rotate-6 block">James Miller</span>
                      </div>
                      <div className="h-px w-full bg-stone-300"></div>
                      <p className="text-[9px] uppercase tracking-wider text-stone-400 mt-1">Director of Evaluation</p>
                    </div>
                    <div className="text-center">
                      <div className="h-12 flex items-end justify-center mb-1">
                        <span className="font-signature text-2xl md:text-3xl text-stone-800 block">Elena Ross</span>
                      </div>
                      <div className="h-px w-full bg-stone-300"></div>
                      <p className="text-[9px] uppercase tracking-wider text-stone-400 mt-1">Compliance Officer</p>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-stone-400 uppercase tracking-wide">Registration No.</span>
                      <span className="font-mono text-xs text-stone-800">TC-2024-8892</span>
                    </div>
                    
                    {/* Gold Seal */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full gold-foil flex items-center justify-center shadow-lg relative -mr-2">
                      <div className="absolute inset-1 border border-white/30 rounded-full"></div>
                      <iconify-icon icon="lucide:ribbon" className="text-white/90 drop-shadow-md" width="32"></iconify-icon>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Text Content */}
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="font-serif text-4xl text-stone-900 tracking-tight">Legally Binding Proof of Quality</h2>
              <p className="text-lg text-stone-600 leading-relaxed font-light">
                The Tastecert certificate is more than a marketing asset; it is a formal declaration of adherence to international quality standards. Each document is uniquely serialised, digitally verifiable, and signed by accredited sensory analysts.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-olive shrink-0 border border-stone-200">
                    <iconify-icon icon="lucide:scale" width="20" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 text-lg">Rigorous Compliance</h4>
                    <p className="text-stone-600 mt-1">Aligned with ISO sensory analysis standards. Our process withstands scrutiny from global retailers.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-olive shrink-0 border border-stone-200">
                    <iconify-icon icon="lucide:fingerprint" width="20" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 text-lg">Anti-Counterfeit Protection</h4>
                    <p className="text-stone-600 mt-1">Certificates feature unique QR verification codes linked to our immutable blockchain registry.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-olive shrink-0 border border-stone-200">
                    <iconify-icon icon="lucide:history" width="20" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 text-lg">3-Year Validity</h4>
                    <p className="text-stone-600 mt-1">Unlike one-off awards, our certification ensures sustained quality control with regular spot-checks.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Detailed How It Works */}
      <section id="works" className="py-24 px-6 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 tracking-tight">Certification Process</h2>
            <p className="text-stone-600 mt-4 max-w-2xl mx-auto font-light text-lg">A comprehensive four-week journey from submission to global recognition.</p>
          </div>

          <div className="relative">
            {/* Vertical Line (Desktop & Mobile) */}
            <div className="absolute top-0 bottom-0 left-[27px] md:left-1/2 w-px timeline-line md:-translate-x-1/2"></div>

            <div className="space-y-12">
              
              {/* Step 1 */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start group">
                {/* Connector Dot */}
                <div className="absolute left-[27px] md:left-1/2 w-3 h-3 bg-stone-900 rounded-full border-2 border-[#FDFBF7] md:-translate-x-1/2 mt-6 z-10 shadow-sm"></div>
                
                {/* Content Box (Left on Desktop) */}
                <div className="pl-16 md:pl-0 md:text-right md:pr-4">
                  <span className="text-xs font-bold text-olive uppercase tracking-wider mb-2 block">Step 01 — Days 1-3</span>
                  <h3 className="text-xl font-serif text-stone-900 font-medium mb-3">Application & Pre-Screening</h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">Submit your producer profile and product specifications via our secure portal. Our team reviews your eligibility and assigns a category specialist.</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-stone-200 rounded text-xs text-stone-500 shadow-sm">
                    <iconify-icon icon="lucide:file-text" width="14"></iconify-icon> Requirements: Lab Reports, Origin Docs
                  </div>
                </div>
                
                {/* Icon Box (Right on Desktop) */}
                <div className="hidden md:flex justify-start pl-4">
                  <div className="w-16 h-16 bg-white border border-stone-200 rounded-2xl flex items-center justify-center text-stone-900 shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1">
                    <iconify-icon icon="lucide:clipboard-check" width="28" style={{ strokeWidth: 1.2 } as React.CSSProperties}></iconify-icon>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start group">
                {/* Connector Dot */}
                <div className="absolute left-[27px] md:left-1/2 w-3 h-3 bg-olive rounded-full border-2 border-[#FDFBF7] md:-translate-x-1/2 mt-6 z-10 shadow-sm"></div>
                
                {/* Icon Box (Left on Desktop) */}
                <div className="hidden md:flex justify-end pr-4">
                  <div className="w-16 h-16 bg-white border border-stone-200 rounded-2xl flex items-center justify-center text-olive shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1">
                    <iconify-icon icon="lucide:package-search" width="28" style={{ strokeWidth: 1.2 } as React.CSSProperties}></iconify-icon>
                  </div>
                </div>
                
                {/* Content Box (Right on Desktop) */}
                <div className="pl-16 md:pl-4 md:text-left">
                  <span className="text-xs font-bold text-olive uppercase tracking-wider mb-2 block">Step 02 — Days 4-10</span>
                  <h3 className="text-xl font-serif text-stone-900 font-medium mb-3">Logistics & Chain of Custody</h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">You ship 3 randomized samples to our central laboratory. We employ strict cold-chain monitoring and anonymize samples upon arrival to ensure blind testing.</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-stone-200 rounded text-xs text-stone-500 shadow-sm">
                    <iconify-icon icon="lucide:truck" width="14"></iconify-icon> Action: Ship 3 Units
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start group">
                {/* Connector Dot */}
                <div className="absolute left-[27px] md:left-1/2 w-3 h-3 bg-stone-900 rounded-full border-2 border-[#FDFBF7] md:-translate-x-1/2 mt-6 z-10 shadow-sm"></div>
                
                {/* Content Box (Left on Desktop) */}
                <div className="pl-16 md:pl-0 md:text-right md:pr-4">
                  <span className="text-xs font-bold text-olive uppercase tracking-wider mb-2 block">Step 03 — Days 11-21</span>
                  <h3 className="text-xl font-serif text-stone-900 font-medium mb-3">Sensory & Chemical Analysis</h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">Two parallel tests occur: a chemical purity test to verify ingredients, and a sensory panel (5 experts) evaluating taste, texture, and aroma against category benchmarks.</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-stone-200 rounded text-xs text-stone-500 shadow-sm">
                    <iconify-icon icon="lucide:microscope" width="14"></iconify-icon> Outcome: Detailed Technical Report
                  </div>
                </div>
                
                {/* Icon Box (Right on Desktop) */}
                <div className="hidden md:flex justify-start pl-4">
                  <div className="w-16 h-16 bg-white border border-stone-200 rounded-2xl flex items-center justify-center text-stone-900 shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1">
                    <iconify-icon icon="lucide:flask-conical" width="28" style={{ strokeWidth: 1.2 } as React.CSSProperties}></iconify-icon>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start group">
                {/* Connector Dot */}
                <div className="absolute left-[27px] md:left-1/2 w-3 h-3 bg-gold rounded-full border-2 border-[#FDFBF7] md:-translate-x-1/2 mt-6 z-10 shadow-sm ring-4 ring-gold/20"></div>
                
                {/* Icon Box (Left on Desktop) */}
                <div className="hidden md:flex justify-end pr-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-stone-900 to-stone-700 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all group-hover:-translate-y-1">
                    <iconify-icon icon="lucide:medal" width="28" style={{ strokeWidth: 1.2 } as React.CSSProperties}></iconify-icon>
                  </div>
                </div>
                
                {/* Content Box (Right on Desktop) */}
                <div className="pl-16 md:pl-4 md:text-left">
                  <span className="text-xs font-bold text-olive uppercase tracking-wider mb-2 block">Step 04 — Day 28</span>
                  <h3 className="text-xl font-serif text-stone-900 font-medium mb-3">Certification & Issuance</h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">Products scoring above 85/100 are granted the Tastecert Seal. You receive digital assets, the physical certificate, and listing in our buyer directory.</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-stone-200 rounded text-xs text-stone-500 shadow-sm">
                    <iconify-icon icon="lucide:check-circle-2" width="14"></iconify-icon> Deliverable: License & Seal
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          <div className="mt-16 text-center">
             <Link href="/about" className="inline-flex items-center justify-center gap-2 text-stone-900 font-medium border-b border-stone-900 pb-0.5 hover:text-olive hover:border-olive transition-colors">
              Learn More About Our Methodology <iconify-icon icon="lucide:arrow-right" width="16"></iconify-icon>
             </Link>
          </div>
        </div>
      </section>

      {/* 4. Why Producers Choose Tastecert */}
      <section className="py-24 px-6 bg-[#FDFBF7] border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 tracking-tight mb-4">Why Producers Choose Tastecert</h2>
            <p className="text-stone-600 font-light text-lg">We help exceptional producers bridge the gap between craftsmanship and commercial success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-olive/5 text-olive rounded-lg flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:handshake" width="24" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-lg font-medium text-stone-900 mb-3">Trust from Buyers</h3>
              <p className="text-sm text-stone-600 leading-relaxed">Retailers and distributors use our registry to vet new suppliers, reducing friction in new partnerships.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-stone-100 text-stone-600 rounded-lg flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:eye" width="24" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-lg font-medium text-stone-900 mb-3">Market Visibility</h3>
              <p className="text-sm text-stone-600 leading-relaxed">Stand out on crowded shelves. Our seal is a visual cue for quality that consumers recognize instantly.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gold/10 text-gold rounded-lg flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:upload-cloud" width="24" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-lg font-medium text-stone-900 mb-3">Simple Submission</h3>
              <p className="text-sm text-stone-600 leading-relaxed">Our digital platform makes the application process streamlined, handling logistics for samples efficiently.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-stone-100 text-stone-600 rounded-lg flex items-center justify-center mb-6">
                <iconify-icon icon="lucide:trophy" width="24" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h3 className="font-serif text-lg font-medium text-stone-900 mb-3">Reliable Recognition</h3>
              <p className="text-sm text-stone-600 leading-relaxed">Unlike marketing awards, our certification is data-backed and valid for 3 years, providing lasting value.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Awards & Seal */}
      <section className="py-24 bg-[#2C2C24] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold font-medium tracking-wide text-sm uppercase">The Mark of Distinction</span>
              <h2 className="font-serif text-4xl lg:text-5xl tracking-tight mt-4 mb-6 text-[#F2F0E9]">A Symbol of Confirmed Quality</h2>
              <p className="text-lg text-stone-300 mb-8 font-light leading-relaxed">
                The Tastecert Seal is not sold; it is earned. Only products scoring above 85 points in our independent evaluation are granted the right to display this mark. It serves as a silent salesperson, communicating excellence before the package is even opened.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-lg">
                  <iconify-icon icon="lucide:package-check" className="text-gold" width="20"></iconify-icon>
                  <span className="text-sm font-medium text-stone-200">Packaging License</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-lg">
                  <iconify-icon icon="lucide:monitor-check" className="text-gold" width="20"></iconify-icon>
                  <span className="text-sm font-medium text-stone-200">Digital Badge</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-lg">
                  <iconify-icon icon="lucide:file-check" className="text-gold" width="20"></iconify-icon>
                  <span className="text-sm font-medium text-stone-200">Printed Marketing</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              {/* The Seal Visual */}
              <div className="relative w-72 h-72 rounded-full bg-[radial-gradient(circle_at_30%_30%,_#556B2F,_#3A4A20)] shadow-[0_0_60px_-15px_rgba(197,160,89,0.3)] flex items-center justify-center border-[8px] border-[#2C2C24] outline outline-1 outline-stone-600">
                <div className="absolute inset-3 rounded-full border border-white/20"></div>
                <div className="text-center text-[#F2F0E9]">
                  <div className="flex justify-center mb-2">
                    <iconify-icon icon="lucide:wheat" width="48" height="48" style={{ strokeWidth: 1 } as React.CSSProperties} className="text-gold"></iconify-icon>
                  </div>
                  <h3 className="font-serif text-3xl font-medium tracking-wide">TASTECERT</h3>
                  <div className="h-px w-16 bg-white/30 mx-auto my-2"></div>
                  <p className="text-xs uppercase tracking-[0.2em] font-medium text-stone-300">Certified Quality</p>
                  <p className="text-[10px] mt-2 text-stone-400">Est. 2012</p>
                </div>
                
                {/* Floating Badges */}
                <div className="absolute -right-4 top-10 bg-[#F2F0E9] text-[#2C2C24] px-4 py-2 rounded shadow-lg text-xs font-bold uppercase tracking-wide">
                  Top 5%
                </div>
                <div className="absolute -left-4 bottom-10 bg-[#2C2C24] border border-stone-600 text-white px-4 py-2 rounded shadow-lg text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                  <iconify-icon icon="lucide:check" className="text-green-500"></iconify-icon> Verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Award-Winning Products */}
      <section className="bg-[#FDFBF7] pt-24 pr-6 pb-24 pl-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 mb-12 gap-x-6 gap-y-6 items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 tracking-tight">Award-Winning Products</h2>
              <p className="text-stone-600 mt-3 font-light">Discover recently certified excellence from around the globe.</p>
            </div>
            <Link href="/winners" className="text-olive hover:text-stone-900 font-medium text-sm flex items-center gap-1 transition-colors">
              View Full Directory <iconify-icon icon="lucide:arrow-right" width="16"></iconify-icon>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="group bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-[16/10] overflow-hidden relative">
                <Image 
                  src="https://images.unsplash.com/photo-1524222717473-730000096953?w=1600&q=80" 
                  alt="Coffee" 
                  fill
                  className="group-hover:scale-105 transition-transform duration-700 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded text-xs font-bold text-olive uppercase tracking-wide shadow-sm border border-stone-100">
                  Gold Standard
                </div>
              </div>
              <div className="pt-6 pr-6 pb-6 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-serif text-xl text-stone-900 font-medium">Single Origin Robusta</h3>
                    <p className="text-sm text-stone-500 mt-1">Valley Heights Estate</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Beverage / Coffee</span>
                  <Link href="/winners" className="text-stone-400 hover:text-olive transition-colors flex items-center gap-1 text-sm font-medium">
                    View Certificate
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="group bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-[16/10] overflow-hidden relative">
                <Image 
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/df8bd7cd-7cbb-4b65-8e22-3e966cd83b1c_1600w.jpg" 
                  alt="Honey" 
                  fill
                  className="group-hover:scale-105 transition-transform duration-700 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded text-xs font-bold text-stone-800 uppercase tracking-wide shadow-sm border border-stone-100">
                  Silver Standard
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
                  <Link href="/winners" className="text-stone-400 hover:text-olive transition-colors flex items-center gap-1 text-sm font-medium">
                    View Certificate
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="group bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-[16/10] overflow-hidden relative">
                <Image 
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4376fa83-b9cb-4b88-b256-86cb4e040344_1600w.jpg" 
                  alt="Spices" 
                  fill
                  className="group-hover:scale-105 transition-transform duration-700 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded text-xs font-bold text-olive uppercase tracking-wide shadow-sm border border-stone-100">
                  Platinum Standard
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
                  <Link href="/winners" className="text-stone-400 hover:text-olive transition-colors flex items-center gap-1 text-sm font-medium">
                    View Certificate
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Call to Action */}
      <section className="bg-stone-900 border-stone-800 border-t pt-24 pr-6 pb-24 pl-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-3 rounded-full bg-white/5 mb-6">
            <iconify-icon icon="lucide:star" className="text-gold" width="24"></iconify-icon>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#F2F0E9] tracking-tight mb-6">Recognize Your Quality.</h2>
          <p className="text-lg text-stone-400 mb-10 max-w-xl mx-auto font-light">Join a distinguished community of producers who value transparency, craftsmanship, and verified excellence.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/submit" className="w-full sm:w-auto px-8 py-4 bg-olive hover:bg-[#465a26] text-white rounded-lg font-medium text-lg transition-all shadow-lg hover:shadow-olive/20">
              Submit Product
            </Link>
            <Link href="/winners" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-stone-700 hover:bg-stone-800 text-stone-300 hover:text-white rounded-lg font-medium text-lg transition-all">
              Explore Winners
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
