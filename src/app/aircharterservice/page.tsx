'use client';

import { useState, useCallback } from 'react';
import { DocumentIcon, ArrowUpTrayIcon, CheckCircleIcon, XCircleIcon, SparklesIcon, ShieldCheckIcon, CpuChipIcon, LinkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ACSContractComparison } from '@/components/ACSContractComparison';
import { ACSAnalysisResults } from '@/components/ACSAnalysisResults';
import { type ACSAnalysisResult } from '@/lib/acs-ai-service';

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
      // Create form data to send both files to the API
      const formData = new FormData();
      formData.append('operatorContract', uploadedOperatorContract);
      formData.append('bookingForm', uploadedBookingForm);

      // Call the ACS comparison API
      const response = await fetch('/api/acs-compare', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to compare contracts');
      }

      const analysisResult = await response.json();
      setAnalysisResult(analysisResult);
    } catch (err) {
      console.error('ACS analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to compare contracts. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [uploadedOperatorContract, uploadedBookingForm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <DocumentIcon className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ACS Contract Tool
              </h1>
            </Link>
            <nav className="flex items-center space-x-8">
              <Link
                href="/"
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                Contract Checked
              </Link>
              <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                Beta Version
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-cyan-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <SparklesIcon className="w-4 h-4" />
              <span>ACS Contract Risk Assessment</span>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent mb-6 leading-tight">
              ACS Contract<br />Risk Assessment Tool
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Compare operator contracts with ACS booking forms to identify cancellation risks,
              hidden loopholes, and terms that could expose ACS to financial loss.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="w-5 h-5 text-green-500" />
                <span>Risk-Free Analysis</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center space-x-2">
                <CpuChipIcon className="w-5 h-5 text-blue-500" />
                <span>AI-Powered</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center space-x-2">
                <ArrowUpTrayIcon className="w-5 h-5 text-purple-500" />
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/50 p-8 mb-8">
          <ACSContractComparison
            onFileSelect={handleFileSelect}
            operatorContract={uploadedOperatorContract}
            bookingForm={uploadedBookingForm}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
          />

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex">
                <XCircleIcon className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      {analysisResult && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ACSAnalysisResults result={analysisResult} />
        </section>
      )}

      {/* Features Section */}
      {!analysisResult && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Use the ACS Contract Tool?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Specialized analysis tool for ACS brokers to protect against contract disputes and financial exposure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                  <DocumentIcon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-3 h-3 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Dual Contract Analysis</h3>
              <p className="text-slate-600 leading-relaxed">
                Compare operator contracts with your booking forms to identify discrepancies and potential conflicts.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                  <ShieldCheckIcon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-3 h-3 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">ACS Risk Assessment</h3>
              <p className="text-slate-600 leading-relaxed">
                Identify cancellation terms, penalty clauses, and loopholes that could expose ACS to financial risk.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                  <ArrowUpTrayIcon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                  <LinkIcon className="w-3 h-3 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Industry Expertise</h3>
              <p className="text-slate-600 leading-relaxed">
                Specialized analysis trained on aviation industry standards and common contract pitfalls in air charter.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Speed Up Your Legal Review Process
              </h3>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                Process hundreds of contract checks daily with AI-powered analysis. Focus your legal team&apos;s expertise where it matters most.
              </p>
              <div className="text-sm text-slate-500">
                No account required • Secure processing • Beta testing phase
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <DocumentIcon className="h-8 w-8 text-blue-400" />
                <h3 className="text-2xl font-bold">ACS Contract Tool</h3>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                Specialized contract analysis tool for ACS brokers. Protecting ACS interests in operator agreements.
              </p>
              <div className="flex space-x-4">
                <Link href="/" className="text-blue-400 hover:text-white transition-colors font-medium">
                  Contract Checked
                </Link>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Beta Version</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Contract Comparison</li>
                <li>ACS Risk Assessment</li>
                <li>Cancellation Analysis</li>
                <li>Industry Standards</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Not Legal Advice</li>
                <li>Contact ACS Legal</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-slate-500">
            <p>&copy; 2024 Air Charter Service. Contract analysis for aviation industry professionals. Not legal advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
