import Link from 'next/link';

export const metadata = {
  title: 'Our Methodology | Tastecert',
  description: 'A transparent, detailed overview of our blind sensory evaluation process, scoring criteria, panel qualifications, and technical analysis standards.',
  keywords: ['sensory methodology', 'blind testing', 'food certification process', 'quality scoring', 'technical analysis'],
  openGraph: {
    title: 'Our Methodology - Tastecert',
    description: 'Transparent, rigorous evaluation process for artisan products.',
    type: 'website',
  },
};

export default function MethodologyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 bg-gradient-to-b from-[#2E4F3A] to-[#1a2e23]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8">
            <iconify-icon icon="lucide:microscope" width="14" className="text-[#D4AF37]" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/90">Transparent Process</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-6xl text-white leading-[1.1] tracking-tight mb-6">
            Our Methodology
          </h1>
          
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            A detailed, transparent breakdown of our independent evaluation process — from panel selection to certificate issuance.
          </p>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-12 px-6 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-serif text-[#2E4F3A] mb-2">100+</div>
              <div className="text-sm text-stone-600">Certified Experts</div>
            </div>
            <div>
              <div className="text-4xl font-serif text-[#2E4F3A] mb-2">5-7</div>
              <div className="text-sm text-stone-600">Panel Members per Test</div>
            </div>
            <div>
              <div className="text-4xl font-serif text-[#2E4F3A] mb-2">100</div>
              <div className="text-sm text-stone-600">Point Scoring System</div>
            </div>
            <div>
              <div className="text-4xl font-serif text-[#2E4F3A] mb-2">3</div>
              <div className="text-sm text-stone-600">Independent Lab Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto space-y-20">
          
          {/* 1. Panel Selection & Qualifications */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center">
                <iconify-icon icon="lucide:users" width="24" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h2 className="font-serif text-3xl text-stone-900">Panel Selection & Qualifications</h2>
            </div>
            
            <div className="prose prose-stone max-w-none">
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Our expert panels are composed of rigorously vetted sensory professionals with proven track records in food and beverage evaluation.
              </p>

              <div className="bg-white rounded-xl border border-stone-200 p-6 mb-6">
                <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
                  <iconify-icon icon="lucide:check-circle" width="20" className="text-[#2E4F3A]"></iconify-icon>
                  Minimum Qualifications for Panel Members
                </h3>
                <ul className="space-y-3 text-stone-600">
                  <li className="flex items-start gap-3">
                    <iconify-icon icon="lucide:check" width="16" className="text-[#D4AF37] mt-1 shrink-0" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                    <span><strong>Professional certification</strong> in sensory analysis (e.g., ASBC, SCA, WSET Level 3+, Q Grader, or equivalent)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <iconify-icon icon="lucide:check" width="16" className="text-[#D4AF37] mt-1 shrink-0" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                    <span><strong>Minimum 5 years</strong> professional experience in food/beverage quality evaluation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <iconify-icon icon="lucide:check" width="16" className="text-[#D4AF37] mt-1 shrink-0" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                    <span><strong>Proven sensory acuity</strong> through annual calibration testing (threshold detection, triangle tests)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <iconify-icon icon="lucide:check" width="16" className="text-[#D4AF37] mt-1 shrink-0" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                    <span><strong>Category-specific expertise</strong> matched to product type (e.g., olive oil experts evaluate oils)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <iconify-icon icon="lucide:check" width="16" className="text-[#D4AF37] mt-1 shrink-0" style={{ strokeWidth: 2 } as React.CSSProperties}></iconify-icon>
                    <span><strong>No financial ties</strong> to producers under evaluation (conflict screening required)</span>
                  </li>
                </ul>
              </div>

              <p className="text-stone-600 leading-relaxed">
                Panel members undergo continuous training and quarterly calibration sessions to maintain consistency and accuracy. We maintain a diverse roster of experts across culinary, scientific, and regional specialties.
              </p>
            </div>
          </div>

          {/* 2. Blind Sensory Process */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#2E4F3A] rounded-xl flex items-center justify-center">
                <iconify-icon icon="lucide:eye-off" width="24" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h2 className="font-serif text-3xl text-stone-900">Blind Sensory Process</h2>
            </div>
            
            <div className="prose prose-stone max-w-none">
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Complete anonymization ensures evaluations are based purely on sensory merit, eliminating brand bias and influence.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl border border-stone-200 p-5">
                  <h4 className="font-semibold text-stone-900 mb-2 flex items-center gap-2">
                    <iconify-icon icon="lucide:package" width="18" className="text-[#D4AF37]"></iconify-icon>
                    Sample Handling
                  </h4>
                  <p className="text-sm text-stone-600">Upon arrival, all branding, labels, and identifying information are removed. Samples are assigned random codes and stored under controlled conditions.</p>
                </div>

                <div className="bg-white rounded-xl border border-stone-200 p-5">
                  <h4 className="font-semibold text-stone-900 mb-2 flex items-center gap-2">
                    <iconify-icon icon="lucide:shuffle" width="18" className="text-[#D4AF37]"></iconify-icon>
                    Randomization
                  </h4>
                  <p className="text-sm text-stone-600">Sample presentation order is randomized for each panelist to prevent order bias. Control samples are interspersed to validate panel performance.</p>
                </div>

                <div className="bg-white rounded-xl border border-stone-200 p-5">
                  <h4 className="font-semibold text-stone-900 mb-2 flex items-center gap-2">
                    <iconify-icon icon="lucide:thermometer" width="18" className="text-[#D4AF37]"></iconify-icon>
                    Controlled Environment
                  </h4>
                  <p className="text-sm text-stone-600">Evaluations occur in ISO-standard sensory booths with neutral lighting, temperature (20-22°C), and humidity control to eliminate environmental variables.</p>
                </div>

                <div className="bg-white rounded-xl border border-stone-200 p-5">
                  <h4 className="font-semibold text-stone-900 mb-2 flex items-center gap-2">
                    <iconify-icon icon="lucide:lock" width="18" className="text-[#D4AF37]"></iconify-icon>
                    Isolation Protocol
                  </h4>
                  <p className="text-sm text-stone-600">Panelists evaluate independently without communication. Digital scoring systems prevent score visibility until all evaluations are complete.</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-4">
                <iconify-icon icon="lucide:shield-check" width="24" className="text-amber-600 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                <div>
                  <h4 className="font-semibold text-stone-900 mb-2">Chain of Custody</h4>
                  <p className="text-sm text-stone-600">
                    A documented chain of custody tracks every sample from receipt through evaluation, ensuring integrity and enabling traceability for quality assurance audits.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Scoring Criteria Breakdown */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center">
                <iconify-icon icon="lucide:clipboard-list" width="24" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h2 className="font-serif text-3xl text-stone-900">Scoring Criteria Breakdown</h2>
            </div>
            
            <div className="prose prose-stone max-w-none">
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Our 100-point scoring system evaluates products across multiple sensory dimensions with category-specific weighting.
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                  <div className="bg-[#2E4F3A] px-5 py-3 flex items-center justify-between">
                    <h4 className="font-semibold text-white">Appearance (10 points)</h4>
                    <span className="text-[#D4AF37] font-bold">10%</span>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-stone-600 mb-3">Visual clarity, color intensity, consistency, and presentation appeal.</p>
                    <div className="text-xs text-stone-500">
                      <strong>Evaluated:</strong> Clarity/turbidity, color accuracy to style, visual defects, uniformity
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                  <div className="bg-[#2E4F3A] px-5 py-3 flex items-center justify-between">
                    <h4 className="font-semibold text-white">Aroma/Bouquet (25 points)</h4>
                    <span className="text-[#D4AF37] font-bold">25%</span>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-stone-600 mb-3">Aromatic intensity, complexity, typicity, and absence of off-notes.</p>
                    <div className="text-xs text-stone-500">
                      <strong>Evaluated:</strong> Intensity, complexity, varietal/style accuracy, freshness, defects
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                  <div className="bg-[#2E4F3A] px-5 py-3 flex items-center justify-between">
                    <h4 className="font-semibold text-white">Flavor/Taste (35 points)</h4>
                    <span className="text-[#D4AF37] font-bold">35%</span>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-stone-600 mb-3">Primary taste dimensions, flavor depth, balance, and finish quality.</p>
                    <div className="text-xs text-stone-500">
                      <strong>Evaluated:</strong> Sweetness/saltiness/acidity/bitterness balance, flavor intensity, complexity, persistence, typicity
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                  <div className="bg-[#2E4F3A] px-5 py-3 flex items-center justify-between">
                    <h4 className="font-semibold text-white">Mouthfeel/Texture (15 points)</h4>
                    <span className="text-[#D4AF37] font-bold">15%</span>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-stone-600 mb-3">Body, viscosity, astringency, smoothness, and textural harmony.</p>
                    <div className="text-xs text-stone-500">
                      <strong>Evaluated:</strong> Body/weight, texture/creaminess, astringency, coating sensation, temperature interaction
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                  <div className="bg-[#2E4F3A] px-5 py-3 flex items-center justify-between">
                    <h4 className="font-semibold text-white">Overall Harmony & Finish (15 points)</h4>
                    <span className="text-[#D4AF37] font-bold">15%</span>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-stone-600 mb-3">Integration of all sensory elements and aftertaste quality.</p>
                    <div className="text-xs text-stone-500">
                      <strong>Evaluated:</strong> Balance across attributes, finish length/quality, overall impression, drinkability/eatability
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h4 className="font-semibold text-stone-900 mb-3 flex items-center gap-2">
                  <iconify-icon icon="lucide:calculator" width="20" className="text-blue-600"></iconify-icon>
                  Score Aggregation
                </h4>
                <p className="text-sm text-stone-600">
                  Final scores are calculated as the trimmed mean (removing highest and lowest outliers) of all panel member scores, ensuring statistical robustness and minimizing individual bias.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Technical/Lab Analysis */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#2E4F3A] rounded-xl flex items-center justify-center">
                <iconify-icon icon="lucide:flask-conical" width="24" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h2 className="font-serif text-3xl text-stone-900">Technical & Laboratory Analysis</h2>
            </div>
            
            <div className="prose prose-stone max-w-none">
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Sensory evaluation is complemented by laboratory testing to verify composition, purity, and adherence to category standards.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl border border-stone-200 p-5 text-center">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <iconify-icon icon="lucide:droplet" width="24" className="text-blue-600"></iconify-icon>
                  </div>
                  <h4 className="font-semibold text-stone-900 mb-2">Chemical Analysis</h4>
                  <p className="text-xs text-stone-600">Composition verification, contaminant screening, additive detection</p>
                </div>

                <div className="bg-white rounded-xl border border-stone-200 p-5 text-center">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <iconify-icon icon="lucide:activity" width="24" className="text-green-600"></iconify-icon>
                  </div>
                  <h4 className="font-semibold text-stone-900 mb-2">Microbiological Testing</h4>
                  <p className="text-xs text-stone-600">Safety screening for pathogens, spoilage organisms, shelf stability</p>
                </div>

                <div className="bg-white rounded-xl border border-stone-200 p-5 text-center">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <iconify-icon icon="lucide:shield-check" width="24" className="text-purple-600"></iconify-icon>
                  </div>
                  <h4 className="font-semibold text-stone-900 mb-2">Authenticity Verification</h4>
                  <p className="text-xs text-stone-600">Geographic markers, varietal confirmation, adulteration detection</p>
                </div>
              </div>

              <p className="text-stone-600 leading-relaxed">
                We partner with accredited third-party laboratories (ISO 17025 certified) to conduct all technical analyses. Lab results must align with sensory findings; significant discrepancies trigger additional investigation.
              </p>
            </div>
          </div>

          {/* 5. Conflict-of-Interest Policies */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center">
                <iconify-icon icon="lucide:scale" width="24" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h2 className="font-serif text-3xl text-stone-900">Conflict-of-Interest Policies</h2>
            </div>
            
            <div className="prose prose-stone max-w-none">
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Maintaining independence and impartiality is fundamental to our credibility.
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-xl border-l-4 border-[#2E4F3A] p-5">
                  <h4 className="font-semibold text-stone-900 mb-2">Zero Financial Ties</h4>
                  <p className="text-sm text-stone-600">Panelists and staff cannot hold financial interests in any producer under evaluation. Annual disclosure statements are required.</p>
                </div>

                <div className="bg-white rounded-xl border-l-4 border-[#2E4F3A] p-5">
                  <h4 className="font-semibold text-stone-900 mb-2">No Pay-for-Score</h4>
                  <p className="text-sm text-stone-600">Certification fees cover administrative and testing costs only. Scores cannot be purchased, upgraded, or influenced through additional payment.</p>
                </div>

                <div className="bg-white rounded-xl border-l-4 border-[#2E4F3A] p-5">
                  <h4 className="font-semibold text-stone-900 mb-2">Recusal Protocol</h4>
                  <p className="text-sm text-stone-600">Panelists must recuse themselves from evaluating any product where they have a personal or professional relationship with the producer.</p>
                </div>

                <div className="bg-white rounded-xl border-l-4 border-[#2E4F3A] p-5">
                  <h4 className="font-semibold text-stone-900 mb-2">Transparent Revenue Model</h4>
                  <p className="text-sm text-stone-600">Our funding comes from flat-rate evaluation fees, not commissions or sales percentages. We do not receive royalties from certified products.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Sample Handling & Anonymity */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#2E4F3A] rounded-xl flex items-center justify-center">
                <iconify-icon icon="lucide:package-check" width="24" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h2 className="font-serif text-3xl text-stone-900">Sample Handling & Anonymity</h2>
            </div>
            
            <div className="prose prose-stone max-w-none">
              <div className="bg-stone-50 rounded-xl border border-stone-200 p-6">
                <ol className="space-y-4 text-stone-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-[#D4AF37] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <div>
                      <strong>Receipt & Logging:</strong> Samples logged in secure tracking system with timestamp, condition notes, and temperature on arrival.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-[#D4AF37] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <div>
                      <strong>De-identification:</strong> All branding materials removed. Samples assigned alphanumeric codes with no producer-identifying information.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-[#D4AF37] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    <div>
                      <strong>Secure Storage:</strong> Climate-controlled facilities with restricted access. Temperature/humidity monitored continuously.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-[#D4AF37] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    <div>
                      <strong>Presentation Prep:</strong> Samples portioned into identical vessels (neutral glassware) at standardized serving size/temperature.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-[#D4AF37] text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                    <div>
                      <strong>Post-Evaluation Disposal:</strong> Remaining samples disposed per protocols. Producer identity revealed only after all scoring complete.
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* 7. Certificate Verification Process */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center">
                <iconify-icon icon="lucide:award" width="24" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <h2 className="font-serif text-3xl text-stone-900">Certificate Verification Process</h2>
            </div>
            
            <div className="prose prose-stone max-w-none">
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Every certificate is digitally verifiable and traceable to prevent fraud and misrepresentation.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-stone-200 p-6">
                  <h4 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                    <iconify-icon icon="lucide:fingerprint" width="20" className="text-[#2E4F3A]"></iconify-icon>
                    Security Features
                  </h4>
                  <ul className="space-y-2 text-sm text-stone-600">
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="lucide:check" width="14" className="text-[#D4AF37] mt-1 shrink-0"></iconify-icon>
                      <span>Unique certificate number (format: TC-YYYY-XXXX)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="lucide:check" width="14" className="text-[#D4AF37] mt-1 shrink-0"></iconify-icon>
                      <span>QR code linking to verification portal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="lucide:check" width="14" className="text-[#D4AF37] mt-1 shrink-0"></iconify-icon>
                      <span>Digital signatures from authorized personnel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="lucide:check" width="14" className="text-[#D4AF37] mt-1 shrink-0"></iconify-icon>
                      <span>Tamper-evident watermarks</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl border border-stone-200 p-6">
                  <h4 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                    <iconify-icon icon="lucide:search-check" width="20" className="text-[#2E4F3A]"></iconify-icon>
                    Public Verification
                  </h4>
                  <p className="text-sm text-stone-600 mb-4">Anyone can verify a certificate at tastecert.com/verify by entering:</p>
                  <ul className="space-y-2 text-sm text-stone-600">
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="lucide:check" width="14" className="text-[#D4AF37] mt-1 shrink-0"></iconify-icon>
                      <span>Certificate number, or</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="lucide:check" width="14" className="text-[#D4AF37] mt-1 shrink-0"></iconify-icon>
                      <span>Scanning the QR code</span>
                    </li>
                  </ul>
                  <p className="text-xs text-stone-500 mt-4">Returns: Product name, producer, score, certification date, validity period.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-6">Ready to Experience Our Transparent Process?</h2>
          <p className="text-lg text-stone-600 mb-10 max-w-2xl mx-auto">
            Submit your exceptional product for independent, blind evaluation by our expert panels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit" className="inline-flex items-center justify-center px-10 py-4 bg-[#D4AF37] hover:bg-[#b08d4b] text-white rounded-lg font-semibold text-lg transition-all shadow-lg">
              Start Your Submission
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-10 py-4 bg-white border-2 border-stone-300 hover:border-[#2E4F3A] text-stone-700 hover:text-[#2E4F3A] rounded-lg font-semibold text-lg transition-all">
              Ask Questions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

