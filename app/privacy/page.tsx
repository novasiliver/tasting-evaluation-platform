import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Tastecert',
  description: 'How we collect, use, and protect your information. Our commitment to privacy and data security.',
  keywords: ['privacy policy', 'data protection', 'personal information', 'GDPR', 'privacy rights'],
  openGraph: {
    title: 'Privacy Policy - Tastecert',
    description: 'Learn how Tastecert protects your personal information and privacy.',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-stone-400 mb-6">
            <Link href="/" className="hover:text-olive-600 transition-colors">Home</Link>
            <iconify-icon icon="lucide:chevron-right" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            <span className="text-stone-600">Privacy Policy</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mb-4 font-heading">Privacy Policy</h1>
          <p className="text-lg text-stone-500">How we collect, use, and protect your information.</p>
          
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-stone-100">
            <div className="flex items-center gap-2 text-sm text-stone-400">
              <iconify-icon icon="lucide:calendar" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              <span>Last updated: January 15, 2024</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-400">
              <iconify-icon icon="lucide:clock" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              <span>10 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-stone-100 p-6">
            <h2 className="text-sm font-semibold text-stone-900 mb-4 font-heading flex items-center gap-2">
              <iconify-icon icon="lucide:list" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties} className="text-olive-600"></iconify-icon>
              Table of Contents
            </h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <a href="#information-we-collect" className="text-sm text-stone-500 hover:text-olive-600 transition-colors py-1">1. Information We Collect</a>
              <a href="#how-we-use" className="text-sm text-stone-500 hover:text-olive-600 transition-colors py-1">2. How We Use Your Information</a>
              <a href="#information-sharing" className="text-sm text-stone-500 hover:text-olive-600 transition-colors py-1">3. Information Sharing</a>
              <a href="#data-retention" className="text-sm text-stone-500 hover:text-olive-600 transition-colors py-1">4. Data Retention</a>
              <a href="#your-rights" className="text-sm text-stone-500 hover:text-olive-600 transition-colors py-1">5. Your Rights</a>
              <a href="#cookies" className="text-sm text-stone-500 hover:text-olive-600 transition-colors py-1">6. Cookies & Tracking</a>
              <a href="#security" className="text-sm text-stone-500 hover:text-olive-600 transition-colors py-1">7. Security</a>
              <a href="#international" className="text-sm text-stone-500 hover:text-olive-600 transition-colors py-1">8. International Transfers</a>
              <a href="#children" className="text-sm text-stone-500 hover:text-olive-600 transition-colors py-1">9. Children's Privacy</a>
              <a href="#changes" className="text-sm text-stone-500 hover:text-olive-600 transition-colors py-1">10. Changes to This Policy</a>
              <a href="#contact" className="text-sm text-stone-500 hover:text-olive-600 transition-colors py-1">11. Contact Us</a>
            </nav>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-stone max-w-none">
            
            {/* Introduction */}
            <div className="bg-olive-50 border border-olive-100 rounded-2xl p-6 mb-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center shrink-0">
                  <iconify-icon icon="lucide:shield" width="20" className="text-olive-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900 mb-2 font-heading">Our Commitment to Privacy</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    At Tastecert, operated by NETSELINE LTD ("Tastecert," "Company," "we," "us," or "our"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 1 */}
            <div id="information-we-collect" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">1</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Information We Collect</h2>
              </div>
              
              <p className="text-stone-600 leading-relaxed mb-6">
                We collect information that you provide directly to us, information we obtain automatically when you use our services, and information from third-party sources.
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-stone-100 p-5">
                  <h4 className="text-sm font-semibold text-stone-900 mb-2 font-heading flex items-center gap-2">
                    <iconify-icon icon="lucide:user" width="16" className="text-olive-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    Personal Information
                  </h4>
                  <ul className="text-sm text-stone-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      Name, email address, and phone number
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      Company name and job title
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      Billing and shipping addresses
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      Payment information (processed securely via third-party providers)
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl border border-stone-100 p-5">
                  <h4 className="text-sm font-semibold text-stone-900 mb-2 font-heading flex items-center gap-2">
                    <iconify-icon icon="lucide:flask-conical" width="16" className="text-blue-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    Product & Sample Information
                  </h4>
                  <ul className="text-sm text-stone-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      Product details submitted for analysis
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      Ingredient lists and formulation data
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      Test results and sensory evaluation data
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl border border-stone-100 p-5">
                  <h4 className="text-sm font-semibold text-stone-900 mb-2 font-heading flex items-center gap-2">
                    <iconify-icon icon="lucide:monitor" width="16" className="text-purple-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    Automatically Collected Information
                  </h4>
                  <ul className="text-sm text-stone-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      Device information (browser type, operating system)
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      IP address and approximate location
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      Usage data and interaction patterns
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div id="how-we-use" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">2</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">How We Use Your Information</h2>
              </div>
              
              <p className="text-stone-600 leading-relaxed mb-6">
                We use the information we collect for various purposes, including:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-stone-100">
                  <div className="w-8 h-8 rounded-lg bg-olive-50 flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:package" width="16" className="text-olive-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 font-heading">Service Delivery</h4>
                    <p className="text-xs text-stone-500 mt-1">Process samples, conduct analyses, and deliver reports</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-stone-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:message-circle" width="16" className="text-blue-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 font-heading">Communication</h4>
                    <p className="text-xs text-stone-500 mt-1">Send updates, respond to inquiries, and provide support</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-stone-100">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:trending-up" width="16" className="text-green-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 font-heading">Improvement</h4>
                    <p className="text-xs text-stone-500 mt-1">Analyze usage patterns to enhance our services</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-stone-100">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:shield-check" width="16" className="text-purple-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 font-heading">Compliance</h4>
                    <p className="text-xs text-stone-500 mt-1">Meet legal obligations and enforce our terms</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div id="information-sharing" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">3</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Information Sharing</h2>
              </div>
              
              <p className="text-stone-600 leading-relaxed mb-6">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-stone-100">
                  <iconify-icon icon="lucide:building" width="20" className="text-stone-400 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 font-heading">Service Providers</h4>
                    <p className="text-sm text-stone-500 mt-1">Third-party vendors who assist with payment processing, data analytics, email delivery, hosting, and customer service.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-stone-100">
                  <iconify-icon icon="lucide:scale" width="20" className="text-stone-400 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 font-heading">Legal Requirements</h4>
                    <p className="text-sm text-stone-500 mt-1">When required by law, subpoena, or other legal process, or to protect our rights, privacy, safety, or property.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-stone-100">
                  <iconify-icon icon="lucide:git-merge" width="20" className="text-stone-400 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 font-heading">Business Transfers</h4>
                    <p className="text-sm text-stone-500 mt-1">In connection with a merger, acquisition, or sale of all or a portion of our assets.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-stone-100">
                  <iconify-icon icon="lucide:check-circle" width="20" className="text-stone-400 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 font-heading">With Your Consent</h4>
                    <p className="text-sm text-stone-500 mt-1">When you have given us explicit permission to share your information.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Remaining sections summary */}
            <div id="data-retention" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">4</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Data Retention</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. After this period, we securely delete or anonymize your data.
              </p>
            </div>

            <div id="your-rights" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">5</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Your Rights</h2>
              </div>
              <p className="text-stone-600 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="text-sm text-stone-600 space-y-2">
                <li className="flex items-start gap-2">
                  <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  The right to access and receive a copy of your personal data
                </li>
                <li className="flex items-start gap-2">
                  <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  The right to rectify inaccurate personal data
                </li>
                <li className="flex items-start gap-2">
                  <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  The right to request deletion of your personal data
                </li>
                <li className="flex items-start gap-2">
                  <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  The right to object to or restrict certain processing
                </li>
              </ul>
            </div>

            <div id="cookies" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">6</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Cookies & Tracking</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                We use cookies and similar tracking technologies to collect information about your browsing activities. For more details, please see our <Link href="/cookies" className="text-olive-600 hover:underline">Cookie Policy</Link>.
              </p>
            </div>

            <div id="security" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">7</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Security</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, or misuse. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div id="international" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">8</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">International Transfers</h2>
              </div>
              <p className="text-stone-600 leading-relaxed mb-4">
                Your information may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. NETSELINE LTD operates internationally and takes appropriate measures to protect your data.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                <iconify-icon icon="lucide:building-2" width="20" className="text-blue-600 shrink-0 mt-0.5" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                <p className="text-sm text-stone-600">
                  <strong>Data Controller:</strong> NETSELINE LTD, operating as Tastecert, is the data controller responsible for your personal information.
                </p>
              </div>
            </div>

            <div id="children" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">9</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Children's Privacy</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18.
              </p>
            </div>

            <div id="changes" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">10</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Changes to This Policy</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>

            <div id="contact" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">11</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Contact Us</h2>
              </div>
              <p className="text-stone-600 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-white rounded-xl border border-stone-100 p-5">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <iconify-icon icon="lucide:mail" width="16" className="text-olive-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    <a href="mailto:privacy@tastecert.com" className="text-olive-600 hover:underline">privacy@tastecert.com</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <iconify-icon icon="lucide:phone" width="16" className="text-olive-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    <span className="text-stone-600">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <iconify-icon icon="lucide:map-pin" width="16" className="text-olive-600 mt-0.5" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    <span className="text-stone-600">NETSELINE LTD (Tastecert)<br />Company Registration Required</span>
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

