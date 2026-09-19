import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Zap, Shield, ArrowRight, Star } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { AdSlot } from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Pricing — Contract Checked',
  description: 'Contract Checked is free to use. Upload and analyze any contract at no cost. Deep PDF reports coming soon.',
  alternates: { canonical: 'https://www.contractchecked.com/pricing' },
};

const faqs = [
  {
    q: 'How is Contract Checked free?',
    a: 'Full Smart Analysis is free. We run ads on some pages to support the product. Ads are kept away from your upload and the main report reading experience. An optional $29 deep PDF may be offered later — it\'s not required.',
  },
  {
    q: 'Is Contract Checked really free?',
    a: 'Yes. Core contract analysis is completely free with no limits. Upload and analyze as many contracts as you need.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. You can analyze contracts without signing up. Creating a free account is optional and lets you save your analysis history.',
  },
  {
    q: 'Is my contract data private?',
    a: 'Absolutely. Your contracts are processed securely and never stored permanently or used to train AI models.',
  },
  {
    q: 'What is the Deep PDF Report?',
    a: 'A professionally formatted PDF version of your analysis that you can download, print, and share with lawyers or advisors. This feature is coming soon and will be a one-time $29 purchase per contract.',
  },
  {
    q: 'Is there an Enterprise plan?',
    a: 'Yes. For law firms, real estate brokerages, or teams needing custom integrations, email support@contractchecked.com for a quote.',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-[#1C2333] text-white pt-16 pb-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-900/30 border border-emerald-700/30 rounded-full px-4 py-1.5 mb-6 text-sm text-emerald-300 font-medium">
            <Star className="w-4 h-4" /> No credit card required to start
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Simple Pricing: Free
          </h1>
          <p className="text-lg text-slate-300 max-w-xl mx-auto">
            Contract analysis is completely free. No credit card, no signup required to analyze contracts.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="max-w-4xl mx-auto px-4 -mt-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <div className="p-7 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#2D6A4F] text-white">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-800 text-lg">Free</span>
              </div>

              <div className="mb-1">
                <span className="text-4xl font-extrabold text-slate-900">$0</span>
                <span className="text-slate-500 text-sm ml-2">forever</span>
              </div>
              <p className="text-slate-500 text-sm mb-6">Full contract analysis, always free.</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Unlimited contract analyses</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Risk assessment & plain English summary</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Pros, cons & recommendations</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">PDF, Word & photo / OCR upload</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Contract comparison (side-by-side)</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Q&A chat per analysis</span>
                </li>
              </ul>
            </div>

            <div className="px-7 pb-7">
              <Link
                href="/#upload-section"
                className="w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl text-sm transition-colors bg-[#2D6A4F] hover:bg-[#40916C] text-white shadow-lg shadow-emerald-900/20"
              >
                Analyze Contract Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Deep PDF Report - Coming Soon */}
          <div className="relative bg-white rounded-2xl border border-[#2D6A4F] ring-2 ring-[#2D6A4F] shadow-lg flex flex-col">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="bg-[#2D6A4F] text-white text-xs font-bold px-4 py-1 rounded-full">
                Coming Soon
              </span>
            </div>

            <div className="p-7 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#2D6A4F] text-white">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-800 text-lg">Deep PDF Report</span>
              </div>

              <div className="mb-1">
                <span className="text-4xl font-extrabold text-slate-900">$29</span>
                <span className="text-slate-500 text-sm ml-2">one-time</span>
              </div>
              <p className="text-xs text-[#2D6A4F] font-medium mb-3">Per contract analysis</p>
              <p className="text-slate-500 text-sm mb-6">Professional PDF report you can share with advisors.</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Everything in Free</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Downloadable professional PDF report</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Formatted for sharing with lawyers & advisors</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Print-ready layout</span>
                </li>
              </ul>
            </div>

            <div className="px-7 pb-7">
              <button
                disabled
                className="w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl text-sm transition-colors bg-slate-100 text-slate-400 cursor-not-allowed"
              >
                Coming Soon
              </button>
              <p className="text-xs text-slate-500 text-center mt-2">
                Want to be notified? Email <a href="mailto:support@contractchecked.com" className="text-[#2D6A4F] hover:underline">support@contractchecked.com</a>
              </p>
            </div>
          </div>
        </div>

        {/* No longer showing Pro/Business plans */}

        {/* Enterprise callout */}
        <div className="mt-8 bg-[#1C2333] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg mb-1">Need Enterprise?</p>
            <p className="text-slate-400 text-sm">
              Law firms, real estate brokerages, HR platforms. Custom pricing, unlimited team, white-label, API, SLA.
            </p>
          </div>
          <a
            href="mailto:support@contractchecked.com?subject=Enterprise Inquiry"
            className="flex-shrink-0 bg-white text-[#1C2333] hover:bg-slate-100 font-semibold px-6 py-3 rounded-xl text-sm transition-colors flex items-center gap-2"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Ad Slot */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <AdSlot className="max-w-4xl mx-auto" />
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-4 mb-24">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">Pricing FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="font-semibold text-slate-800 mb-2">{faq.q}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#1C2333] py-16 mb-0">
        <div className="max-w-xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">Analyze Your Contract Free</h2>
          <p className="text-slate-400 mb-8">No signup. No credit card. Just instant contract analysis.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#upload-section"
              className="bg-[#2D6A4F] hover:bg-[#40916C] text-white font-bold px-8 py-4 rounded-xl text-sm transition-colors flex items-center gap-2"
            >
              Analyze Now — Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
