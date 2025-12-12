import Link from 'next/link';

export const metadata = {
  title: 'Cookie Policy | Tastecert',
  description: 'Understanding how we use cookies and similar technologies on our platform. Manage your cookie preferences.',
  keywords: ['cookie policy', 'cookies', 'tracking', 'web analytics', 'privacy preferences'],
  openGraph: {
    title: 'Cookie Policy - Tastecert',
    description: 'Learn about how Tastecert uses cookies and similar technologies.',
    type: 'website',
  },
};

export default function CookiesPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-stone-400 mb-6">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <iconify-icon icon="lucide:chevron-right" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            <span className="text-stone-600">Cookie Policy</span>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center">
              <iconify-icon icon="lucide:cookie" width="24" className="text-amber-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight font-heading">Cookie Policy</h1>
          </div>
          <p className="text-lg text-stone-500">Understanding how we use cookies and similar technologies on our platform.</p>
          
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-stone-100">
            <div className="flex items-center gap-2 text-sm text-stone-400">
              <iconify-icon icon="lucide:calendar" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              <span>Last updated: January 15, 2024</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-400">
              <iconify-icon icon="lucide:clock" width="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              <span>8 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <iconify-icon icon="lucide:settings-2" width="20" className="text-amber-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900 mb-1 font-heading">Manage Your Cookie Preferences</h3>
                  <p className="text-sm text-stone-500">You can customize which cookies you allow at any time.</p>
                </div>
              </div>
              <button className="px-5 py-2.5 bg-stone-900 text-white text-sm font-semibold rounded-full hover:bg-stone-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-stone-900/20 whitespace-nowrap">
                Cookie Settings
              </button>
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
              <a href="#what-are-cookies" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">1. What Are Cookies?</a>
              <a href="#why-we-use" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">2. Why We Use Cookies</a>
              <a href="#types-of-cookies" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">3. Types of Cookies We Use</a>
              <a href="#third-party" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">4. Third-Party Cookies</a>
              <a href="#cookie-duration" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">5. Cookie Duration</a>
              <a href="#managing-cookies" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">6. Managing Cookies</a>
              <a href="#browser-settings" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">7. Browser Settings</a>
              <a href="#cookie-updates" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">8. Updates to This Policy</a>
              <a href="#contact-cookies" className="text-sm text-stone-500 hover:text-orange-600 transition-colors py-1">9. Contact Us</a>
            </nav>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-stone max-w-none">
            
            {/* Section 1 */}
            <div id="what-are-cookies" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">1</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">What Are Cookies?</h2>
              </div>
              
              <p className="text-stone-600 leading-relaxed mb-6">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-stone-100 p-5">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                    <iconify-icon icon="lucide:file-text" width="20" className="text-blue-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <h4 className="text-sm font-semibold text-stone-900 mb-2 font-heading">Small Data Files</h4>
                  <p className="text-xs text-stone-500">Typically a few kilobytes in size, containing simple text information.</p>
                </div>

                <div className="bg-white rounded-xl border border-stone-100 p-5">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center mb-3">
                    <iconify-icon icon="lucide:hard-drive" width="20" className="text-green-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <h4 className="text-sm font-semibold text-stone-900 mb-2 font-heading">Stored Locally</h4>
                  <p className="text-xs text-stone-500">Saved on your device's browser storage for later retrieval.</p>
                </div>

                <div className="bg-white rounded-xl border border-stone-100 p-5">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mb-3">
                    <iconify-icon icon="lucide:refresh-cw" width="20" className="text-purple-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <h4 className="text-sm font-semibold text-stone-900 mb-2 font-heading">Sent Back</h4>
                  <p className="text-xs text-stone-500">Transmitted to our servers each time you revisit our site.</p>
                </div>

                <div className="bg-white rounded-xl border border-stone-100 p-5">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center mb-3">
                    <iconify-icon icon="lucide:user" width="20" className="text-orange-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <h4 className="text-sm font-semibold text-stone-900 mb-2 font-heading">Remember You</h4>
                  <p className="text-xs text-stone-500">Help us recognize you and remember your preferences.</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-6 flex gap-3">
                <iconify-icon icon="lucide:info" width="20" className="text-blue-600 shrink-0 mt-0.5" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 font-heading">Similar Technologies</h4>
                  <p className="text-sm text-stone-600 mt-1">This policy also covers similar technologies like web beacons, pixels, local storage, and device fingerprinting.</p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div id="why-we-use" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">2</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Why We Use Cookies</h2>
              </div>
              
              <p className="text-stone-600 leading-relaxed mb-6">
                We use cookies for several important purposes to enhance your experience on our platform:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-stone-100">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:check-circle" width="20" className="text-green-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 font-heading">Essential Functionality</h4>
                    <p className="text-sm text-stone-500 mt-1">Enable core features like secure login, shopping cart, and form submissions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-stone-100">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:sliders" width="20" className="text-blue-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 font-heading">Personalization</h4>
                    <p className="text-sm text-stone-500 mt-1">Remember your preferences, language settings, and customizations.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-stone-100">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:bar-chart-2" width="20" className="text-purple-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 font-heading">Analytics & Performance</h4>
                    <p className="text-sm text-stone-500 mt-1">Understand how visitors use our site to improve performance and content.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-stone-100">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                    <iconify-icon icon="lucide:megaphone" width="20" className="text-orange-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 font-heading">Marketing & Advertising</h4>
                    <p className="text-sm text-stone-500 mt-1">Deliver relevant ads and measure the effectiveness of our campaigns.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 - Types of Cookies (summarized) */}
            <div id="types-of-cookies" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">3</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Types of Cookies We Use</h2>
              </div>
              
              <p className="text-stone-600 leading-relaxed mb-6">
                We categorize the cookies on our platform into four main types:
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-stone-100 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                        <iconify-icon icon="lucide:shield-check" width="18" className="text-green-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      </div>
                      <h4 className="text-sm font-semibold text-stone-900 font-heading">Essential Cookies</h4>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Required</span>
                  </div>
                  <p className="text-sm text-stone-600">
                    Necessary for the website to function. Cannot be switched off.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-stone-100 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <iconify-icon icon="lucide:sliders" width="18" className="text-blue-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </div>
                    <h4 className="text-sm font-semibold text-stone-900 font-heading">Functional Cookies</h4>
                  </div>
                  <p className="text-sm text-stone-600">
                    Enable personalized features and remember your preferences.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-stone-100 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <iconify-icon icon="lucide:bar-chart-2" width="18" className="text-purple-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </div>
                    <h4 className="text-sm font-semibold text-stone-900 font-heading">Analytics Cookies</h4>
                  </div>
                  <p className="text-sm text-stone-600">
                    Help us understand how visitors interact with our website.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-stone-100 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                      <iconify-icon icon="lucide:megaphone" width="18" className="text-orange-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </div>
                    <h4 className="text-sm font-semibold text-stone-900 font-heading">Marketing Cookies</h4>
                  </div>
                  <p className="text-sm text-stone-600">
                    Track visitors across websites to display relevant advertisements.
                  </p>
                </div>
              </div>
            </div>

            {/* Remaining sections - summarized */}
            <div id="third-party" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">4</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Third-Party Cookies</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Some cookies may be placed by third-party services that appear on our pages, such as analytics providers and advertising networks.
              </p>
            </div>

            <div id="cookie-duration" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">5</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Cookie Duration</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Cookies can be either session cookies (deleted when you close your browser) or persistent cookies (stored for a set period).
              </p>
            </div>

            <div id="managing-cookies" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">6</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Managing Cookies</h2>
              </div>
              <p className="text-stone-600 leading-relaxed mb-4">
                You can control and manage cookies in various ways:
              </p>
              <ul className="text-sm text-stone-600 space-y-2">
                <li className="flex items-start gap-2">
                  <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  Use our Cookie Settings tool to adjust your preferences
                </li>
                <li className="flex items-start gap-2">
                  <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  Configure your browser settings to block or delete cookies
                </li>
                <li className="flex items-start gap-2">
                  <iconify-icon icon="lucide:check" width="16" className="text-green-600 mt-0.5 shrink-0" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  Use browser extensions that manage cookies automatically
                </li>
              </ul>
            </div>

            <div id="browser-settings" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">7</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Browser Settings</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Most web browsers allow you to manage cookies through their settings. Please note that disabling certain cookies may affect the functionality of our website.
              </p>
            </div>

            <div id="cookie-updates" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">8</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Updates to This Policy</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal or regulatory reasons.
              </p>
            </div>

            <div id="contact-cookies" className="mb-12 scroll-mt-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-semibold">9</div>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight font-heading">Contact Us</h2>
              </div>
              <p className="text-stone-600 leading-relaxed mb-4">
                If you have questions about our use of cookies, please contact us:
              </p>
              <div className="bg-white rounded-xl border border-stone-100 p-5">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <iconify-icon icon="lucide:mail" width="16" className="text-orange-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    <a href="mailto:privacy@tastecert.com" className="text-orange-600 hover:underline">privacy@tastecert.com</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <iconify-icon icon="lucide:phone" width="16" className="text-orange-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    <span className="text-stone-600">+1 (555) 123-4567</span>
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

