'use client';

import { useState } from 'react';
import {
  CheckCircle, AlertTriangle, XCircle, Info, ThumbsUp, ThumbsDown,
  Calendar, Users, Star, AlertCircle, FileSearch, ArrowLeftRight
} from 'lucide-react';
import type { ContractAnalysis, ComparisonResult } from '@/lib/contract-ai';

type TabId = 'overview' | 'risks' | 'proscons' | 'missing' | 'recommendations';

// ─── helpers ────────────────────────────────────────────────────────────────

function riskColor(risk: 'low' | 'medium' | 'high') {
  return risk === 'high' ? 'red' : risk === 'medium' ? 'yellow' : 'green';
}

function RiskBadge({ risk }: { risk: 'low' | 'medium' | 'high' }) {
  const c = riskColor(risk);
  const base = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold capitalize';
  const styles = {
    red: `${base} bg-red-100 text-red-700`,
    yellow: `${base} bg-yellow-100 text-yellow-700`,
    green: `${base} bg-emerald-100 text-emerald-700`,
  };
  const Icon = risk === 'high' ? XCircle : risk === 'medium' ? AlertTriangle : CheckCircle;
  return (
    <span className={styles[c]}>
      <Icon className="w-4 h-4" />
      {risk} Risk
    </span>
  );
}

function SeverityDot({ severity }: { severity: 'low' | 'medium' | 'high' }) {
  const cls = severity === 'high' ? 'bg-red-500' : severity === 'medium' ? 'bg-yellow-500' : 'bg-emerald-500';
  return <span className={`inline-block w-2 h-2 rounded-full ${cls} flex-shrink-0 mt-1.5`} />;
}

function PriorityBadge({ priority }: { priority: 'urgent' | 'important' | 'optional' }) {
  const styles = {
    urgent: 'bg-red-100 text-red-700',
    important: 'bg-blue-100 text-blue-700',
    optional: 'bg-slate-100 text-slate-600',
  };
  return <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide ${styles[priority]}`}>{priority}</span>;
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'risks', label: 'Risks' },
  { id: 'proscons', label: 'Pros & Cons' },
  { id: 'missing', label: 'Missing Clauses' },
  { id: 'recommendations', label: 'Recommendations' },
];

// ─── Single analysis panel ────────────────────────────────────────────────

function AnalysisPanel({ data, label }: { data: ContractAnalysis; label?: string }) {
  const [tab, setTab] = useState<TabId>('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-6 bg-[#0F172A] rounded-2xl text-white">
        <div>
          {label && <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">{label}</p>}
          <h3 className="text-xl font-bold">{data.contractType}</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">{data.summary}</p>
        </div>
        <RiskBadge risk={data.overallRisk} />
      </div>

      {/* Plain English Card */}
      <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl flex gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-blue-800 mb-1">Plain English Summary</p>
          <p className="text-sm text-blue-700 leading-relaxed">{data.plainEnglishSummary}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.id
                ? 'bg-[#0F172A] text-white'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.keyParties.length > 0 && (
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-slate-500" />
                <p className="text-sm font-semibold text-slate-700">Key Parties</p>
              </div>
              <div className="space-y-2">
                {data.keyParties.map((p, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{p.role}</span>
                    <span className="font-medium text-slate-800">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.keyDates.length > 0 && (
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-slate-500" />
                <p className="text-sm font-semibold text-slate-700">Key Dates</p>
              </div>
              <div className="space-y-2">
                {data.keyDates.map((d, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{d.label}</span>
                    <span className="font-medium text-slate-800">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'risks' && (
        <div className="space-y-3">
          {data.risks.length === 0 && (
            <p className="text-slate-500 text-sm text-center py-6">No significant risks identified.</p>
          )}
          {data.risks.map((r, i) => (
            <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl flex gap-3">
              <SeverityDot severity={r.severity} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-sm text-slate-800">{r.title}</p>
                  <RiskBadge risk={r.severity} />
                </div>
                <p className="text-sm text-slate-600 mb-2">{r.description}</p>
                {r.clause && (
                  <blockquote className="text-xs text-slate-500 italic border-l-2 border-slate-300 pl-3">
                    {r.clause}
                  </blockquote>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'proscons' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <ThumbsUp className="w-4 h-4 text-emerald-600" />
              <p className="font-semibold text-sm text-emerald-700">Pros</p>
            </div>
            {data.pros.map((p, i) => (
              <div key={i} className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <p className="font-semibold text-sm text-emerald-800 mb-1">{p.title}</p>
                <p className="text-sm text-emerald-700">{p.description}</p>
              </div>
            ))}
            {data.pros.length === 0 && <p className="text-slate-400 text-sm">None identified.</p>}
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <ThumbsDown className="w-4 h-4 text-red-600" />
              <p className="font-semibold text-sm text-red-700">Cons</p>
            </div>
            {data.cons.map((c, i) => (
              <div key={i} className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="font-semibold text-sm text-red-800 mb-1">{c.title}</p>
                <p className="text-sm text-red-700">{c.description}</p>
              </div>
            ))}
            {data.cons.length === 0 && <p className="text-slate-400 text-sm">None identified.</p>}
          </div>
        </div>
      )}

      {tab === 'missing' && (
        <div className="space-y-3">
          {data.missingClauses.length === 0 && (
            <p className="text-slate-500 text-sm text-center py-6">No missing clauses identified.</p>
          )}
          {data.missingClauses.map((m, i) => (
            <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl flex gap-3">
              <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-sm text-slate-800">{m.title}</p>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${
                    m.importance === 'high' ? 'bg-red-100 text-red-700' :
                    m.importance === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>{m.importance}</span>
                </div>
                <p className="text-sm text-slate-600">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'recommendations' && (
        <div className="space-y-3">
          {data.recommendations.map((r, i) => (
            <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl flex gap-3">
              <Star className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <PriorityBadge priority={r.priority} />
                </div>
                <p className="text-sm text-slate-700">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export type AnalysisResultPayload =
  | ({ mode: 'single' } & ContractAnalysis)
  | ({ mode: 'compare' } & ComparisonResult);

interface AnalysisResultsProps {
  result: AnalysisResultPayload;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  if (result.mode === 'compare') {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
          <ArrowLeftRight className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">Contract Comparison</h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <AnalysisPanel data={result.contractA} label="Contract A" />
          <AnalysisPanel data={result.contractB} label="Contract B" />
        </div>

        {result.differences.length > 0 && (
          <div className="p-6 bg-white border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <FileSearch className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-800">Key Differences</h3>
            </div>
            <div className="space-y-3">
              {result.differences.map((d, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="font-semibold text-blue-700 min-w-[130px]">{d.category}</span>
                  <span className="text-slate-600">{d.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Disclaimer />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnalysisPanel data={result} />
      <Disclaimer />
    </div>
  );
}

function Disclaimer() {
  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 text-center">
      <strong>Disclaimer:</strong> This AI analysis is for informational purposes only and does not constitute legal advice.
      Always consult with a qualified legal professional before signing any contract.
    </div>
  );
}
