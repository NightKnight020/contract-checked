'use client';

import { useState, useCallback } from 'react';
import { FileText, Upload, Shield, Zap, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ContractUpload } from '@/components/ContractUpload';
import { AnalysisResults } from '@/components/AnalysisResults';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/lib/auth-context';
import { type AnalysisResult } from '@/lib/ai-service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { user, signOut } = useAuth();

  const handleFileSelect = useCallback((file: File | null) => {
    setUploadedFile(file);
    setError(null);
    setAnalysisResult(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!uploadedFile) return;

    // Check if user is authenticated
    if (!user) {
      setShowAuthModal(true);
      return;
    }

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
  }, [uploadedFile, user]);

  const handleAuthSuccess = useCallback(() => {
    // After successful authentication, automatically trigger the analysis
    if (uploadedFile) {
      handleAnalyze();
    }
  }, [uploadedFile, handleAnalyze]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Contract Checked
              </h1>
              <p className="text-xs text-muted-foreground">AI Contract Analysis</p>
            </div>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium text-primary border-b-2 border-primary pb-1">
              Home
            </Link>
            <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/resources" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </Link>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => setShowAuthModal(true)}>
                  Sign In
                </Button>
                <Button onClick={() => setShowAuthModal(true)} className="shadow-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="relative container px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Has it been Contract Checked?
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Understand Your<br />
              <span className="text-primary">Contracts</span> in Minutes
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Upload any contract and let our AI analyze it for you. Get summaries, identify key clauses,
              spot potential risks, and understand which party has the advantage.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-12">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span>Secure & Private</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                <span>AI-Powered</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-purple-500" />
                <span>Lightning Fast</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="container px-4 -mt-12 relative z-10">
        <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-card/50 backdrop-blur">
          <CardContent className="p-8 md:p-12">
            <ContractUpload
              onFileSelect={handleFileSelect}
              selectedFile={uploadedFile}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />

            {error && (
              <div className="mt-6">
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Results Section */}
      {analysisResult && (
        <section className="container px-4 py-16">
          <AnalysisResults result={analysisResult} />
        </section>
      )}

      {/* Features Section */}
      {!analysisResult && (
        <section className="container px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Contract Checked?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI technology makes contract analysis accessible to everyone, from individuals to businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FileText className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Smart Document Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Our AI reads and understands your contracts, identifying key terms, clauses, and legal implications with human-like comprehension.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Get clear insights into potential risks, advantages, and areas requiring attention. Understand which party has the stronger position.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Upload your contract and get comprehensive analysis in seconds. Support for PDF, Word documents, and text files up to 10MB.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">
                  Need Contract Templates?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Download free, professionally crafted contract templates for common agreements including rental agreements, service contracts, and more.
                </p>
                <Button size="lg" className="shadow-lg">
                  <FileText className="mr-2 h-5 w-5" />
                  Browse Templates
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-muted/50 border-t mt-24">
        <div className="container px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Contract Checked</h3>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Making contract analysis accessible to everyone with AI-powered insights and free legal templates.
              </p>
              <div className="flex space-x-4">
                <Button variant="link" className="p-0 h-auto font-normal">
                  Home
                </Button>
                <Button variant="link" className="p-0 h-auto font-normal">
                  Blog
                </Button>
                <Button variant="link" className="p-0 h-auto font-normal">
                  Resources
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>AI Contract Analysis</li>
                <li>Risk Assessment</li>
                <li>Free Templates</li>
                <li>Document Support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Not Legal Advice</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>

          <Separator className="mb-8" />
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Contract Checked. AI-powered contract analysis made simple. Not legal advice.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        initialMode="signup"
      />
    </div>
  );
}
