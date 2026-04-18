import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, X, Zap, Shield, Building2, ArrowRight, Star } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Pricing — Contract Checked',
  description: 'Free contract analysis for everyone. Upgrade for unlimited analyses, history, comparison, and team features.',
  alternates: { canonical: 'https://contractchecked.com/pricing' },
};

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for occasional contract reviews.',
    cta: 'Get Started Free',
    ctaHref: '/auth/signup',
    ctaStyle: 'border border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white',
    highlighted: false,
    icon: <Zap className="w-5 h-5" />,
    features: [
      { text: '5 contract analyses per month', included: true },
      { text: 'Risk assessment & plain English summary', included: true },
      { text: 'Pros, cons & recommendations', included: true },
      { text: 'PDF, Word & text file support', included: true },
      { text: 'Photo / OCR upload', included: true },
      { text: 'Contract history & saved analyses', included: false },
      { text: 'Contract comparison (side-by-side)', included: false },
      { text: 'Q&A chat per analysis', included: false },
      { text: 'PDF export of reports', included: false },
      { text: 'Team members', included: false },
      { text: 'API access', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per month',
    annualNote: 'or $99/year — save 30%',
    description: 'For individuals who sign contracts regularly.',
    cta: 'Start Pro Free Trial',
    ctaHref: '/auth/signup?plan=pro',
    ctaStyle: 'bg-[#2D6A4F] hover:bg-[#40916C] text-white shadow-lg shadow-emerald-900/20',
    highlighted: true,
    badge: 'Most Popular',
    icon: <Shield className="w-5 h-5" />,
    features: [
      { text: '50 contract analyses per month', included: true },
      { text: 'Risk assessment & plain English summary', included: true },
      { text: 'Pros, cons & recommendations', included: true },
      { text: 'PDF, Word & text file support', included: true },
      { text: 'Photo / OCR upload', included: true },
      { text: 'Full contract history (1 year)', included: true },
      { text: 'Contract comparison (side-by-side)', included: true },
      { text: 'Q&A chat per analysis', included: true },
      { text: 'PDF export of reports', included: true },
      { text: 'Team members', included: false },
      { text: 'API access', included: false },
    ],
  },
  {
    name: 'Business',
    price: '$39',
    period: 'per month',
    annualNote: 'or $299/year — save 36%',
    description: 'For teams, brokerages & small law firms.',
    cta: 'Start Business Trial',
    ctaHref: '/auth/signup?plan=business',
    ctaStyle: 'border border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white',
    highlighted: false,
    icon: <Building2 className="w-5 h-5" />,
    features: [
      { text: 'Unlimited contract analyses', included: true },
      { text: 'Risk assessment & plain English summary', included: true },
      { text: 'Pros, cons & recommendations', included: true },
      { text: 'PDF, Word & text file support', included: true },
      { text: 'Photo / OCR upload', included: true },
      { text: 'Unlimited contract history', included: true },
      { text: 'Contract comparison (side-by-side)', included: true },
      { text: 'Q&A chat per analysis', included: true },
      { text: 'PDF export of reports', included: true },
      { text: 'Up to 5 team members', included: true },
      { text: 'API access', included: true },
    ],
  },
];

const faqs = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes — cancel anytime with no questions asked. You keep access until the end of your billing period.',
  },
  {
    q: 'Is my contract data private?',
    a: 'Absolutely. Your contracts are processed securely and never stored permanently or used to train AI models.',
  },
  {
    q: 'What counts as one "analysis"?',
    a: 'Each contract upload or paste counts as one analysis. Comparison mode (two contracts) counts as two analyses.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'Yes. If you\'re not satisfied within 7 days of your first paid charge, contact support@contractchecked.com for a full refund.',
  },
  {
    q: 'Is there an Enterprise plan?',
    a: 'Yes. For law firms, real estate brokerages, or teams over 5 people, email support@contractchecked.com for a custom quote.',
  },
  {
    q: 'Do I need a credit card for the free plan?',
    a: 'No. The free plan requires only an email address — no credit card ever needed.',
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
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-slate-300 max-w-xl mx-auto">
            Start free. Upgrade when you need more. No surprises, no hidden fees.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="max-w-6xl mx-auto px-4 -mt-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl border shadow-sm flex flex-col ${
                plan.highlighted
                  ? 'border-[#2D6A4F] ring-2 ring-[#2D6A4F] shadow-lg'
                  : 'border-slate-200'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#2D6A4F] text-white text-xs font-bold px-4 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-7 flex-1">
                {/* Plan header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${plan.highlighted ? 'bg-[#2D6A4F] text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {plan.icon}
                  </div>
                  <span className="font-bold text-slate-800 text-lg">{plan.name}</span>
                </div>

                <div className="mb-1">
                  <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500 text-sm ml-2">{plan.period}</span>
                </div>
                {plan.annualNote && (
                  <p className="text-xs text-[#2D6A4F] font-medium mb-3">{plan.annualNote}</p>
                )}
                <p className="text-slate-500 text-sm mb-6">{plan.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2.5 text-sm">
                      {f.included ? (
                        <CheckCircle className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={f.included ? 'text-slate-700' : 'text-slate-400'}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-7 pb-7">
                <Link
                  href={plan.ctaHref}
                  className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl text-sm transition-colors ${plan.ctaStyle}`}
                >
                  {plan.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

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

      {/* Compare table */}
      <section className="max-w-4xl mx-auto px-4 mb-24">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-10">Full Feature Comparison</h2>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left p-4 font-semibold text-slate-600 w-1/2">Feature</th>
                <th className="p-4 font-semibold text-slate-600 text-center">Free</th>
                <th className="p-4 font-bold text-[#2D6A4F] text-center">Pro</th>
                <th className="p-4 font-semibold text-slate-600 text-center">Business</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                ['Analyses per month', '5', '50', 'Unlimited'],
                ['Risk assessment', '✓', '✓', '✓'],
                ['Plain English summary', '✓', '✓', '✓'],
                ['Pros, cons & recommendations', '✓', '✓', '✓'],
                ['Photo / OCR upload', '✓', '✓', '✓'],
                ['Contract history', '—', '1 year', 'Unlimited'],
                ['Contract comparison', '—', '✓', '✓'],
                ['Q&A chat per analysis', '—', '✓', '✓'],
                ['PDF export', '—', '✓', '✓'],
                ['Team members', '—', '—', 'Up to 5'],
                ['API access', '—', '—', '✓'],
                ['Priority processing', '—', '—', '✓'],
                ['Priority support', '—', 'Email', 'Priority email'],
              ].map(([feature, free, pro, business]) => (
                <tr key={feature} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-700 font-medium">{feature}</td>
                  <td className="p-4 text-center text-slate-500">{free}</td>
                  <td className="p-4 text-center text-[#2D6A4F] font-semibold">{pro}</td>
                  <td className="p-4 text-center text-slate-700">{business}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          <h2 className="text-3xl font-bold mb-3">Start Free Today</h2>
          <p className="text-slate-400 mb-8">No credit card. No commitment. Just better contract decisions.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/signup"
              className="bg-[#2D6A4F] hover:bg-[#40916C] text-white font-bold px-8 py-4 rounded-xl text-sm transition-colors flex items-center gap-2"
            >
              Create Free Account <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#upload-section"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl text-sm transition-colors border border-white/20"
            >
              Try Without Account
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
