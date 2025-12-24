import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FDFBF7] text-stone-600 pt-16 pb-8 px-6 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1: Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center text-white shadow-sm">
                <iconify-icon icon="lucide:award" width="16"></iconify-icon>
              </div>
              <span className="font-serif text-xl text-stone-900 font-medium tracking-tight">Tastecert</span>
            </div>
            <p className="text-sm leading-relaxed text-stone-500">
              The global authority on traditional product quality certification. Independent, transparent, and rigorously scientific since 2012.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors">
                <iconify-icon icon="lucide:twitter" width="16"></iconify-icon>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors">
                <iconify-icon icon="lucide:linkedin" width="16"></iconify-icon>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors">
                <iconify-icon icon="lucide:instagram" width="16"></iconify-icon>
              </a>
            </div>
          </div>

          {/* Col 2: Company */}
          <div>
            <h4 className="font-semibold text-stone-900 mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-stone-500 hover:text-olive transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-stone-500 hover:text-olive transition-colors">Our Methodology</Link></li>
              <li><Link href="/about" className="text-stone-500 hover:text-olive transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-stone-500 hover:text-olive transition-colors">Press & Media</Link></li>
              <li><Link href="/contact" className="text-stone-500 hover:text-olive transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="font-semibold text-stone-900 mb-6">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/winners" className="text-stone-500 hover:text-olive transition-colors">Verification Lookup</Link></li>
              <li><Link href="/submit" className="text-stone-500 hover:text-olive transition-colors">Producer Guidelines</Link></li>
              <li><Link href="/winners" className="text-stone-500 hover:text-olive transition-colors">Success Stories</Link></li>
              <li><Link href="/contact" className="text-stone-500 hover:text-olive transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="text-stone-500 hover:text-olive transition-colors">Retailer Partners</Link></li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div>
            <h4 className="font-semibold text-stone-900 mb-6">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="text-stone-500 hover:text-olive transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-stone-500 hover:text-olive transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-stone-500 hover:text-olive transition-colors">Cookie Policy</Link></li>
              <li><Link href="/contact" className="text-stone-500 hover:text-olive transition-colors">Dispute Resolution</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-400">
            © {currentYear} Tastecert International Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-xs text-stone-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
