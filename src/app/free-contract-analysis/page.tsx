import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Shield, Zap, Camera, GitCompare, CheckCircle, ArrowRight, ChevronDown } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Free Contract Analysis — No Login | Contract Checked',
  description: 'Free contract analysis online: upload PDF, Word, or a photo. Get plain-English risks and Q&A — no account required. Ideal for Canadian freelancers, renters, and Ontario APS reviews.',
  alternates: {
    canonical: 'https://www.contractchecked.com/free-contract-analysis',
  },
  openGraph: {
    title: 'Free Contract Analysis — No Login | Contract Checked',
    description: 'Free contract analysis online: upload PDF, Word, or a photo. Get plain-English risks and Q&A — no account required. Ideal for Canadian freelancers, renters, and Ontario APS reviews.',
    url: 'https://www.contractchecked.com/free-contract-analysis',
    locale: 'en_CA',
  },
};

const FAQS = [
  {
    q: 'Why is it free?',
    a: 'We believe everyone should be able to read a contract clearly before they sign. Ads keep the lights on. An optional $29 deep PDF is coming later — but it isn\'t required for a real, full-quality first analysis.',
  },
  {
    q: 'Is there a catch — trial limits, monthly caps?',
    a: 'No. Free means free. No 5/month theater, no upgrade walls. See our Pricing page for the honest story.',
  },
  {
    q: 'Is this as good as a lawyer?',
    a: 'No. It\'s a clear first read — not legal advice. For important decisions (leases, APS, large freelance deals), talk to a qualified lawyer in your province.',
  },
  {
    q: 'Can I upload a photo of a paper contract?',
    a: 'Yes. Our OCR reads paper contracts from clear photos. Just take a picture and upload.',
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

export default function FreeContractAnalysisPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-[#1C2333] text-white pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-emerald-900/30 border border-emerald-700/30 rounded-full px-4 py-1.5 mb-8 text-sm text-emerald-300 font-medium">
            Free Contract Analysis
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Free contract analysis —<br />
            <span className="text-emerald-400">no login required</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Full-quality Smart Analysis is free. Ads keep the lights on. Optional $29 deep PDF coming later — not required for a real first read.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#upload-section"
              className="bg-[#2D6A4F] hover:bg-[#40916C] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors flex items-center gap-2 shadow-xl shadow-emerald-900/50"
            >
              Start free analysis <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors border border-white/20"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* What's included free */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          What&apos;s included free
        </h2>
        <p className="text-slate-600 text-lg mb-10 text-center max-w-2xl mx-auto">
          Everything you need for a serious first read — no login, no monthly cap, no upgrade walls.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#2D6A4F]" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Instant Smart Analysis</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Risk flags (low / medium / high), plain English summary, missing-clause notes, pros & cons.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-[#2D6A4F]" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Follow-up Q&A</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ask questions about your contract — &quot;What happens if I&apos;m paid late?&quot; — and get instant answers.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-[#2D6A4F]" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Photo OCR</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Upload a picture of a paper contract. We read it and analyze it just like a digital file.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
              <GitCompare className="w-6 h-6 text-[#2D6A4F]" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Side-by-side compare</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Upload two versions of a contract and see what changed — all free.
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <p className="text-sm text-emerald-900 font-medium">
            ✅ No login required · ✅ No monthly limits · ✅ No upgrade walls · ✅ Full quality
          </p>
        </div>
      </section>

      {/* Why free isn't a trial trap */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
            Why &quot;free&quot; isn&apos;t a trial trap
          </h2>
          <p className="text-slate-600 mb-8 text-center max-w-2xl mx-auto">
            We don&apos;t do fake free tiers. Here&apos;s the honest story.
          </p>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-[#2D6A4F] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-800 mb-1">No monthly cap theater</h3>
                <p className="text-sm text-slate-600">
                  We don&apos;t limit you to &quot;5 analyses per month&quot; to push upgrades. Free is actually free.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-[#2D6A4F] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-800 mb-1">No quality downgrade</h3>
                <p className="text-sm text-slate-600">
                  Free analysis uses the same AI, same depth, same features as any paid option. No &quot;lite&quot; version.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-[#2D6A4F] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Ads support it</h3>
                <p className="text-sm text-slate-600">
                  We show ads to keep free analysis sustainable. Simple, honest business model.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-[#2D6A4F] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Optional paid deep PDF coming later</h3>
                <p className="text-sm text-slate-600">
                  A one-time $29 deep PDF report may be offered in the future — more depth, packaging, and format options. But it isn&apos;t required for a full, real first read.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center mt-6 text-sm text-slate-500">
            See the full story on our <Link href="/pricing" className="text-[#2D6A4F] hover:underline font-medium">Pricing page</Link>
          </p>
        </div>
      </section>

      {/* Canada wedge */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          Built for Canadian contracts
        </h2>
        <p className="text-slate-600 mb-10 text-center max-w-2xl mx-auto">
          Especially helpful for Canadian freelancers, renters, and Ontario home buyers — still works on any contract from any jurisdiction.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <FileText className="w-6 h-6 text-[#2D6A4F]" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Freelance agreements</h3>
            <p className="text-sm text-slate-600">
              Payment, IP, kill fees, non-competes — everything Canadian freelancers face.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Shield className="w-6 h-6 text-[#2D6A4F]" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Residential leases</h3>
            <p className="text-sm text-slate-600">
              Ontario-aware language for deposit returns, entry rules, and renewal terms.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <CheckCircle className="w-6 h-6 text-[#2D6A4F]" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Ontario APS</h3>
            <p className="text-sm text-slate-600">
              Agreement of Purchase and Sale clause flags before you&apos;re locked in.
            </p>
          </div>
        </div>
      </section>

      {/* How analysis works + OCR */}
      <section className="bg-[#1C2333] text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">
            How free contract analysis works
          </h2>
          <p className="text-slate-300 mb-10 text-center max-w-2xl mx-auto">
            Three steps. No login. Works with any file — even photos of paper contracts.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#2D6A4F] text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold mb-1">Upload</h3>
                <p className="text-slate-300 text-sm">
                  Drag a PDF, Word file, paste text, or upload a photo. If you have a paper contract, just take a clear picture — our OCR reads it.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#2D6A4F] text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold mb-1">Smart Analysis</h3>
                <p className="text-slate-300 text-sm">
                  Get instant results: risk flags, plain English summary, missing-clause notes, pros & cons, key dates, and recommendations.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#2D6A4F] text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold mb-1">Ask questions</h3>
                <p className="text-slate-300 text-sm">
                  Follow up in Q&A until the confusing parts make sense. All included, all free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & not legal advice */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">
            Privacy & not legal advice
          </h2>
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <div>
              <h3 className="font-bold text-slate-800 mb-1">Your contract stays private</h3>
              <p className="text-sm text-slate-600">
                We process uploads to produce your analysis. We don&apos;t sell your contracts. We don&apos;t use your documents to train public models. See <Link href="/privacy" className="text-[#2D6A4F] hover:underline font-medium">Privacy Policy</Link> for retention details.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 mb-1">This is not legal advice</h3>
              <p className="text-sm text-slate-600">
                Contract Checked is an informational tool. For important decisions — especially leases, APS, and large freelance deals — talk to a qualified lawyer in your province. Province matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related guides */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
            Related guides
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/blog/how-to-review-any-contract"
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow group"
            >
              <span className="inline-block text-xs font-semibold text-[#2D6A4F] bg-emerald-50 px-3 py-1 rounded-full mb-3">
                Guide
              </span>
              <h3 className="font-bold text-slate-800 mb-2 group-hover:text-[#2D6A4F] transition-colors">
                How to Review Any Contract in 30 Minutes
              </h3>
              <p className="text-sm text-slate-600">
                A step-by-step framework for reading any agreement — even if you&apos;re not a lawyer.
              </p>
            </Link>

            <Link
              href="/blog/freelancer-contract-checklist"
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow group"
            >
              <span className="inline-block text-xs font-semibold text-[#2D6A4F] bg-emerald-50 px-3 py-1 rounded-full mb-3">
                Freelancing
              </span>
              <h3 className="font-bold text-slate-800 mb-2 group-hover:text-[#2D6A4F] transition-colors">
                Freelancer Contract Checklist: 10 Clauses Before You Start
              </h3>
              <p className="text-sm text-slate-600">
                Check payment, kill fees, scope, IP, and non-competes before you bill.
              </p>
            </Link>

            <Link
              href="/blog/rental-agreement-red-flags"
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow group"
            >
              <span className="inline-block text-xs font-semibold text-[#2D6A4F] bg-emerald-50 px-3 py-1 rounded-full mb-3">
                Rental
              </span>
              <h3 className="font-bold text-slate-800 mb-2 group-hover:text-[#2D6A4F] transition-colors">
                12 Rental Agreement Red Flags Landlords Hope You Miss
              </h3>
              <p className="text-sm text-slate-600">
                Signing a lease without reading it carefully can cost you thousands.
              </p>
            </Link>

            <Link
              href="/blog/real-estate-purchase-agreement-guide"
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow group"
            >
              <span className="inline-block text-xs font-semibold text-[#2D6A4F] bg-emerald-50 px-3 py-1 rounded-full mb-3">
                Real Estate
              </span>
              <h3 className="font-bold text-slate-800 mb-2 group-hover:text-[#2D6A4F] transition-colors">
                Agreement of Purchase and Sale: 10 Clauses That Matter
              </h3>
              <p className="text-sm text-slate-600">
                Ontario APS breakdown — what to look for before you&apos;re locked in.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-slate-800 mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2D6A4F] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to analyze your contract?
          </h2>
          <p className="text-emerald-100 mb-8">
            Free, instant, no login required.
          </p>
          <Link
            href="/#upload-section"
            className="inline-flex items-center gap-2 bg-white text-[#2D6A4F] font-bold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
          >
            Start free analysis <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-emerald-200 text-sm mt-4">
            Or try our <Link href="/contract-checker" className="underline hover:text-white">contract checker</Link>
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
