import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Tastecert',
  description: 'The rules and guidelines for using our platform and services. Legal terms and conditions.',
  keywords: ['terms of service', 'terms and conditions', 'user agreement', 'legal terms', 'service terms'],
  openGraph: {
    title: 'Terms of Service - Tastecert',
    description: 'Legal terms and conditions for using Tastecert services.',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-stone-400 mb-6">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <iconify-icon icon="lucide:chevron-right" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            <span className="text-stone-600">Terms of Service</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mb-4 font-heading">Terms of Service</h1>
          <p className="text-lg text-stone-500">The rules and guidelines for using our platform and services.</p>
          
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-stone-100">
            <div className="flex items-center gap-2 text-sm text-stone-400">
              <iconify-icon icon="lucide:calendar" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              <span>Effective: January 15, 2024</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-400">
              <iconify-icon icon="lucide:clock" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              <span>15 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-stone-100 p-6">
            <h2 className="text-sm font-semibold text-stone-900 mb-4 font-heading flex items-center gap-2">
              <iconify-icon icon="lucide:list" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties} className="text-orange-600"></iconify-icon>
              Table of Contents
            </h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <a href="#acceptance" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">1. Acceptance of Terms</a>
              <a href="#services" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">2. Description of Services</a>
              <a href="#accounts" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">3. User Accounts</a>
              <a href="#submissions" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">4. Product Submissions</a>
              <a href="#intellectual-property" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">5. Intellectual Property</a>
              <a href="#confidentiality" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">6. Confidentiality</a>
              <a href="#payment" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">7. Payment Terms</a>
              <a href="#prohibited" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">8. Prohibited Uses</a>
              <a href="#disclaimers" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">9. Disclaimers</a>
              <a href="#limitation" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">10. Limitation of Liability</a>
              <a href="#indemnification" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">11. Indemnification</a>
              <a href="#termination" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">12. Termination</a>
              <a href="#governing-law" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">13. Governing Law</a>
              <a href="#changes-terms" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">14. Changes to Terms</a>
              <a href="#contact-terms" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">15. Contact Information</a>
            </nav>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-stone max-w-none">
            
            {/* Introduction */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <iconify-icon icon="lucide:file-text" width="20" className="text-blue-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900 mb-2 font-heading">Agreement to Terms</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    These Terms of Service ("Terms") constitute a legally binding agreement between you and Tastecert, Inc. ("Tastecert," "we," "us," or "our"). By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 1 */}
            <div id="acceptance" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">1</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Acceptance of Terms</h2>
              </div>
              
              <p className="text-stone-600 leading-relaxed mb-4">
                By accessing, browsing, or using the Tastecert website, platform, or any of our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, along with our Privacy Policy.
              </p>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
                <iconify-icon icon="lucide:alert-triangle" width="20" className="text-amber-600 shrink-0 mt-0.5" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 font-heading">Important Notice</h4>
                  <p className="text-sm text-stone-600 mt-1">You must be at least 18 years old and have the legal authority to enter into these Terms on behalf of yourself or your organization.</p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div id="services" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">2</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Description of Services</h2>
              </div>
              
              <p className="text-stone-600 leading-relaxed mb-6">
                Tastecert provides professional certification and evaluation services for specialty food and beverage products. Our services include:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-stone-100 p-5">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center mb-3">
                    <iconify-icon icon="lucide:flask-conical" width="20" className="text-orange-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <h4 className="text-sm font-semibold text-stone-900 mb-2 font-heading">Sensory Analysis</h4>
                  <p className="text-xs text-stone-500">Professional evaluation by certified expert panels.</p>
                </div>

                <div className="bg-white rounded-xl border border-stone-100 p-5">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                    <iconify-icon icon="lucide:bar-chart-3" width="20" className="text-blue-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <h4 className="text-sm font-semibold text-stone-900 mb-2 font-heading">Data Analytics</h4>
                  <p className="text-xs text-stone-500">Comprehensive reports with statistical analysis and insights.</p>
                </div>

                <div className="bg-white rounded-xl border border-stone-100 p-5">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center mb-3">
                    <iconify-icon icon="lucide:award" width="20" className="text-green-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <h4 className="text-sm font-semibold text-stone-900 mb-2 font-heading">Certification</h4>
                  <p className="text-xs text-stone-500">Prestigious quality certifications and awards.</p>
                </div>

                <div className="bg-white rounded-xl border border-stone-100 p-5">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mb-3">
                    <iconify-icon icon="lucide:lightbulb" width="20" className="text-purple-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <h4 className="text-sm font-semibold text-stone-900 mb-2 font-heading">Consulting</h4>
                  <p className="text-xs text-stone-500">Expert guidance on product development and optimization.</p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div id="accounts" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">3</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">User Accounts</h2>
              </div>
              
              <p className="text-stone-600 leading-relaxed mb-6">
                To access certain features of our services, you may be required to create an account. You agree to:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-stone-100">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <iconify-icon icon="lucide:check" width="14" className="text-green-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <p className="text-sm text-stone-600">Provide accurate, current, and complete information during registration</p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-stone-100">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <iconify-icon icon="lucide:check" width="14" className="text-green-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <p className="text-sm text-stone-600">Maintain and promptly update your account information</p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-stone-100">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <iconify-icon icon="lucide:check" width="14" className="text-green-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <p className="text-sm text-stone-600">Maintain the security and confidentiality of your login credentials</p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-stone-100">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <iconify-icon icon="lucide:check" width="14" className="text-green-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <p className="text-sm text-stone-600">Accept responsibility for all activities that occur under your account</p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-stone-100">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <iconify-icon icon="lucide:check" width="14" className="text-green-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <p className="text-sm text-stone-600">Notify us immediately of any unauthorized use of your account</p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div id="submissions" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">4</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Product Submissions</h2>
              </div>
              
              <p className="text-stone-600 leading-relaxed mb-6">
                When submitting products for evaluation, you represent and warrant that:
              </p>

              <div className="bg-white rounded-xl border border-stone-100 p-5 mb-4">
                <h4 className="text-sm font-semibold text-stone-900 mb-3 font-heading flex items-center gap-2">
                  <iconify-icon icon="lucide:package" width="16" className="text-orange-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  Product Requirements
                </h4>
                <ul className="text-sm text-stone-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    You have the legal right to submit the product for evaluation
                  </li>
                  <li className="flex items-start gap-2">
                    <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    The product is safe for human consumption and complies with applicable food safety regulations
                  </li>
                  <li className="flex items-start gap-2">
                    <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    All provided information about the product is accurate and complete
                  </li>
                  <li className="flex items-start gap-2">
                    <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    You have disclosed all known allergens and potential hazards
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3">
                <iconify-icon icon="lucide:alert-circle" width="20" className="text-red-600 shrink-0 mt-0.5" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 font-heading">Sample Handling</h4>
                  <p className="text-sm text-stone-600 mt-1">Submitted samples will not be returned. Tastecert is not responsible for samples damaged during shipping or storage beyond our control.</p>
                </div>
              </div>
            </div>

            {/* Remaining sections - summarized for brevity */}
            <div id="intellectual-property" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">5</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Intellectual Property</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                All content, features, and functionality of our services are owned by Tastecert and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </div>

            <div id="confidentiality" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">6</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Confidentiality</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                We will maintain the confidentiality of your product information and trade secrets in accordance with industry standards and our confidentiality agreements.
              </p>
            </div>

            <div id="payment" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">7</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Payment Terms</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                All fees must be paid in accordance with the pricing terms presented at the time of service selection. Payments are non-refundable except as required by law.
              </p>
            </div>

            <div id="prohibited" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">8</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Prohibited Uses</h2>
              </div>
              <p className="text-stone-600 leading-relaxed mb-4">
                You may not use our services for any unlawful purpose or in any way that could damage, disable, or impair our platform.
              </p>
            </div>

            <div id="disclaimers" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">9</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Disclaimers</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Our services are provided "as is" and "as available" without warranties of any kind, either express or implied.
              </p>
            </div>

            <div id="limitation" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">10</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Limitation of Liability</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                To the maximum extent permitted by law, Tastecert shall not be liable for any indirect, incidental, special, or consequential damages.
              </p>
            </div>

            <div id="indemnification" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">11</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Indemnification</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                You agree to indemnify and hold harmless Tastecert from any claims arising from your use of our services or violation of these Terms.
              </p>
            </div>

            <div id="termination" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">12</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Termination</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                We may terminate or suspend your access to our services at any time, without prior notice, for conduct that violates these Terms.
              </p>
            </div>

            <div id="governing-law" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">13</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Governing Law</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law principles.
              </p>
            </div>

            <div id="changes-terms" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">14</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Changes to Terms</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will provide notice of material changes by updating the "Effective" date.
              </p>
            </div>

            <div id="contact-terms" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">15</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Contact Information</h2>
              </div>
              <p className="text-stone-600 leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-white rounded-xl border border-stone-100 p-5">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <iconify-icon icon="lucide:mail" width="16" className="text-orange-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    <a href="mailto:legal@tastecert.com" className="text-orange-600 hover:underline">legal@tastecert.com</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <iconify-icon icon="lucide:phone" width="16" className="text-orange-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    <span className="text-stone-600">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <iconify-icon icon="lucide:map-pin" width="16" className="text-orange-600 mt-0.5" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    <span className="text-stone-600">Tastecert, Inc.<br />New York, NY</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

