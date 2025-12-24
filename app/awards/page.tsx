import Link from 'next/link';

export const metadata = {
  title: 'Awards | Tastecert',
  description: 'Celebrating the pinnacle of sensory perfection. The Tastecert Annual Awards recognize products that achieve the highest standards.',
  keywords: ['tastecert awards', 'food awards', 'quality awards', 'certification awards'],
  openGraph: {
    title: 'Awards - Tastecert',
    description: 'Celebrating the pinnacle of sensory perfection.',
    type: 'website',
  },
};

export default function AwardsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 mesh-bg border-b border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 mb-8 shadow-sm">
            <iconify-icon icon="lucide:sparkles" className="text-gold"></iconify-icon>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-600">2024 Winners Announced</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl text-[#1C1917] leading-[1.05] tracking-tight mb-8">
            Celebrating the pinnacle of<br/>sensory perfection.
          </h1>
          
          <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mx-auto mb-12">
            The Tastecert Annual Awards recognize products that achieve the highest standards of chemical purity and sommelier-graded complexity.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-stone-200/50 pt-10 max-w-3xl mx-auto">
            <div>
              <div className="font-serif text-3xl text-[#1C1917]">2,400+</div>
              <div className="text-xs font-medium uppercase tracking-wide text-stone-500 mt-1">Entries</div>
            </div>
            <div>
              <div className="font-serif text-3xl text-[#1C1917]">48</div>
              <div className="text-xs font-medium uppercase tracking-wide text-stone-500 mt-1">Gold Medals</div>
            </div>
            <div>
              <div className="font-serif text-3xl text-[#1C1917]">12</div>
              <div className="text-xs font-medium uppercase tracking-wide text-stone-500 mt-1">Countries</div>
            </div>
            <div>
              <div className="font-serif text-3xl text-[#1C1917]">$85M</div>
              <div className="text-xs font-medium uppercase tracking-wide text-stone-500 mt-1">Market Value</div>
            </div>
          </div>
        </div>
      </section>

      {/* Award Tiers */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl text-[#1C1917] tracking-tight mb-4">The Standards of Recognition</h2>
            <p className="text-stone-600">Our tiered system ensures that distinction is meaningful and data-backed.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Gold */}
            <div className="relative group p-8 rounded-xl border border-stone-200 bg-[#FDFBF7] hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold to-[#E5C07B] rounded-t-xl"></div>
              <div className="w-14 h-14 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-6 border border-gold/20">
                <iconify-icon icon="lucide:trophy" width="28" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-2xl text-[#1C1917]">Gold Standard</h3>
                <span className="text-sm font-mono text-gold font-medium">95-100 pts</span>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Reserved for products that exhibit flawless chemical composition and exceptional complexity in blind tastings. Less than 2% of entries achieve this mark.
              </p>
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-400">
                <iconify-icon icon="lucide:lock" width="12"></iconify-icon> Requires unanimous panel vote
              </div>
            </div>

            {/* Silver */}
            <div className="relative group p-8 rounded-xl border border-stone-200 bg-white hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-stone-400 to-stone-300 rounded-t-xl"></div>
              <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center mb-6 border border-stone-200">
                <iconify-icon icon="lucide:medal" width="28" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-2xl text-[#1C1917]">Silver Selection</h3>
                <span className="text-sm font-mono text-stone-500 font-medium">90-94 pts</span>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Products showing distinct character and technical excellence. A mark of superior quality that outperforms 80% of the market category.
              </p>
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-400">
                <iconify-icon icon="lucide:check-circle" width="12"></iconify-icon> Verified Pure Ingredients
              </div>
            </div>

            {/* Bronze */}
            <div className="relative group p-8 rounded-xl border border-stone-200 bg-white hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#A07050] to-[#8A5A40] rounded-t-xl"></div>
              <div className="w-14 h-14 rounded-full bg-[#A07050]/10 text-[#A07050] flex items-center justify-center mb-6 border border-[#A07050]/20">
                <iconify-icon icon="lucide:award" width="28" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-2xl text-[#1C1917]">Bronze Merit</h3>
                <span className="text-sm font-mono text-[#A07050] font-medium">85-89 pts</span>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Commendable examples of the style. These products meet all safety baselines and offer a clean, representative flavor profile.
              </p>
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-400">
                <iconify-icon icon="lucide:check-circle" width="12"></iconify-icon> No Artificial Additives
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Winners Gallery / List */}
      <section className="py-24 px-6 bg-[#FDFBF7] border-y border-stone-200 dot-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-sm font-medium text-olive mb-2 block">2024 Grand Prix</span>
              <h2 className="font-serif text-3xl text-[#1C1917] tracking-tight">Recent Laureates</h2>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button className="px-4 py-2 text-sm font-medium bg-[#1C1917] text-white rounded-lg">All Winners</button>
              <button className="px-4 py-2 text-sm font-medium bg-white border border-stone-200 text-stone-600 rounded-lg hover:border-stone-300">Filter by Category</button>
            </div>
          </div>

          {/* Winners Table */}
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 border-b border-stone-200">
                  <tr>
                    <th className="py-4 px-6 font-medium text-stone-500 w-16">Rank</th>
                    <th className="py-4 px-6 font-medium text-stone-500">Product</th>
                    <th className="py-4 px-6 font-medium text-stone-500">Category</th>
                    <th className="py-4 px-6 font-medium text-stone-500">Origin</th>
                    <th className="py-4 px-6 font-medium text-stone-500 text-right">Score</th>
                    <th className="py-4 px-6 font-medium text-stone-500 w-20"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {/* Winner 1 */}
                  <tr className="group hover:bg-stone-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-serif text-sm">1</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-serif text-lg text-[#1C1917] group-hover:text-olive transition-colors">Domaine de L'Ombre 2019</div>
                      <div className="text-xs text-stone-400">Vintage Pinot Noir</div>
                    </td>
                    <td className="py-4 px-6 text-stone-600">Fine Wine</td>
                    <td className="py-4 px-6 text-stone-600">Burgundy, France</td>
                    <td className="py-4 px-6 text-right font-mono font-medium text-[#1C1917]">98.5</td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-stone-400 hover:text-[#1C1917]"><iconify-icon icon="lucide:arrow-right" width="18"></iconify-icon></button>
                    </td>
                  </tr>

                  {/* Winner 2 */}
                  <tr className="group hover:bg-stone-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-serif text-sm">2</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-serif text-lg text-[#1C1917] group-hover:text-olive transition-colors">Kyoto Imperial Matcha</div>
                      <div className="text-xs text-stone-400">Ceremonial Grade</div>
                    </td>
                    <td className="py-4 px-6 text-stone-600">Tea & Infusions</td>
                    <td className="py-4 px-6 text-stone-600">Uji, Japan</td>
                    <td className="py-4 px-6 text-right font-mono font-medium text-[#1C1917]">97.2</td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-stone-400 hover:text-[#1C1917]"><iconify-icon icon="lucide:arrow-right" width="18"></iconify-icon></button>
                    </td>
                  </tr>

                  {/* Winner 3 */}
                  <tr className="group hover:bg-stone-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-serif text-sm">3</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-serif text-lg text-[#1C1917] group-hover:text-olive transition-colors">Olea Estate Reserve</div>
                      <div className="text-xs text-stone-400">Cold Pressed Extra Virgin</div>
                    </td>
                    <td className="py-4 px-6 text-stone-600">Olive Oil</td>
                    <td className="py-4 px-6 text-stone-600">Tuscany, Italy</td>
                    <td className="py-4 px-6 text-right font-mono font-medium text-[#1C1917]">96.8</td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-stone-400 hover:text-[#1C1917]"><iconify-icon icon="lucide:arrow-right" width="18"></iconify-icon></button>
                    </td>
                  </tr>

                  {/* Winner 4 (Silver) */}
                  <tr className="group hover:bg-stone-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-8 h-8 rounded-full bg-stone-300 text-white flex items-center justify-center font-serif text-sm">4</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-serif text-lg text-[#1C1917] group-hover:text-olive transition-colors">Highland Peat 12yr</div>
                      <div className="text-xs text-stone-400">Single Malt Scotch</div>
                    </td>
                    <td className="py-4 px-6 text-stone-600">Spirits</td>
                    <td className="py-4 px-6 text-stone-600">Scotland, UK</td>
                    <td className="py-4 px-6 text-right font-mono font-medium text-[#1C1917]">94.5</td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-stone-400 hover:text-[#1C1917]"><iconify-icon icon="lucide:arrow-right" width="18"></iconify-icon></button>
                    </td>
                  </tr>

                  {/* Winner 5 (Silver) */}
                  <tr className="group hover:bg-stone-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-8 h-8 rounded-full bg-stone-300 text-white flex items-center justify-center font-serif text-sm">5</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-serif text-lg text-[#1C1917] group-hover:text-olive transition-colors">Velvet Origin 70%</div>
                      <div className="text-xs text-stone-400">Single Origin Dark Chocolate</div>
                    </td>
                    <td className="py-4 px-6 text-stone-600">Confectionery</td>
                    <td className="py-4 px-6 text-stone-600">Quito, Ecuador</td>
                    <td className="py-4 px-6 text-right font-mono font-medium text-[#1C1917]">93.9</td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-stone-400 hover:text-[#1C1917]"><iconify-icon icon="lucide:arrow-right" width="18"></iconify-icon></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex justify-center">
              <Link href="/winners" className="text-sm font-medium text-stone-500 hover:text-[#1C1917] flex items-center gap-2 transition-colors">
                View all 2024 winners <iconify-icon icon="lucide:chevron-right" width="16"></iconify-icon>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories / Nomination Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl text-[#1C1917] tracking-tight mb-6">Open Categories</h2>
              <p className="text-stone-600 mb-8 leading-relaxed">
                We accept submissions across 14 distinct culinary verticals. Every submission undergoes the same rigorous GC-MS testing and double-blind panel review.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-stone-100 bg-stone-50 text-sm text-stone-700">
                  <iconify-icon icon="lucide:wine" className="text-olive"></iconify-icon> Wine & Spirits
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-stone-100 bg-stone-50 text-sm text-stone-700">
                  <iconify-icon icon="lucide:coffee" className="text-olive"></iconify-icon> Coffee & Tea
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-stone-100 bg-stone-50 text-sm text-stone-700">
                  <iconify-icon icon="lucide:droplet" className="text-olive"></iconify-icon> Oils & Vinegars
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-stone-100 bg-stone-50 text-sm text-stone-700">
                  <iconify-icon icon="lucide:cookie" className="text-olive"></iconify-icon> Confectionery
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-stone-100 bg-stone-50 text-sm text-stone-700">
                  <iconify-icon icon="lucide:carrot" className="text-olive"></iconify-icon> Preserves
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-stone-100 bg-stone-50 text-sm text-stone-700">
                  <iconify-icon icon="lucide:wheat" className="text-olive"></iconify-icon> Grains
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-stone-100">
                <Link href="/submit" className="text-gold font-medium text-sm flex items-center gap-2 hover:gap-3 transition-all">
                  Download submission guidelines <iconify-icon icon="lucide:arrow-right" width="16"></iconify-icon>
                </Link>
              </div>
            </div>

            {/* Judging Card */}
            <div className="relative rounded-2xl bg-[#1C1917] p-10 text-white overflow-hidden">
              {/* Decorative Abstract Shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-olive opacity-20 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold opacity-10 rounded-full blur-3xl -ml-16 -mb-16"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
                  <iconify-icon icon="lucide:scale" width="24" className="text-white"></iconify-icon>
                </div>
                <h3 className="font-serif text-2xl mb-4">Judged by Masters</h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-8">
                  Our panel consists of Master Sommeliers, Food Scientists, and Michelin-starred Chefs. Every product is evaluated without packaging or branding to ensure zero bias.
                </p>
                
                {/* Avatars */}
                <div className="flex items-center mb-8">
                  <div className="w-10 h-10 rounded-full bg-stone-300 border-2 border-[#1C1917] flex items-center justify-center text-[#1C1917] text-xs font-bold">JD</div>
                  <div className="w-10 h-10 rounded-full bg-stone-400 border-2 border-[#1C1917] -ml-3 flex items-center justify-center text-[#1C1917] text-xs font-bold">AS</div>
                  <div className="w-10 h-10 rounded-full bg-stone-500 border-2 border-[#1C1917] -ml-3 flex items-center justify-center text-[#1C1917] text-xs font-bold">MK</div>
                  <div className="w-10 h-10 rounded-full bg-olive border-2 border-[#1C1917] -ml-3 flex items-center justify-center text-white text-xs font-bold">+12</div>
                </div>

                <button className="w-full bg-white text-[#1C1917] py-3 rounded-lg text-sm font-medium hover:bg-stone-100 transition-colors">
                  Meet the Judges
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-stone-200 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-[#1C1917] tracking-tight mb-6">Claim your place in history.</h2>
          <p className="text-lg text-stone-600 font-light mb-10 max-w-xl mx-auto">
            Submissions for the 2025 cycle are now open. Early bird entries receive a complimentary pre-assessment report.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/submit" className="px-8 py-3 bg-[#1C1917] text-white rounded-lg text-sm font-medium hover:bg-stone-800 transition-all shadow-md w-full sm:w-auto">
              Submit Product
            </Link>
            <Link href="/winners" className="px-8 py-3 bg-white border border-stone-200 text-[#1C1917] rounded-lg text-sm font-medium hover:bg-stone-50 transition-colors w-full sm:w-auto">
              View 2024 Report
            </Link>
          </div>
          <p className="mt-6 text-xs text-stone-400">Deadline: October 15, 2024</p>
        </div>
      </section>
    </>
  );
}
