'use client';

import { useState, useCallback } from 'react';
import { DocumentIcon, ArrowUpTrayIcon, CheckCircleIcon, XCircleIcon, SparklesIcon, ShieldCheckIcon, CpuChipIcon, LinkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ContractUpload } from '@/components/ContractUpload';
import { AnalysisResults } from '@/components/AnalysisResults';
import { type AnalysisResult } from '@/lib/ai-service';

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File | null) => {
    setUploadedFile(file);
    setError(null);
    setAnalysisResult(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Create form data to send the file to the API
      const formData = new FormData();
      formData.append('file', uploadedFile);

      // Call the analysis API
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze contract');
      }

      const analysisResult = await response.json();
      setAnalysisResult(analysisResult);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze contract. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [uploadedFile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <DocumentIcon className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Contract Checked
              </h1>
            </Link>
            <nav className="flex space-x-8">
              <Link
                href="/"
                className="text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1"
              >
                Home
              </Link>
              <Link
                href="/resources"
                className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
              >
                Resources
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <SparklesIcon className="w-4 h-4" />
              <span>AI-Powered Contract Analysis</span>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 bg-clip-text text-transparent mb-6 leading-tight">
              Understand Your<br />Contracts in Minutes
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Upload any contract and let our AI analyze it for you. Get summaries, identify key clauses,
              spot potential risks, and understand which party has the advantage.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="w-5 h-5 text-green-500" />
                <span>Secure & Private</span>
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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/50 p-8 mb-8">
          <ContractUpload
            onFileSelect={handleFileSelect}
            selectedFile={uploadedFile}
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
          <AnalysisResults result={analysisResult} />
        </section>
      )}

      {/* Features Section */}
      {!analysisResult && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose Contract Checked?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our AI technology makes contract analysis accessible to everyone, from individuals to businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow">
                  <DocumentIcon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-3 h-3 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Smart Document Analysis</h3>
              <p className="text-slate-600 leading-relaxed">
                Our AI reads and understands your contracts, identifying key terms, clauses, and legal implications with human-like comprehension.
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
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Risk Assessment</h3>
              <p className="text-slate-600 leading-relaxed">
                Get clear insights into potential risks, advantages, and areas requiring attention. Understand which party has the stronger position.
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
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Lightning Fast</h3>
              <p className="text-slate-600 leading-relaxed">
                Upload your contract and get comprehensive analysis in seconds. Support for PDF, Word documents, and text files up to 10MB.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Need Contract Templates?
              </h3>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                Download free, professionally crafted contract templates for common agreements including rental agreements, service contracts, and more.
              </p>
              <Link
                href="/resources"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                <DocumentIcon className="w-5 h-5" />
                <span>Browse Templates</span>
              </Link>
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
                <DocumentIcon className="h-8 w-8 text-indigo-400" />
                <h3 className="text-2xl font-bold">Contract Checked</h3>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                Making contract analysis accessible to everyone with AI-powered insights and free legal templates.
              </p>
              <div className="flex space-x-4">
                <Link href="/" className="text-indigo-400 hover:text-white transition-colors font-medium">
                  Home
                </Link>
                <Link href="/resources" className="text-slate-400 hover:text-white transition-colors">
                  Resources
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-slate-400">
                <li>AI Contract Analysis</li>
                <li>Risk Assessment</li>
                <li>Free Templates</li>
                <li>Document Support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Not Legal Advice</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-slate-500">
            <p>&copy; 2024 Contract Checked. AI-powered contract analysis made simple. Not legal advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
