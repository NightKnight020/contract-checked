import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield, Zap, BookOpen, Cpu, FileText, Star,
  ArrowRight, CheckCircle, Lock
} from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'About Contract Checked | Built for People, Not Lawyers',
  description: 'Contract Checked is an AI-powered contract analysis platform built to make legal protection accessible to everyone — free, private, no login required.',
  alternates: {
    canonical: 'https://contractchecked.com/about',
  },
};

const TRUST_SIGNALS = [
  {
    icon: <Lock className="w-6 h-6 text-[#2D6A4F]" />,
    title: 'Your Contracts Stay Private',
    desc: 'Uploaded documents are processed to generate your analysis and never permanently stored. We don\'t keep a database of your contracts.',
  },
  {
    icon: <Zap className="w-6 h-6 text-[#2D6A4F]" />,
    title: 'Instant, No Login Required',
    desc: 'No account needed. Upload your contract and get a full analysis in seconds — completely free.',
  },
  {
    icon: <BookOpen className="w-6 h-6 text-[#2D6A4F]" />,
    title: 'Plain English, Always',
    desc: 'No legal jargon, no confusing technicalities. Every analysis is written so that anyone can understand what they\'re signing.',
  },
  {
    icon: <Cpu className="w-6 h-6 text-[#2D6A4F]" />,
    title: 'Built on Proven Technology',
    desc: 'Powered by enterprise-grade language models from Anthropic — the same AI technology trusted by businesses worldwide.',
  },
  {
    icon: <FileText className="w-6 h-6 text-[#2D6A4F]" />,
    title: '50+ Contract Types',
    desc: 'From rental agreements and employment contracts to business deals and NDAs — we cover the contracts that matter to real people.',
  },
  {
    icon: <Star className="w-6 h-6 text-[#2D6A4F]" />,
    title: 'Always Free Core Analysis',
    desc: 'Core contract analysis is, and will remain, free. Legal clarity shouldn\'t be gated behind a subscription.',
  },
];

const STATS = [
  { value: '50+', label: 'Contract Types Supported' },
  { value: 'Free', label: 'Forever for Core Analysis' },
  { value: '0', label: 'Contracts Stored Permanently' },
  { value: '8+', label: 'Legal Guide Articles' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-[#1C2333] text-white pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Built for People,<br />
            <span className="text-emerald-400">Not Lawyers</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Contract Checked was built because legal protection shouldn&apos;t require a $400/hr attorney.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold text-[#2D6A4F] uppercase tracking-widest mb-4">Our Mission</p>
            <h2 className="text-3xl font-bold text-slate-800 mb-6 leading-snug">
              Everyone deserves to understand what they&apos;re signing.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              Whether it&apos;s a lease, a job offer, or a business deal — you shouldn&apos;t need a law degree to protect yourself. Contracts are written by lawyers to protect the party that drafted them. That party is rarely you.
            </p>
            <p className="text-slate-600 leading-relaxed mb-5">
              Contract Checked levels the playing field. Upload any contract, get a full analysis in seconds, and walk into any signing with clarity — not anxiety.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We&apos;re not replacing lawyers for complex legal matters. We&apos;re making the basics accessible so that a bad lease clause or a hidden non-compete doesn&apos;t blindside you simply because you couldn&apos;t afford to have it reviewed.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="space-y-5">
              {[
                { icon: '📄', text: 'Upload your contract — PDF, Word, photo, or paste text' },
                { icon: '🔍', text: 'AI reads every clause and identifies risks, red flags, and missing protections' },
                { icon: '💬', text: 'Get a plain-English summary you can actually act on' },
                { icon: '✅', text: 'Sign with confidence — or know when to push back' },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0">{step.icon}</div>
                  <p className="text-slate-700 text-sm leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-white border-y border-slate-200 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#2D6A4F] uppercase tracking-widest mb-3">Why People Trust Contract Checked</p>
            <h2 className="text-3xl font-bold text-slate-800">Built with privacy and clarity at the core</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRUST_SIGNALS.map((signal) => (
              <div key={signal.title} className="bg-[#F9FAFB] rounded-xl border border-slate-200 p-6">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                  {signal.icon}
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{signal.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{signal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1C2333] py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold text-emerald-400 mb-2">{s.value}</p>
              <p className="text-slate-400 text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Partners */}
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Powered By Trusted Technology</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {/* Anthropic */}
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-6 py-4 grayscale hover:grayscale-0 transition-all shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-700">
                <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zM6.396 3.52L0 20h3.603l1.338-3.358h6.828L13.107 20h3.603L10.141 3.52H6.396zm-.527 10.43l2.34-5.858 2.34 5.857H5.869z" fill="currentColor"/>
              </svg>
              <span className="font-semibold text-slate-700 text-sm">Anthropic</span>
            </div>
            {/* Vercel */}
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-6 py-4 grayscale hover:grayscale-0 transition-all shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-700">
                <path d="M12 1L24 22H0L12 1z" fill="currentColor"/>
              </svg>
              <span className="font-semibold text-slate-700 text-sm">Vercel</span>
            </div>
            {/* Next.js */}
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-6 py-4 grayscale hover:grayscale-0 transition-all shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-slate-700">
                <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/>
              </svg>
              <span className="font-semibold text-slate-700 text-sm">Next.js</span>
            </div>
            {/* Supabase */}
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-6 py-4 grayscale hover:grayscale-0 transition-all shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-700">
                <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.111 12.883.713 14.09 1.77 14.09h9.084l.046 8.874c.015.986 1.26 1.41 1.874.637l9.262-11.652c.653-.833.051-2.039-1.006-2.039h-9.084L11.9 1.036z" fill="#3ECF8E"/>
              </svg>
              <span className="font-semibold text-slate-700 text-sm">Supabase</span>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-6">These are the real infrastructure and AI providers that power contractchecked.com</p>
        </div>
      </section>

      {/* Team / Founder */}
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-sm font-semibold text-[#2D6A4F] uppercase tracking-widest mb-4">The Team</p>
        <h2 className="text-3xl font-bold text-slate-800 mb-6">A solo project with big ambitions</h2>
        <p className="text-slate-600 leading-relaxed mb-5">
          Contract Checked is an independent platform, built and maintained with a focus on making legal tools accessible to everyone. It started as a simple idea: most people sign contracts they don&apos;t fully understand, and that shouldn&apos;t be a privilege problem.
        </p>
        <p className="text-slate-600 leading-relaxed">
          This is a bootstrapped project — no venture capital, no corporate backing. Just a commitment to building something genuinely useful. If Contract Checked has helped you, the best thing you can do is share it with someone who needs it.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-[#2D6A4F] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center text-white">
          <CheckCircle className="w-10 h-10 text-emerald-300 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to check your contract?</h2>
          <p className="text-emerald-100 mb-8">Free, instant, and no login required. Understand what you&apos;re signing before you sign it.</p>
          <Link
            href="/#upload-section"
            className="inline-flex items-center gap-2 bg-white text-[#2D6A4F] font-bold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
          >
            Analyze Your Contract <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
