import Link from 'next/link';
import { Logo } from './Logo';

export function SiteFooter() {
  return (
    <footer className="bg-[#1C2333] text-slate-400">
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3">
              <Logo variant="dark" size="sm" />
            </div>
            <p className="text-sm leading-relaxed">
              AI contract analysis for everyone. Free, private, no login needed.
            </p>
          </div>

          {/* Tools */}
          <div>
            <p className="font-semibold text-white mb-3 text-sm">Tools</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#upload-section" className="hover:text-white transition-colors">Analyze</Link></li>
              <li><Link href="/contract-types" className="hover:text-white transition-colors">Contract Types</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Templates</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Contract Types */}
          <div>
            <p className="font-semibold text-white mb-3 text-sm">Contract Types</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/analyze/rental-agreement" className="hover:text-white transition-colors">Rental Agreement</Link></li>
              <li><Link href="/analyze/employment-contract" className="hover:text-white transition-colors">Employment Contract</Link></li>
              <li><Link href="/analyze/nda" className="hover:text-white transition-colors">NDA</Link></li>
              <li><Link href="/analyze/real-estate-aps" className="hover:text-white transition-colors">Real Estate APS</Link></li>
              <li><Link href="/analyze/service-agreement" className="hover:text-white transition-colors">Service Agreement</Link></li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <p className="font-semibold text-white mb-3 text-sm">Contact & Legal</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@contractchecked.com" className="hover:text-white transition-colors">
                  support@contractchecked.com
                </a>
              </li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs">
          &copy; {new Date().getFullYear()} Contract Checked. AI-powered contract analysis. Not legal advice.
        </div>
      </div>
    </footer>
  );
}
