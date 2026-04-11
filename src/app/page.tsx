'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  FileText, Shield, Zap, Camera, GitCompare, ChevronDown, ChevronUp,
  CheckCircle, ArrowRight, Star, BookOpen
} from 'lucide-react';
import { ContractUpload, type UploadPayload } from '@/components/ContractUpload';
import { AnalysisResults, type AnalysisResultPayload } from '@/components/AnalysisResults';

// ─── FAQ data ────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: 'Is Contract Checked free to use?',
    a: 'Yes. Core contract analysis is completely free — no login required. Simply upload your contract and get instant Smart Analysis.',
  },
  {
    q: 'What file types are supported?',
    a: 'We support PDF, Word documents (.doc, .docx), plain text files, and photos/images of physical contracts (JPG, PNG, WEBP) via OCR.',
  },
  {
    q: 'Is my contract data kept private?',
    a: 'Your contract is processed securely and is not stored permanently or used to train AI models. We take privacy seriously.',
  },
  {
    q: 'What types of contracts can you analyze?',
    a: 'Any contract type — rental agreements, employment contracts, NDAs, service agreements, purchase agreements, partnership agreements, and more.',
  },
  {
    q: 'Can I compare two contracts?',
    a: 'Yes. Enable "Compare Mode" in the upload section to upload two contracts and get a side-by-side analysis with key differences highlighted.',
  },
  {
    q: 'Is this legal advice?',
    a: 'No. Contract Checked is an AI tool for informational purposes only. Always consult a qualified attorney before signing any contract.',
  },
];

const CONTRACT_TYPES = [
  'Residential Lease', 'Employment Agreement', 'NDA / Confidentiality',
  'Service Agreement', 'Purchase Agreement', 'Partnership Agreement',
  'Independent Contractor', 'Repair & Maintenance',
  'Real Estate (APS)', 'Consulting Contract', 'Franchise Agreement',
];

const FEATURES = [
  {
    icon: <Zap className="w-6 h-6 text-[#2D6A4F]" />,
    title: 'Instant Smart Analysis',
    desc: 'Upload and get a full professional analysis in seconds — risks, pros, cons, missing clauses, and plain English summary.',
  },
  {
    icon: <Camera className="w-6 h-6 text-[#2D6A4F]" />,
    title: 'Photo OCR Upload',
    desc: 'Snap a photo of a paper contract. Our smart analysis reads and extracts text from your photo just like a digital file.',
  },
  {
    icon: <GitCompare className="w-6 h-6 text-[#2D6A4F]" />,
    title: 'Side-by-Side Comparison',
    desc: 'Upload two versions of a contract and instantly see what changed, what was added, and what was removed.',
  },
  {
    icon: <Shield className="w-6 h-6 text-[#2D6A4F]" />,
    title: 'Risk Assessment',
    desc: 'Every clause is rated low, medium, or high risk so you can quickly spot red flags before you sign.',
  },
  {
    icon: <FileText className="w-6 h-6 text-[#2D6A4F]" />,
    title: 'Free Templates',
    desc: 'Download professionally drafted contract templates — rental agreements, NDAs, service contracts, and more.',
  },
  {
    icon: <BookOpen className="w-6 h-6 text-[#2D6A4F]" />,
    title: 'Plain English',
    desc: 'Legal jargon translated into plain language so anyone can understand what they\'re agreeing to.',
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-800 pr-4">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 bg-white">
          <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Contract Checked',
  url: 'https://contractchecked.com',
  description: 'AI-powered contract analysis platform. Upload any contract and get instant professional analysis — free.',
  applicationCategory: 'LegalApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResultPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAnalyze = useCallback(async (payload: UploadPayload) => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('mode', payload.mode);
      formData.append('tab', payload.tab);

      if (payload.tab === 'text') {
        formData.append('text', payload.text ?? '');
      } else {
        if (payload.fileA) formData.append('fileA', payload.fileA);
        if (payload.mode === 'compare' && payload.fileB) formData.append('fileB', payload.fileB);
      }

      const res = await fetch('/api/analyze', { method: 'POST', body: formData });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Failed to analyze contract');
      }
      const data = await res.json();
      setResult(data as AnalysisResultPayload);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-[#F8FAFC]">
        {/* ── Navigation ── */}
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
              <Link href="/blog" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Blog</Link>
            </nav>

            <button
              onClick={scrollToUpload}
              className="bg-[#2D6A4F] hover:bg-[#40916C] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Analyze Free
            </button>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="bg-[#0F172A] text-white pt-20 pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 text-center relative">
            <div className="inline-flex items-center gap-2 bg-emerald-900/30 border border-emerald-700/30 rounded-full px-4 py-1.5 mb-8 text-sm text-emerald-300 font-medium">
              <Star className="w-4 h-4" /> Powered by GPT-4 Vision · Free · No Login Required
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Know What<br />
              <span className="text-emerald-400">You Sign</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Upload any contract — PDF, Word, photo — and get an instant Smart Analysis.
              Risks, plain English summary, missing clauses, and more.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={scrollToUpload}
                className="bg-[#2D6A4F] hover:bg-[#40916C] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors flex items-center gap-2 shadow-xl shadow-emerald-900/50"
              >
                Analyze Your Contract <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                href="/resources"
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors border border-white/20"
              >
                Free Templates
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 mt-12 text-slate-400 text-sm">
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" />No login needed</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" />All file types</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" />Photo OCR</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" />Side-by-side compare</span>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="max-w-6xl mx-auto px-4 -mt-16 relative z-10 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n: '1', title: 'Upload', desc: 'PDF, Word, text, or a photo of a paper contract' },
              { n: '2', title: 'Analyze', desc: 'Every clause is read and analyzed in seconds' },
              { n: '3', title: 'Understand', desc: 'Get risks, plain English summary, and recommendations' },
            ].map((step) => (
              <div key={step.n} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex gap-4">
                <div className="w-10 h-10 bg-[#2D6A4F] text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {step.n}
                </div>
                <div>
                  <p className="font-bold text-slate-800 mb-1">{step.title}</p>
                  <p className="text-sm text-slate-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Upload Section ── */}
        <section id="upload-section" className="max-w-4xl mx-auto px-4 mb-24">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Analyze Your Contract</h2>
            <p className="text-slate-500 text-center mb-8 text-sm">Upload a file, paste text, or take a photo — completely free</p>
            <ContractUpload onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}
          </div>
        </section>

        {/* ── Results ── */}
        {result && (
          <section className="max-w-6xl mx-auto px-4 mb-24">
            <AnalysisResults result={result} />
          </section>
        )}

        {/* ── Stats ── */}
        <section className="bg-[#0F172A] py-16 mb-20">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            {[
              { value: '10,000+', label: 'Contracts Analyzed' },
              { value: '50+', label: 'Contract Types Supported' },
              { value: '99%', label: 'Accuracy Rate' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-extrabold text-emerald-400 mb-2">{s.value}</p>
                <p className="text-slate-400 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        <section className="max-w-6xl mx-auto px-4 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Everything You Need</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Professional contract intelligence without the lawyer fees.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contract Types ── */}
        <section className="bg-white py-16 mb-20 border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-10">Supported Contract Types</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {CONTRACT_TYPES.map((t) => (
                <span key={t} className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-[#1B4332] rounded-full text-sm font-medium text-slate-700 transition-colors cursor-default">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-3xl mx-auto px-4 mb-24">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-[#2D6A4F] py-16 mb-0">
          <div className="max-w-2xl mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Check Your Contract?</h2>
            <p className="text-emerald-100 mb-8">Free, instant, and no login required.</p>
            <button
              onClick={scrollToUpload}
              className="bg-white text-[#2D6A4F] font-bold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Analyze Now — It&apos;s Free
            </button>
          </div>
        </section>

        {/* ── Footer ── */}
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
                <p className="text-sm leading-relaxed">AI contract analysis for everyone. Free, private, no login needed.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-3 text-sm">Tools</p>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/#upload-section" className="hover:text-white transition-colors">Analyze Contract</Link></li>
                  <li><Link href="/resources" className="hover:text-white transition-colors">Free Templates</Link></li>
                  <li></li>
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
              &copy; {new Date().getFullYear()} Contract Checked. AI-powered contract analysis. Not legal advice.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}



