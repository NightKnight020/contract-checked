'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  FileText, Shield, Zap, Camera, GitCompare, ChevronDown, ChevronUp,
  CheckCircle, ArrowRight, Star, BookOpen
} from 'lucide-react';
import { ContractUpload, type UploadPayload } from '@/components/ContractUpload';
import { AnalysisResults, type AnalysisResultPayload } from '@/components/AnalysisResults';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ContractQA } from '@/components/ContractQA';
import { AdSlot } from '@/components/AdSlot';
import { useAuth } from '@/lib/auth-context';
import { saveAnalysisToHistory } from '@/lib/supabase';
import type { ContractAnalysis, ComparisonResult } from '@/lib/contract-ai';

// ─── FAQ data ────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: 'How is Contract Checked free?',
    a: 'Full Smart Analysis is free. We run ads on some pages to support the product. Ads are kept away from your upload and the main report reading experience. An optional $29 deep PDF may be offered later — it\'s not required.',
  },
  {
    q: 'Is Contract Checked free to use?',
    a: 'Yes. Standard Smart Analysis is free — upload, risks, plain English summary, missing-clause notes, and Q&A. No login required. We\'re supported by ads. An optional paid deep PDF report may be offered later; it isn\'t required for a full free analysis.',
  },
  {
    q: 'What file types are supported?',
    a: 'PDF, Word (.doc/.docx), plain text, and photos of paper contracts (OCR). If it reads clearly, we can analyze it.',
  },
  {
    q: 'Is my contract data kept private?',
    a: 'We process uploads to produce your analysis. We don\'t sell your contracts. We don\'t use your documents to train public models. See Privacy Policy for retention details.',
  },
  {
    q: 'What types of contracts can you analyze?',
    a: 'Any written agreement. We especially help Canadian freelancers, renters (leases), and Ontario APS / real-estate purchase agreements — but the analyzer isn\'t limited to those.',
  },
  {
    q: 'Can I compare two contracts?',
    a: 'Yes — upload two versions to see what changed. Included on the free analyzer.',
  },
  {
    q: 'Is this legal advice?',
    a: 'No. Contract Checked is an AI-powered tool for informational purposes only, not a substitute for legal advice. We help you understand contracts in plain English, but you should always consult a qualified attorney before making important legal decisions.',
  },
];

const CONTRACT_TYPES = [
  { label: 'Residential Lease', slug: '/analyze/rental-agreement' },
  { label: 'Employment Agreement', slug: '/analyze/employment-contract' },
  { label: 'NDA / Confidentiality', slug: '/analyze/nda' },
  { label: 'Service Agreement', slug: '/analyze/service-agreement' },
  { label: 'Purchase Agreement', slug: '/analyze/purchase-agreement' },
  { label: 'Partnership Agreement', slug: '/analyze/partnership-agreement' },
  { label: 'Independent Contractor', slug: '/analyze/independent-contractor' },
  { label: 'Repair & Maintenance', slug: '/analyze/repair-agreement' },
  { label: 'Real Estate (APS)', slug: '/analyze/real-estate-aps' },
  { label: 'Consulting Contract', slug: '/analyze/service-agreement' },
  { label: 'Franchise Agreement', slug: '/analyze/franchise-agreement' },
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
  url: 'https://www.contractchecked.com',
  description: 'Free AI-powered contract analysis platform. Upload any contract and get instant Smart Analysis — risks, plain English, missing clauses, and Q&A. No login required.',
  applicationCategory: 'LegalApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const PROGRESS_STEPS = [
  'Reading your contract...',
  'Identifying parties and key terms...',
  'Checking for risks and red flags...',
  'Evaluating missing clauses...',
  'Generating plain English summary...',
  'Almost done...',
];

export default function Home() {
  const { user } = useAuth();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [result, setResult] = useState<AnalysisResultPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAnalyze = useCallback(async (payload: UploadPayload) => {
    setIsAnalyzing(true);
    setProgressStep(0);
    setError(null);
    setResult(null);

    // Cycle through progress steps every 3s while analyzing
    const progressInterval = setInterval(() => {
      setProgressStep((s) => Math.min(s + 1, PROGRESS_STEPS.length - 1));
    }, 3000);

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
      const analysisPayload = data as AnalysisResultPayload;
      setResult(analysisPayload);

      // Auto-save to history if logged in
      if (user) {
        const analysisResult = data as Record<string, unknown>;
        if (analysisPayload.mode === 'single') {
          const s = analysisPayload as unknown as ContractAnalysis;
          saveAnalysisToHistory(user.id, {
            contractType: s.contractType,
            fileName: payload.fileA?.name,
            overallRisk: s.overallRisk,
            analysisMode: 'single',
            analysisResult,
            plainEnglishSummary: s.plainEnglishSummary,
          });
        } else {
          const c = analysisPayload as unknown as ComparisonResult;
          saveAnalysisToHistory(user.id, {
            contractType: `${c.contractA.contractType} vs ${c.contractB.contractType}`,
            analysisMode: 'compare',
            analysisResult,
          });
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      clearInterval(progressInterval);
      setIsAnalyzing(false);
      setProgressStep(0);
    }
  }, []);

  // Build analysis context string for Q&A
  const analysisContext = result
    ? (() => {
        if (result.mode === 'compare') {
          const r = result as import('@/lib/contract-ai').ComparisonResult & { mode: string };
          return [
            `COMPARISON of two contracts:`,
            `Contract A: ${r.contractA?.contractType} (risk: ${r.contractA?.overallRisk}) — ${r.contractA?.summary}`,
            `Contract B: ${r.contractB?.contractType} (risk: ${r.contractB?.overallRisk}) — ${r.contractB?.summary}`,
            r.contractA?.keyParties?.length ? `Contract A parties: ${r.contractA.keyParties.map((p: {role:string;name:string}) => `${p.role}: ${p.name}`).join(', ')}` : null,
            r.contractB?.keyParties?.length ? `Contract B parties: ${r.contractB.keyParties.map((p: {role:string;name:string}) => `${p.role}: ${p.name}`).join(', ')}` : null,
            r.differences?.length ? `Key differences: ${r.differences.slice(0,4).map((d: {category:string;description:string}) => `${d.category}: ${d.description}`).join('; ')}` : null,
          ].filter(Boolean).join('\n');
        } else {
          const r = result as import('@/lib/contract-ai').ContractAnalysis & { mode: string };
          return [
            `Contract type: ${r.contractType}`,
            `Risk level: ${r.overallRisk}`,
            `Summary: ${r.summary}`,
            r.keyParties?.length ? `Parties: ${r.keyParties.map((p: {role:string;name:string}) => `${p.role}: ${p.name}`).join(', ')}` : null,
            r.keyDates?.length ? `Key dates: ${r.keyDates.map((d: {label:string;value:string}) => `${d.label}: ${d.value}`).join(', ')}` : null,
            r.risks?.length ? `Risks: ${r.risks.slice(0,3).map((r: import('@/lib/contract-ai').RiskItem) => `${r.title} (${r.severity})`).join('; ')}` : null,
            r.pros?.length ? `Pros: ${r.pros.slice(0,3).map((p: {title:string}) => p.title).join(', ')}` : null,
            r.cons?.length ? `Cons: ${r.cons.slice(0,3).map((c: {title:string}) => c.title).join(', ')}` : null,
          ].filter(Boolean).join('\n');
        }
      })()
    : undefined;

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-[#F9FAFB]">
        <SiteHeader />

        {/* ── Hero ── */}
        <section className="bg-[#1C2333] text-white pt-20 pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 text-center relative">
            <div className="inline-flex items-center gap-2 bg-emerald-900/30 border border-emerald-700/30 rounded-full px-4 py-1.5 mb-8 text-sm text-emerald-300 font-medium">
              <Star className="w-4 h-4" /> Free · Instant Analysis · No Login Required
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Know what you&apos;re signing —<br />
              <span className="text-emerald-400">before you sign</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Upload a lease, freelance agreement, Ontario APS, or any contract. Get a free Smart Analysis in plain English — risks, gaps, and questions to ask. No login.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={scrollToUpload}
                className="bg-[#2D6A4F] hover:bg-[#40916C] text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors flex items-center gap-2 shadow-xl shadow-emerald-900/50"
              >
                Analyze my contract — free <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => document.getElementById('sample-report')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors border border-white/20"
              >
                See a sample report
              </button>
            </div>
            <p className="text-emerald-100 text-sm mt-8 max-w-2xl mx-auto">
              Built first for <strong className="text-white">Canadian freelancers and renters</strong> — works on any contract.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-8 text-slate-400 text-sm">
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" />Free · full analysis</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" />No login</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" />PDF, Word & photo OCR</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" />Not legal advice</span>
            </div>
          </div>
        </section>

        {/* ── Upload Section (Above the Fold) ── */}
        <section id="upload-section" className="max-w-4xl mx-auto px-4 -mt-16 relative z-10 mb-20">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Analyze Your Contract</h2>
            <p className="text-slate-500 text-center mb-8 text-sm">Upload a file, paste text, or take a photo — completely free</p>
            <ContractUpload onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            {isAnalyzing && (
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex gap-1.5">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
                <p className="text-sm font-medium text-[#2D6A4F] transition-all duration-500">
                  {PROGRESS_STEPS[progressStep]}
                </p>
                <div className="w-full max-w-xs bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-[#2D6A4F] rounded-full transition-all duration-[3000ms] ease-linear"
                    style={{ width: `${((progressStep + 1) / PROGRESS_STEPS.length) * 100}%` }}
                  />
                </div>
              </div>
            )}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
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

        {/* ── Sample Annotated Report ── */}
        <section id="sample-report" className="max-w-6xl mx-auto px-4 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Here&apos;s what a clear report looks like
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Example annotations on a typical freelance / lease-style agreement. Yours will match your document.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 shadow-lg relative">
            <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              SAMPLE REPORT
            </div>
            
            <div className="space-y-6">
              {/* High Risk Example */}
              <div className="border-l-4 border-red-500 bg-red-50 p-5 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-6 bg-red-600 text-white text-xs font-bold rounded flex items-center justify-center flex-shrink-0">
                    HIGH
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 mb-2">Vague payment terms</p>
                    <p className="text-sm text-slate-700 mb-2">
                      <strong className="font-mono text-xs bg-white/50 px-2 py-0.5 rounded">§3.2</strong> Payment due within &quot;reasonable time&quot; is undefined and unenforceable.
                    </p>
                    <p className="text-sm text-emerald-700 font-medium">
                      💡 Ask: What specific timeline? Net 15? Net 30?
                    </p>
                  </div>
                </div>
              </div>

              {/* Medium Risk Example */}
              <div className="border-l-4 border-yellow-500 bg-yellow-50 p-5 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-6 bg-yellow-600 text-white text-xs font-bold rounded flex items-center justify-center flex-shrink-0">
                    MEDIUM
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 mb-2">Broad IP assignment</p>
                    <p className="text-sm text-slate-700 mb-2">
                      <strong className="font-mono text-xs bg-white/50 px-2 py-0.5 rounded">§7.1</strong> All work product automatically assigned — including drafts not delivered.
                    </p>
                    <p className="text-sm text-emerald-700 font-medium">
                      💡 Negotiate scope: only &quot;final deliverables&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Missing Clause Example */}
              <div className="border-l-4 border-slate-400 bg-slate-50 p-5 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-6 bg-slate-600 text-white text-xs font-bold rounded flex items-center justify-center flex-shrink-0">
                    MISSING
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 mb-2">No kill fee / cancellation clause</p>
                    <p className="text-sm text-slate-700 mb-2">
                      If client cancels mid-project, you may not be paid for work already done.
                    </p>
                    <p className="text-sm text-emerald-700 font-medium">
                      💡 Add: 50% kill fee if cancelled after approval stage
                    </p>
                  </div>
                </div>
              </div>

              {/* Lease-specific tip */}
              <div className="border-l-4 border-blue-500 bg-blue-50 p-5 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-6 bg-blue-600 text-white text-xs font-bold rounded flex items-center justify-center flex-shrink-0">
                    TIP
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 mb-2">Deposit return timeline (Lease)</p>
                    <p className="text-sm text-slate-700">
                      <strong className="font-mono text-xs bg-white/50 px-2 py-0.5 rounded">§12</strong> Ontario RTA requires return within 30 days. Verify clause matches provincial law.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <button
                onClick={scrollToUpload}
                className="bg-[#2D6A4F] hover:bg-[#40916C] text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-md"
              >
                Upload yours — free
              </button>
              <p className="text-xs text-slate-500 mt-3">
                Or <Link href="/contract-checker" className="text-[#2D6A4F] hover:underline font-medium">learn more about contract checking</Link>
              </p>
            </div>
          </div>
        </section>

        {/* ── Ad Slot ── */}
        <section className="max-w-6xl mx-auto px-4 mb-20">
          <AdSlot className="max-w-4xl mx-auto" />
        </section>

        {/* ── Results ── */}
        {result && (
          <section className="max-w-6xl mx-auto px-4 mb-8">
            <AnalysisResults result={result} />
            {!user && (
              <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-emerald-800">
                  <strong>Save your analysis</strong> — Sign in to access your contract history anytime.
                </p>
                <Link
                  href="/auth/signup"
                  className="text-sm font-semibold text-[#2D6A4F] hover:underline whitespace-nowrap"
                >
                  Create free account →
                </Link>
              </div>
            )}
          </section>
        )}

        {/* ── Contract Q&A ── */}
        <section className="max-w-3xl mx-auto px-4 mb-24">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Ask Questions About Your Contract</h2>
            <p className="text-slate-500 text-sm">Get plain-English answers instantly</p>
          </div>
          <ContractQA analysisContext={analysisContext} />
        </section>

        {/* ── Who It&apos;s For ── */}
        <section className="bg-slate-50 py-16 mb-20 border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Made for the contracts Canadians actually sign
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Built first for Canadian freelancers and renters — works on any contract
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-[#2D6A4F]" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Freelancers</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Payment terms, scope creep, IP, non-competes. Check the agreement before the first billable hour.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-[#2D6A4F]" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Renters</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Residential leases: renewals, deposits, entry, surprise fees. Ontario-aware language where it helps.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-[#2D6A4F]" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Home Buyers (APS)</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Ontario Agreement of Purchase and Sale clause flags before you&apos;re locked in.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-[#2D6A4F]" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Everyone Else</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  NDAs, employment, services, partnerships — upload any contract.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="max-w-6xl mx-auto px-4 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Everything You Need</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Clear contract insights — without booking a lawyer for a first read.</p>
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
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-10">We Support Many Contract Types</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {CONTRACT_TYPES.map((t) => (
                <Link
                  key={t.label}
                  href={t.slug}
                  className="px-4 py-2 bg-slate-100 hover:bg-[#2D6A4F] hover:text-white rounded-full text-sm font-medium text-slate-700 transition-colors"
                >
                  {t.label}
                </Link>
              ))}
            </div>
            <p className="text-center mt-6 text-sm text-slate-500">
              Don&apos;t see yours? Upload it anyway — the analyzer accepts any written agreement.{' '}
              <Link href="/contract-types" className="text-[#2D6A4F] hover:underline font-medium">
                View all types →
              </Link>
            </p>
          </div>
        </section>

        {/* ── From Our Legal Blog ── */}
        <section className="max-w-6xl mx-auto px-4 mb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">From Our Legal Blog</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Practical guides to help you understand the contracts you encounter every day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                href: '/blog/rental-agreement-red-flags',
                tag: 'Rental Agreements',
                title: '12 Rental Agreement Red Flags Landlords Hope You Miss',
                excerpt: 'Signing a lease without reading it carefully can cost you thousands. Here are the clauses that could blindside you.',
              },
              {
                href: '/blog/employment-contract-negotiation-guide',
                tag: 'Employment',
                title: 'Employment Contract Negotiation: What You Can (and Must) Push Back On',
                excerpt: 'Most employment contracts are written by company lawyers. Know which clauses are negotiable before you sign.',
              },
              {
                href: '/blog/freelancer-contract-checklist',
                tag: 'Freelancing',
                title: 'The Freelancer\'s Contract Checklist: 10 Things Every Client Agreement Must Have',
                excerpt: 'Protect your work, your payment, and your time. A checklist of must-have clauses in every freelance contract.',
              },
            ].map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow group"
              >
                <span className="inline-block text-xs font-semibold text-[#2D6A4F] bg-emerald-50 px-3 py-1 rounded-full mb-4">
                  {post.tag}
                </span>
                <h3 className="font-bold text-slate-800 mb-3 leading-snug group-hover:text-[#2D6A4F] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{post.excerpt}</p>
                <span className="text-sm font-semibold text-[#2D6A4F] flex items-center gap-1">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-[#2D6A4F] font-semibold hover:underline">
              View all legal guides <ArrowRight className="w-4 h-4" />
            </Link>
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

        <SiteFooter />
      </div>
    </>
  );
}
