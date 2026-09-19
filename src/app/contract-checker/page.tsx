import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Shield, Zap, AlertTriangle, CheckCircle, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { AdSlot } from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Contract Checker — Free AI Contract Analysis | Contract Checked',
  description: 'Free contract checker: upload a PDF, Word file, or photo and get risks, plain English, and missing-clause notes. Built for leases, freelance agreements, and Ontario APS — works on any contract.',
  alternates: {
    canonical: 'https://www.contractchecked.com/contract-checker',
  },
  openGraph: {
    title: 'Contract Checker — Free AI Contract Analysis | Contract Checked',
    description: 'Free contract checker: upload a PDF, Word file, or photo and get risks, plain English, and missing-clause notes. Built for leases, freelance agreements, and Ontario APS — works on any contract.',
    url: 'https://www.contractchecked.com/contract-checker',
    locale: 'en_CA',
  },
};

const FAQS = [
  {
    q: 'Is the contract checker really free?',
    a: 'Yes. Full Smart Analysis is free — no login, no trial limits. Supported by ads. Optional paid deep PDF coming later.',
  },
  {
    q: 'What file types can I upload?',
    a: 'PDF, Word (.doc/.docx), plain text, and photos of paper contracts via OCR.',
  },
  {
    q: 'Is this legal advice?',
    a: 'No. Contract Checked is an informational tool. For important decisions — leases, APS, large freelance deals — consult a qualified lawyer in your province.',
  },
  {
    q: 'Does it work for Canadian contracts?',
    a: 'Yes. We especially help Canadian freelancers, renters, and Ontario APS buyers — but the analyzer works on any contract from any jurisdiction.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="border border-slate-200 rounded-xl overflow-hidden group">
      <summary className="flex items-center justify-between p-5 cursor-pointer bg-white hover:bg-slate-50 transition-colors">
        <span className="font-semibold text-slate-800 pr-4">{q}</span>
        <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
      </summary>
      <div className="px-5 pb-5 bg-white">
        <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
      </div>
    </details>
  );
}

export default function ContractCheckerPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-[#0F172A] text-white pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-emerald-900/30 border border-emerald-700/30 rounded-full px-4 py-1.5 mb-8 text-sm text-emerald-300 font-medium">
            Contract Checker
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Contract checker: know what you&apos;re signing
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Paste or upload any agreement. Our free contract checker flags risks and translates legalese — no login.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#upload-section"
              className="bg-[#059669] hover:bg-[#10B981] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors flex items-center gap-2 shadow-xl shadow-emerald-900/50"
            >
              Check my contract — free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/#sample-report"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors border border-white/20"
            >
              See sample report
            </Link>
          </div>
        </div>
      </section>

      {/* What a contract checker does */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          What a contract checker does
        </h2>
        <p className="text-slate-600 text-lg mb-10 text-center max-w-2xl mx-auto">
          A contract checker reads your agreement and surfaces the parts that matter — risks, gaps, and plain-English explanations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-[#059669]" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Flags risks</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              High, medium, and low risk ratings on vague terms, one-sided liability, payment traps, and more.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-[#059669]" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Plain English summary</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Legal jargon translated so anyone can understand what they&apos;re agreeing to.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-[#059669]" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Missing-clause notes</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Identifies protections that should be in your agreement but aren&apos;t — like kill fees or dispute resolution.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#059669]" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Follow-up Q&A</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ask questions about your contract after analysis — &quot;What happens if I&apos;m paid late?&quot; — and get instant answers.
            </p>
          </div>
        </div>

        <div className="mt-8 p-5 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-sm text-yellow-900">
            <strong>Not legal advice.</strong> A contract checker is an informational tool, not a substitute for a qualified lawyer.
          </p>
        </div>
      </section>

      {/* How to use */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-10 text-center">
            How to use Contract Checked
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#059669] text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Upload</h3>
                <p className="text-slate-600 text-sm">
                  Drag a PDF or Word file, paste text, or upload a photo of a paper contract. No login required.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#059669] text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Analysis</h3>
                <p className="text-slate-600 text-sm">
                  Get instant Smart Analysis — risk flags, plain English summary, missing-clause notes, pros & cons.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#059669] text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Questions</h3>
                <p className="text-slate-600 text-sm">
                  Ask follow-up questions until the confusing parts make sense — all free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best for */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          Best for
        </h2>
        <p className="text-slate-600 mb-10 text-center max-w-2xl mx-auto">
          Built first for Canadian freelancers, renters, and Ontario home buyers — still works on any contract.
        </p>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-1">Freelancers</h3>
            <p className="text-sm text-slate-600">
              Check payment terms, scope, IP assignments, non-competes, and kill fees before you bill. <Link href="/blog/freelancer-contract-checklist" className="text-[#059669] hover:underline font-medium">Freelancer checklist →</Link>
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-1">Renters</h3>
            <p className="text-sm text-slate-600">
              Residential leases: deposits, entry rules, renewal terms, surprise fees. <Link href="/blog/rental-agreement-red-flags" className="text-[#059669] hover:underline font-medium">Rental red flags →</Link>
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-1">Ontario home buyers / sellers (APS)</h3>
            <p className="text-sm text-slate-600">
              Agreement of Purchase and Sale clause flags before you&apos;re locked in. <Link href="/analyze/real-estate-aps" className="text-[#059669] hover:underline font-medium">Analyze APS →</Link> · <Link href="/blog/real-estate-purchase-agreement-guide" className="text-[#059669] hover:underline font-medium">APS guide →</Link>
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-1">Any contract</h3>
            <p className="text-sm text-slate-600">
              NDAs, employment, service agreements, partnerships — the checker accepts any written agreement.
            </p>
          </div>
        </div>
      </section>

      {/* Ad Slot */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <AdSlot />
      </section>

      {/* What we flag */}
      <section className="bg-[#0F172A] text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">
            What we flag
          </h2>
          <p className="text-slate-300 mb-10 text-center max-w-2xl mx-auto">
            Common traps contract checkers should catch — and we do.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Vague payment terms or "reasonable time"',
              'One-sided liability / indemnification',
              'Automatic renewals with short notice',
              'Broad IP assignments (all work product)',
              'Non-compete or non-solicitation overreach',
              'Missing kill fee / cancellation clause',
              'Entry / inspection terms (leases)',
              'Deposit return timeline (residential lease)',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/5 rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample report teaser */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            See what a checked contract looks like
          </h2>
          <p className="text-slate-600 mb-6 max-w-lg mx-auto">
            Annotated sample report with risk flags, missing-clause notes, and plain-English callouts.
          </p>
          <Link
            href="/#sample-report"
            className="inline-flex items-center gap-2 bg-[#059669] hover:bg-[#10B981] text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            View sample report <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Ready to check your contract?
        </h2>
        <p className="text-slate-600 mb-8">
          Free, instant, and no login required.
        </p>
        <Link
          href="/#upload-section"
          className="inline-flex items-center gap-2 bg-[#059669] hover:bg-[#10B981] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
        >
          Check my contract free <ArrowRight className="w-5 h-5" />
        </Link>
        <p className="text-sm text-slate-500 mt-4">
          Or learn about <Link href="/free-contract-analysis" className="text-[#059669] hover:underline font-medium">free contract analysis</Link> · <Link href="/pricing" className="text-[#059669] hover:underline font-medium">Pricing</Link>
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
