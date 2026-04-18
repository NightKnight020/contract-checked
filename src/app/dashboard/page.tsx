'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText, Trash2, ChevronDown, ChevronUp, LogOut,
  Clock, AlertTriangle, CheckCircle, XCircle, MessageCircle, ArrowRight
} from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { AnalysisResults, type AnalysisResultPayload } from '@/components/AnalysisResults';
import { ContractQA } from '@/components/ContractQA';
import { useAuth } from '@/lib/auth-context';
import { getUserHistory, deleteHistoryEntry, type HistoryEntry } from '@/lib/supabase';

// ─── Risk badge ──────────────────────────────────────────────────────────────

function RiskBadge({ risk }: { risk: 'low' | 'medium' | 'high' | null }) {
  if (!risk) return null;
  const styles = {
    low: 'bg-emerald-100 text-emerald-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
  };
  const icons = {
    low: <CheckCircle className="w-3.5 h-3.5" />,
    medium: <AlertTriangle className="w-3.5 h-3.5" />,
    high: <XCircle className="w-3.5 h-3.5" />,
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${styles[risk]}`}>
      {icons[risk]} {risk} Risk
    </span>
  );
}

// ─── Skeleton loader ─────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-1/3" />
          <div className="h-3 bg-slate-100 rounded w-1/4" />
        </div>
        <div className="h-6 bg-slate-200 rounded-full w-20" />
      </div>
    </div>
  );
}

// ─── Format date ─────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// ─── Build analysis context for Q&A ─────────────────────────────────────────

function buildContext(entry: HistoryEntry): string {
  const r = entry.analysis_result;
  if (entry.analysis_mode === 'compare') {
    const a = (r as { contractA?: { contractType?: string; overallRisk?: string; summary?: string } }).contractA;
    const b = (r as { contractB?: { contractType?: string; overallRisk?: string; summary?: string } }).contractB;
    return [
      `COMPARISON of two contracts:`,
      a ? `Contract A: ${a.contractType} (risk: ${a.overallRisk}) — ${a.summary}` : null,
      b ? `Contract B: ${b.contractType} (risk: ${b.overallRisk}) — ${b.summary}` : null,
    ].filter(Boolean).join('\n');
  }
  const s = r as { contractType?: string; overallRisk?: string; summary?: string; plainEnglishSummary?: string };
  return [
    `Contract type: ${s.contractType ?? 'Unknown'}`,
    `Risk level: ${s.overallRisk ?? 'unknown'}`,
    `Summary: ${s.summary ?? ''}`,
    entry.plain_english_summary ? `Plain English: ${entry.plain_english_summary}` : null,
  ].filter(Boolean).join('\n');
}

// ─── History Card ─────────────────────────────────────────────────────────────

function HistoryCard({
  entry,
  onDelete,
}: {
  entry: HistoryEntry;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const result: AnalysisResultPayload = entry.analysis_mode === 'compare'
    ? ({ mode: 'compare', ...entry.analysis_result } as AnalysisResultPayload)
    : ({ mode: 'single', ...entry.analysis_result } as AnalysisResultPayload);

  const context = buildContext(entry);

  const handleDelete = async () => {
    setDeleting(true);
    const ok = await deleteHistoryEntry(entry.id);
    if (ok) onDelete(entry.id);
    setDeleting(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Card header */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-[#2D6A4F]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-semibold text-slate-800 text-sm">
                {entry.contract_type ?? 'Unknown Contract'}
              </h3>
              <RiskBadge risk={entry.overall_risk} />
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                {entry.analysis_mode === 'compare' ? 'Comparison' : 'Single'}
              </span>
            </div>
            {entry.file_name && (
              <p className="text-xs text-slate-400 truncate mb-1">{entry.file_name}</p>
            )}
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3 h-3" />
              {formatDate(entry.created_at)}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Delete button */}
            {confirmDelete ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Delete?</span>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="text-xs font-semibold text-red-600 hover:text-red-700 disabled:opacity-60"
                >
                  {deleting ? 'Deleting...' : 'Yes'}
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-700"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            {/* Expand button */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs font-semibold text-[#2D6A4F] hover:text-[#40916C] px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors"
            >
              {expanded ? (
                <>Hide <ChevronUp className="w-3.5 h-3.5" /></>
              ) : (
                <>View Analysis <ChevronDown className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded analysis */}
      {expanded && (
        <div className="border-t border-slate-100 p-5 sm:p-6 space-y-8 bg-[#F9FAFB]">
          <AnalysisResults result={result} />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-4 h-4 text-[#2D6A4F]" />
              <h4 className="font-semibold text-slate-700 text-sm">Ask Questions About This Contract</h4>
            </div>
            <ContractQA analysisContext={context} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sign-in gate ─────────────────────────────────────────────────────────────

function SignInGate() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: authError } = await signIn(email, password);
    setLoading(false);
    if (authError) {
      setError(authError.message);
    } else {
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="mb-8 text-center">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7 text-[#2D6A4F]" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Sign in to view your history</h1>
              <p className="text-slate-500 text-sm">All your past contract analyses in one place.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F]"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F]"
                  placeholder="Your password"
                />
              </div>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2D6A4F] hover:bg-[#40916C] disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              No account?{' '}
              <Link href="/auth/signup" className="text-[#2D6A4F] font-semibold hover:underline">
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    if (!user) return;
    setHistoryLoading(true);
    const entries = await getUserHistory(user.id);
    setHistory(entries);
    setHistoryLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) {
      loadHistory();
    } else if (!authLoading) {
      setHistoryLoading(false);
    }
  }, [user, authLoading, loadHistory]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!user) return <SignInGate />;

  const handleDelete = (id: string) => {
    setHistory((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">
        {/* Page header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Your Contract History</h1>
            <p className="text-slate-500 text-sm mt-0.5">{user.email}</p>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Content */}
        {historyLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="text-lg font-semibold text-slate-700 mb-2">No contracts analyzed yet</h2>
            <p className="text-slate-400 text-sm mb-6">Analyze your first contract to see it here.</p>
            <Link
              href="/#upload-section"
              className="inline-flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#40916C] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
            >
              Analyze a Contract <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((entry) => (
              <HistoryCard key={entry.id} entry={entry} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
