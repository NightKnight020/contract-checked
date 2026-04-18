'use client';

import { useState, useCallback } from 'react';
import { Upload, CheckCircle, XCircle, Sparkles, ShieldCheck, Cpu, Link2 } from 'lucide-react';
import Link from 'next/link';
import { ACSContractComparison } from '@/components/ACSContractComparison';
import { ACSAnalysisResults } from '@/components/ACSAnalysisResults';
import { type ACSAnalysisResult } from '@/lib/acs-ai-service';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export default function ACSPage() {
  const [uploadedOperatorContract, setUploadedOperatorContract] = useState<File | null>(null);
  const [uploadedBookingForm, setUploadedBookingForm] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ACSAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((operatorContract: File | null, bookingForm: File | null) => {
    setUploadedOperatorContract(operatorContract);
    setUploadedBookingForm(bookingForm);
    setError(null);
    setAnalysisResult(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!uploadedOperatorContract || !uploadedBookingForm) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('operatorContract', uploadedOperatorContract);
      formData.append('bookingForm', uploadedBookingForm);

      const response = await fetch('/api/acs-compare', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to compare contracts');
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (err) {
      console.error('ACS analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to compare contracts. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [uploadedOperatorContract, uploadedBookingForm]);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-[#1C2333] text-white pt-16 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-700/30 rounded-full px-4 py-1.5 mb-6 text-sm text-blue-300 font-medium">
            <Sparkles className="w-4 h-4" />
            ACS Contract Risk Assessment
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5 leading-tight">
            ACS Contract<br />
            <span className="text-blue-400">Risk Assessment Tool</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Compare operator contracts with ACS booking forms to identify cancellation risks,
            hidden loopholes, and terms that could expose ACS to financial loss.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-slate-400 flex-wrap">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Risk-Free Analysis</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Cpu className="w-4 h-4 text-blue-400" /> AI-Powered</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Upload className="w-4 h-4 text-purple-400" /> Instant Results</span>
          </div>
          <div className="mt-4">
            <span className="text-xs text-slate-500 bg-white/10 px-3 py-1 rounded-full">Beta Version</span>
          </div>
        </div>
      </section>

      {/* Upload */}
      <section className="max-w-5xl mx-auto px-4 -mt-8 relative z-10 mb-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <ACSContractComparison
            onFileSelect={handleFileSelect}
            operatorContract={uploadedOperatorContract}
            bookingForm={uploadedBookingForm}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
          />

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3">
              <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      {analysisResult && (
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <ACSAnalysisResults result={analysisResult} />
        </section>
      )}

      {/* Features (shown when no results) */}
      {!analysisResult && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Why Use the ACS Contract Tool?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Specialized analysis tool for ACS brokers to protect against contract disputes and financial exposure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <CheckCircle className="h-8 w-8 text-white" />,
                bg: 'bg-[#2D6A4F]',
                title: 'Dual Contract Analysis',
                desc: 'Compare operator contracts with your booking forms to identify discrepancies and potential conflicts.',
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-white" />,
                bg: 'bg-blue-600',
                title: 'ACS Risk Assessment',
                desc: 'Identify cancellation terms, penalty clauses, and loopholes that could expose ACS to financial risk.',
              },
              {
                icon: <Link2 className="h-8 w-8 text-white" />,
                bg: 'bg-purple-600',
                title: 'Industry Expertise',
                desc: 'Specialized analysis trained on aviation industry standards and common contract pitfalls in air charter.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-slate-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Speed Up Your Legal Review Process</h3>
            <p className="text-slate-500 mb-4 max-w-xl mx-auto text-sm">
              Process hundreds of contract checks daily with AI-powered analysis. Focus your legal team&apos;s expertise where it matters most.
            </p>
            <p className="text-xs text-slate-400">No account required · Secure processing · Beta testing phase</p>
          </div>
        </section>
      )}

      {/* Back to main tool */}
      <div className="max-w-6xl mx-auto px-4 pb-8 text-center">
        <Link href="/" className="text-sm text-slate-500 hover:text-[#2D6A4F] transition-colors">
          ← Back to Contract Checked main tool
        </Link>
      </div>

      <SiteFooter />
    </div>
  );
}
