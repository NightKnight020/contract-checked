import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Home, Briefcase, Lock, ShoppingBag, ClipboardList,
  UserCheck, Users, Wrench, Building, MapPin,
  ArrowRight, FileText, Search,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Contract Analysis by Type | Contract Checked',
  description: 'Choose your contract type for specialized analysis. Free, instant, no login required. Rental agreements, employment contracts, NDAs, and more.',
  keywords: [
    'contract analysis by type', 'free contract review', 'rental agreement analysis',
    'employment contract review', 'NDA analysis', 'purchase agreement review',
    'service agreement check', 'contract types',
  ],
};

const CONTRACT_TYPES = [
  {
    slug: 'rental-agreement',
    Icon: Home,
    title: 'Rental & Lease Agreements',
    description: 'Understand tenant and landlord rights, security deposit terms, and early termination clauses before you sign.',
  },
  {
    slug: 'employment-contract',
    Icon: Briefcase,
    title: 'Employment Contracts',
    description: 'Review compensation, non-competes, IP ownership, and termination clauses in your job offer or employment agreement.',
  },
  {
    slug: 'nda',
    Icon: Lock,
    title: 'Non-Disclosure Agreements (NDA)',
    description: 'Identify overly broad confidentiality clauses, missing carve-outs, and perpetual obligations in NDAs.',
  },
  {
    slug: 'purchase-agreement',
    Icon: ShoppingBag,
    title: 'Purchase & Sale Agreements',
    description: 'Analyze warranties, deposit conditions, delivery terms, and default remedies in any purchase contract.',
  },
  {
    slug: 'service-agreement',
    Icon: ClipboardList,
    title: 'Service & Consulting Agreements',
    description: 'Check scope of work, payment terms, IP ownership, and liability limitations in service contracts.',
  },
  {
    slug: 'independent-contractor',
    Icon: UserCheck,
    title: 'Independent Contractor Agreements',
    description: 'Spot misclassification risks, IP assignment clauses, and non-compete restrictions in contractor agreements.',
  },
  {
    slug: 'partnership-agreement',
    Icon: Users,
    title: 'Partnership Agreements',
    description: 'Review equity splits, capital contributions, decision-making authority, and partner exit provisions.',
  },
  {
    slug: 'repair-agreement',
    Icon: Wrench,
    title: 'Repair & Maintenance Agreements',
    description: 'Understand scope of work, cost escalation limits, warranties on parts and labor, and authorization requirements.',
  },
  {
    slug: 'franchise-agreement',
    Icon: Building,
    title: 'Franchise Agreements',
    description: 'Analyze territory rights, royalty structures, operational requirements, and termination provisions in franchise contracts.',
  },
  {
    slug: 'real-estate-aps',
    Icon: MapPin,
    title: 'Real Estate APS',
    description: 'Review purchase price, conditions, closing dates, chattels included, and financing conditions in real estate agreements.',
  },
];

export default function ContractTypesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-[#0F172A] rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-[#0F172A]">Contract Checked</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/resources" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Templates</Link>
            <Link href="/contract-types" className="text-[#2D6A4F] font-semibold transition-colors">Contract Types</Link>
            <Link href="/blog" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Blog</Link>
          </nav>
          <Link
            href="/#upload-section"
            className="bg-[#2D6A4F] hover:bg-[#40916C] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Analyze Free
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#1C2333] text-white pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-900/30 border border-emerald-700/30 rounded-full px-4 py-1.5 mb-6 text-sm text-emerald-300 font-medium">
            <Search className="w-4 h-4" /> Specialized Analysis for Every Contract Type
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">
            Analyze Any Contract Type{' '}
            <span className="text-emerald-400">— Free</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Select your contract type for a tailored analysis. Our tool knows what to look for in each specific type — from rental agreements to franchise contracts — so you get targeted insights, not generic feedback.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-slate-600 leading-relaxed text-base text-center">
          Whether you&apos;re reviewing a residential lease, an employment offer letter, a non-disclosure agreement, or a complex real estate purchase contract,
          Contract Checked provides instant, free analysis tailored to your specific contract type. Upload your document and get a breakdown of risks, red flags,
          missing clauses, and plain English summaries — no lawyer required, no login needed.
        </p>
      </section>

      {/* Contract Types Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CONTRACT_TYPES.map(({ slug, Icon, title, description }) => (
            <div
              key={slug}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-emerald-200 transition-all group"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                <Icon className="w-6 h-6 text-[#2D6A4F]" />
              </div>
              <h2 className="font-bold text-slate-800 text-lg mb-2">{title}</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-5">{description}</p>
              <Link
                href={`/analyze/${slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2D6A4F] hover:text-[#40916C] transition-colors"
              >
                Analyze Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <p className="text-slate-700 font-semibold text-lg mb-2">Don&apos;t see your contract type?</p>
          <p className="text-slate-500 mb-5">Our tool analyzes <strong>any contract</strong> — not just the types listed here. Upload any agreement and get instant analysis.</p>
          <Link
            href="/#upload-section"
            className="inline-flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#40916C] text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Analyze Any Contract — Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white">Contract Checked</span>
              </div>
              <p className="text-sm leading-relaxed">Contract analysis for everyone. Free, private, no login needed.</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-3 text-sm">Tools</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#upload-section" className="hover:text-white transition-colors">Analyze Contract</Link></li>
                <li><Link href="/contract-types" className="hover:text-white transition-colors">Contract Types</Link></li>
                <li><Link href="/resources" className="hover:text-white transition-colors">Free Templates</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-3 text-sm">Learn</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-3 text-sm">Legal</p>
              <ul className="space-y-2 text-sm">
                <li><span>Not Legal Advice</span></li>
                <li><span>Privacy Policy</span></li>
                <li><span>Terms of Service</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-xs">
            &copy; {new Date().getFullYear()} Contract Checked. Contract analysis tool. Not legal advice.
          </div>
        </div>
      </footer>
    </div>
  );
}
