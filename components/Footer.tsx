import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-stone-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 bg-orange-600 rounded-full flex items-center justify-center text-white">
                <iconify-icon icon="lucide:award" width="16" height="16" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <span className="text-stone-900 font-semibold tracking-tight text-xl font-heading">Tastecert</span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
              Bringing transparency to the food industry through data science and sensory expertise.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-stone-900 mb-6 font-heading">Company</h4>
            <ul className="space-y-4 text-sm text-stone-500 font-medium">
              <li><Link href="/about" className="hover:text-orange-600 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-orange-600 transition-colors">Our Services</Link></li>
              <li><Link href="/awards" className="hover:text-orange-600 transition-colors">Awards Program</Link></li>
              <li><Link href="/contact" className="hover:text-orange-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-stone-900 mb-6 font-heading">Services</h4>
            <ul className="space-y-4 text-sm text-stone-500 font-medium">
              <li><Link href="/services#product-testing" className="hover:text-orange-600 transition-colors">Product Testing</Link></li>
              <li><Link href="/services#sensory-evaluation" className="hover:text-orange-600 transition-colors">Sensory Evaluation</Link></li>
              <li><Link href="/services#quality-scoring" className="hover:text-orange-600 transition-colors">Quality Scoring</Link></li>
              <li><Link href="/services#certification" className="hover:text-orange-600 transition-colors">Certification</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-stone-900 mb-6 font-heading">Resources</h4>
            <ul className="space-y-4 text-sm text-stone-500 font-medium">
              <li><Link href="/winners" className="hover:text-orange-600 transition-colors">Winners Gallery</Link></li>
              <li><Link href="/about#process" className="hover:text-orange-600 transition-colors">Our Process</Link></li>
              <li><Link href="/awards#criteria" className="hover:text-orange-600 transition-colors">Judging Criteria</Link></li>
              <li><Link href="/submit" className="hover:text-orange-600 transition-colors">Submit Product</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-stone-900 mb-6 font-heading">Contact</h4>
            <ul className="space-y-4 text-sm text-stone-500 font-medium">
              <li className="flex items-center gap-2">
                <iconify-icon icon="lucide:mail" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon> 
                hello@tastecert.com
              </li>
              <li className="flex items-center gap-2">
                <iconify-icon icon="lucide:phone" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon> 
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <iconify-icon icon="lucide:map-pin" width="14" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon> 
                New York, NY
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-400 font-medium">© {currentYear} Tastecert. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-stone-500">
            <Link href="/privacy" className="hover:text-orange-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-orange-600 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-orange-600 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

